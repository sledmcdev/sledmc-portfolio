import SectionHeader from "@/components/shared/SectionHeader";
import PlaceholderImage from "@/components/shared/PlaceholderImage";
import { SUCCESS_STORIES } from "@/lib/data";

export const metadata = {
  title: "Candidate Success Stories | Real Career Transformations",
  description: "Read real stories of job seekers placed by SLEDMC Recruitment.",
};

export default function CandidateSuccessStoriesPage() {
  const candidateStories = SUCCESS_STORIES.filter((s) => s.type === "candidate");

  return (
    <div>
      <section style={{ background: "linear-gradient(160deg, #0A1628 0%, #0d2838 100%)", padding: "130px 0 70px" }}>
        <div className="container">
          <SectionHeader
            label="Real Outcomes"
            title="Candidate Success Stories"
            subtitle="Discover how we've helped candidates achieve career growth and land their dream roles."
            accent="teal"
            center
            light
          />
        </div>
      </section>

      <section className="section bg-off-white">
        <div className="container">
          <div className="grid-2">
            {candidateStories.map((story) => (
              <div key={story.id} className="card" style={{ padding: 36, display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <PlaceholderImage label={`${story.name} Portrait`} rounded width={64} height={64} style={{ borderRadius: "50%", minHeight: "unset" }} />
                  <div>
                    <h3 style={{ fontSize: "1.25rem", color: "var(--navy)" }}>{story.name}</h3>
                    <span className="tag tag-teal">{story.industry}</span>
                  </div>
                </div>
                <h4 style={{ fontSize: "1.0625rem", color: "var(--navy)" }}>{story.title}</h4>
                <div style={{ padding: "12px 16px", background: "var(--teal-muted)", color: "var(--teal-dark)", borderRadius: 12, fontWeight: 700, fontSize: "0.9375rem" }}>
                  Outcome: {story.metric}
                </div>
                <div>
                  <strong style={{ fontSize: "0.8125rem", color: "var(--gold-dark)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Before:</strong>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginTop: 4 }}>{story.previous}</p>
                </div>
                <div>
                  <strong style={{ fontSize: "0.8125rem", color: "var(--gold-dark)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Agency Support:</strong>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginTop: 4 }}>{story.support}</p>
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
