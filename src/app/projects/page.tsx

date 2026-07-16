import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/layout/Section";
import { ProjectGrid } from "@/components/projects/ProjectGrid";

export const metadata: Metadata = {
  title: "Projects",
  description: "Automation, AI adoption, and operations engineering projects — filterable by technology.",
};

export default function ProjectsPage() {
  return (
    <Section className="pt-16">
      <SectionHeading
        as="h1"
        eyebrow="Projects"
        title="Automation with a paper trail"
        description="Every project here started as a real bottleneck. Filter by technology to find what's most relevant to you."
      />
      <div className="mt-10">
        <ProjectGrid />
      </div>
    </Section>
  );
}
