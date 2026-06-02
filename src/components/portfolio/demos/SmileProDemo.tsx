"use client";

import { useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const SERVICES = [
  { id: "cleaning", emoji: "🪥", nameEn: "Professional Cleaning", nameUk: "Професійне чищення", descEn: "Deep ultrasonic cleaning and polishing for healthy gums", descUk: "Глибоке ультразвукове чищення та полірування для здорових ясен", priceEn: "800–1 500 ₴", priceUk: "800–1 500 ₴" },
  { id: "whitening", emoji: "✨", nameEn: "Teeth Whitening", nameUk: "Відбілювання зубів", descEn: "Zoom & laser whitening up to 8 shades brighter", descUk: "Zoom та лазерне відбілювання до 8 тонів яскравіше", priceEn: "2 500–4 000 ₴", priceUk: "2 500–4 000 ₴" },
  { id: "implants", emoji: "🔩", nameEn: "Dental Implants", nameUk: "Імплантація зубів", descEn: "Premium Straumann & Nobel Biocare titanium implants", descUk: "Преміум імпланти Straumann та Nobel Biocare з титану", priceEn: "18 000–28 000 ₴", priceUk: "18 000–28 000 ₴" },
  { id: "braces", emoji: "😁", nameEn: "Braces & Orthodontics", nameUk: "Брекети та ортодонтія", descEn: "Metal, ceramic braces and Invisalign clear aligners", descUk: "Металеві, керамічні брекети та прозорі елайнери Invisalign", priceEn: "4 500–40 000 ₴", priceUk: "4 500–40 000 ₴" },
  { id: "veneers", emoji: "💎", nameEn: "Veneers", nameUk: "Вініри", descEn: "Ultra-thin porcelain shells for a flawless smile", descUk: "Ультратонкі порцеланові накладки для бездоганної усмішки", priceEn: "3 500–7 000 ₴", priceUk: "3 500–7 000 ₴" },
  { id: "rootcanal", emoji: "🩺", nameEn: "Root Canal Therapy", nameUk: "Лікування кореневих каналів", descEn: "Microscope-assisted endodontic treatment", descUk: "Ендодонтичне лікування з мікроскопом", priceEn: "2 400–5 500 ₴", priceUk: "2 400–5 500 ₴" },
  { id: "crowns", emoji: "👑", nameEn: "Dental Crowns", nameUk: "Зубні коронки", descEn: "Zirconia and metal-ceramic crowns, same-day CEREC", descUk: "Цирконієві та металокерамічні коронки, CEREC за один день", priceEn: "3 800–8 000 ₴", priceUk: "3 800–8 000 ₴" },
  { id: "pediatric", emoji: "🧒", nameEn: "Pediatric Dentistry", nameUk: "Дитяча стоматологія", descEn: "Gentle care for kids in a fun, friendly environment", descUk: "Дбайливе лікування дітей у веселій та дружній атмосфері", priceEn: "500–2 000 ₴", priceUk: "500–2 000 ₴" },
];

const ISSUES = [
  { id: "yellowing", labelEn: "Yellowing / Stains", labelUk: "Жовтизна / Плями" },
  { id: "crooked", labelEn: "Crooked Teeth", labelUk: "Нерівні зуби" },
  { id: "gaps", labelEn: "Gaps Between Teeth", labelUk: "Щілини між зубами" },
  { id: "missing", labelEn: "Missing Teeth", labelUk: "Відсутні зуби" },
  { id: "stained", labelEn: "Deep Staining", labelUk: "Глибоке забарвлення" },
];

const DESIRED_RESULTS = [
  { id: "hollywood", labelEn: "Hollywood Smile", labelUk: "Голлівудська усмішка" },
  { id: "natural", labelEn: "Natural White", labelUk: "Натурально білі" },
  { id: "alignment", labelEn: "Alignment Fix", labelUk: "Виправлення прикусу" },
];

type SimResult = { procedures: { nameEn: string; nameUk: string }[]; timelineEn: string; timelineUk: string; costEn: string; costUk: string };

const SIM_RESULTS: Record<string, Record<string, SimResult>> = {
  yellowing: {
    hollywood: { procedures: [{ nameEn: "Professional Cleaning", nameUk: "Професійне чищення" }, { nameEn: "Laser Whitening", nameUk: "Лазерне відбілювання" }, { nameEn: "Porcelain Veneers (10 pcs)", nameUk: "Порцеланові вініри (10 шт)" }], timelineEn: "3–4 weeks", timelineUk: "3–4 тижні", costEn: "38 000–72 000 ₴", costUk: "38 000–72 000 ₴" },
    natural: { procedures: [{ nameEn: "Professional Cleaning", nameUk: "Професійне чищення" }, { nameEn: "Zoom Whitening", nameUk: "Zoom відбілювання" }], timelineEn: "1–2 visits", timelineUk: "1–2 візити", costEn: "3 300–5 500 ₴", costUk: "3 300–5 500 ₴" },
    alignment: { procedures: [{ nameEn: "Professional Cleaning", nameUk: "Професійне чищення" }, { nameEn: "Whitening", nameUk: "Відбілювання" }], timelineEn: "1–2 visits", timelineUk: "1–2 візити", costEn: "3 300–5 500 ₴", costUk: "3 300–5 500 ₴" },
  },
  crooked: {
    hollywood: { procedures: [{ nameEn: "Invisalign Full Course", nameUk: "Invisalign повний курс" }, { nameEn: "Whitening", nameUk: "Відбілювання" }, { nameEn: "Porcelain Veneers (6 pcs)", nameUk: "Порцеланові вініри (6 шт)" }], timelineEn: "12–18 months", timelineUk: "12–18 місяців", costEn: "58 000–85 000 ₴", costUk: "58 000–85 000 ₴" },
    natural: { procedures: [{ nameEn: "Ceramic Braces", nameUk: "Керамічні брекети" }, { nameEn: "Retainer", nameUk: "Ретейнер" }], timelineEn: "10–16 months", timelineUk: "10–16 місяців", costEn: "8 700–12 000 ₴", costUk: "8 700–12 000 ₴" },
    alignment: { procedures: [{ nameEn: "Orthodontic Consultation", nameUk: "Консультація ортодонта" }, { nameEn: "Metal Braces", nameUk: "Металеві брекети" }, { nameEn: "Retainer", nameUk: "Ретейнер" }], timelineEn: "8–14 months", timelineUk: "8–14 місяців", costEn: "5 700–9 000 ₴", costUk: "5 700–9 000 ₴" },
  },
  gaps: {
    hollywood: { procedures: [{ nameEn: "Porcelain Veneers (8 pcs)", nameUk: "Порцеланові вініри (8 шт)" }, { nameEn: "Whitening", nameUk: "Відбілювання" }], timelineEn: "2–3 weeks", timelineUk: "2–3 тижні", costEn: "30 500–58 000 ₴", costUk: "30 500–58 000 ₴" },
    natural: { procedures: [{ nameEn: "Composite Bonding", nameUk: "Композитна реставрація" }], timelineEn: "1–2 visits", timelineUk: "1–2 візити", costEn: "2 000–5 000 ₴", costUk: "2 000–5 000 ₴" },
    alignment: { procedures: [{ nameEn: "Invisalign Lite", nameUk: "Invisalign Lite" }, { nameEn: "Retainer", nameUk: "Ретейнер" }], timelineEn: "4–8 months", timelineUk: "4–8 місяців", costEn: "18 000–25 000 ₴", costUk: "18 000–25 000 ₴" },
  },
  missing: {
    hollywood: { procedures: [{ nameEn: "Dental Implants", nameUk: "Імпланти" }, { nameEn: "Zirconia Crowns", nameUk: "Цирконієві коронки" }, { nameEn: "Whitening", nameUk: "Відбілювання" }, { nameEn: "Veneers", nameUk: "Вініри" }], timelineEn: "4–6 months", timelineUk: "4–6 місяців", costEn: "65 000–120 000 ₴", costUk: "65 000–120 000 ₴" },
    natural: { procedures: [{ nameEn: "Dental Implant", nameUk: "Імплант" }, { nameEn: "Metal-Ceramic Crown", nameUk: "Металокерамічна коронка" }], timelineEn: "3–5 months", timelineUk: "3–5 місяців", costEn: "21 800–33 000 ₴", costUk: "21 800–33 000 ₴" },
    alignment: { procedures: [{ nameEn: "Dental Bridge", nameUk: "Мостоподібний протез" }], timelineEn: "1–2 weeks", timelineUk: "1–2 тижні", costEn: "9 000–15 000 ₴", costUk: "9 000–15 000 ₴" },
  },
  stained: {
    hollywood: { procedures: [{ nameEn: "Deep Cleaning", nameUk: "Глибоке чищення" }, { nameEn: "Internal Bleaching", nameUk: "Внутрішнє відбілювання" }, { nameEn: "Porcelain Veneers (10 pcs)", nameUk: "Порцеланові вініри (10 шт)" }], timelineEn: "3–5 weeks", timelineUk: "3–5 тижнів", costEn: "37 000–73 000 ₴", costUk: "37 000–73 000 ₴" },
    natural: { procedures: [{ nameEn: "Deep Cleaning", nameUk: "Глибоке чищення" }, { nameEn: "Laser Whitening (2 sessions)", nameUk: "Лазерне відбілювання (2 сеанси)" }], timelineEn: "2–3 visits", timelineUk: "2–3 візити", costEn: "5 500–9 000 ₴", costUk: "5 500–9 000 ₴" },
    alignment: { procedures: [{ nameEn: "Deep Cleaning", nameUk: "Глибоке чищення" }, { nameEn: "Whitening", nameUk: "Відбілювання" }], timelineEn: "1–2 visits", timelineUk: "1–2 візити", costEn: "3 300–5 500 ₴", costUk: "3 300–5 500 ₴" },
  },
};

const DOCTORS = [
  { id: 1, emoji: "👨‍⚕️", nameEn: "Dr. Oleksandr Moroz", nameUk: "Лікар Олександр Мороз", specEn: "Implantologist & Oral Surgeon", specUk: "Імплантолог та хірург", years: 14 },
  { id: 2, emoji: "👩‍⚕️", nameEn: "Dr. Yuliia Shevchenko", nameUk: "Лікар Юлія Шевченко", specEn: "Orthodontist · Invisalign Diamond", specUk: "Ортодонт · Invisalign Diamond", years: 11 },
  { id: 3, emoji: "👨‍⚕️", nameEn: "Dr. Andrii Kravets", nameUk: "Лікар Андрій Кравець", specEn: "Cosmetic Dentist & Veneer Specialist", specUk: "Естетичний стоматолог та спеціаліст з вінірів", years: 9 },
  { id: 4, emoji: "👩‍⚕️", nameEn: "Dr. Oksana Bondar", nameUk: "Лікар Оксана Бондар", specEn: "Pediatric Dentist", specUk: "Дитячий стоматолог", years: 7 },
];

const BEFORE_AFTER = [
  { id: 1, procedureEn: "Teeth Whitening", procedureUk: "Відбілювання зубів", durationEn: "1 visit, 90 min", durationUk: "1 візит, 90 хв" },
  { id: 2, procedureEn: "Porcelain Veneers", procedureUk: "Порцеланові вініри", durationEn: "2 weeks", durationUk: "2 тижні" },
  { id: 3, procedureEn: "Invisalign Alignment", procedureUk: "Виправлення Invisalign", durationEn: "10 months", durationUk: "10 місяців" },
  { id: 4, procedureEn: "Dental Implant + Crown", procedureUk: "Імплант + коронка", durationEn: "4 months", durationUk: "4 місяці" },
];

const PRICE_TABS = [
  {
    id: "therapy", labelEn: "Therapy", labelUk: "Терапія",
    rows: [
      { nameEn: "Initial Consultation", nameUk: "Первинна консультація", price: "0 ₴ (FREE)" },
      { nameEn: "Dental X-Ray", nameUk: "Рентген зуба", price: "200 ₴" },
      { nameEn: "Filling (light-cured)", nameUk: "Пломба (світлова)", price: "800–1 500 ₴" },
      { nameEn: "Root Canal Treatment", nameUk: "Лікування каналів", price: "2 400–5 500 ₴" },
      { nameEn: "Professional Cleaning", nameUk: "Професійне чищення", price: "800–1 500 ₴" },
    ],
  },
  {
    id: "surgery", labelEn: "Surgery", labelUk: "Хірургія",
    rows: [
      { nameEn: "Simple Extraction", nameUk: "Просте видалення", price: "800–1 200 ₴" },
      { nameEn: "Complex Extraction", nameUk: "Складне видалення", price: "1 800–3 000 ₴" },
      { nameEn: "Wisdom Tooth Removal", nameUk: "Видалення зуба мудрості", price: "2 500–4 500 ₴" },
      { nameEn: "Implant (Straumann)", nameUk: "Імплант (Straumann)", price: "від 22 000 ₴" },
      { nameEn: "Implant (Nobel Biocare)", nameUk: "Імплант (Nobel Biocare)", price: "від 18 000 ₴" },
      { nameEn: "Bone Grafting", nameUk: "Кісткова пластика", price: "від 6 000 ₴" },
    ],
  },
  {
    id: "ortho", labelEn: "Orthodontics", labelUk: "Ортодонтія",
    rows: [
      { nameEn: "Orthodontist Consultation", nameUk: "Консультація ортодонта", price: "0 ₴ (FREE)" },
      { nameEn: "Metal Braces", nameUk: "Металеві брекети", price: "від 4 500 ₴" },
      { nameEn: "Ceramic Braces", nameUk: "Керамічні брекети", price: "від 7 500 ₴" },
      { nameEn: "Invisalign (full)", nameUk: "Invisalign (повний)", price: "від 35 000 ₴" },
      { nameEn: "Retainer", nameUk: "Ретейнер", price: "від 1 200 ₴" },
    ],
  },
  {
    id: "cosmetic", labelEn: "Cosmetic", labelUk: "Косметична",
    rows: [
      { nameEn: "Zoom Whitening", nameUk: "Zoom відбілювання", price: "від 2 800 ₴" },
      { nameEn: "Laser Whitening", nameUk: "Лазерне відбілювання", price: "від 3 500 ₴" },
      { nameEn: "Porcelain Veneer (1 pc)", nameUk: "Порцелановий вінір (1 шт)", price: "3 500–7 000 ₴" },
      { nameEn: "Zirconia Crown", nameUk: "Цирконієва коронка", price: "від 6 500 ₴" },
      { nameEn: "Metal-Ceramic Crown", nameUk: "Металокерамічна коронка", price: "від 3 800 ₴" },
      { nameEn: "Composite Bonding", nameUk: "Композитна реставрація", price: "від 1 500 ₴" },
    ],
  },
];

const REVIEWS = [
  { id: 1, nameEn: "Anna K.", nameUk: "Анна К.", procedureEn: "Zoom Whitening", procedureUk: "Zoom відбілювання", starsCount: 5, textEn: "Amazing result! My teeth are 6 shades whiter and the process was completely painless. The staff made me feel so comfortable throughout. Highly recommend SmilePro!", textUk: "Чудовий результат! Мої зуби стали на 6 тонів білішими, і процедура була абсолютно безболісною. Персонал зробив все, щоб я почувалася комфортно. Дуже рекомендую SmilePro!" },
  { id: 2, nameEn: "Maksym T.", nameUk: "Максим Т.", procedureEn: "Dental Implant", procedureUk: "Імплантація", starsCount: 5, textEn: "Dr. Moroz is a true professional. The implant procedure was quick, recovery was smooth, and now I can't even tell the difference from my natural teeth.", textUk: "Лікар Мороз — справжній професіонал. Імплантація пройшла швидко, загоєння без проблем, і тепер я навіть не відрізняю імплант від природних зубів." },
  { id: 3, nameEn: "Iryna S.", nameUk: "Ірина С.", procedureEn: "Invisalign", procedureUk: "Invisalign", starsCount: 5, textEn: "After 10 months with Invisalign my smile is perfect! Dr. Shevchenko was incredibly attentive and tracked every detail. Worth every penny.", textUk: "Після 10 місяців з Invisalign моя усмішка ідеальна! Лікар Шевченко була неймовірно уважною і контролювала кожну деталь. Варте кожної гривні." },
];

const NAV_ITEMS = [
  { en: "Services", uk: "Послуги" },
  { en: "Doctors", uk: "Лікарі" },
  { en: "Prices", uk: "Ціни" },
  { en: "Before/After", uk: "До/Після" },
  { en: "Contact", uk: "Контакти" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export function SmileProDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  /* Smile Simulator */
  const [simIssue, setSimIssue] = useState<string>("");
  const [simResult, setSimResult] = useState<string>("");

  /* Price tabs */
  const [priceTab, setPriceTab] = useState("therapy");

  /* Booking form */
  const [bookService, setBookService] = useState("");
  const [bookDoctor, setBookDoctor] = useState("");
  const [bookDate, setBookDate] = useState("");
  const [bookName, setBookName] = useState("");
  const [bookPhone, setBookPhone] = useState("");
  const [bookSent, setBookSent] = useState(false);

  const simData = simIssue && simResult ? SIM_RESULTS[simIssue]?.[simResult] : null;

  return (
    <div className="min-h-screen bg-white text-gray-800 dark:text-neutral-200 font-sans">

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="text-xl font-bold text-cyan-600">😁 SmilePro</span>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
            {NAV_ITEMS.map((n) => (
              <span key={n.en} className="hover:text-cyan-600 cursor-pointer transition-colors">
                {isUk ? n.uk : n.en}
              </span>
            ))}
          </nav>
          <button className="bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors">
            {isUk ? "Записатися" : "Book Visit"}
          </button>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-linear-to-br from-cyan-50 via-white to-cyan-50/40 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-28 text-center">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-cyan-100 text-cyan-700 text-sm font-medium">
            {isUk ? "🦷 Сучасна стоматологія без болю" : "🦷 Modern Painless Dentistry"}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
            {isUk ? "Посмішка Вашої Мрії" : "The Smile of Your Dreams"}
          </h1>
          <p className="text-lg md:text-xl text-gray-500 dark:text-neutral-400 max-w-2xl mx-auto mb-8">
            {isUk
              ? "Безболісна стоматологія з новітніми технологіями. Лазери, 3D-сканування, седація — все для вашого комфорту."
              : "Painless dentistry with the latest technology. Lasers, 3D scanning, sedation — everything for your comfort."}
          </p>
          <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold px-8 py-3.5 rounded-full text-lg transition-colors shadow-lg shadow-cyan-200">
            {isUk ? "Безкоштовна консультація" : "Free Consultation"}
          </button>

          {/* Trust badges */}
          <div className="mt-14 flex flex-wrap justify-center gap-8 md:gap-14">
            {[
              { emoji: "👥", valueEn: "10 000+", valueUk: "10 000+", labelEn: "Happy Patients", labelUk: "Задоволених пацієнтів" },
              { emoji: "💉", valueEn: "100%", valueUk: "100%", labelEn: "Painless Procedures", labelUk: "Безболісні процедури" },
              { emoji: "📐", valueEn: "3D", valueUk: "3D", labelEn: "Digital Scanning", labelUk: "Цифрове сканування" },
            ].map((b) => (
              <div key={b.emoji} className="text-center">
                <div className="text-3xl mb-1">{b.emoji}</div>
                <div className="text-2xl font-bold text-cyan-600">{isUk ? b.valueUk : b.valueEn}</div>
                <div className="text-sm text-gray-400">{isUk ? b.labelUk : b.labelEn}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ────────────────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-3">
            {isUk ? "Наші послуги" : "Our Services"}
          </h2>
          <p className="text-center text-gray-400 dark:text-neutral-500 mb-12 max-w-xl mx-auto">
            {isUk
              ? "Повний спектр стоматологічних послуг під одним дахом"
              : "Full range of dental services under one roof"}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((s) => (
              <div
                key={s.id}
                className="bg-white rounded-2xl p-6 border border-gray-100 dark:border-neutral-700 hover:border-cyan-200 hover:shadow-lg hover:shadow-cyan-50 transition-all"
              >
                <div className="text-3xl mb-3">{s.emoji}</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">{isUk ? s.nameUk : s.nameEn}</h3>
                <p className="text-sm text-gray-400 dark:text-neutral-500 mb-3">{isUk ? s.descUk : s.descEn}</p>
                <div className="text-cyan-600 font-semibold text-sm">{isUk ? s.priceUk : s.priceEn}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Smile Simulator ─────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-3">
            {isUk ? "Симулятор усмішки" : "Smile Simulator"}
          </h2>
          <p className="text-center text-gray-400 dark:text-neutral-500 mb-10 max-w-lg mx-auto">
            {isUk
              ? "Оберіть вашу проблему та бажаний результат — ми покажемо план лікування"
              : "Choose your issue and desired result — we'll show your treatment plan"}
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Issue select */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-neutral-300 mb-2">
                {isUk ? "Поточна проблема" : "Current Issue"}
              </label>
              <div className="flex flex-col gap-2">
                {ISSUES.map((i) => (
                  <button
                    key={i.id}
                    onClick={() => setSimIssue(i.id)}
                    className={`text-left px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                      simIssue === i.id
                        ? "border-cyan-400 bg-cyan-50 text-cyan-700"
                        : "border-gray-200 dark:border-neutral-700 bg-white text-gray-600 dark:text-neutral-300 hover:border-cyan-200"
                    }`}
                  >
                    {isUk ? i.labelUk : i.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Desired result */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-neutral-300 mb-2">
                {isUk ? "Бажаний результат" : "Desired Result"}
              </label>
              <div className="flex flex-col gap-2">
                {DESIRED_RESULTS.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setSimResult(r.id)}
                    className={`text-left px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                      simResult === r.id
                        ? "border-cyan-400 bg-cyan-50 text-cyan-700"
                        : "border-gray-200 dark:border-neutral-700 bg-white text-gray-600 dark:text-neutral-300 hover:border-cyan-200"
                    }`}
                  >
                    {isUk ? r.labelUk : r.labelEn}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Simulation result */}
          {simData && (
            <div className="bg-linear-to-br from-cyan-50 to-white border border-cyan-200 rounded-2xl p-6 md:p-8">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
                {isUk ? "Рекомендований план лікування" : "Recommended Treatment Plan"}
              </h3>
              <ul className="space-y-2 mb-5">
                {simData.procedures.map((p, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="w-6 h-6 rounded-full bg-cyan-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    {isUk ? p.nameUk : p.nameEn}
                  </li>
                ))}
              </ul>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 border border-cyan-100">
                  <div className="text-xs text-gray-400 dark:text-neutral-500 mb-1">{isUk ? "Орієнтовний термін" : "Estimated Timeline"}</div>
                  <div className="font-bold text-cyan-700">{isUk ? simData.timelineUk : simData.timelineEn}</div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-cyan-100">
                  <div className="text-xs text-gray-400 dark:text-neutral-500 mb-1">{isUk ? "Орієнтовна вартість" : "Estimated Cost"}</div>
                  <div className="font-bold text-cyan-700">{isUk ? simData.costUk : simData.costEn}</div>
                </div>
              </div>
            </div>
          )}

          {!simData && simIssue && simResult && (
            <div className="text-center text-gray-400 dark:text-neutral-500 py-6">
              {isUk ? "Комбінація не знайдена" : "Combination not found"}
            </div>
          )}
        </div>
      </section>

      {/* ── Doctors ──────────────────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-3">
            {isUk ? "Наші лікарі" : "Our Doctors"}
          </h2>
          <p className="text-center text-gray-400 dark:text-neutral-500 mb-12 max-w-lg mx-auto">
            {isUk
              ? "Досвідчені спеціалісти, які дбають про вашу усмішку"
              : "Experienced specialists who care about your smile"}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DOCTORS.map((d) => (
              <div key={d.id} className="bg-white rounded-2xl p-6 border border-gray-100 dark:border-neutral-700 text-center">
                <div className="text-5xl mb-3">{d.emoji}</div>
                <h3 className="font-bold text-gray-900">{isUk ? d.nameUk : d.nameEn}</h3>
                <p className="text-sm text-cyan-600 font-medium mt-1">{isUk ? d.specUk : d.specEn}</p>
                <p className="text-xs text-gray-400 dark:text-neutral-500 mt-1">
                  {isUk ? `${d.years} років досвіду` : `${d.years} years experience`}
                </p>
                <button className="mt-4 w-full bg-cyan-50 hover:bg-cyan-100 text-cyan-700 text-sm font-semibold py-2 rounded-xl transition-colors">
                  {isUk ? `Записатися до ${d.nameUk.split(" ").pop()}` : `Book with ${d.nameEn.split(" ").pop()}`}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Before / After ──────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-3">
            {isUk ? "До / Після" : "Before / After"}
          </h2>
          <p className="text-center text-gray-400 dark:text-neutral-500 mb-12 max-w-lg mx-auto">
            {isUk ? "Реальні результати наших пацієнтів" : "Real results from our patients"}
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {BEFORE_AFTER.map((c) => (
              <div key={c.id} className="bg-slate-50 rounded-2xl p-5 border border-gray-100">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">{isUk ? c.procedureUk : c.procedureEn}</h3>
                <div className="flex gap-3 mb-3">
                  <div className="flex-1 aspect-[4/3] rounded-xl bg-gray-300 flex items-center justify-center text-gray-500 dark:text-neutral-400 text-sm font-medium">
                    {isUk ? "До" : "Before"}
                  </div>
                  <div className="flex-1 aspect-[4/3] rounded-xl bg-linear-to-br from-white to-cyan-50 border-2 border-cyan-200 flex items-center justify-center text-cyan-600 text-sm font-medium">
                    {isUk ? "Після" : "After"}
                  </div>
                </div>
                <div className="text-xs text-gray-400">
                  {isUk ? "Тривалість лікування: " : "Treatment duration: "}
                  <span className="font-semibold text-gray-600">{isUk ? c.durationUk : c.durationEn}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Price List ──────────────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-3">
            {isUk ? "Прайс-лист" : "Price List"}
          </h2>
          <p className="text-center text-gray-400 dark:text-neutral-500 mb-10">
            {isUk ? "Прозорі ціни без прихованих платежів" : "Transparent pricing with no hidden fees"}
          </p>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {PRICE_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setPriceTab(tab.id)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  priceTab === tab.id
                    ? "bg-cyan-500 text-white shadow-md shadow-cyan-200"
                    : "bg-white text-gray-500 dark:text-neutral-400 border border-gray-200 dark:border-neutral-700 hover:border-cyan-200"
                }`}
              >
                {isUk ? tab.labelUk : tab.labelEn}
              </button>
            ))}
          </div>

          {/* Table */}
          {PRICE_TABS.filter((t) => t.id === priceTab).map((tab) => (
            <div key={tab.id} className="bg-white rounded-2xl border border-gray-100 dark:border-neutral-700 overflow-hidden">
              {tab.rows.map((row, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between px-6 py-4 ${
                    idx < tab.rows.length - 1 ? "border-b border-gray-50" : ""
                  }`}
                >
                  <span className="text-sm text-gray-700">{isUk ? row.nameUk : row.nameEn}</span>
                  <span className="text-sm font-bold text-cyan-600 shrink-0 ml-4">{row.price}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── Pain-free Guarantee ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-linear-to-br from-cyan-500 to-cyan-600 text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="text-4xl mb-4">🛡️</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {isUk ? "Гарантія безболісності" : "Pain-Free Guarantee"}
          </h2>
          <p className="text-cyan-100 max-w-2xl mx-auto mb-10">
            {isUk
              ? "Ми використовуємо найсучасніші методи знеболення, щоб ваш візит був максимально комфортним"
              : "We use the most advanced pain management methods to make your visit as comfortable as possible"}
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                emoji: "💉",
                titleEn: "Modern Anesthesia",
                titleUk: "Сучасна анестезія",
                descEn: "Computer-controlled local anesthesia with ultra-thin needles you won't even feel",
                descUk: "Комп'ютерна місцева анестезія з ультратонкими голками, які ви навіть не відчуєте",
              },
              {
                emoji: "🔬",
                titleEn: "Laser Dentistry",
                titleUk: "Лазерна стоматологія",
                descEn: "Minimally invasive laser procedures that reduce pain, swelling and recovery time",
                descUk: "Малоінвазивні лазерні процедури, що зменшують біль, набряк та час відновлення",
              },
              {
                emoji: "😴",
                titleEn: "Sedation Options",
                titleUk: "Варіанти седації",
                descEn: "Nitrous oxide and IV sedation for anxious patients — sleep through your treatment",
                descUk: "Закис азоту та внутрішньовенна седація для тривожних пацієнтів — проспіть лікування",
              },
            ].map((item) => (
              <div key={item.emoji} className="bg-white/10 backdrop-blur rounded-2xl p-6">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-bold text-lg mb-2">{isUk ? item.titleUk : item.titleEn}</h3>
                <p className="text-sm text-cyan-100">{isUk ? item.descUk : item.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ─────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-3">
            {isUk ? "Відгуки пацієнтів" : "Patient Reviews"}
          </h2>
          <p className="text-center text-gray-400 dark:text-neutral-500 mb-12">
            {isUk ? "Що кажуть наші пацієнти" : "What our patients say"}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <div key={r.id} className="bg-slate-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-100 text-cyan-600 font-bold flex items-center justify-center">
                    {(isUk ? r.nameUk : r.nameEn).charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">{isUk ? r.nameUk : r.nameEn}</div>
                    <div className="text-xs text-cyan-600">{isUk ? r.procedureUk : r.procedureEn}</div>
                  </div>
                </div>
                <div className="text-yellow-400 text-sm mb-2">{"⭐".repeat(r.starsCount)}</div>
                <p className="text-sm text-gray-600 dark:text-neutral-300 leading-relaxed">{isUk ? r.textUk : r.textEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Booking Form ────────────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-3">
            {isUk ? "Запис на прийом" : "Book an Appointment"}
          </h2>
          <p className="text-center text-gray-400 dark:text-neutral-500 mb-10">
            {isUk ? "Оберіть зручний час — ми зателефонуємо для підтвердження" : "Pick a convenient time — we'll call to confirm"}
          </p>

          {bookSent ? (
            <div className="text-center bg-cyan-50 border border-cyan-200 rounded-2xl p-10">
              <div className="text-4xl mb-3">✅</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {isUk ? "Заявку надіслано!" : "Request Sent!"}
              </h3>
              <p className="text-gray-500">
                {isUk
                  ? "Ми зв'яжемося з вами протягом 15 хвилин для підтвердження"
                  : "We'll contact you within 15 minutes to confirm"}
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setBookSent(true);
              }}
              className="bg-white rounded-2xl border border-gray-100 dark:border-neutral-700 p-6 md:p-8 space-y-5"
            >
              {/* Service type */}
              <div>
                <label htmlFor="sp-service" className="block text-sm font-semibold text-gray-700 dark:text-neutral-300 mb-1">
                  {isUk ? "Тип послуги" : "Service Type"}
                </label>
                <select
                  id="sp-service"
                  value={bookService}
                  onChange={(e) => setBookService(e.target.value)}
                  className="w-full border border-gray-200 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                >
                  <option value="">{isUk ? "Оберіть послугу" : "Select service"}</option>
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>{isUk ? s.nameUk : s.nameEn}</option>
                  ))}
                </select>
              </div>

              {/* Doctor */}
              <div>
                <label htmlFor="sp-doctor" className="block text-sm font-semibold text-gray-700 dark:text-neutral-300 mb-1">
                  {isUk ? "Бажаний лікар" : "Preferred Doctor"}
                </label>
                <select
                  id="sp-doctor"
                  value={bookDoctor}
                  onChange={(e) => setBookDoctor(e.target.value)}
                  className="w-full border border-gray-200 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                >
                  <option value="">{isUk ? "Будь-який лікар" : "Any doctor"}</option>
                  {DOCTORS.map((d) => (
                    <option key={d.id} value={String(d.id)}>{isUk ? d.nameUk : d.nameEn}</option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label htmlFor="sp-date" className="block text-sm font-semibold text-gray-700 dark:text-neutral-300 mb-1">
                  {isUk ? "Бажана дата" : "Preferred Date"}
                </label>
                <input
                  id="sp-date"
                  type="date"
                  value={bookDate}
                  onChange={(e) => setBookDate(e.target.value)}
                  className="w-full border border-gray-200 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                />
              </div>

              {/* Name */}
              <div>
                <label htmlFor="sp-name" className="block text-sm font-semibold text-gray-700 dark:text-neutral-300 mb-1">
                  {isUk ? "Ваше ім'я" : "Your Name"}
                </label>
                <input
                  id="sp-name"
                  type="text"
                  value={bookName}
                  onChange={(e) => setBookName(e.target.value)}
                  placeholder={isUk ? "Ім'я та прізвище" : "Full name"}
                  className="w-full border border-gray-200 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="sp-phone" className="block text-sm font-semibold text-gray-700 dark:text-neutral-300 mb-1">
                  {isUk ? "Телефон" : "Phone"}
                </label>
                <input
                  id="sp-phone"
                  type="tel"
                  value={bookPhone}
                  onChange={(e) => setBookPhone(e.target.value)}
                  placeholder="+380 (__) ___-__-__"
                  className="w-full border border-gray-200 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-xl text-sm transition-colors shadow-lg shadow-cyan-200"
              >
                {isUk ? "Надіслати заявку" : "Submit Request"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer className="bg-gray-900 text-gray-300 py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div>
              <div className="text-xl font-bold text-white mb-3">😁 SmilePro</div>
              <p className="text-sm text-gray-400 dark:text-neutral-500 leading-relaxed">
                {isUk
                  ? "Сучасна стоматологія для всієї родини. Ваша усмішка — наша місія."
                  : "Modern dentistry for the whole family. Your smile is our mission."}
              </p>
            </div>

            {/* Address */}
            <div>
              <h4 className="font-semibold text-white mb-3">{isUk ? "Адреса" : "Address"}</h4>
              <p className="text-sm text-gray-400">
                {isUk
                  ? "вул. Хрещатик, 22, офіс 5\nКиїв, 01001"
                  : "22 Khreshchatyk St., office 5\nKyiv, 01001"}
              </p>
            </div>

            {/* Hours */}
            <div>
              <h4 className="font-semibold text-white mb-3">{isUk ? "Графік роботи" : "Working Hours"}</h4>
              <p className="text-sm text-gray-400">
                {isUk ? "Пн–Сб: 09:00–21:00" : "Mon–Sat: 09:00–21:00"}
                <br />
                {isUk ? "Нд: вихідний" : "Sun: closed"}
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-3">{isUk ? "Контакти" : "Contact"}</h4>
              <p className="text-sm text-gray-400">
                📞 +380 (44) 123-45-67
              </p>
              <div className="mt-2 inline-block bg-red-500/20 text-red-300 text-xs font-semibold px-3 py-1 rounded-full">
                🚨 {isUk ? "Екстрена лінія: +380 (44) 765-43-21" : "Emergency: +380 (44) 765-43-21"}
              </div>
              <p className="text-sm text-gray-400 dark:text-neutral-500 mt-2">
                ✉️ info@smilepro.ua
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
            &copy; 2026 SmilePro. {isUk ? "Усі права захищені." : "All rights reserved."}
            {" "}
            {isUk ? "Це демо-сайт від " : "This is a demo site by "}
            <span className="text-cyan-400">Codeworth</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
