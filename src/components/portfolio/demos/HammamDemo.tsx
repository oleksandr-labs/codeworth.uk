"use client";

import { useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface RitualAddon {
  id: string;
  nameEn: string;
  nameUk: string;
  price: number;
  emoji: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { en: "Ceremonies", uk: "Церемонії" },
  { en: "SPA Menu", uk: "SPA Меню" },
  { en: "Private", uk: "Приватний" },
  { en: "Gift", uk: "Подарунок" },
  { en: "About", uk: "Про нас" },
];

const CEREMONIES = [
  {
    emoji: "🕌",
    nameEn: "Classic Hammam",
    nameUk: "Класичний Хамам",
    duration: "45 min",
    price: 800,
    color: "from-emerald-900 to-emerald-800",
    includesEn: ["Heated marble slab", "Kese scrub", "Foam wash", "Mint tea"],
    includesUk: ["Нагріта мармурова плита", "Пілінг кесе", "Пінне миття", "М'ятний чай"],
  },
  {
    emoji: "👑",
    nameEn: "Royal Ceremony",
    nameUk: "Королівська Церемонія",
    duration: "90 min",
    price: 1400,
    color: "from-emerald-900 to-teal-800",
    includesEn: ["Classic Hammam", "Argan oil wrap", "Aromatic steam", "Herbal tea ceremony"],
    includesUk: ["Класичний хамам", "Обгортання аргановою олією", "Ароматна пара", "Трав'яна чайна церемонія"],
  },
  {
    emoji: "💑",
    nameEn: "Couples Ritual",
    nameUk: "Ритуал для Двох",
    duration: "120 min",
    price: 2200,
    color: "from-teal-900 to-emerald-800",
    includesEn: ["Private hammam", "Royal Ceremony for two", "Champagne & fruits", "Couples massage"],
    includesUk: ["Приватний хамам", "Королівська церемонія для двох", "Шампанське та фрукти", "Масаж для пар"],
  },
  {
    emoji: "🌿",
    nameEn: "Full Day Retreat",
    nameUk: "Повний Ден Відпочинку",
    duration: "4 hours",
    price: 3500,
    color: "from-emerald-950 to-teal-900",
    includesEn: ["All ceremonies", "SPA treatments", "Lunch served", "Personal attendant"],
    includesUk: ["Всі церемонії", "SPA процедури", "Сервірований обід", "Особистий асистент"],
  },
];

const RITUAL_ADDONS: RitualAddon[] = [
  { id: "kese", nameEn: "Turkish soap wash (kese)", nameUk: "Турецьке миття з милом (кесе)", price: 200, emoji: "🧼" },
  { id: "foam", nameEn: "Olive soap foam", nameUk: "Оливкова мильна піна", price: 150, emoji: "🫧" },
  { id: "argan", nameEn: "Argan oil wrap", nameUk: "Обгортання аргановою олією", price: 350, emoji: "🌰" },
  { id: "steam", nameEn: "Aromatic steam", nameUk: "Ароматна пара", price: 180, emoji: "💨" },
  { id: "massage", nameEn: "Essential oil massage", nameUk: "Масаж ефірними оліями", price: 400, emoji: "🤲" },
];

const BASE_RITUALS = [
  { id: "classic", nameEn: "Classic", nameUk: "Класичний", basePrice: 800 },
  { id: "royal", nameEn: "Royal", nameUk: "Королівський", basePrice: 1400 },
  { id: "custom", nameEn: "Custom", nameUk: "Індивідуальний", basePrice: 500 },
];

const HAMMAM_TYPES = [
  { id: "shared", nameEn: "Shared", nameUk: "Загальний", surcharge: 0, emoji: "🏛️" },
  { id: "semi", nameEn: "Semi-Private", nameUk: "Напів-приватний", surcharge: 300, emoji: "🚪" },
  { id: "private", nameEn: "Private", nameUk: "Приватний", surcharge: 600, emoji: "🔒" },
];

const SPA_SERVICES = [
  { emoji: "✨", nameEn: "Body Peeling", nameUk: "Пілінг Тіла", duration: "30 min", price: 450, descEn: "Salt & sugar exfoliation", descUk: "Сіль і цукровий ексфоліант" },
  { emoji: "🟤", nameEn: "Moroccan Rhassoul Wrap", nameUk: "Марокканське Обгортання", duration: "60 min", price: 900, descEn: "Volcanic clay deep treatment", descUk: "Глибоке лікування вулканічною глиною" },
  { emoji: "💆‍♀️", nameEn: "Couples Massage", nameUk: "Масаж для Пар", duration: "60 min", price: 1600, descEn: "Synchronized relaxation", descUk: "Синхронізована релаксація" },
  { emoji: "🦶", nameEn: "Foot Ritual", nameUk: "Ритуал для Ніг", duration: "45 min", price: 550, descEn: "Reflexology & hydration", descUk: "Рефлексологія та зволоження" },
  { emoji: "💆", nameEn: "Hair Mask", nameUk: "Маска для Волосся", duration: "40 min", price: 480, descEn: "Argan & keratin nourishment", descUk: "Живлення арганою та кератином" },
  { emoji: "🌸", nameEn: "Face Treatment", nameUk: "Догляд за Обличчям", duration: "50 min", price: 700, descEn: "Hammam facial steam & mask", descUk: "Парова обробка та маска для обличчя" },
];

const PRIVATE_OCCASIONS = [
  { emoji: "💍", nameEn: "Anniversary", nameUk: "Річниця" },
  { emoji: "🎂", nameEn: "Birthday", nameUk: "День Народження" },
  { emoji: "🏢", nameEn: "Corporate", nameUk: "Корпоратив" },
  { emoji: "👰", nameEn: "Bachelorette", nameUk: "Дівич-вечір" },
];

const PROTOCOL_STEPS = [
  { emoji: "👜", titleEn: "What to Bring", titleUk: "Що Взяти", descEn: "Towel, flip-flops, swimwear optional. We provide robe & slippers.", descUk: "Рушник, шльопанці, купальник за бажанням. Ми надаємо халат та тапочки." },
  { emoji: "🚿", titleEn: "Changing Room", titleUk: "Роздягальня", descEn: "Store your belongings in a secure locker. Change into your hammam wrap.", descUk: "Зберігайте речі у надійному сейфі. Вдягніть хамамний рушник." },
  { emoji: "🚰", titleEn: "Pre-Wash Shower", titleUk: "Попередній Душ", descEn: "Rinse thoroughly before entering the hammam space.", descUk: "Ретельно ополоснись перед входом у хамам." },
  { emoji: "♨️", titleEn: "Heated Marble Slab", titleUk: "Нагріта Мармурова Плита", descEn: "Lie on the göbek taşı (navel stone) to open your pores with gentle heat.", descUk: "Ляжте на гьобек-ташу щоб розкрити пори м'яким теплом." },
  { emoji: "🧤", titleEn: "Kese Scrub", titleUk: "Скраб Кесе", descEn: "Your attendant exfoliates with a kese mitt, removing dead skin cells.", descUk: "Ваш асистент відлущує рукавичкою кесе, видаляючи відмерлі клітини." },
  { emoji: "🫧", titleEn: "Foam Wash", titleUk: "Пінне Миття", descEn: "Luxurious olive soap foam covers your entire body for deep cleansing.", descUk: "Розкішна оливкова мильна піна покриває все тіло для глибокого очищення." },
  { emoji: "🍵", titleEn: "Cool Down & Tea", titleUk: "Охолодження та Чай", descEn: "Cool shower, rest in the relaxation lounge, enjoy traditional mint tea.", descUk: "Прохолодний душ, відпочинок у лаунжі, традиційний м'ятний чай." },
];

const GIFT_CERTS = [
  { emoji: "🎁", nameEn: "Single Visit", nameUk: "Одиночний Візит", price: 800, descEn: "Classic Hammam for one person", descUk: "Класичний хамам для однієї особи", highlight: false },
  { emoji: "💑", nameEn: "Couple Evening", nameUk: "Вечір для Двох", price: 2200, descEn: "Couples Ritual + champagne", descUk: "Ритуал для двох + шампанське", highlight: true },
  { emoji: "⭐", nameEn: "VIP Package", nameUk: "VIP Пакет", price: 5000, descEn: "Full Day Retreat + SPA treatments + private suite", descUk: "Повний день відпочинку + SPA процедури + приватний люкс", highlight: false },
];

const REVIEWS = [
  { name: "Олена Кравченко", ceremony: "Royal Ceremony", rating: 5, textEn: "The Royal Ceremony was absolute heaven. The marble warmth, the argan oil — I felt reborn. Will definitely return!", textUk: "Королівська церемонія — це справжній рай. Тепло мармуру, арганова олія — я відчула себе народженою заново. Обов'язково повернуся!" },
  { name: "Andriy M.", ceremony: "Couples Ritual", rating: 5, textEn: "Booked the Couples Ritual for our anniversary — absolutely magical. The staff was attentive and the hammam was pristine.", textUk: "Замовив ритуал для двох на річницю — просто чарівно. Персонал уважний, хамам бездоганний." },
  { name: "Тетяна Василенко", ceremony: "Full Day Retreat", rating: 5, textEn: "Spent a full day here and it was the best self-care investment of the year. The retreat package is worth every penny.", textUk: "Провела тут цілий день — це найкраще вкладення у себе за рік. Пакет відпочинку вартий кожної гривні." },
];

// ─── Component ───────────────────────────────────────────────────────────────

export function HammamDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  // Configurator state
  const [configStep, setConfigStep] = useState(1);
  const [selectedBase, setSelectedBase] = useState("classic");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [selectedHammamType, setSelectedHammamType] = useState("shared");
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // SPA state
  const [activeSpa, setActiveSpa] = useState<number | null>(null);

  // Gift cert state
  const [purchasedCert, setPurchasedCert] = useState<number | null>(null);

  // Price calculation
  const baseRitual = BASE_RITUALS.find((r) => r.id === selectedBase)!;
  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const addon = RITUAL_ADDONS.find((a) => a.id === id);
    return sum + (addon?.price ?? 0);
  }, 0);
  const hammamType = HAMMAM_TYPES.find((t) => t.id === selectedHammamType)!;
  const totalPrice = baseRitual.basePrice + addonsTotal + hammamType.surcharge;

  function toggleAddon(id: string) {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  }

  function handleConfirm() {
    if (bookingName && bookingPhone) {
      setBookingConfirmed(true);
    }
  }

  // ── Decorative helper ──────────────────────────────────────────────────────
  const ArabesqueDivider = () => (
    <div className="flex items-center gap-3 my-8">
      <div className="flex-1 h-px bg-linear-to-br from-transparent via-amber-500/40 to-transparent" />
      <span className="text-amber-400 text-lg tracking-widest select-none">❋ ✦ ❋</span>
      <div className="flex-1 h-px bg-linear-to-br from-transparent via-amber-500/40 to-transparent" />
    </div>
  );

  return (
    <div className="min-h-screen font-sans text-stone-100 bg-[#0a1f14]">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[#052e16]/95 backdrop-blur border-b border-amber-900/40 shadow-lg shadow-emerald-950/60">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">🏛️</span>
            <div>
              <div className="text-amber-300 font-bold text-lg leading-tight tracking-widest uppercase">Hammam</div>
              <div className="text-amber-600/80 text-[10px] tracking-[0.3em] uppercase">Ritual</div>
            </div>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.en}
                className="px-3 py-1.5 text-sm text-stone-300 hover:text-amber-300 transition-colors rounded tracking-wide"
              >
                {isUk ? item.uk : item.en}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <button className="shrink-0 px-4 py-2 bg-linear-to-br from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-stone-900 font-semibold text-sm rounded transition-all shadow-md shadow-amber-900/40">
            {isUk ? "Забронювати Ритуал" : "Book Ritual"}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-16">
        {/* ── Hero ───────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden rounded-2xl mt-6 mb-12 bg-linear-to-br from-emerald-950 via-[#065F46] to-[#1a0a00] border border-amber-900/30 shadow-2xl shadow-emerald-950/80">
          {/* Mosaic corner ornaments */}
          <div className="absolute top-4 left-4 text-amber-600/30 text-4xl select-none leading-none">❖</div>
          <div className="absolute top-4 right-4 text-amber-600/30 text-4xl select-none leading-none">❖</div>
          <div className="absolute bottom-4 left-4 text-amber-600/20 text-2xl select-none leading-none">✦ ✦ ✦</div>
          <div className="absolute bottom-4 right-4 text-amber-600/20 text-2xl select-none leading-none">✦ ✦ ✦</div>

          <div className="relative z-10 px-8 py-16 md:py-24 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-amber-600/50 bg-amber-900/20 text-amber-400 text-xs tracking-widest uppercase">
              ✦ {isUk ? "Справжній Турецький Хамам" : "Authentic Turkish Hammam"} ✦
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-stone-100 mb-4 leading-tight">
              {isUk ? (
                <>
                  Стародавній Ритуал.<br />
                  <span className="text-amber-300">Сучасне Відчуття.</span>
                </>
              ) : (
                <>
                  Ancient Ritual.<br />
                  <span className="text-amber-300">Modern Sensation.</span>
                </>
              )}
            </h1>

            <p className="text-stone-400 text-sm md:text-base tracking-widest mb-8 uppercase">
              Turkish Bath • Hammam • Ritual Wraps • Massage
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-8 py-3 bg-linear-to-br from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-stone-900 font-bold rounded-lg transition-all shadow-lg shadow-amber-900/50 tracking-wide">
                {isUk ? "🏛️ Розпочати Ритуал" : "🏛️ Begin the Ritual"}
              </button>
              <div className="px-5 py-3 border border-amber-700/40 rounded-lg text-amber-300 text-sm bg-emerald-950/40">
                💑 {isUk ? "Приватний Хамам для Двох від ₴1800" : "Private Hammam for Two from ₴1800"}
              </div>
            </div>
          </div>
        </section>

        {/* ── Hammam Ceremonies ──────────────────────────────────────────────── */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-amber-300 mb-2 tracking-wide">
              {isUk ? "🕌 Хамамні Церемонії" : "🕌 Hammam Ceremonies"}
            </h2>
            <p className="text-stone-400 text-sm">
              {isUk ? "Кожна церемонія — це подорож до стародавньої традиції" : "Each ceremony is a journey into ancient tradition"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CEREMONIES.map((c) => (
              <div
                key={c.nameEn}
                className={`relative overflow-hidden rounded-xl bg-linear-to-br ${c.color} border border-amber-900/30 p-5 flex flex-col gap-3 shadow-lg hover:shadow-amber-900/30 hover:border-amber-700/50 transition-all group`}
              >
                {/* Corner ornament */}
                <div className="absolute top-2 right-2 text-amber-500/20 text-xl select-none">❋</div>

                <div className="text-3xl">{c.emoji}</div>
                <div>
                  <div className="font-bold text-amber-200 text-base leading-tight">
                    {isUk ? c.nameUk : c.nameEn}
                  </div>
                  <div className="text-stone-400 text-xs mt-0.5">⏱ {c.duration}</div>
                </div>

                <div className="text-amber-300 text-xl font-bold">₴{c.price.toLocaleString()}</div>

                <ul className="flex flex-col gap-1 mt-auto">
                  {(isUk ? c.includesUk : c.includesEn).map((item, i) => (
                    <li key={i} className="text-stone-300 text-xs flex items-start gap-1.5">
                      <span className="text-amber-500 mt-0.5 shrink-0">✦</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <button className="mt-2 w-full py-2 bg-amber-600/20 hover:bg-amber-600/40 border border-amber-600/30 hover:border-amber-500/60 text-amber-300 text-xs font-semibold rounded transition-all tracking-wide">
                  {isUk ? "Обрати" : "Select"}
                </button>
              </div>
            ))}
          </div>
        </section>

        <ArabesqueDivider />

        {/* ── Ceremony Configurator ──────────────────────────────────────────── */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-amber-300 mb-2 tracking-wide">
              {isUk ? "⚙️ Конфігуратор Ритуалу" : "⚙️ Ceremony Configurator"}
            </h2>
            <p className="text-stone-400 text-sm">
              {isUk ? "Складіть власний ритуал крок за кроком" : "Build your perfect ritual step by step"}
            </p>
          </div>

          <div className="rounded-2xl border border-amber-900/40 bg-[#052e16]/60 shadow-xl overflow-hidden">
            {/* Step Progress */}
            <div className="flex border-b border-amber-900/30 bg-emerald-950/50">
              {[1, 2, 3, 4].map((step) => (
                <button
                  key={step}
                  onClick={() => setConfigStep(step)}
                  className={`flex-1 py-3 text-xs font-semibold tracking-wide transition-colors ${
                    configStep === step
                      ? "bg-amber-700/30 text-amber-300 border-b-2 border-amber-500"
                      : "text-stone-500 hover:text-stone-300"
                  }`}
                >
                  {isUk
                    ? [`Базовий`, `Елементи`, `Тип`, `Бронювання`][step - 1]
                    : [`Base`, `Elements`, `Type`, `Booking`][step - 1]}
                </button>
              ))}
            </div>

            <div className="p-6">
              {/* Step 1: Base Ritual */}
              {configStep === 1 && (
                <div>
                  <h3 className="text-amber-200 font-semibold mb-4">
                    {isUk ? "Крок 1: Оберіть базовий ритуал" : "Step 1: Choose base ritual"}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {BASE_RITUALS.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => setSelectedBase(r.id)}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          selectedBase === r.id
                            ? "border-amber-500 bg-amber-700/20 text-amber-200"
                            : "border-emerald-800/60 bg-emerald-900/20 text-stone-300 hover:border-amber-700/50"
                        }`}
                      >
                        <div className="font-semibold text-sm mb-1">{isUk ? r.nameUk : r.nameEn}</div>
                        <div className="text-amber-400 text-lg font-bold">₴{r.basePrice.toLocaleString()}</div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => setConfigStep(2)}
                      className="px-6 py-2 bg-linear-to-br from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-stone-900 font-semibold text-sm rounded-lg transition-all"
                    >
                      {isUk ? "Далі →" : "Next →"}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Addons */}
              {configStep === 2 && (
                <div>
                  <h3 className="text-amber-200 font-semibold mb-4">
                    {isUk ? "Крок 2: Додайте ритуальні елементи" : "Step 2: Add ritual elements"}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {RITUAL_ADDONS.map((addon) => {
                      const active = selectedAddons.includes(addon.id);
                      return (
                        <button
                          key={addon.id}
                          onClick={() => toggleAddon(addon.id)}
                          className={`p-4 rounded-xl border text-left transition-all flex items-center gap-3 ${
                            active
                              ? "border-amber-500 bg-amber-700/20"
                              : "border-emerald-800/60 bg-emerald-900/20 hover:border-amber-700/40"
                          }`}
                        >
                          <span className="text-2xl shrink-0">{addon.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <div className={`text-sm font-medium ${active ? "text-amber-200" : "text-stone-300"}`}>
                              {isUk ? addon.nameUk : addon.nameEn}
                            </div>
                            <div className="text-amber-400 text-sm font-semibold">+₴{addon.price}</div>
                          </div>
                          <div className={`shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center text-xs ${active ? "border-amber-500 bg-amber-600 text-stone-900" : "border-stone-600"}`}>
                            {active ? "✓" : ""}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <button onClick={() => setConfigStep(1)} className="px-4 py-2 text-stone-400 hover:text-stone-200 text-sm transition-colors">
                      ← {isUk ? "Назад" : "Back"}
                    </button>
                    <button
                      onClick={() => setConfigStep(3)}
                      className="px-6 py-2 bg-linear-to-br from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-stone-900 font-semibold text-sm rounded-lg transition-all"
                    >
                      {isUk ? "Далі →" : "Next →"}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Hammam Type */}
              {configStep === 3 && (
                <div>
                  <h3 className="text-amber-200 font-semibold mb-4">
                    {isUk ? "Крок 3: Тип хамаму" : "Step 3: Choose hammam type"}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {HAMMAM_TYPES.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setSelectedHammamType(type.id)}
                        className={`p-5 rounded-xl border text-center transition-all ${
                          selectedHammamType === type.id
                            ? "border-amber-500 bg-amber-700/20 text-amber-200"
                            : "border-emerald-800/60 bg-emerald-900/20 text-stone-300 hover:border-amber-700/50"
                        }`}
                      >
                        <div className="text-2xl mb-2">{type.emoji}</div>
                        <div className="font-semibold text-sm mb-1">{isUk ? type.nameUk : type.nameEn}</div>
                        <div className="text-amber-400 text-sm">{type.surcharge > 0 ? `+₴${type.surcharge}` : isUk ? "Включено" : "Included"}</div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <button onClick={() => setConfigStep(2)} className="px-4 py-2 text-stone-400 hover:text-stone-200 text-sm transition-colors">
                      ← {isUk ? "Назад" : "Back"}
                    </button>
                    <button
                      onClick={() => setConfigStep(4)}
                      className="px-6 py-2 bg-linear-to-br from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-stone-900 font-semibold text-sm rounded-lg transition-all"
                    >
                      {isUk ? "Далі →" : "Next →"}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Booking */}
              {configStep === 4 && !bookingConfirmed && (
                <div>
                  <h3 className="text-amber-200 font-semibold mb-4">
                    {isUk ? "Крок 4: Деталі бронювання" : "Step 4: Booking details"}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-stone-400 text-xs mb-1.5 tracking-wide">
                        {isUk ? "Ваше ім'я" : "Your name"}
                      </label>
                      <input
                        type="text"
                        value={bookingName}
                        onChange={(e) => setBookingName(e.target.value)}
                        placeholder={isUk ? "Ім'я та прізвище" : "Full name"}
                        className="w-full px-3 py-2.5 bg-emerald-950/60 border border-emerald-800/60 rounded-lg text-stone-200 text-sm placeholder:text-stone-600 focus:outline-none focus:border-amber-600/60"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-400 text-xs mb-1.5 tracking-wide">
                        {isUk ? "Телефон" : "Phone number"}
                      </label>
                      <input
                        type="tel"
                        value={bookingPhone}
                        onChange={(e) => setBookingPhone(e.target.value)}
                        placeholder="+38 (0__) ___ __ __"
                        className="w-full px-3 py-2.5 bg-emerald-950/60 border border-emerald-800/60 rounded-lg text-stone-200 text-sm placeholder:text-stone-600 focus:outline-none focus:border-amber-600/60"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-stone-400 text-xs mb-1.5 tracking-wide">
                        {isUk ? "Бажана дата" : "Preferred date"}
                      </label>
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full px-3 py-2.5 bg-emerald-950/60 border border-emerald-800/60 rounded-lg text-stone-200 text-sm focus:outline-none focus:border-amber-600/60"
                      />
                    </div>
                  </div>

                  {/* Live price summary */}
                  <div className="rounded-xl border border-amber-800/40 bg-emerald-950/60 p-4 mb-5">
                    <div className="text-amber-200 font-semibold text-sm mb-2">
                      {isUk ? "📋 Підсумок замовлення" : "📋 Order Summary"}
                    </div>
                    <div className="flex justify-between text-xs text-stone-400 mb-1">
                      <span>{isUk ? "Базовий ритуал" : "Base ritual"} ({isUk ? BASE_RITUALS.find(r => r.id === selectedBase)?.nameUk : BASE_RITUALS.find(r => r.id === selectedBase)?.nameEn})</span>
                      <span className="text-stone-200">₴{baseRitual.basePrice.toLocaleString()}</span>
                    </div>
                    {selectedAddons.map((id) => {
                      const addon = RITUAL_ADDONS.find((a) => a.id === id)!;
                      return (
                        <div key={id} className="flex justify-between text-xs text-stone-400 mb-1">
                          <span>{addon.emoji} {isUk ? addon.nameUk : addon.nameEn}</span>
                          <span className="text-stone-200">+₴{addon.price}</span>
                        </div>
                      );
                    })}
                    {hammamType.surcharge > 0 && (
                      <div className="flex justify-between text-xs text-stone-400 mb-1">
                        <span>{hammamType.emoji} {isUk ? hammamType.nameUk : hammamType.nameEn}</span>
                        <span className="text-stone-200">+₴{hammamType.surcharge}</span>
                      </div>
                    )}
                    <div className="border-t border-amber-800/30 mt-2 pt-2 flex justify-between font-bold">
                      <span className="text-amber-300 text-sm">{isUk ? "Разом:" : "Total:"}</span>
                      <span className="text-amber-300 text-lg">₴{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <button onClick={() => setConfigStep(3)} className="px-4 py-2 text-stone-400 hover:text-stone-200 text-sm transition-colors">
                      ← {isUk ? "Назад" : "Back"}
                    </button>
                    <button
                      onClick={handleConfirm}
                      disabled={!bookingName || !bookingPhone}
                      className="px-8 py-3 bg-linear-to-br from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 disabled:from-stone-700 disabled:to-stone-800 disabled:text-stone-500 text-stone-900 font-bold text-sm rounded-lg transition-all shadow-md shadow-amber-900/30"
                    >
                      {isUk ? "🏛️ Підтвердити Ритуал" : "🏛️ Confirm Ritual"}
                    </button>
                  </div>
                </div>
              )}

              {/* Confirmation */}
              {configStep === 4 && bookingConfirmed && (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">✨</div>
                  <h3 className="text-amber-300 font-bold text-xl mb-2">
                    {isUk ? "Ритуал заброньовано!" : "Ritual Booked!"}
                  </h3>
                  <p className="text-stone-400 text-sm mb-4">
                    {isUk
                      ? `Дякуємо, ${bookingName}! Ми зв'яжемося з вами найближчим часом для підтвердження.`
                      : `Thank you, ${bookingName}! We will contact you shortly to confirm your booking.`}
                  </p>
                  <div className="inline-block px-6 py-3 rounded-xl border border-amber-700/50 bg-amber-900/20 text-amber-300 font-bold text-lg">
                    {isUk ? "Сума:" : "Total:"} ₴{totalPrice.toLocaleString()}
                  </div>
                  <div className="mt-6">
                    <button
                      onClick={() => { setBookingConfirmed(false); setConfigStep(1); setSelectedAddons([]); setBookingName(""); setBookingPhone(""); setBookingDate(""); }}
                      className="text-stone-400 hover:text-amber-300 text-sm underline underline-offset-2 transition-colors"
                    >
                      {isUk ? "Нове бронювання" : "New booking"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <ArabesqueDivider />

        {/* ── SPA Menu ───────────────────────────────────────────────────────── */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-amber-300 mb-2 tracking-wide">
              {isUk ? "🌿 SPA Меню" : "🌿 SPA Menu"}
            </h2>
            <p className="text-stone-400 text-sm">
              {isUk ? "Доповніть ваш ритуал преміальними SPA процедурами" : "Complement your ritual with premium SPA treatments"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SPA_SERVICES.map((s, idx) => (
              <div
                key={s.nameEn}
                className="rounded-xl border border-emerald-800/50 bg-emerald-950/40 hover:bg-emerald-950/60 hover:border-amber-700/40 transition-all cursor-pointer overflow-hidden"
                onClick={() => setActiveSpa(activeSpa === idx ? null : idx)}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-2xl">{s.emoji}</span>
                    <div className="text-right">
                      <div className="text-amber-300 font-bold">₴{s.price.toLocaleString()}</div>
                      <div className="text-stone-500 text-xs">⏱ {s.duration}</div>
                    </div>
                  </div>
                  <div className="font-semibold text-stone-200 text-sm mb-1">
                    {isUk ? s.nameUk : s.nameEn}
                  </div>
                  <div className="text-stone-400 text-xs">
                    {isUk ? s.descUk : s.descEn}
                  </div>
                </div>
                {activeSpa === idx && (
                  <div className="px-5 pb-4 border-t border-emerald-800/40 pt-3">
                    <button className="w-full py-2 bg-linear-to-br from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-stone-900 font-semibold text-xs rounded-lg transition-all">
                      {isUk ? "+ Додати до ритуалу" : "+ Add to ritual"}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Private Hammam ─────────────────────────────────────────────────── */}
        <section className="mb-12">
          <div className="rounded-2xl overflow-hidden border border-amber-900/40 bg-linear-to-br from-emerald-950 to-[#0a1a10] shadow-xl">
            {/* Header band */}
            <div className="bg-linear-to-br from-amber-800/30 to-amber-900/10 border-b border-amber-900/40 px-8 py-5 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-amber-300 tracking-wide mb-1">
                🔒 {isUk ? "Приватний Хамам" : "Private Hammam"}
              </h2>
              <p className="text-stone-400 text-sm">
                {isUk ? "Ексклюзивний простір для вашого особливого моменту" : "Exclusive space for your special moment"}
              </p>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Details */}
                <div>
                  <h3 className="text-amber-200 font-semibold mb-4 text-sm tracking-wide uppercase">
                    {isUk ? "Деталі" : "Details"}
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {[
                      { emoji: "👥", en: "Capacity: 2–8 people", uk: "Місткість: 2–8 осіб" },
                      { emoji: "⏱", en: "Minimum 2 hours", uk: "Мінімум 2 години" },
                      { emoji: "🎵", en: "Ambient music of your choice", uk: "Фонова музика на ваш вибір" },
                      { emoji: "🌹", en: "Floral & candle decoration", uk: "Квіткове та свічкове оформлення" },
                      { emoji: "🍾", en: "Welcome champagne included", uk: "Вітальне шампанське включено" },
                      { emoji: "👘", en: "Robes & slippers provided", uk: "Халати та тапочки надаємо" },
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-stone-300 text-sm">
                        <span className="text-lg shrink-0">{item.emoji}</span>
                        {isUk ? item.uk : item.en}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Occasions */}
                <div>
                  <h3 className="text-amber-200 font-semibold mb-4 text-sm tracking-wide uppercase">
                    {isUk ? "Ідеально для" : "Perfect for"}
                  </h3>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {PRIVATE_OCCASIONS.map((occ) => (
                      <div key={occ.nameEn} className="p-3 rounded-xl border border-emerald-800/50 bg-emerald-900/20 text-center">
                        <div className="text-2xl mb-1">{occ.emoji}</div>
                        <div className="text-stone-300 text-xs">{isUk ? occ.nameUk : occ.nameEn}</div>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl bg-amber-900/20 border border-amber-800/40 p-4 text-center">
                    <div className="text-stone-400 text-xs mb-1">{isUk ? "Ціна за особу від" : "Price per person from"}</div>
                    <div className="text-amber-300 text-2xl font-bold">₴900</div>
                    <div className="text-stone-500 text-xs mt-1">{isUk ? "мінімум 2 особи" : "minimum 2 people"}</div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button className="px-8 py-3 bg-linear-to-br from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-stone-900 font-bold rounded-lg transition-all shadow-lg shadow-amber-900/30">
                  {isUk ? "🔒 Забронювати Приватний Хамам" : "🔒 Book Private Hammam"}
                </button>
              </div>
            </div>
          </div>
        </section>

        <ArabesqueDivider />

        {/* ── Ritual Protocol ────────────────────────────────────────────────── */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-amber-300 mb-2 tracking-wide">
              {isUk ? "📜 Протокол Ритуалу" : "📜 Ritual Protocol"}
            </h2>
            <p className="text-stone-400 text-sm">
              {isUk ? "Ваш перший раз у хамамі — крок за кроком" : "Your first time in the hammam — step by step"}
            </p>
          </div>

          <div className="relative">
            {/* Vertical connecting line */}
            <div className="absolute left-6 top-8 bottom-8 w-px bg-linear-to-br from-amber-600/40 via-amber-500/20 to-transparent hidden sm:block" />

            <div className="flex flex-col gap-4">
              {PROTOCOL_STEPS.map((step, idx) => (
                <div key={idx} className="flex items-start gap-5 relative pl-2 sm:pl-0">
                  {/* Step number bubble */}
                  <div className="shrink-0 w-12 h-12 rounded-full border-2 border-amber-600/50 bg-emerald-950 flex flex-col items-center justify-center z-10 relative">
                    <span className="text-lg leading-none">{step.emoji}</span>
                    <span className="text-amber-600 text-[9px] font-bold">{idx + 1}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 rounded-xl border border-emerald-800/40 bg-emerald-950/30 hover:bg-emerald-950/50 transition-colors p-4">
                    <div className="font-semibold text-amber-200 text-sm mb-1">
                      {isUk ? step.titleUk : step.titleEn}
                    </div>
                    <div className="text-stone-400 text-xs leading-relaxed">
                      {isUk ? step.descUk : step.descEn}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Gift Certificates ──────────────────────────────────────────────── */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-amber-300 mb-2 tracking-wide">
              {isUk ? "🎁 Подарункові Сертифікати" : "🎁 Gift Certificates"}
            </h2>
            <p className="text-stone-400 text-sm">
              {isUk ? "Подаруйте незабутній ритуал своїм близьким" : "Gift an unforgettable ritual to your loved ones"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {GIFT_CERTS.map((cert, idx) => (
              <div
                key={cert.nameEn}
                className={`relative rounded-2xl overflow-hidden border transition-all ${
                  cert.highlight
                    ? "border-amber-500/70 shadow-xl shadow-amber-900/30 bg-linear-to-br from-amber-900/30 to-emerald-950"
                    : "border-emerald-800/50 bg-emerald-950/40"
                }`}
              >
                {cert.highlight && (
                  <div className="absolute top-0 left-0 right-0 bg-amber-600 text-stone-900 text-xs font-bold text-center py-1 tracking-widest uppercase">
                    {isUk ? "⭐ Найпопулярніший" : "⭐ Most Popular"}
                  </div>
                )}
                {/* Decorative top ornament */}
                <div className={`absolute top-2 right-2 text-amber-500/20 text-2xl select-none ${cert.highlight ? "top-8" : ""}`}>❋</div>

                <div className={`p-6 ${cert.highlight ? "pt-9" : ""}`}>
                  <div className="text-4xl mb-3 text-center">{cert.emoji}</div>
                  <h3 className="text-center font-bold text-amber-200 text-base mb-1">
                    {isUk ? cert.nameUk : cert.nameEn}
                  </h3>
                  <p className="text-stone-400 text-xs text-center mb-4 min-h-[2.5rem]">
                    {isUk ? cert.descUk : cert.descEn}
                  </p>
                  <div className="text-center text-amber-300 text-2xl font-bold mb-5">
                    ₴{cert.price.toLocaleString()}
                  </div>
                  <button
                    onClick={() => setPurchasedCert(purchasedCert === idx ? null : idx)}
                    className={`w-full py-2.5 font-semibold text-sm rounded-lg transition-all ${
                      purchasedCert === idx
                        ? "bg-emerald-700 text-stone-200 border border-emerald-600"
                        : cert.highlight
                        ? "bg-linear-to-br from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-stone-900 shadow-md shadow-amber-900/30"
                        : "border border-amber-700/50 bg-amber-800/20 hover:bg-amber-700/30 text-amber-300"
                    }`}
                  >
                    {purchasedCert === idx
                      ? (isUk ? "✓ Додано до кошика" : "✓ Added to cart")
                      : (isUk ? "Придбати Сертифікат" : "Buy Certificate")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <ArabesqueDivider />

        {/* ── Reviews ────────────────────────────────────────────────────────── */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-amber-300 mb-2 tracking-wide">
              {isUk ? "💬 Відгуки Гостей" : "💬 Guest Reviews"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {REVIEWS.map((rev, idx) => (
              <div key={idx} className="rounded-xl border border-emerald-800/50 bg-emerald-950/40 p-5 flex flex-col gap-3 hover:border-amber-700/40 transition-colors">
                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <span key={i} className="text-amber-400 text-sm">★</span>
                  ))}
                </div>
                {/* Text */}
                <p className="text-stone-300 text-sm leading-relaxed flex-1 italic">
                  &ldquo;{isUk ? rev.textUk : rev.textEn}&rdquo;
                </p>
                {/* Author */}
                <div className="flex items-center justify-between pt-2 border-t border-emerald-800/40">
                  <div className="font-semibold text-stone-200 text-sm">{rev.name}</div>
                  <div className="text-amber-600/80 text-xs px-2 py-0.5 rounded-full border border-amber-800/40 bg-amber-900/20">
                    {rev.ceremony}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-amber-900/30 bg-[#021a0c]/90 py-10">
        <div className="max-w-6xl mx-auto px-4">
          {/* Top arabesque band */}
          <div className="text-center text-amber-600/20 tracking-[0.5em] text-sm mb-8 select-none">
            ❖ ✦ ❖ ✦ ❖ ✦ ❖ ✦ ❖ ✦ ❖
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🏛️</span>
                <span className="text-amber-300 font-bold tracking-widest uppercase">Hammam Ritual</span>
              </div>
              <p className="text-stone-500 text-xs leading-relaxed">
                {isUk
                  ? "Автентичний турецький хамам у серці міста. Традиції, що передаються через покоління."
                  : "Authentic Turkish hammam in the heart of the city. Traditions passed down through generations."}
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">
                {isUk ? "Контакти" : "Contact"}
              </h4>
              <ul className="flex flex-col gap-2 text-stone-400 text-xs">
                <li>📍 {isUk ? "вул. Хрещатик, 15, Київ" : "15 Khreshchatyk St, Kyiv"}</li>
                <li>📞 +38 (044) 123-45-67</li>
                <li>✉️ ritual@hammam.ua</li>
              </ul>
            </div>

            {/* Hours */}
            <div>
              <h4 className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">
                {isUk ? "Години Роботи" : "Booking Hours"}
              </h4>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <span className="text-emerald-400 text-xs font-semibold">
                  {isUk ? "Відкрито щодня 10:00–22:00" : "Open daily 10:00–22:00"}
                </span>
              </div>
              <p className="text-stone-500 text-xs">
                {isUk ? "Бронювання: 09:00–21:00" : "Reservations: 09:00–21:00"}
              </p>
              <button className="mt-4 w-full py-2 bg-linear-to-br from-amber-600/20 to-amber-800/10 border border-amber-700/40 hover:border-amber-600/60 hover:bg-amber-700/20 text-amber-300 text-xs font-semibold rounded-lg transition-all">
                {isUk ? "📞 Зателефонувати" : "📞 Call Now"}
              </button>
            </div>
          </div>

          {/* Bottom */}
          <div className="text-center text-amber-600/20 tracking-[0.5em] text-sm mb-4 select-none">
            ❖ ✦ ❖ ✦ ❖ ✦ ❖ ✦ ❖ ✦ ❖
          </div>
          <div className="text-center text-stone-600 text-xs">
            © 2026 Hammam Ritual •{" "}
            {isUk ? "Всі права захищені" : "All rights reserved"}
          </div>
        </div>
      </footer>
    </div>
  );
}
