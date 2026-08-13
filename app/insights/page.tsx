import Link from "next/link";
import SectionHeader from "@/components/shared/SectionHeader";
import { CAREER_RESOURCES } from "@/lib/data";

export const metadata = {
  title: "Insights & Market Reports | SLEDMC Recruitment",
  description: "Recruitment industry trends, hiring market reports, salary benchmarking, and talent acquisition insights.",
};

const INSIGHT_ARTICLES = [
  ...CAREER_RESOURCES,
  {
    category: "Employer Insights",
    title: "Navigating Talent Shortages in Technical Sectors",
    description: "Strategies for organizations competing for rare software and engineering skills in a tight labor market.",
    readTime: "7 min read",
    icon: "TrendingUp",
  },
  {
    category: "Market Reports",
    title: "Global Hiring Trends & Compensation Benchmarks 2025",
    description: "Key findings on salary expectations, remote working policies, and employee retention factors.",
    readTime: "10 min read",
    icon: "FileText",
  },
];

export default function InsightsPage() {
  return (
    <div>
      <section style={{ background: "linear-gradient(160deg, #0A1628 0%, #112240 100%)", padding: "140px 0 80px" }}>
        <div className="container">
          <SectionHeader
            label="Industry Thought Leadership"
            title="Insights &amp; Market Intelligence"
            subtitle="Expert perspectives on recruitment trends, hiring strategy, salary benchmarking, and workplace transformation."
            center
            light
          />
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="grid-3">
            {INSIGHT_ARTICLES.map((article, i) => (
              <div key={i} className="card" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <span className="tag tag-gold">{article.category}</span>
                <h3 style={{ fontSize: "1.125rem", color: "var(--navy)" }}>{article.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{article.description}</p>
                <div style={{ marginTop: "auto", paddingTop: 14, borderTop: "1px solid var(--gray-100)", display: "flex", justifyContent: "space-between", fontSize: "0.8125rem" }}>
                  <span style={{ color: "var(--gray-400)" }}>{article.readTime}</span>
                  <span style={{ color: "var(--gold-dark)", fontWeight: 600, cursor: "pointer" }}>Read Article →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
