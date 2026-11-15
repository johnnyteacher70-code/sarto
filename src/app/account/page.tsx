import Link from "next/link";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Package, User, MapPin, ArrowRight, ShieldCheck } from "lucide-react";

export default function AccountPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
        {/* Breadcrumb */}
        <div className="border-b border-sarto-border pb-6 mb-8">
          <nav aria-label="Non ushoqlari (Breadcrumbs)" className="text-xs text-sarto-muted mb-2 flex items-center gap-1.5">
            <Link href="/" className="hover:text-sarto-black">Bosh sahifa</Link>
            <span aria-hidden="true">/</span>
            <span className="text-sarto-black font-semibold">Mening hisobim</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-4xl text-sarto-black">
            Mening hisobim
          </h1>
          <p className="text-sm text-sarto-muted mt-1">
            Buyurtmalar tarixi, manzillar va shaxsiy ma’lumotlaringiz
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1: Orders */}
          <div className="p-6 sm:p-7 bg-white border border-sarto-border space-y-4 hover:border-sarto-black transition-colors flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-sarto-ivory flex items-center justify-center text-sarto-black">
                <Package className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h2 className="font-serif text-xl text-sarto-black">Buyurtmalar tarixi</h2>
              <p className="text-xs sm:text-sm text-sarto-muted leading-relaxed">
                Berilgan barcha buyurtmalar ro‘yxati, to‘lov holati va joriy yetkazib berish bosqichlari.
              </p>
            </div>
            <div className="pt-2">
              <Link href="/login" className="block">
                <Button variant="outline" size="sm" className="w-full">
                  Buyurtmalarni ko‘rish <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Card 2: Addresses */}
          <div className="p-6 sm:p-7 bg-white border border-sarto-border space-y-4 hover:border-sarto-black transition-colors flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-sarto-ivory flex items-center justify-center text-sarto-black">
                <MapPin className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h2 className="font-serif text-xl text-sarto-black">Yetkazish manzillari</h2>
              <p className="text-xs sm:text-sm text-sarto-muted leading-relaxed">
                Tezkor buyurtma berish uchun saqlangan uy yoki ishxona manzillarini boshqarish.
              </p>
            </div>
            <div className="pt-2">
              <Link href="/login" className="block">
                <Button variant="outline" size="sm" className="w-full">
                  Manzillarni boshqarish <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Card 3: Profile */}
          <div className="p-6 sm:p-7 bg-white border border-sarto-border space-y-4 hover:border-sarto-black transition-colors flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-sarto-ivory flex items-center justify-center text-sarto-black">
                <User className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h2 className="font-serif text-xl text-sarto-black">Profil ma’lumotlari</h2>
              <p className="text-xs sm:text-sm text-sarto-muted leading-relaxed">
                Ism-familiya, telefon raqami, elektron pochta va akkaunt xavfsizligi.
              </p>
            </div>
            <div className="pt-2">
              <Link href="/login" className="block">
                <Button variant="outline" size="sm" className="w-full">
                  Profilni tahrirlash <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Security & Support Note */}
        <div className="mt-12 p-6 bg-sarto-ivory/50 border border-sarto-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-sarto-black shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-sarto-black">Shaxsiy ma’lumotlar xavfsizligi</h3>
              <p className="text-xs text-sarto-muted">Sizning ma’lumotlaringiz shifrlangan holatda saqlanadi va uchinchi shaxslarga berilmaydi.</p>
            </div>
          </div>
          <Link href="/contact" className="text-xs font-semibold uppercase tracking-wider text-sarto-black hover:text-sarto-taupe shrink-0">
            Mijozlarni qo‘llab-quvvatlash →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
