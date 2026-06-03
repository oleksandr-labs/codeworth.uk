"use client";

import { useState } from "react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

const isUkStr = (isUk: boolean, en: string, uk: string) => (isUk ? uk : en);

const CATEGORIES = [
  { key: "all", en: "All", uk: "Всі", emoji: "🍽️" },
  { key: "pizza", en: "Pizza", uk: "Піца", emoji: "🍕" },
  { key: "sushi", en: "Sushi", uk: "Суші", emoji: "🍣" },
  { key: "burgers", en: "Burgers", uk: "Бургери", emoji: "🍔" },
  { key: "mexican", en: "Mexican", uk: "Мексика", emoji: "🌮" },
  { key: "salads", en: "Salads", uk: "Салати", emoji: "🥗" },
  { key: "noodles", en: "Noodles", uk: "Локшина", emoji: "🍜" },
];

const RESTAURANTS = [
  {
    id: 1,
    name: "Napoli Express",
    cuisine: { en: "Italian · Pizza", uk: "Італійська · Піца" },
    category: "pizza",
    rating: 4.8,
    time: "20–30",
    minOrder: 150,
    deliveryFee: 0,
    open: true,
    emoji: "🍕",
    tags: ["pizza", "pasta"],
  },
  {
    id: 2,
    name: "Tokyo Roll",
    cuisine: { en: "Japanese · Sushi", uk: "Японська · Суші" },
    category: "sushi",
    rating: 4.9,
    time: "30–45",
    minOrder: 200,
    deliveryFee: 30,
    open: true,
    emoji: "🍣",
    tags: ["sushi", "ramen"],
  },
  {
    id: 3,
    name: "Burger Barn",
    cuisine: { en: "American · Burgers", uk: "Американська · Бургери" },
    category: "burgers",
    rating: 4.7,
    time: "15–25",
    minOrder: 100,
    deliveryFee: 0,
    open: true,
    emoji: "🍔",
    tags: ["burgers", "fries"],
  },
  {
    id: 4,
    name: "El Taco Loco",
    cuisine: { en: "Mexican", uk: "Мексиканська" },
    category: "mexican",
    rating: 4.6,
    time: "25–35",
    minOrder: 120,
    deliveryFee: 20,
    open: true,
    emoji: "🌮",
    tags: ["mexican", "burritos"],
  },
  {
    id: 5,
    name: "Green Bowl",
    cuisine: { en: "Healthy · Salads", uk: "Здорова їжа · Салати" },
    category: "salads",
    rating: 4.5,
    time: "20–30",
    minOrder: 130,
    deliveryFee: 0,
    open: false,
    emoji: "🥗",
    tags: ["salads", "vegan"],
  },
  {
    id: 6,
    name: "Noodle House",
    cuisine: { en: "Asian · Noodles", uk: "Азійська · Локшина" },
    category: "noodles",
    rating: 4.7,
    time: "25–40",
    minOrder: 160,
    deliveryFee: 25,
    open: true,
    emoji: "🍜",
    tags: ["noodles", "soup"],
  },
  {
    id: 7,
    name: "Crimson Pizza Co.",
    cuisine: { en: "Pizza · Calzone", uk: "Піца · Кальцоне" },
    category: "pizza",
    rating: 4.8,
    time: "20–35",
    minOrder: 180,
    deliveryFee: 0,
    open: true,
    emoji: "🫓",
    tags: ["pizza", "calzone"],
  },
  {
    id: 8,
    name: "Sakura Garden",
    cuisine: { en: "Japanese · Pan-Asian", uk: "Японська · Паназійська" },
    category: "sushi",
    rating: 4.9,
    time: "35–50",
    minOrder: 250,
    deliveryFee: 40,
    open: true,
    emoji: "🌸",
    tags: ["sushi", "wok"],
  },
];

const MENU: Record<
  number,
  {
    categories: string[];
    items: {
      id: number;
      cat: string;
      emoji: string;
      name: { en: string; uk: string };
      desc: { en: string; uk: string };
      price: number;
    }[];
  }
> = {
  1: {
    categories: ["Starters", "Mains", "Desserts", "Drinks"],
    items: [
      { id: 101, cat: "Starters", emoji: "🥖", name: { en: "Garlic Bread", uk: "Часниковий хліб" }, desc: { en: "Crispy with herbs", uk: "Хрусткий з травами" }, price: 65 },
      { id: 102, cat: "Starters", emoji: "🥗", name: { en: "Caprese Salad", uk: "Салат Капрезе" }, desc: { en: "Tomato, mozzarella, basil", uk: "Томат, моцарела, базилік" }, price: 120 },
      { id: 103, cat: "Mains", emoji: "🍕", name: { en: "Margherita Pizza", uk: "Піца Маргарита" }, desc: { en: "Classic tomato & mozzarella", uk: "Класичний томат і моцарела" }, price: 280 },
      { id: 104, cat: "Mains", emoji: "🍕", name: { en: "Pepperoni Pizza", uk: "Піца Пепероні" }, desc: { en: "Spicy pepperoni, cheese", uk: "Пепероні, сир, гострий соус" }, price: 320 },
      { id: 105, cat: "Mains", emoji: "🍝", name: { en: "Spaghetti Carbonara", uk: "Спагеті Карбонара" }, desc: { en: "Eggs, pancetta, parmesan", uk: "Яйця, панчета, пармезан" }, price: 260 },
      { id: 106, cat: "Desserts", emoji: "🍮", name: { en: "Tiramisu", uk: "Тірамісу" }, desc: { en: "Classic Italian dessert", uk: "Класичний італійський десерт" }, price: 130 },
      { id: 107, cat: "Drinks", emoji: "🥤", name: { en: "San Pellegrino", uk: "Сан Пелегріно" }, desc: { en: "Sparkling mineral water", uk: "Мінеральна вода з газом" }, price: 55 },
    ],
  },
  2: {
    categories: ["Starters", "Mains", "Desserts", "Drinks"],
    items: [
      { id: 201, cat: "Starters", emoji: "🥟", name: { en: "Gyoza (6 pcs)", uk: "Гьоза (6 шт)" }, desc: { en: "Pan-fried pork dumplings", uk: "Смажені свинячі пельмені" }, price: 140 },
      { id: 202, cat: "Starters", emoji: "🍱", name: { en: "Edamame", uk: "Едамаме" }, desc: { en: "Steamed salted soybeans", uk: "Варені соєві боби з сіллю" }, price: 80 },
      { id: 203, cat: "Mains", emoji: "🍣", name: { en: "Salmon Nigiri (8 pcs)", uk: "Нігірі з лососем (8 шт)" }, desc: { en: "Fresh salmon, sushi rice", uk: "Свіжий лосось, рис для суші" }, price: 340 },
      { id: 204, cat: "Mains", emoji: "🍱", name: { en: "Dragon Roll", uk: "Рол Дракон" }, desc: { en: "Shrimp tempura, avocado", uk: "Криветки темпура, авокадо" }, price: 380 },
      { id: 205, cat: "Mains", emoji: "🍜", name: { en: "Tonkotsu Ramen", uk: "Тонкоцу Рамен" }, desc: { en: "Pork broth, chashu, egg", uk: "Свинячий бульйон, чашу, яйце" }, price: 290 },
      { id: 206, cat: "Desserts", emoji: "🍡", name: { en: "Mochi Ice Cream", uk: "Морозиво Мочі" }, desc: { en: "3 flavors: matcha, strawberry, vanilla", uk: "3 смаки: матча, полуниця, ваніль" }, price: 160 },
      { id: 207, cat: "Drinks", emoji: "🍵", name: { en: "Green Tea", uk: "Зелений чай" }, desc: { en: "Premium sencha", uk: "Преміум сенча" }, price: 60 },
    ],
  },
  3: {
    categories: ["Starters", "Mains", "Desserts", "Drinks"],
    items: [
      { id: 301, cat: "Starters", emoji: "🍟", name: { en: "Loaded Fries", uk: "Фрі з начинкою" }, desc: { en: "Cheese sauce, bacon bits", uk: "Сирний соус, шматочки бекону" }, price: 120 },
      { id: 302, cat: "Starters", emoji: "🧅", name: { en: "Onion Rings", uk: "Цибулеві кільця" }, desc: { en: "Crispy beer-battered rings", uk: "Хрусткі в пивному клярі" }, price: 90 },
      { id: 303, cat: "Mains", emoji: "🍔", name: { en: "Classic Smash Burger", uk: "Класичний Смеш Бургер" }, desc: { en: "Double patty, cheddar, pickles", uk: "Подвійна котлета, чеддер, мариновані огірки" }, price: 220 },
      { id: 304, cat: "Mains", emoji: "🍔", name: { en: "BBQ Bacon Burger", uk: "BBQ Бургер з беконом" }, desc: { en: "Smoky BBQ, crispy bacon", uk: "Копчений BBQ соус, хрусткий бекон" }, price: 260 },
      { id: 305, cat: "Mains", emoji: "🌯", name: { en: "Chicken Wrap", uk: "Рап з куркою" }, desc: { en: "Grilled chicken, lettuce, ranch", uk: "Куряче філе, салат, ранч" }, price: 180 },
      { id: 306, cat: "Desserts", emoji: "🍦", name: { en: "Milkshake", uk: "Молочний коктейль" }, desc: { en: "Vanilla, chocolate or strawberry", uk: "Ваніль, шоколад або полуниця" }, price: 110 },
      { id: 307, cat: "Drinks", emoji: "🥤", name: { en: "Craft Lemonade", uk: "Крафтовий лимонад" }, desc: { en: "Fresh-squeezed, mint, ginger", uk: "Свіжовичавлений, м'ята, імбир" }, price: 70 },
    ],
  },
};

const ORDER_STEPS = [
  { en: "Order Received", uk: "Замовлення отримано", emoji: "📱" },
  { en: "Confirmed", uk: "Підтверджено", emoji: "✅" },
  { en: "Cooking", uk: "Готується", emoji: "👨‍🍳" },
  { en: "Out for Delivery", uk: "В дорозі", emoji: "🛵" },
  { en: "Delivered!", uk: "Доставлено!", emoji: "🎉" },
];

const PROMO_CODE = "QUICKBITE20";

export function QuickBiteDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";
  const t = (en: string, uk: string) => isUkStr(isUk, en, uk);

  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState(isUk ? "Київ, Хрещатик 1" : "Kyiv, Khreshchatyk 1");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedRestaurant, setSelectedRestaurant] = useState<number | null>(null);
  const [menuTab, setMenuTab] = useState("Mains");
  const [cart, setCart] = useState<{ id: number; name: string; price: number; qty: number; emoji: string }[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [orderStep, setOrderStep] = useState(-1);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartSubtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const deliveryFee = cartSubtotal > 0 ? 49 : 0;
  const discount = promoApplied ? Math.round(cartSubtotal * 0.2) : 0;
  const cartTotal = cartSubtotal + deliveryFee - discount;

  const filteredRestaurants = RESTAURANTS.filter((r) => {
    const matchCat = activeCategory === "all" || r.category === activeCategory;
    const matchSearch =
      searchQuery === "" ||
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.cuisine.en.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const addToCart = (item: { id: number; name: { en: string; uk: string }; price: number; emoji: string }) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) => (c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
      }
      return [...prev, { id: item.id, name: isUk ? item.name.uk : item.name.en, price: item.price, qty: 1, emoji: item.emoji }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, qty: c.qty + delta } : c))
        .filter((c) => c.qty > 0)
    );
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCartOpen(false);
    setOrderPlaced(true);
    setOrderStep(0);
  };

  const applyPromo = () => {
    if (promoCode.toUpperCase() === PROMO_CODE) {
      setPromoApplied(true);
    }
  };

  const selectedMenu = selectedRestaurant ? MENU[selectedRestaurant] : null;
  const selectedRest = RESTAURANTS.find((r) => r.id === selectedRestaurant);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 font-sans text-gray-800 dark:text-neutral-200 relative">

      {/* HEADER */}
      <header className="bg-white border-b border-gray-100 dark:border-neutral-700 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          {/* Logo */}
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-2xl">🍔</span>
            <span className="font-extrabold text-xl text-red-600 tracking-tight">QuickBite</span>
          </div>

          {/* Location */}
          <div className="hidden sm:flex items-center gap-1 bg-gray-100 dark:bg-neutral-800 rounded-lg px-3 py-1.5 shrink-0 cursor-pointer hover:bg-gray-200 transition">
            <span className="text-sm">📍</span>
            <span className="text-xs font-medium text-gray-700 dark:text-neutral-300 max-w-[120px] truncate">{location}</span>
            <span className="text-gray-400 dark:text-neutral-500 text-xs">▼</span>
          </div>

          {/* Search */}
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("Search restaurants or dishes…", "Пошук ресторанів або страв…")}
              className="w-full pl-9 pr-4 py-2 bg-gray-100 dark:bg-neutral-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-400 transition"
            />
          </div>

          {/* Sign In */}
          <button className="hidden sm:block text-sm font-semibold text-red-600 hover:text-red-700 transition shrink-0">
            {t("Sign In", "Увійти")}
          </button>

          {/* Cart */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative shrink-0 bg-red-600 hover:bg-red-700 text-white rounded-xl px-3 py-2 flex items-center gap-1.5 transition font-semibold text-sm"
          >
            <span>🛒</span>
            <span className="hidden sm:inline">{t("Cart", "Кошик")}</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 dark:text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-linear-to-br from-red-600 via-red-500 to-orange-500 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-yellow-400 text-gray-900 dark:text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
            {t("🚀 Fast Delivery", "🚀 Швидка доставка")}
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 leading-tight">
            {t("Food in 30 Minutes", "Їжа за 30 хвилин")} ⚡
          </h1>
          <p className="text-red-100 text-lg mb-8">
            {t("From 500+ restaurants straight to your door", "З 500+ ресторанів прямо до вашого порогу")}
          </p>

          {/* Address + CTA */}
          <div className="flex flex-col sm:flex-row gap-2 max-w-xl mx-auto mb-8">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder={t("Enter your address…", "Введіть вашу адресу…")}
              className="flex-1 px-4 py-3 rounded-xl text-gray-800 dark:text-neutral-200 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 dark:text-white font-bold px-6 py-3 rounded-xl text-sm transition shrink-0">
              {t("Find Restaurants", "Знайти ресторани")}
            </button>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.filter((c) => c.key !== "all").map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition border-2 ${
                  activeCategory === cat.key
                    ? "bg-yellow-400 border-yellow-400 text-gray-900"
                    : "bg-white/20 border-white/40 text-white hover:bg-white/30"
                }`}
              >
                <EmojiIcon emoji={cat.emoji} className="w-4 h-4 inline-block align-middle mr-1" />{isUk ? cat.uk : cat.en}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-4 py-8">

        {/* ORDER TRACKER */}
        {orderPlaced && (
          <div className="mb-8 bg-white dark:bg-neutral-800 rounded-2xl shadow-md border border-gray-100 dark:border-neutral-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-extrabold text-gray-800">
                {t("Order Tracker", "Відстеження замовлення")} 🛵
              </h2>
              <button
                onClick={() => { setOrderPlaced(false); setOrderStep(-1); setCart([]); setPromoApplied(false); setPromoCode(""); }}
                className="text-xs text-gray-400 dark:text-neutral-500 hover:text-gray-600"
              >
                {t("Reset", "Скинути")}
              </button>
            </div>
            <div className="flex items-center gap-1 overflow-x-auto pb-2">
              {ORDER_STEPS.map((step, idx) => (
                <div key={idx} className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => setOrderStep(idx)}
                    className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition ${
                      idx <= orderStep
                        ? "bg-red-600 text-white"
                        : "bg-gray-100 dark:bg-neutral-800 text-gray-400 dark:text-neutral-500 hover:bg-gray-200"
                    }`}
                  >
                    <EmojiIcon emoji={step.emoji} className="w-5 h-5" />
                    <span className="text-xs font-semibold whitespace-nowrap">{isUk ? step.uk : step.en}</span>
                  </button>
                  {idx < ORDER_STEPS.length - 1 && (
                    <div className={`w-6 h-1 rounded-full transition ${idx < orderStep ? "bg-red-500" : "bg-gray-200"}`} />
                  )}
                </div>
              ))}
            </div>
            {orderStep === ORDER_STEPS.length - 1 && (
              <div className="mt-4 text-center text-green-600 font-bold text-lg">
                🎉 {t("Your order has arrived! Enjoy your meal!", "Ваше замовлення доставлено! Смачного!")}
              </div>
            )}
            {orderStep < ORDER_STEPS.length - 1 && (
              <button
                onClick={() => setOrderStep((s) => Math.min(s + 1, ORDER_STEPS.length - 1))}
                className="mt-4 text-sm text-red-600 font-semibold underline"
              >
                {t("Advance to next step →", "Наступний крок →")}
              </button>
            )}
          </div>
        )}

        {/* PROMOTIONS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-linear-to-br from-red-500 to-red-700 text-white rounded-2xl p-5 flex gap-3 items-center">
            <span className="text-4xl shrink-0">🚚</span>
            <div>
              <div className="font-bold text-lg">{t("Free Delivery", "Безкоштовна доставка")}</div>
              <div className="text-red-200 text-sm">{t("On orders over ₴300", "При замовленні від ₴300")}</div>
            </div>
          </div>
          <div className="bg-linear-to-br from-yellow-400 to-orange-500 text-gray-900 dark:text-white rounded-2xl p-5 flex gap-3 items-center">
            <span className="text-4xl shrink-0">🎁</span>
            <div>
              <div className="font-bold text-lg">{t("20% Off", "Знижка 20%")}</div>
              <div className="text-yellow-900 text-sm">{t("First order · Code: QUICKBITE20", "Перше замовлення · Код: QUICKBITE20")}</div>
            </div>
          </div>
          <div className="bg-linear-to-br from-purple-500 to-pink-600 text-white rounded-2xl p-5 flex gap-3 items-center">
            <span className="text-4xl shrink-0">⭐</span>
            <div>
              <div className="font-bold text-lg">{t("Loyalty Program", "Програма лояльності")}</div>
              <div className="text-purple-200 text-sm">{t("Earn points, get free food", "Нараховуй бали, отримуй їжу")}</div>
            </div>
          </div>
        </div>

        {/* CATEGORY FILTER BAR */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition border ${
                activeCategory === cat.key
                  ? "bg-red-600 text-white border-red-600"
                  : "bg-white text-gray-600 dark:text-neutral-300 border-gray-200 dark:border-neutral-700 hover:border-red-300 hover:text-red-600"
              }`}
            >
              <EmojiIcon emoji={cat.emoji} className="w-5 h-5 inline-block align-middle" />
              <span>{isUk ? cat.uk : cat.en}</span>
            </button>
          ))}
        </div>

        {/* RESTAURANT CATALOG */}
        {!selectedRestaurant && (
          <>
            <h2 className="text-xl font-extrabold text-gray-800 dark:text-neutral-200 mb-4">
              {t("Restaurants near you", "Ресторани поруч")} ({filteredRestaurants.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredRestaurants.map((r) => (
                <button
                  key={r.id}
                  onClick={() => { if (r.open) { setSelectedRestaurant(r.id); setMenuTab("Mains"); } }}
                  className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-neutral-700 text-left transition group ${
                    r.open ? "hover:shadow-md hover:border-red-200 cursor-pointer" : "opacity-60 cursor-not-allowed"
                  }`}
                >
                  {/* Card top */}
                  <div className={`h-28 flex items-center justify-center text-6xl bg-linear-to-br ${
                    r.category === "pizza" ? "from-orange-50 to-red-100" :
                    r.category === "sushi" ? "from-pink-50 to-red-50" :
                    r.category === "burgers" ? "from-yellow-50 to-orange-100" :
                    r.category === "mexican" ? "from-green-50 to-yellow-100" :
                    r.category === "salads" ? "from-green-50 to-emerald-100" :
                    "from-blue-50 to-indigo-100"
                  } relative`}>
                    <EmojiIcon emoji={r.emoji} className="w-16 h-16 group-hover:scale-110 transition-transform inline-block" />
                    <span className={`absolute top-2 right-2 text-xs font-bold px-2 py-0.5 rounded-full ${
                      r.open ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                    }`}>
                      {r.open ? t("Open", "Відкрито") : t("Closed", "Зачинено")}
                    </span>
                    {r.deliveryFee === 0 && (
                      <span className="absolute top-2 left-2 text-xs font-bold bg-yellow-400 text-gray-900 dark:text-white px-2 py-0.5 rounded-full">
                        {t("Free delivery", "Безкоштовно")}
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <div className="font-bold text-gray-900 dark:text-white truncate">{r.name}</div>
                    <div className="text-xs text-gray-500 dark:text-neutral-400 mb-2">{isUk ? r.cuisine.uk : r.cuisine.en}</div>
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <span>⭐ {r.rating}</span>
                      <span>⏱ {r.time} {t("min", "хв")}</span>
                      <span>📦 {t("min", "від")} ₴{r.minOrder}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            {filteredRestaurants.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <div className="text-5xl mb-3">🍽️</div>
                <div className="font-semibold">{t("No restaurants found", "Ресторанів не знайдено")}</div>
                <button onClick={() => { setActiveCategory("all"); setSearchQuery(""); }} className="mt-2 text-red-600 text-sm underline">
                  {t("Clear filters", "Скинути фільтри")}
                </button>
              </div>
            )}
          </>
        )}

        {/* FEATURED RESTAURANT EXPANDED */}
        {selectedRestaurant && selectedRest && (
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 dark:border-neutral-700 overflow-hidden">
            {/* Restaurant header */}
            <div className="bg-linear-to-br from-red-600 to-red-500 text-white p-6 flex items-center gap-4">
              <button
                onClick={() => setSelectedRestaurant(null)}
                className="shrink-0 bg-white/20 hover:bg-white/30 rounded-full w-9 h-9 flex items-center justify-center transition"
              >
                ←
              </button>
              <div className="shrink-0"><EmojiIcon emoji={selectedRest.emoji} className="w-10 h-10" /></div>
              <div className="flex-1 min-w-0">
                <div className="font-extrabold text-xl">{selectedRest.name}</div>
                <div className="text-red-200 text-sm">{isUk ? selectedRest.cuisine.uk : selectedRest.cuisine.en}</div>
                <div className="flex gap-4 mt-1 text-sm text-red-100">
                  <span>⭐ {selectedRest.rating}</span>
                  <span>⏱ {selectedRest.time} {t("min", "хв")}</span>
                  <span>{selectedRest.deliveryFee === 0 ? t("🚚 Free delivery", "🚚 Безкоштовна доставка") : `🚚 ₴${selectedRest.deliveryFee}`}</span>
                </div>
              </div>
            </div>

            {/* Menu tabs */}
            {selectedMenu && (
              <>
                <div className="flex border-b border-gray-100 dark:border-neutral-700 overflow-x-auto">
                  {selectedMenu.categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setMenuTab(cat)}
                      className={`shrink-0 px-5 py-3 text-sm font-semibold transition border-b-2 ${
                        menuTab === cat
                          ? "border-red-500 text-red-600"
                          : "border-transparent text-gray-500 dark:text-neutral-400 hover:text-gray-700"
                      }`}
                    >
                      {t(
                        cat,
                        cat === "Starters" ? "Закуски" :
                        cat === "Mains" ? "Основні" :
                        cat === "Desserts" ? "Десерти" : "Напої"
                      )}
                    </button>
                  ))}
                </div>

                {/* Menu items */}
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedMenu.items
                    .filter((item) => item.cat === menuTab)
                    .map((item) => {
                      const inCart = cart.find((c) => c.id === item.id);
                      return (
                        <div key={item.id} className="flex gap-3 p-3 bg-gray-50 dark:bg-neutral-900 rounded-xl border border-gray-100 dark:border-neutral-700 hover:border-red-200 transition">
                          <div className="shrink-0 w-12 h-12 bg-white dark:bg-neutral-800 rounded-xl flex items-center justify-center shadow-sm">
                            <EmojiIcon emoji={item.emoji} className="w-8 h-8" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm text-gray-900">{isUk ? item.name.uk : item.name.en}</div>
                            <div className="text-xs text-gray-500 dark:text-neutral-400 mb-1">{isUk ? item.desc.uk : item.desc.en}</div>
                            <div className="font-bold text-red-600">₴{item.price}</div>
                          </div>
                          <div className="shrink-0 flex flex-col items-end justify-between">
                            {inCart ? (
                              <div className="flex items-center gap-1">
                                <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 bg-red-100 text-red-600 rounded-full font-bold text-sm hover:bg-red-200 transition">−</button>
                                <span className="text-sm font-bold w-5 text-center">{inCart.qty}</span>
                                <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 bg-red-600 text-white rounded-full font-bold text-sm hover:bg-red-700 transition">+</button>
                              </div>
                            ) : (
                              <button
                                onClick={() => addToCart(item)}
                                className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition"
                              >
                                + {t("Add", "Додати")}
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </>
            )}

            {/* No menu fallback */}
            {!selectedMenu && (
              <div className="p-8 text-center text-gray-400">
                <div className="text-4xl mb-3">🍽️</div>
                <div>{t("Menu coming soon!", "Меню скоро буде!")}</div>
              </div>
            )}
          </div>
        )}

        {/* APP DOWNLOAD SECTION */}
        <div className="mt-10 bg-linear-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-center">
          <div className="flex-1">
            <div className="text-2xl font-extrabold mb-2">
              {t("Download our app 📱", "Завантажте наш додаток 📱")}
            </div>
            <p className="text-gray-400 dark:text-neutral-500 text-sm mb-4">
              {t("Track your order in real time, get exclusive deals and reorder with one tap.", "Відстежуйте замовлення в реальному часі, отримуйте ексклюзивні пропозиції.")}
            </p>
            <div className="flex gap-3 flex-wrap">
              <button className="flex items-center gap-2 bg-white text-gray-900 dark:text-white font-bold px-4 py-2.5 rounded-xl text-sm hover:bg-gray-100 dark:hover:bg-neutral-700 dark:bg-neutral-800 transition">
                <span className="text-xl">🍎</span>
                <div className="text-left">
                  <div className="text-xs text-gray-500 dark:text-neutral-400 leading-none">{t("Download on the", "Завантажити в")}</div>
                  <div className="leading-tight">App Store</div>
                </div>
              </button>
              <button className="flex items-center gap-2 bg-white text-gray-900 dark:text-white font-bold px-4 py-2.5 rounded-xl text-sm hover:bg-gray-100 dark:hover:bg-neutral-700 dark:bg-neutral-800 transition">
                <span className="text-xl">🤖</span>
                <div className="text-left">
                  <div className="text-xs text-gray-500 dark:text-neutral-400 leading-none">{t("Get it on", "Доступно в")}</div>
                  <div className="leading-tight">Google Play</div>
                </div>
              </button>
            </div>
          </div>
          {/* Fake QR code */}
          <div className="shrink-0 flex flex-col items-center gap-2">
            <div className="w-24 h-24 rounded-xl overflow-hidden grid grid-cols-6 grid-rows-6 gap-px bg-gray-600 p-1.5">
              {Array.from({ length: 36 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-sm ${
                    [0,1,2,3,4,5,6,11,12,17,18,23,24,25,26,27,28,29,30,35,7,13,14,15,16,22,8,20,31,32,33,34,10,19].includes(i)
                      ? "bg-white"
                      : "bg-gray-900"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400">{t("Scan to download", "Скануй для завантаження")}</span>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 dark:text-neutral-500 mt-10">
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <div className="flex items-center gap-1 mb-3">
              <span className="text-xl">🍔</span>
              <span className="font-extrabold text-white">QuickBite</span>
            </div>
            <p className="text-xs leading-relaxed">
              {t("Fast, fresh, delivered. Your city's best restaurants at your fingertips.", "Швидко, свіжо, доставлено. Найкращі ресторани міста у вашому телефоні.")}
            </p>
          </div>
          <div>
            <div className="font-semibold text-white text-sm mb-3">{t("Company", "Компанія")}</div>
            <ul className="space-y-1.5 text-xs">
              <li><button className="hover:text-white transition">{t("About Us", "Про нас")}</button></li>
              <li><button className="hover:text-white transition">{t("Careers", "Вакансії")}</button></li>
              <li><button className="hover:text-white transition">{t("Press", "Преса")}</button></li>
              <li><button className="hover:text-white transition">{t("Blog", "Блог")}</button></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-white text-sm mb-3">{t("Help", "Допомога")}</div>
            <ul className="space-y-1.5 text-xs">
              <li><button className="hover:text-white transition">{t("Help Center", "Центр підтримки")}</button></li>
              <li><button className="hover:text-white transition">{t("Track Order", "Відстежити замовлення")}</button></li>
              <li><button className="hover:text-white transition">{t("Refund Policy", "Політика повернення")}</button></li>
              <li><button className="hover:text-white transition">{t("Contact Us", "Зв'язатися")}</button></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-white text-sm mb-3">{t("Partners", "Партнери")}</div>
            <ul className="space-y-1.5 text-xs">
              <li><button className="hover:text-white transition">{t("Become a Partner", "Стати партнером")}</button></li>
              <li><button className="hover:text-white transition">{t("Become a Courier", "Стати кур'єром")}</button></li>
              <li><button className="hover:text-white transition">{t("Advertise", "Реклама")}</button></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-600">
          © 2025 QuickBite. {t("All rights reserved.", "Всі права захищені.")} 🍔
        </div>
      </footer>

      {/* CART SIDEBAR */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/50" onClick={() => setCartOpen(false)} />
          <div className="w-full max-w-sm bg-white dark:bg-neutral-800 shadow-2xl flex flex-col h-full overflow-hidden">
            {/* Cart header */}
            <div className="bg-red-600 text-white p-4 flex items-center justify-between shrink-0">
              <h2 className="font-extrabold text-lg">🛒 {t("Your Cart", "Ваш кошик")}</h2>
              <button onClick={() => setCartOpen(false)} className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition text-lg">×</button>
            </div>

            {/* Cart items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <div className="text-5xl mb-3">🛒</div>
                  <div className="font-semibold">{t("Your cart is empty", "Кошик порожній")}</div>
                  <div className="text-sm mt-1">{t("Add some delicious items!", "Додайте смачні страви!")}</div>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-neutral-900 rounded-xl">
                    <EmojiIcon emoji={item.emoji} className="w-7 h-7 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-gray-800 dark:text-neutral-200 truncate">{item.name}</div>
                      <div className="text-red-600 text-sm font-bold">₴{item.price}</div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 bg-red-100 text-red-600 rounded-full font-bold text-sm hover:bg-red-200 transition">−</button>
                      <span className="text-sm font-bold w-5 text-center">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 bg-red-600 text-white rounded-full font-bold text-sm hover:bg-red-700 transition">+</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart footer */}
            {cart.length > 0 && (
              <div className="border-t border-gray-100 dark:border-neutral-700 p-4 space-y-3 shrink-0">
                {/* Promo code */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder={t("Promo code", "Промокод")}
                    className="flex-1 px-3 py-2 bg-gray-100 dark:bg-neutral-800 rounded-lg text-sm outline-none focus:ring-2 focus:ring-red-400"
                    disabled={promoApplied}
                  />
                  <button
                    onClick={applyPromo}
                    disabled={promoApplied}
                    className="px-3 py-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 dark:text-white font-bold text-sm rounded-lg transition disabled:opacity-50"
                  >
                    {promoApplied ? "✓" : t("Apply", "Застосувати")}
                  </button>
                </div>
                {promoApplied && (
                  <div className="text-green-600 text-xs font-semibold">🎉 {t("20% discount applied!", "Знижку 20% застосовано!")}</div>
                )}

                {/* Summary */}
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>{t("Subtotal", "Проміжна сума")}</span>
                    <span>₴{cartSubtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>{t("Delivery fee", "Вартість доставки")}</span>
                    <span>₴{deliveryFee}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600 font-semibold">
                      <span>{t("Discount (20%)", "Знижка (20%)")}</span>
                      <span>−₴{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-extrabold text-base text-gray-900 dark:text-white border-t border-gray-100 dark:border-neutral-700 pt-2 mt-1">
                    <span>{t("Total", "Разом")}</span>
                    <span className="text-red-600">₴{cartTotal}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-extrabold py-3 rounded-xl transition text-sm"
                >
                  {t("Checkout →", "Оформити замовлення →")}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
