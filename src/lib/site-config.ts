// Central place for facts referenced across metadata, structured data,
// forms, and the footer. Swap the [CONTENT NEEDED] values the moment the
// family/liaisons confirm them — nothing else in the codebase should
// hardcode venue/contact/date facts directly.

export const siteConfig = {
  name: "Homa-Bay Meets Siaya",
  shortName: "Homa-Bay Meets Siaya",
  eventType: "Nyombo Ceremony",
  description:
    "Samantha & Michael's Nyombo ceremony — two families, two shores of Lake Victoria, one celebration. Monday 21 December 2026, Villa del Sol, Kisumu.",
  // [CONTENT NEEDED: confirmed production domain — placeholder Vercel URL
  // used so metadataBase stays a valid absolute URL until then.]
  url: "https://homa-bay-meets-siaya.vercel.app",
  locale: "en_US",
  // Default OFF per brief Section 9 — flip once the couple confirms the
  // page should be publicly discoverable rather than link-only.
  indexable: false,

  couple: {
    names: "Samantha & Michael",
    partnerA: "Samantha",
    partnerB: "Michael",
  },

  date: {
    iso: "2026-12-21T12:00:00+03:00",
    display: "Monday, 21st December 2026",
    arrivalDisplay: "Guests to arrive by 12:00 p.m. (EAT, UTC+3)",
    timezone: "Africa/Nairobi",
  },

  venue: {
    name: "Villa del Sol",
    detail: "Paga Beach, on the shore of Lake Victoria",
    locality: "Kisumu, Kenya",
    // Venue phone — use only in a "getting there" context, never presented
    // as a family contact.
    phone: "+254 796 533678",
    geo: {
      latitude: -0.114022,
      longitude: 34.6439129,
    },
    googlePlaceId: "ChIJKYXFVz2vKhgRTQQLo3abTfU",
    // [CONTENT NEEDED: parking, shuttle, recommended route, whether a
    // family car convoy is being organised.]
    accessNote:
      "Villa del Sol sits off the tarmac on a rough access road toward Paga Beach — plan to arrive in daylight and drive slowly on the final stretch.",
  },

  dressCode: {
    label: "Traditional | Elegant",
  },

  welcome: {
    dholuo: "Wuod dhi e pinyni!",
    english: "You are most welcome!",
    dholuoGreeting: "Karibuni sana!",
  },

  // [CONTENT NEEDED: exact Dholuo transcription and spelling for the line
  // above "Love is patient, love is kind." on the printed card — do not
  // guess, mis-set Dholuo is worse than none. English scripture line is
  // confirmed and safe to ship as-is.]
  scripture: {
    dholuo: "[CONTENT NEEDED: exact Dholuo transcription]",
    english: "Love is patient, love is kind.",
    reference: "1 Corinthians 13:4",
  },

  // [CONTENT NEEDED: real family liaison names and WhatsApp numbers.]
  liaisons: [
    {
      name: "[CONTENT NEEDED: Homa-Bay side liaison name]",
      role: "Bride's side liaison",
      whatsapp: "+254700000001",
    },
    {
      name: "[CONTENT NEEDED: Siaya side liaison name]",
      role: "Groom's side liaison",
      whatsapp: "+254700000002",
    },
  ],

  // [CONTENT NEEDED: confirm before enabling — never hardcode a paybill,
  // till, or phone number that hasn't been confirmed in writing.]
  gifts: {
    mpesaEnabled: false,
    paybill: "",
    till: "",
  },

  // [CONTENT NEEDED: confirm hashtag.]
  hashtag: "#HomaBayMeetsSiaya2026",

  // Both default OFF per brief — flip only on explicit confirmation.
  features: {
    publicGuestWall: false,
    ambientAudio: false,
  },

  // [CONTENT NEEDED: RSVP deadline.]
  rsvpDeadline: "[CONTENT NEEDED: RSVP deadline date]",
} as const;
