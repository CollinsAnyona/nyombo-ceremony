"use client";

import { motion } from "framer-motion";
import { useGoldGradientId, GoldGradientDefs } from "./gold-gradient";
import { cn } from "@/lib/utils";

/**
 * The RSVP's signature selection control (brief Section 7): matte ivory
 * when unselected, gold-leafed with a specular sweep on selection. Purely
 * presentational — the caller wraps this in a real radio input/button with
 * role="radio", aria-checked, and a visible focus ring; this component only
 * renders the visual state.
 */
export function CowrieShell({ selected, className }: { selected: boolean; className?: string }) {
  const gradientId = useGoldGradientId();

  return (
    <motion.svg
      aria-hidden="true"
      className={cn("h-auto", className)}
      viewBox="0 0 64 40"
      fill="none"
      animate={{ scale: selected ? 1.08 : 1 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <GoldGradientDefs id={gradientId} />
      <ellipse
        cx="32"
        cy="20"
        rx="28"
        ry="17"
        fill={selected ? `url(#${gradientId})` : "var(--color-ivory-cowrie)"}
        stroke="var(--color-gold-deep)"
        strokeWidth="1"
      />
      {/* the shell's ventral slit with tooth ridges, always drawn in ink so it reads at both states */}
      <path
        d="M8 20 Q32 10 56 20 Q32 30 8 20 Z"
        fill="var(--color-ink)"
        opacity="0.75"
      />
      {Array.from({ length: 9 }).map((_, i) => (
        <line
          key={i}
          x1={14 + i * 4.5}
          y1={20 - 4}
          x2={14 + i * 4.5}
          y2={20 + 4}
          stroke="var(--color-ivory-cowrie)"
          strokeWidth="0.75"
          opacity="0.6"
        />
      ))}
      {selected && (
        <motion.rect
          x="-20"
          y="0"
          width="16"
          height="40"
          fill="var(--color-gold-light)"
          opacity="0.5"
          initial={{ x: -20 }}
          animate={{ x: 68 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ mixBlendMode: "overlay" }}
        />
      )}
    </motion.svg>
  );
}
