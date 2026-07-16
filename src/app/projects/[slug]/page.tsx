import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github, Lock } from "lucide-react";
import { projects } from "@/data/projects";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { TagPill } from "@/components/ui/TagPill";
import { Reveal } from "@/components/ui/Reveal";
import { ArchitectureFlow } from "@/components/projects/ArchitectureFlow";
import { ProjectCard } from "@/components/projects/ProjectCard";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return { title: project.name, description: project.pitch };
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return notFound();

  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <>
      <Section className="pb-8 pt-12">
        <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-ember-500 dark:text-ink-400">
          <ArrowLeft size={14} /> All projects
        </Link>

        <Reveal>
          <h1 className="mt-6 max-w-3xl font-display text-3xl sm:text-4xl font-semibold tracking-tight text-ink-900 dark:text-paper-100">
            {project.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-500 dark:text-ink-300">{project.pitch}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <TagPill key={tag}>{tag}</TagPill>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            {project.githubUrl ? (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-700 dark:text-ink-200 hover:text-ember-500">
                <Github size={16} /> View repository <ArrowUpRight size={12} />
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm text-ink-400 dark:text-ink-500">
                <Lock size={14} /> Private — built in an employer environment, details on request
              </span>
            )}
            {project.metric && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-ember-500/10 px-3 py-1 font-mono text-xs text-ember-700 dark:text-ember-400">
                {project.metric.value} {project.metric.label}
              </span>
            )}
          </div>
        </Reveal>
      </Section>

      <Container className="grid gap-10 pb-16 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-10">
          <Reveal>
            <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-paper-100">The problem</h2>
            <p className="mt-3 text-ink-600 dark:text-ink-300">{project.problem}</p>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-paper-100">The solution</h2>
            <p className="mt-3 text-ink-600 dark:text-ink-300">{project.solution}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-paper-100">Impact</h2>
            <ul className="mt-3 space-y-2">
              {project.benefits.map((b) => (
                <li key={b} className="flex gap-2 text-ink-600 dark:text-ink-300">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ember-500" />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>

          {project.architecture && (
            <Reveal delay={0.15}>
              <h2 className="mb-3 font-display text-xl font-semibold text-ink-900 dark:text-paper-100">How it works</h2>
              <ArchitectureFlow steps={project.architecture} />
            </Reveal>
          )}

          <Reveal delay={0.2}>
            <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-paper-100">Lessons learned</h2>
            <ul className="mt-3 space-y-3">
              {project.lessons.map((l) => (
                <li key={l} className="rounded-xl border border-ink-200/70 dark:border-ink-700/70 bg-paper-100/60 dark:bg-ink-800/40 p-4 text-sm text-ink-600 dark:text-ink-300">
                  {l}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-ink-200/70 dark:border-ink-700/70 bg-paper-100/60 dark:bg-ink-800/40 p-6">
            <div className="font-mono text-xs uppercase tracking-widest text-ink-400 dark:text-ink-500">
              Technologies
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span key={t} className="rounded-lg bg-ink-100 dark:bg-ink-700/60 px-2.5 py-1 font-mono text-xs text-ink-600 dark:text-ink-200">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {related.length > 0 && (
        <Section className="border-t border-ink-200/60 dark:border-ink-800/60 pt-16">
          <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-paper-100">More projects</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {related.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
