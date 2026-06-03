"use client";

import { useState } from "react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

export function BoxClubDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  function fmtPrice(uah: number, isUkLocale: boolean): string {
    if (isUkLocale) return `${uah} ₴`;
    return `£${Math.ceil(uah / 40 / 5) * 5}`;
  }

  // Box unboxing animation hover state
  const [boxOpen, setBoxOpen] = useState(false);

  // Quiz state
  const [quizStep, setQuizStep] = useState<0 | 1 | 2 | 3 | 4 | 5 | 6>(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [quizEmail, setQuizEmail] = useState("");

  // Billing period toggle
  const [billing, setBilling] = useState<"month" | "quarter" | "year">("month");

  // Gift steps
  const [giftStep, setGiftStep] = useState<1 | 2 | 3 | 4>(1);
  const [giftBox, setGiftBox] = useState<string | null>(null);
  const [giftMessage, setGiftMessage] = useState("");
  const [giftDate, setGiftDate] = useState("");

  const quizSteps = [
    {
      q: { en: "What's your vibe?", uk: "Який у тебе стиль?" },
      opts: [
        { en: "Minimalist", uk: "Мінімалізм" },
        { en: "Bright", uk: "Яскравий" },
        { en: "Natural", uk: "Натуральний" },
        { en: "Mix it up!", uk: "Мікс!" },
      ],
    },
    {
      q: { en: "Favourite category?", uk: "Улюблена категорія?" },
      opts: [
        { en: "Beauty", uk: "Краса" },
        { en: "Lifestyle", uk: "Лайфстайл" },
        { en: "Fitness", uk: "Фітнес" },
        { en: "Everything", uk: "Все підряд" },
      ],
    },
    {
      q: { en: "Your monthly budget?", uk: "Місячний бюджет?" },
      opts: isUk
        ? ["до 599 ₴", "599–800 ₴", "800+ ₴"]
        : ["under £15", "£15–20", "£20+"],
    },
    {
      q: { en: "Any allergies?", uk: "Є алергія?" },
      opts: [
        { en: "Yes, I have allergies", uk: "Так, є алергія" },
        { en: "No, I'm all good", uk: "Ні, все добре" },
      ],
    },
    {
      q: { en: "Who is this for?", uk: "Для кого ця підписка?" },
      opts: [
        { en: "Myself ✨", uk: "Для себе ✨" },
        { en: "As a gift 🎁", uk: "Як подарунок 🎁" },
      ],
    },
  ];

  const recommendedBox = (() => {
    const cat = quizAnswers[2];
    if (cat === "Fitness" || cat === "Фітнес") return "Active Box";
    if (cat === "Beauty" || cat === "Краса") return "Beauty Box";
    if (cat === "Lifestyle" || cat === "Лайфстайл") return "Wellness Box";
    return "Premium Mix";
  })();

  const boxes = [
    {
      id: "beauty",
      nameEn: "Beauty Box",
      nameUk: "Beauty Box",
      taglineEn: "Full face glam every month",
      taglineUk: "Повний гламур щомісяця",
      emoji: "💄",
      color: "#EC4899",
      price: 599,
      itemsEn: ["Lipstick", "Eye shadow palette", "Moisturiser", "+ 3 more surprises"],
      itemsUk: ["Помада", "Палетка тіней", "Зволожуючий крем", "+ 3 сюрпризи"],
    },
    {
      id: "wellness",
      nameEn: "Wellness Box",
      nameUk: "Wellness Box",
      taglineEn: "Glow from the inside out",
      taglineUk: "Сяй зсередини назовні",
      emoji: "🌿",
      color: "#A78BFA",
      price: 699,
      itemsEn: ["Face mask set", "Essential oil", "Herbal supplement", "+ 3 more surprises"],
      itemsUk: ["Набір масок", "Ефірна олія", "Трав'яна добавка", "+ 3 сюрпризи"],
    },
    {
      id: "active",
      nameEn: "Active Box",
      nameUk: "Active Box",
      taglineEn: "Move, sweat, glow",
      taglineUk: "Рух, тренування, сяяння",
      emoji: "🏃‍♀️",
      color: "#F97316",
      price: 799,
      itemsEn: ["Resistance band", "Protein bar x3", "Gym towel", "+ 3 more surprises"],
      itemsUk: ["Еспандер", "Протеїновий батончик x3", "Рушник для спортзалу", "+ 3 сюрпризи"],
    },
    {
      id: "premium",
      nameEn: "Premium Mix",
      nameUk: "Premium Mix",
      taglineEn: "The ultimate luxury curation",
      taglineUk: "Розкішна мікс-підборка",
      emoji: "✨",
      color: "#EC4899",
      price: 1099,
      itemsEn: ["Luxury serum", "Designer candle", "Silk headband", "+ 3 more surprises"],
      itemsUk: ["Люкс-сироватка", "Дизайнерська свічка", "Шовкова пов'язка", "+ 3 сюрпризи"],
      popular: true,
    },
  ];

  const billingMultiplier = { month: 1, quarter: 0.9, year: 0.8 };
  const billingLabels = {
    month: { en: "Monthly", uk: "Щомісяця" },
    quarter: { en: "Quarterly −10%", uk: "Квартал −10%" },
    year: { en: "Yearly −20%", uk: "Рік −20%" },
  };

  const testimonials = [
    {
      name: "Sophie M.",
      avatar: "🧖‍♀️",
      stars: 5,
      en: "Every month feels like Christmas morning! The curation is always spot-on — exactly what I would have chosen myself but better.",
      uk: "Щомісяця, ніби ранок Різдва! Підборка завжди влучна — саме те, що я б обрала сама, але краще.",
    },
    {
      name: "Юлія Коваль",
      avatar: "💅",
      stars: 5,
      en: "I've tried four different beauty boxes and BoxClub is hands down the best. Premium quality at an unbeatable price.",
      uk: "Я пробувала чотири різні бокси і BoxClub — беззаперечно найкращий. Преміум якість за неймовірну ціну.",
    },
    {
      name: "Emma T.",
      avatar: "🌸",
      stars: 5,
      en: "I gifted this to my mum and she absolutely loves it. She messages me every month when the box arrives. Instant happiness!",
      uk: "Я подарувала це мамі, і вона в захваті. Щомісяця пише мені, коли приходить бокс. Миттєве щастя!",
    },
  ];

  const giftBoxNames = boxes.map(b => isUk ? b.nameUk : b.nameEn);

  const answerQuiz = (step: number, answer: string) => {
    const newAnswers = { ...quizAnswers, [step]: answer };
    setQuizAnswers(newAnswers);
    if (step < 5) {
      setQuizStep((step + 1) as 1 | 2 | 3 | 4 | 5 | 6);
    } else {
      setQuizStep(6);
    }
  };

  return (
    <div className="min-h-screen font-sans text-white overflow-x-hidden" style={{ backgroundColor: "#1a1a1a" }}>

      {/* ── CONFETTI DOTS background decoration ────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[
          { top: "8%", left: "5%", size: 8, color: "#F9A8D4" },
          { top: "15%", left: "92%", size: 6, color: "#EC4899" },
          { top: "25%", left: "15%", size: 5, color: "#F9A8D4" },
          { top: "40%", left: "88%", size: 10, color: "#FDE68A" },
          { top: "55%", left: "3%", size: 7, color: "#EC4899" },
          { top: "65%", left: "95%", size: 5, color: "#F9A8D4" },
          { top: "78%", left: "8%", size: 8, color: "#A78BFA" },
          { top: "85%", left: "90%", size: 6, color: "#F9A8D4" },
          { top: "92%", left: "50%", size: 9, color: "#EC4899" },
          { top: "35%", left: "45%", size: 4, color: "#FDE68A" },
        ].map((dot, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              top: dot.top,
              left: dot.left,
              width: dot.size,
              height: dot.size,
              backgroundColor: dot.color,
            }}
          />
        ))}
      </div>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-8 overflow-hidden z-10"
        style={{ background: "linear-gradient(135deg, #831843 0%, #EC4899 45%, #F9A8D4 100%)" }}
      >
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)", transform: "translate(-30%, 30%)" }} />

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Animated box */}
          <div
            className="relative inline-block mb-8 cursor-pointer select-none"
            onMouseEnter={() => setBoxOpen(true)}
            onMouseLeave={() => setBoxOpen(false)}
          >
            <div
              className="w-32 h-32 mx-auto rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 border-4 border-white/30"
              style={{
                background: boxOpen
                  ? "linear-gradient(135deg, #fff 0%, #fce7f3 100%)"
                  : "linear-gradient(135deg, #be185d 0%, #9d174d 100%)",
                transform: boxOpen ? "scale(1.1) rotate(-3deg)" : "scale(1) rotate(0deg)",
              }}
            >
              <div style={{ transform: boxOpen ? "translateY(-8px)" : "translateY(0)" }} className="transition-all duration-300">
                <EmojiIcon emoji={boxOpen ? "🎉" : "📦"} className="w-16 h-16" />
              </div>
            </div>
            {boxOpen && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-2 animate-bounce">
                <EmojiIcon emoji="✨" className="w-5 h-5" />
                <EmojiIcon emoji="💄" className="w-5 h-5" />
                <EmojiIcon emoji="🌸" className="w-5 h-5" />
              </div>
            )}
            <p className="mt-2 text-white/60 text-xs">{isUk ? "Наведи, щоб відкрити" : "Hover to open"}</p>
          </div>

          <span className="inline-block mb-5 text-xs uppercase tracking-[0.3em] text-white/70 font-medium border border-white/30 px-4 py-1.5 rounded-full bg-white/10">
            {isUk ? "Підписка на beauty-бокси · Щомісячний сюрприз" : "Monthly Beauty Subscription · Every Month a Surprise"}
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-6 text-white">
            {isUk ? "Твій щомісячний" : "Your Monthly"}
            <br />
            <span
              className="inline-block"
              style={{ WebkitTextStroke: "2px white", color: "transparent" }}
            >
              {isUk ? "сюрприз краси" : "Beauty Surprise"}
            </span>
          </h1>

          <p className="text-white/80 text-lg max-w-xl mx-auto mb-4 leading-relaxed">
            {isUk
              ? "Куратори підбирають 6–8 beauty-продуктів спеціально для тебе. Ніяких повторів — тільки відкриття."
              : "Our curators handpick 6–8 beauty products just for you. No repeats — only discoveries."}
          </p>
          <p className="text-white font-bold text-xl mb-8">
            {isUk ? "від 599 ₴/міс" : "from £15/mo"}
          </p>

          {/* Trust strip */}
          <div className="inline-flex flex-wrap justify-center gap-x-6 gap-y-3 mb-10 bg-black/20 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-3 text-sm text-white/80">
            <span>{isUk ? "4 800+ підписників" : "4,800+ subscribers"}</span>
            <span className="text-white/30">·</span>
            <span>{isUk ? "98% задоволені" : "98% satisfied"}</span>
            <span className="text-white/30">·</span>
            <span>{isUk ? "Безкоштовна доставка" : "Free delivery"}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => { const el = document.getElementById("bc-quiz"); el?.scrollIntoView({ behavior: "smooth" }); }}
              className="bg-white text-pink-600 font-bold px-8 py-3.5 rounded-full text-sm transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              {isUk ? "Пройти тест 💖" : "Take the Quiz 💖"}
            </button>
            <button
              onClick={() => { const el = document.getElementById("bc-boxes"); el?.scrollIntoView({ behavior: "smooth" }); }}
              className="border-2 border-white text-white hover:bg-white/20 font-bold px-8 py-3.5 rounded-full text-sm transition-colors duration-200"
            >
              {isUk ? "Переглянути бокси" : "View Boxes"}
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs tracking-widest uppercase">{isUk ? "Гортати" : "Scroll"}</span>
          <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── QUIZ ────────────────────────────────────────────────────────────── */}
      <section id="bc-quiz" className="py-24 px-6 relative z-10" style={{ backgroundColor: "#1a1a1a" }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: "#F9A8D4" }}>
              {isUk ? "Персоналізація" : "Personalisation"}
            </span>
            <h2 className="mt-3 text-4xl font-bold">{isUk ? "Знайди Свій Бокс" : "Find Your Box"}</h2>
            <p className="mt-3 text-slate-400 text-base max-w-md mx-auto">
              {isUk
                ? "5 швидких питань — і ми підберемо ідеальну підписку для тебе."
                : "5 quick questions and we'll find your perfect subscription."}
            </p>
          </div>

          <div className="rounded-3xl border p-8" style={{ background: "linear-gradient(135deg, #2d1a2e 0%, #1f1a2e 100%)", borderColor: "#EC489940" }}>
            {quizStep === 0 && (
              <div className="text-center">
                <div className="mb-6"><EmojiIcon emoji="💖" className="w-14 h-14" /></div>
                <h3 className="text-2xl font-bold mb-3">{isUk ? "Готова дізнатися свій матч?" : "Ready to find your match?"}</h3>
                <p className="text-slate-400 text-sm mb-8">
                  {isUk ? "Пройди наш короткий тест та отримай персональну рекомендацію." : "Take our short quiz and get a personalised recommendation."}
                </p>
                <button
                  onClick={() => setQuizStep(1)}
                  className="font-bold px-10 py-3.5 rounded-full text-white text-sm transition-all duration-200 hover:scale-105 shadow-lg"
                  style={{ background: "linear-gradient(135deg, #EC4899, #be185d)" }}
                >
                  {isUk ? "Розпочати тест ✨" : "Start Quiz ✨"}
                </button>
              </div>
            )}

            {quizStep >= 1 && quizStep <= 5 && (
              <div>
                <div className="flex items-center gap-2 mb-8">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div
                      key={s}
                      className="flex-1 h-1.5 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: s <= quizStep ? "#EC4899" : "#ffffff20",
                      }}
                    />
                  ))}
                </div>
                <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "#F9A8D4" }}>
                  {isUk ? `Питання ${quizStep} з 5` : `Question ${quizStep} of 5`}
                </p>
                <h3 className="text-2xl font-bold mb-8">
                  {isUk
                    ? quizSteps[quizStep - 1].q.uk
                    : quizSteps[quizStep - 1].q.en}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {quizSteps[quizStep - 1].opts.map((opt) => {
                    const label = typeof opt === "string" ? opt : isUk ? opt.uk : opt.en;
                    return (
                      <button
                        key={label}
                        onClick={() => answerQuiz(quizStep, label)}
                        className="w-full text-left px-5 py-4 rounded-2xl border text-sm font-semibold transition-all duration-200 hover:scale-[1.02]"
                        style={{
                          borderColor: "#EC489940",
                          background: "#ffffff08",
                          color: "#f3f4f6",
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#EC4899"; (e.currentTarget as HTMLButtonElement).style.background = "#EC489915"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#EC489940"; (e.currentTarget as HTMLButtonElement).style.background = "#ffffff08"; }}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {quizStep === 6 && (
              <div className="text-center">
                <div className="mb-4 animate-bounce"><EmojiIcon emoji="🎉" className="w-14 h-14" /></div>
                <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "#F9A8D4" }}>
                  {isUk ? "Твій результат" : "Your result"}
                </p>
                <h3 className="text-3xl font-bold mb-3">{recommendedBox}</h3>
                <p className="text-slate-400 text-sm mb-8">
                  {isUk
                    ? "На основі твоїх відповідей — це ідеальна підписка для тебе!"
                    : "Based on your answers — this is the perfect subscription for you!"}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mb-6 justify-center">
                  <input
                    type="email"
                    placeholder={isUk ? "Твій email" : "Your email"}
                    value={quizEmail}
                    onChange={e => setQuizEmail(e.target.value)}
                    className="flex-1 bg-white/10 border text-white placeholder-slate-400 rounded-full px-5 py-3 text-sm outline-none transition-colors"
                    style={{ borderColor: "#EC489950" }}
                  />
                  <button
                    className="font-bold px-8 py-3 rounded-full text-white text-sm transition-all hover:scale-105 shadow-lg whitespace-nowrap"
                    style={{ background: "linear-gradient(135deg, #EC4899, #be185d)" }}
                  >
                    {isUk ? "Підписатись 💖" : "Subscribe 💖"}
                  </button>
                </div>
                <button
                  onClick={() => { setQuizStep(0); setQuizAnswers({}); setQuizEmail(""); }}
                  className="text-sm text-slate-500 hover:text-slate-300 transition-colors underline"
                >
                  {isUk ? "Пройти ще раз" : "Retake quiz"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── BOX TYPES ───────────────────────────────────────────────────────── */}
      <section id="bc-boxes" className="py-24 px-6 relative z-10" style={{ background: "linear-gradient(180deg, #1a1a1a 0%, #2d1020 100%)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: "#F9A8D4" }}>
              {isUk ? "Колекція боксів" : "Box collection"}
            </span>
            <h2 className="mt-3 text-4xl font-bold">{isUk ? "Оберіть Свій Бокс" : "Choose Your Box"}</h2>
          </div>

          {/* Billing toggle */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-white/5 border p-1 rounded-full gap-1" style={{ borderColor: "#EC489930" }}>
              {(["month", "quarter", "year"] as const).map((b) => (
                <button
                  key={b}
                  onClick={() => setBilling(b)}
                  className="px-4 py-2 rounded-full text-xs font-bold transition-all duration-200"
                  style={{
                    background: billing === b ? "linear-gradient(135deg, #EC4899, #be185d)" : "transparent",
                    color: billing === b ? "#fff" : "#9ca3af",
                  }}
                >
                  {billingLabels[b][isUk ? "uk" : "en"]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {boxes.map((box) => {
              const adjPrice = Math.round(box.price * billingMultiplier[billing]);
              const items = isUk ? box.itemsUk : box.itemsEn;
              const visibleItems = items.slice(0, 3);
              const lastItem = items[3];
              return (
                <div
                  key={box.id}
                  className="relative flex flex-col rounded-3xl border p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                  style={{
                    borderColor: box.popular ? box.color : "#ffffff15",
                    background: box.popular ? `linear-gradient(135deg, ${box.color}15 0%, #1a1a1a 100%)` : "#ffffff06",
                    boxShadow: box.popular ? `0 0 30px ${box.color}20` : "none",
                  }}
                >
                  {box.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full text-white" style={{ background: box.color }}>
                        {isUk ? "Топ вибір" : "Top Pick"}
                      </span>
                    </div>
                  )}
                  <div className="mb-3"><EmojiIcon emoji={box.emoji} className="w-10 h-10" /></div>
                  <p className="font-bold text-lg mb-1">{isUk ? box.nameUk : box.nameEn}</p>
                  <p className="text-sm text-slate-400 mb-5">{isUk ? box.taglineUk : box.taglineEn}</p>

                  <p className="text-3xl font-extrabold mb-1">
                    {fmtPrice(adjPrice, isUk)}
                    <span className="text-lg font-normal text-slate-400">/{isUk ? "міс" : "mo"}</span>
                  </p>
                  {billing !== "month" && (
                    <p className="text-xs mb-4" style={{ color: box.color }}>
                      {billing === "quarter"
                        ? (isUk ? "Знижка 10% за квартал" : "Save 10% quarterly")
                        : (isUk ? "Знижка 20% за рік" : "Save 20% annually")}
                    </p>
                  )}

                  <div className="mt-4 mb-6 flex-1">
                    <p className="text-xs uppercase tracking-widest text-slate-500 mb-3">
                      {isUk ? "Цього місяця:" : "This month includes:"}
                    </p>
                    <ul className="space-y-2">
                      {visibleItems.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                          <span style={{ color: box.color }}>♦</span>
                          {item}
                        </li>
                      ))}
                      <li className="flex items-center gap-2 text-sm font-semibold" style={{ color: box.color }}>
                        <EmojiIcon emoji="🎁" className="w-4 h-4 inline-block align-middle mr-1" />{lastItem}
                      </li>
                    </ul>
                  </div>

                  <button
                    className="w-full py-3 rounded-full text-sm font-bold transition-all duration-200 hover:scale-[1.03]"
                    style={{
                      background: box.popular
                        ? `linear-gradient(135deg, ${box.color}, #be185d)`
                        : "transparent",
                      border: box.popular ? "none" : `2px solid ${box.color}60`,
                      color: box.popular ? "#fff" : box.color,
                    }}
                  >
                    {isUk ? "Підписатись" : "Subscribe"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── GIFTING ─────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative z-10" style={{ backgroundColor: "#1a1a1a" }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="mb-4"><EmojiIcon emoji="🎁" className="w-14 h-14" /></div>
            <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: "#F9A8D4" }}>
              {isUk ? "Подарувати підписку" : "Gift a subscription"}
            </span>
            <h2 className="mt-3 text-4xl font-bold">{isUk ? "Ідеальний Подарунок" : "The Perfect Gift"}</h2>
            <p className="mt-3 text-slate-400 text-base max-w-md mx-auto">
              {isUk
                ? "Подаруй незабутні враження щомісяця — сюрприз, який не набридне."
                : "Give the gift of monthly joy — a surprise that never gets old."}
            </p>
          </div>

          {/* Step indicators */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200"
                  style={{
                    background: giftStep === s ? "linear-gradient(135deg, #EC4899, #be185d)" : giftStep > s ? "#EC489950" : "#ffffff10",
                    border: giftStep >= s ? "2px solid #EC4899" : "2px solid #ffffff20",
                    color: giftStep >= s ? "#fff" : "#6b7280",
                  }}
                >
                  {giftStep > s ? "✓" : s}
                </div>
                <span className="text-xs font-medium" style={{ color: giftStep === s ? "#F9A8D4" : "#4b5563" }}>
                  {s === 1
                    ? (isUk ? "Бокс" : "Box")
                    : s === 2
                    ? (isUk ? "Послання" : "Message")
                    : s === 3
                    ? (isUk ? "Дата" : "Date")
                    : (isUk ? "Оплата" : "Checkout")}
                </span>
                {s < 4 && (
                  <div className="w-8 h-px" style={{ backgroundColor: giftStep > s ? "#EC4899" : "#ffffff15" }} />
                )}
              </div>
            ))}
          </div>

          <div className="rounded-3xl border p-8" style={{ background: "#ffffff06", borderColor: "#EC489930" }}>
            {giftStep === 1 && (
              <div>
                <h3 className="text-lg font-bold mb-6">{isUk ? "Обери бокс для подарунка" : "Choose a box to gift"}</h3>
                <div className="space-y-3 mb-6">
                  {giftBoxNames.map((name) => (
                    <button
                      key={name}
                      onClick={() => setGiftBox(name)}
                      className="w-full text-left px-5 py-4 rounded-2xl border text-sm font-semibold transition-all duration-200"
                      style={{
                        borderColor: giftBox === name ? "#EC4899" : "#ffffff15",
                        background: giftBox === name ? "#EC489915" : "#ffffff06",
                        color: giftBox === name ? "#F9A8D4" : "#d1d5db",
                      }}
                    >
                      <EmojiIcon emoji={boxes.find(b => (isUk ? b.nameUk : b.nameEn) === name)?.emoji ?? ""} className="w-5 h-5 inline-block align-middle mr-3" />
                      {name}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => giftBox && setGiftStep(2)}
                  disabled={!giftBox}
                  className="w-full py-3.5 rounded-full text-sm font-bold transition-all duration-200"
                  style={{
                    background: giftBox ? "linear-gradient(135deg, #EC4899, #be185d)" : "#ffffff10",
                    color: giftBox ? "#fff" : "#4b5563",
                    cursor: giftBox ? "pointer" : "not-allowed",
                  }}
                >
                  {isUk ? "Далі →" : "Next →"}
                </button>
              </div>
            )}

            {giftStep === 2 && (
              <div>
                <h3 className="text-lg font-bold mb-6">{isUk ? "Додай персональне послання" : "Add a personal message"}</h3>
                <textarea
                  rows={5}
                  placeholder={isUk ? "Напиши щось особливе для отримувача... 💖" : "Write something special for the recipient... 💖"}
                  value={giftMessage}
                  onChange={e => setGiftMessage(e.target.value)}
                  className="w-full rounded-2xl border px-5 py-4 text-sm outline-none transition-colors resize-none mb-6"
                  style={{
                    background: "#ffffff08",
                    borderColor: "#EC489940",
                    color: "#f3f4f6",
                  }}
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => setGiftStep(1)}
                    className="flex-1 border py-3.5 rounded-full text-sm font-semibold transition-colors"
                    style={{ borderColor: "#ffffff20", color: "#6b7280" }}
                  >
                    ← {isUk ? "Назад" : "Back"}
                  </button>
                  <button
                    onClick={() => setGiftStep(3)}
                    className="flex-1 py-3.5 rounded-full text-sm font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #EC4899, #be185d)" }}
                  >
                    {isUk ? "Далі →" : "Next →"}
                  </button>
                </div>
              </div>
            )}

            {giftStep === 3 && (
              <div>
                <h3 className="text-lg font-bold mb-6">{isUk ? "Оберіть дату відправлення" : "Pick a delivery date"}</h3>
                <input
                  type="date"
                  value={giftDate}
                  onChange={e => setGiftDate(e.target.value)}
                  className="w-full rounded-2xl border px-5 py-4 text-sm outline-none mb-6"
                  style={{
                    background: "#ffffff08",
                    borderColor: "#EC489940",
                    color: "#f3f4f6",
                    colorScheme: "dark",
                  }}
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => setGiftStep(2)}
                    className="flex-1 border py-3.5 rounded-full text-sm font-semibold"
                    style={{ borderColor: "#ffffff20", color: "#6b7280" }}
                  >
                    ← {isUk ? "Назад" : "Back"}
                  </button>
                  <button
                    onClick={() => giftDate && setGiftStep(4)}
                    disabled={!giftDate}
                    className="flex-1 py-3.5 rounded-full text-sm font-bold text-white"
                    style={{
                      background: giftDate ? "linear-gradient(135deg, #EC4899, #be185d)" : "#ffffff10",
                      color: giftDate ? "#fff" : "#4b5563",
                    }}
                  >
                    {isUk ? "Далі →" : "Next →"}
                  </button>
                </div>
              </div>
            )}

            {giftStep === 4 && (
              <div className="text-center py-4">
                <div className="mb-4"><EmojiIcon emoji="🎀" className="w-14 h-14" /></div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: "#F9A8D4" }}>
                  {isUk ? "Готово до оплати!" : "Ready to checkout!"}
                </h3>
                <div className="text-sm text-slate-400 space-y-2 mb-8">
                  <p>{isUk ? "Бокс:" : "Box:"} <span className="text-white font-semibold">{giftBox}</span></p>
                  <p>{isUk ? "Дата:" : "Date:"} <span className="text-white font-semibold">{giftDate}</span></p>
                  {giftMessage && <p className="italic text-slate-500">"{giftMessage.slice(0, 60)}{giftMessage.length > 60 ? "…" : ""}"</p>}
                </div>
                <button
                  className="w-full py-4 rounded-full text-sm font-bold text-white mb-4 shadow-xl"
                  style={{ background: "linear-gradient(135deg, #EC4899, #be185d)" }}
                >
                  {isUk ? "Перейти до оплати 💳" : "Go to Checkout 💳"}
                </button>
                <button
                  onClick={() => { setGiftStep(1); setGiftBox(null); setGiftMessage(""); setGiftDate(""); }}
                  className="text-sm text-slate-500 hover:text-slate-300 transition-colors underline"
                >
                  {isUk ? "Почати знову" : "Start over"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative z-10" style={{ background: "linear-gradient(180deg, #1a1a1a 0%, #2d1020 100%)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: "#F9A8D4" }}>
              {isUk ? "Відгуки" : "Reviews"}
            </span>
            <h2 className="mt-3 text-4xl font-bold">{isUk ? "Наші Підписниці" : "Our Subscribers"}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-3xl border p-7 flex flex-col gap-5 transition-all hover:scale-[1.02]"
                style={{ background: "#ffffff06", borderColor: "#EC489920" }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: "linear-gradient(135deg, #EC489930, #be185d20)", border: "2px solid #EC489940" }}
                  >
                    <EmojiIcon emoji={t.avatar} className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">{t.name}</p>
                    <div className="flex gap-0.5 mt-1">
                      {Array.from({ length: t.stars }).map((_, i) => (
                        <span key={i} style={{ color: "#EC4899" }}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed flex-1">
                  "{isUk ? t.uk : t.en}"
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-3 py-1 rounded-full font-semibold" style={{ background: "#EC489920", color: "#F9A8D4" }}>
                    {isUk ? "Підтверджена підписниця" : "Verified subscriber"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="py-14 px-6 border-t relative z-10" style={{ backgroundColor: "#0f0f0f", borderColor: "#EC489920" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          <div>
            <span className="text-2xl font-extrabold">
              Box<span style={{ color: "#EC4899" }}>Club</span>
            </span>
            <p className="mt-4 text-slate-500 text-sm leading-relaxed max-w-xs">
              {isUk
                ? "Щомісячна підписка на beauty-бокси — кожна коробочка є сюрпризом і маленькою радістю."
                : "Monthly beauty box subscription — every box is a surprise and a little joy."}
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm" style={{ color: "#F9A8D4" }}>
              <EmojiIcon emoji="📸" className="w-5 h-5 inline-block align-middle" />
              <span className="font-semibold">{isUk ? "@boxclub.kyiv" : "@boxclub.uk"}</span>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-slate-500 font-medium mb-5">
              {isUk ? "Контакти" : "Contact"}
            </p>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#EC4899" }} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>
                  {isUk ? "вул. Хрещатик, 32, Київ, 01001" : "15 Carnaby Street, London W1F 9PR"}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" style={{ color: "#EC4899" }} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {isUk ? "+38 (044) 555-12-34" : "+44 20 7946 0345"}
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" style={{ color: "#EC4899" }} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                hello@boxclub.{isUk ? "ua" : "uk"}
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-slate-500 font-medium mb-5">
              {isUk ? "Посилання" : "Links"}
            </p>
            <ul className="space-y-3 text-sm">
              {[
                { en: "Our Boxes", uk: "Наші бокси" },
                { en: "Take the Quiz", uk: "Пройти тест" },
                { en: "Gift a Box", uk: "Подарувати бокс" },
                { en: "My Account", uk: "Мій кабінет" },
                { en: "FAQ", uk: "FAQ" },
              ].map((link) => (
                <li key={link.en}>
                  <button className="text-slate-400 hover:text-white transition-colors">
                    {isUk ? link.uk : link.en}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: "#EC489920" }}>
          <p className="text-xs text-slate-600">
            © 2026 BoxClub. {isUk ? "Всі права захищено." : "All rights reserved."}
          </p>
          <div className="flex gap-6 text-xs text-slate-600">
            <button className="hover:text-slate-400 transition-colors">
              {isUk ? "Політика конфіденційності" : "Privacy Policy"}
            </button>
            <button className="hover:text-slate-400 transition-colors">
              {isUk ? "Умови використання" : "Terms of Use"}
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
