"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { FadeUp } from "./anim";

const STATS = [
  { value: 26, suffix: "", label: "Years engineering cold systems" },
  { value: 40, suffix: "+", label: "Countries with plant in service" },
  { value: 900, suffix: "t", label: "Ice produced daily across our fleet" },
  { value: 99.4, suffix: "%", label: "Uptime across contracted plants", decimals: 1 },
];

function Counter({
  value,
  suffix,
  decimals = 0,
}: {
  value: number;
  suffix: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const count = useMotionValue(0);
  const text = useTransform(count, (v) => v.toFixed(decimals));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, { duration: 2, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [inView, count, value]);

  return (
    <span ref={ref} className="display text-[13vw] leading-none md:text-[4.6vw]">
      <motion.span>{text}</motion.span>
      <span className="text-ice">{suffix}</span>
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative border-y border-frost/10 bg-ink-2/72 py-20 md:py-28">
      <div className="mx-auto grid max-w-[1500px] gap-12 px-6 md:grid-cols-2 md:px-10 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <FadeUp key={s.label} index={i}>
            <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} />
            <p className="mt-4 max-w-[13rem] text-sm leading-snug text-steel">{s.label}</p>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
