"use client";

import { useState } from "react";
import { Globe, Check } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

const LOCALES = [
  { code: "uk", flag: "🇺🇦", name: "Українська", short: "UK" },
  { code: "en", flag: "🇬🇧", name: "English", short: "EN" },
  { code: "pl", flag: "🇵🇱", name: "Polski", short: "PL" },
  { code: "de", flag: "🇩🇪", name: "Deutsch", short: "DE" },
];

const SAMPLE_TEXT: Record<string, { hero: string; cta: string }> = {
  uk: { hero: "Створюємо швидкі бізнес-сайти", cta: "Замовити консультацію" },
  en: { hero: "We build fast business websites", cta: "Book consultation" },
  pl: { hero: "Tworzymy szybkie strony biznesowe", cta: "Zamów konsultację" },
  de: { hero: "Wir bauen schnelle Geschäftswebseiten", cta: "Beratung buchen" },
};

export function I18nSwitcherDemo({ isUk }: Props) {
  const [variant, setVariant] = useState<"dropdown" | "inline">("dropdown");
  const [current, setCurrent] = useState("uk");
  const [open, setOpen] = useState(false);

  const currentLocale = LOCALES.find((l) => l.code === current) ?? LOCALES[0];
  const sample = SAMPLE_TEXT[current];

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {(["dropdown", "inline"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setVariant(v)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
              v === variant
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-indigo-50"
            }`}
          >
            {v === "dropdown" ? (isUk ? "Випадаючий список" : "Dropdown") : (isUk ? "Інлайн кнопки" : "Inline buttons")}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white">
        {/* Header bar with switcher */}
        <div className="px-6 py-4 border-b border-neutral-100 dark:border-neutral-700 flex items-center justify-between">
          <div className="text-sm font-semibold text-neutral-700">Codeworth</div>
          {variant === "dropdown" ? (
            <div className="relative">
              <button
                onClick={() => setOpen((o) => !o)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-indigo-300 text-sm font-medium text-neutral-700 dark:text-neutral-300 transition-colors"
                aria-haspopup="listbox"
                aria-expanded={open}
              >
                <Globe className="w-4 h-4 text-neutral-400" />
                <span>{currentLocale.flag}</span>
                <span>{currentLocale.short}</span>
              </button>
              {open && (
                <ul
                  role="listbox"
                  className="absolute right-0 mt-2 w-44 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-lg z-10 overflow-hidden"
                >
                  {LOCALES.map((l) => (
                    <li key={l.code}>
                      <button
                        onClick={() => { setCurrent(l.code); setOpen(false); }}
                        role="option"
                        aria-selected={l.code === current}
                        className="w-full px-3 py-2 flex items-center justify-between text-sm text-neutral-700 dark:text-neutral-300 hover:bg-indigo-50 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <span>{l.flag}</span>
                          <span>{l.name}</span>
                        </span>
                        {l.code === current && <Check className="w-4 h-4 text-indigo-600" />}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <div className="flex gap-1">
              {LOCALES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setCurrent(l.code)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                    l.code === current
                      ? "bg-indigo-600 text-white"
                      : "text-neutral-500 dark:text-neutral-400 hover:bg-indigo-50 hover:text-indigo-700"
                  }`}
                  aria-pressed={l.code === current}
                >
                  {l.short}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sample localized content */}
        <div className="px-6 py-10 text-center">
          <p className="text-xs text-neutral-400 mb-3 uppercase tracking-wider">
            {isUk ? "Приклад контенту:" : "Sample content:"} {currentLocale.name}
          </p>
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">{sample.hero}</h3>
          <button className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors">
            {sample.cta}
          </button>
        </div>
      </div>

      <p className="text-sm text-neutral-500">
        {isUk
          ? "Вибір мови зберігається в cookie. Підтримка SEO через hreflang та канонічних URL."
          : "Locale choice persisted in cookie. SEO-friendly via hreflang and canonical URLs."}
      </p>
    </div>
  );
}
