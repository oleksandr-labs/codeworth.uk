"use client";

import { useState } from "react";

interface Props { lang: string; }

const PROGRAMS = [
  {
    id: 1,
    emoji: "📚",
    nameEn: "Children's Education",
    nameUk: "Дитяча освіта",
    descEn: "Providing learning materials, tutoring, and after-school programs for children in underserved communities across Ukraine.",
    descUk: "Забезпечення навчальними матеріалами, репетиторством та позашкільними програмами для дітей з малозабезпечених громад по всій Україні.",
    funded: 82,
    targetEn: "₴450,000 goal",
    targetUk: "Мета: ₴450,000",
  },
  {
    id: 2,
    emoji: "🏥",
    nameEn: "Medical Aid",
    nameUk: "Медична допомога",
    descEn: "Delivering essential medical supplies, supporting rural clinics, and funding critical treatments for those in need.",
    descUk: "Доставка медичних засобів першої необхідності, підтримка сільських клінік та фінансування критичного лікування для потребуючих.",
    funded: 67,
    targetEn: "₴780,000 goal",
    targetUk: "Мета: ₴780,000",
  },
  {
    id: 3,
    emoji: "🏘️",
    nameEn: "Community Development",
    nameUk: "Розвиток громад",
    descEn: "Building community centers, supporting local businesses, and creating safe spaces for families to gather and grow together.",
    descUk: "Будівництво громадських центрів, підтримка місцевого бізнесу та створення безпечних місць для сімей.",
    funded: 45,
    targetEn: "₴1,200,000 goal",
    targetUk: "Мета: ₴1,200,000",
  },
  {
    id: 4,
    emoji: "🚨",
    nameEn: "Emergency Relief",
    nameUk: "Екстрена допомога",
    descEn: "Rapid response to emergencies — providing shelter, food, water, and psychological support to affected families.",
    descUk: "Швидке реагування на надзвичайні ситуації — надання притулку, їжі, води та психологічної підтримки постраждалим сім'ям.",
    funded: 91,
    targetEn: "₴600,000 goal",
    targetUk: "Мета: ₴600,000",
  },
];

const PRESET_AMOUNTS = [100, 250, 500, 1000];

const VOLUNTEER_ROLES = [
  {
    emoji: "🤝",
    titleEn: "Field Helper",
    titleUk: "Польовий помічник",
    timeEn: "8-12 hours/week",
    timeUk: "8-12 годин/тиждень",
    skillsEn: "Communication, empathy, physical fitness",
    skillsUk: "Комунікація, емпатія, фізична витривалість",
    descEn: "Work directly with communities, distribute aid, and support on-the-ground program operations.",
    descUk: "Працюйте безпосередньо з громадами, розподіляйте допомогу та підтримуйте програмні операції на місцях.",
  },
  {
    emoji: "🎉",
    titleEn: "Event Organizer",
    titleUk: "Організатор подій",
    timeEn: "5-8 hours/week",
    timeUk: "5-8 годин/тиждень",
    skillsEn: "Planning, creativity, leadership",
    skillsUk: "Планування, креативність, лідерство",
    descEn: "Plan and execute fundraising events, charity galas, community gatherings, and awareness campaigns.",
    descUk: "Плануйте та проводьте благодійні заходи, гала-вечори, громадські зібрання та кампанії з підвищення обізнаності.",
  },
  {
    emoji: "💻",
    titleEn: "Online Supporter",
    titleUk: "Онлайн-підтримка",
    timeEn: "3-5 hours/week",
    timeUk: "3-5 годин/тиждень",
    skillsEn: "Social media, writing, design",
    skillsUk: "Соціальні мережі, написання текстів, дизайн",
    descEn: "Help with social media management, content creation, donor communications, and digital outreach.",
    descUk: "Допомагайте з управлінням соціальними мережами, створенням контенту, комунікацією з донорами та цифровим охопленням.",
  },
];

const NEWS = [
  {
    date: "2026-03-20",
    titleEn: "Spring Campaign Reaches ₴500,000 Milestone",
    titleUk: "Весняна кампанія досягла позначки ₴500,000",
    excerptEn: "Our annual spring fundraiser has exceeded expectations, reaching half a million hryvnias in just three weeks. Thank you to all our generous donors!",
    excerptUk: "Наша щорічна весняна благодійна акція перевершила очікування, досягнувши півмільйона гривень лише за три тижні. Дякуємо всім щедрим донорам!",
  },
  {
    date: "2026-03-12",
    titleEn: "New Community Center Opens in Vinnytsia",
    titleUk: "Новий громадський центр відкрито у Вінниці",
    excerptEn: "After 8 months of construction, the DobroUA community center in Vinnytsia is now open, serving over 200 families in the region.",
    excerptUk: "Після 8 місяців будівництва громадський центр DobroUA у Вінниці тепер відкритий і обслуговує понад 200 сімей у регіоні.",
  },
  {
    date: "2026-03-05",
    titleEn: "Medical Supplies Delivered to 15 Rural Clinics",
    titleUk: "Медичні засоби доставлені до 15 сільських клінік",
    excerptEn: "Our medical aid program successfully delivered essential supplies to 15 clinics across Kharkiv, Sumy, and Poltava oblasts.",
    excerptUk: "Наша програма медичної допомоги успішно доставила необхідні засоби до 15 клінік у Харківській, Сумській та Полтавській областях.",
  },
];

const PARTNERS = [
  { name: "UNICEF Ukraine", emoji: "🌐" },
  { name: "Red Cross", emoji: "🏥" },
  { name: "PrivatBank", emoji: "🏦" },
  { name: "Ukrposhta", emoji: "📮" },
  { name: "Nova Poshta", emoji: "📦" },
  { name: "Kyiv IT Hub", emoji: "💡" },
];

const ALLOCATION = [
  { labelEn: "Programs", labelUk: "Програми", pct: 75, color: "bg-yellow-400" },
  { labelEn: "Administration", labelUk: "Адміністрування", pct: 10, color: "bg-blue-800" },
  { labelEn: "Fundraising", labelUk: "Фандрейзинг", pct: 15, color: "bg-amber-600" },
];

export function DobroUADemo({ lang }: Props) {
  const isUk = lang === "uk";

  /* ── Donation widget state ── */
  const [donationAmount, setDonationAmount] = useState<number | "">(250);
  const [customAmount, setCustomAmount] = useState("");
  const [isMonthly, setIsMonthly] = useState(false);
  const [donorName, setDonorName] = useState("");
  const [wantReceipt, setWantReceipt] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("visa");
  const [donated, setDonated] = useState(false);

  /* ── Nav state ── */
  const [mobileNav, setMobileNav] = useState(false);

  const navItems = isUk
    ? ["Про нас", "Програми", "Вплив", "Волонтерство", "Донат"]
    : ["About", "Programs", "Impact", "Volunteer", "Donate"];

  const handleDonate = () => {
    const amt = customAmount ? Number(customAmount) : donationAmount;
    if (amt && Number(amt) > 0) {
      setDonated(true);
    }
  };

  const resetDonation = () => {
    setDonated(false);
    setDonationAmount(250);
    setCustomAmount("");
    setDonorName("");
    setWantReceipt(false);
    setIsMonthly(false);
    setPaymentMethod("visa");
  };

  const finalAmount = customAmount ? Number(customAmount) : donationAmount;

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* ════════════════ HEADER ════════════════ */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-yellow-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">💛</span>
            <span className="text-lg font-bold text-[#1e3a5f]">
              DobroUA <span className="hidden sm:inline font-normal text-gray-500">Foundation</span>
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.slice(0, -1).map((item) => (
              <button
                key={item}
                className="text-sm text-gray-600 hover:text-[#1e3a5f] transition-colors font-medium"
              >
                {item}
              </button>
            ))}
            <button className="ml-2 px-5 py-2 bg-[#fbbf24] hover:bg-[#f59e0b] text-[#1e3a5f] font-bold rounded-full text-sm transition-colors shadow-sm">
              {navItems[navItems.length - 1]}
            </button>
          </nav>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-2xl text-[#1e3a5f]"
            onClick={() => setMobileNav(!mobileNav)}
          >
            {mobileNav ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile nav dropdown */}
        {mobileNav && (
          <div className="md:hidden bg-white border-t border-yellow-100 px-4 pb-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item}
                className="block w-full text-left py-2 text-gray-700 hover:text-[#1e3a5f] font-medium"
                onClick={() => setMobileNav(false)}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ════════════════ HERO ════════════════ */}
      <section className="relative bg-linear-to-br from-[#fbbf24] via-amber-400 to-[#f59e0b] py-20 sm:py-28 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-[-60px] right-[-60px] w-60 h-60 bg-white/10 rounded-full" />
        <div className="absolute bottom-[-40px] left-[-40px] w-40 h-40 bg-white/10 rounded-full" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[#1e3a5f]/70 text-sm font-semibold uppercase tracking-widest mb-4">
            {isUk ? "Благодійний фонд" : "Charity Foundation"}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1e3a5f] leading-tight mb-6">
            {isUk ? "Робимо Добро Разом" : "Doing Good Together"}
          </h1>
          <p className="text-lg sm:text-xl text-[#1e3a5f]/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            {isUk
              ? "Ми об'єднуємо небайдужих людей, щоб допомагати тим, хто цього найбільше потребує. Кожна гривня — це крок до кращого майбутнього."
              : "We unite caring people to help those who need it most. Every hryvnia is a step towards a better future for Ukrainian communities."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button className="px-8 py-3.5 bg-[#1e3a5f] hover:bg-[#1e40af] text-white font-bold rounded-full text-lg transition-colors shadow-lg">
              {isUk ? "Зробити внесок" : "Donate Now"} 💛
            </button>
            <button className="px-8 py-3.5 bg-white/90 hover:bg-white text-[#1e3a5f] font-bold rounded-full text-lg transition-colors shadow-lg">
              {isUk ? "Стати волонтером" : "Become a Volunteer"} 🤝
            </button>
          </div>

          {/* Live counter */}
          <div className="inline-flex items-center gap-3 bg-white/30 backdrop-blur rounded-2xl px-6 py-3">
            <span className="text-3xl">📊</span>
            <div className="text-left">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#1e3a5f]">₴2,847,350</p>
              <p className="text-sm text-[#1e3a5f]/70 font-medium">
                {isUk ? "зібрано цього року" : "raised this year"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ MISSION STATEMENT ════════════════ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-4">
            {isUk ? "Наша місія" : "Our Mission"}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-14 text-lg leading-relaxed">
            {isUk
              ? "DobroUA Foundation — це всеукраїнська благодійна організація, що з 2019 року працює над покращенням життя вразливих громад. Ми віримо, що разом ми здатні подолати будь-які виклики."
              : "DobroUA Foundation is a nationwide Ukrainian charity that has been working since 2019 to improve the lives of vulnerable communities. We believe that together, we can overcome any challenge."}
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                emoji: "🔍",
                titleEn: "Transparency",
                titleUk: "Прозорість",
                descEn: "Every donation is tracked and reported. We publish quarterly financial reports so you always know where your money goes.",
                descUk: "Кожен внесок відстежується та звітується. Ми публікуємо щоквартальні фінансові звіти, щоб ви завжди знали, куди йдуть ваші кошти.",
              },
              {
                emoji: "💪",
                titleEn: "Impact",
                titleUk: "Вплив",
                descEn: "We focus on measurable outcomes. Every program has clear goals, metrics, and regular impact assessments.",
                descUk: "Ми зосереджуємося на вимірюваних результатах. Кожна програма має чіткі цілі, метрики та регулярні оцінки впливу.",
              },
              {
                emoji: "🫂",
                titleEn: "Community",
                titleUk: "Громада",
                descEn: "We build bridges between people. Our programs strengthen communities and create lasting connections among volunteers and beneficiaries.",
                descUk: "Ми будуємо мости між людьми. Наші програми зміцнюють громади та створюють тривалі зв'язки між волонтерами та бенефіціарами.",
              },
            ].map((v) => (
              <div
                key={v.titleEn}
                className="bg-amber-50/60 rounded-2xl p-8 text-center border border-amber-100 hover:shadow-lg transition-shadow"
              >
                <span className="text-4xl block mb-4">{v.emoji}</span>
                <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">
                  {isUk ? v.titleUk : v.titleEn}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {isUk ? v.descUk : v.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ PROGRAMS ════════════════ */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-3">
              {isUk ? "Наші програми" : "Our Programs"}
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              {isUk
                ? "Четири напрямки діяльності, що змінюють життя тисяч людей"
                : "Four active programs changing the lives of thousands"}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {PROGRAMS.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-4xl shrink-0">{p.emoji}</span>
                  <div>
                    <h3 className="text-lg font-bold text-[#1e3a5f]">
                      {isUk ? p.nameUk : p.nameEn}
                    </h3>
                    <p className="text-xs text-amber-600 font-semibold mt-0.5">
                      {isUk ? p.targetUk : p.targetEn}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                  {isUk ? p.descUk : p.descEn}
                </p>

                {/* Progress bar */}
                <div className="mb-2">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-500">
                      {isUk ? "Профінансовано" : "Funded"}
                    </span>
                    <span className="font-bold text-[#1e3a5f]">{p.funded}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-br from-[#fbbf24] to-[#f59e0b] rounded-full transition-all"
                      style={{ width: `${p.funded}%` }}
                    />
                  </div>
                </div>

                <button className="mt-4 w-full py-2.5 bg-[#1e3a5f] hover:bg-[#1e40af] text-white text-sm font-semibold rounded-xl transition-colors">
                  {isUk ? "Підтримати програму" : "Support This Program"} →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ DONATION WIDGET ════════════════ */}
      <section className="py-16 sm:py-20 bg-linear-to-br from-[#1e3a5f] to-[#1e40af] text-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              {isUk ? "Зробити внесок" : "Make a Donation"} 💛
            </h2>
            <p className="text-blue-200">
              {isUk
                ? "Ваша підтримка змінює життя. Кожна гривня має значення."
                : "Your support changes lives. Every hryvnia matters."}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 text-gray-800">
            {donated ? (
              /* ── Thank You Confirmation ── */
              <div className="text-center py-8">
                <span className="text-6xl block mb-4">🎉</span>
                <h3 className="text-2xl font-bold text-[#1e3a5f] mb-2">
                  {isUk ? "Дякуємо за ваш внесок!" : "Thank You for Your Donation!"}
                </h3>
                <p className="text-gray-600 mb-2">
                  {donorName && (
                    <span className="font-semibold text-[#1e3a5f]">{donorName}, </span>
                  )}
                  {isUk
                    ? `ваш внесок у розмірі ₴${finalAmount} ${isMonthly ? "(щомісячний)" : "(одноразовий)"} прийнято.`
                    : `your ₴${finalAmount} ${isMonthly ? "(monthly)" : "(one-time)"} donation has been received.`}
                </p>
                {wantReceipt && (
                  <p className="text-sm text-gray-500 mb-4">
                    {isUk
                      ? "Квитанцію буде надіслано на вашу електронну пошту."
                      : "A receipt will be sent to your email."}
                  </p>
                )}
                <p className="text-amber-600 font-medium text-sm mb-6">
                  {isUk
                    ? "Разом ми робимо добро! 💛"
                    : "Together we do good! 💛"}
                </p>
                <button
                  onClick={resetDonation}
                  className="px-6 py-2.5 bg-[#fbbf24] hover:bg-[#f59e0b] text-[#1e3a5f] font-bold rounded-full transition-colors"
                >
                  {isUk ? "Зробити ще один внесок" : "Make Another Donation"}
                </button>
              </div>
            ) : (
              <>
                {/* One-time / Monthly toggle */}
                <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
                  <button
                    onClick={() => setIsMonthly(false)}
                    className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
                      !isMonthly
                        ? "bg-[#1e3a5f] text-white shadow"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {isUk ? "Одноразово" : "One-time"}
                  </button>
                  <button
                    onClick={() => setIsMonthly(true)}
                    className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
                      isMonthly
                        ? "bg-[#1e3a5f] text-white shadow"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {isUk ? "Щомісячно" : "Monthly"} ♻️
                  </button>
                </div>

                {/* Preset amounts */}
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {PRESET_AMOUNTS.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => {
                        setDonationAmount(amt);
                        setCustomAmount("");
                      }}
                      className={`py-3 rounded-xl text-sm font-bold transition-colors border-2 ${
                        donationAmount === amt && !customAmount
                          ? "border-[#fbbf24] bg-amber-50 text-[#1e3a5f]"
                          : "border-gray-200 text-gray-600 hover:border-amber-300"
                      }`}
                    >
                      ₴{amt}
                    </button>
                  ))}
                </div>

                {/* Custom amount */}
                <div className="mb-5">
                  <label className="text-xs text-gray-500 font-medium mb-1 block">
                    {isUk ? "Або введіть свою суму (₴)" : "Or enter custom amount (₴)"}
                  </label>
                  <input
                    type="number"
                    min="1"
                    placeholder={isUk ? "Інша сума..." : "Custom amount..."}
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setDonationAmount("");
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:border-[#fbbf24] focus:outline-none transition-colors"
                  />
                </div>

                {/* Donor name */}
                <div className="mb-4">
                  <label className="text-xs text-gray-500 font-medium mb-1 block">
                    {isUk ? "Ваше ім'я (необов'язково)" : "Your name (optional)"}
                  </label>
                  <input
                    type="text"
                    placeholder={isUk ? "Анонімний донор" : "Anonymous donor"}
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-[#fbbf24] focus:outline-none transition-colors"
                  />
                </div>

                {/* Receipt checkbox */}
                <label className="flex items-center gap-2 mb-6 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={wantReceipt}
                    onChange={(e) => setWantReceipt(e.target.checked)}
                    className="w-4 h-4 accent-[#fbbf24]"
                  />
                  <span className="text-sm text-gray-600">
                    {isUk ? "Я хочу отримати квитанцію" : "I want a receipt"}
                  </span>
                </label>

                {/* Payment method */}
                <div className="mb-6">
                  <p className="text-xs text-gray-500 font-medium mb-2">
                    {isUk ? "Спосіб оплати" : "Payment method"}
                  </p>
                  <div className="flex gap-3">
                    {[
                      { id: "visa", label: "💳 Visa" },
                      { id: "mc", label: "💳 MC" },
                      { id: "privat", label: "🏦 PrivatBank" },
                    ].map((pm) => (
                      <button
                        key={pm.id}
                        onClick={() => setPaymentMethod(pm.id)}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-medium border-2 transition-colors ${
                          paymentMethod === pm.id
                            ? "border-[#fbbf24] bg-amber-50 text-[#1e3a5f]"
                            : "border-gray-200 text-gray-500 hover:border-amber-300"
                        }`}
                      >
                        {pm.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Donate button */}
                <button
                  onClick={handleDonate}
                  disabled={!finalAmount || Number(finalAmount) <= 0}
                  className="w-full py-4 bg-linear-to-br from-[#fbbf24] to-[#f59e0b] hover:from-[#f59e0b] hover:to-amber-600 text-[#1e3a5f] font-extrabold text-lg rounded-2xl transition-all shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isUk ? "Зробити внесок" : "Donate"}{" "}
                  {finalAmount ? `₴${finalAmount}` : ""}{" "}
                  {isMonthly ? (isUk ? "/міс" : "/mo") : ""} 💛
                </button>

                <p className="text-xs text-gray-400 text-center mt-3">
                  {isUk
                    ? "🔒 Безпечна оплата. Ваші дані захищені."
                    : "🔒 Secure payment. Your data is protected."}
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ════════════════ IMPACT NUMBERS ════════════════ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] text-center mb-14">
            {isUk ? "Наш вплив у цифрах" : "Our Impact in Numbers"}
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: "1,200+",
                labelEn: "Families Helped",
                labelUk: "Сімей отримали допомогу",
                emoji: "👨‍👩‍👧‍👦",
              },
              {
                num: "3,500+",
                labelEn: "Children Supported",
                labelUk: "Дітей підтримано",
                emoji: "👧",
              },
              {
                num: "450+",
                labelEn: "Active Volunteers",
                labelUk: "Активних волонтерів",
                emoji: "🙋",
              },
              {
                num: "35+",
                labelEn: "Partner Organizations",
                labelUk: "Організацій-партнерів",
                emoji: "🤝",
              },
            ].map((s) => (
              <div
                key={s.labelEn}
                className="text-center bg-amber-50/50 rounded-2xl p-6 border border-amber-100"
              >
                <span className="text-3xl block mb-2">{s.emoji}</span>
                <p className="text-3xl sm:text-4xl font-extrabold text-[#1e3a5f] mb-1">
                  {s.num}
                </p>
                <p className="text-sm text-gray-500 font-medium">
                  {isUk ? s.labelUk : s.labelEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ VOLUNTEER SECTION ════════════════ */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-3">
              {isUk ? "Стати волонтером" : "Become a Volunteer"} 🤝
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              {isUk
                ? "Волонтерство — це можливість змінити чиєсь життя та знайти однодумців. Оберіть роль, яка підходить саме вам."
                : "Volunteering is an opportunity to change someone's life and find like-minded people. Choose a role that suits you best."}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {VOLUNTEER_ROLES.map((r) => (
              <div
                key={r.titleEn}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow flex flex-col"
              >
                <span className="text-4xl mb-4">{r.emoji}</span>
                <h3 className="text-lg font-bold text-[#1e3a5f] mb-2">
                  {isUk ? r.titleUk : r.titleEn}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                  {isUk ? r.descUk : r.descEn}
                </p>

                <div className="space-y-2 mb-5 text-xs">
                  <div className="flex items-center gap-2 text-gray-500">
                    <span>🕐</span>
                    <span>{isUk ? r.timeUk : r.timeEn}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <span>✨</span>
                    <span>{isUk ? r.skillsUk : r.skillsEn}</span>
                  </div>
                </div>

                <button className="w-full py-2.5 bg-amber-50 hover:bg-[#fbbf24] text-[#1e3a5f] font-semibold rounded-xl text-sm transition-colors border border-amber-200 hover:border-[#fbbf24]">
                  {isUk ? "Подати заявку" : "Apply"} →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ TRANSPARENCY ════════════════ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-3">
              {isUk ? "Фінансова прозорість" : "Financial Transparency"} 🔍
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              {isUk
                ? "Ми відкрито публікуємо розподіл коштів, щоб кожен донор знав, куди йдуть його гроші."
                : "We openly publish fund allocation so every donor knows where their money goes."}
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* CSS pie chart */}
            <div className="shrink-0">
              <div
                className="w-52 h-52 rounded-full relative"
                style={{
                  background: `conic-gradient(
                    #fbbf24 0% 75%,
                    #1e3a5f 75% 85%,
                    #d97706 85% 100%
                  )`,
                }}
              >
                <div className="absolute inset-6 bg-white rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-extrabold text-[#1e3a5f]">₴2.8M</p>
                    <p className="text-xs text-gray-500">
                      {isUk ? "загалом у 2026" : "total in 2026"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Allocation breakdown */}
            <div className="flex-1 space-y-5 w-full">
              {ALLOCATION.map((a) => (
                <div key={a.labelEn}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-[#1e3a5f]">
                      {isUk ? a.labelUk : a.labelEn}
                    </span>
                    <span className="text-sm font-bold text-gray-600">{a.pct}%</span>
                  </div>
                  <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${a.color} rounded-full`}
                      style={{ width: `${a.pct}%` }}
                    />
                  </div>
                </div>
              ))}

              <p className="text-xs text-gray-400 pt-2">
                {isUk
                  ? "* Дані за Q1 2026. Повний звіт доступний для завантаження."
                  : "* Data for Q1 2026. Full report available for download."}
              </p>
              <button className="text-sm text-[#1e40af] hover:underline font-medium">
                {isUk ? "📄 Завантажити повний звіт" : "📄 Download full report"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ NEWS / UPDATES ════════════════ */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] text-center mb-14">
            {isUk ? "Новини та оновлення" : "News & Updates"} 📰
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {NEWS.map((n, i) => (
              <article
                key={i}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
              >
                {/* Colored header bar */}
                <div className="h-2 bg-linear-to-br from-[#fbbf24] to-[#f59e0b]" />
                <div className="p-6">
                  <p className="text-xs text-amber-600 font-semibold mb-2">{n.date}</p>
                  <h3 className="text-base font-bold text-[#1e3a5f] mb-3 leading-snug">
                    {isUk ? n.titleUk : n.titleEn}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {isUk ? n.excerptUk : n.excerptEn}
                  </p>
                  <button className="text-sm text-[#1e40af] hover:underline font-medium">
                    {isUk ? "Читати далі →" : "Read more →"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ PARTNERS / SPONSORS ════════════════ */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h3 className="text-center text-sm text-gray-400 font-semibold uppercase tracking-wider mb-8">
            {isUk ? "Наші партнери" : "Our Partners"}
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {PARTNERS.map((p) => (
              <div
                key={p.name}
                className="flex flex-col items-center justify-center py-4 px-2 bg-gray-50 rounded-xl border border-gray-100 hover:border-amber-200 transition-colors"
              >
                <span className="text-3xl mb-1">{p.emoji}</span>
                <span className="text-[10px] text-gray-400 font-medium text-center leading-tight">
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ FOOTER ════════════════ */}
      <footer className="bg-[#1e3a5f] text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {/* Column 1 — Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">💛</span>
                <span className="text-lg font-bold">DobroUA Foundation</span>
              </div>
              <p className="text-blue-200 text-sm leading-relaxed">
                {isUk
                  ? "Об'єднуємо серця та ресурси для допомоги тим, хто цього найбільше потребує."
                  : "Uniting hearts and resources to help those who need it most."}
              </p>
            </div>

            {/* Column 2 — Quick links */}
            <div>
              <h4 className="font-semibold mb-3 text-yellow-300 text-sm">
                {isUk ? "Швидкі посилання" : "Quick Links"}
              </h4>
              <ul className="space-y-2 text-sm text-blue-200">
                {(isUk
                  ? ["Про фонд", "Програми", "Звітність", "Волонтерство", "Контакти"]
                  : ["About Us", "Programs", "Reports", "Volunteer", "Contact"]
                ).map((link) => (
                  <li key={link}>
                    <button className="hover:text-white transition-colors">{link}</button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 — Contact */}
            <div>
              <h4 className="font-semibold mb-3 text-yellow-300 text-sm">
                {isUk ? "Контакти" : "Contact"}
              </h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li>📍 {isUk ? "м. Київ, вул. Хрещатик 22" : "Kyiv, 22 Khreshchatyk St."}</li>
                <li>📞 +380 (44) 123-45-67</li>
                <li>📧 info@dobroua.org.ua</li>
              </ul>
            </div>

            {/* Column 4 — Social */}
            <div>
              <h4 className="font-semibold mb-3 text-yellow-300 text-sm">
                {isUk ? "Ми в соцмережах" : "Follow Us"}
              </h4>
              <div className="flex gap-3">
                {["📘", "📸", "🐦", "📺"].map((icon, i) => (
                  <button
                    key={i}
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-lg transition-colors"
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/15 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-blue-300 text-center sm:text-left">
              <p>
                {isUk
                  ? "БО «Фонд DobroUA» | ЄДРПОУ 12345678 | Р/р UA213223130000026007233566001"
                  : "CO \"DobroUA Foundation\" | EDRPOU 12345678 | IBAN UA213223130000026007233566001"}
              </p>
              <p className="mt-1">
                {isUk
                  ? "© 2019–2026 DobroUA Foundation. Усі права захищені."
                  : "© 2019–2026 DobroUA Foundation. All rights reserved."}
              </p>
            </div>
            <div className="text-[10px] text-blue-400 text-center sm:text-right max-w-xs">
              {isUk
                ? "Використання матеріалів сайту дозволено з посиланням на джерело. Благодійна організація зареєстрована відповідно до законодавства України."
                : "Use of site materials is permitted with reference to the source. Charitable organization registered in accordance with Ukrainian law."}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
