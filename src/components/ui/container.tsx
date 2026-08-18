import { cn } from "@/lib/utils";

export function Container({
  className,
  size = "content",
  ...props
}: React.ComponentProps<"div"> & { size?: "content" | "prose" }) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 sm:px-8",
        size === "content" && "max-w-(--container-content)",
        size === "prose" && "max-w-(--container-prose)",
        className,
      )}
      {...props}
    />
  );
}
