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

function fadeUp(reduced: boolean | null, delay: number, y = 20) {
  if (reduced) return { initial: { opacity: 1 }, animate: { opacity: 1 } };
  return {
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: EASE },
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
  const photoY     = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const leftX      = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);
  const rightX     = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  const floralY    = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative overflow-hidden bg-ink"
      style={{ minHeight: "100svh" }}
      aria-label="Hero — Homa-Bay meets Siaya"
    >
      {/* ── LAYER 1: Photo ── */}
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

      {/* ── LAYER 2: Ink overlay ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_35%,rgba(21,12,7,0.1)_0%,rgba(21,12,7,0.6)_55%,rgba(21,12,7,0.97)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-ink via-ink/90 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-[20%] bg-gradient-to-b from-ink/80 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-[20%] bg-gradient-to-r from-ink/88 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-[20%] bg-gradient-to-l from-ink/88 to-transparent" />
      </div>

      {/* ── LAYER 3: Ambient glow ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[50%] h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(201,162,39,0.07),transparent)]" />
      </div>

      {/* ── LAYER 4: Sparkles ── */}
      <SparkleField className="pointer-events-none absolute inset-0 z-10" />

      {/* ── LAYER 5: Floral corners ── */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={reduced ? undefined : { y: floralY }}
      >
        <FloralCorner className="absolute -left-3 -top-3 w-28 opacity-50 sm:w-36" />
        <FloralCorner className="absolute -right-3 -top-3 w-28 -scale-x-100 opacity-50 sm:w-36" />
      </motion.div>

      {/* ── LAYER 6: Split title — desktop only, pinned to top 15%–42% of viewport ──
           This zone sits ABOVE the centre content zone (which starts at ~42%).
           The two words never overlap the couple names, scripture, or CTAs. ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute z-20 hidden sm:flex items-center justify-between w-full px-4 lg:px-8"
        style={{ top: "18%", bottom: "52%" }}
      >
        <motion.span
          className="font-display font-semibold uppercase text-gold-engraved select-none"
          style={{
            fontSize: "clamp(1.8rem, 7vw, 5.5rem)",
            letterSpacing: "0.07em",
            lineHeight: 1,
            filter: "drop-shadow(2px 3px 0 rgba(21,12,7,0.95))",
          }}
          {...fadeIn(reduced, 0.5)}
          {...(reduced ? {} : {
            style: {
              fontSize: "clamp(1.8rem, 7vw, 5.5rem)",
              letterSpacing: "0.07em",
              lineHeight: 1,
              filter: "drop-shadow(2px 3px 0 rgba(21,12,7,0.95))",
              x: leftX,
            }
          })}
        >
          {hero.titleTop}
        </motion.span>

        <motion.span
          className="font-display font-semibold uppercase text-gold-engraved select-none text-right"
          {...fadeIn(reduced, 0.5)}
          {...(reduced ? {} : {
            style: {
              fontSize: "clamp(1.8rem, 7vw, 5.5rem)",
              letterSpacing: "0.07em",
              lineHeight: 1,
              filter: "drop-shadow(2px 3px 0 rgba(21,12,7,0.95))",
              x: rightX,
            }
          })}
        >
          {hero.titleBottom}
        </motion.span>
      </div>

      {/* ── LAYER 7: Centre content — three explicit zones ── */}
      <div
        className="relative z-30 flex flex-col"
        style={{ minHeight: "100svh" }}
      >

        {/* ZONE A: Crown + badge — top of page */}
        <div className="flex flex-col items-center pt-10 sm:pt-12">
          <motion.div className="flex flex-col items-center gap-3" {...fadeUp(reduced, 0)}>
            <div className="relative flex items-center justify-center">
              <div className="absolute h-20 w-20 rounded-full bg-[radial-gradient(closest-side,rgba(201,162,39,0.22),transparent)]" />
              <Crown className="relative w-14 drop-shadow-[0_0_16px_rgba(201,162,39,0.6)] sm:w-16" />
            </div>
            <p className="label-utility rounded-full border border-gold/25 bg-ink/65 px-5 py-1.5 backdrop-blur-sm tracking-[0.24em]">
              {hero.crownLabel}
            </p>
          </motion.div>
        </div>

        {/* ZONE B: Ceremony details — true vertical centre, with generous padding
             On desktop this sits BELOW the split title zone (top 18%–48%).
             min-h ensures it never collapses on short viewports. ── */}
        <div className="flex flex-1 flex-col items-center justify-center gap-5 px-5 py-10 text-center sm:gap-6 sm:py-12">

          {/* Mobile-only stacked title */}
          <motion.div className="flex flex-col items-center sm:hidden" {...fadeIn(reduced, 0.4)}>
            <span
              className="font-display font-semibold uppercase text-gold-engraved leading-none"
              style={{ fontSize: "clamp(2rem, 12vw, 3rem)", letterSpacing: "0.07em", filter: "drop-shadow(1px 2px 0 rgba(21,12,7,0.9))" }}
            >
              {hero.titleTop}
            </span>
            <span className="font-script text-parchment/60 leading-tight" style={{ fontSize: "clamp(1.2rem, 6vw, 1.6rem)" }}>
              {hero.titleJoiner}
            </span>
            <span
              className="font-display font-semibold uppercase text-gold-engraved leading-none"
              style={{ fontSize: "clamp(2rem, 12vw, 3rem)", letterSpacing: "0.07em", filter: "drop-shadow(1px 2px 0 rgba(21,12,7,0.9))" }}
            >
              {hero.titleBottom}
            </span>
          </motion.div>

          {/* Desktop "meets" bridge */}
          <motion.div
            className="hidden sm:flex items-center gap-4 w-48"
            {...fadeUp(reduced, 0.45)}
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/45" />
            <span className="font-script text-parchment/55 shrink-0" style={{ fontSize: "clamp(1.3rem, 3vw, 1.9rem)" }}>
              {hero.titleJoiner}
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/45" />
          </motion.div>

          {/* Dholuo welcome */}
          <motion.p
            className="font-script text-amber-sunset/75"
            style={{ fontSize: "clamp(1.1rem, 3.5vw, 1.7rem)" }}
            {...fadeUp(reduced, 0.52)}
          >
            {siteConfig.welcome.dholuoGreeting}
          </motion.p>

          {/* Couple names */}
          <motion.p
            className="font-script text-gold-light leading-none"
            style={{ fontSize: "clamp(2.2rem, 7vw, 3.8rem)" }}
            {...fadeUp(reduced, 0.6)}
          >
            {hero.coupleNames}
          </motion.p>

          {/* Scripture */}
          <motion.p
            className="text-body italic text-parchment/48 max-w-sm"
            {...fadeUp(reduced, 0.68)}
          >
            &ldquo;{siteConfig.scripture.english}&rdquo;
            <span className="not-italic text-parchment/28"> — {siteConfig.scripture.reference}</span>
          </motion.p>

          {/* Lozenge divider */}
          <motion.div className="flex items-center gap-3 w-40" {...fadeIn(reduced, 0.74)}>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/50" />
            <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 shrink-0" aria-hidden="true">
              <path d="M5 0 L10 5 L5 10 L0 5 Z" fill="var(--color-gold)" opacity="0.75" />
            </svg>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/50" />
          </motion.div>

          {/* Date · Time · Venue */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-body text-parchment/78"
            {...fadeUp(reduced, 0.8)}
          >
            <span>{hero.triad.date}</span>
            <span aria-hidden="true" className="text-gold/65">&middot;</span>
            <span>{hero.triad.time}</span>
            <span aria-hidden="true" className="text-gold/65">&middot;</span>
            <span>{hero.triad.venue}</span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-col gap-3 sm:flex-row"
            {...fadeUp(reduced, 0.88)}
          >
            <ButtonLink href="#rsvp">{hero.actions.rsvp}</ButtonLink>
            <ButtonLink href={directionsUrl()} target="_blank" rel="noopener noreferrer" variant="outline">
              {hero.actions.directions}
            </ButtonLink>
          </motion.div>
        </div>

        {/* ZONE C: Lake scene — anchored to the bottom */}
        <motion.div className="w-full mt-auto" {...fadeIn(reduced, 1.0)}>
          <LakeScene reduced={reduced} />
        </motion.div>
      </div>
    </section>
  );
}

function LakeScene({ reduced }: { reduced: boolean | null }) {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: "clamp(130px, 20vw, 190px)" }}>
      {/* Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1e0f04] via-[#0e1a2a] to-[#060e18]" />

      {/* Sun glow */}
      <div className="absolute left-1/2 -translate-x-1/2 rounded-full bg-amber-sunset/35 blur-3xl"
        style={{ top: "4%", width: "38%", height: "52%" }} />
      <div className="absolute left-1/2 -translate-x-1/2 rounded-full bg-gold-light/45 blur-lg"
        style={{ top: "13%", width: "9%", height: "26%" }} />
      {/* Sun disc */}
      <div className="absolute left-1/2 -translate-x-1/2 rounded-full bg-gold/65"
        style={{ top: "19%", width: "2.5%", height: "11%", minWidth: "10px" }} />

      {/* Horizon */}
      <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/38 to-transparent" style={{ top: "44%" }} />

      {/* Water */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-[#0c1d2e]/85 to-[#060e18]" style={{ top: "44%" }} />

      {/* Sun reflection */}
      <div className="absolute left-1/2 -translate-x-1/2 bg-gradient-to-b from-gold/12 to-transparent blur-sm"
        style={{ top: "44%", width: "16%", height: "38%" }} />

      {/* Shimmer lines */}
      {[
        { l: "12%", r: "12%", top: "54%" },
        { l: "22%", r: "22%", top: "65%" },
        { l: "8%",  r: "8%",  top: "76%" },
        { l: "30%", r: "30%", top: "86%" },
      ].map((s, i) => (
        <div key={i} className="absolute h-px bg-gradient-to-r from-transparent via-gold/14 to-transparent"
          style={{ top: s.top, left: s.l, right: s.r }} />
      ))}

      {/* Homa-Bay shore */}
      <svg aria-hidden="true" viewBox="0 0 320 90" className="absolute bottom-0 left-0 w-[44%]" preserveAspectRatio="none">
        <path d="M0 90 L0 52 C25 46 55 38 85 42 C115 46 145 36 175 40 C205 44 250 48 290 46 L320 44 L320 90 Z" fill="#060e18" />
        <path d="M0 52 C25 46 55 38 85 42 C115 46 145 36 175 40 C205 44 250 48 290 46 L320 44" stroke="#c9a227" strokeWidth="0.5" strokeOpacity="0.22" fill="none" />
      </svg>

      {/* Siaya shore */}
      <svg aria-hidden="true" viewBox="0 0 320 90" className="absolute bottom-0 right-0 w-[44%] -scale-x-100" preserveAspectRatio="none">
        <path d="M0 90 L0 52 C25 46 55 38 85 42 C115 46 145 36 175 40 C205 44 250 48 290 46 L320 44 L320 90 Z" fill="#060e18" />
        <path d="M0 52 C25 46 55 38 85 42 C115 46 145 36 175 40 C205 44 250 48 290 46 L320 44" stroke="#c9a227" strokeWidth="0.5" strokeOpacity="0.22" fill="none" />
      </svg>

      {/* Dhow */}
      <motion.div
        className="absolute"
        style={{ top: "24%", left: "9%" }}
        animate={reduced ? undefined : { y: [0, -4, 0] }}
        transition={reduced ? undefined : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <DhowSilhouette className="w-12 opacity-85 sm:w-16" />
      </motion.div>

      {/* Shore labels */}
      <span className="absolute label-utility text-parchment/28 tracking-widest" style={{ bottom: "10%", left: "2.5%", fontSize: "0.56rem" }}>Homa-Bay</span>
      <span className="absolute label-utility text-parchment/28 tracking-widest" style={{ bottom: "10%", right: "2.5%", fontSize: "0.56rem" }}>Siaya</span>

      {/* Diamond border waterline */}
      <div className="absolute inset-x-0 bottom-0">
        <DiamondBorder />
      </div>
    </div>
  );
}
