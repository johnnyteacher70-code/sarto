import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <nav className="text-xs text-white/50 mb-6 flex items-center gap-1.5">
          <Link href="/" className="hover:text-white">Bosh sahifa</Link> / <span className="text-white font-medium">Maxfiylik siyosati</span>
        </nav>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">
          Maxfiylik siyosati
        </h1>

        <div className="text-white/70 space-y-5 text-xs sm:text-sm leading-relaxed p-8 bg-[#141414] border border-white/10 rounded-3xl">
          <p>
            Ushbu Maxfiylik siyosati SARTO internet-do‘koni tomonidan foydalanuvchilarning shaxsiy
            ma’lumotlarini yig‘ish, qayta ishlash va himoya qilish tartibini belgilaydi.
          </p>

          <h2 className="text-base font-bold text-white pt-2">Yig‘iladigan ma’lumotlar:</h2>
          <ul className="list-disc pl-5 space-y-1 text-white/60">
            <li>Ism, familiya va telefon raqami;</li>
            <li>Yetkazib berish manzili;</li>
            <li>Buyurtmalar tarixi va afzalliklar.</li>
          </ul>

          <h2 className="text-base font-bold text-white pt-2">Ma’lumotlardan foydalanish maqsadi:</h2>
          <p className="text-white/60">
            Sizning ma’lumotlaringiz faqat buyurtmalarni yetkazib berish, mijozlarga xizmat ko‘rsatish
            va xarid jarayonini yaxshilash maqsadida ishlatiladi. Biz ma’lumotlaringizni uchinchi
            shaxslarga sotmaymiz.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
