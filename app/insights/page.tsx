import SectionHeader from "@/components/shared/SectionHeader";
import { CAREER_RESOURCES } from "@/lib/data";
import meta from "@/data/pages/insights/meta.json";
import hero from "@/data/pages/insights/hero.json";
import articles from "@/data/pages/insights/articles.json";

export const metadata = meta;

const INSIGHT_ARTICLES = [...CAREER_RESOURCES, ...articles.extraArticles];

export default function InsightsPage() {
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
            {INSIGHT_ARTICLES.map((article, i) => (
              <div key={i} className="card" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <span className="tag tag-gold">{article.category}</span>
                <h3 style={{ fontSize: "1.125rem", color: "var(--fg-color)" }}>{article.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--muted-fg)", lineHeight: 1.6 }}>{article.description}</p>
                <div style={{ marginTop: "auto", paddingTop: 14, borderTop: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", fontSize: "0.8125rem" }}>
                  <span style={{ color: "var(--muted-fg)" }}>{article.readTime}</span>
                  <span style={{ color: "var(--amber)", fontWeight: 600, cursor: "pointer" }}>{articles.readMoreLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
