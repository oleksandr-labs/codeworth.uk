"use client";
import { useState } from "react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

export function IPShieldDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";
  const [activeService, setActiveService] = useState(0);
  const [ipScoreStep, setIpScoreStep] = useState(1);
  const [ipScoreData, setIpScoreData] = useState({ type: "", registered: false, website: false, social: false, contracts: false });
  const [ipScore, setIpScore] = useState<number | null>(null);
  const [dmcaStep, setDmcaStep] = useState(0);
  const [startForm, setStartForm] = useState({ service: "", name: "", email: "", phone: "", details: "" });
  const [startSubmitted, setStartSubmitted] = useState(false);

  const services = [
    {
      emoji: "™️", color: "#A78BFA",
      titleUk: "Реєстрація торгової марки", titleEn: "Trademark Registration",
      tagUk: "від ₴8,900", tagEn: "from ₴8,900",
      descUk: "Реєстрація TM в Україні та за кордоном (EU, US, UK). Перевірка на схожість до подачі. Моніторинг порушень після реєстрації.",
      descEn: "TM registration in Ukraine and abroad (EU, US, UK). Similarity check before filing. Infringement monitoring after registration.",
      steps: isUk
        ? ["Перевірка на схожість", "Підготовка заявки", "Подача в УКРПАТЕНТ", "Отримання свідоцтва"]
        : ["Similarity check", "Application prep", "Filing with IP office", "Receiving certificate"],
    },
    {
      emoji: "©️", color: "#3B82F6",
      titleUk: "Захист авторських прав", titleEn: "Copyright Protection",
      tagUk: "від ₴3,500", tagEn: "from ₴3,500",
      descUk: "Оформлення авторських прав на контент, ПЗ, музику, фото. DMCA takedown для пірат ського контенту. Судовий захист.",
      descEn: "Copyright registration for content, software, music, photos. DMCA takedown for pirated content. Legal defense.",
      steps: isUk
        ? ["Аналіз контенту", "Депонування", "Моніторинг копіювань", "DMCA/судовий захист"]
        : ["Content analysis", "Deposition", "Copy monitoring", "DMCA/court defense"],
    },
    {
      emoji: "🔐", color: "#22D3EE",
      titleUk: "DMCA Takedown", titleEn: "DMCA Takedown",
      tagUk: "від ₴1,500", tagEn: "from ₴1,500",
      descUk: "Швидке видалення пірат ського контенту з Google, YouTube, Instagram, Cloudflare. 98% успішних кейсів за 48 годин.",
      descEn: "Fast removal of pirated content from Google, YouTube, Instagram, Cloudflare. 98% success rate within 48 hours.",
      steps: isUk
        ? ["Виявлення порушення", "Підготовка заяви", "Подача в платформу", "Підтвердження зняття"]
        : ["Detect infringement", "Prepare notice", "Submit to platform", "Confirm removal"],
    },
    {
      emoji: "🤖", color: "#34D399",
      titleUk: "IP в сфері AI", titleEn: "AI Intellectual Property",
      tagUk: "Новинка 2025", tagEn: "New 2025",
      descUk: "Захист прав на AI-моделі, датасети, генеративний контент. Регулювання використання AI у вашому бізнесі.",
      descEn: "Protection of rights to AI models, datasets, generative content. Regulation of AI use in your business.",
      steps: isUk
        ? ["AI-аудит активів", "Стратегія захисту", "Ліцензування", "Моніторинг"]
        : ["AI asset audit", "Protection strategy", "Licensing", "Monitoring"],
    },
    {
      emoji: "📜", color: "#FB923C",
      titleUk: "Ліцензійні договори", titleEn: "License Agreements",
      tagUk: "від ₴4,500", tagEn: "from ₴4,500",
      descUk: "Розробка ліцензійних угод для ПЗ, контенту, брендів. Роялті, exclusive/non-exclusive права, міжнародні ліцензії.",
      descEn: "Drafting license agreements for software, content, brands. Royalties, exclusive/non-exclusive rights, international licenses.",
      steps: isUk
        ? ["Аналіз потреб", "Розробка договору", "Переговори", "Підписання"]
        : ["Needs analysis", "Contract drafting", "Negotiation", "Signing"],
    },
    {
      emoji: "🌐", color: "#F472B6",
      titleUk: "Захист доменів та бренду онлайн", titleEn: "Domain & Online Brand Protection",
      tagUk: "від ₴2,500", tagEn: "from ₴2,500",
      descUk: "Відновлення доменів-сквотерів (UDRP), захист від фішингу, моніторинг підробок у соцмережах.",
      descEn: "Recovering squatted domains (UDRP), phishing protection, counterfeit monitoring on social media.",
      steps: isUk
        ? ["Виявлення загроз", "UDRP / судова заява", "Відновлення домену", "Ongoing моніторинг"]
        : ["Threat detection", "UDRP / legal filing", "Domain recovery", "Ongoing monitoring"],
    },
  ];

  const dmcaSteps = [
    { iconUk: "🔍 Виявлення", iconEn: "🔍 Detection", descUk: "Ви знаходите піратський контент або ми виявляємо його через моніторинг", descEn: "You find pirated content or we detect it through monitoring" },
    { iconUk: "📋 Аналіз", iconEn: "📋 Analysis", descUk: "Перевіряємо порушення, збираємо докази, готуємо юридично бездоганну DMCA-заяву", descEn: "We verify the infringement, collect evidence, prepare a legally sound DMCA notice" },
    { iconUk: "📤 Подача", iconEn: "📤 Filing", descUk: "Надсилаємо заяву до платформи (Google, YouTube, Instagram, Cloudflare)", descEn: "We send the notice to the platform (Google, YouTube, Instagram, Cloudflare)" },
    { iconUk: "✅ Результат", iconEn: "✅ Result", descUk: "Контент видалено. Середній час — 48 год. Успішність 98%.", descEn: "Content removed. Average time — 48 hours. 98% success rate." },
  ];

  const calcIpScore = () => {
    let score = 0;
    if (ipScoreData.type) score += 25;
    if (ipScoreData.registered) score += 30;
    if (ipScoreData.website) score += 15;
    if (ipScoreData.social) score += 15;
    if (ipScoreData.contracts) score += 15;
    setIpScore(score);
  };

  const scoreColor = ipScore !== null ? (ipScore >= 70 ? "#34D399" : ipScore >= 40 ? "#FB923C" : "#F87171") : "#6b7280";
  const scoreLabel = ipScore !== null
    ? (isUk
        ? (ipScore >= 70 ? "Добре захищено" : ipScore >= 40 ? "Частково захищено" : "Потребує захисту")
        : (ipScore >= 70 ? "Well protected" : ipScore >= 40 ? "Partially protected" : "Needs protection"))
    : "";

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#0F0F0F", minHeight: "100vh", color: "#fff" }}>
      {/* Nav */}
      <nav style={{ background: "rgba(15,15,15,0.95)", borderBottom: "1px solid rgba(167,139,250,0.3)", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60, position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ fontWeight: 900, fontSize: 20 }}>
          <span style={{ background: "linear-gradient(90deg,#A78BFA,#3B82F6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>IP</span>
          <span style={{ color: "#fff" }}>Shield</span>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {[isUk ? "Послуги" : "Services", "DMCA", "IP Score"].map(l => (
            <span key={l} style={{ color: "#94a3b8", fontSize: 14, cursor: "pointer", fontWeight: 600 }}>{l}</span>
          ))}
          <button style={{ background: "linear-gradient(135deg,#A78BFA,#3B82F6)", color: "#fff", border: "none", borderRadius: 10, padding: "8px 18px", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
            {isUk ? "Почати захист" : "Start Protection"}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ padding: "80px 24px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 30% 50%, rgba(167,139,250,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(59,130,246,0.1) 0%, transparent 50%)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 28, flexWrap: "wrap" }}>
            {[
              isUk ? "2 400+ ТМ зареєстровано" : "2,400+ TMs registered",
              isUk ? "98% DMCA за 48 год" : "98% DMCA in 48h",
              isUk ? "Digital-first з 2018" : "Digital-first since 2018",
            ].map(b => (
              <span key={b} style={{ background: "rgba(167,139,250,0.15)", border: "1px solid rgba(167,139,250,0.3)", borderRadius: 20, padding: "4px 14px", fontSize: 13, color: "#c4b5fd" }}>{b}</span>
            ))}
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 900, margin: "0 0 16px", lineHeight: 1.2 }}>
            {isUk ? "Захистіть своє." : "Protect What's Yours."}<br />
            <span style={{ background: "linear-gradient(90deg,#A78BFA,#3B82F6,#22D3EE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {isUk ? "Цифрово. Швидко. Надійно." : "Digitally. Fast. Reliably."}
            </span>
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 17, maxWidth: 580, margin: "0 auto 36px" }}>
            {isUk
              ? "Реєстрація торгових марок, авторські права, DMCA takedown — все онлайн без зустрічей"
              : "Trademark registration, copyrights, DMCA takedown — everything online without meetings"}
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button style={{ background: "linear-gradient(135deg,#A78BFA,#3B82F6)", color: "#fff", border: "none", borderRadius: 14, padding: "14px 28px", fontWeight: 800, fontSize: 16, cursor: "pointer" }}>
              {isUk ? "🛡️ Почати захист" : "🛡️ Start Protection"}
            </button>
            <button style={{ background: "transparent", color: "#A78BFA", border: "2px solid #A78BFA", borderRadius: 14, padding: "14px 28px", fontWeight: 700, fontSize: 16, cursor: "pointer" }}>
              {isUk ? "Перевірити IP Score" : "Check IP Score"}
            </button>
          </div>
        </div>
      </div>

      {/* Services */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 60px" }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, textAlign: "center", marginBottom: 32 }}>
          {isUk ? "Послуги" : "Services"}
        </h2>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 28 }}>
          {services.map((s, i) => (
            <button key={i} onClick={() => setActiveService(i)} style={{
              padding: "8px 16px", borderRadius: 10, border: `1px solid ${activeService === i ? s.color : "rgba(255,255,255,0.1)"}`,
              background: activeService === i ? s.color + "22" : "transparent",
              color: activeService === i ? s.color : "#94a3b8", fontWeight: 700, cursor: "pointer", fontSize: 13,
            }}>
              <EmojiIcon emoji={s.emoji} className="w-4 h-4 inline-block align-middle mr-1" />{isUk ? s.titleUk : s.titleEn}
            </button>
          ))}
        </div>
        <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 20, padding: 32, border: `1px solid ${services[activeService].color}44` }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 280 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
                <EmojiIcon emoji={services[activeService].emoji} className="w-10 h-10" />
                <div>
                  <h3 style={{ fontWeight: 800, margin: 0, fontSize: 20, color: services[activeService].color }}>{isUk ? services[activeService].titleUk : services[activeService].titleEn}</h3>
                  <span style={{ background: services[activeService].color + "33", color: services[activeService].color, borderRadius: 8, padding: "2px 10px", fontSize: 12, fontWeight: 700 }}>{isUk ? services[activeService].tagUk : services[activeService].tagEn}</span>
                </div>
              </div>
              <p style={{ color: "#cbd5e1", fontSize: 15, lineHeight: 1.7 }}>{isUk ? services[activeService].descUk : services[activeService].descEn}</p>
            </div>
            <div style={{ minWidth: 220 }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: "#94a3b8", marginBottom: 12 }}>{isUk ? "Як відбувається:" : "How it works:"}</div>
              {services[activeService].steps.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                  <div style={{ background: services[activeService].color, borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, flexShrink: 0 }}>{i + 1}</div>
                  <span style={{ fontSize: 14, color: "#cbd5e1" }}>{step}</span>
                </div>
              ))}
              <button style={{ marginTop: 12, padding: "10px 20px", background: services[activeService].color, border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer", color: "#fff", fontSize: 14 }}>
                {isUk ? "Замовити послугу" : "Order Service"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DMCA Process */}
      <div style={{ background: "rgba(255,255,255,0.03)", padding: "50px 24px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, textAlign: "center", marginBottom: 8 }}>
            ⚡ {isUk ? "Як працює DMCA Takedown" : "How DMCA Takedown Works"}
          </h2>
          <p style={{ textAlign: "center", color: "#94a3b8", marginBottom: 32 }}>
            {isUk ? "Від виявлення до видалення — середнє 48 годин" : "From detection to removal — average 48 hours"}
          </p>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 24, flexWrap: "wrap" }}>
            {dmcaSteps.map((s, i) => (
              <button key={i} onClick={() => setDmcaStep(i)} style={{
                padding: "8px 16px", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13,
                background: dmcaStep === i ? "#22D3EE" : "rgba(255,255,255,0.08)",
                color: dmcaStep === i ? "#0F0F0F" : "#94a3b8",
              }}>{isUk ? s.iconUk : s.iconEn}</button>
            ))}
          </div>
          <div style={{ background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.3)", borderRadius: 16, padding: 24, textAlign: "center" }}>
            <p style={{ color: "#cbd5e1", fontSize: 16, lineHeight: 1.7, margin: 0 }}>{isUk ? dmcaSteps[dmcaStep].descUk : dmcaSteps[dmcaStep].descEn}</p>
          </div>
        </div>
      </div>

      {/* IP Score */}
      <div style={{ maxWidth: 650, margin: "0 auto", padding: "50px 24px" }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, textAlign: "center", marginBottom: 8 }}>
          🎯 {isUk ? "Ваш IP Score" : "Your IP Score"}
        </h2>
        <p style={{ textAlign: "center", color: "#94a3b8", marginBottom: 24 }}>
          {isUk ? "Оцінте рівень захисту вашого бренду за 30 секунд" : "Assess your brand protection level in 30 seconds"}
        </p>
        <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(167,139,250,0.3)", borderRadius: 20, padding: 32 }}>
          {ipScore === null ? (
            <div style={{ display: "grid", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontWeight: 600, marginBottom: 8, color: "#94a3b8", fontSize: 13 }}>
                  {isUk ? "Тип вашого бізнесу / контенту:" : "Your business / content type:"}
                </label>
                <select value={ipScoreData.type} onChange={e => setIpScoreData(d => ({ ...d, type: e.target.value }))}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(167,139,250,0.3)", background: "#1a1a2e", color: "#fff", fontSize: 14, outline: "none" }}>
                  <option value="">{isUk ? "— Оберіть —" : "— Select —"}</option>
                  {[isUk ? "SaaS / Програмне забезпечення" : "SaaS / Software", isUk ? "Медіа / Контент-бізнес" : "Media / Content", isUk ? "Бренд / Ритейл" : "Brand / Retail", isUk ? "Дизайн / Творчість" : "Design / Creative"].map(o => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
              {[
                { key: "registered", labelUk: "Торгова марка зареєстрована", labelEn: "Trademark is registered" },
                { key: "website", labelUk: "Є Terms of Use та Copyright notice на сайті", labelEn: "Terms of Use & Copyright notice on website" },
                { key: "social", labelUk: "Бренд верифікований у соцмережах", labelEn: "Brand verified on social media" },
                { key: "contracts", labelUk: "Є ліцензійні договори з підрядниками", labelEn: "License agreements with contractors exist" },
              ].map(f => (
                <label key={f.key} style={{ display: "flex", gap: 10, alignItems: "center", cursor: "pointer" }}>
                  <input type="checkbox" checked={ipScoreData[f.key as keyof typeof ipScoreData] as boolean}
                    onChange={e => setIpScoreData(d => ({ ...d, [f.key]: e.target.checked }))}
                    style={{ accentColor: "#A78BFA", width: 16, height: 16, flexShrink: 0 }} />
                  <span style={{ color: "#cbd5e1", fontSize: 14 }}>{isUk ? f.labelUk : f.labelEn}</span>
                </label>
              ))}
              <button onClick={calcIpScore} style={{ padding: "12px", background: "linear-gradient(135deg,#A78BFA,#3B82F6)", border: "none", borderRadius: 12, fontWeight: 800, cursor: "pointer", color: "#fff", fontSize: 15 }}>
                {isUk ? "Перевірити IP Score" : "Check IP Score"}
              </button>
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 72, fontWeight: 900, color: scoreColor, marginBottom: 8 }}>{ipScore}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: scoreColor, marginBottom: 12 }}>{scoreLabel}</div>
              <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 10, height: 10, marginBottom: 20, overflow: "hidden" }}>
                <div style={{ width: `${ipScore}%`, height: "100%", background: scoreColor, borderRadius: 10, transition: "width 0.8s ease" }} />
              </div>
              <p style={{ color: "#94a3b8", marginBottom: 20 }}>
                {ipScore < 40
                  ? (isUk ? "Ваш бренд та контент під ризиком. Рекомендуємо негайно проконсультуватись." : "Your brand and content are at risk. We recommend immediate consultation.")
                  : ipScore < 70
                  ? (isUk ? "Є прогалини у захисті. Один кейс порушення може коштувати дорого." : "There are gaps in protection. One infringement case can be costly.")
                  : (isUk ? "Хороший рівень захисту. Продовжуйте моніторинг та оновлення." : "Good protection level. Continue monitoring and updates.")}
              </p>
              <button onClick={() => setIpScore(null)} style={{ padding: "10px 24px", background: "#A78BFA", border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer", color: "#fff" }}>
                {isUk ? "Отримати консультацію" : "Get Consultation"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Start form */}
      <div style={{ background: "linear-gradient(135deg,rgba(167,139,250,0.1),rgba(59,130,246,0.1))", borderTop: "1px solid rgba(167,139,250,0.2)", padding: "50px 24px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, textAlign: "center", marginBottom: 24 }}>
            🛡️ {isUk ? "Почати захист сьогодні" : "Start Protection Today"}
          </h2>
          {startSubmitted ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ fontSize: 50 }}>✅</div>
              <h3 style={{ color: "#A78BFA", marginTop: 12 }}>{isUk ? "Заявку прийнято!" : "Application received!"}</h3>
              <p style={{ color: "#94a3b8" }}>{isUk ? "Зв'яжемось протягом 2 годин." : "We'll reach out within 2 hours."}</p>
            </div>
          ) : (
            <div style={{ display: "grid", gap: 14 }}>
              <select value={startForm.service} onChange={e => setStartForm(d => ({ ...d, service: e.target.value }))}
                style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(167,139,250,0.3)", background: "#1a1a2e", color: "#fff", fontSize: 14, outline: "none" }}>
                <option value="">{isUk ? "— Оберіть послугу —" : "— Select service —"}</option>
                {services.map((s, i) => <option key={i} value={isUk ? s.titleUk : s.titleEn}>{s.emoji} {isUk ? s.titleUk : s.titleEn}</option>)}
              </select>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { key: "name", label: isUk ? "Ім'я" : "Name", type: "text" },
                  { key: "email", label: "Email", type: "email" },
                  { key: "phone", label: isUk ? "Телефон" : "Phone", type: "tel" },
                ].map(f => (
                  <div key={f.key} style={{ gridColumn: f.key === "phone" ? "span 2" : undefined }}>
                    <label style={{ display: "block", color: "#94a3b8", fontSize: 13, marginBottom: 4 }}>{f.label}</label>
                    <input type={f.type} value={startForm[f.key as keyof typeof startForm]}
                      onChange={e => setStartForm(d => ({ ...d, [f.key]: e.target.value }))}
                      style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(167,139,250,0.3)", background: "#1a1a2e", color: "#fff", fontSize: 14, boxSizing: "border-box", outline: "none" }} />
                  </div>
                ))}
              </div>
              <button onClick={() => setStartSubmitted(true)}
                style={{ padding: "14px", background: "linear-gradient(135deg,#A78BFA,#3B82F6)", border: "none", borderRadius: 12, fontWeight: 800, fontSize: 15, cursor: "pointer", color: "#fff" }}>
                {isUk ? "Надіслати заявку" : "Submit Application"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: "#0F0F0F", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "20px 24px", textAlign: "center", color: "#475569", fontSize: 13 }}>
        IPShield · {isUk ? "вул. Хрещатик 10, Київ · ipshield.ua · Digital-first з 2018" : "10 Khreshchatyk St, Kyiv · ipshield.ua · Digital-first since 2018"}
      </div>
    </div>
  );
}
