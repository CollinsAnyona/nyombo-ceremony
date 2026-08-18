import Link from "next/link";
import { cn } from "@/lib/utils";

const variantClasses = {
  solid:
    "bg-gold hover:bg-gold-light active:bg-gold-deep disabled:bg-ivory-cowrie/40 disabled:text-ink/40 [color:#150c07]",
  outline:
    "border border-gold text-gold-light hover:bg-gold/10 active:bg-gold/20 disabled:border-ivory-cowrie/30 disabled:text-ivory-cowrie/30",
} as const;

type ButtonOwnProps = {
  variant?: keyof typeof variantClasses;
};

// min-h-12 (48px) satisfies the brief's minimum tap-target requirement everywhere, not just the RSVP.
const base =
  "btn-gold-sweep inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 font-utility label-utility transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light disabled:cursor-not-allowed";

export function Button({
  className,
  variant = "solid",
  ...props
}: React.ComponentProps<"button"> & ButtonOwnProps) {
  return <button className={cn(base, variantClasses[variant], className)} {...props} />;
}

export function ButtonLink({
  className,
  variant = "solid",
  href,
  ...props
}: React.ComponentProps<typeof Link> & ButtonOwnProps) {
  return <Link href={href} className={cn(base, variantClasses[variant], className)} {...props} />;
}
