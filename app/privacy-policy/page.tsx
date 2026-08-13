import SectionHeader from "@/components/shared/SectionHeader";

export const metadata = {
  title: "Privacy Policy & Candidate Data Handling | SLEDMC Recruitment",
  description: "Privacy policy detailing how SLEDMC Recruitment collects, stores, and handles candidate CVs and employer information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div>
      <section style={{ background: "linear-gradient(160deg, #0A1628 0%, #112240 100%)", padding: "130px 0 70px" }}>
        <div className="container">
          <SectionHeader
            label="Legal & Data Protection"
            title="Privacy Policy"
            subtitle="How we collect, protect, and process candidate CVs and client information."
            center
            light
          />
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-narrow" style={{ display: "flex", flexDirection: "column", gap: 24, lineHeight: 1.7, color: "var(--gray-700)" }}>
          <h2 style={{ color: "var(--navy)" }}>1. Data Collection &amp; Use</h2>
          <p>
            SLEDMC Recruitment collects personal information supplied directly by job seekers (including CVs, contact details, employment history) and hiring organizations solely for recruitment, talent acquisition, and candidate placement services.
          </p>

          <h2 style={{ color: "var(--navy)" }}>2. CV &amp; Candidate Information Handling</h2>
          <p>
            When a candidate submits a CV, it is stored securely in our candidate database. We will never share candidate profiles or personal identifiers with any prospective employer without obtaining prior verbal or written consent from the candidate.
          </p>

          <h2 style={{ color: "var(--navy)" }}>3. Data Retention</h2>
          <p>
            Candidate and client data is retained only for as long as necessary to fulfill recruitment mandates or as required by applicable labor and data protection laws. Candidates have the right to request deletion or update of their CV at any time.
          </p>

          <h2 style={{ color: "var(--navy)" }}>4. Contact for Privacy Inquiries</h2>
          <p>
            If you have any questions regarding your data or wish to exercise your data protection rights, please contact our Data Protection Officer at privacy@sledmcrecruitment.com.
          </p>
        </div>
      </section>
    </div>
  );
}
