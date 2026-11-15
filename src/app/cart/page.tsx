"use client";

import Link from "next/link";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/features/cart/CartContext";
import { formatUZS } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="border-b border-sarto-border pb-6 mb-8">
          <nav className="text-xs text-sarto-muted uppercase tracking-wider mb-2">
            <Link href="/" className="hover:text-sarto-black">Bosh sahifa</Link> / <span>Savatcha</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-4xl text-sarto-black">Xarid savatchasi</h1>
        </div>

        {items.length === 0 ? (
          <div className="py-24 text-center space-y-4">
            <ShoppingBag className="w-12 h-12 mx-auto text-sarto-muted stroke-1" />
            <h2 className="font-serif text-xl text-sarto-black">Savatchangiz hozircha bo‘sh</h2>
            <p className="text-xs text-sarto-muted max-w-sm mx-auto">
              Siz hali hech qanday tovar tanlamadingiz. Bizning yangi kolleksiyamizni ko‘rib chiqing.
            </p>
            <div className="pt-4">
              <Link href="/shop">
                <Button>Xaridni boshlash</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Items List */}
            <div className="lg:col-span-2 divide-y divide-sarto-border border-y border-sarto-border">
              {items.map((item) => (
                <div key={item.variant_id} className="py-6 flex gap-6 items-center">
                  <div className="w-24 h-32 bg-sarto-ivory flex-shrink-0 flex items-center justify-center text-xs text-sarto-muted uppercase tracking-wider border border-sarto-border">
                    SARTO
                  </div>

                  <div className="flex-1 flex flex-col justify-between h-full space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link
                          href={`/product/${item.product.slug}`}
                          className="text-sm font-semibold uppercase tracking-wide text-sarto-black hover:text-sarto-taupe transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-xs text-sarto-muted mt-1">
                          {item.variant.size && `O‘lcham: ${item.variant.size}`}
                          {item.variant.color_name && ` | Rang: ${item.variant.color_name}`}
                        </p>
                      </div>

                      <button
                        onClick={() => removeItem(item.variant_id)}
                        className="text-sarto-muted hover:text-red-600 transition-colors p-1"
                        aria-label="O‘chirish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-sarto-border h-9">
                        <button
                          onClick={() => updateQuantity(item.variant_id, item.quantity - 1)}
                          className="px-3 text-xs hover:bg-sarto-ivory transition-colors cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-3 text-xs font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.variant_id, item.quantity + 1)}
                          className="px-3 text-xs hover:bg-sarto-ivory transition-colors cursor-pointer"
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
              ))}
            </div>

            {/* Order Summary Box */}
            <div className="bg-[#FAFAFA] border border-sarto-border p-6 space-y-6">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-sarto-black pb-3 border-b border-sarto-border">
                Xarid yakuni
              </h2>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-sarto-muted">
                  <span>Mahsulotlar summasi:</span>
                  <span className="text-sarto-black font-medium">{formatUZS(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sarto-muted">
                  <span>Yetkazib berish:</span>
                  <span className="text-sarto-black font-medium">Checkout’da hisoblanadi</span>
                </div>
                <div className="pt-3 border-t border-sarto-border flex justify-between text-sm font-bold text-sarto-black">
                  <span>Jami hisob:</span>
                  <span>{formatUZS(subtotal)}</span>
                </div>
              </div>

              <Link href="/checkout" className="block">
                <Button size="lg" className="w-full">
                  Buyurtmaga o‘tish <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
