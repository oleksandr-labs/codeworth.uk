import type { Metadata } from "next";
import Link from "next/link";
import { buildAlternates } from "@/i18n";
import { EmojiIcon } from "@/components/ui/EmojiIcon";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { JOBS } from "@/lib/data/careers";
import { CareersJobList } from "@/components/careers/CareersJobList";
import { ArrowRight, Briefcase, Zap, CheckCircle } from "lucide-react";

export async function generateStaticParams() {
  return [{ lang: "uk" }, { lang: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isUk = lang === "uk";
  const title = isUk
    ? "Вакансії Codeworth — ML-компанія | ML Engineer, Data Scientist, MLOps"
    : "Codeworth Careers — ML Company | ML Engineer, Data Scientist, MLOps";
  const desc = isUk
    ? "Відкриті вакансії в ML-команді Codeworth: ML Engineer, Data Scientist, MLOps Engineer, Technical ML Lead. 100% Remote, UK/EU. Гнучкий графік, цікаві ML-проєкти."
    : "Open positions at Codeworth ML team: ML Engineer, Data Scientist, MLOps Engineer, Technical ML Lead. 100% Remote, UK/EU. Flexible hours, exciting ML projects.";
  return {
    title,
    description: desc,
    openGraph: { title, description: desc, type: "website", url: `https://codeworth.uk/${lang}/careers` },
    alternates: buildAlternates(lang, "/careers"),
  };
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isUk = lang === "uk";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isUk ? "Головна" : "Home", item: `https://codeworth.uk/${lang}` },
      { "@type": "ListItem", position: 2, name: isUk ? "Вакансії" : "Careers" },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: isUk ? "Як подати заявку у Codeworth" : "How to Apply to Codeworth",
    description: isUk
      ? "Процес найму в Codeworth — 4 кроки, 7–10 робочих днів"
      : "Codeworth hiring process — 4 steps, 7–10 business days",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: isUk ? "Відгук" : "Application",
        text: isUk
          ? "Надішліть CV та cover letter. Відповідаємо протягом 2 днів."
          : "Send your CV and cover letter. We respond within 2 days.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: isUk ? "Тестове завдання" : "Test Task",
        text: isUk
          ? "Невелике практичне завдання — до 3–4 годин вашого часу."
          : "A small practical task — up to 3–4 hours of your time.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: isUk ? "Інтерв'ю" : "Interview",
        text: isUk
          ? "Відеозустріч з lead-ом і HR: 45–60 хв про досвід та цінності."
          : "Video call with the lead and HR: 45–60 min about experience and values.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: isUk ? "Оффер" : "Offer",
        text: isUk
          ? "Фінальне рішення та оффер із усіма умовами."
          : "Final decision and an offer with all the details.",
      },
    ],
  };

  const jobPostingsSchema = {
    "@context": "https://schema.org",
    "@graph": JOBS.map((job) => ({
      "@type": "JobPosting",
      title: isUk ? job.titleUk : job.titleEn,
      description: isUk ? job.descriptionUk : job.descriptionEn,
      datePosted: job.datePosted,
      employmentType: "FULL_TIME",
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "London",
          addressCountry: "GB",
        },
      },
      hiringOrganization: {
        "@type": "Organization",
        name: "Codeworth",
        sameAs: "https://codeworth.uk",
      },
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: job.currency,
        value: {
          "@type": "QuantitativeValue",
          minValue: job.salaryMin,
          maxValue: job.salaryMax,
          unitText: "MONTH",
        },
      },
      url: `https://codeworth.uk/${lang}/careers/${job.slug}`,
    })),
  };

  const VALUES = isUk
    ? [
        { emoji: "🌍", title: "100% Remote", desc: "Працюйте з будь-якої точки UK, ЄС або України" },
        { emoji: "📚", title: "Навчання", desc: "£1,500/рік на курси, конференції та ML-сертифікації" },
        { emoji: "⏰", title: "Гнучкий графік", desc: "Core hours 10:00–16:00 UTC, решта — ваш вибір" },
        { emoji: "🤖", title: "ML-проєкти", desc: "FinTech, Healthcare, Retail — реальний продакшн ML" },
        { emoji: "💡", title: "Вплив", desc: "Ваші архітектурні рішення впроваджуються з першого дня" },
        { emoji: "🤝", title: "Команда", desc: "Без мікроменеджменту — тільки довіра і ML-результат" },
      ]
    : [
        { emoji: "🌍", title: "100% Remote", desc: "Work from anywhere in the UK or EU" },
        { emoji: "📚", title: "Learning", desc: "£1,500/year for courses, conferences, and ML certifications" },
        { emoji: "⏰", title: "Flexible Hours", desc: "Core hours 10:00–16:00 UTC, the rest is your choice" },
        { emoji: "🤖", title: "ML Projects", desc: "FinTech, Healthcare, Retail — real production ML" },
        { emoji: "💡", title: "Impact", desc: "Your architecture decisions get implemented from day one" },
        { emoji: "🤝", title: "Team", desc: "No micromanagement — just trust and ML results" },
      ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingsSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-linear-to-br from-slate-900 via-indigo-900 to-slate-900 py-20">
          <Container>
            <nav className="mb-6 text-sm text-slate-400">
              <Link href={`/${lang}`} className="hover:text-white transition-colors">
                {isUk ? "Головна" : "Home"}
              </Link>
              <span className="mx-2">›</span>
              <span className="text-white">{isUk ? "Вакансії" : "Careers"}</span>
            </nav>
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm px-3 py-1.5 rounded-full mb-6">
                <Zap className="w-4 h-4" />
                {isUk ? `${JOBS.filter((j) => j.isUrgent).length} термінова вакансія` : `${JOBS.filter((j) => j.isUrgent).length} urgent opening`}
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                {isUk ? "Приєднуйся до ML-команди" : "Join the ML Team"}
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                {isUk
                  ? "Будуємо ML-рішення для UK та EU бізнесу. Шукаємо ML-інженерів та data scientists, яким важливо деплоїти моделі в продакшн."
                  : "Building ML solutions for UK and EU businesses. Looking for ML engineers and data scientists who care about shipping models to production."}
              </p>
              <div className="flex items-center gap-4 text-slate-400 text-sm">
                <span className="inline-flex items-center gap-1"><EmojiIcon emoji="👥" className="w-4 h-4" />12 {isUk ? "людей у команді" : "people in team"}</span>
                <span className="inline-flex items-center gap-1"><EmojiIcon emoji="🏆" className="w-4 h-4" />{isUk ? "4 роки на ринку" : "4 years in market"}</span>
                <span className="inline-flex items-center gap-1"><EmojiIcon emoji="⭐" className="w-4 h-4" />{isUk ? "150+ проєктів" : "150+ projects"}</span>
              </div>
            </div>
          </Container>
        </section>

        {/* Why Codeworth */}
        <section className="py-16 bg-white dark:bg-neutral-800 border-b">
          <Container>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              {isUk ? "Чому Codeworth?" : "Why Codeworth?"}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {VALUES.map((v) => (
                <div key={v.title} className="flex gap-4">
                  <EmojiIcon emoji={v.emoji} className="w-8 h-8" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{v.title}</h3>
                    <p className="text-gray-600 dark:text-neutral-300 text-sm">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Selection process */}
        <section className="py-16 bg-white dark:bg-neutral-800 border-b">
          <Container>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">
              {isUk ? "Процес відбору" : "Hiring Process"}
            </h2>
            <p className="text-gray-600 dark:text-neutral-300 text-center mb-10 max-w-lg mx-auto text-sm">
              {isUk
                ? "Ми цінуємо ваш час — увесь процес займає 7–10 робочих днів."
                : "We value your time — the entire process takes 7–10 business days."}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {(isUk
                ? [
                    { step: "01", title: "Відгук", desc: "Надішліть CV та cover letter. Відповідаємо протягом 2 днів.", time: "День 1" },
                    { step: "02", title: "Тестове завдання", desc: "Невелике практичне завдання — до 3–4 годин вашого часу.", time: "День 2–4" },
                    { step: "03", title: "Інтерв'ю", desc: "Відеозустріч з lead-ом і HR: 45–60 хв про досвід та цінності.", time: "День 5–7" },
                    { step: "04", title: "Оффер", desc: "Фінальне рішення та оффер із усіма умовами.", time: "День 8–10" },
                  ]
                : [
                    { step: "01", title: "Application", desc: "Send your CV and cover letter. We respond within 2 days.", time: "Day 1" },
                    { step: "02", title: "Test Task", desc: "A small practical task — up to 3–4 hours of your time.", time: "Day 2–4" },
                    { step: "03", title: "Interview", desc: "Video call with the lead and HR: 45–60 min about experience and values.", time: "Day 5–7" },
                    { step: "04", title: "Offer", desc: "Final decision and an offer with all the details.", time: "Day 8–10" },
                  ]
              ).map((s, i) => (
                <div key={s.step} className="relative">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
                      {i < 3 ? (
                        <span>{s.step}</span>
                      ) : (
                        <CheckCircle className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <span className="text-xs text-indigo-600 font-medium">{s.time}</span>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{s.title}</h3>
                      <p className="text-gray-600 dark:text-neutral-300 text-sm leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                  {i < 3 && (
                    <div className="hidden lg:block absolute top-5 left-10 w-full h-px bg-indigo-100" style={{ left: "2.75rem", width: "calc(100% - 1rem)" }} />
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Open positions */}
        <section className="py-16 bg-gray-50">
          <Container>
            <CareersJobList jobs={JOBS} lang={lang} isUk={isUk} />

            {/* Open application */}
            <div className="mt-8 bg-indigo-50 border border-indigo-200 rounded-2xl p-6">
              <h3 className="font-semibold text-indigo-900 mb-2">
                {isUk ? "Не знайшли потрібної вакансії?" : "Didn't find the right position?"}
              </h3>
              <p className="text-indigo-700 text-sm mb-4">
                {isUk
                  ? "Надішліть своє резюме — ми завжди раді талановитим людям і зберігаємо всі CV."
                  : "Send us your CV — we're always happy to meet talented people and keep all resumes on file."}
              </p>
              <a
                href={`mailto:hr@codeworth.uk?subject=${isUk ? "Відкрита заявка" : "Open Application"}`}
                className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors text-sm"
              >
                {isUk ? "Надіслати CV" : "Send CV"}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
