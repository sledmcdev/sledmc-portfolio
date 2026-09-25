import SectionHeader from "@/components/shared/SectionHeader";
import ApproachTimeline from "@/components/home/ApproachTimeline";
import meta from "@/data/pages/our-approach/meta.json";
import hero from "@/data/pages/our-approach/hero.json";
import screening from "@/data/pages/our-approach/screening.json";

export const metadata = meta;

export default function OurApproachPage() {
  return (
    <div>
      <section style={{ background: "linear-gradient(160deg, var(--section-dark-bg) 0%, var(--card-color) 100%)", padding: "140px 0 80px" }}>
        <div className="container">
          <SectionHeader label={hero.label} title={hero.title} subtitle={hero.subtitle} center light />
        </div>
      </section>

      {/* Timeline Section */}
      <ApproachTimeline />

      {/* Vetting & Quality Control */}
      <section className="section bg-off-white">
        <div className="container">
          <SectionHeader label={screening.label} title={screening.title} subtitle={screening.subtitle} />
          <div className="grid-3">
            {screening.items.map((item) => (
              <div key={item.title} className="card" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <h3 style={{ fontSize: "1.125rem", color: "var(--fg-color)" }}>{item.title}</h3>
                <p style={{ fontSize: "0.9375rem", color: "var(--muted-fg)", lineHeight: 1.6 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
