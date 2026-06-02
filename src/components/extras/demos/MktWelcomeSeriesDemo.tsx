"use client";

import { useState } from "react";
import { Mail, Clock, Sparkles, Send, Eye } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

const SERIES = [
  {
    id: 1,
    delayLabel: { en: "Immediate", uk: "Одразу" },
    subjectEn: "Welcome to Codeworth! 👋",
    subjectUk: "Ласкаво просимо до Codeworth! 👋",
    bodyEn: "Hi {{firstName}}, thanks for joining. Here's everything you need to get started: our blog, free tools, and a 30-min consultation booking link.",
    bodyUk: "Привіт {{firstName}}, дякуємо що приєдналися! Ось все що треба для старту: наш блог, безкоштовні інструменти, та лінк на 30-хвилинну консультацію.",
    ctaEn: "Explore tools",
    ctaUk: "Подивитись інструменти",
    metrics: { open: 68, click: 32 },
  },
  {
    id: 2,
    delayLabel: { en: "Day 2", uk: "День 2" },
    subjectEn: "Our most popular guides",
    subjectUk: "Наші найпопулярніші гайди",
    bodyEn: "Hand-picked content based on what 90% of new subscribers find most useful: Next.js SEO, conversion optimization, AI for business.",
    bodyUk: "Підбірка контенту на основі того, що 90% нових підписників вважають найкориснішим: Next.js SEO, оптимізація конверсії, AI для бізнесу.",
    ctaEn: "Read top 3 guides",
    ctaUk: "Читати топ-3 гайди",
    metrics: { open: 52, click: 24 },
  },
  {
    id: 3,
    delayLabel: { en: "Day 5", uk: "День 5" },
    subjectEn: "Case study: +89% conversion in 30 days",
    subjectUk: "Кейс: +89% конверсії за 30 днів",
    bodyEn: "How we rebuilt FoodCo's landing page using SSG + Schema.org. Real numbers, real screenshots, real lessons.",
    bodyUk: "Як ми переробили лендінг FoodCo з SSG + Schema.org. Реальні цифри, скріншоти, уроки.",
    ctaEn: "Read case study",
    ctaUk: "Читати кейс",
    metrics: { open: 41, click: 18 },
  },
  {
    id: 4,
    delayLabel: { en: "Day 8", uk: "День 8" },
    subjectEn: "Special: 15% off your first project",
    subjectUk: "Спеціально: 15% знижки на перший проєкт",
    bodyEn: "Ready to start? Book a free consultation this week and get 15% off any package. Promo: WELCOME15.",
    bodyUk: "Готові починати? Запишіться на безкоштовну консультацію цього тижня — 15% знижки на будь-який пакет. Промокод: WELCOME15.",
    ctaEn: "Book consultation",
    ctaUk: "Записатися",
    metrics: { open: 38, click: 22 },
  },
];

export function MktWelcomeSeriesDemo({ isUk }: Props) {
  const [active, setActive] = useState(0);
  const email = SERIES[active];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-linear-to-r from-violet-600 to-indigo-600 text-white p-5 flex items-center gap-3">
        <Sparkles className="w-8 h-8 shrink-0" />
        <div className="flex-1">
          <h3 className="font-bold">{isUk ? "Welcome-серія (4 листи)" : "Welcome series (4 emails)"}</h3>
          <p className="text-sm text-white/80">
            {isUk ? "Автоматична послідовність після підписки. Тригер: новий subscriber." : "Auto sequence after subscription. Trigger: new subscriber."}
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-neutral-200" />
        <div
          className="absolute top-5 left-0 h-0.5 bg-emerald-500 transition-all duration-500"
          style={{ width: `${(active / (SERIES.length - 1)) * 100}%` }}
        />
        <div className="relative flex justify-between">
          {SERIES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className="flex flex-col items-center group"
            >
              <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                i === active ? "bg-indigo-600 text-white ring-4 ring-indigo-100 scale-110" :
                i < active ? "bg-emerald-500 text-white" :
                "bg-white border-2 border-neutral-200 text-neutral-500"
              }`}>
                <Mail className="w-4 h-4" />
              </div>
              <p className="mt-2 text-xs font-semibold text-center max-w-[80px] text-neutral-700">
                {isUk ? s.delayLabel.uk : s.delayLabel.en}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Email preview */}
        <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden">
          <div className="px-4 py-3 border-b border-neutral-100 bg-neutral-50">
            <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
              <span className="flex items-center gap-1.5">
                <Send className="w-3 h-3" />
                noreply@codeworth.uk
              </span>
              <span>{isUk ? email.delayLabel.uk : email.delayLabel.en}</span>
            </div>
            <h4 className="font-bold text-neutral-900 text-sm">{isUk ? email.subjectUk : email.subjectEn}</h4>
          </div>
          <div className="p-5 space-y-4">
            <p className="text-sm text-neutral-700 leading-relaxed">{isUk ? email.bodyUk : email.bodyEn}</p>
            <button className="w-full py-2.5 rounded-lg bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors">
              {isUk ? email.ctaUk : email.ctaEn}
            </button>
            <p className="text-xs text-neutral-400 text-center pt-2 border-t border-neutral-100">
              {isUk ? "Скасувати підписку" : "Unsubscribe"} · {isUk ? "Налаштування" : "Preferences"}
            </p>
          </div>
        </div>

        {/* Metrics + automation rules */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-neutral-200 bg-white p-5">
            <h4 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
              <Eye className="w-4 h-4 text-indigo-500" />
              {isUk ? "Метрики листа" : "Email metrics"}
            </h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-600">{isUk ? "Open rate" : "Open rate"}</span>
                  <span className="font-bold tabular-nums">{email.metrics.open}%</span>
                </div>
                <div className="h-2 rounded-full bg-neutral-100 overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${email.metrics.open}%` }}
                    role="progressbar"
                    aria-valuenow={email.metrics.open}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`Open rate: ${email.metrics.open}%`}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-600">{isUk ? "Click rate" : "Click rate"}</span>
                  <span className="font-bold tabular-nums">{email.metrics.click}%</span>
                </div>
                <div className="h-2 rounded-full bg-neutral-100 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${email.metrics.click}%` }}
                    role="progressbar"
                    aria-valuenow={email.metrics.click}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`Click rate: ${email.metrics.click}%`}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800 flex gap-2">
            <Clock className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold mb-0.5">{isUk ? "Smart timing" : "Smart timing"}</p>
              <p>
                {isUk
                  ? "Листи надсилаються у 10:00 локального часу subscriber для +18% open rate."
                  : "Emails sent at 10:00 subscriber-local time for +18% open rate."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-neutral-500">
        {isUk
          ? "Welcome-серія підвищує LTV нового підписника на 27%. Production: Mailchimp / Brevo / Resend Audiences."
          : "Welcome series boosts new-subscriber LTV by 27%. Production: Mailchimp / Brevo / Resend Audiences."}
      </p>
    </div>
  );
}
