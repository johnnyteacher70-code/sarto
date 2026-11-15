import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { getProducts } from "@/server/repositories/productRepository";
import { getActiveCategories } from "@/server/repositories/categoryRepository";
import Link from "next/link";

interface ShopPageProps {
  searchParams: Promise<{
    category?: string;
    sort?: "newest" | "price_asc" | "price_desc" | "featured";
    q?: string;
  }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const resolvedParams = await searchParams;
  const currentCategorySlug = resolvedParams.category;
  const currentSort = resolvedParams.sort || "newest";
  const searchQuery = resolvedParams.q;

  const [categories, { products, total }] = await Promise.all([
    getActiveCategories(),
    getProducts({
      categorySlug: currentCategorySlug,
      sort: currentSort,
      search: searchQuery,
    }),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Breadcrumb & Header */}
        <div className="border-b border-sarto-border pb-8 mb-8">
          <nav className="text-xs text-sarto-muted uppercase tracking-wider mb-3">
            <Link href="/" className="hover:text-sarto-black transition-colors">
              Bosh sahifa
            </Link>{" "}
            /{" "}
            <span className="text-sarto-black font-medium">Katalog</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl text-sarto-black">
                {currentCategorySlug
                  ? categories.find((c) => c.slug === currentCategorySlug)?.name || "Kolleksiya"
                  : "Barcha mahsulotlar"}
              </h1>
              <p className="text-xs text-sarto-muted mt-1.5">
                Jami {total} ta premium mahsulot topildi
              </p>
            </div>

            {/* Filter Categories Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              <Link
                href="/shop"
                className={`text-xs uppercase tracking-wider px-3 py-1.5 border transition-colors whitespace-nowrap ${
                  !currentCategorySlug
                    ? "bg-sarto-black text-white border-sarto-black"
                    : "border-sarto-border text-sarto-black hover:border-sarto-black"
                }`}
              >
                Barchasi
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/shop?category=${cat.slug}`}
                  className={`text-xs uppercase tracking-wider px-3 py-1.5 border transition-colors whitespace-nowrap ${
                    currentCategorySlug === cat.slug
                      ? "bg-sarto-black text-white border-sarto-black"
                      : "border-sarto-border text-sarto-black hover:border-sarto-black"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <p className="font-serif text-xl text-sarto-black">
              Hech qanday mahsulot topilmadi
            </p>
            <p className="text-xs text-sarto-muted">
              Tanlangan filtrlar bo‘yicha hozircha tovar mavjud emas.
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
