import Link from "next/link";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Heart, ArrowRight } from "lucide-react";

export default function WishlistPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
        <div className="border-b border-sarto-border pb-6 mb-8">
          <nav aria-label="Non ushoqlari (Breadcrumbs)" className="text-xs text-sarto-muted mb-2 flex items-center gap-1.5">
            <Link href="/" className="hover:text-sarto-black">Bosh sahifa</Link>
            <span aria-hidden="true">/</span>
            <span className="text-sarto-black font-semibold">Sevimlilar</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-4xl text-sarto-black">
            Sevimli mahsulotlarim
          </h1>
        </div>

        <div className="py-24 text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-sarto-ivory flex items-center justify-center text-sarto-muted mx-auto">
            <Heart className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h2 className="font-serif text-2xl text-sarto-black">Sevimlilar ro‘yxati hozircha bo‘sh</h2>
          <p className="text-sm text-sarto-muted leading-relaxed">
            Sizga ma’qul kelgan liboslarni kartochkadagi yurakcha belgisini bosish orqali shu yerga saqlab qo‘yishingiz mumkin.
          </p>
          <div className="pt-2">
            <Link href="/shop">
              <Button size="lg">
                Katalogga o‘tish <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
