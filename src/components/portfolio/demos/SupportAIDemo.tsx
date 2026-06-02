"use client";

import { useState, useEffect } from "react";

const QA_PAIRS: { q: string; a: string }[] = [
  { q: "How do I reset my password?", a: "Sure! Go to Settings → Security → Reset Password. You'll receive a confirmation email within 30 seconds. Need more help?" },
  { q: "What are your business hours?", a: "Our AI support is available 24/7! For human agents, business hours are Mon–Fri, 9 AM – 6 PM (UTC). How can I assist you?" },
  { q: "Can I get a refund?", a: "Absolutely. We offer a 30-day money-back guarantee. I've initiated the refund process — please check your email for confirmation." },
  { q: "How do I upgrade my plan?", a: "Great choice! Navigate to Billing → Plans and select your desired tier. The upgrade takes effect immediately with prorated billing." },
  { q: "Do you support integrations?", a: "Yes! We integrate with Slack, Telegram, WhatsApp, Viber, Zapier, WordPress, and more. Check our Integrations page for the full list." },
];

const TYPING_PHRASES_EN = [
  "Resolves 80% of tickets automatically",
  "Speaks 40+ languages",
  "Learns from every interaction",
];
const TYPING_PHRASES_UK = [
  "Вирішує 80% тікетів автоматично",
  "Розмовляє 40+ мовами",
  "Навчається з кожної взаємодії",
];

const FEATURES_EN = [
  { icon: "💬", title: "AI Chat Widget", desc: "Drop-in chat widget that resolves customer queries in real-time with natural language understanding." },
  { icon: "🔀", title: "Smart Routing", desc: "Automatically routes complex issues to the right human agent based on skill, load, and sentiment." },
  { icon: "🎯", title: "Sentiment Analysis", desc: "Detect customer mood in real-time and escalate frustrated users before they churn." },
  { icon: "📚", title: "Knowledge Base", desc: "AI-powered knowledge base that learns from your docs and gets smarter with every interaction." },
  { icon: "📊", title: "Analytics Dashboard", desc: "Real-time insights into resolution rates, response times, satisfaction scores, and agent performance." },
  { icon: "🌐", title: "Multi-channel", desc: "Unified inbox across web chat, email, Telegram, WhatsApp, Viber, and social media platforms." },
];
const FEATURES_UK = [
  { icon: "💬", title: "AI Чат-Віджет", desc: "Вбудований чат-віджет, що вирішує запити клієнтів у реальному часі з розумінням природної мови." },
  { icon: "🔀", title: "Розумна Маршрутизація", desc: "Автоматично направляє складні питання до потрібного агента на основі навичок, навантаження та настрою." },
  { icon: "🎯", title: "Аналіз Настрою", desc: "Визначення настрою клієнта в реальному часі та ескалація розчарованих користувачів до відтоку." },
  { icon: "📚", title: "База Знань", desc: "AI-керована база знань, що навчається з ваших документів і стає розумнішою з кожною взаємодією." },
  { icon: "📊", title: "Панель Аналітики", desc: "Інсайти в реальному часі: швидкість вирішення, час відповіді, задоволеність та ефективність агентів." },
  { icon: "🌐", title: "Мультиканальність", desc: "Єдина скринька для веб-чату, email, Telegram, WhatsApp, Viber та соціальних мереж." },
];

const STEPS_EN = [
  { num: "1", title: "Connect", desc: "Paste a single script tag into your website. Works with any platform — React, WordPress, Shopify, and more." },
  { num: "2", title: "Train", desc: "Upload your docs, FAQs, and past tickets. Our AI learns your product in minutes, not weeks." },
  { num: "3", title: "Launch", desc: "Go live instantly. Your AI agent starts resolving tickets from day one with 80%+ accuracy." },
];
const STEPS_UK = [
  { num: "1", title: "Підключення", desc: "Вставте один скрипт-тег у ваш сайт. Працює з будь-якою платформою — React, WordPress, Shopify тощо." },
  { num: "2", title: "Навчання", desc: "Завантажте документацію, FAQ та минулі тікети. Наш AI вивчає ваш продукт за хвилини, а не тижні." },
  { num: "3", title: "Запуск", desc: "Запускайте миттєво. AI-агент вирішує тікети з першого дня з точністю 80%+." },
];

const PRICING_EN = [
  {
    name: "Starter",
    monthly: 29,
    features: ["1,000 conversations/mo", "1 AI agent", "Email channel", "Basic analytics", "Community support"],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Pro",
    monthly: 79,
    features: ["10,000 conversations/mo", "5 AI agents", "All channels", "Advanced analytics", "Smart routing", "Priority support"],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    monthly: 0,
    features: ["Unlimited conversations", "Unlimited agents", "All channels", "Custom integrations", "Dedicated success manager", "SLA guarantee", "On-premise option"],
    cta: "Contact Sales",
    popular: false,
  },
];
const PRICING_UK = [
  {
    name: "Starter",
    monthly: 29,
    features: ["1,000 розмов/міс", "1 AI-агент", "Email канал", "Базова аналітика", "Підтримка спільноти"],
    cta: "Почати Безкоштовно",
    popular: false,
  },
  {
    name: "Pro",
    monthly: 79,
    features: ["10,000 розмов/міс", "5 AI-агентів", "Усі канали", "Розширена аналітика", "Розумна маршрутизація", "Пріоритетна підтримка"],
    cta: "Почати Безкоштовно",
    popular: true,
  },
  {
    name: "Enterprise",
    monthly: 0,
    features: ["Безлімітні розмови", "Безлімітні агенти", "Усі канали", "Кастомні інтеграції", "Персональний менеджер", "SLA гарантія", "On-premise опція"],
    cta: "Зв'язатися",
    popular: false,
  },
];

const FAQ_EN = [
  { q: "How does SupportAI learn about my product?", a: "SupportAI ingests your documentation, FAQs, past tickets, and knowledge base articles. It uses advanced NLP to understand context, not just keywords. The AI continuously improves as it handles more conversations." },
  { q: "Can I customize the AI responses?", a: "Absolutely. You can define tone of voice, set guardrails for sensitive topics, create custom response templates, and configure escalation rules. The AI adapts to your brand voice." },
  { q: "What happens when the AI can't answer?", a: "When confidence drops below your set threshold, the conversation is seamlessly handed off to a human agent with full context. The customer never notices the transition." },
  { q: "Is my customer data secure?", a: "Yes. We're SOC 2 Type II certified, GDPR compliant, and offer data residency options. All data is encrypted at rest and in transit. We never use your data to train models for other customers." },
  { q: "How long does setup take?", a: "Most customers go live within 24 hours. Paste our script tag, upload your docs, and you're ready. Enterprise deployments with custom integrations typically take 1-2 weeks." },
];
const FAQ_UK = [
  { q: "Як SupportAI дізнається про мій продукт?", a: "SupportAI обробляє вашу документацію, FAQ, минулі тікети та статті бази знань. Він використовує NLP для розуміння контексту, а не лише ключових слів. AI постійно вдосконалюється." },
  { q: "Чи можу я налаштувати відповіді AI?", a: "Безумовно. Ви можете визначити тон, встановити обмеження для чутливих тем, створити шаблони відповідей та налаштувати правила ескалації. AI адаптується до голосу вашого бренду." },
  { q: "Що відбувається, коли AI не може відповісти?", a: "Коли впевненість падає нижче встановленого порогу, розмова передається людині-агенту з повним контекстом. Клієнт не помічає переходу." },
  { q: "Чи безпечні дані моїх клієнтів?", a: "Так. Ми маємо сертифікат SOC 2 Type II, відповідаємо GDPR і пропонуємо вибір регіону зберігання даних. Усі дані зашифровані. Ми ніколи не використовуємо ваші дані для навчання моделей інших клієнтів." },
  { q: "Скільки часу займає налаштування?", a: "Більшість клієнтів запускаються протягом 24 годин. Вставте скрипт, завантажте документи — і готово. Корпоративні розгортання з інтеграціями зазвичай займають 1-2 тижні." },
];

const INTEGRATIONS = [
  { name: "Slack", icon: "💼" },
  { name: "Telegram", icon: "✈️" },
  { name: "WhatsApp", icon: "📱" },
  { name: "Viber", icon: "📞" },
  { name: "Email", icon: "📧" },
  { name: "REST API", icon: "🔗" },
  { name: "Zapier", icon: "⚡" },
  { name: "WordPress", icon: "🌍" },
];

export function SupportAIDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  /* ── Hero typing effect ── */
  const phrases = isUk ? TYPING_PHRASES_UK : TYPING_PHRASES_EN;
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setPhraseIdx((p) => (p + 1) % phrases.length);
      return;
    }
    const speed = deleting ? 30 : 60;
    const t = setTimeout(() => setCharIdx((c) => c + (deleting ? -1 : 1)), speed);
    return () => clearTimeout(t);
  }, [charIdx, deleting, phraseIdx, phrases]);

  /* ── Chat demo ── */
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: isUk ? "Привіт! 👋 Я ваш AI-асистент. Чим можу допомогти?" : "Hi there! 👋 I'm your AI assistant. How can I help you today?" },
    { role: "user", text: "I need help with my account" },
    { role: "bot", text: "Of course! I can help with account-related questions. What specifically do you need — password reset, billing, or plan changes?" },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const [qaIndex, setQaIndex] = useState(0);

  const sendMessage = () => {
    const text = chatInput.trim();
    if (!text || botTyping) return;
    setChatMessages((m) => [...m, { role: "user", text }]);
    setChatInput("");
    setBotTyping(true);
    const answer = QA_PAIRS[qaIndex % QA_PAIRS.length].a;
    setQaIndex((i) => i + 1);
    setTimeout(() => {
      setChatMessages((m) => [...m, { role: "bot", text: answer }]);
      setBotTyping(false);
    }, 1000);
  };

  /* ── Pricing toggle ── */
  const [annual, setAnnual] = useState(false);
  const pricing = isUk ? PRICING_UK : PRICING_EN;

  /* ── FAQ accordion ── */
  const faq = isUk ? FAQ_UK : FAQ_EN;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  /* ── Data ── */
  const features = isUk ? FEATURES_UK : FEATURES_EN;
  const steps = isUk ? STEPS_UK : STEPS_EN;

  /* ── CTA email ── */
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* ═══════════════ HEADER ═══════════════ */}
      <header className="sticky top-0 z-50 border-b border-indigo-900/20 bg-[#1e1b4b]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2 text-lg font-bold text-white">
            <span className="text-2xl">🤖</span>
            <span>SupportAI</span>
          </div>
          <nav className="hidden gap-6 text-sm font-medium text-indigo-200 md:flex">
            {["Features", "Pricing", "Demo", "Docs", "Contact"].map((item) => (
              <button key={item} className="transition-colors hover:text-white">{item}</button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button className="hidden text-sm font-medium text-indigo-200 transition-colors hover:text-white sm:block">
              {isUk ? "Увійти" : "Sign In"}
            </button>
            <button className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition-all hover:bg-violet-500 hover:shadow-violet-500/40">
              {isUk ? "Спробувати Безкоштовно" : "Start Free Trial"}
            </button>
          </div>
        </div>
      </header>

      {/* ═══════════════ HERO ═══════════════ */}
      <section
        className="relative overflow-hidden bg-linear-to-br from-[#1e1b4b] via-[#312e81] to-[#3730a3] px-4 py-20 text-center sm:px-6 sm:py-28"
        style={{
          backgroundImage:
            "linear-gradient(to bottom right, #1e1b4b, #312e81, #3730a3), linear-gradient(rgba(124,58,237,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,.08) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 40px 40px, 40px 40px",
        }}
      >
        {/* glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[120px]" />

        <div className="relative mx-auto max-w-4xl">
          <div className="mb-4 inline-block rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300">
            {isUk ? "🚀 AI-підтримка нового покоління" : "🚀 Next-Gen AI Customer Support"}
          </div>

          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {isUk ? "ШІ що Розуміє Ваших Клієнтів" : "AI That Understands Your Customers"}
          </h1>

          {/* typing effect */}
          <div className="mb-8 h-8 text-lg font-medium text-cyan-300 sm:text-xl">
            {phrases[phraseIdx].slice(0, charIdx)}
            <span className="animate-pulse">|</span>
          </div>

          <div className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="rounded-xl bg-violet-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-violet-600/30 transition-all hover:bg-violet-500 hover:shadow-violet-500/40">
              {isUk ? "Почати Безкоштовно" : "Start Free Trial"}
            </button>
            <button className="rounded-xl border border-white/20 bg-white/5 px-8 py-3.5 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10">
              {isUk ? "▶ Дивитися Демо" : "▶ Watch Demo"}
            </button>
          </div>

          {/* trust */}
          <p className="mb-4 text-sm font-medium text-indigo-300">
            {isUk ? "Довіряють 500+ компаній" : "Trusted by 500+ companies"}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 opacity-40">
            {["Acme Corp", "Globex", "Initech", "Hooli", "Pied Piper"].map((name) => (
              <span key={name} className="text-sm font-bold tracking-widest text-white uppercase">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURES ═══════════════ */}
      <section className="bg-gray-50 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {isUk ? "Потужні Можливості" : "Powerful Features"}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-500">
              {isUk
                ? "Все, що потрібно для трансформації вашої підтримки клієнтів за допомогою штучного інтелекту."
                : "Everything you need to transform your customer support with artificial intelligence."}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-100"
              >
                <div className="mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 to-indigo-600 text-2xl shadow-lg shadow-violet-500/20">
                  {f.icon}
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900">{f.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ LIVE CHAT DEMO ═══════════════ */}
      <section className="bg-white px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {isUk ? "Спробуйте Живий Чат" : "Try the Live Chat"}
            </h2>
            <p className="text-lg text-gray-500">
              {isUk
                ? "Введіть будь-яке повідомлення та побачте, як AI відповідає миттєво."
                : "Type any message and see how the AI responds instantly."}
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-xl shadow-indigo-100/50">
            {/* chat header */}
            <div className="flex items-center gap-3 bg-linear-to-br from-[#312e81] to-[#3730a3] px-5 py-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-500 text-lg text-white">🤖</div>
              <div>
                <div className="text-sm font-bold text-white">SupportAI Bot</div>
                <div className="flex items-center gap-1.5 text-xs text-green-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  {isUk ? "Онлайн" : "Online"}
                </div>
              </div>
            </div>

            {/* messages */}
            <div className="flex h-80 flex-col gap-3 overflow-y-auto bg-gray-50 p-4">
              {chatMessages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "rounded-br-md bg-violet-600 text-white"
                        : "rounded-bl-md bg-white text-gray-700 shadow-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {botTyping && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md bg-white px-4 py-2.5 text-sm text-gray-400 shadow-sm">
                    {isUk ? "Друкує..." : "Typing..."}
                  </div>
                </div>
              )}
            </div>

            {/* input */}
            <div className="flex items-center gap-2 border-t border-gray-200 bg-white px-4 py-3">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder={isUk ? "Введіть повідомлення..." : "Type a message..."}
                className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700 outline-none transition-colors focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20"
              />
              <button
                onClick={sendMessage}
                disabled={botTyping}
                className="shrink-0 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-600/20 transition-all hover:bg-violet-500 disabled:opacity-50"
              >
                {isUk ? "Надіслати" : "Send"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section className="bg-linear-to-br from-[#1e1b4b] via-[#312e81] to-[#3730a3] px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <h2 className="mb-3 text-3xl font-extrabold text-white sm:text-4xl">
              {isUk ? "Як Це Працює" : "How It Works"}
            </h2>
            <p className="text-lg text-indigo-300">
              {isUk ? "Три простих кроки до AI-підтримки" : "Three simple steps to AI-powered support"}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {steps.map((s) => (
              <div key={s.num} className="text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border-2 border-violet-400 bg-violet-500/20 text-2xl font-extrabold text-white shadow-lg shadow-violet-600/20">
                  {s.num}
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">{s.title}</h3>
                <p className="text-sm leading-relaxed text-indigo-300">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PRICING ═══════════════ */}
      <section className="bg-gray-50 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {isUk ? "Прості та Прозорі Ціни" : "Simple, Transparent Pricing"}
            </h2>
            <p className="mb-6 text-lg text-gray-500">
              {isUk ? "Почніть безкоштовно. Масштабуйте, коли будете готові." : "Start free. Scale when you're ready."}
            </p>

            {/* toggle */}
            <div className="inline-flex items-center gap-3 rounded-full bg-gray-200 p-1">
              <button
                onClick={() => setAnnual(false)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                  !annual ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
                }`}
              >
                {isUk ? "Щомісяця" : "Monthly"}
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                  annual ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
                }`}
              >
                {isUk ? "Щорічно" : "Annual"}
                <span className="ml-1.5 rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">-20%</span>
              </button>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {pricing.map((tier) => {
              const price = tier.monthly === 0 ? null : annual ? Math.round(tier.monthly * 0.8) : tier.monthly;
              return (
                <div
                  key={tier.name}
                  className={`relative rounded-2xl border p-7 transition-all ${
                    tier.popular
                      ? "border-violet-300 bg-white shadow-xl shadow-violet-100 ring-2 ring-violet-500"
                      : "border-gray-200 bg-white shadow-sm hover:shadow-md"
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-violet-600 px-4 py-1 text-xs font-bold tracking-wide text-white uppercase">
                      {isUk ? "Популярний" : "Most Popular"}
                    </div>
                  )}
                  <h3 className="mb-1 text-xl font-bold text-gray-900">{tier.name}</h3>
                  <div className="mb-5">
                    {price !== null ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-extrabold text-gray-900">${price}</span>
                        <span className="text-sm text-gray-400">/{isUk ? "міс" : "mo"}</span>
                      </div>
                    ) : (
                      <span className="text-2xl font-extrabold text-gray-900">{isUk ? "Індивідуально" : "Custom"}</span>
                    )}
                  </div>
                  <ul className="mb-6 space-y-3">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="mt-0.5 shrink-0 text-violet-500">✓</span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full rounded-xl py-3 text-sm font-bold transition-all ${
                      tier.popular
                        ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20 hover:bg-violet-500"
                        : "border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {tier.cta}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ METRICS ═══════════════ */}
      <section className="bg-white px-4 py-20 sm:px-6">
        <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: "2M+", label: isUk ? "Повідомлень оброблено" : "Messages Handled" },
            { value: "500+", label: isUk ? "Компаній" : "Companies" },
            { value: "98%", label: isUk ? "Задоволеність" : "Satisfaction" },
            { value: "40+", label: isUk ? "Мов підтримки" : "Languages" },
          ].map((m) => (
            <div key={m.label} className="text-center">
              <div className="mb-1 text-4xl font-extrabold text-transparent bg-linear-to-br from-violet-600 to-indigo-600 bg-clip-text sm:text-5xl">
                {m.value}
              </div>
              <div className="text-sm font-medium text-gray-500">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section className="bg-gray-50 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {isUk ? "Що Кажуть Наші Клієнти" : "What Our Customers Say"}
            </h2>
            <p className="text-lg text-gray-500">
              {isUk
                ? "Справжні відгуки від команд, які трансформували свою підтримку."
                : "Real feedback from teams that transformed their support."}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                quote: isUk
                  ? "SupportAI скоротив час відповіді на 70%. Наші клієнти в захваті від миттєвих відповідей."
                  : "SupportAI cut our response time by 70%. Our customers love the instant answers.",
                name: "Sarah Chen",
                role: isUk ? "VP Підтримки, TechFlow" : "VP of Support, TechFlow",
                avatar: "👩‍💼",
              },
              {
                quote: isUk
                  ? "Ми зменшили витрати на підтримку на 45%, одночасно покращивши показник задоволеності до 98%."
                  : "We reduced support costs by 45% while improving our satisfaction score to 98%.",
                name: "Marcus Rivera",
                role: isUk ? "COO, ScaleUp Inc" : "COO, ScaleUp Inc",
                avatar: "👨‍💼",
              },
              {
                quote: isUk
                  ? "Налаштування зайняло менше дня. AI навчився нашому продукту швидше, ніж деякі нові співробітники."
                  : "Setup took less than a day. The AI learned our product faster than some new hires.",
                name: "Aisha Patel",
                role: isUk ? "CTO, CloudBase" : "CTO, CloudBase",
                avatar: "👩‍💻",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 text-violet-400">★★★★★</div>
                <p className="mb-5 text-sm leading-relaxed text-gray-600">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xl">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ INTEGRATIONS ═══════════════ */}
      <section className="bg-gray-50 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {isUk ? "Інтеграції" : "Integrations"}
            </h2>
            <p className="text-lg text-gray-500">
              {isUk
                ? "Підключіть SupportAI до інструментів, які ви вже використовуєте."
                : "Connect SupportAI to the tools you already use."}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {INTEGRATIONS.map((intg) => (
              <div
                key={intg.name}
                className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <span className="text-3xl">{intg.icon}</span>
                <span className="text-sm font-semibold text-gray-700">{intg.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SECURITY ═══════════════ */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {isUk ? "Безпека та Відповідність" : "Security & Compliance"}
            </h2>
            <p className="text-lg text-gray-500">
              {isUk
                ? "Ваші дані під надійним захистом на кожному рівні."
                : "Your data is protected at every level."}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "🔒", title: "SOC 2 Type II", desc: isUk ? "Щорічний аудит" : "Annual audit" },
              { icon: "🇪🇺", title: "GDPR", desc: isUk ? "Повна відповідність" : "Fully compliant" },
              { icon: "🛡️", title: "AES-256", desc: isUk ? "Шифрування даних" : "Data encryption" },
              { icon: "🌍", title: isUk ? "Дата-центри" : "Data Residency", desc: isUk ? "EU, US, APAC" : "EU, US, APAC" },
            ].map((s) => (
              <div
                key={s.title}
                className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm"
              >
                <span className="text-3xl">{s.icon}</span>
                <span className="text-sm font-bold text-gray-900">{s.title}</span>
                <span className="text-xs text-gray-500">{s.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQ ═══════════════ */}
      <section className="bg-white px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-10 text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {isUk ? "Часті Запитання" : "Frequently Asked Questions"}
          </h2>
          <div className="space-y-3">
            {faq.map((item, i) => (
              <div key={i} className="rounded-xl border border-gray-200 bg-gray-50 transition-all">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <span className="pr-4 text-sm font-semibold text-gray-900">{item.q}</span>
                  <span className="shrink-0 text-lg text-violet-500">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="border-t border-gray-200 px-5 py-4 text-sm leading-relaxed text-gray-600">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA SECTION ═══════════════ */}
      <section className="bg-linear-to-br from-[#312e81] via-[#3730a3] to-[#1e1b4b] px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-extrabold text-white sm:text-4xl">
            {isUk ? "Готові Трансформувати Вашу Підтримку?" : "Ready to Transform Your Support?"}
          </h2>
          <p className="mb-8 text-lg text-indigo-300">
            {isUk
              ? "Приєднуйтесь до 500+ компаній, які вже використовують SupportAI."
              : "Join 500+ companies already using SupportAI."}
          </p>
          <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={isUk ? "Ваш email" : "Enter your email"}
              className="flex-1 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm text-white placeholder-indigo-300 outline-none backdrop-blur-sm transition-colors focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20"
            />
            <button className="shrink-0 rounded-xl bg-violet-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-violet-600/30 transition-all hover:bg-violet-500">
              {isUk ? "Розпочати" : "Get Started"}
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="border-t border-gray-100 bg-[#0f0e17] px-4 py-14 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* brand */}
          <div>
            <div className="mb-3 flex items-center gap-2 text-lg font-bold text-white">
              <span className="text-2xl">🤖</span> SupportAI
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              {isUk
                ? "AI-підтримка нового покоління для сучасного бізнесу."
                : "Next-generation AI support for modern businesses."}
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-3 text-xs font-bold tracking-widest text-gray-400 uppercase">
              {isUk ? "Продукт" : "Product"}
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {(isUk
                ? ["Можливості", "Ціни", "Інтеграції", "Документація", "Оновлення"]
                : ["Features", "Pricing", "Integrations", "Documentation", "Changelog"]
              ).map((l) => (
                <li key={l}>
                  <button className="transition-colors hover:text-white">{l}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-3 text-xs font-bold tracking-widest text-gray-400 uppercase">
              {isUk ? "Компанія" : "Company"}
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {(isUk
                ? ["Про нас", "Блог", "Кар'єра", "Контакти", "Партнерство"]
                : ["About", "Blog", "Careers", "Contact", "Partners"]
              ).map((l) => (
                <li key={l}>
                  <button className="transition-colors hover:text-white">{l}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-3 text-xs font-bold tracking-widest text-gray-400 uppercase">
              {isUk ? "Юридичне" : "Legal"}
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {(isUk
                ? ["Умови використання", "Політика конфіденційності", "Cookie", "GDPR", "SLA"]
                : ["Terms of Service", "Privacy Policy", "Cookie Policy", "GDPR", "SLA"]
              ).map((l) => (
                <li key={l}>
                  <button className="transition-colors hover:text-white">{l}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-6xl border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          © 2026 SupportAI. {isUk ? "Усі права захищені." : "All rights reserved."}
        </div>
      </footer>
    </div>
  );
}
