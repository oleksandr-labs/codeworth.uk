"use client";

import { useState } from "react";
import { Search, Loader2, AlertCircle, Gauge, Zap, Layout, Clock, Server } from "lucide-react";

interface Props {
  isUk: boolean;
}

interface PSIResult {
  score: number;
  lcp: string | null;
  cls: string | null;
  fcp: string | null;
  ttfb: string | null;
  opportunities: { title: string; description: string }[];
}

function ScoreRing({ score }: { score: number }) {
  const color =
    score >= 90 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444";
  const label =
    score >= 90 ? "Good" : score >= 50 ? "Needs Improvement" : "Poor";
  const r = 36;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r={r} fill="none" stroke="#e5e7eb" strokeWidth="8" />
          <circle
            cx="48"
            cy="48"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.8s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-extrabold text-neutral-900">{score}</span>
        </div>
      </div>
      <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: color + "22", color }}>
        {label}
      </span>
    </div>
  );
}

export function PageSpeedAudit({ isUk }: Props) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PSIResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const t = isUk
    ? {
        heading: "Аналіз швидкості сайту",
        sub: "Введіть URL вашого сайту — ми перевіримо Core Web Vitals та швидкість завантаження.",
        placeholder: "https://example.com",
        btn: "Перевірити швидкість",
        checking: "Аналізуємо...",
        note: "⏱ Аналіз займає 15–30 секунд",
        scoreLabel: "Загальний бал",
        metrics: "Ключові метрики",
        lcpLabel: "LCP (Largest Contentful Paint)",
        clsLabel: "CLS (Cumulative Layout Shift)",
        fcpLabel: "FCP (First Contentful Paint)",
        ttfbLabel: "TTFB (Time to First Byte)",
        oppLabel: "Можливості для покращення",
        noOpp: "Чудово! Серйозних проблем не знайдено.",
        cta: "Потрібна допомога з оптимізацією?",
        ctaBtn: "Замовити аудит",
        errInvalid: "Введіть коректний URL, наприклад https://example.com",
        errApi: "Не вдалося перевірити. Спробуйте ще раз.",
        mobileNote: "📱 Аналіз виконується для мобільних пристроїв (Mobile strategy)",
        retry: "Перевірити інший сайт",
      }
    : {
        heading: "Page Speed Analyser",
        sub: "Enter your website URL — we'll check Core Web Vitals and load performance.",
        placeholder: "https://example.com",
        btn: "Check Speed",
        checking: "Analysing...",
        note: "⏱ Analysis takes 15–30 seconds",
        scoreLabel: "Performance Score",
        metrics: "Key Metrics",
        lcpLabel: "LCP (Largest Contentful Paint)",
        clsLabel: "CLS (Cumulative Layout Shift)",
        fcpLabel: "FCP (First Contentful Paint)",
        ttfbLabel: "TTFB (Time to First Byte)",
        oppLabel: "Opportunities for Improvement",
        noOpp: "Great! No major performance issues found.",
        cta: "Need help optimising?",
        ctaBtn: "Get a Full Audit",
        errInvalid: "Please enter a valid URL, e.g. https://example.com",
        errApi: "Could not analyse this page. Please try again.",
        mobileNote: "📱 Analysis uses Mobile strategy (Google Lighthouse)",
        retry: "Check another site",
      };

  async function handleCheck() {
    setError(null);
    setResult(null);

    let normalized = url.trim();
    if (!normalized) return;
    if (!/^https?:\/\//i.test(normalized)) normalized = "https://" + normalized;

    try {
      new URL(normalized);
    } catch {
      setError(t.errInvalid);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/speed-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: normalized }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? t.errApi);
        return;
      }
      setResult(data as PSIResult);
    } catch {
      setError(t.errApi);
    } finally {
      setLoading(false);
    }
  }

  const metrics = result
    ? [
        { icon: <Zap className="w-4 h-4" />, label: t.lcpLabel, value: result.lcp },
        { icon: <Layout className="w-4 h-4" />, label: t.clsLabel, value: result.cls },
        { icon: <Clock className="w-4 h-4" />, label: t.fcpLabel, value: result.fcp },
        { icon: <Server className="w-4 h-4" />, label: t.ttfbLabel, value: result.ttfb },
      ]
    : [];

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Gauge className="w-6 h-6 text-indigo-600" />
          <h2 className="text-2xl font-heading font-extrabold text-neutral-900">{t.heading}</h2>
        </div>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">{t.sub}</p>
      </div>

      {/* Input */}
      {!result && (
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !loading && handleCheck()}
              placeholder={t.placeholder}
              className="flex-1 px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-neutral-50"
              disabled={loading}
            />
            <button
              onClick={handleCheck}
              disabled={loading || !url.trim()}
              className="px-5 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" />{t.checking}</>
              ) : (
                <><Search className="w-4 h-4" />{t.btn}</>
              )}
            </button>
          </div>
          <p className="text-xs text-neutral-400">{t.note}</p>
          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center gap-4 py-10 text-neutral-500">
          <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
          <p className="text-sm">{t.checking}</p>
          <p className="text-xs text-neutral-400">{t.note}</p>
        </div>
      )}

      {/* Results */}
      {result && !loading && (
        <div className="space-y-6">
          {/* Score */}
          <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200">
            <ScoreRing score={result.score} />
            <div className="flex-1 text-center sm:text-left">
              <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 mb-1">{t.scoreLabel}</p>
              <p className="text-xs text-neutral-400 leading-relaxed">{t.mobileNote}</p>
              <p className="text-xs text-neutral-400 mt-1 break-all">{url}</p>
            </div>
          </div>

          {/* Metrics grid */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">{t.metrics}</h3>
            <div className="grid grid-cols-2 gap-3">
              {metrics.map(({ icon, label, value }) => (
                <div key={label} className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white">
                  <div className="flex items-center gap-2 text-indigo-500 mb-1">{icon}</div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-0.5 leading-snug">{label}</p>
                  <p className="text-lg font-bold text-neutral-900">{value ?? "—"}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Opportunities */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">{t.oppLabel}</h3>
            {result.opportunities.length === 0 ? (
              <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm">
                ✅ {t.noOpp}
              </div>
            ) : (
              <div className="space-y-2">
                {result.opportunities.map((opp, i) => (
                  <div key={i} className="p-4 rounded-xl border border-amber-200 bg-amber-50">
                    <p className="text-sm font-semibold text-amber-800 mb-1">{opp.title}</p>
                    <p className="text-xs text-amber-700 leading-relaxed">{opp.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CTA + Retry */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href="#contact"
              className="flex-1 text-center px-5 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
            >
              {t.ctaBtn}
            </a>
            <button
              onClick={() => { setResult(null); setUrl(""); setError(null); }}
              className="flex-1 px-5 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
            >
              {t.retry}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
