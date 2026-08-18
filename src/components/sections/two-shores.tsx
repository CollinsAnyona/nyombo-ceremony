"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { DhowSilhouette } from "@/components/motifs/dhow-silhouette";
import { GoldDivider } from "@/components/motifs/gold-divider";
import { ceremonyContent } from "@/content/ceremony";

export function TwoShores() {
  const { twoShores } = ceremonyContent;
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const leftX  = useTransform(scrollYProgress, [0.1, 0.6], ["-8%", "0%"]);
  const rightX = useTransform(scrollYProgress, [0.1, 0.6], ["8%", "0%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink py-20 sm:py-28 texture-noise">

      {/* Ambient lake glow at centre */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-64 bg-[radial-gradient(ellipse_50%_100%_at_50%_50%,rgba(13,32,53,0.6),transparent)]" />

      <Container className="relative flex flex-col items-center gap-12">

        <Reveal>
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="label-utility tracking-[0.25em]">{twoShores.eyebrow}</p>
            <h2 className="font-display text-gold-engraved"
              style={{ fontSize: "clamp(1.6rem, 5.5vw, 2.8rem)", letterSpacing: "0.05em" }}>
              {twoShores.heading}
            </h2>
            <GoldDivider className="max-w-40" />
            <p className="text-body text-parchment/75 max-w-lg mt-1">{twoShores.intro}</p>
          </div>
        </Reveal>

        {/* The convergence — two cards moving toward each other */}
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-[1fr_auto_1fr] sm:gap-4 items-center">

          {/* Homa-Bay card */}
          <motion.div
            style={reduced ? undefined : { x: leftX }}
            className="will-change-transform"
          >
            <Reveal delay={0.1}>
              <div className="relative rounded-2xl border border-gold-deep/30 bg-ink-raised p-6 sm:p-8 overflow-hidden">
                {/* Top accent bar */}
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                <p className="label-utility text-center sm:text-left">{twoShores.families.homaBay.label}</p>
                <div className="mt-3 h-px w-12 bg-gold/30 hidden sm:block" />
                <p className="mt-3 text-body text-parchment/80 text-center sm:text-left leading-relaxed">
                  {twoShores.families.homaBay.intro}
                </p>
                {/* Bottom accent */}
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
              </div>
            </Reveal>
          </motion.div>

          {/* Centre: dhow on the lake */}
          <Reveal delay={0.2} className="mx-auto flex flex-col items-center gap-3">
            <div className="relative flex flex-col items-center">
              {/* Vertical lake strip */}
              <div className="hidden sm:block w-px h-16 bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
              <motion.div
                animate={reduced ? undefined : { y: [0, -5, 0] }}
                transition={reduced ? undefined : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <DhowSilhouette className="w-16 sm:w-20 opacity-80" />
              </motion.div>
              <div className="hidden sm:block w-px h-16 bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
              {/* Lake shimmer */}
              <div className="hidden sm:block w-20 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mt-1" />
            </div>
          </Reveal>

          {/* Siaya card */}
          <motion.div
            style={reduced ? undefined : { x: rightX }}
            className="will-change-transform"
          >
            <Reveal delay={0.3}>
              <div className="relative rounded-2xl border border-gold-deep/30 bg-ink-raised p-6 sm:p-8 overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                <p className="label-utility text-center sm:text-right">{twoShores.families.siaya.label}</p>
                <div className="mt-3 h-px w-12 bg-gold/30 ml-auto hidden sm:block" />
                <p className="mt-3 text-body text-parchment/80 text-center sm:text-right leading-relaxed">
                  {twoShores.families.siaya.intro}
                </p>
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
              </div>
            </Reveal>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
