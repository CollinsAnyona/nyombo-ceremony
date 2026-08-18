import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { FloralCorner } from "@/components/motifs/floral-corner";
import { ButtonLink } from "@/components/ui/button";
import { ceremonyContent } from "@/content/ceremony";
import { siteConfig } from "@/lib/site-config";
import { directionsUrl, embedMapUrl } from "@/lib/maps";

export function GettingThere() {
  const { gettingThere } = ceremonyContent;

  return (
    <section id="getting-there" className="relative overflow-hidden bg-green-royal py-16 sm:py-24 texture-noise bleed-to-ink">
      <FloralCorner className="pointer-events-none absolute -right-8 -top-8 w-24 opacity-90 sm:w-28" />

      <Container className="relative flex flex-col items-center gap-8">
        <Reveal>
          <SectionHeading eyebrow={gettingThere.eyebrow} title={gettingThere.heading} description={gettingThere.lead} />
        </Reveal>

        <Reveal delay={0.15} className="w-full max-w-2xl overflow-hidden rounded-2xl border border-gold-deep/40">
          <iframe
            title={`Map showing ${siteConfig.venue.name}`}
            src={embedMapUrl()}
            className="h-72 w-full sm:h-96"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>

        <Reveal delay={0.25} className="max-w-(--container-prose) space-y-3 text-center text-body text-parchment/85">
          <p>{siteConfig.venue.accessNote}</p>
          <p>{gettingThere.parkingNote}</p>
        </Reveal>

        <Reveal delay={0.35} className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          <ButtonLink href={directionsUrl()} target="_blank" rel="noopener noreferrer">
            {gettingThere.directionsCta}
          </ButtonLink>
          <ButtonLink href={`tel:${siteConfig.venue.phone.replace(/\s+/g, "")}`} variant="outline">
            Call the venue
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
