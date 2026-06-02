"use client";

import { useState } from "react";

const NAV_LINKS = [
  { en: "Services", uk: "Послуги" },
  { en: "Gallery", uk: "Галерея" },
  { en: "Subscription", uk: "Підписка" },
  { en: "Reviews", uk: "Відгуки" },
  { en: "Book", uk: "Запис" },
];

const BEFORE_AFTER = [
  { nameEn: "Facial Peel", nameUk: "Пілінг обличчя", duration: "60 min" },
  { nameEn: "Lash Lamination", nameUk: "Ламінування вій", duration: "90 min" },
  { nameEn: "Facial Massage", nameUk: "Масаж обличчя", duration: "45 min" },
  { nameEn: "Hardware Cleanse", nameUk: "Апаратне чищення", duration: "60 min" },
  { nameEn: "Henna Brows", nameUk: "Брови хна", duration: "30 min" },
  { nameEn: "Waxing", nameUk: "Депіляція", duration: "30 min" },
];

const SERVICE_TABS = [
  { id: "face", en: "Face", uk: "Обличчя" },
  { id: "body", en: "Body", uk: "Тіло" },
  { id: "lashes", en: "Lashes & Brows", uk: "Вії та Брови" },
  { id: "waxing", en: "Waxing", uk: "Депіляція" },
];

const SERVICES: Record<string, { nameEn: string; nameUk: string; duration: string; price: string }[]> = {
  face: [
    { nameEn: "Facial Peel", nameUk: "Пілінг", duration: "60 min", price: "890 ₴" },
    { nameEn: "Facial Massage", nameUk: "Масаж обличчя", duration: "45 min", price: "750 ₴" },
    { nameEn: "Deep Cleanse", nameUk: "Чищення", duration: "75 min", price: "1 200 ₴" },
    { nameEn: "RF Lifting", nameUk: "RF-ліфтинг", duration: "60 min", price: "1 400 ₴" },
  ],
  body: [
    { nameEn: "Body Wrap", nameUk: "Обгортання", duration: "90 min", price: "1 100 ₴" },
    { nameEn: "Anti-cellulite Massage", nameUk: "Антицелюлітний масаж", duration: "60 min", price: "950 ₴" },
  ],
  lashes: [
    { nameEn: "Lash Lamination", nameUk: "Ламінування вій", duration: "90 min", price: "890 ₴" },
    { nameEn: "Lash Extensions", nameUk: "Нарощування вій", duration: "120 min", price: "1 200 ₴" },
    { nameEn: "Henna Brows", nameUk: "Хна-брови", duration: "30 min", price: "450 ₴" },
  ],
  waxing: [
    { nameEn: "Legs", nameUk: "Ноги", duration: "45 min", price: "600 ₴" },
    { nameEn: "Bikini Zone", nameUk: "Зона бікіні", duration: "30 min", price: "500 ₴" },
    { nameEn: "Arms", nameUk: "Руки", duration: "30 min", price: "350 ₴" },
  ],
};

const PLANS = [
  {
    nameEn: "Basic",
    nameUk: "Basic",
    price: "1 200 ₴",
    periodEn: "/mo",
    periodUk: "/міс",
    perksEn: ["2 procedures of choice", "-10% on cosmetics"],
    perksUk: ["2 процедури на вибір", "-10% на косметику"],
    highlight: false,
  },
  {
    nameEn: "Glow",
    nameUk: "Glow",
    price: "2 200 ₴",
    periodEn: "/mo",
    periodUk: "/міс",
    perksEn: ["4 procedures of choice", "-20% on cosmetics", "Priority booking"],
    perksUk: ["4 процедури на вибір", "-20% на косметику", "Пріоритетний запис"],
    highlight: true,
  },
  {
    nameEn: "VIP",
    nameUk: "VIP",
    price: "3 500 ₴",
    periodEn: "/mo",
    periodUk: "/міс",
    perksEn: ["Unlimited basic procedures", "-30% on everything", "At-home master 1x/month"],
    perksUk: ["Необмежено базових процедур", "-30% на все", "Виїзний майстер 1x/міс"],
    highlight: false,
  },
];

const MASTERS = [
  {
    emoji: "🌸",
    nameEn: "Alina Kovalenko",
    nameUk: "Аліна Коваленко",
    specEn: "Skin Care & Peeling",
    specUk: "Догляд за шкірою та пілінг",
    expEn: "7 years experience",
    expUk: "7 років досвіду",
  },
  {
    emoji: "✨",
    nameEn: "Maria Bondar",
    nameUk: "Марія Бондар",
    specEn: "Lash & Brow Artist",
    specUk: "Майстер вій та брів",
    expEn: "5 years experience",
    expUk: "5 років досвіду",
  },
  {
    emoji: "🌷",
    nameEn: "Darya Lysenko",
    nameUk: "Дар'я Лисенко",
    specEn: "Body Treatments & Waxing",
    specUk: "Процедури для тіла та депіляція",
    expEn: "6 years experience",
    expUk: "6 років досвіду",
  },
];

export function GlowBarDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [activeTab, setActiveTab] = useState("face");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    master: "",
    date: "",
    time: "",
  });

  const handleField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const inputCls =
    "w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-700 bg-white focus:outline-none focus:ring-2 focus:ring-rose-300 placeholder:text-stone-400";

  return (
    <div className="min-h-screen bg-white font-sans text-stone-700">

      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-rose-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          <span className="text-xl font-bold tracking-tight text-rose-500">
            GlowBar ✨
          </span>
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <button
                key={l.en}
                className="text-sm text-stone-600 hover:text-rose-500 transition-colors"
              >
                {isUk ? l.uk : l.en}
              </button>
            ))}
          </div>
          <button className="bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors">
            {isUk ? "Записатись" : "Book Now"}
          </button>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-white via-pink-50 to-rose-50 pt-20 pb-28 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block bg-rose-100 text-rose-600 text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
              {isUk ? "Студія Краси Kyiv" : "Beauty Studio Kyiv"}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-stone-800 mb-5">
              {isUk ? "Твоя Краса — Наш Пріоритет" : "Your Beauty — Our Priority"}
            </h1>
            <p className="text-stone-500 text-lg mb-8 max-w-md mx-auto md:mx-0">
              {isUk
                ? "Професійний догляд за шкірою, ввіями та тілом у серці Kyiv. Відчуй себе неповторною."
                : "Professional skin, lash and body care in the heart of Kyiv. Feel uniquely beautiful."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <button className="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-7 py-3 rounded-full transition-colors text-sm">
                {isUk ? "Записатись зараз" : "Book Now"}
              </button>
              <button className="border-2 border-rose-400 text-rose-500 hover:bg-rose-50 font-semibold px-7 py-3 rounded-full transition-colors text-sm">
                {isUk ? "Glow Pass" : "Glow Pass"}
              </button>
            </div>
          </div>
          <div className="flex-shrink-0 flex items-center justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-rose-200 via-pink-300 to-rose-400 flex items-center justify-center shadow-2xl shadow-rose-200">
              <span className="text-8xl">✨</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Before / After Gallery ─────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-800 mb-3">
              {isUk ? "Результати" : "Results"}
            </h2>
            <p className="text-stone-500 max-w-md mx-auto">
              {isUk
                ? "Реальні трансформації наших клієнток після процедур у GlowBar."
                : "Real transformations of our clients after GlowBar procedures."}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {BEFORE_AFTER.map((item) => (
              <div
                key={item.nameEn}
                className="rounded-2xl overflow-hidden border border-rose-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex h-36">
                  <div className="flex-1 bg-gradient-to-br from-stone-100 to-stone-200 flex flex-col items-center justify-center gap-1">
                    <span className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                      {isUk ? "До" : "Before"}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-stone-300" />
                  </div>
                  <div className="w-px bg-rose-200" />
                  <div className="flex-1 bg-gradient-to-br from-rose-50 to-pink-100 flex flex-col items-center justify-center gap-1">
                    <span className="text-xs font-semibold text-rose-500 uppercase tracking-wide">
                      {isUk ? "Після" : "After"}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-rose-300" />
                  </div>
                </div>
                <div className="bg-white px-3 py-2.5 flex items-center justify-between">
                  <span className="text-sm font-semibold text-stone-700">
                    {isUk ? item.nameUk : item.nameEn}
                  </span>
                  <span className="bg-rose-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {item.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services Menu ──────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-pink-50/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-stone-800 mb-3">
              {isUk ? "Послуги" : "Services"}
            </h2>
            <p className="text-stone-500">
              {isUk
                ? "Обирайте процедуру та записуйтесь онлайн за кілька секунд."
                : "Choose a procedure and book online in seconds."}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {SERVICE_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                  activeTab === tab.id
                    ? "bg-rose-500 text-white shadow-md shadow-rose-200"
                    : "bg-white text-stone-600 border border-stone-200 hover:border-rose-300 hover:text-rose-500"
                }`}
              >
                {isUk ? tab.uk : tab.en}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-rose-100 shadow-sm overflow-hidden">
            {SERVICES[activeTab].map((svc, i) => (
              <div
                key={svc.nameEn}
                className={`flex items-center justify-between px-6 py-4 ${
                  i !== 0 ? "border-t border-stone-100" : ""
                }`}
              >
                <div className="flex-1">
                  <p className="font-semibold text-stone-800 text-sm">
                    {isUk ? svc.nameUk : svc.nameEn}
                  </p>
                  <p className="text-xs text-stone-400 mt-0.5">{svc.duration}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-rose-500">{svc.price}</span>
                  <button className="bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold px-4 py-1.5 rounded-full border border-rose-200 transition-colors">
                    {isUk ? "Записатись" : "Book"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Glow Pass Subscription ─────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-rose-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-800 mb-3">
              {isUk
                ? "Glow Pass — Підписка на Красу"
                : "Glow Pass — Beauty Subscription"}
            </h2>
            <p className="text-stone-500 max-w-lg mx-auto">
              {isUk
                ? "Необмежена краса щомісяця. Обирай план, що підходить саме тобі."
                : "Unlimited beauty every month. Choose the plan that fits you best."}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <div
                key={plan.nameEn}
                className={`rounded-2xl p-7 flex flex-col gap-5 transition-shadow ${
                  plan.highlight
                    ? "bg-rose-500 text-white shadow-xl shadow-rose-200 scale-105"
                    : "bg-white border border-rose-100 shadow-sm hover:shadow-md"
                }`}
              >
                <div>
                  <p
                    className={`text-xs font-bold uppercase tracking-widest mb-1 ${
                      plan.highlight ? "text-rose-100" : "text-rose-400"
                    }`}
                  >
                    {isUk ? plan.nameUk : plan.nameEn}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`text-3xl font-extrabold ${
                        plan.highlight ? "text-white" : "text-stone-800"
                      }`}
                    >
                      {plan.price}
                    </span>
                    <span
                      className={`text-sm ${
                        plan.highlight ? "text-rose-100" : "text-stone-400"
                      }`}
                    >
                      {isUk ? plan.periodUk : plan.periodEn}
                    </span>
                  </div>
                </div>
                <ul className="flex flex-col gap-2 flex-1">
                  {(isUk ? plan.perksUk : plan.perksEn).map((perk) => (
                    <li key={perk} className="flex items-start gap-2 text-sm">
                      <span
                        className={`mt-0.5 ${
                          plan.highlight ? "text-rose-100" : "text-rose-400"
                        }`}
                      >
                        ✓
                      </span>
                      <span
                        className={
                          plan.highlight ? "text-rose-50" : "text-stone-600"
                        }
                      >
                        {perk}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-2.5 rounded-full text-sm font-bold transition-colors ${
                    plan.highlight
                      ? "bg-white text-rose-500 hover:bg-rose-50"
                      : "bg-rose-500 text-white hover:bg-rose-600"
                  }`}
                >
                  {isUk ? "Підписатись" : "Subscribe"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Masters ────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-800 mb-3">
              {isUk ? "Наші Майстри" : "Our Masters"}
            </h2>
            <p className="text-stone-500">
              {isUk
                ? "Досвідчені фахівці, закохані в свою справу."
                : "Experienced specialists passionate about their craft."}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MASTERS.map((master) => (
              <div
                key={master.nameEn}
                className="bg-pink-50/60 rounded-2xl p-7 flex flex-col items-center text-center gap-4 border border-rose-100 hover:shadow-md transition-shadow"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-100 to-pink-200 flex items-center justify-center text-4xl shadow-sm">
                  {master.emoji}
                </div>
                <div>
                  <p className="font-bold text-stone-800 text-lg">
                    {isUk ? master.nameUk : master.nameEn}
                  </p>
                  <p className="text-rose-500 text-sm font-semibold mt-0.5">
                    {isUk ? master.specUk : master.specEn}
                  </p>
                  <p className="text-stone-400 text-xs mt-1">
                    {isUk ? master.expUk : master.expEn}
                  </p>
                </div>
                <button className="border border-rose-300 text-rose-500 hover:bg-rose-50 text-xs font-semibold px-5 py-1.5 rounded-full transition-colors">
                  {isUk ? "Записатись до майстра" : "Book this master"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Booking Form ───────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-gradient-to-br from-pink-50 to-rose-50">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-stone-800 mb-3">
              {isUk ? "Онлайн Запис" : "Online Booking"}
            </h2>
            <p className="text-stone-500">
              {isUk
                ? "Заповніть форму і ми зв'яжемося з вами для підтвердження."
                : "Fill in the form and we will contact you to confirm."}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-8 flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                  {isUk ? "Ім'я" : "Name"}
                </label>
                <input
                  className={inputCls}
                  type="text"
                  value={form.name}
                  placeholder={isUk ? "Ваше ім'я" : "Your name"}
                  onChange={(e) => handleField("name", e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                  {isUk ? "Телефон" : "Phone"}
                </label>
                <input
                  className={inputCls}
                  type="tel"
                  value={form.phone}
                  placeholder="+380 XX XXX XX XX"
                  onChange={(e) => handleField("phone", e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                {isUk ? "Послуга" : "Service"}
              </label>
              <select
                className={inputCls}
                value={form.service}
                onChange={(e) => handleField("service", e.target.value)}
              >
                <option value="">{isUk ? "Оберіть послугу" : "Select service"}</option>
                {Object.values(SERVICES).flat().map((s) => (
                  <option key={s.nameEn} value={s.nameEn}>
                    {isUk ? s.nameUk : s.nameEn}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                {isUk ? "Майстер" : "Master"}
              </label>
              <select
                className={inputCls}
                value={form.master}
                onChange={(e) => handleField("master", e.target.value)}
              >
                <option value="">{isUk ? "Оберіть майстра" : "Select master"}</option>
                {MASTERS.map((m) => (
                  <option key={m.nameEn} value={m.nameEn}>
                    {isUk ? m.nameUk : m.nameEn}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                  {isUk ? "Бажана дата" : "Preferred date"}
                </label>
                <input
                  className={inputCls}
                  type="date"
                  value={form.date}
                  onChange={(e) => handleField("date", e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                  {isUk ? "Бажаний час" : "Preferred time"}
                </label>
                <select
                  className={inputCls}
                  value={form.time}
                  onChange={(e) => handleField("time", e.target.value)}
                >
                  <option value="">{isUk ? "Оберіть час" : "Select time"}</option>
                  {["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"].map(
                    (t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
            <button className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 rounded-full transition-colors text-sm mt-1">
              {isUk ? "Записатись" : "Book Appointment"}
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="bg-stone-800 text-stone-300 py-14 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <span className="text-xl font-bold text-white">GlowBar ✨</span>
            <p className="mt-3 text-sm leading-relaxed">
              {isUk
                ? "Студія Краси та Догляду у серці Kyiv. Де ти відчуваєш себе неповторною."
                : "Beauty & Care Studio in the heart of Kyiv. Where you feel uniquely yourself."}
            </p>
          </div>
          <div>
            <p className="text-sm font-bold text-white uppercase tracking-wide mb-3">
              {isUk ? "Контакти" : "Contact"}
            </p>
            <ul className="flex flex-col gap-2 text-sm">
              <li>📍 {isUk ? "вул. Хрещатик, 12, Kyiv" : "12 Khreshchatyk St, Kyiv"}</li>
              <li>📞 +38 (050) 123-45-67</li>
              <li>
                <a
                  href="#"
                  className="text-rose-300 hover:text-rose-200 transition-colors"
                >
                  📸 @glowbar.kyiv
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-bold text-white uppercase tracking-wide mb-3">
              {isUk ? "Графік роботи" : "Working Hours"}
            </p>
            <ul className="flex flex-col gap-1.5 text-sm">
              <li className="flex justify-between gap-4">
                <span>{isUk ? "Пн – Сб" : "Mon – Sat"}</span>
                <span className="text-white font-semibold">9:00 – 20:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>{isUk ? "Нд" : "Sun"}</span>
                <span className="text-white font-semibold">10:00 – 18:00</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-5xl mx-auto border-t border-stone-700 mt-10 pt-6 text-center text-xs text-stone-500">
          © 2026 GlowBar.{" "}
          {isUk ? "Всі права захищені." : "All rights reserved."}
        </div>
      </footer>
    </div>
  );
}
