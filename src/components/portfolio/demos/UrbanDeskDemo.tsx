"use client";

import { useState } from "react";

function fmtPrice(uah: number, isUk: boolean): string {
  if (isUk) return `${uah} ₴`;
  return `£${Math.ceil(uah / 40 / 5) * 5}`;
}

// ─── Workspace types ──────────────────────────────────────────────────────────
const WORKSPACE_TYPES = [
  {
    key: "hot",
    icon: "💺",
    nameEn: "Hot Desk",
    nameUk: "Хот-деск",
    descEn: "Any free desk, first-come basis. Perfect for freelancers.",
    descUk: "Будь-яке вільне місце. Ідеально для фрілансерів.",
    priceDay: 350,
    priceMonth: 2200,
    available: true,
  },
  {
    key: "dedicated",
    icon: "🖥",
    nameEn: "Dedicated Desk",
    nameUk: "Фіксований стіл",
    descEn: "Your own desk, 24/7 access. Lock your stuff and come back.",
    descUk: "Ваш особистий стіл з постійним доступом.",
    priceDay: 500,
    priceMonth: 5500,
    available: true,
  },
  {
    key: "office",
    icon: "🚪",
    nameEn: "Private Office",
    nameUk: "Приватний офіс",
    descEn: "Enclosed office for teams of 2–10. Full privacy.",
    descUk: "Закритий офіс для команд від 2 до 10 осіб.",
    priceDay: 1200,
    priceMonth: 12000,
    available: true,
  },
  {
    key: "conf",
    icon: "👥",
    nameEn: "Conference Room",
    nameUk: "Конференц-зала",
    descEn: "Seats 8–12, projector, whiteboard, video conferencing.",
    descUk: "До 12 осіб, проєктор, дошка, відеозв'язок.",
    priceDay: 800,
    priceMonth: 0,
    available: false,
  },
  {
    key: "phone",
    icon: "📞",
    nameEn: "Phone Booth",
    nameUk: "Телефонна будка",
    descEn: "Soundproofed pod for calls and video meetings.",
    descUk: "Звукоізольована кабіна для дзвінків.",
    priceDay: 150,
    priceMonth: 0,
    available: true,
  },
];

// ─── Locations ────────────────────────────────────────────────────────────────
const LOCATIONS = [
  {
    key: "shoreditch",
    nameEn: "Shoreditch",
    nameUk: "Хрещатик",
    distEn: "0.3 km from Old Street station",
    distUk: "300 м від ст. м. Хрещатик",
    addressEn: "15 Shoreditch High St, E1 6PE",
    addressUk: "вул. Хрещатик, 22, Київ",
  },
  {
    key: "soho",
    nameEn: "Soho",
    nameUk: "Подол",
    distEn: "1.1 km from Oxford Circus",
    distUk: "500 м від Контрактової площі",
    addressEn: "44 Dean Street, W1D 5AP",
    addressUk: "Набережно-Хрещатицька, 5",
  },
  {
    key: "canary",
    nameEn: "Canary Wharf",
    nameUk: "Печерськ",
    distEn: "0.5 km from Canary Wharf DLR",
    distUk: "400 м від ст. м. Кловська",
    addressEn: "20 Churchill Place, E14 5RB",
    addressUk: "вул. Інститутська, 10",
  },
];

// ─── Duration options ─────────────────────────────────────────────────────────
const DURATIONS = [
  { key: "hour", labelEn: "Hourly", labelUk: "Погодинно", multiplier: 0.15 },
  { key: "day", labelEn: "Day", labelUk: "День", multiplier: 1 },
  { key: "week", labelEn: "Week", labelUk: "Тиждень", multiplier: 5.5 },
  { key: "month", labelEn: "Month", labelUk: "Місяць", multiplier: 18 },
];

// ─── Membership plans ─────────────────────────────────────────────────────────
const MEMBERSHIP_PLANS = [
  { nameEn: "Day Pass", nameUk: "Одноденний", priceUah: 350, unitEn: "/day", unitUk: "/день", color: "bg-amber-100 border-amber-300 text-amber-900" },
  { nameEn: "Flex 10", nameUk: "Флекс 10", priceUah: 2200, unitEn: "/mo", unitUk: "/міс", color: "bg-sage-100 border-sage-300 text-sage-900" },
  { nameEn: "Resident", nameUk: "Резидент", priceUah: 3800, unitEn: "/mo", unitUk: "/міс", color: "bg-green-100 border-green-300 text-green-900", popular: true },
  { nameEn: "Dedicated Desk", nameUk: "Фікс. стіл", priceUah: 5500, unitEn: "/mo", unitUk: "/міс", color: "bg-stone-100 border-stone-300 text-stone-900" },
  { nameEn: "Private Office", nameUk: "Приватний офіс", priceUah: 12000, unitEn: "/mo", unitUk: "/міс", fromPrefix: true, color: "bg-wood-100 border-wood-300 text-wood-900" },
];

// ─── Amenities ────────────────────────────────────────────────────────────────
const AMENITIES = [
  { icon: "📶", titleEn: "WiFi 1 Gbps", titleUk: "WiFi 1 Гбіт/с", descEn: "Symmetrical fibre, separate guest SSID", descUk: "Симетрична оптоволоконна лінія" },
  { icon: "☕", titleEn: "Unlimited coffee & water", titleUk: "Кава та вода без обмежень", descEn: "Specialty coffee + sparkling water bar", descUk: "Спешелті кава + бар з водою" },
  { icon: "🖨", titleEn: "Printer & Scanner", titleUk: "Принтер та сканер", descEn: "Colour laser printing, A4/A3 scanning", descUk: "Кольоровий лазерний друк і сканування" },
  { icon: "🏢", titleEn: "Legal address", titleUk: "Юридична адреса", descEn: "Use our address for your business registration", descUk: "Для реєстрації ФОП або ТОВ" },
  { icon: "🔑", titleEn: "24/7 keycard access", titleUk: "Доступ 24/7 за карткою", descEn: "Residents & dedicated desk members only", descUk: "Для резидентів та власників стола" },
  { icon: "🚲", titleEn: "Bike parking", titleUk: "Велопарковка", descEn: "Secure indoor bike storage + lockers", descUk: "Закрита велопарковка та локери" },
];

// Generate a simple calendar for the current month
function buildCalendar(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = firstDay === 0 ? 6 : firstDay - 1; // Monday-based
  const cells: (number | null)[] = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

const MONTH_NAMES_EN = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const MONTH_NAMES_UK = ["Січень","Лютий","Березень","Квітень","Травень","Червень","Липень","Серпень","Вересень","Жовтень","Листопад","Грудень"];

export function UrbanDeskDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  // Workspace type selection
  const [selectedWorkspace, setSelectedWorkspace] = useState("hot");

  // Booking flow
  const [bookingStep, setBookingStep] = useState(0);
  const [bookingLocation, setBookingLocation] = useState("");
  const [bookingType, setBookingType] = useState("hot");
  const [bookingDay, setBookingDay] = useState<number | null>(null);
  const [bookingDuration, setBookingDuration] = useState("day");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [bookingDone, setBookingDone] = useState(false);

  // Membership annual toggle
  const [annualMembership, setAnnualMembership] = useState(false);

  // B2B form
  const [b2bName, setB2bName] = useState("");
  const [b2bEmail, setB2bEmail] = useState("");
  const [b2bTeamSize, setB2bTeamSize] = useState("");
  const [b2bSubmitted, setB2bSubmitted] = useState(false);

  const address = isUk ? "вул. Хрещатик, 22, Київ, 01001" : "15 Shoreditch High Street, London E1 6PE";
  const phone = isUk ? "+38 (044) 222-33-44" : "+44 20 7946 0456";

  // Calendar helpers
  const today = new Date();
  const calYear = today.getFullYear();
  const calMonth = today.getMonth();
  const calDays = buildCalendar(calYear, calMonth);
  const calMonthName = isUk ? MONTH_NAMES_UK[calMonth] : MONTH_NAMES_EN[calMonth];

  // Booking price calc
  const bookWorkspace = WORKSPACE_TYPES.find((w) => w.key === bookingType) || WORKSPACE_TYPES[0];
  const duration = DURATIONS.find((d) => d.key === bookingDuration) || DURATIONS[1];
  const bookingPriceUah = Math.round(bookWorkspace.priceDay * duration.multiplier);

  const membershipPrice = (uah: number) => {
    const price = annualMembership ? Math.round(uah * 0.85) : uah;
    return fmtPrice(price, isUk);
  };

  const bookingStepTitles = isUk
    ? ["Оберіть локацію", "Тип місця та дата", "Тривалість", "Контакти"]
    : ["Choose Location", "Workspace & Date", "Duration", "Contact Details"];

  return (
    <div style={{ backgroundColor: "#FAF7F0" }} className="text-stone-900 font-sans min-h-screen">

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-16 px-6" style={{ backgroundColor: "#FAF7F0" }}>
        <div className="max-w-5xl mx-auto">
          {/* tag */}
          <div
            className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-widest"
            style={{ backgroundColor: "#6B9E7820", color: "#4a7a57", border: "1px solid #6B9E7840" }}
          >
            {isUk ? "Коворкінг у центрі міста" : "City-centre coworking"}
          </div>

          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="flex-1">
              <h1
                className="text-4xl lg:text-5xl font-extrabold leading-tight mb-5"
                style={{ color: "#3D2B1F" }}
              >
                {isUk
                  ? "Ваше робоче місце у серці Києва"
                  : "Your Workspace in the Heart of the City"}
              </h1>
              <p className="text-stone-500 text-lg mb-8">
                {isUk
                  ? "Гнучкі умови, швидкий Wi-Fi та атмосфера продуктивності."
                  : "Flexible terms, blazing Wi-Fi, and a community that gets things done."}
              </p>

              {/* Stats strip */}
              <div className="flex flex-wrap gap-4 mb-8">
                {(isUk
                  ? ["3 локації", "200+ резидентів", "WiFi 1 Гбіт/с"]
                  : ["3 locations", "200+ residents", "1 Gbps WiFi"]
                ).map((s) => (
                  <div
                    key={s}
                    className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full"
                    style={{ backgroundColor: "#6B9E7815", color: "#3D2B1F" }}
                  >
                    <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: "#6B9E78" }} />
                    {s}
                  </div>
                ))}
              </div>

              {/* Quick booking strip */}
              <div
                className="flex flex-col sm:flex-row gap-3 p-4 rounded-2xl"
                style={{ backgroundColor: "#fff", boxShadow: "0 2px 20px rgba(61,43,31,0.08)" }}
              >
                <select
                  className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-700 focus:outline-none"
                  defaultValue=""
                >
                  <option value="" disabled>{isUk ? "Оберіть локацію" : "Choose location"}</option>
                  {LOCATIONS.map((l) => (
                    <option key={l.key} value={l.key}>{isUk ? l.nameUk : l.nameEn}</option>
                  ))}
                </select>
                <select
                  className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-700 focus:outline-none"
                  defaultValue=""
                >
                  <option value="" disabled>{isUk ? "Тип місця" : "Workspace type"}</option>
                  {WORKSPACE_TYPES.map((w) => (
                    <option key={w.key} value={w.key}>{isUk ? w.nameUk : w.nameEn}</option>
                  ))}
                </select>
                <button
                  className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#3D2B1F" }}
                >
                  {isUk ? "Забронювати" : "Book now"}
                </button>
              </div>
            </div>

            {/* Decorative card */}
            <div
              className="hidden lg:flex flex-shrink-0 w-72 h-64 rounded-3xl items-center justify-center text-7xl shadow-xl"
              style={{ backgroundColor: "#6B9E7820", border: "1px solid #6B9E7830" }}
            >
              🏙
            </div>
          </div>
        </div>
      </section>

      {/* ── WORKSPACE TYPES ─────────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2" style={{ color: "#3D2B1F" }}>
            {isUk ? "Типи робочих місць" : "Workspace Types"}
          </h2>
          <p className="text-stone-400 text-center mb-10 text-sm">
            {isUk ? "Від одного стола до приватного офісу" : "From a single desk to a full private office"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WORKSPACE_TYPES.map((w) => (
              <button
                key={w.key}
                onClick={() => setSelectedWorkspace(w.key)}
                className="text-left p-5 rounded-2xl border-2 transition-all hover:shadow-md"
                style={{
                  borderColor: selectedWorkspace === w.key ? "#6B9E78" : "#e7e0d8",
                  backgroundColor: selectedWorkspace === w.key ? "#6B9E7810" : "#fff",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{w.icon}</span>
                  {!w.available && (
                    <span className="text-xs text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                      {isUk ? "Зайнято" : "Unavailable"}
                    </span>
                  )}
                  {w.available && selectedWorkspace === w.key && (
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: "#6B9E7820", color: "#4a7a57" }}
                    >
                      {isUk ? "Обрано" : "Selected"}
                    </span>
                  )}
                </div>
                <div className="font-bold text-sm mb-1" style={{ color: "#3D2B1F" }}>
                  {isUk ? w.nameUk : w.nameEn}
                </div>
                <div className="text-xs text-stone-500 mb-3">
                  {isUk ? w.descUk : w.descEn}
                </div>
                <div className="text-xs font-semibold" style={{ color: "#6B9E78" }}>
                  {fmtPrice(w.priceDay, isUk)} {isUk ? "/ день" : "/ day"}
                  {w.priceMonth > 0 && (
                    <span className="ml-2 text-stone-400 font-normal">
                      · {fmtPrice(w.priceMonth, isUk)} {isUk ? "/ міс" : "/ mo"}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE BOOKING ─────────────────────────────────────────────── */}
      <section className="py-16 px-6" style={{ backgroundColor: "#FAF7F0" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2" style={{ color: "#3D2B1F" }}>
            {isUk ? "Забронювати місце" : "Book Your Spot"}
          </h2>
          <p className="text-stone-400 text-center mb-10 text-sm">
            {isUk ? "4 кроки — і місце ваше" : "4 simple steps to reserve your workspace"}
          </p>

          {/* Step indicators */}
          <div className="flex items-center justify-center mb-8 gap-0">
            {bookingStepTitles.map((title, i) => (
              <div key={i} className="flex items-center">
                <button
                  onClick={() => !bookingDone && setBookingStep(i)}
                  className="flex flex-col items-center gap-1"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all"
                    style={{
                      borderColor: bookingStep >= i ? "#6B9E78" : "#d6ccc4",
                      backgroundColor: bookingStep === i ? "#6B9E78" : bookingStep > i ? "#6B9E7820" : "#fff",
                      color: bookingStep === i ? "#fff" : bookingStep > i ? "#4a7a57" : "#a8a29e",
                    }}
                  >
                    {bookingStep > i ? "✓" : i + 1}
                  </div>
                  <span className="text-xs text-stone-400 hidden sm:block max-w-[70px] text-center leading-tight">
                    {title}
                  </span>
                </button>
                {i < bookingStepTitles.length - 1 && (
                  <div
                    className="w-10 h-0.5 mx-1 mb-4"
                    style={{ backgroundColor: bookingStep > i ? "#6B9E78" : "#e7e0d8" }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step panels */}
          <div
            className="rounded-2xl p-6 shadow-sm"
            style={{ backgroundColor: "#fff", border: "1px solid #e7e0d8" }}
          >
            {bookingDone ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "#3D2B1F" }}>
                  {isUk ? "Бронювання підтверджено!" : "Booking Confirmed!"}
                </h3>
                <p className="text-stone-500 text-sm mb-6">
                  {isUk
                    ? `QR-код надіслано на ${contactEmail || "вашу пошту"}`
                    : `QR code sent to ${contactEmail || "your email"}`}
                </p>
                {/* QR placeholder */}
                <div
                  className="w-32 h-32 mx-auto rounded-xl mb-6 flex items-center justify-center text-5xl"
                  style={{ backgroundColor: "#f5f5f5", border: "2px dashed #d6ccc4" }}
                >
                  <span style={{ fontSize: "56px" }}>▣</span>
                </div>
                <button
                  onClick={() => { setBookingDone(false); setBookingStep(0); setContactName(""); setContactEmail(""); setBookingDay(null); }}
                  className="text-sm underline text-stone-400 hover:text-stone-600"
                >
                  {isUk ? "Нове бронювання" : "New booking"}
                </button>
              </div>
            ) : bookingStep === 0 ? (
              <div>
                <h3 className="font-bold mb-4" style={{ color: "#3D2B1F" }}>
                  {isUk ? "Оберіть локацію" : "Choose a location"}
                </h3>
                <div className="space-y-3">
                  {LOCATIONS.map((loc) => (
                    <button
                      key={loc.key}
                      onClick={() => setBookingLocation(loc.key)}
                      className="w-full text-left p-4 rounded-xl border-2 transition-all"
                      style={{
                        borderColor: bookingLocation === loc.key ? "#6B9E78" : "#e7e0d8",
                        backgroundColor: bookingLocation === loc.key ? "#6B9E7810" : "#faf9f7",
                      }}
                    >
                      <div className="font-semibold text-sm" style={{ color: "#3D2B1F" }}>
                        {isUk ? loc.nameUk : loc.nameEn}
                      </div>
                      <div className="text-xs text-stone-400 mt-0.5">
                        {isUk ? loc.distUk : loc.distEn}
                      </div>
                      <div className="text-xs text-stone-400">
                        {isUk ? loc.addressUk : loc.addressEn}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex justify-end mt-5">
                  <button
                    disabled={!bookingLocation}
                    onClick={() => setBookingStep(1)}
                    className="px-5 py-2.5 rounded-xl font-semibold text-sm text-white disabled:opacity-40"
                    style={{ backgroundColor: "#3D2B1F" }}
                  >
                    {isUk ? "Далі" : "Next"}
                  </button>
                </div>
              </div>
            ) : bookingStep === 1 ? (
              <div>
                <h3 className="font-bold mb-4" style={{ color: "#3D2B1F" }}>
                  {isUk ? "Тип місця та дата" : "Workspace & date"}
                </h3>
                {/* Workspace picker */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {WORKSPACE_TYPES.filter((w) => w.available).map((w) => (
                    <button
                      key={w.key}
                      onClick={() => setBookingType(w.key)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all"
                      style={{
                        borderColor: bookingType === w.key ? "#6B9E78" : "#e7e0d8",
                        backgroundColor: bookingType === w.key ? "#6B9E7815" : "#faf9f7",
                        color: bookingType === w.key ? "#3D2B1F" : "#78716c",
                      }}
                    >
                      {w.icon} {isUk ? w.nameUk : w.nameEn}
                    </button>
                  ))}
                </div>
                {/* Calendar */}
                <div className="mb-4">
                  <div className="text-sm font-semibold mb-3 text-stone-600">
                    {calMonthName} {calYear}
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center mb-1">
                    {(isUk ? ["Пн","Вт","Ср","Чт","Пт","Сб","Нд"] : ["Mo","Tu","We","Th","Fr","Sa","Su"]).map((d) => (
                      <div key={d} className="text-xs text-stone-400 font-medium py-1">{d}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {calDays.map((day, i) => (
                      <button
                        key={i}
                        disabled={day === null || (day !== null && day < today.getDate())}
                        onClick={() => day && setBookingDay(day)}
                        className="aspect-square flex items-center justify-center rounded-lg text-xs font-medium transition-all"
                        style={{
                          backgroundColor:
                            day === null
                              ? "transparent"
                              : bookingDay === day
                              ? "#6B9E78"
                              : day < today.getDate()
                              ? "#f5f5f5"
                              : "#faf9f7",
                          color:
                            day === null
                              ? "transparent"
                              : bookingDay === day
                              ? "#fff"
                              : day < today.getDate()
                              ? "#d1ccc6"
                              : "#3D2B1F",
                          cursor: day === null || day < today.getDate() ? "default" : "pointer",
                        }}
                      >
                        {day ?? ""}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between mt-5">
                  <button
                    onClick={() => setBookingStep(0)}
                    className="border border-stone-200 px-5 py-2.5 rounded-xl text-sm text-stone-500 hover:border-stone-400 transition-colors"
                  >
                    {isUk ? "Назад" : "Back"}
                  </button>
                  <button
                    disabled={!bookingDay}
                    onClick={() => setBookingStep(2)}
                    className="px-5 py-2.5 rounded-xl font-semibold text-sm text-white disabled:opacity-40"
                    style={{ backgroundColor: "#3D2B1F" }}
                  >
                    {isUk ? "Далі" : "Next"}
                  </button>
                </div>
              </div>
            ) : bookingStep === 2 ? (
              <div>
                <h3 className="font-bold mb-4" style={{ color: "#3D2B1F" }}>
                  {isUk ? "Тривалість" : "Duration"}
                </h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {DURATIONS.map((d) => {
                    const price = Math.round(bookWorkspace.priceDay * d.multiplier);
                    return (
                      <button
                        key={d.key}
                        onClick={() => setBookingDuration(d.key)}
                        className="p-4 rounded-xl border-2 text-left transition-all"
                        style={{
                          borderColor: bookingDuration === d.key ? "#6B9E78" : "#e7e0d8",
                          backgroundColor: bookingDuration === d.key ? "#6B9E7810" : "#faf9f7",
                        }}
                      >
                        <div className="text-sm font-semibold mb-1" style={{ color: "#3D2B1F" }}>
                          {isUk ? d.labelUk : d.labelEn}
                        </div>
                        <div className="text-xs font-bold" style={{ color: "#6B9E78" }}>
                          {fmtPrice(price, isUk)}
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div
                  className="rounded-xl p-4 text-sm"
                  style={{ backgroundColor: "#6B9E7815", border: "1px solid #6B9E7830" }}
                >
                  <span className="text-stone-600">{isUk ? "Підсумок: " : "Summary: "}</span>
                  <span className="font-bold" style={{ color: "#3D2B1F" }}>
                    {isUk ? bookWorkspace.nameUk : bookWorkspace.nameEn}
                    {" · "}
                    {bookingDay} {calMonthName}
                    {" · "}
                    {fmtPrice(bookingPriceUah, isUk)}
                  </span>
                </div>
                <div className="flex justify-between mt-5">
                  <button
                    onClick={() => setBookingStep(1)}
                    className="border border-stone-200 px-5 py-2.5 rounded-xl text-sm text-stone-500 hover:border-stone-400 transition-colors"
                  >
                    {isUk ? "Назад" : "Back"}
                  </button>
                  <button
                    onClick={() => setBookingStep(3)}
                    className="px-5 py-2.5 rounded-xl font-semibold text-sm text-white"
                    style={{ backgroundColor: "#3D2B1F" }}
                  >
                    {isUk ? "Далі" : "Next"}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-bold mb-4" style={{ color: "#3D2B1F" }}>
                  {isUk ? "Ваші контакти" : "Your contact details"}
                </h3>
                <div className="space-y-3 mb-5">
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder={isUk ? "Повне ім'я" : "Full name"}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 focus:outline-none focus:border-stone-400 placeholder-stone-400"
                  />
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 focus:outline-none focus:border-stone-400 placeholder-stone-400"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={() => setBookingStep(2)}
                    className="border border-stone-200 px-5 py-2.5 rounded-xl text-sm text-stone-500 hover:border-stone-400 transition-colors"
                  >
                    {isUk ? "Назад" : "Back"}
                  </button>
                  <button
                    disabled={!contactName || !contactEmail}
                    onClick={() => setBookingDone(true)}
                    className="px-5 py-2.5 rounded-xl font-semibold text-sm text-white disabled:opacity-40"
                    style={{ backgroundColor: "#6B9E78" }}
                  >
                    {isUk ? "Отримати QR-код" : "Get QR code"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── MEMBERSHIP PLANS ────────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2" style={{ color: "#3D2B1F" }}>
            {isUk ? "Плани членства" : "Membership Plans"}
          </h2>
          <p className="text-stone-400 text-center mb-6 text-sm">
            {isUk ? "Від разового візиту до постійного офісу" : "From a single visit to a permanent office"}
          </p>
          {/* Annual toggle */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <span className={`text-sm ${!annualMembership ? "text-stone-800" : "text-stone-400"}`}>
              {isUk ? "Щомісяця" : "Monthly"}
            </span>
            <button
              onClick={() => setAnnualMembership(!annualMembership)}
              className="relative w-12 h-6 rounded-full transition-colors"
              style={{ backgroundColor: annualMembership ? "#6B9E78" : "#d6ccc4" }}
            >
              <span
                className="absolute top-1 w-4 h-4 bg-white rounded-full transition-all"
                style={{ left: annualMembership ? "28px" : "4px" }}
              />
            </button>
            <span className={`text-sm ${annualMembership ? "text-stone-800" : "text-stone-400"}`}>
              {isUk ? "Щороку" : "Annual"}
              <span className="ml-1 text-xs text-green-600">−15%</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MEMBERSHIP_PLANS.map((plan) => (
              <div
                key={plan.nameEn}
                className="relative rounded-2xl border-2 p-6 transition-all hover:shadow-md"
                style={{
                  borderColor: plan.popular ? "#6B9E78" : "#e7e0d8",
                  backgroundColor: plan.popular ? "#6B9E7808" : "#fff",
                }}
              >
                {plan.popular && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap"
                    style={{ backgroundColor: "#6B9E78" }}
                  >
                    {isUk ? "Найпопулярніший" : "Most Popular"}
                  </div>
                )}
                <div className="font-bold text-base mb-1" style={{ color: "#3D2B1F" }}>
                  {isUk ? plan.nameUk : plan.nameEn}
                </div>
                <div className="text-2xl font-extrabold mb-1" style={{ color: "#3D2B1F" }}>
                  {plan.fromPrefix && <span className="text-base font-normal text-stone-400">{isUk ? "від " : "from "}</span>}
                  {membershipPrice(plan.priceUah)}
                  <span className="text-sm font-normal text-stone-400">
                    {isUk ? plan.unitUk : plan.unitEn}
                  </span>
                </div>
                {annualMembership && (
                  <div className="text-xs text-green-600 mb-3">
                    {isUk ? "−15% при оплаті за рік" : "−15% with annual billing"}
                  </div>
                )}
                <button
                  className="w-full py-2 rounded-xl text-sm font-semibold mt-3 transition-opacity hover:opacity-80"
                  style={{
                    backgroundColor: plan.popular ? "#6B9E78" : "#3D2B1F",
                    color: "#fff",
                  }}
                >
                  {isUk ? "Обрати" : "Choose"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AMENITIES ───────────────────────────────────────────────────────── */}
      <section className="py-16 px-6" style={{ backgroundColor: "#FAF7F0" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2" style={{ color: "#3D2B1F" }}>
            {isUk ? "Що включено" : "What's Included"}
          </h2>
          <p className="text-stone-400 text-center mb-10 text-sm">
            {isUk ? "Все для комфортної роботи" : "Everything you need to do great work"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {AMENITIES.map((a) => (
              <div
                key={a.titleEn}
                className="flex items-start gap-4 p-5 rounded-2xl border"
                style={{ backgroundColor: "#fff", borderColor: "#e7e0d8" }}
              >
                <span className="text-2xl flex-shrink-0">{a.icon}</span>
                <div>
                  <div className="font-semibold text-sm mb-0.5" style={{ color: "#3D2B1F" }}>
                    {isUk ? a.titleUk : a.titleEn}
                  </div>
                  <div className="text-xs text-stone-400">
                    {isUk ? a.descUk : a.descEn}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── B2B SECTION ─────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2" style={{ color: "#3D2B1F" }}>
            {isUk ? "Для команд і компаній" : "For Teams & Companies"}
          </h2>
          <p className="text-stone-400 text-center mb-10 text-sm">
            {isUk ? "Гнучкі корпоративні умови без прив'язок" : "Flexible corporate packages with no long-term lock-in"}
          </p>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Case study card */}
            <div
              className="rounded-2xl p-6"
              style={{ backgroundColor: "#FAF7F0", border: "1px solid #e7e0d8" }}
            >
              <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#6B9E78" }}>
                {isUk ? "Кейс" : "Case Study"}
              </div>
              <blockquote className="text-lg font-bold leading-snug mb-4" style={{ color: "#3D2B1F" }}>
                &ldquo;{isUk
                  ? "Команда з 8 осіб заощадила 40% порівняно з оремим офісом"
                  : "A team of 8 saved 40% vs renting a dedicated office"}&rdquo;
              </blockquote>
              <p className="text-stone-500 text-sm mb-4">
                {isUk
                  ? "IT-стартап Vectra перейшов до UrbanDesk і знизив витрати на офіс із 28 000 до 16 800 ₴ на місяць, зберігши всі зручності."
                  : "Tech startup Vectra switched to UrbanDesk and cut their office costs from £1,400 to £840/mo while retaining all amenities."}
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                  style={{ backgroundColor: "#6B9E7820" }}
                >
                  👤
                </div>
                <div>
                  <div className="text-sm font-semibold" style={{ color: "#3D2B1F" }}>
                    {isUk ? "Олексій Мороз" : "Alex Morris"}
                  </div>
                  <div className="text-xs text-stone-400">CTO, Vectra</div>
                </div>
              </div>
            </div>

            {/* B2B contact form */}
            <div>
              {b2bSubmitted ? (
                <div
                  className="rounded-2xl p-8 text-center"
                  style={{ backgroundColor: "#6B9E7815", border: "1px solid #6B9E7840" }}
                >
                  <div className="text-4xl mb-3">🤝</div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: "#3D2B1F" }}>
                    {isUk ? "Дякуємо!" : "Thanks!"}
                  </h3>
                  <p className="text-stone-500 text-sm">
                    {isUk
                      ? "Ми зв'яжемось з вами протягом 24 годин"
                      : "We'll reach out within 24 hours"}
                  </p>
                </div>
              ) : (
                <div
                  className="rounded-2xl p-6"
                  style={{ border: "1px solid #e7e0d8" }}
                >
                  <h3 className="font-bold mb-4 text-base" style={{ color: "#3D2B1F" }}>
                    {isUk ? "Корпоративний запит" : "Corporate enquiry"}
                  </h3>
                  <div className="space-y-3 mb-4">
                    <input
                      type="text"
                      value={b2bName}
                      onChange={(e) => setB2bName(e.target.value)}
                      placeholder={isUk ? "Ваше ім'я та компанія" : "Your name & company"}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 focus:outline-none focus:border-stone-400 placeholder-stone-400"
                    />
                    <input
                      type="email"
                      value={b2bEmail}
                      onChange={(e) => setB2bEmail(e.target.value)}
                      placeholder="Email"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 focus:outline-none focus:border-stone-400 placeholder-stone-400"
                    />
                    <select
                      value={b2bTeamSize}
                      onChange={(e) => setB2bTeamSize(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-700 focus:outline-none"
                    >
                      <option value="">{isUk ? "Розмір команди" : "Team size"}</option>
                      <option value="1-3">1–3</option>
                      <option value="4-8">4–8</option>
                      <option value="9-15">9–15</option>
                      <option value="15+">15+</option>
                    </select>
                  </div>
                  <button
                    disabled={!b2bName || !b2bEmail || !b2bTeamSize}
                    onClick={() => setB2bSubmitted(true)}
                    className="w-full py-3 rounded-xl font-semibold text-sm text-white disabled:opacity-40 transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "#3D2B1F" }}
                  >
                    {isUk ? "Надіслати запит" : "Send enquiry"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer
        className="py-10 px-6 border-t"
        style={{ backgroundColor: "#FAF7F0", borderColor: "#e7e0d8" }}
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="font-extrabold text-lg mb-1" style={{ color: "#3D2B1F" }}>
              UrbanDesk
            </div>
            <div className="text-stone-400 text-sm mb-0.5">{address}</div>
            <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-sm hover:underline" style={{ color: "#6B9E78" }}>
              {phone}
            </a>
          </div>

          {/* Location chips */}
          <div className="flex flex-wrap gap-2">
            {LOCATIONS.map((loc) => (
              <span
                key={loc.key}
                className="text-xs px-3 py-1.5 rounded-full font-medium"
                style={{ backgroundColor: "#6B9E7815", color: "#4a7a57", border: "1px solid #6B9E7830" }}
              >
                📍 {isUk ? loc.nameUk : loc.nameEn}
              </span>
            ))}
          </div>

          <div className="text-stone-400 text-xs">
            © 2025 UrbanDesk
          </div>
        </div>
      </footer>
    </div>
  );
}
