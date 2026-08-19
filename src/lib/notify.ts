import { Resend } from "resend";
import type { RsvpInput } from "@/lib/rsvp-schema";

export async function sendRsvpNotification(record: RsvpInput & { submittedAt: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RSVP_NOTIFY_EMAIL;
  const from = process.env.RSVP_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    // Notification email is a nice-to-have on top of the Sheet; missing
    // config here shouldn't fail the RSVP itself.
    console.warn("RSVP notification skipped — RESEND_API_KEY / RSVP_NOTIFY_EMAIL / RSVP_FROM_EMAIL not fully set.");
    return;
  }

  const resend = new Resend(apiKey);
  const attendingLine = record.attending === "yes" ? "IS coming" : "can't make it";

  await resend.emails.send({
    from,
    to,
    subject: `RSVP: ${record.name} ${attendingLine}`,
    text: [
      `Name: ${record.name}`,
      `Attending: ${record.attending}`,
      `Side: ${record.side}`,
      `WhatsApp: ${record.whatsapp}`,
      record.email ? `Email: ${record.email}` : null,
      record.guestCount ? `Guest count: ${record.guestCount}` : null,
      record.message ? `Message: ${record.message}` : null,
      `Submitted: ${record.submittedAt}`,
    ]
      .filter(Boolean)
      .join("\n"),
  });
}
