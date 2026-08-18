"use client";

import { useGoldGradientId, GoldGradientDefs } from "./gold-gradient";
import { cn } from "@/lib/utils";

export function Crown({ className }: { className?: string }) {
  const g = useGoldGradientId();
  const g2 = `${g}-b`;
  const g3 = `${g}-jewel`;

  return (
    <svg
      aria-hidden="true"
      className={cn("h-auto", className)}
      viewBox="0 0 120 80"
      fill="none"
    >
      <defs>
        <GoldGradientDefs id={g} />

        {/* Slightly lighter gradient for the band */}
        <linearGradient id={g2} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f5dfa0" />
          <stop offset="50%" stopColor="#c9a227" />
          <stop offset="100%" stopColor="#7a5010" />
        </linearGradient>

        {/* Jewel radial */}
        <radialGradient id={g3} cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#fff8e7" />
          <stop offset="45%" stopColor="#c9a227" />
          <stop offset="100%" stopColor="#4e2e06" />
        </radialGradient>
      </defs>

      {/* ── Base band ── */}
      <rect x="8" y="56" width="104" height="16" rx="2" fill={`url(#${g2})`} />
      {/* Cross-hatch engraving on band */}
      {[16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104].map((x) => (
        <line key={x} x1={x} y1="56" x2={x} y2="72" stroke="#150c07" strokeWidth="0.5" strokeOpacity="0.25" />
      ))}
      {/* Horizontal mid-line on band */}
      <line x1="8" y1="64" x2="112" y2="64" stroke="#150c07" strokeWidth="0.4" strokeOpacity="0.2" />
      {/* Band top & bottom highlight */}
      <line x1="8" y1="57" x2="112" y2="57" stroke="#f5dfa0" strokeWidth="0.6" strokeOpacity="0.4" />
      <line x1="8" y1="71" x2="112" y2="71" stroke="#7a5010" strokeWidth="0.6" strokeOpacity="0.4" />

      {/* ── Crown body — arched silhouette ── */}
      {/* Main filled shape */}
      <path
        d="
          M8 58
          L8 38
          C8 38 18 44 24 36
          C28 30 30 18 36 12
          C38 9 40 8 42 9
          L60 28
          L78 9
          C80 8 82 9 84 12
          C90 18 92 30 96 36
          C102 44 112 38 112 38
          L112 58
          Z
        "
        fill={`url(#${g})`}
      />

      {/* Inner shadow / depth on body */}
      <path
        d="
          M12 58 L12 40
          C12 40 20 45 26 38
          C30 32 32 20 38 14
          L60 32
          L82 14
          C88 20 90 32 94 38
          C100 45 108 40 108 40
          L108 58
          Z
        "
        fill="none"
        stroke="#f5dfa0"
        strokeWidth="0.5"
        strokeOpacity="0.2"
      />

      {/* ── Centre spire fleur-de-lis tip ── */}
      {/* Stem */}
      <line x1="60" y1="8" x2="60" y2="16" stroke={`url(#${g2})`} strokeWidth="2" />
      {/* Left petal */}
      <path d="M60 10 C55 8 52 4 55 2 C57 1 59 4 60 8" fill={`url(#${g3})`} />
      {/* Right petal */}
      <path d="M60 10 C65 8 68 4 65 2 C63 1 61 4 60 8" fill={`url(#${g3})`} />
      {/* Centre bud */}
      <ellipse cx="60" cy="3" rx="2" ry="2.5" fill={`url(#${g3})`} />

      {/* ── Left spire fleur-de-lis tip ── */}
      <line x1="36" y1="12" x2="36" y2="19" stroke={`url(#${g2})`} strokeWidth="1.5" />
      <path d="M36 13 C32 11 30 8 32 6 C34 5 35 8 36 12" fill={`url(#${g3})`} />
      <path d="M36 13 C40 11 42 8 40 6 C38 5 37 8 36 12" fill={`url(#${g3})`} />
      <ellipse cx="36" cy="6" rx="1.6" ry="2" fill={`url(#${g3})`} />

      {/* ── Right spire fleur-de-lis tip ── */}
      <line x1="84" y1="12" x2="84" y2="19" stroke={`url(#${g2})`} strokeWidth="1.5" />
      <path d="M84 13 C80 11 78 8 80 6 C82 5 83 8 84 12" fill={`url(#${g3})`} />
      <path d="M84 13 C88 11 90 8 88 6 C86 5 85 8 84 12" fill={`url(#${g3})`} />
      <ellipse cx="84" cy="6" rx="1.6" ry="2" fill={`url(#${g3})`} />

      {/* ── Jewel cabochons on band ── */}
      {/* Centre jewel */}
      <ellipse cx="60" cy="64" rx="6" ry="5" fill={`url(#${g3})`} />
      <ellipse cx="60" cy="64" rx="6" ry="5" stroke="#c9a227" strokeWidth="0.8" fill="none" />
      {/* Left jewel */}
      <ellipse cx="32" cy="64" rx="4.5" ry="3.8" fill={`url(#${g3})`} />
      <ellipse cx="32" cy="64" rx="4.5" ry="3.8" stroke="#c9a227" strokeWidth="0.6" fill="none" />
      {/* Right jewel */}
      <ellipse cx="88" cy="64" rx="4.5" ry="3.8" fill={`url(#${g3})`} />
      <ellipse cx="88" cy="64" rx="4.5" ry="3.8" stroke="#c9a227" strokeWidth="0.6" fill="none" />

      {/* ── Arch decorative dots on body ── */}
      <circle cx="60" cy="30" r="2.2" fill={`url(#${g3})`} />
      <circle cx="42" cy="22" r="1.6" fill={`url(#${g3})`} />
      <circle cx="78" cy="22" r="1.6" fill={`url(#${g3})`} />

      {/* ── Outline stroke over everything for crispness ── */}
      <path
        d="
          M8 58 L8 38
          C8 38 18 44 24 36
          C28 30 30 18 36 12
          C38 9 40 8 42 9
          L60 28 L78 9
          C80 8 82 9 84 12
          C90 18 92 30 96 36
          C102 44 112 38 112 38
          L112 58
        "
        fill="none"
        stroke="var(--color-gold-deep)"
        strokeWidth="0.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}
