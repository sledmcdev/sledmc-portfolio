import Link from "next/link";
import SectionHeader from "@/components/shared/SectionHeader";
import { BLOGS } from "@/lib/data";
import meta from "@/data/pages/blogs/meta.json";
import hero from "@/data/pages/blogs/hero.json";

export const metadata = meta;

export default function BlogsPage() {
  return (
    <div>
      <section
        style={{
          background: "linear-gradient(160deg, var(--section-dark-bg) 0%, var(--card-color) 100%)",
          padding: "140px 0 80px",
        }}
      >
        <div className="container">
          <SectionHeader label={hero.label} title={hero.title} subtitle={hero.subtitle} center light />
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="grid-3">
            {BLOGS.map((post) => (
              <Link
                key={post.id}
                href={`/blogs/${post.slug}`}
                className="card"
                style={{ display: "flex", flexDirection: "column", gap: 14, textDecoration: "none" }}
              >
                <span className="tag tag-gold">{post.category}</span>
                <h3 style={{ fontSize: "1.125rem", color: "var(--fg-color)" }}>{post.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--muted-fg)", lineHeight: 1.6 }}>{post.excerpt}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: "auto", paddingTop: 14, borderTop: "1px solid var(--border-color)" }}>
                  <div
                    aria-hidden="true"
                    style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--surface-2)", flexShrink: 0 }}
                  />
                  <div style={{ display: "flex", flexDirection: "column", fontSize: "0.75rem" }}>
                    <span style={{ color: "var(--fg-color)", fontWeight: 600 }}>{post.author.name}</span>
                    <span style={{ color: "var(--muted-fg)" }}>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
