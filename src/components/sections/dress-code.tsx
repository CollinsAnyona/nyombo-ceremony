import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { GoldDivider } from "@/components/motifs/gold-divider";
import { FloralCorner } from "@/components/motifs/floral-corner";
import { ceremonyContent } from "@/content/ceremony";

const SWATCHES = [
  { label: "Ink",          bg: "#150c07", border: "#8a6318", accent: "#c9a227" },
  { label: "Royal Green",  bg: "#14301c", border: "#4a8f5c", accent: "#4a8f5c" },
  { label: "Gold",         bg: "#c9a227", border: "#e8c87a", accent: "#150c07" },
  { label: "Amber Sunset", bg: "#d98a2b", border: "#e8c87a", accent: "#150c07" },
];

export function DressCode() {
  const { dressCode } = ceremonyContent;

  return (
    <section className="relative overflow-hidden bg-ink py-20 sm:py-28 texture-noise">
      <FloralCorner className="pointer-events-none absolute -left-4 -top-4 w-32 -scale-x-100 opacity-50 sm:w-40" />

      <Container className="relative flex flex-col items-center gap-12">

        <Reveal>
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="label-utility tracking-[0.25em]">{dressCode.eyebrow}</p>
            <h2 className="font-display text-gold-engraved"
              style={{ fontSize: "clamp(1.8rem, 6vw, 3rem)", letterSpacing: "0.05em" }}>
              {dressCode.heading}
            </h2>
            <GoldDivider className="max-w-40" />
            <p className="text-body text-parchment/75 max-w-lg mt-1">{dressCode.intro}</p>
          </div>
        </Reveal>

        {/* Fabric swatches — larger, with texture overlay and label beneath */}
        <Reveal delay={0.1} className="flex flex-wrap justify-center gap-6 sm:gap-8">
          {SWATCHES.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-3">
              <div
                className="relative h-20 w-20 rounded-xl sm:h-24 sm:w-24 overflow-hidden"
                style={{
                  backgroundColor: s.bg,
                  boxShadow: `0 0 0 1px ${s.border}40, 0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 ${s.border}60`,
                }}
              >
                {/* Fabric weave texture */}
                <div className="absolute inset-0 opacity-[0.07]"
                  style={{
                    backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px), repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)`,
                  }}
                />
                {/* Specular highlight */}
                <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/10 to-transparent" />
              </div>
              <span className="label-utility text-center" style={{ color: s.border }}>{s.label}</span>
            </div>
          ))}
        </Reveal>

        {/* Guidance cards — colour-coded left border */}
        <div className="grid w-full max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2">
          <Reveal delay={0.2}>
            <div className="rounded-2xl border border-gold-deep/25 bg-ink-raised overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-gold via-amber-sunset to-gold" />
              <div className="p-6 sm:p-7">
                <p className="label-utility">For Women</p>
                <p className="mt-3 text-body text-parchment/85 leading-relaxed">{dressCode.guidance.women}</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="rounded-2xl border border-gold-deep/25 bg-ink-raised overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-gold via-amber-sunset to-gold" />
              <div className="p-6 sm:p-7">
                <p className="label-utility">For Men</p>
                <p className="mt-3 text-body text-parchment/85 leading-relaxed">{dressCode.guidance.men}</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Avoid note — subtle, italic */}
        <Reveal delay={0.4} className="max-w-lg text-center">
          <p className="text-body italic text-parchment/50">{dressCode.avoid}</p>
        </Reveal>

      </Container>
    </section>
  );
}
