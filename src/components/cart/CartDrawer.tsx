"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/features/cart/CartContext";
import { formatUZS } from "@/lib/format";
import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useEffect } from "react";

export function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeItem, subtotal, totalItems } = useCart();

  // Scroll lock when cart drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Xarid savatchasi">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-8 sm:pl-10">
        <div className="w-screen max-w-md bg-[#121212] border-l border-white/10 text-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-250">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#121212]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-white stroke-[1.75]" />
              <h2 className="text-base font-semibold text-white">
                Savatcha ({totalItems})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="min-w-[40px] min-h-[40px] flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer -mr-2"
              aria-label="Savatchani yopish"
            >
              <X className="w-6 h-6 stroke-[1.75]" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-6 divide-y divide-white/10">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/40">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base text-white font-semibold">
                    Savatchangiz hozircha bo‘sh
                  </h3>
                  <p className="text-xs text-white/50 max-w-xs">
                    Kolleksiyamizdan o‘zingizga mos premium erkaklar liboslarini tanlang.
                  </p>
                </div>
                <div className="pt-2">
                  <Link
                    href="/shop"
                    onClick={() => setIsCartOpen(false)}
                    className="inline-flex min-h-[44px] items-center justify-center px-6 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors shadow-sm"
                  >
                    Xaridni boshlash
                  </Link>
                </div>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.variant_id} className="py-5 flex gap-4 first:pt-0 last:pb-0">
                  <div className="w-20 h-24 relative bg-[#ECE9E2] rounded-xl flex-shrink-0 border border-white/10 overflow-hidden p-1.5 flex items-center justify-center">
                    <Image
                      src={item.product.primary_image || "/images/products/oxford-shirt.jpg"}
                      alt={item.product.name}
                      fill
                      className="object-contain object-center"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-sm font-semibold text-white line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.variant_id)}
                          className="min-w-[36px] min-h-[36px] flex items-center justify-center text-white/40 hover:text-red-400 transition-colors cursor-pointer -mr-2 -mt-2"
                          aria-label="Tovar o‘chirish"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-white/50 mt-0.5">
                        {item.variant.size && <span>O‘lcham: {item.variant.size}</span>}
                        {item.variant.color_name && <span> | {item.variant.color_name}</span>}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-white/15 rounded-full overflow-hidden bg-white/5">
                        <button
                          onClick={() => updateQuantity(item.variant_id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
                          aria-label="Miqdorni kamaytirish"
                        >
                          -
                        </button>
                        <span className="w-7 text-center text-xs font-semibold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.variant_id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
                          aria-label="Miqdorni ko‘paytirish"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-sm font-bold text-white">
                        {formatUZS(item.variant.price_uzs * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Summary and Actions */}
          {items.length > 0 && (
            <div className="border-t border-white/10 p-6 bg-[#0E0E0E] space-y-4">
              <div className="flex justify-between items-baseline text-sm">
                <span className="text-sm font-medium text-white/60">Oraliq summa:</span>
                <span className="text-lg font-bold text-white">{formatUZS(subtotal)}</span>
              </div>
              <p className="text-xs text-white/50 leading-tight">
                Yetkazib berish narxi checkout manziliga qarab hisoblanadi (800 000 so‘mdan yuqoriga bepul).
              </p>

              <div className="space-y-2 pt-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full flex items-center justify-center gap-2 min-h-[48px] rounded-full bg-white text-black text-sm font-semibold tracking-wide hover:bg-[#EAE6DF] transition-all shadow-md"
                >
                  Buyurtmani rasmiylashtirish <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full flex items-center justify-center min-h-[42px] rounded-full border border-white/20 text-white/80 hover:text-white hover:bg-white/5 text-xs font-medium tracking-wide transition-colors"
                >
                  Savatchani to‘liq ko‘rish
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
