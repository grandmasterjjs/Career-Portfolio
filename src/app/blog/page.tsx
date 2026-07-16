import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/layout/Section";
import { getAllPosts } from "@/lib/mdx";
import { PostCard } from "@/components/blog/PostCard";

export const metadata: Metadata = {
  title: "Blog",
  description: "Tutorials, troubleshooting notes, and lessons learned from IT operations, automation, and homelabbing.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <Section className="pt-16">
      <SectionHeading
        as="h1"
        eyebrow="Notes & Writing"
        title="Field notes from the desk and the homelab"
        description="Tutorials, troubleshooting guides, and the occasional 'here's what I'd do differently.'"
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </Section>
  );
}
