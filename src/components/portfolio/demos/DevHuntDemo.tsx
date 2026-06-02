"use client";
import { useState } from "react";

export function DevHuntDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [companyName, setCompanyName] = useState("");
  const [isConfidential, setIsConfidential] = useState(false);
  const [position, setPosition] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [teamSize, setTeamSize] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const positions = ["CTO", "VP Engineering", "Head of Product", "Senior Engineer", "Lead Developer", isUk ? "Інше" : "Custom"];
  const techs = ["React", "Node.js", "Python", "Java", "Go", "AWS", isUk ? "Інше" : "Other"];
  const teamSizes = [
    isUk ? "Стартап (<20)" : "Startup (<20)",
    isUk ? "Зростаючий (20-200)" : "Scale-up (20-200)",
    isUk ? "Підприємство (200+)" : "Enterprise (200+)",
  ];
  const budgets = [
    isUk ? "Ринковий рівень" : "Market rate",
    isUk ? "20% вище ринку" : "20% above market",
    isUk ? "Найкраща пропозиція" : "Top of market",
    isUk ? "Акціонерна компенсація" : "Equity compensation",
  ];
  const timelines = ["ASAP", isUk ? "1-3 місяці" : "1-3 months", isUk ? "3-6 місяців" : "3-6 months", isUk ? "Гнучко" : "Flexible"];

  const cases = [
    {
      icon: "🏢",
      company: isUk ? "ФінТех стартап, Київ" : "FinTech startup, Kyiv",
      role: "CTO",
      days: isUk ? "18 днів" : "18 days",
      salary: "$8,000–$12,000",
    },
    {
      icon: "🚀",
      company: isUk ? "E-commerce scale-up" : "E-commerce scale-up",
      role: "Head of Engineering",
      days: isUk ? "24 дні" : "24 days",
      salary: "$6,000–$9,000",
    },
    {
      icon: "🏦",
      company: isUk ? "Корпоративний банк" : "Enterprise bank",
      role: "VP Product",
      days: isUk ? "21 день" : "21 days",
      salary: "$10,000–$15,000",
    },
  ];

  const steps = [
    { n: "01", label: isUk ? "Брифінг" : "Briefing" },
    { n: "02", label: isUk ? "Картування ринку" : "Market mapping" },
    { n: "03", label: isUk ? "Хедхантинг" : "Headhunting" },
    { n: "04", label: isUk ? "Оцінювання" : "Assessment" },
    { n: "05", label: isUk ? "Управління офером" : "Offer management" },
  ];

  const stats = [
    { value: "94%", label: isUk ? "Успішних розміщень" : "Placement success" },
    { value: "21", label: isUk ? "Днів у середньому" : "Avg. days" },
    { value: "300+", label: isUk ? "IT-компаній" : "IT companies" },
    { value: "8", label: isUk ? "Років досвіду" : "Years experience" },
  ];

  const toggleTech = (t: string) =>
    setTechStack((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ background: "#141414", color: "#F5F5F5", fontFamily: "'Inter', sans-serif", minHeight: "100vh" }}>
      {/* NAV */}
      <nav style={{ borderBottom: "1px solid #2C2C2C", padding: "0 24px" }} className="flex items-center justify-between h-16">
        <span style={{ color: "#A3E635", fontWeight: 800, fontSize: 20, letterSpacing: "-0.5px" }}>DEV<span style={{ color: "#fff" }}>HUNT</span></span>
        <div className="hidden md:flex gap-8 text-sm" style={{ color: "#9CA3AF" }}>
          {[isUk ? "Компаніям" : "For Companies", isUk ? "Кандидатам" : "For Candidates", isUk ? "Кейси" : "Case Studies"].map((l) => (
            <span key={l} style={{ cursor: "pointer" }} className="hover:text-white transition-colors">{l}</span>
          ))}
        </div>
        <button style={{ background: "#A3E635", color: "#141414", borderRadius: 6, padding: "8px 18px", fontWeight: 700, fontSize: 13, border: "none", cursor: "pointer" }}>
          {isUk ? "Залишити запит" : "Submit Request"}
        </button>
      </nav>

      {/* HERO */}
      <section style={{ padding: "80px 24px 64px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "#1E1E1E", border: "1px solid #2C2C2C", borderRadius: 100, padding: "6px 16px", fontSize: 12, color: "#A3E635", marginBottom: 24, letterSpacing: 1 }}>
          {isUk ? "EXECUTIVE SEARCH · IT & TECH" : "EXECUTIVE SEARCH · IT & TECH"}
        </div>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 20, letterSpacing: "-1px" }}>
          {isUk ? "Ми знаходимо тих," : "We find those"}<br />
          <span style={{ color: "#A3E635" }}>{isUk ? "кого інші не можуть знайти" : "others can't find"}</span>
        </h1>
        <p style={{ color: "#9CA3AF", fontSize: 18, maxWidth: 540, margin: "0 auto 32px" }}>
          {isUk ? "IT Executive Search. Старший інжиніринг. Продуктове лідерство." : "IT Executive Search. Senior Engineering. Product Leadership."}
        </p>
        <div style={{ display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap", color: "#6B7280", fontSize: 14 }}>
          <span>✦ {isUk ? "94% успішних розміщень" : "94% placement success"}</span>
          <span>✦ {isUk ? "Серед. 21 день" : "Avg. 21 days"}</span>
          <span>✦ {isUk ? "300+ IT-компаній" : "300+ IT companies"}</span>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: "#A3E635", padding: "40px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, textAlign: "center" }}>
          {stats.map((s) => (
            <div key={s.value}>
              <div style={{ fontSize: 42, fontWeight: 900, color: "#141414", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 13, color: "#374151", marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CASE STUDIES */}
      <section style={{ padding: "64px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>{isUk ? "Закриті кейси" : "Case Studies"}</h2>
          <p style={{ color: "#6B7280", marginBottom: 32, fontSize: 14 }}>{isUk ? "Анонімізовано за запитом клієнтів" : "Anonymised at client request"}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {cases.map((c) => (
              <div key={c.role} style={{ background: "#1E1E1E", border: "1px solid #2C2C2C", borderRadius: 12, padding: 24 }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{c.icon}</div>
                <div style={{ color: "#9CA3AF", fontSize: 12, marginBottom: 4 }}>{c.company}</div>
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 16 }}>{c.role}</div>
                <div style={{ display: "flex", gap: 16, fontSize: 13 }}>
                  <span style={{ color: "#A3E635" }}>⏱ {c.days}</span>
                  <span style={{ color: "#6B7280" }}>{c.salary}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ background: "#1A1A1A", padding: "64px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 40, textAlign: "center" }}>{isUk ? "Наш процес" : "Our Process"}</h2>
          <div style={{ display: "flex", gap: 0, overflowX: "auto" }}>
            {steps.map((s, i) => (
              <div key={s.n} style={{ flex: 1, minWidth: 120, textAlign: "center", position: "relative" }}>
                {i < steps.length - 1 && (
                  <div style={{ position: "absolute", top: 20, left: "60%", right: "-40%", height: 2, background: "#2C2C2C", zIndex: 0 }} />
                )}
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#A3E635", color: "#141414", fontWeight: 800, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", position: "relative", zIndex: 1 }}>{s.n}</div>
                <div style={{ fontSize: 13, color: "#D1D5DB" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ padding: "64px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {[
            {
              title: isUk ? "Для компаній" : "For Companies",
              items: [isUk ? "Executive search" : "Executive search", isUk ? "Тимчасове лідерство" : "Interim leadership", isUk ? "Аудит команди" : "Team audit"],
            },
            {
              title: isUk ? "Для кандидатів" : "For Candidates",
              items: [isUk ? "Кар'єрне консультування" : "Career advisory", isUk ? "Бенчмаркінг зарплат" : "Salary benchmarking", isUk ? "CV-ревью" : "CV review"],
            },
          ].map((srv) => (
            <div key={srv.title} style={{ background: "#1E1E1E", border: "1px solid #2C2C2C", borderRadius: 12, padding: 28 }}>
              <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 16, color: "#A3E635" }}>{srv.title}</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {srv.items.map((item) => (
                  <li key={item} style={{ padding: "8px 0", borderBottom: "1px solid #2C2C2C", fontSize: 14, color: "#D1D5DB" }}>→ {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CONFIDENTIAL FORM */}
      <section style={{ background: "#1A1A1A", padding: "64px 24px" }} id="form">
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ display: "inline-block", background: "#141414", border: "1px solid #A3E635", borderRadius: 100, padding: "4px 14px", fontSize: 11, color: "#A3E635", letterSpacing: 1, marginBottom: 16 }}>
              🔒 {isUk ? "КОНФІДЕНЦІЙНО" : "CONFIDENTIAL"}
            </div>
            <h2 style={{ fontSize: 28, fontWeight: 800 }}>{isUk ? "Надіслати конфіденційний запит" : "Submit a Confidential Request"}</h2>
          </div>

          {submitted ? (
            <div style={{ background: "#1E2E0F", border: "1px solid #A3E635", borderRadius: 12, padding: 40, textAlign: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
              <h3 style={{ fontWeight: 700, fontSize: 20, color: "#A3E635", marginBottom: 8 }}>
                {isUk ? "Ваш конфіденційний запит отримано" : "Your confidential request is received."}
              </h3>
              <p style={{ color: "#9CA3AF", fontSize: 14 }}>
                {isUk ? "Ми зв'яжемося з вами протягом 24 годин." : "We'll contact you within 24 hours."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Company */}
              <div>
                <label style={{ fontSize: 13, color: "#9CA3AF", display: "block", marginBottom: 8 }}>
                  {isUk ? "Назва компанії (необов'язково)" : "Company name (optional)"}
                </label>
                <input
                  value={isConfidential ? (isUk ? "Конфіденційно" : "Confidential") : companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  disabled={isConfidential}
                  placeholder={isUk ? "Ваша компанія" : "Your company"}
                  style={{ width: "100%", background: "#141414", border: "1px solid #2C2C2C", borderRadius: 8, padding: "12px 14px", color: "#F5F5F5", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                />
                <label style={{ fontSize: 12, color: "#6B7280", marginTop: 8, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                  <input type="checkbox" checked={isConfidential} onChange={(e) => setIsConfidential(e.target.checked)} />
                  {isUk ? "Зберегти конфіденційність" : "Keep confidential"}
                </label>
              </div>

              {/* Position */}
              <div>
                <label style={{ fontSize: 13, color: "#9CA3AF", display: "block", marginBottom: 8 }}>{isUk ? "Тип позиції" : "Position type"}</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {positions.map((p) => (
                    <button key={p} type="button" onClick={() => setPosition(p)}
                      style={{ padding: "8px 16px", borderRadius: 6, border: `1px solid ${position === p ? "#A3E635" : "#2C2C2C"}`, background: position === p ? "#1E2E0F" : "#141414", color: position === p ? "#A3E635" : "#9CA3AF", fontSize: 13, cursor: "pointer" }}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tech stack */}
              <div>
                <label style={{ fontSize: 13, color: "#9CA3AF", display: "block", marginBottom: 8 }}>{isUk ? "Технологічний стек" : "Tech stack requirements"}</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {techs.map((t) => (
                    <button key={t} type="button" onClick={() => toggleTech(t)}
                      style={{ padding: "6px 14px", borderRadius: 6, border: `1px solid ${techStack.includes(t) ? "#A3E635" : "#2C2C2C"}`, background: techStack.includes(t) ? "#1E2E0F" : "#141414", color: techStack.includes(t) ? "#A3E635" : "#9CA3AF", fontSize: 13, cursor: "pointer" }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Team + Budget */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ fontSize: 13, color: "#9CA3AF", display: "block", marginBottom: 8 }}>{isUk ? "Розмір команди" : "Team size"}</label>
                  <select value={teamSize} onChange={(e) => setTeamSize(e.target.value)}
                    style={{ width: "100%", background: "#141414", border: "1px solid #2C2C2C", borderRadius: 8, padding: "12px 14px", color: "#F5F5F5", fontSize: 13, outline: "none" }}>
                    <option value="">—</option>
                    {teamSizes.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 13, color: "#9CA3AF", display: "block", marginBottom: 8 }}>{isUk ? "Бюджет" : "Budget"}</label>
                  <select value={budget} onChange={(e) => setBudget(e.target.value)}
                    style={{ width: "100%", background: "#141414", border: "1px solid #2C2C2C", borderRadius: 8, padding: "12px 14px", color: "#F5F5F5", fontSize: 13, outline: "none" }}>
                    <option value="">—</option>
                    {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <label style={{ fontSize: 13, color: "#9CA3AF", display: "block", marginBottom: 8 }}>{isUk ? "Терміни" : "Timeline"}</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {timelines.map((t) => (
                    <button key={t} type="button" onClick={() => setTimeline(t)}
                      style={{ padding: "8px 16px", borderRadius: 6, border: `1px solid ${timeline === t ? "#A3E635" : "#2C2C2C"}`, background: timeline === t ? "#1E2E0F" : "#141414", color: timeline === t ? "#A3E635" : "#9CA3AF", fontSize: 13, cursor: "pointer" }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit"
                style={{ background: "#A3E635", color: "#141414", border: "none", borderRadius: 8, padding: "16px", fontWeight: 800, fontSize: 15, cursor: "pointer", marginTop: 8 }}>
                🔒 {isUk ? "Надіслати конфіденційно" : "Submit Confidentially"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #2C2C2C", padding: "32px 24px", textAlign: "center", color: "#4B5563", fontSize: 13 }}>
        <span style={{ color: "#A3E635", fontWeight: 700 }}>DEVHUNT</span> &copy; 2024 · {isUk ? "IT Executive Search" : "IT Executive Search"}
      </footer>
    </div>
  );
}
