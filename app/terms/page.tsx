import SectionHeader from "@/components/shared/SectionHeader";

export const metadata = {
  title: "Terms & Conditions | SLEDMC Recruitment",
  description: "Terms and conditions governing the use of SLEDMC Recruitment website and services.",
};

export default function TermsPage() {
  return (
    <div>
      <section style={{ background: "linear-gradient(160deg, #0A1628 0%, #112240 100%)", padding: "130px 0 70px" }}>
        <div className="container">
          <SectionHeader
            label="Legal Agreement"
            title="Terms &amp; Conditions"
            subtitle="Terms governing the use of our recruitment services and digital platform."
            center
            light
          />
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-narrow" style={{ display: "flex", flexDirection: "column", gap: 24, lineHeight: 1.7, color: "var(--gray-700)" }}>
          <h2 style={{ color: "var(--navy)" }}>1. Website Usage</h2>
          <p>By accessing this website, you agree to comply with these terms of use. The website provides information about recruitment services, job listings, and career resources.</p>

          <h2 style={{ color: "var(--navy)" }}>2. Candidate Representations</h2>
          <p>Candidates agree that all information provided in CVs, registration forms, and applications is accurate, current, and truthful.</p>

          <h2 style={{ color: "var(--navy)" }}>3. Client Agreements</h2>
          <p>Employer recruitment terms, guarantee periods, and fee schedules are governed by separate signed client service agreements.</p>
        </div>
      </section>
    </div>
  );
}
