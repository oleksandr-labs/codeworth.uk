"use client";

import { useState } from "react";
import { Package, AlertTriangle, TrendingDown, Plus, Search, ArrowUpDown } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

interface SKU {
  id: string;
  name: { en: string; uk: string };
  sku: string;
  stock: number;
  threshold: number;
  reserved: number;
  velocity: number; // units/week
  emoji: string;
}

const INVENTORY: SKU[] = [
  { id: "1", name: { en: "Wool Coat — Camel — M", uk: "Пальто — Camel — M" }, sku: "WC-CAM-M", stock: 12, threshold: 5, reserved: 3, velocity: 4.2, emoji: "🧥" },
  { id: "2", name: { en: "Sneakers Urban — 42", uk: "Кросівки — 42" }, sku: "SN-URB-42", stock: 2, threshold: 10, reserved: 0, velocity: 8.5, emoji: "👟" },
  { id: "3", name: { en: "Leather Bag — Black", uk: "Сумка — чорна" }, sku: "BAG-BLK", stock: 24, threshold: 8, reserved: 5, velocity: 3.1, emoji: "👜" },
  { id: "4", name: { en: "T-Shirt — White — L", uk: "Футболка — біла — L" }, sku: "TS-WHT-L", stock: 0, threshold: 20, reserved: 0, velocity: 12.4, emoji: "👕" },
  { id: "5", name: { en: "Watch — Silver Classic", uk: "Годинник Silver" }, sku: "WTH-SLV", stock: 6, threshold: 4, reserved: 1, velocity: 1.8, emoji: "⌚" },
  { id: "6", name: { en: "Beanie — Wool — One Size", uk: "Шапка — вовна" }, sku: "BNY-WOL", stock: 145, threshold: 30, reserved: 8, velocity: 6.7, emoji: "🧢" },
];

type SortKey = "name" | "stock" | "velocity" | "reorder";

export function EcomInventoryDemo({ isUk }: Props) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("reorder");
  const [filter, setFilter] = useState<"all" | "low" | "out">("all");

  const filtered = INVENTORY
    .filter((i) => {
      if (filter === "low") return i.stock > 0 && i.stock <= i.threshold;
      if (filter === "out") return i.stock === 0;
      return true;
    })
    .filter((i) => {
      const q = search.toLowerCase();
      return !q || i.sku.toLowerCase().includes(q) || (isUk ? i.name.uk : i.name.en).toLowerCase().includes(q);
    })
    .sort((a, b) => {
      if (sortKey === "name") return (isUk ? a.name.uk : a.name.en).localeCompare(isUk ? b.name.uk : b.name.en);
      if (sortKey === "stock") return a.stock - b.stock;
      if (sortKey === "velocity") return b.velocity - a.velocity;
      // reorder priority: out-of-stock first, then below threshold, then by velocity
      const aPri = a.stock === 0 ? 3 : a.stock <= a.threshold ? 2 : 1;
      const bPri = b.stock === 0 ? 3 : b.stock <= b.threshold ? 2 : 1;
      if (aPri !== bPri) return bPri - aPri;
      return b.velocity - a.velocity;
    });

  const outCount = INVENTORY.filter((i) => i.stock === 0).length;
  const lowCount = INVENTORY.filter((i) => i.stock > 0 && i.stock <= i.threshold).length;
  const okCount = INVENTORY.filter((i) => i.stock > i.threshold).length;

  return (
    <div className="space-y-6">
      {/* KPI cards */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => setFilter("all")}
          className={`text-left rounded-xl border p-4 transition-all ${filter === "all" ? "border-indigo-500 bg-indigo-50/30" : "border-neutral-200 bg-white hover:border-neutral-300"}`}
          aria-pressed={filter === "all"}
        >
          <div className="flex items-center gap-2 mb-2 text-xs text-neutral-500 uppercase tracking-wider">
            <Package className="w-3.5 h-3.5" />
            {isUk ? "Всього SKU" : "Total SKUs"}
          </div>
          <div className="text-2xl font-bold text-neutral-900 tabular-nums">{INVENTORY.length}</div>
        </button>
        <button
          onClick={() => setFilter("low")}
          className={`text-left rounded-xl border p-4 transition-all ${filter === "low" ? "border-amber-500 bg-amber-50" : "border-neutral-200 bg-white hover:border-amber-300"}`}
          aria-pressed={filter === "low"}
        >
          <div className="flex items-center gap-2 mb-2 text-xs text-amber-600 uppercase tracking-wider">
            <TrendingDown className="w-3.5 h-3.5" />
            {isUk ? "Закінчуються" : "Low stock"}
          </div>
          <div className="text-2xl font-bold text-amber-700 tabular-nums">{lowCount}</div>
        </button>
        <button
          onClick={() => setFilter("out")}
          className={`text-left rounded-xl border p-4 transition-all ${filter === "out" ? "border-rose-500 bg-rose-50" : "border-neutral-200 bg-white hover:border-rose-300"}`}
          aria-pressed={filter === "out"}
        >
          <div className="flex items-center gap-2 mb-2 text-xs text-rose-600 uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5" />
            {isUk ? "Закінчилось" : "Out of stock"}
          </div>
          <div className="text-2xl font-bold text-rose-700 tabular-nums">{outCount}</div>
        </button>
      </div>

      {/* Search + sort */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isUk ? "Пошук SKU або назви..." : "Search SKU or name..."}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 text-sm"
            aria-label={isUk ? "Пошук" : "Search"}
          />
        </div>
        <button
          onClick={() => setSortKey((k) => k === "reorder" ? "velocity" : k === "velocity" ? "stock" : "reorder")}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-neutral-200 text-sm text-neutral-700 hover:bg-neutral-50"
          aria-label={isUk ? "Сортування" : "Sort"}
        >
          <ArrowUpDown className="w-3.5 h-3.5" />
          {sortKey === "reorder" && (isUk ? "Пріоритет" : "Priority")}
          {sortKey === "velocity" && (isUk ? "Швидкість" : "Velocity")}
          {sortKey === "stock" && (isUk ? "Залишки" : "Stock")}
        </button>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-sm text-neutral-500">
            {isUk ? "Нічого не знайдено" : "No items match the filter"}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200 text-xs uppercase tracking-wider text-neutral-500">
                  <th className="text-left px-3 py-2 font-semibold">{isUk ? "Товар" : "Product"}</th>
                  <th className="text-left px-3 py-2 font-semibold hidden sm:table-cell">SKU</th>
                  <th className="text-right px-3 py-2 font-semibold">{isUk ? "Склад" : "Stock"}</th>
                  <th className="text-right px-3 py-2 font-semibold hidden md:table-cell">{isUk ? "Резерв" : "Reserved"}</th>
                  <th className="text-right px-3 py-2 font-semibold hidden md:table-cell">{isUk ? "Швид-ть" : "Velocity"}</th>
                  <th className="text-right px-3 py-2 font-semibold">{isUk ? "Дії" : "Actions"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filtered.map((item) => {
                  const isOut = item.stock === 0;
                  const isLow = item.stock > 0 && item.stock <= item.threshold;
                  const available = item.stock - item.reserved;
                  return (
                    <tr key={item.id} className={isOut ? "bg-rose-50/30" : isLow ? "bg-amber-50/30" : ""}>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{item.emoji}</span>
                          <span className="font-medium text-neutral-900">{isUk ? item.name.uk : item.name.en}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2.5 hidden sm:table-cell">
                        <span className="font-mono text-xs text-neutral-500">{item.sku}</span>
                      </td>
                      <td className="px-3 py-2.5 text-right">
                        <span className={`font-bold tabular-nums ${isOut ? "text-rose-600" : isLow ? "text-amber-600" : "text-neutral-900"}`}>
                          {item.stock}
                        </span>
                        <div className="text-xs text-neutral-400">{isUk ? "поріг" : "min"} {item.threshold}</div>
                      </td>
                      <td className="px-3 py-2.5 text-right hidden md:table-cell">
                        <span className="text-neutral-600 tabular-nums">{item.reserved}</span>
                        <div className="text-xs text-neutral-400">{isUk ? "доступно" : "avail"} {available}</div>
                      </td>
                      <td className="px-3 py-2.5 text-right hidden md:table-cell tabular-nums text-neutral-600">
                        {item.velocity}/{isUk ? "тиж" : "wk"}
                      </td>
                      <td className="px-3 py-2.5 text-right">
                        <button className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold transition-colors ${
                          isOut || isLow
                            ? "bg-indigo-600 text-white hover:bg-indigo-700"
                            : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                        }`}>
                          <Plus className="w-3 h-3" />
                          {isUk ? "Поповнити" : "Reorder"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-sm text-neutral-500">
        {isUk
          ? "Inventory dashboard: KPI cards, фільтри (всі/low/out), сортування за пріоритетом, search, reorder. Auto-alerts при стандартному threshold."
          : "Inventory dashboard: KPI cards, filters (all/low/out), priority sort, search, reorder button. Auto-alerts at threshold."}
      </p>
    </div>
  );
}
