"use client";

import { Reveal } from "@/components/ui/Reveal";

export type Milestone = {
  year: string;
  title: string;
  place?: string;
  body: string;
  kind?: "career" | "education" | "personal";
};

const kindStyles: Record<string, string> = {
  career: "bg-ember-500",
  education: "bg-signal-500",
  personal: "bg-ink-400",
};

export function Timeline({ items }: { items: Milestone[] }) {
  return (
    <div className="relative">
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-ink-200 dark:bg-ink-700 sm:left-[9px]" />
      <div className="space-y-10">
        {items.map((item, i) => (
          <Reveal key={`${item.year}-${item.title}`} delay={i * 0.04}>
            <div className="relative flex gap-5 pl-6 sm:gap-8 sm:pl-8">
              <span
                className={`absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full ring-4 ring-paper dark:ring-ink ${kindStyles[item.kind ?? "career"]}`}
              />
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-ink-400 dark:text-ink-500">
                  {item.year}
                </div>
                <h3 className="mt-1 font-display text-lg font-semibold text-ink-900 dark:text-paper-100">
                  {item.title}
                  {item.place && <span className="ml-2 text-sm font-normal text-ink-400 dark:text-ink-500">{item.place}</span>}
                </h3>
                <p className="mt-1.5 max-w-2xl text-sm text-ink-500 dark:text-ink-400">{item.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
