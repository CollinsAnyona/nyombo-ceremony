"use client";

import { useGoldGradientId, GoldGradientDefs } from "./gold-gradient";
import { cn } from "@/lib/utils";

/** Ceremonial crown mark used above the hero title — restrained, one weight. */
export function Crown({ className }: { className?: string }) {
  const gradientId = useGoldGradientId();

  return (
    <svg
      aria-hidden="true"
      className={cn("h-auto", className)}
      viewBox="0 0 64 40"
      fill="none"
    >
      <GoldGradientDefs id={gradientId} />
      <path
        d="M6 34 L6 16 L16 24 L32 8 L48 24 L58 16 L58 34 Z"
        fill={`url(#${gradientId})`}
        stroke="var(--color-gold-deep)"
        strokeWidth="0.5"
      />
      <circle cx="6" cy="14" r="3" fill="var(--color-gold-light)" />
      <circle cx="32" cy="6" r="3.5" fill="var(--color-gold-light)" />
      <circle cx="58" cy="14" r="3" fill="var(--color-gold-light)" />
      <rect x="4" y="34" width="56" height="4" rx="1" fill={`url(#${gradientId})`} />
    </svg>
  );
}
