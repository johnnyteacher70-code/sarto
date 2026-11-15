import Link from "next/link";
import Image from "next/image";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import { getFeaturedProducts } from "@/server/repositories/productRepository";
import { getActiveCategories } from "@/server/repositories/categoryRepository";
import { ArrowRight, ShieldCheck, Sparkles, Truck } from "lucide-react";

export default async function HomePage() {
  const [featuredProducts, categories] = await Promise.all([
    getFeaturedProducts(4),
    getActiveCategories(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative bg-sarto-black text-white min-h-[560px] sm:min-h-[680px] flex items-center overflow-hidden border-b border-sarto-charcoal">
          {/* Background Editorial Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero/hero-banner.jpg"
              alt="SARTO — Erkaklar premium liboslari"
              fill
              priority
              className="object-cover object-center brightness-[0.72]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent sm:via-black/30" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 w-full">
            <div className="max-w-xl sm:max-w-2xl space-y-6">
              <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-sarto-taupe font-semibold block">
                Yangi Mavsum 2026
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight leading-[1.15]">
                Mukammal bichim va <br className="hidden sm:inline" />
                <span className="italic font-light">bejirim did uyg‘unligi</span>
              </h1>
              <p className="text-sm sm:text-base text-sarto-ivory/90 leading-relaxed font-normal max-w-lg">
                SARTO — nafis siluet, sara tabiiy matolar va Italiya klassik tikuv an’analarini
                O‘zbekiston erkaklariga taqdim etuvchi zamonaviy premium brend.
              </p>
              <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Link href="/shop" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full bg-white text-sarto-black hover:bg-sarto-ivory shadow-md">
                    Kolleksiyani ko‘rish <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/category/kostyum-va-shimlar" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full text-white border-white/80 hover:bg-white hover:text-sarto-black"
                  >
                    Kostyumlar to‘plami
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIES SECTION */}
        <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 pb-4 border-b border-sarto-border gap-3">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-sarto-muted font-semibold block mb-1">
                Katalog
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-sarto-black">
                Asosiy bo‘limlar
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs sm:text-sm font-semibold text-sarto-black hover:text-sarto-taupe inline-flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              Barcha bo‘limlar <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group block relative aspect-[4/5] overflow-hidden border border-sarto-border transition-all hover:border-sarto-black shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sarto-black"
                aria-label={`${cat.name} bo‘limi`}
              >
                <Image
                  src={cat.image_url || "/images/products/oxford-shirt.jpg"}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white space-y-1.5 z-10">
                  <span className="font-serif text-xs text-sarto-taupe font-medium tracking-widest uppercase">
                    0{cat.sort_order}
                  </span>
                  <h3 className="font-serif text-xl tracking-wide">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                  <span className="text-xs text-sarto-taupe font-semibold inline-flex items-center gap-1 pt-1.5">
                    Kolleksiyaga o‘tish <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FEATURED PRODUCTS */}
        <section className="py-16 sm:py-20 bg-[#FAFAFA] border-y border-sarto-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 pb-4 border-b border-sarto-border gap-3">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-sarto-muted font-semibold block mb-1">
                  Yangi kelganlar
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-sarto-black">
                  Eng sara tanlovlar
                </h2>
              </div>
              <Link
                href="/shop"
                className="text-xs sm:text-sm font-semibold text-sarto-black hover:text-sarto-taupe inline-flex items-center gap-1.5 transition-colors self-start sm:self-auto"
              >
                Barchasini ko‘rish <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* BRAND VALUES */}
        <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-sarto-muted font-semibold">
              SARTO kafolati
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-sarto-black">
              Nima uchun mijozlar SARTO’ni tanlaydi?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-7 sm:p-8 bg-white border border-sarto-border space-y-3.5 shadow-xs">
              <div className="w-12 h-12 mx-auto rounded-full bg-sarto-ivory flex items-center justify-center text-sarto-black">
                <Sparkles className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-lg text-sarto-black">100% Tabiiy matolar</h3>
              <p className="text-xs sm:text-sm text-sarto-muted leading-relaxed">
                Misr paxtasi, Super 130s Merino juni va tabiiy kashmir tolalari.
                Kun davomida tanaga yengil va qulay teginish beradi.
              </p>
            </div>

            <div className="text-center p-7 sm:p-8 bg-white border border-sarto-border space-y-3.5 shadow-xs">
              <div className="w-12 h-12 mx-auto rounded-full bg-sarto-ivory flex items-center justify-center text-sarto-black">
                <Truck className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-lg text-sarto-black">Ishonchli va tezkor yetkazish</h3>
              <p className="text-xs sm:text-sm text-sarto-muted leading-relaxed">
                Toshkent shahri bo‘ylab 24 soat ichida, viloyatlarga 1–3 kun ichida yetkaziladi.
                800 000 so‘mdan yuqori buyurtmalarga butunlay bepul.
              </p>
            </div>

            <div className="text-center p-7 sm:p-8 bg-white border border-sarto-border space-y-3.5 shadow-xs">
              <div className="w-12 h-12 mx-auto rounded-full bg-sarto-ivory flex items-center justify-center text-sarto-black">
                <ShieldCheck className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-lg text-sarto-black">O‘lchamni almashtirish kafolati</h3>
              <p className="text-xs sm:text-sm text-sarto-muted leading-relaxed">
                Agar xarid qilingan libos o‘lchami mos kelmasa, uni 14 kun ichida bepul va ortiqcha
                qiyinchiliklarsiz boshqa o‘lchamga almashtirishingiz mumkin.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
