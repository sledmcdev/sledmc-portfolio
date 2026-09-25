import SectionHeader from "@/components/shared/SectionHeader";
import { CAREER_RESOURCES } from "@/lib/data";
import meta from "@/data/pages/job-seekers/career-resources/meta.json";
import hero from "@/data/pages/job-seekers/career-resources/hero.json";
import resourcesContent from "@/data/pages/job-seekers/career-resources/resources.json";

export const metadata = meta;

export default function CareerResourcesPage() {
  return (
    <div>
      <section style={{ background: "var(--hero-bg)", padding: "130px 0 70px" }}>
        <div className="container">
          <SectionHeader label={hero.label} title={hero.title} subtitle={hero.subtitle} accent="teal" center light />
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="grid-3">
            {CAREER_RESOURCES.map((res) => (
              <div key={res.title} className="card" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <span className="tag tag-teal">{res.category}</span>
                <h3 style={{ fontSize: "1.125rem", color: "var(--fg-color)" }}>{res.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--muted-fg)", lineHeight: 1.6 }}>{res.description}</p>
                <div style={{ marginTop: "auto", paddingTop: 16, borderTop: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", fontSize: "0.8125rem" }}>
                  <span style={{ color: "var(--muted-fg)" }}>{res.readTime}</span>
                  <span style={{ color: "var(--amber)", fontWeight: 600, cursor: "pointer" }}>{resourcesContent.readMoreLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
