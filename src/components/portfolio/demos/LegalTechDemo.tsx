"use client";

import { useState } from "react";

export function LegalTechDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [activeService, setActiveService] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizComplete, setQuizComplete] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizEmail, setQuizEmail] = useState("");
  const [activeTool, setActiveTool] = useState(0);
  const [trainingForm, setTrainingForm] = useState({ size: "", tools: "", goals: "" });
  const [consultForm, setConsultForm] = useState({ company: "", firmType: "", painPoint: "", teamSize: "", contact: "" });
  const [quizEmailSent, setQuizEmailSent] = useState(false);
  const [trainingSubmitted, setTrainingSubmitted] = useState(false);
  const [consultSubmitted, setConsultSubmitted] = useState(false);

  // --- SERVICES DATA ---
  const services = [
    {
      tab: isUk ? "Автоматизація документів" : "Document Automation",
      icon: "📄",
      problem: isUk
        ? "Юристи витрачають до 40% часу на складання стандартних документів вручну — договорів, NDA, листів."
        : "Lawyers spend up to 40% of their time manually drafting standard documents — contracts, NDAs, letters.",
      solution: isUk
        ? "Впроваджуємо CLM-платформи, smart-шаблони та електронний підпис. Документ — за хвилини, не години."
        : "We implement CLM platforms, smart templates, and e-signature. A document in minutes, not hours.",
      whatYouGet: isUk
        ? ["CLM-система (Contract Lifecycle Management)", "Бібліотека шаблонів 200+ документів", "Інтеграція e-підпису (DocuSign / Diia.Sign)", "Автоматичні нагадування про дедлайни", "Журнал версій та погоджень"]
        : ["CLM system (Contract Lifecycle Management)", "Template library of 200+ documents", "E-signature integration (DocuSign / Diia.Sign)", "Automatic deadline reminders", "Version and approval log"],
      caseRef: isUk ? "Кейс: Юрфірма 25 юристів — -67% часу на договори" : "Case: 25-lawyer firm — -67% time on contracts",
    },
    {
      tab: isUk ? "Управління практикою" : "Practice Management",
      icon: "⚖️",
      problem: isUk
        ? "Справи в таблицях Excel, білінг у блокноті, клієнти телефонують у неробочий час — хаос замість системи."
        : "Cases in Excel sheets, billing in notebooks, clients calling off-hours — chaos instead of a system.",
      solution: isUk
        ? "Впроваджуємо Clio, MyCase або Filevine під конкретний тип практики. Усе в одному місці: справи, час, виставлення рахунків."
        : "We implement Clio, MyCase, or Filevine for your specific practice type. Everything in one place: cases, time, billing.",
      whatYouGet: isUk
        ? ["Налаштована Practice Management система", "Портал клієнта (24/7 доступ до статусу справи)", "Автоматичний тайм-трекінг", "Інтеграція з бухгалтерією", "Мобільний доступ для виїзних консультацій"]
        : ["Configured Practice Management system", "Client portal (24/7 case status access)", "Automatic time tracking", "Accounting integration", "Mobile access for field consultations"],
      caseRef: isUk ? "Кейс: Адвокатське бюро — +34% зібраних платежів" : "Case: Law office — +34% collected payments",
    },
    {
      tab: isUk ? "AI-дослідження" : "AI Legal Research",
      icon: "🤖",
      problem: isUk
        ? "Пошук прецедентів і аналіз судової практики займає дні. Молодші юристи роблять помилки через обсяг матеріалу."
        : "Finding precedents and analyzing case law takes days. Junior lawyers make errors due to material volume.",
      solution: isUk
        ? "Інтегруємо Harvey AI та Lexis+ AI у робочий процес. Глибокий аналіз — за годину замість тижня."
        : "We integrate Harvey AI and Lexis+ AI into workflows. Deep analysis in an hour instead of a week.",
      whatYouGet: isUk
        ? ["Harvey AI для складання документів та аналізу", "Lexis+ AI для пошуку прецедентів", "Навчання команди роботі з AI-промптами", "Шаблони промптів для 12 типів юридичних завдань", "Протокол верифікації AI-результатів"]
        : ["Harvey AI for drafting and analysis", "Lexis+ AI for precedent research", "Team training on AI prompts", "Prompt templates for 12 legal task types", "AI result verification protocol"],
      caseRef: isUk ? "Кейс: Корпоративна практика — -72% часу на due diligence" : "Case: Corporate practice — -72% due diligence time",
    },
    {
      tab: "eDiscovery",
      icon: "🔍",
      problem: isUk
        ? "Тисячі документів для огляду перед судом. Ручний процес — дорого, повільно, вразливо до помилок."
        : "Thousands of documents to review before litigation. Manual process — expensive, slow, error-prone.",
      solution: isUk
        ? "Налаштовуємо eDiscovery платформи з AI-класифікацією. Скорочення обсягу перегляду на 80%."
        : "We configure eDiscovery platforms with AI classification. Review volume reduction by 80%.",
      whatYouGet: isUk
        ? ["Платформа eDiscovery (Relativity / Everlaw)", "AI-класифікація та предиктивне кодування", "Ланцюжок хранення доказів (chain of custody)", "Звіти для суду у встановленому форматі", "Навчання litigation-команди"]
        : ["eDiscovery platform (Relativity / Everlaw)", "AI classification and predictive coding", "Chain of custody documentation", "Court-ready reports in required format", "Litigation team training"],
      caseRef: isUk ? "Кейс: Litigation-бутік — -80% документів для ручного перегляду" : "Case: Litigation boutique — -80% documents for manual review",
    },
    {
      tab: isUk ? "Дані та комплаєнс" : "Data & Compliance",
      icon: "🛡️",
      problem: isUk
        ? "GDPR, Закон про персональні дані, NIS2 — штрафи до €20M. Більшість фірм не знають своїх ризиків."
        : "GDPR, Personal Data Law, NIS2 — fines up to €20M. Most firms don't know their exposure.",
      solution: isUk
        ? "Проводимо GDPR-аудит, будуємо систему комплаєнсу та автоматизуємо звітність."
        : "We conduct GDPR audits, build compliance systems, and automate reporting.",
      whatYouGet: isUk
        ? ["GDPR / NIS2 gap-аналіз", "Реєстр операцій обробки (ROPA)", "Шаблони DPA та Privacy Notice", "Автоматизована звітність для DPO", "Щорічний аудит комплаєнсу"]
        : ["GDPR / NIS2 gap analysis", "Record of Processing Activities (ROPA)", "DPA and Privacy Notice templates", "Automated DPO reporting", "Annual compliance audit"],
      caseRef: isUk ? "Кейс: Міжнародна фірма — 0 штрафів за 3 роки після аудиту" : "Case: International firm — 0 fines in 3 years post-audit",
    },
  ];

  // --- QUIZ DATA ---
  const quizCategories = [
    {
      name: isUk ? "Документи" : "Documents",
      questions: [
        {
          id: 0,
          text: isUk ? "Як ваша фірма складає типові договори?" : "How does your firm draft standard contracts?",
          options: [
            isUk ? "Вручну з нуля щоразу" : "Manually from scratch each time",
            isUk ? "З шаблонів Word / Google Docs" : "From Word / Google Docs templates",
            isUk ? "Автоматизована CLM-система" : "Automated CLM system",
          ],
        },
        {
          id: 1,
          text: isUk ? "Як організовано зберігання документів?" : "How is document storage organized?",
          options: [
            isUk ? "Локальні папки / флешки" : "Local folders / USB drives",
            isUk ? "Хмарне сховище (Google Drive, SharePoint)" : "Cloud storage (Google Drive, SharePoint)",
            isUk ? "DMS з контролем версій та доступу" : "DMS with version control and access management",
          ],
        },
        {
          id: 2,
          text: isUk ? "Як підписуються документи з клієнтами?" : "How are documents signed with clients?",
          options: [
            isUk ? "Виключно на паперових оригіналах" : "Only on paper originals",
            isUk ? "PDF з підписом від руки або скан" : "PDF with handwritten signature or scan",
            isUk ? "Кваліфікований електронний підпис" : "Qualified electronic signature",
          ],
        },
      ],
    },
    {
      name: isUk ? "Комунікація та білінг" : "Communication & Billing",
      questions: [
        {
          id: 3,
          text: isUk ? "Як відстежується час юристів?" : "How is lawyer time tracked?",
          options: [
            isUk ? "Не відстежується або вручну" : "Not tracked or manually",
            isUk ? "Таблиці Excel / Google Sheets" : "Excel / Google Sheets",
            isUk ? "Автоматичний тайм-трекінг у PMS" : "Automatic time tracking in PMS",
          ],
        },
        {
          id: 4,
          text: isUk ? "Як виставляються рахунки клієнтам?" : "How are invoices sent to clients?",
          options: [
            isUk ? "Вручну в Word або Excel" : "Manually in Word or Excel",
            isUk ? "Бухгалтерська програма (1С, Fin7)" : "Accounting software (1C, Fin7)",
            isUk ? "Автоматично з PMS із деталізацією часу" : "Automatically from PMS with time detail",
          ],
        },
        {
          id: 5,
          text: isUk ? "Чи є у клієнтів портал для відстеження справ?" : "Do clients have a portal to track case progress?",
          options: [
            isUk ? "Ні, тільки дзвінки та email" : "No, only calls and email",
            isUk ? "Надсилаємо звіти на запит" : "We send reports on request",
            isUk ? "Так, клієнтський портал 24/7" : "Yes, 24/7 client portal",
          ],
        },
        {
          id: 6,
          text: isUk ? "Як опрацьовуються вхідні звернення?" : "How are incoming inquiries handled?",
          options: [
            isUk ? "Email або телефон, без системи" : "Email or phone, no system",
            isUk ? "CRM загального призначення" : "General-purpose CRM",
            isUk ? "Legal CRM із автоматизацією intake" : "Legal CRM with intake automation",
          ],
        },
      ],
    },
    {
      name: isUk ? "Дослідження та комплаєнс" : "Research & Compliance",
      questions: [
        {
          id: 7,
          text: isUk ? "Як проводиться пошук судової практики?" : "How is case law research conducted?",
          options: [
            isUk ? "Google та безкоштовні реєстри" : "Google and free registries",
            isUk ? "Платні правові бази (Ліга, Законодавство)" : "Paid legal databases (Liga, Zakonodavstvo)",
            isUk ? "AI-платформа (Harvey, Lexis+ AI)" : "AI platform (Harvey, Lexis+ AI)",
          ],
        },
        {
          id: 8,
          text: isUk ? "Як відстежуються зміни в законодавстві?" : "How are legislative changes tracked?",
          options: [
            isUk ? "Вручну, коли з'являється потреба" : "Manually when needed",
            isUk ? "Email-розсилки та новини" : "Email newsletters and news",
            isUk ? "Автоматичні сповіщення через Legal Intelligence" : "Automatic alerts via Legal Intelligence",
          ],
        },
        {
          id: 9,
          text: isUk ? "Який рівень GDPR-комплаєнсу у фірмі?" : "What is your firm's GDPR compliance level?",
          options: [
            isUk ? "Не впевнені / не займалися" : "Unsure / not addressed",
            isUk ? "Базова Privacy Policy та згода" : "Basic Privacy Policy and consent",
            isUk ? "Повний ROPA, DPO, DPA з постачальниками" : "Full ROPA, DPO, DPA with vendors",
          ],
        },
      ],
    },
  ];

  const allQuestions = quizCategories.flatMap((c) => c.questions);
  const totalQuestions = allQuestions.length;

  function handleQuizAnswer(qId: number, val: number) {
    setQuizAnswers((prev) => ({ ...prev, [qId]: val }));
  }

  function calculateScore() {
    const answered = Object.values(quizAnswers);
    if (answered.length < totalQuestions) return;
    const total = answered.reduce((sum, v) => sum + (v + 1), 0);
    const score = Math.round((total / totalQuestions) * 10) / 10;
    setQuizScore(score);
    setQuizComplete(true);
  }

  function getMaturityLabel(score: number) {
    if (score < 1.7)
      return isUk ? "Початковий рівень" : "Entry Level";
    if (score < 2.4)
      return isUk ? "Розвивається" : "Developing";
    return isUk ? "Просунутий" : "Advanced";
  }

  function getMaturityColor(score: number) {
    if (score < 1.7) return "#D97706";
    if (score < 2.4) return "#059669";
    return "#064E3B";
  }

  function getNextSteps(score: number): string[] {
    if (score < 1.7)
      return isUk
        ? ["Запровадити CLM і базові шаблони", "Налаштувати хмарний DMS", "Почати з простої Practice Management (Clio Starter)", "Провести GDPR-аудит"]
        : ["Implement CLM and basic templates", "Set up cloud DMS", "Start with simple Practice Management (Clio Starter)", "Conduct GDPR audit"];
    if (score < 2.4)
      return isUk
        ? ["Upgrade до повноцінного PMS із клієнтським порталом", "Інтегрувати AI для досліджень (Lexis+ AI)", "Автоматизувати білінг і тайм-трекінг", "Розширити GDPR до повного ROPA"]
        : ["Upgrade to full PMS with client portal", "Integrate AI for research (Lexis+ AI)", "Automate billing and time tracking", "Expand GDPR to full ROPA"];
    return isUk
      ? ["Оптимізувати Harvey AI для складних справ", "Запровадити predictive analytics для ціноутворення", "Розглянути eDiscovery платформу для litigation", "Сертифікація команди ISO 27001"]
      : ["Optimize Harvey AI for complex matters", "Implement predictive analytics for pricing", "Consider eDiscovery platform for litigation", "Team ISO 27001 certification"];
  }

  // --- AI TOOLS DATA ---
  const aiTools = [
    {
      name: "Harvey AI",
      logo: "⚡",
      tagline: isUk ? "AI-помічник юриста нового покоління" : "Next-generation AI lawyer assistant",
      what: isUk
        ? "Складає договори, меморандуми, аналізує ризики в документах. Навчений на юридичних текстах."
        : "Drafts contracts, memos, analyzes document risks. Trained on legal texts.",
      can: isUk
        ? ["Генерувати чернетки договорів за промптом", "Аналізувати ризики в контрактах", "Перекладати юридичні тексти", "Готувати огляди судової практики"]
        : ["Generate contract drafts from prompts", "Analyze contract risks", "Translate legal texts", "Prepare case law overviews"],
      cannot: isUk
        ? ["Замінити юридичну перевірку — завжди потрібна верифікація", "Давати остаточні правові висновки", "Отримувати доступ до реального часу судових реєстрів"]
        : ["Replace legal review — verification always required", "Provide final legal opinions", "Access real-time court registries"],
      cta: isUk ? "Забронювати демо Harvey" : "Book Harvey Demo",
    },
    {
      name: "Clio Duo",
      logo: "⚙️",
      tagline: isUk ? "AI всередині вашої PMS" : "AI inside your PMS",
      what: isUk
        ? "AI-шар поверх Clio. Підсумовує справи, формує завдання, аналізує білінг і прогнозує ризики дедлайнів."
        : "AI layer on top of Clio. Summarizes matters, creates tasks, analyzes billing and predicts deadline risks.",
      can: isUk
        ? ["Підсумовувати переписку по справі", "Автоматично фіксувати час на основі активності", "Прогнозувати перевитрати бюджету", "Генерувати завдання зі зустрічей"]
        : ["Summarize matter communications", "Auto-capture time from activity", "Predict budget overruns", "Generate tasks from meetings"],
      cannot: isUk
        ? ["Працювати без активної ліцензії Clio", "Давати незалежні правові поради", "Замінити стратегічне рішення юриста"]
        : ["Work without an active Clio license", "Give independent legal advice", "Replace lawyer strategic judgment"],
      cta: isUk ? "Забронювати демо Clio Duo" : "Book Clio Duo Demo",
    },
    {
      name: "Lexis+ AI",
      logo: "📚",
      tagline: isUk ? "AI-пошук у найбільшій правовій базі" : "AI search in the largest legal database",
      what: isUk
        ? "LexisNexis з AI-помічником. Природномовний пошук прецедентів, огляд законодавства, Shepardize автоматично."
        : "LexisNexis with AI assistant. Natural language precedent search, legislation review, Shepardize automatically.",
      can: isUk
        ? ["Шукати прецеденти природною мовою", "Автоматично перевіряти актуальність рішень", "Генерувати огляди досліджень з цитатами", "Аналізувати судову статистику по судді / суду"]
        : ["Search precedents in natural language", "Auto-check decision currency", "Generate research summaries with citations", "Analyze judicial statistics by judge / court"],
      cannot: isUk
        ? ["Охоплювати всі юрисдикції рівномірно", "Гарантувати 100% повноту пошуку", "Оцінювати тактичну стратегію"]
        : ["Cover all jurisdictions equally", "Guarantee 100% search completeness", "Evaluate tactical strategy"],
      cta: isUk ? "Забронювати демо Lexis+ AI" : "Book Lexis+ AI Demo",
    },
    {
      name: "ContractPodAi",
      logo: "📋",
      tagline: isUk ? "Повний CLM з вбудованим AI" : "Full CLM with built-in AI",
      what: isUk
        ? "Платформа для управління договірним циклом — від запиту до архіву. AI перевіряє відхилення від стандартів."
        : "Contract lifecycle management platform — from request to archive. AI flags deviations from standards.",
      can: isUk
        ? ["Автоматизувати весь CLM-цикл", "Виявляти нестандартні умови в договорах", "Управляти зобов'язаннями та дедлайнами", "Інтегруватися з Salesforce, SAP, DocuSign"]
        : ["Automate the full CLM lifecycle", "Detect non-standard contract terms", "Manage obligations and deadlines", "Integrate with Salesforce, SAP, DocuSign"],
      cannot: isUk
        ? ["Повністю замінити договірного юриста", "Обробляти дуже нестандартні транзакції без налаштування", "Давати висновки щодо ризику без верифікації"]
        : ["Fully replace a contracts lawyer", "Handle highly non-standard transactions without customization", "Provide risk conclusions without verification"],
      cta: isUk ? "Забронювати демо ContractPodAi" : "Book ContractPodAi Demo",
    },
  ];

  // --- TRAINING DATA ---
  const trainingFormats = [
    {
      title: isUk ? "Південний воркшоп" : "Half-Day Workshop",
      duration: isUk ? "4 години" : "4 hours",
      icon: "🕐",
      audience: isUk ? "До 15 учасників" : "Up to 15 participants",
      focus: isUk ? "Одна тема: CLM / PMS / AI-дослідження" : "One topic: CLM / PMS / AI research",
      format: isUk ? "Практичні вправи + Q&A" : "Hands-on exercises + Q&A",
      outcome: isUk ? "Готові до роботи з конкретним інструментом" : "Ready to work with a specific tool",
      price: isUk ? "від €800" : "from €800",
    },
    {
      title: isUk ? "Одноденний тренінг" : "1-Day Training",
      duration: isUk ? "8 годин" : "8 hours",
      icon: "🎯",
      audience: isUk ? "До 20 учасників" : "Up to 20 participants",
      focus: isUk ? "Повний стек: документи + PMS + AI" : "Full stack: documents + PMS + AI",
      format: isUk ? "Кейси + симуляція + сертифікат" : "Cases + simulation + certificate",
      outcome: isUk ? "Системне розуміння LegalTech-екосистеми" : "Systemic understanding of LegalTech ecosystem",
      price: isUk ? "від €1,800" : "from €1,800",
    },
    {
      title: isUk ? "3-денний інтенсив" : "3-Day Intensive",
      duration: isUk ? "24 години" : "24 hours",
      icon: "🚀",
      audience: isUk ? "До 12 учасників" : "Up to 12 participants",
      focus: isUk ? "Трансформація практики: аудит → план → впровадження" : "Practice transformation: audit → plan → implementation",
      format: isUk ? "Консультації + впровадження + підтримка 30 днів" : "Consulting + implementation + 30-day support",
      outcome: isUk ? "Готова дорожня карта LegalTech для фірми" : "Ready LegalTech roadmap for the firm",
      price: isUk ? "від €4,500" : "from €4,500",
    },
  ];

  // --- CASE STUDIES DATA ---
  const cases = [
    {
      firmType: isUk ? "Корпоративний бутік (8 юристів)" : "Corporate boutique (8 lawyers)",
      problem: isUk ? "Договори складалися вручну, 3-4 год на стандартний M&A NDA" : "Contracts drafted manually, 3–4 hrs per standard M&A NDA",
      tool: "ContractPodAi + DocuSign",
      result: isUk ? "-78% часу на договори, 0 помилок у стандартних умовах" : "-78% contract time, 0 errors in standard terms",
      improvement: 78,
    },
    {
      firmType: isUk ? "Юридична фірма повного циклу (25 юристів)" : "Full-service law firm (25 lawyers)",
      problem: isUk ? "Хаотичний білінг, 18% неоплачених годин щомісяця" : "Chaotic billing, 18% unbilled hours monthly",
      tool: "Clio Manage + Clio Duo",
      result: isUk ? "+34% зібраних платежів, -90% часу на виставлення рахунків" : "+34% collected payments, -90% billing time",
      improvement: 34,
    },
    {
      firmType: isUk ? "Litigation-практика (5 партнерів)" : "Litigation practice (5 partners)",
      problem: isUk ? "eDiscovery вручну — 3 тижні на перегляд 50,000 документів" : "Manual eDiscovery — 3 weeks to review 50,000 documents",
      tool: "Relativity + AI predictive coding",
      result: isUk ? "-80% документів для ручного перегляду, скорочення з 3 тижнів до 4 днів" : "-80% documents for manual review, 3 weeks to 4 days",
      improvement: 80,
    },
    {
      firmType: isUk ? "In-house команда (FinTech, 12 юристів)" : "In-house team (FinTech, 12 lawyers)",
      problem: isUk ? "GDPR-штраф €120K через відсутність ROPA та DPA з постачальниками" : "€120K GDPR fine due to missing ROPA and DPA with vendors",
      tool: isUk ? "GDPR-аудит + OneTrust" : "GDPR audit + OneTrust",
      result: isUk ? "0 штрафів за 3 роки, повна відповідність NIS2" : "0 fines in 3 years, full NIS2 compliance",
      improvement: 100,
    },
    {
      firmType: isUk ? "Сімейна практика (3 юристи)" : "Family law practice (3 lawyers)",
      problem: isUk ? "Клієнти дзвонили о 22:00 з питаннями про статус справи" : "Clients calling at 10 PM asking about case status",
      tool: "MyCase + Client Portal",
      result: isUk ? "-65% вхідних дзвінків, 4.9/5 задоволеність клієнтів" : "-65% inbound calls, 4.9/5 client satisfaction",
      improvement: 65,
    },
    {
      firmType: isUk ? "Міжнародна практика (40 юристів, 3 офіси)" : "International practice (40 lawyers, 3 offices)",
      problem: isUk ? "Due diligence тривав 3+ тижні, потрібні були 4 юристи на кожен проект" : "Due diligence took 3+ weeks, needed 4 lawyers per project",
      tool: "Harvey AI + Lexis+ AI",
      result: isUk ? "-72% часу, 2 юристи замість 4 на проект" : "-72% time, 2 lawyers instead of 4 per project",
      improvement: 72,
    },
  ];

  // --- TEAM DATA ---
  const team = [
    {
      name: "James Thornton",
      role: isUk ? "Засновник, LegalTech-стратег" : "Founder, LegalTech Strategist",
      bg: isUk ? "15 р. корпоративна практика, ex-Clifford Chance" : "15 yrs corporate practice, ex-Clifford Chance",
      certs: ["Clio Certified Consultant", "Harvey AI Partner", "IAPP CIPP/E"],
      avatar: "JT",
    },
    {
      name: "Olena Marchenko",
      role: isUk ? "Директор з впровадження" : "Implementation Director",
      bg: isUk ? "10 р. PMS-впровадження в 60+ фірмах" : "10 yrs PMS implementation in 60+ firms",
      certs: ["Clio Gold Partner", "MyCase Certified", "Filevine Expert"],
      avatar: "OM",
    },
    {
      name: "Dr. Stefan Brauer",
      role: isUk ? "Керівник AI-практики" : "AI Practice Lead",
      bg: isUk ? "PhD Computer Science, 8 р. AI в Legal" : "PhD Computer Science, 8 yrs AI in Legal",
      certs: ["Harvey AI Certified Trainer", "Lexis+ AI Expert", "Stanford AI Certificate"],
      avatar: "SB",
    },
    {
      name: "Natalie Osei",
      role: isUk ? "Спеціаліст з комплаєнсу" : "Compliance Specialist",
      bg: isUk ? "GDPR-аудит 80+ компаній, ex-EY Legal" : "GDPR audit 80+ companies, ex-EY Legal",
      certs: ["IAPP CIPP/E", "CIPM", "ISO 27001 Lead Auditor"],
      avatar: "NO",
    },
    {
      name: "Marco Visser",
      role: isUk ? "Тренер LegalTech" : "LegalTech Trainer",
      bg: isUk ? "500+ навчених юристів у 8 країнах" : "500+ trained lawyers in 8 countries",
      certs: ["ICF Certified Coach", "Clio Certified Trainer", "ILTACON Speaker"],
      avatar: "MV",
    },
  ];

  const answeredCount = Object.keys(quizAnswers).length;
  const progressPct = Math.round((answeredCount / totalQuestions) * 100);

  return (
    <div className="bg-white font-sans text-[#064E3B] min-h-screen">
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="bg-linear-to-br from-[#064E3B] to-[#022C22] text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#D97706]/20 border border-[#D97706]/40 rounded-full px-4 py-1.5 text-sm text-[#FCD34D] mb-6">
              <span>⚖️</span>
              <span>{isUk ? "LegalTech-консалтинг" : "LegalTech Consulting"}</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-5">
              {isUk ? (
                <>Юридична практика.<br /><span className="text-[#D97706]">Технологічна ефективність.</span></>
              ) : (
                <>Legal Practice.<br /><span className="text-[#D97706]">Technological Efficiency.</span></>
              )}
            </h1>
            <p className="text-[#A7F3D0] text-lg mb-8 leading-relaxed">
              {isUk
                ? "Допомагаємо юридичним фірмам упроваджувати автоматизацію документів, AI-дослідження та системи управління практикою. Технологія, яка підсилює юриста — а не замінює його."
                : "We help law firms implement document automation, AI research, and practice management systems. Technology that amplifies the lawyer — not replaces them."}
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <button className="bg-[#D97706] hover:bg-[#B45309] text-white font-semibold px-7 py-3 rounded-lg transition-colors">
                {isUk ? "Пройти LegalTech-аудит" : "Take LegalTech Audit"}
              </button>
              <button className="border border-white/40 hover:border-white text-white px-7 py-3 rounded-lg transition-colors">
                {isUk ? "Наші кейси" : "Our Cases"}
              </button>
            </div>
            {/* Trust badges */}
            <div className="flex flex-wrap gap-6">
              {[
                { val: "60+", label: isUk ? "юридичних фірм" : "law firms" },
                { val: isUk ? "Clio & Harvey AI" : "Clio & Harvey AI", label: isUk ? "офіційні партнери" : "official partners" },
                { val: "8", label: isUk ? "років у LegalTech" : "years in LegalTech" },
              ].map((b, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold text-[#D97706]">{b.val}</div>
                  <div className="text-xs text-[#A7F3D0]">{b.label}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Right — decorative card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
            <div className="text-sm text-[#A7F3D0] mb-4 font-medium uppercase tracking-widest">
              {isUk ? "Де ваша фірма зараз?" : "Where is your firm today?"}
            </div>
            {[
              { label: isUk ? "Автоматизація документів" : "Document Automation", pct: 72 },
              { label: isUk ? "Управління практикою" : "Practice Management", pct: 58 },
              { label: isUk ? "AI-дослідження" : "AI Research", pct: 34 },
              { label: isUk ? "Комплаєнс" : "Compliance", pct: 45 },
            ].map((item) => (
              <div key={item.label} className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white">{item.label}</span>
                  <span className="text-[#D97706] font-semibold">{item.pct}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full">
                  <div
                    className="h-2 bg-linear-to-br from-[#D97706] to-[#F59E0B] rounded-full"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
            <p className="text-xs text-[#6EE7B7] mt-4">
              {isUk
                ? "Середній рівень впровадження LegalTech серед фірм Центральної Європи (2025)"
                : "Average LegalTech adoption among Central European firms (2025)"}
            </p>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#F0FDF4]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#064E3B] mb-3">
              {isUk ? "Наші послуги" : "Our Services"}
            </h2>
            <p className="text-[#065F46] max-w-xl mx-auto">
              {isUk
                ? "Від автоматизації рутини до впровадження AI — комплексний супровід цифрової трансформації юридичної фірми."
                : "From routine automation to AI implementation — comprehensive digital transformation support for law firms."}
            </p>
          </div>
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {services.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveService(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  activeService === i
                    ? "bg-[#064E3B] text-white"
                    : "bg-white border border-[#064E3B]/20 text-[#064E3B] hover:bg-[#064E3B]/5"
                }`}
              >
                <span>{s.icon}</span>
                <span>{s.tab}</span>
              </button>
            ))}
          </div>
          {/* Active service panel */}
          {(() => {
            const s = services[activeService];
            return (
              <div className="bg-white rounded-2xl border border-[#064E3B]/10 p-8 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-[#D97706] font-semibold mb-2">
                      {isUk ? "Проблема" : "Problem"}
                    </div>
                    <p className="text-[#064E3B] leading-relaxed">{s.problem}</p>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-[#D97706] font-semibold mb-2">
                      {isUk ? "Рішення" : "Solution"}
                    </div>
                    <p className="text-[#064E3B] leading-relaxed">{s.solution}</p>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-[#D97706] font-semibold mb-2">
                      {isUk ? "Що ви отримуєте" : "What you get"}
                    </div>
                    <ul className="space-y-1.5">
                      {s.whatYouGet.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-[#064E3B]">
                          <span className="text-[#D97706] shrink-0 mt-0.5">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-[#064E3B]/10 flex items-center justify-between flex-wrap gap-4">
                  <span className="text-sm text-[#065F46] italic">{s.caseRef}</span>
                  <button className="bg-[#064E3B] hover:bg-[#022C22] text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">
                    {isUk ? "Обговорити проект" : "Discuss Project"}
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* ── LEGALTECH MATURITY ASSESSMENT ────────────────────────────── */}
      <section className="py-20 bg-white dark:bg-neutral-950">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#064E3B] mb-3">
              {isUk ? "Оцінка зрілості LegalTech" : "LegalTech Maturity Assessment"}
            </h2>
            <p className="text-[#065F46]">
              {isUk
                ? "10 запитань — дізнайтеся, де ваша фірма порівняно з ринком"
                : "10 questions — find out where your firm stands against the market"}
            </p>
          </div>

          {!quizComplete ? (
            <>
              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-[#065F46] mb-2">
                  <span>{isUk ? `Відповідей: ${answeredCount} / ${totalQuestions}` : `Answered: ${answeredCount} / ${totalQuestions}`}</span>
                  <span>{progressPct}%</span>
                </div>
                <div className="h-2 bg-[#D1FAE5] rounded-full">
                  <div
                    className="h-2 bg-[#064E3B] rounded-full transition-all"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>

              {/* Categories */}
              {quizCategories.map((cat) => (
                <div key={cat.name} className="mb-10">
                  <h3 className="text-lg font-semibold text-[#064E3B] mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-[#D97706] rounded-full inline-block" />
                    {cat.name}
                  </h3>
                  {cat.questions.map((q) => (
                    <div key={q.id} className="bg-[#F0FDF4] rounded-xl p-5 mb-4 border border-[#064E3B]/10">
                      <p className="font-medium text-[#064E3B] mb-4">{q.text}</p>
                      <div className="flex flex-col gap-2">
                        {q.options.map((opt, optIdx) => (
                          <button
                            key={optIdx}
                            onClick={() => handleQuizAnswer(q.id, optIdx)}
                            className={`text-left px-4 py-3 rounded-lg text-sm border transition-colors ${
                              quizAnswers[q.id] === optIdx
                                ? "bg-[#064E3B] text-white border-[#064E3B]"
                                : "bg-white border-[#064E3B]/20 text-[#064E3B] hover:border-[#064E3B]/50"
                            }`}
                          >
                            <span className="font-medium mr-2">{optIdx + 1}.</span>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}

              <div className="text-center">
                <button
                  onClick={calculateScore}
                  disabled={answeredCount < totalQuestions}
                  className="bg-[#D97706] hover:bg-[#B45309] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold px-10 py-4 rounded-xl text-lg transition-colors"
                >
                  {isUk ? "Отримати результат" : "Get My Score"}
                </button>
                {answeredCount < totalQuestions && (
                  <p className="text-sm text-gray-400 dark:text-neutral-500 mt-2">
                    {isUk
                      ? `Залишилось ${totalQuestions - answeredCount} запитань`
                      : `${totalQuestions - answeredCount} questions remaining`}
                  </p>
                )}
              </div>
            </>
          ) : (
            /* Results */
            <div className="bg-[#F0FDF4] rounded-2xl border border-[#064E3B]/10 p-8">
              <div className="text-center mb-8">
                <div
                  className="text-7xl font-bold mb-2"
                  style={{ color: getMaturityColor(quizScore) }}
                >
                  {quizScore.toFixed(1)}
                </div>
                <div className="text-xl font-semibold text-[#064E3B] mb-1">
                  {getMaturityLabel(quizScore)}
                </div>
                <div className="text-sm text-[#065F46]">
                  {isUk
                    ? `Ваш бал: ${quizScore.toFixed(1)} / Середній по ринку: 2.8`
                    : `Your score: ${quizScore.toFixed(1)} / Market average: 2.8`}
                </div>
              </div>

              {/* Score bar comparison */}
              <div className="bg-white rounded-xl p-5 mb-6 border border-[#064E3B]/10">
                <div className="relative h-6 bg-[#D1FAE5] rounded-full">
                  {/* Market average marker */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-[#065F46]"
                    style={{ left: `${((2.8 - 1) / 2) * 100}%` }}
                  />
                  {/* User score */}
                  <div
                    className="absolute top-0 h-6 rounded-full transition-all"
                    style={{
                      width: `${((quizScore - 1) / 2) * 100}%`,
                      backgroundColor: getMaturityColor(quizScore),
                      opacity: 0.7,
                    }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 text-xs font-bold text-white"
                    style={{ left: `${Math.max(4, ((quizScore - 1) / 2) * 100 - 4)}%` }}
                  >
                    {quizScore.toFixed(1)}
                  </div>
                </div>
                <div className="flex justify-between text-xs text-[#065F46] mt-1">
                  <span>1.0</span>
                  <span>{isUk ? "Середній: 2.8" : "Avg: 2.8"}</span>
                  <span>3.0</span>
                </div>
              </div>

              {/* Next steps */}
              <div className="mb-6">
                <h4 className="font-semibold text-[#064E3B] mb-3">
                  {isUk ? "Рекомендовані наступні кроки:" : "Recommended next steps:"}
                </h4>
                <ul className="space-y-2">
                  {getNextSteps(quizScore).map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#064E3B]">
                      <span className="text-[#D97706] font-bold shrink-0">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="bg-[#064E3B] rounded-xl p-5 text-white">
                <p className="font-medium mb-3">
                  {isUk ? "Обговоримо ваші результати з експертом?" : "Discuss your results with an expert?"}
                </p>
                {!quizEmailSent ? (
                  <div className="flex gap-3 flex-wrap">
                    <input
                      type="email"
                      value={quizEmail}
                      onChange={(e) => setQuizEmail(e.target.value)}
                      placeholder={isUk ? "Ваш email" : "Your email"}
                      className="flex-1 min-w-[200px] bg-white/10 border border-white/30 rounded-lg px-4 py-2.5 text-white placeholder-white/50 text-sm focus:outline-none focus:border-[#D97706]"
                    />
                    <button
                      onClick={() => { if (quizEmail) setQuizEmailSent(true); }}
                      className="bg-[#D97706] hover:bg-[#B45309] px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                    >
                      {isUk ? "Обговорити результати" : "Discuss Results"}
                    </button>
                  </div>
                ) : (
                  <p className="text-[#A7F3D0] text-sm">
                    {isUk
                      ? "Дякуємо! Наш консультант зв'яжеться з вами протягом 24 годин."
                      : "Thank you! Our consultant will reach out within 24 hours."}
                  </p>
                )}
              </div>

              <button
                onClick={() => { setQuizComplete(false); setQuizAnswers({}); setQuizEmailSent(false); setQuizEmail(""); }}
                className="mt-4 text-sm text-[#065F46] hover:text-[#064E3B] underline"
              >
                {isUk ? "Пройти ще раз" : "Retake assessment"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── AI FOR LAWYERS ───────────────────────────────────────────── */}
      <section className="py-20 bg-linear-to-br from-[#064E3B] to-[#022C22] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">
              {isUk ? "AI для юристів" : "AI for Lawyers"}
            </h2>
            <p className="text-[#A7F3D0] max-w-xl mx-auto">
              {isUk
                ? "Реалістичний огляд чотирьох провідних AI-інструментів: що вони можуть і чого не можуть."
                : "A realistic overview of four leading AI tools: what they can and cannot do."}
            </p>
          </div>
          {/* Tool tabs */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {aiTools.map((tool, i) => (
              <button
                key={i}
                onClick={() => setActiveTool(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  activeTool === i
                    ? "bg-[#D97706] text-white"
                    : "bg-white/10 text-[#A7F3D0] hover:bg-white/20"
                }`}
              >
                <span>{tool.logo}</span>
                <span>{tool.name}</span>
              </button>
            ))}
          </div>
          {(() => {
            const t = aiTools[activeTool];
            return (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="text-4xl shrink-0">{t.logo}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{t.name}</h3>
                    <p className="text-[#D97706]">{t.tagline}</p>
                  </div>
                </div>
                <p className="text-[#A7F3D0] mb-8 leading-relaxed">{t.what}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white/5 rounded-xl p-5 border border-[#064E3B]/30">
                    <h4 className="font-semibold text-[#6EE7B7] mb-3 flex items-center gap-2">
                      <span>✓</span>
                      {isUk ? "Що може" : "What it can do"}
                    </h4>
                    <ul className="space-y-2">
                      {t.can.map((item, j) => (
                        <li key={j} className="text-sm text-[#A7F3D0] flex items-start gap-2">
                          <span className="text-[#6EE7B7] shrink-0">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white/5 rounded-xl p-5 border border-[#B45309]/30">
                    <h4 className="font-semibold text-[#FCD34D] mb-3 flex items-center gap-2">
                      <span>✗</span>
                      {isUk ? "Що не може" : "What it cannot do"}
                    </h4>
                    <ul className="space-y-2">
                      {t.cannot.map((item, j) => (
                        <li key={j} className="text-sm text-[#A7F3D0] flex items-start gap-2">
                          <span className="text-[#FCD34D] shrink-0">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <button className="bg-[#D97706] hover:bg-[#B45309] text-white font-semibold px-8 py-3 rounded-xl transition-colors">
                  {t.cta}
                </button>
              </div>
            );
          })()}
        </div>
      </section>

      {/* ── TRAINING PROGRAMS ────────────────────────────────────────── */}
      <section className="py-20 bg-white dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#064E3B] mb-3">
              {isUk ? "Навчальні програми" : "Training Programs"}
            </h2>
            <p className="text-[#065F46] max-w-xl mx-auto">
              {isUk
                ? "Навчаємо юристів і операційні команди ефективно використовувати LegalTech-інструменти."
                : "We train lawyers and operations teams to use LegalTech tools effectively."}
            </p>
          </div>
          {/* Training formats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {trainingFormats.map((tf, i) => (
              <div key={i} className="bg-[#F0FDF4] rounded-2xl border border-[#064E3B]/10 p-6 flex flex-col">
                <div className="text-3xl mb-3">{tf.icon}</div>
                <h3 className="text-lg font-bold text-[#064E3B] mb-1">{tf.title}</h3>
                <div className="text-[#D97706] font-semibold text-sm mb-4">{tf.duration} · {tf.audience}</div>
                <div className="space-y-2 text-sm text-[#065F46] flex-1">
                  <p><span className="font-medium">{isUk ? "Тема:" : "Focus:"}</span> {tf.focus}</p>
                  <p><span className="font-medium">{isUk ? "Формат:" : "Format:"}</span> {tf.format}</p>
                  <p><span className="font-medium">{isUk ? "Результат:" : "Outcome:"}</span> {tf.outcome}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-[#064E3B]/10 flex items-center justify-between">
                  <span className="text-[#064E3B] font-semibold">{tf.price}</span>
                  <button className="text-sm text-[#D97706] hover:text-[#B45309] font-medium">
                    {isUk ? "Запросити →" : "Request →"}
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Online course */}
          <div className="bg-linear-to-br from-[#064E3B] to-[#022C22] rounded-2xl p-8 text-white mb-12">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <div className="text-xs text-[#A7F3D0] uppercase tracking-widest mb-2">
                  {isUk ? "Онлайн-курс" : "Online Course"}
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  {isUk ? "LegalTech для практикуючих юристів" : "LegalTech for Practicing Lawyers"}
                </h3>
                <p className="text-[#A7F3D0] text-sm max-w-lg">
                  {isUk
                    ? "8 модулів · 24 год · Сертифікат · Власний темп. Охоплює CLM, PMS, AI-дослідження, eDiscovery та комплаєнс."
                    : "8 modules · 24 hrs · Certificate · Self-paced. Covers CLM, PMS, AI research, eDiscovery and compliance."}
                </p>
              </div>
              <button className="bg-[#D97706] hover:bg-[#B45309] text-white font-semibold px-8 py-3 rounded-xl transition-colors shrink-0">
                {isUk ? "Дізнатися більше" : "Learn More"}
              </button>
            </div>
          </div>
          {/* Training request form */}
          <div className="bg-[#F0FDF4] rounded-2xl border border-[#064E3B]/10 p-8">
            <h3 className="text-xl font-bold text-[#064E3B] mb-6">
              {isUk ? "Замовити навчання" : "Request Training"}
            </h3>
            {!trainingSubmitted ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#064E3B] mb-1">
                    {isUk ? "Розмір команди" : "Team size"}
                  </label>
                  <select
                    value={trainingForm.size}
                    onChange={(e) => setTrainingForm({ ...trainingForm, size: e.target.value })}
                    className="w-full border border-[#064E3B]/20 rounded-lg px-3 py-2.5 text-[#064E3B] text-sm focus:outline-none focus:border-[#064E3B] bg-white"
                  >
                    <option value="">{isUk ? "Оберіть..." : "Select..."}</option>
                    <option>1–5</option>
                    <option>6–20</option>
                    <option>21–50</option>
                    <option>50+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#064E3B] mb-1">
                    {isUk ? "Інструменти" : "Tools"}
                  </label>
                  <select
                    value={trainingForm.tools}
                    onChange={(e) => setTrainingForm({ ...trainingForm, tools: e.target.value })}
                    className="w-full border border-[#064E3B]/20 rounded-lg px-3 py-2.5 text-[#064E3B] text-sm focus:outline-none focus:border-[#064E3B] bg-white"
                  >
                    <option value="">{isUk ? "Оберіть..." : "Select..."}</option>
                    <option>Clio</option>
                    <option>Harvey AI</option>
                    <option>Lexis+ AI</option>
                    <option>ContractPodAi</option>
                    <option>{isUk ? "Інший" : "Other"}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#064E3B] mb-1">
                    {isUk ? "Ціль навчання" : "Training goal"}
                  </label>
                  <input
                    type="text"
                    value={trainingForm.goals}
                    onChange={(e) => setTrainingForm({ ...trainingForm, goals: e.target.value })}
                    placeholder={isUk ? "Наприклад: впровадження Clio" : "e.g. Clio onboarding"}
                    className="w-full border border-[#064E3B]/20 rounded-lg px-3 py-2.5 text-[#064E3B] text-sm focus:outline-none focus:border-[#064E3B] placeholder-gray-400"
                  />
                </div>
                <div className="md:col-span-3">
                  <button
                    onClick={() => { if (trainingForm.size && trainingForm.tools) setTrainingSubmitted(true); }}
                    className="bg-[#064E3B] hover:bg-[#022C22] text-white font-semibold px-8 py-3 rounded-xl transition-colors"
                  >
                    {isUk ? "Надіслати заявку" : "Submit Request"}
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-[#065F46]">
                {isUk
                  ? "Дякуємо! Ми зв'яжемося з вами протягом одного робочого дня для узгодження деталей."
                  : "Thank you! We will contact you within one business day to finalize details."}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ─────────────────────────────────────────────── */}
      <section className="py-20 bg-[#F0FDF4]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#064E3B] mb-3">
              {isUk ? "Кейси клієнтів" : "Client Case Studies"}
            </h2>
            <p className="text-[#065F46] max-w-xl mx-auto">
              {isUk
                ? "Реальні результати (анонімізовані за запитом клієнтів)."
                : "Real results (anonymized per client request)."}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((c, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#064E3B]/10 p-6 flex flex-col shadow-sm">
                <div className="text-xs font-medium text-[#D97706] uppercase tracking-widest mb-3">
                  {c.firmType}
                </div>
                <p className="text-sm text-[#064E3B] mb-3 flex-1 leading-relaxed">
                  <span className="font-semibold">{isUk ? "Проблема: " : "Problem: "}</span>
                  {c.problem}
                </p>
                <div className="text-xs text-[#065F46] bg-[#F0FDF4] rounded-lg px-3 py-2 mb-3">
                  <span className="font-medium">{isUk ? "Інструмент: " : "Tool: "}</span>
                  {c.tool}
                </div>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-[#064E3B] flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {c.improvement}%
                  </div>
                  <p className="text-sm text-[#064E3B] font-medium">{c.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#064E3B] mb-3">
              {isUk ? "Наша команда" : "Our Team"}
            </h2>
            <p className="text-[#065F46] max-w-xl mx-auto">
              {isUk
                ? "Юристи, які стали технологами. Технологи, які говорять мовою права."
                : "Lawyers who became technologists. Technologists who speak the language of law."}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {team.map((m, i) => (
              <div key={i} className="bg-[#F0FDF4] rounded-2xl border border-[#064E3B]/10 p-5 text-center">
                <div className="w-14 h-14 rounded-full bg-[#064E3B] text-white font-bold text-lg flex items-center justify-center mx-auto mb-3">
                  {m.avatar}
                </div>
                <h3 className="font-bold text-[#064E3B] text-sm mb-0.5">{m.name}</h3>
                <p className="text-[#D97706] text-xs font-medium mb-2">{m.role}</p>
                <p className="text-xs text-[#065F46] mb-3 leading-relaxed">{m.bg}</p>
                <div className="flex flex-wrap gap-1 justify-center">
                  {m.certs.map((cert, j) => (
                    <span key={j} className="bg-[#064E3B]/10 text-[#064E3B] text-[10px] px-2 py-0.5 rounded-full">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONSULTATION FORM ────────────────────────────────────────── */}
      <section className="py-20 bg-linear-to-br from-[#064E3B] to-[#022C22] text-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">
              {isUk ? "Безкоштовна консультація" : "Free Consultation"}
            </h2>
            <p className="text-[#A7F3D0]">
              {isUk
                ? "Розкажіть про вашу фірму — ми підготуємо персоналізоване рішення."
                : "Tell us about your firm — we will prepare a personalised solution."}
            </p>
          </div>
          {!consultSubmitted ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-[#A7F3D0] mb-1">
                  {isUk ? "Назва фірми" : "Firm name"}
                </label>
                <input
                  type="text"
                  value={consultForm.company}
                  onChange={(e) => setConsultForm({ ...consultForm, company: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#D97706]"
                  placeholder={isUk ? "Smith & Partners LLC" : "Smith & Partners LLC"}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#A7F3D0] mb-1">
                  {isUk ? "Тип практики" : "Practice type"}
                </label>
                <select
                  value={consultForm.firmType}
                  onChange={(e) => setConsultForm({ ...consultForm, firmType: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#D97706]"
                >
                  <option value="" className="text-gray-900">{isUk ? "Оберіть..." : "Select..."}</option>
                  <option className="text-gray-900">{isUk ? "Корпоративна практика" : "Corporate"}</option>
                  <option className="text-gray-900">{isUk ? "Litigation" : "Litigation"}</option>
                  <option className="text-gray-900">{isUk ? "Сімейне право" : "Family Law"}</option>
                  <option className="text-gray-900">{isUk ? "In-house" : "In-house"}</option>
                  <option className="text-gray-900">{isUk ? "Інше" : "Other"}</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#A7F3D0] mb-1">
                  {isUk ? "Головна проблема" : "Main pain point"}
                </label>
                <select
                  value={consultForm.painPoint}
                  onChange={(e) => setConsultForm({ ...consultForm, painPoint: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#D97706]"
                >
                  <option value="" className="text-gray-900">{isUk ? "Оберіть..." : "Select..."}</option>
                  <option className="text-gray-900">{isUk ? "Ручне складання документів" : "Manual document drafting"}</option>
                  <option className="text-gray-900">{isUk ? "Хаотичний білінг і тайм-трекінг" : "Chaotic billing and time tracking"}</option>
                  <option className="text-gray-900">{isUk ? "Повільні юридичні дослідження" : "Slow legal research"}</option>
                  <option className="text-gray-900">{isUk ? "Ризики GDPR / комплаєнс" : "GDPR / compliance risks"}</option>
                  <option className="text-gray-900">{isUk ? "eDiscovery" : "eDiscovery"}</option>
                  <option className="text-gray-900">{isUk ? "Загальна цифровізація" : "General digitisation"}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#A7F3D0] mb-1">
                  {isUk ? "Розмір команди" : "Team size"}
                </label>
                <select
                  value={consultForm.teamSize}
                  onChange={(e) => setConsultForm({ ...consultForm, teamSize: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#D97706]"
                >
                  <option value="" className="text-gray-900">{isUk ? "Оберіть..." : "Select..."}</option>
                  <option className="text-gray-900">1–5</option>
                  <option className="text-gray-900">6–20</option>
                  <option className="text-gray-900">21–50</option>
                  <option className="text-gray-900">50+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#A7F3D0] mb-1">
                  {isUk ? "Email або телефон" : "Email or phone"}
                </label>
                <input
                  type="text"
                  value={consultForm.contact}
                  onChange={(e) => setConsultForm({ ...consultForm, contact: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#D97706]"
                  placeholder={isUk ? "you@firm.com" : "you@firm.com"}
                />
              </div>
              <div className="md:col-span-2 text-center">
                <button
                  onClick={() => {
                    if (consultForm.company && consultForm.firmType && consultForm.contact) {
                      setConsultSubmitted(true);
                    }
                  }}
                  className="bg-[#D97706] hover:bg-[#B45309] text-white font-semibold px-12 py-4 rounded-xl text-lg transition-colors"
                >
                  {isUk ? "Отримати безкоштовну консультацію" : "Get Free Consultation"}
                </button>
                <p className="text-xs text-[#6EE7B7] mt-3">
                  {isUk ? "Відповідаємо протягом 24 годин у робочі дні" : "We respond within 24 hours on business days"}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white/10 rounded-2xl p-10 text-center border border-white/20">
              <div className="text-5xl mb-4">⚖️</div>
              <h3 className="text-2xl font-bold mb-3">
                {isUk ? "Заявку отримано!" : "Request received!"}
              </h3>
              <p className="text-[#A7F3D0]">
                {isUk
                  ? "Наш LegalTech-консультант зв'яжеться з вами протягом 24 годин для узгодження безкоштовної консультації."
                  : "Our LegalTech consultant will reach out within 24 hours to schedule your free consultation."}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <footer className="bg-[#022C22] text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-[#D97706] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">L</span>
                </div>
                <span className="text-xl font-bold">LegalTech Partners</span>
              </div>
              <p className="text-[#A7F3D0] text-sm leading-relaxed max-w-xs">
                {isUk
                  ? "Цифрова трансформація юридичних фірм. Технологія, яка підсилює юриста."
                  : "Digital transformation for law firms. Technology that amplifies the lawyer."}
              </p>
              <div className="flex gap-3 mt-5">
                {["Clio Gold Partner", "Harvey AI Partner", "IAPP Member"].map((badge) => (
                  <span key={badge} className="bg-[#064E3B] text-[#A7F3D0] text-[10px] px-2.5 py-1 rounded-full border border-[#065F46]">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">{isUk ? "Послуги" : "Services"}</h4>
              <ul className="space-y-2 text-sm text-[#A7F3D0]">
                {services.map((s) => (
                  <li key={s.tab}>
                    <a href="#" className="hover:text-white transition-colors">{s.tab}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">{isUk ? "Компанія" : "Company"}</h4>
              <ul className="space-y-2 text-sm text-[#A7F3D0]">
                {[
                  isUk ? "Про нас" : "About Us",
                  isUk ? "Кейси" : "Cases",
                  isUk ? "Команда" : "Team",
                  isUk ? "Блог" : "Blog",
                  isUk ? "Контакти" : "Contact",
                ].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-[#6EE7B7]">
            <span>© 2025 LegalTech Partners. {isUk ? "Усі права захищено." : "All rights reserved."}</span>
            <div className="flex gap-5">
              <a href="#" className="hover:text-white transition-colors">{isUk ? "Конфіденційність" : "Privacy Policy"}</a>
              <a href="#" className="hover:text-white transition-colors">{isUk ? "Умови" : "Terms"}</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
