"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Mouse } from "lucide-react";

interface HeroSlide {
  id: number;
  badge: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  imageAlt: string;
  floatingBadge: {
    title: string;
    pill: string;
    avatars?: string[];
  };
}

const SLIDES: HeroSlide[] = [
  {
    id: 1,
    badge: "Yangi kolleksiya",
    titleLine1: "SARTO",
    titleLine2: "New Season",
    subtitle: "Zamonaviy erkaklar uchun premium kiyimlar kolleksiyasi.",
    ctaText: "Kolleksiyani ko‘rish",
    ctaLink: "/shop",
    image: "/images/hero/hero-banner.jpg",
    imageAlt: "SARTO New Season — Erkaklar premium liboslari",
    floatingBadge: {
      title: "Yangi mahsulotlar",
      pill: "+12",
      avatars: ["/images/products/jacket.jpg", "/images/products/pants.jpg"],
    },
  },
  {
    id: 2,
    badge: "Eksklyuziv to‘plam",
    titleLine1: "ITALIAN",
    titleLine2: "Tailoring",
    subtitle: "Italiya jun matolari va nozik tikuv san’ati uyg‘unligi.",
    ctaText: "Kostyumlarni ko‘rish",
    ctaLink: "/shop?category=ustki-kiyimlar",
    image: "/images/categories/kostyumlar.jpg",
    imageAlt: "SARTO Italiya Jun Kostyumlari",
    floatingBadge: {
      title: "Super 130s Jun",
      pill: "Premium",
      avatars: ["/images/products/navy-suit.jpg", "/images/products/oxford-shirt.jpg"],
    },
  },
  {
    id: 3,
    badge: "Shahar uslubi",
    titleLine1: "URBAN",
    titleLine2: "Minimalism",
    subtitle: "Erkin harakat va bejirim soddalikni xush ko‘ruvchilar uchun.",
    ctaText: "Sport uslubini ko‘rish",
    ctaLink: "/shop?category=sport-uslubi",
    image: "/images/categories/sport.jpg",
    imageAlt: "SARTO Zamonaviy shahar uslubi",
    floatingBadge: {
      title: "Kuz-Qish 2026",
      pill: "Limited",
      avatars: ["/images/products/sweater.jpg", "/images/products/black-polo.jpg"],
    },
  },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const total = SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  // Auto-play interval (advance every 7s, pause on hover)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
  };

  return (
    <section
      aria-label="Asosiy qism — SARTO Yangi Kolleksiyasi"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-between overflow-hidden border-b border-white/[0.08] select-none"
    >
      {/* Background Slides (Layered with cross-fade) */}
      {SLIDES.map((slide, index) => {
        const isActive = index === current;
        return (
          <div
            key={slide.id}
            aria-hidden={!isActive}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-0" : "opacity-0 -z-10 pointer-events-none"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.imageAlt}
              fill
              priority={index === 0}
              className={`object-cover object-top sm:object-center brightness-[0.80] transition-transform duration-10000 ease-out ${
                isActive ? "scale-105" : "scale-100"
              }`}
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent sm:via-[#0A0A0A]/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/35" />
          </div>
        );
      })}

      {/* Hero Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-8 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Title, Subtitle, CTA */}
          <div className="lg:col-span-8 space-y-6">
            {/* Badge: Yangi kolleksiya */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-md transition-all">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-xs font-medium text-white/90 tracking-wide">
                {SLIDES[current].badge}
              </span>
            </div>

            {/* Main Hero Headline */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[1.02] transition-all">
              {SLIDES[current].titleLine1}
              <br />
              <span className="text-[#DDD6CC] font-bold">
                {SLIDES[current].titleLine2}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-white/70 max-w-sm sm:max-w-md font-normal leading-relaxed min-h-[48px]">
              {SLIDES[current].subtitle}
            </p>

            {/* Action CTA Button */}
            <div className="pt-2">
              <Link
                href={SLIDES[current].ctaLink}
                className="inline-flex items-center gap-3 pl-6 pr-2.5 py-2.5 bg-white text-black font-semibold text-sm rounded-full hover:bg-[#EAE6DF] transition-all group shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{SLIDES[current].ctaText}</span>
                <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>

          {/* Right Column: Floating Badge Card */}
          <div className="lg:col-span-4 hidden lg:flex justify-end">
            <div className="p-4 rounded-2xl bg-black/60 border border-white/20 backdrop-blur-md flex items-center gap-4 shadow-2xl transition-all duration-500">
              {/* Avatar stack */}
              {SLIDES[current].floatingBadge.avatars && (
                <div className="flex -space-x-2 overflow-hidden">
                  {SLIDES[current].floatingBadge.avatars.map((img, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-black relative overflow-hidden bg-white/10"
                    >
                      <Image
                        src={img}
                        alt="Kolleksiya mahsuloti"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-black bg-white/20 text-white text-[11px] font-bold flex items-center justify-center">
                    {SLIDES[current].floatingBadge.pill}
                  </div>
                </div>
              )}
              <span className="text-xs font-semibold text-white/90">
                {SLIDES[current].floatingBadge.title}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Bottom Bar: Scroll down, Indicators & Slider Controls */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between border-t border-white/[0.08]">
        {/* Scroll down indicator */}
        <div className="flex items-center gap-2 text-xs text-white/50 tracking-wide font-medium">
          <Mouse className="w-4 h-4 animate-bounce" />
          <span>Scroll down</span>
        </div>

        {/* Slider Controls */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Progress dots */}
          <div className="flex items-center gap-2" aria-label="Slayd indikatorlari">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goToSlide(idx)}
                className={`transition-all rounded-full cursor-pointer ${
                  idx === current
                    ? "w-7 h-1.5 bg-white"
                    : "w-2 h-1.5 bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Slayd ${idx + 1}`}
                aria-current={idx === current}
              />
            ))}
          </div>

          {/* Number Counter */}
          <span className="font-mono text-xs font-semibold text-white min-w-[48px]">
            0{current + 1} <span className="text-white/40">/ 0{total}</span>
          </span>

          {/* Arrow Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Oldingi slayd"
              className="w-8 h-8 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white hover:bg-white/10 active:scale-95 flex items-center justify-center transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Keyingi slayd"
              className="w-8 h-8 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white hover:bg-white/10 active:scale-95 flex items-center justify-center transition-all cursor-pointer"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
