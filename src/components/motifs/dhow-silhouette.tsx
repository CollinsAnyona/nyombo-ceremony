"use client";

import { useGoldGradientId, GoldGradientDefs } from "./gold-gradient";
import { cn } from "@/lib/utils";

/**
 * The dhow crossing the lake — lifted from the invitation's vocabulary and
 * used as the anchor of the site's signature scroll motion, "The Crossing"
 * (brief Section 5). Kept as one still silhouette component; motion is
 * applied by the caller via transform, never baked into the SVG itself.
 */
export function DhowSilhouette({ className }: { className?: string }) {
  const gradientId = useGoldGradientId();

  return (
    <svg
      aria-hidden="true"
      className={cn("h-auto", className)}
      viewBox="0 0 120 90"
      fill="none"
    >
      <GoldGradientDefs id={gradientId} />
      {/* hull */}
      <path
        d="M10 70 L110 70 L96 82 L24 82 Z"
        fill={`url(#${gradientId})`}
      />
      {/* mast */}
      <line x1="60" y1="70" x2="60" y2="10" stroke="var(--color-gold-deep)" strokeWidth="2" />
      {/* sail */}
      <path
        d="M60 12 L104 68 L60 68 Z"
        fill="var(--color-amber-sunset)"
        opacity="0.9"
      />
    </svg>
  );
}
