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
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav aria-label="Non ushoqlari (Breadcrumbs)" className="text-xs text-white/50 mb-8 flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-white transition-colors">
            Bosh sahifa
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/shop" className="hover:text-white transition-colors">
            Katalog
          </Link>
          {product.category && (
            <>
              <span aria-hidden="true">/</span>
              <Link
                href={`/category/${product.category.slug}`}
                className="hover:text-white transition-colors"
              >
                {product.category.name}
              </Link>
            </>
          )}
          <span aria-hidden="true">/</span>
          <span className="text-white font-medium">{product.name}</span>
        </nav>

        <ProductDetailsClient product={product} />
      </main>

      <Footer />
    </div>
  );
}
