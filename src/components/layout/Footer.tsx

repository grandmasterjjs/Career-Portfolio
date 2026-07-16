import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-ink-200/60 dark:border-ink-800/60 mt-24">
      <Container className="py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="font-display text-lg font-semibold text-ink-900 dark:text-paper-100">
              {profile.shortName}
            </div>
            <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">{profile.headline}</p>
            <p className="mt-4 text-sm text-ink-500 dark:text-ink-400">
              Built with Next.js, TypeScript, and Tailwind CSS — deployed on Vercel.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-ink-400 dark:text-ink-500">
                Explore
              </div>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link className="text-ink-600 dark:text-ink-300 hover:text-ember-500" href="/projects">Projects</Link></li>
                <li><Link className="text-ink-600 dark:text-ink-300 hover:text-ember-500" href="/blog">Blog</Link></li>
                <li><Link className="text-ink-600 dark:text-ink-300 hover:text-ember-500" href="/homelab">Homelab</Link></li>
                <li><Link className="text-ink-600 dark:text-ink-300 hover:text-ember-500" href="/resume">Resume</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-ink-400 dark:text-ink-500">
                Connect
              </div>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a className="inline-flex items-center gap-1.5 text-ink-600 dark:text-ink-300 hover:text-ember-500" href={profile.linkedin} target="_blank" rel="noreferrer">
                    <Linkedin size={14} /> LinkedIn
                  </a>
                </li>
                <li>
                  <a className="inline-flex items-center gap-1.5 text-ink-600 dark:text-ink-300 hover:text-ember-500" href={profile.github} target="_blank" rel="noreferrer">
                    <Github size={14} /> GitHub
                  </a>
                </li>
                <li>
                  <a className="inline-flex items-center gap-1.5 text-ink-600 dark:text-ink-300 hover:text-ember-500" href={`mailto:${profile.email}`}>
                    <Mail size={14} /> Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col-reverse gap-4 border-t border-ink-200/60 dark:border-ink-800/60 pt-6 text-xs text-ink-400 dark:text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
          <span className="font-mono">Columbus, OH</span>
        </div>
      </Container>
    </footer>
  );
}
