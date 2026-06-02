"use client";

import { useState, useEffect, useCallback } from "react";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "user" | "admin";
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AUTH_KEY = "Codeworth-auth";

function loadUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

function saveUser(user: User | null) {
  try {
    if (user) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  } catch {
    // ignore storage errors
  }
}

export interface UseAuthReturn extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<Pick<User, "firstName" | "lastName">>) => void;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setUser(loadUser());
    setIsLoading(false);
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) {
          return { success: false, error: data.error ?? "Помилка входу" };
        }
        const loggedInUser: User = data.user;
        saveUser(loggedInUser);
        setUser(loggedInUser);
        return { success: true };
      } catch {
        return { success: false, error: "Мережева помилка. Спробуйте ще раз." };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(() => {
    saveUser(null);
    setUser(null);
  }, []);

  const updateProfile = useCallback(
    (updates: Partial<Pick<User, "firstName" | "lastName">>) => {
      setUser((prev) => {
        if (!prev) return null;
        const updated = { ...prev, ...updates };
        saveUser(updated);
        return updated;
      });
    },
    []
  );

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    updateProfile,
  };
}
