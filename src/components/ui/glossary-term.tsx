"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Tap-to-reveal Dholuo glossary term with a dotted gold underline (brief Section 6). */
export function GlossaryTerm({ term, definition }: { term: string; definition: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="border-b border-gold-deep/30 py-3">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "font-display text-display-md text-gold-light underline decoration-dotted decoration-2 underline-offset-4",
          "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light",
        )}
      >
        {term}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.p
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden text-body text-parchment/85"
          >
            <span className="block pt-2">{definition}</span>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
