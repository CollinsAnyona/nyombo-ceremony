"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { GlossaryTerm } from "@/components/ui/glossary-term";
import { GoldDivider } from "@/components/motifs/gold-divider";
import { ceremonyContent } from "@/content/ceremony";

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="border-b border-gold-deep/30 py-4 text-left">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 text-left text-body-lg text-parchment focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light"
      >
        {question}
        <span aria-hidden="true" className={`text-gold-light transition-transform duration-200 ${open ? "rotate-45" : ""}`}>
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pt-3 text-body text-parchment/80">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  const { faq } = ceremonyContent;

  return (
    <section id="faq" className="bg-ink py-16 sm:py-24">
      <Container size="prose" className="flex flex-col items-center gap-10">
        <Reveal>
          <SectionHeading eyebrow={faq.eyebrow} title={faq.heading} />
        </Reveal>

        <Reveal delay={0.1} className="w-full">
          {faq.items.map((item) => (
            <FaqItem key={item.question} question={item.question} answer={item.answer} />
          ))}
        </Reveal>

        <Reveal delay={0.2} className="flex flex-col items-center gap-4">
          <GoldDivider className="max-w-24" />
          <p className="label-utility">A few Dholuo words</p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {faq.glossary.map((entry) => (
              <GlossaryTerm key={entry.term} term={entry.term} definition={entry.definition} />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
