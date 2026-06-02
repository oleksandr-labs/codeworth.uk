"use client";

import { useState } from "react";
import { Bell, Mail, MessageSquare, Check, Users, Clock } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

const PRODUCT = {
  nameEn: "Limited Edition Sneakers",
  nameUk: "Лімітовані кросівки",
  emoji: "👟",
  color: "from-violet-600 to-indigo-700",
  size: "M",
  inQueue: 247,
  expectedDate: "2026-05-18",
};

type Channel = "email" | "sms" | "telegram";

export function EcomBackInStockDemo({ isUk }: Props) {
  const [channels, setChannels] = useState<Set<Channel>>(new Set(["email"]));
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const toggle = (c: Channel) => {
    setChannels((s) => {
      const next = new Set(s);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || channels.size === 0) return;
    setSubscribed(true);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden">
        <div className={`relative aspect-video bg-linear-to-br ${PRODUCT.color} flex items-center justify-center text-8xl`}>
          {PRODUCT.emoji}
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-rose-500 text-white text-xs font-bold flex items-center gap-1">
            ✕ {isUk ? "Немає в наявності" : "Out of stock"}
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-bold text-neutral-900 text-lg mb-1">{isUk ? PRODUCT.nameUk : PRODUCT.nameEn}</h3>
          <p className="text-sm text-neutral-500 mb-3">
            {isUk ? `Розмір ${PRODUCT.size}` : `Size ${PRODUCT.size}`}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 pb-3 border-b border-neutral-100">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-indigo-500" />
              <span><strong>{PRODUCT.inQueue}</strong> {isUk ? "в черзі" : "in queue"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>{isUk ? "Очікується: " : "Expected: "}{PRODUCT.expectedDate}</span>
            </div>
          </div>

          {subscribed ? (
            <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <Check className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-emerald-900 mb-1">
                  {isUk ? `Ви #${PRODUCT.inQueue + 1} в черзі` : `You are #${PRODUCT.inQueue + 1} in queue`}
                </p>
                <p className="text-sm text-emerald-700">
                  {isUk
                    ? `Ми повідомимо ${[...channels].map((c) => c === "email" ? "email" : c === "sms" ? "SMS" : "Telegram").join(" + ")} коли товар з'явиться.`
                    : `We'll notify you via ${[...channels].map((c) => c.toUpperCase()).join(" + ")} when in stock.`}
                </p>
                <button
                  onClick={() => { setSubscribed(false); setEmail(""); setPhone(""); }}
                  className="mt-2 text-xs text-emerald-700 hover:underline"
                >
                  {isUk ? "Скасувати підписку" : "Cancel subscription"}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-4 space-y-4">
              <div>
                <p className="text-sm font-semibold text-neutral-900 mb-2 flex items-center gap-1.5">
                  <Bell className="w-4 h-4 text-indigo-500" />
                  {isUk ? "Канали сповіщень" : "Notification channels"}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { id: "email", icon: Mail, labelEn: "Email", labelUk: "Email" },
                    { id: "sms", icon: MessageSquare, labelEn: "SMS", labelUk: "SMS" },
                    { id: "telegram", icon: Bell, labelEn: "Telegram", labelUk: "Telegram" },
                  ] as const).map((ch) => {
                    const Icon = ch.icon;
                    const active = channels.has(ch.id);
                    return (
                      <button
                        key={ch.id}
                        type="button"
                        onClick={() => toggle(ch.id)}
                        className={`flex flex-col items-center gap-1 p-3 rounded-lg border transition-all ${
                          active
                            ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                            : "border-neutral-200 hover:border-neutral-400 text-neutral-600"
                        }`}
                        aria-pressed={active}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-xs font-medium">{isUk ? ch.labelUk : ch.labelEn}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-3 py-2.5 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 text-sm"
                aria-label="Email"
              />

              {(channels.has("sms") || channels.has("telegram")) && (
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+380 ..."
                  className="w-full px-3 py-2.5 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 text-sm"
                  aria-label={isUk ? "Телефон" : "Phone"}
                />
              )}

              <button
                type="submit"
                disabled={!email.trim() || channels.size === 0}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed transition-colors"
              >
                <Bell className="w-4 h-4" />
                {isUk ? "Повідомити мене" : "Notify me"}
              </button>
            </form>
          )}
        </div>
      </div>

      <p className="text-sm text-neutral-500">
        {isUk
          ? "Subscribe → черга в БД → автоматичне повідомлення через Email/SMS/Telegram коли товар знову в наявності."
          : "Subscribe → queue in DB → automatic notification via Email/SMS/Telegram when restocked."}
      </p>
    </div>
  );
}
