"use client";

import { useState, useMemo } from "react";

interface Props {
  isUk: boolean;
}

function hexToRgb(hex: string): [number, number, number] | null {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return null;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
  return [r, g, b];
}

function linearize(c: number): number {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

function relativeLuminance(r: number, g: number, b: number): number {
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

function contrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function ColorContrastChecker({ isUk }: Props) {
  const [fg, setFg] = useState("#1a1a2e");
  const [bg, setBg] = useState("#ffffff");

  const result = useMemo(() => {
    const fgRgb = hexToRgb(fg);
    const bgRgb = hexToRgb(bg);
    if (!fgRgb || !bgRgb) return null;

    const l1 = relativeLuminance(...fgRgb);
    const l2 = relativeLuminance(...bgRgb);
    const ratio = contrastRatio(l1, l2);

    return {
      ratio,
      aaLarge: ratio >= 3,
      aaNormal: ratio >= 4.5,
      aaaLarge: ratio >= 4.5,
      aaaNormal: ratio >= 7,
    };
  }, [fg, bg]);

  const t = isUk
    ? {
        fg: "Колір тексту",
        bg: "Колір фону",
        ratio: "Коефіцієнт контрасту",
        wcag: "WCAG 2.1 Відповідність",
        normalText: "Звичайний текст",
        largeText: "Великий текст (18pt+)",
        pass: "✅ Проходить",
        fail: "❌ Не проходить",
        preview: "Попередній перегляд",
        previewText: "Приклад тексту на цьому фоні",
        previewBig: "Великий заголовок 18pt",
        excellent: "Відмінно",
        good: "Добре",
        low: "Низький",
        veryLow: "Дуже низький",
        aaStandard: "AA (мінімальний стандарт WCAG)",
        aaaStandard: "AAA (покращений стандарт WCAG)",
      }
    : {
        fg: "Text colour",
        bg: "Background colour",
        ratio: "Contrast ratio",
        wcag: "WCAG 2.1 Compliance",
        normalText: "Normal text",
        largeText: "Large text (18pt+)",
        pass: "✅ Pass",
        fail: "❌ Fail",
        preview: "Preview",
        previewText: "Sample text on this background",
        previewBig: "Large heading 18pt",
        excellent: "Excellent",
        good: "Good",
        low: "Low",
        veryLow: "Very low",
        aaStandard: "AA (WCAG minimum standard)",
        aaaStandard: "AAA (WCAG enhanced standard)",
      };

  function ratingLabel(ratio: number) {
    if (ratio >= 7) return { label: t.excellent, color: "text-green-600" };
    if (ratio >= 4.5) return { label: t.good, color: "text-green-500" };
    if (ratio >= 3) return { label: t.low, color: "text-amber-600" };
    return { label: t.veryLow, color: "text-red-600" };
  }

  return (
    <div className="space-y-8">
      {/* Color pickers */}
      <div className="grid sm:grid-cols-2 gap-6">
        {[
          { label: t.fg, value: fg, setter: setFg },
          { label: t.bg, value: bg, setter: setBg },
        ].map((c) => (
          <div key={c.label}>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">{c.label}</label>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div
                  className="w-12 h-12 rounded-xl border-2 border-neutral-200 shadow-sm cursor-pointer overflow-hidden"
                  style={{ backgroundColor: c.value }}
                >
                  <input
                    type="color"
                    value={c.value}
                    onChange={(e) => c.setter(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
              <input
                type="text"
                value={c.value}
                onChange={(e) => c.setter(e.target.value)}
                maxLength={7}
                className="flex-1 px-3 py-2 rounded-xl border border-neutral-200 bg-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-400 uppercase"
              />
            </div>
          </div>
        ))}
      </div>

      {result && (
        <div className="grid sm:grid-cols-2 gap-6">
          {/* Ratio card */}
          <div className="p-6 rounded-2xl bg-neutral-900 text-white">
            <p className="text-xs text-neutral-400 mb-1">{t.ratio}</p>
            <p className="text-5xl font-extrabold tracking-tight">
              {result.ratio.toFixed(2)}<span className="text-2xl text-neutral-400">:1</span>
            </p>
            <p className={`text-sm font-semibold mt-2 ${ratingLabel(result.ratio).color}`}>
              {ratingLabel(result.ratio).label}
            </p>

            <div className="mt-6 space-y-3">
              <p className="text-xs text-neutral-400 font-semibold">{t.wcag}</p>
              {[
                { label: `${t.aaStandard} — ${t.normalText}`, pass: result.aaNormal },
                { label: `${t.aaStandard} — ${t.largeText}`, pass: result.aaLarge },
                { label: `${t.aaaStandard} — ${t.normalText}`, pass: result.aaaNormal },
                { label: `${t.aaaStandard} — ${t.largeText}`, pass: result.aaaLarge },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between">
                  <span className="text-xs text-neutral-300">{row.label}</span>
                  <span className={`text-xs font-semibold ${row.pass ? "text-green-400" : "text-red-400"}`}>
                    {row.pass ? t.pass : t.fail}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div>
            <p className="text-sm font-semibold text-neutral-700 mb-3">{t.preview}</p>
            <div
              className="w-full h-full min-h-40 rounded-2xl p-6 border border-neutral-200"
              style={{ backgroundColor: bg, color: fg }}
            >
              <p className="text-xl font-bold mb-2">{t.previewBig}</p>
              <p className="text-sm leading-relaxed">{t.previewText}</p>
              <p className="text-xs mt-3 opacity-75">{t.previewText}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
