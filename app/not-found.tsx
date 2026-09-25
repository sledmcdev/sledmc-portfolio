import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import content from "@/data/pages/not-found/content.json";

export default function NotFound() {
  return (
    <div className="section grid-nexus" style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <div className="container-narrow" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <span className="mono-eyebrow">{content.eyebrow}</span>
        <h1 className="display" style={{ fontSize: "clamp(3rem, 6vw, 6rem)" }}>{content.title}</h1>
        <p className="body-lg" style={{ color: "var(--muted-fg)", maxWidth: 500 }}>
          {content.body}
        </p>
        <Link href={content.cta.href} className="btn btn-primary btn-lg" style={{ marginTop: 16 }}>
          {content.cta.label} <ArrowUpRight size={18} />
        </Link>
      </div>
    </div>
  );
}
