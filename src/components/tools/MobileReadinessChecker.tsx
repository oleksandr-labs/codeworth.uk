"use client";

import { useState } from "react";
import { Check } from "lucide-react";

interface Props {
  isUk: boolean;
}

const ITEMS = [
  // Viewport
  { id: "viewport-meta", cat: "viewport", label: "Meta viewport тег встановлено (<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">)", labelEn: "Meta viewport tag is set (<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">)", ok: "ok" },
  { id: "no-fixed-width", cat: "viewport", label: "Немає фіксованих px-ширин для контейнерів (тільки %, vw, max-width)", labelEn: "No fixed px widths for containers (only %, vw, max-width)", ok: "ok" },
  { id: "responsive-images", cat: "viewport", label: "Зображення не виходять за межі екрану (max-width: 100%)", labelEn: "Images don't overflow the screen (max-width: 100%)", ok: "ok" },
  // Typography
  { id: "font-size", cat: "typography", label: "Базовий розмір шрифту ≥ 16px для основного тексту", labelEn: "Base font size ≥ 16px for body text", ok: "ok" },
  { id: "line-height", cat: "typography", label: "Міжрядковий інтервал ≥ 1.5 для комфортного читання", labelEn: "Line height ≥ 1.5 for comfortable reading", ok: "ok" },
  { id: "no-small-text", cat: "typography", label: "Немає тексту менше 12px", labelEn: "No text smaller than 12px", ok: "ok" },
  // Touch
  { id: "tap-targets", cat: "touch", label: "Всі кнопки і посилання ≥ 44×44px (touch target size)", labelEn: "All buttons and links are ≥ 44×44px (touch target size)", ok: "ok" },
  { id: "tap-spacing", cat: "touch", label: "Між елементами-кнопками відступ ≥ 8px", labelEn: "Spacing between interactive elements ≥ 8px", ok: "ok" },
  { id: "no-hover-only", cat: "touch", label: "Немає UI, доступного лише через hover (не спрацьовує на мобайлі)", labelEn: "No UI that is only accessible via hover (doesn't work on mobile)", ok: "ok" },
  // Performance
  { id: "lazy-load", cat: "performance", label: "Ліниве завантаження зображень активне", labelEn: "Lazy loading enabled for images", ok: "ok" },
  { id: "font-display", cat: "performance", label: "Google Fonts / власні шрифти використовують font-display: swap", labelEn: "Google Fonts / custom fonts use font-display: swap", ok: "ok" },
  { id: "no-blocking", cat: "performance", label: "Немає render-blocking JS/CSS у <head>", labelEn: "No render-blocking JS/CSS in <head>", ok: "ok" },
  { id: "lcp-mobile", cat: "performance", label: "LCP на мобайлі < 3 с (або < 2.5 с для відмінно)", labelEn: "LCP on mobile < 3s (or < 2.5s for excellent)", ok: "ok" },
  // Navigation
  { id: "hamburger", cat: "nav", label: "Мобільне меню реалізовано (hamburger / drawer)", labelEn: "Mobile menu implemented (hamburger / drawer)", ok: "ok" },
  { id: "nav-accessible", cat: "nav", label: "Мобільне меню закривається через Escape / кнопку X", labelEn: "Mobile menu closes via Escape key / X button", ok: "ok" },
  { id: "sticky-header", cat: "nav", label: "Sticky header не перекриває основний контент", labelEn: "Sticky header doesn't overlap main content", ok: "ok" },
  // Forms
  { id: "input-types", cat: "forms", label: "Input-поля мають правильний type (email, tel, number) — відкривається правильна клавіатура", labelEn: "Input fields have correct type (email, tel, number) — opens correct keyboard", ok: "ok" },
  { id: "form-labels", cat: "forms", label: "Всі поля форм мають явні <label> або aria-label", labelEn: "All form fields have explicit <label> or aria-label", ok: "ok" },
  { id: "autocomplete", cat: "forms", label: "Атрибут autocomplete встановлено для контактних форм", labelEn: "Autocomplete attribute set for contact forms", ok: "ok" },
  // Testing
  { id: "devtools-test", cat: "testing", label: "Перевірено в Chrome DevTools (всі breakpoints: 375 / 414 / 768 / 1024)", labelEn: "Tested in Chrome DevTools (all breakpoints: 375 / 414 / 768 / 1024)", ok: "ok" },
  { id: "real-device", cat: "testing", label: "Перевірено на реальному iPhone або Android-пристрої", labelEn: "Tested on a real iPhone or Android device", ok: "ok" },
  { id: "google-mobile-test", cat: "testing", label: "Пройшов Google Mobile-Friendly Test без помилок", labelEn: "Passed Google Mobile-Friendly Test without errors", ok: "ok" },
] as const;

const CATS = [
  { id: "viewport", label: "Viewport і адаптивність", labelEn: "Viewport & Responsiveness", icon: "📐" },
  { id: "typography", label: "Типографіка", labelEn: "Typography", icon: "🔤" },
  { id: "touch", label: "Touch-взаємодія", labelEn: "Touch Interaction", icon: "👆" },
  { id: "performance", label: "Продуктивність", labelEn: "Performance", icon: "⚡" },
  { id: "nav", label: "Навігація", labelEn: "Navigation", icon: "🗺️" },
  { id: "forms", label: "Форми", labelEn: "Forms", icon: "📋" },
  { id: "testing", label: "Тестування", labelEn: "Testing", icon: "🧪" },
];

export function MobileReadinessChecker({ isUk }: Props) {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const total = ITEMS.length;
  const done = checked.size;
  const pct = Math.round((done / total) * 100);

  function grade() {
    if (pct === 100) return { label: isUk ? "🏆 Ідеальна оптимізація!" : "🏆 Perfect optimisation!", color: "text-green-600" };
    if (pct >= 80) return { label: isUk ? "✅ Добра оптимізація" : "✅ Good optimisation", color: "text-blue-600" };
    if (pct >= 60) return { label: isUk ? "⚠️ Потребує доопрацювання" : "⚠️ Needs improvement", color: "text-amber-600" };
    return { label: isUk ? "🔴 Критичні проблеми" : "🔴 Critical issues", color: "text-red-600" };
  }

  const { label: gradeLabel, color: gradeColor } = grade();
  const barColor = pct === 100 ? "from-green-500 to-emerald-600" : pct >= 80 ? "from-blue-500 to-indigo-600" : pct >= 60 ? "from-amber-500 to-orange-600" : "from-red-500 to-rose-600";

  return (
    <div>
      {/* Score */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-3xl font-heading font-extrabold text-neutral-900">{pct}%</p>
          <p className={`text-sm font-semibold mt-0.5 ${gradeColor}`}>{gradeLabel}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-neutral-700">{done}/{total}</p>
          <p className="text-xs text-neutral-400 mt-0.5">{isUk ? "виконано" : "completed"}</p>
        </div>
      </div>

      <div className="h-3 bg-neutral-100 rounded-full overflow-hidden mb-8">
        <div
          className={`h-full bg-linear-to-r ${barColor} rounded-full transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="space-y-7">
        {CATS.map((cat) => {
          const catItems = ITEMS.filter((i) => i.cat === cat.id);
          const catDone = catItems.filter((i) => checked.has(i.id)).length;
          return (
            <div key={cat.id}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading font-bold text-neutral-900 flex items-center gap-2 text-sm">
                  <span>{cat.icon}</span>
                  {isUk ? cat.label : cat.labelEn}
                </h3>
                <span className="text-xs text-neutral-400">{catDone}/{catItems.length}</span>
              </div>
              <div className="space-y-2">
                {catItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggle(item.id)}
                    className={`flex items-start gap-3 w-full p-3.5 rounded-xl border text-left transition-all ${
                      checked.has(item.id)
                        ? "border-green-200 bg-green-50"
                        : "border-neutral-200 bg-white hover:border-neutral-300"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${checked.has(item.id) ? "bg-green-500 border-green-500" : "border-neutral-300 bg-white"}`}>
                      {checked.has(item.id) && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className={`text-sm flex-1 leading-relaxed ${checked.has(item.id) ? "line-through text-neutral-400" : "text-neutral-700"}`}>
                      {isUk ? item.label : item.labelEn}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-6 border-t border-neutral-100 flex justify-between items-center">
        <p className="text-xs text-neutral-400">{isUk ? "Прогрес зберігається під час сесії" : "Progress is saved during this session"}</p>
        <button
          onClick={() => setChecked(new Set())}
          className="text-xs text-neutral-500 hover:text-neutral-700 underline underline-offset-2 transition-colors"
        >
          {isUk ? "Скинути" : "Reset"}
        </button>
      </div>
    </div>
  );
}
