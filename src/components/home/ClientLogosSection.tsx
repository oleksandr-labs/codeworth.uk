import { Container } from "@/components/layout/Container";
import { Shield, Award, Clock, Zap } from "lucide-react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

const CLIENT_LOGOS = [
  { name: "Fintechlabs", emoji: "🏦", color: "from-emerald-500 to-teal-600" },
  { name: "RetailCore", emoji: "🛍️", color: "from-pink-500 to-rose-600" },
  { name: "HealthDesk", emoji: "🏥", color: "from-blue-500 to-indigo-600" },
  { name: "LogiSmart", emoji: "🚛", color: "from-amber-500 to-orange-600" },
  { name: "ShopIQ", emoji: "📊", color: "from-violet-500 to-purple-600" },
  { name: "AgroTrack", emoji: "🌾", color: "from-green-500 to-lime-600" },
  { name: "DocuFlow", emoji: "📄", color: "from-slate-500 to-neutral-600" },
  { name: "SecureID", emoji: "🔐", color: "from-red-500 to-rose-600" },
  { name: "MarketBoost", emoji: "📈", color: "from-cyan-500 to-blue-600" },
  { name: "TriageAI", emoji: "🩺", color: "from-teal-500 to-cyan-600" },
  { name: "VoiceIQ", emoji: "🎙️", color: "from-fuchsia-500 to-pink-600" },
  { name: "ContentForge", emoji: "✍️", color: "from-amber-600 to-orange-600" },
];

const TRUST_BADGES_UK = [
  { icon: Award, label: "F1 Score > 0.92", desc: "Точність моделей" },
  { icon: Shield, label: "GDPR & ISO 27001", desc: "Безпека даних" },
  { icon: Zap, label: "< 100ms inference", desc: "Real-time рішення" },
  { icon: Clock, label: "MLOps 24/7", desc: "Безперервний моніторинг" },
];

const TRUST_BADGES_EN = [
  { icon: Award, label: "F1 Score > 0.92", desc: "Model accuracy benchmark" },
  { icon: Shield, label: "GDPR & ISO 27001", desc: "Data security compliance" },
  { icon: Zap, label: "< 100ms inference", desc: "Real-time model serving" },
  { icon: Clock, label: "MLOps 24/7", desc: "Continuous monitoring" },
];

export function ClientLogosSection({ lang }: { lang: string }) {
  const isUk = lang === "uk";
  const TRUST_BADGES = isUk ? TRUST_BADGES_UK : TRUST_BADGES_EN;

  return (
    <section className="py-16 bg-neutral-50 dark:bg-neutral-900 border-y border-neutral-100 dark:border-neutral-800">
      <Container>
        {/* Trust badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {TRUST_BADGES.map((badge) => (
            <div key={badge.label} className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center shrink-0">
                <badge.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <div className="font-semibold text-neutral-900 dark:text-white text-sm">{badge.label}</div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">{badge.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Client list */}
        <div className="text-center mb-8">
          <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
            {isUk ? "Компанії, що довіряють нашим ML-рішенням" : "Companies trusting our ML solutions"}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {CLIENT_LOGOS.map((client) => (
            <div
              key={client.name}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-sm transition-all"
            >
              <EmojiIcon emoji={client.emoji} className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{client.name}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
