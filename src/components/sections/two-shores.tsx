import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { GoldWreath } from "@/components/motifs/gold-wreath";
import { DhowSilhouette } from "@/components/motifs/dhow-silhouette";
import { FloralBouquet } from "@/components/motifs/floral-bouquet";
import { ceremonyContent } from "@/content/ceremony";
import { cn } from "@/lib/utils";

function FamilyCard({ label, intro, align }: { label: string; intro: string; align: "left" | "right" }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-gold-deep/40 bg-ink-raised p-6 text-center sm:p-8",
        align === "left" ? "sm:text-left" : "sm:text-right",
      )}
    >
      <p className="label-utility">{label}</p>
      <p className="mt-3 text-body text-parchment/85">{intro}</p>
    </div>
  );
}

export function TwoShores() {
  const { twoShores } = ceremonyContent;

  return (
    <section className="relative overflow-hidden bg-ink py-16 sm:py-24">
      <FloralBouquet className="pointer-events-none absolute -bottom-12 -right-12 w-36 rotate-[8deg] opacity-90 sm:w-44" />

      <Container className="relative flex flex-col items-center gap-10">
        <Reveal>
          <SectionHeading eyebrow={twoShores.eyebrow} title={twoShores.heading} description={twoShores.intro} />
        </Reveal>

        <div className="grid w-full grid-cols-1 items-center gap-8 sm:grid-cols-[1fr_auto_1fr] sm:gap-6">
          <Reveal delay={0.1}>
            <FamilyCard label={twoShores.families.homaBay.label} intro={twoShores.families.homaBay.intro} align="right" />
          </Reveal>

          <Reveal delay={0.2} className="mx-auto">
            <div className="relative w-20 sm:w-24">
              <GoldWreath className="w-full opacity-70" />
              <DhowSilhouette className="absolute inset-0 m-auto w-10 sm:w-12" />
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <FamilyCard label={twoShores.families.siaya.label} intro={twoShores.families.siaya.intro} align="left" />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
