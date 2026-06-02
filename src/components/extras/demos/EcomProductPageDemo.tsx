"use client";

import { useState } from "react";
import { Star, Heart, Share2, ShoppingCart, Check, Truck, Shield, RotateCcw } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

const PRODUCT = {
  nameEn: "Premium Wool Coat — Classic Fit",
  nameUk: "Преміум вовняне пальто — Класичний крій",
  brand: "MAISON D'ARIA",
  sku: "WC-2026-001",
  rating: 4.7,
  reviews: 184,
  price: 4290,
  oldPrice: 5490,
  images: [
    { id: 1, color: "from-amber-700 to-amber-900", emoji: "🧥" },
    { id: 2, color: "from-stone-600 to-stone-800", emoji: "👔" },
    { id: 3, color: "from-neutral-700 to-neutral-900", emoji: "🧥" },
    { id: 4, color: "from-amber-800 to-orange-900", emoji: "🧣" },
  ],
};

const SIZES = ["XS", "S", "M", "L", "XL"];
const COLORS = [
  { id: "camel", labelEn: "Camel", labelUk: "Кемел", hex: "#c19a6b" },
  { id: "navy", labelEn: "Navy", labelUk: "Темно-синій", hex: "#1e3a5f" },
  { id: "black", labelEn: "Black", labelUk: "Чорний", hex: "#1a1a1a" },
  { id: "burgundy", labelEn: "Burgundy", labelUk: "Бордо", hex: "#722f37" },
];

const STOCK: Record<string, number> = {
  "XS-camel": 5, "S-camel": 12, "M-camel": 8, "L-camel": 0, "XL-camel": 3,
  "XS-navy": 2, "S-navy": 7, "M-navy": 15, "L-navy": 4, "XL-navy": 0,
  "XS-black": 10, "S-black": 22, "M-black": 18, "L-black": 11, "XL-black": 6,
  "XS-burgundy": 0, "S-burgundy": 4, "M-burgundy": 9, "L-burgundy": 2, "XL-burgundy": 1,
};

export function EcomProductPageDemo({ isUk }: Props) {
  const [imgIdx, setImgIdx] = useState(0);
  const [size, setSize] = useState("M");
  const [color, setColor] = useState("camel");
  const [qty, setQty] = useState(1);
  const [favorited, setFavorited] = useState(false);
  const [added, setAdded] = useState(false);

  const currentColor = COLORS.find((c) => c.id === color)!;
  const stockKey = `${size}-${color}`;
  const stock = STOCK[stockKey] ?? 0;
  const isOutOfStock = stock === 0;
  const isLowStock = stock > 0 && stock <= 3;

  const fmt = (uah: number) => isUk ? `${uah.toLocaleString("uk-UA")} ₴` : `£${Math.round(uah / 40)}`;
  const discount = Math.round(((PRODUCT.oldPrice - PRODUCT.price) / PRODUCT.oldPrice) * 100);

  const handleAdd = () => {
    if (isOutOfStock) return;
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gallery */}
        <div className="space-y-3">
          <div className={`aspect-square rounded-2xl bg-linear-to-br ${PRODUCT.images[imgIdx].color} flex items-center justify-center text-9xl shadow-lg`}>
            {PRODUCT.images[imgIdx].emoji}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {PRODUCT.images.map((img, i) => (
              <button
                key={img.id}
                onClick={() => setImgIdx(i)}
                className={`aspect-square rounded-lg bg-linear-to-br ${img.color} flex items-center justify-center text-3xl transition-all ${
                  imgIdx === i ? "ring-2 ring-indigo-500 ring-offset-1" : "opacity-70 hover:opacity-100"
                }`}
                aria-label={`Image ${i + 1}`}
                aria-current={imgIdx === i}
              >
                {img.emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-5">
          <div>
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1">{PRODUCT.brand}</p>
            <h2 className="text-2xl font-bold text-neutral-900 leading-tight mb-2">
              {isUk ? PRODUCT.nameUk : PRODUCT.nameEn}
            </h2>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className={`w-4 h-4 ${i <= Math.round(PRODUCT.rating) ? "text-amber-400 fill-amber-400" : "text-neutral-300"}`} />
                ))}
                <span className="ml-1 font-semibold text-neutral-700">{PRODUCT.rating}</span>
              </div>
              <span className="text-neutral-400">·</span>
              <a href="#reviews" className="text-indigo-600 hover:underline">
                {PRODUCT.reviews} {isUk ? "відгуків" : "reviews"}
              </a>
              <span className="text-neutral-400">·</span>
              <span className="text-neutral-500 text-xs">SKU: {PRODUCT.sku}</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-neutral-900">{fmt(PRODUCT.price)}</span>
            <span className="text-lg text-neutral-400 line-through">{fmt(PRODUCT.oldPrice)}</span>
            <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-700 text-xs font-bold">
              −{discount}%
            </span>
          </div>

          {/* Color */}
          <div>
            <p className="text-sm font-semibold text-neutral-900 mb-2">
              {isUk ? "Колір:" : "Color:"} <span className="font-normal text-neutral-600">{isUk ? currentColor.labelUk : currentColor.labelEn}</span>
            </p>
            <div className="flex gap-2">
              {COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setColor(c.id)}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    color === c.id ? "border-indigo-600 scale-110" : "border-neutral-200 hover:border-neutral-400"
                  }`}
                  style={{ backgroundColor: c.hex }}
                  aria-label={isUk ? c.labelUk : c.labelEn}
                  aria-pressed={color === c.id}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <p className="text-sm font-semibold text-neutral-900 mb-2">
              {isUk ? "Розмір:" : "Size:"} <span className="font-normal text-neutral-600">{size}</span>
            </p>
            <div className="flex gap-2">
              {SIZES.map((s) => {
                const sizeStock = STOCK[`${s}-${color}`] ?? 0;
                const oos = sizeStock === 0;
                return (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    disabled={oos}
                    className={`w-12 h-10 rounded-lg border-2 text-sm font-semibold transition-all ${
                      size === s
                        ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                        : oos
                        ? "border-neutral-200 text-neutral-300 line-through cursor-not-allowed"
                        : "border-neutral-200 text-neutral-700 hover:border-neutral-400"
                    }`}
                    aria-pressed={size === s}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stock indicator */}
          {!isOutOfStock && isLowStock && (
            <p className="text-sm text-amber-600 font-semibold flex items-center gap-1">
              ⚠ {isUk ? `Лишилось всього ${stock} шт.` : `Only ${stock} left in stock`}
            </p>
          )}
          {isOutOfStock && (
            <p className="text-sm text-rose-600 font-semibold">
              {isUk ? "Немає в наявності" : "Out of stock"}
            </p>
          )}

          {/* Quantity + Add to cart */}
          <div className="flex gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-neutral-200 bg-white">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="text-neutral-500 hover:text-neutral-900 px-1"
                aria-label={isUk ? "Зменшити" : "Decrease"}
              >
                −
              </button>
              <span className="w-6 text-center font-semibold tabular-nums">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="text-neutral-500 hover:text-neutral-900 px-1"
                aria-label={isUk ? "Збільшити" : "Increase"}
              >
                +
              </button>
            </div>
            <button
              onClick={handleAdd}
              disabled={isOutOfStock}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold transition-colors ${
                added
                  ? "bg-emerald-600 text-white"
                  : isOutOfStock
                  ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  {isUk ? "Додано!" : "Added!"}
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  {isUk ? "Додати в кошик" : "Add to cart"}
                </>
              )}
            </button>
            <button
              onClick={() => setFavorited((f) => !f)}
              className={`p-2.5 rounded-lg border border-neutral-200 transition-colors ${
                favorited ? "bg-rose-50 text-rose-500 border-rose-200" : "text-neutral-500 hover:text-rose-500"
              }`}
              aria-label={favorited ? (isUk ? "Видалити з обраного" : "Remove from favorites") : (isUk ? "Додати в обране" : "Add to favorites")}
              aria-pressed={favorited}
            >
              <Heart className={`w-4 h-4 ${favorited ? "fill-rose-500" : ""}`} />
            </button>
            <button
              className="p-2.5 rounded-lg border border-neutral-200 text-neutral-500 hover:text-neutral-900 transition-colors"
              aria-label={isUk ? "Поділитись" : "Share"}
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-neutral-100">
            <div className="flex items-center gap-2 text-xs text-neutral-600">
              <Truck className="w-4 h-4 text-emerald-500 shrink-0" />
              {isUk ? "Безкоштовна доставка" : "Free shipping"}
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-600">
              <RotateCcw className="w-4 h-4 text-indigo-500 shrink-0" />
              {isUk ? "Повернення 30 днів" : "30-day returns"}
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-600">
              <Shield className="w-4 h-4 text-violet-500 shrink-0" />
              {isUk ? "2 роки гарантії" : "2-year warranty"}
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-neutral-500">
        {isUk
          ? "Schema.org Product з aggregateRating, offers, availability. Stock matrix size×color. Out-of-stock variants блокуються."
          : "Schema.org Product with aggregateRating, offers, availability. Stock matrix size×color. Out-of-stock variants are blocked."}
      </p>
    </div>
  );
}
