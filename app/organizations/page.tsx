import Link from "next/link";
import { ArrowRight, Building2, ShieldCheck, Users, Briefcase, Award, CheckCircle, HelpCircle } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import PlaceholderImage from "@/components/shared/PlaceholderImage";
import { SERVICES, WHY_CHOOSE_US, EMPLOYER_PROCESS, PARTNERSHIP_MODELS, SUCCESS_STORIES, EMPLOYER_FAQ } from "@/lib/data";
import styles from "./Organizations.module.css";

export const metadata = {
  title: "Organizations & Employers | Build Your Next High-Performing Team",
  description: "Partner with SLEDMC Recruitment for specialist talent sourcing, executive search, permanent recruitment, and contract staffing.",
};

export default function OrganizationsPage() {
  const employerStories = SUCCESS_STORIES.filter((s) => s.type === "employer");

  return (
    <div className={styles.page}>
      {/* Employer Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroText}>
              <span className="tag tag-blue" style={{ marginBottom: 16 }}>For Organizations &amp; Employers</span>
              <h1 className={styles.heroTitle}>Build Your Team With the Right Talent</h1>
              <p className={styles.heroDesc}>
                From single specialist hires to enterprise volume campaigns, SLEDMC Recruitment delivers pre-screened, high-caliber candidates tailored to your business culture and technical requirements.
              </p>
              <div className={styles.heroCtas}>
                <Link href="/organizations/partner-with-us" className="btn btn-blue btn-lg">
                  <Briefcase size={18} /> Partner With Us
                </Link>
                <Link href="/organizations/recruitment-services" className="btn btn-secondary btn-lg">
                  Explore Services
                </Link>
              </div>
            </div>
            <div className={styles.heroVisual}>
              <PlaceholderImage label="Client Executive / Boardroom Image" height={420} style={{ borderRadius: 24 }} />
            </div>
          </div>
        </div>
      </section>

      {/* Recruitment Challenges Solved */}
      <section className={`section ${styles.sectionWhite}`}>
        <div className="container">
          <SectionHeader
            label="Solving Hiring Friction"
            title="Recruitment Challenges We Solve"
            subtitle="Hiring top-tier talent in today's competitive landscape requires precision, speed, and deep market intelligence."
            accent="blue"
          />
          <div className={styles.challengesGrid}>
            {[
              { title: "Niche & Hard-to-Find Talent", desc: "Access active and passive candidate networks across specialized technical fields." },
              { title: "Time-Consuming Screening", desc: "Save internal HR bandwidth by reviewing only pre-vetted, interview-ready shortlists." },
              { title: "Skill Shortages & Scalability", desc: "Mobilize contract or permanent talent rapidly to meet project deadlines." },
              { title: "Cross-Border & Relocation", desc: "Seamless international recruitment and global talent acquisition capabilities." },
            ].map((c) => (
              <div key={c.title} className={styles.challengeCard}>
                <div className={styles.challengeBadge}>Problem &amp; Solution</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recruitment Process */}
      <section className={`section ${styles.sectionOffWhite}`}>
        <div className="container">
          <SectionHeader
            label="Methodology"
            title="Employer Recruitment Process"
            subtitle="A disciplined 7-step process engineered for precision and high retention."
            accent="blue"
            center
          />
          <div className={styles.processGrid}>
            {EMPLOYER_PROCESS.map((p) => (
              <div key={p.step} className={styles.processCard}>
                <div className={styles.processStepNum}>{p.step}</div>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Models */}
      <section className={`section ${styles.sectionWhite}`}>
        <div className="container">
          <SectionHeader
            label="Flexible Collaboration"
            title="Partnership Models"
            subtitle="Tailored engagement models to suit your organizational structure and hiring volume."
            accent="blue"
          />
          <div className={styles.modelsGrid}>
            {PARTNERSHIP_MODELS.map((m) => (
              <div key={m.title} className={styles.modelCard}>
                <h3>{m.title}</h3>
                <p className={styles.modelDesc}>{m.description}</p>
                <ul className={styles.modelFeatures}>
                  {m.features.map((f) => (
                    <li key={f}><CheckCircle size={16} className={styles.checkIcon} /> {f}</li>
                  ))}
                </ul>
                <Link href="/organizations/partner-with-us" className="btn btn-blue btn-sm" style={{ width: "100%", marginTop: "auto" }}>
                  Inquire Model
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Preview */}
      <section className={`section ${styles.sectionOffWhite}`}>
        <div className="container">
          <SectionHeader
            label="Proven Track Record"
            title="Employer Case Studies"
            subtitle="Measurable business impact delivered for our hiring partners."
            accent="blue"
          />
          <div className={styles.storiesGrid}>
            {employerStories.map((story) => (
              <div key={story.id} className={styles.storyCard}>
                <span className="tag tag-blue">{story.industry}</span>
                <h3>{story.title}</h3>
                <div className={styles.storyMetric}>{story.metric}</div>
                <p><strong>Challenge:</strong> {story.challenge}</p>
                <p><strong>Result:</strong> {story.result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Employer FAQ */}
      <section className={`section ${styles.sectionWhite}`}>
        <div className="container">
          <SectionHeader
            label="Client FAQ"
            title="Frequently Asked Questions by Employers"
            accent="blue"
            center
          />
          <div className={styles.faqList}>
            {EMPLOYER_FAQ.slice(0, 4).map((f) => (
              <div key={f.q} className={styles.faqBox}>
                <h3><HelpCircle size={18} className={styles.faqIcon} /> {f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
