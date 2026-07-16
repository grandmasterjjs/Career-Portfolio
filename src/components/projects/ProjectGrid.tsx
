"use client";

import { useMemo, useState } from "react";
import { projects, allTags, type ProjectTag } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { TagPill } from "@/components/ui/TagPill";
import { X } from "lucide-react";

export function ProjectGrid() {
  const [active, setActive] = useState<ProjectTag[]>([]);

  const filtered = useMemo(() => {
    if (active.length === 0) return projects;
    return projects.filter((p) => active.every((tag) => p.tags.includes(tag)));
  }, [active]);

  function toggle(tag: ProjectTag) {
    setActive((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {allTags.map((tag) => (
          <TagPill key={tag} active={active.includes(tag)} onClick={() => toggle(tag)}>
            {tag}
          </TagPill>
        ))}
        {active.length > 0 && (
          <button
            onClick={() => setActive([])}
            className="inline-flex items-center gap-1 rounded-full px-3 py-1 font-mono text-xs text-ink-400 hover:text-ember-500"
          >
            <X size={12} /> clear
          </button>
        )}
      </div>

      <p className="mt-4 font-mono text-xs text-ink-400 dark:text-ink-500">
        {filtered.length} project{filtered.length === 1 ? "" : "s"}
        {active.length > 0 ? ` matching ${active.join(" + ")}` : ""}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      ) : (
        <div className="mt-16 rounded-2xl border border-dashed border-ink-300 dark:border-ink-700 p-12 text-center text-ink-400 dark:text-ink-500">
          No projects match that combination yet. Try clearing a filter.
        </div>
      )}
    </div>
  );
}
