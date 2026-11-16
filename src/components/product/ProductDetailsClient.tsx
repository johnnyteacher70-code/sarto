"use client";

import { useState } from "react";
import Image from "next/image";
import { Product, ProductVariant } from "@/types";
import { formatUZS } from "@/lib/format";
import { useCart } from "@/features/cart/CartContext";
import { useWishlist } from "@/features/wishlist/WishlistContext";
import { Check, Shield, Truck, RefreshCw, Ruler, X, AlertCircle, ShoppingBag, Heart } from "lucide-react";

interface ProductDetailsClientProps {
  product: Product;
}

export function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);
  const variants = product.variants || [];
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    variants[0] || null
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const price = selectedVariant?.price_uzs || 0;
  const comparePrice = selectedVariant?.compare_at_price_uzs;
  const inStock = selectedVariant ? selectedVariant.stock_quantity > 0 : false;

  const imagePath =
    product.images?.[0]?.storage_path || "/images/products/oxford-shirt.jpg";

  const handleAddToCart = () => {
    if (!selectedVariant || !inStock) return;

    addItem({
      id: `${selectedVariant.id}-${Date.now()}`,
      variant_id: selectedVariant.id,
      product: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        primary_image: imagePath,
      },
      variant: {
        id: selectedVariant.id,
        sku: selectedVariant.sku,
        size: selectedVariant.size,
        color_name: selectedVariant.color_name,
        price_uzs: selectedVariant.price_uzs,
        stock_quantity: selectedVariant.stock_quantity,
      },
      quantity,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2200);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
      {/* Product Image Stage (7 cols on desktop) */}
      <div className="lg:col-span-7 space-y-4">
        <div className="relative aspect-[4/5] w-full bg-[#ECE9E2] rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center p-6 sm:p-10">
          <Image
            src={imagePath}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-contain object-center"
          />
        </div>
      </div>

      {/* Product Purchase Actions & Info (5 cols on desktop) */}
      <div className="lg:col-span-5 space-y-6 sm:space-y-8">
        <div>
          <span className="text-xs font-mono text-white/40 uppercase tracking-wider block mb-1">
            SKU: {selectedVariant?.sku || product.sku || "SRT-001"}
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {product.name}
          </h1>

          <div className="mt-3.5 flex items-baseline gap-3">
            <span className="text-2xl sm:text-3xl font-bold text-white">
              {formatUZS(price)}
            </span>
            {comparePrice && comparePrice > price && (
              <span className="text-base text-white/40 line-through font-normal">
                {formatUZS(comparePrice)}
              </span>
            )}
          </div>
        </div>

        {/* Size Selector with Size Guide button */}
        {variants.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-white/10">
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-white">
                O‘lchamni tanlang:
              </span>
              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-xs font-medium text-white/70 hover:text-white flex items-center gap-1.5 underline underline-offset-4 cursor-pointer focus-visible:outline-none"
              >
                <Ruler className="w-3.5 h-3.5" /> O‘lchamlar jadvali
              </button>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {variants.map((v) => {
                const isSelected = selectedVariant?.id === v.id;
                const available = v.stock_quantity > 0;

                return (
                  <button
                    key={v.id}
                    type="button"
                    disabled={!available}
                    onClick={() => {
                      setSelectedVariant(v);
                      setQuantity(1);
                    }}
                    aria-pressed={isSelected}
                    className={`min-w-[56px] min-h-[44px] px-4 rounded-full border text-xs sm:text-sm font-semibold tracking-wide transition-all cursor-pointer flex items-center justify-center select-none ${
                      isSelected
                        ? "bg-white text-black border-white shadow-md ring-2 ring-white ring-offset-2 ring-offset-black"
                        : available
                        ? "border-white/15 bg-[#141414] text-white hover:border-white/40 hover:bg-white/5"
                        : "border-white/10 text-white/30 bg-white/5 cursor-not-allowed line-through"
                    }`}
                  >
                    {v.size || "Standard"}
                  </button>
                );
              })}
            </div>

            <p className="text-xs text-white/60 flex items-center gap-1.5 pt-1">
              {inStock ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  Omborda mavjud: <strong className="text-white">{selectedVariant?.stock_quantity} dona</strong>
                </>
              ) : (
                <>
                  <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                  <span className="text-red-400 font-medium">Tanlangan o‘lcham omborda tugagan</span>
                </>
              )}
            </p>
          </div>
        )}

        {/* Quantity and Primary Add-to-Cart Action */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Quantity Selector */}
            <div className="flex items-center justify-between border border-white/20 rounded-full px-2 py-1 bg-[#141414] min-w-[120px] min-h-[48px]">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1 || !inStock}
                className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white disabled:opacity-30 cursor-pointer text-base"
                aria-label="Miqdorni kamaytirish"
              >
                -
              </button>
              <span className="font-semibold text-white text-sm px-2">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => {
                  const max = selectedVariant?.stock_quantity || 1;
                  setQuantity(Math.min(max, quantity + 1));
                }}
                disabled={!inStock || quantity >= (selectedVariant?.stock_quantity || 1)}
                className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white disabled:opacity-30 cursor-pointer text-base"
                aria-label="Miqdorni ko‘paytirish"
              >
                +
              </button>
            </div>

            {/* Primary CTA Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!inStock}
              className={`flex-1 min-h-[48px] px-8 rounded-full text-sm font-semibold tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                isAdded
                  ? "bg-emerald-600 text-white"
                  : inStock
                  ? "bg-white text-black hover:bg-[#EAE6DF] hover:scale-[1.01] active:scale-[0.99]"
                  : "bg-white/10 text-white/40 cursor-not-allowed"
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" /> Savatchaga qo‘shildi
                </>
              ) : inStock ? (
                <>
                  <ShoppingBag className="w-4 h-4" /> Savatga qo‘shish
                </>
              ) : (
                "Sotuvda mavjud emas"
              )}
            </button>

            {/* Wishlist Button */}
            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              className={`min-w-[48px] min-h-[48px] rounded-full border border-white/20 flex items-center justify-center transition-all cursor-pointer ${
                isWishlisted
                  ? "bg-red-500/15 border-red-500/50 text-red-500"
                  : "bg-[#141414] hover:bg-white/10 text-white/80 hover:text-white"
              }`}
              aria-label={isWishlisted ? "Sevimlilardan o‘chirish" : "Sevimlilarga qo‘shish"}
              title={isWishlisted ? "Sevimlilardan o‘chirish" : "Sevimlilarga qo‘shish"}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500" : ""}`} />
            </button>
          </div>
        </div>

        {/* Brand Highlights / Guarantees */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10 text-xs text-white/70">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#141414] border border-white/[0.08]">
            <Truck className="w-4 h-4 text-white shrink-0" />
            <span>1-3 kunda yetkazish</span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#141414] border border-white/[0.08]">
            <RefreshCw className="w-4 h-4 text-white shrink-0" />
            <span>14 kunlik qaytarish</span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#141414] border border-white/[0.08]">
            <Shield className="w-4 h-4 text-white shrink-0" />
            <span>100% asillik kafolati</span>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="space-y-4 pt-6 border-t border-white/10 text-sm">
          <div>
            <h2 className="text-sm font-semibold text-white mb-2">Tavsif</h2>
            <p className="text-white/70 leading-relaxed text-xs sm:text-sm">
              {product.description}
            </p>
          </div>

          {product.material && (
            <div className="pt-2">
              <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">
                Mato va tarkibi
              </h3>
              <p className="text-xs sm:text-sm text-white/90">{product.material}</p>
            </div>
          )}

          {product.care_instructions && (
            <div className="pt-2">
              <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">
                Parvarishlash ko‘rsatmalari
              </h3>
              <p className="text-xs sm:text-sm text-white/90">{product.care_instructions}</p>
            </div>
          )}
        </div>
      </div>

      {/* Size Guide Modal Dialog */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#141414] border border-white/15 rounded-3xl w-full max-w-lg p-6 sm:p-8 space-y-6 text-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Ruler className="w-5 h-5 text-white" />
                <h3 className="text-lg font-bold">O‘lchamlar jadvali</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(false)}
                className="w-8 h-8 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white flex items-center justify-center cursor-pointer"
                aria-label="Jadvalni yopish"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/15 text-white/60">
                    <th className="py-2.5 pr-4">O‘lcham</th>
                    <th className="py-2.5 px-3">Ko‘krak (sm)</th>
                    <th className="py-2.5 px-3">Bel (sm)</th>
                    <th className="py-2.5 pl-3">Bo‘y (sm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-white/90">
                  <tr>
                    <td className="py-2.5 pr-4 font-bold text-white">S (46)</td>
                    <td className="py-2.5 px-3">92 - 96</td>
                    <td className="py-2.5 px-3">78 - 82</td>
                    <td className="py-2.5 pl-3">170 - 175</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-bold text-white">M (48)</td>
                    <td className="py-2.5 px-3">96 - 100</td>
                    <td className="py-2.5 px-3">82 - 86</td>
                    <td className="py-2.5 pl-3">175 - 180</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-bold text-white">L (50)</td>
                    <td className="py-2.5 px-3">100 - 104</td>
                    <td className="py-2.5 px-3">86 - 90</td>
                    <td className="py-2.5 pl-3">178 - 184</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-bold text-white">XL (52)</td>
                    <td className="py-2.5 px-3">104 - 108</td>
                    <td className="py-2.5 px-3">90 - 95</td>
                    <td className="py-2.5 pl-3">180 - 188</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-white/50 leading-relaxed border-t border-white/10 pt-4">
              Agar o‘lchamingiz ikkita ko‘rsatkich oralig‘ida bo‘lsa, erkin kiyinish uchun kattaroq o‘lchamni tanlashni tavsiya qilamiz.
            </p>

            <button
              type="button"
              onClick={() => setIsSizeGuideOpen(false)}
              className="w-full py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 cursor-pointer"
            >
              Tushundim
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
