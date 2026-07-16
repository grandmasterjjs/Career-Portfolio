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
    <Reveal delay={delay}>
      <div className="rounded-2xl border border-ink-200/70 dark:border-ink-700/70 bg-paper-100/60 dark:bg-ink-800/40 p-5">
        <div className="flex items-center gap-2">
          <Server size={16} className="text-signal-500" />
          <span className="font-mono text-sm font-semibold text-ink-900 dark:text-paper-100">{name}</span>
        </div>
        <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">{role}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <span key={t} className="rounded-md bg-ink-100 dark:bg-ink-700/60 px-2 py-0.5 font-mono text-[11px] text-ink-600 dark:text-ink-300">
              {t}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
