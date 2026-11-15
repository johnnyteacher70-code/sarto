import Link from "next/link";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Package, User, MapPin } from "lucide-react";

export default function AccountPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="border-b border-sarto-border pb-6 mb-8">
          <nav className="text-xs text-sarto-muted uppercase tracking-wider mb-2">
            <Link href="/" className="hover:text-sarto-black">Bosh sahifa</Link> / <span>Shaxsiy kabinet</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-4xl text-sarto-black">Mening hisobim</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white border border-sarto-border space-y-4">
            <div className="w-10 h-10 bg-sarto-ivory flex items-center justify-center text-sarto-black">
              <Package className="w-5 h-5 stroke-1" />
            </div>
            <h2 className="font-serif text-lg text-sarto-black">Buyurtmalar tarixi</h2>
            <p className="text-xs text-sarto-muted">
              Siz bergan barcha buyurtmalar va ularning joriy yetkazib berish holati.
            </p>
            <div className="pt-2">
              <Link href="/login">
                <Button variant="outline" size="sm">Buyurtmalarni ko‘rish</Button>
              </Link>
            </div>
          </div>

          <div className="p-6 bg-white border border-sarto-border space-y-4">
            <div className="w-10 h-10 bg-sarto-ivory flex items-center justify-center text-sarto-black">
              <MapPin className="w-5 h-5 stroke-1" />
            </div>
            <h2 className="font-serif text-lg text-sarto-black">Yetkazish manzillari</h2>
            <p className="text-xs text-sarto-muted">
              Tezkor xarid qilish uchun saqlangan uyingiz va ish manzillaringiz.
            </p>
            <div className="pt-2">
              <Link href="/login">
                <Button variant="outline" size="sm">Manzillarni boshqarish</Button>
              </Link>
            </div>
          </div>

          <div className="p-6 bg-white border border-sarto-border space-y-4">
            <div className="w-10 h-10 bg-sarto-ivory flex items-center justify-center text-sarto-black">
              <User className="w-5 h-5 stroke-1" />
            </div>
            <h2 className="font-serif text-lg text-sarto-black">Profil ma’lumotlari</h2>
            <p className="text-xs text-sarto-muted">
              Ism-familiya, telefon raqami va xavfsizlik sozlamalari.
            </p>
            <div className="pt-2">
              <Link href="/login">
                <Button variant="outline" size="sm">Profilni tahrirlash</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
