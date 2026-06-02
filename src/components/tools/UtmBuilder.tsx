"use client";

import { useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";

interface Props {
  isUk: boolean;
}

export function UtmBuilder({ isUk }: Props) {
  const [baseUrl, setBaseUrl] = useState("");
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaign, setCampaign] = useState("");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");
  const [copied, setCopied] = useState(false);

  function buildUrl() {
    if (!baseUrl) return "";
    const params = new URLSearchParams();
    if (source) params.set("utm_source", source);
    if (medium) params.set("utm_medium", medium);
    if (campaign) params.set("utm_campaign", campaign);
    if (term) params.set("utm_term", term);
    if (content) params.set("utm_content", content);
    const qs = params.toString();
    if (!qs) return baseUrl;
    return `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}${qs}`;
  }

  const result = buildUrl();

  function copy() {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function reset() {
    setBaseUrl(""); setSource(""); setMedium(""); setCampaign(""); setTerm(""); setContent("");
  }

  const PRESETS = isUk
    ? [
        { label: "Google Ads", source: "google", medium: "cpc" },
        { label: "Facebook", source: "facebook", medium: "social" },
        { label: "Email", source: "newsletter", medium: "email" },
        { label: "Instagram", source: "instagram", medium: "social" },
        { label: "LinkedIn", source: "linkedin", medium: "social" },
      ]
    : [
        { label: "Google Ads", source: "google", medium: "cpc" },
        { label: "Facebook", source: "facebook", medium: "social" },
        { label: "Email", source: "newsletter", medium: "email" },
        { label: "Instagram", source: "instagram", medium: "social" },
        { label: "LinkedIn", source: "linkedin", medium: "social" },
      ];

  const t = isUk
    ? {
        baseUrl: "URL сторінки",
        baseUrlPh: "https://example.com/landing",
        source: "utm_source (Джерело)",
        sourcePh: "google, facebook, newsletter",
        medium: "utm_medium (Канал)",
        mediumPh: "cpc, social, email",
        campaign: "utm_campaign (Кампанія)",
        campaignPh: "spring-sale-2026, brand-awareness",
        term: "utm_term (Ключове слово, необов'язково)",
        termPh: "розробка сайту",
        content: "utm_content (Варіант оголошення, необов'язково)",
        contentPh: "banner-v1, cta-button",
        result: "Готове UTM-посилання",
        copy: "Скопіювати",
        copied: "Скопійовано!",
        reset: "Очистити",
        presets: "Швидкі шаблони:",
        empty: "Заповніть форму вище — посилання з'явиться тут",
      }
    : {
        baseUrl: "Landing page URL",
        baseUrlPh: "https://example.com/landing",
        source: "utm_source (Traffic source)",
        sourcePh: "google, facebook, newsletter",
        medium: "utm_medium (Marketing medium)",
        mediumPh: "cpc, social, email",
        campaign: "utm_campaign (Campaign name)",
        campaignPh: "spring-sale-2026, brand-awareness",
        term: "utm_term (Keyword, optional)",
        termPh: "web development",
        content: "utm_content (Ad variant, optional)",
        contentPh: "banner-v1, cta-button",
        result: "Generated UTM URL",
        copy: "Copy",
        copied: "Copied!",
        reset: "Reset",
        presets: "Quick presets:",
        empty: "Fill in the form above — your URL will appear here",
      };

  const fields = [
    { label: t.source, value: source, setter: setSource, ph: t.sourcePh, required: true },
    { label: t.medium, value: medium, setter: setMedium, ph: t.mediumPh, required: true },
    { label: t.campaign, value: campaign, setter: setCampaign, ph: t.campaignPh, required: true },
    { label: t.term, value: term, setter: setTerm, ph: t.termPh, required: false },
    { label: t.content, value: content, setter: setContent, ph: t.contentPh, required: false },
  ];

  return (
    <div className="space-y-8">
      {/* Base URL */}
      <div>
        <label className="block text-sm font-semibold text-neutral-700 mb-1.5">{t.baseUrl}</label>
        <input
          type="url"
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
          placeholder={t.baseUrlPh}
          className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Presets */}
      <div>
        <p className="text-xs text-neutral-500 font-semibold mb-2">{t.presets}</p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => { setSource(p.source); setMedium(p.medium); }}
              className="px-3 py-1.5 rounded-lg border border-neutral-200 bg-white text-xs font-semibold text-neutral-600 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* UTM fields */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {fields.map((f) => (
          <div key={f.label}>
            <label className="block text-xs font-semibold text-neutral-600 mb-1">
              {f.label}
              {f.required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            <input
              type="text"
              value={f.value}
              onChange={(e) => f.setter(e.target.value)}
              placeholder={f.ph}
              className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        ))}
      </div>

      {/* Result */}
      <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-neutral-400">{t.result}</span>
          <div className="flex gap-2">
            <button
              onClick={reset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-400 hover:text-white border border-neutral-700 hover:border-neutral-500 transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              {t.reset}
            </button>
            <button
              onClick={copy}
              disabled={!result}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors disabled:opacity-40"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? t.copied : t.copy}
            </button>
          </div>
        </div>
        {result ? (
          <p className="text-green-400 text-xs font-mono break-all leading-relaxed">{result}</p>
        ) : (
          <p className="text-neutral-600 text-xs italic">{t.empty}</p>
        )}
      </div>
    </div>
  );
}
