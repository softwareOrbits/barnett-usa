"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  type MotionProps,
} from "framer-motion";
import { useRef, type ReactNode } from "react";
import {
  EASE_OUT_EXPO,
  clipReveal,
  fadeUp,
  lineRise,
  mediaScale,
  stagger,
  viewportOnce,
  viewportSoft,
} from "@/lib/motion";
import { useFinePointer } from "@/lib/hooks";

/** Heading rendered one masked line at a time. */
export function RevealLines({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
  play,
}: {
  lines: (string | ReactNode)[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  /** Force the animation state (used by the hero, which waits on the loader). */
  play?: boolean;
}) {
  const controlled = typeof play === "boolean";
  return (
    <motion.span
      className={`block ${className}`}
      variants={stagger(0.09, delay)}
      initial="hidden"
      {...(controlled
        ? { animate: play ? "visible" : "hidden" }
        : { whileInView: "visible", viewport: viewportOnce })}
    >
      {lines.map((line, i) => (
        <span className="line-mask" key={i}>
          <motion.span className={`block ${lineClassName}`} variants={lineRise}>
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Word-by-word mask rise — for shorter, punchier headings. */
export function RevealWords({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
}) {
  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={stagger(0.055, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {text.split(" ").map((word, i) => (
        <span className="line-mask mr-[0.28em]" key={`${word}-${i}`}>
          <motion.span className={`block ${wordClassName}`} variants={lineRise}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Generic fade-and-rise for body copy, buttons, list rows. */
export function FadeUp({
  children,
  className = "",
  index = 0,
  ...rest
}: { children: ReactNode; className?: string; index?: number } & MotionProps) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={viewportSoft}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Clip-path curtain with a counter-scaling child, the standard media reveal. */
export function RevealMedia({
  children,
  className = "",
  innerClassName = "",
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      variants={clipReveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewportSoft}
    >
      <motion.div className={`h-full w-full ${innerClassName}`} variants={mediaScale}>
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Pointer-attracted wrapper for primary CTAs. No-ops on touch. */
export function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const fine = useFinePointer();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 20, mass: 0.4 });

  const onMove = (e: React.PointerEvent) => {
    if (!fine || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}

/** Filled-arrow CTA with a sweep fill on hover. */
export function ArrowButton({
  children,
  href = "#contact",
  variant = "solid",
}: {
  children: ReactNode;
  href?: string;
  variant?: "solid" | "ghost";
}) {
  const solid = variant === "solid";
  return (
    <Magnetic>
      <motion.a
        href={href}
        className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-4 text-sm font-medium tracking-wide ${
          solid ? "bg-frost text-ink" : "border border-frost/25 text-frost"
        }`}
        whileHover="hover"
        whileTap={{ scale: 0.97 }}
        initial="rest"
        animate="rest"
      >
        <motion.span
          className={`absolute inset-0 ${solid ? "bg-ice" : "bg-frost"}`}
          variants={{ rest: { y: "101%" }, hover: { y: "0%" } }}
          transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
        />
        <motion.span
          className="relative z-10"
          variants={{ rest: { color: solid ? "#04070d" : "#eaf5ff" }, hover: { color: "#04070d" } }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.span>
        <motion.span
          className="relative z-10 flex h-5 w-5 items-center justify-center"
          variants={{ rest: { x: 0 }, hover: { x: 4 } }}
          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
        >
          <motion.svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            variants={{ rest: { stroke: solid ? "#04070d" : "#eaf5ff" }, hover: { stroke: "#04070d" } }}
          >
            <path d="M2 8h12M9 3l5 5-5 5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </motion.span>
      </motion.a>
    </Magnetic>
  );
}

/** Small label + rule used above every section heading. */
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <FadeUp className="mb-8 flex items-center gap-4">
      <span className="h-px w-10 bg-ice/70" />
      <span className="eyebrow text-ice">{children}</span>
    </FadeUp>
  );
}
