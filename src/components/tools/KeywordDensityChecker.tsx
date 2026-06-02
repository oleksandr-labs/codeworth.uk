"use client";

import { useState, useMemo } from "react";

interface Props {
  isUk: boolean;
}

interface WordEntry {
  word: string;
  count: number;
  density: string;
}

export function KeywordDensityChecker({ isUk }: Props) {
  const [text, setText] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");

  const stats = useMemo(() => {
    if (!text.trim()) return null;

    const cleaned = text.toLowerCase().replace(/[^a-zа-яіїєё\s''-]/g, " ");
    const words = cleaned.split(/\s+/).filter((w) => w.length > 2);
    const total = words.length;

    if (total === 0) return null;

    const freq: Record<string, number> = {};
    for (const w of words) {
      freq[w] = (freq[w] ?? 0) + 1;
    }

    const sorted: WordEntry[] = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([word, count]) => ({
        word,
        count,
        density: ((count / total) * 100).toFixed(1),
      }));

    const focusDensity = focusKeyword
      ? ((freq[focusKeyword.toLowerCase()] ?? 0) / total) * 100
      : null;

    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
    const chars = text.length;
    const avgWordLen = words.reduce((s, w) => s + w.length, 0) / total;

    return { total, sorted, focusDensity, sentences, chars, avgWordLen };
  }, [text, focusKeyword]);

  const t = isUk
    ? {
        textLabel: "Вставте ваш текст",
        textPh: "Вставте текст для аналізу...",
        focusLabel: "Фокусне ключове слово (необов'язково)",
        focusPh: "розробка сайтів",
        words: "Слів",
        sentences: "Речень",
        chars: "Символів",
        avgWord: "Сер. довжина слова",
        focusDensity: "Щільність ключового слова",
        top: "Топ-20 слів за частотою",
        word: "Слово",
        count: "Кількість",
        density: "Щільність",
        empty: "Вставте текст для аналізу вище",
        tooLow: "⚠️ Занадто низька (< 1%)",
        good: "✅ Оптимальна (1–3%)",
        tooHigh: "⚠️ Занадто висока (> 3%)",
        chars_sym: "симв.",
      }
    : {
        textLabel: "Paste your text",
        textPh: "Paste your content here for analysis...",
        focusLabel: "Focus keyword (optional)",
        focusPh: "web development",
        words: "Words",
        sentences: "Sentences",
        chars: "Characters",
        avgWord: "Avg word length",
        focusDensity: "Focus keyword density",
        top: "Top 20 words by frequency",
        word: "Word",
        count: "Count",
        density: "Density",
        empty: "Paste text above to analyse",
        tooLow: "⚠️ Too low (< 1%)",
        good: "✅ Optimal (1–3%)",
        tooHigh: "⚠️ Too high (> 3%)",
        chars_sym: "chars",
      };

  function focusStatus(d: number) {
    if (d < 1) return { label: t.tooLow, color: "text-amber-600" };
    if (d <= 3) return { label: t.good, color: "text-green-600" };
    return { label: t.tooHigh, color: "text-red-600" };
  }

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Text input */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-semibold text-neutral-700 mb-1.5">{t.textLabel}</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t.textPh}
            rows={10}
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
          />
        </div>

        {/* Focus keyword + stats */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-1.5">{t.focusLabel}</label>
            <input
              type="text"
              value={focusKeyword}
              onChange={(e) => setFocusKeyword(e.target.value)}
              placeholder={t.focusPh}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {stats && (
            <div className="space-y-3">
              {[
                { label: t.words, value: stats.total },
                { label: t.sentences, value: stats.sentences },
                { label: t.chars, value: stats.chars },
                { label: t.avgWord, value: `${stats.avgWordLen.toFixed(1)} ${t.chars_sym}` },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                  <span className="text-xs text-neutral-500">{s.label}</span>
                  <span className="text-sm font-bold text-neutral-900">{s.value}</span>
                </div>
              ))}

              {stats.focusDensity !== null && (
                <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100">
                  <p className="text-xs text-neutral-500 mb-0.5">{t.focusDensity}</p>
                  <p className="text-xl font-extrabold text-indigo-700">{stats.focusDensity.toFixed(1)}%</p>
                  <p className={`text-xs mt-1 ${focusStatus(stats.focusDensity).color}`}>
                    {focusStatus(stats.focusDensity).label}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Word frequency table */}
      {stats ? (
        <div>
          <h3 className="text-sm font-semibold text-neutral-700 mb-3">{t.top}</h3>
          <div className="overflow-x-auto rounded-xl border border-neutral-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-500">#</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-500">{t.word}</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-neutral-500">{t.count}</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-neutral-500">{t.density}</th>
                </tr>
              </thead>
              <tbody>
                {stats.sorted.map((row, i) => {
                  const isFocus = focusKeyword && row.word === focusKeyword.toLowerCase();
                  return (
                    <tr key={row.word} className={`border-b border-neutral-50 last:border-0 ${isFocus ? "bg-indigo-50" : i % 2 === 0 ? "bg-white" : "bg-neutral-50/50"}`}>
                      <td className="px-4 py-2.5 text-xs text-neutral-400">{i + 1}</td>
                      <td className="px-4 py-2.5 font-mono text-sm text-neutral-900">{row.word}</td>
                      <td className="px-4 py-2.5 text-right text-neutral-700">{row.count}</td>
                      <td className="px-4 py-2.5 text-right">
                        <span className={`font-semibold ${parseFloat(row.density) >= 1 && parseFloat(row.density) <= 3 ? "text-green-600" : "text-neutral-600"}`}>
                          {row.density}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-40 rounded-2xl border-2 border-dashed border-neutral-200">
          <p className="text-sm text-neutral-400">{t.empty}</p>
        </div>
      )}
    </div>
  );
}
