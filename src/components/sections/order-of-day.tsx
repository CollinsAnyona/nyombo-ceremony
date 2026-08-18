"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { FloralCorner } from "@/components/motifs/floral-corner";
import { ceremonyContent } from "@/content/ceremony";

const EASE = [0.22, 1, 0.36, 1] as const;

export function OrderOfDay() {
  const { orderOfDay } = ceremonyContent;
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-green-royal py-16 sm:py-24">
      <FloralCorner className="pointer-events-none absolute -right-8 -top-8 w-24 opacity-90 sm:w-28" />

      <Container size="prose" className="relative flex flex-col items-center gap-10">
        <Reveal>
          <SectionHeading eyebrow={orderOfDay.eyebrow} title={orderOfDay.heading} />
        </Reveal>

        <ol className="relative w-full">
          <div aria-hidden="true" className="absolute left-5 top-2 bottom-2 w-px bg-gold-deep/50 sm:left-6" />

          {orderOfDay.items.map((item, i) => (
            <motion.li
              key={item.title}
              className="relative flex items-start gap-4 pb-8 last:pb-0 sm:gap-6"
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={reduced ? undefined : { duration: 0.7, delay: i * 0.08, ease: EASE }}
            >
              <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold bg-ink font-display text-caption text-gold-light sm:h-12 sm:w-12">
                {i + 1}
              </span>
              <div className="pt-1.5 sm:pt-2.5">
                <p className="label-utility">{item.time}</p>
                <p className="mt-1 text-body-lg text-parchment">{item.title}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
