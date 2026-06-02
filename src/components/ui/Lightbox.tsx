"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/layout/LocaleProvider";

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export interface LightboxImage {
  src: string;
  alt: string;
  caption?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  initialIndex?: number;
  onClose: () => void;
}

export function Lightbox({ images, initialIndex = 0, onClose }: LightboxProps) {
  const isUk = useLocale() === "uk";
  const [current, setCurrent] = useState(initialIndex);
  const [zoomed, setZoomed] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const prev = useCallback(() => {
    setCurrent((i) => (i === 0 ? images.length - 1 : i - 1));
    setZoomed(false);
  }, [images.length]);

  const next = useCallback(() => {
    setCurrent((i) => (i === images.length - 1 ? 0 : i + 1));
    setZoomed(false);
  }, [images.length]);

  // Save previous focus, auto-focus close button, restore on close
  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    closeBtnRef.current?.focus();
    return () => {
      previousFocusRef.current?.focus();
    };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowLeft") { prev(); return; }
      if (e.key === "ArrowRight") { next(); return; }

      // Focus trap
      if (e.key === "Tab") {
        const el = containerRef.current;
        if (!el) return;
        const focusable = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
          (node) => !node.hasAttribute("disabled")
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  const img = images[current];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={isUk ? "Переглядач зображень" : "Image viewer"}
    >
      {/* Close */}
      <button
        ref={closeBtnRef}
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label={isUk ? "Закрити" : "Close"}
      >
        <X className="w-5 h-5" />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
        {current + 1} / {images.length}
      </div>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label={isUk ? "Попереднє зображення" : "Previous image"}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {/* Image */}
      <div
        className="relative max-w-5xl max-h-[85vh] mx-16 cursor-zoom-in"
        onClick={(e) => { e.stopPropagation(); setZoomed((v) => !v); }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img.src}
          alt={img.alt}
          className={cn(
            "max-h-[85vh] max-w-full object-contain rounded-xl transition-transform duration-300",
            zoomed ? "scale-150 cursor-zoom-out" : "scale-100"
          )}
          draggable={false}
        />
        {!zoomed && (
          <div className="absolute bottom-3 right-3 p-1.5 bg-black/40 rounded-lg text-white/60">
            <ZoomIn className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label={isUk ? "Наступне зображення" : "Next image"}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {/* Caption */}
      {img.caption && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm text-center max-w-lg px-4">
          {img.caption}
        </div>
      )}

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setCurrent(i); setZoomed(false); }}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-200",
                i === current ? "bg-white scale-125" : "bg-white/40 hover:bg-white/70"
              )}
              aria-label={isUk ? `Зображення ${i + 1}` : `Image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── LightboxGallery — готова галерея з тригером ─────────────────────────────

interface LightboxGalleryProps {
  images: LightboxImage[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function LightboxGallery({ images, columns = 3, className }: LightboxGalleryProps) {
  const isUk = useLocale() === "uk";
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
  };

  return (
    <>
      <div className={cn("grid gap-3", gridCols[columns], className)}>
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setOpenIndex(i)}
            className="group relative overflow-hidden rounded-xl aspect-video bg-neutral-100 dark:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            aria-label={isUk ? `Відкрити: ${img.alt}` : `Open: ${img.alt}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            {img.caption && (
              <div className="absolute bottom-0 inset-x-0 px-3 py-2 bg-linear-to-t from-black/60 to-transparent text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                {img.caption}
              </div>
            )}
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          images={images}
          initialIndex={openIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  );
}
