"use client";

import { useState } from "react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

const EVENT_TYPES = [
  { id: "wedding",    labelEn: "Wedding",          labelUk: "Весілля",         emoji: "💍", basePrice: 5000 },
  { id: "corporate",  labelEn: "Corporate Event",  labelUk: "Корпоратив",      emoji: "🏢", basePrice: 3000 },
  { id: "birthday",   labelEn: "Birthday",         labelUk: "День народження", emoji: "🎂", basePrice: 1500 },
  { id: "graduation", labelEn: "Graduation",       labelUk: "Випускний",       emoji: "🎓", basePrice: 2000 },
  { id: "party",      labelEn: "Private Party",    labelUk: "Приватна вечірка",emoji: "🥂", basePrice: 1800 },
  { id: "themed",     labelEn: "Themed Party",     labelUk: "Тематична вечірка",emoji: "🎭", basePrice: 2200 },
];

const SERVICES = [
  { emoji: "📋", titleEn: "Full Planning",           titleUk: "Повна організація",      descEn: "End-to-end event management from concept to completion. We handle every detail so you don't have to.", descUk: "Комплексне управління заходом від концепції до реалізації. Ми дбаємо про кожну деталь." },
  { emoji: "🌸", titleEn: "Decoration",              titleUk: "Декорування",            descEn: "Stunning floral arrangements, lighting, themed décor and stage design that transform any venue.", descUk: "Вишукані квіткові композиції, освітлення та тематичний декор, що перетворять будь-який простір." },
  { emoji: "🍽️", titleEn: "Catering Coordination",  titleUk: "Координація кейтерингу", descEn: "Curated menus, top-tier caterers, bar service and dietary accommodations for every guest.", descUk: "Авторські меню, провідні кейтерингові компанії та обслуговування бару для кожного гостя." },
  { emoji: "🎤", titleEn: "Entertainment",           titleUk: "Розваги",                descEn: "Live bands, DJs, performers, photo booths and interactive activities to energize your event.", descUk: "Живі гурти, DJ, артисти, фотозони та інтерактивні активності для незабутньої атмосфери." },
  { emoji: "📸", titleEn: "Photography & Video",    titleUk: "Фото та відео",          descEn: "Professional photographers and videographers to capture every magical moment in stunning detail.", descUk: "Професійні фотографи та відеографи, що зафіксують кожен чарівний момент." },
  { emoji: "🚐", titleEn: "Transport",               titleUk: "Транспорт",              descEn: "Luxury vehicle coordination for guests, VIP transfers and wedding car arrangements.", descUk: "Координація розкішних автомобілів для гостей, VIP-трансфери та весільні кортежі." },
];

const PORTFOLIO = [
  { emoji: "💍", category: "Wedding",    categoryUk: "Весілля",    nameEn: "Sophia & Daniel — Grand Ballroom", nameUk: "Софія & Данило — Великий зал", guests: 220, year: 2025 },
  { emoji: "🏢", category: "Corporate", categoryUk: "Корпоратив", nameEn: "TechCorp Annual Gala 2025",        nameUk: "Щорічний гала ТехКорп 2025",    guests: 450, year: 2025 },
  { emoji: "🎂", category: "Birthday",  categoryUk: "День нар.",  nameEn: "Victoria's Rooftop 30th",          nameUk: "Вечірка Вікторії на даху",      guests: 80,  year: 2024 },
  { emoji: "🎓", category: "Graduation",categoryUk: "Випускний",  nameEn: "KNEU Class of 2025",               nameUk: "Випускники КНЕУ 2025",          guests: 310, year: 2025 },
  { emoji: "🎭", category: "Themed",    categoryUk: "Тематична",  nameEn: "Great Gatsby Masquerade Ball",     nameUk: "Маскарад у стилі Великого Ґетсбі", guests: 150, year: 2024 },
  { emoji: "🥂", category: "Party",     categoryUk: "Вечірка",    nameEn: "New Year Eve Celebration 2025",   nameUk: "Святкування Нового року 2025",  guests: 200, year: 2024 },
];

const WHY_US = [
  { emoji: "🏆", titleEn: "10+ Years Experience", titleUk: "10+ років досвіду", descEn: "Over a decade of creating unforgettable events across Ukraine and Europe.", descUk: "Більше десяти років створення незабутніх подій по всій Україні та Європі." },
  { emoji: "✨", titleEn: "Premium Vendors",       titleUk: "Преміум партнери",  descEn: "Exclusive partnerships with the best florists, caterers, musicians and venues.", descUk: "Ексклюзивні партнерства з найкращими флористами, кейтерингом та музикантами." },
  { emoji: "🎯", titleEn: "Tailored to You",       titleUk: "Індивідуальний підхід", descEn: "Every event is unique — we design bespoke experiences that reflect your vision.", descUk: "Кожен захід унікальний — ми створюємо події, що відображають ваше бачення." },
  { emoji: "💬", titleEn: "24/7 Support",          titleUk: "Підтримка 24/7",    descEn: "Your dedicated event manager is always available from planning through the final toast.", descUk: "Ваш особистий менеджер доступний від початку планування до останнього тосту." },
];

const TESTIMONIALS = [
  { name: "Олена & Дмитро В.", event: "Wedding / Весілля", date: "Oct 2025", rating: 5, text: "EventMaster перевершили всі наші очікування! Весілля було казковим — від квіткового декору до шоу-програми. Ми досі отримуємо компліменти від гостей.", textEn: "EventMaster exceeded all our expectations! The wedding was fairy-tale perfect — from the floral décor to the show program." },
  { name: "Andriy K., CEO",     event: "Corporate Gala / Корпоратив", date: "Dec 2025", rating: 5, text: "Organized our company's 15th anniversary gala for 400 guests. Flawless execution, stunning venue transformation and our team was truly impressed. Highly recommend.", textEn: "Organized our 15th anniversary gala for 400 guests. Flawless execution, stunning décor and our team was truly impressed." },
  { name: "Марина Т.",          event: "Birthday Party / День народження", date: "Sep 2025", rating: 5, text: "Дякую за організацію мого ювілею! Тематична вечірка в стилі Великого Ґетсбі виявилась просто чарівною. Всі гості були в захваті!", textEn: "Thank you for organizing my anniversary! The Great Gatsby themed party was absolutely magical. All guests were delighted!" },
];

const VENUE_PRICE: Record<string, number> = {
  outdoor:    1.0,
  indoor:     1.1,
  restaurant: 1.3,
  hall:       1.5,
};

const SERVICE_PRICES: Record<string, number> = {
  decoration:    800,
  catering:      1200,
  entertainment: 600,
  photography:   700,
};

function calcPrice(guests: number, eventType: string, services: string[], venue: string) {
  const base = EVENT_TYPES.find(e => e.id === eventType)?.basePrice ?? 2000;
  const guestMultiplier = guests / 50;
  const servicesTotal = services.reduce((acc, s) => acc + (SERVICE_PRICES[s] ?? 0), 0);
  const venueMult = VENUE_PRICE[venue] ?? 1.0;
  const subtotal = (base * guestMultiplier + servicesTotal) * venueMult;
  const low = Math.round(subtotal * 0.9 / 100) * 100;
  const high = Math.round(subtotal * 1.15 / 100) * 100;
  return { low, high, base: Math.round(base * guestMultiplier), servicesTotal: Math.round(servicesTotal * venueMult), venueFactor: venueMult };
}

export function EventMasterDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [activeNav, setActiveNav] = useState("events");
  const [guests, setGuests] = useState(80);
  const [eventType, setEventType] = useState("wedding");
  const [services, setServices] = useState<string[]>(["decoration", "catering"]);
  const [venue, setVenue] = useState("hall");
  const [activePortfolio, setActivePortfolio] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", date: "", type: "wedding", guests: "50-100", budget: "3000-6000", message: "" });
  const [formSent, setFormSent] = useState(false);

  const toggleService = (s: string) => {
    setServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const price = calcPrice(guests, eventType, services, venue);

  const navItems = [
    { id: "events",    labelEn: "Events",    labelUk: "Події" },
    { id: "services",  labelEn: "Services",  labelUk: "Послуги" },
    { id: "portfolio", labelEn: "Portfolio", labelUk: "Портфоліо" },
    { id: "prices",    labelEn: "Prices",    labelUk: "Ціни" },
    { id: "contact",   labelEn: "Contact",   labelUk: "Контакт" },
  ];

  return (
    <div className="min-h-screen bg-purple-950 text-white font-sans overflow-x-hidden">

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 bg-purple-950/95 backdrop-blur border-b border-purple-800/40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="shrink-0 flex items-center gap-2">
            <span className="text-2xl">✨</span>
            <span className="text-xl font-black tracking-tight">
              <span className="text-white">Event</span>
              <span className="text-amber-400">Master</span>
            </span>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeNav === item.id
                    ? "bg-amber-400 text-purple-950"
                    : "text-purple-200 hover:text-white hover:bg-purple-800/50"
                }`}
              >
                {isUk ? item.labelUk : item.labelEn}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <button className="shrink-0 bg-amber-400 hover:bg-amber-300 text-purple-950 font-bold text-sm px-5 py-2.5 rounded-full transition-all shadow-lg shadow-amber-400/25">
            {isUk ? "Отримати пропозицію" : "Get Quote"}
          </button>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-linear-to-br from-purple-950 via-purple-900 to-violet-900 py-28 px-4">
        {/* Decorative confetti blobs */}
        <span className="absolute top-10 left-[8%]  text-5xl opacity-60 animate-bounce" style={{ animationDelay: "0s",    animationDuration: "3s" }}>🎉</span>
        <span className="absolute top-24 right-[12%] text-4xl opacity-50 animate-bounce" style={{ animationDelay: "0.8s",  animationDuration: "2.7s" }}>🎊</span>
        <span className="absolute top-16 left-[30%]  text-3xl opacity-40 animate-bounce" style={{ animationDelay: "1.2s",  animationDuration: "3.5s" }}>🎈</span>
        <span className="absolute top-32 right-[30%] text-5xl opacity-30 animate-bounce" style={{ animationDelay: "0.4s",  animationDuration: "2.5s" }}>✨</span>
        <span className="absolute bottom-20 left-[18%] text-4xl opacity-40 animate-bounce" style={{ animationDelay: "1.6s", animationDuration: "4s" }}>🎉</span>
        <span className="absolute bottom-16 right-[20%] text-3xl opacity-35 animate-bounce" style={{ animationDelay: "2s",   animationDuration: "3.2s" }}>🎊</span>
        <span className="absolute top-48 left-[55%]   text-2xl opacity-25 animate-bounce" style={{ animationDelay: "0.6s",  animationDuration: "2.9s" }}>🎈</span>

        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(167,139,250,0.18),transparent)] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-amber-400/15 border border-amber-400/30 rounded-full px-5 py-2 text-amber-300 text-sm font-semibold mb-8">
            <span>🌟</span>
            <span>{isUk ? "Преміум агентство подій з 2013 року" : "Premium Event Agency since 2013"}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            {isUk ? (
              <>
                <span className="text-white">Ваше Свято —</span>
                <br />
                <span className="text-amber-400">Наша Пристрасть</span>
              </>
            ) : (
              <>
                <span className="text-white">Your Celebration —</span>
                <br />
                <span className="text-amber-400">Our Passion</span>
              </>
            )}
          </h1>

          <p className="text-purple-200 text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed">
            {isUk
              ? "Ми перетворюємо ваші мрії на незабутні події. Від камерних вечірок до масштабних торжеств — кожна деталь в надійних руках."
              : "We turn your dreams into unforgettable events. From intimate gatherings to grand celebrations — every detail in expert hands."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-amber-400 hover:bg-amber-300 text-purple-950 font-black text-lg px-10 py-4 rounded-full transition-all shadow-2xl shadow-amber-400/30 hover:scale-105">
              {isUk ? "✨ Спланувати захід" : "✨ Plan My Event"}
            </button>
            <button className="border-2 border-purple-400 hover:border-amber-400 text-white hover:text-amber-400 font-bold text-lg px-10 py-4 rounded-full transition-all">
              {isUk ? "▶ Переглянути портфоліо" : "▶ View Portfolio"}
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { num: "500+", labelEn: "Events Done",   labelUk: "Подій" },
              { num: "12K+", labelEn: "Happy Guests",  labelUk: "Гостей" },
              { num: "98%",  labelEn: "Satisfaction",  labelUk: "Задоволені" },
            ].map(s => (
              <div key={s.num} className="text-center">
                <div className="text-3xl font-black text-amber-400">{s.num}</div>
                <div className="text-purple-300 text-sm mt-1">{isUk ? s.labelUk : s.labelEn}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENT TYPES ── */}
      <section className="py-20 px-4 bg-purple-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-3">
              <span className="text-white">{isUk ? "Типи " : "Types of "}</span>
              <span className="text-amber-400">{isUk ? "Подій" : "Events"}</span>
            </h2>
            <p className="text-purple-300 text-lg">{isUk ? "Ми організовуємо будь-яке свято на найвищому рівні" : "We organize any celebration at the highest level"}</p>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none">
            {EVENT_TYPES.map(et => (
              <div
                key={et.id}
                className="shrink-0 snap-start w-56 bg-linear-to-br from-purple-900 to-purple-800 border border-purple-700/50 hover:border-amber-400/50 rounded-2xl p-6 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-400/10 group"
              >
                <div className="mb-4"><EmojiIcon emoji={et.emoji} className="w-14 h-14" /></div>
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-amber-400 transition-colors">
                  {isUk ? et.labelUk : et.labelEn}
                </h3>
                <p className="text-purple-300 text-sm">
                  {isUk
                    ? `Від ${et.basePrice.toLocaleString()} ₴`
                    : `From $${et.basePrice.toLocaleString()}`}
                </p>
                <div className="mt-4 text-amber-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  {isUk ? "Дізнатися більше →" : "Learn more →"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-20 px-4 bg-purple-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-3">
              <span className="text-amber-400">{isUk ? "Наші " : "Our "}</span>
              <span className="text-white">{isUk ? "Послуги" : "Services"}</span>
            </h2>
            <p className="text-purple-300 text-lg">{isUk ? "Повний спектр послуг для вашої ідеальної події" : "Full spectrum of services for your perfect event"}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((svc, i) => (
              <div key={i} className="bg-purple-900/60 border border-purple-700/40 hover:border-amber-400/40 rounded-2xl p-7 transition-all hover:shadow-lg hover:shadow-purple-900/50 group">
                <div className="mb-4"><EmojiIcon emoji={svc.emoji} className="w-10 h-10" /></div>
                <h3 className="text-white font-bold text-xl mb-3 group-hover:text-amber-400 transition-colors">
                  {isUk ? svc.titleUk : svc.titleEn}
                </h3>
                <p className="text-purple-300 text-sm leading-relaxed">
                  {isUk ? svc.descUk : svc.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUDGET ESTIMATOR ── */}
      <section className="py-20 px-4 bg-linear-to-br from-purple-950 to-violet-950">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-3">
              <span className="text-white">{isUk ? "Калькулятор " : "Budget "}</span>
              <span className="text-amber-400">{isUk ? "Бюджету" : "Estimator"}</span>
            </h2>
            <p className="text-purple-300 text-lg">{isUk ? "Отримайте орієнтовну вартість вашого заходу в реальному часі" : "Get a real-time estimate for your event"}</p>
          </div>

          <div className="bg-purple-900/70 border border-purple-700/50 rounded-3xl p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left: Controls */}
              <div className="space-y-7">
                {/* Guest count */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-white font-bold">{isUk ? "Кількість гостей" : "Guest Count"}</label>
                    <span className="bg-amber-400 text-purple-950 font-black text-lg px-4 py-1 rounded-full">{guests}</span>
                  </div>
                  <input
                    type="range" min={10} max={500} step={10}
                    value={guests}
                    onChange={e => setGuests(Number(e.target.value))}
                    className="w-full accent-amber-400 h-2 cursor-pointer"
                  />
                  <div className="flex justify-between text-purple-400 text-xs mt-1">
                    <span>10</span><span>500</span>
                  </div>
                </div>

                {/* Event type */}
                <div>
                  <label className="text-white font-bold block mb-3">{isUk ? "Тип події" : "Event Type"}</label>
                  <select
                    value={eventType}
                    onChange={e => setEventType(e.target.value)}
                    className="w-full bg-purple-800 border border-purple-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    {EVENT_TYPES.map(et => (
                      <option key={et.id} value={et.id}>
                        {et.emoji} {isUk ? et.labelUk : et.labelEn}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Venue type */}
                <div>
                  <label className="text-white font-bold block mb-3">{isUk ? "Тип майданчика" : "Venue Type"}</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "outdoor",    labelEn: "Outdoor",     labelUk: "Надворі" },
                      { id: "indoor",     labelEn: "Indoor",      labelUk: "В приміщенні" },
                      { id: "restaurant", labelEn: "Restaurant",  labelUk: "Ресторан" },
                      { id: "hall",       labelEn: "Event Hall",  labelUk: "Зал подій" },
                    ].map(v => (
                      <button
                        key={v.id}
                        onClick={() => setVenue(v.id)}
                        className={`py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                          venue === v.id
                            ? "bg-amber-400 text-purple-950 border-amber-400"
                            : "bg-purple-800/50 border-purple-600 text-purple-200 hover:border-amber-400/50"
                        }`}
                      >
                        {isUk ? v.labelUk : v.labelEn}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Services */}
                <div>
                  <label className="text-white font-bold block mb-3">{isUk ? "Додаткові послуги" : "Additional Services"}</label>
                  <div className="space-y-2">
                    {[
                      { id: "decoration",    labelEn: "Decoration",             labelUk: "Декорування",          price: 800 },
                      { id: "catering",      labelEn: "Catering Coordination",  labelUk: "Координація кейтерингу",price: 1200 },
                      { id: "entertainment", labelEn: "Entertainment",          labelUk: "Розваги",               price: 600 },
                      { id: "photography",   labelEn: "Photo & Video",          labelUk: "Фото та відео",         price: 700 },
                    ].map(sv => (
                      <label key={sv.id} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={services.includes(sv.id)}
                          onChange={() => toggleService(sv.id)}
                          className="w-5 h-5 accent-amber-400 rounded cursor-pointer"
                        />
                        <span className="text-purple-200 group-hover:text-white transition-colors text-sm flex-1">
                          {isUk ? sv.labelUk : sv.labelEn}
                        </span>
                        <span className="text-amber-400 text-xs font-semibold">+${sv.price.toLocaleString()}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Price output */}
              <div className="flex flex-col gap-5">
                <div className="bg-linear-to-br from-amber-400/15 to-purple-800/30 border border-amber-400/30 rounded-2xl p-7 text-center">
                  <div className="text-purple-300 text-sm mb-2">{isUk ? "Орієнтовна вартість" : "Estimated Price Range"}</div>
                  <div className="text-4xl font-black text-amber-400 mb-1">
                    ${price.low.toLocaleString()} — ${price.high.toLocaleString()}
                  </div>
                  <div className="text-purple-400 text-xs">{isUk ? "Фінальна ціна після консультації" : "Final price after consultation"}</div>
                </div>

                {/* Breakdown */}
                <div className="bg-purple-800/40 border border-purple-700/40 rounded-2xl p-6 space-y-3">
                  <div className="text-white font-bold text-sm mb-2">{isUk ? "Розбивка по категоріях:" : "Price Breakdown:"}</div>
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-300">{isUk ? "Базова організація" : "Base Planning"}</span>
                    <span className="text-white font-semibold">${price.base.toLocaleString()}</span>
                  </div>
                  {services.includes("decoration") && (
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-300">{isUk ? "Декорування" : "Decoration"}</span>
                      <span className="text-white font-semibold">${Math.round(SERVICE_PRICES.decoration * price.venueFactor).toLocaleString()}</span>
                    </div>
                  )}
                  {services.includes("catering") && (
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-300">{isUk ? "Кейтеринг" : "Catering"}</span>
                      <span className="text-white font-semibold">${Math.round(SERVICE_PRICES.catering * price.venueFactor).toLocaleString()}</span>
                    </div>
                  )}
                  {services.includes("entertainment") && (
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-300">{isUk ? "Розваги" : "Entertainment"}</span>
                      <span className="text-white font-semibold">${Math.round(SERVICE_PRICES.entertainment * price.venueFactor).toLocaleString()}</span>
                    </div>
                  )}
                  {services.includes("photography") && (
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-300">{isUk ? "Фото & відео" : "Photo & Video"}</span>
                      <span className="text-white font-semibold">${Math.round(SERVICE_PRICES.photography * price.venueFactor).toLocaleString()}</span>
                    </div>
                  )}
                  {price.venueFactor > 1 && (
                    <div className="flex justify-between text-sm border-t border-purple-700/40 pt-2">
                      <span className="text-purple-400 text-xs">{isUk ? "Коеф. майданчика" : "Venue Factor"} ×{price.venueFactor.toFixed(1)}</span>
                      <span className="text-amber-400/80 text-xs">applied</span>
                    </div>
                  )}
                </div>

                <button className="w-full bg-amber-400 hover:bg-amber-300 text-purple-950 font-black py-4 rounded-xl transition-all shadow-lg shadow-amber-400/20 hover:scale-[1.02] text-lg">
                  {isUk ? "✉ Замовити консультацію" : "✉ Request Consultation"}
                </button>

                <p className="text-purple-400 text-xs text-center leading-relaxed">
                  {isUk
                    ? "Безкоштовна консультація. Без зобов'язань."
                    : "Free consultation. No obligations."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section className="py-20 px-4 bg-purple-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-3">
              <span className="text-amber-400">{isUk ? "Наше " : "Our "}</span>
              <span className="text-white">{isUk ? "Портфоліо" : "Portfolio"}</span>
            </h2>
            <p className="text-purple-300 text-lg">{isUk ? "Обрані роботи, якими ми пишаємось" : "Selected works we're proud of"}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PORTFOLIO.map((item, i) => (
              <div
                key={i}
                className={`rounded-2xl overflow-hidden border transition-all cursor-pointer ${
                  activePortfolio === i
                    ? "border-amber-400 shadow-xl shadow-amber-400/20"
                    : "border-purple-700/40 hover:border-purple-500/60"
                }`}
                onClick={() => setActivePortfolio(activePortfolio === i ? null : i)}
              >
                {/* Emoji thumbnail */}
                <div className="h-44 bg-linear-to-br from-purple-800 to-violet-900 flex items-center justify-center relative">
                  <EmojiIcon emoji={item.emoji} className="w-16 h-16" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-amber-400 text-purple-950 text-xs font-bold px-3 py-1 rounded-full">
                      {isUk ? item.categoryUk : item.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-purple-950/80 text-purple-300 text-xs px-2 py-1 rounded-full">
                    {item.year}
                  </div>
                </div>

                <div className="bg-purple-900/70 p-5">
                  <h3 className="text-white font-bold text-base mb-1">
                    {isUk ? item.nameUk : item.nameEn}
                  </h3>
                  <p className="text-purple-400 text-sm mb-4">
                    👥 {item.guests} {isUk ? "гостей" : "guests"}
                  </p>

                  {activePortfolio === i && (
                    <div className="mb-4 p-3 bg-purple-800/50 rounded-xl text-purple-200 text-sm leading-relaxed">
                      {isUk
                        ? "Захід організований з урахуванням найменших деталей. Індивідуальна концепція, преміум декор та бездоганний сервіс для кожного гостя."
                        : "Event organized with attention to every detail. Bespoke concept, premium décor and flawless service for every guest."}
                    </div>
                  )}

                  <button className="w-full border border-amber-400/50 hover:bg-amber-400/10 text-amber-400 text-sm font-semibold py-2 rounded-xl transition-all">
                    {activePortfolio === i
                      ? (isUk ? "Згорнути ↑" : "Collapse ↑")
                      : (isUk ? "Переглянути деталі" : "View Details")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-20 px-4 bg-linear-to-br from-violet-900/40 to-purple-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-3">
              <span className="text-white">{isUk ? "Чому обирають " : "Why Choose "}</span>
              <span className="text-amber-400">EventMaster</span>
            </h2>
            <p className="text-purple-300 text-lg">{isUk ? "Нас відрізняє пристрасть до досконалості" : "What sets us apart is our passion for perfection"}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_US.map((item, i) => (
              <div key={i} className="bg-purple-900/50 border border-purple-700/30 rounded-2xl p-7 text-center hover:border-amber-400/40 transition-all group">
                <div className="mb-5"><EmojiIcon emoji={item.emoji} className="w-14 h-14" /></div>
                <h3 className="text-white font-bold text-lg mb-3 group-hover:text-amber-400 transition-colors">
                  {isUk ? item.titleUk : item.titleEn}
                </h3>
                <p className="text-purple-300 text-sm leading-relaxed">
                  {isUk ? item.descUk : item.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 px-4 bg-purple-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-3">
              <span className="text-amber-400">{isUk ? "Відгуки " : "Client "}</span>
              <span className="text-white">{isUk ? "Клієнтів" : "Reviews"}</span>
            </h2>
            <p className="text-purple-300 text-lg">{isUk ? "Що кажуть наші клієнти" : "What our clients say about us"}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-purple-900/60 border border-purple-700/40 rounded-2xl p-7 flex flex-col">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} className="text-amber-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-purple-200 text-sm leading-relaxed flex-1 mb-6 italic">
                  "{isUk ? t.text : t.textEn}"
                </p>
                <div className="border-t border-purple-700/40 pt-4">
                  <div className="text-white font-bold">{t.name}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-amber-400 text-xs font-semibold">{t.event}</span>
                    <span className="text-purple-500 text-xs">•</span>
                    <span className="text-purple-400 text-xs">{t.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT / QUOTE FORM ── */}
      <section className="py-20 px-4 bg-linear-to-br from-purple-900 to-violet-950">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-3">
              <span className="text-white">{isUk ? "Замовити " : "Request a "}</span>
              <span className="text-amber-400">{isUk ? "Консультацію" : "Quote"}</span>
            </h2>
            <p className="text-purple-300 text-lg">{isUk ? "Розкажіть нам про вашу мрію — ми зробимо її реальністю" : "Tell us about your dream — we'll make it a reality"}</p>
          </div>

          {formSent ? (
            <div className="bg-amber-400/15 border border-amber-400/40 rounded-3xl p-12 text-center">
              <div className="text-6xl mb-6">🎉</div>
              <h3 className="text-2xl font-black text-white mb-3">
                {isUk ? "Дякуємо! Ми зв'яжемось з вами незабаром." : "Thank you! We'll be in touch shortly."}
              </h3>
              <p className="text-purple-300">
                {isUk ? "Очікуйте на дзвінок або лист протягом 24 годин." : "Expect a call or email within 24 hours."}
              </p>
              <button
                onClick={() => setFormSent(false)}
                className="mt-8 border border-amber-400/50 text-amber-400 hover:bg-amber-400/10 px-8 py-3 rounded-full font-semibold transition-all"
              >
                {isUk ? "Надіслати ще один запит" : "Send another request"}
              </button>
            </div>
          ) : (
            <form
              onSubmit={e => { e.preventDefault(); setFormSent(true); }}
              className="bg-purple-900/60 border border-purple-700/40 rounded-3xl p-8 md:p-10 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-purple-300 text-sm font-semibold block mb-2">{isUk ? "Ваше ім'я *" : "Your Name *"}</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    placeholder={isUk ? "Ім'я та прізвище" : "Full name"}
                    className="w-full bg-purple-800/60 border border-purple-600 text-white placeholder-purple-500 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-purple-300 text-sm font-semibold block mb-2">{isUk ? "Телефон *" : "Phone *"}</label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                    placeholder="+38 (0__) ___ __ __"
                    className="w-full bg-purple-800/60 border border-purple-600 text-white placeholder-purple-500 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-purple-300 text-sm font-semibold block mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                  placeholder={isUk ? "ваш@email.com" : "your@email.com"}
                  className="w-full bg-purple-800/60 border border-purple-600 text-white placeholder-purple-500 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-purple-300 text-sm font-semibold block mb-2">{isUk ? "Дата події" : "Event Date"}</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={e => setFormData(p => ({ ...p, date: e.target.value }))}
                    className="w-full bg-purple-800/60 border border-purple-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-purple-300 text-sm font-semibold block mb-2">{isUk ? "Тип події" : "Event Type"}</label>
                  <select
                    value={formData.type}
                    onChange={e => setFormData(p => ({ ...p, type: e.target.value }))}
                    className="w-full bg-purple-800/60 border border-purple-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    {EVENT_TYPES.map(et => (
                      <option key={et.id} value={et.id}>
                        {et.emoji} {isUk ? et.labelUk : et.labelEn}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-purple-300 text-sm font-semibold block mb-2">{isUk ? "Кількість гостей" : "Guest Count"}</label>
                  <select
                    value={formData.guests}
                    onChange={e => setFormData(p => ({ ...p, guests: e.target.value }))}
                    className="w-full bg-purple-800/60 border border-purple-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    {["10-30","30-50","50-100","100-200","200-350","350+"].map(g => (
                      <option key={g} value={g}>{g} {isUk ? "гостей" : "guests"}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-purple-300 text-sm font-semibold block mb-2">{isUk ? "Орієнтовний бюджет" : "Budget Range"}</label>
                  <select
                    value={formData.budget}
                    onChange={e => setFormData(p => ({ ...p, budget: e.target.value }))}
                    className="w-full bg-purple-800/60 border border-purple-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    {[
                      { v:"до $2000",     l: "up to $2,000" },
                      { v:"$2000-$5000",  l: "$2,000–$5,000" },
                      { v:"$5000-$10000", l: "$5,000–$10,000" },
                      { v:"$10000+",      l: "$10,000+" },
                      { v:"не визначено", l: "Not sure yet" },
                    ].map(b => (
                      <option key={b.v} value={b.v}>{isUk ? b.v : b.l}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-purple-300 text-sm font-semibold block mb-2">{isUk ? "Розкажіть про вашу подію" : "Tell us about your event"}</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  placeholder={isUk ? "Ваші побажання, ідеї, особливі вимоги..." : "Your wishes, ideas, special requirements..."}
                  className="w-full bg-purple-800/60 border border-purple-600 text-white placeholder-purple-500 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-400 hover:bg-amber-300 text-purple-950 font-black text-lg py-4 rounded-xl transition-all shadow-lg shadow-amber-400/20 hover:scale-[1.01]"
              >
                {isUk ? "🎉 Надіслати запит" : "🎉 Send Request"}
              </button>

              <p className="text-purple-500 text-xs text-center">
                {isUk
                  ? "Ми відповідаємо протягом 24 годин. Конфіденційність гарантована."
                  : "We respond within 24 hours. Your information is kept confidential."}
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-purple-950 border-t border-purple-800/50 pt-16 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">✨</span>
                <span className="text-2xl font-black">
                  <span className="text-white">Event</span>
                  <span className="text-amber-400">Master</span>
                </span>
              </div>
              <p className="text-purple-300 text-sm leading-relaxed mb-6 max-w-xs">
                {isUk
                  ? "Преміум агентство подій. Ми створюємо незабутні святкування з 2013 року. Ваша подія в найкращих руках."
                  : "Premium event agency. Creating unforgettable celebrations since 2013. Your event in the best hands."}
              </p>
              <div className="flex gap-3">
                {["📘", "📸", "💬", "▶"].map((icon, i) => (
                  <button key={i} className="w-10 h-10 bg-purple-800 hover:bg-amber-400 hover:text-purple-950 text-white rounded-xl transition-all flex items-center justify-center text-lg">
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-bold mb-4">{isUk ? "Послуги" : "Services"}</h4>
              <ul className="space-y-2">
                {(isUk
                  ? ["Весілля", "Корпоративи", "Дні народження", "Випускні", "Вечірки", "Тематичні заходи"]
                  : ["Weddings", "Corporate Events", "Birthdays", "Graduations", "Parties", "Themed Events"]
                ).map(item => (
                  <li key={item}>
                    <button className="text-purple-300 hover:text-amber-400 text-sm transition-colors">{item}</button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacts */}
            <div>
              <h4 className="text-white font-bold mb-4">{isUk ? "Контакти" : "Contacts"}</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">📍</span>
                  <span className="text-purple-300">{isUk ? "вул. Хрещатик 22, Київ" : "22 Khreshchatyk St, Kyiv"}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-400">📞</span>
                  <a href="tel:+380442001122" className="text-purple-300 hover:text-white transition-colors">+38 (044) 200-11-22</a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-400">📱</span>
                  <a href="tel:+380671234567" className="text-purple-300 hover:text-white transition-colors">+38 (067) 123-45-67</a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-400">✉</span>
                  <a href="mailto:hello@eventmaster.ua" className="text-purple-300 hover:text-white transition-colors">hello@eventmaster.ua</a>
                </li>
                <li className="flex items-center gap-2 mt-2">
                  <span className="text-amber-400">🕐</span>
                  <span className="text-purple-300">{isUk ? "Пн–Нд 9:00–20:00" : "Mon–Sun 9:00–20:00"}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-purple-800/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-purple-500 text-sm">
              © 2025 EventMaster. {isUk ? "Всі права захищені." : "All rights reserved."}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-amber-400 text-sm">✨</span>
              <span className="text-purple-400 text-sm italic">
                {isUk ? "Кожен захід — шедевр" : "Every event — a masterpiece"}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
