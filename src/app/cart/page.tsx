"use client";

import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/features/cart/CartContext";
import { formatUZS } from "@/lib/format";
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from "lucide-react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, totalItems } = useCart();
  const freeShippingThreshold = 800000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
        {/* Breadcrumb */}
        <div className="border-b border-white/10 pb-6 mb-8">
          <nav aria-label="Non ushoqlari (Breadcrumbs)" className="text-xs text-white/50 mb-2 flex items-center gap-1.5">
            <Link href="/" className="hover:text-white transition-colors">Bosh sahifa</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white font-medium">Savatcha</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Xarid savatchasi ({totalItems} ta tovar)
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/40 mx-auto">
              <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h2 className="text-2xl font-bold text-white">Savatchangiz hozircha bo‘sh</h2>
            <p className="text-sm text-white/50 leading-relaxed">
              Siz hali hech qanday libos tanlamadingiz. Yangi erkaklar kolleksiyamizdan o‘zingizga mos modelni tanlang.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex min-h-[46px] items-center justify-center px-8 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 shadow-md"
              >
                Kolleksiyaga o‘tish
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Items List (8 cols on desktop) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Free shipping progress notice */}
              <div className="p-4 bg-[#141414] border border-white/10 rounded-2xl flex items-center gap-3 text-xs sm:text-sm text-white">
                <Truck className="w-5 h-5 text-white shrink-0" />
                {remainingForFreeShipping > 0 ? (
                  <span>
                    Yana <strong className="font-bold text-white">{formatUZS(remainingForFreeShipping)}</strong> miqdorida xarid qiling va <strong className="font-bold text-emerald-400">bepul yetkazib berish</strong> imkoniyatiga ega bo‘ling!
                  </span>
                ) : (
                  <span className="font-medium text-emerald-400">
                    Tabriklaymiz! Sizning buyurtmangiz uchun yetkazib berish butunlay <strong>BEPUL</strong>.
                  </span>
                )}
              </div>

              <div className="divide-y divide-white/10 border-y border-white/10">
                {items.map((item) => (
                  <div key={item.variant_id} className="py-6 flex gap-4 sm:gap-6 items-center">
                    <div className="w-24 sm:w-28 h-32 sm:h-36 relative bg-[#ECE9E2] rounded-2xl flex-shrink-0 border border-white/10 overflow-hidden p-2 flex items-center justify-center">
                      <Image
                        src={item.product.primary_image || "/images/products/oxford-shirt.jpg"}
                        alt={item.product.name}
                        fill
                        className="object-contain object-center"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between h-full space-y-3">
                      <div className="flex justify-between items-start gap-3">
                        <div>
                          <Link
                            href={`/product/${item.product.slug}`}
                            className="text-sm sm:text-base font-semibold text-white hover:text-white/80 transition-colors line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-xs text-white/50 mt-1">
                            {item.variant.size && <span>O‘lcham: {item.variant.size}</span>}
                            {item.variant.color_name && <span> | Rang: {item.variant.color_name}</span>}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.variant_id)}
                          className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-red-400 hover:border-red-400/50 transition-colors cursor-pointer"
                          aria-label={`${item.product.name}ni savatchadan o‘chirish`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-white/20 rounded-full bg-[#141414] overflow-hidden">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.variant_id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
                            aria-label="Miqdorni kamaytirish"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-xs font-semibold text-white">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.variant_id, item.quantity + 1)}
                            disabled={item.quantity >= item.variant.stock_quantity}
                            className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white disabled:opacity-30 transition-colors cursor-pointer"
                            aria-label="Miqdorni ko‘paytirish"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-base sm:text-lg font-bold text-white">
                            {formatUZS(item.variant.price_uzs * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary (4 cols on desktop) */}
            <div className="lg:col-span-4 bg-[#141414] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
              <h2 className="text-lg font-bold text-white">Buyurtma xulosasi</h2>

              <div className="space-y-3 text-sm divide-y divide-white/10">
                <div className="flex justify-between py-2 text-white/70">
                  <span>Tovarlar summasi:</span>
                  <span className="font-semibold text-white">{formatUZS(subtotal)}</span>
                </div>
                <div className="flex justify-between py-2 text-white/70">
                  <span>Yetkazib berish:</span>
                  <span className="font-semibold text-white">
                    {subtotal >= freeShippingThreshold ? (
                      <span className="text-emerald-400 font-bold">BEPUL</span>
                    ) : (
                      "Keyingi bosqichda"
                    )}
                  </span>
                </div>
                <div className="flex justify-between pt-4 text-base font-bold text-white">
                  <span>Umumiy oraliq summa:</span>
                  <span className="text-lg">{formatUZS(subtotal)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full min-h-[48px] rounded-full bg-white text-black text-sm font-semibold hover:bg-[#EAE6DF] transition-all flex items-center justify-center gap-2 shadow-md"
              >
                Buyurtmani rasmiylashtirish <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="pt-2 border-t border-white/10 space-y-2 text-xs text-white/50">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-white shrink-0" />
                  <span>Xavfsiz to‘lov va kuryer oldida kiyib ko‘rish</span>
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
