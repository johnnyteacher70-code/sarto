import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { RefreshCw, CheckCircle2 } from "lucide-react";

export default function ReturnsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <nav className="text-xs text-white/50 mb-6 flex items-center gap-1.5">
          <Link href="/" className="hover:text-white">Bosh sahifa</Link> / <span className="text-white font-medium">Qaytarish va almashtirish</span>
        </nav>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">
          Qaytarish va almashtirish shartlari
        </h1>
        <p className="text-sm sm:text-base text-white/60 mb-10 leading-relaxed">
          Siz SARTO do‘konidan xarid qilingan har qanday mahsulotni 14 kalendar kuni ichida qaytarishingiz yoki boshqa o‘lchamga almashtirishingiz mumkin.
        </p>

        <div className="space-y-6">
          <div className="p-8 bg-[#141414] border border-white/10 rounded-3xl space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2.5">
              <RefreshCw className="w-5 h-5 text-white" /> Almashtirish qoidalari
            </h2>
            <ul className="space-y-3 text-xs sm:text-sm text-white/70">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Tovar ishlatilmagan, asl ko‘rinishini va barcha yorliq (tag) larini saqlagan bo‘lishi lozim.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Tovarni xarid qilganingizni tasdiqlovchi buyurtma raqami yoki chek mavjud bo‘lishi kerak.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Toshkent shahri bo‘yicha kuryerimiz o‘lchamni almashtirish uchun manzilingizga boradi.</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
