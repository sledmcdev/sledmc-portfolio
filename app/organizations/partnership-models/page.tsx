import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { PARTNERSHIP_MODELS } from "@/lib/data";

export const metadata = {
  title: "Partnership Models | Flexible Client Engagement",
  description: "Executive search, volume recruitment, contingency hiring, and RPO models for enterprise and growing companies.",
};

export default function PartnershipModelsPage() {
  return (
    <div>
      <section style={{ background: "linear-gradient(160deg, #0A1628 0%, #15335e 100%)", padding: "130px 0 70px" }}>
        <div className="container">
          <SectionHeader
            label="Engagement Structures"
            title="Partnership Models"
            subtitle="Structure your recruitment agreement to match your corporate growth objectives and hiring schedule."
            accent="blue"
            center
            light
          />
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="grid-2">
            {PARTNERSHIP_MODELS.map((model) => (
              <div key={model.title} className="card" style={{ padding: 36, display: "flex", flexDirection: "column", gap: 20 }}>
                <h3 style={{ fontSize: "1.35rem", color: "var(--navy)" }}>{model.title}</h3>
                <p style={{ fontSize: "0.9375rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{model.description}</p>
                <ul style={{ display: "flex", flexDirection: "column", gap: 10, listStyle: "none" }}>
                  {model.features.map((f) => (
                    <li key={f} style={{ fontSize: "0.875rem", color: "var(--gray-700)", display: "flex", alignItems: "center", gap: 8 }}>
                      <CheckCircle size={16} style={{ color: "var(--blue)" }} /> {f}
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: "auto", paddingTop: 16 }}>
                  <Link href="/organizations/partner-with-us" className="btn btn-blue btn-sm">
                    Inquire About This Model <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
