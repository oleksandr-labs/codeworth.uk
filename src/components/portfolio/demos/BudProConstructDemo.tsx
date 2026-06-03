"use client";

import { useState } from "react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

export function BudProConstructDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  // --- Tabs: Projects Portfolio ---
  const projectCategories = ["residential", "commercial", "industrial", "infrastructure"] as const;
  type ProjectCat = (typeof projectCategories)[number];
  const [activeProjectTab, setActiveProjectTab] = useState<ProjectCat>("residential");

  // --- Calculator state ---
  const [buildingType, setBuildingType] = useState<"house" | "apartment" | "commercial">("house");
  const [totalArea, setTotalArea] = useState(150);
  const [finishLevel, setFinishLevel] = useState<"economy" | "standard" | "premium" | "luxury">("standard");
  const [includes, setIncludes] = useState({
    foundation: true,
    walls: true,
    roof: true,
    windows: false,
    interior: false,
  });

  // --- Contact form state ---
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: "house",
    area: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const [formSent, setFormSent] = useState(false);

  // --- Data ---
  const nav = [
    { en: "Services", uk: "Послуги" },
    { en: "Projects", uk: "Проєкти" },
    { en: "Process", uk: "Процес" },
    { en: "About", uk: "Про нас" },
    { en: "Contact", uk: "Контакт" },
  ];

  const services = [
    {
      emoji: "🏠",
      en: "Residential Construction",
      uk: "Житлове будівництво",
      descEn: "Custom homes, townhouses, and multi-family residences built to the highest standards with modern materials and energy-efficient designs.",
      descUk: "Індивідуальні будинки, таунхауси та багатоквартирні будинки за найвищими стандартами з сучасних матеріалів та енергоефективних проєктів.",
      timeEn: "6-18 months",
      timeUk: "6-18 місяців",
    },
    {
      emoji: "🏢",
      en: "Commercial Buildings",
      uk: "Комерційне будівництво",
      descEn: "Office buildings, retail centers, and mixed-use developments. Turnkey solutions from design to occupancy.",
      descUk: "Офісні будівлі, торговельні центри та багатофункціональні комплекси. Рішення під ключ від проєкту до введення.",
      timeEn: "12-24 months",
      timeUk: "12-24 місяці",
    },
    {
      emoji: "🔨",
      en: "Renovations",
      uk: "Реконструкція",
      descEn: "Major structural renovations, floor additions, and building modernization for residential and commercial properties.",
      descUk: "Капітальна реконструкція, надбудова поверхів, модернізація житлових та комерційних об'єктів.",
      timeEn: "3-12 months",
      timeUk: "3-12 місяців",
    },
    {
      emoji: "🛤️",
      en: "Infrastructure",
      uk: "Інфраструктура",
      descEn: "Roads, bridges, drainage systems, and utility networks. Municipal and private infrastructure projects.",
      descUk: "Дороги, мости, дренажні системи та інженерні мережі. Муніципальні та приватні інфраструктурні проєкти.",
      timeEn: "6-36 months",
      timeUk: "6-36 місяців",
    },
    {
      emoji: "🧱",
      en: "Concrete Work",
      uk: "Бетонні роботи",
      descEn: "Foundations, slabs, retaining walls, and decorative concrete. Industrial-grade quality for every project.",
      descUk: "Фундаменти, плити, підпірні стіни та декоративний бетон. Промислова якість для кожного проєкту.",
      timeEn: "2-8 weeks",
      timeUk: "2-8 тижнів",
    },
    {
      emoji: "🏗️",
      en: "Roofing",
      uk: "Покрівельні роботи",
      descEn: "Metal, tile, flat, and green roofing systems. Waterproofing, insulation, and long-term warranties included.",
      descUk: "Металева, черепична, плоска та зелена покрівля. Гідроізоляція, утеплення та довгострокова гарантія.",
      timeEn: "1-6 weeks",
      timeUk: "1-6 тижнів",
    },
  ];

  const projects: Record<ProjectCat, { en: string; uk: string; locEn: string; locUk: string; area: number; year: number; costEn: string; costUk: string }[]> = {
    residential: [
      { en: "Skyline Residence", uk: "Резиденція Скайлайн", locEn: "Kyiv, Pechersk", locUk: "Київ, Печерськ", area: 320, year: 2025, costEn: "$180K-220K", costUk: "7.4-9 млн грн" },
      { en: "Green Valley Estate", uk: "Маєток Зелена Долина", locEn: "Lviv, Bryukhovychi", locUk: "Львів, Брюховичі", area: 450, year: 2024, costEn: "$250K-300K", costUk: "10-12 млн грн" },
      { en: "Sunrise Townhouses", uk: "Таунхауси Санрайз", locEn: "Odesa, Arkadia", locUk: "Одеса, Аркадія", area: 180, year: 2025, costEn: "$120K-150K", costUk: "5-6 млн грн" },
    ],
    commercial: [
      { en: "TechHub Office Center", uk: "Офісний центр TechHub", locEn: "Kyiv, Podil", locUk: "Київ, Поділ", area: 2800, year: 2024, costEn: "$1.2M-1.5M", costUk: "50-62 млн грн" },
      { en: "Market Square Mall", uk: "ТЦ Маркет Сквер", locEn: "Dnipro, Center", locUk: "Дніпро, Центр", area: 5200, year: 2023, costEn: "$3M-3.5M", costUk: "124-144 млн грн" },
      { en: "Plaza Business Park", uk: "Бізнес-парк Плаза", locEn: "Kharkiv, Saltivka", locUk: "Харків, Салтівка", area: 3600, year: 2025, costEn: "$2M-2.4M", costUk: "82-99 млн грн" },
    ],
    industrial: [
      { en: "SteelWorks Factory", uk: "Завод SteelWorks", locEn: "Zaporizhzhia", locUk: "Запоріжжя", area: 8500, year: 2024, costEn: "$4.5M-5M", costUk: "185-206 млн грн" },
      { en: "ColdChain Logistics Hub", uk: "Логістичний хаб ColdChain", locEn: "Kyiv, Brovary", locUk: "Київ, Бровари", area: 6200, year: 2023, costEn: "$3.2M-3.8M", costUk: "132-157 млн грн" },
      { en: "AgriStore Warehouse", uk: "Склад AgriStore", locEn: "Poltava", locUk: "Полтава", area: 4000, year: 2025, costEn: "$1.8M-2.2M", costUk: "74-91 млн грн" },
    ],
    infrastructure: [
      { en: "Southern Bypass Road", uk: "Південна об'їзна дорога", locEn: "Vinnytsia", locUk: "Вінниця", area: 12000, year: 2024, costEn: "$6M-7M", costUk: "247-288 млн грн" },
      { en: "Riverside Bridge", uk: "Міст через Дніпро", locEn: "Cherkasy", locUk: "Черкаси", area: 3200, year: 2023, costEn: "$8M-9.5M", costUk: "330-391 млн грн" },
      { en: "City Water Network", uk: "Міська водопровідна мережа", locEn: "Ternopil", locUk: "Тернопіль", area: 15000, year: 2025, costEn: "$4M-5M", costUk: "165-206 млн грн" },
    ],
  };

  const catLabels: Record<ProjectCat, { en: string; uk: string }> = {
    residential: { en: "Residential", uk: "Житлове" },
    commercial: { en: "Commercial", uk: "Комерційне" },
    industrial: { en: "Industrial", uk: "Промислове" },
    infrastructure: { en: "Infrastructure", uk: "Інфраструктура" },
  };

  const phases = [
    { emoji: "📋", en: "Consultation", uk: "Консультація", timeEn: "1-2 weeks", timeUk: "1-2 тижні", descEn: "Initial meeting, site visit, project scope definition", descUk: "Перша зустріч, огляд ділянки, визначення обсягу" },
    { emoji: "📐", en: "Design", uk: "Проєктування", timeEn: "4-8 weeks", timeUk: "4-8 тижнів", descEn: "Architectural design, engineering calculations, 3D visualization", descUk: "Архітектурний проєкт, інженерні розрахунки, 3D візуалізація" },
    { emoji: "📄", en: "Permits", uk: "Дозволи", timeEn: "2-6 weeks", timeUk: "2-6 тижнів", descEn: "Building permits, environmental approvals, utility connections", descUk: "Будівельні дозволи, екологічні погодження, підключення комунікацій" },
    { emoji: "🏗️", en: "Foundation", uk: "Фундамент", timeEn: "2-4 weeks", timeUk: "2-4 тижні", descEn: "Excavation, foundation pouring, waterproofing, curing", descUk: "Земляні роботи, заливка фундаменту, гідроізоляція, тужавіння" },
    { emoji: "🧱", en: "Construction", uk: "Будівництво", timeEn: "3-12 months", timeUk: "3-12 місяців", descEn: "Walls, floors, roof, utilities installation, finishing works", descUk: "Стіни, перекриття, покрівля, інженерні мережі, оздоблення" },
    { emoji: "🔑", en: "Handover", uk: "Здача", timeEn: "1-2 weeks", timeUk: "1-2 тижні", descEn: "Final inspection, documentation, keys handover, warranty start", descUk: "Фінальна інспекція, документація, передача ключів, початок гарантії" },
  ];

  const certifications = [
    { emoji: "🏅", en: "ISO 9001:2015 Certified", uk: "Сертифікат ISO 9001:2015", descEn: "Quality management system certification", descUk: "Сертифікація системи управління якістю" },
    { emoji: "📜", en: "Ukrainian Construction License", uk: "Будівельна ліцензія України", descEn: "Class CC2 — all building categories", descUk: "Клас CC2 — усі категорії будівель" },
    { emoji: "🛡️", en: "Full Insurance Coverage", uk: "Повне страхове покриття", descEn: "Liability up to $5M per project", descUk: "Відповідальність до $5 млн за проєкт" },
    { emoji: "⚠️", en: "Zero Incidents Record", uk: "Нуль інцидентів", descEn: "1,200+ days without workplace accidents", descUk: "1200+ днів без нещасних випадків на виробництві" },
  ];

  const team = [
    { emoji: "👷", en: "Oleksandr Koval", uk: "Олександр Коваль", roleEn: "Director", roleUk: "Директор", credEn: "MBA, 20+ years in construction management", credUk: "MBA, 20+ років в управлінні будівництвом" },
    { emoji: "🔧", en: "Dmytro Bondarenko", uk: "Дмитро Бондаренко", roleEn: "Chief Engineer", roleUk: "Головний інженер", credEn: "PhD in Civil Engineering, PE license", credUk: "Кандидат технічних наук, ліцензія інженера" },
    { emoji: "📊", en: "Iryna Shevchenko", uk: "Ірина Шевченко", roleEn: "Project Manager", roleUk: "Проєктний менеджер", credEn: "PMP certified, 50+ completed projects", credUk: "Сертифікат PMP, 50+ завершених проєктів" },
  ];

  const testimonials = [
    {
      nameEn: "Viktor M.", nameUk: "Віктор М.",
      projectEn: "Custom Home, 350 m²", projectUk: "Приватний будинок, 350 м²",
      textEn: "BudPro built our dream home in just 10 months. Outstanding quality, transparent pricing, and a team that truly cares about the result. Highly recommended!",
      textUk: "BudPro побудували наш будинок мрії всього за 10 місяців. Відмінна якість, прозоре ціноутворення та команда, яка дійсно піклується про результат. Дуже рекомендую!",
    },
    {
      nameEn: "Natalia K.", nameUk: "Наталія К.",
      projectEn: "Office Renovation, 800 m²", projectUk: "Реконструкція офісу, 800 м²",
      textEn: "Professional approach from day one. They handled all permits, kept the timeline, and the final result exceeded our expectations. Our new office is stunning.",
      textUk: "Професійний підхід з першого дня. Вони вирішили всі дозволи, дотримались графіку, і кінцевий результат перевершив наші очікування. Наш новий офіс вражає.",
    },
    {
      nameEn: "Andriy S.", nameUk: "Андрій С.",
      projectEn: "Warehouse Complex, 4,000 m²", projectUk: "Складський комплекс, 4 000 м²",
      textEn: "We needed a logistics hub built fast. BudPro delivered on time and under budget. Their industrial construction expertise is second to none in Ukraine.",
      textUk: "Нам потрібен був логістичний хаб, побудований швидко. BudPro здали вчасно і в межах бюджету. Їхній досвід промислового будівництва — найкращий в Україні.",
    },
  ];

  // --- Calculator logic ---
  const basePrices: Record<string, number> = { house: 650, apartment: 550, commercial: 750 };
  const finishMultipliers: Record<string, number> = { economy: 0.7, standard: 1, premium: 1.4, luxury: 2 };
  const categoryPrices: Record<string, number> = { foundation: 120, walls: 180, roof: 100, windows: 80, interior: 200 };

  const calcBreakdown = () => {
    const base = basePrices[buildingType] * totalArea * finishMultipliers[finishLevel];
    const items: { label: string; cost: number }[] = [];
    let total = 0;
    (Object.keys(includes) as (keyof typeof includes)[]).forEach((key) => {
      if (includes[key]) {
        const cost = categoryPrices[key] * totalArea * finishMultipliers[finishLevel];
        items.push({
          label: key === "foundation"
            ? (isUk ? "Фундамент" : "Foundation")
            : key === "walls"
              ? (isUk ? "Стіни" : "Walls")
              : key === "roof"
                ? (isUk ? "Покрівля" : "Roof")
                : key === "windows"
                  ? (isUk ? "Вікна та двері" : "Windows & Doors")
                  : (isUk ? "Інтер'єр" : "Interior"),
          cost,
        });
        total += cost;
      }
    });
    total += base * 0.15; // overhead + profit
    items.push({ label: isUk ? "Управління та прибуток" : "Management & Overhead", cost: base * 0.15 });
    return { items, total };
  };

  const { items: breakdownItems, total: estimatedTotal } = calcBreakdown();

  const formatCost = (n: number) => {
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
    if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
    return `$${n.toFixed(0)}`;
  };

  const finishLabels: Record<string, { en: string; uk: string }> = {
    economy: { en: "Economy", uk: "Економ" },
    standard: { en: "Standard", uk: "Стандарт" },
    premium: { en: "Premium", uk: "Преміум" },
    luxury: { en: "Luxury", uk: "Люкс" },
  };

  const buildTypeLabels: Record<string, { en: string; uk: string }> = {
    house: { en: "House", uk: "Будинок" },
    apartment: { en: "Apartment", uk: "Квартира" },
    commercial: { en: "Commercial", uk: "Комерція" },
  };

  const toggleInclude = (key: keyof typeof includes) => {
    setIncludes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleContactSubmit = () => {
    setFormSent(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans">
      {/* ============ HEADER ============ */}
      <header className="bg-slate-900 text-white sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏗️</span>
            <span className="text-lg font-bold tracking-tight text-yellow-400">
              BudPro <span className="text-white font-normal">Construction</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {nav.map((item) => (
              <button key={item.en} className="text-slate-300 hover:text-yellow-400 transition-colors">
                {isUk ? item.uk : item.en}
              </button>
            ))}
          </nav>
          <button className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold px-5 py-2 rounded text-sm transition-colors">
            {isUk ? "Отримати кошторис" : "Get Estimate"}
          </button>
        </div>
      </header>

      {/* ============ HERO ============ */}
      <section
        className="relative bg-slate-800 text-white overflow-hidden"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 20px,
            rgba(234,179,8,0.08) 20px,
            rgba(234,179,8,0.08) 40px
          )`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="inline-block bg-yellow-500/20 border border-yellow-500/40 rounded-full px-4 py-1 text-yellow-400 text-sm font-medium mb-6">
            {isUk ? "🏗️ Надійне будівництво з 2010 року" : "🏗️ Reliable Construction Since 2010"}
          </div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6 max-w-3xl">
            {isUk ? (
              <>БУДУЄМО ВАШЕ <span className="text-yellow-400">МАЙБУТНЄ</span></>
            ) : (
              <>BUILDING YOUR <span className="text-yellow-400">FUTURE</span></>
            )}
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mb-8">
            {isUk
              ? "Від фундаменту до фінішу — повний цикл будівництва житлових, комерційних та промислових об'єктів по всій Україні."
              : "From foundation to finish — full-cycle construction of residential, commercial, and industrial buildings across Ukraine."}
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <button className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold px-8 py-3 rounded text-base transition-colors">
              {isUk ? "Замовити розрахунок" : "Request a Quote"}
            </button>
            <button className="border-2 border-slate-500 hover:border-yellow-400 text-slate-200 hover:text-yellow-400 font-semibold px-8 py-3 rounded text-base transition-colors">
              {isUk ? "Наші проєкти" : "Our Projects"}
            </button>
          </div>
          <div className="grid grid-cols-3 gap-6 max-w-lg">
            {[
              { val: "200+", en: "Projects Completed", uk: "Проєктів завершено" },
              { val: "15", en: "Years of Experience", uk: "Років досвіду" },
              { val: "500+", en: "Skilled Workers", uk: "Кваліфікованих працівників" },
            ].map((s) => (
              <div key={s.val} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-yellow-400">{s.val}</div>
                <div className="text-xs text-slate-400 mt-1">{isUk ? s.uk : s.en}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Yellow stripe accent bottom */}
        <div className="h-2 bg-linear-to-br from-yellow-500 to-yellow-600 w-full" />
      </section>

      {/* ============ SERVICES ============ */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">
            {isUk ? "Наші послуги" : "Our Services"}
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            {isUk
              ? "Повний спектр будівельних послуг для проєктів будь-якого масштабу"
              : "Full range of construction services for projects of any scale"}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => (
            <div key={svc.en} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:border-yellow-400/50 transition-all group">
              <div className="mb-4"><EmojiIcon emoji={svc.emoji} className="w-10 h-10" /></div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-yellow-600 transition-colors">
                {isUk ? svc.uk : svc.en}
              </h3>
              <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                {isUk ? svc.descUk : svc.descEn}
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>⏱️</span>
                <span>{isUk ? svc.timeUk : svc.timeEn}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ PROJECTS PORTFOLIO ============ */}
      <section className="bg-slate-900 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              {isUk ? "Портфоліо проєктів" : "Project Portfolio"}
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              {isUk
                ? "Реалізовані проєкти, якими ми пишаємось"
                : "Completed projects we are proud of"}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveProjectTab(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                  activeProjectTab === cat
                    ? "bg-yellow-500 text-slate-900"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                {isUk ? catLabels[cat].uk : catLabels[cat].en}
              </button>
            ))}
          </div>

          {/* Project Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {projects[activeProjectTab].map((proj) => (
              <div key={proj.en} className="bg-slate-800 rounded-xl border border-slate-700 p-6 hover:border-yellow-500/50 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-3 h-3 rounded-full bg-yellow-500 shrink-0" />
                  <h3 className="font-bold text-yellow-400">{isUk ? proj.uk : proj.en}</h3>
                </div>
                <div className="space-y-2 text-sm text-slate-400">
                  <div className="flex justify-between">
                    <span>📍 {isUk ? proj.locUk : proj.locEn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{isUk ? "Площа" : "Area"}</span>
                    <span className="text-white font-medium">{proj.area.toLocaleString()} {isUk ? "м²" : "m²"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{isUk ? "Рік" : "Year"}</span>
                    <span className="text-white font-medium">{proj.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{isUk ? "Вартість" : "Cost"}</span>
                    <span className="text-yellow-400 font-medium">{isUk ? proj.costUk : proj.costEn}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONSTRUCTION CALCULATOR ============ */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">
            {isUk ? "Калькулятор будівництва" : "Construction Calculator"}
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            {isUk
              ? "Розрахуйте попередню вартість вашого проєкту"
              : "Estimate the preliminary cost of your project"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
            {/* Building type */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {isUk ? "Тип будівлі" : "Building Type"}
              </label>
              <div className="flex gap-2">
                {(["house", "apartment", "commercial"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setBuildingType(t)}
                    className={`flex-1 py-2 rounded text-sm font-medium transition-colors ${
                      buildingType === t
                        ? "bg-yellow-500 text-slate-900"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {isUk ? buildTypeLabels[t].uk : buildTypeLabels[t].en}
                  </button>
                ))}
              </div>
            </div>

            {/* Area slider */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {isUk ? "Загальна площа" : "Total Area"}: <span className="text-yellow-600">{totalArea} {isUk ? "м²" : "m²"}</span>
              </label>
              <input
                type="range"
                min={50}
                max={1000}
                step={10}
                value={totalArea}
                onChange={(e) => setTotalArea(Number(e.target.value))}
                className="w-full accent-yellow-500"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>50 {isUk ? "м²" : "m²"}</span>
                <span>1000 {isUk ? "м²" : "m²"}</span>
              </div>
            </div>

            {/* Finish level */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {isUk ? "Рівень оздоблення" : "Finish Level"}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(["economy", "standard", "premium", "luxury"] as const).map((fl) => (
                  <button
                    key={fl}
                    onClick={() => setFinishLevel(fl)}
                    className={`py-2 rounded text-sm font-medium transition-colors ${
                      finishLevel === fl
                        ? "bg-yellow-500 text-slate-900"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {isUk ? finishLabels[fl].uk : finishLabels[fl].en}
                  </button>
                ))}
              </div>
            </div>

            {/* Includes checkboxes */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {isUk ? "Включає" : "Includes"}
              </label>
              <div className="space-y-2">
                {(Object.keys(includes) as (keyof typeof includes)[]).map((key) => {
                  const labels: Record<string, { en: string; uk: string }> = {
                    foundation: { en: "Foundation", uk: "Фундамент" },
                    walls: { en: "Walls", uk: "Стіни" },
                    roof: { en: "Roof", uk: "Покрівля" },
                    windows: { en: "Windows & Doors", uk: "Вікна та двері" },
                    interior: { en: "Interior", uk: "Інтер'єр" },
                  };
                  return (
                    <label key={key} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includes[key]}
                        onChange={() => toggleInclude(key)}
                        className="w-4 h-4 accent-yellow-500 rounded"
                      />
                      <span className="text-sm text-slate-700">
                        {isUk ? labels[key].uk : labels[key].en}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="bg-slate-900 rounded-xl p-6 text-white">
            <h3 className="text-lg font-bold text-yellow-400 mb-6">
              {isUk ? "Попередній кошторис" : "Estimated Cost Breakdown"}
            </h3>
            <div className="space-y-3 mb-6">
              {breakdownItems.map((item) => (
                <div key={item.label} className="flex justify-between items-center border-b border-slate-700 pb-2">
                  <span className="text-slate-300 text-sm">{item.label}</span>
                  <span className="text-white font-medium text-sm">{formatCost(item.cost)}</span>
                </div>
              ))}
            </div>
            <div className="border-t-2 border-yellow-500 pt-4 flex justify-between items-center">
              <span className="text-lg font-bold">{isUk ? "Орієнтовна сума" : "Estimated Total"}</span>
              <span className="text-2xl font-black text-yellow-400">{formatCost(estimatedTotal)}</span>
            </div>
            <p className="text-xs text-slate-500 mt-4">
              {isUk
                ? "* Остаточна вартість визначається після детального обстеження та проєктування"
                : "* Final cost is determined after detailed survey and design phase"}
            </p>
            <button className="w-full mt-6 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-3 rounded transition-colors">
              {isUk ? "Отримати точний кошторис" : "Get Exact Estimate"}
            </button>
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="bg-slate-800 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              {isUk ? "Процес будівництва" : "Construction Process"}
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              {isUk
                ? "Прозорий та перевірений шлях від ідеї до готового об'єкта"
                : "A transparent and proven path from idea to completed building"}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {phases.map((phase, idx) => (
              <div key={phase.en} className="relative bg-slate-700/50 rounded-xl p-6 border border-slate-600 hover:border-yellow-500/50 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-yellow-500 text-slate-900 font-black flex items-center justify-center text-sm shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="font-bold text-white">{isUk ? phase.uk : phase.en}</div>
                    <div className="text-xs text-yellow-400">{isUk ? phase.timeUk : phase.timeEn}</div>
                  </div>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {isUk ? phase.descUk : phase.descEn}
                </p>
                <div className="mt-3 opacity-30"><EmojiIcon emoji={phase.emoji} className="w-8 h-8" /></div>
                {idx < phases.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-yellow-500 text-xl">
                    ➜
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CERTIFICATIONS ============ */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">
            {isUk ? "Сертифікації та гарантії" : "Certifications & Guarantees"}
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert) => (
            <div key={cert.en} className="bg-white rounded-xl border border-slate-200 p-6 text-center hover:shadow-lg transition-shadow">
              <div className="mb-3"><EmojiIcon emoji={cert.emoji} className="w-10 h-10" /></div>
              <h3 className="font-bold text-slate-900 mb-2 text-sm">
                {isUk ? cert.uk : cert.en}
              </h3>
              <p className="text-xs text-slate-500">{isUk ? cert.descUk : cert.descEn}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ TEAM ============ */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">
              {isUk ? "Наша команда" : "Our Team"}
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              {isUk
                ? "Досвідчені професіонали, які керують кожним проєктом"
                : "Experienced professionals who lead every project"}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {team.map((person) => (
              <div key={person.en} className="bg-white rounded-xl border border-slate-200 p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <EmojiIcon emoji={person.emoji} className="w-10 h-10" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">{isUk ? person.uk : person.en}</h3>
                <div className="text-yellow-600 font-semibold text-sm mb-2">{isUk ? person.roleUk : person.roleEn}</div>
                <p className="text-xs text-slate-500">{isUk ? person.credUk : person.credEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="bg-slate-900 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              {isUk ? "Відгуки клієнтів" : "Client Testimonials"}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.nameEn} className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                <div className="text-yellow-500 text-2xl mb-4">★★★★★</div>
                <p className="text-slate-300 text-sm leading-relaxed mb-4 italic">
                  &ldquo;{isUk ? t.textUk : t.textEn}&rdquo;
                </p>
                <div className="border-t border-slate-700 pt-4">
                  <div className="font-bold text-white">{isUk ? t.nameUk : t.nameEn}</div>
                  <div className="text-xs text-yellow-400">{isUk ? t.projectUk : t.projectEn}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">
            {isUk ? "Зв'яжіться з нами" : "Contact Us"}
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            {isUk
              ? "Готові обговорити ваш проєкт? Заповніть форму або зателефонуйте нам"
              : "Ready to discuss your project? Fill out the form or give us a call"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-4">{isUk ? "Наш офіс" : "Our Office"}</h3>
              <div className="space-y-3 text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <span className="shrink-0">📍</span>
                  <span>{isUk ? "вул. Будівельників 42, Київ, 02002, Україна" : "42 Budivelnykiv St, Kyiv, 02002, Ukraine"}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="shrink-0">📞</span>
                  <span>+380 (44) 123-45-67</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="shrink-0">✉️</span>
                  <span>info@budpro-construct.ua</span>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-6">
              <h3 className="font-bold text-slate-900 mb-2">{isUk ? "Графік роботи" : "Working Hours"}</h3>
              <div className="text-sm text-slate-600 space-y-1">
                <div>{isUk ? "Пн-Пт: 08:00 — 18:00" : "Mon-Fri: 08:00 — 18:00"}</div>
                <div>{isUk ? "Сб: 09:00 — 14:00" : "Sat: 09:00 — 14:00"}</div>
                <div>{isUk ? "Нд: Вихідний" : "Sun: Closed"}</div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            {formSent ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {isUk ? "Дякуємо за звернення!" : "Thank You!"}
                </h3>
                <p className="text-slate-500 text-sm">
                  {isUk
                    ? "Наш менеджер зв'яжеться з вами протягом 24 годин."
                    : "Our manager will contact you within 24 hours."}
                </p>
                <button
                  onClick={() => {
                    setFormSent(false);
                    setContactForm({ name: "", phone: "", email: "", projectType: "house", area: "", budget: "", timeline: "", message: "" });
                  }}
                  className="mt-4 text-yellow-600 hover:text-yellow-700 text-sm font-medium"
                >
                  {isUk ? "Надіслати ще раз" : "Send Another"}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 mb-2">
                  {isUk ? "Запит на проєкт" : "Project Inquiry"}
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder={isUk ? "Ваше ім'я" : "Your Name"}
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:border-yellow-500"
                  />
                  <input
                    type="tel"
                    placeholder={isUk ? "Телефон" : "Phone"}
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:border-yellow-500"
                  />
                </div>
                <input
                  type="email"
                  placeholder={isUk ? "Електронна пошта" : "Email"}
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:border-yellow-500"
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <select
                    value={contactForm.projectType}
                    onChange={(e) => setContactForm({ ...contactForm, projectType: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:border-yellow-500 bg-white"
                  >
                    <option value="house">{isUk ? "Будинок" : "House"}</option>
                    <option value="apartment">{isUk ? "Квартира" : "Apartment"}</option>
                    <option value="commercial">{isUk ? "Комерційне" : "Commercial"}</option>
                    <option value="industrial">{isUk ? "Промислове" : "Industrial"}</option>
                    <option value="infrastructure">{isUk ? "Інфраструктура" : "Infrastructure"}</option>
                  </select>
                  <input
                    type="text"
                    placeholder={isUk ? "Площа (м²)" : "Area (m²)"}
                    value={contactForm.area}
                    onChange={(e) => setContactForm({ ...contactForm, area: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:border-yellow-500"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <select
                    value={contactForm.budget}
                    onChange={(e) => setContactForm({ ...contactForm, budget: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:border-yellow-500 bg-white"
                  >
                    <option value="">{isUk ? "Бюджет" : "Budget"}</option>
                    <option value="50k">$50K — $100K</option>
                    <option value="100k">$100K — $300K</option>
                    <option value="300k">$300K — $1M</option>
                    <option value="1m">$1M+</option>
                  </select>
                  <select
                    value={contactForm.timeline}
                    onChange={(e) => setContactForm({ ...contactForm, timeline: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:border-yellow-500 bg-white"
                  >
                    <option value="">{isUk ? "Терміни" : "Timeline"}</option>
                    <option value="3m">{isUk ? "До 3 місяців" : "Under 3 months"}</option>
                    <option value="6m">{isUk ? "3-6 місяців" : "3-6 months"}</option>
                    <option value="12m">{isUk ? "6-12 місяців" : "6-12 months"}</option>
                    <option value="12m+">{isUk ? "Більше року" : "Over 12 months"}</option>
                  </select>
                </div>
                <textarea
                  placeholder={isUk ? "Опишіть ваш проєкт..." : "Describe your project..."}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:border-yellow-500 resize-none"
                />
                <button
                  onClick={handleContactSubmit}
                  className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-3 rounded transition-colors"
                >
                  {isUk ? "Надіслати запит" : "Submit Inquiry"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🏗️</span>
                <span className="font-bold text-yellow-400">BudPro <span className="text-white font-normal">Construction</span></span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                {isUk
                  ? "Повний цикл будівництва житлових, комерційних та промислових об'єктів по всій Україні."
                  : "Full-cycle construction of residential, commercial, and industrial buildings across Ukraine."}
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-sm mb-4 text-yellow-400">{isUk ? "Контакти" : "Contact"}</h4>
              <div className="space-y-2 text-sm text-slate-400">
                <div>📍 {isUk ? "вул. Будівельників 42, Київ" : "42 Budivelnykiv St, Kyiv"}</div>
                <div>📞 +380 (44) 123-45-67</div>
                <div>✉️ info@budpro-construct.ua</div>
              </div>
            </div>

            {/* Service Regions */}
            <div>
              <h4 className="font-bold text-sm mb-4 text-yellow-400">{isUk ? "Регіони" : "Service Regions"}</h4>
              <div className="space-y-1 text-sm text-slate-400">
                <div>{isUk ? "Київ та область" : "Kyiv & Region"}</div>
                <div>{isUk ? "Львів та область" : "Lviv & Region"}</div>
                <div>{isUk ? "Одеса та область" : "Odesa & Region"}</div>
                <div>{isUk ? "Дніпро та область" : "Dnipro & Region"}</div>
                <div>{isUk ? "Харків та область" : "Kharkiv & Region"}</div>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h4 className="font-bold text-sm mb-4 text-yellow-400">{isUk ? "Сертифікації" : "Certifications"}</h4>
              <div className="space-y-2 text-sm text-slate-400">
                <div>🏅 ISO 9001:2015</div>
                <div>📜 {isUk ? "Ліцензія CC2" : "License CC2"}</div>
                <div>🛡️ {isUk ? "Страхування до $5M" : "Insured up to $5M"}</div>
                <div>⚠️ {isUk ? "0 інцидентів" : "Zero Incidents"}</div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500">
              &copy; 2026 BudPro Construction. {isUk ? "Усі права захищено." : "All rights reserved."}
            </p>
            <div className="flex gap-4 text-xs text-slate-500">
              <span>{isUk ? "Політика конфіденційності" : "Privacy Policy"}</span>
              <span>{isUk ? "Умови використання" : "Terms of Service"}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
