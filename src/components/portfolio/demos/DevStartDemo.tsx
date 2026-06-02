"use client";

import { useState } from "react";
import Link from "next/link";

interface Props { lang: string; }

export function DevStartDemo({ lang }: Props) {
  const isUk = lang === "uk";
  const [activeCourse, setActiveCourse] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email) setSubmitted(true);
  };

  const courses = isUk
    ? [
        { slug: "frontend", icon: "🖥️", title: "Frontend Developer", stack: ["HTML/CSS", "JavaScript", "React", "TypeScript", "Next.js"], duration: "5 місяців", schedule: "5 год/тиж", price: "12 500 ₴", hired: "87%", color: "from-sky-500 to-blue-600", badge: "Найпопулярніший" },
        { slug: "backend", icon: "⚙️", title: "Backend Developer", stack: ["Node.js", "PostgreSQL", "REST API", "Docker", "AWS"], duration: "6 місяців", schedule: "5 год/тиж", price: "14 000 ₴", hired: "81%", color: "from-emerald-500 to-teal-600", badge: null },
        { slug: "qa", icon: "🔍", title: "QA Engineer", stack: ["Manual Testing", "Selenium", "Playwright", "Postman", "JIRA"], duration: "4 місяці", schedule: "4 год/тиж", price: "9 500 ₴", hired: "79%", color: "from-violet-500 to-purple-600", badge: "Швидкий старт" },
      ]
    : [
        { slug: "frontend", icon: "🖥️", title: "Frontend Developer", stack: ["HTML/CSS", "JavaScript", "React", "TypeScript", "Next.js"], duration: "5 months", schedule: "5 hrs/wk", price: "$360", hired: "87%", color: "from-sky-500 to-blue-600", badge: "Most popular" },
        { slug: "backend", icon: "⚙️", title: "Backend Developer", stack: ["Node.js", "PostgreSQL", "REST API", "Docker", "AWS"], duration: "6 months", schedule: "5 hrs/wk", price: "$400", hired: "81%", color: "from-emerald-500 to-teal-600", badge: null },
        { slug: "qa", icon: "🔍", title: "QA Engineer", stack: ["Manual Testing", "Selenium", "Playwright", "Postman", "JIRA"], duration: "4 months", schedule: "4 hrs/wk", price: "$275", hired: "79%", color: "from-violet-500 to-purple-600", badge: "Quick start" },
      ];

  const steps = isUk
    ? [
        { num: "01", title: "Подача заявки", desc: "Залиш заявку онлайн. Запрошуємо на безкоштовний вебінар-знайомство.", icon: "📝" },
        { num: "02", title: "Вступний тест", desc: "30 хв онлайн-тест на логіку та базове мислення. Без програмування — підготовки не треба.", icon: "🧩" },
        { num: "03", title: "Навчання", desc: "Живі заняття 3 рази на тиждень + домашні завдання + код-рев'ю від ментора.", icon: "💻" },
        { num: "04", title: "Командний проєкт", desc: "Командна розробка реального продукту — те, що кладуть у портфоліо.", icon: "🚀" },
        { num: "05", title: "Кар'єрний центр", desc: "CV, LinkedIn, mock-інтерв'ю, рекомендації до 50+ партнерів-роботодавців.", icon: "🤝" },
      ]
    : [
        { num: "01", title: "Apply", desc: "Submit your application online. We'll invite you to a free introductory webinar.", icon: "📝" },
        { num: "02", title: "Entrance test", desc: "30-minute online logic test. No coding required — no preparation needed.", icon: "🧩" },
        { num: "03", title: "Training", desc: "Live sessions 3×/week + homework + code review from your mentor.", icon: "💻" },
        { num: "04", title: "Team project", desc: "Build a real product in a team — the kind you put in your portfolio.", icon: "🚀" },
        { num: "05", title: "Career centre", desc: "CV, LinkedIn, mock interviews, and recommendations to 50+ hiring partners.", icon: "🤝" },
      ];

  const careerItems = isUk
    ? [
        { icon: "📄", title: "CV та LinkedIn", desc: "Оформлення резюме та профілю під стандарти компаній" },
        { icon: "🎤", title: "Mock-інтерв'ю", desc: "Тренувальні технічні та HR-інтерв'ю з фідбеком" },
        { icon: "🏢", title: "50+ партнерів", desc: "Рекомендаційні листи до компаній-партнерів (EPAM, SoftServe та інші)" },
        { icon: "📊", title: "Гарантія до офферу", desc: "Кар'єрний центр підтримує вас до першого прийому на роботу" },
      ]
    : [
        { icon: "📄", title: "CV & LinkedIn", desc: "Resume and profile formatting to industry standards" },
        { icon: "🎤", title: "Mock interviews", desc: "Practice technical and HR interviews with written feedback" },
        { icon: "🏢", title: "50+ partners", desc: "Referral letters to partner companies (EPAM, SoftServe, and others)" },
        { icon: "📊", title: "Offer guarantee", desc: "Career centre supports you until your first accepted job offer" },
      ];

  const heroStats = isUk
    ? [{ val: "82%", label: "отримали офер за 3 міс" }, { val: "300+", label: "випускників у 20+ компаніях" }, { val: "50+", label: "партнерів-роботодавців" }]
    : [{ val: "82%", label: "received an offer within 3 months" }, { val: "300+", label: "graduates at 20+ companies" }, { val: "50+", label: "hiring partners" }];

  const salaryStats = isUk
    ? [{ val: "82%", sub: "отримали офер за 3 місяці" }, { val: "$800–1 400", sub: "середня перша зарплата" }]
    : [{ val: "82%", sub: "received an offer within 3 months" }, { val: "$800–1,400", sub: "average first salary" }];

  const companies = ["EPAM", "SoftServe", "GlobalLogic", "Intellias", "Luxoft", "Ciklum", "Stfalcon", "Uptech"];

  return (
    <div className="min-h-screen bg-[#09090f] font-sans text-white">

      {/* ── Nav ─────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-[#09090f]/95 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-black text-xl tracking-tight">Dev<span className="text-emerald-400">Start</span></span>
            <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full ml-1">BOOTCAMP</span>
          </div>
          <div className="hidden md:flex gap-7 text-sm text-white/50">
            <a href="#courses" className="hover:text-white transition-colors">{isUk ? "Курси" : "Courses"}</a>
            <a href="#process" className="hover:text-white transition-colors">{isUk ? "Процес" : "Process"}</a>
            <a href="#jobs" className="hover:text-white transition-colors">{isUk ? "Кар'єра" : "Careers"}</a>
          </div>
          <a href="#apply" className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
            {isUk ? "Подати заявку" : "Apply now"}
          </a>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-20 pb-24">
        <div className="absolute inset-0 pointer-events-none">
          {["const", "function", "return", "async", "await", "import", "export", "{}"].map((kw, i) => (
            <span key={kw} className="absolute font-mono text-sm text-emerald-500/10 select-none"
              style={{ top: `${8 + (i * 12) % 80}%`, left: `${3 + (i * 14) % 95}%` }}>{kw}</span>
          ))}
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/10 rounded-full px-4 py-1.5 text-emerald-400 text-sm mb-6">
            🎯 {isUk ? "Набір відкрито — старт 1 вересня" : "Enrollment open — starting September 1"}
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6">
            {isUk ? (
              <>Стань{" "}<span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-300">Junior Developer</span><br />за 4–6 місяців</>
            ) : (
              <>Become a{" "}<span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-300">Junior Developer</span><br />in 4–6 months</>
            )}
          </h1>
          <p className="text-white/50 text-xl max-w-2xl mx-auto mb-10">
            {isUk
              ? "Frontend, Backend або QA. Живі заняття з ментором, реальний проєкт у портфоліо, кар'єрний центр з гарантією підтримки до першого офферу."
              : "Frontend, Backend or QA. Live sessions with a mentor, a real project for your portfolio, and a career centre with support until your first job offer."}
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-14">
            <a href="#apply" className="bg-emerald-500 hover:bg-emerald-400 text-black font-black px-8 py-4 rounded-2xl text-base transition-colors shadow-xl shadow-emerald-500/20">
              {isUk ? "Подати заявку →" : "Apply now →"}
            </a>
            <a href="#courses" className="border border-white/20 text-white/70 hover:bg-white/5 font-semibold px-8 py-4 rounded-2xl text-base transition-colors">
              {isUk ? "Переглянути курси" : "View courses"}
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-10">
            {heroStats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-black text-emerald-400">{s.val}</div>
                <div className="text-sm text-white/40 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Courses ─────────────────────────────────────────── */}
      <section id="courses" className="py-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-black text-center mb-12">{isUk ? "Оберіть напрям" : "Choose your track"}</h2>

          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {courses.map((c, i) => (
              <button
                key={c.slug}
                onClick={() => setActiveCourse(i)}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  activeCourse === i
                    ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
                    : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10"
                }`}
              >
                {c.icon} {c.title}
              </button>
            ))}
          </div>

          {(() => {
            const c = courses[activeCourse];
            return (
              <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
                <div className={`h-2 bg-linear-to-r ${c.color}`} />
                <div className="p-8 md:p-10 grid md:grid-cols-2 gap-10 items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-5xl">{c.icon}</span>
                      <div>
                        <h3 className="text-2xl font-black">{c.title}</h3>
                        {c.badge && <span className="text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">{c.badge}</span>}
                      </div>
                    </div>
                    <div className="space-y-2 mb-6">
                      <div className="text-sm text-white/50">{isUk ? "Технологічний стек:" : "Tech stack:"}</div>
                      <div className="flex flex-wrap gap-2">
                        {c.stack.map((s) => (
                          <span key={s} className="text-sm px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono">{s}</span>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 rounded-xl p-4">
                        <div className="text-xs text-white/40 mb-1">{isUk ? "Тривалість" : "Duration"}</div>
                        <div className="font-bold">{c.duration}</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4">
                        <div className="text-xs text-white/40 mb-1">{isUk ? "Навантаження" : "Workload"}</div>
                        <div className="font-bold">{c.schedule}</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="bg-white/5 rounded-2xl border border-white/10 p-6 mb-4">
                      <div className="text-xs text-white/40 uppercase tracking-wider mb-1">{isUk ? "Вартість" : "Tuition"}</div>
                      <div className="text-4xl font-black text-emerald-400 mb-1">{c.price}</div>
                      <div className="text-xs text-white/40">{isUk ? "або у розстрочку 0%" : "or 0% instalment plan"}</div>
                    </div>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5 mb-5">
                      <div className="text-emerald-400 font-black text-2xl mb-1">{c.hired}</div>
                      <div className="text-white/60 text-sm">
                        {isUk
                          ? "випускників отримали офер до 3 місяців після закінчення"
                          : "of graduates received a job offer within 3 months of graduating"}
                      </div>
                    </div>
                    <a
                      href="#apply"
                      className="block text-center bg-emerald-500 hover:bg-emerald-400 text-black font-black py-4 rounded-xl transition-colors w-full"
                    >
                      {isUk ? `Подати заявку на ${c.title}` : `Apply for ${c.title}`}
                    </a>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* ── Process ─────────────────────────────────────────── */}
      <section id="process" className="py-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-black text-center mb-12">{isUk ? "Як відбувається навчання" : "How the programme works"}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="relative">
                <div className="text-emerald-500 font-mono font-black text-xs mb-3 opacity-60">{step.num}</div>
                <div className="text-3xl mb-3">{step.icon}</div>
                <h3 className="font-bold mb-2 text-sm">{step.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Career ──────────────────────────────────────────── */}
      <section id="jobs" className="py-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black mb-5">{isUk ? "Кар'єрний центр" : "Career centre"}</h2>
              <p className="text-white/50 text-base leading-relaxed mb-8">
                {isUk
                  ? "Ми не просто навчаємо — ми супроводжуємо вас до першого оферу. Кар'єрний менеджер працює з вами після закінчення курсу."
                  : "We don't just train you — we guide you to your first job offer. A career manager works with you after you graduate."}
              </p>
              <div className="space-y-4">
                {careerItems.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <span className="text-2xl shrink-0">{item.icon}</span>
                    <div>
                      <div className="font-bold text-sm">{item.title}</div>
                      <div className="text-white/40 text-xs">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="text-xs text-white/40 uppercase tracking-wider mb-4">
                {isUk ? "Де працюють наші випускники" : "Where our graduates work"}
              </div>
              <div className="flex flex-wrap gap-3 mb-8">
                {companies.map((co) => (
                  <span key={co} className="px-3 py-1.5 rounded-lg bg-white/10 text-white/70 text-sm font-semibold">{co}</span>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {salaryStats.map((s) => (
                  <div key={s.sub} className={`rounded-xl p-4 text-center ${s.val.startsWith("$") ? "bg-white/5" : "bg-emerald-500/10 border border-emerald-500/20"}`}>
                    <div className={`text-2xl font-black ${s.val.startsWith("$") ? "text-white" : "text-emerald-400"}`}>{s.val}</div>
                    <div className="text-xs text-white/40 mt-1">{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Apply ───────────────────────────────────────────── */}
      <section id="apply" className="py-20 border-t border-white/10">
        <div className="max-w-lg mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-black mb-3">{isUk ? "Подати заявку" : "Apply"}</h2>
          <p className="text-white/50 text-sm mb-8">
            {isUk
              ? "Безкоштовний вступний вебінар + тест. Відповідаємо протягом 24 годин."
              : "Free introductory webinar + entrance test. We reply within 24 hours."}
          </p>
          {submitted ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-3xl p-10">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-xl font-black mb-2">{isUk ? "Заявку прийнято!" : "Application received!"}</h3>
              <p className="text-white/50 text-sm">
                {isUk
                  ? "Надішлемо деталі вступного тесту на email протягом 24 годин."
                  : "We'll send entrance test details to your email within 24 hours."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-4 text-left">
              <input type="text"
                placeholder={isUk ? "Ваше ім'я" : "Your name"}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required />
              <input type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required />
              <input type="tel"
                placeholder={isUk ? "Телефон" : "Phone"}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              <button type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black py-4 rounded-xl transition-colors">
                {isUk ? "Подати заявку →" : "Submit application →"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="border-t border-white/10 bg-[#060609] py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-black text-white text-lg">Dev<span className="text-emerald-400">Start</span></span>
                <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">BOOTCAMP</span>
              </div>
              <p className="text-sm text-white/40 leading-relaxed mb-5">
                {isUk
                  ? "IT-буткемп для тих, хто хоче змінити кар'єру та стати розробником за 4–6 місяців."
                  : "IT bootcamp for career changers who want to become developers in 4–6 months."}
              </p>
              <div className="space-y-1.5 text-sm text-white/50">
                <a href="tel:+380731234567" className="flex items-center gap-2 hover:text-white transition-colors">
                  <span className="text-emerald-400">📞</span> +38 073 123 45 67
                </a>
                <a href="mailto:hello@devstart.ua" className="flex items-center gap-2 hover:text-white transition-colors">
                  <span className="text-emerald-400">✉️</span> hello@devstart.ua
                </a>
              </div>
            </div>
            {/* Navigation */}
            <div>
              <div className="font-semibold text-white text-sm mb-4">{isUk ? "Навігація" : "Navigation"}</div>
              <ul className="space-y-2.5 text-sm text-white/50">
                {(isUk
                  ? [["#courses","Курси"], ["#process","Процес навчання"], ["#jobs","Кар'єрний центр"], ["#apply","Подати заявку"]]
                  : [["#courses","Courses"], ["#process","How it works"], ["#jobs","Career centre"], ["#apply","Apply"]]
                ).map(([href, label]) => (
                  <li key={href}><a href={href} className="hover:text-white transition-colors">{label}</a></li>
                ))}
              </ul>
            </div>
            {/* Info */}
            <div>
              <div className="font-semibold text-white text-sm mb-4">{isUk ? "Інформація" : "Info"}</div>
              <ul className="space-y-2.5 text-sm text-white/50 mb-6">
                <li>{isUk ? "Онлайн · 3 заняття/тиждень" : "Online · 3 sessions/week"}</li>
                <li>{isUk ? "Старт: вересень 2025" : "Start: September 2025"}</li>
                <li>{isUk ? "Розстрочка 0% на весь курс" : "0% instalment plan available"}</li>
              </ul>
              <div className="font-semibold text-white text-sm mb-3">{isUk ? "Соцмережі" : "Follow us"}</div>
              <div className="flex gap-2 flex-wrap">
                {["LinkedIn", "Telegram", "YouTube"].map((s) => (
                  <span key={s} className="text-xs px-3 py-1.5 rounded-lg bg-white/10 text-white/50 hover:text-white hover:bg-white/20 cursor-pointer transition-colors">{s}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
            <span>© 2025 DevStart Bootcamp. {isUk ? "Всі права захищено." : "All rights reserved."}</span>
            <span>
              {isUk ? "Розроблено студією" : "Built by"}{" "}
              <Link href={`/${lang}/portfolio`} className="text-white/50 hover:text-white transition-colors">
                Codeworth ↗
              </Link>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
