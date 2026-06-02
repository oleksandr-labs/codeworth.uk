"use client";

import { useState, useRef, useEffect } from "react";
import { Check, ChevronRight, Calendar, Clock, User, Phone, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { useLocale } from "@/components/layout/LocaleProvider";

interface BookingSectionProps {
  services: { name: string; price: string; duration?: string; icon: string }[];
  color: string;
  gradient: string;
  title?: string;
}

const TIME_SLOTS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

const DAYS_UK = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
const DAYS_EN = ["Mo", "Tu", "We", "Th", "Fr", "Sa"];

function getDemoWeek(locale: string): string[] {
  const today = new Date();
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 1);
    return d.toLocaleDateString(locale === "uk" ? "uk-UA" : "en-US", { day: "2-digit", month: "2-digit" });
  });
}

const STEPS_UK = [
  { label: "Послуга", icon: "🛠" },
  { label: "Дата та час", icon: "📅" },
  { label: "Ваші дані", icon: "👤" },
  { label: "Підтвердження", icon: "✅" },
];

const STEPS_EN = [
  { label: "Service", icon: "🛠" },
  { label: "Date & Time", icon: "📅" },
  { label: "Your details", icon: "👤" },
  { label: "Confirmation", icon: "✅" },
];

export function BookingSection({ services, color, gradient, title }: BookingSectionProps) {
  const lang = useLocale();
  const isUk = lang === "uk";
  const DAYS = isUk ? DAYS_UK : DAYS_EN;
  const STEPS = isUk ? STEPS_UK : STEPS_EN;
  const resolvedTitle = title ?? (isUk ? "Онлайн-запис" : "Online booking");
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const stepContentRef = useRef<HTMLHeadingElement>(null);

  const days = getDemoWeek(lang);

  // Move focus to step content heading when step changes
  useEffect(() => {
    if (stepContentRef.current) {
      stepContentRef.current.focus();
    }
  }, [step]);

  const canNext =
    (step === 0 && selectedService !== null) ||
    (step === 1 && selectedDay !== null && selectedTime !== null) ||
    (step === 2 && form.name.trim().length > 1 && form.phone.trim().length > 5);

  function handleSubmit() {
    setSubmitted(true);
    setStep(3);
  }

  return (
    <section className="py-20 bg-neutral-50 dark:bg-neutral-800/40">
      <Container className="max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold font-syne text-neutral-900 dark:text-white mb-3">
            {resolvedTitle}
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400">
            {isUk ? "Запишіться онлайн за декілька хвилин — без черг та дзвінків" : "Book online in a few minutes — no queues or calls"}
          </p>
        </div>

        {/* Step indicators */}
        <nav aria-label={isUk ? "Кроки запису" : "Booking steps"}>
        <div className="flex items-center justify-center gap-0 mb-10">
          {STEPS.map((s, i) => (
            <div key={s.label} className="flex items-center">
              <button
                onClick={() => { if (i < step) setStep(i); }}
                aria-current={i === step ? "step" : undefined}
                aria-label={isUk
                  ? `Крок ${i + 1}: ${s.label}${i < step ? " (виконано)" : i === step ? " (поточний)" : ""}`
                  : `Step ${i + 1}: ${s.label}${i < step ? " (done)" : i === step ? " (current)" : ""}`}
                disabled={i > step}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all",
                  i === step ? "opacity-100" : i < step ? "opacity-70 cursor-pointer hover:opacity-90" : "opacity-30 cursor-default"
                )}
              >
                <div
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all",
                    i < step ? "text-white" : i === step ? "text-white" : "bg-neutral-200 dark:bg-neutral-700 text-neutral-400"
                  )}
                  style={i <= step ? { backgroundColor: color } : {}}
                >
                  {i < step ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span className="hidden sm:block text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  {s.label}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <div className={cn("h-0.5 w-8 sm:w-12 mx-1 transition-all", i < step ? "bg-current" : "bg-neutral-200 dark:bg-neutral-700")}
                  style={i < step ? { color } : {}} />
              )}
            </div>
          ))}
        </div>
        </nav>

        <div className="bg-white dark:bg-neutral-800/80 rounded-3xl border border-neutral-100 dark:border-neutral-700/50 p-6 md:p-10 shadow-sm">

          {/* Step 0 — Service */}
          {step === 0 && (
            <div>
              <h3
                ref={stepContentRef}
                tabIndex={-1}
                className="text-lg font-bold text-neutral-900 dark:text-white mb-5 flex items-center gap-2 focus:outline-none"
              >
                <Calendar className="w-5 h-5" style={{ color }} />
                {isUk ? "Оберіть послугу" : "Select a service"}
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {services.map((svc, i) => (
                  <button
                    key={svc.name}
                    onClick={() => setSelectedService(i)}
                    className={cn(
                      "flex items-start gap-4 p-4 rounded-2xl border-2 text-left transition-all",
                      selectedService === i
                        ? "border-current bg-current/5"
                        : "border-neutral-100 dark:border-neutral-700/50 hover:border-neutral-200 dark:hover:border-neutral-600"
                    )}
                    style={selectedService === i ? { borderColor: color, backgroundColor: color + "10" } : {}}
                  >
                    <span className="text-2xl shrink-0">{svc.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-neutral-900 dark:text-white text-sm leading-tight mb-1">
                        {svc.name}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                        <span className="font-medium" style={selectedService === i ? { color } : {}}>
                          {svc.price}
                        </span>
                        {svc.duration && <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" />{svc.duration}</span>}
                      </div>
                    </div>
                    {selectedService === i && (
                      <div className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: color }}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1 — Date & Time */}
          {step === 1 && (
            <div>
              <h3
                ref={stepContentRef}
                tabIndex={-1}
                className="text-lg font-bold text-neutral-900 dark:text-white mb-5 flex items-center gap-2 focus:outline-none"
              >
                <Calendar className="w-5 h-5" style={{ color }} />
                {isUk ? "Оберіть дату та час" : "Select date & time"}
              </h3>
              <div className="mb-6">
                <div className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-3">{isUk ? "Дата" : "Date"}</div>
                <div className="grid grid-cols-6 gap-2">
                  {days.map((day, i) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(i)}
                      className={cn(
                        "flex flex-col items-center py-3 rounded-xl border-2 text-xs font-medium transition-all",
                        selectedDay === i
                          ? "text-white border-current"
                          : "border-neutral-100 dark:border-neutral-700/50 text-neutral-700 dark:text-neutral-300 hover:border-neutral-200 dark:hover:border-neutral-600"
                      )}
                      style={selectedDay === i ? { backgroundColor: color, borderColor: color } : {}}
                    >
                      <span className="text-[10px] opacity-70 mb-0.5">{DAYS[i]}</span>
                      {day}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-3">{isUk ? "Час" : "Time"}</div>
                <div className="grid grid-cols-5 gap-2">
                  {TIME_SLOTS.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={cn(
                        "py-2.5 rounded-xl border-2 text-sm font-medium transition-all",
                        selectedTime === time
                          ? "text-white"
                          : "border-neutral-100 dark:border-neutral-700/50 text-neutral-700 dark:text-neutral-300 hover:border-neutral-200 dark:hover:border-neutral-600"
                      )}
                      style={selectedTime === time ? { backgroundColor: color, borderColor: color } : {}}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2 — Contact */}
          {step === 2 && (
            <div>
              <h3
                ref={stepContentRef}
                tabIndex={-1}
                className="text-lg font-bold text-neutral-900 dark:text-white mb-5 flex items-center gap-2 focus:outline-none"
              >
                <User className="w-5 h-5" style={{ color }} />
                {isUk ? "Ваші контактні дані" : "Your contact details"}
              </h3>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    {isUk ? "Ім'я та прізвище" : "Full name"}
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder={isUk ? "Наприклад: Олена Коваль" : "e.g. Jane Smith"}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 transition-all"
                    style={{ ["--tw-ring-color" as string]: color }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    {isUk ? "Номер телефону" : "Phone number"}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      placeholder="+38 (___) ___-__-__"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 transition-all"
                    />
                  </div>
                </div>
                {/* Summary */}
                <div className="rounded-xl p-4 text-sm space-y-1.5" style={{ backgroundColor: color + "12" }}>
                  <div className="font-semibold text-neutral-900 dark:text-white mb-2">{isUk ? "Ваш запис:" : "Your booking:"}</div>
                  <div className="text-neutral-600 dark:text-neutral-300 flex gap-2">
                    <span>🛠</span> {selectedService !== null ? services[selectedService].name : "—"}
                  </div>
                  <div className="text-neutral-600 dark:text-neutral-300 flex gap-2">
                    <span>📅</span> {selectedDay !== null ? days[selectedDay] : "—"}, {selectedTime ?? "—"}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3 — Confirmation */}
          {step === 3 && (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ backgroundColor: color + "20" }}>
                <CheckCircle className="w-8 h-8" style={{ color }} />
              </div>
              <h3
                ref={stepContentRef}
                tabIndex={-1}
                className="text-xl font-bold text-neutral-900 dark:text-white mb-3 focus:outline-none"
              >
                {isUk ? "Запис підтверджено!" : "Booking confirmed!"}
              </h3>
              <p className="text-neutral-500 dark:text-neutral-400 mb-6 max-w-sm mx-auto">
                {isUk ? "Ми надішлемо підтвердження у Telegram або SMS на ваш номер. Чекаємо на вас!" : "We'll send a confirmation via Telegram or SMS to your number. See you soon!"}
              </p>
              <div className="inline-flex flex-col gap-2 text-sm bg-neutral-50 dark:bg-neutral-700/50 rounded-2xl px-6 py-4 text-left">
                <div className="flex gap-3 text-neutral-700 dark:text-neutral-300">
                  <span>🛠</span> <strong>{selectedService !== null ? services[selectedService].name : ""}</strong>
                </div>
                <div className="flex gap-3 text-neutral-700 dark:text-neutral-300">
                  <span>📅</span> {selectedDay !== null ? days[selectedDay] : ""} {isUk ? "о" : "at"} {selectedTime}
                </div>
                <div className="flex gap-3 text-neutral-700 dark:text-neutral-300">
                  <span>👤</span> {form.name}, {form.phone}
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => { setStep(0); setSelectedService(null); setSelectedDay(null); setSelectedTime(null); setForm({ name: "", phone: "" }); setSubmitted(false); }}
                  className="text-sm underline text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                >
                  {isUk ? "Зробити ще один запис" : "Make another booking"}
                </button>
              </div>
            </div>
          )}

          {/* Navigation */}
          {step < 3 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-700/50">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                {isUk ? "← Назад" : "← Back"}
              </button>
              <button
                onClick={() => step === 2 ? handleSubmit() : setStep((s) => s + 1)}
                disabled={!canNext}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:opacity-90"
                style={{ backgroundColor: color }}
              >
                {step === 2 ? (isUk ? "Підтвердити запис" : "Confirm booking") : (isUk ? "Далі" : "Next")}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
