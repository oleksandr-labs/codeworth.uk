"use client";

import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useParams } from "next/navigation";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const params = useParams();
  const isUk = (params?.lang as string) === "uk";

  const options: { value: "light" | "dark" | "system"; label: string; Icon: React.ElementType }[] = [
    { value: "light", label: isUk ? "Світла" : "Light", Icon: Sun },
    { value: "dark", label: isUk ? "Темна" : "Dark", Icon: Moon },
    { value: "system", label: isUk ? "Системна" : "System", Icon: Monitor },
  ];

  const current = options.find((o) => o.value === theme) ?? options[2];
  const { Icon } = current;

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={isUk ? "Перемкнути тему" : "Toggle theme"}
        className="p-2 rounded-lg text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
      >
        <Icon className="w-4 h-4" />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full mt-1 z-50 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-lg py-1 min-w-36">
            {options.map(({ value, label, Icon: OptionIcon }) => (
              <button
                key={value}
                onClick={() => { setTheme(value); setOpen(false); }}
                className={cn(
                  "flex items-center gap-2.5 w-full px-3 py-2 text-sm transition-colors",
                  theme === value
                    ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950"
                    : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                )}
              >
                <OptionIcon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
