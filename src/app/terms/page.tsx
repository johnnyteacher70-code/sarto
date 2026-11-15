import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <nav className="text-xs text-white/50 mb-6 flex items-center gap-1.5">
          <Link href="/" className="hover:text-white">Bosh sahifa</Link> / <span className="text-white font-medium">Foydalanish shartlari</span>
        </nav>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">
          Foydalanish shartlari (Ommaviy oferta)
        </h1>

        <div className="text-white/70 space-y-5 text-xs sm:text-sm leading-relaxed p-8 bg-[#141414] border border-white/10 rounded-3xl">
          <p>
            Ushbu hujjat SARTO rasmiy internet-do‘koni orqali mahsulot sotib olish bo‘yicha ommaviy oferta hisoblanadi.
          </p>
          <h2 className="text-base font-bold text-white pt-2">1. Umumiy qoidalar</h2>
          <p>
            Saytda buyurtma rasmiylashtirish orqali mijoz ushbu ommaviy oferta shartlariga to‘liq rozilik bildiradi.
          </p>
          <h2 className="text-base font-bold text-white pt-2">2. Buyurtma va to‘lov</h2>
          <p>
            Buyurtmalar sayt orqali 24/7 rejimida qabul qilinadi. To‘lov tovar mijozga yetkazib berilganda naqd pul yoki bank kartasi orqali amalga oshiriladi.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
