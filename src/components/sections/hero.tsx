"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Crown } from "@/components/motifs/crown";
import { FloralCorner } from "@/components/motifs/floral-corner";
import { SparkleField } from "@/components/motifs/sparkle-field";
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
          className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row pb-20 sm:pb-28"
          {...up(revealed, reduced, 0.9)}
        >
          <ButtonLink href="#rsvp">{hero.actions.rsvp}</ButtonLink>
          <ButtonLink href={directionsUrl()} target="_blank" rel="noopener noreferrer" variant="outline">
            {hero.actions.directions}
          </ButtonLink>
        </motion.div>



      </div>
    </section>
  );
}

