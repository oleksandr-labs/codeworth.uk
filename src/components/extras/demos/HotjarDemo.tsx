"use client";

import { useState } from "react";
import { Flame, MousePointer, ScrollText, Play, AlertTriangle } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

type ViewMode = "click" | "scroll" | "rage";

// Click heatmap: { x%, y%, intensity 0-1 }
const CLICKS = [
  { x: 25, y: 18, intensity: 0.9 },
  { x: 75, y: 18, intensity: 0.6 },
  { x: 50, y: 35, intensity: 1.0 },
  { x: 30, y: 55, intensity: 0.7 },
  { x: 70, y: 58, intensity: 0.5 },
  { x: 50, y: 75, intensity: 0.8 },
  { x: 20, y: 90, intensity: 0.4 },
  { x: 80, y: 90, intensity: 0.3 },
];

// Scroll depth: %  to reach
const SCROLL_DEPTH = [
  { depth: 25, pct: 98 },
  { depth: 50, pct: 87 },
  { depth: 75, pct: 62 },
  { depth: 100, pct: 38 },
];

// Rage clicks
const RAGE = [
  { x: 50, y: 35, count: 12, labelEn: "CTA button (broken link)", labelUk: "CTA кнопка (биле посилання)" },
  { x: 80, y: 75, count: 8, labelEn: "Form submit (validation issue)", labelUk: "Submit форми (validation)" },
];

export function HotjarDemo({ isUk }: Props) {
  const [mode, setMode] = useState<ViewMode>("click");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex gap-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 p-1">
          {([
            { id: "click", icon: MousePointer, labelEn: "Click heatmap", labelUk: "Клік-карта" },
            { id: "scroll", icon: ScrollText, labelEn: "Scroll depth", labelUk: "Глибина скролу" },
            { id: "rage", icon: AlertTriangle, labelEn: "Rage clicks", labelUk: "Rage clicks" },
          ] as const).map((m) => {
            const Icon = m.icon;
            return (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  mode === m.id ? "bg-white text-neutral-900 dark:text-white shadow-sm" : "text-neutral-500"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {isUk ? m.labelUk : m.labelEn}
              </button>
            );
          })}
        </div>
        <button
          className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 dark:bg-neutral-900 transition-colors"
          aria-label={isUk ? "Подивитись запис сесії" : "View session recording"}
        >
          <Play className="w-3.5 h-3.5" />
          {isUk ? "Запис сесії" : "Session replay"}
        </button>
      </div>

      <div className="relative rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white overflow-hidden aspect-[4/3] max-w-3xl mx-auto">
        {/* Faux page mockup */}
        <div className="absolute inset-0 p-6">
          <div className="h-8 bg-neutral-100 dark:bg-neutral-800 rounded mb-4 w-2/3" />
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="h-20 bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-700 rounded" />
            <div className="h-20 bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-700 rounded" />
          </div>
          <div className="h-32 bg-linear-to-br from-indigo-50 to-violet-50 rounded mb-4" />
          <div className="space-y-2">
            <div className="h-3 bg-neutral-100 dark:bg-neutral-800 rounded w-full" />
            <div className="h-3 bg-neutral-100 dark:bg-neutral-800 rounded w-5/6" />
            <div className="h-3 bg-neutral-100 dark:bg-neutral-800 rounded w-4/6" />
          </div>
          <div className="mt-4 h-12 bg-indigo-100 rounded" />
        </div>

        {/* Click heatmap */}
        {mode === "click" && (
          <div className="absolute inset-0 pointer-events-none">
            {CLICKS.map((c, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${c.x}%`,
                  top: `${c.y}%`,
                  width: `${60 + c.intensity * 60}px`,
                  height: `${60 + c.intensity * 60}px`,
                  background: `radial-gradient(circle, rgba(239,68,68,${c.intensity * 0.6}) 0%, rgba(251,191,36,${c.intensity * 0.4}) 40%, transparent 70%)`,
                  transform: "translate(-50%, -50%)",
                }}
                aria-hidden="true"
              />
            ))}
          </div>
        )}

        {/* Scroll depth bars */}
        {mode === "scroll" && (
          <div className="absolute inset-0 pointer-events-none flex flex-col">
            {SCROLL_DEPTH.map((s, i) => (
              <div
                key={i}
                className="flex-1 relative border-b border-dashed border-neutral-300 flex items-center"
                style={{
                  background: `linear-gradient(to right, rgba(99,102,241,${s.pct / 200}) ${s.pct}%, transparent ${s.pct}%)`,
                }}
              >
                <span className="absolute right-2 top-1 px-2 py-0.5 bg-white rounded text-xs font-semibold text-indigo-700 tabular-nums shadow-sm">
                  {s.pct}% {isUk ? "досягли" : "reached"}
                </span>
                <span className="absolute left-2 bottom-1 text-xs text-neutral-500 dark:text-neutral-400 tabular-nums">
                  {s.depth}%
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Rage clicks */}
        {mode === "rage" && (
          <div className="absolute inset-0 pointer-events-none">
            {RAGE.map((r, i) => (
              <div
                key={i}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${r.x}%`, top: `${r.y}%` }}
              >
                <div className="w-20 h-20 rounded-full bg-rose-500/40 animate-ping absolute inset-0" />
                <div className="relative w-14 h-14 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-lg shadow-lg -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2">
                  <span aria-hidden="true">😠</span>
                  <span className="sr-only">{r.count} rage clicks</span>
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap px-2 py-1 bg-rose-600 text-white text-xs font-semibold rounded shadow">
                  {r.count}× · {isUk ? r.labelUk : r.labelEn}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/60 text-white text-xs font-semibold flex items-center gap-1.5">
          <Flame className="w-3 h-3" />
          {mode === "click" && (isUk ? "184 кліки за останню добу" : "184 clicks in last 24h")}
          {mode === "scroll" && (isUk ? "Скрол-карта · 1,247 сесій" : "Scroll map · 1,247 sessions")}
          {mode === "rage" && (isUk ? "20 rage clicks потребують уваги" : "20 rage clicks need attention")}
        </div>
      </div>

      <p className="text-sm text-neutral-500">
        {isUk
          ? "Hotjar / Microsoft Clarity показує реальну поведінку: де клікають, як скролять, де злиться. Production: безкоштовний Clarity, $32/міс Hotjar."
          : "Hotjar / Microsoft Clarity reveal real behavior: where users click, scroll, and rage. Production: free Clarity, $32/mo Hotjar."}
      </p>
    </div>
  );
}
