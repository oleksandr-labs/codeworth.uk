"use client";

import { useState } from "react";

export function MasterPlusDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  /* ── state ── */
  const [symptoms, setSymptoms] = useState<Set<string>>(new Set());
  const [diagLocation, setDiagLocation] = useState<string | null>(null);
  const [diagResult, setDiagResult] = useState(false);
  const [priceTab, setPriceTab] = useState<"sedan" | "suv" | "van">("sedan");
  const [bookBrand, setBookBrand] = useState("");
  const [bookModel, setBookModel] = useState("");
  const [bookService, setBookService] = useState("");
  const [bookDate, setBookDate] = useState("");
  const [bookPhone, setBookPhone] = useState("");
  const [bookDone, setBookDone] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  /* ── data ── */
  const NAV = [
    { uk: "Послуги", en: "Services", href: "#services" },
    { uk: "Ціни", en: "Prices", href: "#prices" },
    { uk: "Діагностика", en: "Diagnostics", href: "#diagnostics" },
    { uk: "Про нас", en: "About", href: "#about" },
    { uk: "Контакти", en: "Contact", href: "#contact" },
  ];

  const SERVICES = [
    { emoji: "🛢️", uk: "Заміна масла", en: "Oil Change", descUk: "Заміна моторного масла та фільтрів. Оригінальні масла Mobil, Shell, Castrol", descEn: "Engine oil & filter replacement. Genuine Mobil, Shell, Castrol oils", price: "600–1 400 ₴", duration: "30 хв / 30 min" },
    { emoji: "🔴", uk: "Гальмівна система", en: "Brake Service", descUk: "Заміна колодок, дисків, шлангів, прокачка гальм", descEn: "Pad, disc, hose replacement, brake bleeding", price: "800–3 500 ₴", duration: "1–3 год / 1–3 hrs" },
    { emoji: "🖥️", uk: "Діагностика двигуна", en: "Engine Diagnostics", descUk: "Комп'ютерна діагностика, зчитування помилок, аналіз роботи сенсорів", descEn: "Computer diagnostics, error code reading, sensor analysis", price: "400–900 ₴", duration: "40 хв / 40 min" },
    { emoji: "🛞", uk: "Шиномонтаж", en: "Tire Service", descUk: "Монтаж, балансування, зберігання, ремонт проколів", descEn: "Mounting, balancing, storage, puncture repair", price: "350–800 ₴", duration: "30–60 хв / 30–60 min" },
    { emoji: "❄️", uk: "Ремонт кондиціонера", en: "AC Repair", descUk: "Заправка фреоном, заміна компресора, чистка системи", descEn: "Freon recharge, compressor replacement, system cleaning", price: "700–4 000 ₴", duration: "1–4 год / 1–4 hrs" },
    { emoji: "⚙️", uk: "Трансмісія", en: "Transmission", descUk: "Ремонт КПП, заміна масла АКПП, зчеплення", descEn: "Gearbox repair, ATF change, clutch replacement", price: "1 500–8 000 ₴", duration: "2–6 год / 2–6 hrs" },
    { emoji: "⚡", uk: "Електрика", en: "Electrical", descUk: "Стартери, генератори, проводка, сигналізація", descEn: "Starters, alternators, wiring, alarms", price: "500–3 000 ₴", duration: "1–3 год / 1–3 hrs" },
    { emoji: "🚗", uk: "Кузовний ремонт", en: "Body Work", descUk: "Рихтування, фарбування, зварювання, полірування", descEn: "Dent repair, painting, welding, polishing", price: "2 000–12 000 ₴", duration: "1–5 днів / 1–5 days" },
  ];

  const SYMPTOMS_LIST = [
    { id: "noise", uk: "Сторонній шум / стукіт", en: "Strange noise / knocking" },
    { id: "vibration", uk: "Вібрація при русі", en: "Vibration while driving" },
    { id: "warning", uk: "Горить контрольна лампа", en: "Warning light on dashboard" },
    { id: "smoke", uk: "Дим з вихлопу або з-під капота", en: "Smoke from exhaust or under hood" },
    { id: "brake-issue", uk: "Гальма скриплять / довге гальмування", en: "Brakes squeal / long stopping" },
    { id: "start-issue", uk: "Погано заводиться", en: "Hard to start" },
    { id: "leak", uk: "Течія рідини під авто", en: "Fluid leak under car" },
    { id: "ac-issue", uk: "Кондиціонер не холодить", en: "AC not cooling" },
    { id: "steering", uk: "Тягне в бік / важке кермо", en: "Pulls to side / heavy steering" },
    { id: "fuel", uk: "Збільшений розхід палива", en: "Increased fuel consumption" },
  ];

  const LOCATIONS = [
    { id: "engine", uk: "Двигун", en: "Engine", emoji: "🔧" },
    { id: "brakes", uk: "Гальма", en: "Brakes", emoji: "🔴" },
    { id: "suspension", uk: "Підвіска", en: "Suspension", emoji: "🔩" },
    { id: "electrical", uk: "Електрика", en: "Electrical", emoji: "⚡" },
  ];

  const DIAGNOSIS_MAP: Record<string, { diagUk: string; diagEn: string; serviceUk: string; serviceEn: string; cost: string }> = {
    engine: { diagUk: "Ймовірні проблеми з двигуном або його компонентами", diagEn: "Likely issues with engine or its components", serviceUk: "Комп'ютерна діагностика + огляд двигуна", serviceEn: "Computer diagnostics + engine inspection", cost: "500–2 000 ₴" },
    brakes: { diagUk: "Зношення гальмівних компонентів або проблема з гідравлікою", diagEn: "Brake component wear or hydraulic issue", serviceUk: "Огляд гальмівної системи + заміна колодок", serviceEn: "Brake system inspection + pad replacement", cost: "800–3 500 ₴" },
    suspension: { diagUk: "Проблеми з амортизаторами, кульовими опорами або стійками", diagEn: "Issues with shocks, ball joints, or struts", serviceUk: "Діагностика підвіски + заміна зношених деталей", serviceEn: "Suspension diagnostics + worn part replacement", cost: "1 000–4 000 ₴" },
    electrical: { diagUk: "Несправність електропроводки, датчиків або блоку керування", diagEn: "Wiring, sensor, or control unit malfunction", serviceUk: "Електродіагностика + ремонт проводки", serviceEn: "Electrical diagnostics + wiring repair", cost: "600–3 000 ₴" },
  };

  const PRICE_DATA: Record<string, { nameUk: string; nameEn: string; rows: { serviceUk: string; serviceEn: string; price: string }[] }> = {
    sedan: {
      nameUk: "Седан / Хетчбек", nameEn: "Sedan / Hatchback",
      rows: [
        { serviceUk: "Заміна масла", serviceEn: "Oil Change", price: "600–1 000 ₴" },
        { serviceUk: "Заміна колодок (перед)", serviceEn: "Front Brake Pads", price: "800–1 500 ₴" },
        { serviceUk: "Комп'ютерна діагностика", serviceEn: "Computer Diagnostics", price: "400–600 ₴" },
        { serviceUk: "Шиномонтаж (4 колеса)", serviceEn: "Tire Mounting (4 wheels)", price: "400–600 ₴" },
        { serviceUk: "Заправка кондиціонера", serviceEn: "AC Recharge", price: "700–1 000 ₴" },
        { serviceUk: "Заміна ременя ГРМ", serviceEn: "Timing Belt", price: "2 500–4 500 ₴" },
        { serviceUk: "Заміна зчеплення", serviceEn: "Clutch Replacement", price: "3 000–5 500 ₴" },
        { serviceUk: "Заміна амортизаторів (пара)", serviceEn: "Shock Absorbers (pair)", price: "1 800–3 200 ₴" },
      ],
    },
    suv: {
      nameUk: "Кросовер / Позашляховик", nameEn: "SUV / Crossover",
      rows: [
        { serviceUk: "Заміна масла", serviceEn: "Oil Change", price: "900–1 400 ₴" },
        { serviceUk: "Заміна колодок (перед)", serviceEn: "Front Brake Pads", price: "1 200–2 200 ₴" },
        { serviceUk: "Комп'ютерна діагностика", serviceEn: "Computer Diagnostics", price: "500–800 ₴" },
        { serviceUk: "Шиномонтаж (4 колеса)", serviceEn: "Tire Mounting (4 wheels)", price: "500–800 ₴" },
        { serviceUk: "Заправка кондиціонера", serviceEn: "AC Recharge", price: "900–1 300 ₴" },
        { serviceUk: "Заміна ременя ГРМ", serviceEn: "Timing Belt", price: "3 500–6 000 ₴" },
        { serviceUk: "Заміна зчеплення", serviceEn: "Clutch Replacement", price: "4 000–7 500 ₴" },
        { serviceUk: "Заміна амортизаторів (пара)", serviceEn: "Shock Absorbers (pair)", price: "2 500–4 500 ₴" },
      ],
    },
    van: {
      nameUk: "Мінівен / Бус", nameEn: "Van / Minibus",
      rows: [
        { serviceUk: "Заміна масла", serviceEn: "Oil Change", price: "1 000–1 600 ₴" },
        { serviceUk: "Заміна колодок (перед)", serviceEn: "Front Brake Pads", price: "1 400–2 800 ₴" },
        { serviceUk: "Комп'ютерна діагностика", serviceEn: "Computer Diagnostics", price: "500–900 ₴" },
        { serviceUk: "Шиномонтаж (4 колеса)", serviceEn: "Tire Mounting (4 wheels)", price: "600–1 000 ₴" },
        { serviceUk: "Заправка кондиціонера", serviceEn: "AC Recharge", price: "1 000–1 500 ₴" },
        { serviceUk: "Заміна ременя ГРМ", serviceEn: "Timing Belt", price: "4 000–7 000 ₴" },
        { serviceUk: "Заміна зчеплення", serviceEn: "Clutch Replacement", price: "5 000–9 000 ₴" },
        { serviceUk: "Заміна амортизаторів (пара)", serviceEn: "Shock Absorbers (pair)", price: "3 000–5 500 ₴" },
      ],
    },
  };

  const WHY_US = [
    { emoji: "🏭", uk: "Оригінальні запчастини", en: "OEM Parts", descUk: "Використовуємо тільки оригінальні або якісні аналоги від перевірених постачальників", descEn: "We use only genuine or quality equivalent parts from trusted suppliers" },
    { emoji: "🛡️", uk: "Гарантія на роботи", en: "Service Warranty", descUk: "Від 6 до 24 місяців гарантії на всі виконані роботи та встановлені деталі", descEn: "6 to 24 months warranty on all performed work and installed parts" },
    { emoji: "👨‍🔧", uk: "Сертифіковані механіки", en: "Certified Mechanics", descUk: "Наші спеціалісти мають сертифікати Bosch, Toyota та інші міжнародні кваліфікації", descEn: "Our specialists hold Bosch, Toyota and other international certifications" },
    { emoji: "💰", uk: "Чесні ціни", en: "Fair Pricing", descUk: "Прозора калькуляція без прихованих платежів. Знаєте ціну до початку ремонту", descEn: "Transparent pricing with no hidden fees. Know the price before work begins" },
  ];

  const REVIEWS = [
    {
      name: isUk ? "Олександр К." : "Oleksandr K.",
      car: "Toyota Camry 2019",
      stars: 5,
      serviceUk: "Гальмівна система",
      serviceEn: "Brake Service",
      date: isUk ? "Лютий 2026" : "February 2026",
      textUk: "Замінили колодки та диски за 2 години. Ціна як домовлялись, без сюрпризів. Механік пояснив усе детально. Рекомендую Майстер Плюс!",
      textEn: "Replaced pads and discs in 2 hours. Price as agreed, no surprises. Mechanic explained everything in detail. Recommend Master Plus!",
    },
    {
      name: isUk ? "Наталія В." : "Nataliia V.",
      car: "Hyundai Tucson 2021",
      stars: 5,
      serviceUk: "Ремонт кондиціонера",
      serviceEn: "AC Repair",
      date: isUk ? "Січень 2026" : "January 2026",
      textUk: "Кондиціонер перестав холодити посеред літа. Заправили і знайшли мікротріщину в трубці — усе виправили за день! Дуже вдячна за оперативність.",
      textEn: "AC stopped cooling in the middle of summer. Recharged and found a micro-crack in the pipe — fixed everything in one day! Very grateful for the quick turnaround.",
    },
    {
      name: isUk ? "Дмитро Л." : "Dmytro L.",
      car: "VW Passat B8 2020",
      stars: 5,
      serviceUk: "Комплексне ТО",
      serviceEn: "Full Maintenance",
      date: isUk ? "Грудень 2025" : "December 2025",
      textUk: "Вже 3 роки обслуговую тут авто. Завжди чесна діагностика, не нав'язують зайвого. Кожного разу дають детальний звіт. Команда професіоналів.",
      textEn: "Been servicing my car here for 3 years. Always honest diagnostics, no unnecessary upselling. They provide a detailed report every time. Team of professionals.",
    },
  ];

  /* ── helpers ── */
  const toggleSymptom = (id: string) => {
    setSymptoms((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    setDiagResult(false);
  };

  const runDiagnosis = () => {
    if (symptoms.size > 0 && diagLocation) setDiagResult(true);
  };

  const submitBooking = () => {
    if (bookBrand && bookModel && bookService && bookDate && bookPhone) setBookDone(true);
  };

  const diag = diagLocation ? DIAGNOSIS_MAP[diagLocation] : null;

  /* ────────────────────── JSX ────────────────────── */
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 text-gray-900 dark:text-white font-sans">

      {/* ═══════ HEADER ═══════ */}
      <header className="bg-blue-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#" className="text-xl font-bold tracking-wide flex items-center gap-2">
            <span className="text-2xl">🔧</span>
            {isUk ? "Майстер Плюс" : "Master Plus"}
          </a>

          {/* desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {NAV.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-blue-300 transition-colors">
                {isUk ? l.uk : l.en}
              </a>
            ))}
            <a href="#booking" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm">
              {isUk ? "Записатись" : "Book Service"}
            </a>
          </nav>

          {/* mobile toggle */}
          <button onClick={() => setMobileNav(!mobileNav)} className="md:hidden text-2xl" aria-label="menu">
            {mobileNav ? "✕" : "☰"}
          </button>
        </div>

        {/* mobile nav */}
        {mobileNav && (
          <nav className="md:hidden bg-blue-800 px-4 pb-4 flex flex-col gap-3 text-sm">
            {NAV.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-blue-300 transition-colors" onClick={() => setMobileNav(false)}>
                {isUk ? l.uk : l.en}
              </a>
            ))}
            <a href="#booking" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold text-center transition-colors" onClick={() => setMobileNav(false)}>
              {isUk ? "Записатись" : "Book Service"}
            </a>
          </nav>
        )}
      </header>

      {/* ═══════ HERO ═══════ */}
      <section className="bg-linear-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20 px-4 relative overflow-hidden">
        {/* decorative emojis */}
        <div className="absolute top-8 left-8 text-5xl opacity-15 select-none">🚗</div>
        <div className="absolute top-16 right-12 text-4xl opacity-15 select-none">🔧</div>
        <div className="absolute bottom-10 left-1/4 text-5xl opacity-10 select-none">🚗</div>
        <div className="absolute bottom-8 right-1/3 text-4xl opacity-10 select-none">🔧</div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            {isUk ? "Ваше Авто в Надійних Руках" : "Your Car in Reliable Hands"}
          </h1>
          <p className="text-lg md:text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            {isUk
              ? "Повний спектр автосервісних послуг: від заміни масла до капітального ремонту. Чесні ціни, гарантія, сертифіковані механіки."
              : "Full range of auto services: from oil change to major repairs. Fair prices, warranty, certified mechanics."}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a href="#booking" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors shadow-lg">
              {isUk ? "Записатись на сервіс" : "Book a Service"}
            </a>
            <a href="#diagnostics" className="border-2 border-white/40 hover:border-white text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors">
              {isUk ? "Онлайн-діагностика" : "Online Diagnostics"}
            </a>
          </div>

          {/* stats */}
          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
            <div>
              <div className="text-3xl font-extrabold text-white">10 000+</div>
              <div className="text-sm text-blue-300">{isUk ? "авто обслуговано" : "cars serviced"}</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-white">12</div>
              <div className="text-sm text-blue-300">{isUk ? "років досвіду" : "years of experience"}</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-white">6</div>
              <div className="text-sm text-blue-300">{isUk ? "сертифік. механіків" : "certified mechanics"}</div>
            </div>
          </div>

          {/* trust badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            {[
              { emoji: "🏆", uk: "Bosch Car Service", en: "Bosch Car Service" },
              { emoji: "🛡️", uk: "Гарантія 24 міс.", en: "24-month Warranty" },
              { emoji: "📋", uk: "Безкоштовна діагностика", en: "Free Inspection" },
              { emoji: "🚨", uk: "Евакуатор 24/7", en: "Tow Truck 24/7" },
            ].map((b) => (
              <div key={b.en} className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm text-blue-100">
                <span>{b.emoji}</span> {isUk ? b.uk : b.en}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SERVICES ═══════ */}
      <section id="services" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2 text-blue-900">
            {isUk ? "Наші Послуги" : "Our Services"}
          </h2>
          <p className="text-center text-gray-500 dark:text-neutral-400 mb-10">
            {isUk ? "Повний перелік робіт для вашого авто" : "Full list of services for your car"}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s) => (
              <div key={s.en} className="border border-gray-200 dark:border-neutral-700 rounded-xl p-5 hover:shadow-lg transition-shadow group bg-gray-50 dark:bg-neutral-900 hover:bg-white">
                <div className="text-3xl mb-3">{s.emoji}</div>
                <h3 className="font-bold text-lg text-blue-800 mb-1 group-hover:text-blue-600 transition-colors">
                  {isUk ? s.uk : s.en}
                </h3>
                <p className="text-sm text-gray-600 dark:text-neutral-300 mb-3">{isUk ? s.descUk : s.descEn}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-semibold">{s.price}</span>
                  <span className="text-gray-400">⏱ {s.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ ONLINE DIAGNOSTICS ═══════ */}
      <section id="diagnostics" className="py-16 px-4 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2 text-blue-900">
            {isUk ? "Онлайн-діагностика" : "Online Diagnostics"}
          </h2>
          <p className="text-center text-gray-500 dark:text-neutral-400 mb-10">
            {isUk ? "Оберіть симптоми та зону — отримайте попередній діагноз" : "Select symptoms and area — get a preliminary diagnosis"}
          </p>

          <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
            {/* symptoms checklist */}
            <h3 className="font-semibold text-blue-800 mb-3 text-lg">
              {isUk ? "1. Які симптоми ви помічаєте?" : "1. What symptoms do you notice?"}
            </h3>
            <div className="grid sm:grid-cols-2 gap-2 mb-8">
              {SYMPTOMS_LIST.map((s) => (
                <button
                  key={s.id}
                  onClick={() => toggleSymptom(s.id)}
                  className={`text-left px-4 py-2 rounded-lg border text-sm transition-colors ${
                    symptoms.has(s.id)
                      ? "bg-blue-700 text-white border-blue-700"
                      : "bg-white text-gray-700 dark:text-neutral-300 border-gray-300 hover:border-blue-400"
                  }`}
                >
                  {symptoms.has(s.id) ? "✅ " : "⬜ "}
                  {isUk ? s.uk : s.en}
                </button>
              ))}
            </div>

            {/* location selector */}
            <h3 className="font-semibold text-blue-800 mb-3 text-lg">
              {isUk ? "2. Де, на вашу думку, проблема?" : "2. Where do you think the issue is?"}
            </h3>
            <div className="flex flex-wrap gap-3 mb-8">
              {LOCATIONS.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => { setDiagLocation(loc.id); setDiagResult(false); }}
                  className={`px-5 py-3 rounded-lg border font-medium transition-colors flex items-center gap-2 ${
                    diagLocation === loc.id
                      ? "bg-blue-700 text-white border-blue-700"
                      : "bg-white text-gray-700 dark:text-neutral-300 border-gray-300 hover:border-blue-400"
                  }`}
                >
                  <span>{loc.emoji}</span> {isUk ? loc.uk : loc.en}
                </button>
              ))}
            </div>

            {/* run button */}
            <button
              onClick={runDiagnosis}
              disabled={symptoms.size === 0 || !diagLocation}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors mb-6"
            >
              {isUk ? "Отримати попередній діагноз" : "Get Preliminary Diagnosis"}
            </button>

            {/* result */}
            {diagResult && diag && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-3">
                <h4 className="font-bold text-blue-900 text-lg">
                  📋 {isUk ? "Попередній діагноз" : "Preliminary Diagnosis"}
                </h4>
                <p className="text-gray-700">{isUk ? diag.diagUk : diag.diagEn}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 bg-white dark:bg-neutral-800 rounded-lg p-4 border border-blue-100">
                    <div className="text-xs text-gray-500 dark:text-neutral-400 mb-1">{isUk ? "Рекомендований сервіс" : "Recommended Service"}</div>
                    <div className="font-semibold text-blue-800">{isUk ? diag.serviceUk : diag.serviceEn}</div>
                  </div>
                  <div className="flex-1 bg-white dark:bg-neutral-800 rounded-lg p-4 border border-blue-100">
                    <div className="text-xs text-gray-500 dark:text-neutral-400 mb-1">{isUk ? "Орієнтовна вартість" : "Estimated Cost"}</div>
                    <div className="font-semibold text-red-600">{diag.cost}</div>
                  </div>
                </div>
                <p className="text-xs text-gray-400 dark:text-neutral-500 mt-2">
                  {isUk
                    ? "* Це попередня оцінка. Точний діагноз можливий лише після огляду на СТО."
                    : "* This is a preliminary estimate. Exact diagnosis only after in-shop inspection."}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════ PRICE LIST ═══════ */}
      <section id="prices" className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2 text-blue-900">
            {isUk ? "Прайс-лист" : "Price List"}
          </h2>
          <p className="text-center text-gray-500 dark:text-neutral-400 mb-8">
            {isUk ? "Ціни залежать від типу авто" : "Prices depend on vehicle type"}
          </p>

          {/* tabs */}
          <div className="flex justify-center gap-2 mb-8">
            {(["sedan", "suv", "van"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setPriceTab(tab)}
                className={`px-5 py-2 rounded-lg font-semibold text-sm transition-colors ${
                  priceTab === tab
                    ? "bg-blue-800 text-white shadow"
                    : "bg-gray-200 text-gray-600 dark:text-neutral-300 hover:bg-gray-300"
                }`}
              >
                {tab === "sedan" ? "🚘" : tab === "suv" ? "🚙" : "🚐"}{" "}
                {isUk ? PRICE_DATA[tab].nameUk : PRICE_DATA[tab].nameEn}
              </button>
            ))}
          </div>

          {/* table */}
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-neutral-700 shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="text-left px-4 py-3">{isUk ? "Послуга" : "Service"}</th>
                  <th className="text-right px-4 py-3">{isUk ? "Ціна" : "Price"}</th>
                </tr>
              </thead>
              <tbody>
                {PRICE_DATA[priceTab].rows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-3">{isUk ? row.serviceUk : row.serviceEn}</td>
                    <td className="px-4 py-3 text-right font-semibold text-blue-800">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 dark:text-neutral-500 mt-3 text-center">
            {isUk
              ? "* Вказані орієнтовні ціни. Точна вартість — після діагностики."
              : "* Prices are approximate. Exact cost after diagnostics."}
          </p>
        </div>
      </section>

      {/* ═══════ SERVICE BOOKING ═══════ */}
      <section id="booking" className="py-16 px-4 bg-linear-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">
            {isUk ? "Запис на Сервіс" : "Book a Service"}
          </h2>
          <p className="text-center text-blue-300 mb-8">
            {isUk ? "Заповніть форму і ми зв'яжемось з вами для підтвердження" : "Fill in the form and we will contact you to confirm"}
          </p>

          {!bookDone ? (
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 md:p-8 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-blue-200 mb-1">{isUk ? "Марка авто" : "Car Brand"}</label>
                  <input
                    type="text"
                    value={bookBrand}
                    onChange={(e) => setBookBrand(e.target.value)}
                    placeholder={isUk ? "напр. Toyota" : "e.g. Toyota"}
                    className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-blue-200 mb-1">{isUk ? "Модель" : "Model"}</label>
                  <input
                    type="text"
                    value={bookModel}
                    onChange={(e) => setBookModel(e.target.value)}
                    placeholder={isUk ? "напр. Camry" : "e.g. Camry"}
                    className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-blue-200 mb-1">{isUk ? "Тип послуги" : "Service Type"}</label>
                <select
                  value={bookService}
                  onChange={(e) => setBookService(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/20 text-white focus:outline-none focus:border-white"
                >
                  <option value="" className="text-gray-900">{isUk ? "Оберіть послугу" : "Select service"}</option>
                  {SERVICES.map((s) => (
                    <option key={s.en} value={s.en} className="text-gray-900">
                      {s.emoji} {isUk ? s.uk : s.en}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-blue-200 mb-1">{isUk ? "Бажана дата" : "Preferred Date"}</label>
                  <input
                    type="date"
                    value={bookDate}
                    onChange={(e) => setBookDate(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/20 text-white focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-blue-200 mb-1">{isUk ? "Телефон" : "Phone"}</label>
                  <input
                    type="tel"
                    value={bookPhone}
                    onChange={(e) => setBookPhone(e.target.value)}
                    placeholder="+380..."
                    className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <button
                onClick={submitBooking}
                disabled={!bookBrand || !bookModel || !bookService || !bookDate || !bookPhone}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors text-lg mt-2"
              >
                {isUk ? "Записатись" : "Book Now"}
              </button>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-2xl font-bold mb-2">
                {isUk ? "Запис прийнято!" : "Booking Confirmed!"}
              </h3>
              <p className="text-blue-200 mb-1">
                {bookBrand} {bookModel} — {bookService}
              </p>
              <p className="text-blue-200 mb-4">
                {isUk ? "Дата:" : "Date:"} {bookDate} | {isUk ? "Тел:" : "Phone:"} {bookPhone}
              </p>
              <p className="text-sm text-blue-300">
                {isUk
                  ? "Наш менеджер зв'яжеться з вами протягом 30 хвилин для підтвердження"
                  : "Our manager will contact you within 30 minutes to confirm"}
              </p>
              <button
                onClick={() => { setBookDone(false); setBookBrand(""); setBookModel(""); setBookService(""); setBookDate(""); setBookPhone(""); }}
                className="mt-6 border border-white/40 hover:border-white text-white px-6 py-2 rounded-lg transition-colors"
              >
                {isUk ? "Новий запис" : "New Booking"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ═══════ WHY US ═══════ */}
      <section id="about" className="py-16 px-4 bg-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2 text-blue-900">
            {isUk ? "Чому обирають нас?" : "Why Choose Us?"}
          </h2>
          <p className="text-center text-gray-500 dark:text-neutral-400 mb-10">
            {isUk ? "4 причини довірити нам ваше авто" : "4 reasons to trust us with your car"}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_US.map((item) => (
              <div key={item.en} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="text-4xl mb-3">{item.emoji}</div>
                <h3 className="font-bold text-blue-800 mb-2">{isUk ? item.uk : item.en}</h3>
                <p className="text-sm text-gray-600">{isUk ? item.descUk : item.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ REVIEWS ═══════ */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2 text-blue-900">
            {isUk ? "Відгуки клієнтів" : "Customer Reviews"}
          </h2>
          <p className="text-center text-gray-500 dark:text-neutral-400 mb-10">
            {isUk ? "Що кажуть власники авто" : "What car owners say"}
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={i} className="bg-gray-50 dark:bg-neutral-900 rounded-xl p-6 border border-gray-200 dark:border-neutral-700 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-800 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{r.name}</div>
                    <div className="text-xs text-gray-400">{r.car}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-yellow-500">{"⭐".repeat(r.stars)}</span>
                  <span className="text-xs text-gray-400">{r.date}</span>
                </div>
                <div className="mb-2">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                    {isUk ? r.serviceUk : r.serviceEn}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-neutral-300 leading-relaxed flex-1">
                  &ldquo;{isUk ? r.textUk : r.textEn}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer id="contact" className="bg-blue-900 text-white py-12 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {/* info */}
          <div>
            <div className="text-xl font-bold mb-3 flex items-center gap-2">
              <span>🔧</span> {isUk ? "Майстер Плюс" : "Master Plus"}
            </div>
            <p className="text-sm text-blue-300 leading-relaxed">
              {isUk
                ? "Автосервіс повного циклу. Обслуговуємо легкові автомобілі, кросовери та мікроавтобуси всіх марок."
                : "Full-cycle auto service. We service cars, crossovers, and vans of all brands."}
            </p>
          </div>

          {/* contacts */}
          <div>
            <h4 className="font-bold mb-3">{isUk ? "Контакти" : "Contacts"}</h4>
            <div className="space-y-2 text-sm text-blue-200">
              <p>📍 {isUk ? "вул. Промислова 18, Київ" : "18 Promyslova St, Kyiv"}</p>
              <p>📞 +380 (44) 555-12-34</p>
              <p>📧 info@masterplus.ua</p>
              <p className="text-red-400 font-semibold">
                🚨 {isUk ? "Евакуатор 24/7:" : "Tow Truck 24/7:"} +380 (67) 999-00-00
              </p>
            </div>
          </div>

          {/* hours */}
          <div>
            <h4 className="font-bold mb-3">{isUk ? "Графік роботи" : "Working Hours"}</h4>
            <div className="space-y-2 text-sm text-blue-200">
              <p>{isUk ? "Пн–Сб: 08:00 – 20:00" : "Mon–Sat: 08:00 – 20:00"}</p>
              <p>{isUk ? "Нд: вихідний" : "Sun: closed"}</p>
              <div className="mt-3 bg-blue-800 rounded-lg p-3 text-center">
                <p className="text-xs text-blue-400 mb-1">{isUk ? "Евакуатор" : "Tow Truck"}</p>
                <p className="font-bold text-red-400">24/7</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-blue-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-blue-400">
          <p>&copy; 2026 {isUk ? "Майстер Плюс. Усі права захищені." : "Master Plus. All rights reserved."}</p>
          <p>{isUk ? "Демо-сайт — Codeworth" : "Demo site — Codeworth"}</p>
        </div>
      </footer>
    </div>
  );
}
