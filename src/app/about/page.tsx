import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <nav className="text-xs text-white/50 mb-6 flex items-center gap-1.5">
          <Link href="/" className="hover:text-white">Bosh sahifa</Link> / <span className="text-white font-medium">Brend haqida</span>
        </nav>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-8 tracking-tight leading-tight">
          SARTO — Klassik an’ana va zamonaviy erkak didi
        </h1>

        <div className="text-white/80 space-y-6 text-sm sm:text-base leading-relaxed">
          <p>
            SARTO — Italiyaning qadimiy tikuvchilik madaniyati (sartoria) va zamonaviy erkaklar
            turmush tarzining mukammal uyg‘unligidir. Bizning maqsadimiz — O‘zbekiston erkaklariga
            har kuni va har qanday vaziyatda o‘zlariga bo‘lgan ishonchni taqdim etuvchi yuqori sifatli
            liboslarni taqdim qilish.
          </p>

          <h2 className="text-2xl font-bold text-white pt-6 tracking-tight">Bizning falsafamiz</h2>
          <p>
            Biz tezkor va sifatsiz modaga (fast fashion) ishonmaymiz. Har bir SARTO mahsuloti uzoq
            yillar xizmat qilishi, shaklini yo‘qotmasligi va vaqt o‘tishi bilan o‘z jozibasini
            saqlab qolishi uchun eng sara tabiiy xomashyolardan tayyorlanadi.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-10">
            <div className="p-6 bg-[#141414] border border-white/10 rounded-2xl">
              <span className="text-2xl font-bold text-white block mb-2">100%</span>
              <p className="text-xs text-white/50 uppercase tracking-wider">Tabiiy matolar</p>
            </div>
            <div className="p-6 bg-[#141414] border border-white/10 rounded-2xl">
              <span className="text-2xl font-bold text-white block mb-2">14 kun</span>
              <p className="text-xs text-white/50 uppercase tracking-wider">O‘lcham almashtirish</p>
            </div>
            <div className="p-6 bg-[#141414] border border-white/10 rounded-2xl">
              <span className="text-2xl font-bold text-white block mb-2">24 soat</span>
              <p className="text-xs text-white/50 uppercase tracking-wider">Toshkentda yetkazish</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white pt-6 tracking-tight">Mijozlarimiz uchun kafolat</h2>
          <p>
            Biz har bir mijozimizning vaqtini va qulayligini qadrlaymiz. Shuning uchun buyurtma
            berilgan har bir tovar xonadoningizga yetib borganda, uni kuryer oldida bemalol kiyib
            ko‘rishingiz va faqat sizga mos kelgandagina to‘lovni amalga oshirishingiz mumkin.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
