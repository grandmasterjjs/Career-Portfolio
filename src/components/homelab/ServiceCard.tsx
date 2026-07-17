import { Server } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function ServiceCard({
  name,
  role,
  tags,
  delay = 0,
}: {
  name: string;
  role: string;
  tags: string[];
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="flex h-full min-w-0 flex-col rounded-2xl border border-ink-200/70 bg-paper-100/60 p-5 dark:border-ink-700/70 dark:bg-ink-800/40">
        <div className="flex min-w-0 items-center gap-2">
          <Server size={16} className="shrink-0 text-signal-500" />
          <span className="break-words font-mono text-sm font-semibold text-ink-900 dark:text-paper-100">{name}</span>
        </div>
        <p className="mt-2 break-words text-sm text-ink-500 dark:text-ink-400">{role}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
          {tags.map((t) => (
            <span key={t} className="max-w-full break-words rounded-md bg-ink-100 px-2 py-0.5 font-mono text-[11px] text-ink-600 dark:bg-ink-700/60 dark:text-ink-300">
              {t}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
