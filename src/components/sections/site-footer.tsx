import { Crown } from "@/components/motifs/crown";
import { GoldDivider } from "@/components/motifs/gold-divider";
import { Container } from "@/components/ui/container";
import { ceremonyContent } from "@/content/ceremony";
import { siteConfig } from "@/lib/site-config";

function waLink(number: string) {
  return `https://wa.me/${number.replace(/\D/g, "")}`;
}

export function SiteFooter() {
  const { footer } = ceremonyContent;

  return (
    <footer className="bg-green-royal py-14 sm:py-16">
      <Container className="flex flex-col items-center gap-6 text-center">
        <Crown className="w-10 opacity-80" />

        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
          {siteConfig.liaisons.map((liaison) => (
            <a
              key={liaison.role}
              href={waLink(liaison.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-body text-parchment/90 underline decoration-gold-deep/60 decoration-dotted underline-offset-4 hover:text-gold-light"
            >
              <span className="label-utility block text-gold-light/80">{liaison.role}</span>
              {liaison.name}
            </a>
          ))}
        </div>

        <GoldDivider className="max-w-24 opacity-70" />

        <p className="font-script text-script-md text-gold-light">{footer.closingLine}</p>
        <p className="label-utility text-parchment/60">{siteConfig.hashtag}</p>
      </Container>
    </footer>
  );
}
