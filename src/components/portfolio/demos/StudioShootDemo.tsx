"use client";
import { useState } from "react";

export function StudioShootDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [activeSection, setActiveSection] = useState<"hero" | "portfolio" | "services" | "brief" | "process" | "stats">("hero");
  const [activePortfolioTab, setActivePortfolioTab] = useState(0);
  const [briefProjectType, setBriefProjectType] = useState("");
  const [briefBrand, setBriefBrand] = useState("");
  const [briefProduct, setBriefProduct] = useState("");
  const [briefImages, setBriefImages] = useState(30);
  const [briefUsage, setBriefUsage] = useState("");
  const [briefBudget, setBriefBudget] = useState("");
  const [briefDeadline, setBriefDeadline] = useState("");
  const [briefRequirements, setBriefRequirements] = useState("");
  const [briefDone, setBriefDone] = useState(false);

  const portfolioTabs = isUk
    ? ["Усі", "Косметика", "Мода", "Їжа", "Техніка", "Ювелірка", "FMCG"]
    : ["All", "Cosmetics", "Fashion", "Food", "Tech", "Jewelry", "FMCG"];

  const portfolioItems = [
    { label: isUk ? "Serum Luxe — Косметика" : "Serum Luxe — Cosmetics", dark: true },
    { label: isUk ? "Collection SS26 — Мода" : "Collection SS26 — Fashion", dark: false },
    { label: isUk ? "Artisan Bakery — Їжа" : "Artisan Bakery — Food", dark: true },
    { label: isUk ? "Apex Pro — Техніка" : "Apex Pro — Tech", dark: false },
    { label: isUk ? "Aurum Ring — Ювелірка" : "Aurum Ring — Jewelry", dark: true },
    { label: isUk ? "ProClean — FMCG" : "ProClean — FMCG", dark: false },
  ];

  const services = [
    {
      title: isUk ? "Предметна зйомка" : "Product Shoot",
      from: isUk ? "від 4 500 UAH" : "from 4,500 UAH",
      includes: isUk
        ? ["Студійне освітлення", "До 20 SKU", "100+ фінальних кадрів", "Базова ретуш", "Передача файлів"]
        : ["Studio lighting", "Up to 20 SKUs", "100+ final shots", "Basic retouching", "File delivery"],
    },
    {
      title: isUk ? "Модна / lookbook-зйомка" : "Fashion / Lookbook",
      from: isUk ? "від 8 000 UAH" : "from 8,000 UAH",
      includes: isUk
        ? ["Модель + кастинг", "Стиліст і мейкап", "Студія або локація", "50+ оброблених фото", "Мережевий формат"]
        : ["Model + casting", "Stylist & makeup", "Studio or location", "50+ edited photos", "Social media formats"],
    },
    {
      title: isUk ? "Фуд-фотографія" : "Food Photography",
      from: isUk ? "від 5 500 UAH" : "from 5,500 UAH",
      includes: isUk
        ? ["Фуд-стиліст", "Реквізит і посуд", "До 25 страв", "Повна ретуш", "RAW-файли"]
        : ["Food stylist", "Props & tableware", "Up to 25 dishes", "Full retouching", "RAW files"],
    },
    {
      title: isUk ? "Lifestyle-зйомка" : "Lifestyle Photography",
      from: isUk ? "від 6 500 UAH" : "from 6,500 UAH",
      includes: isUk
        ? ["Актори / моделі", "Локація на вибір", "60+ фінальних фото", "Відеофрагменти", "Повна ретуш"]
        : ["Actors / models", "Location of choice", "60+ final photos", "Video clips", "Full retouching"],
    },
    {
      title: isUk ? "Корпоративний контент" : "Corporate Content",
      from: isUk ? "від 7 000 UAH" : "from 7,000 UAH",
      includes: isUk
        ? ["Офіс або студія", "Команда / продукт", "80+ оброблених фото", "Відеоролик 1-2 хв", "Логотип на запит"]
        : ["Office or studio", "Team / product", "80+ edited photos", "1-2 min video", "Logo overlay on request"],
    },
    {
      title: isUk ? "Відеодоповнення" : "Video Add-on",
      from: isUk ? "від 3 500 UAH" : "from 3,500 UAH",
      includes: isUk
        ? ["Відеозйомка в день фото", "Монтаж 30-60 сек", "Формат Reels / TikTok", "2 правки включено"]
        : ["Videoshoot on photo day", "30-60 sec edit", "Reels / TikTok format", "2 revisions included"],
    },
  ];

  const processSteps = [
    {
      num: "01",
      title: isUk ? "Бриф" : "Brief",
      text: isUk
        ? "Ви заповнюєте творчий бриф. Ми аналізуємо завдання та надсилаємо пропозицію протягом 24 годин."
        : "You fill in a creative brief. We analyse the task and send a proposal within 24 hours.",
    },
    {
      num: "02",
      title: isUk ? "Передпродакшн" : "Pre-production",
      text: isUk
        ? "Обговорення концепції, мудборд, підбір реквізиту та команди. Узгодження деталей до запуску."
        : "Concept discussion, moodboard, props and team selection. All details confirmed before shoot.",
    },
    {
      num: "03",
      title: isUk ? "День зйомки" : "Shoot Day",
      text: isUk
        ? "Наша команда приходить підготовленою. Ефективна зйомка в 1-2 студіях, без простоїв."
        : "Our team arrives fully prepared. Efficient shoot in 1-2 studios, no delays.",
    },
    {
      num: "04",
      title: isUk ? "Постпродакшн" : "Post-production",
      text: isUk
        ? "Відбір, ретуш і кольорокорекція за стандартами вашого бренду. Двоетапне затвердження."
        : "Selection, retouching and colour grading to your brand standards. Two-stage approval.",
    },
    {
      num: "05",
      title: isUk ? "Здача матеріалів" : "Delivery",
      text: isUk
        ? "Передача файлів у всіх потрібних форматах через захищений хмарний доступ. Архів 12 місяців."
        : "Files delivered in all required formats via secure cloud access. 12-month archive.",
    },
  ];

  const projectTypes = isUk
    ? ["Предметна фотографія", "Мода / lookbook", "Фуд-стайлінг", "Lifestyle", "Корпоративний контент", "Відео"]
    : ["Product photography", "Fashion / lookbook", "Food styling", "Lifestyle", "Corporate content", "Video"];

  const usages = isUk
    ? ["E-commerce", "Соцмережі", "Друк", "Реклама", "Все вищезазначене"]
    : ["E-commerce", "Social media", "Print", "Advertising", "All of the above"];

  const budgets = isUk
    ? ["До 5 000 UAH", "5 000–15 000 UAH", "15 000–50 000 UAH", "50 000+ UAH"]
    : ["Under 5,000 UAH", "5,000–15,000 UAH", "15,000–50,000 UAH", "50,000+ UAH"];

  const deadlines = isUk
    ? ["Терміново (< 1 тижня)", "Стандарт (2–4 тижні)", "Без поспіху (1+ місяць)"]
    : ["Urgent (< 1 week)", "Standard (2–4 weeks)", "Relaxed (1+ month)"];

  const clientLogos = ["BRAND", "LUXE", "NOVA", "CRAFT", "PRIME", "ECHO", "SYNC", "BOLT"];

  const nav = [
    { id: "hero", label: isUk ? "Головна" : "Home" },
    { id: "portfolio", label: isUk ? "Портфоліо" : "Portfolio" },
    { id: "services", label: isUk ? "Послуги" : "Services" },
    { id: "brief", label: isUk ? "Надіслати бриф" : "Send Brief" },
    { id: "process", label: isUk ? "Процес" : "Process" },
    { id: "stats", label: isUk ? "Результати" : "Results" },
  ] as const;

  return (
    <div style={{ background: "#FFFFFF", color: "#27272A", fontFamily: "'Inter', 'Helvetica Neue', sans-serif", minHeight: "100vh" }}>
      {/* NAV */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #E4E4E7", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.03em", color: "#18181B" }}>STUDIO<span style={{ fontWeight: 300 }}>SHOOT</span></span>
          <div style={{ display: "flex", gap: 24 }}>
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => setActiveSection(n.id)}
                style={{
                  background: "none",
                  border: "none",
                  color: activeSection === n.id ? "#18181B" : "#A1A1AA",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: activeSection === n.id ? 600 : 400,
                  borderBottom: activeSection === n.id ? "2px solid #27272A" : "2px solid transparent",
                  padding: "4px 0",
                }}
              >
                {n.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

        {/* HERO */}
        {activeSection === "hero" && (
          <section style={{ paddingTop: 80, paddingBottom: 80 }}>
            <div style={{ background: "#F4F4F5", padding: "80px 64px", marginBottom: 48 }}>
              <p style={{ fontSize: 12, letterSpacing: "0.2em", color: "#71717A", marginBottom: 20 }}>
                {isUk ? "КОМЕРЦІЙНА ФОТОСТУДІЯ · КИЇВ" : "COMMERCIAL PHOTO STUDIO · KYIV"}
              </p>
              <h1 style={{ fontSize: "clamp(36px, 6vw, 80px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.0, color: "#18181B", marginBottom: 24 }}>
                {isUk ? "Фотографія,\nяка продає." : "Photography\nthat sells."}
              </h1>
              <p style={{ fontSize: 18, color: "#71717A", maxWidth: 480, marginBottom: 40, lineHeight: 1.6 }}>
                {isUk
                  ? "Комерційна зйомка для брендів, e-commerce і маркетингу. 3 студії, повний цикл виробництва."
                  : "Commercial photography for brands, e-commerce and marketing. 3 studios, full production cycle."}
              </p>
              <div style={{ display: "flex", gap: 12 }}>
                <button
                  onClick={() => setActiveSection("brief")}
                  style={{ background: "#27272A", color: "#fff", border: "none", padding: "14px 32px", fontSize: 14, fontWeight: 600, letterSpacing: "0.04em", cursor: "pointer" }}
                >
                  {isUk ? "НАДІСЛАТИ БРИФ" : "SEND A BRIEF"}
                </button>
                <button
                  onClick={() => setActiveSection("portfolio")}
                  style={{ background: "transparent", color: "#27272A", border: "1px solid #D4D4D8", padding: "14px 32px", fontSize: 14, letterSpacing: "0.04em", cursor: "pointer" }}
                >
                  {isUk ? "ПЕРЕГЛЯНУТИ РОБОТИ" : "VIEW WORK"}
                </button>
              </div>
            </div>

            {/* Client logo strip */}
            <div style={{ borderTop: "1px solid #E4E4E7", borderBottom: "1px solid #E4E4E7", padding: "20px 0" }}>
              <p style={{ fontSize: 11, color: "#A1A1AA", letterSpacing: "0.15em", marginBottom: 16, textAlign: "center" }}>
                {isUk ? "СЕРЕД НАШИХ КЛІЄНТІВ" : "TRUSTED BY BRANDS"}
              </p>
              <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                {clientLogos.map((logo) => (
                  <span key={logo} style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.15em", color: "#D4D4D8" }}>{logo}</span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* PORTFOLIO */}
        {activeSection === "portfolio" && (
          <section style={{ paddingTop: 64, paddingBottom: 64 }}>
            <h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 40 }}>
              {isUk ? "Портфоліо" : "Portfolio"}
            </h2>
            <div style={{ display: "flex", gap: 8, marginBottom: 40, flexWrap: "wrap" }}>
              {portfolioTabs.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActivePortfolioTab(i)}
                  style={{
                    background: activePortfolioTab === i ? "#27272A" : "transparent",
                    color: activePortfolioTab === i ? "#fff" : "#71717A",
                    border: `1px solid ${activePortfolioTab === i ? "#27272A" : "#E4E4E7"}`,
                    padding: "8px 20px",
                    fontSize: 13,
                    cursor: "pointer",
                    fontWeight: activePortfolioTab === i ? 600 : 400,
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
              {portfolioItems.map((item, i) => {
                const heights = [300, 220, 260, 280, 240, 200];
                return (
                  <div
                    key={i}
                    style={{
                      background: item.dark ? "#18181B" : "#F4F4F5",
                      height: heights[i],
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      padding: 20,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {item.dark && (
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.7))" }} />
                    )}
                    <div style={{ position: "relative" }}>
                      <div style={{ fontSize: 10, letterSpacing: "0.15em", color: item.dark ? "#71717A" : "#A1A1AA", marginBottom: 4 }}>
                        {portfolioTabs[activePortfolioTab === 0 ? (i % (portfolioTabs.length - 1)) + 1 : activePortfolioTab]}
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: item.dark ? "#fff" : "#27272A" }}>{item.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* SERVICES */}
        {activeSection === "services" && (
          <section style={{ paddingTop: 64, paddingBottom: 64 }}>
            <h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 12 }}>
              {isUk ? "Послуги" : "Services"}
            </h2>
            <p style={{ color: "#71717A", marginBottom: 48 }}>
              {isUk ? "Повний цикл комерційної зйомки" : "Full commercial photography cycle"}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "#E4E4E7" }}>
              {services.map((svc) => (
                <div key={svc.title} style={{ background: "#fff", padding: 28 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8, color: "#18181B" }}>{svc.title}</h3>
                  <div style={{ fontSize: 14, color: "#71717A", marginBottom: 20 }}>{svc.from}</div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {svc.includes.map((item) => (
                      <li key={item} style={{ display: "flex", gap: 8, marginBottom: 8, color: "#52525B", fontSize: 13, alignItems: "flex-start" }}>
                        <span style={{ color: "#27272A", flexShrink: 0, marginTop: 2, fontWeight: 700 }}>+</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setActiveSection("brief")}
                    style={{ marginTop: 20, background: "transparent", color: "#27272A", border: "1px solid #E4E4E7", padding: "8px 20px", fontSize: 12, cursor: "pointer", letterSpacing: "0.06em", fontWeight: 600 }}
                  >
                    {isUk ? "ОБРАТИ" : "SELECT"}
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* BRIEF */}
        {activeSection === "brief" && (
          <section style={{ paddingTop: 64, paddingBottom: 64, maxWidth: 720 }}>
            <h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 8 }}>
              {isUk ? "Творчий бриф" : "Creative Brief"}
            </h2>
            <p style={{ color: "#71717A", marginBottom: 48, fontSize: 15 }}>
              {isUk ? "Детальніший бриф — точніша пропозиція" : "A more detailed brief means a more precise proposal"}
            </p>

            {briefDone ? (
              <div style={{ background: "#F4F4F5", padding: 48, textAlign: "center" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
                <h3 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 8 }}>
                  {isUk ? "Бриф отримано" : "Brief Received"}
                </h3>
                <p style={{ color: "#71717A", marginBottom: 32 }}>
                  {isUk ? "Надішлемо комерційну пропозицію протягом 24 годин" : "We will send a commercial proposal within 24 hours"}
                </p>
                <button
                  onClick={() => { setBriefDone(false); setBriefProjectType(""); setBriefBrand(""); setBriefProduct(""); setBriefImages(30); setBriefUsage(""); setBriefBudget(""); setBriefDeadline(""); setBriefRequirements(""); }}
                  style={{ background: "#27272A", color: "#fff", border: "none", padding: "12px 28px", fontSize: 14, cursor: "pointer", fontWeight: 600 }}
                >
                  {isUk ? "Новий бриф" : "New Brief"}
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                {/* Project type */}
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#27272A", letterSpacing: "0.05em", display: "block", marginBottom: 10 }}>
                    {isUk ? "ТИП ПРОЕКТУ" : "PROJECT TYPE"}
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
                    {projectTypes.map((t) => (
                      <button
                        key={t}
                        onClick={() => setBriefProjectType(t)}
                        style={{
                          padding: "12px 16px",
                          background: briefProjectType === t ? "#27272A" : "#F4F4F5",
                          color: briefProjectType === t ? "#fff" : "#52525B",
                          border: `1px solid ${briefProjectType === t ? "#27272A" : "#E4E4E7"}`,
                          fontSize: 14,
                          cursor: "pointer",
                          textAlign: "left",
                          fontWeight: briefProjectType === t ? 600 : 400,
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brand + Product */}
                {[
                  { label: isUk ? "БРЕНД / КОМПАНІЯ" : "BRAND / COMPANY", val: briefBrand, set: setBriefBrand, placeholder: isUk ? "Назва бренду..." : "Brand name..." },
                  { label: isUk ? "ПРОДУКТ / КАТЕГОРІЯ" : "PRODUCT / CATEGORY", val: briefProduct, set: setBriefProduct, placeholder: isUk ? "Наприклад: крем для обличчя..." : "e.g. face cream..." },
                ].map((f) => (
                  <div key={f.label}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#27272A", letterSpacing: "0.05em", display: "block", marginBottom: 8 }}>{f.label}</label>
                    <input
                      type="text"
                      value={f.val}
                      onChange={(e) => f.set(e.target.value)}
                      placeholder={f.placeholder}
                      style={{ width: "100%", background: "#F4F4F5", border: "1px solid #E4E4E7", color: "#27272A", padding: "12px 16px", fontSize: 15, outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                ))}

                {/* Images slider */}
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#27272A", letterSpacing: "0.05em", display: "block", marginBottom: 8 }}>
                    {isUk ? `КІЛЬКІСТЬ ФІНАЛЬНИХ ФОТО: ${briefImages}` : `NUMBER OF FINAL IMAGES: ${briefImages}`}
                  </label>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    step={5}
                    value={briefImages}
                    onChange={(e) => setBriefImages(Number(e.target.value))}
                    style={{ width: "100%", accentColor: "#27272A" }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#A1A1AA", marginTop: 4 }}>
                    <span>10</span><span>100</span>
                  </div>
                </div>

                {/* Usage */}
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#27272A", letterSpacing: "0.05em", display: "block", marginBottom: 10 }}>
                    {isUk ? "ОСНОВНЕ ВИКОРИСТАННЯ" : "PRIMARY USAGE"}
                  </label>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {usages.map((u) => (
                      <button
                        key={u}
                        onClick={() => setBriefUsage(u)}
                        style={{
                          padding: "8px 16px",
                          background: briefUsage === u ? "#27272A" : "transparent",
                          color: briefUsage === u ? "#fff" : "#71717A",
                          border: `1px solid ${briefUsage === u ? "#27272A" : "#E4E4E7"}`,
                          fontSize: 13,
                          cursor: "pointer",
                        }}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#27272A", letterSpacing: "0.05em", display: "block", marginBottom: 10 }}>
                    {isUk ? "БЮДЖЕТ" : "BUDGET RANGE"}
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
                    {budgets.map((b) => (
                      <button
                        key={b}
                        onClick={() => setBriefBudget(b)}
                        style={{
                          padding: "12px 16px",
                          background: briefBudget === b ? "#27272A" : "#F4F4F5",
                          color: briefBudget === b ? "#fff" : "#52525B",
                          border: `1px solid ${briefBudget === b ? "#27272A" : "#E4E4E7"}`,
                          fontSize: 13,
                          cursor: "pointer",
                          textAlign: "left",
                          fontWeight: briefBudget === b ? 600 : 400,
                        }}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Deadline */}
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#27272A", letterSpacing: "0.05em", display: "block", marginBottom: 10 }}>
                    {isUk ? "ДЕДЛАЙН" : "DEADLINE"}
                  </label>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {deadlines.map((d) => (
                      <button
                        key={d}
                        onClick={() => setBriefDeadline(d)}
                        style={{
                          padding: "10px 18px",
                          background: briefDeadline === d ? "#27272A" : "transparent",
                          color: briefDeadline === d ? "#fff" : "#71717A",
                          border: `1px solid ${briefDeadline === d ? "#27272A" : "#E4E4E7"}`,
                          fontSize: 13,
                          cursor: "pointer",
                        }}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#27272A", letterSpacing: "0.05em", display: "block", marginBottom: 8 }}>
                    {isUk ? "ОСОБЛИВІ ВИМОГИ" : "SPECIAL REQUIREMENTS"}
                  </label>
                  <textarea
                    value={briefRequirements}
                    onChange={(e) => setBriefRequirements(e.target.value)}
                    rows={4}
                    placeholder={isUk ? "Референси, стиль, фон, модель, терміни постпродакшн..." : "References, style, background, model, post-production timeline..."}
                    style={{ width: "100%", background: "#F4F4F5", border: "1px solid #E4E4E7", color: "#27272A", padding: "12px 16px", fontSize: 15, outline: "none", resize: "vertical", boxSizing: "border-box" }}
                  />
                </div>

                <button
                  onClick={() => setBriefDone(true)}
                  style={{ background: "#27272A", color: "#fff", border: "none", padding: "16px", fontSize: 15, fontWeight: 700, cursor: "pointer", letterSpacing: "0.06em", marginTop: 8 }}
                >
                  {isUk ? "НАДІСЛАТИ БРИФ" : "SEND BRIEF"}
                </button>
              </div>
            )}
          </section>
        )}

        {/* PROCESS */}
        {activeSection === "process" && (
          <section style={{ paddingTop: 64, paddingBottom: 64 }}>
            <h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 12 }}>
              {isUk ? "Як ми працюємо" : "How We Work"}
            </h2>
            <p style={{ color: "#71717A", marginBottom: 56 }}>
              {isUk ? "Від брифу до готових файлів — прозорий процес" : "From brief to final files — a transparent process"}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 0, background: "#E4E4E7" }}>
              {processSteps.map((step, i) => (
                <div key={i} style={{ background: i % 2 === 0 ? "#F4F4F5" : "#fff", padding: "32px 24px" }}>
                  <div style={{ fontSize: 36, fontWeight: 800, color: "#E4E4E7", marginBottom: 16, letterSpacing: "-0.04em" }}>{step.num}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: "#18181B" }}>{step.title}</h3>
                  <p style={{ fontSize: 13, color: "#71717A", lineHeight: 1.7 }}>{step.text}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* STATS */}
        {activeSection === "stats" && (
          <section style={{ paddingTop: 64, paddingBottom: 64 }}>
            <h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 56 }}>
              {isUk ? "Студія в цифрах" : "Studio in Numbers"}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "#E4E4E7", marginBottom: 48 }}>
              {[
                { num: "240+", label: isUk ? "Брендів обслужено" : "Brands served", sub: isUk ? "від стартапів до великих корпорацій" : "from startups to large corporations" },
                { num: "5 000+", label: isUk ? "Фото на рік" : "Images per year", sub: isUk ? "у трьох власних студіях" : "across three in-house studios" },
                { num: "3", label: isUk ? "Студії" : "Studios", sub: isUk ? "предметна, модна, фуд" : "product, fashion, food" },
              ].map((s) => (
                <div key={s.label} style={{ background: "#fff", padding: "48px 36px" }}>
                  <div style={{ fontSize: 56, fontWeight: 800, color: "#18181B", letterSpacing: "-0.04em", marginBottom: 8 }}>{s.num}</div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: "#27272A", marginBottom: 8 }}>{s.label}</div>
                  <div style={{ fontSize: 13, color: "#A1A1AA" }}>{s.sub}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "#27272A", padding: "48px 56px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
              <div>
                <h3 style={{ fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
                  {isUk ? "Готові обговорити проект?" : "Ready to discuss a project?"}
                </h3>
                <p style={{ color: "#A1A1AA", fontSize: 15 }}>
                  {isUk ? "Надішліть бриф — відповімо протягом 24 годин" : "Send a brief — we respond within 24 hours"}
                </p>
              </div>
              <button
                onClick={() => setActiveSection("brief")}
                style={{ background: "#fff", color: "#27272A", border: "none", padding: "16px 36px", fontSize: 14, fontWeight: 700, cursor: "pointer", letterSpacing: "0.06em", flexShrink: 0 }}
              >
                {isUk ? "НАДІСЛАТИ БРИФ" : "SEND A BRIEF"}
              </button>
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
