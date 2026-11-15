"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/features/cart/CartContext";
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMobileSummaryOpen, setIsMobileSummaryOpen] = useState(false);

  // Form ma'lumotlari
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

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
        {/* Breadcrumb */}
        <div className="border-b border-sarto-border pb-6 mb-8">
          <nav aria-label="Non ushoqlari (Breadcrumbs)" className="text-xs text-sarto-muted mb-2 flex items-center gap-1.5">
            <Link href="/" className="hover:text-sarto-black">Bosh sahifa</Link>
            <span aria-hidden="true">/</span>
            <Link href="/cart" className="hover:text-sarto-black">Savatcha</Link>
            <span aria-hidden="true">/</span>
            <span className="text-sarto-black font-semibold">Buyurtma rasmiylashtirish</span>
          </nav>
          <h1 className="font-serif text-2xl sm:text-4xl text-sarto-black">
            Buyurtma rasmiylashtirish
          </h1>
        </div>

        {/* Mobile Accordion Summary for Quick Glance */}
        <div className="lg:hidden mb-8 border border-sarto-border bg-sarto-ivory/40 p-4">
          <button
            type="button"
            onClick={() => setIsMobileSummaryOpen(!isMobileSummaryOpen)}
            className="w-full flex items-center justify-between text-sm font-semibold text-sarto-black"
          >
            <span className="flex items-center gap-2">
              Buyurtma tarkibi ({items.length} ta)
              <ChevronDown className={`w-4 h-4 transition-transform ${isMobileSummaryOpen ? "rotate-180" : ""}`} />
            </span>
            <span className="text-base font-bold">{formatUZS(finalTotal)}</span>
          </button>

          {isMobileSummaryOpen && (
            <div className="pt-4 mt-4 border-t border-sarto-border space-y-3">
              {items.map((item) => (
                <div key={item.variant_id} className="flex justify-between text-xs">
                  <span>{item.product.name} ({item.variant.size}) × {item.quantity}</span>
                  <span className="font-semibold">{formatUZS(item.variant.price_uzs * item.quantity)}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-sarto-border flex justify-between text-xs text-sarto-muted">
                <span>Yetkazib berish:</span>
                <span>{shippingFee === 0 ? "Bepul" : formatUZS(shippingFee)}</span>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 text-sm text-red-800 flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Main Form (7 cols on desktop) */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-10">
            {/* Step 1: Customer Info */}
            <div className="space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-sarto-border">
                <span className="w-6 h-6 rounded-full bg-sarto-black text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h2 className="text-base font-semibold text-sarto-black">
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
            <div className="space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-sarto-border">
                <span className="w-6 h-6 rounded-full bg-sarto-black text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h2 className="text-base font-semibold text-sarto-black">
                  Yetkazib berish manzili
                </h2>
              </div>

              {/* Region Select */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="checkout-region" className="block text-sm font-medium text-sarto-black">
                  Viloyat / Shahar <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <select
                    id="checkout-region"
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    className="w-full min-h-[46px] border border-sarto-border bg-white px-3.5 pr-10 text-sm sm:text-base text-sarto-black focus-visible:outline-none focus-visible:border-sarto-black focus-visible:ring-1 focus-visible:ring-sarto-black rounded-none cursor-pointer appearance-none"
                  >
                    {UZBEKISTAN_REGIONS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-sarto-muted absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
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
            <div className="space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-sarto-border">
                <span className="w-6 h-6 rounded-full bg-sarto-black text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h2 className="text-base font-semibold text-sarto-black">
                  To‘lov usuli
                </h2>
              </div>

              <div className="p-5 border-2 border-sarto-black bg-sarto-ivory/40 flex items-start gap-3.5">
                <div className="pt-0.5">
                  <CheckCircle2 className="w-5 h-5 text-sarto-black" />
                </div>
                <div className="space-y-1">
                  <span className="text-sm font-semibold text-sarto-black block">
                    Yetkazib berilganda to‘lov (Naqd pul yoki Karta orqali)
                  </span>
                  <p className="text-xs text-sarto-muted leading-relaxed">
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
                className="w-full min-h-[54px] text-base"
                isLoading={isLoading}
                disabled={items.length === 0}
              >
                Buyurtmani tasdiqlash ({formatUZS(finalTotal)})
              </Button>
              <p className="text-xs text-sarto-muted text-center mt-3">
                «Buyurtmani tasdiqlash» tugmasini bosish orqali siz foydalanish shartlariga rozilik bildirasiz.
              </p>
            </div>
          </form>

          {/* Desktop Order Summary Sidebar (5 cols on desktop) */}
          <div className="lg:col-span-5 bg-[#FAFAFA] border border-sarto-border p-6 sm:p-7 space-y-6 sticky top-24">
            <h2 className="text-base font-semibold text-sarto-black pb-3 border-b border-sarto-border">
              Buyurtmangiz tarkibi ({items.length})
            </h2>

            <div className="divide-y divide-sarto-border max-h-80 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.variant_id} className="py-3 flex gap-3 items-center text-sm">
                  <div className="w-14 h-18 relative bg-sarto-ivory shrink-0 border border-sarto-border overflow-hidden">
                    <Image
                      src={item.product.primary_image || "/images/products/oxford-shirt.jpg"}
                      alt={item.product.name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sarto-black truncate">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-sarto-muted mt-0.5">
                      {item.variant.size && `O‘lcham: ${item.variant.size}`} | {item.quantity} dona
                    </p>
                  </div>
                  <span className="font-semibold text-sarto-black shrink-0">
                    {formatUZS(item.variant.price_uzs * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t border-sarto-border text-sm">
              <div className="flex justify-between text-sarto-muted">
                <span>Mahsulotlar summasi:</span>
                <span className="text-sarto-black font-semibold">{formatUZS(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sarto-muted">
                <span>Yetkazib berish ({formData.region}):</span>
                <span className="text-sarto-black font-semibold">
                  {shippingFee === 0 ? <strong className="text-emerald-700">Bepul</strong> : formatUZS(shippingFee)}
                </span>
              </div>
              <div className="pt-3 border-t border-sarto-border flex justify-between text-lg font-bold text-sarto-black">
                <span>Jami to‘lov:</span>
                <span>{formatUZS(finalTotal)}</span>
              </div>
            </div>

            <div className="p-4 bg-white border border-sarto-border space-y-2 text-xs text-sarto-muted">
              <div className="flex items-center gap-2 text-sarto-black">
                <Truck className="w-4 h-4 shrink-0 text-sarto-black" />
                <span>O‘zbekiston bo‘ylab 1—3 ish kunida yetkaziladi</span>
              </div>
              <div className="flex items-center gap-2 text-sarto-black">
                <ShieldCheck className="w-4 h-4 shrink-0 text-sarto-black" />
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
