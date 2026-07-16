import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getAllPostSlugs, getPostBySlug } from "@/lib/mdx";
import { Section } from "@/components/layout/Section";
import { TagPill } from "@/components/ui/TagPill";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  try {
    const { meta } = getPostBySlug(params.slug);
    return { title: meta.title, description: meta.description };
  } catch {
    return {};
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  let post;
  try {
    post = getPostBySlug(params.slug);
  } catch {
    return notFound();
  }

  const date = new Date(post.meta.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <Section className="pt-12">
      <div className="mx-auto max-w-3xl">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-ember-500 dark:text-ink-400">
          <ArrowLeft size={14} /> All posts
        </Link>

        <div className="mt-6 flex items-center gap-4 font-mono text-xs text-ink-400 dark:text-ink-500">
          <span className="inline-flex items-center gap-1"><Calendar size={12} /> {date}</span>
          <span className="inline-flex items-center gap-1"><Clock size={12} /> {post.meta.readingTime}</span>
        </div>

        <h1 className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-ink-900 dark:text-paper-100">
          {post.meta.title}
        </h1>
        <p className="mt-4 text-lg text-ink-500 dark:text-ink-300">{post.meta.description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {post.meta.tags.map((t) => (
            <TagPill key={t}>{t}</TagPill>
          ))}
        </div>

        <div className="prose-custom mt-10">
          <MDXRemote source={post.content} />
        </div>
      </div>
    </Section>
  );
}
