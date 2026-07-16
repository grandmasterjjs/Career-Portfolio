"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-9 w-9" />;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      aria-label="Toggle dark mode"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-200 hover:border-ember-500 hover:text-ember-500 transition-colors"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
