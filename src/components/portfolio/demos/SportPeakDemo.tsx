"use client";

import { useState } from "react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

// ─── Data ──────────────────────────────────────────────────────────────────────

const SPORTS_FILTERS = [
  { id: "run", ukL: "🏃 Біг", enL: "🏃 Running" },
  { id: "gym", ukL: "🏋️ Зал", enL: "🏋️ Gym" },
  { id: "bike", ukL: "🚴 Велоспорт", enL: "🚴 Cycling" },
  { id: "swim", ukL: "🏊 Плавання", enL: "🏊 Swimming" },
  { id: "combat", ukL: "🥊 Єдиноборства", enL: "🥊 Combat" },
  { id: "outdoor", ukL: "🏔 Outdoor", enL: "🏔 Outdoor" },
];

const PRODUCTS = [
  { id: 1, nameUk: "Nike Air Zoom Pegasus 40", nameEn: "Nike Air Zoom Pegasus 40", brand: "Nike", sport: "run", catUk: "Взуття", catEn: "Footwear", price: 3490, oldPrice: 4200, badge: "ХІТ", specWeightUk: "280г", specWeightEn: "280g", specMat: "Mesh+TPU", specLevel: "Середній", rating: 4.9, reviews: 318, emoji: "👟" },
  { id: 2, nameUk: "Adidas Ultraboost 23", nameEn: "Adidas Ultraboost 23", brand: "Adidas", sport: "run", catUk: "Взуття", catEn: "Footwear", price: 4890, oldPrice: null, badge: "НОВИНКА", specWeightUk: "310г", specWeightEn: "310g", specMat: "Primeknit", specLevel: "Просунутий", rating: 4.8, reviews: 201, emoji: "👟" },
  { id: 3, nameUk: "Пояс для важкої атлетики", nameEn: "Weightlifting Belt Pro", brand: "Harbinger", sport: "gym", catUk: "Аксесуари", catEn: "Accessories", price: 890, oldPrice: 1190, badge: "ЗНИЖКА", specWeightUk: "620г", specWeightEn: "620g", specMat: "Шкіра", specLevel: "Проф", rating: 4.7, reviews: 145, emoji: "🏋️" },
  { id: 4, nameUk: "Компресійні легінси", nameEn: "Compression Leggings", brand: "Nike", sport: "gym", catUk: "Одяг", catEn: "Clothing", price: 1290, oldPrice: null, badge: null, specWeightUk: "180г", specWeightEn: "180g", specMat: "Dri-FIT", specLevel: "Будь-який", rating: 4.6, reviews: 267, emoji: "🩱" },
  { id: 5, nameUk: "Велошолом Giro Agilis", nameEn: "Giro Agilis Helmet", brand: "Giro", sport: "bike", catUk: "Захист", catEn: "Protection", price: 2890, oldPrice: null, badge: "ТОП БРЕНД", specWeightUk: "290г", specWeightEn: "290g", specMat: "EPS+Polycarbonate", specLevel: "Середній", rating: 4.9, reviews: 89, emoji: "⛑️" },
  { id: 6, nameUk: "Окуляри для плавання Speedo", nameEn: "Speedo Futura Goggles", brand: "Speedo", sport: "swim", catUk: "Аксесуари", catEn: "Accessories", price: 690, oldPrice: 890, badge: "ЗНИЖКА", specWeightUk: "45г", specWeightEn: "45g", specMat: "Silicone+Polycarbonate", specLevel: "Будь-який", rating: 4.5, reviews: 412, emoji: "🥽" },
  { id: 7, nameUk: "Рукавиці боксерські Everlast", nameEn: "Everlast Boxing Gloves", brand: "Everlast", sport: "combat", catUk: "Єдиноборства", catEn: "Combat", price: 1490, oldPrice: 1890, badge: "ЗНИЖКА", specWeightUk: "340г (пара)", specWeightEn: "340g (pair)", specMat: "Synthetic leather", specLevel: "Початківець", rating: 4.7, reviews: 178, emoji: "🥊" },
  { id: 8, nameUk: "Трекінгові черевики Salomon", nameEn: "Salomon X Ultra 4", brand: "Salomon", sport: "outdoor", catUk: "Взуття", catEn: "Footwear", price: 4290, oldPrice: null, badge: "ТОП БРЕНД", specWeightUk: "360г", specWeightEn: "360g", specMat: "Gore-Tex", specLevel: "Просунутий", rating: 4.8, reviews: 134, emoji: "🥾" },
  { id: 9, nameUk: "Рюкзак-гідратор Osprey Duro 6", nameEn: "Osprey Duro 6 Hydration Pack", brand: "Osprey", sport: "run", catUk: "Аксесуари", catEn: "Accessories", price: 3190, oldPrice: null, badge: "ТОП БРЕНД", specWeightUk: "430г", specWeightEn: "430g", specMat: "Nylon 210D", specLevel: "Просунутий", rating: 4.8, reviews: 76, emoji: "🎒" },
  { id: 10, nameUk: "Штанга наборна 60 кг York Barbell", nameEn: "York Barbell 60 kg Barbell Set", brand: "York", sport: "gym", catUk: "Обладнання", catEn: "Equipment", price: 6890, oldPrice: 8490, badge: "ЗНИЖКА", specWeightUk: "60кг", specWeightEn: "60kg", specMat: "Сталь", specLevel: "Середній", rating: 4.7, reviews: 112, emoji: "🏋️" },
  { id: 11, nameUk: "Гідрокостюм Speedo Fastskin 3", nameEn: "Speedo Fastskin 3 Wetsuit", brand: "Speedo", sport: "swim", catUk: "Одяг", catEn: "Clothing", price: 4490, oldPrice: null, badge: "НОВИНКА", specWeightUk: "380г", specWeightEn: "380g", specMat: "LZR Racer", specLevel: "Проф", rating: 4.9, reviews: 43, emoji: "🩱" },
  { id: 12, nameUk: "Захист для MMA RDX Full Body", nameEn: "RDX MMA Full Body Protector", brand: "RDX", sport: "combat", catUk: "Захист", catEn: "Protection", price: 2190, oldPrice: 2890, badge: "ЗНИЖКА", specWeightUk: "1.2кг", specWeightEn: "1.2kg", specMat: "EVA Foam", specLevel: "Початківець", rating: 4.6, reviews: 88, emoji: "🥋" },
];

const BUNDLE_SPORTS = [
  { id: "run", ukL: "🏃 Біг", enL: "🏃 Running" },
  { id: "gym", ukL: "🏋️ Зал", enL: "🏋️ Gym" },
  { id: "bike", ukL: "🚴 Велоспорт", enL: "🚴 Cycling" },
  { id: "combat", ukL: "🥊 Єдиноборства", enL: "🥊 Combat" },
];

// ─── Bundle step option data ────────────────────────────────────────────────────

type BundleSlot = "footwear" | "top" | "bottom" | "accessory";

interface BundleOption {
  id: number;
  emoji: string;
  ukName: string;
  enName: string;
  price: number;
  slot: BundleSlot;
  sports: string[];
}

const BUNDLE_OPTIONS: BundleOption[] = [
  { id: 101, emoji: "👟", ukName: "Nike Air Zoom Pegasus 40", enName: "Nike Air Zoom Pegasus 40", price: 3490, slot: "footwear", sports: ["run"] },
  { id: 102, emoji: "👟", ukName: "Adidas Ultraboost 23", enName: "Adidas Ultraboost 23", price: 4890, slot: "footwear", sports: ["run"] },
  { id: 103, emoji: "🥿", ukName: "Nike Metcon 8 (тренування)", enName: "Nike Metcon 8 (Training)", price: 2990, slot: "footwear", sports: ["gym"] },
  { id: 104, emoji: "🥿", ukName: "Adidas Powerlift 5", enName: "Adidas Powerlift 5", price: 3290, slot: "footwear", sports: ["gym"] },
  { id: 105, emoji: "🚲", ukName: "Shimano RC3 Велотуфлі", enName: "Shimano RC3 Cycling Shoes", price: 3890, slot: "footwear", sports: ["bike"] },
  { id: 106, emoji: "🥾", ukName: "Salomon Speedcross 6", enName: "Salomon Speedcross 6", price: 3790, slot: "footwear", sports: ["combat"] },
  { id: 201, emoji: "👕", ukName: "Nike Dri-FIT Run Division", enName: "Nike Dri-FIT Run Division", price: 890, slot: "top", sports: ["run"] },
  { id: 202, emoji: "👕", ukName: "Adidas Adizero Running Tee", enName: "Adidas Adizero Running Tee", price: 990, slot: "top", sports: ["run"] },
  { id: 203, emoji: "👕", ukName: "Gymshark Flex Training Top", enName: "Gymshark Flex Training Top", price: 1290, slot: "top", sports: ["gym"] },
  { id: 204, emoji: "👕", ukName: "Under Armour Seamless", enName: "Under Armour Seamless Top", price: 1190, slot: "top", sports: ["gym"] },
  { id: 205, emoji: "🚴", ukName: "Castelli Aero Race Jersey", enName: "Castelli Aero Race Jersey", price: 2490, slot: "top", sports: ["bike"] },
  { id: 206, emoji: "👕", ukName: "Everlast Pro Combat Rash Guard", enName: "Everlast Pro Combat Rash Guard", price: 1690, slot: "top", sports: ["combat"] },
  { id: 301, emoji: "🩳", ukName: "Nike Run Division Shorts 5\"", enName: "Nike Run Division Shorts 5\"", price: 890, slot: "bottom", sports: ["run"] },
  { id: 302, emoji: "🩱", ukName: "Gymshark Flex Leggings", enName: "Gymshark Flex Leggings", price: 1490, slot: "bottom", sports: ["gym"] },
  { id: 303, emoji: "🩳", ukName: "Adidas Terrex Shorts", enName: "Adidas Terrex Shorts", price: 1190, slot: "bottom", sports: ["bike"] },
  { id: 304, emoji: "🩳", ukName: "Everlast MMA Fight Shorts", enName: "Everlast MMA Fight Shorts", price: 1290, slot: "bottom", sports: ["combat"] },
  { id: 401, emoji: "⌚", ukName: "Garmin Forerunner 55", enName: "Garmin Forerunner 55", price: 4290, slot: "accessory", sports: ["run"] },
  { id: 402, emoji: "🧴", ukName: "Пляшка для води Hydro Flask", enName: "Hydro Flask Water Bottle", price: 890, slot: "accessory", sports: ["run", "gym", "bike", "combat"] },
  { id: 403, emoji: "🏋️", ukName: "Пояс Harbinger Pro", enName: "Harbinger Pro Belt", price: 890, slot: "accessory", sports: ["gym"] },
  { id: 404, emoji: "🚴", ukName: "Велокомп'ютер Wahoo ELEMNT", enName: "Wahoo ELEMNT Bike Computer", price: 5490, slot: "accessory", sports: ["bike"] },
  { id: 405, emoji: "🥊", ukName: "Капа TITLE Classic", enName: "TITLE Classic Mouthguard", price: 390, slot: "accessory", sports: ["combat"] },
];

const BRANDS = [
  { name: "Nike", emoji: "✔️", tagUk: "Офіційний партнер", tagEn: "Official partner", color: "bg-black text-white" },
  { name: "Adidas", emoji: "3️⃣", tagUk: "Офіційний партнер", tagEn: "Official partner", color: "bg-black text-white" },
  { name: "Gymshark", emoji: "💪", tagUk: "Преміум бренд", tagEn: "Premium brand", color: "bg-zinc-800 text-white" },
  { name: "Salomon", emoji: "⛰️", tagUk: "Outdoor лідер", tagEn: "Outdoor leader", color: "bg-green-900 text-white" },
  { name: "Speedo", emoji: "🏊", tagUk: "Плавання №1", tagEn: "Swimming #1", color: "bg-sky-900 text-white" },
  { name: "Garmin", emoji: "⌚", tagUk: "GPS & Fitness", tagEn: "GPS & Fitness", color: "bg-blue-950 text-white" },
];

const TESTIMONIALS = [
  { nameUk: "Олексій К., марафонець", nameEn: "Oleksiy K., marathoner", textUk: "Купив Nike Pegasus та Garmin — за 3 тижні пробіг нову дистанцію. Доставка наступного дня, все оригінальне.", textEn: "Got Nike Pegasus and Garmin — ran a new PB in 3 weeks. Next-day delivery, all genuine.", stars: 5, emoji: "🏃" },
  { nameUk: "Марина Д., CrossFit тренер", nameEn: "Marina D., CrossFit coach", textUk: "Замовляю для всього залу. Великий вибір, знижки на комплект реально виходить вигідніше.", textEn: "Order for the whole gym. Great selection, bundle discount is genuinely better value.", stars: 5, emoji: "🏋️" },
  { nameUk: "Сергій Л., велосипедист", nameEn: "Serhiy L., cyclist", textUk: "Шолом Giro та велокомп'ютер Wahoo прийшли за добу. Консультант підібрав розмір — все ідеально.", textEn: "Giro helmet and Wahoo computer arrived in one day. Consultant helped with sizing — perfect fit.", stars: 5, emoji: "🚴" },
];

// ─── Component ─────────────────────────────────────────────────────────────────

export function SportPeakDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [sportFilter, setSportFilter] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [compareList, setCompareList] = useState<number[]>([]);
  const [cart, setCart] = useState<{ id: number; qty: number }[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [bundleOpen, setBundleOpen] = useState(false);
  const [bundleStep, setBundleStep] = useState(1);
  const [bundleSport, setBundleSport] = useState("");
  const [bundleItems, setBundleItems] = useState<{ footwear: number | null; top: number | null; bottom: number | null; accessory: number | null }>({ footwear: null, top: null, bottom: null, accessory: null });
  const [formOpen, setFormOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [compareOpen, setCompareOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  // Derived data
  const filteredProducts = PRODUCTS
    .filter(p => sportFilter === "all" || p.sport === sportFilter)
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return b.reviews - a.reviews; // popular
    });

  const cartTotal = cart.reduce((sum, ci) => {
    const p = PRODUCTS.find(p => p.id === ci.id);
    return sum + (p ? p.price * ci.qty : 0);
  }, 0);

  const FREE_DELIVERY_THRESHOLD = 2000;
  const toFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - cartTotal);

  function addToCart(id: number) {
    setCart(prev => {
      const existing = prev.find(c => c.id === id);
      if (existing) return prev.map(c => c.id === id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { id, qty: 1 }];
    });
    setCartOpen(true);
  }

  function removeFromCart(id: number) {
    setCart(prev => prev.filter(c => c.id !== id));
  }

  function changeQty(id: number, delta: number) {
    setCart(prev =>
      prev.map(c => c.id === id ? { ...c, qty: Math.max(1, c.qty + delta) } : c)
    );
  }

  function toggleCompare(id: number) {
    setCompareList(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  }

  function bundleSelectItem(slot: BundleSlot, id: number) {
    setBundleItems(prev => ({ ...prev, [slot]: prev[slot] === id ? null : id }));
  }

  function getBundleTotal() {
    const slots: BundleSlot[] = ["footwear", "top", "bottom", "accessory"];
    return slots.reduce((sum, slot) => {
      const opt = BUNDLE_OPTIONS.find(o => o.id === bundleItems[slot]);
      return sum + (opt ? opt.price : 0);
    }, 0);
  }

  function addBundleToCart() {
    const slots: BundleSlot[] = ["footwear", "top", "bottom", "accessory"];
    slots.forEach(slot => {
      if (bundleItems[slot]) addToCart(bundleItems[slot]!);
    });
    setBundleOpen(false);
    setBundleStep(1);
    setBundleSport("");
    setBundleItems({ footwear: null, top: null, bottom: null, accessory: null });
    setCartOpen(true);
  }

  function resetBundle() {
    setBundleOpen(false);
    setBundleStep(1);
    setBundleSport("");
    setBundleItems({ footwear: null, top: null, bottom: null, accessory: null });
  }

  const bundleFilteredOptions = (slot: BundleSlot) =>
    BUNDLE_OPTIONS.filter(o => o.slot === slot && (bundleSport === "" || o.sports.includes(bundleSport)));

  const bundleDiscount = Math.round(getBundleTotal() * 0.1);
  const bundleFinalPrice = getBundleTotal() - bundleDiscount;

  const compareProducts = PRODUCTS.filter(p => compareList.includes(p.id));

  const badgeColor = (badge: string | null) => {
    if (!badge) return "";
    if (badge === "ХІТ" || badge === "НОВИНКА") return "bg-red-600 text-white";
    if (badge === "ЗНИЖКА") return "bg-orange-500 text-white";
    return "bg-zinc-700 text-white";
  };

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen font-sans relative overflow-x-hidden">

      {/* ── 1. STICKY DARK NAV ─────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-zinc-950 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xl font-black tracking-tight">
              ⚡ SPORT<span className="text-red-600">PEAK</span>
            </span>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-zinc-300">
            <button className="hover:text-white transition-colors">{isUk ? "Каталог" : "Catalog"}</button>
            <button className="hover:text-white transition-colors">{isUk ? "Бренди" : "Brands"}</button>
            <button className="hover:text-white transition-colors">{isUk ? "Акції" : "Deals"}</button>
            <button className="hover:text-white transition-colors">{isUk ? "Блог" : "Blog"}</button>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 shrink-0">
            {compareList.length > 0 && (
              <button
                onClick={() => setCompareOpen(true)}
                className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-xs font-bold bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
              >
                ⚖️ {isUk ? "Порівняти" : "Compare"} ({compareList.length})
              </button>
            )}
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-1 px-3 py-1.5 text-sm font-bold bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
            >
              🛒 {cart.reduce((s, c) => s + c.qty, 0)}
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full text-xs flex items-center justify-center font-black">
                  {cart.reduce((s, c) => s + c.qty, 0)}
                </span>
              )}
            </button>
            <button
              onClick={() => { setBundleOpen(true); setBundleStep(1); }}
              className="hidden sm:flex px-3 py-1.5 text-xs font-black uppercase tracking-wider bg-red-600 hover:bg-red-500 rounded-lg transition-colors"
            >
              {isUk ? "Зібрати комплект" : "Build Bundle"}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
              aria-label="Menu"
            >
              <span className="block w-5 h-0.5 bg-white mb-1" />
              <span className="block w-5 h-0.5 bg-white mb-1" />
              <span className="block w-4 h-0.5 bg-white" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-zinc-900 border-t border-zinc-800 px-4 py-3 flex flex-col gap-3">
            <button className="text-sm font-semibold text-zinc-300 text-left">{isUk ? "Каталог" : "Catalog"}</button>
            <button className="text-sm font-semibold text-zinc-300 text-left">{isUk ? "Бренди" : "Brands"}</button>
            <button className="text-sm font-semibold text-zinc-300 text-left">{isUk ? "Акції" : "Deals"}</button>
            <button className="text-sm font-semibold text-zinc-300 text-left">{isUk ? "Блог" : "Blog"}</button>
            <button
              onClick={() => { setBundleOpen(true); setMobileMenuOpen(false); }}
              className="px-4 py-2 text-xs font-black uppercase tracking-wider bg-red-600 rounded-lg text-center"
            >
              {isUk ? "Зібрати комплект" : "Build Bundle"}
            </button>
          </div>
        )}
      </nav>

      {/* ── 2. HERO SECTION ────────────────────────────────────────────────── */}
      <section className="bg-zinc-950 pt-16 pb-0">
        <div className="max-w-7xl mx-auto px-4">
          <div className="py-16 sm:py-24">
            <p className="text-red-600 text-sm font-black uppercase tracking-widest mb-4">
              {isUk ? "⚡ Офіційний дистриб'ютор Nike · Adidas · Gymshark" : "⚡ Official distributor Nike · Adidas · Gymshark"}
            </p>
            <h1 className="text-[56px] sm:text-[80px] font-black tracking-tight uppercase leading-none mb-6 max-w-4xl">
              {isUk
                ? <>СПОРЯДЖЕННЯ ДЛЯ ТИХ, ХТО НЕ <span className="text-red-600">ЗУПИНЯЄТЬСЯ</span></>
                : <>GEAR FOR THOSE WHO NEVER <span className="text-red-600">STOP</span></>
              }
            </h1>
            <p className="text-zinc-400 text-lg max-w-xl mb-8">
              {isUk
                ? "12 000+ товарів від топ-брендів. Доставка за 24 години. Повернення без питань."
                : "12,000+ products from top brands. 24-hour delivery. No-questions returns."
              }
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <button
                onClick={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-wider rounded-xl transition-colors text-sm"
              >
                {isUk ? "КАТАЛОГ" : "CATALOG"}
              </button>
              <button
                onClick={() => { setBundleOpen(true); document.getElementById("bundle")?.scrollIntoView({ behavior: "smooth" }); }}
                className="px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-black uppercase tracking-wider rounded-xl transition-colors text-sm"
              >
                {isUk ? "ЗІБРАТИ КОМПЛЕКТ" : "BUILD BUNDLE"}
              </button>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="bg-red-600">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-1 text-sm font-black uppercase tracking-wider text-white">
              <span>{isUk ? "12 000+ товарів" : "12,000+ items"}</span>
              <span className="text-red-400">·</span>
              <span>{isUk ? "80+ брендів" : "80+ brands"}</span>
              <span className="text-red-400">·</span>
              <span>{isUk ? "Доставка 24 год" : "24h delivery"}</span>
              <span className="text-red-400">·</span>
              <span>{isUk ? "Гарантія повернення" : "Return guarantee"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2b. BRANDS STRIP */}
      <section className="bg-zinc-900 border-y border-zinc-800 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-zinc-500 text-xs font-black uppercase tracking-widest text-center mb-8">
            {isUk ? "Офіційні бренди в наявності" : "Official brands in stock"}
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {BRANDS.map(b => (
              <button key={b.name} className={`${b.color} rounded-2xl p-4 flex flex-col items-center gap-2 hover:ring-2 hover:ring-red-600 transition-all`}>
                <EmojiIcon emoji={b.emoji} className="w-7 h-7" />
                <span className="font-black text-sm">{b.name}</span>
                <span className="text-[10px] opacity-60 text-center">{isUk ? b.tagUk : b.tagEn}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. SPORT FILTER STRIP ──────────────────────────────────────────── */}
      <section id="catalog" className="bg-[#0A0A0A] pt-10 pb-6">
        <div className="max-w-7xl mx-auto px-4">
          {/* Scrollable filter pills */}
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-2 w-max">
              <button
                onClick={() => setSportFilter("all")}
                className={`px-5 py-2.5 rounded-full text-sm font-black uppercase tracking-wider whitespace-nowrap transition-colors ${
                  sportFilter === "all"
                    ? "bg-red-600 text-white"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                }`}
              >
                {isUk ? "🔥 Усі" : "🔥 All"}
              </button>
              {SPORTS_FILTERS.map(f => (
                <button
                  key={f.id}
                  onClick={() => setSportFilter(f.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-black uppercase tracking-wider whitespace-nowrap transition-colors ${
                    sportFilter === f.id
                      ? "bg-red-600 text-white"
                      : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                  }`}
                >
                  {isUk ? f.ukL : f.enL}
                </button>
              ))}
            </div>
          </div>

          {/* Sort bar */}
          <div className="flex items-center justify-between mt-5 flex-wrap gap-3">
            <p className="text-zinc-400 text-sm font-semibold">
              <span className="text-white font-black">{filteredProducts.length}</span>{" "}
              {isUk ? "товарів" : "items"}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-zinc-500 text-sm">{isUk ? "Сортувати:" : "Sort:"}</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="bg-zinc-800 border border-zinc-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-red-600"
              >
                <option value="popular">{isUk ? "Популярні" : "Popular"}</option>
                <option value="rating">{isUk ? "Рейтинг" : "Rating"}</option>
                <option value="price-asc">{isUk ? "Ціна: зростання" : "Price: low to high"}</option>
                <option value="price-desc">{isUk ? "Ціна: спадання" : "Price: high to low"}</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. PRODUCT GRID ────────────────────────────────────────────────── */}
      <section className="bg-[#0A0A0A] pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredProducts.map(p => {
              const inCompare = compareList.includes(p.id);
              const inCart = cart.some(c => c.id === p.id);
              const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : null;
              return (
                <div
                  key={p.id}
                  className={`bg-zinc-900 border rounded-2xl overflow-hidden hover:border-red-600 transition-all duration-200 flex flex-col ${
                    inCompare ? "border-red-600" : "border-zinc-800"
                  }`}
                >
                  {/* Image area */}
                  <div className="relative h-48 bg-zinc-800 flex items-center justify-center cursor-pointer" onClick={() => setSelectedProduct(p.id)}>
                    <EmojiIcon emoji={p.emoji} className="w-16 h-16 select-none" />
                    {p.badge && (
                      <span className={`absolute top-2 left-2 px-2 py-0.5 text-xs font-black rounded-md ${badgeColor(p.badge)}`}>
                        {p.badge}
                      </span>
                    )}
                    {discount && (
                      <span className="absolute top-2 right-2 px-2 py-0.5 text-xs font-black bg-orange-500 text-white rounded-md">
                        -{discount}%
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-3 flex flex-col flex-1 gap-2">
                    <p className="text-red-500 text-xs font-black uppercase tracking-wider">{p.brand}</p>
                    <p className="text-white text-sm font-bold leading-tight line-clamp-2">
                      {isUk ? p.nameUk : p.nameEn}
                    </p>
                    <p className="text-zinc-500 text-xs">{isUk ? p.catUk : p.catEn}</p>

                    {/* Specs */}
                    <div className="flex gap-2 flex-wrap">
                      <span className="text-zinc-400 text-xs bg-zinc-800 px-2 py-0.5 rounded-md">
                        {isUk ? p.specWeightUk : p.specWeightEn}
                      </span>
                      <span className="text-zinc-400 text-xs bg-zinc-800 px-2 py-0.5 rounded-md">
                        {p.specMat}
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400 text-xs">★ {p.rating}</span>
                      <span className="text-zinc-600 text-xs">({p.reviews})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mt-auto">
                      <span className="text-white text-base font-black">{p.price.toLocaleString("uk-UA")} ₴</span>
                      {p.oldPrice && (
                        <span className="text-zinc-500 text-xs line-through">{p.oldPrice.toLocaleString("uk-UA")} ₴</span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-1">
                      <button
                        onClick={() => addToCart(p.id)}
                        className={`flex-1 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-colors ${
                          inCart
                            ? "bg-zinc-700 text-zinc-300"
                            : "bg-red-600 hover:bg-red-500 text-white"
                        }`}
                      >
                        {inCart ? (isUk ? "У кошику" : "In cart") : (isUk ? "Купити" : "Buy")}
                      </button>
                      <button
                        onClick={() => toggleCompare(p.id)}
                        title={isUk ? "Порівняти" : "Compare"}
                        className={`w-8 h-8 rounded-lg text-xs font-black flex items-center justify-center transition-colors shrink-0 ${
                          inCompare
                            ? "bg-red-600 text-white"
                            : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                        }`}
                      >
                        ⚖
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4b. WHY SPORTPEAK */}
      <section className="bg-zinc-950 py-16 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-red-600 text-xs font-black uppercase tracking-widest mb-2">{isUk ? "Наші переваги" : "Our advantages"}</p>
            <h2 className="text-3xl font-black uppercase tracking-tight">
              {isUk ? "ЧОМУ " : "WHY "}<span className="text-red-600">SPORTPEAK?</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { emoji: "✅", titleUk: "100% оригінал", titleEn: "100% genuine", textUk: "Прямі контракти з виробниками. Сертифікати оригінальності для кожного бренду.", textEn: "Direct manufacturer contracts. Authenticity certificates for every brand." },
              { emoji: "⚡", titleUk: "Доставка за 24 год", titleEn: "24h delivery", textUk: "Склад у Києві та Дніпрі. Відправка того ж дня при замовленні до 16:00.", textEn: "Warehouses in Kyiv and Dnipro. Same-day dispatch for orders before 4 PM." },
              { emoji: "↩️", titleUk: "30 днів повернення", titleEn: "30-day returns", textUk: "Не підійшло — повертайте без зайвих питань. Повне відшкодування.", textEn: "Doesn't fit — return it hassle-free. Full refund guaranteed." },
              { emoji: "🎯", titleUk: "Консультація тренера", titleEn: "Trainer consultation", textUk: "Безкоштовно підберемо спорядження під ваш рівень та цілі.", textEn: "Free equipment selection based on your level and goals." },
            ].map(item => (
              <div key={item.titleEn} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-red-600 transition-colors">
                <div className="mb-4"><EmojiIcon emoji={item.emoji} className="w-10 h-10" /></div>
                <h3 className="text-white font-black text-lg mb-2">{isUk ? item.titleUk : item.titleEn}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{isUk ? item.textUk : item.textEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4c. ATHLETE REVIEWS */}
      <section className="bg-[#0A0A0A] py-16 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-red-600 text-xs font-black uppercase tracking-widest mb-2">{isUk ? "Відгуки клієнтів" : "Customer reviews"}</p>
            <h2 className="text-3xl font-black uppercase tracking-tight">
              {isUk ? "ЩО КАЖУТЬ " : "WHAT OUR "}<span className="text-red-600">{isUk ? "КЛІЄНТИ" : "ATHLETES SAY"}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map(s => (
                    <span key={s} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed mb-5">
                  "{isUk ? t.textUk : t.textEn}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                    <EmojiIcon emoji={t.emoji} className="w-5 h-5" />
                  </div>
                  <span className="text-white font-bold text-sm">{isUk ? t.nameUk : t.nameEn}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-zinc-500">
            <span>⭐ <strong className="text-white">4.8</strong> {isUk ? "середній рейтинг" : "average rating"}</span>
            <span>💬 <strong className="text-white">2 840+</strong> {isUk ? "відгуків" : "reviews"}</span>
            <span>🔄 <strong className="text-white">87%</strong> {isUk ? "повертаються знову" : "return customers"}</span>
          </div>
        </div>
      </section>

      {/* ── 5. COMPARE BAR (fixed bottom) ─────────────────────────────────── */}
      {compareList.length >= 2 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-zinc-900 border-t border-zinc-800 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-zinc-400 text-sm font-semibold shrink-0">
                {isUk ? "Порівняння:" : "Comparing:"}
              </span>
              {compareList.map(id => {
                const p = PRODUCTS.find(p => p.id === id);
                return p ? (
                  <span key={id} className="text-white text-sm font-bold bg-zinc-800 px-3 py-1 rounded-lg">
                    <EmojiIcon emoji={p.emoji} className="w-4 h-4 inline-block align-middle mr-1" />{isUk ? p.nameUk : p.nameEn}
                  </span>
                ) : null;
              })}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCompareOpen(true)}
                className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-black uppercase tracking-wider rounded-lg transition-colors"
              >
                {isUk ? "Порівняти" : "Compare"}
              </button>
              <button
                onClick={() => setCompareList([])}
                className="text-zinc-400 hover:text-white text-sm underline transition-colors"
              >
                {isUk ? "Очистити" : "Clear"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 5b. COMPARE MODAL ─────────────────────────────────────────────── */}
      {compareOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <h2 className="text-xl font-black uppercase tracking-tight">
                {isUk ? "Порівняння товарів" : "Product Comparison"}
              </h2>
              <button
                onClick={() => setCompareOpen(false)}
                className="w-9 h-9 bg-zinc-800 hover:bg-zinc-700 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <td className="text-zinc-500 font-semibold pb-4 pr-4 whitespace-nowrap">{isUk ? "Характеристика" : "Spec"}</td>
                    {compareProducts.map(p => (
                      <td key={p.id} className="pb-4 pr-4 text-center">
                        <div className="mb-2"><EmojiIcon emoji={p.emoji} className="w-10 h-10" /></div>
                        <div className="text-white font-bold text-xs leading-tight">{isUk ? p.nameUk : p.nameEn}</div>
                        <div className="text-red-500 text-xs font-bold mt-1">{p.brand}</div>
                      </td>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {[
                    { label: isUk ? "Ціна" : "Price", key: "price" as const, render: (p: typeof PRODUCTS[0]) => `${p.price.toLocaleString("uk-UA")} ₴` },
                    { label: isUk ? "Рейтинг" : "Rating", key: "rating" as const, render: (p: typeof PRODUCTS[0]) => `★ ${p.rating} (${p.reviews})` },
                    { label: isUk ? "Вага" : "Weight", key: "specWeightUk" as const, render: (p: typeof PRODUCTS[0]) => isUk ? p.specWeightUk : p.specWeightEn },
                    { label: isUk ? "Матеріал" : "Material", key: "specMat" as const, render: (p: typeof PRODUCTS[0]) => p.specMat },
                    { label: isUk ? "Рівень" : "Level", key: "specLevel" as const, render: (p: typeof PRODUCTS[0]) => p.specLevel },
                    { label: isUk ? "Категорія" : "Category", key: "catUk" as const, render: (p: typeof PRODUCTS[0]) => isUk ? p.catUk : p.catEn },
                  ].map(row => (
                    <tr key={row.label}>
                      <td className="py-3 pr-4 text-zinc-500 font-semibold whitespace-nowrap">{row.label}</td>
                      {compareProducts.map(p => (
                        <td key={p.id} className="py-3 pr-4 text-center text-white font-medium">{row.render(p)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex gap-3 mt-6 flex-wrap">
                {compareProducts.map(p => (
                  <button
                    key={p.id}
                    onClick={() => { addToCart(p.id); setCompareOpen(false); }}
                    className="flex-1 min-w-32 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-black uppercase tracking-wider rounded-lg transition-colors"
                  >
                    {isUk ? `Купити ${p.emoji}` : `Buy ${p.emoji}`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 6. BUNDLE BUILDER SECTION ─────────────────────────────────────── */}
      <section id="bundle" className="bg-zinc-900 py-16 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-10 flex-wrap">
            <div>
              <p className="text-red-600 text-xs font-black uppercase tracking-widest mb-2">
                {isUk ? "Персональний підбір" : "Personal selection"}
              </p>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-none">
                {isUk ? "ЗІБРАТИ" : "BUILD YOUR"} <span className="text-red-600">{isUk ? "КОМПЛЕКТ" : "BUNDLE"}</span>
              </h2>
              <p className="text-zinc-400 text-sm mt-2">
                {isUk ? "Знижка 10% на весь комплект" : "10% discount on the full bundle"}
              </p>
            </div>
            {bundleOpen && bundleStep > 1 && (
              <button
                onClick={resetBundle}
                className="text-zinc-500 hover:text-white text-sm underline transition-colors"
              >
                {isUk ? "Скинути" : "Reset"}
              </button>
            )}
          </div>

          {!bundleOpen ? (
            /* Invite to start */
            <div className="text-center py-12">
              <p className="text-6xl mb-6">🏆</p>
              <p className="text-white text-lg font-bold mb-2">
                {isUk ? "Підберіть ідеальний спортивний комплект" : "Build your perfect sports bundle"}
              </p>
              <p className="text-zinc-400 text-sm mb-6">
                {isUk ? "Взуття + одяг + аксесуар зі знижкою 10%" : "Footwear + clothing + accessory with 10% off"}
              </p>
              <button
                onClick={() => setBundleOpen(true)}
                className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-wider rounded-xl transition-colors"
              >
                {isUk ? "ПОЧАТИ ПІДБІР" : "START BUILDING"}
              </button>
            </div>
          ) : (
            <>
              {/* Progress steps */}
              <div className="flex items-center gap-0 mb-10 overflow-x-auto pb-2">
                {[
                  { n: 1, label: isUk ? "Вид спорту" : "Sport" },
                  { n: 2, label: isUk ? "Взуття" : "Footwear" },
                  { n: 3, label: isUk ? "Одяг" : "Clothing" },
                  { n: 4, label: isUk ? "Аксесуар" : "Accessory" },
                  { n: 5, label: isUk ? "Підсумок" : "Summary" },
                ].map((step, idx) => (
                  <div key={step.n} className="flex items-center">
                    <button
                      onClick={() => bundleStep > step.n || (step.n === 1) ? setBundleStep(step.n) : undefined}
                      className={`flex flex-col items-center gap-1 px-3 transition-colors ${
                        bundleStep === step.n
                          ? "opacity-100"
                          : bundleStep > step.n
                          ? "opacity-70 cursor-pointer hover:opacity-100"
                          : "opacity-30 cursor-default"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black transition-colors ${
                        bundleStep === step.n
                          ? "bg-red-600 text-white"
                          : bundleStep > step.n
                          ? "bg-zinc-700 text-white"
                          : "bg-zinc-800 text-zinc-500"
                      }`}>
                        {bundleStep > step.n ? "✓" : step.n}
                      </div>
                      <span className="text-xs font-semibold text-zinc-400 whitespace-nowrap">{step.label}</span>
                    </button>
                    {idx < 4 && <div className="w-8 h-0.5 bg-zinc-800 mx-1 mt-[-16px]" />}
                  </div>
                ))}
              </div>

              {/* Step 1: Choose sport */}
              {bundleStep === 1 && (
                <div>
                  <h3 className="text-white font-black text-lg uppercase tracking-tight mb-5">
                    {isUk ? "Оберіть вид спорту" : "Choose your sport"}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {BUNDLE_SPORTS.map(sp => (
                      <button
                        key={sp.id}
                        onClick={() => { setBundleSport(sp.id); setBundleStep(2); }}
                        className={`p-6 rounded-2xl border-2 text-center font-black text-lg transition-all hover:border-red-600 ${
                          bundleSport === sp.id
                            ? "border-red-600 bg-red-600/10"
                            : "border-zinc-700 bg-zinc-800 hover:bg-zinc-700"
                        }`}
                      >
                        <div className="text-4xl mb-2">{(isUk ? sp.ukL : sp.enL).split(" ")[0]}</div>
                        <div className="text-white text-sm">{(isUk ? sp.ukL : sp.enL).replace(/^.\s/, "")}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Footwear */}
              {bundleStep === 2 && (
                <div>
                  <h3 className="text-white font-black text-lg uppercase tracking-tight mb-5">
                    {isUk ? "Оберіть взуття" : "Choose footwear"}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {bundleFilteredOptions("footwear").map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => bundleSelectItem("footwear", opt.id)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all ${
                          bundleItems.footwear === opt.id
                            ? "border-red-600 bg-red-600/10"
                            : "border-zinc-700 bg-zinc-800 hover:border-zinc-600"
                        }`}
                      >
                        <div className="mb-2"><EmojiIcon emoji={opt.emoji} className="w-10 h-10" /></div>
                        <div className="text-white text-sm font-bold leading-tight">{isUk ? opt.ukName : opt.enName}</div>
                        <div className="text-red-500 font-black mt-1">{opt.price.toLocaleString("uk-UA")} ₴</div>
                        {bundleItems.footwear === opt.id && <div className="text-red-400 text-xs mt-1">✓ {isUk ? "Обрано" : "Selected"}</div>}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between">
                    <button onClick={() => setBundleStep(1)} className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm font-bold transition-colors">
                      {isUk ? "← Назад" : "← Back"}
                    </button>
                    <button
                      onClick={() => setBundleStep(3)}
                      disabled={!bundleItems.footwear}
                      className="px-6 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-sm font-black uppercase tracking-wider transition-colors"
                    >
                      {isUk ? "Далі →" : "Next →"}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Clothing */}
              {bundleStep === 3 && (
                <div>
                  <h3 className="text-white font-black text-lg uppercase tracking-tight mb-5">
                    {isUk ? "Оберіть одяг" : "Choose clothing"}
                  </h3>
                  <div className="mb-6">
                    <p className="text-zinc-400 text-sm font-semibold mb-3">{isUk ? "Верхня частина (топ / футболка)" : "Top / shirt"}</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {bundleFilteredOptions("top").map(opt => (
                        <button
                          key={opt.id}
                          onClick={() => bundleSelectItem("top", opt.id)}
                          className={`p-4 rounded-2xl border-2 text-left transition-all ${
                            bundleItems.top === opt.id
                              ? "border-red-600 bg-red-600/10"
                              : "border-zinc-700 bg-zinc-800 hover:border-zinc-600"
                          }`}
                        >
                          <div className="mb-2"><EmojiIcon emoji={opt.emoji} className="w-10 h-10" /></div>
                          <div className="text-white text-sm font-bold leading-tight">{isUk ? opt.ukName : opt.enName}</div>
                          <div className="text-red-500 font-black mt-1">{opt.price.toLocaleString("uk-UA")} ₴</div>
                          {bundleItems.top === opt.id && <div className="text-red-400 text-xs mt-1">✓ {isUk ? "Обрано" : "Selected"}</div>}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-6">
                    <p className="text-zinc-400 text-sm font-semibold mb-3">{isUk ? "Нижня частина (шорти / легінси)" : "Bottom (shorts / leggings)"}</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {bundleFilteredOptions("bottom").map(opt => (
                        <button
                          key={opt.id}
                          onClick={() => bundleSelectItem("bottom", opt.id)}
                          className={`p-4 rounded-2xl border-2 text-left transition-all ${
                            bundleItems.bottom === opt.id
                              ? "border-red-600 bg-red-600/10"
                              : "border-zinc-700 bg-zinc-800 hover:border-zinc-600"
                          }`}
                        >
                          <div className="mb-2"><EmojiIcon emoji={opt.emoji} className="w-10 h-10" /></div>
                          <div className="text-white text-sm font-bold leading-tight">{isUk ? opt.ukName : opt.enName}</div>
                          <div className="text-red-500 font-black mt-1">{opt.price.toLocaleString("uk-UA")} ₴</div>
                          {bundleItems.bottom === opt.id && <div className="text-red-400 text-xs mt-1">✓ {isUk ? "Обрано" : "Selected"}</div>}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <button onClick={() => setBundleStep(2)} className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm font-bold transition-colors">
                      {isUk ? "← Назад" : "← Back"}
                    </button>
                    <button
                      onClick={() => setBundleStep(4)}
                      disabled={!bundleItems.top && !bundleItems.bottom}
                      className="px-6 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-sm font-black uppercase tracking-wider transition-colors"
                    >
                      {isUk ? "Далі →" : "Next →"}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Accessory */}
              {bundleStep === 4 && (
                <div>
                  <h3 className="text-white font-black text-lg uppercase tracking-tight mb-5">
                    {isUk ? "Оберіть аксесуар" : "Choose accessory"}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {bundleFilteredOptions("accessory").map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => bundleSelectItem("accessory", opt.id)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all ${
                          bundleItems.accessory === opt.id
                            ? "border-red-600 bg-red-600/10"
                            : "border-zinc-700 bg-zinc-800 hover:border-zinc-600"
                        }`}
                      >
                        <div className="mb-2"><EmojiIcon emoji={opt.emoji} className="w-10 h-10" /></div>
                        <div className="text-white text-sm font-bold leading-tight">{isUk ? opt.ukName : opt.enName}</div>
                        <div className="text-red-500 font-black mt-1">{opt.price.toLocaleString("uk-UA")} ₴</div>
                        {bundleItems.accessory === opt.id && <div className="text-red-400 text-xs mt-1">✓ {isUk ? "Обрано" : "Selected"}</div>}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between">
                    <button onClick={() => setBundleStep(3)} className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm font-bold transition-colors">
                      {isUk ? "← Назад" : "← Back"}
                    </button>
                    <button
                      onClick={() => setBundleStep(5)}
                      className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm font-black uppercase tracking-wider transition-colors"
                    >
                      {isUk ? "До підсумку →" : "Summary →"}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 5: Summary */}
              {bundleStep === 5 && (
                <div>
                  <h3 className="text-white font-black text-lg uppercase tracking-tight mb-5">
                    {isUk ? "Ваш комплект" : "Your bundle"}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {(["footwear", "top", "bottom", "accessory"] as BundleSlot[]).map(slot => {
                      const opt = BUNDLE_OPTIONS.find(o => o.id === bundleItems[slot]);
                      const slotLabel: Record<BundleSlot, string> = {
                        footwear: isUk ? "Взуття" : "Footwear",
                        top: isUk ? "Топ" : "Top",
                        bottom: isUk ? "Низ" : "Bottom",
                        accessory: isUk ? "Аксесуар" : "Accessory",
                      };
                      return (
                        <div key={slot} className="bg-zinc-800 rounded-2xl p-4">
                          <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-3">{slotLabel[slot]}</p>
                          {opt ? (
                            <>
                              <div className="mb-2"><EmojiIcon emoji={opt.emoji} className="w-10 h-10" /></div>
                              <div className="text-white text-sm font-bold leading-tight">{isUk ? opt.ukName : opt.enName}</div>
                              <div className="text-red-500 font-black text-sm mt-1">{opt.price.toLocaleString("uk-UA")} ₴</div>
                            </>
                          ) : (
                            <div className="text-zinc-600 text-sm">{isUk ? "Не обрано" : "Not selected"}</div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Pricing */}
                  <div className="bg-zinc-800 rounded-2xl p-6 mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-zinc-400">{isUk ? "Сума без знижки" : "Subtotal"}</span>
                      <span className="text-white font-bold">{getBundleTotal().toLocaleString("uk-UA")} ₴</span>
                    </div>
                    <div className="flex justify-between text-sm mb-4">
                      <span className="text-green-400 font-bold">{isUk ? "Знижка на комплект (10%)" : "Bundle discount (10%)"}</span>
                      <span className="text-green-400 font-black">-{bundleDiscount.toLocaleString("uk-UA")} ₴</span>
                    </div>
                    <div className="border-t border-zinc-700 pt-4 flex justify-between">
                      <span className="text-white font-black text-lg">{isUk ? "Разом" : "Total"}</span>
                      <span className="text-red-500 font-black text-2xl">{bundleFinalPrice.toLocaleString("uk-UA")} ₴</span>
                    </div>
                  </div>

                  <div className="flex gap-3 flex-wrap">
                    <button
                      onClick={addBundleToCart}
                      className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-wider rounded-xl transition-colors text-sm"
                    >
                      {isUk ? "🛒 Додати в кошик" : "🛒 Add to cart"}
                    </button>
                    <button
                      onClick={() => setBundleStep(1)}
                      className="px-5 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm font-bold transition-colors"
                    >
                      {isUk ? "Зберегти / Змінити" : "Save / Edit"}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── 7. DARK FOOTER ─────────────────────────────────────────────────── */}
      <footer className="bg-zinc-950 border-t border-zinc-800">
        {/* Newsletter */}
        <div className="border-b border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h3 className="text-white font-black text-xl uppercase tracking-tight mb-1">
                  {isUk ? "Будь у курсі акцій" : "Stay in the loop"}
                </h3>
                <p className="text-zinc-400 text-sm">
                  {isUk ? "Знижки, новинки, ексклюзивні пропозиції" : "Discounts, new arrivals, exclusive offers"}
                </p>
              </div>
              <form
                onSubmit={e => { e.preventDefault(); setFormOpen(true); }}
                className="flex gap-2 w-full sm:w-auto"
              >
                <input
                  type="email"
                  placeholder={isUk ? "Ваш email" : "Your email"}
                  className="flex-1 sm:w-64 bg-zinc-900 border border-zinc-700 focus:border-red-600 text-white text-sm rounded-lg px-4 py-3 outline-none transition-colors placeholder:text-zinc-600"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-red-600 hover:bg-red-500 text-white font-black text-sm uppercase rounded-lg transition-colors shrink-0"
                >
                  {isUk ? "Підписатись" : "Subscribe"}
                </button>
              </form>
            </div>
            {formOpen && (
              <p className="mt-4 text-green-400 text-sm font-semibold">
                {isUk ? "✓ Дякуємо! Ви підписані на розсилку." : "✓ Thank you! You are subscribed."}
              </p>
            )}
          </div>
        </div>

        {/* 4-column grid */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <div className="text-xl font-black tracking-tight mb-3">
                ⚡ SPORT<span className="text-red-600">PEAK</span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mb-5">
                {isUk
                  ? "Офіційний дистриб'ютор провідних спортивних брендів в Україні. Доставляємо по всій країні."
                  : "Official distributor of leading sports brands in Ukraine. Shipping nationwide."}
              </p>
              <div className="flex flex-col gap-1.5">
                <span className="text-zinc-500 text-xs">✓ {isUk ? "Ліц. ДАСУ №2487-СП" : "License DASU #2487-SP"}</span>
                <span className="text-zinc-500 text-xs">✓ {isUk ? "Офіційний партнер Nike Ukraine" : "Official Nike Ukraine partner"}</span>
                <span className="text-zinc-500 text-xs">✓ {isUk ? "ISO 9001:2015" : "ISO 9001:2015"}</span>
                <span className="text-zinc-500 text-xs">✓ {isUk ? "Захист покупця PCI DSS" : "PCI DSS buyer protection"}</span>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-black text-sm uppercase tracking-widest mb-4">
                {isUk ? "Послуги" : "Services"}
              </h4>
              <ul className="space-y-2.5 text-sm text-zinc-400">
                {(isUk
                  ? ["Доставка по Україні", "Безкоштовне повернення", "Підбір комплекту", "Консультація тренера", "Корпоративні замовлення", "Підписка на бренд"]
                  : ["Nationwide delivery", "Free returns", "Bundle builder", "Trainer consultation", "Corporate orders", "Brand subscription"]
                ).map(item => (
                  <li key={item}><button className="hover:text-white transition-colors text-left">{item}</button></li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-black text-sm uppercase tracking-widest mb-4">
                {isUk ? "Компанія" : "Company"}
              </h4>
              <ul className="space-y-2.5 text-sm text-zinc-400">
                {(isUk
                  ? ["Про нас", "Бренди", "Блог", "Вакансії", "Прес-центр", "Партнерам"]
                  : ["About us", "Brands", "Blog", "Careers", "Press", "Partners"]
                ).map(item => (
                  <li key={item}><button className="hover:text-white transition-colors text-left">{item}</button></li>
                ))}
              </ul>
            </div>

            {/* Contacts */}
            <div>
              <h4 className="text-white font-black text-sm uppercase tracking-widest mb-4">
                {isUk ? "Контакти" : "Contacts"}
              </h4>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <span>📍</span>
                  <span>{isUk ? "м. Київ, вул. Спортивна, 5" : "Kyiv, Sportyvna St., 5"}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>📞</span>
                  <span>0 800 123 456</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✉️</span>
                  <span>info@sportpeak.ua</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>⏰</span>
                  <span>{isUk ? "Пн–Нд 9:00–21:00" : "Mon–Sun 9:00–21:00"}</span>
                </li>
              </ul>
              <div className="flex gap-3 mt-5">
                {["Instagram", "TikTok", "Telegram", "YouTube"].map(sn => (
                  <button key={sn} className="w-9 h-9 bg-zinc-800 hover:bg-red-600 rounded-lg text-xs font-bold transition-colors flex items-center justify-center text-zinc-400 hover:text-white">
                    {sn[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-zinc-600 text-xs">
              © 2026 SportPeak. {isUk ? "Всі права захищено." : "All rights reserved."}
            </p>
            <div className="flex items-center gap-3 flex-wrap justify-center">
              {["Visa", "MC", "Apple Pay", "Google Pay", "Monobank"].map(pm => (
                <span key={pm} className="text-zinc-600 text-xs bg-zinc-800 px-2.5 py-1 rounded-md font-semibold">
                  {pm}
                </span>
              ))}
            </div>
            <div className="flex gap-4 text-xs text-zinc-600">
              <button className="hover:text-zinc-400 transition-colors">{isUk ? "Конфіденційність" : "Privacy"}</button>
              <button className="hover:text-zinc-400 transition-colors">{isUk ? "Умови" : "Terms"}</button>
            </div>
          </div>
        </div>
      </footer>

      {/* ── PRODUCT DETAIL MODAL */}
      {selectedProduct && (() => {
        const p = PRODUCTS.find(x => x.id === selectedProduct)!;
        const inCart = cart.some(c => c.id === p.id);
        const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : null;
        return (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setSelectedProduct(null)}>
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-zinc-800">
                <span className="text-red-600 text-xs font-black uppercase tracking-wider">{p.brand}</span>
                <button onClick={() => setSelectedProduct(null)} className="w-8 h-8 bg-zinc-800 hover:bg-zinc-700 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white transition-colors">✕</button>
              </div>
              <div className="p-6 grid md:grid-cols-2 gap-6">
                {/* Image */}
                <div className="h-64 bg-zinc-800 rounded-2xl flex items-center justify-center">
                  <EmojiIcon emoji={p.emoji} className="w-16 h-16" />
                </div>
                {/* Details */}
                <div className="flex flex-col gap-4">
                  <div>
                    <h2 className="text-white text-xl font-black leading-tight mb-1">{isUk ? p.nameUk : p.nameEn}</h2>
                    <p className="text-zinc-400 text-sm">{isUk ? p.catUk : p.catEn}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(s => <span key={s} className={`text-sm ${s <= Math.round(p.rating) ? "text-yellow-400" : "text-zinc-700"}`}>★</span>)}
                    <span className="text-zinc-400 text-sm ml-1">({p.reviews})</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { labelUk: "Вага", labelEn: "Weight", value: isUk ? p.specWeightUk : p.specWeightEn },
                      { labelUk: "Матеріал", labelEn: "Material", value: p.specMat },
                      { labelUk: "Рівень", labelEn: "Level", value: p.specLevel },
                      { labelUk: "Вид спорту", labelEn: "Sport", value: isUk ? SPORTS_FILTERS.find(s => s.id === p.sport)?.ukL : SPORTS_FILTERS.find(s => s.id === p.sport)?.enL },
                    ].map(spec => (
                      <div key={spec.labelEn} className="bg-zinc-800 rounded-xl p-3">
                        <p className="text-zinc-500 text-[10px] uppercase tracking-wider">{isUk ? spec.labelUk : spec.labelEn}</p>
                        <p className="text-white text-sm font-bold mt-0.5">{spec.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-white text-2xl font-black">{p.price.toLocaleString("uk-UA")} ₴</span>
                    {p.oldPrice && <span className="text-zinc-500 line-through">{p.oldPrice.toLocaleString("uk-UA")} ₴</span>}
                    {discount && <span className="bg-orange-500 text-white text-xs font-black px-2 py-0.5 rounded-md">-{discount}%</span>}
                  </div>
                  <button
                    onClick={() => { addToCart(p.id); setSelectedProduct(null); }}
                    className={`w-full py-3 rounded-xl font-black uppercase tracking-wider text-sm transition-colors ${inCart ? "bg-zinc-700 text-zinc-300" : "bg-red-600 hover:bg-red-500 text-white"}`}
                  >
                    {inCart ? (isUk ? "✓ Вже в кошику" : "✓ In cart") : (isUk ? "Додати до кошика" : "Add to cart")}
                  </button>
                  <button
                    onClick={() => toggleCompare(p.id)}
                    className={`w-full py-2.5 rounded-xl font-bold text-sm border transition-colors ${compareList.includes(p.id) ? "border-red-600 text-red-400 bg-red-600/10" : "border-zinc-700 text-zinc-400 hover:border-zinc-500"}`}
                  >
                    ⚖ {isUk ? "Порівняти" : "Compare"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── 8. CART DRAWER ─────────────────────────────────────────────────── */}
      {cartOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50 bg-black/70"
            onClick={() => setCartOpen(false)}
          />
          {/* Drawer */}
          <div className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-zinc-900 border-l border-zinc-800 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-zinc-800">
              <h2 className="text-lg font-black uppercase tracking-tight">
                {isUk ? "Кошик" : "Cart"}
                {cart.length > 0 && (
                  <span className="ml-2 text-sm text-zinc-400 font-semibold normal-case">
                    ({cart.reduce((s, c) => s + c.qty, 0)} {isUk ? "шт." : "items"})
                  </span>
                )}
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                className="w-9 h-9 bg-zinc-800 hover:bg-zinc-700 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              /* Empty state */
              <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
                <span className="text-7xl">🛒</span>
                <p className="text-white font-bold text-lg">{isUk ? "Кошик порожній" : "Your cart is empty"}</p>
                <p className="text-zinc-400 text-sm">{isUk ? "Додайте товари з каталогу" : "Add items from the catalog"}</p>
                <button
                  onClick={() => { setCartOpen(false); document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-black text-sm uppercase tracking-wider rounded-xl transition-colors"
                >
                  {isUk ? "До каталогу" : "Go to catalog"}
                </button>
              </div>
            ) : (
              <>
                {/* Free delivery progress */}
                {toFreeDelivery > 0 && (
                  <div className="px-5 pt-4">
                    <p className="text-xs text-zinc-400 mb-1.5">
                      {isUk
                        ? `До безкоштовної доставки: ${toFreeDelivery.toLocaleString("uk-UA")} ₴`
                        : `Until free delivery: ${toFreeDelivery.toLocaleString("uk-UA")} ₴`}
                    </p>
                    <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-600 rounded-full transition-all"
                        style={{ width: `${Math.min(100, (cartTotal / FREE_DELIVERY_THRESHOLD) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
                {toFreeDelivery === 0 && (
                  <div className="px-5 pt-4">
                    <p className="text-xs text-green-400 font-bold">
                      ✓ {isUk ? "Безкоштовна доставка!" : "Free delivery!"}
                    </p>
                  </div>
                )}

                {/* Items */}
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
                  {cart.map(ci => {
                    const p = PRODUCTS.find(p => p.id === ci.id);
                    if (!p) return null;
                    return (
                      <div key={ci.id} className="flex gap-3 bg-zinc-800 rounded-xl p-3">
                        <div className="w-14 h-14 bg-zinc-700 rounded-lg flex items-center justify-center shrink-0">
                          <EmojiIcon emoji={p.emoji} className="w-7 h-7" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-bold leading-tight line-clamp-2">
                            {isUk ? p.nameUk : p.nameEn}
                          </p>
                          <p className="text-red-500 font-black text-sm mt-1">{(p.price * ci.qty).toLocaleString("uk-UA")} ₴</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => changeQty(ci.id, -1)}
                              className="w-7 h-7 bg-zinc-700 hover:bg-zinc-600 rounded-lg text-white font-black text-sm flex items-center justify-center transition-colors"
                            >
                              −
                            </button>
                            <span className="text-white text-sm font-bold w-6 text-center">{ci.qty}</span>
                            <button
                              onClick={() => changeQty(ci.id, 1)}
                              className="w-7 h-7 bg-zinc-700 hover:bg-zinc-600 rounded-lg text-white font-black text-sm flex items-center justify-center transition-colors"
                            >
                              +
                            </button>
                            <button
                              onClick={() => removeFromCart(ci.id)}
                              className="ml-auto text-zinc-600 hover:text-red-500 text-sm transition-colors"
                            >
                              🗑
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom: promo + checkout */}
                <div className="border-t border-zinc-800 p-5 space-y-4">
                  {/* Promo code */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={e => setPromoCode(e.target.value)}
                      placeholder={isUk ? "Промокод" : "Promo code"}
                      className="flex-1 bg-zinc-800 border border-zinc-700 focus:border-red-600 text-white text-sm rounded-lg px-3 py-2.5 outline-none transition-colors placeholder:text-zinc-600"
                    />
                    <button className="px-3 py-2.5 bg-zinc-700 hover:bg-zinc-600 rounded-lg text-xs font-bold text-zinc-300 transition-colors">
                      {isUk ? "Застосувати" : "Apply"}
                    </button>
                  </div>

                  {/* Total */}
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400 text-sm">{isUk ? "Разом:" : "Total:"}</span>
                    <span className="text-white text-xl font-black">{cartTotal.toLocaleString("uk-UA")} ₴</span>
                  </div>

                  {/* Checkout */}
                  <button className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-wider rounded-xl transition-colors">
                    {isUk ? "ОФОРМИТИ ЗАМОВЛЕННЯ" : "CHECKOUT"}
                  </button>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="w-full py-2.5 text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    {isUk ? "Продовжити покупки" : "Continue shopping"}
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      )}

    </div>
  );
}
