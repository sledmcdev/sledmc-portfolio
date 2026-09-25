"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import content from "@/data/pages/error/content.json";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="section grid-nexus" style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <div className="container-narrow" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <span className="mono-eyebrow">{content.eyebrow}</span>
        <h1 className="heading-xl">{content.title}</h1>
        <p className="body-md" style={{ color: "var(--muted-fg)", maxWidth: 500 }}>
          {content.body}
        </p>
        <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
          <button onClick={() => reset()} className="btn btn-primary btn-lg">
            {content.retryLabel}
          </button>
          <Link href={content.homeCta.href} className="btn btn-secondary btn-lg">
            {content.homeCta.label} <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
