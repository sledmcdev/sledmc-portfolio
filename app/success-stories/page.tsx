import Link from "next/link";
import SectionHeader from "@/components/shared/SectionHeader";
import SuccessStories from "@/components/home/SuccessStories";
import meta from "@/data/pages/success-stories/meta.json";
import hero from "@/data/pages/success-stories/hero.json";
import cta from "@/data/pages/success-stories/cta.json";

export const metadata = meta;

export default function SuccessStoriesPage() {
  return (
    <div>
      <section style={{ background: "linear-gradient(160deg, var(--section-dark-bg) 0%, var(--card-color) 100%)", padding: "140px 0 80px" }}>
        <div className="container">
          <SectionHeader label={hero.label} title={hero.title} subtitle={hero.subtitle} center light />
        </div>
      </section>

      <SuccessStories />

      <section className="section bg-white" style={{ textAlign: "center" }}>
        <div className="container-narrow">
          <h2 style={{ fontSize: "2rem", color: "var(--fg-color)", marginBottom: 16 }}>{cta.title}</h2>
          <p style={{ color: "var(--muted-fg)", marginBottom: 32 }}>{cta.body}</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
            {cta.buttons.map((btn) => (
              <Link key={btn.href} href={btn.href} className={`btn ${btn.variant}`}>{btn.label}</Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
