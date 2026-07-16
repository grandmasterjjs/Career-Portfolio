import { cn } from "@/lib/utils";

export function TagPill({
  children,
  active,
  onClick,
  className,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const Comp = onClick ? "button" : "span";
  return (
    <Comp
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 font-mono text-xs transition-colors",
        active
          ? "border-ember-500 bg-ember-500/10 text-ember-700 dark:text-ember-400"
          : "border-ink-200 dark:border-ink-700 text-ink-500 dark:text-ink-300 hover:border-ember-400 hover:text-ember-700 dark:hover:text-ember-400",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </Comp>
  );
}
