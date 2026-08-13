import Link from "next/link";
import { ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import ApproachTimeline from "@/components/home/ApproachTimeline";

export const metadata = {
  title: "Our Approach & Methodology | SLEDMC Recruitment",
  description: "Learn how SLEDMC Recruitment conducts candidate sourcing, rigorous multi-stage screening, interview preparation, and placement follow-ups.",
};

export default function OurApproachPage() {
  return (
    <div>
      <section style={{ background: "linear-gradient(160deg, #0A1628 0%, #112240 100%)", padding: "140px 0 80px" }}>
        <div className="container">
          <SectionHeader
            label="Recruitment Quality"
            title="Our Proven Approach &amp; Methodology"
            subtitle="Precision, integrity, and thorough candidate vetting at every step of the recruitment journey."
            center
            light
          />
        </div>
      </section>

      {/* Timeline Section */}
      <ApproachTimeline />

      {/* Vetting & Quality Control */}
      <section className="section bg-off-white">
        <div className="container">
          <SectionHeader
            label="Rigorous Quality Control"
            title="Candidate Screening &amp; Assessment"
            subtitle="Our multi-tier screening process guarantees that only top-quality candidates reach the client interview room."
          />
          <div className="grid-3">
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <h3 style={{ fontSize: "1.125rem", color: "var(--navy)" }}>1. Technical Competency Vetting</h3>
              <p style={{ fontSize: "0.9375rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                In-depth evaluation of past projects, technical certifications, and domain expertise relevant to the position.
              </p>
            </div>
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <h3 style={{ fontSize: "1.125rem", color: "var(--navy)" }}>2. Cultural &amp; Leadership Alignment</h3>
              <p style={{ fontSize: "0.9375rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                Structured competency interviews evaluating leadership style, communication, problem-solving, and culture fit.
              </p>
            </div>
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <h3 style={{ fontSize: "1.125rem", color: "var(--navy)" }}>3. Comprehensive Background Checks</h3>
              <p style={{ fontSize: "0.9375rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                Verification of employment history, professional references, academic credentials, and compliance documents.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
