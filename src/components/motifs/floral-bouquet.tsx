"use client";

import { useGoldGradientId, GoldGradientDefs } from "./gold-gradient";
import { cn } from "@/lib/utils";

/** A fuller bloom: two staggered petal rings so it reads as an open rose rather than a flat rosette. */
function Bloom({ gradientId, cx, cy, scale = 1, rotate = 0 }: { gradientId: string; cx: number; cy: number; scale?: number; rotate?: number }) {
  const outer = "M0,0 C-6,-4 -6,-12 0,-16 C6,-12 6,-4 0,0 Z";
  const inner = "M0,0 C-3.5,-2.5 -3.5,-7.5 0,-10 C3.5,-7.5 3.5,-2.5 0,0 Z";

  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rotate}) scale(${scale})`}>
      {[0, 72, 144, 216, 288].map((angle) => (
        <path
          key={`o-${angle}`}
          d={outer}
          transform={`rotate(${angle})`}
          fill="var(--color-ink)"
          stroke={`url(#${gradientId})`}
          strokeWidth="0.9"
        />
      ))}
      {[36, 108, 180, 252, 324].map((angle) => (
        <path
          key={`i-${angle}`}
          d={inner}
          transform={`rotate(${angle})`}
          fill="var(--color-ink)"
          stroke="var(--color-gold-light)"
          strokeWidth="0.8"
        />
      ))}
      <circle r="1.8" fill="var(--color-gold-light)" />
    </g>
  );
}

/** A small five-point filler blossom, scattered between the roses like baby's-breath filler. */
function Blossom({ gradientId, cx, cy, scale = 1 }: { gradientId: string; cx: number; cy: number; scale?: number }) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${scale})`}>
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse
          key={angle}
          cx="0"
          cy="-3"
          rx="1.4"
          ry="2.6"
          transform={`rotate(${angle})`}
          fill="var(--color-ink)"
          stroke={`url(#${gradientId})`}
          strokeWidth="0.6"
        />
      ))}
      <circle r="0.9" fill="var(--color-gold-light)" />
    </g>
  );
}

/**
 * A dense, asymmetric gold-line floral bouquet — bigger blooms overlapping a
 * corner, trailing leaf fronds and tendrils, small filler blossoms between
 * them. Meant to spill past its own corner (position it half off the card
 * edge) the way a hand-tied bouquet sits on a printed invitation, rather
 * than sitting neatly inside a bounding box like a badge icon.
 */
export function FloralBouquet({ className }: { className?: string }) {
  const gradientId = useGoldGradientId();

  return (
    <svg aria-hidden="true" className={cn("h-auto", className)} viewBox="0 0 200 200" fill="none">
      <GoldGradientDefs id={gradientId} />

      {/* leaf fronds, layered behind the blooms, fanning out in several directions */}
      <path d="M8 192 C20 140 34 108 70 84 C48 118 42 152 46 188 Z" fill="var(--color-green-royal)" stroke="var(--color-gold-deep)" strokeWidth="0.7" opacity="0.92" />
      <path d="M8 192 C30 154 60 132 104 118 C68 130 44 150 30 182 Z" fill="var(--color-green-royal)" stroke="var(--color-gold-deep)" strokeWidth="0.7" opacity="0.8" />
      <path d="M8 192 C44 176 66 146 74 104 C58 138 40 160 8 176 Z" fill="var(--color-green-royal)" stroke="var(--color-gold-deep)" strokeWidth="0.7" opacity="0.7" />
      <path d="M6 150 C 40 152 66 168 82 192" stroke="var(--color-gold-deep)" strokeWidth="0.6" opacity="0.5" />

      {/* tendrils */}
      <path d="M20 178 C46 168 58 150 60 122" stroke={`url(#${gradientId})`} strokeWidth="1" opacity="0.55" />
      <path d="M40 190 C62 176 78 154 84 128" stroke={`url(#${gradientId})`} strokeWidth="1" opacity="0.65" />

      {/* blooms, largest nearest the corner, tapering smaller as the spray trails inward */}
      <Bloom gradientId={gradientId} cx={38} cy={168} scale={1.6} rotate={-12} />
      <Bloom gradientId={gradientId} cx={74} cy={140} scale={1.15} rotate={18} />
      <Bloom gradientId={gradientId} cx={30} cy={122} scale={0.85} rotate={-30} />
      <Bloom gradientId={gradientId} cx={100} cy={104} scale={0.6} rotate={8} />

      {/* filler blossoms scattered between and around the blooms */}
      <Blossom gradientId={gradientId} cx={58} cy={182} scale={1.1} />
      <Blossom gradientId={gradientId} cx={16} cy={148} scale={0.9} />
      <Blossom gradientId={gradientId} cx={92} cy={132} scale={0.8} />
      <Blossom gradientId={gradientId} cx={54} cy={108} scale={0.7} />
      <Blossom gradientId={gradientId} cx={116} cy={86} scale={0.6} />
    </svg>
  );
}
