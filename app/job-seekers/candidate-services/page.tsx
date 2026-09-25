import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { CANDIDATE_SERVICES } from "@/lib/data";
import meta from "@/data/pages/job-seekers/candidate-services/meta.json";
import hero from "@/data/pages/job-seekers/candidate-services/hero.json";
import servicesContent from "@/data/pages/job-seekers/candidate-services/services.json";

export const metadata = meta;

const ICON_MAP: Record<string, React.ElementType> = { ArrowRight, CheckCircle2 };

export default function CandidateServicesPage() {
  const CardIcon = ICON_MAP[servicesContent.cardIcon] ?? CheckCircle2;
  const CtaIcon = ICON_MAP[servicesContent.cta.icon] ?? ArrowRight;

  return (
    <div>
      <section style={{ background: "var(--hero-bg)", padding: "130px 0 70px" }}>
        <div className="container">
          <SectionHeader label={hero.label} title={hero.title} subtitle={hero.subtitle} accent="teal" center light />
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="grid-3">
            {CANDIDATE_SERVICES.map((serv) => (
              <div key={serv.title} className="card" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--amber-muted)", color: "var(--amber)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <CardIcon size={24} />
                </div>
                <h3 style={{ fontSize: "1.125rem", color: "var(--fg-color)" }}>{serv.title}</h3>
                <p style={{ fontSize: "0.9375rem", color: "var(--muted-fg)", lineHeight: 1.6 }}>{serv.description}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 64, textAlign: "center" }}>
            <Link href={servicesContent.cta.href} className="btn btn-teal btn-lg">
              {servicesContent.cta.label} <CtaIcon size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
