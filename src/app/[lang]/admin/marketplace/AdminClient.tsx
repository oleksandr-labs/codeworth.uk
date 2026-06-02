"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Star,
  BarChart2,
  Settings,
  LogOut,
  TrendingUp,
  TrendingDown,
  Eye,
  Pencil,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Plus,
  Download,
  Search,
  ExternalLink,
  Wallet,
  FileText,
  Tag,
  Menu,
  X,
} from "lucide-react";
import { NICHES_DATA } from "@/lib/data/niches";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useLocale } from "@/components/layout/LocaleProvider";
import { useToast } from "@/components/ui/Toast";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

type AdminTab = "dashboard" | "products" | "orders" | "clients" | "reviews" | "analytics" | "finances" | "settings";

const ORDER_STATUSES = {
  pending: { color: "bg-amber-100 text-amber-700", icon: Clock },
  in_progress: { color: "bg-blue-100 text-blue-700", icon: AlertCircle },
  completed: { color: "bg-green-100 text-green-700", icon: CheckCircle },
  cancelled: { color: "bg-red-100 text-red-700", icon: XCircle },
};

function getOrderStatusLabel(status: string, isUk: boolean): string {
  const labels: Record<string, [string, string]> = {
    pending: ["Очікує", "Pending"],
    in_progress: ["В роботі", "In Progress"],
    completed: ["Завершено", "Completed"],
    cancelled: ["Скасовано", "Cancelled"],
  };
  const pair = labels[status];
  return pair ? (isUk ? pair[0] : pair[1]) : status;
}

const MOCK_ORDERS = [
  { id: "CN-4821", client: "Олег Коваленко", product: "Ресторан / Кафе", status: "completed" as const, amount: 13600, date: "2026-03-10" },
  { id: "CN-4822", client: "Марія Левченко", product: "Салон краси", status: "in_progress" as const, amount: 22500, date: "2026-03-12" },
  { id: "CN-4823", client: "Іван Петренко", product: "Медична клініка", status: "pending" as const, amount: 20400, date: "2026-03-15" },
  { id: "CN-4824", client: "Тетяна Бойко", product: "Фотограф", status: "in_progress" as const, amount: 11900, date: "2026-03-17" },
  { id: "CN-4825", client: "Сергій Мороз", product: "Автосервіс", status: "completed" as const, amount: 17000, date: "2026-03-18" },
];

const MOCK_CLIENTS = [
  { id: 1, name: "Олег Коваленко", email: "oleg@ex.com", orders: 3, total: 44100, date: "2026-01-10", status: "active" },
  { id: 2, name: "Марія Левченко", email: "maria@ex.com", orders: 1, total: 22500, date: "2026-03-12", status: "active" },
  { id: 3, name: "Іван Петренко", email: "ivan@ex.com", orders: 2, total: 28400, date: "2025-11-05", status: "active" },
  { id: 4, name: "Тетяна Бойко", email: "tetiana@ex.com", orders: 1, total: 11900, date: "2026-03-17", status: "active" },
];

const MOCK_TRANSACTIONS = [
  { id: "TXN-1041", date: "2026-03-18", client: "Сергій Мороз", product: "Автосервіс", amount: 17000, method: "LiqPay", status: "success" },
  { id: "TXN-1040", date: "2026-03-17", client: "Тетяна Бойко", product: "Фотограф", amount: 11900, method: "LiqPay", status: "success" },
  { id: "TXN-1039", date: "2026-03-15", client: "Іван Петренко", product: "Медична клініка", amount: 10200, method: "WayForPay", status: "pending" },
  { id: "TXN-1038", date: "2026-03-12", client: "Марія Левченко", product: "Салон краси", amount: 11250, method: "LiqPay", status: "success" },
  { id: "TXN-1037", date: "2026-03-10", client: "Олег Коваленко", product: "Ресторан / Кафе", amount: 13600, method: "LiqPay", status: "success" },
  { id: "TXN-1036", date: "2026-03-05", client: "Наталія Шевченко", product: "Фітнес-клуб", amount: 9800, method: "WayForPay", status: "success" },
  { id: "TXN-1035", date: "2026-02-28", client: "Богдан Кравченко", product: "Юридичні послуги", amount: 8500, method: "LiqPay", status: "refunded" },
];

const MOCK_ADMIN_INVOICES = [
  { id: "INV-221", order: "CN-4821", client: "Олег Коваленко", date: "2026-03-10", due: "2026-03-17", amount: 13600, status: "paid" },
  { id: "INV-220", order: "CN-4822", client: "Марія Левченко", date: "2026-03-12", due: "2026-03-26", amount: 11250, status: "paid" },
  { id: "INV-219", order: "CN-4822", client: "Марія Левченко", date: "2026-03-26", due: "2026-04-09", amount: 11250, status: "pending" },
  { id: "INV-218", order: "CN-4823", client: "Іван Петренко", date: "2026-03-15", due: "2026-03-29", amount: 10200, status: "overdue" },
  { id: "INV-217", order: "CN-4824", client: "Тетяна Бойко", date: "2026-03-17", due: "2026-03-31", amount: 11900, status: "paid" },
];

const MOCK_PROMO_CODES = [
  { code: "codeworth10", discount: "10%", type: "percent", uses: 12, limit: 50, active: true, expires: "2026-12-31" },
  { code: "SPRING2026", discount: "500 ₴", type: "fixed", uses: 5, limit: 20, active: true, expires: "2026-05-31" },
  { code: "LAUNCH15", discount: "15%", type: "percent", uses: 30, limit: 30, active: false, expires: "2026-01-31" },
];

const MOCK_REVIEWS = [
  { id: 1, client: "Олег К.", product: "Ресторан / Кафе", rating: 5, text: "Сайт запустили за 12 днів. Чудово!", status: "published", date: "2026-03-14" },
  { id: 2, client: "Тетяна Б.", product: "Фотограф", rating: 5, text: "Менеджер весь час на зв'язку, результат відмінний.", status: "pending", date: "2026-03-20" },
  { id: 3, client: "Сергій М.", product: "Автосервіс", rating: 4, text: "Добрий результат, є дрібні побажання.", status: "pending", date: "2026-03-19" },
];


function KPI({ label, value, delta, positive, isUk }: { label: string; value: string; delta: string; positive: boolean; isUk: boolean }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className="text-sm text-gray-500 mb-2">{label}</div>
      <div className="text-2xl font-bold text-gray-900 mb-2">{value}</div>
      <div className={`flex items-center gap-1 text-xs font-medium ${positive ? "text-green-600" : "text-red-500"}`}>
        {positive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
        {delta} {isUk ? "за місяць" : "this month"}
      </div>
    </div>
  );
}

function exportOrdersCSV(filter: string, isUk: boolean) {
  const rows = MOCK_ORDERS.filter(
    (o) =>
      !filter ||
      o.client.toLowerCase().includes(filter.toLowerCase()) ||
      o.id.toLowerCase().includes(filter.toLowerCase())
  );
  const header = isUk
    ? ["№ замовлення", "Клієнт", "Продукт", "Статус", "Сума (₴)", "Дата"]
    : ["Order #", "Client", "Product", "Status", "Amount (₴)", "Date"];
  const statusLabel: Record<string, string> = isUk
    ? { pending: "Очікує", in_progress: "В роботі", completed: "Завершено", cancelled: "Скасовано" }
    : { pending: "Pending", in_progress: "In Progress", completed: "Completed", cancelled: "Cancelled" };
  const csv = [
    header.join(";"),
    ...rows.map((o) =>
      [o.id, o.client, o.product, statusLabel[o.status] ?? o.status, o.amount, o.date].join(";")
    ),
  ].join("\n");

  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `codeworth-orders-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminClient() {
  const lang = useLocale();
  const isUk = lang === "uk";
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<AdminTab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orderFilter, setOrderFilter] = useState("");
  const [reviewStatuses, setReviewStatuses] = useState<Record<number, string>>({});
  const { toast } = useToast();

  const NAV: { id: AdminTab; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: "dashboard", label: isUk ? "Дашборд" : "Dashboard", icon: LayoutDashboard },
    { id: "products", label: isUk ? "Продукти" : "Products", icon: Package },
    { id: "orders", label: isUk ? "Замовлення" : "Orders", icon: ShoppingBag, badge: 2 },
    { id: "clients", label: isUk ? "Клієнти" : "Clients", icon: Users },
    { id: "reviews", label: isUk ? "Відгуки" : "Reviews", icon: Star, badge: 2 },
    { id: "analytics", label: isUk ? "Аналітика" : "Analytics", icon: BarChart2 },
    { id: "finances", label: isUk ? "Фінанси" : "Finances", icon: Wallet },
    { id: "settings", label: isUk ? "Налаштування" : "Settings", icon: Settings },
  ];

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.replace(`/${lang}/marketplace/login`);
    }
  }, [isLoading, user, router, lang]);

  if (isLoading || !user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" aria-label={isUk ? "Завантаження" : "Loading"} />
      </div>
    );
  }

  const approveReview = (id: number) => {
    setReviewStatuses((p) => ({ ...p, [id]: "published" }));
    toast("success", isUk ? `Відгук #${id} опубліковано` : `Review #${id} published`);
  };
  const rejectReview = (id: number) => {
    setReviewStatuses((p) => ({ ...p, [id]: "rejected" }));
    toast("warning", isUk ? `Відгук #${id} відхилено` : `Review #${id} rejected`);
  };

  const SidebarContent = ({ onClose }: { onClose?: () => void }) => (
    <>
      {/* Brand */}
      <div className="px-5 py-5 border-b border-white/10 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-sm">C</div>
          <div>
            <div className="font-bold text-sm">Codeworth</div>
            <div className="text-gray-400 text-xs">Admin Panel</div>
          </div>
        </Link>
        {onClose && (
          <button onClick={onClose} className="md:hidden text-gray-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = tab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => { setTab(item.id); onClose?.(); }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors ${
                active ? "bg-indigo-600 text-white" : "text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4" />
                {item.label}
              </div>
              {item.badge && (
                <span className="w-5 h-5 bg-amber-400 text-gray-900 rounded-full text-xs font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold">A</div>
          <div>
            <div className="text-sm font-medium">Admin</div>
            <div className="text-xs text-gray-400">admin@codeworth.uk</div>
          </div>
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
        >
          <LogOut className="w-4 h-4" /> {isUk ? "Вийти" : "Log Out"}
        </Link>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — desktop */}
      <aside className="w-60 bg-gray-950 text-white flex-col shrink-0 hidden md:flex">
        <SidebarContent />
      </aside>

      {/* Sidebar — mobile drawer */}
      <aside
        className={`fixed inset-y-0 left-0 w-60 bg-gray-950 text-white flex flex-col shrink-0 z-50 transition-transform duration-200 md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent onClose={() => setSidebarOpen(false)} />
      </aside>

      {/* Main */}
      <div className="flex-1 overflow-auto">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-100 px-4 md:px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden text-gray-500 hover:text-gray-900 p-1"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-bold text-gray-900">
              {NAV.find((n) => n.id === tab)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={`/${lang}/marketplace/catalog`}
              target="_blank"
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 transition-colors"
            >
              <ExternalLink className="w-4 h-4" /> {isUk ? "Відкрити сайт" : "View Site"}
            </Link>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100 px-4 md:px-6 py-2.5">
          <Breadcrumb
            items={[
              { label: isUk ? "Адмін" : "Admin", href: `/${lang}/admin/marketplace` },
              { label: NAV.find((n) => n.id === tab)?.label ?? "" },
            ]}
          />
        </div>

        <div className="p-6 space-y-6">
          {/* DASHBOARD */}
          {tab === "dashboard" && (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <KPI label={isUk ? "Дохід (березень)" : "Revenue (March)"} value="89 500 ₴" delta="+18%" positive={true} isUk={isUk} />
                <KPI label={isUk ? "Замовлень" : "Orders"} value="24" delta="+5" positive={true} isUk={isUk} />
                <KPI label={isUk ? "Нових клієнтів" : "New Clients"} value="18" delta="+3" positive={true} isUk={isUk} />
                <KPI label={isUk ? "Конверсія" : "Conversion"} value="4.2%" delta="-0.3%" positive={false} isUk={isUk} />
              </div>

              {/* Recent orders */}
              <div className="bg-white rounded-2xl border border-gray-100">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                  <h2 className="font-bold text-gray-900">{isUk ? "Нові замовлення" : "New Orders"}</h2>
                  <button
                    onClick={() => setTab("orders")}
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    {isUk ? "Всі замовлення" : "All Orders"}
                  </button>
                </div>
                <div className="divide-y divide-gray-50">
                  {MOCK_ORDERS.slice(0, 4).map((o) => {
                    const cfg = ORDER_STATUSES[o.status];
                    const Icon = cfg.icon;
                    return (
                      <div key={o.id} className="flex items-center gap-4 px-6 py-4">
                        <span className="font-mono text-xs text-gray-400 w-16 shrink-0">{o.id}</span>
                        <span className="flex-1 text-sm font-medium text-gray-900 truncate">{o.client}</span>
                        <span className="text-sm text-gray-500 hidden sm:block truncate max-w-[140px]">{o.product}</span>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.color}`}>
                          <Icon className="w-3 h-3" />{getOrderStatusLabel(o.status, isUk)}
                        </span>
                        <span className="text-sm font-semibold text-gray-900 w-24 text-right shrink-0">
                          {o.amount.toLocaleString("uk-UA")} ₴
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick stats */}
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { label: isUk ? "Топ продукт" : "Top Product", value: "Ресторан / Кафе", sub: isUk ? "8 продажів цього місяця" : "8 sales this month", emoji: "🍽" },
                  { label: isUk ? "Середній чек" : "Avg. Order Value", value: "14 200 ₴", sub: isUk ? "+800 ₴ до попереднього місяця" : "+800 ₴ vs last month", emoji: "💰" },
                  { label: isUk ? "Відгуків на модерації" : "Reviews Pending", value: "2", sub: isUk ? "Очікують вашого рішення" : "Awaiting your decision", emoji: "⭐" },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5">
                    <div className="text-3xl mb-3">{s.emoji}</div>
                    <div className="text-xs text-gray-500 mb-1">{s.label}</div>
                    <div className="font-bold text-gray-900">{s.value}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{s.sub}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* PRODUCTS */}
          {tab === "products" && (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      placeholder={isUk ? "Пошук продуктів..." : "Search products..."}
                      className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 w-56"
                    />
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors">
                  <Plus className="w-4 h-4" /> {isUk ? "Додати продукт" : "Add Product"}
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="grid grid-cols-6 text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-3 bg-gray-50 border-b border-gray-100">
                  <span className="col-span-2">{isUk ? "Продукт" : "Product"}</span>
                  <span>{isUk ? "Категорія" : "Category"}</span>
                  <span>{isUk ? "Ціна від" : "Price from"}</span>
                  <span>{isUk ? "Складність" : "Complexity"}</span>
                  <span>{isUk ? "Дії" : "Actions"}</span>
                </div>
                <div className="divide-y divide-gray-50 max-h-[480px] overflow-auto">
                  {NICHES_DATA.map((n) => (
                    <div key={n.slug} className="grid grid-cols-6 items-center px-5 py-3 hover:bg-gray-50 transition-colors">
                      <div className="col-span-2 flex items-center gap-3">
                        <span className="text-xl">{n.emoji}</span>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{n.title}</div>
                          <div className="text-xs text-gray-400">/niches/{n.slug}</div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 truncate">{n.category}</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {n.priceFrom.toLocaleString("uk-UA")} ₴
                      </span>
                      <span className={`text-xs font-medium inline-block px-2 py-0.5 rounded-full ${
                        n.complexity === "simple" ? "bg-green-100 text-green-700" :
                        n.complexity === "medium" ? "bg-amber-100 text-amber-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {n.complexity === "simple" ? (isUk ? "Простий" : "Simple") : n.complexity === "medium" ? (isUk ? "Середній" : "Medium") : (isUk ? "Складний" : "Complex")}
                      </span>
                      <div className="flex items-center gap-1">
                        <Link
                          href={`/${lang}/marketplace/product/${n.slug}`}
                          target="_blank"
                          className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <button className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ORDERS */}
          {tab === "orders" && (
            <>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    value={orderFilter}
                    onChange={(e) => setOrderFilter(e.target.value)}
                    placeholder={isUk ? "Пошук за клієнтом або №..." : "Search by client or order #..."}
                    className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 w-64"
                  />
                </div>
                <select className="py-2 px-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 text-gray-700">
                  <option>{isUk ? "Всі статуси" : "All Statuses"}</option>
                  <option>{isUk ? "Очікує" : "Pending"}</option>
                  <option>{isUk ? "В роботі" : "In Progress"}</option>
                  <option>{isUk ? "Завершено" : "Completed"}</option>
                </select>
                <button
                  onClick={() => {
                    exportOrdersCSV(orderFilter, isUk);
                    toast("success", isUk ? "CSV файл згенеровано" : "CSV file generated");
                  }}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 ml-auto"
                >
                  <Download className="w-4 h-4" /> {isUk ? "Експорт CSV" : "Export CSV"}
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="grid grid-cols-6 text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-3 bg-gray-50 border-b border-gray-100">
                  <span>#</span>
                  <span>{isUk ? "Клієнт" : "Client"}</span>
                  <span className="col-span-2">{isUk ? "Продукт" : "Product"}</span>
                  <span>{isUk ? "Статус" : "Status"}</span>
                  <span className="text-right">{isUk ? "Сума" : "Amount"}</span>
                </div>
                <div className="divide-y divide-gray-50">
                  {MOCK_ORDERS
                    .filter((o) =>
                      !orderFilter ||
                      o.client.toLowerCase().includes(orderFilter.toLowerCase()) ||
                      o.id.toLowerCase().includes(orderFilter.toLowerCase())
                    )
                    .map((o) => {
                      const cfg = ORDER_STATUSES[o.status];
                      const Icon = cfg.icon;
                      return (
                        <div key={o.id} className="grid grid-cols-6 items-center px-5 py-4 hover:bg-gray-50 transition-colors">
                          <span className="font-mono text-xs text-gray-500">{o.id}</span>
                          <span className="text-sm font-medium text-gray-900 truncate">{o.client}</span>
                          <span className="col-span-2 text-sm text-gray-600 truncate">{o.product}</span>
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium w-fit ${cfg.color}`}>
                            <Icon className="w-3 h-3" />{getOrderStatusLabel(o.status, isUk)}
                          </span>
                          <div className="flex items-center justify-end gap-2">
                            <span className="text-sm font-bold text-gray-900">
                              {o.amount.toLocaleString("uk-UA")} ₴
                            </span>
                            <select
                              className="text-xs border border-gray-200 rounded-lg px-2 py-1 text-gray-600 focus:outline-none"
                              defaultValue={o.status}
                            >
                              <option value="pending">{isUk ? "Очікує" : "Pending"}</option>
                              <option value="in_progress">{isUk ? "В роботі" : "In Progress"}</option>
                              <option value="completed">{isUk ? "Завершено" : "Completed"}</option>
                              <option value="cancelled">{isUk ? "Скасовано" : "Cancelled"}</option>
                            </select>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </>
          )}

          {/* CLIENTS */}
          {tab === "clients" && (
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="grid grid-cols-5 text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-3 bg-gray-50 border-b border-gray-100">
                <span className="col-span-2">{isUk ? "Клієнт" : "Client"}</span>
                <span>{isUk ? "Замовлень" : "Orders"}</span>
                <span>{isUk ? "Витрати" : "Total Spent"}</span>
                <span>{isUk ? "Дата реєстрації" : "Registered"}</span>
              </div>
              <div className="divide-y divide-gray-50">
                {MOCK_CLIENTS.map((c) => (
                  <div key={c.id} className="grid grid-cols-5 items-center px-5 py-4 hover:bg-gray-50 transition-colors">
                    <div className="col-span-2 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold flex items-center justify-center shrink-0">
                        {c.name[0]}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{c.name}</div>
                        <div className="text-xs text-gray-400">{c.email}</div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-700 font-semibold">{c.orders}</span>
                    <span className="text-sm font-bold text-gray-900">
                      {c.total.toLocaleString("uk-UA")} ₴
                    </span>
                    <span className="text-xs text-gray-500">{c.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* REVIEWS */}
          {tab === "reviews" && (
            <div className="space-y-4">
              {MOCK_REVIEWS.map((r) => {
                const currentStatus = reviewStatuses[r.id] ?? r.status;
                return (
                  <div key={r.id} className="bg-white rounded-2xl border border-gray-100 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold text-gray-900 text-sm">{r.client}</span>
                          <span className="text-xs text-gray-400">{r.product}</span>
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span key={i} className={`text-sm ${i < r.rating ? "text-amber-400" : "text-gray-200"}`}>★</span>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 italic">"{r.text}"</p>
                        <div className="text-xs text-gray-400 mt-2">{r.date}</div>
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          currentStatus === "published" ? "bg-green-100 text-green-700" :
                          currentStatus === "rejected" ? "bg-red-100 text-red-700" :
                          "bg-amber-100 text-amber-700"
                        }`}>
                          {currentStatus === "published" ? (isUk ? "Опубліковано" : "Published") :
                           currentStatus === "rejected" ? (isUk ? "Відхилено" : "Rejected") : (isUk ? "На модерації" : "Pending Review")}
                        </span>
                        {currentStatus === "pending" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => approveReview(r.id)}
                              className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700 transition-colors"
                            >
                              {isUk ? "Схвалити" : "Approve"}
                            </button>
                            <button
                              onClick={() => rejectReview(r.id)}
                              className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-xs font-medium hover:bg-red-200 transition-colors"
                            >
                              {isUk ? "Відхилити" : "Reject"}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ANALYTICS */}
          {tab === "analytics" && (
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <KPI label={isUk ? "Перегляди каталогу" : "Catalog Views"} value="3 240" delta="+22%" positive={true} isUk={isUk} />
                <KPI label={isUk ? "Відкриття продуктів" : "Product Opens"} value="1 180" delta="+15%" positive={true} isUk={isUk} />
                <KPI label={isUk ? "Замовлення" : "Orders"} value="24" delta="+5" positive={true} isUk={isUk} />
                <KPI label={isUk ? "Конверсія" : "Conversion"} value="4.2%" delta="-0.3%" positive={false} isUk={isUk} />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {/* Top products */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h2 className="font-bold text-gray-900 mb-5">{isUk ? "Топ продукти" : "Top Products"}</h2>
                  <div className="space-y-3">
                    {[
                      { name: "Ресторан / Кафе", emoji: "🍽", sales: 8, pct: 100 },
                      { name: "Салон краси", emoji: "💇", sales: 6, pct: 75 },
                      { name: "Медична клініка", emoji: "🏥", sales: 5, pct: 63 },
                      { name: "Фітнес-клуб", emoji: "💪", sales: 4, pct: 50 },
                      { name: "Юридичні послуги", emoji: "⚖️", sales: 3, pct: 38 },
                    ].map((p) => (
                      <div key={p.name}>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <div className="flex items-center gap-2">
                            <span>{p.emoji}</span>
                            <span className="text-gray-700">{p.name}</span>
                          </div>
                          <span className="font-semibold text-gray-900">{p.sales}</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${p.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Revenue by month */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h2 className="font-bold text-gray-900 mb-5">{isUk ? "Дохід по місяцях" : "Revenue by Month"}</h2>
                  <div className="space-y-3">
                    {[
                      { month: "Листопад 2025", revenue: 52000 },
                      { month: "Грудень 2025", revenue: 61000 },
                      { month: "Січень 2026", revenue: 68500 },
                      { month: "Лютий 2026", revenue: 75800 },
                      { month: "Березень 2026", revenue: 89500 },
                    ].map((m) => (
                      <div key={m.month}>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600">{m.month}</span>
                          <span className="font-semibold text-gray-900">
                            {m.revenue.toLocaleString("uk-UA")} ₴
                          </span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-600 rounded-full"
                            style={{ width: `${Math.round((m.revenue / 89500) * 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FINANCES */}
          {tab === "finances" && (
            <div className="space-y-6">
              {/* KPIs */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <KPI label={isUk ? "Дохід (березень)" : "Revenue (March)"} value="89 500 ₴" delta="+18%" positive={true} isUk={isUk} />
                <KPI label={isUk ? "Транзакцій" : "Transactions"} value="7" delta="+2" positive={true} isUk={isUk} />
                <KPI label={isUk ? "Очікує оплати" : "Awaiting Payment"} value="21 450 ₴" delta="+3" positive={false} isUk={isUk} />
                <KPI label={isUk ? "Повернень" : "Refunds"} value="1" delta="0" positive={true} isUk={isUk} />
              </div>

              {/* Revenue by period */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-bold text-gray-900 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-indigo-600" /> {isUk ? "Звіт про дохід по місяцях" : "Monthly Revenue Report"}
                  </h2>
                  <button className="flex items-center gap-1.5 text-sm text-gray-500 border border-gray-200 rounded-xl px-3 py-1.5 hover:bg-gray-50">
                    <Download className="w-3.5 h-3.5" /> {isUk ? "Завантажити" : "Download"}
                  </button>
                </div>
                <div className="space-y-3">
                  {[
                    { month: "Листопад 2025", revenue: 52000, txn: 9 },
                    { month: "Грудень 2025", revenue: 61000, txn: 11 },
                    { month: "Січень 2026", revenue: 68500, txn: 13 },
                    { month: "Лютий 2026", revenue: 75800, txn: 15 },
                    { month: "Березень 2026", revenue: 89500, txn: 17 },
                  ].map((m) => (
                    <div key={m.month} className="grid grid-cols-[1fr_auto_auto] items-center gap-4">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600">{m.month}</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${Math.round((m.revenue / 89500) * 100)}%` }} />
                        </div>
                      </div>
                      <span className="text-sm text-gray-400 whitespace-nowrap">{m.txn} {isUk ? "транз." : "txn."}</span>
                      <span className="text-sm font-semibold text-gray-900 text-right w-24">{m.revenue.toLocaleString("uk-UA")} ₴</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transaction history */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                  <h2 className="font-bold text-gray-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-600" /> {isUk ? "Історія транзакцій" : "Transaction History"}
                  </h2>
                  <button
                    onClick={() => {
                      const csv = ["ID;Дата;Клієнт;Продукт;Сума;Метод;Статус", ...MOCK_TRANSACTIONS.map(t =>
                        [t.id, t.date, t.client, t.product, t.amount, t.method, t.status].join(";")
                      )].join("\n");
                      const b = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
                      const u = URL.createObjectURL(b);
                      const a = document.createElement("a"); a.href = u; a.download = "transactions.csv"; a.click(); URL.revokeObjectURL(u);
                    }}
                    className="flex items-center gap-1.5 text-sm text-gray-500 border border-gray-200 rounded-xl px-3 py-1.5 hover:bg-gray-50"
                  >
                    <Download className="w-3.5 h-3.5" /> CSV
                  </button>
                </div>
                <div className="grid grid-cols-6 text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-3 bg-gray-50 border-b border-gray-100">
                  <span>ID</span><span>{isUk ? "Дата" : "Date"}</span><span>{isUk ? "Клієнт" : "Client"}</span><span>{isUk ? "Метод" : "Method"}</span><span className="col-span-1">{isUk ? "Статус" : "Status"}</span><span className="text-right">{isUk ? "Сума" : "Amount"}</span>
                </div>
                <div className="divide-y divide-gray-50">
                  {MOCK_TRANSACTIONS.map((t) => (
                    <div key={t.id} className="grid grid-cols-6 items-center px-5 py-3 hover:bg-gray-50 text-sm">
                      <span className="font-mono text-xs text-gray-400">{t.id}</span>
                      <span className="text-gray-500 text-xs">{t.date}</span>
                      <span className="text-gray-700 truncate">{t.client}</span>
                      <span className="text-xs text-gray-500">{t.method}</span>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium w-fit ${
                        t.status === "success" ? "bg-green-100 text-green-700" :
                        t.status === "pending" ? "bg-amber-100 text-amber-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {t.status === "success" ? (isUk ? "Успішно" : "Success") : t.status === "pending" ? (isUk ? "Очікує" : "Pending") : (isUk ? "Повернення" : "Refunded")}
                      </span>
                      <span className="text-sm font-semibold text-gray-900 text-right">{t.amount.toLocaleString("uk-UA")} ₴</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Invoices */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                  <h2 className="font-bold text-gray-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-600" /> {isUk ? "Інвойси та квитанції" : "Invoices & Receipts"}
                  </h2>
                </div>
                <div className="grid grid-cols-6 text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-3 bg-gray-50 border-b border-gray-100">
                  <span>#</span><span>{isUk ? "Клієнт" : "Client"}</span><span>{isUk ? "Замовлення" : "Order"}</span><span>{isUk ? "Термін" : "Due"}</span><span>{isUk ? "Статус" : "Status"}</span><span className="text-right">{isUk ? "Сума" : "Amount"}</span>
                </div>
                <div className="divide-y divide-gray-50">
                  {MOCK_ADMIN_INVOICES.map((inv) => (
                    <div key={inv.id} className="grid grid-cols-6 items-center px-5 py-3 hover:bg-gray-50 text-sm">
                      <span className="font-mono text-xs text-gray-500">{inv.id}</span>
                      <span className="text-gray-700 text-xs truncate">{inv.client}</span>
                      <span className="text-xs text-gray-500">#{inv.order}</span>
                      <span className="text-xs text-gray-500">{inv.due}</span>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium w-fit ${
                        inv.status === "paid" ? "bg-green-100 text-green-700" :
                        inv.status === "pending" ? "bg-amber-100 text-amber-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {inv.status === "paid" ? (isUk ? "Сплачено" : "Paid") : inv.status === "pending" ? (isUk ? "Очікує" : "Pending") : (isUk ? "Прострочено" : "Overdue")}
                      </span>
                      <div className="flex items-center justify-end gap-2">
                        <span className="font-semibold text-gray-900">{inv.amount.toLocaleString("uk-UA")} ₴</span>
                        <button className="p-1 text-gray-400 hover:text-indigo-600 transition-colors">
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Promo codes */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-bold text-gray-900 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-indigo-600" /> {isUk ? "Промокоди та знижки" : "Promo Codes & Discounts"}
                  </h2>
                  <button className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors">
                    <Plus className="w-4 h-4" /> {isUk ? "Додати" : "Add"}
                  </button>
                </div>
                <div className="space-y-3">
                  {MOCK_PROMO_CODES.map((promo) => (
                    <div key={promo.code} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50">
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1.5 rounded-lg font-mono text-sm font-bold ${
                          promo.active ? "bg-indigo-50 text-indigo-700" : "bg-gray-100 text-gray-400"
                        }`}>
                          {promo.code}
                        </span>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{isUk ? "Знижка" : "Discount"} {promo.discount}</div>
                          <div className="text-xs text-gray-400">{isUk ? "Використань:" : "Uses:"} {promo.uses}/{promo.limit} · {isUk ? "до" : "until"} {promo.expires}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          promo.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                        }`}>
                          {promo.active ? (isUk ? "Активний" : "Active") : (isUk ? "Вимкнено" : "Inactive")}
                        </span>
                        <button className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SETTINGS */}
          {tab === "settings" && (
            <div className="space-y-6 max-w-2xl">
              {[
                {
                  title: isUk ? "Платіжні методи" : "Payment Methods",
                  items: isUk
                    ? ["LiqPay (активний)", "Stripe (налаштувати)", "WayForPay (налаштувати)"]
                    : ["LiqPay (active)", "Stripe (configure)", "WayForPay (configure)"],
                },
                {
                  title: isUk ? "Email-шаблони" : "Email Templates",
                  items: isUk
                    ? ["Підтвердження замовлення", "Зміна статусу", "Завершення проєкту"]
                    : ["Order Confirmation", "Status Change", "Project Completion"],
                },
                {
                  title: isUk ? "Промокоди" : "Promo Codes",
                  items: isUk
                    ? ["CODENEST10 — 10% знижка (активний)", "+ Додати промокод"]
                    : ["CODENEST10 — 10% discount (active)", "+ Add promo code"],
                },
              ].map((s) => (
                <div key={s.title} className="bg-white rounded-2xl border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-gray-900">{s.title}</h2>
                    <button className="text-sm text-indigo-600 hover:underline">{isUk ? "Редагувати" : "Edit"}</button>
                  </div>
                  <ul className="space-y-2">
                    {s.items.map((item) => (
                      <li key={item} className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
