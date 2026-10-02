# Optional, consent-first Google Analytics 4

**Current rollout:** Google Analytics remains disabled. The active baseline is [cookieless Vercel pageviews](vercel-analytics-setup.md). This guide is retained for a future explicitly enabled Google integration; its consent is not removed.

This integration is disabled until configured. It uses a standard GA4 property and web stream; no paid services, advertising features, Google Tag Manager, Measurement Protocol credentials, or new runtime dependencies are needed.

## Before enabling

1. Create a **standard GA4 property** for the career portfolio and one **Web** data stream. Use the canonical production domain as the stream URL. Copy its `G-...` measurement ID. Both `grandmasterj.com` and `jjsmiley.net` (and their `www` forms) use this one ID.
2. In **Admin → Data streams → your web stream**, turn **Enhanced measurement completely OFF**. Turning off only the initial pageview is insufficient: automatic history changes can create duplicates, and form/link/search measurement can collect unintended details. The code sends manual pageviews and one narrowly defined contact event.
3. Leave **Google signals**, **user-provided data collection**, **advertising personalization**, ad-product links, and connected site tags **OFF**. Do not enable automatic user-data detection. Do not add another GA snippet or analytics plugin.
4. Use the minimum available event/user data retention (currently **2 months**) and disable retention reset on new activity. Turn off granular location/device collection where available. Review account data-sharing settings and leave optional sharing disabled.
5. Review the public `/privacy` notice. It describes actual Google processing and the site's separate contact-form provider; it is not a blanket claim that Analytics is anonymous or a legal-compliance certification.
6. Set these **Production-only build environment variables** in the existing Vercel project:

   ```dotenv
   NEXT_PUBLIC_ANALYTICS_ENABLED=true
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-YOUR_REAL_ID
   ```

   The ID is public, not a secret. Never add an API key or service-account credential. Vercel supplies `VERCEL_ENV=production`. Self-hosted production builds instead require `ANALYTICS_DEPLOYMENT_ENV=production`. Build with `NODE_ENV=production` (normally set by `next build`). Rebuild/redeploy after changing these values: the public config is baked into the build.
7. Keep analytics disabled in Development and Preview. Runtime also requires HTTPS and an exact approved public hostname, so localhost, arbitrary custom hosts, and `*.vercel.app` cannot collect even if a production build is reused.

**Do not activate until steps 2–4 have been checked.** Stream settings are controlled in Google's UI, not in this repository.

## What is measured

| Event/metric | Meaning |
| --- | --- |
| `page_view` / Views | One event for the currently visible public page once consent and script loading are complete, then one for each pathname navigation, including Back/Forward |
| Sessions / Users | GA4's approximate visit/browser counts for consenting visitors, including GA's automatic session/engagement behavior |
| `contact_form_success` | The email provider accepted a form submission and returned a nonblank message ID; this is **not proof of inbox delivery, a person, a sale, or a qualified lead** |

Use **Reports → Engagement → Pages and screens** (or its current equivalent) and filter page path to `/contact` for contact-page views. Use the Events report for `contact_form_success`; optionally mark it as a key event. No custom dimensions are needed. Use the built-in **Hostname** dimension to compare domains if both actually serve pages; a redirect-only alias does not get a separate pageview.

No form contents, names, emails, provider message IDs, arbitrary event properties, User-ID, external referrers, query parameters, URL fragments, or unknown paths are passed to GA. Page paths and titles are allowlisted from checked-in public content. `/studio`, `/admin`, `/api`, and unknown routes are excluded. GA receives browser/device/network metadata and may derive coarse location from the request; don't describe these statistics as exact people counts.

The static standalone HTML/PDF files in `public/cheat-sheets` and `public/resume` do not render the Next.js layout and are **not instrumented**. This change does not add download/outbound-click events.

## Consent behavior

- Basic consent: no Google script, consent ping, or analytics event before acceptance; declining leaves the site and form usable
- Equal Accept/Decline controls; **Analytics preferences** in the footer reopens settings
- Choice is stored on this origin for 180 days; GA cookies are host-only and expire within 180 days without sliding renewal
- Global Privacy Control and Do Not Track block analytics even if an older stored choice was accepted; changes observed on focus also stop an already-running tag
- Changing or clearing the choice in another tab is honored; focus/BFCache restoration rechecks the choice. If saving a withdrawal fails, an in-memory denial takes priority over stale saved grants for the rest of the current document until another explicit choice. Removing the stale grant is attempted, but a browser that blocks both storage writes and deletion may retain it across a full reload; clear site data or keep the browser privacy signal enabled in that case.
- Withdrawal immediately sets Google's disable flag and removes the site's host-only GA cookies where browser access permits. Existing in-flight requests cannot be recalled; previously collected reports are not deleted
- Choices and browser identifiers are separate on each domain. Cross-domain linking is intentionally not configured, so one person moving between domains can count as two users/sessions
- Analytics is best-effort: blocked cookie access or a thrown tag call cannot turn a provider-accepted contact submission into a send error.
- Blocked scripts, no consent, privacy signals, and ad blockers produce undercounts. A page visited only while the script is loading may be omitted; on load, only the current eligible page is measured

## Automated checks

```bash
npm ci
npm run lint
npm run typecheck
npm run test:analytics
npm run build
```

`test:analytics` uses the built-in Node test runner and TypeScript stripping; run tests with Node **22.18+ or 24+**. The application dependencies are unchanged. Focused tests never contact Google or Resend.

## Required production verification

Do this after an explicitly authorized deployment, using a clean browser profile. Network observation and GA Realtime are both required; unit tests cannot certify a property's remote settings.

1. Open each serving domain with a harmless synthetic query/hash, e.g. `/contact?qa=test#test`. Before consent, verify zero requests to `googletagmanager.com` and `google-analytics.com`, and no `_ga` cookies.
2. Choose Decline, navigate via the menu and Back/Forward, then reload. Verify no Google requests or GA cookies and that the form remains usable. Do not submit a real message just to test metrics.
3. Reopen preferences and Accept. Verify one initial `page_view`, then one per actual pathname navigation. Query/hash-only changes and repeated renders must not add pageviews.
4. Inspect outgoing `collect` parameters. `dl` must contain only approved origin/path, `dr` must be empty, titles must be controlled, and no query, hash, email, message, provider ID, `user_id`, advertising identifier, or auto form/link event should appear. Confirm Google signals and advertising remain disabled.
5. Visit `/studio`, `/admin`, and an unknown URL directly and through client navigation. They must not emit pageviews/contact events. Test a Preview URL and localhost; neither may load the tag.
6. Withdraw consent, verify the disable flag and cleared cookies, then navigate/reload and confirm no later collection. Repeat with GPC/DNT and a second tab. A request already in flight at withdrawal may finish.
7. For form success, use a test harness with mocked `/api/contact` responses: failure, malformed data, honeypot `{ok:true}`, and `{ok:true,id:"test-provider-id"}`. Only the last should record `contact_form_success`. An actual mail delivery test needs separate authorization and should use synthetic content.
8. Confirm expected pageviews and the synthetic success test in **Realtime** or **DebugView** (using Tag Assistant for a debug session, not a permanent debug environment variable). Processed reports can lag. Clear test traffic through appropriate reporting filters if needed; do not equate sending a request with receiving it in GA.

## Rollback

Set `NEXT_PUBLIC_ANALYTICS_ENABLED=false` and rebuild/redeploy. This removes new collection and the first-visit prompt. Existing open tabs need to reload; visitors can immediately disable their own collection through Analytics preferences. Remove the measurement ID as well if retiring the integration. No contact-form secrets or existing contact behavior depend on analytics.

## Official references

- [Google: manual pageviews and history-based duplicates](https://developers.google.com/analytics/devguides/collection/ga4/views)
- [Google: basic versus advanced consent](https://developers.google.com/tag-platform/security/concepts/consent-mode)
- [Google: disable Analytics and advertising features](https://developers.google.com/tag-platform/security/guides/privacy)
- [Google: GA4 configuration fields and cookie settings](https://developers.google.com/analytics/devguides/collection/ga4/reference/config)
- [Next.js 14: usePathname](https://nextjs.org/docs/14/app/api-reference/functions/use-pathname)
