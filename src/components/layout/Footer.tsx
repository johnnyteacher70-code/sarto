import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-sarto-black text-white pt-16 pb-12 border-t border-sarto-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-sarto-charcoal">
          {/* Brand Col */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl tracking-[0.2em] uppercase">SARTO</h3>
            <p className="text-xs text-sarto-muted leading-relaxed max-w-xs">
              O‘zbekiston erkaklari uchun sifatli, zamonaviy va bejirim kiyimlar to‘plami. Klassik
              uslub va zamonaviy qulaylik uyg‘unligi.
            </p>
          </div>

          {/* Kolleksiyalar */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-sarto-taupe">
              Kolleksiyalar
            </h4>
            <ul className="space-y-2 text-xs text-sarto-ivory/80">
              <li>
                <Link href="/category/koylaklar" className="hover:text-white transition-colors">
                  Ko‘ylaklar
                </Link>
              </li>
              <li>
                <Link href="/category/kostyum-va-shimlar" className="hover:text-white transition-colors">
                  Kostyum va shimlar
                </Link>
              </li>
              <li>
                <Link href="/category/ustki-kiyimlar" className="hover:text-white transition-colors">
                  Ustki kiyimlar
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  Barcha mahsulotlar
                </Link>
              </li>
            </ul>
          </div>

          {/* Mijozlarga yordam */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-sarto-taupe">
              Mijozlarga xizmat
            </h4>
            <ul className="space-y-2 text-xs text-sarto-ivory/80">
              <li>
                <Link href="/delivery" className="hover:text-white transition-colors">
                  Yetkazib berish shartlari
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition-colors">
                  Qaytarish va almashtirish
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Ko‘p beriladigan savollar
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Bog‘lanish
                </Link>
              </li>
            </ul>
          </div>

          {/* Aloqa */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-sarto-taupe">
              Do‘kon
            </h4>
            <div className="text-xs text-sarto-ivory/80 space-y-1.5">
              <p>Toshkent shahri, Amir Temur ko‘chasi, 12</p>
              <p>Telefon: +998 (71) 200-00-00</p>
              <p>Email: info@sarto.uz</p>
              <p className="pt-2 text-[11px] text-sarto-muted">Har kuni: 10:00 — 22:00</p>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-sarto-muted gap-4">
          <p>© 2026 SARTO. Barcha huquqlar himoyalangan.</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Maxfiylik siyosati
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Foydalanish shartlari
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
