"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { FadeUp, Magnetic, RevealLines, SectionLabel } from "./anim";

const FIELDS = [
  { name: "name", label: "Your name", type: "text", placeholder: "Jordan Rivera" },
  { name: "company", label: "Company", type: "text", placeholder: "Gulf Harvest Seafood" },
  { name: "email", label: "Email", type: "email", placeholder: "you@company.com" },
  { name: "country", label: "Country", type: "text", placeholder: "United States" },
];

const NEEDS = ["Ice-making", "Water treatment", "Refrigeration", "Service & spares"];

export default function Contact() {
  const [need, setNeed] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  const toggle = (n: string) =>
    setNeed((v) => (v.includes(n) ? v.filter((x) => x !== n) : [...v, n]));

  return (
    <section id="contact" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <SectionLabel>Start a project</SectionLabel>

        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="display text-[12vw] leading-[0.9] lg:text-[4.4vw]">
              <RevealLines lines={["Tell us", <span key="2" className="text-ice">the load.</span>]} />
            </h2>
            <FadeUp className="mt-8 max-w-sm text-sm leading-relaxed text-steel">
              <p>
                Send the duty, the ambient and the water report — or just describe the
                problem. An engineer, not a call centre, answers within one business day.
              </p>
            </FadeUp>

            <FadeUp index={1} className="mt-10 flex flex-col gap-5 text-sm">
              {[
                ["Sales", "sales@barnettusa.biz"],
                ["Service", "+1 (713) 555-0142"],
                ["Head office", "1420 Cold Harbor Rd, Houston, TX"],
              ].map(([k, v]) => (
                <div key={k} className="hairline pt-4">
                  <p className="eyebrow text-frost/40">{k}</p>
                  <p className="mt-1 text-frost">{v}</p>
                </div>
              ))}
            </FadeUp>
          </div>

          <FadeUp index={1} className="lg:col-span-6 lg:col-start-7">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="glass rounded-3xl p-7 md:p-10"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                {FIELDS.map((f) => (
                  <label key={f.name} className="group block">
                    <span className="eyebrow text-frost/40">{f.label}</span>
                    <input
                      type={f.type}
                      name={f.name}
                      placeholder={f.placeholder}
                      required={f.name === "email"}
                      className="mt-2 w-full border-b border-frost/20 bg-transparent pb-3 text-sm text-frost outline-none transition-colors duration-300 placeholder:text-frost/25 focus:border-ice"
                    />
                  </label>
                ))}
              </div>

              <div className="mt-9">
                <span className="eyebrow text-frost/40">What do you need?</span>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {NEEDS.map((n) => {
                    const on = need.includes(n);
                    return (
                      <motion.button
                        type="button"
                        key={n}
                        onClick={() => toggle(n)}
                        className={`relative overflow-hidden rounded-full border px-4 py-2 text-xs transition-colors duration-300 ${
                          on ? "border-ice text-ink" : "border-frost/20 text-frost/70"
                        }`}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.span
                          className="absolute inset-0 bg-ice"
                          initial={false}
                          animate={{ y: on ? "0%" : "101%" }}
                          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                        />
                        <span className="relative z-10">{n}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <label className="mt-9 block">
                <span className="eyebrow text-frost/40">Project detail</span>
                <textarea
                  rows={3}
                  name="message"
                  placeholder="Duty, ambient temperature, water source, timeline…"
                  className="mt-2 w-full resize-none border-b border-frost/20 bg-transparent pb-3 text-sm text-frost outline-none transition-colors duration-300 placeholder:text-frost/25 focus:border-ice"
                />
              </label>

              <div className="mt-10 flex flex-wrap items-center gap-5">
                <Magnetic>
                  <motion.button
                    type="submit"
                    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-frost px-7 py-4 text-sm font-medium tracking-wide text-ink"
                    initial="rest"
                    animate="rest"
                    whileHover="hover"
                    whileTap={{ scale: 0.97 }}
                  >
                    <motion.span
                      className="absolute inset-0 bg-ice"
                      variants={{ rest: { y: "101%" }, hover: { y: "0%" } }}
                      transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
                    />
                    <span className="relative z-10">
                      {sent ? "Request received" : "Send request"}
                    </span>
                    <motion.span
                      className="relative z-10"
                      variants={{ rest: { x: 0 }, hover: { x: 4 } }}
                      transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor">
                        <path
                          d="M2 8h12M9 3l5 5-5 5"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.span>
                  </motion.button>
                </Magnetic>
                <motion.span
                  className="text-xs text-steel"
                  animate={{ opacity: sent ? 1 : 0.6 }}
                >
                  {sent
                    ? "Demo form — nothing was actually transmitted."
                    : "Typical reply within one business day."}
                </motion.span>
              </div>
            </form>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
