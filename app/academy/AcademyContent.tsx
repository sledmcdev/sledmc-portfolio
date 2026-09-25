"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
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
} from "lucide-react";
import styles from "./Academy.module.css";

import hero from "@/data/pages/academy/hero.json";
import philosophy from "@/data/pages/academy/philosophy.json";
import curriculum from "@/data/pages/academy/curriculum.json";
import flagship from "@/data/pages/academy/flagship.json";
import sectors from "@/data/pages/academy/sectors.json";
import assessment from "@/data/pages/academy/assessment.json";
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
};

function Icon({ name, size }: { name: string; size: number }) {
  const Comp = ICON_MAP[name];
  return Comp ? <Comp size={size} /> : null;
}

type ButtonLink = { label: string; href: string; variant: string; icon: string };

function btnClass(variant: string, size: "md" | "lg") {
  return `btn ${variant === "secondary" ? "btn-secondary" : "btn-primary"} btn-${size}`;
}

type Answers = Record<string, string>;

const EMPTY_ANSWERS: Answers = Object.fromEntries(assessment.steps.map((s) => [s.field, ""]));
const SUBMIT_DELAY_MS = 800;

export default function AcademyContent() {
  const [activeModule, setActiveModule] = useState(curriculum.modules[0].id);

  // Readiness Assessment Wizard state
  const totalSteps = assessment.steps.length;
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS);
  const [assessmentDone, setAssessmentDone] = useState(false);
  const [submittingOption, setSubmittingOption] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const handleSelectOption = (field: string, val: string) => {
    if (submittingOption) return;
    setAnswers((prev) => ({ ...prev, [field]: val }));
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Final answer: simulate an async submission so the loading state is visible.
      setSubmittingOption(val);
      timerRef.current = setTimeout(() => {
        setSubmittingOption(null);
        setAssessmentDone(true);
      }, SUBMIT_DELAY_MS);
    }
  };

  const resetAssessment = () => {
    setStep(1);
    setAnswers(EMPTY_ANSWERS);
    setSubmittingOption(null);
    setAssessmentDone(false);
  };

  const currentStep = assessment.steps[step - 1];
  const { result } = assessment;

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

          <div className={styles.moduleNav}>
            {curriculum.modules.map((mod) => (
              <button
                key={mod.id}
                className={`${styles.moduleTab} ${activeModule === mod.id ? styles.moduleTabActive : ""}`}
                onClick={() => setActiveModule(mod.id)}
                aria-pressed={activeModule === mod.id}
              >
                {mod.num}
                {curriculum.tabSeparator}
                {mod.title}
              </button>
            ))}
          </div>

          <div className={styles.moduleGrid}>
            {curriculum.modules
              .filter((m) => m.id === activeModule)
              .map((mod) => (
                <div key={mod.id} className={`${styles.moduleCard} ${styles.moduleCardFull}`}>
                  <span className={styles.moduleBadge}>{mod.num}</span>
                  <h3 className={styles.moduleTitle}>{mod.title}</h3>
                  <p className={styles.moduleDesc}>{mod.desc}</p>
                  <ul className={styles.moduleList}>
                    {mod.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
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
              <div className={styles.flagshipList}>
                {flagship.items.map((item) => (
                  <div key={item} className={styles.flagshipItem}>
                    <span className={styles.flagshipCheck}>
                      <Icon name={flagship.itemIcon} size={16} />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTOR ACADEMIES */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>{sectors.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{sectors.title}</h2>
            <p className={styles.sectionDesc}>{sectors.description}</p>
          </div>

          <div className={styles.philosophyGrid}>
            {sectors.sectors.map((sec) => (
              <div key={sec.title} className={styles.philosophyCard}>
                <div className={styles.iconBox}>
                  <Icon name={sec.icon} size={24} />
                </div>
                <h3 className={styles.cardTitle}>{sec.title}</h3>
                <p className={styles.cardText}>{sec.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CANDIDATE READINESS ASSESSMENT TOOL */}
      <section id="assessment" className={styles.section}>
        <div className="container">
          <div className={`${styles.sectionHeader} ${styles.sectionHeaderCentered}`}>
            <span className={styles.eyebrow}>{assessment.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{assessment.title}</h2>
            <p className={styles.sectionDesc}>{assessment.description}</p>
          </div>

          <div className={styles.assessmentCard} aria-live="polite">
            {!assessmentDone ? (
              <>
                <div className={styles.stepIndicator}>
                  {assessment.steps.map((_, i) => {
                    const s = i + 1;
                    return (
                      <div key={s} className={`${styles.stepDot} ${step >= s ? styles.stepDotActive : ""}`}>
                        {s}
                      </div>
                    );
                  })}
                </div>

                {currentStep && (
                  <div key={currentStep.field}>
                    <h3 className={styles.stepTitle}>{currentStep.title}</h3>
                    <p className={styles.stepQuestion}>{currentStep.question}</p>
                    <div className={styles.optionGrid}>
                      {currentStep.options.map((opt) => {
                        const busy = submittingOption === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            className={styles.optionBtn}
                            onClick={() => handleSelectOption(currentStep.field, opt)}
                            disabled={submittingOption !== null}
                            aria-busy={busy ? "true" : undefined}
                          >
                            {busy && <span className="spinner" aria-hidden="true" />}
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className={styles.result}>
                <div className={styles.resultIcon}>
                  <Icon name={result.icon} size={32} />
                </div>
                <h3 className={styles.resultTitle}>{result.title}</h3>
                <p className={styles.resultText}>
                  {result.messageBeforeSector}
                  <strong>{answers.sector}</strong>
                  {result.messageBeforeExperience}
                  <strong>{answers.experience}</strong>
                  {result.messageAfterExperience}
                </p>
                <div className={styles.resultActions}>
                  <Link href={result.primaryCta.href} className="btn btn-primary btn-md">
                    {result.primaryCta.label} <Icon name={result.primaryCta.icon} size={16} />
                  </Link>
                  <button type="button" onClick={resetAssessment} className="btn btn-secondary btn-md">
                    {result.resetLabel}
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
