import type { Metadata } from "next";
import Image from "next/image";
import { Section, SectionHeading } from "@/components/layout/Section";
import { Timeline } from "@/components/about/Timeline";
import { Philosophy } from "@/components/about/Philosophy";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { milestones } from "@/data/milestones";
import { ArrowRight, Brain, Compass, HeartHandshake, Puzzle } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "How a 1996 phone-support job turned into 25 years of building automated, well-documented IT operations.",
};

const values = [
  {
    icon: Puzzle,
    title: "I like the puzzle, not just the fix",
    body: "A closed ticket is fine. Finding the root cause behind fifty closed tickets is the part that actually keeps me interested — that's what the trend-analysis and Pareto work at W.W. Williams was really about.",
  },
  {
    icon: HeartHandshake,
    title: "My job is to make my team look good",
    body: "Every metric on this site — MTTR, CSAT, throughput — is a team result, not a solo one. My management philosophy is simple: remove friction, coach hard, and get out of the way.",
  },
  {
    icon: Compass,
    title: "Automate first, escalate second",
    body: "If a task repeats, it becomes a script before it becomes a habit. PowerShell and Bash aren't hobbies for me — they're how a 3-person team supports 1,500 people without burning out.",
  },
  {
    icon: Brain,
    title: "New tools get tested at home first",
    body: "I don't wait for a vendor whitepaper to tell me if something's useful. My homelab and personal AI ops assistant are where I stress-test ideas like AI-assisted ops before I bring them to work.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section className="pb-10">
        <SectionHeading as="h1" eyebrow="About" title="The origin story" />
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <Reveal className="space-y-5 text-base leading-relaxed text-ink-600 dark:text-ink-300">
            <p>
              I got into technology the unglamorous way: answering phones. In 1996 I was supervising an
              8-person phone-support team at WinBook Computer Corporation, troubleshooting hardware and
              software issues with a customer on the line and no remote tools to see what they were seeing.
              You learn to ask the most revealing questions first.
            </p>
            <p>
              Almost thirty years later, I&apos;m still doing the same core job — helping people who are
              having a bad day with their technology — just at a very different scale. What&apos;s changed is
              how much of the repeatable work I can hand off to a script, a knowledge base article, or, more
              recently, an AI-assisted workflow, so my team can spend their time on the problems that actually
              need a human brain.
            </p>
            <p>
              What motivates me is watching a lean team outperform its headcount. At W.W. Williams, a team of three supported roughly 1,500 people — that only works because I obsessed over process redesign,
              automation, documentation, and elevating team members instead of just asking people to work harder. I built a PowerShell automation suite because manual Active Directory and license admin was eating hours we didn&apos;t have. I built ticket trend analysis because &quot;we keep seeing this issue&quot; doesn&apos;t really fly with upper management.
            </p>
            <p>
              I&apos;m genuinely energized by new technology, especially when it&apos;s early enough that most teams
              haven&apos;t figured out how to use it well yet. That&apos;s where I try to be useful — not just adopting
              a tool, but figuring out the training and workflow changes that make it actually stick. I did
              that with enterprise AI tools at work, and I do the same thing at home, where my personal
              homelab and my own AI ops assistant are a permanent testbed for &quot;does this actually save
              time, or is it just interesting?&quot;
            </p>
          </Reveal>

          <Reveal delay={0.1} className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-ink-200/70 dark:border-ink-700/70">
              <Image
                src="/images/photos/about-leadership.jpg"
                alt="J.J. Smiley presenting an IT service delivery framework to his team"
                fill
                sizes="(min-width: 1024px) 420px, 90vw"
                className="object-cover"
              />
            </div>
            <Philosophy
              quote="Automate the repeatable, document the rest, and build a team that outperforms its staffing numbers."
              attribution="— management philosophy, in one line"
            />
            <div className="rounded-2xl border border-ink-200/70 dark:border-ink-700/70 bg-paper-100/60 dark:bg-ink-800/40 p-6">
              <div className="font-mono text-xs uppercase tracking-widest text-ink-400 dark:text-ink-500">
                Fast facts
              </div>
              <ul className="mt-3 space-y-2 text-sm text-ink-600 dark:text-ink-300">
                <li>📍 Columbus, OH</li>
                <li>🕰️ 25+ years in IT, all of it in support &amp; operations leadership</li>
                <li>🧰 PowerShell, Bash, and increasingly Python</li>
                <li>🏠 Runs a full Proxmox / UniFi / Tailscale homelab, on-call for exactly no one but himself</li>
                <li>🤖 Built and deployed a personal AI ops assistant</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-paper-200/40 dark:bg-ink-900/40">
        <SectionHeading eyebrow="What I Believe" title="Four things that show up in everything I build" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-ink-200/70 dark:border-ink-700/70 bg-paper-100/60 dark:bg-ink-800/40 p-6">
                <v.icon className="text-ember-500" size={22} />
                <h3 className="mt-4 font-display font-semibold text-ink-900 dark:text-paper-100">{v.title}</h3>
                <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Career Timeline" title="From phone support to running the desk" description="Milestones, roughly in order — the full breakdown lives on the résumé page." />
        <div className="mt-12">
          <Timeline items={milestones} />
        </div>
        <div className="mt-12">
          <Button href="/resume" variant="secondary" icon={<ArrowRight size={16} />}>
            View the full interactive résumé
          </Button>
        </div>
      </Section>
    </>
  );
}
