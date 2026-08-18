"use client";

import { motion, useScroll, useTransform, useMotionTemplate, useReducedMotion } from "framer-motion";
import { DhowSilhouette } from "@/components/motifs/dhow-silhouette";

/**
 * "The Crossing" — the site's signature scroll-linked progress indicator.
 *
 * A persistent horizon band fixed at the bottom of the viewport. The dhow
 * sails left→right as the user scrolls from the hero (departure) to the
 * RSVP section (arrival). The ambient sky shifts from golden hour → deep
 * amber → lamplit dusk.
 *
 * Under prefers-reduced-motion the dhow is a static mid-point marker.
 */
export function TheCrossing() {
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll();

  // Dhow travels 4% → 88% across the band
  const xNum = useTransform(scrollYProgress, [0, 1], [4, 88]);
  const xPos = useMotionTemplate`${xNum}%`;

  // Water shimmer opacity: brightest at golden hour, fades to dusk
  const waterOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0.55, 0.35, 0.18]);

  // Sky tint opacity layers — we layer two divs and cross-fade between them
  // rather than animating background-image (not interpolatable by browsers).
  const goldenOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const amberOpacity  = useTransform(scrollYProgress, [0.2, 0.55, 0.8], [0, 1, 0]);
  const duskOpacity   = useTransform(scrollYProgress, [0.6, 1], [0, 1]);

  if (reduced) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-0 left-0 right-0 z-40 h-16 overflow-hidden"
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #c9a22720 0%, #d98a2b38 60%, #150c07 100%)" }} />
        <div className="absolute inset-x-0 top-[38%] h-px bg-gold/40" />
        <div className="absolute top-[4px] -translate-x-1/2" style={{ left: "50%" }}>
          <DhowSilhouette className="w-10" />
        </div>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-0 left-0 right-0 z-40 h-16 overflow-hidden"
    >
      {/* Sky layers — cross-faded via opacity so background-image interpolation isn't needed */}
      <motion.div className="absolute inset-0" style={{ opacity: goldenOpacity, background: "linear-gradient(to bottom, #c9a22728 0%, #d98a2b40 60%, #150c07 100%)" }} />
      <motion.div className="absolute inset-0" style={{ opacity: amberOpacity,  background: "linear-gradient(to bottom, #d98a2b30 0%, #8a631840 60%, #150c07 100%)" }} />
      <motion.div className="absolute inset-0" style={{ opacity: duskOpacity,   background: "linear-gradient(to bottom, #14301c20 0%, #14301c38 60%, #150c07 100%)" }} />

      {/* Water shimmer line */}
      <motion.div
        className="absolute inset-x-0 top-[38%] h-px"
        style={{
          opacity: waterOpacity,
          background: "linear-gradient(to right, transparent 0%, var(--color-gold) 20%, var(--color-amber-sunset) 50%, var(--color-gold) 80%, transparent 100%)",
        }}
      />

      {/* Dhow sailing across */}
      <motion.div
        className="absolute top-[4px] -translate-x-1/2"
        style={{ left: xPos }}
      >
        <DhowSilhouette className="w-10" />
      </motion.div>
    </div>
  );
}
