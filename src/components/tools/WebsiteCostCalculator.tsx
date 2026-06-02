"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, Check, RefreshCw } from "lucide-react";

interface Props {
  isUk: boolean;
}

type SiteType = "landing" | "corporate" | "ecommerce" | "blog" | "portal";
type Feature = "booking" | "cart" | "crm" | "multilang" | "chat" | "blog";
type Design = "template" | "custom" | "premium";
type Timeline = "2weeks" | "1month" | "2months";

const BASE_PRICES_UAH: Record<SiteType, [number, number]> = {
  landing: [8000, 15000],
  corporate: [20000, 40000],
  ecommerce: [35000, 70000],
  blog: [12000, 25000],
  portal: [60000, 120000],
};

const FEATURE_PRICES_UAH: Record<Feature, [number, number]> = {
  booking: [5000, 8000],
  cart: [8000, 15000],
  crm: [7000, 12000],
  multilang: [5000, 10000],
  chat: [4000, 8000],
  blog: [3000, 6000],
};

const DESIGN_MULT: Record<Design, number> = {
  template: 1,
  custom: 1.5,
  premium: 2.1,
};

const TIMELINE_MULT: Record<Timeline, number> = {
  "2weeks": 1.3,
  "1month": 1,
  "2months": 1,
};

export function WebsiteCostCalculator({ isUk }: Props) {
  const [step, setStep] = useState(0);
  const [siteType, setSiteType] = useState<SiteType | null>(null);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [design, setDesign] = useState<Design | null>(null);
  const [timeline, setTimeline] = useState<Timeline | null>(null);

  const t = isUk
    ? {
        stepLabels: ["Тип сайту", "Функції", "Дизайн", "Терміни", "Результат"],
        step1Title: "Який тип сайту вам потрібен?",
        step2Title: "Які функції вам необхідні?",
        step3Title: "Яка складність дизайну?",
        step4Title: "Які терміни реалізації?",
        siteTypes: [
          { id: "landing", label: "Лендінг", desc: "1–5 сторінок, максимальна конверсія", icon: "🎯" },
          { id: "corporate", label: "Корпоративний сайт", desc: "Представницький сайт компанії", icon: "🏢" },
          { id: "ecommerce", label: "Інтернет-магазин", desc: "Каталог товарів, кошик, оплата", icon: "🛒" },
          { id: "blog", label: "Блог / Портфоліо", desc: "Контент-платформа або особистий бренд", icon: "✍️" },
          { id: "portal", label: "Портал / SaaS", desc: "Складний продукт із кабінетом користувача", icon: "⚙️" },
        ],
        featureList: [
          { id: "booking", label: "Онлайн-запис / Бронювання", icon: "📅" },
          { id: "cart", label: "Кошик та онлайн-оплата", icon: "💳" },
          { id: "crm", label: "CRM-інтеграція", icon: "🔄" },
          { id: "multilang", label: "Мультимовність (EN + UK)", icon: "🌐" },
          { id: "chat", label: "Чат-бот або підтримка", icon: "💬" },
          { id: "blog", label: "Блог / Статті", icon: "📝" },
        ],
        designTypes: [
          { id: "template", label: "Шаблонний дизайн", desc: "Швидко та бюджетно, перевірений UX", icon: "📋" },
          { id: "custom", label: "Кастомний дизайн", desc: "Унікальний під бренд, без шаблонів", icon: "🎨" },
          { id: "premium", label: "Преміум анімований", desc: "Awwwards-рівень: мікроанімації, 3D, ефекти", icon: "✨" },
        ],
        timelineTypes: [
          { id: "2weeks", label: "2 тижні", desc: "Терміново (+30% rush fee)", icon: "⚡" },
          { id: "1month", label: "1 місяць", desc: "Стандартний темп", icon: "📅" },
          { id: "2months", label: "2 місяці", desc: "Розширений план, більше деталей", icon: "🛠️" },
        ],
        next: "Далі →",
        back: "← Назад",
        skip: "Пропустити",
        restart: "Порахувати ще раз",
        resultTitle: "Орієнтовна вартість вашого проєкту",
        resultSub: "Фінальна ціна уточнюється після безкоштовної консультації",
        base: "Базова розробка",
        features: "Додаткові функції",
        design: "Дизайн",
        rush: "Терміновість",
        total: "Разом",
        cta: "Отримати точну пропозицію",
        ctaSub: "Безкоштовна консультація · Без зобов'язань",
        currency: "₴",
      }
    : {
        stepLabels: ["Site Type", "Features", "Design", "Timeline", "Result"],
        step1Title: "What type of website do you need?",
        step2Title: "Which features do you need?",
        step3Title: "What design complexity?",
        step4Title: "What is your timeline?",
        siteTypes: [
          { id: "landing", label: "Landing Page", desc: "1–5 pages, maximum conversion focus", icon: "🎯" },
          { id: "corporate", label: "Corporate Website", desc: "Company representation site", icon: "🏢" },
          { id: "ecommerce", label: "Online Store", desc: "Product catalogue, cart, payments", icon: "🛒" },
          { id: "blog", label: "Blog / Portfolio", desc: "Content platform or personal brand", icon: "✍️" },
          { id: "portal", label: "Portal / SaaS", desc: "Complex product with user dashboard", icon: "⚙️" },
        ],
        featureList: [
          { id: "booking", label: "Online Booking / Reservations", icon: "📅" },
          { id: "cart", label: "Shopping Cart & Payments", icon: "💳" },
          { id: "crm", label: "CRM Integration", icon: "🔄" },
          { id: "multilang", label: "Multilingual (EN + UA)", icon: "🌐" },
          { id: "chat", label: "Chatbot or Live Support", icon: "💬" },
          { id: "blog", label: "Blog / Articles", icon: "📝" },
        ],
        designTypes: [
          { id: "template", label: "Template Design", desc: "Fast and cost-effective, proven UX", icon: "📋" },
          { id: "custom", label: "Custom Design", desc: "Unique brand identity, no templates", icon: "🎨" },
          { id: "premium", label: "Premium Animated", desc: "Awwwards-level: micro-animations, 3D effects", icon: "✨" },
        ],
        timelineTypes: [
          { id: "2weeks", label: "2 Weeks", desc: "Rush delivery (+30% fee)", icon: "⚡" },
          { id: "1month", label: "1 Month", desc: "Standard pace", icon: "📅" },
          { id: "2months", label: "2 Months", desc: "Extended plan, more detail", icon: "🛠️" },
        ],
        next: "Next →",
        back: "← Back",
        skip: "Skip",
        restart: "Calculate Again",
        resultTitle: "Estimated Project Cost",
        resultSub: "Final price confirmed after a free consultation",
        base: "Base Development",
        features: "Additional Features",
        design: "Design",
        rush: "Rush Fee",
        total: "Total",
        cta: "Get an Exact Quote",
        ctaSub: "Free consultation · No commitment",
        currency: "£",
      };

  function uahToGbp(n: number) {
    return Math.round(n / 40 / 100) * 100;
  }

  function fmt(n: number) {
    return isUk ? `₴${n.toLocaleString()}` : `£${uahToGbp(n).toLocaleString()}`;
  }

  function calcPrice() {
    if (!siteType || !design || !timeline) return null;
    const [bMin, bMax] = BASE_PRICES_UAH[siteType];
    let fMin = 0, fMax = 0;
    for (const f of features) {
      const [fm, fx] = FEATURE_PRICES_UAH[f];
      fMin += fm; fMax += fx;
    }
    const dm = DESIGN_MULT[design];
    const tm = TIMELINE_MULT[timeline];
    const min = Math.round(((bMin + fMin) * dm * tm) / 1000) * 1000;
    const max = Math.round(((bMax + fMax) * dm * tm) / 1000) * 1000;
    const baseMin = Math.round((bMin * dm) / 1000) * 1000;
    const baseMax = Math.round((bMax * dm) / 1000) * 1000;
    const featMin = Math.round((fMin * dm) / 1000) * 1000;
    const featMax = Math.round((fMax * dm) / 1000) * 1000;
    const rushMin = tm > 1 ? Math.round(((bMin + fMin) * dm * (tm - 1)) / 1000) * 1000 : 0;
    const rushMax = tm > 1 ? Math.round(((bMax + fMax) * dm * (tm - 1)) / 1000) * 1000 : 0;
    return { min, max, baseMin, baseMax, featMin, featMax, rushMin, rushMax };
  }

  const price = step === 4 ? calcPrice() : null;

  function toggleFeature(f: Feature) {
    setFeatures((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  }

  const progressWidth = `${(step / 4) * 100}%`;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {t.stepLabels.map((label, i) => (
            <span
              key={i}
              className={`text-xs font-semibold ${i <= step ? "text-indigo-600" : "text-neutral-400"}`}
            >
              {i + 1}. {label}
            </span>
          ))}
        </div>
        <div className="h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-indigo-500 to-violet-600 rounded-full transition-all duration-500"
            style={{ width: progressWidth }}
          />
        </div>
      </div>

      {/* Step 0: Site Type */}
      {step === 0 && (
        <div>
          <h2 className="text-xl font-heading font-extrabold text-neutral-900 dark:text-white mb-6">{t.step1Title}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {t.siteTypes.map((s) => (
              <button
                key={s.id}
                onClick={() => setSiteType(s.id as SiteType)}
                className={`flex items-start gap-3 p-4 rounded-2xl border-2 text-left transition-all ${
                  siteType === s.id
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-indigo-300"
                }`}
              >
                <span className="text-2xl shrink-0">{s.icon}</span>
                <div>
                  <p className="font-semibold text-sm text-neutral-900">{s.label}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{s.desc}</p>
                </div>
                {siteType === s.id && <Check className="w-4 h-4 text-indigo-600 ml-auto shrink-0" />}
              </button>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setStep(1)}
              disabled={!siteType}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {t.next} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 1: Features */}
      {step === 1 && (
        <div>
          <h2 className="text-xl font-heading font-extrabold text-neutral-900 dark:text-white mb-2">{t.step2Title}</h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">{isUk ? "Оберіть все, що підходить" : "Select all that apply"}</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {t.featureList.map((f) => (
              <button
                key={f.id}
                onClick={() => toggleFeature(f.id as Feature)}
                className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all ${
                  features.includes(f.id as Feature)
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-indigo-300"
                }`}
              >
                <span className="text-xl shrink-0">{f.icon}</span>
                <p className="font-semibold text-sm text-neutral-900 dark:text-white flex-1">{f.label}</p>
                {features.includes(f.id as Feature) && <Check className="w-4 h-4 text-indigo-600 shrink-0" />}
              </button>
            ))}
          </div>
          <div className="mt-6 flex justify-between">
            <button onClick={() => setStep(0)} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 transition-colors">
              <ArrowLeft className="w-4 h-4" /> {t.back}
            </button>
            <button onClick={() => setStep(2)} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors">
              {t.next} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Design */}
      {step === 2 && (
        <div>
          <h2 className="text-xl font-heading font-extrabold text-neutral-900 dark:text-white mb-6">{t.step3Title}</h2>
          <div className="space-y-3">
            {t.designTypes.map((d) => (
              <button
                key={d.id}
                onClick={() => setDesign(d.id as Design)}
                className={`flex items-start gap-4 w-full p-5 rounded-2xl border-2 text-left transition-all ${
                  design === d.id
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-indigo-300"
                }`}
              >
                <span className="text-3xl shrink-0">{d.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-neutral-900">{d.label}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{d.desc}</p>
                </div>
                {design === d.id && <Check className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />}
              </button>
            ))}
          </div>
          <div className="mt-6 flex justify-between">
            <button onClick={() => setStep(1)} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 transition-colors">
              <ArrowLeft className="w-4 h-4" /> {t.back}
            </button>
            <button onClick={() => setStep(3)} disabled={!design} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
              {t.next} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Timeline */}
      {step === 3 && (
        <div>
          <h2 className="text-xl font-heading font-extrabold text-neutral-900 dark:text-white mb-6">{t.step4Title}</h2>
          <div className="space-y-3">
            {t.timelineTypes.map((tl) => (
              <button
                key={tl.id}
                onClick={() => setTimeline(tl.id as Timeline)}
                className={`flex items-start gap-4 w-full p-5 rounded-2xl border-2 text-left transition-all ${
                  timeline === tl.id
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-indigo-300"
                }`}
              >
                <span className="text-3xl shrink-0">{tl.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-neutral-900">{tl.label}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{tl.desc}</p>
                </div>
                {timeline === tl.id && <Check className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />}
              </button>
            ))}
          </div>
          <div className="mt-6 flex justify-between">
            <button onClick={() => setStep(2)} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 transition-colors">
              <ArrowLeft className="w-4 h-4" /> {t.back}
            </button>
            <button
              onClick={() => setStep(4)}
              disabled={!timeline}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isUk ? "Порахувати →" : "Calculate →"} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Result */}
      {step === 4 && price && (
        <div>
          <div className="text-center mb-8">
            <span className="text-5xl block mb-3">💰</span>
            <h2 className="text-2xl font-heading font-extrabold text-neutral-900 dark:text-white mb-2">{t.resultTitle}</h2>
            <p className="text-sm text-neutral-500">{t.resultSub}</p>
          </div>

          {/* Price Range */}
          <div className="bg-linear-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 text-center mb-6 text-white">
            <p className="text-indigo-200 text-sm mb-2">{isUk ? "Діапазон вартості" : "Price range"}</p>
            <p className="text-4xl font-heading font-extrabold">
              {fmt(price.min)} — {fmt(price.max)}
            </p>
            <p className="text-indigo-200 text-xs mt-2">
              {isUk ? "з урахуванням обраних параметрів" : "based on selected parameters"}
            </p>
          </div>

          {/* Breakdown */}
          <div className="space-y-3 mb-8">
            <div className="flex justify-between py-3 border-b border-neutral-100 dark:border-neutral-700 text-sm">
              <span className="text-neutral-600">{t.base}</span>
              <span className="font-semibold">{fmt(price.baseMin)} — {fmt(price.baseMax)}</span>
            </div>
            {price.featMin > 0 && (
              <div className="flex justify-between py-3 border-b border-neutral-100 dark:border-neutral-700 text-sm">
                <span className="text-neutral-600">{t.features} ({features.length})</span>
                <span className="font-semibold">+{fmt(price.featMin)} — +{fmt(price.featMax)}</span>
              </div>
            )}
            {price.rushMin > 0 && (
              <div className="flex justify-between py-3 border-b border-neutral-100 dark:border-neutral-700 text-sm">
                <span className="text-amber-600">{t.rush}</span>
                <span className="font-semibold text-amber-600">+{fmt(price.rushMin)} — +{fmt(price.rushMax)}</span>
              </div>
            )}
            <div className="flex justify-between py-3 text-base font-bold">
              <span className="text-neutral-900">{t.total}</span>
              <span className="text-indigo-600">{fmt(price.min)} — {fmt(price.max)}</span>
            </div>
          </div>

          <div className="text-center space-y-3">
            <a
              href={`/${isUk ? "uk" : "en"}/contact`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
            >
              {t.cta} <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-xs text-neutral-400">{t.ctaSub}</p>
            <button
              onClick={() => {
                setStep(0);
                setSiteType(null);
                setFeatures([]);
                setDesign(null);
                setTimeline(null);
              }}
              className="flex items-center gap-2 mx-auto text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:text-neutral-300 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> {t.restart}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
