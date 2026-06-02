"use client";

import { useState, useEffect, useCallback } from "react";

export interface CartItem {
  id: string;
  slug: string;
  title: string;
  emoji: string;
  package: string;
  price: number;
}

const CART_KEY = "Codeworth-cart";

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch {
    // ignore storage errors
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setItems(loadCart());
    setIsHydrated(true);
  }, []);

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      const next = [...prev, item];
      saveCart(next);
      return next;
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.id !== id);
      saveCart(next);
      return next;
    });
  }, []);

  const updatePackage = useCallback((id: string, pkg: string, price: number) => {
    setItems((prev) => {
      const next = prev.map((i) => (i.id === id ? { ...i, package: pkg, price } : i));
      saveCart(next);
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    saveCart([]);
  }, []);

  const hasItem = useCallback((id: string) => items.some((i) => i.id === id), [items]);

  const subtotal = items.reduce((sum, i) => sum + i.price, 0);
  const count = items.length;

  return {
    items,
    isHydrated,
    count,
    subtotal,
    addItem,
    removeItem,
    updatePackage,
    clearCart,
    hasItem,
  };
}
