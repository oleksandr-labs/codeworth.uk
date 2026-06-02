"use client";

import { useEffect, useState } from "react";
import { Clock, RotateCcw } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

function getTargetDate(seconds: number): number {
  return Date.now() + seconds * 1000;
}

function formatDiff(ms: number) {
  if (ms <= 0) return { d: 0, h: 0, m: 0, s: 0 };
  const totalSec = Math.floor(ms / 1000);
  return {
    d: Math.floor(totalSec / 86400),
    h: Math.floor((totalSec % 86400) / 3600),
    m: Math.floor((totalSec % 3600) / 60),
    s: totalSec % 60,
  };
}

const PRESETS = [
  { id: "flash-sale", seconds: 3 * 24 * 3600 + 7 * 3600 + 23 * 60 + 45, labelUk: "Flash-розпродаж", labelEn: "Flash Sale", gradient: "from-rose-500 to-orange-500" },
  { id: "launch", seconds: 12 * 24 * 3600 + 5 * 3600, labelUk: "Запуск продукту", labelEn: "Product Launch", gradient: "from-indigo-600 to-violet-600" },
  { id: "promo", seconds: 60 * 60 + 30 * 60, labelUk: "Промокод діє", labelEn: "Promo Active", gradient: "from-emerald-600 to-teal-600" },
];

export function CountdownDemo({ isUk }: Props) {
  const [presetIdx, setPresetIdx] = useState(0);
  const [target, setTarget] = useState(() => getTargetDate(PRESETS[0].seconds));
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const preset = PRESETS[presetIdx];
  const diff = formatDiff(target - now);
  const expired = target - now <= 0;

  const reset = () => setTarget(getTargetDate(preset.seconds));

  const handlePreset = (idx: number) => {
    setPresetIdx(idx);
    setTarget(getTargetDate(PRESETS[idx].seconds));
  };

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p, i) => (
          <button
            key={p.id}
            onClick={() => handlePreset(i)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              i === presetIdx
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-indigo-50"
            }`}
          >
            {isUk ? p.labelUk : p.labelEn}
          </button>
        ))}
        <button
          onClick={reset}
          className="ml-auto flex items-center gap-1.5 px-3 py-2 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:text-white transition-colors"
          aria-label={isUk ? "Скинути таймер" : "Reset timer"}
        >
          <RotateCcw className="w-4 h-4" />
          {isUk ? "Скинути" : "Reset"}
        </button>
      </div>

      <div className={`relative rounded-2xl p-8 bg-linear-to-br ${preset.gradient} text-white text-center overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative">
          <div className="flex items-center justify-center gap-2 mb-3 text-white/80 text-sm">
            <Clock className="w-4 h-4" />
            {isUk ? "До закінчення:" : "Time remaining:"}
          </div>
          <h3 className="font-bold text-2xl mb-6">{isUk ? preset.labelUk : preset.labelEn}</h3>
          {expired ? (
            <div className="text-3xl font-bold py-6">
              {isUk ? "⏰ Час вийшов!" : "⏰ Time's up!"}
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
              {[
                { v: diff.d, l: isUk ? "днів" : "days" },
                { v: diff.h, l: isUk ? "год" : "hrs" },
                { v: diff.m, l: isUk ? "хв" : "min" },
                { v: diff.s, l: isUk ? "сек" : "sec" },
              ].map((item, i) => (
                <div key={i} className="rounded-xl bg-white/15 backdrop-blur-sm p-3 border border-white/20">
                  <div className="text-3xl md:text-4xl font-bold tabular-nums">{pad(item.v)}</div>
                  <div className="text-xs text-white/70 mt-1">{item.l}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <p className="text-sm text-neutral-500">
        {isUk
          ? "Таймер працює в реальному часі. Налаштовується дата, повідомлення про закінчення, дизайн."
          : "Real-time countdown. Configurable target date, expiration message, design."}
      </p>
    </div>
  );
}
