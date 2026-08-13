"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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
        <span className="mono-eyebrow">ERROR — SYSTEM EXCEPTION</span>
        <h1 className="heading-xl">Something went wrong</h1>
        <p className="body-md" style={{ color: "hsl(0 0% 64%)", maxWidth: 500 }}>
          An unexpected error occurred. Please try again or return home.
        </p>
        <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
          <button onClick={() => reset()} className="btn btn-primary btn-lg">
            Try Again
          </button>
          <Link href="/" className="btn btn-secondary btn-lg">
            Return Home <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
