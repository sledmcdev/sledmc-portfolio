import Link from "next/link";
import { ArrowRight, CheckCircle, ShieldCheck, Award, Network, UserCheck, Zap, Handshake } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { WHY_CHOOSE_US } from "@/lib/data";

export const metadata = {
  title: "Why Partner With Us | Value Proposition for Employers",
  description: "Discover why organizations trust SLEDMC Recruitment for high retention placements and accelerated time-to-hire.",
};

export default function WhyPartnerPage() {
  return (
    <div>
      <section style={{ background: "linear-gradient(160deg, #0A1628 0%, #15335e 100%)", padding: "130px 0 70px" }}>
        <div className="container">
          <SectionHeader
            label="Client Value Proposition"
            title="Why Partner With SLEDMC Recruitment"
            subtitle="We act as an extension of your talent acquisition team, driving quality, speed, and long-term retention."
            accent="blue"
            center
            light
          />
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="grid-3">
            {WHY_CHOOSE_US.map((item) => (
              <div key={item.title} className="card" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--blue-muted)", color: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ShieldCheck size={24} />
                </div>
                <h3 style={{ fontSize: "1.125rem", color: "var(--navy)" }}>{item.title}</h3>
                <p style={{ fontSize: "0.9375rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{item.description}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 64, textAlign: "center" }}>
            <Link href="/organizations/partner-with-us" className="btn btn-blue btn-lg">
              Start a Partnership Inquiry <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
