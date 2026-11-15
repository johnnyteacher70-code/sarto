"use client";

import { useState } from "react";
import Link from "next/link";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Eye, EyeOff, ShieldCheck, User } from "lucide-react";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Tizimga kirish uchun Supabase loyihangiz ma'lumotlarini .env fayliga kiriting.");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-md mx-auto w-full px-4 py-12 sm:py-20">
        <div className="text-center mb-8 space-y-2">
          <div className="w-12 h-12 rounded-full bg-sarto-ivory flex items-center justify-center text-sarto-black mx-auto mb-3">
            <User className="w-6 h-6 stroke-[1.5]" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-sarto-black">
            {isRegister ? "Ro‘yxatdan o‘tish" : "Shaxsiy kabinetga kirish"}
          </h1>
          <p className="text-sm text-sarto-muted">
            Buyurtmalar tarixini kuzatish va manzillarni boshqarish uchun
          </p>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-sarto-ivory border border-sarto-border text-xs sm:text-sm text-sarto-black leading-relaxed flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-sarto-taupe shrink-0 mt-0.5" />
            <span>{message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 sm:p-8 border border-sarto-border shadow-xs">
          {isRegister && (
            <Input
              label="Ism va Familiyangiz"
              placeholder="Shoxrux Xalilov"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          )}

          <Input
            label="Telefon raqami yoki Email"
            placeholder="+998 90 123 45 67 yoki email"
            required
            value={phoneOrEmail}
            onChange={(e) => setPhoneOrEmail(e.target.value)}
          />

          <div className="space-y-1.5 text-left">
            <label htmlFor="login-password" className="block text-sm font-medium text-sarto-black">
              Parol <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex min-h-[46px] w-full border border-sarto-border bg-white px-3.5 pr-12 py-2.5 text-sm sm:text-base text-sarto-black focus-visible:outline-none focus-visible:border-sarto-black focus-visible:ring-1 focus-visible:ring-sarto-black rounded-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="min-w-[40px] min-h-[40px] flex items-center justify-center text-sarto-muted hover:text-sarto-black absolute right-1.5 top-1/2 -translate-y-1/2 cursor-pointer"
                aria-label={showPassword ? "Parolni yashirish" : "Parolni ko‘rsatish"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full min-h-[50px] text-base">
            {isRegister ? "Hisob yaratish" : "Tizimga kirish"}
          </Button>

          <div className="text-center pt-3 border-t border-sarto-border">
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs sm:text-sm text-sarto-black hover:text-sarto-taupe font-medium transition-colors cursor-pointer py-1"
            >
              {isRegister
                ? "Akkauntingiz bormi? Kirish"
                : "Akkauntingiz yo‘qmi? Ro‘yxatdan o‘tish"}
            </button>
          </div>
        </form>

        <div className="text-center mt-6">
          <Link href="/" className="text-xs text-sarto-muted hover:text-sarto-black transition-colors">
            ← Do‘kon bosh sahifasiga qaytish
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
