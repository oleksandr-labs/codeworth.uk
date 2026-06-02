"use client";

import { useCallback, useEffect, useState } from "react";

export interface CompareItem {
  slug: string;
  title: string;
  emoji: string;
  priceFrom: number;
  complexity: "simple" | "medium" | "complex";
  features: string[];
  gradient: string;
}

const STORAGE_KEY = "Codeworth-compare";
const MAX_COMPARE = 3;

function readStorage(): CompareItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function useCompare() {
  const [items, setItems] = useState<CompareItem[]>([]);

  // Hydrate from localStorage after mount
  useEffect(() => {
    setItems(readStorage());
  }, []);

  const persist = (next: CompareItem[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setItems(next);
  };

  const addItem = useCallback((item: CompareItem) => {
    const current = readStorage();
    if (current.length >= MAX_COMPARE) return;
    if (current.some((i) => i.slug === item.slug)) return;
    persist([...current, item]);
  }, []);

  const removeItem = useCallback((slug: string) => {
    persist(readStorage().filter((i) => i.slug !== slug));
  }, []);

  const toggleItem = useCallback((item: CompareItem) => {
    const current = readStorage();
    if (current.some((i) => i.slug === item.slug)) {
      persist(current.filter((i) => i.slug !== item.slug));
    } else if (current.length < MAX_COMPARE) {
      persist([...current, item]);
    }
  }, []);

  const clearAll = useCallback(() => {
    persist([]);
  }, []);

  const isSelected = useCallback(
    (slug: string) => items.some((i) => i.slug === slug),
    [items]
  );

  const isFull = items.length >= MAX_COMPARE;

  return { items, addItem, removeItem, toggleItem, clearAll, isSelected, isFull, count: items.length };
}
