import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <nav className="text-xs text-sarto-muted uppercase tracking-wider mb-6">
          <Link href="/" className="hover:text-sarto-black">Bosh sahifa</Link> / <span>Maxfiylik siyosati</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-5xl text-sarto-black mb-8">
          Maxfiylik siyosati
        </h1>

        <div className="space-y-6 text-sm text-sarto-black/80 leading-relaxed">
          <p>
            Ushbu Maxfiylik siyosati SARTO internet-do‘koni tomonidan foydalanuvchilarning shaxsiy
            ma’lumotlarini yig‘ish, qayta ishlash va himoya qilish tartibini belgilaydi.
          </p>

          <h2 className="font-serif text-2xl text-sarto-black pt-4">Yig‘iladigan ma’lumotlar:</h2>
          <ul className="list-disc pl-5 space-y-1 text-xs text-sarto-muted">
            <li>Ism, familiya va telefon raqami;</li>
            <li>Yetkazib berish manzili;</li>
            <li>Buyurtmalar tarixi va afzalliklar.</li>
          </ul>

          <h2 className="font-serif text-2xl text-sarto-black pt-4">Ma’lumotlardan foydalanish maqsadi:</h2>
          <p className="text-xs text-sarto-muted">
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
