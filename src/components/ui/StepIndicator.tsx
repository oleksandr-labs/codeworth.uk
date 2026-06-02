import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Step {
  id: number;
  label: string;
  description?: string;
  icon?: React.ElementType;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
  ariaLabel?: string;
  className?: string;
}

export function StepIndicator({ steps, currentStep, onStepClick, ariaLabel = "Steps", className }: StepIndicatorProps) {
  return (
    <nav aria-label={ariaLabel} className={cn("flex items-center", className)}>
      {steps.map((step, idx) => {
        const isCompleted = currentStep > step.id;
        const isActive = currentStep === step.id;
        const isClickable = onStepClick && isCompleted;

        return (
          <div key={step.id} className="flex items-center flex-1 last:flex-none">
            {/* Step bubble + label */}
            <button
              type="button"
              onClick={() => isClickable && onStepClick(step.id)}
              disabled={!isClickable}
              className={cn(
                "flex items-center gap-2.5 group",
                isClickable ? "cursor-pointer" : "cursor-default"
              )}
            >
              {/* Bubble */}
              <div
                className={cn(
                  "relative w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 border-2",
                  isCompleted
                    ? "bg-green-500 border-green-500 text-white"
                    : isActive
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-500/30"
                    : "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 text-neutral-400"
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : step.icon ? (
                  <step.icon className="w-4 h-4" />
                ) : (
                  <span className="text-sm font-bold">{step.id}</span>
                )}

                {/* Active pulse ring */}
                {isActive && (
                  <span className="absolute inset-0 rounded-full animate-ping bg-indigo-400/30" />
                )}
              </div>

              {/* Label */}
              <div className="hidden sm:block">
                <div
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isCompleted
                      ? "text-green-600 dark:text-green-400"
                      : isActive
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-neutral-400 dark:text-neutral-600"
                  )}
                >
                  {step.label}
                </div>
                {step.description && isActive && (
                  <div className="text-xs text-neutral-400 dark:text-neutral-500">{step.description}</div>
                )}
              </div>
            </button>

            {/* Connector line */}
            {idx < steps.length - 1 && (
              <div className="flex-1 mx-3 h-0.5 rounded-full transition-all duration-500">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    isCompleted ? "bg-green-300 dark:bg-green-700" : "bg-neutral-200 dark:bg-neutral-700"
                  )}
                />
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
