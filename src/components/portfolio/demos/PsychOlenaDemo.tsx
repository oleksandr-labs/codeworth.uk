"use client";

import { useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV = [
  { en: "About", uk: "Про мене" },
  { en: "Services", uk: "Послуги" },
  { en: "Approach", uk: "Підхід" },
  { en: "Blog", uk: "Блог" },
  { en: "Contact", uk: "Контакт" },
];

const SERVICES = [
  {
    emoji: "🧠",
    nameEn: "Individual Therapy",
    nameUk: "Індивідуальна терапія",
    descEn:
      "Personalized sessions focused on anxiety, depression, self-esteem and personal growth in a safe, confidential environment.",
    descUk:
      "Персоналізовані сесії, спрямовані на тривожність, депресію, самооцінку та особистісне зростання у безпечному, конфіденційному середовищі.",
    format: { en: "Online & In-person", uk: "Онлайн та очно" },
    duration: { en: "50 min", uk: "50 хв" },
    price: "1 200 ₴",
  },
  {
    emoji: "💑",
    nameEn: "Couples Counseling",
    nameUk: "Консультування пар",
    descEn:
      "Rebuild communication, resolve conflicts and deepen emotional connection with your partner through guided dialogue.",
    descUk:
      "Відновіть комунікацію, вирішіть конфлікти та поглибте емоційний зв'язок з партнером через керований діалог.",
    format: { en: "In-person preferred", uk: "Бажано очно" },
    duration: { en: "80 min", uk: "80 хв" },
    price: "1 800 ₴",
  },
  {
    emoji: "🚀",
    nameEn: "Career Coaching",
    nameUk: "Кар'єрний коучинг",
    descEn:
      "Discover your strengths, overcome professional blocks and build a career path aligned with your values and goals.",
    descUk:
      "Відкрийте свої сильні сторони, подолайте професійні блоки та побудуйте кар'єрний шлях, що відповідає вашим цінностям.",
    format: { en: "Online", uk: "Онлайн" },
    duration: { en: "60 min", uk: "60 хв" },
    price: "1 400 ₴",
  },
  {
    emoji: "🌿",
    nameEn: "Stress Management",
    nameUk: "Управління стресом",
    descEn:
      "Learn practical techniques to manage stress, prevent burnout and cultivate inner calm in daily life.",
    descUk:
      "Вивчіть практичні техніки управління стресом, запобігання вигоранню та культивування внутрішнього спокою.",
    format: { en: "Online & In-person", uk: "Онлайн та очно" },
    duration: { en: "50 min", uk: "50 хв" },
    price: "1 200 ₴",
  },
  {
    emoji: "🔮",
    nameEn: "Self-Discovery Workshops",
    nameUk: "Воркшопи самопізнання",
    descEn:
      "Small group workshops exploring identity, values, emotional patterns and authentic self-expression.",
    descUk:
      "Групові воркшопи для дослідження ідентичності, цінностей, емоційних патернів та автентичного самовираження.",
    format: { en: "In-person (groups of 6–10)", uk: "Очно (групи 6–10)" },
    duration: { en: "3 hours", uk: "3 години" },
    price: "800 ₴",
  },
];

const BURNOUT_QUESTIONS = [
  {
    en: "Do you feel emotionally drained at the end of most workdays?",
    uk: "Чи відчуваєте ви емоційне виснаження наприкінці більшості робочих днів?",
  },
  {
    en: "Have you lost interest in activities you used to enjoy?",
    uk: "Чи втратили ви інтерес до діяльності, яка раніше приносила задоволення?",
  },
  {
    en: "Do you have trouble falling asleep or staying asleep?",
    uk: "Чи маєте ви проблеми із засинанням або підтримкою сну?",
  },
  {
    en: "Do you feel cynical or detached from your work?",
    uk: "Чи відчуваєте ви цинізм або відстороненість від роботи?",
  },
  {
    en: "Do you experience frequent headaches, muscle tension or fatigue?",
    uk: "Чи відчуваєте ви часті головні болі, м'язове напруження або втому?",
  },
  {
    en: "Do you find it hard to concentrate or make decisions?",
    uk: "Чи важко вам зосередитися або приймати рішення?",
  },
  {
    en: "Do you feel undervalued or unappreciated at work?",
    uk: "Чи відчуваєте ви, що вас недооцінюють на роботі?",
  },
  {
    en: "Have you withdrawn from friends and family recently?",
    uk: "Чи відсторонилися ви від друзів та родини останнім часом?",
  },
  {
    en: "Do you rely on food, alcohol or scrolling to cope with stress?",
    uk: "Чи використовуєте ви їжу, алкоголь або скролінг для боротьби зі стресом?",
  },
  {
    en: "Do you feel like nothing you do makes a difference?",
    uk: "Чи відчуваєте ви, що нічого з того, що ви робите, не має значення?",
  },
];

const PILLARS = [
  {
    emoji: "🪷",
    titleEn: "Gestalt Therapy",
    titleUk: "Гештальт-терапія",
    descEn:
      "Awareness of the present moment, understanding how past experiences shape current patterns, and reclaiming wholeness through authentic self-expression.",
    descUk:
      "Усвідомлення теперішнього моменту, розуміння того, як минулий досвід формує поточні патерни, та повернення цілісності через автентичне самовираження.",
  },
  {
    emoji: "🧩",
    titleEn: "Cognitive Behavioral Therapy",
    titleUk: "Когнітивно-поведінкова терапія",
    descEn:
      "Identifying and restructuring unhelpful thought patterns, building practical coping strategies and measurable progress toward your goals.",
    descUk:
      "Виявлення та реструктуризація неефективних моделей мислення, побудова практичних стратегій подолання та вимірний прогрес до ваших цілей.",
  },
  {
    emoji: "🧘",
    titleEn: "Mindfulness Integration",
    titleUk: "Інтеграція усвідомленості",
    descEn:
      "Cultivating calm attention, body awareness and emotional regulation through breathing exercises, meditation and grounding techniques.",
    descUk:
      "Культивування спокійної уваги, тілесного усвідомлення та емоційної регуляції через дихальні вправи, медитацію та заземлення.",
  },
];

const ARTICLES = [
  {
    emoji: "🔥",
    titleEn: "5 Signs of Burnout You Shouldn't Ignore",
    titleUk: "5 ознак вигорання, які не варто ігнорувати",
    date: "2026-03-10",
    readEn: "7 min read",
    readUk: "7 хв читання",
    excerptEn:
      "Burnout doesn't happen overnight. Learn to recognize early warning signs before they escalate into serious physical and emotional health problems.",
    excerptUk:
      "Вигорання не відбувається за одну ніч. Навчіться розпізнавати ранні попереджувальні ознаки, перш ніж вони переростуть у серйозні проблеми зі здоров'ям.",
  },
  {
    emoji: "🛡️",
    titleEn: "Setting Healthy Boundaries: A Practical Guide",
    titleUk: "Встановлення здорових кордонів: практичний посібник",
    date: "2026-02-22",
    readEn: "9 min read",
    readUk: "9 хв читання",
    excerptEn:
      "Boundaries aren't walls — they're bridges to healthier relationships. Discover concrete steps to say 'no' without guilt and protect your energy.",
    excerptUk:
      "Кордони — це не стіни, а мости до здоровіших стосунків. Відкрийте конкретні кроки, щоб казати «ні» без провини та захищати свою енергію.",
  },
  {
    emoji: "🌅",
    titleEn: "Mindfulness for Beginners: Where to Start",
    titleUk: "Усвідомленість для початківців: з чого почати",
    date: "2026-02-05",
    readEn: "6 min read",
    readUk: "6 хв читання",
    excerptEn:
      "You don't need to meditate for an hour to benefit from mindfulness. Start with these simple 3-minute exercises you can do anywhere.",
    excerptUk:
      "Не потрібно медитувати годину, щоб отримати користь від усвідомленості. Почніть із цих простих 3-хвилинних вправ, які можна виконувати будь-де.",
  },
];

const TESTIMONIALS = [
  {
    name: { en: "Iryna", uk: "Ірина" },
    topicEn: "Anxiety & Self-esteem",
    topicUk: "Тривожність і самооцінка",
    textEn:
      "After six months of sessions with Olena, I finally feel like I understand myself. She creates such a warm, non-judgmental space that I could open up about things I'd never shared before.",
    textUk:
      "Після шести місяців сесій з Оленою я нарешті відчуваю, що розумію себе. Вона створює такий теплий, безоціночний простір, що я змогла відкритися про речі, якими ніколи раніше не ділилася.",
  },
  {
    name: { en: "Andriy", uk: "Андрій" },
    topicEn: "Career burnout",
    topicUk: "Професійне вигорання",
    textEn:
      "I came to Olena completely burned out and ready to quit everything. She helped me find the root causes and rebuild my relationship with work. I'm genuinely excited about my career again.",
    textUk:
      "Я прийшов до Олени повністю вигорілий і готовий все кинути. Вона допомогла мені знайти першопричини та відновити стосунки з роботою. Я знову щиро захоплений своєю кар'єрою.",
  },
  {
    name: { en: "Natalia", uk: "Наталія" },
    topicEn: "Couples counseling",
    topicUk: "Консультування пар",
    textEn:
      "My husband and I were on the verge of divorce. Olena helped us hear each other again. Her gentle approach and practical exercises transformed our communication completely.",
    textUk:
      "Ми з чоловіком були на межі розлучення. Олена допомогла нам знову почути одне одного. Її м'який підхід та практичні вправи повністю трансформували нашу комунікацію.",
  },
];

const SESSION_TYPES = [
  { en: "Individual Therapy", uk: "Індивідуальна терапія" },
  { en: "Couples Counseling", uk: "Консультування пар" },
  { en: "Career Coaching", uk: "Кар'єрний коучинг" },
  { en: "Stress Management", uk: "Управління стресом" },
  { en: "Self-Discovery Workshop", uk: "Воркшоп самопізнання" },
];

const FORMAT_OPTIONS = [
  { en: "Online (Zoom)", uk: "Онлайн (Zoom)" },
  { en: "In-person (Kyiv office)", uk: "Очно (офіс у Києві)" },
];

const DAY_OPTIONS = [
  { en: "Monday", uk: "Понеділок" },
  { en: "Tuesday", uk: "Вівторок" },
  { en: "Wednesday", uk: "Середа" },
  { en: "Thursday", uk: "Четвер" },
  { en: "Friday", uk: "П'ятниця" },
  { en: "Saturday", uk: "Субота" },
];

const TIME_OPTIONS = ["10:00", "12:00", "14:00", "16:00", "18:00"];

// ─── Component ───────────────────────────────────────────────────────────────

export function PsychOlenaDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  /* Burnout test */
  const [answers, setAnswers] = useState<(boolean | null)[]>(
    Array(10).fill(null),
  );
  const [showResult, setShowResult] = useState(false);

  /* Booking form */
  const [bookType, setBookType] = useState("");
  const [bookFormat, setBookFormat] = useState("");
  const [bookDay, setBookDay] = useState("");
  const [bookTime, setBookTime] = useState("");
  const [bookName, setBookName] = useState("");
  const [bookPhone, setBookPhone] = useState("");
  const [bookConcern, setBookConcern] = useState("");
  const [bookSent, setBookSent] = useState(false);

  /* Mobile nav */
  const [menuOpen, setMenuOpen] = useState(false);

  const yesCount = answers.filter((a) => a === true).length;
  const allAnswered = answers.every((a) => a !== null);

  function getRiskLevel() {
    if (yesCount <= 3)
      return {
        level: isUk ? "Низький ризик" : "Low Risk",
        color: "text-green-700 bg-green-50 border-green-300",
        emoji: "🟢",
        msgEn:
          "Great news — your burnout risk appears low. Keep nurturing healthy habits and don't hesitate to reach out if things change.",
        msgUk:
          "Чудові новини — ваш ризик вигорання видається низьким. Продовжуйте підтримувати здорові звички і не вагайтеся звернутися, якщо щось зміниться.",
      };
    if (yesCount <= 6)
      return {
        level: isUk ? "Помірний ризик" : "Moderate Risk",
        color: "text-yellow-800 bg-yellow-50 border-yellow-300",
        emoji: "🟡",
        msgEn:
          "You're showing moderate signs of burnout. Consider speaking with a professional to develop coping strategies before symptoms intensify.",
        msgUk:
          "У вас помірні ознаки вигорання. Зверніться до фахівця, щоб розробити стратегії подолання, перш ніж симптоми посиляться.",
      };
    return {
      level: isUk ? "Високий ризик" : "High Risk",
      color: "text-red-700 bg-red-50 border-red-300",
      emoji: "🔴",
      msgEn:
        "Your answers suggest a high risk of burnout. I strongly recommend scheduling a consultation to address these symptoms and start your recovery.",
      msgUk:
        "Ваші відповіді вказують на високий ризик вигорання. Наполегливо рекомендую записатися на консультацію, щоб розглянути ці симптоми та розпочати відновлення.",
    };
  }

  const handleBookSubmit = () => {
    if (bookName && bookPhone && bookType) setBookSent(true);
  };

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#faf7f5] text-stone-800 font-sans">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 bg-[#faf7f5]/90 backdrop-blur border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          <div>
            <span className="text-xl font-serif font-semibold text-stone-700 tracking-wide">
              {isUk ? "Олена Ільченко" : "Olena Ilchenko"}
            </span>
            <span className="hidden sm:inline ml-3 text-xs text-stone-400 tracking-widest uppercase">
              Psychologist &bull; Coach
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV.map((n) => (
              <button
                key={n.en}
                className="text-sm text-stone-500 hover:text-stone-800 transition-colors"
              >
                {isUk ? n.uk : n.en}
              </button>
            ))}
            <button className="ml-2 px-5 py-2 rounded-full text-sm font-medium bg-green-200 text-green-900 hover:bg-green-300 transition-colors">
              {isUk ? "Записатися" : "Book Session"}
            </button>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <div className="md:hidden border-t border-stone-200 bg-[#faf7f5] px-4 pb-4 pt-2 space-y-2">
            {NAV.map((n) => (
              <button
                key={n.en}
                className="block w-full text-left text-sm text-stone-600 py-2"
                onClick={() => setMenuOpen(false)}
              >
                {isUk ? n.uk : n.en}
              </button>
            ))}
            <button className="w-full mt-2 px-5 py-2 rounded-full text-sm font-medium bg-green-200 text-green-900">
              {isUk ? "Записатися" : "Book Session"}
            </button>
          </div>
        )}
      </header>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="bg-linear-to-br from-[#faf7f5] to-green-50 py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-800 leading-tight mb-4">
              {isUk
                ? "Допоможу Знайти Гармонію з Собою"
                : "I'll Help You Find Harmony Within"}
            </h1>
            <p className="text-lg text-stone-500 mb-8 max-w-lg">
              {isUk
                ? "Безпечний простір для дослідження себе, зцілення та зростання. Разом ми знайдемо шлях до вашого внутрішнього спокою."
                : "A safe space to explore yourself, heal and grow. Together we'll find the path to your inner peace."}
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <button className="px-7 py-3 rounded-full font-medium bg-green-300 text-green-950 hover:bg-green-400 transition-colors shadow-sm">
                {isUk ? "Записатися на сесію" : "Book a Session"}
              </button>
              <button className="px-7 py-3 rounded-full font-medium border border-stone-300 text-stone-600 hover:bg-stone-100 transition-colors">
                {isUk ? "Дізнатися більше" : "Learn More"}
              </button>
            </div>
          </div>

          {/* Photo placeholder */}
          <div className="shrink-0">
            <div className="w-64 h-64 md:w-72 md:h-72 rounded-full bg-linear-to-br from-green-200 to-stone-200 flex items-center justify-center shadow-lg">
              <span className="text-7xl">🌿</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── About ───────────────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center mb-4 text-stone-800">
            {isUk ? "Про мене" : "About Me"}
          </h2>
          <p className="text-center text-stone-400 mb-12 max-w-xl mx-auto">
            {isUk
              ? "Моя місія — допомогти вам почути себе"
              : "My mission is to help you hear yourself"}
          </p>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="space-y-4 text-stone-600 leading-relaxed">
              <p>
                {isUk
                  ? "Привіт, я Олена. Понад 12 років я допомагаю людям знаходити внутрішню рівновагу, будувати здорові стосунки та відкривати своє справжнє «я». Моя подорож у психологію почалася з власного досвіду подолання кризи, і саме це зробило мене тим терапевтом, яким я є сьогодні."
                  : "Hi, I'm Olena. For over 12 years, I've been helping people find inner balance, build healthy relationships and discover their true selves. My journey into psychology began with my own experience of overcoming a crisis, and that's what made me the therapist I am today."}
              </p>
              <p>
                {isUk
                  ? "Я вірю, що кожна людина вже має відповіді всередині себе — моя роль полягає в тому, щоб створити безпечний простір, де ви зможете їх почути."
                  : "I believe every person already has the answers within — my role is to create a safe space where you can hear them."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  emoji: "🎓",
                  label: isUk ? "Кандидат наук" : "PhD in Psychology",
                  sub: isUk ? "КНУ ім. Шевченка" : "Taras Shevchenko Uni",
                },
                {
                  emoji: "📅",
                  label: isUk ? "12+ років" : "12+ Years",
                  sub: isUk ? "практичного досвіду" : "of practice",
                },
                {
                  emoji: "📜",
                  label: isUk ? "Сертифікати" : "Certifications",
                  sub: isUk ? "Гештальт, КПТ, EMDR" : "Gestalt, CBT, EMDR",
                },
                {
                  emoji: "🤝",
                  label: isUk ? "1 000+" : "1,000+",
                  sub: isUk ? "клієнтів" : "clients helped",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-xl p-4 border border-stone-100 text-center shadow-sm"
                >
                  <span className="text-2xl block mb-1">{stat.emoji}</span>
                  <p className="font-semibold text-stone-700 text-sm">
                    {stat.label}
                  </p>
                  <p className="text-xs text-stone-400">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-green-50/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center mb-4 text-stone-800">
            {isUk ? "Послуги" : "Services"}
          </h2>
          <p className="text-center text-stone-400 mb-12 max-w-lg mx-auto">
            {isUk
              ? "Кожна людина унікальна — тому я пропоную різні формати роботи"
              : "Every person is unique — that's why I offer diverse formats"}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <div
                key={s.nameEn}
                className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-3xl mb-3 block">{s.emoji}</span>
                <h3 className="text-lg font-semibold text-stone-800 mb-2">
                  {isUk ? s.nameUk : s.nameEn}
                </h3>
                <p className="text-sm text-stone-500 mb-4 leading-relaxed">
                  {isUk ? s.descUk : s.descEn}
                </p>
                <div className="space-y-1 text-xs text-stone-400">
                  <p>
                    📍 {isUk ? s.format.uk : s.format.en} &bull; ⏱{" "}
                    {isUk ? s.duration.uk : s.duration.en}
                  </p>
                  <p className="text-base font-semibold text-green-700 mt-2">
                    {s.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Burnout Self-Test ───────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center mb-4 text-stone-800">
            {isUk
              ? "Тест на вигорання"
              : "Burnout Self-Test"}
          </h2>
          <p className="text-center text-stone-400 mb-10">
            {isUk
              ? "Дайте відповідь на 10 запитань і дізнайтеся свій рівень ризику"
              : "Answer 10 questions and discover your risk level"}
          </p>

          <div className="space-y-4">
            {BURNOUT_QUESTIONS.map((q, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-4 border border-stone-100 flex flex-col sm:flex-row sm:items-center gap-3"
              >
                <span className="shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-sm font-semibold">
                  {i + 1}
                </span>
                <p className="flex-1 text-sm text-stone-700">
                  {isUk ? q.uk : q.en}
                </p>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => {
                      const next = [...answers];
                      next[i] = true;
                      setAnswers(next);
                      setShowResult(false);
                    }}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      answers[i] === true
                        ? "bg-green-300 text-green-950"
                        : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                    }`}
                  >
                    {isUk ? "Так" : "Yes"}
                  </button>
                  <button
                    onClick={() => {
                      const next = [...answers];
                      next[i] = false;
                      setAnswers(next);
                      setShowResult(false);
                    }}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      answers[i] === false
                        ? "bg-stone-400 text-white"
                        : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                    }`}
                  >
                    {isUk ? "Ні" : "No"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Submit & result */}
          <div className="mt-8 text-center">
            <button
              onClick={() => allAnswered && setShowResult(true)}
              disabled={!allAnswered}
              className={`px-8 py-3 rounded-full font-medium transition-colors ${
                allAnswered
                  ? "bg-green-300 text-green-950 hover:bg-green-400"
                  : "bg-stone-200 text-stone-400 cursor-not-allowed"
              }`}
            >
              {isUk ? "Показати результат" : "Show Result"}
            </button>
          </div>

          {showResult && (
            <div
              className={`mt-8 rounded-2xl border p-6 text-center ${getRiskLevel().color}`}
            >
              <span className="text-4xl block mb-2">
                {getRiskLevel().emoji}
              </span>
              <h3 className="text-xl font-bold mb-1">
                {getRiskLevel().level}: {yesCount}/10
              </h3>
              <p className="text-sm mb-4 max-w-md mx-auto">
                {isUk ? getRiskLevel().msgUk : getRiskLevel().msgEn}
              </p>
              <button className="px-6 py-2 rounded-full text-sm font-medium bg-green-300 text-green-950 hover:bg-green-400 transition-colors">
                {isUk ? "Записатися на консультацію" : "Book Consultation"}
              </button>
              <p className="mt-4 text-xs opacity-60">
                {isUk
                  ? "⚠️ Це не клінічний діагноз. Для точної оцінки зверніться до фахівця."
                  : "⚠️ Not a clinical diagnosis. Consult a professional for an accurate assessment."}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Approach ────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-linear-to-br from-green-50 to-[#faf7f5]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center mb-4 text-stone-800">
            {isUk ? "Мій підхід" : "My Approach"}
          </h2>
          <p className="text-center text-stone-400 mb-12 max-w-lg mx-auto">
            {isUk
              ? "Інтегративний підхід, що поєднує найкращі практики сучасної психології"
              : "An integrative approach combining the best practices of modern psychology"}
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {PILLARS.map((p) => (
              <div
                key={p.titleEn}
                className="bg-white rounded-2xl p-8 border border-stone-100 text-center shadow-sm"
              >
                <span className="text-4xl mb-4 block">{p.emoji}</span>
                <h3 className="text-lg font-semibold text-stone-800 mb-3">
                  {isUk ? p.titleUk : p.titleEn}
                </h3>
                <p className="text-sm text-stone-500 leading-relaxed">
                  {isUk ? p.descUk : p.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Blog / Articles ─────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center mb-4 text-stone-800">
            {isUk ? "Блог" : "Blog & Articles"}
          </h2>
          <p className="text-center text-stone-400 mb-12">
            {isUk
              ? "Корисні матеріали для вашого ментального здоров'я"
              : "Helpful resources for your mental health"}
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {ARTICLES.map((a) => (
              <article
                key={a.titleEn}
                className="bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-40 bg-linear-to-br from-green-100 to-stone-100 flex items-center justify-center">
                  <span className="text-5xl">{a.emoji}</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-stone-400 mb-2">
                    <span>{a.date}</span>
                    <span>&bull;</span>
                    <span>{isUk ? a.readUk : a.readEn}</span>
                  </div>
                  <h3 className="font-semibold text-stone-800 mb-2 leading-snug">
                    {isUk ? a.titleUk : a.titleEn}
                  </h3>
                  <p className="text-sm text-stone-500 leading-relaxed">
                    {isUk ? a.excerptUk : a.excerptEn}
                  </p>
                  <button className="mt-3 text-sm font-medium text-green-700 hover:text-green-900 transition-colors">
                    {isUk ? "Читати далі →" : "Read more →"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-green-50/40">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center mb-4 text-stone-800">
            {isUk ? "Відгуки" : "Testimonials"}
          </h2>
          <p className="text-center text-stone-400 mb-12">
            {isUk
              ? "Слова тих, хто вже пройшов цей шлях"
              : "Words from those who've walked this path"}
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name.en}
                className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center text-lg">
                    {(isUk ? t.name.uk : t.name.en).charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-stone-700 text-sm">
                      {isUk ? t.name.uk : t.name.en}
                    </p>
                    <p className="text-xs text-stone-400">
                      {isUk ? t.topicUk : t.topicEn}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-stone-500 leading-relaxed italic">
                  &ldquo;{isUk ? t.textUk : t.textEn}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Booking Form ────────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center mb-4 text-stone-800">
            {isUk ? "Записатися на сесію" : "Book a Session"}
          </h2>
          <p className="text-center text-stone-400 mb-10">
            {isUk
              ? "Оберіть зручний формат і час — я зв'яжуся з вами протягом доби"
              : "Choose a convenient format and time — I'll reach out within 24 hours"}
          </p>

          {bookSent ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
              <span className="text-5xl block mb-4">✅</span>
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                {isUk ? "Дякую за запис!" : "Thank you for booking!"}
              </h3>
              <p className="text-sm text-green-700">
                {isUk
                  ? "Я зв'яжуся з вами протягом 24 годин для підтвердження. Якщо терміново — телефонуйте."
                  : "I'll contact you within 24 hours to confirm. If urgent — please call directly."}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 border border-stone-100 shadow-sm space-y-5">
              {/* Session type */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  {isUk ? "Тип сесії" : "Session Type"} *
                </label>
                <select
                  value={bookType}
                  onChange={(e) => setBookType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-[#faf7f5] text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  <option value="">
                    {isUk ? "— Оберіть —" : "— Select —"}
                  </option>
                  {SESSION_TYPES.map((st) => (
                    <option key={st.en} value={st.en}>
                      {isUk ? st.uk : st.en}
                    </option>
                  ))}
                </select>
              </div>

              {/* Format */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  {isUk ? "Формат" : "Format"}
                </label>
                <div className="flex gap-3">
                  {FORMAT_OPTIONS.map((f) => (
                    <button
                      key={f.en}
                      onClick={() => setBookFormat(f.en)}
                      className={`flex-1 px-4 py-2.5 rounded-xl border text-sm transition-colors ${
                        bookFormat === f.en
                          ? "border-green-400 bg-green-50 text-green-800"
                          : "border-stone-200 text-stone-500 hover:bg-stone-50"
                      }`}
                    >
                      {isUk ? f.uk : f.en}
                    </button>
                  ))}
                </div>
              </div>

              {/* Day & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    {isUk ? "Бажаний день" : "Preferred Day"}
                  </label>
                  <select
                    value={bookDay}
                    onChange={(e) => setBookDay(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-[#faf7f5] text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                  >
                    <option value="">
                      {isUk ? "— День —" : "— Day —"}
                    </option>
                    {DAY_OPTIONS.map((d) => (
                      <option key={d.en} value={d.en}>
                        {isUk ? d.uk : d.en}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    {isUk ? "Бажаний час" : "Preferred Time"}
                  </label>
                  <select
                    value={bookTime}
                    onChange={(e) => setBookTime(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-[#faf7f5] text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                  >
                    <option value="">
                      {isUk ? "— Час —" : "— Time —"}
                    </option>
                    {TIME_OPTIONS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    {isUk ? "Ім'я" : "Name"} *
                  </label>
                  <input
                    type="text"
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                    placeholder={isUk ? "Ваше ім'я" : "Your name"}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-[#faf7f5] text-sm text-stone-700 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-green-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    {isUk ? "Телефон" : "Phone"} *
                  </label>
                  <input
                    type="tel"
                    value={bookPhone}
                    onChange={(e) => setBookPhone(e.target.value)}
                    placeholder="+380 ..."
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-[#faf7f5] text-sm text-stone-700 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-green-300"
                  />
                </div>
              </div>

              {/* Concern */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  {isUk ? "Коротко опишіть запит" : "Brief description of your concern"}
                </label>
                <textarea
                  value={bookConcern}
                  onChange={(e) => setBookConcern(e.target.value)}
                  rows={3}
                  placeholder={
                    isUk
                      ? "Що вас турбує? (необов'язково)"
                      : "What's on your mind? (optional)"
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-[#faf7f5] text-sm text-stone-700 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-green-300 resize-none"
                />
              </div>

              <button
                onClick={handleBookSubmit}
                className="w-full py-3 rounded-full font-medium bg-green-300 text-green-950 hover:bg-green-400 transition-colors"
              >
                {isUk ? "Надіслати заявку" : "Submit Request"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="bg-stone-800 text-stone-300 py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-serif font-semibold text-white mb-3">
              {isUk ? "Олена Ільченко" : "Olena Ilchenko"}
            </h3>
            <p className="text-sm text-stone-400 leading-relaxed mb-4">
              {isUk
                ? "Психолог, коуч, кандидат психологічних наук. Допомагаю знайти гармонію з собою вже понад 12 років."
                : "Psychologist, coach, PhD in Psychology. Helping people find harmony within for over 12 years."}
            </p>
            <div className="flex gap-3 text-lg">
              <span
                className="w-9 h-9 rounded-full bg-stone-700 flex items-center justify-center hover:bg-stone-600 cursor-pointer transition-colors"
                title="Instagram"
              >
                📷
              </span>
              <span
                className="w-9 h-9 rounded-full bg-stone-700 flex items-center justify-center hover:bg-stone-600 cursor-pointer transition-colors"
                title="Facebook"
              >
                📘
              </span>
              <span
                className="w-9 h-9 rounded-full bg-stone-700 flex items-center justify-center hover:bg-stone-600 cursor-pointer transition-colors"
                title="Telegram"
              >
                ✈️
              </span>
              <span
                className="w-9 h-9 rounded-full bg-stone-700 flex items-center justify-center hover:bg-stone-600 cursor-pointer transition-colors"
                title="YouTube"
              >
                🎬
              </span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-3">
              {isUk ? "Контакти" : "Contact"}
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>📞 +380 (44) 123-45-67</li>
              <li>📧 olena@ilchenko-psy.ua</li>
              <li>
                📍{" "}
                {isUk
                  ? "м. Київ, вул. Хрещатик 22, оф. 15"
                  : "Kyiv, 22 Khreshchatyk St, office 15"}
              </li>
              <li className="pt-2">
                🕐{" "}
                {isUk
                  ? "Пн–Пт: 10:00–19:00 | Сб: 10:00–15:00"
                  : "Mon–Fri: 10:00–19:00 | Sat: 10:00–15:00"}
              </li>
            </ul>
          </div>

          {/* Crisis line */}
          <div>
            <h4 className="font-semibold text-white mb-3">
              {isUk ? "Потрібна термінова допомога?" : "Need urgent help?"}
            </h4>
            <p className="text-sm text-stone-400 mb-3">
              {isUk
                ? "Якщо ви або хтось із ваших близьких перебуває у кризовому стані — не зволікайте:"
                : "If you or someone you know is in crisis — don't hesitate:"}
            </p>
            <div className="bg-stone-700 rounded-xl p-4">
              <p className="text-sm font-medium text-white mb-1">
                🆘{" "}
                {isUk
                  ? "Лінія психологічної підтримки"
                  : "Psychological Support Hotline"}
              </p>
              <p className="text-lg font-bold text-green-300">
                7333{" "}
                <span className="text-sm font-normal text-stone-400">
                  ({isUk ? "безкоштовно" : "toll-free"})
                </span>
              </p>
              <p className="text-xs text-stone-400 mt-1">
                {isUk ? "Цілодобово, анонімно" : "24/7, anonymous"}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-stone-700 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone-500">
            &copy; 2026{" "}
            {isUk ? "Олена Ільченко" : "Olena Ilchenko"}.{" "}
            {isUk ? "Усі права захищені." : "All rights reserved."}
          </p>
          <p className="text-xs text-stone-500">
            {isUk ? "Зроблено з 💚 у Києві" : "Made with 💚 in Kyiv"}
          </p>
        </div>
      </footer>
    </div>
  );
}
