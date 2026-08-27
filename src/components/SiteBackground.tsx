"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import BackgroundVideo from "./BackgroundVideo";

/**
 * Fixed media plate the whole page sits on.
 *
 * Performance note: everything that changes on scroll here is limited to
 * `transform` and `opacity`, which the compositor can handle without repainting.
 * An earlier version animated a `blur()` filter over the video as you scrolled —
 * that forced a full re-raster of a viewport-sized video layer every frame and
 * was the main source of scroll jank. The colour grade is now a static filter,
 * applied once, and depth comes from the scrim's opacity alone.
 */
export default function SiteBackground() {
  const { scrollYProgress } = useScroll();

  const scrim = useTransform(
    scrollYProgress,
    [0, 0.12, 0.86, 1],
    [0.06, 0.42, 0.48, 0.24]
  );
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1.16]);

  return (
    <div className="bg-fixed-layer" aria-hidden>
      <motion.div
        style={{ scale, willChange: "transform" }}
        className="absolute inset-0 [filter:brightness(1.24)_saturate(1.3)_contrast(1.06)]"
      >
        <BackgroundVideo
          src="/video/ice-loop.mp4"
          poster="/media/hero-poster.png"
          pauseOffscreen={false}
        />
      </motion.div>

      {/* Cold cast. Plain alpha rather than a blend mode — a viewport-sized
          mix-blend layer over playing video is composited every frame. */}
      <div className="absolute inset-0 bg-[rgba(38,132,190,0.16)]" />

      {/* Scroll-reactive scrim (opacity only) */}
      <motion.div
        className="absolute inset-0 bg-ink"
        style={{ opacity: scrim, willChange: "opacity" }}
      />

      {/* Legibility grading: gentle falloff behind the nav and the fold */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/45 via-transparent to-ink/55" />
      <div className="absolute inset-0 bg-[radial-gradient(125%_95%_at_50%_35%,transparent_0%,rgba(4,7,13,0.42)_100%)]" />

      {/* Static film grain — no animation, no blend mode */}
      <div className="grain-static absolute inset-0" />
    </div>
  );
}
