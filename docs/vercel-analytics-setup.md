# Cookieless Vercel pageview baseline

This rollout uses Vercel Web Analytics for aggregate visits and public pageviews, including `/contact`. Optional GA4 remains implemented but **disabled**. Do not change Linktree links, tracking, or Google account-wide settings for this setup.

## Production configuration

Enable Web Analytics in the existing Vercel project's Analytics dashboard. This project is on Hobby: the current free allowance is 50,000 events per month shared across the team, with no custom events or paid overages. Do not enable a trial, Pro upgrade, or Analytics Plus. Recheck [current pricing](https://vercel.com/docs/analytics/limits-and-pricing) before any future plan change.

Set only in **Production**, then rebuild/deploy:

```dotenv
NEXT_PUBLIC_VERCEL_ANALYTICS_ENABLED=true
NEXT_PUBLIC_ANALYTICS_ENABLED=false
```

The optional public GA measurement ID may remain configured; it cannot load Google Analytics while the GA enabled flag is false. Vercel's automatic `VERCEL_ENV=production` and a production Next build are also required. Preview variables remain absent/off. HTTPS hostnames allowed: `grandmasterj.com`, `www.grandmasterj.com`, `jjsmiley.net`, `www.jjsmiley.net`. The `beta` hostname and all `*.vercel.app` previews are excluded.

## Implementation and minimization

- Exact `@vercel/analytics` version: **2.0.1**, with no new transitive runtime dependencies
- The official **React SDK component** is driven by Next's `usePathname`, with explicit checked-in public `route` and `path` values. This deliberately avoids the Next SDK wrapper's fallback that can derive route labels from query-parameter names
- A supplied route disables the SDK's automatic history tracker. The SDK component is the sole pageview emitter; the filter deduplicates repeated initial effects and resets on real pathname navigation
- `beforeSend` accepts pageviews only, strips query/hash from event URLs, rejects stale/off-origin/unknown/private paths, and reads current GPC/DNT signals for every attempted event. It returns `null` on errors
- No custom events, form tracking, outbound-link events, provider IDs, or form contents are sent to Vercel. `/contact` is an ordinary pageview, not a submission or lead count
- The React wrapper does not mount the SDK on excluded hosts/routes, before hydration, or with a privacy signal. After the script has loaded, the live event filter still excludes private routes and privacy-signaled traffic
- Page allowlists come from the same checked-in pages/projects/blog content as the optional Google integration. Static HTML/PDF files under `public/` remain uninstrumented

The SDK hook exposes event type and URL, **not referrer/device/location fields**. The URL filter does not promise to redact referrer or HTTP Referer headers. [Vercel's privacy documentation](https://vercel.com/docs/analytics/privacy-policy) describes a request-derived visitor hash discarded after 24 hours, plus referrer, device/browser and approximate-location information. The public privacy page discloses these. Counts are estimates, and may differ across domains/devices/days or when browsers block collection.

## Separate Google controls

Google Analytics remains off for this rollout, including cookieless Google pings. There is no automatic Google consent banner while disabled. The footer's **Google Analytics preferences** control explains its disabled state and distinguishes the Vercel baseline. Enabling optional GA in the future still requires an explicit visitor opt-in and the safeguards in [analytics-setup.md](analytics-setup.md); its counts must not be added to Vercel counts as if they were separate visitors.

## Verification and rollback

Run `npm ci`, `npm run lint`, `npm run typecheck`, `npm run test:analytics` (Node 22.18+/24+), and `npm run build`. The repository retains both npm and Bun lockfile formats; this change adds the same exact SDK artifact to each without upgrading unrelated dependencies. The pre-existing Bun lockfile omits some existing Sanity dependencies; npm's lockfile is the complete dependency baseline used for clean local verification.

After the authorized develop preview, verify home/contact/privacy render, no Vercel/Google tracking script loads in Preview, and disabled Google preferences are accurate. After production deployment:

1. Verify only the intended Vercel script loads and no Google tag/request or analytics cookie appears
2. Verify one pageview each on initial load, Next navigation, Back/Forward and returning from an excluded route; query/hash-only changes should not add views
3. Inspect pageview URL **and the separate route/path fields** using harmless synthetic query keys/values; both must contain only approved public paths
4. Verify `/studio`, `/admin`, unknown pages, preview/local hosts and DNT/GPC produce no pageviews, including transitions after the SDK is loaded
5. Confirm `/contact` views appear in the Vercel dashboard. Do not submit real contact messages just to verify pageview counts

To stop the baseline, set `NEXT_PUBLIC_VERCEL_ANALYTICS_ENABLED=false` and redeploy; leave GA disabled. Existing open tabs need to reload. Browser privacy signals suppress subsequent pageviews immediately at the event filter. SDK endpoint metadata and dashboard receipt require real browser verification; mocked tests are not proof of live receipt.

## Official references

- [SDK configuration and beforeSend](https://vercel.com/docs/analytics/package)
- [Redacting event URLs and ignoring routes](https://vercel.com/docs/analytics/redacting-sensitive-data)
- [React SDK source](https://github.com/vercel/analytics/blob/main/packages/web/src/react/index.tsx)
- [Next SDK route computation](https://github.com/vercel/analytics/blob/main/packages/web/src/nextjs/utils.ts)
