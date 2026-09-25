import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { WHY_CHOOSE_US } from "@/lib/data";
import meta from "@/data/pages/organizations/why-partner/meta.json";
import header from "@/data/pages/organizations/why-partner/header.json";
import valueProps from "@/data/pages/organizations/why-partner/value-props.json";

const ICON_MAP: Record<string, React.ElementType> = { ArrowRight, ShieldCheck };

export const metadata = meta;

export default function WhyPartnerPage() {
  const CardIcon = ICON_MAP[valueProps.cardIcon] ?? ShieldCheck;
  const CtaIcon = ICON_MAP[valueProps.cta.icon] ?? ArrowRight;

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
            {WHY_CHOOSE_US.map((item) => (
              <div key={item.title} className="card" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--amber-muted)", color: "var(--amber)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <CardIcon size={24} />
                </div>
                <h3 style={{ fontSize: "1.125rem", color: "var(--fg-color)" }}>{item.title}</h3>
                <p style={{ fontSize: "0.9375rem", color: "var(--muted-fg)", lineHeight: 1.6 }}>{item.description}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 64, textAlign: "center" }}>
            <Link href={valueProps.cta.href} className="btn btn-blue btn-lg">
              {valueProps.cta.label} <CtaIcon size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
