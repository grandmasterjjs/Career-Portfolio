import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/layout/Section";
import { AnalyticsSettings } from "@/components/analytics/AnalyticsProvider";

export const metadata: Metadata = { title: "Privacy", description: "Contact form, basic pageview counts, and optional Google Analytics privacy information." };

export default function PrivacyPage() {
  const googleEnabled = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true";
  return (
    <Section className="pt-16">
      <SectionHeading as="h1" eyebrow="Privacy" title="Your privacy and choices" />
      <div className="mt-8 max-w-3xl space-y-6 text-ink-700 dark:text-ink-200">
        <section>
          <h2 className="mb-2 font-display text-xl font-semibold">Basic pageview counts</h2>
          <p>The production career site uses Vercel Web Analytics to count visits and views of public pages, including the contact page. This baseline does not use analytics cookies, advertising trackers, custom events, or contact-form contents.</p>
          <p className="mt-3">Vercel uses a visitor hash derived from incoming requests that is discarded after 24 hours. It also processes referrer, device and browser information, and approximate location. Reports are aggregate estimates rather than an exact count of people; someone visiting on another day, domain, or device may be counted again.</p>
          <p className="mt-3">We restrict pageview event URLs to known public page paths and strip query strings and URL fragments from those URLs. Referrer and browser-request metadata are still processed by Vercel. Development, preview, studio, admin, API, and unknown pages are excluded. Browsers with Global Privacy Control or Do Not Track enabled are excluded too.</p>
        </section>
        <section>
          <h2 className="mb-2 font-display text-xl font-semibold">Optional Google Analytics</h2>
          {!googleEnabled && <p className="mb-3">Google Analytics is currently disabled for this rollout. No Google tag or cookieless Google analytics pings are sent.</p>}
          <p>If Google Analytics is enabled in the future, it will remain off until you explicitly accept it. It can then use cookies to measure visits, page views, and contact submissions accepted by the email provider. Google receives browser/device information and processes the IP address when requests reach its servers. Advertising, Google signals, cross-domain identification, and User-ID tracking are not enabled.</p>
          <p className="mt-3">Names, email addresses, messages, and provider message IDs are never included in Google Analytics events. The optional Google integration also excludes query strings, URL fragments, and external referrers from its event fields.</p>
        </section>
        <section>
          <h2 className="mb-2 font-display text-xl font-semibold">Your choices</h2>
          <p>Global Privacy Control and Do Not Track stop the basic Vercel pageview counts and optional Google Analytics. Google Analytics preferences in the footer apply only to the optional Google service; declining that service does not change the separate cookieless Vercel baseline or prevent use of the site and contact form.</p>
          <p className="mt-3">When you make a Google Analytics choice, it is stored in this browser on this domain for up to 180 days. If you accept an enabled Google integration, its host-only _ga and _ga_... cookies also expire within 180 days. Withdrawing stops new Google analytics activity and removes those cookies where the browser permits. It cannot recall requests already sent or delete earlier reports. Preferences are separate on grandmasterj.com and jjsmiley.net.</p>
          <div className="mt-3"><AnalyticsSettings /></div>
        </section>
        <section>
          <h2 className="mb-2 font-display text-xl font-semibold">Contact form</h2>
          <p>Submitting the form sends your name, email address, and message to the site owner through Resend so the owner can respond. These details and the provider&apos;s message identifier are never included in analytics. Opening an email link uses your email app instead.</p>
        </section>
        <p>For more information, see <a href="https://vercel.com/docs/analytics/privacy-policy" className="underline" rel="noreferrer">Vercel&apos;s analytics privacy information</a>, <a href="https://policies.google.com/privacy" className="underline" rel="noreferrer">Google&apos;s privacy policy</a>, and <a href="https://resend.com/legal/privacy-policy" className="underline" rel="noreferrer">Resend&apos;s privacy policy</a>.</p>
      </div>
    </Section>
  );
}
