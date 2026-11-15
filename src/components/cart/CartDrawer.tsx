"use client";

import { useCart } from "@/features/cart/CartContext";
import { formatUZS } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { X, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeItem, subtotal } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-sarto-border">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-sarto-black" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-sarto-black">
                Savatcha ({items.length})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 hover:text-sarto-taupe transition-colors cursor-pointer"
              aria-label="Yopish"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-6 divide-y divide-sarto-border">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <ShoppingBag className="w-12 h-12 text-sarto-muted stroke-1 mb-4" />
                <p className="text-sm text-sarto-black font-medium mb-1">
                  Savatchangiz hozircha bo‘sh
                </p>
                <p className="text-xs text-sarto-muted mb-6">
                  SARTO kolleksiyasidan o‘zingizga mos premium liboslarni tanlang.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsCartOpen(false)}
                >
                  <Link href="/shop">Xaridni boshlash</Link>
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.variant_id} className="py-4 flex gap-4 first:pt-0 last:pb-0">
                  <div className="w-20 h-24 relative bg-sarto-ivory flex-shrink-0 border border-sarto-border overflow-hidden">
                    <Image
                      src={item.product.primary_image || "/images/products/oxford-shirt.jpg"}
                      alt={item.product.name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-xs font-semibold uppercase tracking-wide text-sarto-black">
                          {item.product.name}
                        </h3>
                        <button
                          onClick={() => removeItem(item.variant_id)}
                          className="text-sarto-muted hover:text-red-600 transition-colors cursor-pointer"
                          aria-label="O‘chirish"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-sarto-muted mt-1">
                        {item.variant.size && `O‘lcham: ${item.variant.size}`}
                        {item.variant.color_name && ` | Rang: ${item.variant.color_name}`}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-sarto-border">
                        <button
                          onClick={() => updateQuantity(item.variant_id, item.quantity - 1)}
                          className="px-2.5 py-1 text-xs hover:bg-sarto-ivory transition-colors cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-xs font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.variant_id, item.quantity + 1)}
                          className="px-2.5 py-1 text-xs hover:bg-sarto-ivory transition-colors cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xs font-semibold text-sarto-black">
                        {formatUZS(item.variant.price_uzs * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-sarto-border p-6 bg-[#FAFAFA] space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-xs uppercase tracking-wider text-sarto-muted">Jami:</span>
                <span className="text-base font-bold text-sarto-black">{formatUZS(subtotal)}</span>
              </div>
              <p className="text-[11px] text-sarto-muted">
                Yetkazib berish narxi checkout bosqichida hisoblanadi.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsCartOpen(false)}
                >
                  <Link href="/cart" className="w-full">Savatcha</Link>
                </Button>
                <Button
                  variant="primary"
                  onClick={() => setIsCartOpen(false)}
                >
                  <Link href="/checkout" className="w-full">Buyurtma</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
