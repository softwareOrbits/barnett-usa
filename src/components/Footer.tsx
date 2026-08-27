"use client";

import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";
import Marquee from "./Marquee";
import { RevealLines } from "./anim";

const COLUMNS = [
  {
    title: "Company",
    links: ["About", "Engineering", "Careers", "Newsroom"],
  },
  {
    title: "Solutions",
    links: ["Ice-making", "Water treatment", "Refrigeration", "Service & spares"],
  },
  {
    title: "Markets",
    links: ["Seafood & fisheries", "Food processing", "Breweries", "Healthcare"],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-frost/10 bg-ink-2/85 pt-20">
      <div className="border-b border-frost/10 pb-10">
        <Marquee baseVelocity={4} repeat={4}>
          <span className="display flex items-center gap-8 pr-8 text-[13vw] leading-none text-frost/90 md:text-[7vw]">
            Let&rsquo;s talk cold
            <span className="text-ice">✳</span>
            Let&rsquo;s talk cold
            <span className="text-ice">✳</span>
          </span>
        </Marquee>
      </div>

      <div className="mx-auto max-w-[1500px] px-6 py-16 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h3 className="display text-3xl leading-tight md:text-4xl">
              <RevealLines lines={["Barnett USA", <span key="b" className="text-ice">since 1998</span>]} />
            </h3>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-steel">
              Ice-making, water treatment and refrigeration engineered in Houston and
              shipped worldwide.
            </p>
            <a
              href="mailto:sales@barnettusa.biz"
              className="group mt-8 inline-flex flex-col"
            >
              <span className="text-lg text-frost">sales@barnettusa.biz</span>
              <motion.span
                className="mt-1 h-px w-full origin-left bg-ice"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
              />
            </a>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <p className="eyebrow mb-5 text-frost/40">{col.title}</p>
              <ul className="flex flex-col gap-3 text-sm">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#services"
                      className="group inline-flex items-center gap-2 text-steel transition-colors duration-300 hover:text-frost"
                    >
                      <span className="h-px w-0 bg-ice transition-all duration-300 group-hover:w-4" />
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-1">
            <p className="eyebrow mb-5 text-frost/40">Social</p>
            <ul className="flex flex-col gap-3 text-sm text-steel">
              {["LinkedIn", "Instagram", "YouTube"].map((s) => (
                <li key={s}>
                  <a href="#top" className="transition-colors hover:text-frost">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-frost/10 pt-6 text-xs text-frost/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Barnett USA — demo concept. Not a live business site.</p>
          <p>Houston, TX · 29.76° N, 95.37° W</p>
        </div>
      </div>
    </footer>
  );
}
