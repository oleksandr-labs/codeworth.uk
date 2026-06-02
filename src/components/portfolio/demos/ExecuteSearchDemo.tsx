"use client";
import { useState } from "react";

export function ExecuteSearchDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [monthlyRevenue, setMonthlyRevenue] = useState(50000);
  const [monthsVacant, setMonthsVacant] = useState(3);

  const directLoss = monthsVacant * monthlyRevenue;
  const productivityLoss = monthsVacant * monthlyRevenue * 0.15;
  const interimCosts = monthsVacant * 3000;
  const totalLoss = directLoss + productivityLoss + interimCosts;
  const ourFee = monthlyRevenue * 12 * 0.15;
  const feeVsLoss = totalLoss > 0 ? ((ourFee / totalLoss) * 100).toFixed(1) : "0";

  const formatEur = (n: number) =>
    "€" + n.toLocaleString("de-DE", { maximumFractionDigits: 0 });

  const [form, setForm] = useState({
    company: "",
    contact: "",
    phone: "",
    position: "",
    compensation: "",
    industry: "",
    timeline: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const navLinks = [
    { uk: "Послуги", en: "Services", href: "#services" },
    { uk: "Кейси", en: "Cases", href: "#cases" },
    { uk: "Команда", en: "Team", href: "#team" },
    { uk: "Гарантії", en: "Guarantees", href: "#guarantees" },
    { uk: "Контакт", en: "Contact", href: "#brief" },
  ];

  const cases = [
    {
      position: { uk: "CEO IT-компанії", en: "CEO IT Company" },
      industry: { uk: "IT / SaaS", en: "IT / SaaS" },
      screened: 14,
      days: 67,
      salary: 18000,
    },
    {
      position: { uk: "CFO Retail Group", en: "CFO Retail Group" },
      industry: { uk: "Роздрібна торгівля", en: "Retail" },
      screened: 19,
      days: 82,
      salary: 12000,
    },
    {
      position: { uk: "CTO Manufacturing", en: "CTO Manufacturing" },
      industry: { uk: "Виробництво", en: "Manufacturing" },
      screened: 11,
      days: 54,
      salary: 15000,
    },
  ];

  const services = [
    {
      title: { uk: "C-Level Пошук", en: "C-Level Search" },
      subtitle: { uk: "CEO / CFO / CTO / COO", en: "CEO / CFO / CTO / COO" },
      fee: { uk: "від €12,000 комісії", en: "from €12,000 fee" },
      guarantee: { uk: "Гарантія 6 місяців", en: "6-month guarantee" },
      features: [
        { uk: "Прямий пошук (Headhunting)", en: "Direct search (Headhunting)" },
        { uk: "Перевірка рекомендацій (360°)", en: "Reference check (360°)" },
        { uk: "Психометричне тестування", en: "Psychometric testing" },
        { uk: "Допомога у переговорах з офером", en: "Offer negotiation support" },
        { uk: "Онбординг-супровід 3 місяці", en: "3-month onboarding support" },
      ],
    },
    {
      title: { uk: "Senior Management", en: "Senior Management" },
      subtitle: { uk: "VP / Director / Head of", en: "VP / Director / Head of" },
      fee: { uk: "від €6,000 комісії", en: "from €6,000 fee" },
      guarantee: { uk: "Гарантія 3 місяці", en: "3-month guarantee" },
      features: [
        { uk: "Прямий пошук + база кандидатів", en: "Direct search + candidate database" },
        { uk: "Структуровані інтерв'ю", en: "Structured interviews" },
        { uk: "Перевірка рекомендацій", en: "Reference checks" },
        { uk: "Супровід до підписання офера", en: "Support until offer signed" },
        { uk: "Онбординг-супровід 1 місяць", en: "1-month onboarding support" },
      ],
    },
    {
      title: { uk: "Board Member Search", en: "Board Member Search" },
      subtitle: { uk: "Незалежні директори / Наглядова рада", en: "Independent Directors / Supervisory Board" },
      fee: { uk: "від €20,000 комісії", en: "from €20,000 fee" },
      guarantee: { uk: "Гарантія 12 місяців", en: "12-month guarantee" },
      features: [
        { uk: "Міжнародний пошук кандидатів", en: "International candidate search" },
        { uk: "Due diligence кандидата", en: "Candidate due diligence" },
        { uk: "Оцінка корпоративного фіту", en: "Corporate fit assessment" },
        { uk: "Юридичний супровід призначення", en: "Legal appointment support" },
        { uk: "Безперервна підтримка раді 12 міс.", en: "Continuous board support 12 mo." },
      ],
    },
  ];

  const team = [
    {
      initials: "АК",
      nameUk: "Андрій Коваль",
      nameEn: "Andriy Koval",
      roleUk: "Управляючий Партнер",
      roleEn: "Managing Partner",
      specUk: "15 років у executive search",
      specEn: "15 years in executive search",
    },
    {
      initials: "ІП",
      nameUk: "Ірина Петренко",
      nameEn: "Iryna Petrenko",
      roleUk: "Партнер — Промисловість та Виробництво",
      roleEn: "Partner — Industrial & Manufacturing",
      specUk: "11 років, 200+ плейсментів",
      specEn: "11 years, 200+ placements",
    },
    {
      initials: "МД",
      nameUk: "Михайло Дорошенко",
      nameEn: "Mykhailo Doroshenko",
      roleUk: "Партнер — Tech & IT",
      roleEn: "Partner — Tech & IT",
      specUk: "9 років, спеціалізація SaaS / Fintech",
      specEn: "9 years, SaaS / Fintech focus",
    },
  ];

  const guarantees = [
    {
      icon: "⏱",
      title: { uk: "SLA 90 Днів", en: "90-Day SLA" },
      desc: {
        uk: "Якщо ми не закриємо позицію за 90 днів — повернемо 50% комісії. Без суперечок.",
        en: "If we don't fill the position within 90 days — we refund 50% of our fee. No disputes.",
      },
    },
    {
      icon: "🔄",
      title: { uk: "Безкоштовна Заміна", en: "Free Replacement" },
      desc: {
        uk: "Якщо кандидат залишить компанію протягом 6 місяців — проведемо повторний пошук безкоштовно.",
        en: "If the candidate leaves within 6 months — we conduct a full repeat search at no cost.",
      },
    },
    {
      icon: "🔒",
      title: { uk: "Абсолютна Конфіденційність", en: "Absolute Confidentiality" },
      desc: {
        uk: "NDA підписується до будь-якого обміну інформацією. Жодних витоків, жодних третіх сторін.",
        en: "NDA is signed before any information exchange. No leaks, no third parties.",
      },
    },
  ];

  const industryOptions = isUk
    ? ["IT / SaaS", "Фінтех", "Роздрібна торгівля", "Виробництво", "Будівництво", "Фармацевтика", "Агробізнес", "Логістика", "Інше"]
    : ["IT / SaaS", "Fintech", "Retail", "Manufacturing", "Construction", "Pharma", "Agribusiness", "Logistics", "Other"];

  const timelineOptions = isUk
    ? ["30 днів", "60 днів", "90 днів", "120 днів"]
    : ["30 days", "60 days", "90 days", "120 days"];

  const compensationOptions = ["€5,000–8,000", "€8,000–12,000", "€12,000–18,000", "€18,000+"];

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", background: "#020617", color: "#f1f5f9", minHeight: "100vh" }}>

      {/* NAVBAR */}
      <nav style={{ background: "#0f172a", borderBottom: "1px solid #1e293b", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <span style={{ fontSize: 20, fontWeight: 700, color: "#fbbf24", letterSpacing: "0.04em" }}>ExecuteSearch</span>
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {navLinks.map((l) => (
              <a
                key={l.en}
                href={l.href}
                style={{ color: "#94a3b8", fontSize: 14, fontWeight: 500, textDecoration: "none", letterSpacing: "0.02em", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#fbbf24")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#94a3b8")}
              >
                {isUk ? l.uk : l.en}
              </a>
            ))}
            <a
              href="#brief"
              style={{ background: "#f59e0b", color: "#0f172a", padding: "8px 18px", borderRadius: 6, fontSize: 13, fontWeight: 700, textDecoration: "none", letterSpacing: "0.03em", whiteSpace: "nowrap" }}
            >
              {isUk ? "Конфіденційний Бриф" : "Confidential Brief"}
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: "linear-gradient(160deg, #020617 0%, #0f172a 60%, #1e293b 100%)", padding: "96px 24px 80px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-block", background: "#1e293b", border: "1px solid #334155", borderRadius: 20, padding: "4px 16px", marginBottom: 32 }}>
            <span style={{ color: "#fbbf24", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {isUk ? "C-Level та Senior Рекрутинг" : "C-Level & Senior Recruitment"}
            </span>
          </div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, lineHeight: 1.15, color: "#f8fafc", marginBottom: 24, letterSpacing: "-0.02em" }}>
            {isUk
              ? "Знайдемо Лідера, Якого Потребує Ваш Бізнес"
              : "We Find the Leader Your Business Needs"}
          </h1>
          <p style={{ fontSize: 18, color: "#94a3b8", maxWidth: 680, margin: "0 auto 40px", lineHeight: 1.7 }}>
            {isUk
              ? "ExecuteSearch спеціалізується на пошуку C-level та Senior керівників для компаній, яким потрібен результат. SLA-гарантія закриття позиції за 90 днів або повернення 50% комісії."
              : "ExecuteSearch specialises in placing C-level and Senior executives for companies that demand results. SLA guarantee — fill the role in 90 days or receive a 50% fee refund."}
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="#brief"
              style={{ background: "#f59e0b", color: "#0f172a", padding: "14px 32px", borderRadius: 8, fontSize: 15, fontWeight: 700, textDecoration: "none", letterSpacing: "0.02em" }}
            >
              {isUk ? "Подати Бриф" : "Submit Brief"}
            </a>
            <a
              href="#cases"
              style={{ border: "1.5px solid #f1f5f9", color: "#f1f5f9", padding: "14px 32px", borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: "none", background: "transparent" }}
            >
              {isUk ? "Переглянути Кейси" : "View Cases"}
            </a>
          </div>
          <div style={{ marginTop: 64, display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap" }}>
            {[
              { num: "400+", label: { uk: "Плейсментів", en: "Placements" } },
              { num: "90", label: { uk: "Днів SLA", en: "Days SLA" } },
              { num: "98%", label: { uk: "Утримання 1 рік", en: "1-Year retention" } },
            ].map((s) => (
              <div key={s.num} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 36, fontWeight: 800, color: "#fbbf24" }}>{s.num}</div>
                <div style={{ fontSize: 13, color: "#64748b", fontWeight: 500, marginTop: 4, letterSpacing: "0.04em", textTransform: "uppercase" }}>{isUk ? s.label.uk : s.label.en}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 64, height: 2, background: "linear-gradient(90deg, transparent, #fbbf24 30%, #f59e0b 70%, transparent)", borderRadius: 2 }} />
        </div>
      </section>

      {/* CALCULATOR */}
      <section style={{ padding: "80px 24px", background: "#020617" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: "#f8fafc", marginBottom: 12, letterSpacing: "-0.01em" }}>
              {isUk ? "Скільки Коштує Вакантна Позиція?" : "What Does a Vacant Position Cost You?"}
            </h2>
            <p style={{ color: "#64748b", fontSize: 15 }}>
              {isUk
                ? "Розрахуйте реальні втрати від незакритої керівної посади"
                : "Calculate the real cost of an unfilled executive role"}
            </p>
          </div>

          <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 40 }}>
            <div style={{ marginBottom: 36 }}>
              <label style={{ display: "block", color: "#cbd5e1", fontSize: 14, fontWeight: 600, marginBottom: 10 }}>
                {isUk ? "Щомісячний дохід від одного топ-менеджера (€)" : "Monthly revenue from one top manager (€)"}
              </label>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <input
                  type="range"
                  min={10000}
                  max={200000}
                  step={10000}
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                  style={{ flex: 1, accentColor: "#f59e0b" }}
                />
                <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 6, padding: "8px 16px", color: "#fbbf24", fontWeight: 700, fontSize: 16, minWidth: 120, textAlign: "center" }}>
                  {formatEur(monthlyRevenue)}
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#475569", fontSize: 11, marginTop: 4 }}>
                <span>€10,000</span><span>€200,000</span>
              </div>
            </div>

            <div style={{ marginBottom: 40 }}>
              <label style={{ display: "block", color: "#cbd5e1", fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
                {isUk ? "Місяці без заміщення" : "Months vacant"}
              </label>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {[1, 2, 3, 4, 5, 6].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMonthsVacant(m)}
                    style={{
                      padding: "10px 22px",
                      borderRadius: 6,
                      border: monthsVacant === m ? "2px solid #f59e0b" : "1.5px solid #334155",
                      background: monthsVacant === m ? "#1e293b" : "transparent",
                      color: monthsVacant === m ? "#fbbf24" : "#64748b",
                      fontWeight: monthsVacant === m ? 700 : 500,
                      fontSize: 15,
                      cursor: "pointer",
                    }}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ borderTop: "1px solid #1e293b", paddingTop: 32 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
                {[
                  {
                    label: { uk: "Прямі втрати доходу", en: "Direct revenue loss" },
                    value: directLoss,
                    sub: { uk: `${monthsVacant} міс. × ${formatEur(monthlyRevenue)}`, en: `${monthsVacant} mo. × ${formatEur(monthlyRevenue)}` },
                  },
                  {
                    label: { uk: "Зниження продуктивності команди (−15%)", en: "Team productivity loss (−15%)" },
                    value: productivityLoss,
                    sub: { uk: "Втрата ефективності підрозділу", en: "Unit efficiency loss" },
                  },
                  {
                    label: { uk: "Витрати на тимчасове закриття", en: "Interim coverage costs" },
                    value: interimCosts,
                    sub: { uk: `${monthsVacant} міс. × €3,000`, en: `${monthsVacant} mo. × €3,000` },
                  },
                  {
                    label: { uk: "Наша комісія", en: "Our fee" },
                    value: ourFee,
                    sub: { uk: "~15% від річного окладу", en: "~15% of annual salary" },
                    accent: true,
                  },
                ].map((row) => (
                  <div key={row.label.en} style={{ background: "#1e293b", borderRadius: 8, padding: "18px 20px" }}>
                    <div style={{ color: "#94a3b8", fontSize: 12, marginBottom: 8, lineHeight: 1.4 }}>{isUk ? row.label.uk : row.label.en}</div>
                    <div style={{ color: row.accent ? "#34d399" : "#fbbf24", fontSize: 22, fontWeight: 800 }}>{formatEur(row.value)}</div>
                    <div style={{ color: "#475569", fontSize: 11, marginTop: 4 }}>{isUk ? row.sub.uk : row.sub.en}</div>
                  </div>
                ))}
              </div>

              <div style={{ background: "linear-gradient(135deg, #1e293b, #0f172a)", border: "1.5px solid #f59e0b", borderRadius: 10, padding: "24px 28px", marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
                  <div>
                    <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 4 }}>
                      {isUk ? "Загальні втрати бізнесу" : "Total business losses"}
                    </div>
                    <div style={{ color: "#f87171", fontSize: 32, fontWeight: 800 }}>{formatEur(totalLoss)}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 4 }}>
                      {isUk ? `Наша комісія — лише ${feeVsLoss}% від ваших втрат` : `Our fee — only ${feeVsLoss}% of your losses`}
                    </div>
                    <div style={{ color: "#34d399", fontSize: 32, fontWeight: 800 }}>{formatEur(ourFee)}</div>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: "center" }}>
                <a
                  href="#brief"
                  style={{ display: "inline-block", background: "#f59e0b", color: "#0f172a", padding: "14px 36px", borderRadius: 8, fontSize: 15, fontWeight: 700, textDecoration: "none" }}
                >
                  {isUk ? "Закрити Позицію За 90 Днів" : "Fill Position in 90 Days"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section id="cases" style={{ padding: "80px 24px", background: "#0f172a" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: "#f8fafc", marginBottom: 12, letterSpacing: "-0.01em" }}>
              {isUk ? "Кейси Плейсментів" : "Placement Cases"}
            </h2>
            <p style={{ color: "#64748b", fontSize: 15 }}>
              {isUk ? "Реальні результати — без прикрашань" : "Real results — no embellishments"}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {cases.map((c, i) => (
              <div
                key={i}
                style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 32, borderTop: "3px solid #f59e0b" }}
              >
                <div style={{ display: "inline-block", background: "#1e293b", borderRadius: 20, padding: "3px 14px", marginBottom: 20 }}>
                  <span style={{ color: "#fbbf24", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {isUk ? c.industry.uk : c.industry.en}
                  </span>
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#f1f5f9", marginBottom: 24 }}>
                  {isUk ? c.position.uk : c.position.en}
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
                  {[
                    { label: { uk: "Кандидатів розглянуто", en: "Candidates screened" }, value: c.screened.toString() },
                    { label: { uk: "Розміщено", en: "Placed" }, value: "1" },
                    { label: { uk: "Днів до закриття", en: "Days to close" }, value: c.days.toString() },
                    { label: { uk: "Оклад / місяць", en: "Salary / month" }, value: `€${c.salary.toLocaleString()}` },
                  ].map((m) => (
                    <div key={m.label.en} style={{ background: "#1e293b", borderRadius: 8, padding: "14px 16px" }}>
                      <div style={{ color: "#475569", fontSize: 11, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>{isUk ? m.label.uk : m.label.en}</div>
                      <div style={{ color: "#fbbf24", fontSize: 22, fontWeight: 800 }}>{m.value}</div>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: "1px solid #1e293b", paddingTop: 16 }}>
                  <span style={{ color: "#34d399", fontSize: 13, fontWeight: 600 }}>
                    ✓ {isUk ? "Позицію закрито в рамках SLA" : "Position closed within SLA"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "80px 24px", background: "#020617" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: "#f8fafc", marginBottom: 12, letterSpacing: "-0.01em" }}>
              {isUk ? "Наші Послуги" : "Our Services"}
            </h2>
            <p style={{ color: "#64748b", fontSize: 15 }}>
              {isUk ? "Прозоре ціноутворення. Жодних прихованих платежів." : "Transparent pricing. No hidden charges."}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {services.map((s, i) => (
              <div
                key={i}
                style={{ background: "#0f172a", border: "1px solid #1e293b", borderLeft: "4px solid #f59e0b", borderRadius: 12, padding: 32 }}
              >
                <h3 style={{ fontSize: 20, fontWeight: 800, color: "#f1f5f9", marginBottom: 4 }}>
                  {isUk ? s.title.uk : s.title.en}
                </h3>
                <div style={{ color: "#94a3b8", fontSize: 14, marginBottom: 20 }}>{isUk ? s.subtitle.uk : s.subtitle.en}</div>
                <div style={{ color: "#fbbf24", fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{isUk ? s.fee.uk : s.fee.en}</div>
                <div style={{ color: "#34d399", fontSize: 13, fontWeight: 600, marginBottom: 24 }}>✓ {isUk ? s.guarantee.uk : s.guarantee.en}</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {s.features.map((f, fi) => (
                    <li key={fi} style={{ display: "flex", gap: 10, color: "#94a3b8", fontSize: 14 }}>
                      <span style={{ color: "#f59e0b", flexShrink: 0 }}>—</span>
                      <span>{isUk ? f.uk : f.en}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" style={{ padding: "80px 24px", background: "#0f172a" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: "#f8fafc", marginBottom: 12, letterSpacing: "-0.01em" }}>
              {isUk ? "Наша Команда" : "Our Team"}
            </h2>
            <p style={{ color: "#64748b", fontSize: 15 }}>
              {isUk ? "Партнери з досвідом у ключових галузях" : "Partners with expertise across key industries"}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {team.map((p, i) => (
              <div key={i} style={{ background: "#020617", border: "1px solid #1e293b", borderRadius: 12, padding: 32, textAlign: "center" }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 22, fontWeight: 800, color: "#0f172a" }}>
                  {p.initials}
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#f1f5f9", marginBottom: 6 }}>
                  {isUk ? p.nameUk : p.nameEn}
                </div>
                <div style={{ fontSize: 13, color: "#fbbf24", fontWeight: 600, marginBottom: 12, lineHeight: 1.4 }}>
                  {isUk ? p.roleUk : p.roleEn}
                </div>
                <div style={{ fontSize: 13, color: "#64748b" }}>{isUk ? p.specUk : p.specEn}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUARANTEES */}
      <section id="guarantees" style={{ padding: "80px 24px", background: "#020617" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: "#f8fafc", marginBottom: 12, letterSpacing: "-0.01em" }}>
              {isUk ? "Наші Гарантії" : "Our Guarantees"}
            </h2>
            <p style={{ color: "#64748b", fontSize: 15 }}>
              {isUk ? "Ми несемо відповідальність за результат" : "We are accountable for results"}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {guarantees.map((g, i) => (
              <div key={i} style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 32 }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{g.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fbbf24", marginBottom: 12 }}>
                  {isUk ? g.title.uk : g.title.en}
                </h3>
                <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.7 }}>
                  {isUk ? g.desc.uk : g.desc.en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRIEF FORM */}
      <section id="brief" style={{ padding: "80px 24px", background: "#0f172a" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: "#f8fafc", marginBottom: 12, letterSpacing: "-0.01em" }}>
              {isUk ? "Подати Конфіденційний Бриф" : "Submit Confidential Brief"}
            </h2>
            <p style={{ color: "#64748b", fontSize: 15 }}>
              {isUk
                ? "Заповніть форму — ми зв'яжемося з вами протягом 24 годин"
                : "Fill in the form — we will contact you within 24 hours"}
            </p>
          </div>

          <div style={{ background: "#020617", border: "1px solid #1e293b", borderRadius: 12, padding: "40px 40px" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#fbbf24", marginBottom: 12 }}>
                  {isUk ? "Бриф отримано" : "Brief received"}
                </h3>
                <p style={{ color: "#94a3b8", fontSize: 15 }}>
                  {isUk
                    ? "Ми зв'яжемося з вами протягом 24 годин. Вся інформація захищена NDA."
                    : "We will contact you within 24 hours. All information is protected by NDA."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <div>
                    <label style={{ display: "block", color: "#94a3b8", fontSize: 13, fontWeight: 600, marginBottom: 8, letterSpacing: "0.03em" }}>
                      {isUk ? "Компанія" : "Company"}
                      <span style={{ color: "#475569", fontWeight: 400, marginLeft: 6 }}>
                        ({isUk ? "Можна не вказувати" : "Optional"})
                      </span>
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder={isUk ? "Назва компанії (необов'язково)" : "Company name (optional)"}
                      style={{ width: "100%", background: "#0f172a", border: "1px solid #334155", borderRadius: 6, padding: "11px 14px", color: "#f1f5f9", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", color: "#94a3b8", fontSize: 13, fontWeight: 600, marginBottom: 8, letterSpacing: "0.03em" }}>
                      {isUk ? "Контактна особа" : "Contact person"} *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.contact}
                      onChange={(e) => setForm({ ...form, contact: e.target.value })}
                      placeholder={isUk ? "Ім'я та прізвище" : "Full name"}
                      style={{ width: "100%", background: "#0f172a", border: "1px solid #334155", borderRadius: 6, padding: "11px 14px", color: "#f1f5f9", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <div>
                    <label style={{ display: "block", color: "#94a3b8", fontSize: 13, fontWeight: 600, marginBottom: 8, letterSpacing: "0.03em" }}>
                      {isUk ? "Телефон" : "Phone"} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+380 / +49 / +44..."
                      style={{ width: "100%", background: "#0f172a", border: "1px solid #334155", borderRadius: 6, padding: "11px 14px", color: "#f1f5f9", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", color: "#94a3b8", fontSize: 13, fontWeight: 600, marginBottom: 8, letterSpacing: "0.03em" }}>
                      {isUk ? "Посада до заповнення" : "Position to fill"} *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.position}
                      onChange={(e) => setForm({ ...form, position: e.target.value })}
                      placeholder="CEO / CFO / CTO / VP..."
                      style={{ width: "100%", background: "#0f172a", border: "1px solid #334155", borderRadius: 6, padding: "11px 14px", color: "#f1f5f9", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
                  <div>
                    <label style={{ display: "block", color: "#94a3b8", fontSize: 13, fontWeight: 600, marginBottom: 8, letterSpacing: "0.03em" }}>
                      {isUk ? "Приблизна компенсація" : "Approximate compensation"} *
                    </label>
                    <select
                      required
                      value={form.compensation}
                      onChange={(e) => setForm({ ...form, compensation: e.target.value })}
                      style={{ width: "100%", background: "#0f172a", border: "1px solid #334155", borderRadius: 6, padding: "11px 14px", color: form.compensation ? "#f1f5f9" : "#475569", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                    >
                      <option value="" disabled>{isUk ? "Оберіть діапазон" : "Select range"}</option>
                      {compensationOptions.map((o) => (
                        <option key={o} value={o} style={{ background: "#0f172a" }}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", color: "#94a3b8", fontSize: 13, fontWeight: 600, marginBottom: 8, letterSpacing: "0.03em" }}>
                      {isUk ? "Галузь" : "Industry"} *
                    </label>
                    <select
                      required
                      value={form.industry}
                      onChange={(e) => setForm({ ...form, industry: e.target.value })}
                      style={{ width: "100%", background: "#0f172a", border: "1px solid #334155", borderRadius: 6, padding: "11px 14px", color: form.industry ? "#f1f5f9" : "#475569", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                    >
                      <option value="" disabled>{isUk ? "Оберіть галузь" : "Select industry"}</option>
                      {industryOptions.map((o) => (
                        <option key={o} value={o} style={{ background: "#0f172a" }}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", color: "#94a3b8", fontSize: 13, fontWeight: 600, marginBottom: 8, letterSpacing: "0.03em" }}>
                      {isUk ? "Терміни" : "Timeline"} *
                    </label>
                    <select
                      required
                      value={form.timeline}
                      onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                      style={{ width: "100%", background: "#0f172a", border: "1px solid #334155", borderRadius: 6, padding: "11px 14px", color: form.timeline ? "#f1f5f9" : "#475569", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                    >
                      <option value="" disabled>{isUk ? "Бажані терміни" : "Desired timeline"}</option>
                      {timelineOptions.map((o) => (
                        <option key={o} value={o} style={{ background: "#0f172a" }}>{o}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", color: "#94a3b8", fontSize: 13, fontWeight: 600, marginBottom: 8, letterSpacing: "0.03em" }}>
                    {isUk ? "Опис ролі та вимоги" : "Role description & requirements"}
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={5}
                    placeholder={
                      isUk
                        ? "Опишіть ключові завдання, необхідний досвід, галузеву специфіку та будь-які додаткові вимоги..."
                        : "Describe key responsibilities, required experience, industry specifics and any additional requirements..."
                    }
                    style={{ width: "100%", background: "#0f172a", border: "1px solid #334155", borderRadius: 6, padding: "11px 14px", color: "#f1f5f9", fontSize: 14, outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }}
                  />
                </div>

                <div style={{ paddingTop: 8 }}>
                  <button
                    type="submit"
                    style={{ width: "100%", background: "#f59e0b", color: "#0f172a", padding: "14px 0", borderRadius: 8, fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer", letterSpacing: "0.02em" }}
                  >
                    {isUk ? "Відправити Бриф" : "Send Brief"}
                  </button>
                  <p style={{ color: "#475569", fontSize: 12, textAlign: "center", marginTop: 14, lineHeight: 1.6 }}>
                    🔒{" "}
                    {isUk
                      ? "Всі дані захищені NDA. Ми не розкриваємо інформацію третім особам."
                      : "All data protected by NDA. We do not disclose information to third parties."}
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#020617", borderTop: "1px solid #1e293b", padding: "32px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#fbbf24" }}>ExecuteSearch</span>
          <span style={{ color: "#334155", fontSize: 13 }}>
            {isUk
              ? "© 2026 ExecuteSearch. Конфіденційність гарантована."
              : "© 2026 ExecuteSearch. Confidentiality guaranteed."}
          </span>
        </div>
      </footer>
    </div>
  );
}
