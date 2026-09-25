"use client";
import { useEffect, useRef, useState } from "react";
import { FileUp, CheckCircle2, Shield } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { INDUSTRIES } from "@/lib/data";
import hero from "@/data/pages/job-seekers/submit-cv/hero.json";
import form from "@/data/pages/job-seekers/submit-cv/form.json";
import success from "@/data/pages/job-seekers/submit-cv/success.json";
import styles from "./SubmitCv.module.css";

const ICON_MAP: Record<string, React.ElementType> = { FileUp, CheckCircle2, Shield };
const SUBMIT_DELAY_MS = 800;

export default function SubmitCvPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    timer.current = setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, SUBMIT_DELAY_MS);
  };

  const { fields } = form;
  const FileIcon = ICON_MAP[fields.cv.icon] ?? FileUp;
  const PrivacyIcon = ICON_MAP[form.privacy.icon] ?? Shield;
  const SuccessIcon = ICON_MAP[success.icon] ?? CheckCircle2;

  return (
    <div className={styles.page}>
      <section className={styles.headerSection}>
        <div className="container">
          <SectionHeader label={hero.label} title={hero.title} subtitle={hero.subtitle} accent="teal" center light />
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
                <button onClick={() => setSubmitted(false)} className="btn btn-teal">
                  {success.resetLabel}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <h3 className={styles.formTitle}>{form.title}</h3>
                <p className={styles.formDesc}>{form.description}</p>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="cv-first-name">{fields.firstName.label}</label>
                    <input id="cv-first-name" type="text" className="form-input" required placeholder={fields.firstName.placeholder} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="cv-last-name">{fields.lastName.label}</label>
                    <input id="cv-last-name" type="text" className="form-input" required placeholder={fields.lastName.placeholder} />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="cv-email">{fields.email.label}</label>
                    <input id="cv-email" type="email" className="form-input" required placeholder={fields.email.placeholder} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="cv-phone">{fields.phone.label}</label>
                    <input id="cv-phone" type="tel" className="form-input" required placeholder={fields.phone.placeholder} />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="cv-industry">{fields.industry.label}</label>
                    <select id="cv-industry" className="form-select" required defaultValue="">
                      <option value="" disabled>{fields.industry.placeholder}</option>
                      {INDUSTRIES.map((ind) => (
                        <option key={ind.name} value={ind.name}>{ind.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="cv-experience">{fields.experience.label}</label>
                    <select id="cv-experience" className="form-select" required defaultValue="">
                      <option value="" disabled>{fields.experience.placeholder}</option>
                      {fields.experience.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="cv-file">{fields.cv.label}</label>
                  <div className={styles.fileDrop}>
                    <FileIcon size={32} className={styles.fileIcon} />
                    <span>{fields.cv.dropText}</span>
                    <input id="cv-file" type="file" required accept={fields.cv.accept} className={styles.fileInput} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="cv-summary">{fields.summary.label}</label>
                  <textarea id="cv-summary" className="form-textarea" placeholder={fields.summary.placeholder}></textarea>
                </div>

                <div className={styles.privacyConsent}>
                  <PrivacyIcon size={18} className={styles.shieldIcon} />
                  <p>{form.privacy.text}</p>
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
                      <span className="spinner" /> {form.submittingLabel}
                    </>
                  ) : (
                    form.submitLabel
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
