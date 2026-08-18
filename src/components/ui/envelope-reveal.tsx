"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRevealed } from "@/lib/reveal-context";

const SILK = [0.76, 0, 0.24, 1] as const;

/* ── Wax seal ── */
function WaxSeal({ onClick, breaking }: { onClick: () => void; breaking: boolean }) {
  return (
    <motion.button
      onClick={onClick}
      aria-label="Open invitation"
      className="relative flex flex-col items-center gap-3 focus:outline-none cursor-pointer"
      animate={breaking ? { scale: 1.35, opacity: 0 } : { scale: 1, opacity: 1 }}
      transition={{ duration: 0.38, ease: "easeIn" }}
    >
      {/* Breathing pulse ring */}
      {!breaking && (
        <motion.span
          className="absolute rounded-full border border-gold/30"
          style={{ inset: "-10px" }}
          animate={{ scale: [1, 1.5], opacity: [0.4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
      )}

      {/* Open hint — above the star */}
      <motion.span
        className="label-utility text-gold/65 tracking-[0.3em]"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        Open
      </motion.span>

      {/* Star seal — below "Open" */}
      <svg viewBox="0 0 90 90" className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-[0_0_18px_rgba(201,162,39,0.65)]" aria-hidden="true">
        <defs>
          <radialGradient id="wax-g" cx="38%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#f7e8b0" />
            <stop offset="38%" stopColor="#c9a227" />
            <stop offset="100%" stopColor="#4e2e06" />
          </radialGradient>
        </defs>
        <polygon points="45,2 52,29 80,20 61,43 80,66 52,57 45,84 38,57 10,66 29,43 10,20 38,29" fill="url(#wax-g)" />
        <circle cx="45" cy="43" r="19" fill="url(#wax-g)" />
        <text x="45" y="50" textAnchor="middle" fontFamily="Georgia,serif" fontSize="19" fontWeight="bold" fill="#150c07" opacity="0.88">N</text>
      </svg>
    </motion.button>
  );
}

/* ── Envelope SVG panels ── */
function EnvelopeBody() {
  return (
    <svg viewBox="0 0 160 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none" aria-hidden="true">
      {/* Left panel */}
      <polygon points="0,0 0,100 80,50" fill="#1c1108" />
      {/* Right panel */}
      <polygon points="160,0 160,100 80,50" fill="#1c1108" />
      {/* Bottom panel */}
      <polygon points="0,100 160,100 80,50" fill="#17100a" />
      {/* Fold lines */}
      <line x1="0" y1="0" x2="80" y2="50" stroke="#c9a227" strokeWidth="0.35" strokeOpacity="0.18" />
      <line x1="160" y1="0" x2="80" y2="50" stroke="#c9a227" strokeWidth="0.35" strokeOpacity="0.18" />
      <line x1="0" y1="100" x2="80" y2="50" stroke="#c9a227" strokeWidth="0.35" strokeOpacity="0.18" />
      <line x1="160" y1="100" x2="80" y2="50" stroke="#c9a227" strokeWidth="0.35" strokeOpacity="0.18" />
    </svg>
  );
}

type Phase = "sealed" | "breaking" | "opening" | "gone";

export function EnvelopeReveal() {
  const reduced = useReducedMotion();
  const { reveal } = useRevealed();
  const [phase, setPhase] = useState<Phase>("sealed");

  useEffect(() => {
    if (reduced) { reveal(); setPhase("gone"); }
  }, [reduced, reveal]);

  if (phase === "gone") return null;

  const breaking = phase === "breaking" || phase === "opening";
  const opening  = phase === "opening";

  function handleOpen() {
    if (phase !== "sealed") return;
    setPhase("breaking");
    // After seal crack, start flap
    setTimeout(() => setPhase("opening"), 420);
  }

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "#150c07" }}
      /* Whole screen dissolves into the ink background — seamless */
      animate={opening ? { opacity: 0 } : { opacity: 1 }}
      transition={opening ? { duration: 0.9, delay: 0.85, ease: "easeInOut" } : undefined}
      onAnimationComplete={() => { if (opening) { reveal(); setPhase("gone"); } }}
    >
      {/* Envelope card */}
      <motion.div
        className="relative mx-6 w-full max-w-md shadow-[0_16px_80px_rgba(0,0,0,0.85)]"
        style={{ aspectRatio: "1.6 / 1" }}
        animate={opening ? { scale: 1.06, y: -12 } : { scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: SILK }}
      >
        {/* Envelope body panels */}
        <EnvelopeBody />

        {/* Gold border */}
        <div className="absolute inset-0 border border-gold/12 pointer-events-none" />

        {/* ── Top flap ── */}
        <motion.div
          className="absolute inset-x-0 top-0 overflow-visible"
          style={{ height: "52%", transformOrigin: "top center", transformStyle: "preserve-3d" }}
          animate={opening ? { rotateX: -162 } : { rotateX: 0 }}
          transition={{ duration: 0.82, ease: SILK, delay: 0.04 }}
        >
          <svg viewBox="0 0 160 52" className="absolute inset-0 w-full h-full" preserveAspectRatio="none" aria-hidden="true">
            <polygon points="0,0 160,0 80,100" fill="#241812" />
            <line x1="0" y1="0" x2="80" y2="100" stroke="#c9a227" strokeWidth="0.4" strokeOpacity="0.2" />
            <line x1="160" y1="0" x2="80" y2="100" stroke="#c9a227" strokeWidth="0.4" strokeOpacity="0.2" />
          </svg>
          {/* Flap bottom edge gold line */}
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
        </motion.div>

        {/* ── Invitation text — upper third of envelope ── */}
        <div className="absolute inset-x-0 top-0 flex flex-col items-center justify-center gap-2 pointer-events-none select-none" style={{ height: "52%" }}>
          <p
            className="font-body italic text-parchment/80 tracking-wide"
            style={{ fontSize: "clamp(0.65rem, 1.8vw, 0.85rem)" }}
          >
            The families of Samantha &amp; Michael
          </p>
          <p
            className="font-script text-gold-light"
            style={{ fontSize: "clamp(1.2rem, 3.8vw, 1.8rem)", lineHeight: 1.3 }}
          >
            cordially invite you
          </p>
        </div>

        {/* ── Wax seal anchored to bottom half, clear of text ── */}
        <div className="absolute left-1/2 bottom-[12%] -translate-x-1/2 z-20">
          <WaxSeal onClick={handleOpen} breaking={breaking} />
        </div>
      </motion.div>
    </motion.div>
  );
}
