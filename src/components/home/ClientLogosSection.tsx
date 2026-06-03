import { Container } from "@/components/layout/Container";
import { Shield, Award, Clock, Zap } from "lucide-react";

const CLIENT_LOGOS = [
  { name: "Beauty Room", emoji: "💇", color: "from-pink-500 to-rose-500" },
  { name: "TechCargo", emoji: "🚛", color: "from-blue-500 to-indigo-600" },
  { name: "Sweet Bakery", emoji: "🎂", color: "from-amber-500 to-orange-500" },
  { name: "FitLife Club", emoji: "🏋️", color: "from-emerald-500 to-teal-600" },
  { name: "MedCenter+", emoji: "🏥", color: "from-teal-500 to-cyan-600" },
  { name: "LexPro Law", emoji: "⚖️", color: "from-slate-500 to-neutral-600" },
  { name: "InvoiceFlow", emoji: "⚙️", color: "from-violet-500 to-purple-600" },
  { name: "AutoFix", emoji: "🚗", color: "from-zinc-500 to-slate-600" },
  { name: "KidSpace", emoji: "👶", color: "from-yellow-500 to-orange-500" },
  { name: "GreenFarm", emoji: "🌾", color: "from-green-500 to-lime-600" },
  { name: "ModaUA", emoji: "👗", color: "from-fuchsia-500 to-pink-600" },
  { name: "BudPro", emoji: "🏗️", color: "from-amber-600 to-orange-600" },
];

const TRUST_BADGES_UK = [
  { icon: Shield, label: "SSL & HTTPS", desc: "Захищене з'єднання" },
  { icon: Award, label: "Lighthouse 90+", desc: "Продуктивність та SEO" },
  { icon: Clock, label: "24/7 підтримка", desc: "Завжди на зв'язку" },
  { icon: Zap, label: "LCP < 2.5с", desc: "Core Web Vitals" },
];

const TRUST_BADGES_EN = [
  { icon: Shield, label: "SSL & HTTPS", desc: "Secure connection" },
  { icon: Award, label: "Lighthouse 90+", desc: "Performance & SEO" },
  { icon: Clock, label: "24/7 support", desc: "Always available" },
  { icon: Zap, label: "LCP < 2.5s", desc: "Core Web Vitals" },
];

export function ClientLogosSection({ lang }: { lang: string }) {
  const isUk = lang === "uk";
  const TRUST_BADGES = isUk ? TRUST_BADGES_UK : TRUST_BADGES_EN;

  return (
    <section className="py-16 bg-neutral-50 dark:bg-neutral-900 border-y border-neutral-100">
      <Container>
        {/* Trust badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {TRUST_BADGES.map((badge) => (
            <div key={badge.label} className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-100">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                <badge.icon className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <div className="font-semibold text-neutral-900 dark:text-white text-sm">{badge.label}</div>
                <div className="text-xs text-neutral-500">{badge.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Industries */}
        <div className="text-center mb-8">
          <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
            {isUk ? "Ніші які ми покриваємо" : "Industries We Cover"}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {CLIENT_LOGOS.map((client) => (
            <div
              key={client.name}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 hover:border-indigo-200 hover:shadow-sm transition-all"
            >
              <span className="text-lg" aria-hidden="true">{client.emoji}</span>
              <span className="text-sm font-medium text-neutral-700">{client.name}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
