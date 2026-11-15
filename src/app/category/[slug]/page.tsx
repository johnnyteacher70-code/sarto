import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { getProducts } from "@/server/repositories/productRepository";
import { getCategoryBySlug, getActiveCategories } from "@/server/repositories/categoryRepository";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

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
  const [category, categories, { products, total }] = await Promise.all([
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

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="border-b border-sarto-border pb-8 mb-8">
          <nav className="text-xs text-sarto-muted uppercase tracking-wider mb-3">
            <Link href="/" className="hover:text-sarto-black transition-colors">
              Bosh sahifa
            </Link>{" "}
            /{" "}
            <Link href="/shop" className="hover:text-sarto-black transition-colors">
              Katalog
            </Link>{" "}
            / <span className="text-sarto-black font-medium">{category.name}</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl text-sarto-black">
                {category.name}
              </h1>
              {category.description && (
                <p className="text-xs text-sarto-muted mt-1.5 max-w-xl">
                  {category.description}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className={`text-xs uppercase tracking-wider px-3 py-1.5 border transition-colors whitespace-nowrap ${
                    cat.slug === slug
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

        {products.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <p className="font-serif text-xl text-sarto-black">Ushbu bo‘limda hozircha mahsulot yo‘q</p>
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
