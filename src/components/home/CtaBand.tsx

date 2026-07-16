import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { ArrowRight, Download } from "lucide-react";
import { profile } from "@/data/profile";

export function CtaBand() {
  return (
    <Container className="pb-24">
      <div className="relative overflow-hidden rounded-3xl border border-ink-200/70 dark:border-ink-700/70 bg-ink-900 dark:bg-ink-800 px-6 py-14 text-center sm:px-16">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-ember-500/30 blur-[100px]" />
        <h2 className="relative font-display text-2xl sm:text-3xl font-semibold text-paper-100">
          Looking for someone who can run the desk and rebuild it at the same time?
        </h2>
        <p className="relative mx-auto mt-3 max-w-xl text-ink-300">
          Let&apos;s talk about your team, your ticket queue, and where automation could give your people their time back.
        </p>
        <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href="/contact" variant="primary" icon={<ArrowRight size={16} />}>
            Get in touch
          </Button>
          <Button href={profile.resumePdf} variant="secondary" icon={<Download size={16} />} external>
            Download résumé
          </Button>
        </div>
      </div>
    </Container>
  );
}
