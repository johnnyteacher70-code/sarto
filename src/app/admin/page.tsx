import Link from "next/link";
import { formatUZS } from "@/lib/format";
import { Package, TrendingUp, Clock, AlertTriangle, ArrowLeft } from "lucide-react";

export default function AdminDashboardPage() {
  const stats = [
    { label: "Bugungi savdo tushumi", value: formatUZS(7250000), icon: TrendingUp, change: "+14% kechagiga nisbatan" },
    { label: "Jami yangi buyurtmalar", value: "24 ta", icon: Package, change: "Bugun 5 ta yangi" },
    { label: "Tasdiqlash kutilmoqda", value: "3 ta", icon: Clock, change: "Operator tekshiruvi lozim" },
    { label: "Kam qolgan tovarlar", value: "2 ta", icon: AlertTriangle, change: "Omborni to‘ldirish kerak" },
  ];

  const recentOrders = [
    {
      id: "SRT-261115-4921",
      customer: "Aziz Rahimov",
      phone: "+998 90 123 45 67",
      items: "Premium Jacket (M) × 1",
      total: 779000,
      status: "pending",
      date: "Bugun, 12:40",
    },
    {
      id: "SRT-261115-3184",
      customer: "Jasur Mirzayev",
      phone: "+998 93 456 78 90",
      items: "Tailored Pants (32) × 1",
      total: 599000,
      status: "confirmed",
      date: "Bugun, 10:15",
    },
    {
      id: "SRT-261114-8720",
      customer: "Dilshod Karimov",
      phone: "+998 97 789 01 23",
      items: "Minimal Sweater (L) × 1",
      total: 369000,
      status: "shipped",
      date: "Kecha, 18:20",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">Kutilmoqda</span>;
      case "confirmed":
        return <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/30">Tasdiqlandi</span>;
      case "shipped":
        return <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30">Jo‘natildi</span>;
      case "delivered":
        return <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">Topshirildi</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full bg-white/10 text-white">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
      {/* Top Admin Header */}
      <header className="bg-[#121212] text-white px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3 sm:gap-4">
          <Link href="/" className="text-xl sm:text-2xl font-extrabold tracking-[0.18em] uppercase text-white">
            SARTO
          </Link>
          <span className="text-xs uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full text-white/80 font-medium border border-white/15">
            Boshqaruv Paneli
          </span>
        </div>
        <Link
          href="/"
          className="text-xs sm:text-sm font-medium text-white/70 hover:text-white flex items-center gap-1.5 transition-colors py-1"
        >
          <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Do‘kon vitrinasiga qaytish</span><span className="sm:hidden">Vitrina</span>
        </Link>
      </header>

      {/* Admin Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Do‘kon statistikasi</h1>
          <p className="text-xs sm:text-sm text-white/50 mt-1">Bugungi buyurtmalar, daromad va ombor zaxirasi monitoringi</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="bg-[#141414] p-5 sm:p-6 border border-white/10 rounded-3xl space-y-3 shadow-lg">
                <div className="flex justify-between items-center text-white/50">
                  <span className="text-xs font-medium uppercase tracking-wider">{s.label}</span>
                  <Icon className="w-5 h-5 text-white stroke-[1.5]" />
                </div>
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <span className="text-xs text-white/40 block">{s.change}</span>
              </div>
            );
          })}
        </div>

        {/* Recent Orders Section */}
        <div className="bg-[#141414] border border-white/10 rounded-3xl shadow-xl overflow-hidden">
          <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center bg-[#161616]">
            <div>
              <h2 className="text-sm font-bold text-white">
                So‘nggi buyurtmalar
              </h2>
              <p className="text-xs text-white/50">Real vaqt rejimida tushgan buyurtmalar</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#161616] border-b border-white/10 text-xs uppercase text-white/50">
                <tr>
                  <th className="px-6 py-3.5">Buyurtma ID</th>
                  <th className="px-6 py-3.5">Mijoz</th>
                  <th className="px-6 py-3.5">Tarkibi</th>
                  <th className="px-6 py-3.5">Summa</th>
                  <th className="px-6 py-3.5">Holat</th>
                  <th className="px-6 py-3.5">Vaqti</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-white/90">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-mono font-semibold text-white">
                      {order.id}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-white">{order.customer}</p>
                      <p className="text-xs text-white/40">{order.phone}</p>
                    </td>
                    <td className="px-6 py-4 text-xs text-white/70">{order.items}</td>
                    <td className="px-6 py-4 font-bold text-white">
                      {formatUZS(order.total)}
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                    <td className="px-6 py-4 text-xs text-white/40">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
