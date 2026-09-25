import SectionHeader from "@/components/shared/SectionHeader";
import meta from "@/data/pages/terms/meta.json";
import hero from "@/data/pages/terms/hero.json";
import content from "@/data/pages/terms/content.json";

export const metadata = meta;

export default function TermsPage() {
  return (
    <div>
      <section style={{ background: "linear-gradient(160deg, var(--section-dark-bg) 0%, var(--card-color) 100%)", padding: "130px 0 70px" }}>
        <div className="container">
          <SectionHeader label={hero.label} title={hero.title} subtitle={hero.subtitle} center light />
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-narrow" style={{ display: "flex", flexDirection: "column", gap: 24, lineHeight: 1.7, color: "var(--muted-fg)" }}>
          {content.sections.map((section) => (
            <div key={section.heading} style={{ display: "contents" }}>
              <h2 style={{ color: "var(--fg-color)" }}>{section.heading}</h2>
              <p>{section.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
