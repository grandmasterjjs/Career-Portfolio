import { Section, SectionHeading } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Terminal, Users, Wrench } from "lucide-react";

const pillars = [
  {
    icon: Terminal,
    title: "Automate the repeatable",
    body: "If I do something more than twice, it becomes a script. PowerShell and Bash aren't side projects — they're how a 3-person team supports 1,500 people.",
  },
  {
    icon: Users,
    title: "Build people, not just systems",
    body: "The best infrastructure fails without a team that can run it. Mentoring technicians into higher performers is the multiplier behind every metric on this site.",
  },
  {
    icon: Wrench,
    title: "Learn by breaking things at home",
    body: "My homelab is where I test ideas before they touch production — Proxmox, Docker, VLANs, and lately, AI-assisted ops, all on hardware I own.",
  },
];

export function AboutTeaser() {
  return (
    <Section className="bg-paper-200/40 dark:bg-ink-900/40">
      <SectionHeading
        eyebrow="How I Work"
        title="Twenty-five years of turning chaos into process"
        description="I got into IT because I liked figuring out why something was broken. I stayed because I found out I liked building the systems — and the teams — that keep it from breaking again."
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <div className="h-full rounded-2xl border border-ink-200/70 dark:border-ink-700/70 bg-paper-100/60 dark:bg-ink-800/40 p-6">
              <p.icon className="text-ember-500" size={22} />
              <h3 className="mt-4 font-display font-semibold text-ink-900 dark:text-paper-100">{p.title}</h3>
              <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">{p.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-8">
        <Button href="/about" variant="ghost" icon={<ArrowRight size={16} />}>
          Read my full story
        </Button>
      </div>
    </Section>
  );
}
