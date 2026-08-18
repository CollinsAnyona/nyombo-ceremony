import { siteConfig } from "@/lib/site-config";

// [CONTENT NEEDED: confirm the ceremony's end time from the order of the
// day — placeholder assumes a 5-hour event ending around 5pm EAT.]
const EVENT_DURATION_HOURS = 5;

function toIcsUtc(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function escapeIcsText(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n");
}

export function getEventWindow() {
  const start = new Date(siteConfig.date.iso);
  const end = new Date(start.getTime() + EVENT_DURATION_HOURS * 60 * 60 * 1000);
  return { start, end };
}

function eventLocation() {
  return `${siteConfig.venue.name}, ${siteConfig.venue.detail}, ${siteConfig.venue.locality}`;
}

function eventDescription() {
  return `${siteConfig.eventType} for ${siteConfig.couple.names}.`;
}

export function buildIcsContent() {
  const { start, end } = getEventWindow();

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Homa-Bay Meets Siaya//Nyombo Ceremony//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:nyombo-ceremony-${start.getTime()}@${new URL(siteConfig.url).hostname}`,
    `DTSTAMP:${toIcsUtc(new Date())}`,
    `DTSTART:${toIcsUtc(start)}`,
    `DTEND:${toIcsUtc(end)}`,
    `SUMMARY:${escapeIcsText(`${siteConfig.name} — ${siteConfig.eventType}`)}`,
    `DESCRIPTION:${escapeIcsText(eventDescription())}`,
    `LOCATION:${escapeIcsText(eventLocation())}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function googleCalendarUrl() {
  const { start, end } = getEventWindow();
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${siteConfig.name} — ${siteConfig.eventType}`,
    dates: `${toIcsUtc(start)}/${toIcsUtc(end)}`,
    details: eventDescription(),
    location: eventLocation(),
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
