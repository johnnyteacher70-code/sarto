"use client";

import Link from "next/link";
import Image from "next/image";
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

  const imagePath =
    product.images?.[0]?.storage_path || "/images/products/oxford-shirt.jpg";

  // O'lchamlar ro'yxati
  const sizes = Array.from(
    new Set(product.variants?.map((v) => v.size).filter(Boolean))
  );

  return (
    <article className="group relative flex flex-col h-full bg-white transition-all">
      {/* Image container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-sarto-ivory border border-sarto-border transition-all">
        <Link
          href={`/product/${product.slug}`}
          className="block w-full h-full relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sarto-black"
          aria-label={`${product.name}, ${formatUZS(price)}`}
        >
          <Image
            src={imagePath}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            priority={product.is_featured}
          />
        </Link>

        {/* Status Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 pointer-events-none z-10">
          {product.is_new && (
            <span className="bg-sarto-black text-white text-[10px] sm:text-xs font-semibold px-2 py-0.5 tracking-wider uppercase">
              Yangi
            </span>
          )}
          {isSale && (
            <span className="bg-red-700 text-white text-[10px] sm:text-xs font-semibold px-2 py-0.5 tracking-wider uppercase">
              Chegirma
            </span>
          )}
        </div>

        {/* Wishlist button - Accessible 44x44px touch target */}
        <button
          type="button"
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-1.5 right-1.5 min-w-[44px] min-h-[44px] flex items-center justify-center bg-white/95 backdrop-blur-xs text-sarto-black hover:text-red-600 transition-colors cursor-pointer border border-sarto-border shadow-xs z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sarto-black"
          aria-label={isWishlisted ? `${product.name}ni sevimlilardan o‘chirish` : `${product.name}ni sevimliga qo‘shish`}
          aria-pressed={isWishlisted}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? "fill-red-600 text-red-600" : "text-sarto-black"
            }`}
          />
        </button>

        {/* Sizes Bar - Clean overlay on desktop hover, visible on mobile tap */}
        {sizes.length > 0 && (
          <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-xs border-t border-sarto-border py-2 px-3 translate-y-full group-hover:translate-y-0 transition-transform duration-200 hidden sm:flex items-center justify-center gap-1.5 z-10">
            <span className="text-[11px] text-sarto-muted mr-1 font-medium">O‘lcham:</span>
            {sizes.map((size) => (
              <span
                key={size}
                className="text-xs font-semibold px-2 py-0.5 border border-sarto-border text-sarto-black bg-white"
              >
                {size}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Product Details Area */}
      <div className="pt-3.5 pb-1 flex flex-col flex-1 justify-between">
        <div>
          {product.category && (
            <p className="text-xs text-sarto-muted font-normal mb-1">
              {product.category.name}
            </p>
          )}

          <h3 className="text-sm sm:text-base font-medium text-sarto-black line-clamp-1 group-hover:text-sarto-taupe transition-colors">
            <Link href={`/product/${product.slug}`}>
              {product.name}
            </Link>
          </h3>
        </div>

        {/* Price & Size summary */}
        <div className="mt-2.5 flex items-baseline justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-bold text-sarto-black">
              {formatUZS(price)}
            </span>
            {isSale && (
              <span className="text-xs sm:text-sm text-sarto-muted line-through font-normal">
                {formatUZS(comparePrice!)}
              </span>
            )}
          </div>

          {/* Mobile size indicator */}
          {sizes.length > 0 && (
            <span className="text-[11px] text-sarto-muted sm:hidden font-medium">
              {sizes.slice(0, 3).join(", ")}{sizes.length > 3 ? "..." : ""}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
