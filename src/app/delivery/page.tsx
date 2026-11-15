import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export default function DeliveryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <nav className="text-xs text-sarto-muted uppercase tracking-wider mb-6">
          <Link href="/" className="hover:text-sarto-black">Bosh sahifa</Link> / <span>Yetkazib berish</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-5xl text-sarto-black mb-8">
          Yetkazib berish shartlari
        </h1>

        <div className="space-y-8 text-sm text-sarto-black/80 leading-relaxed">
          <div className="p-6 bg-sarto-ivory border border-sarto-border">
            <h2 className="font-serif text-xl text-sarto-black mb-2">Bepul yetkazib berish</h2>
            <p className="text-xs text-sarto-muted">
              800 000 so‘mdan yuqori bo‘lgan barcha buyurtmalar butun O‘zbekiston bo‘ylab bepul
              yetkazib beriladi!
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-xl text-sarto-black">Toshkent shahri bo‘ylab</h3>
            <p>
              Toshkent shahri bo‘ylab buyurtmalar 24 soat ichida (ko‘pincha buyurtma qilingan kunning
              o‘zida) kuryerlik xizmati orqali to‘g‘ridan-to‘g‘ri eshikkacha yetkaziladi.
            </p>
            <p className="text-xs text-sarto-muted">
              Yetkazish narxi: 30 000 so‘m (800 000 so‘mdan yuqori xaridlarda bepul).
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-sarto-border">
            <h3 className="font-serif text-xl text-sarto-black">O‘zbekiston viloyatlari bo‘ylab</h3>
            <p>
              Viloyat markazlari va tumanlarga buyurtmalar ishonchli kuryerlik xizmatlari orqali
              1–3 ish kuni ichida topshiriladi.
            </p>
            <p className="text-xs text-sarto-muted">
              Yetkazish narxi: 50 000 so‘m (800 000 so‘mdan yuqori xaridlarda bepul).
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-sarto-border">
            <h3 className="font-serif text-xl text-sarto-black">Tovarni kiyib ko‘rish imkoniyati</h3>
            <p>
              Kuryer buyurtmani topshirayotganda, tovarlarni 15 daqiqa davomida ko‘rib chiqishingiz va
              kiyib ko‘rishingiz mumkin. Agar o‘lcham to‘g‘ri kelmasa, tovarni darhol kuryerga
              qaytarishingiz mumkin.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
