"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, MapPin, Briefcase, Filter, X, ArrowRight, CheckCircle2 } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { FEATURED_JOBS, INDUSTRIES } from "@/lib/data";
import styles from "./FindJobs.module.css";

export default function FindJobsPage() {
  const [keyword, setKeyword] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedJob, setSelectedJob] = useState<typeof FEATURED_JOBS[0] | null>(null);
  const [applied, setApplied] = useState(false);

  const filteredJobs = FEATURED_JOBS.filter((j) => {
    const matchesKeyword =
      j.title.toLowerCase().includes(keyword.toLowerCase()) ||
      j.location.toLowerCase().includes(keyword.toLowerCase()) ||
      j.description.toLowerCase().includes(keyword.toLowerCase());
    const matchesIndustry = selectedIndustry === "All" || j.industry === selectedIndustry;
    const matchesType = selectedType === "All" || j.type === selectedType;
    return matchesKeyword && matchesIndustry && matchesType;
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplied(true);
    setTimeout(() => {
      setApplied(false);
      setSelectedJob(null);
    }, 2500);
  };

  return (
    <div className={styles.page}>
      {/* Search Header */}
      <section className={styles.headerSection}>
        <div className="container">
          <SectionHeader
            label="Job Search"
            title="Find Your Next Role"
            subtitle="Search through current openings across our partner network."
            accent="teal"
            center
            light
          />
          {/* Search Bar Container */}
          <div className={styles.searchBox}>
            <div className={styles.searchGroup}>
              <Search className={styles.searchIcon} size={20} />
              <input
                type="text"
                placeholder="Job title, keywords, or location..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            <div className={styles.filterGroup}>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className={styles.selectInput}
              >
                <option value="All">All Industries</option>
                {INDUSTRIES.map((ind) => (
                  <option key={ind.name} value={ind.name}>{ind.name}</option>
                ))}
              </select>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className={styles.selectInput}
              >
                <option value="All">All Job Types</option>
                <option value="Permanent">Permanent</option>
                <option value="Contract">Contract</option>
                <option value="Temporary">Temporary</option>
              </select>

              <button className="btn btn-teal">
                Search Jobs
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Results */}
      <section className="section bg-off-white">
        <div className="container">
          <div className={styles.resultsHeader}>
            <p className={styles.resultsCount}>
              Showing <strong>{filteredJobs.length}</strong> {filteredJobs.length === 1 ? "job" : "jobs"}
            </p>
            {(keyword || selectedIndustry !== "All" || selectedType !== "All") && (
              <button
                className={styles.resetBtn}
                onClick={() => {
                  setKeyword("");
                  setSelectedIndustry("All");
                  setSelectedType("All");
                }}
              >
                <X size={14} /> Clear Filters
              </button>
            )}
          </div>

          {filteredJobs.length > 0 ? (
            <div className={styles.jobsGrid}>
              {filteredJobs.map((job) => (
                <div key={job.id} className={styles.jobCard}>
                  <div className={styles.jobTop}>
                    <span className="tag tag-teal">{job.type}</span>
                    <span className="tag tag-navy">{job.industry}</span>
                  </div>
                  <h3 className={styles.jobTitle}>{job.title}</h3>
                  <div className={styles.jobDetails}>
                    <span><MapPin size={14} /> {job.location}</span>
                    <span><Briefcase size={14} /> {job.experience}</span>
                  </div>
                  <p className={styles.jobDesc}>{job.description}</p>
                  <div className={styles.jobFooter}>
                    <span className={styles.salary}>{job.salary}</span>
                    <button
                      className="btn btn-teal btn-sm"
                      onClick={() => setSelectedJob(job)}
                    >
                      View &amp; Apply <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <Search size={48} className={styles.emptyIcon} />
              <h3>No jobs found matching your criteria</h3>
              <p>Try searching for different keywords or clear your filters.</p>
              <button
                className="btn btn-outline"
                onClick={() => {
                  setKeyword("");
                  setSelectedIndustry("All");
                  setSelectedType("All");
                }}
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Job Details & Apply Modal */}
      {selectedJob && (
        <div className={styles.modalOverlay} onClick={() => setSelectedJob(null)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setSelectedJob(null)}>
              <X size={20} />
            </button>

            {applied ? (
              <div className={styles.successBox}>
                <CheckCircle2 size={56} className={styles.successIcon} />
                <h2>Application Submitted!</h2>
                <p>Thank you for applying to <strong>{selectedJob.title}</strong>. Our consultants will review your application and contact you soon.</p>
              </div>
            ) : (
              <>
                <div className={styles.modalHeader}>
                  <span className="tag tag-teal">{selectedJob.type}</span>
                  <h2>{selectedJob.title}</h2>
                  <div className={styles.modalMeta}>
                    <span>📍 {selectedJob.location}</span>
                    <span>💼 {selectedJob.experience}</span>
                    <span>🏷️ {selectedJob.industry}</span>
                  </div>
                </div>

                <div className={styles.modalBody}>
                  <h4>Job Description</h4>
                  <p>{selectedJob.description}</p>
                  <p>
                    In this role, you will collaborate with cross-functional teams, lead strategic initiatives, and drive quality outcomes in alignment with organizational objectives.
                  </p>

                  <hr className="divider" style={{ margin: "24px 0" }} />

                  <h4>Apply for this position</h4>
                  <form onSubmit={handleApplySubmit} className={styles.applyForm}>
                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">Full Name *</label>
                        <input type="text" className="form-input" required placeholder="John Doe" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Email Address *</label>
                        <input type="email" className="form-input" required placeholder="john@example.com" />
                      </div>
                    </div>
                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">Phone Number *</label>
                        <input type="tel" className="form-input" required placeholder="+1234567890" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Upload CV (PDF/DOCX) *</label>
                        <input type="file" className="form-input" required accept=".pdf,.doc,.docx" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Cover Note / Message</label>
                      <textarea className="form-textarea" placeholder="Briefly describe why you are a great fit for this role..."></textarea>
                    </div>
                    <button type="submit" className="btn btn-teal btn-lg" style={{ width: "100%" }}>
                      Submit Application
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
