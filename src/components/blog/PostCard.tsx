import Link from "next/link";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import type { PostMeta } from "@/lib/mdx";
import { TagPill } from "@/components/ui/TagPill";

export function PostCard({ post }: { post: PostMeta }) {
  const date = new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-2xl border border-ink-200/70 dark:border-ink-700/70 bg-paper-100/60 dark:bg-ink-800/40 p-6 transition-all hover:-translate-y-1 hover:border-ember-400/60 hover:shadow-xl"
    >
      <div className="flex items-center gap-4 font-mono text-xs text-ink-400 dark:text-ink-500">
        <span className="inline-flex items-center gap-1"><Calendar size={12} /> {date}</span>
        <span className="inline-flex items-center gap-1"><Clock size={12} /> {post.readingTime}</span>
      </div>
      <h3 className="mt-3 font-display text-xl font-semibold text-ink-900 dark:text-paper-100 group-hover:text-ember-700 dark:group-hover:text-ember-400 transition-colors">
        {post.title}
      </h3>
      <p className="mt-2 flex-1 text-sm text-ink-500 dark:text-ink-400">{post.description}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {post.tags.map((t) => (
          <TagPill key={t}>{t}</TagPill>
        ))}
      </div>
      <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-ink-600 dark:text-ink-300 group-hover:text-ember-700 dark:group-hover:text-ember-400">
        Read post <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </Link>
  );
}
