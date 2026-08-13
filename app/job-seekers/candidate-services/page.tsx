import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { CANDIDATE_SERVICES } from "@/lib/data";

export const metadata = {
  title: "Candidate Services | Career Consultation & Representation",
  description: "Explore services provided to job seekers by SLEDMC Recruitment including CV guidance, interview coaching, and job matching.",
};

export default function CandidateServicesPage() {
  return (
    <div>
      <section style={{ background: "linear-gradient(160deg, #0A1628 0%, #0d2838 100%)", padding: "130px 0 70px" }}>
        <div className="container">
          <SectionHeader
            label="Empowering Candidates"
            title="Candidate Services"
            subtitle="We provide comprehensive support throughout your entire career trajectory."
            accent="teal"
            center
            light
          />
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="grid-3">
            {CANDIDATE_SERVICES.map((serv) => (
              <div key={serv.title} className="card" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--teal-muted)", color: "var(--teal)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <CheckCircle2 size={24} />
                </div>
                <h3 style={{ fontSize: "1.125rem", color: "var(--navy)" }}>{serv.title}</h3>
                <p style={{ fontSize: "0.9375rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{serv.description}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 64, textAlign: "center" }}>
            <Link href="/job-seekers/submit-cv" className="btn btn-teal btn-lg">
              Register With Us <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
