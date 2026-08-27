"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useState } from "react";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { useFinePointer } from "@/lib/hooks";
import { RevealWords, SectionLabel } from "./anim";

const PROJECTS = [
  {
    no: "01",
    client: "Gulf Harvest Seafood",
    scope: "45 t/day flake ice plant",
    place: "Galveston, TX",
    year: "2024",
    tint: "from-[#0a2c45] to-[#061626]",
  },
  {
    no: "02",
    client: "Ascension Brewing Co.",
    scope: "Glycol process cooling",
    place: "Denver, CO",
    year: "2024",
    tint: "from-[#0d2438] to-[#04101c]",
  },
  {
    no: "03",
    client: "Port of Tema Cold Store",
    scope: "Containerised RO + blast freezing",
    place: "Tema, Ghana",
    year: "2023",
    tint: "from-[#07293c] to-[#03121e]",
  },
  {
    no: "04",
    client: "Sierra Valley Produce",
    scope: "Vacuum cooling & cold rooms",
    place: "Salinas, CA",
    year: "2023",
    tint: "from-[#0b2033] to-[#050f1b]",
  },
  {
    no: "05",
    client: "Al Bahr Fisheries",
    scope: "60 t/day tube ice + storage",
    place: "Muscat, Oman",
    year: "2022",
    tint: "from-[#0a2740] to-[#04111d]",
  },
];

export default function Projects() {
  const fine = useFinePointer();
  const [active, setActive] = useState<number | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const px = useSpring(x, { stiffness: 260, damping: 28, mass: 0.5 });
  const py = useSpring(y, { stiffness: 260, damping: 28, mass: 0.5 });

  const onMove = (e: React.PointerEvent) => {
    x.set(e.clientX);
    y.set(e.clientY);
  };

  return (
    <section id="projects" className="relative py-28 md:py-40" onPointerMove={onMove}>
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <SectionLabel>Selected work</SectionLabel>
        <h2 className="display mb-14 max-w-3xl text-[11vw] leading-[0.92] md:text-[4.8vw]">
          <RevealWords text="Plants running right now" />
        </h2>

        <ul className="relative">
          {PROJECTS.map((p, i) => (
            <motion.li
              key={p.no}
              className="hairline relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: i * 0.05 }}
              onHoverStart={() => setActive(i)}
              onHoverEnd={() => setActive(null)}
            >
              <a
                href="#contact"
                className="relative flex flex-col gap-2 overflow-hidden py-7 md:flex-row md:items-center md:gap-8 md:py-9"
              >
                {/* Ice-blue wash sweeping in from the left on hover */}
                <motion.span
                  className="absolute inset-0 -z-10 bg-gradient-to-r from-ice/15 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: active === i ? 1 : 0 }}
                  style={{ originX: 0 }}
                  transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
                />
                <motion.span
                  className="eyebrow w-10 shrink-0 text-ice/60"
                  animate={{ x: active === i ? 14 : 0 }}
                  transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                >
                  {p.no}
                </motion.span>

                <motion.h3
                  className="display flex-1 text-[7vw] leading-none md:text-[2.9vw]"
                  animate={{ x: active === i ? 22 : 0, opacity: active === null || active === i ? 1 : 0.35 }}
                  transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                >
                  {p.client}
                </motion.h3>

                <motion.span
                  className="text-sm text-steel md:w-64"
                  animate={{ opacity: active === null || active === i ? 1 : 0.3 }}
                >
                  {p.scope}
                </motion.span>
                <span className="hidden text-sm text-steel md:block md:w-40">{p.place}</span>
                <span className="text-xs text-frost/40 md:w-14 md:text-right">{p.year}</span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Cursor-following preview card — desktop only */}
      {fine && (
        <AnimatePresence>
          {active !== null && (
            <motion.div
              className="pointer-events-none fixed left-0 top-0 z-[80] -ml-[170px] -mt-[110px] h-[220px] w-[340px]"
              style={{ x: px, y: py }}
              initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: -2 }}
              exit={{ opacity: 0, scale: 0.85, rotate: 3 }}
              transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
            >
              <div
                className={`relative h-full w-full overflow-hidden rounded-xl border border-frost/15 bg-gradient-to-br ${PROJECTS[active].tint} shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(70%_70%_at_30%_20%,rgba(111,208,255,0.22),transparent_70%)]" />
                <svg viewBox="0 0 340 220" className="absolute inset-0 h-full w-full" fill="none">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <motion.rect
                      key={i}
                      x={20 + i * 56}
                      y={-30}
                      width="34"
                      height="34"
                      rx="6"
                      stroke="rgba(234,245,255,0.35)"
                      animate={{ y: [-30, 240], rotate: [0, 120] }}
                      transition={{
                        duration: 3.4,
                        repeat: Infinity,
                        delay: i * 0.35,
                        ease: "linear",
                      }}
                    />
                  ))}
                </svg>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="eyebrow text-ice">{PROJECTS[active].place}</p>
                  <p className="display mt-1 text-xl">{PROJECTS[active].scope}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </section>
  );
}
