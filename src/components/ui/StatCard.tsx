import { Reveal } from "./Reveal";

export function StatCard({ label, value, delay = 0 }: { label: string; value: string; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <div className="rounded-2xl border border-ink-200/70 dark:border-ink-700/70 bg-paper-100/50 dark:bg-ink-800/40 p-5 backdrop-blur-sm">
        <div className="font-display text-3xl sm:text-4xl font-semibold text-gradient">{value}</div>
        <div className="mt-1 text-xs sm:text-sm uppercase tracking-wide text-ink-500 dark:text-ink-400">
          {label}
        </div>
      </div>
    </Reveal>
  );
}
