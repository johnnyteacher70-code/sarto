"use client";

import { useState } from "react";
import { X, Truck } from "lucide-react";

export function AnnouncementBar() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <aside
      aria-label="Maxsus taklif"
      className="bg-sarto-black text-white text-xs py-2.5 px-4 relative flex items-center justify-center font-normal tracking-wide border-b border-sarto-charcoal"
    >
      <div className="flex items-center gap-2 text-center pr-8 sm:pr-0">
        <Truck className="w-3.5 h-3.5 text-sarto-taupe shrink-0 hidden sm:inline-block" aria-hidden="true" />
        <span className="text-[11px] sm:text-xs">
          O‘zbekiston bo‘ylab <strong className="font-semibold text-white">800 000 so‘mdan</strong> yuqori barcha buyurtmalarga <strong>bepul yetkazib berish</strong>
        </span>
      </div>
      <button
        onClick={() => setIsOpen(false)}
        className="absolute right-2 sm:right-4 min-w-[36px] min-h-[36px] flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
        aria-label="Xabarni yopish"
      >
        <X className="w-4 h-4" />
      </button>
    </aside>
  );
}
