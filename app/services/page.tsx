import Link from "next/link";
import { ArrowRight, Briefcase, Users } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { SERVICES } from "@/lib/data";
import meta from "@/data/pages/services/meta.json";
import hero from "@/data/pages/services/hero.json";
import grid from "@/data/pages/services/services-grid.json";
import audienceLinks from "@/data/pages/services/audience-links.json";

export const metadata = meta;

const ICON_MAP: Record<string, React.ElementType> = { Briefcase, Users };

type AudienceKey = keyof typeof grid.audienceLabels;

export default function ServicesPage() {
  return (
    <div>
      <section style={{ background: "linear-gradient(160deg, var(--section-dark-bg) 0%, var(--card-color) 100%)", padding: "140px 0 80px" }}>
        <div className="container">
          <SectionHeader label={hero.label} title={hero.title} subtitle={hero.subtitle} center light />
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="grid-3">
            {SERVICES.map((serv) => {
              const audience: AudienceKey =
                serv.audience === "employer" || serv.audience === "candidate" ? serv.audience : "both";
              return (
                <div key={serv.id} className="card" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className={`tag ${audience === "employer" ? "tag-blue" : audience === "candidate" ? "tag-teal" : "tag-gold"}`}>
                      {grid.audienceLabels[audience]}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "1.25rem", color: "var(--fg-color)" }}>{serv.title}</h3>
                  <p style={{ fontSize: "0.9375rem", color: "var(--muted-fg)", lineHeight: 1.65, flex: 1 }}>{serv.description}</p>
                  <div style={{ paddingTop: 16, borderTop: "1px solid var(--border-color)" }}>
                    <Link href={grid.cta.href} className="btn btn-outline btn-sm">
                      {grid.cta.label} <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 64, display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            {audienceLinks.links.map((link) => {
              const Icon = ICON_MAP[link.icon];
              return (
                <Link key={link.href} href={link.href} className={`btn ${link.variant} btn-lg`}>
                  {Icon && <Icon size={18} />} {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
