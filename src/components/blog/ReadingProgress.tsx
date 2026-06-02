"use client";

import { useEffect, useRef, useState } from "react";
import { analytics } from "@/lib/analytics";

interface Props {
  slug?: string;
}

export function ReadingProgress({ slug }: Props) {
  const [progress, setProgress] = useState(0);
  const fired = useRef(false);

  useEffect(() => {
    const article = document.querySelector("article");
    if (!article) return;

    function update() {
      const rect = article!.getBoundingClientRect();
      const total = article!.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const pct = total > 0 ? Math.min(100, (scrolled / total) * 100) : 0;
      setProgress(pct);
      if (pct >= 90 && !fired.current && slug) {
        fired.current = true;
        analytics.blogReadComplete(slug);
      }
    }

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [slug]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-neutral-100">
      <div
        className="h-full bg-linear-to-r from-indigo-500 to-violet-500 transition-[width] duration-75"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
