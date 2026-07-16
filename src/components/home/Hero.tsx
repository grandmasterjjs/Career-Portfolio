"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { profile } from "@/data/profile";

const roles = [
  "IT Operations & Automation Leader",
  "PowerShell Automation Architect",
  "AI Adoption Strategist",
  "Homelab Systems Engineer",
];

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-ember-500/20 blur-[120px] dark:bg-ember-500/10" />
      <div className="container relative grid gap-12 pb-20 pt-16 md:pt-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-ink-200 dark:border-ink-700 bg-paper-100/60 dark:bg-ink-800/60 px-3 py-1 font-mono text-xs text-ink-500 dark:text-ink-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-signal-500" />
            </span>
            Open to IT Director / Infrastructure Manager roles
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink-900 dark:text-paper-100 sm:text-5xl lg:text-6xl"
          >
            Hi, I&apos;m {profile.shortName.split(" ")[0]} I build{" "}
            <span className="text-gradient">support systems that run themselves.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-xl text-lg text-ink-500 dark:text-ink-300"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 flex flex-wrap items-center gap-2 font-mono text-sm text-ink-400 dark:text-ink-500"
          >
            <span className="text-ember-500">$</span>
            <span>whoami --role</span>
            <span className="text-ink-900 dark:text-paper-100">{roles[0]}</span>
            <span className="h-4 w-[2px] animate-blink bg-ember-500" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button href="/projects" variant="primary" icon={<ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />}>
              View Projects
            </Button>
            <Button href="/resume" variant="secondary">
              See Resume
            </Button>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 dark:border-ink-700 text-ink-500 dark:text-ink-300 hover:border-ember-500 hover:text-ember-500 transition-colors"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 dark:border-ink-700 text-ink-500 dark:text-ink-300 hover:border-ember-500 hover:text-ember-500 transition-colors"
            >
              <Github size={16} />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-ember-500/30 to-signal-500/20 blur-2xl" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-ink-200/70 dark:border-ink-700/70 bg-paper-100 dark:bg-ink-800 shadow-2xl">
            <Image
              src="/images/photos/hero-desk.jpg"
              alt="J.J. Smiley at his desk"
              fill
              priority
              sizes="(min-width: 1024px) 384px, 90vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 rounded-2xl border border-ink-200 dark:border-ink-700 bg-paper-100 dark:bg-ink-900 px-4 py-3 shadow-lg">
            <div className="font-mono text-[11px] text-ink-400 dark:text-ink-500">uptime</div>
            <div className="font-display text-lg font-semibold text-ink-900 dark:text-paper-100">25+ years</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
