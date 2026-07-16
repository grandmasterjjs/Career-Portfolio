import { profile } from "@/data/profile";
import { StatCard } from "@/components/ui/StatCard";
import { Section } from "@/components/layout/Section";

export function QuickStats() {
  return (
    <Section className="py-10 md:py-14">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {profile.quickStats.map((stat, i) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} delay={i * 0.06} />
        ))}
      </div>
    </Section>
  );
}
