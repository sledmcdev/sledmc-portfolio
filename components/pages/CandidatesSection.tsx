"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import {
  UserCheck,
  GraduationCap,
  Globe2,
  ShieldCheck,
  Briefcase,
  Truck,
  Building2,
  HeartHandshake,
  Package,
  Wrench,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  FileText,
  AlertTriangle,
  Send,
} from "lucide-react";
import styles from "@/app/candidates/Candidates.module.css";

import hero from "@/data/pages/candidates/hero.json";
import whyJoin from "@/data/pages/candidates/why-join.json";
import sectors from "@/data/pages/candidates/sectors.json";
import journey from "@/data/pages/candidates/journey.json";
import assessmentForm from "@/data/pages/candidates/assessment-form.json";
import safetyNotice from "@/data/pages/candidates/safety-notice.json";
import faq from "@/data/pages/candidates/faq.json";
import cta from "@/data/pages/candidates/cta.json";

const ICON_MAP: Record<string, React.ElementType> = {
  UserCheck,
  GraduationCap,
  Globe2,
  ShieldCheck,
  Briefcase,
  Truck,
  Building2,
  HeartHandshake,
  Package,
  Wrench,
  ArrowRight,
  CheckCircle2,
  FileText,
  AlertTriangle,
  Send,
};

function Icon({ name, ...props }: { name?: string; size?: number; className?: string }) {
  const Comp = name ? ICON_MAP[name] : undefined;
  return Comp ? <Comp {...props} /> : null;
}

type CtaButton = { label: string; href: string; variant: string; icon?: string };

function CtaLink({ btn }: { btn: CtaButton }) {
  const className = `btn btn-${btn.variant} btn-lg`;
  const content = (
    <>
      {btn.label} <Icon name={btn.icon} size={18} />
    </>
  );
  return btn.href.startsWith("#") ? (
    <a href={btn.href} className={className}>{content}</a>
  ) : (
    <Link href={btn.href} className={className}>{content}</Link>
  );
}

type FormField = {
  name: string;
  label: string;
  type: string;
  required: boolean;
  placeholder: string;
  options?: { value: string; label: string }[];
};

const FIELDS = assessmentForm.fields as FormField[];
const INITIAL_FORM: Record<string, string> = Object.fromEntries(FIELDS.map((f) => [f.name, ""]));

/** Replaces {key} tokens in a template with form values; keys in `emphasize` render in <strong>. */
function renderTemplate(template: string, values: Record<string, string>, emphasize: string[]) {
  return template.split(/\{(\w+)\}/g).map((part, i) => {
    if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>;
    const value = values[part] ?? "";
    return emphasize.includes(part) ? <strong key={i}>{value}</strong> : <Fragment key={i}>{value}</Fragment>;
  });
}

export default function CandidatesSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<Record<string, string>>(INITIAL_FORM);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitting(false);
    setSubmitted(true);
  };

  const { success } = assessmentForm;

  return (
    <main className={styles.page}>
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.badge}>
              <Icon name={hero.badge.icon} size={16} /> {hero.badge.label}
            </div>
            <h1 className={styles.heroTitle}>
              {hero.titleLine1} <br />
              <span className="gradient-text">{hero.titleHighlight}</span>
            </h1>
            <p className={styles.heroSubtitle}>{hero.subtitle}</p>
            <div className={styles.btnGroup}>
              {hero.buttons.map((btn) => (
                <CtaLink key={btn.label} btn={btn} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY JOIN SLEDMC */}
      <section id="why-join" className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>{whyJoin.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{whyJoin.title}</h2>
            <p className={styles.sectionDesc}>{whyJoin.description}</p>
          </div>

          <div className={styles.whyGrid}>
            {whyJoin.items.map((item, i) => (
              <div key={i} className={styles.whyCard}>
                <div className={styles.iconBox}>
                  <Icon name={item.icon} size={24} />
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAREER PATHWAYS */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>{sectors.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{sectors.title}</h2>
            <p className={styles.sectionDesc}>{sectors.description}</p>
          </div>

          <div className={styles.pathwayGrid}>
            {sectors.items.map((sector, i) => (
              <div key={i} className={styles.pathwayCard}>
                <h3 className={styles.pathwayTitle}>
                  <Icon name={sector.icon} size={20} className={styles.accentIcon} /> {sector.title}
                </h3>
                <div className={styles.pathwayTags}>
                  {sector.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11 STEP CANDIDATE JOURNEY */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>{journey.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{journey.title}</h2>
            <p className={styles.sectionDesc}>{journey.description}</p>
          </div>

          <div className={styles.timeline}>
            {journey.steps.map((s, i) => (
              <div key={i} className={styles.timelineStep}>
                <div className={styles.stepNum}>{s.step} {journey.stepSuffix}</div>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CANDIDATE ASSESSMENT / REGISTRATION FORM */}
      <section id="assessment-form" className={`${styles.section} ${styles.sectionDark}`}>
        <div className="container">
          <div className={`${styles.sectionHeader} ${styles.sectionHeaderCentered}`}>
            <span className={styles.eyebrow}>{assessmentForm.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{assessmentForm.title}</h2>
            <p className={styles.sectionDesc}>{assessmentForm.description}</p>
          </div>

          <div className={styles.formCard}>
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <div className={styles.formGrid}>
                  {FIELDS.map((field) => {
                    const id = `candidate-${field.name}`;
                    return (
                      <div key={field.name} className={styles.formGroup}>
                        <label htmlFor={id} className={styles.label}>{field.label}</label>
                        {field.type === "select" ? (
                          <select
                            id={id}
                            name={field.name}
                            required={field.required}
                            className={styles.select}
                            value={form[field.name]}
                            onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                          >
                            <option value="">{field.placeholder}</option>
                            {field.options?.map((opt) => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            id={id}
                            name={field.name}
                            type={field.type}
                            required={field.required}
                            placeholder={field.placeholder}
                            className={styles.input}
                            value={form[field.name]}
                            onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                <button
                  type="submit"
                  className={`btn btn-primary btn-lg ${styles.submitBtn}`}
                  disabled={submitting}
                  aria-busy={submitting}
                >
                  {assessmentForm.submit.label}{" "}
                  {submitting ? <span className="spinner" /> : <Icon name={assessmentForm.submit.icon} size={18} />}
                </button>
              </form>
            ) : (
              <div className={styles.successState}>
                <Icon name={success.icon} size={54} className={styles.successIcon} />
                <h3 className={styles.successTitle}>{success.title}</h3>
                <p className={styles.successMessage}>
                  {renderTemplate(success.message, form, success.emphasize)}
                </p>
                <button
                  onClick={() => {
                    setForm(INITIAL_FORM);
                    setSubmitted(false);
                  }}
                  className="btn btn-secondary btn-md"
                >
                  {success.resetLabel}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SAFETY & TRANSPARENCY NOTICE */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.safetyCard}>
            <div className={styles.safetyInner}>
              <Icon name={safetyNotice.icon} size={32} className={styles.safetyIcon} />
              <div>
                <h3 className={styles.safetyTitle}>{safetyNotice.title}</h3>
                <p className={styles.safetyIntro}>{safetyNotice.intro}</p>
                <ul className={styles.safetyList}>
                  {safetyNotice.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CANDIDATE FAQ */}
      <section id="faq" className={`${styles.section} ${styles.sectionDark}`}>
        <div className="container">
          <div className={`${styles.sectionHeader} ${styles.textCenter}`}>
            <span className={styles.eyebrow}>{faq.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{faq.title}</h2>
          </div>

          <div className={styles.faqList}>
            {faq.items.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className={styles.faqItem}>
                  <button
                    className={styles.faqQuestion}
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      size={18}
                      className={`${styles.faqChevron} ${isOpen ? styles.faqChevronOpen : ""}`}
                    />
                  </button>
                  {isOpen && <div className={styles.faqAnswer}>{item.a}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className={`${styles.section} ${styles.textCenter}`}>
        <div className="container">
          <span className={styles.eyebrow}>{cta.eyebrow}</span>
          <h2 className={`${styles.sectionTitle} ${styles.ctaTitle}`}>{cta.title}</h2>
          <p className={`${styles.sectionDesc} ${styles.ctaDesc}`}>{cta.description}</p>
          <div className={`${styles.btnGroup} ${styles.btnGroupCentered}`}>
            {cta.buttons.map((btn) => (
              <CtaLink key={btn.label} btn={btn} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
