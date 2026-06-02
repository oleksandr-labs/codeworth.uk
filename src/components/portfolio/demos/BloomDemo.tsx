"use client";

import { useState } from "react";

const OCCASIONS = [
  { key: "all", en: "All", uk: "Всі" },
  { key: "wedding", en: "Wedding", uk: "Весілля" },
  { key: "birthday", en: "Birthday", uk: "День народження" },
  { key: "anniversary", en: "Anniversary", uk: "Ювілей" },
  { key: "funeral", en: "Funeral", uk: "Похорон" },
  { key: "corporate", en: "Corporate", uk: "Корпоративні" },
  { key: "justbecause", en: "Just Because", uk: "Просто так" },
];

const BOUQUETS = [
  {
    id: 1,
    nameEn: "Rose Reverie",
    nameUk: "Рожева мрія",
    descEn: "50 premium red roses with satin ribbon",
    descUk: "50 преміум червоних троянд із атласною стрічкою",
    price: 1850,
    emoji: "🌹",
    occasions: ["wedding", "anniversary", "birthday"],
    bg: "bg-rose-100",
  },
  {
    id: 2,
    nameEn: "Peony Dream",
    nameUk: "Півонієвий сон",
    descEn: "Lush peonies in blush tones with eucalyptus",
    descUk: "Пишні рожеві піво­нії з евкаліптом",
    price: 1420,
    emoji: "🌸",
    occasions: ["wedding", "birthday", "justbecause"],
    bg: "bg-pink-100",
  },
  {
    id: 3,
    nameEn: "White Elegance",
    nameUk: "Біла елегантність",
    descEn: "White lilies and baby's breath, minimalist wrap",
    descUk: "Білі лілії та гіпсофіла, мінімалістичне обгортання",
    price: 980,
    emoji: "🤍",
    occasions: ["funeral", "wedding", "corporate"],
    bg: "bg-gray-50",
  },
  {
    id: 4,
    nameEn: "Spring Burst",
    nameUk: "Весняний вибух",
    descEn: "Mixed tulips in every color, kraft wrapping",
    descUk: "Різнокольорові тюльпани у крафтовому папері",
    price: 760,
    emoji: "🌷",
    occasions: ["birthday", "justbecause", "anniversary"],
    bg: "bg-yellow-50",
  },
  {
    id: 5,
    nameEn: "Corporate Grace",
    nameUk: "Корпоративна витонченість",
    descEn: "Elegant white and green arrangement, ribbon branded",
    descUk: "Елегантна біло-зелена композиція з брендованою стрічкою",
    price: 1200,
    emoji: "🌿",
    occasions: ["corporate"],
    bg: "bg-green-50",
  },
  {
    id: 6,
    nameEn: "Blush Sunrise",
    nameUk: "Рожевий світанок",
    descEn: "Peonies, garden roses & ranunculus in warm blush",
    descUk: "Піво­нії, садові троянди й жовтці в теплих рожевих тонах",
    price: 1650,
    emoji: "🌺",
    occasions: ["anniversary", "birthday", "wedding"],
    bg: "bg-rose-50",
  },
  {
    id: 7,
    nameEn: "Lavender Mist",
    nameUk: "Лавандовий туман",
    descEn: "Lavender stems with silver brunia and ribbon",
    descUk: "Лаванда зі срібним бруніа та стрічкою",
    price: 890,
    emoji: "💜",
    occasions: ["justbecause", "birthday"],
    bg: "bg-purple-50",
  },
  {
    id: 8,
    nameEn: "Eternal Rest",
    nameUk: "Вічний спокій",
    descEn: "White chrysanthemums and lilies, serene arrangement",
    descUk: "Білі хризантеми та лілії, спокійна композиція",
    price: 650,
    emoji: "🕊️",
    occasions: ["funeral"],
    bg: "bg-slate-50",
  },
];

const BASE_FLOWERS = [
  { key: "roses", en: "Roses 🌹", uk: "Троянди 🌹" },
  { key: "peonies", en: "Peonies 🌸", uk: "Піво­нії 🌸" },
  { key: "lilies", en: "Lilies 🌺", uk: "Лілії 🌺" },
  { key: "tulips", en: "Tulips 🌷", uk: "Тюльпани 🌷" },
];

const ACCENT_FLOWERS = [
  { key: "babysbreath", en: "Baby's Breath 🤍", uk: "Гіпсофіла 🤍" },
  { key: "eucalyptus", en: "Eucalyptus 🌿", uk: "Евкаліпт 🌿" },
  { key: "fern", en: "Fern 🍃", uk: "Папороть 🍃" },
];

const WRAPPINGS = [
  { key: "kraft", en: "Kraft Paper", uk: "Крафт-папір" },
  { key: "silk", en: "Silk", uk: "Шовк" },
  { key: "lace", en: "Lace", uk: "Мереживо" },
  { key: "minimalist", en: "Minimalist", uk: "Мінімалізм" },
];

const RIBBONS = [
  { key: "pink", en: "Pink", uk: "Рожева", color: "#fda4af" },
  { key: "red", en: "Red", uk: "Червона", color: "#f87171" },
  { key: "white", en: "White", uk: "Біла", color: "#f9fafb" },
  { key: "gold", en: "Gold", uk: "Золота", color: "#fbbf24" },
  { key: "green", en: "Green", uk: "Зелена", color: "#86efac" },
];

const SUBSCRIPTIONS = [
  {
    planEn: "Weekly Bloom",
    planUk: "Щотижневий цвіт",
    emoji: "🌹",
    priceEn: "₴ 1,200 / week",
    priceUk: "₴ 1 200 / тиждень",
    featuresEn: [
      "Fresh seasonal bouquet every week",
      "Free delivery to your door",
      "Handwritten care card",
      "Priority access to new arrivals",
    ],
    featuresUk: [
      "Свіжий сезонний букет щотижня",
      "Безкоштовна доставка додому",
      "Рукописна листівка з порадами",
      "Пріоритетний доступ до новинок",
    ],
    highlight: false,
  },
  {
    planEn: "Monthly Romance",
    planUk: "Місячний романс",
    emoji: "💐",
    priceEn: "₴ 3,800 / month",
    priceUk: "₴ 3 800 / місяць",
    featuresEn: [
      "2 premium bouquets per month",
      "Curated selection by our florists",
      "Free delivery + surprise gift",
      "10% off any additional orders",
      "Personalized arrangement notes",
    ],
    featuresUk: [
      "2 преміум букети на місяць",
      "Підбірка від наших флористів",
      "Безкоштовна доставка + сюрприз",
      "10% знижка на додаткові замовлення",
      "Персоналізовані нотатки до букету",
    ],
    highlight: true,
  },
  {
    planEn: "Seasonal Story",
    planUk: "Сезонна історія",
    emoji: "🌸",
    priceEn: "₴ 8,500 / season",
    priceUk: "₴ 8 500 / сезон",
    featuresEn: [
      "Quarterly premium collection",
      "Rare & imported varieties",
      "Exclusive packaging & ribbon",
      "Free shipping anywhere in Ukraine",
      "Dedicated floral consultant",
    ],
    featuresUk: [
      "Квартальна преміум-колекція",
      "Рідкісні та імпортні сорти",
      "Ексклюзивне пакування та стрічка",
      "Безкоштовна доставка по Україні",
      "Персональний флорист-консультант",
    ],
    highlight: false,
  },
];

const TESTIMONIALS = [
  {
    nameEn: "Sophia W.",
    nameUk: "Софія В.",
    occasionEn: "Wedding",
    occasionUk: "Весілля",
    stars: 5,
    textEn:
      "Bloom made our wedding flawless. The bridal bouquet was absolutely breathtaking — exactly as I envisioned. Every single guest asked about our florist!",
    textUk:
      "Bloom зробив наше весілля бездоганним. Весільний букет був просто неймовірний — саме таким, як я мріяла. Кожен гість запитував про нашого флориста!",
  },
  {
    nameEn: "Oliver M.",
    nameUk: "Олівер М.",
    occasionEn: "Anniversary",
    occasionUk: "Річниця",
    stars: 5,
    textEn:
      "Ordered the Peony Dream for our 10th anniversary. My wife cried happy tears. Delivery was on time and the bouquet lasted two full weeks. Truly magical.",
    textUk:
      "Замовив «Піво­нієвий сон» до нашої 10-ї річниці. Дружина заплакала від щастя. Доставка вчасно, і букет простояв два повних тижні. Справжня магія.",
  },
  {
    nameEn: "Iryna K.",
    nameUk: "Ірина К.",
    occasionEn: "Birthday",
    occasionUk: "День народження",
    stars: 5,
    textEn:
      "I subscribed to the Monthly Romance plan and it has transformed my home. Fresh flowers every two weeks — pure joy. The team is attentive and creative.",
    textUk:
      "Я підписалася на план «Місячний романс» і це змінило мій дім. Свіжі квіти кожні два тижні — чисте щастя. Команда уважна та креативна.",
  },
];

const GALLERY_ITEMS = [
  { bg: "#fce7f3", emoji: "🌹" },
  { bg: "#fbcfe8", emoji: "🌸" },
  { bg: "#fdf2f8", emoji: "🌺" },
  { bg: "#fce7f3", emoji: "🌷" },
  { bg: "#fbcfe8", emoji: "💐" },
  { bg: "#fdf2f8", emoji: "🌹" },
];

export function BloomDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [activeOccasion, setActiveOccasion] = useState("all");
  const [cart, setCart] = useState<number[]>([]);
  const [builderStep, setBuilderStep] = useState(1);
  const [selectedBases, setSelectedBases] = useState<string[]>([]);
  const [selectedAccents, setSelectedAccents] = useState<string[]>([]);
  const [selectedWrapping, setSelectedWrapping] = useState("");
  const [selectedRibbon, setSelectedRibbon] = useState("");
  const [messageCard, setMessageCard] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredBouquets =
    activeOccasion === "all"
      ? BOUQUETS
      : BOUQUETS.filter((b) => b.occasions.includes(activeOccasion));

  const toggleBase = (key: string) => {
    setSelectedBases((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const toggleAccent = (key: string) => {
    setSelectedAccents((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const builderPrice = () => {
    let base = 600;
    if (selectedBases.includes("roses")) base += 200;
    if (selectedBases.includes("peonies")) base += 300;
    if (selectedBases.includes("lilies")) base += 150;
    if (selectedBases.includes("tulips")) base += 100;
    if (selectedWrapping === "silk") base += 120;
    if (selectedWrapping === "lace") base += 90;
    if (selectedRibbon === "gold") base += 60;
    if (messageCard.trim().length > 0) base += 50;
    return base;
  };

  const builderComplete =
    selectedBases.length > 0 &&
    selectedWrapping !== "" &&
    selectedRibbon !== "";

  const STEP_LABELS = [
    { en: "Base Flowers", uk: "Основні квіти" },
    { en: "Accents", uk: "Акценти" },
    { en: "Wrapping", uk: "Обгортання" },
    { en: "Ribbon", uk: "Стрічка" },
    { en: "Message", uk: "Послання" },
  ];

  return (
    <div
      className="min-h-screen font-serif bg-rose-50 text-rose-950"
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      {/* ── HEADER ── */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-rose-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="shrink-0">
            <div className="text-2xl font-bold text-rose-700 tracking-wide">
              🌸 Bloom
            </div>
            <div className="text-xs text-rose-400 tracking-widest uppercase" style={{ fontFamily: "sans-serif" }}>
              {isUk ? "Квіткова студія" : "Floral Studio"}
            </div>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-5 text-sm text-rose-600" style={{ fontFamily: "sans-serif" }}>
            {[
              { en: "Bouquets", uk: "Букети" },
              { en: "Occasions", uk: "Свята" },
              { en: "Subscriptions", uk: "Підписки" },
              { en: "About", uk: "Про нас" },
              { en: "Contact", uk: "Контакти" },
            ].map((item) => (
              <button
                key={item.en}
                className="hover:text-rose-800 transition-colors cursor-pointer"
              >
                {isUk ? item.uk : item.en}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <button
            className="shrink-0 hidden sm:block bg-rose-600 hover:bg-rose-700 text-white text-sm px-5 py-2 rounded-full transition-colors cursor-pointer relative"
            style={{ fontFamily: "sans-serif" }}
          >
            {isUk ? "Замовити" : "Order Now"}
            {cart.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-pink-400 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center leading-none">
                {cart.length}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-rose-600 text-xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-neutral-800 border-t border-rose-100 px-4 pb-4 flex flex-col gap-3 text-sm text-rose-600" style={{ fontFamily: "sans-serif" }}>
            {[
              { en: "Bouquets", uk: "Букети" },
              { en: "Occasions", uk: "Свята" },
              { en: "Subscriptions", uk: "Підписки" },
              { en: "About", uk: "Про нас" },
              { en: "Contact", uk: "Контакти" },
            ].map((item) => (
              <button
                key={item.en}
                className="text-left py-1 hover:text-rose-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                {isUk ? item.uk : item.en}
              </button>
            ))}
            <button className="bg-rose-600 text-white px-4 py-2 rounded-full text-sm mt-1 cursor-pointer">
              {isUk ? "Замовити" : "Order Now"}
            </button>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden py-20 sm:py-28 px-4 text-center"
        style={{
          background:
            "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 40%, #fbcfe8 70%, #f9a8d4 100%)",
        }}
      >
        {/* Floating decorations */}
        <div className="absolute top-6 left-8 text-4xl opacity-30 select-none pointer-events-none">🌸</div>
        <div className="absolute top-12 right-12 text-5xl opacity-20 select-none pointer-events-none">🌹</div>
        <div className="absolute bottom-10 left-1/4 text-3xl opacity-25 select-none pointer-events-none">🌷</div>
        <div className="absolute bottom-6 right-1/5 text-4xl opacity-20 select-none pointer-events-none">💐</div>
        <div className="absolute top-1/2 left-4 text-2xl opacity-15 select-none pointer-events-none">🌺</div>
        <div className="absolute top-1/3 right-6 text-3xl opacity-20 select-none pointer-events-none">🌸</div>

        <div className="relative max-w-3xl mx-auto">
          <p
            className="text-rose-500 tracking-widest text-xs sm:text-sm uppercase mb-4"
            style={{ fontFamily: "sans-serif" }}
          >
            {isUk ? "✦ Квіткова студія Bloom ✦" : "✦ Bloom Floral Studio ✦"}
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-rose-900 leading-tight mb-6">
            {isUk ? "Квіти що говорять за Вас" : "Flowers That Speak for You"}
          </h1>
          <p
            className="text-rose-700 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed"
            style={{ fontFamily: "sans-serif" }}
          >
            {isUk
              ? "Ручна праця. Свіжість щодня. Доставка по всій Україні — з любов'ю та увагою до кожної пелюстки."
              : "Handcrafted daily with the freshest blooms. Delivered across Ukraine with love and care for every petal."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center" style={{ fontFamily: "sans-serif" }}>
            <button className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 rounded-full font-medium transition-colors cursor-pointer shadow-md shadow-rose-200">
              {isUk ? "Переглянути букети" : "Explore Bouquets"}
            </button>
            <button className="bg-white/80 hover:bg-white text-rose-700 border border-rose-200 px-8 py-3 rounded-full font-medium transition-colors cursor-pointer">
              {isUk ? "Зібрати свій букет" : "Build Your Bouquet"}
            </button>
          </div>
        </div>
      </section>

      {/* ── OCCASION FILTER ── */}
      <section className="bg-white border-b border-rose-100 py-4 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide" style={{ fontFamily: "sans-serif" }}>
            {OCCASIONS.map((occ) => (
              <button
                key={occ.key}
                onClick={() => setActiveOccasion(occ.key)}
                className={`shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer border ${
                  activeOccasion === occ.key
                    ? "bg-rose-600 text-white border-rose-600 shadow-sm"
                    : "bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100"
                }`}
              >
                {isUk ? occ.uk : occ.en}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOUQUET CATALOG ── */}
      <section className="py-14 px-4 bg-rose-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-rose-800 mb-2">
              {isUk ? "Наші Букети" : "Our Bouquets"}
            </h2>
            <p className="text-rose-500 text-sm" style={{ fontFamily: "sans-serif" }}>
              {isUk ? "Кожен букет — маленький витвір мистецтва" : "Each bouquet — a little work of art"}
            </p>
          </div>

          {filteredBouquets.length === 0 ? (
            <div className="text-center py-16 text-rose-400" style={{ fontFamily: "sans-serif" }}>
              {isUk ? "Букети для цього свята невдовзі з'являться 🌸" : "Bouquets for this occasion coming soon 🌸"}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredBouquets.map((b) => (
                <div
                  key={b.id}
                  className={`${b.bg} rounded-2xl p-5 border border-rose-100 shadow-sm hover:shadow-md transition-shadow flex flex-col`}
                >
                  {/* Emoji placeholder */}
                  <div className="w-full h-36 rounded-xl bg-white/60 flex items-center justify-center text-6xl mb-4 border border-rose-100">
                    {b.emoji}
                  </div>
                  <h3 className="font-bold text-rose-900 text-base mb-1">
                    {isUk ? b.nameUk : b.nameEn}
                  </h3>
                  <p
                    className="text-rose-600 text-xs leading-relaxed mb-4 flex-1"
                    style={{ fontFamily: "sans-serif" }}
                  >
                    {isUk ? b.descUk : b.descEn}
                  </p>
                  <div className="flex items-center justify-between mt-auto" style={{ fontFamily: "sans-serif" }}>
                    <span className="text-rose-800 font-bold text-lg">
                      ₴ {b.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => setCart((prev) => [...prev, b.id])}
                      className="bg-rose-600 hover:bg-rose-700 text-white text-xs px-4 py-2 rounded-full transition-colors cursor-pointer"
                    >
                      {isUk ? "До кошика" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── BOUQUET BUILDER ── */}
      <section className="py-16 px-4 bg-white dark:bg-neutral-800 border-t border-b border-rose-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-rose-800 mb-2">
              {isUk ? "Зберіть свій букет" : "Build Your Bouquet"}
            </h2>
            <p className="text-rose-500 text-sm" style={{ fontFamily: "sans-serif" }}>
              {isUk
                ? "5 кроків до ідеального букету — персоналізованого саме для вас"
                : "5 steps to your perfect, personalised arrangement"}
            </p>
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-1 mb-8" style={{ fontFamily: "sans-serif" }}>
            {STEP_LABELS.map((s, i) => {
              const step = i + 1;
              const done = builderStep > step;
              const active = builderStep === step;
              return (
                <div key={step} className="flex-1 flex flex-col items-center gap-1">
                  <button
                    onClick={() => setBuilderStep(step)}
                    className={`w-8 h-8 rounded-full text-xs font-bold transition-all cursor-pointer border-2 ${
                      done
                        ? "bg-rose-600 border-rose-600 text-white"
                        : active
                        ? "bg-white border-rose-600 text-rose-600"
                        : "bg-rose-50 border-rose-200 text-rose-300"
                    }`}
                  >
                    {done ? "✓" : step}
                  </button>
                  <span
                    className={`text-xs text-center hidden sm:block ${
                      active ? "text-rose-700 font-semibold" : "text-rose-300"
                    }`}
                  >
                    {isUk ? s.uk : s.en}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Step card */}
          <div className="bg-rose-50 rounded-2xl border border-rose-100 p-6 sm:p-8">
            {/* Step 1 — Base Flowers */}
            {builderStep === 1 && (
              <div>
                <h3 className="text-lg font-bold text-rose-800 mb-1">
                  {isUk ? "Крок 1: Основні квіти" : "Step 1: Base Flowers"}
                </h3>
                <p className="text-rose-500 text-sm mb-5" style={{ fontFamily: "sans-serif" }}>
                  {isUk ? "Оберіть одну або кілька основних квіток" : "Choose one or more base flowers"}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {BASE_FLOWERS.map((f) => (
                    <button
                      key={f.key}
                      onClick={() => toggleBase(f.key)}
                      className={`p-4 rounded-xl border-2 text-sm font-medium transition-all cursor-pointer ${
                        selectedBases.includes(f.key)
                          ? "bg-rose-600 border-rose-600 text-white shadow-sm"
                          : "bg-white border-rose-200 text-rose-700 hover:border-rose-400"
                      }`}
                      style={{ fontFamily: "sans-serif" }}
                    >
                      {isUk ? f.uk : f.en}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2 — Accent Flowers */}
            {builderStep === 2 && (
              <div>
                <h3 className="text-lg font-bold text-rose-800 mb-1">
                  {isUk ? "Крок 2: Акцентні квіти та зелень" : "Step 2: Accent Flowers & Greenery"}
                </h3>
                <p className="text-rose-500 text-sm mb-5" style={{ fontFamily: "sans-serif" }}>
                  {isUk ? "Необов'язково — але додає чарівності" : "Optional — but adds extra charm"}
                </p>
                <div className="flex flex-col gap-3">
                  {ACCENT_FLOWERS.map((f) => (
                    <button
                      key={f.key}
                      onClick={() => toggleAccent(f.key)}
                      className={`p-4 rounded-xl border-2 text-sm font-medium transition-all cursor-pointer text-left ${
                        selectedAccents.includes(f.key)
                          ? "bg-rose-600 border-rose-600 text-white"
                          : "bg-white border-rose-200 text-rose-700 hover:border-rose-400"
                      }`}
                      style={{ fontFamily: "sans-serif" }}
                    >
                      {isUk ? f.uk : f.en}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3 — Wrapping */}
            {builderStep === 3 && (
              <div>
                <h3 className="text-lg font-bold text-rose-800 mb-1">
                  {isUk ? "Крок 3: Обгортання" : "Step 3: Wrapping"}
                </h3>
                <p className="text-rose-500 text-sm mb-5" style={{ fontFamily: "sans-serif" }}>
                  {isUk ? "Виберіть стиль пакування" : "Choose your wrapping style"}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {WRAPPINGS.map((w) => (
                    <button
                      key={w.key}
                      onClick={() => setSelectedWrapping(w.key)}
                      className={`p-4 rounded-xl border-2 text-sm font-medium transition-all cursor-pointer ${
                        selectedWrapping === w.key
                          ? "bg-rose-600 border-rose-600 text-white"
                          : "bg-white border-rose-200 text-rose-700 hover:border-rose-400"
                      }`}
                      style={{ fontFamily: "sans-serif" }}
                    >
                      {isUk ? w.uk : w.en}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4 — Ribbon */}
            {builderStep === 4 && (
              <div>
                <h3 className="text-lg font-bold text-rose-800 mb-1">
                  {isUk ? "Крок 4: Колір стрічки" : "Step 4: Ribbon Color"}
                </h3>
                <p className="text-rose-500 text-sm mb-5" style={{ fontFamily: "sans-serif" }}>
                  {isUk ? "Оберіть колір атласної стрічки" : "Choose your satin ribbon color"}
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  {RIBBONS.map((r) => (
                    <button
                      key={r.key}
                      onClick={() => setSelectedRibbon(r.key)}
                      title={isUk ? r.uk : r.en}
                      className={`w-14 h-14 rounded-full border-4 transition-all cursor-pointer ${
                        selectedRibbon === r.key
                          ? "border-rose-700 scale-110 shadow-md"
                          : "border-rose-200 hover:border-rose-400"
                      }`}
                      style={{ backgroundColor: r.color }}
                    />
                  ))}
                </div>
                {selectedRibbon && (
                  <p className="text-center text-rose-600 text-sm mt-4" style={{ fontFamily: "sans-serif" }}>
                    {isUk ? "Вибрано: " : "Selected: "}
                    <strong>
                      {isUk
                        ? RIBBONS.find((r) => r.key === selectedRibbon)?.uk
                        : RIBBONS.find((r) => r.key === selectedRibbon)?.en}
                    </strong>
                  </p>
                )}
              </div>
            )}

            {/* Step 5 — Message & Summary */}
            {builderStep === 5 && (
              <div>
                <h3 className="text-lg font-bold text-rose-800 mb-1">
                  {isUk ? "Крок 5: Листівка та підсумок" : "Step 5: Message Card & Summary"}
                </h3>
                <p className="text-rose-500 text-sm mb-5" style={{ fontFamily: "sans-serif" }}>
                  {isUk ? "Додайте особисте послання (необов'язково)" : "Add a personal message (optional)"}
                </p>
                <textarea
                  value={messageCard}
                  onChange={(e) => setMessageCard(e.target.value)}
                  placeholder={isUk ? "Ваше послання на листівці…" : "Your message for the card…"}
                  rows={3}
                  className="w-full border border-rose-200 rounded-xl p-3 text-sm text-rose-800 bg-white focus:outline-none focus:border-rose-400 resize-none placeholder-rose-300 mb-5"
                  style={{ fontFamily: "sans-serif" }}
                />

                {/* Summary */}
                <div className="bg-white rounded-xl border border-rose-100 p-4 text-sm" style={{ fontFamily: "sans-serif" }}>
                  <p className="font-semibold text-rose-800 mb-3">
                    {isUk ? "Ваш букет:" : "Your bouquet:"}
                  </p>
                  <div className="space-y-1.5 text-rose-600">
                    <div className="flex justify-between">
                      <span>{isUk ? "Основа" : "Base"}</span>
                      <span>
                        {selectedBases.length > 0
                          ? selectedBases
                              .map((k) =>
                                isUk
                                  ? BASE_FLOWERS.find((f) => f.key === k)?.uk.split(" ")[0]
                                  : BASE_FLOWERS.find((f) => f.key === k)?.en.split(" ")[0]
                              )
                              .join(", ")
                          : isUk
                          ? "не вибрано"
                          : "not chosen"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>{isUk ? "Акценти" : "Accents"}</span>
                      <span>
                        {selectedAccents.length > 0
                          ? selectedAccents
                              .map((k) =>
                                isUk
                                  ? ACCENT_FLOWERS.find((f) => f.key === k)?.uk.split(" ")[0]
                                  : ACCENT_FLOWERS.find((f) => f.key === k)?.en.split(" ")[0]
                              )
                              .join(", ")
                          : "—"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>{isUk ? "Обгортання" : "Wrapping"}</span>
                      <span>
                        {selectedWrapping
                          ? isUk
                            ? WRAPPINGS.find((w) => w.key === selectedWrapping)?.uk
                            : WRAPPINGS.find((w) => w.key === selectedWrapping)?.en
                          : isUk
                          ? "не вибрано"
                          : "not chosen"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>{isUk ? "Стрічка" : "Ribbon"}</span>
                      <span>
                        {selectedRibbon
                          ? isUk
                            ? RIBBONS.find((r) => r.key === selectedRibbon)?.uk
                            : RIBBONS.find((r) => r.key === selectedRibbon)?.en
                          : isUk
                          ? "не вибрано"
                          : "not chosen"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>{isUk ? "Листівка" : "Message card"}</span>
                      <span>{messageCard.trim() ? "✓" : "—"}</span>
                    </div>
                  </div>
                  <div className="border-t border-rose-100 mt-3 pt-3 flex justify-between items-center">
                    <span className="font-bold text-rose-800 text-base">
                      {isUk ? "Орієнтовна ціна" : "Estimated price"}
                    </span>
                    <span className="font-bold text-rose-700 text-xl">
                      ₴ {builderPrice().toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  disabled={!builderComplete}
                  className={`mt-5 w-full py-3 rounded-full font-semibold text-sm transition-all ${
                    builderComplete
                      ? "bg-rose-600 hover:bg-rose-700 text-white cursor-pointer shadow-md shadow-rose-200"
                      : "bg-rose-200 text-rose-400 cursor-not-allowed"
                  }`}
                  style={{ fontFamily: "sans-serif" }}
                >
                  {builderComplete
                    ? isUk
                      ? "Замовити цей букет 🌸"
                      : "Order This Bouquet 🌸"
                    : isUk
                    ? "Будь ласка, оберіть основу, обгортання та стрічку"
                    : "Please choose base, wrapping & ribbon"}
                </button>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between mt-6" style={{ fontFamily: "sans-serif" }}>
              <button
                onClick={() => setBuilderStep((s) => Math.max(1, s - 1))}
                disabled={builderStep === 1}
                className={`px-5 py-2 rounded-full text-sm border transition-colors cursor-pointer ${
                  builderStep === 1
                    ? "border-rose-100 text-rose-300 cursor-not-allowed"
                    : "border-rose-300 text-rose-600 hover:bg-rose-50"
                }`}
              >
                ← {isUk ? "Назад" : "Back"}
              </button>
              {builderStep < 5 && (
                <button
                  onClick={() => setBuilderStep((s) => Math.min(5, s + 1))}
                  className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2 rounded-full text-sm transition-colors cursor-pointer"
                >
                  {isUk ? "Далі" : "Next"} →
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── SUBSCRIPTIONS ── */}
      <section className="py-16 px-4 bg-rose-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-rose-800 mb-2">
              {isUk ? "Підписки на квіти" : "Flower Subscriptions"}
            </h2>
            <p className="text-rose-500 text-sm" style={{ fontFamily: "sans-serif" }}>
              {isUk
                ? "Нехай квіти стануть частиною вашого життя"
                : "Let flowers become a part of your everyday life"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SUBSCRIPTIONS.map((sub, i) => (
              <div
                key={i}
                className={`rounded-2xl border p-6 sm:p-7 flex flex-col transition-shadow hover:shadow-lg ${
                  sub.highlight
                    ? "bg-rose-700 border-rose-700 text-white shadow-md shadow-rose-200"
                    : "bg-white border-rose-100 text-rose-900"
                }`}
              >
                <div className="text-4xl mb-3">{sub.emoji}</div>
                <h3 className={`text-xl font-bold mb-1 ${sub.highlight ? "text-white" : "text-rose-800"}`}>
                  {isUk ? sub.planUk : sub.planEn}
                </h3>
                <p
                  className={`text-2xl font-bold mb-5 ${sub.highlight ? "text-pink-200" : "text-rose-600"}`}
                  style={{ fontFamily: "sans-serif" }}
                >
                  {isUk ? sub.priceUk : sub.priceEn}
                </p>
                <ul className="space-y-2.5 mb-7 flex-1" style={{ fontFamily: "sans-serif" }}>
                  {(isUk ? sub.featuresUk : sub.featuresEn).map((feat, fi) => (
                    <li key={fi} className={`text-sm flex gap-2 ${sub.highlight ? "text-pink-100" : "text-rose-600"}`}>
                      <span className="text-rose-300 mt-0.5">✿</span>
                      {feat}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-2.5 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
                    sub.highlight
                      ? "bg-white text-rose-700 hover:bg-pink-50"
                      : "bg-rose-600 text-white hover:bg-rose-700"
                  }`}
                  style={{ fontFamily: "sans-serif" }}
                >
                  {isUk ? "Підписатися" : "Subscribe"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-16 px-4 bg-white dark:bg-neutral-800 border-t border-rose-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-rose-800 mb-2">
              {isUk ? "Відгуки наших клієнтів" : "What Our Clients Say"}
            </h2>
            <p className="text-rose-400 text-sm" style={{ fontFamily: "sans-serif" }}>
              {isUk ? "Справжні слова від справжніх людей" : "Real words from real people"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-rose-50 rounded-2xl border border-rose-100 p-6">
                <div className="flex items-center gap-1 mb-3 text-rose-400">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <span key={si} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
                <p
                  className="text-rose-700 text-sm leading-relaxed mb-5 italic"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  "{isUk ? t.textUk : t.textEn}"
                </p>
                <div style={{ fontFamily: "sans-serif" }}>
                  <p className="font-semibold text-rose-800 text-sm">{isUk ? t.nameUk : t.nameEn}</p>
                  <p className="text-rose-400 text-xs">
                    {isUk ? t.occasionUk : t.occasionEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTAGRAM GALLERY ── */}
      <section className="py-14 px-4 bg-rose-50 border-t border-rose-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-rose-800 mb-1">
              {isUk ? "Наш Instagram" : "Our Instagram"}
            </h2>
            <p className="text-rose-400 text-sm" style={{ fontFamily: "sans-serif" }}>
              @bloom.studio
            </p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3">
            {GALLERY_ITEMS.map((item, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl flex items-center justify-center text-4xl sm:text-5xl cursor-pointer hover:scale-105 transition-transform shadow-sm"
                style={{ backgroundColor: item.bg }}
              >
                {item.emoji}
              </div>
            ))}
          </div>
          <div className="text-center mt-6" style={{ fontFamily: "sans-serif" }}>
            <button className="border border-rose-300 text-rose-600 hover:bg-rose-50 px-6 py-2.5 rounded-full text-sm font-medium transition-colors cursor-pointer">
              {isUk ? "Підписатися в Instagram" : "Follow on Instagram"}
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="py-12 px-4 text-rose-200"
        style={{ background: "linear-gradient(to bottom right, #9d174d, #be185d)" }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold text-white mb-2">🌸 Bloom</div>
            <p className="text-rose-200 text-xs leading-relaxed" style={{ fontFamily: "sans-serif" }}>
              {isUk
                ? "Квіткова студія з любов'ю до деталей. Ми створюємо красу для особливих моментів вашого життя."
                : "A floral studio with love for detail. We craft beauty for the special moments in your life."}
            </p>
            <div className="flex gap-3 mt-4 text-xl">
              <span className="cursor-pointer hover:text-white transition-colors">📸</span>
              <span className="cursor-pointer hover:text-white transition-colors">📘</span>
              <span className="cursor-pointer hover:text-white transition-colors">💬</span>
            </div>
          </div>

          {/* Address */}
          <div style={{ fontFamily: "sans-serif" }}>
            <h4 className="text-white font-semibold mb-3 text-sm">
              {isUk ? "Знайдіть нас" : "Find Us"}
            </h4>
            <div className="space-y-2 text-xs text-rose-200">
              <p>🌹 {isUk ? "вул. Квіткова, 12" : "12 Floral Street"}</p>
              <p>🏙️ {isUk ? "Київ, Україна" : "Kyiv, Ukraine"}</p>
              <p>📞 +38 (044) 123-45-67</p>
              <p>✉️ hello@bloom.studio</p>
            </div>
          </div>

          {/* Delivery */}
          <div style={{ fontFamily: "sans-serif" }}>
            <h4 className="text-white font-semibold mb-3 text-sm">
              {isUk ? "Доставка" : "Delivery"}
            </h4>
            <div className="space-y-2 text-xs text-rose-200">
              <p>🚚 {isUk ? "Київ — від 2 год" : "Kyiv — from 2 hrs"}</p>
              <p>🇺🇦 {isUk ? "По Україні — 24 год" : "Ukraine-wide — 24 hrs"}</p>
              <p>💐 {isUk ? "Безкоштовно від ₴1500" : "Free from ₴1,500"}</p>
              <p>📅 {isUk ? "Пн–Нд: 8:00–21:00" : "Mon–Sun: 8:00–21:00"}</p>
            </div>
          </div>

          {/* Hours */}
          <div style={{ fontFamily: "sans-serif" }}>
            <h4 className="text-white font-semibold mb-3 text-sm">
              {isUk ? "Години роботи" : "Opening Hours"}
            </h4>
            <div className="space-y-2 text-xs text-rose-200">
              <div className="flex justify-between">
                <span>{isUk ? "Пн — Пт" : "Mon — Fri"}</span>
                <span>08:00 – 20:00</span>
              </div>
              <div className="flex justify-between">
                <span>{isUk ? "Субота" : "Saturday"}</span>
                <span>09:00 – 21:00</span>
              </div>
              <div className="flex justify-between">
                <span>{isUk ? "Неділя" : "Sunday"}</span>
                <span>10:00 – 19:00</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="max-w-6xl mx-auto mt-10 pt-6 border-t border-rose-700 text-center text-xs text-rose-300"
          style={{ fontFamily: "sans-serif" }}
        >
          © 2026 Bloom Floral Studio.{" "}
          {isUk
            ? "Усі права захищені. Зроблено з 🌸 в Україні."
            : "All rights reserved. Made with 🌸 in Ukraine."}
        </div>
      </footer>
    </div>
  );
}
