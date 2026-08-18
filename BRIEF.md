# Claude Code Build Brief — "Homa-Bay Meets Siaya" Nyombo Ceremony Landing Page

**Prepared by:** Hemi Tech Co. · Build · Analyze · Transform
**Client:** Samantha & Michael (Nyombo ceremony, 21 December 2026)
**Deliverable:** One production-grade, single-page invitation site with RSVP and directions.

---

## 1. How to use this document

Paste this whole document into Claude Code as the opening prompt, or save it as `CLAUDE.md` in the repo root. Sections marked **[CONFIRM]** need a real answer from the couple or the family liaisons — build the structure now, fill with clearly-labelled realistic placeholder content, and leave one obvious place to swap it.

Before writing any code, do the two-pass design process in Section 5: produce a token plan and a signature concept, critique it against this brief, revise, *then* build. Do not start with a component library and hope a design emerges from it.

---

## 2. What this is, and why the usual wedding-site playbook fails it

This is a **Nyombo** — the Luo traditional marriage ceremony — not a white wedding. Two families from opposite shores of Lake Victoria's Winam Gulf are being brought together: the bride's side from **Homa-Bay**, the groom's from **Siaya**, meeting on neutral ground in **Kisumu**. That geography is the entire emotional premise of the event, and it is the premise the design should be built on.

The existing printed invitation (supplied) already establishes the art direction and it is strong: near-black espresso ground, carved-gold display type under a crown, forest-green accents, and a border language of Luo geometric diamond patterns, cowrie shells, beaded gourds, spears, a carved chieftain's chair, banana leaves, and a dhow crossing the lake at sunset. **The website is a translation of that artefact into an interactive object, not a fresh concept.** Extend its vocabulary; do not invent a second one.

Non-negotiables:

- **It must not read as a template.** No pastel florals, no cream-and-terracotta minimalism, no generic gold-script hero over a stock couple photo. The palette and materials come from the invitation, and the invitation is dark, warm, and ceremonial.
- **Mobile-first is not a preference here, it is the deployment reality.** This link will be shared almost entirely through WhatsApp, opened on mid-range Android phones, on metered mobile data, often outside Nairobi. Design for a 360–414px viewport first and treat desktop as the enhancement.
- **Respect over aesthetic.** Cultural elements carry meaning: cowrie shells, the carved chair, the crown, spears, and gourds are not decoration to be scattered freely. Use them with the same restraint the printed invitation shows — as framing and punctuation, never as confetti.
- **The RSVP has to work for a 70-year-old aunt on a cracked screen.** Craft in the motion is worthless if the form is fiddly.

---

## 3. Tech stack

- **Framework:** Next.js (latest stable, App Router) + TypeScript.
- **Styling:** Tailwind CSS with a custom design-token theme (Section 5). Do not ship default Tailwind colours or default font stacks.
- **Animation:** Framer Motion for reveals, scroll-linked progress, and micro-interactions. Lenis smooth-scroll only if it does not cost you Core Web Vitals or accessibility — if it does, drop it and say so.
- **Fonts:** self-host via `next/font` with subsetting. No render-blocking third-party font CDN.
- **Content:** a single typed content module (`content/ceremony.ts` or MDX) holding every string, date, name, phone number and Dholuo phrase, so the couple can be sent a diff to approve. No hardcoded copy in components. No CMS — the content volume does not justify it.
- **RSVP backend:** Next.js Route Handler with server-side validation (zod), writing to a durable store, plus notification email. Recommend Supabase or a Google Sheet via service account; recommend Resend for mail. Present the trade-off, then pick one and note the swap point.
- **Images:** `next/image` throughout, AVIF/WebP, explicit `sizes`, blur placeholders. The supplied invitation art is a raster image — slice reusable motifs (border pattern, cowrie strand, dhow, leaf cluster, gold divider) as transparent PNG/WebP assets rather than reusing the whole poster as a background.
- **Hosting:** Vercel. Zero custom server requirements.
- **Repo:** clean git history, `README.md` covering setup, env vars, deploy, and how to edit content. `.env.example` committed, secrets never.

If any stack choice fights a goal in this brief, say so explicitly instead of quietly deviating.

---

## 4. Confirmed content (use exactly)

| Field | Value |
| --- | --- |
| Event title | Homa-Bay Meets Siaya |
| Event type | Nyombo Ceremony — the cherished Luo traditional marriage ceremony |
| Couple | Samantha & Michael |
| Date | Monday, 21st December 2026 |
| Arrival | Guests to arrive by 12:00 p.m. (EAT, UTC+3) |
| Venue | Villa del Sol, Kisumu, Kenya |
| Venue detail | Paga Beach, on the shore of Lake Victoria |
| Coordinates | -0.114022, 34.6439129 |
| Google Place ID | `ChIJKYXFVz2vKhgRTQQLo3abTfU` |
| Venue phone | +254 796 533678 (venue, not the family — use only in a "getting there" context) |
| Dress code | Traditional \| Elegant |
| Welcome lines | *Karibuni sana!* / *Wuod dhi e pinyni!* — "You are most welcome!" |
| Scripture line | "Love is patient, love is kind." (1 Corinthians 13:4) — the Dholuo rendering above it in the printed card is **[CONFIRM: exact Dholuo transcription and spelling — do not guess, mis-set Dholuo is worse than none]** |

Invitation body copy to carry over, tightened for screen: two families, two homes, and two traditions coming together in a celebration of love, culture, unity and heritage.

**[CONFIRM]** items: family liaison names and WhatsApp numbers, order of the day / programme, whether children are welcome, gift or M-Pesa preference, parking and shuttle arrangements, photo permissions and hashtag, RSVP deadline, and whether guest names may be shown publicly on the site.

---

## 5. Design system & art direction

Derive everything from the printed invitation. Produce the token plan first, then critique it, then build.

**Palette** (starting values measured from the artwork — refine against the source file, keep the relationships):

| Token | Hex | Role |
| --- | --- | --- |
| `ink` | `#150C07` | Page ground, deepest espresso |
| `ink-raised` | `#241610` | Cards, raised panels |
| `green-royal` | `#14301C` | Ceremonial panels, badge fills |
| `gold` | `#C9A227` | Primary accent, rules, icons |
| `gold-light` | `#E8C87A` | Highlights, gradient top-stop, display type |
| `gold-deep` | `#8A6318` | Gradient bottom-stop, engraved shadow — **decorative only, never body text** |
| `parchment` | `#F3EAD8` | Body copy on dark, cream section grounds |
| `ivory-cowrie` | `#EDE3D1` | Cowrie/shell details, secondary surfaces |
| `amber-sunset` | `#D98A2B` | The lake-at-sunset accent, used sparingly |

Gold must be treated as a **material**, not a colour: a two-stop vertical gradient with a specular sweep, as if engraved or leafed. But engraved gold on dark fails accessibility for small text — mandate `parchment` for all body copy and reserve gold for display type ≥24px, rules, and icons. Verify every pairing against 4.5:1 (3:1 for large text) and report the numbers.

**Typography** — three roles, chosen to echo the print piece:

- *Display:* a high-waisted engraved Roman capital with real inscriptional character (Cinzel, or Cormorant SC / Marcellus SC as alternates). Wide tracking, small-caps subheads. Used for the event title and section openers only.
- *Script:* a flowing copperplate for the couple's names and the Dholuo welcome lines (Pinyon Script, Tangerine, or Great Vibes). One weight, large, never below 28px, never for anything functional.
- *Body:* a warm old-style serif for reading (EB Garamond or Cormorant Garamond) at a genuinely comfortable mobile size — 17–18px, line-height 1.65.
- *Utility:* letterspaced small caps for labels (DATE / TIME / VENUE), matching the printed card's label treatment.

Define a full scale with deliberate tracking per size. Tight tracking on a display Roman is the single fastest way to make this look cheap; get it right.

**Structural devices** must encode something true. Use the Luo diamond-lozenge border pattern as the section rule and the gold tapered line as the intra-section divider — both already exist in the artwork. No numbered markers (01/02/03) unless the programme section genuinely is a sequence; there, numbering is earned.

**The signature — "The Crossing."** Homa-Bay and Siaya sit on opposite shores. Make the scroll *be* the crossing: the dhow lifted from the invitation sails along a scroll-linked path across a low horizon band that persists as the page's progress indicator, departing the Homa-Bay shore at the hero and arriving at the Siaya shore exactly as the RSVP section enters view. The ambient light shifts with it — high golden hour at the top, deep amber mid-page, lamplit dusk at the RSVP. One idea, executed precisely, carrying the meaning of the event. Spend the boldness here and keep every other section quiet and disciplined.

Cut one accessory before you ship. If the crossing lands, some of the decorative motif work around it is redundant — remove it.

---

## 6. Page structure (single page, anchored nav)

1. **Hero — the departure.** Crown, HOMA-BAY *meets* SIAYA in engraved gold, "Nyombo Ceremony" in green small caps, the couple's names in script, then the essential triad (date · 12:00 p.m. · Villa del Sol) and two actions: *Confirm attendance* and *Get directions*. Layered parallax on the invitation's real elements — leaf cluster, cowrie strand, spear silhouettes — with the lake and dhow at the base. No autoplay video.
2. **Nyombo, explained.** Short, warm, three or four sentences on what the ceremony is and what a guest can expect. Many invited friends will not be Luo; this section is hospitality, not a lecture.
3. **Two shores.** The families. A two-column composition on desktop that converges as it scrolls, stacking on mobile into a meeting rather than a comparison. **[CONFIRM: family names and how each side wishes to be introduced]**
4. **When & where.** The printed card's information block rebuilt as a carved panel: date, arrival time, venue. Live countdown to 21 Dec 2026, 12:00 EAT, set in engraved numerals — and make sure it degrades gracefully to a plain "today is the day" state. `.ics` download plus Google Calendar link.
5. **Getting there.** Interactive map centred on the coordinates above, a *Directions* deep link, and honest practical guidance: Villa del Sol is off the tarmac on a rough access road toward Paga Beach — say so kindly, advise arriving in daylight and driving slowly. **[CONFIRM: parking, shuttle, recommended route, whether a family car convoy is being organised]**
6. **Dress code.** *Traditional | Elegant* given real substance: the ceremony's colour swatches drawn from the palette, plain guidance for men and women, and what not to wear. This is the section guests screenshot — make it the most useful thing on the page.
7. **Order of the day.** Timeline — genuinely a sequence, so number it. **[CONTENT NEEDED]**
8. **RSVP.** The arrival. Full spec in Section 7.
9. **Gifts & blessings.** Gracious, optional, one short paragraph. **[CONFIRM: M-Pesa details — never hardcode a paybill, till or phone number that has not been confirmed in writing.]**
10. **Questions.** Compact FAQ plus a short **Dholuo glossary** — *nyombo*, *ayie*, *karibuni*, *wuod* — as tap-to-reveal terms with a dotted gold underline. Delightful and genuinely useful.
11. **Footer.** Family liaison contacts (tel: and wa.me links), hashtag, the Dholuo welcome line as the closing note.

Also required: an on-brand 404, and a custom Open Graph / WhatsApp preview image per share — this is the first thing 90% of guests will see, so treat it as a primary design surface, not an export afterthought.

---

## 7. RSVP requirements

The couple asked for "a checkbox to confirm whether they are attending or not." Build it as an **explicit two-state choice**, not a single ambiguous checkbox — a single unchecked box cannot distinguish "not coming" from "hasn't answered yet", and that distinction is the whole point of a headcount.

- Two large tap targets: **"Yes, I'll be there"** / **"Sadly, I can't make it"**. Minimum 48px, reachable one-handed.
- **Signature interaction:** render the selection control as a **cowrie shell** — matte ivory when unselected, gold-leafed with a brief specular sweep and a soft haptic-feeling scale on selection. Cowries were traditional tokens of exchange and blessing; the metaphor is that the guest places their cowrie. Keep it a real semantic radio group underneath, keyboard-operable, with a visible focus ring and `aria-checked` correct.
- Fields: full name (required), WhatsApp number with `+254` default and international support (required), email (optional), which side of the family or "friend of the couple", number of guests attending with them, and a short message to the couple. Selecting "can't make it" collapses the guest-count field and expands the message field — the form should shrink for the answer that needs less.
- Behaviour: optimistic inline validation, no page reload, a warm confirmation state that names the guest ("Karibu, Samantha — your cowrie is placed"), and an option to edit a response using the same phone number.
- Server: zod validation, honeypot field, IP rate limit, Cloudflare Turnstile if abuse becomes a concern (avoid intrusive reCAPTCHA). Persist first, then email — never lose an RSVP because SMTP failed. Notify the couple and the liaisons; optionally send the guest a confirmation.
- Provide a simple protected `/rsvp/list` view or a CSV export so the family can pull the headcount without a developer.
- **[CONFIRM]** whether a public "who's coming" wall is wanted. If yes, show first names only and require explicit consent on the form. Default to off.

---

## 8. Motion specification

Luxury motion here means *ceremonial*, not flashy.

- **Page-load sequence:** one orchestrated moment only — the frame draws in, the crown settles, the display type reveals with a single gold sweep, script names write in. Under 1.8s total, skippable by any interaction.
- **Scroll:** the dhow crossing (Section 5) is scroll-linked via `useScroll`. Section content rises and fades with staggered children — vary the treatment between sections so it does not read as one effect applied globally.
- **Micro-interactions:** gold sweep on button hover, cowrie selection, glossary reveal, countdown digit roll.
- **Discipline:** transform/opacity only, no layout-thrashing animation, nothing that blocks input. Fully honour `prefers-reduced-motion: reduce` — in that mode the dhow becomes a static position marker and all reveals become instant. Test it.
- **Ambient audio:** if a nyatiti/orutu ambience is wanted, it is **off by default** with a visible toggle and no autoplay, ever. **[CONFIRM]**

---

## 9. Performance, SEO, accessibility, security

- **Budgets:** LCP < 2.0s and total JS < 200KB gzipped on a throttled 4G mid-range Android. CLS < 0.05. INP < 200ms. Hero image payload under 250KB. Report the real numbers; if the crossing animation cannot fit the budget, simplify it rather than blowing the budget.
- **SEO/sharing:** correct metadata, `schema.org/Event` structured data, custom OG and Twitter images, `robots.txt`. The page can be indexable or `noindex` — **[CONFIRM]** whether the couple wants it publicly discoverable.
- **Accessibility:** WCAG 2.1 AA. Full keyboard path through the RSVP, visible focus, semantic heading order, real alt text on every motif image, verified contrast ratios documented in the handoff note.
- **Security:** secure headers via middleware, server-side sanitisation, secrets in env vars only, rate-limited API route, `npm audit` clean. If any analytics is added, it is privacy-first (Plausible/Fathom) and consent-gated.

---

## 10. Build order and quality bar

Check in with Hemi Tech at each milestone rather than building silently end to end.

1. Design token plan + signature concept + self-critique — **show this before coding.**
2. Asset extraction from the invitation artwork (motifs cut to transparent, optimised).
3. Scaffold, tokens, typography, layout shell.
4. Shared components with full state sets before any page section.
5. Sections in order: hero → when & where → getting there → RSVP → the rest.
6. RSVP end-to-end, including failure paths.
7. Single site-wide motion pass, so motion feels of one hand.
8. QA: mobile/tablet/desktop, Chrome/Safari/Firefox, iOS Safari specifically, Lighthouse 90+ across all four categories with a written explanation for anything lower, reduced-motion pass, screen-reader pass, broken-link check, RSVP success and error test.
9. Handoff note: env vars, how to edit content, how to pull the guest list, how to swap in real photography.

---

## 11. Decisions to flag back to Hemi Tech

- Supabase vs Google Sheet for RSVP storage, given the family needs to read it without a developer.
- Whether Lenis earns its weight on low-end Android, or should be cut.
- Whether the dhow crossing runs as scroll-linked canvas/SVG or as a CSS-transform sprite, on performance grounds.
- Whether to ship a second language pass (full Dholuo/Swahili toggle) or keep bilingual phrases inline as designed here.
