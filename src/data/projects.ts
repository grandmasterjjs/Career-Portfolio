export type ProjectTag =
  | "PowerShell"
  | "Bash"
  | "Python"
  | "Apple"
  | "Microsoft 365"
  | "Azure"
  | "ServiceNow"
  | "Automation"
  | "Networking"
  | "Linux"
  | "Homelab"
  | "AI"
  | "Unix";

export type Project = {
  slug: string;
  name: string;
  pitch: string;
  problem: string;
  solution: string;
  benefits: string[];
  tech: string[];
  tags: ProjectTag[];
  githubUrl?: string;
  architecture?: string[];
  lessons: string[];
  metric?: { label: string; value: string };
  accent: "ember" | "signal";
  icon: "bot" | "terminal" | "chart" | "sparkles" | "image";
};

export const projects: Project[] = [
  {
    slug: "ai-support-chatbot",
    name: "AI-Assisted Support Chatbot Prototype",
    pitch: "A first-line AI responder trained on real ticket history, built to catch the questions that shouldn't need a human.",
    problem:
      "A 3-person Service Desk supporting ~1,500 users was drowning in repetitive, common-pattern tickets — password resets, access requests, known-issue troubleshooting — while running at roughly 75% of designed headcount. Every hour spent on a question that had already been answered a hundred times was an hour not spent on the tickets that actually needed a human.",
    solution:
      "I built a chatbot prototype trained on historical ticket data, existing knowledge base articles, and recurring-issue patterns mined from the ITSM system. It handles common requests automatically and around the clock, and surfaces emerging issue clusters back to the team before they escalate.",
    benefits: [
      "24/7 automated coverage for the most common request types",
      "Meaningfully reduced administrative load on a 3-person team",
      "Faster identification of recurring incidents before they became trends",
    ],
    tech: ["Ticket data analysis", "Knowledge base integration", "Pattern/trend detection", "LLM prompting"],
    tags: ["AI", "Automation", "ServiceNow"],
    architecture: [
      "Historical tickets + KB articles ingested and categorized",
      "Pattern analysis surfaces the highest-frequency, lowest-complexity request types",
      "Chatbot handles matched requests directly; ambiguous requests route to a live technician",
      "Unresolved or novel patterns feed back into trend analysis for proactive fixes",
    ],
    lessons: [
      "The highest-leverage automation isn't the flashiest ticket — it's the one that repeats the most.",
      "A chatbot is only as good as the knowledge base underneath it; cleaning up KB content was half the project.",
      "Transparency with the team mattered — this was framed as taking work off their plate, not replacing them, which is exactly what happened.",
    ],
    metric: { label: "Coverage", value: "24/7" },
    accent: "ember",
    icon: "bot",
  },
  {
    slug: "enterprise-ai-adoption",
    name: "Enterprise AI Adoption & Workforce Integration",
    pitch: "Rolling Claude Enterprise into daily Service Desk work — and teaching a lean team how to get the best use out of it.",
    problem:
      "The team needed to scale output without scaling headcount. Enterprise AI tools were available, but availability doesn't mean adoption — most teams either ignore the tools or use them shallowly without training.",
    solution:
      "I spearheaded the integration of enterprise AI tools, including Claude, into daily Service Desk operations, then trained the team on effective prompting for troubleshooting, documentation drafting, and ticket summarization — turning a generic tool into a workflow.",
    benefits: [
      "Directly improved documentation quality and resolution speed",
      "Enabled higher ticket throughput without adding headcount",
      "Maintained high CSAT while volume and complexity both increased",
    ],
    tech: ["Claude Enterprise", "Prompt engineering", "Training program design", "Documentation workflows"],
    tags: ["AI", "Automation"],
    lessons: [
      "Tools alone don't solve problems — adoption and training are the multiplier.",
      "Prompting is a coachable skill — small, repeatable prompt patterns beat one-off cleverness.",
      "The biggest wins showed up in documentation quality first, ticket speed second.",
    ],
    metric: { label: "Throughput", value: "+40%" },
    accent: "signal",
    icon: "sparkles",
  },
  {
    slug: "powershell-automation-suite",
    name: "PowerShell Administration & Automation Suite",
    pitch: "A library of scripts that turned Active Directory and M365 admin from a full-time chore into a scheduled task.",
    problem:
      "High-volume administrative work — AD reporting, bulk account lifecycle changes, license provisioning — was eating time a 3-person team didn't have to spare.",
    solution:
      "I architected and deployed a suite of custom PowerShell scripts covering Active Directory reporting, bulk user account lifecycle management, and Microsoft 365 license provisioning, replacing manual, click-through admin work with repeatable, scheduled automation.",
    benefits: [
      "Dramatically reduced manual administrative overhead",
      "Freed the team to focus on complex technical issues instead of repetitive maintenance",
      "Reduced the chance of human error in bulk account operations",
      "Saved real money using the tools we already had instead of buying new ones",
    ],
    tech: ["PowerShell", "Active Directory", "Microsoft Graph / M365", "Scheduled automation"],
    tags: ["PowerShell", "Automation", "Microsoft 365", "Azure"],
    architecture: [
      "AD + M365 admin modules authenticate via service accounts / app registrations",
      "Reporting scripts run on a schedule and output to a shared dashboard/export",
      "Lifecycle scripts handle onboarding, offboarding, and bulk changes from a single source list",
      "License provisioning scripts reconcile assigned vs. required licenses automatically",
    ],
    lessons: [
      "Idempotent scripts save you from yourself — every script was built to be safely re-run.",
      "Logging and dry-run modes are essential for trust and adoption — the team needs to see what the script will do before it does it.",
      "Small automations compound: reporting scripts fed the data that made the trend-analysis project possible.",
    ],
    metric: { label: "Manual overhead", value: "↓ significant" },
    accent: "ember",
    icon: "terminal",
  },
  {
    slug: "ticket-trend-analysis",
    name: "Ticket Trend & Problem Analysis Automation",
    pitch: "Pareto-style ticket categorization that turned 'we keep seeing this' into a prioritized fix list.",
    problem:
      "Recurring incidents were quietly eating team capacity, but without systemic visibility into root causes, the team was treating symptoms instead of fixing the underlying problems.",
    solution:
      "I implemented a system for targeted ticket trend analysis and Pareto-style categorization inside the ITSM environment — surfacing the small number of root causes responsible for the largest share of ticket volume.",
    benefits: [
      "Identified root causes for recurrent issues",
      "Drove a 15–20% reduction in repeat incident volume over 12 months",
      "Preemptively mitigated potential escalations before they hit SLA risk",
    ],
    tech: ["ITSM reporting", "Pareto / 80-20 analysis", "Data categorization"],
    tags: ["Automation", "ServiceNow"],
    lessons: [
      "80% of ticket pain usually comes from a short list of root causes — the hard part is proving it with data, not gut feel.",
      "Trend analysis is only useful if it provides actionable insights, not just what gets reported upward.",
    ],
    metric: { label: "Repeat incidents", value: "-15–20%" },
    accent: "signal",
    icon: "chart",
  },
  {
    slug: "zero-touch-imaging",
    name: "Zero-Touch Imaging Redesign",
    pitch: "A rebuilt deployment pipeline that gave 350+ staff hours a year back to the team.",
    problem:
      "Manual device imaging was consuming roughly an hour per machine across ~350 annual deployments at Highlights for Children — time that scaled linearly with growth instead of getting cheaper.",
    solution:
      "I redesigned the imaging process end-to-end using Bash and PowerShell automation to eliminate manual, repetitive setup steps across both Mac and Windows fleets.",
    benefits: [
      "Saved approximately 1 hour per machine across ~350 annual deployments",
      "Recovered 350+ staff hours per year for higher-value work",
      "Standardized the build across a mixed Mac/Windows environment",
    ],
    tech: ["Bash", "PowerShell", "macOS imaging", "Windows imaging"],
    tags: ["Bash", "PowerShell", "Apple", "Automation", "Unix"],
    lessons: [
      "Cross-platform automation (Mac + Windows) forced cleaner, more portable scripting habits.",
      "The best automation ROI is often the boring, high-frequency task nobody wants to own.",
    ],
    metric: { label: "Hours recovered / yr", value: "350+" },
    accent: "ember",
    icon: "image",
  },
];

export const allTags: ProjectTag[] = [
  "PowerShell",
  "Bash",
  "Python",
  "Apple",
  "Microsoft 365",
  "Azure",
  "ServiceNow",
  "Automation",
  "Networking",
  "Linux",
  "Homelab",
  "AI",
  "Unix"
];
