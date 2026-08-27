"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Inertia scrolling. Disabled for reduced-motion users and driven by rAF so it
 * stays in sync with Framer Motion's scroll listeners.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      // lerp alone — passing `duration` too would override it for wheel input.
      // 0.09 read as floaty; 0.12 keeps the glide but tracks the wheel closely.
      lerp: 0.12,
      wheelMultiplier: 1.15,
      // Native momentum on touch feels better than a simulated one, and it keeps
      // iOS address-bar collapse behaving normally.
      syncTouch: false,
      touchMultiplier: 1.6,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const onAnchor = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!target) return;
      const id = target.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -40, duration: 1.4 });
    };
    document.addEventListener("click", onAnchor);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onAnchor);
      lenis.destroy();
    };
  }, []);

  return null;
}
