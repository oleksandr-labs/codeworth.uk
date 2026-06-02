"use client";

import { useState, useEffect, useCallback } from "react";

export const COLOR_PALETTES = [
  {
    id: "professional",
    label: "Professional",
    labelUk: "Класичний",
    primary: "#1E1B4B",
    accent: "#7C3AED",
    bg: "#FAFAF9",
    swatch: "bg-indigo-900",
  },
  {
    id: "ocean",
    label: "Corporate",
    labelUk: "Корпоративний",
    primary: "#0F3460",
    accent: "#16213E",
    bg: "#E8F4F8",
    swatch: "bg-blue-900",
  },
  {
    id: "forest",
    label: "Natural",
    labelUk: "Природній",
    primary: "#1A3C34",
    accent: "#2D6A4F",
    bg: "#F8FAF5",
    swatch: "bg-emerald-900",
  },
  {
    id: "sunset",
    label: "Warm",
    labelUk: "Теплий",
    primary: "#7B2D00",
    accent: "#E85D04",
    bg: "#FFF8F0",
    swatch: "bg-orange-700",
  },
  {
    id: "rose",
    label: "Elegant",
    labelUk: "Елегантний",
    primary: "#831843",
    accent: "#DB2777",
    bg: "#FFF5F7",
    swatch: "bg-pink-800",
  },
  {
    id: "midnight",
    label: "Dark",
    labelUk: "Темний",
    primary: "#0F0E17",
    accent: "#6366F1",
    bg: "#1A1A2E",
    swatch: "bg-slate-900",
  },
] as const;

export type PaletteId = (typeof COLOR_PALETTES)[number]["id"];

export const FONT_PAIRS = [
  {
    id: "modern",
    label: "Modern",
    labelUk: "Сучасний",
    heading: "Inter",
    body: "Inter",
    googleUrl: null,
  },
  {
    id: "classic",
    label: "Classic",
    labelUk: "Класичний",
    heading: "Playfair Display",
    body: "Lora",
    googleUrl: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lora:wght@400;500&display=swap",
  },
  {
    id: "tech",
    label: "Tech",
    labelUk: "Технічний",
    heading: "Space Grotesk",
    body: "DM Sans",
    googleUrl: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=DM+Sans:wght@400;500&display=swap",
  },
  {
    id: "friendly",
    label: "Friendly",
    labelUk: "Дружній",
    heading: "Nunito",
    body: "Open Sans",
    googleUrl: "https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&family=Open+Sans:wght@400;500&display=swap",
  },
  {
    id: "bold",
    label: "Bold",
    labelUk: "Жирний",
    heading: "Sora",
    body: "Sora",
    googleUrl: "https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap",
  },
] as const;

export type FontPairId = (typeof FONT_PAIRS)[number]["id"];

export const PACKAGES = [
  { id: "basic", label: "Basic", labelUk: "Базовий", price: "£499", priceUk: "від 25 000 ₴" },
  { id: "standard", label: "Standard", labelUk: "Стандарт", price: "£999", priceUk: "від 50 000 ₴", popular: true },
  { id: "premium", label: "Premium", labelUk: "Преміум", price: "£1,999+", priceUk: "від 99 000 ₴" },
] as const;

export type PackageId = (typeof PACKAGES)[number]["id"];

export interface CustomizerState {
  palette: PaletteId;
  fontPair: FontPairId;
  selectedPackage: PackageId;
}

const STORAGE_KEY = "Codeworth-customizer";

function applyPalette(palette: (typeof COLOR_PALETTES)[number]) {
  const root = document.documentElement;
  root.style.setProperty("--customizer-primary", palette.primary);
  root.style.setProperty("--customizer-accent", palette.accent);
  root.setAttribute("data-palette", palette.id);
}

function removePalette() {
  const root = document.documentElement;
  root.style.removeProperty("--customizer-primary");
  root.style.removeProperty("--customizer-accent");
  root.removeAttribute("data-palette");
}

const loadedFonts = new Set<string>();

function applyFontPair(pair: (typeof FONT_PAIRS)[number]) {
  const root = document.documentElement;
  root.style.setProperty("--customizer-font-heading", `'${pair.heading}', sans-serif`);
  root.style.setProperty("--customizer-font-body", `'${pair.body}', sans-serif`);
  root.setAttribute("data-font", pair.id);

  if (pair.googleUrl && !loadedFonts.has(pair.id)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = pair.googleUrl;
    document.head.appendChild(link);
    loadedFonts.add(pair.id);
  }
}

function removeFontPair() {
  const root = document.documentElement;
  root.style.removeProperty("--customizer-font-heading");
  root.style.removeProperty("--customizer-font-body");
  root.removeAttribute("data-font");
}

export function useCustomizer(nicheSlug: string) {
  const [state, setState] = useState<CustomizerState>({
    palette: "professional",
    fontPair: "modern",
    selectedPackage: "standard",
  });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<CustomizerState>;
        setState((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // ignore
    }
  }, []);

  // Apply palette to CSS variables when palette changes
  useEffect(() => {
    const palette = COLOR_PALETTES.find((p) => p.id === state.palette);
    if (palette) applyPalette(palette);
    return () => removePalette();
  }, [state.palette]);

  // Apply font pair when it changes
  useEffect(() => {
    const pair = FONT_PAIRS.find((f) => f.id === state.fontPair);
    if (pair) applyFontPair(pair);
    return () => removeFontPair();
  }, [state.fontPair]);

  const setPalette = useCallback((id: PaletteId) => {
    setState((prev) => {
      const next = { ...prev, palette: id };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const setFontPair = useCallback((id: FontPairId) => {
    setState((prev) => {
      const next = { ...prev, fontPair: id };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const setPackage = useCallback((id: PackageId) => {
    setState((prev) => {
      const next = { ...prev, selectedPackage: id };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const getOrderUrl = useCallback((lang: string) => {
    const params = new URLSearchParams({
      niche: nicheSlug,
      palette: state.palette,
      font: state.fontPair,
      package: state.selectedPackage,
    });
    return `/${lang}/contact?${params.toString()}`;
  }, [nicheSlug, state.palette, state.fontPair, state.selectedPackage]);

  return { state, setPalette, setFontPair, setPackage, getOrderUrl };
}
