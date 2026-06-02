"use client";

import { useState } from "react";

export function DigitalShiftDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  // ─── STATE ───────────────────────────────────────────────────────────────────
  const [activeService, setActiveService] = useState(0);
  const [roiInputs, setRoiInputs] = useState({
    industry: "retail",
    employees: 100,
    hours: 200,
  });
  const [roiResult, setRoiResult] = useState<{
    savedHours: number;
    savedMoney: number;
  } | null>(null);
  const [roiEmail, setRoiEmail] = useState("");
  const [roiSubmitted, setRoiSubmitted] = useState(false);
  const [activeTechFilter, setActiveTechFilter] = useState("all");
  const [diagnosisForm, setDiagnosisForm] = useState({
    company: "",
    industry: "",
    pain: "",
    employees: "",
    contact: "",
  });
  const [selectedSlot, setSelectedSlot] = useState("");
  const [diagnosisSubmitted, setDiagnosisSubmitted] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  // ─── DATA ────────────────────────────────────────────────────────────────────

  const services = [
    {
      id: "erp",
      icon: "🏭",
      title: isUk ? "Впровадження ERP" : "ERP Implementation",
      platforms: "SAP · MS Dynamics · 1C",
      desc: isUk
        ? "Ми аналізуємо бізнес-процеси, обираємо оптимальну ERP-платформу та впроваджуємо систему з нуля або мігруємо з legacy-рішень. Покриваємо фінанси, склад, виробництво та HR."
        : "We analyse business processes, choose the optimal ERP platform and implement the system from scratch or migrate from legacy solutions. Finance, warehouse, manufacturing and HR covered.",
      kpi: isUk ? "Час обробки замовлення −65%" : "Order processing time −65%",
      caseTitle: isUk
        ? "Виробник меблів → SAP → цикл замовлення скорочено з 5 до 2 днів"
        : "Furniture manufacturer → SAP → order cycle cut from 5 to 2 days",
      cta: isUk ? "Обговорити" : "Discuss",
    },
    {
      id: "crm",
      icon: "🤝",
      title: isUk ? "CRM-трансформація" : "CRM Transformation",
      platforms: "Salesforce · HubSpot · Pipedrive",
      desc: isUk
        ? "Будуємо єдиний клієнтський профіль, автоматизуємо воронки продажів, інтегруємо з ERP та маркетинговими інструментами. Збільшуємо конверсію та LTV."
        : "We build a unified customer profile, automate sales pipelines, integrate with ERP and marketing tools. Increase conversion and LTV.",
      kpi: isUk ? "Утримання клієнтів +40%" : "Client retention +40%",
      caseTitle: isUk
        ? "Логістична компанія → Salesforce → повторні покупки зросли на 40%"
        : "Logistics company → Salesforce → repeat purchases up 40%",
      cta: isUk ? "Обговорити" : "Discuss",
    },
    {
      id: "automation",
      icon: "⚙️",
      title: isUk ? "Автоматизація процесів" : "Process Automation",
      platforms: "RPA · No-code · Zapier · Make",
      desc: isUk
        ? "Впроваджуємо RPA-роботів для рутинних завдань, будуємо no-code потоки в Zapier/Make та інтегруємо десятки систем без написання коду. Звільняємо команду від ручної праці."
        : "We deploy RPA bots for routine tasks, build no-code flows in Zapier/Make and integrate dozens of systems without custom code. Free your team from manual work.",
      kpi: isUk ? "Ручна праця −70%" : "Manual work −70%",
      caseTitle: isUk
        ? "Роздрібна мережа → RPA → обробка інвойсів автоматизована на 90%"
        : "Retail chain → RPA → invoice processing 90% automated",
      cta: isUk ? "Обговорити" : "Discuss",
    },
    {
      id: "ai",
      icon: "🤖",
      title: isUk ? "AI-інтеграції" : "AI Integrations",
      platforms: "ChatGPT API · ML · Forecasting",
      desc: isUk
        ? "Інтегруємо ChatGPT API у клієнтський сервіс, будуємо ML-моделі прогнозування попиту та відтоку, впроваджуємо комп'ютерний зір для контролю якості."
        : "We integrate ChatGPT API into customer service, build ML demand and churn prediction models, deploy computer vision for quality control.",
      kpi: isUk ? "Час відповіді підтримки −80%" : "Support response time −80%",
      caseTitle: isUk
        ? "Фінтех → ChatGPT API → 80% запитів закривається без оператора"
        : "Fintech → ChatGPT API → 80% queries resolved without agent",
      cta: isUk ? "Обговорити" : "Discuss",
    },
    {
      id: "analytics",
      icon: "📊",
      title: isUk ? "Аналітика даних" : "Data Analytics",
      platforms: "Power BI · Tableau · Dashboards",
      desc: isUk
        ? "Будуємо єдине сховище даних, розробляємо real-time дашборди в Power BI / Tableau, налаштовуємо звіти для C-level та операційних команд."
        : "We build a unified data warehouse, develop real-time dashboards in Power BI / Tableau and configure reports for C-level and operational teams.",
      kpi: isUk ? "Час прийняття рішень −50%" : "Decision time −50%",
      caseTitle: isUk
        ? "Виробництво → Power BI → щоденний звіт замість щотижневого"
        : "Manufacturing → Power BI → daily reports instead of weekly",
      cta: isUk ? "Обговорити" : "Discuss",
    },
  ];

  const industries = [
    { value: "retail", label: isUk ? "Роздріб" : "Retail" },
    { value: "manufacturing", label: isUk ? "Виробництво" : "Manufacturing" },
    { value: "finance", label: isUk ? "Фінанси" : "Finance" },
    { value: "logistics", label: isUk ? "Логістика" : "Logistics" },
  ];

  const industryRates: Record<string, number> = {
    retail: 380,
    manufacturing: 420,
    finance: 550,
    logistics: 400,
  };

  function calcRoi() {
    const rate = industryRates[roiInputs.industry] ?? 400;
    const automationFactor = 0.65;
    const savedHours = Math.round(roiInputs.hours * automationFactor);
    const savedMoney = Math.round(savedHours * rate * 12);
    setRoiResult({ savedHours, savedMoney });
  }

  const techCategories = [
    {
      id: "erp",
      label: "ERP",
      items: [
        { name: "SAP S/4HANA", color: "#6366F1", use: isUk ? "Виробництво, фінанси" : "Manufacturing, Finance" },
        { name: "MS Dynamics 365", color: "#10B981", use: isUk ? "Роздріб, дистрибуція" : "Retail, Distribution" },
        { name: "1C:Підприємство", color: "#F59E0B", use: isUk ? "Середній бізнес UA" : "Mid-market UA" },
        { name: "Oracle NetSuite", color: "#6366F1", use: isUk ? "SaaS-компанії" : "SaaS companies" },
        { name: "Odoo", color: "#10B981", use: isUk ? "Малий та середній бізнес" : "SME" },
      ],
    },
    {
      id: "crm",
      label: "CRM",
      items: [
        { name: "Salesforce", color: "#6366F1", use: isUk ? "Ентерпрайз продажі" : "Enterprise sales" },
        { name: "HubSpot", color: "#10B981", use: isUk ? "Inbound маркетинг" : "Inbound marketing" },
        { name: "Pipedrive", color: "#F59E0B", use: isUk ? "B2B воронки" : "B2B pipelines" },
        { name: "Zoho CRM", color: "#6366F1", use: isUk ? "Мультиканальні продажі" : "Multi-channel sales" },
        { name: "Bitrix24", color: "#10B981", use: isUk ? "Бізнес UA/CIS" : "UA/CIS business" },
      ],
    },
    {
      id: "automation",
      label: isUk ? "Автоматизація" : "Automation",
      items: [
        { name: "UiPath RPA", color: "#6366F1", use: isUk ? "Корпоративний RPA" : "Enterprise RPA" },
        { name: "Make (Integromat)", color: "#10B981", use: isUk ? "No-code потоки" : "No-code flows" },
        { name: "Zapier", color: "#F59E0B", use: isUk ? "SaaS-інтеграції" : "SaaS integrations" },
        { name: "n8n", color: "#6366F1", use: isUk ? "Self-hosted автоматизація" : "Self-hosted automation" },
        { name: "Power Automate", color: "#10B981", use: isUk ? "Microsoft-екосистема" : "Microsoft ecosystem" },
      ],
    },
    {
      id: "ai",
      label: "AI",
      items: [
        { name: "OpenAI API", color: "#6366F1", use: isUk ? "Чатботи, контент" : "Chatbots, content" },
        { name: "Azure OpenAI", color: "#10B981", use: isUk ? "Корпоративний AI" : "Enterprise AI" },
        { name: "Google Vertex AI", color: "#F59E0B", use: isUk ? "ML-пайплайни" : "ML pipelines" },
        { name: "Hugging Face", color: "#6366F1", use: isUk ? "Open-source моделі" : "Open-source models" },
        { name: "LangChain", color: "#10B981", use: isUk ? "RAG, агенти" : "RAG, agents" },
      ],
    },
    {
      id: "analytics",
      label: isUk ? "Аналітика" : "Analytics",
      items: [
        { name: "Power BI", color: "#6366F1", use: isUk ? "BI дашборди" : "BI dashboards" },
        { name: "Tableau", color: "#10B981", use: isUk ? "Візуалізація даних" : "Data visualisation" },
        { name: "Looker", color: "#F59E0B", use: isUk ? "Embedded analytics" : "Embedded analytics" },
        { name: "Apache Superset", color: "#6366F1", use: isUk ? "Open-source BI" : "Open-source BI" },
        { name: "dbt + BigQuery", color: "#10B981", use: isUk ? "Data warehouse" : "Data warehouse" },
      ],
    },
  ];

  const industryTechMap: Record<string, string[]> = {
    retail: ["erp", "crm", "automation", "analytics"],
    manufacturing: ["erp", "automation", "ai", "analytics"],
    finance: ["crm", "ai", "analytics"],
    logistics: ["erp", "automation", "analytics"],
  };

  const filteredTech =
    activeTechFilter === "all"
      ? techCategories
      : techCategories.filter((c) =>
          industryTechMap[activeTechFilter]?.includes(c.id)
        );

  const cases = [
    {
      industry: isUk ? "Виробництво меблів" : "Furniture Manufacturing",
      problem: isUk ? "Ручний облік замовлень у Excel" : "Manual order tracking in Excel",
      solution: "SAP S/4HANA ERP",
      before: isUk ? "Час замовлення: 5 днів" : "Order cycle: 5 days",
      after: isUk ? "Час замовлення: 2 дні (−65%)" : "Order cycle: 2 days (−65%)",
      color: "#6366F1",
    },
    {
      industry: isUk ? "Логістика" : "Logistics",
      problem: isUk ? "Розрізнені клієнтські дані в 4 системах" : "Fragmented client data across 4 systems",
      solution: "Salesforce CRM",
      before: isUk ? "Утримання: 60%" : "Retention: 60%",
      after: isUk ? "Утримання: 84% (+40%)" : "Retention: 84% (+40%)",
      color: "#10B981",
    },
    {
      industry: isUk ? "Роздрібна мережа" : "Retail Chain",
      problem: isUk ? "1200 інвойсів на місяць вводяться вручну" : "1,200 invoices/month entered manually",
      solution: "UiPath RPA",
      before: isUk ? "2 FTE на обробку" : "2 FTE on processing",
      after: isUk ? "0.2 FTE, −90% часу" : "0.2 FTE, −90% time",
      color: "#F59E0B",
    },
    {
      industry: isUk ? "Фінтех" : "Fintech",
      problem: isUk ? "Перевантажена служба підтримки" : "Overloaded support team",
      solution: "ChatGPT API + RAG",
      before: isUk ? "Відповідь: 4 год" : "Response: 4 hrs",
      after: isUk ? "Відповідь: 2 хв (−80%)" : "Response: 2 min (−80%)",
      color: "#6366F1",
    },
    {
      industry: isUk ? "Виробництво" : "Manufacturing",
      problem: isUk ? "Щотижневі звіти займали 2 дні" : "Weekly reports took 2 days to compile",
      solution: "Power BI + dbt",
      before: isUk ? "Звіт: 2 дні" : "Report: 2 days",
      after: isUk ? "Real-time дашборд" : "Real-time dashboard",
      color: "#10B981",
    },
    {
      industry: isUk ? "Страхування" : "Insurance",
      problem: isUk ? "Відтік клієнтів 25% на рік" : "25% annual churn",
      solution: isUk ? "ML-модель прогнозування відтоку" : "ML churn prediction model",
      before: isUk ? "Відтік: 25%" : "Churn: 25%",
      after: isUk ? "Відтік: 14% (−44%)" : "Churn: 14% (−44%)",
      color: "#F59E0B",
    },
    {
      industry: isUk ? "Дистрибуція" : "Distribution",
      problem: isUk ? "Надлишкові запаси на ₴3M" : "₴3M in excess inventory",
      solution: "MS Dynamics 365 + ML forecasting",
      before: isUk ? "Точність прогнозу: 55%" : "Forecast accuracy: 55%",
      after: isUk ? "Точність: 89% (+34 п.п.)" : "Accuracy: 89% (+34 p.p.)",
      color: "#6366F1",
    },
    {
      industry: isUk ? "E-commerce" : "E-commerce",
      problem: isUk ? "Ручна обробка повернень" : "Manual returns processing",
      solution: "Make + Zapier automation",
      before: isUk ? "Повернення: 3 дні" : "Returns: 3 days",
      after: isUk ? "Повернення: 4 год (−87%)" : "Returns: 4 hrs (−87%)",
      color: "#10B981",
    },
  ];

  const team = [
    {
      name: "Олексій Варченко",
      role: isUk ? "Партнер, ERP-практика" : "Partner, ERP Practice",
      certs: ["SAP Certified", "PMP"],
      exp: isUk ? "14 років" : "14 years",
    },
    {
      name: "Катерина Лисенко",
      role: isUk ? "Директор CRM" : "CRM Director",
      certs: ["Salesforce Admin", "HubSpot Expert"],
      exp: isUk ? "10 років" : "10 years",
    },
    {
      name: "Дмитро Ковальчук",
      role: isUk ? "Лід автоматизації" : "Automation Lead",
      certs: ["UiPath RPA", "Make Expert"],
      exp: isUk ? "8 років" : "8 years",
    },
    {
      name: "Наталія Семенченко",
      role: isUk ? "Head of AI" : "Head of AI",
      certs: ["Azure AI Engineer", "Google ML"],
      exp: isUk ? "7 років" : "7 years",
    },
    {
      name: "Андрій Петренко",
      role: isUk ? "Аналітик даних" : "Data Analytics Lead",
      certs: ["Power BI Certified", "Tableau Desktop"],
      exp: isUk ? "9 років" : "9 years",
    },
    {
      name: "Вікторія Мороз",
      role: isUk ? "Менеджер проектів" : "Project Manager",
      certs: ["PMP", "SAFe Agilist"],
      exp: isUk ? "11 років" : "11 years",
    },
  ];

  const slots = [
    "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00",
  ];

  const painOptions = isUk
    ? [
        "Ручні процеси займають багато часу",
        "Дані розкидані по різних системах",
        "Немає аналітики в реальному часі",
        "Низька ефективність відділу продажів",
        "Важко масштабуватися",
      ]
    : [
        "Manual processes take too much time",
        "Data scattered across different systems",
        "No real-time analytics",
        "Low sales team efficiency",
        "Struggling to scale",
      ];

  const diagIndustries = isUk
    ? ["Виробництво", "Роздріб", "Логістика", "Фінанси", "IT", "Інше"]
    : ["Manufacturing", "Retail", "Logistics", "Finance", "IT", "Other"];

  // ─── RENDER ──────────────────────────────────────────────────────────────────

  return (
    <div className="bg-[#0D0B1F] text-white font-sans min-h-screen">

      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-[#0D0B1F]/90 backdrop-blur-md border-b border-indigo-900/40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-linear-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-sm font-bold shrink-0">
              DS
            </span>
            <span className="text-white font-semibold text-lg tracking-tight">
              DigitalShift
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-indigo-200">
            {[
              isUk ? "Послуги" : "Services",
              isUk ? "Калькулятор" : "ROI Calc",
              isUk ? "Технології" : "Tech Stack",
              isUk ? "Кейси" : "Cases",
              isUk ? "Команда" : "Team",
            ].map((l) => (
              <span key={l} className="hover:text-white cursor-pointer transition-colors">
                {l}
              </span>
            ))}
          </div>
          <button
            onClick={() => setNavOpen(!navOpen)}
            className="md:hidden text-indigo-300 text-xl"
            aria-label="menu"
          >
            {navOpen ? "✕" : "☰"}
          </button>
        </div>
        {navOpen && (
          <div className="md:hidden bg-[#0D0B1F] border-t border-indigo-900/40 px-4 pb-4 flex flex-col gap-3 text-sm text-indigo-200">
            {[
              isUk ? "Послуги" : "Services",
              isUk ? "Калькулятор" : "ROI Calc",
              isUk ? "Технології" : "Tech Stack",
              isUk ? "Кейси" : "Cases",
              isUk ? "Команда" : "Team",
            ].map((l) => (
              <span key={l} className="cursor-pointer hover:text-white transition-colors">
                {l}
              </span>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* animated gradient bg */}
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 20% 40%, #312E81 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 60%, #1e3a5f 0%, transparent 55%), #0D0B1F",
          }}
        />

        {/* floating data-point decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { top: "12%", left: "8%", size: 12, color: "#6366F1", opacity: 0.8 },
            { top: "25%", left: "18%", size: 6, color: "#10B981", opacity: 0.6 },
            { top: "60%", left: "6%", size: 9, color: "#6366F1", opacity: 0.5 },
            { top: "75%", left: "22%", size: 5, color: "#10B981", opacity: 0.7 },
            { top: "10%", left: "72%", size: 8, color: "#10B981", opacity: 0.7 },
            { top: "30%", left: "85%", size: 14, color: "#6366F1", opacity: 0.6 },
            { top: "55%", left: "78%", size: 6, color: "#F59E0B", opacity: 0.5 },
            { top: "80%", left: "90%", size: 10, color: "#6366F1", opacity: 0.4 },
            { top: "45%", left: "50%", size: 4, color: "#10B981", opacity: 0.3 },
          ].map((dot, i) => (
            <span
              key={i}
              className="absolute rounded-full"
              style={{
                top: dot.top,
                left: dot.left,
                width: dot.size,
                height: dot.size,
                backgroundColor: dot.color,
                opacity: dot.opacity,
                animation: `pulse ${2 + (i % 3)}s ease-in-out infinite alternate`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-6xl mx-auto px-4 pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-900/60 border border-indigo-700/50 rounded-full px-4 py-1.5 text-xs text-indigo-300 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block shrink-0" />
            {isUk
              ? "Сертифікований партнер SAP, Salesforce, Microsoft"
              : "Certified SAP, Salesforce & Microsoft partner"}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-5 text-white max-w-3xl mx-auto">
            {isUk
              ? "Трансформуємо бізнес-процеси у конкурентну перевагу"
              : "We Transform Business Processes into Competitive Advantage"}
          </h1>

          <p className="text-indigo-300 text-base md:text-lg mb-8 font-mono tracking-wider">
            ERP. CRM. Automation. AI Integrations.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-7 py-3 rounded-xl transition-colors text-sm">
              {isUk ? "Розрахувати ROI" : "Calculate ROI"}
            </button>
            <button className="border border-indigo-600 hover:bg-indigo-900/40 text-indigo-200 font-semibold px-7 py-3 rounded-xl transition-colors text-sm">
              {isUk ? "Безкоштовна діагностика" : "Free Diagnosis"}
            </button>
          </div>

          {/* partner logos row */}
          <div className="flex flex-wrap justify-center gap-3">
            {["SAP", "Salesforce", "Microsoft", "HubSpot"].map((p) => (
              <span
                key={p}
                className="bg-white/5 border border-white/10 text-white/70 text-xs font-semibold px-4 py-1.5 rounded-full"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ────────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          {isUk ? "Напрями послуг" : "Service Areas"}
        </h2>
        <p className="text-indigo-300 text-sm text-center mb-8">
          {isUk
            ? "Повний цикл цифрової трансформації — від стратегії до підтримки"
            : "Full-cycle digital transformation — from strategy to support"}
        </p>

        {/* tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {services.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActiveService(i)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeService === i
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/50"
                  : "bg-indigo-950/50 border border-indigo-800/40 text-indigo-300 hover:border-indigo-600"
              }`}
            >
              <span>{s.icon}</span>
              <span className="hidden sm:inline">{s.title}</span>
            </button>
          ))}
        </div>

        {/* active service panel */}
        {(() => {
          const s = services[activeService];
          return (
            <div className="bg-[#1a1535] border border-indigo-800/40 rounded-2xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{s.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold">{s.title}</h3>
                      <p className="text-indigo-400 text-xs font-mono">{s.platforms}</p>
                    </div>
                  </div>
                  <p className="text-indigo-200 text-sm leading-relaxed mb-4">{s.desc}</p>
                  <div className="bg-indigo-950/60 border border-indigo-700/30 rounded-xl p-4 mb-4">
                    <p className="text-xs text-indigo-400 uppercase tracking-wider mb-1">
                      {isUk ? "Показник KPI" : "Sample KPI"}
                    </p>
                    <p className="text-green-400 font-bold text-lg">{s.kpi}</p>
                  </div>
                  <div className="text-xs text-indigo-400 italic mb-6">
                    {isUk ? "Кейс: " : "Case: "}
                    <span className="text-indigo-200 not-italic">{s.caseTitle}</span>
                  </div>
                  <button className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors">
                    {s.cta}
                  </button>
                </div>
                <div className="hidden md:block w-40 shrink-0">
                  <div className="grid grid-cols-2 gap-2">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="rounded-lg aspect-square flex items-center justify-center text-lg"
                        style={{
                          backgroundColor:
                            i % 3 === 0
                              ? "#312E8120"
                              : i % 3 === 1
                              ? "#10B98120"
                              : "#6366F120",
                          border: "1px solid",
                          borderColor:
                            i % 3 === 0
                              ? "#312E8140"
                              : i % 3 === 1
                              ? "#10B98140"
                              : "#6366F140",
                        }}
                      >
                        {["📊", "⚙️", "🤖", "💡", "📈", "🔗", "🛡️", "🗄️"][i]}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* ── ROI CALCULATOR ──────────────────────────────────────────────────── */}
      <section className="bg-[#0f0d1f] py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
            {isUk ? "Калькулятор ROI" : "ROI Calculator"}
          </h2>
          <p className="text-indigo-300 text-sm text-center mb-10">
            {isUk
              ? "Дізнайтеся, скільки заощадить автоматизація у вашому бізнесі"
              : "Discover how much automation saves for your business"}
          </p>

          <div className="bg-[#1a1535] border border-indigo-800/40 rounded-2xl p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {/* industry */}
                <div>
                  <label className="block text-xs text-indigo-400 uppercase tracking-wider mb-2">
                    {isUk ? "Галузь" : "Industry"}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {industries.map((ind) => (
                      <button
                        key={ind.value}
                        onClick={() =>
                          setRoiInputs((p) => ({ ...p, industry: ind.value }))
                        }
                        className={`py-2 px-3 rounded-xl text-sm font-medium border transition-all ${
                          roiInputs.industry === ind.value
                            ? "bg-indigo-600 border-indigo-500 text-white"
                            : "bg-indigo-950/50 border-indigo-800/40 text-indigo-300 hover:border-indigo-600"
                        }`}
                      >
                        {ind.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* employees slider */}
                <div>
                  <label className="block text-xs text-indigo-400 uppercase tracking-wider mb-2">
                    {isUk ? `Кількість співробітників: ${roiInputs.employees}` : `Employees: ${roiInputs.employees}`}
                  </label>
                  <input
                    type="range"
                    min={10}
                    max={5000}
                    step={10}
                    value={roiInputs.employees}
                    onChange={(e) =>
                      setRoiInputs((p) => ({ ...p, employees: Number(e.target.value) }))
                    }
                    className="w-full accent-indigo-500"
                  />
                  <div className="flex justify-between text-xs text-indigo-500 mt-1">
                    <span>10</span>
                    <span>5000</span>
                  </div>
                </div>

                {/* hours slider */}
                <div>
                  <label className="block text-xs text-indigo-400 uppercase tracking-wider mb-2">
                    {isUk
                      ? `Ручні процеси (год/місяць): ${roiInputs.hours}`
                      : `Manual process hours/month: ${roiInputs.hours}`}
                  </label>
                  <input
                    type="range"
                    min={10}
                    max={2000}
                    step={10}
                    value={roiInputs.hours}
                    onChange={(e) =>
                      setRoiInputs((p) => ({ ...p, hours: Number(e.target.value) }))
                    }
                    className="w-full accent-indigo-500"
                  />
                  <div className="flex justify-between text-xs text-indigo-500 mt-1">
                    <span>10</span>
                    <span>2000</span>
                  </div>
                </div>

                <button
                  onClick={calcRoi}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  {isUk ? "Розрахувати" : "Calculate"}
                </button>
              </div>

              {/* result panel */}
              <div className="flex flex-col justify-center">
                {roiResult ? (
                  <div className="space-y-4">
                    <div className="bg-indigo-950/60 border border-indigo-700/30 rounded-xl p-5 text-center">
                      <p className="text-xs text-indigo-400 uppercase tracking-wider mb-2">
                        {isUk ? "Економія годин/місяць" : "Hours saved / month"}
                      </p>
                      <p className="text-4xl font-extrabold text-indigo-400">
                        {roiResult.savedHours.toLocaleString()}
                      </p>
                      <p className="text-indigo-500 text-xs mt-1">
                        {isUk ? "годин" : "hours"}
                      </p>
                    </div>
                    <div className="bg-green-950/40 border border-green-700/30 rounded-xl p-5 text-center">
                      <p className="text-xs text-green-400 uppercase tracking-wider mb-2">
                        {isUk ? "Економія на рік" : "Annual savings"}
                      </p>
                      <p className="text-4xl font-extrabold text-green-400">
                        ₴{roiResult.savedMoney.toLocaleString()}
                      </p>
                    </div>
                    <div className="mt-4">
                      <p className="text-xs text-indigo-400 mb-2">
                        {isUk
                          ? "Отримати детальний аналіз:"
                          : "Get detailed analysis:"}
                      </p>
                      {roiSubmitted ? (
                        <p className="text-green-400 text-sm font-medium">
                          {isUk ? "Дякуємо! Надішлемо протягом 24 год." : "Thanks! We'll send it within 24 hrs."}
                        </p>
                      ) : (
                        <div className="flex gap-2">
                          <input
                            type="email"
                            value={roiEmail}
                            onChange={(e) => setRoiEmail(e.target.value)}
                            placeholder={isUk ? "ваш@email.com" : "your@email.com"}
                            className="flex-1 bg-indigo-950/60 border border-indigo-700/40 rounded-xl px-3 py-2 text-sm text-white placeholder-indigo-500 focus:outline-none focus:border-indigo-500"
                          />
                          <button
                            onClick={() => roiEmail && setRoiSubmitted(true)}
                            className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
                          >
                            {isUk ? "Надіслати" : "Send"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-indigo-500">
                    <div className="text-5xl mb-4">📊</div>
                    <p className="text-sm">
                      {isUk
                        ? "Заповніть параметри та натисніть «Розрахувати»"
                        : "Fill in the parameters and click Calculate"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TECH STACK MAP ──────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          {isUk ? "Технологічний стек" : "Tech Stack Map"}
        </h2>
        <p className="text-indigo-300 text-sm text-center mb-8">
          {isUk
            ? "Фільтруйте за галуззю, щоб побачити рекомендований стек"
            : "Filter by industry to see the recommended stack"}
        </p>

        {/* industry filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <button
            onClick={() => setActiveTechFilter("all")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
              activeTechFilter === "all"
                ? "bg-indigo-600 border-indigo-500 text-white"
                : "bg-transparent border-indigo-700/40 text-indigo-300 hover:border-indigo-500"
            }`}
          >
            {isUk ? "Всі" : "All"}
          </button>
          {industries.map((ind) => (
            <button
              key={ind.value}
              onClick={() => setActiveTechFilter(ind.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                activeTechFilter === ind.value
                  ? "bg-indigo-600 border-indigo-500 text-white"
                  : "bg-transparent border-indigo-700/40 text-indigo-300 hover:border-indigo-500"
              }`}
            >
              {ind.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTech.map((cat) => (
            <div
              key={cat.id}
              className="bg-[#1a1535] border border-indigo-800/40 rounded-2xl p-5"
            >
              <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider mb-4">
                {cat.label}
              </h3>
              <div className="space-y-2">
                {cat.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-3 bg-indigo-950/40 rounded-xl px-3 py-2"
                  >
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-indigo-400 truncate">{item.use}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CASE STUDIES ────────────────────────────────────────────────────── */}
      <section className="bg-[#0f0d1f] py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
            {isUk ? "Кейси" : "Case Studies"}
          </h2>
          <p className="text-indigo-300 text-sm text-center mb-10">
            {isUk ? "Реальні результати наших клієнтів" : "Real results from our clients"}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cases.map((c, i) => (
              <div
                key={i}
                className="bg-[#1a1535] border border-indigo-800/40 rounded-2xl p-5 flex flex-col gap-3"
              >
                <div
                  className="text-xs font-bold px-2 py-1 rounded-full self-start"
                  style={{
                    backgroundColor: c.color + "22",
                    color: c.color,
                    border: `1px solid ${c.color}44`,
                  }}
                >
                  {c.industry}
                </div>
                <div>
                  <p className="text-xs text-indigo-400 mb-1">
                    {isUk ? "Проблема" : "Problem"}
                  </p>
                  <p className="text-sm text-indigo-200">{c.problem}</p>
                </div>
                <div>
                  <p className="text-xs text-indigo-400 mb-1">
                    {isUk ? "Рішення" : "Solution"}
                  </p>
                  <p className="text-sm font-semibold text-white">{c.solution}</p>
                </div>
                <div className="mt-auto pt-3 border-t border-indigo-800/30 grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-red-950/30 rounded-lg p-2 border border-red-900/20">
                    <p className="text-red-400 font-mono">{c.before}</p>
                  </div>
                  <div className="bg-green-950/30 rounded-lg p-2 border border-green-900/20">
                    <p className="text-green-400 font-mono">{c.after}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ────────────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          {isUk ? "Команда" : "Team"}
        </h2>
        <p className="text-indigo-300 text-sm text-center mb-10">
          {isUk
            ? "Сертифіковані фахівці з досвідом у Fortune 500"
            : "Certified specialists with Fortune 500 experience"}
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {team.map((m, i) => (
            <div
              key={i}
              className="bg-[#1a1535] border border-indigo-800/40 rounded-2xl p-5 flex items-start gap-4"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-lg font-bold shrink-0"
                style={{
                  background:
                    i % 2 === 0
                      ? "linear-gradient(135deg,#312E81,#6366F1)"
                      : "linear-gradient(135deg,#065f46,#10B981)",
                }}
              >
                {m.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-sm text-white">{m.name}</p>
                <p className="text-indigo-400 text-xs mb-2">{m.role}</p>
                <div className="flex flex-wrap gap-1">
                  {m.certs.map((cert) => (
                    <span
                      key={cert}
                      className="text-xs bg-indigo-900/60 border border-indigo-700/40 text-indigo-300 px-2 py-0.5 rounded-full"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
                <p className="text-indigo-500 text-xs mt-2">
                  {isUk ? `Досвід: ${m.exp}` : `Experience: ${m.exp}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FREE DIAGNOSIS FORM ─────────────────────────────────────────────── */}
      <section className="bg-[#0f0d1f] py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
            {isUk ? "Безкоштовна діагностика" : "Free Diagnosis"}
          </h2>
          <p className="text-indigo-300 text-sm text-center mb-10">
            {isUk
              ? "Заповніть форму — ми підготуємо персональний звіт і зателефонуємо"
              : "Fill in the form — we'll prepare a personalised report and call you"}
          </p>

          {diagnosisSubmitted ? (
            <div className="bg-green-950/40 border border-green-700/40 rounded-2xl p-10 text-center">
              <div className="text-4xl mb-4">✅</div>
              <p className="text-green-400 font-bold text-lg mb-2">
                {isUk ? "Дякуємо! Заявку отримано." : "Thank you! Request received."}
              </p>
              <p className="text-green-300/70 text-sm">
                {isUk
                  ? "Підтвердження надійшло на вашу адресу. Чекайте дзвінка."
                  : "A confirmation was sent to your address. Expect a call soon."}
              </p>
            </div>
          ) : (
            <div className="bg-[#1a1535] border border-indigo-800/40 rounded-2xl p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-xs text-indigo-400 uppercase tracking-wider mb-2">
                    {isUk ? "Компанія" : "Company"}
                  </label>
                  <input
                    type="text"
                    value={diagnosisForm.company}
                    onChange={(e) =>
                      setDiagnosisForm((p) => ({ ...p, company: e.target.value }))
                    }
                    placeholder={isUk ? "Назва компанії" : "Company name"}
                    className="w-full bg-indigo-950/60 border border-indigo-700/40 rounded-xl px-4 py-2.5 text-sm text-white placeholder-indigo-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-indigo-400 uppercase tracking-wider mb-2">
                    {isUk ? "Галузь" : "Industry"}
                  </label>
                  <select
                    value={diagnosisForm.industry}
                    onChange={(e) =>
                      setDiagnosisForm((p) => ({ ...p, industry: e.target.value }))
                    }
                    className="w-full bg-indigo-950/60 border border-indigo-700/40 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="">
                      {isUk ? "Оберіть галузь" : "Select industry"}
                    </option>
                    {diagIndustries.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-indigo-400 uppercase tracking-wider mb-2">
                    {isUk ? "Кількість співробітників" : "Number of employees"}
                  </label>
                  <select
                    value={diagnosisForm.employees}
                    onChange={(e) =>
                      setDiagnosisForm((p) => ({ ...p, employees: e.target.value }))
                    }
                    className="w-full bg-indigo-950/60 border border-indigo-700/40 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="">
                      {isUk ? "Оберіть розмір" : "Select size"}
                    </option>
                    {[
                      isUk ? "1–10" : "1–10",
                      isUk ? "11–50" : "11–50",
                      isUk ? "51–200" : "51–200",
                      isUk ? "201–1000" : "201–1000",
                      isUk ? "1000+" : "1000+",
                    ].map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-indigo-400 uppercase tracking-wider mb-2">
                    {isUk ? "Контактний e-mail / телефон" : "Contact email / phone"}
                  </label>
                  <input
                    type="text"
                    value={diagnosisForm.contact}
                    onChange={(e) =>
                      setDiagnosisForm((p) => ({ ...p, contact: e.target.value }))
                    }
                    placeholder={isUk ? "email або +380..." : "email or +380..."}
                    className="w-full bg-indigo-950/60 border border-indigo-700/40 rounded-xl px-4 py-2.5 text-sm text-white placeholder-indigo-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* pain point */}
              <div className="mb-5">
                <label className="block text-xs text-indigo-400 uppercase tracking-wider mb-2">
                  {isUk ? "Головний біль бізнесу" : "Main business pain point"}
                </label>
                <div className="flex flex-wrap gap-2">
                  {painOptions.map((p) => (
                    <button
                      key={p}
                      onClick={() =>
                        setDiagnosisForm((prev) => ({ ...prev, pain: p }))
                      }
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                        diagnosisForm.pain === p
                          ? "bg-indigo-600 border-indigo-500 text-white"
                          : "bg-transparent border-indigo-700/40 text-indigo-300 hover:border-indigo-500"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* slot picker */}
              <div className="mb-6">
                <label className="block text-xs text-indigo-400 uppercase tracking-wider mb-2">
                  {isUk
                    ? "Оберіть зручний час дзвінка (UTC+2)"
                    : "Pick a convenient call time (UTC+2)"}
                </label>
                <div className="flex flex-wrap gap-2">
                  {slots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`px-4 py-1.5 rounded-xl text-sm font-mono border transition-all ${
                        selectedSlot === slot
                          ? "bg-green-600 border-green-500 text-white"
                          : "bg-indigo-950/50 border-indigo-700/40 text-indigo-300 hover:border-indigo-500"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  if (diagnosisForm.contact) setDiagnosisSubmitted(true);
                }}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                {isUk ? "Відправити заявку" : "Submit Request"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="bg-[#0D0B1F] border-t border-indigo-900/40 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-7 h-7 rounded-lg bg-linear-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-xs font-bold shrink-0">
                  DS
                </span>
                <span className="font-bold text-white">DigitalShift</span>
              </div>
              <p className="text-indigo-400 text-xs leading-relaxed">
                {isUk
                  ? "Цифрова трансформація для амбітного бізнесу."
                  : "Digital transformation for ambitious business."}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-3">
                {isUk ? "Послуги" : "Services"}
              </p>
              <ul className="space-y-1.5 text-xs text-indigo-400">
                {["ERP", "CRM", isUk ? "Автоматизація" : "Automation", "AI", isUk ? "Аналітика" : "Analytics"].map((s) => (
                  <li key={s} className="hover:text-indigo-200 cursor-pointer transition-colors">
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-3">
                {isUk ? "Технології" : "Technologies"}
              </p>
              <ul className="space-y-1.5 text-xs text-indigo-400">
                {["SAP", "Salesforce", "Power BI", "UiPath", "OpenAI"].map((t) => (
                  <li key={t} className="hover:text-indigo-200 cursor-pointer transition-colors">
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-3">
                {isUk ? "Контакти" : "Contact"}
              </p>
              <ul className="space-y-1.5 text-xs text-indigo-400">
                <li>info@digitalshift.ua</li>
                <li>+380 44 000 00 00</li>
                <li>{isUk ? "Київ, Україна" : "Kyiv, Ukraine"}</li>
                <li className="hover:text-indigo-200 cursor-pointer transition-colors">
                  LinkedIn
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-indigo-900/40 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-indigo-500">
            <p>© 2025 DigitalShift. {isUk ? "Всі права захищено." : "All rights reserved."}</p>
            <div className="flex gap-4">
              {[
                isUk ? "Конфіденційність" : "Privacy",
                isUk ? "Умови" : "Terms",
                isUk ? "Сертифікати" : "Certificates",
              ].map((l) => (
                <span key={l} className="hover:text-indigo-300 cursor-pointer transition-colors">
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* pulse keyframes */}
      <style>{`
        @keyframes pulse {
          from { transform: scale(1); opacity: 0.5; }
          to { transform: scale(1.3); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
