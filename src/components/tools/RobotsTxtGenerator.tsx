"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface Props {
  isUk: boolean;
}

export function RobotsTxtGenerator({ isUk }: Props) {
  const [sitemapUrl, setSitemapUrl] = useState("");
  const [userAgent, setUserAgent] = useState("*");
  const [disallowed, setDisallowed] = useState(["/admin/", "/api/", "/cart/"]);
  const [disallowInput, setDisallowInput] = useState("");
  const [crawlDelay, setCrawlDelay] = useState("");
  const [blockBadBots, setBlockBadBots] = useState(true);
  const [copied, setCopied] = useState(false);

  const BAD_BOTS = ["AhrefsBot", "SemrushBot", "MJ12bot", "DotBot", "BLEXBot"];

  function generate(): string {
    let out = `User-agent: ${userAgent}\n`;
    for (const path of disallowed) {
      out += `Disallow: ${path}\n`;
    }
    if (crawlDelay) out += `Crawl-delay: ${crawlDelay}\n`;
    out += "\n";

    if (blockBadBots) {
      for (const bot of BAD_BOTS) {
        out += `User-agent: ${bot}\nDisallow: /\n\n`;
      }
    }

    if (sitemapUrl) {
      out += `Sitemap: ${sitemapUrl}\n`;
    }

    return out.trim();
  }

  function copy() {
    navigator.clipboard.writeText(generate());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function addPath() {
    const p = disallowInput.trim();
    if (!p || disallowed.includes(p)) return;
    setDisallowed([...disallowed, p.startsWith("/") ? p : `/${p}`]);
    setDisallowInput("");
  }

  function removePath(p: string) {
    setDisallowed(disallowed.filter((d) => d !== p));
  }

  const t = isUk
    ? {
        sitemapUrl: "URL Sitemap (необов'язково)",
        sitemapPh: "https://example.com/sitemap.xml",
        userAgentLabel: "User-agent",
        disallow: "Заборонені шляхи (Disallow)",
        addPh: "Наприклад: /admin/ або /tmp/",
        add: "Додати",
        crawlDelay: "Crawl-delay (секунди, необов'язково)",
        crawlPh: "1",
        blockBots: "Блокувати популярні SEO-ботів (Ahrefs, Semrush тощо)",
        result: "Вміст robots.txt",
        copy: "Скопіювати",
        copied: "Скопійовано!",
        remove: "✕",
      }
    : {
        sitemapUrl: "Sitemap URL (optional)",
        sitemapPh: "https://example.com/sitemap.xml",
        userAgentLabel: "User-agent",
        disallow: "Disallowed paths",
        addPh: "e.g. /admin/ or /tmp/",
        add: "Add",
        crawlDelay: "Crawl-delay (seconds, optional)",
        crawlPh: "1",
        blockBots: "Block popular SEO bots (Ahrefs, Semrush etc.)",
        result: "robots.txt content",
        copy: "Copy",
        copied: "Copied!",
        remove: "✕",
      };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Config panel */}
      <div className="space-y-5">
        {/* User-agent */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-1.5">{t.userAgentLabel}</label>
          <input
            type="text"
            value={userAgent}
            onChange={(e) => setUserAgent(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Disallow paths */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">{t.disallow}</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {disallowed.map((p) => (
              <span
                key={p}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-50 text-red-700 text-xs font-mono border border-red-100"
              >
                {p}
                <button onClick={() => removePath(p)} className="text-red-400 hover:text-red-600 font-bold">{t.remove}</button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={disallowInput}
              onChange={(e) => setDisallowInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addPath()}
              placeholder={t.addPh}
              className="flex-1 px-3 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              onClick={addPath}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
            >
              {t.add}
            </button>
          </div>
        </div>

        {/* Crawl delay */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-1.5">{t.crawlDelay}</label>
          <input
            type="number"
            value={crawlDelay}
            onChange={(e) => setCrawlDelay(e.target.value)}
            placeholder={t.crawlPh}
            min={0}
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Sitemap URL */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-1.5">{t.sitemapUrl}</label>
          <input
            type="url"
            value={sitemapUrl}
            onChange={(e) => setSitemapUrl(e.target.value)}
            placeholder={t.sitemapPh}
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Block bad bots */}
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={blockBadBots}
            onChange={(e) => setBlockBadBots(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="text-sm text-neutral-700">{t.blockBots}</span>
        </label>
      </div>

      {/* Output */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold text-neutral-700">{t.result}</label>
          <button
            onClick={copy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? t.copied : t.copy}
          </button>
        </div>
        <pre className="w-full min-h-64 p-4 rounded-xl bg-neutral-900 text-green-400 text-xs font-mono overflow-auto whitespace-pre leading-relaxed">
          {generate()}
        </pre>
      </div>
    </div>
  );
}
