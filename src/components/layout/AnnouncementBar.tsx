"use client";

import { useState } from "react";
import { X } from "lucide-react";

export function AnnouncementBar() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="bg-sarto-black text-white text-[11px] uppercase tracking-widest py-2 px-4 relative flex items-center justify-center font-medium">
      <span>O‘zbekiston bo‘ylab 800 000 so‘mdan yuqori buyurtmalarga bepul yetkazib berish</span>
      <button
        onClick={() => setIsOpen(false)}
        className="absolute right-4 hover:opacity-70 transition-opacity p-1"
        aria-label="Xabarni yopish"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
