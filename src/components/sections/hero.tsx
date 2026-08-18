"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Crown } from "@/components/motifs/crown";
import { FloralCorner } from "@/components/motifs/floral-corner";
import { DhowSilhouette } from "@/components/motifs/dhow-silhouette";
import { SparkleField } from "@/components/motifs/sparkle-field";
import { DiamondBorder } from "@/components/motifs/diamond-border";
import { ButtonLink } from "@/components/ui/button";
import { ceremonyContent } from "@/content/ceremony";
import { siteConfig } from "@/lib/site-config";
import { directionsUrl } from "@/lib/maps";
import { useRevealed } from "@/lib/reveal-context";

const EASE = [0.22, 1, 0.36, 1] as const;

function up(revealed: boolean, reduced: boolean | null, delay: number) {
  if (reduced) return { initial: { opacity: 1 }, animate: { opacity: 1 } };
  return {
    initial: { opacity: 0, y: 22 },
    animate: revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    transition: { duration: 0.85, delay, ease: EASE },
  };
}

function appear(revealed: boolean, reduced: boolean | null, delay: number) {
  if (reduced) return { initial: { opacity: 1 }, animate: { opacity: 1 } };
  return {
    initial: { opacity: 0 },
    animate: revealed ? { opacity: 1 } : { opacity: 0 },
    transition: { duration: 1.1, delay, ease: EASE },
  };
}

export function Hero() {
  const { hero } = ceremonyContent;
  const reduced = useReducedMotion();
  const { revealed } = useRevealed();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY     = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.07]);
  const floralY    = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative overflow-hidden bg-ink"
      style={{ minHeight: "100svh" }}
      aria-label="Hero — Homa-Bay meets Siaya"
    >
      {/* ── Background: photo ── */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={reduced ? undefined : { y: photoY, scale: photoScale }}
      >
        <Image
          src="/images/couple-portrait.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
      </motion.div>

      {/* ── Overlay: graduated ink so text is always legible ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* top-to-bottom: heavy at top, clears in the middle, floods back at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/40 to-ink/95" />
        {/* extra bottom flood for the lake scene */}
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink to-transparent" />
      </div>

      {/* ── Decorative: sparkles + floral corners ── */}
      <SparkleField className="pointer-events-none absolute inset-0 z-10" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={reduced ? undefined : { y: floralY }}
      >
        <FloralCorner className="absolute -left-2 -top-2 w-32 opacity-45 sm:w-44" />
        <FloralCorner className="absolute -right-2 -top-2 w-32 -scale-x-100 opacity-45 sm:w-44" />
      </motion.div>

      {/* ── All text: one single centred column, top to bottom ── */}
      <div className="relative z-20 flex min-h-svh flex-col items-center text-center">

        {/* 1. Crown */}
        <motion.div className="mt-14 flex flex-col items-center gap-3 sm:mt-16" {...up(revealed, reduced, 0)}>
          <div className="relative">
            <div className="absolute inset-0 scale-[2] rounded-full bg-[radial-gradient(closest-side,rgba(201,162,39,0.18),transparent)]" />
            <Crown className="relative w-14 drop-shadow-[0_0_18px_rgba(201,162,39,0.55)] sm:w-16" />
          </div>
          <p className="label-utility rounded-full border border-gold/20 bg-ink/60 px-5 py-1.5 backdrop-blur-sm tracking-[0.22em]">
            {hero.crownLabel}
          </p>
        </motion.div>

        {/* 2. Title block: HOMA-BAY / meets / SIAYA */}
        <motion.div className="mt-10 flex flex-col items-center gap-3 sm:mt-12 sm:gap-4" {...appear(revealed, reduced, 0.3)}>

          {/* HOMA-BAY */}
          <h1
            className="font-display font-semibold uppercase leading-none text-gold-engraved"
            style={{
              fontSize: "clamp(2.8rem, 9vw, 7rem)",
              letterSpacing: "0.1em",
              filter: "drop-shadow(0 0 28px rgba(232,200,122,0.4))",
            }}
          >
            {hero.titleTop}
          </h1>

          {/* meets — script, flanked by thin gold rules */}
          <div className="flex w-full max-w-xs items-center gap-3 sm:max-w-sm">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/40" />
            <span
              className="font-script text-parchment/70 shrink-0"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)" }}
            >
              {hero.titleJoiner}
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/40" />
          </div>

          {/* SIAYA */}
          <span
            className="font-display font-semibold uppercase leading-none text-gold-engraved"
            style={{
              fontSize: "clamp(2.8rem, 9vw, 7rem)",
              letterSpacing: "0.1em",
              filter: "drop-shadow(0 0 28px rgba(232,200,122,0.4))",
            }}
          >
            {hero.titleBottom}
          </span>
        </motion.div>

        {/* 3. Couple names */}
        <motion.p
          className="mt-8 font-script text-gold-light leading-none sm:mt-10"
          style={{ fontSize: "clamp(2rem, 6vw, 3.6rem)" }}
          {...up(revealed, reduced, 0.55)}
        >
          {hero.coupleNames}
        </motion.p>

        {/* 4. Dholuo welcome */}
        <motion.p
          className="mt-3 font-script text-amber-sunset/70"
          style={{ fontSize: "clamp(1.1rem, 3vw, 1.6rem)" }}
          {...up(revealed, reduced, 0.65)}
        >
          {siteConfig.welcome.dholuoGreeting}
        </motion.p>

        {/* 5. Scripture */}
        <motion.p
          className="mt-6 max-w-xs text-body italic text-parchment/45 sm:max-w-sm sm:mt-7"
          {...up(revealed, reduced, 0.72)}
        >
          &ldquo;{siteConfig.scripture.english}&rdquo;
          <span className="not-italic text-parchment/25"> — {siteConfig.scripture.reference}</span>
        </motion.p>

        {/* 6. Gold lozenge divider */}
        <motion.div className="mt-7 flex items-center gap-3 w-44 sm:mt-8" {...appear(revealed, reduced, 0.78)}>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/45" />
          <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 shrink-0" aria-hidden="true">
            <path d="M5 0 L10 5 L5 10 L0 5 Z" fill="var(--color-gold)" opacity="0.7" />
          </svg>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/45" />
        </motion.div>

        {/* 7. Date · Time · Venue */}
        <motion.div
          className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-body text-parchment/75 sm:mt-6"
          {...up(revealed, reduced, 0.84)}
        >
          <span>{hero.triad.date}</span>
          <span aria-hidden="true" className="text-gold/55">&middot;</span>
          <span>{hero.triad.time}</span>
          <span aria-hidden="true" className="text-gold/55">&middot;</span>
          <span>{hero.triad.venue}</span>
        </motion.div>

        {/* 8. CTAs */}
        <motion.div
          className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row"
          {...up(revealed, reduced, 0.9)}
        >
          <ButtonLink href="#rsvp">{hero.actions.rsvp}</ButtonLink>
          <ButtonLink href={directionsUrl()} target="_blank" rel="noopener noreferrer" variant="outline">
            {hero.actions.directions}
          </ButtonLink>
        </motion.div>

        {/* 9. Lake scene — pushed to the bottom */}
        <motion.div className="mt-auto w-full" {...appear(revealed, reduced, 1.0)}>
          <LakeScene reduced={reduced} />
        </motion.div>

      </div>
    </section>
  );
}

function LakeScene({ reduced }: { reduced: boolean | null }) {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: "clamp(120px, 18vw, 180px)" }}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#1e0f04] via-[#0e1a2a] to-[#060e18]" />

      {/* Sun */}
      <div className="absolute left-1/2 -translate-x-1/2 rounded-full bg-amber-sunset/35 blur-3xl"
        style={{ top: "4%", width: "36%", height: "50%" }} />
      <div className="absolute left-1/2 -translate-x-1/2 rounded-full bg-gold-light/40 blur-lg"
        style={{ top: "12%", width: "8%", height: "24%" }} />
      <div className="absolute left-1/2 -translate-x-1/2 rounded-full bg-gold/60"
        style={{ top: "18%", width: "2.5%", height: "10%", minWidth: "10px" }} />

      {/* Horizon */}
      <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" style={{ top: "44%" }} />

      {/* Water */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-[#0c1d2e]/80 to-[#060e18]" style={{ top: "44%" }} />

      {/* Reflection */}
      <div className="absolute left-1/2 -translate-x-1/2 bg-gradient-to-b from-gold/10 to-transparent blur-sm"
        style={{ top: "44%", width: "14%", height: "36%" }} />

      {/* Shimmer */}
      {[
        { l: "14%", r: "14%", top: "55%" },
        { l: "24%", r: "24%", top: "67%" },
        { l: "9%",  r: "9%",  top: "78%" },
      ].map((s, i) => (
        <div key={i} className="absolute h-px bg-gradient-to-r from-transparent via-gold/12 to-transparent"
          style={{ top: s.top, left: s.l, right: s.r }} />
      ))}

      {/* Shores */}
      <svg aria-hidden="true" viewBox="0 0 320 90" className="absolute bottom-0 left-0 w-[44%]" preserveAspectRatio="none">
        <path d="M0 90 L0 52 C25 46 55 38 85 42 C115 46 145 36 175 40 C205 44 250 48 290 46 L320 44 L320 90 Z" fill="#060e18" />
        <path d="M0 52 C25 46 55 38 85 42 C115 46 145 36 175 40 C205 44 250 48 290 46 L320 44" stroke="#c9a227" strokeWidth="0.5" strokeOpacity="0.2" fill="none" />
      </svg>
      <svg aria-hidden="true" viewBox="0 0 320 90" className="absolute bottom-0 right-0 w-[44%] -scale-x-100" preserveAspectRatio="none">
        <path d="M0 90 L0 52 C25 46 55 38 85 42 C115 46 145 36 175 40 C205 44 250 48 290 46 L320 44 L320 90 Z" fill="#060e18" />
        <path d="M0 52 C25 46 55 38 85 42 C115 46 145 36 175 40 C205 44 250 48 290 46 L320 44" stroke="#c9a227" strokeWidth="0.5" strokeOpacity="0.2" fill="none" />
      </svg>

      {/* Dhow */}
      <motion.div
        className="absolute"
        style={{ top: "22%", left: "9%" }}
        animate={reduced ? undefined : { y: [0, -4, 0] }}
        transition={reduced ? undefined : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <DhowSilhouette className="w-12 opacity-80 sm:w-16" />
      </motion.div>

      {/* Shore labels */}
      <span className="absolute label-utility text-parchment/25 tracking-widest" style={{ bottom: "10%", left: "2.5%", fontSize: "0.55rem" }}>Homa-Bay</span>
      <span className="absolute label-utility text-parchment/25 tracking-widest" style={{ bottom: "10%", right: "2.5%", fontSize: "0.55rem" }}>Siaya</span>

      <div className="absolute inset-x-0 bottom-0"><DiamondBorder /></div>
    </div>
  );
}
