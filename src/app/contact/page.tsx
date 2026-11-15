import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { Phone, Mail, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <nav className="text-xs text-white/50 mb-6 flex items-center gap-1.5">
          <Link href="/" className="hover:text-white">Bosh sahifa</Link> / <span className="text-white font-medium">Aloqa</span>
        </nav>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Biz bilan bog‘lanish
        </h1>
        <p className="text-sm sm:text-base text-white/60 mb-12 max-w-xl">
          Savollaringiz, takliflaringiz yoki buyurtmangiz bo‘yicha qo‘llab-quvvatlash kerak bo‘lsa, biz doim xizmatingizdamiz.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Details */}
          <div className="space-y-6">
            <div className="p-6 bg-[#141414] border border-white/10 rounded-3xl space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 mt-1">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Telefon raqamimiz</h3>
                  <p className="text-base font-bold text-white mt-1">+998 (71) 200-00-00</p>
                  <p className="text-xs text-white/50 mt-1">Har kuni 09:00 dan 21:00 gacha</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#141414] border border-white/10 rounded-3xl space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 mt-1">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Elektron pochta</h3>
                  <p className="text-base font-bold text-white mt-1">support@sarto.uz</p>
                  <p className="text-xs text-white/50 mt-1">24 soat ichida javob beramiz</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#141414] border border-white/10 rounded-3xl space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Bosh do‘konimiz manzili</h3>
                  <p className="text-sm font-bold text-white mt-1">Toshkent shahri, Amir Temur shoh ko‘chasi, 12-uy</p>
                  <p className="text-xs text-white/50 mt-1">Mo‘ljal: Alisher Navoiy haykali yonida</p>
                </div>
              </div>
            </div>
          </div>

          {/* Direct Telegram / Fast Message */}
          <div className="p-8 bg-[#141414] border border-white/10 rounded-3xl flex flex-col justify-between shadow-2xl">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
                <Send className="w-6 h-6 -translate-x-0.5" />
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Telegram orqali tezkor aloqa</h2>
              <p className="text-sm text-white/60 leading-relaxed">
                Savollaringiz bormi? Telegram qo‘llab-quvvatlash botimiz orqali operatorlarimiz bilan to‘g‘ridan-to‘g‘ri va tezkor suhbatlashing.
              </p>
            </div>

            <div className="pt-8">
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center py-3.5 px-6 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all shadow-md"
              >
                Telegramda yozish
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
