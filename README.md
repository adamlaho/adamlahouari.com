# Adam Lahouari — Research Portfolio

Next.js 15 (App Router) research portfolio.

## Stack

- Next.js 15 / React 18 / TypeScript
- Tailwind CSS v4 (`@theme inline` tokens in `styles/globals.css`)
- Radix UI primitives (via the shadcn/ui component set in `components/ui/`)
- next-themes for light/dark/system mode
- Edge API route for the contact form, Resend-ready

## Local development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. Copy `.env.example` to `.env.local` if you want
the contact form to actually send email, or to add API keys for the live
Scholar/GitHub data (both work without keys — see below).

## Content lives in `lib/`

All site content is centralised so there is exactly one place to edit:

| File                   | Holds                                                        |
| ---------------------- | ------------------------------------------------------------ |
| `lib/site.ts`          | Name, email, ORCID, Scholar id, GitHub/LinkedIn — every external link |
| `lib/publications.ts`  | Publication records with DOIs, arXiv ids and BibTeX          |
| `lib/citations.ts`     | ACS / APA / Chicago / RIS strings per publication            |
| `lib/talks.ts`         | Talks and conference presentations                           |
| `lib/software.ts`      | Software projects (static description; stats fetched live)   |
| `lib/scholar.ts`       | Live Google Scholar metrics                                  |
| `lib/github.ts`        | Live repository stats                                        |

Adding a publication means adding one entry to `lib/publications.ts`; it then
appears on the home page, `/publications`, `/research`, the CV, the sitemap
and the downloadable `.bib` automatically.

## Live Google Scholar metrics

The metrics strip on the home page and the per-paper citation counts on
`/publications` are fetched at runtime and cached by Next's data cache for 12
hours, so the numbers track the profile without a redeploy. There is no
official Scholar API, so `lib/scholar.ts` resolves through a fallback chain
and never throws:

1. **SerpApi** — reliable, needs `SERPAPI_API_KEY` (free tier: 100/month).
2. **Google Scholar** — direct HTML parse of the public profile. Works from
   most IPs; cloud hosts are sometimes served a CAPTCHA instead.
3. **OpenAlex** — free, no key. Its counts are lower than Scholar's because it
   indexes fewer sources, so it is a fallback rather than the primary.
4. **Snapshot** — hand-checked numbers in `lib/scholar.ts`, so the page never
   renders blank.

Check which source is currently answering:

```bash
curl -s http://localhost:3000/api/scholar | jq '{source, citations, hIndex, i10Index}'
```

If you deploy to Vercel and the endpoint reports `"source": "openalex"`, the
direct scrape is being blocked from that region — set `SERPAPI_API_KEY` to get
the real Scholar numbers back.

The Scholar profile id lives in `lib/site.ts` as `PROFILE.scholarId`.

## Live GitHub stats

Star counts and last-commit dates on `/software` and the project pages come
from the GitHub REST API, cached for 6 hours. Unauthenticated requests are
limited to 60/hour per IP; set `GITHUB_TOKEN` (no scopes needed) to raise it.
If the API is unreachable the badges are omitted rather than showing a stale
number.

## Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel, "Add New Project" → import the repo. The Next.js preset is
   auto-detected; no config needed.
3. Add environment variables (Project Settings → Environment Variables) —
   all of them are optional, see `.env.example`:
   - `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`
   - `SERPAPI_API_KEY` (recommended, for reliable Scholar numbers)
   - `GITHUB_TOKEN` (optional, raises the GitHub rate limit)
4. Deploy.
5. Point `adamlahouari.com` at Vercel: Project Settings → Domains. The
   `next.config.ts` already redirects `www` to the apex domain.

## Contact form

`app/api/contact/route.ts` is an Edge function that validates the payload
server-side, optionally verifies a Cloudflare Turnstile token, and sends the
message through [Resend](https://resend.com). Without `RESEND_API_KEY` and
`CONTACT_TO_EMAIL` it logs the submission and returns success, so local
development needs no configuration.

Note: the form does not yet render a Turnstile widget, so leave
`TURNSTILE_SECRET_KEY` unset until one is added — otherwise every submission
fails verification.

## Structure

```
app/
  layout.tsx                      Root layout — Nav, Footer, ThemeProvider, JSON-LD
  page.tsx                        Home (ISR: live Scholar + GitHub data)
  about/ research/ software/ talks/ cv/ contact/
  publications/
    page.tsx                      Server wrapper — resolves live citation counts
    publications-client.tsx       Filters, search, URL sync
    lahouari-amlp-2026/page.tsx
  publications.bib/route.ts       Full BibTeX download
  api/scholar/route.ts            Live Scholar metrics as JSON
  api/contact/route.ts            Contact form handler (Edge)
  sitemap.ts  robots.ts
components/
  *.tsx                           Site components (Nav, Footer, cards, …)
  ui/                             shadcn/ui primitives (Radix-based)
lib/                              Content + data fetching (see table above)
styles/globals.css                Design tokens, Tailwind v4 theme, print styles
```

## Known gaps

- No portrait image — `/` and `/about` show a placeholder block.
- No OG image; pages fall back to the static metadata title/description for
  link previews.
- Figures on `/research/amlp` and `/software/*` are styled placeholders, not
  real plots.
- `/cv` "Print / Save as PDF" uses the browser print dialog; there is no
  pre-rendered PDF.
- The contact form has no rate limiting.
