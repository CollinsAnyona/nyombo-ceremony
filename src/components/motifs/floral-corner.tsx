"use client";

import { useGoldGradientId, GoldGradientDefs } from "./gold-gradient";
import { cn } from "@/lib/utils";

/** One five-petal gold-line rose, built from petal outlines rather than rings so it reads as a bloom at small sizes. */
function Rose({ gradientId, cx, cy, scale = 1 }: { gradientId: string; cx: number; cy: number; scale?: number }) {
  const petal = "M0,0 C-4.5,-3 -4.5,-9 0,-12 C4.5,-9 4.5,-3 0,0 Z";

  return (
    <g transform={`translate(${cx} ${cy}) scale(${scale})`}>
      {[0, 72, 144, 216, 288].map((angle) => (
        <path
          key={angle}
          d={petal}
          transform={`rotate(${angle})`}
          fill="var(--color-ink)"
          stroke={`url(#${gradientId})`}
          strokeWidth="1"
        />
      ))}
      <circle r="2" fill="var(--color-gold-light)" />
    </g>
  );
}

/**
 * Gold-line rose spray with banana-leaf fronds — the floral ornament the
 * printed invitation uses to frame the couple's portrait. Pairs with
 * LeafCluster's green but bloom-led, for use as a corner flourish rather
 * than a single background accent.
 */
export function FloralCorner({ className }: { className?: string }) {
  const gradientId = useGoldGradientId();

  return (
    <svg
      aria-hidden="true"
      className={cn("h-auto", className)}
      viewBox="0 0 120 120"
      fill="none"
    >
      <GoldGradientDefs id={gradientId} />

      {/* leaf fronds, behind the blooms */}
      <path
        d="M6 6 C32 10 48 26 52 52 C36 42 20 36 6 36 Z"
        fill="var(--color-green-royal)"
        stroke="var(--color-gold-deep)"
        strokeWidth="0.6"
        opacity="0.9"
      />
      <path
        d="M6 6 C12 28 24 42 42 50 C30 36 24 20 24 6 Z"
        fill="var(--color-green-royal)"
        stroke="var(--color-gold-deep)"
        strokeWidth="0.6"
        opacity="0.75"
      />

      {/* trailing stem */}
      <path
        d="M10 10 C26 22 36 34 42 54"
        stroke={`url(#${gradientId})`}
        strokeWidth="1"
        opacity="0.7"
      />

      <Rose gradientId={gradientId} cx={26} cy={26} scale={1.15} />
      <Rose gradientId={gradientId} cx={48} cy={16} scale={0.75} />
      <Rose gradientId={gradientId} cx={14} cy={50} scale={0.6} />

      {/* small buds along the stem */}
      <circle cx="32" cy="38" r="2.2" fill="var(--color-gold)" opacity="0.9" />
      <circle cx="38" cy="46" r="1.6" fill="var(--color-gold-light)" opacity="0.85" />
    </svg>
  );
}
