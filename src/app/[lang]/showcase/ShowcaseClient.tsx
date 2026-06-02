"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Check, Copy, ArrowRight, Bell, Loader2, X, AlertCircle, CheckCircle2, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Avatar, AvatarGroup } from "@/components/ui/Avatar";
import { Skeleton, SkeletonCard } from "@/components/ui/Skeleton";
import { StarRating } from "@/components/ui/StarRating";
import { StepIndicator } from "@/components/ui/StepIndicator";
import { Divider } from "@/components/ui/Divider";
import { Pagination } from "@/components/ui/Pagination";
import { cn } from "@/lib/utils";

const NAV_SECTIONS = [
  { id: "buttons", label: "Buttons" },
  { id: "badges", label: "Badges" },
  { id: "avatars", label: "Avatars" },
  { id: "forms", label: "Form Elements" },
  { id: "feedback", label: "Feedback" },
  { id: "progress", label: "Progress & Steps" },
  { id: "cards", label: "Cards" },
  { id: "skeleton", label: "Skeleton" },
  { id: "features", label: "Interactive Features" },
];

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div id={id} className="scroll-mt-24 mb-6">
      <h2 className="text-xl font-heading font-bold text-neutral-900 flex items-center gap-2">
        <span className="w-1 h-5 rounded-full bg-indigo-500 inline-block" />
        {children}
      </h2>
    </div>
  );
}

function DemoBlock({ label, children, dark = false }: { label: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <div className="mb-8">
      <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-3">{label}</p>
      <div className={cn(
        "rounded-2xl p-6 border",
        dark ? "bg-neutral-900 border-neutral-700" : "bg-neutral-50 border-neutral-200"
      )}>
        {children}
      </div>
    </div>
  );
}

function CopySnippet({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-indigo-50 hover:text-indigo-700 text-neutral-500 text-xs font-mono transition-colors"
    >
      {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
      {copied ? "Copied!" : code}
    </button>
  );
}

const EXTRAS_DEMOS = [
  { id: "before-after", title: "Before / After Slider", desc: "Drag to compare two images side by side.", icon: "↔️", href: "/extras?demo=before-after" },
  { id: "lead-quiz", title: "Lead Quiz", desc: "Multi-step quiz that captures leads with conditional logic.", icon: "🧩", href: "/extras?demo=lead-quiz" },
  { id: "fomo", title: "FOMO Widget", desc: "Social proof notifications — recent purchases, signups.", icon: "🔥", href: "/extras?demo=fomo" },
  { id: "booking", title: "Booking Calendar", desc: "Online appointment scheduling with Telegram notifications.", icon: "📅", href: "/extras?demo=booking" },
  { id: "calculator", title: "Price Calculator", desc: "Interactive configurator with real-time price calculation.", icon: "🧮", href: "/extras?demo=calculator" },
  { id: "ai-copywriter", title: "AI Copywriter", desc: "GPT-powered text generation for landing pages.", icon: "✍️", href: "/extras?demo=ai-copywriter" },
  { id: "ai-voice-search", title: "AI Voice Search", desc: "Speech-to-text search with semantic suggestions.", icon: "🎙️", href: "/extras?demo=ai-voice-search" },
  { id: "ai-price-optimizer", title: "AI Price Optimizer", desc: "Dynamic pricing recommendations based on demand signals.", icon: "📊", href: "/extras?demo=ai-price-optimizer" },
  { id: "filters", title: "Catalog Filters", desc: "Multi-faceted product filters with instant results.", icon: "🔍", href: "/extras?demo=filters" },
];

export function ShowcaseClient() {
  const { lang } = useParams<{ lang: string }>();
  const isUk = lang === "uk";

  const [loadingBtn, setLoadingBtn] = useState(false);
  const [activeStep, setActiveStep] = useState(2);
  const [activePage, setActivePage] = useState(1);
  const [rating, setRating] = useState(4);

  const steps = [
    { id: 1, label: isUk ? "Брифінг" : "Brief" },
    { id: 2, label: isUk ? "Дизайн" : "Design" },
    { id: 3, label: isUk ? "Розробка" : "Dev" },
    { id: 4, label: isUk ? "Запуск" : "Launch" },
  ];

  return (
    <div className="flex gap-0 min-h-[calc(100vh-80px)]">
      {/* Sticky sidebar */}
      <aside className="hidden lg:block w-52 shrink-0">
        <nav className="sticky top-24 py-4">
          <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-3 px-3">
            {isUk ? "Розділи" : "Sections"}
          </p>
          <ul className="space-y-0.5">
            {NAV_SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="block px-3 py-2 rounded-lg text-sm text-neutral-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 py-8 px-4 lg:px-8 max-w-4xl">

        {/* ── Buttons ── */}
        <SectionTitle id="buttons">{isUk ? "Кнопки" : "Buttons"}</SectionTitle>

        <DemoBlock label="Variants">
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </DemoBlock>

        <DemoBlock label="Outline (dark background)" dark>
          <Button variant="outline">Outline</Button>
        </DemoBlock>

        <DemoBlock label="Sizes">
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </DemoBlock>

        <DemoBlock label="States">
          <div className="flex flex-wrap items-center gap-3">
            <Button isLoading={loadingBtn} onClick={() => { setLoadingBtn(true); setTimeout(() => setLoadingBtn(false), 2000); }}>
              {loadingBtn ? "Loading…" : "Click to load"}
            </Button>
            <Button disabled>Disabled</Button>
            <Button href={`/${lang}/contact`} variant="secondary">
              Link button <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </DemoBlock>

        <DemoBlock label="Code snippets">
          <div className="flex flex-wrap gap-2">
            <CopySnippet code={`<Button variant="primary">Click</Button>`} />
            <CopySnippet code={`<Button isLoading>Loading</Button>`} />
            <CopySnippet code={`<Button href="/contact">Link</Button>`} />
          </div>
        </DemoBlock>

        <Divider className="my-8" />

        {/* ── Badges ── */}
        <SectionTitle id="badges">{isUk ? "Значки" : "Badges"}</SectionTitle>

        <DemoBlock label="All variants">
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="indigo">Indigo</Badge>
            <Badge variant="emerald">Emerald</Badge>
            <Badge variant="amber">Amber</Badge>
            <Badge variant="hot">🔥 Hot</Badge>
            <Badge variant="new">New</Badge>
            <Badge variant="sale">−30%</Badge>
          </div>
        </DemoBlock>

        <Divider className="my-8" />

        {/* ── Avatars ── */}
        <SectionTitle id="avatars">{isUk ? "Аватари" : "Avatars"}</SectionTitle>

        <DemoBlock label="Sizes">
          <div className="flex items-end gap-3">
            <Avatar size="xs" name="XS" />
            <Avatar size="sm" name="SM" />
            <Avatar size="md" name="MD" />
            <Avatar size="lg" name="LG" />
            <Avatar size="xl" name="XL" />
          </div>
        </DemoBlock>

        <DemoBlock label="Status indicators">
          <div className="flex items-center gap-4">
            <Avatar size="md" name="Anna" status="online" />
            <Avatar size="md" name="Bob" status="busy" />
            <Avatar size="md" name="Carol" status="away" />
            <Avatar size="md" name="Dave" status="offline" />
          </div>
        </DemoBlock>

        <DemoBlock label="Avatar group (stacked)">
          <AvatarGroup
            avatars={[
              { name: "Anna K" },
              { name: "Bob M" },
              { name: "Carol S" },
              { name: "Dave W" },
              { name: "Eva P" },
            ]}
            max={4}
          />
        </DemoBlock>

        <DemoBlock label="Star rating">
          <div className="flex items-center gap-4">
            <StarRating value={rating} onChange={setRating} />
            <span className="text-sm text-neutral-500">{rating}/5 — {isUk ? "натисніть для оцінки" : "click to rate"}</span>
          </div>
        </DemoBlock>

        <Divider className="my-8" />

        {/* ── Form Elements ── */}
        <SectionTitle id="forms">{isUk ? "Елементи форм" : "Form Elements"}</SectionTitle>

        <DemoBlock label="Text inputs">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">{isUk ? "Ім'я" : "Name"}</label>
              <input
                type="text"
                placeholder={isUk ? "Введіть ім'я" : "Enter your name"}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-neutral-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="hello@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-neutral-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">{isUk ? "Пошук" : "Search"}</label>
              <div className="relative">
                <input
                  type="search"
                  placeholder={isUk ? "Пошук…" : "Search…"}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-neutral-400"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">🔍</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                {isUk ? "Вибір" : "Select"}
              </label>
              <select className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-neutral-700">
                <option>{isUk ? "Оберіть послугу" : "Choose a service"}</option>
                <option>{isUk ? "Веб-сайт" : "Website"}</option>
                <option>{isUk ? "Магазин" : "Online Store"}</option>
                <option>{isUk ? "SEO" : "SEO"}</option>
              </select>
            </div>
          </div>
        </DemoBlock>

        <DemoBlock label="Checkboxes & toggles">
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-indigo-600" />
              <span className="text-sm text-neutral-700">{isUk ? "Отримувати розсилку" : "Subscribe to newsletter"}</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded accent-indigo-600" />
              <span className="text-sm text-neutral-700">{isUk ? "Погоджуюсь з умовами" : "I agree with terms"}</span>
            </label>
            <div className="flex items-center gap-3">
              <span className="text-sm text-neutral-700">{isUk ? "Сповіщення:" : "Notifications:"}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:bg-indigo-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
              </label>
            </div>
          </div>
        </DemoBlock>

        <DemoBlock label="Textarea">
          <textarea
            rows={4}
            placeholder={isUk ? "Розкажіть про вашу задачу…" : "Tell us about your challenge…"}
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-neutral-400 resize-none"
          />
        </DemoBlock>

        <Divider className="my-8" />

        {/* ── Feedback ── */}
        <SectionTitle id="feedback">{isUk ? "Сповіщення та статуси" : "Feedback & Status"}</SectionTitle>

        <DemoBlock label="Alert banners">
          <div className="space-y-3">
            {[
              { type: "success", bg: "bg-emerald-50 border-emerald-200 text-emerald-800", icon: <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />, msg: isUk ? "Форму успішно відправлено!" : "Form submitted successfully!" },
              { type: "error", bg: "bg-red-50 border-red-200 text-red-800", icon: <X className="w-4 h-4 text-red-600 shrink-0" />, msg: isUk ? "Помилка! Спробуйте ще раз." : "Error! Please try again." },
              { type: "warning", bg: "bg-amber-50 border-amber-200 text-amber-800", icon: <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />, msg: isUk ? "Увага: ліміт майже вичерпано." : "Warning: limit almost reached." },
              { type: "info", bg: "bg-blue-50 border-blue-200 text-blue-800", icon: <Info className="w-4 h-4 text-blue-600 shrink-0" />, msg: isUk ? "Нова версія доступна." : "New version available." },
            ].map((a) => (
              <div key={a.type} className={cn("flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium", a.bg)}>
                {a.icon}
                {a.msg}
              </div>
            ))}
          </div>
        </DemoBlock>

        <DemoBlock label="Toast notifications (inline preview)">
          <div className="flex flex-wrap gap-3">
            {[
              { label: "✅ Success", cls: "bg-emerald-600 text-white" },
              { label: "❌ Error", cls: "bg-red-600 text-white" },
              { label: "⚠️ Warning", cls: "bg-amber-500 text-white" },
              { label: "ℹ️ Info", cls: "bg-blue-600 text-white" },
            ].map((t) => (
              <span key={t.label} className={cn("inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold shadow-lg", t.cls)}>
                {t.label}
                <button className="ml-1 opacity-70 hover:opacity-100"><X className="w-3.5 h-3.5" /></button>
              </span>
            ))}
          </div>
        </DemoBlock>

        <DemoBlock label="Empty state">
          <div className="flex flex-col items-center py-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-neutral-100 flex items-center justify-center mb-3">
              <Bell className="w-7 h-7 text-neutral-400" />
            </div>
            <p className="font-semibold text-neutral-700 text-sm">{isUk ? "Нема сповіщень" : "No notifications"}</p>
            <p className="text-xs text-neutral-400 mt-1 max-w-xs">{isUk ? "Коли з'являться нові події — вони відобразяться тут." : "When new events occur, they'll appear here."}</p>
          </div>
        </DemoBlock>

        <Divider className="my-8" />

        {/* ── Progress & Steps ── */}
        <SectionTitle id="progress">{isUk ? "Прогрес та кроки" : "Progress & Steps"}</SectionTitle>

        <DemoBlock label="Progress bars">
          <div className="space-y-4">
            {[
              { label: isUk ? "Завершено" : "Completed", value: 80, color: "bg-emerald-500" },
              { label: isUk ? "В процесі" : "In progress", value: 45, color: "bg-indigo-500" },
              { label: isUk ? "Заплановано" : "Planned", value: 15, color: "bg-amber-400" },
            ].map((b) => (
              <div key={b.label}>
                <div className="flex justify-between text-xs text-neutral-500 mb-1.5">
                  <span>{b.label}</span>
                  <span className="font-semibold">{b.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-neutral-200 overflow-hidden">
                  <div className={cn("h-full rounded-full transition-all duration-700", b.color)} style={{ width: `${b.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </DemoBlock>

        <DemoBlock label={`Step indicator (${isUk ? "натисніть на крок" : "click a step"})`}>
          <StepIndicator steps={steps} currentStep={activeStep} onStepClick={setActiveStep} />
        </DemoBlock>

        <DemoBlock label="Pagination">
          <Pagination currentPage={activePage} totalPages={8} onPageChange={setActivePage} />
        </DemoBlock>

        <Divider className="my-8" />

        {/* ── Cards ── */}
        <SectionTitle id="cards">{isUk ? "Картки" : "Cards"}</SectionTitle>

        <DemoBlock label="Pricing card">
          <div className="max-w-xs">
            <div className="rounded-2xl border-2 border-indigo-500 bg-white overflow-hidden shadow-lg shadow-indigo-100">
              <div className="bg-indigo-600 px-6 py-4">
                <p className="text-white font-bold text-lg">Business</p>
                <p className="text-indigo-200 text-sm">{isUk ? "Для зростаючих компаній" : "For growing companies"}</p>
              </div>
              <div className="px-6 py-5">
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-extrabold text-neutral-900">£2,500</span>
                  <span className="text-neutral-400 text-sm">/ {isUk ? "проєкт" : "project"}</span>
                </div>
                <ul className="space-y-2 mb-5 text-sm text-neutral-600">
                  {(isUk ? ["До 20 сторінок", "SEO-оптимізація", "Admin панель", "Підтримка 6 міс"] : ["Up to 20 pages", "SEO optimisation", "Admin panel", "6 months support"]).map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button className="w-full justify-center">{isUk ? "Замовити" : "Get started"}</Button>
              </div>
            </div>
          </div>
        </DemoBlock>

        <DemoBlock label="Testimonial card">
          <div className="max-w-sm rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <StarRating value={5} readonly />
            <p className="mt-3 text-sm text-neutral-700 leading-relaxed italic">
              "{isUk ? "CodeNest перетворили наш сайт за 3 тижні. Записи виросли на 60%." : "CodeNest transformed our site in 3 weeks. Bookings grew by 60%."}"
            </p>
            <div className="mt-4 flex items-center gap-3">
              <Avatar size="sm" name="Olena K" status="online" />
              <div>
                <p className="text-sm font-semibold text-neutral-900">Olena K.</p>
                <p className="text-xs text-neutral-400">{isUk ? "Власниця салону краси" : "Beauty salon owner"}</p>
              </div>
            </div>
          </div>
        </DemoBlock>

        <DemoBlock label="Portfolio card (hover)">
          <div className="max-w-sm group rounded-2xl overflow-hidden border border-neutral-200 bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <div className="h-40 bg-linear-to-br from-indigo-500 to-violet-600 relative flex items-center justify-center">
              <span className="text-5xl">🛒</span>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-indigo-700 text-sm font-bold px-4 py-2 rounded-xl">
                  {isUk ? "Переглянути" : "View case"}
                </span>
              </div>
            </div>
            <div className="p-5">
              <Badge variant="indigo">E-commerce</Badge>
              <h3 className="mt-2 font-bold text-neutral-900 group-hover:text-indigo-600 transition-colors">FashionStore</h3>
              <p className="text-sm text-neutral-500 mt-1">{isUk ? "+45K грн/міс збережено на комісії" : "+£3,200/mo saved on marketplace fees"}</p>
            </div>
          </div>
        </DemoBlock>

        <Divider className="my-8" />

        {/* ── Skeleton ── */}
        <SectionTitle id="skeleton">{isUk ? "Skeleton / Loading" : "Skeleton / Loading"}</SectionTitle>

        <DemoBlock label="Skeleton card">
          <div className="max-w-sm">
            <SkeletonCard />
          </div>
        </DemoBlock>

        <DemoBlock label="Inline skeletons">
          <div className="space-y-3">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </DemoBlock>

        <DemoBlock label="Loading spinner">
          <div className="flex items-center gap-4">
            <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
            <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
            <Loader2 className="w-10 h-10 animate-spin text-indigo-400" />
          </div>
        </DemoBlock>

        <Divider className="my-8" />

        {/* ── Interactive Features ── */}
        <SectionTitle id="features">{isUk ? "Інтерактивні модулі" : "Interactive Features"}</SectionTitle>

        <p className="text-sm text-neutral-500 mb-6 leading-relaxed">
          {isUk
            ? "Живі демо кожного модуля — доступні у каталозі Extras. Натисніть картку, щоб відкрити демо."
            : "Live demos of each module are available in the Extras catalogue. Click a card to open the demo."}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {EXTRAS_DEMOS.map((demo) => (
            <Link
              key={demo.id}
              href={`/${lang}${demo.href}`}
              className="group flex flex-col p-5 rounded-2xl border border-neutral-200 bg-white hover:shadow-md hover:border-indigo-200 transition-all"
            >
              <span className="text-3xl mb-3">{demo.icon}</span>
              <h3 className="font-bold text-neutral-900 text-sm group-hover:text-indigo-600 transition-colors mb-1">
                {demo.title}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed flex-1">{demo.desc}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 group-hover:gap-2 transition-all">
                {isUk ? "Відкрити демо" : "Open demo"}
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button href={`/${lang}/extras`} variant="secondary">
            {isUk ? "Всі 200+ доробок" : "All 200+ extras"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

      </main>
    </div>
  );
}
