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

const EASE = [0.22, 1, 0.36, 1] as const;

function fadeUp(reduced: boolean | null, delay: number, y = 24) {
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
    transition: { duration: 1.4, delay, ease: EASE },
  };
}

export function Hero() {
  const { hero } = ceremonyContent;
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Photo: slow upward drift + very subtle scale — Ken Burns, not a zoom
  const photoY     = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  // Split title: shores drift apart as you scroll away
  const leftX  = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);
  const rightX = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

  // Floral corners: drift upward faster than content — depth
  const floralY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative overflow-hidden bg-ink"
      style={{ minHeight: "100svh" }}
      aria-label="Hero — Homa-Bay meets Siaya"
    >

      {/* ── LAYER 1: Couple photo — full bleed, visible ── */}
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

      {/* ── LAYER 2: Ink overlay — lighter in centre, heavy at edges & bottom ── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        {/* Centre window — let the couple show through */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_65%_at_50%_38%,rgba(21,12,7,0.15)_0%,rgba(21,12,7,0.65)_55%,rgba(21,12,7,0.96)_100%)]" />
        {/* Bottom flood — blends into lake */}
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-ink via-ink/90 to-transparent" />
        {/* Top band — crown legibility */}
        <div className="absolute inset-x-0 top-0 h-[22%] bg-gradient-to-b from-ink/85 to-transparent" />
        {/* Side bands — split title legibility, narrower than before */}
        <div className="absolute inset-y-0 left-0 w-[22%] bg-gradient-to-r from-ink/90 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-[22%] bg-gradient-to-l from-ink/90 to-transparent" />
      </div>

      {/* ── LAYER 3: Ambient gold glow — warmth behind the centre content ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[55%] h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(201,162,39,0.08),transparent)]" />
      </div>

      {/* ── LAYER 4: Sparkles ── */}
      <SparkleField className="pointer-events-none absolute inset-0 z-10" />

      {/* ── LAYER 5: Floral corners — parallax upward ── */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={reduced ? undefined : { y: floralY }}
      >
        <FloralCorner className="absolute -left-3 -top-3 w-28 opacity-55 sm:w-36" />
        <FloralCorner className="absolute -right-3 -top-3 w-28 -scale-x-100 opacity-55 sm:w-36" />
      </motion.div>

      {/* ── LAYER 6: Split title — HOMA-BAY left, SIAYA right ──
           Hidden on very small screens (<380px), shown from sm upward.
           On mobile the title is rendered inline in the centre column instead. ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 hidden sm:flex items-center justify-between px-3 lg:px-6"
        style={{ top: "28%", bottom: "32%" }}
      >
        <motion.span
          className="font-display font-semibold uppercase text-gold-engraved select-none"
          style={{
            fontSize: "clamp(2rem, 8vw, 6.5rem)",
            letterSpacing: "0.07em",
            lineHeight: 1,
            filter: "drop-shadow(2px 3px 0 rgba(21,12,7,0.95))",
          }}
          {...fadeIn(reduced, 0.5)}
          {...(reduced ? {} : { style: { fontSize: "clamp(2rem, 8vw, 6.5rem)", letterSpacing: "0.07em", lineHeight: 1, filter: "drop-shadow(2px 3px 0 rgba(21,12,7,0.95))", x: leftX } })}
        >
          {hero.titleTop}
        </motion.span>

        <motion.span
          className="font-display font-semibold uppercase text-gold-engraved select-none text-right"
          style={{
            fontSize: "clamp(2rem, 8vw, 6.5rem)",
            letterSpacing: "0.07em",
            lineHeight: 1,
            filter: "drop-shadow(2px 3px 0 rgba(21,12,7,0.95))",
          }}
          {...fadeIn(reduced, 0.5)}
          {...(reduced ? {} : { style: { fontSize: "clamp(2rem, 8vw, 6.5rem)", letterSpacing: "0.07em", lineHeight: 1, filter: "drop-shadow(2px 3px 0 rgba(21,12,7,0.95))", x: rightX } })}
        >
          {hero.titleBottom}
        </motion.span>
      </div>

      {/* ── LAYER 7: Centre content column ── */}
      <div
        className="relative z-30 flex flex-col items-center px-5"
        style={{ minHeight: "100svh" }}
      >

        {/* ── TOP: Crown + badge ── */}
        <motion.div
          className="flex flex-col items-center gap-3 pt-10 sm:pt-12"
          {...fadeUp(reduced, 0)}
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute h-24 w-24 rounded-full bg-[radial-gradient(closest-side,rgba(201,162,39,0.25),transparent)]" />
            <Crown className="relative w-14 drop-shadow-[0_0_18px_rgba(201,162,39,0.65)] sm:w-18" />
          </div>
          <p className="label-utility rounded-full border border-gold/25 bg-ink/65 px-5 py-1.5 backdrop-blur-sm tracking-[0.24em]">
            {hero.crownLabel}
          </p>
        </motion.div>

        {/* ── MIDDLE: The ceremony title block ──
             On mobile: full stacked title (HOMA-BAY / meets / SIAYA)
             On sm+: only "meets" + couple names (the split title is the absolute layer) ── */}
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center py-8">

          {/* Mobile-only stacked title */}
          <motion.div className="flex flex-col items-center gap-0 sm:hidden" {...fadeIn(reduced, 0.4)}>
            <span
              className="font-display font-semibold uppercase text-gold-engraved leading-none"
              style={{ fontSize: "clamp(2.2rem, 13vw, 3.2rem)", letterSpacing: "0.07em", filter: "drop-shadow(1px 2px 0 rgba(21,12,7,0.9))" }}
            >
              {hero.titleTop}
            </span>
            <span
              className="font-script text-parchment/65 leading-tight"
              style={{ fontSize: "clamp(1.3rem, 7vw, 1.8rem)" }}
            >
              {hero.titleJoiner}
            </span>
            <span
              className="font-display font-semibold uppercase text-gold-engraved leading-none"
              style={{ fontSize: "clamp(2.2rem, 13vw, 3.2rem)", letterSpacing: "0.07em", filter: "drop-shadow(1px 2px 0 rgba(21,12,7,0.9))" }}
            >
              {hero.titleBottom}
            </span>
          </motion.div>

          {/* Desktop "meets" bridge — sits between the two absolute title spans */}
          <motion.div
            className="hidden sm:flex items-center gap-4 w-full max-w-xs"
            {...fadeUp(reduced, 0.45)}
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/50" />
            <span className="font-script text-parchment/60" style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)" }}>
              {hero.titleJoiner}
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/50" />
          </motion.div>

          {/* Dholuo welcome — warmth before the names */}
          <motion.p
            className="font-script text-amber-sunset/80"
            style={{ fontSize: "clamp(1.2rem, 4vw, 1.8rem)" }}
            {...fadeUp(reduced, 0.52)}
          >
            {siteConfig.welcome.dholuoGreeting}
          </motion.p>

          {/* Couple names — the emotional peak */}
          <motion.p
            className="font-script text-gold-light leading-none"
            style={{ fontSize: "clamp(2.4rem, 9vw, 4.2rem)" }}
            {...fadeUp(reduced, 0.6)}
          >
            {hero.coupleNames}
          </motion.p>

          {/* Scripture — quiet, below the names */}
          <motion.p
            className="text-body italic text-parchment/50 max-w-[22rem]"
            {...fadeUp(reduced, 0.7)}
          >
            &ldquo;{siteConfig.scripture.english}&rdquo;
            <span className="not-italic text-parchment/30"> — {siteConfig.scripture.reference}</span>
          </motion.p>

          {/* Gold lozenge divider */}
          <motion.div
            className="flex items-center gap-3 w-36"
            {...fadeIn(reduced, 0.76)}
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/55" />
            <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 shrink-0" aria-hidden="true">
              <path d="M5 0 L10 5 L5 10 L0 5 Z" fill="var(--color-gold)" opacity="0.8" />
            </svg>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/55" />
          </motion.div>

          {/* Date · Time · Venue */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-body text-parchment/80"
            {...fadeUp(reduced, 0.82)}
          >
            <span>{hero.triad.date}</span>
            <span aria-hidden="true" className="text-gold/70">&middot;</span>
            <span>{hero.triad.time}</span>
            <span aria-hidden="true" className="text-gold/70">&middot;</span>
            <span>{hero.triad.venue}</span>
          </motion.div>

          {/* CTAs — pill shape, not full-width */}
          <motion.div
            className="flex flex-col gap-3 sm:flex-row"
            {...fadeUp(reduced, 0.9)}
          >
            <ButtonLink href="#rsvp">{hero.actions.rsvp}</ButtonLink>
            <ButtonLink href={directionsUrl()} target="_blank" rel="noopener noreferrer" variant="outline">
              {hero.actions.directions}
            </ButtonLink>
          </motion.div>
        </div>

        {/* ── BOTTOM: Lake departure scene ── */}
        <motion.div className="w-full" {...fadeIn(reduced, 1.05)}>
          <LakeScene reduced={reduced} />
        </motion.div>
      </div>
    </section>
  );
}

function LakeScene({ reduced }: { reduced: boolean | null }) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(130px, 22vw, 200px)" }}
    >
      {/* Sky — warm amber at top, deep lake blue at bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1e0f04] via-[#0e1a2a] to-[#060e18]" />

      {/* Sun — centred on horizon, soft glow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full bg-amber-sunset/40 blur-3xl"
        style={{ top: "5%", width: "40%", height: "55%" }}
      />
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full bg-gold-light/50 blur-lg"
        style={{ top: "14%", width: "10%", height: "28%" }}
      />
      {/* Sun disc */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full bg-gold/70"
        style={{ top: "20%", width: "3%", height: "12%", minWidth: "12px" }}
      />

      {/* Horizon line */}
      <div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        style={{ top: "44%" }}
      />

      {/* Water body */}
      <div
        className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-[#0c1d2e]/90 to-[#060e18]"
        style={{ top: "44%" }}
      />

      {/* Sun reflection on water */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bg-gradient-to-b from-gold/15 to-transparent blur-sm"
        style={{ top: "44%", width: "18%", height: "40%" }}
      />

      {/* Water shimmer lines */}
      {[
        { inset: "12%", top: "54%", opacity: "via-gold/18" },
        { inset: "22%", top: "64%", opacity: "via-amber-sunset/12" },
        { inset: "8%",  top: "76%", opacity: "via-gold/10" },
        { inset: "30%", top: "86%", opacity: "via-gold/8" },
      ].map((s, i) => (
        <div
          key={i}
          className={`absolute h-px bg-gradient-to-r from-transparent ${s.opacity} to-transparent`}
          style={{ top: s.top, left: s.inset, right: s.inset }}
        />
      ))}

      {/* Homa-Bay shore — left */}
      <svg
        aria-hidden="true"
        viewBox="0 0 320 90"
        className="absolute bottom-0 left-0 w-[44%]"
        preserveAspectRatio="none"
      >
        <path
          d="M0 90 L0 52 C25 46 55 38 85 42 C115 46 145 36 175 40 C205 44 250 48 290 46 L320 44 L320 90 Z"
          fill="#060e18"
        />
        <path
          d="M0 52 C25 46 55 38 85 42 C115 46 145 36 175 40 C205 44 250 48 290 46 L320 44"
          stroke="#c9a227"
          strokeWidth="0.5"
          strokeOpacity="0.25"
          fill="none"
        />
      </svg>

      {/* Siaya shore — right (mirrored) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 320 90"
        className="absolute bottom-0 right-0 w-[44%] -scale-x-100"
        preserveAspectRatio="none"
      >
        <path
          d="M0 90 L0 52 C25 46 55 38 85 42 C115 46 145 36 175 40 C205 44 250 48 290 46 L320 44 L320 90 Z"
          fill="#060e18"
        />
        <path
          d="M0 52 C25 46 55 38 85 42 C115 46 145 36 175 40 C205 44 250 48 290 46 L320 44"
          stroke="#c9a227"
          strokeWidth="0.5"
          strokeOpacity="0.25"
          fill="none"
        />
      </svg>

      {/* Dhow — departing Homa-Bay, sitting on the horizon */}
      <motion.div
        className="absolute"
        style={{ top: "26%", left: "9%" }}
        animate={reduced ? undefined : { y: [0, -4, 0] }}
        transition={reduced ? undefined : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <DhowSilhouette className="w-14 opacity-85 sm:w-18" />
      </motion.div>

      {/* Shore labels */}
      <span
        className="absolute label-utility text-parchment/30 tracking-widest"
        style={{ bottom: "10%", left: "2.5%", fontSize: "0.58rem" }}
      >
        Homa-Bay
      </span>
      <span
        className="absolute label-utility text-parchment/30 tracking-widest"
        style={{ bottom: "10%", right: "2.5%", fontSize: "0.58rem" }}
      >
        Siaya
      </span>

      {/* Diamond border — the waterline / section transition */}
      <div className="absolute inset-x-0 bottom-0">
        <DiamondBorder />
      </div>
    </div>
  );
}
