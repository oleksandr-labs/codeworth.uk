import type { Metadata } from "next";
import Link from "next/link";
import { buildAlternates } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { EXTRAS } from "@/lib/data/extras";
import { ArrowRight, ExternalLink, CheckCircle2, AlertCircle, Info, Star, Zap } from "lucide-react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

export async function generateStaticParams() {
  return [{ lang: "uk" }, { lang: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === "uk";
  return {
    title: isUk
      ? "UI Компоненти та Живі Демо — Showcase | Codeworth"
      : "UI Components & Live Demos — Showcase | Codeworth",
    description: isUk
      ? "Інтерактивна галерея UI-компонентів Codeworth: кнопки, картки, форми, анімації, інтерактивні модулі. Всі компоненти — живий код."
      : "Interactive UI component gallery by Codeworth: buttons, cards, forms, animations, interactive modules. All components — live code.",
    alternates: buildAlternates(lang, "showcase"),
    openGraph: {
      title: isUk ? "UI Showcase | Codeworth" : "UI Showcase | Codeworth",
      description: isUk ? "Живі демо всіх UI-компонентів Codeworth." : "Live demos of all Codeworth UI components.",
      type: "website",
      url: `https://codeworth.uk/${lang}/showcase`,
    },
  };
}

const SECTIONS = [
  { id: "buttons", icon: "🖱️" },
  { id: "badges", icon: "🏷️" },
  { id: "cards", icon: "🃏" },
  { id: "alerts", icon: "🔔" },
  { id: "inputs", icon: "✏️" },
  { id: "interactive", icon: "⚡" },
];

const SECTION_LABELS: Record<string, { uk: string; en: string }> = {
  buttons: { uk: "Кнопки", en: "Buttons" },
  badges: { uk: "Бейджі та Теги", en: "Badges & Tags" },
  cards: { uk: "Картки", en: "Cards" },
  alerts: { uk: "Сповіщення", en: "Alerts" },
  inputs: { uk: "Поля вводу", en: "Input Fields" },
  interactive: { uk: "Інтерактивні Модулі", en: "Interactive Modules" },
};

const INTERACTIVE_EXTRAS = [
  "feat-before-after",
  "feat-lead-quiz",
  "feat-fomo",
  "feat-booking",
  "feat-calculator",
  "ecom-bundle-builder",
  "ai-chatbot-rag",
  "feat-search",
  "feat-filters",
  "feat-popup",
  "ai-voice-search",
  "ai-copywriter",
];

export default async function ShowcasePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isUk = lang === "uk";

  const interactiveExtras = EXTRAS.filter((e) => INTERACTIVE_EXTRAS.includes(e.id) && e.hasDemo);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main id="main-content" className="flex-1">

        {/* Hero */}
        <section className="pt-32 pb-16 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15),transparent_70%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M0 0h60v60H0z%22 fill=%22none%22/%3E%3Ccircle cx=30 cy=30 r=1 fill=%22rgba(255,255,255,0.04)%22/%3E%3C/svg%3E')] pointer-events-none" />
          <Container className="relative">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/70 text-xs font-semibold mb-6 backdrop-blur-sm border border-white/15">
                <Zap className="w-3.5 h-3.5" />
                <span>{isUk ? "Живий код · Без встановлення" : "Live code · No installation"}</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-heading font-extrabold text-white mb-6 leading-tight">
                {isUk ? "UI Showcase" : "UI Showcase"}
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed max-w-xl">
                {isUk
                  ? "Інтерактивна галерея всіх UI-компонентів та модулів Codeworth. Клієнт бачить — клієнт розуміє. Всі елементи — з реального коду проєктів."
                  : "Interactive gallery of all Codeworth UI components and modules. See it before you order it. All elements come from real project code."}
              </p>
            </div>

            {/* Quick nav */}
            <div className="flex flex-wrap gap-2 mt-8">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 text-xs font-semibold transition-colors border border-white/15"
                >
                  <span>{s.icon}</span>
                  <span>{isUk ? SECTION_LABELS[s.id]?.uk : SECTION_LABELS[s.id]?.en}</span>
                </a>
              ))}
            </div>
          </Container>
        </section>

        {/* ─── BUTTONS ─────────────────────────────────────────────── */}
        <section id="buttons" className="py-16 border-b border-neutral-100 dark:border-neutral-700 scroll-mt-20">
          <Container>
            <h2 className="text-2xl font-heading font-extrabold text-neutral-900 dark:text-white mb-2">
              🖱️ {isUk ? "Кнопки" : "Buttons"}
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
              {isUk ? "Стилі та стани кнопок у дизайн-системі Codeworth." : "Button styles and states in the Codeworth design system."}
            </p>
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-3">
                  {isUk ? "Основні" : "Primary"}
                </p>
                <div className="flex flex-wrap gap-3 items-center">
                  <button className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200">
                    {isUk ? "Основна" : "Primary"}
                  </button>
                  <button className="px-6 py-2.5 rounded-xl bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-800 transition-colors">
                    {isUk ? "Темна" : "Dark"}
                  </button>
                  <button className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors">
                    {isUk ? "Успіх" : "Success"}
                  </button>
                  <button className="px-6 py-2.5 rounded-xl bg-rose-600 text-white text-sm font-semibold hover:bg-rose-700 transition-colors">
                    {isUk ? "Небезпека" : "Danger"}
                  </button>
                  <button className="px-6 py-2.5 rounded-xl bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600 transition-colors">
                    {isUk ? "Увага" : "Warning"}
                  </button>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-3">
                  {isUk ? "Вторинні / Outline" : "Secondary / Outline"}
                </p>
                <div className="flex flex-wrap gap-3 items-center">
                  <button className="px-6 py-2.5 rounded-xl border-2 border-indigo-600 text-indigo-600 text-sm font-semibold hover:bg-indigo-50 transition-colors">
                    {isUk ? "Outline" : "Outline"}
                  </button>
                  <button className="px-6 py-2.5 rounded-xl bg-indigo-50 text-indigo-700 text-sm font-semibold hover:bg-indigo-100 transition-colors">
                    {isUk ? "М'яка" : "Soft"}
                  </button>
                  <button className="px-6 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-sm font-semibold hover:bg-neutral-200 transition-colors">
                    {isUk ? "Нейтральна" : "Neutral"}
                  </button>
                  <button className="px-6 py-2.5 rounded-xl text-indigo-600 text-sm font-semibold hover:bg-indigo-50 transition-colors">
                    {isUk ? "Ghost" : "Ghost"}
                  </button>
                  <button disabled className="px-6 py-2.5 rounded-xl bg-neutral-200 text-neutral-400 text-sm font-semibold cursor-not-allowed">
                    {isUk ? "Вимкнена" : "Disabled"}
                  </button>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-3">
                  {isUk ? "Розміри" : "Sizes"}
                </p>
                <div className="flex flex-wrap gap-3 items-center">
                  <button className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold">XS</button>
                  <button className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold">SM</button>
                  <button className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold">MD</button>
                  <button className="px-8 py-3.5 rounded-2xl bg-indigo-600 text-white text-base font-bold">LG</button>
                  <button className="px-10 py-4 rounded-2xl bg-indigo-600 text-white text-lg font-bold">XL</button>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-3">
                  {isUk ? "З іконками та стрілкою" : "With icons & arrow"}
                </p>
                <div className="flex flex-wrap gap-3 items-center">
                  <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors">
                    {isUk ? "Замовити" : "Order now"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors">
                    <Star className="w-4 h-4 fill-current" />
                    {isUk ? "Обрані" : "Favourites"}
                  </button>
                  <button className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-linear-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-200/60">
                    ✨ {isUk ? "Преміум" : "Premium"}
                  </button>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ─── BADGES ─────────────────────────────────────────────── */}
        <section id="badges" className="py-16 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-700 scroll-mt-20">
          <Container>
            <h2 className="text-2xl font-heading font-extrabold text-neutral-900 dark:text-white mb-2">
              🏷️ {isUk ? "Бейджі та Теги" : "Badges & Tags"}
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
              {isUk ? "Статусні лейбли, пілюлі категорій, цінові бейджі." : "Status labels, category pills, price badges."}
            </p>
            <div className="space-y-5">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">✅ {isUk ? "Активний" : "Active"}</span>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">⏳ {isUk ? "В обробці" : "Processing"}</span>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700">❌ {isUk ? "Скасовано" : "Cancelled"}</span>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">ℹ️ {isUk ? "Новий" : "New"}</span>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-violet-100 text-violet-700">⭐ {isUk ? "Популярне" : "Popular"}</span>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-neutral-200 text-neutral-600">{isUk ? "Неактивний" : "Inactive"}</span>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                {["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Vercel", "OpenAI", "Telegram", "LiqPay"].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 text-xs font-medium hover:border-indigo-300 hover:text-indigo-600 transition-colors cursor-pointer">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <span className="px-3 py-1.5 rounded-full bg-indigo-600 text-white text-xs font-bold">NEW</span>
                <span className="px-3 py-1.5 rounded-full bg-rose-500 text-white text-xs font-bold">HOT 🔥</span>
                <span className="px-3 py-1.5 rounded-full bg-amber-500 text-white text-xs font-bold">SALE −20%</span>
                <span className="px-3 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-bold">✓ {isUk ? "Верифіковано" : "Verified"}</span>
                <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold">PRO ✨</span>
              </div>
            </div>
          </Container>
        </section>

        {/* ─── CARDS ─────────────────────────────────────────────── */}
        <section id="cards" className="py-16 border-b border-neutral-100 dark:border-neutral-700 scroll-mt-20">
          <Container>
            <h2 className="text-2xl font-heading font-extrabold text-neutral-900 dark:text-white mb-2">
              🃏 {isUk ? "Картки" : "Cards"}
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
              {isUk ? "Картки для товарів, послуг, відгуків, статистики." : "Cards for products, services, testimonials and stats."}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

              {/* Product card */}
              <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-40 bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-5xl">🛒</div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg">E-commerce</span>
                    <span className="text-sm font-bold text-indigo-600">від £350</span>
                  </div>
                  <h3 className="font-bold text-neutral-900 dark:text-white mb-1">{isUk ? "Bundle Builder" : "Bundle Builder"}</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{isUk ? "Конструктор комплектів — збільшує середній чек на 20–30%." : "Bundle kit builder — increases average order value by 20–30%."}</p>
                  <button className="mt-4 w-full py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors">
                    {isUk ? "Замовити" : "Order"}
                  </button>
                </div>
              </div>

              {/* Testimonial card */}
              <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-6 hover:shadow-md transition-shadow">
                <div className="flex gap-0.5 mb-3">
                  {[1,2,3,4,5].map((i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed mb-4">
                  "{isUk ? "Codeworth зробили наш сайт за 3 тижні. Конверсія з 1.2% до 3.8% — говорить сама за себе." : "Codeworth built our site in 3 weeks. Conversion from 1.2% to 3.8% — says it all."}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-linear-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">О</div>
                  <div>
                    <p className="text-sm font-bold text-neutral-900">{isUk ? "Олена К." : "Olena K."}</p>
                    <p className="text-xs text-neutral-400">{isUk ? "Власниця салону краси" : "Beauty salon owner"}</p>
                  </div>
                </div>
              </div>

              {/* Stat card */}
              <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-2xl mb-4">📈</div>
                <p className="text-3xl font-extrabold text-neutral-900 dark:text-white mb-1">+186%</p>
                <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1">{isUk ? "Зріст органічного трафіку" : "Organic traffic growth"}</p>
                <p className="text-xs text-neutral-400">{isUk ? "Середній результат за 6 місяців" : "Average result over 6 months"}</p>
              </div>

            </div>
          </Container>
        </section>

        {/* ─── ALERTS ─────────────────────────────────────────────── */}
        <section id="alerts" className="py-16 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-700 scroll-mt-20">
          <Container>
            <h2 className="text-2xl font-heading font-extrabold text-neutral-900 dark:text-white mb-2">
              🔔 {isUk ? "Сповіщення та Повідомлення" : "Alerts & Notifications"}
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
              {isUk ? "Inline алерти, тости, статусні повідомлення." : "Inline alerts, toasts, status messages."}
            </p>
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600" />
                <div>
                  <p className="font-semibold text-sm">{isUk ? "Заявку отримано!" : "Request received!"}</p>
                  <p className="text-sm opacity-80">{isUk ? "Ми зв'яжемося з вами протягом 24 годин." : "We'll contact you within 24 hours."}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />
                <div>
                  <p className="font-semibold text-sm">{isUk ? "Увага!" : "Warning!"}</p>
                  <p className="text-sm opacity-80">{isUk ? "Залишилось лише 2 вільних слоти на цей місяць." : "Only 2 slots remaining for this month."}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-800">
                <Info className="w-5 h-5 shrink-0 mt-0.5 text-blue-600" />
                <div>
                  <p className="font-semibold text-sm">{isUk ? "Нова функція" : "New feature"}</p>
                  <p className="text-sm opacity-80">{isUk ? "AI-чатбот тепер підтримує голосовий ввід." : "AI chatbot now supports voice input."}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-600" />
                <div>
                  <p className="font-semibold text-sm">{isUk ? "Помилка" : "Error"}</p>
                  <p className="text-sm opacity-80">{isUk ? "Не вдалося відправити форму. Спробуйте ще раз." : "Failed to submit the form. Please try again."}</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ─── INPUTS ─────────────────────────────────────────────── */}
        <section id="inputs" className="py-16 border-b border-neutral-100 dark:border-neutral-700 scroll-mt-20">
          <Container>
            <h2 className="text-2xl font-heading font-extrabold text-neutral-900 dark:text-white mb-2">
              ✏️ {isUk ? "Поля вводу" : "Input Fields"}
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
              {isUk ? "Текстові поля, вибір, чекбокси, тоглери." : "Text fields, selects, checkboxes, toggles."}
            </p>
            <div className="grid sm:grid-cols-2 gap-6 max-w-2xl">
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-neutral-700">{isUk ? "Ім'я" : "Name"}</label>
                <input type="text" placeholder={isUk ? "Введіть ваше ім'я" : "Enter your name"} className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 bg-white text-neutral-900 dark:text-white text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" readOnly />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-neutral-700">Email</label>
                <input type="email" placeholder="hello@company.com" className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 bg-white text-neutral-900 dark:text-white text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" readOnly />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-neutral-700">{isUk ? "Послуга" : "Service"}</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 bg-white text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>{isUk ? "Корпоративний сайт" : "Corporate website"}</option>
                  <option>{isUk ? "Інтернет-магазин" : "Online store"}</option>
                  <option>{isUk ? "AI-рішення" : "AI solution"}</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-neutral-700">{isUk ? "Пошук" : "Search"}</label>
                <div className="relative">
                  <input type="text" placeholder={isUk ? "Пошук..." : "Search..."} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 bg-white text-neutral-900 dark:text-white text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" readOnly />
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-neutral-700">{isUk ? "Чекбокси" : "Checkboxes"}</label>
                {[isUk ? "SEO-оптимізація" : "SEO Optimisation", isUk ? "AI-інтеграція" : "AI Integration", isUk ? "Технічна підтримка" : "Technical Support"].map((opt, i) => (
                  <label key={i} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${i === 0 ? "bg-indigo-600 border-indigo-600" : "border-neutral-300 group-hover:border-indigo-400"}`}>
                      {i === 0 && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <span className="text-sm text-neutral-700">{opt}</span>
                  </label>
                ))}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-neutral-700">{isUk ? "Тоглери" : "Toggles"}</label>
                {[
                  { label: isUk ? "Email-сповіщення" : "Email notifications", on: true },
                  { label: isUk ? "SMS-сповіщення" : "SMS notifications", on: false },
                  { label: isUk ? "Новини та оновлення" : "News & updates", on: true },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm text-neutral-700">{item.label}</span>
                    <div className={`relative w-10 h-5.5 rounded-full transition-colors ${item.on ? "bg-indigo-600" : "bg-neutral-300"}`} style={{height: "22px"}}>
                      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white dark:bg-neutral-800 shadow-sm transition-transform ${item.on ? "translate-x-5" : "translate-x-0.5"}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* ─── INTERACTIVE MODULES ──────────────────────────────────── */}
        <section id="interactive" className="py-16 bg-neutral-50 dark:bg-neutral-900 scroll-mt-20">
          <Container>
            <h2 className="text-2xl font-heading font-extrabold text-neutral-900 dark:text-white mb-2">
              ⚡ {isUk ? "Інтерактивні Модулі" : "Interactive Modules"}
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
              {isUk
                ? "Готові модулі з каталогу Extras — клікніть «Демо» щоб побачити живий приклад."
                : "Ready modules from the Extras catalogue — click 'Demo' to see a live example."}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {interactiveExtras.map((extra) => (
                <div key={extra.id} className="flex flex-col p-5 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <EmojiIcon emoji={extra.emoji} className="w-6 h-6 text-indigo-500" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-neutral-900 dark:text-white text-sm leading-snug truncate">{extra.title}</h3>
                      <p className="text-xs text-neutral-400">{extra.category}</p>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4 flex-1 line-clamp-2">
                    {extra.description}
                  </p>
                  <div className="flex gap-2 mt-auto">
                    <Link
                      href={`/${lang}/extras/${extra.id}`}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      {isUk ? "Демо" : "Demo"}
                    </Link>
                    <Link
                      href={`/${lang}/extras`}
                      className="px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 text-xs font-semibold hover:border-neutral-300 transition-colors"
                    >
                      {isUk ? "Каталог" : "Catalogue"}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-24 bg-white dark:bg-neutral-950">
          <Container>
            <div className="max-w-2xl mx-auto text-center p-10 rounded-3xl bg-linear-to-br from-indigo-50 to-violet-50 border border-indigo-100">
              <span className="text-5xl mb-5 block">🏗️</span>
              <h2 className="text-3xl font-heading font-extrabold text-neutral-900 dark:text-white mb-3">
                {isUk ? "Хочете такий компонент у свій сайт?" : "Want this component on your site?"}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed">
                {isUk
                  ? "Всі компоненти зі Showcase доступні як окремі доробки або у складі сайту. Замовте — доставимо готовий код."
                  : "All Showcase components are available as individual extras or as part of a full website project."}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href={`/${lang}/extras`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                >
                  {isUk ? "Каталог доробок" : "Extras Catalogue"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={`/${lang}/contact`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl border-2 border-indigo-200 text-indigo-700 font-bold hover:bg-indigo-50 transition-colors"
                >
                  {isUk ? "Обговорити проєкт" : "Discuss a project"}
                </Link>
              </div>
            </div>
          </Container>
        </section>

      </main>
      <Footer />
    </div>
  );
}
