"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";

const EASE = [0.76, 0, 0.24, 1] as const;

function WaxSeal({ onClick, opening }: { onClick: () => void; opening: boolean }) {
  return (
    <motion.button
      onClick={onClick}
      aria-label="Open invitation"
      className="group relative flex flex-col items-center gap-2 cursor-pointer focus:outline-none"
      animate={opening ? { opacity: 0, scale: 1.5, y: -10 } : { opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeIn" }}
    >
      {/* Pulse ring */}
      {!opening && (
        <motion.span
          className="absolute inset-0 rounded-full border border-gold/40"
          animate={{ scale: [1, 1.55], opacity: [0.5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
        />
      )}

      <svg viewBox="0 0 90 90" className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-[0_4px_22px_rgba(201,162,39,0.6)]" aria-hidden="true">
        <defs>
          <radialGradient id="wax-g" cx="38%" cy="32%" r="62%">
            <stop offset="0%" stopColor="#f5dfa0" />
            <stop offset="40%" stopColor="#c9a227" />
            <stop offset="100%" stopColor="#5c3a08" />
          </radialGradient>
        </defs>
        {/* Star burst */}
        <polygon
          points="45,3 52,30 80,22 61,44 80,66 52,58 45,85 38,58 10,66 29,44 10,22 38,30"
          fill="url(#wax-g)"
        />
        <circle cx="45" cy="44" r="20" fill="url(#wax-g)" />
        {/* N monogram */}
        <text x="45" y="51" textAnchor="middle" fontFamily="Georgia, serif" fontSize="20" fontWeight="bold" fill="#150c07" opacity="0.9">N</text>
      </svg>

      {/* "Open" label */}
      <motion.span
        className="label-utility text-gold/80 tracking-[0.25em] text-xs"
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        Open
      </motion.span>
    </motion.button>
  );
}

/* Diagonal fold lines */
function FoldLines({ flip }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
      <line x1="0" y1={flip ? "100" : "0"} x2="50" y2="50" stroke="#c9a227" strokeWidth="0.4" strokeOpacity="0.15" />
      <line x1="100" y1={flip ? "100" : "0"} x2="50" y2="50" stroke="#c9a227" strokeWidth="0.4" strokeOpacity="0.15" />
    </svg>
  );
}

export function EnvelopeReveal() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<"sealed" | "opening" | "gone">("sealed");

  useEffect(() => {
    if (reduced) setPhase("gone");
  }, [reduced]);

  if (phase === "gone") return null;

  const opening = phase === "opening";

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-ink"
      animate={opening ? { opacity: 0 } : { opacity: 1 }}
      transition={opening ? { duration: 0.55, delay: 1.0, ease: "easeIn" } : undefined}
      onAnimationComplete={() => { if (opening) setPhase("gone"); }}
    >
      {/* ── Envelope body ── */}
      <motion.div
        className="relative mx-4 w-full max-w-lg"
        style={{ aspectRatio: "1.618 / 1" }}
        animate={opening ? { scale: 1.04 } : { scale: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {/* Envelope back / body */}
        <div className="absolute inset-0 rounded-sm bg-[#1e1108] shadow-[0_8px_60px_rgba(0,0,0,0.8)] border border-gold/15" />

        {/* Bottom flap triangle */}
        <div className="absolute inset-0 overflow-hidden rounded-sm">
          <svg viewBox="0 0 100 62" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" aria-hidden="true">
            {/* Bottom V */}
            <polygon points="0,62 50,34 100,62" fill="#17100a" />
            {/* Left triangle */}
            <polygon points="0,0 0,62 50,34" fill="#1a1209" />
            {/* Right triangle */}
            <polygon points="100,0 100,62 50,34" fill="#1a1209" />
            {/* Fold line borders */}
            <line x1="0" y1="0" x2="50" y2="34" stroke="#c9a227" strokeWidth="0.3" strokeOpacity="0.2" />
            <line x1="100" y1="0" x2="50" y2="34" stroke="#c9a227" strokeWidth="0.3" strokeOpacity="0.2" />
            <line x1="0" y1="62" x2="50" y2="34" stroke="#c9a227" strokeWidth="0.3" strokeOpacity="0.2" />
            <line x1="100" y1="62" x2="50" y2="34" stroke="#c9a227" strokeWidth="0.3" strokeOpacity="0.2" />
          </svg>
        </div>

        {/* ── Top flap — folds back on open ── */}
        <motion.div
          className="absolute inset-x-0 top-0 overflow-hidden rounded-t-sm"
          style={{
            height: "50%",
            transformOrigin: "top center",
            transformStyle: "preserve-3d",
          }}
          animate={opening ? { rotateX: -155 } : { rotateX: 0 }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.05 }}
        >
          <div className="absolute inset-0 bg-[#1e1108]">
            <svg viewBox="0 0 100 62" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" aria-hidden="true">
              {/* Top flap triangle pointing down */}
              <polygon points="0,0 100,0 50,100" fill="#241610" />
              <line x1="0" y1="0" x2="50" y2="100" stroke="#c9a227" strokeWidth="0.4" strokeOpacity="0.18" />
              <line x1="100" y1="0" x2="50" y2="100" stroke="#c9a227" strokeWidth="0.4" strokeOpacity="0.18" />
            </svg>
            {/* Gold border at flap bottom */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          </div>
        </motion.div>

        {/* ── Letter face content ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-8 pb-6 pt-4 text-center">

          {/* Top decorative rule */}
          <div className="flex w-full items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/35" />
            <svg viewBox="0 0 10 10" className="w-2 h-2 shrink-0" aria-hidden="true">
              <path d="M5 0 L10 5 L5 10 L0 5 Z" fill="var(--color-gold)" opacity="0.6" />
            </svg>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/35" />
          </div>

          {/* "Together with their families" */}
          <p className="label-utility text-gold/55 tracking-[0.2em] text-[0.6rem] sm:text-[0.7rem] mb-3">
            Together with their families
          </p>

          {/* Main invitation text */}
          <p
            className="font-body text-parchment/80 leading-relaxed"
            style={{ fontSize: "clamp(0.7rem, 2vw, 0.95rem)" }}
          >
            The families of
          </p>
          <p
            className="font-script text-gold-light mt-1"
            style={{ fontSize: "clamp(1.4rem, 4.5vw, 2.2rem)", lineHeight: 1.2 }}
          >
            Samantha &amp; Michael
          </p>
          <p
            className="font-body text-parchment/70 mt-2 leading-relaxed max-w-xs"
            style={{ fontSize: "clamp(0.65rem, 1.8vw, 0.88rem)" }}
          >
            cordially invite you to witness and celebrate<br />
            their Nyombo ceremony
          </p>

          {/* Date line */}
          <p
            className="mt-3 label-utility text-gold/60 tracking-[0.15em]"
            style={{ fontSize: "clamp(0.55rem, 1.5vw, 0.72rem)" }}
          >
            Monday · 21st December 2026 · Villa del Sol, Kisumu
          </p>

          {/* Bottom rule */}
          <div className="flex w-full items-center gap-3 mt-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/35" />
            <svg viewBox="0 0 10 10" className="w-2 h-2 shrink-0" aria-hidden="true">
              <path d="M5 0 L10 5 L5 10 L0 5 Z" fill="var(--color-gold)" opacity="0.6" />
            </svg>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/35" />
          </div>
        </div>

        {/* ── Wax seal centred on the flap join ── */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <WaxSeal onClick={() => setPhase("opening")} opening={opening} />
        </div>
      </motion.div>
    </motion.div>
  );
}
