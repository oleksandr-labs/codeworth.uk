import { MessageCircle } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { CTAForm } from "./CTAForm";

export function CTASection({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  return (
    <section className="py-24 bg-linear-to-br from-indigo-900 via-indigo-800 to-indigo-950 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-amber-400/5 blur-3xl" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <Container className="relative text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/10 border border-white/20 text-sm font-medium text-white/80">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {isUk ? "Зараз приймаємо нові проєкти" : "Now accepting new projects"}
          </div>

          <h2 className="text-4xl lg:text-6xl font-heading font-extrabold text-white mb-6 leading-tight">
            {isUk ? (
              <>Готові запустити<br /><span className="text-amber-400">ваш проєкт?</span></>
            ) : (
              <>Ready to launch<br /><span className="text-amber-400">your project?</span></>
            )}
          </h2>

          <p className="text-lg text-indigo-200 mb-10 leading-relaxed">
            {isUk
              ? "Залишіть заявку та отримайте безкоштовну ML-консультацію протягом 24 годин. Разом визначимо, яке рішення принесе найбільший ROI."
              : "Leave a request and get a free ML consultation within 24 hours. Together we'll identify which solution will deliver the highest ROI."}
          </p>

          {/* Contact form */}
          <CTAForm />

          {/* Alternative contact */}
          <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
            <MessageCircle className="w-4 h-4" />
            {isUk ? "Або напишіть нам у" : "Or message us on"}{" "}
            <span className="text-white/90 font-medium">Telegram</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
