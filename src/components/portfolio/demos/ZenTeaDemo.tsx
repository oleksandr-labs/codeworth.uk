"use client";

import { useState } from "react";

export function ZenTeaDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [activeMenuTab, setActiveMenuTab] = useState("green");
  const [activeLibrarySearch, setActiveLibrarySearch] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [activeCeremony, setActiveCeremony] = useState<number | null>(null);
  const [bookingData, setBookingData] = useState({
    ceremony: "",
    date: "",
    guests: "2",
    name: "",
    phone: "",
    requests: "",
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // ── Menu Data ──────────────────────────────────────────────────────────────
  const menuTabs = [
    { id: "green",  label: isUk ? "Зелений" : "Green" },
    { id: "white",  label: isUk ? "Білий"   : "White" },
    { id: "oolong", label: isUk ? "Улун"    : "Oolong" },
    { id: "black",  label: isUk ? "Чорний"  : "Black" },
    { id: "puerh",  label: isUk ? "Пуер"    : "Pu-erh" },
    { id: "matcha", label: "Matcha" },
    { id: "blends", label: isUk ? "Купажі"  : "Blends" },
  ];

  const menuItems: Record<string, { name: string; region: string; notes: string; temp: string; time: string; price: string }[]> = {
    green: [
      { name: "Dragon Well", region: isUk ? "Чжецзян, Китай" : "Zhejiang, China", notes: isUk ? "Каштан, свіжа трава, солодкий фінал" : "Chestnut, fresh grass, sweet finish", temp: "75°C", time: "2 min", price: "₴120" },
      { name: "Gyokuro",     region: isUk ? "Уджі, Японія"   : "Uji, Japan",       notes: isUk ? "Водорості, умамі, вершковий" : "Seaweed, umami, creamy", temp: "55°C", time: "2 min", price: "₴160" },
      { name: "Bi Luo Chun", region: isUk ? "Цзянсу, Китай"  : "Jiangsu, China",  notes: isUk ? "Фруктовий, квітковий, ніжний" : "Fruity, floral, delicate", temp: "70°C", time: "2 min", price: "₴140" },
    ],
    white: [
      { name: "Silver Needle",  region: isUk ? "Фуцзянь, Китай" : "Fujian, China", notes: isUk ? "Медовий, дині, легкий" : "Honey, melon, light", temp: "75°C", time: "3 min", price: "₴150" },
      { name: "White Peony",    region: isUk ? "Фуцзянь, Китай" : "Fujian, China", notes: isUk ? "Квіти, персик, свіжий" : "Flowers, peach, fresh",    temp: "80°C", time: "3 min", price: "₴130" },
    ],
    oolong: [
      { name: "Da Hong Pao", region: isUk ? "Уї, Китай"    : "Wuyi, China",    notes: isUk ? "Смажений, мінеральний, тривалий фінал" : "Roasted, mineral, long finish", temp: "95°C", time: "1 min", price: "₴150" },
      { name: "Tie Guan Yin", region: isUk ? "Аньсі, Китай" : "Anxi, China",   notes: isUk ? "Орхідея, масло, чистий" : "Orchid, butter, clean",   temp: "90°C", time: "1 min", price: "₴130" },
    ],
    black: [
      { name: "Darjeeling FTGFOP1", region: isUk ? "Дарджилінг, Індія" : "Darjeeling, India", notes: isUk ? "Мускат, квіти, медовий" : "Muscatel, floral, honey", temp: "90°C", time: "3 min", price: "₴110" },
      { name: "Assam BOP",          region: isUk ? "Ассам, Індія"       : "Assam, India",       notes: isUk ? "Солодовий, міцний, мідний" : "Malty, bold, coppery",   temp: "95°C", time: "4 min", price: "₴90"  },
    ],
    puerh: [
      { name: "Menghai Ripe 2018",  region: isUk ? "Юньнань, Китай"  : "Yunnan, China",  notes: isUk ? "Земляний, деревний, темний" : "Earthy, woody, dark",    temp: "100°C", time: "2 min", price: "₴160" },
      { name: "Raw Puerh Cake 2020", region: isUk ? "Юньнань, Китай" : "Yunnan, China", notes: isUk ? "Терпкий, трав'яний, комплексний" : "Astringent, herbal, complex", temp: "95°C", time: "30 sec", price: "₴170" },
    ],
    matcha: [
      { name: "Ceremonial Grade",      region: isUk ? "Уджі, Японія" : "Uji, Japan", notes: isUk ? "Насичений умамі, солодкий, оксамитовий" : "Rich umami, sweet, velvety",        temp: "75°C", time: "—", price: "₴180" },
      { name: "Culinary Grade Latte",  region: isUk ? "Нішіо, Японія" : "Nishio, Japan", notes: isUk ? "Трав'яний, терпкий, добре з молоком" : "Grassy, robust, great with milk", temp: "70°C", time: "—", price: "₴140" },
    ],
    blends: [
      { name: "Zen Blend",    region: isUk ? "Авторський купаж" : "House Blend", notes: isUk ? "Зелений + жасмин + лаванда" : "Green + jasmine + lavender",    temp: "75°C", time: "2 min", price: "₴110" },
      { name: "Forest Rain",  region: isUk ? "Авторський купаж" : "House Blend", notes: isUk ? "Улун + смородина + м'ята" : "Oolong + blackcurrant + mint",    temp: "85°C", time: "2 min", price: "₴120" },
      { name: "Golden Hour",  region: isUk ? "Авторський купаж" : "House Blend", notes: isUk ? "Чорний + кориця + кардамон" : "Black + cinnamon + cardamom",   temp: "95°C", time: "3 min", price: "₴115" },
    ],
  };

  // ── Library Data ───────────────────────────────────────────────────────────
  const libraryTeas = [
    {
      name: "Dragon Well (Longjing)",
      region: isUk ? "Чжецзян, Китай" : "Zhejiang, China",
      altitude: "500–800 m",
      notes: isUk ? "Каштан, свіжа трава, солодкий фінал" : "Chestnut, fresh grass, sweet finish",
      temp: "75°C",
      steep: "2 min",
      desc: isUk
        ? "Один з найвідоміших зелених чаїв Китаю. Листя вплощено вручну на сковороді, що надає йому характерної форми та горіхового аромату."
        : "One of China's most celebrated green teas. Leaves are pan-fired by hand, giving them their signature flat shape and nutty aroma.",
    },
    {
      name: "Gyokuro",
      region: isUk ? "Уджі, Японія" : "Uji, Japan",
      altitude: "200–400 m",
      notes: isUk ? "Водорості, умамі, вершковий" : "Seaweed, umami, creamy",
      temp: "55°C",
      steep: "2 min",
      desc: isUk
        ? "Найпремієрніший японський зелений чай. Затінюється за 3 тижні до збору, що збільшує вміст L-теаніну та хлорофілу."
        : "Japan's most premium green tea. Shaded for 3 weeks before harvest, dramatically increasing L-theanine and chlorophyll content.",
    },
    {
      name: "Silver Needle (Baihao Yinzhen)",
      region: isUk ? "Фуцзянь, Китай" : "Fujian, China",
      altitude: "600–1200 m",
      notes: isUk ? "Медовий, дині, легкий" : "Honey, melon, light",
      temp: "75°C",
      steep: "3 min",
      desc: isUk
        ? "Виключно з бруньок першого збору. Один з найделікатніших білих чаїв зі слабкою обробкою та природним сушінням."
        : "Made exclusively from first-harvest buds. One of the most delicate white teas with minimal processing and natural sun drying.",
    },
    {
      name: "Da Hong Pao",
      region: isUk ? "Гори Уї, Китай" : "Wuyi Mountains, China",
      altitude: "300–600 m",
      notes: isUk ? "Смажений, мінеральний, тривалий фінал" : "Roasted, mineral, long finish",
      temp: "95°C",
      steep: "1 min",
      desc: isUk
        ? "Легендарний улун з гір Уї. Скелясте довкілля надає характерний мінеральний смак. Можна заварювати до 8 разів."
        : "Legendary oolong from Wuyi Mountains. Rocky terroir imparts distinctive mineral character. Can be steeped up to 8 times.",
    },
    {
      name: "Darjeeling FTGFOP1",
      region: isUk ? "Дарджилінг, Індія" : "Darjeeling, India",
      altitude: "1200–2500 m",
      notes: isUk ? "Мускат, квіти, медовий" : "Muscatel, floral, honey",
      temp: "90°C",
      steep: "3 min",
      desc: isUk
        ? "'Шампанське серед чаїв.' Перший збір (перший флаш) має виняткову делікатність. FTGFOP1 — вищий клас сортування."
        : "'The champagne of teas.' First flush (first harvest) has exceptional delicacy. FTGFOP1 is the highest grading classification.",
    },
    {
      name: "Ceremonial Matcha",
      region: isUk ? "Уджі, Японія" : "Uji, Japan",
      altitude: "100–300 m",
      notes: isUk ? "Насичений умамі, солодкий, оксамитовий" : "Rich umami, sweet, velvety",
      temp: "75°C",
      steep: isUk ? "Збивати 30 сек" : "Whisk 30 sec",
      desc: isUk
        ? "Найвищий сорт матча для традиційної чайної церемонії. Яскравий зелений колір і шовковиста текстура. Збивається бамбуковим часеном."
        : "Highest grade matcha for traditional tea ceremony. Vibrant green color and silky texture. Whisked with a bamboo chasen.",
    },
    {
      name: "Tie Guan Yin",
      region: isUk ? "Аньсі, Китай" : "Anxi, China",
      altitude: "500–1000 m",
      notes: isUk ? "Орхідея, масло, чистий" : "Orchid, butter, clean",
      temp: "90°C",
      steep: "1 min",
      desc: isUk
        ? "Назва означає 'Залізна Богиня Милосердя'. Легкий улун зі складним квітковим ароматом та маслянистою текстурою."
        : "Named 'Iron Goddess of Mercy'. A light oolong with complex floral fragrance and a buttery, smooth texture.",
    },
    {
      name: "Menghai Ripe Puerh 2018",
      region: isUk ? "Юньнань, Китай" : "Yunnan, China",
      altitude: "1200–1800 m",
      notes: isUk ? "Земляний, деревний, темний" : "Earthy, woody, dark",
      temp: "100°C",
      steep: "2 min",
      desc: isUk
        ? "Прискорено ферментований за технологією водейського. Землистий, деревний характер з роками лише покращується."
        : "Wet-pile fermented for accelerated aging. Earthy, woody character that only improves with years. Rich and grounding.",
    },
  ];

  // ── Ceremony Data ──────────────────────────────────────────────────────────
  const ceremonies = [
    {
      name: "Gongfu Cha",
      duration: "60 min",
      guests: isUk ? "2–4 особи" : "2–4 people",
      price: isUk ? "₴480/особа" : "₴480/person",
      desc: isUk
        ? "Традиційна китайська чайна церемонія Гунфу. Майстер проводить вас через мистецтво багаторазового заварювання — кожна чаша відкриває новий шар смаку."
        : "Traditional Chinese Gongfu tea ceremony. A tea master guides you through the art of multiple short infusions — each cup reveals a new layer of flavor.",
      steps: isUk
        ? ["Підготовка посуду та прогрів чайника", "Перший злив — пробудження листя", "Серія заварювань (5–8 проливів)", "Дегустація та обговорення чаю", "Завершальна медитація з ароматом"]
        : ["Preparation of vessels and warming the teapot", "First rinse — awakening the leaves", "Series of infusions (5–8 steeps)", "Tasting and tea discussion", "Closing meditation with aroma"],
    },
    {
      name: isUk ? "Японська Матча Церемонія" : "Japanese Matcha Ceremony",
      duration: "75 min",
      guests: isUk ? "2–6 осіб" : "2–6 people",
      price: isUk ? "₴560/особа" : "₴560/person",
      desc: isUk
        ? "Автентична японська чайна церемонія Чадо ('Шлях чаю'). Медитативний ритуал приготування та вживання матча — символ гармонії, поваги, чистоти та спокою."
        : "Authentic Japanese Chado ('The Way of Tea'). A meditative ritual of preparing and consuming matcha — a symbol of harmony, respect, purity and tranquility.",
      steps: isUk
        ? ["Вхід до чайної кімнати та вітання", "Споглядання чайного посуду (тяван, тясен)", "Приготування кожної чашки вручну", "Тиха дегустація з традиційними солодощами", "Прибирання та прощання за ритуалом"]
        : ["Entering the tea room and greeting", "Contemplating the tea vessels (chawan, chasen)", "Individual preparation of each bowl", "Silent tasting with traditional sweets", "Ritual cleaning and farewell"],
    },
    {
      name: isUk ? "Авторська Церемонія" : "Author's Ceremony",
      duration: "90 min",
      guests: isUk ? "2–8 осіб" : "2–8 people",
      price: isUk ? "₴640/особа" : "₴640/person",
      desc: isUk
        ? "Унікальна церемонія від засновника ZenTea. Поєднує китайські та японські традиції, сезонні чаї та авторські купажі. Кожна церемонія — окремий твір."
        : "Unique ceremony by ZenTea's founder. A blend of Chinese and Japanese traditions, seasonal teas and house blends. Each ceremony is a singular work of art.",
      steps: isUk
        ? ["Особиста зустріч та знайомство з майстром", "Розповідь про обрані чаї та їхній шлях", "Гунфу-заварювання трьох різних чаїв", "Авторський купаж як кульмінація", "Обговорення вражень та закриття"]
        : ["Personal welcome and meeting the master", "Story of the chosen teas and their journey", "Gongfu brewing of three different teas", "House blend as the ceremony's highlight", "Sharing impressions and closing ritual"],
    },
  ];

  // ── Shop Data ──────────────────────────────────────────────────────────────
  const shopProducts = [
    {
      name: "Dragon Well Longjing",
      desc: isUk ? "Зелений чай, ранній збір 2025" : "Green tea, early harvest 2025",
      weights: ["25g", "50g", "100g"],
      prices: ["₴280", "₴520", "₴980"],
    },
    {
      name: "Gyokuro Premium",
      desc: isUk ? "Затінений японський зелений" : "Shaded Japanese green",
      weights: ["20g", "40g"],
      prices: ["₴320", "₴600"],
    },
    {
      name: "Da Hong Pao",
      desc: isUk ? "Скельний улун, гори Уї" : "Rock oolong, Wuyi Mountains",
      weights: ["25g", "50g", "100g"],
      prices: ["₴350", "₴660", "₴1280"],
    },
    {
      name: isUk ? "Матча Церемоніальна" : "Ceremonial Matcha",
      desc: isUk ? "Клас А, Уджі, Японія" : "Grade A, Uji, Japan",
      weights: ["30g", "50g"],
      prices: ["₴420", "₴680"],
    },
    {
      name: isUk ? "Подарунковий набір «Чотири сезони»" : "Gift Set — Four Seasons",
      desc: isUk ? "4 чаї × 25г + церемоніальний посуд" : "4 teas × 25g + ceremonial ware",
      weights: [isUk ? "Набір" : "Set"],
      prices: ["₴1480"],
    },
    {
      name: isUk ? "Подарунковий набір «Знавець»" : "Gift Set — Connoisseur",
      desc: isUk ? "6 преміум чаїв × 20г у дерев'яній скриньці" : "6 premium teas × 20g in wooden box",
      weights: [isUk ? "Набір" : "Set"],
      prices: ["₴2200"],
    },
  ];

  const filteredLibrary = libraryTeas.filter(
    (t) =>
      t.name.toLowerCase().includes(activeLibrarySearch.toLowerCase()) ||
      t.region.toLowerCase().includes(activeLibrarySearch.toLowerCase()) ||
      t.notes.toLowerCase().includes(activeLibrarySearch.toLowerCase())
  );

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F3EE] font-sans text-[#1A3C2C]">

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center bg-[#F7F3EE]">
        {/* decorative circles */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full border border-[#1A3C2C]/10 pointer-events-none" />
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full border border-[#1A3C2C]/10 pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* open badge */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A3C2C]/8 text-[#1A3C2C] text-xs tracking-widest uppercase mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4A7C5F] inline-block" />
            {isUk ? "Відкрито сьогодні: 10:00–22:00" : "Open today: 10:00–22:00"}
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight tracking-tight text-[#1A3C2C] mb-6">
            {isUk ? "Чай — це спосіб уповільнитись" : "Tea Is a Way to Slow Down"}
          </h1>

          <p className="text-base sm:text-lg text-[#1A3C2C]/60 font-light tracking-wide mb-12">
            {isUk
              ? "Розсипний чай · Церемонії · Чайна школа"
              : "Loose Leaf Tea · Ceremonies · Tea School"}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#menu"
              className="px-8 py-3.5 bg-[#1A3C2C] text-[#F7F3EE] text-sm tracking-widest uppercase rounded-full hover:bg-[#0f2518] transition-colors"
            >
              {isUk ? "Переглянути меню" : "View Menu"}
            </a>
            <a
              href="#booking"
              className="px-8 py-3.5 border border-[#1A3C2C]/30 text-[#1A3C2C] text-sm tracking-widest uppercase rounded-full hover:border-[#1A3C2C] hover:bg-[#1A3C2C]/5 transition-colors"
            >
              {isUk ? "Замовити церемонію" : "Book a Ceremony"}
            </a>
          </div>
        </div>

        {/* bottom leaf divider */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#1A3C2C]/30">
          <span className="text-xl">☙</span>
          <div className="w-px h-8 bg-[#1A3C2C]/20" />
        </div>
      </section>

      {/* ── TEA MENU ─────────────────────────────────────────────────────────── */}
      <section id="menu" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#1A3C2C]/40 text-center mb-3">
            {isUk ? "Меню" : "Menu"}
          </p>
          <h2 className="text-3xl sm:text-4xl font-light text-center text-[#1A3C2C] mb-12">
            {isUk ? "Чайна карта" : "Tea Menu"}
          </h2>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {menuTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveMenuTab(tab.id)}
                className={`px-5 py-2 rounded-full text-sm tracking-wide transition-colors ${
                  activeMenuTab === tab.id
                    ? "bg-[#1A3C2C] text-[#F7F3EE]"
                    : "bg-[#F7F3EE] text-[#1A3C2C]/70 hover:bg-[#E5E7EB]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tea cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {(menuItems[activeMenuTab] || []).map((tea) => (
              <div
                key={tea.name}
                className="bg-[#F7F3EE] rounded-2xl p-6 flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-medium text-[#1A3C2C] leading-snug">{tea.name}</h3>
                    <p className="text-xs text-[#1A3C2C]/50 mt-0.5">{tea.region}</p>
                  </div>
                  <span className="shrink-0 text-[#1A3C2C] font-medium text-sm">{tea.price}</span>
                </div>
                <p className="text-sm text-[#1A3C2C]/70 italic">{tea.notes}</p>
                <div className="flex gap-4 text-xs text-[#1A3C2C]/50 mt-auto pt-2 border-t border-[#1A3C2C]/10">
                  <span>{tea.temp}</span>
                  <span>{tea.time}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-[#1A3C2C]/50 mt-10">
            {isUk
              ? "До чаю подаємо японські вагасі та традиційне печиво — дізнайтесь у зали."
              : "Snacks available: Japanese wagashi and traditional tea cookies — ask your host."}
          </p>
        </div>
      </section>

      {/* ── TEA LIBRARY ──────────────────────────────────────────────────────── */}
      <section id="library" className="py-24 px-6 bg-[#F7F3EE]">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#1A3C2C]/40 text-center mb-3">
            {isUk ? "Бібліотека" : "Library"}
          </p>
          <h2 className="text-3xl sm:text-4xl font-light text-center text-[#1A3C2C] mb-4">
            {isUk ? "Чайна бібліотека" : "Tea Library"}
          </h2>
          <p className="text-center text-[#1A3C2C]/50 text-sm mb-10">
            {isUk
              ? "Дізнайтесь більше про кожен сорт: регіон, висота, смак, температура."
              : "Learn about each variety: region, altitude, tasting notes, and brewing guide."}
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto mb-12">
            <input
              type="text"
              value={activeLibrarySearch}
              onChange={(e) => setActiveLibrarySearch(e.target.value)}
              placeholder={isUk ? "Пошук чаю..." : "Search teas..."}
              className="w-full bg-white border border-[#E5E7EB] rounded-full px-5 py-3 pr-10 text-sm text-[#1A3C2C] placeholder-[#1A3C2C]/30 outline-none focus:border-[#1A3C2C]/40"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1A3C2C]/30 text-base">⌕</span>
          </div>

          {/* Library cards */}
          <div className="grid sm:grid-cols-2 gap-5">
            {filteredLibrary.length === 0 ? (
              <p className="col-span-2 text-center text-[#1A3C2C]/40 py-12">
                {isUk ? "Нічого не знайдено" : "No results found"}
              </p>
            ) : (
              filteredLibrary.map((tea) => (
                <div
                  key={tea.name}
                  className="bg-white rounded-2xl p-6 flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium text-[#1A3C2C]">{tea.name}</h3>
                    <span className="shrink-0 text-xs text-[#1A3C2C]/40 bg-[#F7F3EE] px-2.5 py-1 rounded-full">
                      {tea.altitude}
                    </span>
                  </div>
                  <p className="text-xs text-[#1A3C2C]/50">{tea.region}</p>
                  <p className="text-sm text-[#1A3C2C]/70 italic">{tea.notes}</p>
                  <p className="text-sm text-[#1A3C2C]/60 leading-relaxed">{tea.desc}</p>
                  <div className="flex gap-4 text-xs text-[#1A3C2C]/50 mt-auto pt-3 border-t border-[#E5E7EB]">
                    <span>{tea.temp}</span>
                    <span>{tea.steep}</span>
                    <a
                      href="#shop"
                      className="ml-auto text-[#1A3C2C] underline underline-offset-2 hover:opacity-70 transition-opacity"
                    >
                      {isUk ? "Замовити в крамниці" : "Order in shop"}
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── TEA CEREMONIES ───────────────────────────────────────────────────── */}
      <section id="ceremonies" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#1A3C2C]/40 text-center mb-3">
            {isUk ? "Церемонії" : "Ceremonies"}
          </p>
          <h2 className="text-3xl sm:text-4xl font-light text-center text-[#1A3C2C] mb-4">
            {isUk ? "Чайні церемонії" : "Tea Ceremonies"}
          </h2>
          <p className="text-center text-[#1A3C2C]/50 text-sm mb-14">
            {isUk
              ? "Кожна церемонія — неповторний ритуал спокою та присутності."
              : "Each ceremony is a unique ritual of stillness and presence."}
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {ceremonies.map((c, idx) => (
              <div
                key={c.name}
                className="bg-[#F7F3EE] rounded-2xl p-6 flex flex-col gap-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setActiveCeremony(activeCeremony === idx ? null : idx)}
              >
                <div>
                  <h3 className="font-medium text-[#1A3C2C] text-lg leading-snug mb-1">{c.name}</h3>
                  <div className="flex flex-wrap gap-3 text-xs text-[#1A3C2C]/50">
                    <span>⏱ {c.duration}</span>
                    <span>👤 {c.guests}</span>
                    <span className="font-semibold text-[#1A3C2C]">{c.price}</span>
                  </div>
                </div>
                <p className="text-sm text-[#1A3C2C]/70 leading-relaxed">{c.desc}</p>

                {/* Steps (expanded) */}
                {activeCeremony === idx && (
                  <ol className="space-y-2 mt-1">
                    {c.steps.map((step, si) => (
                      <li key={si} className="flex gap-3 text-sm text-[#1A3C2C]/70">
                        <span className="shrink-0 w-5 h-5 rounded-full bg-[#1A3C2C]/10 text-[#1A3C2C] text-xs flex items-center justify-center font-medium">
                          {si + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                )}

                <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#1A3C2C]/10">
                  <span className="text-xs text-[#1A3C2C]/40">
                    {activeCeremony === idx
                      ? (isUk ? "Сховати кроки ▲" : "Hide steps ▲")
                      : (isUk ? "Показати кроки ▼" : "Show steps ▼")}
                  </span>
                  <a
                    href="#booking"
                    onClick={(e) => e.stopPropagation()}
                    className="px-4 py-2 bg-[#1A3C2C] text-[#F7F3EE] text-xs tracking-widest uppercase rounded-full hover:bg-[#0f2518] transition-colors"
                  >
                    {isUk ? "Забронювати" : "Book Now"}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEA SHOP ─────────────────────────────────────────────────────────── */}
      <section id="shop" className="py-24 px-6 bg-[#F7F3EE]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[#1A3C2C]/40 mb-2">
                {isUk ? "Крамниця" : "Shop"}
              </p>
              <h2 className="text-3xl sm:text-4xl font-light text-[#1A3C2C]">
                {isUk ? "Чайна крамниця" : "Tea Shop"}
              </h2>
            </div>
            {cartCount > 0 && (
              <div className="flex items-center gap-2 bg-[#1A3C2C] text-[#F7F3EE] px-4 py-2 rounded-full text-sm">
                <span>{isUk ? "Кошик" : "Cart"}</span>
                <span className="w-5 h-5 rounded-full bg-[#F7F3EE] text-[#1A3C2C] text-xs font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              </div>
            )}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {shopProducts.map((product) => (
              <div
                key={product.name}
                className="bg-white rounded-2xl p-6 flex flex-col gap-4"
              >
                {/* product icon placeholder */}
                <div className="w-full aspect-square max-h-32 bg-[#F7F3EE] rounded-xl flex items-center justify-center text-4xl">
                  🍵
                </div>
                <div>
                  <h3 className="font-medium text-[#1A3C2C] leading-snug">{product.name}</h3>
                  <p className="text-xs text-[#1A3C2C]/50 mt-1">{product.desc}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {product.weights.map((w, wi) => (
                    <div
                      key={w}
                      className="flex items-center gap-1.5 bg-[#F7F3EE] rounded-full px-3 py-1.5 text-xs text-[#1A3C2C]/70"
                    >
                      <span>{w}</span>
                      <span className="font-medium text-[#1A3C2C]">{product.prices[wi]}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setCartCount((n) => n + 1)}
                  className="w-full py-2.5 bg-[#1A3C2C] text-[#F7F3EE] text-xs tracking-widest uppercase rounded-full hover:bg-[#0f2518] transition-colors"
                >
                  {isUk ? "Додати до кошика" : "Add to Cart"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRIVATE TEA ROOM ─────────────────────────────────────────────────── */}
      <section id="private" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#1A3C2C]/40 text-center mb-3">
            {isUk ? "Приватна кімната" : "Private Room"}
          </p>
          <h2 className="text-3xl sm:text-4xl font-light text-center text-[#1A3C2C] mb-4">
            {isUk ? "Приватна чайна кімната" : "Private Tea Room"}
          </h2>
          <p className="text-center text-[#1A3C2C]/50 text-sm mb-14">
            {isUk
              ? "Ідеально для ділових зустрічей, побачень та річниць."
              : "Perfect for business meetings, dates and anniversaries."}
          </p>

          <div className="bg-[#F7F3EE] rounded-3xl p-8 sm:p-12 grid md:grid-cols-2 gap-10">
            {/* Details */}
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-medium text-[#1A3C2C] mb-4">
                  {isUk ? "Умови оренди" : "Room Details"}
                </h3>
                <ul className="space-y-3">
                  {[
                    { label: isUk ? "Кількість гостей" : "Guests", value: isUk ? "2–6 осіб" : "2–6 people" },
                    { label: isUk ? "Тривалість" : "Duration", value: isUk ? "1.5–3 години" : "1.5–3 hours" },
                    { label: isUk ? "Ціна" : "Price", value: isUk ? "від ₴800/1.5 год" : "from ₴800 / 1.5 hr" },
                    { label: isUk ? "Депозит" : "Deposit", value: isUk ? "₴300 при бронюванні" : "₴300 on booking" },
                    { label: isUk ? "Входить" : "Included", value: isUk ? "Чайний сет, посуд, приватна атмосфера" : "Tea set, ceramics, private atmosphere" },
                  ].map((row) => (
                    <li key={row.label} className="flex justify-between gap-4 text-sm">
                      <span className="text-[#1A3C2C]/50">{row.label}</span>
                      <span className="text-[#1A3C2C] font-medium text-right">{row.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <blockquote className="border-l-2 border-[#1A3C2C]/20 pl-4 text-sm text-[#1A3C2C]/60 italic leading-relaxed">
                {isUk
                  ? "Простір поза часом. Тиша, тепло та аромат чаю — найкращий фон для важливих розмов."
                  : "A space outside of time. Silence, warmth, and the scent of tea — the finest setting for meaningful conversation."}
              </blockquote>
            </div>

            {/* Booking CTA */}
            <div className="flex flex-col justify-between gap-6">
              <div>
                <h3 className="text-lg font-medium text-[#1A3C2C] mb-4">
                  {isUk ? "Чому обирають нас" : "Why Choose Us"}
                </h3>
                <ul className="space-y-2.5">
                  {(isUk
                    ? ["Окремий вхід та повна приватність", "Майстер чаю за запитом", "Авторський чайний сет до кожного бронювання", "Можливість принести торт або декор", "Безкоштовне паркування"]
                    : ["Separate entrance, full privacy", "Tea master available on request", "Curated tea set with every booking", "Welcome to bring cake or decoration", "Free parking"]
                  ).map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm text-[#1A3C2C]/70">
                      <span className="shrink-0 text-[#4A7C5F]">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href="#booking"
                className="block text-center py-3.5 bg-[#1A3C2C] text-[#F7F3EE] text-sm tracking-widest uppercase rounded-full hover:bg-[#0f2518] transition-colors"
              >
                {isUk ? "Забронювати кімнату" : "Reserve the Room"}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOKING FORM ─────────────────────────────────────────────────────── */}
      <section id="booking" className="py-24 px-6 bg-[#F7F3EE]">
        <div className="max-w-xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#1A3C2C]/40 text-center mb-3">
            {isUk ? "Бронювання" : "Booking"}
          </p>
          <h2 className="text-3xl sm:text-4xl font-light text-center text-[#1A3C2C] mb-4">
            {isUk ? "Забронювати церемонію" : "Book a Ceremony"}
          </h2>
          <p className="text-center text-[#1A3C2C]/50 text-sm mb-12">
            {isUk
              ? "Ми зв'яжемось із вами впродовж 2 годин для підтвердження."
              : "We will contact you within 2 hours to confirm your booking."}
          </p>

          {bookingSubmitted ? (
            <div className="bg-white rounded-3xl p-10 text-center">
              <div className="text-5xl mb-4">🍃</div>
              <h3 className="text-xl font-light text-[#1A3C2C] mb-2">
                {isUk ? "Дякуємо за бронювання!" : "Thank you for your booking!"}
              </h3>
              <p className="text-sm text-[#1A3C2C]/50">
                {isUk
                  ? "Ми зв'яжемось із вами найближчим часом."
                  : "We will be in touch with you shortly."}
              </p>
              <button
                onClick={() => { setBookingSubmitted(false); setBookingData({ ceremony: "", date: "", guests: "2", name: "", phone: "", requests: "" }); }}
                className="mt-6 text-xs tracking-widest uppercase text-[#1A3C2C]/50 underline underline-offset-2 hover:text-[#1A3C2C] transition-colors"
              >
                {isUk ? "Нове бронювання" : "New Booking"}
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleBookingSubmit}
              className="bg-white rounded-3xl p-8 sm:p-10 flex flex-col gap-5"
            >
              {/* Ceremony type */}
              <div>
                <label className="block text-xs tracking-widest uppercase text-[#1A3C2C]/50 mb-2">
                  {isUk ? "Тип церемонії" : "Ceremony Type"}
                </label>
                <select
                  value={bookingData.ceremony}
                  onChange={(e) => setBookingData({ ...bookingData, ceremony: e.target.value })}
                  required
                  className="w-full bg-[#F7F3EE] border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm text-[#1A3C2C] outline-none focus:border-[#1A3C2C]/40"
                >
                  <option value="">{isUk ? "Оберіть церемонію" : "Select ceremony"}</option>
                  {ceremonies.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name} — {c.price}
                    </option>
                  ))}
                  <option value="private">{isUk ? "Приватна кімната" : "Private Room"}</option>
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs tracking-widest uppercase text-[#1A3C2C]/50 mb-2">
                  {isUk ? "Дата" : "Date"}
                </label>
                <input
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                  required
                  className="w-full bg-[#F7F3EE] border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm text-[#1A3C2C] outline-none focus:border-[#1A3C2C]/40"
                />
              </div>

              {/* Guests */}
              <div>
                <label className="block text-xs tracking-widest uppercase text-[#1A3C2C]/50 mb-2">
                  {isUk ? "Кількість гостей" : "Number of Guests"}
                </label>
                <select
                  value={bookingData.guests}
                  onChange={(e) => setBookingData({ ...bookingData, guests: e.target.value })}
                  className="w-full bg-[#F7F3EE] border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm text-[#1A3C2C] outline-none focus:border-[#1A3C2C]/40"
                >
                  {["1", "2", "3", "4", "5", "6", "7", "8"].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs tracking-widest uppercase text-[#1A3C2C]/50 mb-2">
                  {isUk ? "Ваше ім'я" : "Your Name"}
                </label>
                <input
                  type="text"
                  value={bookingData.name}
                  onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                  required
                  placeholder={isUk ? "Ім'я та прізвище" : "Full name"}
                  className="w-full bg-[#F7F3EE] border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm text-[#1A3C2C] placeholder-[#1A3C2C]/30 outline-none focus:border-[#1A3C2C]/40"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs tracking-widest uppercase text-[#1A3C2C]/50 mb-2">
                  {isUk ? "Телефон" : "Phone"}
                </label>
                <input
                  type="tel"
                  value={bookingData.phone}
                  onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                  required
                  placeholder="+380 XX XXX XX XX"
                  className="w-full bg-[#F7F3EE] border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm text-[#1A3C2C] placeholder-[#1A3C2C]/30 outline-none focus:border-[#1A3C2C]/40"
                />
              </div>

              {/* Special requests */}
              <div>
                <label className="block text-xs tracking-widest uppercase text-[#1A3C2C]/50 mb-2">
                  {isUk ? "Побажання" : "Special Requests"}
                </label>
                <textarea
                  value={bookingData.requests}
                  onChange={(e) => setBookingData({ ...bookingData, requests: e.target.value })}
                  rows={3}
                  placeholder={isUk ? "Алергії, побажання до чаю, привід..." : "Allergies, tea preferences, occasion..."}
                  className="w-full bg-[#F7F3EE] border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm text-[#1A3C2C] placeholder-[#1A3C2C]/30 outline-none focus:border-[#1A3C2C]/40 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#1A3C2C] text-[#F7F3EE] text-sm tracking-widest uppercase rounded-full hover:bg-[#0f2518] transition-colors mt-2"
              >
                {isUk ? "Підтвердити бронювання" : "Confirm Booking"}
              </button>

              <p className="text-center text-xs text-[#1A3C2C]/40">
                {isUk
                  ? "Депозит ₴300 сплачується після підтвердження."
                  : "A ₴300 deposit is collected upon confirmation."}
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer className="bg-[#1A3C2C] text-[#F7F3EE]/70 py-16 px-6">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-[#F7F3EE] text-xl font-light tracking-widest">ZenTea</h3>
              <p className="text-xs tracking-[0.2em] text-[#F7F3EE]/40 mt-1">
                {isUk ? "Спеціалізований чайний дім" : "Specialty Tea House"}
              </p>
            </div>
            <p className="text-sm leading-relaxed">
              {isUk
                ? "Місце, де час уповільнюється, а кожна чашка — окрема подорож."
                : "A place where time slows down and every cup is a journey."}
            </p>
          </div>

          {/* Hours & Address */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[#F7F3EE] text-xs tracking-widest uppercase mb-1">
              {isUk ? "Контакти" : "Contact"}
            </h4>
            <p className="text-sm">{isUk ? "вул. Садова, 14, Київ" : "14 Sadova St, Kyiv"}</p>
            <p className="text-sm">
              {isUk ? "Пн–Пт: 10:00–22:00" : "Mon–Fri: 10:00–22:00"}
            </p>
            <p className="text-sm">
              {isUk ? "Сб–Нд: 09:00–23:00" : "Sat–Sun: 09:00–23:00"}
            </p>
            <p className="text-sm">+380 44 123 45 67</p>
            <p className="text-sm">hello@zentea.ua</p>
          </div>

          {/* Nav */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[#F7F3EE] text-xs tracking-widest uppercase mb-1">
              {isUk ? "Розділи" : "Sections"}
            </h4>
            {[
              { href: "#menu",       label: isUk ? "Меню" : "Tea Menu" },
              { href: "#library",    label: isUk ? "Бібліотека" : "Tea Library" },
              { href: "#ceremonies", label: isUk ? "Церемонії" : "Ceremonies" },
              { href: "#shop",       label: isUk ? "Крамниця" : "Shop" },
              { href: "#private",    label: isUk ? "Приватна кімната" : "Private Room" },
              { href: "#booking",    label: isUk ? "Бронювання" : "Booking" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm hover:text-[#F7F3EE] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-12 pt-8 border-t border-[#F7F3EE]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F7F3EE]/30">
          <span>© 2025 ZenTea. {isUk ? "Всі права захищено." : "All rights reserved."}</span>
          <span className="tracking-widest">
            {isUk ? "Чай · Тиша · Присутність" : "Tea · Silence · Presence"}
          </span>
        </div>
      </footer>
    </div>
  );
}
