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
        {/* HERO SECTION WITH REAL EDITORIAL BANNER */}
        <section className="relative bg-sarto-black text-white min-h-[600px] sm:min-h-[700px] flex items-center overflow-hidden border-b border-sarto-charcoal">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero/hero-banner.jpg"
              alt="SARTO Luxury Menswear"
              fill
              priority
              className="object-cover object-center brightness-[0.75]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full">
            <div className="max-w-2xl space-y-6">
              <span className="text-xs uppercase tracking-[0.35em] text-sarto-taupe font-semibold block">
                Yangi Mavsum 2026
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight leading-[1.1]">
                Mukammal bichim va <br />
                <span className="italic font-light">bejirim did uyg‘unligi</span>
              </h1>
              <p className="text-sm sm:text-base text-sarto-ivory/80 leading-relaxed font-normal max-w-lg">
                SARTO — nafis siluet, sara tabiiy matolar va Italiya klassik tikuv an’analarini
                O‘zbekiston erkaklariga taqdim etuvchi premium moda brendi.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link href="/shop">
                  <Button size="lg" className="w-full sm:w-auto bg-white text-sarto-black hover:bg-sarto-ivory">
                    Kolleksiyani ko‘rish
                  </Button>
                </Link>
                <Link href="/category/kostyum-va-shimlar">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto text-white border-white/60 hover:bg-white/10 hover:border-white"
                  >
                    Kostyumlar to‘plami
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIES SECTION WITH REAL PHOTOS */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-sarto-border gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-sarto-muted font-semibold">
                Katalog
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-sarto-black mt-1">
                Kategoriyalar
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs uppercase tracking-widest text-sarto-black hover:text-sarto-taupe font-semibold inline-flex items-center gap-1.5 transition-colors"
            >
              Barcha bo‘limlar <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group block relative aspect-[4/5] overflow-hidden border border-sarto-border transition-all hover:border-sarto-black"
              >
                {/* Category Photo */}
                <Image
                  src={cat.image_url || "/images/products/oxford-shirt.jpg"}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white space-y-1.5 z-10">
                  <span className="font-serif text-xs text-sarto-taupe font-light uppercase tracking-widest">
                    0{cat.sort_order}
                  </span>
                  <h3 className="font-serif text-xl tracking-wide">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-white/80 line-clamp-1">
                    {cat.description}
                  </p>
                  <span className="text-[10px] uppercase tracking-wider text-sarto-taupe font-semibold inline-flex items-center gap-1 pt-1">
                    Ko‘rish <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FEATURED PRODUCTS */}
        <section className="py-20 bg-[#FAFAFA] border-y border-sarto-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-sarto-border gap-4">
              <div>
                <span className="text-[11px] uppercase tracking-[0.25em] text-sarto-muted font-semibold">
                  Tanlanganlar
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-sarto-black mt-1">
                  Eng sara mahsulotlar
                </h2>
              </div>
              <Link
                href="/shop"
                className="text-xs uppercase tracking-widest text-sarto-black hover:text-sarto-taupe font-semibold inline-flex items-center gap-1.5 transition-colors"
              >
                Barchasini ko‘rish <ArrowRight className="w-3.5 h-3.5" />
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
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center p-8 bg-white border border-sarto-border space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-sarto-ivory flex items-center justify-center text-sarto-black">
                <Sparkles className="w-5 h-5 stroke-1" />
              </div>
              <h3 className="font-serif text-lg text-sarto-black">Tabiiy matolar</h3>
              <p className="text-xs text-sarto-muted leading-relaxed">
                Misr paxtasi, Merino juni va tabiiy kashmir tolalari. Tanaga yoqimli va uzoq vaqt
                o‘z sifatini saqlab qoluvchi materiallar.
              </p>
            </div>

            <div className="text-center p-8 bg-white border border-sarto-border space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-sarto-ivory flex items-center justify-center text-sarto-black">
                <Truck className="w-5 h-5 stroke-1" />
              </div>
              <h3 className="font-serif text-lg text-sarto-black">Tezkor yetkazib berish</h3>
              <p className="text-xs text-sarto-muted leading-relaxed">
                Toshkent shahri bo‘ylab 24 soat ichida, O‘zbekiston viloyatlariga esa 2–3 kun
                ichida ishonchli kuryerlik orqali yetkaziladi.
              </p>
            </div>

            <div className="text-center p-8 bg-white border border-sarto-border space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-sarto-ivory flex items-center justify-center text-sarto-black">
                <ShieldCheck className="w-5 h-5 stroke-1" />
              </div>
              <h3 className="font-serif text-lg text-sarto-black">O‘lcham kafolati</h3>
              <p className="text-xs text-sarto-muted leading-relaxed">
                Kiyim o‘lchami mos kelmasa, uni 14 kun ichida bepul va ortiqcha qiyinchiliklarsiz
                boshqa o‘lchamga almashtirishingiz mumkin.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
