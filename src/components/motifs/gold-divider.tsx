"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

/** Tapered gold intra-section divider — a line that fades at both ends with a single lozenge at its center. */
export function GoldDivider({ className }: { className?: string }) {
  const gradientId = `divider-fade-${useId()}`;

  return (
    <svg
      aria-hidden="true"
      className={cn("block w-full max-w-xs mx-auto", className)}
      height="12"
      preserveAspectRatio="none"
      viewBox="0 0 240 12"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--color-gold)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="0" y1="6" x2="240" y2="6" stroke={`url(#${gradientId})`} strokeWidth="1" />
      <path d="M120 2 L126 6 L120 10 L114 6 Z" fill="var(--color-gold-light)" />
    </svg>
  );
}
