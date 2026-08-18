"use client";

import { useId } from "react";

/**
 * Gold treated as a material, not a color: every motif that renders gold
 * shares this two-stop-plus-shadow gradient (brief Section 5). useId keeps
 * the <linearGradient> id collision-free across repeated motif instances.
 */
export function useGoldGradientId() {
  const id = useId();
  return `gold-gradient-${id}`;
}

export function GoldGradientDefs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="var(--color-gold-light)" />
        <stop offset="55%" stopColor="var(--color-gold)" />
        <stop offset="100%" stopColor="var(--color-gold-deep)" />
      </linearGradient>
    </defs>
  );
}
