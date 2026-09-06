import { JWT } from "google-auth-library";
import type { RsvpInput } from "@/lib/rsvp-schema";

const SHEET_NAME = "RSVPs";
const SHEET_RANGE = `${SHEET_NAME}!A:G`;
// Column E holds WhatsApp number — the dedup key for "one submission per guest".
const WHATSAPP_COLUMN_INDEX = 4;

// Kenyan numbers show up as "+254712345678", "0712345678", "254 712 345 678",
// etc. Comparing the last 9 digits (the subscriber number without country
// code or trunk prefix) matches all of those without needing strict formatting.
function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.slice(-9);
}

function getClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY;
  if (!email || !key) {
    throw new Error(
      "GOOGLE_SERVICE_ACCOUNT_EMAIL / GOOGLE_PRIVATE_KEY are not set — see README for setup."
    );
  }
  return new JWT({
    email,
    // Vercel/`.env` store the key with literal `\n` sequences; restore real
    // newlines. Also strip stray `\r` — copy/paste into Vercel's env var UI
    // can turn escaped `\n`s into real CRLF line breaks, and a `\r` inside
    // the base64 body makes Node's OpenSSL-3 PEM decoder throw
    // ERR_OSSL_UNSUPPORTED ("DECODER routines::unsupported").
    key: key.replace(/\\n/g, "\n").replace(/\r/g, ""),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

async function findExistingRowNumber(sheetId: string, token: string, whatsapp: string) {
  const target = normalizePhone(whatsapp);
  if (!target) return null;

  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(SHEET_RANGE)}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Google Sheets read failed (${response.status}): ${body}`);
  }

  const { values } = (await response.json()) as { values?: string[][] };
  if (!values) return null;

  // Row 1 is the header; sheet rows are 1-indexed, so data row i is values[i].
  for (let i = 1; i < values.length; i++) {
    const existingWhatsapp = values[i]?.[WHATSAPP_COLUMN_INDEX];
    if (existingWhatsapp && normalizePhone(existingWhatsapp) === target) {
      return i + 1;
    }
  }
  return null;
}

export async function appendRsvpRow(record: RsvpInput & { submittedAt: string }) {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId) {
    throw new Error("GOOGLE_SHEET_ID is not set — see README for setup.");
  }

  const client = getClient();
  const { token } = await client.getAccessToken();
  if (!token) {
    throw new Error("Failed to obtain a Google access token.");
  }

  const row = [
    record.submittedAt,
    record.name,
    record.attending,
    record.side,
    record.whatsapp,
    record.email ?? "",
    record.message ?? "",
  ];

  // Same WhatsApp number RSVPing again means they're changing their answer,
  // not a second guest — overwrite their existing row instead of appending.
  const existingRow = await findExistingRowNumber(sheetId, token, record.whatsapp);

  const url = existingRow
    ? `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(
        `${SHEET_NAME}!A${existingRow}:G${existingRow}`
      )}?valueInputOption=USER_ENTERED`
    : `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(
        SHEET_RANGE
      )}:append?valueInputOption=USER_ENTERED`;

  const response = await fetch(url, {
    method: existingRow ? "PUT" : "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values: [row] }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Google Sheets ${existingRow ? "update" : "append"} failed (${response.status}): ${body}`);
  }
}
