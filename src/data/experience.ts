export type ExperienceEntry = {
  id: string;
  title: string;
  company: string;
  location: string;
  start: string;
  end: string;
  duration: string;
  summary: string;
  bullets: string[];
  metrics: { label: string; value: string }[];
  tech: string[];
};

export const experience: ExperienceEntry[] = [
  {
    id: "wwwilliams",
    title: "IT Service Desk Manager",
    company: "W.W. Williams",
    location: "Dublin, OH",
    start: "Nov 2022",
    end: "Present",
    duration: "3+ yrs",
    summary:
      "Ran a lean 3-person Service Desk for ~1,500 associates nationwide — and using automation and AI adoption to close the gap left by running below designed team capacity.",
    bullets: [
      "Managed a 3-person Service Desk supporting ~1,500 users across multiple locations nationwide.",
      "Mentored technicians to a 40% improvement in individual ticket throughput and a 50% increase in customer satisfaction.",
      "Administered the Microsoft 365 tenant for ~1,500 users, including Exchange Online, Teams, SharePoint Online, and Intune endpoint management.",
      "Owned Entra ID (Azure AD) identity and access governance — user provisioning, conditional access policies, role-based access control, and hybrid identity via Entra ID Connect.",
      "Maintained 90%+ SLA compliance across P1–P3 categories while operating at roughly 75% of designed team capacity.",
      "Cut average MTTR by ~20% over 12 months (from ~16 hours to ~12 hours).",
      "Reduced repeat incidents by 15–20% through structured ticket trend analysis and targeted automation.",
      "Architected a PowerShell automation suite covering Active Directory reporting, bulk user account lifecycle management, and Microsoft 365 license provisioning.",
      "Built and deployed an AI-assisted support chatbot prototype using historical ticket data, knowledge base content, and pattern analysis.",
      "Trained the Service Desk team on enterprise AI tools (Claude Enterprise, code assistants) for troubleshooting, documentation, and ticket summarization.",
    ],
    metrics: [
      { label: "Users supported", value: "1,500+" },
      { label: "SLA compliance", value: "90%+" },
      { label: "MTTR reduction", value: "20%" },
      { label: "Repeat incidents", value: "-15–20%" },
      { label: "Team throughput", value: "+40%" },
      { label: "CSAT improvement", value: "+50%" },
      { label: "Team Empowerment", value: "100%" },
    ],
    tech: [
      "Leadership & Team Development",
      "Microsoft 365",
      "Entra ID",
      "Intune",
      "PowerShell",
      "Active Directory",
      "AI / Claude Enterprise",
      "Conditional Access",
    ],
  },
  {
    id: "casto",
    title: "Help Desk Supervisor",
    company: "CASTO Management Services",
    location: "Columbus, OH",
    start: "Jan 2019",
    end: "Nov 2022",
    duration: "3 yrs 11 mo",
    summary:
      "Supervised a 4-person Service Desk team, rebuilding the knowledge base and escalation model to move the numbers that mattered.",
    bullets: [
      "Supervised a 4-member Service Desk team supporting 500 users across three states.",
      "Increased first-contact resolution by ~15% through structured coaching and improved escalation criteria.",
      "Reduced average resolution time by ~25% by building a structured, searchable knowledge base from scratch.",
      "Managed the KACE ITSM platform end-to-end — ticketing workflows, asset management, knowledge base, and reporting.",
      "Owned vendor relationships across telecom, VoIP, ISP, and hardware providers.",
    ],
    metrics: [
      { label: "Users supported", value: "500" },
      { label: "States covered", value: "3" },
      { label: "First-contact resolution", value: "+15%" },
      { label: "Resolution time", value: "-25%" },
    ],
    tech: ["KACE ITSM", "Asset Management", "VoIP", "Vendor Management"],
  },
  {
    id: "pcm",
    title: "Lead Deployment Technician (Contract)",
    company: "PCM",
    location: "Columbus, OH",
    start: "Apr 2018",
    end: "Jan 2019",
    duration: "10 mo",
    summary:
      "Led a five-person field team through a high-volume enterprise device lifecycle project.",
    bullets: [
      "Led a team of 5 technicians deploying approximately 90 devices per week for an enterprise lifecycle refresh.",
      "Coordinated end-user communication, scheduling, deployment logistics, and post-deployment support.",
      "Supported Windows upgrade processes and endpoint standardization across the fleet.",
    ],
    metrics: [
      { label: "Devices / week", value: "~90" },
      { label: "Team led", value: "5 techs" },
    ],
    tech: ["Windows Deployment", "Endpoint Standardization", "Logistics"],
  },
  {
    id: "highlights",
    title: "Service Desk Manager",
    company: "Highlights for Children",
    location: "Columbus, OH",
    start: "Nov 2008",
    end: "Apr 2018",
    duration: "9 yrs 5 mo",
    summary:
      "Nearly a decade running IT support across Mac and Windows environments, and the project manager behind many of the Service Desk's major infrastructure migrations.",
    bullets: [
      "Managed a 4-person IT support operation for 500 users across mixed Mac and Windows environments.",
      "Improved SLA attainment through process standardization and proactive incident management.",
      "Redesigned the device imaging process, saving ~1 hour per machine across ~350 annual deployments — recovering 350+ staff hours per year.",
      "Built automation tooling with Bash and PowerShell to streamline repetitive troubleshooting and cut manual technician workload.",
      "Led or assisted in project-management for multiple enterprise initiatives: Exchange Online Protection migration, Office 2013 deployment, Windows 7-to-Enterprise laptop migration (75 devices), a Customer Contact Center web chat deployment, and VoIP server upgrades.",
    ],
    metrics: [
      { label: "Users supported", value: "500" },
      { label: "Staff hours recovered / yr", value: "350+" },
      { label: "Major migrations led", value: "5" },
      { label: "Tenure", value: "9.5 yrs" },
    ],
    tech: ["Bash", "PowerShell", "Exchange", "VoIP", "macOS", "Windows", "Imaging", "Linux", "Unix", "Office 365"],
  },
  {
    id: "butler",
    title: "PC Support Specialist",
    company: "Butler Schein Animal Health",
    location: "Dublin, OH",
    start: "May 2007",
    end: "Nov 2008",
    duration: "1 yr 6 mo",
    summary: "Tier 2 support across multiple sites, with a focus on deflecting volume through documentation.",
    bullets: [
      "Provided Tier 2 support for 300+ users across multiple locations.",
      "Reduced support volume by building end-user documentation and training materials.",
    ],
    metrics: [{ label: "Users supported", value: "300+" }],
    tech: ["Tier 2 Support", "Documentation", "Training"],
  },
  {
    id: "lbrands",
    title: "Desktop Analyst",
    company: "L Brands",
    location: "Columbus, OH",
    start: "Jun 1999",
    end: "May 2007",
    duration: "8 yrs",
    summary: "Eight years of enterprise desktop support in a large-scale retail IT environment.",
    bullets: [
      "Supported enterprise users across hardware, software, and network issues in a large-scale retail IT environment.",
      "Built and maintained system images and managed fleet-wide deployment processes.",
      "Conducted regular end-user training sessions.",
    ],
    metrics: [{ label: "Tenure", value: "8 yrs" }],
    tech: ["Imaging", "SMS", "Enterprise Desktop Support", "Unix", "macOS"],
  },
  {
    id: "winbook",
    title: "Technical Support Supervisor",
    company: "WinBook Computer Corporation",
    location: "Columbus, OH",
    start: "1996",
    end: "1999",
    duration: "3 yrs",
    summary:
      "Where it started — supervising an 8-person phone-support team before most of today's IT tooling existed.",
    bullets: [
      "Provided technical leadership and supervised an 8-member phone-support team.",
      "Handled customer escalations and advanced technical problem solving.",
      "Conducted regular performance evaluations of team members.",
      "Administered hardware and software evaluation projects.",
    ],
    metrics: [{ label: "Team led", value: "8" }],
    tech: ["Phone Support", "Team Leadership", "Hardware Evaluation", "Windows", "Exchange"],
  },
];

export const education = [
  {
    school: "Franklin University",
    credential: "Information Technology, Computer Science — Undergraduate Studies",
    years: "2010 – 2015",
  },
  {
    school: "Columbus State Community College",
    credential: "Distributed Networking, IT Support",
    years: "1997 – 1998",
  },
  {
    school: "The Ohio State University",
    credential: "Bachelor's Coursework, Communications",
    years: "1995 – 1996",
  },
];

export const certifications = [{ name: "ITIL Foundation", year: "2008" }];
