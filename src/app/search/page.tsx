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
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
        {/* Breadcrumb */}
        <nav aria-label="Non ushoqlari (Breadcrumbs)" className="text-xs text-white/50 mb-4 flex items-center gap-1.5">
          <Link href="/" className="hover:text-white transition-colors">Bosh sahifa</Link>
          <span aria-hidden="true">/</span>
          <span className="text-white font-medium">Qidiruv</span>
        </nav>

        {/* Search Input Box */}
        <div className="max-w-2xl mx-auto text-center pb-8 mb-8 border-b border-white/10 space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Mahsulotlarni qidirish
          </h1>
          <p className="text-xs sm:text-sm text-white/50">
            Kiyim turi, rangi yoki nomini kiriting (masalan: ko‘ylak, kostyum, kurtka, shim)
          </p>

          <form action="/search" method="GET" className="relative flex items-center gap-2 pt-2">
            <div className="relative flex-1">
              <input
                type="search"
                name="q"
                defaultValue={q || ""}
                placeholder="Qidiruv so‘zini kiriting..."
                className="w-full min-h-[50px] border border-white/15 bg-[#141414] pl-12 pr-4 rounded-full text-sm sm:text-base text-white focus-visible:outline-none focus-visible:border-white focus-visible:ring-1 focus-visible:ring-white placeholder:text-white/40"
                aria-label="Mahsulot nomi yoki tavsifi bo‘yicha qidiruv"
              />
              <Search className="w-5 h-5 text-white/40 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <button
              type="submit"
              className="min-h-[50px] px-8 bg-white text-black text-sm font-semibold rounded-full hover:bg-[#EAE6DF] transition-colors cursor-pointer shrink-0 shadow-md"
            >
              Qidirish
            </button>
          </form>

          {q && (
            <p className="text-sm text-white pt-1">
              «<strong className="font-bold">{q}</strong>» so‘rovi bo‘yicha <strong className="font-bold">{total} ta</strong> mahsulot topildi
            </p>
          )}
        </div>

        {/* Results Grid or Empty State */}
        {products.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto space-y-4">
            <h2 className="text-2xl font-bold text-white">Hech narsa topilmadi</h2>
            <p className="text-sm text-white/50 leading-relaxed">
              Kiritilgan so‘z bo‘yicha mahsulot topilmadi. Boshqa so‘z bilan qidirib ko‘ring yoki to‘liq katalogimizni ko‘ring.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex min-h-[46px] items-center justify-center px-8 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 shadow-md"
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
