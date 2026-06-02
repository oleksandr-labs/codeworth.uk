"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";
import { useParams } from "next/navigation";

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastContextValue {
  toasts: Toast[];
  toast: (type: ToastType, message: string, duration?: number) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (type: ToastType, message: string, duration = 4000) => {
      const id = Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev, { id, type, message, duration }]);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <ToastContainer toasts={toasts} dismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

const ICONS: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />,
  error: <XCircle className="w-5 h-5 text-red-500 shrink-0" />,
  warning: <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />,
  info: <Info className="w-5 h-5 text-blue-500 shrink-0" />,
};

const BG: Record<ToastType, string> = {
  success: "border-green-200 bg-green-50",
  error: "border-red-200 bg-red-50",
  warning: "border-amber-200 bg-amber-50",
  info: "border-blue-200 bg-blue-50",
};

function ToastItem({ toast: t, dismiss }: { toast: Toast; dismiss: (id: string) => void }) {
  const params = useParams();
  const isUk = (params?.lang as string) === "uk";
  useEffect(() => {
    if (!t.duration) return;
    const timer = setTimeout(() => dismiss(t.id), t.duration);
    return () => clearTimeout(timer);
  }, [t.id, t.duration, dismiss]);

  return (
    <div
      className={`flex items-start gap-3 px-4 py-3 rounded-xl border shadow-md max-w-sm w-full animate-in slide-in-from-right-4 duration-300 ${BG[t.type]}`}
      role="alert"
      aria-live={t.type === "error" ? "assertive" : "polite"}
      aria-atomic="true"
    >
      {ICONS[t.type]}
      <p className="text-sm text-gray-800 flex-1 leading-snug">{t.message}</p>
      <button
        onClick={() => dismiss(t.id)}
        aria-label={isUk ? "Закрити повідомлення" : "Dismiss notification"}
        className="text-gray-400 hover:text-gray-600 transition-colors -mt-0.5 -mr-1 p-0.5 rounded"
      >
        <X className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
}

function ToastContainer({ toasts, dismiss }: { toasts: Toast[]; dismiss: (id: string) => void }) {
  const params = useParams();
  const isUk = (params?.lang as string) === "uk";
  return (
    <div
      aria-label={isUk ? "Повідомлення" : "Notifications"}
      className="fixed top-4 right-4 z-50 flex flex-col gap-2"
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} dismiss={dismiss} />
      ))}
    </div>
  );
}
