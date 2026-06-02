"use client";

import { useState } from "react";

export function HomeFindDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  /* ── state ── */
  const [searchType, setSearchType] = useState<"buy" | "rent">("buy");
  const [searchCity, setSearchCity] = useState("kyiv");
  const [searchRooms, setSearchRooms] = useState("any");
  const [searchMinPrice, setSearchMinPrice] = useState("");
  const [searchMaxPrice, setSearchMaxPrice] = useState("");

  const [listFilter, setListFilter] = useState<"buy" | "rent">("buy");
  const [sortBy, setSortBy] = useState<"priceLow" | "priceHigh" | "newest">("newest");

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [mortPrice, setMortPrice] = useState(120000);
  const [mortDown, setMortDown] = useState(20);
  const [mortTerm, setMortTerm] = useState(20);
  const [mortRate, setMortRate] = useState(18);

  /* ── data ── */
  const properties = [
    {
      id: 1, type: "buy" as const, kind: "apartment",
      emoji: "🏢", nameEn: "Modern 2-Room Apartment", nameUk: "Сучасна 2-кімнатна квартира",
      price: 95000, area: 68, rooms: 2, floor: "7/16",
      locationEn: "Kyiv, Obolon", locationUk: "Київ, Оболонь",
      descEn: "Bright apartment with panoramic Dnipro river views. Open-plan kitchen, underfloor heating, smart home system. Walking distance to metro.",
      descUk: "Світла квартира з панорамним видом на Дніпро. Кухня-студія, тепла підлога, система «розумний дім». Пішки до метро.",
      features: ["parking", "balcony", "elevator", "renovated"],
      agentEn: "Anna Koval", agentUk: "Анна Коваль", agentPhone: "+380 67 111 2233",
      year: 2024,
    },
    {
      id: 2, type: "buy" as const, kind: "house",
      emoji: "🏡", nameEn: "Family House with Garden", nameUk: "Сімейний будинок із садом",
      price: 210000, area: 185, rooms: 4, floor: "2 floors",
      locationEn: "Kyiv, Holosiivskyi", locationUk: "Київ, Голосіївський",
      descEn: "Spacious family house near Holosiivskyi forest. Private garden, two-car garage, sauna. Quiet neighborhood with excellent schools nearby.",
      descUk: "Просторий сімейний будинок біля Голосіївського лісу. Приватний сад, гараж на два авто, сауна. Тихий район з чудовими школами поруч.",
      features: ["parking", "balcony", "renovated"],
      agentEn: "Dmytro Shevchenko", agentUk: "Дмитро Шевченко", agentPhone: "+380 50 222 3344",
      year: 2023,
    },
    {
      id: 3, type: "buy" as const, kind: "studio",
      emoji: "🏙️", nameEn: "Compact Studio in City Center", nameUk: "Компактна студія в центрі міста",
      price: 52000, area: 32, rooms: 1, floor: "10/22",
      locationEn: "Kyiv, Pechersk", locationUk: "Київ, Печерськ",
      descEn: "Stylish studio apartment in a new premium complex. Floor-to-ceiling windows, built-in kitchen, concierge service. Perfect for young professionals.",
      descUk: "Стильна квартира-студія у новому преміальному комплексі. Вікна від підлоги до стелі, вбудована кухня, консьєрж-сервіс.",
      features: ["elevator", "renovated"],
      agentEn: "Anna Koval", agentUk: "Анна Коваль", agentPhone: "+380 67 111 2233",
      year: 2025,
    },
    {
      id: 4, type: "rent" as const, kind: "apartment",
      emoji: "🌇", nameEn: "3-Room Apartment with Terrace", nameUk: "3-кімнатна з терасою",
      price: 1200, area: 92, rooms: 3, floor: "5/9",
      locationEn: "Kyiv, Podil", locationUk: "Київ, Поділ",
      descEn: "Charming apartment in the historic Podil district. Spacious terrace overlooking Andriyivskyy Descent. Fully furnished with designer interior.",
      descUk: "Чарівна квартира в історичному районі Поділ. Простора тераса з видом на Андріївський узвіз. Повністю мебльована з дизайнерським інтер'єром.",
      features: ["balcony", "elevator", "renovated"],
      agentEn: "Olena Bondar", agentUk: "Олена Бондар", agentPhone: "+380 63 333 4455",
      year: 2022,
    },
    {
      id: 5, type: "rent" as const, kind: "studio",
      emoji: "✨", nameEn: "Cozy Studio near Metro", nameUk: "Затишна студія біля метро",
      price: 550, area: 28, rooms: 1, floor: "3/14",
      locationEn: "Kyiv, Pozniaky", locationUk: "Київ, Позняки",
      descEn: "Newly renovated studio just 2 min walk from Pozniaky metro. Ideal for students or remote workers. All utilities included in rent.",
      descUk: "Щойно відремонтована студія за 2 хв пішки від метро Позняки. Ідеально для студентів або віддалених працівників. Комунальні включені.",
      features: ["elevator", "renovated"],
      agentEn: "Dmytro Shevchenko", agentUk: "Дмитро Шевченко", agentPhone: "+380 50 222 3344",
      year: 2024,
    },
    {
      id: 6, type: "buy" as const, kind: "apartment",
      emoji: "🌳", nameEn: "Apartment near Botanical Garden", nameUk: "Квартира біля Ботанічного саду",
      price: 135000, area: 105, rooms: 3, floor: "4/8",
      locationEn: "Kyiv, Pechersk", locationUk: "Київ, Печерськ",
      descEn: "Elegant 3-room apartment with views of the Botanical Garden. High ceilings, parquet flooring, two bathrooms. Prestigious quiet neighborhood.",
      descUk: "Елегантна 3-кімнатна квартира з видом на Ботанічний сад. Високі стелі, паркетна підлога, дві ванні. Престижний тихий район.",
      features: ["parking", "balcony", "elevator", "renovated"],
      agentEn: "Olena Bondar", agentUk: "Олена Бондар", agentPhone: "+380 63 333 4455",
      year: 2021,
    },
  ];

  const kindLabels: Record<string, { en: string; uk: string }> = {
    apartment: { en: "Apartment", uk: "Квартира" },
    house: { en: "House", uk: "Будинок" },
    studio: { en: "Studio", uk: "Студія" },
  };

  const featureLabels: Record<string, { en: string; uk: string; emoji: string }> = {
    parking: { en: "Parking", uk: "Паркінг", emoji: "🅿️" },
    balcony: { en: "Balcony", uk: "Балкон", emoji: "🌅" },
    elevator: { en: "Elevator", uk: "Ліфт", emoji: "🛗" },
    renovated: { en: "Renovated", uk: "З ремонтом", emoji: "🔧" },
  };

  const agents = [
    { nameEn: "Anna Koval", nameUk: "Анна Коваль", emoji: "👩‍💼", specEn: "Residential", specUk: "Житлова нерухомість", sold: 186, rating: 4.9, phone: "+380 67 111 2233" },
    { nameEn: "Dmytro Shevchenko", nameUk: "Дмитро Шевченко", emoji: "👨‍💼", specEn: "Commercial", specUk: "Комерційна нерухомість", sold: 124, rating: 4.8, phone: "+380 50 222 3344" },
    { nameEn: "Olena Bondar", nameUk: "Олена Бондар", emoji: "👩‍💼", specEn: "Residential", specUk: "Житлова нерухомість", sold: 210, rating: 4.9, phone: "+380 63 333 4455" },
    { nameEn: "Viktor Lysenko", nameUk: "Віктор Лисенко", emoji: "🧑‍💼", specEn: "Commercial & Land", specUk: "Комерційна та земельні ділянки", sold: 97, rating: 4.7, phone: "+380 93 444 5566" },
  ];

  const neighborhoods = [
    { nameEn: "Podil", nameUk: "Поділ", avgPrice: 1850, charEn: "Bohemian, historic streets, art galleries, riverside walks", charUk: "Богемний, історичні вулички, арт-галереї, прогулянки набережною", amenities: "🎨 🍕 🚇 🏛️ ☕" },
    { nameEn: "Pechersk", nameUk: "Печерськ", avgPrice: 2400, charEn: "Prestigious, green parks, government quarter, embassies", charUk: "Престижний, зелені парки, урядовий квартал, посольства", amenities: "🌳 🏛️ 🏥 🎭 🛍️" },
    { nameEn: "Obolon", nameUk: "Оболонь", avgPrice: 1400, charEn: "Family-friendly, Dnipro embankment, modern infrastructure", charUk: "Сімейний район, набережна Дніпра, сучасна інфраструктура", amenities: "🏊 🌊 🛒 🏫 🚇" },
    { nameEn: "Pozniaky", nameUk: "Позняки", avgPrice: 1200, charEn: "Rapidly growing, new builds, great transport links, affordable", charUk: "Район що швидко росте, новобудови, чудова транспортна розв'язка, доступний", amenities: "🏗️ 🚇 🛒 🏫 🌳" },
  ];

  const reviews = [
    { nameEn: "Iryna M.", nameUk: "Ірина М.", roleEn: "Buyer", roleUk: "Покупець", emoji: "👩", textEn: "HomeFind helped us find the perfect apartment in Obolon within two weeks. The agent was incredibly responsive and guided us through every step of the process.", textUk: "HomeFind допомогли нам знайти ідеальну квартиру на Оболоні за два тижні. Агент була неймовірно уважною та супроводжувала нас на кожному етапі." },
    { nameEn: "Oleksandr K.", nameUk: "Олександр К.", roleEn: "Seller", roleUk: "Продавець", emoji: "👨", textEn: "Sold my house in Holosiivskyi district for above asking price. Professional photography and virtual tour made all the difference. Highly recommend!", textUk: "Продав будинок у Голосіївському районі вище запитуваної ціни. Професійна фотозйомка та віртуальний тур зробили свою справу. Рекомендую!" },
    { nameEn: "Natalia S.", nameUk: "Наталія С.", roleEn: "Buyer", roleUk: "Покупець", emoji: "👩", textEn: "As a first-time buyer, I was nervous about the process. HomeFind's mortgage calculator and agent support made everything smooth and transparent.", textUk: "Як покупець-новачок, я хвилювалась щодо процесу. Іпотечний калькулятор HomeFind та підтримка агента зробили все гладко та прозоро." },
  ];

  /* ── helpers ── */
  const filtered = properties
    .filter((p) => p.type === listFilter)
    .sort((a, b) => {
      if (sortBy === "priceLow") return a.price - b.price;
      if (sortBy === "priceHigh") return b.price - a.price;
      return b.year - a.year;
    });

  const selectedProperty = properties.find((p) => p.id === selectedId) ?? null;

  const calcMortgage = () => {
    const principal = mortPrice * (1 - mortDown / 100);
    const monthlyRate = mortRate / 100 / 12;
    const n = mortTerm * 12;
    if (monthlyRate === 0) return { monthly: principal / n, totalPaid: principal, totalInterest: 0 };
    const monthly = (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    const totalPaid = monthly * n;
    return { monthly, totalPaid, totalInterest: totalPaid - principal };
  };

  const mort = calcMortgage();
  const fmt = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

  /* ── render ── */
  return (
    <div className="min-h-screen bg-gray-50 text-stone-700 font-sans">
      {/* ════════ HEADER ════════ */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-xl font-bold text-teal-600">🏠 HomeFind</div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-stone-600">
            <span className="hover:text-teal-600 cursor-pointer">{isUk ? "Купити" : "Buy"}</span>
            <span className="hover:text-teal-600 cursor-pointer">{isUk ? "Оренда" : "Rent"}</span>
            <span className="hover:text-teal-600 cursor-pointer">{isUk ? "Продати" : "Sell"}</span>
            <span className="hover:text-teal-600 cursor-pointer">{isUk ? "Агенти" : "Agents"}</span>
            <span className="hover:text-teal-600 cursor-pointer">{isUk ? "Про нас" : "About"}</span>
          </nav>
          <button className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
            {isUk ? "Додати об'єкт" : "List Property"}
          </button>
        </div>
      </header>

      {/* ════════ HERO ════════ */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-stone-800 mb-4">
            {isUk ? "Знайдіть Дім Своєї Мрії" : "Find Your Dream Home"}
          </h1>
          <p className="text-stone-500 text-lg mb-10 max-w-xl mx-auto">
            {isUk
              ? "Тисячі перевірених об'єктів по всій Україні. Купівля, оренда, продаж — просто і прозоро."
              : "Thousands of verified properties across Ukraine. Buy, rent, sell — simple and transparent."}
          </p>

          {/* search bar */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 md:p-6 max-w-4xl mx-auto">
            {/* buy/rent toggle */}
            <div className="flex gap-2 mb-4 justify-center">
              {(["buy", "rent"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setSearchType(t)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                    searchType === t
                      ? "bg-teal-600 text-white"
                      : "bg-white border border-gray-300 text-stone-600 hover:border-teal-400"
                  }`}
                >
                  {t === "buy" ? (isUk ? "Купити" : "Buy") : isUk ? "Оренда" : "Rent"}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* city */}
              <select
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white text-stone-700 focus:ring-2 focus:ring-teal-400 outline-none"
              >
                <option value="kyiv">{isUk ? "Київ" : "Kyiv"}</option>
                <option value="lviv">{isUk ? "Львів" : "Lviv"}</option>
                <option value="odesa">{isUk ? "Одеса" : "Odesa"}</option>
                <option value="dnipro">{isUk ? "Дніпро" : "Dnipro"}</option>
              </select>
              {/* min price */}
              <input
                type="number"
                placeholder={isUk ? "Мін ціна, $" : "Min price, $"}
                value={searchMinPrice}
                onChange={(e) => setSearchMinPrice(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white text-stone-700 focus:ring-2 focus:ring-teal-400 outline-none"
              />
              {/* max price */}
              <input
                type="number"
                placeholder={isUk ? "Макс ціна, $" : "Max price, $"}
                value={searchMaxPrice}
                onChange={(e) => setSearchMaxPrice(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white text-stone-700 focus:ring-2 focus:ring-teal-400 outline-none"
              />
              {/* rooms */}
              <select
                value={searchRooms}
                onChange={(e) => setSearchRooms(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white text-stone-700 focus:ring-2 focus:ring-teal-400 outline-none"
              >
                <option value="any">{isUk ? "Кімнати" : "Rooms"}</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4+">4+</option>
              </select>
              {/* search button */}
              <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg py-2.5 text-sm transition-colors">
                🔍 {isUk ? "Шукати" : "Search"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ PROPERTY LISTINGS ════════ */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-stone-800 mb-2 text-center">
            {isUk ? "Актуальні Пропозиції" : "Featured Listings"}
          </h2>
          <p className="text-stone-500 text-center mb-8">
            {isUk ? "Щоденно оновлюються та перевіряються нашими агентами" : "Updated daily and verified by our agents"}
          </p>

          {/* filters row */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex gap-2">
              {(["buy", "rent"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setListFilter(t)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    listFilter === t
                      ? "bg-teal-600 text-white"
                      : "bg-white border border-gray-300 text-stone-600 hover:border-teal-400"
                  }`}
                >
                  {t === "buy" ? (isUk ? "Купити" : "Buy") : isUk ? "Оренда" : "Rent"}
                </button>
              ))}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-white text-stone-600 focus:ring-2 focus:ring-teal-400 outline-none"
            >
              <option value="newest">{isUk ? "Найновіші" : "Newest"}</option>
              <option value="priceLow">{isUk ? "Ціна ↑" : "Price Low"}</option>
              <option value="priceHigh">{isUk ? "Ціна ↓" : "Price High"}</option>
            </select>
          </div>

          {/* cards grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* image placeholder */}
                <div className="h-44 bg-linear-to-br from-teal-50 to-teal-100 flex items-center justify-center text-6xl">
                  {p.emoji}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700">
                      {kindLabels[p.kind]?.[isUk ? "uk" : "en"] ?? p.kind}
                    </span>
                    <span className="text-xs text-stone-400">
                      {p.type === "buy" ? (isUk ? "Продаж" : "For Sale") : isUk ? "Оренда" : "For Rent"}
                    </span>
                  </div>
                  <h3 className="font-bold text-stone-800 mb-1">{isUk ? p.nameUk : p.nameEn}</h3>
                  <p className="text-xs text-stone-400 mb-3">📍 {isUk ? p.locationUk : p.locationEn}</p>
                  <div className="flex gap-4 text-xs text-stone-500 mb-4">
                    <span>📐 {p.area} m²</span>
                    <span>🚪 {p.rooms} {isUk ? "кімн." : "rooms"}</span>
                    <span>🏢 {p.floor}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-extrabold text-teal-600">
                      {p.type === "rent" ? `$${p.price}/` + (isUk ? "міс" : "mo") : fmt(p.price)}
                    </span>
                    <button
                      onClick={() => setSelectedId(p.id)}
                      className="text-sm font-semibold text-teal-600 hover:text-teal-800 border border-teal-300 hover:border-teal-500 px-3 py-1 rounded-lg transition-colors"
                    >
                      {isUk ? "Деталі" : "View"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-stone-400 py-12">
              {isUk ? "Немає об'єктів за обраними фільтрами" : "No properties match selected filters"}
            </p>
          )}
        </div>
      </section>

      {/* ════════ PROPERTY DETAIL MODAL ════════ */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelectedId(null)}>
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* modal header image */}
            <div className="h-48 bg-linear-to-br from-teal-100 to-teal-200 flex items-center justify-center text-7xl relative">
              {selectedProperty.emoji}
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-stone-600 flex items-center justify-center text-lg font-bold transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700">
                  {kindLabels[selectedProperty.kind]?.[isUk ? "uk" : "en"]}
                </span>
                <span className="text-xs text-stone-400">
                  {selectedProperty.type === "buy" ? (isUk ? "Продаж" : "For Sale") : isUk ? "Оренда" : "For Rent"}
                </span>
              </div>
              <h3 className="text-xl font-bold text-stone-800 mb-1">
                {isUk ? selectedProperty.nameUk : selectedProperty.nameEn}
              </h3>
              <p className="text-sm text-stone-400 mb-4">📍 {isUk ? selectedProperty.locationUk : selectedProperty.locationEn}</p>

              <p className="text-stone-600 text-sm leading-relaxed mb-5">
                {isUk ? selectedProperty.descUk : selectedProperty.descEn}
              </p>

              {/* stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-teal-600">{selectedProperty.area}</div>
                  <div className="text-xs text-stone-400">m²</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-teal-600">{selectedProperty.rooms}</div>
                  <div className="text-xs text-stone-400">{isUk ? "Кімнат" : "Rooms"}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-teal-600">{selectedProperty.floor}</div>
                  <div className="text-xs text-stone-400">{isUk ? "Поверх" : "Floor"}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-teal-600">${Math.round(selectedProperty.price / selectedProperty.area)}</div>
                  <div className="text-xs text-stone-400">{isUk ? "$/м²" : "$/m²"}</div>
                </div>
              </div>

              {/* features */}
              <h4 className="text-sm font-bold text-stone-700 mb-2">{isUk ? "Особливості" : "Features"}</h4>
              <div className="flex flex-wrap gap-2 mb-5">
                {selectedProperty.features.map((f) => (
                  <span key={f} className="text-xs bg-teal-50 text-teal-700 px-2.5 py-1 rounded-full">
                    {featureLabels[f]?.emoji} {featureLabels[f]?.[isUk ? "uk" : "en"]}
                  </span>
                ))}
              </div>

              {/* floor plan placeholder */}
              <div className="bg-gray-100 rounded-lg p-6 text-center mb-5">
                <div className="text-3xl mb-2">📐</div>
                <p className="text-xs text-stone-400">{isUk ? "План поверху" : "Floor Plan"}</p>
              </div>

              {/* price & agent */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-teal-50 rounded-xl">
                <div>
                  <div className="text-2xl font-extrabold text-teal-700">
                    {selectedProperty.type === "rent"
                      ? `$${selectedProperty.price}/` + (isUk ? "міс" : "mo")
                      : fmt(selectedProperty.price)}
                  </div>
                  {selectedProperty.type === "buy" && (
                    <div className="text-xs text-stone-500">
                      ≈ ₴{(selectedProperty.price * 41.5).toLocaleString("uk-UA")}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-stone-700">
                    {isUk ? selectedProperty.agentUk : selectedProperty.agentEn}
                  </div>
                  <div className="text-xs text-stone-500">{selectedProperty.agentPhone}</div>
                  <button className="mt-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors">
                    📞 {isUk ? "Зв'язатися" : "Contact"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════ MORTGAGE CALCULATOR ════════ */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-stone-800 mb-2 text-center">
            {isUk ? "Іпотечний Калькулятор" : "Mortgage Calculator"}
          </h2>
          <p className="text-stone-500 text-center mb-10">
            {isUk ? "Розрахуйте щомісячний платіж за кілька секунд" : "Calculate your monthly payment in seconds"}
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* inputs */}
            <div className="space-y-5">
              {/* property price */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">
                  {isUk ? "Вартість нерухомості" : "Property Price"} — {fmt(mortPrice)}
                </label>
                <input
                  type="range"
                  min={20000}
                  max={500000}
                  step={5000}
                  value={mortPrice}
                  onChange={(e) => setMortPrice(Number(e.target.value))}
                  className="w-full accent-teal-600"
                />
                <div className="flex justify-between text-xs text-stone-400">
                  <span>$20,000</span>
                  <span>$500,000</span>
                </div>
              </div>

              {/* down payment */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">
                  {isUk ? "Початковий внесок" : "Down Payment"} — {mortDown}% ({fmt(mortPrice * mortDown / 100)})
                </label>
                <input
                  type="range"
                  min={10}
                  max={50}
                  step={5}
                  value={mortDown}
                  onChange={(e) => setMortDown(Number(e.target.value))}
                  className="w-full accent-teal-600"
                />
                <div className="flex justify-between text-xs text-stone-400">
                  <span>10%</span>
                  <span>50%</span>
                </div>
              </div>

              {/* loan term */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  {isUk ? "Термін кредиту" : "Loan Term"}
                </label>
                <div className="flex flex-wrap gap-2">
                  {[5, 10, 15, 20, 25, 30].map((y) => (
                    <button
                      key={y}
                      onClick={() => setMortTerm(y)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        mortTerm === y
                          ? "bg-teal-600 text-white"
                          : "bg-gray-100 text-stone-600 hover:bg-teal-50"
                      }`}
                    >
                      {y} {isUk ? "р." : "yr"}
                    </button>
                  ))}
                </div>
              </div>

              {/* interest rate */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1">
                  {isUk ? "Річна ставка" : "Interest Rate"} — {mortRate}%
                </label>
                <input
                  type="range"
                  min={5}
                  max={30}
                  step={0.5}
                  value={mortRate}
                  onChange={(e) => setMortRate(Number(e.target.value))}
                  className="w-full accent-teal-600"
                />
                <div className="flex justify-between text-xs text-stone-400">
                  <span>5%</span>
                  <span>30%</span>
                </div>
              </div>
            </div>

            {/* results */}
            <div className="bg-linear-to-br from-teal-600 to-teal-700 rounded-2xl p-6 text-white flex flex-col justify-center">
              <div className="text-center mb-6">
                <p className="text-teal-200 text-sm mb-1">{isUk ? "Щомісячний платіж" : "Monthly Payment"}</p>
                <p className="text-4xl font-extrabold">{fmt(mort.monthly)}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <p className="text-teal-200 text-xs mb-1">{isUk ? "Загалом сплачено" : "Total Paid"}</p>
                  <p className="text-lg font-bold">{fmt(mort.totalPaid)}</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <p className="text-teal-200 text-xs mb-1">{isUk ? "Загалом відсотків" : "Total Interest"}</p>
                  <p className="text-lg font-bold">{fmt(mort.totalInterest)}</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <p className="text-teal-200 text-xs mb-1">{isUk ? "Сума кредиту" : "Loan Amount"}</p>
                  <p className="text-lg font-bold">{fmt(mortPrice * (1 - mortDown / 100))}</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <p className="text-teal-200 text-xs mb-1">{isUk ? "Початковий внесок" : "Down Payment"}</p>
                  <p className="text-lg font-bold">{fmt(mortPrice * mortDown / 100)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ SELL PROPERTY ════════ */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-stone-800 mb-2">
            {isUk ? "Продайте Свою Нерухомість" : "List Your Property"}
          </h2>
          <p className="text-stone-500 mb-10 max-w-xl mx-auto">
            {isUk
              ? "Три простих кроки — і ваш об'єкт побачать тисячі потенційних покупців"
              : "Three simple steps — and thousands of potential buyers will see your listing"}
          </p>

          {/* 3 steps */}
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {[
              { step: 1, emoji: "📝", titleEn: "Submit", titleUk: "Подайте заявку", descEn: "Fill out the property details form with photos and description. Takes under 5 minutes.", descUk: "Заповніть форму з деталями, фото та описом об'єкта. Займає менше 5 хвилин." },
              { step: 2, emoji: "✅", titleEn: "Verify", titleUk: "Верифікація", descEn: "Our team verifies documents and conducts a free property valuation within 24 hours.", descUk: "Наша команда перевіряє документи та проводить безкоштовну оцінку протягом 24 годин." },
              { step: 3, emoji: "🚀", titleEn: "Publish", titleUk: "Публікація", descEn: "Your listing goes live with professional photos and appears in search results immediately.", descUk: "Ваше оголошення виходить з професійними фото та одразу з'являється у пошуку." },
            ].map((s) => (
              <div key={s.step} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="w-12 h-12 mx-auto mb-4 bg-teal-50 rounded-full flex items-center justify-center text-2xl">
                  {s.emoji}
                </div>
                <div className="text-xs font-bold text-teal-600 mb-1">
                  {isUk ? "Крок" : "Step"} {s.step}
                </div>
                <h3 className="font-bold text-stone-800 mb-2">{isUk ? s.titleUk : s.titleEn}</h3>
                <p className="text-sm text-stone-500">{isUk ? s.descUk : s.descEn}</p>
              </div>
            ))}
          </div>

          {/* benefits */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 max-w-3xl mx-auto">
            <h3 className="font-bold text-stone-800 mb-4">
              {isUk ? "Чому HomeFind?" : "Why HomeFind?"}
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 text-left text-sm text-stone-600">
              {[
                { en: "🎯 Targeted reach to 50,000+ active buyers monthly", uk: "🎯 Цільове охоплення 50 000+ активних покупців щомісяця" },
                { en: "📸 Free professional photography for your listing", uk: "📸 Безкоштовна професійна фотозйомка вашого об'єкта" },
                { en: "📊 Real-time analytics on views and inquiries", uk: "📊 Аналітика переглядів та запитів у реальному часі" },
                { en: "🤝 Dedicated agent assigned within 1 hour", uk: "🤝 Призначений агент протягом 1 години" },
                { en: "💰 Competitive commission — only 2% on sale", uk: "💰 Конкурентна комісія — лише 2% від продажу" },
                { en: "🔒 Secure document handling and legal support", uk: "🔒 Безпечне оформлення документів та юридична підтримка" },
              ].map((b, i) => (
                <p key={i}>{isUk ? b.uk : b.en}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ AGENTS ════════ */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-stone-800 mb-2 text-center">
            {isUk ? "Наші Агенти" : "Our Agents"}
          </h2>
          <p className="text-stone-500 text-center mb-10">
            {isUk ? "Досвідчені фахівці, які знають ринок зсередини" : "Experienced professionals who know the market inside out"}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {agents.map((a, i) => (
              <div key={i} className="bg-gray-50 rounded-xl border border-gray-200 p-5 text-center hover:shadow-md transition-shadow">
                <div className="text-4xl mb-3">{a.emoji}</div>
                <h3 className="font-bold text-stone-800 mb-0.5">{isUk ? a.nameUk : a.nameEn}</h3>
                <p className="text-xs text-teal-600 font-medium mb-3">{isUk ? a.specUk : a.specEn}</p>
                <div className="flex justify-center gap-4 text-xs text-stone-500 mb-3">
                  <span>🏠 {a.sold} {isUk ? "угод" : "sold"}</span>
                  <span>⭐ {a.rating}</span>
                </div>
                <p className="text-xs text-stone-400">{a.phone}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ NEIGHBORHOODS ════════ */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-stone-800 mb-2 text-center">
            {isUk ? "Гід по Районах Києва" : "Kyiv Neighborhoods Guide"}
          </h2>
          <p className="text-stone-500 text-center mb-10">
            {isUk ? "Порівняйте райони та знайдіть ідеальне місце для життя" : "Compare neighborhoods and find your ideal place to live"}
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {neighborhoods.map((n, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-stone-800 text-lg">{isUk ? n.nameUk : n.nameEn}</h3>
                  <span className="text-sm font-bold text-teal-600">${n.avgPrice}/m²</span>
                </div>
                <p className="text-sm text-stone-500 mb-3">{isUk ? n.charUk : n.charEn}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm">{n.amenities}</span>
                  <span className="text-xs text-stone-400">
                    {isUk ? "Сер. ціна" : "Avg price"}: <span className="font-semibold text-stone-600">${n.avgPrice}</span>/m²
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ REVIEWS ════════ */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-stone-800 mb-2 text-center">
            {isUk ? "Відгуки Клієнтів" : "Client Reviews"}
          </h2>
          <p className="text-stone-500 text-center mb-10">
            {isUk ? "Що кажуть наші покупці та продавці" : "What our buyers and sellers say"}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="bg-gray-50 rounded-xl border border-gray-200 p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 shrink-0 bg-teal-100 rounded-full flex items-center justify-center text-lg">
                    {r.emoji}
                  </div>
                  <div>
                    <div className="font-semibold text-stone-800 text-sm">{isUk ? r.nameUk : r.nameEn}</div>
                    <div className="text-xs text-teal-600">{isUk ? r.roleUk : r.roleEn}</div>
                  </div>
                </div>
                <p className="text-sm text-stone-600 leading-relaxed">{isUk ? r.textUk : r.textEn}</p>
                <div className="mt-3 text-yellow-500 text-sm">⭐⭐⭐⭐⭐</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ FOOTER ════════ */}
      <footer className="bg-stone-800 text-stone-300 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* contact */}
            <div>
              <div className="text-lg font-bold text-white mb-4">🏠 HomeFind</div>
              <p className="text-sm mb-2">📍 {isUk ? "м. Київ, вул. Хрещатик, 22" : "Kyiv, 22 Khreshchatyk St."}</p>
              <p className="text-sm mb-2">📞 +380 44 123 4567</p>
              <p className="text-sm">✉️ info@homefind.ua</p>
            </div>

            {/* popular searches */}
            <div>
              <h4 className="text-sm font-bold text-white mb-4">{isUk ? "Популярні запити" : "Popular Searches"}</h4>
              <ul className="space-y-1.5 text-sm">
                <li className="hover:text-teal-400 cursor-pointer">{isUk ? "Квартири в Києві" : "Apartments in Kyiv"}</li>
                <li className="hover:text-teal-400 cursor-pointer">{isUk ? "Будинки з садом" : "Houses with garden"}</li>
                <li className="hover:text-teal-400 cursor-pointer">{isUk ? "Оренда 1-кімнатна" : "1-room for rent"}</li>
                <li className="hover:text-teal-400 cursor-pointer">{isUk ? "Новобудови Київ" : "New builds Kyiv"}</li>
                <li className="hover:text-teal-400 cursor-pointer">{isUk ? "Комерційна нерухомість" : "Commercial property"}</li>
              </ul>
            </div>

            {/* cities */}
            <div>
              <h4 className="text-sm font-bold text-white mb-4">{isUk ? "Міста" : "Cities"}</h4>
              <ul className="space-y-1.5 text-sm">
                <li className="hover:text-teal-400 cursor-pointer">{isUk ? "Київ" : "Kyiv"}</li>
                <li className="hover:text-teal-400 cursor-pointer">{isUk ? "Львів" : "Lviv"}</li>
                <li className="hover:text-teal-400 cursor-pointer">{isUk ? "Одеса" : "Odesa"}</li>
                <li className="hover:text-teal-400 cursor-pointer">{isUk ? "Дніпро" : "Dnipro"}</li>
                <li className="hover:text-teal-400 cursor-pointer">{isUk ? "Харків" : "Kharkiv"}</li>
              </ul>
            </div>

            {/* company */}
            <div>
              <h4 className="text-sm font-bold text-white mb-4">{isUk ? "Компанія" : "Company"}</h4>
              <ul className="space-y-1.5 text-sm">
                <li className="hover:text-teal-400 cursor-pointer">{isUk ? "Про нас" : "About Us"}</li>
                <li className="hover:text-teal-400 cursor-pointer">{isUk ? "Кар'єра" : "Careers"}</li>
                <li className="hover:text-teal-400 cursor-pointer">{isUk ? "Блог" : "Blog"}</li>
                <li className="hover:text-teal-400 cursor-pointer">{isUk ? "Контакти" : "Contact"}</li>
              </ul>
            </div>
          </div>

          {/* legal */}
          <div className="border-t border-stone-700 pt-6 text-center">
            <p className="text-xs text-stone-500 mb-2">
              © 2026 HomeFind. {isUk ? "Усі права захищені." : "All rights reserved."}
            </p>
            <p className="text-xs text-stone-600 max-w-2xl mx-auto">
              {isUk
                ? "Інформація на сайті має ознайомлювальний характер і не є публічною офертою. Ціни можуть змінюватися. Для отримання актуальних даних зверніться до нашого агента."
                : "Information on this website is for reference purposes only and does not constitute a public offer. Prices are subject to change. Contact our agent for up-to-date details."}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
