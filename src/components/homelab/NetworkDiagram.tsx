import { homelab } from "@/data/homelab";

const vlanColors = ["#FF7A33", "#2DD4BF", "#FF7A33", "#2DD4BF", "#FF7A33", "#2DD4BF"];

export function NetworkDiagram() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-ink-200/70 dark:border-ink-700/70 bg-paper-100/60 dark:bg-ink-900/60 p-4 sm:p-8">
      <svg viewBox="0 0 960 460" className="min-w-[720px] w-full text-ink-700 dark:text-ink-200" fontFamily="var(--font-mono)" aria-hidden="true" role="presentation">
        {/* WAN sources */}
        {homelab.network.wan.map((wan, i) => (
          <g key={wan.label} transform={`translate(${40 + i * 210}, 20)`}>
            <rect width="190" height="50" rx="10" fill="none" stroke="currentColor" strokeOpacity="0.35" />
            <text x="95" y="21" textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.6">{wan.label}</text>
            <text x="95" y="38" textAnchor="middle" fontSize="12" fill="currentColor" fontWeight="600">{wan.value}</text>
          </g>
        ))}

        {/* Lines WAN -> Gateway */}
        {homelab.network.wan.map((_, i) => (
          <line key={i} x1={135 + i * 210} y1="70" x2="480" y2="120" stroke="currentColor" strokeOpacity="0.25" />
        ))}

        {/* Gateway */}
        <g transform="translate(340, 120)">
          <rect width="280" height="56" rx="12" fill="#FF7A33" fillOpacity="0.12" stroke="#FF7A33" />
          <text x="140" y="24" textAnchor="middle" fontSize="12" fill="currentColor" opacity="0.7">Gateway</text>
          <text x="140" y="42" textAnchor="middle" fontSize="13" fontWeight="700" fill="currentColor">{homelab.network.gateway}</text>
        </g>

        {/* Gateway -> VLANs */}
        {homelab.network.vlans.map((_, i) => (
          <line key={i} x1="480" y1="176" x2={70 + i * 150} y2="230" stroke="currentColor" strokeOpacity="0.25" />
        ))}

        {/* VLANs */}
        {homelab.network.vlans.map((vlan, i) => (
          <g key={vlan.name} transform={`translate(${i * 150}, 230)`}>
            <rect width="140" height="64" rx="10" fill={vlanColors[i]} fillOpacity="0.1" stroke={vlanColors[i]} strokeOpacity="0.6" />
            <text x="70" y="24" textAnchor="middle" fontSize="11" fontWeight="600" fill="currentColor">{vlan.name}</text>
            <text x="70" y="42" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.6">{vlan.cidr}</text>
          </g>
        ))}

        {/* Reverse proxy + Cloudflare row */}
        <g transform="translate(70, 340)">
          <rect width="260" height="60" rx="10" fill="#2DD4BF" fillOpacity="0.1" stroke="#2DD4BF" />
          <text x="130" y="24" textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.7">Reverse Proxy (Trusted VLAN)</text>
          <text x="130" y="42" textAnchor="middle" fontSize="12" fontWeight="600" fill="currentColor">Nginx Proxy Manager</text>
        </g>
        <line x1="70" y1="294" x2="200" y2="340" stroke="currentColor" strokeOpacity="0.25" />

        <g transform="translate(350, 340)">
          <rect width="260" height="60" rx="10" fill="none" stroke="currentColor" strokeOpacity="0.35" />
          <text x="130" y="24" textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.7">DNS</text>
          <text x="130" y="42" textAnchor="middle" fontSize="12" fontWeight="600" fill="currentColor">External DNS (*.GrandMasterJ.com)</text>
        </g>
        <line x1="330" y1="370" x2="350" y2="370" stroke="currentColor" strokeOpacity="0.25" />

        <g transform="translate(630, 340)">
          <rect width="260" height="60" rx="10" fill="none" stroke="currentColor" strokeOpacity="0.35" />
          <text x="130" y="24" textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.7">Overlay</text>
          <text x="130" y="42" textAnchor="middle" fontSize="12" fontWeight="600" fill="currentColor">Tailscale ({homelab.overlay.tailnet})</text>
        </g>
        <line x1="220" y1="294" x2="760" y2="340" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="4 4" />
        <line x1="370" y1="294" x2="760" y2="340" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="4 4" />
        <line x1="520" y1="294" x2="760" y2="340" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="4 4" />
      </svg>
      <p className="mt-4 font-mono text-xs text-ink-400 dark:text-ink-500">
        Solid lines = routed traffic. Dashed lines = Tailscale-routed VLANs only (Trusted, Print, Directory Services — IoT, Gaming, and DMZ stay excluded).
      </p>
    </div>
  );
}
