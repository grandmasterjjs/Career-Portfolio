"use client";

import { useState } from "react";
import { Send } from "lucide-react";

type FormState = {
  name: string;
  email: string;
  message: string;
  company: string;
};

type SubmitState = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "", company: "" });
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitState("sending");
    setError("");

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error || "Message failed to send. Use the email link on this page instead.");
      setSubmitState("error");
      return;
    }

    setForm({ name: "", email: "", message: "", company: "" });
    setSubmitState("sent");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-200">
            Name
          </label>
          <input
            id="name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-xl border border-ink-200 dark:border-ink-700 bg-paper-100 dark:bg-ink-900 px-4 py-2.5 text-sm text-ink-900 dark:text-paper-100 outline-none focus:border-ember-500"
            placeholder="Jane Recruiter"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-200">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-xl border border-ink-200 dark:border-ink-700 bg-paper-100 dark:bg-ink-900 px-4 py-2.5 text-sm text-ink-900 dark:text-paper-100 outline-none focus:border-ember-500"
            placeholder="jane@company.com"
          />
        </div>
      </div>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-200">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full resize-none rounded-xl border border-ink-200 dark:border-ink-700 bg-paper-100 dark:bg-ink-900 px-4 py-2.5 text-sm text-ink-900 dark:text-paper-100 outline-none focus:border-ember-500"
          placeholder="Tell me a bit about the role or what you're looking for..."
        />
      </div>
      <button
        type="submit"
        disabled={submitState === "sending"}
        className="inline-flex items-center gap-2 rounded-full bg-ink-900 dark:bg-paper-100 px-5 py-2.5 text-sm font-medium text-paper-100 dark:text-ink-900 transition-colors hover:bg-ember-700 dark:hover:bg-ember-400"
      >
        {submitState === "sending" ? "Sending..." : "Send message"} <Send size={14} />
      </button>
      {submitState === "sent" && (
        <p className="text-sm text-signal-700 dark:text-signal-400">
          Message sent. I&apos;ll get it at the inbox behind this site.
        </p>
      )}
      {submitState === "error" && (
        <p className="text-sm text-ember-700 dark:text-ember-400">
          {error}
        </p>
      )}
    </form>
  );
}
