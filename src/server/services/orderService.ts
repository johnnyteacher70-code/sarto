import { createAdminClient } from "@/lib/supabase/server";
import { CheckoutInput } from "../validators/orderValidator";

export interface CheckoutQuote {
  subtotal_uzs: number;
  shipping_uzs: number;
  discount_uzs: number;
  total_uzs: number;
  free_shipping_threshold: number;
}

export async function calculateQuote(
  items: { variant_id: string; quantity: number }[],
  region: string
): Promise<CheckoutQuote> {
  const supabase = createAdminClient();

  // Variantlar narxlarini olish
  const variantIds = items.map((i) => i.variant_id);
  const { data: variants, error } = await supabase
    .from("product_variants")
    .select("id, price_uzs, is_active, stock_quantity")
    .in("id", variantIds);

  if (error || !variants) {
    throw new Error("Mahsulot narxlarini tekshirishda xatolik yuz berdi.");
  }

  let subtotal = 0;
  for (const item of items) {
    const v = variants.find((variant) => variant.id === item.variant_id);
    if (!v || !v.is_active) {
      throw new Error(`Mahsulot varianti mavjud emas yoki faol emas.`);
    }
    if (v.stock_quantity < item.quantity) {
      throw new Error(`Kechirasiz, tanlangan mahsulotdan omborda yetarli miqdor yo'q.`);
    }
    subtotal += Number(v.price_uzs) * item.quantity;
  }

  // Yetkazib berish narxini do'kon sozlamalaridan hisoblash
  const isTashkent = region.toLowerCase().includes("toshkent");
  const shippingFee = isTashkent ? 30000 : 50000;
  const freeThreshold = 800000;

  const finalShipping = subtotal >= freeThreshold ? 0 : shippingFee;
  const discount = 0;
  const total = subtotal + finalShipping - discount;

  return {
    subtotal_uzs: subtotal,
    shipping_uzs: finalShipping,
    discount_uzs: discount,
    total_uzs: total,
    free_shipping_threshold: freeThreshold,
  };
}

export async function createOrder(input: CheckoutInput, userId?: string | null) {
  const supabase = createAdminClient();

  // 1. Idempotency tekshiruvi
  if (input.idempotency_key) {
    const { data: existingOrder } = await supabase
      .from("orders")
      .select("id, order_number, total_uzs")
      .eq("idempotency_key", input.idempotency_key)
      .maybeSingle();

    if (existingOrder) {
      return existingOrder;
    }
  }

  // 2. Narx va zaxirani serverda hisoblash
  const quote = await calculateQuote(input.items, input.delivery_address.region);

  // 3. Mahsulot va variant ma'lumotlarini snapshot uchun olish
  const variantIds = input.items.map((i) => i.variant_id);
  const { data: variantDetails, error: vError } = await supabase
    .from("product_variants")
    .select("id, sku, size, color_name, price_uzs, product_id, product:products(name)")
    .in("id", variantIds);

  if (vError || !variantDetails) {
    throw new Error("Mahsulot ma'lumotlarini yuklashda xatolik yuz berdi.");
  }

  // 4. Atomik tarzda zaxiralarni kamaytirish (Race condition himoyasi)
  for (const item of input.items) {
    const { data: success, error: rpcError } = await supabase.rpc("decrement_stock_atomic", {
      p_variant_id: item.variant_id,
      p_quantity: item.quantity,
    });

    if (rpcError || !success) {
      throw new Error(
        "Kechirasiz, buyurtma berish vaqtida mahsulot zaxirasi tugab qoldi. Iltimos, savatchani tekshiring."
      );
    }
  }

  // 5. Inson uchun qulay unikal buyurtma raqamini yaratish (masalan: SRT-261115-4921)
  const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const orderNumber = `SRT-${dateStr}-${randomSuffix}`;

  // 6. Buyurtmani bazaga yozish
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      order_number: orderNumber,
      user_id: userId || null,
      customer_name: input.customer_name,
      customer_phone: input.customer_phone,
      customer_email: input.customer_email || null,
      delivery_address: input.delivery_address,
      order_status: "pending",
      payment_status: "unpaid",
      payment_method: input.payment_method,
      subtotal_uzs: quote.subtotal_uzs,
      discount_uzs: quote.discount_uzs,
      shipping_uzs: quote.shipping_uzs,
      total_uzs: quote.total_uzs,
      customer_note: input.customer_note || null,
      idempotency_key: input.idempotency_key || null,
    })
    .select("id, order_number, total_uzs")
    .single();

  if (orderError || !order) {
    console.error("Order insert error:", orderError);
    throw new Error("Buyurtmani saqlashda xatolik yuz berdi.");
  }

  // 7. Order items snapshotlarini saqlash
  const orderItemsData = input.items.map((item) => {
    const v = variantDetails.find((vd) => vd.id === item.variant_id);
    const unitPrice = Number(v?.price_uzs || 0);
    // TypeScript safe extraction of nested product name
    const productName = (v?.product as unknown as { name?: string })?.name || "Mahsulot";

    return {
      order_id: order.id,
      product_id: v?.product_id || null,
      variant_id: v?.id || null,
      product_name_snapshot: productName,
      sku_snapshot: v?.sku || "",
      size_snapshot: v?.size || null,
      color_snapshot: v?.color_name || null,
      unit_price_uzs: unitPrice,
      quantity: item.quantity,
      line_total_uzs: unitPrice * item.quantity,
    };
  });

  const { error: itemsError } = await supabase.from("order_items").insert(orderItemsData);

  if (itemsError) {
    console.error("Order items error:", itemsError);
  }

  // 8. Order status tarixiga yozish
  await supabase.from("order_status_history").insert({
    order_id: order.id,
    old_status: null,
    new_status: "pending",
    note: "Buyurtma mijoz tomonidan muvaffaqiyatli yaratildi.",
  });

  return order;
}
