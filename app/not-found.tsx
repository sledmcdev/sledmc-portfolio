import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="section grid-nexus" style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <div className="container-narrow" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <span className="mono-eyebrow">404 — PAGE NOT FOUND</span>
        <h1 className="display" style={{ fontSize: "clamp(3rem, 6vw, 6rem)" }}>Page Not Found</h1>
        <p className="body-lg" style={{ color: "hsl(0 0% 64%)", maxWidth: 500 }}>
          The page you are looking for does not exist or has been relocated.
        </p>
        <Link href="/" className="btn btn-primary btn-lg" style={{ marginTop: 16 }}>
          Return to Homepage <ArrowUpRight size={18} />
        </Link>
      </div>
    </div>
  );
}
