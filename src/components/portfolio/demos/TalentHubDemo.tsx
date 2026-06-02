"use client";

import { useState } from "react";

export function TalentHubDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  // Hero toggle
  const [heroMode, setHeroMode] = useState<"candidate" | "company">("candidate");

  // Job board filters
  const [activeSpec, setActiveSpec] = useState("All");
  const [activeFormat, setActiveFormat] = useState("All");
  const [activeExp, setActiveExp] = useState("All");
  const [salaryMin, setSalaryMin] = useState(1000);

  // Job detail panel
  const [selectedJob, setSelectedJob] = useState<number | null>(null);

  // Saved jobs
  const [savedJobs, setSavedJobs] = useState<number[]>([]);

  // Salary calculator
  const [calcRole, setCalcRole] = useState("Frontend Developer");
  const [calcExp, setCalcExp] = useState("Mid");

  // For Companies tab
  const [pricingTier, setPricingTier] = useState<"Basic" | "Pro" | "Enterprise">("Pro");

  // How It Works tab
  const [howTab, setHowTab] = useState<"candidates" | "companies">("candidates");

  // Newsletter
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // --- DATA ---

  const jobs = [
    {
      id: 1,
      company: "🟦",
      companyName: "Sigma Software",
      title: "Senior Frontend Developer",
      spec: "Frontend",
      stack: ["React", "TypeScript", "Next.js", "GraphQL"],
      salaryMin: 4500,
      salaryMax: 6500,
      format: "Remote",
      exp: "Senior",
      description: isUk
        ? "Ми шукаємо досвідченого Frontend-розробника для роботи над складними SaaS-продуктами. Ви будете тісно співпрацювати з продукт-менеджерами та дизайнерами."
        : "We are looking for an experienced Frontend Developer to work on complex SaaS products. You will collaborate closely with product managers and designers.",
      requirements: ["5+ years React", "TypeScript proficiency", "REST & GraphQL APIs", "Performance optimization"],
      niceToHave: ["Next.js SSR/SSG", "Testing (Jest/RTL)", "Design systems"],
      benefits: ["Remote-first", "Flexible hours", "Health insurance", "30 days PTO", "L&D budget $1,500/yr"],
      dayInLife: [
        isUk ? "Ранкова синхронізація команди (15 хв)" : "Morning team sync (15 min)",
        isUk ? "Спринт-розробка та code review" : "Sprint development & code reviews",
        isUk ? "Планування з продукт-менеджером" : "Planning session with product manager",
        isUk ? "Технічні дискусії з архітектором" : "Technical discussions with architect",
      ],
    },
    {
      id: 2,
      company: "🟩",
      companyName: "Genesis Tech",
      title: "Backend Engineer (Node.js)",
      spec: "Backend",
      stack: ["Node.js", "PostgreSQL", "Redis", "Docker"],
      salaryMin: 3800,
      salaryMax: 5500,
      format: "Hybrid",
      exp: "Mid",
      description: isUk
        ? "Приєднуйтесь до команди, що будує мікросервісну архітектуру для фінтех-продукту з мільйонами користувачів по всьому світу."
        : "Join a team building microservice architecture for a fintech product with millions of users worldwide.",
      requirements: ["3+ years Node.js", "SQL & NoSQL databases", "REST API design", "CI/CD knowledge"],
      niceToHave: ["Kafka/RabbitMQ", "Kubernetes", "AWS/GCP"],
      benefits: ["Hybrid schedule", "Kyiv office", "Medical insurance", "Corporate events"],
      dayInLife: [
        isUk ? "Стенд-ап та перегляд тікетів" : "Standup & ticket review",
        isUk ? "Розробка API-ендпоінтів" : "API endpoint development",
        isUk ? "Code review колег" : "Peer code reviews",
        isUk ? "Документація та тестування" : "Documentation & testing",
      ],
    },
    {
      id: 3,
      company: "🟥",
      companyName: "Innovecs",
      title: "Full-Stack Developer",
      spec: "Full-Stack",
      stack: ["React", "Node.js", "MongoDB", "AWS"],
      salaryMin: 4000,
      salaryMax: 5800,
      format: "Remote",
      exp: "Mid",
      description: isUk
        ? "Розробляйте end-to-end фічі для платформи управління ланцюжком постачань у міжнародній команді з гнучким графіком."
        : "Develop end-to-end features for a supply chain management platform in an international team with a flexible schedule.",
      requirements: ["React + Node.js", "MongoDB", "AWS basics", "Agile/Scrum"],
      niceToHave: ["TypeScript", "Terraform", "E2E testing"],
      benefits: ["100% remote", "Flexible hours", "Equipment budget", "English classes"],
      dayInLife: [
        isUk ? "Планування фічей" : "Feature planning",
        isUk ? "Frontend + backend розробка" : "Frontend + backend development",
        isUk ? "Інтеграційне тестування" : "Integration testing",
        isUk ? "Демо для стейкхолдерів" : "Stakeholder demo",
      ],
    },
    {
      id: 4,
      company: "🟨",
      companyName: "Ciklum",
      title: "DevOps Engineer",
      spec: "DevOps",
      stack: ["Kubernetes", "Terraform", "AWS", "Jenkins"],
      salaryMin: 4200,
      salaryMax: 6000,
      format: "Remote",
      exp: "Senior",
      description: isUk
        ? "Будуйте та підтримуйте хмарну інфраструктуру для enterprise-клієнтів із США та Великобританії у складі сильної DevOps-команди."
        : "Build and maintain cloud infrastructure for enterprise clients from the US and UK as part of a strong DevOps team.",
      requirements: ["Kubernetes & Helm", "Terraform IaC", "AWS/Azure", "CI/CD pipelines"],
      niceToHave: ["GitOps", "Prometheus/Grafana", "Security hardening"],
      benefits: ["Remote-first", "Home office budget", "Certifications paid", "Flexible schedule"],
      dayInLife: [
        isUk ? "Моніторинг інфраструктури" : "Infrastructure monitoring",
        isUk ? "Оновлення pipeline CI/CD" : "CI/CD pipeline updates",
        isUk ? "Планування ємності" : "Capacity planning",
        isUk ? "Incident review та документація" : "Incident review & docs",
      ],
    },
    {
      id: 5,
      company: "🟪",
      companyName: "Railsware",
      title: "Product Manager (IT)",
      spec: "PM",
      stack: ["Jira", "Figma", "Amplitude", "SQL"],
      salaryMin: 3500,
      salaryMax: 5000,
      format: "Hybrid",
      exp: "Mid",
      description: isUk
        ? "Керуйте продуктовою roadmap для B2B SaaS, координуйте між командами розробки, дизайну та бізнесу."
        : "Manage product roadmap for B2B SaaS, coordinate between development, design, and business teams.",
      requirements: ["3+ years PM", "Agile/Scrum", "Data analysis", "Stakeholder mgmt"],
      niceToHave: ["Technical background", "SQL queries", "UX fundamentals"],
      benefits: ["Hybrid Kyiv", "Company equity", "Annual bonus", "International travel"],
      dayInLife: [
        isUk ? "Пріоритизація беклогу" : "Backlog prioritization",
        isUk ? "Зустрічі зі стейкхолдерами" : "Stakeholder meetings",
        isUk ? "Аналіз метрик продукту" : "Product metrics analysis",
        isUk ? "Планування спринту" : "Sprint planning",
      ],
    },
    {
      id: 6,
      company: "🔶",
      companyName: "SoftServe",
      title: "QA Automation Engineer",
      spec: "QA",
      stack: ["Selenium", "Cypress", "Python", "Jenkins"],
      salaryMin: 2800,
      salaryMax: 4200,
      format: "Office",
      exp: "Junior",
      description: isUk
        ? "Долучайтесь до QA-команди та будуйте автоматизовані тестові фреймворки для великомасштабних enterprise-додатків."
        : "Join the QA team and build automated testing frameworks for large-scale enterprise applications.",
      requirements: ["Cypress or Selenium", "Python/JS scripting", "API testing", "SDLC knowledge"],
      niceToHave: ["Performance testing", "BDD/Gherkin", "CI integration"],
      benefits: ["Lviv office", "Mentorship program", "Training budget", "Team events"],
      dayInLife: [
        isUk ? "Аналіз нових тікетів" : "New ticket analysis",
        isUk ? "Написання автотестів" : "Writing automated tests",
        isUk ? "Запуск регресійного suite" : "Running regression suite",
        isUk ? "Звіт про баги та ретроспектива" : "Bug reporting & retrospective",
      ],
    },
  ];

  const salaryData: Record<string, Record<string, { min: number; max: number; p25: number; p75: number }>> = {
    "Frontend Developer": {
      Junior: { min: 800, max: 1800, p25: 1000, p75: 1600 },
      Mid: { min: 2000, max: 4000, p25: 2500, p75: 3500 },
      Senior: { min: 4000, max: 7000, p25: 4500, p75: 6000 },
    },
    "Backend Developer": {
      Junior: { min: 900, max: 2000, p25: 1100, p75: 1800 },
      Mid: { min: 2200, max: 4500, p25: 2800, p75: 3800 },
      Senior: { min: 4500, max: 8000, p25: 5000, p75: 7000 },
    },
    "Full-Stack Developer": {
      Junior: { min: 1000, max: 2200, p25: 1200, p75: 1900 },
      Mid: { min: 2500, max: 5000, p25: 3000, p75: 4200 },
      Senior: { min: 5000, max: 8500, p25: 5500, p75: 7500 },
    },
    "DevOps Engineer": {
      Junior: { min: 1200, max: 2500, p25: 1500, p75: 2200 },
      Mid: { min: 3000, max: 5500, p25: 3500, p75: 4800 },
      Senior: { min: 5000, max: 9000, p25: 5800, p75: 7800 },
    },
    "Product Manager": {
      Junior: { min: 800, max: 1800, p25: 1000, p75: 1500 },
      Mid: { min: 2000, max: 4000, p25: 2500, p75: 3500 },
      Senior: { min: 3500, max: 6500, p25: 4000, p75: 5500 },
    },
    "QA Engineer": {
      Junior: { min: 700, max: 1500, p25: 800, p75: 1300 },
      Mid: { min: 1800, max: 3500, p25: 2000, p75: 3000 },
      Senior: { min: 3500, max: 6000, p25: 4000, p75: 5200 },
    },
  };

  const companies = [
    { emoji: "🟦", name: "Sigma Software", size: "1,000–5,000", stack: ["React", "Java", ".NET", "AWS"], culture: ["Remote-friendly", "Agile", "International"], openPositions: 23 },
    { emoji: "🟩", name: "Genesis Tech", size: "500–1,000", stack: ["Node.js", "Go", "PostgreSQL", "K8s"], culture: ["Product-first", "Fast-paced", "Equity"], openPositions: 15 },
    { emoji: "🟥", name: "Innovecs", size: "1,000–2,000", stack: ["React", "Python", "AWS", "Microservices"], culture: ["Global team", "Flexible", "L&D focus"], openPositions: 31 },
    { emoji: "🟨", name: "Ciklum", size: "5,000+", stack: ["Java", ".NET", "Angular", "Azure"], culture: ["Enterprise", "Certifications", "Mentorship"], openPositions: 47 },
  ];

  const reviews = [
    {
      name: "Oleksiy M.",
      role: isUk ? "Senior Frontend Developer" : "Senior Frontend Developer",
      company: "Genesis Tech",
      days: 12,
      text: isUk
        ? "TalentHub знайшов мені роботу мрії за 12 днів. Процес був простим та прозорим від початку до кінця."
        : "TalentHub found me my dream job in 12 days. The process was straightforward and transparent from start to finish.",
    },
    {
      name: "Kateryna V.",
      role: isUk ? "Product Manager" : "Product Manager",
      company: "Railsware",
      days: 18,
      text: isUk
        ? "Фільтри зарплат та калькулятор допомогли мені зрозуміти свою ринкову цінність і впевнено вести переговори."
        : "The salary filters and calculator helped me understand my market value and negotiate with confidence.",
    },
    {
      name: "Dmytro S.",
      role: isUk ? "DevOps Engineer" : "DevOps Engineer",
      company: "Ciklum",
      days: 9,
      text: isUk
        ? "Знайшов 3 відповідні вакансії за 5 хвилин. Кнопка Easy Apply — справжній прорив для зайнятих кандидатів."
        : "Found 3 matching jobs in 5 minutes. The Easy Apply button is a game-changer for busy candidates.",
    },
  ];

  const specs = ["All", "Frontend", "Backend", "Full-Stack", "DevOps", "PM", "QA", "Design"];
  const formats = ["All", "Remote", "Hybrid", "Office"];
  const experiences = ["All", "Junior", "Mid", "Senior"];
  const salaryRoles = ["Frontend Developer", "Backend Developer", "Full-Stack Developer", "DevOps Engineer", "Product Manager", "QA Engineer"];
  const expLevels = ["Junior", "Mid", "Senior"];

  const filteredJobs = jobs.filter((j) => {
    if (activeSpec !== "All" && j.spec !== activeSpec) return false;
    if (activeFormat !== "All" && j.format !== activeFormat) return false;
    if (activeExp !== "All" && j.exp !== activeExp) return false;
    if (j.salaryMin < salaryMin) return false;
    return true;
  });

  const currentSalary = salaryData[calcRole]?.[calcExp] ?? { min: 0, max: 0, p25: 0, p75: 0 };
  const maxBar = 9000;

  const selectedJobData = jobs.find((j) => j.id === selectedJob);

  const pricingPlans = [
    {
      name: "Basic",
      price: isUk ? "$49/міс" : "$49/mo",
      features: [
        isUk ? "3 активні вакансії" : "3 active job posts",
        isUk ? "Доступ до бази резюме" : "Resume database access",
        isUk ? "Email-сповіщення" : "Email notifications",
        isUk ? "Базова аналітика" : "Basic analytics",
      ],
    },
    {
      name: "Pro",
      price: isUk ? "$149/міс" : "$149/mo",
      features: [
        isUk ? "Необмежені вакансії" : "Unlimited job posts",
        isUk ? "Пріоритетне розміщення" : "Priority placement",
        isUk ? "ATS-інтеграція" : "ATS integration",
        isUk ? "Розширена аналітика" : "Advanced analytics",
        isUk ? "Підтримка менеджера" : "Dedicated account manager",
      ],
    },
    {
      name: "Enterprise",
      price: isUk ? "Індивідуально" : "Custom",
      features: [
        isUk ? "Необмежені вакансії" : "Unlimited posts",
        isUk ? "API-доступ" : "API access",
        isUk ? "Брендинг сторінки компанії" : "Custom company branding",
        isUk ? "SLA 99.9%" : "SLA 99.9%",
        isUk ? "Виділений менеджер" : "Dedicated manager",
        isUk ? "Масовий рекрутинг" : "Bulk hiring tools",
      ],
    },
  ];

  const candidateSteps = [
    { icon: "📝", title: isUk ? "Створіть профіль" : "Create Profile", desc: isUk ? "Заповніть резюме, навички та бажаний рівень зарплати" : "Fill in your resume, skills, and desired salary" },
    { icon: "🔍", title: isUk ? "Знайдіть вакансії" : "Find Jobs", desc: isUk ? "Використовуйте фільтри для пошуку ідеальної позиції" : "Use filters to find your perfect position" },
    { icon: "📨", title: isUk ? "Подайте заявку" : "Apply Easily", desc: isUk ? "One-click Easy Apply або надішліть персональне повідомлення" : "One-click Easy Apply or send a personal message" },
    { icon: "🎉", title: isUk ? "Отримайте оффер" : "Get Hired", desc: isUk ? "Проведіть переговори та прийміть найкраще рішення" : "Negotiate and accept the best offer" },
  ];

  const companySteps = [
    { icon: "🏢", title: isUk ? "Зареєструйтесь" : "Register", desc: isUk ? "Створіть профіль компанії з культурою та перевагами" : "Create company profile with culture and benefits" },
    { icon: "📋", title: isUk ? "Опублікуйте вакансію" : "Post a Job", desc: isUk ? "Детально опишіть роль, стек та умови роботи" : "Describe the role, stack, and conditions in detail" },
    { icon: "👥", title: isUk ? "Переглядайте кандидатів" : "Review Candidates", desc: isUk ? "Отримуйте відфільтровані заявки з рейтингом відповідності" : "Receive filtered applications with match scores" },
    { icon: "✅", title: isUk ? "Наймайте" : "Hire", desc: isUk ? "Проведіть співбесіди та оформіть оффер прямо в платформі" : "Conduct interviews and send offers right on the platform" },
  ];

  return (
    <div className="bg-white text-gray-900 dark:text-white font-sans min-h-screen">

      {/* ── HEADER ── */}
      <header className="bg-white border-b border-gray-100 dark:border-neutral-700 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xl">💼</span>
              <span className="text-xl font-bold text-indigo-800">Talent<span className="text-orange-500">Hub</span></span>
            </div>
            {/* Nav */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
              <a href="#jobs" className="hover:text-indigo-700 transition-colors">{isUk ? "Вакансії" : "Find Jobs"}</a>
              <a href="#companies" className="hover:text-indigo-700 transition-colors">{isUk ? "Пошук талантів" : "Find Talent"}</a>
              <a href="#company-profiles" className="hover:text-indigo-700 transition-colors">{isUk ? "Компанії" : "Companies"}</a>
              <a href="#how" className="hover:text-indigo-700 transition-colors">{isUk ? "Про нас" : "About"}</a>
            </nav>
            {/* Actions */}
            <div className="flex items-center gap-3">
              <button className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors">
                {isUk ? "📋 Додати вакансію" : "📋 Post a Job"}
              </button>
              <button className="px-4 py-2 rounded-lg border border-indigo-700 text-indigo-700 hover:bg-indigo-50 text-sm font-semibold transition-colors">
                {isUk ? "Увійти" : "Sign In"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── SPLIT HERO ── */}
      <section className="bg-linear-to-br from-indigo-900 via-indigo-800 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          {/* Mode Toggle */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-indigo-950/50 rounded-xl p-1 gap-1">
              <button
                onClick={() => setHeroMode("candidate")}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${heroMode === "candidate" ? "bg-white text-indigo-800 shadow" : "text-indigo-200 hover:text-white"}`}
              >
                👤 {isUk ? "Кандидатам" : "For Candidates"}
              </button>
              <button
                onClick={() => setHeroMode("company")}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${heroMode === "company" ? "bg-white text-indigo-800 shadow" : "text-indigo-200 hover:text-white"}`}
              >
                🏢 {isUk ? "Компаніям" : "For Companies"}
              </button>
            </div>
          </div>

          {heroMode === "candidate" ? (
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
                {isUk ? "Знайди роботу мрії" : "Find Your Dream"}<br />
                <span className="text-orange-400">{isUk ? "в IT-сфері" : "IT Job"}</span>
              </h1>
              <p className="text-indigo-200 text-lg mb-8">
                {isUk ? "Тисячі вакансій від провідних IT-компаній України та світу" : "Thousands of jobs from leading IT companies in Ukraine and worldwide"}
              </p>
              {/* Search bar */}
              <div className="bg-white rounded-2xl p-2 flex flex-col sm:flex-row gap-2 shadow-xl">
                <input
                  type="text"
                  placeholder={isUk ? "🔍 Роль або технологія..." : "🔍 Role or technology..."}
                  className="flex-1 px-4 py-3 text-gray-900 dark:text-white rounded-xl text-sm focus:outline-none"
                />
                <input
                  type="text"
                  placeholder={isUk ? "📍 Місто або Remote" : "📍 City or Remote"}
                  className="flex-1 px-4 py-3 text-gray-900 dark:text-white rounded-xl text-sm focus:outline-none"
                />
                <select className="px-4 py-3 text-gray-600 dark:text-neutral-300 rounded-xl text-sm bg-gray-50 dark:bg-neutral-900 focus:outline-none">
                  <option>{isUk ? "💰 Зарплата" : "💰 Salary"}</option>
                  <option>$1k+</option>
                  <option>$2k+</option>
                  <option>$3k+</option>
                  <option>$5k+</option>
                </select>
                <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl text-sm transition-colors shrink-0">
                  {isUk ? "Пошук" : "Search"}
                </button>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-4 text-sm text-indigo-300">
                <span>{isUk ? "Популярно:" : "Trending:"}</span>
                {["React Developer", "DevOps", "Python", "Product Manager"].map((t) => (
                  <span key={t} className="bg-indigo-700/50 px-3 py-1 rounded-full cursor-pointer hover:bg-indigo-600/50 transition-colors">{t}</span>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
                {isUk ? "Знайдіть IT-таланти" : "Find Tech Talent"}<br />
                <span className="text-orange-400">{isUk ? "швидко та ефективно" : "Fast"}</span>
              </h1>
              <p className="text-indigo-200 text-lg mb-8">
                {isUk ? "3,200+ перевірених IT-фахівців готові до нових можливостей" : "3,200+ vetted IT professionals ready for new opportunities"}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-lg transition-colors shadow-lg">
                  📋 {isUk ? "Опублікувати вакансію" : "Post a Vacancy"}
                </button>
                <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-lg transition-colors border border-white/30">
                  🔍 {isUk ? "Переглянути кандидатів" : "Browse Candidates"}
                </button>
              </div>
              <p className="mt-4 text-indigo-300 text-sm">
                {isUk ? "✅ Середній час до першого оферу — 14 днів" : "✅ Average time to first offer — 14 days"}
              </p>
            </div>
          )}
        </div>

        {/* Stats Bar */}
        <div className="border-t border-indigo-700/50 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { value: "3,200+", label: isUk ? "Кандидатів" : "Candidates" },
                { value: "180", label: isUk ? "Компаній" : "Companies" },
                { value: "94%", label: isUk ? "Успішних наймів" : "Placement Rate" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl sm:text-3xl font-extrabold text-orange-400">{s.value}</div>
                  <div className="text-indigo-300 text-sm mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── JOB BOARD ── */}
      <section id="jobs" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-indigo-900">{isUk ? "Актуальні вакансії" : "Open Positions"}</h2>
            <p className="text-gray-500 dark:text-neutral-400 mt-1">{isUk ? `${filteredJobs.length} вакансій знайдено` : `${filteredJobs.length} positions found`}</p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100 dark:border-neutral-700 space-y-4">
            {/* Specialization */}
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-neutral-400 uppercase tracking-wider mb-2">{isUk ? "Спеціалізація" : "Specialization"}</p>
              <div className="flex flex-wrap gap-2">
                {specs.map((s) => (
                  <button
                    key={s}
                    onClick={() => setActiveSpec(s)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeSpec === s ? "bg-indigo-700 text-white" : "bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-neutral-300 hover:bg-indigo-50 hover:text-indigo-700"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            {/* Format + Experience */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-neutral-400 uppercase tracking-wider mb-2">{isUk ? "Формат" : "Format"}</p>
                <div className="flex flex-wrap gap-2">
                  {formats.map((f) => (
                    <button
                      key={f}
                      onClick={() => setActiveFormat(f)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeFormat === f ? "bg-orange-500 text-white" : "bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-neutral-300 hover:bg-orange-50 hover:text-orange-600"}`}
                    >
                      {f === "Remote" ? "🌍 " : f === "Hybrid" ? "🏙️ " : f === "Office" ? "🏢 " : ""}{f}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-neutral-400 uppercase tracking-wider mb-2">{isUk ? "Досвід" : "Experience"}</p>
                <div className="flex flex-wrap gap-2">
                  {experiences.map((e) => (
                    <button
                      key={e}
                      onClick={() => setActiveExp(e)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeExp === e ? "bg-indigo-700 text-white" : "bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-neutral-300 hover:bg-indigo-50 hover:text-indigo-700"}`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* Salary slider */}
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-neutral-400 uppercase tracking-wider mb-2">
                {isUk ? `Мінімальна зарплата: $${salaryMin.toLocaleString()}` : `Min Salary: $${salaryMin.toLocaleString()}`}
              </p>
              <input
                type="range"
                min={0}
                max={5000}
                step={200}
                value={salaryMin}
                onChange={(e) => setSalaryMin(Number(e.target.value))}
                className="w-full sm:w-72 accent-orange-500"
              />
            </div>
          </div>

          {/* Job Cards Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredJobs.length === 0 ? (
              <div className="col-span-3 text-center py-16 text-gray-400">
                <div className="text-4xl mb-3">🔍</div>
                <p className="text-lg font-medium">{isUk ? "Вакансій не знайдено" : "No jobs found"}</p>
                <p className="text-sm mt-1">{isUk ? "Спробуйте змінити фільтри" : "Try adjusting your filters"}</p>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className={`bg-white rounded-2xl p-5 border-2 transition-all cursor-pointer hover:shadow-md ${selectedJob === job.id ? "border-indigo-500 shadow-md" : "border-gray-100 dark:border-neutral-700 hover:border-indigo-200"}`}
                  onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-xl shrink-0">
                        {job.company}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white text-sm leading-tight">{job.title}</p>
                        <p className="text-gray-500 dark:text-neutral-400 text-xs mt-0.5">{job.companyName}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 ${job.format === "Remote" ? "bg-green-100 text-green-700" : job.format === "Hybrid" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}`}>
                      {job.format === "Remote" ? "🌍" : job.format === "Hybrid" ? "🏙️" : "🏢"} {job.format}
                    </span>
                  </div>
                  {/* Stack tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {job.stack.map((t) => (
                      <span key={t} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md font-medium">{t}</span>
                    ))}
                  </div>
                  {/* Salary + exp */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-gray-900">
                      💰 ${job.salaryMin.toLocaleString()}–${job.salaryMax.toLocaleString()}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${job.exp === "Senior" ? "bg-purple-100 text-purple-700" : job.exp === "Mid" ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"}`}>
                      {job.exp}
                    </span>
                  </div>
                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); }}
                      className="flex-1 py-2 bg-indigo-700 hover:bg-indigo-800 text-white text-sm font-semibold rounded-xl transition-colors"
                    >
                      ⚡ {isUk ? "Швидка заявка" : "Easy Apply"}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSavedJobs((prev) => prev.includes(job.id) ? prev.filter((id) => id !== job.id) : [...prev, job.id]);
                      }}
                      className={`px-3 py-2 rounded-xl border-2 text-sm transition-colors ${savedJobs.includes(job.id) ? "border-orange-400 text-orange-500 bg-orange-50" : "border-gray-200 dark:border-neutral-700 text-gray-400 dark:text-neutral-500 hover:border-orange-300 hover:text-orange-400"}`}
                    >
                      {savedJobs.includes(job.id) ? "🔖" : "🔖"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Job Detail Panel */}
          {selectedJobData && (
            <div className="mt-6 bg-white dark:bg-neutral-800 rounded-2xl border-2 border-indigo-200 shadow-lg overflow-hidden">
              <div className="bg-linear-to-br from-indigo-700 to-indigo-800 px-6 py-5 text-white">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl shrink-0">
                      {selectedJobData.company}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{selectedJobData.title}</h3>
                      <p className="text-indigo-200 text-sm">{selectedJobData.companyName} · {selectedJobData.format} · {selectedJobData.exp}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="text-indigo-300 hover:text-white transition-colors text-2xl leading-none"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="p-6 grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">{isUk ? "Про роль" : "About the Role"}</h4>
                    <p className="text-gray-600 dark:text-neutral-300 text-sm leading-relaxed">{selectedJobData.description}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">✅ {isUk ? "Вимоги" : "Requirements"}</h4>
                    <ul className="space-y-1">
                      {selectedJobData.requirements.map((r) => (
                        <li key={r} className="text-sm text-gray-600 dark:text-neutral-300 flex items-start gap-2"><span className="text-indigo-500 mt-0.5">•</span>{r}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">⭐ {isUk ? "Буде плюсом" : "Nice to Have"}</h4>
                    <ul className="space-y-1">
                      {selectedJobData.niceToHave.map((n) => (
                        <li key={n} className="text-sm text-gray-500 dark:text-neutral-400 flex items-start gap-2"><span className="text-orange-400 mt-0.5">◦</span>{n}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">🎁 {isUk ? "Переваги" : "Benefits"}</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedJobData.benefits.map((b) => (
                        <span key={b} className="text-xs bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full font-medium">{b}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">🌅 {isUk ? "Типовий день" : "Day in the Life"}</h4>
                    <ul className="space-y-1.5">
                      {selectedJobData.dayInLife.map((d, i) => (
                        <li key={i} className="text-sm text-gray-600 dark:text-neutral-300 flex items-start gap-2"><span className="text-orange-400 font-bold shrink-0">{i + 1}.</span>{d}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-2">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl font-extrabold text-gray-900">
                        ${selectedJobData.salaryMin.toLocaleString()}–${selectedJobData.salaryMax.toLocaleString()}
                      </span>
                      <span className="text-gray-400 dark:text-neutral-500 text-sm">{isUk ? "/міс" : "/mo"}</span>
                    </div>
                    <button className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors text-sm">
                      📨 {isUk ? "Подати заявку" : "Apply Now"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── SALARY CALCULATOR ── */}
      <section className="py-16 bg-white dark:bg-neutral-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-indigo-900">💰 {isUk ? "Калькулятор зарплат" : "Salary Calculator"}</h2>
            <p className="text-gray-500 dark:text-neutral-400 mt-2">{isUk ? "Дізнайтесь ринковий рівень зарплати для вашої ролі в Україні" : "Discover market salary levels for your role in Ukraine"}</p>
          </div>
          <div className="bg-indigo-50 rounded-3xl p-6 sm:p-8">
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-neutral-300 mb-2">{isUk ? "Роль" : "Role"}</label>
                <select
                  value={calcRole}
                  onChange={(e) => setCalcRole(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-indigo-200 text-gray-900 dark:text-white bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  {salaryRoles.map((r) => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-neutral-300 mb-2">{isUk ? "Рівень досвіду" : "Experience Level"}</label>
                <div className="flex gap-2">
                  {expLevels.map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setCalcExp(lvl)}
                      className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-colors ${calcExp === lvl ? "bg-indigo-700 text-white shadow" : "bg-white text-gray-600 dark:text-neutral-300 hover:bg-indigo-100 border border-indigo-200"}`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* Result */}
            <div className="bg-white rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-neutral-400 mb-1">{isUk ? "Медіанна зарплата" : "Median Salary Range"}</p>
                  <p className="text-3xl font-extrabold text-indigo-800">
                    ${currentSalary.min.toLocaleString()} – ${currentSalary.max.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-neutral-400 mt-1">{isUk ? "на місяць (USD)" : "per month (USD)"}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">{isUk ? "Ринок:" : "Market:"} 🇺🇦 {isUk ? "Україна" : "Ukraine"}</p>
                  <p className="text-xs text-gray-400 dark:text-neutral-500 mt-1">2025–2026</p>
                </div>
              </div>
              {/* Percentile bars */}
              <div className="space-y-3">
                {[
                  { label: "P25", value: currentSalary.p25, color: "bg-indigo-300" },
                  { label: isUk ? "Медіана" : "Median", value: Math.round((currentSalary.min + currentSalary.max) / 2), color: "bg-indigo-600" },
                  { label: "P75", value: currentSalary.p75, color: "bg-orange-400" },
                  { label: "Max", value: currentSalary.max, color: "bg-orange-500" },
                ].map((bar) => (
                  <div key={bar.label} className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-gray-500 dark:text-neutral-400 w-16 shrink-0">{bar.label}</span>
                    <div className="flex-1 bg-gray-100 dark:bg-neutral-800 rounded-full h-4 overflow-hidden">
                      <div
                        className={`${bar.color} h-4 rounded-full transition-all duration-500`}
                        style={{ width: `${Math.min((bar.value / maxBar) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-gray-800 dark:text-neutral-200 w-20 text-right shrink-0">${bar.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOR COMPANIES ── */}
      <section id="companies" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-indigo-900">🏢 {isUk ? "Для компаній" : "For Companies"}</h2>
            <p className="text-gray-500 dark:text-neutral-400 mt-2">{isUk ? "Наймайте кращих IT-спеціалістів швидше та ефективніше" : "Hire the best IT specialists faster and more efficiently"}</p>
          </div>

          {/* 3-Step Process */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { step: "01", icon: "📋", title: isUk ? "Опублікуйте" : "Post", desc: isUk ? "Детально опишіть вакансію: стек, умови, культуру компанії" : "Describe the job in detail: stack, conditions, company culture" },
              { step: "02", icon: "👀", title: isUk ? "Переглядайте" : "Review", desc: isUk ? "Отримуйте відфільтровані заявки з AI-оцінкою відповідності" : "Receive filtered applications with AI match scoring" },
              { step: "03", icon: "🤝", title: isUk ? "Наймайте" : "Hire", desc: isUk ? "Проводьте співбесіди та надсилайте офери прямо в платформі" : "Conduct interviews and send offers right on the platform" },
            ].map((s) => (
              <div key={s.step} className="bg-white rounded-2xl p-6 text-center border border-gray-100 dark:border-neutral-700 shadow-sm relative overflow-hidden">
                <div className="absolute top-4 right-4 text-5xl font-black text-indigo-50">{s.step}</div>
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{s.title}</h3>
                <p className="text-gray-500 dark:text-neutral-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-6">{isUk ? "Тарифні плани" : "Pricing Plans"}</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  onClick={() => setPricingTier(plan.name as typeof pricingTier)}
                  className={`rounded-2xl p-6 border-2 cursor-pointer transition-all ${pricingTier === plan.name ? "border-indigo-500 bg-indigo-50 shadow-md" : "border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-indigo-200"}`}
                >
                  {plan.name === "Pro" && (
                    <div className="inline-block bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                      {isUk ? "⭐ Популярний" : "⭐ Popular"}
                    </div>
                  )}
                  <h4 className="text-lg font-bold text-gray-900">{plan.name}</h4>
                  <div className="text-2xl font-extrabold text-indigo-700 my-2">{plan.price}</div>
                  <ul className="space-y-1.5 mt-3">
                    {plan.features.map((f) => (
                      <li key={f} className="text-sm text-gray-600 dark:text-neutral-300 flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span>{f}</li>
                    ))}
                  </ul>
                  <button className={`w-full mt-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${pricingTier === plan.name ? "bg-indigo-700 text-white" : "bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 hover:bg-indigo-100 hover:text-indigo-700"}`}>
                    {isUk ? "Обрати план" : "Choose Plan"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Anonymous Candidate Preview */}
          <div>
            <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-6">
              🔒 {isUk ? "Анонімний перегляд кандидатів" : "Anonymous Candidate Preview"}
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { skills: ["React", "TypeScript", "GraphQL"], exp: "5 years", salary: "$5,000" },
                { skills: ["Node.js", "PostgreSQL", "Docker"], exp: "4 years", salary: "$4,500" },
                { skills: ["Python", "ML", "TensorFlow"], exp: "3 years", salary: "$4,000" },
              ].map((c, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-gray-200 dark:border-neutral-700 relative overflow-hidden">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 blur-sm" />
                    <div className="space-y-1.5">
                      <div className="h-3 bg-gray-200 rounded w-24 blur-sm" />
                      <div className="h-2.5 bg-gray-100 dark:bg-neutral-800 rounded w-16 blur-sm" />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {c.skills.map((s) => (
                      <span key={s} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md font-medium">{s}</span>
                    ))}
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">📅 {c.exp}</span>
                    <span className="font-bold text-gray-900">💰 {c.salary}</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <button className="w-full py-2 bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-semibold rounded-lg transition-colors">
                      {isUk ? "🔓 Розблокувати профіль" : "🔓 Unlock Profile"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPANY PROFILES ── */}
      <section id="company-profiles" className="py-16 bg-white dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-indigo-900">⭐ {isUk ? "Топ роботодавці" : "Featured Companies"}</h2>
            <p className="text-gray-500 dark:text-neutral-400 mt-2">{isUk ? "Кращі IT-компанії, які активно наймають" : "Top IT companies actively hiring"}</p>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {companies.map((co) => (
              <div key={co.name} className="bg-white rounded-2xl p-5 border border-gray-200 dark:border-neutral-700 hover:border-indigo-300 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-2xl shrink-0 group-hover:bg-indigo-100 transition-colors">
                    {co.emoji}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">{co.name}</h3>
                    <p className="text-gray-400 dark:text-neutral-500 text-xs">{isUk ? "👥" : "👥"} {co.size}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {co.stack.map((t) => (
                    <span key={t} className="text-xs bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-neutral-300 px-2 py-0.5 rounded-md">{t}</span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {co.culture.map((c) => (
                    <span key={c} className="text-xs bg-orange-50 text-orange-600 px-2 py-0.5 rounded-md font-medium">{c}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">
                    {co.openPositions} {isUk ? "вакансій" : "open"}
                  </span>
                  <button className="text-xs font-semibold text-indigo-700 hover:text-indigo-800 underline underline-offset-2 transition-colors">
                    {isUk ? "Переглянути →" : "View →"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="py-16 bg-indigo-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">{isUk ? "Як це працює" : "How It Works"}</h2>
            <p className="text-indigo-300 mt-2">{isUk ? "Простий шлях від пошуку до результату" : "A simple path from search to result"}</p>
          </div>
          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-indigo-950/50 rounded-xl p-1">
              <button
                onClick={() => setHowTab("candidates")}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${howTab === "candidates" ? "bg-white text-indigo-800" : "text-indigo-300 hover:text-white"}`}
              >
                👤 {isUk ? "Кандидатам" : "Candidates"}
              </button>
              <button
                onClick={() => setHowTab("companies")}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${howTab === "companies" ? "bg-white text-indigo-800" : "text-indigo-300 hover:text-white"}`}
              >
                🏢 {isUk ? "Компаніям" : "Companies"}
              </button>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {(howTab === "candidates" ? candidateSteps : companySteps).map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-indigo-700/50 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3 border border-indigo-600">
                  {step.icon}
                </div>
                <div className="text-xs text-orange-400 font-bold mb-1">STEP {i + 1}</div>
                <h3 className="font-bold text-white mb-2 text-sm">{step.title}</h3>
                <p className="text-indigo-300 text-xs leading-relaxed">{step.desc}</p>
                {i < 3 && <div className="hidden md:block text-indigo-600 text-2xl absolute right-0 top-1/2">›</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-indigo-900">🎉 {isUk ? "Успішні кейси" : "Success Stories"}</h2>
            <p className="text-gray-500 dark:text-neutral-400 mt-2">{isUk ? "Реальні люди, реальні результати" : "Real people, real results"}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 dark:border-neutral-700 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-lg font-bold text-indigo-700 shrink-0">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white text-sm">{r.name}</p>
                    <p className="text-gray-500 dark:text-neutral-400 text-xs">{r.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-neutral-300 text-sm leading-relaxed mb-4">"{r.text}"</p>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-400">{isUk ? "Найнятий в:" : "Hired at:"} <strong className="text-gray-700">{r.company}</strong></span>
                  <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2.5 py-1 rounded-full">
                    ⚡ {r.days} {isUk ? "днів" : "days"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="py-16 bg-linear-to-br from-orange-500 to-orange-600 text-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-4xl mb-4">📬</div>
          <h2 className="text-3xl font-bold mb-3">
            {isUk ? "IT-вакансії щотижня" : "Weekly IT Job Digest"}
          </h2>
          <p className="text-orange-100 mb-8 text-lg">
            {isUk ? "Отримуйте добірку найкращих вакансій прямо на email" : "Get a curated selection of top jobs delivered to your inbox"}
          </p>
          {subscribed ? (
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-5 inline-block">
              <div className="text-2xl mb-2">✅</div>
              <p className="font-bold text-lg">{isUk ? "Ви підписані!" : "You're subscribed!"}</p>
              <p className="text-orange-100 text-sm mt-1">{isUk ? "Перший дайджест вже в дорозі" : "First digest is on its way"}</p>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isUk ? "✉️ Ваш email..." : "✉️ Your email..."}
                className="flex-1 px-5 py-3.5 rounded-xl text-gray-900 dark:text-white text-sm focus:outline-none shadow-md"
              />
              <button
                onClick={() => { if (email.includes("@")) setSubscribed(true); }}
                className="px-6 py-3.5 bg-indigo-800 hover:bg-indigo-900 text-white font-bold rounded-xl text-sm transition-colors shadow-md shrink-0"
              >
                {isUk ? "Підписатись" : "Subscribe"}
              </button>
            </div>
          )}
          <p className="text-orange-200 text-xs mt-4">
            {isUk ? "Без спаму. Відписатись можна в будь-який момент." : "No spam. Unsubscribe anytime."}
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-indigo-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">💼</span>
                <span className="text-xl font-bold">Talent<span className="text-orange-400">Hub</span></span>
              </div>
              <p className="text-indigo-400 text-sm leading-relaxed">
                {isUk ? "IT-рекрутингова платформа нового покоління для кандидатів та компаній." : "Next-generation IT recruitment platform for candidates and companies."}
              </p>
            </div>
            {/* Company */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider text-indigo-300 mb-3">{isUk ? "Компанія" : "Company"}</h4>
              <ul className="space-y-2 text-sm text-indigo-400">
                {[isUk ? "Про нас" : "About Us", isUk ? "Команда" : "Team", isUk ? "Кар'єра" : "Careers", isUk ? "Блог" : "Blog"].map((l) => (
                  <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            {/* Legal */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider text-indigo-300 mb-3">{isUk ? "Юридичне" : "Legal"}</h4>
              <ul className="space-y-2 text-sm text-indigo-400">
                {[isUk ? "Умови використання" : "Terms of Service", isUk ? "Конфіденційність" : "Privacy Policy", isUk ? "Cookie-політика" : "Cookie Policy", isUk ? "GDPR" : "GDPR"].map((l) => (
                  <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            {/* Support */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider text-indigo-300 mb-3">{isUk ? "Підтримка" : "Support"}</h4>
              <ul className="space-y-2 text-sm text-indigo-400">
                {[isUk ? "Довідковий центр" : "Help Center", isUk ? "Зв'язатись з нами" : "Contact Us", isUk ? "Статус сервісу" : "Service Status", isUk ? "API-документація" : "API Docs"].map((l) => (
                  <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-indigo-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-indigo-500">
            <p>© 2025 TalentHub. {isUk ? "Всі права захищено." : "All rights reserved."}</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">💼</a>
              <a href="#" className="hover:text-white transition-colors">🐦</a>
              <a href="#" className="hover:text-white transition-colors">📸</a>
              <a href="#" className="hover:text-white transition-colors">💬</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
