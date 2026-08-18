"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Crown } from "@/components/motifs/crown";
import { FloralCorner } from "@/components/motifs/floral-corner";
import { DhowSilhouette } from "@/components/motifs/dhow-silhouette";
import { SparkleField } from "@/components/motifs/sparkle-field";
import { ButtonLink } from "@/components/ui/button";
import { ceremonyContent } from "@/content/ceremony";
import { siteConfig } from "@/lib/site-config";
import { directionsUrl } from "@/lib/maps";

const EASE = [0.22, 1, 0.36, 1] as const;

function fadeUp(reduced: boolean | null, delay: number, y = 30) {
  if (reduced) return { initial: { opacity: 1 }, animate: { opacity: 1 } };
  return {
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay, ease: EASE },
  };
}

function fadeIn(reduced: boolean | null, delay: number) {
  if (reduced) return { initial: { opacity: 1 }, animate: { opacity: 1 } };
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 1.2, delay, ease: EASE },
  };
}

export function Hero() {
  const { hero } = ceremonyContent;
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoScale  = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const photoY      = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const titleLeftX  = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  const titleRightX = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);
  const overlayO    = useTransform(scrollYProgress, [0, 0.7], [1, 0.4]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-svh overflow-hidden bg-ink"
      aria-label="Hero — Homa-Bay meets Siaya"
    >
      {/* ── Layer 1: Full-bleed photo with parallax ── */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={reduced ? undefined : { scale: photoScale, y: photoY }}
      >
        <Image
          src="/images/couple-portrait.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* ── Layer 2: Multi-layer ink overlay ── */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={reduced ? undefined : { opacity: overlayO }}
      >
        {/* Heavy vignette — keeps edges very dark so title text pops */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_45%,rgba(21,12,7,0.25)_0%,rgba(21,12,7,0.75)_60%,rgba(21,12,7,0.97)_100%)]" />
        {/* Bottom-up ink flood — lake transition */}
        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-ink via-ink/95 to-transparent" />
        {/* Top-down ink — crown breathing room */}
        <div className="absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-ink/90 to-transparent" />
        {/* Left and right edge darkening — so split title is always legible */}
        <div className="absolute inset-y-0 left-0 w-[28%] bg-gradient-to-r from-ink/95 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-[28%] bg-gradient-to-l from-ink/95 to-transparent" />
      </motion.div>

      {/* ── Layer 3: Sparkle field ── */}
      <SparkleField className="pointer-events-none absolute inset-0 z-10" />

      {/* ── Layer 4: Floral corners ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
        <FloralCorner className="absolute -left-3 -top-3 w-32 opacity-60 sm:w-40" />
        <FloralCorner className="absolute -right-3 -top-3 w-32 -scale-x-100 opacity-60 sm:w-40" />
      </div>

      {/* ── Layer 5: The split title — HOMA-BAY on left, SIAYA on right ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 flex items-center justify-between px-2 sm:px-4"
      >
        <motion.span
          className="font-display font-semibold uppercase text-gold-engraved drop-shadow-[2px_2px_0_rgba(21,12,7,0.9)] select-none"
          style={{
            fontSize: "clamp(2.4rem, 9.5vw, 7.5rem)",
            letterSpacing: "0.06em",
            lineHeight: 1,
            writingMode: "horizontal-tb",
            ...(reduced ? {} : { x: titleLeftX } as object),
          }}
          {...fadeIn(reduced, 0.6)}
        >
          {hero.titleTop}
        </motion.span>

        <motion.span
          className="font-display font-semibold uppercase text-gold-engraved drop-shadow-[2px_2px_0_rgba(21,12,7,0.9)] select-none text-right"
          style={{
            fontSize: "clamp(2.4rem, 9.5vw, 7.5rem)",
            letterSpacing: "0.06em",
            lineHeight: 1,
            ...(reduced ? {} : { x: titleRightX } as object),
          }}
          {...fadeIn(reduced, 0.6)}
        >
          {hero.titleBottom}
        </motion.span>
      </div>

      {/* ── Layer 6: Centre content column ── */}
      <div className="relative z-30 flex min-h-svh flex-col items-center justify-between px-4 pb-0 pt-10 sm:pt-14">

        {/* Top: Crown seal */}
        <motion.div className="flex flex-col items-center gap-3" {...fadeUp(reduced, 0)}>
          <div className="relative">
            {/* Glow ring behind crown */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgba(201,162,39,0.3),transparent)] scale-150" />
            <Crown className="relative w-16 drop-shadow-[0_0_20px_rgba(201,162,39,0.7)] sm:w-20" />
          </div>
          <p className="label-utility rounded-full border border-gold/30 bg-ink/70 px-5 py-1.5 backdrop-blur-sm tracking-[0.22em]">
            {hero.crownLabel}
          </p>
        </motion.div>

        {/* Centre: "meets" script + couple names + date triad + CTAs */}
        <div className="flex flex-col items-center gap-5 text-center">

          {/* "meets" — the bridge between the two shore titles */}
          <motion.div className="flex flex-col items-center gap-1" {...fadeUp(reduced, 0.4)}>
            {/* Flanking rules */}
            <div className="flex items-center gap-4 w-full">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/60 to-gold/60" />
              <span className="font-script text-parchment/60" style={{ fontSize: "clamp(1.4rem, 5vw, 2.4rem)" }}>
                {hero.titleJoiner}
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gold/60 to-gold/60" />
            </div>
          </motion.div>

          {/* Couple names */}
          <motion.p
            className="font-script text-gold-light leading-none"
            style={{ fontSize: "clamp(2.2rem, 8vw, 4rem)" }}
            {...fadeUp(reduced, 0.55)}
          >
            {hero.coupleNames}
          </motion.p>

          {/* Scripture */}
          <motion.p
            className="text-body italic text-parchment/55 max-w-xs"
            {...fadeUp(reduced, 0.65)}
          >
            &ldquo;{siteConfig.scripture.english}&rdquo;
            <span className="not-italic text-parchment/35"> — {siteConfig.scripture.reference}</span>
          </motion.p>

          {/* Gold rule */}
          <motion.div className="w-32 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" {...fadeIn(reduced, 0.72)} />

          {/* Date · Time · Venue */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-body text-parchment/85"
            {...fadeUp(reduced, 0.78)}
          >
            <span>{hero.triad.date}</span>
            <span aria-hidden="true" className="text-gold">&middot;</span>
            <span>{hero.triad.time}</span>
            <span aria-hidden="true" className="text-gold">&middot;</span>
            <span>{hero.triad.venue}</span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
            {...fadeUp(reduced, 0.88)}
          >
            <ButtonLink href="#rsvp">{hero.actions.rsvp}</ButtonLink>
            <ButtonLink href={directionsUrl()} target="_blank" rel="noopener noreferrer" variant="outline">
              {hero.actions.directions}
            </ButtonLink>
          </motion.div>

          {/* Dholuo welcome */}
          <motion.p
            className="font-script text-amber-sunset/75"
            style={{ fontSize: "clamp(1.3rem, 4.5vw, 1.9rem)" }}
            {...fadeUp(reduced, 0.96)}
          >
            {siteConfig.welcome.dholuoGreeting}
          </motion.p>
        </div>

        {/* Bottom: Painted lake scene */}
        <motion.div className="w-full" {...fadeIn(reduced, 1.1)}>
          <LakeScene reduced={reduced} />
        </motion.div>
      </div>
    </section>
  );
}

function LakeScene({ reduced }: { reduced: boolean | null }) {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: "clamp(100px, 18vw, 160px)" }}>
      {/* Sky wash — amber sunset bleeding into deep lake */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1c0e05] via-[#0f1a28] to-[#060e18]" />

      {/* Sun glow on horizon */}
      <div className="absolute left-1/2 -translate-x-1/2 rounded-full bg-amber-sunset/50 blur-2xl"
        style={{ top: "10%", width: "30%", height: "40%" }} />
      <div className="absolute left-1/2 -translate-x-1/2 rounded-full bg-gold/40 blur-md"
        style={{ top: "18%", width: "8%", height: "20%" }} />

      {/* Horizon line */}
      <div className="absolute inset-x-0 bg-gradient-to-r from-transparent via-gold/35 to-transparent h-px" style={{ top: "42%" }} />

      {/* Water */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-[#0d1e30]/80 to-[#060e18]" style={{ top: "42%" }} />

      {/* Water shimmer */}
      <div className="absolute inset-x-[15%] h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" style={{ top: "54%" }} />
      <div className="absolute inset-x-[25%] h-px bg-gradient-to-r from-transparent via-amber-sunset/15 to-transparent" style={{ top: "66%" }} />
      <div className="absolute inset-x-[10%] h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" style={{ top: "78%" }} />

      {/* Homa-Bay shore — left silhouette */}
      <svg aria-hidden="true" viewBox="0 0 300 80" className="absolute bottom-0 left-0 w-[42%]" preserveAspectRatio="none">
        <path d="M0 80 L0 48 C30 42 60 36 90 40 C120 44 150 34 180 38 C210 42 250 46 280 44 L300 42 L300 80 Z" fill="#060e18" />
        <path d="M0 48 C30 42 60 36 90 40 C120 44 150 34 180 38 C210 42 250 46 280 44 L300 42" stroke="#c9a227" strokeWidth="0.4" strokeOpacity="0.3" fill="none" />
      </svg>

      {/* Siaya shore — right silhouette (mirrored) */}
      <svg aria-hidden="true" viewBox="0 0 300 80" className="absolute bottom-0 right-0 w-[42%] -scale-x-100" preserveAspectRatio="none">
        <path d="M0 80 L0 48 C30 42 60 36 90 40 C120 44 150 34 180 38 C210 42 250 46 280 44 L300 42 L300 80 Z" fill="#060e18" />
        <path d="M0 48 C30 42 60 36 90 40 C120 44 150 34 180 38 C210 42 250 46 280 44 L300 42" stroke="#c9a227" strokeWidth="0.4" strokeOpacity="0.3" fill="none" />
      </svg>

      {/* Dhow — departing Homa-Bay */}
      <motion.div
        className="absolute"
        style={{ top: "22%", left: "10%" }}
        animate={reduced ? undefined : { y: [0, -3, 0] }}
        transition={reduced ? undefined : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <DhowSilhouette className="w-12 opacity-90 sm:w-16" />
      </motion.div>

      {/* Shore labels */}
      <span className="absolute label-utility text-parchment/35 tracking-widest" style={{ bottom: "8%", left: "3%", fontSize: "0.6rem" }}>Homa-Bay</span>
      <span className="absolute label-utility text-parchment/35 tracking-widest" style={{ bottom: "8%", right: "3%", fontSize: "0.6rem" }}>Siaya</span>
    </div>
  );
}
