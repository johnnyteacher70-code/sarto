"use client";

import Link from "next/link";
import { Product } from "@/types";
import { formatUZS } from "@/lib/format";
import { Heart } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const defaultVariant = product.variants?.[0];
  const price = defaultVariant?.price_uzs || 0;
  const comparePrice = defaultVariant?.compare_at_price_uzs;
  const isSale = comparePrice && comparePrice > price;

  // O'lchamlar ro'yxati
  const sizes = Array.from(
    new Set(product.variants?.map((v) => v.size).filter(Boolean))
  );

  return (
    <div className="group relative flex flex-col">
      {/* Image container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-sarto-ivory border border-sarto-border transition-all">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center select-none bg-gradient-to-b from-transparent to-black/[0.02]">
            <span className="font-serif text-xs uppercase tracking-[0.3em] text-sarto-muted">
              SARTO
            </span>
            <span className="font-serif text-sm uppercase tracking-wider text-sarto-black/80 mt-2 font-medium">
              {product.name}
            </span>
          </div>
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 pointer-events-none">
          {product.is_new && (
            <span className="bg-sarto-black text-white text-[9px] uppercase tracking-wider px-2 py-0.5 font-medium">
              Yangi
            </span>
          )}
          {isSale && (
            <span className="bg-red-700 text-white text-[9px] uppercase tracking-wider px-2 py-0.5 font-medium">
              Chegirma
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-xs text-sarto-black hover:text-red-600 transition-colors cursor-pointer border border-sarto-border"
          aria-label="Sevimliga qo‘shish"
        >
          <Heart
            className={`w-3.5 h-3.5 ${
              isWishlisted ? "fill-red-600 text-red-600" : "text-sarto-black"
            }`}
          />
        </button>

        {/* Size chips on hover */}
        {sizes.length > 0 && (
          <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-xs border-t border-sarto-border p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-200 hidden sm:flex items-center justify-center gap-1.5">
            <span className="text-[10px] text-sarto-muted uppercase tracking-wider mr-1">
              O‘lcham:
            </span>
            {sizes.map((size) => (
              <span
                key={size}
                className="text-[10px] font-medium px-1.5 py-0.5 border border-sarto-border text-sarto-black"
              >
                {size}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-3.5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/product/${product.slug}`}
            className="text-xs font-semibold uppercase tracking-wide text-sarto-black hover:text-sarto-taupe transition-colors line-clamp-1"
          >
            {product.name}
          </Link>
        </div>

        <div className="mt-1 flex items-center gap-2">
          <span className="text-xs font-bold text-sarto-black">
            {formatUZS(price)}
          </span>
          {isSale && (
            <span className="text-xs text-sarto-muted line-through">
              {formatUZS(comparePrice!)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
