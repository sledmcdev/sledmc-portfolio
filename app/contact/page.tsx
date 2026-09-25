"use client";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageSquare, CheckCircle2 } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import PlaceholderImage from "@/components/shared/PlaceholderImage";
import { COMPANY } from "@/lib/data";
import hero from "@/data/pages/contact/hero.json";
import office from "@/data/pages/contact/office-details.json";
import form from "@/data/pages/contact/form.json";
import styles from "./Contact.module.css";

const ICON_MAP: Record<string, React.ElementType> = { Phone, Mail, MapPin, Clock, MessageSquare };

type CompanyField = "address" | "phone" | "email" | "whatsapp" | "hours";

function buildHref(link: string | undefined, value: string): string | null {
  switch (link) {
    case "tel":
      return `tel:${value}`;
    case "mailto":
      return `mailto:${value}`;
    case "whatsapp":
      return `https://wa.me/${value.replace(/\D/g, "")}`;
    default:
      return null;
  }
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulated async submission until a real endpoint is wired up.
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className={styles.page}>
      <section className={styles.headerSection}>
        <div className="container">
          <SectionHeader label={hero.label} title={hero.title} subtitle={hero.subtitle} center light />
        </div>
      </section>

      <section className="section bg-off-white">
        <div className="container">
          <div className={styles.grid}>
            {/* Contact Information & Office Details */}
            <div className={styles.infoCol}>
              <div className="card" style={{ display: "flex", flexDirection: "column", gap: 24, padding: 36 }}>
                <h3 className={styles.colTitle}>{office.title}</h3>

                {office.items.map((item) => {
                  const Icon = ICON_MAP[item.icon];
                  const value = COMPANY[item.field as CompanyField];
                  const href = buildHref((item as { link?: string }).link, value);
                  return (
                    <div key={item.field} className={styles.infoItem}>
                      <div className={styles.iconWrap}>{Icon && <Icon size={20} />}</div>
                      <div>
                        <strong>{item.label}</strong>
                        <p>{href ? <a href={href}>{value}</a> : value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Map Placeholder */}
              <div className={styles.mapWrap}>
                <PlaceholderImage label={office.mapLabel} height={220} style={{ borderRadius: 16 }} />
              </div>
            </div>

            {/* General Inquiry Form */}
            <div className={styles.formCol}>
              <div className="card" style={{ padding: 40 }}>
                {submitted ? (
                  <div className={styles.successState} role="status">
                    <CheckCircle2 size={56} className={styles.successIcon} />
                    <h2>{form.success.title}</h2>
                    <p>{form.success.body}</p>
                    <button onClick={() => setSubmitted(false)} className="btn btn-outline">
                      {form.success.resetLabel}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className={styles.form} aria-busy={submitting}>
                    <h3 className={styles.formTitle}>{form.title}</h3>
                    <p className={styles.formDesc}>{form.description}</p>

                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-category">{form.category.label}</label>
                      <select id="contact-category" className="form-select" required defaultValue={form.category.defaultValue}>
                        {form.category.options.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label" htmlFor="contact-name">{form.fullName.label}</label>
                        <input id="contact-name" type="text" className="form-input" required placeholder={form.fullName.placeholder} />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="contact-email">{form.email.label}</label>
                        <input id="contact-email" type="email" className="form-input" required placeholder={form.email.placeholder} />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-subject">{form.subject.label}</label>
                      <input id="contact-subject" type="text" className="form-input" required placeholder={form.subject.placeholder} />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-message">{form.message.label}</label>
                      <textarea id="contact-message" className="form-textarea" required placeholder={form.message.placeholder}></textarea>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      style={{ width: "100%" }}
                      disabled={submitting}
                      aria-busy={submitting}
                    >
                      {submitting ? (
                        <>
                          <span className="spinner" aria-hidden="true" /> {form.submittingLabel}
                        </>
                      ) : (
                        form.submitLabel
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
