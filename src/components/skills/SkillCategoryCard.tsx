import type { SkillCategory } from "@/data/skills";
import { SkillBar } from "./SkillBar";
import { Reveal } from "@/components/ui/Reveal";

export function SkillCategoryCard({ category, delay = 0 }: { category: SkillCategory; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <div className="h-full rounded-2xl border border-ink-200/70 dark:border-ink-700/70 bg-paper-100/60 dark:bg-ink-800/40 p-6">
        <h3 className="font-display text-lg font-semibold text-ink-900 dark:text-paper-100">{category.title}</h3>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{category.blurb}</p>
        <div className="mt-5 space-y-4">
          {category.skills.map((skill) => (
            <SkillBar key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </Reveal>
  );
}
