import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export default function FAQPage() {
  const faqs = [
    {
      q: "Qanday qilib buyurtma berish mumkin?",
      a: "Katalogdan o‘zingizga ma’qul kelgan libosni tanlang, o‘lchamini belgilab savatchaga qo‘shing va checkout sahifasida yetkazib berish manzilingizni kiriting.",
    },
    {
      q: "Yetkazib berish qancha vaqt oladi?",
      a: "Toshkent shahri ichida 24 soat ichida, viloyatlarga esa 1–3 ish kuni ichida yetkaziladi.",
    },
    {
      q: "To‘lov qanday amalga oshiriladi?",
      a: "Buyurtma yetkazib berilganda naqd pul yoki Uzcard/Humo bank kartalari orqali to‘lashingiz mumkin.",
    },
    {
      q: "O‘lcham to‘g‘ri kelmasa nima qilish kerak?",
      a: "Tovarni 14 kun ichida boshqa o‘lchamga bepul almashtirishingiz yoki qaytarishingiz mumkin.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <nav className="text-xs text-sarto-muted uppercase tracking-wider mb-6">
          <Link href="/" className="hover:text-sarto-black">Bosh sahifa</Link> / <span>FAQ</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-5xl text-sarto-black mb-8">
          Ko‘p beriladigan savollar
        </h1>

        <div className="divide-y divide-sarto-border border-y border-sarto-border">
          {faqs.map((f, i) => (
            <div key={i} className="py-6 space-y-2">
              <h3 className="font-serif text-lg text-sarto-black">{f.q}</h3>
              <p className="text-xs text-sarto-muted leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
