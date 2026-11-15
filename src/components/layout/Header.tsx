"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, ShoppingBag, User, Menu, X, Heart, Phone, MapPin } from "lucide-react";
import { useCart } from "@/features/cart/CartContext";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  const navigation = [
    { name: "Katalog", href: "/shop" },
    { name: "Ko‘ylaklar", href: "/category/koylaklar" },
    { name: "Kostyumlar", href: "/category/kostyum-va-shimlar" },
    { name: "Ustki kiyimlar", href: "/category/ustki-kiyimlar" },
    { name: "Polo & Trikotaj", href: "/category/polo-va-trikotaj" },
  ];

  // Mobil menyu ochiqligida body scrollni bloklash
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sarto-border transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Mobile Menu Button - 44x44px touch target */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-sarto-black hover:text-sarto-taupe focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sarto-black cursor-pointer -ml-2"
              aria-label="Asosiy menyuni ochish"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="w-6 h-6 stroke-[1.75]" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7" aria-label="Asosiy menyu">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium tracking-wide text-sarto-black hover:text-sarto-taupe transition-colors py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sarto-black"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Center Brand Wordmark */}
          <div className="flex-1 lg:flex-initial text-center lg:text-center">
            <Link
              href="/"
              className="font-serif text-2xl sm:text-3xl tracking-[0.2em] uppercase text-sarto-black font-semibold hover:opacity-90 transition-opacity inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sarto-black"
              aria-label="SARTO Bosh sahifa"
            >
              SARTO
            </Link>
          </div>

          {/* Right Action Icons - All with min 44x44px touch targets */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Link
              href="/search"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-sarto-black hover:text-sarto-taupe transition-colors cursor-pointer rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sarto-black"
              aria-label="Mahsulotlarni qidirish"
            >
              <Search className="w-5 h-5 stroke-[1.75]" />
            </Link>

            <Link
              href="/wishlist"
              className="hidden sm:flex min-w-[44px] min-h-[44px] items-center justify-center text-sarto-black hover:text-sarto-taupe transition-colors cursor-pointer rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sarto-black"
              aria-label="Sevimli mahsulotlarim"
            >
              <Heart className="w-5 h-5 stroke-[1.75]" />
            </Link>

            <Link
              href="/account"
              className="hidden sm:flex min-w-[44px] min-h-[44px] items-center justify-center text-sarto-black hover:text-sarto-taupe transition-colors cursor-pointer rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sarto-black"
              aria-label="Shaxsiy kabinet va buyurtmalarim"
            >
              <User className="w-5 h-5 stroke-[1.75]" />
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-sarto-black hover:text-sarto-taupe transition-colors relative cursor-pointer rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sarto-black -mr-1"
              aria-label={`Xarid savatchasi, ${totalItems} ta tovar`}
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
              {totalItems > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-sarto-black text-white text-[10px] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center font-bold leading-none ring-2 ring-white">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Full-featured Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div className="relative w-full max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-250">
            {/* Header */}
            <div className="p-5 border-b border-sarto-border flex items-center justify-between">
              <span className="font-serif text-xl tracking-[0.2em] font-semibold text-sarto-black">
                SARTO
              </span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center text-sarto-black hover:text-sarto-taupe cursor-pointer"
                aria-label="Menyuni yopish"
              >
                <X className="w-6 h-6 stroke-[1.75]" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto px-6 py-6 divide-y divide-sarto-border/60">
              <div className="pb-4 space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-sarto-muted mb-2">
                  Kolleksiyalar
                </p>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-base font-medium text-sarto-black py-2.5 hover:text-sarto-taupe transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="py-4 space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-sarto-muted mb-2">
                  Mening hisobim
                </p>
                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 text-sm font-medium text-sarto-black py-2 hover:text-sarto-taupe"
                >
                  <User className="w-4 h-4 text-sarto-muted" /> Profil va buyurtmalarim
                </Link>
                <Link
                  href="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 text-sm font-medium text-sarto-black py-2 hover:text-sarto-taupe"
                >
                  <Heart className="w-4 h-4 text-sarto-muted" /> Sevimli liboslar
                </Link>
              </div>

              <div className="pt-4 space-y-2 text-xs text-sarto-muted">
                <div className="flex items-center gap-2 text-sarto-black font-medium">
                  <Phone className="w-4 h-4 text-sarto-taupe" /> +998 (71) 200-00-00
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-sarto-taupe" /> Toshkent shahri, Amir Temur 12
                </div>
              </div>
            </nav>

            {/* Bottom Footer Info */}
            <div className="p-5 border-t border-sarto-border bg-sarto-ivory/40">
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-3 bg-sarto-black text-white text-center text-sm font-semibold tracking-wide hover:bg-sarto-charcoal"
              >
                Barcha tovarlarni ko‘rish
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
