import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <nav className="text-xs text-sarto-muted uppercase tracking-wider mb-6">
          <Link href="/" className="hover:text-sarto-black">Bosh sahifa</Link> / <span>Bog‘lanish</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-5xl text-sarto-black mb-8">
          Biz bilan bog‘lanish
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <p className="text-sm text-sarto-muted leading-relaxed">
              Savollaringiz, takliflaringiz yoki buyurtmangiz bo‘yicha har qanday ma’lumot olish uchun
              biz bilan bog‘laning.
            </p>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-sarto-black shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sarto-black">Manzilimiz</p>
                  <p className="text-sarto-muted mt-0.5">Toshkent shahri, Amir Temur ko‘chasi, 12-uy</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-sarto-black shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sarto-black">Telefon raqamimiz</p>
                  <p className="text-sarto-muted mt-0.5">+998 (71) 200-00-00</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-sarto-black shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sarto-black">Elektron pochta</p>
                  <p className="text-sarto-muted mt-0.5">info@sarto.uz</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-sarto-black shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sarto-black">Ish vaqti</p>
                  <p className="text-sarto-muted mt-0.5">Dushanba — Yakshanba: 10:00 dan 22:00 gacha</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-sarto-ivory/50 border border-sarto-border p-6 space-y-4">
            <h3 className="font-serif text-lg text-sarto-black">Xabar qoldiring</h3>
            <p className="text-xs text-sarto-muted">
              Operatorimiz tez orada siz bilan bog‘lanadi.
            </p>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Ismingiz"
                className="w-full h-10 border border-sarto-border bg-white px-3 text-xs"
              />
              <input
                type="text"
                placeholder="Telefon raqamingiz"
                className="w-full h-10 border border-sarto-border bg-white px-3 text-xs"
              />
              <textarea
                rows={3}
                placeholder="Xabaringiz..."
                className="w-full border border-sarto-border bg-white p-3 text-xs"
              />
              <button
                type="button"
                className="w-full h-11 bg-sarto-black text-white text-xs font-semibold uppercase tracking-wider"
              >
                Yuborish
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
