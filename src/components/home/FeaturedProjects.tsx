import { projects } from "@/data/projects";
import { Section, SectionHeading } from "@/components/layout/Section";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight } from "lucide-react";

export function FeaturedProjects() {
  const featured = projects.slice(0, 3);
  return (
    <Section>
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading
          eyebrow="Selected Work"
          title="Automation that gave time back to real teams"
          description="A few of the projects behind the numbers — problem, solution, and what I learned."
        />
        <Button href="/projects" variant="ghost" icon={<ArrowRight size={16} />} className="hidden sm:inline-flex">
          All projects
        </Button>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.08}>
            <ProjectCard project={project} index={i} />
          </Reveal>
        ))}
      </div>

      <div className="mt-8 sm:hidden">
        <Button href="/projects" variant="secondary" icon={<ArrowRight size={16} />}>
          All projects
        </Button>
      </div>
    </Section>
  );
}
