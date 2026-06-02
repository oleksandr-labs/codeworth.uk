"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { NichePropertyListing } from "@/lib/data/niches";

interface PropertyFilterProps {
  listings: NichePropertyListing[];
  lang: string;
  color: string;
}

const TYPE_FILTERS_UK = ["Всі", "Квартира", "Будинок", "Комерція"];
const TYPE_FILTERS_EN = ["All", "Apartment", "House", "Commercial"];

const ROOM_FILTERS_UK = ["Будь-яка к-сть", "1", "2", "3", "4+"];
const ROOM_FILTERS_EN = ["Any rooms", "1", "2", "3", "4+"];

export function PropertyFilter({ listings, lang, color }: PropertyFilterProps) {
  const isUk = lang === "uk";
  const typeFilters = isUk ? TYPE_FILTERS_UK : TYPE_FILTERS_EN;
  const roomFilters = isUk ? ROOM_FILTERS_UK : ROOM_FILTERS_EN;

  const [activeType, setActiveType] = useState(typeFilters[0]);
  const [activeRooms, setActiveRooms] = useState(roomFilters[0]);

  // Map EN filter labels back to Ukrainian data values
  const typeMap: Record<string, string> = {
    Apartment: "Квартира",
    House: "Будинок",
    Commercial: "Комерція",
  };

  const filtered = useMemo(() => {
    return listings.filter((p) => {
      const typeMatch =
        activeType === typeFilters[0] ||
        p.type === activeType ||
        p.type === typeMap[activeType];

      const rooms = p.rooms ?? 0;
      const roomsMatch =
        activeRooms === roomFilters[0] ||
        (activeRooms === "4+" ? rooms >= 4 : rooms === Number(activeRooms));

      return typeMatch && roomsMatch;
    });
  }, [listings, activeType, activeRooms, typeFilters, roomFilters]);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Type filter */}
        <div className="flex flex-wrap gap-2">
          {typeFilters.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
              style={
                activeType === type
                  ? { backgroundColor: color, color: "#fff" }
                  : { backgroundColor: "transparent", border: `1.5px solid ${color}`, color }
              }
            >
              {type}
            </button>
          ))}
        </div>

        {/* Rooms filter */}
        <div className="flex flex-wrap gap-2 sm:ml-auto">
          <span className="self-center text-sm text-neutral-500 dark:text-neutral-400 mr-1">
            {isUk ? "Кімнат:" : "Rooms:"}
          </span>
          {roomFilters.map((r) => (
            <button
              key={r}
              onClick={() => setActiveRooms(r)}
              className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
              style={
                activeRooms === r
                  ? { backgroundColor: color, color: "#fff" }
                  : {
                      backgroundColor: "rgba(0,0,0,0.04)",
                      color: "currentColor",
                      border: "1.5px solid #e5e7eb",
                    }
              }
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-neutral-400 dark:text-neutral-500 mb-6">
        {isUk
          ? `Знайдено об'єктів: ${filtered.length}`
          : `Found: ${filtered.length} listing${filtered.length !== 1 ? "s" : ""}`}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-neutral-400 dark:text-neutral-500">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-lg font-medium mb-2">
            {isUk ? "Нічого не знайдено" : "No listings found"}
          </p>
          <p className="text-sm">
            {isUk ? "Спробуйте змінити фільтри" : "Try adjusting your filters"}
          </p>
          <button
            onClick={() => { setActiveType(typeFilters[0]); setActiveRooms(roomFilters[0]); }}
            className="mt-4 text-sm underline"
            style={{ color }}
          >
            {isUk ? "Скинути фільтри" : "Reset filters"}
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filtered.map((prop) => (
            <div
              key={prop.id}
              className="group flex flex-col bg-white dark:bg-neutral-800/60 rounded-2xl border border-neutral-100 dark:border-neutral-700 /50 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              {/* Gradient header */}
              <div className={`relative h-40 bg-linear-to-br ${prop.gradient} flex items-center justify-center`}>
                <span className="text-5xl opacity-80">{prop.icon}</span>
                {prop.badge && (
                  <span
                    className={`absolute top-3 left-3 ${prop.badgeColor ?? "bg-indigo-600"} text-white text-xs font-semibold px-2.5 py-1 rounded-full`}
                  >
                    {prop.badge}
                  </span>
                )}
                <span className="absolute top-3 right-3 bg-black/40 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                  {prop.type}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5">
                <h3 className="font-semibold text-neutral-900 dark:text-white mb-1 leading-snug group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                  {prop.title}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3 flex items-center gap-1">
                  📍 {prop.district}
                </p>

                <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400 mb-4">
                  <span>📐 {prop.area}</span>
                  {prop.rooms && (
                    <span>🛏 {prop.rooms} {isUk ? "кімн." : "rooms"}</span>
                  )}
                  {prop.floor && (
                    <span>🏢 {isUk ? `${prop.floor} пов.` : `fl. ${prop.floor}`}</span>
                  )}
                </div>

                {prop.tags && prop.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {prop.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 "
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-auto flex items-center justify-between">
                  <span className="text-lg font-bold font-syne" style={{ color }}>
                    {prop.price}
                  </span>
                  <Link
                    href={`/${lang}/contact`}
                    className="text-sm font-semibold px-4 py-2 rounded-xl transition-colors text-white"
                    style={{ backgroundColor: color }}
                  >
                    {isUk ? "Деталі" : "Details"}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
