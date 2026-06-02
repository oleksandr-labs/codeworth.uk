"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { NicheMenuItem } from "@/lib/data/niches";

interface MenuFilterProps {
  items: NicheMenuItem[];
  lang: string;
  color: string;
}

const DIET_TAGS_UK = ["Всі", "Веганське", "Вегетаріанське", "Без глютену", "Гостре"];
const DIET_TAGS_EN = ["All", "Vegan", "Vegetarian", "Gluten-Free", "Spicy"];

const DIET_MAP_EN_TO_UK: Record<string, string> = {
  Vegan: "Веганське",
  Vegetarian: "Вегетаріанське",
  "Gluten-Free": "Без глютену",
  Spicy: "Гостре",
};

export function MenuFilter({ items, lang, color }: MenuFilterProps) {
  const isUk = lang === "uk";

  const categories = useMemo(() => {
    const unique = Array.from(new Set(items.map((i) => i.category)));
    return [isUk ? "Всі" : "All", ...unique];
  }, [items, isUk]);

  const dietTags = isUk ? DIET_TAGS_UK : DIET_TAGS_EN;

  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [activeDiet, setActiveDiet] = useState(dietTags[0]);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const catMatch =
        activeCategory === (isUk ? "Всі" : "All") ||
        item.category === activeCategory;

      const dietAll = activeDiet === (isUk ? "Всі" : "All");
      const tagToFind = isUk ? activeDiet : (DIET_MAP_EN_TO_UK[activeDiet] ?? activeDiet);
      const dietMatch = dietAll || (item.tags?.some((t) => t === tagToFind) ?? false);

      return catMatch && dietMatch;
    });
  }, [items, activeCategory, activeDiet, isUk]);

  const resetFilters = () => {
    setActiveCategory(categories[0]);
    setActiveDiet(dietTags[0]);
  };

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col gap-3 mb-8">
        {/* Category chips */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
              style={
                activeCategory === cat
                  ? { backgroundColor: color, color: "#fff" }
                  : { backgroundColor: "transparent", border: `1.5px solid ${color}`, color }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Diet tag chips */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-neutral-500 dark:text-neutral-400 mr-1">
            {isUk ? "Тип:" : "Diet:"}
          </span>
          {dietTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveDiet(tag)}
              className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
              style={
                activeDiet === tag
                  ? { backgroundColor: color, color: "#fff" }
                  : { backgroundColor: "rgba(0,0,0,0.04)", color: "currentColor", border: "1.5px solid #e5e7eb" }
              }
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-neutral-400 dark:text-neutral-500 mb-6">
        {isUk
          ? `Знайдено страв: ${filtered.length}`
          : `Found: ${filtered.length} dish${filtered.length !== 1 ? "es" : ""}`}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-neutral-400 dark:text-neutral-500">
          <div className="text-5xl mb-4">🍽️</div>
          <p className="text-lg font-medium mb-2">
            {isUk ? "Нічого не знайдено" : "No dishes found"}
          </p>
          <p className="text-sm mb-4">
            {isUk ? "Спробуйте змінити фільтри" : "Try adjusting your filters"}
          </p>
          <button
            onClick={resetFilters}
            className="text-sm underline"
            style={{ color }}
          >
            {isUk ? "Скинути фільтри" : "Reset filters"}
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {filtered.map((dish) => (
            <div
              key={dish.id}
              className="group flex flex-col bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-700 /50 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className={`relative h-32 bg-linear-to-br ${dish.gradient} flex items-center justify-center`}>
                <span className="text-5xl opacity-90">{dish.icon}</span>
                {dish.badge && (
                  <span className={`absolute top-2 left-2 ${dish.badgeColor ?? "bg-neutral-700"} text-white text-[10px] font-bold px-2 py-0.5 rounded-full`}>
                    {dish.badge}
                  </span>
                )}
                <span className="absolute top-2 right-2 bg-black/40 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                  {dish.category}
                </span>
              </div>

              <div className="flex flex-col flex-1 p-4">
                <h3 className="font-semibold text-sm text-neutral-900 dark:text-white mb-1 leading-snug">
                  {dish.name}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3 flex-1 leading-relaxed">
                  {dish.description}
                </p>

                {(dish.weight || dish.calories) && (
                  <div className="flex gap-2 text-[10px] text-neutral-400 dark:text-neutral-500 mb-2">
                    {dish.weight && <span>⚖️ {dish.weight}</span>}
                    {dish.calories && <span>🔥 {dish.calories}</span>}
                  </div>
                )}

                {dish.tags && dish.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {dish.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-auto flex items-center justify-between">
                  <span className="text-base font-bold font-syne" style={{ color }}>
                    {dish.price}
                  </span>
                  <Link
                    href={`/${lang}/contact`}
                    className="text-[11px] font-semibold px-3 py-1.5 rounded-lg border transition-colors"
                    style={{ borderColor: color, color }}
                  >
                    {isUk ? "Замовити" : "Order"}
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
