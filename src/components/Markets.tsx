"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { FadeUp, RevealWords, SectionLabel } from "./anim";

const MARKETS = [
  {
    key: "domestic",
    kicker: "Domestic sales",
    title: "United States",
    copy:
      "Direct supply, installation and service across all 50 states, with regional technicians and a Houston parts depot shipping same-day.",
    facts: [
      ["Lead time", "4–9 weeks"],
      ["Coverage", "50 states"],
      ["Response", "24/7"],
    ],
  },
  {
    key: "international",
    kicker: "International sales",
    title: "Worldwide",
    copy:
      "Containerised, pre-commissioned plant shipped to 40+ countries — documented for customs, supported by remote telemetry and local partners.",
    facts: [
      ["Shipping", "FOB / CIF"],
      ["Markets", "40+ countries"],
      ["Support", "Remote + local"],
    ],
  },
];

/** Abstract route lines standing in for a world map. */
function RouteArt({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 400 200" fill="none" className="absolute inset-0 h-full w-full opacity-60">
      {[0, 1, 2].map((i) => (
        <motion.path
          key={i}
          d={`M-20 ${150 - i * 30} C 90 ${60 - i * 20}, 250 ${190 - i * 40}, 420 ${70 - i * 15}`}
          stroke="var(--color-ice)"
          strokeOpacity={0.35}
          strokeDasharray="3 9"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: active ? 1 : 0.4, strokeDashoffset: [0, -48] }}
          transition={{
            pathLength: { duration: 1.4, ease: EASE_OUT_EXPO },
            strokeDashoffset: { duration: 2.2, repeat: Infinity, ease: "linear" },
          }}
        />
      ))}
      {[
        [60, 120],
        [180, 90],
        [300, 130],
        [360, 70],
      ].map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r="3"
          fill="var(--color-ice)"
          animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.6, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}
    </svg>
  );
}

export default function Markets() {
  const [active, setActive] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section id="markets" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <SectionLabel>Where we ship</SectionLabel>
        <div className="mb-16 grid gap-8 lg:grid-cols-12">
          <h2 className="display col-span-full text-[10vw] leading-[0.92] lg:col-span-7 lg:text-[4.6vw]">
            <RevealWords text="From a Houston dock to any coastline" />
          </h2>
          <FadeUp className="col-span-full self-end lg:col-span-4 lg:col-start-9">
            <p className="text-sm leading-relaxed text-steel">
              Two desks, one engineering team. Whether the plant is trucked to Louisiana or
              craned onto a vessel bound for Lagos, it is built, tested and documented the
              same way.
            </p>
          </FadeUp>
        </div>

        <motion.div ref={ref} style={{ y }} className="flex flex-col gap-5 lg:flex-row">
          {MARKETS.map((m) => {
            const isActive = active === m.key;
            return (
              <motion.div
                key={m.key}
                onHoverStart={() => setActive(m.key)}
                onHoverEnd={() => setActive(null)}
                className="group relative min-h-[420px] flex-1 overflow-hidden rounded-[26px] border border-frost/12 bg-ink-2/75 p-8 md:min-h-[520px] md:p-12"
                animate={{ flexGrow: isActive ? 1.55 : 1 }}
                transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_20%_0%,rgba(111,208,255,0.14),transparent_65%)]" />
                <RouteArt active={isActive} />

                <motion.div
                  className="absolute inset-0 bg-ice/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.6 }}
                />

                <div className="relative flex h-full flex-col justify-between">
                  <span className="eyebrow text-ice">{m.kicker}</span>

                  <div>
                    <h3 className="display text-[13vw] leading-[0.9] md:text-[5vw]">
                      {m.title}
                    </h3>
                    <motion.p
                      className="mt-5 max-w-md text-sm leading-relaxed text-steel"
                      animate={{ opacity: isActive ? 1 : 0.75 }}
                    >
                      {m.copy}
                    </motion.p>

                    <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
                      {m.facts.map(([k, v]) => (
                        <div key={k}>
                          <p className="eyebrow text-frost/40">{k}</p>
                          <p className="mt-1 text-lg">{v}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
