"use client";

import { useState, useRef, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { useLocale } from "@/components/layout/LocaleProvider";

const TESTIMONIALS_UK = [
  {
    name: "Олена Коваль",
    role: "Власниця салону краси",
    company: "Beauty Room Kyiv",
    text: "Codeworth зробили для нас не просто сайт — це повноцінний інструмент продажів. Онлайн-запис збільшив кількість клієнтів на 40% вже за перший місяць.",
    rating: 5,
    avatar: "О",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    name: "Дмитро Савченко",
    role: "Директор",
    company: "TechCargo Logistics",
    text: "Розробили корпоративний сайт із калькулятором доставки та CRM-інтеграцією. Терміни дотримали, якість відмінна. Рекомендую.",
    rating: 5,
    avatar: "Д",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    name: "Марія Петренко",
    role: "Засновниця",
    company: "Sweet Bakery UA",
    text: "Замовили лендінг для кондитерської. Результат перевершив очікування — стильно, швидко завантажується і чудово виглядає на телефоні.",
    rating: 5,
    avatar: "М",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    name: "Андрій Мельник",
    role: "CEO",
    company: "FitLife Club",
    text: "Сайт з онлайн-абонементами та розкладом тренувань окупився за 2 місяці. Продажі абонементів зросли на 120%. Дуже задоволені співпрацею.",
    rating: 5,
    avatar: "А",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    name: "Ірина Ткаченко",
    role: "Маркетолог",
    company: "MedCenter Plus",
    text: "Професійний підхід до медичного SEO. За 4 місяці ми потрапили в ТОП-3 за ключовими запитами та отримали +95% нових пацієнтів через сайт.",
    rating: 5,
    avatar: "І",
    gradient: "from-teal-500 to-cyan-600",
  },
  {
    name: "Віктор Бондаренко",
    role: "Власник",
    company: "AutoFix Service",
    text: "Онлайн-запис на СТО та прозорий прайс на сайті — саме те, що нам було потрібно. Завантаженість зросла на 35%, клієнти записуються навіть вночі.",
    rating: 5,
    avatar: "В",
    gradient: "from-slate-500 to-zinc-600",
  },
  {
    name: "Наталія Лисенко",
    role: "Директорка",
    company: "KidSpace Academy",
    text: "Сайт дитячого центру з розкладом та записом на пробне заняття. Батьки тепер легко знаходять нас у Google і одразу записують дітей.",
    rating: 5,
    avatar: "Н",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    name: "Олексій Шевченко",
    role: "CTO",
    company: "InvoiceFlow SaaS",
    text: "Редизайн лендінгу підвищив конверсію з 9% до 18%. Команда Codeworth розуміє SaaS-специфіку та знає як конвертувати відвідувачів у тріал.",
    rating: 5,
    avatar: "О",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    name: "Катерина Романюк",
    role: "Засновниця",
    company: "Valentyna Photo",
    text: "Портфоліо-сайт з оптимізованою галереєю та чіткими пакетами послуг. Після запуску отримала +180% замовлень — клієнти приходять вже готові до зйомки.",
    rating: 5,
    avatar: "К",
    gradient: "from-rose-500 to-pink-600",
  },
];

const TESTIMONIALS_EN = [
  {
    name: "Elena Koval",
    role: "Beauty salon owner",
    company: "Beauty Room Kyiv",
    text: "Codeworth didn't just build us a website — it's a full sales tool. Online booking increased our client count by 40% in the first month.",
    rating: 5,
    avatar: "E",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    name: "Dmytro Savchenko",
    role: "Director",
    company: "TechCargo Logistics",
    text: "They built a corporate site with a delivery calculator and CRM integration. Deadlines met, quality excellent. Highly recommend.",
    rating: 5,
    avatar: "D",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    name: "Maria Petrenko",
    role: "Founder",
    company: "Sweet Bakery UA",
    text: "We ordered a landing page for our bakery. The result exceeded expectations — stylish, fast-loading and looks great on mobile.",
    rating: 5,
    avatar: "M",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    name: "Andriy Melnyk",
    role: "CEO",
    company: "FitLife Club",
    text: "The site with online memberships and class schedules paid off in 2 months. Membership sales grew by 120%. Very happy with the collaboration.",
    rating: 5,
    avatar: "A",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    name: "Iryna Tkachenko",
    role: "Marketing Manager",
    company: "MedCenter Plus",
    text: "Professional approach to medical SEO. In 4 months we reached top-3 for key queries and got +95% new patients through the website.",
    rating: 5,
    avatar: "I",
    gradient: "from-teal-500 to-cyan-600",
  },
  {
    name: "Viktor Bondarenko",
    role: "Owner",
    company: "AutoFix Service",
    text: "Online booking for our auto shop and a transparent price list — exactly what we needed. Bookings up 35%, clients book even at night.",
    rating: 5,
    avatar: "V",
    gradient: "from-slate-500 to-zinc-600",
  },
  {
    name: "Natalia Lysenko",
    role: "Director",
    company: "KidSpace Academy",
    text: "A children's center site with schedule and trial class booking. Parents now easily find us on Google and sign up their kids right away.",
    rating: 5,
    avatar: "N",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    name: "Oleksiy Shevchenko",
    role: "CTO",
    company: "InvoiceFlow SaaS",
    text: "Landing page redesign boosted conversion from 9% to 18%. Codeworth understands SaaS and knows how to convert visitors into trial users.",
    rating: 5,
    avatar: "O",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    name: "Kateryna Romaniuk",
    role: "Founder",
    company: "Valentyna Photo",
    text: "Portfolio site with an optimized gallery and clear service packages. After launch I got +180% bookings — clients come already ready to shoot.",
    rating: 5,
    avatar: "K",
    gradient: "from-rose-500 to-pink-600",
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

  // Touch swipe support
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? goNext() : goPrev(); }
  };

  return (
    <section className="py-24 bg-white">
      <Container>
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
            {isUk ? "Відгуки клієнтів" : "Client reviews"}
          </p>
          <h2 className="text-4xl lg:text-5xl font-heading font-extrabold text-neutral-900 mb-4">
            {isUk ? (
              <>Нам довіряють{" "}<span className="gradient-text">85+ компаній</span></>
            ) : (
              <>Trusted by{" "}<span className="gradient-text">85+ companies</span></>
            )}
          </h2>
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
              className="p-7 rounded-2xl border border-neutral-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                <span className="sr-only">{isUk ? `Оцінка: ${t.rating} з 5` : `Rating: ${t.rating} out of 5`}</span>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                ))}
              </div>

              {/* Text */}
              <p className="text-neutral-600 text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-linear-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-sm`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-neutral-900 text-sm">{t.name}</div>
                  <div className="text-xs text-neutral-500">
                    {t.role}, {t.company}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={goPrev}
            aria-label={isUk ? "Попередні відгуки" : "Previous reviews"}
            className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-neutral-600" />
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
                    : "bg-neutral-300 hover:bg-neutral-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            aria-label={isUk ? "Наступні відгуки" : "Next reviews"}
            className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-neutral-600" />
          </button>
        </div>
      </Container>
    </section>
  );
}
