"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/features/auth/AuthContext";
import {
  Package,
  User,
  MapPin,
  ArrowRight,
  ShieldCheck,
  LogOut,
  Plus,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import { formatUZS, formatDateTime } from "@/lib/format";

interface SavedOrder {
  orderNumber: string;
  itemsCount: number;
  total: number;
  status: string;
  createdAt: string;
  paymentMethod: string;
}

export default function AccountPage() {
  const router = useRouter();
  const { user, isLoading, logout, updateProfile, addAddress } = useAuth();

  const [activeTab, setActiveTab] = useState<"orders" | "addresses" | "profile">("orders");
  const [orders] = useState<SavedOrder[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("sarto_orders");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [newCity, setNewCity] = useState("Toshkent shahri");
  const [newAddress, setNewAddress] = useState("");
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingName, setEditingName] = useState(() => user?.name || "");
  const [profileSaved, setProfileSaved] = useState(false);

  // Sync state if user changes
  const [prevUser, setPrevUser] = useState(user);
  if (user !== prevUser) {
    setPrevUser(user);
    if (user) {
      setEditingName(user.name);
    }
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingName.trim()) return;
    updateProfile({ name: editingName.trim() });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.trim()) return;
    addAddress(newCity, newAddress.trim());
    setNewAddress("");
    setIsAddingAddress(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white">
        <Header />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </main>
        <Footer />
      </div>
    );
  }

  // Guest state (not logged in)
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white">
        <Header />

        <main className="flex-1 max-w-xl mx-auto w-full px-4 py-16 sm:py-24 text-center">
          <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 mx-auto mb-6">
            <User className="w-8 h-8 stroke-[1.5]" />
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Shaxsiy kabinet
          </h1>
          <p className="text-sm text-white/50 mb-8 max-w-md mx-auto leading-relaxed">
            Buyurtmalar tarixini kuzatish, yetkazish manzillarini boshqarish va eksklyuziv
            imtiyozlardan foydalanish uchun tizimga kiring.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/login">
              <Button size="lg" className="w-full sm:w-auto min-h-[48px] px-8">
                Tizimga kirish
              </Button>
            </Link>
            <Link href="/shop">
              <Button variant="outline" size="lg" className="w-full sm:w-auto min-h-[48px] px-8">
                Katalogni ko‘rish
              </Button>
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // Logged-in state
  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav aria-label="Non ushoqlari (Breadcrumbs)" className="text-xs text-white/50 mb-6 flex items-center gap-1.5">
          <Link href="/" className="hover:text-white">Bosh sahifa</Link>
          <span aria-hidden="true">/</span>
          <span className="text-white font-medium">Mening hisobim</span>
        </nav>

        {/* User Hero Banner */}
        <div className="p-6 sm:p-8 bg-[#141414] border border-white/10 rounded-3xl mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-neutral-800 to-neutral-600 border border-white/20 flex items-center justify-center text-white text-2xl font-bold shadow-md">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {user.name}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/10 text-white/90 border border-white/15">
                  <Sparkles className="w-3 h-3" />
                  {user.role === "admin" || user.role === "super_admin" ? "Admin" : "Premium Mijoz"}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-white/50 mt-1">
                {user.emailOrPhone} • A’zo bo‘lgan: {formatDateTime(user.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {user.role === "admin" || user.role === "super_admin" ? (
              <Link href="/admin" className="w-full sm:w-auto">
                <Button size="sm" className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-black font-semibold">
                  Admin Panel
                </Button>
              </Link>
            ) : null}
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="w-full sm:w-auto border-white/15 hover:border-red-500/50 hover:bg-red-950/20 hover:text-red-400"
            >
              <LogOut className="w-3.5 h-3.5 mr-1.5" />
              Chiqish
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/10 mb-8 overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold whitespace-nowrap transition-colors relative cursor-pointer ${
              activeTab === "orders" ? "text-white" : "text-white/50 hover:text-white/80"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Buyurtmalarim ({orders.length})</span>
            {activeTab === "orders" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("addresses")}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold whitespace-nowrap transition-colors relative cursor-pointer ${
              activeTab === "addresses" ? "text-white" : "text-white/50 hover:text-white/80"
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Yetkazish manzillari ({user.addresses.length})</span>
            {activeTab === "addresses" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold whitespace-nowrap transition-colors relative cursor-pointer ${
              activeTab === "profile" ? "text-white" : "text-white/50 hover:text-white/80"
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profil ma’lumotlari</span>
            {activeTab === "profile" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full" />
            )}
          </button>
        </div>

        {/* Tab 1: Orders */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="p-12 text-center bg-[#141414] border border-white/10 rounded-3xl space-y-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 mx-auto">
                  <Package className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Hozircha buyurtmalar yo‘q</h3>
                  <p className="text-xs sm:text-sm text-white/50 max-w-sm mx-auto mt-1">
                    SARTO kolleksiyasidan o‘zingizga ma’qul kiyimlarni tanlang va birinchi buyurtmangizni bering.
                  </p>
                </div>
                <Link href="/shop" className="inline-block pt-2">
                  <Button size="sm">
                    Katalogni ko‘rish <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </Link>
              </div>
            ) : (
              orders.map((ord) => (
                <div
                  key={ord.orderNumber}
                  className="p-6 bg-[#141414] border border-white/10 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-white/20 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-sm text-white">
                        #{ord.orderNumber}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {ord.status || "Qabul qilindi"}
                      </span>
                    </div>
                    <p className="text-xs text-white/50 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {formatDateTime(ord.createdAt)} • {ord.itemsCount} ta tovar • To‘lov turi: {ord.paymentMethod}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-base sm:text-lg font-bold text-white">
                      {formatUZS(ord.total)}
                    </div>
                    <Link
                      href={`/order/success/${ord.orderNumber}`}
                      className="text-xs text-white/60 hover:text-white underline underline-offset-4 inline-flex items-center gap-1 mt-1"
                    >
                      Batafsil ma’lumot <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Addresses */}
        {activeTab === "addresses" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="p-6 bg-[#141414] border border-white/10 rounded-2xl space-y-3 relative group hover:border-white/25 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-white/60 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-white" />
                      {addr.city}
                    </span>
                    {addr.isDefault && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/10 text-white border border-white/20">
                        Asosiy manzil
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-white font-medium leading-relaxed">
                    {addr.address}
                  </p>
                </div>
              ))}
            </div>

            {/* Add Address Form */}
            {isAddingAddress ? (
              <form onSubmit={handleAddAddress} className="p-6 bg-[#141414] border border-white/15 rounded-2xl space-y-4 max-w-lg">
                <h3 className="text-sm font-bold text-white">Yangi manzil kiritish</h3>
                <div className="space-y-1.5">
                  <label htmlFor="account-city-select" className="text-xs text-white/70">Shahar / Viloyat</label>
                  <select
                    id="account-city-select"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full bg-[#181818] border border-white/15 text-white text-xs sm:text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-white"
                  >
                    <option value="Toshkent shahri">Toshkent shahri</option>
                    <option value="Samarqand">Samarqand viloyati</option>
                    <option value="Buxoro">Buxoro viloyati</option>
                    <option value="Andijon">Andijon viloyati</option>
                    <option value="Farg‘ona">Farg‘ona viloyati</option>
                    <option value="Namangan">Namangan viloyati</option>
                  </select>
                </div>
                <Input
                  label="Aniq manzil (Ko‘cha, uy, xonadon)"
                  placeholder="Amir Temur ko'chasi 45-uy, 12-xonadon"
                  required
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                />
                <div className="flex gap-2 pt-2">
                  <Button type="submit" size="sm">
                    Saqlash
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsAddingAddress(false)}
                  >
                    Bekor qilish
                  </Button>
                </div>
              </form>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAddingAddress(true)}
                className="cursor-pointer"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Yangi manzil qo‘shish
              </Button>
            )}
          </div>
        )}

        {/* Tab 3: Profile Settings */}
        {activeTab === "profile" && (
          <div className="max-w-lg">
            <form onSubmit={handleSaveProfile} className="p-6 sm:p-8 bg-[#141414] border border-white/10 rounded-3xl space-y-5 shadow-xl">
              <h3 className="text-lg font-bold text-white">Shaxsiy ma’lumotlarni tahrirlash</h3>

              {profileSaved && (
                <div className="p-3 bg-emerald-950/70 border border-emerald-500/40 rounded-xl text-xs text-emerald-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Ma’lumotlar muvaffaqiyatli saqlandi!</span>
                </div>
              )}

              <Input
                label="Ism va Familiya"
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                required
              />

              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-medium text-white/90">
                  Telefon yoki Email
                </label>
                <input
                  type="text"
                  disabled
                  value={user.emailOrPhone}
                  className="w-full bg-[#181818] border border-white/10 text-white/50 text-xs sm:text-sm rounded-xl px-4 py-2.5 cursor-not-allowed"
                />
                <p className="text-[11px] text-white/40">
                  Aloqa ma’lumotlarini o‘zgartirish uchun mijozlar xizmati bilan bog‘laning.
                </p>
              </div>

              <Button type="submit" size="sm" className="w-full">
                O‘zgarishlarni saqlash
              </Button>
            </form>
          </div>
        )}

        {/* Security & Support Note */}
        <div className="mt-12 p-6 bg-[#141414] border border-white/10 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-white shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-white">Shaxsiy ma’lumotlar xavfsizligi</h3>
              <p className="text-xs text-white/50">
                Sizning ma’lumotlaringiz xavfsiz saqlanadi va uchinchi shaxslarga berilmaydi.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
