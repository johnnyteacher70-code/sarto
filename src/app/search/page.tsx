import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { getProducts } from "@/server/repositories/productRepository";
import Link from "next/link";
import { Search } from "lucide-react";

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

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="border-b border-sarto-border pb-8 mb-8 max-w-2xl mx-auto text-center">
          <h1 className="font-serif text-3xl sm:text-4xl text-sarto-black mb-4">
            Qidiruv
          </h1>

          <form action="/search" method="GET" className="relative">
            <input
              type="text"
              name="q"
              defaultValue={q || ""}
              placeholder="Mahsulot nomi yoki turini qidiring..."
              className="w-full h-12 border border-sarto-border bg-white pl-11 pr-4 text-sm text-sarto-black focus:outline-none focus:border-sarto-black placeholder:text-sarto-muted"
            />
            <Search className="w-4 h-4 text-sarto-muted absolute left-4 top-4" />
          </form>

          {q && (
            <p className="text-xs text-sarto-muted mt-3">
              &quot;{q}&quot; so‘rovi bo‘yicha {total} ta mahsulot topildi
            </p>
          )}
        </div>

        {products.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <p className="font-serif text-xl text-sarto-black">Hech narsa topilmadi</p>
            <p className="text-xs text-sarto-muted max-w-sm mx-auto">
              Boshqa so‘z bilan qidirib ko‘ring yoki barcha mahsulotlar katalogiga qarang.
            </p>
            <div className="pt-4">
              <Link
                href="/shop"
                className="text-xs uppercase tracking-wider underline underline-offset-4 hover:text-sarto-taupe"
              >
                Barcha mahsulotlarni ko‘rish
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
