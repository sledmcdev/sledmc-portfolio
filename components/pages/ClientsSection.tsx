"use client";

import { Fragment, useState } from "react";
import {
  Building2,
  Users,
  CheckCircle2,
  Truck,
  HeartHandshake,
  Package,
  Wrench,
  Sparkles,
  ChevronDown,
  Send,
  GraduationCap,
} from "lucide-react";
import styles from "@/app/clients/Clients.module.css";

import hero from "@/data/pages/clients/hero.json";
import solutions from "@/data/pages/clients/solutions.json";
import sectors from "@/data/pages/clients/sectors.json";
import howItWorks from "@/data/pages/clients/how-it-works.json";
import academyBenefit from "@/data/pages/clients/academy-benefit.json";
import services from "@/data/pages/clients/services.json";
import requestForm from "@/data/pages/clients/request-form.json";
import partnerNetwork from "@/data/pages/clients/partner-network.json";
import faq from "@/data/pages/clients/faq.json";
import finalCta from "@/data/pages/clients/final-cta.json";

const ICON_MAP: Record<string, React.ElementType> = {
  Building2,
  Users,
  CheckCircle2,
  Truck,
  HeartHandshake,
  Package,
  Wrench,
  Sparkles,
  Send,
  GraduationCap,
};

function Icon({ name, ...props }: { name: string } & Record<string, unknown>) {
  const Comp = ICON_MAP[name];
  return Comp ? <Comp {...props} /> : null;
}

type CtaButton = { label: string; href: string; variant: string; icon: string };

function CtaButtons({ buttons, className }: { buttons: CtaButton[]; className: string }) {
  return (
    <div className={className}>
      {buttons.map((b) => (
        <a key={b.label} href={b.href} className={`btn btn-${b.variant} btn-lg`}>
          {b.label} <Icon name={b.icon} size={18} />
        </a>
      ))}
    </div>
  );
}

type FormState = Record<string, string>;

const SUBMIT_DELAY_MS = 800;

const initialFormState = (): FormState => {
  const state: FormState = {};
  requestForm.fields.forEach((f) => (state[f.name] = ""));
  state[requestForm.textarea.name] = "";
  return state;
};

/** Renders a "{token}" template, wrapping selected tokens in <strong>. */
function renderTemplate(template: string, values: FormState, boldTokens: string[]) {
  return template.split(/(\{\w+\})/g).map((part, i) => {
    const match = part.match(/^\{(\w+)\}$/);
    if (!match) return <Fragment key={i}>{part}</Fragment>;
    const value = values[match[1]] ?? "";
    return boldTokens.includes(match[1]) ? <strong key={i}>{value}</strong> : <Fragment key={i}>{value}</Fragment>;
  });
}

export default function ClientsSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<FormState>(initialFormState);

  const updateField = (name: string, value: string) => setForm((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, SUBMIT_DELAY_MS));
    setSubmitting(false);
    setSubmitted(true);
  };

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
              {hero.title} <br />
              <span className="gradient-text">{hero.titleHighlight}</span>
            </h1>
            <p className={styles.heroSubtitle}>{hero.subtitle}</p>
            <CtaButtons buttons={hero.buttons} className={styles.btnGroup} />
          </div>
        </div>
      </section>

      {/* THE SLEDMC WORKFORCE SOLUTION */}
      <section id="solutions" className={styles.section}>
        <div className="container">
          <div className={`${styles.sectionHeader} ${styles.sectionHeaderCentered}`}>
            <span className={styles.eyebrow}>{solutions.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{solutions.title}</h2>
            <p className={styles.sectionDesc}>{solutions.description}</p>
          </div>

          <div className={styles.solutionPipeline}>
            {solutions.steps.map((step, i) => (
              <div key={step} className={styles.pipeItem}>
                <div className={styles.pipeStep}>
                  <Icon name={solutions.stepIcon} size={16} color="var(--amber)" /> {step}
                </div>
                {i < solutions.steps.length - 1 && (
                  <span className={styles.pipeArrow} aria-hidden="true">
                    {solutions.arrow}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKFORCE SECTORS */}
      <section id="sectors" className={`${styles.section} ${styles.sectionDark}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>{sectors.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{sectors.title}</h2>
            <p className={styles.sectionDesc}>{sectors.description}</p>
          </div>

          <div className={styles.sectorGrid}>
            {sectors.items.map((sec) => (
              <div key={sec.title} className={styles.sectorCard}>
                <h3 className={styles.sectorTitle}>
                  <Icon name={sec.icon} color="var(--amber)" size={22} /> {sec.title}
                </h3>
                <ul className={styles.sectorList}>
                  {sec.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW SLEDMC WORKS */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>{howItWorks.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{howItWorks.title}</h2>
            <p className={styles.sectionDesc}>{howItWorks.description}</p>
          </div>

          <div className={styles.worksGrid}>
            {howItWorks.steps.map((w) => (
              <div key={w.num} className={styles.worksCard}>
                <div className={styles.worksNum}>{w.num}</div>
                <h3 className={styles.worksTitle}>{w.title}</h3>
                <p className={styles.worksDesc}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SLEDMC ACADEMY - EMPLOYER BENEFIT */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className="container">
          <div className={styles.benefitBox}>
            <div className={`${styles.badge} ${styles.badgeTight}`}>
              <Icon name={academyBenefit.badge.icon} size={16} /> {academyBenefit.badge.label}
            </div>
            <h2 className={styles.benefitTitle}>{academyBenefit.title}</h2>
            <p className={styles.benefitDesc}>
              {academyBenefit.description.before}
              <strong>{academyBenefit.description.emphasis}</strong>
              {academyBenefit.description.after}
            </p>
            <div className={styles.benefitGrid}>
              {academyBenefit.items.map((item) => (
                <div key={item.title} className={styles.benefitItem}>
                  <Icon name={academyBenefit.itemIcon} color="var(--amber)" size={20} className={styles.benefitIcon} />
                  <h4 className={styles.benefitItemTitle}>{item.title}</h4>
                  <p className={styles.benefitItemDesc}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EMPLOYER SERVICES */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>{services.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{services.title}</h2>
          </div>

          <div className={styles.servicesGrid}>
            {services.items.map((serv) => (
              <div key={serv} className={styles.serviceCard}>
                <Icon name={services.itemIcon} size={24} color="var(--amber)" className={styles.serviceIcon} />
                <h3 className={styles.serviceTitle}>{serv}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REQUEST WORKFORCE FORM */}
      <section id="request-form" className={`${styles.section} ${styles.sectionDark}`}>
        <div className="container">
          <div className={`${styles.sectionHeader} ${styles.sectionHeaderCentered}`}>
            <span className={styles.eyebrow}>{requestForm.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{requestForm.title}</h2>
            <p className={styles.sectionDesc}>{requestForm.description}</p>
          </div>

          <div className={styles.formCard}>
            {!submitted ? (
              <form onSubmit={handleSubmit} aria-busy={submitting}>
                <div className={styles.formGrid}>
                  {requestForm.fields.map((field) => {
                    const id = `client-${field.name}`;
                    return (
                      <div key={field.name} className={styles.formGroup}>
                        <label htmlFor={id} className={styles.label}>
                          {field.label}
                        </label>
                        {field.type === "select" ? (
                          <select
                            id={id}
                            required={field.required}
                            className={styles.select}
                            value={form[field.name]}
                            onChange={(e) => updateField(field.name, e.target.value)}
                          >
                            <option value="">{field.placeholder}</option>
                            {(field.options ?? []).map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            id={id}
                            type={field.type}
                            required={field.required}
                            placeholder={field.placeholder || undefined}
                            className={styles.input}
                            value={form[field.name]}
                            onChange={(e) => updateField(field.name, e.target.value)}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className={`${styles.formGroup} ${styles.formGroupSpaced}`}>
                  <label htmlFor={`client-${requestForm.textarea.name}`} className={styles.label}>
                    {requestForm.textarea.label}
                  </label>
                  <textarea
                    id={`client-${requestForm.textarea.name}`}
                    rows={requestForm.textarea.rows}
                    placeholder={requestForm.textarea.placeholder}
                    className={styles.textarea}
                    value={form[requestForm.textarea.name]}
                    onChange={(e) => updateField(requestForm.textarea.name, e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className={`btn btn-primary btn-lg ${styles.submitBtn}`}
                  disabled={submitting}
                  aria-busy={submitting}
                >
                  {submitting ? (
                    <>
                      <span className="spinner" /> {requestForm.submit.submittingLabel}
                    </>
                  ) : (
                    <>
                      {requestForm.submit.label} <Icon name={requestForm.submit.icon} size={18} />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className={styles.successBox} role="status" aria-live="polite">
                <Icon name={requestForm.success.icon} size={54} color="var(--amber)" className={styles.successIcon} />
                <h3 className={styles.successTitle}>{requestForm.success.title}</h3>
                <p className={styles.successText}>
                  {renderTemplate(requestForm.success.message, form, requestForm.success.boldTokens)}
                </p>
                <button
                  onClick={() => {
                    setForm(initialFormState());
                    setSubmitted(false);
                  }}
                  className="btn btn-secondary btn-md"
                >
                  {requestForm.success.resetLabel}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* EUROPEAN PARTNER NETWORK */}
      <section id="partner-network" className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>{partnerNetwork.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{partnerNetwork.title}</h2>
            <p className={styles.sectionDesc}>{partnerNetwork.description}</p>
          </div>

          <div className={styles.partnerGrid}>
            {partnerNetwork.items.map((p) => (
              <div key={p.title} className={styles.sectorCard}>
                <h4 className={styles.partnerTitle}>{p.title}</h4>
                <p className={styles.partnerDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMPLOYER FAQ */}
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
                <div key={item.q} className={styles.faqItem}>
                  <button
                    className={styles.faqQuestion}
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.q}</span>
                    <ChevronDown size={18} className={`${styles.faqChevron} ${isOpen ? styles.faqChevronOpen : ""}`} />
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
          <span className={styles.eyebrow}>{finalCta.eyebrow}</span>
          <h2 className={`${styles.sectionTitle} ${styles.ctaTitle}`}>{finalCta.title}</h2>
          <p className={`${styles.sectionDesc} ${styles.ctaDesc}`}>{finalCta.description}</p>
          <CtaButtons buttons={finalCta.buttons} className={`${styles.btnGroup} ${styles.btnGroupCentered}`} />
        </div>
      </section>
    </main>
  );
}
