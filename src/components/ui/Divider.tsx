import { cn } from "@/lib/utils";

interface DividerProps {
  /** Content to display in the middle of the divider */
  label?: string;
  /** Orientation of the divider */
  orientation?: "horizontal" | "vertical";
  /** Style variant */
  variant?: "solid" | "dashed" | "dotted";
  /** Spacing class — applied to the wrapper */
  className?: string;
  /** Label alignment for horizontal dividers */
  align?: "left" | "center" | "right";
}

const borderStyles = {
  solid: "border-solid",
  dashed: "border-dashed",
  dotted: "border-dotted",
};

export function Divider({
  label,
  orientation = "horizontal",
  variant = "solid",
  align = "center",
  className,
}: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn(
          "inline-block self-stretch w-px border-l border-neutral-200 dark:border-neutral-700",
          borderStyles[variant],
          className
        )}
      />
    );
  }

  if (!label) {
    return (
      <hr
        role="separator"
        className={cn(
          "border-t border-neutral-200 dark:border-neutral-700",
          borderStyles[variant],
          className
        )}
      />
    );
  }

  const labelAlign = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  }[align];

  return (
    <div
      role="separator"
      className={cn("flex items-center gap-3", className)}
    >
      {align !== "left" && (
        <div
          className={cn(
            "flex-1 border-t border-neutral-200 dark:border-neutral-700",
            borderStyles[variant]
          )}
        />
      )}
      <span
        className={cn(
          "shrink-0 text-sm text-neutral-400 dark:text-neutral-500 px-1",
          align === "left" && "order-first pl-0",
          align === "right" && "order-last pr-0",
          !labelAlign // suppress unused warning
        )}
      >
        {label}
      </span>
      {align !== "right" && (
        <div
          className={cn(
            "flex-1 border-t border-neutral-200 dark:border-neutral-700",
            borderStyles[variant]
          )}
        />
      )}
    </div>
  );
}
