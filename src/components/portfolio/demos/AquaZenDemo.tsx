"use client";

import { useState } from "react";

export function AquaZenDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [duration, setDuration] = useState<number | null>(null);
  const [treatment, setTreatment] = useState<string | null>(null);
  const [atmosphere, setAtmosphere] = useState<string | null>(null);

  const [giftAmount, setGiftAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [giftDelivery, setGiftDelivery] = useState<"email" | "physical" | null>(null);
  const [recipientName, setRecipientName] = useState("");
  const [giftMessage, setGiftMessage] = useState("");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const durations = [
    { minutes: 60, price: 900 },
    { minutes: 90, price: 1300 },
    { minutes: 120, price: 1800 },
    { minutes: 180, price: 2600 },
  ];

  const treatments = [
    { id: "massage", uk: "Масаж тіла", en: "Body Massage" },
    { id: "wrap", uk: "Обгортання", en: "Body Wrap" },
    { id: "aroma", uk: "Арома-терапія", en: "Aromatherapy" },
    { id: "float", uk: "Флоатинг", en: "Floating" },
    { id: "detox", uk: "Детокс", en: "Detox" },
  ];

  const atmospheres = [
    { id: "romantic", uk: "Романтична", en: "Romantic" },
    { id: "recovery", uk: "Відновлення", en: "Recovery" },
    { id: "antistress", uk: "Антистрес", en: "Anti-stress" },
    { id: "vip", uk: "VIP-приватна", en: "VIP Private" },
  ];

  const ritualReady = duration !== null && treatment !== null && atmosphere !== null;
  const ritualPrice = duration !== null ? durations.find((d) => d.minutes === duration)?.price ?? 0 : 0;

  const giftPresets = [500, 1000, 2000, 3000];

  const navLinks = [
    { uk: "Послуги", en: "Services" },
    { uk: "Ритуали", en: "Rituals" },
    { uk: "Членство", en: "Membership" },
    { uk: "Подарунок", en: "Gift" },
    { uk: "Бронювання", en: "Book" },
  ];

  const reviews = [
    {
      name: "Олена Романенко",
      procedureUk: "Масаж тіла 90 хв",
      procedureEn: "Body Massage 90 min",
      stars: 5,
      textUk: "Неймовірний досвід. Після масажу відчула себе наново народженою. Персонал уважний, атмосфера абсолютно розслабляюча. Повертаюсь вже вдруге і точно ще прийду.",
      textEn: "An incredible experience. After the massage I felt reborn. The staff are attentive, the atmosphere is absolutely relaxing. I'm back for the second time and will definitely return.",
      date: "12 березня 2026",
    },
    {
      name: "Андрій Ковальчук",
      procedureUk: "Арома-терапія 120 хв",
      procedureEn: "Aromatherapy 120 min",
      stars: 5,
      textUk: "Подарував дружині сертифікат — вона в захваті. Самому теж пощастило відвідати флоатинг. Відчуття невагомості неможливо описати словами. Топ-заклад у Києві.",
      textEn: "I gave my wife a gift certificate — she was thrilled. I also got to try floating. The feeling of weightlessness is indescribable. The top wellness venue in Kyiv.",
      date: "5 лютого 2026",
    },
    {
      name: "Марина Шевченко",
      procedureUk: "Детокс + Обгортання 180 хв",
      procedureEn: "Detox + Body Wrap 180 min",
      stars: 5,
      textUk: "Нарешті знайшла місце, де можна по-справжньому відпочити від міського шуму. Програма детоксу перевершила очікування. Шкіра сяє, голова ясна. Дякую команді AquaZen!",
      textEn: "I finally found a place where you can truly escape the city noise. The detox program exceeded my expectations. Glowing skin, clear mind. Thank you AquaZen team!",
      date: "18 січня 2026",
    },
    {
      name: "Тарас Мельник",
      procedureUk: "Флоатинг 60 хв",
      procedureEn: "Floating 60 min",
      stars: 5,
      textUk: "Як тільки зайшов — зрозумів, що це особливе місце. Інтер'єр розкішний, чистота ідеальна. Флоатинг — це медитація нового рівня. Обов'язково буду з Gold-карткою.",
      textEn: "As soon as I walked in I knew this was a special place. Luxurious interior, perfect cleanliness. Floating is meditation at a new level. I'll definitely be back with a Gold card.",
      date: "29 грудня 2025",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-cyan-100 overflow-x-hidden">

      {/* ── NAVBAR ─────────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-2xl font-bold tracking-tight text-teal-400">
            Aqua<span className="text-white">Zen</span>
          </span>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.en}
                className="text-sm text-slate-400 hover:text-teal-400 transition-colors duration-200"
              >
                {isUk ? link.uk : link.en}
              </button>
            ))}
          </div>
          <button className="hidden md:block bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold text-sm px-5 py-2 rounded-full transition-colors duration-200">
            {isUk ? "Забронювати" : "Book Now"}
          </button>
          <button
            className="md:hidden text-slate-400 hover:text-teal-400 transition-colors"
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-slate-800 px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.en}
                className="text-sm text-slate-300 hover:text-teal-400 text-left transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {isUk ? link.uk : link.en}
              </button>
            ))}
            <button className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold text-sm px-5 py-2 rounded-full w-fit transition-colors">
              {isUk ? "Забронювати" : "Book Now"}
            </button>
          </div>
        )}
      </nav>

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(20,184,166,0.15) 0%, rgba(15,23,42,0) 70%)",
          }}
        />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg
            className="absolute bottom-0 left-0 w-full opacity-10"
            viewBox="0 0 1440 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M0 100 C240 60 480 140 720 100 C960 60 1200 140 1440 100 L1440 200 L0 200 Z"
              fill="#14b8a6"
            />
          </svg>
          <svg
            className="absolute bottom-8 left-0 w-full opacity-5"
            viewBox="0 0 1440 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M0 120 C240 80 480 160 720 120 C960 80 1200 160 1440 120 L1440 200 L0 200 Z"
              fill="#06b6d4"
            />
          </svg>
          <svg
            className="absolute top-24 left-0 w-full opacity-5"
            viewBox="0 0 1440 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M0 80 C360 40 720 120 1080 80 C1260 60 1380 90 1440 80"
              stroke="#14b8a6"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-block mb-6 text-xs uppercase tracking-[0.3em] text-teal-400 font-medium border border-teal-400/30 px-4 py-1.5 rounded-full bg-teal-400/5">
            {isUk ? "Преміальний Велнес Центр · Київ" : "Premium Wellness Center · Kyiv"}
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6 text-white">
            {isUk ? "Простір" : "Space of"}
            <br />
            <span className="text-teal-400">{isUk ? "Відновлення" : "Renewal"}</span>
          </h1>
          <p className="text-slate-400 text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            {isUk
              ? "AquaZen — це острів спокою у серці Києва. Ексклюзивні spa-ритуали, флоатинг, масажні програми та персональний підхід до кожного гостя."
              : "AquaZen is an island of calm in the heart of Kyiv. Exclusive spa rituals, floating, massage programs, and a personal approach to every guest."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold px-8 py-3.5 rounded-full text-sm transition-colors duration-200 shadow-lg shadow-teal-500/20">
              {isUk ? "Побудувати Ритуал" : "Build Your Ritual"}
            </button>
            <button className="border border-teal-400/40 text-teal-400 hover:bg-teal-400/10 font-semibold px-8 py-3.5 rounded-full text-sm transition-colors duration-200">
              {isUk ? "Переглянути Послуги" : "View Services"}
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

      {/* ── RITUAL BUILDER ────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-[0.3em] text-teal-400 font-medium">
              {isUk ? "Персоналізований досвід" : "Personalized experience"}
            </span>
            <h2 className="mt-3 text-4xl font-bold text-white">
              {isUk ? "Побудуй Свій Ритуал" : "Build Your Ritual"}
            </h2>
            <p className="mt-3 text-slate-400 text-base max-w-md mx-auto">
              {isUk
                ? "Оберіть тривалість, процедуру та атмосферу — і ми підготуємо ідеальний досвід для вас."
                : "Choose duration, treatment, and atmosphere — and we'll prepare the perfect experience for you."}
            </p>
          </div>

          <div className="space-y-10">
            {/* Step 1 – Duration */}
            <div className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700/50">
              <p className="text-sm font-semibold text-teal-400 uppercase tracking-widest mb-5">
                01 — {isUk ? "Тривалість" : "Duration"}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {durations.map((d) => (
                  <button
                    key={d.minutes}
                    onClick={() => setDuration(d.minutes)}
                    className={`py-4 px-3 rounded-xl text-sm font-medium border transition-all duration-200 flex flex-col items-center gap-1 ${
                      duration === d.minutes
                        ? "bg-teal-500 border-teal-400 text-slate-950"
                        : "bg-slate-900/60 border-slate-700 text-slate-300 hover:border-teal-500/50 hover:text-teal-300"
                    }`}
                  >
                    <span className="text-lg font-bold">{d.minutes}</span>
                    <span className="text-xs opacity-75">{isUk ? "хвилин" : "minutes"}</span>
                    <span className={`text-xs mt-1 font-semibold ${duration === d.minutes ? "text-slate-800" : "text-teal-400"}`}>
                      {d.price}₴
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2 – Treatment */}
            <div className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700/50">
              <p className="text-sm font-semibold text-teal-400 uppercase tracking-widest mb-5">
                02 — {isUk ? "Процедура" : "Treatment"}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {treatments.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTreatment(t.id)}
                    className={`py-3.5 px-5 rounded-xl text-sm font-medium border text-left transition-all duration-200 ${
                      treatment === t.id
                        ? "bg-teal-500 border-teal-400 text-slate-950"
                        : "bg-slate-900/60 border-slate-700 text-slate-300 hover:border-teal-500/50 hover:text-teal-300"
                    }`}
                  >
                    {isUk ? t.uk : t.en}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3 – Atmosphere */}
            <div className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700/50">
              <p className="text-sm font-semibold text-teal-400 uppercase tracking-widest mb-5">
                03 — {isUk ? "Атмосфера" : "Atmosphere"}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {atmospheres.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setAtmosphere(a.id)}
                    className={`py-4 px-3 rounded-xl text-sm font-medium border transition-all duration-200 text-center ${
                      atmosphere === a.id
                        ? "bg-teal-500 border-teal-400 text-slate-950"
                        : "bg-slate-900/60 border-slate-700 text-slate-300 hover:border-teal-500/50 hover:text-teal-300"
                    }`}
                  >
                    {isUk ? a.uk : a.en}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary & CTA */}
            <div
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                ritualReady
                  ? "border-teal-500/50 bg-gradient-to-r from-teal-950/60 to-slate-900/60"
                  : "border-slate-700/30 bg-slate-800/30"
              }`}
            >
              <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  {ritualReady ? (
                    <>
                      <p className="text-xs text-teal-400 uppercase tracking-widest font-medium mb-2">
                        {isUk ? "Ваш ритуал готовий" : "Your ritual is ready"}
                      </p>
                      <p className="text-slate-300 text-sm">
                        {duration} {isUk ? "хвилин" : "min"} &bull;{" "}
                        {isUk
                          ? treatments.find((t) => t.id === treatment)?.uk
                          : treatments.find((t) => t.id === treatment)?.en}{" "}
                        &bull;{" "}
                        {isUk
                          ? atmospheres.find((a) => a.id === atmosphere)?.uk
                          : atmospheres.find((a) => a.id === atmosphere)?.en}
                      </p>
                    </>
                  ) : (
                    <p className="text-slate-500 text-sm">
                      {isUk
                        ? "Оберіть усі три параметри для продовження"
                        : "Select all three options to continue"}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-5">
                  {ritualReady && (
                    <div className="text-right">
                      <p className="text-xs text-slate-500 mb-0.5">{isUk ? "Вартість" : "Price"}</p>
                      <p className="text-2xl font-bold text-teal-400">{ritualPrice}₴</p>
                    </div>
                  )}
                  <button
                    disabled={!ritualReady}
                    className={`px-7 py-3 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                      ritualReady
                        ? "bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-lg shadow-teal-500/20"
                        : "bg-slate-700 text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    {isUk ? "Забронювати Ритуал" : "Book Ritual"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MEMBERSHIP CARDS ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-slate-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-[0.3em] text-teal-400 font-medium">
              {isUk ? "Привілеї для постійних гостей" : "Privileges for regular guests"}
            </span>
            <h2 className="mt-3 text-4xl font-bold text-white">
              {isUk ? "Клубна Картка" : "Membership Card"}
            </h2>
            <p className="mt-3 text-slate-400 text-base max-w-md mx-auto">
              {isUk
                ? "Станьте частиною клубу AquaZen і насолоджуйтесь ексклюзивними привілеями щомісяця."
                : "Join the AquaZen club and enjoy exclusive privileges every month."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Silver */}
            <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-7 flex flex-col">
              <div className="mb-6">
                <p className="text-xs uppercase tracking-widest text-slate-500 font-medium mb-2">Silver</p>
                <p className="text-3xl font-bold text-white">
                  1500<span className="text-lg font-normal text-slate-400">₴/{isUk ? "міс" : "mo"}</span>
                </p>
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {[
                  isUk ? "2 відвідування / місяць" : "2 visits / month",
                  isUk ? "-10% на всі послуги" : "-10% on all services",
                  isUk ? "Безкоштовний трав'яний чай" : "Complimentary herbal tea",
                  isUk ? "Пріоритетний запис" : "Priority booking",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-400">
                    <span className="mt-0.5 w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full border border-slate-600 hover:border-teal-500/50 hover:text-teal-400 text-slate-300 text-sm font-semibold py-3 rounded-full transition-colors duration-200">
                {isUk ? "Оформити картку" : "Get Card"}
              </button>
            </div>

            {/* Gold – highlighted */}
            <div className="relative bg-slate-900 border-2 border-teal-500 rounded-2xl p-7 flex flex-col shadow-xl shadow-teal-500/10">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="bg-teal-500 text-slate-950 text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                  {isUk ? "Популярний" : "Most Popular"}
                </span>
              </div>
              <div className="mb-6">
                <p className="text-xs uppercase tracking-widest text-teal-400 font-medium mb-2">Gold</p>
                <p className="text-3xl font-bold text-white">
                  2800<span className="text-lg font-normal text-slate-400">₴/{isUk ? "міс" : "mo"}</span>
                </p>
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {[
                  isUk ? "5 відвідувань / місяць" : "5 visits / month",
                  isUk ? "-20% на всі послуги" : "-20% on all services",
                  isUk ? "Пріоритетне бронювання" : "Priority reservation",
                  isUk ? "Безкоштовний аромачай" : "Complimentary aroma tea",
                  isUk ? "Доступ до зони релаксації" : "Relaxation zone access",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="mt-0.5 w-4 h-4 rounded-full bg-teal-500/20 border border-teal-400 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 text-sm font-bold py-3 rounded-full transition-colors duration-200 shadow-lg shadow-teal-500/20">
                {isUk ? "Оформити картку" : "Get Card"}
              </button>
            </div>

            {/* Platinum */}
            <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-7 flex flex-col">
              <div className="mb-6">
                <p className="text-xs uppercase tracking-widest text-cyan-300 font-medium mb-2">Platinum</p>
                <p className="text-3xl font-bold text-white">
                  4500<span className="text-lg font-normal text-slate-400">₴/{isUk ? "міс" : "mo"}</span>
                </p>
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {[
                  isUk ? "Необмежена кількість відвідувань" : "Unlimited visits",
                  isUk ? "-30% на всі послуги" : "-30% on all services",
                  isUk ? "Персональний ритуал-програма" : "Personal ritual program",
                  isUk ? "Доступ до VIP-зони" : "VIP zone access",
                  isUk ? "Менеджер облікового запису" : "Dedicated account manager",
                  isUk ? "Пріоритетний запис 24/7" : "Priority booking 24/7",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-400">
                    <span className="mt-0.5 w-4 h-4 rounded-full border border-cyan-400/40 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full border border-cyan-400/40 hover:border-cyan-400 hover:text-cyan-300 text-slate-300 text-sm font-semibold py-3 rounded-full transition-colors duration-200">
                {isUk ? "Оформити картку" : "Get Card"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── GIFT CERTIFICATES ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-teal-950/30">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.3em] text-teal-400 font-medium">
              {isUk ? "Ідеальний подарунок" : "The perfect gift"}
            </span>
            <h2 className="mt-3 text-4xl font-bold text-white">
              {isUk ? "Подарунковий Сертифікат" : "Gift Certificate"}
            </h2>
            <p className="mt-3 text-slate-400 text-base max-w-md mx-auto">
              {isUk
                ? "Подаруйте близьким годину відновлення та спокою. Сертифікат діє 6 місяців від дати покупки."
                : "Give your loved ones an hour of renewal and peace. Certificate valid for 6 months from purchase date."}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-8 space-y-7">
            {/* Amount presets */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
                {isUk ? "Сума сертифіката" : "Certificate Amount"}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                {giftPresets.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => { setGiftAmount(amt); setCustomAmount(""); }}
                    className={`py-3 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                      giftAmount === amt && !customAmount
                        ? "bg-teal-500 border-teal-400 text-slate-950"
                        : "bg-slate-800 border-slate-700 text-slate-300 hover:border-teal-500/50 hover:text-teal-300"
                    }`}
                  >
                    {amt}₴
                  </button>
                ))}
              </div>
              <input
                type="number"
                placeholder={isUk ? "Інша сума (₴)" : "Custom amount (₴)"}
                value={customAmount}
                onChange={(e) => { setCustomAmount(e.target.value); setGiftAmount(null); }}
                className="w-full bg-slate-800 border border-slate-700 hover:border-slate-600 focus:border-teal-500 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
              />
            </div>

            {/* Delivery */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
                {isUk ? "Спосіб доставки" : "Delivery Method"}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(["email", "physical"] as const).map((method) => (
                  <button
                    key={method}
                    onClick={() => setGiftDelivery(method)}
                    className={`py-3.5 px-4 rounded-xl text-sm font-medium border text-center transition-all duration-200 ${
                      giftDelivery === method
                        ? "bg-teal-500 border-teal-400 text-slate-950"
                        : "bg-slate-800 border-slate-700 text-slate-300 hover:border-teal-500/50 hover:text-teal-300"
                    }`}
                  >
                    {method === "email"
                      ? "Email"
                      : isUk
                      ? "Фізична карта"
                      : "Physical Card"}
                  </button>
                ))}
              </div>
            </div>

            {/* Recipient */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
                {isUk ? "Одержувач" : "Recipient"}
              </label>
              <input
                type="text"
                placeholder={isUk ? "Ім'я одержувача" : "Recipient name"}
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 hover:border-slate-600 focus:border-teal-500 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors mb-3"
              />
              <textarea
                rows={3}
                placeholder={isUk ? "Персональне побажання (необов'язково)" : "Personal message (optional)"}
                value={giftMessage}
                onChange={(e) => setGiftMessage(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 hover:border-slate-600 focus:border-teal-500 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-none"
              />
            </div>

            {/* Summary */}
            {(giftAmount || customAmount) && giftDelivery && (
              <div className="flex items-center justify-between bg-teal-950/40 border border-teal-500/20 rounded-xl px-5 py-4">
                <span className="text-sm text-slate-400">
                  {isUk ? "Сума:" : "Amount:"}
                </span>
                <span className="text-xl font-bold text-teal-400">
                  {customAmount ? customAmount : giftAmount}₴
                </span>
              </div>
            )}

            <button className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold py-4 rounded-full text-sm transition-colors duration-200 shadow-lg shadow-teal-500/20">
              {isUk ? "Замовити Сертифікат" : "Order Certificate"}
            </button>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ───────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-slate-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-[0.3em] text-teal-400 font-medium">
              {isUk ? "Досвід наших гостей" : "Guest experiences"}
            </span>
            <h2 className="mt-3 text-4xl font-bold text-white">
              {isUk ? "Відгуки" : "Reviews"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reviews.map((r) => (
              <div
                key={r.name}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-white text-sm">{r.name}</p>
                    <p className="text-xs text-teal-400 mt-0.5">
                      {isUk ? r.procedureUk : r.procedureEn}
                    </p>
                  </div>
                  <div className="flex gap-0.5 flex-shrink-0">
                    {Array.from({ length: r.stars }).map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed flex-1">
                  {isUk ? r.textUk : r.textEn}
                </p>
                <p className="text-xs text-slate-600">{r.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────────── */}
      <footer className="bg-slate-900 border-t border-slate-800 py-14 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <span className="text-2xl font-bold text-teal-400">
              Aqua<span className="text-white">Zen</span>
            </span>
            <p className="mt-4 text-slate-500 text-sm leading-relaxed max-w-xs">
              {isUk
                ? "Преміальний велнес-центр у Києві. Місце, де тіло відпочиває, а розум знаходить спокій."
                : "Premium wellness center in Kyiv. A place where the body rests and the mind finds calm."}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-slate-500 font-medium mb-5">
              {isUk ? "Контакти" : "Contact"}
            </p>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{isUk ? "вул. Хрещатик, 12, Київ, 01001" : "12 Khreshchatyk St, Kyiv, 01001"}</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +38 (044) 234-56-78
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                hello@aquazen.ua
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-slate-500 font-medium mb-5">
              {isUk ? "Графік роботи" : "Working Hours"}
            </p>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {isUk ? "Щодня 9:00 – 22:00" : "Every day 9:00 – 22:00"}
              </li>
              <li className="text-slate-600 text-xs mt-1">
                {isUk ? "Бронювання цілодобово" : "Reservations 24/7"}
              </li>
            </ul>
            <div className="mt-8">
              <p className="text-xs uppercase tracking-widest text-slate-500 font-medium mb-4">
                {isUk ? "Соцмережі" : "Social"}
              </p>
              <div className="flex gap-3">
                {["Instagram", "Facebook", "Telegram"].map((s) => (
                  <button
                    key={s}
                    className="text-xs bg-slate-800 hover:bg-teal-500/20 hover:text-teal-400 text-slate-500 border border-slate-700 hover:border-teal-500/50 px-3 py-1.5 rounded-full transition-colors duration-200"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © 2026 AquaZen. {isUk ? "Всі права захищено." : "All rights reserved."}
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
