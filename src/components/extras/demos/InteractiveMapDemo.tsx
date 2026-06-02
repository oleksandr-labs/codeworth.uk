"use client";

import { useState } from "react";
import { MapPin, Filter, Phone, Clock, X } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

interface Marker {
  id: string;
  name: string;
  category: "cafe" | "pickup" | "office";
  x: number; // percent
  y: number;
  phone: string;
  hours: string;
}

const MARKERS: Marker[] = [
  { id: "m1", name: "Kyiv · Khreshchatyk", category: "cafe", x: 52, y: 35, phone: "+380 44 555-1111", hours: "8:00–22:00" },
  { id: "m2", name: "Kyiv · Podil", category: "cafe", x: 48, y: 30, phone: "+380 44 555-2222", hours: "9:00–23:00" },
  { id: "m3", name: "Kyiv · Pechersk", category: "cafe", x: 56, y: 42, phone: "+380 44 555-3333", hours: "8:00–22:00" },
  { id: "m4", name: "Kyiv · Office HQ", category: "office", x: 50, y: 38, phone: "+380 44 555-0000", hours: "9:00–18:00" },
  { id: "m5", name: "Lviv · Pickup", category: "pickup", x: 18, y: 32, phone: "+380 32 555-4444", hours: "10:00–20:00" },
  { id: "m6", name: "Odesa · Pickup", category: "pickup", x: 38, y: 78, phone: "+380 48 555-5555", hours: "10:00–20:00" },
  { id: "m7", name: "Kharkiv · Cafe", category: "cafe", x: 78, y: 38, phone: "+380 57 555-6666", hours: "8:00–22:00" },
  { id: "m8", name: "Dnipro · Pickup", category: "pickup", x: 65, y: 55, phone: "+380 56 555-7777", hours: "10:00–20:00" },
];

const CATEGORIES = {
  all: { en: "All", uk: "Всі", color: "bg-neutral-600" },
  cafe: { en: "Cafés", uk: "Кав'ярні", color: "bg-rose-500" },
  pickup: { en: "Pickup points", uk: "Самовивіз", color: "bg-emerald-500" },
  office: { en: "Office", uk: "Офіс", color: "bg-indigo-500" },
};

export function InteractiveMapDemo({ isUk }: Props) {
  const [filter, setFilter] = useState<keyof typeof CATEGORIES>("all");
  const [selected, setSelected] = useState<Marker | null>(null);

  const visible = MARKERS.filter((m) => filter === "all" || m.category === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <Filter className="w-4 h-4 text-neutral-400" />
        {(Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>).map((k) => (
          <button
            key={k}
            onClick={() => setFilter(k)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              filter === k
                ? `${CATEGORIES[k].color} text-white shadow-sm`
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
            aria-pressed={filter === k}
          >
            {isUk ? CATEGORIES[k].uk : CATEGORIES[k].en}
            <span className="ml-1 text-xs opacity-70 tabular-nums">
              ({k === "all" ? MARKERS.length : MARKERS.filter((m) => m.category === k).length})
            </span>
          </button>
        ))}
      </div>

      <div className="relative rounded-2xl border border-neutral-200 bg-linear-to-br from-emerald-50 to-blue-50 overflow-hidden aspect-[2/1]">
        {/* Stylized map background — simplified Ukraine outline as SVG */}
        <svg
          viewBox="0 0 100 60"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          <path
            d="M 8 28 L 18 22 L 32 18 L 48 18 L 62 22 L 78 28 L 88 36 L 86 48 L 72 54 L 58 56 L 40 56 L 22 50 L 12 40 Z"
            fill="rgba(99, 102, 241, 0.1)"
            stroke="rgba(99, 102, 241, 0.4)"
            strokeWidth="0.3"
          />
        </svg>

        {/* Markers */}
        {visible.map((m) => (
          <button
            key={m.id}
            onClick={() => setSelected(m)}
            className={`absolute w-8 h-8 -translate-x-1/2 -translate-y-full rounded-full ${CATEGORIES[m.category].color} text-white flex items-center justify-center shadow-lg hover:scale-125 transition-transform`}
            style={{ left: `${m.x}%`, top: `${m.y}%` }}
            aria-label={m.name}
          >
            <MapPin className="w-4 h-4" />
          </button>
        ))}

        {/* Popup */}
        {selected && (
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-72 max-w-[90%] bg-white rounded-xl shadow-xl border border-neutral-200 p-4"
            role="dialog"
            aria-label={selected.name}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${CATEGORIES[selected.category].color}`} />
                <h3 className="font-bold text-neutral-900">{selected.name}</h3>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-neutral-400 hover:text-neutral-700 -mt-1 -mr-1 p-1"
                aria-label={isUk ? "Закрити" : "Close"}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1.5 text-sm">
              <div className="flex items-center gap-2 text-neutral-600">
                <Phone className="w-3.5 h-3.5 text-neutral-400" />
                <a href={`tel:${selected.phone}`} className="hover:text-indigo-600">{selected.phone}</a>
              </div>
              <div className="flex items-center gap-2 text-neutral-600">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                <span>{selected.hours}</span>
              </div>
            </div>
          </div>
        )}

        {/* Empty state */}
        {visible.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-neutral-400 text-sm">
            {isUk ? "Немає точок для цього фільтра" : "No points for this filter"}
          </div>
        )}
      </div>

      <p className="text-sm text-neutral-500">
        {isUk
          ? "Кастомні маркери, фільтри по категоріях, попапи з контактами. Production-стек: Leaflet.js або Mapbox GL."
          : "Custom markers, category filters, contact popups. Production stack: Leaflet.js or Mapbox GL."}
      </p>
    </div>
  );
}
