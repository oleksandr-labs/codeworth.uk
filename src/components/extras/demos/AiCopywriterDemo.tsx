"use client";

import { useState } from "react";

interface Props {
  variant: string;
  isUk: boolean;
}

type Niche = "restaurant" | "fitness" | "dental" | "it" | "beauty";
type Tone = "professional" | "friendly" | "bold";

interface CopyResult {
  headline: string;
  subheadline: string;
  cta: string;
  tagline: string;
}

const COPY_DATA: Record<Niche, { uk: CopyResult[]; en: CopyResult[] }> = {
  restaurant: {
    uk: [
      {
        headline: "Смак, що залишається з вами назавжди",
        subheadline: "Свіжі інгредієнти, авторські рецепти, атмосфера — де кожен вечір стає особливим.",
        cta: "Забронювати столик",
        tagline: "Їжа з душею · Відкрито щодня · Резервація онлайн",
      },
      {
        headline: "Де їжа перетворюється на мистецтво",
        subheadline: "Шеф-кухар з 15-річним досвідом та команда, що готує з любов'ю — це ми.",
        cta: "Дивитися меню",
        tagline: "Понад 200 страв · Без консервантів · Доставка за 45 хв",
      },
    ],
    en: [
      {
        headline: "A taste that stays with you forever",
        subheadline: "Fresh ingredients, signature recipes, atmosphere — where every evening becomes special.",
        cta: "Reserve a Table",
        tagline: "Soulful food · Open daily · Book online",
      },
      {
        headline: "Where food becomes art",
        subheadline: "A head chef with 15 years of experience and a team that cooks with passion — that's us.",
        cta: "View Menu",
        tagline: "200+ dishes · No preservatives · 45-min delivery",
      },
    ],
  },
  fitness: {
    uk: [
      {
        headline: "Твоє тіло — найкращий проєкт",
        subheadline: "Сертифіковані тренери, сучасне обладнання, перший результат — вже через 30 днів.",
        cta: "Отримати пробне заняття",
        tagline: "500+ учнів · 12 тренерів · Без довгострокових договорів",
      },
      {
        headline: "Сильніший кожного дня",
        subheadline: "Персональний план харчування, тренування під ваш рівень та підтримка 24/7.",
        cta: "Почати безкоштовно",
        tagline: "Трансформація за 90 днів · Повернення грошей без результату",
      },
    ],
    en: [
      {
        headline: "Your body is the best project",
        subheadline: "Certified trainers, modern equipment, first results — in just 30 days.",
        cta: "Get a Free Trial Class",
        tagline: "500+ members · 12 trainers · No long-term contracts",
      },
      {
        headline: "Stronger every single day",
        subheadline: "Personal nutrition plan, workouts tailored to your level, and 24/7 coaching support.",
        cta: "Start for Free",
        tagline: "90-day transformation · Money-back guarantee",
      },
    ],
  },
  dental: {
    uk: [
      {
        headline: "Посмішка, якою ви пишатиметесь",
        subheadline: "Безболісне лікування, сучасне обладнання та лікарі з 10+ роками досвіду — для вашої ідеальної посмішки.",
        cta: "Записатись онлайн",
        tagline: "Без болю · Гарантія на роботи · Консультація безкоштовна",
      },
      {
        headline: "Здорові зуби — щасливе життя",
        subheadline: "Комплексний підхід: від профілактики до імплантації. Дбаємо про ваш комфорт на кожному етапі.",
        cta: "Отримати консультацію",
        tagline: "15 спеціалістів · Сучасне обладнання · Страховка приймається",
      },
    ],
    en: [
      {
        headline: "A smile you'll be proud of",
        subheadline: "Pain-free treatment, modern equipment, and dentists with 10+ years of experience — for your perfect smile.",
        cta: "Book Online",
        tagline: "Pain-free · Work guarantee · Free consultation",
      },
      {
        headline: "Healthy teeth, happy life",
        subheadline: "A comprehensive approach: from prevention to implants. We care about your comfort at every step.",
        cta: "Get a Consultation",
        tagline: "15 specialists · Modern equipment · Insurance accepted",
      },
    ],
  },
  it: {
    uk: [
      {
        headline: "Технології, що працюють на ваш бізнес",
        subheadline: "Розробка, підтримка та масштабування — ваш цифровий партнер від ідеї до готового продукту.",
        cta: "Обговорити проєкт",
        tagline: "React · Node.js · AWS · 50+ успішних проєктів",
      },
      {
        headline: "Код, що приносить гроші",
        subheadline: "Ми будуємо цифрові продукти, що конвертують відвідувачів у клієнтів.",
        cta: "Отримати безкоштовний аудит",
        tagline: "Середній ROI клієнтів +340% · 3 роки на ринку",
      },
    ],
    en: [
      {
        headline: "Technology that works for your business",
        subheadline: "Development, support and scaling — your digital partner from idea to finished product.",
        cta: "Discuss a Project",
        tagline: "React · Node.js · AWS · 50+ successful projects",
      },
      {
        headline: "Code that makes money",
        subheadline: "We build digital products that convert visitors into paying customers.",
        cta: "Get a Free Audit",
        tagline: "Average client ROI +340% · 3 years in business",
      },
    ],
  },
  beauty: {
    uk: [
      {
        headline: "Розкрий свою красу",
        subheadline: "Професійні майстри, преміальна косметика та результат, що говорить сам за себе.",
        cta: "Записатись зараз",
        tagline: "7 майстрів · Топ-бренди косметики · Онлайн запис 24/7",
      },
      {
        headline: "Де ви стаєте найкращою версією себе",
        subheadline: "Від манікюру до складних процедур: наші майстри знають, як підкреслити вашу природну красу.",
        cta: "Обрати послугу",
        tagline: "4.9 ★ від 300+ клієнтів · Гнучкий графік · Без черг",
      },
    ],
    en: [
      {
        headline: "Unlock your beauty",
        subheadline: "Professional masters, premium cosmetics and results that speak for themselves.",
        cta: "Book Now",
        tagline: "7 specialists · Top cosmetic brands · Online booking 24/7",
      },
      {
        headline: "Where you become the best version of yourself",
        subheadline: "From nails to complex procedures: our specialists know how to highlight your natural beauty.",
        cta: "Choose a Service",
        tagline: "4.9 ★ from 300+ clients · Flexible schedule · No queues",
      },
    ],
  },
};

export function AiCopywriterDemo({ isUk }: Props) {
  const [niche, setNiche] = useState<Niche>("restaurant");
  const [brandName, setBrandName] = useState("");
  const [tone, setTone] = useState<Tone>("friendly");
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<CopyResult | null>(null);
  const [variantIdx, setVariantIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const niches: { id: Niche; label: string; labelEn: string; emoji: string }[] = [
    { id: "restaurant", label: "Ресторан", labelEn: "Restaurant", emoji: "🍽️" },
    { id: "fitness", label: "Фітнес", labelEn: "Fitness", emoji: "💪" },
    { id: "dental", label: "Стоматологія", labelEn: "Dental", emoji: "🦷" },
    { id: "it", label: "IT компанія", labelEn: "IT Company", emoji: "💻" },
    { id: "beauty", label: "Салон краси", labelEn: "Beauty Salon", emoji: "💅" },
  ];

  const tones: { id: Tone; label: string; labelEn: string }[] = [
    { id: "professional", label: "Офіційний", labelEn: "Professional" },
    { id: "friendly", label: "Дружній", labelEn: "Friendly" },
    { id: "bold", label: "Сміливий", labelEn: "Bold" },
  ];

  function handleGenerate() {
    const data = COPY_DATA[niche][isUk ? "uk" : "en"];
    const idx = variantIdx % data.length;
    const chosen = { ...data[idx] };

    if (brandName.trim()) {
      chosen.tagline = `${brandName} · ${chosen.tagline}`;
    }

    setGenerating(true);
    setResult(null);
    setVariantIdx(idx + 1);

    setTimeout(() => {
      setGenerating(false);
      setResult(chosen);
    }, 1800);
  }

  function handleCopy() {
    if (!result) return;
    const text = `${result.headline}\n\n${result.subheadline}\n\nCTA: ${result.cta}\n\n${result.tagline}`;
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-2">
        {isUk ? "AI-Копірайтер для Лендінгів" : "AI Copywriter for Landing Pages"}
      </h2>
      <p className="text-neutral-500 text-sm mb-8">
        {isUk
          ? "Оберіть нішу, введіть назву бренду та отримайте готові тексти через AI. Спробуйте різні варіанти."
          : "Choose your niche, enter your brand name and get ready-to-use copy from AI. Try different variants."}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: controls */}
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-3 uppercase tracking-wide">
              {isUk ? "1. Ніша бізнесу" : "1. Business niche"}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {niches.map((n) => (
                <button
                  key={n.id}
                  onClick={() => { setNiche(n.id); setResult(null); setVariantIdx(0); }}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                    niche === n.id
                      ? "bg-violet-600 text-white shadow-lg shadow-violet-200"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  }`}
                >
                  <span>{n.emoji}</span>
                  <span>{isUk ? n.label : n.labelEn}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-2 uppercase tracking-wide">
              {isUk ? "2. Назва бренду (опційно)" : "2. Brand name (optional)"}
            </label>
            <input
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              type="text"
              placeholder={isUk ? "Наприклад: La Maison, FitLife, MedCare..." : "e.g. La Maison, FitLife, MedCare..."}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white focus:border-violet-400 focus:outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-3 uppercase tracking-wide">
              {isUk ? "3. Тон комунікації" : "3. Communication tone"}
            </label>
            <div className="flex gap-2">
              {tones.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTone(t.id)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    tone === t.id
                      ? "bg-violet-600 text-white"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  {isUk ? t.label : t.labelEn}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={generating}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold text-base hover:from-violet-700 hover:to-purple-700 transition-all shadow-lg shadow-violet-200 disabled:opacity-70 flex items-center justify-center gap-3"
          >
            {generating ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {isUk ? "AI генерує текст..." : "AI is generating copy..."}
              </>
            ) : (
              <>
                <span>✨</span>
                {isUk ? "Згенерувати текст" : "Generate Copy"}
              </>
            )}
          </button>

          <div className="p-4 bg-violet-50 rounded-2xl border border-violet-100">
            <p className="text-xs text-violet-600 font-semibold mb-1">
              {isUk ? "💡 Як це працює" : "💡 How it works"}
            </p>
            <p className="text-xs text-neutral-500">
              {isUk
                ? "AI аналізує нішу, тон та бренд — генерує заголовок, підзаголовок, CTA та tagline. Натискайте «Інший варіант» для нових текстів."
                : "AI analyses niche, tone and brand — generates headline, subheadline, CTA and tagline. Click 'Another variant' for fresh copy."}
            </p>
          </div>
        </div>

        {/* Right: result */}
        <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-3xl p-6 min-h-[360px] flex flex-col">
          {!result && !generating && (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-neutral-400">
              <span className="text-6xl mb-4">✍️</span>
              <p className="text-sm font-medium text-neutral-500">
                {isUk ? "Тут з'явиться ваш текст" : "Your copy will appear here"}
              </p>
              <p className="text-xs mt-1">
                {isUk
                  ? "Налаштуйте параметри та натисніть «Згенерувати»"
                  : "Set parameters and click Generate"}
              </p>
            </div>
          )}

          {generating && (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="flex gap-1 mb-5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-8 rounded-full bg-violet-400 animate-bounce"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
              <p className="text-sm text-violet-600 font-semibold mb-1">
                {isUk ? "AI аналізує нішу..." : "AI is analysing niche..."}
              </p>
              <p className="text-xs text-violet-400">
                {isUk ? "Генерую заголовки та CTA" : "Generating headlines and CTAs"}
              </p>
              <div className="mt-6 space-y-2.5 w-full">
                {["w-3/4", "w-full", "w-2/3", "w-1/2", "w-3/4"].map((w, i) => (
                  <div
                    key={i}
                    className={`h-3.5 bg-violet-200/70 rounded-full ${w} animate-pulse mx-auto`}
                    style={{ animationDelay: `${i * 0.12}s` }}
                  />
                ))}
              </div>
            </div>
          )}

          {result && !generating && (
            <div className="flex-1 flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-xs font-semibold text-green-600">
                  {isUk ? "Текст згенеровано ✓" : "Copy generated ✓"}
                </span>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-violet-100 shadow-sm">
                <span className="text-xs font-bold text-violet-400 uppercase tracking-wider">
                  {isUk ? "Заголовок" : "Headline"}
                </span>
                <p className="font-heading text-xl font-bold text-neutral-900 mt-1.5 leading-tight">
                  {result.headline}
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-violet-100 shadow-sm">
                <span className="text-xs font-bold text-violet-400 uppercase tracking-wider">
                  {isUk ? "Підзаголовок" : "Subheadline"}
                </span>
                <p className="text-neutral-600 text-sm mt-1.5 leading-relaxed">{result.subheadline}</p>
              </div>

              <div className="flex gap-3">
                <div className="flex-1 p-4 bg-white rounded-2xl border border-violet-100 shadow-sm">
                  <span className="text-xs font-bold text-violet-400 uppercase tracking-wider">CTA</span>
                  <div className="mt-2">
                    <span className="inline-block px-4 py-2 bg-violet-600 text-white text-sm font-semibold rounded-xl">
                      {result.cta}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-violet-100 shadow-sm">
                <span className="text-xs font-bold text-violet-400 uppercase tracking-wider">
                  {isUk ? "Trust bar / Tagline" : "Trust bar / Tagline"}
                </span>
                <p className="text-xs text-neutral-500 mt-1.5 italic">{result.tagline}</p>
              </div>

              <div className="flex gap-2 mt-auto">
                <button
                  onClick={handleGenerate}
                  className="flex-1 py-2.5 rounded-xl border border-violet-300 text-violet-600 text-sm font-semibold hover:bg-violet-50 transition-colors"
                >
                  🔄 {isUk ? "Інший варіант" : "Another variant"}
                </button>
                <button
                  onClick={handleCopy}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    copied
                      ? "bg-green-500 text-white"
                      : "bg-violet-600 text-white hover:bg-violet-700"
                  }`}
                >
                  {copied ? (isUk ? "✓ Скопійовано!" : "✓ Copied!") : (isUk ? "📋 Скопіювати" : "📋 Copy text")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
