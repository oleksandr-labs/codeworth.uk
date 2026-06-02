"use client";

import { useState } from "react";
import { Play, Volume2, VolumeX, Maximize, Film } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

const VARIANTS = [
  { id: "hero-bg", labelEn: "Hero background video", labelUk: "Hero фонове відео" },
  { id: "embed", labelEn: "YouTube/Vimeo embed", labelUk: "YouTube/Vimeo embed" },
  { id: "case-study", labelEn: "Case study player", labelUk: "Кейс-стаді плеєр" },
];

export function VideoDemo({ isUk }: Props) {
  const [variant, setVariant] = useState<"hero-bg" | "embed" | "case-study">("hero-bg");
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {VARIANTS.map((v) => (
          <button
            key={v.id}
            onClick={() => setVariant(v.id as typeof variant)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              variant === v.id
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-neutral-100 text-neutral-600 hover:bg-indigo-50"
            }`}
          >
            {isUk ? v.labelUk : v.labelEn}
          </button>
        ))}
      </div>

      {variant === "hero-bg" && (
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-linear-to-br from-slate-900 via-indigo-950 to-violet-950">
          {/* Animated gradient as fake background video */}
          <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/30 via-transparent to-transparent animate-pulse" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
              {isUk ? "Створюємо швидкі сайти" : "We build fast websites"}
            </h3>
            <p className="text-white/80 mb-6 max-w-md">
              {isUk
                ? "Hero-секція з фоновим відео (autoplay, muted, loop) і CTA-кнопкою поверх."
                : "Hero section with background video (autoplay, muted, loop) and CTA button overlay."}
            </p>
            <button className="px-6 py-3 rounded-lg bg-white text-indigo-700 font-semibold hover:bg-white/90 transition-colors">
              {isUk ? "Замовити" : "Get started"}
            </button>
          </div>
          <button
            onClick={() => setMuted((m) => !m)}
            className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/30 transition-colors"
            aria-label={muted ? (isUk ? "Увімкнути звук" : "Unmute") : (isUk ? "Вимкнути звук" : "Mute")}
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      )}

      {variant === "embed" && (
        <div className="aspect-video rounded-2xl overflow-hidden bg-neutral-900 relative">
          {!playing ? (
            <button
              onClick={() => setPlaying(true)}
              className="absolute inset-0 w-full h-full flex items-center justify-center group"
              aria-label={isUk ? "Відтворити відео" : "Play video"}
            >
              <div className="absolute inset-0 bg-linear-to-br from-rose-600/80 to-violet-700/80" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-white/95 flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                  <Play className="w-10 h-10 text-rose-600 ml-1" />
                </div>
                <p className="mt-4 text-white font-semibold">
                  {isUk ? "Презентація Codeworth · 2:45" : "Codeworth Showreel · 2:45"}
                </p>
              </div>
            </button>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-white bg-black">
              <div className="text-center">
                <Film className="w-12 h-12 mx-auto mb-3 text-white/40" />
                <p className="text-sm text-white/60">
                  {isUk ? "Тут вантажиться iframe YouTube/Vimeo" : "YouTube/Vimeo iframe loads here"}
                </p>
                <p className="text-xs text-white/40 mt-1">{`<iframe src="https://youtube.com/embed/..." />`}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {variant === "case-study" && (
        <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden">
          <div className="aspect-video bg-neutral-900 relative group">
            <div className="absolute inset-0 bg-linear-to-br from-emerald-600 to-teal-700 flex items-center justify-center">
              <button
                onClick={() => setPlaying((p) => !p)}
                className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center hover:scale-110 transition-transform shadow-xl"
                aria-label={playing ? "Pause" : "Play"}
              >
                <Play className="w-8 h-8 text-emerald-600 ml-0.5" />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-linear-to-t from-black/80 to-transparent flex items-center gap-2">
              <span className="text-white text-xs tabular-nums">0:00</span>
              <div className="flex-1 h-1 bg-white/20 rounded-full">
                <div className="h-full w-1/4 bg-white rounded-full" />
              </div>
              <span className="text-white text-xs tabular-nums">3:21</span>
              <Maximize className="w-4 h-4 text-white ml-2" />
            </div>
          </div>
          <div className="p-5">
            <h3 className="font-bold text-neutral-900 mb-2">
              {isUk ? "Кейс: FoodCo SaaS — 47% конверсія за місяць" : "Case: FoodCo SaaS — 47% conversion in 1 month"}
            </h3>
            <p className="text-sm text-neutral-500 leading-relaxed">
              {isUk
                ? "Розповідаємо як ми переробили лендінг для FoodCo: A/B тести, hero оптимізація, новий checkout flow."
                : "We rebuilt FoodCo's landing page: A/B tests, hero optimization, new checkout flow."}
            </p>
          </div>
        </div>
      )}

      <p className="text-sm text-neutral-500">
        {isUk
          ? "Lazy loading (Intersection Observer), poster-зображення, mute/play кнопки, native HTML5 video або iframe embed."
          : "Lazy loading (Intersection Observer), poster image, mute/play controls, native HTML5 video or iframe embed."}
      </p>
    </div>
  );
}
