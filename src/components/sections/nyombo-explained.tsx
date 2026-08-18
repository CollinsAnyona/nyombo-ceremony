import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { FloralCorner } from "@/components/motifs/floral-corner";
import { ceremonyContent } from "@/content/ceremony";

export function NyomboExplained() {
  const { nyomboExplained } = ceremonyContent;

  return (
    <section className="relative overflow-hidden bg-green-royal py-16 sm:py-24">
      <FloralCorner className="pointer-events-none absolute -right-8 -top-8 w-24 opacity-90 sm:w-28" />

      <Container size="prose" className="relative flex flex-col items-center gap-8 text-center">
        <Reveal>
          <SectionHeading eyebrow={nyomboExplained.eyebrow} title={nyomboExplained.heading} />
        </Reveal>

        <div className="flex flex-col gap-5">
          {nyomboExplained.paragraphs.map((paragraph, i) => (
            <Reveal key={i} delay={0.1 + i * 0.1}>
              <p className="text-body-lg text-parchment/90">{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
