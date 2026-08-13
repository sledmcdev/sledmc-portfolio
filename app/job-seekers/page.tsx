import Link from "next/link";
import { ArrowRight, Search, FileUp, ShieldCheck, CheckCircle2, ChevronRight, HelpCircle } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import PlaceholderImage from "@/components/shared/PlaceholderImage";
import { FEATURED_JOBS, CANDIDATE_SERVICES, CANDIDATE_PROCESS, CANDIDATE_FAQ, CAREER_RESOURCES } from "@/lib/data";
import styles from "./JobSeekers.module.css";

export const metadata = {
  title: "Job Seekers Hub | Discover Opportunities & Advance Your Career",
  description: "Find your next career opportunity with SLEDMC Recruitment. Explore jobs, submit your CV, and receive specialist career support.",
};

export default function JobSeekersPage() {
  return (
    <div className={styles.page}>
      {/* Candidate Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroText}>
              <span className="tag tag-teal" style={{ marginBottom: 16 }}>For Candidates</span>
              <h1 className={styles.heroTitle}>Your Next Opportunity Starts Here</h1>
              <p className={styles.heroDesc}>
                Whether you&apos;re taking the next step in your career, changing industries, or seeking international placements, SLEDMC Recruitment connects you with top employers.
              </p>
              <div className={styles.heroCtas}>
                <Link href="/job-seekers/find-jobs" className="btn btn-teal btn-lg">
                  <Search size={18} /> Browse Jobs
                </Link>
                <Link href="/job-seekers/submit-cv" className="btn btn-secondary btn-lg">
                  <FileUp size={18} /> Submit Your CV
                </Link>
              </div>
            </div>
            <div className={styles.heroVisual}>
              <PlaceholderImage label="Candidate Professional / Interview Image" height={420} style={{ borderRadius: 24 }} />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Preview */}
      <section className={`section ${styles.sectionWhite}`}>
        <div className="container">
          <SectionHeader
            label="Current Vacancies"
            title="Featured Job Opportunities"
            subtitle="Explore our latest open positions across leading organizations."
            accent="teal"
          />
          <div className={styles.jobsGrid}>
            {FEATURED_JOBS.slice(0, 4).map((job) => (
              <div key={job.id} className={styles.jobCard}>
                <div className={styles.jobHeader}>
                  <span className="tag tag-teal">{job.type}</span>
                  <span className={styles.jobIndustry}>{job.industry}</span>
                </div>
                <h3 className={styles.jobTitle}>{job.title}</h3>
                <div className={styles.jobMeta}>
                  <span>📍 {job.location}</span>
                  <span>💼 {job.experience}</span>
                </div>
                <p className={styles.jobDesc}>{job.description}</p>
                <div className={styles.jobFooter}>
                  <span className={styles.jobSalary}>{job.salary}</span>
                  <Link href="/job-seekers/find-jobs" className="btn btn-teal btn-sm">
                    Apply Now <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.centerBtn}>
            <Link href="/job-seekers/find-jobs" className="btn btn-outline btn-lg">
              View All Jobs <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Candidate Process */}
      <section className={`section ${styles.sectionOffWhite}`}>
        <div className="container">
          <SectionHeader
            label="Candidate Journey"
            title="How We Support Your Career"
            subtitle="From CV submission to onboarding, our recruitment consultants guide you at every stage."
            accent="teal"
            center
          />
          <div className={styles.processGrid}>
            {CANDIDATE_PROCESS.map((p) => (
              <div key={p.step} className={styles.processCard}>
                <div className={styles.processStepNum}>{p.step}</div>
                <h3 className={styles.processTitle}>{p.title}</h3>
                <p className={styles.processDesc}>{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Candidate Services */}
      <section className={`section ${styles.sectionWhite}`}>
        <div className="container">
          <SectionHeader
            label="Our Support"
            title="Candidate Services"
            subtitle="Beyond job matching — comprehensive career advice and coaching."
            accent="teal"
          />
          <div className={styles.servicesGrid}>
            {CANDIDATE_SERVICES.map((s) => (
              <div key={s.title} className={styles.serviceCard}>
                <div className={styles.serviceIcon}>✓</div>
                <div>
                  <h3 className={styles.serviceTitle}>{s.title}</h3>
                  <p className={styles.serviceDesc}>{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Resources Teaser */}
      <section className={`section ${styles.sectionOffWhite}`}>
        <div className="container">
          <SectionHeader
            label="Career Advice"
            title="Resources for Job Seekers"
            subtitle="Expert tips on CV writing, interview preparation, and salary benchmarks."
            accent="teal"
          />
          <div className={styles.resourcesGrid}>
            {CAREER_RESOURCES.slice(0, 3).map((r) => (
              <div key={r.title} className={styles.resourceCard}>
                <span className="tag tag-teal">{r.category}</span>
                <h3 className={styles.resourceTitle}>{r.title}</h3>
                <p className={styles.resourceDesc}>{r.description}</p>
                <div className={styles.resourceFooter}>
                  <span className={styles.readTime}>{r.readTime}</span>
                  <Link href="/job-seekers/career-resources" className={styles.readLink}>
                    Read Article <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className={`section ${styles.sectionWhite}`}>
        <div className="container">
          <SectionHeader
            label="Help &amp; Support"
            title="Candidate Frequently Asked Questions"
            accent="teal"
            center
          />
          <div className={styles.faqList}>
            {CANDIDATE_FAQ.slice(0, 4).map((f) => (
              <div key={f.q} className={styles.faqBox}>
                <h3 className={styles.faqQ}><HelpCircle size={18} className={styles.faqIcon} /> {f.q}</h3>
                <p className={styles.faqA}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
