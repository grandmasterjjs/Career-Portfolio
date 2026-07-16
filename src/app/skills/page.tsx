import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/layout/Section";
import { SkillCategoryCard } from "@/components/skills/SkillCategoryCard";
import { skillCategories } from "@/data/skills";

export const metadata: Metadata = {
  title: "Skills",
  description: "Proficiency across systems administration, cloud, networking, automation, programming, leadership, documentation, security, and AI.",
};

export default function SkillsPage() {
  return (
    <Section className="pt-16">
      <SectionHeading
        as="h1"
        eyebrow="Skills"
        title="What I actually spend my time doing"
        description="Self-assessed, grounded in real project work rather than a certification checklist."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {skillCategories.map((cat, i) => (
          <SkillCategoryCard key={cat.id} category={cat} delay={i * 0.05} />
        ))}
      </div>
    </Section>
  );
}
