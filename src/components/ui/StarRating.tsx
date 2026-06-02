"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/layout/LocaleProvider";

interface StarRatingProps {
  value?: number;
  max?: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
}

const sizeMap = {
  sm: "w-3.5 h-3.5",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

const textSizeMap = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export function StarRating({
  value = 0,
  max = 5,
  onChange,
  readonly = false,
  size = "md",
  showValue = false,
  reviewCount,
  className,
}: StarRatingProps) {
  const isUk = useLocale() === "uk";
  const [hovered, setHovered] = useState(0);

  const display = readonly ? value : (hovered || value);

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <div
        className="flex items-center gap-0.5"
        role={readonly ? "img" : "radiogroup"}
        aria-label={isUk ? `Рейтинг: ${value} з ${max}` : `Rating: ${value} out of ${max}`}
      >
        {Array.from({ length: max }, (_, i) => i + 1).map((star) => {
          const filled = star <= display;
          const partial = !filled && star - 1 < display && display < star;

          return (
            <button
              key={star}
              type="button"
              disabled={readonly}
              onClick={() => onChange?.(star)}
              onMouseEnter={() => !readonly && setHovered(star)}
              onMouseLeave={() => !readonly && setHovered(0)}
              aria-label={isUk ? `${star} зір${star === 1 ? "ка" : star < 5 ? "ки" : "ок"}` : `${star} star${star === 1 ? "" : "s"}`}
              aria-pressed={!readonly ? star === value : undefined}
              className={cn(
                "transition-transform duration-100",
                !readonly && "cursor-pointer hover:scale-110 active:scale-95",
                readonly && "cursor-default"
              )}
            >
              {partial ? (
                // Half-filled star via clip
                <span className="relative inline-block">
                  <Star className={cn(sizeMap[size], "text-neutral-200 dark:text-neutral-700 dark:text-neutral-300 fill-neutral-200 dark:fill-neutral-700")} />
                  <span className="absolute inset-0 overflow-hidden" style={{ width: `${(display - (star - 1)) * 100}%` }}>
                    <Star className={cn(sizeMap[size], "text-amber-400 fill-amber-400")} />
                  </span>
                </span>
              ) : (
                <Star
                  className={cn(
                    sizeMap[size],
                    "transition-colors duration-100",
                    filled
                      ? "text-amber-400 fill-amber-400"
                      : "text-neutral-200 dark:text-neutral-700 dark:text-neutral-300 fill-neutral-200 dark:fill-neutral-700",
                    !readonly && !filled && "group-hover:text-amber-200"
                  )}
                />
              )}
            </button>
          );
        })}
      </div>

      {showValue && (
        <span className={cn("font-semibold text-neutral-700 dark:text-neutral-300 ", textSizeMap[size])}>
          {value.toFixed(1)}
        </span>
      )}

      {reviewCount !== undefined && (
        <span className={cn("text-neutral-400 dark:text-neutral-500", textSizeMap[size])}>
          ({reviewCount.toLocaleString("uk-UA")})
        </span>
      )}
    </div>
  );
}

// ─── RatingBar — розподіл оцінок ─────────────────────────────────────────────

interface RatingBarProps {
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
  total: number;
  className?: string;
}

export function RatingBars({ distribution, total, className }: RatingBarProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {([5, 4, 3, 2, 1] as const).map((star) => {
        const count = distribution[star] ?? 0;
        const pct = total > 0 ? (count / total) * 100 : 0;
        return (
          <div key={star} className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 ">
            <span className="w-3 shrink-0 text-right">{star}</span>
            <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
            <div className="flex-1 h-2 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-amber-400 transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="w-6 shrink-0">{count}</span>
          </div>
        );
      })}
    </div>
  );
}
