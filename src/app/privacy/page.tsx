import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/layout/Section";
import { AnalyticsSettings } from "@/components/analytics/AnalyticsProvider";

export const metadata: Metadata = { title: "Privacy", description: "Contact form and optional analytics privacy information." };

export default function PrivacyPage() {
  return (
    <Section className="pt-16">
      <SectionHeading as="h1" eyebrow="Privacy" title="Your privacy and choices" />
      <div className="mt-8 max-w-3xl space-y-6 text-ink-700 dark:text-ink-200">
        <section>
          <h2 className="mb-2 font-display text-xl font-semibold">Optional analytics</h2>
          <p>If you accept, this portfolio uses Google Analytics 4 to understand visits, page views, and contact-form submissions accepted by the email provider. Google receives basic browser and device information and processes your IP address when requests reach its servers. Analytics cookies help distinguish browsers and sessions; these counts are estimates, not a list of people.</p>
          <p className="mt-3">Analytics stays off until you accept. Declining does not affect the site or contact form. Advertising, Google signals, cross-domain identification, and User-ID tracking are not enabled. Query strings, URL fragments, external referrers, and contact-form contents are excluded from our analytics events.</p>
        </section>
        <section>
          <h2 className="mb-2 font-display text-xl font-semibold">Cookies and your choice</h2>
          <p>Your analytics preference is stored in this browser on this domain for up to 180 days. If accepted, first-party Google Analytics cookies (_ga and _ga_...) also expire within 180 days. Preferences are separate on grandmasterj.com and jjsmiley.net. We respect browsers that send Global Privacy Control or Do Not Track.</p>
          <p className="mt-3">You can withdraw through the footer&apos;s Analytics preferences button. This stops new analytics activity and removes this site&apos;s analytics cookies where the browser permits. It cannot recall requests already sent or delete previously collected reports. Clearing browser storage resets your choice.</p>
          <div className="mt-3"><AnalyticsSettings /></div>
        </section>
        <section>
          <h2 className="mb-2 font-display text-xl font-semibold">Contact form</h2>
          <p>Submitting the form sends your name, email address, and message to the site owner through Resend so the owner can respond. These details and the provider&apos;s message identifier are never included in analytics. Opening an email link uses your email app instead.</p>
        </section>
        <p>For more information, see <a href="https://policies.google.com/privacy" className="underline" rel="noreferrer">Google&apos;s privacy policy</a> and <a href="https://resend.com/legal/privacy-policy" className="underline" rel="noreferrer">Resend&apos;s privacy policy</a>.</p>
      </div>
    </Section>
  );
}
