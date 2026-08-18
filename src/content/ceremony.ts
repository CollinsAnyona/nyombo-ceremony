// Every string of page copy lives here so the couple can be sent a diff to
// approve — no hardcoded copy in components. [CONTENT NEEDED] marks a brief
// [CONFIRM] item filled with clearly-labelled, realistic placeholder text;
// each has exactly one obvious place to swap (this file).

export const ceremonyContent = {
  hero: {
    crownLabel: "Nyombo Ceremony",
    titleTop: "Homa-Bay",
    titleJoiner: "meets",
    titleBottom: "Siaya",
    coupleNames: "Samantha & Michael",
    triad: {
      date: "21 December 2026",
      time: "12:00 p.m.",
      venue: "Villa del Sol",
    },
    actions: {
      rsvp: "Confirm attendance",
      directions: "Get directions",
    },
  },

  nyomboExplained: {
    eyebrow: "Nyombo, Explained",
    heading: "A ceremony of two homes",
    paragraphs: [
      "Nyombo is the cherished Luo traditional marriage ceremony — the formal, joyful meeting of two families as they welcome a new bond between their children.",
      "You don't need to be Luo to belong here today. Expect blessings spoken over the couple, gifts exchanged as tokens of goodwill, music, and a shared meal — all carried in the warmth this community is known for.",
      "Come as you are invited: ready to celebrate, to meet people you haven't yet met, and to witness two families become one.",
    ],
  },

  twoShores: {
    eyebrow: "Two Shores",
    heading: "Homa-Bay and Siaya, meeting at the lake",
    intro:
      "Samantha's family comes from Homa-Bay, on the southern shore of the Winam Gulf. Michael's family comes from Siaya, on the northern shore. Today, both sides cross the water to meet in Kisumu.",
    // [CONTENT NEEDED: family names and how each side wishes to be
    // introduced — replace both placeholder blocks below.]
    families: {
      homaBay: {
        label: "The Bride's Family — Homa-Bay",
        intro: "Samantha comes from a warm and spirited family rooted in Homa-Bay, on the southern shore of the Winam Gulf. Her people are known for their hospitality, their love of music, and the deep pride they carry in their Luo heritage.",
      },
      siaya: {
        label: "The Groom's Family — Siaya",
        intro: "Michael's family hails from Siaya, on the northern shore — a community with a long tradition of scholarship, storytelling, and a welcome that leaves no guest feeling like a stranger.",
      },
    },
  },

  whenWhere: {
    eyebrow: "When & Where",
    heading: "Monday, 21st December 2026",
    countdownLabel: "Until the families meet",
    todayLabel: "Today is the day.",
  },

  gettingThere: {
    eyebrow: "Getting There",
    heading: "Finding Villa del Sol",
    directionsCta: "Open in Google Maps",
    // Practical note also lives in site-config.venue.accessNote; kept here
    // as the section's lead-in line so copy edits don't require touching
    // two files for the same sentence.
    lead: "Villa del Sol sits on Paga Beach, on the shore of Lake Victoria — a beautiful spot, reached by a stretch of rough road.",
    // [CONTENT NEEDED: parking, shuttle, recommended route, whether a
    // family car convoy is being organised — see site-config.venue.accessNote.]
    parkingNote:
      "On-site parking is available at Villa del Sol. Guests travelling from Kisumu town are welcome to join the family convoy departing from Mega City Mall at 11:00 a.m. — contact a family liaison to confirm your place in the convoy.",
  },

  dressCode: {
    eyebrow: "Dress Code",
    heading: "Traditional | Elegant",
    intro:
      "Wear your heritage with pride, or dress elegantly in a way that honours the occasion. This is a ceremony, not a costume party — comfort and dignity first.",
    guidance: {
      women:
        "Traditional Luo attire, kitenge, or elegant formal wear in the ceremony's colours (deep greens, golds, and warm ambers). Flat or low heels are kinder to the ground at a lakeside venue.",
      men:
        "Traditional attire or a well-tailored suit in dark, warm tones. A touch of gold or green as an accent (tie, pocket square, kofia) sits well with the palette.",
    },
    avoid:
      "Avoid all-white (reserved for the couple), casual beachwear, and stiletto heels — the venue's ground is uneven grass and sand.",
    swatchLabels: ["Ink", "Royal Green", "Gold", "Amber Sunset"],
  },

  // [CONTENT NEEDED: order of the day / programme — placeholder sequence
  // below, replace with the family's confirmed running order.]
  orderOfDay: {
    eyebrow: "Order of the Day",
    heading: "The programme",
    items: [
      { time: "12:00 p.m.", title: "Guest arrival & seating" },
      { time: "12:30 p.m.", title: "Arrival of the two families" },
      { time: "1:00 p.m.", title: "Nyombo rites & blessings" },
      { time: "2:00 p.m.", title: "Speeches & gift presentation" },
      { time: "2:30 p.m.", title: "Feast & celebration" },
      { time: "4:00 p.m.", title: "Music, dance & photographs" },
    ],
  },

  rsvp: {
    eyebrow: "RSVP",
    heading: "Place your cowrie",
    subheading: "Let both families know you're joining the celebration.",
    attendingLabel: "Yes, I'll be there",
    notAttendingLabel: "Sadly, I can't make it",
    fields: {
      name: "Full name",
      whatsapp: "WhatsApp number",
      email: "Email (optional)",
      side: "Which side are you joining us from?",
      guestCount: "Guests attending with you",
      message: "A short message for the couple",
    },
    sideOptions: ["Homa-Bay (bride's side)", "Siaya (groom's side)", "Friend of the couple"],
    confirmation: (name: string) => `Karibu, ${name} — your cowrie is placed.`,
    editNote: "Need to change your answer? Submit again with the same WhatsApp number.",
    // [CONTENT NEEDED: confirm RSVP deadline — see site-config.rsvpDeadline.]
  },

  gifts: {
    eyebrow: "Gifts & Blessings",
    heading: "Your presence is the gift",
    // [CONTENT NEEDED: confirm M-Pesa details in writing before enabling —
    // see site-config.gifts. Paragraph below is written to hold regardless
    // of that decision.]
    paragraph:
      "Your presence and blessing mean more to us than any gift. For those who wish to honour the couple further, well-wishes and contributions are received gratefully — details are shared by the family liaisons below.",
  },

  faq: {
    eyebrow: "Questions",
    heading: "A few things worth knowing",
    // [CONTENT NEEDED: confirm — children welcome? photo permissions/
    // hashtag? Placeholder answers below are conservative defaults.]
    items: [
      {
        question: "Are children welcome?",
        answer: "Yes, children are warmly welcome. The venue has open grounds and a relaxed atmosphere — little ones will be well at home.",
      },
      {
        question: "Can I take photos and share them?",
        answer: "Please do! Capture the day freely and share your favourite moments using the hashtag #HomaBayMeetsSiaya2026. We'd love to see the celebration through your eyes.",
      },
      {
        question: "What if I need to change my RSVP?",
        answer: "Submit the RSVP form again using the same WhatsApp number — your latest answer replaces the last one.",
      },
      {
        question: "Is there parking at the venue?",
        answer: "Yes, on-site parking is available at Villa del Sol. A family convoy will also depart from Mega City Mall, Kisumu at 11:00 a.m. — reach out to a family liaison to join.",
      },
    ],
    glossary: [
      { term: "Nyombo", definition: "The Luo traditional marriage ceremony — the formal union of two families." },
      { term: "Ayie", definition: "\"I agree\" or \"I accept\" — a word of consent spoken during the ceremony." },
      { term: "Karibuni", definition: "\"Welcome\" (plural, Swahili) — a greeting to all guests." },
      { term: "Wuod", definition: "\"Son of\" (Dholuo) — used in the welcome line honouring lineage." },
    ],
  },

  footer: {
    closingLine: "Wuod dhi e pinyni! You are most welcome.",
  },
} as const;
