"use client";

import { useState } from "react";

const PROGRAMS = [
  {
    emoji: "🖍️",
    nameUk: "Маленькі Художники",
    nameEn: "Little Artists",
    ageUk: "3–6 років",
    ageEn: "Ages 3–6",
    price: "₴800/міс",
    priceEn: "₴800/mo",
    color: "from-orange-200 to-rose-200",
    border: "border-orange-300",
    badge: "bg-orange-400",
    topicsUk: ["Акварель та гуаш", "Пластилін та глина", "Аплікація", "Пальчикові фарби"],
    topicsEn: ["Watercolor & gouache", "Plasticine & clay", "Collage", "Finger painting"],
    schedUk: "2 рази на тиждень · 45 хв",
    schedEn: "Twice a week · 45 min",
  },
  {
    emoji: "🎨",
    nameUk: "Юні Майстри",
    nameEn: "Young Masters",
    ageUk: "7–11 років",
    ageEn: "Ages 7–11",
    price: "₴950/міс",
    priceEn: "₴950/mo",
    color: "from-sky-200 to-blue-200",
    border: "border-sky-300",
    badge: "bg-sky-500",
    topicsUk: ["Олівець і туш", "Акрил та полотно", "Ліпка з глини", "Графіка та принти"],
    topicsEn: ["Pencil & ink", "Acrylic on canvas", "Clay sculpting", "Graphics & prints"],
    schedUk: "2 рази на тиждень · 60 хв",
    schedEn: "Twice a week · 60 min",
  },
  {
    emoji: "🖌️",
    nameUk: "Підліткова Студія",
    nameEn: "Teen Studio",
    ageUk: "12–14 років",
    ageEn: "Ages 12–14",
    price: "₴1100/міс",
    priceEn: "₴1100/mo",
    color: "from-violet-200 to-purple-200",
    border: "border-violet-300",
    badge: "bg-violet-500",
    topicsUk: ["Портрет та фігура", "Змішана техніка", "Ілюстрація", "Мистецтво скетчу"],
    topicsEn: ["Portrait & figure", "Mixed media", "Illustration", "Sketch art"],
    schedUk: "2 рази на тиждень · 90 хв",
    schedEn: "Twice a week · 90 min",
  },
  {
    emoji: "🌈",
    nameUk: "Змішана Майстерня",
    nameEn: "Mixed Workshop",
    ageUk: "Всі вікові групи",
    ageEn: "All ages",
    price: "₴400/заняття",
    priceEn: "₴400/session",
    color: "from-yellow-200 to-amber-200",
    border: "border-yellow-300",
    badge: "bg-yellow-500",
    topicsUk: ["Тематичні проєкти", "Сезонний декор", "Колаж та арт-журнал", "Батько + дитина"],
    topicsEn: ["Themed projects", "Seasonal décor", "Collage & art journal", "Parent + child"],
    schedUk: "Субота · 10:00 та 12:00",
    schedEn: "Saturday · 10:00 & 12:00",
  },
];

type Spot = "available" | "few" | "full";
interface TimeSlot {
  time: string;
  classUk: string;
  classEn: string;
  ageUk: string;
  ageEn: string;
  spots: number;
  total: number;
  status: Spot;
}

const SCHEDULE: Record<string, TimeSlot[]> = {
  Mon: [
    { time: "10:00", classUk: "Маленькі Художники", classEn: "Little Artists", ageUk: "3–6 р.", ageEn: "3–6 yrs", spots: 5, total: 8, status: "available" },
    { time: "16:00", classUk: "Юні Майстри", classEn: "Young Masters", ageUk: "7–11 р.", ageEn: "7–11 yrs", spots: 2, total: 8, status: "few" },
    { time: "18:30", classUk: "Підліткова Студія", classEn: "Teen Studio", ageUk: "12–14 р.", ageEn: "12–14 yrs", spots: 0, total: 8, status: "full" },
  ],
  Tue: [
    { time: "10:00", classUk: "Маленькі Художники", classEn: "Little Artists", ageUk: "3–6 р.", ageEn: "3–6 yrs", spots: 4, total: 8, status: "available" },
    { time: "15:30", classUk: "Юні Майстри", classEn: "Young Masters", ageUk: "7–11 р.", ageEn: "7–11 yrs", spots: 6, total: 8, status: "available" },
    { time: "17:30", classUk: "Арт-терапія", classEn: "Art Therapy", ageUk: "5–12 р.", ageEn: "5–12 yrs", spots: 3, total: 6, status: "few" },
  ],
  Wed: [
    { time: "10:00", classUk: "Маленькі Художники", classEn: "Little Artists", ageUk: "3–6 р.", ageEn: "3–6 yrs", spots: 7, total: 8, status: "available" },
    { time: "16:00", classUk: "Підліткова Студія", classEn: "Teen Studio", ageUk: "12–14 р.", ageEn: "12–14 yrs", spots: 1, total: 8, status: "few" },
    { time: "18:30", classUk: "Юні Майстри", classEn: "Young Masters", ageUk: "7–11 р.", ageEn: "7–11 yrs", spots: 0, total: 8, status: "full" },
  ],
  Thu: [
    { time: "10:00", classUk: "Юні Майстри", classEn: "Young Masters", ageUk: "7–11 р.", ageEn: "7–11 yrs", spots: 5, total: 8, status: "available" },
    { time: "16:00", classUk: "Маленькі Художники", classEn: "Little Artists", ageUk: "3–6 р.", ageEn: "3–6 yrs", spots: 3, total: 8, status: "few" },
    { time: "18:00", classUk: "Вечір батьки+діти", classEn: "Parent & Child Eve", ageUk: "Всі", ageEn: "All", spots: 4, total: 6, status: "available" },
  ],
  Fri: [
    { time: "10:00", classUk: "Маленькі Художники", classEn: "Little Artists", ageUk: "3–6 р.", ageEn: "3–6 yrs", spots: 6, total: 8, status: "available" },
    { time: "16:00", classUk: "Підліткова Студія", classEn: "Teen Studio", ageUk: "12–14 р.", ageEn: "12–14 yrs", spots: 4, total: 8, status: "available" },
    { time: "19:00", classUk: "Вечір дорослих", classEn: "Adults Evening", ageUk: "18+", ageEn: "18+", spots: 2, total: 8, status: "few" },
  ],
  Sat: [
    { time: "10:00", classUk: "Змішана Майстерня", classEn: "Mixed Workshop", ageUk: "Всі", ageEn: "All", spots: 3, total: 10, status: "few" },
    { time: "12:00", classUk: "Змішана Майстерня", classEn: "Mixed Workshop", ageUk: "Всі", ageEn: "All", spots: 7, total: 10, status: "available" },
    { time: "14:30", classUk: "Арт-терапія (інтенсив)", classEn: "Art Therapy (intensive)", ageUk: "6–14 р.", ageEn: "6–14 yrs", spots: 0, total: 6, status: "full" },
  ],
};

const GALLERY = [
  { emoji: "🌻", nameUk: "Соня", nameEn: "Sonya", age: 7, medUk: "Акварель", medEn: "Watercolor", bg: "bg-yellow-100" },
  { emoji: "🦋", nameUk: "Марк", nameEn: "Mark", age: 9, medUk: "Гуаш", medEn: "Gouache", bg: "bg-sky-100" },
  { emoji: "🐉", nameUk: "Іван", nameEn: "Ivan", age: 12, medUk: "Акрил", medEn: "Acrylic", bg: "bg-violet-100" },
  { emoji: "🌊", nameUk: "Аліна", nameEn: "Alina", age: 8, medUk: "Змішана техніка", medEn: "Mixed media", bg: "bg-blue-100" },
  { emoji: "🦁", nameUk: "Льоша", nameEn: "Lyosha", age: 6, medUk: "Пластилін", medEn: "Plasticine", bg: "bg-orange-100" },
  { emoji: "🌸", nameUk: "Даша", nameEn: "Dasha", age: 10, medUk: "Олівець", medEn: "Pencil", bg: "bg-pink-100" },
  { emoji: "🏔️", nameUk: "Дмитро", nameEn: "Dmytro", age: 13, medUk: "Туш та перо", medEn: "Ink & nib", bg: "bg-emerald-100" },
  { emoji: "🎠", nameUk: "Поліна", nameEn: "Polina", age: 5, medUk: "Аплікація", medEn: "Collage", bg: "bg-rose-100" },
  { emoji: "🦊", nameUk: "Тема", nameEn: "Tema", age: 11, medUk: "Графіка", medEn: "Graphics", bg: "bg-amber-100" },
];

const WORKSHOPS = [
  {
    emoji: "🦕",
    titleUk: "Світ Динозаврів",
    titleEn: "Dinosaur World",
    dateUk: "12 квітня · субота",
    dateEn: "April 12 · Saturday",
    duration: "2 год",
    durationEn: "2 hrs",
    price: "₴450",
    descUk: "Ліпимо та малюємо улюблених динозаврів у техніці об'ємного живопису",
    descEn: "Sculpt & paint favourite dinosaurs in 3D relief technique",
    color: "from-green-100 to-emerald-100",
    border: "border-green-300",
  },
  {
    emoji: "🧚",
    titleUk: "Чарівний Сад",
    titleEn: "Fairy Garden",
    dateUk: "19 квітня · субота",
    dateEn: "April 19 · Saturday",
    duration: "2 год",
    durationEn: "2 hrs",
    price: "₴450",
    descUk: "Створюємо казковий сад з квіток та метеликів — акварель та аплікація",
    descEn: "Create a fairy garden with flowers & butterflies — watercolor & collage",
    color: "from-pink-100 to-rose-100",
    border: "border-pink-300",
  },
  {
    emoji: "🚀",
    titleUk: "Космічні Пригоди",
    titleEn: "Space Adventures",
    dateUk: "26 квітня · субота",
    dateEn: "April 26 · Saturday",
    duration: "2.5 год",
    durationEn: "2.5 hrs",
    price: "₴500",
    descUk: "Малюємо галактики, ракети та планети — техніка «мокре по мокрому»",
    descEn: "Paint galaxies, rockets & planets — wet-on-wet technique",
    color: "from-indigo-100 to-violet-100",
    border: "border-indigo-300",
  },
  {
    emoji: "🍂",
    titleUk: "Осінні Барви",
    titleEn: "Autumn Colors",
    dateUk: "3 травня · субота",
    dateEn: "May 3 · Saturday",
    duration: "2 год",
    durationEn: "2 hrs",
    price: "₴450",
    descUk: "Осінній колаж із природніх матеріалів + акварельний фон",
    descEn: "Autumn collage from natural materials + watercolor background",
    color: "from-amber-100 to-orange-100",
    border: "border-amber-300",
  },
];

const THERAPY_BENEFITS = [
  { emoji: "🧘", titleUk: "Знімає тривожність", titleEn: "Reduces anxiety", descUk: "Творчий процес знижує рівень стресу та допомагає дитині розслабитися у безпечному середовищі", descEn: "The creative process lowers stress and helps children relax in a safe environment" },
  { emoji: "🗣️", titleUk: "Розвиває самовираження", titleEn: "Builds self-expression", descUk: "Мистецтво дає голос тим, кому важко висловити почуття словами", descEn: "Art gives voice to children who find it hard to express feelings verbally" },
  { emoji: "🎯", titleUk: "Покращує концентрацію", titleEn: "Improves focus", descUk: "Регулярні заняття розвивають увагу, терпіння та здатність завершувати завдання", descEn: "Regular sessions build attention span, patience, and task completion" },
  { emoji: "🌟", titleUk: "Підвищує самооцінку", titleEn: "Boosts self-esteem", descUk: "Кожен завершений витвір — це маленька перемога, яка зміцнює впевненість у собі", descEn: "Every finished artwork is a small victory that strengthens self-confidence" },
];

const TEACHERS = [
  { emoji: "👩‍🎨", nameUk: "Олена Мельник", nameEn: "Olena Melnyk", specialtyUk: "Акварель та дитяча арт-терапія", specialtyEn: "Watercolor & child art therapy", eduUk: "ХДАДМ · 12 років досвіду", eduEn: "Kharkiv ASAD · 12 yrs exp" },
  { emoji: "🧑‍🎨", nameUk: "Богдан Коваль", nameEn: "Bohdan Koval", specialtyUk: "Скульптура та ліпка", specialtyEn: "Sculpture & clay modelling", eduUk: "НАОМА · 8 років досвіду", eduEn: "NAOMA Kyiv · 8 yrs exp" },
  { emoji: "👩‍🏫", nameUk: "Катерина Шевченко", nameEn: "Kateryna Shevchenko", specialtyUk: "Ілюстрація та графіка", specialtyEn: "Illustration & graphics", eduUk: "ОНАМіД · 6 років досвіду", eduEn: "Odesa NAMD · 6 yrs exp" },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
type Day = typeof DAYS[number];

const DAY_LABELS: Record<Day, { uk: string; en: string }> = {
  Mon: { uk: "Пн", en: "Mon" },
  Tue: { uk: "Вт", en: "Tue" },
  Wed: { uk: "Ср", en: "Wed" },
  Thu: { uk: "Чт", en: "Thu" },
  Fri: { uk: "Пт", en: "Fri" },
  Sat: { uk: "Сб", en: "Sat" },
};

const SPOT_STYLE: Record<Spot, string> = {
  available: "bg-green-100 text-green-700 border-green-300",
  few: "bg-yellow-100 text-yellow-700 border-yellow-300",
  full: "bg-red-100 text-red-600 border-red-300",
};

export function ArtPlayDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [activeDay, setActiveDay] = useState<Day>("Mon");
  const [form, setForm] = useState({
    childName: "",
    age: "",
    program: "",
    schedule: "",
    parentName: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white min-h-screen font-sans text-gray-800">
      {/* ── HEADER ─────────────────────────────────────────────── */}
      <header className="bg-white border-b border-orange-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🎨</span>
            <div>
              <span className="text-xl font-extrabold text-orange-500">ArtPlay</span>
              <span className="text-xl font-extrabold text-sky-500"> Studio</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-gray-600">
            {(isUk
              ? ["Програми", "Майстер-класи", "Галерея", "Арт-терапія", "Дорослим", "Контакти"]
              : ["Classes", "Workshops", "Gallery", "Art Therapy", "Adults", "Contact"]
            ).map((item) => (
              <a key={item} href="#" className="hover:text-orange-500 transition-colors">{item}</a>
            ))}
          </nav>
          <button className="bg-linear-to-br from-orange-400 to-rose-400 text-white text-sm font-bold px-5 py-2 rounded-full shadow hover:shadow-md transition-shadow shrink-0">
            {isUk ? "🎁 Перший урок безкоштовно" : "🎁 Book Free Lesson"}
          </button>
        </div>
      </header>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-amber-50 py-20 px-4">
        {/* Watercolor blobs */}
        <div className="absolute top-[-60px] left-[-80px] w-80 h-80 rounded-full bg-orange-200 opacity-40 blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-[-60px] w-72 h-72 rounded-full bg-sky-200 opacity-40 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-40px] left-[30%] w-64 h-64 rounded-full bg-yellow-200 opacity-50 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-[10%] w-56 h-56 rounded-full bg-rose-200 opacity-35 blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 border border-orange-200 rounded-full px-4 py-1.5 text-sm font-medium text-orange-600 mb-6 shadow-sm">
            🌟 {isUk ? "Студія творчості для дітей 3–14 років" : "Creative studio for children aged 3–14"}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight mb-4">
            {isUk ? (
              <>Місце де <span className="text-orange-500">Мистецтво</span> — це <span className="text-sky-500">Гра</span></>
            ) : (
              <>Where <span className="text-orange-500">Art</span> is <span className="text-sky-500">Play</span></>
            )}
          </h1>
          <p className="text-xl text-gray-500 mb-8">
            {isUk
              ? "✏️ Малювання · 🏺 Глина · ✂️ Колаж · Для дітей 3–14 років"
              : "✏️ Drawing · 🏺 Clay · ✂️ Collage · For ages 3–14"}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button className="bg-linear-to-br from-orange-400 to-rose-400 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow text-lg">
              {isUk ? "🎨 Записатись на пробне" : "🎨 Try a Free Lesson"}
            </button>
            <button className="bg-white border-2 border-sky-300 text-sky-600 font-bold px-8 py-3 rounded-full hover:bg-sky-50 transition-colors text-lg">
              {isUk ? "📅 Переглянути програми" : "📅 View Programs"}
            </button>
          </div>
          <div className="inline-flex items-center gap-2 bg-orange-500 text-white rounded-full px-6 py-2 text-sm font-semibold shadow">
            🎁 {isUk ? "Перший урок БЕЗКОШТОВНО · Групи до 8 дітей" : "First lesson FREE · Groups up to 8 children"}
          </div>
        </div>
      </section>

      {/* ── CLASS PROGRAMS ─────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
            {isUk ? "🖌️ Програми занять" : "🖌️ Class Programs"}
          </h2>
          <p className="text-center text-gray-500 mb-10">
            {isUk ? "Підберіть ідеальну програму для вашої дитини" : "Find the perfect program for your child"}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {PROGRAMS.map((p) => (
              <div
                key={p.nameEn}
                className={`rounded-2xl border-2 ${p.border} bg-linear-to-br ${p.color} p-5 flex flex-col gap-3 hover:shadow-lg transition-shadow`}
              >
                <div className="text-4xl text-center">{p.emoji}</div>
                <div className="text-center">
                  <div className="font-extrabold text-gray-800 text-lg">{isUk ? p.nameUk : p.nameEn}</div>
                  <div className="text-sm text-gray-500">{isUk ? p.ageUk : p.ageEn}</div>
                </div>
                <div className={`${p.badge} text-white text-xl font-extrabold text-center rounded-xl py-2`}>
                  {isUk ? p.price : p.priceEn}
                </div>
                <ul className="space-y-1">
                  {(isUk ? p.topicsUk : p.topicsEn).map((t) => (
                    <li key={t} className="text-sm text-gray-700 flex items-start gap-1.5">
                      <span className="text-orange-400 mt-0.5">✦</span>{t}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto text-xs text-gray-500 text-center border-t border-white/60 pt-2">
                  🕐 {isUk ? p.schedUk : p.schedEn}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WEEKLY SCHEDULE ────────────────────────────────────── */}
      <section className="py-16 px-4 bg-sky-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
            {isUk ? "📅 Розклад занять" : "📅 Weekly Schedule"}
          </h2>
          <p className="text-center text-gray-500 mb-8">
            {isUk ? "Оберіть зручний день та час" : "Choose a convenient day and time"}
          </p>
          {/* Day tabs */}
          <div className="flex justify-center gap-2 mb-6 flex-wrap">
            {DAYS.map((d) => (
              <button
                key={d}
                onClick={() => setActiveDay(d)}
                className={`px-5 py-2 rounded-full font-bold text-sm transition-all ${
                  activeDay === d
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-white border border-orange-200 text-gray-600 hover:border-orange-400"
                }`}
              >
                {isUk ? DAY_LABELS[d].uk : DAY_LABELS[d].en}
              </button>
            ))}
          </div>
          {/* Slots */}
          <div className="space-y-3">
            {SCHEDULE[activeDay].map((slot) => (
              <div
                key={slot.time + slot.classEn}
                className="bg-white rounded-xl border border-sky-100 shadow-sm p-4 flex flex-wrap items-center gap-3"
              >
                <div className="text-2xl font-extrabold text-sky-500 w-14 shrink-0">{slot.time}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-gray-800">{isUk ? slot.classUk : slot.classEn}</div>
                  <div className="text-sm text-gray-500">{isUk ? slot.ageUk : slot.ageEn}</div>
                </div>
                <div className={`text-xs font-semibold px-3 py-1 rounded-full border ${SPOT_STYLE[slot.status]} shrink-0`}>
                  {slot.status === "available" && (isUk ? `✅ ${slot.spots} місць` : `✅ ${slot.spots} spots`)}
                  {slot.status === "few" && (isUk ? `⚡ ${slot.spots} залишилось` : `⚡ ${slot.spots} left`)}
                  {slot.status === "full" && (isUk ? "❌ Немає місць" : "❌ Full")}
                </div>
                <button
                  disabled={slot.status === "full"}
                  className={`text-sm font-bold px-4 py-2 rounded-full shrink-0 ${
                    slot.status === "full"
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-linear-to-br from-orange-400 to-rose-400 text-white hover:shadow-md transition-shadow"
                  }`}
                >
                  {isUk ? "Записатись" : "Book"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KIDS GALLERY ───────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
            {isUk ? "🖼️ Галерея робіт" : "🖼️ Kids Gallery"}
          </h2>
          <p className="text-center text-gray-500 mb-10">
            {isUk ? "Справжнє мистецтво, створене нашими учнями" : "Real art created by our students"}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 gap-4">
            {GALLERY.map((item, i) => (
              <div key={i} className={`${item.bg} rounded-2xl p-4 flex flex-col items-center gap-2 border border-white shadow-sm hover:shadow-md transition-shadow`}>
                <div className="text-6xl py-4">{item.emoji}</div>
                <div className="text-sm font-bold text-gray-700">{isUk ? item.nameUk : item.nameEn}, {item.age} {isUk ? "р." : "yrs"}</div>
                <div className="text-xs text-gray-500">{isUk ? item.medUk : item.medEn}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-xl px-5 py-3 text-sm text-orange-700">
              🖼️ {isUk
                ? "Батьки: замовте картину вашої дитини у красивій рамці · Уточнюйте деталі у студії"
                : "Parents: order your child's artwork in a beautiful frame · Ask at the studio"}
            </div>
          </div>
        </div>
      </section>

      {/* ── WORKSHOPS ──────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-yellow-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
            {isUk ? "🎉 Тематичні майстер-класи" : "🎉 Themed Workshops"}
          </h2>
          <p className="text-center text-gray-500 mb-10">
            {isUk ? "Особливі заняття для особливих спогадів" : "Special sessions for special memories"}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WORKSHOPS.map((w) => (
              <div key={w.titleEn} className={`rounded-2xl border-2 ${w.border} bg-linear-to-br ${w.color} p-6 flex gap-4`}>
                <div className="text-4xl shrink-0">{w.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-extrabold text-gray-800 text-lg mb-0.5">{isUk ? w.titleUk : w.titleEn}</div>
                  <div className="text-sm text-gray-500 mb-1">📅 {isUk ? w.dateUk : w.dateEn} · ⏱ {isUk ? w.duration : w.durationEn}</div>
                  <p className="text-sm text-gray-600 mb-3">{isUk ? w.descUk : w.descEn}</p>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-xl font-extrabold text-orange-500">{w.price}</span>
                    <button className="bg-linear-to-br from-orange-400 to-rose-400 text-white text-sm font-bold px-5 py-2 rounded-full shadow hover:shadow-md transition-shadow">
                      {isUk ? "Зайняти місце" : "Book Spot"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ART THERAPY ────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-violet-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
            {isUk ? "🧠 Арт-терапія для дітей" : "🧠 Art Therapy for Children"}
          </h2>
          <p className="text-center text-gray-500 mb-4 max-w-2xl mx-auto">
            {isUk
              ? "Арт-терапія відрізняється від звичайних занять: тут головне не результат, а процес. Сертифікований фахівець використовує мистецтво як інструмент підтримки емоційного здоров'я дитини."
              : "Art therapy differs from regular classes: here the process matters more than the result. A certified specialist uses art as a tool to support a child's emotional wellbeing."}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            {THERAPY_BENEFITS.map((b) => (
              <div key={b.titleEn} className="bg-white rounded-2xl border border-violet-100 p-5 shadow-sm hover:shadow-md transition-shadow flex gap-4">
                <div className="text-3xl shrink-0">{b.emoji}</div>
                <div>
                  <div className="font-bold text-gray-800 mb-1">{isUk ? b.titleUk : b.titleEn}</div>
                  <p className="text-sm text-gray-600">{isUk ? b.descUk : b.descEn}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-white rounded-2xl border border-violet-200 p-5 text-sm text-gray-600 text-center">
            {isUk
              ? "💜 Заняття проводить Олена Мельник — сертифікований арт-терапевт (УAAT). Перша консультація безкоштовна."
              : "💜 Sessions led by Olena Melnyk — certified art therapist (UAAT). First consultation is free."}
          </div>
        </div>
      </section>

      {/* ── ADULTS EVENINGS ────────────────────────────────────── */}
      <section className="py-16 px-4 bg-rose-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
            {isUk ? "👨‍👧 Вечори для дорослих та дітей" : "👨‍👧 Parent & Child Evenings"}
          </h2>
          <p className="text-center text-gray-500 mb-8">
            {isUk ? "Творіть разом — п'ятниця 19:00" : "Create together — Fridays at 19:00"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { emoji: "🏺", titleUk: "Кераміка", titleEn: "Pottery", descUk: "Ліпимо з глини та прикрашаємо вироби разом", descEn: "Sculpt & decorate clay pieces together" },
              { emoji: "🎨", titleUk: "Акварель", titleEn: "Watercolor", descUk: "Пишемо натюрморт або пейзаж у парах", descEn: "Paint a still life or landscape in pairs" },
              { emoji: "✂️", titleUk: "Колаж", titleEn: "Collage", descUk: "Створюємо арт-колаж із журналів та тканини", descEn: "Build an art collage from magazines & fabric" },
            ].map((item) => (
              <div key={item.titleEn} className="bg-white rounded-2xl border border-rose-200 p-5 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-3">{item.emoji}</div>
                <div className="font-bold text-gray-800 mb-1">{isUk ? item.titleUk : item.titleEn}</div>
                <p className="text-sm text-gray-600">{isUk ? item.descUk : item.descEn}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-center">
            <div className="bg-rose-400 text-white rounded-xl px-6 py-3 font-bold">
              {isUk ? "₴700 за пару" : "₴700 per pair"}
            </div>
            <div className="bg-white border border-rose-200 text-rose-600 rounded-xl px-6 py-3 font-semibold text-sm">
              {isUk ? "📅 Щоп'ятниці · 19:00–21:00 · Записуйтесь заздалегідь" : "📅 Every Friday · 19:00–21:00 · Book in advance"}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ──────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
            {isUk ? "💛 Про нашу студію" : "💛 About Our Studio"}
          </h2>
          <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
            {isUk
              ? "ArtPlay Studio заснована у 2016 році в Одесі. Ми переконані: кожна дитина — художник. Наша місія — не навчити «правильно малювати», а розкрити творчий потенціал через радість та гру."
              : "ArtPlay Studio was founded in 2016 in Odesa. We believe every child is an artist. Our mission is not to teach 'correct' drawing, but to unlock creative potential through joy and play."}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TEACHERS.map((t) => (
              <div key={t.nameEn} className="bg-orange-50 border border-orange-100 rounded-2xl p-5 text-center hover:shadow-md transition-shadow">
                <div className="text-5xl mb-3">{t.emoji}</div>
                <div className="font-extrabold text-gray-800 mb-0.5">{isUk ? t.nameUk : t.nameEn}</div>
                <div className="text-sm font-semibold text-orange-500 mb-1">{isUk ? t.specialtyUk : t.specialtyEn}</div>
                <div className="text-xs text-gray-500">{isUk ? t.eduUk : t.eduEn}</div>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-linear-to-br from-orange-50 to-sky-50 rounded-2xl border border-orange-100 p-6 text-center">
            <div className="text-2xl mb-2">🌈</div>
            <p className="text-gray-700 font-medium">
              {isUk
                ? "«Ми не виправляємо роботи дітей і не порівнюємо їх між собою. Кожен витвір унікальний, як і кожна дитина.»"
                : "\"We never correct children's works or compare them. Every creation is unique, just like every child.\""}
            </p>
          </div>
        </div>
      </section>

      {/* ── BOOKING FORM ───────────────────────────────────────── */}
      <section className="py-16 px-4 bg-sky-50">
        <div className="max-w-lg mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
            {isUk ? "📝 Записатись на пробний урок" : "📝 Book a Free Lesson"}
          </h2>
          <p className="text-center text-gray-500 mb-8">
            {isUk ? "Перший урок — безкоштовно. Без зобов'язань." : "First lesson is free. No commitment."}
          </p>
          {submitted ? (
            <div className="bg-white rounded-2xl border border-green-200 p-8 text-center shadow-sm">
              <div className="text-6xl mb-4">🎨</div>
              <div className="text-xl font-extrabold text-green-600 mb-2">
                {isUk ? "Ура! Заявку отримано!" : "Hooray! Request received!"}
              </div>
              <p className="text-gray-600 text-sm">
                {isUk
                  ? "Ми зателефонуємо вам протягом кількох годин, щоб підтвердити час першого уроку 🌟"
                  : "We'll call you within a few hours to confirm the first lesson time 🌟"}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-5 text-sm text-orange-500 hover:underline"
              >
                {isUk ? "Подати ще одну заявку" : "Submit another request"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {isUk ? "Ім'я дитини" : "Child's name"} *
                </label>
                <input
                  type="text"
                  required
                  value={form.childName}
                  onChange={(e) => setForm({ ...form, childName: e.target.value })}
                  placeholder={isUk ? "Наприклад: Соня" : "E.g. Anna"}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {isUk ? "Вік дитини" : "Child's age"} *
                </label>
                <select
                  required
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                >
                  <option value="">{isUk ? "Оберіть вік" : "Select age"}</option>
                  <option value="3-6">{isUk ? "3–6 років" : "3–6 years"}</option>
                  <option value="7-11">{isUk ? "7–11 років" : "7–11 years"}</option>
                  <option value="12-14">{isUk ? "12–14 років" : "12–14 years"}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {isUk ? "Програма" : "Program interest"}
                </label>
                <select
                  value={form.program}
                  onChange={(e) => setForm({ ...form, program: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                >
                  <option value="">{isUk ? "Оберіть програму" : "Select program"}</option>
                  <option value="little">{isUk ? "Маленькі Художники (3–6)" : "Little Artists (3–6)"}</option>
                  <option value="young">{isUk ? "Юні Майстри (7–11)" : "Young Masters (7–11)"}</option>
                  <option value="teen">{isUk ? "Підліткова Студія (12–14)" : "Teen Studio (12–14)"}</option>
                  <option value="therapy">{isUk ? "Арт-терапія" : "Art Therapy"}</option>
                  <option value="workshop">{isUk ? "Майстер-клас" : "Workshop"}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {isUk ? "Зручний час" : "Preferred schedule"}
                </label>
                <select
                  value={form.schedule}
                  onChange={(e) => setForm({ ...form, schedule: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                >
                  <option value="">{isUk ? "Оберіть час" : "Select time"}</option>
                  <option value="morning">{isUk ? "Ранок (10:00–12:00)" : "Morning (10:00–12:00)"}</option>
                  <option value="afternoon">{isUk ? "День (15:30–17:30)" : "Afternoon (15:30–17:30)"}</option>
                  <option value="evening">{isUk ? "Вечір (18:00–20:00)" : "Evening (18:00–20:00)"}</option>
                  <option value="saturday">{isUk ? "Субота" : "Saturday"}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {isUk ? "Ваше ім'я (батько/мати)" : "Parent's name"} *
                </label>
                <input
                  type="text"
                  required
                  value={form.parentName}
                  onChange={(e) => setForm({ ...form, parentName: e.target.value })}
                  placeholder={isUk ? "Ваше ім'я" : "Your name"}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {isUk ? "Номер телефону" : "Phone number"} *
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+380 XX XXX XX XX"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-linear-to-br from-orange-400 to-rose-400 text-white font-extrabold py-3 rounded-xl shadow-md hover:shadow-lg transition-shadow text-base"
              >
                {isUk ? "🎨 Записатись безкоштовно" : "🎨 Book Free Lesson"}
              </button>
              <p className="text-xs text-center text-gray-400">
                {isUk
                  ? "Надсилаючи форму, ви погоджуєтесь з обробкою персональних даних"
                  : "By submitting you agree to our privacy policy"}
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer className="bg-gray-800 text-gray-300 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-8 justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🎨</span>
                <span className="text-xl font-extrabold text-orange-400">ArtPlay</span>
                <span className="text-xl font-extrabold text-sky-400">Studio</span>
              </div>
              <p className="text-sm text-gray-400 max-w-xs">
                {isUk
                  ? "Дитяча студія творчості та мистецтва для дітей 3–14 років в Одесі"
                  : "Children's art & creativity studio for ages 3–14 in Odesa"}
              </p>
            </div>
            <div>
              <div className="font-semibold text-white mb-2">{isUk ? "📍 Адреса" : "📍 Address"}</div>
              <div className="text-sm text-gray-400 space-y-1">
                <div>📌 {isUk ? "вул. Дерибасівська 14, Одеса" : "14 Derybasivska St, Odesa"}</div>
                <div>📞 +380 48 777 12 34</div>
                <div>✉️ hello@artplay.od.ua</div>
              </div>
            </div>
            <div>
              <div className="font-semibold text-white mb-2">{isUk ? "🕐 Години роботи" : "🕐 Hours"}</div>
              <div className="text-sm text-gray-400 space-y-1">
                <div>{isUk ? "Пн–Пт: 10:00–20:00" : "Mon–Fri: 10:00–20:00"}</div>
                <div>{isUk ? "Субота: 10:00–16:00" : "Sat: 10:00–16:00"}</div>
                <div>{isUk ? "Неділя: вихідний" : "Sun: closed"}</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-gray-500">
              © 2016–2026 ArtPlay Studio ·{" "}
              {isUk ? "Усі права захищені" : "All rights reserved"}
            </div>
            <div className="text-lg font-semibold text-orange-400 italic">
              {isUk ? "✨ Кожна дитина — художник" : "✨ Every child is an artist"}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
