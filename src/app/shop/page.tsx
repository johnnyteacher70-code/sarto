import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { getProducts } from "@/server/repositories/productRepository";
import { getActiveCategories } from "@/server/repositories/categoryRepository";
import { SortSelect } from "@/components/ui/SortSelect";
import Link from "next/link";
import { X, Filter } from "lucide-react";

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

  const activeCategory = categories.find((c) => c.slug === currentCategorySlug);

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav aria-label="Non ushoqlari (Breadcrumbs)" className="text-xs text-white/50 mb-4 flex items-center gap-1.5">
          <Link href="/" className="hover:text-white transition-colors">
            Bosh sahifa
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-white font-medium">Katalog</span>
          {activeCategory && (
            <>
              <span aria-hidden="true">/</span>
              <span className="text-white font-semibold">{activeCategory.name}</span>
            </>
          )}
        </nav>

        {/* Page Header */}
        <div className="border-b border-white/10 pb-6 mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {activeCategory ? activeCategory.name : "Erkaklar kiyimlari kolleksiyasi"}
              </h1>
              <p className="text-xs sm:text-sm text-white/50 mt-1.5">
                Jami <strong className="text-white">{total} ta</strong> sara mahsulot mavjud
              </p>
            </div>

            {/* Sort Control Dropdown */}
            <SortSelect currentSort={currentSort} />
          </div>

          {/* Filter Categories Chips */}
          <div className="pt-2">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" aria-label="Bo‘limlar bo‘yicha filtrlar">
              <span className="text-xs text-white/50 font-medium flex items-center gap-1 mr-1 shrink-0">
                <Filter className="w-3.5 h-3.5" /> Bo‘lim:
              </span>

              <Link
                href={`/shop${currentSort ? `?sort=${currentSort}` : ""}`}
                className={`min-h-[36px] px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all whitespace-nowrap flex items-center justify-center ${
                  !currentCategorySlug
                    ? "bg-white text-black font-semibold shadow-xs"
                    : "border border-white/15 bg-[#141414] text-white/80 hover:text-white hover:border-white/30"
                }`}
              >
                Barchasi
              </Link>

              {categories.map((cat) => {
                const isSelected = currentCategorySlug === cat.slug;
                return (
                  <Link
                    key={cat.id}
                    href={`/shop?category=${cat.slug}${currentSort ? `&sort=${currentSort}` : ""}`}
                    className={`min-h-[36px] px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-white text-black font-semibold shadow-xs"
                        : "border border-white/15 bg-[#141414] text-white/80 hover:text-white hover:border-white/30"
                    }`}
                  >
                    {cat.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Active Filter Pill */}
          {activeCategory && (
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs text-white/50">Faol filtr:</span>
              <Link
                href={`/shop${currentSort ? `?sort=${currentSort}` : ""}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-white rounded-full text-xs hover:bg-white/20 transition-colors"
              >
                <span>{activeCategory.name}</span>
                <X className="w-3 h-3 text-white/70" />
              </Link>
            </div>
          )}
        </div>

        {/* Product Grid or Empty State */}
        {products.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto space-y-4">
            <h2 className="text-2xl font-bold text-white">Mahsulot topilmadi</h2>
            <p className="text-sm text-white/50">
              Ushbu parametrlar bo‘yicha hozircha tovarlar mavjud emas. Filtrlarni tozalab ko‘ring.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex min-h-[44px] items-center justify-center px-6 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors"
              >
                Filtrni tozalash
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
