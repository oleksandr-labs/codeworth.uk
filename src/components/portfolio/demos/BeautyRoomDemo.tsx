"use client";

import { useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { en: "Services", uk: "Послуги" },
  { en: "Masters", uk: "Майстри" },
  { en: "Prices", uk: "Ціни" },
  { en: "Gallery", uk: "Галерея" },
  { en: "Book", uk: "Запис" },
];

const SERVICES = [
  {
    id: "hair",
    emoji: "💇‍♀️",
    nameEn: "Hair",
    nameUk: "Волосся",
    descEn: "Cut, color, styling & treatments",
    descUk: "Стрижка, фарбування, укладка та догляд",
    color: "bg-purple-50 border-purple-200",
    subServices: [
      { nameEn: "Women's haircut", nameUk: "Жіноча стрижка", price: "600 ₴" },
      { nameEn: "Full hair coloring", nameUk: "Повне фарбування", price: "1 800 ₴" },
      { nameEn: "Balayage / highlights", nameUk: "Балаяж / мелірування", price: "2 500 ₴" },
      { nameEn: "Blow-dry styling", nameUk: "Укладка феном", price: "400 ₴" },
    ],
  },
  {
    id: "nails",
    emoji: "💅",
    nameEn: "Nails",
    nameUk: "Нігті",
    descEn: "Manicure, pedicure, gel & art",
    descUk: "Манікюр, педикюр, гель та дизайн",
    color: "bg-fuchsia-50 border-fuchsia-200",
    subServices: [
      { nameEn: "Classic manicure", nameUk: "Класичний манікюр", price: "350 ₴" },
      { nameEn: "Gel manicure", nameUk: "Гель-манікюр", price: "550 ₴" },
      { nameEn: "Pedicure + gel", nameUk: "Педикюр + гель", price: "700 ₴" },
      { nameEn: "Nail art (per nail)", nameUk: "Дизайн (за нігтик)", price: "50 ₴" },
    ],
  },
  {
    id: "face",
    emoji: "🧖‍♀️",
    nameEn: "Face",
    nameUk: "Обличчя",
    descEn: "Cleaning, peeling, massage",
    descUk: "Чистка, пілінг, масаж",
    color: "bg-violet-50 border-violet-200",
    subServices: [
      { nameEn: "Deep cleansing facial", nameUk: "Глибока чистка обличчя", price: "900 ₴" },
      { nameEn: "Chemical peeling", nameUk: "Хімічний пілінг", price: "1 200 ₴" },
      { nameEn: "Face massage", nameUk: "Масаж обличчя", price: "600 ₴" },
    ],
  },
  {
    id: "brows",
    emoji: "👁️",
    nameEn: "Brows & Lashes",
    nameUk: "Брови та вії",
    descEn: "Shaping, lamination, extensions",
    descUk: "Корекція, ламінування, нарощування",
    color: "bg-pink-50 border-pink-200",
    subServices: [
      { nameEn: "Brow shaping + tint", nameUk: "Корекція + фарбування брів", price: "450 ₴" },
      { nameEn: "Brow lamination", nameUk: "Ламінування брів", price: "650 ₴" },
      { nameEn: "Lash extensions (classic)", nameUk: "Нарощування вій (класика)", price: "900 ₴" },
      { nameEn: "Lash lamination", nameUk: "Ламінування вій", price: "700 ₴" },
    ],
  },
  {
    id: "makeup",
    emoji: "💄",
    nameEn: "Makeup",
    nameUk: "Макіяж",
    descEn: "Day, evening, bridal looks",
    descUk: "Денний, вечірній, весільний",
    color: "bg-rose-50 border-rose-200",
    subServices: [
      { nameEn: "Day makeup", nameUk: "Денний макіяж", price: "800 ₴" },
      { nameEn: "Evening / event makeup", nameUk: "Вечірній / святковий макіяж", price: "1 200 ₴" },
      { nameEn: "Bridal makeup", nameUk: "Весільний макіяж", price: "2 000 ₴" },
    ],
  },
  {
    id: "body",
    emoji: "🧴",
    nameEn: "Body Care",
    nameUk: "Догляд за тілом",
    descEn: "Wraps, scrubs, massage",
    descUk: "Обгортання, скраби, масаж",
    color: "bg-indigo-50 border-indigo-200",
    subServices: [
      { nameEn: "Anti-cellulite massage", nameUk: "Антицелюлітний масаж", price: "800 ₴" },
      { nameEn: "Body scrub + wrap", nameUk: "Скраб + обгортання", price: "1 100 ₴" },
      { nameEn: "Relaxing full body massage", nameUk: "Релакс масаж усього тіла", price: "900 ₴" },
    ],
  },
];

const MASTERS = [
  {
    emoji: "💇‍♀️",
    nameEn: "Olena Kravchenko",
    nameUk: "Олена Кравченко",
    specEn: "Hair Stylist & Colorist",
    specUk: "Перукар-стиліст та колорист",
    expEn: "8 years experience",
    expUk: "8 років досвіду",
    services: ["hair"],
  },
  {
    emoji: "💅",
    nameEn: "Yuliia Bondar",
    nameUk: "Юлія Бондар",
    specEn: "Nail Artist",
    specUk: "Майстер манікюру",
    expEn: "6 years experience",
    expUk: "6 років досвіду",
    services: ["nails"],
  },
  {
    emoji: "🧖‍♀️",
    nameEn: "Iryna Shevchenko",
    nameUk: "Ірина Шевченко",
    specEn: "Cosmetologist",
    specUk: "Косметолог",
    expEn: "10 years experience",
    expUk: "10 років досвіду",
    services: ["face", "body"],
  },
  {
    emoji: "👁️",
    nameEn: "Anastasiia Melnyk",
    nameUk: "Анастасія Мельник",
    specEn: "Brow & Lash Master",
    specUk: "Бровіст та лашмейкер",
    expEn: "5 years experience",
    expUk: "5 років досвіду",
    services: ["brows", "makeup"],
  },
];

const BRANDS = ["Kerastase", "OPI", "Dermalogica", "MAC", "Schwarzkopf", "CND"];

const LOYALTY_TIERS = [
  {
    emoji: "🥈",
    nameEn: "Silver",
    nameUk: "Срібло",
    pointsEn: "0 – 4 999 pts",
    pointsUk: "0 – 4 999 балів",
    benefitsEn: ["3% cashback on all services", "Birthday gift certificate"],
    benefitsUk: ["3% кешбек на всі послуги", "Подарунковий сертифікат на день народження"],
    color: "bg-gray-100 border-gray-300",
  },
  {
    emoji: "🥇",
    nameEn: "Gold",
    nameUk: "Золото",
    pointsEn: "5 000 – 14 999 pts",
    pointsUk: "5 000 – 14 999 балів",
    benefitsEn: ["7% cashback on all services", "Free express treatments monthly", "Priority booking"],
    benefitsUk: ["7% кешбек на всі послуги", "Безкоштовна експрес-процедура щомісяця", "Пріоритетний запис"],
    color: "bg-amber-50 border-amber-300",
  },
  {
    emoji: "💎",
    nameEn: "Platinum",
    nameUk: "Платина",
    pointsEn: "15 000+ pts",
    pointsUk: "15 000+ балів",
    benefitsEn: ["12% cashback on all services", "Free styling with any color service", "VIP lounge access", "Exclusive new product previews"],
    benefitsUk: ["12% кешбек на всі послуги", "Безкоштовна укладка при фарбуванні", "Доступ до VIP-зони", "Перший доступ до новинок"],
    color: "bg-purple-50 border-purple-300",
  },
];

const REVIEWS = [
  {
    nameEn: "Daryna K.",
    nameUk: "Дарина К.",
    serviceEn: "Balayage with Olena",
    serviceUk: "Балаяж з Оленою",
    textEn: "Olena understood exactly what I wanted — the color turned out perfect, soft transitions and absolutely natural. I've been getting compliments for weeks!",
    textUk: "Олена зрозуміла саме те, що я хотіла — колір вийшов ідеальний, м'які переходи та абсолютно натуральний. Вже тижні отримую компліменти!",
    rating: 5,
  },
  {
    nameEn: "Mariia S.",
    nameUk: "Марія С.",
    serviceEn: "Gel manicure with Yuliia",
    serviceUk: "Гель-манікюр з Юлією",
    textEn: "The most gentle and precise manicure I've ever had. Yuliia's attention to detail is incredible — my nails lasted 3 full weeks without a single chip.",
    textUk: "Найніжніший і найточніший манікюр, що я мала. Увага Юлії до деталей неймовірна — нігті протрималися 3 тижні без жодного скола.",
    rating: 5,
  },
  {
    nameEn: "Tetiana L.",
    nameUk: "Тетяна Л.",
    serviceEn: "Brow lamination with Anastasiia",
    serviceUk: "Ламінування брів з Анастасією",
    textEn: "Finally my brows look full and groomed without any daily effort. Anastasiia is a true perfectionist — the shape is exactly what suits my face.",
    textUk: "Нарешті мої брови виглядають об'ємними і доглянутими без щоденних зусиль. Анастасія справжній перфекціоніст — форма саме та, що підходить моєму обличчю.",
    rating: 5,
  },
];

const BEFORE_AFTER = [
  {
    emoji: "💇‍♀️",
    labelEn: "Hair Color Transformation",
    labelUk: "Трансформація кольору волосся",
    beforeColor: "bg-amber-900",
    afterColor: "bg-amber-200",
    beforeLabelEn: "Before",
    beforeLabelUk: "До",
    afterLabelEn: "After",
    afterLabelUk: "Після",
  },
  {
    emoji: "💅",
    labelEn: "Gel Nail Art",
    labelUk: "Гель-дизайн нігтів",
    beforeColor: "bg-pink-200",
    afterColor: "bg-fuchsia-400",
    beforeLabelEn: "Before",
    beforeLabelUk: "До",
    afterLabelEn: "After",
    afterLabelUk: "Після",
  },
  {
    emoji: "👁️",
    labelEn: "Brow Lamination",
    labelUk: "Ламінування брів",
    beforeColor: "bg-stone-300",
    afterColor: "bg-stone-600",
    beforeLabelEn: "Before",
    beforeLabelUk: "До",
    afterLabelEn: "After",
    afterLabelUk: "Після",
  },
];

const TIME_SLOTS = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];

// ─── Component ───────────────────────────────────────────────────────────────

export function BeautyRoomDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  // ── Booking state ──
  const [bookStep, setBookStep] = useState(0);
  const [bookCategory, setBookCategory] = useState("");
  const [bookService, setBookService] = useState("");
  const [bookMaster, setBookMaster] = useState("");
  const [bookDate, setBookDate] = useState("");
  const [bookTime, setBookTime] = useState("");
  const [bookingDone, setBookingDone] = useState(false);

  // Booking helpers
  const selectedCategory = SERVICES.find((s) => s.id === bookCategory);
  const selectedSubService = selectedCategory?.subServices.find(
    (ss) => (isUk ? ss.nameUk : ss.nameEn) === bookService,
  );
  const availableMasters = MASTERS.filter((m) => m.services.includes(bookCategory));

  const getNextDates = () => {
    const dates: string[] = [];
    const today = new Date();
    for (let i = 1; i <= 5; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push(d.toLocaleDateString(isUk ? "uk-UA" : "en-GB", { weekday: "short", day: "numeric", month: "short" }));
    }
    return dates;
  };

  const resetBooking = () => {
    setBookStep(0);
    setBookCategory("");
    setBookService("");
    setBookMaster("");
    setBookDate("");
    setBookTime("");
    setBookingDone(false);
  };

  return (
    <div className="min-h-screen bg-[#faf5ff] text-gray-800">
      {/* ── Header ── */}
      <header className="sticky top-0 z-30 border-b border-purple-100 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <span className="text-xl font-bold tracking-tight text-purple-700">
            💜 Beauty Room
          </span>

          <nav className="hidden gap-6 md:flex">
            {NAV_ITEMS.map((item) => (
              <span
                key={item.en}
                className="cursor-pointer text-sm font-medium text-gray-600 transition-colors hover:text-purple-600"
              >
                {isUk ? item.uk : item.en}
              </span>
            ))}
          </nav>

          <button className="rounded-full bg-[#d4af37] px-5 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#c9a02e] hover:shadow-lg">
            {isUk ? "Записатися" : "Book Now"}
          </button>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="bg-linear-to-br from-[#c084fc] via-[#a855f7] to-[#e9d5ff] px-4 py-20 text-center text-white">
        <p className="mb-3 text-lg font-medium tracking-wide opacity-90">
          ✨ Beauty Room Kyiv ✨
        </p>
        <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-5xl">
          {isUk ? "Ваша Краса — Наше Мистецтво" : "Your Beauty — Our Art"}
        </h1>
        <p className="mx-auto mb-8 max-w-xl text-lg opacity-90">
          {isUk
            ? "Преміальний салон краси у центрі Києва. Професійні майстри, найкращі бренди, атмосфера затишку."
            : "Premium beauty salon in the heart of Kyiv. Professional masters, top brands, cozy atmosphere."}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="rounded-full bg-white px-7 py-3 font-bold text-purple-700 shadow-lg transition-all hover:bg-purple-50 hover:shadow-xl">
            {isUk ? "Записатися онлайн" : "Book Online"}
          </button>
          <button className="rounded-full border-2 border-white/60 px-7 py-3 font-bold text-white transition-all hover:bg-white/10">
            {isUk ? "Переглянути послуги" : "View Services"}
          </button>
        </div>

        {/* Trust badges */}
        <div className="mx-auto mt-12 flex max-w-lg flex-wrap justify-center gap-8">
          {[
            { val: "5+", en: "years", uk: "років" },
            { val: "2 000+", en: "happy clients", uk: "задоволених клієнтів" },
            { val: "100%", en: "premium products", uk: "преміум продукти" },
          ].map((b) => (
            <div key={b.val} className="text-center">
              <div className="text-2xl font-extrabold">{b.val}</div>
              <div className="text-sm opacity-80">{isUk ? b.uk : b.en}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services ── */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-2 text-center text-3xl font-bold text-purple-800">
          {isUk ? "Наші послуги" : "Our Services"}
        </h2>
        <p className="mb-10 text-center text-gray-500">
          {isUk ? "Повний спектр б'юті-послуг для вашої краси" : "A full range of beauty services for you"}
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((svc) => (
            <div
              key={svc.id}
              className={`rounded-2xl border p-6 transition-shadow hover:shadow-lg ${svc.color}`}
            >
              <div className="mb-3 text-3xl">{svc.emoji}</div>
              <h3 className="mb-1 text-lg font-bold text-purple-800">
                {isUk ? svc.nameUk : svc.nameEn}
              </h3>
              <p className="mb-4 text-sm text-gray-500">
                {isUk ? svc.descUk : svc.descEn}
              </p>
              <ul className="space-y-2">
                {svc.subServices.map((ss) => (
                  <li key={ss.nameEn} className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">{isUk ? ss.nameUk : ss.nameEn}</span>
                    <span className="shrink-0 ml-2 font-semibold text-purple-700">
                      {ss.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Masters ── */}
      <section className="bg-purple-50 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-2 text-center text-3xl font-bold text-purple-800">
            {isUk ? "Наші майстри" : "Our Masters"}
          </h2>
          <p className="mb-10 text-center text-gray-500">
            {isUk ? "Досвідчені фахівці, закохані у свою справу" : "Experienced professionals passionate about their craft"}
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {MASTERS.map((m) => (
              <div
                key={m.nameEn}
                className="rounded-2xl border border-purple-100 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-3xl">
                  {m.emoji}
                </div>
                <h3 className="text-lg font-bold text-purple-800">
                  {isUk ? m.nameUk : m.nameEn}
                </h3>
                <p className="mb-1 text-sm text-purple-500">
                  {isUk ? m.specUk : m.specEn}
                </p>
                <p className="mb-4 text-xs text-gray-400">
                  {isUk ? m.expUk : m.expEn}
                </p>
                <button className="rounded-full border border-[#d4af37] px-4 py-1.5 text-sm font-semibold text-[#d4af37] transition-all hover:bg-[#d4af37] hover:text-white">
                  {isUk ? `Записатися до ${m.nameUk.split(" ")[0]}` : `Book with ${m.nameEn.split(" ")[0]}`}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Online Booking (interactive) ── */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="mb-2 text-center text-3xl font-bold text-purple-800">
          {isUk ? "Онлайн-запис" : "Online Booking"}
        </h2>
        <p className="mb-8 text-center text-gray-500">
          {isUk ? "Оберіть послугу та запишіться за 4 кроки" : "Choose a service and book in 4 easy steps"}
        </p>

        {/* Progress indicator */}
        <div className="mb-8 flex items-center justify-center gap-2">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                  bookStep >= step
                    ? "bg-purple-600 text-white"
                    : "bg-purple-100 text-purple-400"
                }`}
              >
                {step}
              </div>
              {step < 4 && (
                <div
                  className={`h-0.5 w-8 transition-colors ${
                    bookStep > step ? "bg-purple-600" : "bg-purple-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm">
          {/* Step 0: Start */}
          {bookStep === 0 && !bookingDone && (
            <div className="text-center">
              <p className="mb-4 text-gray-600">
                {isUk ? "Натисніть, щоб розпочати запис" : "Click to start your booking"}
              </p>
              <button
                onClick={() => setBookStep(1)}
                className="rounded-full bg-[#d4af37] px-8 py-3 font-bold text-white shadow-md transition-all hover:bg-[#c9a02e] hover:shadow-lg"
              >
                {isUk ? "Розпочати" : "Get Started"}
              </button>
            </div>
          )}

          {/* Step 1: Choose category */}
          {bookStep === 1 && (
            <div>
              <h3 className="mb-4 text-lg font-bold text-purple-700">
                {isUk ? "Крок 1: Оберіть категорію" : "Step 1: Choose a Category"}
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {SERVICES.map((svc) => (
                  <button
                    key={svc.id}
                    onClick={() => {
                      setBookCategory(svc.id);
                      setBookService("");
                      setBookMaster("");
                      setBookStep(2);
                    }}
                    className="flex items-center gap-3 rounded-xl border border-purple-100 p-4 text-left transition-all hover:border-purple-400 hover:shadow-md"
                  >
                    <span className="text-2xl">{svc.emoji}</span>
                    <div>
                      <div className="font-semibold text-purple-800">{isUk ? svc.nameUk : svc.nameEn}</div>
                      <div className="text-xs text-gray-400">{isUk ? svc.descUk : svc.descEn}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Choose specific service */}
          {bookStep === 2 && selectedCategory && (
            <div>
              <h3 className="mb-4 text-lg font-bold text-purple-700">
                {isUk ? "Крок 2: Оберіть послугу" : "Step 2: Choose a Service"}
              </h3>
              <div className="space-y-2">
                {selectedCategory.subServices.map((ss) => {
                  const label = isUk ? ss.nameUk : ss.nameEn;
                  return (
                    <button
                      key={ss.nameEn}
                      onClick={() => {
                        setBookService(label);
                        setBookMaster("");
                        setBookStep(3);
                      }}
                      className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition-all hover:border-purple-400 hover:shadow-md ${
                        bookService === label ? "border-purple-500 bg-purple-50" : "border-purple-100"
                      }`}
                    >
                      <span className="font-medium text-gray-700">{label}</span>
                      <span className="shrink-0 font-semibold text-purple-700">{ss.price}</span>
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setBookStep(1)}
                className="mt-4 text-sm text-purple-500 hover:underline"
              >
                {isUk ? "← Назад" : "← Back"}
              </button>
            </div>
          )}

          {/* Step 3: Choose master */}
          {bookStep === 3 && (
            <div>
              <h3 className="mb-4 text-lg font-bold text-purple-700">
                {isUk ? "Крок 3: Оберіть майстра" : "Step 3: Choose a Master"}
              </h3>
              <div className="space-y-2">
                {availableMasters.map((m) => (
                  <button
                    key={m.nameEn}
                    onClick={() => {
                      setBookMaster(isUk ? m.nameUk : m.nameEn);
                      setBookStep(4);
                    }}
                    className="flex w-full items-center gap-3 rounded-xl border border-purple-100 p-4 text-left transition-all hover:border-purple-400 hover:shadow-md"
                  >
                    <span className="text-2xl">{m.emoji}</span>
                    <div>
                      <div className="font-semibold text-purple-800">{isUk ? m.nameUk : m.nameEn}</div>
                      <div className="text-xs text-gray-400">{isUk ? m.specUk : m.specEn}</div>
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setBookStep(2)}
                className="mt-4 text-sm text-purple-500 hover:underline"
              >
                {isUk ? "← Назад" : "← Back"}
              </button>
            </div>
          )}

          {/* Step 4: Pick date + time */}
          {bookStep === 4 && (
            <div>
              <h3 className="mb-4 text-lg font-bold text-purple-700">
                {isUk ? "Крок 4: Оберіть дату та час" : "Step 4: Pick Date & Time"}
              </h3>

              <p className="mb-2 text-sm font-medium text-gray-600">{isUk ? "Дата:" : "Date:"}</p>
              <div className="mb-4 flex flex-wrap gap-2">
                {getNextDates().map((d) => (
                  <button
                    key={d}
                    onClick={() => setBookDate(d)}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                      bookDate === d
                        ? "border-purple-500 bg-purple-100 text-purple-700"
                        : "border-purple-100 text-gray-600 hover:border-purple-300"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>

              {bookDate && (
                <>
                  <p className="mb-2 text-sm font-medium text-gray-600">{isUk ? "Час:" : "Time:"}</p>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {TIME_SLOTS.map((t) => (
                      <button
                        key={t}
                        onClick={() => setBookTime(t)}
                        className={`rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                          bookTime === t
                            ? "border-purple-500 bg-purple-100 text-purple-700"
                            : "border-purple-100 text-gray-600 hover:border-purple-300"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {bookDate && bookTime && (
                <div className="rounded-xl border border-[#d4af37]/30 bg-[#faf5ff] p-4">
                  <h4 className="mb-3 font-bold text-purple-800">
                    {isUk ? "Підсумок запису" : "Booking Summary"}
                  </h4>
                  <div className="mb-3 space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-medium text-gray-800">{isUk ? "Категорія:" : "Category:"}</span>{" "}
                      {isUk ? selectedCategory?.nameUk : selectedCategory?.nameEn}
                    </p>
                    <p>
                      <span className="font-medium text-gray-800">{isUk ? "Послуга:" : "Service:"}</span>{" "}
                      {bookService}
                    </p>
                    <p>
                      <span className="font-medium text-gray-800">{isUk ? "Майстер:" : "Master:"}</span>{" "}
                      {bookMaster}
                    </p>
                    <p>
                      <span className="font-medium text-gray-800">{isUk ? "Дата:" : "Date:"}</span>{" "}
                      {bookDate}
                    </p>
                    <p>
                      <span className="font-medium text-gray-800">{isUk ? "Час:" : "Time:"}</span>{" "}
                      {bookTime}
                    </p>
                    <p>
                      <span className="font-medium text-gray-800">{isUk ? "Ціна:" : "Price:"}</span>{" "}
                      <span className="font-bold text-purple-700">{selectedSubService?.price}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setBookingDone(true);
                      setBookStep(0);
                    }}
                    className="w-full rounded-full bg-[#d4af37] py-3 font-bold text-white shadow-md transition-all hover:bg-[#c9a02e] hover:shadow-lg"
                  >
                    {isUk ? "Підтвердити запис" : "Confirm Booking"}
                  </button>
                </div>
              )}

              <button
                onClick={() => setBookStep(3)}
                className="mt-4 text-sm text-purple-500 hover:underline"
              >
                {isUk ? "← Назад" : "← Back"}
              </button>
            </div>
          )}

          {/* Booking confirmed */}
          {bookingDone && (
            <div className="text-center">
              <div className="mb-3 text-5xl">✅</div>
              <h3 className="mb-2 text-xl font-bold text-purple-800">
                {isUk ? "Запис підтверджено!" : "Booking Confirmed!"}
              </h3>
              <p className="mb-6 text-gray-500">
                {isUk
                  ? "Ми надішлемо вам SMS-підтвердження. Чекаємо на вас!"
                  : "We'll send you an SMS confirmation. See you soon!"}
              </p>
              <button
                onClick={resetBooking}
                className="rounded-full border border-purple-300 px-6 py-2 text-sm font-semibold text-purple-600 transition-all hover:bg-purple-50"
              >
                {isUk ? "Записатися ще" : "Book Another"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Before / After ── */}
      <section className="bg-purple-50 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-2 text-center text-3xl font-bold text-purple-800">
            {isUk ? "До / Після" : "Before / After"}
          </h2>
          <p className="mb-10 text-center text-gray-500">
            {isUk ? "Реальні результати наших клієнтів" : "Real results from our clients"}
          </p>

          <div className="grid gap-6 sm:grid-cols-3">
            {BEFORE_AFTER.map((item) => (
              <div
                key={item.labelEn}
                className="overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm"
              >
                <div className="flex">
                  <div className="flex flex-1 flex-col items-center justify-center py-8">
                    <div
                      className={`mb-2 h-20 w-20 rounded-full ${item.beforeColor}`}
                    />
                    <span className="text-xs font-medium text-gray-400">
                      {isUk ? item.beforeLabelUk : item.beforeLabelEn}
                    </span>
                  </div>
                  <div className="flex items-center text-xl text-purple-300">→</div>
                  <div className="flex flex-1 flex-col items-center justify-center py-8">
                    <div
                      className={`mb-2 h-20 w-20 rounded-full ${item.afterColor}`}
                    />
                    <span className="text-xs font-medium text-gray-400">
                      {isUk ? item.afterLabelUk : item.afterLabelEn}
                    </span>
                  </div>
                </div>
                <div className="border-t border-purple-50 bg-purple-50/50 px-4 py-3 text-center">
                  <span className="mr-1">{item.emoji}</span>
                  <span className="text-sm font-semibold text-purple-700">
                    {isUk ? item.labelUk : item.labelEn}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product Brands ── */}
      <section className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h2 className="mb-2 text-3xl font-bold text-purple-800">
          {isUk ? "Ми працюємо з найкращими" : "We Work With the Best"}
        </h2>
        <p className="mb-8 text-gray-500">
          {isUk ? "Тільки преміальні бренди для наших клієнтів" : "Only premium brands for our clients"}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {BRANDS.map((brand) => (
            <span
              key={brand}
              className="rounded-full border border-[#d4af37]/30 bg-white px-5 py-2 text-sm font-semibold text-[#d4af37] shadow-sm"
            >
              {brand}
            </span>
          ))}
        </div>
      </section>

      {/* ── Loyalty Program ── */}
      <section className="bg-linear-to-br from-purple-50 to-[#faf5ff] px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-2 text-center text-3xl font-bold text-purple-800">
            {isUk ? "Програма лояльності" : "Loyalty Program"}
          </h2>
          <p className="mb-10 text-center text-gray-500">
            {isUk
              ? "Накопичуйте бали з кожним візитом та отримуйте привілеї"
              : "Earn points with every visit and unlock exclusive perks"}
          </p>

          <div className="grid gap-6 sm:grid-cols-3">
            {LOYALTY_TIERS.map((tier) => (
              <div
                key={tier.nameEn}
                className={`rounded-2xl border p-6 transition-shadow hover:shadow-lg ${tier.color}`}
              >
                <div className="mb-2 text-3xl">{tier.emoji}</div>
                <h3 className="mb-1 text-xl font-bold text-purple-800">
                  {isUk ? tier.nameUk : tier.nameEn}
                </h3>
                <p className="mb-4 text-sm text-purple-500">
                  {isUk ? tier.pointsUk : tier.pointsEn}
                </p>
                <ul className="space-y-2">
                  {(isUk ? tier.benefitsUk : tier.benefitsEn).map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="shrink-0 text-[#d4af37]">★</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="mx-auto max-w-4xl px-4 py-16">
        <h2 className="mb-2 text-center text-3xl font-bold text-purple-800">
          {isUk ? "Відгуки клієнтів" : "Client Reviews"}
        </h2>
        <p className="mb-10 text-center text-gray-500">
          {isUk ? "Що кажуть про нас наші клієнти" : "What our clients say about us"}
        </p>

        <div className="grid gap-6 sm:grid-cols-3">
          {REVIEWS.map((r) => (
            <div
              key={r.nameEn}
              className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-3 text-[#d4af37]">
                {"★".repeat(r.rating)}
              </div>
              <p className="mb-4 text-sm leading-relaxed text-gray-600">
                &ldquo;{isUk ? r.textUk : r.textEn}&rdquo;
              </p>
              <div className="border-t border-purple-50 pt-3">
                <p className="text-sm font-bold text-purple-800">
                  {isUk ? r.nameUk : r.nameEn}
                </p>
                <p className="text-xs text-purple-400">
                  {isUk ? r.serviceUk : r.serviceEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-purple-900 px-4 py-12 text-purple-200">
        <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-3">
          <div>
            <h3 className="mb-3 text-lg font-bold text-white">💜 Beauty Room</h3>
            <p className="text-sm leading-relaxed">
              {isUk
                ? "Преміальний салон краси у серці Києва. Ваша краса — наш пріоритет."
                : "Premium beauty salon in the heart of Kyiv. Your beauty is our priority."}
            </p>
          </div>

          <div>
            <h4 className="mb-3 font-bold text-white">{isUk ? "Контакти" : "Contact"}</h4>
            <ul className="space-y-2 text-sm">
              <li>📍 {isUk ? "вул. Хрещатик, 22, Київ" : "22 Khreshchatyk St, Kyiv"}</li>
              <li>📞 +380 44 123 4567</li>
              <li>📸 @beautyroom.kyiv</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-bold text-white">{isUk ? "Графік роботи" : "Working Hours"}</h4>
            <ul className="space-y-2 text-sm">
              <li>{isUk ? "Пн — Пт: 09:00 — 21:00" : "Mon — Fri: 09:00 — 21:00"}</li>
              <li>{isUk ? "Сб: 10:00 — 20:00" : "Sat: 10:00 — 20:00"}</li>
              <li>{isUk ? "Нд: 10:00 — 18:00" : "Sun: 10:00 — 18:00"}</li>
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-5xl border-t border-purple-800 pt-6 text-center text-xs text-purple-400">
          &copy; 2026 Beauty Room Kyiv.{" "}
          {isUk ? "Усі права захищені." : "All rights reserved."}
        </div>
      </footer>
    </div>
  );
}
