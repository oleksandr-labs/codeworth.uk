"use client";

import { useState } from "react";

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const FEATURES_EN = [
  { icon: "⚡", title: "Auto-Generation", desc: "Create professional invoices from estimates, time logs, or recurring schedules — zero manual entry required." },
  { icon: "📝", title: "Smart Templates", desc: "50+ industry-specific templates with your branding, payment terms, and custom fields baked in." },
  { icon: "💱", title: "Multi-Currency", desc: "Invoice clients in 140+ currencies with real-time exchange rates. Auto-convert to your base currency for reporting." },
  { icon: "📍", title: "Payment Tracking", desc: "Real-time payment status, automated reminders for overdue invoices, and instant notifications when clients pay." },
  { icon: "🧮", title: "Tax Calculator", desc: "Automatic VAT, GST, and sales tax calculation based on client location. Always compliant, always accurate." },
  { icon: "🏢", title: "Client Portal", desc: "Branded self-service portal where clients view, download, and pay invoices with one click." },
];
const FEATURES_UK = [
  { icon: "⚡", title: "Авто-Генерація", desc: "Створюйте професійні рахунки з оцінок, часових логів або періодичних графіків — без ручного введення." },
  { icon: "📝", title: "Розумні Шаблони", desc: "50+ галузевих шаблонів з вашим брендингом, умовами оплати та кастомними полями." },
  { icon: "💱", title: "Мультивалютність", desc: "Рахунки у 140+ валютах з курсами в реальному часі. Авто-конвертація у базову валюту для звітності." },
  { icon: "📍", title: "Трекінг Платежів", desc: "Статус оплати в реальному часі, автоматичні нагадування та миттєві сповіщення при оплаті." },
  { icon: "🧮", title: "Калькулятор Податків", desc: "Автоматичний розрахунок ПДВ та податків на основі локації клієнта. Завжди відповідний, завжди точний." },
  { icon: "🏢", title: "Клієнтський Портал", desc: "Брендований портал самообслуговування, де клієнти переглядають, завантажують та оплачують рахунки." },
];

const PRICING_EN = [
  {
    name: "Free",
    monthly: 0,
    features: ["5 invoices/mo", "1 user", "Basic templates", "Email support", "PDF export"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    monthly: 12,
    features: ["Unlimited invoices", "5 users", "All templates", "Multi-currency", "Payment tracking", "Priority support", "Client portal"],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    monthly: 0,
    features: ["Unlimited everything", "Unlimited users", "Custom integrations", "Dedicated manager", "SLA guarantee", "API access", "On-premise option", "Custom branding"],
    cta: "Contact Sales",
    popular: false,
  },
];
const PRICING_UK = [
  {
    name: "Free",
    monthly: 0,
    features: ["5 рахунків/міс", "1 користувач", "Базові шаблони", "Email підтримка", "PDF експорт"],
    cta: "Розпочати",
    popular: false,
  },
  {
    name: "Pro",
    monthly: 12,
    features: ["Безлімітні рахунки", "5 користувачів", "Усі шаблони", "Мультивалютність", "Трекінг платежів", "Пріоритетна підтримка", "Клієнтський портал"],
    cta: "Спробувати Безкоштовно",
    popular: true,
  },
  {
    name: "Enterprise",
    monthly: 0,
    features: ["Безлімітно все", "Безлімітні користувачі", "Кастомні інтеграції", "Персональний менеджер", "SLA гарантія", "API доступ", "On-premise опція", "Кастомний брендинг"],
    cta: "Зв'язатися",
    popular: false,
  },
];

const INTEGRATIONS = [
  { name: "Stripe", icon: "💳" },
  { name: "PayPal", icon: "🅿️" },
  { name: "PrivatBank", icon: "🏦" },
  { name: "Monobank", icon: "🐱" },
  { name: "QuickBooks", icon: "📗" },
  { name: "Xero", icon: "📘" },
  { name: "Zapier", icon: "⚡" },
  { name: "Slack", icon: "💼" },
];

const TESTIMONIALS_EN = [
  { name: "Sarah Mitchell", role: "Freelance Designer", text: "InvoiceFlow cut my billing time by 75%. I used to spend hours creating invoices — now it takes seconds. The multi-currency feature is a game-changer for my international clients." },
  { name: "Oleksandr Koval", role: "CEO, Digital Agency", text: "We switched from manual spreadsheets to InvoiceFlow and never looked back. Automated reminders alone recovered $12K in overdue payments last quarter." },
  { name: "Maria Santos", role: "E-commerce Owner", text: "The client portal is brilliant. My customers can view and pay invoices instantly. Payment times dropped from 14 days to 3 days on average." },
];
const TESTIMONIALS_UK = [
  { name: "Sarah Mitchell", role: "Фрілансер-Дизайнер", text: "InvoiceFlow скоротив час на білінг на 75%. Раніше я витрачала години на рахунки — тепер це секунди. Мультивалютність — справжній прорив для міжнародних клієнтів." },
  { name: "Олександр Коваль", role: "CEO, Діджитал Агенція", text: "Ми перейшли з ручних таблиць на InvoiceFlow і більше не повертаємось. Лише автоматичні нагадування повернули $12K прострочених платежів за квартал." },
  { name: "Maria Santos", role: "Власниця E-commerce", text: "Клієнтський портал — геніальний. Мої клієнти переглядають і оплачують рахунки миттєво. Час оплати скоротився з 14 до 3 днів у середньому." },
];

/* ═══════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export function InvoiceFlowDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  /* ── Invoice Builder state ── */
  const [companyName, setCompanyName] = useState("");
  const [clientName, setClientName] = useState("");
  const [lineItems, setLineItems] = useState<{ desc: string; qty: number; price: number }[]>([
    { desc: isUk ? "Веб-дизайн" : "Web Design", qty: 1, price: 1500 },
    { desc: isUk ? "Розробка API" : "API Development", qty: 3, price: 800 },
  ]);
  const [newDesc, setNewDesc] = useState("");
  const [newQty, setNewQty] = useState("1");
  const [newPrice, setNewPrice] = useState("");
  const [taxRate, setTaxRate] = useState(20);
  const [pdfToast, setPdfToast] = useState(false);

  const subtotal = lineItems.reduce((s, item) => s + item.qty * item.price, 0);
  const taxAmount = subtotal * (taxRate / 100);
  const total = subtotal + taxAmount;

  const addLineItem = () => {
    const d = newDesc.trim();
    const q = parseInt(newQty, 10);
    const p = parseFloat(newPrice);
    if (!d || !q || !p || q <= 0 || p <= 0) return;
    setLineItems((prev) => [...prev, { desc: d, qty: q, price: p }]);
    setNewDesc("");
    setNewQty("1");
    setNewPrice("");
  };

  const removeLineItem = (idx: number) => {
    setLineItems((prev) => prev.filter((_, i) => i !== idx));
  };

  const generatePdf = () => {
    setPdfToast(true);
    setTimeout(() => setPdfToast(false), 3000);
  };

  /* ── Pricing toggle ── */
  const [annual, setAnnual] = useState(false);
  const pricing = isUk ? PRICING_UK : PRICING_EN;

  /* ── ROI Calculator ── */
  const [invoicesPerMonth, setInvoicesPerMonth] = useState(50);
  const [timePerInvoice, setTimePerInvoice] = useState(15);
  const [hourlyRate, setHourlyRate] = useState(50);

  const timeSavedMinutes = invoicesPerMonth * timePerInvoice * 0.75;
  const timeSavedHours = timeSavedMinutes / 60;
  const moneySavedMonth = timeSavedHours * hourlyRate;
  const moneySavedYear = moneySavedMonth * 12;

  /* ── CTA email ── */
  const [ctaEmail, setCtaEmail] = useState("");
  const [ctaSubmitted, setCtaSubmitted] = useState(false);

  /* ── Data ── */
  const features = isUk ? FEATURES_UK : FEATURES_EN;
  const testimonials = isUk ? TESTIMONIALS_UK : TESTIMONIALS_EN;

  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* ════════════════════ HEADER ════════════════════ */}
      <header className="sticky top-0 z-50 border-b border-slate-800/20 bg-[#0f172a]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <span className="text-lg font-bold text-white sm:text-xl">
            📊 InvoiceFlow
          </span>

          <nav className="hidden gap-6 text-sm text-slate-300 md:flex">
            {(isUk
              ? ["Можливості", "Ціни", "Інтеграції", "API", "Блог"]
              : ["Features", "Pricing", "Integrations", "API", "Blog"]
            ).map((item) => (
              <span key={item} className="cursor-pointer transition-colors hover:text-emerald-400">
                {item}
              </span>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden cursor-pointer text-sm text-slate-300 transition-colors hover:text-white sm:inline">
              {isUk ? "Увійти" : "Login"}
            </span>
            <button className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-400">
              {isUk ? "Спробувати Безкоштовно" : "Start Free"}
            </button>
          </div>
        </div>
      </header>

      {/* ════════════════════ HERO ════════════════════ */}
      <section className="relative overflow-hidden bg-linear-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] px-4 py-20 sm:px-6 sm:py-28">
        {/* decorative grid */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none' stroke='%2310b981' stroke-width='.5'/%3E%3C/svg%3E\")" }} />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          {/* Left */}
          <div>
            <span className="mb-4 inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
              {isUk ? "🚀 #1 Платформа Інвойсів" : "🚀 #1 Invoicing Platform"}
            </span>

            <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              {isUk
                ? <>Рахунки за <span className="text-emerald-400">Секунди</span>, Оплата за <span className="text-emerald-400">Хвилини</span></>
                : <>Invoices in <span className="text-emerald-400">Seconds</span>, Payments in <span className="text-emerald-400">Minutes</span></>}
            </h1>

            <p className="mb-8 max-w-lg text-lg text-slate-400">
              {isUk
                ? "Автоматизуйте білінг, відстежуйте платежі в реальному часі та отримуйте оплату швидше. Довірено 25,000+ бізнесам по всьому світу."
                : "Automate your billing, track payments in real time, and get paid faster. Trusted by 25,000+ businesses worldwide."}
            </p>

            <div className="mb-4 flex flex-wrap gap-3">
              <button className="rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-400">
                {isUk ? "Спробувати Безкоштовно" : "Start Free Trial"}
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-slate-600 px-6 py-3 font-semibold text-slate-300 transition-colors hover:border-slate-400 hover:text-white">
                ▶️ {isUk ? "Дивитись Демо" : "Watch Demo"}
              </button>
            </div>
            <p className="text-sm text-slate-500">{isUk ? "Кредитна картка не потрібна" : "No credit card required"}</p>
          </div>

          {/* Right — animated invoice preview */}
          <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-700 bg-[#1e293b] p-6 shadow-2xl shadow-emerald-500/10 lg:mx-0">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-bold text-emerald-400">{isUk ? "РАХУНОК" : "INVOICE"} #2024-0187</span>
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-400">
                {isUk ? "Оплачено" : "Paid"}
              </span>
            </div>
            <div className="mb-3 border-b border-slate-700 pb-3">
              <p className="text-xs text-slate-500">{isUk ? "Від" : "From"}: Codeworth Studio</p>
              <p className="text-xs text-slate-500">{isUk ? "Для" : "To"}: Acme Corporation</p>
              <p className="text-xs text-slate-500">{isUk ? "Дата" : "Date"}: Mar 15, 2026</p>
            </div>
            <div className="mb-3 space-y-2 text-sm">
              <div className="flex justify-between text-slate-400">
                <span>{isUk ? "Веб-розробка" : "Web Development"}</span>
                <span className="text-white">$4,500</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>UI/UX Design</span>
                <span className="text-white">$2,200</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>{isUk ? "SEO Оптимізація" : "SEO Optimization"}</span>
                <span className="text-white">$800</span>
              </div>
            </div>
            <div className="border-t border-slate-700 pt-3">
              <div className="flex justify-between text-sm text-slate-400">
                <span>Subtotal</span>
                <span>$7,500</span>
              </div>
              <div className="flex justify-between text-sm text-slate-400">
                <span>{isUk ? "ПДВ" : "Tax"} (20%)</span>
                <span>$1,500</span>
              </div>
              <div className="mt-2 flex justify-between text-lg font-bold text-emerald-400">
                <span>Total</span>
                <span>$9,000</span>
              </div>
            </div>
            <button className="mt-4 w-full rounded-lg bg-emerald-500 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-400">
              💳 {isUk ? "Оплатити Зараз" : "Pay Now"}
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════ FEATURES ════════════════════ */}
      <section className="bg-white px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              {isUk ? "Все, Що Потрібно Для Білінгу" : "Everything You Need for Billing"}
            </h2>
            <p className="mx-auto max-w-2xl text-slate-500">
              {isUk
                ? "Від створення рахунків до отримання оплати — один інструмент для всього."
                : "From invoice creation to payment collection — one tool for everything."}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50 text-2xl">
                  {f.icon}
                </span>
                <h3 className="mb-2 text-lg font-bold text-slate-900">{f.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ LIVE INVOICE BUILDER ════════════════════ */}
      <section className="bg-slate-50 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              {isUk ? "Конструктор Рахунків" : "Live Invoice Builder"}
            </h2>
            <p className="text-slate-500">
              {isUk
                ? "Спробуйте створити рахунок прямо зараз — це займе лише хвилину."
                : "Try creating an invoice right now — it only takes a minute."}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
            {/* Header fields */}
            <div className="mb-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  {isUk ? "Назва Компанії" : "Company Name"}
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder={isUk ? "Ваша компанія" : "Your Company"}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  {isUk ? "Ім'я Клієнта" : "Client Name"}
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder={isUk ? "Назва клієнта" : "Client name"}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Line items table */}
            <div className="mb-4">
              <h3 className="mb-3 text-sm font-bold text-slate-700">
                {isUk ? "Позиції" : "Line Items"}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-xs font-semibold uppercase text-slate-500">
                      <th className="pb-2 pr-4">{isUk ? "Опис" : "Description"}</th>
                      <th className="pb-2 pr-4 text-right">{isUk ? "К-ть" : "Qty"}</th>
                      <th className="pb-2 pr-4 text-right">{isUk ? "Ціна" : "Price"}</th>
                      <th className="pb-2 pr-4 text-right">{isUk ? "Сума" : "Amount"}</th>
                      <th className="pb-2" />
                    </tr>
                  </thead>
                  <tbody>
                    {lineItems.map((item, i) => (
                      <tr key={i} className="border-b border-slate-100">
                        <td className="py-2 pr-4 text-slate-700">{item.desc}</td>
                        <td className="py-2 pr-4 text-right text-slate-600">{item.qty}</td>
                        <td className="py-2 pr-4 text-right text-slate-600">${item.price.toFixed(2)}</td>
                        <td className="py-2 pr-4 text-right font-medium text-slate-800">
                          ${(item.qty * item.price).toFixed(2)}
                        </td>
                        <td className="py-2 text-right">
                          <button
                            onClick={() => removeLineItem(i)}
                            className="text-red-400 transition-colors hover:text-red-600"
                            aria-label={isUk ? "Видалити" : "Remove"}
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                    {lineItems.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-6 text-center text-slate-400">
                          {isUk ? "Додайте першу позицію нижче" : "Add your first line item below"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add item row */}
            <div className="mb-6 flex flex-wrap items-end gap-3">
              <div className="min-w-[140px] grow">
                <label className="mb-1 block text-xs font-medium text-slate-500">
                  {isUk ? "Опис" : "Description"}
                </label>
                <input
                  type="text"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder={isUk ? "Послуга або товар" : "Service or item"}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div className="w-20">
                <label className="mb-1 block text-xs font-medium text-slate-500">
                  {isUk ? "К-ть" : "Qty"}
                </label>
                <input
                  type="number"
                  min="1"
                  value={newQty}
                  onChange={(e) => setNewQty(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div className="w-28">
                <label className="mb-1 block text-xs font-medium text-slate-500">
                  {isUk ? "Ціна ($)" : "Price ($)"}
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  placeholder="0.00"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <button
                onClick={addLineItem}
                className="shrink-0 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-400"
              >
                + {isUk ? "Додати" : "Add"}
              </button>
            </div>

            {/* Totals */}
            <div className="mb-6 flex flex-col items-end gap-2 border-t border-slate-200 pt-4">
              <div className="flex items-center gap-4 text-sm">
                <span className="text-slate-500">Subtotal:</span>
                <span className="w-28 text-right font-medium text-slate-800">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-slate-500">{isUk ? "Податок" : "Tax"}:</span>
                <select
                  value={taxRate}
                  onChange={(e) => setTaxRate(parseInt(e.target.value, 10))}
                  className="rounded border border-slate-300 px-2 py-1 text-sm outline-none focus:border-emerald-500"
                >
                  <option value={0}>0%</option>
                  <option value={5}>5%</option>
                  <option value={20}>20%</option>
                </select>
                <span className="w-28 text-right text-slate-600">${taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-4 text-lg font-bold">
                <span className="text-slate-700">Total:</span>
                <span className="w-28 text-right text-emerald-600">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Generate PDF */}
            <div className="relative">
              <button
                onClick={generatePdf}
                className="w-full rounded-lg bg-[#0f172a] py-3 font-semibold text-white transition-colors hover:bg-[#1e293b]"
              >
                📄 {isUk ? "Згенерувати PDF" : "Generate PDF"}
              </button>

              {pdfToast && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-lg">
                  ✅ {isUk ? "PDF успішно створено!" : "PDF generated successfully!"}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ PRICING ════════════════════ */}
      <section className="bg-white px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              {isUk ? "Прості та Прозорі Ціни" : "Simple, Transparent Pricing"}
            </h2>
            <p className="mb-6 text-slate-500">
              {isUk ? "Починайте безкоштовно. Оновлюйтесь, коли будете готові." : "Start free. Upgrade when you're ready."}
            </p>

            {/* Annual toggle */}
            <div className="inline-flex items-center gap-3 rounded-full bg-slate-100 px-4 py-2">
              <span className={`text-sm font-medium ${!annual ? "text-slate-900" : "text-slate-400"}`}>
                {isUk ? "Щомісячно" : "Monthly"}
              </span>
              <button
                onClick={() => setAnnual(!annual)}
                className={`relative h-6 w-11 rounded-full transition-colors ${annual ? "bg-emerald-500" : "bg-slate-300"}`}
                aria-label="Toggle annual billing"
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${annual ? "translate-x-5" : ""}`}
                />
              </button>
              <span className={`text-sm font-medium ${annual ? "text-slate-900" : "text-slate-400"}`}>
                {isUk ? "Щорічно" : "Annual"}
              </span>
              {annual && (
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                  -20%
                </span>
              )}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pricing.map((plan) => {
              const price =
                plan.monthly === 0
                  ? plan.name === "Free"
                    ? "$0"
                    : isUk
                      ? "Індивідуально"
                      : "Custom"
                  : annual
                    ? `$${(plan.monthly * 0.8).toFixed(0)}`
                    : `$${plan.monthly}`;
              const isPopular = plan.popular;

              return (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl border p-6 transition-shadow hover:shadow-lg ${
                    isPopular
                      ? "border-emerald-500 shadow-md shadow-emerald-500/10"
                      : "border-slate-200"
                  }`}
                >
                  {isPopular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white">
                      {isUk ? "Популярний" : "Most Popular"}
                    </span>
                  )}
                  <h3 className="mb-1 text-xl font-bold text-slate-900">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-extrabold text-slate-900">{price}</span>
                    {plan.monthly > 0 && (
                      <span className="text-sm text-slate-500">/{isUk ? "міс" : "mo"}</span>
                    )}
                  </div>
                  <ul className="mb-6 space-y-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="shrink-0 text-emerald-500">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full rounded-lg py-2.5 text-sm font-semibold transition-colors ${
                      isPopular
                        ? "bg-emerald-500 text-white hover:bg-emerald-400"
                        : "border border-slate-300 text-slate-700 hover:border-emerald-500 hover:text-emerald-600"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════ INTEGRATIONS ════════════════════ */}
      <section className="bg-slate-50 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="mb-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            {isUk ? "Інтеграції" : "Integrations"}
          </h2>
          <p className="mb-10 text-slate-500">
            {isUk
              ? "Підключіть InvoiceFlow до улюблених інструментів за хвилини."
              : "Connect InvoiceFlow to your favorite tools in minutes."}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {INTEGRATIONS.map((int) => (
              <span
                key={int.name}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="text-lg">{int.icon}</span>
                {int.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ ROI CALCULATOR ════════════════════ */}
      <section className="bg-white px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              {isUk ? "Калькулятор ROI" : "ROI Calculator"}
            </h2>
            <p className="text-slate-500">
              {isUk
                ? "Дізнайтесь, скільки часу та грошей ви заощадите з InvoiceFlow."
                : "See how much time and money you'll save with InvoiceFlow."}
            </p>
          </div>

          <div className="grid gap-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:grid-cols-2 sm:p-8">
            {/* Inputs */}
            <div className="space-y-5">
              <div>
                <label className="mb-2 flex items-center justify-between text-sm font-medium text-slate-700">
                  <span>{isUk ? "Рахунків на місяць" : "Invoices per month"}</span>
                  <span className="font-bold text-emerald-600">{invoicesPerMonth}</span>
                </label>
                <input
                  type="range"
                  min={5}
                  max={500}
                  step={5}
                  value={invoicesPerMonth}
                  onChange={(e) => setInvoicesPerMonth(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-500"
                />
              </div>
              <div>
                <label className="mb-2 flex items-center justify-between text-sm font-medium text-slate-700">
                  <span>{isUk ? "Хвилин на рахунок" : "Minutes per invoice"}</span>
                  <span className="font-bold text-emerald-600">{timePerInvoice}</span>
                </label>
                <input
                  type="range"
                  min={5}
                  max={60}
                  step={5}
                  value={timePerInvoice}
                  onChange={(e) => setTimePerInvoice(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-500"
                />
              </div>
              <div>
                <label className="mb-2 flex items-center justify-between text-sm font-medium text-slate-700">
                  <span>{isUk ? "Ставка за годину ($)" : "Hourly rate ($)"}</span>
                  <span className="font-bold text-emerald-600">${hourlyRate}</span>
                </label>
                <input
                  type="range"
                  min={10}
                  max={200}
                  step={5}
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-500"
                />
              </div>
            </div>

            {/* Results */}
            <div className="flex flex-col justify-center gap-4">
              <div className="rounded-xl bg-emerald-50 p-4 text-center">
                <p className="text-sm text-slate-500">{isUk ? "Час заощаджено на місяць" : "Time saved per month"}</p>
                <p className="text-2xl font-extrabold text-emerald-600">{timeSavedHours.toFixed(1)} {isUk ? "год" : "hrs"}</p>
              </div>
              <div className="rounded-xl bg-emerald-50 p-4 text-center">
                <p className="text-sm text-slate-500">{isUk ? "Економія на місяць" : "Money saved per month"}</p>
                <p className="text-2xl font-extrabold text-emerald-600">${moneySavedMonth.toFixed(0)}</p>
              </div>
              <div className="rounded-xl bg-[#0f172a] p-4 text-center">
                <p className="text-sm text-slate-400">{isUk ? "Економія на рік" : "Money saved per year"}</p>
                <p className="text-3xl font-extrabold text-emerald-400">${moneySavedYear.toFixed(0)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ TESTIMONIALS ════════════════════ */}
      <section className="bg-slate-50 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              {isUk ? "Що Кажуть Клієнти" : "What Our Customers Say"}
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-3 flex gap-1 text-emerald-400">
                  {"★★★★★".split("").map((s, i) => (
                    <span key={i}>{s}</span>
                  ))}
                </div>
                <p className="mb-4 text-sm leading-relaxed text-slate-600">"{t.text}"</p>
                <div>
                  <p className="text-sm font-bold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ API SECTION ════════════════════ */}
      <section className="bg-white px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="mb-3 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                {isUk ? "Для Розробників" : "For Developers"}
              </span>
              <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">
                {isUk ? "Потужний API" : "Powerful API"}
              </h2>
              <p className="mb-6 text-slate-500">
                {isUk
                  ? "RESTful API з повною документацією. Створюйте, надсилайте та відстежуйте рахунки програмно."
                  : "RESTful API with full documentation. Create, send, and track invoices programmatically."}
              </p>
              <button className="rounded-lg border border-emerald-500 px-5 py-2.5 text-sm font-semibold text-emerald-600 transition-colors hover:bg-emerald-50">
                📖 {isUk ? "Переглянути Документацію" : "View Docs"}
              </button>
            </div>

            {/* Code block */}
            <div className="overflow-hidden rounded-xl border border-slate-700 bg-[#0f172a] shadow-xl">
              <div className="flex items-center gap-2 border-b border-slate-700 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <span className="h-3 w-3 rounded-full bg-yellow-500" />
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
                <span className="ml-2 text-xs text-slate-500">create-invoice.sh</span>
              </div>
              <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-slate-300">
                <code>{`curl -X POST https://api.invoiceflow.io/v1/invoices \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "client": "acme@corp.com",
    "currency": "USD",
    "items": [
      {
        "description": "Web Development",
        "quantity": 1,
        "unit_price": 4500
      }
    ],
    "tax_rate": 20,
    "due_date": "2026-04-15",
    "auto_send": true
  }'`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ CTA ════════════════════ */}
      <section className="bg-linear-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            {isUk
              ? "Готові оптимізувати ваш білінг?"
              : "Ready to streamline your billing?"}
          </h2>
          <p className="mb-8 text-slate-400">
            {isUk
              ? "Приєднуйтесь до 25,000+ бізнесів, які вже використовують InvoiceFlow."
              : "Join 25,000+ businesses already using InvoiceFlow."}
          </p>

          {!ctaSubmitted ? (
            <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={ctaEmail}
                onChange={(e) => setCtaEmail(e.target.value)}
                placeholder={isUk ? "you@company.com" : "you@company.com"}
                className="grow rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <button
                onClick={() => {
                  if (ctaEmail.includes("@")) setCtaSubmitted(true);
                }}
                className="shrink-0 rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-400"
              >
                {isUk ? "Розпочати Безкоштовно" : "Get Started Free"}
              </button>
            </div>
          ) : (
            <div className="rounded-xl bg-emerald-500/10 p-6">
              <p className="text-lg font-bold text-emerald-400">
                🎉 {isUk ? "Чудово! Перевірте вашу пошту." : "Awesome! Check your email."}
              </p>
              <p className="mt-1 text-sm text-slate-400">
                {isUk
                  ? "Ми надіслали посилання для активації на вашу адресу."
                  : "We've sent an activation link to your email address."}
              </p>
            </div>
          )}

          <p className="mt-4 text-xs text-slate-500">
            {isUk ? "Безкоштовно назавжди. Кредитна картка не потрібна." : "Free forever plan. No credit card required."}
          </p>
        </div>
      </section>

      {/* ════════════════════ FOOTER ════════════════════ */}
      <footer className="border-t border-slate-200 bg-white px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Product */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900">
              {isUk ? "Продукт" : "Product"}
            </h4>
            <ul className="space-y-2 text-sm text-slate-500">
              {(isUk
                ? ["Можливості", "Ціни", "Інтеграції", "Що нового", "Безпека"]
                : ["Features", "Pricing", "Integrations", "Changelog", "Security"]
              ).map((item) => (
                <li key={item} className="cursor-pointer transition-colors hover:text-emerald-600">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900">
              {isUk ? "Компанія" : "Company"}
            </h4>
            <ul className="space-y-2 text-sm text-slate-500">
              {(isUk
                ? ["Про нас", "Блог", "Кар'єра", "Преса", "Контакти"]
                : ["About", "Blog", "Careers", "Press", "Contact"]
              ).map((item) => (
                <li key={item} className="cursor-pointer transition-colors hover:text-emerald-600">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900">
              {isUk ? "Правове" : "Legal"}
            </h4>
            <ul className="space-y-2 text-sm text-slate-500">
              {(isUk
                ? ["Умови Використання", "Політика Конфіденційності", "Cookie Політика", "GDPR", "SLA"]
                : ["Terms of Service", "Privacy Policy", "Cookie Policy", "GDPR", "SLA"]
              ).map((item) => (
                <li key={item} className="cursor-pointer transition-colors hover:text-emerald-600">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Developers */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900">
              {isUk ? "Розробникам" : "Developers"}
            </h4>
            <ul className="space-y-2 text-sm text-slate-500">
              {(isUk
                ? ["API Документація", "SDK", "Webhooks", "Статус", "GitHub"]
                : ["API Docs", "SDKs", "Webhooks", "Status", "GitHub"]
              ).map((item) => (
                <li key={item} className="cursor-pointer transition-colors hover:text-emerald-600">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 sm:flex-row">
          <span className="text-sm font-bold text-slate-900">📊 InvoiceFlow</span>
          <p className="text-xs text-slate-400">
            &copy; 2026 InvoiceFlow. {isUk ? "Усі права захищено." : "All rights reserved."}
          </p>
        </div>
      </footer>
    </div>
  );
}
