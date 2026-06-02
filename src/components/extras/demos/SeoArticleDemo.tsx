"use client";

import { useState } from "react";
import { FileText, Eye, Code2, Search, CheckCircle2 } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

const ARTICLE = {
  en: {
    metaTitle: "Next.js vs WordPress 2026: Speed, SEO, Cost Comparison — Honest Verdict",
    metaDescription: "Comparing Next.js and WordPress in 2026: Core Web Vitals, SEO capabilities, hosting costs, and total cost of ownership for business sites. Real benchmarks included.",
    h1: "Next.js vs WordPress in 2026: Which Wins for Business Sites?",
    intro: "If you're planning a new business website in 2026, you're likely choosing between two paths: a modern JavaScript framework like Next.js or the classic WordPress CMS. We've shipped both — here's the honest comparison based on 50+ real projects.",
    headings: [
      "H2: Performance benchmark (Lighthouse scores)",
      "H2: SEO capabilities compared",
      "H3: Schema.org and structured data",
      "H3: Sitemap and meta management",
      "H2: Total cost of ownership (3 years)",
      "H2: When to choose each",
    ],
    keywords: ["next.js vs wordpress", "wordpress alternatives 2026", "next.js for business", "headless cms"],
    wordCount: 2847,
    readTime: 11,
  },
  uk: {
    metaTitle: "Next.js vs WordPress 2026: швидкість, SEO, вартість — чесний вердикт",
    metaDescription: "Порівняння Next.js та WordPress у 2026: Core Web Vitals, SEO можливості, хостинг та total cost of ownership для бізнес-сайтів. З реальними бенчмарками.",
    h1: "Next.js vs WordPress 2026: що обрати для бізнес-сайту?",
    intro: "Якщо ви плануєте новий бізнес-сайт у 2026, ви, ймовірно, обираєте між Next.js та класичним WordPress. Ми робимо обидва — ось чесне порівняння на основі 50+ реальних проєктів.",
    headings: [
      "H2: Бенчмарк продуктивності (Lighthouse)",
      "H2: SEO можливості — порівняння",
      "H3: Schema.org та структуровані дані",
      "H3: Sitemap та управління метатегами",
      "H2: Total cost of ownership (3 роки)",
      "H2: Коли обирати що",
    ],
    keywords: ["next.js vs wordpress", "альтернативи wordpress 2026", "next.js для бізнесу", "headless cms"],
    wordCount: 2847,
    readTime: 11,
  },
};

const SEO_CHECKS = [
  { key: "title", labelEn: "Meta title (50-60 chars)", labelUk: "Meta title (50-60 симв)", pass: true },
  { key: "desc", labelEn: "Meta description (150-160 chars)", labelUk: "Meta description (150-160 симв)", pass: true },
  { key: "h1", labelEn: "Single H1 with primary keyword", labelUk: "Один H1 з основним keyword", pass: true },
  { key: "structure", labelEn: "Logical H2/H3 hierarchy", labelUk: "Логічна ієрархія H2/H3", pass: true },
  { key: "kw", labelEn: "Keyword density 1.5-2.5%", labelUk: "Щільність ключових слів 1.5-2.5%", pass: true },
  { key: "len", labelEn: "Word count 2000+ for ranking", labelUk: "Об'єм 2000+ слів для ранжування", pass: true },
];

export function SeoArticleDemo({ isUk }: Props) {
  const [view, setView] = useState<"preview" | "html" | "seo">("preview");
  const article = isUk ? ARTICLE.uk : ARTICLE.en;

  return (
    <div className="space-y-6">
      <div className="flex gap-1 rounded-lg bg-neutral-100 p-1 w-fit">
        {([
          { id: "preview", labelEn: "Preview", labelUk: "Прев'ю", icon: Eye },
          { id: "html", labelEn: "HTML / Schema", labelUk: "HTML / Schema", icon: Code2 },
          { id: "seo", labelEn: "SEO Audit", labelUk: "SEO аудит", icon: Search },
        ] as const).map((v) => {
          const Icon = v.icon;
          return (
            <button
              key={v.id}
              onClick={() => setView(v.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                view === v.id ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {isUk ? v.labelUk : v.labelEn}
            </button>
          );
        })}
      </div>

      {view === "preview" && (
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 space-y-4">
          <div className="text-xs text-neutral-400 uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5 inline mr-1" />
            {article.wordCount.toLocaleString()} {isUk ? "слів · " : "words · "}
            {article.readTime} {isUk ? "хв читання" : "min read"}
          </div>
          <h1 className="text-2xl font-bold text-neutral-900">{article.h1}</h1>
          <p className="text-neutral-600 leading-relaxed">{article.intro}</p>
          <div className="border-t border-neutral-100 pt-4">
            <p className="text-xs text-neutral-400 uppercase tracking-wider mb-2">{isUk ? "Структура статті:" : "Article structure:"}</p>
            <ul className="space-y-1 text-sm text-neutral-600">
              {article.headings.map((h, i) => (
                <li key={i} className={h.startsWith("H3") ? "ml-4 text-neutral-500" : "font-medium"}>
                  · {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {view === "html" && (
        <div className="rounded-2xl border border-neutral-200 bg-neutral-900 p-5 overflow-x-auto">
          <pre className="text-xs text-emerald-300 font-mono leading-relaxed">
            <span className="text-neutral-500">{`<!-- Meta tags -->`}</span>{`\n`}
            <span className="text-violet-400">{`<title>`}</span>{`${article.metaTitle}`}<span className="text-violet-400">{`</title>`}</span>{`\n`}
            <span className="text-violet-400">{`<meta name="description" content="`}</span>{`${article.metaDescription}`}<span className="text-violet-400">{`" />`}</span>{`\n\n`}
            <span className="text-neutral-500">{`<!-- Schema.org Article -->`}</span>{`\n`}
            <span className="text-violet-400">{`<script type="application/ld+json">`}</span>{`\n`}
            {`{`}{`\n`}
            {`  "@context": "https://schema.org",`}{`\n`}
            {`  "@type": "Article",`}{`\n`}
            {`  "headline": "${article.h1}",`}{`\n`}
            {`  "wordCount": ${article.wordCount},`}{`\n`}
            {`  "author": { "@type": "Person", "name": "Oleksiy Kovalenko" },`}{`\n`}
            {`  "datePublished": "2026-05-04",`}{`\n`}
            {`  "publisher": { "@type": "Organization", "name": "Codeworth" }`}{`\n`}
            {`}`}{`\n`}
            <span className="text-violet-400">{`</script>`}</span>
          </pre>
        </div>
      )}

      {view === "seo" && (
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 space-y-4">
          <div className="space-y-2">
            {SEO_CHECKS.map((c) => (
              <div key={c.key} className="flex items-center gap-3 py-2 border-b border-neutral-100 last:border-0">
                <CheckCircle2 className={`w-5 h-5 shrink-0 ${c.pass ? "text-emerald-500" : "text-neutral-300"}`} />
                <span className="text-sm text-neutral-700 flex-1">{isUk ? c.labelUk : c.labelEn}</span>
                <span className={`text-xs font-semibold uppercase ${c.pass ? "text-emerald-600" : "text-neutral-400"}`}>
                  {c.pass ? (isUk ? "Пройдено" : "Pass") : (isUk ? "Помилка" : "Fail")}
                </span>
              </div>
            ))}
          </div>
          <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-sm">
            <span className="text-neutral-500">{isUk ? "SEO оцінка:" : "SEO score:"}</span>
            <span className="text-2xl font-bold text-emerald-600 tabular-nums">98/100</span>
          </div>
          <div>
            <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2">{isUk ? "Ключові слова:" : "Target keywords:"}</p>
            <div className="flex flex-wrap gap-1.5">
              {article.keywords.map((k, i) => (
                <span key={i} className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-xs font-medium">
                  {k}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      <p className="text-sm text-neutral-500">
        {isUk
          ? "Кожна SEO-стаття включає: meta tags, Schema.org Article, semantic structure, keyword research, internal links."
          : "Each SEO article includes: meta tags, Schema.org Article, semantic structure, keyword research, internal links."}
      </p>
    </div>
  );
}
