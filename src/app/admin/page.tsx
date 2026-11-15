import Link from "next/link";
import { formatUZS } from "@/lib/format";
import { Package, TrendingUp, Clock, AlertTriangle, ArrowLeft } from "lucide-react";

export default function AdminDashboardPage() {
  const stats = [
    { label: "Bugungi savdo", value: formatUZS(7250000), icon: TrendingUp, change: "+14%" },
    { label: "Jami buyurtmalar", value: "24 ta", icon: Package, change: "+5 yangi" },
    { label: "Kutilayotgan buyurtmalar", value: "3 ta", icon: Clock, change: "Tasdiqlash kerak" },
    { label: "Kam qolgan tovarlar", value: "2 ta", icon: AlertTriangle, change: "Zaxirani to‘ldiring" },
  ];

  const recentOrders = [
    {
      id: "SRT-261115-4921",
      customer: "Aziz Rahimov",
      phone: "+998 90 123 45 67",
      items: "Oxford Slim-Fit Oq Ko‘ylak (M)",
      total: 450000,
      status: "pending",
      date: "Bugun, 12:40",
    },
    {
      id: "SRT-261115-3184",
      customer: "Jasur Mirzayev",
      phone: "+998 93 456 78 90",
      items: "To‘q Ko‘k Premium Jun Kostyum (50)",
      total: 2850000,
      status: "confirmed",
      date: "Bugun, 10:15",
    },
    {
      id: "SRT-261114-8720",
      customer: "Dilshod Karimov",
      phone: "+998 97 789 01 23",
      items: "Kashmir Aralashmali Bej Palto (L)",
      total: 1950000,
      status: "shipped",
      date: "Kecha, 18:20",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-amber-100 text-amber-800">Kutilmoqda</span>;
      case "confirmed":
        return <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-blue-100 text-blue-800">Tasdiqlandi</span>;
      case "shipped":
        return <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-purple-100 text-purple-800">Jo‘natildi</span>;
      case "delivered":
        return <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-green-100 text-green-800">Topshirildi</span>;
      default:
        return <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F5F2] flex flex-col">
      {/* Top Admin Header */}
      <header className="bg-sarto-black text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-serif text-xl tracking-[0.2em] uppercase font-semibold">
            SARTO ADMIN
          </Link>
          <span className="text-[10px] uppercase tracking-widest bg-sarto-charcoal px-2 py-1 text-sarto-ivory font-medium">
            Boshqaruv Paneli
          </span>
        </div>
        <Link
          href="/"
          className="text-xs uppercase tracking-wider text-sarto-ivory hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Do‘konga qaytish
        </Link>
      </header>

      {/* Admin Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-sarto-black">Do‘kon statistikasi</h1>
          <p className="text-xs text-sarto-muted mt-1">Bugungi buyurtmalar va zaxira holati</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="bg-white p-5 border border-sarto-border space-y-3">
                <div className="flex justify-between items-center text-sarto-muted">
                  <span className="text-xs uppercase tracking-wider font-medium">{s.label}</span>
                  <Icon className="w-4 h-4 text-sarto-black stroke-1" />
                </div>
                <div className="text-xl font-bold text-sarto-black">{s.value}</div>
                <span className="text-[11px] text-sarto-muted block">{s.change}</span>
              </div>
            );
          })}
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white border border-sarto-border overflow-hidden">
          <div className="px-6 py-4 border-b border-sarto-border flex justify-between items-center">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-sarto-black">
              So‘nggi buyurtmalar
            </h2>
            <span className="text-xs text-sarto-muted">Real vaqt rejimida yangilanadi</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAFAFA] border-b border-sarto-border text-sarto-muted uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3 font-medium">Buyurtma raqami</th>
                  <th className="px-6 py-3 font-medium">Mijoz</th>
                  <th className="px-6 py-3 font-medium">Telefon</th>
                  <th className="px-6 py-3 font-medium">Tarkibi</th>
                  <th className="px-6 py-3 font-medium">Summa</th>
                  <th className="px-6 py-3 font-medium">Holat</th>
                  <th className="px-6 py-3 font-medium">Sana</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sarto-border">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-sarto-ivory/30 transition-colors">
                    <td className="px-6 py-4 font-mono font-medium text-sarto-black">{order.id}</td>
                    <td className="px-6 py-4 font-medium text-sarto-black">{order.customer}</td>
                    <td className="px-6 py-4 text-sarto-muted">{order.phone}</td>
                    <td className="px-6 py-4 text-sarto-black max-w-xs truncate">{order.items}</td>
                    <td className="px-6 py-4 font-bold text-sarto-black">{formatUZS(order.total)}</td>
                    <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                    <td className="px-6 py-4 text-sarto-muted">{order.date}</td>
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
