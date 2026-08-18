import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { FloralCorner } from "@/components/motifs/floral-corner";
import { ceremonyContent } from "@/content/ceremony";

const SWATCH_COLORS: Record<string, string> = {
  Ink: "var(--color-ink)",
  "Royal Green": "var(--color-green-royal)",
  Gold: "var(--color-gold)",
  "Amber Sunset": "var(--color-amber-sunset)",
};

export function DressCode() {
  const { dressCode } = ceremonyContent;

  return (
    <section className="relative overflow-hidden bg-ink py-16 sm:py-24">
      <FloralCorner className="pointer-events-none absolute -left-8 -top-8 w-24 -scale-x-100 opacity-90 sm:w-28" />

      <Container className="relative flex flex-col items-center gap-10">
        <Reveal>
          <SectionHeading eyebrow={dressCode.eyebrow} title={dressCode.heading} description={dressCode.intro} />
        </Reveal>

        <Reveal delay={0.1} className="flex flex-wrap justify-center gap-6">
          {dressCode.swatchLabels.map((label) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <span
                className="h-12 w-12 rounded-full border border-gold-deep/50 shadow-[0_0_0_1px_var(--color-gold-deep)]"
                style={{ backgroundColor: SWATCH_COLORS[label] ?? "var(--color-gold)" }}
              />
              <span className="label-utility">{label}</span>
            </div>
          ))}
        </Reveal>

        <div className="grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
          <Reveal delay={0.2} className="rounded-2xl border border-gold-deep/40 bg-ink-raised p-6">
            <p className="label-utility">For women</p>
            <p className="mt-3 text-body text-parchment/85">{dressCode.guidance.women}</p>
          </Reveal>
          <Reveal delay={0.3} className="rounded-2xl border border-gold-deep/40 bg-ink-raised p-6">
            <p className="label-utility">For men</p>
            <p className="mt-3 text-body text-parchment/85">{dressCode.guidance.men}</p>
          </Reveal>
        </div>

        <Reveal delay={0.4} className="max-w-(--container-prose) text-center text-body text-parchment/70">
          <p>{dressCode.avoid}</p>
        </Reveal>
      </Container>
    </section>
  );
}
