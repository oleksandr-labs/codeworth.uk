"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { useParams } from "next/navigation";

export function BackToTop() {
  const params = useParams();
  const isUk = (params?.lang as string) === "uk";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={isUk ? "Повернутись нагору" : "Back to top"}
      className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 flex items-center justify-center hover:bg-indigo-700 hover:-translate-y-0.5 transition-all duration-200"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
