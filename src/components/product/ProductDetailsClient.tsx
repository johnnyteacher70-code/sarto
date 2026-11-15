"use client";

import { useState } from "react";
import Image from "next/image";
import { Product, ProductVariant } from "@/types";
import { formatUZS } from "@/lib/format";
import { useCart } from "@/features/cart/CartContext";
import { Button } from "@/components/ui/Button";
import { Check, Shield, Truck, RefreshCw, Ruler, X, AlertCircle } from "lucide-react";

interface ProductDetailsClientProps {
  product: Product;
}

export function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const { addItem } = useCart();
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
      {/* Product Image Gallery (7 cols on desktop) */}
      <div className="lg:col-span-7 space-y-4">
        <div className="relative aspect-[3/4] w-full bg-sarto-ivory border border-sarto-border overflow-hidden shadow-xs">
          <Image
            src={imagePath}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* Product Purchase Actions & Info (5 cols on desktop) */}
      <div className="lg:col-span-5 space-y-6 sm:space-y-8">
        <div>
          <span className="text-xs font-mono text-sarto-muted uppercase tracking-wider block mb-1">
            SKU: {selectedVariant?.sku || product.sku || "SRT-001"}
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl text-sarto-black leading-tight">
            {product.name}
          </h1>

          <div className="mt-3.5 flex items-baseline gap-3">
            <span className="text-2xl sm:text-3xl font-bold text-sarto-black">
              {formatUZS(price)}
            </span>
            {comparePrice && comparePrice > price && (
              <span className="text-base text-sarto-muted line-through font-normal">
                {formatUZS(comparePrice)}
              </span>
            )}
          </div>
        </div>

        {/* Size Selector with Size Guide button */}
        {variants.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-sarto-border">
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-sarto-black">
                O‘lchamni tanlang:
              </span>
              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-xs font-medium text-sarto-black hover:text-sarto-taupe flex items-center gap-1.5 underline underline-offset-4 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sarto-black"
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
                    className={`min-w-[56px] min-h-[46px] px-3.5 border text-sm font-semibold tracking-wide transition-all cursor-pointer flex items-center justify-center select-none ${
                      isSelected
                        ? "bg-sarto-black text-white border-sarto-black shadow-xs ring-2 ring-sarto-black ring-offset-2"
                        : available
                        ? "border-sarto-border text-sarto-black hover:border-sarto-black bg-white"
                        : "border-sarto-border/40 text-sarto-muted/50 bg-sarto-ivory/30 cursor-not-allowed line-through"
                    }`}
                  >
                    {v.size || "Standard"}
                  </button>
                );
              })}
            </div>

            <p className="text-xs text-sarto-muted flex items-center gap-1.5 pt-1">
              {inStock ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
                  Omborda mavjud: <strong className="text-sarto-black">{selectedVariant?.stock_quantity} dona</strong>
                </>
              ) : (
                <>
                  <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                  <span className="text-red-700 font-medium">Tanlangan o‘lcham omborda tugagan</span>
                </>
              )}
            </p>
          </div>
        )}

        {/* Quantity and Primary Add-to-Cart Action */}
        <div className="space-y-4 pt-4 border-t border-sarto-border">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Quantity Selector - 44x44px touch targets */}
            <div className="flex items-center border border-sarto-border bg-white min-h-[50px] w-full sm:w-auto justify-between sm:justify-start">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="min-w-[44px] min-h-[48px] flex items-center justify-center hover:bg-sarto-ivory text-base font-bold transition-colors cursor-pointer select-none"
                aria-label="Miqdorni 1 taga kamaytirish"
              >
                −
              </button>
              <span className="px-5 text-sm font-semibold select-none text-center min-w-[36px]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => {
                  const max = selectedVariant?.stock_quantity || 1;
                  setQuantity(Math.min(max, quantity + 1));
                }}
                className="min-w-[44px] min-h-[48px] flex items-center justify-center hover:bg-sarto-ivory text-base font-bold transition-colors cursor-pointer select-none"
                aria-label="Miqdorni 1 taga oshirish"
              >
                +
              </button>
            </div>

            <Button
              size="lg"
              className="flex-1 min-h-[50px]"
              disabled={!inStock}
              onClick={handleAddToCart}
            >
              {isAdded ? (
                <span className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-400" /> Savatchaga qo‘shildi
                </span>
              ) : inStock ? (
                "Savatchaga qo‘shish"
              ) : (
                "Sotuvda mavjud emas"
              )}
            </Button>
          </div>
        </div>

        {/* Description & Details Sections */}
        <div className="space-y-5 pt-6 border-t border-sarto-border text-sm">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-sarto-black mb-2">
              Mahsulot tavsifi
            </h2>
            <p className="text-sm text-sarto-black/80 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>

          {product.material && (
            <div className="p-4 bg-sarto-ivory/50 border border-sarto-border space-y-1">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-sarto-black">
                Mato va tarkibi
              </h3>
              <p className="text-sm text-sarto-black/80">{product.material}</p>
            </div>
          )}

          {product.care_instructions && (
            <div className="space-y-1">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-sarto-black">
                Parvarishlash
              </h3>
              <p className="text-xs text-sarto-muted leading-relaxed">{product.care_instructions}</p>
            </div>
          )}
        </div>

        {/* Reassuring Trust Badges */}
        <div className="grid grid-cols-3 gap-3 pt-6 border-t border-sarto-border text-center">
          <div className="p-3 bg-white border border-sarto-border space-y-1">
            <Truck className="w-5 h-5 mx-auto text-sarto-black stroke-[1.5]" />
            <p className="text-xs font-semibold text-sarto-black">Tez yetkazish</p>
            <p className="text-[11px] text-sarto-muted">1—3 ish kuni</p>
          </div>
          <div className="p-3 bg-white border border-sarto-border space-y-1">
            <RefreshCw className="w-5 h-5 mx-auto text-sarto-black stroke-[1.5]" />
            <p className="text-xs font-semibold text-sarto-black">Almashtirish</p>
            <p className="text-[11px] text-sarto-muted">14 kun ichida</p>
          </div>
          <div className="p-3 bg-white border border-sarto-border space-y-1">
            <Shield className="w-5 h-5 mx-auto text-sarto-black stroke-[1.5]" />
            <p className="text-xs font-semibold text-sarto-black">Kafolatlangan</p>
            <p className="text-[11px] text-sarto-muted">100% Asl mahsulot</p>
          </div>
        </div>
      </div>

      {/* Accessible Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsSizeGuideOpen(false)}
            aria-hidden="true"
          />
          <div className="relative bg-white max-w-lg w-full p-6 sm:p-8 shadow-2xl z-10 space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-sarto-border pb-4">
              <div className="flex items-center gap-2">
                <Ruler className="w-5 h-5 text-sarto-black" />
                <h3 className="font-serif text-xl text-sarto-black">Erkaklar o‘lchamlar jadvali</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(false)}
                className="min-w-[40px] min-h-[40px] flex items-center justify-center text-sarto-muted hover:text-sarto-black cursor-pointer"
                aria-label="Jadvalni yopish"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-sarto-muted">
              Barcha o‘lchamlar santimetrda (sm) ko‘rsatilgan. Agar ikki o‘lcham orasida ikkilansangiz, qulaylik uchun kattaroq o‘lchamni tanlash tavsiya etiladi.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-sarto-ivory border-b border-sarto-border font-semibold text-sarto-black">
                  <tr>
                    <th className="p-2.5">O‘lcham</th>
                    <th className="p-2.5">Bo‘y (sm)</th>
                    <th className="p-2.5">Ko‘krak (sm)</th>
                    <th className="p-2.5">Bel (sm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sarto-border">
                  <tr>
                    <td className="p-2.5 font-bold">S (46)</td>
                    <td className="p-2.5">170—175</td>
                    <td className="p-2.5">92—96</td>
                    <td className="p-2.5">80—84</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">M (48)</td>
                    <td className="p-2.5">175—180</td>
                    <td className="p-2.5">96—100</td>
                    <td className="p-2.5">84—88</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">L (50)</td>
                    <td className="p-2.5">180—185</td>
                    <td className="p-2.5">100—104</td>
                    <td className="p-2.5">88—92</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">XL (52)</td>
                    <td className="p-2.5">182—188</td>
                    <td className="p-2.5">104—108</td>
                    <td className="p-2.5">92—96</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Button
              className="w-full"
              variant="primary"
              onClick={() => setIsSizeGuideOpen(false)}
            >
              Tushunarli, yopish
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
