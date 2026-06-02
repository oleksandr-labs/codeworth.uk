"use client";

import { useState } from "react";

/* ─── flower types ─── */
const FLOWER_TYPES = [
  { key: "all", en: "All", uk: "Всі" },
  { key: "roses", en: "Roses", uk: "Троянди" },
  { key: "tulips", en: "Tulips", uk: "Тюльпани" },
  { key: "peonies", en: "Peonies", uk: "Півонії" },
  { key: "mixed", en: "Mixed", uk: "Мікс" },
  { key: "plants", en: "Plants", uk: "Рослини" },
  { key: "dried", en: "Dried", uk: "Сухоцвіти" },
];

const SORT_OPTIONS = [
  { key: "default", en: "Default", uk: "За замовчуванням" },
  { key: "low", en: "Price: Low → High", uk: "Ціна: від низької" },
  { key: "high", en: "Price: High → Low", uk: "Ціна: від високої" },
];

/* ─── bouquets ─── */
const BOUQUETS = [
  { id: 1, emoji: "🌹", nameEn: "Velvet Rose", nameUk: "Оксамитова троянда", type: "roses", occasionEn: "Anniversary", occasionUk: "Ювілей", priceS: 650, priceM: 1100, priceL: 1800, bg: "bg-violet-50" },
  { id: 2, emoji: "🌷", nameEn: "Spring Tulip Bunch", nameUk: "Весняні тюльпани", type: "tulips", occasionEn: "Birthday", occasionUk: "День народження", priceS: 450, priceM: 850, priceL: 1400, bg: "bg-purple-50" },
  { id: 3, emoji: "🌸", nameEn: "Peony Bliss", nameUk: "Півонієва насолода", type: "peonies", occasionEn: "Wedding", occasionUk: "Весілля", priceS: 800, priceM: 1350, priceL: 2200, bg: "bg-fuchsia-50" },
  { id: 4, emoji: "💐", nameEn: "Garden Melody", nameUk: "Садова мелодія", type: "mixed", occasionEn: "Just Because", occasionUk: "Просто так", priceS: 550, priceM: 950, priceL: 1550, bg: "bg-lime-50" },
  { id: 5, emoji: "🪴", nameEn: "Monstera Love", nameUk: "Монстера Лав", type: "plants", occasionEn: "Housewarming", occasionUk: "Новосілля", priceS: 480, priceM: 780, priceL: 1200, bg: "bg-green-50" },
  { id: 6, emoji: "🌾", nameEn: "Boho Dried Set", nameUk: "Бохо сухоцвіти", type: "dried", occasionEn: "Home Decor", occasionUk: "Декор", priceS: 520, priceM: 900, priceL: 1350, bg: "bg-amber-50" },
  { id: 7, emoji: "🌺", nameEn: "Sunset Mixed", nameUk: "Західний мікс", type: "mixed", occasionEn: "Corporate", occasionUk: "Корпоративні", priceS: 600, priceM: 1050, priceL: 1700, bg: "bg-orange-50" },
  { id: 8, emoji: "🌹", nameEn: "Scarlet Elegance", nameUk: "Червона елегантність", type: "roses", occasionEn: "Romance", occasionUk: "Романтика", priceS: 750, priceM: 1250, priceL: 2000, bg: "bg-red-50" },
];

/* ─── extras ─── */
const EXTRAS = [
  { key: "vase", emoji: "🏺", en: "Vase", uk: "Ваза", price: 200 },
  { key: "card", emoji: "💌", en: "Card", uk: "Листівка", price: 50 },
  { key: "chocolate", emoji: "🍫", en: "Chocolate", uk: "Шоколад", price: 150 },
  { key: "teddy", emoji: "🧸", en: "Teddy Bear", uk: "Плюшевий ведмідь", price: 250 },
];

/* ─── delivery types ─── */
const DELIVERY_TYPES = [
  { key: "pickup", en: "Pickup (free)", uk: "Самовивіз (безкоштовно)", price: 0 },
  { key: "express", en: "Express 1h (₴150)", uk: "Експрес 1 год (₴150)", price: 150 },
  { key: "scheduled", en: "Scheduled (₴80)", uk: "За розкладом (₴80)", price: 80 },
];

/* ─── care tips ─── */
const CARE_TIPS = [
  { emoji: "✂️", en: "Trim stems at 45° angle every 2 days", uk: "Підрізайте стебла під кутом 45° кожні 2 дні", titleEn: "Trim Stems", titleUk: "Підрізка стебел" },
  { emoji: "💧", en: "Change water daily, use flower food", uk: "Змінюйте воду щодня, використовуйте підживлення", titleEn: "Clean Water", titleUk: "Чиста вода" },
  { emoji: "❄️", en: "Keep away from direct sun and heat sources", uk: "Тримайте подалі від прямого сонця та джерел тепла", titleEn: "Keep Cool", titleUk: "Прохолода" },
  { emoji: "🍂", en: "Remove wilted petals and leaves promptly", uk: "Вчасно прибирайте зів'ялі пелюстки та листя", titleEn: "Remove Wilted", titleUk: "Прибирайте зів'яле" },
];

/* ─── reviews ─── */
const REVIEWS = [
  { nameEn: "Olena K.", nameUk: "Олена К.", stars: 5, en: "Ordered peonies for my wedding — they were absolutely stunning! Fresh, vibrant, delivered right on time.", uk: "Замовляла півонії на весілля — вони були неймовірні! Свіжі, яскраві, доставлені вчасно.", occasionEn: "Wedding", occasionUk: "Весілля" },
  { nameEn: "Dmytro S.", nameUk: "Дмитро С.", stars: 5, en: "Monthly subscription for our office keeps the mood bright. The corporate service is outstanding.", uk: "Щомісячна підписка для офісу тримає настрій яскравим. Корпоративний сервіс — на висоті.", occasionEn: "Corporate", occasionUk: "Корпоративні" },
  { nameEn: "Anya M.", nameUk: "Аня М.", stars: 5, en: "Surprise birthday delivery for my mom — she cried happy tears! The teddy bear add-on was perfect.", uk: "Сюрприз-доставка на день народження мами — вона плакала від щастя! Плюшевий ведмідь — ідеальний додаток.", occasionEn: "Birthday", occasionUk: "День народження" },
];

/* ─── subscription plans ─── */
const SUBSCRIPTIONS = [
  { emoji: "🌿", en: "Starter", uk: "Стартовий", priceEn: "₴1,200/mo", priceUk: "₴1 200/міс", descEn: "1 fresh arrangement per week, seasonal flowers", descUk: "1 свіжа композиція на тиждень, сезонні квіти" },
  { emoji: "🌷", en: "Business", uk: "Бізнес", priceEn: "₴2,800/mo", priceUk: "₴2 800/міс", descEn: "2 arrangements per week + reception centerpiece", descUk: "2 композиції на тиждень + композиція для ресепшн" },
  { emoji: "🌺", en: "Premium", uk: "Преміум", priceEn: "₴5,500/mo", priceUk: "₴5 500/міс", descEn: "Daily fresh flowers, event floristry, branded vases", descUk: "Щоденні свіжі квіти, оформлення подій, брендовані вази" },
];

/* ─── nav items ─── */
const NAV: { en: string; uk: string }[] = [
  { en: "Catalog", uk: "Каталог" }, { en: "Delivery", uk: "Доставка" },
  { en: "Occasions", uk: "Нагоди" }, { en: "Corporate", uk: "Корпоративним" },
  { en: "Contact", uk: "Контакти" },
];

/* ═══════════════════════════════════════════════════════════ */

export function BloomShopDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  /* catalog state */
  const [activeType, setActiveType] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [cartCount, setCartCount] = useState(0);

  /* express order state */
  const [orderStep, setOrderStep] = useState(0);
  const [selectedBouquet, setSelectedBouquet] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState<"S" | "M" | "L">("M");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [deliveryType, setDeliveryType] = useState("pickup");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  /* ─── helpers ─── */
  const filteredBouquets = BOUQUETS.filter(
    (b) => activeType === "all" || b.type === activeType
  );

  const sortedBouquets = [...filteredBouquets].sort((a, b) => {
    if (sortBy === "low") return a.priceM - b.priceM;
    if (sortBy === "high") return b.priceM - a.priceM;
    return 0;
  });

  const getBouquetPrice = (b: (typeof BOUQUETS)[0], size: "S" | "M" | "L") =>
    size === "S" ? b.priceS : size === "L" ? b.priceL : b.priceM;

  const calcTotal = () => {
    const bouquet = BOUQUETS.find((b) => b.id === selectedBouquet);
    if (!bouquet) return 0;
    const base = getBouquetPrice(bouquet, selectedSize);
    const extrasSum = EXTRAS.filter((e) =>
      selectedExtras.includes(e.key)
    ).reduce((s, e) => s + e.price, 0);
    const deliveryCost =
      DELIVERY_TYPES.find((d) => d.key === deliveryType)?.price ?? 0;
    return base + extrasSum + deliveryCost;
  };

  const toggleExtra = (key: string) =>
    setSelectedExtras((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );

  const startOrder = (id: number) => {
    setSelectedBouquet(id);
    setSelectedSize("M");
    setSelectedExtras([]);
    setDeliveryType("pickup");
    setAddress("");
    setMessage("");
    setOrderStep(1);
  };

  const STEPS = [
    { en: "Bouquet", uk: "Букет" },
    { en: "Size", uk: "Розмір" },
    { en: "Extras", uk: "Додатки" },
    { en: "Delivery", uk: "Доставка" },
    { en: "Message", uk: "Побажання" },
    { en: "Confirm", uk: "Підтвердити" },
  ];

  /* ─── render ─── */
  return (
    <div className="min-h-screen bg-[#f5f5f5] text-gray-800">
      {/* ═══ HEADER ═══ */}
      <header className="sticky top-0 z-30 border-b border-violet-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <span className="text-xl font-bold text-violet-600">
            💐 Bloom Flowers
          </span>

          <nav className="hidden gap-5 md:flex">
            {NAV.map((n) => (
              <span
                key={n.en}
                className="cursor-pointer text-sm font-medium text-gray-600 dark:text-neutral-300 transition-colors hover:text-violet-600"
              >
                {isUk ? n.uk : n.en}
              </span>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="relative text-2xl" aria-label="Cart">
              🛒
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="rounded-full bg-violet-600 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-violet-700">
              {isUk ? "Швидке замовлення" : "Quick Order"}
            </button>
          </div>
        </div>
      </header>

      {/* ═══ HERO ═══ */}
      <section className="bg-linear-to-br from-violet-100 via-purple-50 to-lime-50 px-4 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 text-5xl tracking-widest">
            🌷 🌹 🌻 🌸 🌺 💐
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-violet-700 md:text-5xl">
            {isUk
              ? "Квіти для Кожного Моменту"
              : "Flowers for Every Moment"}
          </h1>
          <p className="mb-8 text-lg text-gray-600">
            {isUk
              ? "Свіжі букети, рослини та декор із доставкою за 1 годину по Києву"
              : "Fresh bouquets, plants & decor with 1-hour delivery across Kyiv"}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="rounded-full bg-violet-600 px-8 py-3 text-lg font-bold text-white shadow-lg shadow-violet-300 transition-transform hover:scale-105">
              {isUk ? "Переглянути каталог" : "Shop Now"}
            </button>
            <button className="rounded-full border-2 border-lime-500 bg-white px-8 py-3 text-lg font-bold text-lime-700 transition-transform hover:scale-105">
              🚀 {isUk ? "Доставка за 1 годину" : "Same Day Delivery"}
            </button>
          </div>
        </div>
      </section>

      {/* ═══ CATALOG ═══ */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="mb-2 text-center text-3xl font-bold text-violet-700">
          {isUk ? "Каталог букетів" : "Bouquet Catalog"}
        </h2>
        <p className="mb-8 text-center text-gray-500">
          {isUk
            ? "Оберіть тип квітів та сортування"
            : "Filter by type and sort by price"}
        </p>

        {/* filters */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {FLOWER_TYPES.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveType(t.key)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  activeType === t.key
                    ? "bg-violet-600 text-white"
                    : "bg-white text-gray-600 dark:text-neutral-300 hover:bg-violet-100"
                }`}
              >
                {isUk ? t.uk : t.en}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-violet-200 bg-white px-3 py-2 text-sm text-gray-700 dark:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
            aria-label={isUk ? "Сортування" : "Sort"}
          >
            {SORT_OPTIONS.map((s) => (
              <option key={s.key} value={s.key}>
                {isUk ? s.uk : s.en}
              </option>
            ))}
          </select>
        </div>

        {/* bouquet grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sortedBouquets.map((b) => (
            <div
              key={b.id}
              className={`group rounded-2xl ${b.bg} border border-white/60 p-5 shadow-sm transition-shadow hover:shadow-lg`}
            >
              <div className="mb-3 text-center text-5xl">{b.emoji}</div>
              <h3 className="mb-1 text-center text-lg font-bold text-gray-800">
                {isUk ? b.nameUk : b.nameEn}
              </h3>
              <span className="mb-3 block text-center text-xs font-medium text-violet-500">
                {isUk ? b.occasionUk : b.occasionEn}
              </span>

              <div className="mb-3 flex justify-center gap-3 text-sm text-gray-600">
                <span>S ₴{b.priceS}</span>
                <span className="font-bold text-violet-700">
                  M ₴{b.priceM}
                </span>
                <span>L ₴{b.priceL}</span>
              </div>

              <button
                onClick={() => {
                  startOrder(b.id);
                  setCartCount((c) => c + 1);
                }}
                className="w-full rounded-xl bg-violet-600 py-2 text-sm font-semibold text-white transition-colors hover:bg-violet-700"
              >
                {isUk ? "Замовити" : "Order"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ EXPRESS ORDER ═══ */}
      {orderStep > 0 && selectedBouquet && (
        <section className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="mb-2 text-center text-3xl font-bold text-violet-700">
            {isUk ? "Швидке замовлення" : "Express Order"}
          </h2>

          {/* progress bar */}
          <div className="mb-8 flex items-center justify-center gap-1">
            {STEPS.map((s, i) => (
              <div key={s.en} className="flex items-center">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    i + 1 <= orderStep
                      ? "bg-violet-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {i + 1}
                </div>
                <span className="ml-1 mr-2 hidden text-xs text-gray-500 dark:text-neutral-400 sm:inline">
                  {isUk ? s.uk : s.en}
                </span>
                {i < STEPS.length - 1 && (
                  <div
                    className={`h-0.5 w-6 ${
                      i + 1 < orderStep ? "bg-violet-400" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* step content */}
          <div className="rounded-2xl border border-violet-200 bg-white dark:bg-neutral-800 p-6 shadow-md">
            {/* Step 1 — selected bouquet confirmation */}
            {orderStep === 1 && (() => {
              const b = BOUQUETS.find((x) => x.id === selectedBouquet)!;
              return (
                <div className="text-center">
                  <div className="mb-2 text-5xl">{b.emoji}</div>
                  <p className="mb-1 text-xl font-bold text-gray-800">
                    {isUk ? b.nameUk : b.nameEn}
                  </p>
                  <p className="mb-4 text-sm text-gray-500">
                    {isUk ? b.occasionUk : b.occasionEn}
                  </p>
                  <button
                    onClick={() => setOrderStep(2)}
                    className="rounded-full bg-violet-600 px-8 py-2 font-semibold text-white hover:bg-violet-700"
                  >
                    {isUk ? "Далі →" : "Next →"}
                  </button>
                </div>
              );
            })()}

            {/* Step 2 — size */}
            {orderStep === 2 && (() => {
              const b = BOUQUETS.find((x) => x.id === selectedBouquet)!;
              return (
                <div>
                  <h3 className="mb-4 text-center text-lg font-bold">
                    {isUk ? "Оберіть розмір" : "Choose Size"}
                  </h3>
                  <div className="flex justify-center gap-4">
                    {(["S", "M", "L"] as const).map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`rounded-xl border-2 px-8 py-4 text-center transition-colors ${
                          selectedSize === sz
                            ? "border-violet-600 bg-violet-50"
                            : "border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-violet-300"
                        }`}
                      >
                        <span className="block text-2xl font-bold">{sz}</span>
                        <span className="text-sm text-gray-600">
                          ₴{getBouquetPrice(b, sz)}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-between">
                    <button
                      onClick={() => setOrderStep(1)}
                      className="text-sm text-violet-600 hover:underline"
                    >
                      ← {isUk ? "Назад" : "Back"}
                    </button>
                    <button
                      onClick={() => setOrderStep(3)}
                      className="rounded-full bg-violet-600 px-6 py-2 font-semibold text-white hover:bg-violet-700"
                    >
                      {isUk ? "Далі →" : "Next →"}
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* Step 3 — extras */}
            {orderStep === 3 && (
              <div>
                <h3 className="mb-4 text-center text-lg font-bold">
                  {isUk ? "Додатки" : "Extras"}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {EXTRAS.map((e) => (
                    <button
                      key={e.key}
                      onClick={() => toggleExtra(e.key)}
                      className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-colors ${
                        selectedExtras.includes(e.key)
                          ? "border-lime-500 bg-lime-50"
                          : "border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-violet-300"
                      }`}
                    >
                      <span className="text-2xl">{e.emoji}</span>
                      <div>
                        <span className="block text-sm font-semibold">
                          {isUk ? e.uk : e.en}
                        </span>
                        <span className="text-xs text-gray-500">
                          +₴{e.price}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => setOrderStep(2)}
                    className="text-sm text-violet-600 hover:underline"
                  >
                    ← {isUk ? "Назад" : "Back"}
                  </button>
                  <button
                    onClick={() => setOrderStep(4)}
                    className="rounded-full bg-violet-600 px-6 py-2 font-semibold text-white hover:bg-violet-700"
                  >
                    {isUk ? "Далі →" : "Next →"}
                  </button>
                </div>
              </div>
            )}

            {/* Step 4 — delivery */}
            {orderStep === 4 && (
              <div>
                <h3 className="mb-4 text-center text-lg font-bold">
                  {isUk ? "Тип доставки" : "Delivery Type"}
                </h3>
                <div className="mb-4 flex flex-col gap-3">
                  {DELIVERY_TYPES.map((d) => (
                    <button
                      key={d.key}
                      onClick={() => setDeliveryType(d.key)}
                      className={`rounded-xl border-2 px-5 py-3 text-left transition-colors ${
                        deliveryType === d.key
                          ? "border-violet-600 bg-violet-50"
                          : "border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-violet-300"
                      }`}
                    >
                      <span className="font-medium">
                        {isUk ? d.uk : d.en}
                      </span>
                    </button>
                  ))}
                </div>
                {deliveryType !== "pickup" && (
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={
                      isUk ? "Адреса отримувача" : "Recipient address"
                    }
                    className="w-full rounded-xl border border-violet-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                  />
                )}
                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => setOrderStep(3)}
                    className="text-sm text-violet-600 hover:underline"
                  >
                    ← {isUk ? "Назад" : "Back"}
                  </button>
                  <button
                    onClick={() => setOrderStep(5)}
                    className="rounded-full bg-violet-600 px-6 py-2 font-semibold text-white hover:bg-violet-700"
                  >
                    {isUk ? "Далі →" : "Next →"}
                  </button>
                </div>
              </div>
            )}

            {/* Step 5 — message */}
            {orderStep === 5 && (
              <div>
                <h3 className="mb-4 text-center text-lg font-bold">
                  {isUk ? "Побажання на листівці" : "Sender Message Card"}
                </h3>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  maxLength={200}
                  placeholder={
                    isUk
                      ? "Напишіть побажання (необов'язково)..."
                      : "Write your message (optional)..."
                  }
                  className="w-full rounded-xl border border-violet-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                />
                <p className="mt-1 text-right text-xs text-gray-400">
                  {message.length}/200
                </p>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => setOrderStep(4)}
                    className="text-sm text-violet-600 hover:underline"
                  >
                    ← {isUk ? "Назад" : "Back"}
                  </button>
                  <button
                    onClick={() => setOrderStep(6)}
                    className="rounded-full bg-violet-600 px-6 py-2 font-semibold text-white hover:bg-violet-700"
                  >
                    {isUk ? "Далі →" : "Next →"}
                  </button>
                </div>
              </div>
            )}

            {/* Step 6 — confirm */}
            {orderStep === 6 && (() => {
              const b = BOUQUETS.find((x) => x.id === selectedBouquet)!;
              const total = calcTotal();
              return (
                <div>
                  <h3 className="mb-4 text-center text-lg font-bold">
                    {isUk ? "Підтвердження замовлення" : "Order Confirmation"}
                  </h3>
                  <div className="mb-4 space-y-2 rounded-xl bg-violet-50 p-4 text-sm">
                    <p>
                      <span className="font-semibold">
                        {isUk ? "Букет:" : "Bouquet:"}
                      </span>{" "}
                      {b.emoji} {isUk ? b.nameUk : b.nameEn} ({selectedSize})
                    </p>
                    <p>
                      <span className="font-semibold">
                        {isUk ? "Ціна букету:" : "Bouquet price:"}
                      </span>{" "}
                      ₴{getBouquetPrice(b, selectedSize)}
                    </p>
                    {selectedExtras.length > 0 && (
                      <p>
                        <span className="font-semibold">
                          {isUk ? "Додатки:" : "Extras:"}
                        </span>{" "}
                        {selectedExtras
                          .map((k) => {
                            const ex = EXTRAS.find((e) => e.key === k)!;
                            return `${ex.emoji} ${isUk ? ex.uk : ex.en} (+₴${ex.price})`;
                          })
                          .join(", ")}
                      </p>
                    )}
                    <p>
                      <span className="font-semibold">
                        {isUk ? "Доставка:" : "Delivery:"}
                      </span>{" "}
                      {isUk
                        ? DELIVERY_TYPES.find((d) => d.key === deliveryType)!.uk
                        : DELIVERY_TYPES.find((d) => d.key === deliveryType)!.en}
                    </p>
                    {address && (
                      <p>
                        <span className="font-semibold">
                          {isUk ? "Адреса:" : "Address:"}
                        </span>{" "}
                        {address}
                      </p>
                    )}
                    {message && (
                      <p>
                        <span className="font-semibold">
                          {isUk ? "Побажання:" : "Message:"}
                        </span>{" "}
                        {message}
                      </p>
                    )}
                    <hr className="border-violet-200" />
                    <p className="text-lg font-extrabold text-violet-700">
                      {isUk ? "Разом:" : "Total:"} ₴{total}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <button
                      onClick={() => setOrderStep(5)}
                      className="text-sm text-violet-600 hover:underline"
                    >
                      ← {isUk ? "Назад" : "Back"}
                    </button>
                    <button
                      onClick={() => {
                        setOrderStep(0);
                        setSelectedBouquet(null);
                      }}
                      className="rounded-full bg-lime-600 px-8 py-2 font-bold text-white shadow-lg shadow-lime-200 hover:bg-lime-700"
                    >
                      ✅ {isUk ? "Підтвердити" : "Confirm Order"}
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </section>
      )}

      {/* ═══ SAME DAY DELIVERY ═══ */}
      <section className="bg-linear-to-br from-violet-50 to-lime-50 px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-2 text-3xl font-bold text-violet-700">
            🚚 {isUk ? "Зони доставки" : "Delivery Zones"}
          </h2>
          <p className="mb-10 text-gray-500">
            {isUk
              ? "Свіжі квіти по всьому Києву та області"
              : "Fresh flowers across Kyiv and the region"}
          </p>

          {/* concentric circles */}
          <div className="relative mx-auto flex h-72 w-72 items-center justify-center sm:h-80 sm:w-80">
            {/* outer ring — region */}
            <div className="absolute inset-0 rounded-full bg-lime-100 opacity-70" />
            <span className="absolute bottom-2 text-xs font-semibold text-lime-700">
              {isUk ? "Область — наступний день" : "Region — next day"}
            </span>

            {/* middle ring — suburbs */}
            <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-200 opacity-80 sm:h-56 sm:w-56" />
            <span className="absolute left-1/2 top-[72%] -translate-x-1/2 text-xs font-semibold text-violet-700">
              {isUk ? "Передмістя — 2 год" : "Suburbs — 2h"}
            </span>

            {/* inner ring — center */}
            <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400 sm:h-32 sm:w-32" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-bold text-white">
              {isUk ? "Центр — 1 год" : "Center — 1h"}
            </span>
          </div>
        </div>
      </section>

      {/* ═══ CORPORATE ═══ */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-2 text-center text-3xl font-bold text-violet-700">
          🏢 {isUk ? "Корпоративним клієнтам" : "Corporate Services"}
        </h2>
        <p className="mb-10 text-center text-gray-500">
          {isUk
            ? "Щомісячні підписки, оформлення подій, брендований пакунок"
            : "Monthly subscriptions, event flowers, branded packaging"}
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {SUBSCRIPTIONS.map((sub) => (
            <div
              key={sub.en}
              className="rounded-2xl border border-violet-200 bg-white dark:bg-neutral-800 p-6 text-center shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="mb-3 text-4xl">{sub.emoji}</div>
              <h3 className="mb-1 text-xl font-bold text-gray-800">
                {isUk ? sub.uk : sub.en}
              </h3>
              <p className="mb-3 text-2xl font-extrabold text-violet-600">
                {isUk ? sub.priceUk : sub.priceEn}
              </p>
              <p className="mb-5 text-sm text-gray-500">
                {isUk ? sub.descUk : sub.descEn}
              </p>
              <button className="rounded-full bg-violet-600 px-6 py-2 text-sm font-semibold text-white hover:bg-violet-700">
                {isUk ? "Обрати план" : "Choose Plan"}
              </button>
            </div>
          ))}
        </div>

        {/* extra corporate features */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            {
              emoji: "📅",
              en: "Monthly flower subscription — always fresh office décor",
              uk: "Щомісячна підписка — завжди свіжий декор в офісі",
            },
            {
              emoji: "🎉",
              en: "Event floristry — conferences, launches, galas",
              uk: "Оформлення подій — конференції, презентації, гали",
            },
            {
              emoji: "🎁",
              en: "Branded packaging with your company logo",
              uk: "Брендований пакунок із логотипом вашої компанії",
            },
          ].map((f) => (
            <div
              key={f.en}
              className="flex items-start gap-3 rounded-xl bg-lime-50 p-4"
            >
              <span className="shrink-0 text-2xl">{f.emoji}</span>
              <p className="text-sm text-gray-700">{isUk ? f.uk : f.en}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CARE GUIDE ═══ */}
      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-2 text-center text-3xl font-bold text-violet-700">
            🌿 {isUk ? "Догляд за квітами" : "Flower Care Guide"}
          </h2>
          <p className="mb-10 text-center text-gray-500">
            {isUk
              ? "4 поради, щоб квіти радували довше"
              : "4 tips to keep your flowers fresh longer"}
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CARE_TIPS.map((tip, i) => (
              <div
                key={i}
                className="rounded-2xl border border-violet-100 bg-violet-50 p-5 text-center"
              >
                <div className="mb-3 text-4xl">{tip.emoji}</div>
                <h3 className="mb-2 font-bold text-gray-800">
                  {isUk ? tip.titleUk : tip.titleEn}
                </h3>
                <p className="text-sm text-gray-600">
                  {isUk ? tip.uk : tip.en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ REVIEWS ═══ */}
      <section className="bg-linear-to-br from-violet-50 to-white px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-10 text-center text-3xl font-bold text-violet-700">
            💬 {isUk ? "Відгуки клієнтів" : "Customer Reviews"}
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <div
                key={i}
                className="rounded-2xl border border-violet-200 bg-white dark:bg-neutral-800 p-6 shadow-sm"
              >
                <div className="mb-2 text-lg">
                  {"⭐".repeat(r.stars)}
                </div>
                <p className="mb-3 text-sm leading-relaxed text-gray-600">
                  &ldquo;{isUk ? r.uk : r.en}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-800">
                    {isUk ? r.nameUk : r.nameEn}
                  </span>
                  <span className="rounded-full bg-violet-100 px-3 py-0.5 text-xs font-medium text-violet-600">
                    {isUk ? r.occasionUk : r.occasionEn}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-gray-900 px-4 py-12 text-gray-300">
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* brand */}
          <div>
            <h3 className="mb-3 text-lg font-bold text-white">
              💐 Bloom Flowers
            </h3>
            <p className="text-sm leading-relaxed">
              {isUk
                ? "Свіжість гарантована. Кожен букет зібраний із любов'ю та увагою до деталей."
                : "Freshness guaranteed. Every bouquet crafted with love and attention to detail."}
            </p>
          </div>

          {/* address */}
          <div>
            <h4 className="mb-3 font-semibold text-white">
              {isUk ? "Адреса" : "Address"}
            </h4>
            <p className="text-sm">
              {isUk
                ? "вул. Квіткова, 12, Київ, 01001"
                : "12 Kvitkova St, Kyiv, 01001"}
            </p>
            <p className="mt-2 text-sm">
              📞 +380 (44) 123-45-67
            </p>
            <p className="text-sm">
              📞 +380 (67) 890-12-34
            </p>
          </div>

          {/* delivery hours */}
          <div>
            <h4 className="mb-3 font-semibold text-white">
              {isUk ? "Години доставки" : "Delivery Hours"}
            </h4>
            <p className="text-sm">
              {isUk ? "Пн–Сб: 07:00 – 22:00" : "Mon–Sat: 07:00 – 22:00"}
            </p>
            <p className="text-sm">
              {isUk ? "Нд: 09:00 – 20:00" : "Sun: 09:00 – 20:00"}
            </p>
            <p className="mt-2 text-sm text-lime-400">
              🚀 {isUk ? "Експрес-доставка за 1 годину" : "1-hour express delivery"}
            </p>
          </div>

          {/* social */}
          <div>
            <h4 className="mb-3 font-semibold text-white">
              {isUk ? "Соціальні мережі" : "Social"}
            </h4>
            <div className="flex gap-4 text-2xl">
              <span className="cursor-pointer transition-transform hover:scale-110">
                📸
              </span>
              <span className="cursor-pointer transition-transform hover:scale-110">
                📘
              </span>
              <span className="cursor-pointer transition-transform hover:scale-110">
                🐦
              </span>
              <span className="cursor-pointer transition-transform hover:scale-110">
                📱
              </span>
            </div>
            <p className="mt-4 text-sm text-violet-400">
              🌸 {isUk ? "Свіжість гарантована" : "Freshness guaranteed"}
            </p>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-6xl border-t border-gray-700 pt-6 text-center text-xs text-gray-500">
          &copy; 2026 Bloom Flowers.{" "}
          {isUk ? "Усі права захищені." : "All rights reserved."}
        </div>
      </footer>
    </div>
  );
}
