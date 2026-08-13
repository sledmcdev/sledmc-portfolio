import SectionHeader from "@/components/shared/SectionHeader";
import { CANDIDATE_FAQ } from "@/lib/data";

export const metadata = {
  title: "Candidate FAQ | Frequently Asked Questions",
  description: "Answers to common questions about submitting your CV, fees, registration, and recruitment process.",
};

export default function CandidateFaqPage() {
  return (
    <div>
      <section style={{ background: "linear-gradient(160deg, #0A1628 0%, #0d2838 100%)", padding: "130px 0 70px" }}>
        <div className="container">
          <SectionHeader
            label="Help & Support"
            title="Candidate FAQ"
            subtitle="Everything you need to know about partnering with SLEDMC Recruitment as a job seeker."
            accent="teal"
            center
            light
          />
        </div>
      </section>

      <section className="section bg-off-white">
        <div className="container-narrow">
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {CANDIDATE_FAQ.map((faq, i) => (
              <div key={i} className="card" style={{ padding: 28 }}>
                <h3 style={{ fontSize: "1.125rem", color: "var(--navy)", marginBottom: 12 }}>
                  ❓ {faq.q}
                </h3>
                <p style={{ fontSize: "0.9375rem", color: "var(--text-muted)", lineHeight: 1.7, paddingLeft: 24 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
