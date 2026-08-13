import SectionHeader from "@/components/shared/SectionHeader";
import PlaceholderImage from "@/components/shared/PlaceholderImage";
import { TESTIMONIALS } from "@/lib/data";

export const metadata = {
  title: "Client Testimonials | Feedback from Organizations & HR Directors",
  description: "Read testimonials from corporate partners and HR decision-makers who recruit through SLEDMC Recruitment.",
};

export default function ClientTestimonialsPage() {
  const clientTestimonials = TESTIMONIALS.filter((t) => t.type === "employer");

  return (
    <div>
      <section style={{ background: "linear-gradient(160deg, #0A1628 0%, #15335e 100%)", padding: "130px 0 70px" }}>
        <div className="container">
          <SectionHeader
            label="Client Feedback"
            title="Employer Testimonials"
            subtitle="Hear directly from business leaders and HR executives who rely on us to source top talent."
            accent="blue"
            center
            light
          />
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="grid-3">
            {clientTestimonials.map((item) => (
              <div key={item.id} className="card" style={{ padding: 32, display: "flex", flexDirection: "column", gap: 16 }}>
                <span className="quote-mark">&ldquo;</span>
                <p style={{ fontSize: "0.9375rem", color: "var(--text-muted)", lineHeight: 1.7, flex: 1 }}>{item.testimonial}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 16, borderTop: "1px solid var(--gray-100)" }}>
                  <PlaceholderImage label={`${item.name} Photo`} rounded width={48} height={48} style={{ borderRadius: "50%", minHeight: "unset" }} />
                  <div>
                    <strong style={{ display: "block", fontSize: "0.875rem", color: "var(--navy)" }}>{item.name}</strong>
                    <span style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>{item.position}, {item.company}</span>
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
