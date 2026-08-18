import { cn } from "@/lib/utils";
import { GoldDivider } from "@/components/motifs/gold-divider";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-(--container-prose)", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="label-utility">{eyebrow}</p>}
      <h2 className="mt-3 text-display-lg font-display text-gold-engraved">{title}</h2>
      <div className={cn("mt-4", align === "center" && "flex justify-center")}>
        <GoldDivider className="max-w-32" />
      </div>
      {description && <p className="mt-4 text-body-lg text-parchment/85">{description}</p>}
    </div>
  );
}
