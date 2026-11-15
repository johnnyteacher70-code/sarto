import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export default function FAQPage() {
  const faqs = [
    {
      q: "Buyurtma uchun qanday to‘lov qilishim mumkin?",
      a: "Bizda to‘lov tovar sizga yetkazib berilganda amalga oshiriladi (COD). Siz naqd pul yoki Uzcard/Humo kartasi orqali to‘lashingiz mumkin.",
    },
    {
      q: "O‘lcham to‘g‘ri kelmasa nima qilish kerak?",
      a: "Siz tovarni kuryer oldida bemalol kiyib ko‘rishingiz mumkin. Agar o‘lcham mos kelmasa, joyida rad etishingiz yoki 14 kun ichida boshqa o‘lchamga almashtirishni so‘rashingiz mumkin.",
    },
    {
      q: "Yetkazib berish qancha vaqt oladi?",
      a: "Toshkent shahri bo‘ylab 24 soat ichida, viloyatlar bo‘ylab esa 2-3 ish kunida yetkaziladi.",
    },
    {
      q: "Bepul yetkazib berish sharti qanday?",
      a: "800 000 so‘m yoki undan yuqori miqdordagi barcha buyurtmalar butun O‘zbekiston bo‘ylab bepul yetkazib beriladi.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <nav className="text-xs text-white/50 mb-6 flex items-center gap-1.5">
          <Link href="/" className="hover:text-white">Bosh sahifa</Link> / <span className="text-white font-medium">Ko‘p beriladigan savollar</span>
        </nav>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">
          Ko‘p beriladigan savollar
        </h1>
        <p className="text-sm sm:text-base text-white/60 mb-10">
          SARTO xizmatlari, buyurtma, to‘lov va yetkazib berish bo‘yicha eng mashhur savollarga javoblar.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-6 bg-[#141414] border border-white/10 rounded-3xl space-y-2">
              <h2 className="text-base font-bold text-white">{faq.q}</h2>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
