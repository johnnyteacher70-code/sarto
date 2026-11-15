"use client";

import { useState } from "react";
import Image from "next/image";
import { Product, ProductVariant } from "@/types";
import { formatUZS } from "@/lib/format";
import { useCart } from "@/features/cart/CartContext";
import { Button } from "@/components/ui/Button";
import { Check, Shield, Truck, RefreshCw } from "lucide-react";

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
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
      {/* Product Image Gallery */}
      <div className="space-y-4">
        <div className="relative aspect-[3/4] w-full bg-sarto-ivory border border-sarto-border overflow-hidden">
          <Image
            src={imagePath}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* Product Purchase Actions & Info */}
      <div className="space-y-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-sarto-muted font-semibold">
            SKU: {selectedVariant?.sku || product.sku || "SRT-001"}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-sarto-black mt-2">
            {product.name}
          </h1>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl font-bold text-sarto-black">{formatUZS(price)}</span>
            {comparePrice && comparePrice > price && (
              <span className="text-sm text-sarto-muted line-through">
                {formatUZS(comparePrice)}
              </span>
            )}
          </div>
        </div>

        {/* Size Selector */}
        {variants.length > 0 && (
          <div className="space-y-3 pt-2 border-t border-sarto-border">
            <div className="flex justify-between items-center text-xs">
              <span className="uppercase tracking-wider font-semibold text-sarto-black">
                O‘lchamni tanlang:
              </span>
              <span className="text-sarto-muted">
                {selectedVariant?.size ? `Tanlandi: ${selectedVariant.size}` : "Tanlang"}
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {variants.map((v) => {
                const isSelected = selectedVariant?.id === v.id;
                const available = v.stock_quantity > 0;

                return (
                  <button
                    key={v.id}
                    disabled={!available}
                    onClick={() => {
                      setSelectedVariant(v);
                      setQuantity(1);
                    }}
                    className={`h-11 min-w-[50px] px-3.5 border text-xs font-semibold tracking-wider transition-all cursor-pointer flex items-center justify-center ${
                      isSelected
                        ? "bg-sarto-black text-white border-sarto-black"
                        : available
                        ? "border-sarto-border text-sarto-black hover:border-sarto-black bg-white"
                        : "border-sarto-border/40 text-sarto-muted/50 cursor-not-allowed line-through"
                    }`}
                  >
                    {v.size || "Standard"}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Quantity & CTA */}
        <div className="space-y-4 pt-4 border-t border-sarto-border">
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-sarto-border h-12">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 hover:bg-sarto-ivory text-sm transition-colors cursor-pointer"
              >
                -
              </button>
              <span className="px-4 text-xs font-semibold">{quantity}</span>
              <button
                onClick={() => {
                  const max = selectedVariant?.stock_quantity || 1;
                  setQuantity(Math.min(max, quantity + 1));
                }}
                className="px-4 py-2 hover:bg-sarto-ivory text-sm transition-colors cursor-pointer"
              >
                +
              </button>
            </div>

            <Button
              size="lg"
              className="flex-1 h-12"
              disabled={!inStock}
              onClick={handleAddToCart}
            >
              {isAdded ? (
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4" /> Savatchaga qo‘shildi
                </span>
              ) : inStock ? (
                "Savatchaga qo‘shish"
              ) : (
                "Sotuvda mavjud emas"
              )}
            </Button>
          </div>

          <p className="text-[11px] text-sarto-muted">
            {inStock
              ? `Omborda mavjud: ${selectedVariant?.stock_quantity} dona`
              : "Ushbu o‘lchamdagi tovar hozirda omborda tugagan."}
          </p>
        </div>

        {/* Description & Details */}
        <div className="space-y-6 pt-6 border-t border-sarto-border">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-sarto-black mb-2">
              Tavsif
            </h3>
            <p className="text-xs text-sarto-muted leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>

          {product.material && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-sarto-black mb-1">
                Tarkibi va mato
              </h3>
              <p className="text-xs text-sarto-muted">{product.material}</p>
            </div>
          )}

          {product.care_instructions && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-sarto-black mb-1">
                Parvarish ko‘rsatmasi
              </h3>
              <p className="text-xs text-sarto-muted">{product.care_instructions}</p>
            </div>
          )}
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-sarto-border text-center">
          <div className="space-y-1">
            <Truck className="w-4 h-4 mx-auto text-sarto-black stroke-1" />
            <p className="text-[10px] uppercase font-semibold text-sarto-black">Tez yetkazish</p>
            <p className="text-[9px] text-sarto-muted">1-3 ish kuni</p>
          </div>
          <div className="space-y-1">
            <RefreshCw className="w-4 h-4 mx-auto text-sarto-black stroke-1" />
            <p className="text-[10px] uppercase font-semibold text-sarto-black">Almashtirish</p>
            <p className="text-[9px] text-sarto-muted">14 kun ichida</p>
          </div>
          <div className="space-y-1">
            <Shield className="w-4 h-4 mx-auto text-sarto-black stroke-1" />
            <p className="text-[10px] uppercase font-semibold text-sarto-black">100% Asl mahsulot</p>
            <p className="text-[9px] text-sarto-muted">Kafolatlangan</p>
          </div>
        </div>
      </div>
    </div>
  );
}
