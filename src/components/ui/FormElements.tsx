import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

// ─── Field wrapper ───────────────────────────────────────────────────────────

interface FieldWrapperProps {
  label?: string;
  hint?: string;
  error?: string;
  success?: string;
  required?: boolean;
  id: string;
  children: React.ReactNode;
}

export function FieldWrapper({ label, hint, error, success, required, id, children }: FieldWrapperProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {label}
          {required && <span className="text-red-500 ml-1" aria-hidden>*</span>}
        </label>
      )}
      {children}
      {hint && !error && !success && (
        <p className="text-xs text-neutral-400 dark:text-neutral-500">{hint}</p>
      )}
      {error && (
        <p className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400" role="alert">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {error}
        </p>
      )}
      {success && !error && (
        <p className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          {success}
        </p>
      )}
    </div>
  );
}

// ─── Base input classes ───────────────────────────────────────────────────────

const inputBase =
  "w-full px-4 py-2.5 text-sm rounded-xl border transition-all duration-150 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed";

const inputState = (error?: string) =>
  error
    ? "border-red-400 dark:border-red-600 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-900"
    : "border-neutral-200 dark:border-neutral-700 focus:border-indigo-400 dark:focus:border-indigo-600 focus:ring-indigo-100 dark:focus:ring-indigo-950";

// ─── Input ───────────────────────────────────────────────────────────────────

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  success?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { id, label, hint, error, success, required, leftIcon, rightIcon, className, ...props },
  ref
) {
  const inputId = id ?? `input-${Math.random().toString(36).slice(2)}`;
  return (
    <FieldWrapper label={label} hint={hint} error={error} success={success} required={required} id={inputId}>
      <div className="relative">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={cn(
            inputBase,
            inputState(error),
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            className
          )}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
            {rightIcon}
          </span>
        )}
      </div>
    </FieldWrapper>
  );
});

// ─── Textarea ─────────────────────────────────────────────────────────────────

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  success?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { id, label, hint, error, success, required, className, rows = 4, ...props },
  ref
) {
  const inputId = id ?? `textarea-${Math.random().toString(36).slice(2)}`;
  return (
    <FieldWrapper label={label} hint={hint} error={error} success={success} required={required} id={inputId}>
      <textarea
        ref={ref}
        id={inputId}
        rows={rows}
        required={required}
        aria-invalid={!!error}
        className={cn(inputBase, inputState(error), "resize-none", className)}
        {...props}
      />
    </FieldWrapper>
  );
});

// ─── Select ───────────────────────────────────────────────────────────────────

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
  success?: string;
  placeholder?: string;
  options: { value: string; label: string; disabled?: boolean }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { id, label, hint, error, success, required, placeholder, options, className, ...props },
  ref
) {
  const inputId = id ?? `select-${Math.random().toString(36).slice(2)}`;
  return (
    <FieldWrapper label={label} hint={hint} error={error} success={success} required={required} id={inputId}>
      <div className="relative">
        <select
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={!!error}
          className={cn(
            inputBase,
            inputState(error),
            "appearance-none pr-9 cursor-pointer",
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((o) => (
            <option key={o.value} value={o.value} disabled={o.disabled}>
              {o.label}
            </option>
          ))}
        </select>
        {/* Chevron */}
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>
    </FieldWrapper>
  );
});

// ─── Checkbox ─────────────────────────────────────────────────────────────────

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: React.ReactNode;
  error?: string;
  description?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { id, label, error, description, className, ...props },
  ref
) {
  const inputId = id ?? `checkbox-${Math.random().toString(36).slice(2)}`;
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={inputId}
        className={cn(
          "flex items-start gap-3 cursor-pointer group",
          props.disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <div className="relative mt-0.5 shrink-0">
          <input
            ref={ref}
            type="checkbox"
            id={inputId}
            aria-invalid={!!error}
            className="sr-only peer"
            {...props}
          />
          <div className={cn(
            "w-4.5 h-4.5 rounded border-2 transition-all duration-150",
            "border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900",
            "peer-checked:border-indigo-600 peer-checked:bg-indigo-600",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500 peer-focus-visible:ring-offset-2",
            "group-hover:border-indigo-400 dark:group-hover:border-indigo-500",
            error && "border-red-400 dark:border-red-600"
          )}>
            <svg
              className="w-full h-full text-white scale-0 peer-checked:scale-100 transition-transform duration-100"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div>
          <span className="text-sm text-neutral-700 dark:text-neutral-300">{label}</span>
          {description && (
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">{description}</p>
          )}
        </div>
      </label>
      {error && (
        <p className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400 ml-7.5" role="alert">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
});

// ─── RadioGroup ───────────────────────────────────────────────────────────────

interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: RadioOption[];
  label?: string;
  error?: string;
  variant?: "default" | "card";
  className?: string;
}

export function RadioGroup({ name, value, onChange, options, label, error, variant = "default", className }: RadioGroupProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{label}</p>
      )}
      <div className={cn("flex flex-col gap-2", variant === "card" && "gap-3")}>
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              "flex items-start gap-3 cursor-pointer",
              option.disabled && "opacity-50 cursor-not-allowed",
              variant === "card" && cn(
                "p-4 rounded-xl border-2 transition-colors",
                value === option.value
                  ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950"
                  : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600"
              )
            )}
          >
            <div className="relative mt-0.5 shrink-0">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={() => onChange(option.value)}
                disabled={option.disabled}
                className="sr-only peer"
              />
              <div className={cn(
                "w-4 h-4 rounded-full border-2 transition-all duration-150",
                "border-neutral-300 dark:border-neutral-600",
                "peer-checked:border-indigo-600",
                "peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500 peer-focus-visible:ring-offset-2"
              )}>
                <div className={cn(
                  "w-2 h-2 rounded-full bg-indigo-600 m-auto mt-[3px] scale-0 transition-transform duration-150",
                  value === option.value && "scale-100"
                )} />
              </div>
            </div>
            <div>
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{option.label}</span>
              {option.description && (
                <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">{option.description}</p>
              )}
            </div>
          </label>
        ))}
      </div>
      {error && (
        <p className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400" role="alert">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
