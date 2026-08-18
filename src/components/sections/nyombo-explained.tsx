import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { FloralCorner } from "@/components/motifs/floral-corner";
import { GoldDivider } from "@/components/motifs/gold-divider";
import { ceremonyContent } from "@/content/ceremony";

export function NyomboExplained() {
  const { nyomboExplained } = ceremonyContent;

  return (
    <section className="relative overflow-hidden bg-green-royal py-20 sm:py-28 texture-noise bleed-to-ink">
      {/* Corner florals */}
      <FloralCorner className="pointer-events-none absolute -right-4 -top-4 w-32 opacity-50 sm:w-40" />
      <FloralCorner className="pointer-events-none absolute -bottom-4 -left-4 w-28 rotate-180 opacity-40 sm:w-36" />

      {/* Vertical gold rule — left margin, like a broadsheet column rule */}
      <div className="pointer-events-none absolute bottom-16 left-[max(1.5rem,calc(50%-19rem))] top-16 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent hidden sm:block" />

      <Container size="prose" className="relative flex flex-col items-center gap-8">

        {/* Eyebrow */}
        <Reveal>
          <p className="label-utility text-center tracking-[0.25em]">{nyomboExplained.eyebrow}</p>
        </Reveal>

        {/* Heading — large, centred, engraved */}
        <Reveal delay={0.1}>
          <h2 className="text-center font-display text-gold-engraved leading-tight"
            style={{ fontSize: "clamp(1.8rem, 6vw, 3rem)", letterSpacing: "0.05em" }}>
            {nyomboExplained.heading}
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <GoldDivider className="max-w-40" />
        </Reveal>

        {/* Body copy — drop cap on first paragraph */}
        <div className="prose-drop-cap flex flex-col gap-5 w-full">
          {nyomboExplained.paragraphs.map((paragraph, i) => (
            <Reveal key={i} delay={0.2 + i * 0.12}>
              <p className="text-body-lg text-parchment/90 leading-relaxed">{paragraph}</p>
            </Reveal>
          ))}
        </div>

        {/* Pull quote — the emotional centrepiece of this section */}
        <Reveal delay={0.55} className="w-full">
          <blockquote className="relative border-l-2 border-gold/50 pl-6 py-2 my-2">
            <p className="font-script text-gold-light/90 leading-snug"
              style={{ fontSize: "clamp(1.5rem, 5vw, 2.2rem)" }}>
              Two families. One celebration.
            </p>
          </blockquote>
        </Reveal>

      </Container>
    </section>
  );
}
