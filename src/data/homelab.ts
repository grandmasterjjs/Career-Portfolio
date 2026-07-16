export const homelab = {
  intro:
    "My homelab runs its own domain — a live environment I use to learn, break, document, and rebuild things on purpose. It runs my own domain, its own reverse proxy, its own monitoring, and its own AI operations assistant.",
  philosophy: [
    "This homelab is built to be rebuilt.",
    "Memory is volatile. Markdown is durable.",
  ],
  network: {
    gateway: "UniFi Dream Machine",
    wan: [
      { label: "Primary", value: "Gigabit fiber (primary ISP)" },
      { label: "Secondary", value: "Cable broadband (gaming)" },
      { label: "Backup", value: "5G Cellular (failover)" },
    ],
    vlans: [
      { name: "Core", cidr: "10.10.10.0/24", note: "Primary trusted network" },
      { name: "Print", cidr: "10.10.20.0/24" },
      { name: "IoT", cidr: "10.10.30.0/24" },
      { name: "Media/Gaming", cidr: "10.10.40.0/24" },
      { name: "LDAP", cidr: "10.10.50.0/24" },
      { name: "DMZ", cidr: "10.10.99.0/24" },
    ],
    reverseProxy:
      "A dedicated reverse proxy VM pairs with external DNS so every internal service gets a clean hostname instead of a raw IP.",
  },
  compute: [
    { name: "atlas", role: "Standalone Proxmox VE host", tags: ["Proxmox", "Subnet router", "Exit node"] },
    { name: "titan", role: "Standalone Proxmox VE host, primary Netdata parent", tags: ["Proxmox", "Monitoring", "Subnet router", "Exit node"] },
    { name: "vault", role: "Proxmox Backup Server", tags: ["Backup"] },
    { name: "relay", role: "Subnet router VM", tags: ["Linux", "Routing"] },
    { name: "gateway", role: "Nginx Proxy Manager — routes grandmasterj.com traffic to internal hosts", tags: ["Networking", "DNS"] },
  ],
  storage: [
    { name: "Dual UniFi UNAS", detail: "UniFi NAS devices on the core VLAN" },
    { name: "vault", detail: "2TB ZFS mirror on NVME" },
  ],
  overlay: {
    tailnet: "tailscale.subnet.ts",
    model: "Full mesh — ACL tags for organizational structure",
    subnetRouters: "both hypervisor nodes advertise home routes",
    aiNode: "A dedicated tailnet node runs the Zap AI assistant, authenticated via its own SSH keypair — scoped access, not blanket trust",
  },
  monitoring: {
    platform: "Netdata Cloud",
    parent: "titan",
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
    "UniFi NAS",
    "UDM",
    "Certificates",
    "Docker Stack",
    "NUT Power Management",
    "Tailscale",
    "AT&T Bypass",
    "Proxmox Backup Server",
    "Netdata",
  ],
};
