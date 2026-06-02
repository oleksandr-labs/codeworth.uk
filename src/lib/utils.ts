import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates a tiny base64-encoded SVG blur placeholder for next/image.
 * Use as: <Image placeholder="blur" blurDataURL={shimmer(700, 475)} ... />
 */
export function shimmer(w: number, h: number): string {
  const svg = `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#e0e7ff" offset="20%"/>
        <stop stop-color="#c7d2fe" offset="50%"/>
        <stop stop-color="#e0e7ff" offset="70%"/>
      </linearGradient>
      <filter id="blur">
        <feGaussianBlur stdDeviation="8"/>
      </filter>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#g)" filter="url(#blur)"/>
  </svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

/** Returns a solid-color blur placeholder (fastest option) */
export function solidBlur(color = "#e0e7ff"): string {
  const svg = `<svg width="8" height="8" xmlns="http://www.w3.org/2000/svg"><rect width="8" height="8" fill="${color}"/></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}
