import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, PackageCheck, PhoneCall, ArrowRight } from "lucide-react";

interface SuccessPageProps {
  params: Promise<{
    orderNumber: string;
  }>;
}

export default async function OrderSuccessPage({ params }: SuccessPageProps) {
  const { orderNumber } = await params;

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white">
      <Header />

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 py-12 sm:py-20 text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 stroke-[1.75]" />
        </div>

        <span className="text-xs uppercase tracking-[0.25em] text-white/50 font-semibold block mb-2">
          Buyurtmangiz qabul qilindi
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 tracking-tight">
          Xaridingiz uchun tashakkur!
        </h1>
        <p className="text-sm sm:text-base text-white/60 max-w-md mx-auto mb-8 leading-relaxed">
          Sizning buyurtmangiz muvaffaqiyatli qabul qilindi. Tez orada operatorimiz siz bilan bog‘lanib,
          yetkazib berish vaqtini tasdiqlaydi.
        </p>

        {/* Order Details Card */}
        <div className="bg-[#141414] border border-white/10 rounded-3xl p-6 sm:p-7 max-w-md mx-auto mb-10 text-left space-y-3.5 shadow-xl">
          <div className="flex justify-between items-center text-sm">
            <span className="text-white/50">Buyurtma raqami:</span>
            <span className="font-mono font-bold text-base text-white">{orderNumber}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-white/50">To‘lov usuli:</span>
            <span className="text-white font-medium">Yetkazib berilganda (COD)</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-white/50">Yetkazish muddati:</span>
            <span className="text-white font-medium">1 — 3 ish kuni</span>
          </div>
        </div>

        {/* Next Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto mb-10 text-left text-sm">
          <div className="p-4 border border-white/10 rounded-2xl bg-[#141414] flex items-start gap-3">
            <PhoneCall className="w-5 h-5 text-white shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white">Qo‘ng‘iroqni kuting</p>
              <p className="text-xs text-white/50 mt-1 leading-normal">
                Kuryer manzilga chiqishidan oldin siz bilan bog‘lanadi.
              </p>
            </div>
          </div>
          <div className="p-4 border border-white/10 rounded-2xl bg-[#141414] flex items-start gap-3">
            <PackageCheck className="w-5 h-5 text-white shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white">Tekshirib oling</p>
              <p className="text-xs text-white/50 mt-1 leading-normal">
                Tovarni kuryer oldida bemalol kiyib ko‘rishingiz mumkin.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/shop" className="w-full sm:w-auto">
            <Button size="lg" className="w-full">
              Kolleksiyaga qaytish <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full">
              Bosh sahifaga o‘tish
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
