import { JWT } from "google-auth-library";
import type { RsvpInput } from "@/lib/rsvp-schema";

const SHEET_RANGE = "RSVPs!A:H";

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
    // Vercel/`.env` store the key with literal `\n` sequences; restore real newlines.
    key: key.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

export async function appendRsvpRow(record: RsvpInput & { submittedAt: string }) {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId) {
    throw new Error("GOOGLE_SHEET_ID is not set — see README for setup.");
  }

  const client = getClient();
  const { token } = await client.getAccessToken();

  const row = [
    record.submittedAt,
    record.name,
    record.attending,
    record.side,
    record.whatsapp,
    record.email ?? "",
    record.guestCount ?? "",
    record.message ?? "",
  ];

  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(
      SHEET_RANGE
    )}:append?valueInputOption=USER_ENTERED`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [row] }),
    }
  );

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Google Sheets append failed (${response.status}): ${body}`);
  }
}
