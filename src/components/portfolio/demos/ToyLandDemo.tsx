"use client";

import { useState } from "react";

const AGE_GROUPS = [
  { id: "0-1", ukL: "👶 0–1 рік", enL: "👶 0–1 yr" },
  { id: "1-3", ukL: "🐣 1–3 роки", enL: "🐣 1–3 yrs" },
  { id: "3-6", ukL: "🧒 3–6 років", enL: "🧒 3–6 yrs" },
  { id: "6-12", ukL: "👦 6–12 років", enL: "👦 6–12 yrs" },
  { id: "12+", ukL: "🧑 12+ років", enL: "🧑 12+ yrs" },
];

const PRODUCTS = [
  { id: 1, nameUk: "Конструктор LEGO Classic Базова коробка", nameEn: "LEGO Classic Base Box", brand: "LEGO", age: "6-12", catUk: "Конструктори", catEn: "Building", price: 1250, oldPrice: null, badge: "ХІТ", certs: ["EN 71", "CE"], developsUk: ["логіка", "уява", "моторика"], developsEn: ["logic", "creativity", "motor skills"], gender: "unisex", emoji: "🧱", rating: 4.9, reviews: 512 },
  { id: 2, nameUk: "М'яка лялька Принцеса", nameEn: "Soft Princess Doll", brand: "Zapf Creation", age: "1-3", catUk: "Ляльки", catEn: "Dolls", price: 890, oldPrice: 1090, badge: "ЗНИЖКА", certs: ["EN 71", "CE", "Без BPA"], developsUk: ["уява", "соц. навички"], developsEn: ["creativity", "social skills"], gender: "girl", emoji: "🧸", rating: 4.7, reviews: 234 },
  { id: 3, nameUk: "Набір машинок Hot Wheels (10 шт)", nameEn: "Hot Wheels Car Set (10 pcs)", brand: "Hot Wheels", age: "3-6", catUk: "Транспорт", catEn: "Vehicles", price: 650, oldPrice: null, badge: "НОВИНКА", certs: ["EN 71", "CE"], developsUk: ["моторика", "уява"], developsEn: ["motor skills", "creativity"], gender: "boy", emoji: "🚗", rating: 4.6, reviews: 178 },
  { id: 4, nameUk: "Розвиваючий килимок 0+", nameEn: "Baby Activity Mat 0+", brand: "Fisher-Price", age: "0-1", catUk: "Для малят", catEn: "Baby", price: 1490, oldPrice: 1890, badge: "ЗНИЖКА", certs: ["EN 71", "CE", "Без БФА"], developsUk: ["зір", "тактильність", "слух"], developsEn: ["vision", "touch", "hearing"], gender: "unisex", emoji: "🌈", rating: 4.8, reviews: 89 },
  { id: 5, nameUk: "Пазл 500 деталей Ліс", nameEn: "500-Piece Forest Puzzle", brand: "Ravensburger", age: "6-12", catUk: "Пазли", catEn: "Puzzles", price: 480, oldPrice: null, badge: "ПОДАРУНОК", certs: ["EN 71", "CE"], developsUk: ["логіка", "уважність", "посидючість"], developsEn: ["logic", "attention", "patience"], gender: "unisex", emoji: "🧩", rating: 4.5, reviews: 301 },
  { id: 6, nameUk: "Набір для малювання акварель", nameEn: "Watercolor Art Set", brand: "Crayola", age: "3-6", catUk: "Творчість", catEn: "Art & Craft", price: 390, oldPrice: null, badge: null, certs: ["EN 71", "ASTM"], developsUk: ["творчість", "моторика", "кольоровий зір"], developsEn: ["creativity", "motor skills", "color vision"], gender: "unisex", emoji: "🎨", rating: 4.4, reviews: 145 },
  { id: 7, nameUk: "Настільна гра Монополія Україна", nameEn: "Monopoly Ukraine Board Game", brand: "Hasbro", age: "12+", catUk: "Настільні ігри", catEn: "Board Games", price: 990, oldPrice: 1290, badge: "ХІТ", certs: ["EN 71"], developsUk: ["стратегія", "математика", "соц. навички"], developsEn: ["strategy", "math", "social skills"], gender: "unisex", emoji: "🎲", rating: 4.8, reviews: 267 },
  { id: 8, nameUk: "Робот-конструктор STEM 8+", nameEn: "STEM Robot Builder 8+", brand: "Makeblock", age: "6-12", catUk: "STEM / Роботи", catEn: "STEM / Robots", price: 2890, oldPrice: 3490, badge: "ТОП БРЕНД", certs: ["CE", "FCC"], developsUk: ["програмування", "інженерія", "логіка"], developsEn: ["coding", "engineering", "logic"], gender: "unisex", emoji: "🤖", rating: 4.9, reviews: 134 },
  { id: 9, nameUk: "Велосипед дитячий 20\" Puky", nameEn: "Puky 20\" Kids Bike", brand: "Puky", age: "6-12", catUk: "Активний відпочинок", catEn: "Outdoor", price: 4890, oldPrice: 5990, badge: "ЗНИЖКА", certs: ["EN 71", "CE"], developsUk: ["координація", "фізична активність", "сміливість"], developsEn: ["coordination", "fitness", "confidence"], gender: "unisex", emoji: "🚲", rating: 4.8, reviews: 98 },
  { id: 10, nameUk: "Набір LEGO Duplo для малюків", nameEn: "LEGO Duplo Starter Set", brand: "LEGO", age: "1-3", catUk: "Конструктори", catEn: "Building", price: 780, oldPrice: null, badge: "ХІТ", certs: ["EN 71", "CE", "Без BPA"], developsUk: ["моторика", "кольори", "форми"], developsEn: ["motor skills", "colors", "shapes"], gender: "unisex", emoji: "🔴", rating: 4.9, reviews: 341 },
  { id: 11, nameUk: "Мікроскоп дитячий Bresser Junior", nameEn: "Bresser Junior Microscope", brand: "Bresser", age: "6-12", catUk: "STEM / Наука", catEn: "STEM / Science", price: 1390, oldPrice: null, badge: "НОВИНКА", certs: ["CE", "EN 71"], developsUk: ["допитливість", "наука", "логіка"], developsEn: ["curiosity", "science", "logic"], gender: "unisex", emoji: "🔬", rating: 4.7, reviews: 56 },
  { id: 12, nameUk: "Ляльковий будиночок KidKraft", nameEn: "KidKraft Dollhouse", brand: "KidKraft", age: "3-6", catUk: "Ляльки", catEn: "Dolls", price: 3490, oldPrice: 4290, badge: "ПОДАРУНОК", certs: ["EN 71", "CE", "ASTM"], developsUk: ["уява", "соціальні навички", "креативність"], developsEn: ["imagination", "social skills", "creativity"], gender: "girl", emoji: "🏠", rating: 4.9, reviews: 127 },
];

const QUIZ_INTERESTS = [
  { id: "dino", uk: "🦕 Динозаври", en: "🦕 Dinosaurs" },
  { id: "cars", uk: "🚗 Машинки", en: "🚗 Cars" },
  { id: "dolls", uk: "🪆 Ляльки", en: "🪆 Dolls" },
  { id: "lego", uk: "🧱 Конструктор", en: "🧱 Building" },
  { id: "art", uk: "🎨 Мистецтво", en: "🎨 Art" },
  { id: "science", uk: "🔬 Наука", en: "🔬 Science" },
  { id: "games", uk: "🎲 Ігри", en: "🎲 Games" },
  { id: "outdoor", uk: "⚽ На вулиці", en: "⚽ Outdoors" },
];

const CARD_GRADIENTS = [
  "bg-linear-to-br from-yellow-300 to-orange-300",
  "bg-linear-to-br from-pink-300 to-rose-300",
  "bg-linear-to-br from-sky-300 to-blue-300",
  "bg-linear-to-br from-green-300 to-emerald-300",
  "bg-linear-to-br from-purple-300 to-violet-300",
  "bg-linear-to-br from-orange-300 to-red-300",
  "bg-linear-to-br from-teal-300 to-cyan-300",
  "bg-linear-to-br from-indigo-300 to-sky-300",
];

const BADGE_STYLES: Record<string, string> = {
  "ХІТ": "bg-yellow-400 text-yellow-900",
  "ЗНИЖКА": "bg-pink-500 text-white",
  "НОВИНКА": "bg-sky-400 text-white",
  "ПОДАРУНОК": "bg-green-400 text-green-900",
  "ТОП БРЕНД": "bg-purple-500 text-white",
};

const DEVELOPS_COLORS = [
  "bg-green-100 text-green-700",
  "bg-sky-100 text-sky-700",
  "bg-yellow-100 text-yellow-700",
  "bg-pink-100 text-pink-700",
  "bg-purple-100 text-purple-700",
];

const TOY_CATEGORIES = [
  { emoji: "🧱", nameUk: "Конструктори", nameEn: "Building", countUk: "248 іграшок", countEn: "248 toys", color: "from-yellow-300 to-orange-300" },
  { emoji: "🚗", nameUk: "Транспорт", nameEn: "Vehicles", countUk: "189 іграшок", countEn: "189 toys", color: "from-sky-300 to-blue-300" },
  { emoji: "🧸", nameUk: "М'які іграшки", nameEn: "Plush Toys", countUk: "312 іграшок", countEn: "312 toys", color: "from-pink-300 to-rose-300" },
  { emoji: "🎨", nameUk: "Творчість", nameEn: "Art & Craft", countUk: "156 іграшок", countEn: "156 toys", color: "from-purple-300 to-violet-300" },
  { emoji: "🤖", nameUk: "STEM / Роботи", nameEn: "STEM / Robots", countUk: "94 іграшки", countEn: "94 toys", color: "from-green-300 to-emerald-300" },
  { emoji: "🎲", nameUk: "Настільні ігри", nameEn: "Board Games", countUk: "203 гри", countEn: "203 games", color: "from-orange-300 to-red-300" },
];

const PARENT_REVIEWS = [
  { nameUk: "Оксана М., мама 4-річного Дениса", nameEn: "Oksana M., mom of 4-y.o. Denis", textUk: "LEGO Classic купила на день народження — дитина грає вже 3-й місяць. Якість чудова, сертифікати є, доставка наступного дня!", textEn: "Bought LEGO Classic for birthday — child has been playing for 3 months already. Excellent quality, certificates included, next-day delivery!", stars: 5, emoji: "👩" },
  { nameUk: "Андрій К., тато 7-річної Соні", nameEn: "Andriy K., dad of 7-y.o. Sonia", textUk: "Скористався Gift Finder — за 2 хвилини підібрав ідеальний подарунок. Приїхало в подарунковій упаковці — Соня була у захваті!", textEn: "Used the Gift Finder — found the perfect gift in 2 minutes. Arrived gift-wrapped — Sonia was thrilled!", stars: 5, emoji: "👨" },
  { nameUk: "Юлія Р., мама двох дітей", nameEn: "Yuliia R., mother of two", textUk: "Замовляю вже вчетверте. Завжди є сертифікати безпеки, менеджер уточнив вік дітей і порекомендував саме те, що треба.", textEn: "This is my fourth order. Always have safety certs, manager clarified kids' ages and recommended exactly what was needed.", stars: 5, emoji: "👩" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} className={`w-3 h-3 ${s <= Math.round(rating) ? "text-yellow-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function ToyLandDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [ageFilter, setAgeFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popular");
  const [genderFilter, setGenderFilter] = useState<string>("all");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cart, setCart] = useState<{ id: number; qty: number; gift: boolean }[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [giftWrap, setGiftWrap] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState<{ age: string; gender: string; interests: string[]; budget: string }>({
    age: "",
    gender: "",
    interests: [],
    budget: "",
  });
  const [quizDone, setQuizDone] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const addToCart = (id: number) => {
    setCart((prev) => {
      const existing = prev.find((x) => x.id === id);
      if (existing) return prev.map((x) => x.id === id ? { ...x, qty: x.qty + 1 } : x);
      return [...prev, { id, qty: 1, gift: false }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((x) => x.id !== id));
  };

  const updateQty = (id: number, delta: number) => {
    setCart((prev) => prev.map((x) => x.id === id ? { ...x, qty: Math.max(1, x.qty + delta) } : x).filter((x) => x.qty > 0));
  };

  const cartTotal = cart.reduce((sum, item) => {
    const product = PRODUCTS.find((p) => p.id === item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const filteredProducts = PRODUCTS.filter((p) => {
    if (ageFilter !== "all" && p.age !== ageFilter) return false;
    if (genderFilter !== "all" && p.gender !== genderFilter && p.gender !== "unisex") return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const name = isUk ? p.nameUk : p.nameEn;
      if (!name.toLowerCase().includes(q) && !p.brand.toLowerCase().includes(q)) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return b.reviews - a.reviews;
  });

  const getQuizResults = () => {
    return PRODUCTS.filter((p) => {
      if (quizAnswers.age && p.age !== quizAnswers.age) return false;
      if (quizAnswers.gender && quizAnswers.gender !== "any" && p.gender !== quizAnswers.gender && p.gender !== "unisex") return false;
      if (quizAnswers.budget) {
        if (quizAnswers.budget === "500" && p.price > 500) return false;
        if (quizAnswers.budget === "500-1500" && (p.price < 500 || p.price > 1500)) return false;
        if (quizAnswers.budget === "1500-3000" && (p.price < 1500 || p.price > 3000)) return false;
        if (quizAnswers.budget === "3000+" && p.price < 3000) return false;
      }
      return true;
    }).slice(0, 4);
  };

  const toggleQuizInterest = (id: string) => {
    setQuizAnswers((prev) => ({
      ...prev,
      interests: prev.interests.includes(id) ? prev.interests.filter((x) => x !== id) : [...prev.interests, id],
    }));
  };

  const quizNext = () => {
    if (quizStep < 4) setQuizStep((s) => s + 1);
    else setQuizDone(true);
  };

  const quizBack = () => {
    if (quizDone) { setQuizDone(false); setQuizStep(4); }
    else if (quizStep > 1) setQuizStep((s) => s - 1);
  };

  const resetQuiz = () => {
    setQuizStep(1);
    setQuizDone(false);
    setQuizAnswers({ age: "", gender: "", interests: [], budget: "" });
  };

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── 1. STICKY NAV ── */}
      <nav className="sticky top-0 z-50 bg-white border-b border-yellow-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          {/* Logo */}
          <div className="shrink-0 flex items-center gap-2">
            <span className="text-2xl">🧸</span>
            <span className="text-xl font-black bg-linear-to-r from-yellow-500 via-pink-500 to-sky-500 bg-clip-text text-transparent leading-none">
              ToyLand
            </span>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isUk ? "🔍 Шукати іграшки, бренди..." : "🔍 Search toys, brands..."}
              className="w-full rounded-full border-2 border-yellow-300 focus:border-yellow-400 focus:outline-none px-5 py-2 text-sm bg-yellow-50 placeholder-yellow-400 text-stone-700"
            />
          </div>

          {/* Right actions */}
          <div className="shrink-0 flex items-center gap-2">
            {/* Wishlist */}
            <button
              onClick={() => {}}
              className="hidden sm:flex items-center gap-1 px-3 py-2 rounded-full border border-pink-200 hover:bg-pink-50 text-pink-500 font-semibold text-sm transition-colors"
            >
              <span>♡</span>
              {wishlist.length > 0 && <span className="bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{wishlist.length}</span>}
            </button>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-yellow-300 hover:bg-yellow-50 text-stone-700 font-semibold text-sm transition-colors"
            >
              <span>🛒</span>
              {cartCount > 0 && (
                <span className="bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>
              )}
            </button>

            {/* Help button */}
            <button
              onClick={() => { setQuizOpen(true); setQuizStep(1); setQuizDone(false); }}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold text-sm transition-colors"
            >
              🎁 {isUk ? "Допоможи обрати" : "Help me choose"}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 rounded-lg hover:bg-yellow-50 text-stone-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-yellow-100 bg-white px-4 py-3 flex flex-col gap-2">
            <button
              onClick={() => { setQuizOpen(true); setMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-yellow-400 text-yellow-900 font-bold text-sm"
            >
              🎁 {isUk ? "Допоможи обрати" : "Help me choose"}
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-pink-200 text-pink-500 font-semibold text-sm">
              ♡ {isUk ? "Список бажань" : "Wishlist"} {wishlist.length > 0 && `(${wishlist.length})`}
            </button>
          </div>
        )}
      </nav>

      {/* ── 2. HERO ── */}
      <section className="bg-linear-to-br from-yellow-300 via-sky-200 to-pink-200 px-4 py-14 md:py-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-block bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1 rounded-full mb-4 uppercase tracking-wide">
              {isUk ? "🎉 Завжди свято тут!" : "🎉 It's always a holiday here!"}
            </div>
            <h1 className="text-[42px] md:text-[56px] font-black leading-tight text-stone-900 mb-4">
              {isUk ? (
                <>
                  <span className="text-yellow-500">ІГРАШКИ,</span>{" "}
                  <span className="text-pink-500">ЩО</span>{" "}
                  <span className="text-sky-500">РОЗВИВАЮТЬ</span>{" "}
                  <span className="text-green-500">І ЗАХОПЛЮЮТЬ</span>
                </>
              ) : (
                <>
                  <span className="text-yellow-500">TOYS</span>{" "}
                  <span className="text-pink-500">THAT</span>{" "}
                  <span className="text-sky-500">DEVELOP</span>{" "}
                  <span className="text-green-500">AND DELIGHT</span>
                </>
              )}
            </h1>
            <p className="text-stone-600 text-lg mb-8 max-w-md mx-auto md:mx-0">
              {isUk
                ? "Сертифіковані іграшки для кожного віку. Безпечно, весело й розвивально — для найщасливішого дитинства!"
                : "Certified toys for every age. Safe, fun & educational — for the happiest childhood!"}
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <button
                onClick={() => { setQuizOpen(true); setQuizStep(1); setQuizDone(false); }}
                className="flex items-center gap-2 px-8 py-4 rounded-full bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-black text-lg shadow-lg shadow-yellow-200 transition-all hover:scale-105"
              >
                🎁 {isUk ? "Знайти подарунок" : "Find a Gift"}
              </button>
              <button
                onClick={() => document.getElementById("product-grid")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 px-8 py-4 rounded-full border-2 border-stone-700 text-stone-700 hover:bg-white font-bold text-lg transition-all hover:scale-105"
              >
                {isUk ? "Дивитись усі →" : "Browse All →"}
              </button>
            </div>
          </div>

          {/* Decorative toys grid */}
          <div className="shrink-0 grid grid-cols-3 gap-3">
            {["🧱", "🚗", "🧸", "🌈", "🎨", "🤖", "🧩", "🎲", "🦕"].map((em, i) => (
              <div key={i} className="w-16 h-16 rounded-2xl bg-white/70 backdrop-blur flex items-center justify-center text-3xl shadow-sm hover:scale-110 transition-transform">
                {em}
              </div>
            ))}
          </div>
        </div>

        {/* Birthday strip */}
        <div className="mt-8 bg-sky-400 text-white text-center py-3 rounded-2xl max-w-7xl mx-auto font-semibold text-sm md:text-base">
          🎂 {isUk
            ? "До дня народження — безкоштовна подарункова упаковка! Вкажіть дату при замовленні."
            : "Birthday orders — free gift wrap! Mention the date when ordering."}
        </div>
      </section>

      {/* ── 2b. TOP CATEGORIES */}
      <section className="bg-white px-4 py-10 border-b border-stone-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-black text-stone-900 mb-6 text-center">
            {isUk ? "🧩 Популярні категорії" : "🧩 Popular Categories"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {TOY_CATEGORIES.map((cat) => (
              <button
                key={cat.nameEn}
                onClick={() => document.getElementById("product-grid")?.scrollIntoView({ behavior: "smooth" })}
                className={`bg-linear-to-br ${cat.color} rounded-3xl p-4 text-center hover:scale-105 transition-transform shadow-sm`}
              >
                <div className="text-4xl mb-2">{cat.emoji}</div>
                <p className="font-black text-stone-900 text-sm leading-tight">{isUk ? cat.nameUk : cat.nameEn}</p>
                <p className="text-stone-700 text-[10px] mt-1">{isUk ? cat.countUk : cat.countEn}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. AGE FILTER STRIP ── */}
      <section className="bg-white border-b border-yellow-100 px-4 py-4">
        <div className="max-w-7xl mx-auto">
          {/* Age pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <span className="shrink-0 text-xs font-bold text-stone-500 uppercase tracking-wide mr-1">
              {isUk ? "Вік:" : "Age:"}
            </span>
            <button
              onClick={() => setAgeFilter("all")}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all ${ageFilter === "all" ? "bg-yellow-400 text-yellow-900 shadow-md" : "bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border border-yellow-200"}`}
            >
              {isUk ? "Усі" : "All"}
            </button>
            {AGE_GROUPS.map((ag, i) => {
              const colors = [
                "bg-sky-400 text-sky-900 shadow-md",
                "bg-green-400 text-green-900 shadow-md",
                "bg-pink-400 text-pink-900 shadow-md",
                "bg-purple-400 text-purple-900 shadow-md",
                "bg-orange-400 text-orange-900 shadow-md",
              ];
              const inactiveColors = [
                "bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100",
                "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100",
                "bg-pink-50 text-pink-700 border border-pink-200 hover:bg-pink-100",
                "bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100",
                "bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100",
              ];
              return (
                <button
                  key={ag.id}
                  onClick={() => setAgeFilter(ag.id)}
                  className={`shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all ${ageFilter === ag.id ? colors[i] : inactiveColors[i]}`}
                >
                  {isUk ? ag.ukL : ag.enL}
                </button>
              );
            })}
          </div>

          {/* Gender filter */}
          <div className="flex items-center gap-2 mt-3">
            <span className="shrink-0 text-xs font-bold text-stone-500 uppercase tracking-wide mr-1">
              {isUk ? "Стать:" : "Gender:"}
            </span>
            {[
              { id: "all", uk: "🌈 Усі", en: "🌈 All" },
              { id: "boy", uk: "👦 Хлопчик", en: "👦 Boy" },
              { id: "girl", uk: "👧 Дівчинка", en: "👧 Girl" },
              { id: "unisex", uk: "✨ Унісекс", en: "✨ Unisex" },
            ].map((g) => (
              <button
                key={g.id}
                onClick={() => setGenderFilter(g.id)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  genderFilter === g.id
                    ? g.id === "boy" ? "bg-sky-400 text-sky-900 shadow-sm"
                      : g.id === "girl" ? "bg-pink-400 text-pink-900 shadow-sm"
                      : "bg-yellow-400 text-yellow-900 shadow-sm"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200 border border-stone-200"
                }`}
              >
                {isUk ? g.uk : g.en}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. PRODUCT GRID ── */}
      <section id="product-grid" className="max-w-7xl mx-auto px-4 py-10">
        {/* Sort bar */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="text-stone-500 text-sm">
              {isUk ? `Знайдено: ${filteredProducts.length} товарів` : `Found: ${filteredProducts.length} products`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-stone-500 font-medium">{isUk ? "Сортувати:" : "Sort by:"}</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border-2 border-yellow-200 focus:border-yellow-400 focus:outline-none px-3 py-1.5 text-sm bg-yellow-50 text-stone-700 font-medium"
            >
              <option value="popular">{isUk ? "Популярні" : "Popular"}</option>
              <option value="rating">{isUk ? "Рейтинг" : "Rating"}</option>
              <option value="price-asc">{isUk ? "Ціна: ↑" : "Price: ↑"}</option>
              <option value="price-desc">{isUk ? "Ціна: ↓" : "Price: ↓"}</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-stone-500 text-lg font-medium">
              {isUk ? "Нічого не знайдено. Спробуйте змінити фільтри." : "Nothing found. Try changing the filters."}
            </p>
            <button
              onClick={() => { setAgeFilter("all"); setGenderFilter("all"); setSearchQuery(""); }}
              className="mt-4 px-6 py-2 rounded-full bg-yellow-400 text-yellow-900 font-bold text-sm hover:bg-yellow-500 transition-colors"
            >
              {isUk ? "Скинути фільтри" : "Reset filters"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {filteredProducts.map((product, idx) => {
              const inWishlist = wishlist.includes(product.id);
              const inCart = cart.some((c) => c.id === product.id);
              const gradient = CARD_GRADIENTS[idx % CARD_GRADIENTS.length];

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all hover:scale-105 overflow-hidden border border-stone-100 flex flex-col"
                >
                  {/* Colorful top */}
                  <div className={`relative h-40 ${gradient} flex items-center justify-center cursor-pointer`} onClick={() => setSelectedProduct(product.id)}>
                    <span className="text-6xl">{product.emoji}</span>

                    {/* Age badge */}
                    <span className="absolute top-2 left-2 bg-white/80 text-stone-700 text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur">
                      {AGE_GROUPS.find((a) => a.id === product.age)?.[isUk ? "ukL" : "enL"] ?? product.age}
                    </span>

                    {/* Safety badge */}
                    <span className="absolute top-2 right-10 bg-green-400 text-green-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      ✓ {isUk ? "Безпечно" : "Safe"}
                    </span>

                    {/* Wishlist heart */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-sm hover:scale-110 transition-transform"
                    >
                      {inWishlist ? "❤️" : "🤍"}
                    </button>

                    {/* Badge */}
                    {product.badge && (
                      <span className={`absolute bottom-2 left-2 text-[10px] font-black px-2 py-0.5 rounded-full ${BADGE_STYLES[product.badge] ?? "bg-stone-200 text-stone-700"}`}>
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-3 flex flex-col flex-1 gap-2">
                    <div>
                      <p className="font-bold text-stone-900 text-[13px] leading-snug line-clamp-2">
                        {isUk ? product.nameUk : product.nameEn}
                      </p>
                      <p className="text-xs text-stone-400 mt-0.5">{product.brand}</p>
                    </div>

                    {/* Category */}
                    <p className="text-[11px] text-sky-600 font-semibold">
                      {isUk ? product.catUk : product.catEn}
                    </p>

                    {/* Develops pills */}
                    <div>
                      <p className="text-[10px] text-stone-400 font-medium mb-1">
                        {isUk ? "Що розвиває:" : "Develops:"}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {(isUk ? product.developsUk : product.developsEn).slice(0, 3).map((skill, si) => (
                          <span key={si} className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${DEVELOPS_COLORS[si % DEVELOPS_COLORS.length]}`}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      <StarRating rating={product.rating} />
                      <span className="text-[11px] text-stone-400">({product.reviews})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-black text-stone-900">{product.price} ₴</span>
                      {product.oldPrice && (
                        <span className="text-xs text-stone-400 line-through">{product.oldPrice} ₴</span>
                      )}
                      {product.oldPrice && (
                        <span className="text-xs font-bold text-pink-500">
                          -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                        </span>
                      )}
                    </div>

                    {/* Cert chips */}
                    <div className="flex flex-wrap gap-1">
                      {product.certs.map((cert) => (
                        <span key={cert} className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-stone-100 text-stone-500 border border-stone-200">
                          {cert}
                        </span>
                      ))}
                    </div>

                    {/* Add to cart */}
                    <button
                      onClick={() => addToCart(product.id)}
                      className={`mt-auto w-full py-2 rounded-2xl text-sm font-bold transition-all ${
                        inCart
                          ? "bg-green-100 text-green-700 border-2 border-green-300"
                          : "bg-yellow-400 hover:bg-yellow-500 text-yellow-900 shadow-sm hover:shadow-md"
                      }`}
                    >
                      {inCart ? (isUk ? "✓ У кошику" : "✓ In cart") : (isUk ? "🛒 Додати" : "🛒 Add to cart")}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── 4b. SAFETY PROMISE */}
      <section className="bg-linear-to-br from-green-50 to-sky-50 px-4 py-14 border-y border-green-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block bg-green-400 text-green-900 text-xs font-bold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide">
              🔒 {isUk ? "Безпека передусім" : "Safety first"}
            </div>
            <h2 className="text-3xl font-black text-stone-900 mb-2">
              {isUk ? "Кожна іграшка перевірена" : "Every toy is certified"}
            </h2>
            <p className="text-stone-500 max-w-xl mx-auto">
              {isUk ? "Ми продаємо лише сертифіковані іграшки від перевірених виробників. Безпека вашої дитини — наш пріоритет №1." : "We only sell certified toys from verified manufacturers. Your child's safety is our #1 priority."}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { cert: "EN 71", emoji: "🇪🇺", titleUk: "Стандарт ЄС", titleEn: "EU Standard", textUk: "Єдиний обов'язковий стандарт іграшок в Європі", textEn: "The single mandatory toy standard in Europe" },
              { cert: "CE Mark", emoji: "✅", titleUk: "Знак безпеки", titleEn: "Safety mark", textUk: "Підтверджує відповідність вимогам безпеки ЄС", textEn: "Confirms compliance with EU safety requirements" },
              { cert: "Без BPA", emoji: "🚫", titleUk: "Без токсинів", titleEn: "Toxin-free", textUk: "Жодних шкідливих хімічних речовин у пластику", textEn: "No harmful chemicals in plastic materials" },
              { cert: "ASTM F963", emoji: "🇺🇸", titleUk: "США стандарт", titleEn: "US Standard", textUk: "Американський стандарт безпеки іграшок", textEn: "American toy safety standard" },
            ].map(item => (
              <div key={item.cert} className="bg-white rounded-3xl p-5 shadow-sm border border-green-100 text-center">
                <div className="text-4xl mb-3">{item.emoji}</div>
                <div className="inline-block bg-green-100 text-green-700 text-xs font-black px-3 py-1 rounded-full mb-2">{item.cert}</div>
                <h3 className="font-black text-stone-900 text-base mb-1">{isUk ? item.titleUk : item.titleEn}</h3>
                <p className="text-stone-500 text-xs leading-relaxed">{isUk ? item.textUk : item.textEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4c. PARENT REVIEWS */}
      <section className="bg-white px-4 py-14">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-stone-900 mb-2">
              {isUk ? "❤️ Батьки нам довіряють" : "❤️ Parents trust us"}
            </h2>
            <div className="flex items-center justify-center gap-6 text-sm text-stone-500 mt-4">
              <span>⭐ <strong className="text-stone-800">4.9</strong> {isUk ? "рейтинг" : "rating"}</span>
              <span>💬 <strong className="text-stone-800">5 200+</strong> {isUk ? "відгуків" : "reviews"}</span>
              <span>🔄 <strong className="text-stone-800">92%</strong> {isUk ? "купують знову" : "repeat buyers"}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PARENT_REVIEWS.map((r, i) => (
              <div key={i} className="bg-stone-50 rounded-3xl p-6 border border-stone-100">
                <div className="flex gap-0.5 mb-3">
                  {[1,2,3,4,5].map(s => <span key={s} className="text-yellow-400 text-sm">★</span>)}
                </div>
                <p className="text-stone-700 text-sm leading-relaxed mb-5">"{isUk ? r.textUk : r.textEn}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 border-2 border-yellow-300 flex items-center justify-center text-xl">
                    {r.emoji}
                  </div>
                  <span className="font-bold text-stone-800 text-sm">{isUk ? r.nameUk : r.nameEn}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. GIFT FINDER QUIZ (page section) ── */}
      <section className="bg-linear-to-br from-yellow-100 via-pink-100 to-sky-100 px-4 py-14">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1 rounded-full mb-3 uppercase tracking-wide">
              {isUk ? "🎁 Підбір подарунку" : "🎁 Gift Finder"}
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-stone-900 mb-3">
              {isUk ? "Допоможи мені обрати подарунок!" : "Help me find the perfect gift!"}
            </h2>
            <p className="text-stone-500">
              {isUk
                ? "Дай відповідь на 4 питання — ми підберемо ідеальну іграшку"
                : "Answer 4 quick questions — we'll find the perfect toy"}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10">
            {/* Progress bar */}
            {!quizDone && (
              <div className="flex items-center gap-2 mb-8 justify-center">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center gap-2">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-sm transition-all ${
                      quizStep > step ? "bg-green-400 text-green-900" :
                      quizStep === step ? "bg-yellow-400 text-yellow-900 scale-110 shadow-md" :
                      "bg-stone-100 text-stone-400"
                    }`}>
                      {quizStep > step ? "✓" : step}
                    </div>
                    {step < 4 && <div className={`w-8 h-1 rounded-full ${quizStep > step ? "bg-green-300" : "bg-stone-100"}`} />}
                  </div>
                ))}
              </div>
            )}

            {/* Step 1: Age */}
            {!quizDone && quizStep === 1 && (
              <div>
                <h3 className="text-xl font-black text-stone-800 mb-6 text-center">
                  {isUk ? "👶 Скільки років дитині?" : "👶 How old is the child?"}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {AGE_GROUPS.map((ag, i) => {
                    const colors = [
                      "border-sky-400 bg-sky-50 text-sky-800",
                      "border-green-400 bg-green-50 text-green-800",
                      "border-yellow-400 bg-yellow-50 text-yellow-800",
                      "border-pink-400 bg-pink-50 text-pink-800",
                      "border-purple-400 bg-purple-50 text-purple-800",
                    ];
                    const selected = quizAnswers.age === ag.id;
                    return (
                      <button
                        key={ag.id}
                        onClick={() => setQuizAnswers((prev) => ({ ...prev, age: ag.id }))}
                        className={`py-4 rounded-2xl border-2 font-bold text-sm transition-all hover:scale-105 ${
                          selected ? colors[i] + " shadow-md scale-105" : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"
                        }`}
                      >
                        {isUk ? ag.ukL : ag.enL}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Gender */}
            {!quizDone && quizStep === 2 && (
              <div>
                <h3 className="text-xl font-black text-stone-800 mb-6 text-center">
                  {isUk ? "👫 Для кого обираємо?" : "👫 Who is this for?"}
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: "boy", emoji: "👦", uk: "Хлопчик", en: "Boy", color: "border-sky-400 bg-sky-50 text-sky-800" },
                    { id: "girl", emoji: "👧", uk: "Дівчинка", en: "Girl", color: "border-pink-400 bg-pink-50 text-pink-800" },
                    { id: "any", emoji: "🌈", uk: "Не важливо", en: "Any", color: "border-yellow-400 bg-yellow-50 text-yellow-800" },
                  ].map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setQuizAnswers((prev) => ({ ...prev, gender: g.id }))}
                      className={`py-6 rounded-2xl border-2 font-bold text-sm transition-all hover:scale-105 flex flex-col items-center gap-2 ${
                        quizAnswers.gender === g.id ? g.color + " shadow-md scale-105" : "border-stone-200 bg-white text-stone-600"
                      }`}
                    >
                      <span className="text-3xl">{g.emoji}</span>
                      <span>{isUk ? g.uk : g.en}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Interests */}
            {!quizDone && quizStep === 3 && (
              <div>
                <h3 className="text-xl font-black text-stone-800 mb-6 text-center">
                  {isUk ? "🎯 Що цікавить дитину?" : "🎯 What are the child's interests?"}
                </h3>
                <p className="text-center text-stone-400 text-sm mb-4">
                  {isUk ? "Оберіть усі, що підходять" : "Select all that apply"}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {QUIZ_INTERESTS.map((interest) => {
                    const selected = quizAnswers.interests.includes(interest.id);
                    return (
                      <button
                        key={interest.id}
                        onClick={() => toggleQuizInterest(interest.id)}
                        className={`py-3 px-3 rounded-2xl border-2 font-semibold text-sm transition-all hover:scale-105 ${
                          selected
                            ? "border-yellow-400 bg-yellow-100 text-yellow-800 shadow-md scale-105"
                            : "border-stone-200 bg-white text-stone-600 hover:border-yellow-200 hover:bg-yellow-50"
                        }`}
                      >
                        {isUk ? interest.uk : interest.en}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 4: Budget */}
            {!quizDone && quizStep === 4 && (
              <div>
                <h3 className="text-xl font-black text-stone-800 mb-6 text-center">
                  {isUk ? "💰 Який бюджет?" : "💰 What's your budget?"}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: "500", label: "до 500 ₴", color: "border-green-400 bg-green-50 text-green-800" },
                    { id: "500-1500", label: "500–1500 ₴", color: "border-sky-400 bg-sky-50 text-sky-800" },
                    { id: "1500-3000", label: "1500–3000 ₴", color: "border-yellow-400 bg-yellow-50 text-yellow-800" },
                    { id: "3000+", label: "3000+ ₴", color: "border-pink-400 bg-pink-50 text-pink-800" },
                  ].map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setQuizAnswers((prev) => ({ ...prev, budget: b.id }))}
                      className={`py-5 rounded-2xl border-2 font-bold text-base transition-all hover:scale-105 ${
                        quizAnswers.budget === b.id ? b.color + " shadow-md scale-105" : "border-stone-200 bg-white text-stone-600"
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Results */}
            {quizDone && (
              <div>
                <div className="text-center mb-6">
                  <div className="text-5xl mb-3">🎉</div>
                  <h3 className="text-2xl font-black text-stone-900">
                    {isUk ? "Ми знайшли ідеальний подарунок!" : "We found the perfect gift!"}
                  </h3>
                  <p className="text-stone-400 text-sm mt-1">
                    {isUk ? "Ось наші рекомендації саме для вас:" : "Here are our recommendations for you:"}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {getQuizResults().length > 0 ? getQuizResults().map((product, idx) => (
                    <div key={product.id} className={`rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-md transition-shadow flex`}>
                      <div className={`w-20 shrink-0 ${CARD_GRADIENTS[idx % CARD_GRADIENTS.length]} flex items-center justify-center text-3xl`}>
                        {product.emoji}
                      </div>
                      <div className="p-3 flex-1 flex flex-col justify-between">
                        <div>
                          <p className="font-bold text-stone-900 text-xs leading-snug line-clamp-2">
                            {isUk ? product.nameUk : product.nameEn}
                          </p>
                          <p className="text-[10px] text-stone-400">{product.brand}</p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-black text-stone-900 text-sm">{product.price} ₴</span>
                          <button
                            onClick={() => addToCart(product.id)}
                            className="px-3 py-1 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold text-xs transition-colors"
                          >
                            {isUk ? "Додати" : "Add"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="col-span-2 text-center py-6 text-stone-400">
                      <p className="text-4xl mb-2">🤔</p>
                      <p>{isUk ? "Нічого не знайдено — спробуйте інші параметри" : "Nothing found — try different criteria"}</p>
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <button
                    onClick={resetQuiz}
                    className="px-6 py-2.5 rounded-full border-2 border-yellow-400 text-yellow-700 font-bold text-sm hover:bg-yellow-50 transition-colors"
                  >
                    {isUk ? "↺ Почати знову" : "↺ Start over"}
                  </button>
                </div>
              </div>
            )}

            {/* Navigation */}
            {!quizDone && (
              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={quizBack}
                  className={`px-5 py-2.5 rounded-full text-stone-500 font-semibold text-sm hover:text-stone-700 transition-colors ${quizStep === 1 ? "invisible" : ""}`}
                >
                  ← {isUk ? "Назад" : "Back"}
                </button>
                <button
                  onClick={quizNext}
                  disabled={
                    (quizStep === 1 && !quizAnswers.age) ||
                    (quizStep === 2 && !quizAnswers.gender) ||
                    (quizStep === 4 && !quizAnswers.budget)
                  }
                  className="px-8 py-3 rounded-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-stone-200 disabled:text-stone-400 text-yellow-900 font-black text-sm transition-all shadow-md hover:shadow-lg disabled:shadow-none"
                >
                  {quizStep === 4 ? (isUk ? "🎁 Знайти!" : "🎁 Find!") : (isUk ? "Далі →" : "Next →")}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 6. FOOTER ── */}
      <footer className="bg-linear-to-br from-yellow-50 via-white to-sky-50 border-t border-yellow-100">
        {/* Newsletter */}
        <div className="bg-linear-to-r from-yellow-400 to-orange-400 px-4 py-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-white font-black text-xl mb-1">
                🎁 {isUk ? "Отримуй знижки першим!" : "Get deals first!"}
              </h3>
              <p className="text-yellow-100 text-sm">
                {isUk ? "Підпишись та отримай купон -10% на перше замовлення" : "Subscribe and get a 10% coupon for your first order"}
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto max-w-md">
              <input
                type="email"
                placeholder={isUk ? "твій@email.com" : "your@email.com"}
                className="flex-1 px-5 py-3 rounded-full border-0 focus:outline-none text-sm text-stone-700 placeholder-stone-400"
              />
              <button className="shrink-0 px-6 py-3 rounded-full bg-stone-900 text-white font-bold text-sm hover:bg-stone-800 transition-colors">
                {isUk ? "Підписатись" : "Subscribe"}
              </button>
            </div>
          </div>
        </div>

        {/* Main footer */}
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🧸</span>
              <span className="text-xl font-black bg-linear-to-r from-yellow-500 via-pink-500 to-sky-500 bg-clip-text text-transparent">ToyLand</span>
            </div>
            <p className="text-stone-500 text-sm mb-4">
              {isUk
                ? "Сертифіковані іграшки для щасливого та безпечного дитинства. Понад 2000 товарів."
                : "Certified toys for a happy and safe childhood. Over 2,000 products."}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["EN 71", "CE", "BPA Free", "ASTM"].map((cert) => (
                <span key={cert} className="text-[10px] font-bold px-2 py-1 rounded-lg bg-green-100 text-green-700 border border-green-200">
                  ✓ {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Catalog */}
          <div>
            <h4 className="font-black text-stone-800 mb-3 text-sm uppercase tracking-wide">
              {isUk ? "Каталог" : "Catalog"}
            </h4>
            <ul className="space-y-2">
              {AGE_GROUPS.map((ag) => (
                <li key={ag.id}>
                  <button
                    onClick={() => { setAgeFilter(ag.id); document.getElementById("product-grid")?.scrollIntoView({ behavior: "smooth" }); }}
                    className="text-stone-500 hover:text-yellow-600 text-sm transition-colors"
                  >
                    {isUk ? ag.ukL : ag.enL}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-black text-stone-800 mb-3 text-sm uppercase tracking-wide">
              {isUk ? "Інфо" : "Info"}
            </h4>
            <ul className="space-y-2 text-stone-500 text-sm">
              {(isUk
                ? ["🚚 Доставка", "↩️ Повернення", "❓ FAQ", "🔒 Безпека", "📋 Сертифікати"]
                : ["🚚 Delivery", "↩️ Returns", "❓ FAQ", "🔒 Safety", "📋 Certificates"]
              ).map((item) => (
                <li key={item}><button className="hover:text-yellow-600 transition-colors">{item}</button></li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-black text-stone-800 mb-3 text-sm uppercase tracking-wide">
              {isUk ? "Контакти" : "Contacts"}
            </h4>
            <ul className="space-y-2 text-stone-500 text-sm">
              <li>📞 +380 (44) 123-45-67</li>
              <li>✉️ hello@toyland.ua</li>
              <li>📍 {isUk ? "Київ, вул. Іграшкова 1" : "Kyiv, Toyland St. 1"}</li>
              <li className="flex gap-2 pt-2">
                {["📘", "📸", "💬"].map((icon, i) => (
                  <button key={i} className="w-8 h-8 rounded-full bg-stone-100 hover:bg-yellow-100 flex items-center justify-center text-sm transition-colors">
                    {icon}
                  </button>
                ))}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-yellow-100 bg-white px-4 py-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 flex-wrap">
            <p className="text-stone-400 text-xs">
              © 2025 ToyLand · {isUk ? "Демо — Codeworth portfolio" : "Demo — Codeworth portfolio"}
            </p>
            {/* Payment icons */}
            <div className="flex items-center gap-2">
              {["VISA", "MC", "LiqPay"].map((pay) => (
                <span key={pay} className="px-3 py-1 rounded-lg bg-stone-100 text-stone-500 text-[10px] font-bold border border-stone-200">
                  {pay}
                </span>
              ))}
            </div>
            {/* Safety certs row */}
            <div className="flex items-center gap-1.5">
              {["EN 71", "CE", "BPA Free"].map((cert) => (
                <span key={cert} className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-green-100 text-green-600 border border-green-200">
                  ✓ {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── 7. MINI-CART DRAWER ── */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div className="flex-1 bg-black/30 backdrop-blur-sm" onClick={() => setCartOpen(false)} />

          {/* Panel */}
          <div className="w-full max-w-sm bg-white h-full flex flex-col shadow-2xl">
            {/* Header */}
            <div className="bg-yellow-400 px-5 py-4 flex items-center justify-between">
              <h3 className="font-black text-yellow-900 text-lg">
                🛒 {isUk ? "Кошик" : "Cart"}
                {cartCount > 0 && <span className="ml-2 bg-yellow-900 text-yellow-100 text-xs rounded-full px-2 py-0.5">{cartCount}</span>}
              </h3>
              <button onClick={() => setCartOpen(false)} className="w-8 h-8 rounded-full bg-yellow-300 flex items-center justify-center text-yellow-900 font-bold hover:bg-yellow-200">
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-10">
                  <span className="text-7xl mb-4">🛒</span>
                  <p className="font-bold text-stone-700 text-lg mb-2">
                    {isUk ? "Кошик порожній" : "Your cart is empty"}
                  </p>
                  <p className="text-stone-400 text-sm mb-6">
                    {isUk ? "Додайте іграшки, щоб зробити когось щасливим!" : "Add toys to make someone happy!"}
                  </p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="px-6 py-3 rounded-full bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold text-sm transition-colors"
                  >
                    {isUk ? "🎯 Обрати іграшки" : "🎯 Browse toys"}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {cart.map((item) => {
                    const product = PRODUCTS.find((p) => p.id === item.id);
                    if (!product) return null;
                    return (
                      <div key={item.id} className="flex gap-3 bg-stone-50 rounded-2xl p-3 border border-stone-100">
                        <div className={`w-14 h-14 rounded-xl ${CARD_GRADIENTS[item.id % CARD_GRADIENTS.length]} flex items-center justify-center text-2xl shrink-0`}>
                          {product.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-stone-900 text-xs leading-snug line-clamp-2">
                            {isUk ? product.nameUk : product.nameEn}
                          </p>
                          <p className="text-[10px] text-stone-400">{product.brand}</p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1.5">
                              <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 rounded-full bg-stone-200 hover:bg-stone-300 flex items-center justify-center text-xs font-bold text-stone-600">−</button>
                              <span className="text-sm font-bold text-stone-800 w-5 text-center">{item.qty}</span>
                              <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 rounded-full bg-yellow-300 hover:bg-yellow-400 flex items-center justify-center text-xs font-bold text-yellow-900">+</button>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-black text-stone-900 text-sm">{product.price * item.qty} ₴</span>
                              <button onClick={() => removeFromCart(item.id)} className="text-stone-300 hover:text-pink-400 transition-colors text-xs">✕</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-stone-100 px-4 py-4 space-y-3">
                {/* Gift wrap */}
                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-2xl bg-green-50 border border-green-200 hover:bg-green-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={giftWrap}
                    onChange={(e) => setGiftWrap(e.target.checked)}
                    className="w-4 h-4 rounded accent-green-500"
                  />
                  <div>
                    <p className="text-green-800 font-bold text-sm">
                      🎁 {isUk ? "Безкоштовна подарункова упаковка" : "Free gift wrap"}
                    </p>
                    <p className="text-green-600 text-xs">
                      {isUk ? "Додамо красиву упаковку з листівкою" : "Beautiful wrapping + greeting card"}
                    </p>
                  </div>
                </label>

                {/* Promo code */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder={isUk ? "Промокод..." : "Promo code..."}
                    className="flex-1 px-4 py-2 rounded-xl border-2 border-stone-200 focus:border-yellow-400 focus:outline-none text-sm"
                  />
                  <button className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold text-sm transition-colors">
                    {isUk ? "OK" : "Apply"}
                  </button>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between py-2">
                  <span className="text-stone-600 font-semibold">{isUk ? "Разом:" : "Total:"}</span>
                  <span className="text-2xl font-black text-stone-900">{cartTotal} ₴</span>
                </div>

                {/* Checkout button */}
                <button className="w-full py-4 rounded-2xl bg-linear-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-yellow-900 font-black text-base shadow-lg shadow-yellow-200 transition-all hover:scale-105">
                  {isUk ? "🛒 Оформити замовлення" : "🛒 Checkout"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── PRODUCT DETAIL MODAL */}
      {selectedProduct && (() => {
        const product = PRODUCTS.find(p => p.id === selectedProduct)!;
        const inCart = cart.some(c => c.id === product.id);
        const inWishlist = wishlist.includes(product.id);
        const gradient = CARD_GRADIENTS[product.id % CARD_GRADIENTS.length];
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedProduct(null)}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              {/* Image area */}
              <div className={`relative h-52 ${gradient} rounded-t-3xl flex items-center justify-center`}>
                <span className="text-8xl">{product.emoji}</span>
                <span className="absolute top-4 left-4 bg-white/80 text-stone-700 text-xs font-bold px-3 py-1 rounded-full">
                  {AGE_GROUPS.find(a => a.id === product.age)?.[isUk ? "ukL" : "enL"] ?? product.age}
                </span>
                <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-stone-700 font-bold hover:bg-white">✕</button>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <div>
                  <p className="text-sky-600 text-xs font-semibold">{isUk ? product.catUk : product.catEn}</p>
                  <h2 className="font-black text-stone-900 text-xl mt-1">{isUk ? product.nameUk : product.nameEn}</h2>
                  <p className="text-stone-400 text-sm">{product.brand}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} className={`w-4 h-4 ${s <= Math.round(product.rating) ? "text-yellow-400" : "text-stone-200"}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-stone-400 text-sm">({product.reviews} {isUk ? "відгуків" : "reviews"})</span>
                </div>
                {/* Develops */}
                <div>
                  <p className="text-xs text-stone-500 font-medium mb-2">{isUk ? "Що розвиває:" : "Develops:"}</p>
                  <div className="flex flex-wrap gap-2">
                    {(isUk ? product.developsUk : product.developsEn).map((skill, si) => (
                      <span key={si} className={`text-xs font-semibold px-3 py-1 rounded-full ${DEVELOPS_COLORS[si % DEVELOPS_COLORS.length]}`}>{skill}</span>
                    ))}
                  </div>
                </div>
                {/* Certs */}
                <div className="flex flex-wrap gap-2">
                  {product.certs.map(cert => (
                    <span key={cert} className="text-xs font-bold px-2 py-0.5 rounded-md bg-green-100 text-green-700 border border-green-200">✓ {cert}</span>
                  ))}
                </div>
                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-black text-stone-900">{product.price} ₴</span>
                  {product.oldPrice && <span className="text-stone-400 line-through text-sm">{product.oldPrice} ₴</span>}
                </div>
                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => { addToCart(product.id); setSelectedProduct(null); setCartOpen(true); }}
                    className={`flex-1 py-3 rounded-2xl font-black text-sm transition-all ${inCart ? "bg-stone-100 text-stone-400" : "bg-yellow-400 hover:bg-yellow-500 text-yellow-900 shadow-lg shadow-yellow-200 hover:scale-105"}`}
                  >
                    {inCart ? (isUk ? "✓ В кошику" : "✓ In cart") : (isUk ? "🛒 Додати в кошик" : "🛒 Add to cart")}
                  </button>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center text-lg transition-colors ${inWishlist ? "border-pink-400 bg-pink-50" : "border-stone-200 hover:border-pink-300"}`}
                  >
                    {inWishlist ? "❤️" : "🤍"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── QUIZ MODAL (when opened from nav) ── */}
      {quizOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setQuizOpen(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Modal header */}
            <div className="sticky top-0 bg-white rounded-t-3xl border-b border-stone-100 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h3 className="font-black text-stone-900 text-lg">
                  🎁 {isUk ? "Підбір подарунку" : "Gift Finder"}
                </h3>
                {!quizDone && (
                  <p className="text-stone-400 text-xs">{isUk ? `Крок ${quizStep} з 4` : `Step ${quizStep} of 4`}</p>
                )}
              </div>
              <button onClick={() => setQuizOpen(false)} className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 font-bold">
                ✕
              </button>
            </div>

            <div className="p-6">
              {/* Progress */}
              {!quizDone && (
                <div className="flex items-center gap-2 mb-6 justify-center">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs transition-all ${
                        quizStep > step ? "bg-green-400 text-green-900" :
                        quizStep === step ? "bg-yellow-400 text-yellow-900 shadow-md" :
                        "bg-stone-100 text-stone-400"
                      }`}>
                        {quizStep > step ? "✓" : step}
                      </div>
                      {step < 4 && <div className={`w-6 h-1 rounded-full ${quizStep > step ? "bg-green-300" : "bg-stone-100"}`} />}
                    </div>
                  ))}
                </div>
              )}

              {/* Step 1: Age */}
              {!quizDone && quizStep === 1 && (
                <div>
                  <h4 className="text-lg font-black text-stone-800 mb-4 text-center">
                    {isUk ? "👶 Скільки років дитині?" : "👶 How old is the child?"}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {AGE_GROUPS.map((ag) => (
                      <button
                        key={ag.id}
                        onClick={() => setQuizAnswers((prev) => ({ ...prev, age: ag.id }))}
                        className={`py-3 rounded-2xl border-2 font-bold text-sm transition-all hover:scale-105 ${
                          quizAnswers.age === ag.id
                            ? "border-yellow-400 bg-yellow-100 text-yellow-800 shadow-md"
                            : "border-stone-200 bg-white text-stone-600"
                        }`}
                      >
                        {isUk ? ag.ukL : ag.enL}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Gender */}
              {!quizDone && quizStep === 2 && (
                <div>
                  <h4 className="text-lg font-black text-stone-800 mb-4 text-center">
                    {isUk ? "👫 Для кого обираємо?" : "👫 Who is this for?"}
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "boy", emoji: "👦", uk: "Хлопчик", en: "Boy", color: "border-sky-400 bg-sky-50 text-sky-800" },
                      { id: "girl", emoji: "👧", uk: "Дівчинка", en: "Girl", color: "border-pink-400 bg-pink-50 text-pink-800" },
                      { id: "any", emoji: "🌈", uk: "Не важливо", en: "Any", color: "border-yellow-400 bg-yellow-50 text-yellow-800" },
                    ].map((g) => (
                      <button
                        key={g.id}
                        onClick={() => setQuizAnswers((prev) => ({ ...prev, gender: g.id }))}
                        className={`py-5 rounded-2xl border-2 font-bold text-xs transition-all hover:scale-105 flex flex-col items-center gap-1 ${
                          quizAnswers.gender === g.id ? g.color + " shadow-md" : "border-stone-200 bg-white text-stone-600"
                        }`}
                      >
                        <span className="text-2xl">{g.emoji}</span>
                        <span>{isUk ? g.uk : g.en}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Interests */}
              {!quizDone && quizStep === 3 && (
                <div>
                  <h4 className="text-lg font-black text-stone-800 mb-4 text-center">
                    {isUk ? "🎯 Що цікавить дитину?" : "🎯 What are the interests?"}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {QUIZ_INTERESTS.map((interest) => {
                      const selected = quizAnswers.interests.includes(interest.id);
                      return (
                        <button
                          key={interest.id}
                          onClick={() => toggleQuizInterest(interest.id)}
                          className={`py-2.5 px-3 rounded-xl border-2 font-semibold text-sm transition-all ${
                            selected
                              ? "border-yellow-400 bg-yellow-100 text-yellow-800 shadow-sm"
                              : "border-stone-200 bg-white text-stone-600 hover:border-yellow-200"
                          }`}
                        >
                          {isUk ? interest.uk : interest.en}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 4: Budget */}
              {!quizDone && quizStep === 4 && (
                <div>
                  <h4 className="text-lg font-black text-stone-800 mb-4 text-center">
                    {isUk ? "💰 Який бюджет?" : "💰 What's your budget?"}
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: "500", label: "до 500 ₴", color: "border-green-400 bg-green-50 text-green-800" },
                      { id: "500-1500", label: "500–1500 ₴", color: "border-sky-400 bg-sky-50 text-sky-800" },
                      { id: "1500-3000", label: "1500–3000 ₴", color: "border-yellow-400 bg-yellow-50 text-yellow-800" },
                      { id: "3000+", label: "3000+ ₴", color: "border-pink-400 bg-pink-50 text-pink-800" },
                    ].map((b) => (
                      <button
                        key={b.id}
                        onClick={() => setQuizAnswers((prev) => ({ ...prev, budget: b.id }))}
                        className={`py-4 rounded-2xl border-2 font-bold text-sm transition-all hover:scale-105 ${
                          quizAnswers.budget === b.id ? b.color + " shadow-md" : "border-stone-200 bg-white text-stone-600"
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quiz Results */}
              {quizDone && (
                <div>
                  <div className="text-center mb-5">
                    <div className="text-4xl mb-2">🎉</div>
                    <h4 className="text-xl font-black text-stone-900">
                      {isUk ? "Ідеальний подарунок знайдено!" : "Perfect gift found!"}
                    </h4>
                  </div>
                  <div className="flex flex-col gap-3 mb-5">
                    {getQuizResults().length > 0 ? getQuizResults().map((product, idx) => (
                      <div key={product.id} className="flex gap-3 bg-stone-50 rounded-2xl p-3 border border-stone-100">
                        <div className={`w-14 h-14 rounded-xl ${CARD_GRADIENTS[idx % CARD_GRADIENTS.length]} flex items-center justify-center text-2xl shrink-0`}>
                          {product.emoji}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-stone-900 text-sm line-clamp-2">
                            {isUk ? product.nameUk : product.nameEn}
                          </p>
                          <p className="text-stone-400 text-xs">{product.brand}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-black text-stone-900">{product.price} ₴</span>
                            <button
                              onClick={() => { addToCart(product.id); setQuizOpen(false); setCartOpen(true); }}
                              className="px-4 py-1.5 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold text-xs transition-colors"
                            >
                              {isUk ? "Додати" : "Add"}
                            </button>
                          </div>
                        </div>
                      </div>
                    )) : (
                      <div className="text-center py-4 text-stone-400">
                        <p className="text-3xl mb-2">🤔</p>
                        <p className="text-sm">{isUk ? "Нічого не знайдено" : "Nothing found"}</p>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={resetQuiz}
                    className="w-full py-2.5 rounded-2xl border-2 border-yellow-400 text-yellow-700 font-bold text-sm hover:bg-yellow-50 transition-colors"
                  >
                    ↺ {isUk ? "Почати знову" : "Start over"}
                  </button>
                </div>
              )}

              {/* Nav buttons */}
              {!quizDone && (
                <div className="flex items-center justify-between mt-6">
                  <button
                    onClick={quizBack}
                    className={`px-5 py-2.5 rounded-full text-stone-500 font-semibold text-sm hover:text-stone-700 ${quizStep === 1 ? "invisible" : ""}`}
                  >
                    ← {isUk ? "Назад" : "Back"}
                  </button>
                  <button
                    onClick={quizNext}
                    disabled={
                      (quizStep === 1 && !quizAnswers.age) ||
                      (quizStep === 2 && !quizAnswers.gender) ||
                      (quizStep === 4 && !quizAnswers.budget)
                    }
                    className="px-7 py-2.5 rounded-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-stone-200 disabled:text-stone-400 text-yellow-900 font-black text-sm transition-all shadow-md disabled:shadow-none"
                  >
                    {quizStep === 4 ? (isUk ? "🎁 Знайти!" : "🎁 Find!") : (isUk ? "Далі →" : "Next →")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
