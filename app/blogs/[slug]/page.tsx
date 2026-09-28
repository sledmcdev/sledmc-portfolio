import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { BLOGS } from "@/lib/data";

interface BlogPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return BLOGS.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: BlogPageProps): Metadata {
  const post = BLOGS.find((p) => p.slug === params.slug);
  if (!post) return {};
  return { title: `${post.title} | SLEDMC Recruitment`, description: post.excerpt };
}

export default function BlogPostPage({ params }: BlogPageProps) {
  const post = BLOGS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <div>
      <section
        style={{
          background: "linear-gradient(160deg, var(--section-dark-bg) 0%, var(--card-color) 100%)",
          padding: "140px 0 64px",
        }}
      >
        <div className="container-narrow">
          <Link
            href="/blogs"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--amber)", fontSize: "0.875rem", fontWeight: 600, marginBottom: 24, textDecoration: "none" }}
          >
            <ArrowLeft size={16} /> Back to Blogs
          </Link>
          <span className="tag tag-gold" style={{ marginBottom: 16 }}>
            {post.category}
          </span>
          <h1 className="section-title light" style={{ marginTop: 16 }}>{post.title}</h1>
          <p className="section-subtitle light">{post.excerpt}</p>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 24 }}>
            <div
              aria-hidden="true"
              style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--surface-2)", flexShrink: 0 }}
            />
            <div style={{ display: "flex", flexDirection: "column", fontSize: "0.875rem" }}>
              <span style={{ color: "var(--fg-color)", fontWeight: 600 }}>{post.author.name}</span>
              <span style={{ color: "var(--muted-fg)" }}>
                {post.author.role} · {post.readTime} ·{" "}
                {new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-narrow">
          <article style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {post.content.map((block, i) =>
              block.type === "heading" ? (
                <h2 key={i} style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--fg-color)", marginTop: 12 }}>
                  {block.text}
                </h2>
              ) : (
                <p key={i} className="body-md" style={{ color: "var(--muted-fg)" }}>
                  {block.text}
                </p>
              )
            )}
          </article>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 32 }}>
            {post.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>

          <div className="card" style={{ marginTop: 40, display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div
              aria-hidden="true"
              style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--surface-2)", flexShrink: 0 }}
            />
            <div>
              <h3 style={{ fontSize: "1rem", color: "var(--fg-color)" }}>{post.author.name}</h3>
              <p style={{ fontSize: "0.8125rem", color: "var(--amber)", fontWeight: 600, marginBottom: 6 }}>{post.author.role}</p>
              <p style={{ fontSize: "0.875rem", color: "var(--muted-fg)", lineHeight: 1.6 }}>{post.author.bio}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
