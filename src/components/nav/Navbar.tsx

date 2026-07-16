"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";

const links = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
  { href: "/skills", label: "Skills" },
  { href: "/homelab", label: "Homelab" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-200/60 dark:border-ink-800/60 bg-paper/80 dark:bg-ink/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2 font-display text-lg font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-900 text-paper-100 dark:bg-paper-100 dark:text-ink-900 font-mono text-sm group-hover:bg-ember-500 group-hover:text-white transition-colors">
            JJ
          </span>
          <span className="hidden sm:inline text-ink-900 dark:text-paper-100">{profile.shortName}</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-ember-700 dark:text-ember-400"
                    : "text-ink-600 dark:text-ink-300 hover:text-ink-900 dark:hover:text-paper-100"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-200 lg:hidden"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-ink-200/60 dark:border-ink-800/60 bg-paper dark:bg-ink px-4 pb-4 pt-2">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium",
                  pathname === link.href
                    ? "bg-ember-500/10 text-ember-700 dark:text-ember-400"
                    : "text-ink-600 dark:text-ink-300"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
