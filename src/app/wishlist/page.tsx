"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";
import { useWishlist } from "@/features/wishlist/WishlistContext";
import { Heart, ArrowRight, Trash2 } from "lucide-react";

const emptySubscribe = () => () => {};

export default function WishlistPage() {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const { items, clearWishlist } = useWishlist();

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
        {/* Breadcrumb & Header */}
        <div className="border-b border-white/10 pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <nav aria-label="Non ushoqlari (Breadcrumbs)" className="text-xs text-white/50 mb-2 flex items-center gap-1.5">
              <Link href="/" className="hover:text-white">Bosh sahifa</Link>
              <span aria-hidden="true">/</span>
              <span className="text-white font-medium">Sevimlilar</span>
            </nav>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Sevimli mahsulotlarim {isMounted && items.length > 0 && `(${items.length})`}
            </h1>
          </div>

          {isMounted && items.length > 0 && (
            <button
              type="button"
              onClick={clearWishlist}
              className="inline-flex items-center gap-2 text-xs text-white/50 hover:text-red-400 transition-colors cursor-pointer self-start sm:self-auto py-1.5 px-3 rounded-full hover:bg-white/5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Ro‘yxatni tozalash</span>
            </button>
          )}
        </div>

        {/* Empty State */}
        {isMounted && items.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 mx-auto">
              <Heart className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Sevimlilar ro‘yxati bo‘sh</h2>
            <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
              Sizga ma’qul kelgan liboslarni kartochkadagi yurakcha belgisini bosish orqali shu yerga saqlab qo‘yishingiz mumkin.
            </p>
            <div className="pt-2">
              <Link href="/shop">
                <Button size="lg" className="min-h-[46px] px-8">
                  Katalogga o‘tish <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
