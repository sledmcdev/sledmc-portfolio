import SectionHeader from "@/components/shared/SectionHeader";
import { SUCCESS_STORIES } from "@/lib/data";

export const metadata = {
  title: "Employer Success Stories & Case Studies | SLEDMC Recruitment",
  description: "Read real client case studies showing how SLEDMC Recruitment solved complex talent acquisition challenges.",
};

export default function EmployerSuccessStoriesPage() {
  const employerStories = SUCCESS_STORIES.filter((s) => s.type === "employer");

  return (
    <div>
      <section style={{ background: "linear-gradient(160deg, #0A1628 0%, #15335e 100%)", padding: "130px 0 70px" }}>
        <div className="container">
          <SectionHeader
            label="Client Case Studies"
            title="Employer Success Stories"
            subtitle="Detailed breakdowns of recruitment challenges, strategic sourcing approaches, and verified results."
            accent="blue"
            center
            light
          />
        </div>
      </section>

      <section className="section bg-off-white">
        <div className="container">
          <div className="grid-2">
            {employerStories.map((story) => (
              <div key={story.id} className="card" style={{ padding: 36, display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="tag tag-blue">{story.industry}</span>
                  <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--gray-600)" }}>{story.company}</span>
                </div>
                <h3 style={{ fontSize: "1.25rem", color: "var(--navy)" }}>{story.title}</h3>
                <div style={{ padding: "12px 16px", background: "var(--blue-muted)", color: "var(--blue-dark)", borderRadius: 12, fontWeight: 700, fontSize: "0.9375rem" }}>
                  Result: {story.metric}
                </div>
                <div>
                  <strong style={{ fontSize: "0.8125rem", color: "var(--gold-dark)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Challenge:</strong>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginTop: 4 }}>{story.challenge}</p>
                </div>
                <div>
                  <strong style={{ fontSize: "0.8125rem", color: "var(--gold-dark)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Approach:</strong>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginTop: 4 }}>{story.approach}</p>
                </div>
                <div>
                  <strong style={{ fontSize: "0.8125rem", color: "var(--gold-dark)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Result:</strong>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginTop: 4 }}>{story.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
