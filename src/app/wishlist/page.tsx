import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Heart, ArrowRight } from "lucide-react";

export default function WishlistPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
        <div className="border-b border-white/10 pb-6 mb-8">
          <nav aria-label="Non ushoqlari (Breadcrumbs)" className="text-xs text-white/50 mb-2 flex items-center gap-1.5">
            <Link href="/" className="hover:text-white">Bosh sahifa</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white font-medium">Sevimlilar</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Sevimli mahsulotlarim
          </h1>
        </div>

        <div className="py-24 text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/40 mx-auto">
            <Heart className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h2 className="text-2xl font-bold text-white">Sevimlilar ro‘yxati hozircha bo‘sh</h2>
          <p className="text-sm text-white/50 leading-relaxed">
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
