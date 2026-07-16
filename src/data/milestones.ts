import type { Milestone } from "@/components/about/Timeline";

export const milestones: Milestone[] = [
  {
    year: "1995",
    title: "Started in Communications Technology",
    place: "The Ohio State University",
    body: "Began coursework in communications technology — the first formal step toward a career that didn't really exist yet as \"IT\" in most job postings.",
    kind: "education",
  },
  {
    year: "1996",
    title: "Technical Support Supervisor",
    place: "WinBook Computer Corporation",
    body: "First leadership role — supervising an 8-person phone-support team, years before ITIL, ITSM platforms, or Slack existed. Troubleshooting over the phone with no remote tools teaches you patience fast.",
    kind: "career",
  },
  {
    year: "1999",
    title: "Desktop Analyst",
    place: "L Brands",
    body: "Eight years supporting enterprise users in a large-scale retail environment — where I first started building repeatable imaging and deployment processes instead of doing each machine by hand.",
    kind: "career",
  },
  {
    year: "2008",
    title: "Service Desk Manager",
    place: "Highlights for Children",
    body: "Nearly a decade leading a mixed Mac/Windows support team, and the start of using Bash and PowerShell to automate away the most repetitive parts of the job — including a device imaging redesign that gave the team 350+ hours a year back.",
    kind: "career",
  },
  {
    year: "2008",
    title: "ITIL Foundation Certified",
    body: "Formalized the process-thinking I'd already been doing intuitively — incident, problem, and change management as a system, not a checklist.",
    kind: "education",
  },
  {
    year: "2019",
    title: "Help Desk Supervisor",
    place: "CASTO Management Services",
    body: "Supervised a 3-state team and rebuilt the knowledge base from scratch, proving that documentation is itself a force multiplier for resolution speed.",
    kind: "career",
  },
  {
    year: "2022",
    title: "IT Service Desk Manager",
    place: "W.W. Williams",
    body: "Took on a 3-person team supporting ~1,500 users — and leaned hard into automation and AI to close the gap between headcount and workload.",
    kind: "career",
  },
  {
    year: "2024",
    title: "Built an AI-assisted support chatbot",
    body: "Trained a chatbot prototype on real ticket history and knowledge base content to handle the questions that shouldn't need a human, freeing the team for the ones that do.",
    kind: "career",
  },
  {
    year: "2025",
    title: "Led enterprise AI adoption",
    body: "Rolled Claude Enterprise into daily Service Desk operations and trained the team on prompting for troubleshooting, documentation, and ticket summarization.",
    kind: "career",
  },
  {
    year: "2026",
    title: "GrandMasterJ.com homelab — meet Zap",
    body: "Stood up a full home infrastructure stack — Proxmox, UniFi, Tailscale, Netdata — and brought the same AI-adoption philosophy home by deploying Zap, a personal AI ops assistant, to help run and document it.",
    kind: "personal",
  },
];
