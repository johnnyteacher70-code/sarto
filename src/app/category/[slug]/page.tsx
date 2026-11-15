import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { getProducts } from "@/server/repositories/productRepository";
import { getCategoryBySlug, getActiveCategories } from "@/server/repositories/categoryRepository";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, Filter } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Kategoriya topilmadi" };

  return {
    title: `${category.name} | SARTO`,
    description: category.description || `${category.name} to‘plami`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [category, categories, { products }] = await Promise.all([
    getCategoryBySlug(slug),
    getActiveCategories(),
    getProducts({ categorySlug: slug }),
  ]);

  if (!category) {
    notFound();
  }

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
          <Link href="/shop" className="hover:text-sarto-black transition-colors">
            Katalog
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-sarto-black font-semibold">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="border-b border-sarto-border pb-6 mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl text-sarto-black">
                {category.name}
              </h1>
              {category.description && (
                <p className="text-sm text-sarto-muted mt-1.5 max-w-2xl">
                  {category.description}
                </p>
              )}
            </div>

            <Link
              href="/shop"
              className="text-xs sm:text-sm font-semibold text-sarto-black hover:text-sarto-taupe flex items-center gap-1.5 transition-colors self-start sm:self-auto shrink-0"
            >
              <ArrowLeft className="w-4 h-4" /> Barcha katalog
            </Link>
          </div>

          {/* Sibling Category Chips */}
          <div className="pt-2 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" aria-label="Boshqa bo‘limlar">
            <span className="text-xs text-sarto-muted font-medium flex items-center gap-1 mr-1 shrink-0">
              <Filter className="w-3.5 h-3.5" /> Bo‘limlar:
            </span>
            <Link
              href="/shop"
              className="min-h-[38px] px-4 py-2 border border-sarto-border bg-white text-sarto-black hover:border-sarto-black text-xs sm:text-sm font-medium tracking-wide transition-all whitespace-nowrap flex items-center justify-center"
            >
              Barchasi
            </Link>
            {categories.map((cat) => {
              const isSelected = cat.slug === slug;
              return (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className={`min-h-[38px] px-4 py-2 border text-xs sm:text-sm font-medium tracking-wide transition-all whitespace-nowrap flex items-center justify-center ${
                    isSelected
                      ? "bg-sarto-black text-white border-sarto-black shadow-xs font-semibold"
                      : "border-sarto-border bg-white text-sarto-black hover:border-sarto-black"
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto space-y-4">
            <h2 className="font-serif text-2xl text-sarto-black">Ushbu bo‘limda hozircha mahsulot yo‘q</h2>
            <p className="text-sm text-sarto-muted">
              Yaqin kunlarda ushbu toifaga yangi mahsulotlar qo‘shiladi.
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
