"use client";

import { useGoldGradientId, GoldGradientDefs } from "./gold-gradient";
import { cn } from "@/lib/utils";

/**
 * A circular laurel-and-blossom wreath, open at the bottom, to ring an
 * emblem (the crown) the way a "Save the Date" badge wreathes its date —
 * a signature mark rather than a border repeated everywhere.
 */
export function GoldWreath({ className }: { className?: string }) {
  const gradientId = useGoldGradientId();
  const leafPositions = [-150, -130, -110, -90, -70, -50, -30, 210, 190, 170, 150, 130, 110, 90, 70, 50, 30];

  return (
    <svg aria-hidden="true" className={cn("h-auto", className)} viewBox="0 0 200 200" fill="none">
      <GoldGradientDefs id={gradientId} />
      <circle cx="100" cy="100" r="86" fill="none" stroke={`url(#${gradientId})`} strokeWidth="1" opacity="0.5" strokeDasharray="1 5" />

      {leafPositions.map((angle) => (
        <g key={angle} transform={`rotate(${angle} 100 100)`}>
          <path
            d="M100 14 C104 22 104 30 100 36 C96 30 96 22 100 14 Z"
            fill="var(--color-green-royal)"
            stroke="var(--color-gold-deep)"
            strokeWidth="0.5"
          />
        </g>
      ))}

      {/* small blossoms marking the two open ends */}
      <g transform="translate(24 155)">
        <circle r="3.5" fill="none" stroke={`url(#${gradientId})`} strokeWidth="1" />
        <circle r="1.4" fill="var(--color-gold-light)" />
      </g>
      <g transform="translate(176 155)">
        <circle r="3.5" fill="none" stroke={`url(#${gradientId})`} strokeWidth="1" />
        <circle r="1.4" fill="var(--color-gold-light)" />
      </g>
    </svg>
  );
}
