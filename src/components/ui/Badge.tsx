import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "error" | "indigo" | "amber" | "emerald" | "hot" | "new" | "sale";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const VARIANTS: Record<BadgeVariant, string> = {
  default: "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300",
  success: "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300",
  warning: "bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300",
  error: "bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300",
  indigo: "bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300",
  amber: "bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300",
  emerald: "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300",
  hot: "bg-red-500 text-white",
  new: "bg-indigo-600 text-white",
  sale: "bg-amber-400 text-neutral-900",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold",
        VARIANTS[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
