"use client";

import { useState } from "react";

export function LexUADemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [activeTab, setActiveTab] = useState("corporate");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formIssue, setFormIssue] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const navLinks = [
    { en: "Practice Areas", uk: "Практика" },
    { en: "Team", uk: "Команда" },
    { en: "Cases", uk: "Справи" },
    { en: "Contact", uk: "Контакти" },
  ];

  const practiceAreas = [
    {
      id: "corporate",
      icon: "🏛️",
      titleEn: "Corporate Law",
      titleUk: "Корпоративне право",
      descEn:
        "Company registration, M&A transactions, shareholder disputes, corporate governance, restructuring and compliance.",
      descUk:
        "Реєстрація компаній, угоди M&A, корпоративні спори, управління та відповідність нормам.",
    },
    {
      id: "criminal",
      icon: "⚖️",
      titleEn: "Criminal Defense",
      titleUk: "Кримінальний захист",
      descEn:
        "Experienced defense representation from investigation through appeal. White-collar crime, fraud, and economic offenses.",
      descUk:
        "Захист на всіх стадіях — від розслідування до апеляції. Економічні злочини та шахрайство.",
    },
    {
      id: "realestate",
      icon: "🏢",
      titleEn: "Real Estate",
      titleUk: "Нерухомість",
      descEn:
        "Property transactions, title disputes, lease agreements, development projects and land rights protection.",
      descUk:
        "Угоди з нерухомістю, земельні спори, оренда, девелопмент та захист прав власності.",
    },
    {
      id: "family",
      icon: "👨‍👩‍👧",
      titleEn: "Family Law",
      titleUk: "Сімейне право",
      descEn:
        "Divorce proceedings, child custody, alimony, property division and adoption — with sensitivity and discretion.",
      descUk:
        "Розлучення, опіка над дітьми, аліменти, поділ майна та усиновлення — з увагою та конфіденційністю.",
    },
    {
      id: "ip",
      icon: "💡",
      titleEn: "IP & Copyright",
      titleUk: "ІВ та авторські права",
      descEn:
        "Trademark registration, copyright protection, patent disputes, licensing agreements and brand defense.",
      descUk:
        "Реєстрація торгових марок, захист авторських прав, патентні спори та ліцензування.",
    },
    {
      id: "tax",
      icon: "📊",
      titleEn: "Tax Law",
      titleUk: "Податкове право",
      descEn:
        "Tax planning, disputes with fiscal authorities, VAT matters, transfer pricing and international taxation.",
      descUk:
        "Податкове планування, спори з ДПС, ПДВ, трансферне ціноутворення та міжнародне оподаткування.",
    },
  ];

  const stats = [
    { value: "200+", labelEn: "Cases Won", labelUk: "Виграних справ" },
    { value: "850+", labelEn: "Clients Served", labelUk: "Клієнтів" },
    { value: "98%", labelEn: "Success Rate", labelUk: "Успішність" },
    { value: "15", labelEn: "Years Experience", labelUk: "Років досвіду" },
  ];

  const cases = [
    {
      categoryEn: "Corporate",
      categoryUk: "Корпоративне",
      titleEn: "Hostile Takeover Defense",
      titleUk: "Захист від ворожого поглинання",
      descEn:
        "Defended a mid-size manufacturing company against an unlawful hostile acquisition attempt by a competitor group. Secured full ownership rights.",
      descUk:
        "Захистили виробничу компанію від незаконної спроби поглинання конкурентом. Збережено повний контроль над підприємством.",
      outcome: "Won",
      year: "2023",
    },
    {
      categoryEn: "Criminal Defense",
      categoryUk: "Кримінальний захист",
      titleEn: "Fraud Acquittal",
      titleUk: "Виправдання у справі про шахрайство",
      descEn:
        "Successfully defended a business executive charged with large-scale fraud. All charges dropped following thorough investigation and legal challenge.",
      descUk:
        "Успішно захистили керівника компанії, обвинуваченого у великому шахрайстві. Усі звинувачення знято.",
      outcome: "Won",
      year: "2023",
    },
    {
      categoryEn: "Real Estate",
      categoryUk: "Нерухомість",
      titleEn: "Land Title Dispute",
      titleUk: "Земельний спір про право власності",
      descEn:
        "Resolved a multi-party land title dispute involving 12 hectares of agricultural land. Negotiated a fair settlement protecting our client's primary interests.",
      descUk:
        "Вирішили багатосторонній земельний спір щодо 12 га сільськогосподарських угідь шляхом переговорів.",
      outcome: "Settled",
      year: "2022",
    },
  ];

  const team = [
    {
      nameEn: "Andriy Kovalenko",
      nameUk: "Андрій Коваленко",
      titleEn: "Managing Partner",
      titleUk: "Управляючий партнер",
      specEn: "Corporate & M&A",
      specUk: "Корпоративне право та M&A",
      exp: 18,
      emoji: "👨‍⚖️",
    },
    {
      nameEn: "Olena Marchenko",
      nameUk: "Олена Марченко",
      titleEn: "Senior Partner",
      titleUk: "Старший партнер",
      specEn: "Criminal Defense",
      specUk: "Кримінальний захист",
      exp: 14,
      emoji: "👩‍⚖️",
    },
    {
      nameEn: "Viktor Savchenko",
      nameUk: "Віктор Савченко",
      titleEn: "Partner",
      titleUk: "Партнер",
      specEn: "Real Estate & Tax Law",
      specUk: "Нерухомість та податкове право",
      exp: 11,
      emoji: "🧑‍⚖️",
    },
  ];

  const testimonials = [
    {
      nameEn: "Dmytro P.",
      nameUk: "Дмитро П.",
      roleEn: "CEO, TechBridge LLC",
      roleUk: "Генеральний директор, TechBridge ТОВ",
      quoteEn:
        "LexUA handled our corporate restructuring with exceptional professionalism. They anticipated every obstacle and delivered results beyond our expectations.",
      quoteUk:
        "LexUA провели реструктуризацію нашої компанії з виключним професіоналізмом. Вони передбачили кожну перешкоду та перевершили наші очікування.",
      stars: 5,
    },
    {
      nameEn: "Iryna V.",
      nameUk: "Ірина В.",
      roleEn: "Private Client",
      roleUk: "Приватний клієнт",
      quoteEn:
        "During the most difficult time in my life, the LexUA team guided me through every step of the process. Their compassion matched their competence.",
      quoteUk:
        "У найважчий час мого життя команда LexUA супроводжувала мене на кожному кроці. Їхнє розуміння відповідало їхній компетентності.",
      stars: 5,
    },
    {
      nameEn: "Bohdan K.",
      nameUk: "Богдан К.",
      roleEn: "Real Estate Developer",
      roleUk: "Девелопер нерухомості",
      quoteEn:
        "We've worked with LexUA on three major projects. Their real estate and corporate law expertise is unmatched in Kyiv.",
      quoteUk:
        "Ми співпрацюємо з LexUA вже на трьох великих проектах. Їхня експертиза в галузі нерухомості та корпоративного права не має рівних у Києві.",
      stars: 5,
    },
  ];

  const faqItems = [
    {
      qEn: "How much does an initial consultation cost?",
      qUk: "Скільки коштує перша консультація?",
      aEn: "The first 30-minute consultation is free of charge. This allows us to understand your situation and provide an honest assessment of your case before any commitment.",
      aUk: "Перша консультація тривалістю 30 хвилин є безкоштовною. Це дозволяє нам зрозуміти вашу ситуацію та надати чесну оцінку справи без будь-яких зобов'язань.",
    },
    {
      qEn: "How long does a typical case take?",
      qUk: "Скільки часу займає типова справа?",
      aEn: "Duration varies significantly by case type. Contract disputes often resolve in 3–6 months. Complex corporate litigation can take 1–3 years. We provide estimated timelines during consultation.",
      aUk: "Тривалість суттєво залежить від типу справи. Договірні суперечки зазвичай вирішуються за 3–6 місяців. Складні корпоративні справи можуть тривати 1–3 роки.",
    },
    {
      qEn: "Do you handle cases outside Kyiv?",
      qUk: "Чи ведете ви справи поза Києвом?",
      aEn: "Yes. Our attorneys represent clients across all regions of Ukraine and have experience with international arbitration proceedings in European jurisdictions.",
      aUk: "Так. Наші адвокати представляють клієнтів у всіх регіонах України та мають досвід міжнародного арбітражу в європейських юрисдикціях.",
    },
    {
      qEn: "What are your fee structures?",
      qUk: "Які у вас моделі оплати?",
      aEn: "We offer hourly billing, fixed fees for defined-scope matters, and success-based arrangements for select cases. All fee structures are discussed transparently upfront.",
      aUk: "Ми пропонуємо погодинну оплату, фіксовані гонорари для справ з чітким обсягом, а також гонорар успіху для певних категорій справ.",
    },
  ];

  const issueTypes = isUk
    ? [
        "Оберіть тип питання",
        "Корпоративне право",
        "Кримінальний захист",
        "Нерухомість",
        "Сімейне право",
        "ІВ та авторські права",
        "Податкове право",
        "Інше",
      ]
    : [
        "Select issue type",
        "Corporate Law",
        "Criminal Defense",
        "Real Estate",
        "Family Law",
        "IP & Copyright",
        "Tax Law",
        "Other",
      ];

  const activePractice = practiceAreas.find((p) => p.id === activeTab)!;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormSubmitted(true);
  }

  return (
    <div
      className="w-full min-h-screen text-slate-100 overflow-x-hidden"
      style={{
        backgroundColor: "#0f172a",
        fontFamily: "'Georgia', serif",
      }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;900&family=Inter:wght@300;400;500&display=swap');
        .font-playfair { font-family: 'Playfair Display', Georgia, serif; }
        .font-inter { font-family: 'Inter', system-ui, sans-serif; }
        .gold { color: #c9a227; }
        .gold-light { color: #f0c040; }
        .bg-gold { background-color: #c9a227; }
        .bg-gold-hover:hover { background-color: #f0c040; }
        .border-gold { border-color: #c9a227; }
        .gold-gradient { background: linear-gradient(135deg, #c9a227 0%, #f0c040 100%); }
      `}</style>

      {/* ── HEADER ───────────────────────────────────────────── */}
      <header
        className="w-full sticky top-0 z-50 border-b"
        style={{ backgroundColor: "#0a1020", borderColor: "#1e293b" }}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div
              className="w-10 h-10 rounded flex items-center justify-center text-lg font-bold shrink-0"
              style={{ background: "linear-gradient(135deg, #c9a227 0%, #f0c040 100%)", color: "#0f172a" }}
            >
              L
            </div>
            <div>
              <div
                className="font-playfair font-bold text-base leading-tight"
                style={{ color: "#f0c040" }}
              >
                LexUA
              </div>
              <div className="font-inter text-xs text-slate-400 leading-tight">
                {isUk ? "Право та Захист" : "Law & Protection"}
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.en}
                href="#"
                className="font-inter text-sm text-slate-300 hover:text-amber-400 transition-colors duration-200"
              >
                {isUk ? link.uk : link.en}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <button
            className="shrink-0 font-inter text-xs font-medium px-4 py-2 rounded transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #c9a227 0%, #f0c040 100%)",
              color: "#0f172a",
            }}
          >
            {isUk ? "Безкоштовна консультація" : "Free Consultation"}
          </button>
        </div>
      </header>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative w-full py-24 px-4"
        style={{
          background: "linear-gradient(160deg, #0f172a 0%, #1a2540 50%, #0f172a 100%)",
        }}
      >
        {/* decorative lines */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, #c9a227 0px, #c9a227 1px, transparent 1px, transparent 80px), repeating-linear-gradient(0deg, #c9a227 0px, #c9a227 1px, transparent 1px, transparent 80px)",
          }}
        />
        {/* top gold line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, #c9a227, transparent)" }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="font-inter text-xs uppercase tracking-widest mb-4" style={{ color: "#c9a227" }}>
            {isUk ? "Адвокатське об'єднання · Засновано 2008" : "Law Firm · Est. 2008"}
          </div>

          <h1
            className="font-playfair font-bold leading-tight mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#f8f4ec" }}
          >
            {isUk
              ? "Захищаємо Ваші Права\nз 2008 року"
              : "Protecting Your Rights\nSince 2008"}
          </h1>

          <p
            className="font-inter text-slate-300 text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ fontWeight: 300 }}
          >
            {isUk
              ? "LexUA — команда досвідчених адвокатів із глибокою спеціалізацією у корпоративному, кримінальному та цивільному праві. Ми відстоюємо ваші інтереси на кожному етапі."
              : "LexUA is a team of seasoned attorneys with deep expertise in corporate, criminal and civil law. We champion your interests at every stage of the process."}
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-14">
            <button
              className="font-inter font-medium px-8 py-3 rounded text-sm transition-all duration-200 hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #c9a227 0%, #f0c040 100%)",
                color: "#0f172a",
              }}
            >
              {isUk ? "Записатися на консультацію" : "Book Consultation"}
            </button>
            <button
              className="font-inter font-medium px-8 py-3 rounded text-sm border transition-all duration-200 hover:bg-white/5"
              style={{ borderColor: "#c9a227", color: "#f0c040" }}
            >
              {isUk ? "Наші справи" : "Our Cases"}
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-8 justify-center">
            {[
              { value: "200+", labelEn: "Cases Won", labelUk: "Виграних справ" },
              { value: "15", labelEn: "Years of Excellence", labelUk: "Років досвіду" },
              { value: "98%", labelEn: "Success Rate", labelUk: "Успішність справ" },
            ].map((badge) => (
              <div key={badge.value} className="text-center">
                <div
                  className="font-playfair font-bold text-3xl"
                  style={{ color: "#f0c040" }}
                >
                  {badge.value}
                </div>
                <div className="font-inter text-xs text-slate-400 mt-1 uppercase tracking-wide">
                  {isUk ? badge.labelUk : badge.labelEn}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────── */}
      <section
        className="w-full py-6 border-y"
        style={{ backgroundColor: "#1e293b", borderColor: "#2d3f5c" }}
      >
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.value} className="flex flex-col items-center gap-1">
              <span
                className="font-playfair font-bold text-2xl"
                style={{ color: "#f0c040" }}
              >
                {s.value}
              </span>
              <span className="font-inter text-xs text-slate-400 uppercase tracking-wider">
                {isUk ? s.labelUk : s.labelEn}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRACTICE AREAS ───────────────────────────────────── */}
      <section className="w-full py-20 px-4" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div
              className="font-inter text-xs uppercase tracking-widest mb-3"
              style={{ color: "#c9a227" }}
            >
              {isUk ? "Наша спеціалізація" : "Our Expertise"}
            </div>
            <h2
              className="font-playfair font-bold text-3xl md:text-4xl"
              style={{ color: "#f8f4ec" }}
            >
              {isUk ? "Галузі права" : "Practice Areas"}
            </h2>
          </div>

          {/* Tab buttons */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {practiceAreas.map((area) => (
              <button
                key={area.id}
                onClick={() => setActiveTab(area.id)}
                className="font-inter text-xs px-4 py-2 rounded-full border transition-all duration-200"
                style={
                  activeTab === area.id
                    ? {
                        background: "linear-gradient(135deg, #c9a227 0%, #f0c040 100%)",
                        borderColor: "transparent",
                        color: "#0f172a",
                        fontWeight: 600,
                      }
                    : {
                        backgroundColor: "transparent",
                        borderColor: "#2d3f5c",
                        color: "#94a3b8",
                      }
                }
              >
                {area.icon} {isUk ? area.titleUk : area.titleEn}
              </button>
            ))}
          </div>

          {/* Active tab content */}
          <div
            className="max-w-3xl mx-auto rounded-xl p-8 border mb-12"
            style={{ backgroundColor: "#1e293b", borderColor: "#2d3f5c" }}
          >
            <div className="flex items-start gap-5">
              <div
                className="text-4xl shrink-0 w-16 h-16 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#0f172a" }}
              >
                {activePractice.icon}
              </div>
              <div>
                <h3
                  className="font-playfair font-bold text-2xl mb-3"
                  style={{ color: "#f8f4ec" }}
                >
                  {isUk ? activePractice.titleUk : activePractice.titleEn}
                </h3>
                <p
                  className="font-inter text-slate-300 leading-relaxed mb-4"
                  style={{ fontWeight: 300 }}
                >
                  {isUk ? activePractice.descUk : activePractice.descEn}
                </p>
                <a
                  href="#"
                  className="font-inter text-sm font-medium inline-flex items-center gap-2 transition-colors duration-200"
                  style={{ color: "#f0c040" }}
                >
                  {isUk ? "Дізнатися більше" : "Learn More"} →
                </a>
              </div>
            </div>
          </div>

          {/* All 6 cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {practiceAreas.map((area) => (
              <div
                key={area.id}
                onClick={() => setActiveTab(area.id)}
                className="rounded-xl p-6 border cursor-pointer transition-all duration-200 hover:border-amber-600/50 group"
                style={{
                  backgroundColor: activeTab === area.id ? "#1a2a4a" : "#1e293b",
                  borderColor: activeTab === area.id ? "#c9a227" : "#2d3f5c",
                }}
              >
                <div className="text-2xl mb-3">{area.icon}</div>
                <h4
                  className="font-playfair font-semibold text-lg mb-2 group-hover:text-amber-300 transition-colors"
                  style={{ color: activeTab === area.id ? "#f0c040" : "#f8f4ec" }}
                >
                  {isUk ? area.titleUk : area.titleEn}
                </h4>
                <p className="font-inter text-slate-400 text-sm leading-relaxed line-clamp-2" style={{ fontWeight: 300 }}>
                  {isUk ? area.descUk : area.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ─────────────────────────────────────── */}
      <section className="w-full py-20 px-4" style={{ backgroundColor: "#111827" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div
              className="font-inter text-xs uppercase tracking-widest mb-3"
              style={{ color: "#c9a227" }}
            >
              {isUk ? "Наш досвід" : "Track Record"}
            </div>
            <h2
              className="font-playfair font-bold text-3xl md:text-4xl"
              style={{ color: "#f8f4ec" }}
            >
              {isUk ? "Ключові справи" : "Featured Cases"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cases.map((c, i) => (
              <div
                key={i}
                className="rounded-xl border overflow-hidden flex flex-col"
                style={{ backgroundColor: "#1e293b", borderColor: "#2d3f5c" }}
              >
                {/* top accent bar */}
                <div
                  className="h-1 w-full"
                  style={{ background: "linear-gradient(90deg, #c9a227, #f0c040)" }}
                />
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="font-inter text-xs px-3 py-1 rounded-full uppercase tracking-wide"
                      style={{ backgroundColor: "#0f172a", color: "#c9a227" }}
                    >
                      {isUk ? c.categoryUk : c.categoryEn}
                    </span>
                    <span
                      className="font-inter text-xs px-3 py-1 rounded-full font-semibold"
                      style={
                        c.outcome === "Won"
                          ? { backgroundColor: "#14532d", color: "#86efac" }
                          : { backgroundColor: "#1e3a5f", color: "#93c5fd" }
                      }
                    >
                      {c.outcome === "Won"
                        ? isUk ? "✓ Виграно" : "✓ Won"
                        : isUk ? "⇆ Врегульовано" : "⇆ Settled"}
                    </span>
                  </div>

                  <h3
                    className="font-playfair font-semibold text-lg mb-3 flex-1"
                    style={{ color: "#f8f4ec" }}
                  >
                    {isUk ? c.titleUk : c.titleEn}
                  </h3>
                  <p
                    className="font-inter text-slate-400 text-sm leading-relaxed mb-4"
                    style={{ fontWeight: 300 }}
                  >
                    {isUk ? c.descUk : c.descEn}
                  </p>

                  <div className="mt-auto flex items-center justify-between">
                    <span className="font-inter text-xs text-slate-500">{c.year}</span>
                    <a
                      href="#"
                      className="font-inter text-xs font-medium transition-colors"
                      style={{ color: "#f0c040" }}
                    >
                      {isUk ? "Детальніше →" : "Read more →"}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────────── */}
      <section className="w-full py-20 px-4" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div
              className="font-inter text-xs uppercase tracking-widest mb-3"
              style={{ color: "#c9a227" }}
            >
              {isUk ? "Наші фахівці" : "Our Attorneys"}
            </div>
            <h2
              className="font-playfair font-bold text-3xl md:text-4xl"
              style={{ color: "#f8f4ec" }}
            >
              {isUk ? "Команда" : "Meet the Team"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div
                key={i}
                className="rounded-xl border p-8 text-center hover:border-amber-600/40 transition-all duration-200 group"
                style={{ backgroundColor: "#1e293b", borderColor: "#2d3f5c" }}
              >
                {/* Avatar circle */}
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl border-2"
                  style={{
                    backgroundColor: "#0f172a",
                    borderColor: "#c9a227",
                  }}
                >
                  {member.emoji}
                </div>

                <h3
                  className="font-playfair font-bold text-xl mb-1 group-hover:text-amber-300 transition-colors"
                  style={{ color: "#f8f4ec" }}
                >
                  {isUk ? member.nameUk : member.nameEn}
                </h3>
                <div
                  className="font-inter text-sm mb-1"
                  style={{ color: "#c9a227" }}
                >
                  {isUk ? member.titleUk : member.titleEn}
                </div>
                <div className="font-inter text-xs text-slate-400 mb-4">
                  {isUk ? member.specUk : member.specEn}
                </div>

                <div
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-inter"
                  style={{ backgroundColor: "#0f172a", color: "#94a3b8" }}
                >
                  ⭐ {member.exp} {isUk ? "р. досвіду" : "yrs experience"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="w-full py-20 px-4" style={{ backgroundColor: "#111827" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div
              className="font-inter text-xs uppercase tracking-widest mb-3"
              style={{ color: "#c9a227" }}
            >
              {isUk ? "Відгуки клієнтів" : "Client Testimonials"}
            </div>
            <h2
              className="font-playfair font-bold text-3xl md:text-4xl"
              style={{ color: "#f8f4ec" }}
            >
              {isUk ? "Що кажуть клієнти" : "What Our Clients Say"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="rounded-xl border p-6 flex flex-col"
                style={{ backgroundColor: "#1e293b", borderColor: "#2d3f5c" }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <span key={si} style={{ color: "#f0c040" }}>★</span>
                  ))}
                </div>

                {/* Quote mark */}
                <div
                  className="font-playfair text-5xl leading-none mb-2 -mt-2"
                  style={{ color: "#c9a227", opacity: 0.5 }}
                >
                  "
                </div>

                <p
                  className="font-inter text-slate-300 text-sm leading-relaxed flex-1 mb-6"
                  style={{ fontWeight: 300 }}
                >
                  {isUk ? t.quoteUk : t.quoteEn}
                </p>

                <div className="border-t pt-4" style={{ borderColor: "#2d3f5c" }}>
                  <div
                    className="font-inter font-medium text-sm"
                    style={{ color: "#f8f4ec" }}
                  >
                    {isUk ? t.nameUk : t.nameEn}
                  </div>
                  <div className="font-inter text-xs text-slate-500 mt-0.5">
                    {isUk ? t.roleUk : t.roleEn}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ACCORDION ────────────────────────────────────── */}
      <section className="w-full py-20 px-4" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div
              className="font-inter text-xs uppercase tracking-widest mb-3"
              style={{ color: "#c9a227" }}
            >
              {isUk ? "Часті питання" : "FAQ"}
            </div>
            <h2
              className="font-playfair font-bold text-3xl md:text-4xl"
              style={{ color: "#f8f4ec" }}
            >
              {isUk ? "Запитання та відповіді" : "Questions & Answers"}
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border overflow-hidden"
                style={{
                  backgroundColor: "#1e293b",
                  borderColor: faqOpen === i ? "#c9a227" : "#2d3f5c",
                }}
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 transition-colors duration-200 hover:bg-white/5"
                >
                  <span
                    className="font-inter font-medium text-sm"
                    style={{ color: faqOpen === i ? "#f0c040" : "#e2e8f0" }}
                  >
                    {isUk ? item.qUk : item.qEn}
                  </span>
                  <span
                    className="shrink-0 text-lg transition-transform duration-200"
                    style={{
                      color: "#c9a227",
                      transform: faqOpen === i ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </button>
                {faqOpen === i && (
                  <div
                    className="px-6 pb-5 font-inter text-slate-400 text-sm leading-relaxed border-t"
                    style={{ borderColor: "#2d3f5c", fontWeight: 300 }}
                  >
                    <div className="pt-4">{isUk ? item.aUk : item.aEn}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONSULTATION FORM ────────────────────────────────── */}
      <section
        className="w-full py-20 px-4 relative"
        style={{ backgroundColor: "#111827" }}
      >
        {/* decorative side line */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1"
          style={{ background: "linear-gradient(to bottom, transparent, #c9a227, transparent)" }}
        />

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div
              className="font-inter text-xs uppercase tracking-widest mb-3"
              style={{ color: "#c9a227" }}
            >
              {isUk ? "Зв'яжіться з нами" : "Get in Touch"}
            </div>
            <h2
              className="font-playfair font-bold text-3xl md:text-4xl mb-3"
              style={{ color: "#f8f4ec" }}
            >
              {isUk ? "Безкоштовна консультація" : "Free Consultation"}
            </h2>
            <p
              className="font-inter text-slate-400 text-sm"
              style={{ fontWeight: 300 }}
            >
              {isUk
                ? "Опишіть вашу ситуацію — ми відповімо протягом 24 годин"
                : "Describe your situation — we respond within 24 hours"}
            </p>
          </div>

          {formSubmitted ? (
            <div
              className="rounded-xl border p-10 text-center"
              style={{ backgroundColor: "#1e293b", borderColor: "#c9a227" }}
            >
              <div className="text-4xl mb-4">✓</div>
              <h3
                className="font-playfair font-bold text-xl mb-2"
                style={{ color: "#f0c040" }}
              >
                {isUk ? "Запит надіслано!" : "Request Sent!"}
              </h3>
              <p className="font-inter text-slate-400 text-sm" style={{ fontWeight: 300 }}>
                {isUk
                  ? "Наш адвокат зв'яжеться з вами найближчим часом."
                  : "Our attorney will be in touch with you shortly."}
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-xl border p-8 flex flex-col gap-5"
              style={{ backgroundColor: "#1e293b", borderColor: "#2d3f5c" }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label
                    className="font-inter text-xs uppercase tracking-wide"
                    style={{ color: "#c9a227" }}
                  >
                    {isUk ? "Ваше ім'я" : "Your Name"}
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder={isUk ? "Іван Петренко" : "John Smith"}
                    className="w-full rounded-lg px-4 py-3 font-inter text-sm outline-none transition-all duration-200"
                    style={{
                      backgroundColor: "#0f172a",
                      border: "1px solid #2d3f5c",
                      color: "#e2e8f0",
                    }}
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label
                    className="font-inter text-xs uppercase tracking-wide"
                    style={{ color: "#c9a227" }}
                  >
                    {isUk ? "Телефон" : "Phone Number"}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="+380 XX XXX XXXX"
                    className="w-full rounded-lg px-4 py-3 font-inter text-sm outline-none transition-all duration-200"
                    style={{
                      backgroundColor: "#0f172a",
                      border: "1px solid #2d3f5c",
                      color: "#e2e8f0",
                    }}
                  />
                </div>
              </div>

              {/* Issue type */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="font-inter text-xs uppercase tracking-wide"
                  style={{ color: "#c9a227" }}
                >
                  {isUk ? "Тип питання" : "Legal Issue Type"}
                </label>
                <select
                  required
                  value={formIssue}
                  onChange={(e) => setFormIssue(e.target.value)}
                  className="w-full rounded-lg px-4 py-3 font-inter text-sm outline-none transition-all duration-200 appearance-none"
                  style={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #2d3f5c",
                    color: formIssue ? "#e2e8f0" : "#64748b",
                  }}
                >
                  {issueTypes.map((type, i) => (
                    <option key={i} value={i === 0 ? "" : type} disabled={i === 0}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="font-inter text-xs uppercase tracking-wide"
                  style={{ color: "#c9a227" }}
                >
                  {isUk ? "Опис ситуації" : "Describe Your Situation"}
                </label>
                <textarea
                  rows={4}
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder={
                    isUk
                      ? "Коротко опишіть вашу юридичну ситуацію..."
                      : "Briefly describe your legal situation..."
                  }
                  className="w-full rounded-lg px-4 py-3 font-inter text-sm outline-none resize-none transition-all duration-200"
                  style={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #2d3f5c",
                    color: "#e2e8f0",
                  }}
                />
              </div>

              {/* Disclaimer */}
              <p className="font-inter text-xs text-slate-500 leading-relaxed" style={{ fontWeight: 300 }}>
                {isUk
                  ? "Надсилаючи форму, ви погоджуєтеся на обробку персональних даних згідно з нашою Політикою конфіденційності."
                  : "By submitting this form you agree to the processing of personal data in accordance with our Privacy Policy."}
              </p>

              <button
                type="submit"
                className="w-full py-4 rounded-lg font-inter font-semibold text-sm transition-all duration-200 hover:opacity-90 mt-1"
                style={{
                  background: "linear-gradient(135deg, #c9a227 0%, #f0c040 100%)",
                  color: "#0f172a",
                }}
              >
                {isUk ? "Надіслати запит" : "Send Request"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer
        className="w-full pt-14 pb-8 px-4 border-t"
        style={{ backgroundColor: "#0a1020", borderColor: "#1e293b" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-9 h-9 rounded flex items-center justify-center font-bold shrink-0"
                  style={{ background: "linear-gradient(135deg, #c9a227 0%, #f0c040 100%)", color: "#0f172a" }}
                >
                  L
                </div>
                <div>
                  <div
                    className="font-playfair font-bold text-sm"
                    style={{ color: "#f0c040" }}
                  >
                    LexUA
                  </div>
                  <div className="font-inter text-xs text-slate-500">
                    {isUk ? "Право та Захист" : "Law & Protection"}
                  </div>
                </div>
              </div>
              <p className="font-inter text-xs text-slate-500 leading-relaxed" style={{ fontWeight: 300 }}>
                {isUk
                  ? "Ліцензоване адвокатське об'єднання. Всі адвокати включені до Єдиного реєстру адвокатів України."
                  : "Licensed law firm. All attorneys are registered in the Unified Register of Attorneys of Ukraine."}
              </p>
            </div>

            {/* Services */}
            <div>
              <h4
                className="font-inter font-semibold text-xs uppercase tracking-widest mb-4"
                style={{ color: "#c9a227" }}
              >
                {isUk ? "Послуги" : "Services"}
              </h4>
              <ul className="flex flex-col gap-2">
                {(isUk
                  ? ["Корпоративне право", "Кримінальний захист", "Нерухомість", "Сімейне право", "ІВ та авторські права", "Податкове право"]
                  : ["Corporate Law", "Criminal Defense", "Real Estate", "Family Law", "IP & Copyright", "Tax Law"]
                ).map((s) => (
                  <li key={s}>
                    <a
                      href="#"
                      className="font-inter text-xs text-slate-400 hover:text-amber-400 transition-colors duration-200"
                    >
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4
                className="font-inter font-semibold text-xs uppercase tracking-widest mb-4"
                style={{ color: "#c9a227" }}
              >
                {isUk ? "Контакти" : "Contact"}
              </h4>
              <ul className="flex flex-col gap-3">
                <li className="flex items-start gap-2">
                  <span className="text-sm shrink-0 mt-0.5">📍</span>
                  <span className="font-inter text-xs text-slate-400" style={{ fontWeight: 300 }}>
                    {isUk
                      ? "вул. Хрещатик 22, офіс 501, Київ, 01001"
                      : "22 Khreshchatyk St., Office 501, Kyiv, 01001"}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-sm shrink-0">📞</span>
                  <span className="font-inter text-xs text-slate-400">+380 44 000 11 22</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-sm shrink-0">✉️</span>
                  <span className="font-inter text-xs text-slate-400">info@lexua.law</span>
                </li>
              </ul>
            </div>

            {/* Hours */}
            <div>
              <h4
                className="font-inter font-semibold text-xs uppercase tracking-widest mb-4"
                style={{ color: "#c9a227" }}
              >
                {isUk ? "Графік роботи" : "Office Hours"}
              </h4>
              <ul className="flex flex-col gap-2">
                {(isUk
                  ? [
                      { day: "Пн – Пт", time: "09:00 – 19:00" },
                      { day: "Субота", time: "10:00 – 15:00" },
                      { day: "Неділя", time: "Вихідний" },
                    ]
                  : [
                      { day: "Mon – Fri", time: "09:00 – 19:00" },
                      { day: "Saturday", time: "10:00 – 15:00" },
                      { day: "Sunday", time: "Closed" },
                    ]
                ).map((h) => (
                  <li key={h.day} className="flex justify-between gap-4 font-inter text-xs text-slate-400">
                    <span>{h.day}</span>
                    <span style={{ color: h.time === "Вихідний" || h.time === "Closed" ? "#64748b" : "#94a3b8" }}>
                      {h.time}
                    </span>
                  </li>
                ))}
              </ul>

              <div
                className="mt-4 px-3 py-2 rounded-lg text-xs font-inter text-center"
                style={{ backgroundColor: "#1e293b", color: "#c9a227" }}
              >
                📞 {isUk ? "Гаряча лінія 24/7" : "Hotline 24/7"}
                <div className="font-bold mt-0.5 text-amber-300">+380 44 000 33 44</div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t font-inter text-xs text-slate-600"
            style={{ borderColor: "#1e293b" }}
          >
            <span>
              © 2008–2024 LexUA.{" "}
              {isUk ? "Всі права захищено." : "All rights reserved."}
            </span>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-amber-400 transition-colors">
                {isUk ? "Конфіденційність" : "Privacy Policy"}
              </a>
              <a href="#" className="hover:text-amber-400 transition-colors">
                {isUk ? "Умови використання" : "Terms of Use"}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
