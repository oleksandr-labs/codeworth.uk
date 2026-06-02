"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { CountUp } from "@/components/ui/CountUp";
import { useLocale } from "@/components/layout/LocaleProvider";
import { analytics } from "@/lib/analytics";

const ROTATING_WORDS_UK = ["сайтів", "магазинів", "CRM-систем", "PWA-додатків", "брендів"];
const ROTATING_WORDS_EN = ["websites", "stores", "CRM systems", "PWA apps", "brands"];

const TECH_LOGOS = ["Next.js", "React", "TypeScript", "Tailwind", "Node.js", "PostgreSQL"];

const STATS_UK = [
  { end: 120, suffix: "+", label: "Проєктів" },
  { end: 85, suffix: "+", label: "Клієнтів" },
  { end: 4, suffix: "+", label: "Роки роботи" },
  { end: 98, suffix: "%", label: "Задоволені" },
];

const STATS_EN = [
  { end: 120, suffix: "+", label: "Projects" },
  { end: 85, suffix: "+", label: "Clients" },
  { end: 4, suffix: "+", label: "Years" },
  { end: 98, suffix: "%", label: "Satisfied" },
];

export function HeroSection() {
  const lang = useLocale();
  const isUk = lang === "uk";
  const lp = (path: string) => `/${lang}${path}`;
  const ROTATING_WORDS = isUk ? ROTATING_WORDS_UK : ROTATING_WORDS_EN;
  const STATS = isUk ? STATS_UK : STATS_EN;

  const [currentWord, setCurrentWord] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentWord((prev) => (prev + 1) % ROTATING_WORDS.length);
        setIsAnimating(false);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, [ROTATING_WORDS.length]);

  // Parallax: move decorative orbs on scroll
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (orb1Ref.current) orb1Ref.current.style.transform = `translateY(${y * 0.15}px)`;
      if (orb2Ref.current) orb2Ref.current.style.transform = `translateY(${y * -0.1}px)`;
      if (orb3Ref.current) orb3Ref.current.style.transform = `translateY(${y * 0.08}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden gradient-hero pt-20">
      {/* Background decorations with parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div ref={orb1Ref} className="parallax-layer absolute -top-40 -right-40 w-150 h-150 rounded-full bg-indigo-500/5 blur-3xl" />
        <div ref={orb2Ref} className="parallax-layer absolute top-1/2 -left-40 w-100 h-100 rounded-full bg-amber-400/5 blur-3xl" />
        <div ref={orb3Ref} className="parallax-layer absolute bottom-0 right-1/4 w-75 h-75 rounded-full bg-indigo-600/5 blur-3xl" />

        {/* Grid dots */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle, #6366f1 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          }}
        />
      </div>

      <Container className="relative py-20 lg:py-32">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-indigo-50 border border-indigo-100 text-sm font-medium text-indigo-700">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            {isUk ? "Приймаємо нові проєкти" : "Accepting new projects"}
            <span className="text-indigo-400">•</span>
            {isUk ? "Безкоштовна консультація" : "Free consultation"}
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-extrabold text-neutral-900 mb-6 leading-tight tracking-tight">
            {isUk ? "Розробка" : "Development of"}{" "}
            <span
              className={`gradient-text inline-block transition-all duration-300 ${
                isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
              }`}
            >
              {ROTATING_WORDS[currentWord]}
            </span>
            <br />
            <span className="text-neutral-800">
              {isUk ? "для вашого бізнесу" : "for your business"}
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-neutral-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            {isUk ? (
              <>Codeworth — веб-студія повного циклу. Створюємо сайти, що{" "}
              <span className="text-neutral-700 font-medium">конвертують відвідувачів у клієнтів</span>.
              Від дизайну до запуску — під ключ.</>
            ) : (
              <>Codeworth — a full-cycle web studio. We build websites that{" "}
              <span className="text-neutral-700 font-medium">convert visitors into clients</span>.
              From design to launch — turnkey.</>
            )}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button href={lp("/contact")} size="lg" variant="primary" onClick={() => analytics.ctaClick("consultation", "hero")}>
              {isUk ? "Отримати консультацію" : "Get a consultation"}
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button href={lp("/portfolio")} size="lg" variant="secondary" onClick={() => analytics.ctaClick("portfolio", "hero")}>
              {isUk ? "Дивитися портфоліо" : "View portfolio"}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto mb-16">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-sans font-bold tabular-nums tracking-tight text-neutral-900 mb-1">
                  <CountUp end={stat.end} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-neutral-500">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Tech trust bar */}
          <div>
            <p className="text-xs text-neutral-400 uppercase tracking-widest mb-4">
              {isUk ? "Працюємо на сучасному стеку" : "Built on modern stack"}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {TECH_LOGOS.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-1.5 rounded-full bg-white border border-neutral-200 text-sm font-medium text-neutral-600 shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-400">
        <span className="text-xs tracking-widest uppercase">{isUk ? "Скрол" : "Scroll"}</span>
        <div className="w-5 h-8 rounded-full border-2 border-neutral-300 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-neutral-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
