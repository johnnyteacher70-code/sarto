import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { getProducts } from "@/server/repositories/productRepository";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const { products, total } = await getProducts({ search: q, limit: 20 });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
        {/* Breadcrumb */}
        <nav aria-label="Non ushoqlari (Breadcrumbs)" className="text-xs text-sarto-muted mb-4 flex items-center gap-1.5">
          <Link href="/" className="hover:text-sarto-black">Bosh sahifa</Link>
          <span aria-hidden="true">/</span>
          <span className="text-sarto-black font-semibold">Qidiruv</span>
        </nav>

        {/* Search Input Box */}
        <div className="max-w-2xl mx-auto text-center pb-8 mb-8 border-b border-sarto-border space-y-4">
          <h1 className="font-serif text-3xl sm:text-4xl text-sarto-black">
            Mahsulotlarni qidirish
          </h1>
          <p className="text-sm text-sarto-muted">
            Kiyim turi, rangi yoki nomini kiriting (masalan: ko‘ylak, kostyum, palto)
          </p>

          <form action="/search" method="GET" className="relative flex items-center gap-2 pt-2">
            <div className="relative flex-1">
              <input
                type="search"
                name="q"
                defaultValue={q || ""}
                placeholder="Qidiruv so‘zini kiriting..."
                className="w-full min-h-[50px] border border-sarto-border bg-white pl-12 pr-4 text-sm sm:text-base text-sarto-black focus-visible:outline-none focus-visible:border-sarto-black focus-visible:ring-1 focus-visible:ring-sarto-black placeholder:text-sarto-muted rounded-none"
                aria-label="Mahsulot nomi yoki tavsifi bo‘yicha qidiruv"
              />
              <Search className="w-5 h-5 text-sarto-muted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <button
              type="submit"
              className="min-h-[50px] px-6 bg-sarto-black text-white text-sm font-medium tracking-wide hover:bg-sarto-charcoal transition-colors cursor-pointer shrink-0"
            >
              Qidirish
            </button>
          </form>

          {q && (
            <p className="text-sm text-sarto-black pt-1">
              «<strong className="font-bold">{q}</strong>» so‘rovi bo‘yicha <strong className="font-bold">{total} ta</strong> mahsulot topildi
            </p>
          )}
        </div>

        {/* Results Grid or Empty State */}
        {products.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto space-y-4">
            <h2 className="font-serif text-2xl text-sarto-black">Hech narsa topilmadi</h2>
            <p className="text-sm text-sarto-muted leading-relaxed">
              Kiritilgan so‘z bo‘yicha mahsulot topilmadi. Boshqa so‘z bilan qidirib ko‘ring yoki to‘liq katalogimizni ko‘ring.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex min-h-[48px] items-center justify-center px-6 bg-sarto-black text-white text-sm font-medium hover:bg-sarto-charcoal transition-colors"
              >
                Barcha mahsulotlarni ko‘rish <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
