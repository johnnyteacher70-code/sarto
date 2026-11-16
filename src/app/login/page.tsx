"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/features/auth/AuthContext";
import { Eye, EyeOff, ShieldCheck, User, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { user, login, register, isLoading } = useAuth();

  const [isRegister, setIsRegister] = useState(true);
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already logged in, redirect to account
  useEffect(() => {
    if (!isLoading && user) {
      router.push("/account");
    }
  }, [user, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      if (isRegister) {
        if (!fullName.trim()) {
          setError("Iltimos, ism va familiyangizni kiriting.");
          setIsSubmitting(false);
          return;
        }

        const res = await register(fullName, phoneOrEmail, password);
        if (res.success) {
          setSuccess(`Xush kelibsiz, ${fullName}! Hisobingiz muvaffaqiyatli ochildi.`);
          setTimeout(() => {
            router.push("/account");
          }, 800);
        } else {
          setError(res.error || "Ro‘yxatdan o‘tishda xatolik yuz berdi.");
        }
      } else {
        const res = await login(phoneOrEmail, password);
        if (res.success) {
          setSuccess("Tizimga muvaffaqiyatli kirdingiz. Shaxsiy kabinetga yo‘naltirilmoqda...");
          setTimeout(() => {
            router.push("/account");
          }, 800);
        } else {
          setError(res.error || "Tizimga kirishda xatolik yuz berdi.");
        }
      }
    } catch {
      setError("Kutilmagan xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFillDemo = (name: string, phone: string, pass: string) => {
    setIsRegister(true);
    setFullName(name);
    setPhoneOrEmail(phone);
    setPassword(pass);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white">
      <Header />

      <main className="flex-1 max-w-md mx-auto w-full px-4 py-8 sm:py-14 flex flex-col justify-center">
        <div className="text-center mb-6 space-y-1.5">
          <div className="w-11 h-11 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white mx-auto mb-2.5">
            <User className="w-5 h-5 stroke-[1.5]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {isRegister ? "Ro‘yxatdan o‘tish" : "Shaxsiy kabinetga kirish"}
          </h1>
          <p className="text-xs sm:text-sm text-white/50">
            Buyurtmalar tarixini kuzatish va manzillarni boshqarish uchun
          </p>
        </div>

        {/* Success Alert */}
        {success && (
          <div className="mb-4 p-4 bg-emerald-950/70 border border-emerald-500/40 rounded-2xl text-xs sm:text-sm text-emerald-200 leading-relaxed flex items-center gap-2.5 animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="font-medium">{success}</span>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-4 bg-red-950/70 border border-red-500/40 rounded-2xl text-xs sm:text-sm text-red-200 leading-relaxed flex items-start gap-2.5 animate-fadeIn">
            <ShieldCheck className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 bg-[#141414] p-6 sm:p-7 border border-white/10 rounded-3xl shadow-2xl">
          {isRegister && (
            <Input
              label="Ism va Familiyangiz"
              placeholder="Jahongir Abdurayimov"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          )}

          <Input
            label="Telefon raqami yoki Email"
            placeholder="+998 93 126 45 80 yoki email"
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
                className="flex min-h-[46px] w-full border border-white/15 bg-[#181818] px-4 pr-12 py-2.5 text-sm sm:text-base text-white focus-visible:outline-none focus-visible:border-white focus-visible:ring-1 focus-visible:ring-white rounded-xl placeholder:text-white/30"
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

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full min-h-[48px] text-sm sm:text-base font-semibold mt-2 cursor-pointer flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Tekshirilmoqda...</span>
              </>
            ) : isRegister ? (
              <>
                <span>Hisob yaratish</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </>
            ) : (
              <>
                <span>Tizimga kirish</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </Button>

          {/* Quick Demo Pre-fill helper */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => handleFillDemo("Jahongir Abdurayimov", "+998931264580", "JohnnyCoder")}
              className="text-[11px] text-white/40 hover:text-white/90 underline transition-colors cursor-pointer"
            >
              Tezkor to‘ldirish (Jahongir Abdurayimov)
            </button>
          </div>

          <div className="text-center pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setError(null);
                setSuccess(null);
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
