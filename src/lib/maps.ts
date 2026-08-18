import { siteConfig } from "@/lib/site-config";

/** Google Maps "directions to" deep link — works without any API key. */
export function directionsUrl() {
  const { latitude, longitude } = siteConfig.venue.geo;
  const params = new URLSearchParams({
    api: "1",
    destination: `${latitude},${longitude}`,
    destination_place_id: siteConfig.venue.googlePlaceId,
  });
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

/**
 * Keyless embeddable map — no Google Maps API key/billing required, unlike
 * the official Maps Embed/JS APIs. Flagged as a swap point: if a real API
 * key becomes available later, this can upgrade to a richer interactive
 * embed without touching the rest of the section.
 */
export function embedMapUrl() {
  const { latitude, longitude } = siteConfig.venue.geo;
  const params = new URLSearchParams({
    q: `${latitude},${longitude}`,
    z: "15",
    output: "embed",
  });
  return `https://www.google.com/maps?${params.toString()}`;
}
