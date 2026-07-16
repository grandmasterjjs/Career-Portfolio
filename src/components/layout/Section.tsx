import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

export function Section({
  children,
  className,
  containerClassName,
  id,
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-20 md:py-28", className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 dark:border-ink-700 bg-paper-100/60 dark:bg-ink-800/60 px-3 py-1 font-mono text-xs uppercase tracking-widest text-ink-500 dark:text-ink-300">
      <span className="h-1.5 w-1.5 rounded-full bg-ember-500" />
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
}) {
  const Heading = as;
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading className="mt-4 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-ink-900 dark:text-paper-100">
        {title}
      </Heading>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-ink-500 dark:text-ink-300">{description}</p>
      )}
    </div>
  );
}
