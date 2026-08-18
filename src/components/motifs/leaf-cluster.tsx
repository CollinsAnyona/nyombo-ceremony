"use client";

import { cn } from "@/lib/utils";

/** Banana leaf cluster — a single restrained accent, used once in the hero (brief self-critique: no layered parallax). */
export function LeafCluster({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={cn("h-auto", className)} viewBox="0 0 100 140" fill="none">
      <path
        d="M50 140 C50 100 20 90 10 50 C40 55 50 80 50 100 Z"
        fill="var(--color-green-royal)"
        stroke="var(--color-gold-deep)"
        strokeWidth="0.5"
      />
      <path
        d="M50 140 C50 95 80 85 90 45 C60 50 50 78 50 100 Z"
        fill="var(--color-green-royal)"
        stroke="var(--color-gold-deep)"
        strokeWidth="0.5"
        opacity="0.85"
      />
      <path d="M50 140 L50 60" stroke="var(--color-gold-deep)" strokeWidth="1" opacity="0.6" />
    </svg>
  );
}
