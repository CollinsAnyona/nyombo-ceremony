"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { CowrieShell } from "@/components/motifs/cowrie-shell";
import { FloralCorner } from "@/components/motifs/floral-corner";
import { FieldLabel, FieldError, TextField, TextArea, Select } from "@/components/ui/form-fields";
import { ceremonyContent } from "@/content/ceremony";

type Attending = "yes" | "no";

const initialValues = { name: "", whatsapp: "", email: "", side: "", guestCount: "1", message: "", company: "" };

export function Rsvp() {
  const { rsvp } = ceremonyContent;
  const [attending, setAttending] = useState<Attending | null>(null);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [confirmedName, setConfirmedName] = useState<string | null>(null);

  function setField<K extends keyof typeof values>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function validate() {
    const next: Record<string, string> = {};
    if (!attending) next.attending = "Please choose whether you'll be attending.";
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (values.whatsapp.trim().length < 7) next.whatsapp = "Please enter a valid WhatsApp number.";
    if (!values.side) next.side = "Please let us know which side you're joining from.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          attending,
          name: values.name.trim(),
          whatsapp: values.whatsapp.trim(),
          email: values.email.trim(),
          side: values.side,
          guestCount: attending === "yes" ? Number(values.guestCount) || 1 : undefined,
          message: values.message.trim(),
          company: values.company,
        }),
      });

      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok || !data?.ok) {
        setServerError(data?.error ?? "Something went wrong — please try again.");
        return;
      }

      setConfirmedName(values.name.trim());
    } catch {
      setServerError("Something went wrong — please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmedName) {
    return (
      <section id="rsvp" className="relative overflow-hidden bg-ink-raised py-16 sm:py-24 bleed-to-lake">
        <Container size="prose" className="flex flex-col items-center gap-4 text-center">
          <CowrieShell selected className="w-16" />
          <p className="font-script text-script-md text-gold-light">{rsvp.confirmation(confirmedName)}</p>
          <p className="text-body text-parchment/80">{rsvp.editNote}</p>
        </Container>
      </section>
    );
  }

  return (
    <section id="rsvp" className="relative overflow-hidden bg-ink-raised py-16 sm:py-24 bleed-to-lake">
      <FloralCorner className="pointer-events-none absolute -left-8 -top-8 w-24 -scale-x-100 opacity-90 sm:w-28" />

      <Container size="prose" className="relative flex flex-col items-center gap-10">
        <Reveal>
          <SectionHeading eyebrow={rsvp.eyebrow} title={rsvp.heading} description={rsvp.subheading} />
        </Reveal>

        <Reveal delay={0.1} className="w-full">
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
            {/* honeypot — hidden from real guests, left in the tab order for nobody since it's visually and structurally absent for sighted/AT users */}
            <input
              type="text"
              value={values.company}
              onChange={(e) => setField("company", e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            <div role="radiogroup" aria-label="Are you attending?" className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-10">
              {(["yes", "no"] as const).map((choice) => (
                <button
                  key={choice}
                  type="button"
                  role="radio"
                  aria-checked={attending === choice}
                  onClick={() => setAttending(choice)}
                  className="flex flex-col items-center gap-2 rounded-2xl p-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light"
                >
                  <CowrieShell selected={attending === choice} className="w-24 sm:w-28" />
                  <span className="text-body text-parchment/90">
                    {choice === "yes" ? rsvp.attendingLabel : rsvp.notAttendingLabel}
                  </span>
                </button>
              ))}
            </div>
            {errors.attending && <p role="alert" className="text-center text-caption text-error">{errors.attending}</p>}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <FieldLabel htmlFor="name" required>
                  {rsvp.fields.name}
                </FieldLabel>
                <TextField
                  id="name"
                  value={values.name}
                  onChange={(e) => setField("name", e.target.value)}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  autoComplete="name"
                />
                <FieldError id="name-error" message={errors.name} />
              </div>

              <div>
                <FieldLabel htmlFor="whatsapp" required>
                  {rsvp.fields.whatsapp}
                </FieldLabel>
                <TextField
                  id="whatsapp"
                  type="tel"
                  placeholder="+254 7xx xxx xxx"
                  value={values.whatsapp}
                  onChange={(e) => setField("whatsapp", e.target.value)}
                  aria-invalid={!!errors.whatsapp}
                  aria-describedby={errors.whatsapp ? "whatsapp-error" : undefined}
                  autoComplete="tel"
                />
                <FieldError id="whatsapp-error" message={errors.whatsapp} />
              </div>

              <div>
                <FieldLabel htmlFor="email">{rsvp.fields.email}</FieldLabel>
                <TextField
                  id="email"
                  type="email"
                  value={values.email}
                  onChange={(e) => setField("email", e.target.value)}
                  autoComplete="email"
                />
              </div>

              <div>
                <FieldLabel htmlFor="side" required>
                  {rsvp.fields.side}
                </FieldLabel>
                <Select
                  id="side"
                  value={values.side}
                  onChange={(e) => setField("side", e.target.value)}
                  aria-invalid={!!errors.side}
                  aria-describedby={errors.side ? "side-error" : undefined}
                >
                  <option value="" disabled>
                    Choose one
                  </option>
                  {rsvp.sideOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
                <FieldError id="side-error" message={errors.side} />
              </div>

              {attending === "yes" && (
                <div>
                  <FieldLabel htmlFor="guestCount">{rsvp.fields.guestCount}</FieldLabel>
                  <Select id="guestCount" value={values.guestCount} onChange={(e) => setField("guestCount", e.target.value)}>
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </Select>
                </div>
              )}

              <div className={attending === "no" ? "sm:col-span-2" : ""}>
                <FieldLabel htmlFor="message">{rsvp.fields.message}</FieldLabel>
                <TextArea
                  id="message"
                  value={values.message}
                  onChange={(e) => setField("message", e.target.value)}
                  className={attending === "no" ? "min-h-40" : undefined}
                />
              </div>
            </div>

            {serverError && (
              <p role="alert" className="text-center text-caption text-error">
                {serverError}
              </p>
            )}

            <Button type="submit" disabled={submitting} className="mx-auto">
              {submitting ? "Placing your cowrie…" : "Place your cowrie"}
            </Button>
          </form>
        </Reveal>
      </Container>
    </section>
  );
}
