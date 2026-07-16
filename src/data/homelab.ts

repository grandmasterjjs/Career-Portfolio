export const homelab = {
  intro:
    "GrandMasterJ.com is my home infrastructure — a live environment I use to learn, break, document, and rebuild things on purpose. It runs my own domain, its own reverse proxy, its own monitoring, and (as of mid-2026) its own AI operations assistant.",
  philosophy: [
    "This homelab is built to be rebuilt. This is the way.",
    "Memory is volatile. Markdown is durable.",
  ],
  network: {
    gateway: "UniFi Dream Machine Pro Max",
    wan: [
      { label: "Primary", value: "AT&T Gigabit Fiber" },
      { label: "Secondary", value: "Spectrum" },
      { label: "Backup", value: "T-Mobile 5G" },
    ],
    vlans: [
      { name: "Wabash", cidr: "192.168.0.0/24", note: "Primary trusted network" },
      { name: "Printers", cidr: "192.168.2.0/24" },
      { name: "IoT", cidr: "192.168.3.0/24" },
      { name: "Gaming", cidr: "192.168.5.0/24" },
      { name: "Active Directory", cidr: "192.168.30.0/24" },
      { name: "DMZ", cidr: "192.168.50.0/24" },
    ],
    reverseProxy:
      "reverseproxy.wabash runs Nginx Proxy Manager, paired with Cloudflare DNS, so every internal machine gets a clean external hostname like win11plex.grandmasterj.com instead of a raw IP.",
  },
  compute: [
    { name: "helios", role: "Standalone Proxmox VE host", tags: ["Proxmox", "Subnet router", "Exit node"] },
    { name: "aegis", role: "Standalone Proxmox VE host, primary Netdata parent", tags: ["Proxmox", "Monitoring", "Subnet router", "Exit node"] },
    { name: "pbs", role: "Proxmox Backup Server (backup_data datastore)", tags: ["Backup"] },
    { name: "ubuntu", role: "Subnet router VM", tags: ["Linux", "Routing"] },
    { name: "reverseproxy", role: "Nginx Proxy Manager — routes grandmasterj.com traffic to internal hosts", tags: ["Networking", "DNS"] },
  ],
  storage: [
    { name: "UNAS-Pro / UNAS-Pro-8", detail: "UniFi NAS devices on the Wabash VLAN" },
    { name: "PBS Datastore", detail: "2TB ZFS mirror on Samsung 990 PRO drives (rebuilt June 2026)" },
  ],
  overlay: {
    tailnet: "boston-city.ts.net",
    model: "Full mesh — tags are organizational, not segmentation boundaries",
    subnetRouters: "helios and aegis advertise home routes; a dedicated node advertises company routes only, kept separate from home traffic",
    aiNode: "A dedicated tailnet node runs the Zap AI assistant, authenticated via its own SSH keypair — scoped access, not blanket trust",
  },
  monitoring: {
    platform: "Netdata Cloud",
    parent: "aegis",
    coverage: "Homelab nodes stream metrics continuously; key hosts are claimed and actively monitored.",
    knownIssue:
      "UniFi NAS firmware updates can reset Netdata agents and cause duplicate node registrations — a known quirk that's now just part of the update runbook.",
  },
  aiOps: {
    name: "Zap",
    platform: "Vellum",
    description:
      "Zap is a personal AI operations assistant running on the Vellum platform, connected to the tools and workflows that run this homelab. It helps administer the network, keeps documentation current, and handles repetitive operational work — the same philosophy I brought to enterprise AI adoption at work, applied at home first.",
  },
  inFlight: [
    "Sonarr/Radarr: fully restored and running, still being watched to confirm repeat-download issues don't return.",
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
