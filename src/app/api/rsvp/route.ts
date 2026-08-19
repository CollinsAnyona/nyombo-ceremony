import { NextResponse } from "next/server";
import { rsvpSchema } from "@/lib/rsvp-schema";
import { appendRsvpRow } from "@/lib/google-sheets";
import { sendRsvpNotification } from "@/lib/notify";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real guests never fill this hidden field, bots fill every field.
  // Report success without persisting so scrapers don't learn they were caught.
  if (typeof (body as Record<string, unknown>).company === "string" && (body as Record<string, unknown>).company !== "") {
    return NextResponse.json({ ok: true });
  }

  const parsed = rsvpSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid submission." }, { status: 400 });
  }

  const record = { ...parsed.data, submittedAt: new Date().toISOString() };

  try {
    await appendRsvpRow(record);
  } catch (error) {
    console.error("Failed to write RSVP to Google Sheet:", error);
    return NextResponse.json(
      { error: "We couldn't save your RSVP right now — please try again shortly." },
      { status: 502 }
    );
  }

  // Notification email is best-effort — the RSVP is already durably saved above.
  sendRsvpNotification(record).catch((error) => {
    console.error("Failed to send RSVP notification email:", error);
  });

  return NextResponse.json({ ok: true });
}
