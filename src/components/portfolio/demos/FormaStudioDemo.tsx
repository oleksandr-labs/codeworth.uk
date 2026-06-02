"use client";

import { useState } from "react";

export function FormaStudioDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  /* ─── Portfolio Filter ─── */
  const categories = [
    { id: "all", en: "All", uk: "Всі" },
    { id: "living", en: "Living Room", uk: "Вітальня" },
    { id: "kitchen", en: "Kitchen", uk: "Кухня" },
    { id: "bedroom", en: "Bedroom", uk: "Спальня" },
    { id: "bathroom", en: "Bathroom", uk: "Ванна" },
    { id: "office", en: "Office", uk: "Кабінет" },
  ];

  const projects = [
    { id: 1, cat: "living", en: "Olive Residence", uk: "Олів Резиденція", style: { en: "Minimalist", uk: "Мінімалізм" }, area: 42, color: "#c4b5a3" },
    { id: 2, cat: "kitchen", en: "Marble Kitchen", uk: "Мармурова Кухня", style: { en: "Modern Classic", uk: "Сучасна Класика" }, area: 28, color: "#b8a99a" },
    { id: 3, cat: "bedroom", en: "Calm Retreat", uk: "Тихий Притулок", style: { en: "Japandi", uk: "Японді" }, area: 35, color: "#d1c4b8" },
    { id: 4, cat: "bathroom", en: "Travertine Bath", uk: "Травертинова Ванна", style: { en: "Mediterranean", uk: "Середземноморський" }, area: 18, color: "#c8bdb2" },
    { id: 5, cat: "office", en: "Studio Loft", uk: "Студія Лофт", style: { en: "Scandinavian", uk: "Скандинавський" }, area: 24, color: "#bfb3a5" },
    { id: 6, cat: "living", en: "Golden Hour", uk: "Золота Година", style: { en: "Modern Classic", uk: "Сучасна Класика" }, area: 56, color: "#d4c5b5" },
    { id: 7, cat: "kitchen", en: "Oak & Stone", uk: "Дуб та Камінь", style: { en: "Scandinavian", uk: "Скандинавський" }, area: 22, color: "#c9bba9" },
    { id: 8, cat: "bedroom", en: "Linen Dreams", uk: "Лляні Мрії", style: { en: "Minimalist", uk: "Мінімалізм" }, area: 30, color: "#d8cec3" },
  ];

  const [activeCat, setActiveCat] = useState("all");
  const filtered = activeCat === "all" ? projects : projects.filter((p) => p.cat === activeCat);

  /* ─── Style Quiz ─── */
  const quizQuestions = [
    {
      en: "Your preferred color palette?",
      uk: "Ваша улюблена кольорова палітра?",
      options: [
        { en: "Neutrals", uk: "Нейтральні" },
        { en: "Bold", uk: "Яскраві" },
        { en: "Pastels", uk: "Пастельні" },
        { en: "Dark", uk: "Темні" },
      ],
    },
    {
      en: "Preferred material?",
      uk: "Улюблений матеріал?",
      options: [
        { en: "Wood", uk: "Дерево" },
        { en: "Metal", uk: "Метал" },
        { en: "Marble", uk: "Мармур" },
        { en: "Mixed", uk: "Мікс" },
      ],
    },
    {
      en: "Your lifestyle?",
      uk: "Ваш стиль життя?",
      options: [
        { en: "Minimalist", uk: "Мінімаліст" },
        { en: "Maximalist", uk: "Максималіст" },
        { en: "Cozy", uk: "Затишний" },
        { en: "Modern", uk: "Сучасний" },
      ],
    },
    {
      en: "What matters most?",
      uk: "Що для вас найважливіше?",
      options: [
        { en: "Function", uk: "Функціональність" },
        { en: "Aesthetics", uk: "Естетика" },
        { en: "Both", uk: "Обидва" },
      ],
    },
    {
      en: "Your inspiration?",
      uk: "Ваше натхнення?",
      options: [
        { en: "Scandinavian", uk: "Скандинавський" },
        { en: "Japanese", uk: "Японський" },
        { en: "Mediterranean", uk: "Середземноморський" },
        { en: "Industrial", uk: "Індустріальний" },
      ],
    },
  ];

  const styleResults: Record<string, {
    en: string; uk: string;
    descEn: string; descUk: string;
    materials: { en: string; uk: string }[];
    palette: string[];
  }> = {
    Scandinavian: {
      en: "Scandinavian Serenity",
      uk: "Скандинавська Гармонія",
      descEn: "Clean lines, natural materials, and a light, airy atmosphere define your ideal space. You value function and beauty equally.",
      descUk: "Чисті лінії, натуральні матеріали та легка, повітряна атмосфера визначають ваш ідеальний простір.",
      materials: [{ en: "Light Oak", uk: "Світлий Дуб" }, { en: "Linen", uk: "Льон" }, { en: "Ceramic", uk: "Кераміка" }],
      palette: ["#f5f0eb", "#d6cfc7", "#8b7e6a", "#c08b7e"],
    },
    Japanese: {
      en: "Japandi Harmony",
      uk: "Японді Гармонія",
      descEn: "A fusion of Japanese minimalism and Scandinavian warmth. Your space breathes simplicity, nature, and intentional living.",
      descUk: "Поєднання японського мінімалізму та скандинавського тепла. Ваш простір дихає простотою та природою.",
      materials: [{ en: "Bamboo", uk: "Бамбук" }, { en: "Stone", uk: "Камінь" }, { en: "Rice Paper", uk: "Рисовий Папір" }],
      palette: ["#e8e0d8", "#a69882", "#5c5346", "#8a9a7b"],
    },
    Mediterranean: {
      en: "Mediterranean Warmth",
      uk: "Середземноморське Тепло",
      descEn: "Sun-kissed textures, terracotta tones, and organic materials create your dream retreat. Warmth and character in every corner.",
      descUk: "Текстури, зігріті сонцем, теракотові тони та органічні матеріали створюють ваш простір мрії.",
      materials: [{ en: "Terracotta", uk: "Теракота" }, { en: "Travertine", uk: "Травертин" }, { en: "Olive Wood", uk: "Оливкове Дерево" }],
      palette: ["#e8d5c4", "#c08b7e", "#8b5e3c", "#6b7c5e"],
    },
    Industrial: {
      en: "Urban Industrial",
      uk: "Урбан Індустріал",
      descEn: "Raw textures, exposed elements, and bold contrasts. Your space tells a story of authenticity and urban character.",
      descUk: "Необроблені текстури, відкриті елементи та сміливі контрасти. Ваш простір розповідає історію автентичності.",
      materials: [{ en: "Steel", uk: "Сталь" }, { en: "Concrete", uk: "Бетон" }, { en: "Leather", uk: "Шкіра" }],
      palette: ["#d4d0cc", "#8c8985", "#3d3d3d", "#c08b7e"],
    },
  };

  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [quizDone, setQuizDone] = useState(false);

  const handleQuizAnswer = (option: string) => {
    const next = [...quizAnswers, option];
    setQuizAnswers(next);
    if (quizStep < 4) {
      setQuizStep(quizStep + 1);
    } else {
      setQuizDone(true);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers([]);
    setQuizDone(false);
  };

  const getStyleResult = () => {
    const lastAnswer = quizAnswers[4] || "Scandinavian";
    return styleResults[lastAnswer] || styleResults["Scandinavian"];
  };

  /* ─── Before / After ─── */
  const beforeAfter = [
    {
      en: "Living Room Transformation",
      uk: "Трансформація Вітальні",
      descEn: "From dated brown interiors to an airy Scandinavian sanctuary with natural oak and linen textures.",
      descUk: "Від застарілого темного інтер'єру до повітряного скандинавського простору з натуральним дубом та льоном.",
      before: "#8b7355",
      after: "#d6cfc7",
    },
    {
      en: "Kitchen Reimagined",
      uk: "Кухня Перетворення",
      descEn: "A cramped galley kitchen opened up into a bright, functional space with Italian marble counters.",
      descUk: "Тісна кухня перетворилась на яскравий, функціональний простір з італійським мармуром.",
      before: "#7a6b5d",
      after: "#e7e5e4",
    },
    {
      en: "Master Bedroom Retreat",
      uk: "Спальня Мрії",
      descEn: "Transformed an ordinary bedroom into a serene Japandi retreat with warm wood and soft textiles.",
      descUk: "Перетворення звичайної спальні на спокійний японді-простір з теплим деревом та м'яким текстилем.",
      before: "#6d6050",
      after: "#d8cec3",
    },
  ];

  /* ─── Services ─── */
  const services = [
    {
      icon: "☕",
      en: "Consultation",
      uk: "Консультація",
      descEn: "A 2-hour in-depth session at your property. We discuss your vision, lifestyle, and budget to create a tailored plan.",
      descUk: "2-годинна поглиблена зустріч на вашому об'єкті. Обговорюємо бачення, стиль життя та бюджет.",
      deliverEn: "Written recommendations, mood references, priority list",
      deliverUk: "Письмові рекомендації, референси, список пріоритетів",
      timeline: { en: "1 day", uk: "1 день" },
      price: { en: "From $200", uk: "Від $200" },
    },
    {
      icon: "🎨",
      en: "Concept Design",
      uk: "Концепт-Дизайн",
      descEn: "Full concept development including mood boards, color palettes, furniture layout, and material selections.",
      descUk: "Повна розробка концепції: мудборди, кольорові палітри, планування меблів та підбір матеріалів.",
      deliverEn: "Mood boards, floor plan, material board, shopping list",
      deliverUk: "Мудборди, план приміщення, дошка матеріалів, список покупок",
      timeline: { en: "2-3 weeks", uk: "2-3 тижні" },
      price: { en: "From $1,500", uk: "Від $1,500" },
    },
    {
      icon: "📐",
      en: "Full Design Project",
      uk: "Повний Дизайн-Проєкт",
      descEn: "Complete design documentation with 3D visualizations, technical drawings, and all specifications for construction.",
      descUk: "Повна дизайн-документація з 3D-візуалізаціями, технічними кресленнями та специфікаціями.",
      deliverEn: "3D renders, technical drawings, specifications, contractor brief",
      deliverUk: "3D-рендери, технічні креслення, специфікації, ТЗ для підрядника",
      timeline: { en: "4-8 weeks", uk: "4-8 тижнів" },
      price: { en: "From $5,000", uk: "Від $5,000" },
    },
    {
      icon: "👁",
      en: "Author's Supervision",
      uk: "Авторський Нагляд",
      descEn: "On-site supervision during construction to ensure every detail matches the design vision perfectly.",
      descUk: "Нагляд на об'єкті під час будівництва для забезпечення відповідності кожної деталі дизайн-проєкту.",
      deliverEn: "Regular site visits, contractor coordination, quality control",
      deliverUk: "Регулярні візити, координація підрядників, контроль якості",
      timeline: { en: "Duration of work", uk: "Протягом робіт" },
      price: { en: "From $3,000", uk: "Від $3,000" },
    },
  ];

  /* ─── Process ─── */
  const process = [
    { icon: "📋", en: "Brief & Measurements", uk: "Бриф та Обміри", descEn: "We visit your space, take precise measurements, and discuss your vision, needs, and budget in detail.", descUk: "Відвідуємо ваш простір, знімаємо обміри та детально обговорюємо бачення, потреби та бюджет." },
    { icon: "🖼", en: "Mood Board", uk: "Мудборд", descEn: "We create a visual concept with color palettes, materials, textures, and reference images that capture your style.", descUk: "Створюємо візуальну концепцію з палітрами кольорів, матеріалами, текстурами та референсами." },
    { icon: "🏠", en: "3D Visualization", uk: "3D Візуалізація", descEn: "Photorealistic 3D renders let you walk through your future space before any construction begins.", descUk: "Фотореалістичні 3D-рендери дозволяють побачити ваш майбутній простір до початку робіт." },
    { icon: "🪨", en: "Material Selection", uk: "Підбір Матеріалів", descEn: "We source and select every material, fixture, and piece of furniture to match the approved design.", descUk: "Підбираємо кожен матеріал, фурнітуру та меблі відповідно до затвердженого дизайну." },
    { icon: "🔨", en: "Implementation", uk: "Реалізація", descEn: "We oversee the entire construction process, ensuring quality and adherence to the design at every step.", descUk: "Контролюємо весь процес будівництва, забезпечуючи якість та відповідність дизайну." },
  ];

  /* ─── Testimonials ─── */
  const testimonials = [
    {
      nameEn: "Olena K.", nameUk: "Олена К.",
      projectEn: "Full Apartment Design", projectUk: "Повний дизайн квартири",
      roomEn: "Living Room & Kitchen", roomUk: "Вітальня та Кухня",
      textEn: "Forma Studio transformed our apartment into a space we never wanted to leave. Every detail was thoughtfully considered, from the lighting to the texture of the curtains.",
      textUk: "Forma Studio перетворили нашу квартиру на простір, з якого не хочеться йти. Кожна деталь була продумана — від освітлення до текстури штор.",
    },
    {
      nameEn: "Andriy M.", nameUk: "Андрій М.",
      projectEn: "Office Redesign", projectUk: "Редизайн офісу",
      roomEn: "Home Office", roomUk: "Домашній Кабінет",
      textEn: "They created a workspace that actually improved my productivity. The Japandi concept was exactly what I needed — calm, functional, beautiful.",
      textUk: "Вони створили робочий простір, що справді підвищив мою продуктивність. Концепція Японді — саме те, що мені потрібно.",
    },
    {
      nameEn: "Maria S.", nameUk: "Марія С.",
      projectEn: "Bedroom & Bathroom", projectUk: "Спальня та Ванна",
      roomEn: "Master Suite", roomUk: "Головна Спальня",
      textEn: "The attention to materials was incredible. Italian travertine, Belgian linen — every surface is a joy to touch. Worth every penny.",
      textUk: "Увага до матеріалів була неймовірною. Італійський травертин, бельгійський льон — кожна поверхня приносить задоволення.",
    },
  ];

  /* ─── Materials ─── */
  const materials = [
    { en: "Italian Marble", uk: "Італійський Мармур", color: "#e8e0d8" },
    { en: "Oak Wood", uk: "Дуб", color: "#b8a080" },
    { en: "Brushed Brass", uk: "Матова Латунь", color: "#c9a96e" },
    { en: "Belgian Linen", uk: "Бельгійський Льон", color: "#d6cfc7" },
    { en: "Travertine", uk: "Травертин", color: "#d4c5b5" },
    { en: "Terracotta", uk: "Теракота", color: "#c08b7e" },
  ];

  /* ─── Contact Form ─── */
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "",
    area: "",
    style: "",
    budget: "",
  });

  const propertyTypes = [
    { en: "Apartment", uk: "Квартира" },
    { en: "House", uk: "Будинок" },
    { en: "Office", uk: "Офіс" },
    { en: "Commercial", uk: "Комерційне" },
  ];

  const budgetRanges = [
    { en: "$5,000 – $15,000", uk: "$5,000 – $15,000" },
    { en: "$15,000 – $30,000", uk: "$15,000 – $30,000" },
    { en: "$30,000 – $60,000", uk: "$30,000 – $60,000" },
    { en: "$60,000+", uk: "$60,000+" },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#1c1917] overflow-x-hidden" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>

      {/* ═══ HEADER ═══ */}
      <header className="sticky top-0 z-50 bg-[#faf9f6]/95 backdrop-blur border-b border-[#e7e5e4]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="shrink-0">
            <span className="text-xl tracking-[0.25em] font-bold" style={{ fontFamily: "'Georgia', serif" }}>
              FORMA STUDIO
            </span>
            <span className="hidden sm:inline text-xs text-[#8b7e6a] ml-3 tracking-widest uppercase">
              Interior Design
            </span>
          </div>
          <nav className="hidden lg:flex items-center gap-8 text-sm tracking-wide">
            {[
              { en: "Portfolio", uk: "Портфоліо" },
              { en: "Services", uk: "Послуги" },
              { en: "Process", uk: "Процес" },
              { en: "About", uk: "Про нас" },
              { en: "Contact", uk: "Контакти" },
            ].map((item) => (
              <button key={item.en} className="text-[#1c1917]/70 hover:text-[#c08b7e] transition-colors">
                {isUk ? item.uk : item.en}
              </button>
            ))}
          </nav>
          <button className="bg-[#c08b7e] text-white px-5 py-2 text-sm tracking-wide hover:bg-[#a87568] transition-colors rounded-sm">
            {isUk ? "Консультація" : "Consultation"}
          </button>
        </div>
      </header>

      {/* ═══ HERO ═══ */}
      <section className="relative bg-linear-to-br from-[#e7e5e4] via-[#d6cfc7]/40 to-[#faf9f6] py-28 sm:py-36 overflow-hidden">
        {/* Decorative geometric shapes */}
        <div className="absolute top-12 right-16 w-48 h-48 border border-[#c08b7e]/20 rounded-full" />
        <div className="absolute bottom-20 left-10 w-32 h-32 border border-[#c08b7e]/15 rotate-45" />
        <div className="absolute top-1/2 right-1/3 w-20 h-20 border border-[#8b7e6a]/10 rounded-full" />
        <div className="absolute bottom-10 right-24 w-16 h-1 bg-[#c08b7e]/20" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <p className="text-sm tracking-[0.3em] text-[#c08b7e] uppercase mb-6">
            {isUk ? "Дизайн Інтер'єрів" : "Interior Design Studio"}
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl leading-tight mb-6" style={{ fontFamily: "'Georgia', serif" }}>
            {isUk ? "Простори що Надихають" : "Spaces That Inspire"}
          </h1>
          <p className="text-lg text-[#1c1917]/60 max-w-xl mx-auto mb-10 leading-relaxed" style={{ fontFamily: "system-ui, sans-serif" }}>
            {isUk
              ? "Створюємо гармонійні інтер'єри, що поєднують функціональність, естетику та вашу індивідуальність у кожній деталі."
              : "We create harmonious interiors that blend functionality, aesthetics, and your individuality in every detail."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#1c1917] text-white px-8 py-3 text-sm tracking-wide hover:bg-[#1c1917]/90 transition-colors rounded-sm">
              {isUk ? "Дивитися Портфоліо" : "View Portfolio"}
            </button>
            <button className="border border-[#c08b7e] text-[#c08b7e] px-8 py-3 text-sm tracking-wide hover:bg-[#c08b7e] hover:text-white transition-colors rounded-sm">
              {isUk ? "Безкоштовна Консультація" : "Free Consultation"}
            </button>
          </div>
        </div>
      </section>

      {/* ═══ PORTFOLIO ═══ */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-sm tracking-[0.3em] text-[#c08b7e] uppercase mb-3">
            {isUk ? "Наші Роботи" : "Our Work"}
          </p>
          <h2 className="text-3xl sm:text-4xl" style={{ fontFamily: "'Georgia', serif" }}>
            {isUk ? "Портфоліо" : "Portfolio"}
          </h2>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className={`px-5 py-2 text-sm tracking-wide rounded-sm transition-colors ${
                activeCat === cat.id
                  ? "bg-[#c08b7e] text-white"
                  : "bg-[#e7e5e4] text-[#1c1917]/70 hover:bg-[#d6cfc7]"
              }`}
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              {isUk ? cat.uk : cat.en}
            </button>
          ))}
        </div>

        {/* Masonry-ish Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {filtered.map((p, i) => {
            const heights = ["h-56", "h-72", "h-64", "h-80", "h-60", "h-68", "h-52", "h-76"];
            return (
              <div key={p.id} className="break-inside-avoid group cursor-pointer">
                <div
                  className={`${heights[i % heights.length]} rounded-sm mb-3 relative overflow-hidden`}
                  style={{ backgroundColor: p.color }}
                >
                  <div className="absolute inset-0 bg-[#1c1917]/0 group-hover:bg-[#1c1917]/10 transition-colors flex items-center justify-center">
                    <span className="text-white/0 group-hover:text-white/80 text-3xl transition-colors">
                      ↗
                    </span>
                  </div>
                </div>
                <h3 className="text-base font-medium" style={{ fontFamily: "'Georgia', serif" }}>
                  {isUk ? p.uk : p.en}
                </h3>
                <div className="flex items-center gap-3 mt-1" style={{ fontFamily: "system-ui, sans-serif" }}>
                  <span className="text-xs text-[#c08b7e] tracking-wide">
                    {isUk ? p.style.uk : p.style.en}
                  </span>
                  <span className="text-xs text-[#1c1917]/40">
                    {p.area} m²
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══ STYLE QUIZ ═══ */}
      <section className="bg-[#e7e5e4]/50 py-20">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] text-[#c08b7e] uppercase mb-3">
              {isUk ? "Інтерактивний Тест" : "Interactive Quiz"}
            </p>
            <h2 className="text-3xl sm:text-4xl mb-3" style={{ fontFamily: "'Georgia', serif" }}>
              {isUk ? "Знайдіть Свій Стиль" : "Find Your Style"}
            </h2>
            <p className="text-[#1c1917]/60" style={{ fontFamily: "system-ui, sans-serif" }}>
              {isUk
                ? "Дайте відповідь на 5 питань і дізнайтеся ваш ідеальний інтер'єрний стиль"
                : "Answer 5 questions to discover your ideal interior style"}
            </p>
          </div>

          <div className="bg-white rounded-sm p-8 sm:p-10 shadow-sm">
            {!quizDone ? (
              <>
                {/* Progress */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs tracking-widest text-[#8b7e6a] uppercase" style={{ fontFamily: "system-ui, sans-serif" }}>
                    {isUk ? "Питання" : "Question"} {quizStep + 1}/5
                  </span>
                  <div className="flex gap-1.5">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`w-8 h-1 rounded-full transition-colors ${
                          i <= quizStep ? "bg-[#c08b7e]" : "bg-[#e7e5e4]"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <h3 className="text-xl mb-6" style={{ fontFamily: "'Georgia', serif" }}>
                  {isUk ? quizQuestions[quizStep].uk : quizQuestions[quizStep].en}
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  {quizQuestions[quizStep].options.map((opt) => (
                    <button
                      key={opt.en}
                      onClick={() => handleQuizAnswer(opt.en)}
                      className="border border-[#d6cfc7] rounded-sm p-4 text-center hover:border-[#c08b7e] hover:bg-[#c08b7e]/5 transition-colors"
                      style={{ fontFamily: "system-ui, sans-serif" }}
                    >
                      {isUk ? opt.uk : opt.en}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                {/* Result */}
                {(() => {
                  const result = getStyleResult();
                  return (
                    <div className="text-center">
                      <p className="text-sm tracking-[0.2em] text-[#c08b7e] uppercase mb-2" style={{ fontFamily: "system-ui, sans-serif" }}>
                        {isUk ? "Ваш Стильовий Профіль" : "Your Style Profile"}
                      </p>
                      <h3 className="text-2xl sm:text-3xl mb-4" style={{ fontFamily: "'Georgia', serif" }}>
                        {isUk ? result.uk : result.en}
                      </h3>
                      <p className="text-[#1c1917]/60 mb-8 leading-relaxed" style={{ fontFamily: "system-ui, sans-serif" }}>
                        {isUk ? result.descUk : result.descEn}
                      </p>

                      <div className="mb-8">
                        <p className="text-xs tracking-widest text-[#8b7e6a] uppercase mb-3" style={{ fontFamily: "system-ui, sans-serif" }}>
                          {isUk ? "Рекомендовані Матеріали" : "Recommended Materials"}
                        </p>
                        <div className="flex justify-center gap-4 flex-wrap">
                          {result.materials.map((m) => (
                            <span key={m.en} className="bg-[#e7e5e4] px-4 py-1.5 text-sm rounded-sm" style={{ fontFamily: "system-ui, sans-serif" }}>
                              {isUk ? m.uk : m.en}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mb-8">
                        <p className="text-xs tracking-widest text-[#8b7e6a] uppercase mb-3" style={{ fontFamily: "system-ui, sans-serif" }}>
                          {isUk ? "Кольорова Палітра" : "Color Palette"}
                        </p>
                        <div className="flex justify-center gap-3">
                          {result.palette.map((c) => (
                            <div
                              key={c}
                              className="w-12 h-12 rounded-full border border-[#d6cfc7]/50"
                              style={{ backgroundColor: c }}
                              title={c}
                            />
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={resetQuiz}
                        className="text-sm text-[#c08b7e] underline underline-offset-4 hover:text-[#a87568] transition-colors"
                        style={{ fontFamily: "system-ui, sans-serif" }}
                      >
                        {isUk ? "Пройти ще раз" : "Take Again"}
                      </button>
                    </div>
                  );
                })()}
              </>
            )}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-sm tracking-[0.3em] text-[#c08b7e] uppercase mb-3">
            {isUk ? "Що Ми Пропонуємо" : "What We Offer"}
          </p>
          <h2 className="text-3xl sm:text-4xl" style={{ fontFamily: "'Georgia', serif" }}>
            {isUk ? "Послуги" : "Services"}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div key={s.en} className="border border-[#e7e5e4] rounded-sm p-6 hover:border-[#c08b7e]/40 transition-colors group">
              <span className="text-3xl mb-4 block">{s.icon}</span>
              <h3 className="text-lg mb-2" style={{ fontFamily: "'Georgia', serif" }}>
                {isUk ? s.uk : s.en}
              </h3>
              <p className="text-sm text-[#1c1917]/60 mb-4 leading-relaxed" style={{ fontFamily: "system-ui, sans-serif" }}>
                {isUk ? s.descUk : s.descEn}
              </p>

              <div className="space-y-2 text-xs text-[#1c1917]/50 border-t border-[#e7e5e4] pt-4" style={{ fontFamily: "system-ui, sans-serif" }}>
                <p>
                  <span className="text-[#8b7e6a] font-medium">{isUk ? "Що входить:" : "Deliverables:"}</span>{" "}
                  {isUk ? s.deliverUk : s.deliverEn}
                </p>
                <p>
                  <span className="text-[#8b7e6a] font-medium">{isUk ? "Термін:" : "Timeline:"}</span>{" "}
                  {isUk ? s.timeline.uk : s.timeline.en}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#e7e5e4]">
                <span className="text-[#c08b7e] font-medium text-sm" style={{ fontFamily: "system-ui, sans-serif" }}>
                  {isUk ? s.price.uk : s.price.en}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="bg-[#1c1917] text-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] text-[#c08b7e] uppercase mb-3">
              {isUk ? "Як Ми Працюємо" : "How We Work"}
            </p>
            <h2 className="text-3xl sm:text-4xl" style={{ fontFamily: "'Georgia', serif" }}>
              {isUk ? "Процес" : "Process"}
            </h2>
          </div>

          <div className="space-y-0">
            {process.map((step, i) => (
              <div key={step.en} className="flex gap-6 items-start group">
                {/* Timeline line */}
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-10 h-10 rounded-full border border-[#c08b7e]/40 flex items-center justify-center text-lg bg-[#1c1917]">
                    {step.icon}
                  </div>
                  {i < process.length - 1 && (
                    <div className="w-px h-16 bg-[#c08b7e]/20 my-1" />
                  )}
                </div>

                <div className="pb-8">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs text-[#c08b7e] tracking-widest" style={{ fontFamily: "system-ui, sans-serif" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-lg" style={{ fontFamily: "'Georgia', serif" }}>
                      {isUk ? step.uk : step.en}
                    </h3>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed ml-8" style={{ fontFamily: "system-ui, sans-serif" }}>
                    {isUk ? step.descUk : step.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BEFORE / AFTER ═══ */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-sm tracking-[0.3em] text-[#c08b7e] uppercase mb-3">
            {isUk ? "Трансформації" : "Transformations"}
          </p>
          <h2 className="text-3xl sm:text-4xl" style={{ fontFamily: "'Georgia', serif" }}>
            {isUk ? "До та Після" : "Before & After"}
          </h2>
        </div>

        <div className="space-y-12">
          {beforeAfter.map((ba) => (
            <div key={ba.en} className="group">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="relative">
                  <div
                    className="h-48 sm:h-64 rounded-sm"
                    style={{ backgroundColor: ba.before }}
                  />
                  <span className="absolute top-3 left-3 bg-[#1c1917]/70 text-white text-xs px-3 py-1 rounded-sm tracking-wide" style={{ fontFamily: "system-ui, sans-serif" }}>
                    {isUk ? "До" : "Before"}
                  </span>
                </div>
                <div className="relative">
                  <div
                    className="h-48 sm:h-64 rounded-sm"
                    style={{ backgroundColor: ba.after }}
                  />
                  <span className="absolute top-3 left-3 bg-[#c08b7e] text-white text-xs px-3 py-1 rounded-sm tracking-wide" style={{ fontFamily: "system-ui, sans-serif" }}>
                    {isUk ? "Після" : "After"}
                  </span>
                </div>
              </div>
              <h3 className="text-lg" style={{ fontFamily: "'Georgia', serif" }}>
                {isUk ? ba.uk : ba.en}
              </h3>
              <p className="text-sm text-[#1c1917]/60 mt-1" style={{ fontFamily: "system-ui, sans-serif" }}>
                {isUk ? ba.descUk : ba.descEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="bg-[#e7e5e4]/40 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] text-[#c08b7e] uppercase mb-3">
              {isUk ? "Відгуки" : "Testimonials"}
            </p>
            <h2 className="text-3xl sm:text-4xl" style={{ fontFamily: "'Georgia', serif" }}>
              {isUk ? "Що Кажуть Клієнти" : "What Clients Say"}
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.nameEn} className="bg-white rounded-sm p-6 shadow-sm">
                <div className="flex items-center gap-1 mb-4 text-[#c08b7e]">
                  {"★★★★★".split("").map((s, i) => (
                    <span key={i}>{s}</span>
                  ))}
                </div>
                <p className="text-sm text-[#1c1917]/70 leading-relaxed mb-6 italic" style={{ fontFamily: "system-ui, sans-serif" }}>
                  &ldquo;{isUk ? t.textUk : t.textEn}&rdquo;
                </p>
                <div className="border-t border-[#e7e5e4] pt-4">
                  <p className="font-medium text-sm" style={{ fontFamily: "'Georgia', serif" }}>
                    {isUk ? t.nameUk : t.nameEn}
                  </p>
                  <p className="text-xs text-[#8b7e6a] mt-0.5" style={{ fontFamily: "system-ui, sans-serif" }}>
                    {isUk ? t.projectUk : t.projectEn} — {isUk ? t.roomUk : t.roomEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MATERIALS PALETTE ═══ */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-sm tracking-[0.3em] text-[#c08b7e] uppercase mb-3">
            {isUk ? "Наша Палітра" : "Our Palette"}
          </p>
          <h2 className="text-3xl sm:text-4xl" style={{ fontFamily: "'Georgia', serif" }}>
            {isUk ? "Матеріали та Кольори" : "Materials & Colors"}
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {materials.map((m) => (
            <div key={m.en} className="flex flex-col items-center gap-2">
              <div
                className="w-20 h-20 rounded-full border border-[#d6cfc7]/60 shadow-sm"
                style={{ backgroundColor: m.color }}
              />
              <span className="text-xs text-[#1c1917]/70 tracking-wide" style={{ fontFamily: "system-ui, sans-serif" }}>
                {isUk ? m.uk : m.en}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CONTACT FORM ═══ */}
      <section className="bg-linear-to-br from-[#e7e5e4]/60 to-[#d6cfc7]/30 py-20">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] text-[#c08b7e] uppercase mb-3">
              {isUk ? "Зв'язатися" : "Get In Touch"}
            </p>
            <h2 className="text-3xl sm:text-4xl" style={{ fontFamily: "'Georgia', serif" }}>
              {isUk ? "Замовити Консультацію" : "Request Consultation"}
            </h2>
          </div>

          <div className="bg-white rounded-sm p-8 sm:p-10 shadow-sm" style={{ fontFamily: "system-ui, sans-serif" }}>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-[#8b7e6a] tracking-wide uppercase mb-1.5">
                  {isUk ? "Ім'я" : "Name"}
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-[#d6cfc7] rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#c08b7e] transition-colors bg-transparent"
                  placeholder={isUk ? "Ваше ім'я" : "Your name"}
                />
              </div>
              <div>
                <label className="block text-xs text-[#8b7e6a] tracking-wide uppercase mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-[#d6cfc7] rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#c08b7e] transition-colors bg-transparent"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-[#8b7e6a] tracking-wide uppercase mb-1.5">
                  {isUk ? "Телефон" : "Phone"}
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-[#d6cfc7] rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#c08b7e] transition-colors bg-transparent"
                  placeholder="+380 XX XXX XX XX"
                />
              </div>
              <div>
                <label className="block text-xs text-[#8b7e6a] tracking-wide uppercase mb-1.5">
                  {isUk ? "Тип Нерухомості" : "Property Type"}
                </label>
                <select
                  value={form.propertyType}
                  onChange={(e) => setForm({ ...form, propertyType: e.target.value })}
                  className="w-full border border-[#d6cfc7] rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#c08b7e] transition-colors bg-white"
                >
                  <option value="">{isUk ? "Оберіть" : "Select"}</option>
                  {propertyTypes.map((pt) => (
                    <option key={pt.en} value={pt.en}>
                      {isUk ? pt.uk : pt.en}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-[#8b7e6a] tracking-wide uppercase mb-1.5">
                  {isUk ? "Площа (м²)" : "Area (m²)"}
                </label>
                <input
                  type="text"
                  value={form.area}
                  onChange={(e) => setForm({ ...form, area: e.target.value })}
                  className="w-full border border-[#d6cfc7] rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#c08b7e] transition-colors bg-transparent"
                  placeholder={isUk ? "Напр. 85" : "e.g. 85"}
                />
              </div>
              <div>
                <label className="block text-xs text-[#8b7e6a] tracking-wide uppercase mb-1.5">
                  {isUk ? "Бажаний Стиль" : "Style Preference"}
                </label>
                <input
                  type="text"
                  value={form.style}
                  onChange={(e) => setForm({ ...form, style: e.target.value })}
                  className="w-full border border-[#d6cfc7] rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#c08b7e] transition-colors bg-transparent"
                  placeholder={isUk ? "Мінімалізм, Японді..." : "Minimalist, Japandi..."}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs text-[#8b7e6a] tracking-wide uppercase mb-1.5">
                {isUk ? "Бюджет" : "Budget Range"}
              </label>
              <select
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: e.target.value })}
                className="w-full border border-[#d6cfc7] rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#c08b7e] transition-colors bg-white"
              >
                <option value="">{isUk ? "Оберіть діапазон" : "Select range"}</option>
                {budgetRanges.map((br) => (
                  <option key={br.en} value={br.en}>
                    {isUk ? br.uk : br.en}
                  </option>
                ))}
              </select>
            </div>

            <button className="w-full bg-[#c08b7e] text-white py-3 text-sm tracking-wide hover:bg-[#a87568] transition-colors rounded-sm">
              {isUk ? "Замовити Консультацію" : "Request Consultation"}
            </button>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-[#1c1917] text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid sm:grid-cols-3 gap-10 mb-12">
            <div>
              <span className="text-xl tracking-[0.25em] font-bold block mb-3" style={{ fontFamily: "'Georgia', serif" }}>
                FORMA STUDIO
              </span>
              <p className="text-sm text-white/40 leading-relaxed" style={{ fontFamily: "system-ui, sans-serif" }}>
                {isUk
                  ? "Створюємо простори, що розповідають вашу історію."
                  : "Creating spaces that tell your story."}
              </p>
            </div>

            <div style={{ fontFamily: "system-ui, sans-serif" }}>
              <h4 className="text-xs tracking-widest text-[#c08b7e] uppercase mb-4">
                {isUk ? "Контакти" : "Contact"}
              </h4>
              <div className="space-y-2 text-sm text-white/60">
                <p>📍 {isUk ? "вул. Архітекторів, 12, Київ" : "12 Architects St, Kyiv"}</p>
                <p>✉ hello@formastudio.design</p>
                <p>📷 @formastudio.design</p>
              </div>
            </div>

            <div style={{ fontFamily: "system-ui, sans-serif" }}>
              <h4 className="text-xs tracking-widest text-[#c08b7e] uppercase mb-4">
                {isUk ? "Графік Роботи" : "Working Hours"}
              </h4>
              <div className="space-y-2 text-sm text-white/60">
                <p>{isUk ? "Пн — Пт: 10:00 — 19:00" : "Mon — Fri: 10:00 — 19:00"}</p>
                <p>{isUk ? "Сб: 11:00 — 16:00" : "Sat: 11:00 — 16:00"}</p>
                <p>{isUk ? "Нд: Вихідний" : "Sun: Closed"}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-xs text-white/30" style={{ fontFamily: "system-ui, sans-serif" }}>
              &copy; 2026 Forma Studio. {isUk ? "Усі права захищені." : "All rights reserved."}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
