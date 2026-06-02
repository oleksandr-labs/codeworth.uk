"use client";

import { useState } from "react";

/* ───── data ───── */

const CATEGORIES = [
  { id: "all", en: "All Courses", uk: "Усі курси", emoji: "📚" },
  { id: "programming", en: "Programming", uk: "Програмування", emoji: "💻" },
  { id: "design", en: "Design", uk: "Дизайн", emoji: "🎨" },
  { id: "marketing", en: "Marketing", uk: "Маркетинг", emoji: "📣" },
  { id: "business", en: "Business", uk: "Бізнес", emoji: "💼" },
  { id: "languages", en: "Languages", uk: "Мови", emoji: "🌍" },
  { id: "data", en: "Data Science", uk: "Data Science", emoji: "📊" },
];

interface Course {
  id: number;
  emoji: string;
  titleEn: string;
  titleUk: string;
  instructorEn: string;
  instructorUk: string;
  rating: number;
  students: number;
  price: number;
  category: string;
  descEn: string;
  descUk: string;
  modules: { en: string; uk: string; hours: number }[];
  learnEn: string[];
  learnUk: string[];
  requirementsEn: string[];
  requirementsUk: string[];
  instructorBioEn: string;
  instructorBioUk: string;
}

const COURSES: Course[] = [
  {
    id: 1, emoji: "⚛️", category: "programming",
    titleEn: "React Masterclass", titleUk: "Майстерклас з React",
    instructorEn: "Alex Turner", instructorUk: "Олексій Тернер",
    rating: 4.9, students: 12400, price: 49,
    descEn: "Comprehensive React course from fundamentals to advanced patterns. Build real-world apps with hooks, context, and modern best practices.",
    descUk: "Комплексний курс React від основ до просунутих патернів. Створюйте реальні додатки з хуками, контекстом і сучасними практиками.",
    modules: [
      { en: "React Fundamentals & JSX", uk: "Основи React та JSX", hours: 8 },
      { en: "Hooks & State Management", uk: "Хуки та управління станом", hours: 10 },
      { en: "Routing & API Integration", uk: "Маршрутизація та інтеграція API", hours: 7 },
      { en: "Testing & Performance", uk: "Тестування та продуктивність", hours: 6 },
      { en: "Capstone Project", uk: "Підсумковий проєкт", hours: 12 },
    ],
    learnEn: ["Build production-ready React apps", "Master hooks and custom hooks", "Implement state management patterns", "Write unit and integration tests"],
    learnUk: ["Створювати production-ready React-додатки", "Опанувати хуки та кастомні хуки", "Реалізувати патерни управління станом", "Писати юніт та інтеграційні тести"],
    requirementsEn: ["Basic JavaScript knowledge", "HTML & CSS fundamentals", "Code editor installed"],
    requirementsUk: ["Базові знання JavaScript", "Основи HTML та CSS", "Встановлений редактор коду"],
    instructorBioEn: "Senior Frontend Engineer with 10+ years of experience at top tech companies. Passionate about teaching and open-source.",
    instructorBioUk: "Senior Frontend Engineer з 10+ роками досвіду в топових tech-компаніях. Захоплений викладанням та open-source.",
  },
  {
    id: 2, emoji: "🎨", category: "design",
    titleEn: "UI/UX Design Bootcamp", titleUk: "Буткемп з UI/UX Дизайну",
    instructorEn: "Maria Koval", instructorUk: "Марія Коваль",
    rating: 4.8, students: 8900, price: 59,
    descEn: "Learn to design beautiful, user-centered interfaces. From wireframing to high-fidelity prototypes in Figma.",
    descUk: "Навчіться створювати красиві, орієнтовані на користувача інтерфейси. Від вайрфреймів до прототипів у Figma.",
    modules: [
      { en: "Design Thinking & Research", uk: "Дизайн-мислення та дослідження", hours: 6 },
      { en: "Wireframing & Information Architecture", uk: "Вайрфрейми та інформаційна архітектура", hours: 8 },
      { en: "Visual Design Principles", uk: "Принципи візуального дизайну", hours: 9 },
      { en: "Prototyping in Figma", uk: "Прототипування у Figma", hours: 10 },
      { en: "Usability Testing & Iteration", uk: "Юзабіліті-тестування та ітерації", hours: 7 },
    ],
    learnEn: ["Conduct user research effectively", "Create wireframes and prototypes", "Apply visual design principles", "Run usability tests"],
    learnUk: ["Ефективно проводити дослідження користувачів", "Створювати вайрфрейми та прототипи", "Застосовувати принципи візуального дизайну", "Проводити юзабіліті-тестування"],
    requirementsEn: ["No prior design experience needed", "Figma account (free)", "Curiosity about user experience"],
    requirementsUk: ["Попередній досвід дизайну не потрібен", "Акаунт Figma (безкоштовно)", "Цікавість до UX"],
    instructorBioEn: "Lead Product Designer with 8 years creating interfaces for startups and enterprises. Google UX Certificate holder.",
    instructorBioUk: "Lead Product Designer з 8-річним досвідом створення інтерфейсів для стартапів і корпорацій. Має сертифікат Google UX.",
  },
  {
    id: 3, emoji: "📈", category: "marketing",
    titleEn: "Digital Marketing A-Z", titleUk: "Цифровий маркетинг від А до Я",
    instructorEn: "James Park", instructorUk: "Джеймс Парк",
    rating: 4.7, students: 15200, price: 39,
    descEn: "Master SEO, social media, email marketing, and paid ads. Real campaigns, real results.",
    descUk: "Опануйте SEO, соцмережі, email-маркетинг та рекламу. Реальні кампанії, реальні результати.",
    modules: [
      { en: "SEO & Content Strategy", uk: "SEO та контент-стратегія", hours: 7 },
      { en: "Social Media Marketing", uk: "Маркетинг у соцмережах", hours: 8 },
      { en: "Email Marketing Automation", uk: "Автоматизація email-маркетингу", hours: 5 },
      { en: "PPC & Paid Advertising", uk: "PPC та платна реклама", hours: 9 },
      { en: "Analytics & Optimization", uk: "Аналітика та оптимізація", hours: 6 },
    ],
    learnEn: ["Rank #1 on Google with SEO", "Build social media campaigns", "Automate email funnels", "Optimize ad spend for ROI"],
    learnUk: ["Потрапити в топ Google з SEO", "Будувати кампанії в соцмережах", "Автоматизувати email-воронки", "Оптимізувати рекламний бюджет для ROI"],
    requirementsEn: ["Basic computer skills", "Interest in marketing", "Social media accounts"],
    requirementsUk: ["Базові навички роботи з ПК", "Інтерес до маркетингу", "Акаунти в соцмережах"],
    instructorBioEn: "Growth marketing lead who scaled 3 startups. Featured in Forbes and Marketing Week.",
    instructorBioUk: "Керівник growth-маркетингу, який масштабував 3 стартапи. Публікації у Forbes та Marketing Week.",
  },
  {
    id: 4, emoji: "💼", category: "business",
    titleEn: "Startup Launchpad", titleUk: "Стартап Launchpad",
    instructorEn: "Sarah Chen", instructorUk: "Сара Чен",
    rating: 4.8, students: 6700, price: 69,
    descEn: "From idea to funded startup. Learn lean methodology, MVP building, pitching, and fundraising.",
    descUk: "Від ідеї до профінансованого стартапу. Lean-методологія, MVP, пітчинг та залучення інвестицій.",
    modules: [
      { en: "Idea Validation & Market Research", uk: "Валідація ідеї та дослідження ринку", hours: 6 },
      { en: "Lean Canvas & Business Model", uk: "Lean Canvas та бізнес-модель", hours: 7 },
      { en: "MVP Development", uk: "Розробка MVP", hours: 10 },
      { en: "Pitching & Fundraising", uk: "Пітчинг та залучення інвестицій", hours: 8 },
      { en: "Scaling & Growth", uk: "Масштабування та зростання", hours: 5 },
    ],
    learnEn: ["Validate business ideas quickly", "Build an MVP in weeks", "Create winning pitch decks", "Navigate fundraising rounds"],
    learnUk: ["Швидко валідувати бізнес-ідеї", "Створити MVP за тижні", "Робити переможні пітч-деки", "Орієнтуватися в раундах інвестицій"],
    requirementsEn: ["Entrepreneurial mindset", "Basic business understanding", "Willingness to take risks"],
    requirementsUk: ["Підприємницьке мислення", "Базове розуміння бізнесу", "Готовність ризикувати"],
    instructorBioEn: "3x startup founder, Y Combinator alum. Raised $20M+ in venture capital across her ventures.",
    instructorBioUk: "3x засновниця стартапів, випускниця Y Combinator. Залучила $20M+ венчурного капіталу.",
  },
  {
    id: 5, emoji: "🗣️", category: "languages",
    titleEn: "Business English Pro", titleUk: "Бізнес-англійська Pro",
    instructorEn: "Emily Watson", instructorUk: "Емілі Вотсон",
    rating: 4.6, students: 21000, price: 29,
    descEn: "Elevate your professional English. Meetings, presentations, negotiations, and business writing.",
    descUk: "Прокачайте професійну англійську. Зустрічі, презентації, переговори та ділове листування.",
    modules: [
      { en: "Business Communication Basics", uk: "Основи ділового спілкування", hours: 5 },
      { en: "Meetings & Presentations", uk: "Зустрічі та презентації", hours: 7 },
      { en: "Negotiation Language", uk: "Мова переговорів", hours: 6 },
      { en: "Business Writing", uk: "Ділове листування", hours: 6 },
      { en: "Industry-Specific Vocabulary", uk: "Професійна лексика за галузями", hours: 4 },
    ],
    learnEn: ["Lead meetings confidently in English", "Deliver compelling presentations", "Negotiate effectively", "Write professional emails and reports"],
    learnUk: ["Впевнено вести зустрічі англійською", "Робити переконливі презентації", "Ефективно вести переговори", "Писати професійні листи та звіти"],
    requirementsEn: ["Intermediate English level (B1+)", "Access to video conferencing", "Notebook for practice"],
    requirementsUk: ["Рівень англійської B1+", "Доступ до відеозв'язку", "Зошит для практики"],
    instructorBioEn: "Cambridge-certified English instructor with 15 years teaching corporate clients at Fortune 500 companies.",
    instructorBioUk: "Сертифікований Кембриджем викладач англійської з 15-річним досвідом навчання корпоративних клієнтів Fortune 500.",
  },
  {
    id: 6, emoji: "🧠", category: "data",
    titleEn: "Machine Learning Fundamentals", titleUk: "Основи машинного навчання",
    instructorEn: "David Kim", instructorUk: "Девід Кім",
    rating: 4.9, students: 9800, price: 79,
    descEn: "Hands-on ML with Python. From linear regression to neural networks. Real datasets, real projects.",
    descUk: "Практичне ML з Python. Від лінійної регресії до нейронних мереж. Реальні дані, реальні проєкти.",
    modules: [
      { en: "Python for Data Science", uk: "Python для Data Science", hours: 8 },
      { en: "Supervised Learning", uk: "Навчання з учителем", hours: 10 },
      { en: "Unsupervised Learning", uk: "Навчання без учителя", hours: 7 },
      { en: "Deep Learning Basics", uk: "Основи глибинного навчання", hours: 9 },
      { en: "ML Projects Portfolio", uk: "Портфоліо ML-проєктів", hours: 12 },
    ],
    learnEn: ["Build ML models from scratch", "Use scikit-learn and TensorFlow", "Handle real-world datasets", "Deploy models to production"],
    learnUk: ["Будувати ML-моделі з нуля", "Використовувати scikit-learn і TensorFlow", "Працювати з реальними даними", "Деплоїти моделі в продакшн"],
    requirementsEn: ["Python basics", "High school math", "Laptop with 8GB+ RAM"],
    requirementsUk: ["Основи Python", "Шкільна математика", "Ноутбук з 8GB+ RAM"],
    instructorBioEn: "PhD in Machine Learning from MIT. Former Google Brain researcher. Published 20+ papers in top AI conferences.",
    instructorBioUk: "PhD з Machine Learning в MIT. Колишній дослідник Google Brain. 20+ публікацій на топових AI-конференціях.",
  },
];

const INSTRUCTORS = [
  { emoji: "👨‍💻", nameEn: "Alex Turner", nameUk: "Олексій Тернер", expertiseEn: "Frontend & React", expertiseUk: "Frontend та React", courses: 12, rating: 4.9 },
  { emoji: "👩‍🎨", nameEn: "Maria Koval", nameUk: "Марія Коваль", expertiseEn: "UI/UX Design", expertiseUk: "UI/UX Дизайн", courses: 8, rating: 4.8 },
  { emoji: "👨‍🔬", nameEn: "David Kim", nameUk: "Девід Кім", expertiseEn: "Machine Learning", expertiseUk: "Machine Learning", courses: 6, rating: 4.9 },
  { emoji: "👩‍💼", nameEn: "Sarah Chen", nameUk: "Сара Чен", expertiseEn: "Startups & Business", expertiseUk: "Стартапи та бізнес", courses: 9, rating: 4.8 },
];

const TESTIMONIALS = [
  {
    emoji: "👩‍💻",
    nameEn: "Jessica M.", nameUk: "Джессіка М.",
    courseEn: "React Masterclass", courseUk: "Майстерклас з React",
    textEn: "This course helped me land my dream job as a frontend developer. The projects were incredibly practical and my portfolio impressed every interviewer.",
    textUk: "Цей курс допоміг мені отримати роботу мрії як frontend-розробниця. Проєкти були неймовірно практичними, і моє портфоліо вразило кожного інтерв'юера.",
  },
  {
    emoji: "👨‍🎓",
    nameEn: "Andriy S.", nameUk: "Андрій С.",
    courseEn: "Digital Marketing A-Z", courseUk: "Цифровий маркетинг від А до Я",
    textEn: "I tripled my freelance clients within 3 months of completing this course. The SEO section alone was worth 10x the price.",
    textUk: "Я потроїв кількість фріланс-клієнтів за 3 місяці після завершення курсу. Лише розділ SEO вартий 10x ціни.",
  },
  {
    emoji: "👩‍🔬",
    nameEn: "Olena K.", nameUk: "Олена К.",
    courseEn: "Machine Learning Fundamentals", courseUk: "Основи машинного навчання",
    textEn: "Went from zero ML knowledge to building my own models in 8 weeks. David explains complex concepts in the most intuitive way possible.",
    textUk: "Від нуля знань ML до побудови власних моделей за 8 тижнів. Девід пояснює складні концепції максимально інтуїтивно.",
  },
];

interface PathGoal { id: string; en: string; uk: string; emoji: string }
const PATH_GOALS: PathGoal[] = [
  { id: "career", en: "Career Change", uk: "Зміна кар'єри", emoji: "🚀" },
  { id: "skill", en: "Skill Up", uk: "Прокачати навички", emoji: "📈" },
  { id: "hobby", en: "Hobby", uk: "Хобі", emoji: "🎯" },
];

interface PathField { id: string; en: string; uk: string; emoji: string; courses: number[] }
const PATH_FIELDS: PathField[] = [
  { id: "webdev", en: "Web Development", uk: "Веб-розробка", emoji: "🌐", courses: [1, 2, 6] },
  { id: "digitalmarketing", en: "Digital Marketing", uk: "Цифровий маркетинг", emoji: "📢", courses: [3, 5, 4] },
  { id: "datascience", en: "Data Science", uk: "Data Science", emoji: "🔬", courses: [6, 1, 4] },
  { id: "entrepreneurship", en: "Entrepreneurship", uk: "Підприємництво", emoji: "💡", courses: [4, 3, 5] },
];

const PRICING = [
  {
    id: "free", en: "Free", uk: "Безкоштовний", price: 0, periodEn: "", periodUk: "",
    featuresEn: ["Access to 10 free courses", "Community forums", "Course previews", "Mobile app access"],
    featuresUk: ["Доступ до 10 безкоштовних курсів", "Форуми спільноти", "Попередній перегляд курсів", "Доступ з мобільного"],
    highlight: false,
  },
  {
    id: "pro", en: "Pro", uk: "Pro", price: 19, periodEn: "/mo", periodUk: "/міс",
    featuresEn: ["Unlimited course access", "Certificates of completion", "Offline downloads", "Priority support", "Project reviews"],
    featuresUk: ["Необмежений доступ до курсів", "Сертифікати про завершення", "Офлайн-завантаження", "Пріоритетна підтримка", "Ревю проєктів"],
    highlight: true,
  },
  {
    id: "team", en: "Team", uk: "Команда", price: 49, periodEn: "/user/mo", periodUk: "/юзер/міс",
    featuresEn: ["Everything in Pro", "Team analytics dashboard", "Custom learning paths", "Admin panel", "SSO integration", "Dedicated account manager"],
    featuresUk: ["Все з Pro", "Аналітика команди", "Кастомні навчальні шляхи", "Адмін-панель", "SSO інтеграція", "Персональний менеджер"],
    highlight: false,
  },
];

/* ───── component ───── */

export function SkillUpDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [pathGoal, setPathGoal] = useState<string | null>(null);
  const [pathField, setPathField] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSent, setNewsletterSent] = useState(false);

  const filteredCourses = COURSES.filter((c) => {
    const matchCat = activeCategory === "all" || c.category === activeCategory;
    const title = isUk ? c.titleUk : c.titleEn;
    const matchSearch = !searchQuery || title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const selectedField = PATH_FIELDS.find((f) => f.id === pathField);
  const pathCourses = selectedField
    ? selectedField.courses.map((id) => COURSES.find((c) => c.id === id)!).filter(Boolean)
    : [];
  const pathTotalHours = pathCourses.reduce((sum, c) => sum + c.modules.reduce((s, m) => s + m.hours, 0), 0);
  const pathTotalPrice = pathCourses.reduce((sum, c) => sum + c.price, 0);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* ── Header ── */}
      <header className="sticky top-0 z-30 border-b border-indigo-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <span className="text-xl font-bold text-indigo-700">🎓 SkillUp</span>
          <nav className="hidden gap-6 text-sm font-medium text-gray-600 md:flex">
            {[
              [isUk ? "Курси" : "Courses"],
              [isUk ? "Категорії" : "Categories"],
              [isUk ? "Інструктори" : "Instructors"],
              [isUk ? "Ціни" : "Pricing"],
              [isUk ? "Блог" : "Blog"],
            ].map(([label]) => (
              <button key={label} className="transition hover:text-indigo-600">{label}</button>
            ))}
          </nav>
          <button className="rounded-lg bg-rose-500 px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-rose-600">
            {isUk ? "Почати навчання" : "Start Learning"}
          </button>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="bg-linear-to-br from-indigo-700 via-indigo-600 to-indigo-500 px-4 py-20 text-center text-white">
        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">
          {isUk ? "Навчайся. Зростай. Досягай." : "Learn. Grow. Achieve."}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-indigo-100">
          {isUk
            ? "Понад 500 курсів від найкращих викладачів. Прокачай навички та побудуй кар'єру мрії."
            : "Over 500 courses from top instructors. Level up your skills and build the career you dream of."}
        </p>

        {/* Stats */}
        <div className="mx-auto mt-10 flex max-w-xl flex-wrap justify-center gap-8">
          {[
            { value: "500+", en: "Courses", uk: "Курсів" },
            { value: "50K+", en: "Students", uk: "Студентів" },
            { value: "200+", en: "Instructors", uk: "Викладачів" },
          ].map((s) => (
            <div key={s.en} className="text-center">
              <p className="text-3xl font-extrabold">{s.value}</p>
              <p className="text-sm text-indigo-200">{isUk ? s.uk : s.en}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="mx-auto mt-10 flex max-w-lg overflow-hidden rounded-xl bg-white shadow-lg">
          <span className="flex shrink-0 items-center pl-4 text-lg">🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isUk ? "Шукати курси..." : "Search courses..."}
            className="w-full px-3 py-3 text-gray-700 outline-none"
          />
          <button className="shrink-0 bg-indigo-600 px-6 text-sm font-semibold text-white transition hover:bg-indigo-700">
            {isUk ? "Знайти" : "Search"}
          </button>
        </div>
      </section>

      {/* ── Course Catalog ── */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          {isUk ? "Каталог курсів" : "Course Catalog"}
        </h2>
        <p className="mt-2 text-center text-gray-500">
          {isUk ? "Оберіть категорію та знайдіть ідеальний курс" : "Choose a category and find your perfect course"}
        </p>

        {/* Category filter */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeCategory === cat.id
                  ? "bg-indigo-600 text-white shadow"
                  : "bg-white text-gray-600 hover:bg-indigo-50"
              }`}
            >
              {cat.emoji} {isUk ? cat.uk : cat.en}
            </button>
          ))}
        </div>

        {/* Course grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => {
            const totalHours = course.modules.reduce((s, m) => s + m.hours, 0);
            return (
              <div
                key={course.id}
                className="group cursor-pointer rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-lg"
                onClick={() => setSelectedCourse(course)}
              >
                <div className="mb-3 text-4xl">{course.emoji}</div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600">
                  {isUk ? course.titleUk : course.titleEn}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {isUk ? course.instructorUk : course.instructorEn}
                </p>
                <div className="mt-3 flex items-center gap-3 text-sm text-gray-500">
                  <span>⭐ {course.rating}</span>
                  <span>👥 {course.students.toLocaleString()}</span>
                  <span>⏱ {totalHours}h</span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-indigo-700">${course.price}</span>
                  <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700">
                    {isUk ? "Записатися" : "Enroll"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCourses.length === 0 && (
          <p className="mt-10 text-center text-gray-400">
            {isUk ? "Курсів не знайдено. Спробуйте інший пошук." : "No courses found. Try a different search."}
          </p>
        )}
      </section>

      {/* ── Course Detail Modal ── */}
      {selectedCourse && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedCourse(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-4xl">{selectedCourse.emoji}</span>
                <h3 className="mt-2 text-2xl font-bold text-gray-900">
                  {isUk ? selectedCourse.titleUk : selectedCourse.titleEn}
                </h3>
                <p className="mt-1 text-gray-500">
                  {isUk ? selectedCourse.instructorUk : selectedCourse.instructorEn}
                </p>
              </div>
              <button
                onClick={() => setSelectedCourse(null)}
                className="shrink-0 text-2xl text-gray-400 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
              <span>⭐ {selectedCourse.rating}</span>
              <span>👥 {selectedCourse.students.toLocaleString()} {isUk ? "студентів" : "students"}</span>
            </div>

            <p className="mt-4 text-gray-600">
              {isUk ? selectedCourse.descUk : selectedCourse.descEn}
            </p>

            {/* Curriculum */}
            <h4 className="mt-6 text-lg font-bold text-gray-900">
              {isUk ? "Навчальна програма" : "Curriculum"}
            </h4>
            <ol className="mt-3 space-y-2">
              {selectedCourse.modules.map((mod, i) => (
                <li key={i} className="flex items-center justify-between rounded-lg bg-indigo-50 px-4 py-3 text-sm">
                  <span className="font-medium text-gray-800">
                    {i + 1}. {isUk ? mod.uk : mod.en}
                  </span>
                  <span className="shrink-0 text-gray-500">{mod.hours}h</span>
                </li>
              ))}
            </ol>

            {/* What you'll learn */}
            <h4 className="mt-6 text-lg font-bold text-gray-900">
              {isUk ? "Що ви вивчите" : "What you'll learn"}
            </h4>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {(isUk ? selectedCourse.learnUk : selectedCourse.learnEn).map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="shrink-0 text-green-500">✅</span> {item}
                </li>
              ))}
            </ul>

            {/* Requirements */}
            <h4 className="mt-6 text-lg font-bold text-gray-900">
              {isUk ? "Вимоги" : "Requirements"}
            </h4>
            <ul className="mt-3 space-y-1">
              {(isUk ? selectedCourse.requirementsUk : selectedCourse.requirementsEn).map((req, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="shrink-0">📌</span> {req}
                </li>
              ))}
            </ul>

            {/* Instructor bio */}
            <h4 className="mt-6 text-lg font-bold text-gray-900">
              {isUk ? "Про інструктора" : "About the Instructor"}
            </h4>
            <p className="mt-2 text-sm text-gray-600">
              {isUk ? selectedCourse.instructorBioUk : selectedCourse.instructorBioEn}
            </p>

            {/* Enroll */}
            <div className="mt-8 flex items-center justify-between rounded-xl bg-linear-to-br from-indigo-600 to-indigo-500 p-6 text-white">
              <div>
                <p className="text-2xl font-bold">${selectedCourse.price}</p>
                <p className="text-sm text-indigo-200">{isUk ? "Повний доступ назавжди" : "Full lifetime access"}</p>
              </div>
              <button className="rounded-lg bg-rose-500 px-8 py-3 font-bold text-white shadow transition hover:bg-rose-600">
                {isUk ? "Записатися зараз" : "Enroll Now"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Learning Path Builder ── */}
      <section className="bg-indigo-50 px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            {isUk ? "Конструктор навчального шляху" : "Learning Path Builder"}
          </h2>
          <p className="mt-2 text-gray-500">
            {isUk ? "Оберіть мету та напрямок — ми підберемо курси для вас" : "Choose your goal and field — we'll recommend courses for you"}
          </p>

          {/* Step 1: Goal */}
          <div className="mt-10">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-indigo-600">
              {isUk ? "Крок 1 — Ваша мета" : "Step 1 — Your Goal"}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {PATH_GOALS.map((g) => (
                <button
                  key={g.id}
                  onClick={() => { setPathGoal(g.id); setPathField(null); }}
                  className={`rounded-xl px-6 py-3 text-sm font-medium transition ${
                    pathGoal === g.id
                      ? "bg-indigo-600 text-white shadow"
                      : "bg-white text-gray-700 hover:bg-indigo-100"
                  }`}
                >
                  {g.emoji} {isUk ? g.uk : g.en}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Field */}
          {pathGoal && (
            <div className="mt-8">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-indigo-600">
                {isUk ? "Крок 2 — Напрямок" : "Step 2 — Your Field"}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {PATH_FIELDS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setPathField(f.id)}
                    className={`rounded-xl px-6 py-3 text-sm font-medium transition ${
                      pathField === f.id
                        ? "bg-indigo-600 text-white shadow"
                        : "bg-white text-gray-700 hover:bg-indigo-100"
                    }`}
                  >
                    {f.emoji} {isUk ? f.uk : f.en}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recommended path */}
          {pathField && pathCourses.length > 0 && (
            <div className="mt-10">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-indigo-600">
                {isUk ? "Ваш рекомендований шлях" : "Your Recommended Path"}
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                {pathCourses.map((c, i) => (
                  <div key={c.id} className="rounded-2xl bg-white p-5 shadow-sm">
                    <p className="mb-1 text-xs font-bold uppercase text-indigo-400">
                      {isUk ? `Курс ${i + 1}` : `Course ${i + 1}`}
                    </p>
                    <span className="text-3xl">{c.emoji}</span>
                    <h4 className="mt-2 font-bold text-gray-900">{isUk ? c.titleUk : c.titleEn}</h4>
                    <p className="mt-1 text-sm text-gray-500">
                      {c.modules.reduce((s, m) => s + m.hours, 0)}h &middot; ${c.price}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 inline-flex gap-6 rounded-xl bg-indigo-600 px-8 py-4 text-white">
                <div className="text-center">
                  <p className="text-2xl font-bold">{pathTotalHours}h</p>
                  <p className="text-xs text-indigo-200">{isUk ? "Загалом годин" : "Total Hours"}</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">${pathTotalPrice}</p>
                  <p className="text-xs text-indigo-200">{isUk ? "Загальна вартість" : "Total Price"}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          {isUk ? "Тарифні плани" : "Pricing"}
        </h2>
        <p className="mt-2 text-center text-gray-500">
          {isUk ? "Оберіть план, що підходить саме вам" : "Choose the plan that fits your needs"}
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {PRICING.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl border-2 p-8 text-center transition ${
                plan.highlight
                  ? "border-indigo-600 bg-white shadow-xl"
                  : "border-gray-100 bg-white shadow-sm"
              }`}
            >
              {plan.highlight && (
                <span className="mb-4 inline-block rounded-full bg-indigo-100 px-4 py-1 text-xs font-bold uppercase text-indigo-700">
                  {isUk ? "Популярний" : "Most Popular"}
                </span>
              )}
              <h3 className="text-xl font-bold text-gray-900">{isUk ? plan.uk : plan.en}</h3>
              <p className="mt-4">
                <span className="text-4xl font-extrabold text-indigo-700">
                  {plan.price === 0 ? (isUk ? "Безкоштовно" : "Free") : `$${plan.price}`}
                </span>
                {plan.price > 0 && (
                  <span className="text-gray-500">{isUk ? plan.periodUk : plan.periodEn}</span>
                )}
              </p>
              <ul className="mt-6 space-y-3 text-left text-sm text-gray-600">
                {(isUk ? plan.featuresUk : plan.featuresEn).map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="shrink-0 text-green-500">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button
                className={`mt-8 w-full rounded-lg py-3 text-sm font-bold transition ${
                  plan.highlight
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                }`}
              >
                {isUk ? "Обрати план" : "Get Started"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── Instructors ── */}
      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            {isUk ? "Топ-інструктори" : "Top Instructors"}
          </h2>
          <p className="mt-2 text-center text-gray-500">
            {isUk ? "Навчайтеся у найкращих фахівців індустрії" : "Learn from the best industry experts"}
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {INSTRUCTORS.map((inst) => (
              <div key={inst.nameEn} className="rounded-2xl border border-gray-100 bg-gray-50 p-6 text-center shadow-sm">
                <span className="text-5xl">{inst.emoji}</span>
                <h3 className="mt-3 text-lg font-bold text-gray-900">
                  {isUk ? inst.nameUk : inst.nameEn}
                </h3>
                <p className="text-sm text-indigo-600">{isUk ? inst.expertiseUk : inst.expertiseEn}</p>
                <div className="mt-4 flex justify-center gap-4 text-sm text-gray-500">
                  <span>📚 {inst.courses} {isUk ? "курсів" : "courses"}</span>
                  <span>⭐ {inst.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-linear-to-br from-indigo-700 to-indigo-600 px-4 py-16 text-white">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold">
            {isUk ? "Історії успіху студентів" : "Student Success Stories"}
          </h2>
          <p className="mt-2 text-center text-indigo-200">
            {isUk ? "Реальні результати наших випускників" : "Real results from our graduates"}
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.nameEn} className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <span className="text-4xl">{t.emoji}</span>
                <p className="mt-4 text-sm leading-relaxed text-indigo-100">
                  &ldquo;{isUk ? t.textUk : t.textEn}&rdquo;
                </p>
                <div className="mt-4 border-t border-white/20 pt-4">
                  <p className="font-bold">{isUk ? t.nameUk : t.nameEn}</p>
                  <p className="text-xs text-indigo-300">
                    {isUk ? t.courseUk : t.courseEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-xl text-center">
          <span className="text-4xl">📬</span>
          <h2 className="mt-3 text-2xl font-bold text-gray-900">
            {isUk ? "Отримуйте щотижневі поради" : "Get Weekly Learning Tips"}
          </h2>
          <p className="mt-2 text-gray-500">
            {isUk ? "Корисні статті, знижки та нові курси — прямо у вашу пошту" : "Useful articles, discounts, and new courses — straight to your inbox"}
          </p>
          {!newsletterSent ? (
            <div className="mx-auto mt-6 flex max-w-md overflow-hidden rounded-xl border border-gray-200 bg-gray-50 shadow-sm">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder={isUk ? "Ваш email" : "Your email"}
                className="w-full bg-transparent px-4 py-3 text-sm outline-none"
              />
              <button
                onClick={() => { if (newsletterEmail) setNewsletterSent(true); }}
                className="shrink-0 bg-rose-500 px-6 text-sm font-semibold text-white transition hover:bg-rose-600"
              >
                {isUk ? "Підписатися" : "Subscribe"}
              </button>
            </div>
          ) : (
            <p className="mt-6 font-semibold text-green-600">
              ✅ {isUk ? "Дякуємо за підписку!" : "Thanks for subscribing!"}
            </p>
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 bg-gray-900 px-4 py-12 text-gray-400">
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-4">
          <div>
            <h4 className="mb-3 text-sm font-bold uppercase text-white">
              {isUk ? "Категорії" : "Categories"}
            </h4>
            <ul className="space-y-2 text-sm">
              {["Programming", "Design", "Marketing", "Business", "Languages", "Data Science"].map((c) => (
                <li key={c}><button className="transition hover:text-white">{c}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-bold uppercase text-white">
              {isUk ? "Компанія" : "Company"}
            </h4>
            <ul className="space-y-2 text-sm">
              {(isUk
                ? ["Про нас", "Кар'єра", "Партнери", "Прес"]
                : ["About Us", "Careers", "Partners", "Press"]
              ).map((item) => (
                <li key={item}><button className="transition hover:text-white">{item}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-bold uppercase text-white">
              {isUk ? "Підтримка" : "Support"}
            </h4>
            <ul className="space-y-2 text-sm">
              {(isUk
                ? ["Довідковий центр", "Зв'язатися з нами", "Політика конфіденційності", "Умови використання"]
                : ["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"]
              ).map((item) => (
                <li key={item}><button className="transition hover:text-white">{item}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <span className="text-xl font-bold text-white">🎓 SkillUp</span>
            <p className="mt-3 text-sm">
              {isUk
                ? "Освітня платформа нового покоління. Навчайтеся де завгодно, коли завгодно."
                : "Next-generation education platform. Learn anywhere, anytime."}
            </p>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-6xl border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          &copy; 2026 SkillUp. {isUk ? "Усі права захищені." : "All rights reserved."}
        </div>
      </footer>
    </div>
  );
}
