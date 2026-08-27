"use client";

import Marquee from "./Marquee";

const ITEMS = [
  "Flake ice",
  "Tube ice",
  "Block ice plants",
  "Reverse osmosis",
  "Blast freezing",
  "Cold rooms",
  "Process chilling",
  "24/7 service",
];

export default function TickerBand() {
  return (
    <div className="relative border-y border-frost/10 bg-ink-2/60 py-5">
      <Marquee baseVelocity={2.4} repeat={3}>
        <span className="flex items-center gap-8 pr-8 text-sm tracking-[0.18em] text-frost/70 uppercase">
          {ITEMS.map((item) => (
            <span key={item} className="flex items-center gap-8">
              {item}
              <span className="text-ice">◆</span>
            </span>
          ))}
        </span>
      </Marquee>
    </div>
  );
}
