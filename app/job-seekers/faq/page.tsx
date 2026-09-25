import SectionHeader from "@/components/shared/SectionHeader";
import { CANDIDATE_FAQ } from "@/lib/data";
import meta from "@/data/pages/job-seekers/faq/meta.json";
import hero from "@/data/pages/job-seekers/faq/hero.json";
import faqContent from "@/data/pages/job-seekers/faq/faq-list.json";

export const metadata = meta;

export default function CandidateFaqPage() {
  return (
    <div>
      <section style={{ background: "var(--hero-bg)", padding: "130px 0 70px" }}>
        <div className="container">
          <SectionHeader label={hero.label} title={hero.title} subtitle={hero.subtitle} accent="teal" center light />
        </div>
      </section>

      <section className="section bg-off-white">
        <div className="container-narrow">
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {CANDIDATE_FAQ.map((faq, i) => (
              <div key={i} className="card" style={{ padding: 28 }}>
                <h3 style={{ fontSize: "1.125rem", color: "var(--fg-color)", marginBottom: 12 }}>
                  {faqContent.questionPrefix} {faq.q}
                </h3>
                <p style={{ fontSize: "0.9375rem", color: "var(--muted-fg)", lineHeight: 1.7, paddingLeft: 24 }}>
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
