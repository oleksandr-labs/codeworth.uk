"use client";

import { useState } from "react";
import { Package, Check, Truck, Home, MapPin, Search, Clock } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

interface OrderStatus {
  trackingNo: string;
  carrier: "novaposhta" | "ukrposhta" | "meest";
  carrierLabel: string;
  stage: number; // 0-4
  estimatedDelivery: string;
  events: { date: string; time: string; statusEn: string; statusUk: string; locationEn: string; locationUk: string }[];
}

const SAMPLES: Record<string, OrderStatus> = {
  "59000000000": {
    trackingNo: "59000000000",
    carrier: "novaposhta",
    carrierLabel: "Нова Пошта",
    stage: 2,
    estimatedDelivery: "2026-05-06",
    events: [
      { date: "2026-05-04", time: "08:12", statusEn: "Package created", statusUk: "Накладну створено", locationEn: "Kyiv, Sender", locationUk: "Київ, Відправник" },
      { date: "2026-05-04", time: "14:45", statusEn: "Picked up by courier", statusUk: "Прийнято кур'єром", locationEn: "Kyiv, Branch #5", locationUk: "Київ, Відділення №5" },
      { date: "2026-05-05", time: "06:30", statusEn: "In transit to destination", statusUk: "В дорозі до отримувача", locationEn: "Kyiv → Lviv", locationUk: "Київ → Львів" },
    ],
  },
  "20450001234": {
    trackingNo: "20450001234",
    carrier: "ukrposhta",
    carrierLabel: "Укрпошта",
    stage: 4,
    estimatedDelivery: "2026-05-02",
    events: [
      { date: "2026-04-30", time: "10:15", statusEn: "Package created", statusUk: "Накладну створено", locationEn: "Odesa", locationUk: "Одеса" },
      { date: "2026-05-01", time: "08:00", statusEn: "Departed warehouse", statusUk: "Покинуло склад", locationEn: "Odesa hub", locationUk: "Одеса хаб" },
      { date: "2026-05-02", time: "11:32", statusEn: "Arrived at branch", statusUk: "Прибуло у відділення", locationEn: "Lviv Branch #12", locationUk: "Львів Відділення №12" },
      { date: "2026-05-02", time: "16:42", statusEn: "Delivered to recipient", statusUk: "Вручено отримувачу", locationEn: "Lviv", locationUk: "Львів" },
    ],
  },
};

const STAGES = [
  { id: 0, labelEn: "Created", labelUk: "Створено", icon: Package },
  { id: 1, labelEn: "Picked up", labelUk: "Прийнято", icon: Check },
  { id: 2, labelEn: "In transit", labelUk: "В дорозі", icon: Truck },
  { id: 3, labelEn: "At destination", labelUk: "У відділенні", icon: MapPin },
  { id: 4, labelEn: "Delivered", labelUk: "Доставлено", icon: Home },
];

export function EcomTrackingDemo({ isUk }: Props) {
  const [input, setInput] = useState("59000000000");
  const [tracked, setTracked] = useState<OrderStatus | null>(SAMPLES["59000000000"]);
  const [error, setError] = useState<string | null>(null);

  const track = (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    const found = SAMPLES[trimmed];
    if (!found) {
      setError(isUk ? "Накладну не знайдено" : "Tracking number not found");
      setTracked(null);
      return;
    }
    setError(null);
    setTracked(found);
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <form onSubmit={track} className="rounded-2xl border border-neutral-200 bg-white p-4">
        <label htmlFor="tracking-input" className="block text-sm font-semibold text-neutral-900 mb-2">
          {isUk ? "Номер накладної" : "Tracking number"}
        </label>
        <div className="flex gap-2">
          <input
            id="tracking-input"
            type="text"
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(null); }}
            placeholder={isUk ? "Введіть 11-13 цифр" : "Enter 11-13 digits"}
            className={`flex-1 px-3 py-2.5 rounded-lg border ${error ? "border-rose-300" : "border-neutral-200"} focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 text-sm tabular-nums`}
          />
          <button
            type="submit"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
          >
            <Search className="w-4 h-4" />
            {isUk ? "Знайти" : "Track"}
          </button>
        </div>
        <div className="mt-2 text-xs text-neutral-500">
          {isUk ? "Спробуйте:" : "Try:"}{" "}
          {Object.keys(SAMPLES).map((s, i) => (
            <button
              key={s}
              type="button"
              onClick={() => setInput(s)}
              className="font-mono text-indigo-600 hover:underline mr-2"
            >
              {s}{i < Object.keys(SAMPLES).length - 1 ? "," : ""}
            </button>
          ))}
        </div>
        {error && <p role="alert" className="mt-2 text-sm text-rose-600">{error}</p>}
      </form>

      {tracked && (
        <>
          {/* Status banner */}
          <div className={`rounded-2xl p-5 ${tracked.stage === 4 ? "bg-emerald-50 border border-emerald-200" : "bg-indigo-50 border border-indigo-200"}`}>
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div>
                <p className="text-xs uppercase tracking-wider text-neutral-500 mb-1">
                  {isUk ? "Накладна" : "Tracking #"} · {tracked.carrierLabel}
                </p>
                <p className="font-mono font-bold text-neutral-900">{tracked.trackingNo}</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-wider text-neutral-500 mb-1">
                  {tracked.stage === 4 ? (isUk ? "Доставлено" : "Delivered") : (isUk ? "Очікувана доставка" : "Est. delivery")}
                </p>
                <p className="font-bold text-neutral-900 flex items-center gap-1 justify-end">
                  <Clock className="w-4 h-4" />
                  {tracked.estimatedDelivery}
                </p>
              </div>
            </div>
          </div>

          {/* Progress stepper */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-5">
            <div className="relative flex justify-between">
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-neutral-200">
                <div
                  className="h-full bg-emerald-500 transition-all duration-700"
                  style={{ width: `${(tracked.stage / 4) * 100}%` }}
                />
              </div>
              {STAGES.map((stage) => {
                const Icon = stage.icon;
                const done = stage.id <= tracked.stage;
                const active = stage.id === tracked.stage;
                return (
                  <div key={stage.id} className="relative flex flex-col items-center" style={{ width: "20%" }}>
                    <div
                      className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        done
                          ? "bg-emerald-500 text-white"
                          : "bg-neutral-100 text-neutral-400 border-2 border-neutral-200"
                      } ${active && tracked.stage < 4 ? "ring-4 ring-emerald-100 scale-110" : ""}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <p className={`mt-2 text-xs text-center font-medium ${done ? "text-neutral-900" : "text-neutral-400"}`}>
                      {isUk ? stage.labelUk : stage.labelEn}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Timeline */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-5">
            <h3 className="font-bold text-neutral-900 mb-4">{isUk ? "Історія" : "Event history"}</h3>
            <div className="space-y-3">
              {tracked.events.slice().reverse().map((e, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-2.5 h-2.5 rounded-full ${i === 0 ? "bg-emerald-500 ring-4 ring-emerald-100" : "bg-neutral-300"}`} />
                    {i < tracked.events.length - 1 && <div className="flex-1 w-0.5 bg-neutral-200 mt-1" />}
                  </div>
                  <div className="flex-1 pb-2">
                    <p className="font-semibold text-neutral-900 text-sm">{isUk ? e.statusUk : e.statusEn}</p>
                    <div className="flex items-center gap-2 text-xs text-neutral-500 mt-0.5">
                      <span>{e.date} · {e.time}</span>
                      <span>·</span>
                      <span>{isUk ? e.locationUk : e.locationEn}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <p className="text-sm text-neutral-500">
        {isUk
          ? "Інтеграція з API Нова Пошта / Укрпошта / Meest. Push-нотифікації клієнту на ключових етапах."
          : "Integration with Nova Poshta / Ukrposhta / Meest APIs. Push notifications to customer at key stages."}
      </p>
    </div>
  );
}
