"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingBag,
  Globe,
  CreditCard,
  Settings,
  Bell,
  LogOut,
  ChevronRight,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Download,
  MessageSquare,
  ExternalLink,
  User,
  Lock,
  Mail,
  Phone,
  FileArchive,
  Send,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/Skeleton";
import { useLocale } from "@/components/layout/LocaleProvider";
import { useToast } from "@/components/ui/Toast";

type Tab = "dashboard" | "orders" | "projects" | "invoices" | "settings" | "support";

const STATUS_COLORS = {
  pending: "bg-amber-100 text-amber-700",
  in_progress: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};
const STATUS_ICONS = { pending: Clock, in_progress: AlertCircle, completed: CheckCircle, cancelled: XCircle };

const MOCK_FILES_UK: Record<string, { name: string; type: string; size: string; date: string }[]> = {
  "CN-4821": [
    { name: "demo-restaurant.zip", type: "Демо-версія", size: "4.2 MB", date: "2026-03-12" },
    { name: "restaurant-final-v1.zip", type: "Фінальна версія", size: "8.7 MB", date: "2026-03-14" },
    { name: "assets-brand.zip", type: "Брендові матеріали", size: "1.1 MB", date: "2026-03-14" },
  ],
};

const MOCK_FILES_EN: Record<string, { name: string; type: string; size: string; date: string }[]> = {
  "CN-4821": [
    { name: "demo-restaurant.zip", type: "Demo version", size: "4.2 MB", date: "2026-03-12" },
    { name: "restaurant-final-v1.zip", type: "Final version", size: "8.7 MB", date: "2026-03-14" },
    { name: "assets-brand.zip", type: "Brand materials", size: "1.1 MB", date: "2026-03-14" },
  ],
};

const MOCK_MESSAGES_UK = [
  { id: 1, from: "manager", name: "Дмитро (менеджер)", text: "Вітаємо! Ваше замовлення прийнято в роботу. Очікуйте першу версію через 5–7 днів.", date: "2026-03-10 10:15", avatar: "Д" },
  { id: 2, from: "client", name: "Ви", text: "Дякую! Чи можна додати блок онлайн-бронювання столиків?", date: "2026-03-10 11:42", avatar: "О" },
  { id: 3, from: "manager", name: "Дмитро (менеджер)", text: "Звісно, включимо в базовий функціонал. Зробимо вибір дати + підтвердження на email.", date: "2026-03-10 12:05", avatar: "Д" },
  { id: 4, from: "manager", name: "Дмитро (менеджер)", text: "Демо-версія готова: https://demo-restaurant.vercel.app — перевірте та залишіть коментарі.", date: "2026-03-12 16:30", avatar: "Д" },
  { id: 5, from: "client", name: "Ви", text: "Виглядає чудово! Тільки невеликий коментар щодо кольору кнопок — можна зробити трохи темніші?", date: "2026-03-13 09:20", avatar: "О" },
  { id: 6, from: "manager", name: "Дмитро (менеджер)", text: "Виправили, фінальна версія завантажена. Сайт готовий до запуску 🎉", date: "2026-03-14 14:00", avatar: "Д" },
];

const MOCK_MESSAGES_EN = [
  { id: 1, from: "manager", name: "Dmytro (manager)", text: "Welcome! Your order has been accepted. Expect the first version in 5–7 days.", date: "2026-03-10 10:15", avatar: "D" },
  { id: 2, from: "client", name: "You", text: "Thank you! Can you add an online table booking block?", date: "2026-03-10 11:42", avatar: "Y" },
  { id: 3, from: "manager", name: "Dmytro (manager)", text: "Of course, we'll include it in the base functionality. We'll add date selection + email confirmation.", date: "2026-03-10 12:05", avatar: "D" },
  { id: 4, from: "manager", name: "Dmytro (manager)", text: "Demo is ready: https://demo-restaurant.vercel.app — please review and leave your comments.", date: "2026-03-12 16:30", avatar: "D" },
  { id: 5, from: "client", name: "You", text: "Looks great! Just a small comment about the button color — could they be a bit darker?", date: "2026-03-13 09:20", avatar: "Y" },
  { id: 6, from: "manager", name: "Dmytro (manager)", text: "Fixed! Final version uploaded. The site is ready to launch 🎉", date: "2026-03-14 14:00", avatar: "D" },
];

const MOCK_ORDERS_UK = [
  {
    id: "CN-4821",
    date: "2026-03-10",
    product: "Ресторан / Кафе",
    emoji: "🍽",
    package: "Розширений",
    status: "completed" as const,
    amount: 13600,
    siteUrl: "https://demo-restaurant.vercel.app",
  },
  {
    id: "CN-4756",
    date: "2026-02-25",
    product: "Салон краси / Барбершоп",
    emoji: "💇",
    package: "Преміум",
    status: "in_progress" as const,
    amount: 22500,
    siteUrl: null,
  },
  {
    id: "CN-4699",
    date: "2026-01-18",
    product: "SEO-просування",
    emoji: "📈",
    package: "Базовий",
    status: "pending" as const,
    amount: 8000,
    siteUrl: null,
  },
];

const MOCK_ORDERS_EN = [
  {
    id: "CN-4821",
    date: "2026-03-10",
    product: "Restaurant / Café",
    emoji: "🍽",
    package: "Extended",
    status: "completed" as const,
    amount: 13600,
    siteUrl: "https://demo-restaurant.vercel.app",
  },
  {
    id: "CN-4756",
    date: "2026-02-25",
    product: "Beauty Salon / Barbershop",
    emoji: "💇",
    package: "Premium",
    status: "in_progress" as const,
    amount: 22500,
    siteUrl: null,
  },
  {
    id: "CN-4699",
    date: "2026-01-18",
    product: "SEO Promotion",
    emoji: "📈",
    package: "Basic",
    status: "pending" as const,
    amount: 8000,
    siteUrl: null,
  },
];

const MOCK_PROJECTS_UK = [
  {
    id: 1,
    name: "Ресторан «Смак»",
    url: "smak-restaurant.com.ua",
    launchDate: "2026-03-15",
    hosting: "Активний до 2027-03-15",
    status: "active",
    emoji: "🍽",
  },
  {
    id: 2,
    name: "Beauty Studio Lena",
    url: "beauty-lena.com.ua",
    launchDate: "2025-11-01",
    hosting: "Активний до 2026-11-01",
    status: "active",
    emoji: "💇",
  },
];

const MOCK_PROJECTS_EN = [
  {
    id: 1,
    name: "Restaurant «Smak»",
    url: "smak-restaurant.com.ua",
    launchDate: "2026-03-15",
    hosting: "Active until 2027-03-15",
    status: "active",
    emoji: "🍽",
  },
  {
    id: 2,
    name: "Beauty Studio Lena",
    url: "beauty-lena.com.ua",
    launchDate: "2025-11-01",
    hosting: "Active until 2026-11-01",
    status: "active",
    emoji: "💇",
  },
];

const MOCK_INVOICES = [
  { id: "INV-221", date: "2026-03-10", amount: 13600, status: "paid", order: "CN-4821" },
  { id: "INV-198", date: "2026-02-25", amount: 11250, status: "paid", order: "CN-4756" },
  { id: "INV-199", date: "2026-03-15", amount: 11250, status: "pending", order: "CN-4756" },
];


function StatusBadge({ status }: { status: keyof typeof STATUS_COLORS }) {
  const lang = useLocale();
  const isUk = lang === "uk";
  const labels: Record<keyof typeof STATUS_COLORS, string> = {
    pending: isUk ? "Очікує" : "Pending",
    in_progress: isUk ? "В роботі" : "In Progress",
    completed: isUk ? "Завершено" : "Completed",
    cancelled: isUk ? "Скасовано" : "Cancelled",
  };
  const Icon = STATUS_ICONS[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[status]}`}>
      <Icon className="w-3 h-3" />
      {labels[status]}
    </span>
  );
}

export default function AccountClient() {
  const lang = useLocale();
  const isUk = lang === "uk";
  const MOCK_FILES = isUk ? MOCK_FILES_UK : MOCK_FILES_EN;
  const MOCK_MESSAGES = isUk ? MOCK_MESSAGES_UK : MOCK_MESSAGES_EN;
  const MOCK_ORDERS = isUk ? MOCK_ORDERS_UK : MOCK_ORDERS_EN;
  const MOCK_PROJECTS = isUk ? MOCK_PROJECTS_UK : MOCK_PROJECTS_EN;
  const [tab, setTab] = useState<Tab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const { toast } = useToast();

  const NAV_ITEMS: { id: Tab; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: "dashboard", label: isUk ? "Огляд" : "Overview", icon: LayoutDashboard },
    { id: "orders", label: isUk ? "Замовлення" : "Orders", icon: ShoppingBag, badge: 1 },
    { id: "projects", label: isUk ? "Мої сайти" : "My Sites", icon: Globe },
    { id: "invoices", label: isUk ? "Рахунки" : "Invoices", icon: CreditCard },
    { id: "support", label: isUk ? "Підтримка" : "Support", icon: MessageSquare },
    { id: "settings", label: isUk ? "Налаштування" : "Settings", icon: Settings },
  ];

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(`/${lang}/marketplace/login`);
    }
  }, [isLoading, isAuthenticated, router, lang]);

  const handleLogout = () => {
    logout();
    toast("info", isUk ? "Ви вийшли з акаунта" : "You've signed out");
    router.push(`/${lang}/marketplace/login`);
  };

  // Show loading skeleton while hydrating auth
  if (isLoading || !isAuthenticated || !user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="space-y-3 w-64">
          <Skeleton className="h-8 w-full rounded-xl" />
          <Skeleton className="h-4 w-3/4 rounded-lg" />
          <Skeleton className="h-4 w-1/2 rounded-lg" />
        </div>
      </div>
    );
  }

  const initials = `${user.firstName[0] ?? ""}${user.lastName[0] ?? ""}`.toUpperCase();
  const displayName = `${user.firstName} ${user.lastName}`;

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Top bar */}
      <div className="bg-indigo-950 text-white">
        <Container className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-sm">
              {initials}
            </div>
            <div>
              <div className="font-semibold text-sm">{displayName}</div>
              <div className="text-indigo-300 text-xs">{user.email}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-amber-400 rounded-full"></span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-indigo-300 hover:text-white text-sm transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:block">{isUk ? "Вийти" : "Log Out"}</span>
            </button>
          </div>
        </Container>
      </div>

      <Container className="py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-56 shrink-0 hidden md:block">
            <nav className="bg-white rounded-2xl border border-gray-100 dark:border-neutral-700 overflow-hidden">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const active = tab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setTab(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors border-b border-gray-50 last:border-0 ${
                      active
                        ? "bg-indigo-50 text-indigo-700 font-semibold"
                        : "text-gray-600 dark:text-neutral-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${active ? "text-indigo-600" : "text-gray-400"}`} />
                      {item.label}
                    </div>
                    {item.badge && (
                      <span className="w-5 h-5 bg-amber-400 text-gray-900 dark:text-white rounded-full text-xs font-bold flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="mt-4 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
              <div className="text-xs font-semibold text-indigo-800 mb-1">{isUk ? "Потрібна допомога?" : "Need help?"}</div>
              <div className="text-xs text-indigo-600 mb-3">{isUk ? "Пишіть нам у Telegram" : "Message us on Telegram"}</div>
              <a
                href="https://t.me/codenest_ua"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-indigo-700 font-medium hover:underline"
              >
                @codeworth_uk <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </aside>

          {/* Mobile nav */}
          <div className="md:hidden w-full mb-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setTab(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                      tab === item.id
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-600 dark:text-neutral-300 border border-gray-200"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* DASHBOARD */}
            {tab === "dashboard" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold font-syne text-gray-900">
                    {isUk ? `Вітаємо, ${user.firstName}!` : `Welcome, ${user.firstName}!`} 👋
                  </h1>
                  <p className="text-gray-500 dark:text-neutral-400 text-sm mt-1">
                    {isUk ? "Ось поточний стан ваших проєктів" : "Here's the current status of your projects"}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { label: isUk ? "Замовлень" : "Orders", value: "3", icon: ShoppingBag, color: "bg-indigo-50 text-indigo-600" },
                    { label: isUk ? "Активних сайтів" : "Active Sites", value: "2", icon: Globe, color: "bg-green-50 text-green-600" },
                    { label: isUk ? "Витрачено" : "Total Spent", value: "44 100 ₴", icon: CreditCard, color: "bg-amber-50 text-amber-600" },
                  ].map((s) => (
                    <div key={s.label} className="bg-white rounded-2xl border border-gray-100 dark:border-neutral-700 p-5">
                      <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
                        <s.icon className="w-5 h-5" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{s.value}</div>
                      <div className="text-sm text-gray-500">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Recent orders */}
                <div className="bg-white rounded-2xl border border-gray-100 dark:border-neutral-700 p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="font-bold text-gray-900">{isUk ? "Останні замовлення" : "Recent Orders"}</h2>
                    <button
                      onClick={() => setTab("orders")}
                      className="text-sm text-indigo-600 hover:underline"
                    >
                      {isUk ? "Всі замовлення" : "All Orders"}
                    </button>
                  </div>
                  <div className="space-y-3">
                    {MOCK_ORDERS.slice(0, 2).map((o) => (
                      <div
                        key={o.id}
                        className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 dark:bg-neutral-900 hover:bg-gray-100 dark:hover:bg-neutral-700 dark:bg-neutral-800 transition-colors"
                      >
                        <span className="text-2xl">{o.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 dark:text-white text-sm truncate">{o.product}</div>
                          <div className="text-xs text-gray-400">#{o.id} · {o.date}</div>
                        </div>
                        <StatusBadge status={o.status} />
                        <div className="text-sm font-semibold text-gray-900 dark:text-white hidden sm:block">
                          {o.amount.toLocaleString("uk-UA")} ₴
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick actions */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => setTab("projects")}
                    className="bg-white rounded-2xl border border-gray-100 dark:border-neutral-700 p-5 flex items-center gap-4 hover:border-indigo-200 hover:shadow-sm transition-all text-left"
                  >
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <Globe className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white text-sm">{isUk ? "Мої сайти" : "My Sites"}</div>
                      <div className="text-xs text-gray-500">{isUk ? "2 активних проєкти" : "2 active projects"}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 dark:text-neutral-500 ml-auto" />
                  </button>
                  <Link
                    href={`/${lang}/marketplace/catalog`}
                    className="bg-white rounded-2xl border border-gray-100 dark:border-neutral-700 p-5 flex items-center gap-4 hover:border-indigo-200 hover:shadow-sm transition-all"
                  >
                    <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white text-sm">{isUk ? "Каталог рішень" : "Solutions Catalog"}</div>
                      <div className="text-xs text-gray-500">{isUk ? "Замовити ще один сайт" : "Order another website"}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 dark:text-neutral-500 ml-auto" />
                  </Link>
                </div>
              </div>
            )}

            {/* ORDERS */}
            {tab === "orders" && (
              <div className="space-y-5">
                <h1 className="text-2xl font-bold font-syne text-gray-900">{isUk ? "Мої замовлення" : "My Orders"}</h1>
                <div className="space-y-4">
                  {MOCK_ORDERS.map((o) => (
                    <div
                      key={o.id}
                      className="bg-white rounded-2xl border border-gray-100 dark:border-neutral-700 p-6"
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-3xl">{o.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 flex-wrap">
                            <div>
                              <div className="font-semibold text-gray-900">{o.product}</div>
                              <div className="text-sm text-gray-500 dark:text-neutral-400 mt-0.5">
                                #{o.id} · {isUk ? "Пакет:" : "Package:"} {o.package} · {o.date}
                              </div>
                            </div>
                            <StatusBadge status={o.status} />
                          </div>

                          {/* Progress bar */}
                          <div className="mt-4">
                            <div className="flex justify-between text-xs text-gray-500 dark:text-neutral-400 mb-1.5">
                              <span>{isUk ? "Прогрес виконання" : "Completion Progress"}</span>
                              <span>
                                {o.status === "completed" ? "100%" : o.status === "in_progress" ? "60%" : "10%"}
                              </span>
                            </div>
                            <div className="h-2 bg-gray-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all ${
                                  o.status === "completed"
                                    ? "bg-green-500 w-full"
                                    : o.status === "in_progress"
                                    ? "bg-blue-500 w-3/5"
                                    : "bg-amber-400 w-[10%]"
                                }`}
                              />
                            </div>
                            <div className="flex justify-between text-xs text-gray-400 dark:text-neutral-500 mt-1">
                              {(isUk
                              ? ["Прийнято", "В роботі", "Тестування", "Готово"]
                              : ["Accepted", "In Progress", "Testing", "Done"]
                            ).map((step, i) => (
                                <span
                                  key={step}
                                  className={
                                    (o.status === "completed") ||
                                    (o.status === "in_progress" && i < 2)
                                      ? "text-indigo-600 font-medium"
                                      : ""
                                  }
                                >
                                  {step}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Files & Archive */}
                          {MOCK_FILES[o.id] && (
                            <div className="mt-4 pt-4 border-t border-gray-50">
                              <div className="flex items-center gap-2 mb-3">
                                <FileArchive className="w-4 h-4 text-gray-400" />
                                <span className="text-xs font-semibold text-gray-700">{isUk ? "Файли та архів" : "Files & Archive"}</span>
                              </div>
                              <div className="space-y-2">
                                {MOCK_FILES[o.id].map((f) => (
                                  <div key={f.name} className="flex items-center justify-between py-2 px-3 rounded-xl bg-gray-50 dark:bg-neutral-900 hover:bg-gray-100 dark:hover:bg-neutral-700 dark:bg-neutral-800 transition-colors">
                                    <div>
                                      <div className="text-xs font-medium text-gray-800">{f.name}</div>
                                      <div className="text-xs text-gray-400">{f.type} · {f.size} · {f.date}</div>
                                    </div>
                                    <button className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-medium">
                                      <Download className="w-3.5 h-3.5" /> {isUk ? "Завантажити" : "Download"}
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                            <div className="font-bold text-gray-900">
                              {o.amount.toLocaleString("uk-UA")} ₴
                            </div>
                            <div className="flex gap-2">
                              {o.siteUrl && (
                                <a
                                  href={o.siteUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                                >
                                  <ExternalLink className="w-3 h-3" /> {isUk ? "Переглянути сайт" : "View Site"}
                                </a>
                              )}
                              <button
                                onClick={() => setTab("support")}
                                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-neutral-300 hover:bg-gray-200 transition-colors"
                              >
                                <MessageSquare className="w-3 h-3" /> {isUk ? "Підтримка" : "Support"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PROJECTS */}
            {tab === "projects" && (
              <div className="space-y-5">
                <h1 className="text-2xl font-bold font-syne text-gray-900">{isUk ? "Мої сайти" : "My Sites"}</h1>
                <div className="grid gap-4">
                  {MOCK_PROJECTS.map((p) => (
                    <div key={p.id} className="bg-white rounded-2xl border border-gray-100 dark:border-neutral-700 p-6">
                      <div className="flex items-start gap-4">
                        <span className="text-3xl">{p.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 flex-wrap">
                            <div className="font-semibold text-gray-900">{p.name}</div>
                            <span className="text-xs px-2.5 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                              {isUk ? "Активний" : "Active"}
                            </span>
                          </div>
                          <div className="mt-2 space-y-1 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <Globe className="w-3.5 h-3.5 shrink-0" />
                              <a
                                href={`https://${p.url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-600 hover:underline truncate"
                              >
                                {p.url}
                              </a>
                            </div>
                            <div>{isUk ? "Запущено:" : "Launched:"} {p.launchDate}</div>
                            <div>{isUk ? "Хостинг:" : "Hosting:"} {p.hosting}</div>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <a
                              href={`https://${p.url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
                            >
                              <ExternalLink className="w-3 h-3" /> {isUk ? "Відкрити сайт" : "Open Site"}
                            </a>
                            <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-neutral-300 hover:bg-gray-200 transition-colors">
                              {isUk ? "Продовжити хостинг" : "Renew Hosting"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* INVOICES */}
            {tab === "invoices" && (
              <div className="space-y-5">
                <h1 className="text-2xl font-bold font-syne text-gray-900">{isUk ? "Рахунки та оплата" : "Invoices & Payments"}</h1>
                <div className="bg-white rounded-2xl border border-gray-100 dark:border-neutral-700 overflow-hidden">
                  <div className="grid grid-cols-5 text-xs font-semibold text-gray-500 dark:text-neutral-400 uppercase tracking-wide px-5 py-3 bg-gray-50 dark:bg-neutral-900 border-b border-gray-100">
                    <span>{isUk ? "№ рахунку" : "Invoice #"}</span>
                    <span>{isUk ? "Дата" : "Date"}</span>
                    <span>{isUk ? "Замовлення" : "Order"}</span>
                    <span>{isUk ? "Сума" : "Amount"}</span>
                    <span>{isUk ? "Статус" : "Status"}</span>
                  </div>
                  {MOCK_INVOICES.map((inv) => (
                    <div
                      key={inv.id}
                      className="grid grid-cols-5 items-center px-5 py-4 border-b border-gray-50 last:border-0 text-sm"
                    >
                      <span className="font-mono text-gray-700">{inv.id}</span>
                      <span className="text-gray-500">{inv.date}</span>
                      <span className="text-gray-700">#{inv.order}</span>
                      <span className="font-semibold text-gray-900">
                        {inv.amount.toLocaleString("uk-UA")} ₴
                      </span>
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                            inv.status === "paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {inv.status === "paid" ? (isUk ? "Сплачено" : "Paid") : (isUk ? "Очікує оплати" : "Pending")}
                        </span>
                        <button className="p-1 text-gray-400 dark:text-neutral-500 hover:text-indigo-600 transition-colors">
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUPPORT */}
            {tab === "support" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold font-syne text-gray-900">{isUk ? "Підтримка" : "Support"}</h1>

                {/* Quick contacts */}
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { icon: "💬", title: "Telegram", sub: "@codeworth_uk", href: "https://t.me/codenest_ua" },
                    { icon: "📧", title: "Email", sub: "hello@codeworth.uk", href: "mailto:hello@codeworth.uk" },
                    { icon: "📞", title: isUk ? "Телефон" : "Phone", sub: "+38 000 000 00 00", href: "tel:+380000000000" },
                  ].map((c) => (
                    <a
                      key={c.title}
                      href={c.href}
                      className="bg-white rounded-2xl border border-gray-100 dark:border-neutral-700 p-5 hover:border-indigo-200 hover:shadow-sm transition-all block"
                    >
                      <div className="text-3xl mb-3">{c.icon}</div>
                      <div className="font-semibold text-gray-900 dark:text-white text-sm">{c.title}</div>
                      <div className="text-xs text-gray-500 dark:text-neutral-400 mt-0.5">{c.sub}</div>
                    </a>
                  ))}
                </div>

                {/* Communication history */}
                <div className="bg-white rounded-2xl border border-gray-100 dark:border-neutral-700 p-6">
                  <h2 className="font-bold text-gray-900 dark:text-white mb-5">{isUk ? "Історія комунікації — Замовлення #CN-4821" : "Communication History — Order #CN-4821"}</h2>
                  <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                    {MOCK_MESSAGES.map((msg) => {
                      const isClient = msg.from === "client";
                      return (
                        <div key={msg.id} className={`flex gap-3 ${isClient ? "flex-row-reverse" : ""}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                            isClient ? "bg-indigo-100 text-indigo-700" : "bg-gray-200 text-gray-600"
                          }`}>
                            {msg.avatar}
                          </div>
                          <div className={`max-w-[75%] ${isClient ? "items-end" : "items-start"} flex flex-col`}>
                            <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                              isClient
                                ? "bg-indigo-600 text-white rounded-tr-sm"
                                : "bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-neutral-200 rounded-tl-sm"
                            }`}>
                              {msg.text}
                            </div>
                            <span className="text-xs text-gray-400 dark:text-neutral-500 mt-1 px-1">{msg.date}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <input
                      type="text"
                      placeholder={isUk ? "Написати повідомлення..." : "Write a message..."}
                      className="flex-1 px-4 py-2.5 text-sm border border-gray-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                    <button className="p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Support form */}
                <div className="bg-white rounded-2xl border border-gray-100 dark:border-neutral-700 p-6">
                  <h2 className="font-bold text-gray-900 dark:text-white mb-5">{isUk ? "Нове звернення" : "New Request"}</h2>
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1.5">
                        {isUk ? "Тема" : "Subject"}
                      </label>
                      <select className="w-full px-4 py-2.5 text-sm border border-gray-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300">
                        <option>{isUk ? "Питання по замовленню" : "Order question"}</option>
                        <option>{isUk ? "Технічна проблема" : "Technical issue"}</option>
                        <option>{isUk ? "Зміна вимог" : "Change of requirements"}</option>
                        <option>{isUk ? "Оплата та рахунки" : "Payment & Invoices"}</option>
                        <option>{isUk ? "Інше" : "Other"}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1.5">
                        {isUk ? "Повідомлення" : "Message"}
                      </label>
                      <textarea
                        rows={4}
                        placeholder={isUk ? "Опишіть ваше питання..." : "Describe your question..."}
                        className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium text-sm hover:bg-indigo-700 transition-colors"
                    >
                      {isUk ? "Надіслати" : "Send"}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* SETTINGS */}
            {tab === "settings" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold font-syne text-gray-900">{isUk ? "Налаштування" : "Settings"}</h1>

                {/* Profile */}
                <div className="bg-white rounded-2xl border border-gray-100 dark:border-neutral-700 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <User className="w-5 h-5 text-gray-400" />
                    <h2 className="font-bold text-gray-900">{isUk ? "Особисті дані" : "Personal Information"}</h2>
                  </div>
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { label: isUk ? "Ім'я" : "First Name", value: user.firstName, icon: User },
                        { label: isUk ? "Прізвище" : "Last Name", value: user.lastName, icon: User },
                      ].map((f) => (
                        <div key={f.label}>
                          <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1.5">
                            {f.label}
                          </label>
                          <input
                            defaultValue={f.value}
                            className="w-full px-4 py-2.5 text-sm border border-gray-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1.5">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          defaultValue={user.email}
                          className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1.5">
                        {isUk ? "Телефон" : "Phone"}
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="tel"
                          defaultValue="+380 67 000 00 00"
                          className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium text-sm hover:bg-indigo-700 transition-colors"
                    >
                      {isUk ? "Зберегти зміни" : "Save Changes"}
                    </button>
                  </form>
                </div>

                {/* Password */}
                <div className="bg-white rounded-2xl border border-gray-100 dark:border-neutral-700 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Lock className="w-5 h-5 text-gray-400" />
                    <h2 className="font-bold text-gray-900">{isUk ? "Зміна пароля" : "Change Password"}</h2>
                  </div>
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    {(isUk
                      ? ["Поточний пароль", "Новий пароль", "Підтвердити пароль"]
                      : ["Current Password", "New Password", "Confirm Password"]
                    ).map((l) => (
                      <div key={l}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1.5">
                          {l}
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-2.5 text-sm border border-gray-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
                          placeholder="••••••••"
                        />
                      </div>
                    ))}
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium text-sm hover:bg-indigo-700 transition-colors"
                    >
                      {isUk ? "Змінити пароль" : "Change Password"}
                    </button>
                  </form>
                </div>

                {/* Notifications */}
                <div className="bg-white rounded-2xl border border-gray-100 dark:border-neutral-700 p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <Bell className="w-5 h-5 text-gray-400" />
                    <h2 className="font-bold text-gray-900">{isUk ? "Сповіщення" : "Notifications"}</h2>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: isUk ? "Email при зміні статусу замовлення" : "Email on order status change", defaultOn: true },
                      { label: isUk ? "SMS-підтвердження оплати" : "SMS payment confirmation", defaultOn: true },
                      { label: isUk ? "Telegram-сповіщення від менеджера" : "Telegram notifications from manager", defaultOn: true },
                      { label: isUk ? "Маркетингові розсилки" : "Marketing emails", defaultOn: false },
                    ].map((n) => (
                      <div key={n.label} className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">{n.label}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked={n.defaultOn}
                            className="sr-only peer"
                          />
                          <div className="w-10 h-5 rounded-full bg-gray-200 peer-checked:bg-indigo-600 transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Danger zone */}
                <div className="bg-red-50 rounded-2xl border border-red-100 p-6">
                  <h2 className="font-bold text-red-900 mb-2">{isUk ? "Небезпечна зона" : "Danger Zone"}</h2>
                  <p className="text-sm text-red-700 mb-4">
                    {isUk
                      ? "Видалення акаунту є незворотною дією. Всі ваші дані будуть видалені."
                      : "Account deletion is irreversible. All your data will be permanently deleted."}
                  </p>
                  <button className="px-4 py-2 border border-red-300 text-red-700 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors">
                    {isUk ? "Видалити акаунт" : "Delete Account"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
