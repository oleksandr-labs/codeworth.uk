"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/layout/LocaleProvider";

interface BeforeAfterProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  initialPosition?: number;
  className?: string;
}

export function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeLabel,
  afterLabel,
  initialPosition = 45,
  className,
}: BeforeAfterProps) {
  const isUk = useLocale() === "uk";
  const resolvedBeforeLabel = beforeLabel ?? (isUk ? "До" : "Before");
  const resolvedAfterLabel = afterLabel ?? (isUk ? "Після" : "After");
  const [position, setPosition] = useState(initialPosition);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = Math.min(96, Math.max(4, ((clientX - rect.left) / rect.width) * 100));
    setPosition(pct);
  }, []);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (dragging.current) updatePosition(e.clientX);
    },
    [updatePosition]
  );
  const onMouseUp = useCallback(() => { dragging.current = false; }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-2xl select-none cursor-col-resize touch-none",
        className
      )}
      onTouchMove={(e) => updatePosition(e.touches[0].clientX)}
      role="group"
      aria-label={`${isUk ? "Порівняння" : "Comparison"}: ${resolvedBeforeLabel} / ${resolvedAfterLabel}`}
    >
      {/* After layer (full width, clipped from left) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={afterSrc}
        alt={resolvedAfterLabel}
        loading="lazy"
        className="w-full h-full object-cover block"
        draggable={false}
      />

      {/* Before layer (clipped to position %) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={beforeSrc}
          alt={resolvedBeforeLabel}
          loading="lazy"
          className="w-full h-full object-cover block"
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute inset-y-0 w-px bg-white/90 shadow-[0_0_8px_rgba(0,0,0,0.4)]"
        style={{ left: `${position}%` }}
      />

      {/* Drag handle */}
      <button
        className="absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white dark:bg-neutral-800 shadow-xl flex items-center justify-center ring-2 ring-white/30 focus-visible:outline-none focus-visible:ring-indigo-500 active:scale-95 transition-transform"
        style={{ left: `${position}%` }}
        onMouseDown={(e) => { e.preventDefault(); dragging.current = true; }}
        onTouchStart={() => {}}
        aria-label={isUk ? "Перетягніть для порівняння" : "Drag to compare"}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path
            d="M6.5 7L3.5 10L6.5 13M13.5 7L16.5 10L13.5 13"
            stroke="#4f46e5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Labels */}
      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/50 text-white text-xs font-semibold backdrop-blur-sm pointer-events-none">
        {resolvedBeforeLabel}
      </span>
      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/50 text-white text-xs font-semibold backdrop-blur-sm pointer-events-none">
        {resolvedAfterLabel}
      </span>
    </div>
  );
}
