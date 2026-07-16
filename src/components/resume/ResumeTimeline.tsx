"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { ExperienceEntry } from "@/data/experience";
import { cn } from "@/lib/utils";

export function ResumeTimeline({ items }: { items: ExperienceEntry[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="overflow-hidden rounded-2xl border border-ink-200/70 dark:border-ink-700/70 bg-paper-100/60 dark:bg-ink-800/40"
          >
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6"
              aria-expanded={isOpen}
            >
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-ink-400 dark:text-ink-500">
                  {item.start} — {item.end} · {item.duration}
                </div>
                <h3 className="mt-1 font-display text-lg sm:text-xl font-semibold text-ink-900 dark:text-paper-100">
                  {item.title}
                </h3>
                <div className="mt-0.5 text-sm text-ink-500 dark:text-ink-400">
                  {item.company} — {item.location}
                </div>
                {!isOpen && <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">{item.summary}</p>}
              </div>
              <ChevronDown
                size={20}
                className={cn("mt-1 shrink-0 text-ink-400 transition-transform duration-300", isOpen && "rotate-180 text-ember-500")}
              />
            </button>

            <div
              className={cn(
                "grid transition-all duration-300 ease-in-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <div className="border-t border-ink-200/70 dark:border-ink-700/70 p-5 sm:p-6 space-y-5">
                  <p className="text-sm text-ink-500 dark:text-ink-400">{item.summary}</p>

                  <div>
                    <div className="font-mono text-xs uppercase tracking-widest text-ink-400 dark:text-ink-500">
                      Key accomplishments
                    </div>
                    <ul className="mt-2 space-y-2">
                      {item.bullets.map((b) => (
                        <li key={b} className="flex gap-2 text-sm text-ink-600 dark:text-ink-300">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ember-500" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {item.metrics.length > 0 && (
                    <div>
                      <div className="font-mono text-xs uppercase tracking-widest text-ink-400 dark:text-ink-500">
                        Metrics
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {item.metrics.map((m) => (
                          <div key={m.label} className="rounded-lg border border-ink-200 dark:border-ink-700 px-3 py-1.5">
                            <span className="font-display text-sm font-semibold text-ember-700 dark:text-ember-400">{m.value}</span>
                            <span className="ml-1.5 text-xs text-ink-500 dark:text-ink-400">{m.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="font-mono text-xs uppercase tracking-widest text-ink-400 dark:text-ink-500">
                      Technologies
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {item.tech.map((t) => (
                        <span key={t} className="rounded-lg bg-ink-100 dark:bg-ink-700/60 px-2.5 py-1 font-mono text-xs text-ink-600 dark:text-ink-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
