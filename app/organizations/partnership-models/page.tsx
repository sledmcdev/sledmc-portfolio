import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { PARTNERSHIP_MODELS } from "@/lib/data";
import meta from "@/data/pages/organizations/partnership-models/meta.json";
import header from "@/data/pages/organizations/partnership-models/header.json";
import models from "@/data/pages/organizations/partnership-models/models.json";

const ICON_MAP: Record<string, React.ElementType> = { ArrowRight, CheckCircle };

export const metadata = meta;

export default function PartnershipModelsPage() {
  const FeatureIcon = ICON_MAP[models.featureIcon] ?? CheckCircle;
  const CtaIcon = ICON_MAP[models.cta.icon] ?? ArrowRight;

  return (
    <div>
      <section style={{ background: "linear-gradient(160deg, var(--section-dark-bg) 0%, var(--surface-hover) 100%)", padding: "130px 0 70px" }}>
        <div className="container">
          <SectionHeader label={header.label} title={header.title} subtitle={header.subtitle} accent="blue" center light />
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="grid-2">
            {PARTNERSHIP_MODELS.map((model) => (
              <div key={model.title} className="card" style={{ padding: 36, display: "flex", flexDirection: "column", gap: 20 }}>
                <h3 style={{ fontSize: "1.35rem", color: "var(--fg-color)" }}>{model.title}</h3>
                <p style={{ fontSize: "0.9375rem", color: "var(--muted-fg)", lineHeight: 1.6 }}>{model.description}</p>
                <ul style={{ display: "flex", flexDirection: "column", gap: 10, listStyle: "none" }}>
                  {model.features.map((f) => (
                    <li key={f} style={{ fontSize: "0.875rem", color: "var(--fg-color)", display: "flex", alignItems: "center", gap: 8 }}>
                      <FeatureIcon size={16} style={{ color: "var(--amber)" }} /> {f}
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: "auto", paddingTop: 16 }}>
                  <Link href={models.cta.href} className="btn btn-blue btn-sm">
                    {models.cta.label} <CtaIcon size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
