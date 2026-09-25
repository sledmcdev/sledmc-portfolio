import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { SERVICES } from "@/lib/data";
import meta from "@/data/pages/organizations/recruitment-services/meta.json";
import header from "@/data/pages/organizations/recruitment-services/header.json";
import services from "@/data/pages/organizations/recruitment-services/services.json";

const ICON_MAP: Record<string, React.ElementType> = { ArrowRight, CheckCircle };

export const metadata = meta;

export default function EmployerRecruitmentServicesPage() {
  const CardIcon = ICON_MAP[services.cardIcon] ?? CheckCircle;
  const CtaIcon = ICON_MAP[services.cta.icon] ?? ArrowRight;

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
            {SERVICES.map((serv) => (
              <div key={serv.id} className="card" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--amber-muted)", color: "var(--amber)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <CardIcon size={24} />
                </div>
                <h3 style={{ fontSize: "1.125rem", color: "var(--fg-color)" }}>{serv.title}</h3>
                <p style={{ fontSize: "0.9375rem", color: "var(--muted-fg)", lineHeight: 1.6 }}>{serv.description}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 64, textAlign: "center" }}>
            <Link href={services.cta.href} className="btn btn-blue btn-lg">
              {services.cta.label} <CtaIcon size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
