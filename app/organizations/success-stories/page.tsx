import SectionHeader from "@/components/shared/SectionHeader";
import { SUCCESS_STORIES } from "@/lib/data";
import meta from "@/data/pages/organizations/success-stories/meta.json";
import header from "@/data/pages/organizations/success-stories/header.json";
import stories from "@/data/pages/organizations/success-stories/stories.json";

export const metadata = meta;

const labelStyle = { fontSize: "0.8125rem", color: "var(--amber)", textTransform: "uppercase", letterSpacing: "0.1em" } as const;
const bodyStyle = { fontSize: "0.875rem", color: "var(--muted-fg)", marginTop: 4 } as const;

export default function EmployerSuccessStoriesPage() {
  const employerStories = SUCCESS_STORIES.filter((s) => s.type === stories.storyType);

  return (
    <div>
      <section style={{ background: "linear-gradient(160deg, var(--section-dark-bg) 0%, var(--surface-hover) 100%)", padding: "130px 0 70px" }}>
        <div className="container">
          <SectionHeader label={header.label} title={header.title} subtitle={header.subtitle} accent="blue" center light />
        </div>
      </section>

      <section className="section bg-off-white">
        <div className="container">
          <div className="grid-2">
            {employerStories.map((story) => (
              <div key={story.id} className="card" style={{ padding: 36, display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="tag tag-blue">{story.industry}</span>
                  <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--muted-fg)" }}>{story.company}</span>
                </div>
                <h3 style={{ fontSize: "1.25rem", color: "var(--fg-color)" }}>{story.title}</h3>
                <div style={{ padding: "12px 16px", background: "var(--amber-muted)", color: "var(--amber)", border: "1px solid var(--accent-border)", borderRadius: 12, fontWeight: 700, fontSize: "0.9375rem" }}>
                  {stories.metricPrefix}
                  {story.metric}
                </div>
                <div>
                  <strong style={labelStyle}>{stories.labels.challenge}</strong>
                  <p style={bodyStyle}>{story.challenge}</p>
                </div>
                <div>
                  <strong style={labelStyle}>{stories.labels.approach}</strong>
                  <p style={bodyStyle}>{story.approach}</p>
                </div>
                <div>
                  <strong style={labelStyle}>{stories.labels.result}</strong>
                  <p style={bodyStyle}>{story.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
