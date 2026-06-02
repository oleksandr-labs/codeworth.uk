"use client";

interface EmptyStateProps {
  variant?: "search" | "cart" | "generic";
  size?: number;
  className?: string;
}

function SearchIllustration({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Background circle */}
      <circle cx="100" cy="100" r="90" className="fill-indigo-50 dark:fill-indigo-950/30" />
      {/* Document */}
      <rect x="55" y="45" width="70" height="90" rx="8" className="fill-white dark:fill-neutral-800 stroke-indigo-200 dark:stroke-indigo-800" strokeWidth="2" />
      {/* Lines on document */}
      <rect x="70" y="65" width="40" height="4" rx="2" className="fill-indigo-100 dark:fill-indigo-900" />
      <rect x="70" y="78" width="30" height="4" rx="2" className="fill-indigo-100 dark:fill-indigo-900" />
      <rect x="70" y="91" width="35" height="4" rx="2" className="fill-indigo-100 dark:fill-indigo-900" />
      <rect x="70" y="104" width="20" height="4" rx="2" className="fill-indigo-100 dark:fill-indigo-900" />
      {/* Magnifying glass */}
      <circle cx="135" cy="125" r="22" className="fill-white dark:fill-neutral-700 stroke-indigo-400 dark:stroke-indigo-500" strokeWidth="3" />
      <circle cx="135" cy="125" r="14" className="stroke-indigo-300 dark:stroke-indigo-600" strokeWidth="2" fill="none" />
      <line x1="151" y1="141" x2="165" y2="155" className="stroke-indigo-400 dark:stroke-indigo-500" strokeWidth="4" strokeLinecap="round" />
      {/* Question mark in glass */}
      <text x="131" y="131" className="fill-indigo-300 dark:fill-indigo-600" fontSize="18" fontWeight="bold" fontFamily="sans-serif">?</text>
    </svg>
  );
}

function CartIllustration({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Background circle */}
      <circle cx="100" cy="100" r="90" className="fill-indigo-50 dark:fill-indigo-950/30" />
      {/* Cart body */}
      <path d="M50 70 L65 70 L80 130 L150 130 L160 85 L72 85" className="stroke-indigo-300 dark:stroke-indigo-600" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Wheels */}
      <circle cx="90" cy="145" r="8" className="fill-white dark:fill-neutral-700 stroke-indigo-300 dark:stroke-indigo-600" strokeWidth="2.5" />
      <circle cx="140" cy="145" r="8" className="fill-white dark:fill-neutral-700 stroke-indigo-300 dark:stroke-indigo-600" strokeWidth="2.5" />
      {/* Dashed lines inside cart (empty indicator) */}
      <line x1="90" y1="100" x2="140" y2="100" className="stroke-indigo-200 dark:stroke-indigo-800" strokeWidth="2" strokeDasharray="6 4" />
      <line x1="88" y1="112" x2="145" y2="112" className="stroke-indigo-200 dark:stroke-indigo-800" strokeWidth="2" strokeDasharray="6 4" />
      {/* Sparkle */}
      <circle cx="155" cy="60" r="3" className="fill-indigo-300 dark:fill-indigo-600" />
      <circle cx="45" cy="110" r="2" className="fill-indigo-200 dark:fill-indigo-700" />
      <circle cx="165" cy="105" r="2.5" className="fill-indigo-200 dark:fill-indigo-700" />
    </svg>
  );
}

function GenericIllustration({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Background circle */}
      <circle cx="100" cy="100" r="90" className="fill-indigo-50 dark:fill-indigo-950/30" />
      {/* Folder */}
      <path d="M45 75 L45 145 C45 149.4 48.6 153 53 153 L147 153 C151.4 153 155 149.4 155 145 L155 85 C155 80.6 151.4 77 147 77 L105 77 L95 67 L53 67 C48.6 67 45 70.6 45 75Z" className="fill-white dark:fill-neutral-800 stroke-indigo-200 dark:stroke-indigo-800" strokeWidth="2" />
      {/* Dotted line inside folder */}
      <line x1="70" y1="110" x2="130" y2="110" className="stroke-indigo-200 dark:stroke-indigo-800" strokeWidth="2" strokeDasharray="6 4" />
      <line x1="80" y1="125" x2="120" y2="125" className="stroke-indigo-200 dark:stroke-indigo-800" strokeWidth="2" strokeDasharray="6 4" />
      {/* Sparkles */}
      <circle cx="160" cy="65" r="3" className="fill-indigo-300 dark:fill-indigo-600" />
      <circle cx="40" cy="130" r="2" className="fill-indigo-200 dark:fill-indigo-700" />
    </svg>
  );
}

export function EmptyState({ variant = "generic", size = 160, className = "" }: EmptyStateProps) {
  return (
    <div className={`flex justify-center ${className}`}>
      {variant === "search" && <SearchIllustration size={size} />}
      {variant === "cart" && <CartIllustration size={size} />}
      {variant === "generic" && <GenericIllustration size={size} />}
    </div>
  );
}
