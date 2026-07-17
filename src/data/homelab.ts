export const homelab = {
  intro:
    "My homelab uses a public-facing lab domain pattern in a live environment I use to learn, break, document, and rebuild things on purpose. It runs segmented networking, reverse proxying, monitoring, and an AI operations assistant.",
  philosophy: [
    "This homelab is built to be rebuilt.",
    "Memory is volatile. Markdown is durable.",
  ],
  network: {
    gateway: "UniFi gateway",
    wan: [
      { label: "Primary", value: "Gigabit fiber (primary ISP)" },
      { label: "Secondary", value: "Cable broadband (gaming)" },
      { label: "Backup", value: "5G Cellular (failover)" },
    ],
    vlans: [
      { name: "Trusted", cidr: "10.240.10.0/24", note: "Primary trusted network" },
      { name: "Print", cidr: "10.240.20.0/24" },
      { name: "IoT", cidr: "10.240.30.0/24" },
      { name: "Media/Gaming", cidr: "10.240.40.0/24" },
      { name: "Directory Services", cidr: "10.240.50.0/24" },
      { name: "DMZ", cidr: "10.240.90.0/24" },
    ],
    reverseProxy:
      "A dedicated reverse proxy VM pairs with external DNS so every internal service gets a clean hostname instead of a raw IP.",
  },
  compute: [
    { name: "lab-node-a", role: "Standalone Proxmox VE host", tags: ["Proxmox", "Subnet router", "Exit node"] },
    { name: "lab-node-b", role: "Standalone Proxmox VE host, primary monitoring parent", tags: ["Proxmox", "Monitoring", "Subnet router", "Exit node"] },
    { name: "backup-node", role: "Proxmox Backup Server", tags: ["Backup"] },
    { name: "route-node", role: "Subnet router VM", tags: ["Linux", "Routing"] },
    { name: "proxy-node", role: "Reverse proxy host routing lab-domain traffic to internal services", tags: ["Networking", "DNS"] },
  ],
  storage: [
    { name: "Dual NAS appliances", detail: "NAS devices on the trusted VLAN" },
    { name: "backup-node", detail: "2TB ZFS mirror on NVME" },
  ],
  overlay: {
    tailnet: "example-tailnet.ts.net",
    model: "Full mesh — ACL tags for organizational structure",
    subnetRouters: "both hypervisor nodes advertise home routes",
    aiNode: "A dedicated tailnet node runs an AI operations assistant, authenticated via its own SSH keypair — scoped access, not blanket trust",
  },
  monitoring: {
    platform: "Netdata Cloud",
    parent: "lab-node-b",
    coverage: "Homelab nodes stream metrics continuously; key hosts are claimed and actively monitored.",
    knownIssue:
      "NAS firmware updates can reset Netdata agents and cause duplicate node registrations — a known quirk that's now just part of the update runbook.",
  },
  aiOps: {
    name: "AI Assistant",
    platform: "Vellum.ai",
    description:
      "This is a personal AI operations assistant running on the Vellum platform, connected to the tools and workflows that run this homelab. It helps administer the network, keeps documentation current, and handles repetitive operational work — the same philosophy I brought to enterprise AI adoption at work, applied at home first.",
  },
  inFlight: [
    "Handing off select maintenance activities to AI-assisted workflows — an ongoing experiment in how far automation can responsibly go.",
  ],
  quickLinks: [
    "Proxmox",
    "NAS",
    "Gateway",
    "Certificates",
    "Docker Stack",
    "NUT Power Management",
    "Tailscale",
    "ISP Gateway Integration",
    "Proxmox Backup Server",
    "Netdata",
  ],
};
