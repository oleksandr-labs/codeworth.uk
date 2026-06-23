"use client";

import { useState, useRef, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { useLocale } from "@/components/layout/LocaleProvider";

const TESTIMONIALS_UK = [
  {
    name: "Тарас Гнатенко",
    role: "CTO",
    company: "Fintechlabs UA",
    text: "ML-модель виявлення шахрайства знизила рівень хибних спрацювань на 73%. За рік проєкт приніс ROI 540%. Команда Codeworth розуміє FinTech-специфіку та регуляторні вимоги.",
    rating: 5,
    avatar: "Т",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    name: "Ольга Мороз",
    role: "Head of Analytics",
    company: "RetailCore UA",
    text: "Churn prediction скоротив відтік клієнтів на 31%. Промо-бюджет оптимізовано: тепер витрачаємо на 28% менше і досягаємо кращих результатів.",
    rating: 5,
    avatar: "О",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    name: "Микола Власенко",
    role: "CEO",
    company: "LogiSmart",
    text: "NLP-класифікатор вантажних документів обробляє 2 000 записів на день замість 3 операторів. Окупився повністю за 5 тижнів після запуску.",
    rating: 5,
    avatar: "М",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    name: "Дарина Кириленко",
    role: "Product Manager",
    company: "HealthDesk",
    text: "RAG-чатбот на медичній документації дає лікарям відповіді менш ніж за секунду. 74% запитів у підтримку зникли — команда вивільнила час для складних випадків.",
    rating: 5,
    avatar: "Д",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    name: "Артем Павленко",
    role: "Founder",
    company: "ShopIQ",
    text: "Predictive pricing підняв маржинальність на 12%. Ціни оновлюються автоматично на основі конкурентів і попиту — жодного ручного втручання.",
    rating: 5,
    avatar: "А",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    name: "Соломія Дяченко",
    role: "CDO",
    company: "AgroTrack",
    text: "Computer vision для контролю якості врожаю: точність 94%, ручна праця при сортуванні скорочена на 68%. Система окупилася за перший сезон.",
    rating: 5,
    avatar: "С",
    gradient: "from-green-500 to-lime-600",
  },
  {
    name: "Іван Захарченко",
    role: "VP Engineering",
    company: "DocuFlow",
    text: "Pipeline витягу даних з PDF-договорів. Юристи вивільнили 4 години на день — тепер ці години йдуть на роботу з клієнтами, а не на рутину.",
    rating: 5,
    avatar: "І",
    gradient: "from-slate-500 to-zinc-600",
  },
  {
    name: "Яна Ліщенко",
    role: "CMO",
    company: "MarketBoost",
    text: "AI-контент-пайплайн — 10 SEO-статей на день замість 2 тижнів на одну. Органічний трафік виріс на 290% за 6 місяців. Якість — вища, ніж у більшості авторів.",
    rating: 5,
    avatar: "Я",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    name: "Богдан Ковальчук",
    role: "Director",
    company: "SecureID",
    text: "Модель верифікації документів: точність 98.7%, 0.3 секунди на документ. Замінили 12 операторів ручної перевірки без зниження якості.",
    rating: 5,
    avatar: "Б",
    gradient: "from-red-500 to-rose-600",
  },
];

const TESTIMONIALS_EN = [
  {
    name: "James Harrison",
    role: "CTO",
    company: "Fintechlabs UK",
    text: "The ML fraud detection model reduced our false positive rate by 73%. ROI was 540% in the first year. Codeworth understands FinTech and regulatory requirements.",
    rating: 5,
    avatar: "J",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    name: "Sophie Mitchell",
    role: "Head of Analytics",
    company: "RetailCore UK",
    text: "Churn prediction reduced customer attrition by 31%. Our promo budget is now 28% leaner and delivers better results. The model paid for itself in the first quarter.",
    rating: 5,
    avatar: "S",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    name: "Mark Reynolds",
    role: "CEO",
    company: "LogiSmart UK",
    text: "The NLP classifier for freight documents handles 2,000 records a day — the workload of 3 operators. Fully paid off 5 weeks after launch.",
    rating: 5,
    avatar: "M",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    name: "Priya Sharma",
    role: "Product Manager",
    company: "HealthDesk",
    text: "RAG chatbot on our medical docs gives doctors answers in under a second. 74% of support tickets disappeared — the team now focuses on complex cases.",
    rating: 5,
    avatar: "P",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    name: "Daniel Clark",
    role: "Founder",
    company: "ShopIQ",
    text: "Predictive pricing lifted our margin by 12%. Prices update automatically based on competitors and demand — zero manual work from our side.",
    rating: 5,
    avatar: "D",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    name: "Sarah O'Brien",
    role: "CDO",
    company: "AgroTrack UK",
    text: "Computer vision for harvest quality control: 94% accuracy, manual sorting labour down 68%. The system paid off in the first season.",
    rating: 5,
    avatar: "S",
    gradient: "from-green-500 to-lime-600",
  },
  {
    name: "Tom Wheeler",
    role: "VP Engineering",
    company: "DocuFlow",
    text: "Document extraction pipeline from PDF contracts. Lawyers saved 4 hours a day — those hours now go into client work, not copy-pasting.",
    rating: 5,
    avatar: "T",
    gradient: "from-slate-500 to-zinc-600",
  },
  {
    name: "Emma Stone",
    role: "CMO",
    company: "MarketBoost",
    text: "AI content pipeline — 10 SEO articles a day instead of 2 weeks per piece. Organic traffic up 290% in 6 months. Quality is better than most human writers.",
    rating: 5,
    avatar: "E",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    name: "Chris Whitfield",
    role: "Director",
    company: "SecureID UK",
    text: "Document verification model: 98.7% accuracy, 0.3s per document. Replaced 12 manual operators without any drop in quality.",
    rating: 5,
    avatar: "C",
    gradient: "from-red-500 to-rose-600",
  },
];

const PAGES_COUNT = Math.ceil(TESTIMONIALS_UK.length / 3);

export function TestimonialsSection() {
  const lang = useLocale();
  const isUk = lang === "uk";
  const TESTIMONIALS = isUk ? TESTIMONIALS_UK : TESTIMONIALS_EN;

  const [page, setPage] = useState(0);
  const visibleTestimonials = TESTIMONIALS.slice(page * 3, page * 3 + 3);

  const goNext = useCallback(() => setPage((p) => (p + 1) % PAGES_COUNT), []);
  const goPrev = useCallback(() => setPage((p) => (p - 1 + PAGES_COUNT) % PAGES_COUNT), []);

  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? goNext() : goPrev(); }
  };

  return (
    <section className="py-24 bg-white dark:bg-neutral-950">
      <Container>
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
            {isUk ? "Відгуки клієнтів" : "Client reviews"}
          </p>
          <h2 className="text-4xl lg:text-5xl font-heading font-extrabold text-neutral-900 dark:text-white mb-4">
            {isUk ? (
              <>Довіряють{" "}<span className="gradient-text">ML-команди</span></>
            ) : (
              <>Trusted by{" "}<span className="gradient-text">ML teams</span></>
            )}
          </h2>
          <p className="text-lg text-neutral-500 dark:text-neutral-400">
            {isUk
              ? "Реальні результати від реальних клієнтів — не маркетингові обіцянки."
              : "Real results from real clients — not marketing promises."}
          </p>
        </div>

        <ul
          role="list"
          aria-label={isUk ? "Відгуки клієнтів" : "Client reviews"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {visibleTestimonials.map((t) => (
            <li
              key={t.name}
              className="p-7 rounded-2xl border border-neutral-100 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center gap-0.5 mb-4">
                <span className="sr-only">{isUk ? `Оцінка: ${t.rating} з 5` : `Rating: ${t.rating} out of 5`}</span>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                ))}
              </div>

              <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-linear-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-sm`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-neutral-900 dark:text-white text-sm">{t.name}</div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    {t.role}, {t.company}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={goPrev}
            aria-label={isUk ? "Попередні відгуки" : "Previous reviews"}
            className="w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-center hover:bg-neutral-50 dark:hover:bg-neutral-800 dark:bg-neutral-900 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: PAGES_COUNT }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={isUk ? `Сторінка ${i + 1}` : `Page ${i + 1}`}
                aria-current={i === page ? "true" : undefined}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === page
                    ? "bg-indigo-600 w-8"
                    : "bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            aria-label={isUk ? "Наступні відгуки" : "Next reviews"}
            className="w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-center hover:bg-neutral-50 dark:hover:bg-neutral-800 dark:bg-neutral-900 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
          </button>
        </div>
      </Container>
    </section>
  );
}
