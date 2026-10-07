"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Globe2,
  CheckCircle2,
  Award,
  Truck,
  ArrowRight,
  Building2,
  HeartHandshake,
  Wrench,
  Package,
  ShieldCheck,
  UserCheck,
  Sparkles,
  Compass,
  ArrowUpRight,
  Languages,
  Scale,
  FileCheck2,
  Briefcase,
  Wallet,
  PlaneTakeoff,
  Send,
  PhoneCall,
  MessagesSquare,
  ClipboardCheck,
} from "lucide-react";
import styles from "./Academy.module.css";
import Accordion from "@/components/shared/Accordion";
import SectorPathways from "@/components/shared/SectorPathways";
import LionMotif from "@/components/shared/LionMotif";
import { SECTOR_PATHWAYS } from "@/lib/data";

import hero from "@/data/pages/academy/hero.json";
import philosophy from "@/data/pages/academy/philosophy.json";
import curriculum from "@/data/pages/academy/curriculum.json";
import flagship from "@/data/pages/academy/flagship.json";
import admission from "@/data/pages/academy/admission-process.json";
import readinessProfile from "@/data/pages/academy/readiness-profile.json";
import finalCta from "@/data/pages/academy/final-cta.json";

const ICON_MAP: Record<string, React.ElementType> = {
  GraduationCap,
  Globe2,
  CheckCircle2,
  Award,
  Truck,
  ArrowRight,
  Building2,
  HeartHandshake,
  Wrench,
  Package,
  ShieldCheck,
  UserCheck,
  Sparkles,
  Compass,
  ArrowUpRight,
  Languages,
  Scale,
  FileCheck2,
  Briefcase,
  Wallet,
  PlaneTakeoff,
  Send,
  PhoneCall,
  MessagesSquare,
  ClipboardCheck,
};

function Icon({ name, size }: { name: string; size: number }) {
  const Comp = ICON_MAP[name];
  return Comp ? <Comp size={size} /> : null;
}

type ButtonLink = { label: string; href: string; variant: string; icon: string };

function btnClass(variant: string, size: "md" | "lg") {
  return `btn ${variant === "secondary" ? "btn-secondary" : "btn-primary"} btn-${size}`;
}

type InquiryField = {
  name: string;
  label: string;
  type: string;
  required: boolean;
  placeholder: string;
  options?: string[];
};

const INQUIRY_FIELDS = admission.form.fields as InquiryField[];
const EMPTY_INQUIRY: Record<string, string> = Object.fromEntries(INQUIRY_FIELDS.map((f) => [f.name, ""]));
const SUBMIT_DELAY_MS = 800;

export default function AcademyContent() {
  const [inquiry, setInquiry] = useState<Record<string, string>>(EMPTY_INQUIRY);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    // Simulated async submission until a real endpoint is wired up.
    await new Promise((resolve) => setTimeout(resolve, SUBMIT_DELAY_MS));
    setSubmitting(false);
    setSubmitted(true);
  };

  const setField = (name: string, value: string) => setInquiry((prev) => ({ ...prev, [name]: value }));
  const { form } = admission;

  return (
    <main className={styles.page}>
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <LionMotif width={440} opacity={0.08} className={styles.heroLion} />
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
              {(hero.buttons as ButtonLink[]).map((b) => (
                <a key={b.href} href={b.href} className={btnClass(b.variant, "lg")}>
                  {b.label} <Icon name={b.icon} size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ACADEMY PHILOSOPHY */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>{philosophy.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{philosophy.title}</h2>
            <p className={styles.sectionDesc}>{philosophy.description}</p>
          </div>

          <div className={styles.philosophyGrid}>
            {philosophy.pillars.map((p) => (
              <div key={p.title} className={styles.philosophyCard}>
                <div className={styles.iconBox}>
                  <Icon name={p.icon} size={24} />
                </div>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.cardText}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE CURRICULUM MODULES */}
      <section id="curriculum" className={`${styles.section} ${styles.sectionDark}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>{curriculum.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{curriculum.title}</h2>
            <p className={styles.sectionDesc}>{curriculum.description}</p>
          </div>

          <p className={styles.moduleHint}>
            <ArrowRight size={16} /> {curriculum.hint}
          </p>

          <Accordion
            columns={2}
            defaultOpenIds={[curriculum.modules[0].id]}
            items={curriculum.modules.map((mod) => ({
              id: mod.id,
              header: (
                <span className={styles.moduleHeader}>
                  <span className={styles.moduleIcon}>
                    <Icon name={mod.icon} size={22} />
                  </span>
                  <span className={styles.moduleHeading}>
                    <span className={styles.moduleBadge}>{mod.num}</span>
                    <span className={styles.moduleTitle}>{mod.title}</span>
                  </span>
                </span>
              ),
              content: (
                <>
                  <p className={styles.moduleDesc}>{mod.desc}</p>
                  <ul className={styles.moduleList}>
                    {mod.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              ),
            }))}
          />
        </div>
      </section>

      {/* FLAGSHIP PROGRAMME: PROFESSIONAL DRIVERS */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.flagshipBox}>
            <div>
              <div className={`${styles.badge} ${styles.flagshipBadge}`}>
                <Icon name={flagship.badge.icon} size={14} /> {flagship.badge.label}
              </div>
              <h2 className={styles.flagshipTitle}>{flagship.title}</h2>
              <p className={styles.flagshipText}>{flagship.description}</p>
              <div className={styles.flagshipCta}>
                <Link href={flagship.cta.href} className="btn btn-primary btn-md">
                  {flagship.cta.label} <Icon name={flagship.cta.icon} size={16} />
                </Link>
              </div>
            </div>

            <div>
              <ul className={styles.flagshipList}>
                {flagship.items.map((item) => (
                  <li key={item} className={styles.flagshipItem}>
                    <span className={styles.flagshipCheck}>
                      <Icon name={flagship.itemIcon} size={18} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTOR-SPECIFIC PATHWAYS */}
      <SectorPathways />

      {/* ADMISSION PROCESS: INQUIRY → CONTACT → INTERVIEW → MODULE PLAN */}
      <section id="inquiry" className={styles.section}>
        <div className="container">
          <div className={`${styles.sectionHeader} ${styles.sectionHeaderCentered}`}>
            <span className={styles.eyebrow}>{admission.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{admission.title}</h2>
            <p className={styles.sectionDesc}>{admission.description}</p>
          </div>

          <ol className={styles.pathSteps}>
            {admission.steps.map((step, i) => (
              <motion.li
                key={step.title}
                className={styles.pathStep}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className={styles.pathConnector} aria-hidden="true">
                  <motion.span
                    className={styles.pathConnectorFill}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
                  />
                </span>
                <span className={styles.pathIcon}>
                  <Icon name={step.icon} size={24} />
                  <span className={styles.pathNum}>{i + 1}</span>
                </span>
                <h3 className={styles.pathTitle}>{step.title}</h3>
                <p className={styles.pathDesc}>{step.desc}</p>
              </motion.li>
            ))}
          </ol>

          <div className={styles.inquiryCard} aria-live="polite">
            {!submitted ? (
              <form onSubmit={handleInquirySubmit} aria-busy={submitting}>
                <div className={styles.inquiryHead}>
                  <h3 className={styles.inquiryTitle}>{form.title}</h3>
                  <p className={styles.inquiryDesc}>{form.description}</p>
                </div>
                <div className={styles.inquiryGrid}>
                  {INQUIRY_FIELDS.map((field) => {
                    const id = `inquiry-${field.name}`;
                    const common = { id, name: field.name, required: field.required, value: inquiry[field.name] };
                    const options =
                      field.type === "sector" ? SECTOR_PATHWAYS.sectors.map((s) => s.title) : field.options ?? [];
                    return (
                      <div key={field.name} className={`form-group ${field.type === "textarea" ? styles.inquiryFull : ""}`}>
                        <label htmlFor={id} className="form-label">
                          {field.label}
                          {field.required && <span className={styles.required}> *</span>}
                        </label>
                        {field.type === "select" || field.type === "sector" ? (
                          <select {...common} className="form-select" onChange={(e) => setField(field.name, e.target.value)}>
                            <option value="">{field.placeholder}</option>
                            {options.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        ) : field.type === "textarea" ? (
                          <textarea
                            {...common}
                            className="form-textarea"
                            placeholder={field.placeholder}
                            onChange={(e) => setField(field.name, e.target.value)}
                          />
                        ) : (
                          <input
                            {...common}
                            type={field.type}
                            className="form-input"
                            placeholder={field.placeholder}
                            onChange={(e) => setField(field.name, e.target.value)}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
                <button
                  type="submit"
                  className={`btn btn-primary btn-lg ${styles.inquirySubmit}`}
                  disabled={submitting}
                  aria-busy={submitting}
                >
                  {form.submit.label}{" "}
                  {submitting ? <span className="spinner" aria-hidden="true" /> : <Icon name={form.submit.icon} size={18} />}
                </button>
              </form>
            ) : (
              <div className={styles.result}>
                <div className={styles.resultIcon}>
                  <Icon name={form.success.icon} size={32} />
                </div>
                <h3 className={styles.resultTitle}>{form.success.title}</h3>
                <p className={styles.resultText}>{form.success.message}</p>
                <div className={styles.resultActions}>
                  <button
                    type="button"
                    className="btn btn-secondary btn-md"
                    onClick={() => {
                      setInquiry(EMPTY_INQUIRY);
                      setSubmitted(false);
                    }}
                  >
                    {form.success.resetLabel}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* EUROPEAN READINESS PROFILE BREAKDOWN */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>{readinessProfile.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{readinessProfile.title}</h2>
            <p className={styles.sectionDesc}>{readinessProfile.description}</p>
          </div>

          <div className={styles.dashboardPreview}>
            {readinessProfile.widgets.map((w) => (
              <div key={w.label} className={styles.dashWidget}>
                <span className={styles.dashLabel}>{w.label}</span>
                <div className={styles.dashMetric}>{w.metric}</div>
                <p className={styles.dashDetail}>{w.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className={`${styles.section} ${styles.ctaSection}`}>
        <div className="container">
          <span className={styles.eyebrow}>{finalCta.eyebrow}</span>
          <h2 className={`${styles.sectionTitle} ${styles.ctaTitle}`}>{finalCta.title}</h2>
          <p className={`${styles.sectionDesc} ${styles.ctaDesc}`}>{finalCta.description}</p>
          <div className={`${styles.btnGroup} ${styles.btnGroupCentered}`}>
            {(finalCta.buttons as ButtonLink[]).map((b) => (
              <Link key={b.href} href={b.href} className={btnClass(b.variant, "lg")}>
                {b.label} <Icon name={b.icon} size={18} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
