"use client";

import { useState } from "react";
import { Bell, BellOff, Check, X, FileText, Tag, Calendar } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

type Stage = "idle" | "permission" | "subscribed" | "denied";

const SEGMENTS = [
  { id: "articles", icon: FileText, labelEn: "New articles", labelUk: "Нові статті", desc: { en: "Weekly digest", uk: "Тижневий дайджест" } },
  { id: "promos", icon: Tag, labelEn: "Promos & sales", labelUk: "Акції та промо", desc: { en: "Limited offers", uk: "Обмежені пропозиції" } },
  { id: "reminders", icon: Calendar, labelEn: "Booking reminders", labelUk: "Нагадування про запис", desc: { en: "Day-before reminder", uk: "Нагадування за день" } },
];

const SAMPLE_NOTIF = {
  uk: { title: "📰 Новий гайд по Next.js 16", body: "Як ми скоротили LCP на 40% за один спринт. Читати →" },
  en: { title: "📰 New Next.js 16 guide", body: "How we cut LCP by 40% in one sprint. Read more →" },
};

export function WebPushDemo({ isUk }: Props) {
  const [stage, setStage] = useState<Stage>("idle");
  const [segments, setSegments] = useState<Set<string>>(new Set(["articles"]));
  const [showSample, setShowSample] = useState(false);

  const toggleSegment = (id: string) => {
    setSegments((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const subscribe = () => {
    setStage("permission");
  };

  const grantPermission = () => {
    setStage("subscribed");
    setTimeout(() => setShowSample(true), 800);
  };

  const denyPermission = () => setStage("denied");
  const reset = () => { setStage("idle"); setShowSample(false); };

  return (
    <div className="space-y-6">
      {/* Subscribe panel */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-6">
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stage === "subscribed" ? "bg-emerald-100 text-emerald-600" : "bg-indigo-100 text-indigo-600"}`}>
              {stage === "subscribed" ? <Check className="w-6 h-6" /> : <Bell className="w-6 h-6" />}
            </div>
            <div>
              <h3 className="font-bold text-neutral-900">
                {stage === "subscribed"
                  ? (isUk ? "Підписку оформлено" : "You're subscribed")
                  : (isUk ? "Push-сповіщення" : "Push notifications")}
              </h3>
              <p className="text-sm text-neutral-500">
                {stage === "subscribed"
                  ? (isUk ? "Будемо надсилати лише обрані типи." : "We'll only send selected types.")
                  : (isUk ? "Отримуйте важливі оновлення прямо в браузер." : "Get important updates right in your browser.")}
              </p>
            </div>
          </div>
          {stage === "subscribed" && (
            <button
              onClick={reset}
              className="px-3 py-1.5 rounded-lg text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:text-white transition-colors"
            >
              {isUk ? "Скинути" : "Reset"}
            </button>
          )}
        </div>

        {/* Segments */}
        <div className="space-y-2 mb-5">
          {SEGMENTS.map((s) => {
            const Icon = s.icon;
            const checked = segments.has(s.id);
            return (
              <label
                key={s.id}
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                  checked ? "border-indigo-300 bg-indigo-50/50" : "border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleSegment(s.id)}
                  className="rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500"
                />
                <Icon className={`w-5 h-5 ${checked ? "text-indigo-600" : "text-neutral-400"}`} />
                <div className="flex-1">
                  <div className="font-medium text-neutral-800 dark:text-neutral-200 text-sm">
                    {isUk ? s.labelUk : s.labelEn}
                  </div>
                  <div className="text-xs text-neutral-500">
                    {isUk ? s.desc.uk : s.desc.en}
                  </div>
                </div>
              </label>
            );
          })}
        </div>

        {stage === "idle" && (
          <button
            onClick={subscribe}
            disabled={segments.size === 0}
            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Bell className="w-4 h-4" />
            {isUk ? `Підписатися (${segments.size} тип${segments.size === 1 ? "" : "и"})` : `Subscribe (${segments.size} type${segments.size === 1 ? "" : "s"})`}
          </button>
        )}

        {stage === "denied" && (
          <div className="rounded-xl bg-rose-50 border border-rose-200 p-4 text-sm text-rose-700 flex items-center justify-between">
            <span>{isUk ? "Дозвіл відхилено. Спробуйте ще раз." : "Permission denied. Try again."}</span>
            <button onClick={reset} className="font-semibold hover:underline">{isUk ? "Скинути" : "Reset"}</button>
          </div>
        )}
      </div>

      {/* Permission prompt (browser-style) */}
      {stage === "permission" && (
        <div className="rounded-xl border border-neutral-300 bg-neutral-50 dark:bg-neutral-900 p-4 shadow-lg max-w-md mx-auto">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center shrink-0">
              <Bell className="w-4 h-4 text-neutral-600" />
            </div>
            <div className="text-sm">
              <p className="font-semibold text-neutral-800">codeworth.uk</p>
              <p className="text-neutral-600 dark:text-neutral-300 mt-0.5">
                {isUk ? "Хоче надсилати вам сповіщення" : "Wants to send you notifications"}
              </p>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button
              onClick={denyPermission}
              className="px-4 py-2 rounded-lg border border-neutral-300 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:bg-neutral-800 transition-colors flex items-center gap-1.5"
            >
              <BellOff className="w-3.5 h-3.5" />
              {isUk ? "Заблокувати" : "Block"}
            </button>
            <button
              onClick={grantPermission}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              {isUk ? "Дозволити" : "Allow"}
            </button>
          </div>
        </div>
      )}

      {/* Sample notification */}
      {showSample && stage === "subscribed" && (
        <div
          role="alert"
          className="max-w-md mx-auto rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-xl p-4 animate-in slide-in-from-top-4 fade-in duration-500"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-md bg-linear-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
              CN
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-neutral-900 dark:text-white text-sm">
                {isUk ? SAMPLE_NOTIF.uk.title : SAMPLE_NOTIF.en.title}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-0.5">
                {isUk ? SAMPLE_NOTIF.uk.body : SAMPLE_NOTIF.en.body}
              </p>
              <p className="text-xs text-neutral-400 mt-1">codeworth.uk · {isUk ? "щойно" : "now"}</p>
            </div>
            <button
              onClick={() => setShowSample(false)}
              className="text-neutral-400 hover:text-neutral-700 dark:text-neutral-300 p-1"
              aria-label={isUk ? "Закрити" : "Dismiss"}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <p className="text-sm text-neutral-500">
        {isUk
          ? "Production стек: Web Push API + Service Worker + VAPID keys. Сегментація на бекенді."
          : "Production stack: Web Push API + Service Worker + VAPID keys. Backend-side segmentation."}
      </p>
    </div>
  );
}
