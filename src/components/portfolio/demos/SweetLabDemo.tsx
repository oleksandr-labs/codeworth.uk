"use client";

import { useState, useEffect } from "react";

const COLLECTION = [
  { id: 1, nameUk: "Тарт лимонний з меренгою", nameEn: "Tarte Citron Meringuée", emoji: "🍋", price: 345, remaining: 3, soldOut: false },
  { id: 2, nameUk: "Валуа шоколадний", nameEn: "Valois Chocolate", emoji: "🍫", price: 420, remaining: 1, soldOut: false, hot: true },
  { id: 3, nameUk: "Фрезьє класичний", nameEn: "Fraisier Classique", emoji: "🍓", price: 380, remaining: 5, soldOut: false },
  { id: 4, nameUk: "Паризь-Брест", nameEn: "Paris-Brest", emoji: "🥐", price: 295, remaining: 0, soldOut: true },
  { id: 5, nameUk: "Еклер фісташковий", nameEn: "Eclair Pistache", emoji: "💚", price: 260, remaining: 2, soldOut: false },
  { id: 6, nameUk: "Мон-Блан", nameEn: "Mont Blanc", emoji: "🌰", price: 390, remaining: 4, soldOut: false },
];

const PRODUCTS = [
  { id: 1, cat: "pastries", nameUk: "Мільфой ванільний", nameEn: "Vanilla Mille-Feuille", emoji: "🥮", price: 180, glutenFree: false, vegan: false, lactoseFree: false, seasonal: false },
  { id: 2, cat: "pastries", nameUk: "Шу з кремом", nameEn: "Cream Choux", emoji: "🫧", price: 95, glutenFree: false, vegan: false, lactoseFree: false, seasonal: false },
  { id: 3, cat: "cakes", nameUk: "Торт «Опера»", nameEn: "Opéra Cake", emoji: "🎭", price: 980, glutenFree: false, vegan: false, lactoseFree: false, seasonal: false },
  { id: 4, cat: "cakes", nameUk: "Торт Raffaello", nameEn: "Raffaello Cake", emoji: "🤍", price: 850, glutenFree: false, vegan: false, lactoseFree: false, seasonal: false },
  { id: 5, cat: "macarons", nameUk: "Макарони (6 шт)", nameEn: "Macarons (set of 6)", emoji: "🌈", price: 240, glutenFree: true, vegan: false, lactoseFree: false, seasonal: false },
  { id: 6, cat: "tarts", nameUk: "Тарт малиновий", nameEn: "Raspberry Tart", emoji: "🍓", price: 320, glutenFree: false, vegan: false, lactoseFree: false, seasonal: false },
  { id: 7, cat: "choux", nameUk: "Еклер шоколадний", nameEn: "Chocolate Eclair", emoji: "🍫", price: 85, glutenFree: false, vegan: false, lactoseFree: false, seasonal: false },
  { id: 8, cat: "chocolate", nameUk: "Трюфелі (9 шт)", nameEn: "Truffles (9 pcs)", emoji: "🍬", price: 380, glutenFree: true, vegan: true, lactoseFree: true, seasonal: false },
  { id: 9, cat: "pastries", nameUk: "Фінансьє фісташка", nameEn: "Pistachio Financier", emoji: "💚", price: 75, glutenFree: false, vegan: false, lactoseFree: false, seasonal: false },
  { id: 10, cat: "cakes", nameUk: "Торт «Зима»", nameEn: "Winter Cake", emoji: "❄️", price: 1100, glutenFree: false, vegan: false, lactoseFree: false, seasonal: true },
  { id: 11, cat: "tarts", nameUk: "Тарт яблучний з карамеллю", nameEn: "Apple Caramel Tart", emoji: "🍎", price: 295, glutenFree: false, vegan: true, lactoseFree: true, seasonal: true },
  { id: 12, cat: "macarons", nameUk: "Макарони сезонні", nameEn: "Seasonal Macarons", emoji: "🌸", price: 280, glutenFree: true, vegan: false, lactoseFree: false, seasonal: true },
];

const CATEGORIES = [
  { key: "all", en: "All", uk: "Всі" },
  { key: "pastries", en: "Pastries", uk: "Тістечка" },
  { key: "cakes", en: "Cakes", uk: "Торти" },
  { key: "choux", en: "Choux", uk: "Шу" },
  { key: "tarts", en: "Tarts", uk: "Тарти" },
  { key: "macarons", en: "Macarons", uk: "Макарони" },
  { key: "chocolate", en: "Chocolate", uk: "Шоколад" },
];

const FILTERS = [
  { key: "glutenFree", en: "Gluten-free", uk: "Без глютену" },
  { key: "vegan", en: "Vegan", uk: "Веганське" },
  { key: "lactoseFree", en: "Lactose-free", uk: "Без лактози" },
  { key: "seasonal", en: "Seasonal", uk: "Сезонне" },
];

const SIZES = [
  { portions: 6, price: 380, label: "6 portions / 6 порцій" },
  { portions: 8, price: 520, label: "8 portions / 8 порцій" },
  { portions: 10, price: 680, label: "10 portions / 10 порцій" },
  { portions: 12, price: 920, label: "12 portions / 12 порцій" },
];

const FILLINGS = [
  { key: "choc", en: "Chocolate ganache", uk: "Шоколадний ганаш", extra: 0 },
  { key: "rasp", en: "Raspberry mousse", uk: "Малиновий мус", extra: 60 },
  { key: "pist", en: "Pistachio cream", uk: "Фісташковий крем", extra: 80 },
  { key: "van", en: "Vanilla custard", uk: "Ванільний крем", extra: 0 },
  { key: "coff", en: "Coffee & caramel", uk: "Кава та карамель", extra: 40 },
  { key: "lem", en: "Lemon curd", uk: "Лимонний курд", extra: 50 },
];

const COATINGS = [
  { key: "mirror", en: "Mirror glaze", uk: "Дзеркальна глазур", extra: 120 },
  { key: "velvet", en: "Velvet spray", uk: "Велюр", extra: 100 },
  { key: "berries", en: "Fresh berries", uk: "Свіжі ягоди", extra: 80 },
  { key: "ganache", en: "Ganache", uk: "Ганаш", extra: 60 },
];

const DECORS = [
  { key: "none", en: "None", uk: "Без декору" },
  { key: "gold", en: "Gold leaf", uk: "Золоте листя" },
  { key: "flowers", en: "Edible flowers", uk: "Їстівні квіти" },
];

export function SweetLabDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [activeCategory, setActiveCategory] = useState("all");
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());
  const [step, setStep] = useState(1);
  const [cakeSize, setCakeSize] = useState<number | null>(null);
  const [cakeFilling, setCakeFilling] = useState<string | null>(null);
  const [cakeCoating, setCakeCoating] = useState<string | null>(null);
  const [cakeText, setCakeText] = useState("");
  const [cakeDecor, setCakeDecor] = useState("none");
  const [cakeDate, setCakeDate] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(10035);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hh = String(Math.floor(timerSeconds / 3600)).padStart(2, "0");
  const mm = String(Math.floor((timerSeconds % 3600) / 60)).padStart(2, "0");
  const ss = String(timerSeconds % 60).padStart(2, "0");
  const timerStr = `${hh}h ${mm}m ${ss}s`;

  const sizeObj = SIZES.find((s) => s.portions === cakeSize);
  const fillingObj = FILLINGS.find((f) => f.key === cakeFilling);
  const coatingObj = COATINGS.find((c) => c.key === cakeCoating);
  const cakeTotal =
    (sizeObj?.price ?? 0) + (fillingObj?.extra ?? 0) + (coatingObj?.extra ?? 0);

  const toggleFilter = (key: string) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const filteredProducts = PRODUCTS.filter((p) => {
    const catMatch = activeCategory === "all" || p.cat === activeCategory;
    const filterMatch =
      activeFilters.size === 0 ||
      [...activeFilters].every((f) => p[f as keyof typeof p] === true);
    return catMatch && filterMatch;
  });

  const today = new Date();
  const dateOptions = [5, 7, 10].map((offset) => {
    const d = new Date(today);
    d.setDate(d.getDate() + offset);
    return d.toLocaleDateString(isUk ? "uk-UA" : "en-GB", {
      day: "numeric",
      month: "short",
      weekday: "short",
    });
  });

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <span className="text-2xl">⚗️</span>
            <span className="text-xl font-bold tracking-tight text-gray-900">SweetLab</span>
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <a href="#collection" className="hover:text-gray-900 transition-colors">
              {isUk ? "Колекція" : "Collection"}
            </a>
            <a href="#catalog" className="hover:text-gray-900 transition-colors">
              {isUk ? "Каталог" : "Catalog"}
            </a>
            <a href="#cake-order" className="hover:text-gray-900 transition-colors">
              {isUk ? "Замовлення торта" : "Cake Order"}
            </a>
            <a href="#about" className="hover:text-gray-900 transition-colors">
              {isUk ? "Про нас" : "About"}
            </a>
          </div>
          <button
            className="relative flex items-center gap-1 bg-gray-100 hover:bg-gray-200 transition-colors rounded-full px-3 py-1.5 text-sm font-medium"
            onClick={() => setCartCount((c) => Math.max(0, c))}
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-gray-900"
                style={{ backgroundColor: "#C6E03A" }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-400 mb-6 border border-gray-200 rounded-full px-4 py-1.5">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#C6E03A" }}></span>
            {isUk ? "Колекція завершується за..." : "Collection expires in..."}
            <span className="font-bold text-gray-700">{timerStr}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-gray-900 leading-none mb-6">
            {isUk ? "Смак — це наша формула" : "Taste is our formula"}
          </h1>
          <p className="text-lg text-gray-500 mb-10 max-w-xl mx-auto">
            {isUk
              ? "Авторські десерти. Тижнева колекція. Київ."
              : "Signature desserts. Weekly collection. Kyiv."}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <a
              href="#collection"
              className="px-8 py-3.5 rounded-full font-semibold text-gray-900 transition-all hover:opacity-90"
              style={{ backgroundColor: "#C6E03A" }}
            >
              {isUk ? "Поточна колекція" : "Current Collection"}
            </a>
            <a
              href="#cake-order"
              className="px-8 py-3.5 rounded-full font-semibold border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all"
            >
              {isUk ? "Замовити торт" : "Order a Cake"}
            </a>
          </div>

          <div className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 rounded-2xl px-5 py-2.5 border border-gray-200"
            style={{ backgroundColor: "#E8E4F0" }}>
            ⚗️ Science + Art = SweetLab
          </div>
        </div>
      </section>

      {/* WEEKLY COLLECTION */}
      <section id="collection" className="py-20 px-4" style={{ backgroundColor: "#E8E4F0" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">
              {isUk ? "Обмежена серія" : "Limited Series"}
            </p>
            <h2 className="text-4xl font-black text-gray-900">
              {isUk ? "Тижнева колекція" : "Weekly Collection"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COLLECTION.map((item) => (
              <div
                key={item.id}
                className={`bg-white rounded-2xl p-6 border border-gray-100 transition-all ${item.soldOut ? "opacity-50 grayscale" : "hover:-translate-y-1 hover:shadow-lg"}`}
              >
                <div className="text-4xl mb-3">{item.emoji}</div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-gray-900 text-sm leading-tight">
                    {isUk ? item.nameUk : item.nameEn}
                  </h3>
                  {(item as any).hot && !item.soldOut && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full text-gray-900" style={{ backgroundColor: "#C6E03A" }}>
                      HOT
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-4">
                  {item.soldOut ? (
                    <span className="text-xs font-mono bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">
                      {isUk ? "Розпродано" : "Sold Out"}
                    </span>
                  ) : (
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full text-gray-900" style={{ backgroundColor: "#C6E03A" }}>
                      {item.remaining} {isUk ? "залишилось" : "left"}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-mono text-lg font-bold text-gray-900">
                    {item.price}₴
                  </span>
                  {item.soldOut ? (
                    <button className="text-xs border border-gray-300 text-gray-500 rounded-full px-3 py-1.5 hover:border-gray-500 transition-colors">
                      🔔 {isUk ? "Сповістити" : "Notify me"}
                    </button>
                  ) : (
                    <button
                      className="text-xs font-semibold rounded-full px-3 py-1.5 text-gray-900 transition-all hover:opacity-80"
                      style={{ backgroundColor: "#C6E03A" }}
                      onClick={() => setCartCount((c) => c + 1)}
                    >
                      {isUk ? "Додати" : "Add to Cart"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">
              {isUk ? "Повний асортимент" : "Full Range"}
            </p>
            <h2 className="text-4xl font-black text-gray-900">
              {isUk ? "Каталог" : "Catalog"}
            </h2>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeCategory === cat.key
                  ? "text-gray-900 shadow-sm"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                style={activeCategory === cat.key ? { backgroundColor: "#C6E03A" } : {}}
              >
                {isUk ? cat.uk : cat.en}
              </button>
            ))}
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => toggleFilter(f.key)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${activeFilters.has(f.key)
                  ? "border-transparent text-gray-900"
                  : "border-gray-200 text-gray-500 hover:border-gray-400"
                  }`}
                style={activeFilters.has(f.key) ? { backgroundColor: "#C6E03A", borderColor: "#C6E03A" } : {}}
              >
                {isUk ? f.uk : f.en}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className={`bg-white border border-gray-100 rounded-2xl p-5 hover:-translate-y-1 hover:shadow-lg transition-all ${p.cat === "cakes" ? "rotate-1 hover:rotate-0" : ""}`}
              >
                <div className="text-3xl mb-3">{p.emoji}</div>
                <p className="font-bold text-sm text-gray-900 leading-tight mb-1">
                  {isUk ? p.nameUk : p.nameEn}
                </p>
                <p className="font-mono text-base font-bold text-gray-900 mb-3">{p.price}₴</p>
                <div className="flex flex-wrap gap-1">
                  {p.glutenFree && (
                    <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">GF</span>
                  )}
                  {p.vegan && (
                    <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">V</span>
                  )}
                  {p.lactoseFree && (
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">LF</span>
                  )}
                  {p.seasonal && (
                    <span className="text-xs px-2 py-0.5 rounded-full text-gray-900" style={{ backgroundColor: "#C6E03A" }}>
                      {isUk ? "Сезон" : "Season"}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAKE ORDER BUILDER */}
      <section id="cake-order" className="py-20 px-4" style={{ backgroundColor: "#E8E4F0" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">
              {isUk ? "Конструктор" : "Builder"}
            </p>
            <h2 className="text-4xl font-black text-gray-900">
              {isUk ? "Замовлення торта" : "Cake Order"}
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Steps */}
            <div className="flex-1">
              {/* Progress bar */}
              <div className="flex gap-2 mb-8">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div
                    key={s}
                    className="flex-1 h-1.5 rounded-full transition-all"
                    style={{ backgroundColor: s <= step ? "#C6E03A" : "#D1D5DB" }}
                  />
                ))}
              </div>
              <p className="text-xs font-mono text-gray-400 mb-6">
                {isUk ? `Крок ${step} з 5` : `Step ${step} of 5`}
              </p>

              {/* Step 1: Size */}
              {step === 1 && (
                <div>
                  <h3 className="text-xl font-bold mb-4">
                    {isUk ? "Розмір торта" : "Cake Size"}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {SIZES.map((s) => (
                      <button
                        key={s.portions}
                        onClick={() => setCakeSize(s.portions)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${cakeSize === s.portions ? "border-gray-900 bg-white" : "border-gray-200 bg-white hover:border-gray-400"}`}
                      >
                        <span className="block font-mono font-bold text-lg">{s.portions}</span>
                        <span className="block text-xs text-gray-500 mb-2">
                          {isUk ? "порцій" : "portions"}
                        </span>
                        <span className="block font-mono font-bold text-gray-900">{s.price}₴</span>
                      </button>
                    ))}
                  </div>
                  <button
                    disabled={!cakeSize}
                    onClick={() => setStep(2)}
                    className="mt-6 w-full py-3 rounded-full font-semibold text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    style={{ backgroundColor: "#C6E03A" }}
                  >
                    {isUk ? "Далі →" : "Next →"}
                  </button>
                </div>
              )}

              {/* Step 2: Filling */}
              {step === 2 && (
                <div>
                  <h3 className="text-xl font-bold mb-4">
                    {isUk ? "Начинка" : "Filling"}
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {FILLINGS.map((f) => (
                      <button
                        key={f.key}
                        onClick={() => setCakeFilling(f.key)}
                        className={`p-3 rounded-xl border-2 flex justify-between items-center transition-all ${cakeFilling === f.key ? "border-gray-900 bg-white" : "border-gray-200 bg-white hover:border-gray-400"}`}
                      >
                        <span className="font-medium text-sm">{isUk ? f.uk : f.en}</span>
                        <span className="font-mono text-sm text-gray-500">
                          {f.extra > 0 ? `+${f.extra}₴` : isUk ? "Включено" : "Included"}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-full border-2 border-gray-300 font-semibold text-gray-600 hover:border-gray-500 transition-all">
                      ← {isUk ? "Назад" : "Back"}
                    </button>
                    <button
                      disabled={!cakeFilling}
                      onClick={() => setStep(3)}
                      className="flex-1 py-3 rounded-full font-semibold text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                      style={{ backgroundColor: "#C6E03A" }}
                    >
                      {isUk ? "Далі →" : "Next →"}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Coating */}
              {step === 3 && (
                <div>
                  <h3 className="text-xl font-bold mb-4">
                    {isUk ? "Покриття" : "Coating"}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {COATINGS.map((c) => (
                      <button
                        key={c.key}
                        onClick={() => setCakeCoating(c.key)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${cakeCoating === c.key ? "border-gray-900 bg-white" : "border-gray-200 bg-white hover:border-gray-400"}`}
                      >
                        <span className="block font-medium text-sm mb-1">{isUk ? c.uk : c.en}</span>
                        <span className="block font-mono text-sm text-gray-500">+{c.extra}₴</span>
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button onClick={() => setStep(2)} className="flex-1 py-3 rounded-full border-2 border-gray-300 font-semibold text-gray-600 hover:border-gray-500 transition-all">
                      ← {isUk ? "Назад" : "Back"}
                    </button>
                    <button
                      disabled={!cakeCoating}
                      onClick={() => setStep(4)}
                      className="flex-1 py-3 rounded-full font-semibold text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                      style={{ backgroundColor: "#C6E03A" }}
                    >
                      {isUk ? "Далі →" : "Next →"}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Inscription */}
              {step === 4 && (
                <div>
                  <h3 className="text-xl font-bold mb-4">
                    {isUk ? "Напис та декор" : "Inscription & Decor"}
                  </h3>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isUk ? "Ваш напис (до 40 символів)" : "Your message (up to 40 chars)"}
                  </label>
                  <input
                    type="text"
                    value={cakeText}
                    maxLength={40}
                    onChange={(e) => setCakeText(e.target.value)}
                    placeholder={isUk ? "Напр.: З днем народження!" : "e.g. Happy Birthday!"}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm mb-6 focus:border-gray-900 outline-none transition-colors"
                  />
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    {isUk ? "Декорування" : "Decoration"}
                  </p>
                  <div className="flex gap-3 flex-wrap mb-6">
                    {DECORS.map((d) => (
                      <button
                        key={d.key}
                        onClick={() => setCakeDecor(d.key)}
                        className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${cakeDecor === d.key ? "border-gray-900 bg-white" : "border-gray-200 bg-white hover:border-gray-400"}`}
                      >
                        {isUk ? d.uk : d.en}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(3)} className="flex-1 py-3 rounded-full border-2 border-gray-300 font-semibold text-gray-600 hover:border-gray-500 transition-all">
                      ← {isUk ? "Назад" : "Back"}
                    </button>
                    <button
                      onClick={() => setStep(5)}
                      className="flex-1 py-3 rounded-full font-semibold text-gray-900 transition-all"
                      style={{ backgroundColor: "#C6E03A" }}
                    >
                      {isUk ? "Далі →" : "Next →"}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 5: Date */}
              {step === 5 && (
                <div>
                  <h3 className="text-xl font-bold mb-4">
                    {isUk ? "Дата отримання" : "Pickup Date"}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {isUk ? "Мінімум 5 днів на виготовлення" : "Minimum 5 days preparation"}
                  </p>
                  <div className="flex gap-3 flex-col">
                    {dateOptions.map((d, i) => (
                      <button
                        key={i}
                        onClick={() => setCakeDate(d)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${cakeDate === d ? "border-gray-900 bg-white" : "border-gray-200 bg-white hover:border-gray-400"}`}
                      >
                        <span className="font-mono font-bold">{d}</span>
                        {i === 0 && <span className="ml-3 text-xs text-gray-400">{isUk ? "Найближча дата" : "Earliest"}</span>}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button onClick={() => setStep(4)} className="flex-1 py-3 rounded-full border-2 border-gray-300 font-semibold text-gray-600 hover:border-gray-500 transition-all">
                      ← {isUk ? "Назад" : "Back"}
                    </button>
                    <button
                      disabled={!cakeDate}
                      onClick={() => { setCartCount((c) => c + 1); setStep(1); setCakeSize(null); setCakeFilling(null); setCakeCoating(null); setCakeText(""); setCakeDate(null); }}
                      className="flex-1 py-3 rounded-full font-semibold text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm"
                      style={{ backgroundColor: "#C6E03A" }}
                    >
                      {isUk ? "Підтвердити (50% передоплата)" : "Confirm Order (50% prepay)"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar summary */}
            <div className="lg:w-72 shrink-0">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-20">
                <h4 className="font-bold text-gray-900 mb-4">
                  {isUk ? "Ваш торт" : "Your Cake"}
                </h4>
                <div className="space-y-2 text-sm mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-500">{isUk ? "Розмір" : "Size"}</span>
                    <span className="font-mono font-bold">{cakeSize ? `${cakeSize} ${isUk ? "порц." : "port."}` : "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{isUk ? "Начинка" : "Filling"}</span>
                    <span className="font-medium text-right max-w-32 leading-tight">
                      {cakeFilling ? (isUk ? FILLINGS.find(f => f.key === cakeFilling)?.uk : FILLINGS.find(f => f.key === cakeFilling)?.en) : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{isUk ? "Покриття" : "Coating"}</span>
                    <span className="font-medium text-right max-w-32 leading-tight">
                      {cakeCoating ? (isUk ? COATINGS.find(c => c.key === cakeCoating)?.uk : COATINGS.find(c => c.key === cakeCoating)?.en) : "—"}
                    </span>
                  </div>
                  {cakeText && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">{isUk ? "Напис" : "Text"}</span>
                      <span className="font-medium text-right max-w-32 leading-tight italic text-gray-600">"{cakeText}"</span>
                    </div>
                  )}
                  {cakeDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">{isUk ? "Дата" : "Date"}</span>
                      <span className="font-mono text-xs">{cakeDate}</span>
                    </div>
                  )}
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm text-gray-500">{isUk ? "Разом" : "Total"}</span>
                    <span className="font-mono text-2xl font-black text-gray-900">{cakeTotal > 0 ? `${cakeTotal}₴` : "—"}</span>
                  </div>
                  {cakeTotal > 0 && (
                    <p className="text-xs text-gray-400 mt-1">
                      {isUk ? `Передоплата: ${Math.round(cakeTotal * 0.5)}₴` : `Prepay: ${Math.round(cakeTotal * 0.5)}₴`}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RECIPE NOTES */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">
              {isUk ? "Наука та смак" : "Science & Taste"}
            </p>
            <h2 className="text-4xl font-black text-gray-900">
              {isUk ? "Нотатки рецептора" : "Recipe Notes"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                formula: "C₆H₁₂O₆ → 23%",
                titleEn: "Why we use 23% glucose syrup",
                titleUk: "Чому ми використовуємо 23% глюкозного сиропу",
                textEn: "Glucose prevents crystallization and maintains smooth texture in our ganaches and caramels at ambient temperature.",
                textUk: "Глюкоза запобігає кристалізації та підтримує гладку текстуру в наших ганашах і карамелях.",
              },
              {
                formula: "T° = 165°C",
                titleEn: "The Maillard reaction at 165°C",
                titleUk: "Реакція Майяра при 165°C",
                textEn: "Above 140°C, amino acids and reducing sugars react to create hundreds of complex flavor compounds — the secret behind our golden choux pastry.",
                textUk: "Вище 140°C амінокислоти та редукуючі цукри реагують, створюючи сотні складних смакових сполук.",
              },
              {
                formula: "aw < 0.85",
                titleEn: "Water activity in mousse: aw < 0.85",
                titleUk: "Активність води у мусі: aw < 0.85",
                textEn: "Controlling water activity below 0.85 inhibits microbial growth without sacrificing the airy lightness of our signature mousses.",
                textUk: "Контроль активності води нижче 0.85 пригнічує мікробний ріст, зберігаючи повітряність наших мусів.",
              },
            ].map((note, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg transition-all">
                <div className="inline-block font-mono font-bold text-sm px-3 py-1.5 rounded-lg mb-4 text-gray-900" style={{ backgroundColor: "#C6E03A" }}>
                  {note.formula}
                </div>
                <h3 className="font-bold text-gray-900 text-sm leading-tight mb-3">
                  {isUk ? note.titleUk : note.titleEn}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {isUk ? note.textUk : note.textEn}
                </p>
                <a href="#" className="text-xs font-semibold text-gray-900 hover:underline">
                  {isUk ? "Читати далі →" : "Read full note →"}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 px-4" style={{ backgroundColor: "#E8E4F0" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">
                {isUk ? "Наша команда" : "Our Team"}
              </p>
              <h2 className="text-4xl font-black text-gray-900 mb-6">
                {isUk ? "Про нас" : "About"}
              </h2>

              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {isUk ? "Наш шеф" : "Our Chef"}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {isUk
                  ? "8 років досвіду у світі французької кондитерської. Навчався в Le Cordon Bleu Paris, сертифікований Valrhona. Кожен десерт — це формула точності та натхнення."
                  : "8 years of experience in the world of French patisserie. Trained at Le Cordon Bleu Paris, Valrhona certified. Every dessert is a formula of precision and inspiration."}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {["Le Cordon Bleu Paris", "Valrhona Certified", "8 Years Experience", "HACCP"].map((cert) => (
                  <span key={cert} className="text-xs font-medium px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-700">
                    {cert}
                  </span>
                ))}
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {isUk ? "Наша лабораторія" : "Our Lab"}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {isUk
                  ? "Сучасна кондитерська лабораторія площею 120 м² у серці Києва. Обладнання Unox, Pacojet, Thermomix. Тільки перевірені інгредієнти від постачальників Франції та України."
                  : "A modern 120 m² patisserie lab in the heart of Kyiv. Unox, Pacojet, Thermomix equipment. Only verified ingredients from French and Ukrainian suppliers."}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-6">
              <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                {["🍰", "⚗️", "🎂", "🧁"].map((em, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-2xl flex items-center justify-center text-5xl bg-white border border-gray-100 shadow-sm"
                    style={{ transform: i % 2 === 0 ? "rotate(-2deg)" : "rotate(2deg)" }}
                  >
                    {em}
                  </div>
                ))}
              </div>
              <p className="font-mono text-xs text-gray-400 text-center">
                {isUk ? "Смак + Наука = SweetLab" : "Taste + Science = SweetLab"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-100 py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">⚗️</span>
              <span className="font-bold text-gray-900">SweetLab</span>
            </div>
            <p className="text-sm text-gray-500">
              {isUk ? "Київ, Хрещатик 15" : "Kyiv, Khreshchatyk 15"}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {isUk ? "Пн–Сб: 09:00–20:00" : "Mon–Sat: 09:00–20:00"}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {isUk ? "Нд: 10:00–17:00" : "Sun: 10:00–17:00"}
            </p>
          </div>

          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-3">
              {isUk ? "Слідкуйте" : "Follow"}
            </p>
            <a href="#" className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              <span>📸</span> @sweetlab.kyiv
            </a>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-300 font-mono">
              © 2026 SweetLab
            </p>
            <p className="text-xs text-gray-300 font-mono mt-1">
              {isUk ? "Смак — це наша формула" : "Taste is our formula"}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
