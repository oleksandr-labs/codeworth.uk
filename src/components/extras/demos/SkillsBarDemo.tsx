"use client";

import { useEffect, useState } from "react";
import { Play, RotateCcw } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

const PRESETS = {
  skills: {
    labelUk: "Навички розробника",
    labelEn: "Developer Skills",
    items: [
      { name: "Next.js / React", value: 95, color: "bg-indigo-500" },
      { name: "TypeScript", value: 90, color: "bg-blue-500" },
      { name: "Tailwind CSS", value: 88, color: "bg-cyan-500" },
      { name: "Node.js / API", value: 82, color: "bg-emerald-500" },
      { name: "PostgreSQL / Prisma", value: 75, color: "bg-violet-500" },
    ],
  },
  team: {
    labelUk: "KPI команди",
    labelEn: "Team KPIs",
    items: [
      { name: { en: "Sprint velocity", uk: "Швидкість спринта" }, value: 87, color: "bg-emerald-500" },
      { name: { en: "Code coverage", uk: "Покриття тестами" }, value: 73, color: "bg-blue-500" },
      { name: { en: "Lighthouse score", uk: "Lighthouse score" }, value: 96, color: "bg-amber-500" },
      { name: { en: "Customer satisfaction", uk: "Задоволеність клієнтів" }, value: 92, color: "bg-rose-500" },
    ],
  },
};

type PresetKey = keyof typeof PRESETS;

export function SkillsBarDemo({ isUk }: Props) {
  const [preset, setPreset] = useState<PresetKey>("skills");
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(false);
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, [preset]);

  const current = PRESETS[preset];
  const replay = () => {
    setAnimated(false);
    setTimeout(() => setAnimated(true), 80);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(PRESETS) as PresetKey[]).map((k) => (
          <button
            key={k}
            onClick={() => setPreset(k)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              k === preset
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-indigo-50"
            }`}
          >
            {isUk ? PRESETS[k].labelUk : PRESETS[k].labelEn}
          </button>
        ))}
        <button
          onClick={replay}
          className="ml-auto flex items-center gap-1.5 px-3 py-2 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:text-white transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          {isUk ? "Повторити" : "Replay"}
        </button>
      </div>

      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-6 space-y-5">
        <h3 className="font-bold text-lg text-neutral-900 dark:text-white flex items-center gap-2">
          <Play className="w-5 h-5 text-indigo-500" />
          {isUk ? current.labelUk : current.labelEn}
        </h3>
        {current.items.map((item, i) => {
          const name = typeof item.name === "string" ? item.name : (isUk ? item.name.uk : item.name.en);
          return (
            <div key={i}>
              <div className="flex items-center justify-between mb-1.5 text-sm">
                <span className="font-medium text-neutral-700">{name}</span>
                <span className="tabular-nums text-neutral-500 dark:text-neutral-400 font-semibold">{item.value}%</span>
              </div>
              <div className="h-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                <div
                  className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: animated ? `${item.value}%` : "0%", transitionDelay: `${i * 100}ms` }}
                  role="progressbar"
                  aria-valuenow={item.value}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={name}
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-sm text-neutral-500">
        {isUk
          ? "Анімовані прогрес-бари активуються при появі в viewport. Налаштовуються кольори, значення, підписи."
          : "Animated progress bars trigger on viewport entry. Customizable colors, values, labels."}
      </p>
    </div>
  );
}
