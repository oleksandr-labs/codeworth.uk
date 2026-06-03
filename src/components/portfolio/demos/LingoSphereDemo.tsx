"use client";

import { useState } from "react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

export function LingoSphereDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  // Placement test state
  const [testStarted, setTestStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [testAnswers, setTestAnswers] = useState<number[]>([]);
  const [testFinished, setTestFinished] = useState(false);
  const [timeLeft] = useState(60); // static display

  // Course catalog filter
  const [activeLang, setActiveLang] = useState<"EN" | "ES" | "PL" | "DE">("EN");

  // CEFR level display
  const [activeCEFR, setActiveCEFR] = useState(0);

  // Form
  const [form, setForm] = useState({ name: "", email: "", phone: "", language: "", level: "" });
  const [submitted, setSubmitted] = useState(false);

  // ── Test questions ────────────────────────────────────────────────────
  const questions = [
    {
      q: 'She ___ to school every day.',
      opts: ["go", "goes", "going", "gone"],
      answer: 1,
    },
    {
      q: 'I ___ this movie three times.',
      opts: ["see", "saw", "have seen", "seen"],
      answer: 2,
    },
    {
      q: 'If I ___ rich, I would travel the world.',
      opts: ["am", "was", "were", "be"],
      answer: 2,
    },
    {
      q: 'He said he ___ come to the party.',
      opts: ["will", "would", "can", "shall"],
      answer: 1,
    },
    {
      q: 'By the time she arrived, we ___ dinner.',
      opts: ["finish", "finished", "had finished", "have finished"],
      answer: 2,
    },
    {
      q: 'Choose the correct word: "The information ___ very useful."',
      opts: ["are", "is", "were", "have"],
      answer: 1,
    },
    {
      q: 'Which sentence is correct?',
      opts: [
        "I didn't went there.",
        "I didn't go there.",
        "I don't went there.",
        "I not go there.",
      ],
      answer: 1,
    },
    {
      q: '"Despite ___ tired, she finished the race."',
      opts: ["to be", "she was", "being", "be"],
      answer: 2,
    },
    {
      q: 'The word "ubiquitous" means:',
      opts: ["rare", "present everywhere", "dangerous", "outdated"],
      answer: 1,
    },
    {
      q: '"___ you mind opening the window?"',
      opts: ["Will", "Do", "Would", "Can"],
      answer: 2,
    },
  ];

  const getLevelFromScore = (score: number) => {
    if (score <= 1) return "A1";
    if (score <= 3) return "A2";
    if (score <= 5) return "B1";
    if (score <= 7) return "B2";
    if (score <= 9) return "C1";
    return "C2";
  };

  const getLevelInfo = (level: string) => {
    const info: Record<string, { descEn: string; descUk: string; courseEn: string; courseUk: string }> = {
      A1: {
        descEn: "Beginner — you understand basic phrases and can introduce yourself.",
        descUk: "Початківець — розумієте базові фрази та можете представитися.",
        courseEn: "English for Absolute Beginners",
        courseUk: "Англійська для початківців",
      },
      A2: {
        descEn: "Elementary — you can communicate in simple, routine tasks.",
        descUk: "Елементарний — можете спілкуватися у простих ситуаціях.",
        courseEn: "English Elementary A2",
        courseUk: "Англійська A2",
      },
      B1: {
        descEn: "Intermediate — you can deal with most situations while travelling.",
        descUk: "Середній — впораєтеся з більшістю ситуацій під час подорожей.",
        courseEn: "Intermediate English B1",
        courseUk: "Англійська Intermediate B1",
      },
      B2: {
        descEn: "Upper-intermediate — you can interact fluently with native speakers.",
        descUk: "Вище середнього — вільно спілкуєтеся з носіями мови.",
        courseEn: "Upper-Intermediate B2",
        courseUk: "Англійська B2",
      },
      C1: {
        descEn: "Advanced — you can use language flexibly and effectively.",
        descUk: "Просунутий — вживаєте мову гнучко та ефективно.",
        courseEn: "Advanced English C1",
        courseUk: "Англійська Advanced C1",
      },
      C2: {
        descEn: "Mastery — you can express yourself spontaneously with precision.",
        descUk: "Майстерність — висловлюєтеся спонтанно та точно.",
        courseEn: "English Mastery C2",
        courseUk: "Англійська C2",
      },
    };
    return info[level] ?? info["A1"];
  };

  const handleTestAnswer = (optIdx: number) => {
    const next = [...testAnswers, optIdx];
    setTestAnswers(next);
    if (currentQ === 9) {
      setTestFinished(true);
    } else {
      setCurrentQ(currentQ + 1);
    }
  };

  const resetTest = () => {
    setTestStarted(false);
    setCurrentQ(0);
    setTestAnswers([]);
    setTestFinished(false);
  };

  const score = testAnswers.filter((a, i) => a === questions[i].answer).length;
  const resultLevel = getLevelFromScore(score);
  const resultInfo = getLevelInfo(resultLevel);

  // ── Course catalog ────────────────────────────────────────────────────
  type LangKey = "EN" | "ES" | "PL" | "DE";

  const langTabs: { key: LangKey; flag: string; nameEn: string; nameUk: string; color: string }[] = [
    { key: "EN", flag: "🇬🇧", nameEn: "English", nameUk: "Англійська", color: "#3B4FCC" },
    { key: "ES", flag: "🇪🇸", nameEn: "Spanish", nameUk: "Іспанська", color: "#E53E3E" },
    { key: "PL", flag: "🇵🇱", nameEn: "Polish", nameUk: "Польська", color: "#D53F8C" },
    { key: "DE", flag: "🇩🇪", nameEn: "German", nameUk: "Німецька", color: "#D69E2E" },
  ];

  type CourseItem = {
    lang: LangKey;
    cefr: string;
    nameEn: string;
    nameUk: string;
    durationEn: string;
    durationUk: string;
    descEn: string;
    descUk: string;
    price: string;
    color: string;
    accent: string;
  };

  const courses: CourseItem[] = [
    {
      lang: "EN", cefr: "A1–A2", nameEn: "English for Beginners", nameUk: "Англійська для початківців",
      durationEn: "3 months · 3×/week", durationUk: "3 місяці · 3 рази/тиждень",
      descEn: "Start from zero: alphabet, greetings, basic grammar.",
      descUk: "Старт з нуля: алфавіт, вітання, базова граматика.",
      price: "2 800 UAH", color: "#EEF2FF", accent: "#3B4FCC",
    },
    {
      lang: "EN", cefr: "B1–B2", nameEn: "Intermediate English", nameUk: "Англійська Intermediate",
      durationEn: "4 months · 2×/week", durationUk: "4 місяці · 2 рази/тиждень",
      descEn: "Expand vocabulary, work on fluency, handle real-life conversations.",
      descUk: "Розширення словникового запасу, вільне спілкування.",
      price: "3 200 UAH", color: "#EEF2FF", accent: "#3B4FCC",
    },
    {
      lang: "EN", cefr: "C1", nameEn: "Business English C1", nameUk: "Ділова англійська C1",
      durationEn: "5 months · 2×/week", durationUk: "5 місяців · 2 рази/тиждень",
      descEn: "Presentations, negotiations, emails and professional writing.",
      descUk: "Презентації, переговори, ділове листування.",
      price: "3 800 UAH", color: "#EEF2FF", accent: "#3B4FCC",
    },
    {
      lang: "ES", cefr: "A1–A2", nameEn: "Spanish from Scratch", nameUk: "Іспанська з нуля",
      durationEn: "3 months · 2×/week", durationUk: "3 місяці · 2 рази/тиждень",
      descEn: "Core vocabulary, verb conjugation, Latin culture.",
      descUk: "Базова лексика, відмінювання дієслів, латинська культура.",
      price: "2 600 UAH", color: "#FFF5F5", accent: "#E53E3E",
    },
    {
      lang: "ES", cefr: "B1", nameEn: "Spanish Intermediate", nameUk: "Іспанська Intermediate",
      durationEn: "4 months · 2×/week", durationUk: "4 місяці · 2 рази/тиждень",
      descEn: "Subjunctive mood, fluid dialogue, travel vocabulary.",
      descUk: "Умовний спосіб, вільний діалог, лексика для подорожей.",
      price: "3 000 UAH", color: "#FFF5F5", accent: "#E53E3E",
    },
    {
      lang: "ES", cefr: "B2", nameEn: "Spanish Advanced B2", nameUk: "Іспанська Advanced B2",
      durationEn: "5 months · 2×/week", durationUk: "5 місяців · 2 рази/тиждень",
      descEn: "Complex grammar, literature excerpts, DELE B2 preparation.",
      descUk: "Складна граматика, уривки з літератури, підготовка до DELE B2.",
      price: "3 400 UAH", color: "#FFF5F5", accent: "#E53E3E",
    },
    {
      lang: "PL", cefr: "A1–A2", nameEn: "Polish from Zero", nameUk: "Польська з нуля",
      durationEn: "3 months · 2×/week", durationUk: "3 місяці · 2 рази/тиждень",
      descEn: "Cases, everyday phrases, practical survival Polish.",
      descUk: "Відмінки, повсякденні фрази, практична польська.",
      price: "2 400 UAH", color: "#FFF0F7", accent: "#D53F8C",
    },
    {
      lang: "PL", cefr: "B1", nameEn: "Polish Intermediate B1", nameUk: "Польська Intermediate B1",
      durationEn: "4 months · 2×/week", durationUk: "4 місяці · 2 рази/тиждень",
      descEn: "Advanced cases, idiomatic speech, reading comprehension.",
      descUk: "Складні відмінки, ідіоматика, читання.",
      price: "2 800 UAH", color: "#FFF0F7", accent: "#D53F8C",
    },
    {
      lang: "DE", cefr: "A1–A2", nameEn: "German from Scratch", nameUk: "Німецька з нуля",
      durationEn: "4 months · 2×/week", durationUk: "4 місяці · 2 рази/тиждень",
      descEn: "Articles, der/die/das logic, basic sentence structure.",
      descUk: "Артиклі, логіка der/die/das, базові речення.",
      price: "2 800 UAH", color: "#FFFFF0", accent: "#D69E2E",
    },
    {
      lang: "DE", cefr: "B1", nameEn: "German Intermediate B1", nameUk: "Німецька Intermediate B1",
      durationEn: "5 months · 2×/week", durationUk: "5 місяців · 2 рази/тиждень",
      descEn: "Subordinate clauses, modal verbs, Goethe B1 prep.",
      descUk: "Підрядні речення, модальні дієслова, підготовка Goethe B1.",
      price: "3 200 UAH", color: "#FFFFF0", accent: "#D69E2E",
    },
    {
      lang: "DE", cefr: "B2", nameEn: "German Upper-Intermediate", nameUk: "Німецька B2",
      durationEn: "6 months · 2×/week", durationUk: "6 місяців · 2 рази/тиждень",
      descEn: "Konjunktiv II, academic texts, Goethe B2 certification.",
      descUk: "Konjunktiv II, академічні тексти, сертифікат Goethe B2.",
      price: "3 600 UAH", color: "#FFFFF0", accent: "#D69E2E",
    },
  ];

  const visibleCourses = courses.filter((c) => c.lang === activeLang);

  // ── CEFR levels ───────────────────────────────────────────────────────
  const cefrLevels = [
    { code: "A1", nameEn: "Beginner", nameUk: "Початківець", descEn: "Can understand and use familiar everyday expressions and very basic phrases.", descUk: "Розуміє та вживає звичайні повсякденні вирази та базові фрази.", color: "#DCFCE7", text: "#166534" },
    { code: "A2", nameEn: "Elementary", nameUk: "Елементарний", descEn: "Can communicate in simple, routine tasks on familiar topics.", descUk: "Може спілкуватися у простих ситуаціях на знайомі теми.", color: "#D1FAE5", text: "#065F46" },
    { code: "B1", nameEn: "Intermediate", nameUk: "Середній", descEn: "Can deal with most situations likely to arise while travelling.", descUk: "Може впоратися з більшістю ситуацій під час подорожей.", color: "#DBEAFE", text: "#1E40AF" },
    { code: "B2", nameEn: "Upper-Intermediate", nameUk: "Вище середнього", descEn: "Can interact with a degree of fluency with native speakers.", descUk: "Може спілкуватися з достатньою вільністю з носіями мови.", color: "#EDE9FE", text: "#4C1D95" },
    { code: "C1", nameEn: "Advanced", nameUk: "Просунутий", descEn: "Can use language flexibly and effectively for social, academic and professional purposes.", descUk: "Вживає мову гнучко та ефективно для соціальних і академічних цілей.", color: "#FEF3C7", text: "#92400E" },
    { code: "C2", nameEn: "Mastery", nameUk: "Майстерність", descEn: "Can understand with ease virtually everything heard or read.", descUk: "Розуміє практично все почуте й прочитане без зусиль.", color: "#FFE4E6", text: "#9F1239" },
  ];

  // ── Teachers ──────────────────────────────────────────────────────────
  const teachers = isUk
    ? [
        { emoji: "👩‍💼", name: "Олена Романюк", langLabel: "🇬🇧 Англійська", certs: "CELTA, IELTS 8.5", exp: "9 років", bio: "Комунікативний метод, ділова англійська та підготовка до IELTS." },
        { emoji: "👨‍🏫", name: "Карлос Ромеро", langLabel: "🇪🇸 Іспанська", certs: "DELE C2, носій мови", exp: "Мадрид → Київ", bio: "Живе занурення в іспанську культуру та мовлення." },
        { emoji: "👩‍🎓", name: "Марта Вішневська", langLabel: "🇵🇱 Польська", certs: "Краків, носій мови", exp: "7 років", bio: "Практична польська для переїзду та роботи." },
        { emoji: "👨‍💻", name: "Ганс Мюллер", langLabel: "🇩🇪 Німецька", certs: "TestDaF C1, носій мови", exp: "Берлін → Київ", bio: "Системна граматика + реальні ситуації." },
      ]
    : [
        { emoji: "👩‍💼", name: "Olena Romaniuk", langLabel: "🇬🇧 English", certs: "CELTA, IELTS 8.5", exp: "9 years", bio: "Communicative method, business English and IELTS preparation." },
        { emoji: "👨‍🏫", name: "Carlos Romero", langLabel: "🇪🇸 Spanish", certs: "DELE C2, native speaker", exp: "Madrid → Kyiv", bio: "Full immersion into Spanish culture and authentic speech." },
        { emoji: "👩‍🎓", name: "Marta Wiszniewska", langLabel: "🇵🇱 Polish", certs: "Kraków, native speaker", exp: "7 years", bio: "Practical Polish for relocation and the workplace." },
        { emoji: "👨‍💻", name: "Hans Müller", langLabel: "🇩🇪 German", certs: "TestDaF C1, native speaker", exp: "Berlin → Kyiv", bio: "Systematic grammar combined with real-life situations." },
      ];

  // ── Form ──────────────────────────────────────────────────────────────
  const langOptions = isUk
    ? ["Англійська", "Іспанська", "Польська", "Німецька"]
    : ["English", "Spanish", "Polish", "German"];

  const levelOptions = ["A1", "A2", "B1", "B2", "C1", "C2"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.phone) setSubmitted(true);
  };

  // ── Trust bar stats ───────────────────────────────────────────────────
  const trustStats = isUk
    ? [
        { val: "3 200+", label: "студентів" },
        { val: "6", label: "мов" },
        { val: "94%", label: "досягають мети" },
        { val: "Cambridge", label: "партнер" },
      ]
    : [
        { val: "3,200+", label: "students" },
        { val: "6", label: "languages" },
        { val: "94%", label: "achieve their goal" },
        { val: "Cambridge", label: "partner" },
      ];

  // ── Greetings display ─────────────────────────────────────────────────
  const greetings = [
    { word: "Hello", lang: "English", color: "#3B4FCC" },
    { word: "Hola", lang: "Español", color: "#E53E3E" },
    { word: "Cześć", lang: "Polski", color: "#D53F8C" },
    { word: "Hallo", lang: "Deutsch", color: "#D69E2E" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <EmojiIcon emoji="🌐" className="w-7 h-7" />
            <span className="font-extrabold text-xl" style={{ color: "#0F1B3D" }}>
              Lingo<span style={{ color: "#3B4FCC" }}>Sphere</span>
            </span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-500">
            <a href="#courses" className="hover:text-indigo-700 transition-colors">{isUk ? "Курси" : "Courses"}</a>
            <a href="#test" className="hover:text-indigo-700 transition-colors">{isUk ? "Тест рівня" : "Level test"}</a>
            <a href="#cefr" className="hover:text-indigo-700 transition-colors">{isUk ? "Рівні CEFR" : "CEFR levels"}</a>
            <a href="#teachers" className="hover:text-indigo-700 transition-colors">{isUk ? "Викладачі" : "Teachers"}</a>
          </div>
          <a href="#trial" style={{ background: "#3B4FCC" }} className="hover:opacity-90 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-opacity">
            {isUk ? "Пробний урок" : "Trial lesson"}
          </a>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #1E3A8A 60%, #3B4FCC 100%)" }} className="pt-20 pb-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/70 text-sm mb-6">
                🎓 {isUk ? "6 мов · 20+ викладачів · онлайн та офлайн" : "6 languages · 20+ teachers · online & in-person"}
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
                {isUk ? (
                  <>Відкрийте світ<br />через <span style={{ color: "#F5C842" }}>мову</span></>
                ) : (
                  <>Open the world<br />through <span style={{ color: "#F5C842" }}>language</span></>
                )}
              </h1>
              <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-lg">
                {isUk
                  ? "Академічний підхід, живе спілкування та сертифіковані викладачі. Від A1 до C2 — у комфортному темпі."
                  : "Academic rigour, live conversation and certified teachers. From A1 to C2 — at your own pace."}
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <a href="#trial" className="hover:opacity-90 font-bold px-7 py-4 rounded-2xl text-base transition-opacity shadow-lg" style={{ background: "#F5C842", color: "#0F1B3D" }}>
                  🎯 {isUk ? "Безкоштовний урок" : "Free trial lesson"}
                </a>
                <a href="#test" className="border border-white/20 text-white/80 hover:bg-white/10 font-semibold px-7 py-4 rounded-2xl text-base transition-colors">
                  {isUk ? "Визначити рівень →" : "Test my level →"}
                </a>
              </div>
              {/* Trust bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {trustStats.map((s) => (
                  <div key={s.label} className="bg-white/10 border border-white/10 rounded-xl px-3 py-3 text-center">
                    <div className="text-lg font-extrabold text-white">{s.val}</div>
                    <div className="text-xs text-white/50 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Greetings cluster */}
            <div className="hidden md:flex flex-col gap-4 items-end">
              {greetings.map((g) => (
                <div
                  key={g.word}
                  className="bg-white rounded-2xl px-7 py-5 flex items-center gap-4 shadow-xl w-72"
                >
                  <div className="text-3xl font-extrabold" style={{ color: g.color }}>{g.word}</div>
                  <div className="text-xs text-slate-400 font-medium">{g.lang}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Placement Test ────────────────────────────────────────────────── */}
      <section id="test" className="py-20 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold mb-2" style={{ color: "#0F1B3D" }}>
              {isUk ? "🎓 Визначте свій рівень" : "🎓 Language Level Placement Test"}
            </h2>
            <p className="text-slate-500 text-sm">
              {isUk ? "10 питань — дізнайтеся свій рівень від A1 до C2" : "10 questions — discover your level from A1 to C2"}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">
            {!testStarted && !testFinished && (
              <div className="text-center">
                <div className="mb-5"><EmojiIcon emoji="📝" className="w-16 h-16" /></div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3">
                  {isUk ? "Готові пройти тест?" : "Ready to take the test?"}
                </h3>
                <p className="text-slate-500 text-sm mb-2">
                  {isUk ? "10 питань з граматики та словникового запасу" : "10 questions on grammar and vocabulary"}
                </p>
                <p className="text-slate-400 text-xs mb-7">
                  {isUk ? "⏱ 60 секунд на питання" : "⏱ 60 seconds per question"}
                </p>
                <button
                  onClick={() => setTestStarted(true)}
                  style={{ background: "#3B4FCC" }}
                  className="hover:opacity-90 text-white font-bold px-8 py-4 rounded-2xl text-base transition-opacity"
                >
                  {isUk ? "Почати тест →" : "Start test →"}
                </button>
              </div>
            )}

            {testStarted && !testFinished && (
              <div>
                {/* Progress bar */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-1 bg-slate-100 rounded-full h-2">
                    <div
                      style={{ width: `${(currentQ / 10) * 100}%`, background: "#3B4FCC" }}
                      className="h-2 rounded-full transition-all duration-500"
                    />
                  </div>
                  <span className="text-xs text-slate-400 shrink-0">Q {currentQ + 1} / 10</span>
                </div>

                {/* Timer display */}
                <div className="flex justify-end mb-5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700">
                    ⏱ {timeLeft}s
                  </div>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 mb-5 leading-relaxed">
                  {questions[currentQ].q}
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  {questions[currentQ].opts.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleTestAnswer(i)}
                      className="text-left px-4 py-3.5 rounded-2xl border-2 border-slate-100 hover:border-indigo-400 hover:bg-indigo-50 font-semibold text-slate-700 transition-all text-sm"
                    >
                      <span className="font-bold mr-2 text-slate-400">{["a", "b", "c", "d"][i]})</span>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {testFinished && (
              <div className="text-center">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-extrabold text-white shadow-lg"
                  style={{ background: "#3B4FCC" }}>
                  {resultLevel}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest mb-2 text-slate-400">
                  {isUk ? "Ваш рівень" : "Your level"}
                </div>
                <h3 className="text-2xl font-extrabold mb-1" style={{ color: "#0F1B3D" }}>{resultLevel}</h3>
                <p className="text-slate-500 text-sm mb-1">
                  {isUk ? resultInfo.descUk : resultInfo.descEn}
                </p>
                <div className="text-xs text-slate-400 mb-6">
                  {isUk ? `Правильних відповідей: ${score}/10` : `Correct answers: ${score}/10`}
                </div>
                <div className="bg-indigo-50 rounded-2xl p-4 mb-6 text-left">
                  <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-1">
                    {isUk ? "Рекомендований курс" : "Recommended course"}
                  </div>
                  <div className="font-extrabold text-slate-900">
                    {isUk ? resultInfo.courseUk : resultInfo.courseEn}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href="#trial" style={{ background: "#3B4FCC" }} className="hover:opacity-90 text-white font-bold px-7 py-3 rounded-2xl text-sm transition-opacity">
                    {isUk ? "Записатись на курс" : "Enroll in this course"}
                  </a>
                  <button onClick={resetTest} className="border-2 border-slate-200 text-slate-600 hover:border-slate-300 font-semibold px-7 py-3 rounded-2xl text-sm transition-colors">
                    {isUk ? "Пройти ще раз" : "Retake test"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Course catalog ────────────────────────────────────────────────── */}
      <section id="courses" className="py-20 bg-white dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold mb-2" style={{ color: "#0F1B3D" }}>
              {isUk ? "Каталог курсів" : "Course Catalog"}
            </h2>
            <p className="text-slate-500 text-sm">
              {isUk ? "Оберіть мову та знайдіть свій курс" : "Select a language and find your course"}
            </p>
          </div>

          {/* Language filter tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {langTabs.map((lt) => (
              <button
                key={lt.key}
                onClick={() => setActiveLang(lt.key)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all"
                style={activeLang === lt.key
                  ? { background: lt.color, color: "#fff" }
                  : { background: "#F1F5F9", color: "#475569" }}
              >
                <EmojiIcon emoji={lt.flag} className="w-4 h-4 inline-block align-middle mr-1" />{isUk ? lt.nameUk : lt.nameEn}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visibleCourses.map((c) => (
              <div key={c.nameEn} style={{ background: c.color }} className="rounded-2xl p-6 border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ background: c.accent }}>
                    {c.cefr}
                  </span>
                  <span className="text-sm font-extrabold" style={{ color: c.accent }}>{c.price}</span>
                </div>
                <h3 className="font-extrabold text-slate-900 mb-1">{isUk ? c.nameUk : c.nameEn}</h3>
                <div className="text-xs text-slate-500 mb-3">{isUk ? c.durationUk : c.durationEn}</div>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">{isUk ? c.descUk : c.descEn}</p>
                <a href="#trial"
                  className="inline-block w-full text-center text-white font-bold py-2.5 rounded-xl text-sm transition-opacity hover:opacity-90"
                  style={{ background: c.accent }}>
                  {isUk ? "Записатись" : "Enroll"}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CEFR levels ──────────────────────────────────────────────────── */}
      <section id="cefr" className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold mb-2" style={{ color: "#0F1B3D" }}>
              {isUk ? "Рівні CEFR" : "CEFR Levels"}
            </h2>
            <p className="text-slate-500 text-sm">
              {isUk ? "Загальноєвропейська шкала від A1 до C2" : "The Common European Framework of Reference from A1 to C2"}
            </p>
          </div>

          {/* Level selector */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {cefrLevels.map((lv, i) => (
              <button
                key={lv.code}
                onClick={() => setActiveCEFR(i)}
                className="px-4 py-2 rounded-xl font-bold text-sm transition-all"
                style={activeCEFR === i
                  ? { background: lv.text, color: "#fff" }
                  : { background: lv.color, color: lv.text }}
              >
                {lv.code}
              </button>
            ))}
          </div>

          {/* Level detail card */}
          <div className="max-w-lg mx-auto bg-white rounded-3xl shadow-sm border border-slate-100 p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl text-2xl font-black mb-4"
              style={{ background: cefrLevels[activeCEFR].color, color: cefrLevels[activeCEFR].text }}>
              {cefrLevels[activeCEFR].code}
            </div>
            <h3 className="text-xl font-extrabold mb-2" style={{ color: "#0F1B3D" }}>
              {isUk ? cefrLevels[activeCEFR].nameUk : cefrLevels[activeCEFR].nameEn}
            </h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              {isUk ? cefrLevels[activeCEFR].descUk : cefrLevels[activeCEFR].descEn}
            </p>
            <a href="#trial" className="inline-block text-white font-bold px-6 py-3 rounded-xl text-sm transition-opacity hover:opacity-90"
              style={{ background: "#3B4FCC" }}>
              {isUk ? `Почати з рівня ${cefrLevels[activeCEFR].code}` : `Start at ${cefrLevels[activeCEFR].code} level`}
            </a>
          </div>

          {/* Progression bar */}
          <div className="mt-10 flex items-stretch gap-0 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            {cefrLevels.map((lv, i) => (
              <button
                key={lv.code}
                onClick={() => setActiveCEFR(i)}
                className="flex-1 py-4 text-center transition-all hover:opacity-90"
                style={{ background: lv.color, color: lv.text }}
              >
                <div className="font-extrabold text-sm">{lv.code}</div>
                <div className="text-xs mt-0.5 hidden sm:block opacity-70">{isUk ? lv.nameUk : lv.nameEn}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Teachers ──────────────────────────────────────────────────────── */}
      <section id="teachers" className="py-20 bg-white dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold mb-2" style={{ color: "#0F1B3D" }}>
              {isUk ? "Наші викладачі" : "Our Teachers"}
            </h2>
            <p className="text-slate-500 text-sm">
              {isUk ? "Носії мови та сертифіковані методисти" : "Native speakers and certified methodologists"}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teachers.map((t) => (
              <div key={t.name} className="bg-slate-50 rounded-3xl p-6 border border-slate-100 hover:shadow-md transition-shadow">
                <div className="mb-4"><EmojiIcon emoji={t.emoji} className="w-14 h-14" /></div>
                <h3 className="font-extrabold text-slate-900 text-base mb-0.5">{t.name}</h3>
                <div className="text-xs font-semibold mb-1" style={{ color: "#3B4FCC" }}>{t.langLabel}</div>
                <div className="text-slate-400 text-xs mb-3">{t.certs} · {t.exp}</div>
                <p className="text-slate-600 text-xs border-t border-slate-200 pt-3 leading-relaxed">{t.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trial Form ───────────────────────────────────────────────────── */}
      <section id="trial" style={{ background: "linear-gradient(135deg, #0F1B3D 0%, #3B4FCC 100%)" }} className="py-20">
        <div className="max-w-lg mx-auto px-4 sm:px-6">
          <div className="text-center text-white mb-8">
            <h2 className="text-3xl font-extrabold mb-2">
              {isUk ? "Перший урок безкоштовно" : "First Lesson Free"}
            </h2>
            <p className="text-indigo-200 text-sm">
              {isUk
                ? "Визначимо рівень, познайомимо з викладачем і підберемо курс"
                : "We'll assess your level, introduce your teacher, and match you to a course"}
            </p>
          </div>

          {submitted ? (
            <div className="bg-white rounded-3xl p-10 text-center">
              <div className="mb-4"><EmojiIcon emoji="🌍" className="w-14 h-14" /></div>
              <h3 className="text-2xl font-extrabold mb-2" style={{ color: "#0F1B3D" }}>
                {isUk ? "Заявку отримано!" : "You're in!"}
              </h3>
              <p className="text-slate-500 text-sm">
                {isUk
                  ? "Ми зателефонуємо протягом 2 годин та погодимо зручний час."
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
              <input type="email"
                placeholder={isUk ? "Email" : "Email"}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
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
                <option value="">{isUk ? "Приблизний рівень (необов'язково)" : "Approximate level (optional)"}</option>
                {levelOptions.map((l) => <option key={l}>{l}</option>)}
              </select>
              <button type="submit"
                className="w-full font-bold py-4 rounded-xl text-white transition-opacity hover:opacity-90 shadow-lg"
                style={{ background: "#3B4FCC" }}>
                {isUk ? "Записатись на безкоштовний урок →" : "Book free lesson →"}
              </button>
              <p className="text-center text-xs text-slate-400">
                {isUk ? "Зв'яжемось протягом 2 годин" : "We'll contact you within 2 hours"}
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer style={{ background: "#0F1B3D" }} className="text-slate-400 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <EmojiIcon emoji="🌐" className="w-5 h-5" />
                <span className="font-extrabold text-white">Lingo<span style={{ color: "#3B4FCC" }}>Sphere</span></span>
              </div>
              <p className="text-sm leading-relaxed">
                {isUk
                  ? "Мовна школа з академічним підходом. 6 мов, сертифіковані викладачі."
                  : "Language school with an academic approach. 6 languages, certified teachers."}
              </p>
            </div>
            <div>
              <div className="font-semibold text-white text-sm mb-4">{isUk ? "Навігація" : "Navigation"}</div>
              <ul className="space-y-2 text-sm">
                {(isUk
                  ? [["#courses", "Курси"], ["#test", "Тест рівня"], ["#cefr", "Рівні CEFR"], ["#teachers", "Викладачі"], ["#trial", "Пробний урок"]]
                  : [["#courses", "Courses"], ["#test", "Level test"], ["#cefr", "CEFR levels"], ["#teachers", "Teachers"], ["#trial", "Trial lesson"]]
                ).map(([href, label]) => (
                  <li key={href}><a href={href} className="hover:text-white transition-colors">{label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white text-sm mb-4">{isUk ? "Графік" : "Hours"}</div>
              <ul className="space-y-2 text-sm mb-5">
                <li>{isUk ? "Пн – Пт: 08:00 – 22:00" : "Mon – Fri: 8 AM – 10 PM"}</li>
                <li>{isUk ? "Сб – Нд: 09:00 – 19:00" : "Sat – Sun: 9 AM – 7 PM"}</li>
              </ul>
              <div className="flex gap-2 flex-wrap">
                {["Instagram", "Facebook", "Telegram"].map((s) => (
                  <span key={s} className="text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 cursor-pointer transition-colors">{s}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span>© 2025 LingoSphere. {isUk ? "Всі права захищено." : "All rights reserved."}</span>
            <span className="text-slate-500">
              {isUk ? "Розроблено студією " : "Built by "}
              <span className="text-slate-300">Codeworth ↗</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
