"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";

/* Wax seal SVG — centred on the flap join line */
function WaxSeal() {
  return (
    <svg
      viewBox="0 0 80 80"
      className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-[0_4px_18px_rgba(201,162,39,0.55)]"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="wax" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#e8c87a" />
          <stop offset="45%" stopColor="#c9a227" />
          <stop offset="100%" stopColor="#6b4a0e" />
        </radialGradient>
      </defs>
      {/* Outer star burst */}
      <polygon
        points="40,2 47,28 74,20 55,40 74,60 47,52 40,78 33,52 6,60 25,40 6,20 33,28"
        fill="url(#wax)"
        opacity="0.9"
      />
      {/* Inner circle */}
      <circle cx="40" cy="40" r="18" fill="url(#wax)" />
      {/* Monogram N */}
      <text
        x="40" y="46"
        textAnchor="middle"
        fontFamily="serif"
        fontSize="18"
        fontWeight="bold"
        fill="#150c07"
        opacity="0.85"
      >
        N
      </text>
    </svg>
  );
}

/* Diagonal fold lines on the envelope face */
function FoldLines() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    >
      <line x1="0" y1="0" x2="50" y2="50" stroke="#c9a227" strokeWidth="0.3" strokeOpacity="0.18" />
      <line x1="100" y1="0" x2="50" y2="50" stroke="#c9a227" strokeWidth="0.3" strokeOpacity="0.18" />
      <line x1="0" y1="100" x2="50" y2="50" stroke="#c9a227" strokeWidth="0.3" strokeOpacity="0.18" />
      <line x1="100" y1="100" x2="50" y2="50" stroke="#c9a227" strokeWidth="0.3" strokeOpacity="0.18" />
    </svg>
  );
}

const EASE = [0.76, 0, 0.24, 1] as const;

export function EnvelopeReveal() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<"sealed" | "opening" | "gone">("sealed");

  /* Auto-open after a short pause so the user sees the sealed envelope */
  useEffect(() => {
    if (reduced) { setPhase("gone"); return; }
    const t1 = setTimeout(() => setPhase("opening"), 1200);
    return () => clearTimeout(t1);
  }, [reduced]);

  /* Once both halves have animated out, remove the overlay entirely */
  const onTopAnimComplete = () => {
    if (phase === "opening") setPhase("gone");
  };

  if (phase === "gone") return null;

  return (
    <AnimatePresence>
      <motion.div
        key="envelope"
        className="fixed inset-0 z-[9999] overflow-hidden pointer-events-none"
        exit={{ opacity: 0 }}
      >
          {/* ── Top flap — folds upward (rotateX from 0 → -90 then slides up) ── */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 origin-bottom"
            style={{ transformStyle: "preserve-3d", perspective: 1200 }}
            animate={
              phase === "opening"
                ? { rotateX: -90, y: "-8%" }
                : { rotateX: 0, y: "0%" }
            }
            transition={{ duration: 1.1, ease: EASE, delay: 0.05 }}
            onAnimationComplete={onTopAnimComplete}
          >
            <div className="absolute inset-0 bg-[#1a0e06] border-b border-gold/20">
              <FoldLines />
              {/* Top triangle flap shape */}
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full pointer-events-none"
                aria-hidden="true"
              >
                <polygon points="0,0 100,0 50,100" fill="#241610" opacity="0.6" />
              </svg>
              {/* Gold border along bottom edge */}
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
            </div>
          </motion.div>

          {/* ── Bottom half — slides down ── */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2"
            animate={phase === "opening" ? { y: "100%" } : { y: "0%" }}
            transition={{ duration: 1.05, ease: EASE, delay: 0.08 }}
          >
            <div className="absolute inset-0 bg-[#1a0e06] border-t border-gold/20">
              <FoldLines />
              {/* Bottom triangle flap shape */}
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full pointer-events-none"
                aria-hidden="true"
              >
                <polygon points="0,100 100,100 50,0" fill="#241610" opacity="0.6" />
              </svg>
              {/* Gold border along top edge */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
            </div>
          </motion.div>

          {/* ── Wax seal — sits on the join line, fades + scales out as it opens ── */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            animate={
              phase === "opening"
                ? { opacity: 0, scale: 1.4 }
                : { opacity: 1, scale: 1 }
            }
            transition={{ duration: 0.45, ease: "easeIn" }}
          >
            <WaxSeal />
          </motion.div>

          {/* ── "You are invited" label above the seal ── */}
          <motion.p
            className="absolute left-1/2 top-1/2 -translate-x-1/2 z-10 label-utility text-gold/70 tracking-[0.3em] whitespace-nowrap"
            style={{ marginTop: "-3.8rem" }}
            animate={phase === "opening" ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            You are cordially invited
          </motion.p>
        </motion.div>
    </AnimatePresence>
  );
}
