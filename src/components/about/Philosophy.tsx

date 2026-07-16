import { Quote } from "lucide-react";

export function Philosophy({ quote, attribution }: { quote: string; attribution?: string }) {
  return (
    <blockquote className="relative rounded-2xl border border-ink-200/70 dark:border-ink-700/70 bg-paper-100/60 dark:bg-ink-800/40 p-6 sm:p-8">
      <Quote className="text-ember-500/50" size={28} />
      <p className="mt-3 font-display text-xl sm:text-2xl font-medium leading-snug text-ink-900 dark:text-paper-100">
        {quote}
      </p>
      {attribution && <footer className="mt-3 font-mono text-xs text-ink-400 dark:text-ink-500">{attribution}</footer>}
    </blockquote>
  );
}
