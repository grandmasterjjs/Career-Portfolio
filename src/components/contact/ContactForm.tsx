"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { profile } from "@/data/profile";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${form.name || "your site"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
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
        className="inline-flex items-center gap-2 rounded-full bg-ink-900 dark:bg-paper-100 px-5 py-2.5 text-sm font-medium text-paper-100 dark:text-ink-900 transition-colors hover:bg-ember-700 dark:hover:bg-ember-400"
      >
        Send message <Send size={14} />
      </button>
      {sent && (
        <p className="text-sm text-signal-700 dark:text-signal-400">
          Opening your email client with this message pre-filled — hit send there to reach me.
        </p>
      )}
    </form>
  );
}
