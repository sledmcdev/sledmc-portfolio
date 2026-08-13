import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { INDUSTRIES } from "@/lib/data";

export const metadata = {
  title: "Industries & Sectors Covered | SLEDMC Recruitment",
  description: "Explore the 20+ industries we recruit for including IT, Engineering, Finance, Healthcare, Construction, and Logistics.",
};

const INDUSTRY_ROLES: Record<string, string[]> = {
  "IT & Technology": ["Software Engineering", "Cloud Architecture", "Cybersecurity", "Product Management", "Data Analytics"],
  "Engineering": ["Civil Engineering", "Mechanical Engineer", "Electrical Systems", "Project Management", "Structural Design"],
  "Finance & Accounting": ["Financial Planning", "Corporate Accounting", "Audit & Tax", "Risk Management", "Investment Banking"],
  "Healthcare": ["Medical Directors", "Clinical Specialists", "Healthcare Admin", "Pharmaceutical Sales", "Nursing Leadership"],
  "Construction": ["Site Managers", "Quantity Surveyors", "Safety Officers", "Construction PMs", "BIM Specialists"],
  "Manufacturing": ["Plant Operations", "Quality Assurance", "Supply Chain Lead", "Lean Specialists", "Industrial Engineering"],
  "Hospitality": ["General Managers", "F&B Directors", "Operations Leads", "Revenue Managers", "Executive Chefs"],
  "Sales & Marketing": ["CMO / Directors", "Digital Marketing", "Brand Managers", "Key Account Execs", "Business Development"],
  "Logistics": ["Supply Chain Managers", "Fleet Operations", "Warehouse Directors", "Freight Forwarding", "Logistics Analysts"],
  "Banking & Finance": ["Relationship Managers", "Credit Risk Analysts", "Compliance Officers", "Wealth Managers", "Treasury Leads"],
};

export default function IndustriesPage() {
  return (
    <div>
      <section style={{ background: "linear-gradient(160deg, #0A1628 0%, #112240 100%)", padding: "140px 0 80px" }}>
        <div className="container">
          <SectionHeader
            label="Sector Expertise"
            title="Industries We Serve"
            subtitle="Deep domain knowledge across specialized sectors, allowing us to understand specific skill sets and cultural requirements."
            center
            light
          />
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="grid-2">
            {INDUSTRIES.map((ind) => (
              <div key={ind.name} className="card" style={{ padding: 32, display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${ind.color}15`, color: ind.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>
                    ★
                  </div>
                  <h3 style={{ fontSize: "1.25rem", color: "var(--navy)" }}>{ind.name}</h3>
                </div>
                <p style={{ fontSize: "0.9375rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                  Specialized talent sourcing and executive recruitment for top companies in {ind.name}.
                </p>
                <div>
                  <strong style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--gray-500)" }}>Key Roles Commonly Recruited:</strong>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
                    {(INDUSTRY_ROLES[ind.name] || ["Specialist Roles", "Team Leads", "Management", "Executives"]).map((r) => (
                      <span key={r} className="tag tag-navy">{r}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 64, textAlign: "center" }}>
            <Link href="/organizations/partner-with-us" className="btn btn-primary btn-lg">
              Recruit for Your Industry <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
