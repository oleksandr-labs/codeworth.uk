"use client";

import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <div
      key={pathname}
      className="flex flex-col flex-1 animate-page-enter"
    >
      {children}
    </div>
  );
}
