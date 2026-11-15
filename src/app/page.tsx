import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { getFeaturedProducts } from "@/server/repositories/productRepository";
import { getActiveCategories } from "@/server/repositories/categoryRepository";
import { ArrowRight, ArrowLeft, Mouse } from "lucide-react";

export default async function HomePage() {
  const [featuredProducts, categories] = await Promise.all([
    getFeaturedProducts(4),
    getActiveCategories(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white selection:bg-white selection:text-black">
      <Header />

      <main className="flex-1 space-y-16 sm:space-y-24 pb-20">
        {/* ========================================================= */}
        {/* 1. HERO SECTION                                           */}
        {/* ========================================================= */}
        <section className="relative w-full min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-between overflow-hidden border-b border-white/[0.08]">
          {/* Background High-Fashion Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero/hero-banner.jpg"
              alt="SARTO New Season — Erkaklar premium liboslari"
              fill
              priority
              className="object-cover object-top sm:object-center brightness-[0.85]"
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent sm:via-[#0A0A0A]/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/30" />
          </div>

          {/* Top spacer & Hero Main Content */}
          <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-8 flex-1 flex flex-col justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Title, Subtitle, CTA */}
              <div className="lg:col-span-8 space-y-6">
                {/* Badge: Yangi kolleksiya */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-xs font-medium text-white/90 tracking-wide">
                    Yangi kolleksiya
                  </span>
                </div>

                {/* Main Hero Headline */}
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[1.02]">
                  SARTO<br />
                  <span className="text-[#DDD6CC] font-bold">New Season</span>
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base text-white/70 max-w-sm sm:max-w-md font-normal leading-relaxed">
                  Zamonaviy erkaklar uchun premium kiyimlar kolleksiyasi.
                </p>

                {/* Action CTA Button */}
                <div className="pt-2">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-3 pl-6 pr-2.5 py-2.5 bg-white text-black font-semibold text-sm rounded-full hover:bg-[#EAE6DF] transition-all group shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Kolleksiyani ko‘rish</span>
                    <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Floating New Arrivals Badge Card */}
              <div className="lg:col-span-4 hidden lg:flex justify-end">
                <div className="p-4 rounded-2xl bg-black/50 border border-white/15 backdrop-blur-md flex items-center gap-4 shadow-2xl">
                  {/* Avatar stack */}
                  <div className="flex -space-x-2 overflow-hidden">
                    <div className="w-10 h-10 rounded-full border-2 border-black relative overflow-hidden bg-white/10">
                      <Image
                        src="/images/products/jacket.jpg"
                        alt="Yangi mahsulot"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="w-10 h-10 rounded-full border-2 border-black relative overflow-hidden bg-white/10">
                      <Image
                        src="/images/products/pants.jpg"
                        alt="Yangi mahsulot"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="w-10 h-10 rounded-full border-2 border-black bg-white/20 text-white text-[11px] font-bold flex items-center justify-center">
                      +12
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-white/90">
                    Yangi mahsulotlar
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Bottom Bar: Scroll down & Slider counter */}
          <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between border-t border-white/[0.08]">
            {/* Scroll down indicator */}
            <div className="flex items-center gap-2 text-xs text-white/50 tracking-wide font-medium">
              <Mouse className="w-4 h-4 animate-bounce" />
              <span>Scroll down</span>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs font-semibold text-white">
                01 <span className="text-white/40">/ 03</span>
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label="Oldingi slayd"
                  className="w-8 h-8 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/50 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  aria-label="Keyingi slayd"
                  className="w-8 h-8 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/50 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. CATEGORIES SECTION ("O'z uslubingizni toping")          */}
        {/* ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-white/50 font-medium block">
                — Kategoriyalar
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1.5 tracking-tight">
                O‘z uslubingizni toping
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs sm:text-sm font-medium text-white/70 hover:text-white inline-flex items-center gap-1.5 transition-colors self-start sm:self-auto group"
            >
              <span>Barchasini ko‘rish</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 5 Categories Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/[0.08] hover:border-white/30 transition-all duration-300 shadow-lg block"
              >
                {/* Category Image */}
                <Image
                  src={cat.image_url || "/images/products/oxford-shirt.jpg"}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                {/* Bottom Card Elements: Name + Circular Arrow Button */}
                <div className="absolute bottom-3 sm:bottom-4 inset-x-3 sm:inset-x-4 flex items-end justify-between gap-2 z-10">
                  <span className="text-xs sm:text-sm font-bold text-white leading-tight">
                    {cat.name}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-white/20 group-hover:bg-white text-white group-hover:text-black flex items-center justify-center transition-all backdrop-blur-md shrink-0">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. PROMO BANNER SECTION ("50% gacha chegirma")            */}
        {/* ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.12] p-6 sm:p-12 lg:p-14 shadow-2xl min-h-[300px] flex items-center">
            {/* Background Texture Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/hero/promo-banner.jpg"
                alt="SARTO Maxsus taklif"
                fill
                className="object-cover object-center brightness-[0.65]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/40" />
            </div>

            {/* Banner Content Grid */}
            <div className="relative z-10 w-full flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              {/* Left Promo Message */}
              <div className="space-y-4 max-w-lg">
                <span className="text-xs uppercase tracking-wider text-white/60 font-medium block">
                  — Maxsus taklif
                </span>
                <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  50% gacha chegirma
                </h3>
                <p className="text-xs sm:text-sm text-white/70">
                  Yangi kolleksiyaga maxsus chegirma!
                </p>

                <div className="pt-2">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-3 pl-6 pr-2.5 py-2.5 bg-white text-black font-semibold text-xs sm:text-sm rounded-full hover:bg-[#EAE6DF] transition-all group shadow-lg"
                  >
                    <span>Endi xarid qilish</span>
                    <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </div>
              </div>

              {/* Right Countdown Timer */}
              <div className="space-y-3 self-start lg:self-center">
                <span className="text-xs text-white/70 font-medium block">
                  Taklif tugashiga:
                </span>
                <div className="flex items-center gap-3">
                  {/* Days */}
                  <div className="min-w-[62px] sm:min-w-[70px] p-3 sm:p-4 rounded-xl bg-black/60 border border-white/15 backdrop-blur-md text-center">
                    <span className="block text-xl sm:text-2xl font-black text-white">02</span>
                    <span className="text-[10px] sm:text-xs text-white/60 font-medium">kun</span>
                  </div>
                  {/* Hours */}
                  <div className="min-w-[62px] sm:min-w-[70px] p-3 sm:p-4 rounded-xl bg-black/60 border border-white/15 backdrop-blur-md text-center">
                    <span className="block text-xl sm:text-2xl font-black text-white">14</span>
                    <span className="text-[10px] sm:text-xs text-white/60 font-medium">soat</span>
                  </div>
                  {/* Minutes */}
                  <div className="min-w-[62px] sm:min-w-[70px] p-3 sm:p-4 rounded-xl bg-black/60 border border-white/15 backdrop-blur-md text-center">
                    <span className="block text-xl sm:text-2xl font-black text-white">37</span>
                    <span className="text-[10px] sm:text-xs text-white/60 font-medium">daq</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. BEST SELLERS SECTION ("Eng ko'p sotilganlar")           */}
        {/* ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Eng ko‘p sotilganlar
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs sm:text-sm font-medium text-white/70 hover:text-white inline-flex items-center gap-1.5 transition-colors self-start sm:self-auto group"
            >
              <span>Barchasini ko‘rish</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 4 Products + 1 Brand Feature Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}

            {/* 5th Card: SARTO Brand Feature Card */}
            <div className="bg-[#121212] border border-white/[0.08] rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-white/20 transition-all duration-300 shadow-lg">
              <div className="space-y-4">
                <span className="text-2xl sm:text-3xl font-extrabold tracking-[0.18em] uppercase text-white block">
                  SARTO
                </span>
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-normal">
                  Sizning uslubingiz,<br />bizning ilhomimiz.
                </p>
              </div>

              <div className="pt-6">
                <Link
                  href="/shop"
                  aria-label="Kolleksiyaga o‘tish"
                  className="w-10 h-10 rounded-full border border-white/20 text-white hover:bg-white hover:text-black flex items-center justify-center transition-all cursor-pointer group"
                >
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
