"use client";
import { useState } from "react";

type Project = {
  id: number;
  titleEn: string;
  titleUk: string;
  region: string;
  typeKey: string;
  typeEn: string;
  typeUk: string;
  statusKey: string;
  statusEn: string;
  statusUk: string;
  funded: number;
  needed: number;
  raised: number;
  descEn: string;
  descUk: string;
};

const PROJECTS: Project[] = [
  {
    id: 1,
    titleEn: "Residential block reconstruction",
    titleUk: "Відновлення житлового блоку",
    region: "Kyiv",
    typeKey: "Housing",
    typeEn: "Housing",
    typeUk: "Житло",
    statusKey: "In Progress",
    statusEn: "In Progress",
    statusUk: "В процесі",
    funded: 68,
    needed: 4_200_000,
    raised: 2_856_000,
    descEn: "Restoring 24 apartments in Bucha district damaged by shelling.",
    descUk: "Відновлення 24 квартир у Бучанському районі, пошкоджених обстрілами.",
  },
  {
    id: 2,
    titleEn: "School No. 14 restoration",
    titleUk: "Відновлення школи № 14",
    region: "Kharkiv",
    typeKey: "Schools",
    typeEn: "Schools",
    typeUk: "Школи",
    statusKey: "Fundraising",
    statusEn: "Fundraising",
    statusUk: "Збір коштів",
    funded: 32,
    needed: 3_800_000,
    raised: 1_216_000,
    descEn: "Rebuilding classrooms, roof, and heating system for 680 students.",
    descUk: "Відбудова класів, даху та опалення для 680 учнів.",
  },
  {
    id: 3,
    titleEn: "District hospital emergency wing",
    titleUk: "Приймальний покій районної лікарні",
    region: "Zaporizhzhia",
    typeKey: "Hospitals",
    typeEn: "Hospitals",
    typeUk: "Лікарні",
    statusKey: "In Progress",
    statusEn: "In Progress",
    statusUk: "В процесі",
    funded: 85,
    needed: 6_100_000,
    raised: 5_185_000,
    descEn: "Reconstructing the emergency department serving 120,000 residents.",
    descUk: "Відновлення приймального покою, що обслуговує 120 000 мешканців.",
  },
  {
    id: 4,
    titleEn: "Bridge repair — road H-11",
    titleUk: "Ремонт мосту — дорога Н-11",
    region: "Kherson",
    typeKey: "Infrastructure",
    typeEn: "Infrastructure",
    typeUk: "Інфраструктура",
    statusKey: "Completed",
    statusEn: "Completed",
    statusUk: "Завершено",
    funded: 100,
    needed: 2_950_000,
    raised: 2_950_000,
    descEn: "Strategic bridge connecting 3 villages, completed April 2025.",
    descUk: "Стратегічний міст, що з'єднує 3 села, завершено у квітні 2025.",
  },
  {
    id: 5,
    titleEn: "Multi-family housing Saltivka",
    titleUk: "Багатоквартирний будинок Салтівка",
    region: "Kharkiv",
    typeKey: "Housing",
    typeEn: "Housing",
    typeUk: "Житло",
    statusKey: "Fundraising",
    statusEn: "Fundraising",
    statusUk: "Збір коштів",
    funded: 19,
    needed: 8_700_000,
    raised: 1_653_000,
    descEn: "Rebuilding a 72-unit apartment building after direct missile hit.",
    descUk: "Відновлення 72-квартирного будинку після прямого влучання ракети.",
  },
  {
    id: 6,
    titleEn: "Water supply infrastructure",
    titleUk: "Водопостачальна інфраструктура",
    region: "Other",
    typeKey: "Infrastructure",
    typeEn: "Infrastructure",
    typeUk: "Інфраструктура",
    statusKey: "Completed",
    statusEn: "Completed",
    statusUk: "Завершено",
    funded: 100,
    needed: 1_400_000,
    raised: 1_400_000,
    descEn: "Restored clean water access for 8,400 residents in Mykolayiv region.",
    descUk: "Відновлено доступ до чистої води для 8 400 мешканців Миколаївщини.",
  },
];

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  "Fundraising": { bg: "#FEF3C7", text: "#92400E" },
  "In Progress": { bg: "#DBEAFE", text: "#1E40AF" },
  "Completed": { bg: "#D1FAE5", text: "#065F46" },
};

export function RebuildUADemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [regionFilter, setRegionFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [donatingProject, setDonatingProject] = useState<Project | null>(null);
  const [donationAmount, setDonationAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("visa");
  const [donationDone, setDonationDone] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSent, setContactSent] = useState(false);
  const [partnershipType, setPartnershipType] = useState("financial");

  const regions = ["All", "Kyiv", "Kharkiv", "Zaporizhzhia", "Kherson", "Other"];
  const types = ["All", "Housing", "Schools", "Hospitals", "Infrastructure"];
  const statuses = ["All", "Fundraising", "In Progress", "Completed"];

  const regionLabel = (r: string) => {
    if (!isUk) return r;
    const map: Record<string, string> = {
      "All": "Усі",
      "Kyiv": "Київ",
      "Kharkiv": "Харків",
      "Zaporizhzhia": "Запоріжжя",
      "Kherson": "Херсон",
      "Other": "Інші",
    };
    return map[r] ?? r;
  };

  const typeLabel = (t: string) => {
    if (!isUk) return t;
    const map: Record<string, string> = {
      "All": "Усі",
      "Housing": "Житло",
      "Schools": "Школи",
      "Hospitals": "Лікарні",
      "Infrastructure": "Інфраструктура",
    };
    return map[t] ?? t;
  };

  const statusLabel = (s: string) => {
    if (!isUk) return s;
    const map: Record<string, string> = {
      "All": "Усі",
      "Fundraising": "Збір коштів",
      "In Progress": "В процесі",
      "Completed": "Завершено",
    };
    return map[s] ?? s;
  };

  const filteredProjects = PROJECTS.filter((p) => {
    if (regionFilter !== "All" && p.region !== regionFilter) return false;
    if (typeFilter !== "All" && p.typeKey !== typeFilter) return false;
    if (statusFilter !== "All" && p.statusKey !== statusFilter) return false;
    return true;
  });

  const getFinalAmount = () => {
    const custom = parseInt(customAmount, 10);
    return customAmount && !isNaN(custom) ? custom : donationAmount;
  };

  const handleDonate = () => {
    setDonationDone(true);
  };

  const closeDonation = () => {
    setDonatingProject(null);
    setDonationDone(false);
    setCustomAmount("");
    setDonationAmount(500);
    setPaymentMethod("visa");
  };

  const partnershipFormats = [
    {
      id: "financial",
      icon: "💰",
      titleEn: "Financial partnership",
      titleUk: "Фінансове партнерство",
      descEn: "Direct funding of reconstruction projects with full reporting and naming rights",
      descUk: "Пряме фінансування проектів відновлення з повною звітністю",
    },
    {
      id: "materials",
      icon: "🧱",
      titleEn: "Materials supply",
      titleUk: "Постачання матеріалів",
      descUk: "Будматеріали, обладнання або техніка для будівельних робіт",
      descEn: "Building materials, equipment or machinery for construction works",
    },
    {
      id: "probono",
      icon: "👷",
      titleEn: "Pro bono work",
      titleUk: "Pro bono роботи",
      descEn: "Engineering, architecture, legal or accounting services at no cost",
      descUk: "Інженерні, архітектурні, юридичні або бухгалтерські послуги безкоштовно",
    },
  ];

  const stats = [
    { labelEn: "Homes rebuilt", labelUk: "Будинків відновлено", value: "1,240", progress: 62, color: "#F5C518" },
    { labelEn: "Schools restored", labelUk: "Шкіл відновлено", value: "47", progress: 78, color: "#F5C518" },
    { labelEn: "Hospitals repaired", labelUk: "Лікарень відремонтовано", value: "23", progress: 45, color: "#F5C518" },
    { labelEn: "UAH raised total", labelUk: "Грн зібрано загалом", value: "₴284M", progress: 57, color: "#F5C518" },
  ];

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#F5F5F7", minHeight: "100vh" }}>
      {/* NAV */}
      <nav style={{ background: "#1C1C1E", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, background: "#F5C518", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 16, color: "#1C1C1E" }}>R</div>
          <span style={{ color: "#fff", fontWeight: 800, fontSize: 18, letterSpacing: "-0.5px" }}>RebuildUA</span>
        </div>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          {[
            isUk ? "Проекти" : "Projects",
            isUk ? "Партнерам" : "Partners",
            isUk ? "Звіти" : "Reports",
          ].map((item) => (
            <span key={item} style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, cursor: "pointer" }}>{item}</span>
          ))}
          <span style={{ background: "#F5C518", color: "#1C1C1E", padding: "7px 18px", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
            {isUk ? "Задонатити" : "Donate"}
          </span>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: "#1C1C1E", padding: "72px 24px 64px", textAlign: "center" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(245,197,24,0.15)", border: "1px solid rgba(245,197,24,0.3)", borderRadius: 6, padding: "5px 14px", marginBottom: 24 }}>
            <span style={{ color: "#F5C518", fontSize: 13, fontWeight: 600 }}>NGO · {isUk ? "Реєстр 38921-НПО" : "Registry 38921-NGO"}</span>
          </div>
          <h1 style={{ color: "#fff", fontSize: 52, fontWeight: 900, lineHeight: 1.05, marginBottom: 20, letterSpacing: "-1.5px" }}>
            {isUk ? "Відновлюємо те, що важливо" : "Rebuilding what matters"}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 18, lineHeight: 1.6, marginBottom: 40 }}>
            {isUk
              ? "Системне відновлення зруйнованих домівок, шкіл, лікарень та інфраструктури в Україні."
              : "Systematic reconstruction of destroyed homes, schools, hospitals and infrastructure across Ukraine."}
          </p>

          {/* Trust badges */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginBottom: 40 }}>
            {[
              "✓ Verified USAID",
              "✓ PwC Audit",
              "✓ Transparent accounting",
            ].map((badge) => (
              <div key={badge} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 6, padding: "7px 16px", color: "rgba(255,255,255,0.85)", fontSize: 13, fontWeight: 600 }}>
                {badge}
              </div>
            ))}
          </div>

          {/* Hero counters */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 480, margin: "0 auto" }}>
            <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "20px" }}>
              <div style={{ color: "#F5C518", fontSize: 36, fontWeight: 900, letterSpacing: "-1px" }}>1,240</div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginTop: 4 }}>{isUk ? "будинків відновлено" : "homes rebuilt"}</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "20px" }}>
              <div style={{ color: "#F5C518", fontSize: 36, fontWeight: 900, letterSpacing: "-1px" }}>₴284M</div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginTop: 4 }}>{isUk ? "залучено та витрачено" : "raised & spent"}</div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS CATALOG */}
      <section style={{ padding: "48px 24px", background: "#F5F5F7" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: "#1C1C1E", marginBottom: 8 }}>
            {isUk ? "Каталог проектів" : "Projects catalog"}
          </h2>
          <p style={{ color: "#6B7280", marginBottom: 28, fontSize: 15 }}>
            {isUk ? "Оберіть проект і зробіть цільовий внесок" : "Choose a project and make a targeted contribution"}
          </p>

          {/* Filters */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 28, background: "#fff", padding: "16px 20px", borderRadius: 12, border: "1px solid #E5E7EB" }}>
            {/* Region */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>
                {isUk ? "Регіон" : "Region"}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {regions.map((r) => (
                  <button
                    key={r}
                    onClick={() => setRegionFilter(r)}
                    style={{ padding: "5px 12px", borderRadius: 6, fontSize: 13, fontWeight: 600, border: `1.5px solid ${regionFilter === r ? "#1C1C1E" : "#E5E7EB"}`, background: regionFilter === r ? "#1C1C1E" : "#fff", color: regionFilter === r ? "#fff" : "#374151", cursor: "pointer" }}
                  >
                    {regionLabel(r)}
                  </button>
                ))}
              </div>
            </div>
            {/* Type */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>
                {isUk ? "Тип" : "Type"}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {types.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    style={{ padding: "5px 12px", borderRadius: 6, fontSize: 13, fontWeight: 600, border: `1.5px solid ${typeFilter === t ? "#1C1C1E" : "#E5E7EB"}`, background: typeFilter === t ? "#1C1C1E" : "#fff", color: typeFilter === t ? "#fff" : "#374151", cursor: "pointer" }}
                  >
                    {typeLabel(t)}
                  </button>
                ))}
              </div>
            </div>
            {/* Status */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>
                {isUk ? "Статус" : "Status"}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {statuses.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    style={{ padding: "5px 12px", borderRadius: 6, fontSize: 13, fontWeight: 600, border: `1.5px solid ${statusFilter === s ? "#1C1C1E" : "#E5E7EB"}`, background: statusFilter === s ? "#1C1C1E" : "#fff", color: statusFilter === s ? "#fff" : "#374151", cursor: "pointer" }}
                  >
                    {statusLabel(s)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Project count */}
          <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 16 }}>
            {isUk ? `Знайдено: ${filteredProjects.length} проектів` : `Found: ${filteredProjects.length} projects`}
          </p>

          {/* Project cards */}
          {filteredProjects.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px", color: "#9CA3AF", fontSize: 15 }}>
              {isUk ? "Нічого не знайдено. Змініть фільтри." : "No results. Try different filters."}
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
              {filteredProjects.map((project) => {
                const statusColors = STATUS_COLORS[project.statusKey] ?? { bg: "#F3F4F6", text: "#374151" };
                return (
                  <div key={project.id} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #E5E7EB", display: "flex", flexDirection: "column" }}>
                    {/* Top accent */}
                    <div style={{ height: 4, background: project.statusKey === "Completed" ? "#10B981" : project.statusKey === "In Progress" ? "#3B82F6" : "#F5C518" }} />
                    <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
                      {/* Header row */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                        <div style={{ flex: 1, marginRight: 8 }}>
                          <h3 style={{ fontWeight: 700, fontSize: 15, color: "#1C1C1E", lineHeight: 1.3, marginBottom: 4 }}>
                            {isUk ? project.titleUk : project.titleEn}
                          </h3>
                          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                            <span style={{ fontSize: 11, background: "#F3F4F6", color: "#374151", padding: "2px 8px", borderRadius: 4, fontWeight: 600 }}>
                              📍 {isUk ? regionLabel(project.region) : project.region}
                            </span>
                            <span style={{ fontSize: 11, background: "#F3F4F6", color: "#374151", padding: "2px 8px", borderRadius: 4, fontWeight: 600 }}>
                              {isUk ? typeLabel(project.typeKey) : project.typeEn}
                            </span>
                          </div>
                        </div>
                        <span style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, fontWeight: 700, background: statusColors.bg, color: statusColors.text, whiteSpace: "nowrap", flexShrink: 0 }}>
                          {isUk ? project.statusUk : project.statusEn}
                        </span>
                      </div>
                      <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.5, marginBottom: 16, flex: 1 }}>
                        {isUk ? project.descUk : project.descEn}
                      </p>
                      {/* Progress */}
                      <div style={{ marginBottom: 16 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#374151", marginBottom: 6 }}>
                          <span style={{ fontWeight: 700 }}>₴{(project.raised / 1000).toFixed(0)}K {isUk ? "зібрано" : "raised"}</span>
                          <span style={{ color: "#9CA3AF" }}>₴{(project.needed / 1000).toFixed(0)}K {isUk ? "потрібно" : "needed"}</span>
                        </div>
                        <div style={{ height: 8, background: "#F3F4F6", borderRadius: 4, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${project.funded}%`, background: project.funded === 100 ? "#10B981" : "#F5C518", borderRadius: 4 }} />
                        </div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: project.funded === 100 ? "#10B981" : "#92400E", marginTop: 4 }}>{project.funded}%</div>
                      </div>
                      <button
                        onClick={() => { setDonatingProject(project); setDonationDone(false); }}
                        disabled={project.statusKey === "Completed"}
                        style={{ width: "100%", padding: "11px", borderRadius: 10, background: project.statusKey === "Completed" ? "#E5E7EB" : "#1C1C1E", color: project.statusKey === "Completed" ? "#9CA3AF" : "#fff", fontSize: 14, fontWeight: 700, border: "none", cursor: project.statusKey === "Completed" ? "default" : "pointer" }}
                      >
                        {project.statusKey === "Completed"
                          ? (isUk ? "Проект завершено" : "Project completed")
                          : (isUk ? "Задонатити на цей проект" : "Donate to this project")}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* DONATION MODAL OVERLAY */}
      {donatingProject && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }} onClick={closeDonation}>
          <div style={{ background: "#fff", borderRadius: 20, padding: "32px", maxWidth: 440, width: "100%", boxShadow: "0 24px 80px rgba(0,0,0,0.3)" }} onClick={(e) => e.stopPropagation()}>
            {donationDone ? (
              <div style={{ textAlign: "center", padding: "16px 0" }}>
                <div style={{ fontSize: 52, marginBottom: 16 }}>🏗️</div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: "#1C1C1E", marginBottom: 12 }}>
                  {isUk ? "Дякуємо за підтримку!" : "Thank you for your support!"}
                </h3>
                <p style={{ color: "#374151", fontSize: 15, lineHeight: 1.6, marginBottom: 6 }}>
                  {isUk
                    ? "Сертифікат донора буде надіслано на вашу електронну пошту."
                    : "Certificate of donor will be sent to your email."}
                </p>
                <p style={{ color: "#6B7280", fontSize: 13, marginBottom: 24 }}>
                  ₴{getFinalAmount().toLocaleString()} → {isUk ? donatingProject.titleUk : donatingProject.titleEn}
                </p>
                <button onClick={closeDonation} style={{ background: "#1C1C1E", color: "#fff", padding: "11px 28px", borderRadius: 10, fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer" }}>
                  {isUk ? "Закрити" : "Close"}
                </button>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <div>
                    <h3 style={{ fontWeight: 800, fontSize: 17, color: "#1C1C1E", marginBottom: 2 }}>
                      {isUk ? "Донат на проект" : "Donate to project"}
                    </h3>
                    <p style={{ fontSize: 13, color: "#6B7280" }}>{isUk ? donatingProject.titleUk : donatingProject.titleEn}</p>
                  </div>
                  <button onClick={closeDonation} style={{ background: "#F3F4F6", border: "none", width: 32, height: 32, borderRadius: "50%", cursor: "pointer", fontSize: 18, color: "#374151", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
                </div>
                {/* Amount */}
                <p style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}>{isUk ? "Оберіть суму:" : "Select amount:"}</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 10 }}>
                  {[100, 500, 1000, 5000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => { setDonationAmount(amt); setCustomAmount(""); }}
                      style={{ padding: "10px 4px", borderRadius: 8, border: `2px solid ${donationAmount === amt && !customAmount ? "#1C1C1E" : "#E5E7EB"}`, background: donationAmount === amt && !customAmount ? "#1C1C1E" : "#fff", color: donationAmount === amt && !customAmount ? "#fff" : "#374151", fontWeight: 700, fontSize: 14, cursor: "pointer" }}
                    >
                      ₴{amt}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder={isUk ? "Інша сума, ₴" : "Custom amount, ₴"}
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1.5px solid ${customAmount ? "#1C1C1E" : "#E5E7EB"}`, fontSize: 14, outline: "none", boxSizing: "border-box", marginBottom: 12 }}
                />
                {/* Hint */}
                <div style={{ background: "#FEF3C7", borderRadius: 8, padding: "8px 12px", marginBottom: 16, fontSize: 12, color: "#92400E", fontWeight: 600 }}>
                  💡 {isUk ? "₴100 = 1 м² штукатурки" : "₴100 = 1 m² of plastering"}
                </div>
                {/* Payment method */}
                <p style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}>{isUk ? "Спосіб оплати:" : "Payment method:"}</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, marginBottom: 20 }}>
                  {[
                    { id: "visa", label: "Visa", icon: "💳" },
                    { id: "mastercard", label: "MC", icon: "💳" },
                    { id: "liqpay", label: "LiqPay", icon: "🟠" },
                    { id: "swift", label: "SWIFT", icon: "🌐" },
                  ].map((pay) => (
                    <button
                      key={pay.id}
                      onClick={() => setPaymentMethod(pay.id)}
                      style={{ padding: "9px 4px", borderRadius: 8, border: `2px solid ${paymentMethod === pay.id ? "#1C1C1E" : "#E5E7EB"}`, background: paymentMethod === pay.id ? "#1C1C1E" : "#fff", cursor: "pointer", fontSize: 10, fontWeight: 700, color: paymentMethod === pay.id ? "#F5C518" : "#374151" }}
                    >
                      <div style={{ fontSize: 16, marginBottom: 2 }}>{pay.icon}</div>
                      {pay.label}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleDonate}
                  style={{ width: "100%", padding: "13px", borderRadius: 10, background: "#F5C518", color: "#1C1C1E", fontSize: 15, fontWeight: 800, border: "none", cursor: "pointer" }}
                >
                  {isUk ? `Задонатити ₴${getFinalAmount().toLocaleString()}` : `Donate ₴${getFinalAmount().toLocaleString()}`}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* STATS — before/after concept */}
      <section style={{ padding: "48px 24px", background: "#1C1C1E" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 800, marginBottom: 8, textAlign: "center" }}>
            {isUk ? "До та після: наш прогрес" : "Before & after: our progress"}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", textAlign: "center", marginBottom: 36 }}>
            {isUk ? "Стан відновлення по ключових категоріях" : "Reconstruction status by key category"}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
            {stats.map((stat) => (
              <div key={stat.labelEn} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 14, padding: "24px 20px", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ color: "#F5C518", fontSize: 32, fontWeight: 900, letterSpacing: "-0.5px", marginBottom: 4 }}>{stat.value}</div>
                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginBottom: 16 }}>{isUk ? stat.labelUk : stat.labelEn}</div>
                <div style={{ height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 3, marginBottom: 6 }}>
                  <div style={{ height: "100%", width: `${stat.progress}%`, background: "#F5C518", borderRadius: 3 }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
                  <span>{isUk ? "До" : "Before"}: 0%</span>
                  <span style={{ color: "#F5C518", fontWeight: 700 }}>{stat.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* B2B PARTNERSHIP */}
      <section style={{ padding: "48px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}>
            <div>
              <div style={{ display: "inline-block", background: "#F5C518", color: "#1C1C1E", fontSize: 11, fontWeight: 800, padding: "4px 12px", borderRadius: 4, marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>
                {isUk ? "Для бізнесу" : "For business"}
              </div>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: "#1C1C1E", marginBottom: 12, lineHeight: 1.2 }}>
                {isUk ? "Ваша компанія може стати корпоративним партнером" : "Your company can be a corporate partner"}
              </h2>
              <p style={{ color: "#6B7280", fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>
                {isUk
                  ? "Корпоративне партнерство — це прозорий механізм соціальної відповідальності з повною звітністю."
                  : "Corporate partnership is a transparent CSR mechanism with full accounting and reporting."}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {partnershipFormats.map((fmt) => (
                  <button
                    key={fmt.id}
                    onClick={() => setPartnershipType(fmt.id)}
                    style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 16px", borderRadius: 12, border: `2px solid ${partnershipType === fmt.id ? "#1C1C1E" : "#E5E7EB"}`, background: partnershipType === fmt.id ? "#F9FAFB" : "#fff", cursor: "pointer", textAlign: "left" }}
                  >
                    <span style={{ fontSize: 24, flexShrink: 0, marginTop: 1 }}>{fmt.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: "#1C1C1E", marginBottom: 3 }}>
                        {isUk ? fmt.titleUk : fmt.titleEn}
                      </div>
                      <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.4 }}>
                        {isUk ? fmt.descUk : fmt.descEn}
                      </div>
                    </div>
                    {partnershipType === fmt.id && (
                      <span style={{ marginLeft: "auto", color: "#1C1C1E", fontWeight: 800, fontSize: 16, flexShrink: 0 }}>✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact form */}
            <div style={{ background: "#F9FAFB", borderRadius: 20, padding: "28px", border: "1px solid #E5E7EB" }}>
              {contactSent ? (
                <div style={{ textAlign: "center", padding: "32px 0" }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
                  <h3 style={{ fontWeight: 800, fontSize: 18, color: "#1C1C1E", marginBottom: 8 }}>
                    {isUk ? "Заявку отримано!" : "Request received!"}
                  </h3>
                  <p style={{ color: "#6B7280", fontSize: 14 }}>
                    {isUk ? "Ми зв'яжемося з вами протягом 24 годин." : "We will contact you within 24 hours."}
                  </p>
                  <button onClick={() => setContactSent(false)} style={{ marginTop: 16, background: "#1C1C1E", color: "#fff", padding: "10px 24px", borderRadius: 8, fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer" }}>
                    {isUk ? "Нова заявка" : "New request"}
                  </button>
                </div>
              ) : (
                <>
                  <h3 style={{ fontWeight: 800, fontSize: 17, color: "#1C1C1E", marginBottom: 4 }}>
                    {isUk ? "Зв'язатися з нами" : "Get in touch"}
                  </h3>
                  <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 20 }}>
                    {isUk ? "Залиште контакти — ми підберемо формат під ваш бізнес" : "Leave your contact — we'll match the right partnership format"}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", display: "block", marginBottom: 4 }}>
                        {isUk ? "Ваше ім'я / компанія" : "Your name / company"}
                      </label>
                      <input
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder={isUk ? "ТОВ «Приклад»" : "Example Corp Ltd"}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1.5px solid #E5E7EB", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", display: "block", marginBottom: 4 }}>Email</label>
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="partner@company.ua"
                        style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1.5px solid #E5E7EB", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", display: "block", marginBottom: 4 }}>
                        {isUk ? "Формат партнерства" : "Partnership format"}
                      </label>
                      <div style={{ padding: "10px 14px", background: "#fff", borderRadius: 8, border: "1.5px solid #E5E7EB", fontSize: 14, color: "#374151" }}>
                        {isUk
                          ? partnershipFormats.find((f) => f.id === partnershipType)?.titleUk
                          : partnershipFormats.find((f) => f.id === partnershipType)?.titleEn}
                      </div>
                    </div>
                    <button
                      onClick={() => { if (contactName && contactEmail) setContactSent(true); }}
                      style={{ padding: "12px", borderRadius: 10, background: "#F5C518", color: "#1C1C1E", fontSize: 15, fontWeight: 800, border: "none", cursor: "pointer", marginTop: 4 }}
                    >
                      {isUk ? "Надіслати заявку" : "Send request"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* TRANSPARENCY */}
      <section style={{ padding: "48px 24px", background: "#F5F5F7" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: "#1C1C1E", marginBottom: 8, textAlign: "center" }}>
            {isUk ? "Фінансова прозорість" : "Financial transparency"}
          </h2>
          <p style={{ color: "#6B7280", textAlign: "center", marginBottom: 36, fontSize: 15 }}>
            {isUk ? "Всі звіти публічні. Аудит щорічний." : "All reports are public. Annual audit."}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {/* Audit badge */}
            <div style={{ background: "#fff", borderRadius: 16, padding: "24px", border: "2px solid #F5C518", display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 48, height: 48, background: "#FEF9C3", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>🏅</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 15, color: "#1C1C1E" }}>PwC Ukraine</div>
                  <div style={{ fontSize: 12, color: "#6B7280" }}>{isUk ? "Аудиторський сертифікат 2025" : "Audit Certificate 2025"}</div>
                </div>
              </div>
              <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.5 }}>
                {isUk
                  ? "Повна перевірка фінансової звітності за 2024 рік. Відповідність МСФЗ підтверджено."
                  : "Full financial statement audit for FY2024. IFRS compliance confirmed."}
              </div>
              <div style={{ display: "inline-block", background: "#D1FAE5", color: "#065F46", fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 6, alignSelf: "flex-start" }}>
                ✓ {isUk ? "Підтверджено" : "Verified"}
              </div>
            </div>
            {/* Monthly reports */}
            <div style={{ background: "#fff", borderRadius: 16, padding: "24px", border: "1px solid #E5E7EB" }}>
              <h3 style={{ fontWeight: 700, fontSize: 16, color: "#1C1C1E", marginBottom: 16 }}>
                {isUk ? "Фінансові звіти" : "Financial reports"}
              </h3>
              {["2026-02", "2026-01", "2025-12", "2025-11"].map((month) => (
                <div key={month} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #F3F4F6" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 16 }}>📊</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#1C1C1E" }}>{isUk ? `Звіт ${month}` : `Report ${month}`}</span>
                  </div>
                  <span style={{ fontSize: 12, color: "#F5C518", fontWeight: 700, cursor: "pointer" }}>PDF ↓</span>
                </div>
              ))}
            </div>
            {/* USAID badge */}
            <div style={{ background: "#fff", borderRadius: 16, padding: "24px", border: "1px solid #E5E7EB" }}>
              <h3 style={{ fontWeight: 700, fontSize: 16, color: "#1C1C1E", marginBottom: 16 }}>
                {isUk ? "Верифікація" : "Verification"}
              </h3>
              {[
                { icon: "🇺🇸", name: "USAID", statusEn: "Verified partner since 2022", statusUk: "Верифікований партнер з 2022" },
                { icon: "🔵", name: "EU4Ukraine", statusEn: "Listed partner NGO", statusUk: "Партнерська НПО" },
                { icon: "🟢", name: "Prozorro", statusEn: "All procurement public", statusUk: "Всі закупівлі публічні" },
              ].map((v) => (
                <div key={v.name} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <span style={{ fontSize: 20 }}>{v.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: "#1C1C1E" }}>{v.name}</div>
                    <div style={{ fontSize: 11, color: "#6B7280" }}>{isUk ? v.statusUk : v.statusEn}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#1C1C1E", padding: "32px 24px", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center", marginBottom: 12 }}>
          <div style={{ width: 28, height: 28, background: "#F5C518", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: "#1C1C1E" }}>R</div>
          <span style={{ color: "#fff", fontWeight: 800, fontSize: 16 }}>RebuildUA</span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>
          {isUk ? "Благодійна організація · Реєстр 38921-НПО · 2022–2026" : "Charity NGO · Registry 38921-NGO · 2022–2026"}
        </p>
      </footer>
    </div>
  );
}
