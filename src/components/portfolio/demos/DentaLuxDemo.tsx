"use client";

import { useState } from "react";

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function IconTooth({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3C9.5 3 7.5 5 7.5 7.5c0 2 .8 3.8 1.5 5.5L10 17c.3 1.5 1 3 2 3s1.7-1.5 2-3l1-4c.7-1.7 1.5-3.5 1.5-5.5C16.5 5 14.5 3 12 3z" />
    </svg>
  );
}

function IconCross({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M10 4h4v6h6v4h-6v6h-4v-6H4v-4h6z" />
    </svg>
  );
}

function IconSmile({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 14.5s1.5 2.5 3.5 2.5 3.5-2.5 3.5-2.5" />
      <circle cx="9" cy="10" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="15" cy="10" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconStar({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2l2.4 7.4h7.8l-6.3 4.6 2.4 7.4-6.3-4.6-6.3 4.6 2.4-7.4L2 9.4h7.8z" />
    </svg>
  );
}

function IconCrown({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 18L6.5 7 11 12 12 4l1 8 4.5-5L21 18H3z" />
    </svg>
  );
}

function IconScissors({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M8.12 8.12 20 20" />
      <path d="M20 4 8.12 15.88" />
    </svg>
  );
}

function IconCheck({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function IconChevron({ open, className = "w-5 h-5" }: { open: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${open ? "rotate-180" : ""} ${className}`}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function IconVerified({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────

const SERVICES = [
  { id: "therapy",    Icon: IconTooth,    nameUk: "Терапія",       nameEn: "Therapy",       descUk: "Лікування карієсу, пломби, реставрація зубів",        descEn: "Caries treatment, fillings, tooth restoration",        priceFrom: 600 },
  { id: "implants",   Icon: IconCross,    nameUk: "Імплантація",   nameEn: "Implants",      descUk: "Імпланти Nobel Biocare та Straumann, AllOn4",          descEn: "Nobel Biocare and Straumann implants, AllOn4",          priceFrom: 18000 },
  { id: "braces",     Icon: IconSmile,    nameUk: "Ортодонтія",    nameEn: "Orthodontics",  descUk: "Брекети, елайнери Invisalign, ретейнери",             descEn: "Braces, Invisalign aligners, retainers",               priceFrom: 4500 },
  { id: "whitening",  Icon: IconStar,     nameUk: "Відбілювання",  nameEn: "Whitening",     descUk: "Zoom 4, Beyond, домашні капи для відбілювання",       descEn: "Zoom 4, Beyond, home whitening kits",                  priceFrom: 2800 },
  { id: "prosthetics",Icon: IconCrown,    nameUk: "Протезування",  nameEn: "Prosthetics",   descUk: "Вініри, коронки, мости, знімні та незнімні протези",  descEn: "Veneers, crowns, bridges, removable and fixed dentures",priceFrom: 3200 },
  { id: "surgery",    Icon: IconScissors, nameUk: "Хірургія",      nameEn: "Surgery",       descUk: "Видалення зубів, операції на яснах, синусліфтинг",    descEn: "Tooth extraction, gum surgery, sinus lift",            priceFrom: 800 },
];

const PRICE_DETAILS: Record<string, { nameUk: string; nameEn: string; rows: { nameUk: string; nameEn: string; price: string }[] }> = {
  therapy: {
    nameUk: "Терапія", nameEn: "Therapy",
    rows: [
      { nameUk: "Первинна консультація", nameEn: "Initial consultation", price: "0 ₴ (FREE)" },
      { nameUk: "Рентген одного зуба", nameEn: "Single tooth X-ray", price: "150 ₴" },
      { nameUk: "Пломба фотополімер", nameEn: "Composite filling", price: "600–1 200 ₴" },
      { nameUk: "Канальне лікування (1 канал)", nameEn: "Root canal (1 canal)", price: "2 400–4 800 ₴" },
    ],
  },
  implants: {
    nameUk: "Імплантація", nameEn: "Implants",
    rows: [
      { nameUk: "Консультація імплантолога", nameEn: "Implantologist consultation", price: "0 ₴ (FREE)" },
      { nameUk: "3D КТ-знімок щелепи", nameEn: "3D CT jaw scan", price: "600 ₴" },
      { nameUk: "Імплант Nobel Biocare", nameEn: "Nobel Biocare implant", price: "від 18 000 ₴" },
      { nameUk: "Імплант Straumann", nameEn: "Straumann implant", price: "від 22 000 ₴" },
      { nameUk: "Коронка на імплант (цирконій)", nameEn: "Zirconia implant crown", price: "від 5 000 ₴" },
    ],
  },
  braces: {
    nameUk: "Ортодонтія", nameEn: "Orthodontics",
    rows: [
      { nameUk: "Консультація ортодонта", nameEn: "Orthodontist consultation", price: "0 ₴ (FREE)" },
      { nameUk: "Металеві брекети (щелепа)", nameEn: "Metal braces (arch)", price: "від 4 500 ₴" },
      { nameUk: "Керамічні брекети (щелепа)", nameEn: "Ceramic braces (arch)", price: "від 7 500 ₴" },
      { nameUk: "Invisalign (повний курс)", nameEn: "Invisalign (full course)", price: "від 35 000 ₴" },
      { nameUk: "Ретейнер знімний", nameEn: "Removable retainer", price: "від 1 200 ₴" },
    ],
  },
  whitening: {
    nameUk: "Відбілювання", nameEn: "Whitening",
    rows: [
      { nameUk: "Zoom 4 в клініці", nameEn: "Zoom 4 in-clinic", price: "від 2 800 ₴" },
      { nameUk: "Beyond в клініці", nameEn: "Beyond in-clinic", price: "від 2 400 ₴" },
      { nameUk: "Домашні капи + гель", nameEn: "Home whitening kit + gel", price: "від 1 200 ₴" },
    ],
  },
  prosthetics: {
    nameUk: "Протезування", nameEn: "Prosthetics",
    rows: [
      { nameUk: "Вінір керамічний", nameEn: "Ceramic veneer", price: "від 3 200 ₴" },
      { nameUk: "Коронка металокераміка", nameEn: "Metal-ceramic crown", price: "від 3 800 ₴" },
      { nameUk: "Коронка цирконій", nameEn: "Zirconia crown", price: "від 6 500 ₴" },
      { nameUk: "Міст 3 одиниці (цирконій)", nameEn: "3-unit bridge (zirconia)", price: "від 16 500 ₴" },
    ],
  },
  surgery: {
    nameUk: "Хірургія", nameEn: "Surgery",
    rows: [
      { nameUk: "Просте видалення", nameEn: "Simple extraction", price: "від 800 ₴" },
      { nameUk: "Складне видалення", nameEn: "Complex extraction", price: "від 1 800 ₴" },
      { nameUk: "Видалення зуба мудрості", nameEn: "Wisdom tooth removal", price: "від 2 500 ₴" },
      { nameUk: "Операція на яснах", nameEn: "Gum surgery", price: "від 3 000 ₴" },
    ],
  },
};

const DOCTORS = [
  { id: 1, initials: "ІВ", nameUk: "Ігор Васильченко",  nameEn: "Ihor Vasylchenko",  titleUk: "Головний лікар · Імплантолог",          titleEn: "Chief Physician · Implantologist",        expUk: "15 років", expEn: "15 yrs", certUk: "DDS, PhD · Nobel Biocare Partner",         certEn: "DDS, PhD · Nobel Biocare Partner",         services: ["implants", "surgery"],     color: "bg-sky-100 text-sky-700" },
  { id: 2, initials: "МО", nameUk: "Марина Олійник",    nameEn: "Maryna Oliinyk",    titleUk: "Ортодонт · Invisalign Provider",         titleEn: "Orthodontist · Invisalign Provider",      expUk: "10 років", expEn: "10 yrs", certUk: "DDS · Invisalign Platinum Provider",       certEn: "DDS · Invisalign Platinum Provider",       services: ["braces"],                  color: "bg-violet-100 text-violet-700" },
  { id: 3, initials: "ДР", nameUk: "Дмитро Рибак",      nameEn: "Dmytro Rybak",      titleUk: "Терапевт-стоматолог",                   titleEn: "General Dentist",                         expUk: "8 років",  expEn: "8 yrs",  certUk: "DDS · Endodontics specialist",             certEn: "DDS · Endodontics specialist",             services: ["therapy"],                 color: "bg-emerald-100 text-emerald-700" },
  { id: 4, initials: "ТК", nameUk: "Тетяна Коваль",     nameEn: "Tetiana Koval",     titleUk: "Ортопед · Естетична стоматологія",      titleEn: "Prosthodontist · Aesthetic Dentistry",   expUk: "12 років", expEn: "12 yrs", certUk: "DDS · Cerec Certified · Veneers Master",   certEn: "DDS · Cerec Certified · Veneers Master",   services: ["prosthetics", "whitening"], color: "bg-rose-100 text-rose-700" },
];

const BEFORE_AFTER = [
  { id: 1, procedureUk: "Встановлення вінірів E-max",   procedureEn: "E-max Veneers",          doctorUk: "Тетяна Коваль",    doctorEn: "Tetiana Koval",    beforeClass: "from-amber-100 to-slate-200",  afterClass: "from-sky-50 to-white" },
  { id: 2, procedureUk: "Відбілювання Zoom 4",          procedureEn: "Zoom 4 Whitening",       doctorUk: "Тетяна Коваль",    doctorEn: "Tetiana Koval",    beforeClass: "from-yellow-100 to-amber-200", afterClass: "from-white to-sky-50" },
  { id: 3, procedureUk: "Ортодонтичне лікування 16 міс",procedureEn: "Orthodontic Treatment 16mo", doctorUk: "Марина Олійник", doctorEn: "Maryna Oliinyk", beforeClass: "from-slate-200 to-slate-300",  afterClass: "from-sky-50 to-white" },
  { id: 4, procedureUk: "Імплант Nobel Biocare + коронка",procedureEn: "Nobel Biocare Implant + Crown", doctorUk: "Ігор Васильченко", doctorEn: "Ihor Vasylchenko", beforeClass: "from-slate-200 to-slate-300", afterClass: "from-emerald-50 to-white" },
];

const REVIEWS = [
  { nameUk: "Олена К.",  nameEn: "Olena K.",  rating: 5, textUk: "Нарешті знайшла клініку, де дійсно не страшно! Ігор Васильченко поставив імплант Nobel абсолютно безболісно. До і після консультація безкоштовна. Рекомендую всім!", textEn: "Finally found a clinic where I'm not scared! Ihor Vasylchenko placed my Nobel implant completely painlessly. Free before/after consultation. Highly recommend!" },
  { nameUk: "Максим Д.", nameEn: "Maksym D.", rating: 5, textUk: "Робив Invisalign у Марини Олійник — 14 місяців і результат неймовірний. Зуби ідеально рівні, жодного дискомфорту під час носіння. Клініка сучасна, все на вищому рівні.", textEn: "Did Invisalign with Maryna Oliinyk — 14 months and the result is incredible. Perfectly straight teeth, no discomfort wearing them. Modern clinic, top-level service." },
  { nameUk: "Ірина В.",  nameEn: "Iryna V.",  rating: 5, textUk: "Зробила 6 вінірів E-max та відбілювання Zoom 4. Посмішка мрії стала реальністю! Тетяна Коваль — справжній художник. Дякую всій команді DentaLux!", textEn: "Got 6 E-max veneers and Zoom 4 whitening. My dream smile became reality! Tetiana Koval is a true artist. Thank you to the entire DentaLux team!" },
];

const FAQ = [
  { qUk: "Чи боляче лікувати зуби?",          qEn: "Is dental treatment painful?",        aUk: "Ми використовуємо сучасні артикаїнові анестетики (Ultracain, Ubistezin). Більшість пацієнтів не відчувають болю взагалі. Для тривожних пацієнтів доступна внутрішньовенна седація.", aEn: "We use modern articaine anesthetics (Ultracain, Ubistezin). Most patients feel no pain at all. IV sedation is available for anxious patients." },
  { qUk: "Скільки часу займає імплантація?",   qEn: "How long does implantation take?",    aUk: "Встановлення імпланту — 30–60 хвилин. Повний цикл з приживленням — 3–6 місяців. Тимчасова коронка встановлюється одразу після операції.", aEn: "Implant placement takes 30–60 minutes. Full cycle with osseointegration — 3–6 months. A temporary crown is placed immediately after surgery." },
  { qUk: "Чи є розтрочка на лікування?",       qEn: "Do you offer installment plans?",     aUk: "Так, безвідсоткова розтрочка до 12 місяців через ПриватБанк та monobank. Мінімальна сума — 3 000 ₴. Офіційний договір, жодних прихованих умов.", aEn: "Yes, 0% installment plans up to 12 months through PrivatBank and monobank. Minimum amount 3,000 ₴. Official contract, no hidden terms." },
  { qUk: "Чи приймаєте у вихідні дні?",        qEn: "Do you work on weekends?",            aUk: "Так, субота: 9:00–17:00. Неділя — вихідний. У разі екстреного болю — телефонуйте нам у будь-який час.", aEn: "Yes, Saturday: 9:00–17:00. Sunday — closed. In case of emergency pain — call us anytime." },
  { qUk: "Які методи оплати приймаєте?",        qEn: "What payment methods do you accept?", aUk: "Готівка, Visa/Mastercard, Apple Pay, Google Pay, безготівковий розрахунок для юридичних осіб.", aEn: "Cash, Visa/Mastercard, Apple Pay, Google Pay, bank transfer for legal entities." },
  { qUk: "Як підготуватись до прийому?",        qEn: "How to prepare for treatment?",       aUk: "Добре почистіть зуби перед візитом. За 2 год до анестезії не їжте. Якщо приймаєте ліки — повідомте лікаря.", aEn: "Brush your teeth well before the visit. Don't eat 2 hours before anesthesia. If you take medications — inform the doctor." },
  { qUk: "Чи приймаєте дітей?",                qEn: "Do you treat children?",              aUk: "Так, від 3 років. У нас є дитячий стоматолог та окремий кабінет з іграшками — щоб перший візит до лікаря став приємним.", aEn: "Yes, from age 3. We have a pediatric dentist and a separate room with toys — to make the first dental visit enjoyable." },
  { qUk: "Що таке 3D-сканер iTero?",            qEn: "What is the iTero 3D scanner?",       aUk: "Це цифровий сканер, що будує 3D-модель ваших зубів за 5 хвилин без зліпків. Використовується для точного планування ортодонтичного лікування та протезування.", aEn: "A digital scanner that builds a 3D model of your teeth in 5 minutes without impressions. Used for precise planning of orthodontic and prosthetic treatment." },
];

const DATES = [
  { value: "2026-03-27", labelUk: "Пн 27 бер", labelEn: "Mon 27 Mar" },
  { value: "2026-03-28", labelUk: "Вт 28 бер", labelEn: "Tue 28 Mar" },
  { value: "2026-03-29", labelUk: "Ср 29 бер", labelEn: "Wed 29 Mar" },
];

const TIME_SLOTS = ["9:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

const CERTS = [
  "ISO 9001:2015",
  "Nobel Biocare Partner",
  "Invisalign Platinum Provider",
  "Cerec Certified",
  "SIRONA Equipment",
  "3D iTero Scanner",
  "Digital X-ray",
  "DENTSPLY Sirona",
];

// ─── Component ────────────────────────────────────────────────────────────────

export function DentaLuxDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [openService, setOpenService] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [bookingStep, setBookingStep] = useState(0);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactNote, setContactNote] = useState("");

  const filteredDoctors = selectedService
    ? DOCTORS.filter((d) => d.services.includes(selectedService))
    : DOCTORS;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const openBooking = (serviceId?: string) => {
    if (serviceId) setSelectedService(serviceId);
    setBookingStep(1);
    setTimeout(() => scrollTo("booking"), 100);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">

      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center shrink-0">
              <IconTooth className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900">DentaLux</span>
          </div>
          <div className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button onClick={() => scrollTo("services")} className="hover:text-sky-600 transition-colors">{isUk ? "Послуги" : "Services"}</button>
            <button onClick={() => scrollTo("doctors")} className="hover:text-sky-600 transition-colors">{isUk ? "Лікарі" : "Doctors"}</button>
            <button onClick={() => scrollTo("prices")} className="hover:text-sky-600 transition-colors">{isUk ? "Ціни" : "Prices"}</button>
            <button onClick={() => scrollTo("before-after")} className="hover:text-sky-600 transition-colors">{isUk ? "До і Після" : "Before & After"}</button>
            <button onClick={() => scrollTo("booking")} className="hover:text-sky-600 transition-colors">{isUk ? "Запис" : "Booking"}</button>
          </div>
          <button onClick={() => openBooking()} className="bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors shrink-0">
            {isUk ? "Записатись" : "Book Now"}
          </button>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-linear-to-br from-white via-sky-50/40 to-slate-50/60 pt-16 pb-20 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-sky-100 text-sky-700 text-xs font-bold px-3 py-1.5 rounded-full mb-5 uppercase tracking-wider">
              {isUk ? "Преміум стоматологія · Київ" : "Premium Dentistry · Kyiv"}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-5">
              {isUk ? "Посмішка, якою ви пишатиметесь" : "A smile you'll be proud of"}
            </h1>
            <p className="text-lg text-slate-500 mb-8 leading-relaxed max-w-lg">
              {isUk
                ? "15 років досвіду, 12 висококваліфікованих лікарів і сучасне обладнання. Безболісне лікування та прозорі ціни без прихованих доплат."
                : "15 years of expertise, 12 highly qualified doctors and state-of-the-art equipment. Painless treatment with transparent, all-inclusive pricing."}
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <button onClick={() => openBooking()} className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-lg shadow-sky-200/60">
                {isUk ? "Записатись на огляд" : "Book Appointment"}
              </button>
              <button onClick={() => scrollTo("prices")} className="border-2 border-sky-200 text-sky-700 hover:bg-sky-50 font-semibold px-6 py-3 rounded-xl transition-colors">
                {isUk ? "Переглянути ціни" : "View Prices"}
              </button>
            </div>
            <div className="flex flex-wrap gap-6">
              {[
                { val: "15+", labelUk: "років досвіду",  labelEn: "years experience" },
                { val: "12",  labelUk: "лікарів",         labelEn: "doctors" },
                { val: "8K+", labelUk: "пацієнтів",       labelEn: "patients" },
                { val: "4.9★",labelUk: "Google Rating",   labelEn: "Google Rating" },
              ].map((s) => (
                <div key={s.val}>
                  <div className="text-xl font-bold text-slate-900">{s.val}</div>
                  <div className="text-xs text-slate-400">{isUk ? s.labelUk : s.labelEn}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Appointment card mockup */}
          <div className="hidden lg:flex flex-col items-end gap-4">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 w-full max-w-sm">
              <div className="flex items-center gap-3 mb-5 pb-5 border-b border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-sky-700">ІВ</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-slate-900 text-sm truncate">{isUk ? "Ігор Васильченко" : "Ihor Vasylchenko"}</div>
                  <div className="text-sky-600 text-xs">{isUk ? "Імплантолог · PhD" : "Implantologist · PhD"}</div>
                </div>
                <IconVerified className="w-5 h-5 text-emerald-500 shrink-0" />
              </div>
              <div className="bg-sky-50 rounded-xl p-4 mb-4">
                <div className="text-xs text-slate-400 uppercase tracking-wide mb-1.5">{isUk ? "Ваш запис" : "Your Appointment"}</div>
                <div className="font-bold text-slate-900">{isUk ? "Четвер, 29 березня" : "Thursday, 29 March"}</div>
                <div className="text-sky-600 font-semibold text-sm mt-0.5">10:00 — {isUk ? "Імплантологія" : "Implantology"}</div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { val: "FREE", labelUk: "Консультація", labelEn: "Consultation" },
                  { val: "4.9",  labelUk: "Рейтинг",       labelEn: "Rating" },
                  { val: "15 р.",labelUk: "Досвід",         labelEn: "Experience" },
                ].map((s) => (
                  <div key={s.val} className="bg-slate-50 rounded-xl p-2.5 text-center">
                    <div className="text-sm font-bold text-slate-900">{s.val}</div>
                    <div className="text-xs text-slate-400">{isUk ? s.labelUk : s.labelEn}</div>
                  </div>
                ))}
              </div>
              <div className="bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2 text-center">
                <span className="text-emerald-700 text-xs font-semibold">
                  ✓ {isUk ? "Перша консультація безкоштовно" : "First consultation is free"}
                </span>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap justify-end">
              {["Nobel Biocare", "Invisalign Platinum", "Cerec"].map((badge) => (
                <span key={badge} className="bg-white border border-slate-200 shadow-sm rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-600">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────────────── */}
      <section id="services" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">{isUk ? "Наші послуги" : "Our Services"}</h2>
            <p className="text-slate-500 max-w-lg mx-auto">{isUk ? "Повний спектр стоматологічних послуг під одним дахом" : "Full range of dental services under one roof"}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s) => (
              <div key={s.id} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-sky-200 hover:shadow-md transition-all group cursor-default">
                <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center mb-4 group-hover:bg-sky-100 transition-colors">
                  <s.Icon className="w-6 h-6 text-sky-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{isUk ? s.nameUk : s.nameEn}</h3>
                <p className="text-sm text-slate-500 mb-4 leading-relaxed">{isUk ? s.descUk : s.descEn}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sky-700 font-semibold text-sm">{isUk ? `від ${s.priceFrom} ₴` : `from ${s.priceFrom} ₴`}</span>
                  <button onClick={() => { setOpenService(s.id); scrollTo("prices"); }} className="text-sky-600 hover:text-sky-800 text-sm font-medium transition-colors">
                    {isUk ? "Ціни →" : "Prices →"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3D Scan Technology ───────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-sky-600">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-5 uppercase tracking-wider">
              iTero 3D Scanner
            </span>
            <h2 className="text-3xl font-bold text-white mb-4">
              {isUk ? "Діагностика без зліпків" : "Diagnostics Without Impressions"}
            </h2>
            <p className="text-sky-100 mb-8 leading-relaxed">
              {isUk
                ? "3D-сканер iTero будує точну цифрову модель ваших зубів за 5 хвилин. Жодного дискомфорту, жодних зліпків — лише точний цифровий результат для ідеального лікування."
                : "The iTero 3D scanner creates a precise digital model of your teeth in 5 minutes. No discomfort, no impressions — just an accurate digital result for perfect treatment."}
            </p>
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { val: "0.01 мм", labelUk: "Точність", labelEn: "Accuracy" },
                { val: "5 хв",   labelUk: "Тривалість", labelEn: "Duration" },
                { val: "3D",     labelUk: "Модель зубів", labelEn: "3D Model" },
              ].map((s) => (
                <div key={s.val} className="bg-white/10 border border-white/20 rounded-xl p-4 text-center">
                  <div className="text-xl font-bold text-white">{s.val}</div>
                  <div className="text-sky-200 text-xs mt-1">{isUk ? s.labelUk : s.labelEn}</div>
                </div>
              ))}
            </div>
            <button onClick={() => openBooking()} className="bg-white text-sky-700 font-bold px-6 py-3 rounded-xl hover:bg-sky-50 transition-colors">
              {isUk ? "Записатись на 3D-діагностику" : "Book 3D Diagnostics"}
            </button>
          </div>

          {/* 3D scan illustration */}
          <div className="flex items-center justify-center">
            <div className="relative w-64 h-64">
              <div className="w-64 h-64 rounded-3xl bg-white/10 border border-white/20 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-48 h-48 text-white" fill="none" stroke="currentColor" strokeWidth="1.2">
                  {/* Tooth outline */}
                  <path d="M35 45 C35 30 65 30 65 45 L62 75 C61 82 56 85 50 85 C44 85 39 82 38 75 Z" strokeWidth="2" opacity="0.9" />
                  {/* Scan grid — horizontals */}
                  <line x1="32" y1="54" x2="68" y2="54" strokeWidth="0.6" opacity="0.5" />
                  <line x1="32" y1="61" x2="68" y2="61" strokeWidth="0.6" opacity="0.5" />
                  <line x1="33" y1="68" x2="67" y2="68" strokeWidth="0.6" opacity="0.5" />
                  <line x1="35" y1="75" x2="65" y2="75" strokeWidth="0.6" opacity="0.5" />
                  {/* Scan grid — verticals */}
                  <line x1="40" y1="40" x2="40" y2="82" strokeWidth="0.6" opacity="0.5" />
                  <line x1="50" y1="37" x2="50" y2="84" strokeWidth="0.6" opacity="0.5" />
                  <line x1="60" y1="40" x2="60" y2="82" strokeWidth="0.6" opacity="0.5" />
                  {/* Scan beam */}
                  <line x1="28" y1="63" x2="72" y2="63" strokeWidth="2" stroke="white" opacity="0.85" strokeLinecap="round" />
                  {/* Corner markers */}
                  <path d="M25 35 L25 42 M25 35 L32 35" strokeWidth="2" opacity="0.7" />
                  <path d="M75 35 L75 42 M75 35 L68 35" strokeWidth="2" opacity="0.7" />
                  <path d="M25 88 L25 81 M25 88 L32 88" strokeWidth="2" opacity="0.7" />
                  <path d="M75 88 L75 81 M75 88 L68 88" strokeWidth="2" opacity="0.7" />
                  {/* Dot markers */}
                  <circle cx="50" cy="33" r="2" fill="white" opacity="0.8" />
                </svg>
              </div>
              <div className="absolute inset-0 rounded-3xl border border-white/30 animate-ping opacity-10" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Doctors ──────────────────────────────────────────────────────── */}
      <section id="doctors" className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">{isUk ? "Наші лікарі" : "Our Doctors"}</h2>
            <p className="text-slate-500">{isUk ? "Досвідчені фахівці з міжнародними сертифікатами та постійним підвищенням кваліфікації" : "Experienced specialists with international certifications and ongoing professional development"}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DOCTORS.map((d) => (
              <div key={d.id} className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-sky-200 hover:shadow-md transition-all flex flex-col">
                <div className={`w-16 h-16 rounded-2xl ${d.color} flex items-center justify-center text-lg font-bold mb-4 shrink-0`}>
                  {d.initials}
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">{isUk ? d.nameUk : d.nameEn}</h3>
                <p className="text-sky-600 text-xs font-medium mb-2">{isUk ? d.titleUk : d.titleEn}</p>
                <p className="text-slate-400 text-xs mb-3">{isUk ? d.expUk : d.expEn} {isUk ? "досвіду" : "experience"}</p>
                <div className="bg-slate-50 rounded-lg px-2.5 py-2 mb-4 flex-1">
                  <p className="text-xs text-slate-600 leading-relaxed">{isUk ? d.certUk : d.certEn}</p>
                </div>
                <button
                  onClick={() => { setSelectedDoctor(d.id); openBooking(); }}
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors mt-auto"
                >
                  {isUk ? "Записатись" : "Book Appointment"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Price List ───────────────────────────────────────────────────── */}
      <section id="prices" className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">{isUk ? "Прайс-лист" : "Price List"}</h2>
            <p className="text-slate-500">{isUk ? "Прозорі ціни без прихованих доплат" : "Transparent pricing with no hidden fees"}</p>
          </div>

          <div className="bg-sky-600 rounded-xl px-5 py-4 flex items-center gap-4 mb-8 shadow-lg shadow-sky-200/50">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <IconCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">{isUk ? "БЕЗКОШТОВНА перша консультація для нових пацієнтів" : "FREE first consultation for new patients"}</div>
              <div className="text-sky-100 text-xs mt-0.5">{isUk ? "Огляд, рентген і план лікування включені" : "Examination, X-ray and treatment plan included"}</div>
            </div>
          </div>

          <div className="space-y-2 mb-6">
            {SERVICES.map((s) => {
              const detail = PRICE_DETAILS[s.id];
              const isOpen = openService === s.id;
              return (
                <div key={s.id} className={`border rounded-xl overflow-hidden transition-colors ${isOpen ? "border-sky-200" : "border-slate-200"}`}>
                  <button
                    onClick={() => setOpenService(isOpen ? null : s.id)}
                    className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-slate-50 transition-colors text-left"
                  >
                    <span className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isOpen ? "bg-sky-100" : "bg-slate-100"}`}>
                        <s.Icon className={`w-4 h-4 ${isOpen ? "text-sky-600" : "text-slate-500"}`} />
                      </div>
                      <span className="font-semibold text-slate-800">{isUk ? detail.nameUk : detail.nameEn}</span>
                    </span>
                    <IconChevron open={isOpen} className="w-5 h-5 text-sky-500 shrink-0" />
                  </button>
                  {isOpen && (
                    <div className="border-t border-slate-100">
                      <table className="w-full text-sm">
                        <tbody>
                          {detail.rows.map((r, i) => (
                            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                              <td className="px-5 py-3 text-slate-700">{isUk ? r.nameUk : r.nameEn}</td>
                              <td className="px-5 py-3 text-right font-semibold text-sky-700 whitespace-nowrap">{r.price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-center text-xs text-slate-400 italic">
            {isUk
              ? "Ціни орієнтовні. Точна вартість визначається після консультаційного огляду."
              : "Prices are indicative. Exact cost is determined after a consultation examination."}
          </p>
        </div>
      </section>

      {/* ── Before & After ───────────────────────────────────────────────── */}
      <section id="before-after" className="py-16 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">{isUk ? "До і Після" : "Before & After"}</h2>
            <p className="text-slate-500">{isUk ? "Реальні результати наших пацієнтів — публікуються за згодою" : "Real patient results — published with consent"}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BEFORE_AFTER.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-md transition-shadow">
                <div className="grid grid-cols-2 h-48">
                  {/* Before */}
                  <div className={`bg-linear-to-br ${item.beforeClass} flex flex-col items-center justify-center relative overflow-hidden`}>
                    <div className="flex gap-0.5 mb-3">
                      {[7, 9, 10, 10, 9, 7].map((h, i) => (
                        <div key={i} style={{ height: `${h * 4}px` }} className="w-2.5 rounded-t-full bg-slate-400/60 rounded-b-sm" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest bg-white/60 backdrop-blur-sm px-2 py-0.5 rounded">
                      {isUk ? "До" : "Before"}
                    </span>
                  </div>
                  {/* After */}
                  <div className={`bg-linear-to-br ${item.afterClass} flex flex-col items-center justify-center relative overflow-hidden border-l border-white/50`}>
                    <div className="flex gap-0.5 mb-3">
                      {[7, 9, 10, 10, 9, 7].map((h, i) => (
                        <div key={i} style={{ height: `${h * 4}px` }} className="w-2.5 rounded-t-full bg-white dark:bg-neutral-800 border border-sky-100 shadow-sm rounded-b-sm" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-sky-600 uppercase tracking-widest bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded">
                      {isUk ? "Після" : "After"}
                    </span>
                    <div className="absolute top-3 right-4 w-1.5 h-1.5 rounded-full bg-sky-300/70" />
                    <div className="absolute top-6 right-7 w-1 h-1 rounded-full bg-sky-200/90" />
                    <div className="absolute bottom-6 left-3 w-1.5 h-1.5 rounded-full bg-sky-200/60" />
                  </div>
                </div>
                <div className="px-5 py-4 border-t border-slate-100">
                  <p className="font-bold text-slate-900 text-sm">{isUk ? item.procedureUk : item.procedureEn}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{isUk ? `Лікар: ${item.doctorUk}` : `Doctor: ${item.doctorEn}`}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Booking ──────────────────────────────────────────────────────── */}
      <section id="booking" className="py-16 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">{isUk ? "Онлайн-запис" : "Online Booking"}</h2>
            <p className="text-slate-500">{isUk ? "Запишіться за 2 хвилини у зручний для вас час" : "Book your visit in 2 minutes at a convenient time"}</p>
          </div>

          {bookingStep === 0 && (
            <div className="text-center">
              <button onClick={() => setBookingStep(1)} className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-10 py-4 rounded-2xl shadow-lg shadow-sky-200/60 text-lg transition-colors">
                {isUk ? "Записатися зараз" : "Book Now"}
              </button>
            </div>
          )}

          {bookingStep > 0 && bookingStep < 5 && (
            <div>
              {/* Progress bar */}
              <div className="flex items-center mb-8">
                {([1, 2, 3, 4] as const).map((step, idx) => (
                  <div key={step} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${bookingStep > step ? "bg-sky-600 text-white" : bookingStep === step ? "bg-sky-600 text-white ring-4 ring-sky-100" : "bg-slate-100 text-slate-400"}`}>
                        {bookingStep > step ? <IconCheck className="w-4 h-4" /> : step}
                      </div>
                      <span className="text-xs text-slate-400 mt-1 hidden sm:block whitespace-nowrap">
                        {step === 1 ? (isUk ? "Послуга" : "Service") : step === 2 ? (isUk ? "Лікар" : "Doctor") : step === 3 ? (isUk ? "Час" : "Date & Time") : (isUk ? "Контакти" : "Contact")}
                      </span>
                    </div>
                    {idx < 3 && <div className={`flex-1 h-0.5 mx-2 mb-4 ${bookingStep > step ? "bg-sky-400" : "bg-slate-200"}`} />}
                  </div>
                ))}
              </div>

              {/* Step 1 — Service */}
              {bookingStep === 1 && (
                <div>
                  <h3 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wide">{isUk ? "Оберіть послугу:" : "Choose a service:"}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {SERVICES.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => { setSelectedService(s.id); setSelectedDoctor(null); setBookingStep(2); }}
                        className={`border-2 rounded-xl p-4 text-center transition-all ${selectedService === s.id ? "border-sky-500 bg-sky-50" : "border-slate-200 hover:border-sky-300 bg-white"}`}
                      >
                        <div className={`w-8 h-8 rounded-lg mx-auto mb-2 flex items-center justify-center ${selectedService === s.id ? "bg-sky-100" : "bg-slate-100"}`}>
                          <s.Icon className={`w-4 h-4 ${selectedService === s.id ? "text-sky-600" : "text-slate-500"}`} />
                        </div>
                        <div className="text-sm font-semibold text-slate-800">{isUk ? s.nameUk : s.nameEn}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2 — Doctor */}
              {bookingStep === 2 && (
                <div>
                  <h3 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wide">{isUk ? "Оберіть лікаря:" : "Choose a doctor:"}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {filteredDoctors.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => { setSelectedDoctor(d.id); setBookingStep(3); }}
                        className={`border-2 rounded-xl p-4 flex items-center gap-3 text-left transition-all ${selectedDoctor === d.id ? "border-sky-500 bg-sky-50" : "border-slate-200 hover:border-sky-300 bg-white"}`}
                      >
                        <div className={`w-10 h-10 rounded-xl ${d.color} flex items-center justify-center text-sm font-bold shrink-0`}>{d.initials}</div>
                        <div>
                          <div className="font-semibold text-sm text-slate-900">{isUk ? d.nameUk : d.nameEn}</div>
                          <div className="text-xs text-sky-600">{isUk ? d.titleUk : d.titleEn}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setBookingStep(1)} className="text-sm text-slate-400 hover:text-slate-600 transition-colors">← {isUk ? "Назад" : "Back"}</button>
                </div>
              )}

              {/* Step 3 — Date & Time */}
              {bookingStep === 3 && (
                <div>
                  <h3 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wide">{isUk ? "Оберіть дату:" : "Choose a date:"}</h3>
                  <div className="flex gap-3 mb-6">
                    {DATES.map((d) => (
                      <button
                        key={d.value}
                        onClick={() => setSelectedDate(d.value)}
                        className={`flex-1 border-2 rounded-xl py-3 text-sm font-semibold transition-colors ${selectedDate === d.value ? "border-sky-500 bg-sky-50 text-sky-700" : "border-slate-200 hover:border-sky-300 text-slate-700"}`}
                      >
                        {isUk ? d.labelUk : d.labelEn}
                      </button>
                    ))}
                  </div>
                  <h3 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wide">{isUk ? "Оберіть час:" : "Choose a time:"}</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {TIME_SLOTS.map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className={`border-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${selectedTime === t ? "border-sky-500 bg-sky-50 text-sky-700" : "border-slate-200 hover:border-sky-300 text-slate-700"}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <button onClick={() => setBookingStep(2)} className="text-sm text-slate-400 hover:text-slate-600 transition-colors">← {isUk ? "Назад" : "Back"}</button>
                    <button
                      disabled={!selectedDate || !selectedTime}
                      onClick={() => setBookingStep(4)}
                      className="bg-sky-600 hover:bg-sky-700 disabled:bg-slate-200 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
                    >
                      {isUk ? "Далі →" : "Next →"}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4 — Contact */}
              {bookingStep === 4 && (
                <div>
                  <h3 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wide">{isUk ? "Ваші контакти:" : "Your contact details:"}</h3>
                  <div className="space-y-3 mb-6">
                    <input
                      type="text"
                      placeholder={isUk ? "Ваше ім'я" : "Your name"}
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all"
                    />
                    <input
                      type="tel"
                      placeholder={isUk ? "Номер телефону" : "Phone number"}
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all"
                    />
                    <textarea
                      rows={3}
                      placeholder={isUk ? "Додаткова інформація (необов'язково)" : "Additional info (optional)"}
                      value={contactNote}
                      onChange={(e) => setContactNote(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all resize-none"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <button onClick={() => setBookingStep(3)} className="text-sm text-slate-400 hover:text-slate-600 transition-colors">← {isUk ? "Назад" : "Back"}</button>
                    <button
                      disabled={!contactName || !contactPhone}
                      onClick={() => setBookingStep(5)}
                      className="bg-sky-600 hover:bg-sky-700 disabled:bg-slate-200 disabled:cursor-not-allowed text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
                    >
                      {isUk ? "Підтвердити запис" : "Confirm Appointment"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Confirmation */}
          {bookingStep === 5 && (
            <div className="text-center bg-emerald-50 border border-emerald-200 rounded-2xl p-10">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <IconCheck className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-emerald-900 mb-2">{isUk ? "Запис прийнято!" : "Appointment confirmed!"}</h3>
              <p className="text-emerald-700 text-sm mb-1">{isUk ? "Ми підтвердимо запис по телефону протягом 15 хвилин." : "We'll confirm your appointment by phone within 15 minutes."}</p>
              <button
                onClick={() => { setBookingStep(0); setSelectedService(null); setSelectedDoctor(null); setSelectedDate(null); setSelectedTime(null); setContactName(""); setContactPhone(""); setContactNote(""); }}
                className="mt-5 text-emerald-700 hover:text-emerald-900 text-sm font-medium underline transition-colors"
              >
                {isUk ? "Записатись ще раз" : "Book another appointment"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Reviews ──────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-sky-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">{isUk ? "Відгуки пацієнтів" : "Patient Reviews"}</h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="text-amber-400 text-lg tracking-widest">★★★★★</span>
              <span className="font-bold text-slate-900">4.9</span>
              <span className="text-slate-400 text-sm">· {isUk ? "245 відгуків Google" : "245 Google reviews"}</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {REVIEWS.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sm font-bold text-sky-700 shrink-0">
                    {(isUk ? r.nameUk : r.nameEn).charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{isUk ? r.nameUk : r.nameEn}</div>
                    <div className="text-amber-400 text-xs">{"★".repeat(r.rating)}</div>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">&ldquo;{isUk ? r.textUk : r.textEn}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">{isUk ? "Часті запитання" : "Frequently Asked Questions"}</h2>
            <p className="text-slate-500">{isUk ? "Відповіді на найпоширеніші питання наших пацієнтів" : "Answers to the most common patient questions"}</p>
          </div>
          <div className="space-y-2">
            {FAQ.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className={`border rounded-xl overflow-hidden transition-colors ${isOpen ? "border-sky-200" : "border-slate-200"}`}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-semibold text-slate-800 text-sm pr-4">{isUk ? faq.qUk : faq.qEn}</span>
                    <IconChevron open={isOpen} className="w-5 h-5 text-sky-500 shrink-0" />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-sm text-slate-600 border-t border-slate-100 pt-3 leading-relaxed">
                      {isUk ? faq.aUk : faq.aEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Certifications ───────────────────────────────────────────────── */}
      <section className="py-10 px-4 bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
            {isUk ? "Сертифікати та партнери" : "Certificates & Partners"}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {CERTS.map((label) => (
              <span key={label} className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm hover:shadow-md hover:border-sky-200 transition-all">
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="bg-slate-900 text-slate-400 py-14 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center shrink-0">
                <IconTooth className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold text-lg">DentaLux</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              {isUk ? "Ваша посмішка — наша місія. Преміум стоматологія з 2011 року." : "Your smile — our mission. Premium dentistry since 2011."}
            </p>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0" />
              <span className="text-xs text-emerald-400">{isUk ? "Зараз відкрито" : "Currently open"}</span>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">{isUk ? "Послуги" : "Services"}</h4>
            <ul className="space-y-2 text-sm">
              {SERVICES.map((s) => (
                <li key={s.id} className="hover:text-white transition-colors cursor-pointer">{isUk ? s.nameUk : s.nameEn}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">{isUk ? "Контакти" : "Contacts"}</h4>
            <div className="space-y-2.5 text-sm">
              <p>{isUk ? "вул. Сумська, 45, Київ" : "45 Sumska St, Kyiv"}</p>
              <p>+38 (050) 123-45-67</p>
              <p>info@dentalux.ua</p>
              <p className="text-sky-400 font-medium">dentalux.ua</p>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">{isUk ? "Графік роботи" : "Working Hours"}</h4>
            <div className="space-y-2.5 text-sm">
              <p>{isUk ? "Пн–Пт: 9:00–20:00" : "Mon–Fri: 9:00–20:00"}</p>
              <p>{isUk ? "Сб: 9:00–17:00" : "Sat: 9:00–17:00"}</p>
              <p>{isUk ? "Нд: вихідний" : "Sun: closed"}</p>
            </div>
            <div className="mt-5 bg-sky-600/20 border border-sky-600/30 rounded-lg px-3 py-2 text-xs text-sky-300">
              ISO 9001:2015 Certified
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>© 2026 DentaLux. {isUk ? "Усі права захищені." : "All rights reserved."}</p>
          <p>{isUk ? "Ліцензія МОЗ України №АВ 123456" : "MOH Ukraine License #АВ 123456"}</p>
        </div>
      </footer>
    </div>
  );
}
