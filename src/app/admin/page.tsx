import Link from "next/link";
import { formatUZS } from "@/lib/format";
import { Package, TrendingUp, Clock, AlertTriangle, ArrowLeft, Phone, Calendar } from "lucide-react";

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
      items: "Oxford Slim-Fit Oq Ko‘ylak (M) × 1",
      total: 450000,
      status: "pending",
      date: "Bugun, 12:40",
    },
    {
      id: "SRT-261115-3184",
      customer: "Jasur Mirzayev",
      phone: "+998 93 456 78 90",
      items: "To‘q Ko‘k Premium Jun Kostyum (50) × 1",
      total: 2850000,
      status: "confirmed",
      date: "Bugun, 10:15",
    },
    {
      id: "SRT-261114-8720",
      customer: "Dilshod Karimov",
      phone: "+998 97 789 01 23",
      items: "Kashmir Aralashmali Bej Palto (L) × 1",
      total: 1950000,
      status: "shipped",
      date: "Kecha, 18:20",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300">Kutilmoqda</span>;
      case "confirmed":
        return <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold bg-blue-100 text-blue-900 border border-blue-300">Tasdiqlandi</span>;
      case "shipped":
        return <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold bg-purple-100 text-purple-900 border border-purple-300">Jo‘natildi</span>;
      case "delivered":
        return <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold bg-emerald-100 text-emerald-900 border border-emerald-300">Topshirildi</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold bg-gray-100 text-gray-900">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F5F2] flex flex-col">
      {/* Top Admin Header */}
      <header className="bg-sarto-black text-white px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between border-b border-sarto-charcoal">
        <div className="flex items-center gap-3 sm:gap-4">
          <Link href="/" className="font-serif text-lg sm:text-2xl tracking-[0.2em] uppercase font-semibold">
            SARTO
          </Link>
          <span className="text-xs uppercase tracking-wider bg-sarto-charcoal px-2.5 py-1 text-sarto-ivory font-medium">
            Boshqaruv Paneli
          </span>
        </div>
        <Link
          href="/"
          className="text-xs sm:text-sm font-medium text-sarto-ivory hover:text-white flex items-center gap-1.5 transition-colors py-1"
        >
          <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Do‘kon vitrinasiga qaytish</span><span className="sm:hidden">Vitrina</span>
        </Link>
      </header>

      {/* Admin Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-sarto-black">Do‘kon statistikasi</h1>
          <p className="text-xs sm:text-sm text-sarto-muted mt-1">Bugungi buyurtmalar, daromad va ombor zaxirasi monitoringi</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="bg-white p-5 sm:p-6 border border-sarto-border space-y-3 shadow-xs">
                <div className="flex justify-between items-center text-sarto-muted">
                  <span className="text-xs font-medium uppercase tracking-wider">{s.label}</span>
                  <Icon className="w-5 h-5 text-sarto-black stroke-[1.5]" />
                </div>
                <div className="text-2xl font-bold text-sarto-black">{s.value}</div>
                <span className="text-xs text-sarto-muted block">{s.change}</span>
              </div>
            );
          })}
        </div>

        {/* Recent Orders Section */}
        <div className="bg-white border border-sarto-border shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-sarto-border flex justify-between items-center bg-[#FAFAFA]">
            <div>
              <h2 className="text-sm font-semibold text-sarto-black">
                So‘nggi buyurtmalar
              </h2>
              <p className="text-xs text-sarto-muted">Real vaqt rejimida tushgan buyurtmalar</p>
            </div>
            <span className="text-xs text-sarto-muted font-mono">3 ta ko‘rsatilmoqda</span>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-sarto-ivory/50 border-b border-sarto-border text-xs text-sarto-black font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3.5">Buyurtma ID</th>
                  <th className="px-6 py-3.5">Mijoz</th>
                  <th className="px-6 py-3.5">Telefon</th>
                  <th className="px-6 py-3.5">Mahsulotlar</th>
                  <th className="px-6 py-3.5">Jami</th>
                  <th className="px-6 py-3.5">Holati</th>
                  <th className="px-6 py-3.5">Sana</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sarto-border">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-sarto-ivory/20 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-sarto-black">{order.id}</td>
                    <td className="px-6 py-4 font-medium text-sarto-black">{order.customer}</td>
                    <td className="px-6 py-4 text-sarto-muted font-mono text-xs">{order.phone}</td>
                    <td className="px-6 py-4 text-sarto-black max-w-xs truncate">{order.items}</td>
                    <td className="px-6 py-4 font-bold text-sarto-black">{formatUZS(order.total)}</td>
                    <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                    <td className="px-6 py-4 text-sarto-muted text-xs">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View (Stacked rows for small screens) */}
          <div className="md:hidden divide-y divide-sarto-border">
            {recentOrders.map((order) => (
              <div key={order.id} className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold text-sm text-sarto-black">{order.id}</span>
                  {getStatusBadge(order.status)}
                </div>
                <div>
                  <p className="font-medium text-sm text-sarto-black">{order.customer}</p>
                  <p className="text-xs text-sarto-muted flex items-center gap-1.5 mt-0.5">
                    <Phone className="w-3.5 h-3.5" /> {order.phone}
                  </p>
                </div>
                <p className="text-xs text-sarto-black bg-sarto-ivory/40 p-2 border border-sarto-border/60">
                  {order.items}
                </p>
                <div className="flex justify-between items-center text-xs pt-1">
                  <span className="text-sarto-muted flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {order.date}
                  </span>
                  <span className="text-sm font-bold text-sarto-black">{formatUZS(order.total)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
