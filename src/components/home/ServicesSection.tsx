import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import { SERVICES_DATA, getServiceLocalized } from "@/lib/data/services";

export function ServicesSection({ lang }: { lang: string }) {
  const isUk = lang === "uk";
  const lp = (path: string) => `/${lang}${path}`;
  const services = SERVICES_DATA.map((s) => getServiceLocalized(s.slug, lang) ?? s);

  return (
    <section className="py-24 bg-white dark:bg-neutral-950">
      <Container>
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
            {isUk ? "Наші послуги" : "Our Services"}
          </p>
          <h2 className="text-4xl lg:text-5xl font-heading font-extrabold text-neutral-900 dark:text-white mb-4">
            {isUk ? (
              <>Все що потрібно для{" "}<span className="gradient-text">ML у бізнесі</span></>
            ) : (
              <>Everything you need for{" "}<span className="gradient-text">ML in business</span></>
            )}
          </h2>
          <p className="text-lg text-neutral-500 dark:text-neutral-400">
            {isUk
              ? "Від першого ML-прототипу до MLOps у продакшні — повний цикл."
              : "From first ML prototype to MLOps in production — the full cycle."}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.slug}
                href={lp(`/services/${service.slug}`)}
                className="group relative p-6 rounded-2xl border border-neutral-100 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                    service.bg
                  )}
                >
                  <Icon className={cn("w-6 h-6", service.iconColor)} />
                </div>
                <h3 className="font-heading font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors">
                  {service.shortTitle}
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {isUk ? "Детальніше" : "Learn more"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href={lp("/services")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-400 font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:border-indigo-300 transition-all duration-200"
          >
            {isUk ? "Переглянути всі послуги" : "View all services"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
