"use client";

import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/**
 * Infinite marquee whose speed and direction react to scroll velocity — flick
 * the page and the band whips along with you, then settles back to a drift.
 */
export default function Marquee({
  children,
  baseVelocity = 3,
  className = "",
  repeat = 4,
}: {
  children: ReactNode;
  baseVelocity?: number;
  className?: string;
  repeat?: number;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1200], [0, 4], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-100 / repeat, 0, v)}%`);
  const directionRef = useRef(1);

  // There are several marquees on the page; without this gate each one keeps a
  // rAF callback alive for the whole session, including while far off screen.
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { margin: "200px 0px 200px 0px" });

  useAnimationFrame((_, delta) => {
    if (!inView) return;
    let moveBy = directionRef.current * baseVelocity * (delta / 1000);
    const factor = velocityFactor.get();
    if (factor < 0) directionRef.current = -1;
    else if (factor > 0) directionRef.current = 1;
    moveBy += directionRef.current * moveBy * factor;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div ref={wrapRef} className={`relative flex w-full overflow-hidden ${className}`}>
      <motion.div
        className="flex flex-nowrap whitespace-nowrap"
        style={{ x, willChange: "transform" }}
      >
        {Array.from({ length: repeat }).map((_, i) => (
          <span key={i} className="flex shrink-0 items-center">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
