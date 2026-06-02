"use client";

import { useState } from "react";

export function SparkWashDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  function fmtPrice(uah: number, isUkLocale: boolean): string {
    if (isUkLocale) return `${uah} ₴`;
    return `£${Math.ceil(uah / 40 / 5) * 5}`;
  }

  // Package selector state
  const [selectedCar, setSelectedCar] = useState<"sedan" | "suv" | "minivan">("sedan");

  // Booking state
  const [bookStep, setBookStep] = useState<1 | 2 | 3>(1);
  const [bookLocation, setBookLocation] = useState<string | null>(null);
  const [bookSlot, setBookSlot] = useState<string | null>(null);
  const [bookTimeSlot, setBookTimeSlot] = useState<string | null>(null);
  const [bookName, setBookName] = useState("");
  const [bookPhone, setBookPhone] = useState("");
  const [bookEmail, setBookEmail] = useState("");
  const [bookConfirmed, setBookConfirmed] = useState(false);

  const carMultiplier = { sedan: 1, suv: 1.3, minivan: 1.5 };

  const packages = [
    {
      id: "basic",
      nameEn: "Basic",
      nameUk: "Базова",
      price: 500,
      taglineEn: "Quick exterior rinse",
      taglineUk: "Швидке зовнішнє миття",
      featuresEn: ["Exterior wash", "Wheel rinse", "Air dry", "Window wipe"],
      featuresUk: ["Зовнішнє миття", "Чистка коліс", "Обдув повітрям", "Протирка вікон"],
      accent: "#0EA5E9",
    },
    {
      id: "standard",
      nameEn: "Standard",
      nameUk: "Стандарт",
      price: 900,
      taglineEn: "Inside & out clean",
      taglineUk: "Повне миття всередині й зовні",
      featuresEn: ["Everything in Basic", "Interior vacuum", "Dashboard wipe", "Tyre shine"],
      featuresUk: ["Все з Базової", "Пилосос салону", "Протирка панелі", "Чернення шин"],
      accent: "#0EA5E9",
      popular: true,
    },
    {
      id: "premium",
      nameEn: "Premium",
      nameUk: "Преміум",
      price: 1600,
      taglineEn: "Full detail + wax coat",
      taglineUk: "Повний догляд + захисне покриття",
      featuresEn: ["Everything in Standard", "Hand wax", "Leather condition", "Air freshener"],
      featuresUk: ["Все зі Стандарту", "Ручна воскова полірування", "Обробка шкіри", "Ароматизатор"],
      accent: "#38BDF8",
    },
    {
      id: "detailing",
      nameEn: "Detailing",
      nameUk: "Детейлінг",
      price: 3500,
      taglineEn: "Professional full detailing",
      taglineUk: "Професійний повний детейлінг",
      featuresEn: ["Full exterior polish", "Deep interior clean", "Engine bay wash", "Ceramic coating", "Paint protection film", "Odour elimination"],
      featuresUk: ["Полірування кузова", "Глибоке чищення салону", "Миття двигуна", "Керамічне покриття", "Плівка захисту фарби", "Усунення запахів"],
      accent: "#7DD3FC",
    },
  ];

  const locations = isUk
    ? ["Дніпро Центр", "Дніпро Північ", "Дніпро Південь", "Дніпро Схід", "Дніпро Захід"]
    : ["Birmingham Centre", "Birmingham North", "Birmingham South", "Birmingham East", "Birmingham West"];

  const dateSlots = isUk
    ? ["Пн 05 трав", "Вт 06 трав", "Ср 07 трав", "Чт 08 трав", "Пт 09 трав", "Сб 10 трав"]
    : ["Mon 05 May", "Tue 06 May", "Wed 07 May", "Thu 08 May", "Fri 09 May", "Sat 10 May"];

  const timeSlots = [
    { id: "morning", en: "Morning · 07:00–11:00", uk: "Ранок · 07:00–11:00" },
    { id: "afternoon", en: "Afternoon · 12:00–16:00", uk: "День · 12:00–16:00" },
    { id: "evening", en: "Evening · 17:00–21:00", uk: "Вечір · 17:00–21:00" },
  ];

  const subscriptions = [
    {
      nameEn: "Basic Pass",
      nameUk: "Базовий пропуск",
      price: 1600,
      washesEn: "4 Basic washes / mo",
      washesUk: "4 базових миття / міс",
      featuresEn: ["Priority queue", "10% off upgrades", "SMS reminders"],
      featuresUk: ["Пріоритетна черга", "-10% на апгрейди", "SMS нагадування"],
    },
    {
      nameEn: "Unlimited",
      nameUk: "Безліміт",
      price: 8000,
      washesEn: "8 washes / mo · any package",
      washesUk: "8 мийок / міс · будь-який пакет",
      featuresEn: ["All packages included", "Free air freshener", "Priority booking", "Member card"],
      featuresUk: ["Всі пакети включені", "Безкоштовний ароматизатор", "Пріоритетне бронювання", "Картка учасника"],
      popular: true,
    },
    {
      nameEn: "Premium Unlimited",
      nameUk: "Преміум Безліміт",
      price: 12000,
      washesEn: "Unlimited washes · all packages",
      washesUk: "Безлімітні миття · всі пакети",
      featuresEn: ["Detailing included", "Dedicated manager", "Free pick-up & drop", "VIP lounge access"],
      featuresUk: ["Детейлінг включено", "Персональний менеджер", "Безкоштовна доставка авто", "Доступ до VIP-зони"],
    },
  ];

  const loyaltyPoints = 60;
  const loyaltyTotal = 100;
  const loyaltyPct = Math.round((loyaltyPoints / loyaltyTotal) * 100);

  const earnWays = [
    { pts: 5, en: "Each Basic wash", uk: "Кожне базове миття" },
    { pts: 10, en: "Each Standard wash", uk: "Кожне стандартне миття" },
    { pts: 20, en: "Each Premium wash", uk: "Кожне преміум миття" },
    { pts: 50, en: "Detailing service", uk: "Послуга детейлінгу" },
    { pts: 15, en: "Refer a friend", uk: "Запросити друга" },
    { pts: 5, en: "Leave a review", uk: "Залишити відгук" },
  ];

  const rewardMilestones = [
    { pts: 50, en: "Free Basic wash", uk: "Безкоштовне базове миття" },
    { pts: 100, en: "Free Standard wash", uk: "Безкоштовне стандартне миття" },
    { pts: 200, en: "Free Premium wash", uk: "Безкоштовне преміум миття" },
  ];

  return (
    <div className="min-h-screen bg-[#0F2744] font-sans text-white overflow-x-hidden">

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">

        {/* Water drop SVG decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute -top-10 -left-10 w-80 h-80 opacity-10" viewBox="0 0 200 200" fill="none">
            <path d="M100 10 C100 10 30 80 30 120 C30 158 62 180 100 180 C138 180 170 158 170 120 C170 80 100 10 100 10Z" fill="#0EA5E9" />
          </svg>
          <svg className="absolute top-20 right-0 w-64 h-64 opacity-8" viewBox="0 0 200 200" fill="none">
            <path d="M100 10 C100 10 30 80 30 120 C30 158 62 180 100 180 C138 180 170 158 170 120 C170 80 100 10 100 10Z" fill="#38BDF8" />
          </svg>
          <svg className="absolute bottom-0 left-1/3 w-48 h-48 opacity-6" viewBox="0 0 200 200" fill="none">
            <path d="M100 10 C100 10 30 80 30 120 C30 158 62 180 100 180 C138 180 170 158 170 120 C170 80 100 10 100 10Z" fill="#7DD3FC" />
          </svg>
          {/* Animated ripple circles */}
          <div className="absolute bottom-16 right-16 w-40 h-40 rounded-full border border-sky-500/20 animate-ping" style={{ animationDuration: "3s" }} />
          <div className="absolute bottom-16 right-16 w-56 h-56 rounded-full border border-sky-500/10 animate-ping" style={{ animationDuration: "3s", animationDelay: "0.5s" }} />
          {/* Wave at bottom */}
          <svg className="absolute bottom-0 left-0 w-full opacity-15" viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
            <path d="M0 60 C240 20 480 100 720 60 C960 20 1200 100 1440 60 L1440 120 L0 120 Z" fill="#0EA5E9" />
          </svg>
          <svg className="absolute bottom-0 left-0 w-full opacity-8" viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
            <path d="M0 80 C360 40 720 110 1080 70 C1260 55 1380 85 1440 70 L1440 120 L0 120 Z" fill="#38BDF8" />
          </svg>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="mb-6 text-6xl leading-none select-none">🚗💦</div>
          <span className="inline-block mb-5 text-xs uppercase tracking-[0.3em] text-sky-400 font-medium border border-sky-400/30 px-4 py-1.5 rounded-full bg-sky-400/5">
            {isUk ? "Преміальна мережа автомийок" : "Premium Car Wash Chain"}
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-6">
            {isUk ? "Блискуче чисто" : "Sparkling Clean"}
            <br />
            <span className="text-sky-400">{isUk ? "за 30 хвилин" : "in 30 Minutes"}</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            {isUk
              ? "SparkWash — мережа преміальних автомийок з найсучаснішим обладнанням та дбайливим доглядом за вашим авто."
              : "SparkWash — a premium car wash chain with state-of-the-art equipment and meticulous care for your vehicle."}
          </p>

          {/* Stats strip */}
          <div className="inline-flex flex-wrap justify-center gap-x-6 gap-y-3 mb-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-3 text-sm text-slate-300">
            <span>{isUk ? "5 мийок" : "5 locations"}</span>
            <span className="text-sky-500/50">·</span>
            <span>{isUk ? "50 000+ авто" : "50,000+ cars"}</span>
            <span className="text-sky-500/50">·</span>
            <span>4.9 ⭐</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => { const el = document.getElementById("sw-booking"); el?.scrollIntoView({ behavior: "smooth" }); }}
              className="bg-sky-500 hover:bg-sky-400 text-white font-bold px-8 py-3.5 rounded-full text-sm transition-colors duration-200 shadow-lg shadow-sky-500/30"
            >
              {isUk ? "Записатись онлайн" : "Book Online"}
            </button>
            <button
              onClick={() => { const el = document.getElementById("sw-packages"); el?.scrollIntoView({ behavior: "smooth" }); }}
              className="border border-sky-400/40 text-sky-300 hover:bg-sky-400/10 font-semibold px-8 py-3.5 rounded-full text-sm transition-colors duration-200"
            >
              {isUk ? "Переглянути пакети" : "View Packages"}
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600">
          <span className="text-xs tracking-widest uppercase">{isUk ? "Гортати" : "Scroll"}</span>
          <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── PACKAGES ────────────────────────────────────────────────────────── */}
      <section id="sw-packages" className="py-24 px-6" style={{ backgroundColor: "#0a1e36" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.3em] text-sky-400 font-medium">
              {isUk ? "Пакети послуг" : "Service packages"}
            </span>
            <h2 className="mt-3 text-4xl font-bold">{isUk ? "Оберіть Пакет" : "Choose Your Package"}</h2>
            <p className="mt-3 text-slate-400 text-base max-w-md mx-auto">
              {isUk
                ? "Підберіть ідеальний варіант для вашого авто. Ціна залежить від типу кузова."
                : "Find the perfect option for your vehicle. Price varies by car type."}
            </p>
          </div>

          {/* Car type selector */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-white/5 border border-white/10 rounded-full p-1 gap-1">
              {(["sedan", "suv", "minivan"] as const).map((car) => {
                const labels = {
                  sedan: isUk ? "Седан" : "Sedan",
                  suv: isUk ? "Позашляховик" : "SUV",
                  minivan: isUk ? "Мінівен" : "Minivan",
                };
                return (
                  <button
                    key={car}
                    onClick={() => setSelectedCar(car)}
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                      selectedCar === car
                        ? "bg-sky-500 text-white shadow-lg shadow-sky-500/30"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {labels[car]}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {packages.map((pkg) => {
              const adjPrice = Math.round(pkg.price * carMultiplier[selectedCar]);
              return (
                <div
                  key={pkg.id}
                  className={`relative flex flex-col rounded-2xl border p-6 transition-all duration-200 ${
                    pkg.popular
                      ? "border-sky-400 bg-sky-950/60 shadow-xl shadow-sky-500/10"
                      : "border-white/10 bg-white/5 hover:border-sky-400/40"
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="bg-sky-500 text-white text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                        {isUk ? "Популярний" : "Most Popular"}
                      </span>
                    </div>
                  )}
                  <p className="text-xs uppercase tracking-widest text-sky-400 font-medium mb-2">
                    {isUk ? pkg.nameUk : pkg.nameEn}
                  </p>
                  <p className="text-sm text-slate-400 mb-4">
                    {isUk ? pkg.taglineUk : pkg.taglineEn}
                  </p>
                  <p className="text-3xl font-extrabold mb-1">
                    {fmtPrice(adjPrice, isUk)}
                  </p>
                  {selectedCar !== "sedan" && (
                    <p className="text-xs text-slate-500 mb-4">
                      {isUk
                        ? `Базова ціна: ${fmtPrice(pkg.price, isUk)}`
                        : `Base price: ${fmtPrice(pkg.price, isUk)}`}
                    </p>
                  )}
                  <ul className="space-y-2.5 flex-1 mt-4 mb-6">
                    {(isUk ? pkg.featuresUk : pkg.featuresEn).map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <svg className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => { const el = document.getElementById("sw-booking"); el?.scrollIntoView({ behavior: "smooth" }); }}
                    className={`w-full py-3 rounded-full text-sm font-bold transition-colors duration-200 ${
                      pkg.popular
                        ? "bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/20"
                        : "border border-sky-400/40 text-sky-300 hover:bg-sky-400/10"
                    }`}
                  >
                    {isUk ? "Обрати" : "Select"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ONLINE BOOKING ──────────────────────────────────────────────────── */}
      <section id="sw-booking" className="py-24 px-6 bg-[#0F2744]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.3em] text-sky-400 font-medium">
              {isUk ? "Онлайн-запис" : "Online booking"}
            </span>
            <h2 className="mt-3 text-4xl font-bold">{isUk ? "Забронювати Час" : "Book a Slot"}</h2>
          </div>

          {/* Step indicators */}
          {!bookConfirmed && (
            <div className="flex items-center justify-center gap-3 mb-10">
              {([1, 2, 3] as const).map((s) => (
                <div key={s} className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-200 ${
                      bookStep === s
                        ? "bg-sky-500 border-sky-400 text-white"
                        : bookStep > s
                        ? "bg-sky-500/30 border-sky-400 text-sky-300"
                        : "bg-white/5 border-white/20 text-slate-500"
                    }`}
                  >
                    {bookStep > s ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : s}
                  </div>
                  <span className={`text-xs font-medium ${bookStep === s ? "text-sky-300" : "text-slate-500"}`}>
                    {s === 1 ? (isUk ? "Локація" : "Location") : s === 2 ? (isUk ? "Час" : "Time") : (isUk ? "Контакти" : "Details")}
                  </span>
                  {s < 3 && <div className={`w-10 h-px ${bookStep > s ? "bg-sky-400" : "bg-white/10"}`} />}
                </div>
              ))}
            </div>
          )}

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            {bookConfirmed ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-sky-500/20 border-2 border-sky-400 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-sky-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-sky-300">
                  {isUk ? "Бронювання підтверджено!" : "Booking Confirmed!"}
                </h3>
                <p className="text-slate-400 text-sm mb-2">
                  {isUk ? "Локація:" : "Location:"} <span className="text-white">{bookLocation}</span>
                </p>
                <p className="text-slate-400 text-sm mb-2">
                  {isUk ? "Дата:" : "Date:"} <span className="text-white">{bookSlot}</span>
                </p>
                <p className="text-slate-400 text-sm mb-6">
                  {isUk ? "Час:" : "Time:"} <span className="text-white">{timeSlots.find(t => t.id === bookTimeSlot)?.[isUk ? "uk" : "en"]}</span>
                </p>
                <p className="text-slate-400 text-sm mb-8">
                  {isUk
                    ? `${bookName}, ми надішлемо підтвердження на ${bookEmail}.`
                    : `${bookName}, we'll send a confirmation to ${bookEmail}.`}
                </p>
                <button
                  onClick={() => { setBookConfirmed(false); setBookStep(1); setBookLocation(null); setBookSlot(null); setBookTimeSlot(null); setBookName(""); setBookPhone(""); setBookEmail(""); }}
                  className="border border-sky-400/40 text-sky-300 hover:bg-sky-400/10 font-semibold px-8 py-3 rounded-full text-sm transition-colors"
                >
                  {isUk ? "Нове бронювання" : "New Booking"}
                </button>
              </div>
            ) : bookStep === 1 ? (
              <div>
                <p className="text-sm font-semibold text-sky-400 uppercase tracking-widest mb-6">
                  01 — {isUk ? "Оберіть локацію" : "Choose location"}
                </p>
                <div className="space-y-3">
                  {locations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => setBookLocation(loc)}
                      className={`w-full text-left px-5 py-4 rounded-xl border text-sm font-medium transition-all duration-200 ${
                        bookLocation === loc
                          ? "bg-sky-500/20 border-sky-400 text-sky-300"
                          : "bg-white/5 border-white/10 text-slate-300 hover:border-sky-400/40 hover:text-white"
                      }`}
                    >
                      <span className="mr-3">📍</span>{loc}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => bookLocation && setBookStep(2)}
                  disabled={!bookLocation}
                  className={`mt-6 w-full py-3.5 rounded-full text-sm font-bold transition-colors duration-200 ${
                    bookLocation
                      ? "bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/20"
                      : "bg-white/10 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  {isUk ? "Далі →" : "Next →"}
                </button>
              </div>
            ) : bookStep === 2 ? (
              <div>
                <p className="text-sm font-semibold text-sky-400 uppercase tracking-widest mb-6">
                  02 — {isUk ? "Оберіть дату та час" : "Choose date & time"}
                </p>
                <div className="mb-6">
                  <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">{isUk ? "Дата" : "Date"}</p>
                  <div className="grid grid-cols-3 gap-2">
                    {dateSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setBookSlot(slot)}
                        className={`py-3 rounded-xl text-xs font-semibold border transition-all duration-200 ${
                          bookSlot === slot
                            ? "bg-sky-500/20 border-sky-400 text-sky-300"
                            : "bg-white/5 border-white/10 text-slate-300 hover:border-sky-400/40"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">{isUk ? "Час" : "Time slot"}</p>
                  <div className="space-y-3">
                    {timeSlots.map((ts) => (
                      <button
                        key={ts.id}
                        onClick={() => setBookTimeSlot(ts.id)}
                        className={`w-full text-left px-5 py-3.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                          bookTimeSlot === ts.id
                            ? "bg-sky-500/20 border-sky-400 text-sky-300"
                            : "bg-white/5 border-white/10 text-slate-300 hover:border-sky-400/40"
                        }`}
                      >
                        {isUk ? ts.uk : ts.en}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setBookStep(1)}
                    className="flex-1 border border-white/20 text-slate-400 hover:text-white py-3.5 rounded-full text-sm font-semibold transition-colors"
                  >
                    ← {isUk ? "Назад" : "Back"}
                  </button>
                  <button
                    onClick={() => bookSlot && bookTimeSlot && setBookStep(3)}
                    disabled={!bookSlot || !bookTimeSlot}
                    className={`flex-1 py-3.5 rounded-full text-sm font-bold transition-colors duration-200 ${
                      bookSlot && bookTimeSlot
                        ? "bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/20"
                        : "bg-white/10 text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    {isUk ? "Далі →" : "Next →"}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-sm font-semibold text-sky-400 uppercase tracking-widest mb-6">
                  03 — {isUk ? "Ваші контакти" : "Your details"}
                </p>
                <div className="space-y-4 mb-6">
                  <input
                    type="text"
                    placeholder={isUk ? "Ім'я та прізвище" : "Full name"}
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 hover:border-sky-400/30 focus:border-sky-400 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder={isUk ? "+38 (0__) ___-__-__" : "+44 ____ ______"}
                    value={bookPhone}
                    onChange={(e) => setBookPhone(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 hover:border-sky-400/30 focus:border-sky-400 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={bookEmail}
                    onChange={(e) => setBookEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 hover:border-sky-400/30 focus:border-sky-400 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                  />
                </div>
                {bookLocation && bookSlot && bookTimeSlot && (
                  <div className="bg-sky-950/50 border border-sky-400/20 rounded-xl px-5 py-4 mb-6 text-sm text-slate-300 space-y-1">
                    <p>📍 {bookLocation}</p>
                    <p>📅 {bookSlot} · {timeSlots.find(t => t.id === bookTimeSlot)?.[isUk ? "uk" : "en"]}</p>
                  </div>
                )}
                <div className="flex gap-3">
                  <button
                    onClick={() => setBookStep(2)}
                    className="flex-1 border border-white/20 text-slate-400 hover:text-white py-3.5 rounded-full text-sm font-semibold transition-colors"
                  >
                    ← {isUk ? "Назад" : "Back"}
                  </button>
                  <button
                    onClick={() => { if (bookName && bookPhone && bookEmail) setBookConfirmed(true); }}
                    disabled={!bookName || !bookPhone || !bookEmail}
                    className={`flex-1 py-3.5 rounded-full text-sm font-bold transition-colors duration-200 ${
                      bookName && bookPhone && bookEmail
                        ? "bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/20"
                        : "bg-white/10 text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    {isUk ? "Підтвердити" : "Book Now"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── MONTHLY PASS ────────────────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ backgroundColor: "#0a1e36" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.3em] text-sky-400 font-medium">
              {isUk ? "Абонемент" : "Monthly Pass"}
            </span>
            <h2 className="mt-3 text-4xl font-bold">{isUk ? "Необмежене Миття" : "Unlimited Washing"}</h2>
            <p className="mt-3 text-slate-400 text-base max-w-md mx-auto">
              {isUk
                ? "Обирайте місячний пропуск і економте на кожному відвідуванні."
                : "Choose a monthly pass and save on every visit."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subscriptions.map((sub) => (
              <div
                key={sub.nameEn}
                className={`relative flex flex-col rounded-2xl border p-7 ${
                  sub.popular
                    ? "border-sky-400 bg-sky-950/60 shadow-xl shadow-sky-500/10"
                    : "border-white/10 bg-white/5"
                }`}
              >
                {sub.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-sky-500 text-white text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                      {isUk ? "Найкращий вибір" : "Best Value"}
                    </span>
                  </div>
                )}
                <p className="text-xs uppercase tracking-widest text-sky-400 font-medium mb-2">
                  {isUk ? sub.nameUk : sub.nameEn}
                </p>
                <p className="text-sm text-slate-400 mb-4">
                  {isUk ? sub.washesUk : sub.washesEn}
                </p>
                <p className="text-3xl font-extrabold mb-6">
                  {fmtPrice(sub.price, isUk)}
                  <span className="text-lg font-normal text-slate-400">/{isUk ? "міс" : "mo"}</span>
                </p>

                {/* QR code placeholder */}
                <div className="w-16 h-16 rounded-xl border-2 border-dashed border-sky-400/40 flex flex-col items-center justify-center mb-6 bg-sky-400/5">
                  <span className="text-sky-400/60 text-xs font-bold">QR</span>
                  <div className="grid grid-cols-3 gap-0.5 mt-1">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div key={i} className={`w-1.5 h-1.5 rounded-sm ${Math.random() > 0.5 ? "bg-sky-400/50" : "bg-transparent"}`} />
                    ))}
                  </div>
                </div>

                <ul className="space-y-2.5 flex-1 mb-6">
                  {(isUk ? sub.featuresUk : sub.featuresEn).map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <svg className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-full text-sm font-bold transition-colors duration-200 ${
                    sub.popular
                      ? "bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/20"
                      : "border border-sky-400/40 text-sky-300 hover:bg-sky-400/10"
                  }`}
                >
                  {isUk ? "Оформити пропуск" : "Get Pass"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOYALTY PROGRAM ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#0F2744]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.3em] text-sky-400 font-medium">
              {isUk ? "Програма лояльності" : "Loyalty Program"}
            </span>
            <h2 className="mt-3 text-4xl font-bold">{isUk ? "SparkWash Бонуси" : "SparkWash Rewards"}</h2>
            <p className="mt-3 text-slate-400 text-base max-w-md mx-auto">
              {isUk
                ? "Накопичуйте бали за кожне миття та обмінюйте їх на безкоштовні послуги."
                : "Earn points with every wash and redeem them for free services."}
            </p>
          </div>

          {/* Progress bar */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-10">
            <div className="flex items-end justify-between mb-3">
              <div>
                <p className="text-sm text-slate-400 mb-1">{isUk ? "Ваші бали" : "Your points"}</p>
                <p className="text-4xl font-extrabold text-sky-400">{loyaltyPoints}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-400 mb-1">{isUk ? "До наступної нагороди" : "Next reward at"}</p>
                <p className="text-2xl font-bold text-white">{loyaltyTotal}</p>
              </div>
            </div>
            <div className="relative h-4 bg-white/10 rounded-full overflow-hidden mb-3">
              <div
                className="absolute left-0 top-0 h-full rounded-full transition-all duration-700"
                style={{ width: `${loyaltyPct}%`, background: "linear-gradient(to right, #0EA5E9, #38BDF8)" }}
              />
              <div
                className="absolute top-0 h-full w-1 bg-white/60 rounded-full"
                style={{ left: `${loyaltyPct}%`, transform: "translateX(-50%)" }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>0</span>
              <span className="text-sky-400 font-semibold">{loyaltyPoints}/{loyaltyTotal} pts</span>
              <span>{loyaltyTotal}</span>
            </div>

            {/* Milestone markers */}
            <div className="mt-6 space-y-3">
              <p className="text-xs uppercase tracking-widest text-slate-500 font-medium">{isUk ? "Нагороди" : "Rewards"}</p>
              {rewardMilestones.map((m) => (
                <div key={m.pts} className="flex items-center gap-4">
                  <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-xs font-bold transition-colors ${loyaltyPoints >= m.pts ? "bg-sky-500 border-sky-400 text-white" : "border-white/20 text-slate-500"}`}>
                    {loyaltyPoints >= m.pts ? (
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : "★"}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-medium ${loyaltyPoints >= m.pts ? "text-sky-300" : "text-slate-400"}`}>
                        {isUk ? m.uk : m.en}
                      </p>
                      <span className={`text-xs font-semibold ${loyaltyPoints >= m.pts ? "text-sky-400" : "text-slate-600"}`}>{m.pts} pts</span>
                    </div>
                    <div className="mt-1 h-1 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-sky-500/50"
                        style={{ width: `${Math.min(100, (loyaltyPoints / m.pts) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Earn ways */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <p className="sm:col-span-2 md:col-span-3 text-xs uppercase tracking-widest text-slate-500 font-medium">
              {isUk ? "Як заробити бали" : "How to earn points"}
            </p>
            {earnWays.map((w) => (
              <div key={w.en} className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-5 py-4">
                <div className="w-10 h-10 rounded-full bg-sky-500/20 border border-sky-400/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-sky-400 text-xs font-extrabold">+{w.pts}</span>
                </div>
                <span className="text-sm text-slate-300">{isUk ? w.uk : w.en}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="py-14 px-6 border-t border-white/10" style={{ backgroundColor: "#07111f" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          <div>
            <span className="text-2xl font-extrabold">
              Spark<span className="text-sky-400">Wash</span>
            </span>
            <p className="mt-4 text-slate-500 text-sm leading-relaxed max-w-xs">
              {isUk
                ? "Мережа преміальних автомийок — там, де чистота зустрічається зі стилем."
                : "Premium car wash chain — where cleanliness meets style."}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-slate-500 font-medium mb-5">
              {isUk ? "Контакти" : "Contact"}
            </p>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-sky-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>
                  {isUk ? "пр. Яворницького, 20, Дніпро, 49000" : "42 Bristol Road, Birmingham B5 7AA"}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-sky-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {isUk ? "+38 (056) 234-56-78" : "+44 121 456 7890"}
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-sky-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                07:00 – 22:00
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-slate-500 font-medium mb-5">
              {isUk ? "Навігація" : "Navigation"}
            </p>
            <ul className="space-y-3 text-sm">
              {[
                { en: "Packages", uk: "Пакети" },
                { en: "Book Online", uk: "Онлайн-запис" },
                { en: "Monthly Pass", uk: "Абонемент" },
                { en: "Loyalty Program", uk: "Програма лояльності" },
              ].map((link) => (
                <li key={link.en}>
                  <button className="text-slate-400 hover:text-sky-400 transition-colors">
                    {isUk ? link.uk : link.en}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <button className="text-xs text-sky-400 border border-sky-400/30 px-4 py-2 rounded-full hover:bg-sky-400/10 transition-colors">
                📍 {isUk ? "Google Maps" : "Google Maps"}
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © 2026 SparkWash. {isUk ? "Всі права захищено." : "All rights reserved."}
          </p>
          <div className="flex gap-6 text-xs text-slate-600">
            <button className="hover:text-slate-400 transition-colors">
              {isUk ? "Політика конфіденційності" : "Privacy Policy"}
            </button>
            <button className="hover:text-slate-400 transition-colors">
              {isUk ? "Умови використання" : "Terms of Use"}
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
