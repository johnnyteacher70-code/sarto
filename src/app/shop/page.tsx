import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { getProducts } from "@/server/repositories/productRepository";
import { getActiveCategories } from "@/server/repositories/categoryRepository";
import Link from "next/link";
import { ArrowUpDown, X, Filter } from "lucide-react";

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
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav aria-label="Non ushoqlari (Breadcrumbs)" className="text-xs text-sarto-muted mb-4 flex items-center gap-1.5">
          <Link href="/" className="hover:text-sarto-black transition-colors">
            Bosh sahifa
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-sarto-black font-semibold">Katalog</span>
          {activeCategory && (
            <>
              <span aria-hidden="true">/</span>
              <span className="text-sarto-black font-semibold">{activeCategory.name}</span>
            </>
          )}
        </nav>

        {/* Page Header */}
        <div className="border-b border-sarto-border pb-6 mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl text-sarto-black">
                {activeCategory ? activeCategory.name : "Erkaklar kiyimlari kolleksiyasi"}
              </h1>
              <p className="text-sm text-sarto-muted mt-1.5">
                Jami <strong className="text-sarto-black">{total} ta</strong> sara mahsulot mavjud
              </p>
            </div>

            {/* Sort Control Dropdown */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <label htmlFor="sort-select" className="text-xs text-sarto-muted font-medium flex items-center gap-1 shrink-0">
                <ArrowUpDown className="w-3.5 h-3.5" /> Saralash:
              </label>
              <form method="GET" action="/shop">
                {currentCategorySlug && (
                  <input type="hidden" name="category" value={currentCategorySlug} />
                )}
                {searchQuery && (
                  <input type="hidden" name="q" value={searchQuery} />
                )}
                <select
                  id="sort-select"
                  name="sort"
                  defaultValue={currentSort}
                  // Auto submit on change
                  className="min-h-[42px] border border-sarto-border bg-white px-3 py-1.5 text-xs sm:text-sm text-sarto-black font-medium focus-visible:outline-none focus-visible:border-sarto-black cursor-pointer rounded-none"
                >
                  <option value="newest">Yangi kelganlar</option>
                  <option value="featured">Tavsiya etilganlar</option>
                  <option value="price_asc">Narx: arzonroqdan</option>
                  <option value="price_desc">Narx: qimmatroqdan</option>
                </select>
                <noscript>
                  <button type="submit" className="ml-2 px-3 py-1 bg-sarto-black text-white text-xs">Saralash</button>
                </noscript>
              </form>
            </div>
          </div>

          {/* Filter Categories Chips */}
          <div className="pt-2">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" aria-label="Bo‘limlar bo‘yicha filtrlar">
              <span className="text-xs text-sarto-muted font-medium flex items-center gap-1 mr-1 shrink-0">
                <Filter className="w-3.5 h-3.5" /> Bo‘lim:
              </span>

              <Link
                href={`/shop${currentSort ? `?sort=${currentSort}` : ""}`}
                className={`min-h-[38px] px-4 py-2 border text-xs sm:text-sm font-medium tracking-wide transition-all whitespace-nowrap flex items-center justify-center ${
                  !currentCategorySlug
                    ? "bg-sarto-black text-white border-sarto-black shadow-xs"
                    : "border-sarto-border bg-white text-sarto-black hover:border-sarto-black"
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
                    className={`min-h-[38px] px-4 py-2 border text-xs sm:text-sm font-medium tracking-wide transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-sarto-black text-white border-sarto-black shadow-xs"
                        : "border-sarto-border bg-white text-sarto-black hover:border-sarto-black"
                    }`}
                  >
                    <span>{cat.name}</span>
                    {isSelected && <X className="w-3.5 h-3.5" />}
                  </Link>
                );
              })}
            </div>

            {/* Active Filters Clear Row */}
            {currentCategorySlug && (
              <div className="pt-3 flex items-center gap-2 text-xs">
                <span className="text-sarto-muted">Faol filtr:</span>
                <span className="bg-sarto-ivory text-sarto-black px-2.5 py-1 font-medium flex items-center gap-1.5">
                  {activeCategory?.name}
                  <Link href={`/shop${currentSort ? `?sort=${currentSort}` : ""}`} aria-label="Filtrni tozalash">
                    <X className="w-3 h-3 hover:text-red-600" />
                  </Link>
                </span>
                <Link
                  href={`/shop${currentSort ? `?sort=${currentSort}` : ""}`}
                  className="text-sarto-muted hover:text-sarto-black underline underline-offset-2 ml-2"
                >
                  Barcha filtrlarni tozalash
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto space-y-4">
            <h2 className="font-serif text-2xl text-sarto-black">
              Hech qanday mahsulot topilmadi
            </h2>
            <p className="text-sm text-sarto-muted">
              Tanlangan toifa bo‘yicha hozircha tovarlar mavjud emas. Filtrlarni tozalab qayta urinib ko‘ring.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex min-h-[46px] items-center justify-center px-6 bg-sarto-black text-white text-sm font-medium tracking-wide hover:bg-sarto-charcoal"
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
