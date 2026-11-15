"use client";

import { useState } from "react";
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
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white">
      <Header />

      <main className="flex-1 max-w-md mx-auto w-full px-4 py-12 sm:py-20">
        <div className="text-center mb-8 space-y-2">
          <div className="w-12 h-12 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white mx-auto mb-3">
            <User className="w-6 h-6 stroke-[1.5]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {isRegister ? "Ro‘yxatdan o‘tish" : "Shaxsiy kabinetga kirish"}
          </h1>
          <p className="text-xs sm:text-sm text-white/50">
            Buyurtmalar tarixini kuzatish va manzillarni boshqarish uchun
          </p>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-[#141414] border border-white/15 rounded-2xl text-xs sm:text-sm text-white/90 leading-relaxed flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-white/70 shrink-0 mt-0.5" />
            <span>{message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 bg-[#141414] p-6 sm:p-8 border border-white/10 rounded-3xl shadow-xl">
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
            <label htmlFor="login-password" className="block text-xs sm:text-sm font-medium text-white/90">
              Parol <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex min-h-[46px] w-full border border-white/15 bg-[#141414] px-4 pr-12 py-2.5 text-sm sm:text-base text-white focus-visible:outline-none focus-visible:border-white focus-visible:ring-1 focus-visible:ring-white rounded-xl"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="min-w-[40px] min-h-[40px] flex items-center justify-center text-white/50 hover:text-white absolute right-1.5 top-1/2 -translate-y-1/2 cursor-pointer"
                aria-label={showPassword ? "Parolni yashirish" : "Parolni ko‘rsatish"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full min-h-[50px] text-base">
            {isRegister ? "Hisob yaratish" : "Tizimga kirish"}
          </Button>

          <div className="text-center pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setMessage(null);
              }}
              className="text-xs text-white/60 hover:text-white underline underline-offset-4 cursor-pointer"
            >
              {isRegister
                ? "Akkauntingiz bormi? Tizimga kiring"
                : "Akkauntingiz yo‘qmi? Yangi hisob ochish"}
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
