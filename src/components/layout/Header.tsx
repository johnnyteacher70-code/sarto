"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useSyncExternalStore } from "react";
import { Search, ShoppingBag, Heart, Menu, X, ArrowRight } from "lucide-react";
import { useCart } from "@/features/cart/CartContext";

const emptySubscribe = () => () => {};

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const { totalItems, setIsCartOpen } = useCart();

  const navigation = [
    { name: "Bosh sahifa", href: "/" },
    { name: "Do‘kon", href: "/shop" },
    { name: "Kolleksiyalar", href: "/shop" },
    { name: "Biz haqimizda", href: "/about" },
    { name: "Aloqa", href: "/contact" },
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
    <header className="sticky top-0 z-40 bg-[#0B0B0B]/85 backdrop-blur-xl border-b border-white/[0.08] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo - Clean bold uppercase */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl sm:text-3xl font-extrabold tracking-[0.18em] uppercase text-white hover:opacity-90 transition-opacity"
              aria-label="SARTO Bosh sahifa"
            >
              SARTO
            </Link>
          </div>

          {/* Desktop Navigation - Centered with active pill indicator */}
          <nav className="hidden lg:flex items-center space-x-8" aria-label="Asosiy menyu">
            {navigation.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href) && item.href !== "/";

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative text-sm tracking-wide transition-colors py-1 ${
                    isActive
                      ? "text-white font-medium"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-white rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Kirish Pill Button */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link
              href="/search"
              className="min-w-[40px] min-h-[40px] flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
              aria-label="Mahsulotlarni qidirish"
            >
              <Search className="w-5 h-5 stroke-[1.75]" />
            </Link>

            <Link
              href="/wishlist"
              className="hidden sm:flex min-w-[40px] min-h-[40px] items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
              aria-label="Sevimli mahsulotlarim"
            >
              <Heart className="w-5 h-5 stroke-[1.75]" />
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="min-w-[40px] min-h-[40px] flex items-center justify-center text-white/80 hover:text-white transition-colors relative cursor-pointer"
              aria-label={`Xarid savatchasi, ${isMounted ? totalItems : 0} ta tovar`}
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
              {isMounted && totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-white text-black text-[10px] min-w-[17px] h-[17px] px-1 rounded-full flex items-center justify-center font-bold leading-none">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Kirish Pill Button */}
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center justify-center px-5 py-1.5 rounded-full border border-white/25 text-white/90 hover:text-black hover:bg-white text-xs sm:text-sm font-medium tracking-wide transition-all shadow-xs"
            >
              Kirish
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-white hover:text-white/80 cursor-pointer -mr-2"
              aria-label="Menyuni ochish"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="w-6 h-6 stroke-[1.75]" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          <div className="relative w-full max-w-xs bg-[#121212] border-r border-white/10 h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-250">
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <span className="text-xl tracking-[0.18em] font-extrabold text-white">
                SARTO
              </span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center text-white/70 hover:text-white cursor-pointer"
                aria-label="Menyuni yopish"
              >
                <X className="w-6 h-6 stroke-[1.75]" />
              </button>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 text-sm font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <span>{item.name}</span>
                  <ArrowRight className="w-4 h-4 text-white/40" />
                </Link>
              ))}
            </nav>

            <div className="p-5 border-t border-white/10 space-y-3">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors"
              >
                Kirish / Ro‘yxatdan o‘tish
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
