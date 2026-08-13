import Link from "next/link";
import { ArrowRight, CheckCircle2, Award, ShieldCheck, Heart, Eye, Target } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import PlaceholderImage from "@/components/shared/PlaceholderImage";
import FounderVision from "@/components/home/FounderVision";
import KeyStats from "@/components/home/KeyStats";
import AwardsSection from "@/components/home/AwardsSection";
import { COMPANY, FOUNDER } from "@/lib/data";

export const metadata = {
  title: "About Us | Our Story, Leadership, Vision & Values",
  description: "Learn about SLEDMC Recruitment, our founder's vision, company values, and 15+ years of excellence in recruitment.",
};

export default function AboutPage() {
  return (
    <div>
      <section style={{ background: "linear-gradient(160deg, #0A1628 0%, #112240 100%)", padding: "140px 0 80px" }}>
        <div className="container">
          <SectionHeader
            label="Who We Are"
            title="About SLEDMC Recruitment"
            subtitle={COMPANY.description}
            center
            light
          />
        </div>
      </section>

      {/* Story */}
      <section id="our-story" className="section bg-white">
        <div className="container">
          <div className="grid-2" style={{ alignItems: "center" }}>
            <div>
              <span className="section-label">Our Story</span>
              <h2 className="section-title">Built on Trust, Driven by Results</h2>
              <p className="body-md" style={{ color: "var(--text-muted)", marginBottom: 16 }}>
                Founded with a mission to elevate standards in recruitment, SLEDMC Recruitment has grown into a trusted partner for over 100 organizations and thousands of professionals.
              </p>
              <p className="body-md" style={{ color: "var(--text-muted)", marginBottom: 24 }}>
                We believe that successful recruitment goes far beyond matching resumes with job descriptions. It requires understanding organizational culture, business goals, and individual career aspirations.
              </p>
              <div style={{ display: "flex", gap: 24 }}>
                <div>
                  <h4 style={{ fontSize: "1.75rem", color: "var(--gold-dark)", fontWeight: 800 }}>15+</h4>
                  <p style={{ fontSize: "0.8125rem", color: "var(--gray-500)" }}>Years of Excellence</p>
                </div>
                <div style={{ width: 1, background: "var(--gray-200)" }} />
                <div>
                  <h4 style={{ fontSize: "1.75rem", color: "var(--gold-dark)", fontWeight: 800 }}>500+</h4>
                  <p style={{ fontSize: "0.8125rem", color: "var(--gray-500)" }}>Placements Made</p>
                </div>
                <div style={{ width: 1, background: "var(--gray-200)" }} />
                <div>
                  <h4 style={{ fontSize: "1.75rem", color: "var(--gold-dark)", fontWeight: 800 }}>20+</h4>
                  <p style={{ fontSize: "0.8125rem", color: "var(--gray-500)" }}>Sectors Covered</p>
                </div>
              </div>
            </div>
            <div>
              <PlaceholderImage label="Company Office & Team Photo" height={420} style={{ borderRadius: 24 }} />
            </div>
          </div>
        </div>
      </section>

      {/* Founder Vision */}
      <section id="founder">
        <FounderVision />
      </section>

      {/* Vision & Values */}
      <section id="vision" className="section bg-off-white">
        <div className="container">
          <SectionHeader
            label="Guiding Principles"
            title="Vision &amp; Core Values"
            subtitle="The fundamental values that shape our decisions, culture, and relationships."
            center
          />
          <div className="grid-3">
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(212,168,83,0.1)", color: "var(--gold-dark)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Eye size={24} />
              </div>
              <h3 style={{ fontSize: "1.25rem", color: "var(--navy)" }}>Our Vision</h3>
              <p style={{ fontSize: "0.9375rem", color: "var(--text-muted)", lineHeight: 1.65 }}>
                To be the benchmark recruitment agency recognized globally for integrity, candidate care, and delivering transformational hiring outcomes for partner organizations.
              </p>
            </div>
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(212,168,83,0.1)", color: "var(--gold-dark)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Target size={24} />
              </div>
              <h3 style={{ fontSize: "1.25rem", color: "var(--navy)" }}>Our Mission</h3>
              <p style={{ fontSize: "0.9375rem", color: "var(--text-muted)", lineHeight: 1.65 }}>
                To connect exceptional talent with visionary organizations, fostering growth, innovation, and long-term career fulfillment.
              </p>
            </div>
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(212,168,83,0.1)", color: "var(--gold-dark)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Heart size={24} />
              </div>
              <h3 style={{ fontSize: "1.25rem", color: "var(--navy)" }}>Our Core Values</h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: "0.875rem", color: "var(--gray-700)", listStyle: "none" }}>
                <li><strong>Integrity &amp; Transparency:</strong> Honest advice always.</li>
                <li><strong>Excellence:</strong> Uncompromising quality screening.</li>
                <li><strong>Partnership:</strong> Relationships over transactions.</li>
                <li><strong>Inclusion:</strong> Equal opportunity for all talent.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <KeyStats />

      {/* Awards */}
      <section id="awards">
        <AwardsSection />
      </section>
    </div>
  );
}
