"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { formatUZS } from "@/lib/format";
import { Heart, ShoppingBag } from "lucide-react";
import { useCart } from "@/features/cart/CartContext";
import { useWishlist } from "@/features/wishlist/WishlistContext";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);
  const { addItem } = useCart();

  const defaultVariant = product.variants?.[0];
  const price = defaultVariant?.price_uzs || 0;
  const comparePrice = defaultVariant?.compare_at_price_uzs;
  const isSale = comparePrice && comparePrice > price;
  const discountPercent =
    isSale && comparePrice
      ? Math.round(((comparePrice - price) / comparePrice) * 100)
      : null;

  const imagePath =
    product.images?.[0]?.storage_path || "/images/products/oxford-shirt.jpg";

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!defaultVariant || defaultVariant.stock_quantity <= 0) return;

    addItem({
      id: `${defaultVariant.id}-${Date.now()}`,
      variant_id: defaultVariant.id,
      product: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        primary_image: imagePath,
      },
      variant: {
        id: defaultVariant.id,
        sku: defaultVariant.sku,
        size: defaultVariant.size,
        color_name: defaultVariant.color_name,
        price_uzs: defaultVariant.price_uzs,
        stock_quantity: defaultVariant.stock_quantity,
      },
      quantity: 1,
    });
  };

  return (
    <article className="group relative flex flex-col h-full bg-[#121212] border border-white/[0.08] rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300">
      {/* Product Image Stage (Light/ivory stage contrast matching reference design) */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#ECE9E2] flex items-center justify-center p-4">
        <Link
          href={`/product/${product.slug}`}
          className="block w-full h-full relative focus-visible:outline-none"
          aria-label={`${product.name}, ${formatUZS(price)}`}
        >
          <Image
            src={imagePath}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-contain object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            priority={product.is_featured}
          />
        </Link>

        {/* Discount Badge */}
        {discountPercent && (
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-black/80 text-white text-[11px] font-bold tracking-wide backdrop-blur-md">
              -{discountPercent}%
            </span>
          </div>
        )}

        {/* Wishlist Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/70 hover:bg-white text-black flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-xs z-10 focus-visible:outline-none hover:scale-105 active:scale-95"
          aria-label={isWishlisted ? `${product.name}ni sevimlilardan o‘chirish` : `${product.name}ni sevimliga qo‘shish`}
          aria-pressed={isWishlisted}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? "fill-red-600 text-red-600" : "text-black/80"
            }`}
          />
        </button>

        {/* Quick Add to Bag Floating Button */}
        <button
          type="button"
          onClick={handleQuickAdd}
          className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-xs z-10 hover:scale-105 active:scale-95"
          aria-label={`${product.name}ni savatchaga qo‘shish`}
          title="Savatchaga qo‘shish"
        >
          <ShoppingBag className="w-4 h-4 stroke-[2]" />
        </button>
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <Link
            href={`/product/${product.slug}`}
            className="text-sm sm:text-base font-semibold text-white hover:text-white/80 transition-colors line-clamp-1"
          >
            {product.name}
          </Link>
        </div>

        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="text-sm sm:text-base font-bold text-white">
            {formatUZS(price)}
          </span>
          {comparePrice && comparePrice > price && (
            <span className="text-xs text-white/40 line-through font-normal">
              {formatUZS(comparePrice)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
