import { ArrowDown } from "lucide-react";

export function ArchitectureFlow({ steps }: { steps: string[] }) {
  return (
    <div className="rounded-2xl border border-ink-200/70 dark:border-ink-700/70 bg-ink-900 dark:bg-ink-900 p-6 sm:p-8">
      <div className="mb-4 font-mono text-xs uppercase tracking-widest text-ink-500">Architecture / Flow</div>
      <div className="flex flex-col items-stretch gap-2">
        {steps.map((step, i) => (
          <div key={step} className="flex flex-col items-center">
            <div className="w-full rounded-xl border border-ink-700 bg-ink-800 px-4 py-3 text-sm text-paper-100">
              <span className="mr-2 font-mono text-ember-500">{String(i + 1).padStart(2, "0")}</span>
              {step}
            </div>
            {i < steps.length - 1 && <ArrowDown size={16} className="my-1 text-ink-600" />}
          </div>
        ))}
      </div>
    </div>
  );
}
