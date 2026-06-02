"use client";

import { useState } from "react";

export function LexProDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  /* ── Legal Calculator state ── */
  const [serviceType, setServiceType] = useState("");
  const [complexity, setComplexity] = useState("simple");
  const [urgency, setUrgency] = useState("standard");

  /* ── Contact form state ── */
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [formSent, setFormSent] = useState(false);

  /* ── Calculator logic ── */
  const serviceHours: Record<string, number> = {
    corporate: 40,
    tax: 30,
    labor: 20,
    ip: 35,
    compliance: 25,
    litigation: 60,
  };

  const complexityMultiplier: Record<string, number> = {
    simple: 1,
    medium: 1.6,
    complex: 2.5,
  };

  const urgencyMultiplier: Record<string, number> = {
    standard: 1,
    expedited: 1.4,
  };

  const baseRate = 3500;
  const estimatedHours = serviceType
    ? Math.round(
        serviceHours[serviceType] *
          complexityMultiplier[complexity] *
          urgencyMultiplier[urgency]
      )
    : 0;
  const costMin = estimatedHours * baseRate;
  const costMax = Math.round(costMin * 1.3);

  /* ── Data ── */
  const nav = isUk
    ? ["Практика", "Команда", "Клієнти", "Блог", "Контакти"]
    : ["Practice", "Team", "Clients", "Blog", "Contact"];

  const practiceAreas = [
    {
      icon: "🏢",
      title: isUk ? "Корпоративне Право & M&A" : "Corporate Law & M&A",
      desc: isUk
        ? "Супровід злиттів, поглинань, реструктуризацій та корпоративного управління."
        : "Mergers, acquisitions, restructuring and corporate governance advisory.",
      points: isUk
        ? ["Due diligence", "Структурування угод", "Корпоративне управління"]
        : ["Due diligence", "Deal structuring", "Corporate governance"],
    },
    {
      icon: "📊",
      title: isUk ? "Податкове Планування" : "Tax Planning",
      desc: isUk
        ? "Оптимізація податкового навантаження та захист інтересів у податкових спорах."
        : "Tax optimization strategies and representation in tax disputes.",
      points: isUk
        ? ["Податкова оптимізація", "Трансфертне ціноутворення", "Податкові спори"]
        : ["Tax optimization", "Transfer pricing", "Tax disputes"],
    },
    {
      icon: "👥",
      title: isUk ? "Трудове Право" : "Labor Law",
      desc: isUk
        ? "Комплексне супроводження трудових відносин та вирішення колективних спорів."
        : "Comprehensive employment advisory and collective dispute resolution.",
      points: isUk
        ? ["Трудові договори", "Колективні спори", "HR-комплаєнс"]
        : ["Employment contracts", "Collective disputes", "HR compliance"],
    },
    {
      icon: "💡",
      title: isUk ? "Інтелектуальна Власність" : "Intellectual Property",
      desc: isUk
        ? "Захист патентів, торгових марок, авторських прав та комерційних таємниць."
        : "Protection of patents, trademarks, copyrights and trade secrets.",
      points: isUk
        ? ["Патенти та ТМ", "Авторське право", "Ліцензування"]
        : ["Patents & TM", "Copyright", "Licensing"],
    },
    {
      icon: "🛡️",
      title: isUk ? "Комплаєнс" : "Compliance",
      desc: isUk
        ? "Розробка та впровадження програм відповідності, антикорупційний аудит."
        : "Compliance program design, implementation and anti-corruption audits.",
      points: isUk
        ? ["AML/KYC", "Антикорупційний аудит", "Регуляторна відповідність"]
        : ["AML/KYC", "Anti-corruption audit", "Regulatory compliance"],
    },
    {
      icon: "⚔️",
      title: isUk ? "Судова Практика" : "Litigation",
      desc: isUk
        ? "Представництво у господарських, адміністративних та цивільних судах."
        : "Representation in commercial, administrative and civil courts.",
      points: isUk
        ? ["Господарські спори", "Арбітраж", "Примусове виконання"]
        : ["Commercial disputes", "Arbitration", "Enforcement"],
    },
  ];

  const caseResults = [
    {
      amount: "₴50M",
      label: isUk ? "Договірний спір — Виграно" : "Contract dispute — Won",
    },
    {
      amount: "IPO",
      label: isUk
        ? "Консультування IPO — Завершено"
        : "IPO advisory — Completed",
    },
    {
      amount: "₴120M",
      label: isUk ? "M&A угода — Закрито" : "M&A deal — Closed",
    },
    {
      amount: "€8M",
      label: isUk
        ? "Міжнародний арбітраж — Виграно"
        : "International arbitration — Won",
    },
  ];

  const teamMembers = [
    {
      emoji: "👨‍💼",
      name: isUk ? "Олександр Коваленко" : "Oleksandr Kovalenko",
      role: isUk ? "Керуючий партнер" : "Managing Partner",
      education: isUk
        ? "Київський національний університет, LLM Columbia"
        : "Kyiv National University, LLM Columbia",
      bar: isUk ? "Адвокатське свідоцтво №1247" : "Bar License #1247",
      spec: isUk ? "Корпоративне право, M&A" : "Corporate Law, M&A",
    },
    {
      emoji: "👩‍💼",
      name: isUk ? "Марія Шевченко" : "Maria Shevchenko",
      role: isUk ? "Старший партнер" : "Senior Partner",
      education: isUk
        ? "НаУКМА, LLM London School of Economics"
        : "NaUKMA, LLM London School of Economics",
      bar: isUk ? "Адвокатське свідоцтво №2389" : "Bar License #2389",
      spec: isUk ? "Податкове право, Комплаєнс" : "Tax Law, Compliance",
    },
    {
      emoji: "👨‍💼",
      name: isUk ? "Дмитро Бондаренко" : "Dmytro Bondarenko",
      role: isUk ? "Старший асоціат" : "Senior Associate",
      education: isUk
        ? "Львівський національний університет, MBA INSEAD"
        : "Lviv National University, MBA INSEAD",
      bar: isUk ? "Адвокатське свідоцтво №3561" : "Bar License #3561",
      spec: isUk ? "Інтелектуальна власність" : "Intellectual Property",
    },
    {
      emoji: "👩‍💼",
      name: isUk ? "Анна Лисенко" : "Anna Lysenko",
      role: isUk ? "Асоціат" : "Associate",
      education: isUk
        ? "Одеська юридична академія, LLM CEU"
        : "Odessa Law Academy, LLM CEU",
      bar: isUk ? "Адвокатське свідоцтво №4702" : "Bar License #4702",
      spec: isUk ? "Трудове право, Судова практика" : "Labor Law, Litigation",
    },
    {
      emoji: "👨‍💼",
      name: isUk ? "Ігор Мельник" : "Ihor Melnyk",
      role: isUk ? "Асоціат" : "Associate",
      education: isUk
        ? "Харківський юридичний університет"
        : "Kharkiv Law University",
      bar: isUk ? "Адвокатське свідоцтво №5198" : "Bar License #5198",
      spec: isUk ? "Арбітраж, Виконавче провадження" : "Arbitration, Enforcement",
    },
  ];

  const clientSegments = [
    {
      icon: "🚀",
      title: isUk ? "Стартапи" : "Startups",
      services: isUk
        ? [
            "Реєстрація та структурування",
            "Захист IP",
            "Угоди з інвесторами",
            "ESOP програми",
          ]
        : [
            "Incorporation & structuring",
            "IP protection",
            "Investor agreements",
            "ESOP programs",
          ],
    },
    {
      icon: "🏪",
      title: isUk ? "Малий та Середній Бізнес" : "SMB",
      services: isUk
        ? [
            "Договірна робота",
            "Трудові відносини",
            "Податкове планування",
            "Регуляторний комплаєнс",
          ]
        : [
            "Contract management",
            "Employment relations",
            "Tax planning",
            "Regulatory compliance",
          ],
    },
    {
      icon: "🏛️",
      title: isUk ? "Корпорації" : "Enterprise",
      services: isUk
        ? [
            "M&A супровід",
            "Корпоративне управління",
            "Антимонопольне право",
            "Комплексний аудит",
          ]
        : [
            "M&A advisory",
            "Corporate governance",
            "Antitrust law",
            "Comprehensive audit",
          ],
    },
    {
      icon: "🌍",
      title: isUk ? "Міжнародні Компанії" : "International",
      services: isUk
        ? [
            "Вихід на ринок України",
            "Міжнародний арбітраж",
            "Санкційний комплаєнс",
            "Крос-бордер угоди",
          ]
        : [
            "Ukraine market entry",
            "International arbitration",
            "Sanctions compliance",
            "Cross-border deals",
          ],
    },
  ];

  const blogPosts = [
    {
      date: "2026-03-20",
      tag: isUk ? "Корпоративне" : "Corporate",
      title: isUk
        ? "Нові вимоги до корпоративного управління у 2026 році"
        : "New Corporate Governance Requirements in 2026",
    },
    {
      date: "2026-03-12",
      tag: isUk ? "Податки" : "Tax",
      title: isUk
        ? "Трансфертне ціноутворення: ключові зміни"
        : "Transfer Pricing: Key Changes",
    },
    {
      date: "2026-03-05",
      tag: isUk ? "Комплаєнс" : "Compliance",
      title: isUk
        ? "AML-регулювання для фінтех-компаній"
        : "AML Regulation for Fintech Companies",
    },
  ];

  const serviceOptions = [
    { value: "corporate", label: isUk ? "Корпоративне право" : "Corporate Law" },
    { value: "tax", label: isUk ? "Податкове право" : "Tax Law" },
    { value: "labor", label: isUk ? "Трудове право" : "Labor Law" },
    { value: "ip", label: isUk ? "Інтелектуальна власність" : "Intellectual Property" },
    { value: "compliance", label: isUk ? "Комплаєнс" : "Compliance" },
    { value: "litigation", label: isUk ? "Судова практика" : "Litigation" },
  ];

  const formatCurrency = (n: number) =>
    n.toLocaleString("uk-UA", { style: "currency", currency: "UAH", maximumFractionDigits: 0 });

  /* ── Render ── */
  return (
    <div className="min-h-screen bg-white text-slate-700 font-sans">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚖️</span>
            <div className="leading-tight">
              <span className="text-xl font-bold text-slate-800 tracking-tight">
                LexPro
              </span>
              <span className="hidden sm:block text-[11px] text-slate-400 -mt-0.5">
                {isUk ? "Юридичні Рішення" : "Legal Solutions"}
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            {nav.map((item) => (
              <button key={item} className="hover:text-slate-900 transition-colors">
                {item}
              </button>
            ))}
          </nav>

          <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors">
            {isUk ? "Безкоштовна Консультація" : "Free Consultation"}
          </button>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative bg-linear-to-br from-slate-50 via-white to-emerald-50/30 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-block bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full mb-6">
            {isUk ? "🏆 Топ-10 юридичних фірм України" : "🏆 Top-10 Law Firms in Ukraine"}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
            {isUk
              ? "Правові Рішення\nдля Бізнесу"
              : "Legal Solutions\nfor Business"}
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-slate-500 mb-10 whitespace-pre-line">
            {isUk
              ? "Комплексний юридичний супровід для компаній — від стартапу до міжнародної корпорації. Стратегічний підхід. Вимірний результат."
              : "Comprehensive legal advisory for businesses — from startups to international corporations. Strategic approach. Measurable results."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors text-base">
              {isUk ? "Обговорити Проєкт" : "Discuss Your Project"}
            </button>
            <button className="border border-slate-300 hover:border-slate-400 text-slate-700 font-semibold px-8 py-3 rounded-lg transition-colors text-base">
              {isUk ? "Наші Кейси" : "Our Cases"}
            </button>
          </div>

          {/* Client logos row */}
          <div className="border-t border-slate-100 pt-8">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-5">
              {isUk ? "Нам довіряють" : "Trusted by"}
            </p>
            <div className="flex items-center justify-center gap-8 flex-wrap">
              {["TechCorp", "GlobalBank", "EnergoPlus", "AgroHolding", "MediaGroup", "FinTech UA"].map(
                (name) => (
                  <div
                    key={name}
                    className="w-24 h-10 bg-slate-100 rounded-md flex items-center justify-center text-[10px] font-semibold text-slate-400"
                  >
                    {name}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Practice Areas ── */}
      <section className="py-20 bg-white dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              {isUk ? "Практика" : "Practice Areas"}
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              {isUk
                ? "Спеціалізовані юридичні послуги для всіх аспектів вашого бізнесу"
                : "Specialized legal services covering every aspect of your business"}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {practiceAreas.map((area) => (
              <div
                key={area.title}
                className="group border border-slate-200 rounded-xl p-6 hover:border-emerald-300 hover:shadow-lg transition-all"
              >
                <span className="text-3xl mb-4 block">{area.icon}</span>
                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-emerald-700 transition-colors">
                  {area.title}
                </h3>
                <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                  {area.desc}
                </p>
                <ul className="space-y-1.5">
                  {area.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case Results Ticker ── */}
      <section className="py-14 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-white mb-10">
            {isUk ? "Результати Кейсів" : "Case Results"}
          </h2>

          <div className="flex flex-wrap justify-center gap-6">
            {caseResults.map((c, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur border border-white/10 rounded-xl px-8 py-6 text-center min-w-[200px]"
              >
                <div className="text-3xl font-extrabold text-emerald-400 mb-1">
                  {c.amount}
                </div>
                <div className="text-sm text-slate-300">{c.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              {isUk ? "Наша Команда" : "Our Team"}
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              {isUk
                ? "Досвідчені юристи з міжнародною освітою та визнаною експертизою"
                : "Experienced lawyers with international education and recognized expertise"}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((m) => (
              <div
                key={m.name}
                className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-2xl shrink-0">
                    {m.emoji}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{m.name}</h3>
                    <p className="text-sm text-emerald-600 font-medium">{m.role}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-slate-500">
                  <p className="flex items-start gap-2">
                    <span className="shrink-0">🎓</span> {m.education}
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="shrink-0">📜</span> {m.bar}
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="shrink-0">⚡</span> {m.spec}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Client Types ── */}
      <section className="py-20 bg-white dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              {isUk ? "Кого Ми Обслуговуємо" : "Who We Serve"}
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              {isUk
                ? "Індивідуальний підхід для кожного типу бізнесу"
                : "Tailored approach for every type of business"}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {clientSegments.map((seg) => (
              <div
                key={seg.title}
                className="border border-slate-200 rounded-xl p-6 hover:border-emerald-300 transition-colors"
              >
                <span className="text-4xl block mb-3">{seg.icon}</span>
                <h3 className="text-lg font-bold text-slate-800 mb-3">
                  {seg.title}
                </h3>
                <ul className="space-y-2">
                  {seg.services.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-emerald-500 shrink-0">✓</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Legal Calculator ── */}
      <section className="py-20 bg-linear-to-br from-slate-50 to-emerald-50/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              {isUk ? "Калькулятор Вартості" : "Legal Fee Calculator"}
            </h2>
            <p className="text-slate-500">
              {isUk
                ? "Отримайте попередню оцінку вартості юридичних послуг"
                : "Get a preliminary estimate for legal services"}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            {/* Service type */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {isUk ? "Тип послуги" : "Service Type"}
              </label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">
                  {isUk ? "— Оберіть послугу —" : "— Select service —"}
                </option>
                {serviceOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Complexity */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {isUk ? "Складність справи" : "Matter Complexity"}
              </label>
              <div className="flex gap-3">
                {(
                  [
                    { v: "simple", l: isUk ? "Проста" : "Simple" },
                    { v: "medium", l: isUk ? "Середня" : "Medium" },
                    { v: "complex", l: isUk ? "Складна" : "Complex" },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.v}
                    onClick={() => setComplexity(opt.v)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                      complexity === opt.v
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-white text-slate-600 border-slate-300 hover:border-slate-400"
                    }`}
                  >
                    {opt.l}
                  </button>
                ))}
              </div>
            </div>

            {/* Urgency */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {isUk ? "Терміновість" : "Urgency"}
              </label>
              <div className="flex gap-3">
                {(
                  [
                    { v: "standard", l: isUk ? "Стандартна" : "Standard" },
                    { v: "expedited", l: isUk ? "Прискорена" : "Expedited" },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.v}
                    onClick={() => setUrgency(opt.v)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                      urgency === opt.v
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-white text-slate-600 border-slate-300 hover:border-slate-400"
                    }`}
                  >
                    {opt.l}
                  </button>
                ))}
              </div>
            </div>

            {/* Results */}
            {serviceType ? (
              <div className="bg-slate-50 rounded-xl p-6 mb-6">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                      {isUk ? "Орієнтовні години" : "Estimated Hours"}
                    </p>
                    <p className="text-3xl font-extrabold text-slate-800">
                      {estimatedHours}
                      <span className="text-base font-normal text-slate-400 ml-1">
                        {isUk ? "год" : "hrs"}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                      {isUk ? "Діапазон вартості" : "Cost Range"}
                    </p>
                    <p className="text-lg font-bold text-emerald-700">
                      {formatCurrency(costMin)} – {formatCurrency(costMax)}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 rounded-xl p-6 mb-6 text-center text-sm text-slate-400">
                {isUk
                  ? "Оберіть тип послуги для розрахунку"
                  : "Select a service type to calculate"}
              </div>
            )}

            <button
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-40"
              disabled={!serviceType}
            >
              {isUk ? "Запросити Пропозицію" : "Request Quote"}
            </button>
          </div>
        </div>
      </section>

      {/* ── Blog / Insights ── */}
      <section className="py-20 bg-white dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              {isUk ? "Блог & Інсайти" : "Blog & Insights"}
            </h2>
            <p className="text-slate-500">
              {isUk
                ? "Актуальні правові новини та аналітика від нашої команди"
                : "Latest legal news and analysis from our team"}
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <article
                key={i}
                className="group border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-40 bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center text-5xl">
                  📄
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs text-slate-400">{post.date}</span>
                    <span className="text-xs font-medium bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                      {post.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-800 mb-3 group-hover:text-emerald-700 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
                    {isUk ? "Читати →" : "Read →"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Form ── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              {isUk ? "Зв'язатися з Нами" : "Contact Us"}
            </h2>
            <p className="text-slate-500">
              {isUk
                ? "Опишіть вашу ситуацію — ми відповімо протягом 2 годин"
                : "Describe your situation — we will respond within 2 hours"}
            </p>
          </div>

          {formSent ? (
            <div className="bg-white border border-emerald-200 rounded-2xl p-10 text-center">
              <span className="text-5xl block mb-4">✅</span>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                {isUk ? "Запит Надіслано!" : "Request Sent!"}
              </h3>
              <p className="text-slate-500">
                {isUk
                  ? "Наш юрист зв'яжеться з вами протягом 2 годин."
                  : "Our lawyer will contact you within 2 hours."}
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSent(true);
              }}
              className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    {isUk ? "Ім'я" : "Name"}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder={isUk ? "Ваше ім'я" : "Your name"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    {isUk ? "Компанія" : "Company"}
                  </label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder={isUk ? "Назва компанії" : "Company name"}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="email@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    {isUk ? "Телефон" : "Phone"}
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="+380 ..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  {isUk ? "Потрібна послуга" : "Service Needed"}
                </label>
                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">
                    {isUk ? "— Оберіть послугу —" : "— Select service —"}
                  </option>
                  {serviceOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  {isUk ? "Повідомлення" : "Message"}
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  placeholder={
                    isUk
                      ? "Коротко опишіть вашу ситуацію..."
                      : "Briefly describe your situation..."
                  }
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                {isUk ? "Надіслати Запит" : "Send Request"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-slate-900 text-slate-300 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">⚖️</span>
                <span className="text-xl font-bold text-white">LexPro</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                {isUk
                  ? "Юридична фірма повного циклу. Стратегічний партнер вашого бізнесу з 2010 року."
                  : "Full-service law firm. Strategic partner of your business since 2010."}
              </p>
            </div>

            {/* Office 1 */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">
                {isUk ? "Офіс Київ" : "Kyiv Office"}
              </h4>
              <div className="space-y-2 text-sm text-slate-400">
                <p>📍 {isUk ? "вул. Хрещатик, 22, оф. 501" : "22 Khreschatyk St., office 501"}</p>
                <p>{isUk ? "Київ, 01001" : "Kyiv, 01001"}</p>
                <p>📞 +380 44 123 4567</p>
              </div>
            </div>

            {/* Office 2 */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">
                {isUk ? "Офіс Львів" : "Lviv Office"}
              </h4>
              <div className="space-y-2 text-sm text-slate-400">
                <p>📍 {isUk ? "пр. Свободи, 15, оф. 301" : "15 Svobody Ave., office 301"}</p>
                <p>{isUk ? "Львів, 79000" : "Lviv, 79000"}</p>
                <p>📞 +380 32 987 6543</p>
              </div>
            </div>

            {/* Contact & Bar */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">
                {isUk ? "Контакти" : "Contact"}
              </h4>
              <div className="space-y-2 text-sm text-slate-400">
                <p>✉️ office@lexpro.ua</p>
                <p>🌐 www.lexpro.ua</p>
                <div className="pt-3 border-t border-slate-700 mt-3">
                  <p className="text-xs text-slate-500">
                    {isUk
                      ? "Свідоцтво НААУ №0012-2010"
                      : "UNBA Certificate #0012-2010"}
                  </p>
                  <p className="text-xs text-slate-500">
                    {isUk
                      ? "Реєстр адвокатських об'єднань №456"
                      : "Bar Association Registry #456"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2026 LexPro. {isUk ? "Усі права захищені." : "All rights reserved."}</p>
            <div className="flex items-center gap-4">
              <button className="hover:text-slate-300 transition-colors">
                {isUk ? "Політика конфіденційності" : "Privacy Policy"}
              </button>
              <button className="hover:text-slate-300 transition-colors">
                {isUk ? "Умови використання" : "Terms of Service"}
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
