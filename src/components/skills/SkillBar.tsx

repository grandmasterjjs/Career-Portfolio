"use client";

import { motion } from "framer-motion";
import type { Skill } from "@/data/skills";

export function SkillBar({ skill }: { skill: Skill }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium text-ink-700 dark:text-ink-200">{skill.name}</span>
        <span className="font-mono text-xs text-ink-400 dark:text-ink-500">{skill.level}%</span>
      </div>
      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-ink-100 dark:bg-ink-700/60">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-ember-500 to-signal-500"
        />
      </div>
    </div>
  );
}
