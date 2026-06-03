"use client";
import { useState } from "react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

const SAMPLES = [
  { id: "floral",   label: "Floral midi dress",  emoji: "🌸", bg: "from-pink-100 to-rose-100 dark:from-pink-900/20 dark:to-rose-900/20" },
  { id: "jacket",   label: "Leather jacket",      emoji: "🧥", bg: "from-slate-200 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700" },
  { id: "sneakers", label: "White sneakers",       emoji: "👟", bg: "from-sky-50 to-blue-100 dark:from-sky-900/20 dark:to-blue-900/20" },
];

const RESULTS: Record<string, { id: number; name: string; brand: string; price: number; sim: number; cat: string; emoji: string; bg: string }[]> = {
  floral: [
    { id: 1, name: "Floral Wrap Midi Dress",     brand: "& Other Stories", price: 95,  sim: 98, cat: "Dresses",  emoji: "🌸", bg: "from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20"    },
    { id: 2, name: "Botanical Print Maxi",        brand: "Free People",     price: 148, sim: 94, cat: "Dresses",  emoji: "🌺", bg: "from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20"     },
    { id: 3, name: "Rose Garden Slip Dress",      brand: "ASOS Design",     price: 45,  sim: 89, cat: "Dresses",  emoji: "🌹", bg: "from-rose-50 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/30"  },
    { id: 4, name: "Daisy Print Midi Skirt",      brand: "Topshop",         price: 38,  sim: 82, cat: "Skirts",   emoji: "🌼", bg: "from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20" },
    { id: 5, name: "Wildflower Blouse",           brand: "Zara",            price: 35,  sim: 79, cat: "Tops",     emoji: "💐", bg: "from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20" },
    { id: 6, name: "Liberty Print Tea Dress",     brand: "Boden",           price: 120, sim: 76, cat: "Dresses",  emoji: "🌷", bg: "from-fuchsia-50 to-pink-50 dark:from-fuchsia-900/20 dark:to-pink-900/20" },
  ],
  jacket: [
    { id: 1, name: "Oversized Moto Jacket",       brand: "AllSaints",       price: 298, sim: 97, cat: "Jackets",  emoji: "🖤", bg: "from-neutral-100 to-slate-200 dark:from-neutral-800 dark:to-neutral-700" },
    { id: 2, name: "Cropped Biker Jacket",         brand: "Zara",            price: 89,  sim: 92, cat: "Jackets",  emoji: "🧥", bg: "from-stone-100 to-neutral-200 dark:from-stone-800 dark:to-neutral-700"  },
    { id: 3, name: "Faux Leather Blazer",          brand: "H&M",             price: 55,  sim: 85, cat: "Jackets",  emoji: "⚫", bg: "from-zinc-100 to-slate-200 dark:from-zinc-800 dark:to-slate-700"       },
    { id: 4, name: "Belted Leather Trench",        brand: "COS",             price: 350, sim: 80, cat: "Coats",    emoji: "🪡", bg: "from-brown-50 to-stone-100 dark:from-neutral-800 dark:to-stone-800"    },
    { id: 5, name: "Studded Moto Jacket",          brand: "Topshop",         price: 99,  sim: 74, cat: "Jackets",  emoji: "🔩", bg: "from-gray-100 to-neutral-200 dark:from-gray-800 dark:to-neutral-700"   },
    { id: 6, name: "Puffer Leather Vest",          brand: "ASOS",            price: 65,  sim: 69, cat: "Vests",    emoji: "🫧", bg: "from-slate-50 to-gray-100 dark:from-slate-800 dark:to-gray-800"        },
  ],
  sneakers: [
    { id: 1, name: "Air Force 1 Low White",       brand: "Nike",            price: 90,  sim: 99, cat: "Trainers", emoji: "👟", bg: "from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20"      },
    { id: 2, name: "Stan Smith Original",          brand: "Adidas",          price: 85,  sim: 94, cat: "Trainers", emoji: "🟢", bg: "from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20" },
    { id: 3, name: "Clean 90 Leather",             brand: "New Balance",     price: 75,  sim: 88, cat: "Trainers", emoji: "🔵", bg: "from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20"       },
    { id: 4, name: "Sk8-Hi Platform White",        brand: "Vans",            price: 80,  sim: 82, cat: "Trainers", emoji: "⬜", bg: "from-slate-50 to-gray-50 dark:from-slate-800 dark:to-gray-800"         },
    { id: 5, name: "Gazelle Bold",                 brand: "Adidas",          price: 110, sim: 78, cat: "Trainers", emoji: "🟡", bg: "from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20" },
    { id: 6, name: "Court Vision Low",             brand: "Nike",            price: 70,  sim: 74, cat: "Trainers", emoji: "⚪", bg: "from-neutral-50 to-gray-50 dark:from-neutral-800 dark:to-gray-800"     },
  ],
};

export function VisualFindDemo({ lang }: { lang: string }) {
  const [activeImg, setActiveImg]   = useState<string | null>(null);
  const [searching, setSearching]   = useState(false);
  const [results,   setResults]     = useState<(typeof RESULTS)["floral"] | null>(null);
  const [wishlist,  setWishlist]    = useState<Set<number>>(new Set());
  const [addedCart, setAddedCart]   = useState<Set<number>>(new Set());
  const isUk = lang === "uk";

  const doSearch = (id: string) => {
    setActiveImg(id);
    setSearching(true);
    setResults(null);
    setTimeout(() => {
      setSearching(false);
      setResults(RESULTS[id]);
    }, 1100);
  };

  const toggleWish  = (id: number) => setWishlist(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const addToCart   = (id: number) => setAddedCart(p => new Set([...p, id]));

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 font-sans text-neutral-900 dark:text-white">

      {/* ── HEADER ── */}
      <header className="h-14 bg-white dark:bg-neutral-900 border-b border-pink-100 dark:border-neutral-800 flex items-center px-5 gap-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-pink-600 flex items-center justify-center text-white text-[11px] font-black">VF</div>
          <span className="font-black text-lg tracking-tight">VisualFind</span>
          <span className="text-pink-500 text-xs font-semibold">AI Visual Search</span>
        </div>
        <div className="flex-1" />
        <div className="text-xs text-neutral-400 dark:text-neutral-500">
          {isUk ? "40,000+ SKU · OpenAI CLIP + Qdrant" : "40,000+ SKUs · OpenAI CLIP + Qdrant"}
        </div>
      </header>

      <div className="max-w-5xl mx-auto p-5 space-y-6">

        {/* KPIs */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: isUk ? "Конверсія пошуку ↑" : "Search conversion ↑", value: "+89%", color: "text-pink-600" },
            { label: isUk ? "«Не знайдено» ↓"    : '"Not found" rate ↓',  value: "−71%", color: "text-emerald-600" },
            { label: isUk ? "Середній чек ↑"     : "Avg basket ↑",        value: "+27%", color: "text-violet-600" },
          ].map(k => (
            <div key={k.label} className="bg-white dark:bg-neutral-900 rounded-2xl border border-pink-100 dark:border-neutral-800 p-5 text-center">
              <div className={`text-3xl font-black ${k.color}`}>{k.value}</div>
              <div className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">{k.label}</div>
            </div>
          ))}
        </div>

        {/* Upload area */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border-2 border-dashed border-pink-200 dark:border-pink-800/30 p-8 text-center">
          <div className="text-4xl mb-3">📸</div>
          <div className="font-bold text-lg text-neutral-700 dark:text-neutral-200 mb-1">
            {isUk ? "Завантажте фото або оберіть приклад" : "Upload a photo or choose a sample"}
          </div>
          <div className="text-sm text-neutral-400 dark:text-neutral-500 mb-5">
            {isUk ? "AI знайде схожі товари за мілісекунди" : "AI finds similar products in milliseconds"}
          </div>
          <div className="flex gap-3 justify-center flex-wrap">
            {SAMPLES.map(s => (
              <button
                key={s.id}
                onClick={() => doSearch(s.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                  activeImg === s.id
                    ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-400"
                    : "border-slate-200 dark:border-neutral-700 hover:border-pink-300 dark:hover:border-pink-700 text-neutral-600 dark:text-neutral-400"
                }`}
              >
                <EmojiIcon emoji={s.emoji} className="w-5 h-5" />
                {s.label}
              </button>
            ))}
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-slate-300 dark:border-neutral-600 text-sm text-neutral-400 hover:border-pink-300 dark:hover:border-pink-700 transition-colors">
              + {isUk ? "Завантажити" : "Upload"}
            </button>
          </div>
        </div>

        {/* Searching spinner */}
        {searching && (
          <div className="text-center py-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-400 font-semibold">
              <EmojiIcon emoji="⚙️" className="w-5 h-5 animate-spin" />
              {isUk
                ? "CLIP embedding · Qdrant vector search · 0.08с"
                : "CLIP embedding · Qdrant vector search · 0.08s"}
            </div>
          </div>
        )}

        {/* Results */}
        {results && (
          <div>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <h2 className="font-bold text-lg">
                {results.length} {isUk ? "схожих товарів" : "similar products found"}
                <span className="text-neutral-400 dark:text-neutral-500 font-normal text-sm ml-2">
                  · {isUk ? "за схожістю ↓" : "sorted by similarity ↓"}
                </span>
              </h2>
              {wishlist.size > 0 && (
                <span className="text-sm text-pink-600 dark:text-pink-400 font-semibold">
                  ♥ {wishlist.size} {isUk ? "у списку бажань" : "in wishlist"}
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {results.map(r => (
                <div key={r.id} className="bg-white dark:bg-neutral-900 rounded-2xl border border-pink-100 dark:border-neutral-800 overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Image */}
                  <div className={`aspect-square bg-linear-to-br ${r.bg} flex items-center justify-center relative`}>
                    <EmojiIcon emoji={r.emoji} className="w-16 h-16" />
                    <button
                      onClick={() => toggleWish(r.id)}
                      className={`absolute top-3 right-3 text-xl transition-transform hover:scale-110 ${wishlist.has(r.id) ? "text-pink-500" : "text-neutral-300 dark:text-neutral-600"}`}
                    >
                      ♥
                    </button>
                    <div className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      r.sim >= 90 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400" :
                      r.sim >= 80 ? "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400" :
                                    "bg-white/80 dark:bg-neutral-900/80 text-neutral-600"
                    }`}>
                      {r.sim}% {isUk ? "збіг" : "match"}
                    </div>
                  </div>
                  {/* Info */}
                  <div className="p-4">
                    <div className="font-semibold text-sm text-neutral-900 dark:text-white leading-tight mb-0.5">{r.name}</div>
                    <div className="text-xs text-neutral-400 dark:text-neutral-500 mb-2">{r.brand} · {r.cat}</div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-black text-pink-600 text-lg">£{r.price}</span>
                    </div>
                    {addedCart.has(r.id) ? (
                      <div className="w-full py-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold text-center">
                        ✓ {isUk ? "Додано в кошик" : "Added to bag"}
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(r.id)}
                        className="w-full py-2 rounded-xl bg-pink-600 text-white text-xs font-semibold hover:bg-pink-700 transition-colors"
                      >
                        {isUk ? "Додати в кошик" : "Add to Bag"}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* How it works (empty state) */}
        {!results && !searching && (
          <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-pink-100 dark:border-neutral-800 p-6">
            <h3 className="font-bold text-neutral-900 dark:text-white mb-4">{isUk ? "Як це працює" : "How it works"}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { step: "1", icon: "📸", title: isUk ? "Завантаж фото" : "Upload photo",     desc: isUk ? "Будь-яке фото товару або скриншот" : "Any product photo or screenshot" },
                { step: "2", icon: "🧠", title: isUk ? "CLIP аналізує" : "CLIP encodes",      desc: isUk ? "OpenAI CLIP → 512-вимірний вектор" : "OpenAI CLIP → 512-dimensional vector" },
                { step: "3", icon: "⚡", title: isUk ? "Миттєво"       : "Instant results",  desc: isUk ? "Qdrant знаходить схожі за 80мс" : "Qdrant vector DB returns matches in 80ms" },
              ].map(s => (
                <div key={s.step} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/20 flex items-center justify-center text-pink-600 dark:text-pink-400 font-black text-sm shrink-0">{s.step}</div>
                  <div>
                    <div className="mb-1"><EmojiIcon emoji={s.icon} className="w-5 h-5" /></div>
                    <div className="font-semibold text-sm text-neutral-900 dark:text-white">{s.title}</div>
                    <div className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-pink-50 dark:border-neutral-800 flex flex-wrap gap-1.5">
              {["Python", "OpenAI CLIP", "Qdrant", "FastAPI", "PostgreSQL", "Redis", "Next.js"].map(t => (
                <span key={t} className="px-2 py-0.5 rounded-md text-[10px] bg-pink-50 dark:bg-neutral-800 text-pink-600 dark:text-neutral-400 font-medium">{t}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
