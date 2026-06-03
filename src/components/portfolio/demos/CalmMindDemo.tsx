"use client";

import { useState } from "react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    emoji: "🧩",
    nameEn: "Individual CBT",
    nameUk: "Індивідуальна КПТ",
    descEn: "One-on-one cognitive behavioural therapy tailored to your specific challenges and goals.",
    descUk: "Індивідуальна когнітивно-поведінкова терапія, адаптована до ваших потреб.",
    duration: "50 min",
    price: "£80",
    color: "bg-sky-50 border-sky-200",
  },
  {
    emoji: "💑",
    nameEn: "Couples Therapy",
    nameUk: "Терапія для пар",
    descEn: "Strengthen communication and resolve conflict patterns using evidence-based techniques.",
    descUk: "Покращте спілкування та вирішіть конфлікти за допомогою перевірених методик.",
    duration: "75 min",
    price: "£110",
    color: "bg-green-50 border-green-200",
  },
  {
    emoji: "🤝",
    nameEn: "Group Sessions",
    nameUk: "Групові сесії",
    descEn: "Supportive small-group therapy with others facing similar challenges. Max 8 participants.",
    descUk: "Підтримуюча групова терапія для тих, хто стикається зі схожими труднощами.",
    duration: "90 min",
    price: "£35",
    color: "bg-teal-50 border-teal-200",
  },
  {
    emoji: "🌿",
    nameEn: "Anxiety Treatment",
    nameUk: "Лікування тривоги",
    descEn: "Targeted CBT protocols for generalised anxiety, panic disorder, and phobias.",
    descUk: "Спеціалізовані протоколи КПТ для генералізованої тривоги, панічних атак та фобій.",
    duration: "50 min",
    price: "£80",
    color: "bg-blue-50 border-blue-200",
  },
  {
    emoji: "🌤️",
    nameEn: "Depression Support",
    nameUk: "Підтримка при депресії",
    descEn: "Compassionate therapy for low mood, loss of motivation, and depressive episodes.",
    descUk: "Підтримуюча терапія при пригніченому настрої, втраті мотивації та депресивних епізодах.",
    duration: "50 min",
    price: "£80",
    color: "bg-indigo-50 border-indigo-200",
  },
  {
    emoji: "🕊️",
    nameEn: "Trauma Recovery",
    nameUk: "Відновлення після травми",
    descEn: "Trauma-focused CBT and EMDR integration for PTSD and complex trauma.",
    descUk: "Травма-орієнтована КПТ та EMDR для ПТСР та комплексної травми.",
    duration: "60 min",
    price: "£90",
    color: "bg-purple-50 border-purple-200",
  },
];

const GAD7_QUESTIONS = [
  { en: "Feeling nervous, anxious, or on edge", uk: "Відчуття нервозності, тривоги або напруги" },
  { en: "Not being able to stop or control worrying", uk: "Нездатність зупинити або контролювати хвилювання" },
  { en: "Worrying too much about different things", uk: "Надмірне хвилювання про різні речі" },
  { en: "Trouble relaxing", uk: "Труднощі з розслабленням" },
  { en: "Being so restless that it's hard to sit still", uk: "Такий неспокій, що важко сидіти на місці" },
  { en: "Becoming easily annoyed or irritable", uk: "Легка дратівливість або роздратованість" },
  { en: "Feeling afraid, as if something awful might happen", uk: "Відчуття страху, наче може статися щось жахливе" },
];

const GAD7_OPTIONS = [
  { labelEn: "Not at all", labelUk: "Зовсім ні", value: 0 },
  { labelEn: "Several days", labelUk: "Кілька днів", value: 1 },
  { labelEn: "More than half the days", labelUk: "Більше половини днів", value: 2 },
  { labelEn: "Nearly every day", labelUk: "Майже щодня", value: 3 },
];

const THERAPISTS = [
  {
    emoji: "👩‍💼",
    nameEn: "Dr. Sarah Whitfield",
    nameUk: "Д-р Сара Вітфілд",
    credentialsEn: "PhD Clinical Psychology · CBT Certified · BABCP Accredited",
    credentialsUk: "Доктор клінічної психології · CBT сертифікований · BABCP акредитований",
    specEn: ["Anxiety & Panic", "OCD", "Health Anxiety"],
    specUk: ["Тривога та паніка", "ОКР", "Тривога про здоров'я"],
    languagesEn: "English, French",
    languagesUk: "Англійська, Французька",
    accepting: true,
  },
  {
    emoji: "👨‍💼",
    nameEn: "Dr. James Okoye",
    nameUk: "Д-р Джеймс Окойє",
    credentialsEn: "MSc Psychology · CBT Certified · BACP Member",
    credentialsUk: "Магістр психології · CBT сертифікований · член BACP",
    specEn: ["Depression", "Trauma & PTSD", "Relationships"],
    specUk: ["Депресія", "Травма та ПТСР", "Стосунки"],
    languagesEn: "English, Yoruba",
    languagesUk: "Англійська, Йоруба",
    accepting: true,
  },
  {
    emoji: "👩‍💼",
    nameEn: "Dr. Elena Marchetti",
    nameUk: "Д-р Олена Марчетті",
    credentialsEn: "PsyD · Trauma-Focused CBT · EMDR Certified",
    credentialsUk: "Доктор психології · Травма-орієнтована КПТ · EMDR сертифікований",
    specEn: ["Trauma Recovery", "Grief", "Life Transitions"],
    specUk: ["Відновлення після травми", "Горе", "Життєві переходи"],
    languagesEn: "English, Italian, Ukrainian",
    languagesUk: "Англійська, Італійська, Українська",
    accepting: false,
  },
];

const GROUPS = [
  {
    emoji: "🌿",
    nameEn: "Anxiety Management",
    nameUk: "Управління тривогою",
    descEn: "Learn practical CBT tools to reduce anxiety and reclaim your daily life.",
    descUk: "Навчіться практичним інструментам КПТ для зменшення тривоги.",
    scheduleEn: "Tuesdays, 6:00–7:30 PM",
    scheduleUk: "Вівторки, 18:00–19:30",
    sizeEn: "6–8 participants",
    sizeUk: "6–8 учасників",
    facilitatorEn: "Dr. Sarah Whitfield",
    facilitatorUk: "Д-р Сара Вітфілд",
  },
  {
    emoji: "🗣️",
    nameEn: "Social Skills",
    nameUk: "Соціальні навички",
    descEn: "Build confidence in social situations and challenge unhelpful beliefs about yourself.",
    descUk: "Підвищуйте впевненість у соціальних ситуаціях та оскаржуйте непродуктивні переконання.",
    scheduleEn: "Thursdays, 5:30–7:00 PM",
    scheduleUk: "Четверги, 17:30–19:00",
    sizeEn: "5–7 participants",
    sizeUk: "5–7 учасників",
    facilitatorEn: "Dr. James Okoye",
    facilitatorUk: "Д-р Джеймс Окойє",
  },
  {
    emoji: "🧘",
    nameEn: "Mindfulness & CBT",
    nameUk: "Майндфулнес та КПТ",
    descEn: "Combine mindfulness practices with CBT techniques for sustained emotional wellbeing.",
    descUk: "Поєднайте практики усвідомленості з технікамиКПТ для стабільного емоційного добробуту.",
    scheduleEn: "Saturdays, 10:00–11:30 AM",
    scheduleUk: "Суботи, 10:00–11:30",
    sizeEn: "6–10 participants",
    sizeUk: "6–10 учасників",
    facilitatorEn: "Dr. Elena Marchetti",
    facilitatorUk: "Д-р Олена Марчетті",
  },
];

const RESOURCES = [
  {
    emoji: "📖",
    titleEn: "Anxiety Workbook",
    titleUk: "Робочий зошит з тривоги",
    descEn: "A guided 30-page CBT workbook with exercises to identify and challenge anxious thoughts.",
    descUk: "Керований 30-сторінковий робочий зошит КПТ з вправами для виявлення та оскарження тривожних думок.",
    typeEn: "PDF · 30 pages · Free",
    typeUk: "PDF · 30 сторінок · Безкоштовно",
  },
  {
    emoji: "🌬️",
    titleEn: "Breathing Exercise Guide",
    titleUk: "Посібник з дихальних вправ",
    descEn: "Six evidence-based breathing techniques for managing acute anxiety and panic.",
    descUk: "Шість науково обґрунтованих технік дихання для управління гострою тривогою та панікою.",
    typeEn: "PDF · 12 pages · Free",
    typeUk: "PDF · 12 сторінок · Безкоштовно",
  },
  {
    emoji: "✏️",
    titleEn: "Thought Journal Template",
    titleUk: "Шаблон журналу думок",
    descEn: "A structured daily thought record to track patterns, moods, and progress over time.",
    descUk: "Структурований щоденний запис думок для відстеження патернів, настрою та прогресу.",
    typeEn: "PDF · 8 pages · Free",
    typeUk: "PDF · 8 сторінок · Безкоштовно",
  },
];

const TESTIMONIALS = [
  {
    quoteEn: "CalmMind genuinely changed how I relate to my anxiety. I now have tools I can rely on every single day. I never thought therapy could be this practical.",
    quoteUk: "CalmMind справді змінив моє ставлення до тривоги. Тепер у мене є інструменти, на які я можу покладатися щодня.",
    authorEn: "Emma T., 34",
    authorUk: "Емма Т., 34 роки",
  },
  {
    quoteEn: "I was sceptical about CBT at first, but Dr. Okoye helped me understand the connection between my thoughts and feelings in a way that finally made sense.",
    quoteUk: "Спочатку я скептично ставився до КПТ, але д-р Окойє допоміг мені зрозуміти зв'язок між думками та почуттями.",
    authorEn: "Marcus L., 28",
    authorUk: "Маркус Л., 28 років",
  },
  {
    quoteEn: "The group sessions were unexpectedly healing. Realising I wasn't alone in my struggles made the whole process feel so much more manageable.",
    quoteUk: "Групові сесії виявилися несподівано зцілюючими. Розуміння, що я не одна у своїх труднощах, зробило весь процес більш керованим.",
    authorEn: "Priya N., 41",
    authorUk: "Прія Н., 41 рік",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function CalmMindDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  // GAD-7 state
  const [answers, setAnswers] = useState<(number | null)[]>(Array(7).fill(null));
  const [score, setScore] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Booking form state
  const [bookForm, setBookForm] = useState({
    name: "",
    email: "",
    phone: "",
    therapist: "",
    issue: "",
    preference: "",
    message: "",
  });
  const [bookSubmitted, setBookSubmitted] = useState(false);

  // Nav
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = isUk
    ? ["Про нас", "Послуги", "Терапевти", "Групи", "Ресурси", "Контакти"]
    : ["About", "Services", "Therapists", "Groups", "Resources", "Contact"];

  function handleAnswer(qIndex: number, value: number) {
    setAnswers((prev) => {
      const copy = [...prev];
      copy[qIndex] = value;
      return copy;
    });
    setShowResult(false);
  }

  function calculateScore() {
    const total = answers.reduce<number>((sum, a) => sum + (a ?? 0), 0);
    setScore(total);
    setShowResult(true);
  }

  const allAnswered = answers.every((a) => a !== null);

  function getInterpretation(s: number) {
    if (s <= 4)
      return {
        levelEn: "Minimal Anxiety",
        levelUk: "Мінімальна тривога",
        color: "bg-green-100 border-green-300 text-green-800",
        recEn: "Your anxiety levels appear minimal. Continue with self-care and healthy habits.",
        recUk: "Ваш рівень тривоги мінімальний. Продовжуйте практикувати самодогляд та здорові звички.",
      };
    if (s <= 9)
      return {
        levelEn: "Mild Anxiety",
        levelUk: "Легка тривога",
        color: "bg-sky-100 border-sky-300 text-sky-800",
        recEn: "Mild anxiety detected. Consider our free resources or a consultation with a therapist.",
        recUk: "Виявлено легку тривогу. Розгляньте наші безкоштовні ресурси або консультацію з терапевтом.",
      };
    if (s <= 14)
      return {
        levelEn: "Moderate Anxiety",
        levelUk: "Помірна тривога",
        color: "bg-amber-100 border-amber-300 text-amber-800",
        recEn: "Moderate anxiety. We recommend booking a consultation to discuss personalised support.",
        recUk: "Помірна тривога. Рекомендуємо записатися на консультацію для обговорення персоналізованої підтримки.",
      };
    return {
      levelEn: "Severe Anxiety",
      levelUk: "Виражена тривога",
      color: "bg-red-100 border-red-300 text-red-800",
      recEn: "Significant anxiety levels. Please reach out to a therapist soon — you deserve support.",
      recUk: "Значний рівень тривоги. Будь ласка, зверніться до терапевта — ви заслуговуєте на підтримку.",
    };
  }

  function handleBookSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBookSubmitted(true);
  }

  return (
    <div className="font-sans text-slate-700 bg-white min-h-screen">

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-sky-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <EmojiIcon emoji="🧠" className="w-7 h-7" />
            <div>
              <span className="font-bold text-slate-800 text-lg leading-tight">CalmMind</span>
              <p className="text-xs text-sky-600 leading-tight">
                {isUk ? "Центр КПТ терапії" : "CBT Therapy Center"}
              </p>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a key={link} href="#" className="text-sm text-slate-600 hover:text-sky-700 transition-colors">
                {link}
              </a>
            ))}
          </nav>

          <button className="hidden md:block bg-slate-700 hover:bg-slate-800 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors">
            {isUk ? "Записатись" : "Book Session"}
          </button>

          {/* Mobile burger */}
          <button
            className="md:hidden text-slate-600 text-xl"
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-neutral-800 border-t border-sky-100 px-4 py-3 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a key={link} href="#" className="text-sm text-slate-600 hover:text-sky-700">
                {link}
              </a>
            ))}
            <button className="mt-1 bg-slate-700 text-white text-sm font-medium px-4 py-2 rounded-full w-fit">
              {isUk ? "Записатись" : "Book Session"}
            </button>
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section className="bg-linear-to-br from-sky-100 via-sky-50 to-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-sky-100 text-sky-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 border border-sky-200">
            {isUk ? "Засновано на доказах · Акредитовано BABCP" : "Evidence-Based · BABCP Accredited"}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 leading-tight mb-5">
            {isUk ? "Знайдіть Свій Спокій" : "Find Your Inner Peace"}
          </h1>
          <p className="text-lg text-slate-600 max-w-xl mx-auto mb-8 leading-relaxed">
            {isUk
              ? "CalmMind — безпечний, підтримуючий простір, де науково обґрунтована когнітивно-поведінкова терапія допомагає вам жити повніше."
              : "CalmMind is a safe, supportive space where evidence-based Cognitive Behavioural Therapy helps you live more fully and freely."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-3 rounded-full transition-colors shadow-sm">
              {isUk ? "📅 Безкоштовна консультація" : "📅 Free Consultation"}
            </button>
            <button className="border border-slate-300 hover:border-sky-400 text-slate-700 hover:text-sky-700 font-medium px-6 py-3 rounded-full transition-colors">
              {isUk ? "ℹ️ Дізнатися про КПТ" : "ℹ️ Learn About CBT"}
            </button>
          </div>
        </div>
      </section>

      {/* ── What is CBT ── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-800 text-center mb-3">
            {isUk ? "Що таке КПТ?" : "What is CBT?"}
          </h2>
          <p className="text-center text-slate-500 mb-10 max-w-xl mx-auto text-sm">
            {isUk
              ? "Когнітивно-поведінкова терапія — один із найбільш досліджених підходів у психотерапії."
              : "Cognitive Behavioural Therapy is one of the most researched and effective forms of psychotherapy."}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                emoji: "🔍",
                titleEn: "Identify Thoughts",
                titleUk: "Визначте думки",
                descEn: "Recognise unhelpful thought patterns that affect your mood and behaviour.",
                descUk: "Розпізнайте непродуктивні патерни думок, що впливають на ваш настрій.",
              },
              {
                step: "2",
                emoji: "⚖️",
                titleEn: "Challenge Patterns",
                titleUk: "Оскаржте патерни",
                descEn: "Examine the evidence for and against your thoughts with your therapist.",
                descUk: "Разом з терапевтом вивчіть докази за і проти своїх думок.",
              },
              {
                step: "3",
                emoji: "🌱",
                titleEn: "Build New Habits",
                titleUk: "Формуйте нові звички",
                descEn: "Develop healthier thinking patterns and behaviours that last long-term.",
                descUk: "Розвивайте більш здорові моделі мислення та поведінки, які зберігаються довгостроково.",
              },
            ].map((item) => (
              <div key={item.step} className="bg-sky-50 border border-sky-100 rounded-2xl p-6 text-center">
                <div className="w-8 h-8 bg-sky-600 text-white text-sm font-bold rounded-full flex items-center justify-center mx-auto mb-3">
                  {item.step}
                </div>
                <div className="mb-2"><EmojiIcon emoji={item.emoji} className="w-8 h-8" /></div>
                <h3 className="font-semibold text-slate-800 mb-2">
                  {isUk ? item.titleUk : item.titleEn}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {isUk ? item.descUk : item.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-800 text-center mb-3">
            {isUk ? "Наші Послуги" : "Our Services"}
          </h2>
          <p className="text-center text-slate-500 mb-10 text-sm">
            {isUk ? "Комплексна підтримка для вашого психічного здоров'я" : "Comprehensive support for your mental wellbeing"}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((svc) => (
              <div key={svc.nameEn} className={`border rounded-2xl p-5 ${svc.color}`}>
                <div className="mb-3"><EmojiIcon emoji={svc.emoji} className="w-8 h-8" /></div>
                <h3 className="font-semibold text-slate-800 mb-1">
                  {isUk ? svc.nameUk : svc.nameEn}
                </h3>
                <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                  {isUk ? svc.descUk : svc.descEn}
                </p>
                <div className="flex items-center justify-between text-xs text-slate-500 border-t border-white/60 pt-3">
                  <span>⏱ {svc.duration}</span>
                  <span className="font-semibold text-slate-700">{isUk ? "від " : "from "}{svc.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GAD-7 Self-Assessment ── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-3 border border-green-200">
              {isUk ? "Безкоштовно · Анонімно" : "Free · Anonymous"}
            </span>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              {isUk ? "Оцінка тривоги GAD-7" : "GAD-7 Anxiety Self-Assessment"}
            </h2>
            <p className="text-slate-500 text-sm">
              {isUk
                ? "Як часто вас турбували наступні проблеми протягом останніх 2 тижнів?"
                : "Over the last 2 weeks, how often have you been bothered by the following problems?"}
            </p>
          </div>

          <div className="bg-sky-50 border border-sky-100 rounded-2xl p-6 space-y-6">
            {GAD7_QUESTIONS.map((q, qi) => (
              <div key={qi}>
                <p className="text-sm font-medium text-slate-700 mb-3">
                  {qi + 1}. {isUk ? q.uk : q.en}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {GAD7_OPTIONS.map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex flex-col items-center text-center cursor-pointer rounded-xl border p-2 transition-colors text-xs ${
                        answers[qi] === opt.value
                          ? "bg-sky-600 border-sky-600 text-white"
                          : "bg-white border-slate-200 text-slate-600 hover:border-sky-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`gad7-${qi}`}
                        value={opt.value}
                        checked={answers[qi] === opt.value}
                        onChange={() => handleAnswer(qi, opt.value)}
                        className="sr-only"
                      />
                      <span className="font-medium leading-tight">{isUk ? opt.labelUk : opt.labelEn}</span>
                      <span className="text-[10px] mt-0.5 opacity-70">{opt.value}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <button
              onClick={calculateScore}
              disabled={!allAnswered}
              className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors ${
                allAnswered
                  ? "bg-sky-600 hover:bg-sky-700 text-white"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              {isUk ? "Розрахувати результат" : "Calculate Score"}
            </button>

            {showResult && score !== null && (() => {
              const interp = getInterpretation(score);
              return (
                <div className={`border rounded-xl p-4 ${interp.color}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-lg">{isUk ? "Результат: " : "Score: "}{score}/21</span>
                    <span className="font-semibold text-sm">{isUk ? interp.levelUk : interp.levelEn}</span>
                  </div>
                  <p className="text-sm leading-relaxed">{isUk ? interp.recUk : interp.recEn}</p>
                  <div className="mt-3 pt-3 border-t border-current/20 text-xs opacity-70 italic">
                    {isUk
                      ? "⚠️ Це не клінічний діагноз. Будь ласка, зверніться до фахівця для повноцінної оцінки."
                      : "⚠️ This is not a clinical diagnosis. Please consult a professional for a full assessment."}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* ── Therapists ── */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-800 text-center mb-3">
            {isUk ? "Наші Терапевти" : "Our Therapists"}
          </h2>
          <p className="text-center text-slate-500 mb-10 text-sm">
            {isUk ? "Акредитовані, досвідчені та щиро турботливі" : "Accredited, experienced, and genuinely caring"}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {THERAPISTS.map((t) => (
              <div key={t.nameEn} className="bg-white border border-sky-100 rounded-2xl p-6 shadow-sm">
                <div className="text-center mb-3"><EmojiIcon emoji={t.emoji} className="w-14 h-14" /></div>
                <div className="text-center mb-3">
                  <h3 className="font-bold text-slate-800">{isUk ? t.nameUk : t.nameEn}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-snug">
                    {isUk ? t.credentialsUk : t.credentialsEn}
                  </p>
                </div>
                <div className="mb-3">
                  <p className="text-xs text-slate-400 font-medium uppercase mb-1">
                    {isUk ? "Спеціалізація" : "Specialisations"}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {(isUk ? t.specUk : t.specEn).map((s) => (
                      <span key={s} className="bg-sky-50 border border-sky-200 text-sky-700 text-xs px-2 py-0.5 rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-500 mb-3">
                  🌐 {isUk ? t.languagesUk : t.languagesEn}
                </p>
                <div className={`text-center text-xs font-semibold py-1.5 rounded-full ${t.accepting ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                  {t.accepting
                    ? (isUk ? "✅ Приймає нових клієнтів" : "✅ Accepting new clients")
                    : (isUk ? "⏳ Черга на очікуванні" : "⏳ Waitlist only")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Group Therapy ── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-800 text-center mb-3">
            {isUk ? "Групова Терапія" : "Group Therapy"}
          </h2>
          <p className="text-center text-slate-500 mb-10 text-sm max-w-xl mx-auto">
            {isUk
              ? "Почуйте, що ви не одні. Наші малі групи пропонують підтримку, структуру та спільноту."
              : "Hear that you're not alone. Our small groups offer support, structure, and community."}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {GROUPS.map((g) => (
              <div key={g.nameEn} className="bg-teal-50 border border-teal-100 rounded-2xl p-6">
                <div className="mb-3"><EmojiIcon emoji={g.emoji} className="w-8 h-8" /></div>
                <h3 className="font-semibold text-slate-800 mb-2">{isUk ? g.nameUk : g.nameEn}</h3>
                <p className="text-sm text-slate-500 mb-4 leading-relaxed">{isUk ? g.descUk : g.descEn}</p>
                <div className="space-y-1 text-xs text-slate-500 border-t border-teal-200 pt-3">
                  <p>🗓 {isUk ? g.scheduleUk : g.scheduleEn}</p>
                  <p>👥 {isUk ? g.sizeUk : g.sizeEn}</p>
                  <p>🎓 {isUk ? g.facilitatorUk : g.facilitatorEn}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Resources ── */}
      <section className="py-16 px-4 bg-sky-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-800 text-center mb-3">
            {isUk ? "Безкоштовні Ресурси" : "Free Resources"}
          </h2>
          <p className="text-center text-slate-500 mb-10 text-sm">
            {isUk ? "Завантажте безкоштовно — без реєстрації" : "Download for free — no sign-up required"}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {RESOURCES.map((r) => (
              <div key={r.titleEn} className="bg-white border border-sky-100 rounded-2xl p-6 shadow-sm flex flex-col">
                <div className="mb-3"><EmojiIcon emoji={r.emoji} className="w-10 h-10" /></div>
                <h3 className="font-semibold text-slate-800 mb-2">{isUk ? r.titleUk : r.titleEn}</h3>
                <p className="text-sm text-slate-500 mb-4 leading-relaxed flex-1">{isUk ? r.descUk : r.descEn}</p>
                <div className="text-xs text-slate-400 mb-3">{isUk ? r.typeUk : r.typeEn}</div>
                <button className="w-full border border-sky-300 hover:bg-sky-50 text-sky-700 text-sm font-medium py-2 rounded-xl transition-colors">
                  ⬇️ {isUk ? "Завантажити" : "Download"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-800 text-center mb-3">
            {isUk ? "Відгуки Клієнтів" : "Client Stories"}
          </h2>
          <p className="text-center text-slate-500 mb-10 text-sm">
            {isUk ? "Анонімно, з дозволу клієнтів" : "Shared anonymously with client permission"}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                <p className="text-3xl text-sky-200 font-serif leading-none mb-3">"</p>
                <p className="text-sm text-slate-600 leading-relaxed mb-4 italic">
                  {isUk ? t.quoteUk : t.quoteEn}
                </p>
                <p className="text-xs text-slate-400 font-medium">— {isUk ? t.authorUk : t.authorEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Booking Form ── */}
      <section className="py-16 px-4 bg-sky-50">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-800 text-center mb-3">
            {isUk ? "Записатись на Сесію" : "Book a Session"}
          </h2>
          <p className="text-center text-slate-500 mb-8 text-sm">
            {isUk
              ? "Перша консультація безкоштовна. Ми відповімо протягом 24 годин."
              : "First consultation is free. We'll respond within 24 hours."}
          </p>

          {bookSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
              <div className="mb-3"><EmojiIcon emoji="🌿" className="w-10 h-10" /></div>
              <h3 className="font-bold text-green-800 text-lg mb-2">
                {isUk ? "Дякуємо!" : "Thank you!"}
              </h3>
              <p className="text-green-700 text-sm">
                {isUk
                  ? "Ваш запит отримано. Ми зв'яжемося з вами протягом 24 годин, щоб підтвердити вашу сесію."
                  : "Your request has been received. We'll be in touch within 24 hours to confirm your session."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleBookSubmit} className="bg-white border border-sky-100 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    {isUk ? "Ваше ім'я" : "Your Name"} *
                  </label>
                  <input
                    type="text"
                    required
                    value={bookForm.name}
                    onChange={(e) => setBookForm({ ...bookForm, name: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-sky-400"
                    placeholder={isUk ? "Ваше ім'я" : "Jane Smith"}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    {isUk ? "Електронна пошта" : "Email"} *
                  </label>
                  <input
                    type="email"
                    required
                    value={bookForm.email}
                    onChange={(e) => setBookForm({ ...bookForm, email: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-sky-400"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  {isUk ? "Телефон (необов'язково)" : "Phone (optional)"}
                </label>
                <input
                  type="tel"
                  value={bookForm.phone}
                  onChange={(e) => setBookForm({ ...bookForm, phone: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-sky-400"
                  placeholder="+44 7700 000000"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  {isUk ? "Бажаний терапевт" : "Preferred Therapist"}
                </label>
                <select
                  value={bookForm.therapist}
                  onChange={(e) => setBookForm({ ...bookForm, therapist: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-sky-400 bg-white"
                >
                  <option value="">{isUk ? "Немає переваги" : "No preference"}</option>
                  <option value="whitfield">{isUk ? "Д-р Сара Вітфілд" : "Dr. Sarah Whitfield"}</option>
                  <option value="okoye">{isUk ? "Д-р Джеймс Окойє" : "Dr. James Okoye"}</option>
                  <option value="marchetti">{isUk ? "Д-р Олена Марчетті (лист очікування)" : "Dr. Elena Marchetti (waitlist)"}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  {isUk ? "Що вас турбує?" : "Main area of concern?"}
                </label>
                <select
                  value={bookForm.issue}
                  onChange={(e) => setBookForm({ ...bookForm, issue: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-sky-400 bg-white"
                >
                  <option value="">{isUk ? "Оберіть..." : "Select..."}</option>
                  {["Anxiety / Тривога", "Depression / Депресія", "Trauma / Травма", "Relationships / Стосунки", "OCD / ОКР", "Other / Інше"].map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-2">
                  {isUk ? "Формат сесій" : "Session preference"}
                </label>
                <div className="flex gap-3">
                  {[
                    { val: "online", labelEn: "💻 Online", labelUk: "💻 Онлайн" },
                    { val: "in-person", labelEn: "🏢 In-person", labelUk: "🏢 Очно" },
                    { val: "either", labelEn: "🔄 Either", labelUk: "🔄 Будь-який" },
                  ].map((opt) => (
                    <label
                      key={opt.val}
                      className={`flex-1 text-center cursor-pointer text-xs font-medium py-2 rounded-xl border transition-colors ${
                        bookForm.preference === opt.val
                          ? "bg-sky-600 border-sky-600 text-white"
                          : "border-slate-200 text-slate-600 hover:border-sky-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="preference"
                        value={opt.val}
                        checked={bookForm.preference === opt.val}
                        onChange={() => setBookForm({ ...bookForm, preference: opt.val })}
                        className="sr-only"
                      />
                      {isUk ? opt.labelUk : opt.labelEn}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  {isUk ? "Додаткове повідомлення (необов'язково)" : "Additional message (optional)"}
                </label>
                <textarea
                  rows={3}
                  value={bookForm.message}
                  onChange={(e) => setBookForm({ ...bookForm, message: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-sky-400 resize-none"
                  placeholder={isUk ? "Поділіться, якщо хочете..." : "Share anything you'd like us to know..."}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                {isUk ? "📅 Надіслати запит" : "📅 Send Request"}
              </button>

              <p className="text-xs text-center text-slate-400">
                {isUk
                  ? "🔒 Ваша інформація конфіденційна та захищена."
                  : "🔒 Your information is confidential and secure."}
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-slate-800 text-slate-300 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Crisis Banner */}
          <div className="bg-red-900/30 border border-red-700/40 rounded-xl p-4 mb-8 text-center">
            <p className="text-red-300 font-semibold text-sm mb-1">
              {isUk ? "🆘 У кризовій ситуації?" : "🆘 In a crisis?"}
            </p>
            <p className="text-white font-bold text-lg">
              {isUk ? "Лінія психологічної допомоги: 0-800-505-101" : "Crisis Line: 116 123 (Samaritans — free, 24/7)"}
            </p>
            <p className="text-slate-400 text-xs mt-1">
              {isUk
                ? "Якщо вашому життю загрожує небезпека, телефонуйте 112."
                : "If your life is in danger, call 999 or go to your nearest A&E."}
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <EmojiIcon emoji="🧠" className="w-7 h-7" />
                <span className="font-bold text-white text-lg">CalmMind</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isUk
                  ? "Акредитований центр когнітивно-поведінкової терапії. BABCP registered."
                  : "BABCP-accredited Cognitive Behavioural Therapy centre. Registered with BACP."}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white text-sm mb-3">
                {isUk ? "Контакти" : "Contact"}
              </h4>
              <ul className="space-y-1 text-xs text-slate-400">
                <li>📍 {isUk ? "вул. Спокою 12, Київ" : "12 Serenity Street, London EC1A 1BB"}</li>
                <li>📧 hello@calmmind.example</li>
                <li>📞 {isUk ? "+38 044 000 0000" : "+44 20 0000 0000"}</li>
                <li>🕐 {isUk ? "Пн–Пт 9:00–20:00, Сб 9:00–15:00" : "Mon–Fri 9am–8pm, Sat 9am–3pm"}</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white text-sm mb-3">
                {isUk ? "Послуги" : "Services"}
              </h4>
              <ul className="space-y-1 text-xs text-slate-400">
                {SERVICES.map((s) => (
                  <li key={s.nameEn}>
                    <a href="#" className="hover:text-sky-400 transition-colors">
                      {isUk ? s.nameUk : s.nameEn}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-6 text-center text-xs text-slate-500 space-y-1">
            <p>© 2025 CalmMind CBT Therapy Centre. {isUk ? "Всі права захищені." : "All rights reserved."}</p>
            <p className="italic">
              {isUk
                ? "⚠️ Цей веб-сайт не надає екстреної медичної допомоги. За кризою зверніться на гарячу лінію або до служби швидкої допомоги."
                : "⚠️ This website does not provide emergency services. In a mental health crisis, contact a crisis line or emergency services."}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
