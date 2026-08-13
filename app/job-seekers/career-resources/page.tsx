import SectionHeader from "@/components/shared/SectionHeader";
import { CAREER_RESOURCES } from "@/lib/data";

export const metadata = {
  title: "Career Resources & Advice | Guides for Job Seekers",
  description: "CV writing tips, interview preparation guides, salary benchmarks, and career advice from recruitment experts.",
};

export default function CareerResourcesPage() {
  return (
    <div>
      <section style={{ background: "linear-gradient(160deg, #0A1628 0%, #0d2838 100%)", padding: "130px 0 70px" }}>
        <div className="container">
          <SectionHeader
            label="Expert Knowledge"
            title="Career Resources &amp; Guides"
            subtitle="Actionable advice and insights to help you navigate your job search and accelerate your career."
            accent="teal"
            center
            light
          />
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="grid-3">
            {CAREER_RESOURCES.map((res) => (
              <div key={res.title} className="card" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <span className="tag tag-teal">{res.category}</span>
                <h3 style={{ fontSize: "1.125rem", color: "var(--navy)" }}>{res.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{res.description}</p>
                <div style={{ marginTop: "auto", paddingTop: 16, borderTop: "1px solid var(--gray-100)", display: "flex", justifyContent: "space-between", fontSize: "0.8125rem" }}>
                  <span style={{ color: "var(--gray-400)" }}>{res.readTime}</span>
                  <span style={{ color: "var(--teal)", fontWeight: 600, cursor: "pointer" }}>Read Full Guide →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
