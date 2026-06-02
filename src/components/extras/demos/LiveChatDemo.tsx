"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Paperclip, Smile, Check, CheckCheck } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

interface Message {
  id: number;
  from: "user" | "agent";
  text: string;
  time: string;
  read?: boolean;
}

const INITIAL_MESSAGES: Message[] = [
  { id: 1, from: "agent", text: "👋 Привіт! Я Олена з Codeworth. Чим можу допомогти?", time: "14:32" },
];

const AUTO_REPLIES = [
  "Дякую за повідомлення! Передаю ваш запит технічному спеціалісту 👨‍💻",
  "Так, ми реалізуємо подібні проєкти. Який у вас приблизний бюджет та терміни?",
  "Можу запропонувати безкоштовну 30-хвилинну консультацію. Підкажіть зручний час?",
];

const QUICK_REPLIES = [
  { en: "Pricing question", uk: "Питання про ціни" },
  { en: "Project timeline", uk: "Терміни проєкту" },
  { en: "Book consultation", uk: "Записатися" },
];

export function LiveChatDemo({ isUk }: Props) {
  const [open, setOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [replyIdx, setReplyIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    const userMsg: Message = { id: Date.now(), from: "user", text, time, read: false };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    // Mark as delivered (read) after a moment
    setTimeout(() => {
      setMessages((m) => m.map((msg) => msg.id === userMsg.id ? { ...msg, read: true } : msg));
    }, 600);

    // Agent typing + auto-reply
    setTimeout(() => setTyping(true), 800);
    setTimeout(() => {
      setTyping(false);
      const reply = AUTO_REPLIES[replyIdx % AUTO_REPLIES.length];
      setMessages((m) => [...m, { id: Date.now() + 1, from: "agent", text: reply, time }]);
      setReplyIdx((i) => i + 1);
    }, 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-neutral-500">
        {isUk
          ? "Чат-віджет з імітацією оператора, швидкі відповіді, повідомлення про прочитання. Production стек: Chatwoot / Crisp / Tawk."
          : "Chat widget with operator simulation, quick replies, read receipts. Production stack: Chatwoot / Crisp / Tawk."}
      </p>

      <div className="relative h-[500px] rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-linear-to-br from-neutral-50 to-neutral-100 overflow-hidden">
        {/* Faux page content */}
        <div className="p-6 text-neutral-400 text-sm leading-relaxed">
          <p className="mb-2">{isUk ? "Це приклад сторінки сайту з підключеним live-chat віджетом." : "This is a sample website page with live-chat widget enabled."}</p>
          <p>{isUk ? "Віджет розташовано у правому нижньому куті." : "The widget is positioned in the bottom-right corner."}</p>
        </div>

        {/* Chat widget */}
        {!open ? (
          <button
            onClick={() => setOpen(true)}
            className="absolute bottom-4 right-4 w-14 h-14 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition-colors flex items-center justify-center group"
            aria-label={isUk ? "Відкрити чат" : "Open chat"}
          >
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-xs font-bold flex items-center justify-center">
              1
            </span>
          </button>
        ) : (
          <div
            role="dialog"
            aria-label={isUk ? "Live chat" : "Live chat"}
            className="absolute bottom-4 right-4 w-80 max-w-[calc(100%-2rem)] h-[420px] rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-linear-to-r from-indigo-600 to-violet-600 text-white p-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold">
                    О
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Олена</p>
                  <p className="text-xs text-white/70">{isUk ? "Онлайн" : "Online"}</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-white"
                aria-label={isUk ? "Закрити" : "Close"}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2 bg-neutral-50">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                      m.from === "user"
                        ? "bg-indigo-600 text-white rounded-br-sm"
                        : "bg-white border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-bl-sm"
                    }`}
                  >
                    <p className="leading-relaxed">{m.text}</p>
                    <div className={`flex items-center gap-1 mt-1 text-[10px] ${m.from === "user" ? "text-white/70 justify-end" : "text-neutral-400"}`}>
                      <span>{m.time}</span>
                      {m.from === "user" && (
                        m.read ? <CheckCheck className="w-3 h-3" aria-label="Read" /> : <Check className="w-3 h-3" aria-label="Sent" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start" aria-live="polite">
                  <div className="bg-white border border-neutral-200 dark:border-neutral-700 rounded-2xl rounded-bl-sm px-3 py-2.5 flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
            </div>

            {/* Quick replies */}
            {messages.length <= 1 && (
              <div className="px-3 py-2 border-t border-neutral-100 dark:border-neutral-700 bg-white flex flex-wrap gap-1.5">
                {QUICK_REPLIES.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(isUk ? q.uk : q.en)}
                    className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs hover:bg-indigo-100 transition-colors"
                  >
                    {isUk ? q.uk : q.en}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="border-t border-neutral-200 dark:border-neutral-700 p-2 flex items-center gap-1 bg-white">
              <button type="button" className="p-2 text-neutral-400 hover:text-neutral-700" aria-label={isUk ? "Додати файл" : "Attach file"}>
                <Paperclip className="w-4 h-4" />
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isUk ? "Напишіть повідомлення..." : "Type a message..."}
                className="flex-1 px-2 py-1.5 text-sm bg-transparent outline-none placeholder:text-neutral-400"
                aria-label={isUk ? "Повідомлення" : "Message"}
              />
              <button type="button" className="p-2 text-neutral-400 hover:text-neutral-700" aria-label="Emoji">
                <Smile className="w-4 h-4" />
              </button>
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2 rounded-lg bg-indigo-600 text-white disabled:bg-neutral-200 disabled:text-neutral-400 hover:bg-indigo-700 transition-colors"
                aria-label={isUk ? "Надіслати" : "Send"}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
