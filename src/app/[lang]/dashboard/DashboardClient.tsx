"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Palette,
  BarChart2,
  CreditCard,
  HelpCircle,
  Settings,
  LogOut,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Save,
  Globe,
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Youtube,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Send,
  Menu,
  X,
  Zap,
  Users,
  MousePointer,
  Activity,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useLocale } from "@/components/layout/LocaleProvider";

type DashTab = "home" | "content" | "customizer" | "analytics" | "subscription" | "support" | "settings";

// ─── Color palettes ───────────────────────────────────────────────────────────
const PALETTES = [
  { id: "professional", name: "Professional", primary: "#1E1B4B", accent: "#7C3AED", bg: "#FAFAF9", preview: "bg-indigo-900" },
  { id: "ocean",        name: "Ocean",        primary: "#0F3460", accent: "#16213E", bg: "#E8F4F8", preview: "bg-blue-900" },
  { id: "forest",       name: "Forest",       primary: "#1A3C34", accent: "#2D6A4F", bg: "#F8FAF5", preview: "bg-emerald-900" },
  { id: "sunset",       name: "Sunset",       primary: "#7B2D00", accent: "#E85D04", bg: "#FFF8F0", preview: "bg-orange-900" },
  { id: "rose",         name: "Rose",         primary: "#831843", accent: "#DB2777", bg: "#FFF5F7", preview: "bg-pink-900" },
  { id: "midnight",     name: "Midnight",     primary: "#0F0E17", accent: "#6366F1", bg: "#1A1A2E", preview: "bg-gray-950" },
] as const;

// ─── Font pairs ───────────────────────────────────────────────────────────────
const FONT_PAIRS = [
  { id: "modern",   name: "Modern",   heading: "Inter",            body: "Inter",      sample: "Clean & Neutral" },
  { id: "classic",  name: "Classic",  heading: "Playfair Display", body: "Lora",       sample: "Elegant & Timeless" },
  { id: "tech",     name: "Tech",     heading: "Space Grotesk",    body: "DM Sans",    sample: "Technical & Bold" },
  { id: "friendly", name: "Friendly", heading: "Nunito",           body: "Open Sans",  sample: "Warm & Accessible" },
  { id: "bold",     name: "Bold",     heading: "Sora",             body: "Sora",       sample: "Modern & Strong" },
] as const;

// ─── Mock analytics data ──────────────────────────────────────────────────────
const MOCK_VISITORS = [120, 95, 140, 180, 160, 210, 195];
const MOCK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// ─── FAQ items ────────────────────────────────────────────────────────────────
const FAQ_EN = [
  { q: "How do I update my website content?", a: "Go to the Content tab, edit the fields you want to change, and click Save Changes. Updates go live within minutes." },
  { q: "Can I change the colors and fonts?", a: "Yes! Use the Customizer tab to pick from 6 color palettes and 5 font pairs. You can preview changes live and publish when ready." },
  { q: "How long does it take to launch my site?", a: "Your site goes live within 3–7 business days after your order. You'll receive an email confirmation once it's published." },
  { q: "Can I add more pages to my site?", a: "Yes, you can upgrade to Standard or Premium plan to add more pages and features. Contact us to discuss your needs." },
  { q: "How do I connect my domain?", a: "Contact our support team with your domain name and we'll handle the DNS configuration for you, usually within 24 hours." },
];
const FAQ_UK = [
  { q: "Як оновити контент мого сайту?", a: "Перейдіть у вкладку Контент, відредагуйте потрібні поля та натисніть «Зберегти». Зміни публікуються протягом кількох хвилин." },
  { q: "Чи можна змінити кольори та шрифти?", a: "Так! Використовуйте вкладку Кастомайзер — виберіть із 6 кольорових палет та 5 шрифтових пар. Зміни відображаються миттєво." },
  { q: "Скільки часу займає запуск сайту?", a: "Сайт запускається протягом 3–7 робочих днів після замовлення. Ви отримаєте email-підтвердження після публікації." },
  { q: "Чи можна додати більше сторінок?", a: "Так, оновіть план до Standard або Premium щоб додати більше сторінок і функцій. Зв'яжіться з нами для обговорення деталей." },
  { q: "Як підключити свій домен?", a: "Напишіть нашій підтримці з назвою домену — ми налаштуємо DNS для вас, зазвичай протягом 24 годин." },
];

// ─── KPI Card ─────────────────────────────────────────────────────────────────
function KPI({ icon: Icon, label, value, delta, positive }: {
  icon: React.ElementType; label: string; value: string; delta: string; positive: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 dark:border-neutral-700 p-5">
      <div className="flex items-center gap-2 text-gray-400 dark:text-neutral-500 mb-3">
        <Icon className="w-4 h-4" />
        <span className="text-sm">{label}</span>
      </div>
      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{value}</div>
      <div className={`flex items-center gap-1 text-xs font-medium ${positive ? "text-green-600" : "text-red-500"}`}>
        <TrendingUp className="w-3.5 h-3.5" />
        {delta}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function DashboardClient() {
  const lang = useLocale();
  const isUk = lang === "uk";
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const [tab, setTab] = useState<DashTab>("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  // Content tab state
  const [companyName, setCompanyName] = useState("My Business");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [heroHeading, setHeroHeading] = useState("");
  const [heroSub, setHeroSub] = useState("");
  const [heroCta, setHeroCta] = useState("");

  // Customizer tab state
  const [palette, setPalette] = useState("professional");
  const [fontPair, setFontPair] = useState("modern");
  const [custSaved, setCustSaved] = useState(false);

  // Support tab state
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [supportMsg, setSupportMsg] = useState("");
  const [supportSubject, setSupportSubject] = useState("");
  const [supportSent, setSupportSent] = useState(false);

  // Settings tab state
  const [notifEmail, setNotifEmail] = useState(true);
  const [pwSaved, setPwSaved] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace(`/${lang}/marketplace/login`);
    }
  }, [isLoading, user, router, lang]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const NAV: { id: DashTab; label: string; icon: React.ElementType }[] = [
    { id: "home",         label: isUk ? "Головна"     : "Home",         icon: LayoutDashboard },
    { id: "content",      label: isUk ? "Контент"     : "Content",      icon: FileText },
    { id: "customizer",   label: isUk ? "Кастомайзер" : "Customizer",   icon: Palette },
    { id: "analytics",    label: isUk ? "Аналітика"   : "Analytics",    icon: BarChart2 },
    { id: "subscription", label: isUk ? "Підписка"    : "Subscription", icon: CreditCard },
    { id: "support",      label: isUk ? "Підтримка"   : "Support",      icon: HelpCircle },
    { id: "settings",     label: isUk ? "Налаштування": "Settings",     icon: Settings },
  ];

  const handleSaveContent = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleSaveCustomizer = () => {
    setCustSaved(true);
    setTimeout(() => setCustSaved(false), 3000);
  };

  const handleSendSupport = () => {
    if (supportMsg.trim()) {
      setSupportSent(true);
      setSupportMsg("");
      setSupportSubject("");
    }
  };

  const SidebarContent = ({ onClose }: { onClose?: () => void }) => (
    <>
      <div className="px-5 py-5 border-b border-white/10 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-sm">C</div>
          <div>
            <div className="font-bold text-sm">Codeworth</div>
            <div className="text-gray-400 dark:text-neutral-500 text-xs">{isUk ? "Мій кабінет" : "My Dashboard"}</div>
          </div>
        </Link>
        {onClose && (
          <button onClick={onClose} className="md:hidden text-gray-400 dark:text-neutral-500 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = tab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => { setTab(item.id); onClose?.(); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                active ? "bg-indigo-600 text-white" : "text-gray-400 dark:text-neutral-500 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold uppercase">
            {user.email?.[0] ?? "U"}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-medium truncate">{user.email}</div>
            <div className="text-xs text-gray-400">{isUk ? "Клієнт" : "Client"}</div>
          </div>
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 dark:text-neutral-500 hover:text-white transition-colors rounded-lg hover:bg-white/10"
        >
          <LogOut className="w-4 h-4" /> {isUk ? "Вийти" : "Log Out"}
        </Link>
      </div>
    </>
  );

  const currentPalette = PALETTES.find((p) => p.id === palette) ?? PALETTES[0];
  const currentFont = FONT_PAIRS.find((f) => f.id === fontPair) ?? FONT_PAIRS[0];
  const faqItems = isUk ? FAQ_UK : FAQ_EN;
  const maxVisitors = Math.max(...MOCK_VISITORS);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
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
        <div className="bg-white border-b border-gray-100 dark:border-neutral-700 px-4 md:px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden text-gray-500 dark:text-neutral-400 hover:text-gray-900 dark:text-white p-1"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-bold text-gray-900">
              {NAV.find((n) => n.id === tab)?.label}
            </h1>
          </div>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-neutral-400 hover:text-indigo-600 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="hidden sm:inline">{isUk ? "Мій сайт" : "My Site"}</span>
          </Link>
        </div>

        <div className="p-4 md:p-6 space-y-6">

          {/* ═══ HOME ═══════════════════════════════════════════════════════════ */}
          {tab === "home" && (
            <>
              {/* Welcome */}
              <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold uppercase">
                    {user.email?.[0] ?? "U"}
                  </div>
                  <div>
                    <div className="font-bold text-lg">
                      {isUk ? "Вітаємо" : "Welcome back"}{user.email ? `, ${user.email.split("@")[0]}` : ""}!
                    </div>
                    <div className="text-indigo-200 text-sm">{companyName}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <CheckCircle className="w-4 h-4 text-green-300" />
                  <span className="text-sm text-indigo-100">{isUk ? "Ваш сайт активний та онлайн" : "Your site is active and online"}</span>
                </div>
              </div>

              {/* KPIs */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <KPI icon={Users}       label={isUk ? "Відвідувачі (тиждень)" : "Visitors (week)"} value="1 240"  delta="+12% this week" positive={true} />
                <KPI icon={MousePointer} label={isUk ? "Ліди"                  : "Leads"}           value="18"     delta="+3 this week"    positive={true} />
                <KPI icon={Zap}         label={isUk ? "Бронювань"              : "Bookings"}        value="7"      delta="+2 this week"    positive={true} />
                <KPI icon={Activity}    label="Uptime"                                               value="99.9%"  delta="Last 30 days"    positive={true} />
              </div>

              {/* Recent activity */}
              <div className="bg-white rounded-2xl border border-gray-100">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2 className="font-bold text-gray-900">{isUk ? "Останні дії" : "Recent Activity"}</h2>
                </div>
                <div className="divide-y divide-gray-50">
                  {[
                    { text: isUk ? "Контент оновлено" : "Content updated",                  time: "2h ago",  icon: FileText,  color: "text-indigo-500" },
                    { text: isUk ? "Нова заявка з форми" : "New lead from contact form",     time: "5h ago",  icon: Mail,      color: "text-green-500"  },
                    { text: isUk ? "Кольорову схему змінено" : "Color palette changed",      time: "1d ago",  icon: Palette,   color: "text-violet-500" },
                    { text: isUk ? "Сайт успішно опубліковано" : "Site successfully published", time: "3d ago", icon: Globe, color: "text-blue-500" },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className="flex items-center gap-4 px-6 py-3.5">
                        <div className={`w-8 h-8 rounded-full bg-gray-50 dark:bg-neutral-900 flex items-center justify-center ${item.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="flex-1 text-sm text-gray-700">{item.text}</span>
                        <span className="text-xs text-gray-400 dark:text-neutral-500 shrink-0">{item.time}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick actions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: isUk ? "Оновити контент" : "Update Content", tab: "content" as DashTab, icon: FileText, color: "bg-indigo-50 text-indigo-700 hover:bg-indigo-100" },
                  { label: isUk ? "Змінити кольори" : "Change Colors",  tab: "customizer" as DashTab, icon: Palette,  color: "bg-violet-50 text-violet-700 hover:bg-violet-100" },
                  { label: isUk ? "Зв'язатись з підтримкою" : "Contact Support", tab: "support" as DashTab, icon: HelpCircle, color: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100" },
                ].map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.tab}
                      onClick={() => setTab(action.tab)}
                      className={`flex items-center gap-3 p-4 rounded-xl font-medium text-sm transition-colors ${action.color}`}
                    >
                      <Icon className="w-5 h-5" />
                      {action.label}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* ═══ CONTENT ════════════════════════════════════════════════════════ */}
          {tab === "content" && (
            <>
              {saved && (
                <div className="flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 rounded-xl px-4 py-3 text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  {isUk ? "Зміни збережено!" : "Changes saved!"}
                </div>
              )}

              {/* General Info */}
              <div className="bg-white rounded-2xl border border-gray-100 dark:border-neutral-700 p-6 space-y-4">
                <h2 className="font-bold text-gray-900">{isUk ? "Загальна інформація" : "General Info"}</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium text-gray-500">{isUk ? "Назва компанії" : "Company Name"}</span>
                    <input value={companyName} onChange={(e) => setCompanyName(e.target.value)}
                      className="border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium text-gray-500">{isUk ? "Слоган" : "Tagline"}</span>
                    <input value={tagline} onChange={(e) => setTagline(e.target.value)}
                      placeholder={isUk ? "Наш слоган..." : "Your catchy tagline..."}
                      className="border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </label>
                </div>
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-medium text-gray-500">{isUk ? "Опис (про нас)" : "Description (About Us)"}</span>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3}
                    placeholder={isUk ? "Розкажіть про свій бізнес..." : "Tell us about your business..."}
                    className="border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
                </label>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-2xl border border-gray-100 dark:border-neutral-700 p-6 space-y-4">
                <h2 className="font-bold text-gray-900">{isUk ? "Контактна інформація" : "Contact Information"}</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { icon: Phone, label: isUk ? "Телефон" : "Phone", value: phone, setter: setPhone, placeholder: "+380 XX XXX XXXX" },
                    { icon: Mail,  label: "Email", value: email, setter: setEmail, placeholder: "hello@yourbiz.com" },
                    { icon: MapPin, label: isUk ? "Адреса" : "Address", value: address, setter: setAddress, placeholder: isUk ? "Вул. Хрещатик, 1, Київ" : "123 Main St, City" },
                    { icon: Globe, label: isUk ? "Сайт" : "Website", value: "", setter: () => {}, placeholder: "yourbiz.com" },
                  ].map(({ icon: Icon, label, value, setter, placeholder }) => (
                    <label key={label} className="flex flex-col gap-1.5">
                      <span className="text-xs font-medium text-gray-500 dark:text-neutral-400 flex items-center gap-1">
                        <Icon className="w-3.5 h-3.5" /> {label}
                      </span>
                      <input value={value} onChange={(e) => setter(e.target.value)} placeholder={placeholder}
                        className="border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </label>
                  ))}
                </div>
              </div>

              {/* Working Hours */}
              <div className="bg-white rounded-2xl border border-gray-100 dark:border-neutral-700 p-6 space-y-4">
                <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  {isUk ? "Графік роботи" : "Working Hours"}
                </h2>
                <div className="space-y-2">
                  {[
                    { day: isUk ? "Пн – Пт" : "Mon – Fri", from: "09:00", to: "18:00" },
                    { day: isUk ? "Субота" : "Saturday",   from: "10:00", to: "15:00" },
                    { day: isUk ? "Неділя" : "Sunday",     from: "",      to: "" },
                  ].map(({ day, from, to }) => (
                    <div key={day} className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 dark:text-neutral-300 w-28 shrink-0">{day}</span>
                      <input defaultValue={from} placeholder={isUk ? "Закрито" : "Closed"}
                        className="border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-1.5 text-sm w-24 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                      {from && <span className="text-gray-400 dark:text-neutral-500 text-sm">–</span>}
                      {from && (
                        <input defaultValue={to}
                          className="border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-1.5 text-sm w-24 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-2xl border border-gray-100 dark:border-neutral-700 p-6 space-y-4">
                <h2 className="font-bold text-gray-900">{isUk ? "Соціальні мережі" : "Social Media"}</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { icon: Instagram,     label: "Instagram", value: instagram, setter: setInstagram, placeholder: "instagram.com/yourbiz" },
                    { icon: MessageCircle, label: "Facebook",  value: facebook,  setter: setFacebook,  placeholder: "facebook.com/yourbiz" },
                    { icon: Youtube,       label: "YouTube",   value: "",        setter: () => {},     placeholder: "youtube.com/@yourbiz" },
                    { icon: Send,          label: "Telegram",  value: "",        setter: () => {},     placeholder: "t.me/yourbiz" },
                  ].map(({ icon: Icon, label, value, setter, placeholder }) => (
                    <label key={label} className="flex flex-col gap-1.5">
                      <span className="text-xs font-medium text-gray-500 dark:text-neutral-400 flex items-center gap-1">
                        <Icon className="w-3.5 h-3.5" /> {label}
                      </span>
                      <input value={value} onChange={(e) => setter(e.target.value)} placeholder={placeholder}
                        className="border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </label>
                  ))}
                </div>
              </div>

              {/* Hero Section */}
              <div className="bg-white rounded-2xl border border-gray-100 dark:border-neutral-700 p-6 space-y-4">
                <h2 className="font-bold text-gray-900">{isUk ? "Головна секція (Hero)" : "Hero Section"}</h2>
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-medium text-gray-500">{isUk ? "Заголовок" : "Heading"}</span>
                  <input value={heroHeading} onChange={(e) => setHeroHeading(e.target.value)}
                    placeholder={isUk ? "Ваш головний заголовок..." : "Your main headline..."}
                    className="border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-medium text-gray-500">{isUk ? "Підзаголовок" : "Subheading"}</span>
                  <input value={heroSub} onChange={(e) => setHeroSub(e.target.value)}
                    placeholder={isUk ? "Додатковий опис..." : "Supporting description..."}
                    className="border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-medium text-gray-500">{isUk ? "Текст кнопки (CTA)" : "Button text (CTA)"}</span>
                  <input value={heroCta} onChange={(e) => setHeroCta(e.target.value)}
                    placeholder={isUk ? "Зв'язатись з нами" : "Get in touch"}
                    className="border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </label>
              </div>

              <button
                onClick={handleSaveContent}
                className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-indigo-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                {isUk ? "Зберегти зміни" : "Save Changes"}
              </button>
            </>
          )}

          {/* ═══ CUSTOMIZER ══════════════════════════════════════════════════════ */}
          {tab === "customizer" && (
            <>
              {custSaved && (
                <div className="flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 rounded-xl px-4 py-3 text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  {isUk ? "Дизайн збережено та опубліковано!" : "Design saved and published!"}
                </div>
              )}

              {/* Color Palettes */}
              <div className="bg-white rounded-2xl border border-gray-100 dark:border-neutral-700 p-6 space-y-4">
                <div>
                  <h2 className="font-bold text-gray-900">{isUk ? "Кольорова схема" : "Color Palette"}</h2>
                  <p className="text-sm text-gray-500 dark:text-neutral-400 mt-1">{isUk ? "Обери основну кольорову палету сайту" : "Choose the main color palette for your site"}</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {PALETTES.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPalette(p.id)}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                        palette === p.id ? "border-indigo-600 bg-indigo-50" : "border-gray-200 dark:border-neutral-700 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex gap-1">
                        <div className="w-5 h-5 rounded-full" style={{ background: p.primary }} />
                        <div className="w-5 h-5 rounded-full" style={{ background: p.accent }} />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{p.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Pairs */}
              <div className="bg-white rounded-2xl border border-gray-100 dark:border-neutral-700 p-6 space-y-4">
                <div>
                  <h2 className="font-bold text-gray-900">{isUk ? "Шрифтова пара" : "Font Pair"}</h2>
                  <p className="text-sm text-gray-500 dark:text-neutral-400 mt-1">{isUk ? "Обери стиль шрифтів для заголовків та тексту" : "Choose font style for headings and body text"}</p>
                </div>
                <div className="space-y-2">
                  {FONT_PAIRS.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFontPair(f.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all ${
                        fontPair === f.id ? "border-indigo-600 bg-indigo-50" : "border-gray-200 dark:border-neutral-700 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-left">
                        <div className="font-semibold text-gray-900 dark:text-white text-sm">{f.name}</div>
                        <div className="text-xs text-gray-500">{f.heading} · {f.body}</div>
                      </div>
                      <div className="text-sm text-gray-400 dark:text-neutral-500 italic">{f.sample}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="bg-white rounded-2xl border border-gray-100 dark:border-neutral-700 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2 className="font-bold text-gray-900">{isUk ? "Попередній перегляд" : "Preview"}</h2>
                </div>
                <div className="p-6" style={{ background: currentPalette.bg }}>
                  <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-neutral-700 shadow-sm">
                    <div className="px-6 py-4 flex items-center justify-between" style={{ background: currentPalette.primary }}>
                      <span className="text-white font-bold text-sm">{companyName}</span>
                      <div className="flex gap-3">
                        {["Home", "About", "Contact"].map((l) => (
                          <span key={l} className="text-white/70 text-xs">{l}</span>
                        ))}
                      </div>
                    </div>
                    <div className="px-6 py-8 text-center" style={{ background: currentPalette.bg }}>
                      <div className="text-2xl font-bold mb-2" style={{ color: currentPalette.primary }}>
                        {heroHeading || (isUk ? "Ваш заголовок тут" : "Your Headline Here")}
                      </div>
                      <div className="text-sm mb-4" style={{ color: currentPalette.primary + "99" }}>
                        {heroSub || (isUk ? "Підзаголовок вашого сайту" : "Your site subheading goes here")}
                      </div>
                      <div className="inline-block px-5 py-2 rounded-full text-white text-sm font-medium" style={{ background: currentPalette.accent }}>
                        {heroCta || (isUk ? "Зв'язатись" : "Get Started")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSaveCustomizer}
                className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-indigo-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                {isUk ? "Зберегти та опублікувати" : "Save & Publish"}
              </button>
            </>
          )}

          {/* ═══ ANALYTICS ══════════════════════════════════════════════════════ */}
          {tab === "analytics" && (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <KPI icon={Users}        label={isUk ? "Відвідувачів (тиждень)" : "Visitors (week)"}   value="1 240" delta="+12%"  positive={true}  />
                <KPI icon={MousePointer} label={isUk ? "Переглядів сторінок"    : "Page views"}         value="4 820" delta="+8%"   positive={true}  />
                <KPI icon={Zap}          label={isUk ? "Конверсія"              : "Conversion rate"}    value="3.8%"  delta="-0.2%" positive={false} />
                <KPI icon={Activity}     label={isUk ? "Показник відмов"        : "Bounce rate"}        value="52%"   delta="-5%"   positive={true}  />
              </div>

              {/* Bar chart */}
              <div className="bg-white rounded-2xl border border-gray-100 dark:border-neutral-700 p-6">
                <h2 className="font-bold text-gray-900 dark:text-white mb-4">{isUk ? "Відвідувачі за тиждень" : "Visitors This Week"}</h2>
                <div className="flex items-end gap-3 h-40">
                  {MOCK_VISITORS.map((v, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-xs text-gray-500">{v}</span>
                      <div
                        className="w-full rounded-t-md bg-indigo-500 transition-all"
                        style={{ height: `${(v / maxVisitors) * 100}%` }}
                      />
                      <span className="text-xs text-gray-400">{MOCK_DAYS[i]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Top pages */}
                <div className="bg-white rounded-2xl border border-gray-100 dark:border-neutral-700 p-6">
                  <h2 className="font-bold text-gray-900 dark:text-white mb-4">{isUk ? "Топ сторінок" : "Top Pages"}</h2>
                  <div className="space-y-3">
                    {[
                      { page: "/",        pct: 45 },
                      { page: "/menu",    pct: 28 },
                      { page: "/contact", pct: 15 },
                      { page: "/about",   pct: 12 },
                    ].map(({ page, pct }) => (
                      <div key={page} className="flex items-center gap-3">
                        <span className="text-sm text-gray-600 dark:text-neutral-300 w-24 shrink-0 font-mono">{page}</span>
                        <div className="flex-1 bg-gray-100 dark:bg-neutral-800 rounded-full h-2">
                          <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs text-gray-500 dark:text-neutral-400 w-8 text-right shrink-0">{pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Traffic sources */}
                <div className="bg-white rounded-2xl border border-gray-100 dark:border-neutral-700 p-6">
                  <h2 className="font-bold text-gray-900 dark:text-white mb-4">{isUk ? "Джерела трафіку" : "Traffic Sources"}</h2>
                  <div className="space-y-3">
                    {[
                      { label: "Organic Search", pct: 48, color: "bg-green-500" },
                      { label: "Direct",         pct: 30, color: "bg-indigo-500" },
                      { label: "Social Media",   pct: 15, color: "bg-pink-500" },
                      { label: "Referral",       pct: 7,  color: "bg-amber-500" },
                    ].map(({ label, pct, color }) => (
                      <div key={label} className="flex items-center gap-3">
                        <span className="text-sm text-gray-600 dark:text-neutral-300 w-28 shrink-0">{label}</span>
                        <div className="flex-1 bg-gray-100 dark:bg-neutral-800 rounded-full h-2">
                          <div className={`${color} h-2 rounded-full`} style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs text-gray-500 dark:text-neutral-400 w-8 text-right shrink-0">{pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {isUk
                  ? "Дані є демонстраційними. Підключення Google Analytics 4 доступне в пакеті Standard."
                  : "Data shown is illustrative. Real-time Google Analytics 4 is available on Standard plan."}
              </div>
            </>
          )}

          {/* ═══ SUBSCRIPTION ════════════════════════════════════════════════════ */}
          {tab === "subscription" && (
            <>
              <div className="bg-white rounded-2xl border border-gray-100 dark:border-neutral-700 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-bold text-gray-900 dark:text-white text-lg">{isUk ? "Поточний план" : "Current Plan"}</h2>
                    <p className="text-sm text-gray-500 dark:text-neutral-400 mt-0.5">{isUk ? "Наступний платіж: 1 червня 2026" : "Next payment: June 1, 2026"}</p>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                    {isUk ? "Активний" : "Active"}
                  </span>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    {
                      name: "Basic",
                      price: isUk ? "£499" : "£499",
                      period: isUk ? "разово" : "one-time",
                      current: true,
                      features: isUk
                        ? ["5 сторінок", "Мобільна адаптація", "Базовий SEO", "SSL сертифікат", "Email підтримка"]
                        : ["5 pages", "Mobile responsive", "Basic SEO", "SSL certificate", "Email support"],
                    },
                    {
                      name: "Standard",
                      price: "£999",
                      period: isUk ? "разово" : "one-time",
                      current: false,
                      features: isUk
                        ? ["10 сторінок", "Нішевий модуль", "Google Analytics 4", "CMS для контенту", "Пріоритетна підтримка"]
                        : ["10 pages", "Niche module", "Google Analytics 4", "Content CMS", "Priority support"],
                    },
                    {
                      name: "Premium",
                      price: "£1,999+",
                      period: isUk ? "разово" : "one-time",
                      current: false,
                      features: isUk
                        ? ["Необмежено сторінок", "Всі нішеві модулі", "A/B тестування", "Кастомний дизайн", "Виділений менеджер"]
                        : ["Unlimited pages", "All niche modules", "A/B testing", "Custom design", "Dedicated manager"],
                    },
                  ].map((plan) => (
                    <div
                      key={plan.name}
                      className={`rounded-xl p-5 border-2 ${
                        plan.current ? "border-indigo-600 bg-indigo-50" : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-gray-900">{plan.name}</span>
                        {plan.current && (
                          <span className="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                            {isUk ? "Ваш план" : "Your Plan"}
                          </span>
                        )}
                      </div>
                      <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">{plan.price}</div>
                      <div className="text-xs text-gray-500 dark:text-neutral-400 mb-4">{plan.period}</div>
                      <ul className="space-y-1.5 mb-4">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      {!plan.current && (
                        <Link
                          href={`/${lang}/marketplace/catalog`}
                          className="block text-center bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                        >
                          {isUk ? "Оновити" : "Upgrade"}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 dark:border-neutral-700 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                <div>
                  <div className="font-semibold text-gray-900">{isUk ? "Є питання щодо плану?" : "Questions about your plan?"}</div>
                  <div className="text-sm text-gray-500">{isUk ? "Ми допоможемо підібрати найкраще рішення" : "We'll help you find the best solution"}</div>
                </div>
                <button
                  onClick={() => setTab("support")}
                  className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors shrink-0"
                >
                  <MessageCircle className="w-4 h-4" />
                  {isUk ? "Зв'язатись" : "Contact Us"}
                </button>
              </div>
            </>
          )}

          {/* ═══ SUPPORT ═════════════════════════════════════════════════════════ */}
          {tab === "support" && (
            <>
              {/* FAQ */}
              <div className="bg-white rounded-2xl border border-gray-100 dark:border-neutral-700 p-6">
                <h2 className="font-bold text-gray-900 dark:text-white mb-4">FAQ</h2>
                <div className="space-y-2">
                  {faqItems.map((item, i) => (
                    <div key={i} className="border border-gray-100 dark:border-neutral-700 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                        className="w-full flex items-center justify-between px-4 py-3.5 text-left text-sm font-medium text-gray-800 dark:text-neutral-200 hover:bg-gray-50 dark:bg-neutral-900 transition-colors"
                      >
                        {item.q}
                        {faqOpen === i ? <ChevronUp className="w-4 h-4 text-gray-400 dark:text-neutral-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 dark:text-neutral-500 shrink-0" />}
                      </button>
                      {faqOpen === i && (
                        <div className="px-4 pb-4 text-sm text-gray-600 dark:text-neutral-300 border-t border-gray-100 dark:border-neutral-700 pt-3">
                          {item.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact form */}
              <div className="bg-white rounded-2xl border border-gray-100 dark:border-neutral-700 p-6 space-y-4">
                <h2 className="font-bold text-gray-900">{isUk ? "Написати нам" : "Send Us a Message"}</h2>

                {supportSent ? (
                  <div className="flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 rounded-xl px-4 py-3 text-sm font-medium">
                    <CheckCircle className="w-4 h-4" />
                    {isUk ? "Повідомлення надіслано! Ми відповімо протягом 24 годин." : "Message sent! We'll get back to you within 24 hours."}
                  </div>
                ) : (
                  <>
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-medium text-gray-500">{isUk ? "Тема" : "Subject"}</span>
                      <input
                        value={supportSubject}
                        onChange={(e) => setSupportSubject(e.target.value)}
                        placeholder={isUk ? "Наприклад: питання про домен..." : "E.g. domain connection question..."}
                        className="border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-medium text-gray-500">{isUk ? "Повідомлення" : "Message"}</span>
                      <textarea
                        value={supportMsg}
                        onChange={(e) => setSupportMsg(e.target.value)}
                        rows={4}
                        placeholder={isUk ? "Опишіть ваше питання..." : "Describe your issue or question..."}
                        className="border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                      />
                    </label>
                    <button
                      onClick={handleSendSupport}
                      className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      {isUk ? "Надіслати" : "Send Message"}
                    </button>
                  </>
                )}
              </div>

              {/* Contact info */}
              <div className="bg-gray-50 dark:bg-neutral-900 rounded-2xl border border-gray-200 dark:border-neutral-700 p-6 flex flex-col sm:flex-row gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-neutral-400 mb-0.5">Email</div>
                    <a href="mailto:hello@codeworth.uk" className="text-sm font-medium text-gray-800 dark:text-neutral-200 hover:text-indigo-600">
                      hello@codeworth.uk
                    </a>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ═══ SETTINGS ════════════════════════════════════════════════════════ */}
          {tab === "settings" && (
            <>
              {/* Profile */}
              <div className="bg-white rounded-2xl border border-gray-100 dark:border-neutral-700 p-6 space-y-4">
                <h2 className="font-bold text-gray-900">{isUk ? "Профіль" : "Profile"}</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium text-gray-500">{isUk ? "Ім'я" : "First Name"}</span>
                    <input defaultValue="" placeholder={isUk ? "Ваше ім'я" : "Your first name"}
                      className="border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium text-gray-500">{isUk ? "Прізвище" : "Last Name"}</span>
                    <input defaultValue="" placeholder={isUk ? "Ваше прізвище" : "Your last name"}
                      className="border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </label>
                </div>
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-medium text-gray-500">Email</span>
                  <input value={user.email ?? ""} readOnly
                    className="border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm bg-gray-50 dark:bg-neutral-900 text-gray-500 dark:text-neutral-400 cursor-not-allowed" />
                </label>
              </div>

              {/* Password */}
              <div className="bg-white rounded-2xl border border-gray-100 dark:border-neutral-700 p-6 space-y-4">
                <h2 className="font-bold text-gray-900">{isUk ? "Зміна пароля" : "Change Password"}</h2>
                {pwSaved && (
                  <div className="flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 rounded-xl px-4 py-3 text-sm font-medium">
                    <CheckCircle className="w-4 h-4" />
                    {isUk ? "Пароль змінено!" : "Password updated!"}
                  </div>
                )}
                <div className="space-y-3">
                  {[
                    isUk ? "Поточний пароль" : "Current Password",
                    isUk ? "Новий пароль" : "New Password",
                    isUk ? "Підтвердити новий пароль" : "Confirm New Password",
                  ].map((label) => (
                    <label key={label} className="flex flex-col gap-1.5">
                      <span className="text-xs font-medium text-gray-500">{label}</span>
                      <input type="password" placeholder="••••••••"
                        className="border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-80" />
                    </label>
                  ))}
                </div>
                <button
                  onClick={() => { setPwSaved(true); setTimeout(() => setPwSaved(false), 3000); }}
                  className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  {isUk ? "Змінити пароль" : "Update Password"}
                </button>
              </div>

              {/* Notifications */}
              <div className="bg-white rounded-2xl border border-gray-100 dark:border-neutral-700 p-6">
                <h2 className="font-bold text-gray-900 dark:text-white mb-4">{isUk ? "Сповіщення" : "Notifications"}</h2>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-800">{isUk ? "Email-сповіщення" : "Email Notifications"}</div>
                    <div className="text-xs text-gray-500 dark:text-neutral-400 mt-0.5">{isUk ? "Отримувати оновлення про сайт на email" : "Receive site updates via email"}</div>
                  </div>
                  <button
                    onClick={() => setNotifEmail(!notifEmail)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${notifEmail ? "bg-indigo-600" : "bg-gray-300"}`}
                  >
                    <span
                      className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${notifEmail ? "translate-x-5" : "translate-x-0.5"}`}
                    />
                  </button>
                </div>
              </div>

              {/* Danger zone */}
              <div className="bg-white rounded-2xl border border-red-100 p-6">
                <h2 className="font-bold text-red-600 mb-2">{isUk ? "Небезпечна зона" : "Danger Zone"}</h2>
                <p className="text-sm text-gray-500 dark:text-neutral-400 mb-4">
                  {isUk
                    ? "Для видалення акаунту зверніться до нашої підтримки."
                    : "To delete your account, please contact our support team."}
                </p>
                <button
                  disabled
                  className="text-sm text-red-400 border border-red-200 px-4 py-2 rounded-lg cursor-not-allowed opacity-60"
                >
                  {isUk ? "Видалити акаунт" : "Delete Account"}
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
