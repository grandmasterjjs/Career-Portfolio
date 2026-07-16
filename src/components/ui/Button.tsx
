import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  icon?: ReactNode;
  external?: boolean;
  className?: string;
};

export function Button({ href, children, variant = "primary", icon, external, className }: ButtonProps) {
  const base =
    "group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none";
  const styles = {
    primary:
      "bg-ink-900 text-paper-100 hover:bg-ember-700 dark:bg-paper-100 dark:text-ink-900 dark:hover:bg-ember-400 shadow-sm hover:shadow-md hover:-translate-y-0.5",
    secondary:
      "border border-ink-300 dark:border-ink-600 text-ink-700 dark:text-ink-100 hover:border-ember-500 hover:text-ember-700 dark:hover:text-ember-400 hover:-translate-y-0.5",
    ghost: "text-ink-600 dark:text-ink-300 hover:text-ember-700 dark:hover:text-ember-400",
  };

  const content = (
    <>
      {children}
      {icon}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cn(base, styles[variant], className)}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(base, styles[variant], className)}>
      {content}
    </Link>
  );
}
