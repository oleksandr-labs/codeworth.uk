"use client";

import { useState } from "react";

// ─── SVG Icons ───────────────────────────────────────────────────────────────

function IconHeart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z" />
    </svg>
  );
}

function IconMicroscope({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 18H3a1 1 0 0 1-1-1v-1a4 4 0 0 1 4-4h12" />
      <path d="M14 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path d="M14 10v8" />
      <path d="M9 18h6" />
      <path d="M11 6h6" />
    </svg>
  );
}

function IconSyringe({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m18 2 4 4" />
      <path d="m17 7 3-3" />
      <path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5" />
      <path d="m9 11 4 4" />
      <path d="m5 19-3 3" />
      <path d="m14 4 6 6" />
    </svg>
  );
}

function IconClipboard({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="m9 14 2 2 4-4" />
    </svg>
  );
}

function IconDonation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
      <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
      <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
    </svg>
  );
}

function IconSnowflake({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="12" y1="2" x2="12" y2="22" />
      <path d="m20 16-4-4 4-4" />
      <path d="m4 8 4 4-4 4" />
      <path d="m16 4-4 4-4-4" />
      <path d="m8 20 4-4 4 4" />
    </svg>
  );
}

function IconChat({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M8 10h.01M12 10h.01M16 10h.01" strokeWidth="2" />
    </svg>
  );
}

function IconHospital({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 6v4M10 8h4" />
      <path d="M3 21V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v13" />
      <path d="M1 21h22" />
      <path d="M9 21v-5a3 3 0 0 1 6 0v5" />
    </svg>
  );
}

function IconVideo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" />
    </svg>
  );
}

function IconCheck({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconChevron({ className, open }: { className?: string; open?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${className} transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function IconStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICE_ICONS = [IconMicroscope, IconSyringe, IconClipboard, IconDonation, IconSnowflake, IconChat];

const SERVICES_EN = [
  { title: "IVF / ICSI", desc: "In-vitro fertilisation with the most advanced protocols and continuous embryo monitoring." },
  { title: "IUI", desc: "Intrauterine insemination — a gentle first-line treatment for mild fertility challenges." },
  { title: "Infertility Diagnosis", desc: "Comprehensive diagnostics for both partners to uncover the root cause and chart the right path." },
  { title: "Egg Donation", desc: "Our carefully screened donor database offers hope when own eggs are not an option." },
  { title: "Cryopreservation", desc: "Freeze embryos or eggs today, and use them when the time is right — for years to come." },
  { title: "Consultation", desc: "A warm, judgement-free conversation with our specialists — the first step is always just talking." },
];

const SERVICES_UK = [
  { title: "ЕКЗ / ІКСІ", desc: "Екстракорпоральне запліднення з найсучаснішими протоколами та безперервним моніторингом ембріонів." },
  { title: "ВМІ", desc: "Внутрішньоматкова інсемінація — м'який метод першої лінії при легких порушеннях фертильності." },
  { title: "Діагностика безпліддя", desc: "Комплексна діагностика обох партнерів для виявлення причини та вибору правильного шляху." },
  { title: "Донорство яйцеклітин", desc: "Наша ретельно перевірена база донорів дає надію, коли власні яйцеклітини недоступні." },
  { title: "Кріоконсервація", desc: "Заморозьте ембріони або яйцеклітини сьогодні та використайте їх у потрібний час — роками." },
  { title: "Консультація", desc: "Тепла, беззасуджувальна розмова з нашими спеціалістами — перший крок завжди у розмові." },
];

const IVF_STEPS_EN = [
  {
    title: "Initial Consultation & Diagnosis",
    duration: "~2 weeks",
    desc: "We begin with a thorough evaluation of both partners — blood tests, ultrasound, hormone panels, and sperm analysis. Our team listens to your story and builds a personalised care plan together with you. You are never just a number here.",
    note: "Bring any previous test results. All information is strictly confidential.",
  },
  {
    title: "Preparation & Stimulation",
    duration: "10–14 days",
    desc: "Hormonal medications gently stimulate the ovaries to produce multiple follicles. You will visit the clinic every 2–3 days for monitoring ultrasounds so we can fine-tune the protocol to your body's response.",
    note: "Injections are easy to self-administer. Our nurses are available by phone 24/7.",
  },
  {
    title: "Egg Retrieval (Follicle Puncture)",
    duration: "1 day procedure",
    desc: "A short, minimally invasive procedure performed under light sedation. Eggs are retrieved from the follicles under ultrasound guidance. Most patients rest for a few hours and go home the same day feeling well.",
    note: "Bring a companion. Avoid driving. Rest at home for the remainder of the day.",
  },
  {
    title: "Fertilization & Embryo Culture",
    duration: "5–6 days",
    desc: "Our embryologists fertilize your eggs using conventional IVF or ICSI. Embryos are cultured in our state-of-the-art incubators and monitored daily. We will call you with updates every step of the way.",
    note: "Embryos developing to blastocyst stage (day 5) have the highest implantation potential.",
  },
  {
    title: "Embryo Transfer",
    duration: "1 day procedure",
    desc: "The selected embryo is gently placed into the uterus in a quick, painless procedure — no anaesthesia required. Afterwards, you are encouraged to rest and take things easy. This is a day to feel hopeful.",
    note: "Keep taking your prescribed medications. Gentle walks are fine; strenuous exercise is not.",
  },
  {
    title: "Pregnancy Support",
    duration: "Ongoing",
    desc: "Two weeks after transfer, a blood test confirms pregnancy. If positive, we continue close monitoring and hormonal support through the first trimester, then hand you over to your obstetrician with full joy.",
    note: "We are with you even if the first attempt is not successful. Many patients succeed on a subsequent cycle.",
  },
];

const IVF_STEPS_UK = [
  {
    title: "Первинна консультація та діагностика",
    duration: "~2 тижні",
    desc: "Починаємо з комплексного обстеження обох партнерів — аналізи крові, УЗД, гормональні панелі та спермограма. Наша команда уважно слухає вашу історію і разом з вами складає індивідуальний план лікування.",
    note: "Принесіть попередні результати обстежень. Вся інформація суворо конфіденційна.",
  },
  {
    title: "Підготовка та стимуляція",
    duration: "10–14 днів",
    desc: "Гормональні препарати м'яко стимулюють яєчники для розвитку кількох фолікулів. Ви відвідуватимете клініку кожні 2–3 дні для моніторингових УЗД, щоб ми могли коригувати протокол відповідно до реакції вашого організму.",
    note: "Ін'єкції легко робити самостійно. Наші медсестри доступні по телефону цілодобово.",
  },
  {
    title: "Забір яйцеклітин (пункція фолікулів)",
    duration: "1 день",
    desc: "Коротка малоінвазивна процедура під легкою седацією. Яйцеклітини отримують з фолікулів під контролем УЗД. Більшість пацієнток відпочивають кілька годин і повертаються додому цього ж дня у доброму самопочутті.",
    note: "Візьміть когось із собою. Не сідайте за кермо. Відпочиньте вдома решту дня.",
  },
  {
    title: "Запліднення та культивування ембріонів",
    duration: "5–6 днів",
    desc: "Ембріологи запліднюють яйцеклітини методом ЕКЗ або ІКСІ. Ембріони вирощуються в сучасних інкубаторах і щодня моніторяться. Ми телефонуємо вам з оновленнями на кожному етапі.",
    note: "Ембріони, що досягають стадії бластоцисти (день 5), мають найвищий потенціал імплантації.",
  },
  {
    title: "Перенесення ембріона",
    duration: "1 день",
    desc: "Відібраний ембріон обережно поміщається в матку в ході короткої безболісної процедури — без анестезії. Після цього рекомендується відпочинок. Цей день — час надії.",
    note: "Продовжуйте приймати призначені препарати. Неспішні прогулянки дозволені; інтенсивні навантаження — ні.",
  },
  {
    title: "Підтримка вагітності",
    duration: "Постійно",
    desc: "Через два тижні після перенесення аналіз крові підтверджує вагітність. Якщо результат позитивний, ми продовжуємо тісний моніторинг і гормональну підтримку протягом першого триместру.",
    note: "Ми поряд з вами, навіть якщо перша спроба виявилася невдалою. Багато пацієнток досягають успіху в наступному циклі.",
  },
];

const DOCTORS_EN = [
  { name: "Dr. Olena Marchenko", spec: "Reproductive Endocrinologist", next: "Tomorrow, 10:00" },
  { name: "Dr. Ivan Koval", spec: "IVF & Embryology", next: "Wed, 14:30" },
  { name: "Dr. Natalia Bondar", spec: "Gynaecologist-Reproductologist", next: "Thu, 09:00" },
  { name: "Dr. Serhii Lysenko", spec: "Male Infertility & Andrology", next: "Fri, 11:00" },
];

const DOCTORS_UK = [
  { name: "Лікар Олена Марченко", spec: "Репродуктивний ендокринолог", next: "Завтра, 10:00" },
  { name: "Лікар Іван Коваль", spec: "ЕКЗ та ембріологія", next: "Ср, 14:30" },
  { name: "Лікар Наталія Бондар", spec: "Гінеколог-репродуктолог", next: "Чт, 09:00" },
  { name: "Лікар Сергій Лисенко", spec: "Чоловіче безпліддя та андрологія", next: "Пт, 11:00" },
];

const FAQ_EN = [
  {
    category: "About the Process",
    items: [
      { q: "Does IVF hurt?", a: "Most patients describe the process as manageable. Egg retrieval is done under sedation, so you won't feel it. Some mild discomfort during stimulation is normal and temporary." },
      { q: "How many IVF cycles might I need?", a: "Many patients succeed on the first cycle, but statistically 2–3 cycles are often needed. Each attempt teaches us more about your body, and we adjust the protocol accordingly." },
      { q: "Can I continue working during IVF?", a: "Yes, most patients continue working. The main exceptions are the day of egg retrieval (rest at home) and embryo transfer day (gentle rest advised)." },
      { q: "What should I eat during stimulation?", a: "A Mediterranean-style diet rich in antioxidants is beneficial. Stay hydrated, avoid alcohol, and don't make drastic dietary changes. Our team provides full nutritional guidance." },
      { q: "How does embryo freezing work?", a: "Surplus high-quality embryos are vitrified (flash-frozen) and stored safely in our lab. They can be used in a future transfer cycle with excellent survival rates." },
    ],
  },
  {
    category: "About Chances",
    items: [
      { q: "What is your success rate?", a: "Our clinic's IVF success rate is 63% per transfer — well above the national average. Results vary by age and diagnosis, and we will give you an honest personal prognosis at your consultation." },
      { q: "Does age affect IVF success?", a: "Yes, egg quality declines with age, but we have helped many women over 40 achieve pregnancy. Egg donation programmes open additional pathways if needed." },
      { q: "What if we have male-factor infertility?", a: "ICSI (intracytoplasmic sperm injection) overcomes most male infertility issues, even when sperm counts are very low. We also offer surgical sperm retrieval." },
      { q: "Is there anything I can do to improve success chances?", a: "Yes! Healthy weight, stopping smoking, reducing alcohol, managing stress, and taking recommended supplements all make a real difference. We offer preconception coaching." },
      { q: "What support is available if a cycle doesn't work?", a: "Emotional support is built into every stage of our programme. We offer psychological counselling, peer-support groups, and a personalised review to plan your next steps with care." },
    ],
  },
];

const FAQ_UK = [
  {
    category: "Про процес",
    items: [
      { q: "Чи боляче робити ЕКЗ?", a: "Більшість пацієнток описують процес як терпимий. Пункція проводиться під седацією, тож ви нічого не відчуєте. Певний дискомфорт під час стимуляції є нормальним і тимчасовим." },
      { q: "Скільки циклів ЕКЗ може знадобитися?", a: "Багато пацієнток досягають успіху з першого циклу, але статистично часто потрібно 2–3 спроби. Кожна спроба дає нам більше знань про ваш організм, і ми коригуємо протокол відповідно." },
      { q: "Чи можна працювати під час ЕКЗ?", a: "Так, більшість пацієнток продовжують працювати. Виняток — день пункції (відпочинок вдома) та день перенесення ембріона (рекомендований легкий відпочинок)." },
      { q: "Що їсти під час стимуляції?", a: "Рекомендується середземноморська дієта, багата на антиоксиданти. Пийте достатньо рідини, уникайте алкоголю та різких змін у харчуванні. Наша команда надасть повне нутриціологічне консультування." },
      { q: "Як працює заморозка ембріонів?", a: "Надлишкові якісні ембріони вітрифікуються (швидко заморожуються) і безпечно зберігаються в нашій лабораторії. Їх можна використати в майбутньому циклі перенесення з чудовими показниками виживання." },
    ],
  },
  {
    category: "Про шанси",
    items: [
      { q: "Яка ваша частота успіху?", a: "Частота успіху ЕКЗ у нашій клініці становить 63% на перенесення — значно вище середнього по країні. Результати залежать від віку та діагнозу, і ми надамо вам чесний індивідуальний прогноз на консультації." },
      { q: "Чи впливає вік на успіх ЕКЗ?", a: "Так, якість яйцеклітин знижується з віком, але ми допомогли багатьом жінкам після 40 завагітніти. Програми донорства яйцеклітин відкривають додаткові можливості за потреби." },
      { q: "Що робити при чоловічому безплідді?", a: "ІКСІ (інтрацитоплазматична ін'єкція сперматозоїда) долає більшість проблем чоловічого безпліддя навіть при дуже низькій кількості сперматозоїдів. Ми також пропонуємо хірургічне отримання сперми." },
      { q: "Чи є щось, що я можу зробити для підвищення шансів на успіх?", a: "Так! Здорова вага, відмова від куріння, зменшення алкоголю, управління стресом та рекомендовані добавки — все це реально допомагає. Ми пропонуємо передконцепційний коучинг." },
      { q: "Яка підтримка доступна, якщо цикл виявився невдалим?", a: "Емоційна підтримка вбудована в кожен етап нашої програми. Ми пропонуємо психологічне консультування, групи підтримки однодумців та індивідуальний огляд для планування подальших кроків." },
    ],
  },
];

const STORIES_EN = [
  { couple: "Anna & Dmytro", year: 2023, quote: "After three years of trying, we finally heard 'congratulations'. Novita gave us our miracle boy." },
  { couple: "Iryna & Oleksandr", year: 2022, quote: "The team here felt like family. They cried with us and celebrated with us. Twin girls!" },
  { couple: "Mariia & Vasyl", year: 2024, quote: "Second cycle, fresh hope, and now our daughter is learning to walk. Thank you, Novita." },
  { couple: "Oksana & Taras", year: 2023, quote: "We were afraid and lost. Dr. Marchenko guided us with such patience. Worth every step of the journey." },
];

const STORIES_UK = [
  { couple: "Анна та Дмитро", year: 2023, quote: "Після трьох років спроб ми нарешті почули 'вітаємо'. Novita подарувала нам нашого хлопчика-чудо." },
  { couple: "Ірина та Олександр", year: 2022, quote: "Команда тут стала для нас сім'єю. Вони плакали разом з нами і святкували разом з нами. Двійня!" },
  { couple: "Марія та Василь", year: 2024, quote: "Другий цикл, нова надія, а тепер наша донька вчиться ходити. Дякуємо, Novita." },
  { couple: "Оксана та Тарас", year: 2023, quote: "Ми боялися і були розгублені. Лікар Марченко вела нас з такою терпінням. Кожен крок був вартий того." },
];

const HERO_PLAN_STEPS_EN = [
  { label: "Consultation", status: "done" },
  { label: "Stimulation", status: "done" },
  { label: "Egg Retrieval", status: "active" },
  { label: "Fertilization", status: "upcoming" },
  { label: "Embryo Transfer", status: "upcoming" },
  { label: "Pregnancy Test", status: "upcoming" },
] as const;

const HERO_PLAN_STEPS_UK = [
  { label: "Консультація", status: "done" },
  { label: "Стимуляція", status: "done" },
  { label: "Забір яйцеклітин", status: "active" },
  { label: "Запліднення", status: "upcoming" },
  { label: "Перенесення ембріона", status: "upcoming" },
  { label: "Тест на вагітність", status: "upcoming" },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

export function NovitaDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  const [ivfStep, setIvfStep] = useState(0);
  const [consultType, setConsultType] = useState<"clinic" | "video">("clinic");
  const [selectedDoctor, setSelectedDoctor] = useState(0);
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", age: "", question: "", date: "" });
  const [formSent, setFormSent] = useState(false);

  const steps = isUk ? IVF_STEPS_UK : IVF_STEPS_EN;
  const services = isUk ? SERVICES_UK : SERVICES_EN;
  const doctors = isUk ? DOCTORS_UK : DOCTORS_EN;
  const faq = isUk ? FAQ_UK : FAQ_EN;
  const stories = isUk ? STORIES_UK : STORIES_EN;
  const heroPlanSteps = isUk ? HERO_PLAN_STEPS_UK : HERO_PLAN_STEPS_EN;

  const step = steps[ivfStep];

  return (
    <div className="bg-[#FFFCFA] font-serif text-[#5C2D35]">

      {/* ── Hero ── */}
      <section className="bg-linear-to-br from-[#F7EDE9] to-[#F0D8DE] px-6 pt-16 pb-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* Left: text */}
          <div>
            <div className="text-xs font-sans tracking-[0.2em] uppercase text-[#8B4A54] mb-4">
              {isUk ? "Центр репродуктивної медицини" : "Fertility & Reproductive Medicine Centre"}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#5C2D35] leading-tight mb-5">
              {isUk ? "Novita — шлях до вашої родини" : "Novita — Your Path to Family"}
            </h1>
            <p className="text-[17px] text-[#8B4A54] leading-relaxed mb-8 max-w-lg">
              {isUk
                ? "Ми супроводжуємо пари на кожному кроці до батьківства — з теплом, досвідом і турботою."
                : "We walk alongside couples every step of the way toward parenthood — with warmth, expertise, and compassion."}
            </p>

            {/* Trust stats */}
            <div className="bg-white rounded-2xl shadow-md border border-[#EDD5DA] p-5 mb-8 grid grid-cols-4 divide-x divide-[#EDD5DA]">
              {[
                { num: "18", label: isUk ? "років" : "years" },
                { num: "4,200", label: isUk ? "малюків" : "babies" },
                { num: "63%", label: isUk ? "успіх ЕКЗ" : "IVF rate" },
                { num: "МОЗ", label: isUk ? "акред." : "Accred." },
              ].map((item, i) => (
                <div key={i} className="text-center px-3 first:pl-0 last:pr-0">
                  <div className="text-2xl font-bold text-[#5C2D35] font-sans">{item.num}</div>
                  <div className="text-xs text-[#7A5C62] font-sans mt-0.5">{item.label}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex gap-3 flex-wrap">
              <button className="bg-[#5C2D35] text-white rounded-xl px-8 py-3.5 text-[15px] font-semibold font-sans cursor-pointer hover:bg-[#4a2229] transition-colors">
                {isUk ? "Записатися на консультацію" : "Book a Consultation"}
              </button>
              <button className="bg-transparent text-[#5C2D35] border-2 border-[#5C2D35] rounded-xl px-7 py-3.5 text-[15px] font-sans cursor-pointer hover:bg-[#5C2D35]/5 transition-colors">
                {isUk ? "Дізнатися про ЕКЗ" : "Learn About IVF"}
              </button>
            </div>
          </div>

          {/* Right: IVF plan card */}
          <div className="bg-white rounded-2xl shadow-xl border border-[#EDD5DA] p-6 w-full max-w-sm mx-auto md:ml-auto">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#F7EDE9] flex items-center justify-center flex-shrink-0">
                <IconHeart className="w-5 h-5 text-[#5C2D35]" />
              </div>
              <div>
                <div className="font-bold text-[#5C2D35] text-sm font-sans">
                  {isUk ? "Ваш план ЕКЗ" : "Your IVF Plan"}
                </div>
                <div className="text-xs text-[#7A5C62] font-sans">
                  {isUk ? "Лікар Марченко · Розпочато 14 квіт." : "Dr. Marchenko · Started Apr 14"}
                </div>
              </div>
              <span className="ml-auto text-xs bg-[#E8A0A8]/20 text-[#5C2D35] px-2.5 py-1 rounded-full font-semibold font-sans whitespace-nowrap">
                {isUk ? "Цикл 1" : "Cycle 1"}
              </span>
            </div>

            <div className="space-y-1.5 mb-5">
              {heroPlanSteps.map(({ label, status }) => (
                <div
                  key={label}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors ${status === "active" ? "bg-[#F7EDE9] border border-[#E8A0A8]" : ""}`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                    status === "done" ? "bg-[#5C2D35]" :
                    status === "active" ? "bg-[#E8A0A8]" :
                    "border-2 border-[#EDD5DA]"
                  }`}>
                    {status === "done" && <IconCheck className="w-3 h-3 text-white" />}
                    {status === "active" && <div className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                  </div>
                  <span className={`text-sm flex-1 font-sans ${
                    status === "active" ? "font-semibold text-[#5C2D35]" :
                    status === "done" ? "text-[#7A5C62] line-through" :
                    "text-[#7A5C62]"
                  }`}>
                    {label}
                  </span>
                  {status === "active" && (
                    <span className="text-xs text-[#8B4A54] font-medium font-sans">
                      {isUk ? "Зараз" : "Now"}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-[#F7EDE9] rounded-xl p-3.5 border border-[#EDD5DA]">
              <div className="text-xs text-[#7A5C62] font-sans mb-0.5">
                {isUk ? "Наступний крок" : "Next update"}
              </div>
              <div className="font-semibold text-[#5C2D35] text-sm font-sans">
                {isUk ? "Звіт про культивування ембріонів" : "Embryo culture report"}
              </div>
              <div className="text-xs text-[#8B4A54] font-sans mt-0.5">
                {isUk ? "Завтра · 10:00 дзвінок з Лікарем Марченко" : "Tomorrow · 10:00 call with Dr. Marchenko"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-3xl font-bold text-[#5C2D35] mb-2">
            {isUk ? "Наші послуги" : "Our Services"}
          </h2>
          <p className="text-center text-[#7A5C62] font-sans text-[15px] mb-10">
            {isUk ? "Індивідуальний підхід на кожному кроці" : "Personalised care at every step"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => {
              const Icon = SERVICE_ICONS[i];
              return (
                <div
                  key={i}
                  className="bg-[#F7EDE9] rounded-2xl p-6 border border-[#EDD5DA] hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#EDD5DA] flex items-center justify-center mb-4 shadow-sm">
                    <Icon className="w-6 h-6 text-[#5C2D35]" />
                  </div>
                  <div className="font-bold text-base text-[#5C2D35] mb-2 font-sans">{s.title}</div>
                  <div className="text-sm text-[#7A5C62] leading-relaxed font-sans">{s.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── IVF Journey ── */}
      <section className="bg-[#F7EDE9] py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-center text-3xl font-bold text-[#5C2D35] mb-2">
            {isUk ? "Ваш шлях ЕКЗ: крок за кроком" : "Your IVF Journey: Step by Step"}
          </h2>
          <p className="text-center text-[#7A5C62] font-sans text-[15px] mb-10">
            {isUk ? "Ми хочемо, щоб ви знали кожен момент наперед" : "We want you to know every moment in advance"}
          </p>

          {/* Step indicators */}
          <div className="flex justify-center gap-2 mb-9 flex-wrap">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setIvfStep(i)}
                className="w-9 h-9 rounded-full font-bold text-sm font-sans cursor-pointer transition-all"
                style={{
                  background: ivfStep === i ? "#5C2D35" : "#E8A0A8",
                  color: ivfStep === i ? "#fff" : "#5C2D35",
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* Step card */}
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-[#EDD5DA]">
            <div className="flex items-start gap-6 flex-wrap">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-extrabold flex-shrink-0 border-2 font-sans"
                style={{ background: "#F7EDE9", color: "#5C2D35", borderColor: "#E8A0A8" }}
              >
                {ivfStep + 1}
              </div>
              <div className="flex-1 min-w-52">
                <div className="flex items-center gap-3 flex-wrap mb-3">
                  <h3 className="text-xl font-bold text-[#5C2D35] m-0 font-sans">{step.title}</h3>
                  <span className="bg-[#E8A0A8] text-[#5C2D35] rounded-full px-3.5 py-1 text-xs font-semibold font-sans whitespace-nowrap">
                    {step.duration}
                  </span>
                </div>
                <p className="text-[15px] text-[#7A5C62] leading-relaxed mb-4 font-sans">{step.desc}</p>
                <div className="bg-[#F7EDE9] rounded-xl p-3.5 text-sm text-[#8B4A54] font-sans border-l-[3px] border-[#E8A0A8] flex items-start gap-2">
                  <IconHeart className="w-4 h-4 text-[#E8A0A8] flex-shrink-0 mt-0.5" />
                  <span>{step.note}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setIvfStep((s) => Math.max(0, s - 1))}
              disabled={ivfStep === 0}
              className="rounded-xl px-7 py-3 text-sm font-sans font-semibold text-white transition-opacity disabled:opacity-40 cursor-pointer disabled:cursor-default"
              style={{ background: "#5C2D35" }}
            >
              ← {isUk ? "Попередній" : "Previous"}
            </button>
            <span className="text-sm text-[#7A5C62] font-sans">
              {ivfStep + 1} / {steps.length}
            </span>
            <button
              onClick={() => setIvfStep((s) => Math.min(steps.length - 1, s + 1))}
              disabled={ivfStep === steps.length - 1}
              className="rounded-xl px-7 py-3 text-sm font-sans font-semibold text-white transition-opacity disabled:opacity-40 cursor-pointer disabled:cursor-default"
              style={{ background: "#5C2D35" }}
            >
              {isUk ? "Наступний" : "Next"} →
            </button>
          </div>
        </div>
      </section>

      {/* ── Book Consultation ── */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center text-3xl font-bold text-[#5C2D35] mb-2">
            {isUk ? "Записатися на консультацію" : "Book Your Consultation"}
          </h2>
          <p className="text-center text-[#7A5C62] font-sans text-[15px] mb-9">
            {isUk ? "Перший крок — просто поговорити" : "The first step is simply to talk"}
          </p>

          {/* Type toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-[#F7EDE9] rounded-xl p-1 flex gap-1 border border-[#EDD5DA]">
              {(["clinic", "video"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setConsultType(t)}
                  className="flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold font-sans cursor-pointer transition-all"
                  style={{
                    background: consultType === t ? "#5C2D35" : "transparent",
                    color: consultType === t ? "#fff" : "#7A5C62",
                  }}
                >
                  {t === "clinic"
                    ? <IconHospital className="w-4 h-4" />
                    : <IconVideo className="w-4 h-4" />}
                  {t === "clinic"
                    ? (isUk ? "В клініці" : "In-clinic")
                    : (isUk ? "Відео" : "Video")}
                </button>
              ))}
            </div>
          </div>

          {/* Doctor selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {doctors.map((d, i) => (
              <div
                key={i}
                onClick={() => setSelectedDoctor(i)}
                className="rounded-2xl p-4 border-2 cursor-pointer transition-all"
                style={{
                  background: selectedDoctor === i ? "#5C2D35" : "#fff",
                  color: selectedDoctor === i ? "#fff" : "#5C2D35",
                  borderColor: selectedDoctor === i ? "#5C2D35" : "#EDD5DA",
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm font-sans mb-3"
                  style={{
                    background: selectedDoctor === i ? "rgba(255,255,255,0.2)" : "#F7EDE9",
                    color: selectedDoctor === i ? "#fff" : "#5C2D35",
                  }}
                >
                  {d.name.split(" ").filter((_, i) => i > 0).map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div className="font-bold text-sm font-sans mb-1">{d.name}</div>
                <div className="text-xs font-sans mb-2" style={{ opacity: 0.75 }}>{d.spec}</div>
                <div
                  className="text-xs font-semibold font-sans"
                  style={{ color: selectedDoctor === i ? "#F7C0C8" : "#E8A0A8" }}
                >
                  {isUk ? "Найближче:" : "Next:"} {d.next}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          {formSent ? (
            <div className="bg-[#F7EDE9] rounded-2xl p-10 text-center border border-[#EDD5DA]">
              <div className="w-16 h-16 rounded-full bg-[#E8A0A8]/30 flex items-center justify-center mx-auto mb-4">
                <IconHeart className="w-8 h-8 text-[#5C2D35]" />
              </div>
              <h3 className="text-2xl font-bold text-[#5C2D35] mb-2 font-sans">
                {isUk ? "Дякуємо! Ми зв'яжемося з вами" : "Thank you! We'll be in touch"}
              </h3>
              <p className="text-[#7A5C62] font-sans text-[15px]">
                {isUk ? "Очікуйте дзвінка протягом робочого дня." : "Expect a call within one business day."}
              </p>
            </div>
          ) : (
            <div className="bg-[#F7EDE9] rounded-2xl p-7 border border-[#EDD5DA]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {[
                  { key: "name", label: isUk ? "Ваше ім'я" : "Your name", type: "text" },
                  { key: "phone", label: isUk ? "Телефон" : "Phone", type: "tel" },
                  { key: "email", label: "Email", type: "email" },
                  { key: "age", label: isUk ? "Вік" : "Age", type: "number" },
                  { key: "date", label: isUk ? "Бажана дата" : "Preferred date", type: "date" },
                ].map(({ key, label, type }) => (
                  <div key={key}>
                    <label className="block text-xs text-[#7A5C62] font-sans mb-1.5">{label}</label>
                    <input
                      type={type}
                      value={formData[key as keyof typeof formData]}
                      onChange={(e) => setFormData((f) => ({ ...f, [key]: e.target.value }))}
                      className="w-full py-2.5 px-3.5 rounded-xl border border-[#EDD5DA] bg-white text-sm text-[#5C2D35] font-sans outline-none focus:border-[#E8A0A8] focus:ring-2 focus:ring-[#E8A0A8]/20"
                    />
                  </div>
                ))}
              </div>
              <div className="mb-5">
                <label className="block text-xs text-[#7A5C62] font-sans mb-1.5">
                  {isUk ? "Ваше питання (необов'язково)" : "Your question (optional)"}
                </label>
                <textarea
                  rows={3}
                  value={formData.question}
                  onChange={(e) => setFormData((f) => ({ ...f, question: e.target.value }))}
                  className="w-full py-2.5 px-3.5 rounded-xl border border-[#EDD5DA] bg-white text-sm text-[#5C2D35] font-sans outline-none focus:border-[#E8A0A8] focus:ring-2 focus:ring-[#E8A0A8]/20 resize-y"
                />
              </div>
              <button
                onClick={() => setFormSent(true)}
                className="bg-[#5C2D35] text-white rounded-xl px-9 py-3.5 text-[15px] font-semibold font-sans cursor-pointer hover:bg-[#4a2229] transition-colors"
              >
                {isUk ? "Надіслати запит" : "Send Request"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-[#F7EDE9] py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-center text-3xl font-bold text-[#5C2D35] mb-2">
            {isUk ? "Питання без сорому" : "Questions Without Shame"}
          </h2>
          <p className="text-center text-[#7A5C62] font-sans text-[15px] mb-10">
            {isUk ? "Не існує 'дурних' питань, коли йдеться про ваше здоров'я" : "There are no 'silly' questions when it comes to your health"}
          </p>
          {faq.map((cat) => (
            <div key={cat.category} className="mb-8">
              <h3 className="text-sm font-bold text-[#8B4A54] uppercase tracking-widest mb-4 font-sans">
                {cat.category}
              </h3>
              <div className="flex flex-col gap-2">
                {cat.items.map((item, i) => {
                  const key = `${cat.category}-${i}`;
                  const open = activeFaq === key;
                  return (
                    <div
                      key={i}
                      className="bg-white rounded-xl border overflow-hidden transition-colors"
                      style={{ borderColor: open ? "#E8A0A8" : "#EDD5DA" }}
                    >
                      <button
                        onClick={() => setActiveFaq(open ? null : key)}
                        className="w-full px-5 py-4 bg-transparent border-none text-left flex justify-between items-center cursor-pointer font-sans text-[15px] font-semibold text-[#5C2D35] gap-3"
                      >
                        <span>{item.q}</span>
                        <IconChevron open={open} className="w-5 h-5 text-[#E8A0A8] flex-shrink-0" />
                      </button>
                      {open && (
                        <div className="px-5 pb-4 text-sm text-[#7A5C62] leading-relaxed font-sans">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Success Stories ── */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-3xl font-bold text-[#5C2D35] mb-2">
            {isUk ? "Наші сім'ї" : "Our Families"}
          </h2>
          <p className="text-center text-[#7A5C62] font-sans text-[15px] mb-10">
            {isUk ? "Реальні пари, реальні чудеса" : "Real couples, real miracles"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stories.map((s, i) => (
              <div
                key={i}
                className="bg-[#F7EDE9] rounded-2xl p-6 border border-[#EDD5DA] relative flex flex-col"
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <IconStar key={j} className="w-3.5 h-3.5 text-[#E8A0A8]" />
                  ))}
                </div>
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-5 text-[#E8A0A8] mb-3 opacity-60">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-sm text-[#7A5C62] leading-relaxed italic mb-4 flex-1 font-sans">{s.quote}</p>
                <div>
                  <div className="font-bold text-sm text-[#5C2D35] font-sans">{s.couple}</div>
                  <div className="text-xs text-[#7A5C62] font-sans mt-0.5">{s.year}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="bg-[#5C2D35] px-6 py-16 text-center">
        <div className="max-w-xl mx-auto">
          <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
            <IconHeart className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3 font-sans">
            {isUk ? "Ваша родина чекає на вас" : "Your family is waiting for you"}
          </h2>
          <p className="text-[#F7C0C8] text-[15px] mb-8 font-sans leading-relaxed">
            {isUk
              ? "Зробіть перший крок — ми поряд від початку до кінця."
              : "Take the first step — we are with you from beginning to end."}
          </p>
          <button className="bg-white text-[#5C2D35] rounded-xl px-9 py-3.5 text-[15px] font-bold font-sans cursor-pointer hover:bg-[#F7EDE9] transition-colors">
            {isUk ? "Починаємо разом" : "Let's Begin Together"}
          </button>
        </div>
      </section>

    </div>
  );
}
