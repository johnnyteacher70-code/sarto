import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <nav className="text-xs text-sarto-muted uppercase tracking-wider mb-6">
          <Link href="/" className="hover:text-sarto-black">Bosh sahifa</Link> / <span>Brend haqida</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-5xl text-sarto-black mb-8 leading-tight">
          SARTO — Klassik an’ana va zamonaviy erkak didi
        </h1>

        <div className="prose prose-sm max-w-none text-sarto-black/80 space-y-6 text-sm leading-relaxed">
          <p>
            SARTO — Italiyaning qadimiy tikuvchilik madaniyati (sartoria) va zamonaviy erkaklar
            turmush tarzining mukammal uyg‘unligidir. Bizning maqsadimiz — O‘zbekiston erkaklariga
            har kuni va har qanday vaziyatda o‘zlariga bo‘lgan ishonchni taqdim etuvchi yuqori sifatli
            liboslarni taqdim qilish.
          </p>

          <h2 className="font-serif text-2xl text-sarto-black pt-6">Bizning falsafamiz</h2>
          <p>
            Biz tezkor va sifatsiz modaga (fast fashion) ishonmaymiz. Har bir SARTO mahsuloti uzoq
            yillar xizmat qilishi, shaklini yo‘qotmasligi va vaqt o‘tishi bilan o‘z jozibasini
            saqlab qolishi uchun eng sara tabiiy xomashyolardan tayyorlanadi.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-10 not-prose">
            <div className="p-6 bg-sarto-ivory border border-sarto-border">
              <span className="font-serif text-2xl text-sarto-black block mb-2">100%</span>
              <p className="text-xs text-sarto-muted uppercase tracking-wider">Tabiiy matolar</p>
            </div>
            <div className="p-6 bg-sarto-ivory border border-sarto-border">
              <span className="font-serif text-2xl text-sarto-black block mb-2">14 kun</span>
              <p className="text-xs text-sarto-muted uppercase tracking-wider">O‘lcham almashtirish</p>
            </div>
            <div className="p-6 bg-sarto-ivory border border-sarto-border">
              <span className="font-serif text-2xl text-sarto-black block mb-2">24 soat</span>
              <p className="text-xs text-sarto-muted uppercase tracking-wider">Toshkentda yetkazish</p>
            </div>
          </div>

          <h2 className="font-serif text-2xl text-sarto-black pt-4">Sifat va Tikuv</h2>
          <p>
            Har bir kostyum, ko‘ylak va palto qirqimi erkak qomatiga mukammal o‘tiradigan qilib
            loyihalashtirilgan. Misr paxtasi, Super 130s Merino juni va kashmir aralashmalari tanaga
            engil va qulay teginish beradi.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
