"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CheckCircle2, Send } from "lucide-react";

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

  const navLinks = [
    { name: "Bosh sahifa", href: "/" },
    { name: "Do‘kon", href: "/shop" },
    { name: "Kolleksiyalar", href: "/shop" },
    { name: "Biz haqimizda", href: "/about" },
    { name: "Aloqa", href: "/contact" },
  ];

  return (
    <footer className="bg-[#080808] text-white pt-16 sm:pt-20 pb-10 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid: Brand, Newsletter, Socials */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-12 border-b border-white/[0.08]">
          {/* Brand Info */}
          <div className="space-y-1.5">
            <h4 className="text-2xl sm:text-3xl font-extrabold tracking-[0.18em] uppercase text-white">
              SARTO
            </h4>
            <p className="text-xs sm:text-sm text-white/50">
              Premium erkaklar kiyimi brendi
            </p>
          </div>

          {/* Newsletter Pill Form */}
          <div className="w-full lg:max-w-md space-y-2.5">
            <h5 className="text-sm font-semibold text-white/90">
              Yangiliklardan xabardor bo‘ling
            </h5>

            {subscribed ? (
              <p className="text-xs text-emerald-400 flex items-center gap-1.5 py-2">
                <CheckCircle2 className="w-4 h-4" /> Rahmat! Xabarnomamizga obuna bo‘ldingiz.
              </p>
            ) : (
              <form onSubmit={handleNewsletter} className="relative flex items-center">
                <input
                  type="email"
                  required
                  placeholder="Email manzilingizni kiriting"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full min-h-[46px] bg-[#141414] border border-white/15 rounded-full pl-5 pr-14 text-xs sm:text-sm text-white placeholder:text-white/40 focus-visible:outline-none focus-visible:border-white focus-visible:ring-1 focus-visible:ring-white transition-all"
                  aria-label="Xabarnomaga obuna bo‘lish uchun elektron pochta"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white text-black hover:bg-white/90 flex items-center justify-center transition-all cursor-pointer shadow-sm"
                  aria-label="Obuna bo‘lish"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Social Icons (Telegram, Instagram, YouTube, TikTok) */}
          <div className="flex items-center space-x-3 text-white/70">
            {/* Telegram */}
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all"
            >
              <Send className="w-4 h-4 -rotate-12 -translate-x-0.5" />
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .57.04.84.11V9.32a6.34 6.34 0 0 0-.84-.06 6.34 6.34 0 1 0 6.34 6.34V8.41a8.28 8.28 0 0 0 4.82 1.55v-3.27a4.83 4.83 0 0 1-1.05 0z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Bar: Navigation Links & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-5 sm:gap-7">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <p className="text-center sm:text-right">
            © 2026 SARTO. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>
    </footer>
  );
}
