"use client";
import { useEffect, useRef, useState } from "react";
import { Search, MapPin, Briefcase, X, ArrowRight, CheckCircle2 } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import Skeleton from "@/components/shared/Skeleton";
import { FEATURED_JOBS, INDUSTRIES } from "@/lib/data";
import hero from "@/data/pages/job-seekers/find-jobs/hero.json";
import filters from "@/data/pages/job-seekers/find-jobs/filters.json";
import results from "@/data/pages/job-seekers/find-jobs/results.json";
import modal from "@/data/pages/job-seekers/find-jobs/apply-modal.json";
import styles from "./FindJobs.module.css";

const SEARCH_DEBOUNCE_MS = 300;
const SUBMIT_DELAY_MS = 800;
const ALL = filters.allValue;

export default function FindJobsPage() {
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState(ALL);
  const [selectedType, setSelectedType] = useState(ALL);
  const [selectedJob, setSelectedJob] = useState<typeof FEATURED_JOBS[0] | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [applied, setApplied] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Debounce keyword typing so results don't thrash on every keystroke.
  useEffect(() => {
    const t = setTimeout(() => setDebouncedKeyword(keyword), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [keyword]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const isSearching = keyword !== debouncedKeyword;
  const kw = debouncedKeyword.toLowerCase();

  const filteredJobs = FEATURED_JOBS.filter((j) => {
    const matchesKeyword =
      j.title.toLowerCase().includes(kw) ||
      j.location.toLowerCase().includes(kw) ||
      j.description.toLowerCase().includes(kw);
    const matchesIndustry = selectedIndustry === ALL || j.industry === selectedIndustry;
    const matchesType = selectedType === ALL || j.type === selectedType;
    return matchesKeyword && matchesIndustry && matchesType;
  });

  const clearFilters = () => {
    setKeyword("");
    setDebouncedKeyword("");
    setSelectedIndustry(ALL);
    setSelectedType(ALL);
  };

  const closeModal = () => {
    if (submitting) return;
    setSelectedJob(null);
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    timers.current.push(
      setTimeout(() => {
        setSubmitting(false);
        setApplied(true);
        timers.current.push(
          setTimeout(() => {
            setApplied(false);
            setSelectedJob(null);
          }, 2500)
        );
      }, SUBMIT_DELAY_MS)
    );
  };

  const { fields } = modal;

  return (
    <div className={styles.page}>
      {/* Search Header */}
      <section className={styles.headerSection}>
        <div className="container">
          <SectionHeader label={hero.label} title={hero.title} subtitle={hero.subtitle} accent="teal" center light />
          {/* Search Bar Container */}
          <div className={styles.searchBox}>
            <div className={styles.searchGroup}>
              <Search className={styles.searchIcon} size={20} />
              <input
                type="text"
                placeholder={filters.searchPlaceholder}
                aria-label={filters.searchPlaceholder}
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
                aria-label={filters.allIndustriesLabel}
              >
                <option value={ALL}>{filters.allIndustriesLabel}</option>
                {INDUSTRIES.map((ind) => (
                  <option key={ind.name} value={ind.name}>{ind.name}</option>
                ))}
              </select>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className={styles.selectInput}
                aria-label={filters.allTypesLabel}
              >
                <option value={ALL}>{filters.allTypesLabel}</option>
                {filters.jobTypes.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>

              <button className="btn btn-teal" onClick={() => setDebouncedKeyword(keyword)}>
                {filters.searchButtonLabel}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Results */}
      <section className="section bg-off-white">
        <div className="container">
          <div className={styles.resultsHeader}>
            <p className={styles.resultsCount} aria-live="polite">
              {results.countPrefix} <strong>{filteredJobs.length}</strong>{" "}
              {filteredJobs.length === 1 ? results.jobSingular : results.jobPlural}
            </p>
            {(keyword || selectedIndustry !== ALL || selectedType !== ALL) && (
              <button className={styles.resetBtn} onClick={clearFilters}>
                <X size={14} /> {results.clearFiltersLabel}
              </button>
            )}
          </div>

          {isSearching ? (
            <div className={styles.jobsGrid} role="status" aria-busy="true" aria-label={results.loadingLabel}>
              {Array.from({ length: Math.max(2, Math.min(filteredJobs.length, 4)) }).map((_, i) => (
                <div key={i} className={styles.jobCard}>
                  <div className={styles.jobTop}>
                    <Skeleton width={84} height={22} />
                    <Skeleton width={120} height={22} />
                  </div>
                  <Skeleton width="65%" height={26} />
                  <Skeleton width="45%" height={14} />
                  <Skeleton height={14} />
                  <Skeleton width="85%" height={14} />
                  <div className={styles.jobFooter}>
                    <Skeleton width={90} height={16} />
                    <Skeleton width={120} height={34} />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredJobs.length > 0 ? (
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
                    <button className="btn btn-teal btn-sm" onClick={() => setSelectedJob(job)}>
                      {results.viewApplyLabel} <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <Search size={48} className={styles.emptyIcon} />
              <h3>{results.emptyState.title}</h3>
              <p>{results.emptyState.description}</p>
              <button className="btn btn-outline" onClick={clearFilters}>
                {results.emptyState.buttonLabel}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Job Details & Apply Modal */}
      {selectedJob && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={selectedJob.title}>
            <button className={styles.closeBtn} onClick={closeModal} aria-label={modal.closeAriaLabel}>
              <X size={20} />
            </button>

            {applied ? (
              <div className={styles.successBox}>
                <CheckCircle2 size={56} className={styles.successIcon} />
                <h2>{modal.success.title}</h2>
                <p>
                  {modal.success.messageBefore}
                  <strong>{selectedJob.title}</strong>
                  {modal.success.messageAfter}
                </p>
              </div>
            ) : (
              <>
                <div className={styles.modalHeader}>
                  <span className="tag tag-teal">{selectedJob.type}</span>
                  <h2>{selectedJob.title}</h2>
                  <div className={styles.modalMeta}>
                    <span>{modal.metaIcons.location} {selectedJob.location}</span>
                    <span>{modal.metaIcons.experience} {selectedJob.experience}</span>
                    <span>{modal.metaIcons.industry} {selectedJob.industry}</span>
                  </div>
                </div>

                <div className={styles.modalBody}>
                  <h4>{modal.descriptionHeading}</h4>
                  <p>{selectedJob.description}</p>
                  <p>{modal.extraParagraph}</p>

                  <hr className="divider" style={{ margin: "24px 0" }} />

                  <h4>{modal.applyHeading}</h4>
                  <form onSubmit={handleApplySubmit} className={styles.applyForm}>
                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label" htmlFor="apply-name">{fields.fullName.label}</label>
                        <input id="apply-name" type="text" className="form-input" required placeholder={fields.fullName.placeholder} />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="apply-email">{fields.email.label}</label>
                        <input id="apply-email" type="email" className="form-input" required placeholder={fields.email.placeholder} />
                      </div>
                    </div>
                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label" htmlFor="apply-phone">{fields.phone.label}</label>
                        <input id="apply-phone" type="tel" className="form-input" required placeholder={fields.phone.placeholder} />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="apply-cv">{fields.cv.label}</label>
                        <input id="apply-cv" type="file" className="form-input" required accept={fields.cv.accept} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="apply-message">{fields.message.label}</label>
                      <textarea id="apply-message" className="form-textarea" placeholder={fields.message.placeholder}></textarea>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-teal btn-lg"
                      style={{ width: "100%" }}
                      disabled={submitting}
                      aria-busy={submitting ? "true" : undefined}
                    >
                      {submitting ? (
                        <>
                          <span className="spinner" /> {modal.submittingLabel}
                        </>
                      ) : (
                        modal.submitLabel
                      )}
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
