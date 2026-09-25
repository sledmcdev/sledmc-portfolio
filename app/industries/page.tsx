import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { INDUSTRIES } from "@/lib/data";
import meta from "@/data/pages/industries/meta.json";
import hero from "@/data/pages/industries/hero.json";
import grid from "@/data/pages/industries/industries-grid.json";
import cta from "@/data/pages/industries/cta.json";

export const metadata = meta;

const INDUSTRY_ROLES: Record<string, string[]> = grid.roles;

export default function IndustriesPage() {
  return (
    <div>
      <section style={{ background: "linear-gradient(160deg, var(--section-dark-bg) 0%, var(--card-color) 100%)", padding: "140px 0 80px" }}>
        <div className="container">
          <SectionHeader label={hero.label} title={hero.title} subtitle={hero.subtitle} center light />
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="grid-2">
            {INDUSTRIES.map((ind) => (
              <div key={ind.name} className="card" style={{ padding: 32, display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${ind.color}15`, color: ind.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>
                    {grid.glyph}
                  </div>
                  <h3 style={{ fontSize: "1.25rem", color: "var(--fg-color)" }}>{ind.name}</h3>
                </div>
                <p style={{ fontSize: "0.9375rem", color: "var(--muted-fg)", lineHeight: 1.6 }}>
                  {grid.descriptionTemplate.replace("{name}", ind.name)}
                </p>
                <div>
                  <strong style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted-fg)" }}>{grid.rolesLabel}</strong>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
                    {(INDUSTRY_ROLES[ind.name] || grid.fallbackRoles).map((r) => (
                      <span key={r} className="tag tag-navy">{r}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 64, textAlign: "center" }}>
            <Link href={cta.href} className="btn btn-primary btn-lg">
              {cta.label} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
