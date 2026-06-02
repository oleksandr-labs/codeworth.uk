export interface JobPosting {
  slug: string;
  titleUk: string;
  titleEn: string;
  departmentUk: string;
  departmentEn: string;
  typeUk: string;
  typeEn: string;
  locationUk: string;
  locationEn: string;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  descriptionUk: string;
  descriptionEn: string;
  requirementsUk: string[];
  requirementsEn: string[];
  niceToHaveUk?: string[];
  niceToHaveEn?: string[];
  responsibilitiesUk: string[];
  responsibilitiesEn: string[];
  benefitsUk: string[];
  benefitsEn: string[];
  datePosted: string;
  isUrgent?: boolean;
}

// ─── Team testimonials ────────────────────────────────────────────────────────

export interface TeamTestimonial {
  nameUk: string;
  nameEn: string;
  roleUk: string;
  roleEn: string;
  yearsInTeam: number;
  quoteUk: string;
  quoteEn: string;
  emoji: string;
}

export const TEAM_TESTIMONIALS: TeamTestimonial[] = [
  {
    nameUk: "Олексій Дем'яненко",
    nameEn: "Oleksiy Demyanenko",
    roleUk: "Frontend Developer",
    roleEn: "Frontend Developer",
    yearsInTeam: 2.5,
    quoteUk:
      "За 2,5 роки я встиг попрацювати над понад 40 проєктами — від ресторанів до SaaS. Тут ніколи не нудно, а колеги завжди готові допомогти або зробити code review.",
    quoteEn:
      "In 2.5 years I've worked on 40+ projects — from restaurants to SaaS. It's never boring here, and colleagues are always ready to help or do a code review.",
    emoji: "👨‍💻",
  },
  {
    nameUk: "Катерина Власенко",
    nameEn: "Kateryna Vlasenko",
    roleUk: "UI/UX Designer",
    roleEn: "UI/UX Designer",
    yearsInTeam: 1.5,
    quoteUk:
      "Найкраще в Codeworth — свобода дизайн-рішень. Тут не нав'язують шаблонів: ти пропонуєш, команда обговорює, клієнт отримує щось справді крутe.",
    quoteEn:
      "The best thing about Codeworth is design freedom. No one imposes templates: you propose, the team discusses, and the client gets something truly great.",
    emoji: "🎨",
  },
  {
    nameUk: "Дмитро Сидоренко",
    nameEn: "Dmytro Sydorenko",
    roleUk: "SEO Specialist",
    roleEn: "SEO Specialist",
    yearsInTeam: 1,
    quoteUk:
      "Прийшов джуніором, зараз веду самостійно 8 клієнтів. Бачу реальний вплив своєї роботи в Google Search Console — це дуже мотивує.",
    quoteEn:
      "I joined as a junior, and now I independently manage 8 clients. Seeing the real impact of my work in Google Search Console is very motivating.",
    emoji: "📈",
  },
];

export const JOBS: JobPosting[] = [
  {
    slug: "frontend-developer",
    titleUk: "Frontend Developer (Next.js / React)",
    titleEn: "Frontend Developer (Next.js / React)",
    departmentUk: "Розробка",
    departmentEn: "Development",
    typeUk: "Повна зайнятість",
    typeEn: "Full-time",
    locationUk: "Київ / Remote",
    locationEn: "Kyiv / Remote",
    salaryMin: 60000,
    salaryMax: 100000,
    currency: "UAH",
    descriptionUk:
      "Шукаємо досвідченого Frontend-розробника для роботи над проєктами клієнтів та розвитку власної платформи Codeworth. Ви будете будувати красиві, швидкі та SEO-оптимізовані інтерфейси на Next.js.",
    descriptionEn:
      "We're looking for an experienced Frontend Developer to work on client projects and develop the Codeworth platform. You'll build beautiful, fast, and SEO-optimized interfaces with Next.js.",
    requirementsUk: [
      "2+ роки комерційного досвіду з React",
      "Знання Next.js (App Router, SSG, SSR, ISR)",
      "TypeScript — обов'язково",
      "Tailwind CSS або CSS Modules",
      "Розуміння SEO та Core Web Vitals",
      "Git, GitHub Actions",
    ],
    requirementsEn: [
      "2+ years of commercial React experience",
      "Knowledge of Next.js (App Router, SSG, SSR, ISR)",
      "TypeScript — required",
      "Tailwind CSS or CSS Modules",
      "Understanding of SEO and Core Web Vitals",
      "Git, GitHub Actions",
    ],
    niceToHaveUk: [
      "Досвід з Storybook або Chromatic",
      "Знання GraphQL (Apollo, urql)",
      "Playwright або Vitest для E2E-тестів",
      "Базові навички Figma (читання макетів та handoff)",
      "Open-source контриб'юції на GitHub",
    ],
    niceToHaveEn: [
      "Experience with Storybook or Chromatic",
      "GraphQL knowledge (Apollo, urql)",
      "Playwright or Vitest for E2E tests",
      "Basic Figma skills (reading mockups and handoff)",
      "Open-source contributions on GitHub",
    ],
    responsibilitiesUk: [
      "Розробка клієнтських сайтів на Next.js 15+",
      "Оптимізація PageSpeed та Core Web Vitals",
      "Code review та менторство junior-розробників",
      "Участь у вибудовуванні дизайн-системи",
      "Комунікація з клієнтами щодо технічних питань",
    ],
    responsibilitiesEn: [
      "Developing client websites with Next.js 15+",
      "PageSpeed and Core Web Vitals optimization",
      "Code reviews and mentoring junior developers",
      "Contributing to the design system",
      "Technical client communication",
    ],
    benefitsUk: [
      "Гнучкий графік (core hours 11:00–17:00)",
      "100% Remote або офіс у Києві",
      "Бюджет на навчання: 10 000 грн/рік",
      "MacBook або компенсація обладнання",
      "Медичне страхування після 3 місяців",
      "Участь у цікавих продуктових проєктах",
    ],
    benefitsEn: [
      "Flexible schedule (core hours 11:00–17:00)",
      "100% Remote or Kyiv office",
      "Learning budget: UAH 10,000/year",
      "MacBook or equipment compensation",
      "Medical insurance after 3 months",
      "Participation in interesting product projects",
    ],
    datePosted: "2026-03-01",
    isUrgent: true,
  },
  {
    slug: "ui-ux-designer",
    titleUk: "UI/UX Designer",
    titleEn: "UI/UX Designer",
    departmentUk: "Дизайн",
    departmentEn: "Design",
    typeUk: "Повна зайнятість",
    typeEn: "Full-time",
    locationUk: "Київ / Remote",
    locationEn: "Kyiv / Remote",
    salaryMin: 50000,
    salaryMax: 80000,
    currency: "UAH",
    descriptionUk:
      "Шукаємо талановитого дизайнера для розробки унікальних сайтів для наших клієнтів. Ви будете проєктувати від wireframes до готових UI-макетів, дбаючи про конверсію та естетику.",
    descriptionEn:
      "We're looking for a talented designer to create unique websites for our clients. You'll design from wireframes to final UI mockups, caring about both conversion and aesthetics.",
    requirementsUk: [
      "2+ роки досвіду в UI/UX дизайні для веб",
      "Figma — впевнений рівень",
      "Розуміння responsive design та Mobile First",
      "Базові знання HTML/CSS для передачі макетів розробникам",
      "Портфоліо з веб-проєктами",
    ],
    requirementsEn: [
      "2+ years of web UI/UX design experience",
      "Figma — confident level",
      "Understanding of responsive design and Mobile First",
      "Basic HTML/CSS knowledge for handoff to developers",
      "Portfolio with web projects",
    ],
    niceToHaveUk: [
      "Досвід з анімацією (Framer Motion, Lottie)",
      "Навички ілюстрації або графіки (Illustrator, Procreate)",
      "Знання Tailwind CSS або CSS-змінних дизайн-системи",
      "Досвід з motion-дизайном для web (After Effects)",
    ],
    niceToHaveEn: [
      "Animation experience (Framer Motion, Lottie)",
      "Illustration or graphic design skills (Illustrator, Procreate)",
      "Tailwind CSS or design system CSS variable knowledge",
      "Motion design experience for web (After Effects)",
    ],
    responsibilitiesUk: [
      "Розробка wireframes та UI-макетів для клієнтських проєктів",
      "Побудова та підтримка дизайн-систем",
      "Проведення UX-аудитів сайтів клієнтів",
      "Оформлення брендингу та фірмового стилю",
      "Підготовка специфікацій для розробників",
    ],
    responsibilitiesEn: [
      "Creating wireframes and UI mockups for client projects",
      "Building and maintaining design systems",
      "Conducting UX audits for client websites",
      "Branding and visual identity design",
      "Preparing specs for developers",
    ],
    benefitsUk: [
      "Свобода у виборі дизайн-рішень",
      "100% Remote або офіс у Києві",
      "Бюджет на Figma, плагіни та курси",
      "Цікаві та різноманітні ніші (30+ галузей)",
      "Кар'єрний ріст до Lead Designer",
    ],
    benefitsEn: [
      "Freedom in design decisions",
      "100% Remote or Kyiv office",
      "Budget for Figma, plugins, and courses",
      "Interesting and diverse niches (30+ industries)",
      "Career growth to Lead Designer",
    ],
    datePosted: "2026-03-05",
    isUrgent: false,
  },
  {
    slug: "seo-specialist",
    titleUk: "SEO-спеціаліст",
    titleEn: "SEO Specialist",
    departmentUk: "Маркетинг",
    departmentEn: "Marketing",
    typeUk: "Повна або часткова зайнятість",
    typeEn: "Full-time or Part-time",
    locationUk: "Remote",
    locationEn: "Remote",
    salaryMin: 30000,
    salaryMax: 60000,
    currency: "UAH",
    descriptionUk:
      "Шукаємо SEO-спеціаліста для просування сайтів клієнтів та власної платформи Codeworth. Ви будете формувати семантичне ядро, оптимізувати контент і відстежувати результати.",
    descriptionEn:
      "We're looking for an SEO specialist to promote client websites and the Codeworth platform. You'll build semantic cores, optimize content, and track results.",
    requirementsUk: [
      "1+ рік досвіду в SEO-просуванні",
      "Знання: Google Search Console, GA4, Ahrefs або SEMrush",
      "Розуміння технічного SEO",
      "Досвід з локальним SEO буде плюсом",
      "Вміння аналізувати та інтерпретувати дані",
    ],
    requirementsEn: [
      "1+ year of SEO experience",
      "Knowledge: Google Search Console, GA4, Ahrefs or SEMrush",
      "Understanding of technical SEO",
      "Local SEO experience is a plus",
      "Ability to analyze and interpret data",
    ],
    niceToHaveUk: [
      "Досвід з Schema.org та структурованими даними",
      "Знання Python або Google Apps Script для автоматизації",
      "Досвід з Google Ads (PPC) — для комплексного просування",
      "Створення україномовного SEO-контенту",
    ],
    niceToHaveEn: [
      "Experience with Schema.org and structured data",
      "Python or Google Apps Script knowledge for automation",
      "Google Ads (PPC) experience for comprehensive promotion",
      "Ukrainian-language SEO content creation",
    ],
    responsibilitiesUk: [
      "Формування семантичного ядра для проєктів клієнтів",
      "Технічний SEO-аудит та рекомендації розробникам",
      "Моніторинг позицій та органічного трафіку",
      "Написання SEO-технічних завдань для контенту",
      "Локальне SEO та Google Business Profile оптимізація",
    ],
    responsibilitiesEn: [
      "Building semantic keyword clusters for client projects",
      "Technical SEO audits and developer recommendations",
      "Monitoring rankings and organic traffic",
      "Writing SEO content briefs",
      "Local SEO and Google Business Profile optimization",
    ],
    benefitsUk: [
      "100% Remote",
      "Гнучкий графік",
      "Доступ до Ahrefs та SEMrush",
      "Бонус від результатів клієнтів",
      "Кар'єрний ріст до Head of SEO",
    ],
    benefitsEn: [
      "100% Remote",
      "Flexible schedule",
      "Access to Ahrefs and SEMrush",
      "Bonus from client results",
      "Career growth to Head of SEO",
    ],
    datePosted: "2026-03-10",
    isUrgent: false,
  },
  {
    slug: "content-manager",
    titleUk: "Контент-менеджер / Копірайтер",
    titleEn: "Content Manager / Copywriter",
    departmentUk: "Маркетинг",
    departmentEn: "Marketing",
    typeUk: "Повна або часткова зайнятість",
    typeEn: "Full-time or Part-time",
    locationUk: "Remote",
    locationEn: "Remote",
    salaryMin: 20000,
    salaryMax: 45000,
    currency: "UAH",
    descriptionUk:
      "Шукаємо контент-менеджера для створення SEO-статей для блогу Codeworth та текстів для сайтів клієнтів. Ви будете писати корисні матеріали для малого та середнього бізнесу, дбаючи про читабельність та пошукову оптимізацію.",
    descriptionEn:
      "We're looking for a content manager to create SEO articles for the Codeworth blog and copy for client websites. You'll write helpful materials for small and medium businesses, caring about both readability and search optimization.",
    requirementsUk: [
      "Досвід написання SEO-статей або вебкопірайтингу від 1 року",
      "Грамотна українська мова — обов'язково",
      "Базове розуміння SEO (ключові слова, структура H1-H6)",
      "Вміння створювати технічне завдання на статтю",
      "Англійська мова — читання/переклад (B1+)",
    ],
    requirementsEn: [
      "1+ year of SEO article writing or web copywriting experience",
      "Fluent Ukrainian — required",
      "Basic understanding of SEO (keywords, H1-H6 structure)",
      "Ability to create content briefs",
      "English — reading/translation (B1+)",
    ],
    responsibilitiesUk: [
      "Написання SEO-статей для блогу Codeworth (2–3 на тиждень)",
      "Тексти для посадкових сторінок клієнтів",
      "Написання meta title та description для сторінок",
      "Ведення контент-плану та редакційного календаря",
      "Пошук та аналіз ключових слів разом з SEO-фахівцем",
    ],
    responsibilitiesEn: [
      "Writing SEO articles for the Codeworth blog (2–3 per week)",
      "Landing page copy for client websites",
      "Writing meta titles and descriptions",
      "Maintaining the content plan and editorial calendar",
      "Keyword research in collaboration with the SEO specialist",
    ],
    benefitsUk: [
      "100% Remote, гнучкий графік",
      "Творча свобода у виборі підходу до тем",
      "Бюджет на навчання (курси копірайтингу, SEO)",
      "Можливість вести власну рубрику у блозі",
      "Кар'єрний ріст до Head of Content",
    ],
    benefitsEn: [
      "100% Remote, flexible schedule",
      "Creative freedom in approach to topics",
      "Learning budget (copywriting, SEO courses)",
      "Opportunity to manage your own blog section",
      "Career growth to Head of Content",
    ],
    datePosted: "2026-04-01",
    isUrgent: false,
  },
  {
    slug: "project-manager",
    titleUk: "Project Manager / Product Owner",
    titleEn: "Project Manager / Product Owner",
    departmentUk: "Управління",
    departmentEn: "Management",
    typeUk: "Повна зайнятість",
    typeEn: "Full-time",
    locationUk: "Київ / Remote",
    locationEn: "Kyiv / Remote",
    salaryMin: 50000,
    salaryMax: 90000,
    currency: "UAH",
    descriptionUk:
      "Шукаємо досвідченого Project Manager-а для координації проєктів з розробки сайтів та веб-платформ. Ви будете сполучною ланкою між клієнтами та командою розробки, забезпечуючи своєчасне та якісне виконання проєктів.",
    descriptionEn:
      "We're looking for an experienced Project Manager to coordinate website and web platform development projects. You'll be the bridge between clients and the development team, ensuring timely and quality delivery.",
    requirementsUk: [
      "2+ роки досвіду в управлінні IT-проєктами",
      "Розуміння процесу веб-розробки (Agile/Scrum/Kanban)",
      "Досвід роботи з Jira, Notion, Trello або аналогами",
      "Відмінні комунікативні навички (технічна та нетехнічна аудиторія)",
      "Базове розуміння HTML/CSS/JS — буде перевагою",
      "Англійська мова — B2+ для роботи з іноземними клієнтами",
    ],
    requirementsEn: [
      "2+ years of IT project management experience",
      "Understanding of the web development process (Agile/Scrum/Kanban)",
      "Experience with Jira, Notion, Trello or similar tools",
      "Excellent communication skills (technical and non-technical audiences)",
      "Basic HTML/CSS/JS understanding is a plus",
      "English — B2+ for working with international clients",
    ],
    responsibilitiesUk: [
      "Ведення 4–8 паралельних проєктів з розробки сайтів",
      "Збір вимог від клієнта, складання технічного завдання",
      "Планування спринтів та контроль дедлайнів",
      "Комунікація з клієнтами: демо, статус-звіти, зворотний зв'язок",
      "Виявлення та мінімізація ризиків проєктів",
      "Постійне покращення процесів розробки",
    ],
    responsibilitiesEn: [
      "Managing 4–8 parallel website development projects",
      "Gathering client requirements and writing specs",
      "Planning sprints and tracking deadlines",
      "Client communication: demos, status reports, feedback loops",
      "Identifying and mitigating project risks",
      "Continuously improving development processes",
    ],
    benefitsUk: [
      "Гнучкий графік (core hours 10:00–18:00)",
      "Remote або офіс у Києві",
      "Кар'єрне зростання до Head of Delivery або Product Lead",
      "Бюджет на сертифікації (PMP, PSM, PSPO)",
      "Участь у продуктових рішеннях платформи Codeworth",
    ],
    benefitsEn: [
      "Flexible schedule (core hours 10:00–18:00)",
      "Remote or Kyiv office",
      "Career growth to Head of Delivery or Product Lead",
      "Certification budget (PMP, PSM, PSPO)",
      "Involvement in Codeworth platform product decisions",
    ],
    datePosted: "2026-04-05",
    isUrgent: true,
  },
  {
    slug: "backend-developer",
    titleUk: "Backend Developer (Node.js / PostgreSQL)",
    titleEn: "Backend Developer (Node.js / PostgreSQL)",
    departmentUk: "Розробка",
    departmentEn: "Development",
    typeUk: "Повна зайнятість",
    typeEn: "Full-time",
    locationUk: "Київ / Remote",
    locationEn: "Kyiv / Remote",
    salaryMin: 70000,
    salaryMax: 120000,
    currency: "UAH",
    descriptionUk:
      "Шукаємо Backend Developer для розробки API, серверної логіки та інтеграцій для платформи Codeworth та проєктів клієнтів. Ви будете будувати надійну та масштабовану інфраструктуру для маркетплейсу, CRM-інтеграцій та автоматизації бізнес-процесів.",
    descriptionEn:
      "We're looking for a Backend Developer to build APIs, server logic, and integrations for the Codeworth platform and client projects. You'll build reliable, scalable infrastructure for the marketplace, CRM integrations, and business process automation.",
    requirementsUk: [
      "3+ роки комерційного досвіду з Node.js",
      "PostgreSQL + Prisma або аналоги (TypeORM, Drizzle)",
      "REST API дизайн та документація (OpenAPI/Swagger)",
      "TypeScript — обов'язково",
      "Розуміння безпеки (JWT, rate limiting, OWASP)",
      "Docker, базові знання DevOps",
      "Git, GitHub Actions або GitLab CI",
    ],
    requirementsEn: [
      "3+ years of commercial Node.js experience",
      "PostgreSQL + Prisma or similar (TypeORM, Drizzle)",
      "REST API design and documentation (OpenAPI/Swagger)",
      "TypeScript — required",
      "Security understanding (JWT, rate limiting, OWASP)",
      "Docker, basic DevOps knowledge",
      "Git, GitHub Actions or GitLab CI",
    ],
    niceToHaveUk: [
      "Досвід з Redis або іншими in-memory сховищами",
      "GraphQL (Apollo Server, Nexus або Pothos)",
      "Знання Kubernetes або AWS/GCP для deployment",
      "Досвід з webhook patterns (Stripe, LiqPay)",
      "Знання архітектур: Event-Driven, CQRS, Saga-паттерн",
    ],
    niceToHaveEn: [
      "Experience with Redis or other in-memory stores",
      "GraphQL (Apollo Server, Nexus or Pothos)",
      "Kubernetes or AWS/GCP deployment knowledge",
      "Experience with webhook patterns (Stripe, LiqPay)",
      "Architecture knowledge: Event-Driven, CQRS, Saga pattern",
    ],
    responsibilitiesUk: [
      "Розробка та підтримка API для маркетплейсу Codeworth",
      "Інтеграції з платіжними системами (LiqPay, Stripe)",
      "Інтеграції з CRM, Telegram Bot API, email-сервісами",
      "Написання unit та integration тестів",
      "Оптимізація запитів до БД та caching стратегій",
      "Code review та участь в архітектурних рішеннях",
    ],
    responsibilitiesEn: [
      "Developing and maintaining the Codeworth marketplace API",
      "Payment system integrations (LiqPay, Stripe)",
      "CRM, Telegram Bot API, and email service integrations",
      "Writing unit and integration tests",
      "Database query optimization and caching strategies",
      "Code review and participation in architecture decisions",
    ],
    benefitsUk: [
      "Гнучкий графік (core hours 11:00–17:00)",
      "100% Remote або офіс у Києві",
      "Бюджет на навчання: 15 000 грн/рік",
      "MacBook або компенсація обладнання",
      "Участь у побудові продукту з нуля",
      "Медичне страхування після 3 місяців",
    ],
    benefitsEn: [
      "Flexible schedule (core hours 11:00–17:00)",
      "100% Remote or Kyiv office",
      "Learning budget: UAH 15,000/year",
      "MacBook or equipment compensation",
      "Opportunity to build a product from scratch",
      "Medical insurance after 3 months",
    ],
    datePosted: "2026-04-10",
    isUrgent: true,
  },
];

export const JOB_SLUGS = JOBS.map((j) => j.slug);

export function getJob(slug: string): JobPosting | undefined {
  return JOBS.find((j) => j.slug === slug);
}
