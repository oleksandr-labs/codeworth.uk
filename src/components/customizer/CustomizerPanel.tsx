"use client";

import { useState } from "react";
import { Palette, X, ChevronUp, ShoppingCart, Check, Type } from "lucide-react";
import { useParams } from "next/navigation";
import {
  COLOR_PALETTES,
  FONT_PAIRS,
  PACKAGES,
  useCustomizer,
  type PaletteId,
  type FontPairId,
  type PackageId,
} from "./useCustomizer";
import Link from "next/link";

interface Props {
  nicheSlug: string;
}

export function CustomizerPanel({ nicheSlug }: Props) {
  const params = useParams();
  const lang = (params?.lang as string) ?? "en";
  const isUk = lang === "uk";
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const { state, setPalette, setFontPair, setPackage, getOrderUrl } = useCustomizer(nicheSlug);

  if (dismissed) return null;

  const activePalette = COLOR_PALETTES.find((p) => p.id === state.palette)!;
  const activeFontPair = FONT_PAIRS.find((f) => f.id === state.fontPair)!;
  const activePackage = PACKAGES.find((p) => p.id === state.selectedPackage)!;

  return (
    <div
      className={`
        fixed z-50 transition-all duration-300
        bottom-6 right-6
        md:bottom-8 md:right-8
      `}
      role="complementary"
      aria-label={isUk ? "Редактор вигляду сайту" : "Site appearance customizer"}
    >
      <div
        className={`
          bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-700
          transition-all duration-300 overflow-hidden
          ${open ? "w-72 max-h-[90vh]" : "w-auto max-h-14"}
        `}
      >
        {/* Collapsed toggle button */}
        {!open && (
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2.5 px-4 py-3 w-full text-left hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors rounded-2xl"
            aria-expanded={false}
          >
            <Palette className="w-5 h-5 text-indigo-600 shrink-0" />
            <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200 whitespace-nowrap">
              {isUk ? "🎨 Налаштуй свій сайт" : "🎨 Customize your site"}
            </span>
          </button>
        )}

        {/* Expanded panel */}
        {open && (
          <div className="p-4 overflow-y-auto max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                  {isUk ? "Налаштуй свій сайт" : "Customize your site"}
                </span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  aria-label={isUk ? "Згорнути" : "Collapse"}
                >
                  <ChevronUp className="w-4 h-4 text-neutral-500" />
                </button>
                <button
                  onClick={() => { setOpen(false); setDismissed(true); }}
                  className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  aria-label={isUk ? "Закрити" : "Close"}
                >
                  <X className="w-4 h-4 text-neutral-500" />
                </button>
              </div>
            </div>

            {/* Color Palettes */}
            <div className="mb-4">
              <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">
                {isUk ? "Кольорова схема" : "Color scheme"}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {COLOR_PALETTES.map((palette) => {
                  const isActive = state.palette === palette.id;
                  return (
                    <button
                      key={palette.id}
                      onClick={() => setPalette(palette.id as PaletteId)}
                      className={`
                        relative flex flex-col items-center gap-1.5 p-2 rounded-xl border-2 transition-all duration-150
                        ${isActive
                          ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40"
                          : "border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                        }
                      `}
                      aria-pressed={isActive}
                      title={isUk ? palette.labelUk : palette.label}
                    >
                      <div
                        className="w-8 h-8 rounded-full border-2 border-white dark:border-neutral-600 shadow-sm flex items-center justify-center"
                        style={{ backgroundColor: palette.primary }}
                      >
                        {isActive && <Check className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <span className="text-[10px] font-medium text-neutral-600 dark:text-neutral-400 text-center leading-tight">
                        {isUk ? palette.labelUk : palette.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Font Pairs */}
            <div className="mb-4">
              <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <Type className="w-3 h-3" />
                {isUk ? "Шрифти" : "Typography"}
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {FONT_PAIRS.map((pair) => {
                  const isActive = state.fontPair === pair.id;
                  return (
                    <button
                      key={pair.id}
                      onClick={() => setFontPair(pair.id as FontPairId)}
                      className={`
                        flex flex-col items-start px-2.5 py-2 rounded-xl border-2 transition-all duration-150 text-left
                        ${isActive
                          ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40"
                          : "border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                        }
                      `}
                      aria-pressed={isActive}
                    >
                      <span className="text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 leading-tight">
                        {isUk ? pair.labelUk : pair.label}
                      </span>
                      <span className="text-[9px] text-neutral-400 dark:text-neutral-500 leading-tight truncate w-full">
                        {pair.heading === pair.body ? pair.heading : `${pair.heading} / ${pair.body}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Package selector */}
            <div className="mb-4">
              <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">
                {isUk ? "Пакет" : "Package"}
              </p>
              <div className="space-y-1.5">
                {PACKAGES.map((pkg) => {
                  const isActive = state.selectedPackage === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      onClick={() => setPackage(pkg.id as PackageId)}
                      className={`
                        w-full flex items-center justify-between px-3 py-2 rounded-xl border text-sm transition-all duration-150
                        ${isActive
                          ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300"
                          : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 text-neutral-700 dark:text-neutral-300"
                        }
                      `}
                      aria-pressed={isActive}
                    >
                      <div className="flex items-center gap-2">
                        {isActive && <Check className="w-3.5 h-3.5 text-indigo-500 shrink-0" />}
                        {!isActive && <div className="w-3.5 h-3.5" />}
                        <span className="font-medium">{isUk ? pkg.labelUk : pkg.label}</span>
                        {"popular" in pkg && pkg.popular && (
                          <span className="text-[10px] bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 px-1.5 py-0.5 rounded-full font-medium">
                            {isUk ? "Хіт" : "Popular"}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-medium shrink-0">
                        {isUk ? pkg.priceUk : pkg.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected summary */}
            <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 mb-3 text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
              <div className="flex justify-between">
                <span>{isUk ? "Схема:" : "Theme:"}</span>
                <span className="font-medium text-neutral-800 dark:text-neutral-200">
                  {isUk ? activePalette.labelUk : activePalette.label}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{isUk ? "Шрифти:" : "Font:"}</span>
                <span className="font-medium text-neutral-800 dark:text-neutral-200">
                  {isUk ? activeFontPair.labelUk : activeFontPair.label}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{isUk ? "Пакет:" : "Package:"}</span>
                <span className="font-medium text-neutral-800 dark:text-neutral-200">
                  {(isUk ? activePackage.labelUk : activePackage.label)} — {isUk ? activePackage.priceUk : activePackage.price}
                </span>
              </div>
            </div>

            {/* Order CTA */}
            <Link
              href={getOrderUrl(lang)}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors duration-150"
            >
              <ShoppingCart className="w-4 h-4" />
              {isUk ? "Замовити з цим дизайном" : "Order with this design"}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
