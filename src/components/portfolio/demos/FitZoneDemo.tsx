"use client";

import { useState } from "react";

// ─── Data ───────────────────────────────────────────────────────────────────

const DAYS = [
  { id: "Mon", ukL: "Пн", enL: "Mon" },
  { id: "Tue", ukL: "Вт", enL: "Tue" },
  { id: "Wed", ukL: "Ср", enL: "Wed" },
  { id: "Thu", ukL: "Чт", enL: "Thu" },
  { id: "Fri", ukL: "Пт", enL: "Fri" },
  { id: "Sat", ukL: "Сб", enL: "Sat" },
  { id: "Sun", ukL: "Нд", enL: "Sun" },
];

const CLASSES = [
  { id: 1, day: "Mon", time: "07:30", nameUk: "Ранкова йога", nameEn: "Morning Yoga", type: "yoga", trainerUk: "Ірина С.", trainerEn: "Iryna S.", level: "Всі рівні", duration: 60, spots: 12, spotsLeft: 3 },
  { id: 2, day: "Mon", time: "10:00", nameUk: "CrossFit WOD", nameEn: "CrossFit WOD", type: "crossfit", trainerUk: "Максим К.", trainerEn: "Maksym K.", level: "Середній+", duration: 60, spots: 15, spotsLeft: 8 },
  { id: 3, day: "Mon", time: "18:30", nameUk: "Бокс для початківців", nameEn: "Boxing for Beginners", type: "boxing", trainerUk: "Денис Б.", trainerEn: "Denys B.", level: "Початківець", duration: 75, spots: 10, spotsLeft: 0 },
  { id: 4, day: "Mon", time: "20:00", nameUk: "Стретчинг і релакс", nameEn: "Stretching & Relax", type: "stretching", trainerUk: "Ірина С.", trainerEn: "Iryna S.", level: "Всі рівні", duration: 45, spots: 20, spotsLeft: 14 },
  { id: 5, day: "Tue", time: "07:00", nameUk: "Плавання: техніка", nameEn: "Swimming: technique", type: "swimming", trainerUk: "Олег П.", trainerEn: "Oleh P.", level: "Середній", duration: 60, spots: 8, spotsLeft: 2 },
  { id: 6, day: "Tue", time: "09:30", nameUk: "Хатха-йога", nameEn: "Hatha Yoga", type: "yoga", trainerUk: "Ірина С.", trainerEn: "Iryna S.", level: "Початківець", duration: 75, spots: 15, spotsLeft: 7 },
  { id: 7, day: "Tue", time: "19:00", nameUk: "CrossFit Beginner", nameEn: "CrossFit Beginner", type: "crossfit", trainerUk: "Максим К.", trainerEn: "Maksym K.", level: "Початківець", duration: 60, spots: 12, spotsLeft: 5 },
  { id: 8, day: "Wed", time: "07:30", nameUk: "Ранкова йога", nameEn: "Morning Yoga", type: "yoga", trainerUk: "Ірина С.", trainerEn: "Iryna S.", level: "Всі рівні", duration: 60, spots: 12, spotsLeft: 9 },
  { id: 9, day: "Wed", time: "17:00", nameUk: "Бокс: тіньовий бій", nameEn: "Boxing: shadow training", type: "boxing", trainerUk: "Денис Б.", trainerEn: "Denys B.", level: "Середній", duration: 60, spots: 10, spotsLeft: 4 },
  { id: 10, day: "Thu", time: "11:00", nameUk: "CrossFit Advanced", nameEn: "CrossFit Advanced", type: "crossfit", trainerUk: "Максим К.", trainerEn: "Maksym K.", level: "Просунутий", duration: 75, spots: 10, spotsLeft: 1 },
  { id: 11, day: "Fri", time: "08:00", nameUk: "Плавання: витривалість", nameEn: "Swimming: endurance", type: "swimming", trainerUk: "Олег П.", trainerEn: "Oleh P.", level: "Просунутий", duration: 60, spots: 8, spotsLeft: 6 },
  { id: 12, day: "Sat", time: "10:00", nameUk: "Йога & Медитація", nameEn: "Yoga & Meditation", type: "yoga", trainerUk: "Ірина С.", trainerEn: "Iryna S.", level: "Всі рівні", duration: 90, spots: 20, spotsLeft: 12 },
];

const TRAINERS = [
  { nameUk: "Максим Коваленко", nameEn: "Maksym Kovalenko", specUk: "CrossFit · Функціональний тренінг", specEn: "CrossFit · Functional training", stageUk: "8 років · CF-L3", stageEn: "8 years · CF-L3", emoji: "💪", reviews: 189 },
  { nameUk: "Ірина Соколова", nameEn: "Iryna Sokolova", specUk: "Йога · Пілатес · Стретчинг", specEn: "Yoga · Pilates · Stretching", stageUk: "10 років · RYT-500", stageEn: "10 years · RYT-500", emoji: "🧘", reviews: 234 },
  { nameUk: "Денис Борисенко", nameEn: "Denys Borysenko", specUk: "Бокс · MMA · Єдиноборства", specEn: "Boxing · MMA · Combat sports", stageUk: "12 років · КМС з боксу", stageEn: "12 years · Boxing CMS", emoji: "🥊", reviews: 156 },
  { nameUk: "Олег Петренко", nameEn: "Oleh Petrenko", specUk: "Плавання · Тріатлон", specEn: "Swimming · Triathlon", stageUk: "6 років · FINA certified", stageEn: "6 years · FINA certified", emoji: "🏊", reviews: 98 },
  { nameUk: "Світлана Мороз", nameEn: "Svitlana Moroz", specUk: "Персональний тренінг · Схуднення", specEn: "Personal training · Weight loss", stageUk: "7 років · ACE certified", stageEn: "7 years · ACE certified", emoji: "🏋️", reviews: 201 },
  { nameUk: "Андрій Дмитренко", nameEn: "Andriy Dmytrenko", specUk: "Силовий тренінг · Набір маси", specEn: "Strength training · Muscle gain", stageUk: "9 років · NSCA-CSCS", stageEn: "9 years · NSCA-CSCS", emoji: "🦾", reviews: 177 },
];

const LOCATIONS = [
  { nameUk: "FitZone Центр", nameEn: "FitZone Center", addressUk: "вул. Хрещатик, 15, Київ", addressEn: "15 Khreshchatyk St., Kyiv", hours: "06:00 – 24:00", features: ["Басейн 25м", "Зал кардіо 800м²", "Сауна + пар"], emoji: "🏙️" },
  { nameUk: "FitZone Оболонь", nameEn: "FitZone Obolon", addressUk: "Оболонський просп., 22, Київ", addressEn: "22 Obolon Ave., Kyiv", hours: "07:00 – 23:00", features: ["Басейн 25м", "CrossFit box", "Дитяча зона"], emoji: "🌊" },
  { nameUk: "FitZone Лівий берег", nameEn: "FitZone Left Bank", addressUk: "просп. Бажана, 8, Київ", addressEn: "8 Bazhan Ave., Kyiv", hours: "07:00 – 23:00", features: ["Зал боксу", "Студія йоги", "Масаж"], emoji: "🌳" },
];

const PLANS = {
  single: { priceUk: 350, priceEn: 350, labelUk: "Разовий візит", labelEn: "Single visit", perUk: "за візит", perEn: "per visit" },
  monthly: { priceUk: 1800, priceEn: 1800, labelUk: "Місячний", labelEn: "Monthly", perUk: "на місяць", perEn: "per month", popular: true },
  annual: { priceUk: 890, priceEn: 890, labelUk: "Річний", labelEn: "Annual", perUk: "на місяць (×12)", perEn: "per month (×12)", save: 30 },
};

const TYPE_COLORS: Record<string, string> = {
  yoga: "bg-purple-900 text-purple-300",
  crossfit: "bg-orange-900 text-orange-300",
  boxing: "bg-red-900 text-red-300",
  stretching: "bg-teal-900 text-teal-300",
  swimming: "bg-blue-900 text-blue-300",
};

// ─── Component ───────────────────────────────────────────────────────────────

export function FitZoneDemo({ lang }: { lang: string }) {
  const isUk = lang !== "en";

  const [scheduleDay, setScheduleDay] = useState("Mon");
  const [scheduleFilter, setScheduleFilter] = useState("all");
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [activePlan, setActivePlan] = useState<"single" | "monthly" | "annual">("monthly");
  const [planScope, setPlanScope] = useState<"one" | "all">("one");
  const [bmiData, setBmiData] = useState({ gender: "m", age: "", height: "", weight: "" });
  const [bmiResult, setBmiResult] = useState<{ bmi: number; category: string; tdee: number } | null>(null);
  const [trialOpen, setTrialOpen] = useState(false);
  const [trialForm, setTrialForm] = useState({ name: "", phone: "", goal: "" });
  const [trialSubmitted, setTrialSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLocation, setActiveLocation] = useState(0);

  // ── BMI logic ──
  function calculateBMI() {
    const heightM = parseFloat(bmiData.height) / 100;
    const weightKg = parseFloat(bmiData.weight);
    const ageN = parseInt(bmiData.age);
    if (!heightM || !weightKg || !ageN) return;
    const bmi = weightKg / (heightM * heightM);
    const category =
      bmi < 18.5
        ? isUk ? "Недостатня вага" : "Underweight"
        : bmi < 25
        ? isUk ? "Нормальна вага" : "Normal weight"
        : bmi < 30
        ? isUk ? "Надлишкова вага" : "Overweight"
        : isUk ? "Ожиріння" : "Obesity";
    const bmrBase =
      bmiData.gender === "m"
        ? 88.36 + 13.4 * weightKg + 4.8 * parseFloat(bmiData.height) - 5.7 * ageN
        : 447.6 + 9.2 * weightKg + 3.1 * parseFloat(bmiData.height) - 4.3 * ageN;
    const tdee = Math.round(bmrBase * 1.55);
    setBmiResult({ bmi: Math.round(bmi * 10) / 10, category, tdee });
  }

  function getBmiBarColor(bmi: number) {
    if (bmi < 18.5) return "bg-blue-500";
    if (bmi < 25) return "bg-[#39FF14]";
    if (bmi < 30) return "bg-yellow-400";
    return "bg-red-500";
  }

  function getBmiBarWidth(bmi: number) {
    const pct = Math.min(100, Math.max(0, ((bmi - 10) / 30) * 100));
    return `${pct}%`;
  }

  function getBmiRecommendation(bmi: number) {
    if (bmi < 18.5) return isUk ? "Набір маси" : "Muscle gain";
    if (bmi < 25) return isUk ? "Підтримка" : "Maintenance";
    return isUk ? "Схуднення" : "Weight loss";
  }

  // ── Schedule helpers ──
  const filteredClasses = CLASSES.filter(
    (c) => c.day === scheduleDay && (scheduleFilter === "all" || c.type === scheduleFilter)
  );

  const selectedClassData = selectedClass !== null ? CLASSES.find((c) => c.id === selectedClass) : null;

  // ── Plan price ──
  function planPrice(key: "single" | "monthly" | "annual") {
    const base = PLANS[key][isUk ? "priceUk" : "priceEn"];
    return planScope === "all" ? Math.round(base * 1.2) : base;
  }

  // ── Trial submit ──
  function handleTrialSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTrialSubmitted(true);
  }

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen font-sans overflow-x-hidden">

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-40 bg-[#0A0A0A] border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
          {/* Logo */}
          <div className="text-xl font-black tracking-tight shrink-0">
            ⚡ FIT<span className="text-[#39FF14]">ZONE</span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-bold uppercase tracking-tight text-zinc-300">
            <a href="#schedule" className="hover:text-[#39FF14] transition-colors">{isUk ? "Тренування" : "Training"}</a>
            <a href="#plans" className="hover:text-[#39FF14] transition-colors">{isUk ? "Ціни" : "Prices"}</a>
            <a href="#trainers" className="hover:text-[#39FF14] transition-colors">{isUk ? "Тренери" : "Trainers"}</a>
            <a href="#locations" className="hover:text-[#39FF14] transition-colors">{isUk ? "Клуби" : "Clubs"}</a>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setTrialOpen(true); setTrialSubmitted(false); }}
              className="hidden sm:block bg-[#39FF14] text-black text-xs font-black uppercase tracking-tight px-4 py-2 rounded-lg shadow-[0_0_20px_rgba(57,255,20,0.4)] hover:shadow-[0_0_30px_rgba(57,255,20,0.6)] transition-all"
            >
              {isUk ? "7 днів безкоштовно" : "7 days free"}
            </button>
            <button className="text-zinc-400 hover:text-white text-lg">🛒</button>
            <button
              className="md:hidden text-zinc-400 hover:text-white text-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0A0A0A] border-t border-zinc-800 px-4 py-3 flex flex-col gap-3 text-sm font-bold uppercase tracking-tight text-zinc-300">
            <a href="#schedule" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#39FF14]">{isUk ? "Тренування" : "Training"}</a>
            <a href="#plans" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#39FF14]">{isUk ? "Ціни" : "Prices"}</a>
            <a href="#trainers" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#39FF14]">{isUk ? "Тренери" : "Trainers"}</a>
            <a href="#locations" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#39FF14]">{isUk ? "Клуби" : "Clubs"}</a>
            <button
              onClick={() => { setTrialOpen(true); setTrialSubmitted(false); setMobileMenuOpen(false); }}
              className="bg-[#39FF14] text-black px-4 py-2 rounded-lg font-black"
            >
              {isUk ? "7 днів безкоштовно" : "7 days free"}
            </button>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="bg-[#0A0A0A] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#39FF14] text-xs font-black uppercase tracking-widest mb-6">
            ⚡ {isUk ? "ОФІЦІЙНИЙ СПОРТИВНИЙ КЛУБ КИЄВА" : "OFFICIAL SPORTS CLUB OF KYIV"}
          </p>
          <h1 className="font-black uppercase text-[56px] md:text-[88px] leading-none tracking-tight text-white mb-4">
            {isUk ? "ЗМІНИ СЕБЕ." : "CHANGE YOURSELF."}
            <br />
            <span className="text-[#39FF14]">{isUk ? "ПОЧИНАЙ СЬОГОДНІ." : "START TODAY."}</span>
          </h1>
          <p className="text-zinc-400 text-base md:text-lg font-medium mb-8 max-w-xl mx-auto">
            {isUk
              ? "Три клуби в Києві. Понад 50 тренерів. Басейни, CrossFit, бокс, йога — все під одним дахом."
              : "Three clubs in Kyiv. 50+ trainers. Pools, CrossFit, boxing, yoga — all under one roof."}
          </p>

          {/* Countdown */}
          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-700 rounded-xl px-5 py-3 mb-8 text-sm font-bold">
            <span className="text-zinc-400">⏱ {isUk ? "Акція закінчується через:" : "Offer ends in:"}</span>
            <span className="text-[#39FF14] font-black text-base tracking-widest">02 : 47 : 15</span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button
              onClick={() => { setTrialOpen(true); setTrialSubmitted(false); }}
              className="bg-[#39FF14] text-black font-black uppercase tracking-tight px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(57,255,20,0.4)] hover:shadow-[0_0_35px_rgba(57,255,20,0.65)] transition-all text-base"
            >
              {isUk ? "ОТРИМАТИ 7 ДНІВ БЕЗКОШТОВНО" : "GET 7 DAYS FREE"}
            </button>
            <a
              href="#plans"
              className="border border-[#39FF14] text-[#39FF14] font-black uppercase tracking-tight px-8 py-4 rounded-xl hover:bg-[#39FF14] hover:text-black transition-all text-base"
            >
              {isUk ? "ОБРАТИ АБОНЕМЕНТ" : "CHOOSE PLAN"}
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs font-black uppercase tracking-widest text-zinc-400">
            <span>24/7</span>
            <span className="text-zinc-600">·</span>
            <span>{isUk ? "50+ ТРЕНЕРІВ" : "50+ TRAINERS"}</span>
            <span className="text-zinc-600">·</span>
            <span>{isUk ? "3 ЛОКАЦІЇ" : "3 LOCATIONS"}</span>
            <span className="text-zinc-600">·</span>
            <span>{isUk ? "5 000 ЧЛЕНІВ КЛУБУ" : "5,000 MEMBERS"}</span>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="plans" className="bg-[#1A1A1A] py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-black uppercase text-3xl md:text-4xl tracking-tight text-center mb-2">
            {isUk ? "АБОНЕМЕНТИ" : "MEMBERSHIPS"}
          </h2>
          <p className="text-zinc-400 text-center text-sm mb-8">
            {isUk ? "Обери план, що підходить саме тобі" : "Choose the plan that fits you best"}
          </p>

          {/* Scope toggle */}
          <div className="flex justify-center mb-10">
            <div className="flex bg-zinc-800 rounded-xl p-1 text-sm font-black uppercase">
              <button
                onClick={() => setPlanScope("one")}
                className={`px-5 py-2 rounded-lg transition-all ${planScope === "one" ? "bg-[#39FF14] text-black" : "text-zinc-400 hover:text-white"}`}
              >
                {isUk ? "1 клуб" : "1 club"}
              </button>
              <button
                onClick={() => setPlanScope("all")}
                className={`px-5 py-2 rounded-lg transition-all ${planScope === "all" ? "bg-[#39FF14] text-black" : "text-zinc-400 hover:text-white"}`}
              >
                {isUk ? "Вся мережа (+20%)" : "All clubs (+20%)"}
              </button>
            </div>
          </div>

          {/* Plan cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(["single", "monthly", "annual"] as const).map((key) => {
              const plan = PLANS[key];
              const price = planPrice(key);
              const isActive = activePlan === key;
              const isPopular = key === "monthly";
              const isSave = key === "annual";

              return (
                <div
                  key={key}
                  onClick={() => setActivePlan(key)}
                  className={`relative rounded-2xl border-2 p-6 cursor-pointer transition-all ${
                    isActive
                      ? "border-[#39FF14] bg-zinc-900 shadow-[0_0_24px_rgba(57,255,20,0.2)]"
                      : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#39FF14] text-black text-[10px] font-black uppercase px-3 py-1 rounded-full">
                      {isUk ? "Найпопулярніший" : "Most popular"}
                    </div>
                  )}
                  {isSave && (
                    <div className="absolute -top-3 right-4 bg-red-500 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full">
                      -30%
                    </div>
                  )}

                  <div className="font-black uppercase tracking-tight text-sm text-zinc-400 mb-1">
                    {plan[isUk ? "labelUk" : "labelEn"]}
                  </div>

                  <div className="flex items-baseline gap-1 mb-1">
                    {isSave && (
                      <span className="text-zinc-600 line-through text-sm">
                        {planScope === "all" ? Math.round(1272 * 1.2) : 1272} ₴
                      </span>
                    )}
                    <span className="text-3xl font-black text-white">{price} ₴</span>
                  </div>
                  <div className="text-xs text-zinc-500 mb-5">
                    {plan[isUk ? "perUk" : "perEn"]}
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 text-sm text-zinc-300 mb-6">
                    {key === "single" && (
                      <>
                        <li className="flex items-center gap-2"><span className="text-[#39FF14]">✓</span>{isUk ? "1 відвідування" : "1 visit"}</li>
                        <li className="flex items-center gap-2"><span className="text-[#39FF14]">✓</span>{isUk ? "Всі зони клубу" : "All club zones"}</li>
                        <li className="flex items-center gap-2"><span className="text-zinc-600">–</span>{isUk ? "Групові заняття" : "Group classes"}</li>
                      </>
                    )}
                    {key === "monthly" && (
                      <>
                        <li className="flex items-center gap-2"><span className="text-[#39FF14]">✓</span>{isUk ? "Необмежені відвідування" : "Unlimited visits"}</li>
                        <li className="flex items-center gap-2"><span className="text-[#39FF14]">✓</span>{isUk ? "Всі групові заняття" : "All group classes"}</li>
                        <li className="flex items-center gap-2"><span className="text-[#39FF14]">✓</span>{isUk ? "Басейн включено" : "Pool included"}</li>
                        <li className="flex items-center gap-2"><span className="text-zinc-600">–</span>{isUk ? "Персональний тренер" : "Personal trainer"}</li>
                      </>
                    )}
                    {key === "annual" && (
                      <>
                        <li className="flex items-center gap-2"><span className="text-[#39FF14]">✓</span>{isUk ? "Необмежені відвідування" : "Unlimited visits"}</li>
                        <li className="flex items-center gap-2"><span className="text-[#39FF14]">✓</span>{isUk ? "Всі групові заняття" : "All group classes"}</li>
                        <li className="flex items-center gap-2"><span className="text-[#39FF14]">✓</span>{isUk ? "Басейн включено" : "Pool included"}</li>
                        <li className="flex items-center gap-2"><span className="text-[#39FF14]">✓</span>{isUk ? "2 персональні (подарунок)" : "2 personal sessions (gift)"}</li>
                      </>
                    )}
                  </ul>

                  <button
                    className={`w-full py-3 rounded-xl font-black uppercase text-sm transition-all ${
                      isActive
                        ? "bg-[#39FF14] text-black shadow-[0_0_16px_rgba(57,255,20,0.4)]"
                        : "bg-zinc-700 text-white hover:bg-zinc-600"
                    }`}
                  >
                    {isUk ? "Обрати" : "Choose"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SCHEDULE ── */}
      <section id="schedule" className="bg-[#0A0A0A] py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-black uppercase text-3xl md:text-4xl tracking-tight text-center mb-2">
            {isUk ? "РОЗКЛАД ЗАНЯТЬ" : "CLASS SCHEDULE"}
          </h2>
          <p className="text-zinc-400 text-center text-sm mb-8">
            {isUk ? "Обери день та тип тренування" : "Choose a day and training type"}
          </p>

          {/* Day tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
            {DAYS.map((d) => (
              <button
                key={d.id}
                onClick={() => { setScheduleDay(d.id); setSelectedClass(null); }}
                className={`shrink-0 px-5 py-2 rounded-xl font-black uppercase text-sm transition-all ${
                  scheduleDay === d.id
                    ? "bg-[#39FF14] text-black"
                    : "bg-zinc-800 text-zinc-400 hover:text-white"
                }`}
              >
                {isUk ? d.ukL : d.enL}
              </button>
            ))}
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {["all", "yoga", "crossfit", "boxing", "stretching", "swimming"].map((f) => {
              const labels: Record<string, [string, string]> = {
                all: ["Всі", "All"], yoga: ["Йога", "Yoga"], crossfit: ["CrossFit", "CrossFit"],
                boxing: ["Бокс", "Boxing"], stretching: ["Стретчинг", "Stretching"], swimming: ["Плавання", "Swimming"],
              };
              return (
                <button
                  key={f}
                  onClick={() => { setScheduleFilter(f); setSelectedClass(null); }}
                  className={`px-4 py-1.5 rounded-full text-xs font-black uppercase transition-all border ${
                    scheduleFilter === f
                      ? "border-[#39FF14] text-[#39FF14] bg-[#39FF14]/10"
                      : "border-zinc-700 text-zinc-400 hover:border-zinc-500"
                  }`}
                >
                  {isUk ? labels[f][0] : labels[f][1]}
                </button>
              );
            })}
          </div>

          {/* Classes list */}
          {filteredClasses.length === 0 ? (
            <div className="text-center text-zinc-600 py-12 text-sm">
              {isUk ? "Немає занять за обраними фільтрами" : "No classes for selected filters"}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredClasses.map((cls) => {
                const isSelected = selectedClass === cls.id;
                return (
                  <div key={cls.id}>
                    <button
                      onClick={() => setSelectedClass(isSelected ? null : cls.id)}
                      className={`w-full text-left rounded-xl border p-4 transition-all ${
                        isSelected
                          ? "border-[#39FF14] bg-zinc-900"
                          : "border-zinc-800 bg-[#1A1A1A] hover:border-zinc-600"
                      }`}
                    >
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-black text-[#39FF14] text-sm shrink-0">{cls.time}</span>
                        <span className="font-bold text-white flex-1 min-w-0 truncate">
                          {isUk ? cls.nameUk : cls.nameEn}
                        </span>
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full shrink-0 ${TYPE_COLORS[cls.type] || "bg-zinc-800 text-zinc-300"}`}>
                          {cls.type}
                        </span>
                        <span className="text-xs text-zinc-400 shrink-0">
                          {isUk ? cls.trainerUk : cls.trainerEn}
                        </span>
                        {cls.spotsLeft === 0 ? (
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-zinc-700 text-zinc-400 shrink-0">
                            {isUk ? "Зайнято" : "Full"}
                          </span>
                        ) : cls.spotsLeft <= 3 ? (
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-900 text-amber-300 shrink-0">
                            {isUk ? `Лишилось ${cls.spotsLeft} місць!` : `${cls.spotsLeft} spots left!`}
                          </span>
                        ) : (
                          <span className="text-[10px] text-zinc-500 shrink-0">
                            {cls.spotsLeft}/{cls.spots}
                          </span>
                        )}
                      </div>
                    </button>

                    {/* Detail drawer */}
                    {isSelected && (
                      <div className="bg-zinc-900 border border-[#39FF14]/30 rounded-xl p-5 mt-1">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                          <div>
                            <div className="text-zinc-500 text-xs uppercase font-black mb-1">{isUk ? "Тренер" : "Trainer"}</div>
                            <div className="font-bold">{isUk ? cls.trainerUk : cls.trainerEn}</div>
                          </div>
                          <div>
                            <div className="text-zinc-500 text-xs uppercase font-black mb-1">{isUk ? "Тривалість" : "Duration"}</div>
                            <div className="font-bold">{cls.duration} {isUk ? "хв" : "min"}</div>
                          </div>
                          <div>
                            <div className="text-zinc-500 text-xs uppercase font-black mb-1">{isUk ? "Рівень" : "Level"}</div>
                            <div className="font-bold">{cls.level}</div>
                          </div>
                          <div>
                            <div className="text-zinc-500 text-xs uppercase font-black mb-1">{isUk ? "Місця" : "Spots"}</div>
                            <div className="font-bold">{cls.spotsLeft}/{cls.spots}</div>
                          </div>
                        </div>
                        <button
                          disabled={cls.spotsLeft === 0}
                          className={`px-6 py-2.5 rounded-xl font-black uppercase text-sm transition-all ${
                            cls.spotsLeft === 0
                              ? "bg-zinc-700 text-zinc-500 cursor-not-allowed"
                              : "bg-[#39FF14] text-black shadow-[0_0_16px_rgba(57,255,20,0.3)] hover:shadow-[0_0_24px_rgba(57,255,20,0.5)]"
                          }`}
                        >
                          {cls.spotsLeft === 0
                            ? (isUk ? "Місць немає" : "No spots")
                            : (isUk ? "Записатись" : "Sign up")}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── TRAINERS ── */}
      <section id="trainers" className="bg-[#1A1A1A] py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-black uppercase text-3xl md:text-4xl tracking-tight text-center mb-2">
            {isUk ? "НАШІ ТРЕНЕРИ" : "OUR TRAINERS"}
          </h2>
          <p className="text-zinc-400 text-center text-sm mb-10">
            {isUk ? "Досвідчені професіонали, які допоможуть досягти мети" : "Experienced professionals to help you reach your goal"}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TRAINERS.map((t, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col hover:border-zinc-600 transition-all">
                <div className="text-5xl mb-3">{t.emoji}</div>
                <div className="font-black uppercase tracking-tight text-white text-base mb-1">
                  {isUk ? t.nameUk : t.nameEn}
                </div>
                <div className="text-xs text-[#39FF14] font-bold mb-1">
                  {isUk ? t.specUk : t.specEn}
                </div>
                <div className="text-xs text-zinc-500 mb-3">
                  {isUk ? t.stageUk : t.stageEn}
                </div>
                <div className="flex items-center gap-1 text-xs text-zinc-400 mb-4">
                  <span className="text-yellow-400">★</span>
                  <span>{t.reviews} {isUk ? "відгуків" : "reviews"}</span>
                </div>
                <button className="mt-auto border border-[#39FF14] text-[#39FF14] text-xs font-black uppercase px-4 py-2 rounded-xl hover:bg-[#39FF14] hover:text-black transition-all">
                  {isUk ? "Записатись на персональне" : "Book personal session"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BMI CALCULATOR ── */}
      <section id="calculator" className="bg-[#0A0A0A] py-14 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-black uppercase text-3xl md:text-4xl tracking-tight text-center mb-2">
            {isUk ? "РОЗРАХУЙ СВІЙ ПРОГРЕС" : "CALCULATE YOUR PROGRESS"}
          </h2>
          <p className="text-zinc-400 text-center text-sm mb-10">
            {isUk ? "BMI, TDEE та персональна рекомендація програми" : "BMI, TDEE and personal program recommendation"}
          </p>

          <div className="bg-[#1A1A1A] border border-zinc-800 rounded-2xl p-6">
            {/* Gender */}
            <div className="mb-5">
              <div className="text-xs font-black uppercase text-zinc-400 mb-2">{isUk ? "Стать" : "Gender"}</div>
              <div className="flex gap-3">
                {[{ v: "m", ukL: "Чоловік", enL: "Male" }, { v: "f", ukL: "Жінка", enL: "Female" }].map((g) => (
                  <button
                    key={g.v}
                    onClick={() => setBmiData({ ...bmiData, gender: g.v })}
                    className={`px-5 py-2 rounded-xl font-black uppercase text-sm transition-all border ${
                      bmiData.gender === g.v
                        ? "border-[#39FF14] bg-[#39FF14]/10 text-[#39FF14]"
                        : "border-zinc-700 text-zinc-400 hover:border-zinc-500"
                    }`}
                  >
                    {isUk ? g.ukL : g.enL}
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { key: "age", ukL: "Вік", enL: "Age", placeholder: "25" },
                { key: "height", ukL: "Зріст (см)", enL: "Height (cm)", placeholder: "175" },
                { key: "weight", ukL: "Вага (кг)", enL: "Weight (kg)", placeholder: "75" },
              ].map((inp) => (
                <div key={inp.key}>
                  <label className="block text-xs font-black uppercase text-zinc-400 mb-1">
                    {isUk ? inp.ukL : inp.enL}
                  </label>
                  <input
                    type="number"
                    value={bmiData[inp.key as keyof typeof bmiData]}
                    onChange={(e) => setBmiData({ ...bmiData, [inp.key]: e.target.value })}
                    placeholder={inp.placeholder}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#39FF14] transition-colors"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={calculateBMI}
              className="w-full bg-[#39FF14] text-black font-black uppercase py-3 rounded-xl shadow-[0_0_20px_rgba(57,255,20,0.3)] hover:shadow-[0_0_30px_rgba(57,255,20,0.5)] transition-all mb-6"
            >
              {isUk ? "Розрахувати" : "Calculate"}
            </button>

            {/* Result */}
            {bmiResult && (
              <div className="border-t border-zinc-700 pt-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-5xl font-black text-[#39FF14]">{bmiResult.bmi}</span>
                  <span className="text-sm text-zinc-400 font-bold">BMI</span>
                  <span className="text-sm font-bold text-white ml-2">{bmiResult.category}</span>
                </div>

                {/* Bar */}
                <div className="h-3 bg-zinc-700 rounded-full mb-4 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${getBmiBarColor(bmiResult.bmi)}`}
                    style={{ width: getBmiBarWidth(bmiResult.bmi) }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-5">
                  <div className="bg-zinc-800 rounded-xl p-3">
                    <div className="text-xs text-zinc-500 uppercase font-black mb-1">TDEE</div>
                    <div className="font-black text-white text-lg">{bmiResult.tdee} <span className="text-xs text-zinc-400">ккал</span></div>
                  </div>
                  <div className="bg-zinc-800 rounded-xl p-3">
                    <div className="text-xs text-zinc-500 uppercase font-black mb-1">{isUk ? "Рекомендація" : "Recommendation"}</div>
                    <div className="font-black text-[#39FF14] text-sm">{getBmiRecommendation(bmiResult.bmi)}</div>
                  </div>
                </div>

                <p className="text-xs text-zinc-500">
                  {isUk
                    ? `Для вашої мети рекомендуємо програму «${getBmiRecommendation(bmiResult.bmi)}»`
                    : `For your goal we recommend the "${getBmiRecommendation(bmiResult.bmi)}" program`}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── LOCATIONS ── */}
      <section id="locations" className="bg-[#1A1A1A] py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-black uppercase text-3xl md:text-4xl tracking-tight text-center mb-2">
            {isUk ? "НАШІ КЛУБИ" : "OUR CLUBS"}
          </h2>
          <p className="text-zinc-400 text-center text-sm mb-10">
            {isUk ? "3 локації в Києві" : "3 locations in Kyiv"}
          </p>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none justify-center">
            {LOCATIONS.map((loc, i) => (
              <button
                key={i}
                onClick={() => setActiveLocation(i)}
                className={`shrink-0 px-5 py-2.5 rounded-xl font-black uppercase text-sm transition-all ${
                  activeLocation === i
                    ? "bg-[#39FF14] text-black"
                    : "bg-zinc-800 text-zinc-400 hover:text-white"
                }`}
              >
                {loc.emoji} {isUk ? loc.nameUk : loc.nameEn}
              </button>
            ))}
          </div>

          {/* Active location card */}
          {(() => {
            const loc = LOCATIONS[activeLocation];
            return (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6">
                  <div className="text-4xl mb-3">{loc.emoji}</div>
                  <div className="font-black uppercase tracking-tight text-xl text-white mb-1">
                    {isUk ? loc.nameUk : loc.nameEn}
                  </div>
                  <div className="text-zinc-400 text-sm mb-1">{isUk ? loc.addressUk : loc.addressEn}</div>
                  <div className="text-[#39FF14] text-sm font-bold mb-5">
                    {isUk ? "Графік: " : "Hours: "}{loc.hours}
                  </div>
                  <div className="mb-6">
                    <div className="text-xs font-black uppercase text-zinc-500 mb-2">{isUk ? "Зони та послуги" : "Zones & services"}</div>
                    <ul className="space-y-1">
                      {loc.features.map((f, fi) => (
                        <li key={fi} className="flex items-center gap-2 text-sm text-zinc-300">
                          <span className="text-[#39FF14]">✓</span>{f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={() => { setTrialOpen(true); setTrialSubmitted(false); }}
                    className="w-full bg-[#39FF14] text-black font-black uppercase py-3 rounded-xl shadow-[0_0_16px_rgba(57,255,20,0.3)] hover:shadow-[0_0_28px_rgba(57,255,20,0.5)] transition-all text-sm"
                  >
                    {isUk ? "Вибрати цей клуб" : "Choose this club"}
                  </button>
                </div>
                {/* Map placeholder */}
                <div className="bg-zinc-800 rounded-2xl h-64 md:h-auto flex items-center justify-center text-zinc-600 text-sm">
                  {isUk ? "📍 Карта" : "📍 Map"}
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-zinc-950 border-t border-zinc-800 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-xl font-black tracking-tight mb-3">
                ⚡ FIT<span className="text-[#39FF14]">ZONE</span>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed">
                {isUk
                  ? "Мережа фітнес-клубів у Києві. Досягай більшого разом з нами."
                  : "Fitness club network in Kyiv. Achieve more with us."}
              </p>
            </div>
            <div>
              <div className="font-black uppercase text-xs tracking-widest text-zinc-400 mb-3">{isUk ? "Навігація" : "Navigation"}</div>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li><a href="#schedule" className="hover:text-[#39FF14] transition-colors">{isUk ? "Розклад" : "Schedule"}</a></li>
                <li><a href="#plans" className="hover:text-[#39FF14] transition-colors">{isUk ? "Ціни" : "Prices"}</a></li>
                <li><a href="#trainers" className="hover:text-[#39FF14] transition-colors">{isUk ? "Тренери" : "Trainers"}</a></li>
                <li><a href="#locations" className="hover:text-[#39FF14] transition-colors">{isUk ? "Клуби" : "Clubs"}</a></li>
              </ul>
            </div>
            <div>
              <div className="font-black uppercase text-xs tracking-widest text-zinc-400 mb-3">{isUk ? "Контакти" : "Contact"}</div>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li>📞 +38 (044) 123-45-67</li>
                <li>✉️ info@fitzone.ua</li>
                <li>📱 Instagram · Facebook · TikTok</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-zinc-800 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-zinc-600">© 2024 FitZone. {isUk ? "Всі права захищено." : "All rights reserved."}</div>
            <div className="flex items-center gap-2 text-zinc-600 text-xs">
              <span>💳 Visa</span>
              <span>💳 Mastercard</span>
              <span>📱 Apple Pay</span>
              <span>📱 Google Pay</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ── TRIAL MODAL ── */}
      {trialOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setTrialOpen(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white text-lg"
            >
              ✕
            </button>

            {trialSubmitted ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">✅</div>
                <div className="text-[#39FF14] text-4xl font-black mb-2">✓</div>
                <h3 className="font-black uppercase text-xl tracking-tight text-white mb-2">
                  {isUk ? "Заявку надіслано!" : "Request sent!"}
                </h3>
                <p className="text-zinc-400 text-sm">
                  {isUk
                    ? "Наш менеджер зв'яжеться з вами найближчим часом."
                    : "Our manager will contact you shortly."}
                </p>
              </div>
            ) : (
              <>
                <h3 className="font-black uppercase text-xl tracking-tight text-white mb-1">
                  {isUk ? "7 ДНІВ БЕЗКОШТОВНО" : "7 DAYS FREE"}
                </h3>
                <p className="text-zinc-400 text-sm mb-6">
                  {isUk ? "Залиш заявку — ми зателефонуємо та активуємо пробний доступ." : "Leave a request — we'll call and activate your trial access."}
                </p>
                <form onSubmit={handleTrialSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-black uppercase text-zinc-400 mb-1">{isUk ? "Ім'я" : "Name"}</label>
                    <input
                      required
                      type="text"
                      value={trialForm.name}
                      onChange={(e) => setTrialForm({ ...trialForm, name: e.target.value })}
                      placeholder={isUk ? "Ваше ім'я" : "Your name"}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#39FF14] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase text-zinc-400 mb-1">{isUk ? "Телефон" : "Phone"}</label>
                    <input
                      required
                      type="tel"
                      value={trialForm.phone}
                      onChange={(e) => setTrialForm({ ...trialForm, phone: e.target.value })}
                      placeholder="+38 (___) ___-__-__"
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#39FF14] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase text-zinc-400 mb-1">{isUk ? "Мета" : "Goal"}</label>
                    <select
                      required
                      value={trialForm.goal}
                      onChange={(e) => setTrialForm({ ...trialForm, goal: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#39FF14] transition-colors"
                    >
                      <option value="">{isUk ? "Обери мету..." : "Choose goal..."}</option>
                      <option value="loss">{isUk ? "Схуднення" : "Weight loss"}</option>
                      <option value="gain">{isUk ? "Набір маси" : "Muscle gain"}</option>
                      <option value="endurance">{isUk ? "Витривалість" : "Endurance"}</option>
                      <option value="health">{isUk ? "Здоров'я" : "Health"}</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#39FF14] text-black font-black uppercase py-3.5 rounded-xl shadow-[0_0_20px_rgba(57,255,20,0.4)] hover:shadow-[0_0_32px_rgba(57,255,20,0.6)] transition-all text-sm mt-2"
                  >
                    {isUk ? "ОТРИМАТИ 7 ДНІВ БЕЗКОШТОВНО" : "GET 7 DAYS FREE"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
