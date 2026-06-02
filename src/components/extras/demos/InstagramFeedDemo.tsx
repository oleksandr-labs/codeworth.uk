"use client";

import { useState } from "react";
import { Heart, MessageCircle, Bookmark, X, ExternalLink, Instagram } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

interface Post {
  id: number;
  emoji: string;
  bg: string;
  likes: number;
  comments: number;
  captionEn: string;
  captionUk: string;
  daysAgo: number;
}

const POSTS: Post[] = [
  { id: 1, emoji: "🚀", bg: "from-indigo-600 to-violet-700", likes: 824, comments: 32, captionEn: "Shipping our new dashboard today 🚀", captionUk: "Запускаємо новий дашборд сьогодні 🚀", daysAgo: 1 },
  { id: 2, emoji: "💻", bg: "from-slate-700 to-slate-900", likes: 612, comments: 18, captionEn: "Team coding session in the morning ☕", captionUk: "Ранкова сесія розробки ☕", daysAgo: 2 },
  { id: 3, emoji: "🎨", bg: "from-rose-500 to-pink-600", likes: 1240, comments: 47, captionEn: "Design system v2 — full breakdown 🎨", captionUk: "Design system v2 — повний розбір 🎨", daysAgo: 3 },
  { id: 4, emoji: "📊", bg: "from-emerald-600 to-teal-700", likes: 478, comments: 12, captionEn: "Latest case study: +89% conversion", captionUk: "Свіжий кейс: +89% конверсії", daysAgo: 4 },
  { id: 5, emoji: "🛠", bg: "from-amber-500 to-orange-600", likes: 893, comments: 28, captionEn: "Our internal toolkit explained", captionUk: "Наш внутрішній toolkit", daysAgo: 5 },
  { id: 6, emoji: "🌍", bg: "from-blue-500 to-cyan-600", likes: 567, comments: 14, captionEn: "Now shipping to UK clients 🇬🇧", captionUk: "Тепер для UK клієнтів 🇬🇧", daysAgo: 6 },
  { id: 7, emoji: "⚡", bg: "from-yellow-500 to-amber-600", likes: 1820, comments: 92, captionEn: "Performance tips: LCP < 1.2s ⚡", captionUk: "Performance тіпси: LCP < 1.2с ⚡", daysAgo: 7 },
  { id: 8, emoji: "🎯", bg: "from-rose-600 to-red-700", likes: 723, comments: 21, captionEn: "Conversion optimization checklist", captionUk: "Чекліст оптимізації конверсії", daysAgo: 8 },
  { id: 9, emoji: "🤝", bg: "from-violet-500 to-purple-700", likes: 412, comments: 8, captionEn: "New partnership: AI startup 🤝", captionUk: "Нове партнерство: AI стартап 🤝", daysAgo: 9 },
];

export function InstagramFeedDemo({ isUk }: Props) {
  const [layout, setLayout] = useState<"grid" | "carousel">("grid");
  const [openPost, setOpenPost] = useState<Post | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Instagram className="w-5 h-5 text-rose-500" />
          <span className="font-semibold text-neutral-900">@Codeworth.studio</span>
          <span className="text-sm text-neutral-500">· {POSTS.length} {isUk ? "постів" : "posts"}</span>
        </div>
        <div className="flex gap-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 p-1">
          {(["grid", "carousel"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLayout(l)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all capitalize ${
                layout === l ? "bg-white text-neutral-900 dark:text-white shadow-sm" : "text-neutral-500"
              }`}
            >
              {l === "grid" ? (isUk ? "Сітка" : "Grid") : (isUk ? "Карусель" : "Carousel")}
            </button>
          ))}
        </div>
      </div>

      {layout === "grid" ? (
        <div className="grid grid-cols-3 gap-1">
          {POSTS.map((p) => (
            <button
              key={p.id}
              onClick={() => setOpenPost(p)}
              className={`aspect-square bg-linear-to-br ${p.bg} flex items-center justify-center text-5xl relative group hover:opacity-90 transition-opacity`}
              aria-label={`Post ${p.id}: ${isUk ? p.captionUk : p.captionEn}`}
            >
              {p.emoji}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-4 text-white opacity-0 group-hover:opacity-100">
                <span className="flex items-center gap-1 text-sm font-semibold">
                  <Heart className="w-4 h-4 fill-white" />
                  {p.likes}
                </span>
                <span className="flex items-center gap-1 text-sm font-semibold">
                  <MessageCircle className="w-4 h-4 fill-white" />
                  {p.comments}
                </span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-3">
            {POSTS.map((p) => (
              <button
                key={p.id}
                onClick={() => setOpenPost(p)}
                className={`flex-shrink-0 w-44 aspect-square rounded-xl bg-linear-to-br ${p.bg} flex items-center justify-center text-5xl hover:scale-105 transition-transform`}
                aria-label={`Post ${p.id}`}
              >
                {p.emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox */}
      {openPost && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpenPost(null)}
          role="dialog"
          aria-label={isUk ? "Перегляд поста" : "Post viewer"}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`aspect-square bg-linear-to-br ${openPost.bg} flex items-center justify-center text-8xl`}>
              {openPost.emoji}
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                <button className="text-neutral-700 dark:text-neutral-300 hover:text-rose-500"><Heart className="w-6 h-6" /></button>
                <button className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900"><MessageCircle className="w-6 h-6" /></button>
                <button className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900"><Bookmark className="w-6 h-6 ml-auto" /></button>
              </div>
              <div className="text-sm font-semibold text-neutral-900">{openPost.likes.toLocaleString()} {isUk ? "вподобайок" : "likes"}</div>
              <p className="text-sm text-neutral-700">
                <span className="font-semibold">Codeworth.studio</span> {isUk ? openPost.captionUk : openPost.captionEn}
              </p>
              <div className="text-xs text-neutral-400 uppercase tracking-wider">
                {openPost.daysAgo} {isUk ? "дн. тому" : "days ago"}
              </div>
            </div>
            <button
              onClick={() => setOpenPost(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:bg-neutral-800 flex items-center justify-center"
              aria-label={isUk ? "Закрити" : "Close"}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <p className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-2">
        <ExternalLink className="w-3.5 h-3.5" />
        {isUk
          ? "Production: Instagram Graph API → fetch останніх постів, кеш у статичний JSON, ISR revalidate 1 год."
          : "Production: Instagram Graph API → fetch latest posts, cache to static JSON, ISR revalidate 1h."}
      </p>
    </div>
  );
}
