import { Hero } from "@/components/sections/hero";
import { NyomboExplained } from "@/components/sections/nyombo-explained";
import { TwoShores } from "@/components/sections/two-shores";
import { WhenAndWhere } from "@/components/sections/when-and-where";
import { GettingThere } from "@/components/sections/getting-there";
import { DressCode } from "@/components/sections/dress-code";
import { OrderOfDay } from "@/components/sections/order-of-day";
import { Rsvp } from "@/components/sections/rsvp";
import { Gifts } from "@/components/sections/gifts";
import { Faq } from "@/components/sections/faq";
import { SiteFooter } from "@/components/sections/site-footer";
import { TheCrossing } from "@/components/ui/the-crossing";
import { EnvelopeReveal } from "@/components/ui/envelope-reveal";
import { RevealProvider } from "@/lib/reveal-context";

export default function Home() {
  return (
    <RevealProvider>
      <EnvelopeReveal />
      <TheCrossing />
      <main className="flex-1 bg-ink text-parchment pb-16">
        <Hero />
        <NyomboExplained />
        <TwoShores />
        <WhenAndWhere />
        <GettingThere />
        <DressCode />
        <OrderOfDay />
        <Rsvp />
        <Gifts />
        <Faq />
        <SiteFooter />
      </main>
    </RevealProvider>
  );
}
