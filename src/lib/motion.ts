import type { Variants, Transition } from "framer-motion";

/** Shared easing curves. Expo-out gives the long, weighty settle used site-wide. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT_QUINT = [0.83, 0, 0.17, 1] as const;
export const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;

export const spring: Transition = {
  type: "spring",
  stiffness: 220,
  damping: 30,
  mass: 0.6,
};

/** Masked line rise — the workhorse for every heading on the page. */
export const lineRise: Variants = {
  hidden: { y: "115%", rotate: 2 },
  visible: (i: number = 0) => ({
    y: "0%",
    rotate: 0,
    transition: { duration: 1.05, ease: EASE_OUT_EXPO, delay: 0.06 * i },
  }),
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.07 * i },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 1.1, ease: EASE_OUT_EXPO, delay: 0.07 * i },
  }),
};

/** Clip-path curtain used for media reveals; pair with an inner scale-down. */
export const clipReveal: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.2, ease: EASE_OUT_EXPO },
  },
};

export const mediaScale: Variants = {
  hidden: { scale: 1.35 },
  visible: { scale: 1, transition: { duration: 1.4, ease: EASE_OUT_EXPO } },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

/** Shared viewport config so every section triggers at the same point. */
export const viewportOnce = { once: true, amount: 0.3 } as const;
export const viewportSoft = { once: true, amount: 0.15 } as const;
