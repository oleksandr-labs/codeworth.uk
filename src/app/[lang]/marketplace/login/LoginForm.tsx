"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2, LogIn, Lock, Mail, AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLocale } from "@/components/layout/LocaleProvider";

export default function LoginForm() {
  const lang = useLocale();
  const isUk = lang === "uk";
  const router = useRouter();
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect to account if already logged in
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.replace(`/${lang}/marketplace/account`);
    }
  }, [authLoading, isAuthenticated, router, lang]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError(isUk ? "Введіть email" : "Please enter your email");
      return;
    }
    if (!password) {
      setError(isUk ? "Введіть пароль" : "Please enter your password");
      return;
    }

    setLoading(true);
    const result = await login(email.trim(), password);
    setLoading(false);

    if (result.success) {
      router.push(`/${lang}/marketplace/account`);
    } else {
      setError(result.error ?? (isUk ? "Помилка входу" : "Login failed"));
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      {/* Logo / Brand */}
      <div className="text-center mb-8">
        <Link href={`/${lang}`} className="inline-flex items-center gap-2 mb-6">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <span className="font-bold text-xl text-neutral-900 dark:text-white">CodeNest</span>
        </Link>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
          {isUk ? "Вхід до кабінету" : "Sign In"}
        </h1>
        <p className="text-neutral-500 text-sm">
          {isUk ? "Немає акаунту?" : "No account?"}{" "}
          <Link href={`/${lang}/contact`} className="text-indigo-600 hover:underline font-medium">
            {isUk ? "Зверніться до нас" : "Contact us"}
          </Link>
        </p>
      </div>

      {/* Form card */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800 p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="oleg@company.ua"
                autoComplete="email"
                required
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-600 transition"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5"
            >
              {isUk ? "Пароль" : "Password"}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                className="w-full pl-10 pr-10 py-2.5 text-sm border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-600 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? (isUk ? "Сховати пароль" : "Hide password") : (isUk ? "Показати пароль" : "Show password")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div
              role="alert"
              className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900 text-red-700 dark:text-red-400 text-sm"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {isUk ? "Вхід..." : "Signing in..."}
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                {isUk ? "Увійти" : "Sign In"}
              </>
            )}
          </button>
        </form>

        {/* Demo hint */}
        <div className="mt-5 p-3.5 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl border border-indigo-100 dark:border-indigo-900">
          <p className="text-xs text-indigo-700 dark:text-indigo-400 font-medium mb-1">
            {isUk ? "Демо-доступ:" : "Demo access:"}
          </p>
          <p className="text-xs text-indigo-600 dark:text-indigo-500">
            Email: <code className="font-mono">demo@codenest.com.ua</code>
          </p>
          <p className="text-xs text-indigo-600 dark:text-indigo-500">
            {isUk ? "Пароль:" : "Password:"} <code className="font-mono">demo123</code>
          </p>
        </div>
      </div>

      <p className="text-center text-xs text-neutral-400 mt-6">
        {isUk ? "Натискаючи «Увійти», ви погоджуєтесь з" : "By clicking «Sign In», you agree to our"}{" "}
        <Link href={`/${lang}/privacy`} className="hover:underline">
          {isUk ? "умовами використання" : "terms of service"}
        </Link>
      </p>
    </div>
  );
}
