import { defineField, defineType } from "sanity";

export const projectTags = [
  "PowerShell",
  "Bash",
  "Python",
  "Apple",
  "Microsoft 365",
  "Azure",
  "ServiceNow",
  "Automation",
  "Homelab",
  "AI",
  "Unix",
] as const;

const tagOptions = projectTags.map((tag) => ({ title: tag, value: tag }));

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pitch",
      title: "Short Pitch",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "problem",
      title: "Problem",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "solution",
      title: "Solution",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "benefits",
      title: "Impact / Benefits",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "tech",
      title: "Technologies",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "tags",
      title: "Filter Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { list: tagOptions },
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
    }),
    defineField({
      name: "architecture",
      title: "Architecture / Flow Steps",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "lessons",
      title: "Lessons Learned",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "metric",
      title: "Metric",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Label", type: "string" }),
        defineField({ name: "value", title: "Value", type: "string" }),
      ],
    }),
    defineField({
      name: "accent",
      title: "Accent Color",
      type: "string",
      options: {
        list: [
          { title: "Ember", value: "ember" },
          { title: "Signal", value: "signal" },
        ],
        layout: "radio",
      },
      initialValue: "ember",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: [
          { title: "Bot", value: "bot" },
          { title: "Terminal", value: "terminal" },
          { title: "Chart", value: "chart" },
          { title: "Sparkles", value: "sparkles" },
          { title: "Image", value: "image" },
        ],
      },
      initialValue: "terminal",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      initialValue: 100,
    }),
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      initialValue: true,
    }),
  ],
  orderings: [
    {
      name: "sortOrderAsc",
      title: "Sort Order",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "pitch",
    },
  },
});
