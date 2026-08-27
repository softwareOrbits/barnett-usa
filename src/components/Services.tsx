"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { RevealWords, SectionLabel } from "./anim";
import { ColdArt, IceArt, ServiceArt, WaterArt } from "./ServiceArt";

type Service = {
  no: string;
  title: string;
  blurb: string;
  points: string[];
  art: ReactNode;
  tint: string;
};

const SERVICES: Service[] = [
  {
    no: "01",
    title: "Ice-Making Equipment",
    blurb:
      "Flake, tube, plate and block ice plants from 500 kg to 60 tonnes a day, matched to your water chemistry and duty cycle.",
    points: ["Flake & tube ice machines", "Block ice plants", "Storage, rake & bagging lines"],
    art: <IceArt />,
    tint: "from-[#0b2438] to-[#04070d]",
  },
  {
    no: "02",
    title: "Water Treatment",
    blurb:
      "Reverse osmosis, softening, filtration and UV trains that protect the plant downstream and meet potable spec on arrival.",
    points: ["RO & nanofiltration skids", "Softening and dosing", "UV, ozone & polishing"],
    art: <WaterArt />,
    tint: "from-[#07283a] to-[#04070d]",
  },
  {
    no: "03",
    title: "Refrigeration Systems",
    blurb:
      "Cold rooms, blast freezers and process cooling on ammonia, CO₂ or HFO — designed around the load, not a catalogue.",
    points: ["Cold rooms & blast freezing", "NH₃ / CO₂ packaged plant", "Process chilling"],
    art: <ColdArt />,
    tint: "from-[#0a1d33] to-[#04070d]",
  },
  {
    no: "04",
    title: "Service & Spares",
    blurb:
      "Commissioning, retrofits, preventive contracts and a stocked parts programme — with telemetry on every plant we hand over.",
    points: ["24/7 breakdown response", "Preventive contracts", "Retrofit & efficiency upgrades"],
    art: <ServiceArt />,
    tint: "from-[#0d2030] to-[#04070d]",
  },
];

function Card({
  service,
  i,
  progress,
  total,
}: {
  service: Service;
  i: number;
  progress: MotionValue<number>;
  total: number;
}) {
  // Each card shrinks slightly as the next one slides over it, so the stack
  // reads as depth rather than a flat overlap.
  const targetScale = 1 - (total - i) * 0.035;
  const scale = useTransform(progress, [i / total, 1], [1, targetScale]);
  const dim = useTransform(progress, [i / total, Math.min(1, (i + 1.2) / total)], [0, 0.45]);

  return (
    <div className="sticky top-0 flex h-screen-safe items-center justify-center px-6 md:px-10">
      <motion.article
        style={{ scale, top: `calc(-8vh + ${i * 22}px)` }}
        className={`relative w-full max-w-[1300px] overflow-hidden rounded-[28px] border border-frost/12 bg-gradient-to-br ${service.tint} shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]`}
      >
        <motion.span
          className="pointer-events-none absolute inset-0 z-20 bg-ink"
          style={{ opacity: dim }}
        />
        <div className="relative z-10 grid gap-10 p-8 md:grid-cols-2 md:p-14">
          <div className="flex flex-col justify-between gap-10">
            <div className="flex items-center justify-between">
              <span className="eyebrow text-ice">{service.no}</span>
              <span className="eyebrow text-frost/35">Barnett USA</span>
            </div>

            <div>
              <h3 className="display text-[9vw] leading-[0.94] md:text-[3.4vw]">
                {service.title}
              </h3>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-steel md:text-base">
                {service.blurb}
              </p>
            </div>

            <ul className="flex flex-col">
              {service.points.map((p) => (
                <li
                  key={p}
                  className="group flex items-center justify-between border-t border-frost/12 py-4 text-sm"
                >
                  <span className="transition-colors duration-300 group-hover:text-ice">{p}</span>
                  <motion.span
                    className="text-ice"
                    initial={{ opacity: 0.35, x: 0 }}
                    whileHover={{ opacity: 1, x: 5 }}
                  >
                    →
                  </motion.span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative flex items-center justify-center overflow-hidden rounded-2xl border border-frost/10 bg-ink/55 p-6">
            <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_40%,rgba(111,208,255,0.16),transparent_70%)]" />
            <div className="relative aspect-square w-full max-w-[380px]">{service.art}</div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function Services() {
  const container = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section id="services" ref={container} className="relative">
      <div className="mx-auto max-w-[1500px] px-6 pb-16 pt-24 md:px-10 md:pt-32">
        <SectionLabel>What we build</SectionLabel>
        <h2 className="display max-w-4xl text-[11vw] leading-[0.92] md:text-[5vw]">
          <RevealWords text="Four disciplines, one cold chain" />
        </h2>
      </div>

      {SERVICES.map((s, i) => (
        <Card key={s.no} service={s} i={i} total={SERVICES.length} progress={scrollYProgress} />
      ))}
    </section>
  );
}
