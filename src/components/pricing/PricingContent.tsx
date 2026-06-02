"use client";

import { useState } from "react";
import { Check, X, Minus, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/layout/LocaleProvider";

const DEV_PLANS_UK = [
  {
    name: "Starter",
    price: "15 000",
    period: "разово",
    description: "Лендінг або сайт-візитка. Ідеально для старту.",
    highlight: false,
    features: [
      { text: "До 5 сторінок", included: true },
      { text: "Адаптивний дизайн (Mobile First)", included: true },
      { text: "Базова SEO-оптимізація", included: true },
      { text: "Форма зворотнього зв'язку", included: true },
      { text: "Підключення домену і хостинг", included: true },
      { text: "CMS для редагування контенту", included: false },
      { text: "Інтеграція CRM / ERP", included: false },
      { text: "Кастомна анімація (Framer Motion)", included: false },
    ],
    cta: "Замовити Starter",
    delivery: "5–10 днів",
  },
  {
    name: "Business",
    price: "40 000",
    period: "разово",
    description: "Корпоративний сайт з CMS та інтеграціями.",
    highlight: true,
    badge: "Найпопулярніший",
    features: [
      { text: "До 15 сторінок", included: true },
      { text: "Адаптивний дизайн (Mobile First)", included: true },
      { text: "Повна SEO-оптимізація + Schema.org", included: true },
      { text: "Форма + Email-нотифікації", included: true },
      { text: "Підключення домену і хостинг", included: true },
      { text: "CMS для редагування контенту", included: true },
      { text: "Інтеграція CRM / ERP", included: "partial" },
      { text: "Кастомна анімація (Framer Motion)", included: true },
    ],
    cta: "Замовити Business",
    delivery: "2–4 тижні",
  },
  {
    name: "Enterprise",
    price: "Індивідуально",
    period: "",
    description: "Портал, маркетплейс або складне кастомне рішення.",
    highlight: false,
    features: [
      { text: "Необмежена кількість сторінок", included: true },
      { text: "Адаптивний дизайн (Mobile First)", included: true },
      { text: "Повна SEO-оптимізація + Schema.org", included: true },
      { text: "Кабінет користувача / адмін-панель", included: true },
      { text: "Підключення домену і хостинг", included: true },
      { text: "CMS для редагування контенту", included: true },
      { text: "Інтеграція CRM / ERP / API", included: true },
      { text: "Кастомна анімація (Framer Motion)", included: true },
    ],
    cta: "Обговорити проєкт",
    delivery: "4–12 тижнів",
  },
];

const DEV_PLANS_EN = [
  {
    name: "Starter",
    price: "15 000",
    period: "one-time",
    description: "Landing page or business card site. Perfect for getting started.",
    highlight: false,
    features: [
      { text: "Up to 5 pages", included: true },
      { text: "Responsive design (Mobile First)", included: true },
      { text: "Basic SEO optimisation", included: true },
      { text: "Contact form", included: true },
      { text: "Domain & hosting setup", included: true },
      { text: "CMS for content editing", included: false },
      { text: "CRM / ERP integration", included: false },
      { text: "Custom animation (Framer Motion)", included: false },
    ],
    cta: "Order Starter",
    delivery: "5–10 days",
  },
  {
    name: "Business",
    price: "40 000",
    period: "one-time",
    description: "Corporate site with CMS and integrations.",
    highlight: true,
    badge: "Most popular",
    features: [
      { text: "Up to 15 pages", included: true },
      { text: "Responsive design (Mobile First)", included: true },
      { text: "Full SEO optimisation + Schema.org", included: true },
      { text: "Form + email notifications", included: true },
      { text: "Domain & hosting setup", included: true },
      { text: "CMS for content editing", included: true },
      { text: "CRM / ERP integration", included: "partial" },
      { text: "Custom animation (Framer Motion)", included: true },
    ],
    cta: "Order Business",
    delivery: "2–4 weeks",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Portal, marketplace or complex custom solution.",
    highlight: false,
    features: [
      { text: "Unlimited pages", included: true },
      { text: "Responsive design (Mobile First)", included: true },
      { text: "Full SEO optimisation + Schema.org", included: true },
      { text: "User cabinet / admin panel", included: true },
      { text: "Domain & hosting setup", included: true },
      { text: "CMS for content editing", included: true },
      { text: "CRM / ERP / API integration", included: true },
      { text: "Custom animation (Framer Motion)", included: true },
    ],
    cta: "Discuss project",
    delivery: "4–12 weeks",
  },
];

const MARKETPLACE_PLANS_UK = [
  {
    name: "Basic",
    price: "4 900",
    description: "Стандартний шаблон без кастомізації.",
    features: ["Готовий шаблон", "Встановлення на хостинг", "Навчання роботи з CMS"],
  },
  {
    name: "Standard",
    price: "9 900",
    description: "Шаблон + кастомізація контенту.",
    highlight: true,
    badge: "Популярний",
    features: ["Готовий шаблон", "Зміна кольорів та логотипу", "Заповнення вашим контентом", "SEO-базові налаштування"],
  },
  {
    name: "Premium",
    price: "19 900",
    description: "Повна кастомізація під ваш бренд.",
    features: ["Повна кастомізація дизайну", "SEO-налаштування + Schema.org", "Підключення домену", "Google Analytics + Maps", "30 днів підтримки"],
  },
];

const MARKETPLACE_PLANS_EN = [
  {
    name: "Basic",
    price: "4 900",
    description: "Standard template without customisation.",
    features: ["Ready-made template", "Hosting installation", "CMS training"],
  },
  {
    name: "Standard",
    price: "9 900",
    description: "Template + content customisation.",
    highlight: true,
    badge: "Popular",
    features: ["Ready-made template", "Colour & logo changes", "Filled with your content", "Basic SEO settings"],
  },
  {
    name: "Premium",
    price: "19 900",
    description: "Full customisation to your brand.",
    features: ["Full design customisation", "SEO settings + Schema.org", "Domain connection", "Google Analytics + Maps", "30 days support"],
  },
];

const SUPPORT_PLANS_UK = [
  {
    name: "Lite",
    price: "3 000",
    period: "/місяць",
    description: "Базова підтримка для невеликих сайтів.",
    highlight: false,
    features: [
      "До 5 год. технічної підтримки",
      "Оновлення контенту (тексти, фото)",
      "Моніторинг uptime",
      "Бекапи щотижня",
    ],
  },
  {
    name: "Pro",
    price: "7 000",
    period: "/місяць",
    description: "Підтримка + SEO-моніторинг.",
    highlight: true,
    badge: "Рекомендовано",
    features: [
      "До 15 год. технічної підтримки",
      "SEO-моніторинг та звіти",
      "Google Analytics звіти",
      "Бекапи щодня",
      "Пріоритетні відповіді",
    ],
  },
  {
    name: "Full",
    price: "15 000",
    period: "/місяць",
    description: "Повний аутсорс цифрового розвитку.",
    highlight: false,
    features: [
      "Необмежений час підтримки",
      "Нові функції щомісяця",
      "Dedicated менеджер",
      "Бекапи в реальному часі",
      "SLA 99.9% uptime",
    ],
  },
];

const SUPPORT_PLANS_EN = [
  {
    name: "Lite",
    price: "3 000",
    period: "/mo",
    description: "Basic support for small sites.",
    highlight: false,
    features: [
      "Up to 5 hrs technical support",
      "Content updates (text, photos)",
      "Uptime monitoring",
      "Weekly backups",
    ],
  },
  {
    name: "Pro",
    price: "7 000",
    period: "/mo",
    description: "Support + SEO monitoring.",
    highlight: true,
    badge: "Recommended",
    features: [
      "Up to 15 hrs technical support",
      "SEO monitoring & reports",
      "Google Analytics reports",
      "Daily backups",
      "Priority responses",
    ],
  },
  {
    name: "Full",
    price: "15 000",
    period: "/mo",
    description: "Full digital development outsource.",
    highlight: false,
    features: [
      "Unlimited support hours",
      "New features every month",
      "Dedicated manager",
      "Real-time backups",
      "SLA 99.9% uptime",
    ],
  },
];

function FeatureIcon({ included }: { included: boolean | "partial" }) {
  if (included === true) return <Check className="w-4 h-4 text-emerald-500 shrink-0" />;
  if (included === "partial") return <Minus className="w-4 h-4 text-amber-400 shrink-0" />;
  return <X className="w-4 h-4 text-neutral-300 shrink-0" />;
}

type Tab = "one-time" | "subscription";

export function PricingContent() {
  const lang = useLocale();
  const isUk = lang === "uk";
  const lp = (path: string) => `/${lang}${path}`;
  const DEV_PLANS = isUk ? DEV_PLANS_UK : DEV_PLANS_EN;
  const MARKETPLACE_PLANS = isUk ? MARKETPLACE_PLANS_UK : MARKETPLACE_PLANS_EN;
  const SUPPORT_PLANS = isUk ? SUPPORT_PLANS_UK : SUPPORT_PLANS_EN;
  const [tab, setTab] = useState<Tab>("one-time");

  return (
    <div>
      {/* Toggle */}
      <div className="flex justify-center py-12">
        <div className="inline-flex items-center bg-neutral-100 p-1 rounded-2xl gap-1">
          <button
            onClick={() => setTab("one-time")}
            className={cn(
              "px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
              tab === "one-time"
                ? "bg-white text-indigo-700 shadow-sm"
                : "text-neutral-500 hover:text-neutral-700"
            )}
          >
            {isUk ? "Разові послуги" : "One-time services"}
          </button>
          <button
            onClick={() => setTab("subscription")}
            className={cn(
              "px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
              tab === "subscription"
                ? "bg-white text-indigo-700 shadow-sm"
                : "text-neutral-500 hover:text-neutral-700"
            )}
          >
            {isUk ? "Щомісячна підписка" : "Monthly subscription"}
          </button>
        </div>
      </div>

      {tab === "one-time" ? (
        <>
          {/* Website Dev Plans */}
          <section className="py-10 bg-white">
            <div className="max-w-2xl mx-auto text-center mb-12 px-4">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">{isUk ? "Розробка сайтів" : "Web development"}</p>
              <h2 className="text-4xl font-heading font-extrabold text-neutral-900">{isUk ? "Тарифи розробки" : "Development plans"}</h2>
            </div>
            <div className="flex md:grid md:grid-cols-3 gap-6 max-w-5xl mx-auto overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 md:pb-0 px-4 md:overflow-visible">
              {DEV_PLANS.map((plan) => (
                <div
                  key={plan.name}
                  className={cn(
                    "relative p-8 rounded-2xl border transition-all duration-200 snap-start shrink-0 w-[85vw] md:w-auto",
                    plan.highlight
                      ? "border-indigo-300 bg-linear-to-b from-indigo-50 to-white shadow-xl shadow-indigo-500/15 scale-[1.02]"
                      : "border-neutral-200 bg-white hover:shadow-md"
                  )}
                >
                  {"badge" in plan && plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold whitespace-nowrap">
                      {plan.badge}
                    </div>
                  )}
                  <h3 className="font-heading font-bold text-xl text-neutral-900 mb-1">{plan.name}</h3>
                  <p className="text-sm text-neutral-500 mb-4">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-sans font-bold tabular-nums tracking-tight text-neutral-900">
                      {(plan.price === "Індивідуально" || plan.price === "Custom") ? "" : "₴"}
                      {plan.price}
                    </span>
                    {plan.period && <span className="text-neutral-400 text-sm ml-1">{plan.period}</span>}
                  </div>
                  <div className="text-xs text-neutral-400 mb-6 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {isUk ? "Термін:" : "Timeline:"} {plan.delivery}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f.text} className="flex items-center gap-2.5 text-sm text-neutral-700">
                        <FeatureIcon included={f.included as boolean | "partial"} />
                        {f.text}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={lp("/contact")}
                    className={cn(
                      "block text-center px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5",
                      plan.highlight
                        ? "bg-linear-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-500/30"
                        : "border-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                    )}
                  >
                    {plan.cta}
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Marketplace Plans */}
          <section className="py-16 bg-neutral-50">
            <div className="max-w-2xl mx-auto text-center mb-12 px-4">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">{isUk ? "Маркетплейс" : "Marketplace"}</p>
              <h2 className="text-4xl font-heading font-extrabold text-neutral-900">{isUk ? "Готові нішеві рішення" : "Ready-made niche solutions"}</h2>
              <p className="mt-3 text-neutral-500">{isUk ? "Купуйте готовий сайт для вашої ніші та запускайтесь швидко." : "Buy a ready-made site for your niche and launch fast."}</p>
            </div>
            <div className="flex md:grid md:grid-cols-3 gap-6 max-w-4xl mx-auto overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 md:pb-0 px-4 md:overflow-visible">
              {MARKETPLACE_PLANS.map((plan) => (
                <div
                  key={plan.name}
                  className={cn(
                    "p-7 rounded-2xl border snap-start shrink-0 w-[85vw] md:w-auto",
                    "highlight" in plan && plan.highlight
                      ? "border-indigo-300 bg-white shadow-lg shadow-indigo-500/10"
                      : "border-neutral-200 bg-white"
                  )}
                >
                  {"badge" in plan && plan.badge && (
                    <span className="inline-block px-3 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold mb-3">
                      {plan.badge}
                    </span>
                  )}
                  <h3 className="font-heading font-bold text-lg text-neutral-900 mb-1">{plan.name}</h3>
                  <p className="text-sm text-neutral-500 mb-4">{plan.description}</p>
                  <div className="text-3xl font-sans font-bold tabular-nums tracking-tight text-neutral-900 mb-6">₴{plan.price}</div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-neutral-600">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href={lp("/marketplace")} className="block text-center px-5 py-2.5 rounded-xl border-2 border-indigo-200 text-indigo-700 text-sm font-semibold hover:bg-indigo-50 transition-colors">
                    {isUk ? "Обрати в маркетплейсі" : "Browse marketplace"}
                  </a>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        /* Support Plans */
        <section className="py-10 bg-white">
          <div className="max-w-2xl mx-auto text-center mb-12 px-4">
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">{isUk ? "Підписка" : "Subscription"}</p>
            <h2 className="text-4xl font-heading font-extrabold text-neutral-900">{isUk ? "Технічна підтримка" : "Technical support"}</h2>
            <p className="mt-3 text-neutral-500">{isUk ? "Щомісячне обслуговування та розвиток вашого сайту." : "Monthly maintenance and development of your website."}</p>
          </div>
          <div className="flex md:grid md:grid-cols-3 gap-6 max-w-4xl mx-auto overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 md:pb-0 px-4 md:overflow-visible">
            {SUPPORT_PLANS.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  "relative p-7 rounded-2xl border transition-all duration-200 snap-start shrink-0 w-[85vw] md:w-auto",
                  plan.highlight
                    ? "border-indigo-300 bg-indigo-50 shadow-lg shadow-indigo-500/10 scale-[1.02]"
                    : "border-neutral-200 bg-white hover:shadow-md"
                )}
              >
                {"badge" in plan && plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold whitespace-nowrap">
                    {plan.badge}
                  </div>
                )}
                <h3 className="font-heading font-bold text-lg text-neutral-900 mb-1">{plan.name}</h3>
                <p className="text-sm text-neutral-500 mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-3xl font-sans font-bold tabular-nums tracking-tight text-neutral-900">₴{plan.price}</span>
                  <span className="text-neutral-400 text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-2 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-neutral-600">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={lp("/contact")}
                  className={cn(
                    "block text-center px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
                    plan.highlight
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "border-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                  )}
                >
                  {isUk ? `Підключити ${plan.name}` : `Get ${plan.name}`}
                </a>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
