import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductDetailsClient } from "@/components/product/ProductDetailsClient";
import { getProductBySlug } from "@/server/repositories/productRepository";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Mahsulot topilmadi" };

  return {
    title: `${product.name} | SARTO`,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav className="text-xs text-sarto-muted uppercase tracking-wider mb-8">
          <Link href="/" className="hover:text-sarto-black transition-colors">
            Bosh sahifa
          </Link>{" "}
          /{" "}
          <Link href="/shop" className="hover:text-sarto-black transition-colors">
            Katalog
          </Link>{" "}
          /{" "}
          {product.category && (
            <>
              <Link
                href={`/category/${product.category.slug}`}
                className="hover:text-sarto-black transition-colors"
              >
                {product.category.name}
              </Link>{" "}
              /{" "}
            </>
          )}
          <span className="text-sarto-black font-medium">{product.name}</span>
        </nav>

        <ProductDetailsClient product={product} />
      </main>

      <Footer />
    </div>
  );
}
