import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <nav className="text-xs text-sarto-muted uppercase tracking-wider mb-6">
          <Link href="/" className="hover:text-sarto-black">Bosh sahifa</Link> / <span>Foydalanish shartlari</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-5xl text-sarto-black mb-8">
          Foydalanish shartlari
        </h1>

        <div className="space-y-6 text-sm text-sarto-black/80 leading-relaxed">
          <p>
            SARTO veb-saytidan foydalanish orqali siz quyidagi shartlarga rozilik bildirasiz.
          </p>

          <h2 className="font-serif text-2xl text-sarto-black pt-4">1. Umumiy qoidalar</h2>
          <p className="text-xs text-sarto-muted">
            Saytda ko‘rsatilgan barcha narxlar O‘zbekiston so‘mida (UZS) ko‘rsatilgan va qo‘shilgan qiymat
            solig‘ini o‘z ichiga oladi.
          </p>

          <h2 className="font-serif text-2xl text-sarto-black pt-4">2. Buyurtma rasmiylashtirish</h2>
          <p className="text-xs text-sarto-muted">
            Xaridor kiritgan aloqa ma’lumotlarining to‘g‘riligi uchun o‘zi mas’uldir. Buyurtma
            berilgandan so‘ng operator buyurtmani tasdiqlash uchun bog‘lanadi.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
