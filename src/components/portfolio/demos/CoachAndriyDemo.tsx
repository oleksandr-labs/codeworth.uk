"use client";

import { useState } from "react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV = [
  { en: "Programs", uk: "Програми" },
  { en: "Results", uk: "Результати" },
  { en: "About", uk: "Про мене" },
  { en: "Pricing", uk: "Ціни" },
  { en: "Contact", uk: "Контакт" },
];

const PROGRAMS = [
  {
    emoji: "🔥",
    nameEn: "Weight Loss",
    nameUk: "Схуднення",
    descEn: "Structured fat-loss program with cardio, strength training and nutrition coaching for sustainable results.",
    descUk: "Структурована програма схуднення з кардіо, силовими тренуваннями та нутриціологічним супроводом.",
    weeks: 8,
    sessions: 4,
    format: { en: "Gym / Online", uk: "Зал / Онлайн" },
    price: "4 800 ₴/mo",
  },
  {
    emoji: "💪",
    nameEn: "Muscle Building",
    nameUk: "Набір маси",
    descEn: "Progressive overload hypertrophy program designed to maximize lean muscle gain and strength.",
    descUk: "Програма прогресивного навантаження для максимального набору м'язової маси та сили.",
    weeks: 12,
    sessions: 5,
    format: { en: "Gym", uk: "Зал" },
    price: "5 500 ₴/mo",
  },
  {
    emoji: "⚡",
    nameEn: "Athletic Performance",
    nameUk: "Спортивна підготовка",
    descEn: "Speed, agility and power training for athletes who want to dominate their sport.",
    descUk: "Швидкість, спритність та потужність для спортсменів, які хочуть домінувати.",
    weeks: 16,
    sessions: 5,
    format: { en: "Gym / Hybrid", uk: "Зал / Гібрид" },
    price: "6 200 ₴/mo",
  },
  {
    emoji: "🩹",
    nameEn: "Rehabilitation",
    nameUk: "Реабілітація",
    descEn: "Gentle recovery program for post-injury or post-surgery clients to rebuild strength safely.",
    descUk: "М'яка відновлювальна програма після травм або операцій для безпечного повернення до форми.",
    weeks: 12,
    sessions: 3,
    format: { en: "Gym / Online", uk: "Зал / Онлайн" },
    price: "4 200 ₴/mo",
  },
];

const RESULTS = [
  { nameEn: "Olena K.", nameUk: "Олена К.", metric: "-18 kg", weeks: 14, emoji: "🔥" },
  { nameEn: "Dmytro S.", nameUk: "Дмитро С.", metric: "+9 kg muscle", weeks: 16, emoji: "💪" },
  { nameEn: "Anna M.", nameUk: "Анна М.", metric: "-12 kg", weeks: 10, emoji: "🔥" },
  { nameEn: "Ihor T.", nameUk: "Ігор Т.", metric: "+7 kg muscle", weeks: 12, emoji: "💪" },
  { nameEn: "Viktoria L.", nameUk: "Вікторія Л.", metric: "-22 kg", weeks: 20, emoji: "🔥" },
  { nameEn: "Artem P.", nameUk: "Артем П.", metric: "-15 kg", weeks: 12, emoji: "⚡" },
];

const CERTIFICATIONS = [
  { en: "ISSA Certified Personal Trainer", uk: "ISSA сертифікований персональний тренер" },
  { en: "NASM Performance Enhancement Specialist", uk: "NASM спеціаліст з покращення продуктивності" },
  { en: "Precision Nutrition Level 2", uk: "Precision Nutrition рівень 2" },
  { en: "First Aid & CPR Certified", uk: "Сертифікат першої допомоги та СЛР" },
  { en: "Functional Movement Screen (FMS)", uk: "Функціональний скринінг руху (FMS)" },
];

const PLAN_FEATURES = [
  { en: "Personal training sessions", uk: "Персональні тренування" },
  { en: "Custom nutrition plan", uk: "Індивідуальний план харчування" },
  { en: "Weekly video calls", uk: "Щотижневі відеодзвінки" },
  { en: "24/7 chat support", uk: "Чат-підтримка 24/7" },
  { en: "Progress tracking app", uk: "Додаток для відстеження прогресу" },
  { en: "Exercise video library", uk: "Бібліотека відео вправ" },
  { en: "Monthly body analysis", uk: "Щомісячний аналіз тіла" },
  { en: "Competition prep", uk: "Підготовка до змагань" },
];

const PLAN_MATRIX: boolean[][] = [
  /* Weight Loss */     [true, true, false, true, true, true, false, false],
  /* Muscle Building */ [true, true, true, true, true, true, true, false],
  /* Athletic Perf */   [true, true, true, true, true, true, true, true],
  /* Rehabilitation */  [true, true, true, true, true, true, true, false],
];

const TESTIMONIALS = [
  {
    nameEn: "Olena K.",
    nameUk: "Олена К.",
    programEn: "Weight Loss",
    programUk: "Схуднення",
    resultEn: "Lost 18 kg in 14 weeks",
    resultUk: "Скинула 18 кг за 14 тижнів",
    quoteEn: "Coach Andriy changed my life. His approach is strict but fair — I never felt alone in this journey. The nutrition plan was a game changer.",
    quoteUk: "Тренер Андрій змінив моє життя. Його підхід суворий, але справедливий — я ніколи не відчувала себе самотньою. План харчування став вирішальним.",
  },
  {
    nameEn: "Dmytro S.",
    nameUk: "Дмитро С.",
    programEn: "Muscle Building",
    programUk: "Набір маси",
    resultEn: "Gained 9 kg lean muscle in 16 weeks",
    resultUk: "Набрав 9 кг м'язів за 16 тижнів",
    quoteEn: "I tried everything before — random YouTube programs, cheap supplements. Andriy gave me a real system. My deadlift went from 80 to 140 kg.",
    quoteUk: "Я перепробував усе — випадкові програми з YouTube, дешеві добавки. Андрій дав мені справжню систему. Мій дедліфт зріс з 80 до 140 кг.",
  },
  {
    nameEn: "Viktoria L.",
    nameUk: "Вікторія Л.",
    programEn: "Athletic Performance",
    programUk: "Спортивна підготовка",
    resultEn: "Qualified for national competition",
    resultUk: "Кваліфікувалась на національні змагання",
    quoteEn: "After two years of plateau, Andriy helped me break through. His periodization knowledge is outstanding. I qualified for nationals within 5 months.",
    quoteUk: "Після двох років застою Андрій допоміг мені прорватись. Його знання періодизації вражають. Я кваліфікувалась на чемпіонат за 5 місяців.",
  },
];

const RESOURCES = [
  {
    emoji: "📋",
    nameEn: "Beginner Workout PDF",
    nameUk: "PDF тренувань для початківців",
    descEn: "12-week starter program with illustrations and progressions for absolute beginners.",
    descUk: "12-тижнева стартова програма з ілюстраціями та прогресіями для повних початківців.",
  },
  {
    emoji: "🥗",
    nameEn: "Meal Prep Guide",
    nameUk: "Гід з підготовки їжі",
    descEn: "30 easy high-protein recipes with macros, shopping lists and meal prep schedules.",
    descUk: "30 простих високопротеїнових рецептів з макросами, списками покупок та розкладом.",
  },
  {
    emoji: "🧘",
    nameEn: "Stretching Routine",
    nameUk: "Програма розтяжки",
    descEn: "Full-body mobility routine for warm-up and recovery. Reduce injury risk by 60%.",
    descUk: "Повна програма мобільності для розминки та відновлення. Знизіть ризик травм на 60%.",
  },
];

const SCHEDULES = [
  { en: "Morning (7:00–10:00)", uk: "Ранок (7:00–10:00)" },
  { en: "Midday (11:00–14:00)", uk: "День (11:00–14:00)" },
  { en: "Evening (17:00–20:00)", uk: "Вечір (17:00–20:00)" },
];

const FORMATS = [
  { en: "In gym", uk: "У залі" },
  { en: "Online", uk: "Онлайн" },
  { en: "Hybrid", uk: "Гібрид" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export function CoachAndriyDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  // Transformation Calculator
  const [currentWeight, setCurrentWeight] = useState(85);
  const [targetWeight, setTargetWeight] = useState(75);
  const [frequency, setFrequency] = useState(4);
  const [experience, setExperience] = useState<"beginner" | "intermediate" | "advanced">("beginner");

  // Booking form
  const [bookProgram, setBookProgram] = useState(0);
  const [bookFormat, setBookFormat] = useState(0);
  const [bookSchedule, setBookSchedule] = useState(0);
  const [bookName, setBookName] = useState("");
  const [bookPhone, setBookPhone] = useState("");
  const [bookGoal, setBookGoal] = useState("");
  const [bookSent, setBookSent] = useState(false);

  // Mobile nav
  const [menuOpen, setMenuOpen] = useState(false);

  // Calculator logic
  const weightDiff = Math.abs(currentWeight - targetWeight);
  const isLoss = currentWeight > targetWeight;
  const rateMap = { beginner: 0.4, intermediate: 0.6, advanced: 0.8 };
  const freqMultiplier = frequency === 3 ? 0.85 : frequency === 5 ? 1.15 : 1;
  const weeklyRate = rateMap[experience] * freqMultiplier;
  const estimatedWeeks = Math.ceil(weightDiff / weeklyRate);
  const recommendedProgram = isLoss
    ? (isUk ? "Схуднення" : "Weight Loss")
    : (isUk ? "Набір маси" : "Muscle Building");

  // ── Render ──

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans">
      {/* ─── Header ─── */}
      <header className="sticky top-0 z-50 bg-[#09090b]/95 backdrop-blur border-b border-zinc-800">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3">
          <span className="text-lg font-extrabold tracking-widest uppercase text-lime-400">
            💪 COACH ANDRIY
          </span>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-6 text-sm font-medium text-zinc-400">
            {NAV.map((n) => (
              <button key={n.en} className="hover:text-lime-400 transition-colors">
                {isUk ? n.uk : n.en}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden md:inline-flex rounded-lg bg-lime-500 px-5 py-2 text-sm font-bold text-[#09090b] hover:bg-lime-400 transition-colors">
              {isUk ? "Почати тренування" : "Start Training"}
            </button>
            {/* Mobile burger */}
            <button
              className="md:hidden text-2xl text-lime-400"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-zinc-800 bg-[#09090b] px-4 pb-4">
            {NAV.map((n) => (
              <button
                key={n.en}
                className="block w-full text-left py-2 text-sm text-zinc-300 hover:text-lime-400"
              >
                {isUk ? n.uk : n.en}
              </button>
            ))}
            <button className="mt-2 w-full rounded-lg bg-lime-500 px-5 py-2 text-sm font-bold text-[#09090b]">
              {isUk ? "Почати тренування" : "Start Training"}
            </button>
          </div>
        )}
      </header>

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-linear-to-br from-[#09090b] via-[#18181b] to-[#09090b]">
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-28 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-black uppercase leading-tight tracking-tight">
              {isUk ? (
                <>ТВІЙ ТРЕНЕР.<br /><span className="text-lime-400">ТВІЙ РЕЗУЛЬТАТ.</span></>
              ) : (
                <>YOUR COACH.<br /><span className="text-lime-400">YOUR RESULTS.</span></>
              )}
            </h1>
            <p className="mt-6 max-w-lg text-lg text-zinc-400 leading-relaxed">
              {isUk
                ? "Персональний підхід до кожного клієнта. Науково обґрунтовані тренування, індивідуальний план харчування та постійна підтримка на шляху до твоєї найкращої форми."
                : "A personalized approach to every client. Science-backed training, custom nutrition plans and constant support on your way to the best shape of your life."}
            </p>
            <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
              <button className="rounded-lg bg-lime-500 px-8 py-3 font-bold text-[#09090b] hover:bg-lime-400 transition-colors">
                {isUk ? "Записатись" : "Book Now"}
              </button>
              <button className="rounded-lg border-2 border-lime-500/40 px-8 py-3 font-bold text-lime-400 hover:border-lime-400 transition-colors">
                {isUk ? "Програми" : "View Programs"}
              </button>
            </div>
          </div>

          {/* Photo placeholder */}
          <div className="shrink-0">
            <div className="w-56 h-56 md:w-72 md:h-72 rounded-full border-4 border-lime-400 bg-zinc-800 flex items-center justify-center text-6xl">
              🏋️
            </div>
          </div>
        </div>

        {/* Credentials strip */}
        <div className="border-t border-zinc-800 bg-[#18181b]/60">
          <div className="mx-auto max-w-6xl px-4 py-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            {[
              { emoji: "🏅", en: "ISSA Certified", uk: "ISSA сертифікат" },
              { emoji: "📅", en: "8+ Years Experience", uk: "8+ років досвіду" },
              { emoji: "🔄", en: "500+ Transformations", uk: "500+ трансформацій" },
            ].map((c) => (
              <div key={c.en} className="flex items-center justify-center gap-2 text-sm font-semibold text-zinc-300">
                <EmojiIcon emoji={c.emoji} className="w-5 h-5" />
                <span>{isUk ? c.uk : c.en}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Programs ─── */}
      <section className="bg-[#18181b] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl md:text-4xl font-black uppercase tracking-tight">
            {isUk ? "Програми тренувань" : "Training Programs"}
          </h2>
          <p className="mt-3 text-center text-zinc-400 max-w-xl mx-auto">
            {isUk
              ? "Обери програму, яка відповідає твоїм цілям. Кожна включає індивідуальний підхід."
              : "Choose a program that matches your goals. Each one includes a personalized approach."}
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {PROGRAMS.map((p) => (
              <div
                key={p.nameEn}
                className="rounded-2xl border border-zinc-700 bg-[#09090b] p-6 hover:border-lime-500/50 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <EmojiIcon emoji={p.emoji} className="w-8 h-8" />
                  <h3 className="text-xl font-bold text-lime-400">
                    {isUk ? p.nameUk : p.nameEn}
                  </h3>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {isUk ? p.descUk : p.descEn}
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg bg-zinc-800/60 px-3 py-2">
                    <span className="block text-xs text-zinc-500 uppercase">{isUk ? "Тривалість" : "Duration"}</span>
                    <span className="font-bold text-zinc-200">{p.weeks} {isUk ? "тижнів" : "weeks"}</span>
                  </div>
                  <div className="rounded-lg bg-zinc-800/60 px-3 py-2">
                    <span className="block text-xs text-zinc-500 uppercase">{isUk ? "Занять/тиж" : "Sessions/wk"}</span>
                    <span className="font-bold text-zinc-200">{p.sessions}x</span>
                  </div>
                  <div className="rounded-lg bg-zinc-800/60 px-3 py-2">
                    <span className="block text-xs text-zinc-500 uppercase">{isUk ? "Формат" : "Format"}</span>
                    <span className="font-bold text-zinc-200">{isUk ? p.format.uk : p.format.en}</span>
                  </div>
                  <div className="rounded-lg bg-zinc-800/60 px-3 py-2">
                    <span className="block text-xs text-zinc-500 uppercase">{isUk ? "Ціна" : "Price"}</span>
                    <span className="font-bold text-lime-400">{p.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Transformation Calculator ─── */}
      <section className="bg-[#09090b] py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-center text-3xl md:text-4xl font-black uppercase tracking-tight">
            {isUk ? "Калькулятор трансформації" : "Transformation Calculator"}
          </h2>
          <p className="mt-3 text-center text-zinc-400 max-w-xl mx-auto">
            {isUk
              ? "Дізнайся приблизний термін досягнення твоєї цілі"
              : "Estimate how long it will take to reach your goal"}
          </p>

          <div className="mt-10 rounded-2xl border border-zinc-700 bg-[#18181b] p-6 md:p-8">
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Current weight */}
              <label className="block">
                <span className="text-sm font-semibold text-zinc-300">
                  {isUk ? "Поточна вага (кг)" : "Current Weight (kg)"}
                </span>
                <input
                  type="number"
                  min={40}
                  max={200}
                  value={currentWeight}
                  onChange={(e) => setCurrentWeight(Number(e.target.value))}
                  className="mt-2 w-full rounded-lg border border-zinc-700 bg-[#09090b] px-4 py-2.5 text-zinc-100 focus:border-lime-500 focus:outline-none"
                />
              </label>

              {/* Target weight */}
              <label className="block">
                <span className="text-sm font-semibold text-zinc-300">
                  {isUk ? "Цільова вага (кг)" : "Target Weight (kg)"}
                </span>
                <input
                  type="number"
                  min={40}
                  max={200}
                  value={targetWeight}
                  onChange={(e) => setTargetWeight(Number(e.target.value))}
                  className="mt-2 w-full rounded-lg border border-zinc-700 bg-[#09090b] px-4 py-2.5 text-zinc-100 focus:border-lime-500 focus:outline-none"
                />
              </label>

              {/* Frequency */}
              <label className="block">
                <span className="text-sm font-semibold text-zinc-300">
                  {isUk ? "Тренувань на тиждень" : "Training Frequency"}
                </span>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(Number(e.target.value))}
                  className="mt-2 w-full rounded-lg border border-zinc-700 bg-[#09090b] px-4 py-2.5 text-zinc-100 focus:border-lime-500 focus:outline-none"
                >
                  <option value={3}>3x / {isUk ? "тиждень" : "week"}</option>
                  <option value={4}>4x / {isUk ? "тиждень" : "week"}</option>
                  <option value={5}>5x / {isUk ? "тиждень" : "week"}</option>
                </select>
              </label>

              {/* Experience */}
              <label className="block">
                <span className="text-sm font-semibold text-zinc-300">
                  {isUk ? "Рівень досвіду" : "Experience Level"}
                </span>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value as "beginner" | "intermediate" | "advanced")}
                  className="mt-2 w-full rounded-lg border border-zinc-700 bg-[#09090b] px-4 py-2.5 text-zinc-100 focus:border-lime-500 focus:outline-none"
                >
                  <option value="beginner">{isUk ? "Початківець" : "Beginner"}</option>
                  <option value="intermediate">{isUk ? "Середній" : "Intermediate"}</option>
                  <option value="advanced">{isUk ? "Просунутий" : "Advanced"}</option>
                </select>
              </label>
            </div>

            {/* Results */}
            {weightDiff > 0 && (
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-[#09090b] border border-lime-500/30 p-5 text-center">
                  <span className="text-3xl font-black text-lime-400">{estimatedWeeks}</span>
                  <span className="block mt-1 text-sm text-zinc-400">
                    {isUk ? "тижнів до цілі" : "weeks to goal"}
                  </span>
                </div>
                <div className="rounded-xl bg-[#09090b] border border-lime-500/30 p-5 text-center">
                  <span className="text-lg font-bold text-lime-400">{recommendedProgram}</span>
                  <span className="block mt-1 text-sm text-zinc-400">
                    {isUk ? "рекомендована програма" : "recommended program"}
                  </span>
                </div>
                <div className="rounded-xl bg-[#09090b] border border-lime-500/30 p-5 text-center">
                  <span className="text-3xl font-black text-lime-400">~{weeklyRate.toFixed(1)} {isUk ? "кг" : "kg"}</span>
                  <span className="block mt-1 text-sm text-zinc-400">
                    {isUk ? "прогрес на тиждень" : "weekly progress"}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── Results Gallery ─── */}
      <section className="bg-[#18181b] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl md:text-4xl font-black uppercase tracking-tight">
            {isUk ? "Результати клієнтів" : "Client Results"}
          </h2>
          <p className="mt-3 text-center text-zinc-400">
            {isUk ? "Реальні люди. Реальні трансформації." : "Real people. Real transformations."}
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {RESULTS.map((r) => (
              <div key={r.nameEn} className="rounded-2xl border border-zinc-700 bg-[#09090b] overflow-hidden">
                {/* Before / After placeholders */}
                <div className="grid grid-cols-2 h-40">
                  <div className="bg-zinc-800 flex flex-col items-center justify-center gap-1">
                    <span className="text-xs uppercase tracking-wider text-zinc-500 font-bold">
                      {isUk ? "До" : "Before"}
                    </span>
                    <span className="text-3xl">🙁</span>
                  </div>
                  <div className="bg-linear-to-br from-lime-500/20 to-lime-600/10 flex flex-col items-center justify-center gap-1">
                    <span className="text-xs uppercase tracking-wider text-lime-500 font-bold">
                      {isUk ? "Після" : "After"}
                    </span>
                    <span className="text-3xl">💪</span>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-zinc-200">{isUk ? r.nameUk : r.nameEn}</p>
                    <p className="text-xs text-zinc-500">{r.weeks} {isUk ? "тижнів" : "weeks"}</p>
                  </div>
                  <span className="rounded-full bg-lime-500/15 px-3 py-1 text-sm font-bold text-lime-400">
                    {r.metric}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── About ─── */}
      <section className="bg-[#09090b] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 grid gap-12 md:grid-cols-2 items-center">
          {/* Photo placeholder */}
          <div className="flex justify-center">
            <div className="w-64 h-80 rounded-2xl border-2 border-lime-500/30 bg-zinc-800 flex items-center justify-center text-7xl">
              🧑‍🏫
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
              {isUk ? "Про тренера" : "About the Coach"}
            </h2>
            <p className="mt-5 text-zinc-400 leading-relaxed">
              {isUk
                ? "Мене звати Андрій. Я почав тренуватись у 16 років — худий, невпевнений, без знань. За 8 років я пройшов шлях від новачка до сертифікованого тренера з 500+ успішних трансформацій. Я виступав на змаганнях з бодібілдингу, працював з професійними спортсменами та звичайними людьми, які просто хотіли почуватись краще."
                : "My name is Andriy. I started training at 16 — skinny, insecure, clueless. Over 8 years I went from beginner to certified coach with 500+ successful transformations. I competed in bodybuilding, worked with professional athletes and everyday people who simply wanted to feel better."}
            </p>

            <h3 className="mt-8 text-sm font-bold uppercase tracking-wider text-lime-400">
              {isUk ? "Сертифікації" : "Certifications"}
            </h3>
            <ul className="mt-3 space-y-2">
              {CERTIFICATIONS.map((c) => (
                <li key={c.en} className="flex items-center gap-2 text-sm text-zinc-300">
                  <span className="text-lime-400">✓</span>
                  {isUk ? c.uk : c.en}
                </li>
              ))}
            </ul>

            <h3 className="mt-8 text-sm font-bold uppercase tracking-wider text-lime-400">
              {isUk ? "Змагання" : "Competition History"}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-zinc-300">
              <li>🥇 {isUk ? "Чемпіонат України 2022 — 2 місце, класичний бодібілдинг" : "Ukraine Championship 2022 — 2nd place, classic bodybuilding"}</li>
              <li>🥈 {isUk ? "Кубок Києва 2023 — 1 місце, Men's Physique" : "Kyiv Cup 2023 — 1st place, Men's Physique"}</li>
              <li>🏆 {isUk ? "IFBB Amateur 2024 — фіналіст" : "IFBB Amateur 2024 — finalist"}</li>
            </ul>

            <h3 className="mt-8 text-sm font-bold uppercase tracking-wider text-lime-400">
              {isUk ? "Філософія" : "Training Philosophy"}
            </h3>
            <p className="mt-3 text-sm text-zinc-400 italic leading-relaxed">
              {isUk
                ? "\"Немає магічних таблеток. Є дисципліна, послідовність та правильна система. Моя робота — дати тобі цю систему та тримати тебе відповідальним.\""
                : "\"There are no magic pills. There is discipline, consistency and the right system. My job is to give you that system and hold you accountable.\""}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Plans Comparison ─── */}
      <section className="bg-[#18181b] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl md:text-4xl font-black uppercase tracking-tight">
            {isUk ? "Порівняння планів" : "Training Plans Comparison"}
          </h2>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-700">
                  <th className="text-left py-3 px-4 text-zinc-400 font-medium">
                    {isUk ? "Функція" : "Feature"}
                  </th>
                  {PROGRAMS.map((p) => (
                    <th key={p.nameEn} className="py-3 px-4 text-center font-bold text-lime-400">
                      <EmojiIcon emoji={p.emoji} className="w-4 h-4 inline-block align-middle mr-1" />{isUk ? p.nameUk : p.nameEn}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PLAN_FEATURES.map((f, fi) => (
                  <tr key={f.en} className="border-b border-zinc-800 hover:bg-zinc-800/40 transition-colors">
                    <td className="py-3 px-4 text-zinc-300">{isUk ? f.uk : f.en}</td>
                    {PLAN_MATRIX.map((row, pi) => (
                      <td key={pi} className="py-3 px-4 text-center">
                        {row[fi] ? (
                          <span className="text-lime-400 font-bold">✓</span>
                        ) : (
                          <span className="text-zinc-600">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="border-t-2 border-lime-500/20">
                  <td className="py-3 px-4 font-bold text-zinc-200">{isUk ? "Ціна" : "Price"}</td>
                  {PROGRAMS.map((p) => (
                    <td key={p.nameEn} className="py-3 px-4 text-center font-bold text-lime-400">
                      {p.price}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="bg-[#09090b] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl md:text-4xl font-black uppercase tracking-tight">
            {isUk ? "Відгуки клієнтів" : "Client Testimonials"}
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.nameEn}
                className="rounded-2xl border border-zinc-700 bg-[#18181b] p-6 flex flex-col"
              >
                <p className="flex-1 text-zinc-300 text-sm leading-relaxed italic">
                  &ldquo;{isUk ? t.quoteUk : t.quoteEn}&rdquo;
                </p>
                <div className="mt-6 pt-4 border-t border-zinc-700">
                  <p className="font-bold text-zinc-200">{isUk ? t.nameUk : t.nameEn}</p>
                  <p className="text-xs text-zinc-500 mt-1">
                    {isUk ? t.programUk : t.programEn} — {isUk ? t.resultUk : t.resultEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Free Resources ─── */}
      <section className="bg-[#18181b] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl md:text-4xl font-black uppercase tracking-tight">
            {isUk ? "Безкоштовні матеріали" : "Free Resources"}
          </h2>
          <p className="mt-3 text-center text-zinc-400">
            {isUk ? "Завантажуй та починай вже сьогодні" : "Download and start today"}
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {RESOURCES.map((r) => (
              <div
                key={r.nameEn}
                className="rounded-2xl border border-zinc-700 bg-[#09090b] p-6 text-center hover:border-lime-500/50 transition-colors"
              >
                <EmojiIcon emoji={r.emoji} className="w-10 h-10" />
                <h3 className="mt-4 font-bold text-zinc-200">{isUk ? r.nameUk : r.nameEn}</h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  {isUk ? r.descUk : r.descEn}
                </p>
                <button className="mt-5 inline-flex rounded-lg border border-lime-500/40 px-5 py-2 text-sm font-bold text-lime-400 hover:bg-lime-500/10 transition-colors">
                  {isUk ? "Завантажити" : "Download"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Booking ─── */}
      <section className="bg-[#09090b] py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-center text-3xl md:text-4xl font-black uppercase tracking-tight">
            {isUk ? "Записатись на тренування" : "Book a Training Session"}
          </h2>
          <p className="mt-3 text-center text-zinc-400">
            {isUk
              ? "Заповни форму — я зв'яжусь протягом 24 годин"
              : "Fill in the form — I will contact you within 24 hours"}
          </p>

          {bookSent ? (
            <div className="mt-10 rounded-2xl border border-lime-500/30 bg-[#18181b] p-10 text-center">
              <span className="text-5xl">🎉</span>
              <h3 className="mt-4 text-xl font-bold text-lime-400">
                {isUk ? "Заявку відправлено!" : "Request Submitted!"}
              </h3>
              <p className="mt-2 text-zinc-400">
                {isUk
                  ? "Дякую! Я зв'яжусь з тобою найближчим часом."
                  : "Thank you! I will get back to you shortly."}
              </p>
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-zinc-700 bg-[#18181b] p-6 md:p-8 space-y-6">
              {/* Program */}
              <label className="block">
                <span className="text-sm font-semibold text-zinc-300">
                  {isUk ? "Програма" : "Program"}
                </span>
                <select
                  value={bookProgram}
                  onChange={(e) => setBookProgram(Number(e.target.value))}
                  className="mt-2 w-full rounded-lg border border-zinc-700 bg-[#09090b] px-4 py-2.5 text-zinc-100 focus:border-lime-500 focus:outline-none"
                >
                  {PROGRAMS.map((p, i) => (
                    <option key={p.nameEn} value={i}>
                      {p.emoji} {isUk ? p.nameUk : p.nameEn}
                    </option>
                  ))}
                </select>
              </label>

              <div className="grid gap-6 sm:grid-cols-2">
                {/* Format */}
                <label className="block">
                  <span className="text-sm font-semibold text-zinc-300">
                    {isUk ? "Формат" : "Training Format"}
                  </span>
                  <select
                    value={bookFormat}
                    onChange={(e) => setBookFormat(Number(e.target.value))}
                    className="mt-2 w-full rounded-lg border border-zinc-700 bg-[#09090b] px-4 py-2.5 text-zinc-100 focus:border-lime-500 focus:outline-none"
                  >
                    {FORMATS.map((f, i) => (
                      <option key={f.en} value={i}>{isUk ? f.uk : f.en}</option>
                    ))}
                  </select>
                </label>

                {/* Schedule */}
                <label className="block">
                  <span className="text-sm font-semibold text-zinc-300">
                    {isUk ? "Бажаний розклад" : "Preferred Schedule"}
                  </span>
                  <select
                    value={bookSchedule}
                    onChange={(e) => setBookSchedule(Number(e.target.value))}
                    className="mt-2 w-full rounded-lg border border-zinc-700 bg-[#09090b] px-4 py-2.5 text-zinc-100 focus:border-lime-500 focus:outline-none"
                  >
                    {SCHEDULES.map((s, i) => (
                      <option key={s.en} value={i}>{isUk ? s.uk : s.en}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {/* Name */}
                <label className="block">
                  <span className="text-sm font-semibold text-zinc-300">
                    {isUk ? "Ім'я" : "Name"}
                  </span>
                  <input
                    type="text"
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                    placeholder={isUk ? "Твоє ім'я" : "Your name"}
                    className="mt-2 w-full rounded-lg border border-zinc-700 bg-[#09090b] px-4 py-2.5 text-zinc-100 placeholder:text-zinc-600 focus:border-lime-500 focus:outline-none"
                  />
                </label>

                {/* Phone */}
                <label className="block">
                  <span className="text-sm font-semibold text-zinc-300">
                    {isUk ? "Телефон" : "Phone"}
                  </span>
                  <input
                    type="tel"
                    value={bookPhone}
                    onChange={(e) => setBookPhone(e.target.value)}
                    placeholder="+380 ..."
                    className="mt-2 w-full rounded-lg border border-zinc-700 bg-[#09090b] px-4 py-2.5 text-zinc-100 placeholder:text-zinc-600 focus:border-lime-500 focus:outline-none"
                  />
                </label>
              </div>

              {/* Goal */}
              <label className="block">
                <span className="text-sm font-semibold text-zinc-300">
                  {isUk ? "Твоя фітнес-ціль" : "Your Fitness Goal"}
                </span>
                <textarea
                  value={bookGoal}
                  onChange={(e) => setBookGoal(e.target.value)}
                  rows={4}
                  placeholder={isUk ? "Опиши свою ціль та поточний рівень..." : "Describe your goal and current fitness level..."}
                  className="mt-2 w-full rounded-lg border border-zinc-700 bg-[#09090b] px-4 py-2.5 text-zinc-100 placeholder:text-zinc-600 focus:border-lime-500 focus:outline-none resize-none"
                />
              </label>

              <button
                onClick={() => setBookSent(true)}
                className="w-full rounded-lg bg-lime-500 py-3 font-bold text-[#09090b] hover:bg-lime-400 transition-colors"
              >
                {isUk ? "Надіслати заявку" : "Submit Request"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-zinc-800 bg-[#09090b] py-12">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <span className="text-lg font-extrabold tracking-widest uppercase text-lime-400">
            💪 COACH ANDRIY
          </span>

          {/* Social links */}
          <div className="mt-6 flex justify-center gap-6 text-2xl">
            <a href="#" aria-label="Instagram" className="hover:scale-110 transition-transform">📸</a>
            <a href="#" aria-label="YouTube" className="hover:scale-110 transition-transform">🎬</a>
            <a href="#" aria-label="TikTok" className="hover:scale-110 transition-transform">🎵</a>
          </div>

          <p className="mt-4 text-sm text-zinc-500">
            coach.andriy@example.com
          </p>

          <p className="mt-6 text-sm font-bold text-zinc-400 uppercase tracking-wider">
            {isUk ? "Тренуйся важко. Будь послідовним." : "Train Hard. Stay Consistent."}
          </p>

          <p className="mt-4 text-xs text-zinc-600">
            &copy; 2026 Coach Andriy. {isUk ? "Усі права захищені." : "All rights reserved."}
          </p>
        </div>
      </footer>
    </div>
  );
}
