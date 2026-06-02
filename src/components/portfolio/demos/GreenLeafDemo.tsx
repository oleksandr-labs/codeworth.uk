"use client";

import { useState, useEffect } from "react";

interface Props { lang: string; }

const MENU_ITEMS = [
  { id: 1, tab: "breakfast", nameUk: "Асаї-боул з ягодами", nameEn: "Acai Berry Bowl", emoji: "🫐", price: 185, calories: 320, raw: true, spicy: false, gf: true },
  { id: 2, tab: "breakfast", nameUk: "Тост з авокадо та мікрозеленню", nameEn: "Avocado & Microgreens Toast", emoji: "🥑", price: 155, calories: 280, raw: false, spicy: false, gf: false },
  { id: 3, tab: "breakfast", nameUk: "Гранола з кокосовим молоком", nameEn: "Granola with Coconut Milk", emoji: "🥥", price: 130, calories: 420, raw: false, spicy: false, gf: true },
  { id: 4, tab: "lunch", nameUk: "Будда-боул з темпе", nameEn: "Tempeh Buddha Bowl", emoji: "🥗", price: 245, calories: 510, raw: false, spicy: false, gf: true },
  { id: 5, tab: "lunch", nameUk: "Тайський суп карі", nameEn: "Thai Curry Soup", emoji: "🍲", price: 195, calories: 380, raw: false, spicy: true, gf: true },
  { id: 6, tab: "lunch", nameUk: "Рол з фалафелем та хумусом", nameEn: "Falafel & Hummus Wrap", emoji: "🌯", price: 165, calories: 440, raw: false, spicy: false, gf: false },
  { id: 7, tab: "dinner", nameUk: "Різотто з грибами та трюфелем", nameEn: "Mushroom Truffle Risotto", emoji: "🍄", price: 285, calories: 520, raw: false, spicy: false, gf: true, seasonal: true },
  { id: 8, tab: "dinner", nameUk: "Лазанья з горіховим соусом болоньєзе", nameEn: "Walnut Bolognese Lasagna", emoji: "🍝", price: 265, calories: 580, raw: false, spicy: false, gf: false },
  { id: 9, tab: "dinner", nameUk: "Буряковий карпаччо з горіхами", nameEn: "Beetroot Carpaccio with Nuts", emoji: "🫀", price: 195, calories: 290, raw: true, spicy: false, gf: true, seasonal: true },
  { id: 10, tab: "desserts", nameUk: "Шоколадний торт без борошна", nameEn: "Flourless Chocolate Cake", emoji: "🍫", price: 165, calories: 380, raw: false, spicy: false, gf: true },
  { id: 11, tab: "desserts", nameUk: "Raw чізкейк з малиною", nameEn: "Raw Raspberry Cheesecake", emoji: "🍓", price: 145, calories: 310, raw: true, spicy: false, gf: true },
  { id: 12, tab: "desserts", nameUk: "Морозиво з кеш'ю", nameEn: "Cashew Ice Cream", emoji: "🍦", price: 95, calories: 220, raw: true, spicy: false, gf: true },
  { id: 13, tab: "drinks", nameUk: "Cold brew з рослинним молоком", nameEn: "Cold Brew with Plant Milk", emoji: "☕", price: 110, calories: 80, raw: false, spicy: false, gf: true },
  { id: 14, tab: "drinks", nameUk: "Матча з вівсяним молоком", nameEn: "Matcha Oat Milk Latte", emoji: "🍵", price: 120, calories: 110, raw: false, spicy: false, gf: true },
  { id: 15, tab: "drinks", nameUk: "Smoothie 'Сонце'", nameEn: "Sunshine Smoothie", emoji: "☀️", price: 135, calories: 210, raw: true, spicy: false, gf: true },
] as const;

const FARMS = [
  { id: "zorya", emoji: "🌻", nameUk: "Ферма «Зоря»", nameEn: "Zorya Farm", locationUk: "Київська обл., 85 км", locationEn: "Kyiv region, 85 km", productsUk: "Сезонні овочі, зелень", productsEn: "Seasonal vegetables, greens", certUk: "Органік-сертифікат UA", certEn: "Organic certified UA" },
  { id: "karpaty", emoji: "🍓", nameUk: "«Карпатські ягоди»", nameEn: "Carpathian Berries", locationUk: "Закарпаття, 320 км", locationEn: "Zakarpattia, 320 km", productsUk: "Лісові ягоди, гриби", productsEn: "Wild berries, mushrooms", certUk: "Натуральне фермерство", certEn: "Natural farming" },
  { id: "mriya", emoji: "🫒", nameUk: "Ферма «Мрія»", nameEn: "Mriia Farm", locationUk: "Херсонська обл., 440 км", locationEn: "Kherson region, 440 km", productsUk: "Олія, горіхи, насіння", productsEn: "Oils, nuts, seeds", certUk: "Органік-сертифікат EU", certEn: "EU Organic certified" },
  { id: "zeleny", emoji: "🥦", nameUk: "«Зелений хутір»", nameEn: "Green Homestead", locationUk: "Вінницька обл., 270 км", locationEn: "Vinnytsia region, 270 km", productsUk: "Броколі, кейл, мікрозелень", productsEn: "Broccoli, kale, microgreens", certUk: "Без пестицидів", certEn: "Pesticide-free" },
  { id: "sadok", emoji: "🍎", nameUk: "«Садок у Долині»", nameEn: "Valley Orchard", locationUk: "Черкаська обл., 180 км", locationEn: "Cherkasy region, 180 km", productsUk: "Яблука, груші, сливи", productsEn: "Apples, pears, plums", certUk: "Сімейна ферма", certEn: "Family farm" },
];

const REVIEWS = [
  { id: 1, name: "Sarah M.", rating: 5, textEn: "I didn't miss meat once — everything on the menu is so satisfying and full of flavor. A revelation!", textUk: "Жодного разу не сумувала за м'ясом — все настільки смачне і ситне. Одкровення!" },
  { id: 2, name: "Олексій К.", rating: 5, textEn: "Brought the kids and they loved it! My daughter is still talking about the cashew ice cream.", textUk: "Привів дітей, і вони були в захваті! Донька досі говорить про морозиво з кеш'ю." },
  { id: 3, name: "Emma L.", rating: 5, textEn: "Honest, fresh, and genuinely tasty. No pretence — just real food made with care.", textUk: "Чесно, свіжо і по-справжньому смачно. Без пихи — просто справжня їжа з душею." },
  { id: 4, name: "Марина Р.", rating: 5, textEn: "The best salads I've had in Lviv, hands down. The beetroot carpaccio is a must-try.", textUk: "Найкращі салати у Львові, без перебільшення. Буряковий карпаччо — обов'язково спробуйте." },
  { id: 5, name: "Tom B.", rating: 5, textEn: "Came in for a coffee, ended up staying two hours with a Buddha bowl. Worth every minute.", textUk: "Зайшов на каву, а залишився на дві години з будда-боулом. Воно того варте." },
];

const TABS = [
  { key: "breakfast", labelEn: "Breakfast", labelUk: "Сніданок" },
  { key: "lunch", labelEn: "Lunch", labelUk: "Обід" },
  { key: "dinner", labelEn: "Dinner", labelUk: "Вечеря" },
  { key: "desserts", labelEn: "Desserts", labelUk: "Десерти" },
  { key: "drinks", labelEn: "Drinks", labelUk: "Напої" },
];

const FLOATING_INGREDIENTS = ["🥦", "🥕", "🌿", "🫐", "🥑"];

export function GreenLeafDemo({ lang }: Props) {
  const isUk = lang === "uk";
  const [activeTab, setActiveTab] = useState("breakfast");
  const [activeFarm, setActiveFarm] = useState<string | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingData] = useState({ name: "", phone: "", date: "", time: "", size: "2", notes: "" });
  const [daysUntilEnd, setDaysUntilEnd] = useState(0);
  const [progressVisible, setProgressVisible] = useState(false);

  useEffect(() => {
    const now = new Date();
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    setDaysUntilEnd(end.getDate() - now.getDate());
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setProgressVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const filteredItems = MENU_ITEMS.filter(i => i.tab === activeTab);

  const t = (en: string, uk: string) => isUk ? uk : en;

  const dayLabel = () => {
    const d = daysUntilEnd;
    if (!isUk) return `${d} day${d !== 1 ? "s" : ""}`;
    if (d % 10 === 1 && d % 100 !== 11) return `${d} день`;
    if ([2,3,4].includes(d % 10) && ![12,13,14].includes(d % 100)) return `${d} дні`;
    return `${d} днів`;
  };

  return (
    <div className="font-sans bg-[#FAFFF8] text-[#1E3A22] min-h-screen overflow-x-hidden">

      {/* NAV */}
      <nav className="bg-white border-b border-[#A8D5B5] sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <span className="text-xl font-bold text-[#2D7A3A] shrink-0">🌱 GreenLeaf</span>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-[#1E3A22]">
            <a href="#menu" className="hover:text-[#2D7A3A] transition-colors">{t("Menu", "Меню")}</a>
            <a href="#farms" className="hover:text-[#2D7A3A] transition-colors">{t("Our Farm", "Наша ферма")}</a>
            <a href="#mission" className="hover:text-[#2D7A3A] transition-colors">{t("Mission", "Місія")}</a>
          </div>
          <button
            onClick={() => { setBookingOpen(true); setBookingStep(1); }}
            className="shrink-0 bg-[#2D7A3A] text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#235f2d] transition-colors"
          >
            {t("Reserve table", "Зарезервувати")}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative bg-[#FAFFF8] py-20 px-4 text-center overflow-hidden">
        {/* Floating ingredients */}
        <div className="absolute inset-0 pointer-events-none select-none">
          {FLOATING_INGREDIENTS.map((emoji, i) => (
            <span
              key={i}
              className="absolute text-3xl opacity-20"
              style={{
                top: `${15 + i * 17}%`,
                left: `${5 + i * 22}%`,
                transform: `rotate(${-20 + i * 12}deg)`,
              }}
            >
              {emoji}
            </span>
          ))}
          <span className="absolute text-3xl opacity-20 top-[60%] right-[8%]">🌿</span>
          <span className="absolute text-3xl opacity-20 top-[25%] right-[18%]">🥕</span>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <span className="inline-block bg-[#A8D5B5]/30 text-[#2D7A3A] text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-wider">
            {t("100% plant-based · Lviv", "100% рослинне · Львів")}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-[#1E3A22] leading-tight mb-6">
            {t(
              "Food that cares about the planet — and about you",
              "Їжа, що турбується про планету — і про вас"
            )}
          </h1>

          {/* Seasonal countdown */}
          <div className="inline-flex items-center gap-2 bg-[#A8D5B5]/20 border border-[#A8D5B5] text-[#2D7A3A] text-sm font-medium px-4 py-2 rounded-full mb-8">
            <span>🌿</span>
            <span>
              {t("Seasonal menu changes in", "Сезонне меню змінюється через")} {dayLabel()}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#menu"
              className="bg-[#2D7A3A] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#235f2d] transition-colors"
            >
              {t("View Menu", "Переглянути меню")}
            </a>
            <a
              href="#mission"
              className="text-[#2D7A3A] font-semibold underline underline-offset-4 hover:text-[#235f2d] transition-colors"
            >
              {t("Our Mission", "Наша місія")}
            </a>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1E3A22] text-center mb-2">
            {t("Our Menu", "Наше меню")}
          </h2>
          <p className="text-center text-[#2D7A3A] text-sm mb-8">
            {t("Seasonal · Organic · Plant-based", "Сезонне · Органічне · Рослинне")}
          </p>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeTab === tab.key
                    ? "bg-[#2D7A3A] text-white shadow-md"
                    : "bg-[#FAFFF8] text-[#2D7A3A] border border-[#A8D5B5] hover:bg-[#A8D5B5]/20"
                }`}
              >
                {isUk ? tab.labelUk : tab.labelEn}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map(item => (
              <div key={item.id} className="bg-[#FAFFF8] rounded-2xl p-5 border border-[#A8D5B5]/40 hover:shadow-md transition-shadow flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <span className="text-4xl">{item.emoji}</span>
                  {"seasonal" in item && item.seasonal && (
                    <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full">
                      {t("Seasonal", "Сезонне")}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-bold text-[#1E3A22] text-base leading-snug">
                    {isUk ? item.nameUk : item.nameEn}
                  </p>
                  <p className="text-xs text-[#2D7A3A]/60 mt-0.5">{item.calories} kcal</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {item.raw && (
                    <span className="bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded-full border border-green-200">🌱 Raw</span>
                  )}
                  {item.spicy && (
                    <span className="bg-red-50 text-red-600 text-xs px-2 py-0.5 rounded-full border border-red-200">🔥 Spicy</span>
                  )}
                  {item.gf && (
                    <span className="bg-amber-50 text-amber-700 text-xs px-2 py-0.5 rounded-full border border-amber-200">🌾 GF</span>
                  )}
                </div>
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-[#A8D5B5]/30">
                  <span className="font-bold text-[#2D7A3A] text-lg">{item.price} ₴</span>
                  <button className="bg-[#2D7A3A] text-white text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-[#235f2d] transition-colors">
                    {t("Order", "Замовити")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FARM MAP */}
      <section id="farms" className="py-16 px-4 bg-[#A8D5B5]/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1E3A22] text-center mb-2">
            {t("Where our ingredients come from", "Звідки наші інгредієнти")}
          </h2>
          <p className="text-center text-[#2D7A3A]/70 text-sm mb-8">
            {t("Every product has a story and an address.", "Кожен продукт має свою історію й адресу.")}
          </p>

          {/* Stats strip */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { en: "100% local suppliers", uk: "100% локальні постачальники" },
              { en: "Average 260 km", uk: "Середня відстань 260 км" },
              { en: "5 partner farms", uk: "5 партнерських ферм" },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-xl p-4 text-center border border-[#A8D5B5]/40">
                <p className="font-bold text-[#2D7A3A] text-sm md:text-base">{isUk ? s.uk : s.en}</p>
              </div>
            ))}
          </div>

          {/* Farm cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {FARMS.map(farm => (
              <div key={farm.id}>
                <button
                  onClick={() => setActiveFarm(activeFarm === farm.id ? null : farm.id)}
                  className={`w-full text-left bg-white rounded-2xl p-5 border transition-all ${
                    activeFarm === farm.id
                      ? "border-[#2D7A3A] shadow-lg"
                      : "border-[#A8D5B5]/40 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{farm.emoji}</span>
                    <div>
                      <p className="font-bold text-[#1E3A22] text-sm">{isUk ? farm.nameUk : farm.nameEn}</p>
                      <p className="text-xs text-[#2D7A3A]/60">{isUk ? farm.locationUk : farm.locationEn}</p>
                    </div>
                  </div>
                  <p className="text-xs text-[#1E3A22]/70">{isUk ? farm.productsUk : farm.productsEn}</p>
                </button>
                {activeFarm === farm.id && (
                  <div className="mt-1 bg-[#2D7A3A]/5 border border-[#2D7A3A]/20 rounded-xl p-4 text-sm text-[#1E3A22]">
                    <p className="font-semibold mb-1">{isUk ? farm.nameUk : farm.nameEn}</p>
                    <p className="text-xs mb-1">📍 {isUk ? farm.locationUk : farm.locationEn}</p>
                    <p className="text-xs mb-1">🌿 {isUk ? farm.productsUk : farm.productsEn}</p>
                    <p className="text-xs font-medium text-[#2D7A3A]">✅ {isUk ? farm.certUk : farm.certEn}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Criteria */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { emoji: "🌿", en: "Organic certified", uk: "Органічна сертифікація", descEn: "All farms hold organic or natural farming certificates.", descUk: "Усі ферми мають органічні або натуральні сертифікати." },
              { emoji: "📍", en: "Local & Seasonal", uk: "Локальне та сезонне", descEn: "We source only what's in season within Ukraine.", descUk: "Закуповуємо лише сезонне в межах України." },
              { emoji: "🚫", en: "No pesticides", uk: "Без пестицидів", descEn: "Zero synthetic chemicals in our supply chain.", descUk: "Жодної синтетики у ланцюгу постачання." },
            ].map((c, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-[#A8D5B5]/40 text-center">
                <span className="text-3xl">{c.emoji}</span>
                <p className="font-bold text-[#1E3A22] mt-2 mb-1">{isUk ? c.uk : c.en}</p>
                <p className="text-xs text-[#1E3A22]/60">{isUk ? c.descUk : c.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUSTAINABILITY */}
      <section id="mission" className="py-16 px-4 bg-[#1E3A22] text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            🌍 {t("Our impact", "Наш вплив")}
          </h2>

          {/* Progress bars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { labelEn: "CO₂ saved per year", labelUk: "CO₂ збережено на рік", valueLabel: "12.4 t", pct: 83 },
              { labelEn: "Local ingredients", labelUk: "Локальні інгредієнти", valueLabel: "94%", pct: 94 },
              { labelEn: "Waste composted", labelUk: "Відходи у компост", valueLabel: "97%", pct: 97 },
            ].map((bar, i) => (
              <div key={i}>
                <div className="flex justify-between items-end mb-2">
                  <p className="text-sm font-semibold text-[#A8D5B5]">{isUk ? bar.labelUk : bar.labelEn}</p>
                  <span className="text-white font-bold text-lg">{bar.valueLabel}</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#A8D5B5] rounded-full transition-all duration-1000"
                    style={{ width: progressVisible ? `${bar.pct}%` : "0%" }}
                  />
                </div>
                <p className="text-xs text-white/40 mt-1 text-right">{bar.pct}% {t("of goal", "від цілі")}</p>
              </div>
            ))}
          </div>

          {/* What we don't use */}
          <div className="bg-white/5 rounded-2xl p-6 mb-10">
            <h3 className="font-bold text-[#A8D5B5] mb-4 text-center">
              {t("What we DON'T use", "Що ми НЕ використовуємо")}
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                t("Plastic packaging", "Пластикова упаковка"),
                t("Artificial dyes", "Штучні барвники"),
                t("Palm oil", "Пальмова олія"),
                t("GMO", "ГМО"),
                t("Antibiotics in products", "Антибіотики у продуктах"),
              ].map((item, i) => (
                <span key={i} className="bg-red-900/30 text-red-300 text-xs font-medium px-3 py-1.5 rounded-full border border-red-800/40">
                  ✕ {item}
                </span>
              ))}
            </div>
          </div>

          {/* Eco partnerships */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: "Zero Waste Ukraine", descEn: "Promoting zero-waste practices across food service.", descUk: "Просування практик нульових відходів у харчовій сфері." },
              { name: "Eco Lviv Initiative", descEn: "City-wide sustainability program for green businesses.", descUk: "Міська програма сталого розвитку для зеленого бізнесу." },
            ].map((p, i) => (
              <div key={i} className="bg-white/5 border border-[#A8D5B5]/20 rounded-xl p-5">
                <p className="font-bold text-[#A8D5B5] mb-1">🤝 {p.name}</p>
                <p className="text-xs text-white/60">{isUk ? p.descUk : p.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT / PHILOSOPHY */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1E3A22] mb-4">
                {t("Our story", "Наша історія")}
              </h2>
              <p className="text-[#1E3A22]/70 text-sm leading-relaxed mb-4">
                {t(
                  "GreenLeaf was born in 2019 from a simple belief: that plant-based food can be bold, satisfying, and deeply Ukrainian. Founders Olena and Dmytro opened our first café on Svobody Avenue with twelve dishes and a dream.",
                  "GreenLeaf народився у 2019 році з простої віри: рослинна їжа може бути яскравою, ситною та глибоко українською. Засновники Олена та Дмитро відкрили першу кав'ярню на проспекті Свободи з дванадцятьма стравами та мрією."
                )}
              </p>
              <p className="text-[#1E3A22]/70 text-sm leading-relaxed">
                {t(
                  "In 2021 we expanded to a second location and launched our farm partnership network. By 2024, our seasonal menu rotates every month, showcasing the best of Ukrainian soil.",
                  "У 2021 ми відкрили другий заклад і запустили мережу партнерських ферм. У 2024 наше сезонне меню оновлюється щомісяця, відображаючи найкраще з українських угідь."
                )}
              </p>
            </div>

            {/* Timeline */}
            <div>
              <div className="flex items-start gap-0">
                {[
                  { year: "2019", en: "First café opened on Svobody Ave", uk: "Перша кав'ярня на пр. Свободи" },
                  { year: "2021", en: "Second location + farm network", uk: "Другий заклад + мережа ферм" },
                  { year: "2024", en: "Monthly seasonal menu launched", uk: "Запуск щомісячного сезонного меню" },
                ].map((point, i, arr) => (
                  <div key={i} className="flex-1 relative">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-[#2D7A3A] shrink-0 z-10" />
                      {i < arr.length - 1 && <div className="flex-1 h-0.5 bg-[#A8D5B5]" />}
                    </div>
                    <div className="mt-2 pr-2">
                      <p className="font-bold text-[#2D7A3A] text-sm">{point.year}</p>
                      <p className="text-xs text-[#1E3A22]/60 leading-snug">{isUk ? point.uk : point.en}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chef quote */}
          <blockquote className="bg-[#FAFFF8] border-l-4 border-[#2D7A3A] rounded-r-xl p-6 mb-10 italic">
            <p className="text-[#1E3A22] text-base leading-relaxed font-serif">
              {t(
                '"Plant-based cooking is not a limitation — it is a liberation. When you remove the crutches, you discover how extraordinary vegetables truly are."',
                '"Рослинна кухня — це не обмеження, а звільнення. Коли прибираєш підпори, відкриваєш, наскільки дивовижними бувають овочі."'
              )}
            </p>
            <footer className="mt-3 text-sm font-semibold text-[#2D7A3A] not-italic">
              — {t("Chef Vasyl Kovalenko, Head of Kitchen", "Шеф-кухар Василь Коваленко")}
            </footer>
          </blockquote>

          {/* Team */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { emoji: "👩‍🌾", nameEn: "Olena Savchuk", nameUk: "Олена Савчук", roleEn: "Co-founder & CEO", roleUk: "Співзасновниця та CEO", bioEn: "Former nutritionist turned entrepreneur. Passionate about sustainable food systems.", bioUk: "Колишня нутриціологиня, яка стала підприємицею. Захоплена сталими харчовими системами." },
              { emoji: "👨‍🍳", nameEn: "Vasyl Kovalenko", nameUk: "Василь Коваленко", roleEn: "Head Chef", roleUk: "Шеф-кухар", bioEn: "Trained in Paris and Kyiv. Believes vegetables are the most versatile ingredient.", bioUk: "Навчався в Парижі та Києві. Вважає овочі найвершатнішим інгредієнтом." },
            ].map((member, i) => (
              <div key={i} className="bg-[#FAFFF8] rounded-2xl p-6 border border-[#A8D5B5]/40 flex gap-4">
                <span className="text-4xl shrink-0">{member.emoji}</span>
                <div>
                  <p className="font-bold text-[#1E3A22]">{isUk ? member.nameUk : member.nameEn}</p>
                  <p className="text-xs font-semibold text-[#2D7A3A] mb-2">{isUk ? member.roleUk : member.roleEn}</p>
                  <p className="text-xs text-[#1E3A22]/60">{isUk ? member.bioUk : member.bioEn}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-16 px-4 bg-[#A8D5B5]/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1E3A22] text-center mb-8">
            {t("What our guests say", "Що кажуть наші гості")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {REVIEWS.map(review => (
              <div key={review.id} className="bg-white rounded-2xl p-5 border border-[#A8D5B5]/30 flex flex-col gap-3">
                <div className="flex items-center gap-1">
                  {"★★★★★".split("").map((s, i) => (
                    <span key={i} className="text-amber-400 text-sm">{s}</span>
                  ))}
                </div>
                <p className="text-sm text-[#1E3A22]/80 leading-relaxed flex-1">
                  {isUk ? review.textUk : review.textEn}
                </p>
                <p className="text-xs font-semibold text-[#2D7A3A]">— {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#A8D5B5]/15 border-t border-[#A8D5B5]/40 py-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="font-bold text-[#2D7A3A] text-lg mb-2">🌱 GreenLeaf</p>
            <p className="text-xs text-[#1E3A22]/60 leading-relaxed">
              {t("Lviv, Svobody Ave 15", "Львів, пр. Свободи 15")}
            </p>
            <p className="text-xs text-[#1E3A22]/60 mt-1">
              {t("Mon–Sun: 8:00–22:00", "Пн–Нд: 8:00–22:00")}
            </p>
          </div>
          <div>
            <p className="font-semibold text-[#1E3A22] mb-2">{t("Follow us", "Ми в соцмережах")}</p>
            <div className="flex gap-4">
              {["Instagram", "Facebook", "TikTok"].map(s => (
                <span key={s} className="text-xs text-[#2D7A3A] font-medium hover:underline cursor-pointer">{s}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="font-semibold text-[#1E3A22] mb-2">{t("Allergy information", "Алергени")}</p>
            <p className="text-xs text-[#1E3A22]/60 leading-relaxed">
              {t(
                "We handle nuts, gluten, and soy in our kitchen. Please inform your server of any allergies.",
                "У нашій кухні використовуються горіхи, глютен та соя. Повідомте офіціанта про алергії."
              )}
            </p>
          </div>
        </div>
        <p className="text-center text-xs text-[#1E3A22]/30 mt-8">
          © 2025 GreenLeaf Vegan Café · {t("All rights reserved", "Всі права захищені")}
        </p>
      </footer>

      {/* BOOKING MODAL */}
      {bookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            {/* Modal header */}
            <div className="bg-[#2D7A3A] px-6 py-4 flex items-center justify-between">
              <div>
                <p className="font-bold text-white text-lg">{t("Reserve a table", "Зарезервувати столик")}</p>
                <p className="text-[#A8D5B5] text-xs">{t(`Step ${bookingStep} of 2`, `Крок ${bookingStep} з 2`)}</p>
              </div>
              <button onClick={() => setBookingOpen(false)} className="text-white/70 hover:text-white text-2xl leading-none">×</button>
            </div>

            <div className="px-6 py-6">
              {bookingStep === 1 ? (
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1E3A22] mb-1">{t("Full name", "Повне ім'я")}</label>
                    <input
                      type="text"
                      value={bookingData.name}
                      onChange={e => setBookingData(d => ({ ...d, name: e.target.value }))}
                      placeholder={t("Your name", "Ваше ім'я")}
                      className="w-full border border-[#A8D5B5] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#2D7A3A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1E3A22] mb-1">{t("Phone", "Телефон")}</label>
                    <input
                      type="tel"
                      value={bookingData.phone}
                      onChange={e => setBookingData(d => ({ ...d, phone: e.target.value }))}
                      placeholder="+380"
                      className="w-full border border-[#A8D5B5] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#2D7A3A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1E3A22] mb-1">{t("Party size", "Кількість гостей")}</label>
                    <select
                      value={bookingData.size}
                      onChange={e => setBookingData(d => ({ ...d, size: e.target.value }))}
                      className="w-full border border-[#A8D5B5] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#2D7A3A]"
                    >
                      {["1","2","3","4","5","6+"].map(n => <option key={n} value={n}>{n} {t("guests", "гостей")}</option>)}
                    </select>
                  </div>
                  <button
                    onClick={() => setBookingStep(2)}
                    className="w-full bg-[#2D7A3A] text-white font-semibold py-3 rounded-xl hover:bg-[#235f2d] transition-colors mt-2"
                  >
                    {t("Next →", "Далі →")}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1E3A22] mb-2">{t("Choose a date", "Оберіть дату")}</label>
                    <div className="flex gap-2">
                      {[0,1,2].map(offset => {
                        const d = new Date();
                        d.setDate(d.getDate() + offset + 1);
                        const label = d.toLocaleDateString(isUk ? "uk-UA" : "en-GB", { weekday: "short", day: "numeric", month: "short" });
                        const val = d.toISOString().slice(0,10);
                        return (
                          <button
                            key={val}
                            onClick={() => setBookingData(d2 => ({ ...d2, date: val }))}
                            className={`flex-1 text-center text-xs py-2.5 rounded-xl border transition-all ${bookingData.date === val ? "bg-[#2D7A3A] text-white border-[#2D7A3A]" : "border-[#A8D5B5] text-[#1E3A22] hover:bg-[#A8D5B5]/20"}`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1E3A22] mb-2">{t("Time slot", "Час")}</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["12:00","13:00","14:00","18:00","19:00","20:00"].map(slot => (
                        <button
                          key={slot}
                          onClick={() => setBookingData(d => ({ ...d, time: slot }))}
                          className={`py-2 text-sm rounded-xl border transition-all ${bookingData.time === slot ? "bg-[#2D7A3A] text-white border-[#2D7A3A]" : "border-[#A8D5B5] text-[#1E3A22] hover:bg-[#A8D5B5]/20"}`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1E3A22] mb-1">{t("Dietary notes", "Дієтичні побажання")}</label>
                    <textarea
                      value={bookingData.notes}
                      onChange={e => setBookingData(d => ({ ...d, notes: e.target.value }))}
                      placeholder={t("Allergies, preferences...", "Алергії, побажання...")}
                      rows={2}
                      className="w-full border border-[#A8D5B5] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#2D7A3A] resize-none"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setBookingStep(1)}
                      className="flex-1 border border-[#A8D5B5] text-[#2D7A3A] font-semibold py-3 rounded-xl hover:bg-[#A8D5B5]/20 transition-colors"
                    >
                      ← {t("Back", "Назад")}
                    </button>
                    <button
                      onClick={() => setBookingOpen(false)}
                      className="flex-1 bg-[#2D7A3A] text-white font-semibold py-3 rounded-xl hover:bg-[#235f2d] transition-colors"
                    >
                      {t("Confirm", "Підтвердити")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
