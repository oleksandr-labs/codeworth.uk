"use client";

import { useState } from "react";

function fmtPrice(uah: number, isUk: boolean): string {
  if (isUk) return `${uah} ₴`;
  return `£${Math.ceil(uah / 40 / 5) * 5}`;
}

// ─── Card color configs ───────────────────────────────────────────────────────
const CARD_COLORS = [
  { label: "Midnight Black", labelUk: "Чорний", from: "#1a1a2e", to: "#16213e", via: "#0f3460" },
  { label: "Ocean Blue", labelUk: "Океанський", from: "#0077b6", to: "#023e8a", via: "#0096c7" },
  { label: "Space Purple", labelUk: "Фіолетовий", from: "#7b2d8b", to: "#3a0ca3", via: "#9d4edd" },
  { label: "Forest Green", labelUk: "Зелений", from: "#1b4332", to: "#2d6a4f", via: "#40916c" },
  { label: "Rose Gold", labelUk: "Рожеве золото", from: "#c9818c", to: "#a0522d", via: "#e07a5f" },
];

// ─── Plans data ───────────────────────────────────────────────────────────────
const PLANS = [
  {
    key: "standard",
    nameEn: "Standard",
    nameUk: "Стандарт",
    priceMonthUah: 0,
    cashback: "0.5%",
    atm: 2,
    nfc: true,
    applePay: true,
    googlePay: true,
    priority: false,
    badge: null,
  },
  {
    key: "plus",
    nameEn: "Plus",
    nameUk: "Плюс",
    priceMonthUah: 149,
    cashback: "2%",
    atm: 5,
    nfc: true,
    applePay: true,
    googlePay: true,
    priority: false,
    badge: "Most Popular",
    badgeUk: "Найпопулярніший",
  },
  {
    key: "premium",
    nameEn: "Premium",
    nameUk: "Преміум",
    priceMonthUah: 399,
    cashback: "5%",
    atm: 999,
    nfc: true,
    applePay: true,
    googlePay: true,
    priority: true,
    badge: null,
  },
];

const SPEND_CATEGORIES = [
  { key: "groceries", labelEn: "Groceries", labelUk: "Продукти" },
  { key: "restaurants", labelEn: "Restaurants", labelUk: "Ресторани" },
  { key: "travel", labelEn: "Travel", labelUk: "Подорожі" },
  { key: "online", labelEn: "Online Shopping", labelUk: "Онлайн-шопінг" },
];

export function DigitalFirstBankDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  // Card customizer
  const [cardColorIdx, setCardColorIdx] = useState(0);
  const [cardHolder, setCardHolder] = useState("");

  // Pricing toggle
  const [billingYearly, setBillingYearly] = useState(false);

  // Cashback calculator
  const [spendCategory, setSpendCategory] = useState("groceries");
  const [monthlySpend, setMonthlySpend] = useState(2000);

  // Onboarding stepper
  const [activeStep, setActiveStep] = useState(0);

  const address = isUk
    ? "вул. Велика Васильківська, 100, Київ, 03150"
    : "30 Canary Wharf, London E14 5AB";
  const phone = isUk ? "+38 (044) 888-00-11" : "+44 20 7946 0900";

  const selectedColor = CARD_COLORS[cardColorIdx];

  // Cashback calc helpers
  const spendUah = monthlySpend;
  const spendDisplay = isUk ? `${spendUah} ₴` : `£${Math.ceil(spendUah / 40)}`;
  const cashbackStandard = (spendUah * 0.005).toFixed(0);
  const cashbackPlus = (spendUah * 0.02).toFixed(0);
  const cashbackPremium = (spendUah * 0.05).toFixed(0);

  const fmtCashback = (uah: string) =>
    isUk ? `${uah} ₴` : `£${Math.ceil(Number(uah) / 40)}`;

  const planPrice = (uah: number) => {
    if (uah === 0) return isUk ? "Безкоштовно" : "Free";
    const monthly = billingYearly ? Math.round(uah * 0.8) : uah;
    return fmtPrice(monthly, isUk) + (isUk ? "/міс" : "/mo");
  };

  const onboardingSteps = isUk
    ? [
        { title: "Особисті дані", desc: "ПІБ, дата народження, email", icon: "👤" },
        { title: "Верифікація ID", desc: "Дія або паспорт + селфі", icon: "🪪" },
        { title: "Оберіть план і колір", desc: "Картка вже чекає на вас", icon: "💳" },
      ]
    : [
        { title: "Personal Data", desc: "Full name, date of birth, email", icon: "👤" },
        { title: "ID Verification", desc: "Diia or Passport + selfie", icon: "🪪" },
        { title: "Choose Plan & Card", desc: "Your card is ready to ship", icon: "💳" },
      ];

  const securityItems = isUk
    ? [
        { icon: "🏦", title: "Ліцензія НБУ", desc: "Ліцензований Нацбанком України" },
        { icon: "🔐", title: "PCI DSS", desc: "Відповідність стандарту PCI DSS Level 1" },
        { icon: "🔒", title: "256-bit SSL", desc: "Всі дані зашифровані" },
        { icon: "🛡️", title: "Страхування коштів", desc: "Вклади до 600 000 ₴ застраховані" },
      ]
    : [
        { icon: "🏦", title: "FCA Regulated", desc: "Fully authorised by the FCA" },
        { icon: "🔐", title: "PCI DSS", desc: "PCI DSS Level 1 compliant" },
        { icon: "🔒", title: "256-bit SSL", desc: "All data encrypted end-to-end" },
        { icon: "🛡️", title: "FSCS Protected", desc: "Deposits protected up to £85,000" },
      ];

  return (
    <div className="bg-slate-950 text-white font-sans min-h-screen">

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-950 pt-16 pb-20 px-6">
        {/* background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          {/* Text side */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-widest">
              {isUk ? "Необанк нового покоління" : "Next-gen neobank"}
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-5">
              {isUk
                ? "Банківський рахунок. Без черг і паперів."
                : "Banking Without Queues or Paperwork"}
            </h1>
            <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto lg:mx-0">
              {isUk
                ? "Відкрийте рахунок за 4 хвилини прямо зі смартфона."
                : "Open your account in 4 minutes, straight from your phone."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8">
              <button className="bg-blue-600 hover:bg-blue-500 transition-colors px-6 py-3 rounded-xl font-semibold text-white">
                {isUk ? "Відкрити рахунок" : "Open Account"}
              </button>
              <button className="border border-slate-700 hover:border-blue-500 transition-colors px-6 py-3 rounded-xl text-slate-300">
                {isUk ? "Дізнатись більше" : "Learn More"}
              </button>
            </div>
            {/* Trust strip */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start text-xs text-slate-400">
              {["NFC", "Apple Pay", "Google Pay", isUk ? "Кешбек до 5%" : "Cashback up to 5%"].map((t) => (
                <span key={t} className="flex items-center gap-1 bg-slate-800 px-3 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Card mockup */}
          <div className="flex-shrink-0">
            <div
              className="relative w-72 h-44 rounded-2xl shadow-2xl p-5 flex flex-col justify-between overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${selectedColor.from}, ${selectedColor.via}, ${selectedColor.to})` }}
            >
              {/* shimmer overlay */}
              <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent pointer-events-none rounded-2xl" />
              <div className="flex justify-between items-start">
                <span className="text-white/80 font-bold tracking-widest text-sm">DigitalFirst</span>
                <span className="text-2xl">💳</span>
              </div>
              <div>
                <div className="text-white/70 text-xs mb-1 tracking-widest font-mono">
                  •••• •••• •••• 4242
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-white/50 text-xs uppercase tracking-widest">
                      {isUk ? "Власник" : "Card Holder"}
                    </div>
                    <div className="text-white font-semibold text-sm truncate max-w-[140px]">
                      {cardHolder || (isUk ? "ВАШЕ ІМ'Я" : "YOUR NAME")}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white/50 text-xs uppercase tracking-widest">
                      {isUk ? "До" : "Exp"}
                    </div>
                    <div className="text-white text-sm font-mono">12/29</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CARD CUSTOMIZER ─────────────────────────────────────────────────── */}
      <section className="bg-slate-900 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2">
            {isUk ? "Налаштуйте свою картку" : "Customise Your Card"}
          </h2>
          <p className="text-slate-400 text-center mb-10 text-sm">
            {isUk ? "Оберіть колір і введіть ім'я — побачите свою картку вже зараз" : "Pick a colour and enter your name to preview your card"}
          </p>

          <div className="flex flex-col md:flex-row gap-10 items-center">
            {/* Controls */}
            <div className="flex-1 w-full space-y-6">
              {/* Colour picker */}
              <div>
                <label className="block text-sm text-slate-400 mb-3">
                  {isUk ? "Колір картки" : "Card colour"}
                </label>
                <div className="flex gap-3 flex-wrap">
                  {CARD_COLORS.map((c, i) => (
                    <button
                      key={c.label}
                      onClick={() => setCardColorIdx(i)}
                      title={isUk ? c.labelUk : c.label}
                      className={`w-9 h-9 rounded-full border-2 transition-all ${
                        cardColorIdx === i ? "border-white scale-110" : "border-transparent"
                      }`}
                      style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})` }}
                    />
                  ))}
                </div>
                <p className="text-xs text-blue-400 mt-2">
                  {isUk ? CARD_COLORS[cardColorIdx].labelUk : CARD_COLORS[cardColorIdx].label}
                </p>
              </div>

              {/* Name input */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  {isUk ? "Ваше ім'я на картці" : "Your name on card"}
                </label>
                <input
                  type="text"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                  placeholder={isUk ? "ІВАН ПЕТРЕНКО" : "JOHN SMITH"}
                  maxLength={22}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono text-sm"
                />
              </div>
            </div>

            {/* Live card preview */}
            <div className="flex-shrink-0">
              <div
                className="relative w-64 h-40 rounded-2xl shadow-xl p-4 flex flex-col justify-between overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${selectedColor.from}, ${selectedColor.via}, ${selectedColor.to})` }}
              >
                <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent pointer-events-none rounded-2xl" />
                <div className="flex justify-between items-start">
                  <span className="text-white/80 font-bold tracking-widest text-xs">DigitalFirst</span>
                  <span className="text-xl">💳</span>
                </div>
                <div>
                  <div className="text-white/70 text-xs mb-1 tracking-widest font-mono">
                    •••• •••• •••• 4242
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-white/50 text-xs uppercase tracking-widest">
                        {isUk ? "Власник" : "Holder"}
                      </div>
                      <div className="text-white font-semibold text-xs truncate max-w-[120px] font-mono">
                        {cardHolder || (isUk ? "ВАШЕ ІМ'Я" : "YOUR NAME")}
                      </div>
                    </div>
                    <div className="text-white text-xs font-mono">12/29</div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-500 text-center mt-2">
                {isUk ? "Попередній перегляд" : "Live preview"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────────────────────────────── */}
      <section className="bg-slate-950 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2">
            {isUk ? "Тарифні плани" : "Pricing Plans"}
          </h2>
          <p className="text-slate-400 text-center mb-6 text-sm">
            {isUk ? "Без прихованих комісій" : "No hidden fees"}
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <span className={`text-sm ${!billingYearly ? "text-white" : "text-slate-500"}`}>
              {isUk ? "Щомісяця" : "Monthly"}
            </span>
            <button
              onClick={() => setBillingYearly(!billingYearly)}
              className={`relative w-12 h-6 rounded-full transition-colors ${billingYearly ? "bg-blue-600" : "bg-slate-700"}`}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${billingYearly ? "left-7" : "left-1"}`} />
            </button>
            <span className={`text-sm ${billingYearly ? "text-white" : "text-slate-500"}`}>
              {isUk ? "Щороку" : "Yearly"}
              <span className="ml-1 text-xs text-green-400">−20%</span>
            </span>
          </div>

          {/* Plan cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {PLANS.map((plan) => (
              <div
                key={plan.key}
                className={`relative rounded-2xl border p-6 flex flex-col ${
                  plan.key === "plus"
                    ? "border-blue-500 bg-blue-600/10"
                    : "border-slate-800 bg-slate-900"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    {isUk ? plan.badgeUk : plan.badge}
                  </div>
                )}
                <div className="text-lg font-bold mb-1">
                  {isUk ? plan.nameUk : plan.nameEn}
                </div>
                <div className="text-3xl font-extrabold text-white mb-4">
                  {planPrice(plan.priceMonthUah)}
                </div>
                <ul className="space-y-2 text-sm text-slate-400 flex-1 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">✓</span>
                    {isUk ? `Кешбек ${plan.cashback}` : `Cashback ${plan.cashback}`}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">✓</span>
                    {isUk
                      ? `Зняття в банкоматі: ${plan.atm === 999 ? "необмежено" : plan.atm + " рази/міс"}`
                      : `ATM withdrawals: ${plan.atm === 999 ? "unlimited" : plan.atm + "/mo free"}`}
                  </li>
                  {plan.nfc && (
                    <li className="flex items-center gap-2">
                      <span className="text-blue-400">✓</span> NFC
                    </li>
                  )}
                  {plan.applePay && (
                    <li className="flex items-center gap-2">
                      <span className="text-blue-400">✓</span> Apple Pay
                    </li>
                  )}
                  {plan.googlePay && (
                    <li className="flex items-center gap-2">
                      <span className="text-blue-400">✓</span> Google Pay
                    </li>
                  )}
                  {plan.priority && (
                    <li className="flex items-center gap-2">
                      <span className="text-blue-400">✓</span>
                      {isUk ? "Пріоритетна підтримка" : "Priority support"}
                    </li>
                  )}
                </ul>
                <button
                  className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                    plan.key === "plus"
                      ? "bg-blue-600 hover:bg-blue-500 text-white"
                      : "border border-slate-700 hover:border-blue-500 text-slate-300"
                  }`}
                >
                  {isUk ? "Обрати план" : "Choose plan"}
                </button>
              </div>
            ))}
          </div>

          {/* Feature comparison table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-slate-400 border-collapse">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left py-3 pr-4 text-slate-300 font-semibold">
                    {isUk ? "Функція" : "Feature"}
                  </th>
                  {PLANS.map((p) => (
                    <th key={p.key} className="py-3 px-4 text-center text-slate-300 font-semibold">
                      {isUk ? p.nameUk : p.nameEn}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { featureEn: "NFC payments", featureUk: "NFC-платежі", vals: [true, true, true] },
                  { featureEn: "Apple Pay", featureUk: "Apple Pay", vals: [true, true, true] },
                  { featureEn: "Google Pay", featureUk: "Google Pay", vals: [true, true, true] },
                  { featureEn: "Cashback rate", featureUk: "Ставка кешбеку", vals: ["0.5%", "2%", "5%"] },
                  { featureEn: "Free ATM / mo", featureUk: "Банкомат / міс", vals: ["2", "5", "∞"] },
                  { featureEn: "Priority support", featureUk: "Пріор. підтримка", vals: [false, false, true] },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-900/50 transition-colors">
                    <td className="py-3 pr-4 text-slate-300">{isUk ? row.featureUk : row.featureEn}</td>
                    {row.vals.map((v, j) => (
                      <td key={j} className="py-3 px-4 text-center">
                        {v === true ? (
                          <span className="text-blue-400 font-bold">✓</span>
                        ) : v === false ? (
                          <span className="text-slate-700">—</span>
                        ) : (
                          <span className="text-white font-semibold">{v}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── CASHBACK CALCULATOR ──────────────────────────────────────────────── */}
      <section className="bg-slate-900 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2">
            {isUk ? "Калькулятор кешбеку" : "Cashback Calculator"}
          </h2>
          <p className="text-slate-400 text-center mb-10 text-sm">
            {isUk
              ? "Дізнайтесь, скільки ви зекономите щомісяця"
              : "See how much you earn back every month"}
          </p>

          <div className="bg-slate-800 rounded-2xl p-6 space-y-6">
            {/* Category */}
            <div>
              <label className="block text-sm text-slate-400 mb-3">
                {isUk ? "Категорія витрат" : "Spending category"}
              </label>
              <div className="flex flex-wrap gap-2">
                {SPEND_CATEGORIES.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setSpendCategory(cat.key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      spendCategory === cat.key
                        ? "bg-blue-600 text-white"
                        : "bg-slate-700 text-slate-400 hover:bg-slate-600"
                    }`}
                  >
                    {isUk ? cat.labelUk : cat.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider */}
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                {isUk ? "Щомісячні витрати" : "Monthly spend"}: <span className="text-white font-semibold">{spendDisplay}</span>
              </label>
              <input
                type="range"
                min={0}
                max={isUk ? 20000 : 500}
                step={isUk ? 100 : 5}
                value={isUk ? monthlySpend : Math.ceil(monthlySpend / 40)}
                onChange={(e) =>
                  setMonthlySpend(isUk ? Number(e.target.value) : Number(e.target.value) * 40)
                }
                className="w-full accent-blue-500"
              />
              <div className="flex justify-between text-xs text-slate-600 mt-1">
                <span>{isUk ? "0 ₴" : "£0"}</span>
                <span>{isUk ? "20 000 ₴" : "£500"}</span>
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  plan: isUk ? "Стандарт" : "Standard",
                  amount: fmtCashback(cashbackStandard),
                  color: "text-slate-300",
                },
                {
                  plan: isUk ? "Плюс" : "Plus",
                  amount: fmtCashback(cashbackPlus),
                  color: "text-blue-400",
                },
                {
                  plan: isUk ? "Преміум" : "Premium",
                  amount: fmtCashback(cashbackPremium),
                  color: "text-yellow-400",
                },
              ].map((r) => (
                <div key={r.plan} className="bg-slate-900 rounded-xl p-4 text-center">
                  <div className="text-xs text-slate-500 mb-1">{r.plan}</div>
                  <div className={`text-xl font-extrabold ${r.color}`}>{r.amount}</div>
                  <div className="text-xs text-slate-500 mt-1">
                    {isUk ? "/ місяць" : "/ month"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ONBOARDING STEPPER ───────────────────────────────────────────────── */}
      <section className="bg-slate-950 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2">
            {isUk ? "Як це працює" : "How It Works"}
          </h2>
          <p className="text-slate-400 text-center mb-10 text-sm">
            {isUk ? "3 кроки до вашої картки" : "3 steps to your card"}
          </p>

          {/* Step tabs */}
          <div className="flex items-center justify-center mb-8 gap-0">
            {onboardingSteps.map((step, i) => (
              <div key={i} className="flex items-center">
                <button
                  onClick={() => setActiveStep(i)}
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                    activeStep === i
                      ? "bg-blue-600/20 border border-blue-500"
                      : "opacity-50 hover:opacity-80"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                      activeStep === i
                        ? "border-blue-500 bg-blue-600 text-white"
                        : activeStep > i
                        ? "border-green-500 bg-green-600 text-white"
                        : "border-slate-700 bg-slate-800 text-slate-400"
                    }`}
                  >
                    {activeStep > i ? "✓" : i + 1}
                  </div>
                  <span className="text-xs text-slate-400 hidden sm:block">{step.title}</span>
                </button>
                {i < onboardingSteps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-1 ${activeStep > i ? "bg-blue-500" : "bg-slate-800"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step content */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">{onboardingSteps[activeStep].icon}</div>
            <h3 className="text-xl font-bold mb-2">{onboardingSteps[activeStep].title}</h3>
            <p className="text-slate-400 mb-8">{onboardingSteps[activeStep].desc}</p>
            <div className="flex justify-center gap-3">
              {activeStep > 0 && (
                <button
                  onClick={() => setActiveStep(activeStep - 1)}
                  className="border border-slate-700 px-5 py-2.5 rounded-xl text-slate-400 hover:border-blue-500 transition-colors text-sm"
                >
                  {isUk ? "Назад" : "Back"}
                </button>
              )}
              {activeStep < onboardingSteps.length - 1 ? (
                <button
                  onClick={() => setActiveStep(activeStep + 1)}
                  className="bg-blue-600 hover:bg-blue-500 transition-colors px-5 py-2.5 rounded-xl text-white font-semibold text-sm"
                >
                  {isUk ? "Далі" : "Next"}
                </button>
              ) : (
                <button
                  onClick={() => setActiveStep(0)}
                  className="bg-green-600 hover:bg-green-500 transition-colors px-5 py-2.5 rounded-xl text-white font-semibold text-sm"
                >
                  {isUk ? "Почати заново" : "Start over"}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECURITY SECTION ─────────────────────────────────────────────────── */}
      <section className="bg-slate-900 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2">
            {isUk ? "Ваша безпека — наш пріоритет" : "Your Security Is Our Priority"}
          </h2>
          <p className="text-slate-400 text-center mb-10 text-sm">
            {isUk
              ? "Захист банківського рівня для кожного клієнта"
              : "Bank-grade protection for every customer"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {securityItems.map((item) => (
              <div
                key={item.title}
                className="bg-slate-800 border border-slate-700 rounded-2xl p-5 hover:border-blue-500/50 transition-colors"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="text-sm font-bold text-white mb-1">{item.title}</div>
                <div className="text-xs text-slate-400">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer className="bg-slate-950 border-t border-slate-800 py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="text-white font-extrabold text-lg mb-1">DigitalFirst Bank</div>
            <div className="text-slate-500 text-sm">{address}</div>
            <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-blue-400 text-sm hover:underline">
              {phone}
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-semibold px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              {isUk ? "Підтримка 24/7" : "24/7 Support"}
            </div>
            <div className="text-slate-600 text-xs">
              {isUk ? "© 2025 DigitalFirst Bank. Ліцензія НБУ №123" : "© 2025 DigitalFirst Bank. FCA Reg. 123456"}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
