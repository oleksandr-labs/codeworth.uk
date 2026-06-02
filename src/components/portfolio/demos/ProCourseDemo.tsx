"use client";

import { useState } from "react";

export function ProCourseDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [sortBy, setSortBy] = useState<"popular" | "newest" | "price">("popular");
  const [employees, setEmployees] = useState(5);
  const [corpCourseType, setCorpCourseType] = useState(0);
  const [contactType, setContactType] = useState<"individual" | "corporate">("individual");
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", interest: "" });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  /* ── nav ── */
  const nav = isUk
    ? ["Курси", "Сертифікації", "Корпоративне", "Інструктори", "Контакти"]
    : ["Courses", "Certifications", "Corporate", "Instructors", "Contact"];

  /* ── categories ── */
  const categories = isUk
    ? [
        { icon: "💻", title: "IT та Розробка", count: 24, color: "bg-teal-50 text-teal-700 border-teal-200" },
        { icon: "📋", title: "Управління проєктами", count: 18, color: "bg-amber-50 text-amber-700 border-amber-200" },
        { icon: "💰", title: "Фінанси та Бухгалтерія", count: 15, color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
        { icon: "👥", title: "HR та Менеджмент", count: 12, color: "bg-sky-50 text-sky-700 border-sky-200" },
        { icon: "📈", title: "Маркетинг та Продажі", count: 16, color: "bg-rose-50 text-rose-700 border-rose-200" },
        { icon: "🛡️", title: "Безпека та Комплаєнс", count: 9, color: "bg-slate-50 text-slate-700 border-slate-200" },
      ]
    : [
        { icon: "💻", title: "IT & Development", count: 24, color: "bg-teal-50 text-teal-700 border-teal-200" },
        { icon: "📋", title: "Project Management", count: 18, color: "bg-amber-50 text-amber-700 border-amber-200" },
        { icon: "💰", title: "Finance & Accounting", count: 15, color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
        { icon: "👥", title: "HR & Management", count: 12, color: "bg-sky-50 text-sky-700 border-sky-200" },
        { icon: "📈", title: "Marketing & Sales", count: 16, color: "bg-rose-50 text-rose-700 border-rose-200" },
        { icon: "🛡️", title: "Safety & Compliance", count: 9, color: "bg-slate-50 text-slate-700 border-slate-200" },
      ];

  /* ── courses ── */
  const courses = isUk
    ? [
        { id: 1, title: "Повний курс Python для бізнесу", category: "IT та Розробка", weeks: 8, format: "online" as const, certificate: true, price: 8500, popular: 98, date: "2026-03-01" },
        { id: 2, title: "PMP: Підготовка до сертифікації", category: "Управління проєктами", weeks: 12, format: "hybrid" as const, certificate: true, price: 14200, popular: 95, date: "2026-02-15" },
        { id: 3, title: "Фінансовий аналіз для менеджерів", category: "Фінанси та Бухгалтерія", weeks: 6, format: "online" as const, certificate: true, price: 6800, popular: 87, date: "2026-03-10" },
        { id: 4, title: "HR-стратегія та People Analytics", category: "HR та Менеджмент", weeks: 10, format: "offline" as const, certificate: true, price: 11500, popular: 82, date: "2026-01-20" },
        { id: 5, title: "Digital Marketing Pro", category: "Маркетинг та Продажі", weeks: 8, format: "online" as const, certificate: true, price: 7900, popular: 91, date: "2026-03-15" },
        { id: 6, title: "Охорона праці: Стандарти ISO", category: "Безпека та Комплаєнс", weeks: 4, format: "hybrid" as const, certificate: true, price: 5200, popular: 76, date: "2026-02-01" },
      ]
    : [
        { id: 1, title: "Complete Python for Business", category: "IT & Development", weeks: 8, format: "online" as const, certificate: true, price: 320, popular: 98, date: "2026-03-01" },
        { id: 2, title: "PMP: Certification Prep", category: "Project Management", weeks: 12, format: "hybrid" as const, certificate: true, price: 540, popular: 95, date: "2026-02-15" },
        { id: 3, title: "Financial Analysis for Managers", category: "Finance & Accounting", weeks: 6, format: "online" as const, certificate: true, price: 260, popular: 87, date: "2026-03-10" },
        { id: 4, title: "HR Strategy & People Analytics", category: "HR & Management", weeks: 10, format: "offline" as const, certificate: true, price: 440, popular: 82, date: "2026-01-20" },
        { id: 5, title: "Digital Marketing Pro", category: "Marketing & Sales", weeks: 8, format: "online" as const, certificate: true, price: 300, popular: 91, date: "2026-03-15" },
        { id: 6, title: "Workplace Safety: ISO Standards", category: "Safety & Compliance", weeks: 4, format: "hybrid" as const, certificate: true, price: 200, popular: 76, date: "2026-02-01" },
      ];

  const sortedCourses = [...courses].sort((a, b) => {
    if (sortBy === "popular") return b.popular - a.popular;
    if (sortBy === "newest") return new Date(b.date).getTime() - new Date(a.date).getTime();
    return a.price - b.price;
  });

  const formatBadge = (f: "online" | "offline" | "hybrid") => {
    const map = { online: "🌐", offline: "🏢", hybrid: "🔄" };
    const labelEn = { online: "Online", offline: "Offline", hybrid: "Hybrid" };
    const labelUk = { online: "Онлайн", offline: "Офлайн", hybrid: "Гібрид" };
    return `${map[f]} ${isUk ? labelUk[f] : labelEn[f]}`;
  };

  /* ── certification paths ── */
  const certPaths = isUk
    ? [
        { icon: "📋", title: "PMP Підготовка", courses: ["Основи PM", "Agile & Scrum", "Управління ризиками", "PMP Mock-екзамен"], hours: 180, exam: "PMP (PMI)", outcome: "Проджект-менеджер середньої та вищої ланки" },
        { icon: "📊", title: "Google Analytics", courses: ["Основи аналітики", "GA4 Поглиблено", "Tag Manager Pro"], hours: 120, exam: "Google Analytics Certified", outcome: "Digital-аналітик, маркетинг-менеджер" },
        { icon: "☁️", title: "AWS Cloud", courses: ["Cloud Foundations", "Solutions Architect", "DevOps Essentials", "Security Specialty"], hours: 220, exam: "AWS Solutions Architect", outcome: "Cloud-інженер, DevOps-спеціаліст" },
      ]
    : [
        { icon: "📋", title: "PMP Preparation", courses: ["PM Fundamentals", "Agile & Scrum", "Risk Management", "PMP Mock Exam"], hours: 180, exam: "PMP (PMI)", outcome: "Mid-to-senior project manager" },
        { icon: "📊", title: "Google Analytics", courses: ["Analytics Fundamentals", "GA4 Advanced", "Tag Manager Pro"], hours: 120, exam: "Google Analytics Certified", outcome: "Digital analyst, marketing manager" },
        { icon: "☁️", title: "AWS Cloud", courses: ["Cloud Foundations", "Solutions Architect", "DevOps Essentials", "Security Specialty"], hours: 220, exam: "AWS Solutions Architect", outcome: "Cloud engineer, DevOps specialist" },
      ];

  /* ── corporate pricing ── */
  const corpCourses = isUk
    ? [
        { name: "IT та Розробка", basePrice: 7500 },
        { name: "Управління проєктами", basePrice: 9000 },
        { name: "Лідерство та Менеджмент", basePrice: 8000 },
      ]
    : [
        { name: "IT & Development", basePrice: 280 },
        { name: "Project Management", basePrice: 340 },
        { name: "Leadership & Management", basePrice: 300 },
      ];

  const getDiscount = (n: number) => {
    if (n >= 20) return 30;
    if (n >= 10) return 20;
    if (n >= 5) return 10;
    return 0;
  };

  const discount = getDiscount(employees);
  const baseTotal = corpCourses[corpCourseType].basePrice * employees;
  const discountedTotal = baseTotal * (1 - discount / 100);
  const currency = isUk ? "₴" : "$";

  /* ── success stories ── */
  const stories = isUk
    ? [
        { name: "Олена Коваленко", course: "PMP Підготовка", outcome: "Отримала підвищення до Head of PMO", avatar: "👩‍💼" },
        { name: "Дмитро Савченко", course: "Python для бізнесу", outcome: "Змінив кар'єру з продажів в IT", avatar: "👨‍💻" },
        { name: "Марія Литвин", course: "Digital Marketing Pro", outcome: "Запустила власне маркетинг-агентство", avatar: "👩‍🚀" },
      ]
    : [
        { name: "Olena Kovalenko", course: "PMP Preparation", outcome: "Got promoted to Head of PMO", avatar: "👩‍💼" },
        { name: "Dmytro Savchenko", course: "Python for Business", outcome: "Changed career from sales to IT", avatar: "👨‍💻" },
        { name: "Maria Lytvyn", course: "Digital Marketing Pro", outcome: "Started her own marketing agency", avatar: "👩‍🚀" },
      ];

  /* ── instructors ── */
  const instructors = isUk
    ? [
        { avatar: "👨‍🏫", name: "Ігор Мельник", role: "IT & DevOps", exp: "15+ років у SoftServe, AWS Certified", courses: 8 },
        { avatar: "👩‍🏫", name: "Тетяна Бондар", role: "Project Management", exp: "PMP, PMI-ACP, 12 років у EPAM", courses: 6 },
        { avatar: "👨‍💼", name: "Олексій Кравчук", role: "Фінанси та Аналітика", exp: "CFA, 10 років у Big Four", courses: 5 },
        { avatar: "👩‍💻", name: "Наталія Шевчук", role: "Digital Marketing", exp: "Google Certified, 8 років у Publicis", courses: 7 },
      ]
    : [
        { avatar: "👨‍🏫", name: "Ihor Melnyk", role: "IT & DevOps", exp: "15+ years at SoftServe, AWS Certified", courses: 8 },
        { avatar: "👩‍🏫", name: "Tetiana Bondar", role: "Project Management", exp: "PMP, PMI-ACP, 12 years at EPAM", courses: 6 },
        { avatar: "👨‍💼", name: "Oleksiy Kravchuk", role: "Finance & Analytics", exp: "CFA, 10 years at Big Four", courses: 5 },
        { avatar: "👩‍💻", name: "Natalia Shevchuk", role: "Digital Marketing", exp: "Google Certified, 8 years at Publicis", courses: 7 },
      ];

  /* ── upcoming schedule ── */
  const schedule = isUk
    ? [
        { date: "07.04.2026", name: "Python для бізнесу", format: "Онлайн", spots: 8 },
        { date: "14.04.2026", name: "PMP Підготовка", format: "Гібрид", spots: 5 },
        { date: "21.04.2026", name: "Google Analytics Pro", format: "Онлайн", spots: 12 },
        { date: "28.04.2026", name: "HR-стратегія", format: "Офлайн", spots: 3 },
        { date: "05.05.2026", name: "AWS Cloud Foundations", format: "Онлайн", spots: 10 },
      ]
    : [
        { date: "Apr 7, 2026", name: "Python for Business", format: "Online", spots: 8 },
        { date: "Apr 14, 2026", name: "PMP Preparation", format: "Hybrid", spots: 5 },
        { date: "Apr 21, 2026", name: "Google Analytics Pro", format: "Online", spots: 12 },
        { date: "Apr 28, 2026", name: "HR Strategy", format: "Offline", spots: 3 },
        { date: "May 5, 2026", name: "AWS Cloud Foundations", format: "Online", spots: 10 },
      ];

  /* ── interests for contact form ── */
  const interests = isUk
    ? ["IT та Розробка", "Управління проєктами", "Фінанси", "HR та Менеджмент", "Маркетинг", "Безпека та Комплаєнс"]
    : ["IT & Development", "Project Management", "Finance", "HR & Management", "Marketing", "Safety & Compliance"];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email) setContactSubmitted(true);
  };

  /* ── corporate benefits ── */
  const corpBenefits = isUk
    ? [
        { icon: "🎯", title: "Індивідуальна програма", desc: "Адаптуємо курси під потреби вашої компанії" },
        { icon: "📊", title: "Звіти про прогрес", desc: "Детальна аналітика навчання кожного співробітника" },
        { icon: "🏆", title: "Сертифікація команди", desc: "Офіційні сертифікати для всіх учасників" },
        { icon: "💼", title: "Гнучкий графік", desc: "Навчання у зручний для компанії час" },
      ]
    : [
        { icon: "🎯", title: "Custom Programs", desc: "Courses tailored to your company's needs" },
        { icon: "📊", title: "Progress Reports", desc: "Detailed analytics for each employee's learning" },
        { icon: "🏆", title: "Team Certification", desc: "Official certificates for all participants" },
        { icon: "💼", title: "Flexible Schedule", desc: "Training at times convenient for your company" },
      ];

  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* ── Header ── */}
      <header className="bg-white border-b border-gray-200 dark:border-neutral-700 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="text-xl font-bold text-teal-800">📚 ProCourse</span>
          <nav className="hidden md:flex items-center gap-6">
            {nav.map((item) => (
              <button key={item} className="text-sm text-gray-600 dark:text-neutral-300 hover:text-teal-700 transition-colors">
                {item}
              </button>
            ))}
          </nav>
          <button className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors">
            {isUk ? "Обрати курс" : "Browse Courses"}
          </button>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="bg-linear-to-br from-teal-800 via-teal-700 to-teal-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            {isUk ? "Професійна Освіта Нового Рівня" : "Professional Education of a New Level"}
          </h1>
          <p className="text-teal-100 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            {isUk
              ? "Отримайте сертифікації, що підвищать вашу кар'єру. Курси від практиків індустрії з гарантією результату."
              : "Earn career-boosting certifications from industry practitioners. Guaranteed results with every course."}
          </p>
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            {[
              { value: "100+", label: isUk ? "Курсів" : "Courses" },
              { value: "15K+", label: isUk ? "Випускників" : "Graduates" },
              { value: "95%", label: isUk ? "Працевлаштування" : "Employment Rate" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-extrabold text-amber-400">{s.value}</div>
                <div className="text-teal-200 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3 rounded-lg text-lg transition-colors">
            {isUk ? "Розпочати навчання" : "Start Learning"}
          </button>
        </div>
      </section>

      {/* ── Course Categories ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-teal-900 mb-2">
            {isUk ? "Напрямки навчання" : "Course Categories"}
          </h2>
          <p className="text-gray-500 dark:text-neutral-400 text-center mb-10">
            {isUk ? "Оберіть напрямок, що відповідає вашим кар'єрним цілям" : "Choose a direction that matches your career goals"}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat) => (
              <div
                key={cat.title}
                className={`border rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer ${cat.color}`}
              >
                <div className="text-3xl mb-3">{cat.icon}</div>
                <h3 className="font-bold text-lg mb-1">{cat.title}</h3>
                <p className="text-sm opacity-80 mb-3">
                  {cat.count} {isUk ? "курсів" : "courses"}
                </p>
                <span className="text-sm font-semibold hover:underline">
                  {isUk ? "Переглянути →" : "Explore →"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Courses ── */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-teal-900 mb-2">
            {isUk ? "Обрані курси" : "Featured Courses"}
          </h2>
          <p className="text-gray-500 dark:text-neutral-400 text-center mb-8">
            {isUk ? "Найкращі програми для професійного зростання" : "Top programs for professional growth"}
          </p>

          {/* Sort controls */}
          <div className="flex justify-center gap-2 mb-8">
            {(["popular", "newest", "price"] as const).map((key) => {
              const labels = {
                popular: isUk ? "Популярні" : "Popular",
                newest: isUk ? "Нові" : "Newest",
                price: isUk ? "За ціною" : "Price",
              };
              return (
                <button
                  key={key}
                  onClick={() => setSortBy(key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    sortBy === key
                      ? "bg-teal-700 text-white"
                      : "bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-neutral-300 hover:bg-gray-200"
                  }`}
                >
                  {labels[key]}
                </button>
              );
            })}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCourses.map((course) => (
              <div
                key={course.id}
                className="border border-gray-200 dark:border-neutral-700 rounded-xl overflow-hidden hover:shadow-lg transition-shadow bg-white"
              >
                <div className="bg-linear-to-br from-teal-700 to-teal-900 p-4">
                  <span className="inline-block bg-white/20 text-white text-xs font-medium px-2 py-1 rounded">
                    {course.category}
                  </span>
                  <h3 className="text-white font-bold text-lg mt-2 leading-snug">{course.title}</h3>
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 px-2 py-1 rounded-full">
                      ⏱️ {course.weeks} {isUk ? "тижнів" : "weeks"}
                    </span>
                    <span className="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded-full">
                      {formatBadge(course.format)}
                    </span>
                    {course.certificate && (
                      <span className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full">
                        🏅 {isUk ? "Сертифікат" : "Certificate"}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-extrabold text-teal-800">
                      {isUk ? `${course.price} ₴` : `$${course.price}`}
                    </span>
                    <button className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors">
                      {isUk ? "Записатися" : "Enroll"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certification Paths ── */}
      <section className="py-16 bg-teal-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-teal-900 mb-2">
            {isUk ? "Шляхи сертифікації" : "Certification Paths"}
          </h2>
          <p className="text-gray-500 dark:text-neutral-400 text-center mb-10">
            {isUk
              ? "Послідовні програми для отримання міжнародних сертифікацій"
              : "Structured programs to earn internationally recognized certifications"}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {certPaths.map((path) => (
              <div key={path.title} className="bg-white rounded-xl p-6 shadow-sm border border-teal-100">
                <div className="text-4xl mb-3">{path.icon}</div>
                <h3 className="text-xl font-bold text-teal-800 mb-4">{path.title}</h3>
                <div className="space-y-2 mb-5">
                  {path.courses.map((c, i) => (
                    <div key={c} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="w-6 h-6 shrink-0 rounded-full bg-teal-100 text-teal-700 text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      {c}
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 dark:border-neutral-700 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>⏱️ {isUk ? "Годин" : "Hours"}</span>
                    <span className="font-semibold text-gray-900">{path.hours}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>📝 {isUk ? "Екзамен" : "Exam"}</span>
                    <span className="font-semibold text-gray-900">{path.exam}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>🎯 {isUk ? "Результат" : "Outcome"}</span>
                    <span className="font-semibold text-gray-900 dark:text-white text-right max-w-[60%]">{path.outcome}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Corporate Training ── */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-teal-900 mb-2">
            {isUk ? "Навчання для компаній" : "Train Your Team"}
          </h2>
          <p className="text-gray-500 dark:text-neutral-400 text-center mb-10">
            {isUk
              ? "Корпоративні програми з гнучкими умовами та знижками"
              : "Corporate programs with flexible terms and volume discounts"}
          </p>

          {/* Benefits */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {corpBenefits.map((b) => (
              <div key={b.title} className="bg-white border border-gray-200 dark:border-neutral-700 rounded-xl p-5 text-center">
                <div className="text-3xl mb-2">{b.icon}</div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-1">{b.title}</h4>
                <p className="text-sm text-gray-500">{b.desc}</p>
              </div>
            ))}
          </div>

          {/* Bulk pricing calculator */}
          <div className="max-w-lg mx-auto bg-linear-to-br from-teal-800 to-teal-900 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-bold mb-6 text-center">
              {isUk ? "Калькулятор корпоративних знижок" : "Bulk Pricing Calculator"}
            </h3>

            {/* Course type */}
            <label className="block text-sm text-teal-200 mb-2">
              {isUk ? "Тип курсу" : "Course Type"}
            </label>
            <div className="flex gap-2 mb-5">
              {corpCourses.map((cc, i) => (
                <button
                  key={cc.name}
                  onClick={() => setCorpCourseType(i)}
                  className={`text-xs px-3 py-2 rounded-lg transition-colors font-medium ${
                    corpCourseType === i
                      ? "bg-amber-500 text-white"
                      : "bg-teal-700/50 text-teal-200 hover:bg-teal-700"
                  }`}
                >
                  {cc.name}
                </button>
              ))}
            </div>

            {/* Employees */}
            <label className="block text-sm text-teal-200 mb-2">
              {isUk ? "Кількість співробітників" : "Number of Employees"}: {employees}
            </label>
            <input
              type="range"
              min={1}
              max={50}
              value={employees}
              onChange={(e) => setEmployees(Number(e.target.value))}
              className="w-full mb-6 accent-amber-500"
            />

            {/* Discount tiers */}
            <div className="flex justify-between text-xs text-teal-300 mb-6">
              <span>1-4: 0%</span>
              <span>5-9: 10%</span>
              <span>10-19: 20%</span>
              <span>20+: 30%</span>
            </div>

            {/* Result */}
            <div className="bg-teal-700/40 rounded-xl p-5 text-center">
              {discount > 0 && (
                <div className="text-sm text-teal-300 line-through mb-1">
                  {currency}{baseTotal.toLocaleString()}
                </div>
              )}
              <div className="text-3xl font-extrabold text-amber-400">
                {currency}{Math.round(discountedTotal).toLocaleString()}
              </div>
              <div className="text-teal-200 text-sm mt-1">
                {discount > 0
                  ? `${isUk ? "Знижка" : "Discount"}: ${discount}%`
                  : isUk
                    ? "Додайте 5+ для знижки"
                    : "Add 5+ employees for a discount"}
              </div>
              <div className="text-teal-300 text-xs mt-2">
                {currency}{Math.round(discountedTotal / employees).toLocaleString()} / {isUk ? "особа" : "person"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Success Stories ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-teal-900 mb-2">
            {isUk ? "Історії успіху" : "Success Stories"}
          </h2>
          <p className="text-gray-500 dark:text-neutral-400 text-center mb-10">
            {isUk ? "Наші випускники досягають результатів" : "Our graduates achieve real results"}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {stories.map((s) => (
              <div key={s.name} className="bg-white rounded-xl p-6 border border-gray-200 dark:border-neutral-700 shadow-sm text-center">
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
                  {s.avatar}
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white text-lg">{s.name}</h4>
                <p className="text-sm text-teal-700 font-medium mt-1 mb-3">{s.course}</p>
                <p className="text-gray-600 dark:text-neutral-300 text-sm italic">&ldquo;{s.outcome}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Instructors ── */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-teal-900 mb-2">
            {isUk ? "Наші інструктори" : "Our Instructors"}
          </h2>
          <p className="text-gray-500 dark:text-neutral-400 text-center mb-10">
            {isUk ? "Практики з реальним досвідом у галузі" : "Practitioners with real industry experience"}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {instructors.map((inst) => (
              <div key={inst.name} className="bg-white border border-gray-200 dark:border-neutral-700 rounded-xl p-5 text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center text-3xl mx-auto mb-3">
                  {inst.avatar}
                </div>
                <h4 className="font-bold text-gray-900">{inst.name}</h4>
                <p className="text-sm text-amber-600 font-medium mt-1">{inst.role}</p>
                <p className="text-xs text-gray-500 dark:text-neutral-400 mt-2 mb-3">{inst.exp}</p>
                <span className="inline-block bg-teal-50 text-teal-700 text-xs font-medium px-3 py-1 rounded-full">
                  {inst.courses} {isUk ? "курсів" : "courses"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Upcoming Schedule ── */}
      <section className="py-16 bg-teal-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-teal-900 mb-2">
            {isUk ? "Найближчі старти" : "Upcoming Schedule"}
          </h2>
          <p className="text-gray-500 dark:text-neutral-400 text-center mb-10">
            {isUk ? "Встигніть зареєструватися — місця обмежені" : "Register before spots run out"}
          </p>
          <div className="bg-white rounded-xl border border-teal-100 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-teal-800 text-white text-left">
                    <th className="px-5 py-3 font-semibold">{isUk ? "Дата" : "Date"}</th>
                    <th className="px-5 py-3 font-semibold">{isUk ? "Курс" : "Course"}</th>
                    <th className="px-5 py-3 font-semibold">{isUk ? "Формат" : "Format"}</th>
                    <th className="px-5 py-3 font-semibold">{isUk ? "Місць" : "Spots"}</th>
                    <th className="px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((row, i) => (
                    <tr key={row.name} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-5 py-3 font-medium text-gray-700">{row.date}</td>
                      <td className="px-5 py-3 text-gray-900 dark:text-white font-semibold">{row.name}</td>
                      <td className="px-5 py-3 text-gray-600">{row.format}</td>
                      <td className="px-5 py-3">
                        <span
                          className={`font-bold ${
                            row.spots <= 5 ? "text-red-600" : "text-green-600"
                          }`}
                        >
                          {row.spots}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <button className="text-xs bg-amber-500 hover:bg-amber-600 text-white font-semibold px-4 py-1.5 rounded-lg transition-colors">
                          {isUk ? "Записатися" : "Enroll"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact Form ── */}
      <section className="py-16">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-teal-900 mb-2">
            {isUk ? "Зв'яжіться з нами" : "Get in Touch"}
          </h2>
          <p className="text-gray-500 dark:text-neutral-400 text-center mb-8">
            {isUk ? "Залиште заявку — ми зв'яжемося протягом 24 годин" : "Submit a request — we'll contact you within 24 hours"}
          </p>

          {contactSubmitted ? (
            <div className="bg-teal-50 border border-teal-200 rounded-xl p-8 text-center">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-teal-800 mb-2">
                {isUk ? "Дякуємо за заявку!" : "Thank you for your request!"}
              </h3>
              <p className="text-gray-600">
                {isUk ? "Наш менеджер зв'яжеться з вами найближчим часом." : "Our manager will contact you shortly."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="bg-white border border-gray-200 dark:border-neutral-700 rounded-xl p-6 shadow-sm">
              {/* Toggle */}
              <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-neutral-700 mb-6">
                {(["individual", "corporate"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setContactType(type)}
                    className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                      contactType === type
                        ? "bg-teal-700 text-white"
                        : "bg-white text-gray-600 dark:text-neutral-300 hover:bg-gray-50"
                    }`}
                  >
                    {type === "individual"
                      ? isUk ? "Фізична особа" : "Individual"
                      : isUk ? "Компанія" : "Corporate"}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">
                    {contactType === "corporate"
                      ? isUk ? "Контактна особа" : "Contact Person"
                      : isUk ? "Ім'я" : "Name"}
                  </label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder={isUk ? "Ваше ім'я" : "Your name"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">Email</label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">
                    {isUk ? "Телефон" : "Phone"}
                  </label>
                  <input
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="+380 XX XXX XXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1">
                    {isUk ? "Напрямок" : "Interest Area"}
                  </label>
                  <select
                    value={contactForm.interest}
                    onChange={(e) => setContactForm({ ...contactForm, interest: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
                  >
                    <option value="">{isUk ? "Оберіть напрямок" : "Select an area"}</option>
                    {interests.map((int) => (
                      <option key={int} value={int}>{int}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-lg transition-colors"
              >
                {isUk ? "Надіслати заявку" : "Submit Request"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-teal-900 text-teal-100 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {/* Categories */}
            <div>
              <h4 className="font-bold text-white mb-4">{isUk ? "Напрямки" : "Categories"}</h4>
              <ul className="space-y-2 text-sm text-teal-300">
                {categories.map((c) => (
                  <li key={c.title}>
                    <button className="hover:text-white transition-colors">{c.title}</button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Certifications */}
            <div>
              <h4 className="font-bold text-white mb-4">{isUk ? "Сертифікації" : "Certifications"}</h4>
              <ul className="space-y-2 text-sm text-teal-300">
                {certPaths.map((cp) => (
                  <li key={cp.title}>
                    <button className="hover:text-white transition-colors">{cp.title}</button>
                  </li>
                ))}
                <li><button className="hover:text-white transition-colors">IELTS Prep</button></li>
                <li><button className="hover:text-white transition-colors">Scrum Master</button></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold text-white mb-4">{isUk ? "Компанія" : "Company"}</h4>
              <ul className="space-y-2 text-sm text-teal-300">
                <li><button className="hover:text-white transition-colors">{isUk ? "Про нас" : "About Us"}</button></li>
                <li><button className="hover:text-white transition-colors">{isUk ? "Кар'єра" : "Careers"}</button></li>
                <li><button className="hover:text-white transition-colors">{isUk ? "Блог" : "Blog"}</button></li>
                <li><button className="hover:text-white transition-colors">{isUk ? "Партнерам" : "Partners"}</button></li>
                <li><button className="hover:text-white transition-colors">{isUk ? "Контакти" : "Contact"}</button></li>
              </ul>
            </div>

            {/* Accreditations */}
            <div>
              <h4 className="font-bold text-white mb-4">{isUk ? "Акредитації" : "Accreditations"}</h4>
              <div className="space-y-3">
                {[
                  { icon: "🏛️", name: isUk ? "МОН України" : "Ministry of Education" },
                  { icon: "🌍", name: "PMI Registered (R.E.P.)" },
                  { icon: "☁️", name: "AWS Training Partner" },
                  { icon: "📊", name: "Google Partner" },
                ].map((a) => (
                  <div key={a.name} className="flex items-center gap-2 text-sm text-teal-300">
                    <span>{a.icon}</span>
                    <span>{a.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-teal-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xl font-bold text-white">📚 ProCourse</span>
            <p className="text-sm text-teal-400">
              &copy; 2026 ProCourse. {isUk ? "Усі права захищені." : "All rights reserved."}
            </p>
            <div className="flex gap-4 text-teal-300">
              <button className="hover:text-white transition-colors text-sm">
                {isUk ? "Умови використання" : "Terms of Service"}
              </button>
              <button className="hover:text-white transition-colors text-sm">
                {isUk ? "Політика конфіденційності" : "Privacy Policy"}
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
