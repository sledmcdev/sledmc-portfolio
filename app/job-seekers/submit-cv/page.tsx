"use client";
import { useState } from "react";
import { FileUp, CheckCircle2, Shield } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { INDUSTRIES } from "@/lib/data";
import styles from "./SubmitCv.module.css";

export default function SubmitCvPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={styles.page}>
      <section className={styles.headerSection}>
        <div className="container">
          <SectionHeader
            label="Direct Registration"
            title="Submit Your CV"
            subtitle="Let our specialist consultants connect you with opportunities that match your experience and career goals."
            accent="teal"
            center
            light
          />
        </div>
      </section>

      <section className="section bg-off-white">
        <div className="container-narrow">
          <div className={styles.formCard}>
            {submitted ? (
              <div className={styles.successState}>
                <CheckCircle2 size={64} className={styles.successIcon} />
                <h2>CV Submitted Successfully!</h2>
                <p>
                  Thank you for registering with SLEDMC Recruitment. Our recruitment consultants will review your profile and reach out within 2–3 business days regarding suitable vacancies.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn btn-teal">
                  Submit Another CV
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <h3 className={styles.formTitle}>Candidate Registration Form</h3>
                <p className={styles.formDesc}>Please fill in your details and attach your latest resume/CV.</p>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">First Name *</label>
                    <input type="text" className="form-input" required placeholder="Jane" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name *</label>
                    <input type="text" className="form-input" required placeholder="Doe" />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input type="email" className="form-input" required placeholder="jane@example.com" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input type="tel" className="form-input" required placeholder="+1 234 567 890" />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Primary Industry *</label>
                    <select className="form-select" required defaultValue="">
                      <option value="" disabled>Select your primary industry</option>
                      {INDUSTRIES.map((ind) => (
                        <option key={ind.name} value={ind.name}>{ind.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Experience Level *</label>
                    <select className="form-select" required defaultValue="">
                      <option value="" disabled>Select experience level</option>
                      <option value="entry">Entry Level (0 - 2 yrs)</option>
                      <option value="mid">Mid Level (3 - 5 yrs)</option>
                      <option value="senior">Senior Level (6 - 10 yrs)</option>
                      <option value="executive">Executive / Leadership (10+ yrs)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Upload CV / Resume (PDF, DOC, DOCX - Max 10MB) *</label>
                  <div className={styles.fileDrop}>
                    <FileUp size={32} className={styles.fileIcon} />
                    <span>Click to browse or drag and drop your file here</span>
                    <input type="file" required accept=".pdf,.doc,.docx" className={styles.fileInput} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Key Skills / Career Goals Summary</label>
                  <textarea className="form-textarea" placeholder="Describe your key technical skills, target roles, preferred locations, and salary expectations..."></textarea>
                </div>

                <div className={styles.privacyConsent}>
                  <Shield size={18} className={styles.shieldIcon} />
                  <p>
                    By submitting this form, you consent to SLEDMC Recruitment storing and processing your personal data strictly for recruitment purposes in accordance with our Privacy Policy.
                  </p>
                </div>

                <button type="submit" className="btn btn-teal btn-lg" style={{ width: "100%" }}>
                  Submit Your CV Now
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
