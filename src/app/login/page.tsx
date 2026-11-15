"use client";

import { useState } from "react";
import Link from "next/link";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Tizimga kirish uchun Supabase loyihangiz ma'lumotlarini .env fayliga kiriting.");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-md mx-auto w-full px-4 py-16 sm:py-24">
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-[0.25em] text-sarto-muted font-semibold block mb-2">
            SARTO CLUB
          </span>
          <h1 className="font-serif text-3xl text-sarto-black">
            {isRegister ? "Ro‘yxatdan o‘tish" : "Shaxsiy kabinetga kirish"}
          </h1>
          <p className="text-xs text-sarto-muted mt-2">
            Buyurtmalar tarixini kuzatish va manzillarni boshqarish uchun
          </p>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-sarto-ivory border border-sarto-border text-xs text-sarto-black">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 border border-sarto-border">
          {isRegister && (
            <Input
              label="Ism va Familiya"
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

          <Input
            label="Parol"
            type="password"
            placeholder="••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" size="lg" className="w-full h-12">
            {isRegister ? "Hisob yaratish" : "Kirish"}
          </Button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs text-sarto-muted hover:text-sarto-black transition-colors cursor-pointer uppercase tracking-wider"
            >
              {isRegister
                ? "Akkauntingiz bormi? Kirish"
                : "Akkauntingiz yo‘qmi? Ro‘yxatdan o‘tish"}
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
