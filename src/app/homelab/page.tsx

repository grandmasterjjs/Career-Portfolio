import type { Metadata } from "next";
import Image from "next/image";
import { Bot, Database, Activity, Link2, Construction } from "lucide-react";
import { Section, SectionHeading } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Philosophy } from "@/components/about/Philosophy";
import { NetworkDiagram } from "@/components/homelab/NetworkDiagram";
import { ServiceCard } from "@/components/homelab/ServiceCard";
import { homelab } from "@/data/homelab";

export const metadata: Metadata = {
  title: "Homelab",
  description: "A real, running home infrastructure stack — Proxmox, UniFi, Tailscale, Netdata, and a personal AI ops assistant.",
};

export default function HomelabPage() {
  return (
    <>
      <Section className="pb-10 pt-16">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <SectionHeading as="h1"
          eyebrow="Homelab" title="GrandMasterJ.com — infrastructure I run for fun" description={homelab.intro} />
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-ink-200/70 dark:border-ink-700/70">
            <Image
              src="/images/photos/homelab-thinking.jpg"
              alt="J.J. Smiley at his homelab workstation, server rack in the background"
              fill
              sizes="(min-width: 1024px) 480px, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <h2 className="mb-4 font-display text-xl font-semibold text-ink-900 dark:text-paper-100">Network layout</h2>
        <Reveal>
          <NetworkDiagram />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-3xl text-sm text-ink-500 dark:text-ink-400">{homelab.network.reverseProxy}</p>
        </Reveal>
      </Section>

      <Section className="bg-paper-200/40 dark:bg-ink-900/40">
        <h2 className="mb-6 font-display text-xl font-semibold text-ink-900 dark:text-paper-100">Compute</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {homelab.compute.map((c, i) => (
            <ServiceCard key={c.name} name={c.name} role={c.role} tags={c.tags} delay={i * 0.05} />
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-semibold text-ink-900 dark:text-paper-100">
              <Database size={18} className="text-ember-500" /> Storage
            </h2>
            <div className="space-y-3">
              {homelab.storage.map((s) => (
                <Reveal key={s.name}>
                  <div className="rounded-xl border border-ink-200/70 dark:border-ink-700/70 bg-paper-100/60 dark:bg-ink-800/40 p-4">
                    <div className="font-mono text-sm font-semibold text-ink-900 dark:text-paper-100">{s.name}</div>
                    <div className="mt-1 text-sm text-ink-500 dark:text-ink-400">{s.detail}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-semibold text-ink-900 dark:text-paper-100">
              <Link2 size={18} className="text-signal-500" /> Overlay network
            </h2>
            <Reveal>
              <div className="rounded-xl border border-ink-200/70 dark:border-ink-700/70 bg-paper-100/60 dark:bg-ink-800/40 p-4 space-y-2 text-sm text-ink-600 dark:text-ink-300">
                <div><span className="font-mono text-ink-400 dark:text-ink-500">tailnet:</span> {homelab.overlay.tailnet}</div>
                <div><span className="font-mono text-ink-400 dark:text-ink-500">model:</span> {homelab.overlay.model}</div>
                <div>{homelab.overlay.subnetRouters}</div>
                <div>{homelab.overlay.aiNode}</div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section className="bg-paper-200/40 dark:bg-ink-900/40">
        <h2 className="mb-6 flex items-center gap-2 font-display text-xl font-semibold text-ink-900 dark:text-paper-100">
          <Activity size={18} className="text-ember-500" /> Monitoring
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Reveal>
            <div className="rounded-xl border border-ink-200/70 dark:border-ink-700/70 bg-paper-100/60 dark:bg-ink-800/40 p-4">
              <div className="font-mono text-xs uppercase tracking-widest text-ink-400 dark:text-ink-500">Platform</div>
              <div className="mt-1 font-semibold text-ink-900 dark:text-paper-100">{homelab.monitoring.platform}</div>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="rounded-xl border border-ink-200/70 dark:border-ink-700/70 bg-paper-100/60 dark:bg-ink-800/40 p-4">
              <div className="font-mono text-xs uppercase tracking-widest text-ink-400 dark:text-ink-500">Parent node</div>
              <div className="mt-1 font-semibold text-ink-900 dark:text-paper-100">{homelab.monitoring.parent}</div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-xl border border-ink-200/70 dark:border-ink-700/70 bg-paper-100/60 dark:bg-ink-800/40 p-4">
              <div className="font-mono text-xs uppercase tracking-widest text-ink-400 dark:text-ink-500">Coverage</div>
              <div className="mt-1 text-sm text-ink-600 dark:text-ink-300">{homelab.monitoring.coverage}</div>
            </div>
          </Reveal>
        </div>
        <p className="mt-4 text-xs text-ink-400 dark:text-ink-500">{homelab.monitoring.knownIssue}</p>
      </Section>

      <Section>
        <Reveal>
          <div className="rounded-2xl border border-ember-500/30 bg-ember-500/5 p-6 sm:p-8">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ember-700 dark:text-ember-400">
              <Bot size={16} /> AI Ops
            </div>
            <h2 className="mt-2 font-display text-xl font-semibold text-ink-900 dark:text-paper-100">
              Meet {homelab.aiOps.name}, running on {homelab.aiOps.platform}
            </h2>
            <p className="mt-3 max-w-2xl text-ink-600 dark:text-ink-300">{homelab.aiOps.description}</p>
          </div>
        </Reveal>
      </Section>

      <Section className="bg-paper-200/40 dark:bg-ink-900/40">
        <h2 className="mb-6 flex items-center gap-2 font-display text-xl font-semibold text-ink-900 dark:text-paper-100">
          <Construction size={18} className="text-ink-400" /> What&apos;s in flight
        </h2>
        <div className="space-y-3">
          {homelab.inFlight.map((item) => (
            <Reveal key={item}>
              <div className="rounded-xl border border-dashed border-ink-300 dark:border-ink-700 p-4 text-sm text-ink-500 dark:text-ink-400">
                {item}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 sm:grid-cols-2">
          {homelab.philosophy.map((quote) => (
            <Philosophy key={quote} quote={quote} />
          ))}
        </div>
      </Section>
    </>
  );
}
