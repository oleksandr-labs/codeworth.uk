"use client";

import { useState } from "react";

export function StrategyCODemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  // --- Diagnostic Tool state ---
  const [diagAnswers, setDiagAnswers] = useState<Record<number, boolean | null>>({});
  const [diagDone, setDiagDone] = useState(false);

  // --- Case Studies filter ---
  const [caseFilter, setCaseFilter] = useState("All");

  // --- Booking form ---
  const [bookPractice, setBookPractice] = useState("");
  const [bookSize, setBookSize] = useState("");
  const [bookEngagement, setBookEngagement] = useState("");
  const [bookName, setBookName] = useState("");
  const [bookCompany, setBookCompany] = useState("");
  const [bookEmail, setBookEmail] = useState("");
  const [bookPhone, setBookPhone] = useState("");
  const [bookSubmitted, setBookSubmitted] = useState(false);

  // --- Nav ---
  const [navOpen, setNavOpen] = useState(false);

  // ─── DATA ────────────────────────────────────────────────────────────────────

  const navLinks = isUk
    ? ["Практики", "Кейси", "Інсайти", "Команда", "Контакт"]
    : ["Practices", "Cases", "Insights", "Team", "Contact"];

  const practices = [
    {
      icon: "📈",
      title: isUk ? "Стратегія та Зростання" : "Strategy & Growth",
      desc: isUk
        ? "Розробка корпоративної стратегії, виявлення точок зростання, M&A-підтримка та трансформація бізнес-моделі."
        : "Corporate strategy development, growth opportunity identification, M&A support and business model transformation.",
      deliverables: isUk
        ? ["Стратегічна карта на 3–5 років", "Аналіз конкурентів", "Roadmap реалізації", "KPI-дашборд"]
        : ["3–5 year strategy map", "Competitive landscape analysis", "Implementation roadmap", "KPI dashboard"],
    },
    {
      icon: "⚙️",
      title: isUk ? "Операційна Досконалість" : "Operations Excellence",
      desc: isUk
        ? "Оптимізація процесів, впровадження Lean/Six Sigma, підвищення ефективності виробництва та ланцюгів постачання."
        : "Process optimisation, Lean/Six Sigma implementation, production and supply chain efficiency uplift.",
      deliverables: isUk
        ? ["Карта процесів AS-IS / TO-BE", "Плани скорочення витрат", "SOP бібліотека", "Метрики продуктивності"]
        : ["AS-IS / TO-BE process map", "Cost reduction plans", "SOP library", "Productivity metrics"],
    },
    {
      icon: "💰",
      title: isUk ? "Фінансовий Консалтинг" : "Financial Advisory",
      desc: isUk
        ? "Фінансове планування, реструктуризація, залучення капіталу, Due Diligence та підготовка до IPO/злиття."
        : "Financial planning, restructuring, capital raising, Due Diligence and IPO/merger preparation.",
      deliverables: isUk
        ? ["Фінансова модель", "Інвестиційний меморандум", "Звіт Due Diligence", "Стрес-тест сценарії"]
        : ["Financial model", "Investment memorandum", "Due Diligence report", "Stress-test scenarios"],
    },
    {
      icon: "🖥️",
      title: isUk ? "Цифрова Трансформація" : "Digital Transformation",
      desc: isUk
        ? "Стратегія цифровізації, вибір технологічного стеку, впровадження AI/ML-рішень та управління змінами."
        : "Digitalisation strategy, technology stack selection, AI/ML solutions deployment and change management.",
      deliverables: isUk
        ? ["Digital roadmap", "Оцінка технологій", "ROI-обґрунтування", "Архітектура даних"]
        : ["Digital roadmap", "Technology assessment", "ROI business case", "Data architecture"],
    },
    {
      icon: "🤝",
      title: isUk ? "HR та Організація" : "HR & Organization",
      desc: isUk
        ? "Організаційний дизайн, управління талантами, культурна трансформація та побудова систем мотивації."
        : "Organisational design, talent management, cultural transformation and incentive system design.",
      deliverables: isUk
        ? ["Орг-структура TO-BE", "Модель компетенцій", "Програма утримання", "Культурний аудит"]
        : ["TO-BE org structure", "Competency model", "Retention programme", "Culture audit"],
    },
  ];

  const diagQuestions = isUk
    ? [
        "Чи є у вас задокументована 3-річна стратегія?",
        "Чи відомий вам точний показник вартості залучення клієнта (CAC)?",
        "Чи перевищує чистий прибуток галузевий середній показник?",
        "Чи автоматизовані ключові операційні процеси?",
        "Чи є у вас формалізована програма розвитку талантів?",
        "Чи відстежуєте ви NPS або показники лояльності клієнтів?",
        "Чи є у компанії задокументований план управління ризиками?",
        "Чи перевищує зростання виручки 15% рік до року?",
      ]
    : [
        "Do you have a documented 3-year strategy?",
        "Is your customer acquisition cost (CAC) known and tracked?",
        "Does your net margin exceed the industry average?",
        "Are your core operational processes automated?",
        "Do you have a formalised talent development programme?",
        "Do you track NPS or customer loyalty metrics?",
        "Does your company have a documented risk management plan?",
        "Is your revenue growing more than 15% year-over-year?",
      ];

  const getDiagScore = () => {
    return Object.values(diagAnswers).filter((v) => v === true).length;
  };

  const getDiagZone = (score: number) => {
    if (score >= 6) return "green";
    if (score >= 3) return "yellow";
    return "red";
  };

  const getDiagActions = (score: number): string[] => {
    const zone = getDiagZone(score);
    if (isUk) {
      if (zone === "green")
        return [
          "Зафіксуйте переваги та масштабуйте успішні практики",
          "Інвестуйте в інновації та нові ринки",
          "Розгляньте M&A або стратегічне партнерство",
        ];
      if (zone === "yellow")
        return [
          "Проведіть детальний аудит слабких зон за нашою методологією",
          "Пріоритизуйте автоматизацію та розвиток людського капіталу",
          "Сформуйте систему фінансового моніторингу в реальному часі",
        ];
      return [
        "Негайно розробіть антикризовий план дій з горизонтом 90 днів",
        "Залучіть зовнішнього CFO або операційного директора",
        "Проведіть стрес-тест фінансової моделі та ліквідності",
      ];
    } else {
      if (zone === "green")
        return [
          "Formalise your competitive advantages and scale best practices",
          "Invest in innovation and adjacent market expansion",
          "Consider M&A or strategic partnership opportunities",
        ];
      if (zone === "yellow")
        return [
          "Conduct a detailed gap audit using our diagnostic framework",
          "Prioritise process automation and human capital development",
          "Establish a real-time financial monitoring system",
        ];
      return [
        "Develop an emergency 90-day action plan immediately",
        "Engage a fractional CFO or Chief Operating Officer",
        "Stress-test your financial model and liquidity position",
      ];
    }
  };

  const practiceFilterOptions = isUk
    ? ["Усі", "Стратегія", "Операції", "Фінанси", "Цифрова", "HR"]
    : ["All", "Strategy", "Operations", "Finance", "Digital", "HR"];

  const cases = [
    {
      practice: isUk ? "Стратегія" : "Strategy",
      industry: isUk ? "Ритейл / E-commerce" : "Retail / E-commerce",
      challenge: isUk
        ? "Падіння частки ринку на 12% за два роки, відсутність чіткого позиціювання."
        : "12% market share decline over two years; unclear brand positioning.",
      approach: isUk
        ? "Сегментація клієнтської бази, редизайн ціннісної пропозиції, запуск D2C-каналу."
        : "Customer base segmentation, value proposition redesign, D2C channel launch.",
      result: isUk ? "+34% виручки за 18 місяців, +8 п.п. частки ринку" : "+34% revenue in 18 months, +8pp market share",
      tag: isUk ? "Стратегія" : "Strategy",
    },
    {
      practice: isUk ? "Операції" : "Operations",
      industry: isUk ? "Виробництво" : "Manufacturing",
      challenge: isUk
        ? "Операційні витрати на 23% вищі за галузевий стандарт, низька OEE."
        : "Operating costs 23% above industry benchmark; low OEE.",
      approach: isUk
        ? "Впровадження Lean-виробництва, реструктуризація ланцюга постачання, SMED."
        : "Lean manufacturing rollout, supply chain restructuring, SMED methodology.",
      result: isUk ? "−19% витрат, OEE зріс з 61% до 84%" : "−19% costs, OEE improved from 61% to 84%",
      tag: isUk ? "Операції" : "Operations",
    },
    {
      practice: isUk ? "Фінанси" : "Finance",
      industry: isUk ? "Приватний капітал" : "Private Equity",
      challenge: isUk
        ? "Портфельна компанія потребувала підготовки до продажу за 9 місяців."
        : "Portfolio company needed exit-readiness preparation within 9 months.",
      approach: isUk
        ? "Фінансова реструктуризація, нормалізація EBITDA, підготовка CIM і Data Room."
        : "Financial restructuring, EBITDA normalisation, CIM and Data Room preparation.",
      result: isUk ? "Угода закрита на мультиплікаторі 7.2× EBITDA (+2.1× vs очікуваного)" : "Deal closed at 7.2× EBITDA multiple (+2.1× vs expected)",
      tag: isUk ? "Фінанси" : "Finance",
    },
    {
      practice: isUk ? "Цифрова" : "Digital",
      industry: isUk ? "Фінансові послуги" : "Financial Services",
      challenge: isUk
        ? "Застарілі legacy-системи блокували виведення нових продуктів на ринок."
        : "Legacy systems blocked time-to-market for new products.",
      approach: isUk
        ? "Roadmap цифровізації, API-архітектура, впровадження ML-скорингу."
        : "Digitalisation roadmap, API-first architecture, ML scoring deployment.",
      result: isUk ? "TTM скоротився з 14 до 3 місяців, NPS +22 пп" : "TTM reduced from 14 to 3 months, NPS +22pp",
      tag: isUk ? "Цифрова" : "Digital",
    },
    {
      practice: isUk ? "HR" : "HR",
      industry: isUk ? "Технологічна компанія" : "Technology Company",
      challenge: isUk
        ? "Плинність кадрів 41%, втрата ключових інженерів до конкурентів."
        : "41% annual turnover; losing key engineers to competitors.",
      approach: isUk
        ? "Дизайн системи мотивації, кар'єрні треки, програма менторства."
        : "Incentive system redesign, career ladders, mentorship programme.",
      result: isUk ? "Плинність −26 пп за рік, eNPS +38" : "Turnover −26pp YoY, eNPS +38",
      tag: isUk ? "HR" : "HR",
    },
    {
      practice: isUk ? "Стратегія" : "Strategy",
      industry: isUk ? "Охорона здоров'я" : "Healthcare",
      challenge: isUk
        ? "Виходу на три нові регіональні ринки при обмеженому капіталі."
        : "Entry into three new regional markets with constrained capital.",
      approach: isUk
        ? "Оцінка привабливості ринків, партнерська модель входу, пілотні програми."
        : "Market attractiveness scoring, partnership entry model, pilot programmes.",
      result: isUk ? "3 ринки запущено за 11 місяців, ROI 218% за 2 роки" : "3 markets launched in 11 months, 218% ROI over 2 years",
      tag: isUk ? "Стратегія" : "Strategy",
    },
  ];

  const filteredCases =
    caseFilter === "All" || caseFilter === "Усі"
      ? cases
      : cases.filter((c) => c.tag === caseFilter);

  const articles = [
    {
      category: isUk ? "Стратегія" : "Strategy",
      time: isUk ? "8 хв" : "8 min",
      title: isUk
        ? "П'ять ознак того, що ваша стратегія застаріла"
        : "Five Signs Your Corporate Strategy Is Obsolete",
      excerpt: isUk
        ? "Більшість стратегій розробляються раз на три роки, але ринок змінюється щоквартально. Як визначити момент для перегляду?"
        : "Most strategies are designed every three years, yet markets shift quarterly. How to know when it's time for a reset.",
    },
    {
      category: isUk ? "Операції" : "Operations",
      time: isUk ? "6 хв" : "6 min",
      title: isUk
        ? "Lean у сервісних компаніях: що насправді працює"
        : "Lean in Service Companies: What Actually Works",
      excerpt: isUk
        ? "Принципи бережливого виробництва часто адаптуються невірно у сервісному секторі. Розглядаємо перевірені підходи та типові помилки."
        : "Lean principles are often misapplied in services. We examine proven adaptations and the pitfalls to avoid.",
    },
    {
      category: isUk ? "Лідерство" : "Leadership",
      time: isUk ? "5 хв" : "5 min",
      title: isUk
        ? "Чому більшість програм трансформації зазнають невдачі"
        : "Why Most Transformation Programmes Fail",
      excerpt: isUk
        ? "Статистика невтішна: 70% ініціатив трансформації не досягають цілей. Ключові причини та як їх уникнути."
        : "The statistics are stark: 70% of transformation initiatives miss their targets. Here are the root causes and how to avoid them.",
    },
  ];

  const team = [
    {
      initials: "JM",
      name: isUk ? "Джонатан Меркер" : "Jonathan Mercer",
      title: isUk ? "Управляючий Партнер" : "Managing Partner",
      edu: "MBA Harvard Business School",
      years: isUk ? "22 роки досвіду" : "22 years experience",
      focus: isUk ? "Стратегія, M&A, PE" : "Strategy, M&A, Private Equity",
      cert: "CFA, CMC",
    },
    {
      initials: "SV",
      name: isUk ? "Сара Ван Дер Берг" : "Sarah van der Berg",
      title: isUk ? "Партнер, Операції" : "Partner, Operations",
      edu: isUk ? "PhD у промисловій інженерії, TU Delft" : "PhD Industrial Engineering, TU Delft",
      years: isUk ? "17 років досвіду" : "17 years experience",
      focus: isUk ? "Lean, Supply Chain, Manufacturing" : "Lean, Supply Chain, Manufacturing",
      cert: "Six Sigma Black Belt, APICS",
    },
    {
      initials: "AK",
      name: isUk ? "Андреас Кольб" : "Andreas Kolb",
      title: isUk ? "Партнер, Фінанси" : "Partner, Finance",
      edu: "MSc Finance, London School of Economics",
      years: isUk ? "19 років досвіду" : "19 years experience",
      focus: isUk ? "Реструктуризація, PE, IPO" : "Restructuring, Private Equity, IPO",
      cert: "CFA, ACCA",
    },
    {
      initials: "MO",
      name: isUk ? "Міа Озарк" : "Mia Ozark",
      title: isUk ? "Старший Директор, Digital" : "Senior Director, Digital",
      edu: "MSc Computer Science, ETH Zurich",
      years: isUk ? "12 років досвіду" : "12 years experience",
      focus: isUk ? "AI/ML, Цифрова трансформація, Архітектура" : "AI/ML, Digital Transformation, Architecture",
      cert: "AWS Solutions Architect, PMP",
    },
  ];

  const processPhases = isUk
    ? [
        { icon: "🔍", phase: "01", name: "Виявлення", desc: "Первинна сесія з управлінською командою, збір даних, аналіз ринкового контексту та формулювання гіпотез." },
        { icon: "🩺", phase: "02", name: "Діагностика", desc: "Глибокий аналіз ключових драйверів ефективності, бенчмаркінг, виявлення розривів і прихованих ризиків." },
        { icon: "🗺️", phase: "03", name: "Стратегія", desc: "Розробка рекомендацій та дорожньої карти з пріоритизованими ініціативами і чіткими власниками." },
        { icon: "🚀", phase: "04", name: "Впровадження", desc: "Підтримка реалізації: проектний офіс, коучинг команди, управління ризиками та регулярний трекінг." },
        { icon: "📋", phase: "05", name: "Перегляд", desc: "Оцінка результатів через 90 і 180 днів, коригування плану, передача знань та закриття проекту." },
      ]
    : [
        { icon: "🔍", phase: "01", name: "Discovery", desc: "Kick-off session with the leadership team, data collection, market context analysis and hypothesis formation." },
        { icon: "🩺", phase: "02", name: "Diagnosis", desc: "Deep dive into key performance drivers, benchmarking, gap identification and hidden risk surfacing." },
        { icon: "🗺️", phase: "03", name: "Strategy", desc: "Development of recommendations and a prioritised roadmap with clear initiative owners and milestones." },
        { icon: "🚀", phase: "04", name: "Implementation", desc: "Execution support: project office, team coaching, risk management and regular progress tracking." },
        { icon: "📋", phase: "05", name: "Review", desc: "90- and 180-day outcome reviews, plan refinement, knowledge transfer and formal project closure." },
      ];

  // ─── DIAGNOSTIC LOGIC ────────────────────────────────────────────────────────

  const allAnswered = diagQuestions.every((_, i) => diagAnswers[i] !== undefined && diagAnswers[i] !== null);
  const diagScore = getDiagScore();
  const diagZone = diagDone ? getDiagZone(diagScore) : null;
  const diagActions = diagDone ? getDiagActions(diagScore) : [];

  const zoneColor = {
    green: "bg-emerald-100 border-emerald-500 text-emerald-800",
    yellow: "bg-yellow-100 border-yellow-500 text-yellow-800",
    red: "bg-red-100 border-red-600 text-red-800",
  };
  const zoneLabel = {
    green: isUk ? "🟢 Зелена зона — стійкий бізнес" : "🟢 Green Zone — Resilient Business",
    yellow: isUk ? "🟡 Жовта зона — є резерви для покращення" : "🟡 Yellow Zone — Room for Improvement",
    red: isUk ? "🔴 Червона зона — потрібні термінові дії" : "🔴 Red Zone — Urgent Action Required",
  };

  // ─── BOOKING SUBMIT ───────────────────────────────────────────────────────────

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookSubmitted(true);
  };

  const bookPractices = isUk
    ? ["Стратегія та Зростання", "Операційна Досконалість", "Фінансовий Консалтинг", "Цифрова Трансформація", "HR та Організація"]
    : ["Strategy & Growth", "Operations Excellence", "Financial Advisory", "Digital Transformation", "HR & Organization"];

  const bookSizes = isUk
    ? ["SMB (до 50 млн $)", "Середній ринок (50–500 млн $)", "Підприємство (500 млн $+)"]
    : ["SMB (up to $50M)", "Mid-market ($50M–$500M)", "Enterprise ($500M+)"];

  const bookEngagements = isUk
    ? ["Разовий проект", "Ретейнер (постійна підтримка)", "Дорадча рада"]
    : ["Single Project", "Retainer (Ongoing Support)", "Advisory Board"];

  // ─── RENDER ───────────────────────────────────────────────────────────────────

  return (
    <div className="font-sans text-[#1E3A5F] bg-[#F7F6F4] min-w-0 overflow-x-hidden">

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <header className="bg-[#0f2744] sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-2xl">📊</span>
            <div>
              <div className="font-serif text-lg font-bold text-white leading-none tracking-wide">
                StrategyCo
              </div>
              <div className="text-[#C5A028] text-[10px] tracking-widest uppercase">
                {isUk ? "Консалтинг · Трансформація" : "Consulting · Transformation"}
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link}
                className="text-gray-300 hover:text-[#C5A028] text-sm font-medium transition-colors"
              >
                {link}
              </button>
            ))}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <button className="hidden sm:inline-flex items-center gap-2 bg-[#C5A028] hover:bg-[#d4af37] text-[#0f2744] text-sm font-bold px-4 py-2 rounded transition-colors shrink-0">
              🩺 {isUk ? "Безкоштовна Діагностика" : "Free Diagnostics"}
            </button>
            <button
              className="md:hidden text-white text-xl"
              onClick={() => setNavOpen(!navOpen)}
            >
              {navOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {navOpen && (
          <div className="md:hidden bg-[#0f2744] border-t border-[#1E3A5F] px-4 pb-4">
            {navLinks.map((link) => (
              <button key={link} className="block text-gray-300 py-2 text-sm w-full text-left">
                {link}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="bg-linear-to-br from-[#0f2744] via-[#1E3A5F] to-[#0f2744] min-h-[520px] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#C5A028]/20 border border-[#C5A028]/40 text-[#d4af37] text-xs font-semibold px-3 py-1 rounded-full mb-6 tracking-wider uppercase">
              {isUk ? "Топ-10 Консалтингових Фірм 2025" : "Top-10 Consulting Firms 2025"}
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
              {isUk ? (
                <>Ростіть Бізнес.<br /><span className="text-[#C5A028]">Ми Знаємо Як.</span></>
              ) : (
                <>Grow Your Business.<br /><span className="text-[#C5A028]">We Know How.</span></>
              )}
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
              {isUk
                ? "Ми допомагаємо компаніям від середнього бізнесу до великих підприємств будувати стратегії, трансформувати операції та виходити на нові ринки."
                : "We help companies from mid-market to large enterprises build strategies, transform operations and enter new markets."}
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <button className="bg-[#C5A028] hover:bg-[#d4af37] text-[#0f2744] font-bold px-6 py-3 rounded transition-colors">
                {isUk ? "Замовити Консультацію" : "Book a Consultation"}
              </button>
              <button className="border-2 border-white/40 text-white hover:border-[#C5A028] hover:text-[#C5A028] font-semibold px-6 py-3 rounded transition-colors">
                {isUk ? "Переглянути Кейси" : "View Case Studies"}
              </button>
            </div>

            {/* Client Logos Row */}
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-3">
                {isUk ? "Нам довіряють" : "Trusted by"}
              </p>
              <div className="flex flex-wrap gap-3">
                {["🏢", "🏦", "🏭", "🛒", "🏥", "⚡"].map((icon, i) => (
                  <div
                    key={i}
                    className="w-14 h-10 bg-white/10 rounded flex items-center justify-center text-xl"
                    title={isUk ? `Клієнт ${i + 1}` : `Client ${i + 1}`}
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Abstract Gold Geometric */}
          <div className="hidden md:flex items-center justify-center relative h-72">
            <div className="absolute w-48 h-48 border-4 border-[#C5A028]/60 rotate-12 rounded-lg top-0 right-8" />
            <div className="absolute w-36 h-36 bg-[#C5A028]/20 rounded-full bottom-4 right-4" />
            <div className="absolute w-24 h-24 border-2 border-[#d4af37]/50 rotate-45 top-10 right-32" />
            <div className="relative z-10 bg-[#C5A028]/10 border border-[#C5A028]/30 rounded-2xl p-8 text-center backdrop-blur-sm">
              <div className="text-5xl mb-3">📊</div>
              <div className="text-[#C5A028] font-serif text-3xl font-bold">218%</div>
              <div className="text-gray-300 text-sm mt-1">
                {isUk ? "Середній ROI клієнтів" : "Average client ROI"}
              </div>
              <div className="mt-4 flex justify-center gap-4 text-center">
                <div>
                  <div className="text-white font-bold text-lg">140+</div>
                  <div className="text-gray-400 text-xs">{isUk ? "Проектів" : "Projects"}</div>
                </div>
                <div className="w-px bg-white/20" />
                <div>
                  <div className="text-white font-bold text-lg">18</div>
                  <div className="text-gray-400 text-xs">{isUk ? "Країн" : "Countries"}</div>
                </div>
                <div className="w-px bg-white/20" />
                <div>
                  <div className="text-white font-bold text-lg">96%</div>
                  <div className="text-gray-400 text-xs">{isUk ? "Задоволені" : "Satisfied"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRACTICE AREAS ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#F7F6F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#C5A028] text-sm font-semibold uppercase tracking-widest mb-2">
              {isUk ? "Наші Практики" : "Our Practices"}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0f2744]">
              {isUk ? "Глибока Галузева Експертиза" : "Deep Domain Expertise"}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {practices.map((p, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#C5A028] hover:shadow-lg transition-all group"
              >
                <div className="text-3xl mb-4">{p.icon}</div>
                <h3 className="font-serif text-xl font-bold text-[#0f2744] mb-2 group-hover:text-[#C5A028] transition-colors">
                  {p.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{p.desc}</p>
                <ul className="space-y-1 mb-5">
                  {p.deliverables.map((d, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-gray-500">
                      <span className="text-[#C5A028] mt-0.5 shrink-0">▪</span>
                      {d}
                    </li>
                  ))}
                </ul>
                <button className="text-[#C5A028] text-sm font-semibold hover:text-[#0f2744] transition-colors">
                  {isUk ? "Детальніше →" : "Explore Practice →"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUSINESS DIAGNOSTIC TOOL ────────────────────────────────────────── */}
      <section className="py-20 bg-[#0f2744]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#C5A028] text-sm font-semibold uppercase tracking-widest mb-2">
              {isUk ? "Безкоштовний Інструмент" : "Free Tool"}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              {isUk ? "Діагностика Вашого Бізнесу" : "Business Health Diagnostic"}
            </h2>
            <p className="text-gray-400 mt-3">
              {isUk
                ? "Дайте відповідь на 8 запитань — отримайте зону ризику та 3 пріоритетних дії."
                : "Answer 8 questions and receive your risk zone and 3 priority actions."}
            </p>
          </div>

          {!diagDone ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
              <div className="space-y-5">
                {diagQuestions.map((q, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <p className="text-gray-200 text-sm flex-1 leading-relaxed">
                      <span className="text-[#C5A028] font-bold mr-2">{i + 1}.</span>
                      {q}
                    </p>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => setDiagAnswers((prev) => ({ ...prev, [i]: true }))}
                        className={`px-4 py-1.5 rounded text-sm font-semibold border transition-colors ${
                          diagAnswers[i] === true
                            ? "bg-emerald-500 border-emerald-500 text-white"
                            : "border-gray-500 text-gray-300 hover:border-emerald-400"
                        }`}
                      >
                        {isUk ? "Так" : "Yes"}
                      </button>
                      <button
                        onClick={() => setDiagAnswers((prev) => ({ ...prev, [i]: false }))}
                        className={`px-4 py-1.5 rounded text-sm font-semibold border transition-colors ${
                          diagAnswers[i] === false
                            ? "bg-red-500 border-red-500 text-white"
                            : "border-gray-500 text-gray-300 hover:border-red-400"
                        }`}
                      >
                        {isUk ? "Ні" : "No"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                disabled={!allAnswered}
                onClick={() => setDiagDone(true)}
                className="mt-8 w-full bg-[#C5A028] hover:bg-[#d4af37] disabled:bg-gray-600 disabled:cursor-not-allowed text-[#0f2744] font-bold py-3 rounded-lg transition-colors"
              >
                {isUk ? "Отримати Результат" : "Get My Results"}
              </button>
              <p className="text-gray-500 text-xs text-center mt-3">
                {isUk
                  ? `Відповіді надано: ${Object.keys(diagAnswers).length} / ${diagQuestions.length}`
                  : `Answered: ${Object.keys(diagAnswers).length} / ${diagQuestions.length}`}
              </p>
            </div>
          ) : (
            <div className={`rounded-2xl p-8 border-2 ${zoneColor[diagZone!]}`}>
              <div className="text-xl font-bold mb-1">{zoneLabel[diagZone!]}</div>
              <p className="text-sm mb-6">
                {isUk
                  ? `Ваш результат: ${diagScore} з ${diagQuestions.length} позитивних відповідей.`
                  : `Your score: ${diagScore} out of ${diagQuestions.length} positive answers.`}
              </p>
              <h4 className="font-serif font-bold text-base mb-3">
                {isUk ? "Ваші 3 пріоритетних дії:" : "Your 3 Priority Actions:"}
              </h4>
              <ol className="space-y-2 mb-6">
                {diagActions.map((a, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="font-bold shrink-0">{i + 1}.</span>
                    {a}
                  </li>
                ))}
              </ol>
              <div className="flex flex-wrap gap-3">
                <button className="bg-[#0f2744] text-white font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-[#1E3A5F] transition-colors">
                  {isUk ? "Обговорити з Консультантом" : "Discuss Results with Consultant"}
                </button>
                <button
                  onClick={() => { setDiagDone(false); setDiagAnswers({}); }}
                  className="border border-current font-semibold px-5 py-2.5 rounded-lg text-sm hover:opacity-80 transition-opacity"
                >
                  {isUk ? "Пройти знову" : "Retake"}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── CASE STUDIES ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#F7F6F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#C5A028] text-sm font-semibold uppercase tracking-widest mb-2">
              {isUk ? "Наші Результати" : "Our Results"}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0f2744]">
              {isUk ? "Кейси Клієнтів" : "Client Case Studies"}
            </h2>
          </div>

          {/* Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {practiceFilterOptions.map((f) => (
              <button
                key={f}
                onClick={() => setCaseFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                  caseFilter === f
                    ? "bg-[#0f2744] border-[#0f2744] text-white"
                    : "border-gray-300 text-gray-600 hover:border-[#C5A028]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCases.map((c, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="bg-linear-to-br from-[#0f2744] to-[#1E3A5F] px-6 py-5">
                  <span className="text-xs text-[#C5A028] font-semibold uppercase tracking-wider">
                    {c.practice}
                  </span>
                  <div className="text-white font-bold mt-1">{c.industry}</div>
                </div>
                <div className="p-6 space-y-3">
                  <div>
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {isUk ? "Виклик" : "Challenge"}
                    </span>
                    <p className="text-sm text-gray-700 mt-0.5">{c.challenge}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {isUk ? "Підхід" : "Approach"}
                    </span>
                    <p className="text-sm text-gray-700 mt-0.5">{c.approach}</p>
                  </div>
                  <div className="pt-2 border-t border-gray-100">
                    <span className="text-xs font-semibold text-[#C5A028] uppercase tracking-wider">
                      {isUk ? "Результат" : "Result"}
                    </span>
                    <p className="text-sm font-bold text-[#0f2744] mt-0.5">{c.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSIGHTS ───────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[#C5A028] text-sm font-semibold uppercase tracking-widest mb-2">
                {isUk ? "Думки Лідерів" : "Thought Leadership"}
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0f2744]">
                {isUk ? "Інсайти та Дослідження" : "Insights & Research"}
              </h2>
            </div>
            <button className="hidden sm:inline-flex text-[#C5A028] font-semibold text-sm hover:text-[#0f2744] transition-colors shrink-0">
              {isUk ? "Всі статті →" : "All Articles →"}
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((a, i) => (
              <article key={i} className="bg-[#F7F6F4] rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-[#C5A028]/15 text-[#C5A028] text-xs font-semibold px-3 py-1 rounded-full">
                    {a.category}
                  </span>
                  <span className="text-gray-400 text-xs">⏱ {a.time}</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#0f2744] mb-2 leading-snug">
                  {a.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{a.excerpt}</p>
                <button className="mt-4 text-[#C5A028] text-sm font-semibold hover:text-[#0f2744] transition-colors">
                  {isUk ? "Читати →" : "Read More →"}
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#F7F6F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#C5A028] text-sm font-semibold uppercase tracking-widest mb-2">
              {isUk ? "Наші Партнери" : "Our Partners"}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0f2744]">
              {isUk ? "Команда Експертів" : "Expert Team"}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-center border border-gray-100 hover:border-[#C5A028] hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-linear-to-br from-[#0f2744] to-[#1E3A5F] rounded-full flex items-center justify-center text-white font-serif font-bold text-lg mx-auto mb-4">
                  {t.initials}
                </div>
                <h3 className="font-serif font-bold text-[#0f2744] text-base leading-snug">{t.name}</h3>
                <p className="text-[#C5A028] text-xs font-semibold mt-1 mb-3">{t.title}</p>
                <div className="space-y-1.5 text-left">
                  <div className="flex gap-2 text-xs text-gray-600">
                    <span className="shrink-0">🎓</span>
                    <span>{t.edu}</span>
                  </div>
                  <div className="flex gap-2 text-xs text-gray-600">
                    <span className="shrink-0">📅</span>
                    <span>{t.years}</span>
                  </div>
                  <div className="flex gap-2 text-xs text-gray-600">
                    <span className="shrink-0">🎯</span>
                    <span>{t.focus}</span>
                  </div>
                  <div className="flex gap-2 text-xs text-gray-600">
                    <span className="shrink-0">📜</span>
                    <span>{t.cert}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#0f2744]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#C5A028] text-sm font-semibold uppercase tracking-widest mb-2">
              {isUk ? "Як Ми Працюємо" : "How We Work"}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              {isUk ? "5 Фаз Залучення" : "5-Phase Engagement"}
            </h2>
          </div>
          <div className="grid sm:grid-cols-5 gap-4">
            {processPhases.map((ph, i) => (
              <div key={i} className="relative text-center">
                {/* Connector line */}
                {i < processPhases.length - 1 && (
                  <div className="hidden sm:block absolute top-6 left-1/2 w-full h-0.5 bg-[#C5A028]/30 z-0" />
                )}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-12 h-12 bg-[#C5A028]/20 border-2 border-[#C5A028] rounded-full flex items-center justify-center text-xl mb-3">
                    {ph.icon}
                  </div>
                  <div className="text-[#C5A028] text-xs font-bold mb-1">{ph.phase}</div>
                  <div className="text-white font-serif font-bold text-sm mb-2">{ph.name}</div>
                  <p className="text-gray-400 text-xs leading-relaxed">{ph.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONSULTATION BOOKING ───────────────────────────────────────────── */}
      <section className="py-20 bg-[#F7F6F4]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#C5A028] text-sm font-semibold uppercase tracking-widest mb-2">
              {isUk ? "Почати Діалог" : "Start the Conversation"}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0f2744]">
              {isUk ? "Записатись на Консультацію" : "Book a Consultation"}
            </h2>
          </div>

          {bookSubmitted ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-[#C5A028] shadow-lg">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="font-serif text-2xl font-bold text-[#0f2744] mb-2">
                {isUk ? "Дякуємо!" : "Thank You!"}
              </h3>
              <p className="text-gray-600">
                {isUk
                  ? `${bookName}, ми отримали ваш запит і зв'яжемося протягом 24 годин.`
                  : `${bookName}, we've received your request and will be in touch within 24 hours.`}
              </p>
              <button
                onClick={() => {
                  setBookSubmitted(false);
                  setBookName(""); setBookCompany(""); setBookEmail(""); setBookPhone("");
                  setBookPractice(""); setBookSize(""); setBookEngagement("");
                }}
                className="mt-6 text-[#C5A028] font-semibold text-sm"
              >
                {isUk ? "Подати новий запит" : "Submit Another Request"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookSubmit} className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm space-y-5">
              <div className="grid sm:grid-cols-3 gap-4">
                {/* Practice Area */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
                    {isUk ? "Практика" : "Practice Area"}
                  </label>
                  <select
                    value={bookPractice}
                    onChange={(e) => setBookPractice(e.target.value)}
                    required
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#0f2744] focus:border-[#C5A028] focus:outline-none"
                  >
                    <option value="">{isUk ? "Оберіть..." : "Select..."}</option>
                    {bookPractices.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                {/* Business Size */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
                    {isUk ? "Розмір бізнесу" : "Business Size"}
                  </label>
                  <select
                    value={bookSize}
                    onChange={(e) => setBookSize(e.target.value)}
                    required
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#0f2744] focus:border-[#C5A028] focus:outline-none"
                  >
                    <option value="">{isUk ? "Оберіть..." : "Select..."}</option>
                    {bookSizes.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                {/* Engagement Type */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
                    {isUk ? "Тип залучення" : "Engagement Type"}
                  </label>
                  <select
                    value={bookEngagement}
                    onChange={(e) => setBookEngagement(e.target.value)}
                    required
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#0f2744] focus:border-[#C5A028] focus:outline-none"
                  >
                    <option value="">{isUk ? "Оберіть..." : "Select..."}</option>
                    {bookEngagements.map((e) => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
                    {isUk ? "Ваше Ім'я" : "Your Name"}
                  </label>
                  <input
                    type="text"
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                    required
                    placeholder={isUk ? "Іван Петренко" : "John Smith"}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-[#C5A028] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
                    {isUk ? "Компанія" : "Company"}
                  </label>
                  <input
                    type="text"
                    value={bookCompany}
                    onChange={(e) => setBookCompany(e.target.value)}
                    required
                    placeholder={isUk ? "ТОВ Альфа" : "Acme Corp"}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-[#C5A028] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
                    {isUk ? "Email" : "Email"}
                  </label>
                  <input
                    type="email"
                    value={bookEmail}
                    onChange={(e) => setBookEmail(e.target.value)}
                    required
                    placeholder="ceo@company.com"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-[#C5A028] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
                    {isUk ? "Телефон" : "Phone"}
                  </label>
                  <input
                    type="tel"
                    value={bookPhone}
                    onChange={(e) => setBookPhone(e.target.value)}
                    placeholder="+380 44 000 0000"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-[#C5A028] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#C5A028] hover:bg-[#d4af37] text-[#0f2744] font-bold py-3 rounded-lg transition-colors text-base"
              >
                {isUk ? "Надіслати Запит" : "Submit Request"}
              </button>
              <p className="text-gray-400 text-xs text-center">
                {isUk
                  ? "Ми відповідаємо протягом 24 годин. Конфіденційність гарантована."
                  : "We respond within 24 hours. Confidentiality guaranteed."}
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="bg-[#0f2744] text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📊</span>
              <span className="font-serif text-lg font-bold text-white">StrategyCo</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              {isUk
                ? "Провідна консалтингова фірма, що допомагає бізнесу будувати стратегію, підвищувати ефективність і залучати капітал."
                : "A leading consulting firm helping businesses build strategy, improve performance and raise capital."}
            </p>
            <div className="flex gap-3">
              {["in", "tw", "fb"].map((s) => (
                <div key={s} className="w-8 h-8 bg-white/10 rounded flex items-center justify-center text-xs font-bold hover:bg-[#C5A028] hover:text-[#0f2744] cursor-pointer transition-colors">
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Practices */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
              {isUk ? "Практики" : "Practices"}
            </h4>
            <ul className="space-y-2 text-sm">
              {practices.map((p) => (
                <li key={p.title}>
                  <button className="hover:text-[#C5A028] transition-colors text-left">{p.title}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
              {isUk ? "Офіси" : "Offices"}
            </h4>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-[#C5A028] font-semibold mb-1">🏙 {isUk ? "Варшава (Головний)" : "Warsaw (HQ)"}</p>
                <p>ul. Nowy Świat 22, 00-373 Warszawa</p>
                <p>+48 22 555 0100</p>
              </div>
              <div>
                <p className="text-[#C5A028] font-semibold mb-1">🏙 {isUk ? "Лондон" : "London"}</p>
                <p>1 Canary Wharf, Level 12, E14 5AB</p>
                <p>+44 20 7946 0301</p>
              </div>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
              {isUk ? "Правова Інформація" : "Legal"}
            </h4>
            <ul className="space-y-2 text-sm">
              {(isUk
                ? ["Політика конфіденційності", "Умови використання", "Запобігання конфліктам інтересів", "GDPR", "Кодекс етики"]
                : ["Privacy Policy", "Terms of Use", "Conflict of Interest Policy", "GDPR", "Code of Ethics"]
              ).map((l) => (
                <li key={l}>
                  <button className="hover:text-[#C5A028] transition-colors text-left">{l}</button>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-white/10 text-xs">
              <p className="text-[#C5A028] font-semibold mb-1">
                {isUk ? "Членство" : "Membership"}
              </p>
              <p>ICMCI · FEACO · BAA</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <p>© 2025 StrategyCo Advisory Group. {isUk ? "Всі права захищені." : "All rights reserved."}</p>
            <p className="text-gray-600">
              {isUk
                ? "Демо-компонент Codeworth · Лише для презентаційних цілей"
                : "Codeworth demo component · For presentation purposes only"}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
