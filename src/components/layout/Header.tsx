"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingBag, User, Menu, X, Heart } from "lucide-react";
import { useCart } from "@/features/cart/CartContext";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  const navigation = [
    { name: "Katalog", href: "/shop" },
    { name: "Ko'ylaklar", href: "/category/koylaklar" },
    { name: "Kostyumlar", href: "/category/kostyum-va-shimlar" },
    { name: "Ustki kiyimlar", href: "/category/ustki-kiyimlar" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sarto-border transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-sarto-black hover:text-sarto-taupe cursor-pointer"
              aria-label="Menyu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xs uppercase tracking-widest text-sarto-black hover:text-sarto-taupe transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Center Logo */}
          <div className="flex-1 lg:flex-initial text-center">
            <Link
              href="/"
              className="font-serif text-2xl sm:text-3xl tracking-[0.25em] uppercase text-sarto-black font-semibold hover:opacity-90 transition-opacity"
            >
              SARTO
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4 sm:space-x-5">
            <Link
              href="/search"
              className="p-2 text-sarto-black hover:text-sarto-taupe transition-colors cursor-pointer"
              aria-label="Qidiruv"
            >
              <Search className="w-4 h-4" />
            </Link>

            <Link
              href="/wishlist"
              className="p-2 text-sarto-black hover:text-sarto-taupe transition-colors cursor-pointer"
              aria-label="Sevimlilar"
            >
              <Heart className="w-4 h-4" />
            </Link>

            <Link
              href="/account"
              className="p-2 text-sarto-black hover:text-sarto-taupe transition-colors cursor-pointer"
              aria-label="Profil"
            >
              <User className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-sarto-black hover:text-sarto-taupe transition-colors relative cursor-pointer"
              aria-label="Savatcha"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-sarto-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-sarto-border bg-white px-6 py-6 space-y-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm uppercase tracking-widest text-sarto-black font-medium py-2 border-b border-sarto-border/50"
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/account"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs uppercase tracking-wider text-sarto-muted py-1"
            >
              Shaxsiy kabinet
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs uppercase tracking-wider text-sarto-muted py-1"
            >
              Brend haqida
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
