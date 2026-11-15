import Link from "next/link";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="border-b border-sarto-border pb-6 mb-8">
          <nav className="text-xs text-sarto-muted uppercase tracking-wider mb-2">
            <Link href="/" className="hover:text-sarto-black">Bosh sahifa</Link> / <span>Sevimlilar</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-4xl text-sarto-black">Sevimli mahsulotlar</h1>
        </div>

        <div className="py-24 text-center space-y-4">
          <Heart className="w-12 h-12 mx-auto text-sarto-muted stroke-1" />
          <h2 className="font-serif text-xl text-sarto-black">Sevimlilar ro‘yxati hozircha bo‘sh</h2>
          <p className="text-xs text-sarto-muted max-w-sm mx-auto">
            Sizga yoqqan liboslarni yurakcha belgisini bosish orqali saqlab qo‘yishingiz mumkin.
          </p>
          <div className="pt-4">
            <Link href="/shop">
              <Button>Katalogga o‘tish</Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
