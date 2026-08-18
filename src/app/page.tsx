import { DiamondBorder } from "@/components/motifs/diamond-border";
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

export default function Home() {
  return (
    <>
      {/* The Crossing — fixed horizon band, dhow sails as you scroll */}
      <TheCrossing />

      {/* pb-16 clears the fixed 64px horizon band so footer text isn't obscured */}
      <main className="flex-1 bg-ink text-parchment pb-16">
        <Hero />

        <NyomboExplained />
        <TwoShores />
        <WhenAndWhere />
        <GettingThere />
        <DressCode />
        <OrderOfDay />

        <DiamondBorder />
        <Rsvp />
        <DiamondBorder />

        <Gifts />
        <Faq />
        <SiteFooter />
      </main>
    </>
  );
}
