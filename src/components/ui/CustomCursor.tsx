"use client";

import { useEffect, useRef } from "react";

/**
 * CustomCursor — branded cursor for desktop.
 * Shows a small dot + outer ring that follow the mouse.
 * Enlarges on interactive elements (a, button, [role=button]).
 * Changes shape on text nodes.
 * Hidden automatically on touch devices via CSS (hover: none).
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Only enable on true pointer devices
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    // Show cursors (initially hidden via opacity:0 in CSS until first move)
    dot.style.opacity = "1";
    ring.style.opacity = "1";

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let rafId: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      ringX = lerp(ringX, mouseX, 0.18);
      ringY = lerp(ringY, mouseY, 0.18);
      ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const INTERACTIVE = "a, button, [role='button'], label, input, textarea, select, [data-cursor='hover']";
    const TEXT_NODES = "p, h1, h2, h3, h4, h5, h6, span, li, blockquote";

    const onEnter = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest(INTERACTIVE)) {
        dot.classList.add("is-hovering");
        ring.classList.add("is-hovering");
      } else if (target.closest(TEXT_NODES)) {
        dot.classList.add("is-text");
        ring.classList.add("is-text");
      }
    };

    const onLeave = () => {
      dot.classList.remove("is-hovering", "is-text");
      ring.classList.remove("is-hovering", "is-text");
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onEnter, { passive: true });
    document.addEventListener("mouseout", onLeave, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="custom-cursor-ring"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />
    </>
  );
}
