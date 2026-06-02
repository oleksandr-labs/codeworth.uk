"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export function NavProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (pathname === prevPathname.current) return;
    prevPathname.current = pathname;

    // Start loading animation
    setVisible(true);
    setProgress(15);

    const t1 = setTimeout(() => setProgress(40), 100);
    const t2 = setTimeout(() => setProgress(65), 300);
    const t3 = setTimeout(() => setProgress(82), 600);
    const t4 = setTimeout(() => {
      setProgress(100);
      timerRef.current = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 300);
    }, 900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[9999] h-[3px] pointer-events-none"
    >
      <div
        className="h-full bg-linear-to-r from-indigo-500 via-violet-500 to-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.6)]"
        style={{
          width: `${progress}%`,
          transition: progress === 100 ? "width 0.2s ease-out" : "width 0.4s ease-in-out",
        }}
      />
    </div>
  );
}
