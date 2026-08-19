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
    // Each paragraph's opening word is deliberate — N-Y-O-M-B-O — per the
    // family's correction. Keep that acrostic intact if this copy is edited.
    paragraphs: [
      "Nyombo is the cherished Luo traditional marriage ceremony — a joyful meeting of two families as they welcome a new bond between their children.",
      "You don't need to be Luo to belong here. Come ready to share in the blessings, laughter, music, food, and warmth of the celebration.",
      "Our families come together not only to celebrate the couple, but to meet, connect, and begin a new relationship with one another.",
      "Moments of joy, tradition, music, conversation, and shared meals make Nyombo a celebration that will be remembered for years to come.",
      "Blessings are spoken over the couple as family and friends surround them with love, wisdom, goodwill, and hopes for a beautiful future together.",
      "One couple. Two families. One new chapter. Nyombo celebrates the beautiful moment when two homes come together as one.",
    ],
  },

  twoShores: {
    eyebrow: "Two Shores",
    heading: "Siaya and Homa Bay, united by the lake",
    intro:
      "Samantha's family comes from Siaya, while Michael's family comes from Homa Bay. Two places shaped by the waters of Lake Victoria, each carrying its own beauty, history and character — coming together today through one shared celebration.",
    families: {
      bride: {
        label: "The Bride's Family — Siaya",
        intro: "Samantha comes from Siaya, a land known for its beautiful Lake Victoria shoreline, rich Luo heritage and treasured natural landscapes. From Yala Swamp and Lake Kanyaboli to Got Ramogi, Siaya carries stories of history, community and a deep connection to the land and the lake.",
      },
      groom: {
        label: "The Groom's Family — Homa Bay",
        intro: "Michael comes from Homa Bay, where life has long been closely connected to Lake Victoria. Known for its vibrant fishing culture, the islands of Rusinga and Mfangano, and the remarkable Ruma National Park, Homa Bay brings together lake life, wildlife and breathtaking landscapes. Ruma is also Kenya's only remaining sanctuary for the endangered roan antelope.",
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
    parkingIntro: "On-site parking is available at Villa del Sol.",
    convoy: {
      intro: "Guests travelling from Migori and Homa Bay are welcome to join the family convoy departing from:",
      points: [
        {
          location: "Migori Town",
          time: "8:00 a.m.",
          contact: "Phesto Mapesa",
        },
        {
          location: "Homa Bay (Olare)",
          time: "9:20 a.m.",
          contact: "Oyugi",
        },
      ],
      note: "Kindly register early — no last-minute registrations will be accepted, and only confirmed guests will be accommodated, so we can avoid unnecessary confusion.",
    },
  },

  dressCode: {
    eyebrow: "Dress Code",
    heading: "Traditional | Elegant",
    intro:
      "Wear your heritage with pride, or dress elegantly in a way that honours the occasion. This is a ceremony, not a costume party — comfort and dignity first.",
    guidance: {
      women:
        "Traditional Luo attire, kitenge, or elegant formal wear in the ceremony's colours (terracotta, rust, burgundy, camel, taupe, beige, black, or deep plum). Flat or low heels are kinder to the ground at a lakeside venue.",
      men:
        "Traditional attire or a well-tailored suit in warm, earthy tones — rust, burgundy, camel, or deep plum read especially well. A touch of gold as an accent (tie, pocket square, kofia) sits well with the palette.",
    },
    avoid:
      "Avoid all-white (reserved for the couple), casual beachwear, and stiletto heels — the venue's ground is uneven grass and sand.",
    swatchLabels: ["Terracotta", "Rust", "Burgundy/Wine", "Camel/Tan", "Taupe", "Beige", "Black", "Deep Plum"],
  },

  // Family-confirmed running order — prayers and introductions happen before
  // the meal, and the meal (kukula) comes before speeches/gifts. Times beyond
  // the fixed 12:30 p.m. arrival are provisional pending final confirmation.
  orderOfDay: {
    eyebrow: "Order of the Day",
    heading: "The programme",
    items: [
      { time: "12:00 p.m.", title: "Guest arrival & seating" },
      { time: "12:30 p.m.", title: "Arrival of the two families" },
      { time: "1:00 p.m.", title: "Prayers & blessings" },
      { time: "1:30 p.m.", title: "Introduction of the two families" },
      { time: "2:00 p.m.", title: "Feast & celebration" },
      { time: "3:00 p.m.", title: "Speeches & gift presentation" },
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
    sideOptions: ["Siaya (bride's side)", "Homa-Bay (groom's side)", "Friend of the couple"],
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
    items: [
      {
        question: "Are children welcome?",
        answer: "This will be a long, joy-filled day at a venue that isn't especially set up for little ones — for that reason, we kindly ask that children stay home this time, so the grown-ups in your life can fully relax and celebrate with us. We appreciate your understanding!",
      },
      {
        question: "Can I take photos and share them?",
        answer: "Please do! Capture the day freely and share your favourite moments using the hashtags #HomaBayMeetsSiaya and #LoveTheAtakaWay. We'd love to see the celebration through your eyes.",
      },
      {
        question: "What if I need to change my RSVP?",
        answer: "Submit the RSVP form again using the same WhatsApp number — your latest answer replaces the last one.",
      },
      {
        question: "Is there parking at the venue?",
        answer: "Yes, on-site parking is available at Villa del Sol. A family convoy also departs from Migori Town (8:00 a.m.) and Homa Bay/Olare (9:20 a.m.) — reach out to a family liaison to join.",
      },
    ],
    glossary: [
      { term: "Nyombo", definition: "The Luo traditional marriage ceremony — the formal union of two families." },
      { term: "Ayie", definition: "\"I agree\" or \"I accept\" — a word of consent spoken during the ceremony." },
      { term: "Dhiang'", definition: "\"Cattle\" (Dholuo) — traditionally a token of goodwill exchanged between families during marriage customs." },
      { term: "Kendo", definition: "\"Hearth\" (Dholuo) — symbolic of the new home the couple is building together." },
      { term: "Waruako", definition: "A term of blessing and welcome used in this ceremony (Dholuo)." },
    ],
  },

  footer: {
    closingLine: "Wuod dhi e pinyni! You are most welcome.",
  },
} as const;
