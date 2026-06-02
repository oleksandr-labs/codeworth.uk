import { cn } from "@/lib/utils";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-linear-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:from-indigo-700 hover:to-indigo-800 disabled:from-indigo-400 disabled:to-indigo-400 disabled:shadow-none",
  secondary:
    "bg-white dark:bg-neutral-900 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:border-indigo-300 disabled:opacity-50",
  outline:
    "border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm disabled:opacity-50",
  ghost:
    "text-neutral-700 dark:text-neutral-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 disabled:opacity-50",
  danger:
    "bg-red-600 text-white shadow-lg shadow-red-500/20 hover:bg-red-700 hover:shadow-red-500/30 disabled:bg-red-400 disabled:shadow-none",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-sm rounded-xl",
  lg: "px-8 py-4 text-base rounded-xl",
};

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  isLoading = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 cursor-pointer disabled:cursor-not-allowed disabled:translate-y-0",
    variants[variant],
    sizes[size],
    className
  );

  const spinnerSize = size === "lg" ? "w-5 h-5" : "w-4 h-4";

  if (href && !isLoading && !disabled) {
    const handleClick = props.onClick as React.MouseEventHandler<HTMLAnchorElement> | undefined;
    return (
      <Link href={href} className={classes} onClick={handleClick}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled || isLoading} aria-busy={isLoading} {...props}>
      {isLoading && <Spinner className={spinnerSize} />}
      {children}
    </button>
  );
}
