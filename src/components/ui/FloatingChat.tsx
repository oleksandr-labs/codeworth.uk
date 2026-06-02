"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { X, MessageCircle, Send, ChevronLeft } from "lucide-react";
import { useParams } from "next/navigation";

const CONTACTS = [
  {
    label: "Telegram",
    href: "https://t.me/Codeworth_ua",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z" />
      </svg>
    ),
    color: "bg-sky-500 hover:bg-sky-600",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/Codeworth.ua",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
    color: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500",
  },
];

const QUICK_QUESTIONS_UK = [
  { q: "Скільки коштує сайт?", a: "Лендінг — від 8 000 грн, корпоративний сайт — від 30 000 грн, інтернет-магазин — від 40 000 грн. Точну ціну визначаємо після брифу." },
  { q: "Скільки часу займе?", a: "Лендінг — 5–10 днів, корпоративний — 2–4 тижні, e-commerce — 4–8 тижнів. Залежить від складності." },
  { q: "Які технології?", a: "Next.js, TypeScript, Tailwind CSS, Sanity CMS. Найшвидший стек для SEO та продуктивності." },
  { q: "Чи є гарантія?", a: "Так! 1–6 місяців безкоштовної підтримки залежно від пакету. Баги виправляємо безкоштовно." },
  { q: "Як почати?", a: "Напишіть нам у Telegram або залиште заявку на сторінці контактів. Відповідаємо протягом 2 годин." },
  { q: "Чи є готові рішення?", a: "Так! 33 готових нішевих сайти для різних бізнесів. Запуск за 3 дні від 4 900 грн." },
];

const QUICK_QUESTIONS_EN = [
  { q: "How much does a website cost?", a: "Landing page — from ₴8,000, corporate site — from ₴30,000, e-commerce — from ₴40,000. Exact price is set after a brief." },
  { q: "How long will it take?", a: "Landing page — 5–10 days, corporate — 2–4 weeks, e-commerce — 4–8 weeks. Depends on complexity." },
  { q: "What technologies do you use?", a: "Next.js, TypeScript, Tailwind CSS, Sanity CMS. The fastest stack for SEO and performance." },
  { q: "Is there a warranty?", a: "Yes! 1–6 months of free support depending on the package. Bugs are fixed at no charge." },
  { q: "How do I get started?", a: "Write to us on Telegram or leave a request on the contact page. We respond within 2 hours." },
  { q: "Are there ready-made solutions?", a: "Yes! 33 ready-made niche websites for various businesses. Launch in 3 days from ₴4,900." },
];

type View = "menu" | "chat";
type Message = { role: "bot" | "user"; text: string };

export function FloatingChat() {
  const params = useParams();
  const lang = (params?.lang as string) ?? "en";
  const isUk = lang === "uk";
  const QUICK_QUESTIONS = isUk ? QUICK_QUESTIONS_UK : QUICK_QUESTIONS_EN;

  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("menu");
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: isUk ? "Привіт! 👋 Я помічник Codeworth. Оберіть питання або напишіть у месенджер." : "Hi! 👋 I'm the Codeworth assistant. Choose a question or write to us in a messenger." },
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (view === "chat") setView("menu");
        else setOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, view]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleQuestion = (q: string, a: string) => {
    setMessages((prev) => [...prev, { role: "user", text: q }, { role: "bot", text: a }]);
  };

  const handleClose = () => {
    setOpen(false);
    setView("menu");
  };

  return (
    <div className="fixed bottom-24 right-4 md:bottom-24 md:right-6 z-40 no-print flex flex-col items-end gap-3">
      {/* Chat / Menu panel */}
      {open && (
        <div className="w-80 sm:w-96 bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl shadow-neutral-900/20 border border-neutral-200 dark:border-neutral-700 overflow-hidden animate-fade-up">
          {/* Header */}
          <div className="bg-indigo-600 text-white px-4 py-3 flex items-center gap-3">
            {view === "chat" && (
              <button onClick={() => setView("menu")} className="p-1 hover:bg-white/10 rounded-lg transition-colors" aria-label={isUk ? "Назад" : "Back"}>
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <div className="flex-1">
              <div className="font-semibold text-sm">Codeworth</div>
              <div className="text-xs text-white/70">
                {view === "chat"
                  ? (isUk ? "Швидкі відповіді" : "Quick answers")
                  : (isUk ? "Зв'яжіться з нами" : "Get in touch")}
              </div>
            </div>
            <button onClick={handleClose} className="p-1 hover:bg-white/10 rounded-lg transition-colors" aria-label={isUk ? "Закрити" : "Close"}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {view === "menu" ? (
            <div className="p-4 space-y-2" id="floating-chat-menu" role="menu" aria-label={isUk ? "Контакти" : "Contacts"}>
              {/* Quick answers */}
              <button
                onClick={() => setView("chat")}
                role="menuitem"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 text-sm font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-950/60 transition-colors text-left"
              >
                <MessageCircle className="w-5 h-5 shrink-0" />
                <div>
                  <div>{isUk ? "Швидка відповідь" : "Quick answer"}</div>
                  <div className="text-xs font-normal text-indigo-500/70">{isUk ? "Питання про ціни, терміни, технології" : "Questions about pricing, timelines, tech"}</div>
                </div>
              </button>

              {/* Messengers */}
              {CONTACTS.map((c) => (
                <Link
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="menuitem"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-white text-sm font-semibold shadow-sm ${c.color} transition-all`}
                  onClick={handleClose}
                >
                  {c.icon}
                  {c.label}
                </Link>
              ))}

              {/* Contact page link */}
              <Link
                href={`/${lang}/contact`}
                role="menuitem"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                onClick={handleClose}
              >
                <Send className="w-4 h-4" />
                {isUk ? "Форма на сайті" : "Contact form"}
              </Link>
            </div>
          ) : (
            <div className="flex flex-col h-96">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-indigo-600 text-white rounded-br-md"
                          : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-bl-md"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Quick question buttons */}
              <div className="border-t border-neutral-100 dark:border-neutral-800 p-3">
                <p className="text-xs text-neutral-400 mb-2">{isUk ? "Оберіть питання:" : "Choose a question:"}</p>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_QUESTIONS.map((item) => (
                    <button
                      key={item.q}
                      onClick={() => handleQuestion(item.q, item.a)}
                      className="px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      {item.q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? (isUk ? "Закрити чат" : "Close chat") : (isUk ? "Написати нам" : "Contact us")}
        aria-expanded={open}
        aria-controls="floating-chat-menu"
        className="w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-600/30 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
      >
        {open ? (
          <X className="w-6 h-6" aria-hidden="true" />
        ) : (
          <MessageCircle className="w-6 h-6" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
