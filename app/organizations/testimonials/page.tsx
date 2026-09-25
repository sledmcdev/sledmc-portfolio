import SectionHeader from "@/components/shared/SectionHeader";
import PlaceholderImage from "@/components/shared/PlaceholderImage";
import { TESTIMONIALS } from "@/lib/data";
import meta from "@/data/pages/organizations/testimonials/meta.json";
import header from "@/data/pages/organizations/testimonials/header.json";
import content from "@/data/pages/organizations/testimonials/testimonials.json";

export const metadata = meta;

export default function ClientTestimonialsPage() {
  const clientTestimonials = TESTIMONIALS.filter((t) => t.type === content.testimonialType);

  return (
    <div>
      <section style={{ background: "linear-gradient(160deg, var(--section-dark-bg) 0%, var(--surface-hover) 100%)", padding: "130px 0 70px" }}>
        <div className="container">
          <SectionHeader label={header.label} title={header.title} subtitle={header.subtitle} accent="blue" center light />
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="grid-3">
            {clientTestimonials.map((item) => (
              <div key={item.id} className="card" style={{ padding: 32, display: "flex", flexDirection: "column", gap: 16 }}>
                <span className="quote-mark">{content.quoteMark}</span>
                <p style={{ fontSize: "0.9375rem", color: "var(--muted-fg)", lineHeight: 1.7, flex: 1 }}>{item.testimonial}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 16, borderTop: "1px solid var(--border-color)" }}>
                  <PlaceholderImage
                    label={content.photoLabel.replace("{name}", item.name)}
                    rounded
                    width={48}
                    height={48}
                    style={{ borderRadius: "50%", minHeight: "unset" }}
                  />
                  <div>
                    <strong style={{ display: "block", fontSize: "0.875rem", color: "var(--fg-color)" }}>{item.name}</strong>
                    <span style={{ fontSize: "0.8125rem", color: "var(--muted-fg)" }}>
                      {item.position}, {item.company}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
