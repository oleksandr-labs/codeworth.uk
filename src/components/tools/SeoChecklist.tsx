"use client";

import { useState } from "react";
import { Check } from "lucide-react";

interface Props {
  isUk: boolean;
}

interface CheckItem {
  id: string;
  category: string;
  label: string;
  labelEn: string;
  priority: "critical" | "important" | "nice";
}

const ITEMS: CheckItem[] = [
  // On-page SEO
  { id: "title", category: "on-page", label: "Title тег унікальний, 50–60 символів", labelEn: "Title tag is unique, 50–60 characters", priority: "critical" },
  { id: "description", category: "on-page", label: "Meta description, 120–160 символів, є заклик до дії", labelEn: "Meta description 120–160 chars with a call-to-action", priority: "critical" },
  { id: "h1", category: "on-page", label: "Один H1 на сторінці із ключовим словом", labelEn: "Single H1 on the page containing the keyword", priority: "critical" },
  { id: "headings", category: "on-page", label: "Ієрархія заголовків H2–H6 логічна", labelEn: "H2–H6 heading hierarchy is logical", priority: "important" },
  { id: "keywords", category: "on-page", label: "Ключові слова в тексті природньо, без спаму", labelEn: "Keywords appear naturally in content, no stuffing", priority: "important" },
  { id: "url", category: "on-page", label: "URL короткий, читабельний, з ключовим словом", labelEn: "URL is short, readable and contains the keyword", priority: "critical" },
  { id: "canonical", category: "on-page", label: "Canonical URL встановлено коректно", labelEn: "Canonical URL is set correctly", priority: "important" },
  { id: "og", category: "on-page", label: "Open Graph теги (og:title, og:description, og:image)", labelEn: "Open Graph tags (og:title, og:description, og:image)", priority: "important" },
  // Images
  { id: "alt", category: "images", label: "Всі зображення мають alt-текст", labelEn: "All images have alt text", priority: "critical" },
  { id: "img-size", category: "images", label: "Зображення оптимізовані (WebP / AVIF), до 200 КБ", labelEn: "Images optimised (WebP / AVIF), under 200 KB", priority: "important" },
  { id: "img-lazy", category: "images", label: "Lazy loading для зображень нижче fold", labelEn: "Lazy loading for below-the-fold images", priority: "important" },
  // Technical
  { id: "ssl", category: "tech", label: "HTTPS активний, HTTP → HTTPS redirect", labelEn: "HTTPS active, HTTP → HTTPS redirect in place", priority: "critical" },
  { id: "mobile", category: "tech", label: "Сайт адаптивний (Mobile-first)", labelEn: "Site is responsive (mobile-first)", priority: "critical" },
  { id: "speed", category: "tech", label: "LCP < 2.5 с, FID < 100 мс, CLS < 0.1", labelEn: "LCP < 2.5s, FID < 100ms, CLS < 0.1", priority: "critical" },
  { id: "robots", category: "tech", label: "robots.txt присутній та коректний", labelEn: "robots.txt present and correct", priority: "important" },
  { id: "sitemap", category: "tech", label: "XML-sitemap є, подано в Google Search Console", labelEn: "XML sitemap exists and submitted to Google Search Console", priority: "critical" },
  { id: "noindex", category: "tech", label: "Технічні сторінки мають noindex (cart, thank-you)", labelEn: "Technical pages have noindex (cart, thank-you)", priority: "important" },
  { id: "404", category: "tech", label: "Власна 404-сторінка з посиланнями", labelEn: "Custom 404 page with navigation links", priority: "nice" },
  // Schema
  { id: "schema-org", category: "schema", label: "Schema.org розмітка (Organization / LocalBusiness)", labelEn: "Schema.org markup (Organization / LocalBusiness)", priority: "important" },
  { id: "schema-breadcrumb", category: "schema", label: "BreadcrumbList Schema.org на всіх сторінках", labelEn: "BreadcrumbList Schema.org on all pages", priority: "important" },
  { id: "schema-faq", category: "schema", label: "FAQPage Schema.org для FAQ-сторінок", labelEn: "FAQPage Schema.org for FAQ sections", priority: "nice" },
  // Content
  { id: "text-volume", category: "content", label: "Кожна сторінка має ≥ 300 слів тексту", labelEn: "Each page has at least 300 words of content", priority: "important" },
  { id: "internal-links", category: "content", label: "Внутрішні посилання між пов'язаними сторінками", labelEn: "Internal links between related pages", priority: "important" },
  { id: "anchor", category: "content", label: "Анкор-тексти посилань описові, не 'тут'/'тут'", labelEn: "Link anchor texts are descriptive, not 'click here'", priority: "important" },
  { id: "duplicate", category: "content", label: "Немає дублікатів контенту на різних URL", labelEn: "No duplicate content across different URLs", priority: "critical" },
  // GSC
  { id: "gsc", category: "analytics", label: "Google Search Console підключено і верифіковано", labelEn: "Google Search Console connected and verified", priority: "critical" },
  { id: "ga4", category: "analytics", label: "Google Analytics 4 встановлено", labelEn: "Google Analytics 4 installed", priority: "important" },
  { id: "gsc-errors", category: "analytics", label: "У GSC немає критичних помилок Coverage", labelEn: "No critical Coverage errors in GSC", priority: "critical" },
  { id: "page-speed-gsc", category: "analytics", label: "Core Web Vitals у GSC без помилок", labelEn: "Core Web Vitals in GSC show no errors", priority: "important" },
  { id: "rich-results", category: "analytics", label: "Rich Results Test пройдено без помилок", labelEn: "Rich Results Test passes without errors", priority: "nice" },
];

const CATEGORIES = [
  { id: "on-page", label: "On-Page SEO", labelEn: "On-Page SEO", icon: "📝" },
  { id: "images", label: "Зображення", labelEn: "Images", icon: "🖼️" },
  { id: "tech", label: "Технічне SEO", labelEn: "Technical SEO", icon: "⚙️" },
  { id: "schema", label: "Структурні дані", labelEn: "Structured Data", icon: "📋" },
  { id: "content", label: "Контент", labelEn: "Content", icon: "✍️" },
  { id: "analytics", label: "Аналітика", labelEn: "Analytics & GSC", icon: "📊" },
];

const PRIORITY_COLORS = {
  critical: "bg-red-100 text-red-700 border-red-200",
  important: "bg-amber-100 text-amber-700 border-amber-200",
  nice: "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 border-neutral-200",
};

export function SeoChecklist({ isUk }: Props) {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function resetAll() {
    setChecked(new Set());
  }

  const total = ITEMS.length;
  const done = checked.size;
  const pct = Math.round((done / total) * 100);

  const criticalTotal = ITEMS.filter((i) => i.priority === "critical").length;
  const criticalDone = ITEMS.filter((i) => i.priority === "critical" && checked.has(i.id)).length;

  function statusLabel() {
    if (pct === 100) return isUk ? "🎉 Відмінно! Все виконано" : "🎉 Perfect! All done";
    if (pct >= 80) return isUk ? "✅ Добре — є простір для покращення" : "✅ Good — room for improvement";
    if (pct >= 50) return isUk ? "⚠️ Задовільно — виправте критичні пункти" : "⚠️ Fair — fix critical items first";
    return isUk ? "🔴 Низький рівень — потрібна увага" : "🔴 Low score — attention needed";
  }

  const barColor = pct === 100 ? "from-green-500 to-emerald-600" : pct >= 80 ? "from-blue-500 to-indigo-600" : pct >= 50 ? "from-amber-500 to-orange-600" : "from-red-500 to-rose-600";

  return (
    <div>
      {/* Score header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-3xl font-sans font-extrabold tabular-nums tracking-tight text-neutral-900">{pct}%</p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">{statusLabel()}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-neutral-700">
            {done}/{total} {isUk ? "виконано" : "completed"}
          </p>
          <p className="text-xs text-red-600 mt-0.5">
            {criticalDone}/{criticalTotal} {isUk ? "критичних" : "critical"}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-3 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden mb-8">
        <div
          className={`h-full bg-linear-to-r ${barColor} rounded-full transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Checklist by category */}
      <div className="space-y-8">
        {CATEGORIES.map((cat) => {
          const catItems = ITEMS.filter((i) => i.category === cat.id);
          const catDone = catItems.filter((i) => checked.has(i.id)).length;
          return (
            <div key={cat.id}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  <span>{cat.icon}</span>
                  {isUk ? cat.label : cat.labelEn}
                </h3>
                <span className="text-xs text-neutral-500">{catDone}/{catItems.length}</span>
              </div>
              <div className="space-y-2">
                {catItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggle(item.id)}
                    className={`flex items-start gap-3 w-full p-3.5 rounded-xl border text-left transition-all ${
                      checked.has(item.id)
                        ? "border-green-200 bg-green-50"
                        : "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-neutral-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        checked.has(item.id)
                          ? "bg-green-500 border-green-500"
                          : "border-neutral-300 bg-white"
                      }`}
                    >
                      {checked.has(item.id) && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className={`text-sm flex-1 leading-relaxed ${checked.has(item.id) ? "line-through text-neutral-400" : "text-neutral-700"}`}>
                      {isUk ? item.label : item.labelEn}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md text-xs font-semibold border shrink-0 ${PRIORITY_COLORS[item.priority]}`}>
                      {item.priority === "critical" ? (isUk ? "Крит." : "Crit.") : item.priority === "important" ? (isUk ? "Важл." : "Imp.") : (isUk ? "Бажано" : "Nice")}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap gap-3 items-center justify-between pt-6 border-t border-neutral-100">
        <div className="flex gap-3 text-xs">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border bg-red-50 text-red-700 border-red-200 font-semibold">{isUk ? "Критичний" : "Critical"}</span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border bg-amber-50 text-amber-700 border-amber-200 font-semibold">{isUk ? "Важливий" : "Important"}</span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border bg-neutral-50 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700 font-semibold">{isUk ? "Бажаний" : "Nice-to-have"}</span>
        </div>
        <button
          onClick={resetAll}
          className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:text-neutral-300 underline underline-offset-2 transition-colors"
        >
          {isUk ? "Скинути все" : "Reset all"}
        </button>
      </div>
    </div>
  );
}
