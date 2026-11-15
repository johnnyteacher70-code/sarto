import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export default function ReturnsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <nav className="text-xs text-sarto-muted uppercase tracking-wider mb-6">
          <Link href="/" className="hover:text-sarto-black">Bosh sahifa</Link> / <span>Qaytarish siyosati</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-5xl text-sarto-black mb-8">
          Qaytarish va almashtirish siyosati
        </h1>

        <div className="space-y-6 text-sm text-sarto-black/80 leading-relaxed">
          <p>
            SARTO mijozlarining xaridlaridan to‘liq mamnun bo‘lishlarini qadrlaydi. Agar xarid qilingan
            libos o‘lchami, rangi yoki modeli sizga ma’qul kelmasa, uni 14 kun ichida almashtirishingiz
            yoki qaytarishingiz mumkin.
          </p>

          <h2 className="font-serif text-2xl text-sarto-black pt-4">Asosiy shartlar:</h2>
          <ul className="list-disc pl-5 space-y-2 text-xs">
            <li>Mahsulot kiyilmagan, yuvilmagan va asl holatida bo‘lishi shart.</li>
            <li>Barcha yorliqlar (taglar) va asl qadoq saqlangan bo‘lishi kerak.</li>
            <li>Xarid cheki yoki buyurtma raqami taqdim etilishi lozim.</li>
          </ul>

          <h2 className="font-serif text-2xl text-sarto-black pt-4">Mablag‘ni qaytarish:</h2>
          <p className="text-xs text-sarto-muted">
            Qaytarilgan tovar qabul qilingach va tekshiruvdan o‘tgach, to‘langan mablag‘ 1–3 ish kuni
            ichida xaridorning bank kartasiga yoki naqd shaklda qaytariladi.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
