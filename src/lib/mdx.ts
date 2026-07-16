import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
};

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string) {
  const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    content,
    meta: data as Omit<PostMeta, "slug">,
  };
}

export function getAllPosts(): PostMeta[] {
  return getAllPostSlugs()
    .map((slug) => {
      const { meta } = getPostBySlug(slug);
      return { slug, ...meta } as PostMeta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
