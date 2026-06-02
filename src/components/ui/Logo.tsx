import { cn } from "@/lib/utils";

interface LogoProps {
  size?: number;
  className?: string;
}

/**
 * Codeworth SVG Logo — "nest" гніздо + код < >
 * Icon-only варіант (квадратний значок)
 */
export function LogoIcon({ size = 36, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Codeworth"
      className={className}
    >
      {/* Background rounded square */}
      <rect width="36" height="36" rx="10" fill="url(#logo-gradient)" />

      {/* Nest arcs — 3 arc lines suggesting a nest / home */}
      <path
        d="M8 22 C10 17, 14 14, 18 14 C22 14, 26 17, 28 22"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />
      <path
        d="M10.5 25 C12.5 20.5, 15.5 18, 18 18 C20.5 18, 23.5 20.5, 25.5 25"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />

      {/* Code brackets < > */}
      <path
        d="M13 26 L10 23.5 L13 21"
        stroke="#FCD34D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M23 21 L26 23.5 L23 26"
        stroke="#FCD34D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4F46E5" />
          <stop offset="1" stopColor="#1E1B4B" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/**
 * Full wordmark: icon + "Codeworth" text
 */
export function LogoWordmark({
  size = 36,
  className,
  textClassName,
}: LogoProps & { textClassName?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoIcon size={size} />
      <span
        className={cn(
          "font-heading font-bold text-xl tracking-tight text-neutral-900 dark:text-white",
          textClassName
        )}
      >
        Code<span className="text-indigo-600 dark:text-indigo-400">worth</span>
      </span>
    </span>
  );
}
