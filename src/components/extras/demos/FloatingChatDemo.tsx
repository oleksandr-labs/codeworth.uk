"use client";

import { useState } from "react";
import { MessageCircle, X, Send, Phone, Mail } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

export function FloatingChatDemo({ isUk }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const [customMsg, setCustomMsg] = useState("");
  const [sentMsg, setSentMsg] = useState<string | null>(null);
  const [showChannels, setShowChannels] = useState(false);

  const t = isUk
    ? {
        heading: "Як ми можемо допомогти?",
        subheading: "Зазвичай відповідаємо протягом 15 хвилин",
        placeholder: "Напишіть своє питання...",
        send: "Надіслати",
        sentMsg: "Дякуємо! Ми відповімо вам найближчим часом.",
        channels: "Або зв'яжіться через:",
        faqs: [
          { id: "price", q: "Скільки коштує сайт?", a: "Від 8 000 ₴ для лендінгу до 70 000+ ₴ для інтернет-магазину. Безкоштовна оцінка за 24 год." },
          { id: "time", q: "Скільки часу займе розробка?", a: "Лендінг — 5–10 днів. Корпоративний — 2–4 тижні. Магазин — 4–8 тижнів." },
          { id: "tech", q: "На чому пишете сайти?", a: "Next.js + TypeScript + Tailwind. Швидко, SEO-ready, PWA. Стек на вибір клієнта." },
          { id: "support", q: "Є технічна підтримка?", a: "Так! Є пакети підтримки від 2 500 ₴/міс: оновлення, backup, моніторинг, SLA 4 год." },
        ],
        typing: "Введіть власне запитання нижче ↓",
        close: "Закрити",
        labelOpen: "Відкрити чат",
      }
    : {
        heading: "How can we help?",
        subheading: "We usually reply within 15 minutes",
        placeholder: "Type your question...",
        send: "Send",
        sentMsg: "Thank you! We will get back to you shortly.",
        channels: "Or contact us via:",
        faqs: [
          { id: "price", q: "How much does a website cost?", a: "From £300 for a landing page to £3,000+ for an online store. Free estimate within 24 h." },
          { id: "time", q: "How long does development take?", a: "Landing page: 5–10 days. Corporate: 2–4 weeks. Online store: 4–8 weeks." },
          { id: "tech", q: "What tech stack do you use?", a: "Next.js + TypeScript + Tailwind. Fast, SEO-ready, PWA. Stack adaptable to client needs." },
          { id: "support", q: "Do you offer support?", a: "Yes! Maintenance plans from £100/mo: updates, backup, monitoring, 4-hour SLA." },
        ],
        typing: "Or type your own question below ↓",
        close: "Close",
        labelOpen: "Open chat",
      };

  function handleSend() {
    if (!customMsg.trim()) return;
    setSentMsg(customMsg);
    setCustomMsg("");
  }

  return (
    <div className="relative w-full min-h-[480px] bg-neutral-50 dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-700 overflow-hidden flex flex-col items-center justify-center">
      {/* Background hint text */}
      <div className="text-center px-8">
        <span className="text-5xl block mb-4">💬</span>
        <h3 className="font-heading text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
          {isUk ? "Floating Chat / FAQ-виджет" : "Floating Chat / FAQ Widget"}
        </h3>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-sm">
          {isUk
            ? "Плаваюча кнопка у правому куті. Натисніть → відкриється FAQ-чат."
            : "Floating button in the bottom-right corner. Click it to open the FAQ chat."}
        </p>
      </div>

      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label={t.labelOpen}
        className={`absolute bottom-6 right-6 w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-300/50 flex items-center justify-center transition-all ${isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}
        style={{ transition: "transform 0.2s, opacity 0.2s" }}
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-white text-[10px] font-bold flex items-center justify-center text-white">3</span>
      </button>

      {/* Chat panel */}
      <div
        className={`absolute bottom-6 right-6 w-80 bg-white rounded-3xl shadow-2xl border border-neutral-100 dark:border-neutral-700 transition-all duration-300 origin-bottom-right ${
          isOpen ? "scale-100 opacity-100" : "scale-75 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 bg-linear-to-r from-indigo-600 to-violet-600 rounded-t-3xl">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg shrink-0">
            💬
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-white text-sm truncate">{t.heading}</p>
            <p className="text-indigo-200 text-xs truncate">{t.subheading}</p>
          </div>
          <button
            onClick={() => { setIsOpen(false); setActiveFaq(null); setSentMsg(null); }}
            className="text-indigo-200 hover:text-white transition-colors shrink-0"
            aria-label={t.close}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
          {/* FAQ buttons */}
          {!activeFaq && !sentMsg && (
            <div className="space-y-2">
              {t.faqs.map((faq) => (
                <button
                  key={faq.id}
                  onClick={() => setActiveFaq(faq.id)}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 hover:bg-indigo-50 hover:border-indigo-200 text-xs font-semibold text-neutral-700 dark:text-neutral-300 transition-all"
                >
                  {faq.q}
                </button>
              ))}
              <p className="text-xs text-neutral-400 text-center pt-1">{t.typing}</p>
            </div>
          )}

          {/* FAQ answer */}
          {activeFaq && !sentMsg && (
            <div>
              <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 mb-3 leading-relaxed">
                <p className="font-semibold text-neutral-900 dark:text-white mb-1">{t.faqs.find((f) => f.id === activeFaq)?.q}</p>
                <p>{t.faqs.find((f) => f.id === activeFaq)?.a}</p>
              </div>
              <button
                onClick={() => setActiveFaq(null)}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
              >
                ← {isUk ? "Повернутися" : "Go back"}
              </button>
            </div>
          )}

          {/* Sent confirmation */}
          {sentMsg && (
            <div className="text-center py-4">
              <span className="text-3xl block mb-2">✅</span>
              <p className="text-sm font-semibold text-neutral-900">{t.sentMsg}</p>
              <button onClick={() => setSentMsg(null)} className="mt-2 text-xs text-indigo-600 hover:text-indigo-800 font-semibold">
                {isUk ? "Нове питання" : "New question"}
              </button>
            </div>
          )}

          {/* Channels */}
          {!sentMsg && (
            <div>
              <button
                onClick={() => setShowChannels((v) => !v)}
                className="w-full text-xs text-neutral-400 hover:text-neutral-600 dark:text-neutral-300 transition-colors"
              >
                {t.channels} {showChannels ? "▲" : "▼"}
              </button>
              {showChannels && (
                <div className="flex gap-2 mt-2 justify-center">
                  <a href="#" className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 border border-sky-200 text-xs font-semibold text-sky-700 hover:bg-sky-100 transition-colors">
                    <Phone className="w-3 h-3" /> Telegram
                  </a>
                  <a href="#" className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-green-50 border border-green-200 text-xs font-semibold text-green-700 hover:bg-green-100 transition-colors">
                    📞 Viber
                  </a>
                  <a href="#" className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-50 border border-violet-200 text-xs font-semibold text-violet-700 hover:bg-violet-100 transition-colors">
                    <Mail className="w-3 h-3" /> Email
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input */}
        {!sentMsg && (
          <div className="px-4 pb-4">
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={t.placeholder}
                className="flex-1 px-3 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
              <button
                onClick={handleSend}
                disabled={!customMsg.trim()}
                className="w-9 h-9 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
