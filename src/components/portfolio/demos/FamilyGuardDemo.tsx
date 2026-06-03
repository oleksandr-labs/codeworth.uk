"use client";
import { useState } from "react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

export function FamilyGuardDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";
  const [activeService, setActiveService] = useState<number | null>(null);
  const [calcStep, setCalcStep] = useState(1);
  const [calcData, setCalcData] = useState({ marriageYears: 5, hasChildren: false, hasProperty: false });
  const [showCalcResult, setShowCalcResult] = useState(false);
  const [consultForm, setConsultForm] = useState({ situation: "", email: "", phone: "" });
  const [consultSubmitted, setConsultSubmitted] = useState(false);
  const [activeProcess, setActiveProcess] = useState(0);

  const services = [
    {
      id: 1, emoji: "💔",
      titleUk: "Розлучення", titleEn: "Divorce",
      subtitleUk: "Без вини / За згодою / Спірне", subtitleEn: "Uncontested / Contested / At fault",
      descUk: "Супровід на кожному етапі — від подачі заяви до судового рішення. Захист ваших інтересів без зайвого стресу.",
      descEn: "Guidance at every stage — from filing to court ruling. Protecting your interests without unnecessary stress.",
    },
    {
      id: 2, emoji: "🏠",
      titleUk: "Поділ майна", titleEn: "Property Division",
      subtitleUk: "Квартира, бізнес, заощадження", subtitleEn: "Apartment, business, savings",
      descUk: "Справедливий поділ спільно нажитого майна. Досвід у спорах щодо нерухомості та бізнес-активів.",
      descEn: "Fair division of jointly acquired assets. Experience in disputes over real estate and business assets.",
    },
    {
      id: 3, emoji: "👧",
      titleUk: "Захист прав дітей", titleEn: "Child Rights Protection",
      subtitleUk: "Опіка, аліменти, місце проживання", subtitleEn: "Custody, alimony, residence",
      descUk: "Пріоритет — благополуччя дитини. Домагаємось оптимальних рішень щодо опіки та фінансового забезпечення.",
      descEn: "Priority is the child's wellbeing. We achieve optimal decisions on custody and financial support.",
    },
    {
      id: 4, emoji: "💌",
      titleUk: "Шлюбний договір", titleEn: "Prenuptial Agreement",
      subtitleUk: "До або під час шлюбу", subtitleEn: "Before or during marriage",
      descUk: "Захист особистих та ділових інтересів кожного партнера через юридично обґрунтований договір.",
      descEn: "Protecting personal and business interests of each partner through a legally sound agreement.",
    },
    {
      id: 5, emoji: "🤝",
      titleUk: "Медіація", titleEn: "Mediation",
      subtitleUk: "Позасудове вирішення", subtitleEn: "Out-of-court resolution",
      descUk: "Допомагаємо досягти взаємоприйнятного рішення без тривалих судових процесів.",
      descEn: "We help reach a mutually acceptable solution without prolonged court proceedings.",
    },
    {
      id: 6, emoji: "🛡️",
      titleUk: "Захист від домашнього насильства", titleEn: "Domestic Violence Protection",
      subtitleUk: "Охоронні ордери", subtitleEn: "Restraining orders",
      descUk: "Термінова правова допомога. Отримання охоронних ордерів та забезпечення безпеки вас та дітей.",
      descEn: "Urgent legal assistance. Obtaining restraining orders and ensuring your and children's safety.",
    },
  ];

  const processSteps = [
    {
      stepUk: "Анонімна консультація", stepEn: "Anonymous Consultation",
      descUk: "Опишіть ситуацію без імені. Ми оцінимо перспективи та надамо першу пораду безкоштовно.",
      descEn: "Describe your situation without your name. We'll assess prospects and give first advice for free.",
    },
    {
      stepUk: "Аналіз документів", stepEn: "Document Analysis",
      descUk: "Вивчаємо ваші документи, оцінюємо ризики та розробляємо стратегію захисту.",
      descEn: "We study your documents, assess risks and develop a protection strategy.",
    },
    {
      stepUk: "Переговори або суд", stepEn: "Negotiation or Court",
      descUk: "Намагаємось врегулювати мирно. Якщо не виходить — захищаємо вас у суді.",
      descEn: "We try to resolve peacefully. If not — we defend you in court.",
    },
    {
      stepUk: "Виконання рішення", stepEn: "Enforcement",
      descUk: "Допомагаємо виконати судове рішення: стягнення аліментів, реєстрація прав на майно.",
      descEn: "We help enforce the court decision: collecting alimony, registering property rights.",
    },
  ];

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#FDF6EC", minHeight: "100vh" }}>
      {/* Nav */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #F0E6D8", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <div style={{ fontWeight: 800, fontSize: 20, color: "#2D1B0E" }}>
          <span style={{ color: "#C4704A" }}>⚖️</span> FamilyGuard
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {[isUk ? "Послуги" : "Services", isUk ? "Процес" : "Process", isUk ? "Ціни" : "Prices"].map(l => (
            <span key={l} style={{ color: "#6b7280", fontSize: 14, cursor: "pointer", fontWeight: 600 }}>{l}</span>
          ))}
          <button style={{ background: "#C4704A", color: "#fff", border: "none", borderRadius: 10, padding: "8px 18px", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
            {isUk ? "Анонімна консультація" : "Anonymous Consult"}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg,#FDF6EC,#F0E6D8)", padding: "70px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ background: "#D1E8D5", color: "#166534", borderRadius: 20, padding: "6px 16px", display: "inline-block", fontSize: 13, fontWeight: 700, marginBottom: 20 }}>
            🔒 {isUk ? "Конфіденційно · Без осуду · Перша консультація безкоштовна" : "Confidential · No judgment · First consultation free"}
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 900, color: "#2D1B0E", margin: "0 0 16px", lineHeight: 1.2 }}>
            {isUk ? "Важке рішення —" : "A Difficult Decision —"}<br />
            <span style={{ color: "#C4704A" }}>{isUk ? "надійний супровід поруч" : "reliable support beside you"}</span>
          </h1>
          <p style={{ color: "#6b5e50", fontSize: 18, maxWidth: 580, margin: "0 auto 32px", lineHeight: 1.6 }}>
            {isUk
              ? "Сімейний адвокат для розлучень, поділу майна та захисту прав дітей в Одесі"
              : "Family lawyer for divorces, property division and child rights protection in Odesa"}
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button style={{ background: "#C4704A", color: "#fff", border: "none", borderRadius: 14, padding: "14px 28px", fontWeight: 800, fontSize: 16, cursor: "pointer" }}>
              {isUk ? "Анонімна консультація" : "Anonymous Consultation"}
            </button>
            <button style={{ background: "transparent", color: "#C4704A", border: "2px solid #C4704A", borderRadius: 14, padding: "14px 28px", fontWeight: 700, fontSize: 16, cursor: "pointer" }}>
              {isUk ? "Як проходить процес?" : "How does the process work?"}
            </button>
          </div>
        </div>
      </div>

      {/* Services */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "50px 24px" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 8, color: "#2D1B0E" }}>
          {isUk ? "Напрямки допомоги" : "Areas of Help"}
        </h2>
        <p style={{ textAlign: "center", color: "#8b7355", marginBottom: 32 }}>
          {isUk ? "Кожна ситуація унікальна — ми підходимо індивідуально" : "Every situation is unique — we approach each case individually"}
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 20 }}>
          {services.map(s => (
            <div key={s.id} onClick={() => setActiveService(s.id === activeService ? null : s.id)}
              style={{ background: "#fff", borderRadius: 16, padding: 24, cursor: "pointer", border: `2px solid ${s.id === activeService ? "#C4704A" : "#F0E6D8"}`, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", transition: "all 0.2s" }}>
              <div style={{ marginBottom: 10 }}><EmojiIcon emoji={s.emoji} className="w-14 h-14" /></div>
              <h3 style={{ fontWeight: 800, color: "#2D1B0E", margin: "0 0 4px" }}>{isUk ? s.titleUk : s.titleEn}</h3>
              <div style={{ color: "#C4704A", fontSize: 13, fontWeight: 600, marginBottom: 10 }}>{isUk ? s.subtitleUk : s.subtitleEn}</div>
              {activeService === s.id && (
                <p style={{ color: "#6b5e50", fontSize: 14, lineHeight: 1.6, margin: "0 0 12px" }}>{isUk ? s.descUk : s.descEn}</p>
              )}
              <div style={{ color: "#C4704A", fontSize: 13, fontWeight: 700 }}>
                {activeService === s.id ? (isUk ? "↑ Згорнути" : "↑ Collapse") : (isUk ? "Дізнатись більше →" : "Learn more →")}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Process */}
      <div style={{ background: "#fff", padding: "50px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, textAlign: "center", marginBottom: 32, color: "#2D1B0E" }}>
            {isUk ? "Як ми працюємо" : "How We Work"}
          </h2>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 28 }}>
            {processSteps.map((s, i) => (
              <button key={i} onClick={() => setActiveProcess(i)} style={{
                padding: "8px 16px", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14,
                background: activeProcess === i ? "#C4704A" : "#F0E6D8",
                color: activeProcess === i ? "#fff" : "#6b5e50",
              }}>
                {i + 1}. {isUk ? s.stepUk : s.stepEn}
              </button>
            ))}
          </div>
          <div style={{ background: "#FDF6EC", borderRadius: 16, padding: 28, borderLeft: "4px solid #C4704A" }}>
            <h3 style={{ fontWeight: 800, color: "#2D1B0E", marginBottom: 10 }}>
              {activeProcess + 1}. {isUk ? processSteps[activeProcess].stepUk : processSteps[activeProcess].stepEn}
            </h3>
            <p style={{ color: "#6b5e50", fontSize: 16, lineHeight: 1.7, margin: 0 }}>
              {isUk ? processSteps[activeProcess].descUk : processSteps[activeProcess].descEn}
            </p>
          </div>
        </div>
      </div>

      {/* Property rights calculator */}
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "50px 24px" }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, textAlign: "center", marginBottom: 8, color: "#2D1B0E" }}>
          📊 {isUk ? "Калькулятор ваших прав" : "Your Rights Calculator"}
        </h2>
        <p style={{ textAlign: "center", color: "#8b7355", marginBottom: 24 }}>
          {isUk ? "Дізнайтесь орієнтовно ваші права при розлученні" : "Get a general idea of your rights in a divorce"}
        </p>
        <div style={{ background: "#fff", borderRadius: 20, padding: 32, boxShadow: "0 4px 16px rgba(0,0,0,0.07)" }}>
          {!showCalcResult ? (
            <>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontWeight: 700, marginBottom: 8, color: "#2D1B0E" }}>
                  {isUk ? `Тривалість шлюбу: ${calcData.marriageYears} років` : `Marriage duration: ${calcData.marriageYears} years`}
                </label>
                <input type="range" min={1} max={30} value={calcData.marriageYears}
                  onChange={e => setCalcData(d => ({ ...d, marriageYears: +e.target.value }))}
                  style={{ width: "100%", accentColor: "#C4704A" }} />
              </div>
              <div style={{ display: "flex", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
                {[
                  { key: "hasChildren", labelUk: "Є спільні діти", labelEn: "Have children together" },
                  { key: "hasProperty", labelUk: "Є спільна нерухомість", labelEn: "Have joint property" },
                ].map(f => (
                  <label key={f.key} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontWeight: 600 }}>
                    <input type="checkbox" checked={calcData[f.key as keyof typeof calcData] as boolean}
                      onChange={e => setCalcData(d => ({ ...d, [f.key]: e.target.checked }))}
                      style={{ accentColor: "#C4704A", width: 16, height: 16 }} />
                    {isUk ? f.labelUk : f.labelEn}
                  </label>
                ))}
              </div>
              <button onClick={() => setShowCalcResult(true)}
                style={{ width: "100%", padding: "12px", background: "#C4704A", color: "#fff", border: "none", borderRadius: 12, fontWeight: 800, fontSize: 16, cursor: "pointer" }}>
                {isUk ? "Розрахувати мої права" : "Calculate My Rights"}
              </button>
            </>
          ) : (
            <div>
              <h3 style={{ color: "#C4704A", fontWeight: 800, marginBottom: 16 }}>
                {isUk ? "Орієнтовні права при розлученні:" : "Approximate rights in divorce:"}
              </h3>
              <div style={{ display: "grid", gap: 12, marginBottom: 20 }}>
                <div style={{ background: "#D1E8D5", padding: "12px 16px", borderRadius: 12 }}>
                  ✅ {isUk ? `Право на 50% спільно нажитого майна` : `Right to 50% of jointly acquired property`}
                </div>
                {calcData.hasChildren && (
                  <div style={{ background: "#D1E8D5", padding: "12px 16px", borderRadius: 12 }}>
                    ✅ {isUk ? "Право на аліменти для дітей (25% доходу / 1 дитина, 33% / 2+ дітей)" : "Right to child alimony (25% income / 1 child, 33% / 2+ children)"}
                  </div>
                )}
                {calcData.hasProperty && (
                  <div style={{ background: "#FEF9EE", border: "1px solid #F0E6D8", padding: "12px 16px", borderRadius: 12 }}>
                    ⚠️ {isUk ? `Поділ нерухомості — складний процес після ${calcData.marriageYears} р. шлюбу. Рекомендуємо консультацію.` : `Property division — complex process after ${calcData.marriageYears} years of marriage. Consultation recommended.`}
                  </div>
                )}
              </div>
              <p style={{ color: "#8b7355", fontSize: 13, marginBottom: 16 }}>
                {isUk ? "* Це орієнтовна інформація. Реальні права залежать від конкретних обставин справи." : "* This is general information. Actual rights depend on the specific circumstances of your case."}
              </p>
              <button onClick={() => setShowCalcResult(false)}
                style={{ width: "100%", padding: "12px", background: "#C4704A", color: "#fff", border: "none", borderRadius: 12, fontWeight: 800, cursor: "pointer" }}>
                {isUk ? "Отримати безкоштовну консультацію" : "Get Free Consultation"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Anonymous consult */}
      <div style={{ background: "#2D1B0E", padding: "50px 24px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, textAlign: "center", marginBottom: 6, color: "#fff" }}>
            🔒 {isUk ? "Анонімна консультація" : "Anonymous Consultation"}
          </h2>
          <p style={{ textAlign: "center", color: "#C4704A", fontWeight: 700, marginBottom: 24 }}>
            {isUk ? "Опишіть ситуацію — без імені, без зобов'язань" : "Describe your situation — no name, no obligations"}
          </p>
          {consultSubmitted ? (
            <div style={{ textAlign: "center", color: "#fff", padding: "20px 0" }}>
              <div style={{ fontSize: 50 }}>✅</div>
              <h3 style={{ color: "#C4704A", marginTop: 12 }}>{isUk ? "Отримали вашу заявку" : "Your request received"}</h3>
              <p style={{ color: "#d4b896" }}>{isUk ? "Відповімо конфіденційно протягом 2 годин." : "We'll respond confidentially within 2 hours."}</p>
            </div>
          ) : (
            <div style={{ display: "grid", gap: 14 }}>
              <textarea placeholder={isUk ? "Опишіть вашу ситуацію (без особистих даних)..." : "Describe your situation (without personal details)..."} rows={4}
                value={consultForm.situation} onChange={e => setConsultForm(d => ({ ...d, situation: e.target.value }))}
                style={{ padding: "12px", borderRadius: 12, border: "1px solid rgba(196,112,74,0.4)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 14, resize: "none", outline: "none" }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { key: "email", label: "Email", type: "email" },
                  { key: "phone", label: isUk ? "Телефон" : "Phone", type: "tel" },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ display: "block", color: "#d4b896", fontSize: 13, marginBottom: 4 }}>{f.label}</label>
                    <input type={f.type} value={consultForm[f.key as keyof typeof consultForm]}
                      onChange={e => setConsultForm(d => ({ ...d, [f.key]: e.target.value }))}
                      style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(196,112,74,0.4)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 14, boxSizing: "border-box", outline: "none" }} />
                  </div>
                ))}
              </div>
              <button onClick={() => setConsultSubmitted(true)}
                style={{ padding: "14px", background: "#C4704A", color: "#fff", border: "none", borderRadius: 12, fontWeight: 800, fontSize: 16, cursor: "pointer" }}>
                {isUk ? "Надіслати анонімно" : "Send Anonymously"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: "#FDF6EC", padding: "24px", textAlign: "center", color: "#8b7355", fontSize: 13 }}>
        ⚖️ FamilyGuard · {isUk ? "вул. Рішельєвська 15, Одеса · +38 048 000 0000 · familyguard.ua" : "15 Richelievska St, Odesa · +38 048 000 0000 · familyguard.ua"}
      </div>
    </div>
  );
}
