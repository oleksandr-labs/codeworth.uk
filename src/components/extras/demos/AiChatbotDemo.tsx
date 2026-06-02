"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Send, Sparkles, User, RotateCcw } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

interface Message {
  id: number;
  from: "ai" | "user";
  text: string;
  thinking?: boolean;
}

const SUGGESTED = [
  { en: "What are your pricing plans?", uk: "Які у вас тарифи?" },
  { en: "Do you build e-commerce sites?", uk: "Чи робите ви e-commerce?" },
  { en: "How long does a landing take?", uk: "Скільки часу займає лендінг?" },
];

const KNOWLEDGE: Record<string, { en: string; uk: string }> = {
  price: {
    en: "Our plans start from £499 (Starter), £999 (Business), and £1,999 (Enterprise). Each includes hosting setup, SEO basics, and a contact form. Want me to detail what's included?",
    uk: "Наші тарифи: від £499 (Старт), £999 (Бізнес), £1,999 (Преміум). Кожен включає хостинг, базовий SEO та форму. Розповісти, що входить детально?",
  },
  ecom: {
    en: "Yes! We build e-commerce sites from mini-shops (£12,000) to full marketplaces. Cart, checkout, LiqPay/Stripe integration, admin dashboard. Need a quote?",
    uk: "Так! Робимо від міні-магазинів (₴12,000) до повноцінних маркетплейсів. Кошик, checkout, LiqPay/Stripe, адмін-панель. Потрібен розрахунок?",
  },
  time: {
    en: "A typical landing page takes 7–14 days from kickoff to launch. We deliver in 3 sprints with daily updates and Figma previews before development.",
    uk: "Типовий лендінг — 7–14 днів від старту до запуску. 3 спринти з щоденними апдейтами та Figma превʼю перед розробкою.",
  },
  default: {
    en: "Great question! Let me connect you with a human specialist who can give you a precise answer. Would you like me to schedule a call?",
    uk: "Чудове питання! Передам вас людському спеціалісту для точної відповіді. Записати на дзвінок?",
  },
};

function classifyQuery(text: string): keyof typeof KNOWLEDGE {
  const t = text.toLowerCase();
  if (/price|cost|тариф|ціна|вартість/.test(t)) return "price";
  if (/ecom|shop|store|магазин|e-commerce|кошик/.test(t)) return "ecom";
  if (/time|long|fast|час|термін|скільки/.test(t)) return "time";
  return "default";
}

const INITIAL: Message[] = [
  { id: 1, from: "ai", text: "" }, // will be filled by useEffect
];

export function AiChatbotDemo({ isUk }: Props) {
  const [messages, setMessages] = useState<Message[]>(() => [
    { id: 1, from: "ai", text: isUk
        ? "👋 Привіт! Я AI-асистент Codeworth. Можу відповісти про послуги, ціни, терміни. Спробуйте запитати щось."
        : "👋 Hi! I'm the Codeworth AI assistant. I can answer about services, pricing, timelines. Ask me anything." },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, thinking]);

  const send = (text: string) => {
    if (!text.trim() || thinking) return;
    const userMsg: Message = { id: Date.now(), from: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setThinking(true);

    setTimeout(() => {
      const category = classifyQuery(text);
      const reply = isUk ? KNOWLEDGE[category].uk : KNOWLEDGE[category].en;
      setMessages((m) => [...m, { id: Date.now() + 1, from: "ai", text: reply }]);
      setThinking(false);
    }, 1400);
  };

  const reset = () => {
    setMessages([
      { id: 1, from: "ai", text: isUk
          ? "👋 Привіт! Я AI-асистент Codeworth. Можу відповісти про послуги, ціни, терміни. Спробуйте запитати щось."
          : "👋 Hi! I'm the Codeworth AI assistant. I can answer about services, pricing, timelines. Ask me anything." },
    ]);
    setInput("");
  };

  const showSuggestions = messages.length === 1;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-violet-500 to-indigo-600 text-white flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-neutral-900 text-sm">Codeworth AI</p>
            <p className="text-xs text-emerald-600">● {isUk ? "Онлайн · GPT-4" : "Online · GPT-4"}</p>
          </div>
        </div>
        <button
          onClick={reset}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          {isUk ? "Скинути" : "Reset"}
        </button>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden">
        <div ref={scrollRef} className="p-4 space-y-3 h-80 overflow-y-auto bg-linear-to-b from-violet-50/30 to-white">
          {messages.map((m) => (
            <div key={m.id} className={`flex gap-2 ${m.from === "user" ? "justify-end" : "justify-start"}`}>
              {m.from === "ai" && (
                <div className="w-7 h-7 rounded-full bg-linear-to-br from-violet-500 to-indigo-600 text-white flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}
              <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                m.from === "user"
                  ? "bg-indigo-600 text-white rounded-br-sm"
                  : "bg-white border border-neutral-200 text-neutral-800 rounded-bl-sm"
              }`}>
                {m.text}
              </div>
              {m.from === "user" && (
                <div className="w-7 h-7 rounded-full bg-neutral-200 text-neutral-600 flex items-center justify-center shrink-0">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}
          {thinking && (
            <div className="flex gap-2" aria-live="polite">
              <div className="w-7 h-7 rounded-full bg-linear-to-br from-violet-500 to-indigo-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="bg-white border border-neutral-200 rounded-2xl rounded-bl-sm px-3 py-2.5 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-violet-500 animate-pulse" />
                <span className="text-xs text-neutral-500">{isUk ? "AI генерує відповідь..." : "AI is thinking..."}</span>
              </div>
            </div>
          )}
        </div>

        {showSuggestions && (
          <div className="px-4 py-2 border-t border-neutral-100 flex flex-wrap gap-1.5 bg-neutral-50">
            <span className="text-xs text-neutral-500 self-center mr-1">{isUk ? "Спробуйте:" : "Try:"}</span>
            {SUGGESTED.map((s, i) => (
              <button
                key={i}
                onClick={() => send(isUk ? s.uk : s.en)}
                className="px-2.5 py-1 rounded-full bg-white border border-violet-200 text-violet-700 text-xs hover:bg-violet-50 transition-colors"
              >
                {isUk ? s.uk : s.en}
              </button>
            ))}
          </div>
        )}

        <form
          onSubmit={(e) => { e.preventDefault(); send(input); }}
          className="border-t border-neutral-200 p-2 flex items-center gap-2 bg-white"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isUk ? "Запитайте AI-асистента..." : "Ask the AI assistant..."}
            className="flex-1 px-3 py-2 text-sm bg-transparent outline-none placeholder:text-neutral-400"
            disabled={thinking}
            aria-label={isUk ? "Повідомлення" : "Message"}
          />
          <button
            type="submit"
            disabled={!input.trim() || thinking}
            className="p-2 rounded-lg bg-indigo-600 text-white disabled:bg-neutral-200 disabled:text-neutral-400 hover:bg-indigo-700 transition-colors"
            aria-label={isUk ? "Надіслати" : "Send"}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      <p className="text-sm text-neutral-500">
        {isUk
          ? "Production: OpenAI GPT-4o + LangChain + база знань про вашу компанію. Fallback до людини при складних запитах."
          : "Production: OpenAI GPT-4o + LangChain + knowledge base about your company. Human fallback for complex queries."}
      </p>
    </div>
  );
}
