"use client";

import { useState } from "react";
import {
  TrendingUp,
  Calculator,
  Shield,
  BarChart3,
  Users,
  Briefcase,
  Phone,
  ArrowRight,
  Check,
  DollarSign,
  Search,
  FileText,
  Handshake,
  BookOpen,
  Award,
  MapPin,
  Mail,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

export function FinAdvisorsDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  // --- ROI Calculator state ---
  const [calcRevenue, setCalcRevenue] = useState("");
  const [calcTaxRate, setCalcTaxRate] = useState("");
  const [calcDone, setCalcDone] = useState(false);

  // --- Contact form state ---
  const [formCompany, setFormCompany] = useState("");
  const [formRevenue, setFormRevenue] = useState("");
  const [formService, setFormService] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // --- Nav ---
  const [navOpen, setNavOpen] = useState(false);

  // ─── DATA ────────────────────────────────────────────────────────────────────

  const navLinks = isUk
    ? ["Послуги", "Калькулятор", "Кейси", "Команда", "Тарифи", "Контакт"]
    : ["Services", "Calculator", "Cases", "Team", "Pricing", "Contact"];

  const services = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: isUk ? "Податкова Оптимізація" : "Tax Optimization",
      desc: isUk
        ? "Легальне зниження податкового навантаження через структурування бізнесу, пільги та міжнародне планування."
        : "Legal tax burden reduction through business structuring, incentives utilization and international tax planning.",
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: isUk ? "Фінансовий Аудит" : "Financial Audit",
      desc: isUk
        ? "Незалежна перевірка фінансової звітності, виявлення ризиків та рекомендації з покращення внутрішнього контролю."
        : "Independent financial statement review, risk identification and internal control improvement recommendations.",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: isUk ? "Оцінка Бізнесу" : "Business Valuation",
      desc: isUk
        ? "Визначення ринкової вартості компанії для M&A, залучення інвестицій, судових спорів або внутрішніх цілей."
        : "Determining company market value for M&A, investment attraction, litigation or internal strategic purposes.",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: isUk ? "Інвестиційний Консалтинг" : "Investment Advisory",
      desc: isUk
        ? "Розробка інвестиційної стратегії, Due Diligence цільових активів та супровід угод від LOI до закриття."
        : "Investment strategy development, target asset Due Diligence and deal support from LOI to closing.",
    },
    {
      icon: <Handshake className="w-6 h-6" />,
      title: isUk ? "Супровід M&A" : "M&A Support",
      desc: isUk
        ? "Повний цикл підтримки злиттів і поглинань: пошук цілей, оцінка, переговори, інтеграція."
        : "Full-cycle mergers and acquisitions support: target screening, valuation, negotiation and integration.",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: isUk ? "Аутсорс Бухгалтерії" : "Accounting Outsource",
      desc: isUk
        ? "Ведення бухгалтерського та податкового обліку під ключ, звітність за IFRS та національними стандартами."
        : "Turnkey bookkeeping and tax accounting, reporting under IFRS and national standards.",
    },
  ];

  const cases = [
    {
      client: isUk ? "Виробнича компанія" : "Manufacturing Company",
      industry: isUk ? "Виробництво, 120 співробітників" : "Manufacturing, 120 employees",
      challenge: isUk
        ? "Ефективна ставка податку 28%, відсутність використання доступних пільг."
        : "Effective tax rate at 28%, no utilization of available tax incentives.",
      result: isUk ? "Зниження податкового навантаження на 34%" : "Tax burden reduced by 34%",
      metric: "34%",
      metricLabel: isUk ? "економія на податках" : "tax savings",
    },
    {
      client: isUk ? "IT-компанія" : "IT Company",
      industry: isUk ? "Технології, серія B" : "Technology, Series B",
      challenge: isUk
        ? "Потрібна незалежна оцінка перед раундом інвестицій для обґрунтування оцінки."
        : "Needed independent valuation before investment round to justify company valuation.",
      result: isUk ? "Оцінка підтвердила мультиплікатор 8.5x EBITDA" : "Valuation confirmed at 8.5x EBITDA multiple",
      metric: "8.5x",
      metricLabel: "EBITDA",
    },
    {
      client: isUk ? "Мережа ресторанів" : "Restaurant Chain",
      industry: isUk ? "HoReCa, 14 локацій" : "HoReCa, 14 locations",
      challenge: isUk
        ? "Хаотичний облік, ризики при податковій перевірці, відсутність консолідованої звітності."
        : "Disorganized accounting, tax audit risks, no consolidated financial reporting.",
      result: isUk ? "Нуль штрафів при аудиті, звітність за 3 дні" : "Zero penalties at audit, reporting in 3 days",
      metric: "0",
      metricLabel: isUk ? "штрафів" : "penalties",
    },
  ];

  const team = [
    {
      initials: "OB",
      name: isUk ? "Олексій Бондар" : "Oleksiy Bondar",
      title: isUk ? "Керуючий Партнер" : "Managing Partner",
      edu: "MBA Kyiv School of Economics",
      years: isUk ? "18 років досвіду" : "18 years experience",
      focus: isUk ? "Податкове планування, M&A" : "Tax Planning, M&A",
      cert: "ACCA, CPA",
    },
    {
      initials: "NK",
      name: isUk ? "Наталія Коваленко" : "Nataliia Kovalenko",
      title: isUk ? "Партнер, Аудит" : "Partner, Audit",
      edu: isUk ? "Магістр фінансів, КНУ Шевченка" : "MSc Finance, Taras Shevchenko Uni",
      years: isUk ? "15 років досвіду" : "15 years experience",
      focus: isUk ? "IFRS, Внутрішній аудит" : "IFRS, Internal Audit",
      cert: "CIA, CISA",
    },
    {
      initials: "DM",
      name: isUk ? "Дмитро Мельник" : "Dmytro Melnyk",
      title: isUk ? "Партнер, Оцінка" : "Partner, Valuation",
      edu: "CFA Institute, London Business School",
      years: isUk ? "14 років досвіду" : "14 years experience",
      focus: isUk ? "Оцінка бізнесу, Інвестиції" : "Business Valuation, Investments",
      cert: "CFA, ASA",
    },
  ];

  const pricingTiers = [
    {
      name: isUk ? "Консультація" : "Consultation",
      price: isUk ? "від 5 000 грн" : "from $150",
      period: isUk ? "за сесію" : "per session",
      desc: isUk
        ? "Разова експертна консультація з конкретного фінансового питання."
        : "One-time expert consultation on a specific financial question.",
      features: isUk
        ? [
            "60-хвилинна сесія з партнером",
            "Письмовий висновок",
            "Рекомендації з наступних кроків",
            "Слот протягом 48 годин",
          ]
        : [
            "60-minute session with a partner",
            "Written summary report",
            "Next steps recommendations",
            "Slot within 48 hours",
          ],
      highlight: false,
    },
    {
      name: isUk ? "Пакет" : "Package",
      price: isUk ? "від 45 000 грн" : "from $1,200",
      period: isUk ? "за проект" : "per project",
      desc: isUk
        ? "Комплексний проект під ключ: аудит, оптимізація або оцінка бізнесу."
        : "Turnkey project: audit, tax optimization or business valuation.",
      features: isUk
        ? [
            "Виділена команда з 2-3 фахівців",
            "Глибокий аналіз та діагностика",
            "Детальний звіт з рекомендаціями",
            "Супровід впровадження 30 днів",
            "Щотижневі статус-звіти",
          ]
        : [
            "Dedicated team of 2-3 specialists",
            "In-depth analysis and diagnostics",
            "Detailed report with recommendations",
            "30-day implementation support",
            "Weekly status reports",
          ],
      highlight: true,
    },
    {
      name: isUk ? "Ретейнер" : "Retainer",
      price: isUk ? "від 25 000 грн" : "from $700",
      period: isUk ? "на місяць" : "per month",
      desc: isUk
        ? "Постійний фінансовий консалтинг та облікова підтримка."
        : "Ongoing financial advisory and accounting support.",
      features: isUk
        ? [
            "Виділений фінансовий радник",
            "Необмежені консультації",
            "Щомісячний фінансовий огляд",
            "Податковий календар та нагадування",
            "Пріоритетний SLA (4 години)",
            "Квартальна стратегічна сесія",
          ]
        : [
            "Dedicated financial advisor",
            "Unlimited consultations",
            "Monthly financial review",
            "Tax calendar and reminders",
            "Priority SLA (4 hours)",
            "Quarterly strategy session",
          ],
      highlight: false,
    },
  ];

  const revenueRanges = isUk
    ? ["до 5 млн грн", "5–20 млн грн", "20–100 млн грн", "100+ млн грн"]
    : ["Up to $150K", "$150K–$600K", "$600K–$3M", "$3M+"];

  const serviceOptions = isUk
    ? ["Податкова Оптимізація", "Фінансовий Аудит", "Оцінка Бізнесу", "Інвестиційний Консалтинг", "Супровід M&A", "Аутсорс Бухгалтерії"]
    : ["Tax Optimization", "Financial Audit", "Business Valuation", "Investment Advisory", "M&A Support", "Accounting Outsource"];

  // ─── CALCULATOR LOGIC ────────────────────────────────────────────────────────

  const revenue = parseFloat(calcRevenue) || 0;
  const taxRate = parseFloat(calcTaxRate) || 0;
  const currentTax = revenue * (taxRate / 100);
  const optimizedRate = Math.max(taxRate * 0.72, 5);
  const optimizedTax = revenue * (optimizedRate / 100);
  const estimatedSavings = currentTax - optimizedTax;

  const handleCalcSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (revenue > 0 && taxRate > 0) setCalcDone(true);
  };

  // ─── CONTACT SUBMIT ──────────────────────────────────────────────────────────

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  // ─── RENDER ──────────────────────────────────────────────────────────────────

  return (
    <div className="font-sans text-[#1E3A5F] bg-white min-w-0 overflow-x-hidden">

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <header className="bg-[#1E3A5F] sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3 shrink-0">
            <DollarSign className="w-7 h-7 text-[#C5A55A]" />
            <div>
              <div className="font-serif text-lg font-bold text-white leading-none tracking-wide">
                FinAdvisors
              </div>
              <div className="text-[#C5A55A] text-[10px] tracking-widest uppercase">
                {isUk ? "Фінансовий Консалтинг" : "Financial Consulting"}
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link}
                className="text-gray-300 hover:text-[#C5A55A] text-sm font-medium transition-colors"
              >
                {link}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden sm:inline-flex items-center gap-2 bg-[#C5A55A] hover:bg-[#d4b56a] text-[#1E3A5F] text-sm font-bold px-4 py-2 rounded transition-colors shrink-0">
              <Phone className="w-4 h-4" />
              {isUk ? "Безкоштовна Консультація" : "Free Consultation"}
            </button>
            <button
              className="md:hidden text-white"
              onClick={() => setNavOpen(!navOpen)}
            >
              {navOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {navOpen && (
          <div className="md:hidden bg-[#1E3A5F] border-t border-[#2a4f7a] px-4 pb-4">
            {navLinks.map((link) => (
              <button key={link} className="block text-gray-300 py-2 text-sm w-full text-left">
                {link}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="bg-linear-to-br from-[#1E3A5F] via-[#162d4a] to-[#0f2035] min-h-[520px] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#C5A55A]/20 border border-[#C5A55A]/40 text-[#C5A55A] text-xs font-semibold px-3 py-1 rounded-full mb-6 tracking-wider uppercase">
              <Award className="w-3.5 h-3.5" />
              {isUk ? "Надійний Партнер для Бізнесу з 2011" : "Trusted Business Partner Since 2011"}
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
              {isUk ? (
                <>Ваші Фінанси.<br /><span className="text-[#C5A55A]">Наша Експертиза.</span></>
              ) : (
                <>Your Finances.<br /><span className="text-[#C5A55A]">Our Expertise.</span></>
              )}
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
              {isUk
                ? "Допомагаємо малому та середньому бізнесу Києва оптимізувати податки, пройти аудит та прийняти стратегічні фінансові рішення."
                : "We help Kyiv SMBs optimize taxes, navigate audits and make strategic financial decisions with confidence."}
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <button className="bg-[#C5A55A] hover:bg-[#d4b56a] text-[#1E3A5F] font-bold px-6 py-3 rounded transition-colors flex items-center gap-2">
                {isUk ? "Розрахувати Економію" : "Calculate Savings"}
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="border-2 border-white/40 text-white hover:border-[#C5A55A] hover:text-[#C5A55A] font-semibold px-6 py-3 rounded transition-colors">
                {isUk ? "Наші Кейси" : "Our Case Studies"}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {[
                { val: "350+", label: isUk ? "клієнтів" : "clients" },
                { val: "₴2.1B", label: isUk ? "оптимізовано" : "optimized" },
                { val: "98%", label: isUk ? "задоволеність" : "satisfaction" },
              ].map((stat) => (
                <div key={stat.val}>
                  <div className="text-[#C5A55A] font-serif text-2xl font-bold">{stat.val}</div>
                  <div className="text-gray-400 dark:text-neutral-500 text-xs uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center relative h-72">
            <div className="absolute w-48 h-48 border-4 border-[#C5A55A]/50 rotate-6 rounded-lg top-0 right-8" />
            <div className="absolute w-36 h-36 bg-[#C5A55A]/15 rounded-full bottom-4 right-4" />
            <div className="absolute w-24 h-24 border-2 border-white/20 rounded-full top-4 left-8" />
            <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <TrendingUp className="w-16 h-16 text-[#C5A55A] mx-auto mb-3" />
              <div className="text-white font-serif text-lg font-bold text-center">
                {isUk ? "Зростання Прибутку" : "Profit Growth"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ───────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#f8f7f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#C5A55A] text-sm font-semibold uppercase tracking-widest mb-2">
              {isUk ? "Що Ми Робимо" : "What We Do"}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E3A5F]">
              {isUk ? "Наші Послуги" : "Our Services"}
            </h2>
            <p className="text-gray-500 dark:text-neutral-400 mt-3 max-w-2xl mx-auto">
              {isUk
                ? "Комплексний фінансовий супровід для бізнесу на кожному етапі розвитку."
                : "Comprehensive financial support for businesses at every stage of growth."}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-gray-100 dark:border-neutral-700 hover:border-[#C5A55A] hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 bg-[#1E3A5F]/10 rounded-xl flex items-center justify-center text-[#1E3A5F] group-hover:bg-[#C5A55A]/20 group-hover:text-[#C5A55A] transition-colors mb-4">
                  {s.icon}
                </div>
                <h3 className="font-serif font-bold text-[#1E3A5F] text-lg mb-2">{s.title}</h3>
                <p className="text-gray-500 dark:text-neutral-400 text-sm leading-relaxed">{s.desc}</p>
                <button className="mt-4 text-[#C5A55A] text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                  {isUk ? "Детальніше" : "Learn More"} <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROI CALCULATOR ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#1E3A5F]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#C5A55A] text-sm font-semibold uppercase tracking-widest mb-2">
              <Calculator className="w-4 h-4 inline-block mr-1 -mt-0.5" />
              {isUk ? "Інструмент" : "Tool"}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              {isUk ? "Калькулятор Економії" : "Savings Calculator"}
            </h2>
            <p className="text-gray-400 dark:text-neutral-500 mt-3 max-w-xl mx-auto">
              {isUk
                ? "Дізнайтесь, скільки ваша компанія може заощадити на податках за допомогою оптимізації."
                : "Find out how much your company could save on taxes through optimization."}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <form onSubmit={handleCalcSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wide">
                    {isUk ? "Річна Виручка ($)" : "Annual Revenue ($)"}
                  </label>
                  <input
                    type="number"
                    value={calcRevenue}
                    onChange={(e) => { setCalcRevenue(e.target.value); setCalcDone(false); }}
                    required
                    min="1"
                    placeholder={isUk ? "напр. 500000" : "e.g. 500000"}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-[#C5A55A] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wide">
                    {isUk ? "Поточна Ставка Податку (%)" : "Current Tax Rate (%)"}
                  </label>
                  <input
                    type="number"
                    value={calcTaxRate}
                    onChange={(e) => { setCalcTaxRate(e.target.value); setCalcDone(false); }}
                    required
                    min="1"
                    max="60"
                    placeholder={isUk ? "напр. 25" : "e.g. 25"}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-[#C5A55A] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#C5A55A] hover:bg-[#d4b56a] text-[#1E3A5F] font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                {isUk ? "Розрахувати" : "Calculate"}
              </button>
            </form>

            {calcDone && (
              <div className="mt-8 pt-8 border-t border-white/20">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-gray-400 dark:text-neutral-500 text-xs uppercase tracking-wide mb-1">
                      {isUk ? "Поточні Податки" : "Current Taxes"}
                    </div>
                    <div className="text-white font-serif text-xl font-bold">
                      ${currentTax.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-gray-500 dark:text-neutral-400 text-xs">{taxRate}%</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-gray-400 dark:text-neutral-500 text-xs uppercase tracking-wide mb-1">
                      {isUk ? "Після Оптимізації" : "After Optimization"}
                    </div>
                    <div className="text-white font-serif text-xl font-bold">
                      ${optimizedTax.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-gray-500 dark:text-neutral-400 text-xs">{optimizedRate.toFixed(1)}%</div>
                  </div>
                  <div className="bg-[#C5A55A]/20 border border-[#C5A55A]/40 rounded-xl p-4">
                    <div className="text-[#C5A55A] text-xs uppercase tracking-wide mb-1 font-semibold">
                      {isUk ? "Ваша Економія" : "Your Savings"}
                    </div>
                    <div className="text-[#C5A55A] font-serif text-xl font-bold">
                      ${estimatedSavings.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-[#C5A55A]/60 text-xs">
                      {isUk ? "на рік" : "per year"}
                    </div>
                  </div>
                </div>
                <p className="text-gray-500 dark:text-neutral-400 text-xs text-center mt-4">
                  {isUk
                    ? "* Попередня оцінка. Фактичний результат залежить від структури бізнесу та юрисдикції."
                    : "* Preliminary estimate. Actual results depend on business structure and jurisdiction."}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-white dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#C5A55A] text-sm font-semibold uppercase tracking-widest mb-2">
              {isUk ? "Результати" : "Results"}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E3A5F]">
              {isUk ? "Кейси Клієнтів" : "Client Case Studies"}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {cases.map((c, i) => (
              <div
                key={i}
                className="bg-[#f8f7f5] rounded-2xl overflow-hidden border border-gray-100 dark:border-neutral-700 hover:shadow-lg transition-shadow"
              >
                <div className="bg-[#1E3A5F] p-6 text-center">
                  <div className="text-[#C5A55A] font-serif text-4xl font-bold">{c.metric}</div>
                  <div className="text-gray-300 text-sm mt-1">{c.metricLabel}</div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase className="w-4 h-4 text-[#C5A55A]" />
                    <span className="font-serif font-bold text-[#1E3A5F]">{c.client}</span>
                  </div>
                  <p className="text-gray-400 dark:text-neutral-500 text-xs mb-3">{c.industry}</p>
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-[#1E3A5F] uppercase tracking-wide mb-1">
                      {isUk ? "Виклик" : "Challenge"}
                    </p>
                    <p className="text-gray-600 dark:text-neutral-300 text-sm">{c.challenge}</p>
                  </div>
                  <div className="bg-[#C5A55A]/10 rounded-lg p-3 flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#C5A55A] mt-0.5 shrink-0" />
                    <p className="text-[#1E3A5F] text-sm font-semibold">{c.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#f8f7f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#C5A55A] text-sm font-semibold uppercase tracking-widest mb-2">
              {isUk ? "Наші Партнери" : "Our Partners"}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E3A5F]">
              {isUk ? "Команда Експертів" : "Expert Team"}
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {team.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 text-center border border-gray-100 dark:border-neutral-700 hover:border-[#C5A55A] hover:shadow-lg transition-all"
              >
                <div className="w-16 h-16 bg-linear-to-br from-[#1E3A5F] to-[#162d4a] rounded-full flex items-center justify-center text-white font-serif font-bold text-lg mx-auto mb-4">
                  {t.initials}
                </div>
                <h3 className="font-serif font-bold text-[#1E3A5F] text-base leading-snug">{t.name}</h3>
                <p className="text-[#C5A55A] text-xs font-semibold mt-1 mb-3">{t.title}</p>
                <div className="space-y-1.5 text-left">
                  <div className="flex gap-2 text-xs text-gray-600">
                    <Award className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#C5A55A]" />
                    <span>{t.edu}</span>
                  </div>
                  <div className="flex gap-2 text-xs text-gray-600">
                    <Users className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#C5A55A]" />
                    <span>{t.years}</span>
                  </div>
                  <div className="flex gap-2 text-xs text-gray-600">
                    <TrendingUp className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#C5A55A]" />
                    <span>{t.focus}</span>
                  </div>
                  <div className="flex gap-2 text-xs text-gray-600">
                    <FileText className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#C5A55A]" />
                    <span>{t.cert}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#C5A55A] text-sm font-semibold uppercase tracking-widest mb-2">
              {isUk ? "Тарифи" : "Pricing"}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E3A5F]">
              {isUk ? "Прозоре Ціноутворення" : "Transparent Pricing"}
            </h2>
            <p className="text-gray-500 dark:text-neutral-400 mt-3 max-w-xl mx-auto">
              {isUk
                ? "Оберіть формат співпраці, що найкраще підходить вашому бізнесу."
                : "Choose the engagement format that best fits your business needs."}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricingTiers.map((tier, i) => (
              <div
                key={i}
                className={`rounded-2xl p-8 border-2 transition-shadow ${
                  tier.highlight
                    ? "border-[#C5A55A] bg-[#1E3A5F] text-white shadow-xl scale-[1.02]"
                    : "border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-[#C5A55A] hover:shadow-lg"
                }`}
              >
                {tier.highlight && (
                  <div className="text-center mb-4">
                    <span className="bg-[#C5A55A] text-[#1E3A5F] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {isUk ? "Популярний" : "Popular"}
                    </span>
                  </div>
                )}
                <h3 className={`font-serif text-xl font-bold text-center mb-1 ${tier.highlight ? "text-white" : "text-[#1E3A5F]"}`}>
                  {tier.name}
                </h3>
                <div className="text-center mb-2">
                  <span className={`font-serif text-3xl font-bold ${tier.highlight ? "text-[#C5A55A]" : "text-[#1E3A5F]"}`}>
                    {tier.price}
                  </span>
                </div>
                <p className={`text-center text-xs mb-4 ${tier.highlight ? "text-gray-400" : "text-gray-400"}`}>
                  {tier.period}
                </p>
                <p className={`text-sm text-center mb-6 ${tier.highlight ? "text-gray-300" : "text-gray-500"}`}>
                  {tier.desc}
                </p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2 text-sm">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${tier.highlight ? "text-[#C5A55A]" : "text-[#C5A55A]"}`} />
                      <span className={tier.highlight ? "text-gray-300" : "text-gray-600"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-bold text-sm transition-colors ${
                    tier.highlight
                      ? "bg-[#C5A55A] hover:bg-[#d4b56a] text-[#1E3A5F]"
                      : "bg-[#1E3A5F] hover:bg-[#162d4a] text-white"
                  }`}
                >
                  {isUk ? "Обрати" : "Choose Plan"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#f8f7f5]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#C5A55A] text-sm font-semibold uppercase tracking-widest mb-2">
              {isUk ? "Зв'язатися" : "Get in Touch"}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E3A5F]">
              {isUk ? "Залиште Заявку" : "Contact Us"}
            </h2>
          </div>

          {formSubmitted ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-[#C5A55A] shadow-lg">
              <Check className="w-12 h-12 text-[#C5A55A] mx-auto mb-4" />
              <h3 className="font-serif text-2xl font-bold text-[#1E3A5F] mb-2">
                {isUk ? "Дякуємо!" : "Thank You!"}
              </h3>
              <p className="text-gray-600">
                {isUk
                  ? `Ми отримали вашу заявку та зв'яжемося протягом робочого дня.`
                  : `We've received your request and will get back to you within one business day.`}
              </p>
              <button
                onClick={() => {
                  setFormSubmitted(false);
                  setFormCompany("");
                  setFormRevenue("");
                  setFormService("");
                  setFormPhone("");
                }}
                className="mt-6 text-[#C5A55A] font-semibold text-sm"
              >
                {isUk ? "Подати нову заявку" : "Submit Another Request"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="bg-white rounded-2xl p-8 border border-gray-200 dark:border-neutral-700 shadow-sm space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-neutral-300 mb-1 uppercase tracking-wide">
                    {isUk ? "Назва Компанії" : "Company Name"}
                  </label>
                  <input
                    type="text"
                    value={formCompany}
                    onChange={(e) => setFormCompany(e.target.value)}
                    required
                    placeholder={isUk ? "ТОВ Альфа" : "Acme Corp"}
                    className="w-full border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm text-[#1E3A5F] focus:border-[#C5A55A] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-neutral-300 mb-1 uppercase tracking-wide">
                    {isUk ? "Діапазон Виручки" : "Revenue Range"}
                  </label>
                  <select
                    value={formRevenue}
                    onChange={(e) => setFormRevenue(e.target.value)}
                    required
                    className="w-full border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm text-[#1E3A5F] focus:border-[#C5A55A] focus:outline-none"
                  >
                    <option value="">{isUk ? "Оберіть..." : "Select..."}</option>
                    {revenueRanges.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-neutral-300 mb-1 uppercase tracking-wide">
                    {isUk ? "Послуга" : "Service Interest"}
                  </label>
                  <select
                    value={formService}
                    onChange={(e) => setFormService(e.target.value)}
                    required
                    className="w-full border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm text-[#1E3A5F] focus:border-[#C5A55A] focus:outline-none"
                  >
                    <option value="">{isUk ? "Оберіть..." : "Select..."}</option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-neutral-300 mb-1 uppercase tracking-wide">
                    {isUk ? "Телефон" : "Phone"}
                  </label>
                  <input
                    type="tel"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    required
                    placeholder="+380 44 000 0000"
                    className="w-full border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm text-[#1E3A5F] focus:border-[#C5A55A] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#C5A55A] hover:bg-[#d4b56a] text-[#1E3A5F] font-bold py-3 rounded-lg transition-colors text-base flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" />
                {isUk ? "Надіслати Заявку" : "Submit Request"}
              </button>
              <p className="text-gray-400 dark:text-neutral-500 text-xs text-center">
                {isUk
                  ? "Ми відповідаємо протягом 1 робочого дня. Конфіденційність гарантована."
                  : "We respond within 1 business day. Confidentiality guaranteed."}
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="bg-[#1E3A5F] text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-6 h-6 text-[#C5A55A]" />
              <span className="font-serif text-lg font-bold text-white">FinAdvisors</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              {isUk
                ? "Фінансовий консалтинг для малого та середнього бізнесу Києва. Оптимізація, аудит, оцінка та стратегія."
                : "Financial consulting for Kyiv SMBs. Tax optimization, audit, valuation and strategic advisory."}
            </p>
            <div className="flex gap-3">
              {["in", "fb", "tg"].map((s) => (
                <div
                  key={s}
                  className="w-8 h-8 bg-white/10 rounded flex items-center justify-center text-xs font-bold hover:bg-[#C5A55A] hover:text-[#1E3A5F] cursor-pointer transition-colors"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
              {isUk ? "Послуги" : "Services"}
            </h4>
            <ul className="space-y-2 text-sm">
              {services.map((s) => (
                <li key={s.title}>
                  <button className="hover:text-[#C5A55A] transition-colors text-left">{s.title}</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
              {isUk ? "Офіс" : "Office"}
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C5A55A] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#C5A55A] font-semibold mb-1">{isUk ? "Київ" : "Kyiv"}</p>
                  <p>{isUk ? "вул. Хрещатик, 22, офіс 501" : "22 Khreshchatyk St., office 501"}</p>
                  <p>01001, {isUk ? "Україна" : "Ukraine"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A55A] shrink-0" />
                <p>+380 44 123 4567</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C5A55A] shrink-0" />
                <p>info@finadvisors.ua</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
              {isUk ? "Правова Інформація" : "Legal"}
            </h4>
            <ul className="space-y-2 text-sm">
              {(isUk
                ? ["Політика конфіденційності", "Договір оферти", "GDPR", "Ліцензії"]
                : ["Privacy Policy", "Terms of Service", "GDPR", "Licenses"]
              ).map((l) => (
                <li key={l}>
                  <button className="hover:text-[#C5A55A] transition-colors text-left">{l}</button>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-white/10 text-xs">
              <p className="text-[#C5A55A] font-semibold mb-1">
                {isUk ? "Членство" : "Membership"}
              </p>
              <p>ACCA Global · CFA Institute</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <p>&copy; 2025 FinAdvisors. {isUk ? "Всі права захищені." : "All rights reserved."}</p>
            <p className="text-gray-600">
              {isUk
                ? "Демо-компонент Codeworth \u00B7 Лише для презентаційних цілей"
                : "Codeworth demo component \u00B7 For presentation purposes only"}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
