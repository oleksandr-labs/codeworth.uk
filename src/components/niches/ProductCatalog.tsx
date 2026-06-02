"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { NicheProductCard } from "@/lib/data/niches";

interface ProductCatalogProps {
  products: NicheProductCard[];
  lang: string;
  color: string;
}

export function ProductCatalog({ products, lang, color }: ProductCatalogProps) {
  const isUk = lang === "uk";

  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.category)));
    return [isUk ? "Всі" : "All", ...unique];
  }, [products, isUk]);

  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const filtered = useMemo(() => {
    const all = isUk ? "Всі" : "All";
    return activeCategory === all
      ? products
      : products.filter((p) => p.category === activeCategory);
  }, [products, activeCategory, isUk]);

  return (
    <div>
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
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

      {/* Results count */}
      <p className="text-sm text-neutral-400 dark:text-neutral-500 mb-6">
        {isUk
          ? `Товарів: ${filtered.length}`
          : `${filtered.length} product${filtered.length !== 1 ? "s" : ""}`}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-neutral-400 dark:text-neutral-500">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-lg font-medium mb-2">
            {isUk ? "Нічого не знайдено" : "No products found"}
          </p>
          <button
            onClick={() => setActiveCategory(categories[0])}
            className="mt-2 text-sm underline"
            style={{ color }}
          >
            {isUk ? "Показати всі" : "Show all"}
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-700/50 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className={`relative h-44 bg-linear-to-br ${product.gradient} flex items-center justify-center`}>
                <span className="text-6xl opacity-90">{product.icon}</span>
                {product.badge && (
                  <span className={`absolute top-2 left-2 ${product.badgeColor ?? "bg-neutral-700"} text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full`}>
                    {product.badge}
                  </span>
                )}
                <span className="absolute top-2 right-2 bg-black/40 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                  {product.category}
                </span>
              </div>

              <div className="flex flex-col flex-1 p-4">
                <h3 className="font-semibold text-sm text-neutral-900 dark:text-white mb-2 leading-snug">
                  {product.name}
                </h3>

                {/* Sizes */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {product.sizes.map((sz) => (
                    <span key={sz} className="text-[10px] px-1.5 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 font-medium">
                      {sz}
                    </span>
                  ))}
                </div>

                {product.tags && product.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {product.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-auto flex items-center justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="text-base font-bold font-syne" style={{ color }}>
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-neutral-400 line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/${lang}/contact`}
                    className="text-[11px] font-semibold px-3 py-1.5 rounded-lg border transition-colors shrink-0"
                    style={{ borderColor: color, color }}
                  >
                    {isUk ? "Купити" : "Buy"}
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
