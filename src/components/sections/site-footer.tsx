"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Crown } from "@/components/motifs/crown";
import { DhowSilhouette } from "@/components/motifs/dhow-silhouette";
import { Container } from "@/components/ui/container";
import { ceremonyContent } from "@/content/ceremony";
import { siteConfig } from "@/lib/site-config";

function waLink(number: string) {
  return `https://wa.me/${number.replace(/\D/g, "")}`;
}

const STARS = [
  { top: "8%",  left: "12%", size: 1.5, delay: 0 },
  { top: "15%", left: "78%", size: 2,   delay: 0.8 },
  { top: "22%", left: "35%", size: 1.5, delay: 1.4 },
  { top: "10%", left: "55%", size: 2.5, delay: 0.4 },
  { top: "30%", left: "88%", size: 1.5, delay: 1.1 },
  { top: "18%", left: "22%", size: 2,   delay: 1.8 },
  { top: "6%",  left: "65%", size: 1.5, delay: 0.6 },
  { top: "25%", left: "48%", size: 1.5, delay: 2.1 },
  { top: "12%", left: "92%", size: 2,   delay: 0.2 },
  { top: "28%", left: "5%",  size: 1.5, delay: 1.6 },
];

export function SiteFooter() {
  const { footer } = ceremonyContent;
  const reduced = useReducedMotion();

  return (
    <footer className="relative overflow-hidden" style={{ background: "linear-gradient(to bottom, #060e18, #030810)" }}>

      {/* Photo — natural size, centred, fully visible */}
      <div className="flex justify-center px-6 pt-10 pb-2">
        <div className="relative w-full max-w-sm overflow-hidden rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.6)] border border-gold/10">
          <Image
            src="/images/For the end..jpeg"
            alt="Samantha & Michael"
            width={480}
            height={640}
            className="w-full h-auto object-contain"
          />
          {/* Subtle gold vignette */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gold/10 pointer-events-none" />
        </div>
      </div>

      {/* Stars */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {STARS.map((s, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-parchment"
            style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
            animate={reduced ? { opacity: 0.4 } : { opacity: [0.2, 0.9, 0.2] }}
            transition={reduced ? undefined : { duration: 3.5, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Moon glow */}
      <div aria-hidden="true" className="pointer-events-none absolute right-[15%] top-[8%] h-16 w-16 rounded-full bg-parchment/8 blur-xl" />
      <div aria-hidden="true" className="pointer-events-none absolute right-[15%] top-[8%] h-8 w-8 rounded-full bg-parchment/15 blur-md" />

      {/* Horizon line */}
      <div aria-hidden="true" className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" style={{ top: "42%" }} />

      {/* Water reflection */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-transparent to-[#020609]" style={{ top: "42%" }} />
      <div aria-hidden="true" className="absolute inset-x-[20%] h-px bg-gradient-to-r from-transparent via-parchment/8 to-transparent" style={{ top: "58%" }} />
      <div aria-hidden="true" className="absolute inset-x-[30%] h-px bg-gradient-to-r from-transparent via-parchment/5 to-transparent" style={{ top: "72%" }} />

      {/* Dhow at rest — centre of the lake */}
      <div aria-hidden="true" className="absolute left-1/2 -translate-x-1/2" style={{ top: "28%" }}>
        <DhowSilhouette className="w-14 opacity-50 sm:w-18" />
      </div>

      {/* Content */}
      <Container className="relative z-10 flex flex-col items-center gap-7 py-16 text-center sm:py-20">

        <Crown className="w-10 opacity-60" />

        {/* Closing script line */}
        <p className="font-script text-gold-light/90 leading-none"
          style={{ fontSize: "clamp(1.8rem, 6vw, 3rem)" }}>
          {footer.closingLine}
        </p>

        {/* Liaisons */}
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 mt-2">
          {siteConfig.liaisons.map((liaison) => (
            <a
              key={liaison.role}
              href={waLink(liaison.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-body text-parchment/70 underline decoration-gold-deep/40 decoration-dotted underline-offset-4 hover:text-gold-light transition-colors"
            >
              <span className="label-utility block text-gold-light/60 mb-0.5">{liaison.role}</span>
              {liaison.name}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        {/* Hashtags */}
        <p className="label-utility text-parchment/40 tracking-widest">{siteConfig.hashtags.join("   ")}</p>

      </Container>
    </footer>
  );
}
