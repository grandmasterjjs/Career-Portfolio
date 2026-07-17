"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { hasSanityConfig } from "@/sanity/env";

const Studio = dynamic(() => import("@/components/sanity/Studio"), {
  ssr: false,
});

export default function StudioPage() {
  if (!hasSanityConfig) {
    return (
      <main className="min-h-screen bg-paper px-6 py-16 text-ink-900 dark:bg-ink dark:text-paper-100">
        <div className="mx-auto max-w-2xl rounded-2xl border border-ink-200/70 bg-paper-100/70 p-8 dark:border-ink-700/70 dark:bg-ink-800/60">
          <p className="font-mono text-xs uppercase tracking-widest text-ember-600 dark:text-ember-400">
            Sanity Studio
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold">Connect Sanity to enable editing</h1>
          <p className="mt-4 text-ink-600 dark:text-ink-300">
            The embedded Studio is scaffolded, but this environment still needs Sanity project settings.
          </p>
          <div className="mt-6 space-y-2 rounded-xl bg-ink-900 p-4 font-mono text-sm text-paper-100">
            <div>NEXT_PUBLIC_SANITY_PROJECT_ID</div>
            <div>NEXT_PUBLIC_SANITY_DATASET</div>
          </div>
          <Link href="/" className="mt-6 inline-flex text-sm font-medium text-ember-700 dark:text-ember-400">
            Back to site
          </Link>
        </div>
      </main>
    );
  }

  return <Studio />;
}
