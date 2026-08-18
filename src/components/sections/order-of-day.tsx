"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { GoldDivider } from "@/components/motifs/gold-divider";
import { FloralCorner } from "@/components/motifs/floral-corner";
import { ceremonyContent } from "@/content/ceremony";

const EASE = [0.22, 1, 0.36, 1] as const;

export function OrderOfDay() {
  const { orderOfDay } = ceremonyContent;
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-green-royal py-20 sm:py-28 texture-noise">
      <FloralCorner className="pointer-events-none absolute -right-4 -top-4 w-32 opacity-50 sm:w-40" />

      <Container size="prose" className="relative flex flex-col items-center gap-12">

        <Reveal>
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="label-utility tracking-[0.25em]">{orderOfDay.eyebrow}</p>
            <h2 className="font-display text-gold-engraved"
              style={{ fontSize: "clamp(1.8rem, 6vw, 3rem)", letterSpacing: "0.05em" }}>
              {orderOfDay.heading}
            </h2>
            <GoldDivider className="max-w-40" />
          </div>
        </Reveal>

        {/* Timeline */}
        <ol className="relative w-full">
          {/* Vertical connector line */}
          <div aria-hidden="true" className="absolute left-[2.25rem] top-3 bottom-3 w-px bg-gradient-to-b from-transparent via-gold/25 to-transparent sm:left-[2.75rem]" />

          {orderOfDay.items.map((item, i) => (
            <motion.li
              key={item.title}
              className="relative flex items-start gap-5 pb-10 last:pb-0 sm:gap-7"
              initial={reduced ? { opacity: 1 } : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={reduced ? undefined : { duration: 0.7, delay: i * 0.1, ease: EASE }}
            >
              {/* Step marker — circle with number */}
              <div className="relative z-10 flex h-[4.5rem] w-[4.5rem] shrink-0 flex-col items-center justify-center rounded-full border border-gold/40 bg-ink sm:h-[5.5rem] sm:w-[5.5rem]"
                style={{ boxShadow: "0 0 20px rgba(201,162,39,0.12), inset 0 1px 0 rgba(201,162,39,0.15)" }}>
                {/* Large time — split into hour and minutes */}
                <span className="font-display text-gold-engraved leading-none"
                  style={{ fontSize: "clamp(0.9rem, 3vw, 1.2rem)", letterSpacing: "0.04em" }}>
                  {item.time.split(" ")[0]}
                </span>
                <span className="label-utility text-gold/60 leading-none mt-0.5" style={{ fontSize: "0.55rem" }}>
                  {item.time.split(" ").slice(1).join(" ")}
                </span>
              </div>

              {/* Content */}
              <div className="pt-4 sm:pt-5">
                <p className="text-body-lg text-parchment font-medium leading-snug">{item.title}</p>
              </div>
            </motion.li>
          ))}
        </ol>

      </Container>
    </section>
  );
}
