"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface Props {
  isUk: boolean;
}

export function MetaTagGenerator({ isUk }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const titleLen = title.length;
  const descLen = description.length;

  const generated = `<title>${title}</title>
<meta name="description" content="${description}" />
<meta name="keywords" content="${keywords}" />
<link rel="canonical" href="${url}" />

<!-- Open Graph -->
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:url" content="${url}" />
<meta property="og:type" content="website" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />`;

  function copy() {
    navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const t = isUk
    ? {
        title: "Заголовок сторінки (title)",
        titlePh: "Наприклад: Розробка сайтів в Києві | Codeworth",
        desc: "Мета-опис (description)",
        descPh: "Короткий опис сторінки для пошукових систем...",
        keys: "Ключові слова (через кому)",
        keysPh: "розробка сайтів, веб-студія, Next.js",
        urlLabel: "URL сторінки",
        urlPh: "https://example.com/page",
        result: "Готовий HTML-код",
        copy: "Скопіювати",
        copied: "Скопійовано!",
        chars: "символів",
        titleTip: "Оптимально: 50–60 символів",
        descTip: "Оптимально: 120–160 символів",
        good: "✅ Добре",
        long: "⚠️ Задовгий",
        short: "ℹ️ Можна довше",
      }
    : {
        title: "Page title",
        titlePh: "e.g. Web Development in London | Codeworth",
        desc: "Meta description",
        descPh: "Short description of the page for search engines...",
        keys: "Keywords (comma-separated)",
        keysPh: "web development, web agency, Next.js",
        urlLabel: "Page URL",
        urlPh: "https://example.com/page",
        result: "Generated HTML code",
        copy: "Copy",
        copied: "Copied!",
        chars: "chars",
        titleTip: "Optimal: 50–60 characters",
        descTip: "Optimal: 120–160 characters",
        good: "✅ Good",
        long: "⚠️ Too long",
        short: "ℹ️ Can be longer",
      };

  function titleStatus() {
    if (!title) return null;
    if (titleLen >= 50 && titleLen <= 60) return { label: t.good, color: "text-green-600" };
    if (titleLen > 60) return { label: t.long, color: "text-amber-600" };
    return { label: t.short, color: "text-blue-600" };
  }

  function descStatus() {
    if (!description) return null;
    if (descLen >= 120 && descLen <= 160) return { label: t.good, color: "text-green-600" };
    if (descLen > 160) return { label: t.long, color: "text-amber-600" };
    return { label: t.short, color: "text-blue-600" };
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Input panel */}
      <div className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">{t.title}</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t.titlePh}
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <div className="mt-1.5 flex items-center justify-between text-xs text-neutral-400">
            <span>{t.titleTip}</span>
            <span className="flex items-center gap-2">
              <span>{titleLen} {t.chars}</span>
              {titleStatus() && <span className={titleStatus()!.color}>{titleStatus()!.label}</span>}
            </span>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">{t.desc}</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t.descPh}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
          />
          <div className="mt-1.5 flex items-center justify-between text-xs text-neutral-400">
            <span>{t.descTip}</span>
            <span className="flex items-center gap-2">
              <span>{descLen} {t.chars}</span>
              {descStatus() && <span className={descStatus()!.color}>{descStatus()!.label}</span>}
            </span>
          </div>
        </div>

        {/* Keywords */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">{t.keys}</label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder={t.keysPh}
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* URL */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">{t.urlLabel}</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={t.urlPh}
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
      </div>

      {/* Output panel */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold text-neutral-700">{t.result}</label>
          <button
            onClick={copy}
            disabled={!title && !description}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? t.copied : t.copy}
          </button>
        </div>
        <pre className="w-full h-72 p-4 rounded-xl bg-neutral-900 text-green-400 text-xs font-mono overflow-auto whitespace-pre-wrap break-all leading-relaxed">
          {generated}
        </pre>
      </div>
    </div>
  );
}
