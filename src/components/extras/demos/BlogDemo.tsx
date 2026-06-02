"use client";

import { useState } from "react";

interface Props {
  variant: string;
  isUk: boolean;
}

const TECH_POSTS = [
  { id: 1, category: "React", categoryUk: "React", title: "Server Components: What Actually Changed in Next.js 15", titleUk: "Server Components: що насправді змінилось у Next.js 15", excerpt: "A practical deep-dive into the new rendering model, caching behavior, and migration pitfalls.", excerptUk: "Практичний огляд нової моделі рендерингу, поведінки кешування та підводних каменів міграції.", date: "Mar 18, 2026", dateUk: "18 бер. 2026", readTime: "8 min", readTimeUk: "8 хв", img: "from-blue-500 to-indigo-600", views: "4.2k" },
  { id: 2, category: "TypeScript", categoryUk: "TypeScript", title: "Stop Using `any`: Advanced Types You're Missing", titleUk: "Перестаньте використовувати `any`: просунуті типи, про які ви забуваєте", excerpt: "Discriminated unions, template literals, conditional types — with real use cases.", excerptUk: "Дискримінаційні об'єднання, шаблонні літерали, умовні типи — з реальними прикладами.", date: "Mar 12, 2026", dateUk: "12 бер. 2026", readTime: "12 min", readTimeUk: "12 хв", img: "from-blue-700 to-cyan-600", views: "6.8k" },
  { id: 3, category: "CSS", categoryUk: "CSS", title: "CSS Grid Subgrid Is Here — And It's a Game Changer", titleUk: "CSS Grid Subgrid нарешті тут — і це революція", excerpt: "How subgrid solves the alignment problems we've been hacking around for years.", excerptUk: "Як subgrid вирішує проблеми вирівнювання, з якими ми боролися роками.", date: "Mar 5, 2026", dateUk: "5 бер. 2026", readTime: "6 min", readTimeUk: "6 хв", img: "from-pink-500 to-rose-600", views: "3.1k" },
  { id: 4, category: "Performance", categoryUk: "Продуктивність", title: "Core Web Vitals 2026: New Metrics, Same Stakes", titleUk: "Core Web Vitals 2026: нові метрики, старі ставки", excerpt: "INP replaced FID. Here's what that means for your Lighthouse score.", excerptUk: "INP замінив FID. Ось що це означає для вашого Lighthouse.", date: "Feb 28, 2026", dateUk: "28 лют. 2026", readTime: "10 min", readTimeUk: "10 хв", img: "from-green-500 to-teal-600", views: "5.5k" },
  { id: 5, category: "Tools", categoryUk: "Інструменти", title: "Bun vs Node: A Year Later — The Honest Verdict", titleUk: "Bun проти Node: рік потому — чесний вердикт", excerpt: "We migrated 3 production services to Bun. Here's what we learned.", excerptUk: "Ми перевели 3 production сервіси на Bun. Ось що ми дізнались.", date: "Feb 20, 2026", dateUk: "20 лют. 2026", readTime: "15 min", readTimeUk: "15 хв", img: "from-amber-500 to-orange-600", views: "9.3k" },
  { id: 6, category: "AI", categoryUk: "AI", title: "AI-Assisted Code Review: Our Team's Workflow", titleUk: "AI-асистований code review: робочий процес нашої команди", excerpt: "Practical prompts and tooling for catching bugs before they hit production.", excerptUk: "Практичні промпти та інструменти для виявлення багів до виходу в production.", date: "Feb 14, 2026", dateUk: "14 лют. 2026", readTime: "7 min", readTimeUk: "7 хв", img: "from-violet-500 to-purple-700", views: "7.1k" },
];

const TECH_CATEGORIES = ["All", "React", "TypeScript", "CSS", "Performance", "Tools", "AI"];
const TECH_CATEGORIES_UK = ["Всі", "React", "TypeScript", "CSS", "Продуктивність", "Інструменти", "AI"];

function TechBlog({ isUk }: { isUk: boolean }) {
  const [category, setCategory] = useState(isUk ? "Всі" : "All");
  const [search, setSearch] = useState("");
  const [featured] = useState(TECH_POSTS[4]); // most viewed

  const cats = isUk ? TECH_CATEGORIES_UK : TECH_CATEGORIES;

  const filtered = TECH_POSTS.filter((p) => {
    const catMatch = category === "All" || category === "Всі" || (isUk ? p.categoryUk : p.category) === category;
    const searchMatch = !search || (isUk ? p.titleUk : p.title).toLowerCase().includes(search.toLowerCase());
    return catMatch && searchMatch;
  });

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-2">
        {isUk ? "Блог — IT медіа" : "Blog — Tech Media"}
      </h2>
      <p className="text-neutral-500 text-sm mb-8">
        {isUk ? "Пошук, фільтр за категорією, картки зі статтями, featured пост." : "Search, category filter, article cards, featured post."}
      </p>

      {/* Featured */}
      <div className={`rounded-3xl bg-gradient-to-br ${featured.img} p-8 mb-8 text-white`}>
        <span className="text-xs font-bold uppercase tracking-widest opacity-80 mb-3 block">
          {isUk ? "Найпопулярніше" : "Most popular"} · {featured.views} {isUk ? "переглядів" : "views"}
        </span>
        <h3 className="font-heading text-2xl font-bold mb-2 leading-tight">
          {isUk ? featured.titleUk : featured.title}
        </h3>
        <p className="text-white/80 text-sm mb-4">{isUk ? featured.excerptUk : featured.excerpt}</p>
        <div className="flex items-center gap-4">
          <span className="text-xs opacity-70">{isUk ? featured.dateUk : featured.date}</span>
          <span className="text-xs opacity-70">·</span>
          <span className="text-xs opacity-70">{isUk ? featured.readTimeUk : featured.readTime} {isUk ? "читання" : "read"}</span>
          <button className="ml-auto text-sm font-semibold bg-white/20 hover:bg-white/30 transition-colors px-4 py-1.5 rounded-full">
            {isUk ? "Читати →" : "Read →"}
          </button>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          value={search} onChange={(e) => setSearch(e.target.value)}
          type="search" placeholder={isUk ? "Пошук статей..." : "Search articles..."}
          className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-indigo-400 focus:outline-none text-sm"
        />
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <button key={c} onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${category === c ? "bg-indigo-600 text-white" : "bg-neutral-100 text-neutral-600 hover:bg-indigo-50"}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Articles grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((p) => (
          <article key={p.id} className="bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer group">
            <div className={`h-24 bg-gradient-to-br ${p.img}`} />
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-indigo-600">{isUk ? p.categoryUk : p.category}</span>
                <span className="text-neutral-300 text-xs">·</span>
                <span className="text-xs text-neutral-400">{isUk ? p.readTimeUk : p.readTime} {isUk ? "читання" : "read"}</span>
                <span className="text-xs text-neutral-400 ml-auto">👁 {p.views}</span>
              </div>
              <h3 className="font-semibold text-neutral-900 text-sm leading-snug mb-2 group-hover:text-indigo-700 transition-colors">
                {isUk ? p.titleUk : p.title}
              </h3>
              <p className="text-xs text-neutral-500 line-clamp-2">{isUk ? p.excerptUk : p.excerpt}</p>
              <p className="text-xs text-neutral-400 mt-3">{isUk ? p.dateUk : p.date}</p>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-neutral-400 py-12">{isUk ? "Статей не знайдено" : "No articles found"}</p>
      )}
    </div>
  );
}

const LIFESTYLE_POSTS = [
  { id: 1, tag: "Beauty", tagUk: "Краса", title: "10 Products I've Repurchased 3+ Times", titleUk: "10 продуктів, які я купую вже більше 3 разів", date: "Mar 20, 2026", dateUk: "20 бер. 2026", img: "from-rose-300 to-pink-400", likes: 284, saved: 91 },
  { id: 2, tag: "Skincare", tagUk: "Догляд за шкірою", title: "My Morning Routine: 5 Steps, 15 Minutes", titleUk: "Мій ранковий ритуал: 5 кроків, 15 хвилин", date: "Mar 15, 2026", dateUk: "15 бер. 2026", img: "from-amber-200 to-rose-300", likes: 512, saved: 167 },
  { id: 3, tag: "Fashion", tagUk: "Мода", title: "Spring Capsule Wardrobe: 12 Pieces", titleUk: "Капсульний гардероб на весну: 12 речей", date: "Mar 10, 2026", dateUk: "10 бер. 2026", img: "from-purple-300 to-pink-300", likes: 398, saved: 215 },
  { id: 4, tag: "Wellness", tagUk: "Здоров'я", title: "What I Learned After 30 Days of Cold Showers", titleUk: "Чого я навчилась за 30 днів контрастного душу", date: "Mar 4, 2026", dateUk: "4 бер. 2026", img: "from-teal-300 to-cyan-400", likes: 176, saved: 43 },
  { id: 5, tag: "Travel", tagUk: "Подорожі", title: "Lviv in Spring: Where to Stay, Eat & Explore", titleUk: "Львів навесні: де зупинитись, їсти та гуляти", date: "Feb 26, 2026", dateUk: "26 лют. 2026", img: "from-orange-300 to-amber-400", likes: 633, saved: 289 },
  { id: 6, tag: "Food", tagUk: "Їжа", title: "Matcha Tiramisu Recipe (No Bake, 4 Ingredients)", titleUk: "Матча тірамісу (без випічки, 4 інгредієнти)", date: "Feb 18, 2026", dateUk: "18 лют. 2026", img: "from-green-300 to-emerald-400", likes: 847, saved: 412 },
];

function LifestyleBlog({ isUk }: { isUk: boolean }) {
  const [liked, setLiked] = useState<number[]>([]);
  const [saved, setSaved] = useState<number[]>([]);

  const toggleLike = (id: number) =>
    setLiked((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
  const toggleSave = (id: number) =>
    setSaved((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-2">
        {isUk ? "Блог — Лайфстайл / Б'юті" : "Blog — Lifestyle / Beauty"}
      </h2>
      <p className="text-neutral-500 text-sm mb-8">
        {isUk ? "Pinterest-стиль, лайки та збереження, теги категорій, підписка." : "Pinterest-style layout, likes & saves, category tags, newsletter subscribe."}
      </p>

      {/* Newsletter banner */}
      <div className="bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1">
          <p className="font-semibold text-neutral-900 mb-0.5">
            {isUk ? "💌 Отримуй нові пости першою" : "💌 Get new posts first"}
          </p>
          <p className="text-sm text-neutral-500">
            {isUk ? "Щотижневий дайджест без спаму" : "Weekly digest, no spam"}
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <input type="email" placeholder="email@..." className="px-3 py-2 rounded-xl border border-rose-200 text-sm focus:outline-none focus:border-rose-400 w-40" />
          <button className="px-4 py-2 rounded-xl bg-rose-500 text-white text-sm font-semibold hover:bg-rose-600 transition-colors whitespace-nowrap">
            {isUk ? "Підписатись" : "Subscribe"}
          </button>
        </div>
      </div>

      {/* Posts grid — masonry-like */}
      <div className="columns-1 sm:columns-2 gap-4 space-y-4">
        {LIFESTYLE_POSTS.map((p) => (
          <article key={p.id} className="break-inside-avoid bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-md transition-all cursor-pointer">
            <div className={`bg-gradient-to-br ${p.img} ${p.id % 3 === 0 ? "h-40" : "h-28"}`} />
            <div className="p-4">
              <span className="text-xs font-semibold text-rose-500 mb-2 block">{isUk ? p.tagUk : p.tag}</span>
              <h3 className="font-semibold text-neutral-900 text-sm leading-snug mb-3">
                {isUk ? p.titleUk : p.title}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400">{isUk ? p.dateUk : p.date}</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => toggleLike(p.id)} className="flex items-center gap-1 text-xs text-neutral-500 hover:text-rose-500 transition-colors">
                    <span>{liked.includes(p.id) ? "❤️" : "🤍"}</span>
                    <span>{p.likes + (liked.includes(p.id) ? 1 : 0)}</span>
                  </button>
                  <button onClick={() => toggleSave(p.id)} className="flex items-center gap-1 text-xs text-neutral-500 hover:text-amber-500 transition-colors">
                    <span>{saved.includes(p.id) ? "🔖" : "📑"}</span>
                    <span>{p.saved + (saved.includes(p.id) ? 1 : 0)}</span>
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function BlogDemo({ variant, isUk }: Props) {
  if (variant === "lifestyle-blog") return <LifestyleBlog isUk={isUk} />;
  return <TechBlog isUk={isUk} />;
}
