import type { Metadata } from "next";
import Image from "next/image";
import { Github, Linkedin, Mail, Download, MapPin } from "lucide-react";
import { Section, SectionHeading } from "@/components/layout/Section";
import { ContactForm } from "@/components/contact/ContactForm";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch — email, LinkedIn, GitHub, or a quick message form.",
};

const links = [
  { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
  { icon: Linkedin, label: "linkedin.com/in/jjsmiley", href: profile.linkedin },
  { icon: Github, label: "github.com/grandmasterjjs", href: profile.github },
];

export default function ContactPage() {
  return (
    <Section className="pt-16">
      <SectionHeading
        as="h1"
        eyebrow="Contact"
        title="Let's talk"
        description="Whether it's a role, a question about a project, or just a homelab war story — I read everything that comes through here."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-ink-200/70 dark:border-ink-700/70">
            <Image
              src="/images/photos/contact-portrait.jpg"
              alt="J.J. Smiley portrait"
              fill
              sizes="(min-width: 1024px) 420px, 90vw"
              className="object-cover"
            />
          </div>
          <div className="rounded-2xl border border-ink-200/70 dark:border-ink-700/70 bg-paper-100/60 dark:bg-ink-800/40 p-6">
            <div className="flex items-center gap-2 text-sm text-ink-500 dark:text-ink-400">
              <MapPin size={14} /> {profile.location}
            </div>
            <ul className="mt-5 space-y-4">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="inline-flex items-center gap-2.5 text-sm font-medium text-ink-700 dark:text-ink-200 hover:text-ember-700 dark:hover:text-ember-400"
                  >
                    <l.icon size={16} /> {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={profile.resumePdf}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink-300 dark:border-ink-600 px-4 py-2 text-sm font-medium text-ink-700 dark:text-ink-200 hover:border-ember-500 hover:text-ember-700 dark:hover:text-ember-400"
            >
              <Download size={14} /> Download résumé
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-ink-200/70 dark:border-ink-700/70 bg-paper-100/60 dark:bg-ink-800/40 p-6 sm:p-8">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
