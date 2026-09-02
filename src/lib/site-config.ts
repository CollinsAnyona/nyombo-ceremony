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
  // Live Vercel URL — swap for a custom domain if the couple gets one.
  url: "https://nyombo-ceremony.vercel.app",
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
    // Confirmed: no organised family convoy — guests self-drive using this note.
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

  // Dholuo transcription confirmed.
  scripture: {
    dholuo: "Hera en kinda, hera en ber.",
    english: "Love is patient, love is kind.",
    reference: "1 Corinthians 13:4",
  },

  liaisons: [
    {
      name: "Samantha",
      role: "Bride's side liaison",
      whatsapp: "+254712345678",
    },
    {
      name: "Michael",
      role: "Groom's side liaison",
      whatsapp: "+254723456789",
    },
  ],

  // Confirmed: presence-only, no M-Pesa number to publish.
  gifts: {
    mpesaEnabled: false,
    paybill: "",
    till: "",
  },

  hashtags: ["#HomaBayMeetsSiaya", "#LoveTheAtakaWay"],

  features: {
    publicGuestWall: false,
    ambientAudio: false,
  },

  rsvpDeadline: "Friday, 4th December 2026",
} as const;
