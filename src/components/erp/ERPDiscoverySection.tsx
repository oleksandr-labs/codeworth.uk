"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, PhoneCall } from "lucide-react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";
import { Container } from "@/components/layout/Container";

type Step = {
  key: string;
  q: { en: string; uk: string };
  options: { value: string; en: string; uk: string; emoji: string }[];
};

const STEPS: Step[] = [
  {
    key: "system",
    q: { en: "What does your business currently use?", uk: "Що ваш бізнес використовує зараз?" },
    options: [
      { value: "spreadsheets", en: "Spreadsheets (Excel / Google Sheets)", uk: "Таблиці (Excel / Google Sheets)", emoji: "📊" },
      { value: "legacy", en: "Old or generic software", uk: "Стара або загальна програма", emoji: "💾" },
      { value: "mix", en: "Mix of different tools", uk: "Набір різних інструментів", emoji: "🧩" },
      { value: "nothing", en: "Nothing formal yet", uk: "Нічого систематичного", emoji: "📋" },
    ],
  },
  {
    key: "locations",
    q: { en: "How many locations / sites does your business have?", uk: "Скільки локацій / підрозділів у вашому бізнесі?" },
    options: [
      { value: "1", en: "Just one", uk: "Одна", emoji: "🏢" },
      { value: "2-5", en: "2 to 5", uk: "2–5", emoji: "🏬" },
      { value: "6-20", en: "6 to 20", uk: "6–20", emoji: "🏭" },
      { value: "20+", en: "More than 20", uk: "Більше 20", emoji: "🌐" },
    ],
  },
  {
    key: "budget",
    q: { en: "What's your approximate budget?", uk: "Який ваш орієнтовний бюджет?" },
    options: [
      { value: "2-5k", en: "£2,000 – £5,000", uk: "£2 000 – £5 000", emoji: "💷" },
      { value: "5-10k", en: "£5,000 – £10,000", uk: "£5 000 – £10 000", emoji: "💰" },
      { value: "10k+", en: "£10,000+", uk: "£10 000+", emoji: "🏆" },
      { value: "unsure", en: "Not sure yet", uk: "Ще не визначився", emoji: "🤔" },
    ],
  },
  {
    key: "timeline",
    q: { en: "When do you need the system ready?", uk: "Коли вам потрібна готова система?" },
    options: [
      { value: "asap", en: "As soon as possible", uk: "Якнайшвидше", emoji: "🚀" },
      { value: "1-3m", en: "In 1–3 months", uk: "Впродовж 1–3 місяців", emoji: "📅" },
      { value: "3-6m", en: "In 3–6 months", uk: "Впродовж 3–6 місяців", emoji: "🗓️" },
      { value: "exploring", en: "Just exploring right now", uk: "Поки тільки вивчаю", emoji: "🔍" },
    ],
  },
];

const FIT_MESSAGES = {
  en: {
    good: "Sounds like a great fit for a custom ERP.",
    explore: "We can start with a focused MVP and expand from there.",
    standard: "Happy to talk through your options on a free call.",
  },
  uk: {
    good: "Чудовий кандидат для кастомної ERP.",
    explore: "Можемо почати з фокусного MVP і розширювати далі.",
    standard: "Розглянемо ваші варіанти на безкоштовному дзвінку.",
  },
};

function buildContactUrl(lang: string, answers: Record<string, string>): string {
  const params = new URLSearchParams({
    project: "erp-custom",
    system: answers.system ?? "",
    locations: answers.locations ?? "",
    budget: answers.budget ?? "",
    timeline: answers.timeline ?? "",
  });
  return `/${lang === "en" ? "" : lang + "/"}contact?${params.toString()}`.replace("//", "/");
}

function getSubline(answers: Record<string, string>, isUk: boolean): string {
  const msgs = isUk ? FIT_MESSAGES.uk : FIT_MESSAGES.en;
  if (answers.timeline === "asap" || answers.budget === "5-10k" || answers.budget === "10k+") return msgs.good;
  if (answers.timeline === "exploring") return msgs.explore;
  return msgs.standard;
}

export function ERPDiscoverySection({ lang }: { lang: string }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const isUk = lang === "uk";
  const done = step >= STEPS.length;
  const current = STEPS[step];

  const choose = (value: string) => {
    const key = STEPS[step].key;
    const next = { ...answers, [key]: value };
    setAnswers(next);
    if (step < STEPS.length - 1) {
      setStep(s => s + 1);
    } else {
      setStep(STEPS.length);
    }
  };

  return (
    <section className="py-20 bg-neutral-950 text-white" id="discovery">
      <Container>
        <div className="max-w-2xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-300 mb-5">
            <PhoneCall className="w-3.5 h-3.5" />
            {isUk ? "Безкоштовний discovery-дзвінок" : "Free discovery call"}
          </div>
          <h2 className="text-3xl font-heading font-extrabold">
            {isUk ? "Підходить вам кастомна ERP?" : "Is a custom ERP right for you?"}
          </h2>
          <p className="mt-3 text-neutral-400">
            {isUk
              ? "4 швидких питання — і ми покажемо, як саме можемо допомогти."
              : "4 quick questions — we'll show you exactly how we can help."}
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          {!done ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              {/* Progress dots */}
              <div className="flex gap-2 justify-center mb-8">
                {STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${
                      i < step ? "bg-indigo-500 w-8" : i === step ? "bg-white w-8" : "bg-white/20 w-4"
                    }`}
                  />
                ))}
              </div>

              <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3 text-center">
                {isUk ? `Питання ${step + 1} з ${STEPS.length}` : `Question ${step + 1} of ${STEPS.length}`}
              </p>
              <h3 className="text-xl font-heading font-bold text-center mb-6">
                {isUk ? current.q.uk : current.q.en}
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {current.options.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => choose(opt.value)}
                    className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-indigo-500/50 text-left transition-all group"
                  >
                    <EmojiIcon emoji={opt.emoji} className="w-6 h-6 shrink-0 text-white/80" />
                    <span className="text-sm font-medium text-white/90 group-hover:text-white leading-snug">
                      {isUk ? opt.uk : opt.en}
                    </span>
                  </button>
                ))}
              </div>

              {step > 0 && (
                <button
                  onClick={() => setStep(s => s - 1)}
                  className="mt-5 text-xs text-neutral-500 hover:text-neutral-300 transition-colors w-full text-center"
                >
                  ← {isUk ? "Назад" : "Back"}
                </button>
              )}
            </div>
          ) : (
            /* Result card */
            <div className="bg-indigo-600/20 border border-indigo-500/40 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-heading font-extrabold mb-2">
                {isUk ? "Дякуємо!" : "Thanks!"}
              </h3>
              <p className="text-neutral-300 mb-2">{getSubline(answers, isUk)}</p>
              <p className="text-sm text-neutral-400 mb-8">
                {isUk
                  ? "Ваші відповіді допоможуть нам підготуватися до дзвінка."
                  : "Your answers will help us prepare for the call."}
              </p>

              {/* Answer summary */}
              <div className="grid grid-cols-2 gap-2 mb-8 text-left">
                {STEPS.map(s => {
                  const val = answers[s.key];
                  const opt = s.options.find(o => o.value === val);
                  if (!opt) return null;
                  return (
                    <div key={s.key} className="bg-white/5 rounded-xl px-3 py-2">
                      <div className="text-[10px] text-neutral-500 uppercase tracking-wide">{isUk ? s.q.uk.split("?")[0] : s.q.en.split("?")[0]}</div>
                      <div className="text-sm font-medium text-white mt-0.5 flex items-center gap-1.5"><EmojiIcon emoji={opt.emoji} className="w-4 h-4 shrink-0" />{isUk ? opt.uk : opt.en}</div>
                    </div>
                  );
                })}
              </div>

              <Link
                href={buildContactUrl(lang, answers)}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold transition-colors text-white"
              >
                <PhoneCall className="w-4 h-4" />
                {isUk ? "Забронювати безкоштовний дзвінок" : "Book a free discovery call"}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => { setStep(0); setAnswers({}); }}
                className="mt-3 text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                {isUk ? "Пройти ще раз" : "Start over"}
              </button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
