"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Crown } from "@/components/motifs/crown";
import { GoldWreath } from "@/components/motifs/gold-wreath";
import { FloralBouquet } from "@/components/motifs/floral-bouquet";
import { DhowSilhouette } from "@/components/motifs/dhow-silhouette";
import { GoldDivider } from "@/components/motifs/gold-divider";
import { ButtonLink } from "@/components/ui/button";
import { ceremonyContent } from "@/content/ceremony";
import { siteConfig } from "@/lib/site-config";
import { directionsUrl } from "@/lib/maps";

const EASE = [0.22, 1, 0.36, 1] as const;

function seq(reduced: boolean | null, delay: number, y = 20) {
  if (reduced) return { initial: { opacity: 1 }, animate: { opacity: 1 } };
  return {
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, delay, ease: EASE },
  };
}

/** The ornamental portrait frame — four mitered corners of the diamond-lozenge pattern */
function PortraitFrame() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 340 420"
      fill="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="frame-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="var(--color-gold-light)" />
          <stop offset="55%"  stopColor="var(--color-gold)" />
          <stop offset="100%" stopColor="var(--color-gold-deep)" />
        </linearGradient>
      </defs>

      {/* Outer rect */}
      <rect x="2" y="2" width="336" height="416" rx="4" stroke="url(#frame-gold)" strokeWidth="1.5" />
      {/* Inner rect */}
      <rect x="10" y="10" width="320" height="400" rx="2" stroke="var(--color-gold-deep)" strokeWidth="0.75" strokeOpacity="0.6" />

      {/* Corner lozenges — top-left */}
      <path d="M2 2 L18 2 L2 18 Z" fill="var(--color-gold-deep)" opacity="0.4" />
      <path d="M10 2 L2 10 L2 2 Z" fill="var(--color-gold)" opacity="0.6" />
      <path d="M16 2 L2 16" stroke="var(--color-gold)" strokeWidth="0.5" opacity="0.5" />

      {/* Corner lozenges — top-right */}
      <path d="M338 2 L322 2 L338 18 Z" fill="var(--color-gold-deep)" opacity="0.4" />
      <path d="M330 2 L338 10 L338 2 Z" fill="var(--color-gold)" opacity="0.6" />
      <path d="M324 2 L338 16" stroke="var(--color-gold)" strokeWidth="0.5" opacity="0.5" />

      {/* Corner lozenges — bottom-left */}
      <path d="M2 418 L18 418 L2 402 Z" fill="var(--color-gold-deep)" opacity="0.4" />
      <path d="M10 418 L2 410 L2 418 Z" fill="var(--color-gold)" opacity="0.6" />
      <path d="M16 418 L2 404" stroke="var(--color-gold)" strokeWidth="0.5" opacity="0.5" />

      {/* Corner lozenges — bottom-right */}
      <path d="M338 418 L322 418 L338 402 Z" fill="var(--color-gold-deep)" opacity="0.4" />
      <path d="M330 418 L338 410 L338 418 Z" fill="var(--color-gold)" opacity="0.6" />
      <path d="M324 418 L338 404" stroke="var(--color-gold)" strokeWidth="0.5" opacity="0.5" />

      {/* Mid-side lozenge accents */}
      {[{ x: 170, y: 2 }, { x: 170, y: 418 }].map(({ x, y }, i) => (
        <path key={i} d={`M${x} ${y - 5} L${x + 5} ${y} L${x} ${y + 5} L${x - 5} ${y} Z`}
          fill="var(--color-gold-light)" opacity="0.8" />
      ))}
      {[{ x: 2, y: 210 }, { x: 338, y: 210 }].map(({ x, y }, i) => (
        <path key={i} d={`M${x - 5} ${y} L${x} ${y - 5} L${x + 5} ${y} L${x} ${y + 5} Z`}
          fill="var(--color-gold-light)" opacity="0.8" />
      ))}
    </svg>
  );
}

/** Painted lake scene — the departure horizon */
function LakeHorizon() {
  return (
    <div className="relative h-32 w-full overflow-hidden sm:h-40">
      {/* Sky wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0e06] via-[#2a1508] to-[#0a1520]" />

      {/* Sun on the horizon */}
      <div className="absolute left-1/2 top-[28%] h-10 w-10 -translate-x-1/2 rounded-full bg-amber-sunset/70 blur-md" />
      <div className="absolute left-1/2 top-[30%] h-6 w-6 -translate-x-1/2 rounded-full bg-gold-light/80 blur-sm" />

      {/* Sun reflection on water */}
      <div className="absolute bottom-0 left-1/2 h-16 w-24 -translate-x-1/2 bg-gradient-to-b from-amber-sunset/25 via-gold/10 to-transparent blur-sm" />

      {/* Horizon line */}
      <div className="absolute inset-x-0 top-[48%] h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* Water */}
      <div className="absolute inset-x-0 bottom-0 top-[48%] bg-gradient-to-b from-[#0d1e30] to-[#060e18]" />

      {/* Water shimmer lines */}
      <div className="absolute inset-x-[10%] top-[55%] h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute inset-x-[20%] top-[65%] h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
      <div className="absolute inset-x-[5%]  top-[78%] h-px bg-gradient-to-r from-transparent via-amber-sunset/15 to-transparent" />

      {/* Homa-Bay shore silhouette — left */}
      <svg aria-hidden="true" viewBox="0 0 200 60" className="absolute bottom-0 left-0 w-[45%] opacity-70" preserveAspectRatio="none">
        <path d="M0 60 L0 38 C20 34 40 30 60 32 C80 34 100 28 120 30 C140 32 160 36 180 34 L200 32 L200 60 Z"
          fill="#0a1520" />
        <path d="M0 38 C20 34 40 30 60 32 C80 34 100 28 120 30 C140 32 160 36 180 34 L200 32"
          stroke="var(--color-gold-deep)" strokeWidth="0.5" strokeOpacity="0.4" fill="none" />
      </svg>

      {/* Siaya shore silhouette — right */}
      <svg aria-hidden="true" viewBox="0 0 200 60" className="absolute bottom-0 right-0 w-[45%] -scale-x-100 opacity-70" preserveAspectRatio="none">
        <path d="M0 60 L0 38 C20 34 40 30 60 32 C80 34 100 28 120 30 C140 32 160 36 180 34 L200 32 L200 60 Z"
          fill="#0a1520" />
        <path d="M0 38 C20 34 40 30 60 32 C80 34 100 28 120 30 C140 32 160 36 180 34 L200 32"
          stroke="var(--color-gold-deep)" strokeWidth="0.5" strokeOpacity="0.4" fill="none" />
      </svg>

      {/* Dhow — departing from Homa-Bay side */}
      <motion.div
        className="absolute top-[30%] left-[12%]"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <DhowSilhouette className="w-12 opacity-90 sm:w-16" />
      </motion.div>

      {/* Shore labels */}
      <span className="absolute bottom-3 left-4 label-utility text-[0.65rem] text-parchment/40 tracking-widest">Homa-Bay</span>
      <span className="absolute bottom-3 right-4 label-utility text-[0.65rem] text-parchment/40 tracking-widest">Siaya</span>
    </div>
  );
}

export function Hero() {
  const { hero } = ceremonyContent;
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bouquetY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative overflow-hidden bg-ink"
      aria-label="Hero — Homa-Bay meets Siaya"
    >
      {/* ── Ambient warmth: deep radial glow from the centre ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_60%,rgba(201,162,39,0.07),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_50%_35%,rgba(217,138,43,0.06),transparent)]" />
      </div>

      {/* ── Floral bouquets — parallax, one each side ── */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={reduced ? undefined : { y: bouquetY }}
      >
        <FloralBouquet className="absolute -bottom-16 -left-10 w-52 opacity-60 sm:w-64" />
        <FloralBouquet className="absolute -bottom-16 -right-10 w-52 -scale-x-100 opacity-60 sm:w-64" />
      </motion.div>

      {/* ── Main content column ── */}
      <div className="relative mx-auto flex max-w-lg flex-col items-center px-6 pt-12 pb-0 sm:pt-16">

        {/* 1. Crown mark — the seal of the ceremony */}
        <motion.div className="relative flex items-center justify-center" {...seq(reduced, 0)}>
          <GoldWreath className="w-36 opacity-60 sm:w-40" />
          <Crown className="absolute w-16 drop-shadow-[0_0_16px_rgba(201,162,39,0.5)] sm:w-18" />
        </motion.div>

        {/* 2. Event type badge */}
        <motion.p
          className="mt-4 label-utility rounded-full border border-gold/25 bg-green-royal/80 px-5 py-1.5 backdrop-blur-sm"
          {...seq(reduced, 0.15)}
        >
          {hero.crownLabel}
        </motion.p>

        {/* 3. The title — the centrepiece, engraved gold */}
        <motion.div className="mt-6 text-center" {...seq(reduced, 0.3, 28)}>
          {/* Thin rule above */}
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/50" />
            <span className="text-gold/60 text-xs">✦</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/50" />
          </div>

          <h1 className="font-display uppercase leading-[1.05] tracking-[0.08em]">
            <span className="block text-gold-engraved drop-shadow-[0_2px_0_rgba(138,99,24,0.6)]"
              style={{ fontSize: "clamp(2.8rem, 11vw, 5.5rem)" }}>
              {hero.titleTop}
            </span>
            <span className="block font-script normal-case tracking-normal text-parchment/70 leading-snug"
              style={{ fontSize: "clamp(1.5rem, 5.5vw, 2.8rem)" }}>
              {hero.titleJoiner}
            </span>
            <span className="block text-gold-engraved drop-shadow-[0_2px_0_rgba(138,99,24,0.6)]"
              style={{ fontSize: "clamp(2.8rem, 11vw, 5.5rem)" }}>
              {hero.titleBottom}
            </span>
          </h1>

          {/* Thin rule below */}
          <div className="mt-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/50" />
            <span className="text-gold/60 text-xs">✦</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/50" />
          </div>
        </motion.div>

        {/* 4. Couple portrait — framed as a painting */}
        <motion.div
          className="relative mt-8 w-full max-w-[340px]"
          {...seq(reduced, 0.5, 16)}
        >
          {/* Outer glow */}
          <div className="absolute -inset-3 rounded-lg bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.18),transparent_70%)]" />

          {/* The frame */}
          <div className="relative aspect-[340/420] w-full overflow-hidden rounded-sm">
            <Image
              src="/images/couple-portrait.jpg"
              alt={`${hero.coupleNames} — the couple`}
              fill
              priority
              sizes="(min-width: 640px) 340px, 85vw"
              className="object-cover object-top"
            />
            {/* Subtle inner vignette so the frame reads against any photo */}
            <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(21,12,7,0.5)]" />
          </div>

          {/* Ornamental frame overlay */}
          <PortraitFrame />
        </motion.div>

        {/* 5. Couple names in script */}
        <motion.p
          className="mt-6 font-script text-gold-light text-center leading-none"
          style={{ fontSize: "clamp(2rem, 8vw, 3.2rem)" }}
          {...seq(reduced, 0.65)}
        >
          {hero.coupleNames}
        </motion.p>

        {/* 6. Scripture line */}
        <motion.p
          className="mt-3 text-center text-body text-parchment/60 italic"
          {...seq(reduced, 0.75)}
        >
          &ldquo;{siteConfig.scripture.english}&rdquo;
          <span className="not-italic text-parchment/40"> — {siteConfig.scripture.reference}</span>
        </motion.p>

        {/* 7. Gold divider */}
        <motion.div className="mt-6 w-full" {...seq(reduced, 0.82)}>
          <GoldDivider />
        </motion.div>

        {/* 8. Date · Time · Venue triad */}
        <motion.div
          className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-body text-parchment/85"
          {...seq(reduced, 0.88)}
        >
          <span>{hero.triad.date}</span>
          <span aria-hidden="true" className="text-gold">&middot;</span>
          <span>{hero.triad.time}</span>
          <span aria-hidden="true" className="text-gold">&middot;</span>
          <span>{hero.triad.venue}</span>
        </motion.div>

        {/* 9. CTAs */}
        <motion.div
          className="mt-6 flex w-full flex-col gap-3 sm:flex-row sm:justify-center"
          {...seq(reduced, 0.95)}
        >
          <ButtonLink href="#rsvp">{hero.actions.rsvp}</ButtonLink>
          <ButtonLink href={directionsUrl()} target="_blank" rel="noopener noreferrer" variant="outline">
            {hero.actions.directions}
          </ButtonLink>
        </motion.div>

        {/* 10. Dholuo welcome */}
        <motion.p
          className="mt-6 font-script text-amber-sunset/80 text-center"
          style={{ fontSize: "clamp(1.4rem, 5vw, 2rem)" }}
          {...seq(reduced, 1.05)}
        >
          {siteConfig.welcome.dholuoGreeting}
        </motion.p>

        {/* 11. Lake horizon — the departure scene */}
        <motion.div className="mt-8 w-full" {...seq(reduced, 1.1, 0)}>
          <LakeHorizon />
        </motion.div>
      </div>
    </section>
  );
}
