import { DiamondBorder } from "@/components/motifs/diamond-border";
import { FloralCorner } from "@/components/motifs/floral-corner";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Countdown } from "@/components/ui/countdown";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { ceremonyContent } from "@/content/ceremony";
import { siteConfig } from "@/lib/site-config";
import { googleCalendarUrl } from "@/lib/calendar";

export function WhenAndWhere() {
  const { whenWhere } = ceremonyContent;

  return (
    <section id="when-and-where" className="relative overflow-hidden bg-ink py-16 sm:py-24">
      <FloralCorner className="pointer-events-none absolute -left-8 -top-8 w-24 -scale-x-100 opacity-90 sm:w-28" />

      <Container className="relative flex flex-col items-center gap-10">
        <Reveal>
          <SectionHeading eyebrow={whenWhere.eyebrow} title={whenWhere.heading} />
        </Reveal>

        <Reveal delay={0.15} className="w-full max-w-md">
          <div className="rounded-2xl border border-gold-deep/40 bg-ink-raised">
            <DiamondBorder className="rounded-t-2xl" />

            <div className="flex flex-col items-center gap-6 px-6 py-8 text-center">
              <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <p className="label-utility">Date</p>
                  <p className="mt-1 text-body-lg">{siteConfig.date.display}</p>
                </div>
                <div>
                  <p className="label-utility">Arrival</p>
                  <p className="mt-1 text-body-lg">{siteConfig.date.arrivalDisplay.replace("Guests to arrive by ", "")}</p>
                </div>
                <div>
                  <p className="label-utility">Venue</p>
                  <p className="mt-1 text-body-lg">{siteConfig.venue.name}</p>
                </div>
              </div>

              <DiamondBorder className="opacity-60" />

              <div className="flex flex-col items-center gap-2">
                <p className="label-utility">{whenWhere.countdownLabel}</p>
                <Countdown targetIso={siteConfig.date.iso} todayLabel={whenWhere.todayLabel} />
              </div>
            </div>

            <DiamondBorder className="rounded-b-2xl" />
          </div>
        </Reveal>

        <Reveal delay={0.25} className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          <ButtonLink href="/api/calendar" variant="outline">
            Add to calendar (.ics)
          </ButtonLink>
          <ButtonLink href={googleCalendarUrl()} target="_blank" rel="noopener noreferrer" variant="outline">
            Add to Google Calendar
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
