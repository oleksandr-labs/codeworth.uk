"use client";

import { useState } from "react";
import { Accessibility, Type, Contrast, Underline, Pause, RotateCcw } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

interface A11yState {
  fontSize: 100 | 125 | 150 | 175;
  contrast: "normal" | "high" | "dark";
  underlineLinks: boolean;
  pauseAnimations: boolean;
}

const DEFAULTS: A11yState = {
  fontSize: 100,
  contrast: "normal",
  underlineLinks: false,
  pauseAnimations: false,
};

export function A11yToolbarDemo({ isUk }: Props) {
  const [open, setOpen] = useState(true);
  const [state, setState] = useState<A11yState>(DEFAULTS);

  const containerStyle: React.CSSProperties = {
    fontSize: `${state.fontSize}%`,
  };

  const contrastClass =
    state.contrast === "high"
      ? "bg-black text-yellow-300"
      : state.contrast === "dark"
      ? "bg-neutral-900 text-neutral-50"
      : "bg-white text-neutral-800";

  const linkClass = state.underlineLinks ? "underline" : "no-underline";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
          aria-expanded={open}
          aria-controls="a11y-toolbar"
        >
          <Accessibility className="w-4 h-4" />
          {open ? (isUk ? "Сховати панель" : "Hide toolbar") : (isUk ? "Показати панель" : "Show toolbar")}
        </button>
        <button
          onClick={() => setState(DEFAULTS)}
          className="flex items-center gap-1.5 px-3 py-2 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:text-white transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          {isUk ? "Скинути" : "Reset"}
        </button>
      </div>

      {open && (
        <div
          id="a11y-toolbar"
          role="region"
          aria-label={isUk ? "Панель доступності" : "Accessibility toolbar"}
          className="rounded-2xl border border-indigo-200 bg-indigo-50/50 p-5 space-y-4"
        >
          {/* Font size */}
          <div>
            <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-neutral-700">
              <Type className="w-4 h-4 text-indigo-600" />
              {isUk ? "Розмір шрифту" : "Font size"}
            </div>
            <div className="flex flex-wrap gap-2">
              {([100, 125, 150, 175] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setState((p) => ({ ...p, fontSize: s }))}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                    state.fontSize === s
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-neutral-600 dark:text-neutral-300 hover:bg-indigo-100"
                  }`}
                  aria-pressed={state.fontSize === s}
                >
                  {s}%
                </button>
              ))}
            </div>
          </div>

          {/* Contrast */}
          <div>
            <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-neutral-700">
              <Contrast className="w-4 h-4 text-indigo-600" />
              {isUk ? "Контраст" : "Contrast"}
            </div>
            <div className="flex flex-wrap gap-2">
              {(["normal", "high", "dark"] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setState((p) => ({ ...p, contrast: c }))}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-colors ${
                    state.contrast === c
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-neutral-600 dark:text-neutral-300 hover:bg-indigo-100"
                  }`}
                  aria-pressed={state.contrast === c}
                >
                  {c === "normal" ? (isUk ? "Звичайний" : "Normal") : c === "high" ? (isUk ? "Високий" : "High") : (isUk ? "Темний" : "Dark")}
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white text-sm text-neutral-700 dark:text-neutral-300 cursor-pointer">
              <input
                type="checkbox"
                checked={state.underlineLinks}
                onChange={(e) => setState((p) => ({ ...p, underlineLinks: e.target.checked }))}
                className="rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500"
              />
              <Underline className="w-4 h-4 text-indigo-500" />
              {isUk ? "Підкреслювати посилання" : "Underline links"}
            </label>
            <label className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white text-sm text-neutral-700 dark:text-neutral-300 cursor-pointer">
              <input
                type="checkbox"
                checked={state.pauseAnimations}
                onChange={(e) => setState((p) => ({ ...p, pauseAnimations: e.target.checked }))}
                className="rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500"
              />
              <Pause className="w-4 h-4 text-indigo-500" />
              {isUk ? "Зупинити анімації" : "Pause animations"}
            </label>
          </div>
        </div>
      )}

      {/* Live sample */}
      <div
        className={`rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6 transition-colors ${contrastClass} ${state.pauseAnimations ? "[&_*]:!animate-none [&_*]:!transition-none" : ""}`}
        style={containerStyle}
      >
        <h3 className="font-bold text-lg mb-3">
          {isUk ? "Приклад контенту" : "Sample content"}
        </h3>
        <p className="leading-relaxed mb-3">
          {isUk
            ? "Спробуйте змінити налаштування — текст і кольори оновляться в реальному часі."
            : "Try changing the settings — text and colors update in real time."}
        </p>
        <p className="leading-relaxed">
          {isUk ? "Це " : "Here is a "}
          <a href="#" className={`text-indigo-500 ${linkClass}`}>
            {isUk ? "тестове посилання" : "test link"}
          </a>
          {isUk ? " для перевірки підкреслення." : " to verify underline mode."}
        </p>
      </div>
    </div>
  );
}
