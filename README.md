# Fauwaaz Shaikh — Portfolio

Next.js 16 (App Router) · React 19 · Once UI 1.5.6 · Resend

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in RESEND_API_KEY
npm run dev
```

## Structure

```
src/
├── app/                        Routes only: fetch content, compose sections
│   ├── layout.tsx              <html>, theme bootstrap, header/footer shell
│   ├── page.tsx                Home: hero → featured project → other projects → contact
│   ├── about/page.tsx
│   ├── work/page.tsx
│   ├── work/[slug]/page.tsx    Static case-study pages (dynamicParams = false)
│   ├── api/contact/route.ts    Resend email handler
│   ├── api/og/generate/        Dynamic OG images
│   ├── sitemap.ts · robots.ts · not-found.tsx
├── components/
│   ├── layout/                 Header, NavLink, Footer, ThemeToggle, TimeDisplay, SiteBackground
│   ├── sections/
│   │   ├── home/               HomeHero
│   │   ├── about/              AboutHeader, AboutSidebar, Experience/Studies/Skills sections, TOC
│   │   ├── work/               Projects, ProjectCard
│   │   └── contact/            ContactSection (server), ContactForm (client)
│   ├── mdx/                    CustomMDX renderer for case studies
│   ├── ui/                     EffectsBackground, MediaRow, PageSchema, ScrollToHash
│   └── providers/              Once UI providers
├── config/                     site.ts (URL, routes), theme.ts (colors, effects), fonts.ts, icons.ts
├── content/
│   ├── profile.tsx             ALL personal copy lives here
│   └── projects/*.mdx          One file per project = one card + one case-study page
├── lib/                        projects.ts, seo.ts, contact.ts (shared validation), theme-script.ts
├── styles/                     breakpoints.scss, custom.css
└── types/
```

## Project screenshots

Every case study ships with labelled placeholder images. Replace them with real captures:

```bash
npm run screenshots:install     # first time only: downloads Chromium
npm run screenshots             # all nine projects, 4–6 pages each
npm run screenshots -- usifa    # re-run a single project
```

The script (`scripts/capture-screenshots.mjs`) loads each page at 1440×810, hides popups,
cookie banners and chat bubbles, scrolls to trigger lazy images, then saves
`public/images/projects/<slug>/<page>.jpg` and rewrites that project's `images:` frontmatter.
Pages per site live in `scripts/screenshots.config.mjs`. If a popup still appears on a
site, add its selector to that project's `hide` array.

## Editing content

- Text, jobs, skills, links: `src/content/profile.tsx`
- New project: add `src/content/projects/<slug>.mdx` (copy an existing one's frontmatter; set `category`, `featured`, `order`), then add it to the screenshot config
- Turn a page off: `routes` in `src/config/site.ts`
- Colors and background effects: `src/config/theme.ts`

## Contact form (Resend)

| Variable | Required | Notes |
|---|---|---|
| `RESEND_API_KEY` | yes | resend.com → API Keys |
| `CONTACT_EMAIL` | yes | Where messages arrive |
| `RESEND_FROM_EMAIL` | for production | Sender on a domain verified in Resend |

Without `RESEND_FROM_EMAIL`, the sender is `onboarding@resend.dev`. Resend only delivers
from that address **to the email that owns the Resend account**, so sign up for Resend
with `fauwaazpro@gmail.com`, or verify a domain.

Spam protection is a honeypot field plus a minimum fill time. Bots get a fake success.
There is no rate limit; add Vercel BotID or Upstash Ratelimit if spam becomes a problem.

## Deploy (Vercel)

Add the three env vars above, plus `NEXT_PUBLIC_SITE_URL` if you use a custom domain.
