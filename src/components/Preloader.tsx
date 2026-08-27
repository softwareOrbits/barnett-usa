"use client";

import { AnimatePresence, motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE_IN_OUT_QUINT, EASE_OUT_EXPO } from "@/lib/motion";
import { useSetAppReady } from "./ReadyProvider";
import { useScrollLock } from "@/lib/hooks";

/** The wordmark, split so it can carry the same colouring as the nav logo. */
const WORDMARK = [
  { text: "Barnett", className: "text-frost" },
  { text: "USA", className: "text-ice" },
  { text: ".biz", className: "text-frost/45" },
];

export default function Preloader() {
  const setReady = useSetAppReady();
  const [done, setDone] = useState(false);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => String(Math.round(v)).padStart(3, "0"));
  const barScale = useTransform(count, [0, 100], [0, 1]);

  useScrollLock(!done);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduced ? 0.3 : 2.1;

    const controls = animate(count, 100, {
      duration,
      ease: [0.7, 0, 0.2, 1],
      onComplete: () => {
        // Let the curtain start lifting, then release the hero.
        setDone(true);
        window.setTimeout(() => setReady(true), reduced ? 0 : 420);
      },
    });
    return () => controls.stop();
  }, [count, setReady]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-6 pb-8 pt-8 md:px-10"
          exit={{ y: "-100%" }}
          transition={{ duration: 1.15, ease: EASE_IN_OUT_QUINT }}
        >
          <div className="flex items-start justify-between">
            <motion.span
              className="eyebrow text-steel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.1 }}
            >
              Barnett USA — Est. 1998
            </motion.span>
            <motion.span
              className="eyebrow text-steel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.2 }}
            >
              Loading assets
            </motion.span>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="line-mask">
              <motion.div
                className="display relative flex items-center gap-[0.14em] text-[11vw] leading-none tracking-[-0.04em] md:text-[6vw]"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.15 }}
              >
                {/* Same mark as the nav logo, scaled to the type */}
                <span className="flex h-[0.86em] w-[0.86em] shrink-0 items-center justify-center rounded-[0.14em] bg-frost text-ink">
                  <span className="leading-none">B</span>
                </span>

                <span className="relative overflow-hidden">
                  {WORDMARK.map((part) => (
                    <span key={part.text} className={part.className}>
                      {part.text}
                    </span>
                  ))}

                  {/* Ice highlight sweeping across the wordmark while it loads */}
                  <motion.span
                    className="pointer-events-none absolute inset-y-0 w-[45%] bg-gradient-to-r from-transparent via-ice/45 to-transparent"
                    animate={{ x: ["-120%", "340%"] }}
                    transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
                  />
                </span>
              </motion.div>
            </div>
          </div>

          <div className="flex items-end justify-between gap-6">
            <div className="relative h-px w-full max-w-md bg-frost/15">
              <motion.div
                className="absolute inset-y-0 left-0 w-full origin-left bg-ice"
                style={{ scaleX: barScale }}
              />
            </div>
            <motion.span className="display text-[13vw] leading-[0.8] md:text-[5vw]">
              {rounded}
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
