# J.J. Smiley — Portfolio Site

A custom-built personal portfolio and interactive résumé for James "J.J." Smiley — IT Operations & Automation Leader. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## What's inside

- **Home** — hero, quick stats, featured projects, philosophy teaser, CTA
- **About** — origin story, values, full career timeline
- **Projects** — filterable by technology (PowerShell, Bash, Python, Apple, Microsoft 365, Azure, ServiceNow, Automation, Networking, Linux, Homelab, AI), each with a case-study detail page (problem/solution/architecture/lessons)
- **Blog** — MDX-powered technical writing (3 sample posts included)
- **Résumé** — expandable interactive career timeline + PDF download
- **Skills** — categorized proficiency bars
- **Homelab** — network diagram, compute/storage inventory, Tailscale overlay, monitoring, AI ops assistant callout
- **Contact** — links + a Resend-backed contact form

Dark mode by default (toggle in the nav), fully responsive, all pages statically generated.

## Content lives in `src/data/`

You don't need to touch components to update content. Everything is data-driven:

| File | Controls |
|---|---|
| `src/data/profile.ts` | Name, headline, tagline, contact links, quick stats |
| `src/data/experience.ts` | Work history, education, certifications |
| `src/data/projects.ts` | All project case studies + filter tags |
| `src/data/skills.ts` | Skill categories and proficiency levels |
| `src/data/homelab.ts` | Homelab network/compute/storage/monitoring details |
| `src/data/milestones.ts` | The About-page career timeline |
| `src/content/blog/*.mdx` | Blog posts — add a new `.mdx` file with frontmatter to publish a new post |

## Swapping in your real photo

The hero section (`src/components/home/Hero.tsx`) currently renders a styled SVG placeholder silhouette. To use a real photo:

1. Add your image to `public/images/` (e.g. `headshot.jpg`)
2. In `Hero.tsx`, replace the `<svg>` block inside the avatar container with a Next.js `<Image src="/images/headshot.jpg" alt="J.J. Smiley" width={400} height={480} className="h-full w-full object-cover" />`

## A note on the Homelab page content

The Homelab page uses sanitized example VLAN ranges, hostnames, tailnet names, and reverse-proxy labels. The goal is to show the architecture and decision-making without publishing real network coordinates or internal system names.

## Local development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Contact form

The contact form posts to `src/app/api/contact/route.ts` and sends mail through Resend. Configure these Vercel environment variables:

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend API key used only by the server route |
| `RESEND_FROM_EMAIL` | Verified sender, for example `J.J. Smiley <contact@grandmasterj.com>` |
| `CONTACT_EMAIL_TO` | Destination inbox; defaults to `src/data/profile.ts` `profile.email` if omitted |

## Deploying to Vercel (recommended)

1. Push this project to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo, and click Deploy — no configuration needed, Vercel auto-detects Next.js.
3. Once deployed, add your custom domain (e.g. `grandmasterj.com`, which you already own) under Project Settings → Domains.
4. Every push to `main` auto-deploys; pull requests get preview URLs.

### Environment / config notes
- Update `profile.site` in `src/data/profile.ts` to match your final production domain — it feeds the sitemap, robots.txt, and Open Graph metadata.
- The contact form requires `RESEND_API_KEY` and `RESEND_FROM_EMAIL` in Vercel.

## Deploying elsewhere

- **Cloudflare Pages:** works with the `@cloudflare/next-on-pages` adapter for full Next.js feature support (recommended over static export, since this site uses image optimization and dynamic metadata).
- **GitHub Pages:** requires a fully static export. Add `output: "export"` to `next.config.mjs`, remove/replace any dynamic `next/image` usage with `unoptimized: true` in the images config, and run `next build` — output lands in `/out`.

## Tech stack

Next.js 14 · React 18 · TypeScript · Tailwind CSS · Framer Motion · next-mdx-remote (MDX blog) · next-themes (dark mode) · lucide-react (icons)
