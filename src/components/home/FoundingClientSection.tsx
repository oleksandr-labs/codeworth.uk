import Link from "next/link";
import { ArrowRight, Star, Zap, HeartHandshake } from "lucide-react";
import { Container } from "@/components/layout/Container";

const PERKS_UK = [
  { icon: Star, text: "Пріоритетна підтримка протягом 6 місяців" },
  { icon: Zap, text: "Запуск протягом 7–14 днів" },
  { icon: HeartHandshake, text: "Особиста увага та гнучкість умов" },
];

const PERKS_EN = [
  { icon: Star, text: "Priority support for 6 months" },
  { icon: Zap, text: "Launch in 7–14 days" },
  { icon: HeartHandshake, text: "Personal attention and flexible terms" },
];

export function FoundingClientSection({ lang }: { lang: string }) {
  const isUk = lang === "uk";
  const PERKS = isUk ? PERKS_UK : PERKS_EN;

  return (
    <section className="py-20 bg-linear-to-br from-indigo-950 via-indigo-900 to-violet-900 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            {isUk ? "Лімітована пропозиція" : "Limited offer"}
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white mb-4 leading-tight">
            {isUk ? (
              <>Запрошуємо <span className="text-amber-400">перших клієнтів</span></>
            ) : (
              <>Inviting our <span className="text-amber-400">founding clients</span></>
            )}
          </h2>

          <p className="text-lg text-indigo-200 mb-8 leading-relaxed">
            {isUk
              ? "Ми тільки починаємо — і саме зараз ми можемо приділити вашому проєкту максимум уваги. Умови, яких більше не буде."
              : "We're just getting started — which means your project gets our full attention. Terms that won't last."}
          </p>

          {/* Spots counter */}
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white mb-10">
            <div className="flex gap-1">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${i < 7 ? "bg-white/30" : "bg-amber-400"}`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold">
              {isUk ? "3 з 10 місць вільно" : "3 of 10 spots available"}
            </span>
          </div>

          {/* Perks */}
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {PERKS.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 text-left">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-indigo-300" />
                </div>
                <p className="text-sm text-indigo-100 leading-snug">{text}</p>
              </div>
            ))}
          </div>

          <Link
            href={`/${lang}/contact?ref=founding`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-900 font-bold text-base transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-amber-500/30"
          >
            {isUk ? "Забронювати місце" : "Reserve a spot"}
            <ArrowRight className="w-5 h-5" />
          </Link>

          <p className="mt-4 text-xs text-indigo-400">
            {isUk
              ? "Без передплати — просто розкажіть про свій проєкт"
              : "No payment needed — just tell us about your project"}
          </p>
        </div>
      </Container>
    </section>
  );
}
