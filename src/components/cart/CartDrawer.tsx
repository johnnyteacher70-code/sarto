"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/features/cart/CartContext";
import { formatUZS } from "@/lib/format";
import { Button } from "@/components/ui/Button";
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
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-8 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-250">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-sarto-border bg-white">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-sarto-black stroke-[1.75]" />
              <h2 className="text-base font-semibold text-sarto-black">
                Savatcha ({totalItems})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-sarto-muted hover:text-sarto-black transition-colors cursor-pointer -mr-2"
              aria-label="Savatchani yopish"
            >
              <X className="w-6 h-6 stroke-[1.75]" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-6 divide-y divide-sarto-border">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-sarto-ivory flex items-center justify-center text-sarto-muted">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base text-sarto-black font-semibold">
                    Savatchangiz hozircha bo‘sh
                  </h3>
                  <p className="text-xs text-sarto-muted max-w-xs">
                    Kolleksiyamizdan o‘zingizga mos premium erkaklar liboslarini tanlang.
                  </p>
                </div>
                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => setIsCartOpen(false)}
                  >
                    <Link href="/shop">Xaridni boshlash</Link>
                  </Button>
                </div>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.variant_id} className="py-5 flex gap-4 first:pt-0 last:pb-0">
                  <div className="w-20 h-26 relative bg-sarto-ivory flex-shrink-0 border border-sarto-border overflow-hidden">
                    <Image
                      src={item.product.primary_image || "/images/products/oxford-shirt.jpg"}
                      alt={item.product.name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-sm font-medium text-sarto-black line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.variant_id)}
                          className="min-w-[40px] min-h-[40px] flex items-center justify-center text-sarto-muted hover:text-red-600 transition-colors cursor-pointer -mr-2 -mt-2"
                          aria-label={`${item.product.name}ni o‘chirish`}
                        >
                          <Trash2 className="w-4 h-4 stroke-[1.5]" />
                        </button>
                      </div>

                      <p className="text-xs text-sarto-muted mt-1">
                        {item.variant.size && `O‘lcham: ${item.variant.size}`}
                        {item.variant.color_name && ` | Rang: ${item.variant.color_name}`}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2">
                      {/* Quantity Controller - accessible 40x40 touch targets */}
                      <div className="flex items-center border border-sarto-border bg-white">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.variant_id, item.quantity - 1)}
                          className="min-w-[36px] min-h-[36px] flex items-center justify-center hover:bg-sarto-ivory text-sm font-bold transition-colors cursor-pointer select-none"
                          aria-label="Miqdorni kamaytirish"
                        >
                          −
                        </button>
                        <span className="px-3 text-xs font-semibold select-none min-w-[28px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.variant_id, item.quantity + 1)}
                          className="min-w-[36px] min-h-[36px] flex items-center justify-center hover:bg-sarto-ivory text-sm font-bold transition-colors cursor-pointer select-none"
                          aria-label="Miqdorni oshirish"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-sm font-bold text-sarto-black">
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
            <div className="border-t border-sarto-border p-6 bg-[#FAFAFA] space-y-4">
              <div className="flex justify-between items-baseline text-sm">
                <span className="text-sm font-medium text-sarto-muted">Oraliq summa:</span>
                <span className="text-lg font-bold text-sarto-black">{formatUZS(subtotal)}</span>
              </div>
              <p className="text-xs text-sarto-muted leading-tight">
                Yetkazib berish narxi checkout manziliga qarab hisoblanadi (800 000 so‘mdan yuqoriga bepul).
              </p>

              <div className="space-y-2 pt-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full flex items-center justify-center gap-2 min-h-[50px] bg-sarto-black text-white text-sm font-semibold tracking-wide hover:bg-sarto-charcoal transition-all shadow-xs"
                >
                  Buyurtmani rasmiylashtirish <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full flex items-center justify-center min-h-[44px] border border-sarto-black text-sarto-black text-xs font-medium tracking-wide hover:bg-sarto-ivory transition-colors"
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
