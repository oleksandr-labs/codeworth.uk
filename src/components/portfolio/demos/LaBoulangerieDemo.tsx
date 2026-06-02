"use client";

import { useState } from "react";

/* ───────────── constants ───────────── */

const COLORS = {
  bg: "#FEF3E2",
  burgundy: "#7C2D12",
  burgundyDark: "#5C1F0A",
  gold: "#D97706",
  goldLight: "#FDE68A",
  cream: "#FEF9F0",
  creamDark: "#FAEBD5",
  border: "#F5CFA0",
  text: "#3B1A0A",
  muted: "#92400E",
  mutedLight: "#B45309",
};

const MENU: Record<
  string,
  {
    emoji: string;
    nameEn: string;
    nameUk: string;
    descEn: string;
    descUk: string;
    price: number;
    popular?: boolean;
    newItem?: boolean;
  }[]
> = {
  bread: [
    {
      emoji: "🍞",
      nameEn: "Country Sourdough",
      nameUk: "Хліб на заквасці",
      descEn: "72-hour ferment, open crumb, crisp crust",
      descUk: "72 год. ферментації, відкрита крихта",
      price: 95,
      popular: true,
    },
    {
      emoji: "🥖",
      nameEn: "French Baguette",
      nameUk: "Французький батон",
      descEn: "Classic Parisian, baked at 6 am daily",
      descUk: "Класичний паризький, щодня о 6:00",
      price: 55,
    },
    {
      emoji: "🫓",
      nameEn: "Whole Wheat Miche",
      nameUk: "Цільнозерновий міш",
      descEn: "Stone-ground wheat, 40% rye blend",
      descUk: "Кам'яний помол, 40% жита",
      price: 88,
    },
    {
      emoji: "🌾",
      nameEn: "Seed & Grain Loaf",
      nameUk: "Хліб із зернами",
      descEn: "Sesame, flax, pumpkin, sunflower",
      descUk: "Кунжут, льон, гарбуз, соняшник",
      price: 102,
    },
  ],
  croissants: [
    {
      emoji: "🥐",
      nameEn: "Butter Croissant",
      nameUk: "Масляний круасан",
      descEn: "Pure Breton butter, 81-layer lamination",
      descUk: "Бретонське масло, 81 шар тіста",
      price: 72,
      popular: true,
    },
    {
      emoji: "🍫",
      nameEn: "Dark Chocolate Croissant",
      nameUk: "Круасан із шоколадом",
      descEn: "70% Valrhona dark inside",
      descUk: "70% темний Valrhona всередині",
      price: 85,
    },
    {
      emoji: "🧀",
      nameEn: "Ham & Gruyère",
      nameUk: "Шинка та Грюєр",
      descEn: "Savory with mountain cheese",
      descUk: "Солоний з гірським сиром",
      price: 98,
    },
    {
      emoji: "🌸",
      nameEn: "Raspberry Rose Croissant",
      nameUk: "Малина та троянда",
      descEn: "Rose cream, fresh raspberry",
      descUk: "Трояндовий крем, свіжа малина",
      price: 92,
      newItem: true,
    },
  ],
  cakes: [
    {
      emoji: "🎂",
      nameEn: "Fraisier",
      nameUk: "Фрез'є",
      descEn: "Genoise, vanilla cream, fresh strawberries",
      descUk: "Женуаз, ванільний крем, полуниця",
      price: 980,
      popular: true,
    },
    {
      emoji: "🍰",
      nameEn: "Opéra",
      nameUk: "Опера",
      descEn: "Coffee buttercream, ganache, almond biscuit",
      descUk: "Кавовий крем, ганаш, мигдальний бісквіт",
      price: 1100,
    },
    {
      emoji: "🫐",
      nameEn: "Tarte Bleuet",
      nameUk: "Тарт із чорницею",
      descEn: "Mascarpone cream, blueberry compote",
      descUk: "Маскарпоне, компот із чорниці",
      price: 720,
    },
  ],
  eclairs: [
    {
      emoji: "⚡",
      nameEn: "Vanilla Bean Éclair",
      nameUk: "Еклер з ваніллю",
      descEn: "Madagascar vanilla, mirror glaze",
      descUk: "Мадагаскарська ваніль, дзеркальна глазур",
      price: 68,
      popular: true,
    },
    {
      emoji: "🍋",
      nameEn: "Lemon Yuzu Éclair",
      nameUk: "Лимон та юдзу",
      descEn: "Citrus cream, yuzu gel",
      descUk: "Цитрусовий крем, гель юдзу",
      price: 75,
    },
    {
      emoji: "🍓",
      nameEn: "Strawberry Éclair",
      nameUk: "Полуничний еклер",
      descEn: "Chantilly cream, fresh strawberry",
      descUk: "Шантильї, свіжа полуниця",
      price: 72,
      newItem: true,
    },
  ],
  macarons: [
    {
      emoji: "🌈",
      nameEn: "Raspberry Macaron",
      nameUk: "Малиновий макарон",
      descEn: "Crisp shell, raspberry ganache",
      descUk: "Хрустка оболонка, малиновий ганаш",
      price: 48,
    },
    {
      emoji: "💚",
      nameEn: "Pistachio Macaron",
      nameUk: "Фісташковий макарон",
      descEn: "Bronte pistachio cream",
      descUk: "Крем із фісташок Бронте",
      price: 52,
      popular: true,
    },
    {
      emoji: "🤍",
      nameEn: "Salted Caramel Macaron",
      nameUk: "Карамельний із сіллю",
      descEn: "Fleur de sel caramel filling",
      descUk: "Карамель fleur de sel",
      price: 50,
    },
  ],
  seasonal: [
    {
      emoji: "🌸",
      nameEn: "Strawberry Tart",
      nameUk: "Полунична тарт",
      descEn: "Spring special with pastry cream",
      descUk: "Весняна спеціальна з кремом",
      price: 165,
      newItem: true,
    },
    {
      emoji: "🍑",
      nameEn: "Peach Feuilletine",
      nameUk: "Персиковий фельєтин",
      descEn: "White peach, praline feuilletine",
      descUk: "Білий персик, праліне",
      price: 185,
    },
    {
      emoji: "🫚",
      nameEn: "Olive Oil Financier",
      nameUk: "Фінансьє на оливці",
      descEn: "Provençal olive oil, almond",
      descUk: "Прованська олія, мигдаль",
      price: 78,
    },
  ],
};

const TABS = [
  { key: "bread", en: "Bread", uk: "Хліб" },
  { key: "croissants", en: "Croissants", uk: "Круасани" },
  { key: "cakes", en: "Cakes", uk: "Торти" },
  { key: "eclairs", en: "Eclairs", uk: "Еклери" },
  { key: "macarons", en: "Macarons", uk: "Макарони" },
  { key: "seasonal", en: "Seasonal", uk: "Сезонне" },
];

const CAKE_STEPS: {
  keyEn: string;
  keyUk: string;
  titleEn: string;
  titleUk: string;
  options: { en: string; uk: string }[];
}[] = [
  {
    keyEn: "Base",
    keyUk: "Основа",
    titleEn: "Choose Base",
    titleUk: "Оберіть основу",
    options: [
      { en: "Sponge", uk: "Бісквіт" },
      { en: "Mousse", uk: "Мус" },
      { en: "Cheesecake", uk: "Чізкейк" },
      { en: "Marshmallow", uk: "Зефір" },
    ],
  },
  {
    keyEn: "Filling",
    keyUk: "Начинка",
    titleEn: "Choose Filling",
    titleUk: "Оберіть начинку",
    options: [
      { en: "Raspberry", uk: "Малина" },
      { en: "Chocolate", uk: "Шоколад" },
      { en: "Lemon", uk: "Лимон" },
      { en: "Caramel", uk: "Карамель" },
      { en: "Pistachio", uk: "Фісташка" },
    ],
  },
  {
    keyEn: "Coating",
    keyUk: "Покриття",
    titleEn: "Choose Coating",
    titleUk: "Оберіть покриття",
    options: [
      { en: "Velour", uk: "Велюр" },
      { en: "Mirror Glaze", uk: "Дзеркальна глазур" },
      { en: "Cream", uk: "Вершки" },
    ],
  },
  {
    keyEn: "Decor",
    keyUk: "Декор",
    titleEn: "Choose Decor",
    titleUk: "Оберіть декор",
    options: [
      { en: "Flowers", uk: "Квіти" },
      { en: "Berries", uk: "Ягоди" },
      { en: "Macarons", uk: "Макарони" },
      { en: "Inscription", uk: "Надпис" },
    ],
  },
  {
    keyEn: "Weight",
    keyUk: "Вага",
    titleEn: "Choose Weight",
    titleUk: "Оберіть вагу",
    options: [
      { en: "1 kg", uk: "1 кг" },
      { en: "1.5 kg", uk: "1.5 кг" },
      { en: "2 kg", uk: "2 кг" },
    ],
  },
];

const WEIGHT_PRICES: Record<string, number> = {
  "1 kg": 580,
  "1.5 kg": 820,
  "2 kg": 1060,
};

const EVENTS = [
  { en: "Birthday", uk: "День народження", emoji: "🎂" },
  { en: "Wedding", uk: "Весілля", emoji: "💍" },
  { en: "Easter", uk: "Великдень", emoji: "🐣" },
  { en: "Christmas", uk: "Різдво", emoji: "🎄" },
];

const FRESH_TODAY = [
  { emoji: "🥐", en: "Butter Croissant", uk: "Масляний круасан", qty: 24 },
  { emoji: "🍞", en: "Country Sourdough", uk: "Хліб на заквасці", qty: 12 },
  { emoji: "⚡", en: "Vanilla Éclair", uk: "Ванільний еклер", qty: 30 },
];

const REVIEWS = [
  {
    name: "Олена К.",
    nameEn: "Sophie C.",
    text: "Круасани — просто неймовірні. Щосуботи беру по 6 штук, більше не залишають.",
    textEn: "The croissants are simply incredible. I get 6 every Saturday — they never last till Sunday.",
    rating: 5,
    date: "15 квітня 2025",
    dateEn: "April 15, 2025",
  },
  {
    name: "Михайло Д.",
    nameEn: "James T.",
    text: "Замовляв торт Опера на ювілей. Гості були вражені — і смаком, і виглядом. Дякую майстрам!",
    textEn: "Ordered the Opéra cake for an anniversary. Guests were amazed — both the taste and the look. Thank you!",
    rating: 5,
    date: "2 квітня 2025",
    dateEn: "April 2, 2025",
  },
  {
    name: "Софія Р.",
    nameEn: "Olivia M.",
    text: "Нарешті знайшла місце де хліб — це справжнє мистецтво. Хліб на заквасці беру щотижня.",
    textEn: "Finally found a place where bread is real art. The sourdough loaf is my weekly staple.",
    rating: 5,
    date: "28 березня 2025",
    dateEn: "March 28, 2025",
  },
];

const INSTAGRAM_PHOTOS = [
  { bg: "from-amber-200 to-yellow-300", emoji: "🥐", label: "Croissants du matin" },
  { bg: "from-rose-200 to-pink-300", emoji: "🎂", label: "Fraisier de saison" },
  { bg: "from-amber-300 to-orange-300", emoji: "🍞", label: "Pain au levain" },
  { bg: "from-purple-200 to-violet-300", emoji: "🌸", label: "Tarte printemps" },
  { bg: "from-yellow-200 to-amber-300", emoji: "⚡", label: "Éclairs du jour" },
  { bg: "from-emerald-200 to-green-300", emoji: "💚", label: "Macarons pistache" },
];

const BESTSELLERS = [
  { emoji: "🥐", en: "Butter Croissant", uk: "Масляний круасан", price: 72 },
  { emoji: "🍞", en: "Country Sourdough", uk: "Хліб на заквасці", price: 95 },
  { emoji: "⚡", en: "Vanilla Éclair", uk: "Ванільний еклер", price: 68 },
  { emoji: "💚", en: "Pistachio Macaron", uk: "Фісташковий макарон", price: 52 },
  { emoji: "🎂", en: "Fraisier", uk: "Фрез'є", price: 980 },
  { emoji: "🌸", en: "Raspberry Rose", uk: "Малина та троянда", price: 92 },
];

function fmtPrice(uah: number, isUk: boolean): string {
  if (isUk) return `${uah} ₴`;
  return `£${Math.ceil(uah / 40 / 5) * 5}`;
}

/* ───────────── component ───────────── */

export function LaBoulangerieDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [activeTab, setActiveTab] = useState("bread");
  const [builderStep, setBuilderStep] = useState(0);
  const [selections, setSelections] = useState<Record<number, string>>({});
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [orderSent, setOrderSent] = useState(false);

  const currentPrice =
    selections[4] !== undefined ? WEIGHT_PRICES[selections[4]] ?? 0 : 0;

  const selectOption = (stepIdx: number, option: string) => {
    setSelections((prev) => ({ ...prev, [stepIdx]: option }));
    if (stepIdx < CAKE_STEPS.length - 1) {
      setBuilderStep(stepIdx + 1);
    }
  };

  const resetBuilder = () => {
    setSelections({});
    setBuilderStep(0);
  };

  const address = isUk ? "вул. Франсуа Рабле, 12, Київ" : "14 Regent Street, London W1B 5RH";
  const phone = isUk ? "+38 (044) 123-45-67" : "+44 20 7946 0512";
  const instagram = isUk ? "@laboulangerie.kyiv" : "@laboulangerie.london";
  const award = isUk ? "Найкраща булочна Київ 2023" : "Best Patisserie London 2023";

  return (
    <div
      style={{ backgroundColor: COLORS.bg, color: COLORS.text, fontFamily: "'Georgia', serif", minHeight: "100vh" }}
    >
      {/* ── Hero ── */}
      <div style={{ backgroundColor: COLORS.burgundy }} className="relative overflow-hidden">
        {/* Diagonal stripe texture */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(253,230,138,0.07) 0px, rgba(253,230,138,0.07) 1px, transparent 1px, transparent 18px)",
          }}
        />
        {/* Gold top accent */}
        <div style={{ height: 4, background: `linear-gradient(90deg, ${COLORS.gold}, #F59E0B, ${COLORS.gold})` }} />

        <div className="relative px-6 pt-10 pb-12">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">

            {/* Left: main text */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-3 mb-5">
                <div style={{ height: 1, width: 28, backgroundColor: COLORS.gold, opacity: 0.7 }} />
                <p style={{ color: COLORS.gold, letterSpacing: "0.35em" }} className="text-xs uppercase font-bold">
                  Depuis 1988
                </p>
                <div style={{ height: 1, width: 28, backgroundColor: COLORS.gold, opacity: 0.7 }} />
              </div>

              <h1
                className="text-6xl font-bold text-white mb-3 leading-none"
                style={{ fontStyle: "italic", letterSpacing: "-0.02em" }}
              >
                La Boulangerie
              </h1>

              <p style={{ color: "rgba(253,230,138,0.8)" }} className="text-lg italic mb-2">
                {isUk ? "«Щодня — з любов'ю та маслом Бретані»" : "«Every day — with love and Breton butter»"}
              </p>

              <p style={{ color: "rgba(255,255,255,0.5)" }} className="text-sm mb-2">
                {address}
              </p>
              <p style={{ color: "rgba(255,255,255,0.4)" }} className="text-sm mb-8">
                {phone} · {isUk ? "Відчинено 07:00–20:00" : "Open 07:00–20:00"}
              </p>

              <div className="flex gap-3 flex-wrap justify-center md:justify-start">
                <button
                  style={{
                    backgroundColor: COLORS.gold,
                    color: "#fff",
                    border: "none",
                    borderRadius: 10,
                    padding: "12px 30px",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    letterSpacing: "0.03em",
                    boxShadow: "0 4px 14px rgba(217,119,6,0.45)",
                  }}
                >
                  🎂 {isUk ? "Замовити торт" : "Order a Cake"}
                </button>
                <button
                  style={{
                    backgroundColor: "transparent",
                    color: "rgba(255,255,255,0.85)",
                    border: "1.5px solid rgba(255,255,255,0.3)",
                    borderRadius: 10,
                    padding: "12px 30px",
                    fontSize: 14,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  🥐 {isUk ? "Переглянути меню" : "View Menu"}
                </button>
              </div>
            </div>

            {/* Right: magazine cover card — hidden on mobile */}
            <div
              className="hidden md:flex shrink-0"
              style={{
                width: 220,
                background: "linear-gradient(160deg, #FEF9F0 0%, #FAEBD5 100%)",
                borderRadius: 20,
                padding: "24px 20px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                border: `1px solid rgba(253,230,138,0.4)`,
              }}
            >
              <p style={{ color: COLORS.gold, fontSize: 9, letterSpacing: "0.4em", fontWeight: 700 }} className="uppercase">
                La Boulangerie
              </p>
              <div style={{ height: 1, width: "100%", backgroundColor: COLORS.border }} />
              <div className="flex gap-2 text-4xl flex-wrap justify-center">
                {"🥐🎂⚡🌸".split("").map((ch, i) => (
                  <span key={i}>{ch}</span>
                ))}
              </div>
              <div style={{ height: 1, width: "100%", backgroundColor: COLORS.border }} />
              <p style={{ color: COLORS.burgundy, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textAlign: "center" }}>
                Ouvert chaque jour
              </p>
              <p style={{ color: COLORS.muted, fontSize: 10, textAlign: "center" }}>
                07:00 – 20:00
              </p>
              <div
                style={{ backgroundColor: COLORS.burgundy, borderRadius: 8, padding: "6px 14px", marginTop: 4 }}
              >
                <p style={{ color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: "0.05em" }}>
                  {isUk ? "З 1988 Року" : "Since 1988"}
                </p>
              </div>
            </div>
          </div>

          {/* Today's Fresh bar inside hero */}
          <div className="max-w-4xl mx-auto mt-8">
            <div
              style={{ backgroundColor: "rgba(0,0,0,0.22)", border: `1px solid rgba(217,119,6,0.35)`, borderRadius: 14 }}
              className="flex gap-5 px-6 py-3 flex-wrap items-center justify-center"
            >
              <span style={{ color: COLORS.gold }} className="font-bold text-xs uppercase tracking-widest shrink-0">
                {isUk ? "Сьогодні свіже:" : "Today's Fresh:"}
              </span>
              {FRESH_TODAY.map((item) => (
                <span key={item.en} style={{ color: "rgba(255,255,255,0.8)" }} className="text-sm">
                  {item.emoji} {isUk ? item.uk : item.en}
                  <span style={{ color: "rgba(255,255,255,0.35)" }} className="ml-1 text-xs">×{item.qty}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Trust Strip ── */}
      <div style={{ backgroundColor: COLORS.gold }} className="px-4 py-4">
        <div className="max-w-3xl mx-auto flex flex-wrap gap-3 justify-center">
          {[
            { icon: "🏆", text: award },
            { icon: "🥐", en: "200+ items daily", uk: "200+ позицій щодня" },
            { icon: "⭐", en: "4.9★  800+ reviews", uk: "4.9★  800+ відгуків" },
          ].map((b, i) => (
            <span
              key={i}
              style={{ backgroundColor: "rgba(255,255,255,0.22)", borderRadius: 24, padding: "6px 18px" }}
              className="text-white text-sm font-semibold"
            >
              {b.icon}{" "}
              {"text" in b ? b.text : isUk ? b.uk : b.en}
            </span>
          ))}
        </div>
      </div>

      {/* ── Today's Bestsellers row ── */}
      <div className="px-4 pt-10 pb-2 max-w-3xl mx-auto">
        <p style={{ color: COLORS.burgundy }} className="text-xs uppercase font-bold tracking-widest text-center mb-4">
          {isUk ? "Бестселери дня" : "Today's Bestsellers"}
        </p>
        <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
          {BESTSELLERS.map((item) => (
            <div
              key={item.en}
              style={{
                backgroundColor: COLORS.cream,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 50,
                padding: "8px 16px",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span className="text-lg">{item.emoji}</span>
              <span style={{ color: COLORS.text, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>
                {isUk ? item.uk : item.en}
              </span>
              <span style={{ color: COLORS.gold, fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>
                {fmtPrice(item.price, isUk)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Menu ── */}
      <div className="px-4 py-10 max-w-3xl mx-auto">
        <h2 style={{ color: COLORS.burgundy }} className="text-2xl font-bold mb-1 text-center">
          {isUk ? "Наше Меню" : "Our Menu"}
        </h2>
        <p style={{ color: COLORS.muted }} className="text-sm text-center mb-6">
          {isUk ? "Випікаємо щодня з 04:30 — все свіже до 20:00" : "Baked daily from 04:30 — everything fresh until 20:00"}
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-7">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                backgroundColor: activeTab === tab.key ? COLORS.burgundy : COLORS.cream,
                color: activeTab === tab.key ? "#fff" : COLORS.muted,
                border: `1px solid ${activeTab === tab.key ? COLORS.burgundy : COLORS.border}`,
                borderRadius: 22,
                padding: "6px 20px",
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "inherit",
                fontWeight: activeTab === tab.key ? 700 : 400,
                transition: "all 0.15s",
              }}
            >
              {isUk ? tab.uk : tab.en}
            </button>
          ))}
        </div>

        {/* Product card grid — 2 cols mobile, 4 cols sm+ */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {(MENU[activeTab] ?? []).map((item) => (
            <div
              key={item.nameEn}
              style={{
                backgroundColor: COLORS.cream,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 16,
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Badge overlay on image corner */}
              {item.popular && (
                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    backgroundColor: COLORS.burgundy,
                    color: "#fff",
                    fontSize: 9,
                    fontWeight: 700,
                    padding: "3px 8px",
                    borderRadius: 6,
                    letterSpacing: "0.1em",
                    zIndex: 1,
                  }}
                >
                  {isUk ? "ХІТ" : "HIT"}
                </div>
              )}
              {item.newItem && (
                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    backgroundColor: COLORS.gold,
                    color: "#fff",
                    fontSize: 9,
                    fontWeight: 700,
                    padding: "3px 8px",
                    borderRadius: 6,
                    letterSpacing: "0.1em",
                    zIndex: 1,
                  }}
                >
                  {isUk ? "НОВЕ" : "NEW"}
                </div>
              )}

              {/* Tall gradient image header */}
              <div
                style={{
                  height: 120,
                  background: `linear-gradient(135deg, ${COLORS.creamDark} 0%, ${COLORS.goldLight} 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: 48 }}>{item.emoji}</span>
              </div>

              {/* Card body */}
              <div className="p-3">
                <p style={{ color: COLORS.burgundy }} className="font-bold text-sm leading-tight">
                  {isUk ? item.nameUk : item.nameEn}
                </p>
                <p style={{ color: COLORS.muted, fontSize: 10 }} className="mt-1 leading-snug">
                  {isUk ? item.descUk : item.descEn}
                </p>
                <p style={{ color: COLORS.gold }} className="text-sm font-bold mt-2">
                  {fmtPrice(item.price, isUk)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Our Story + Art Gallery ── */}
      <div
        style={{ backgroundColor: COLORS.creamDark, borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}` }}
        className="px-4 py-14"
      >
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Story text */}
          <div>
            <p style={{ color: COLORS.gold, letterSpacing: "0.25em" }} className="text-xs uppercase font-bold mb-2">
              {isUk ? "Наша Історія" : "Our Story"}
            </p>
            <h2 style={{ color: COLORS.burgundy }} className="text-2xl font-bold mb-4 leading-snug">
              {isUk
                ? "36 років смаку, відкритого з першого бісквіту"
                : "36 years of flavour, opened with the first biscuit"}
            </h2>
            <p style={{ color: COLORS.muted }} className="text-sm leading-relaxed mb-4">
              {isUk
                ? "У 1988 році пастижє Клод Моро відкрив невеличку булочну на вулиці Рабле. Сьогодні нею керує третє покоління — ті самі рецепти, та сама закваска, той самий ранковий ритуал о 04:30."
                : "In 1988, pastry chef Claude Moreau opened a small boulangerie on Rabelais Street. Today it is run by the third generation — the same recipes, the same sourdough starter, the same 4:30 am ritual."}
            </p>
            <p style={{ color: COLORS.muted }} className="text-sm leading-relaxed mb-6">
              {isUk
                ? "Ми використовуємо борошно млинів Прованс, масло з Бретані та сезонні фрукти від місцевих фермерів у радіусі 80 км."
                : "We use flour from Provence mills, butter from Brittany, and seasonal fruit from local farmers within 80 km."}
            </p>
            <blockquote
              style={{ borderLeft: `4px solid ${COLORS.gold}`, paddingLeft: 16, margin: 0 }}
            >
              <p style={{ color: COLORS.burgundy }} className="text-sm italic leading-relaxed mb-1">
                {isUk
                  ? "«Добра випічка вимагає терпіння більше, ніж інгредієнтів.»"
                  : "«Good pastry demands patience more than ingredients.»"}
              </p>
              <cite style={{ color: COLORS.gold, fontSize: 11, fontStyle: "normal", fontWeight: 700, letterSpacing: "0.05em" }}>
                — Claude Moreau, {isUk ? "засновник" : "founder"}
              </cite>
            </blockquote>
          </div>

          {/* Art gallery layout: one tall top-right, two smaller below-left */}
          <div className="grid grid-cols-2 gap-3" style={{ gridTemplateRows: "auto auto" }}>
            {/* Top-right: tall photo spanning full height on right */}
            <div
              className="row-span-2 bg-linear-to-br from-amber-200 to-orange-300 rounded-2xl flex flex-col items-center justify-end pb-5"
              style={{ minHeight: 260 }}
            >
              <span className="text-5xl mb-2">👨‍🍳</span>
              <span style={{ color: COLORS.burgundy, fontSize: 10, fontWeight: 700, textAlign: "center", padding: "0 8px" }}>
                {isUk ? "Клод Моро, 1988" : "Claude Moreau, 1988"}
              </span>
            </div>
            {/* Bottom-left top */}
            <div
              className="bg-linear-to-br from-rose-100 to-pink-200 rounded-2xl flex flex-col items-center justify-center py-6"
            >
              <span className="text-3xl mb-1">🥐</span>
              <span style={{ color: COLORS.muted, fontSize: 10, fontWeight: 600 }}>
                {isUk ? "Зранку 04:30" : "Morning 04:30"}
              </span>
            </div>
            {/* Bottom-left bottom */}
            <div
              className="bg-linear-to-br from-yellow-100 to-amber-200 rounded-2xl flex flex-col items-center justify-center py-6"
            >
              <span className="text-3xl mb-1">🏺</span>
              <span style={{ color: COLORS.muted, fontSize: 10, fontWeight: 600 }}>
                {isUk ? "Закваска 1988р." : "Starter since 1988"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Pastry of the Day ── */}
      <div className="px-4 py-10 max-w-3xl mx-auto">
        <div
          style={{
            background: `linear-gradient(135deg, ${COLORS.burgundy} 0%, #9A3412 60%, #7C2D12 100%)`,
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "0 12px 40px rgba(124,45,18,0.3)",
            border: `1px solid rgba(253,230,138,0.2)`,
          }}
          className="relative"
        >
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: "repeating-linear-gradient(-45deg, #FDE68A 0px, #FDE68A 1px, transparent 1px, transparent 16px)",
            }}
          />
          <div className="relative p-8 flex items-center gap-8 flex-wrap">
            <div
              style={{
                width: 90,
                height: 90,
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontSize: 52,
              }}
            >
              🍋
            </div>
            <div className="flex-1 min-w-0">
              <span style={{ color: COLORS.gold, fontSize: 10, letterSpacing: "0.3em" }} className="uppercase font-bold">
                {isUk ? "Тістечко дня" : "Pastry of the Day"}
              </span>
              <h3 className="text-white text-2xl font-bold mt-1" style={{ fontStyle: "italic" }}>
                {isUk ? "Лимон-Юдзу Еклер" : "Lemon Yuzu Éclair"}
              </h3>
              <p style={{ color: "rgba(255,255,255,0.6)" }} className="text-sm mt-2 leading-relaxed">
                {isUk
                  ? "Повітряний заварний крем із жовтою юдзу-желе та хрустким карамельним декором. Тільки 20 штук щодня."
                  : "Light custard with yellow yuzu jelly and crispy caramel décor. Only 20 pieces each day."}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p style={{ color: COLORS.goldLight }} className="text-3xl font-bold">{fmtPrice(75, isUk)}</p>
              <p style={{ color: "rgba(255,255,255,0.35)" }} className="text-xs mt-1">
                {isUk ? `Замість ${fmtPrice(95, isUk)}` : `Was ${fmtPrice(95, isUk)}`}
              </p>
              <div
                style={{
                  marginTop: 12,
                  backgroundColor: COLORS.gold,
                  borderRadius: 8,
                  padding: "7px 16px",
                  display: "inline-block",
                  cursor: "pointer",
                }}
              >
                <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>
                  {isUk ? "Замовити" : "Order now"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Cake Builder ── */}
      <div style={{ backgroundColor: COLORS.burgundy }} className="px-4 py-14">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <p style={{ color: COLORS.gold, letterSpacing: "0.25em" }} className="text-xs uppercase font-bold mb-2">
              {isUk ? "Авторський сервіс" : "Custom Service"}
            </p>
            <h2 className="text-white text-3xl font-bold" style={{ fontStyle: "italic" }}>
              {isUk ? "Конструктор торту" : "Cake Builder"}
            </h2>
            <p style={{ color: "rgba(255,255,255,0.45)" }} className="text-sm mt-2">
              {isUk ? "Складіть торт мрії крок за кроком" : "Build your dream cake step by step"}
            </p>
          </div>

          {/* Step indicators */}
          <div className="flex justify-center gap-2 mb-6 flex-wrap">
            {CAKE_STEPS.map((step, idx) => (
              <button
                key={step.keyEn}
                onClick={() => setBuilderStep(idx)}
                style={{
                  backgroundColor:
                    idx === builderStep
                      ? COLORS.gold
                      : selections[idx] !== undefined
                      ? "rgba(217,119,6,0.4)"
                      : "rgba(255,255,255,0.08)",
                  color:
                    idx === builderStep || selections[idx] !== undefined
                      ? "#fff"
                      : "rgba(255,255,255,0.45)",
                  border: `2px solid ${idx === builderStep ? COLORS.gold : "transparent"}`,
                  borderRadius: 22,
                  padding: "5px 16px",
                  fontSize: 12,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.15s",
                }}
              >
                {idx + 1}. {isUk ? step.keyUk : step.keyEn}
                {selections[idx] !== undefined && " ✓"}
              </button>
            ))}
          </div>

          {/* Current step options */}
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 18,
            }}
            className="p-7"
          >
            <p className="text-white font-semibold mb-5 text-center text-base">
              {isUk ? CAKE_STEPS[builderStep].titleUk : CAKE_STEPS[builderStep].titleEn}
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {CAKE_STEPS[builderStep].options.map((opt) => {
                const isSelected = selections[builderStep] === opt.en;
                return (
                  <button
                    key={opt.en}
                    onClick={() => selectOption(builderStep, opt.en)}
                    style={{
                      backgroundColor: isSelected ? COLORS.gold : "transparent",
                      color: isSelected ? "#fff" : "rgba(255,255,255,0.75)",
                      border: `1.5px solid ${isSelected ? COLORS.gold : "rgba(255,255,255,0.22)"}`,
                      borderRadius: 10,
                      padding: "10px 22px",
                      fontSize: 13,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      transition: "all 0.15s",
                    }}
                  >
                    {isUk ? opt.uk : opt.en}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selections summary */}
          {Object.keys(selections).length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2 justify-center">
              {CAKE_STEPS.map((step, idx) =>
                selections[idx] !== undefined ? (
                  <span
                    key={step.keyEn}
                    style={{
                      backgroundColor: "rgba(217,119,6,0.2)",
                      border: `1px solid ${COLORS.gold}`,
                      color: COLORS.goldLight,
                      borderRadius: 6,
                      padding: "3px 10px",
                      fontSize: 12,
                    }}
                  >
                    {isUk ? step.keyUk : step.keyEn}:{" "}
                    {isUk
                      ? step.options.find((o) => o.en === selections[idx])?.uk
                      : selections[idx]}
                  </span>
                ) : null
              )}
            </div>
          )}

          {/* Price + actions */}
          <div className="mt-8 text-center">
            <div className="text-5xl font-bold" style={{ color: COLORS.gold }}>
              {currentPrice > 0 ? fmtPrice(currentPrice, isUk) : "—"}
            </div>
            <p style={{ color: "rgba(255,255,255,0.35)" }} className="text-xs mt-1">
              {isUk ? "Вартість залежить від ваги" : "Price based on weight"}
            </p>
            <div className="flex gap-3 justify-center mt-6">
              <button
                onClick={resetBuilder}
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid rgba(255,255,255,0.22)",
                  color: "rgba(255,255,255,0.6)",
                  borderRadius: 10,
                  padding: "11px 24px",
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                {isUk ? "Скинути" : "Reset"}
              </button>
              <button
                disabled={Object.keys(selections).length < CAKE_STEPS.length}
                style={{
                  backgroundColor:
                    Object.keys(selections).length >= CAKE_STEPS.length
                      ? COLORS.gold
                      : "rgba(255,255,255,0.1)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "11px 30px",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor:
                    Object.keys(selections).length >= CAKE_STEPS.length
                      ? "pointer"
                      : "not-allowed",
                  fontFamily: "inherit",
                  opacity: Object.keys(selections).length >= CAKE_STEPS.length ? 1 : 0.4,
                }}
              >
                {isUk ? "Замовити торт →" : "Order Cake →"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Customer Reviews ── */}
      <div className="px-4 py-14 max-w-3xl mx-auto">
        <p style={{ color: COLORS.gold, letterSpacing: "0.25em" }} className="text-xs uppercase font-bold text-center mb-1">
          {isUk ? "Відгуки" : "Reviews"}
        </p>
        <h2 style={{ color: COLORS.burgundy }} className="text-2xl font-bold text-center mb-10">
          {isUk ? "Що кажуть наші гості" : "What our guests say"}
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {REVIEWS.map((r) => {
            const displayName = isUk ? r.name : r.nameEn;
            const initials = displayName
              .split(/[\s.]+/)
              .filter(Boolean)
              .slice(0, 2)
              .map((w) => w[0])
              .join("")
              .toUpperCase();
            return (
              <div
                key={r.name}
                style={{
                  backgroundColor: COLORS.cream,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 18,
                  boxShadow: "0 2px 12px rgba(124,45,18,0.06)",
                }}
                className="p-6 flex flex-col items-center text-center"
              >
                {/* Avatar circle */}
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${COLORS.burgundy} 0%, #9A3412 100%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 12,
                    flexShrink: 0,
                  }}
                >
                  <span style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>{initials}</span>
                </div>

                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <span key={i} style={{ color: COLORS.gold }} className="text-base">★</span>
                  ))}
                </div>
                <p style={{ color: COLORS.text }} className="text-sm leading-relaxed mb-4 italic flex-1">
                  &ldquo;{isUk ? r.text : r.textEn}&rdquo;
                </p>
                <div>
                  <p style={{ color: COLORS.burgundy }} className="text-sm font-bold">{displayName}</p>
                  <p style={{ color: COLORS.muted }} className="text-xs mt-0.5">{isUk ? r.date : r.dateEn}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-7 text-center">
          <span style={{ color: COLORS.muted }} className="text-sm">
            ⭐ {isUk ? "Середня оцінка 4.9 на основі 800+ відгуків" : "Average rating 4.9 based on 800+ reviews"}
          </span>
        </div>
      </div>

      {/* ── Pre-order Events ── */}
      <div
        style={{
          backgroundColor: COLORS.creamDark,
          borderTop: `1px solid ${COLORS.border}`,
          borderBottom: `1px solid ${COLORS.border}`,
        }}
        className="px-4 py-14"
      >
        <div className="max-w-2xl mx-auto">
          <h2 style={{ color: COLORS.burgundy }} className="text-2xl font-bold text-center mb-1">
            {isUk ? "Замовлення до Свят" : "Event Pre-Orders"}
          </h2>
          <p style={{ color: COLORS.muted }} className="text-sm text-center mb-8">
            {isUk
              ? "Готуємо особливе до ваших урочистостей — бронюйте за 3+ дні"
              : "We craft special pieces for your celebrations — book 3+ days ahead"}
          </p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-6">
            {EVENTS.map((ev) => (
              <button
                key={ev.en}
                onClick={() => setSelectedEvent(ev.en)}
                style={{
                  backgroundColor: selectedEvent === ev.en ? COLORS.burgundy : COLORS.cream,
                  border: `1.5px solid ${selectedEvent === ev.en ? COLORS.burgundy : COLORS.border}`,
                  borderRadius: 16,
                  padding: "20px 8px",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  textAlign: "center",
                  transition: "all 0.15s",
                  boxShadow: selectedEvent === ev.en ? "0 4px 16px rgba(124,45,18,0.25)" : "none",
                }}
              >
                <div className="text-3xl mb-2">{ev.emoji}</div>
                <div
                  style={{
                    color: selectedEvent === ev.en ? "#fff" : COLORS.burgundy,
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  {isUk ? ev.uk : ev.en}
                </div>
              </button>
            ))}
          </div>

          {selectedEvent && !orderSent && (
            <div
              style={{ backgroundColor: COLORS.cream, border: `1px solid ${COLORS.border}`, borderRadius: 16 }}
              className="p-6 text-center"
            >
              <p style={{ color: COLORS.burgundy }} className="font-semibold mb-1">
                {isUk
                  ? `Замовлення на ${EVENTS.find((e) => e.en === selectedEvent)?.uk}`
                  : `${selectedEvent} order`}
              </p>
              <p style={{ color: COLORS.muted }} className="text-xs mb-5">
                {isUk
                  ? "Залиште заявку і ми зв'яжемося з вами для узгодження деталей"
                  : "Leave a request and we'll contact you to arrange details"}
              </p>
              <button
                onClick={() => setOrderSent(true)}
                style={{
                  backgroundColor: COLORS.burgundy,
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "12px 32px",
                  fontSize: 14,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontWeight: 700,
                  boxShadow: "0 4px 14px rgba(124,45,18,0.3)",
                }}
              >
                {isUk ? "Надіслати заявку" : "Send Request"}
              </button>
            </div>
          )}

          {orderSent && (
            <div
              style={{ backgroundColor: "#F0FDF4", border: "1px solid #86EFAC", borderRadius: 16 }}
              className="p-6 text-center"
            >
              <div className="text-3xl mb-2">✅</div>
              <p className="font-semibold text-green-800 text-lg">
                {isUk ? "Заявку отримано!" : "Request received!"}
              </p>
              <p className="text-green-700 text-sm mt-1">
                {isUk ? "Ми зателефонуємо вам протягом 2 годин" : "We'll call you within 2 hours"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Instagram mockup ── */}
      <div className="px-4 py-14 max-w-3xl mx-auto">
        {/* Mock Instagram header */}
        <div className="flex items-center gap-4 mb-6 justify-center">
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #fd5949, #d6249f, #285AEB)",
              padding: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${COLORS.burgundy}, #9A3412)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
              }}
            >
              🥐
            </div>
          </div>
          <div>
            <p style={{ color: COLORS.text }} className="font-bold text-sm">{instagram}</p>
            <p style={{ color: COLORS.muted }} className="text-xs">
              {isUk ? "1 240 підписників · 186 публікацій" : "1,240 followers · 186 posts"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-5">
          <div style={{ flex: 1, height: 1, backgroundColor: COLORS.border }} />
          <p style={{ color: COLORS.muted }} className="text-xs font-semibold shrink-0">
            {isUk ? "Наші фото" : "Our feed"}
          </p>
          <div style={{ flex: 1, height: 1, backgroundColor: COLORS.border }} />
        </div>

        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {INSTAGRAM_PHOTOS.map((ph, i) => (
            <div
              key={i}
              className={`bg-linear-to-br ${ph.bg} rounded-xl aspect-square flex flex-col items-center justify-center cursor-pointer hover:opacity-90 transition-opacity`}
            >
              <span className="text-3xl">{ph.emoji}</span>
              <span style={{ fontSize: 8, color: "rgba(0,0,0,0.5)", marginTop: 4, textAlign: "center", padding: "0 4px" }}>
                {ph.label}
              </span>
            </div>
          ))}
        </div>
        <p style={{ color: COLORS.muted }} className="text-xs text-center mt-3">
          {isUk ? "Підписуйтесь — нові фото щодня" : "Follow us — new photos every day"}
        </p>
      </div>

      {/* ── Delivery info ── */}
      <div
        style={{ backgroundColor: COLORS.goldLight, borderTop: `2px solid ${COLORS.gold}` }}
        className="px-4 py-10"
      >
        <div className="max-w-2xl mx-auto grid grid-cols-1 gap-4 sm:grid-cols-3 text-center">
          {[
            {
              icon: "🚚",
              titleEn: "Free delivery",
              titleUk: "Безкоштовна доставка",
              descEn: "Orders from £20",
              descUk: "Від 500 ₴",
            },
            {
              icon: "⏰",
              titleEn: "Same-day pickup",
              titleUk: "Самовивіз сьогодні",
              descEn: "Order before 14:00",
              descUk: "Замовте до 14:00",
            },
            {
              icon: "📦",
              titleEn: "Gift wrapping",
              titleUk: "Подарункове пакування",
              descEn: "Complimentary for all",
              descUk: "Безкоштовно для всіх",
            },
          ].map((item) => (
            <div
              key={item.titleEn}
              style={{
                backgroundColor: "rgba(255,255,255,0.55)",
                borderRadius: 16,
                padding: "22px 16px",
                border: `1px solid rgba(255,255,255,0.8)`,
              }}
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <div style={{ color: COLORS.burgundy }} className="font-bold text-sm">
                {isUk ? item.titleUk : item.titleEn}
              </div>
              <div style={{ color: COLORS.muted }} className="text-xs mt-1">
                {isUk ? item.descUk : item.descEn}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer ── */}
      <div style={{ backgroundColor: COLORS.burgundy }} className="px-4 py-10">
        <div className="max-w-3xl mx-auto grid grid-cols-1 gap-8 sm:grid-cols-3 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-white font-bold text-xl italic mb-2">La Boulangerie</h3>
            <p style={{ color: "rgba(255,255,255,0.4)" }} className="text-xs leading-relaxed mb-3">
              {isUk
                ? "Французька булочна з 1988 року. Випічка, що надихає."
                : "French bakery since 1988. Pastry that inspires."}
            </p>
            <p style={{ color: COLORS.gold, fontSize: 12 }}>{instagram}</p>
          </div>
          {/* Hours */}
          <div>
            <h4 style={{ color: COLORS.gold }} className="font-semibold text-sm mb-3">
              {isUk ? "Графік роботи" : "Hours"}
            </h4>
            <p style={{ color: "rgba(255,255,255,0.5)" }} className="text-xs mb-1">
              {isUk ? "Пн–Пт: 07:00 – 20:00" : "Mon–Fri: 07:00 – 20:00"}
            </p>
            <p style={{ color: "rgba(255,255,255,0.5)" }} className="text-xs">
              {isUk ? "Сб–Нд: 07:00 – 18:00" : "Sat–Sun: 07:00 – 18:00"}
            </p>
          </div>
          {/* Contact */}
          <div>
            <h4 style={{ color: COLORS.gold }} className="font-semibold text-sm mb-3">
              {isUk ? "Контакти" : "Contact"}
            </h4>
            <p style={{ color: "rgba(255,255,255,0.5)" }} className="text-xs mb-1">{address}</p>
            <p style={{ color: "rgba(255,255,255,0.5)" }} className="text-xs">{phone}</p>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }} className="pt-5 text-center">
          <p style={{ color: "rgba(255,255,255,0.25)" }} className="text-xs">
            © 2024 La Boulangerie · {isUk ? "Всі права захищено" : "All rights reserved"}
          </p>
        </div>
      </div>
    </div>
  );
}
