"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/features/cart/CartContext";
import { formatUZS } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ShieldCheck, Truck } from "lucide-react";

const UZBEKISTAN_REGIONS = [
  "Toshkent shahri",
  "Toshkent viloyati",
  "Samarqand viloyati",
  "Buxoro viloyati",
  "Farg‘ona viloyati",
  "Andijon viloyati",
  "Namangan viloyati",
  "Qashqadaryo viloyati",
  "Surxondaryo viloyati",
  "Xorazm viloyati",
  "Navoiy viloyati",
  "Jizzax viloyati",
  "Sirdaryo viloyati",
  "Qoraqalpog‘iston Respublikasi",
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form holati
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_phone: "+998",
    customer_email: "",
    region: "Toshkent shahri",
    city: "",
    street: "",
    house: "",
    apartment: "",
    customer_note: "",
  });

  const isTashkent = formData.region.toLowerCase().includes("toshkent");
  const shippingFee = subtotal >= 800000 ? 0 : isTashkent ? 30000 : 50000;
  const finalTotal = subtotal + shippingFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (items.length === 0) {
      setError("Savatchangiz bo‘sh. Iltimos, avval mahsulot tanlang.");
      return;
    }

    if (!formData.customer_name.trim() || formData.customer_phone.length < 9) {
      setError("Iltimos, ismingiz va telefon raqamingizni to‘liq kiriting.");
      return;
    }

    if (!formData.street.trim() || !formData.house.trim()) {
      setError("Iltimos, yetkazib berish manzilini (ko‘cha va uy) kiriting.");
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        customer_name: formData.customer_name,
        customer_phone: formData.customer_phone,
        customer_email: formData.customer_email || undefined,
        delivery_address: {
          recipient_name: formData.customer_name,
          phone: formData.customer_phone,
          region: formData.region,
          city: formData.city || formData.region,
          street: formData.street,
          house: formData.house,
          apartment: formData.apartment || undefined,
        },
        payment_method: "cod",
        customer_note: formData.customer_note || undefined,
        items: items.map((i) => ({
          variant_id: i.variant_id,
          quantity: i.quantity,
        })),
        idempotency_key: `order-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      };

      const res = await fetch("/api/v1/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error?.message || "Buyurtma berishda xatolik yuz berdi.");
      }

      const orderNumber = json.data.order_number;
      clearCart();
      router.push(`/order/success/${orderNumber}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Xatolik yuz berdi";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="border-b border-sarto-border pb-6 mb-8">
          <nav className="text-xs text-sarto-muted uppercase tracking-wider mb-2">
            <Link href="/" className="hover:text-sarto-black">Bosh sahifa</Link> /{" "}
            <Link href="/cart" className="hover:text-sarto-black">Savatcha</Link> /{" "}
            <span>Buyurtma rasmiylashtirish</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-4xl text-sarto-black">
            Buyurtma rasmiylashtirish
          </h1>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-xs text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-8">
            {/* Aloqa ma'lumotlari */}
            <div className="space-y-4">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-sarto-black pb-2 border-b border-sarto-border">
                1. Qabul qiluvchi ma’lumotlari
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Ism va Familiya *"
                  placeholder="Shoxrux Xalilov"
                  required
                  value={formData.customer_name}
                  onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                />
                <Input
                  label="Telefon raqami *"
                  placeholder="+998 90 123 45 67"
                  required
                  value={formData.customer_phone}
                  onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                />
              </div>
              <Input
                label="Email (Ixtiyoriy)"
                type="email"
                placeholder="shoxrux@example.com"
                value={formData.customer_email}
                onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
              />
            </div>

            {/* Yetkazib berish manzili */}
            <div className="space-y-4">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-sarto-black pb-2 border-b border-sarto-border">
                2. Yetkazib berish manzili
              </h2>
              <div className="space-y-1.5">
                <label className="block text-xs font-medium uppercase tracking-wider text-sarto-black">
                  Viloyat / Shahar *
                </label>
                <select
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full h-11 border border-sarto-border bg-white px-3 text-xs uppercase tracking-wider text-sarto-black focus:outline-none focus:border-sarto-black"
                >
                  {UZBEKISTAN_REGIONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <Input
                    label="Ko‘cha va mahalla *"
                    placeholder="Amir Temur shoh ko‘chasi"
                    required
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  />
                </div>
                <Input
                  label="Uy raqami *"
                  placeholder="12-uy"
                  required
                  value={formData.house}
                  onChange={(e) => setFormData({ ...formData, house: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Xonadon / Ofis (ixtiyoriy)"
                  placeholder="24-xonadon"
                  value={formData.apartment}
                  onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                />
                <Input
                  label="Tuman / Shaharcha"
                  placeholder="Yunusobod tumani"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>

              <Input
                label="Kuryer uchun qo‘shimcha izoh"
                placeholder="Eshik kodi, mo‘ljal va boshqalar..."
                value={formData.customer_note}
                onChange={(e) => setFormData({ ...formData, customer_note: e.target.value })}
              />
            </div>

            {/* To'lov usuli */}
            <div className="space-y-4">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-sarto-black pb-2 border-b border-sarto-border">
                3. To‘lov usuli
              </h2>
              <div className="p-4 border border-sarto-black bg-sarto-ivory/50 flex items-start gap-3">
                <input
                  type="radio"
                  id="cod"
                  name="payment"
                  defaultChecked
                  className="mt-0.5"
                />
                <label htmlFor="cod" className="text-xs cursor-pointer">
                  <span className="font-semibold uppercase tracking-wider text-sarto-black block">
                    Yetkazib berganda to‘lov (Naqd yoki Karta)
                  </span>
                  <span className="text-sarto-muted text-[11px] block mt-0.5">
                    Buyurtmani kuryerdan qabul qilib olganingizda to‘lov qilasiz. Tovarni ko‘rib
                    chiqish imkoniyati mavjud.
                  </span>
                </label>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full h-13"
              isLoading={isLoading}
              disabled={items.length === 0}
            >
              Buyurtmani tasdiqlash ({formatUZS(finalTotal)})
            </Button>
          </form>

          {/* Order Summary */}
          <div className="lg:col-span-5 bg-[#FAFAFA] border border-sarto-border p-6 space-y-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-sarto-black pb-3 border-b border-sarto-border">
              Buyurtma tarkibi ({items.length})
            </h2>

            <div className="divide-y divide-sarto-border max-h-80 overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.variant_id} className="py-3 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-semibold text-sarto-black uppercase tracking-wide">
                      {item.product.name}
                    </p>
                    <p className="text-sarto-muted text-[11px] mt-0.5">
                      {item.variant.size && `O‘lcham: ${item.variant.size}`} | Miqdor: {item.quantity}
                    </p>
                  </div>
                  <span className="font-semibold text-sarto-black">
                    {formatUZS(item.variant.price_uzs * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t border-sarto-border text-xs">
              <div className="flex justify-between text-sarto-muted">
                <span>Mahsulotlar:</span>
                <span className="text-sarto-black font-medium">{formatUZS(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sarto-muted">
                <span>Yetkazib berish ({formData.region}):</span>
                <span className="text-sarto-black font-medium">
                  {shippingFee === 0 ? "Bepul" : formatUZS(shippingFee)}
                </span>
              </div>
              <div className="pt-3 border-t border-sarto-border flex justify-between text-base font-bold text-sarto-black">
                <span>Jami to‘lov:</span>
                <span>{formatUZS(finalTotal)}</span>
              </div>
            </div>

            <div className="p-3 bg-white border border-sarto-border space-y-2 text-[11px] text-sarto-muted">
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-sarto-black" />
                <span>O‘zbekiston bo‘ylab bepul yetkazish (800 000 so‘mdan yuqori)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-sarto-black" />
                <span>14 kun ichida almashtirish kafolati</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
