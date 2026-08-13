import Link from "next/link";
import { ArrowRight, CheckCircle2, Briefcase, Users } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { SERVICES } from "@/lib/data";

export const metadata = {
  title: "Recruitment Services & Expertise | SLEDMC Recruitment",
  description: "Explore our full suite of recruitment services: Permanent, Executive Search, Contract, Tech Recruitment, RPO, and International Placement.",
};

export default function ServicesPage() {
  return (
    <div>
      <section style={{ background: "linear-gradient(160deg, #0A1628 0%, #112240 100%)", padding: "140px 0 80px" }}>
        <div className="container">
          <SectionHeader
            label="What We Offer"
            title="Recruitment Services &amp; Expertise"
            subtitle="Custom recruitment strategies designed for both job seekers looking to advance and organizations seeking top talent."
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
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className={`tag ${serv.audience === "employer" ? "tag-blue" : serv.audience === "candidate" ? "tag-teal" : "tag-gold"}`}>
                    {serv.audience === "employer" ? "For Employers" : serv.audience === "candidate" ? "For Candidates" : "For Both"}
                  </span>
                </div>
                <h3 style={{ fontSize: "1.25rem", color: "var(--navy)" }}>{serv.title}</h3>
                <p style={{ fontSize: "0.9375rem", color: "var(--text-muted)", lineHeight: 1.65, flex: 1 }}>{serv.description}</p>
                <div style={{ paddingTop: 16, borderTop: "1px solid var(--gray-100)" }}>
                  <Link href="/contact" className="btn btn-outline btn-sm">
                    Inquire Service <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 64, display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <Link href="/job-seekers/find-jobs" className="btn btn-teal btn-lg">
              <Users size={18} /> For Job Seekers
            </Link>
            <Link href="/organizations/partner-with-us" className="btn btn-blue btn-lg">
              <Briefcase size={18} /> For Organizations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
