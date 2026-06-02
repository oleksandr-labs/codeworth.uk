"use client";

import { useState, useRef, useEffect } from "react";

function fmtUah(uah: number, isUk: boolean): string {
  if (isUk) return `${uah.toLocaleString("uk-UA")} ₴`;
  const gbp = Math.ceil(uah / 40 / 5) * 5;
  return `£${gbp.toLocaleString("en-GB")}`;
}

interface Props {
  extraId: string;
  exampleId: string;
  isUk: boolean;
}

/* ─────────────────────────────────────────── page-landing ──── */
function SaasLanding({ isUk }: { isUk: boolean }) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const plans = [
    { name: "Starter", price: billing === "yearly" ? 8 : 10, features: isUk ? ["1 проєкт", "5 ГБ", "Email підтримка"] : ["1 project", "5 GB storage", "Email support"] },
    { name: "Pro", price: billing === "yearly" ? 20 : 25, highlight: true, features: isUk ? ["10 проєктів", "50 ГБ", "Пріоритетна підтримка", "API доступ"] : ["10 projects", "50 GB storage", "Priority support", "API access"] },
    { name: "Enterprise", price: billing === "yearly" ? 64 : 80, features: isUk ? ["Необмежено", "500 ГБ", "24/7 підтримка", "SLA", "SSO"] : ["Unlimited", "500 GB", "24/7 support", "SLA", "SSO"] },
  ];
  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">
        {isUk ? "Лендінг SaaS-продукту" : "SaaS Product Landing"}
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
        {isUk ? "Темна тема, градієнтний hero, анімовані лічильники, перемикач тарифів." : "Dark hero, gradient mesh, animated counters, billing toggle pricing."}
      </p>

      {/* Hero */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-10 text-center text-white mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-4 block">
          {isUk ? "Нова версія 3.0" : "New version 3.0"} 🚀
        </span>
        <h3 className="font-heading text-3xl font-bold mb-4 leading-tight">
          {isUk ? "Керуй проєктами без хаосу" : "Manage projects without chaos"}
        </h3>
        <p className="text-slate-400 mb-8 max-w-md mx-auto text-sm">
          {isUk ? "Все в одному місці: задачі, команда, терміни. 14 днів безкоштовно." : "Everything in one place: tasks, team, deadlines. 14 days free."}
        </p>
        <div className="flex gap-3 justify-center">
          <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors text-sm">
            {isUk ? "Спробувати безкоштовно" : "Start free trial"}
          </button>
          <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors text-sm">
            {isUk ? "Дивитися демо" : "Watch demo"}
          </button>
        </div>
        <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-white/10">
          {[
            { n: "12 000+", l: isUk ? "Команд" : "Teams" },
            { n: "98%", l: isUk ? "Задоволені" : "Satisfied" },
            { n: "4.9 ★", l: "App Store" },
          ].map((s) => (
            <div key={s.l}>
              <p className="text-2xl font-bold text-white">{s.n}</p>
              <p className="text-xs text-slate-400 mt-0.5">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex bg-neutral-100 dark:bg-neutral-800 rounded-xl p-1">
          {(["monthly", "yearly"] as const).map((b) => (
            <button key={b} onClick={() => setBilling(b)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${billing === b ? "bg-white shadow text-neutral-900" : "text-neutral-500"}`}>
              {b === "monthly" ? (isUk ? "Щомісяця" : "Monthly") : (isUk ? "Щорічно −20%" : "Yearly −20%")}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {plans.map((p) => (
          <div key={p.name} className={`rounded-2xl p-6 border ${p.highlight ? "border-indigo-500 bg-indigo-600 text-white shadow-xl" : "border-neutral-200 dark:border-neutral-700 bg-white"}`}>
            <p className={`text-sm font-semibold mb-2 ${p.highlight ? "text-indigo-200" : "text-neutral-500"}`}>{p.name}</p>
            <p className={`text-3xl font-bold mb-4 ${p.highlight ? "text-white" : "text-neutral-900"}`}>
              ${p.price}<span className={`text-sm font-normal ${p.highlight ? "text-indigo-200" : "text-neutral-400"}`}>/mo</span>
            </p>
            <ul className="space-y-2 mb-6">
              {p.features.map((f) => (
                <li key={f} className={`text-sm flex items-center gap-2 ${p.highlight ? "text-indigo-100" : "text-neutral-600"}`}>
                  <span>✓</span>{f}
                </li>
              ))}
            </ul>
            <button className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${p.highlight ? "bg-white text-indigo-700 hover:bg-indigo-50" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200"}`}>
              {isUk ? "Обрати план" : "Choose plan"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function FitnessLanding({ isUk }: { isUk: boolean }) {
  const [bmi, setBmi] = useState({ h: 170, w: 70 });
  const bmiVal = bmi.w / ((bmi.h / 100) ** 2);
  const bmiCategory = bmiVal < 18.5 ? (isUk ? "Недостатня" : "Underweight") : bmiVal < 25 ? (isUk ? "Нормальна" : "Normal") : bmiVal < 30 ? (isUk ? "Надлишкова" : "Overweight") : (isUk ? "Ожиріння" : "Obese");

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">
        {isUk ? "Лендінг фітнес-студії" : "Fitness Studio Landing"}
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
        {isUk ? "Темний дизайн, неоновий акцент, трансформації клієнтів, ІМТ-калькулятор, таймер тріалу." : "Dark bold design, neon green, transformation stories, BMI calculator, trial countdown."}
      </p>

      {/* Hero */}
      <div className="rounded-3xl bg-zinc-900 p-10 mb-6">
        <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-3">
          {isUk ? "🔥 НАБІР ВІДКРИТО" : "🔥 ENROLLMENT OPEN"}
        </p>
        <h3 className="font-heading text-3xl font-bold text-white mb-3 leading-tight">
          {isUk ? "Трансформуй тіло за 90 днів" : "Transform your body in 90 days"}
        </h3>
        <p className="text-zinc-400 text-sm mb-6">
          {isUk ? "Персональні тренери · Харчування · Спільнота 10 000+" : "Personal trainers · Nutrition · 10,000+ community"}
        </p>
        <div className="flex gap-3 flex-wrap mb-8">
          <button className="px-6 py-3 bg-green-400 hover:bg-green-300 text-zinc-900 font-bold rounded-xl text-sm transition-colors">
            {isUk ? "Перший тиждень БЕЗКОШТОВНО" : "First week FREE"}
          </button>
          <button className="px-6 py-3 border border-zinc-700 text-white font-semibold rounded-xl text-sm hover:border-green-400 transition-colors">
            {isUk ? "Розклад занять" : "Class schedule"}
          </button>
        </div>
        {/* Results */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: isUk ? "Середній результат" : "Avg result", val: "−12 kg" },
            { label: isUk ? "Клієнтів" : "Clients", val: "10 000+" },
            { label: isUk ? "Тренерів" : "Trainers", val: "48" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-bold text-green-400">{s.val}</p>
              <p className="text-xs text-zinc-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* BMI Calculator */}
      <div className="bg-zinc-800 rounded-2xl p-6 text-white">
        <h4 className="font-semibold mb-4">{isUk ? "Калькулятор ІМТ" : "BMI Calculator"}</h4>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">{isUk ? "Зріст (см)" : "Height (cm)"}</label>
            <input type="range" min={140} max={210} value={bmi.h} onChange={(e) => setBmi((p) => ({ ...p, h: +e.target.value }))}
              className="w-full accent-green-400" />
            <p className="text-sm font-bold text-green-400 mt-1">{bmi.h} cm</p>
          </div>
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">{isUk ? "Вага (кг)" : "Weight (kg)"}</label>
            <input type="range" min={40} max={150} value={bmi.w} onChange={(e) => setBmi((p) => ({ ...p, w: +e.target.value }))}
              className="w-full accent-green-400" />
            <p className="text-sm font-bold text-green-400 mt-1">{bmi.w} kg</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-zinc-900 rounded-xl p-4">
          <div className="text-3xl font-bold text-green-400">{bmiVal.toFixed(1)}</div>
          <div>
            <p className="text-sm font-semibold text-white">{bmiCategory}</p>
            <p className="text-xs text-zinc-400">{isUk ? "Ваш індекс маси тіла" : "Your body mass index"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── page-faq ──── */
const FAQ_DATA = {
  en: {
    categories: ["Shipping", "Returns", "Payment", "Product"],
    items: {
      Shipping: [
        { q: "How long does delivery take?", a: "Standard delivery takes 3–5 business days. Express: 1–2 days." },
        { q: "Do you deliver to all regions?", a: "Yes, we deliver nationwide via Nova Poshta and Ukrposhta." },
      ],
      Returns: [
        { q: "Can I return a product?", a: "Yes, within 14 days of receipt if unused and in original packaging." },
        { q: "Who pays for return shipping?", a: "If the item is defective, we cover return shipping. Otherwise, the buyer pays." },
      ],
      Payment: [
        { q: "What payment methods do you accept?", a: "Card, LiqPay, Apple Pay, Google Pay, cash on delivery." },
        { q: "Is installment payment available?", a: "Yes, 0% installment for 3–12 months via PrivatBank." },
      ],
      Product: [
        { q: "Do you provide a warranty?", a: "All products carry a 12–24 month manufacturer warranty." },
        { q: "Can I see a product before buying?", a: "Yes, we have showrooms in Kyiv, Lviv, and Dnipro." },
      ],
    },
  },
  uk: {
    categories: ["Доставка", "Повернення", "Оплата", "Товар"],
    items: {
      "Доставка": [
        { q: "Скільки часу займає доставка?", a: "Стандартна доставка — 3–5 робочих днів. Експрес: 1–2 дні." },
        { q: "Чи доставляєте ви в усі регіони?", a: "Так, доставляємо по всій Україні через Нову Пошту і Укрпошту." },
      ],
      "Повернення": [
        { q: "Чи можна повернути товар?", a: "Так, протягом 14 днів з моменту отримання, якщо товар не використовувався." },
        { q: "Хто оплачує зворотну доставку?", a: "Якщо товар з дефектом — ми. В інших випадках — покупець." },
      ],
      "Оплата": [
        { q: "Які способи оплати доступні?", a: "Картка, LiqPay, Apple Pay, Google Pay, оплата при отриманні." },
        { q: "Чи є розстрочка?", a: "Так, розстрочка 0% на 3–12 місяців через ПриватБанк." },
      ],
      "Товар": [
        { q: "Чи є гарантія?", a: "Всі товари мають гарантію виробника 12–24 місяці." },
        { q: "Чи можна подивитись товар перед купівлею?", a: "Так, у нас є шоуруми в Києві, Львові та Дніпрі." },
      ],
    },
  },
};

function EcommerceFaq({ isUk }: { isUk: boolean }) {
  const data = isUk ? FAQ_DATA.uk : FAQ_DATA.en;
  const [activeCat, setActiveCat] = useState(data.categories[0]);
  const [open, setOpen] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const items = (data.items as Record<string, { q: string; a: string }[]>)[activeCat] || [];
  const filtered = items.filter((i) => !search || i.q.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">
        {isUk ? "FAQ для інтернет-магазину" : "E-commerce FAQ Page"}
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
        {isUk ? "Вкладки категорій, пошук з підсвіткою, акордеон, Schema.org FAQPage." : "Category tabs, search highlight, accordion, Schema.org FAQPage markup."}
      </p>
      <div className="max-w-2xl mx-auto">
        <input value={search} onChange={(e) => setSearch(e.target.value)} type="search"
          placeholder={isUk ? "Пошук по питаннях..." : "Search questions..."}
          className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 focus:border-sky-400 focus:outline-none text-sm mb-4" />
        <div className="flex gap-2 flex-wrap mb-6">
          {data.categories.map((c) => (
            <button key={c} onClick={() => { setActiveCat(c); setOpen(null); setSearch(""); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCat === c ? "bg-sky-600 text-white" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-sky-50"}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {filtered.map((item, i) => (
            <div key={i} className="border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium text-neutral-900 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800 dark:bg-neutral-900 transition-colors">
                <span>{item.q}</span>
                <span className="text-neutral-400 ml-4 shrink-0">{open === i ? "−" : "+"}</span>
              </button>
              {open === i && (
                <div className="px-5 pb-4 text-sm text-neutral-600 dark:text-neutral-300 bg-sky-50">{item.a}</div>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-neutral-400 py-8">{isUk ? "Нічого не знайдено" : "Nothing found"}</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── page-pricing ──── */
function SaasPricing({ isUk }: { isUk: boolean }) {
  const [yearly, setYearly] = useState(false);
  const plans = [
    { name: "Free", price: 0, color: "border-neutral-200", btn: "bg-neutral-100 dark:bg-neutral-800 text-neutral-800", features: isUk ? ["1 проєкт", "2 ГБ", "Community підтримка"] : ["1 project", "2 GB storage", "Community support"] },
    { name: "Pro", price: yearly ? 20 : 25, color: "border-indigo-500", btn: "bg-indigo-600 text-white", badge: isUk ? "Популярний" : "Popular", features: isUk ? ["10 проєктів", "50 ГБ", "Email підтримка", "API ключі"] : ["10 projects", "50 GB", "Email support", "API keys"] },
    { name: "Business", price: yearly ? 56 : 70, color: "border-neutral-200", btn: "bg-neutral-800 text-white", features: isUk ? ["Необмежено", "500 ГБ", "Пріоритет 24/7", "SLA 99.9%", "SSO"] : ["Unlimited", "500 GB", "24/7 priority", "SLA 99.9%", "SSO"] },
  ];
  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">
        {isUk ? "Сторінка тарифів SaaS" : "SaaS Pricing Page"}
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
        {isUk ? "Перемикач місяць/рік, порівняння планів, badge «Популярний»." : "Monthly/yearly toggle, plan comparison, 'Popular' badge."}
      </p>
      <div className="flex justify-center mb-8">
        <label className="flex items-center gap-3 cursor-pointer">
          <span className={`text-sm font-medium ${!yearly ? "text-neutral-900" : "text-neutral-400"}`}>{isUk ? "Щомісяця" : "Monthly"}</span>
          <div onClick={() => setYearly(!yearly)} className={`w-12 h-6 rounded-full transition-colors ${yearly ? "bg-indigo-600" : "bg-neutral-300"} relative`}>
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white dark:bg-neutral-800 shadow transition-transform ${yearly ? "translate-x-7" : "translate-x-1"}`} />
          </div>
          <span className={`text-sm font-medium ${yearly ? "text-neutral-900" : "text-neutral-400"}`}>{isUk ? "Щорічно" : "Yearly"} <span className="text-green-600 text-xs">−20%</span></span>
        </label>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {plans.map((p) => (
          <div key={p.name} className={`rounded-2xl border-2 ${p.color} p-6 relative`}>
            {p.badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-indigo-600 text-white px-3 py-1 rounded-full font-semibold">{p.badge}</span>
            )}
            <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 mb-2">{p.name}</p>
            <p className="text-3xl font-bold text-neutral-900 dark:text-white mb-1">
              {p.price === 0 ? (isUk ? "Безкоштовно" : "Free") : `$${p.price}`}
              {p.price > 0 && <span className="text-sm font-normal text-neutral-400">/mo</span>}
            </p>
            <ul className="space-y-2 my-5">
              {p.features.map((f) => (
                <li key={f} className="text-sm text-neutral-600 dark:text-neutral-300 flex items-center gap-2"><span className="text-green-500">✓</span>{f}</li>
              ))}
            </ul>
            <button className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors hover:opacity-90 ${p.btn}`}>
              {isUk ? "Почати" : "Get started"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── page-404 ──── */
function Tech404({ isUk }: { isUk: boolean }) {
  const [q, setQ] = useState("");
  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">
        {isUk ? "Сторінка 404 tech-бренду" : "Tech Brand 404 Page"}
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
        {isUk ? "Анімована ілюстрація, пошук, швидкі посилання." : "Animated illustration, site search, quick links."}
      </p>
      <div className="max-w-lg mx-auto text-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-12 text-white">
        <div className="text-8xl mb-4 font-black text-indigo-500 opacity-30 select-none">404</div>
        <div className="text-5xl mb-4">🤖</div>
        <h3 className="font-heading text-xl font-bold mb-2">{isUk ? "Сторінку не знайдено" : "Page not found"}</h3>
        <p className="text-slate-400 text-sm mb-6">{isUk ? "Схоже, ця сторінка переїхала або не існує" : "Looks like this page moved or doesn't exist"}</p>
        <div className="relative mb-6">
          <input value={q} onChange={(e) => setQ(e.target.value)} type="search"
            placeholder={isUk ? "Пошук по сайту..." : "Search site..."}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400 text-sm" />
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {(isUk ? ["Головна", "Послуги", "Блог", "Контакти"] : ["Home", "Services", "Blog", "Contact"]).map((l) => (
            <button key={l} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm transition-colors">{l}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── feat-popup ──── */
function EcommercePopup({ isUk }: { isUk: boolean }) {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">
        {isUk ? "Exit Popup для магазину" : "E-commerce Exit Popup"}
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
        {isUk ? "Exit-intent тригер, промокод, таймер, захоплення email." : "Exit-intent trigger, promo code offer, countdown, email capture."}
      </p>
      <div className="max-w-lg mx-auto bg-neutral-100 dark:bg-neutral-800 rounded-3xl p-10 text-center">
        <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-6">{isUk ? "Симулюй рух курсора до панелі браузера…" : "Simulate moving cursor to browser bar…"}</p>
        <button onClick={() => { setShow(true); setDone(false); setEmail(""); }}
          className="px-6 py-3 bg-violet-600 text-white font-semibold rounded-xl hover:bg-violet-700 transition-colors">
          {isUk ? "Показати Exit Popup" : "Trigger Exit Popup"}
        </button>
      </div>

      {show && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative">
            <button onClick={() => setShow(false)} className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 dark:text-neutral-300 text-lg">✕</button>
            {done ? (
              <div className="text-center py-4">
                <div className="text-5xl mb-3">🎉</div>
                <h3 className="font-heading text-xl font-bold text-neutral-900 dark:text-white mb-2">{isUk ? "Промокод надіслано!" : "Promo code sent!"}</h3>
                <p className="text-sm text-neutral-500">{isUk ? "Перевірте вашу пошту" : "Check your inbox"}</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <div className="text-5xl mb-3">🛍️</div>
                  <h3 className="font-heading text-xl font-bold text-neutral-900 dark:text-white mb-2">
                    {isUk ? "Зачекайте! −15% на перше замовлення" : "Wait! −15% on your first order"}
                  </h3>
                  <div className="inline-block bg-violet-100 text-violet-700 font-mono font-bold text-xl px-4 py-2 rounded-xl mb-3">WELCOME15</div>
                  <p className="text-xs text-neutral-400">{isUk ? "Діє 24 години" : "Valid for 24 hours"}</p>
                </div>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email"
                  placeholder={isUk ? "Ваш email" : "Your email"}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 focus:border-violet-400 focus:outline-none text-sm mb-3" />
                <button onClick={() => setDone(true)}
                  className="w-full py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition-colors text-sm">
                  {isUk ? "Отримати знижку" : "Get my discount"}
                </button>
                <button onClick={() => setShow(false)} className="w-full text-center text-xs text-neutral-400 hover:text-neutral-600 dark:text-neutral-300 mt-3 transition-colors">
                  {isUk ? "Ні, дякую, мені не потрібна знижка" : "No thanks, I'll pay full price"}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ServicePopup({ isUk }: { isUk: boolean }) {
  const [show, setShow] = useState(false);
  const [sent, setSent] = useState(false);
  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">
        {isUk ? "Lead Popup для сервісу" : "Service Lead Popup"}
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
        {isUk ? "Тригер при скролі 60%, безкоштовна консультація, Telegram webhook." : "Scroll 60% trigger, free consultation offer, Telegram webhook."}
      </p>
      <div className="max-w-lg mx-auto bg-neutral-100 dark:bg-neutral-800 rounded-3xl p-10 text-center">
        <button onClick={() => { setShow(true); setSent(false); }}
          className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors">
          {isUk ? "Показати Lead Popup" : "Show Lead Popup"}
        </button>
      </div>
      {show && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative">
            <button onClick={() => setShow(false)} className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600">✕</button>
            {sent ? (
              <div className="text-center py-4">
                <div className="text-5xl mb-3">✅</div>
                <h3 className="font-heading text-xl font-bold text-neutral-900">{isUk ? "Заявку отримано!" : "Request received!"}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">{isUk ? "Передзвонимо протягом 15 хвилин" : "We'll call back within 15 minutes"}</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">💬</div>
                  <h3 className="font-heading text-xl font-bold text-neutral-900 dark:text-white mb-1">
                    {isUk ? "Безкоштовна консультація" : "Free Consultation"}
                  </h3>
                  <p className="text-sm text-neutral-500">{isUk ? "Залиште номер — передзвонимо за 15 хв" : "Leave your number — callback in 15 min"}</p>
                </div>
                <div className="space-y-3 mb-4">
                  <input type="text" placeholder={isUk ? "Ваше ім'я" : "Your name"}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 focus:border-emerald-400 focus:outline-none text-sm" />
                  <input type="tel" placeholder="+38 (0__) ___-__-__"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 focus:border-emerald-400 focus:outline-none text-sm" />
                </div>
                <button onClick={() => setSent(true)} className="w-full py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors text-sm">
                  {isUk ? "Передзвоніть мені" : "Call me back"}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────── feat-search ──── */
const SEARCH_POSTS = [
  { title: "Server Components in Next.js 15", category: "React" },
  { title: "TypeScript Generics: Complete Guide", category: "TypeScript" },
  { title: "CSS Grid Subgrid Tutorial", category: "CSS" },
  { title: "Core Web Vitals 2026", category: "Performance" },
  { title: "Bun vs Node.js Benchmark", category: "Tools" },
];

function BlogSearch({ isUk }: { isUk: boolean }) {
  const [q, setQ] = useState("");
  const results = q.length > 1 ? SEARCH_POSTS.filter((p) => p.title.toLowerCase().includes(q.toLowerCase())) : [];

  const highlight = (text: string) => {
    if (!q || q.length < 2) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text;
    return <>{text.slice(0, idx)}<mark className="bg-yellow-200 text-yellow-900 rounded px-0.5">{text.slice(idx, idx + q.length)}</mark>{text.slice(idx + q.length)}</>;
  };

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">
        {isUk ? "Пошук по блогу / базі знань" : "Blog / Knowledge Base Search"}
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
        {isUk ? "Миттєвий клієнтський пошук, підсвічування ключових слів, фільтр + пошук." : "Instant client-side search, keyword highlight in results, filter + search combined."}
      </p>
      <div className="max-w-xl mx-auto">
        <div className="relative mb-2">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">🔍</span>
          <input value={q} onChange={(e) => setQ(e.target.value)} type="search"
            placeholder={isUk ? "Шукати статті..." : "Search articles..."}
            className="w-full pl-10 pr-4 py-4 rounded-2xl border-2 border-neutral-200 dark:border-neutral-700 focus:border-indigo-400 focus:outline-none text-sm shadow-sm" />
        </div>
        {q.length > 1 && (
          <div className="bg-white rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-lg overflow-hidden">
            {results.length === 0 ? (
              <p className="px-5 py-4 text-sm text-neutral-400">{isUk ? "Нічого не знайдено" : "No results"}</p>
            ) : results.map((r, i) => (
              <div key={i} className="px-5 py-3 flex items-center gap-3 hover:bg-indigo-50 transition-colors cursor-pointer border-b border-neutral-100 dark:border-neutral-700 last:border-0">
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full shrink-0">{r.category}</span>
                <span className="text-sm text-neutral-900">{highlight(r.title)}</span>
              </div>
            ))}
            <div className="px-5 py-2 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-100">
              <p className="text-xs text-neutral-400">{isUk ? `Знайдено: ${results.length}` : `${results.length} result${results.length !== 1 ? "s" : ""}`}</p>
            </div>
          </div>
        )}
        {q.length === 0 && (
          <div className="mt-4">
            <p className="text-xs text-neutral-400 mb-2">{isUk ? "Нещодавні пошуки:" : "Recent searches:"}</p>
            <div className="flex flex-wrap gap-2">
              {["Next.js", "TypeScript", "Tailwind CSS", "React hooks"].map((t) => (
                <button key={t} onClick={() => setQ(t)} className="text-xs px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-indigo-50 text-neutral-600 dark:text-neutral-300 rounded-full transition-colors">
                  🕐 {t}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── int-nova-poshta ──── */
function NovaPoshtaCheckout({ isUk }: { isUk: boolean }) {
  const [city, setCity] = useState("");
  const [method, setMethod] = useState<"branch" | "locker" | "courier">("branch");
  const [branch, setBranch] = useState("");

  const cities = ["Київ / Kyiv", "Львів / Lviv", "Харків / Kharkiv", "Одеса / Odesa"];
  const branches = ["№ 1 — вул. Хрещатик 22", "№ 5 — вул. Велика Васильківська 55", "№ 12 — пр. Перемоги 10"];
  const lockers = ["Поштомат #A101 — ТРЦ Gulliver", "Поштомат #A204 — метро Хрещатик", "Поштомат #B55 — Аврора Мол"];
  const cost = method === "courier" ? 120 : 75;

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">
        {isUk ? "Крок доставки: Нова Пошта" : "Checkout Delivery Step: Nova Poshta"}
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
        {isUk ? "Автодоповнення міста, вибір відділення/поштомату, розрахунок вартості." : "City autocomplete, branch/locker selector, live cost calculation."}
      </p>
      <div className="max-w-lg mx-auto bg-amber-50 rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">📦</span>
          <h3 className="font-semibold text-neutral-900">{isUk ? "Нова Пошта" : "Nova Poshta"}</h3>
          <span className="ml-auto text-sm font-bold text-amber-700">{cost} ₴</span>
        </div>

        {/* City */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300 mb-1.5">{isUk ? "Місто" : "City"}</label>
          <div className="relative">
            <input value={city} onChange={(e) => setCity(e.target.value)} type="text"
              placeholder={isUk ? "Введіть місто..." : "Enter city..."}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white focus:border-amber-400 focus:outline-none text-sm" />
            {city && city.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl mt-1 shadow-lg z-10 overflow-hidden">
                {cities.filter((c) => c.toLowerCase().includes(city.toLowerCase())).map((c) => (
                  <button key={c} onClick={() => setCity(c.split(" / ")[isUk ? 0 : 1] || c)}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-amber-50 transition-colors border-b border-neutral-100 dark:border-neutral-700 last:border-0">
                    📍 {c}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Method */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300 mb-2">{isUk ? "Спосіб отримання" : "Pickup method"}</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "branch" as const, label: isUk ? "🏢 Відділення" : "🏢 Branch" },
              { id: "locker" as const, label: isUk ? "🔒 Поштомат" : "🔒 Locker" },
              { id: "courier" as const, label: isUk ? "🚚 Кур'єр" : "🚚 Courier" },
            ].map((m) => (
              <button key={m.id} onClick={() => { setMethod(m.id); setBranch(""); }}
                className={`py-2 rounded-xl border text-xs font-medium transition-all ${method === m.id ? "border-amber-500 bg-amber-500 text-white" : "border-neutral-200 dark:border-neutral-700 bg-white text-neutral-700 dark:text-neutral-300 hover:border-amber-300"}`}>
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Branch/Locker selector */}
        {method !== "courier" && (
          <div className="mb-6">
            <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300 mb-1.5">
              {method === "branch" ? (isUk ? "Відділення" : "Branch") : (isUk ? "Поштомат" : "Locker")}
            </label>
            <select value={branch} onChange={(e) => setBranch(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white focus:border-amber-400 focus:outline-none text-sm">
              <option value="">{isUk ? "Оберіть..." : "Select..."}</option>
              {(method === "branch" ? branches : lockers).map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </div>
        )}
        {method === "courier" && (
          <div className="mb-6">
            <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-300 mb-1.5">{isUk ? "Адреса доставки" : "Delivery address"}</label>
            <input type="text" placeholder={isUk ? "Вулиця, будинок, квартира" : "Street, building, apartment"}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white focus:border-amber-400 focus:outline-none text-sm" />
          </div>
        )}

        <div className="bg-white rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-neutral-500">{isUk ? "Вартість доставки" : "Shipping cost"}</p>
            <p className="font-bold text-neutral-900">{cost} ₴</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-neutral-500">{isUk ? "Орієнтовний термін" : "Est. delivery"}</p>
            <p className="font-bold text-neutral-900">{isUk ? "1–2 дні" : "1–2 days"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── int-liqpay ──── */
function LiqPayDemo({ isUk }: { isUk: boolean }) {
  const [step, setStep] = useState<"cart" | "pay" | "done">("cart");
  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">
        {isUk ? "Оплата через LiqPay / Monobank" : "LiqPay / Monobank Payment Flow"}
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
        {isUk ? "Кошик → форма оплати → webhook підтвердження → сторінка статусу." : "Cart total → payment form → webhook confirmation → order status."}
      </p>
      <div className="max-w-md mx-auto">
        {/* Steps */}
        <div className="flex items-center gap-2 mb-8">
          {(isUk ? ["Кошик", "Оплата", "Статус"] : ["Cart", "Payment", "Status"]).map((s, i) => (
            <div key={s} className="flex-1 flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${i < (step === "cart" ? 1 : step === "pay" ? 2 : 3) ? "bg-green-500 text-white" : "bg-neutral-200 text-neutral-500"}`}>
                {i < (step === "cart" ? 1 : step === "pay" ? 2 : 3) ? "✓" : i + 1}
              </div>
              <span className="text-xs text-neutral-500">{s}</span>
              {i < 2 && <div className="flex-1 h-px bg-neutral-200" />}
            </div>
          ))}
        </div>

        {step === "cart" && (
          <div className="bg-white rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6">
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">{isUk ? "Ваше замовлення" : "Your order"}</h3>
            {[{ name: isUk ? "Навушники Sony WH-1000XM5" : "Sony WH-1000XM5 Headphones", price: 8999 }, { name: isUk ? "Чохол захисний" : "Protective case", price: 299 }].map((item) => (
              <div key={item.name} className="flex justify-between py-2 border-b border-neutral-100 dark:border-neutral-700 text-sm">
                <span className="text-neutral-700">{item.name}</span>
                <span className="font-medium">{item.price.toLocaleString("uk-UA")} ₴</span>
              </div>
            ))}
            <div className="flex justify-between py-3 font-bold text-neutral-900">
              <span>{isUk ? "Разом" : "Total"}</span>
              <span>9 298 ₴</span>
            </div>
            <button onClick={() => setStep("pay")} className="w-full py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors">
              {isUk ? "Перейти до оплати" : "Proceed to payment"}
            </button>
          </div>
        )}

        {step === "pay" && (
          <div className="bg-white rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6">
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">{isUk ? "Спосіб оплати" : "Payment method"}</h3>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {["LiqPay", "Monobank", "Apple Pay"].map((m, i) => (
                <div key={m} className={`rounded-xl border-2 p-3 text-center cursor-pointer text-xs font-semibold ${i === 0 ? "border-green-500 bg-green-50 text-green-700" : "border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 hover:border-neutral-300"}`}>
                  {m}
                </div>
              ))}
            </div>
            <div className="space-y-3 mb-4">
              <input type="text" placeholder="0000 0000 0000 0000" className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 focus:border-green-400 focus:outline-none text-sm font-mono" />
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="MM/YY" className="px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 focus:border-green-400 focus:outline-none text-sm" />
                <input type="text" placeholder="CVV" className="px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 focus:border-green-400 focus:outline-none text-sm" />
              </div>
            </div>
            <div className="bg-green-50 rounded-xl p-3 flex justify-between text-sm mb-4">
              <span className="text-neutral-600">{isUk ? "До оплати:" : "Amount:"}</span>
              <span className="font-bold text-neutral-900">9 298 ₴</span>
            </div>
            <button onClick={() => setStep("done")} className="w-full py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors">
              {isUk ? "Оплатити 9 298 ₴" : "Pay 9,298 ₴"}
            </button>
          </div>
        )}

        {step === "done" && (
          <div className="bg-white rounded-2xl border border-neutral-200 dark:border-neutral-700 p-8 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="font-heading text-xl font-bold text-neutral-900 dark:text-white mb-1">{isUk ? "Оплату прийнято!" : "Payment successful!"}</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">{isUk ? "Замовлення #UA-20264812" : "Order #UA-20264812"}</p>
            <p className="text-xs text-neutral-400 mb-6">{isUk ? "Квитанцію надіслано на email" : "Receipt sent to your email"}</p>
            <button onClick={() => setStep("cart")} className="px-6 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50">
              {isUk ? "Почати знову" : "Start over"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── int-telegram-bot ──── */
function TelegramBotDemo({ isUk }: { isUk: boolean }) {
  const [sent, setSent] = useState(false);
  const [action, setAction] = useState<string | null>(null);

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">
        {isUk ? "Бот Telegram для сповіщень" : "Telegram Notification Bot"}
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
        {isUk ? "Деталі замовлення → повідомлення в Telegram, inline кнопки: Прийняти / Відхилити / Зателефонувати." : "Order details → Telegram message, inline buttons: Accept / Reject / Call client."}
      </p>

      <div className="max-w-lg mx-auto">
        {/* Form that triggers the bot */}
        {!sent ? (
          <div className="bg-white rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6 mb-6">
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">{isUk ? "Нове замовлення (симуляція)" : "New order (simulation)"}</h3>
            <div className="space-y-3 mb-4">
              <input type="text" defaultValue={isUk ? "Олена Мельник" : "Elena Melnyk"} className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 text-sm" readOnly />
              <input type="tel" defaultValue="+38 (067) 123-45-67" className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 text-sm" readOnly />
              <select className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 text-sm">
                <option>{isUk ? "Розробка сайту" : "Website Development"}</option>
              </select>
            </div>
            <button onClick={() => setSent(true)} className="w-full py-3 rounded-xl bg-sky-500 text-white font-semibold hover:bg-sky-600 transition-colors">
              {isUk ? "📤 Відправити → Telegram" : "📤 Send → Telegram"}
            </button>
          </div>
        ) : null}

        {/* Telegram preview */}
        {sent && (
          <div className="bg-[#17212b] rounded-3xl p-6 text-white">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-sm">🤖</div>
              <div>
                <p className="text-sm font-semibold text-white">Codeworth Bot</p>
                <p className="text-xs text-neutral-400">{isUk ? "щойно" : "just now"}</p>
              </div>
            </div>
            <div className="bg-[#232e3c] rounded-2xl p-4 mb-3 text-sm leading-relaxed">
              <p className="text-sky-400 font-bold mb-2">🔔 {isUk ? "НОВА ЗАЯВКА" : "NEW REQUEST"} #{Math.floor(Math.random() * 9000 + 1000)}</p>
              <p><span className="text-neutral-400">👤 {isUk ? "Клієнт:" : "Client:"}</span> {isUk ? "Олена Мельник" : "Elena Melnyk"}</p>
              <p><span className="text-neutral-400">📞 {isUk ? "Телефон:" : "Phone:"}</span> +38 (067) 123-45-67</p>
              <p><span className="text-neutral-400">🛠 {isUk ? "Послуга:" : "Service:"}</span> {isUk ? "Розробка сайту" : "Website Development"}</p>
              <p><span className="text-neutral-400">🌐 {isUk ? "Джерело:" : "Source:"}</span> codeworth.uk</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">26.03.2026 · 14:37</p>
            </div>
            {!action ? (
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "accept", label: isUk ? "✅ Прийняти" : "✅ Accept", color: "bg-green-600 hover:bg-green-500" },
                  { id: "reject", label: isUk ? "❌ Відхилити" : "❌ Reject", color: "bg-red-700 hover:bg-red-600" },
                  { id: "call", label: isUk ? "📞 Зателефонувати" : "📞 Call", color: "bg-sky-700 hover:bg-sky-600" },
                ].map((btn) => (
                  <button key={btn.id} onClick={() => setAction(btn.id)}
                    className={`${btn.color} text-white text-xs font-semibold py-2 rounded-xl transition-colors`}>
                    {btn.label}
                  </button>
                ))}
              </div>
            ) : (
              <div className="bg-[#232e3c] rounded-xl p-3 text-xs text-center">
                <p className="text-neutral-300">
                  {action === "accept" ? (isUk ? "✅ Заявку прийнято" : "✅ Request accepted") :
                   action === "reject" ? (isUk ? "❌ Заявку відхилено" : "❌ Request rejected") :
                   (isUk ? "📞 Дзвінок ініційовано" : "📞 Call initiated")}
                </p>
                <button onClick={() => { setSent(false); setAction(null); }} className="text-sky-400 mt-1 hover:underline">
                  {isUk ? "Ще раз" : "Try again"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── int-google-maps ──── */
const LOCATIONS = [
  { id: 1, name: "Київ, Хрещатик", nameEn: "Kyiv, Khreshchatyk", hours: "09:00–21:00", phone: "+380 44 123 45 67" },
  { id: 2, name: "Київ, Оболонь", nameEn: "Kyiv, Obolon", hours: "10:00–20:00", phone: "+380 44 987 65 43" },
  { id: 3, name: "Львів, Центр", nameEn: "Lviv, City Center", hours: "09:00–20:00", phone: "+380 32 111 22 33" },
  { id: 4, name: "Одеса, Дерибасівська", nameEn: "Odesa, Derybasivska", hours: "10:00–22:00", phone: "+380 48 555 66 77" },
];

function GoogleMapsDemo({ isUk }: { isUk: boolean }) {
  const [active, setActive] = useState<number | null>(1);

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">
        {isUk ? "Карта кількох філій бізнесу" : "Multi-Location Business Map"}
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
        {isUk ? "Кастомні маркери, бічна панель зі списком, клік → highlight + popup." : "Custom markers, sidebar branch list, click → highlight + info popup."}
      </p>
      <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4 bg-neutral-100 dark:bg-neutral-800 rounded-3xl overflow-hidden">
        {/* Sidebar */}
        <div className="sm:w-52 p-4 bg-white space-y-2 shrink-0">
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">{isUk ? "Наші філії" : "Our locations"}</p>
          {LOCATIONS.map((loc) => (
            <button key={loc.id} onClick={() => setActive(loc.id)}
              className={`w-full text-left rounded-xl p-3 text-sm transition-all ${active === loc.id ? "bg-green-100 border border-green-300" : "hover:bg-neutral-50 dark:hover:bg-neutral-800 dark:bg-neutral-900 border border-transparent"}`}>
              <p className={`font-semibold ${active === loc.id ? "text-green-800" : "text-neutral-900"}`}>
                📍 {isUk ? loc.name : loc.nameEn}
              </p>
              <p className="text-xs text-neutral-400 mt-0.5">{loc.hours}</p>
            </button>
          ))}
        </div>

        {/* Map area */}
        <div className="flex-1 relative bg-[#e8ead8] min-h-64 rounded-2xl m-2 overflow-hidden">
          {/* Fake map grid */}
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(150,150,150,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(150,150,150,0.15) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          {/* Fake roads */}
          <div className="absolute inset-0 flex items-center"><div className="h-px bg-white/80 w-full" /></div>
          <div className="absolute inset-0 flex justify-center"><div className="w-px bg-white/80 h-full" /></div>

          {/* Markers */}
          {LOCATIONS.map((loc, i) => {
            const positions = [{ top: "30%", left: "45%" }, { top: "20%", left: "60%" }, { top: "60%", left: "25%" }, { top: "70%", left: "65%" }];
            const pos = positions[i];
            return (
              <button key={loc.id} onClick={() => setActive(loc.id)} style={pos}
                className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all ${active === loc.id ? "scale-125 z-10" : "z-0"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm shadow-lg ${active === loc.id ? "bg-green-600" : "bg-neutral-500"}`}>
                  📍
                </div>
              </button>
            );
          })}

          {/* Popup */}
          {active && (() => {
            const loc = LOCATIONS.find((l) => l.id === active)!;
            const positions = [{ top: "15%", left: "40%" }, { top: "5%", left: "55%" }, { top: "45%", left: "20%" }, { top: "55%", left: "60%" }];
            const pos = positions[active - 1];
            return (
              <div style={pos} className="absolute -translate-x-1/2 bg-white dark:bg-neutral-800 rounded-2xl p-3 shadow-xl z-20 min-w-40">
                <p className="font-semibold text-neutral-900 dark:text-white text-xs">{isUk ? loc.name : loc.nameEn}</p>
                <p className="text-xs text-neutral-500">{loc.hours}</p>
                <p className="text-xs text-green-700 font-medium mt-1">{loc.phone}</p>
                <button className="mt-2 text-xs text-blue-600 hover:underline block">{isUk ? "Маршрут →" : "Directions →"}</button>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── ai-chatbot-rag ──── */
function AiChatbotDemo({ isUk }: { isUk: boolean }) {
  const [msgs, setMsgs] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: isUk ? "👋 Привіт! Я AI-асистент. Запитайте про ціни, терміни або технології." : "👋 Hi! I'm an AI assistant. Ask me about pricing, timelines or tech stack." },
  ]);
  const [input, setInput] = useState("");

  const QUICK = isUk
    ? ["💰 Скільки коштує сайт?", "⏱ Терміни розробки?", "🔧 Який стек?", "📞 Як зв'язатися?"]
    : ["💰 Website cost?", "⏱ Development timeline?", "🔧 Tech stack?", "📞 Contact info?"];

  const answer = (q: string) => {
    const lq = q.toLowerCase();
    if (lq.includes("ціна") || lq.includes("коштує") || lq.includes("cost") || lq.includes("price"))
      return isUk ? "💰 Лендінг: від 12 000 ₴, корпоративний сайт: від 25 000 ₴, магазин: від 45 000 ₴. Точна ціна після безкоштовного брифу." : "💰 Landing page: from £300, corporate site: from £625, e-store: from £1,125. Exact price after a free brief.";
    if (lq.includes("термін") || lq.includes("скільки") || lq.includes("timeline") || lq.includes("days"))
      return isUk ? "⏱ Лендінг: 7–14 днів, сайт-візитка: 5–10 днів, магазин: 6–8 тижнів. Є пришвидшені терміни (+30%)." : "⏱ Landing: 7–14 days, business card: 5–10 days, e-store: 6–8 weeks. Rush option available (+30%).";
    if (lq.includes("стек") || lq.includes("технолог") || lq.includes("stack") || lq.includes("tech"))
      return isUk ? "⚡ Next.js 15, TypeScript, Tailwind CSS v4, PostgreSQL, Vercel — сучасний стек для швидких сайтів." : "⚡ Next.js 15, TypeScript, Tailwind CSS v4, PostgreSQL, Vercel — modern stack for fast sites.";
    if (lq.includes("контакт") || lq.includes("зв'яз") || lq.includes("contact") || lq.includes("phone"))
      return isUk ? "📞 +38 (067) 123-45-67 · Telegram: @Codeworth_ua · hello@codeworth.uk" : "📞 +38 (067) 123-45-67 · Telegram: @Codeworth_ua · hello@codeworth.uk";
    return isUk ? "🤔 Хороше питання! Переключу вас на менеджера — він відповість детально 👨‍💼" : "🤔 Great question! I'll connect you with our manager who can answer in detail 👨‍💼";
  };

  const send = (text?: string) => {
    const t = (text ?? input).trim();
    if (!t) return;
    setMsgs((p) => [...p, { role: "user", text: t }, { role: "bot", text: answer(t) }]);
    setInput("");
  };

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">
        {isUk ? "AI чат-бот з базою знань (RAG)" : "AI Knowledge Base Chatbot (RAG)"}
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
        {isUk ? "GPT-4o навчений на документах клієнта. Відповідає на FAQ 24/7, fallback на живого оператора." : "GPT-4o trained on client's documents. Answers FAQ 24/7, falls back to a live agent."}
      </p>
      <div className="max-w-md mx-auto rounded-3xl overflow-hidden shadow-xl border border-neutral-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg">🧠</div>
          <div>
            <p className="font-semibold text-white text-sm">{isUk ? "AI Асистент" : "AI Assistant"}</p>
            <p className="text-xs text-indigo-200 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
              {isUk ? "Онлайн · GPT-4o · RAG" : "Online · GPT-4o · RAG"}
            </p>
          </div>
          <button className="ml-auto text-xs bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-full font-medium transition-colors">
            {isUk ? "👨‍💼 Оператор" : "👨‍💼 Operator"}
          </button>
        </div>

        {/* Messages */}
        <div className="bg-white min-h-56 max-h-72 overflow-y-auto p-4 space-y-3">
          {msgs.map((m, i) => (
            <div key={i} className={`flex items-end gap-2 ${m.role === "user" ? "justify-end" : ""}`}>
              {m.role === "bot" && (
                <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-xs shrink-0">🧠</div>
              )}
              <div className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.role === "user" ? "bg-indigo-600 text-white rounded-br-none" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-bl-none"}`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Quick questions */}
        <div className="bg-white border-t border-neutral-100 dark:border-neutral-700 px-4 py-2 flex gap-1.5 flex-wrap">
          {QUICK.map((q) => (
            <button key={q} onClick={() => send(q.slice(2).trim())}
              className="text-xs px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full hover:bg-indigo-100 transition-colors whitespace-nowrap">
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700 px-4 py-3 flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder={isUk ? "Задайте питання..." : "Ask a question..."}
            className="flex-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-400" />
          <button onClick={() => send()}
            className="w-10 h-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center justify-center transition-colors text-base font-bold">
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── admin-blog ──── */
const BLOG_POSTS_DATA = [
  { id: 1, titleUk: "Як обрати платформу для сайту", title: "How to Choose a Website Platform", catUk: "Порада", cat: "Tips", status: "published" as const, date: "2026-04-28", views: 1240 },
  { id: 2, titleUk: "Next.js 15 — що нового", title: "Next.js 15 — What's New", catUk: "Технології", cat: "Tech", status: "published" as const, date: "2026-04-22", views: 3120 },
  { id: 3, titleUk: "SEO для малого бізнесу", title: "SEO for Small Business", catUk: "SEO", cat: "SEO", status: "draft" as const, date: "2026-04-30", views: 0 },
  { id: 4, titleUk: "Кейс: ресторан +60% броней", title: "Case: restaurant +60% bookings", catUk: "Кейс", cat: "Case Study", status: "published" as const, date: "2026-04-15", views: 876 },
  { id: 5, titleUk: "Чеклист запуску сайту", title: "Website Launch Checklist", catUk: "Гайд", cat: "Guide", status: "draft" as const, date: "2026-04-29", views: 0 },
];

type BlogPost = typeof BLOG_POSTS_DATA[number];

function AdminBlogDemo({ isUk }: { isUk: boolean }) {
  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS_DATA);
  const [showNew, setShowNew] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [delId, setDelId] = useState<number | null>(null);

  const toggleStatus = (id: number) =>
    setPosts((p) => p.map((post) => post.id === id ? { ...post, status: post.status === "published" ? "draft" as const : "published" as const } : post));
  const deletePost = (id: number) => { setPosts((p) => p.filter((post) => post.id !== id)); setDelId(null); };
  const addPost = () => {
    if (!newTitle.trim()) return;
    setPosts((p) => [...p, { id: Date.now(), titleUk: newTitle, title: newTitle, catUk: "Новий", cat: "New", status: "draft" as const, date: "2026-05-01", views: 0 }]);
    setNewTitle(""); setShowNew(false);
  };

  const published = posts.filter((p) => p.status === "published").length;
  const drafts = posts.filter((p) => p.status === "draft").length;

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">
        {isUk ? "Адмін-панель блогу (CRUD)" : "Blog Admin Panel (CRUD)"}
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
        {isUk ? "Управління статтями: публікація, чернетки, видалення. Rich-text редактор + preview." : "Manage articles: publish, drafts, delete. Rich-text editor + preview."}
      </p>
      <div className="max-w-3xl mx-auto">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
          <div className="flex gap-4 text-sm">
            <span className="text-neutral-500">{isUk ? "Всього:" : "Total:"} <strong className="text-neutral-900">{posts.length}</strong></span>
            <span className="text-green-700">{isUk ? "Опубліковано:" : "Published:"} <strong>{published}</strong></span>
            <span className="text-amber-700">{isUk ? "Чернеток:" : "Drafts:"} <strong>{drafts}</strong></span>
          </div>
          <button onClick={() => setShowNew(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">
            + {isUk ? "Нова стаття" : "New Article"}
          </button>
        </div>

        {/* New article form */}
        {showNew && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 mb-4 flex gap-3">
            <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
              placeholder={isUk ? "Заголовок нової статті..." : "New article title..."}
              className="flex-1 px-4 py-2 rounded-xl border border-indigo-200 text-sm focus:outline-none focus:border-indigo-400 bg-white" />
            <button onClick={addPost} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">
              {isUk ? "Додати" : "Add"}
            </button>
            <button onClick={() => setShowNew(false)} className="px-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 rounded-xl text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800 dark:bg-neutral-900 transition-colors">
              {isUk ? "Скасувати" : "Cancel"}
            </button>
          </div>
        )}

        {/* Table */}
        <div className="bg-white border border-neutral-200 dark:border-neutral-700 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 dark:border-neutral-700 bg-neutral-50">
                <th className="text-left px-4 py-3 font-semibold text-neutral-500 dark:text-neutral-400 text-xs uppercase tracking-wide">{isUk ? "Заголовок" : "Title"}</th>
                <th className="text-left px-4 py-3 font-semibold text-neutral-500 dark:text-neutral-400 text-xs uppercase tracking-wide hidden sm:table-cell">{isUk ? "Категорія" : "Category"}</th>
                <th className="text-left px-4 py-3 font-semibold text-neutral-500 dark:text-neutral-400 text-xs uppercase tracking-wide">{isUk ? "Статус" : "Status"}</th>
                <th className="text-right px-4 py-3 font-semibold text-neutral-500 dark:text-neutral-400 text-xs uppercase tracking-wide hidden md:table-cell">{isUk ? "Перегляди" : "Views"}</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-neutral-100 dark:border-neutral-700 last:border-0 hover:bg-neutral-50 dark:hover:bg-neutral-800 dark:bg-neutral-900 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-neutral-900 dark:text-white leading-tight">{isUk ? post.titleUk : post.title}</p>
                    <p className="text-xs text-neutral-400 mt-0.5">{post.date}</p>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 px-2 py-1 rounded-full">{isUk ? post.catUk : post.cat}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleStatus(post.id)}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full transition-colors ${post.status === "published" ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-amber-100 text-amber-700 hover:bg-amber-200"}`}>
                      {post.status === "published" ? (isUk ? "✓ Опубліковано" : "✓ Published") : (isUk ? "✎ Чернетка" : "✎ Draft")}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right text-neutral-500 dark:text-neutral-400 hidden md:table-cell">
                    {post.views > 0 ? post.views.toLocaleString("uk-UA") : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button className="w-7 h-7 rounded-lg hover:bg-indigo-50 text-indigo-600 flex items-center justify-center transition-colors text-xs">✎</button>
                      <button onClick={() => setDelId(post.id)} className="w-7 h-7 rounded-lg hover:bg-red-50 text-red-500 flex items-center justify-center transition-colors text-xs">✕</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete confirm modal */}
      {delId !== null && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="font-bold text-neutral-900 dark:text-white mb-2">{isUk ? "Видалити статтю?" : "Delete article?"}</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-5">{isUk ? "Цю дію неможливо скасувати." : "This action cannot be undone."}</p>
            <div className="flex gap-3">
              <button onClick={() => deletePost(delId)} className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors">{isUk ? "Видалити" : "Delete"}</button>
              <button onClick={() => setDelId(null)} className="flex-1 py-2.5 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 rounded-xl text-sm font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-800 dark:bg-neutral-900 transition-colors">{isUk ? "Скасувати" : "Cancel"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────── ecom-bundle-builder ──── */
type BundleItem = { id: string; nameUk: string; name: string; price: number; emoji: string; selected: boolean };

const BUNDLE_ITEMS_DATA: BundleItem[] = [
  { id: "a", nameUk: "Кава Espresso 250г", name: "Espresso Blend 250g", price: 290, emoji: "☕", selected: true },
  { id: "b", nameUk: "Кава Arabica 250г", name: "Single Origin Arabica 250g", price: 350, emoji: "🫘", selected: false },
  { id: "c", nameUk: "Кемекс 6 чашок", name: "Chemex 6-cup", price: 1200, emoji: "🫗", selected: true },
  { id: "d", nameUk: "Кавомолка ручна", name: "Hand Grinder", price: 950, emoji: "🔧", selected: false },
  { id: "e", nameUk: "Фірмова чашка 350мл", name: "Branded Mug 350ml", price: 280, emoji: "🧇", selected: true },
  { id: "f", nameUk: "Фільтри паперові ×50", name: "Paper Filters ×50", price: 120, emoji: "📋", selected: false },
];

function BundleBuilderDemo({ isUk }: { isUk: boolean }) {
  const [items, setItems] = useState<BundleItem[]>(BUNDLE_ITEMS_DATA);
  const [added, setAdded] = useState(false);

  const toggle = (id: string) => { setItems((p) => p.map((it) => it.id === id ? { ...it, selected: !it.selected } : it)); setAdded(false); };
  const selected = items.filter((i) => i.selected);
  const subtotal = selected.reduce((s, i) => s + i.price, 0);
  const discount = selected.length >= 3 ? 0.12 : selected.length === 2 ? 0.07 : 0;
  const total = Math.round(subtotal * (1 - discount));

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">
        {isUk ? "Bundle Builder — Конструктор комплектів" : "Bundle Builder"}
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
        {isUk ? "Клієнт збирає набір — отримує знижку. 2 товари = −7%, 3+ = −12%. Збільшує AOV на 20–30%." : "Customer builds a bundle and gets a discount. 2 items = −7%, 3+ = −12%. Increases AOV by 20–30%."}
      </p>
      <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-6">
        {/* Product grid */}
        <div className="flex-1">
          <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-3">{isUk ? "Оберіть товари:" : "Choose items:"}</p>
          <div className="grid grid-cols-2 gap-3">
            {items.map((item) => (
              <button key={item.id} onClick={() => toggle(item.id)}
                className={`rounded-2xl p-4 text-left border-2 transition-all ${item.selected ? "border-amber-500 bg-amber-50 shadow-sm" : "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-amber-300"}`}>
                <div className="text-2xl mb-2">{item.emoji}</div>
                <p className="text-sm font-semibold text-neutral-900 dark:text-white leading-tight">{isUk ? item.nameUk : item.name}</p>
                <p className="text-sm font-bold text-amber-700 mt-1">{fmtUah(item.price, isUk)}</p>
                {item.selected && <p className="text-xs text-amber-600 mt-1 font-medium">✓ {isUk ? "Додано" : "Added"}</p>}
              </button>
            ))}
          </div>
        </div>

        {/* Summary sidebar */}
        <div className="sm:w-52 shrink-0">
          <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-3">{isUk ? "Ваш набір:" : "Your bundle:"}</p>
          <div className="bg-white border border-neutral-200 dark:border-neutral-700 rounded-2xl p-4 sticky top-4">
            {selected.length === 0 ? (
              <p className="text-sm text-neutral-400 text-center py-4">{isUk ? "Нічого не обрано" : "Nothing selected"}</p>
            ) : (
              <>
                <div className="space-y-2 mb-4">
                  {selected.map((i) => (
                    <div key={i.id} className="flex justify-between text-sm gap-2">
                      <span className="text-neutral-700 dark:text-neutral-300 truncate">{i.emoji} {isUk ? i.nameUk.split(" ")[0] : i.name.split(" ")[0]}</span>
                      <span className="font-medium shrink-0">{fmtUah(i.price, isUk)}</span>
                    </div>
                  ))}
                </div>
                {discount > 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-3">
                    <p className="text-xs font-bold text-green-700">🎉 {isUk ? `Знижка −${discount * 100}%` : `Discount −${discount * 100}%`}</p>
                    <p className="text-xs text-green-600 mt-0.5">{isUk ? `−${subtotal - total} ₴ заощаджено` : `−${fmtUah(subtotal - total, isUk)} saved`}</p>
                  </div>
                )}
                {selected.length > 0 && selected.length < 3 && (
                  <p className="text-xs text-neutral-400 mb-3 text-center">
                    {isUk ? `+${3 - selected.length} для знижки −12%` : `+${3 - selected.length} more for −12%`}
                  </p>
                )}
                <div className="border-t border-neutral-100 dark:border-neutral-700 pt-3 mb-4">
                  {discount > 0 && <p className="text-xs text-neutral-400 line-through text-right">{fmtUah(subtotal, isUk)}</p>}
                  <p className="text-right font-bold text-neutral-900 dark:text-white text-lg">{fmtUah(total, isUk)}</p>
                </div>
                {!added ? (
                  <button onClick={() => setAdded(true)} className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm font-semibold transition-colors">
                    🧺 {isUk ? "У кошик" : "Add to cart"}
                  </button>
                ) : (
                  <div className="bg-green-100 rounded-xl p-3 text-center">
                    <p className="text-sm font-bold text-green-700">✅ {isUk ? "Додано!" : "Added!"}</p>
                    <button onClick={() => setAdded(false)} className="text-xs text-green-600 mt-1 hover:underline">{isUk ? "Змінити" : "Change"}</button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── ai-smart-search ──── */
const SMART_SEARCH_ITEMS = [
  { nameUk: "Смартфон Samsung Galaxy S24", name: "Samsung Galaxy S24", cat: "Electronics", catUk: "Електроніка", price: 28999, icon: "📱", tags: ["android", "phone", "camera", "mobile"] },
  { nameUk: "Навушники Sony WH-1000XM5", name: "Sony WH-1000XM5 Headphones", cat: "Audio", catUk: "Аудіо", price: 9899, icon: "🎧", tags: ["wireless", "noise-canceling", "audio", "music"] },
  { nameUk: "Ноутбук Apple MacBook Air M3", name: "Apple MacBook Air M3", cat: "Computers", catUk: "Комп'ютери", price: 54999, icon: "💻", tags: ["laptop", "apple", "macos", "work", "study"] },
  { nameUk: "Бездротові навушники AirPods Pro", name: "AirPods Pro 2nd Gen", cat: "Audio", catUk: "Аудіо", price: 8499, icon: "🎧", tags: ["wireless", "apple", "earbuds", "music"] },
  { nameUk: "Планшет iPad Air 11", name: "iPad Air 11-inch", cat: "Tablets", catUk: "Планшети", price: 32999, icon: "📱", tags: ["tablet", "apple", "touch", "study"] },
  { nameUk: "Спортивний годинник Garmin", name: "Garmin Forerunner Watch", cat: "Wearables", catUk: "Носимі пристрої", price: 12999, icon: "⌚", tags: ["fitness", "gps", "sports", "running"] },
  { nameUk: "Кабель USB-C 2м", name: "USB-C Charging Cable 2m", cat: "Accessories", catUk: "Аксесуари", price: 299, icon: "🔌", tags: ["cable", "charging", "usb"] },
];

const SEMANTIC_INTENTS: Record<string, number[]> = {
  "музика": [1, 3], "music": [1, 3],
  "слухати": [1, 3], "listen": [1, 3],
  "спорт": [5], "sport": [5],
  "фітнес": [5], "fitness": [5], "пробіжка": [5], "running": [5],
  "навчання": [2, 4], "study": [2, 4], "навч": [2, 4],
  "робота": [2], "work": [2],
  "яблуко": [2, 3, 4], "apple": [2, 3, 4],
  "бездрот": [1, 3], "wireless": [1, 3],
};

function AiSmartSearchDemo({ isUk }: { isUk: boolean }) {
  const [q, setQ] = useState("");

  const getResults = () => {
    const lq = q.trim().toLowerCase();
    if (!lq) return [];
    for (const [key, indices] of Object.entries(SEMANTIC_INTENTS)) {
      if (lq.includes(key)) return indices.map((i) => SMART_SEARCH_ITEMS[i]);
    }
    return SMART_SEARCH_ITEMS.filter(
      (item) =>
        item.name.toLowerCase().includes(lq) ||
        item.nameUk.toLowerCase().includes(lq) ||
        item.tags.some((t) => t.includes(lq)) ||
        item.cat.toLowerCase().includes(lq)
    );
  };

  const results = getResults();
  const isSemantic =
    q.trim().length > 1 &&
    results.length > 0 &&
    !SMART_SEARCH_ITEMS.some(
      (i) =>
        i.name.toLowerCase().includes(q.trim().toLowerCase()) ||
        i.nameUk.toLowerCase().includes(q.trim().toLowerCase())
    );

  const SUGGESTIONS = isUk
    ? ["слухати музику", "для спорту", "для навчання", "Apple", "бездротові"]
    : ["listen to music", "for sport", "for study", "Apple", "wireless"];

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">
        {isUk ? "Семантичний AI-пошук" : "AI Semantic Search"}
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
        {isUk
          ? `Спробуйте: "слухати музику", "для спорту", "для навчання" — AI розуміє намір, не лише слова.`
          : `Try: "listen to music", "for sport", "for studying" — AI understands intent, not just keywords.`}
      </p>
      <div className="max-w-xl mx-auto">
        <div className="relative mb-3">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-lg">🔍</span>
          <input value={q} onChange={(e) => setQ(e.target.value)} type="search"
            placeholder={isUk ? `Спробуйте "слухати музику" або "смартфон"` : `Try "listen to music" or "smartphone"`}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-neutral-200 dark:border-neutral-700 focus:border-indigo-400 focus:outline-none text-sm shadow-sm" />
          {isSemantic && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full font-semibold">
              🧠 AI Semantic
            </span>
          )}
        </div>

        {/* Suggestion chips */}
        {!q && (
          <div className="flex gap-2 flex-wrap mb-4">
            {SUGGESTIONS.map((s) => (
              <button key={s} onClick={() => setQ(s)}
                className="text-xs px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-indigo-50 text-neutral-600 dark:text-neutral-300 hover:text-indigo-700 rounded-full transition-colors">
                {s}
              </button>
            ))}
          </div>
        )}

        {q.trim().length > 1 && (
          <div className="bg-white rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-sm overflow-hidden">
            {results.length === 0 ? (
              <p className="px-5 py-6 text-sm text-neutral-400 text-center">{isUk ? "Нічого не знайдено" : "Nothing found"}</p>
            ) : (
              <>
                {isSemantic && (
                  <div className="px-5 py-3 bg-indigo-50 border-b border-indigo-100 flex items-center gap-2">
                    <span className="text-sm">🧠</span>
                    <p className="text-xs text-indigo-700 font-medium">
                      {isUk ? `AI зрозумів намір: "${q}" → знайдено семантично схожі товари` : `AI understood intent: "${q}" → semantically similar results`}
                    </p>
                  </div>
                )}
                {results.map((r, i) => (
                  <div key={i} className="px-5 py-3 flex items-center gap-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 dark:bg-neutral-900 transition-colors border-b border-neutral-100 dark:border-neutral-700 last:border-0 cursor-pointer">
                    <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 rounded-xl flex items-center justify-center text-xl shrink-0">{r.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">{isUk ? r.nameUk : r.name}</p>
                      <p className="text-xs text-neutral-400">{isUk ? r.catUk : r.cat}</p>
                    </div>
                    <p className="text-sm font-bold text-neutral-900 dark:text-white shrink-0">{r.price.toLocaleString("uk-UA")} ₴</p>
                  </div>
                ))}
                <div className="px-5 py-2 bg-neutral-50 dark:bg-neutral-900 flex justify-between text-xs text-neutral-400">
                  <span>{isUk ? `${results.length} результатів` : `${results.length} result${results.length !== 1 ? "s" : ""}`}</span>
                  {isSemantic && <span className="text-indigo-500 font-medium">Vector Embeddings · Pinecone</span>}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── admin-appointments ──── */
type ApptStatus = "confirmed" | "pending" | "cancelled";
type Appt = { id: number; time: string; nameUk: string; name: string; serviceUk: string; service: string; status: ApptStatus; masterUk: string; master: string };

const APPTS_DATA: Appt[] = [
  { id: 1, time: "09:00", nameUk: "Олена Ткаченко", name: "Elena Tkachenko", serviceUk: "Стрижка + укладка", service: "Cut + Blow Dry", status: "confirmed", masterUk: "Аліна", master: "Alina" },
  { id: 2, time: "10:30", nameUk: "Сергій Мороз", name: "Sergiy Moroz", serviceUk: "Чоловіча стрижка", service: "Men's Haircut", status: "pending", masterUk: "Дмитро", master: "Dmytro" },
  { id: 3, time: "11:00", nameUk: "Наталя Савчук", name: "Natalya Savchuk", serviceUk: "Фарбування коренів", service: "Root Color", status: "confirmed", masterUk: "Аліна", master: "Alina" },
  { id: 4, time: "13:30", nameUk: "Ірина Бойко", name: "Iryna Boyko", serviceUk: "Манікюр + гель", service: "Manicure + Gel", status: "pending", masterUk: "Катерина", master: "Kateryna" },
  { id: 5, time: "15:00", nameUk: "Людмила Крат", name: "Lyudmyla Krat", serviceUk: "Ламінування вій", service: "Lash Lamination", status: "confirmed", masterUk: "Катерина", master: "Kateryna" },
  { id: 6, time: "16:30", nameUk: "Оксана Пилипенко", name: "Oksana Pylypenko", serviceUk: "Стрижка дитяча", service: "Kids Haircut", status: "cancelled", masterUk: "Аліна", master: "Alina" },
];

const APPT_STATUS_STYLES: Record<ApptStatus, string> = {
  confirmed: "bg-green-100 text-green-700",
  pending: "bg-amber-100 text-amber-700",
  cancelled: "bg-red-100 text-red-500",
};

function AdminAppointmentsDemo({ isUk }: { isUk: boolean }) {
  const [appts, setAppts] = useState<Appt[]>(APPTS_DATA);
  const [activeDay, setActiveDay] = useState(0);

  const DAYS = isUk
    ? ["Пн 30/04", "Вт 01/05", "Ср 02/05", "Чт 03/05", "Пт 04/05"]
    : ["Mon Apr 30", "Tue May 1", "Wed May 2", "Thu May 3", "Fri May 4"];

  const setStatus = (id: number, status: ApptStatus) =>
    setAppts((p) => p.map((a) => a.id === id ? { ...a, status } : a));

  const confirmed = appts.filter((a) => a.status === "confirmed").length;
  const pending = appts.filter((a) => a.status === "pending").length;
  const cancelled = appts.filter((a) => a.status === "cancelled").length;

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">
        {isUk ? "Адмін-панель записів (Календар)" : "Appointments Admin Panel (Calendar)"}
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
        {isUk ? "Управління записами: підтвердження, скасування, нотифікація клієнту. Drag & drop перенесення." : "Manage bookings: confirm, cancel, notify client. Drag & drop reschedule."}
      </p>
      <div className="max-w-2xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: isUk ? "Підтверджено" : "Confirmed", val: confirmed, color: "bg-green-100 text-green-700" },
            { label: isUk ? "Очікують" : "Pending", val: pending, color: "bg-amber-100 text-amber-700" },
            { label: isUk ? "Скасовано" : "Cancelled", val: cancelled, color: "bg-red-100 text-red-600" },
          ].map((s) => (
            <div key={s.label} className={`rounded-2xl px-4 py-3 ${s.color}`}>
              <p className="text-2xl font-bold">{s.val}</p>
              <p className="text-xs font-medium mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Day tabs */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
          {DAYS.map((d, i) => (
            <button key={d} onClick={() => setActiveDay(i)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${activeDay === i ? "bg-indigo-600 text-white" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-indigo-50"}`}>
              {d}
            </button>
          ))}
        </div>

        {/* Appointments list */}
        <div className="space-y-2">
          {appts.map((appt) => (
            <div key={appt.id} className={`bg-white border border-neutral-200 dark:border-neutral-700 rounded-2xl px-4 py-3 flex items-center gap-4 transition-opacity ${appt.status === "cancelled" ? "opacity-50" : ""}`}>
              <div className="w-14 text-center shrink-0">
                <p className="font-bold text-neutral-900 dark:text-white text-sm">{appt.time}</p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-neutral-900 dark:text-white text-sm leading-tight">{isUk ? appt.nameUk : appt.name}</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{isUk ? appt.serviceUk : appt.service} · {isUk ? appt.masterUk : appt.master}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${APPT_STATUS_STYLES[appt.status]}`}>
                  {appt.status === "confirmed" ? (isUk ? "✓ Підтвердж." : "✓ Confirmed") :
                   appt.status === "pending" ? (isUk ? "⋯ Очікує" : "⋯ Pending") :
                   (isUk ? "✕ Скасовано" : "✕ Cancelled")}
                </span>
                {appt.status === "pending" && (
                  <button onClick={() => setStatus(appt.id, "confirmed")}
                    title={isUk ? "Підтвердити" : "Confirm"}
                    className="w-7 h-7 rounded-lg bg-green-100 hover:bg-green-200 text-green-700 flex items-center justify-center text-xs font-bold transition-colors">✓</button>
                )}
                {appt.status !== "cancelled" && (
                  <button onClick={() => setStatus(appt.id, "cancelled")}
                    title={isUk ? "Скасувати" : "Cancel"}
                    className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center text-xs transition-colors">✕</button>
                )}
                {appt.status === "cancelled" && (
                  <button onClick={() => setStatus(appt.id, "pending")}
                    title={isUk ? "Відновити" : "Restore"}
                    className="w-7 h-7 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-600 dark:text-neutral-300 flex items-center justify-center text-xs transition-colors">↺</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── feat-before-after ──── */
function BeforeAfterDemo({ isUk }: { isUk: boolean }) {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [scene, setScene] = useState<"web" | "reno">("web");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const up = () => setDragging(false);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    return () => { window.removeEventListener("mouseup", up); window.removeEventListener("touchend", up); };
  }, []);

  const update = (clientX: number) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos(Math.min(95, Math.max(5, ((clientX - r.left) / r.width) * 100)));
  };

  const scenes = [
    { key: "web" as const, label: isUk ? "🖥 Редизайн сайту" : "🖥 Website Redesign" },
    { key: "reno" as const, label: isUk ? "🏠 Ремонт" : "🏠 Renovation" },
  ];

  const BeforeContent = () => scene === "web" ? (
    <div className="w-full h-full bg-gray-100 dark:bg-neutral-800 p-4" style={{ fontFamily: "Georgia, serif" }}>
      <div className="bg-gray-600 text-white px-3 py-2 text-xs">Welcome to our company website</div>
      <div className="mt-2 flex gap-3 text-xs text-blue-700 underline"><span>Home</span><span>Services</span><span>About</span><span>Contact</span></div>
      <div className="mt-3">
        <p className="text-base font-bold text-gray-800">We Offer Quality Services</p>
        <p className="text-xs text-gray-600 dark:text-neutral-300 mt-1 leading-relaxed">Click here for more information about our company and the services we provide to our valued customers since 1998.</p>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-1.5 text-xs">
        <div className="bg-gray-200 border border-gray-400 p-2">▶ Service 1</div>
        <div className="bg-gray-200 border border-gray-400 p-2">▶ Service 2</div>
      </div>
      <p className="mt-3 text-xs text-gray-400">© 2008 Company Name. All Rights Reserved.</p>
    </div>
  ) : (
    <div className="w-full h-full bg-amber-50 p-4">
      <div className="w-full h-28 bg-gradient-to-b from-amber-200/60 to-amber-100 rounded-xl flex items-center justify-center mb-3">
        <div className="text-center"><div className="text-4xl">🏚</div><p className="text-xs text-amber-700 mt-1">{isUk ? "До ремонту" : "Before reno"}</p></div>
      </div>
      {(isUk ? ["🟫 Стара кахель", "🟫 Тріщини на стелі", "🟫 Ржаві труби"] : ["🟫 Old tiles", "🟫 Ceiling cracks", "🟫 Rusty pipes"]).map(t => (
        <div key={t} className="text-xs text-amber-800 bg-amber-100/70 rounded px-2 py-1 mb-1">{t}</div>
      ))}
    </div>
  );

  const AfterContent = () => scene === "web" ? (
    <div className="w-full h-full bg-gradient-to-br from-indigo-950 to-violet-900 p-4 text-white">
      <div className="flex items-center justify-between mb-3">
        <span className="font-bold text-sm">🚀 BrandName</span>
        <div className="flex gap-2 text-xs text-indigo-300"><span>Services</span><span>Cases</span></div>
      </div>
      <p className="text-base font-extrabold leading-tight mb-1">{isUk ? "Ваш бізнес — у 10× ефективніший" : "Your Business, 10× More Effective"}</p>
      <p className="text-xs text-indigo-300 mb-3">{isUk ? "Сучасний сайт від Codeworth" : "Modern website by Codeworth"}</p>
      <button className="px-4 py-1.5 bg-amber-400 text-indigo-950 rounded-lg text-xs font-bold mb-3">{isUk ? "Отримати сайт →" : "Get a Website →"}</button>
      <div className="grid grid-cols-2 gap-1.5 text-xs">
        <div className="bg-white/10 rounded-xl p-2">⚡ Score 98</div>
        <div className="bg-white/10 rounded-xl p-2">🔒 SEO Ready</div>
      </div>
    </div>
  ) : (
    <div className="w-full h-full bg-gradient-to-br from-teal-50 to-cyan-50 p-4">
      <div className="w-full h-28 bg-gradient-to-b from-teal-200/60 to-teal-100 rounded-xl flex items-center justify-center mb-3">
        <div className="text-center"><div className="text-4xl">🏡</div><p className="text-xs text-teal-700 mt-1">{isUk ? "Після ремонту" : "After reno"}</p></div>
      </div>
      {(isUk ? ["✅ Сучасна плитка", "✅ Натяжна стеля", "✅ Нові комунікації"] : ["✅ Modern tiles", "✅ Stretch ceiling", "✅ New plumbing"]).map(t => (
        <div key={t} className="text-xs text-teal-800 bg-teal-100/70 rounded px-2 py-1 mb-1">{t}</div>
      ))}
    </div>
  );

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">
        {isUk ? "Before / After слайдер" : "Before / After Slider"}
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-6">
        {isUk ? "Перетягніть повзунок щоб порівняти. Ідеально для ремонту, стоматології, косметології та редизайну." : "Drag the handle to compare. Perfect for renovation, dentistry, beauty, and website redesigns."}
      </p>

      <div className="flex gap-2 mb-5">
        {scenes.map(s => (
          <button key={s.key} onClick={() => { setScene(s.key); setPos(50); }}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${scene === s.key ? "bg-indigo-600 text-white" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200"}`}>
            {s.label}
          </button>
        ))}
      </div>

      <div className="max-w-lg mx-auto">
        <div ref={ref}
          className="relative rounded-2xl overflow-hidden h-64 cursor-col-resize select-none shadow-xl border border-neutral-200"
          onMouseMove={e => { if (dragging) update(e.clientX); }}
          onTouchMove={e => update(e.touches[0].clientX)}>

          {/* Before — base layer */}
          <div className="absolute inset-0"><BeforeContent /></div>

          {/* After — clipped overlay */}
          <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <AfterContent />
          </div>

          {/* Divider line */}
          <div className="absolute top-0 bottom-0 w-0.5 bg-white dark:bg-neutral-800 shadow-lg pointer-events-none" style={{ left: `calc(${pos}% - 1px)` }} />

          {/* Handle */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center cursor-col-resize z-10 border border-neutral-200"
            style={{ left: `${pos}%` }}
            onMouseDown={() => setDragging(true)}
            onTouchStart={() => setDragging(true)}>
            <span className="text-neutral-400 text-sm select-none font-bold">⇔</span>
          </div>

          {/* Labels */}
          <div className="absolute top-3 left-3 px-2 py-1 bg-black/50 text-white text-xs rounded-lg font-medium backdrop-blur-sm pointer-events-none">
            {isUk ? "✨ Після" : "✨ After"}
          </div>
          <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 text-white text-xs rounded-lg font-medium backdrop-blur-sm pointer-events-none">
            {isUk ? "До" : "Before"}
          </div>
        </div>

        <p className="text-center text-xs text-neutral-400 mt-3 select-none">
          {isUk ? "← перетягніть повзунок →" : "← drag the handle →"}
        </p>

        <div className="mt-5 grid grid-cols-4 gap-2 text-center">
          {(isUk
            ? ["🦷 Стоматологія", "💪 Фітнес", "🏗 Будівництво", "💄 Косметологія"]
            : ["🦷 Dentistry", "💪 Fitness", "🏗 Construction", "💄 Beauty"]
          ).map(tag => (
            <span key={tag} className="text-xs py-1.5 bg-indigo-50 text-indigo-700 rounded-xl">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── feat-lead-quiz ──── */
type QuizStep = { q: string; opts: string[] };

function LeadQuizDemo({ isUk }: { isUk: boolean }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [done, setDone] = useState(false);

  const STEPS: QuizStep[] = isUk ? [
    { q: "Що вам потрібно?", opts: ["🌐 Новий сайт", "🛒 Інтернет-магазин", "✏️ Редизайн", "📱 Мобільний додаток"] },
    { q: "Який ваш бюджет?", opts: ["до 10 000 ₴", "10–30 000 ₴", "30–100 000 ₴", "100 000+ ₴"] },
    { q: "Коли потрібен результат?", opts: ["⚡ Якнайшвидше", "📅 Через місяць", "🗓 Через 3 місяці"] },
  ] : [
    { q: "What do you need?", opts: ["🌐 New website", "🛒 Online store", "✏️ Redesign", "📱 Mobile app"] },
    { q: "What's your budget?", opts: ["Under £250", "£250–£750", "£750–£2,500", "£2,500+"] },
    { q: "When do you need it?", opts: ["⚡ ASAP", "📅 In 1 month", "🗓 In 3 months"] },
  ];

  const total = STEPS.length + 1;
  const progressPct = Math.round((step / total) * 100);

  const RESULT_MAP: Record<string, string> = {
    "🌐 Новий сайт": "💡 Рекомендуємо: Лендінг або корпоративний сайт",
    "🛒 Інтернет-магазин": "💡 Рекомендуємо: Міні-магазин з кошиком та оплатою",
    "✏️ Редизайн": "💡 Рекомендуємо: Before/After аудит + редизайн",
    "📱 Мобільний додаток": "💡 Рекомендуємо: PWA або Telegram Mini App",
    "🌐 New website": "💡 Recommended: Landing page or corporate site",
    "🛒 Online store": "💡 Recommended: Mini-shop with cart and payment",
    "✏️ Redesign": "💡 Recommended: UX audit + redesign",
    "📱 Mobile app": "💡 Recommended: PWA or Telegram Mini App",
  };

  const pick = (opt: string) => {
    setAnswers(p => [...p, opt]);
    setStep(p => p + 1);
  };

  const submit = (e: React.FormEvent) => { e.preventDefault(); setDone(true); };
  const reset = () => { setStep(0); setAnswers([]); setForm({ name: "", email: "" }); setDone(false); };

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">
        {isUk ? "Інтерактивний квіз — лідогенератор" : "Interactive Lead Quiz"}
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
        {isUk ? "Клієнт відповідає на 3 запитання → форма заявки → персоналізована рекомендація. Знижує вартість ліда на 30–50%." : "Client answers 3 questions → contact form → personalised recommendation. Reduces lead cost by 30–50%."}
      </p>

      <div className="max-w-md mx-auto">
        <div className="bg-white border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6 shadow-lg">
          {done ? (
            <div className="text-center py-4">
              <div className="text-5xl mb-4">🎉</div>
              <p className="font-bold text-neutral-900 dark:text-white text-lg mb-1">
                {isUk ? `Дякуємо, ${form.name || ""}!` : `Thank you, ${form.name || ""}!`}
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                {isUk ? "Менеджер зв'яжеться з вами протягом 2 годин." : "Our manager will contact you within 2 hours."}
              </p>
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 text-sm text-indigo-700 mb-5">
                {RESULT_MAP[answers[0]] ?? (isUk ? "💡 Ми підберемо оптимальне рішення" : "💡 We'll find the best solution for you")}
              </div>
              <div className="text-xs text-neutral-400 mb-4">
                {answers.map((a, i) => <span key={i} className="inline-block bg-neutral-100 dark:bg-neutral-800 rounded-full px-2 py-0.5 mr-1 mb-1">{a}</span>)}
              </div>
              <button onClick={reset} className="text-sm text-indigo-600 hover:underline">{isUk ? "↩ Пройти знову" : "↩ Start over"}</button>
            </div>
          ) : (
            <>
              {/* Progress bar */}
              <div className="mb-6">
                <div className="flex justify-between text-xs text-neutral-400 mb-2">
                  <span>{isUk ? `Крок ${step + 1} з ${total}` : `Step ${step + 1} of ${total}`}</span>
                  <span>{progressPct}%</span>
                </div>
                <div className="h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
                </div>
              </div>

              {step < STEPS.length ? (
                <>
                  <p className="font-bold text-neutral-900 dark:text-white text-lg mb-5">{STEPS[step].q}</p>
                  <div className="space-y-2">
                    {STEPS[step].opts.map(opt => (
                      <button key={opt} onClick={() => pick(opt)}
                        className="w-full text-left px-4 py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 hover:border-indigo-400 hover:bg-indigo-50 transition-all text-sm font-medium text-neutral-800">
                        {opt}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <p className="font-bold text-neutral-900 dark:text-white text-lg mb-5">
                    {isUk ? "Майже готово — залиште контакти:" : "Almost there — leave your details:"}
                  </p>
                  <form onSubmit={submit} className="space-y-3">
                    <input required value={form.name}
                      onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      placeholder={isUk ? "Ваше ім'я" : "Your name"}
                      className="w-full border border-neutral-200 dark:border-neutral-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-400" />
                    <input required type="email" value={form.email}
                      onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      placeholder={isUk ? "Email або телефон" : "Email or phone"}
                      className="w-full border border-neutral-200 dark:border-neutral-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-400" />
                    <button type="submit"
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition-colors">
                      {isUk ? "Отримати рекомендацію →" : "Get your recommendation →"}
                    </button>
                  </form>
                </>
              )}

              {step > 0 && !done && (
                <button onClick={() => { setStep(p => p - 1); setAnswers(p => p.slice(0, -1)); }}
                  className="mt-4 text-xs text-neutral-400 hover:text-neutral-600 dark:text-neutral-300 w-full text-center">
                  {isUk ? "← Назад" : "← Back"}
                </button>
              )}
            </>
          )}
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs">
          <div className="bg-green-50 rounded-xl p-2 text-green-700">📉 {isUk ? "−40% вартість ліда" : "−40% lead cost"}</div>
          <div className="bg-amber-50 rounded-xl p-2 text-amber-700">🎯 {isUk ? "Кваліфікація" : "Qualification"}</div>
          <div className="bg-indigo-50 rounded-xl p-2 text-indigo-700">💡 {isUk ? "Персоналізація" : "Personalised"}</div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── feat-fomo ──── */
type FomoMsg = { emoji: string; nameUk: string; name: string; actionUk: string; action: string; timeUk: string; time: string };

const FOMO_MSGS: FomoMsg[] = [
  { emoji: "🛍", nameUk: "Ольга з Харкова", name: "Olivia from Manchester", actionUk: "щойно замовила Лендінг", action: "just ordered a Landing Page", timeUk: "2 хв тому", time: "2 min ago" },
  { emoji: "👁", nameUk: "12 людей", name: "12 people", actionUk: "зараз переглядають цю сторінку", action: "are viewing this page right now", timeUk: "", time: "" },
  { emoji: "⭐", nameUk: "Михайло з Дніпра", name: "Michael from Bristol", actionUk: "залишив відгук: «Дуже швидко!»", action: "left a review: \"Super fast!\"", timeUk: "15 хв тому", time: "15 min ago" },
  { emoji: "🚀", nameUk: "Агенція Digital Hub", name: "Digital Hub Agency", actionUk: "замовила корпоративний сайт", action: "ordered a corporate website", timeUk: "1 год тому", time: "1 hour ago" },
  { emoji: "💳", nameUk: "Аліна з Одеси", name: "Alisha from Leeds", actionUk: "оплатила доробку «Онлайн-запис»", action: "purchased Online Booking add-on", timeUk: "35 хв тому", time: "35 min ago" },
];

function FomoDemo({ isUk }: { isUk: boolean }) {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setCurrent(p => (p + 1) % FOMO_MSGS.length); setVisible(true); }, 400);
    }, 3000);
    return () => clearInterval(id);
  }, [paused]);

  const msg = FOMO_MSGS[current];

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">
        {isUk ? "FOMO-виджет — соціальний доказ" : "FOMO Widget — Social Proof"}
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
        {isUk ? "Спливаючі сповіщення про покупки, перегляди та відгуки. Підвищують конверсію на 10–20% завдяки ефекту натовпу." : "Pop-up notifications about purchases, views and reviews. Increase conversion by 10–20% through social proof."}
      </p>

      <div className="max-w-lg mx-auto">
        {/* Mock page */}
        <div className="relative bg-gradient-to-br from-slate-50 to-indigo-50 border border-neutral-200 dark:border-neutral-700 rounded-2xl overflow-hidden shadow-xl" style={{ minHeight: 280 }}>
          <div className="p-6 text-center">
            <p className="text-xl font-extrabold text-neutral-900 dark:text-white mb-1">{isUk ? "Онлайн-запис" : "Online Booking"}</p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">{isUk ? "Запишіться онлайн за 30 секунд" : "Book online in 30 seconds"}</p>
            <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-200">
              {isUk ? "Записатися →" : "Book Now →"}
            </button>
            <div className="mt-4 flex justify-center gap-4 text-xs text-neutral-400">
              <span>⭐ 4.9 / 5</span>
              <span>👤 {isUk ? "1 200+ клієнтів" : "1,200+ clients"}</span>
            </div>
          </div>

          {/* FOMO toast */}
          <div className={`absolute bottom-4 left-4 max-w-[240px] bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 rounded-xl shadow-xl p-3 flex gap-2.5 items-start transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
            <div className="text-xl shrink-0">{msg.emoji}</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-neutral-900 dark:text-white truncate">{isUk ? msg.nameUk : msg.name}</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-tight">{isUk ? msg.actionUk : msg.action}</p>
              {(isUk ? msg.timeUk : msg.time) && (
                <p className="text-xs text-neutral-300 mt-0.5">{isUk ? msg.timeUk : msg.time}</p>
              )}
            </div>
            <button onClick={() => setVisible(false)} className="text-neutral-200 hover:text-neutral-400 text-xs shrink-0">✕</button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-1.5">
            {FOMO_MSGS.map((_, i) => (
              <button key={i} onClick={() => { setCurrent(i); setVisible(true); }}
                className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-indigo-600" : "bg-neutral-200 hover:bg-neutral-300"}`} />
            ))}
          </div>
          <button onClick={() => setPaused(p => !p)}
            className="text-xs px-3 py-1.5 border border-neutral-200 dark:border-neutral-700 rounded-full text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 dark:bg-neutral-900 transition-colors">
            {paused ? (isUk ? "▶ Запустити" : "▶ Resume") : (isUk ? "⏸ Пауза" : "⏸ Pause")}
          </button>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs">
          <div className="bg-indigo-50 rounded-xl p-2 text-indigo-700">🛍 {isUk ? "Покупки" : "Purchases"}</div>
          <div className="bg-amber-50 rounded-xl p-2 text-amber-700">👁 {isUk ? "Перегляди" : "Views"}</div>
          <div className="bg-green-50 rounded-xl p-2 text-green-700">⭐ {isUk ? "Відгуки" : "Reviews"}</div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── Fallback ──── */
function FallbackDemo({ extraId, exampleId, isUk }: { extraId: string; exampleId: string; isUk: boolean }) {
  return (
    <div className="max-w-lg mx-auto text-center py-20">
      <div className="text-6xl mb-4">🔧</div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">
        {isUk ? "Демо в розробці" : "Demo in development"}
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-4">
        {isUk ? "Цей приклад буде доступний найближчим часом." : "This example will be available soon."}
      </p>
      <p className="text-xs text-neutral-300">{extraId} / {exampleId}</p>
    </div>
  );
}

/* ─────────────────────────────────────────── Router ──── */
export function GenericDemo({ extraId, exampleId, isUk }: Props) {
  // page-landing
  if (extraId === "page-landing" && exampleId === "saas-landing") return <SaasLanding isUk={isUk} />;
  if (extraId === "page-landing" && exampleId === "fitness-landing") return <FitnessLanding isUk={isUk} />;

  // page-faq
  if (extraId === "page-faq") return <EcommerceFaq isUk={isUk} />;

  // page-pricing
  if (extraId === "page-pricing") return <SaasPricing isUk={isUk} />;

  // page-404
  if (extraId === "page-404") return <Tech404 isUk={isUk} />;

  // feat-popup
  if (extraId === "feat-popup" && exampleId === "ecommerce-popup") return <EcommercePopup isUk={isUk} />;
  if (extraId === "feat-popup" && exampleId === "service-popup") return <ServicePopup isUk={isUk} />;

  // feat-search
  if (extraId === "feat-search") return <BlogSearch isUk={isUk} />;

  // int-nova-poshta
  if (extraId === "int-nova-poshta") return <NovaPoshtaCheckout isUk={isUk} />;

  // int-liqpay
  if (extraId === "int-liqpay") return <LiqPayDemo isUk={isUk} />;

  // int-telegram-bot
  if (extraId === "int-telegram-bot") return <TelegramBotDemo isUk={isUk} />;

  // int-google-maps
  if (extraId === "int-google-maps") return <GoogleMapsDemo isUk={isUk} />;

  // ai-chatbot-rag
  if (extraId === "ai-chatbot-rag") return <AiChatbotDemo isUk={isUk} />;

  // admin-blog
  if (extraId === "admin-blog") return <AdminBlogDemo isUk={isUk} />;

  // ecom-bundle-builder
  if (extraId === "ecom-bundle-builder") return <BundleBuilderDemo isUk={isUk} />;

  // ai-smart-search
  if (extraId === "ai-smart-search") return <AiSmartSearchDemo isUk={isUk} />;

  // admin-appointments
  if (extraId === "admin-appointments") return <AdminAppointmentsDemo isUk={isUk} />;

  // feat-before-after
  if (extraId === "feat-before-after") return <BeforeAfterDemo isUk={isUk} />;

  // feat-lead-quiz
  if (extraId === "feat-lead-quiz") return <LeadQuizDemo isUk={isUk} />;

  // feat-fomo
  if (extraId === "feat-fomo") return <FomoDemo isUk={isUk} />;

  // feat-waitlist
  if (extraId === "feat-waitlist") return <WaitlistDemo isUk={isUk} />;

  // feat-newsletter-inline
  if (extraId === "feat-newsletter-inline") return <NewsletterInlineDemo isUk={isUk} />;

  // feat-social-proof-counter
  if (extraId === "feat-social-proof-counter") return <SocialProofCounterDemo isUk={isUk} />;

  // feat-sticky-cta
  if (extraId === "feat-sticky-cta") return <StickyCTADemo isUk={isUk} />;
  if (extraId === "feat-back-to-top") return <BackToTopDemo isUk={isUk} />;
  if (extraId === "feat-darkmode") return <DarkModeDemo isUk={isUk} />;
  if (extraId === "feat-cookie") return <CookieBannerDemo isUk={isUk} />;
  if (extraId === "feat-social-share") return <SocialShareDemo isUk={isUk} />;

  return <FallbackDemo extraId={extraId} exampleId={exampleId} isUk={isUk} />;
}

/* ─────────────────────────────────────────── feat-waitlist ──── */
function WaitlistDemo({ isUk }: { isUk: boolean }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [count] = useState(247);

  const t = isUk
    ? { title: "Будьте першими!", sub: "Ми запускаємося зовсім скоро. Підпишіться — отримайте ранній доступ та 30% знижку.", ph: "your@email.com", btn: "Зайняти місце в черзі", success: "Ви в черзі!", successSub: (n: number) => `Ви на ${n + 1}-му місці. Ми напишемо вам першими.`, count: (n: number) => `${n} людей вже в черзі`, badge: "🚀 Запуск 15 червня" }
    : { title: "Be the First!", sub: "We're launching soon. Join the waitlist and get early access + 30% off.", ph: "your@email.com", btn: "Join the waitlist", success: "You're on the list!", successSub: (n: number) => `You're #${n + 1} in line. We'll reach out first.`, count: (n: number) => `${n} people already signed up`, badge: "🚀 Launching June 15" };

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">{isUk ? "Waitlist / Early Access форма" : "Waitlist / Early Access Form"}</h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">{isUk ? "Форма підписки на очікування зі лічильником позиції в черзі." : "Signup form with position counter and launch date."}</p>

      <div className="max-w-md mx-auto">
        <div className="bg-linear-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 text-white text-center">
          <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full block w-fit mx-auto mb-4">{t.badge}</span>
          <h3 className="font-heading text-2xl font-extrabold mb-2">{t.title}</h3>
          <p className="text-indigo-100 text-sm mb-6 leading-relaxed">{t.sub}</p>

          {!submitted ? (
            <div className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.ph}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-indigo-200 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button
                onClick={() => email.includes("@") && setSubmitted(true)}
                disabled={!email.includes("@")}
                className="w-full py-3 rounded-xl bg-white text-indigo-700 font-bold text-sm hover:bg-indigo-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t.btn}
              </button>
              <p className="text-xs text-indigo-200">{t.count(count)}</p>
            </div>
          ) : (
            <div className="bg-white/10 rounded-2xl p-5">
              <p className="text-4xl mb-2">🎉</p>
              <p className="font-bold text-lg">{t.success}</p>
              <p className="text-indigo-100 text-sm mt-1">{t.successSub(count)}</p>
              <div className="mt-4 flex items-center justify-center gap-3 text-xs font-semibold">
                <span className="bg-white/20 px-3 py-1.5 rounded-lg">{isUk ? "Позиція:" : "Position:"} #{count + 1}</span>
                <span className="bg-white/20 px-3 py-1.5 rounded-lg">{isUk ? "Знижка:" : "Discount:"} 30%</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── feat-newsletter-inline ──── */
function NewsletterInlineDemo({ isUk }: { isUk: boolean }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const t = isUk
    ? { tag: "📬 NEWSLETTER", title: "Корисні матеріали щотижня", sub: "Поради по веб-розробці, SEO та дизайну. Без спаму — тільки цінне.", ph: "Ваш email", btn: "Підписатися", privacy: "Без спаму. Відписатися можна будь-коли.", success: "Дякуємо! Перевірте пошту." }
    : { tag: "📬 NEWSLETTER", title: "Useful insights every week", sub: "Web development, SEO and design tips. No spam — only value.", ph: "Your email", btn: "Subscribe", privacy: "No spam. Unsubscribe anytime.", success: "Thanks! Check your inbox." };

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">{isUk ? "Newsletter Inline форма" : "Inline Newsletter Form"}</h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">{isUk ? "Форма підписки, вбудована в контент — не нав'язлива, вписана в дизайн." : "Subscription form embedded in content — non-intrusive, fits the design."}</p>

      <div className="max-w-2xl mx-auto">
        {/* Article context */}
        <div className="mb-4 text-sm text-neutral-400 italic text-center">{isUk ? "← Стаття продовжується нижче після блоку підписки →" : "← Article continues below after the subscription block →"}</div>

        <div className="bg-linear-to-r from-indigo-50 to-violet-50 border border-indigo-100 rounded-3xl p-8">
          <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-3 block">{t.tag}</span>
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <div className="flex-1">
              <h3 className="font-heading text-xl font-extrabold text-neutral-900 dark:text-white mb-1">{t.title}</h3>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm">{t.sub}</p>
            </div>
            {!submitted ? (
              <div className="flex gap-2 w-full sm:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.ph}
                  className="flex-1 sm:w-48 px-4 py-3 rounded-xl border border-indigo-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <button
                  onClick={() => email.includes("@") && setSubmitted(true)}
                  disabled={!email.includes("@")}
                  className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {t.btn}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-green-700 font-semibold text-sm">
                <span>✅</span> {t.success}
              </div>
            )}
          </div>
          {!submitted && <p className="text-xs text-neutral-400 mt-3">{t.privacy}</p>}
        </div>

        <div className="mt-4 text-sm text-neutral-400 italic text-center">{isUk ? "← Продовження статті →" : "← Article continues →"}</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── feat-social-proof-counter ──── */
function SocialProofCounterDemo({ isUk }: { isUk: boolean }) {
  const [animate, setAnimate] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  const targets = [1240, 98, 427, 4.9];
  const labels = isUk
    ? ["Задоволених клієнтів", "% конверсія", "Проєктів завершено", "Середня оцінка"]
    : ["Happy clients", "% conversion rate", "Projects completed", "Average rating"];
  const icons = ["😊", "📈", "✅", "⭐"];
  const suffixes = isUk ? ["", "%", "", "/5"] : ["", "%", "", "/5"];

  function triggerAnimation() {
    setAnimate(true);
    setCounts([0, 0, 0, 0]);
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCounts(targets.map((t) => Math.min(Math.round((t * step) / steps), t)));
      if (step >= steps) clearInterval(timer);
    }, interval);
  }

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">{isUk ? "Social Proof Counter" : "Social Proof Counters"}</h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-6">{isUk ? "Анімовані лічильники активуються при скролі до секції. Підвищують довіру та FOMO." : "Animated counters trigger on scroll. Builds trust and creates FOMO."}</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {targets.map((_, i) => (
          <div key={i} className="text-center p-5 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm">
            <span className="text-3xl block mb-2">{icons[i]}</span>
            <p className="text-3xl font-heading font-extrabold text-indigo-600">
              {animate ? `${counts[i]}${suffixes[i]}` : `${targets[i]}${suffixes[i]}`}
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-tight">{labels[i]}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={triggerAnimation}
          className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors"
        >
          {isUk ? "▶ Симулювати анімацію (scroll trigger)" : "▶ Simulate animation (scroll trigger)"}
        </button>
        <p className="text-xs text-neutral-400 mt-2">{isUk ? "На реальному сайті — запускається при появі секції у viewport" : "On a real site — triggers when section enters the viewport"}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── feat-sticky-cta ──── */
function BackToTopDemo({ isUk }: { isUk: boolean }) {
  const [shown, setShown] = useState(true);
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 1200);
  };

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">
        {isUk ? "Кнопка «Вгору» + прогрес читання" : "Back to Top + Reading Progress"}
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-6">
        {isUk
          ? "Кнопка з'являється після 400px скролу. Прогрес-бар зверху показує % прочитаного тексту."
          : "Button appears after 400px scroll. Top progress bar shows reading percentage."}
      </p>

      <div className="relative border border-neutral-200 dark:border-neutral-700 rounded-3xl overflow-hidden bg-neutral-50 dark:bg-neutral-900 min-h-64 p-6">
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-neutral-200 rounded-t-3xl">
          <div className="h-full bg-linear-to-r from-indigo-500 to-violet-500 rounded-t-3xl transition-all duration-300" style={{ width: shown ? "68%" : "0%" }} />
        </div>

        {/* Fake content */}
        <div className="mt-4 space-y-3">
          {[100, 80, 95, 70, 85, 60].map((w, i) => (
            <div key={i} className="h-3 bg-neutral-200 rounded-full" style={{ width: `${w}%` }} />
          ))}
        </div>

        {/* Back to top button */}
        {shown && (
          <button
            onClick={handleClick}
            className={`absolute bottom-4 right-4 w-11 h-11 rounded-full bg-indigo-600 text-white shadow-lg flex items-center justify-center hover:bg-indigo-700 transition-all duration-200 ${clicked ? "scale-90" : ""}`}
            aria-label={isUk ? "Вгору" : "Back to top"}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </button>
        )}
      </div>

      <div className="mt-4 flex gap-3">
        <button
          onClick={() => setShown(!shown)}
          className="px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 transition-colors"
        >
          {shown
            ? (isUk ? "Приховати кнопку" : "Hide button")
            : (isUk ? "Показати кнопку" : "Show button")}
        </button>
      </div>
      <p className="mt-3 text-xs text-neutral-400">
        {isUk
          ? "На реальному сайті кнопка та прогрес відстежують фактичне положення скролу."
          : "On a live site, both elements track actual scroll position."}
      </p>
    </div>
  );
}

function DarkModeDemo({ isUk }: { isUk: boolean }) {
  const [dark, setDark] = useState(false);

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">
        {isUk ? "Тема Dark Mode" : "Dark Mode Theme"}
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-6">
        {isUk
          ? "Перемикач теми зі збереженням у localStorage. Підтримує prefers-color-scheme."
          : "Theme toggle saved to localStorage. Respects prefers-color-scheme system preference."}
      </p>

      <div className={`border rounded-3xl overflow-hidden transition-colors duration-300 ${dark ? "bg-neutral-900 border-neutral-700" : "bg-white border-neutral-200"}`}>
        {/* Fake navbar */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${dark ? "border-neutral-700" : "border-neutral-100"}`}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">C</span>
            </div>
            <span className={`font-semibold text-sm ${dark ? "text-white" : "text-neutral-900"}`}>Codeworth</span>
          </div>
          <button
            onClick={() => setDark(!dark)}
            className={`w-11 h-6 rounded-full relative transition-colors duration-300 ${dark ? "bg-indigo-600" : "bg-neutral-200"}`}
            aria-label="Toggle dark mode"
          >
            <span className={`absolute top-0.5 w-5 h-5 rounded-full transition-all duration-300 flex items-center justify-center text-xs ${dark ? "left-5 bg-white text-indigo-600" : "left-0.5 bg-white text-neutral-400"}`}>
              {dark ? "🌙" : "☀️"}
            </span>
          </button>
        </div>

        {/* Fake content */}
        <div className="p-6">
          <div className={`h-5 w-2/3 rounded-full mb-3 ${dark ? "bg-neutral-700" : "bg-neutral-100"}`} />
          <div className={`h-3 w-full rounded-full mb-2 ${dark ? "bg-neutral-700" : "bg-neutral-100"}`} />
          <div className={`h-3 w-4/5 rounded-full mb-6 ${dark ? "bg-neutral-700" : "bg-neutral-100"}`} />
          <div className="flex gap-3">
            <div className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold">
              {isUk ? "Кнопка CTA" : "CTA Button"}
            </div>
            <div className={`px-5 py-2.5 rounded-xl border text-xs font-semibold ${dark ? "border-neutral-600 text-neutral-300" : "border-neutral-200 dark:border-neutral-700 text-neutral-600"}`}>
              {isUk ? "Дізнатись більше" : "Learn more"}
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs text-neutral-400">
        {isUk
          ? "Клікніть перемикач у навбарі вище щоб переключити тему."
          : "Click the toggle in the navbar above to switch the theme."}
      </p>
    </div>
  );
}

function CookieBannerDemo({ isUk }: { isUk: boolean }) {
  const [accepted, setAccepted] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [prefs, setPrefs] = useState({ analytics: true, marketing: false });

  if (accepted) {
    return (
      <div>
        <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">
          {isUk ? "Cookie Banner (GDPR)" : "Cookie Banner (GDPR)"}
        </h2>
        <div className="border border-green-200 rounded-3xl bg-green-50 p-8 text-center">
          <div className="text-4xl mb-3">✅</div>
          <p className="font-semibold text-green-800">{isUk ? "Налаштування збережено!" : "Preferences saved!"}</p>
          <p className="text-sm text-green-600 mt-1">
            {isUk ? `Аналітика: ${prefs.analytics ? "✓" : "✗"} | Маркетинг: ${prefs.marketing ? "✓" : "✗"}` : `Analytics: ${prefs.analytics ? "✓" : "✗"} | Marketing: ${prefs.marketing ? "✓" : "✗"}`}
          </p>
          <button onClick={() => { setAccepted(false); setCustomizing(false); }} className="mt-4 px-4 py-2 rounded-xl bg-green-600 text-white text-xs font-semibold hover:bg-green-700 transition-colors">
            {isUk ? "Скинути демо" : "Reset demo"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">
        {isUk ? "Cookie Banner (GDPR)" : "Cookie Banner (GDPR)"}
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-6">
        {isUk ? "Банер погодження з cookies відповідно до GDPR. Налаштування категорій, збереження у localStorage." : "GDPR-compliant cookie consent banner. Category preferences, localStorage persistence."}
      </p>

      {/* Fake page content */}
      <div className="relative border border-neutral-200 dark:border-neutral-700 rounded-3xl overflow-hidden bg-neutral-50 dark:bg-neutral-900 min-h-48 p-6">
        <div className="space-y-3 opacity-40">
          {[100, 80, 90].map((w, i) => (
            <div key={i} className="h-3 bg-neutral-300 rounded-full" style={{ width: `${w}%` }} />
          ))}
        </div>

        {/* Cookie banner */}
        <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 p-4 shadow-xl">
          {!customizing ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex-1">
                <p className="text-xs font-semibold text-neutral-900 dark:text-white mb-0.5">🍪 {isUk ? "Ми використовуємо cookies" : "We use cookies"}</p>
                <p className="text-xs text-neutral-500">{isUk ? "Для покращення досвіду та аналітики." : "To improve your experience and analytics."}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setCustomizing(true)} className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50">
                  {isUk ? "Налаштувати" : "Customize"}
                </button>
                <button onClick={() => setAccepted(true)} className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700">
                  {isUk ? "Прийняти всі" : "Accept all"}
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-xs font-semibold text-neutral-900 dark:text-white mb-3">🍪 {isUk ? "Налаштування cookies" : "Cookie preferences"}</p>
              <div className="space-y-2 mb-3">
                {[
                  { key: "analytics" as const, label: isUk ? "Аналітика (GA4)" : "Analytics (GA4)" },
                  { key: "marketing" as const, label: isUk ? "Маркетинг (Meta Pixel)" : "Marketing (Meta Pixel)" },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center justify-between text-xs text-neutral-700">
                    <span>{label}</span>
                    <button
                      onClick={() => setPrefs(p => ({ ...p, [key]: !p[key] }))}
                      className={`w-8 h-4.5 rounded-full transition-colors relative ${prefs[key] ? "bg-indigo-600" : "bg-neutral-200"}`}
                    >
                      <span className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white transition-all ${prefs[key] ? "left-4" : "left-0.5"}`} />
                    </button>
                  </label>
                ))}
              </div>
              <button onClick={() => setAccepted(true)} className="w-full py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700">
                {isUk ? "Зберегти налаштування" : "Save preferences"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SocialShareDemo({ isUk }: { isUk: boolean }) {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const platforms = [
    { name: "Telegram", icon: "✈️", color: "bg-sky-500 hover:bg-sky-600" },
    { name: "Facebook", icon: "f", color: "bg-blue-600 hover:bg-blue-700", fontBold: true },
    { name: "X / Twitter", icon: "𝕏", color: "bg-neutral-900 hover:bg-black" },
    { name: "LinkedIn", icon: "in", color: "bg-blue-700 hover:bg-blue-800", fontBold: true },
  ];

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">
        {isUk ? "Кнопки соцмереж (Share)" : "Social Share Buttons"}
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-6">
        {isUk
          ? "Блок поширення з лічильником, лайком і копіюванням посилання. Підходить для блогу та статей."
          : "Share block with view count, like, and copy-link. Ideal for blog posts and articles."}
      </p>

      {/* Demo article card */}
      <div className="border border-neutral-200 dark:border-neutral-700 rounded-3xl bg-white overflow-hidden">
        <div className="bg-linear-to-r from-indigo-600 to-violet-600 h-24 flex items-center justify-center text-white text-3xl">📝</div>
        <div className="p-5">
          <p className="text-xs text-indigo-600 font-semibold uppercase tracking-wide mb-1">{isUk ? "Веб-розробка" : "Web Development"}</p>
          <h3 className={`font-heading font-bold text-neutral-900 dark:text-white mb-4 text-sm leading-snug`}>
            {isUk ? "Як вибрати CMS для інтернет-магазину у 2026 році" : "How to Choose a CMS for Your Online Store in 2026"}
          </h3>

          <div className="flex items-center justify-between gap-4 pt-4 border-t border-neutral-100">
            <div className="flex gap-1.5">
              {platforms.map((p) => (
                <button
                  key={p.name}
                  title={p.name}
                  className={`w-8 h-8 rounded-lg ${p.color} text-white text-xs flex items-center justify-center transition-colors`}
                >
                  <span className={p.fontBold ? "font-bold" : ""}>{p.icon}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLiked(!liked)}
                className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${liked ? "text-rose-500" : "text-neutral-400 hover:text-rose-400"}`}
              >
                <span className="text-base">{liked ? "❤️" : "🤍"}</span>
                <span>{liked ? 47 : 46}</span>
              </button>
              <button
                onClick={handleCopy}
                className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${copied ? "text-green-600" : "text-neutral-400 hover:text-neutral-700"}`}
              >
                <span>{copied ? "✓" : "🔗"}</span>
                <span>{copied ? (isUk ? "Скопійовано!" : "Copied!") : (isUk ? "Копіювати" : "Copy link")}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StickyCTADemo({ isUk }: { isUk: boolean }) {
  const [visible, setVisible] = useState(true);
  const [dismissed, setDismissed] = useState(false);
  const [variant, setVariant] = useState<"bottom" | "top">("bottom");

  const t = isUk
    ? { title: "Sticky CTA Bar", label: "🔥 Акція до 31 травня: знижка 25% на розробку сайту!", cta: "Замовити зі знижкою →", dismiss: "×", togglePos: "Перемкнути позицію (зверху / знизу)", resetBtn: "Показати знову", note: "На реальному сайті бар зникає після кліку CTA або скролу до відповідної секції." }
    : { title: "Sticky CTA Bar", label: "🔥 Offer until May 31: 25% off website development!", cta: "Order with discount →", dismiss: "×", togglePos: "Toggle position (top / bottom)", resetBtn: "Show again", note: "On a real site, the bar hides after clicking CTA or scrolling to the target section." };

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white mb-2">{t.title}</h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-6">{isUk ? "Фіксований рядок з CTA, що не заважає навігації. Закривається кнопкою X або автоматично при скролі." : "Fixed CTA strip that doesn't interfere with navigation. Closes via X button or auto-hides on scroll."}</p>

      <div className="relative border border-neutral-200 dark:border-neutral-700 rounded-3xl overflow-hidden bg-neutral-50 dark:bg-neutral-900 min-h-64">
        {/* Fake page content */}
        <div className={`p-8 pt-16 ${variant === "top" ? "pt-20" : ""}`}>
          <div className="h-4 bg-neutral-200 rounded-full mb-3 w-3/4" />
          <div className="h-4 bg-neutral-200 rounded-full mb-3 w-full" />
          <div className="h-4 bg-neutral-200 rounded-full mb-3 w-5/6" />
          <div className="h-4 bg-neutral-200 rounded-full mb-6 w-2/3" />
          <div className="h-4 bg-neutral-200 rounded-full mb-3 w-full" />
          <div className="h-4 bg-neutral-200 rounded-full w-4/5" />
        </div>

        {/* Sticky bar */}
        {visible && !dismissed && (
          <div
            className={`absolute left-0 right-0 ${variant === "top" ? "top-0" : "bottom-0"} bg-linear-to-r from-indigo-600 to-violet-600 px-4 py-3 flex items-center justify-between gap-3`}
          >
            <p className="text-white text-xs font-semibold flex-1 truncate">{t.label}</p>
            <button className="px-4 py-1.5 rounded-lg bg-white text-indigo-700 font-bold text-xs hover:bg-indigo-50 transition-colors whitespace-nowrap shrink-0">
              {t.cta}
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="text-white/70 hover:text-white text-lg leading-none shrink-0"
              aria-label="Close"
            >
              {t.dismiss}
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setVariant(variant === "top" ? "bottom" : "top")}
            className="px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 transition-colors"
          >
            {t.togglePos}
          </button>
          {dismissed && (
            <button
              onClick={() => setDismissed(false)}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors"
            >
              {t.resetBtn}
            </button>
          )}
        </div>
        <p className="text-xs text-neutral-400 max-w-xs">{t.note}</p>
      </div>
    </div>
  );
}
