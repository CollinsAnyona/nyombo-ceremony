import { buildIcsContent } from "@/lib/calendar";

export async function GET() {
  return new Response(buildIcsContent(), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="homa-bay-meets-siaya.ics"',
    },
  });
}
