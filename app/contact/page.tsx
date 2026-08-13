"use client";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageSquare, CheckCircle2 } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import PlaceholderImage from "@/components/shared/PlaceholderImage";
import { COMPANY } from "@/lib/data";
import styles from "./Contact.module.css";

export default function ContactPage() {
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
            label="Get In Touch"
            title="Contact SLEDMC Recruitment"
            subtitle="We're here to answer your questions, whether you're looking for talent or your next career move."
            center
            light
          />
        </div>
      </section>

      <section className="section bg-off-white">
        <div className="container">
          <div className={styles.grid}>
            {/* Contact Information & Office Details */}
            <div className={styles.infoCol}>
              <div className="card" style={{ display: "flex", flexDirection: "column", gap: 24, padding: 36 }}>
                <h3 className={styles.colTitle}>Office Details</h3>

                <div className={styles.infoItem}>
                  <div className={styles.iconWrap}><MapPin size={20} /></div>
                  <div>
                    <strong>Head Office Address</strong>
                    <p>{COMPANY.address}</p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.iconWrap}><Phone size={20} /></div>
                  <div>
                    <strong>Phone Number</strong>
                    <p><a href={`tel:${COMPANY.phone}`}>{COMPANY.phone}</a></p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.iconWrap}><Mail size={20} /></div>
                  <div>
                    <strong>Email Address</strong>
                    <p><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.iconWrap}><MessageSquare size={20} /></div>
                  <div>
                    <strong>WhatsApp Business</strong>
                    <p><a href={`https://wa.me/${COMPANY.whatsapp.replace(/\D/g, "")}`}>{COMPANY.whatsapp}</a></p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.iconWrap}><Clock size={20} /></div>
                  <div>
                    <strong>Business Hours</strong>
                    <p>{COMPANY.hours}</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className={styles.mapWrap}>
                <PlaceholderImage label="Google Maps Location" height={220} style={{ borderRadius: 16 }} />
              </div>
            </div>

            {/* General Inquiry Form */}
            <div className={styles.formCol}>
              <div className="card" style={{ padding: 40 }}>
                {submitted ? (
                  <div className={styles.successState}>
                    <CheckCircle2 size={56} className={styles.successIcon} />
                    <h2>Message Sent!</h2>
                    <p>Thank you for reaching out. A representative from SLEDMC Recruitment will get back to you shortly.</p>
                    <button onClick={() => setSubmitted(false)} className="btn btn-outline">
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className={styles.form}>
                    <h3 className={styles.formTitle}>General Inquiry Form</h3>
                    <p className={styles.formDesc}>Select your inquiry category and send us a message.</p>

                    <div className="form-group">
                      <label className="form-label">I am a... *</label>
                      <select className="form-select" required defaultValue="candidate">
                        <option value="candidate">Job Seeker / Candidate</option>
                        <option value="employer">Organization / Employer</option>
                        <option value="general">General Partnership / Media</option>
                      </select>
                    </div>

                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">Full Name *</label>
                        <input type="text" className="form-input" required placeholder="Alex Morgan" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Email Address *</label>
                        <input type="email" className="form-input" required placeholder="alex@example.com" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Subject *</label>
                      <input type="text" className="form-input" required placeholder="Inquiry regarding recruitment services..." />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Your Message *</label>
                      <textarea className="form-textarea" required placeholder="How can we help you?"></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%" }}>
                      Send Message
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
