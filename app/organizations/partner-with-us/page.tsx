"use client";
import { useState } from "react";
import { Building2, CheckCircle2, Shield } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { INDUSTRIES } from "@/lib/data";
import header from "@/data/pages/organizations/partner-with-us/header.json";
import form from "@/data/pages/organizations/partner-with-us/inquiry-form.json";
import success from "@/data/pages/organizations/partner-with-us/success.json";
import styles from "./PartnerWithUs.module.css";

const ICON_MAP: Record<string, React.ElementType> = { Building2, CheckCircle2, Shield };

const SIMULATED_SUBMIT_MS = 800;

export default function PartnerWithUsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const SuccessIcon = ICON_MAP[success.icon] ?? CheckCircle2;
  const PrivacyIcon = ICON_MAP[form.privacy.icon] ?? Shield;
  const { fields } = form;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, SIMULATED_SUBMIT_MS));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className={styles.page}>
      <section className={styles.headerSection}>
        <div className="container">
          <SectionHeader label={header.label} title={header.title} subtitle={header.subtitle} accent="blue" center light />
        </div>
      </section>

      <section className="section bg-off-white">
        <div className="container-narrow">
          <div className={styles.formCard}>
            {submitted ? (
              <div className={styles.successState}>
                <SuccessIcon size={64} className={styles.successIcon} />
                <h2>{success.title}</h2>
                <p>{success.message}</p>
                <button onClick={() => setSubmitted(false)} className="btn btn-blue">
                  {success.resetLabel}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form} aria-busy={submitting}>
                <h3 className={styles.formTitle}>{form.title}</h3>
                <p className={styles.formDesc}>{form.description}</p>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">{fields.companyName.label}</label>
                    <input type="text" className="form-input" required placeholder={fields.companyName.placeholder} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{fields.contactName.label}</label>
                    <input type="text" className="form-input" required placeholder={fields.contactName.placeholder} />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">{fields.email.label}</label>
                    <input type="email" className="form-input" required placeholder={fields.email.placeholder} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{fields.phone.label}</label>
                    <input type="tel" className="form-input" required placeholder={fields.phone.placeholder} />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">{fields.industry.label}</label>
                    <select className="form-select" required defaultValue="">
                      <option value="" disabled>
                        {fields.industry.placeholder}
                      </option>
                      {INDUSTRIES.map((ind) => (
                        <option key={ind.name} value={ind.name}>
                          {ind.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">{fields.positions.label}</label>
                    <select className="form-select" required defaultValue="">
                      <option value="" disabled>
                        {fields.positions.placeholder}
                      </option>
                      {fields.positions.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">{fields.model.label}</label>
                  <select className="form-select" defaultValue={fields.model.defaultValue}>
                    {fields.model.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">{fields.requirements.label}</label>
                  <textarea className="form-textarea" placeholder={fields.requirements.placeholder}></textarea>
                </div>

                <div className={styles.privacyConsent}>
                  <PrivacyIcon size={18} className={styles.shieldIcon} />
                  <p>{form.privacy.text}</p>
                </div>

                <button
                  type="submit"
                  className="btn btn-blue btn-lg"
                  style={{ width: "100%" }}
                  disabled={submitting}
                  aria-busy={submitting}
                >
                  {submitting && <span className="spinner" aria-hidden="true" />}
                  {form.submit.label}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
