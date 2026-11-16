"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/features/cart/CartContext";
import { useAuth } from "@/features/auth/AuthContext";
import { formatUZS } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ShieldCheck, Truck, ChevronDown, CheckCircle2, AlertCircle } from "lucide-react";

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
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMobileSummaryOpen, setIsMobileSummaryOpen] = useState(false);

  // Form ma'lumotlari
  const [formData, setFormData] = useState(() => ({
    customer_name: user?.name || "",
    customer_phone:
      user?.emailOrPhone?.startsWith("+998") ? user.emailOrPhone : "+998",
    customer_email: user?.emailOrPhone?.includes("@") ? user.emailOrPhone : "",
    region: "Toshkent shahri",
    city: "",
    street: user?.addresses?.[0]?.address || "",
    house: "",
    apartment: "",
    customer_note: "",
  }));

  // Sync if user updates
  const [prevUser, setPrevUser] = useState(user);
  if (user !== prevUser) {
    setPrevUser(user);
    if (user) {
      setFormData((prev) => ({
        ...prev,
        customer_name: prev.customer_name || user.name,
        customer_phone:
          prev.customer_phone === "+998" && user.emailOrPhone.startsWith("+998")
            ? user.emailOrPhone
            : prev.customer_phone,
        customer_email:
          prev.customer_email || (user.emailOrPhone.includes("@") ? user.emailOrPhone : ""),
        street: prev.street || (user.addresses[0]?.address || ""),
      }));
    }
  }

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
      setError("Iltimos, ism-familiyangiz va telefon raqamingizni to‘liq kiriting.");
      return;
    }

    if (!formData.street.trim() || !formData.house.trim()) {
      setError("Iltimos, yetkazib berish manzilini (ko‘cha va uy raqami) kiriting.");
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
      try {
        const savedOrdersRaw = localStorage.getItem("sarto_orders");
        const savedOrders = savedOrdersRaw ? JSON.parse(savedOrdersRaw) : [];
        savedOrders.unshift({
          orderNumber,
          itemsCount: items.reduce((acc, i) => acc + i.quantity, 0),
          total: finalTotal,
          status: "Qabul qilindi",
          createdAt: new Date().toISOString(),
          paymentMethod: "Naqd / Karta (Yetkazilganda)",
        });
        localStorage.setItem("sarto_orders", JSON.stringify(savedOrders));
      } catch (e) {
        console.error("Failed to save order to localStorage", e);
      }
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
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
        {/* Breadcrumb */}
        <div className="border-b border-white/10 pb-6 mb-8">
          <nav aria-label="Non ushoqlari (Breadcrumbs)" className="text-xs text-white/50 mb-2 flex items-center gap-1.5">
            <Link href="/" className="hover:text-white">Bosh sahifa</Link>
            <span aria-hidden="true">/</span>
            <Link href="/cart" className="hover:text-white">Savatcha</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white font-medium">Buyurtma rasmiylashtirish</span>
          </nav>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Buyurtma rasmiylashtirish
          </h1>
        </div>

        {/* Mobile Accordion Summary for Quick Glance */}
        <div className="lg:hidden mb-8 border border-white/10 rounded-2xl bg-[#141414] p-4">
          <button
            type="button"
            onClick={() => setIsMobileSummaryOpen(!isMobileSummaryOpen)}
            className="w-full flex items-center justify-between text-sm font-semibold text-white"
          >
            <span className="flex items-center gap-2">
              Buyurtma tarkibi ({items.length} ta)
              <ChevronDown className={`w-4 h-4 transition-transform ${isMobileSummaryOpen ? "rotate-180" : ""}`} />
            </span>
            <span className="text-base font-bold">{formatUZS(finalTotal)}</span>
          </button>

          {isMobileSummaryOpen && (
            <div className="pt-4 mt-4 border-t border-white/10 space-y-3">
              {items.map((item) => (
                <div key={item.variant_id} className="flex justify-between text-xs text-white/80">
                  <span>{item.product.name} ({item.variant.size}) × {item.quantity}</span>
                  <span className="font-semibold text-white">{formatUZS(item.variant.price_uzs * item.quantity)}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-white/10 flex justify-between text-xs text-white/50">
                <span>Yetkazib berish:</span>
                <span>{shippingFee === 0 ? "Bepul" : formatUZS(shippingFee)}</span>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-950/60 border border-red-500/50 rounded-2xl text-sm text-red-200 flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Main Form (7 cols on desktop) */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-10">
            {/* Step 1: Customer Info */}
            <div className="bg-[#141414] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                <span className="w-6 h-6 rounded-full bg-white text-black text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h2 className="text-base font-bold text-white">
                  Qabul qiluvchi ma’lumotlari
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Ism va Familiyangiz"
                  placeholder="Shoxrux Xalilov"
                  required
                  value={formData.customer_name}
                  onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                />
                <Input
                  label="Telefon raqami"
                  placeholder="+998 (90) 123-45-67"
                  required
                  helperText="Kuryer buyurtma kuni siz bilan bog‘lanadi"
                  value={formData.customer_phone}
                  onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                />
              </div>

              <Input
                label="Elektron pochta (ixtiyoriy)"
                type="email"
                placeholder="shoxrux@example.com"
                value={formData.customer_email}
                onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
              />
            </div>

            {/* Step 2: Delivery Address */}
            <div className="bg-[#141414] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                <span className="w-6 h-6 rounded-full bg-white text-black text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h2 className="text-base font-bold text-white">
                  Yetkazib berish manzili
                </h2>
              </div>

              {/* Region Select */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="checkout-region" className="block text-xs sm:text-sm font-medium text-white/90">
                  Viloyat / Shahar <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <select
                    id="checkout-region"
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    className="w-full min-h-[46px] border border-white/15 bg-[#141414] px-4 pr-10 text-sm sm:text-base text-white focus-visible:outline-none focus-visible:border-white focus-visible:ring-1 focus-visible:ring-white rounded-xl cursor-pointer appearance-none"
                  >
                    {UZBEKISTAN_REGIONS.map((r) => (
                      <option key={r} value={r} className="bg-[#141414] text-white">
                        {r}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-white/50 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <Input
                    label="Ko‘cha va mahalla nomi"
                    placeholder="Amir Temur shoh ko‘chasi"
                    required
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  />
                </div>
                <Input
                  label="Uy raqami"
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
                label="Kuryer uchun qo‘shimcha izoh (ixtiyoriy)"
                placeholder="Domofon kodi, mo‘ljal va boshqa qulayliklar..."
                value={formData.customer_note}
                onChange={(e) => setFormData({ ...formData, customer_note: e.target.value })}
              />
            </div>

            {/* Step 3: Payment Method */}
            <div className="bg-[#141414] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                <span className="w-6 h-6 rounded-full bg-white text-black text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h2 className="text-base font-bold text-white">
                  To‘lov usuli
                </h2>
              </div>

              <div className="p-5 border border-white/20 rounded-2xl bg-white/5 flex items-start gap-3.5">
                <div className="pt-0.5">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <div className="space-y-1">
                  <span className="text-sm font-semibold text-white block">
                    Yetkazib berilganda to‘lov (Naqd pul yoki Karta orqali)
                  </span>
                  <p className="text-xs text-white/50 leading-relaxed">
                    Xarid uchun oldindan to‘lov talab etilmaydi. Tovarni kuryer oldida ko‘rib,
                    kiyib ko‘rishingiz va shundan so‘nggina to‘lovni amalga oshirishingiz mumkin.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <Button
                type="submit"
                size="lg"
                className="w-full min-h-[52px] text-base"
                isLoading={isLoading}
                disabled={items.length === 0}
              >
                Buyurtmani tasdiqlash ({formatUZS(finalTotal)})
              </Button>
              <p className="text-xs text-white/40 text-center mt-3">
                «Buyurtmani tasdiqlash» tugmasini bosish orqali siz foydalanish shartlariga rozilik bildirasiz.
              </p>
            </div>
          </form>

          {/* Desktop Order Summary Sidebar (5 cols on desktop) */}
          <div className="lg:col-span-5 bg-[#141414] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 sticky top-24">
            <h2 className="text-base font-bold text-white pb-3 border-b border-white/10">
              Buyurtmangiz tarkibi ({items.length})
            </h2>

            <div className="divide-y divide-white/10 max-h-80 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.variant_id} className="py-3 flex gap-3 items-center text-sm">
                  <div className="w-14 h-16 relative bg-[#ECE9E2] rounded-xl shrink-0 border border-white/10 overflow-hidden p-1 flex items-center justify-center">
                    <Image
                      src={item.product.primary_image || "/images/products/oxford-shirt.jpg"}
                      alt={item.product.name}
                      fill
                      className="object-contain object-center"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white truncate text-xs sm:text-sm">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-white/50 mt-0.5">
                      {item.variant.size && `O‘lcham: ${item.variant.size}`} | {item.quantity} dona
                    </p>
                  </div>
                  <span className="font-bold text-white shrink-0 text-xs sm:text-sm">
                    {formatUZS(item.variant.price_uzs * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10 text-sm">
              <div className="flex justify-between text-white/60">
                <span>Mahsulotlar summasi:</span>
                <span className="text-white font-semibold">{formatUZS(subtotal)}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Yetkazib berish ({formData.region}):</span>
                <span className="text-white font-semibold">
                  {shippingFee === 0 ? <strong className="text-emerald-400">Bepul</strong> : formatUZS(shippingFee)}
                </span>
              </div>
              <div className="pt-3 border-t border-white/10 flex justify-between text-lg font-bold text-white">
                <span>Jami to‘lov:</span>
                <span>{formatUZS(finalTotal)}</span>
              </div>
            </div>

            <div className="p-4 bg-[#181818] border border-white/10 rounded-2xl space-y-2 text-xs text-white/60">
              <div className="flex items-center gap-2 text-white">
                <Truck className="w-4 h-4 shrink-0 text-white" />
                <span>O‘zbekiston bo‘ylab 1—3 ish kunida yetkaziladi</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <ShieldCheck className="w-4 h-4 shrink-0 text-white" />
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
