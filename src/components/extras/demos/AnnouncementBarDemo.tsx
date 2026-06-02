"use client";

import { useState } from "react";
import { X, Truck, Tag, Clock } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

const BARS = [
  {
    id: "promo",
    icon: <Tag className="w-4 h-4 shrink-0" />,
    bg: "from-indigo-600 to-violet-600",
    text: { en: "🎉 Summer Sale: 20% off all landing pages this week only!", uk: "🎉 Літній розпродаж: -20% на всі лендінги лише цього тижня!" },
    cta: { en: "Shop Now", uk: "Замовити" },
  },
  {
    id: "shipping",
    icon: <Truck className="w-4 h-4 shrink-0" />,
    bg: "from-emerald-600 to-teal-600",
    text: { en: "🚚 Free delivery on all orders over £500 — limited time!", uk: "🚚 Безкоштовна доставка на замовлення від 500₴ — обмежений час!" },
    cta: { en: "Order", uk: "Замовити" },
  },
  {
    id: "countdown",
    icon: <Clock className="w-4 h-4 shrink-0" />,
    bg: "from-orange-500 to-rose-500",
    text: { en: "⏰ Offer ends in 2d 14h 30m — don't miss out!", uk: "⏰ Пропозиція закінчується через 2д 14г 30хв — не пропусти!" },
    cta: { en: "Grab It", uk: "Взяти" },
  },
];

export function AnnouncementBarDemo({ variant, isUk }: Props) {
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [position, setPosition] = useState<"top" | "bottom">("top");

  const visibleBars = BARS.filter((b) => !dismissed.includes(b.id));
  const currentBar = visibleBars[0];

  function dismiss(id: string) {
    setDismissed((prev) => [...prev, id]);
  }

  function reset() {
    setDismissed([]);
  }

  const posLabel = isUk
    ? position === "top" ? "Зверху" : "Знизу"
    : position === "top" ? "Top" : "Bottom";

  return (
    <div className="relative w-full min-h-[480px] bg-neutral-100 dark:bg-neutral-800 rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-700 flex flex-col">
      {/* Simulated browser chrome */}
      <div className="bg-neutral-200 px-4 py-2 flex items-center gap-2 shrink-0">
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-amber-400" />
        <div className="w-3 h-3 rounded-full bg-green-400" />
        <div className="flex-1 mx-3 h-6 rounded-lg bg-white/70 flex items-center justify-center text-[10px] text-neutral-400">
          yoursite.com
        </div>
        {/* Controls */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-neutral-500">{isUk ? "Позиція:" : "Position:"}</span>
          <button
            onClick={() => setPosition(position === "top" ? "bottom" : "top")}
            className="px-2 py-0.5 rounded-md bg-white text-indigo-700 font-semibold border border-indigo-200 hover:bg-indigo-50 transition-colors"
          >
            {posLabel}
          </button>
        </div>
      </div>

      {/* Announcement bar — top */}
      {position === "top" && currentBar && (
        <div className={`bg-linear-to-r ${currentBar.bg} text-white px-4 py-2.5 flex items-center gap-3 shrink-0`}>
          {currentBar.icon}
          <p className="flex-1 text-xs font-semibold text-center leading-snug">
            {isUk ? currentBar.text.uk : currentBar.text.en}
          </p>
          <a href="#" className="shrink-0 bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-1 rounded-full transition-colors">
            {isUk ? currentBar.cta.uk : currentBar.cta.en}
          </a>
          <button
            onClick={() => dismiss(currentBar.id)}
            aria-label="Dismiss"
            className="shrink-0 hover:text-white/70 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Page content */}
      <div className="flex-1 p-6 flex flex-col items-center justify-center gap-4">
        <div className="w-full max-w-sm bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden">
          <div className="h-24 bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
            <span className="text-4xl font-bold text-white/30">📢</span>
          </div>
          <div className="p-4 space-y-2">
            <div className="h-4 bg-neutral-200 rounded-full w-3/4" />
            <div className="h-3 bg-neutral-100 dark:bg-neutral-800 rounded-full w-full" />
            <div className="h-3 bg-neutral-100 dark:bg-neutral-800 rounded-full w-5/6" />
          </div>
        </div>

        {/* Style switcher */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <span className="text-xs text-neutral-500">{isUk ? "Стиль:" : "Style:"}</span>
          {BARS.map((b) => (
            <button
              key={b.id}
              onClick={() => setDismissed(BARS.filter((x) => x.id !== b.id).map((x) => x.id))}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                currentBar?.id === b.id
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:border-indigo-300"
              }`}
            >
              {b.id === "promo" ? (isUk ? "Промо" : "Promo") : b.id === "shipping" ? (isUk ? "Доставка" : "Shipping") : (isUk ? "Таймер" : "Timer")}
            </button>
          ))}
        </div>

        {dismissed.length > 0 && (
          <button
            onClick={reset}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold underline underline-offset-2"
          >
            {isUk ? "↺ Показати знову" : "↺ Show again"}
          </button>
        )}
      </div>

      {/* Announcement bar — bottom */}
      {position === "bottom" && currentBar && (
        <div className={`bg-linear-to-r ${currentBar.bg} text-white px-4 py-2.5 flex items-center gap-3 shrink-0`}>
          {currentBar.icon}
          <p className="flex-1 text-xs font-semibold text-center leading-snug">
            {isUk ? currentBar.text.uk : currentBar.text.en}
          </p>
          <a href="#" className="shrink-0 bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-1 rounded-full transition-colors">
            {isUk ? currentBar.cta.uk : currentBar.cta.en}
          </a>
          <button
            onClick={() => dismiss(currentBar.id)}
            aria-label="Dismiss"
            className="shrink-0 hover:text-white/70 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
