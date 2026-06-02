"use client";

import { useState } from "react";

const SLIDES = [
  { emoji: "🏖️", destEn: "Maldives", destUk: "Мальдіви", taglineEn: "Paradise awaits", taglineUk: "Рай чекає" },
  { emoji: "🏔️", destEn: "Swiss Alps", destUk: "Швейцарські Альпи", taglineEn: "Above the clouds", taglineUk: "Над хмарами" },
  { emoji: "🏛️", destEn: "Rome", destUk: "Рим", taglineEn: "Eternal beauty", taglineUk: "Вічна краса" },
];

const TOURS = [
  { id:1,  emoji:"🏖️", nameUk:"Мальдіви. Exclusive 7 ночей",       nameEn:"Maldives. Exclusive 7 nights",      region:"asia",    type:"beach",     budget:"1000+",    days:9,  priceFrom:4200, rating:4.9, reviews:234, badge:"bestseller", spotsLeft:null },
  { id:2,  emoji:"🏛️", nameUk:"Рим + Флоренція 5 ночей",           nameEn:"Rome + Florence 5 nights",          region:"europe",  type:"city",      budget:"500-1000", days:7,  priceFrom:890,  rating:4.8, reviews:189, badge:"hot",        spotsLeft:3 },
  { id:3,  emoji:"🐫", nameUk:"Єгипет. Шарм-ель-Шейх All-in",      nameEn:"Egypt. Sharm All-inclusive",        region:"egypt",   type:"beach",     budget:"500-1000", days:10, priceFrom:650,  rating:4.7, reviews:312, badge:null,         spotsLeft:null },
  { id:4,  emoji:"🏔️", nameUk:"Швейцарія. Альпійський маршрут",    nameEn:"Switzerland. Alpine Route",         region:"europe",  type:"mountains", budget:"1000+",    days:8,  priceFrom:1890, rating:4.9, reviews:87,  badge:"premium",    spotsLeft:null },
  { id:5,  emoji:"🌴", nameUk:"Балі. Острів богів 10 ночей",        nameEn:"Bali. Island of Gods 10 nights",    region:"asia",    type:"beach",     budget:"1000+",    days:12, priceFrom:1650, rating:4.8, reviews:156, badge:"bestseller", spotsLeft:null },
  { id:6,  emoji:"🕌", nameUk:"ОАЕ. Дубай + Абу-Дабі",             nameEn:"UAE. Dubai + Abu Dhabi",            region:"uae",     type:"city",      budget:"1000+",    days:7,  priceFrom:2100, rating:4.7, reviews:98,  badge:"new",        spotsLeft:null },
  { id:7,  emoji:"🇬🇷", nameUk:"Греція. Санторіні + Міконос",      nameEn:"Greece. Santorini + Mykonos",       region:"europe",  type:"beach",     budget:"500-1000", days:9,  priceFrom:980,  rating:4.8, reviews:267, badge:"hot",        spotsLeft:2 },
  { id:8,  emoji:"🏯", nameUk:"Японія. Токіо + Кіото + Осака",     nameEn:"Japan. Tokyo + Kyoto + Osaka",      region:"asia",    type:"city",      budget:"1000+",    days:14, priceFrom:3200, rating:5.0, reviews:45,  badge:"premium",    spotsLeft:null },
  { id:9,  emoji:"🌊", nameUk:"Туреччина. Анталія 7 ночей",         nameEn:"Turkey. Antalya 7 nights",          region:"europe",  type:"beach",     budget:"to-500",   days:9,  priceFrom:480,  rating:4.6, reviews:421, badge:null,         spotsLeft:null },
  { id:10, emoji:"🦁", nameUk:"Кенія. Сафарі Масаї Мара",          nameEn:"Kenya. Masai Mara Safari",          region:"americas",type:"exotic",    budget:"1000+",    days:10, priceFrom:2800, rating:4.9, reviews:62,  badge:"exclusive",  spotsLeft:4 },
  { id:11, emoji:"🎭", nameUk:"Іспанія. Барселона + Мадрид",        nameEn:"Spain. Barcelona + Madrid",         region:"europe",  type:"city",      budget:"500-1000", days:8,  priceFrom:750,  rating:4.7, reviews:198, badge:null,         spotsLeft:null },
  { id:12, emoji:"🌺", nameUk:"Таїланд. Пхукет + Краб",            nameEn:"Thailand. Phuket + Krabi",          region:"asia",    type:"beach",     budget:"500-1000", days:11, priceFrom:920,  rating:4.8, reviews:334, badge:"bestseller", spotsLeft:null },
];

const REGIONS = [
  { id:"all",     labelEn:"All",     labelUk:"Всі" },
  { id:"europe",  labelEn:"Europe",  labelUk:"Європа" },
  { id:"asia",    labelEn:"Asia",    labelUk:"Азія" },
  { id:"egypt",   labelEn:"Egypt",   labelUk:"Єгипет" },
  { id:"uae",     labelEn:"UAE",     labelUk:"ОАЕ" },
  { id:"americas",labelEn:"Americas",labelUk:"Америка" },
];

const TYPES = [
  { id:"all",      labelEn:"All",      labelUk:"Всі" },
  { id:"beach",    labelEn:"Beach",    labelUk:"Море" },
  { id:"mountains",labelEn:"Mountains",labelUk:"Гори" },
  { id:"city",     labelEn:"City",     labelUk:"Місто" },
  { id:"exotic",   labelEn:"Exotic",   labelUk:"Екзотика" },
];

const BUDGETS = [
  { id:"all",      labelEn:"All budgets", labelUk:"Будь-який" },
  { id:"to-500",   labelEn:"to $500",     labelUk:"до $500" },
  { id:"500-1000", labelEn:"$500–$1000",  labelUk:"$500–$1000" },
  { id:"1000+",    labelEn:"$1000+",      labelUk:"$1000+" },
];

const DESTINATIONS_MAP = [
  { id:"europe",   emoji:"🇪🇺", labelEn:"Europe",  labelUk:"Європа",  toursCount:24, from:480 },
  { id:"asia",     emoji:"🌏", labelEn:"Asia",    labelUk:"Азія",    toursCount:18, from:650 },
  { id:"egypt",    emoji:"🇪🇬", labelEn:"Egypt",   labelUk:"Єгипет",  toursCount:8,  from:450 },
  { id:"uae",      emoji:"🇦🇪", labelEn:"UAE",     labelUk:"ОАЕ",     toursCount:6,  from:1200 },
  { id:"americas", emoji:"🌎", labelEn:"Americas",labelUk:"Америка", toursCount:12, from:900 },
  { id:"africa",   emoji:"🌍", labelEn:"Africa",  labelUk:"Африка",  toursCount:5,  from:1800 },
];

const REVIEWS = [
  { name:"Олена К.",     dest:"Maldives / Мальдіви",       rating:5, date:"Feb 2026", text:"Absolutely stunning trip! WanderUA arranged everything perfectly — from airport pickup to the overwater bungalow. Will book again!" },
  { name:"Andriy M.",    dest:"Japan / Японія",            rating:5, date:"Jan 2026", text:"Best travel agency I've ever used. The Tokyo–Kyoto–Osaka itinerary was flawlessly planned. Every detail was thought of." },
  { name:"Марина Л.",    dest:"Greece / Греція",           rating:5, date:"Dec 2025", text:"Санторіні перевершив усі очікування! Дякую команді WanderUA за ідеальну організацію та незабутні враження." },
  { name:"Victor S.",    dest:"Safari Kenya / Кенія",      rating:5, date:"Nov 2025", text:"The Masai Mara safari was life-changing. Professional guides, incredible wildlife, luxury camp — worth every penny." },
];

const ITINERARY_SAMPLE = [
  { dayEn:"Day 1 — Arrival & Check-in",    dayUk:"День 1 — Прибуття та заселення",    descEn:"Meet & greet at the airport, transfer to hotel, welcome dinner.",   descUk:"Зустріч в аеропорту, трансфер до готелю, вітальна вечеря." },
  { dayEn:"Day 2 — City & Cultural Tour",  dayUk:"День 2 — Місто та культура",        descEn:"Guided exploration of top landmarks, local market, sunset cruise.", descUk:"Екскурсія визначними місцями, місцевий ринок, прогулянка на заході сонця." },
  { dayEn:"Day 3 — Leisure & Departure",   dayUk:"День 3 — Відпочинок та від'їзд",   descEn:"Free morning, souvenir shopping, airport transfer.",                descUk:"Вільний ранок, шопінг сувенірів, трансфер до аеропорту." },
];

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="text-yellow-400 text-sm">
      {"★".repeat(full)}{half ? "½" : ""}
      <span className="text-white/50 ml-1 text-xs">({rating})</span>
    </span>
  );
}

function BadgePill({ badge, isUk }: { badge: string; isUk: boolean }) {
  const styles: Record<string, string> = {
    hot:        "bg-red-500 text-white",
    bestseller: "bg-[#06B6D4] text-white",
    premium:    "bg-yellow-500 text-black",
    new:        "bg-green-500 text-white",
    exclusive:  "bg-purple-500 text-white",
  };
  const labelsEn: Record<string, string> = { hot:"🔥 Hot", bestseller:"⭐ Bestseller", premium:"💎 Premium", new:"✨ New", exclusive:"👑 Exclusive" };
  const labelsUk: Record<string, string> = { hot:"🔥 Хіт", bestseller:"⭐ Хіт продажів", premium:"💎 Преміум", new:"✨ Новинка", exclusive:"👑 Ексклюзив" };
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${styles[badge]}`}>
      {isUk ? labelsUk[badge] : labelsEn[badge]}
    </span>
  );
}

export function WanderUADemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [activeSlide, setActiveSlide] = useState(0);
  const [regionFilter, setRegionFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [budgetFilter, setBudgetFilter] = useState("all");
  const [selectedTour, setSelectedTour] = useState<number | null>(null);
  const [bookingStep, setBookingStep] = useState(0);
  const [openItinerary, setOpenItinerary] = useState<number | null>(null);
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingPersons, setBookingPersons] = useState("2");
  const [bookingDone, setBookingDone] = useState(false);

  const filteredTours = TOURS.filter((t) => {
    if (regionFilter !== "all" && t.region !== regionFilter) return false;
    if (typeFilter !== "all" && t.type !== typeFilter) return false;
    if (budgetFilter !== "all" && t.budget !== budgetFilter) return false;
    return true;
  });

  const currentTour = selectedTour !== null ? TOURS.find((t) => t.id === selectedTour) : null;

  const prevSlide = () => setActiveSlide((s) => (s === 0 ? SLIDES.length - 1 : s - 1));
  const nextSlide = () => setActiveSlide((s) => (s === SLIDES.length - 1 ? 0 : s + 1));

  const handleDestinationClick = (regionId: string) => {
    setRegionFilter(regionId);
    document.getElementById("tours")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBookingSubmit = () => {
    setBookingDone(true);
  };

  return (
    <div className="font-sans bg-[#0B1A3B] text-white min-h-screen">

      {/* NAV */}
      <nav className="bg-[#0B3D91] sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <span className="text-xl font-extrabold tracking-tight shrink-0">✈️ WanderUA</span>
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium">
            <a href="#tours"        className="hover:text-[#06B6D4] transition-colors">{isUk ? "Тури" : "Tours"}</a>
            <a href="#destinations" className="hover:text-[#06B6D4] transition-colors">{isUk ? "Напрямки" : "Destinations"}</a>
            <a href="#reviews"      className="hover:text-[#06B6D4] transition-colors">{isUk ? "Про нас" : "About"}</a>
          </div>
          <span className="text-sm font-semibold text-[#06B6D4] shrink-0">📞 +38 (044) 222-33-44</span>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative bg-[#0B3D91] overflow-hidden" style={{ minHeight: "90vh" }}>
        {/* Slide background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 text-[30vw] leading-none select-none pointer-events-none">
          {SLIDES[activeSlide].emoji}
        </div>

        <div className="relative max-w-5xl mx-auto px-4 pt-20 pb-12 flex flex-col items-center text-center gap-6">
          {/* Destination tag */}
          <div className="text-[#06B6D4] text-sm font-bold uppercase tracking-widest">
            📍 {isUk ? SLIDES[activeSlide].destUk : SLIDES[activeSlide].destEn}
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-6xl font-black leading-tight drop-shadow-lg">
            {isUk ? "Відкрий світ разом з WanderUA" : "Discover the world with WanderUA"}
          </h1>

          {/* Tagline */}
          <p className="text-2xl sm:text-3xl text-[#F5DEB3] font-light italic">
            {SLIDES[activeSlide].emoji} {isUk ? SLIDES[activeSlide].taglineUk : SLIDES[activeSlide].taglineEn}
          </p>

          {/* Search form */}
          <div className="w-full max-w-4xl bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 mt-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <select className="flex-1 bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#06B6D4]">
                <option value="">{isUk ? "Напрямок" : "Destination"}</option>
                {DESTINATIONS_MAP.map((d) => (
                  <option key={d.id} value={d.id}>{isUk ? d.labelUk : d.labelEn}</option>
                ))}
              </select>
              <select className="flex-1 bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#06B6D4]">
                <option value="">{isUk ? "Тип туру" : "Tour type"}</option>
                {TYPES.filter(t => t.id !== "all").map((t) => (
                  <option key={t.id} value={t.id}>{isUk ? t.labelUk : t.labelEn}</option>
                ))}
              </select>
              <select className="flex-1 bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#06B6D4]">
                <option value="">{isUk ? "Бюджет" : "Budget"}</option>
                {BUDGETS.filter(b => b.id !== "all").map((b) => (
                  <option key={b.id} value={b.id}>{isUk ? b.labelUk : b.labelEn}</option>
                ))}
              </select>
              <button
                onClick={() => document.getElementById("tours")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-[#06B6D4] hover:bg-[#0891B2] text-white font-bold px-8 py-3 rounded-xl transition-colors shrink-0"
              >
                🔍 {isUk ? "Шукати" : "Search"}
              </button>
            </div>
          </div>

          {/* Hot deals strip */}
          <div className="w-full max-w-4xl overflow-x-auto">
            <div className="flex items-center gap-3 text-sm whitespace-nowrap py-2">
              <span className="text-[#F5DEB3] font-bold shrink-0">{isUk ? "🔥 Гарячі:" : "🔥 Hot deals:"}</span>
              {["🏖️ Maldives -20%", "🌴 Bali", "🌊 Turkey 7d", "🇬🇷 Greece from $890", "🐫 Egypt All-in"].map((deal) => (
                <span key={deal} className="bg-white/10 border border-white/20 px-3 py-1 rounded-full hover:bg-[#06B6D4]/30 cursor-pointer transition-colors">{deal}</span>
              ))}
            </div>
          </div>

          {/* Slide controls */}
          <div className="flex items-center gap-6 mt-4">
            <button onClick={prevSlide} className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-lg transition-colors">‹</button>
            <div className="flex gap-2">
              {SLIDES.map((_, i) => (
                <button key={i} onClick={() => setActiveSlide(i)} className={`w-3 h-3 rounded-full transition-colors ${i === activeSlide ? "bg-[#06B6D4]" : "bg-white/30"}`} />
              ))}
            </div>
            <button onClick={nextSlide} className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-lg transition-colors">›</button>
          </div>
        </div>
      </section>

      {/* DESTINATIONS MAP */}
      <section id="destinations" className="py-16 bg-[#0B1A3B]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-black text-center mb-2">{isUk ? "Популярні напрямки" : "Popular Destinations"}</h2>
          <p className="text-center text-white/60 mb-10">{isUk ? "Натисніть, щоб переглянути тури" : "Click to browse tours"}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {DESTINATIONS_MAP.map((dest) => (
              <button
                key={dest.id}
                onClick={() => handleDestinationClick(dest.id)}
                className="bg-[#0B3D91]/60 hover:bg-[#0B3D91] border border-white/10 hover:border-[#06B6D4] rounded-2xl p-5 flex flex-col items-center gap-2 transition-all group"
              >
                <span className="text-4xl">{dest.emoji}</span>
                <span className="font-bold text-sm">{isUk ? dest.labelUk : dest.labelEn}</span>
                <span className="text-[#06B6D4] text-xs font-semibold">from ${dest.from}</span>
                <span className="text-white/50 text-xs">{dest.toursCount} {isUk ? "турів" : "tours"}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* TOUR CATALOG */}
      <section id="tours" className="py-16 bg-[#071228]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-black text-center mb-2">{isUk ? "Каталог турів" : "Tour Catalog"}</h2>
          <p className="text-center text-white/60 mb-10">{isUk ? "Знайдіть свою ідеальну подорож" : "Find your perfect journey"}</p>

          {/* Filters */}
          <div className="bg-[#0B3D91]/30 border border-white/10 rounded-2xl p-4 mb-8 flex flex-col gap-4">
            {/* Region filter */}
            <div className="flex flex-wrap gap-2">
              <span className="text-white/50 text-sm self-center mr-1">{isUk ? "Регіон:" : "Region:"}</span>
              {REGIONS.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRegionFilter(r.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${regionFilter === r.id ? "bg-[#06B6D4] text-white" : "bg-white/10 hover:bg-white/20 text-white"}`}
                >
                  {isUk ? r.labelUk : r.labelEn}
                </button>
              ))}
            </div>
            {/* Type + Budget filter */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-white/50 text-sm self-center mr-1">{isUk ? "Тип:" : "Type:"}</span>
              {TYPES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTypeFilter(t.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${typeFilter === t.id ? "bg-[#06B6D4] text-white" : "bg-white/10 hover:bg-white/20 text-white"}`}
                >
                  {isUk ? t.labelUk : t.labelEn}
                </button>
              ))}
              <span className="text-white/50 text-sm self-center ml-3 mr-1">{isUk ? "Бюджет:" : "Budget:"}</span>
              <select
                value={budgetFilter}
                onChange={(e) => setBudgetFilter(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[#06B6D4]"
              >
                {BUDGETS.map((b) => (
                  <option key={b.id} value={b.id}>{isUk ? b.labelUk : b.labelEn}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Count */}
          <p className="text-white/50 text-sm mb-6">
            {filteredTours.length} {isUk ? "турів знайдено" : "tours found"}
          </p>

          {/* Tour Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTours.map((tour) => (
              <div
                key={tour.id}
                className="bg-[#0B3D91]/40 border border-white/10 hover:border-[#06B6D4]/50 rounded-2xl overflow-hidden transition-all hover:shadow-lg hover:shadow-[#06B6D4]/10 flex flex-col"
              >
                {/* Emoji hero */}
                <div className="bg-[#0B3D91] flex items-center justify-center py-8 text-6xl">
                  {tour.emoji}
                </div>
                <div className="p-5 flex flex-col flex-1 gap-3">
                  {/* Badges row */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {tour.badge && <BadgePill badge={tour.badge} isUk={isUk} />}
                    <span className="bg-white/10 text-white/70 text-xs px-2 py-0.5 rounded-full">{tour.days} {isUk ? "дн." : "days"}</span>
                    {REGIONS.find(r => r.id === tour.region) && (
                      <span className="bg-white/10 text-white/70 text-xs px-2 py-0.5 rounded-full">
                        {isUk ? REGIONS.find(r => r.id === tour.region)?.labelUk : REGIONS.find(r => r.id === tour.region)?.labelEn}
                      </span>
                    )}
                  </div>

                  {/* Name */}
                  <h3 className="font-bold text-base leading-snug">{isUk ? tour.nameUk : tour.nameEn}</h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <StarRating rating={tour.rating} />
                    <span className="text-white/40 text-xs">{tour.reviews} {isUk ? "відгуків" : "reviews"}</span>
                  </div>

                  {/* Spots warning */}
                  {tour.spotsLeft && (
                    <div className="text-orange-400 text-xs font-semibold">
                      ⚡ {isUk ? `Залишилось лише ${tour.spotsLeft} місця!` : `Last ${tour.spotsLeft} spots!`}
                    </div>
                  )}

                  <div className="mt-auto pt-2 flex items-center justify-between">
                    <div>
                      <span className="text-white/50 text-xs">{isUk ? "від" : "from"}</span>
                      <span className="text-2xl font-black text-[#06B6D4] ml-1">${tour.priceFrom}</span>
                    </div>
                    <button
                      onClick={() => { setSelectedTour(tour.id); setBookingStep(0); setBookingDone(false); }}
                      className="bg-[#06B6D4] hover:bg-[#0891B2] text-white font-bold px-4 py-2 rounded-xl text-sm transition-colors"
                    >
                      {isUk ? "Забронювати" : "Book Now"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTours.length === 0 && (
            <div className="text-center py-16 text-white/40">
              <div className="text-5xl mb-3">🔍</div>
              <p>{isUk ? "Тури не знайдено. Спробуйте інші фільтри." : "No tours found. Try different filters."}</p>
            </div>
          )}
        </div>
      </section>

      {/* TOUR DETAIL MODAL */}
      {currentTour && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-start justify-center overflow-y-auto py-8 px-4">
          <div className="bg-[#0B1A3B] border border-white/20 rounded-3xl max-w-2xl w-full shadow-2xl">
            {/* Modal header */}
            <div className="bg-[#0B3D91] rounded-t-3xl p-6 flex items-start gap-4">
              <span className="text-6xl">{currentTour.emoji}</span>
              <div className="flex-1">
                <h2 className="text-2xl font-black leading-tight">{isUk ? currentTour.nameUk : currentTour.nameEn}</h2>
                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <StarRating rating={currentTour.rating} />
                  {currentTour.badge && <BadgePill badge={currentTour.badge} isUk={isUk} />}
                </div>
              </div>
              <button
                onClick={() => { setSelectedTour(null); setBookingStep(0); setBookingDone(false); }}
                className="text-white/50 hover:text-white text-2xl leading-none shrink-0"
              >
                ✕
              </button>
            </div>

            <div className="p-6 flex flex-col gap-6">
              {/* Price & days */}
              <div className="flex items-center gap-6 text-center">
                <div className="flex-1 bg-white/5 rounded-xl p-4">
                  <div className="text-[#06B6D4] text-3xl font-black">${currentTour.priceFrom}</div>
                  <div className="text-white/50 text-xs mt-1">{isUk ? "вартість від" : "price from"}</div>
                </div>
                <div className="flex-1 bg-white/5 rounded-xl p-4">
                  <div className="text-white text-3xl font-black">{currentTour.days}</div>
                  <div className="text-white/50 text-xs mt-1">{isUk ? "днів / ночей" : "days / nights"}</div>
                </div>
                <div className="flex-1 bg-white/5 rounded-xl p-4">
                  <div className="text-yellow-400 text-3xl font-black">{currentTour.rating}★</div>
                  <div className="text-white/50 text-xs mt-1">{currentTour.reviews} {isUk ? "відгуків" : "reviews"}</div>
                </div>
              </div>

              {/* Itinerary */}
              <div>
                <h3 className="font-bold text-lg mb-3">📅 {isUk ? "Програма туру" : "Tour Itinerary"}</h3>
                <div className="flex flex-col gap-2">
                  {ITINERARY_SAMPLE.map((item, i) => (
                    <div key={i} className="border border-white/10 rounded-xl overflow-hidden">
                      <button
                        className="w-full flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10 transition-colors text-left"
                        onClick={() => setOpenItinerary(openItinerary === i ? null : i)}
                      >
                        <span className="font-semibold text-sm">{isUk ? item.dayUk : item.dayEn}</span>
                        <span className="text-white/40">{openItinerary === i ? "▲" : "▼"}</span>
                      </button>
                      {openItinerary === i && (
                        <div className="px-4 py-3 text-white/70 text-sm bg-white/3">
                          {isUk ? item.descUk : item.descEn}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Included / Not included */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-green-900/20 border border-green-500/20 rounded-xl p-4">
                  <h4 className="font-bold text-green-400 text-sm mb-3">✅ {isUk ? "Включено" : "Included"}</h4>
                  {[isUk?"Авіаквитки":"Flight tickets", isUk?"Готель":"Hotel", isUk?"Трансфер":"Transfer", isUk?"Гід":"Guide", isUk?"Страховка":"Insurance"].map((item) => (
                    <div key={item} className="text-sm text-white/80 py-1 flex items-center gap-2">
                      <span className="text-green-400">✓</span> {item}
                    </div>
                  ))}
                </div>
                <div className="bg-red-900/20 border border-red-500/20 rounded-xl p-4">
                  <h4 className="font-bold text-red-400 text-sm mb-3">❌ {isUk ? "Не включено" : "Not included"}</h4>
                  {[isUk?"Виза":"Visa", isUk?"Особисті витрати":"Personal expenses", isUk?"Чайові":"Tips"].map((item) => (
                    <div key={item} className="text-sm text-white/80 py-1 flex items-center gap-2">
                      <span className="text-red-400">✗</span> {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking section */}
              {bookingStep === 0 && !bookingDone && (
                <button
                  onClick={() => setBookingStep(1)}
                  className="w-full bg-[#06B6D4] hover:bg-[#0891B2] text-white font-black py-4 rounded-2xl text-lg transition-colors"
                >
                  🗓️ {isUk ? "Забронювати цей тур" : "Book this tour"}
                </button>
              )}

              {bookingStep === 1 && !bookingDone && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-4">
                  <h3 className="font-bold text-lg">📋 {isUk ? "Бронювання" : "Booking"}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-white/50">{isUk ? "Ваше ім'я" : "Your name"}</label>
                      <input
                        type="text"
                        value={bookingName}
                        onChange={(e) => setBookingName(e.target.value)}
                        placeholder={isUk ? "Іван Іваненко" : "John Smith"}
                        className="bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#06B6D4] text-white placeholder:text-white/30"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-white/50">{isUk ? "Телефон" : "Phone"}</label>
                      <input
                        type="tel"
                        value={bookingPhone}
                        onChange={(e) => setBookingPhone(e.target.value)}
                        placeholder="+38 (0XX) XXX-XX-XX"
                        className="bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#06B6D4] text-white placeholder:text-white/30"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-white/50">{isUk ? "Дата відправлення" : "Departure date"}</label>
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#06B6D4] text-white"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-white/50">{isUk ? "Кількість осіб" : "Persons"}</label>
                      <select
                        value={bookingPersons}
                        onChange={(e) => setBookingPersons(e.target.value)}
                        className="bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#06B6D4] text-white"
                      >
                        {["1","2","3","4","5","6+"].map((n) => (
                          <option key={n} value={n}>{n} {isUk ? "ос." : "pers."}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => setBookingStep(0)}
                      className="flex-1 border border-white/20 hover:bg-white/10 text-white/70 font-semibold py-3 rounded-xl text-sm transition-colors"
                    >
                      {isUk ? "Скасувати" : "Cancel"}
                    </button>
                    <button
                      onClick={handleBookingSubmit}
                      className="flex-2 bg-[#06B6D4] hover:bg-[#0891B2] text-white font-bold py-3 px-8 rounded-xl text-sm transition-colors"
                    >
                      {isUk ? "Підтвердити" : "Confirm booking"}
                    </button>
                  </div>
                </div>
              )}

              {bookingDone && (
                <div className="bg-green-900/30 border border-green-500/30 rounded-2xl p-6 text-center">
                  <div className="text-4xl mb-2">🎉</div>
                  <h3 className="font-black text-lg text-green-400 mb-1">{isUk ? "Заявку прийнято!" : "Booking received!"}</h3>
                  <p className="text-white/70 text-sm">{isUk ? "Наш менеджер зв'яжеться з вами протягом 30 хвилин." : "Our manager will contact you within 30 minutes."}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TRUST & REVIEWS */}
      <section id="reviews" className="py-16 bg-[#0B1A3B]">
        <div className="max-w-7xl mx-auto px-4">
          {/* Stats strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
            {[
              { value:"8,000+", labelEn:"Happy clients",   labelUk:"Задоволених клієнтів" },
              { value:"45",     labelEn:"Countries",       labelUk:"Країн" },
              { value:"15",     labelEn:"Years experience",labelUk:"Років досвіду" },
              { value:"4.9★",   labelEn:"Average rating",  labelUk:"Середній рейтинг" },
            ].map((stat) => (
              <div key={stat.value} className="bg-[#0B3D91]/60 border border-white/10 rounded-2xl p-6 text-center">
                <div className="text-3xl font-black text-[#06B6D4]">{stat.value}</div>
                <div className="text-white/60 text-sm mt-1">{isUk ? stat.labelUk : stat.labelEn}</div>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-black text-center mb-10">{isUk ? "Що кажуть наші клієнти" : "What our clients say"}</h2>

          {/* Review cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            {REVIEWS.map((review, i) => (
              <div key={i} className="bg-[#0B3D91]/40 border border-white/10 rounded-2xl p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-bold text-sm">{review.name}</div>
                    <div className="text-[#06B6D4] text-xs mt-0.5">{review.dest}</div>
                  </div>
                  <span className="text-white/30 text-xs shrink-0">{review.date}</span>
                </div>
                <div className="text-yellow-400 text-sm">{"★".repeat(review.rating)}</div>
                <p className="text-white/70 text-sm leading-relaxed flex-1">"{review.text}"</p>
              </div>
            ))}
          </div>

          {/* Guarantee badges */}
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon:"🏛️", labelEn:"ДАСУ Licensed",       labelUk:"Ліцензія ДАСУ" },
              { icon:"📜", labelEn:"Contract guarantee",   labelUk:"Гарантія договору" },
              { icon:"🛡️", labelEn:"Travel insurance",    labelUk:"Страхування подорожей" },
              { icon:"📞", labelEn:"24/7 support",         labelUk:"Підтримка 24/7" },
            ].map((badge) => (
              <div key={badge.labelEn} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-5 py-3">
                <span className="text-xl">{badge.icon}</span>
                <span className="text-sm font-semibold">{isUk ? badge.labelUk : badge.labelEn}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0B3D91] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-2xl font-black mb-3">✈️ WanderUA</div>
              <p className="text-white/60 text-sm leading-relaxed">
                {isUk
                  ? "Ваш надійний партнер у подорожах з 2010 року. Мрійте більше — ми організуємо решту."
                  : "Your trusted travel partner since 2010. Dream bigger — we'll handle the rest."}
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-[#06B6D4]">{isUk ? "Навігація" : "Navigation"}</h4>
              <div className="flex flex-col gap-2 text-sm text-white/60">
                <a href="#tours" className="hover:text-white transition-colors">{isUk ? "Тури" : "Tours"}</a>
                <a href="#destinations" className="hover:text-white transition-colors">{isUk ? "Напрямки" : "Destinations"}</a>
                <a href="#reviews" className="hover:text-white transition-colors">{isUk ? "Відгуки" : "Reviews"}</a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-[#06B6D4]">{isUk ? "Контакти" : "Contacts"}</h4>
              <div className="flex flex-col gap-2 text-sm text-white/70">
                <span>📍 {isUk ? "Київ, Хрещатик 2" : "Kyiv, Khreshchatyk 2"}</span>
                <span>📞 +38 (044) 222-33-44</span>
                <span>✉️ info@wanderua.com</span>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-white/40 text-xs">
            <span>© 2026 WanderUA Tours. {isUk ? "Всі права захищені." : "All rights reserved."}</span>
            <span>{isUk ? "Ліцензія ДАСУ №12345" : "ДАСУ License #12345"}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
