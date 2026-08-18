"use client";

import { motion, useReducedMotion } from "framer-motion";

const SPARKLES = [
  { top: "8%", left: "10%", size: 3, delay: 0 },
  { top: "18%", left: "88%", size: 2, delay: 0.6 },
  { top: "34%", left: "6%", size: 2, delay: 1.2 },
  { top: "46%", left: "92%", size: 3, delay: 0.3 },
  { top: "62%", left: "14%", size: 2, delay: 1.6 },
  { top: "72%", left: "84%", size: 2, delay: 0.9 },
  { top: "12%", left: "48%", size: 2, delay: 2 },
  { top: "82%", left: "50%", size: 2, delay: 1.1 },
];

/**
 * A handful of slow-twinkling gold points of light — the ambient warmth of
 * candles and starlight over the lake, not confetti. Purely decorative and
 * inert under prefers-reduced-motion.
 */
export function SparkleField({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <div aria-hidden="true" className={className}>
      {SPARKLES.map((s, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-gold-light"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
          animate={reduced ? { opacity: 0.35 } : { opacity: [0.15, 0.85, 0.15], scale: [0.8, 1.15, 0.8] }}
          transition={reduced ? undefined : { duration: 4.5, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
