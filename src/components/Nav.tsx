"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { EASE_IN_OUT_QUINT, EASE_OUT_EXPO } from "@/lib/motion";
import { useScrollLock } from "@/lib/hooks";
import { Magnetic } from "./anim";

const LINKS = [
  { label: "Home", href: "#top", index: "01" },
  { label: "About", href: "#about", index: "02" },
  { label: "Services", href: "#services", index: "03" },
  { label: "Markets", href: "#markets", index: "04" },
  { label: "Projects", href: "#projects", index: "05" },
  { label: "Contact", href: "#contact", index: "06" },
];

function Logo() {
  return (
    <a href="#top" className="group flex items-center gap-3">
      <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-md bg-frost text-ink">
        <motion.span
          className="absolute inset-0 bg-ice"
          initial={{ y: "100%" }}
          whileHover={{ y: "0%" }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
        />
        <span className="display relative z-10 text-lg leading-none">B</span>
      </span>
      <span className="display text-lg tracking-[-0.02em]">
        Barnett<span className="text-ice">USA</span>
        <span className="text-frost/45">.biz</span>
      </span>
    </a>
  );
}

/**
 * Link whose label slides up to reveal an ice-blue duplicate underneath. The
 * mask is clamped to a single line height, and the stack travels -50% because
 * the moving element is exactly two lines tall.
 */
function NavLink({ label, href }: { label: string; href: string }) {
  return (
    <motion.a
      href={href}
      className="group relative block text-sm"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <span className="block h-[1.4em] overflow-hidden">
        <motion.span
          className="block"
          variants={{ rest: { y: "0%" }, hover: { y: "-50%" } }}
          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
        >
          <span className="block h-[1.4em] leading-[1.4em] text-frost/80">{label}</span>
          <span className="block h-[1.4em] leading-[1.4em] text-ice">{label}</span>
        </motion.span>
      </span>
    </motion.a>
  );
}

export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useScrollLock(open);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    if (open) return;
    setHidden(y > prev && y > 220);
  });

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[90]"
        initial={{ y: -120 }}
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
      >
        <motion.div
          className="absolute inset-0 border-b border-frost/10 bg-ink/85"
          animate={{ opacity: solid && !open ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
        <nav className="relative mx-auto flex h-[var(--nav-h)] max-w-[1500px] items-center justify-between px-6 md:px-10">
          <Logo />

          <div className="hidden items-center gap-9 lg:flex">
            {LINKS.slice(1, 5).map((l) => (
              <NavLink key={l.href} label={l.label} href={l.href} />
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Magnetic strength={0.25} className="hidden sm:block">
              <a
                href="#contact"
                className="group relative inline-flex overflow-hidden rounded-full border border-frost/25 px-5 py-2.5 text-xs tracking-wide"
              >
                <motion.span
                  className="absolute inset-0 bg-frost"
                  initial={{ y: "101%" }}
                  whileHover={{ y: "0%" }}
                  transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                />
                <span className="relative z-10 transition-colors duration-300 group-hover:text-ink">
                  Get a free quote
                </span>
              </a>
            </Magnetic>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="relative z-[110] flex h-11 w-11 flex-col items-center justify-center gap-[7px] rounded-full border border-frost/20"
            >
              <motion.span
                className="block h-px w-4 bg-frost"
                animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
              />
              <motion.span
                className="block h-px w-4 bg-frost"
                animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col justify-center overflow-y-auto bg-ink-2/95 py-24 backdrop-blur-2xl"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.85, ease: EASE_IN_OUT_QUINT }}
          >
            <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10">
              <ul className="flex flex-col">
                {LINKS.map((l, i) => (
                  <li key={l.href} className="hairline">
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-5 py-2 md:py-3"
                    >
                      <span className="eyebrow w-8 shrink-0 text-ice/60">{l.index}</span>
                      <span className="line-mask">
                        <motion.span
                          className="display block text-[12vw] leading-[0.98] md:text-[6vw]"
                          initial={{ y: "110%" }}
                          animate={{ y: "0%" }}
                          exit={{ y: "110%" }}
                          transition={{
                            duration: 0.9,
                            ease: EASE_OUT_EXPO,
                            delay: 0.18 + i * 0.06,
                          }}
                        >
                          <motion.span
                            className="block transition-colors duration-300 group-hover:text-ice"
                            whileHover={{ x: 18 }}
                            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                          >
                            {l.label}
                          </motion.span>
                        </motion.span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <motion.div
                className="mt-10 grid gap-6 text-sm text-steel sm:grid-cols-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.55 }}
              >
                <div>
                  <p className="eyebrow mb-2 text-frost">Headquarters</p>
                  <p>
                    1420 Cold Harbor Rd.
                    <br />
                    Houston, TX 77002
                  </p>
                </div>
                <div>
                  <p className="eyebrow mb-2 text-frost">Contact</p>
                  <p>
                    sales@barnettusa.biz
                    <br />
                    +1 (713) 555-0142
                  </p>
                </div>
                <div>
                  <p className="eyebrow mb-2 text-frost">Follow</p>
                  <p>
                    LinkedIn — Instagram
                    <br />
                    YouTube
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
