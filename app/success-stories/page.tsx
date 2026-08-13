import Link from "next/link";
import SectionHeader from "@/components/shared/SectionHeader";
import SuccessStories from "@/components/home/SuccessStories";

export const metadata = {
  title: "Success Stories & Case Studies | SLEDMC Recruitment",
  description: "Read real client case studies and candidate placement success stories across IT, Engineering, Construction, and Finance.",
};

export default function SuccessStoriesPage() {
  return (
    <div>
      <section style={{ background: "linear-gradient(160deg, #0A1628 0%, #112240 100%)", padding: "140px 0 80px" }}>
        <div className="container">
          <SectionHeader
            label="Verified Results"
            title="Success Stories &amp; Case Studies"
            subtitle="Explore how our recruitment solutions have driven business growth and transformed candidate careers."
            center
            light
          />
        </div>
      </section>

      <SuccessStories />

      <section className="section bg-white" style={{ textAlign: "center" }}>
        <div className="container-narrow">
          <h2 style={{ fontSize: "2rem", color: "var(--navy)", marginBottom: 16 }}>Ready to write your success story?</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: 32 }}>
            Whether you&apos;re hiring or seeking a role, partner with the recruitment agency committed to your growth.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
            <Link href="/job-seekers/find-jobs" className="btn btn-teal">For Candidates</Link>
            <Link href="/organizations/partner-with-us" className="btn btn-blue">For Employers</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
