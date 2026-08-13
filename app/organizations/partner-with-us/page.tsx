"use client";
import { useState } from "react";
import { Building2, CheckCircle2, Shield } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { INDUSTRIES } from "@/lib/data";
import styles from "./PartnerWithUs.module.css";

export default function PartnerWithUsPage() {
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
            label="Employer Inquiry"
            title="Partner With Us"
            subtitle="Tell us about your recruitment requirements and our senior consultants will create a custom sourcing strategy."
            accent="blue"
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
                <h2>Partnership Request Received!</h2>
                <p>
                  Thank you for reaching out to SLEDMC Recruitment. One of our dedicated account managers will contact you within 24 hours to discuss your hiring requirements.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn btn-blue">
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <h3 className={styles.formTitle}>Client Partnership Inquiry</h3>
                <p className={styles.formDesc}>Provide your details and position specifications below.</p>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Company Name *</label>
                    <input type="text" className="form-input" required placeholder="Acme Corporation" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Contact Person Name *</label>
                    <input type="text" className="form-input" required placeholder="John Smith" />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Work Email Address *</label>
                    <input type="email" className="form-input" required placeholder="john.smith@acme.com" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input type="tel" className="form-input" required placeholder="+1 234 567 890" />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Industry *</label>
                    <select className="form-select" required defaultValue="">
                      <option value="" disabled>Select company industry</option>
                      {INDUSTRIES.map((ind) => (
                        <option key={ind.name} value={ind.name}>{ind.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Number of Positions *</label>
                    <select className="form-select" required defaultValue="">
                      <option value="" disabled>Select hiring volume</option>
                      <option value="1-2">1 - 2 Key Roles</option>
                      <option value="3-5">3 - 5 Roles</option>
                      <option value="6-10">6 - 10 Roles</option>
                      <option value="10+">10+ Volume Campaign</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Service / Partnership Model Interested In</label>
                  <select className="form-select" defaultValue="permanent">
                    <option value="permanent">Permanent Recruitment</option>
                    <option value="executive">Executive Search</option>
                    <option value="contract">Contract Staffing</option>
                    <option value="volume">Volume Hiring</option>
                    <option value="rpo">RPO (Managed Services)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Recruitment Requirements &amp; Job Description</label>
                  <textarea className="form-textarea" placeholder="Please detail the job titles, required skillsets, location, target start date, and budget details..."></textarea>
                </div>

                <div className={styles.privacyConsent}>
                  <Shield size={18} className={styles.shieldIcon} />
                  <p>
                    Your business inquiry is treated with strict confidentiality. We do not share corporate data with third parties.
                  </p>
                </div>

                <button type="submit" className="btn btn-blue btn-lg" style={{ width: "100%" }}>
                  Talk to Our Recruitment Team
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
