import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildAlternates } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { JOBS, getJob, JOB_SLUGS } from "@/lib/data/careers";
import { ApplyForm } from "@/components/careers/ApplyForm";
import { MapPin, Clock, ArrowRight, CheckCircle, Briefcase, Sparkles } from "lucide-react";

export async function generateStaticParams() {
  const langs = ["uk", "en"];
  return langs.flatMap((lang) => JOB_SLUGS.map((position) => ({ lang, position })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; position: string }>;
}): Promise<Metadata> {
  const { lang, position } = await params;
  const job = getJob(position);
  if (!job) return {};
  const isUk = lang === "uk";
  const title = isUk
    ? `${job.titleUk} — Вакансія Codeworth`
    : `${job.titleEn} — Codeworth Career`;
  const desc = isUk ? job.descriptionUk : job.descriptionEn;
  return {
    title,
    description: desc,
    alternates: buildAlternates(lang, `/careers/${position}`),
  };
}

export default async function CareerPositionPage({
  params,
}: {
  params: Promise<{ lang: string; position: string }>;
}) {
  const { lang, position } = await params;
  const job = getJob(position);
  if (!job) notFound();

  const isUk = lang === "uk";

  const jobPostingSchema = {
    "@context": "https://schema.org",
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
    url: `https://codeworth.uk/${lang}/careers/${position}`,
  };

  const requirements = isUk ? job.requirementsUk : job.requirementsEn;
  const niceToHave = isUk ? job.niceToHaveUk : job.niceToHaveEn;
  const responsibilities = isUk ? job.responsibilitiesUk : job.responsibilitiesEn;
  const benefits = isUk ? job.benefitsUk : job.benefitsEn;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }} />
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-linear-to-br from-slate-900 to-indigo-900 py-14">
          <Container>
            <nav className="mb-6 text-sm text-slate-400">
              <Link href={`/${lang}`} className="hover:text-white transition-colors">{isUk ? "Головна" : "Home"}</Link>
              <span className="mx-2">›</span>
              <Link href={`/${lang}/careers`} className="hover:text-white transition-colors">{isUk ? "Вакансії" : "Careers"}</Link>
              <span className="mx-2">›</span>
              <span className="text-white">{isUk ? job.titleUk : job.titleEn}</span>
            </nav>
            {job.isUrgent && (
              <div className="inline-flex items-center gap-1.5 bg-red-500/20 border border-red-500/30 text-red-300 text-xs px-3 py-1 rounded-full mb-4">
                {isUk ? "Терміновий набір" : "Urgent Hiring"}
              </div>
            )}
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {isUk ? job.titleUk : job.titleEn}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-slate-300 text-sm">
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4" />
                {isUk ? job.departmentUk : job.departmentEn}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                {isUk ? job.locationUk : job.locationEn}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {isUk ? job.typeUk : job.typeEn}
              </span>
              <span className="font-semibold text-white">
                {job.salaryMin.toLocaleString()}–{job.salaryMax.toLocaleString()} {job.currency}/{isUk ? "міс" : "mo"}
              </span>
            </div>
          </Container>
        </section>

        {/* Content */}
        <section className="py-12 bg-white">
          <Container>
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Main content */}
              <div className="lg:col-span-2 space-y-10">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {isUk ? "Про роль" : "About the Role"}
                  </h2>
                  <p className="text-gray-700 dark:text-neutral-300 leading-relaxed">
                    {isUk ? job.descriptionUk : job.descriptionEn}
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {isUk ? "Обов'язки" : "Responsibilities"}
                  </h2>
                  <ul className="space-y-2">
                    {responsibilities.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {isUk ? "Вимоги" : "Requirements"}
                  </h2>
                  <ul className="space-y-2">
                    {requirements.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {niceToHave && niceToHave.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {isUk ? "Буде перевагою" : "Nice to Have"}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-neutral-400 mb-4">
                      {isUk
                        ? "Не обов'язково, але дасть перевагу на співбесіді:"
                        : "Not required, but will give you an edge in the interview:"}
                    </p>
                    <ul className="space-y-2">
                      {niceToHave.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {isUk ? "Ми пропонуємо" : "We Offer"}
                  </h2>
                  <ul className="space-y-2">
                    {benefits.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-indigo-500 font-bold shrink-0">❆</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sidebar — apply form */}
              <div>
                <div className="sticky top-8 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                    {isUk ? "Зацікавила вакансія?" : "Interested in this role?"}
                  </h3>
                  <p className="text-gray-500 dark:text-neutral-400 text-sm mb-5">
                    {isUk
                      ? "Заповніть форму — відповідаємо протягом 2 робочих днів."
                      : "Fill in the form — we respond within 2 business days."}
                  </p>
                  <ApplyForm
                    positionTitle={isUk ? job.titleUk : job.titleEn}
                    positionSlug={job.slug}
                    lang={lang}
                    isUk={isUk}
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Other positions */}
        <section className="py-12 bg-gray-50 dark:bg-neutral-900 border-t">
          <Container>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-neutral-200 mb-4">
              {isUk ? "Інші вакансії" : "Other Positions"}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {JOBS.filter((j) => j.slug !== job.slug).map((j) => (
                <Link
                  key={j.slug}
                  href={`/${lang}/careers/${j.slug}`}
                  className="bg-white border border-gray-200 dark:border-neutral-700 rounded-xl p-4 hover:border-indigo-300 transition-colors group"
                >
                  <p className="font-medium text-gray-900 dark:text-white group-hover:text-indigo-700 transition-colors mb-1">
                    {isUk ? j.titleUk : j.titleEn}
                  </p>
                  <p className="text-sm text-gray-500">
                    {isUk ? j.locationUk : j.locationEn} · {j.salaryMin.toLocaleString()}–{j.salaryMax.toLocaleString()} {j.currency}
                  </p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
