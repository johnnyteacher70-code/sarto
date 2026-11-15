"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-sarto-black text-white pt-16 sm:pt-20 pb-12 border-t border-sarto-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="pb-12 mb-12 border-b border-sarto-charcoal">
          <div className="max-w-2xl space-y-3">
            <h3 className="font-serif text-2xl text-white">
              Yangi kolleksiyalardan birinchi bo‘lib xabardor bo‘ling
            </h3>
            <p className="text-xs sm:text-sm text-sarto-ivory/70 leading-relaxed">
              Maxsus takliflar, yangi kelgan liboslar va mavsumiy chegirmalar haqida elektron pochtangizga xabar yuboramiz.
            </p>

            {subscribed ? (
              <p className="text-sm text-emerald-400 flex items-center gap-2 pt-2">
                <CheckCircle2 className="w-4 h-4" /> Rahmat! Xabarnomamizga muvaffaqiyatli obuna bo‘ldingiz.
              </p>
            ) : (
              <form onSubmit={handleNewsletter} className="pt-2 flex flex-col sm:flex-row gap-2 max-w-md">
                <input
                  type="email"
                  required
                  placeholder="Elektron pochtangizni kiriting"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="min-h-[46px] flex-1 bg-white/10 border border-sarto-charcoal px-3.5 text-sm text-white placeholder:text-sarto-ivory/50 focus-visible:outline-none focus-visible:border-white focus-visible:ring-1 focus-visible:ring-white rounded-none"
                  aria-label="Xabarnomaga obuna bo‘lish uchun elektron pochta"
                />
                <button
                  type="submit"
                  className="min-h-[46px] px-6 bg-white text-sarto-black hover:bg-sarto-ivory text-xs sm:text-sm font-semibold tracking-wide transition-colors cursor-pointer shrink-0"
                >
                  Obuna bo‘lish <ArrowRight className="w-3.5 h-3.5 inline ml-1" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 pb-12 border-b border-sarto-charcoal">
          {/* Brand Col */}
          <div className="space-y-4">
            <h4 className="font-serif text-2xl tracking-[0.2em] uppercase">SARTO</h4>
            <p className="text-xs sm:text-sm text-sarto-ivory/70 leading-relaxed max-w-xs">
              O‘zbekiston erkaklari uchun sifatli, zamonaviy va bejirim kiyimlar to‘plami. Klassik
              uslub va zamonaviy qulaylik uyg‘unligi.
            </p>
          </div>

          {/* Kolleksiyalar */}
          <div className="space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-sarto-taupe">
              Kolleksiyalar
            </h5>
            <ul className="space-y-2.5 text-xs sm:text-sm text-sarto-ivory/80">
              <li>
                <Link href="/category/koylaklar" className="hover:text-white transition-colors py-1 inline-block">
                  Ko‘ylaklar
                </Link>
              </li>
              <li>
                <Link href="/category/kostyum-va-shimlar" className="hover:text-white transition-colors py-1 inline-block">
                  Kostyum va shimlar
                </Link>
              </li>
              <li>
                <Link href="/category/ustki-kiyimlar" className="hover:text-white transition-colors py-1 inline-block">
                  Ustki kiyimlar
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition-colors py-1 inline-block">
                  Barcha mahsulotlar
                </Link>
              </li>
            </ul>
          </div>

          {/* Mijozlarga xizmat */}
          <div className="space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-sarto-taupe">
              Mijozlarga xizmat
            </h5>
            <ul className="space-y-2.5 text-xs sm:text-sm text-sarto-ivory/80">
              <li>
                <Link href="/delivery" className="hover:text-white transition-colors py-1 inline-block">
                  Yetkazib berish shartlari
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition-colors py-1 inline-block">
                  Qaytarish va almashtirish
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors py-1 inline-block">
                  Ko‘p beriladigan savollar
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors py-1 inline-block">
                  Biz bilan bog‘lanish
                </Link>
              </li>
            </ul>
          </div>

          {/* Do'kon kontaktlari */}
          <div className="space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-sarto-taupe">
              Aloqa va Manzil
            </h5>
            <div className="text-xs sm:text-sm text-sarto-ivory/80 space-y-2 leading-relaxed">
              <p>Toshkent shahri, Amir Temur ko‘chasi, 12-uy</p>
              <p className="font-semibold text-white">Telefon: +998 (71) 200-00-00</p>
              <p>Email: info@sarto.uz</p>
              <p className="pt-1 text-xs text-sarto-ivory/60">Dushanba — Yakshanba: 10:00 — 22:00</p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-sarto-ivory/60 gap-4">
          <p>© 2026 SARTO. Barcha huquqlar himoyalangan.</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-white transition-colors py-1">
              Maxfiylik siyosati
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors py-1">
              Foydalanish shartlari
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
