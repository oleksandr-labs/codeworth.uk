"use client";

import { useState } from "react";

// ─── Data ───────────────────────────────────────────────────────────────────

const DAYS = [
  { id: "Mon", enL: "Mon", ukL: "Пн" },
  { id: "Tue", enL: "Tue", ukL: "Вт" },
  { id: "Wed", enL: "Wed", ukL: "Ср" },
  { id: "Thu", enL: "Thu", ukL: "Чт" },
  { id: "Fri", enL: "Fri", ukL: "Пт" },
  { id: "Sat", enL: "Sat", ukL: "Сб" },
  { id: "Sun", enL: "Sun", ukL: "Нд" },
];

const SCHEDULE: Record<string, { time: string; nameEn: string; nameUk: string; trainerEn: string; trainerUk: string; intensity: string; spots: number }[]> = {
  Mon: [
    { time: "07:00", nameEn: "Morning Yoga", nameUk: "Ранкова йога", trainerEn: "Olena M.", trainerUk: "Олена М.", intensity: "🟢", spots: 5 },
    { time: "09:30", nameEn: "CrossFit Burn", nameUk: "CrossFit Burn", trainerEn: "Artem K.", trainerUk: "Артем К.", intensity: "🔴", spots: 2 },
    { time: "12:00", nameEn: "Pilates Core", nameUk: "Пілатес Core", trainerEn: "Olena M.", trainerUk: "Олена М.", intensity: "🟢", spots: 8 },
    { time: "17:00", nameEn: "Boxing Basics", nameUk: "Бокс для початківців", trainerEn: "Dmytro S.", trainerUk: "Дмитро С.", intensity: "🟡", spots: 3 },
    { time: "19:00", nameEn: "HIIT Express", nameUk: "HIIT Експрес", trainerEn: "Artem K.", trainerUk: "Артем К.", intensity: "🔴", spots: 0 },
    { time: "20:30", nameEn: "Stretching & Relax", nameUk: "Стретчинг і релакс", trainerEn: "Olena M.", trainerUk: "Олена М.", intensity: "🟢", spots: 12 },
  ],
  Tue: [
    { time: "07:30", nameEn: "Swimming Technique", nameUk: "Плавання: техніка", trainerEn: "Viktor P.", trainerUk: "Віктор П.", intensity: "🟡", spots: 4 },
    { time: "10:00", nameEn: "Spinning Power", nameUk: "Spinning Power", trainerEn: "Artem K.", trainerUk: "Артем К.", intensity: "🔴", spots: 6 },
    { time: "12:30", nameEn: "Yoga Flow", nameUk: "Йога Flow", trainerEn: "Olena M.", trainerUk: "Олена М.", intensity: "🟢", spots: 10 },
    { time: "17:30", nameEn: "CrossFit WOD", nameUk: "CrossFit WOD", trainerEn: "Artem K.", trainerUk: "Артем К.", intensity: "🔴", spots: 1 },
    { time: "19:30", nameEn: "Boxing Sparring", nameUk: "Бокс: спаринг", trainerEn: "Dmytro S.", trainerUk: "Дмитро С.", intensity: "🔴", spots: 0 },
  ],
  Wed: [
    { time: "07:00", nameEn: "Pilates Mat", nameUk: "Пілатес на матах", trainerEn: "Olena M.", trainerUk: "Олена М.", intensity: "🟢", spots: 7 },
    { time: "09:00", nameEn: "HIIT Cardio", nameUk: "HIIT Кардіо", trainerEn: "Artem K.", trainerUk: "Артем К.", intensity: "🔴", spots: 3 },
    { time: "12:00", nameEn: "Swimming Endurance", nameUk: "Плавання: витривалість", trainerEn: "Viktor P.", trainerUk: "Віктор П.", intensity: "🟡", spots: 5 },
    { time: "17:00", nameEn: "Yoga Restore", nameUk: "Відновлювальна йога", trainerEn: "Olena M.", trainerUk: "Олена М.", intensity: "🟢", spots: 14 },
    { time: "19:00", nameEn: "CrossFit Strength", nameUk: "CrossFit Сила", trainerEn: "Artem K.", trainerUk: "Артем К.", intensity: "🔴", spots: 2 },
    { time: "20:30", nameEn: "Spinning Chill", nameUk: "Spinning Chill", trainerEn: "Artem K.", trainerUk: "Артем К.", intensity: "🟡", spots: 9 },
  ],
  Thu: [
    { time: "07:30", nameEn: "Morning Yoga", nameUk: "Ранкова йога", trainerEn: "Olena M.", trainerUk: "Олена М.", intensity: "🟢", spots: 6 },
    { time: "10:00", nameEn: "Boxing Conditioning", nameUk: "Бокс: кондиція", trainerEn: "Dmytro S.", trainerUk: "Дмитро С.", intensity: "🟡", spots: 4 },
    { time: "12:00", nameEn: "Pilates Reformer", nameUk: "Пілатес Reformer", trainerEn: "Olena M.", trainerUk: "Олена М.", intensity: "🟡", spots: 3 },
    { time: "17:30", nameEn: "HIIT Tabata", nameUk: "HIIT Табата", trainerEn: "Artem K.", trainerUk: "Артем К.", intensity: "🔴", spots: 1 },
    { time: "19:00", nameEn: "Swimming Masters", nameUk: "Плавання Masters", trainerEn: "Viktor P.", trainerUk: "Віктор П.", intensity: "🟡", spots: 5 },
  ],
  Fri: [
    { time: "07:00", nameEn: "CrossFit Endurance", nameUk: "CrossFit Витривалість", trainerEn: "Artem K.", trainerUk: "Артем К.", intensity: "🔴", spots: 4 },
    { time: "09:30", nameEn: "Yoga & Meditation", nameUk: "Йога і медитація", trainerEn: "Olena M.", trainerUk: "Олена М.", intensity: "🟢", spots: 11 },
    { time: "12:00", nameEn: "Spinning Hills", nameUk: "Spinning Hills", trainerEn: "Artem K.", trainerUk: "Артем К.", intensity: "🟡", spots: 7 },
    { time: "17:00", nameEn: "Boxing Technique", nameUk: "Бокс: техніка", trainerEn: "Dmytro S.", trainerUk: "Дмитро С.", intensity: "🟡", spots: 5 },
    { time: "19:00", nameEn: "HIIT Full Body", nameUk: "HIIT Full Body", trainerEn: "Artem K.", trainerUk: "Артем К.", intensity: "🔴", spots: 0 },
    { time: "20:30", nameEn: "Pilates & Stretch", nameUk: "Пілатес і стретчинг", trainerEn: "Olena M.", trainerUk: "Олена М.", intensity: "🟢", spots: 9 },
  ],
  Sat: [
    { time: "09:00", nameEn: "CrossFit Community", nameUk: "CrossFit Community", trainerEn: "Artem K.", trainerUk: "Артем К.", intensity: "🟡", spots: 8 },
    { time: "10:30", nameEn: "Yoga in the Park", nameUk: "Йога в парку", trainerEn: "Olena M.", trainerUk: "Олена М.", intensity: "🟢", spots: 20 },
    { time: "12:00", nameEn: "Swimming Open", nameUk: "Плавання вільне", trainerEn: "Viktor P.", trainerUk: "Віктор П.", intensity: "🟢", spots: 15 },
    { time: "14:00", nameEn: "Boxing Sparring", nameUk: "Бокс: спаринг", trainerEn: "Dmytro S.", trainerUk: "Дмитро С.", intensity: "🔴", spots: 2 },
    { time: "16:00", nameEn: "Spinning Party", nameUk: "Spinning Party", trainerEn: "Artem K.", trainerUk: "Артем К.", intensity: "🟡", spots: 6 },
  ],
  Sun: [
    { time: "09:00", nameEn: "Yoga & Meditation", nameUk: "Йога і медитація", trainerEn: "Olena M.", trainerUk: "Олена М.", intensity: "🟢", spots: 18 },
    { time: "10:30", nameEn: "Pilates Restore", nameUk: "Пілатес відновлення", trainerEn: "Olena M.", trainerUk: "Олена М.", intensity: "🟢", spots: 12 },
    { time: "12:00", nameEn: "Swimming Family", nameUk: "Плавання сімейне", trainerEn: "Viktor P.", trainerUk: "Віктор П.", intensity: "🟢", spots: 10 },
    { time: "14:00", nameEn: "HIIT Light", nameUk: "HIIT Light", trainerEn: "Artem K.", trainerUk: "Артем К.", intensity: "🟡", spots: 7 },
    { time: "16:00", nameEn: "Stretching Deep", nameUk: "Глибокий стретчинг", trainerEn: "Olena M.", trainerUk: "Олена М.", intensity: "🟢", spots: 14 },
  ],
};

const PLANS = [
  {
    id: "day",
    nameEn: "Day Pass",
    nameUk: "Денний абонемент",
    price: 250,
    perEn: "per visit",
    perUk: "за візит",
    popular: false,
    featuresEn: ["Access to all zones", "Shower & locker", "1 group class"],
    featuresUk: ["Доступ до всіх зон", "Душ і шафка", "1 групове заняття"],
  },
  {
    id: "monthly",
    nameEn: "Monthly",
    nameUk: "Місячний",
    price: 1500,
    perEn: "per month",
    perUk: "на місяць",
    popular: false,
    featuresEn: ["Unlimited classes", "Sauna access", "Free towels", "1 personal session"],
    featuresUk: ["Необмежені заняття", "Доступ до сауни", "Безкоштовні рушники", "1 персональне заняття"],
  },
  {
    id: "quarterly",
    nameEn: "Quarterly",
    nameUk: "Квартальний",
    price: 3600,
    perEn: "per 3 months",
    perUk: "за 3 місяці",
    popular: true,
    featuresEn: ["Unlimited classes", "Sauna & pool", "Free towels", "3 personal sessions", "Body composition test", "20% off smoothie bar"],
    featuresUk: ["Необмежені заняття", "Сауна і басейн", "Безкоштовні рушники", "3 персональні заняття", "Тест складу тіла", "20% знижка на бар"],
  },
  {
    id: "annual",
    nameEn: "Annual",
    nameUk: "Річний",
    price: 12000,
    perEn: "per year",
    perUk: "на рік",
    popular: false,
    featuresEn: ["Unlimited everything", "Sauna, pool & spa", "Unlimited towels", "12 personal sessions", "Monthly body test", "Free smoothie bar", "Guest pass 2x/month", "Priority booking"],
    featuresUk: ["Необмежений доступ", "Сауна, басейн і спа", "Необмежені рушники", "12 персональних занять", "Щомісячний тест тіла", "Безкоштовний бар", "Гостьовий пропуск 2р/міс", "Пріоритетне бронювання"],
  },
];

const TRAINERS = [
  { nameEn: "Artem Kovalenko", nameUk: "Артем Коваленко", specEn: "CrossFit · HIIT · Functional Training", specUk: "CrossFit · HIIT · Функціональний тренінг", certsEn: "CF-L3, NSCA-CPT", certsUk: "CF-L3, NSCA-CPT", emoji: "🏋️" },
  { nameEn: "Olena Melnyk", nameUk: "Олена Мельник", specEn: "Yoga · Pilates · Stretching", specUk: "Йога · Пілатес · Стретчинг", certsEn: "RYT-500, Balanced Body", certsUk: "RYT-500, Balanced Body", emoji: "🧘" },
  { nameEn: "Dmytro Savchenko", nameUk: "Дмитро Савченко", specEn: "Boxing · MMA · Self-defense", specUk: "Бокс · ММА · Самооборона", certsEn: "CMS Boxing, ACE-CPT", certsUk: "КМС з боксу, ACE-CPT", emoji: "🥊" },
  { nameEn: "Viktor Petrenko", nameUk: "Віктор Петренко", specEn: "Swimming · Triathlon · Aqua Fitness", specUk: "Плавання · Тріатлон · Аквафітнес", certsEn: "FINA Level 2, ASCA", certsUk: "FINA Level 2, ASCA", emoji: "🏊" },
];

const FACILITIES = [
  { emoji: "🏃", nameEn: "Cardio Zone", nameUk: "Кардіо зона", descEn: "50+ machines — treadmills, ellipticals, rowers, bikes with personal screens", descUk: "50+ тренажерів — бігові доріжки, еліптичні, гребні, велосипеди з екранами" },
  { emoji: "🏋️", nameEn: "Free Weights", nameUk: "Вільні ваги", descEn: "Dumbbells 1-60 kg, barbells, squat racks, competition benches", descUk: "Гантелі 1-60 кг, штанги, стійки для присідань, змагальні лавки" },
  { emoji: "🤸", nameEn: "Group Studio", nameUk: "Групова студія", descEn: "200m² sprung floor, mirrors, sound system, capacity 30 people", descUk: "200м² пружна підлога, дзеркала, звукова система, до 30 осіб" },
  { emoji: "🏊", nameEn: "Pool", nameUk: "Басейн", descEn: "25m heated pool, 6 lanes, kids area, aqua fitness classes", descUk: "25м підігрів басейн, 6 доріжок, дитяча зона, аквафітнес" },
  { emoji: "🧖", nameEn: "Sauna & Steam", nameUk: "Сауна і парна", descEn: "Finnish sauna, steam room, cold plunge pool, relaxation area", descUk: "Фінська сауна, парна, крижана купіль, зона відпочинку" },
  { emoji: "🥤", nameEn: "Smoothie Bar", nameUk: "Смузі Бар", descEn: "Fresh juices, protein shakes, healthy snacks, post-workout meals", descUk: "Свіжі соки, протеїнові шейки, здорові перекуси, посттренувальне харчування" },
];

const STORIES = [
  { nameEn: "Andriy T.", nameUk: "Андрій Т.", monthsEn: "6 months", monthsUk: "6 місяців", resultEn: "Lost 14 kg, gained visible abs, now runs 5K in under 22 min", resultUk: "Скинув 14 кг, отримав видимий прес, біжить 5К за 22 хв", emoji: "🔥" },
  { nameEn: "Maryna K.", nameUk: "Марина К.", monthsEn: "4 months", monthsUk: "4 місяці", resultEn: "Dropped 2 dress sizes, improved posture, no more back pain", resultUk: "Зменшила розмір одягу на 2, покращила поставу, немає болю у спині", emoji: "⭐" },
  { nameEn: "Oleksandr V.", nameUk: "Олександр В.", monthsEn: "8 months", monthsUk: "8 місяців", resultEn: "Gained 8 kg of muscle, bench press went from 60 to 110 kg", resultUk: "Набрав 8 кг м'язів, жим лежачи зріс з 60 до 110 кг", emoji: "💪" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export function FitLifeDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [activeDay, setActiveDay] = useState("Mon");
  const [mobileMenu, setMobileMenu] = useState(false);

  // BMI calculator state
  const [bmiHeight, setBmiHeight] = useState("");
  const [bmiWeight, setBmiWeight] = useState("");
  const [bmiAge, setBmiAge] = useState("");
  const [bmiGender, setBmiGender] = useState<"male" | "female">("male");
  const [bmiResult, setBmiResult] = useState<{ bmi: number; type: string; program: string; color: string } | null>(null);

  // Trial form state
  const [trialName, setTrialName] = useState("");
  const [trialPhone, setTrialPhone] = useState("");
  const [trialClass, setTrialClass] = useState("");
  const [trialSubmitted, setTrialSubmitted] = useState(false);

  // ── BMI calculation ──
  function calculateBMI() {
    const h = parseFloat(bmiHeight) / 100;
    const w = parseFloat(bmiWeight);
    const a = parseInt(bmiAge);
    if (!h || !w || h <= 0 || w <= 0 || !a || a <= 0) return;

    const bmi = w / (h * h);
    let type: string;
    let program: string;
    let color: string;

    if (bmi < 18.5) {
      type = isUk ? "Недостатня вага" : "Underweight";
      program = isUk ? "Набір маси + силові тренування" : "Mass gain + strength training";
      color = "text-blue-500";
    } else if (bmi < 25) {
      type = isUk ? "Нормальна вага" : "Normal weight";
      program = isUk ? "Підтримка форми + CrossFit" : "Maintenance + CrossFit";
      color = "text-green-500";
    } else if (bmi < 30) {
      type = isUk ? "Надмірна вага" : "Overweight";
      program = isUk ? "Кардіо + HIIT + контроль харчування" : "Cardio + HIIT + nutrition control";
      color = "text-yellow-500";
    } else {
      type = isUk ? "Ожиріння" : "Obesity";
      program = isUk ? "Персональний тренер + дієтолог + плавання" : "Personal trainer + dietitian + swimming";
      color = "text-red-500";
    }

    setBmiResult({ bmi, type, program, color });
  }

  // ── Trial submit ──
  function handleTrialSubmit() {
    if (trialName.trim() && trialPhone.trim()) {
      setTrialSubmitted(true);
    }
  }

  // ── Nav items ──
  const nav = isUk
    ? ["Заняття", "Тренери", "Абонементи", "Розклад", "Контакти"]
    : ["Classes", "Trainers", "Membership", "Schedule", "Contact"];

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans">
      {/* ═══════════════════ HEADER ═══════════════════ */}
      <header className="sticky top-0 z-50 bg-zinc-900/95 backdrop-blur border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-xl font-extrabold text-white tracking-tight">
            💪 <span className="text-orange-500">FitLife</span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {nav.map((item) => (
              <button key={item} className="text-sm text-zinc-300 hover:text-orange-400 transition-colors">
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden md:inline-flex px-5 py-2 bg-orange-600 hover:bg-orange-500 text-white text-sm font-bold rounded-lg transition-colors">
              {isUk ? "Спробувати безкоштовно" : "Try Free"}
            </button>
            {/* Mobile burger */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden text-white text-2xl"
              aria-label="Toggle menu"
            >
              {mobileMenu ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenu && (
          <div className="md:hidden bg-zinc-900 border-t border-zinc-800 px-4 pb-4">
            {nav.map((item) => (
              <button
                key={item}
                className="block w-full text-left py-2 text-zinc-300 hover:text-orange-400 text-sm"
              >
                {item}
              </button>
            ))}
            <button className="mt-2 w-full px-5 py-2 bg-orange-600 text-white text-sm font-bold rounded-lg">
              {isUk ? "Спробувати безкоштовно" : "Try Free"}
            </button>
          </div>
        )}
      </header>

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white overflow-hidden">
        {/* decorative elements */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32 text-center">
          <p className="text-orange-400 font-semibold tracking-widest uppercase text-sm mb-4">
            {isUk ? "Фітнес-клуб FitLife" : "FitLife Gym"}
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight mb-6">
            {isUk ? "ЗМІНЮЙ СЕБЕ" : "TRANSFORM YOURSELF"}
            <br />
            <span className="text-orange-500">
              {isUk ? "СЬОГОДНІ" : "TODAY"}
            </span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            {isUk
              ? "Сучасний фітнес-клуб з професійними тренерами, басейном, сауною та спільнотою, яка надихає. Середній результат — мінус 8 кг за 3 місяці."
              : "Modern fitness club with professional trainers, pool, sauna, and an inspiring community. Average result — minus 8 kg in 3 months."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl text-lg transition-colors">
              {isUk ? "Почати безкоштовно" : "Start Free Trial"}
            </button>
            <button className="px-8 py-4 border-2 border-zinc-600 hover:border-orange-500 text-white font-bold rounded-xl text-lg transition-colors">
              {isUk ? "Переглянути розклад" : "View Schedule"}
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { val: "2000+", en: "Active Members", uk: "Активних учасників" },
              { val: "-8 kg", en: "Avg. in 3 months", uk: "Середнє за 3 міс." },
              { val: "50+", en: "Weekly Classes", uk: "Занять на тиждень" },
              { val: "98%", en: "Client Satisfaction", uk: "Задоволених клієнтів" },
            ].map((s) => (
              <div key={s.val} className="text-center">
                <div className="text-2xl md:text-3xl font-black text-orange-500">{s.val}</div>
                <div className="text-xs text-zinc-500 mt-1">{isUk ? s.uk : s.en}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CLASS SCHEDULE ═══════════════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-3">
              {isUk ? "Розклад занять" : "Class Schedule"}
            </h2>
            <p className="text-zinc-500 max-w-xl mx-auto">
              {isUk
                ? "Оберіть день тижня та знайдіть ідеальне заняття. 🟢 легко · 🟡 середнє · 🔴 інтенсивне"
                : "Pick a day and find your perfect class. 🟢 easy · 🟡 medium · 🔴 intense"}
            </p>
          </div>

          {/* Day tabs */}
          <div className="flex gap-2 justify-center flex-wrap mb-8">
            {DAYS.map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveDay(d.id)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                  activeDay === d.id
                    ? "bg-orange-600 text-white"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                }`}
              >
                {isUk ? d.ukL : d.enL}
              </button>
            ))}
          </div>

          {/* Schedule grid */}
          <div className="grid gap-3 max-w-4xl mx-auto">
            {(SCHEDULE[activeDay] || []).map((cls, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                  cls.spots === 0
                    ? "bg-zinc-50 border-zinc-200 opacity-60"
                    : "bg-white border-zinc-200 hover:border-orange-300 hover:shadow-sm"
                }`}
              >
                <div className="text-lg font-mono font-bold text-orange-600 shrink-0 w-14">
                  {cls.time}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-zinc-900 truncate">
                    {isUk ? cls.nameUk : cls.nameEn}
                  </div>
                  <div className="text-sm text-zinc-500">
                    {isUk ? cls.trainerUk : cls.trainerEn}
                  </div>
                </div>
                <div className="shrink-0 text-lg" title={isUk ? "Інтенсивність" : "Intensity"}>
                  {cls.intensity}
                </div>
                <div className="shrink-0 text-right">
                  {cls.spots === 0 ? (
                    <span className="text-xs font-bold text-red-500 bg-red-50 px-3 py-1 rounded-full">
                      {isUk ? "Немає місць" : "Full"}
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full">
                      {cls.spots} {isUk ? "місць" : "spots"}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ MEMBERSHIP PLANS ═══════════════════ */}
      <section className="py-16 md:py-24 bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              {isUk ? "Абонементи" : "Membership Plans"}
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              {isUk
                ? "Оберіть план, що підходить вашому ритму та цілям"
                : "Choose a plan that fits your pace and goals"}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-6 border transition-all ${
                  plan.popular
                    ? "bg-orange-600 border-orange-500 shadow-lg shadow-orange-600/20 scale-105"
                    : "bg-zinc-800/60 border-zinc-700 hover:border-zinc-600"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-orange-600 text-xs font-black px-4 py-1 rounded-full">
                    {isUk ? "🔥 Популярний" : "🔥 Popular"}
                  </div>
                )}
                <h3 className="text-lg font-bold mb-1">
                  {isUk ? plan.nameUk : plan.nameEn}
                </h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-black">₴{plan.price}</span>
                  <span className={`text-sm ${plan.popular ? "text-orange-200" : "text-zinc-500"}`}>
                    {isUk ? plan.perUk : plan.perEn}
                  </span>
                </div>
                <ul className="space-y-2 mb-6">
                  {(isUk ? plan.featuresUk : plan.featuresEn).map((f, i) => (
                    <li key={i} className={`text-sm flex items-start gap-2 ${plan.popular ? "text-white" : "text-zinc-300"}`}>
                      <span className="shrink-0 mt-0.5">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-xl text-sm font-bold transition-colors ${
                    plan.popular
                      ? "bg-white text-orange-600 hover:bg-orange-50"
                      : "bg-orange-600 hover:bg-orange-500 text-white"
                  }`}
                >
                  {isUk ? "Приєднатися" : "Join Now"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ TRAINERS ═══════════════════ */}
      <section className="py-16 md:py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-3">
              {isUk ? "Наші тренери" : "Our Trainers"}
            </h2>
            <p className="text-zinc-500 max-w-xl mx-auto">
              {isUk
                ? "Сертифіковані фахівці, які допоможуть досягти результату"
                : "Certified professionals to help you achieve your goals"}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {TRAINERS.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-zinc-200 hover:border-orange-300 hover:shadow-lg transition-all text-center"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-linear-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center text-4xl">
                  {t.emoji}
                </div>
                <h3 className="font-bold text-lg text-zinc-900 mb-1">
                  {isUk ? t.nameUk : t.nameEn}
                </h3>
                <p className="text-sm text-orange-600 font-medium mb-2">
                  {isUk ? t.specUk : t.specEn}
                </p>
                <p className="text-xs text-zinc-500 mb-4">
                  {isUk ? t.certsUk : t.certsEn}
                </p>
                <button className="w-full py-2.5 bg-zinc-900 hover:bg-orange-600 text-white text-sm font-bold rounded-xl transition-colors">
                  {isUk ? "Записатись персонально" : "Book Personal"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ BMI CALCULATOR ═══════════════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-3">
              {isUk ? "Калькулятор складу тіла" : "Body Composition Calculator"}
            </h2>
            <p className="text-zinc-500 max-w-xl mx-auto">
              {isUk
                ? "Дізнайтеся свій BMI, тип статури та рекомендовану програму тренувань"
                : "Find out your BMI, body type, and recommended training program"}
            </p>
          </div>

          <div className="max-w-lg mx-auto bg-zinc-50 rounded-2xl p-8 border border-zinc-200">
            {/* Gender toggle */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setBmiGender("male")}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-colors ${
                  bmiGender === "male"
                    ? "bg-orange-600 text-white"
                    : "bg-white text-zinc-600 border border-zinc-300"
                }`}
              >
                {isUk ? "🚹 Чоловік" : "🚹 Male"}
              </button>
              <button
                onClick={() => setBmiGender("female")}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-colors ${
                  bmiGender === "female"
                    ? "bg-orange-600 text-white"
                    : "bg-white text-zinc-600 border border-zinc-300"
                }`}
              >
                {isUk ? "🚺 Жінка" : "🚺 Female"}
              </button>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-zinc-600 mb-1">
                  {isUk ? "Зріст (см)" : "Height (cm)"}
                </label>
                <input
                  type="number"
                  value={bmiHeight}
                  onChange={(e) => setBmiHeight(e.target.value)}
                  placeholder="175"
                  className="w-full px-3 py-2.5 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:border-orange-500 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-600 mb-1">
                  {isUk ? "Вага (кг)" : "Weight (kg)"}
                </label>
                <input
                  type="number"
                  value={bmiWeight}
                  onChange={(e) => setBmiWeight(e.target.value)}
                  placeholder="75"
                  className="w-full px-3 py-2.5 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:border-orange-500 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-600 mb-1">
                  {isUk ? "Вік" : "Age"}
                </label>
                <input
                  type="number"
                  value={bmiAge}
                  onChange={(e) => setBmiAge(e.target.value)}
                  placeholder="30"
                  className="w-full px-3 py-2.5 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:border-orange-500 bg-white"
                />
              </div>
            </div>

            <button
              onClick={calculateBMI}
              className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-colors mb-4"
            >
              {isUk ? "Розрахувати" : "Calculate"}
            </button>

            {/* Result */}
            {bmiResult && (
              <div className="bg-white rounded-xl p-6 border border-zinc-200 text-center">
                <div className={`text-5xl font-black mb-2 ${bmiResult.color}`}>
                  {bmiResult.bmi.toFixed(1)}
                </div>
                <div className="text-sm font-bold text-zinc-600 mb-1">BMI</div>
                <div className={`text-lg font-bold mb-3 ${bmiResult.color}`}>
                  {bmiResult.type}
                </div>
                <div className="bg-zinc-50 rounded-lg p-3">
                  <div className="text-xs font-bold text-zinc-500 mb-1">
                    {isUk ? "Рекомендована програма" : "Recommended Program"}
                  </div>
                  <div className="text-sm font-semibold text-zinc-800">
                    {bmiResult.program}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FACILITIES ═══════════════════ */}
      <section className="py-16 md:py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-3">
              {isUk ? "Наші зони" : "Our Facilities"}
            </h2>
            <p className="text-zinc-500 max-w-xl mx-auto">
              {isUk
                ? "Все необхідне для ефективних тренувань та відновлення в одному місці"
                : "Everything you need for effective training and recovery in one place"}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {FACILITIES.map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-zinc-200 hover:border-orange-300 hover:shadow-md transition-all"
              >
                <div className="text-4xl mb-4">{f.emoji}</div>
                <h3 className="font-bold text-lg text-zinc-900 mb-2">
                  {isUk ? f.nameUk : f.nameEn}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  {isUk ? f.descUk : f.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ TRANSFORMATION STORIES ═══════════════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-3">
              {isUk ? "Історії трансформацій" : "Transformation Stories"}
            </h2>
            <p className="text-zinc-500 max-w-xl mx-auto">
              {isUk
                ? "Реальні результати наших учасників. Ваша історія може бути наступною."
                : "Real results from our members. Your story could be next."}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {STORIES.map((s, i) => (
              <div
                key={i}
                className="bg-linear-to-br from-zinc-900 to-zinc-800 rounded-2xl p-6 text-white"
              >
                <div className="text-4xl mb-4">{s.emoji}</div>
                <h3 className="font-bold text-lg text-orange-400 mb-1">
                  {isUk ? s.nameUk : s.nameEn}
                </h3>
                <div className="text-sm text-zinc-500 mb-3">
                  {isUk ? "Тренується" : "Training"}: {isUk ? s.monthsUk : s.monthsEn}
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {isUk ? s.resultUk : s.resultEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ TRIAL FORM ═══════════════════ */}
      <section className="py-16 md:py-24 bg-linear-to-br from-orange-600 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-lg mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              {isUk ? "Отримайте безкоштовне заняття" : "Get Your Free Trial"}
            </h2>
            <p className="text-orange-100 mb-8">
              {isUk
                ? "Залиште контакти і ми запросимо вас на пробне тренування"
                : "Leave your details and we will invite you for a trial session"}
            </p>

            {trialSubmitted ? (
              <div className="bg-white/20 backdrop-blur rounded-2xl p-8">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-xl font-bold mb-2">
                  {isUk ? "Дякуємо!" : "Thank you!"}
                </h3>
                <p className="text-orange-100">
                  {isUk
                    ? "Наш менеджер зв'яжеться з вами протягом 30 хвилин"
                    : "Our manager will contact you within 30 minutes"}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <input
                  type="text"
                  value={trialName}
                  onChange={(e) => setTrialName(e.target.value)}
                  placeholder={isUk ? "Ваше ім'я" : "Your name"}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur placeholder-orange-200 text-white border border-white/30 focus:outline-none focus:border-white text-sm"
                />
                <input
                  type="tel"
                  value={trialPhone}
                  onChange={(e) => setTrialPhone(e.target.value)}
                  placeholder={isUk ? "Телефон" : "Phone number"}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur placeholder-orange-200 text-white border border-white/30 focus:outline-none focus:border-white text-sm"
                />
                <select
                  value={trialClass}
                  onChange={(e) => setTrialClass(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur text-white border border-white/30 focus:outline-none focus:border-white text-sm"
                >
                  <option value="" className="text-zinc-900">
                    {isUk ? "Оберіть заняття" : "Preferred class"}
                  </option>
                  <option value="yoga" className="text-zinc-900">
                    {isUk ? "Йога" : "Yoga"}
                  </option>
                  <option value="crossfit" className="text-zinc-900">
                    CrossFit
                  </option>
                  <option value="boxing" className="text-zinc-900">
                    {isUk ? "Бокс" : "Boxing"}
                  </option>
                  <option value="spinning" className="text-zinc-900">
                    Spinning
                  </option>
                  <option value="pilates" className="text-zinc-900">
                    {isUk ? "Пілатес" : "Pilates"}
                  </option>
                  <option value="hiit" className="text-zinc-900">
                    HIIT
                  </option>
                  <option value="swimming" className="text-zinc-900">
                    {isUk ? "Плавання" : "Swimming"}
                  </option>
                </select>
                <button
                  onClick={handleTrialSubmit}
                  className="w-full py-3.5 bg-white text-orange-600 font-bold rounded-xl hover:bg-orange-50 transition-colors text-sm"
                >
                  {isUk ? "Отримати безкоштовне заняття" : "Get Free Trial"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="bg-zinc-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="text-xl font-extrabold mb-3">
                💪 <span className="text-orange-500">FitLife</span>
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {isUk
                  ? "Сучасний фітнес-клуб у серці Києва. Тренуйся з найкращими."
                  : "Modern fitness club in the heart of Kyiv. Train with the best."}
              </p>
            </div>

            {/* Address */}
            <div>
              <h4 className="font-bold text-sm mb-3 text-zinc-300">
                {isUk ? "Адреса" : "Address"}
              </h4>
              <p className="text-sm text-zinc-500">
                {isUk
                  ? "вул. Спортивна, 12\nКиїв, 01023"
                  : "12 Sportyvna St.\nKyiv, 01023"}
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-sm mb-3 text-zinc-300">
                {isUk ? "Контакти" : "Contact"}
              </h4>
              <p className="text-sm text-zinc-500">
                +380 (44) 123-45-67
                <br />
                info@fitlife.ua
              </p>
            </div>

            {/* Hours */}
            <div>
              <h4 className="font-bold text-sm mb-3 text-zinc-300">
                {isUk ? "Графік роботи" : "Working Hours"}
              </h4>
              <p className="text-sm text-zinc-500">
                {isUk ? "Пн-Нд: 6:00 — 23:00" : "Mon-Sun: 6:00 — 23:00"}
                <br />
                {isUk ? "Без вихідних" : "Open every day"}
              </p>
            </div>
          </div>

          {/* Social + bottom */}
          <div className="border-t border-zinc-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex gap-4">
              {["📸 Instagram", "📘 Facebook", "▶️ YouTube", "💬 Telegram"].map((s) => (
                <button key={s} className="text-xs text-zinc-500 hover:text-orange-400 transition-colors">
                  {s}
                </button>
              ))}
            </div>
            <p className="text-xs text-zinc-600">
              © 2026 FitLife Gym. {isUk ? "Усі права захищено." : "All rights reserved."}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
