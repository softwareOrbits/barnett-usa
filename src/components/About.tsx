"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { FadeUp, RevealWords, SectionLabel } from "./anim";

const COPY =
  "Barnett USA builds the cold infrastructure behind food processors, fisheries, breweries, hospitals and ports. From a single flake-ice machine to a containerised treatment plant shipped to a coastline with no grid, we engineer, install and service the whole chain — and we stand behind it for its full working life.";

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.28em] inline-block">
      {children}
    </motion.span>
  );
}

const PILLARS = [
  {
    k: "01",
    t: "In-house engineering",
    d: "Thermal load modelling, P&ID, and control logic developed by our own team — no outsourced guesswork.",
  },
  {
    k: "02",
    t: "Built for export",
    d: "Skid-mounted and containerised builds, pre-commissioned dry, and documented for customs on four continents.",
  },
  {
    k: "03",
    t: "Service that answers",
    d: "Regional technicians, a stocked spares programme, and remote telemetry on every plant we commission.",
  },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.18"],
  });

  const words = COPY.split(" ");

  return (
    <section id="about" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <SectionLabel>Who we are</SectionLabel>

        <div className="grid gap-14 lg:grid-cols-12">
          <h2 className="display col-span-full text-[9vw] leading-[0.92] lg:col-span-4 lg:text-[3.6vw]">
            <RevealWords text="Cold is a promise" />
          </h2>

          <div ref={ref} className="col-span-full lg:col-span-8">
            <p className="text-[5.4vw] leading-[1.25] tracking-[-0.02em] sm:text-[3.2vw] lg:text-[1.85vw]">
              {words.map((w, i) => (
                <Word
                  key={`${w}-${i}`}
                  progress={scrollYProgress}
                  range={[i / words.length, (i + 1) / words.length]}
                >
                  {w}
                </Word>
              ))}
            </p>
          </div>
        </div>

        <div className="mt-24 grid gap-px overflow-hidden rounded-2xl border border-frost/10 bg-frost/10 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <FadeUp key={p.k} index={i} className="h-full">
              <motion.div
                className="group relative h-full overflow-hidden bg-ink-2/80 p-8 md:p-10"
                whileHover="hover"
                initial="rest"
                animate="rest"
              >
                <motion.span
                  className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-ice/15 to-transparent"
                  variants={{ rest: { y: "100%" }, hover: { y: "0%" } }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                />
                <span className="eyebrow relative text-ice/70">{p.k}</span>
                <h3 className="display relative mt-6 text-2xl md:text-[1.7vw]">{p.t}</h3>
                <p className="relative mt-4 max-w-sm text-sm leading-relaxed text-steel">
                  {p.d}
                </p>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
