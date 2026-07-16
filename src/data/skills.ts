export type Skill = { name: string; level: number; note?: string };
export type SkillCategory = { id: string; title: string; blurb: string; skills: Skill[] };

export const skillCategories: SkillCategory[] = [
  {
    id: "sysadmin",
    title: "Systems Administration",
    blurb: "25 years of keeping mixed fleets patched, imaged, and out of the way of the people using them.",
    skills: [
      { name: "Active Directory & Group Policy", level: 92 },
      { name: "Microsoft 365 Admin (Exchange, Teams, SharePoint)", level: 90 },
      { name: "Intune Endpoint Management", level: 85 },
      { name: "macOS + Windows Mixed Fleets", level: 88 },
      { name: "ITSM Platforms (ServiceNow, KACE, Cherwell)", level: 85 },
    ],
  },
  {
    id: "cloud",
    title: "Cloud",
    blurb: "Identity-first cloud administration, with hybrid environments as the default, not the exception.",
    skills: [
      { name: "Entra ID (Azure AD) & Hybrid Identity", level: 85 },
      { name: "Conditional Access & RBAC", level: 82 },
      { name: "Entra ID Connect", level: 78 },
      { name: "Azure Fundamentals", level: 65 },
    ],
  },
  {
    id: "automation",
    title: "Automation",
    blurb: "If I do it more than twice, it becomes a script.",
    skills: [
      { name: "PowerShell Scripting", level: 95 },
      { name: "Bash Scripting", level: 78 },
      { name: "Scheduled / Unattended Automation", level: 88 },
      { name: "Ticket Trend & Pareto Analysis", level: 80 },
    ],
  },
  {
    id: "programming",
    title: "Programming",
    blurb: "Practical, ops-grade code — built to run unattended and fail loudly when something's wrong.",
    skills: [
      { name: "PowerShell", level: 95 },
      { name: "Bash / Shell", level: 78 },
      { name: "Python (homelab & scripting)", level: 50 },
      { name: "SQL / Data Querying", level: 55 },
    ],
  },
  {
    id: "networking",
    title: "Networking",
    blurb: "VLAN segmentation, reverse proxying, and overlay networking — mostly learned by running it at home first.",
    skills: [
      { name: "VLAN Design & Segmentation", level: 78 },
      { name: "Reverse Proxy / DNS (Nginx Proxy Manager, Cloudflare)", level: 75 },
      { name: "Tailscale / Overlay Networking", level: 80 },
      { name: "VoIP & Telecom Vendor Management", level: 82 },
    ],
  },
  {
    id: "leadership",
    title: "Leadership",
    blurb: "Building technicians into teams that outperform their staffing numbers.",
    skills: [
      { name: "Team Development & Coaching", level: 92 },
      { name: "Vendor & Stakeholder Management", level: 88 },
      { name: "Process Redesign", level: 90 },
      { name: "Project Management (migrations, rollouts)", level: 85 },
    ],
  },
  {
    id: "documentation",
    title: "Documentation",
    blurb: "\"Memory is volatile. Markdown is durable.\" — undocumented systems are unfinished systems.",
    skills: [
      { name: "Knowledge Base Architecture", level: 90 },
      { name: "Runbooks & Training Materials", level: 88 },
      { name: "Wiki-Driven Infrastructure Docs (Wiki.js)", level: 82 },
    ],
  },
  {
    id: "security",
    title: "Security",
    blurb: "Identity governance and network segmentation as the day-to-day baseline, not a once-a-year audit.",
    skills: [
      { name: "Identity & Access Governance", level: 80 },
      { name: "Conditional Access Policy Design", level: 78 },
      { name: "Network Segmentation (VLAN / DMZ)", level: 72 },
      { name: "Endpoint Security Hygiene", level: 75 },
    ],
  },
  {
    id: "ai",
    title: "AI",
    blurb: "Early, practical adoption — not hype. If it saves the team real time, it stays.",
    skills: [
      { name: "Enterprise AI Rollout (Claude Enterprise)", level: 82 },
      { name: "Prompt Engineering for Ops Workflows", level: 85 },
      { name: "AI-Assisted Support Tooling", level: 78 },
      { name: "AI Workforce Training", level: 85 },
    ],
  },
];
