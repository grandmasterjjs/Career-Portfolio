import type { Metadata } from "next";
import Image from "next/image";
import { Download, GraduationCap, Award } from "lucide-react";
import { Section, SectionHeading } from "@/components/layout/Section";
import { ResumeTimeline } from "@/components/resume/ResumeTimeline";
import { Button } from "@/components/ui/Button";
import { experience, education, certifications } from "@/data/experience";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Résumé",
  description: "Interactive résumé — expandable career history, metrics, technologies, education, and certifications.",
};

export default function ResumePage() {
  return (
    <Section className="pt-16">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div className="flex items-start gap-5">
          <div className="relative hidden h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-ink-200/70 dark:border-ink-700/70 sm:block">
            <Image
              src="/images/photos/resume-portrait.jpg"
              alt="J.J. Smiley portrait"
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
          <SectionHeading
            as="h1"
            eyebrow="Résumé"
            title="25 years, expanded"
            description="The same career history you'd find on a PDF — except you can dig into any position for the metrics and technologies behind it."
          />
        </div>
        <Button href={profile.resumePdf} variant="primary" icon={<Download size={16} />} external>
          Download PDF
        </Button>
      </div>

      <div className="mt-12">
        <ResumeTimeline items={experience} />
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-ink-200/70 dark:border-ink-700/70 bg-paper-100/60 dark:bg-ink-800/40 p-6">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-400 dark:text-ink-500">
            <GraduationCap size={14} /> Education
          </div>
          <ul className="mt-4 space-y-4">
            {education.map((e) => (
              <li key={e.school}>
                <div className="font-display font-semibold text-ink-900 dark:text-paper-100">{e.school}</div>
                <div className="text-sm text-ink-500 dark:text-ink-400">{e.credential}</div>
                <div className="font-mono text-xs text-ink-400 dark:text-ink-500">{e.years}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-ink-200/70 dark:border-ink-700/70 bg-paper-100/60 dark:bg-ink-800/40 p-6">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-400 dark:text-ink-500">
            <Award size={14} /> Certifications
          </div>
          <ul className="mt-4 space-y-4">
            {certifications.map((c) => (
              <li key={c.name}>
                <div className="font-display font-semibold text-ink-900 dark:text-paper-100">{c.name}</div>
                <div className="font-mono text-xs text-ink-400 dark:text-ink-500">Certified {c.year}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
