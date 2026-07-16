import Link from "next/link";
import { ArrowUpRight, Bot, Terminal, BarChart3, Sparkles, ImageIcon } from "lucide-react";
import type { Project } from "@/data/projects";
import { TagPill } from "@/components/ui/TagPill";
import { cn } from "@/lib/utils";

const icons = { bot: Bot, terminal: Terminal, chart: BarChart3, sparkles: Sparkles, image: ImageIcon };

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const Icon = icons[project.icon];
  const accentBg = project.accent === "ember" ? "from-ember-500/25 to-ember-500/0" : "from-signal-500/25 to-signal-500/0";
  const accentText = project.accent === "ember" ? "text-ember-500" : "text-signal-500";

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink-200/70 dark:border-ink-700/70 bg-paper-100/60 dark:bg-ink-800/40 transition-all duration-300 hover:-translate-y-1 hover:border-ember-400/60 hover:shadow-xl"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className={cn("relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br", accentBg)}>
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        <Icon size={56} className={cn(accentText, "relative opacity-90 transition-transform duration-300 group-hover:scale-110")} />
        {project.metric && (
          <div className="absolute bottom-3 right-3 rounded-lg bg-paper-100/90 dark:bg-ink-900/90 px-2.5 py-1 font-mono text-xs text-ink-700 dark:text-ink-200 backdrop-blur">
            {project.metric.value} <span className="text-ink-400 dark:text-ink-500">{project.metric.label}</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold text-ink-900 dark:text-paper-100 group-hover:text-ember-700 dark:group-hover:text-ember-400 transition-colors">
          {project.name}
        </h3>
        <p className="mt-2 flex-1 text-sm text-ink-500 dark:text-ink-400">{project.pitch}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <TagPill key={tag}>{tag}</TagPill>
          ))}
          {project.tags.length > 3 && <TagPill>+{project.tags.length - 3}</TagPill>}
        </div>

        <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-ink-600 dark:text-ink-300 group-hover:text-ember-700 dark:group-hover:text-ember-400">
          Read the case study
          <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  );
}
