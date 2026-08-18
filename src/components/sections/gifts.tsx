import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { GoldDivider } from "@/components/motifs/gold-divider";
import { ceremonyContent } from "@/content/ceremony";
import { siteConfig } from "@/lib/site-config";

export function Gifts() {
  const { gifts } = ceremonyContent;

  return (
    <section className="bg-ink py-16 sm:py-24">
      <Container size="prose" className="flex flex-col items-center gap-6 text-center">
        <Reveal>
          <SectionHeading eyebrow={gifts.eyebrow} title={gifts.heading} />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-body-lg text-parchment/85">{gifts.paragraph}</p>
        </Reveal>

        {siteConfig.gifts.mpesaEnabled && siteConfig.gifts.paybill && (
          <Reveal delay={0.2} className="rounded-2xl border border-gold-deep/40 bg-ink-raised px-8 py-5">
            <p className="label-utility">M-Pesa Paybill</p>
            <p className="mt-1 text-body-lg text-gold-light">{siteConfig.gifts.paybill}</p>
          </Reveal>
        )}

        <GoldDivider className="mt-2 max-w-24" />
      </Container>
    </section>
  );
}
