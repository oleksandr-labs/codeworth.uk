"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle, Loader2, Zap } from "lucide-react";
import Link from "next/link";

interface SpeedResult {
  score: number;
  lcp: string | null;
  cls: string | null;
  fcp: string | null;
  ttfb: string | null;
  opportunities: { title: string; description: string }[];
}

type Level = "good" | "needs-improvement" | "poor";

function scoreLevel(score: number): Level {
  if (score >= 90) return "good";
  if (score >= 50) return "needs-improvement";
  return "poor";
}

function metricLevel(value: string | null, metric: "lcp" | "cls" | "fcp" | "ttfb"): Level {
  if (!value) return "needs-improvement";
  const num = parseFloat(value.replace(",", "."));
  if (isNaN(num)) return "needs-improvement";
  const sec = value.toLowerCase().includes("ms") ? num / 1000 : num;
  if (metric === "lcp") return sec < 2.5 ? "good" : sec < 4 ? "needs-improvement" : "poor";
  if (metric === "cls") return num < 0.1 ? "good" : num < 0.25 ? "needs-improvement" : "poor";
  if (metric === "fcp") return sec < 1.8 ? "good" : sec < 3 ? "needs-improvement" : "poor";
  if (metric === "ttfb") return sec < 0.8 ? "good" : sec < 1.8 ? "needs-improvement" : "poor";
  return "needs-improvement";
}

const COLOR: Record<Level, string> = {
  good: "text-green-700 bg-green-50 border-green-200",
  "needs-improvement": "text-yellow-700 bg-yellow-50 border-yellow-200",
  poor: "text-red-700 bg-red-50 border-red-200",
};

const LABEL: Record<Level, { uk: string; en: string }> = {
  good: { uk: "Добре", en: "Good" },
  "needs-improvement": { uk: "Є проблеми", en: "Needs Improvement" },
  poor: { uk: "Погано", en: "Poor" },
};

export function SpeedTestTool({ lang }: { lang: string }) {
  const isUk = lang === "uk";
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SpeedResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const resp = await fetch("/api/speed-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      if (!resp.ok) {
        const d = await resp.json().catch(() => ({})) as { error?: string };
        throw new Error(d.error ?? (isUk ? "Помилка запиту" : "Request error"));
      }
      setResult(await resp.json() as SpeedResult);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : isUk
          ? "Невідома помилка"
          : "Unknown error"
      );
    } finally {
      setLoading(false);
    }
  };

  const sl = result ? scoreLevel(result.score) : null;

  return (
    <div>
      {/* URL input */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://your-website.com"
          required
          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {isUk ? "Аналізую…" : "Analyzing…"}
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              {isUk ? "Перевірити" : "Check"}
            </>
          )}
        </button>
      </form>

      {/* Note */}
      <p className="text-xs text-gray-500 mb-6">
        {isUk
          ? "Аналіз виконується через Google PageSpeed Insights API (мобільна версія). Займає до 30 секунд."
          : "Analysis is performed via Google PageSpeed Insights API (mobile). Takes up to 30 seconds."}
      </p>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl mb-6">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="space-y-4">
          <div className="h-24 bg-gray-100 rounded-xl animate-pulse" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {result && sl && (
        <div className="space-y-6">
          {/* Overall score */}
          <div className={`flex items-center gap-5 p-5 rounded-2xl border ${COLOR[sl]}`}>
            <div className="text-5xl font-black">{result.score}</div>
            <div>
              <div className="text-lg font-semibold">
                {isUk ? LABEL[sl].uk : LABEL[sl].en}
              </div>
              <div className="text-sm opacity-80">
                {isUk
                  ? "Performance Score (мобільний, Google Lighthouse)"
                  : "Performance Score (mobile, Google Lighthouse)"}
              </div>
            </div>
          </div>

          {/* Metrics grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {(
              [
                { label: "LCP", value: result.lcp, metric: "lcp" as const, desc: isUk ? "Найбільший контент" : "Largest Contentful Paint" },
                { label: "CLS", value: result.cls, metric: "cls" as const, desc: isUk ? "Зсув макету" : "Cumulative Layout Shift" },
                { label: "FCP", value: result.fcp, metric: "fcp" as const, desc: isUk ? "Перший контент" : "First Contentful Paint" },
                { label: "TTFB", value: result.ttfb, metric: "ttfb" as const, desc: isUk ? "Відповідь сервера" : "Time to First Byte" },
              ] as const
            ).map(({ label, value, metric, desc }) => {
              const lvl = metricLevel(value, metric);
              return (
                <div key={label} className={`p-4 rounded-xl border ${COLOR[lvl]}`}>
                  <div className="text-xs font-medium opacity-60 mb-1">{label}</div>
                  <div className="text-xl font-bold">{value ?? "—"}</div>
                  <div className="text-xs opacity-70 mt-0.5">{desc}</div>
                </div>
              );
            })}
          </div>

          {/* Opportunities */}
          {result.opportunities.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                {isUk ? "Основні рекомендації" : "Top Opportunities"}
              </h3>
              <ul className="space-y-2">
                {result.opportunities.map((op, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-xl"
                  >
                    <AlertCircle className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{op.title}</div>
                      <div className="text-xs text-gray-600 mt-0.5">{op.description}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA */}
          <div className="p-5 bg-indigo-50 border border-indigo-200 rounded-xl flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-indigo-800 mb-1">
                {isUk ? "Потрібна оптимізація швидкості?" : "Need speed optimization?"}
              </p>
              <p className="text-sm text-indigo-700 mb-3">
                {isUk
                  ? "Codeworth покращує Core Web Vitals та PageSpeed Score для Next.js, WordPress та інших платформ."
                  : "Codeworth improves Core Web Vitals and PageSpeed Score for Next.js, WordPress, and other platforms."}
              </p>
              <Link
                href={`/${lang}/services/seo`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-700 hover:text-indigo-900 transition-colors"
              >
                {isUk ? "Замовити SEO-оптимізацію →" : "Order SEO Optimization →"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
