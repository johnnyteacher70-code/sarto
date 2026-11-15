import Link from "next/link";
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
        <section className="relative bg-sarto-ivory py-24 sm:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-sarto-border">
          <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
            <span className="text-xs uppercase tracking-[0.35em] text-sarto-black/70 font-semibold block">
              Yangi Kolleksiya 2026
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-sarto-black leading-[1.1]">
              Mukammal bichim va <br className="hidden sm:inline" />
              <span className="italic">bejirim did uyg‘unligi</span>
            </h1>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-sarto-muted leading-relaxed font-normal">
              SARTO — zamonaviy erkaklar uchun nafis siluet, sifatli tabiiy matolar va Italiya
              klassik tikuv an’analarini O‘zbekistonga olib kiruvchi premium brend.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/shop">
                <Button size="lg" className="w-full sm:w-auto">
                  Kolleksiyani ko‘rish
                </Button>
              </Link>
              <Link href="/category/kostyum-va-shimlar">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Kostyumlar to‘plami
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CATEGORIES SECTION */}
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
                className="group block relative aspect-[4/5] bg-sarto-ivory border border-sarto-border p-8 flex flex-col justify-end transition-all hover:border-sarto-black"
              >
                <div className="absolute top-6 left-6 font-serif text-3xl font-light text-sarto-black/10 select-none">
                  0{cat.sort_order}
                </div>
                <div className="relative z-10 space-y-2">
                  <h3 className="font-serif text-xl text-sarto-black group-hover:text-sarto-taupe transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-sarto-muted line-clamp-2">
                    {cat.description}
                  </p>
                  <span className="text-[11px] uppercase tracking-wider text-sarto-black font-semibold inline-flex items-center gap-1 pt-2">
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
