"use client";

import Link from "next/link";
import Image from "next/image";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/features/cart/CartContext";
import { formatUZS } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from "lucide-react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, totalItems } = useCart();
  const freeShippingThreshold = 800000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

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
            <span className="text-sarto-black font-semibold">Savatcha</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-4xl text-sarto-black">
            Xarid savatchasi ({totalItems} ta tovar)
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-sarto-ivory flex items-center justify-center text-sarto-muted mx-auto">
              <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h2 className="font-serif text-2xl text-sarto-black">Savatchangiz hozircha bo‘sh</h2>
            <p className="text-sm text-sarto-muted leading-relaxed">
              Siz hali hech qanday libos tanlamadingiz. Yangi erkaklar kolleksiyamizdan o‘zingizga mos modelni tanlang.
            </p>
            <div className="pt-2">
              <Link href="/shop">
                <Button size="lg">Kolleksiyaga o‘tish</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Items List (8 cols on desktop) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Free shipping progress notice */}
              <div className="p-4 bg-sarto-ivory/60 border border-sarto-border flex items-center gap-3 text-xs sm:text-sm text-sarto-black">
                <Truck className="w-5 h-5 text-sarto-black shrink-0" />
                {remainingForFreeShipping > 0 ? (
                  <span>
                    Yana <strong className="font-bold">{formatUZS(remainingForFreeShipping)}</strong> miqdorida xarid qiling va <strong className="font-bold text-emerald-800">bepul yetkazib berish</strong> imkoniyatiga ega bo‘ling!
                  </span>
                ) : (
                  <span className="font-medium text-emerald-800">
                    Tabriklaymiz! Sizning buyurtmangiz uchun yetkazib berish butunlay <strong>BEPUL</strong>.
                  </span>
                )}
              </div>

              <div className="divide-y divide-sarto-border border-y border-sarto-border">
                {items.map((item) => (
                  <div key={item.variant_id} className="py-6 flex gap-4 sm:gap-6 items-center">
                    <div className="w-24 sm:w-28 h-32 sm:h-36 relative bg-sarto-ivory flex-shrink-0 border border-sarto-border overflow-hidden">
                      <Image
                        src={item.product.primary_image || "/images/products/oxford-shirt.jpg"}
                        alt={item.product.name}
                        fill
                        className="object-cover object-center"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between h-full space-y-3">
                      <div className="flex justify-between items-start gap-3">
                        <div>
                          <Link
                            href={`/product/${item.product.slug}`}
                            className="text-sm sm:text-base font-medium text-sarto-black hover:text-sarto-taupe transition-colors line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-xs text-sarto-muted mt-1">
                            {item.variant.size && <span className="font-medium">O‘lcham: {item.variant.size}</span>}
                            {item.variant.color_name && <span> | Rang: {item.variant.color_name}</span>}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.variant_id)}
                          className="min-w-[44px] min-h-[44px] flex items-center justify-center text-sarto-muted hover:text-red-600 transition-colors cursor-pointer -mr-2 -mt-2"
                          aria-label={`${item.product.name}ni savatchadan o‘chirish`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        {/* Quantity Controller - accessible 40x40 touch targets */}
                        <div className="flex items-center border border-sarto-border bg-white min-h-[42px]">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.variant_id, item.quantity - 1)}
                            className="min-w-[40px] min-h-[40px] flex items-center justify-center hover:bg-sarto-ivory text-sm font-bold transition-colors cursor-pointer select-none"
                            aria-label="Miqdorni kamaytirish"
                          >
                            −
                          </button>
                          <span className="px-3.5 text-xs sm:text-sm font-semibold select-none min-w-[32px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.variant_id, item.quantity + 1)}
                            className="min-w-[40px] min-h-[40px] flex items-center justify-center hover:bg-sarto-ivory text-sm font-bold transition-colors cursor-pointer select-none"
                            aria-label="Miqdorni oshirish"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-base sm:text-lg font-bold text-sarto-black">
                          {formatUZS(item.variant.price_uzs * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/shop"
                  className="text-xs sm:text-sm font-medium text-sarto-black hover:text-sarto-taupe underline underline-offset-4"
                >
                  ← Xaridni davom ettirish
                </Link>
              </div>
            </div>

            {/* Order Summary Box (4 cols on desktop) */}
            <div className="lg:col-span-4 bg-[#FAFAFA] border border-sarto-border p-6 sm:p-7 space-y-6 sticky top-24">
              <h2 className="text-base font-semibold text-sarto-black pb-3 border-b border-sarto-border">
                Xarid hisobi
              </h2>

              <div className="space-y-3.5 text-sm">
                <div className="flex justify-between text-sarto-muted">
                  <span>Oraliq summa:</span>
                  <span className="text-sarto-black font-semibold">{formatUZS(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sarto-muted">
                  <span>Yetkazib berish:</span>
                  <span className="text-sarto-black font-medium text-xs sm:text-sm">
                    {subtotal >= freeShippingThreshold ? (
                      <span className="text-emerald-700 font-bold">Bepul</span>
                    ) : (
                      "Checkout’da hisoblanadi"
                    )}
                  </span>
                </div>
                <div className="pt-4 border-t border-sarto-border flex justify-between text-lg font-bold text-sarto-black">
                  <span>Jami to‘lov:</span>
                  <span>{formatUZS(subtotal)}</span>
                </div>
              </div>

              <Link href="/checkout" className="block">
                <Button size="lg" className="w-full min-h-[52px]">
                  Buyurtmani rasmiylashtirish <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>

              <div className="p-4 bg-white border border-sarto-border space-y-2 text-xs text-sarto-muted">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-sarto-black shrink-0" />
                  <span>Toshkentda 24 soat ichida yetkaziladi</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-sarto-black shrink-0" />
                  <span>Tovarni kuryer oldida kiyib ko‘rish mumkin</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
