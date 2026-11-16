"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useSyncExternalStore } from "react";
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  ArrowRight,
  User,
  LogOut,
  ChevronRight,
  Layers,
} from "lucide-react";
import { useCart } from "@/features/cart/CartContext";
import { useAuth } from "@/features/auth/AuthContext";
import { useWishlist } from "@/features/wishlist/WishlistContext";

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
  const { totalWishlist } = useWishlist();
  const { user, logout } = useAuth();

  const navigation = [
    { name: "Bosh sahifa", href: "/" },
    { name: "Do‘kon", href: "/shop" },
    { name: "Kolleksiyalar", href: "/shop" },
    { name: "Biz haqimizda", href: "/about" },
    { name: "Aloqa", href: "/contact" },
  ];

  const categories = [
    { name: "Palto & Trench", slug: "ustki-kiyimlar" },
    { name: "Futbolkalar & Pololar", slug: "polo-va-trikotaj" },
    { name: "Shimlar", slug: "shimlar" },
    { name: "Sport uslubi", slug: "sport-uslubi" },
    { name: "Ko‘ylaklar", slug: "koylaklar" },
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
    <header className="sticky top-0 z-40 bg-[#0B0B0B]/90 backdrop-blur-xl border-b border-white/[0.08] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl sm:text-3xl font-extrabold tracking-[0.18em] uppercase text-white hover:opacity-90 transition-opacity"
              aria-label="SARTO Bosh sahifa"
            >
              SARTO
            </Link>
          </div>

          {/* Desktop Navigation */}
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

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search Icon */}
            <Link
              href="/search"
              className="w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              aria-label="Mahsulotlarni qidirish"
            >
              <Search className="w-5 h-5 stroke-[1.75]" />
            </Link>

            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              className="w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/5 transition-all relative cursor-pointer"
              aria-label={`Sevimli mahsulotlarim, ${isMounted ? totalWishlist : 0} ta tovar`}
            >
              <Heart className="w-5 h-5 stroke-[1.75]" />
              {isMounted && totalWishlist > 0 && (
                <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] min-w-[17px] h-[17px] px-1 rounded-full flex items-center justify-center font-bold leading-none">
                  {totalWishlist}
                </span>
              )}
            </Link>

            {/* Shopping Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/5 transition-all relative cursor-pointer"
              aria-label={`Xarid savatchasi, ${isMounted ? totalItems : 0} ta tovar`}
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
              {isMounted && totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-white text-black text-[10px] min-w-[17px] h-[17px] px-1 rounded-full flex items-center justify-center font-bold leading-none">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Desktop Kirish Pill Button / User Avatar */}
            {isMounted && user ? (
              <Link
                href="/account"
                className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-medium tracking-wide transition-all shadow-xs ml-1"
                aria-label={`Mening hisobim: ${user.name}`}
              >
                <span className="w-5 h-5 rounded-full bg-white text-black text-[10px] font-bold flex items-center justify-center">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <span className="max-w-[100px] truncate">{user.name.split(" ")[0]}</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="hidden sm:inline-flex items-center justify-center px-5 py-1.5 rounded-full border border-white/25 text-white/90 hover:text-black hover:bg-white text-xs sm:text-sm font-medium tracking-wide transition-all shadow-xs ml-1"
              >
                Kirish
              </Link>
            )}

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full bg-white/[0.06] hover:bg-white/[0.12] active:scale-95 border border-white/15 flex items-center justify-center text-white transition-all cursor-pointer ml-1"
              aria-label={mobileMenuOpen ? "Menyuni yopish" : "Menyuni ochish"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 stroke-[2]" />
              ) : (
                <Menu className="w-5 h-5 stroke-[1.75]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu (Slide-over with Backdrop Blur) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer container */}
          <div className="relative w-[86vw] max-w-[340px] bg-[#0E0E0E] border-l border-white/10 h-dvh shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xl tracking-[0.18em] font-extrabold text-white">
                  SARTO
                </span>
                <span className="block text-[10px] text-white/40 tracking-widest uppercase">
                  Luxury Men Collection
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Menyuni yopish"
              >
                <X className="w-5 h-5 stroke-[1.75]" />
              </button>
            </div>

            {/* Drawer Body (Scrollable) */}
            <div className="flex-1 px-4 py-5 space-y-6 overflow-y-auto">
              {/* Quick Search Bar */}
              <Link
                href="/search"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all text-xs"
              >
                <Search className="w-4 h-4 text-white/50" />
                <span>Mahsulotlarni qidirish...</span>
              </Link>

              {/* Main Navigation Links */}
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider px-3">
                  Asosiy sahifalar
                </span>
                <nav className="space-y-1 pt-1" aria-label="Mobil navigatsiya">
                  {navigation.map((item) => {
                    const isActive =
                      item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href) && item.href !== "/";

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3.5 py-2.5 text-sm font-medium rounded-xl transition-all ${
                          isActive
                            ? "bg-white text-black font-semibold shadow-xs"
                            : "text-white/80 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <span>{item.name}</span>
                        {isActive ? (
                          <span className="w-2 h-2 rounded-full bg-black" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-white/30" />
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Quick Categories */}
              <div className="space-y-1 pt-2 border-t border-white/10">
                <div className="flex items-center gap-1.5 px-3 py-1">
                  <Layers className="w-3.5 h-3.5 text-white/40" />
                  <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">
                    Kategoriyalar
                  </span>
                </div>
                <div className="space-y-0.5 pt-1">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3.5 py-2 text-xs font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <span>{cat.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-white/30" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Personal Quick Shortcuts */}
              <div className="space-y-1 pt-2 border-t border-white/10">
                <Link
                  href="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2.5 text-xs sm:text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-500 fill-red-500/20" />
                    <span>Sevimlilar ro‘yxati</span>
                  </span>
                  {isMounted && totalWishlist > 0 ? (
                    <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                      {totalWishlist}
                    </span>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-white/30" />
                  )}
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs sm:text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-colors text-left cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-white" />
                    <span>Xarid savatchasi</span>
                  </span>
                  {isMounted && totalItems > 0 ? (
                    <span className="bg-white text-black text-[10px] px-2 py-0.5 rounded-full font-bold">
                      {totalItems}
                    </span>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-white/30" />
                  )}
                </button>
              </div>
            </div>

            {/* Drawer Footer (Auth & User Profile) */}
            <div className="p-4 border-t border-white/10 bg-[#0A0A0A]/80 backdrop-blur-sm space-y-3">
              {isMounted && user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 px-1">
                    <span className="w-9 h-9 rounded-full bg-gradient-to-tr from-neutral-800 to-neutral-600 border border-white/20 text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                    <div className="overflow-hidden flex-1">
                      <p className="text-xs sm:text-sm font-bold text-white truncate">
                        {user.name}
                      </p>
                      <p className="text-[11px] text-white/50 truncate">
                        {user.emailOrPhone}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/account"
                      onClick={() => setMobileMenuOpen(false)}
                      className="inline-flex items-center justify-center py-2 px-3 rounded-full bg-white text-black text-xs font-semibold hover:bg-white/90 transition-colors"
                    >
                      <User className="w-3.5 h-3.5 mr-1" />
                      Hisobim
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="inline-flex items-center justify-center py-2 px-3 rounded-full border border-white/15 text-white/70 hover:text-red-400 hover:border-red-500/40 text-xs font-medium transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5 mr-1" />
                      Chiqish
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full inline-flex items-center justify-center py-2.5 rounded-full bg-white text-black text-xs sm:text-sm font-semibold hover:bg-white/90 transition-colors shadow-sm"
                  >
                    Tizimga kirish
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full inline-flex items-center justify-center py-2 rounded-full border border-white/15 text-white/80 hover:text-white text-xs font-medium transition-colors"
                  >
                    Ro‘yxatdan o‘tish
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
