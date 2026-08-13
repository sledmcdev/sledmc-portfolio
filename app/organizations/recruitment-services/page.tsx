import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { SERVICES } from "@/lib/data";

export const metadata = {
  title: "Employer Recruitment Services | Specialist Sourcing & Executive Search",
  description: "Explore recruitment services offered to hiring partners including permanent placements, executive search, contract staffing, and RPO.",
};

export default function EmployerRecruitmentServicesPage() {
  return (
    <div>
      <section style={{ background: "linear-gradient(160deg, #0A1628 0%, #15335e 100%)", padding: "130px 0 70px" }}>
        <div className="container">
          <SectionHeader
            label="Employer Solutions"
            title="Recruitment Services for Organizations"
            subtitle="Tailored sourcing strategies built to solve complex hiring needs across senior executive levels to contract staff."
            accent="blue"
            center
            light
          />
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="grid-3">
            {SERVICES.map((serv) => (
              <div key={serv.id} className="card" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--blue-muted)", color: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <CheckCircle size={24} />
                </div>
                <h3 style={{ fontSize: "1.125rem", color: "var(--navy)" }}>{serv.title}</h3>
                <p style={{ fontSize: "0.9375rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{serv.description}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 64, textAlign: "center" }}>
            <Link href="/organizations/partner-with-us" className="btn btn-blue btn-lg">
              Discuss Your Hiring Requirements <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
