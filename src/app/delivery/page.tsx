import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { Truck, Clock, ShieldCheck, MapPin } from "lucide-react";

export default function DeliveryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <nav className="text-xs text-white/50 mb-6 flex items-center gap-1.5">
          <Link href="/" className="hover:text-white">Bosh sahifa</Link> / <span className="text-white font-medium">Yetkazib berish</span>
        </nav>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">
          Yetkazib berish shartlari
        </h1>
        <p className="text-sm sm:text-base text-white/60 mb-10 leading-relaxed">
          SARTO buyurtmalari butun O‘zbekiston Respublikasi bo‘ylab tez va ishonchli kuryerlik xizmatlari orqali yetkazib beriladi.
        </p>

        <div className="space-y-8">
          {/* Tariffs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-[#141414] border border-white/10 rounded-3xl space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-white" />
                <h2 className="text-lg font-bold text-white">Toshkent shahri</h2>
              </div>
              <p className="text-2xl font-bold text-white">30 000 so‘m</p>
              <p className="text-xs text-white/50">Muddati: 24 soat ichida (buyurtma tasdiqlangandan so‘ng)</p>
              <div className="pt-2 text-xs font-semibold text-emerald-400">
                800 000 so‘mdan yuqoriga — BEPUL
              </div>
            </div>

            <div className="p-6 bg-[#141414] border border-white/10 rounded-3xl space-y-3">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-white" />
                <h2 className="text-lg font-bold text-white">Viloyatlar va Qoraqalpog‘iston</h2>
              </div>
              <p className="text-2xl font-bold text-white">50 000 so‘m</p>
              <p className="text-xs text-white/50">Muddati: 2 — 3 ish kuni ichida</p>
              <div className="pt-2 text-xs font-semibold text-emerald-400">
                800 000 so‘mdan yuqoriga — BEPUL
              </div>
            </div>
          </div>

          {/* Key Advantages */}
          <div className="p-8 bg-[#141414] border border-white/10 rounded-3xl space-y-6">
            <h2 className="text-xl font-bold text-white">Xaridor uchun afzalliklar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-white">Oldindan qo‘ng‘iroq</h3>
                  <p className="text-xs text-white/50 mt-1">Kuryer manzilga chiqishidan kamida 1 soat oldin siz bilan bog‘lanadi.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-white">Kiyib ko‘rish imkoniyati</h3>
                  <p className="text-xs text-white/50 mt-1">Tovarni kuryer oldida bemalol kiyib ko‘rishingiz mumkin (15 daqiqagacha).</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
