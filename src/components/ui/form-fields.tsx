import { cn } from "@/lib/utils";

const fieldBase =
  "w-full min-h-12 rounded-lg border border-gold-deep/50 bg-ink-raised px-4 py-3 text-body text-parchment placeholder:text-parchment/40 transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 disabled:opacity-40 aria-invalid:border-error";

export function FieldLabel({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="label-utility mb-2 block">
      {children}
      {required && <span className="ml-1 text-error">*</span>}
    </label>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-caption text-error">
      {message}
    </p>
  );
}

export function TextField({ className, ...props }: React.ComponentProps<"input">) {
  return <input className={cn(fieldBase, className)} {...props} />;
}

export function TextArea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea className={cn(fieldBase, "min-h-32 resize-y", className)} {...props} />;
}

export function Select({ className, ...props }: React.ComponentProps<"select">) {
  return <select className={cn(fieldBase, "appearance-none", className)} {...props} />;
}
