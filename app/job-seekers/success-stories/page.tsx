import SectionHeader from "@/components/shared/SectionHeader";
import PlaceholderImage from "@/components/shared/PlaceholderImage";
import { SUCCESS_STORIES } from "@/lib/data";
import meta from "@/data/pages/job-seekers/success-stories/meta.json";
import hero from "@/data/pages/job-seekers/success-stories/hero.json";
import storiesContent from "@/data/pages/job-seekers/success-stories/stories.json";

export const metadata = meta;

const labelStyle: React.CSSProperties = {
  fontSize: "0.8125rem",
  color: "var(--amber)",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
};
const bodyStyle: React.CSSProperties = { fontSize: "0.875rem", color: "var(--muted-fg)", marginTop: 4 };

export default function CandidateSuccessStoriesPage() {
  const candidateStories = SUCCESS_STORIES.filter((s) => s.type === storiesContent.storyType);
  const { labels } = storiesContent;

  return (
    <div>
      <section style={{ background: "var(--hero-bg)", padding: "130px 0 70px" }}>
        <div className="container">
          <SectionHeader label={hero.label} title={hero.title} subtitle={hero.subtitle} accent="teal" center light />
        </div>
      </section>

      <section className="section bg-off-white">
        <div className="container">
          <div className="grid-2">
            {candidateStories.map((story) => (
              <div key={story.id} className="card" style={{ padding: 36, display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <PlaceholderImage
                    label={`${story.name}${storiesContent.portraitLabelSuffix}`}
                    rounded
                    width={64}
                    height={64}
                    style={{ borderRadius: "50%", minHeight: "unset" }}
                  />
                  <div>
                    <h3 style={{ fontSize: "1.25rem", color: "var(--fg-color)" }}>{story.name}</h3>
                    <span className="tag tag-teal">{story.industry}</span>
                  </div>
                </div>
                <h4 style={{ fontSize: "1.0625rem", color: "var(--fg-color)" }}>{story.title}</h4>
                <div style={{ padding: "12px 16px", background: "var(--amber-muted)", color: "var(--amber)", borderRadius: 12, fontWeight: 700, fontSize: "0.9375rem" }}>
                  {storiesContent.outcomePrefix}
                  {story.metric}
                </div>
                <div>
                  <strong style={labelStyle}>{labels.previous}</strong>
                  <p style={bodyStyle}>{story.previous}</p>
                </div>
                <div>
                  <strong style={labelStyle}>{labels.support}</strong>
                  <p style={bodyStyle}>{story.support}</p>
                </div>
                <div>
                  <strong style={labelStyle}>{labels.result}</strong>
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
