"use client";

import { motion } from "framer-motion";

const stroke = "rgba(234,245,255,0.55)";
const accent = "var(--color-ice)";

/**
 * Line-art scenes standing in for product photography. Each one animates on a
 * loop so the sticky cards never feel static.
 */
export function IceArt() {
  return (
    <svg viewBox="0 0 300 260" fill="none" className="h-full w-full">
      <defs>
        <linearGradient id="iceFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6fd0ff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#6fd0ff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="52" y="150" width="196" height="86" rx="6" stroke={stroke} />
      <path d="M52 172h196" stroke={stroke} strokeDasharray="4 6" />
      <rect x="72" y="188" width="156" height="34" rx="3" fill="url(#iceFade)" stroke={stroke} />
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.rect
          key={i}
          x={70 + i * 34}
          y={-30}
          width="26"
          height="26"
          rx="4"
          stroke={i % 2 ? accent : stroke}
          initial={{ y: -40, rotate: 0, opacity: 0 }}
          animate={{ y: [-40, 150], rotate: [0, 140], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            delay: i * 0.42,
            ease: "easeIn",
            times: [0, 0.15, 0.8, 1],
          }}
        />
      ))}
      <motion.path
        d="M92 236v14M150 236v14M208 236v14"
        stroke={accent}
        strokeWidth="1.5"
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 2.4, repeat: Infinity }}
      />
    </svg>
  );
}

export function WaterArt() {
  return (
    <svg viewBox="0 0 300 260" fill="none" className="h-full w-full">
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={44 + i * 76} y="70" width="52" height="140" rx="26" stroke={stroke} />
          <motion.rect
            x={44 + i * 76}
            y="70"
            width="52"
            height="140"
            rx="26"
            fill={accent}
            initial={{ opacity: 0.08 }}
            animate={{ opacity: [0.06, 0.24, 0.06] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
          />
        </g>
      ))}
      <path d="M44 60h208" stroke={stroke} />
      <motion.circle
        cx="150"
        cy="34"
        r="9"
        stroke={accent}
        animate={{ y: [0, 22, 0], opacity: [1, 0.3, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M44 232h208"
        stroke={accent}
        strokeWidth="2"
        strokeDasharray="10 12"
        animate={{ strokeDashoffset: [0, -44] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}

export function ColdArt() {
  return (
    <svg viewBox="0 0 300 260" fill="none" className="h-full w-full">
      <rect x="46" y="46" width="208" height="168" rx="8" stroke={stroke} />
      <path d="M150 46v168" stroke={stroke} strokeDasharray="4 6" />
      {[0, 1, 2, 3].map((i) => (
        <motion.path
          key={i}
          d={`M70 ${78 + i * 34}h160`}
          stroke={i === 1 ? accent : stroke}
          animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.32, ease: "easeInOut" }}
        />
      ))}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        style={{ originX: "150px", originY: "130px" }}
      >
        <path d="M150 96v68M120 130h60M129 109l42 42M171 109l-42 42" stroke={accent} strokeWidth="1.5" />
      </motion.g>
      <circle cx="150" cy="130" r="6" fill={accent} />
    </svg>
  );
}

export function ServiceArt() {
  return (
    <svg viewBox="0 0 300 260" fill="none" className="h-full w-full">
      <motion.circle
        cx="150"
        cy="130"
        r="86"
        stroke={stroke}
        strokeDasharray="6 10"
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        style={{ originX: "150px", originY: "130px" }}
      />
      <circle cx="150" cy="130" r="56" stroke={stroke} />
      <motion.circle
        cx="150"
        cy="130"
        r="56"
        stroke={accent}
        strokeDasharray="352"
        animate={{ strokeDashoffset: [352, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <path d="M150 102v28l20 12" stroke={accent} strokeWidth="2" strokeLinecap="round" />
      {[0, 1, 2, 3].map((i) => (
        <motion.rect
          key={i}
          x={143}
          y={20}
          width="14"
          height="14"
          rx="3"
          stroke={stroke}
          style={{ originX: "150px", originY: "130px" }}
          animate={{ rotate: [i * 90, i * 90 + 360] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </svg>
  );
}
