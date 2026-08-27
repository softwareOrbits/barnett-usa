"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { SectionLabel } from "./anim";

const QUOTES = [
  {
    quote:
      "They rebuilt our ice line during the season without losing a single day of landings. Nobody else would even quote it.",
    name: "Marisol Vega",
    role: "Operations Director, Gulf Harvest Seafood",
  },
  {
    quote:
      "The RO train arrived pre-commissioned in a container and was making spec water in under a week. That is unheard of out here.",
    name: "Kwame Adjei",
    role: "Plant Manager, Port of Tema Cold Store",
  },
  {
    quote:
      "Twenty-two months on and the telemetry has caught two faults before we ever felt them. The service contract pays for itself.",
    name: "Dale Hutchins",
    role: "Head Brewer, Ascension Brewing Co.",
  },
];

export default function Testimonials() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => setI((v) => (v + 1) % QUOTES.length), 6500);
    return () => window.clearInterval(t);
  }, []);

  const active = QUOTES[i];

  return (
    <section className="relative border-y border-frost/10 bg-ink-2/70 py-24 md:py-36">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <SectionLabel>Client word</SectionLabel>

        <div className="relative min-h-[260px] md:min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
              className="max-w-5xl"
            >
              <p className="text-[6vw] leading-[1.15] tracking-[-0.03em] sm:text-[4vw] lg:text-[2.6vw]">
                <span className="text-ice">“</span>
                {active.quote}
                <span className="text-ice">”</span>
              </p>
              <footer className="mt-8 flex items-center gap-4">
                <span className="h-px w-10 bg-ice/60" />
                <span className="text-sm">
                  <span className="text-frost">{active.name}</span>
                  <span className="text-steel"> — {active.role}</span>
                </span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex gap-3">
          {QUOTES.map((q, idx) => (
            <button
              key={q.name}
              onClick={() => setI(idx)}
              aria-label={`Show quote ${idx + 1}`}
              className="relative h-[3px] w-16 overflow-hidden bg-frost/15"
            >
              <motion.span
                className="absolute inset-y-0 left-0 bg-ice"
                initial={false}
                animate={{ width: idx === i ? "100%" : "0%" }}
                transition={{ duration: idx === i ? 6.5 : 0.3, ease: "linear" }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
