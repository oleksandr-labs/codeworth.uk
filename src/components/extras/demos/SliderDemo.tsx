"use client";

import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

const TESTIMONIALS = [
  {
    nameEn: "Sarah Mitchell",
    nameUk: "Сара Мітчелл",
    roleEn: "CEO at FoodCo (UK)",
    roleUk: "CEO у FoodCo (UK)",
    quoteEn: "Codeworth delivered our SaaS landing in 8 days. Conversion went up 47% in the first month.",
    quoteUk: "Codeworth зробили SaaS-лендінг за 8 днів. Конверсія виросла на 47% за перший місяць.",
    avatar: "S",
    color: "from-rose-500 to-pink-600",
  },
  {
    nameEn: "Oleksandr Petrov",
    nameUk: "Олександр Петров",
    roleEn: "Founder, Kyiv Tech",
    roleUk: "Засновник, Kyiv Tech",
    quoteEn: "We were skeptical about Next.js for our marketplace. Now I would not choose anything else.",
    quoteUk: "Ми сумнівалися щодо Next.js для маркетплейсу. Тепер не обрав би нічого іншого.",
    avatar: "O",
    color: "from-indigo-500 to-violet-600",
  },
  {
    nameEn: "Anna Schmidt",
    nameUk: "Анна Шмідт",
    roleEn: "Marketing Lead, BerlinFin",
    roleUk: "Marketing Lead, BerlinFin",
    quoteEn: "Lighthouse score 98, organic traffic +180% in 6 months. Real numbers, no fluff.",
    quoteUk: "Lighthouse 98, органічний трафік +180% за 6 місяців. Реальні цифри, без води.",
    avatar: "A",
    color: "from-emerald-500 to-teal-600",
  },
  {
    nameEn: "Mike Thompson",
    nameUk: "Майк Томпсон",
    roleEn: "Founder, ManchesterRetail",
    roleUk: "Засновник, ManchesterRetail",
    quoteEn: "Best agency we've worked with. Clean code, fast delivery, transparent communication.",
    quoteUk: "Найкраща агенція з якою ми працювали. Чистий код, швидко, прозоро.",
    avatar: "M",
    color: "from-amber-500 to-orange-600",
  },
];

export function SliderDemo({ isUk }: Props) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  const next = useCallback(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length), []);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [playing, next]);

  const current = TESTIMONIALS[index];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-neutral-900">
          {isUk ? "Відгуки клієнтів" : "Client testimonials"}
        </h3>
        <button
          onClick={() => setPlaying((p) => !p)}
          className="flex items-center gap-1.5 px-3 py-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
          aria-label={playing ? (isUk ? "Пауза" : "Pause") : (isUk ? "Грати" : "Play")}
        >
          {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {playing ? (isUk ? "Пауза" : "Pause") : (isUk ? "Авто" : "Auto")}
        </button>
      </div>

      <div
        className="relative rounded-2xl border border-neutral-200 bg-white overflow-hidden"
        role="region"
        aria-roledescription="carousel"
        aria-label={isUk ? "Слайдер з відгуками клієнтів" : "Client testimonials carousel"}
      >
        <div className="relative h-64 sm:h-56 overflow-hidden">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className={`absolute inset-0 p-8 flex flex-col justify-center transition-all duration-500 ease-out ${
                i === index ? "opacity-100 translate-x-0" : i < index ? "opacity-0 -translate-x-8" : "opacity-0 translate-x-8"
              }`}
              aria-hidden={i !== index}
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-full bg-linear-to-br ${t.color} flex items-center justify-center font-bold text-white text-xl shrink-0`}>
                  {t.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-neutral-700 italic text-base leading-relaxed mb-3">
                    "{isUk ? t.quoteUk : t.quoteEn}"
                  </p>
                  <div className="font-bold text-neutral-900">{isUk ? t.nameUk : t.nameEn}</div>
                  <div className="text-sm text-neutral-500">{isUk ? t.roleUk : t.roleEn}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
          aria-label={isUk ? "Попередній" : "Previous"}
        >
          <ChevronLeft className="w-5 h-5 text-neutral-600" />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
          aria-label={isUk ? "Наступний" : "Next"}
        >
          <ChevronRight className="w-5 h-5 text-neutral-600" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-indigo-600" : "w-1.5 bg-neutral-300 hover:bg-neutral-400"
              }`}
              aria-label={`${isUk ? "Слайд" : "Slide"} ${i + 1}`}
              aria-current={i === index}
            />
          ))}
        </div>
      </div>

      <p className="text-sm text-neutral-500">
        {isUk
          ? "Auto-play з паузою на hover, swipe на мобільних, клавіатурна навігація (← →), ARIA roles для accessibility."
          : "Auto-play with pause-on-hover, swipe on mobile, keyboard navigation (← →), ARIA roles for accessibility."}
      </p>
    </div>
  );
}
