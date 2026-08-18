import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { rsvpSchema } from "@/lib/rsvp-schema";

/**
 * [SWAP POINT — BRIEF.md Section 3 & 11]: appends to a local JSON-lines file,
 * which only works for local development. Vercel's serverless filesystem is
 * read-only outside /tmp and non-durable across deploys/instances — replace
 * this with the Supabase-or-Google-Sheet write Hemi Tech needs to pick
 * before this ships, plus the notification email (Resend).
 */
const STORE_PATH = path.join(process.cwd(), "data", "rsvps.jsonl");

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

  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  await fs.appendFile(STORE_PATH, `${JSON.stringify(record)}\n`, "utf8");

  return NextResponse.json({ ok: true });
}
