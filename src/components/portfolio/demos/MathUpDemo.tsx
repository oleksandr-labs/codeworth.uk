"use client";

import { useState } from "react";
import Link from "next/link";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

interface Props { lang: string; }

export function MathUpDemo({ lang }: Props) {
  const isUk = lang === "uk";
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formGrade, setFormGrade] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formName && formPhone) setSubmitted(true);
  };

  const courses = isUk
    ? [
        {
          grade: "5–6 клас",
          title: "Математика: основи",
          topics: ["Дроби та відсотки", "Рівняння першого ступеня", "Геометричні фігури", "Координатна площина"],
          duration: "8 місяців",
          price: "1 200 ₴/міс",
          color: "from-sky-400 to-blue-500",
          icon: "📐",
          badge: null,
        },
        {
          grade: "7–9 клас",
          title: "Алгебра і геометрія",
          topics: ["Квадратні рівняння", "Функції та графіки", "Тригонометрія", "Теорема Піфагора"],
          duration: "10 місяців",
          price: "1 400 ₴/міс",
          color: "from-blue-500 to-indigo-600",
          icon: "📊",
          badge: "Найпопулярніший",
        },
        {
          grade: "10–11 клас",
          title: "Підготовка до НМТ",
          topics: ["Всі теми НМТ систематично", "Тести у форматі НМТ", "Розбір типових помилок", "Інтенсив перед іспитом"],
          duration: "12 місяців",
          price: "1 800 ₴/міс",
          color: "from-indigo-500 to-violet-600",
          icon: "🏆",
          badge: null,
        },
      ]
    : [
        {
          grade: "Grades 5–6",
          title: "Math Fundamentals",
          topics: ["Fractions & percentages", "Linear equations", "Geometric shapes", "Coordinate plane"],
          duration: "8 months",
          price: "$35 / mo",
          color: "from-sky-400 to-blue-500",
          icon: "📐",
          badge: null,
        },
        {
          grade: "Grades 7–9",
          title: "Algebra & Geometry",
          topics: ["Quadratic equations", "Functions & graphs", "Trigonometry", "Pythagorean theorem"],
          duration: "10 months",
          price: "$40 / mo",
          color: "from-blue-500 to-indigo-600",
          icon: "📊",
          badge: "Most Popular",
        },
        {
          grade: "Grades 10–11",
          title: "Exam Prep",
          topics: ["Full NMT / SAT curriculum", "Practice tests in exam format", "Common mistake breakdowns", "Pre-exam intensive"],
          duration: "12 months",
          price: "$50 / mo",
          color: "from-indigo-500 to-violet-600",
          icon: "🏆",
          badge: null,
        },
      ];

  const teachers = isUk
    ? [
        {
          name: "Олена Приходько",
          title: "Викладач математики",
          exp: "11 років досвіду",
          degree: "Кандидат педагогічних наук",
          result: "94% учнів склали НМТ на 170+ балів",
          emoji: "👩‍🏫",
          color: "bg-blue-50 dark:bg-blue-950/30",
        },
        {
          name: "Максим Бойченко",
          title: "Викладач алгебри",
          exp: "8 років досвіду",
          degree: "Математичний факультет КНУ",
          result: "Переможець олімпіад. 40+ учнів-олімпіадників",
          emoji: "👨‍💻",
          color: "bg-indigo-50 dark:bg-indigo-950/30",
        },
        {
          name: "Наталя Коваль",
          title: "Викладач геометрії",
          exp: "13 років досвіду",
          degree: "МОН-сертифікований педагог",
          result: "Авторські методики візуального розуміння геометрії",
          emoji: "👩‍🔬",
          color: "bg-violet-50 dark:bg-violet-950/30",
        },
      ]
    : [
        {
          name: "Olena Prykhodko",
          title: "Math Teacher",
          exp: "11 years of experience",
          degree: "PhD in Pedagogy",
          result: "94% of students scored 170+ on NMT",
          emoji: "👩‍🏫",
          color: "bg-blue-50 dark:bg-blue-950/30",
        },
        {
          name: "Maksym Boichenko",
          title: "Algebra Teacher",
          exp: "8 years of experience",
          degree: "Mathematics, Kyiv National University",
          result: "Olympiad winner. 40+ student olympiad participants",
          emoji: "👨‍💻",
          color: "bg-indigo-50 dark:bg-indigo-950/30",
        },
        {
          name: "Natalia Koval",
          title: "Geometry Teacher",
          exp: "13 years of experience",
          degree: "Ministry of Education certified teacher",
          result: "Original visual methods for geometry comprehension",
          emoji: "👩‍🔬",
          color: "bg-violet-50 dark:bg-violet-950/30",
        },
      ];

  const results = isUk
    ? [
        { name: "Дарина К.", grade: "11 клас", before: 112, after: 186, subject: "НМТ Математика", emoji: "⭐" },
        { name: "Богдан М.", grade: "10 клас", before: 95, after: 174, subject: "НМТ Математика", emoji: "🏆" },
        { name: "Аліна Т.", grade: "9 клас", before: "3", after: "10", subject: "Річна оцінка", emoji: "📈" },
        { name: "Стас В.", grade: "7 клас", before: "4", after: "12", subject: "Оцінка у семестрі", emoji: "🎯" },
      ]
    : [
        { name: "Daryna K.", grade: "Grade 11", before: 112, after: 186, subject: "NMT Mathematics", emoji: "⭐" },
        { name: "Bohdan M.", grade: "Grade 10", before: 95, after: 174, subject: "NMT Mathematics", emoji: "🏆" },
        { name: "Alina T.", grade: "Grade 9", before: "3", after: "10", subject: "Annual grade", emoji: "📈" },
        { name: "Stas V.", grade: "Grade 7", before: "4", after: "12", subject: "Semester grade", emoji: "🎯" },
      ];

  const howItWorks = isUk
    ? [
        { step: "01", title: "Безкоштовний урок", desc: "Знайомство з викладачем, оцінка рівня знань, формування індивідуального плану навчання.", icon: "🎯" },
        { step: "02", title: "Онлайн-заняття", desc: "60 хвилин 2 рази на тиждень на платформі Zoom з інтерактивною дошкою та записом уроку.", icon: "🖥️" },
        { step: "03", title: "Домашні завдання", desc: "Завдання в особистому кабінеті з автоматичною перевіркою та детальними поясненнями.", icon: "📝" },
        { step: "04", title: "Звіт і результат", desc: "Щомісячний звіт прогресу для батьків. Підготовка до контрольних та ДПА/НМТ.", icon: "📈" },
      ]
    : [
        { step: "01", title: "Free Trial Lesson", desc: "Meet your teacher, assess your current level, and build a personalised study plan.", icon: "🎯" },
        { step: "02", title: "Online Classes", desc: "60-minute sessions twice a week on Zoom with an interactive whiteboard and lesson recording.", icon: "🖥️" },
        { step: "03", title: "Homework", desc: "Assignments in your personal dashboard with automatic grading and detailed explanations.", icon: "📝" },
        { step: "04", title: "Progress Report", desc: "Monthly progress reports for parents. Ongoing preparation for tests, finals, and NMT.", icon: "📈" },
      ];

  const faqs = isUk
    ? [
        { q: "Скільки учнів у групі?", a: "Групи до 4 учнів або індивідуальні заняття. Мінімум уваги від викладача — максимум результату." },
        { q: "Що якщо пропустили урок?", a: "Кожен урок записується. Запис доступний в особистому кабінеті протягом 30 днів." },
        { q: "Як записатись на пробний урок?", a: "Залишіть заявку — ми зв'яжемось протягом 2 годин та оберемо зручний час. Пробний урок безкоштовний." },
        { q: "Чи можна змінити викладача?", a: "Так, без доплат та пояснень. Нам важливо щоб учень та викладач знайшли спільну мову." },
        { q: "Як відбувається оплата?", a: "Щомісяця на початку місяця. Картка, PrivatBank, Monobank. Знижка 10% при оплаті за семестр одразу." },
        { q: "Є гарантія результату?", a: "Якщо після 3 місяців регулярних занять оцінка не покращилась — ми повернемо оплату за останній місяць." },
      ]
    : [
        { q: "How many students per group?", a: "Groups of up to 4 students, or individual one-on-one sessions. Less crowd, more attention — better results." },
        { q: "What if we miss a lesson?", a: "Every lesson is recorded. Recordings are available in the student dashboard for 30 days." },
        { q: "How do I sign up for a trial lesson?", a: "Submit the form — we'll contact you within 2 hours and find a convenient time. The trial is completely free." },
        { q: "Can we change teachers?", a: "Yes, at any time and at no extra cost. We just want the student and teacher to work well together." },
        { q: "How does payment work?", a: "Monthly, at the start of each month. Card, PayPal, or bank transfer. 10% discount for a full semester paid upfront." },
        { q: "Is there a results guarantee?", a: "If grades haven't improved after 3 months of regular lessons, we'll refund the last month's payment." },
      ];

  const testimonials = isUk
    ? [
        { name: "Тетяна В.", role: "Мама Даші, 9 клас", text: "Донька боялась математики з 6 класу. За 4 місяці — 9 у семестрі. Викладач пояснює так, що все стає зрозумілим." },
        { name: "Олексій К.", role: "Учень, 11 клас", text: "Склав НМТ на 186 балів. Без MathUp і близько б не підійшов до такого результату. Дякую Олені Іванівні!" },
        { name: "Марина П.", role: "Мама Артема, 7 клас", text: "Зручно, що уроки записуються. Якщо пропустили — подивились запис. Прогрес видно вже через 2 місяці." },
        { name: "Ірина Б.", role: "Мама Аліни, 10 клас", text: "Мала 5 по математиці. Зараз готується до НМТ, не боїться, розуміє. Ціна за результат — справедлива." },
        { name: "Дмитро Ф.", role: "Учень, 10 клас", text: "Груп до 4 учнів — це дуже важливо. Встигаєш поставити всі питання, не соромишся, отримуєш увагу." },
        { name: "Наталя Г.", role: "Мама Богдана, 8 клас", text: "Перші 2 тижні були безкоштовно — побачили результат і одразу продовжили. Рекомендую всім батькам." },
      ]
    : [
        { name: "Tetiana V.", role: "Dasha's mom, Grade 9", text: "My daughter was afraid of maths since Grade 6. Four months in and she got a 9 for the semester. The teacher explains things so clearly." },
        { name: "Oleksii K.", role: "Student, Grade 11", text: "I scored 186 on the NMT. I wouldn't have come close to that without MathUp. Thank you, Olena!" },
        { name: "Maryna P.", role: "Artem's mom, Grade 7", text: "Having every lesson recorded is a lifesaver. If we miss one, we just watch it back. Progress is visible within 2 months." },
        { name: "Iryna B.", role: "Alina's mom, Grade 10", text: "She had a 5 in maths. Now she's preparing for NMT without fear. The value for money is excellent." },
        { name: "Dmytro F.", role: "Student, Grade 10", text: "Max 4 students per group really matters. You can ask every question without embarrassment and get real attention." },
        { name: "Natalia H.", role: "Bohdan's mom, Grade 8", text: "The first two weeks were free — we saw results straight away and continued without hesitation. Highly recommended." },
      ];

  const forWhom = isUk
    ? [
        { icon: "😰", title: "Відстають від класу", desc: "Незрозумілі теми накопичились. Допоможемо закрити прогалини та наздогнати клас." },
        { icon: "📉", title: "Погані оцінки", desc: "Трійки в щоденнику. Системний підхід, домашні завдання та контроль батьків." },
        { icon: "🎯", title: "Готуються до НМТ", desc: "10–11 клас. Весь курс НМТ + тренувальні тести у форматі іспиту." },
        { icon: "🏅", title: "Хочуть більше 10", desc: "Вже розуміють математику та хочуть поглибити знання або брати участь в олімпіадах." },
      ]
    : [
        { icon: "😰", title: "Falling behind", desc: "Topics have piled up. We'll close the gaps and help catch up with the class." },
        { icon: "📉", title: "Poor grades", desc: "Cs and Ds in the diary. Systematic approach, homework, and parent progress tracking." },
        { icon: "🎯", title: "Preparing for exams", desc: "Grades 10–11. Full NMT/SAT curriculum plus practice tests in exam format." },
        { icon: "🏅", title: "Aiming for top marks", desc: "Already understands maths and wants to go deeper or compete in olympiads." },
      ];

  const comparisonRows = isUk
    ? [
        { feature: "Розмір групи", mathup: "до 4 учнів", tutor: "1 учень", school: "25–30 учнів" },
        { feature: "Запис уроків", mathup: "✓ 30 днів", tutor: "✗", school: "✗" },
        { feature: "Домашнє завдання + перевірка", mathup: "✓ онлайн-кабінет", tutor: "часто без перевірки", school: "ДЗ без пояснень" },
        { feature: "Звіт для батьків", mathup: "✓ щомісяця", tutor: "✗ зазвичай нема", school: "✗ лише оцінки" },
        { feature: "Підготовка до НМТ", mathup: "✓ спеціальний курс", tutor: "залежить від репетитора", school: "загальна програма" },
        { feature: "Ціна", mathup: "від 1 200 ₴/міс", tutor: "від 300 ₴/урок", school: "безкоштовно / без результату" },
      ]
    : [
        { feature: "Class size", mathup: "up to 4 students", tutor: "1 student", school: "25–30 students" },
        { feature: "Lesson recordings", mathup: "✓ 30 days", tutor: "✗", school: "✗" },
        { feature: "Homework + grading", mathup: "✓ online dashboard", tutor: "often ungraded", school: "homework, no explanations" },
        { feature: "Parent progress report", mathup: "✓ monthly", tutor: "✗ usually none", school: "✗ grades only" },
        { feature: "Exam prep", mathup: "✓ dedicated course", tutor: "depends on tutor", school: "general curriculum" },
        { feature: "Price", mathup: "from $35 / mo", tutor: "from $8 / lesson", school: "free / slow progress" },
      ];

  const gradeOptions = isUk
    ? ["5 клас", "6 клас", "7 клас", "8 клас", "9 клас", "10 клас", "11 клас"]
    : ["Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11"];

  const heroCard = isUk
    ? {
        title: "Безкоштовний пробний урок",
        subtitle: "Без зобов'язань. Онлайн через Zoom.",
        checklist: ["Оцінимо рівень знань", "Познайомимо з викладачем", "Складемо план навчання", "Відповімо на запитання батьків"],
        badge: "Записались 12 учнів цього тижня",
      }
    : {
        title: "Free Trial Lesson",
        subtitle: "No commitment. Online via Zoom.",
        checklist: ["Assess your current level", "Meet your teacher", "Build a study plan", "Answer all parent questions"],
        badge: "12 students enrolled this week",
      };

  const stats = isUk
    ? [
        { val: "500+", label: "учнів навчаються" },
        { val: "94%", label: "покращили оцінку" },
        { val: "4.9★", label: "середня оцінка" },
      ]
    : [
        { val: "500+", label: "active students" },
        { val: "94%", label: "improved their grade" },
        { val: "4.9★", label: "average rating" },
      ];

  const resultStats = isUk
    ? [
        { val: "94%", label: "покращили оцінку", color: "text-blue-600" },
        { val: "+68", label: "балів середній приріст НМТ", color: "text-indigo-600" },
        { val: "500+", label: "учнів пройшли курс", color: "text-violet-600" },
        { val: "3 міс", label: "до першого результату", color: "text-sky-600" },
      ]
    : [
        { val: "94%", label: "improved their grade", color: "text-blue-600" },
        { val: "+68", label: "avg NMT score increase", color: "text-indigo-600" },
        { val: "500+", label: "students completed a course", color: "text-violet-600" },
        { val: "3 mo", label: "to first visible result", color: "text-sky-600" },
      ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ── Nav ─────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <EmojiIcon emoji="📐" className="w-7 h-7" />
            <span className="font-extrabold text-xl text-slate-900 tracking-tight">Math<span className="text-blue-600">Up</span></span>
          </div>
          <div className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a href="#courses" className="hover:text-blue-600 transition-colors">{isUk ? "Курси" : "Courses"}</a>
            <a href="#compare" className="hover:text-blue-600 transition-colors">{isUk ? "Порівняння" : "Compare"}</a>
            <a href="#teachers" className="hover:text-blue-600 transition-colors">{isUk ? "Викладачі" : "Teachers"}</a>
            <a href="#results" className="hover:text-blue-600 transition-colors">{isUk ? "Результати" : "Results"}</a>
            <a href="#faq" className="hover:text-blue-600 transition-colors">FAQ</a>
          </div>
          <a
            href="#trial"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-md shadow-blue-500/20"
          >
            {isUk ? "Безкоштовний урок" : "Free Lesson"}
          </a>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-linear-to-br from-slate-900 via-blue-950 to-indigo-900 pt-20 pb-24 md:pt-28 md:pb-32">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(#60a5fa 1px, transparent 1px), linear-gradient(90deg, #60a5fa 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {["π", "∑", "√", "∫", "∞", "²", "x²", "Δ"].map((sym, i) => (
          <span
            key={sym}
            className="absolute text-blue-400/20 font-mono font-bold select-none pointer-events-none"
            style={{
              fontSize: `${1.5 + (i % 3) * 0.8}rem`,
              top: `${10 + (i * 11) % 70}%`,
              left: `${5 + (i * 13) % 90}%`,
            }}
          >
            {sym}
          </span>
        ))}

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-1.5 text-blue-300 text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                {isUk ? "Набір відкрито — стартуємо у вересні" : "Enrollment open — starting in September"}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                {isUk ? (
                  <>Математика від{" "}<span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">5 до 11 класу</span>{" "}онлайн</>
                ) : (
                  <>Math tutoring{" "}<span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">grades 5–11</span>{" "}online</>
                )}
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-lg">
                {isUk
                  ? "Зрозумілі пояснення, маленькі групи до 4 учнів, записи уроків. 94% учнів покращили оцінку за перші 3 місяці."
                  : "Clear explanations, small groups of up to 4 students, lesson recordings. 94% of students improve their grade within 3 months."}
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <a
                  href="#trial"
                  className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-bold px-7 py-4 rounded-2xl text-base transition-colors shadow-xl shadow-blue-500/30"
                >
                  <EmojiIcon emoji="🎯" className="w-4 h-4 inline-block align-middle mr-1" />{isUk ? "Записатись на безкоштовний урок" : "Book a free lesson"}
                </a>
                <a
                  href="#courses"
                  className="inline-flex items-center gap-2 border border-white/20 text-white/80 hover:text-white hover:bg-white/5 font-semibold px-7 py-4 rounded-2xl text-base transition-colors"
                >
                  {isUk ? "Переглянути курси →" : "View courses →"}
                </a>
              </div>
              <div className="flex flex-wrap gap-6">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-extrabold text-white">{s.val}</div>
                    <div className="text-sm text-slate-400">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero card */}
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8">
                <div className="text-center mb-6">
                  <div className="mb-3"><EmojiIcon emoji="📊" className="w-14 h-14" /></div>
                  <div className="text-white font-bold text-xl mb-1">{heroCard.title}</div>
                  <div className="text-slate-300 text-sm">{heroCard.subtitle}</div>
                </div>
                <div className="space-y-3 mb-6">
                  {heroCard.checklist.map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-slate-200">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
                <div className="text-center text-blue-300 text-xs">✦ {heroCard.badge}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── For Whom ────────────────────────────────────────── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
              {isUk ? "Для кого підходить MathUp?" : "Who is MathUp for?"}
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              {isUk
                ? "Ми працюємо з учнями будь-якого рівня — від прогалин у базі до олімпіадної підготовки"
                : "We work with students of all levels — from filling knowledge gaps to olympiad preparation"}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {forWhom.map((card) => (
              <div key={card.title} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4"><EmojiIcon emoji={card.icon} className="w-10 h-10" /></div>
                <h3 className="font-bold text-slate-900 mb-2 text-base">{card.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────── */}
      <section className="py-16 bg-white dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
              {isUk ? "Як проходить навчання" : "How it works"}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step) => (
              <div key={step.step} className="relative">
                <div className="bg-blue-600 w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm mb-4">
                  {step.step}
                </div>
                <div className="mb-3"><EmojiIcon emoji={step.icon} className="w-7 h-7" /></div>
                <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison ──────────────────────────────────────── */}
      <section id="compare" className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
              {isUk ? "MathUp vs. репетитор vs. школа" : "MathUp vs. private tutor vs. school"}
            </h2>
            <p className="text-slate-500">
              {isUk ? "Чому тисячі сімей обирають онлайн-формат" : "Why thousands of families choose the online format"}
            </p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-100 text-left">
                  <th className="px-5 py-4 font-semibold text-slate-600 w-1/4">{isUk ? "Критерій" : "Feature"}</th>
                  <th className="px-5 py-4 font-bold text-blue-700 bg-blue-50 text-center">MathUp</th>
                  <th className="px-5 py-4 font-semibold text-slate-600 text-center">{isUk ? "Репетитор" : "Private tutor"}</th>
                  <th className="px-5 py-4 font-semibold text-slate-600 text-center">{isUk ? "Школа" : "School"}</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <td className="px-5 py-3.5 font-medium text-slate-700">{row.feature}</td>
                    <td className="px-5 py-3.5 text-center font-semibold text-blue-700 bg-blue-50/60">{row.mathup}</td>
                    <td className="px-5 py-3.5 text-center text-slate-500">{row.tutor}</td>
                    <td className="px-5 py-3.5 text-center text-slate-500">{row.school}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Courses ─────────────────────────────────────────── */}
      <section id="courses" className="py-20 bg-white dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
              {isUk ? "Наші курси" : "Our courses"}
            </h2>
            <p className="text-slate-500">
              {isUk
                ? "Програма відповідає шкільному курсу та вимогам НМТ/ДПА"
                : "Curriculum aligned with the school syllabus and NMT/exam requirements"}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.grade}
                className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className={`h-32 bg-linear-to-br ${course.color} flex items-center justify-between px-6`}>
                  <div>
                    <div className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-1">{course.grade}</div>
                    <div className="text-white font-extrabold text-xl leading-tight">{course.title}</div>
                  </div>
                  <EmojiIcon emoji={course.icon} className="w-14 h-14 opacity-80" />
                </div>
                {course.badge && (
                  <div className="bg-blue-600 text-white text-xs font-bold text-center py-1.5 tracking-wide uppercase">
                    ⭐ {course.badge}
                  </div>
                )}
                <div className="p-6">
                  <ul className="space-y-2 mb-6">
                    {course.topics.map((topic) => (
                      <li key={topic} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="text-blue-500 mt-0.5">✓</span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div>
                      <div className="text-2xl font-extrabold text-blue-600">{course.price}</div>
                      <div className="text-xs text-slate-400">{course.duration}</div>
                    </div>
                    <a
                      href="#trial"
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
                    >
                      {isUk ? "Записатись" : "Enroll"}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="font-bold text-slate-900 mb-0.5">
                {isUk ? "Не знаєте який курс обрати?" : "Not sure which course to pick?"}
              </div>
              <div className="text-sm text-slate-500">
                {isUk
                  ? "Запишіться на безкоштовний урок — викладач оцінить рівень і порекомендує відповідний курс"
                  : "Book a free lesson — the teacher will assess your level and recommend the right course"}
              </div>
            </div>
            <a href="#trial" className="bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-blue-700 transition-colors shrink-0">
              {isUk ? "Безкоштовний урок" : "Free lesson"}
            </a>
          </div>
        </div>
      </section>

      {/* ── Results ─────────────────────────────────────────── */}
      <section id="results" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
              {isUk ? "Результати учнів" : "Student results"}
            </h2>
            <p className="text-slate-500">
              {isUk ? "Реальні досягнення за перший рік навчання" : "Real achievements after the first year of study"}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {resultStats.map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-5 text-center shadow-sm">
                <div className={`text-3xl font-extrabold mb-1 ${s.color}`}>{s.val}</div>
                <div className="text-xs text-slate-500 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {results.map((r) => (
              <div key={r.name} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <EmojiIcon emoji={r.emoji} className="w-5 h-5 inline-block align-middle" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{r.name}</div>
                    <div className="text-xs text-slate-400">{r.grade}</div>
                  </div>
                </div>
                <div className="text-xs text-slate-500 mb-3">{r.subject}</div>
                <div className="flex items-center gap-2">
                  <div className="text-center flex-1 bg-red-50 rounded-xl py-2">
                    <div className="text-lg font-extrabold text-red-500">{r.before}</div>
                    <div className="text-[10px] text-slate-400">{isUk ? "до" : "before"}</div>
                  </div>
                  <div className="text-slate-400 text-lg">→</div>
                  <div className="text-center flex-1 bg-green-50 rounded-xl py-2">
                    <div className="text-lg font-extrabold text-green-600">{r.after}</div>
                    <div className="text-[10px] text-slate-400">{isUk ? "після" : "after"}</div>
                  </div>
                </div>
              </div>
            ))}
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
            <p className="text-slate-500 max-w-md mx-auto">
              {isUk
                ? "Кожен викладач — практикуючий педагог з досвідом підготовки до НМТ"
                : "Each teacher is an experienced practitioner with a proven track record of exam prep"}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {teachers.map((t) => (
              <div key={t.name} className={`${t.color} rounded-3xl border border-slate-100 p-7`}>
                <div className="mb-4"><EmojiIcon emoji={t.emoji} className="w-14 h-14" /></div>
                <h3 className="font-extrabold text-slate-900 text-xl mb-0.5">{t.name}</h3>
                <div className="text-blue-600 font-semibold text-sm mb-1">{t.title}</div>
                <div className="text-slate-500 text-sm mb-1">{t.exp} · {t.degree}</div>
                <div className="mt-4 text-sm text-slate-700 border-t border-slate-200 pt-4 leading-relaxed">
                  💡 {t.result}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
              {isUk ? "Відгуки батьків та учнів" : "Reviews from parents & students"}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((rev) => (
              <div key={rev.name} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-amber-400 text-base">★</span>
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-4">"{rev.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-800 text-sm shrink-0">
                    {rev.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">{rev.name}</div>
                    <div className="text-xs text-slate-400">{rev.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Guarantee ───────────────────────────────────────── */}
      <section className="py-16 bg-linear-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="mb-5"><EmojiIcon emoji="🛡️" className="w-14 h-14" /></div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            {isUk ? "Гарантія результату" : "Results guarantee"}
          </h2>
          <p className="text-blue-100 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            {isUk
              ? "Якщо після 3 місяців регулярних занять оцінка вашої дитини не покращилась — ми повернемо оплату за останній місяць без зайвих питань."
              : "If your child's grade hasn't improved after 3 months of regular classes, we'll refund the last month's payment — no questions asked."}
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-white/90 text-sm">
            {(isUk
              ? ["✓ Безкоштовний пробний урок", "✓ Групи до 4 учнів", "✓ Записи уроків 30 днів", "✓ Зміна викладача безкоштовно"]
              : ["✓ Free trial lesson", "✓ Groups of up to 4 students", "✓ Lesson recordings for 30 days", "✓ Teacher change at no cost"]
            ).map((item) => (
              <span key={item} className="bg-white/15 rounded-full px-4 py-2">{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <section id="faq" className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
              {isUk ? "Часті запитання" : "Frequently asked questions"}
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                <button
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                >
                  <span className="font-semibold text-slate-900 text-sm">{faq.q}</span>
                  <span className={`text-blue-600 font-bold text-lg shrink-0 transition-transform ${activeFaq === i ? "rotate-45" : ""}`}>+</span>
                </button>
                {activeFaq === i && (
                  <div className="px-6 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trial form ──────────────────────────────────────── */}
      <section id="trial" className="py-20 bg-linear-to-br from-blue-600 to-indigo-700">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-white mb-3">
              {isUk ? "Запишіться на безкоштовний урок" : "Book your free lesson"}
            </h2>
            <p className="text-blue-100">
              {isUk
                ? "Без зобов'язань. Дізнайтесь рівень та що потрібно покращити."
                : "No commitment. Find out your level and what needs work."}
            </p>
          </div>
          {submitted ? (
            <div className="bg-white rounded-3xl p-10 text-center">
              <div className="mb-4"><EmojiIcon emoji="🎉" className="w-14 h-14" /></div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
                {isUk ? "Заявку отримано!" : "Request received!"}
              </h3>
              <p className="text-slate-500 text-sm">
                {isUk
                  ? "Зателефонуємо або напишемо протягом 2 годин, щоб обрати зручний час для безкоштовного уроку."
                  : "We'll call or message you within 2 hours to arrange a convenient time for your free lesson."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 space-y-4 shadow-2xl shadow-blue-900/30">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  {isUk ? "Ваше ім'я або ім'я дитини *" : "Your name or child's name *"}
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder={isUk ? "Наприклад: Аліна або Мама Аліни" : "e.g. Alina or Alina's mum"}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  {isUk ? "Телефон *" : "Phone *"}
                </label>
                <input
                  type="tel"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  placeholder={isUk ? "+380 __  ___  __ __" : "+1 (___) ___-____"}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  {isUk ? "Клас учня" : "Student's grade"}
                </label>
                <select
                  value={formGrade}
                  onChange={(e) => setFormGrade(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{isUk ? "Оберіть клас" : "Select grade"}</option>
                  {gradeOptions.map((g) => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-base transition-colors shadow-lg shadow-blue-500/30"
              >
                {isUk ? "Записатись на безкоштовний урок →" : "Book free lesson →"}
              </button>
              <p className="text-center text-xs text-slate-400">
                {isUk ? "Зателефонуємо протягом 2 годин в робочий час" : "We'll call within 2 hours during business hours"}
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
                <EmojiIcon emoji="📐" className="w-5 h-5" />
                <span className="font-extrabold text-white text-lg">Math<span className="text-blue-400">Up</span></span>
              </div>
              <p className="text-sm leading-relaxed mb-5">
                {isUk
                  ? "Онлайн-школа математики для учнів 5–11 класу. Маленькі групи, записи уроків, гарантія результату."
                  : "Online maths school for students in grades 5–11. Small groups, lesson recordings, results guarantee."}
              </p>
              <div className="space-y-1.5 text-sm">
                <a href="tel:+380501234567" className="flex items-center gap-2 hover:text-white transition-colors">
                  <EmojiIcon emoji="📞" className="w-4 h-4 inline-block align-middle mr-1 text-blue-500" /> +38 050 123 45 67
                </a>
                <a href="mailto:hello@mathup.ua" className="flex items-center gap-2 hover:text-white transition-colors">
                  <EmojiIcon emoji="✉️" className="w-4 h-4 inline-block align-middle mr-1 text-blue-500" /> hello@mathup.ua
                </a>
              </div>
            </div>
            {/* Navigation */}
            <div>
              <div className="font-semibold text-white text-sm mb-4">{isUk ? "Навігація" : "Navigation"}</div>
              <ul className="space-y-2.5 text-sm">
                {(isUk
                  ? [["#courses", "Курси"], ["#compare", "Порівняння"], ["#results", "Результати"], ["#teachers", "Викладачі"], ["#faq", "FAQ"], ["#trial", "Пробний урок"]]
                  : [["#courses", "Courses"], ["#compare", "Compare"], ["#results", "Results"], ["#teachers", "Teachers"], ["#faq", "FAQ"], ["#trial", "Free lesson"]]
                ).map(([href, label]) => (
                  <li key={href}><a href={href} className="hover:text-white transition-colors">{label}</a></li>
                ))}
              </ul>
            </div>
            {/* Schedule */}
            <div>
              <div className="font-semibold text-white text-sm mb-4">{isUk ? "Графік роботи" : "Working hours"}</div>
              <ul className="space-y-2.5 text-sm">
                <li>{isUk ? "Пн – Пт: 09:00 – 21:00" : "Mon – Fri: 9 AM – 9 PM"}</li>
                <li>{isUk ? "Сб – Нд: 10:00 – 18:00" : "Sat – Sun: 10 AM – 6 PM"}</li>
              </ul>
              <div className="mt-6">
                <div className="font-semibold text-white text-sm mb-3">{isUk ? "Ми в соціальних мережах" : "Follow us"}</div>
                <div className="flex gap-3">
                  {["Instagram", "YouTube", "Telegram"].map((s) => (
                    <span key={s} className="text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 cursor-pointer transition-colors">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span>© 2025 MathUp. {isUk ? "Всі права захищено." : "All rights reserved."}</span>
            <span className="text-slate-600">
              {isUk ? "Сайт розроблено студією" : "Website built by"}{" "}
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
