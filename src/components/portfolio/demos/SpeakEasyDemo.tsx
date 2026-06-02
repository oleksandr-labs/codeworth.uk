"use client";

import { useState } from "react";
import Link from "next/link";

interface Props { lang: string; }

export function SpeakEasyDemo({ lang }: Props) {
  const isUk = lang === "uk";
  const [activeLevel, setActiveLevel] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", language: "", level: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.phone) setSubmitted(true);
  };

  const languages = isUk
    ? [
        { flag: "🇬🇧", name: "Англійська", levels: "A0 → C2", students: "420+", color: "from-sky-400 to-blue-500", popular: true },
        { flag: "🇩🇪", name: "Німецька", levels: "A0 → B2", students: "180+", color: "from-yellow-400 to-amber-500", popular: false },
        { flag: "🇵🇱", name: "Польська", levels: "A0 → B2", students: "210+", color: "from-red-400 to-rose-500", popular: false },
        { flag: "🇫🇷", name: "Французька", levels: "A0 → B1", students: "95+", color: "from-blue-500 to-indigo-600", popular: false },
      ]
    : [
        { flag: "🇬🇧", name: "English", levels: "A0 → C2", students: "420+", color: "from-sky-400 to-blue-500", popular: true },
        { flag: "🇩🇪", name: "German", levels: "A0 → B2", students: "180+", color: "from-yellow-400 to-amber-500", popular: false },
        { flag: "🇵🇱", name: "Polish", levels: "A0 → B2", students: "210+", color: "from-red-400 to-rose-500", popular: false },
        { flag: "🇫🇷", name: "French", levels: "A0 → B1", students: "95+", color: "from-blue-500 to-indigo-600", popular: false },
      ];

  const levels = isUk
    ? [
        { code: "A0", name: "Нуль", desc: "Жодного досвіду. Починаємо з алфавіту." },
        { code: "A1–A2", name: "Початківець", desc: "Базові фрази, вітання, покупки." },
        { code: "B1–B2", name: "Середній", desc: "Вільне спілкування на побутові теми." },
        { code: "C1–C2", name: "Просунутий", desc: "Ділова мова, академічний текст, переклад." },
      ]
    : [
        { code: "A0", name: "Complete beginner", desc: "No prior experience. We start from the alphabet." },
        { code: "A1–A2", name: "Elementary", desc: "Basic phrases, greetings, shopping situations." },
        { code: "B1–B2", name: "Intermediate", desc: "Fluent conversation on everyday topics." },
        { code: "C1–C2", name: "Advanced", desc: "Business language, academic writing, translation." },
      ];

  const teachers = isUk
    ? [
        { emoji: "👩‍💼", name: "Олена Романюк", lang: "Англійська", cert: "CELTA, IELTS 8.5", exp: "9 років", approach: "Комунікативний метод, мовні занурення" },
        { emoji: "👨‍🏫", name: "Ганс Мюллер", lang: "Німецька", cert: "TestDaF C1, носій мови", exp: "Берлін → Київ", approach: "Граматика + реальні ситуації" },
        { emoji: "👩‍🎓", name: "Marta Wiśniewska", lang: "Польська", cert: "Краків → Київ, носій мови", exp: "6 років", approach: "Мовне занурення, сленг та розмовна мова" },
      ]
    : [
        { emoji: "👩‍💼", name: "Olena Romaniuk", lang: "English", cert: "CELTA, IELTS 8.5", exp: "9 years", approach: "Communicative method, language immersion" },
        { emoji: "👨‍🏫", name: "Hans Müller", lang: "German", cert: "TestDaF C1, native speaker", exp: "Berlin → Kyiv", approach: "Grammar + real-life situations" },
        { emoji: "👩‍🎓", name: "Marta Wiśniewska", lang: "Polish", cert: "Kraków → Kyiv, native speaker", exp: "6 years", approach: "Language immersion, slang & colloquial speech" },
      ];

  const testimonials = isUk
    ? [
        { name: "Олена К.", flag: "🇬🇧", text: "Нарешті знайшла методику яка підходить мені. Через 4 місяці пройшла IELTS на 7.0. Олена — чудова!" },
        { name: "Максим В.", flag: "🇩🇪", text: "Вивчаю німецьку для роботи. Ганс пояснює граматику так, що починаєш розуміти логіку мови. Рекомендую." },
        { name: "Тетяна М.", flag: "🇵🇱", text: "Переїхала до Польщі. До переїзду взяла 3-місячний курс у SpeakEasy — дуже допомогло в адаптації." },
        { name: "Богдан Р.", flag: "🇬🇧", text: "Група до 6 людей — це ключово. Є час поговорити, ніхто не губиться. Після 6 місяців — B2 без проблем." },
        { name: "Ірина Д.", flag: "🇫🇷", text: "Французька — моя давня мрія. Почала з нуля, зараз читаю Le Monde. Методика дуже продумана." },
        { name: "Олексій П.", flag: "🇬🇧", text: "Взяв курс Business English. Через 4 місяці проводжу зустрічі з іноземними партнерами без перекладача." },
      ]
    : [
        { name: "Olena K.", flag: "🇬🇧", text: "Finally found a method that works for me. After 4 months I passed IELTS with 7.0. Olena is amazing!" },
        { name: "Maksym V.", flag: "🇩🇪", text: "Studying German for work. Hans explains grammar so clearly you start understanding the logic of the language. Highly recommend." },
        { name: "Tetiana M.", flag: "🇵🇱", text: "I moved to Poland. I took a 3-month course at SpeakEasy before relocating — it really helped with settling in." },
        { name: "Bohdan R.", flag: "🇬🇧", text: "Groups of up to 6 is key. You actually get to speak, nobody gets lost. After 6 months — B2 no problem." },
        { name: "Iryna D.", flag: "🇫🇷", text: "French was a long-time dream of mine. Started from zero, now reading Le Monde. The methodology is really well thought out." },
        { name: "Oleksii P.", flag: "🇬🇧", text: "Took Business English. Four months later I'm running meetings with foreign partners without a translator." },
      ];

  const langOptions = isUk
    ? ["Англійська", "Німецька", "Польська", "Французька"]
    : ["English", "German", "Polish", "French"];

  const levelOptions = isUk
    ? ["A0 — з нуля", "A1–A2 — початківець", "B1–B2 — середній", "C1–C2 — просунутий"]
    : ["A0 — complete beginner", "A1–A2 — elementary", "B1–B2 — intermediate", "C1–C2 — advanced"];

  const heroStats = isUk
    ? [{ val: "900+", label: "студентів" }, { val: "73%", label: "продовжують після 1-го рівня" }, { val: "4.8★", label: "Google відгуки" }]
    : [{ val: "900+", label: "students" }, { val: "73%", label: "continue after level 1" }, { val: "4.8★", label: "Google reviews" }];

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── Nav ─────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-2xl">🗣</span>
            <span className="font-extrabold text-xl text-slate-900">Speak<span className="text-indigo-600">Easy</span></span>
          </div>
          <div className="hidden md:flex gap-7 text-sm font-medium text-slate-500">
            <a href="#languages" className="hover:text-indigo-600 transition-colors">{isUk ? "Мови" : "Languages"}</a>
            <a href="#levels" className="hover:text-indigo-600 transition-colors">{isUk ? "Рівні" : "Levels"}</a>
            <a href="#teachers" className="hover:text-indigo-600 transition-colors">{isUk ? "Викладачі" : "Teachers"}</a>
            <a href="#reviews" className="hover:text-indigo-600 transition-colors">{isUk ? "Відгуки" : "Reviews"}</a>
          </div>
          <a href="#trial" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors">
            {isUk ? "Безкоштовний урок" : "Free lesson"}
          </a>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="bg-linear-to-br from-indigo-950 to-violet-900 pt-20 pb-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(white 1.5px, transparent 1.5px)", backgroundSize: "32px 32px" }} />
        {["🇬🇧", "🇩🇪", "🇵🇱", "🇫🇷", "🇪🇸", "🇮🇹"].map((flag, i) => (
          <span key={i} className="absolute text-3xl opacity-20 select-none pointer-events-none"
            style={{ top: `${10 + (i * 14) % 75}%`, left: `${5 + (i * 17) % 90}%` }}>
            {flag}
          </span>
        ))}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/70 text-sm mb-6">
                🌍 {isUk ? "4 мови · 8 викладачів · онлайн та офлайн" : "4 languages · 8 teachers · online & in-person"}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                {isUk ? (
                  <>Говоріть на{" "}<span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-300 to-violet-300">іноземній мові</span>{" "}вже через 3 місяці</>
                ) : (
                  <>Speak a{" "}<span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-300 to-violet-300">foreign language</span>{" "}in just 3 months</>
                )}
              </h1>
              <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-lg">
                {isUk
                  ? "Невеликі групи до 6 осіб, носії мови та сертифіковані педагоги. Методики, що дають результат, а не нудні підручники."
                  : "Small groups of up to 6 people, native speakers and certified teachers. Methods that deliver results — not boring textbooks."}
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <a href="#trial" className="bg-white text-indigo-700 hover:bg-indigo-50 font-bold px-7 py-4 rounded-2xl text-base transition-colors shadow-lg">
                  🎯 {isUk ? "Пробний урок безкоштовно" : "Free trial lesson"}
                </a>
                <a href="#levels" className="border border-white/20 text-white/70 hover:bg-white/5 font-semibold px-7 py-4 rounded-2xl text-base transition-colors">
                  {isUk ? "Визначити рівень →" : "Find my level →"}
                </a>
              </div>
              <div className="flex gap-8 flex-wrap">
                {heroStats.map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-extrabold text-white">{s.val}</div>
                    <div className="text-sm text-white/40">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Language cards */}
            <div className="hidden md:grid grid-cols-2 gap-4">
              {languages.map((l) => (
                <div key={l.name} className={`bg-linear-to-br ${l.color} rounded-2xl p-5 relative`}>
                  {l.popular && (
                    <span className="absolute top-3 right-3 text-[10px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full">
                      {isUk ? "Популярна" : "Popular"}
                    </span>
                  )}
                  <div className="text-4xl mb-2">{l.flag}</div>
                  <div className="font-extrabold text-white text-lg">{l.name}</div>
                  <div className="text-white/70 text-xs mt-0.5">{l.levels}</div>
                  <div className="mt-3 text-white/80 text-xs">{l.students} {isUk ? "студентів" : "students"}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Languages ───────────────────────────────────────── */}
      <section id="languages" className="py-20 bg-white dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
              {isUk ? "Доступні мови" : "Available languages"}
            </h2>
            <p className="text-slate-500">
              {isUk ? "Онлайн-заняття двічі на тиждень, групи до 6 осіб" : "Online classes twice a week, groups of up to 6 people"}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {languages.map((l) => (
              <div key={l.name} className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className={`h-24 bg-linear-to-br ${l.color} flex items-center justify-between px-6`}>
                  <span className="text-5xl">{l.flag}</span>
                  {l.popular && (
                    <span className="text-xs font-bold bg-white/20 text-white border border-white/30 px-2.5 py-1 rounded-full">
                      ★ {isUk ? "Популярна" : "Popular"}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-extrabold text-slate-900 text-xl mb-1">{l.name}</h3>
                  <div className="text-sm text-slate-500 mb-3">{isUk ? "Рівні:" : "Levels:"} {l.levels}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">{l.students} {isUk ? "студентів" : "students"}</span>
                    <a href="#trial" className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
                      {isUk ? "Записатись" : "Enrol"}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Levels ──────────────────────────────────────────── */}
      <section id="levels" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
              {isUk ? "Ваш рівень — ваш темп" : "Your level — your pace"}
            </h2>
            <p className="text-slate-500 max-w-md mx-auto">
              {isUk
                ? "Не знаєте свій рівень? Запишіться на безкоштовний урок — визначимо разом"
                : "Not sure of your level? Book a free lesson — we'll assess it together"}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {levels.map((l, i) => (
              <button
                key={l.code}
                onClick={() => setActiveLevel(i)}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  activeLevel === i
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-indigo-300"
                }`}
              >
                {l.code}
              </button>
            ))}
          </div>
          <div className="max-w-md mx-auto bg-white rounded-3xl border border-slate-100 p-8 shadow-sm text-center">
            <div className="text-4xl font-black text-indigo-600 mb-2">{levels[activeLevel].code}</div>
            <div className="font-bold text-slate-900 text-xl mb-3">{levels[activeLevel].name}</div>
            <p className="text-slate-500 text-sm mb-6">{levels[activeLevel].desc}</p>
            <a href="#trial" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors inline-block">
              {isUk ? `Записатись на рівень ${levels[activeLevel].code}` : `Enrol at level ${levels[activeLevel].code}`}
            </a>
          </div>
        </div>
      </section>

      {/* ── Teachers ────────────────────────────────────────── */}
      <section id="teachers" className="py-20 bg-white dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
              {isUk ? "Наші викладачі" : "Our teachers"}
            </h2>
            <p className="text-slate-500">{isUk ? "Носії мови та сертифіковані методисти" : "Native speakers and certified methodologists"}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {teachers.map((t) => (
              <div key={t.name} className="bg-slate-50 rounded-3xl p-7 border border-slate-100 hover:shadow-md transition-shadow">
                <div className="text-5xl mb-4">{t.emoji}</div>
                <h3 className="font-extrabold text-slate-900 text-xl mb-0.5">{t.name}</h3>
                <div className="text-indigo-600 font-semibold text-sm mb-1">{t.lang}</div>
                <div className="text-slate-400 text-xs mb-3">{t.cert} · {t.exp}</div>
                <div className="text-slate-600 text-sm border-t border-slate-200 pt-4">
                  💡 {t.approach}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────── */}
      <section id="reviews" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-12">
            {isUk ? "Відгуки студентів" : "Student reviews"}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((r) => (
              <div key={r.name} className="bg-white rounded-2xl border border-slate-100 p-6">
                <div className="flex gap-0.5 mb-3">{[1,2,3,4,5].map((i) => <span key={i} className="text-amber-400">★</span>)}</div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700 text-sm shrink-0">{r.name[0]}</div>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">{r.name}</div>
                    <div className="text-xs text-slate-400">{r.flag}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trial form ──────────────────────────────────────── */}
      <section id="trial" className="py-20 bg-linear-to-br from-indigo-600 to-violet-700">
        <div className="max-w-lg mx-auto px-4 sm:px-6">
          <div className="text-center text-white mb-8">
            <h2 className="text-3xl font-extrabold mb-2">
              {isUk ? "Перший урок — безкоштовно" : "First lesson — free"}
            </h2>
            <p className="text-indigo-100 text-sm">
              {isUk
                ? "Визначимо рівень, познайомимо з викладачем та відповімо на всі питання"
                : "We'll assess your level, introduce your teacher and answer all your questions"}
            </p>
          </div>
          {submitted ? (
            <div className="bg-white rounded-3xl p-10 text-center">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">{isUk ? "Записано!" : "You're in!"}</h3>
              <p className="text-slate-500 text-sm">
                {isUk
                  ? "Зв'яжемось протягом 2 годин щоб обговорити зручний час."
                  : "We'll contact you within 2 hours to arrange a convenient time."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 space-y-4 shadow-2xl shadow-indigo-900/30">
              <input type="text"
                placeholder={isUk ? "Ваше ім'я" : "Your name"}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required />
              <input type="tel"
                placeholder={isUk ? "Телефон" : "Phone"}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required />
              <select value={form.language}
                onChange={(e) => setForm({ ...form, language: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="">{isUk ? "Яку мову вивчаєте?" : "Which language?"}</option>
                {langOptions.map((l) => <option key={l}>{l}</option>)}
              </select>
              <select value={form.level}
                onChange={(e) => setForm({ ...form, level: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="">{isUk ? "Ваш рівень (якщо не знаєте — пропустіть)" : "Your level (leave blank if unsure)"}</option>
                {levelOptions.map((l) => <option key={l}>{l}</option>)}
              </select>
              <button type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-indigo-500/30">
                {isUk ? "Записатись на безкоштовний урок →" : "Book free lesson →"}
              </button>
              <p className="text-center text-xs text-slate-400">
                {isUk ? "Зв'яжемось протягом 2 годин" : "We'll contact you within 2 hours"}
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="bg-slate-900 text-slate-400 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🗣</span>
                <span className="font-extrabold text-white text-lg">Speak<span className="text-indigo-400">Easy</span></span>
              </div>
              <p className="text-sm leading-relaxed mb-5">
                {isUk
                  ? "Мовна школа онлайн. 4 мови, сертифіковані викладачі, групи до 6 осіб."
                  : "Online language school. 4 languages, certified teachers, groups of up to 6."}
              </p>
              <div className="space-y-1.5 text-sm">
                <a href="tel:+380661234567" className="flex items-center gap-2 hover:text-white transition-colors">
                  <span className="text-indigo-400">📞</span> +38 066 123 45 67
                </a>
                <a href="mailto:hello@speakeasy.ua" className="flex items-center gap-2 hover:text-white transition-colors">
                  <span className="text-indigo-400">✉️</span> hello@speakeasy.ua
                </a>
              </div>
            </div>
            {/* Navigation */}
            <div>
              <div className="font-semibold text-white text-sm mb-4">{isUk ? "Навігація" : "Navigation"}</div>
              <ul className="space-y-2.5 text-sm">
                {(isUk
                  ? [["#languages","Мови"], ["#levels","Рівні"], ["#teachers","Викладачі"], ["#reviews","Відгуки"], ["#trial","Безкоштовний урок"]]
                  : [["#languages","Languages"], ["#levels","Levels"], ["#teachers","Teachers"], ["#reviews","Reviews"], ["#trial","Free lesson"]]
                ).map(([href, label]) => (
                  <li key={href}><a href={href} className="hover:text-white transition-colors">{label}</a></li>
                ))}
              </ul>
            </div>
            {/* Schedule + social */}
            <div>
              <div className="font-semibold text-white text-sm mb-4">{isUk ? "Графік" : "Hours"}</div>
              <ul className="space-y-2 text-sm mb-6">
                <li>{isUk ? "Пн – Пт: 08:00 – 22:00" : "Mon – Fri: 8 AM – 10 PM"}</li>
                <li>{isUk ? "Сб – Нд: 09:00 – 19:00" : "Sat – Sun: 9 AM – 7 PM"}</li>
              </ul>
              <div className="font-semibold text-white text-sm mb-3">{isUk ? "Соцмережі" : "Follow us"}</div>
              <div className="flex gap-2 flex-wrap">
                {["Instagram", "Facebook", "Telegram"].map((s) => (
                  <span key={s} className="text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 cursor-pointer transition-colors">{s}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span>© 2025 SpeakEasy. {isUk ? "Всі права захищено." : "All rights reserved."}</span>
            <span className="text-slate-600">
              {isUk ? "Розроблено студією" : "Built by"}{" "}
              <Link href={`/${lang}/portfolio`} className="text-slate-400 hover:text-white transition-colors">
                Codeworth ↗
              </Link>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
