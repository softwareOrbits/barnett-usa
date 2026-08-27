"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { ArrowButton, RevealLines } from "./anim";
import { useAppReady } from "./ReadyProvider";

const FACTS = [
  { value: "26", label: "Years in cold chain" },
  { value: "40+", label: "Countries served" },
  { value: "900t", label: "Daily ice capacity" },
];

export default function Hero() {
  const ready = useAppReady();
  const ref = useRef<HTMLElement>(null);

  // Hero content drifts up and dissolves as the next section climbs over it.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-28%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 1], [0, 6]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-screen-safe flex-col justify-end pb-8 pt-[calc(var(--nav-h)+1.5rem)]"
    >
      <motion.div
        style={{ y, opacity, filter }}
        className="mx-auto w-full max-w-[1500px] px-6 md:px-10"
      >
        <motion.div
          className="mb-6 flex items-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.15 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ice opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ice" />
          </span>
          <span className="eyebrow text-frost/70">
            Domestic &amp; international supply — since 1998
          </span>
        </motion.div>

        <h1 className="display text-[clamp(2.6rem,13.5vw,7.4rem)] leading-[0.88] lg:text-[clamp(3.5rem,8.2vw,10.5rem)]">
          <RevealLines
            play={ready}
            delay={0.25}
            lines={[
              "Ice Making",
              "Water Treatment",
              <span key="l3">
                &amp;{" "}
                <span className="text-transparent [-webkit-text-stroke:2px_var(--color-ice)]">
                  Refrigeration
                </span>
              </span>,
            ]}
          />
        </h1>

        <div className="mt-8 flex flex-col gap-8 border-t border-frost/10 pt-8 lg:flex-row lg:items-end lg:justify-between">
          <motion.p
            className="max-w-md text-base leading-relaxed text-steel"
            initial={{ opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.75 }}
          >
            We design, build and commission turnkey cold systems — flake and block ice
            plants, reverse-osmosis treatment trains and industrial refrigeration — for
            clients who cannot afford a thaw.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.85 }}
          >
            <ArrowButton href="#contact">Get a free quote</ArrowButton>
            <ArrowButton href="#services" variant="ghost">
              Explore capabilities
            </ArrowButton>
          </motion.div>

          <motion.dl
            className="flex gap-8"
            initial={{ opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.95 }}
          >
            {FACTS.map((f) => (
              <div key={f.label}>
                <dt className="display text-3xl text-frost md:text-4xl">{f.value}</dt>
                <dd className="mt-1 max-w-[7rem] text-[11px] leading-snug text-steel">
                  {f.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="pointer-events-none mx-auto mt-8 flex w-full max-w-[1500px] items-center gap-3 px-6 md:px-10"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <span className="eyebrow text-frost/40">Scroll</span>
        <div className="relative h-px w-24 overflow-hidden bg-frost/15">
          <motion.span
            className="absolute inset-y-0 left-0 w-1/3 bg-ice"
            animate={{ x: ["-100%", "300%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
