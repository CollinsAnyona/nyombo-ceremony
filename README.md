# Homa-Bay Meets Siaya — Nyombo Ceremony Invitation

Single-page invitation site for Samantha & Michael's Nyombo ceremony (21 December 2026), with RSVP and directions. Built with Next.js (App Router) + TypeScript + Tailwind + Framer Motion. See `BRIEF.md` for the full design/build brief this project was built against.

## Setup

```bash
npm install
cp .env.example .env.local   # fill in the values below
npm run dev
```

Open http://localhost:3000.

## Environment variables

All RSVP-related config lives in `.env.local` (never committed — see `.env.example` for the template).

| Variable | Required | Purpose |
| --- | --- | --- |
| `GOOGLE_SHEET_ID` | Yes | The spreadsheet RSVPs are appended to. |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Yes | Service account with edit access to that sheet. |
| `GOOGLE_PRIVATE_KEY` | Yes | Private key for the same service account. |
| `RESEND_API_KEY` | No | Sends a notification email on each RSVP. Omit and RSVPs still save to the Sheet, just silently. |
| `RSVP_FROM_EMAIL` | No | Must be on a domain verified in Resend. |
| `RSVP_NOTIFY_EMAIL` | No | Who receives the notification (e.g. a family liaison). |

### RSVP storage setup (Google Sheets)

1. Create a spreadsheet (or use an existing one) and note its ID — the long string in its URL between `/d/` and `/edit`.
2. Rename (or add) a tab called exactly `RSVPs`, with header row: `Submitted At | Name | Attending | Side | WhatsApp | Email | Guest Count | Message`.
3. In [Google Cloud Console](https://console.cloud.google.com/), create a project (or reuse one) → **APIs & Services → Library** → enable **Google Sheets API**.
4. **APIs & Services → Credentials → Create Credentials → Service Account**. Give it any name; no project-level role is needed.
5. Open the new service account → **Keys → Add Key → Create new key → JSON**. Download it.
6. From that JSON file, copy `client_email` into `GOOGLE_SERVICE_ACCOUNT_EMAIL`, and `private_key` into `GOOGLE_PRIVATE_KEY` (keep the `\n` sequences and surrounding quotes as-is).
7. Back in the spreadsheet, click **Share** and invite the `client_email` address as an **Editor**.
8. Set `GOOGLE_SHEET_ID` to the spreadsheet ID from step 1.

### Notification email setup (Resend, optional)

1. Create an account at [resend.com](https://resend.com), verify a sending domain.
2. Create an API key → `RESEND_API_KEY`.
3. `RSVP_FROM_EMAIL` must use that verified domain (e.g. `rsvp@yourdomain.com`). `RSVP_NOTIFY_EMAIL` is whoever should be alerted per RSVP.

## Deploy

Hosted on [Vercel](https://vercel.com), zero custom server config needed.

1. Import the GitHub repo at [vercel.com/new](https://vercel.com/new).
2. In the project's **Settings → Environment Variables**, add every variable from the table above.
3. Deploy. Vercel gives you a `*.vercel.app` URL — that's the shareable link. Attach a custom domain under **Settings → Domains** if the couple has one.

## Editing content

Every piece of copy, the date, names, venue, and Dholuo phrases live in two files — nothing else in the codebase should hardcode this content:

- `src/lib/site-config.ts` — structured facts (date, venue, geo, dress code, liaisons, gift preference, RSVP deadline). Anything marked `[CONTENT NEEDED]` is a placeholder awaiting confirmation from the couple/family.
- `src/content/ceremony.ts` — page copy and section text.

Edit either file directly and redeploy (Vercel redeploys automatically on push to `main`).

## Pulling the guest list

Open the Google Sheet directly (the one set up above) — every RSVP lands there as a new row, no dashboard or developer needed.

## Swapping in real photography

Images live in `public/images/`. Replace a file in place (keep the same filename) to swap the image without touching any component code, or add a new file and update its reference in the component that uses it (`src/components/sections/*`).
