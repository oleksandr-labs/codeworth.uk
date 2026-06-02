"use client";

import { useEffect, useState } from "react";
import { Clock, Flame, Zap, ShoppingCart } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

const ITEMS = [
  { id: "i1", nameEn: "Pro DSLR Camera", nameUk: "Pro DSLR камера", original: 28000, sale: 18900, sold: 124, stock: 350, color: "from-slate-700 to-slate-900", emoji: "📷" },
  { id: "i2", nameEn: "Wireless Headphones", nameUk: "Бездротові навушники", original: 5200, sale: 2890, sold: 287, stock: 400, color: "from-indigo-600 to-violet-700", emoji: "🎧" },
  { id: "i3", nameEn: "Smart Watch Series 8", nameUk: "Smart Watch Series 8", original: 12500, sale: 8990, sold: 89, stock: 200, color: "from-rose-500 to-pink-600", emoji: "⌚" },
  { id: "i4", nameEn: "Gaming Keyboard RGB", nameUk: "Ігрова клавіатура RGB", original: 3800, sale: 2190, sold: 412, stock: 500, color: "from-emerald-600 to-teal-700", emoji: "⌨️" },
];

function getEndTime() {
  const d = new Date();
  d.setHours(d.getHours() + 6, 23, 45, 0);
  return d.getTime();
}

export function EcomFlashSaleDemo({ isUk }: Props) {
  const [endTime] = useState(getEndTime);
  const [now, setNow] = useState(Date.now());
  const [cart, setCart] = useState<Set<string>>(new Set());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, endTime - now);
  const totalSec = Math.floor(diff / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");

  const fmt = (uah: number) => isUk ? `${uah.toLocaleString("uk-UA")} ₴` : `£${Math.round(uah / 40)}`;

  const addToCart = (id: string) => {
    setCart((c) => {
      const next = new Set(c);
      next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {/* Hero countdown banner */}
      <div className="relative rounded-2xl bg-linear-to-r from-rose-600 via-red-600 to-orange-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-yellow-400/30 via-transparent to-transparent" />
        <div className="relative p-6 flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Flame className="w-7 h-7 animate-pulse" />
            </div>
            <div>
              <p className="text-xs text-white/80 uppercase tracking-widest font-bold">
                {isUk ? "Flash-розпродаж" : "Flash Sale"}
              </p>
              <h2 className="text-2xl font-extrabold">
                {isUk ? "До −70% знижки" : "Up to −70% off"}
              </h2>
            </div>
          </div>
          <div className="md:ml-auto flex items-center gap-3">
            <Clock className="w-5 h-5" />
            <div className="flex items-center gap-1.5">
              {[
                { v: h, l: isUk ? "год" : "h" },
                { v: m, l: isUk ? "хв" : "m" },
                { v: s, l: isUk ? "сек" : "s" },
              ].map((t, i) => (
                <div key={i} className="bg-white/15 backdrop-blur-sm rounded-lg px-3 py-1.5 min-w-[60px] text-center">
                  <div className="text-xl font-bold tabular-nums leading-none">{pad(t.v)}</div>
                  <div className="text-[10px] text-white/70 uppercase">{t.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Items grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ITEMS.map((item) => {
          const discount = Math.round(((item.original - item.sale) / item.original) * 100);
          const stockPct = (item.sold / item.stock) * 100;
          const inCart = cart.has(item.id);
          return (
            <div key={item.id} className="rounded-xl border border-neutral-200 bg-white overflow-hidden hover:shadow-md transition-shadow">
              <div className={`relative aspect-video bg-linear-to-br ${item.color} flex items-center justify-center text-6xl`}>
                {item.emoji}
                <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-rose-500 text-white text-xs font-bold flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-white" />
                  −{discount}%
                </div>
              </div>
              <div className="p-4 space-y-3">
                <h3 className="font-semibold text-neutral-900">{isUk ? item.nameUk : item.nameEn}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-rose-600">{fmt(item.sale)}</span>
                  <span className="text-sm text-neutral-400 line-through">{fmt(item.original)}</span>
                </div>

                {/* Stock progress */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-neutral-500">
                      {isUk ? `Продано ${item.sold} з ${item.stock}` : `Sold ${item.sold} of ${item.stock}`}
                    </span>
                    <span className={`font-semibold tabular-nums ${stockPct > 70 ? "text-rose-600" : "text-amber-600"}`}>
                      {stockPct > 70 ? (isUk ? "Майже зник!" : "Almost gone!") : `${Math.round(stockPct)}%`}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-neutral-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${stockPct > 70 ? "bg-rose-500" : "bg-amber-500"}`}
                      style={{ width: `${stockPct}%` }}
                      role="progressbar"
                      aria-valuenow={stockPct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${item.sold} sold of ${item.stock}`}
                    />
                  </div>
                </div>

                <button
                  onClick={() => addToCart(item.id)}
                  disabled={inCart}
                  className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    inCart
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-rose-600 text-white hover:bg-rose-700"
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {inCart ? (isUk ? "✓ Додано" : "✓ Added") : (isUk ? "Купити зараз" : "Buy now")}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-sm text-neutral-500">
        {isUk
          ? "Flash-розпродажі тригерять FOMO: time pressure + stock pressure. Звичайно +35-50% конверсії проти стандартних акцій."
          : "Flash sales trigger FOMO: time pressure + stock pressure. Typically +35-50% conversion vs regular promos."}
      </p>
    </div>
  );
}
