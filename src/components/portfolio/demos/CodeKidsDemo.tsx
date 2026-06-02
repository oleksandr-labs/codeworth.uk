"use client";

import { useState } from "react";

export function CodeKidsDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  // Quiz state
  const [quizStep, setQuizStep] = useState(0); // 0 = not started, 1-4 = questions, 5 = result
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);

  // Active course tab
  const [activeAge, setActiveAge] = useState(0);

  // Trial form
  const [form, setForm] = useState({ childName: "", childAge: "", parentPhone: "", email: "", course: "", format: "" });
  const [submitted, setSubmitted] = useState(false);

  // ── Quiz data ────────────────────────────────────────────────────────────
  const questions = isUk
    ? [
        {
          q: "Скільки років дитині?",
          opts: ["6–8 років", "9–11 років", "12–14 років", "15–16 років"],
        },
        {
          q: "Що найбільше цікавить дитину?",
          opts: ["Ігри", "Вебсайти", "Роботи", "Анімація"],
        },
        {
          q: "Який досвід у програмуванні?",
          opts: ["Повний новачок", "Спробував(-ла) щось", "Є певний досвід"],
        },
        {
          q: "Який формат навчання бажаний?",
          opts: ["Онлайн", "Офлайн", "Все одно"],
        },
      ]
    : [
        {
          q: "How old is the child?",
          opts: ["6–8 years", "9–11 years", "12–14 years", "15–16 years"],
        },
        {
          q: "What interests the child most?",
          opts: ["Games", "Websites", "Robots", "Animation"],
        },
        {
          q: "What is their programming experience?",
          opts: ["Complete beginner", "Tried some things", "Has some experience"],
        },
        {
          q: "Preferred learning format?",
          opts: ["Online", "Offline", "Doesn't matter"],
        },
      ];

  const getRecommendation = () => {
    const ageIdx = quizAnswers[0] ?? 0;
    if (ageIdx === 0) return isUk
      ? { name: "Scratch Junior", price: "1 800 UAH/міс", emoji: "🐱", desc: isUk ? "Програмування через візуальні блоки — ідеально для старту." : "" }
      : { name: "Scratch Junior", price: "1,800 UAH/mo", emoji: "🐱", desc: "Block-based programming — the perfect starting point." };
    if (ageIdx === 1) return isUk
      ? { name: "Scratch Advanced / Python Basics", price: "2 000–2 200 UAH/міс", emoji: "🐍", desc: "Перехід до текстового коду та логіки проєктів." }
      : { name: "Scratch Advanced / Python Basics", price: "2,000–2,200 UAH/mo", emoji: "🐍", desc: "Transitioning to text-based code and project logic." };
    if (ageIdx === 2) return isUk
      ? { name: "Web HTML+CSS+JS / Game Dev", price: "2 400–2 600 UAH/міс", emoji: "🌐", desc: "Реальні проєкти: сайти та ігри з нуля." }
      : { name: "Web HTML+CSS+JS / Game Dev", price: "2,400–2,600 UAH/mo", emoji: "🌐", desc: "Real projects: websites and games from scratch." };
    return isUk
      ? { name: "Game Dev Unity / Robotics", price: "2 600–2 800 UAH/міс", emoji: "🤖", desc: "Серйозний старт у геймдеві або апаратних системах." }
      : { name: "Game Dev Unity / Robotics", price: "2,600–2,800 UAH/mo", emoji: "🤖", desc: "A serious start in game development or hardware systems." };
  };

  const handleQuizAnswer = (optIdx: number) => {
    const next = [...quizAnswers, optIdx];
    setQuizAnswers(next);
    if (quizStep === 4) {
      setQuizStep(5);
    } else {
      setQuizStep(quizStep + 1);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers([]);
  };

  // ── Course cards ────────────────────────────────────────────────────────
  const ageTabs = ["6–8", "9–11", "12–14", "15–16"];

  const allCourses = [
    {
      age: "6–8",
      emoji: "🐱",
      nameEn: "Scratch Junior",
      nameUk: "Scratch Junior",
      durationEn: "6 months · 2×/week",
      durationUk: "6 місяців · 2 рази/тиждень",
      pointsEn: ["Drag-and-drop blocks", "Create animated stories", "Simple mini-games"],
      pointsUk: ["Drag-and-drop блоки", "Анімовані історії", "Прості міні-ігри"],
      price: "1 800 UAH",
      color: "#F3F0FF",
      accent: "#5C2D91",
    },
    {
      age: "9–11",
      emoji: "🐍",
      nameEn: "Scratch Advanced",
      nameUk: "Scratch Advanced",
      durationEn: "5 months · 2×/week",
      durationUk: "5 місяців · 2 рази/тиждень",
      pointsEn: ["Complex game logic", "Score & levels system", "Sharing projects online"],
      pointsUk: ["Складна логіка гри", "Система очок та рівнів", "Публікація проєктів"],
      price: "2 000 UAH",
      color: "#F0FDF4",
      accent: "#16A34A",
    },
    {
      age: "9–11",
      emoji: "🐍",
      nameEn: "Python Basics",
      nameUk: "Python Basics",
      durationEn: "6 months · 2×/week",
      durationUk: "6 місяців · 2 рази/тиждень",
      pointsEn: ["Variables & loops", "Functions & lists", "Console mini-projects"],
      pointsUk: ["Змінні та цикли", "Функції та списки", "Консольні міні-проєкти"],
      price: "2 200 UAH",
      color: "#FFF7ED",
      accent: "#EA580C",
    },
    {
      age: "12–14",
      emoji: "🌐",
      nameEn: "Web HTML+CSS+JS",
      nameUk: "Web HTML+CSS+JS",
      durationEn: "8 months · 2×/week",
      durationUk: "8 місяців · 2 рази/тиждень",
      pointsEn: ["Layouts & responsive design", "DOM & interactivity", "Deploy your own site"],
      pointsUk: ["Верстка та адаптивність", "DOM та інтерактивність", "Публікація власного сайту"],
      price: "2 400 UAH",
      color: "#EFF6FF",
      accent: "#2563EB",
    },
    {
      age: "12–14",
      emoji: "🎮",
      nameEn: "Game Dev (Godot)",
      nameUk: "Game Dev (Godot)",
      durationEn: "7 months · 2×/week",
      durationUk: "7 місяців · 2 рази/тиждень",
      pointsEn: ["2D game from scratch", "Physics & collisions", "Publish on itch.io"],
      pointsUk: ["2D-гра з нуля", "Фізика та колізії", "Публікація на itch.io"],
      price: "2 600 UAH",
      color: "#FFF1F2",
      accent: "#E11D48",
    },
    {
      age: "15–16",
      emoji: "🤖",
      nameEn: "Game Dev Unity",
      nameUk: "Game Dev Unity",
      durationEn: "9 months · 2×/week",
      durationUk: "9 місяців · 2 рази/тиждень",
      pointsEn: ["3D scenes & scripting C#", "UI & game mechanics", "Portfolio game project"],
      pointsUk: ["3D-сцени та скрипти C#", "UI та ігрова механіка", "Портфоліо-гра"],
      price: "2 600 UAH",
      color: "#F0F9FF",
      accent: "#0284C7",
    },
    {
      age: "15–16",
      emoji: "⚙️",
      nameEn: "Robotics (Arduino)",
      nameUk: "Robotics (Arduino)",
      durationEn: "8 months · 2×/week",
      durationUk: "8 місяців · 2 рази/тиждень",
      pointsEn: ["Electronics basics", "Sensor & actuator control", "Build your own robot"],
      pointsUk: ["Основи електроніки", "Керування сенсорами", "Зібрати власного робота"],
      price: "2 800 UAH",
      color: "#F7FEE7",
      accent: "#65A30D",
    },
  ];

  const visibleCourses = allCourses.filter((c) => c.age === ageTabs[activeAge]);

  // ── Student projects ────────────────────────────────────────────────────
  const projects = isUk
    ? [
        { emoji: "🐱", title: "Гра на Scratch", author: "Артем, 8 р.", desc: "Платформер з монетами та перешкодами" },
        { emoji: "🌐", title: "Мій перший сайт", author: "Марія, 13 р.", desc: "Сайт-портфоліо з HTML та CSS" },
        { emoji: "🐍", title: "Вікторина на Python", author: "Данило, 11 р.", desc: "10 питань із підрахунком балів" },
        { emoji: "🎮", title: "2D-гра Godot", author: "Соня, 14 р.", desc: "Астероїди з вибухами та рейтингом" },
        { emoji: "🤖", title: "Робот-лабіринт", author: "Максим, 16 р.", desc: "Arduino-машинка що сама об'їжджає перешкоди" },
        { emoji: "✨", title: "Анімація Scratch", author: "Оля, 7 р.", desc: "Казка про дракона з озвученням" },
      ]
    : [
        { emoji: "🐱", title: "Scratch Game", author: "Artem, age 8", desc: "Platformer with coins and obstacles" },
        { emoji: "🌐", title: "My First Website", author: "Maria, age 13", desc: "Portfolio site built with HTML & CSS" },
        { emoji: "🐍", title: "Python Quiz", author: "Danylo, age 11", desc: "10-question quiz with score tracking" },
        { emoji: "🎮", title: "2D Game in Godot", author: "Sonia, age 14", desc: "Asteroids clone with explosions and leaderboard" },
        { emoji: "🤖", title: "Maze Robot", author: "Maksym, age 16", desc: "Arduino car that navigates obstacles autonomously" },
        { emoji: "✨", title: "Scratch Animation", author: "Olya, age 7", desc: "Dragon fairy tale with voice acting" },
      ];

  // ── Form ────────────────────────────────────────────────────────────────
  const courseOptions = isUk
    ? ["Scratch Junior", "Scratch Advanced", "Python Basics", "Web HTML+CSS+JS", "Game Dev (Godot)", "Game Dev Unity", "Robotics (Arduino)"]
    : ["Scratch Junior", "Scratch Advanced", "Python Basics", "Web HTML+CSS+JS", "Game Dev (Godot)", "Game Dev Unity", "Robotics (Arduino)"];

  const formatOptions = isUk
    ? ["Онлайн", "Офлайн", "Все одно"]
    : ["Online", "Offline", "No preference"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.childName && form.parentPhone) setSubmitted(true);
  };

  const rec = getRecommendation();

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <nav style={{ background: "#5C2D91" }} className="sticky top-0 z-50 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💻</span>
            <span className="font-extrabold text-xl text-white">Code<span style={{ color: "#22C55E" }}>Kids</span></span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-white/70">
            <a href="#courses" className="hover:text-white transition-colors">{isUk ? "Курси" : "Courses"}</a>
            <a href="#quiz" className="hover:text-white transition-colors">{isUk ? "Підбір курсу" : "Quiz"}</a>
            <a href="#projects" className="hover:text-white transition-colors">{isUk ? "Проєкти" : "Projects"}</a>
            <a href="#dashboard" className="hover:text-white transition-colors">{isUk ? "Кабінет" : "Dashboard"}</a>
          </div>
          <a href="#trial" style={{ background: "#22C55E" }} className="hover:opacity-90 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-opacity shadow-md">
            {isUk ? "Пробний урок" : "Trial lesson"}
          </a>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section style={{ background: "linear-gradient(135deg, #3B1069 0%, #5C2D91 50%, #7C3ABD 100%)" }} className="pt-20 pb-28 relative overflow-hidden">
        {/* decorative dots */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#FDE047 1.5px, transparent 1.5px)", backgroundSize: "28px 28px" }} />
        {/* floating emojis */}
        {["🐱","🐍","🌐","🎮","🤖","✨","⚡","🧩"].map((em, i) => (
          <span key={i} className="absolute text-2xl opacity-20 select-none pointer-events-none"
            style={{ top: `${8 + (i * 11) % 80}%`, left: `${4 + (i * 13) % 92}%` }}>
            {em}
          </span>
        ))}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-sm mb-6">
                🎓 {isUk ? "Школа програмування для дітей 6–16 років" : "Programming school for kids aged 6–16"}
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
                {isUk ? (
                  <>Навчи дитину<br /><span style={{ color: "#FDE047" }}>програмувати</span><br />та творити!</>
                ) : (
                  <>Teach your child<br /><span style={{ color: "#FDE047" }}>to code</span><br />and create!</>
                )}
              </h1>
              <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-lg">
                {isUk
                  ? "7 напрямків, живі викладачі, результат після першого місяця. Онлайн та офлайн."
                  : "7 directions, live teachers, visible results after the first month. Online & offline."}
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <a href="#trial" style={{ background: "#22C55E" }} className="hover:opacity-90 text-white font-bold px-7 py-4 rounded-2xl text-base transition-opacity shadow-lg">
                  🚀 {isUk ? "Перший урок безкоштовно" : "First lesson free"}
                </a>
                <a href="#quiz" className="border border-white/20 text-white/80 hover:bg-white/10 font-semibold px-7 py-4 rounded-2xl text-base transition-colors">
                  {isUk ? "Підібрати курс →" : "Find a course →"}
                </a>
              </div>
              {/* Trust bar */}
              <div className="flex gap-8 flex-wrap">
                {(isUk
                  ? [{ val: "1 200+", label: "випускників" }, { val: "8", label: "напрямків" }, { val: "Онлайн & Офлайн", label: "формати" }]
                  : [{ val: "1,200+", label: "graduates" }, { val: "8", label: "directions" }, { val: "Online & Offline", label: "formats" }]
                ).map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-extrabold text-white">{s.val}</div>
                    <div className="text-sm text-white/40">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero card cluster */}
            <div className="hidden md:grid grid-cols-2 gap-4">
              {[
                { emoji: "🐱", titleEn: "Scratch Junior", titleUk: "Scratch Junior", ageEn: "6–8 yrs", ageUk: "6–8 р.", bg: "#F3F0FF", fg: "#5C2D91" },
                { emoji: "🐍", titleEn: "Python Basics", titleUk: "Python Basics", ageEn: "9–11 yrs", ageUk: "9–11 р.", bg: "#F0FDF4", fg: "#16A34A" },
                { emoji: "🌐", titleEn: "Web Dev", titleUk: "Web Dev", ageEn: "12–14 yrs", ageUk: "12–14 р.", bg: "#EFF6FF", fg: "#2563EB" },
                { emoji: "🤖", titleEn: "Robotics", titleUk: "Robotics", ageEn: "15–16 yrs", ageUk: "15–16 р.", bg: "#FFF7ED", fg: "#EA580C" },
              ].map((c) => (
                <div key={c.titleEn} style={{ background: c.bg }} className="rounded-2xl p-5">
                  <div className="text-4xl mb-3">{c.emoji}</div>
                  <div className="font-extrabold text-sm mb-1" style={{ color: c.fg }}>{isUk ? c.titleUk : c.titleEn}</div>
                  <div className="text-xs text-slate-500">{isUk ? c.ageUk : c.ageEn}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Quiz ─────────────────────────────────────────────────────────── */}
      <section id="quiz" className="py-20" style={{ background: "#F3F0FF" }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold mb-2" style={{ color: "#3B1069" }}>
              {isUk ? "🎯 Який курс підійде моїй дитині?" : "🎯 Which Course is Right for My Child?"}
            </h2>
            <p className="text-slate-500 text-sm">
              {isUk ? "4 питання — і ми підберемо ідеальний курс" : "4 questions — and we'll find the perfect course"}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">
            {quizStep === 0 && (
              <div className="text-center">
                <div className="text-6xl mb-5">🤔</div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3">
                  {isUk ? "Готові дізнатися свій курс?" : "Ready to find your course?"}
                </h3>
                <p className="text-slate-500 text-sm mb-7">
                  {isUk ? "Пройдіть короткий тест із 4 питань" : "Take this short 4-question quiz"}
                </p>
                <button
                  onClick={() => setQuizStep(1)}
                  style={{ background: "#5C2D91" }}
                  className="hover:opacity-90 text-white font-bold px-8 py-4 rounded-2xl text-base transition-opacity"
                >
                  {isUk ? "Почати →" : "Start →"}
                </button>
              </div>
            )}

            {quizStep >= 1 && quizStep <= 4 && (
              <div>
                {/* Progress bar */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 bg-slate-100 rounded-full h-2">
                    <div
                      style={{ width: `${((quizStep - 1) / 4) * 100}%`, background: "#5C2D91" }}
                      className="h-2 rounded-full transition-all duration-500"
                    />
                  </div>
                  <span className="text-xs text-slate-400 shrink-0">{quizStep}/4</span>
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 mb-6">
                  {questions[quizStep - 1].q}
                </h3>
                <div className="space-y-3">
                  {questions[quizStep - 1].opts.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuizAnswer(i)}
                      className="w-full text-left px-5 py-4 rounded-2xl border-2 border-slate-100 hover:border-purple-400 hover:bg-purple-50 font-semibold text-slate-700 transition-all text-sm"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {quizStep === 5 && (
              <div className="text-center">
                <div className="text-6xl mb-4">{rec.emoji}</div>
                <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#5C2D91" }}>
                  {isUk ? "Рекомендований курс" : "Recommended course"}
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-1">{rec.name}</h3>
                <div className="text-lg font-bold mb-3" style={{ color: "#22C55E" }}>{rec.price}</div>
                <p className="text-slate-500 text-sm mb-7">{rec.desc}</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href="#trial" style={{ background: "#5C2D91" }} className="hover:opacity-90 text-white font-bold px-7 py-3 rounded-2xl text-sm transition-opacity">
                    {isUk ? "Записатись на цей курс" : "Enroll in this course"}
                  </a>
                  <button onClick={resetQuiz} className="border-2 border-slate-200 text-slate-600 hover:border-slate-300 font-semibold px-7 py-3 rounded-2xl text-sm transition-colors">
                    {isUk ? "Пройти ще раз" : "Retake quiz"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Courses ──────────────────────────────────────────────────────── */}
      <section id="courses" className="py-20 bg-white dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
              {isUk ? "Наші курси" : "Our Courses"}
            </h2>
            <p className="text-slate-500 text-sm">
              {isUk ? "Оберіть вік дитини — побачите відповідні напрямки" : "Select the child's age group to see matching courses"}
            </p>
          </div>

          {/* Age tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {ageTabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveAge(i)}
                className="px-5 py-2 rounded-xl font-semibold text-sm transition-all"
                style={activeAge === i
                  ? { background: "#5C2D91", color: "#fff" }
                  : { background: "#F3F0FF", color: "#5C2D91" }}
              >
                {tab} {isUk ? "р." : "yrs"}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {visibleCourses.map((c) => (
              <div key={c.nameEn} style={{ background: c.color }} className="rounded-3xl p-7 border border-slate-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-4xl mb-2">{c.emoji}</div>
                    <h3 className="font-extrabold text-xl text-slate-900">{isUk ? c.nameUk : c.nameEn}</h3>
                    <div className="text-sm mt-1" style={{ color: c.accent }}>{isUk ? c.durationUk : c.durationEn}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-extrabold text-xl" style={{ color: c.accent }}>{c.price}</div>
                    <div className="text-xs text-slate-400">{isUk ? "на місяць" : "per month"}</div>
                  </div>
                </div>
                <ul className="space-y-2 mb-5">
                  {(isUk ? c.pointsUk : c.pointsEn).map((pt) => (
                    <li key={pt} className="flex items-center gap-2 text-sm text-slate-700">
                      <span className="text-green-500 font-bold shrink-0">✓</span> {pt}
                    </li>
                  ))}
                </ul>
                <a href="#trial"
                  className="inline-block w-full text-center font-bold py-3 rounded-2xl text-sm text-white transition-opacity hover:opacity-90"
                  style={{ background: c.accent }}>
                  {isUk ? "Спробувати безкоштовно" : "Try for free"}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Parent Dashboard ─────────────────────────────────────────────── */}
      <section id="dashboard" className="py-20" style={{ background: "#0F172A" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-white mb-2">
              {isUk ? "Батьківський кабінет" : "Parent Dashboard"}
            </h2>
            <p className="text-slate-400 text-sm">
              {isUk ? "Слідкуйте за прогресом дитини в реальному часі" : "Track your child's progress in real time"}
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-6 sm:p-8">
            {/* Header bar */}
            <div className="flex items-center gap-3 mb-6 pb-5 border-b border-slate-700">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-white text-sm shrink-0" style={{ background: "#5C2D91" }}>А</div>
              <div>
                <div className="font-bold text-white text-sm">{isUk ? "Артем Коваленко" : "Artem Kovalenko"}</div>
                <div className="text-xs text-slate-400">{isUk ? "Scratch Advanced · Група 3А" : "Scratch Advanced · Group 3A"}</div>
              </div>
              <div className="ml-auto text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "#22C55E22", color: "#22C55E" }}>
                {isUk ? "Активний" : "Active"}
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-5 mb-6">
              {/* Progress */}
              <div className="bg-slate-700/60 rounded-2xl p-5">
                <div className="text-xs text-slate-400 mb-1 uppercase tracking-wide">{isUk ? "Прогрес курсу" : "Course progress"}</div>
                <div className="text-3xl font-extrabold text-white mb-3">67%</div>
                <div className="bg-slate-600 rounded-full h-2">
                  <div className="h-2 rounded-full" style={{ width: "67%", background: "#22C55E" }} />
                </div>
                <div className="text-xs text-slate-400 mt-2">{isUk ? "12 з 18 занять" : "12 of 18 lessons"}</div>
              </div>
              {/* Next class */}
              <div className="bg-slate-700/60 rounded-2xl p-5">
                <div className="text-xs text-slate-400 mb-1 uppercase tracking-wide">{isUk ? "Наступне заняття" : "Next class"}</div>
                <div className="text-lg font-extrabold text-white mb-1">
                  {isUk ? "Пн, 14 квіт." : "Mon, Apr 14"}
                </div>
                <div className="text-sm text-slate-300">17:00 – 18:30</div>
                <div className="mt-3 text-xs px-2.5 py-1 rounded-full inline-block" style={{ background: "#5C2D9133", color: "#A78BFA" }}>
                  {isUk ? "Онлайн · Zoom" : "Online · Zoom"}
                </div>
              </div>
              {/* Homework */}
              <div className="bg-slate-700/60 rounded-2xl p-5">
                <div className="text-xs text-slate-400 mb-1 uppercase tracking-wide">{isUk ? "Домашнє завдання" : "Homework"}</div>
                <div className="text-sm font-semibold text-white mb-2">
                  {isUk ? "Додати анімацію до спрайтів" : "Add animation to sprites"}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-green-500 flex items-center justify-center">
                    <span className="text-white text-[9px] font-bold">✓</span>
                  </div>
                  <span className="text-xs text-green-400">{isUk ? "Здано вчасно" : "Submitted on time"}</span>
                </div>
                <div className="mt-2 text-xs text-slate-400">{isUk ? "Оцінка: 9/10" : "Grade: 9/10"}</div>
              </div>
            </div>

            {/* Recent activity */}
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wide mb-3">{isUk ? "Остання активність" : "Recent activity"}</div>
              <div className="space-y-2">
                {(isUk
                  ? [
                      { icon: "✅", text: "Завершено урок 12: Події та повідомлення", time: "2 дні тому" },
                      { icon: "📝", text: "Здано ДЗ з оцінкою 9/10", time: "3 дні тому" },
                      { icon: "🏆", text: "Отримано бейдж «Майстер спрайтів»", time: "5 днів тому" },
                    ]
                  : [
                      { icon: "✅", text: "Completed lesson 12: Events & Messages", time: "2 days ago" },
                      { icon: "📝", text: "Submitted homework graded 9/10", time: "3 days ago" },
                      { icon: "🏆", text: "Earned badge \"Sprite Master\"", time: "5 days ago" },
                    ]
                ).map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-slate-700/40 rounded-xl px-4 py-3 text-sm">
                    <span className="shrink-0">{item.icon}</span>
                    <span className="text-slate-200 flex-1">{item.text}</span>
                    <span className="text-xs text-slate-500 shrink-0">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Student Projects ─────────────────────────────────────────────── */}
      <section id="projects" className="py-20 bg-white dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
              {isUk ? "Проєкти учнів" : "Student Projects"}
            </h2>
            <p className="text-slate-500 text-sm">
              {isUk ? "Реальні роботи, зроблені дітьми на наших курсах" : "Real work made by children on our courses"}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p) => (
              <div key={p.title} className="rounded-2xl border border-slate-100 p-5 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="text-5xl mb-3">{p.emoji}</div>
                <h3 className="font-extrabold text-slate-900 mb-1">{p.title}</h3>
                <div className="text-xs font-semibold mb-2" style={{ color: "#5C2D91" }}>{p.author}</div>
                <p className="text-slate-500 text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trial Form ───────────────────────────────────────────────────── */}
      <section id="trial" style={{ background: "linear-gradient(135deg, #3B1069 0%, #5C2D91 100%)" }} className="py-20">
        <div className="max-w-lg mx-auto px-4 sm:px-6">
          <div className="text-center text-white mb-8">
            <h2 className="text-3xl font-extrabold mb-2">
              {isUk ? "Запис на пробний урок" : "Book a Trial Lesson"}
            </h2>
            <p className="text-purple-200 text-sm">
              {isUk ? "Перший урок безкоштовний — просто залиште заявку" : "First lesson is free — just leave your details"}
            </p>
          </div>

          {submitted ? (
            <div className="bg-white rounded-3xl p-10 text-center">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">{isUk ? "Заявку отримано!" : "Request received!"}</h3>
              <p className="text-slate-500 text-sm">
                {isUk
                  ? "Ми зателефонуємо протягом 2 годин та погодимо зручний час."
                  : "We'll call you within 2 hours to arrange a convenient time."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 space-y-4 shadow-2xl shadow-purple-900/30">
              <input type="text"
                placeholder={isUk ? "Ім'я дитини" : "Child's name"}
                value={form.childName}
                onChange={(e) => setForm({ ...form, childName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                required />
              <input type="number"
                placeholder={isUk ? "Вік дитини (6–16)" : "Child's age (6–16)"}
                value={form.childAge}
                onChange={(e) => setForm({ ...form, childAge: e.target.value })}
                min={6} max={16}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
              <input type="tel"
                placeholder={isUk ? "Телефон батьків" : "Parent's phone"}
                value={form.parentPhone}
                onChange={(e) => setForm({ ...form, parentPhone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                required />
              <input type="email"
                placeholder={isUk ? "Email батьків" : "Parent's email"}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
              <select value={form.course}
                onChange={(e) => setForm({ ...form, course: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="">{isUk ? "Оберіть курс" : "Select course"}</option>
                {courseOptions.map((c) => <option key={c}>{c}</option>)}
              </select>
              <select value={form.format}
                onChange={(e) => setForm({ ...form, format: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="">{isUk ? "Формат навчання" : "Learning format"}</option>
                {formatOptions.map((f) => <option key={f}>{f}</option>)}
              </select>
              <button type="submit"
                className="w-full font-bold py-4 rounded-xl text-white transition-opacity hover:opacity-90 shadow-lg"
                style={{ background: "#5C2D91" }}>
                {isUk ? "Записатись безкоштовно →" : "Book free lesson →"}
              </button>
              <p className="text-center text-xs text-slate-400">
                {isUk ? "Зателефонуємо протягом 2 годин" : "We'll call you within 2 hours"}
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer style={{ background: "#1A0533" }} className="text-slate-400 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">💻</span>
              <span className="font-extrabold text-white">Code<span style={{ color: "#22C55E" }}>Kids</span></span>
            </div>
            <div className="text-xs text-slate-500">
              © 2025 CodeKids. {isUk ? "Всі права захищено." : "All rights reserved."}
            </div>
            <div className="text-xs">
              {isUk ? "Розроблено студією " : "Built by "}
              <span className="text-slate-300">Codeworth ↗</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
