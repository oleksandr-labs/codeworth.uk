"use client";

import { useState } from "react";

const SERVICES = [
  { id: "brows", emoji: "🤨", nameUk: "Корекція брів", nameEn: "Brow Design", timeUk: "60 хв", timeEn: "60 min", priceFrom: 450, catColor: "bg-amber-100 text-amber-700" },
  { id: "lashes", emoji: "👁️", nameUk: "Нарощування вій", nameEn: "Lash Extensions", timeUk: "90–150 хв", timeEn: "90–150 min", priceFrom: 900, catColor: "bg-rose-100 text-rose-700" },
  { id: "makeup", emoji: "💄", nameUk: "Макіяж", nameEn: "Makeup", timeUk: "75 хв", timeEn: "75 min", priceFrom: 700, catColor: "bg-pink-100 text-pink-700" },
  { id: "nails", emoji: "💅", nameUk: "Манікюр / Педикюр", nameEn: "Mani / Pedi", timeUk: "60–120 хв", timeEn: "60–120 min", priceFrom: 380, catColor: "bg-purple-100 text-purple-700" },
  { id: "face", emoji: "✨", nameUk: "Догляд за обличчям", nameEn: "Facial Care", timeUk: "60–90 хв", timeEn: "60–90 min", priceFrom: 1200, catColor: "bg-sky-100 text-sky-700" },
  { id: "massage", emoji: "🫧", nameUk: "Масаж", nameEn: "Massage", timeUk: "60–90 хв", timeEn: "60–90 min", priceFrom: 650, catColor: "bg-green-100 text-green-700" },
];

const MASTERS = [
  { name: "Аліна Романова", specUk: "Брови · Корекція та фарбування", specEn: "Brows · Design & tinting", rating: 4.9, reviews: 234, stageUk: "7 років досвіду", stageEn: "7 years experience", emoji: "👩‍🦰", services: ["brows", "makeup"] },
  { name: "Катерина Мельник", specUk: "Нарощування вій · Ламінування", specEn: "Lash extensions · Lamination", rating: 5.0, reviews: 189, stageUk: "5 років досвіду", stageEn: "5 years experience", emoji: "👩‍🦱", services: ["lashes"] },
  { name: "Юлія Сидоренко", specUk: "Нігті · Гель-лак · Дизайн", specEn: "Nails · Gel polish · Art design", rating: 4.8, reviews: 312, stageUk: "9 років досвіду", stageEn: "9 years experience", emoji: "💅", services: ["nails"] },
  { name: "Ольга Бойченко", specUk: "Естетична косметологія · Догляд", specEn: "Aesthetic cosmetology · Care", rating: 4.9, reviews: 156, stageUk: "12 років досвіду", stageEn: "12 years experience", emoji: "🧖", services: ["face", "massage"] },
];

const BEFORE_AFTER = [
  { id: "brows", filter: "brows", procedureUk: "Корекція брів", procedureEn: "Brow design", masterName: "Аліна Романова", timeUk: "60 хв", timeEn: "60 min", beforeEmoji: "😐", afterEmoji: "🤩" },
  { id: "lashes", filter: "lashes", procedureUk: "Нарощування вій 2D", procedureEn: "2D Lash extensions", masterName: "Катерина Мельник", timeUk: "120 хв", timeEn: "120 min", beforeEmoji: "😶", afterEmoji: "😍" },
  { id: "nails", filter: "nails", procedureUk: "Манікюр + дизайн", procedureEn: "Manicure + nail art", masterName: "Юлія Сидоренко", timeUk: "90 хв", timeEn: "90 min", beforeEmoji: "✋", afterEmoji: "💅" },
  { id: "face", filter: "face", procedureUk: "Чищення обличчя ультразвуком", procedureEn: "Ultrasonic facial cleansing", masterName: "Ольга Бойченко", timeUk: "75 хв", timeEn: "75 min", beforeEmoji: "😔", afterEmoji: "🌟" },
];

const REVIEWS = [
  { name: "Марина К.", textUk: "Записуюсь до Аліни вже 2 роки — брови змінили моє обличчя. Рекомендую всім!", textEn: "I've been seeing Alina for 2 years — brows changed my whole face. Highly recommend!", rating: 5, serviceUk: "Корекція брів", serviceEn: "Brow design" },
  { name: "Олеся В.", textUk: "Катерина — чарівниця! Вії тримаються 4 тижні, жодної алергії. Salon is 💯", textEn: "Kateryna is a magician! Lashes last 4 weeks, zero allergies. Salon is 💯", rating: 5, serviceUk: "Нарощування вій", serviceEn: "Lash extensions" },
  { name: "Наталія Р.", textUk: "Студія — це клас. Запис онлайн за 2 хвилини, все точно в час, результат ідеальний.", textEn: "The studio is top class. Online booking in 2 minutes, everything on time, result is perfect.", rating: 5, serviceUk: "Манікюр", serviceEn: "Manicure" },
  { name: "Вікторія М.", textUk: "Loyalty Gold — дуже вигідно! За рік отримала 3 безкоштовні процедури. Спасибі Lumière!", textEn: "Loyalty Gold is so worth it! In a year I got 3 free procedures. Thank you Lumière!", rating: 5, serviceUk: "Догляд за обличчям", serviceEn: "Facial care" },
];

const TIMES = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
const BUSY_TIMES = ["11:00", "14:00", "16:00"];

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= Math.round(rating) ? "text-rose-400" : "text-stone-200"} style={{ fontSize: "13px" }}>★</span>
      ))}
    </span>
  );
}

export function LumiereDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingData] = useState({ service: "", master: "", date: "", time: "", name: "", phone: "" });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [beforeAfterFilter, setBeforeAfterFilter] = useState("all");
  const [beforeAfterShown, setBeforeAfterShown] = useState<Record<string, "before" | "after">>({});
  const [loyaltyLevel, setLoyaltyLevel] = useState<"silver" | "gold" | "platinum">("gold");
  const [activeService, setActiveService] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reviewsExpanded, setReviewsExpanded] = useState(false);

  const filteredBA = beforeAfterFilter === "all"
    ? BEFORE_AFTER
    : BEFORE_AFTER.filter((b) => b.filter === beforeAfterFilter);

  function openBooking(serviceId?: string, masterName?: string) {
    setBookingData({ service: serviceId ?? "", master: masterName ?? "", date: "", time: "", name: "", phone: "" });
    setBookingStep(1);
    setBookingConfirmed(false);
    setBookingOpen(true);
  }

  function closeBooking() {
    setBookingOpen(false);
    setBookingStep(1);
    setBookingConfirmed(false);
  }

  const loyaltyConfig = {
    silver: { label: "Silver", gradient: "bg-linear-to-br from-stone-300 to-stone-400", pct: "5%", perks: isUk ? ["5% знижка на всі послуги", "Онлайн запис"] : ["5% discount on all services", "Online booking"], points: 240 },
    gold: { label: "Gold", gradient: "bg-linear-to-br from-amber-300 to-amber-500", pct: "10%", perks: isUk ? ["10% знижка на всі послуги", "Пріоритетний запис", "Подарунок на день народження"] : ["10% discount on all services", "Priority booking", "Birthday gift"], points: 1480 },
    platinum: { label: "Platinum", gradient: "bg-linear-to-br from-rose-400 to-purple-500", pct: "15%", perks: isUk ? ["15% знижка на всі послуги", "Особистий менеджер", "Безкоштовна діагностика", "VIP-заходи"] : ["15% discount on all services", "Personal manager", "Free diagnostics", "VIP events"], points: 5600 },
  };

  const filterLabels = [
    { key: "all", uk: "Всі", en: "All" },
    { key: "brows", uk: "Брови", en: "Brows" },
    { key: "lashes", uk: "Вії", en: "Lashes" },
    { key: "nails", uk: "Нігті", en: "Nails" },
    { key: "face", uk: "Обличчя", en: "Face" },
  ];

  return (
    <div className="font-sans bg-[#FAF6F1] min-h-screen text-stone-800">

      {/* ── Sticky Nav ───────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#FAF6F1] border-b border-rose-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex flex-col leading-tight">
            <span className="font-serif italic text-2xl font-light text-rose-400 tracking-wide">Lumière</span>
            <span className="text-[9px] tracking-[0.2em] text-stone-400 uppercase">✦ Beauty Studio</span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7 text-sm text-stone-500">
            <a href="#services" className="hover:text-rose-400 transition-colors">{isUk ? "Послуги" : "Services"}</a>
            <a href="#masters" className="hover:text-rose-400 transition-colors">{isUk ? "Майстрині" : "Masters"}</a>
            <a href="#before-after" className="hover:text-rose-400 transition-colors">{isUk ? "До / Після" : "Before / After"}</a>
            <a href="#booking" className="hover:text-rose-400 transition-colors">{isUk ? "Бронювання" : "Booking"}</a>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLoyaltyLevel(loyaltyLevel === "silver" ? "gold" : loyaltyLevel === "gold" ? "platinum" : "silver")}
              className="hidden sm:flex items-center gap-1 text-xs text-rose-400 border border-rose-200 rounded-full px-3 py-1.5 hover:bg-rose-50 transition-colors"
            >
              <span>♥</span>
              <span className="capitalize">{loyaltyConfig[loyaltyLevel].label}</span>
            </button>
            <button
              onClick={() => openBooking()}
              className="bg-rose-400 hover:bg-rose-500 text-white text-sm px-4 py-2 rounded-full transition-colors"
            >
              {isUk ? "Записатись" : "Book Now"}
            </button>
            <button
              className="md:hidden text-stone-500 hover:text-rose-400 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FAF6F1] border-t border-rose-100 px-4 py-4 flex flex-col gap-3 text-sm text-stone-600">
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="hover:text-rose-400">{isUk ? "Послуги" : "Services"}</a>
            <a href="#masters" onClick={() => setMobileMenuOpen(false)} className="hover:text-rose-400">{isUk ? "Майстрині" : "Masters"}</a>
            <a href="#before-after" onClick={() => setMobileMenuOpen(false)} className="hover:text-rose-400">{isUk ? "До / Після" : "Before / After"}</a>
            <a href="#booking" onClick={() => setMobileMenuOpen(false)} className="hover:text-rose-400">{isUk ? "Бронювання" : "Booking"}</a>
          </div>
        )}
      </header>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="bg-linear-to-br from-rose-50 via-amber-50 to-stone-50 pt-20 pb-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white dark:bg-neutral-800 border border-rose-100 text-stone-600 text-xs px-4 py-2 rounded-full mb-8 shadow-sm">
                <span>⭐</span>
                <span>4.9 · {isUk ? "840 відгуків на Google" : "840 Google reviews"}</span>
              </div>
              <h1 className="font-serif italic font-light text-5xl md:text-6xl lg:text-7xl text-stone-800 leading-tight mb-6">
                {isUk ? "Краса, що говорить сама за себе" : "Beauty that speaks for itself"}
              </h1>
              <p className="text-stone-500 text-lg leading-relaxed mb-8 max-w-md">
                {isUk
                  ? "Преміальна б'юті-студія у серці міста. Підкресліть вашу природну красу з командою досвідчених майстринь."
                  : "Premium beauty studio in the heart of the city. Enhance your natural beauty with a team of experienced masters."}
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => openBooking()}
                  className="bg-rose-400 hover:bg-rose-500 text-white px-7 py-3 rounded-full text-sm font-medium transition-colors shadow-sm"
                >
                  {isUk ? "Забронювати процедуру" : "Book a procedure"}
                </button>
                <a
                  href="#services"
                  className="border border-rose-200 text-rose-400 hover:bg-rose-50 px-7 py-3 rounded-full text-sm font-medium transition-colors"
                >
                  {isUk ? "Переглянути послуги" : "View services"}
                </a>
              </div>
            </div>

            {/* Decorative emoji grid */}
            <div className="grid grid-cols-2 gap-4">
              {SERVICES.slice(0, 4).map((s) => (
                <div
                  key={s.id}
                  className="bg-white rounded-2xl p-6 flex flex-col items-center gap-3 border border-rose-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setActiveService(activeService === s.id ? null : s.id)}
                >
                  <span style={{ fontSize: "2.5rem" }}>{s.emoji}</span>
                  <span className="text-sm text-stone-600 text-center font-medium">{isUk ? s.nameUk : s.nameEn}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${s.catColor}`}>{isUk ? `від ${s.priceFrom} грн` : `from ${s.priceFrom} UAH`}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats band */}
          <div className="mt-16 bg-white dark:bg-neutral-800 rounded-2xl border border-rose-100 shadow-sm px-6 py-4 flex flex-wrap justify-around gap-4 text-center">
            {[
              { val: "6", label: isUk ? "категорій послуг" : "service categories" },
              { val: "4", label: isUk ? "майстрині" : "masters" },
              { val: "24/7", label: isUk ? "онлайн-запис" : "online booking" },
              { val: "Gold", label: isUk ? "програма лояльності" : "loyalty program" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-0.5">
                <span className="text-2xl font-light text-rose-400 font-serif italic">{stat.val}</span>
                <span className="text-xs text-stone-400">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────── */}
      <section id="services" className="bg-white py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.2em] text-rose-400 uppercase mb-3">✦ {isUk ? "Каталог" : "Catalogue"}</p>
            <h2 className="font-serif italic font-light text-4xl text-stone-800 mb-3">{isUk ? "Наші послуги" : "Our Services"}</h2>
            <p className="text-stone-400 text-sm max-w-md mx-auto">{isUk ? "Весь спектр б'юті-процедур під одним дахом" : "The full spectrum of beauty procedures under one roof"}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s) => (
              <div
                key={s.id}
                className={`rounded-2xl border transition-all cursor-pointer ${activeService === s.id ? "border-rose-300 shadow-md bg-rose-50" : "border-stone-100 bg-[#FAF6F1] hover:border-rose-200 hover:shadow-sm"}`}
                onClick={() => setActiveService(activeService === s.id ? null : s.id)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <span style={{ fontSize: "2rem" }}>{s.emoji}</span>
                    <span className={`text-xs px-2.5 py-1 rounded-full ${s.catColor}`}>{isUk ? s.nameUk : s.nameEn}</span>
                  </div>
                  <h3 className="font-medium text-stone-800 mb-1">{isUk ? s.nameUk : s.nameEn}</h3>
                  <div className="flex items-center justify-between mt-3 text-sm text-stone-400">
                    <span>⏱ {isUk ? s.timeUk : s.timeEn}</span>
                    <span className="text-rose-400 font-medium">{isUk ? `від ${s.priceFrom} ₴` : `from ${s.priceFrom} UAH`}</span>
                  </div>
                </div>
                {activeService === s.id && (
                  <div className="border-t border-rose-200 px-6 py-4 bg-white rounded-b-2xl">
                    <p className="text-sm text-stone-500 mb-3">
                      {isUk
                        ? `Процедура «${s.nameUk}» — індивідуальний підхід та преміальні матеріали. Результат, що перевершить очікування.`
                        : `The "${s.nameEn}" procedure — individual approach and premium materials. Results that will exceed your expectations.`}
                    </p>
                    <button
                      onClick={(e) => { e.stopPropagation(); openBooking(s.id); }}
                      className="w-full bg-rose-400 hover:bg-rose-500 text-white text-sm py-2.5 rounded-full transition-colors"
                    >
                      {isUk ? "Записатись" : "Book Now"}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Before / After ───────────────────────────────────────── */}
      <section id="before-after" className="bg-[#FAF6F1] py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.2em] text-rose-400 uppercase mb-3">✦ {isUk ? "Трансформації" : "Transformations"}</p>
            <h2 className="font-serif italic font-light text-4xl text-stone-800 mb-3">
              {isUk ? "Результати, що говорять самі за себе" : "Results that speak for themselves"}
            </h2>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {filterLabels.map((f) => (
              <button
                key={f.key}
                onClick={() => setBeforeAfterFilter(f.key)}
                className={`text-sm px-5 py-2 rounded-full border transition-colors ${beforeAfterFilter === f.key ? "bg-rose-400 text-white border-rose-400" : "border-stone-200 text-stone-500 bg-white dark:bg-neutral-800 hover:border-rose-300"}`}
              >
                {isUk ? f.uk : f.en}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredBA.map((item) => {
              const shown = beforeAfterShown[item.id] ?? "after";
              return (
                <div key={item.id} className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
                  {/* Split visual */}
                  <div className="flex h-40 relative">
                    <div className="flex-1 bg-stone-100 flex flex-col items-center justify-center gap-2">
                      <span className="text-xs text-stone-400 uppercase tracking-widest">{isUk ? "До" : "Before"}</span>
                      <span style={{ fontSize: "2.5rem" }} className={shown === "before" ? "opacity-100" : "opacity-40 grayscale"}>{item.beforeEmoji}</span>
                    </div>
                    {/* Center divider */}
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-rose-300 z-10" />
                    <div className="flex-1 bg-rose-50 flex flex-col items-center justify-center gap-2">
                      <span className="text-xs text-rose-300 uppercase tracking-widest">{isUk ? "Після" : "After"}</span>
                      <span style={{ fontSize: "2.5rem" }} className={shown === "after" ? "opacity-100" : "opacity-40"}>{item.afterEmoji}</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <p className="font-medium text-stone-800 text-sm mb-0.5">{isUk ? item.procedureUk : item.procedureEn}</p>
                    <p className="text-xs text-stone-400 mb-3">{item.masterName} · {isUk ? item.timeUk : item.timeEn}</p>
                    <button
                      onClick={() => setBeforeAfterShown((prev) => ({ ...prev, [item.id]: shown === "after" ? "before" : "after" }))}
                      className="w-full text-xs border border-rose-200 text-rose-400 hover:bg-rose-50 py-1.5 rounded-full transition-colors"
                    >
                      {shown === "after" ? `← ${isUk ? "До" : "Before"}` : `${isUk ? "Після" : "After"} →`}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Masters ──────────────────────────────────────────────── */}
      <section id="masters" className="bg-white py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.2em] text-rose-400 uppercase mb-3">✦ {isUk ? "Команда" : "Team"}</p>
            <h2 className="font-serif italic font-light text-4xl text-stone-800 mb-3">{isUk ? "Наші майстрині" : "Our Masters"}</h2>
            <p className="text-stone-400 text-sm">{isUk ? "Досвід, що підкреслює вашу красу" : "Expertise that highlights your beauty"}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MASTERS.map((m) => (
              <div key={m.name} className="bg-[#FAF6F1] rounded-2xl border border-stone-100 p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                <div className="w-20 h-20 rounded-full bg-rose-100 flex items-center justify-center mb-4 text-4xl border-2 border-rose-200">
                  {m.emoji}
                </div>
                <h3 className="font-medium text-stone-800 mb-1 text-sm">{m.name}</h3>
                <p className="text-xs text-stone-400 mb-3">{isUk ? m.specUk : m.specEn}</p>
                <div className="flex items-center gap-1.5 mb-1">
                  <StarRating rating={m.rating} />
                  <span className="text-xs text-stone-500 font-medium">{m.rating}</span>
                </div>
                <p className="text-xs text-stone-400 mb-4">{m.reviews} {isUk ? "відгуків" : "reviews"} · {isUk ? m.stageUk : m.stageEn}</p>
                <button
                  onClick={() => openBooking(m.services[0], m.name)}
                  className="w-full bg-rose-400 hover:bg-rose-500 text-white text-xs py-2.5 rounded-full transition-colors"
                >
                  {isUk ? "Записатись до майстрині" : "Book this master"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Booking CTA ──────────────────────────────────────────── */}
      <section id="booking" className="bg-linear-to-br from-rose-400 to-amber-400 py-24 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-block bg-white/20 text-white text-xs px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
            🎁 {isUk ? "Перший запис — знижка 10%" : "First booking — 10% discount"}
          </div>
          <h2 className="font-serif italic font-light text-4xl md:text-5xl text-white mb-5">
            {isUk ? "Запишіться зараз" : "Book Your Appointment"}
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            {isUk ? "Онлайн-запис 24/7 · Підтвердження за 5 хвилин" : "Online booking 24/7 · Confirmation in 5 minutes"}
          </p>
          <button
            onClick={() => openBooking()}
            className="bg-white text-rose-400 hover:bg-rose-50 text-base font-medium px-10 py-4 rounded-full transition-colors shadow-lg"
          >
            {isUk ? "Забронювати процедуру" : "Book a Procedure"}
          </button>
        </div>
      </section>

      {/* ── Loyalty ──────────────────────────────────────────────── */}
      <section className="bg-[#FAF6F1] py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.2em] text-rose-400 uppercase mb-3">✦ {isUk ? "Привілеї" : "Privileges"}</p>
            <h2 className="font-serif italic font-light text-4xl text-stone-800 mb-3">
              {isUk ? "Клуб Lumière — Програма лояльності" : "Lumière Club — Loyalty Programme"}
            </h2>
            <p className="text-stone-400 text-sm">{isUk ? "Накопичуйте бонуси з кожним візитом" : "Earn bonuses with every visit"}</p>
          </div>

          {/* Tier tabs */}
          <div className="flex justify-center gap-2 mb-8">
            {(["silver", "gold", "platinum"] as const).map((level) => (
              <button
                key={level}
                onClick={() => setLoyaltyLevel(level)}
                className={`text-sm px-5 py-2 rounded-full border capitalize transition-colors ${loyaltyLevel === level ? "bg-rose-400 text-white border-rose-400" : "border-stone-200 text-stone-500 bg-white dark:bg-neutral-800 hover:border-rose-300"}`}
              >
                {loyaltyConfig[level].label}
              </button>
            ))}
          </div>

          {/* Tier cards grid */}
          <div className="grid sm:grid-cols-3 gap-5 mb-8">
            {(["silver", "gold", "platinum"] as const).map((level) => {
              const cfg = loyaltyConfig[level];
              const active = loyaltyLevel === level;
              return (
                <div
                  key={level}
                  onClick={() => setLoyaltyLevel(level)}
                  className={`rounded-2xl border cursor-pointer transition-all p-6 ${active ? "border-rose-300 shadow-md bg-white" : "border-stone-100 bg-white/60 hover:border-rose-200"}`}
                >
                  <div className={`w-10 h-10 rounded-full ${cfg.gradient} mb-4`} />
                  <h3 className="font-medium text-stone-800 mb-1 capitalize">{cfg.label}</h3>
                  <p className="text-2xl font-light text-rose-400 font-serif italic mb-3">{cfg.pct}</p>
                  <ul className="space-y-1.5">
                    {cfg.perks.map((p) => (
                      <li key={p} className="text-xs text-stone-500 flex items-center gap-2">
                        <span className="text-rose-300">✦</span>{p}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Membership card mockup */}
          <div className={`max-w-sm mx-auto rounded-3xl ${loyaltyConfig[loyaltyLevel].gradient} p-6 text-white shadow-xl`}>
            <div className="flex justify-between items-start mb-8">
              <span className="font-serif italic text-2xl font-light">Lumière</span>
              <span className="text-xs uppercase tracking-widest opacity-80">{loyaltyConfig[loyaltyLevel].label}</span>
            </div>
            <p className="text-sm opacity-70 mb-1">{isUk ? "Учасниця клубу" : "Club member"}</p>
            <p className="text-lg font-medium mb-6">{isUk ? "Ваше ім'я" : "Your Name"}</p>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs opacity-70 mb-0.5">{isUk ? "Бонусні бали" : "Bonus points"}</p>
                <p className="text-2xl font-light">{loyaltyConfig[loyaltyLevel].points.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-xs opacity-70 mb-0.5">{isUk ? "Знижка" : "Discount"}</p>
                <p className="text-2xl font-light">{loyaltyConfig[loyaltyLevel].pct}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Reviews ──────────────────────────────────────────────── */}
      <section className="bg-white py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.2em] text-rose-400 uppercase mb-3">✦ {isUk ? "Відгуки" : "Reviews"}</p>
            <h2 className="font-serif italic font-light text-4xl text-stone-800 mb-3">{isUk ? "Що кажуть клієнтки" : "What clients say"}</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 mb-8">
            {(reviewsExpanded ? REVIEWS : REVIEWS.slice(0, 2)).map((r) => (
              <div key={r.name} className="bg-[#FAF6F1] rounded-2xl border border-stone-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <StarRating rating={r.rating} />
                  <span className="text-xs text-stone-400 ml-auto">{isUk ? r.serviceUk : r.serviceEn}</span>
                </div>
                <p className="text-stone-600 italic text-sm leading-relaxed mb-4">"{isUk ? r.textUk : r.textEn}"</p>
                <p className="text-xs font-medium text-stone-500">{r.name}</p>
              </div>
            ))}
          </div>

          <div className="text-center mb-10">
            <button
              onClick={() => setReviewsExpanded(!reviewsExpanded)}
              className="border border-rose-200 text-rose-400 hover:bg-rose-50 text-sm px-6 py-2.5 rounded-full transition-colors"
            >
              {reviewsExpanded ? (isUk ? "Показати менше" : "Show less") : (isUk ? "Читати всі відгуки" : "Read all reviews")}
            </button>
          </div>

          {/* Aggregate stats */}
          <div className="bg-[#FAF6F1] rounded-2xl border border-stone-100 px-8 py-6 flex flex-wrap justify-around gap-6 text-center">
            {[
              { val: "4.9", label: isUk ? "середня оцінка" : "average rating", sub: "★★★★★" },
              { val: "840+", label: isUk ? "відгуків на Google" : "Google reviews", sub: "" },
              { val: "98%", label: isUk ? "рекомендують нас" : "would recommend", sub: "" },
              { val: "5 000+", label: isUk ? "задоволених клієнток" : "happy clients", sub: "" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-light text-rose-400 font-serif italic">{s.val}</p>
                {s.sub && <p className="text-xs text-amber-400">{s.sub}</p>}
                <p className="text-xs text-stone-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="bg-stone-900 text-stone-300 pt-14 pb-6 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-10 mb-10">
            {/* Col 1 */}
            <div>
              <div className="mb-4">
                <span className="font-serif italic text-2xl text-rose-400 font-light">Lumière</span>
                <p className="text-[10px] tracking-[0.2em] text-stone-500 uppercase mt-0.5">✦ Beauty Studio</p>
              </div>
              <p className="text-sm text-stone-400 leading-relaxed">
                {isUk
                  ? "Преміальна б'юті-студія з 2018 року. Ми створюємо красу, що говорить сама за себе."
                  : "Premium beauty studio since 2018. We create beauty that speaks for itself."}
              </p>
            </div>
            {/* Col 2 */}
            <div>
              <h4 className="text-stone-200 text-sm font-medium mb-4">{isUk ? "Навігація" : "Navigation"}</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#services" className="hover:text-rose-300 transition-colors">{isUk ? "Послуги" : "Services"}</a></li>
                <li><a href="#masters" className="hover:text-rose-300 transition-colors">{isUk ? "Майстрині" : "Masters"}</a></li>
                <li><a href="#before-after" className="hover:text-rose-300 transition-colors">{isUk ? "До / Після" : "Before / After"}</a></li>
                <li><a href="#booking" className="hover:text-rose-300 transition-colors">{isUk ? "Бронювання" : "Booking"}</a></li>
              </ul>
            </div>
            {/* Col 3 */}
            <div>
              <h4 className="text-stone-200 text-sm font-medium mb-4">{isUk ? "Контакти" : "Contacts"}</h4>
              <ul className="space-y-2 text-sm text-stone-400">
                <li>📍 {isUk ? "вул. Хрещатик, 12, Київ" : "12 Khreshchatyk St, Kyiv"}</li>
                <li>📞 +38 (067) 123-45-67</li>
                <li>✉️ hello@lumiere.studio</li>
                <li>
                  <span className="block mt-2 mb-1 text-stone-300">{isUk ? "Графік роботи" : "Working hours"}</span>
                  {isUk ? "Пн–Пт: 9:00–20:00" : "Mon–Fri: 9:00–20:00"}
                </li>
                <li>{isUk ? "Сб–Нд: 10:00–18:00" : "Sat–Sun: 10:00–18:00"}</li>
              </ul>
              <div className="flex gap-3 mt-4">
                <button className="w-8 h-8 rounded-full bg-stone-800 hover:bg-rose-400 transition-colors flex items-center justify-center text-xs">ig</button>
                <button className="w-8 h-8 rounded-full bg-stone-800 hover:bg-rose-400 transition-colors flex items-center justify-center text-xs">fb</button>
                <button className="w-8 h-8 rounded-full bg-stone-800 hover:bg-rose-400 transition-colors flex items-center justify-center text-xs">tg</button>
              </div>
            </div>
          </div>
          <div className="border-t border-stone-800 pt-6 text-center text-xs text-stone-500">
            © 2025 Lumière Beauty Studio. {isUk ? "Всі права захищено." : "All rights reserved."}
          </div>
        </div>
      </footer>

      {/* ── Booking Modal ─────────────────────────────────────────── */}
      {bookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Modal header */}
            <div className="flex items-center justify-between px-7 py-5 border-b border-stone-100">
              <div>
                <span className="font-serif italic text-xl text-rose-400">Lumière</span>
                <p className="text-xs text-stone-400">{isUk ? "Онлайн бронювання" : "Online Booking"}</p>
              </div>
              <button onClick={closeBooking} className="text-stone-400 hover:text-stone-600 text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors">✕</button>
            </div>

            {bookingConfirmed ? (
              /* ── Confirmed ── */
              <div className="px-7 py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center text-3xl mx-auto mb-5">✓</div>
                <h3 className="font-serif italic text-2xl text-stone-800 mb-2">{isUk ? "Запис підтверджено!" : "Booking Confirmed!"}</h3>
                <p className="text-stone-400 text-sm mb-6">{isUk ? "Чекаємо вас у студії" : "We look forward to seeing you"}</p>
                <div className="bg-[#FAF6F1] rounded-2xl p-5 text-left space-y-2 text-sm mb-6">
                  {bookingData.service && (
                    <div className="flex justify-between">
                      <span className="text-stone-400">{isUk ? "Послуга" : "Service"}</span>
                      <span className="font-medium text-stone-700">{SERVICES.find(s => s.id === bookingData.service)?.[isUk ? "nameUk" : "nameEn"] ?? bookingData.service}</span>
                    </div>
                  )}
                  {bookingData.master && (
                    <div className="flex justify-between">
                      <span className="text-stone-400">{isUk ? "Майстриня" : "Master"}</span>
                      <span className="font-medium text-stone-700">{bookingData.master}</span>
                    </div>
                  )}
                  {bookingData.date && (
                    <div className="flex justify-between">
                      <span className="text-stone-400">{isUk ? "Дата" : "Date"}</span>
                      <span className="font-medium text-stone-700">{bookingData.date}</span>
                    </div>
                  )}
                  {bookingData.time && (
                    <div className="flex justify-between">
                      <span className="text-stone-400">{isUk ? "Час" : "Time"}</span>
                      <span className="font-medium text-stone-700">{bookingData.time}</span>
                    </div>
                  )}
                  {bookingData.name && (
                    <div className="flex justify-between">
                      <span className="text-stone-400">{isUk ? "Ім'я" : "Name"}</span>
                      <span className="font-medium text-stone-700">{bookingData.name}</span>
                    </div>
                  )}
                </div>
                <button onClick={closeBooking} className="bg-rose-400 hover:bg-rose-500 text-white px-8 py-3 rounded-full text-sm transition-colors">
                  {isUk ? "Чудово!" : "Wonderful!"}
                </button>
              </div>
            ) : (
              <div className="px-7 py-6">
                {/* Steps indicator */}
                <div className="flex items-center gap-2 mb-7">
                  {[1, 2, 3, 4].map((s) => (
                    <div key={s} className="flex items-center gap-2 flex-1">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium shrink-0 transition-colors ${bookingStep >= s ? "bg-rose-400 text-white" : "bg-stone-100 text-stone-400"}`}>
                        {s}
                      </div>
                      {s < 4 && <div className={`h-0.5 flex-1 transition-colors ${bookingStep > s ? "bg-rose-300" : "bg-stone-100"}`} />}
                    </div>
                  ))}
                </div>

                {/* Step 1: Service + Master */}
                {bookingStep === 1 && (
                  <div>
                    <h3 className="font-medium text-stone-800 mb-4">{isUk ? "Оберіть послугу" : "Choose a service"}</h3>
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {SERVICES.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => setBookingData((d) => ({ ...d, service: s.id }))}
                          className={`text-left p-3 rounded-xl border text-sm transition-colors ${bookingData.service === s.id ? "border-rose-400 bg-rose-50" : "border-stone-100 hover:border-rose-200"}`}
                        >
                          <span className="block text-lg mb-1">{s.emoji}</span>
                          <span className="block text-xs font-medium text-stone-700">{isUk ? s.nameUk : s.nameEn}</span>
                          <span className="block text-xs text-rose-400">{isUk ? `від ${s.priceFrom} ₴` : `from ${s.priceFrom}`}</span>
                        </button>
                      ))}
                    </div>

                    <h3 className="font-medium text-stone-800 mb-3">{isUk ? "Оберіть майстриню" : "Choose a master"}</h3>
                    <div className="space-y-2 mb-6">
                      <button
                        onClick={() => setBookingData((d) => ({ ...d, master: "" }))}
                        className={`w-full text-left p-3 rounded-xl border text-sm transition-colors ${bookingData.master === "" ? "border-rose-400 bg-rose-50" : "border-stone-100 hover:border-rose-200"}`}
                      >
                        🎲 {isUk ? "Будь-яка вільна майстриня" : "Any available master"}
                      </button>
                      {MASTERS.map((m) => (
                        <button
                          key={m.name}
                          onClick={() => setBookingData((d) => ({ ...d, master: m.name }))}
                          className={`w-full text-left p-3 rounded-xl border text-sm transition-colors flex items-center gap-3 ${bookingData.master === m.name ? "border-rose-400 bg-rose-50" : "border-stone-100 hover:border-rose-200"}`}
                        >
                          <span className="text-2xl shrink-0">{m.emoji}</span>
                          <div>
                            <span className="block font-medium text-stone-700">{m.name}</span>
                            <span className="block text-xs text-stone-400">{isUk ? m.specUk : m.specEn}</span>
                          </div>
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setBookingStep(2)}
                      disabled={!bookingData.service}
                      className="w-full bg-rose-400 hover:bg-rose-500 disabled:opacity-40 text-white py-3 rounded-full text-sm transition-colors"
                    >
                      {isUk ? "Далі →" : "Next →"}
                    </button>
                  </div>
                )}

                {/* Step 2: Date + Time */}
                {bookingStep === 2 && (
                  <div>
                    <h3 className="font-medium text-stone-800 mb-4">{isUk ? "Оберіть дату та час" : "Choose date and time"}</h3>
                    <label className="block text-xs text-stone-400 mb-1.5">{isUk ? "Дата" : "Date"}</label>
                    <input
                      type="date"
                      value={bookingData.date}
                      onChange={(e) => setBookingData((d) => ({ ...d, date: e.target.value }))}
                      className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm mb-5 focus:outline-none focus:border-rose-300 text-stone-700"
                    />
                    <label className="block text-xs text-stone-400 mb-3">{isUk ? "Час" : "Time"}</label>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {TIMES.map((t) => {
                        const busy = BUSY_TIMES.includes(t);
                        return (
                          <button
                            key={t}
                            disabled={busy}
                            onClick={() => setBookingData((d) => ({ ...d, time: t }))}
                            className={`px-4 py-2 rounded-full text-sm border transition-colors ${busy ? "border-stone-100 text-stone-300 cursor-not-allowed bg-stone-50" : bookingData.time === t ? "border-rose-400 bg-rose-400 text-white" : "border-stone-200 text-stone-600 hover:border-rose-300"}`}
                          >
                            {t}
                            {busy && <span className="block text-[9px] leading-none text-stone-300">{isUk ? "зайнято" : "busy"}</span>}
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setBookingStep(1)} className="flex-1 border border-stone-200 text-stone-500 py-3 rounded-full text-sm hover:bg-stone-50 transition-colors">
                        ← {isUk ? "Назад" : "Back"}
                      </button>
                      <button
                        onClick={() => setBookingStep(3)}
                        disabled={!bookingData.date || !bookingData.time}
                        className="flex-1 bg-rose-400 hover:bg-rose-500 disabled:opacity-40 text-white py-3 rounded-full text-sm transition-colors"
                      >
                        {isUk ? "Далі →" : "Next →"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Name + Phone */}
                {bookingStep === 3 && (
                  <div>
                    <h3 className="font-medium text-stone-800 mb-5">{isUk ? "Ваші контактні дані" : "Your contact details"}</h3>
                    <label className="block text-xs text-stone-400 mb-1.5">{isUk ? "Ваше ім'я" : "Your name"}</label>
                    <input
                      type="text"
                      placeholder={isUk ? "Ім'я та прізвище" : "Full name"}
                      value={bookingData.name}
                      onChange={(e) => setBookingData((d) => ({ ...d, name: e.target.value }))}
                      className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm mb-4 focus:outline-none focus:border-rose-300 text-stone-700"
                    />
                    <label className="block text-xs text-stone-400 mb-1.5">{isUk ? "Номер телефону" : "Phone number"}</label>
                    <input
                      type="tel"
                      placeholder="+38 (0__) ___-__-__"
                      value={bookingData.phone}
                      onChange={(e) => setBookingData((d) => ({ ...d, phone: e.target.value }))}
                      className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm mb-6 focus:outline-none focus:border-rose-300 text-stone-700"
                    />
                    <div className="flex gap-3">
                      <button onClick={() => setBookingStep(2)} className="flex-1 border border-stone-200 text-stone-500 py-3 rounded-full text-sm hover:bg-stone-50 transition-colors">
                        ← {isUk ? "Назад" : "Back"}
                      </button>
                      <button
                        onClick={() => setBookingStep(4)}
                        disabled={!bookingData.name || !bookingData.phone}
                        className="flex-1 bg-rose-400 hover:bg-rose-500 disabled:opacity-40 text-white py-3 rounded-full text-sm transition-colors"
                      >
                        {isUk ? "Далі →" : "Next →"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 4: Summary */}
                {bookingStep === 4 && (
                  <div>
                    <h3 className="font-medium text-stone-800 mb-5">{isUk ? "Підтвердження запису" : "Booking summary"}</h3>
                    <div className="bg-[#FAF6F1] rounded-2xl p-5 space-y-3 text-sm mb-6">
                      {[
                        { label: isUk ? "Послуга" : "Service", val: SERVICES.find(s => s.id === bookingData.service)?.[isUk ? "nameUk" : "nameEn"] ?? "—" },
                        { label: isUk ? "Майстриня" : "Master", val: bookingData.master || (isUk ? "Будь-яка" : "Any available") },
                        { label: isUk ? "Дата" : "Date", val: bookingData.date || "—" },
                        { label: isUk ? "Час" : "Time", val: bookingData.time || "—" },
                        { label: isUk ? "Ім'я" : "Name", val: bookingData.name },
                        { label: isUk ? "Телефон" : "Phone", val: bookingData.phone },
                      ].map((row) => (
                        <div key={row.label} className="flex justify-between">
                          <span className="text-stone-400">{row.label}</span>
                          <span className="font-medium text-stone-700">{row.val}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-700 mb-5 flex items-center gap-2">
                      <span>🎁</span>
                      <span>{isUk ? "Знижка 10% на перший запис автоматично застосована!" : "10% first-visit discount automatically applied!"}</span>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setBookingStep(3)} className="flex-1 border border-stone-200 text-stone-500 py-3 rounded-full text-sm hover:bg-stone-50 transition-colors">
                        ← {isUk ? "Назад" : "Back"}
                      </button>
                      <button
                        onClick={() => setBookingConfirmed(true)}
                        className="flex-1 bg-rose-400 hover:bg-rose-500 text-white py-3 rounded-full text-sm transition-colors"
                      >
                        {isUk ? "Підтвердити запис ✓" : "Confirm Booking ✓"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
