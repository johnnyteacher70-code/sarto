import Link from "next/link";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, PackageCheck, PhoneCall } from "lucide-react";

interface SuccessPageProps {
  params: Promise<{
    orderNumber: string;
  }>;
}

export default async function OrderSuccessPage({ params }: SuccessPageProps) {
  const { orderNumber } = await params;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-16 sm:py-24 text-center">
        <div className="w-16 h-16 mx-auto bg-green-50 text-green-700 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <span className="text-xs uppercase tracking-[0.25em] text-sarto-taupe font-semibold block mb-2">
          Buyurtma qabul qilindi
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-sarto-black mb-4">
          Xaridingiz uchun tashakkur!
        </h1>
        <p className="text-sm text-sarto-muted max-w-md mx-auto mb-8 leading-relaxed">
          Sizning buyurtmangiz muvaffaqiyatli qabul qilindi. Operatorimiz tez orada siz bilan bog‘lanib,
          buyurtma tafsilotlarini tasdiqlaydi.
        </p>

        {/* Order Number Card */}
        <div className="bg-sarto-ivory/60 border border-sarto-border p-6 max-w-md mx-auto mb-10 text-left space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-sarto-muted uppercase tracking-wider">Buyurtma raqami:</span>
            <span className="font-mono font-bold text-sm text-sarto-black">{orderNumber}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-sarto-muted uppercase tracking-wider">To‘lov holati:</span>
            <span className="text-sarto-black font-medium">Yetkazib berilganda to‘lov (COD)</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-sarto-muted uppercase tracking-wider">Yetkazish muddati:</span>
            <span className="text-sarto-black font-medium">1 — 3 ish kuni</span>
          </div>
        </div>

        {/* Next Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto mb-10 text-left text-xs">
          <div className="p-4 border border-sarto-border bg-white flex items-start gap-3">
            <PhoneCall className="w-4 h-4 text-sarto-black shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sarto-black">Qo‘ng‘iroqni kuting</p>
              <p className="text-sarto-muted text-[11px] mt-0.5">
                Kuryer yo‘lga chiqishidan oldin siz bilan bog‘lanadi.
              </p>
            </div>
          </div>
          <div className="p-4 border border-sarto-border bg-white flex items-start gap-3">
            <PackageCheck className="w-4 h-4 text-sarto-black shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sarto-black">Tekshirib oling</p>
              <p className="text-sarto-muted text-[11px] mt-0.5">
                Mahsulotni kuryer oldida ko‘rib, kiyib ko‘rishingiz mumkin.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/shop">
            <Button size="lg" className="w-full sm:w-auto">
              Xaridni davom ettirish
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Bosh sahifa
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
