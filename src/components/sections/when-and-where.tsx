import { FloralBouquet } from "@/components/motifs/floral-bouquet";
import { DiamondBorder } from "@/components/motifs/diamond-border";
import { Container } from "@/components/ui/container";
import { Countdown } from "@/components/ui/countdown";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { ceremonyContent } from "@/content/ceremony";
import { siteConfig } from "@/lib/site-config";
import { googleCalendarUrl } from "@/lib/calendar";

export function WhenAndWhere() {
  const { whenWhere } = ceremonyContent;

  return (
    <section id="when-and-where" className="relative overflow-hidden bg-green-royal py-20 sm:py-28 texture-noise bleed-to-ink">
      {/* Bouquet — bottom right, spilling out */}
      <FloralBouquet className="pointer-events-none absolute -bottom-16 -right-12 w-56 opacity-50 sm:w-72" />
      <FloralBouquet className="pointer-events-none absolute -bottom-16 -left-12 w-56 -scale-x-100 opacity-40 sm:w-64" />

      <Container className="relative flex flex-col items-center gap-10">

        <Reveal>
          <p className="label-utility text-center tracking-[0.25em]">{whenWhere.eyebrow}</p>
        </Reveal>

        {/* The carved tablet */}
        <Reveal delay={0.1} className="w-full max-w-2xl">
          <div className="relative rounded-2xl overflow-hidden">
            {/* Tablet background — dark marble feel */}
            <div className="absolute inset-0 bg-ink" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(36,22,16,0.8),rgba(21,12,7,1))]" />

            {/* Top diamond border */}
            <DiamondBorder />

            <div className="relative px-6 py-10 sm:px-12 flex flex-col items-center gap-8 text-center">

              {/* Massive date — the centrepiece of this section */}
              <div className="flex flex-col items-center gap-1">
                <span className="label-utility tracking-[0.3em] text-gold/70">The Day</span>
                <h2 className="font-display text-gold-engraved leading-none mt-2"
                  style={{ fontSize: "clamp(1.6rem, 6vw, 3.2rem)", letterSpacing: "0.06em" }}>
                  Monday
                </h2>
                {/* Giant day number */}
                <div className="font-display text-gold-engraved leading-none"
                  style={{ fontSize: "clamp(5rem, 20vw, 10rem)", letterSpacing: "0.02em", lineHeight: 0.9 }}>
                  21
                </div>
                <h2 className="font-display text-gold-engraved leading-none"
                  style={{ fontSize: "clamp(1.4rem, 5vw, 2.6rem)", letterSpacing: "0.08em" }}>
                  December 2026
                </h2>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

              {/* Time + Venue */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 w-full">
                <div className="flex flex-col items-center gap-1">
                  <p className="label-utility tracking-[0.2em]">Arrival</p>
                  <p className="text-body-lg text-parchment/90 mt-1">12:00 p.m. (EAT)</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <p className="label-utility tracking-[0.2em]">Venue</p>
                  <p className="text-body-lg text-parchment/90 mt-1">{siteConfig.venue.name}</p>
                  <p className="text-caption text-parchment/55">{siteConfig.venue.detail}</p>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

              {/* Countdown */}
              <div className="flex flex-col items-center gap-3">
                <p className="label-utility tracking-[0.2em]">{whenWhere.countdownLabel}</p>
                <Countdown targetIso={siteConfig.date.iso} todayLabel={whenWhere.todayLabel} />
              </div>

            </div>

            {/* Bottom diamond border */}
            <DiamondBorder />
          </div>
        </Reveal>

        {/* Calendar CTAs */}
        <Reveal delay={0.3} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <ButtonLink href="/api/calendar" variant="outline">Add to calendar (.ics)</ButtonLink>
          <ButtonLink href={googleCalendarUrl()} target="_blank" rel="noopener noreferrer" variant="outline">
            Add to Google Calendar
          </ButtonLink>
        </Reveal>

      </Container>
    </section>
  );
}
