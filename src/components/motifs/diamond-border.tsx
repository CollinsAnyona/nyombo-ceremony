"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * The Luo diamond-lozenge border pattern used as the section rule
 * throughout the site (brief Section 5) — a repeating row of gold
 * lozenges, restrained rather than decorative confetti.
 */
export function DiamondBorder({ className }: { className?: string }) {
  const patternId = `diamond-pattern-${useId()}`;

  return (
    <svg
      aria-hidden="true"
      className={cn("block w-full", className)}
      height="20"
      preserveAspectRatio="none"
      viewBox="0 0 400 20"
    >
      <defs>
        <pattern id={patternId} width="40" height="20" patternUnits="userSpaceOnUse">
          <path
            d="M20 2 L32 10 L20 18 L8 10 Z"
            fill="none"
            stroke="var(--color-gold)"
            strokeWidth="1.25"
            opacity="0.85"
          />
          <circle cx="20" cy="10" r="1.5" fill="var(--color-gold-light)" />
        </pattern>
      </defs>
      <rect width="400" height="20" fill={`url(#${patternId})`} />
    </svg>
  );
}
