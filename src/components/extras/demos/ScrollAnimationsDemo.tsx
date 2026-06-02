"use client";

import { useState, useRef, useEffect } from "react";

interface Props {
  variant?: string;
  isUk: boolean;
}

const ANIMATION_TYPES = [
  { id: "fade", label: { en: "Fade In", uk: "Fade In" }, class: "transition-all duration-700", visible: "opacity-100 translate-y-0", hidden: "opacity-0 translate-y-6" },
  { id: "slide", label: { en: "Slide Left", uk: "Slide Left" }, class: "transition-all duration-700", visible: "opacity-100 translate-x-0", hidden: "opacity-0 -translate-x-8" },
  { id: "zoom", label: { en: "Zoom In", uk: "Zoom In" }, class: "transition-all duration-700", visible: "opacity-100 scale-100", hidden: "opacity-0 scale-90" },
];

const CARDS = [
  { emoji: "🏆", title: { en: "Award-winning design", uk: "Нагороджений дизайн" }, color: "from-amber-400 to-orange-500" },
  { emoji: "⚡", title: { en: "Lightning fast speed", uk: "Блискавична швидкість" }, color: "from-sky-400 to-blue-500" },
  { emoji: "🔒", title: { en: "Secure & reliable", uk: "Безпека та надійність" }, color: "from-emerald-400 to-green-500" },
];

export function ScrollAnimationsDemo({ isUk }: Props) {
  const [animType, setAnimType] = useState("fade");
  const [visible, setVisible] = useState(false);
  const [key, setKey] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const anim = ANIMATION_TYPES.find((a) => a.id === animType)!;

  function replay() {
    setVisible(false);
    setKey((k) => k + 1);
    setTimeout(() => setVisible(true), 200);
  }

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 400);
    return () => clearTimeout(timer);
  }, [key]);

  return (
    <div className="w-full min-h-[520px] bg-white rounded-3xl border border-neutral-200 overflow-hidden flex flex-col">
      {/* Controls */}
      <div className="border-b border-neutral-100 px-6 py-4 bg-neutral-50 flex items-center gap-4 flex-wrap">
        <span className="text-sm font-semibold text-neutral-700">
          {isUk ? "Тип анімації:" : "Animation type:"}
        </span>
        <div className="flex gap-2">
          {ANIMATION_TYPES.map((a) => (
            <button
              key={a.id}
              onClick={() => { setAnimType(a.id); setKey((k) => k + 1); setVisible(false); setTimeout(() => setVisible(true), 200); }}
              className={`px-3 py-1.5 rounded-xl text-sm font-semibold border transition-all ${
                animType === a.id
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-neutral-600 border-neutral-200 hover:border-indigo-300"
              }`}
            >
              {isUk ? a.label.uk : a.label.en}
            </button>
          ))}
        </div>
        <button
          onClick={replay}
          className="ml-auto px-3 py-1.5 rounded-xl text-sm font-semibold bg-white border border-neutral-200 text-neutral-600 hover:border-indigo-300 hover:text-indigo-600 transition-all"
        >
          ↺ {isUk ? "Повторити" : "Replay"}
        </button>
      </div>

      {/* Animated cards */}
      <div className="flex-1 p-8 flex flex-col justify-center gap-6">
        {/* Hero text block */}
        <div
          key={`hero-${key}`}
          className={`text-center ${anim.class} ${visible ? anim.visible : anim.hidden}`}
          style={{ transitionDelay: "0ms" }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold mb-3">
            {isUk ? "✨ Анімація при скролі" : "✨ Scroll Animation"}
          </span>
          <h2 className="text-2xl font-heading font-bold text-neutral-900">
            {isUk ? "Елементи з'являються при скролі" : "Elements animate into view"}
          </h2>
          <p className="text-neutral-500 text-sm mt-1">
            {isUk ? "Intersection Observer + CSS transitions" : "Intersection Observer + CSS transitions"}
          </p>
        </div>

        {/* Cards row */}
        <div className="grid grid-cols-3 gap-4">
          {CARDS.map((card, i) => (
            <div
              key={`card-${i}-${key}`}
              className={`rounded-2xl overflow-hidden shadow-sm border border-neutral-100 ${anim.class} ${visible ? anim.visible : anim.hidden}`}
              style={{ transitionDelay: visible ? `${200 + i * 100}ms` : "0ms" }}
            >
              <div className={`h-20 bg-linear-to-br ${card.color} flex items-center justify-center text-3xl`}>
                {card.emoji}
              </div>
              <div className="p-3 bg-white">
                <p className="text-xs font-semibold text-neutral-800 text-center">
                  {isUk ? card.title.uk : card.title.en}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA button */}
        <div
          key={`cta-${key}`}
          className={`flex justify-center ${anim.class} ${visible ? anim.visible : anim.hidden}`}
          style={{ transitionDelay: visible ? "550ms" : "0ms" }}
        >
          <button className="px-6 py-3 rounded-2xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
            {isUk ? "Замовити з анімацією" : "Get with animations"}
          </button>
        </div>
      </div>
    </div>
  );
}
