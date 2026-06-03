"use client";

import { useState } from "react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

export function SwiftCargoDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  /* ── Shipment Tracker ── */
  const [trackingInput, setTrackingInput] = useState("");
  const [trackingResult, setTrackingResult] = useState(false);

  /* ── Shipping Calculator ── */
  const [calcOrigin, setCalcOrigin] = useState("kyiv");
  const [calcDest, setCalcDest] = useState("warsaw");
  const [calcWeight, setCalcWeight] = useState("500");
  const [calcLength, setCalcLength] = useState("120");
  const [calcWidth, setCalcWidth] = useState("80");
  const [calcHeight, setCalcHeight] = useState("100");
  const [calcCargoType, setCalcCargoType] = useState("general");
  const [calcUrgency, setCalcUrgency] = useState("standard");
  const [calcResult, setCalcResult] = useState(false);

  /* ── Contact / Quote Form ── */
  const [quoteCompany, setQuoteCompany] = useState("");
  const [quoteCargo, setQuoteCargo] = useState("");
  const [quoteOrigin, setQuoteOrigin] = useState("");
  const [quoteDest, setQuoteDest] = useState("");
  const [quoteWeight, setQuoteWeight] = useState("");
  const [quoteDate, setQuoteDate] = useState("");
  const [quoteContact, setQuoteContact] = useState("");
  const [quotePhone, setQuotePhone] = useState("");
  const [quoteSent, setQuoteSent] = useState(false);

  /* ── Active nav ── */
  const [mobileMenu, setMobileMenu] = useState(false);

  /* ── Data ── */
  const NAV = [
    { labelEn: "Services", labelUk: "Послуги", href: "#services" },
    { labelEn: "Fleet", labelUk: "Автопарк", href: "#fleet" },
    { labelEn: "Tracking", labelUk: "Відстеження", href: "#tracking" },
    { labelEn: "Coverage", labelUk: "Покриття", href: "#coverage" },
    { labelEn: "Contact", labelUk: "Контакти", href: "#contact" },
  ];

  const SERVICES = [
    { emoji: "🚛", nameEn: "FTL (Full Truck Load)", nameUk: "FTL (Повне Завантаження)", descEn: "Dedicated truck for your cargo. Ideal for large-volume B2B shipments across Europe.", descUk: "Окремий транспорт для вашого вантажу. Ідеально для великих обсягів B2B перевезень по Європі.", timeEn: "2–5 days", timeUk: "2–5 днів" },
    { emoji: "📦", nameEn: "LTL (Less Than Truck)", nameUk: "LTL (Часткове Завантаження)", descEn: "Share truck space and cut costs. Perfect for palletized goods and medium loads.", descUk: "Спільне завантаження зменшує витрати. Ідеально для палетних та середніх вантажів.", timeEn: "3–7 days", timeUk: "3–7 днів" },
    { emoji: "✈️", nameEn: "Express / Urgent", nameUk: "Експрес / Терміново", descEn: "Time-critical deliveries with guaranteed deadlines. Air + road combined routes.", descUk: "Термінові доставки з гарантованими дедлайнами. Комбіновані авіа + авто маршрути.", timeEn: "1–2 days", timeUk: "1–2 дні" },
    { emoji: "🏭", nameEn: "Warehousing", nameUk: "Складські Послуги", descEn: "Secure warehousing with inventory management, cross-docking and order fulfillment.", descUk: "Безпечне зберігання з управлінням запасами, крос-докінг та комплектація замовлень.", timeEn: "Flexible", timeUk: "Гнучко" },
    { emoji: "📋", nameEn: "Customs Clearance", nameUk: "Митне Оформлення", descEn: "Full customs brokerage, documentation handling, tariff classification and compliance.", descUk: "Повне митне оформлення, документація, класифікація тарифів та відповідність.", timeEn: "1–3 days", timeUk: "1–3 дні" },
    { emoji: "🚐", nameEn: "Last Mile Delivery", nameUk: "Доставка «Остання Миля»", descEn: "Final-stage delivery to end recipients. Specialized B2B last-mile logistics.", descUk: "Фінальна доставка кінцевим отримувачам. Спеціалізована B2B логістика останньої милі.", timeEn: "Same day", timeUk: "В той же день" },
  ];

  const TRACKING_STEPS = [
    { statusEn: "Picked Up", statusUk: "Забрано", locationEn: "Kyiv, Warehouse #3", locationUk: "Київ, Склад №3", dateEn: "Mar 22, 09:15", dateUk: "22 бер, 09:15", done: true },
    { statusEn: "In Transit", statusUk: "У дорозі", locationEn: "Lviv, Transit Hub", locationUk: "Львів, Транзитний Хаб", dateEn: "Mar 22, 18:40", dateUk: "22 бер, 18:40", done: true },
    { statusEn: "Customs Clearance", statusUk: "Митне Оформлення", locationEn: "Krakovets Border Crossing", locationUk: "МП Краковець", dateEn: "Mar 23, 06:20", dateUk: "23 бер, 06:20", done: true },
    { statusEn: "Out for Delivery", statusUk: "На Доставці", locationEn: "Warsaw, Distribution Center", locationUk: "Варшава, Розподільчий Центр", dateEn: "Mar 23, 14:55", dateUk: "23 бер, 14:55", done: false, current: true },
    { statusEn: "Delivered", statusUk: "Доставлено", locationEn: "Warsaw, Client Address", locationUk: "Варшава, Адреса Клієнта", dateEn: "Estimated: Mar 24", dateUk: "Очікується: 24 бер", done: false },
  ];

  const FLEET = [
    { emoji: "🚐", nameEn: "Van", nameUk: "Фургон", capacityEn: "Up to 1.5 t", capacityUk: "До 1.5 т", dimEn: "3.5 × 1.8 × 1.9 m", dimUk: "3.5 × 1.8 × 1.9 м", cargoEn: "Documents, electronics, small parcels", cargoUk: "Документи, електроніка, малі відправлення" },
    { emoji: "🚛", nameEn: "Truck (5t)", nameUk: "Вантажівка (5т)", capacityEn: "Up to 5 t", capacityUk: "До 5 т", dimEn: "6.2 × 2.4 × 2.4 m", dimUk: "6.2 × 2.4 × 2.4 м", cargoEn: "Palletized goods, furniture, equipment", cargoUk: "Палетні товари, меблі, обладнання" },
    { emoji: "🚚", nameEn: "Trailer (20t)", nameUk: "Причіп (20т)", capacityEn: "Up to 20 t", capacityUk: "До 20 т", dimEn: "13.6 × 2.45 × 2.7 m", dimUk: "13.6 × 2.45 × 2.7 м", cargoEn: "Bulk cargo, industrial materials, containers", cargoUk: "Масові вантажі, промислові матеріали, контейнери" },
    { emoji: "🧊", nameEn: "Refrigerated", nameUk: "Рефрижератор", capacityEn: "Up to 18 t", capacityUk: "До 18 т", dimEn: "13.6 × 2.45 × 2.5 m", dimUk: "13.6 × 2.45 × 2.5 м", cargoEn: "Perishables, pharma, temperature-sensitive", cargoUk: "Швидкопсувні, фарма, температурний режим" },
  ];

  const CITIES = [
    { nameEn: "Kyiv", nameUk: "Київ", x: 55, y: 30 },
    { nameEn: "Lviv", nameUk: "Львів", x: 22, y: 28 },
    { nameEn: "Odesa", nameUk: "Одеса", x: 48, y: 62 },
    { nameEn: "Kharkiv", nameUk: "Харків", x: 78, y: 25 },
    { nameEn: "Dnipro", nameUk: "Дніпро", x: 68, y: 42 },
    { nameEn: "Zaporizhzhia", nameUk: "Запоріжжя", x: 70, y: 52 },
    { nameEn: "Warsaw", nameUk: "Варшава", x: 12, y: 12, intl: true },
    { nameEn: "Bucharest", nameUk: "Бухарест", x: 38, y: 72, intl: true },
    { nameEn: "Berlin", nameUk: "Берлін", x: 5, y: 5, intl: true },
  ];

  const ROUTES: [number, number][] = [
    [0, 1], [0, 2], [0, 3], [0, 4], [4, 5], [4, 2], [1, 6], [6, 8], [2, 7], [3, 4],
  ];

  const WHY_US = [
    { emoji: "📡", titleEn: "Real-Time GPS Tracking", titleUk: "GPS-Трекінг у Реальному Часі", descEn: "Monitor every shipment in real time. Full visibility from pickup to delivery with live map updates.", descUk: "Відстежуйте кожне відправлення в реальному часі. Повна видимість від забору до доставки." },
    { emoji: "🛡️", titleEn: "Cargo Insurance", titleUk: "Страхування Вантажів", descEn: "Full cargo insurance coverage up to €500,000. Protect your business from unforeseen events.", descUk: "Повне страхове покриття вантажів до €500 000. Захист вашого бізнесу від непередбачених подій." },
    { emoji: "🌡️", titleEn: "Temperature Control", titleUk: "Температурний Контроль", descEn: "Advanced refrigerated fleet with continuous monitoring from -25°C to +25°C for sensitive cargo.", descUk: "Сучасний рефрижераторний парк з безперервним моніторингом від -25°C до +25°C." },
    { emoji: "🕐", titleEn: "24/7 Support", titleUk: "Підтримка 24/7", descEn: "Dedicated account managers available around the clock. Immediate response to any logistic query.", descUk: "Персональні менеджери доступні цілодобово. Негайна відповідь на будь-яке логістичне питання." },
  ];

  const CLIENT_LOGOS = [
    { nameEn: "TechParts Inc.", nameUk: "ТехЧастини" },
    { nameEn: "AgroExport UA", nameUk: "АгроЕкспорт" },
    { nameEn: "EuroPharma", nameUk: "ЄвроФарма" },
    { nameEn: "MetalWorks Group", nameUk: "МеталВоркс" },
    { nameEn: "FoodChain EU", nameUk: "ФудЧейн" },
    { nameEn: "BuildSupply Co.", nameUk: "БудПостач" },
  ];

  const CALC_CITIES: { value: string; labelEn: string; labelUk: string }[] = [
    { value: "kyiv", labelEn: "Kyiv", labelUk: "Київ" },
    { value: "lviv", labelEn: "Lviv", labelUk: "Львів" },
    { value: "odesa", labelEn: "Odesa", labelUk: "Одеса" },
    { value: "kharkiv", labelEn: "Kharkiv", labelUk: "Харків" },
    { value: "dnipro", labelEn: "Dnipro", labelUk: "Дніпро" },
    { value: "warsaw", labelEn: "Warsaw", labelUk: "Варшава" },
    { value: "bucharest", labelEn: "Bucharest", labelUk: "Бухарест" },
    { value: "berlin", labelEn: "Berlin", labelUk: "Берлін" },
  ];

  const CARGO_TYPES: { value: string; labelEn: string; labelUk: string; mult: number }[] = [
    { value: "general", labelEn: "General Cargo", labelUk: "Загальний вантаж", mult: 1 },
    { value: "fragile", labelEn: "Fragile", labelUk: "Крихкий", mult: 1.3 },
    { value: "perishable", labelEn: "Perishable", labelUk: "Швидкопсувний", mult: 1.5 },
    { value: "hazardous", labelEn: "Hazardous", labelUk: "Небезпечний", mult: 1.8 },
  ];

  /* ── Calculator logic ── */
  function getCalcEstimate() {
    const w = parseFloat(calcWeight) || 100;
    const vol = ((parseFloat(calcLength) || 100) * (parseFloat(calcWidth) || 80) * (parseFloat(calcHeight) || 100)) / 5000;
    const chargeableWeight = Math.max(w, vol);
    const intl = ["warsaw", "bucharest", "berlin"].includes(calcDest) || ["warsaw", "bucharest", "berlin"].includes(calcOrigin);
    const baseRate = intl ? 3.2 : 1.8;
    const cargoMult = CARGO_TYPES.find(c => c.value === calcCargoType)?.mult ?? 1;
    const urgencyMult = calcUrgency === "express" ? 1.6 : 1;
    const price = Math.round(chargeableWeight * baseRate * cargoMult * urgencyMult);
    const low = Math.round(price * 0.85);
    const high = Math.round(price * 1.15);
    const days = calcUrgency === "express" ? (intl ? "1–2" : "1") : (intl ? "3–5" : "2–3");
    return { low, high, days };
  }

  const estimate = getCalcEstimate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 text-gray-900">
      {/* ══════════ HEADER ══════════ */}
      <header className="bg-[#1e3a5f] text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight">🚛 SwiftCargo</span>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV.map(n => (
              <a key={n.href} href={n.href} className="text-sm text-gray-200 hover:text-orange-400 transition-colors">
                {isUk ? n.labelUk : n.labelEn}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="#contact" className="hidden sm:inline-block bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors">
              {isUk ? "Отримати Ціну" : "Get Quote"}
            </a>
            {/* Mobile burger */}
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden text-2xl" aria-label="Menu">
              {mobileMenu ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileMenu && (
          <nav className="md:hidden border-t border-white/10 px-4 pb-4 flex flex-col gap-2">
            {NAV.map(n => (
              <a key={n.href} href={n.href} onClick={() => setMobileMenu(false)} className="text-sm text-gray-200 hover:text-orange-400 py-1">
                {isUk ? n.labelUk : n.labelEn}
              </a>
            ))}
            <a href="#contact" onClick={() => setMobileMenu(false)} className="bg-orange-500 text-white text-sm font-semibold px-4 py-2 rounded-lg text-center mt-1">
              {isUk ? "Отримати Ціну" : "Get Quote"}
            </a>
          </nav>
        )}
      </header>

      {/* ══════════ HERO ══════════ */}
      <section className="bg-linear-to-br from-[#1e3a5f] to-[#0c4a6e] text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            {isUk ? "Логістика без Кордонів" : "Logistics Without Borders"}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            {isUk
              ? "Надійні B2B перевезення по Україні та Європі. Від одного палета до повного завантаження — доставляємо вчасно, кожного разу."
              : "Reliable B2B shipping across Ukraine and Europe. From a single pallet to full truckloads — delivered on time, every time."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="#contact" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-lg transition-colors text-lg">
              {isUk ? "Отримати Ціну" : "Get Quote"}
            </a>
            <a href="#tracking" className="border-2 border-white/40 hover:border-orange-400 hover:text-orange-400 text-white font-bold px-8 py-3 rounded-lg transition-colors text-lg">
              {isUk ? "Відстежити Вантаж" : "Track Shipment"}
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { val: "10,000+", labelEn: "Deliveries / Month", labelUk: "Доставок / Місяць" },
              { val: "15", labelEn: "Countries Covered", labelUk: "Країн Покриття" },
              { val: "99.2%", labelEn: "On-Time Rate", labelUk: "Вчасних Доставок" },
            ].map(s => (
              <div key={s.val} className="bg-white/10 backdrop-blur rounded-xl p-5">
                <div className="text-3xl font-extrabold text-orange-400">{s.val}</div>
                <div className="text-sm text-gray-300 mt-1">{isUk ? s.labelUk : s.labelEn}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ SERVICES ══════════ */}
      <section id="services" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#1e3a5f] mb-3">
            {isUk ? "Наші Послуги" : "Our Services"}
          </h2>
          <p className="text-center text-gray-500 dark:text-neutral-400 mb-10 max-w-2xl mx-auto">
            {isUk
              ? "Повний спектр логістичних рішень для бізнесу будь-якого масштабу"
              : "Full range of logistics solutions for businesses of any scale"}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map(s => (
              <div key={s.nameEn} className="border border-gray-200 dark:border-neutral-700 rounded-xl p-6 hover:shadow-lg hover:border-orange-300 transition-all group">
                <div className="mb-3"><EmojiIcon emoji={s.emoji} className="w-10 h-10" /></div>
                <h3 className="text-lg font-bold text-[#1e3a5f] mb-2 group-hover:text-orange-600 transition-colors">
                  {isUk ? s.nameUk : s.nameEn}
                </h3>
                <p className="text-sm text-gray-600 dark:text-neutral-300 mb-3">{isUk ? s.descUk : s.descEn}</p>
                <div className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full">
                  ⏱ {isUk ? s.timeUk : s.timeEn}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ SHIPMENT TRACKER ══════════ */}
      <section id="tracking" className="py-16 px-4 bg-[#e5e7eb]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#1e3a5f] mb-3">
            {isUk ? "Відстеження Вантажу" : "Shipment Tracker"}
          </h2>
          <p className="text-center text-gray-600 dark:text-neutral-300 mb-8">
            {isUk
              ? "Введіть номер відстеження для перевірки статусу вашого вантажу"
              : "Enter your tracking number to check your shipment status"}
          </p>

          <div className="flex gap-3 mb-8">
            <input
              type="text"
              value={trackingInput}
              onChange={e => setTrackingInput(e.target.value)}
              placeholder={isUk ? "Наприклад: SC-2026-78452" : "e.g. SC-2026-78452"}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button
              onClick={() => setTrackingResult(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-lg transition-colors shrink-0"
            >
              {isUk ? "Знайти" : "Track"}
            </button>
          </div>

          {trackingResult && (
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-xs text-gray-400 dark:text-neutral-500 uppercase tracking-wide">{isUk ? "Номер" : "Tracking #"}</div>
                  <div className="font-bold text-[#1e3a5f]">{trackingInput || "SC-2026-78452"}</div>
                </div>
                <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">
                  {isUk ? "У дорозі" : "In Transit"}
                </span>
              </div>

              <div className="relative">
                {TRACKING_STEPS.map((step, i) => (
                  <div key={step.statusEn} className="flex gap-4 mb-6 last:mb-0">
                    {/* Timeline dot + line */}
                    <div className="flex flex-col items-center">
                      <div className={`w-4 h-4 rounded-full shrink-0 border-2 ${
                        step.current ? "bg-orange-500 border-orange-500 ring-4 ring-orange-200" :
                        step.done ? "bg-[#1e3a5f] border-[#1e3a5f]" :
                        "bg-gray-200 border-gray-300"
                      }`} />
                      {i < TRACKING_STEPS.length - 1 && (
                        <div className={`w-0.5 flex-1 min-h-[28px] ${step.done ? "bg-[#1e3a5f]" : "bg-gray-200"}`} />
                      )}
                    </div>

                    <div className={`pb-2 ${step.current ? "text-orange-600" : step.done ? "text-gray-800" : "text-gray-400"}`}>
                      <div className="font-semibold text-sm">{isUk ? step.statusUk : step.statusEn}</div>
                      <div className="text-xs">{isUk ? step.locationUk : step.locationEn}</div>
                      <div className="text-xs opacity-70">{isUk ? step.dateUk : step.dateEn}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ══════════ SHIPPING CALCULATOR ══════════ */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#1e3a5f] mb-3">
            {isUk ? "Калькулятор Вартості" : "Shipping Calculator"}
          </h2>
          <p className="text-center text-gray-500 dark:text-neutral-400 mb-10">
            {isUk
              ? "Отримайте попередню оцінку вартості перевезення за кілька кліків"
              : "Get a preliminary shipping estimate in just a few clicks"}
          </p>

          <div className="bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* Origin */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-neutral-400 mb-1 uppercase">
                  {isUk ? "Місто Відправлення" : "Origin City"}
                </label>
                <select value={calcOrigin} onChange={e => setCalcOrigin(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none bg-white">
                  {CALC_CITIES.map(c => <option key={c.value} value={c.value}>{isUk ? c.labelUk : c.labelEn}</option>)}
                </select>
              </div>
              {/* Destination */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-neutral-400 mb-1 uppercase">
                  {isUk ? "Місто Призначення" : "Destination City"}
                </label>
                <select value={calcDest} onChange={e => setCalcDest(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none bg-white">
                  {CALC_CITIES.map(c => <option key={c.value} value={c.value}>{isUk ? c.labelUk : c.labelEn}</option>)}
                </select>
              </div>
            </div>

            {/* Weight + Dimensions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-neutral-400 mb-1 uppercase">
                  {isUk ? "Вага (кг)" : "Weight (kg)"}
                </label>
                <input type="number" value={calcWeight} onChange={e => setCalcWeight(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-neutral-400 mb-1 uppercase">
                  {isUk ? "Довж. (см)" : "L (cm)"}
                </label>
                <input type="number" value={calcLength} onChange={e => setCalcLength(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-neutral-400 mb-1 uppercase">
                  {isUk ? "Шир. (см)" : "W (cm)"}
                </label>
                <input type="number" value={calcWidth} onChange={e => setCalcWidth(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-neutral-400 mb-1 uppercase">
                  {isUk ? "Вис. (см)" : "H (cm)"}
                </label>
                <input type="number" value={calcHeight} onChange={e => setCalcHeight(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none" />
              </div>
            </div>

            {/* Cargo type + Urgency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-neutral-400 mb-1 uppercase">
                  {isUk ? "Тип Вантажу" : "Cargo Type"}
                </label>
                <select value={calcCargoType} onChange={e => setCalcCargoType(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none bg-white">
                  {CARGO_TYPES.map(ct => <option key={ct.value} value={ct.value}>{isUk ? ct.labelUk : ct.labelEn}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-neutral-400 mb-1 uppercase">
                  {isUk ? "Терміновість" : "Urgency"}
                </label>
                <select value={calcUrgency} onChange={e => setCalcUrgency(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none bg-white">
                  <option value="standard">{isUk ? "Стандарт (3–7 днів)" : "Standard (3–7 days)"}</option>
                  <option value="express">{isUk ? "Експрес (1–2 дні)" : "Express (1–2 days)"}</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => setCalcResult(true)}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-colors"
            >
              {isUk ? "Розрахувати" : "Calculate Estimate"}
            </button>

            {calcResult && (
              <div className="mt-6 bg-linear-to-br from-[#1e3a5f] to-[#0c4a6e] text-white rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-wide text-gray-300 mb-1">
                    {isUk ? "Попередня Оцінка" : "Estimated Price Range"}
                  </div>
                  <div className="text-3xl font-extrabold text-orange-400">
                    €{estimate.low} – €{estimate.high}
                  </div>
                </div>
                <div className="text-center sm:text-right">
                  <div className="text-xs uppercase tracking-wide text-gray-300 mb-1">
                    {isUk ? "Орієнтовний Термін" : "Estimated Delivery"}
                  </div>
                  <div className="text-2xl font-bold">
                    {estimate.days} {isUk ? "днів" : "days"}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══════════ FLEET ══════════ */}
      <section id="fleet" className="py-16 px-4 bg-[#e5e7eb]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#1e3a5f] mb-10">
            {isUk ? "Наш Автопарк" : "Our Fleet"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FLEET.map(v => (
              <div key={v.nameEn} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4 text-center"><EmojiIcon emoji={v.emoji} className="w-14 h-14" /></div>
                <h3 className="text-lg font-bold text-[#1e3a5f] text-center mb-3">
                  {isUk ? v.nameUk : v.nameEn}
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">{isUk ? "Вантажність" : "Capacity"}</span>
                    <span className="font-semibold">{isUk ? v.capacityUk : v.capacityEn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{isUk ? "Розміри" : "Dimensions"}</span>
                    <span className="font-semibold text-xs">{isUk ? v.dimUk : v.dimEn}</span>
                  </div>
                  <div className="pt-2 border-t border-gray-100">
                    <span className="text-gray-500 dark:text-neutral-400 text-xs">{isUk ? "Підходить для:" : "Suitable for:"}</span>
                    <p className="text-xs text-gray-700 dark:text-neutral-300 mt-1">{isUk ? v.cargoUk : v.cargoEn}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ COVERAGE MAP ══════════ */}
      <section id="coverage" className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#1e3a5f] mb-3">
            {isUk ? "Географія Покриття" : "Coverage Map"}
          </h2>
          <p className="text-center text-gray-500 dark:text-neutral-400 mb-10">
            {isUk
              ? "Регулярні маршрути між ключовими містами України та Європи"
              : "Regular routes between key cities in Ukraine and Europe"}
          </p>

          <div className="relative bg-linear-to-br from-[#1e3a5f] to-[#0c4a6e] rounded-2xl overflow-hidden" style={{ paddingBottom: "60%" }}>
            <svg viewBox="0 0 100 80" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
              {/* Route lines */}
              {ROUTES.map(([a, b], i) => (
                <line
                  key={i}
                  x1={CITIES[a].x}
                  y1={CITIES[a].y}
                  x2={CITIES[b].x}
                  y2={CITIES[b].y}
                  stroke="#fb923c"
                  strokeWidth="0.3"
                  strokeDasharray={CITIES[a].intl || CITIES[b].intl ? "1,0.5" : "none"}
                  opacity="0.6"
                />
              ))}
              {/* City dots + labels */}
              {CITIES.map(c => (
                <g key={c.nameEn}>
                  <circle cx={c.x} cy={c.y} r={c.intl ? 1.2 : 1.6} fill={c.intl ? "#fb923c" : "#f97316"} />
                  <circle cx={c.x} cy={c.y} r={c.intl ? 2.4 : 3} fill={c.intl ? "#fb923c" : "#f97316"} opacity="0.2" />
                  <text
                    x={c.x}
                    y={c.y - 3}
                    textAnchor="middle"
                    fill="white"
                    fontSize="2.8"
                    fontWeight="bold"
                  >
                    {isUk ? c.nameUk : c.nameEn}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-orange-500 inline-block" />
              <span className="text-gray-600">{isUk ? "Українські міста" : "Ukrainian cities"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-orange-300 inline-block" />
              <span className="text-gray-600">{isUk ? "Міжнародні хаби" : "International hubs"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-8 border-t-2 border-dashed border-orange-400 inline-block" />
              <span className="text-gray-600">{isUk ? "Міжнародні маршрути" : "International routes"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ WHY US ══════════ */}
      <section className="py-16 px-4 bg-linear-to-br from-[#1e3a5f] to-[#0c4a6e] text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">
            {isUk ? "Чому SwiftCargo?" : "Why SwiftCargo?"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_US.map(item => (
              <div key={item.titleEn} className="bg-white/10 backdrop-blur rounded-xl p-6 text-center hover:bg-white/15 transition-colors">
                <div className="mb-3"><EmojiIcon emoji={item.emoji} className="w-10 h-10" /></div>
                <h3 className="font-bold text-lg mb-2">{isUk ? item.titleUk : item.titleEn}</h3>
                <p className="text-sm text-gray-300">{isUk ? item.descUk : item.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CLIENT LOGOS ══════════ */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-[#1e3a5f] mb-2">
            {isUk ? "Нам Довіряють" : "Trusted By"}
          </h2>
          <p className="text-center text-gray-500 dark:text-neutral-400 text-sm mb-8">
            {isUk
              ? "Логістичний партнер для провідних B2B компаній"
              : "Logistics partner for leading B2B companies"}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CLIENT_LOGOS.map(cl => (
              <div key={cl.nameEn} className="border border-gray-200 dark:border-neutral-700 rounded-lg p-4 flex items-center justify-center h-20 bg-gray-50 dark:bg-neutral-900 hover:border-orange-300 transition-colors">
                <span className="text-sm font-bold text-gray-400">{isUk ? cl.nameUk : cl.nameEn}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CONTACT / QUOTE FORM ══════════ */}
      <section id="contact" className="py-16 px-4 bg-[#e5e7eb]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#1e3a5f] mb-3">
            {isUk ? "Запит Комерційної Пропозиції" : "Request a Quote"}
          </h2>
          <p className="text-center text-gray-600 dark:text-neutral-300 mb-10">
            {isUk
              ? "Заповніть форму і наш менеджер зв'яжеться з вами протягом 1 години"
              : "Fill in the form and our manager will contact you within 1 hour"}
          </p>

          {quoteSent ? (
            <div className="bg-white rounded-xl p-10 text-center shadow-md">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-[#1e3a5f] mb-2">
                {isUk ? "Запит Надіслано!" : "Quote Request Sent!"}
              </h3>
              <p className="text-gray-600">
                {isUk
                  ? "Наш менеджер зв'яжеться з вами протягом 1 години у робочий час."
                  : "Our manager will contact you within 1 business hour."}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-neutral-400 mb-1 uppercase">
                    {isUk ? "Назва Компанії" : "Company Name"}
                  </label>
                  <input type="text" value={quoteCompany} onChange={e => setQuoteCompany(e.target.value)}
                    placeholder={isUk ? "ТОВ «Приклад»" : "Acme Corp"}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-neutral-400 mb-1 uppercase">
                    {isUk ? "Контактна Особа" : "Contact Person"}
                  </label>
                  <input type="text" value={quoteContact} onChange={e => setQuoteContact(e.target.value)}
                    placeholder={isUk ? "Іван Петренко" : "John Smith"}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none" />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-500 dark:text-neutral-400 mb-1 uppercase">
                  {isUk ? "Опис Вантажу" : "Cargo Description"}
                </label>
                <textarea value={quoteCargo} onChange={e => setQuoteCargo(e.target.value)}
                  rows={3}
                  placeholder={isUk ? "Електроніка, 12 палетів, потребує обережного поводження" : "Electronics, 12 pallets, requires careful handling"}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none resize-none" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-neutral-400 mb-1 uppercase">
                    {isUk ? "Місто Відправлення" : "Origin City"}
                  </label>
                  <input type="text" value={quoteOrigin} onChange={e => setQuoteOrigin(e.target.value)}
                    placeholder={isUk ? "Київ" : "Kyiv"}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-neutral-400 mb-1 uppercase">
                    {isUk ? "Місто Призначення" : "Destination City"}
                  </label>
                  <input type="text" value={quoteDest} onChange={e => setQuoteDest(e.target.value)}
                    placeholder={isUk ? "Варшава" : "Warsaw"}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-neutral-400 mb-1 uppercase">
                    {isUk ? "Вага (кг)" : "Weight (kg)"}
                  </label>
                  <input type="text" value={quoteWeight} onChange={e => setQuoteWeight(e.target.value)}
                    placeholder="500"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-neutral-400 mb-1 uppercase">
                    {isUk ? "Бажана Дата" : "Preferred Date"}
                  </label>
                  <input type="date" value={quoteDate} onChange={e => setQuoteDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-neutral-400 mb-1 uppercase">
                    {isUk ? "Телефон" : "Phone"}
                  </label>
                  <input type="tel" value={quotePhone} onChange={e => setQuotePhone(e.target.value)}
                    placeholder="+380 67 123 4567"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none" />
                </div>
              </div>

              <button
                onClick={() => setQuoteSent(true)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-colors mt-2"
              >
                {isUk ? "Надіслати Запит" : "Submit Quote Request"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="bg-[#1e3a5f] text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div>
              <div className="text-xl font-bold mb-3">🚛 SwiftCargo</div>
              <p className="text-sm text-gray-300">
                {isUk
                  ? "Професійні B2B логістичні рішення для бізнесу. Перевезення по Україні та Європі з 2012 року."
                  : "Professional B2B logistics solutions. Shipping across Ukraine and Europe since 2012."}
              </p>
            </div>

            {/* HQ */}
            <div>
              <h4 className="font-bold mb-3 text-orange-400">{isUk ? "Головний Офіс" : "Headquarters"}</h4>
              <div className="text-sm text-gray-300 space-y-1">
                <p>{isUk ? "вул. Логістична 42, оф. 301" : "42 Logistychna St., Office 301"}</p>
                <p>{isUk ? "Київ, 02000" : "Kyiv, 02000"}</p>
                <p>{isUk ? "Україна" : "Ukraine"}</p>
                <p className="pt-1">+380 44 123 4567</p>
                <p>info@swiftcargo.ua</p>
              </div>
            </div>

            {/* Regional offices */}
            <div>
              <h4 className="font-bold mb-3 text-orange-400">{isUk ? "Регіональні Офіси" : "Regional Offices"}</h4>
              <div className="text-sm text-gray-300 space-y-1">
                <p>{isUk ? "Львів — вул. Промислова 18" : "Lviv — 18 Promyslova St."}</p>
                <p>{isUk ? "Одеса — вул. Портова 7" : "Odesa — 7 Portova St."}</p>
                <p>{isUk ? "Дніпро — пр. Індустріальний 55" : "Dnipro — 55 Industrial Ave."}</p>
                <p>{isUk ? "Харків — вул. Вантажна 12" : "Kharkiv — 12 Vantazhna St."}</p>
              </div>
            </div>

            {/* Licenses */}
            <div>
              <h4 className="font-bold mb-3 text-orange-400">{isUk ? "Ліцензії та Страхування" : "Licenses & Insurance"}</h4>
              <div className="text-sm text-gray-300 space-y-1">
                <p>{isUk ? "Ліцензія перевізника №АВ-78452" : "Carrier License #AB-78452"}</p>
                <p>{isUk ? "CMR-страхування до €500 000" : "CMR Insurance up to €500,000"}</p>
                <p>{isUk ? "ISO 9001:2015 сертифіковано" : "ISO 9001:2015 Certified"}</p>
                <p>{isUk ? "Член FIATA та IRU" : "FIATA & IRU Member"}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-400">
            <p>&copy; 2026 SwiftCargo. {isUk ? "Усі права захищені." : "All rights reserved."}</p>
            <p>{isUk ? "Це демо-сайт, створений Codeworth" : "This is a demo site built by Codeworth"}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
