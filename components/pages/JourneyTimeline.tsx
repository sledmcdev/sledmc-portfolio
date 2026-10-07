"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Compass,
  FileCheck2,
  GraduationCap,
  Handshake,
  Languages,
  PlaneLanding,
  PlaneTakeoff,
  UserPlus,
  Video,
} from "lucide-react";
import journey from "@/data/pages/candidates/journey.json";
import styles from "./JourneyTimeline.module.css";

const ICONS: Record<string, React.ElementType> = {
  BadgeCheck,
  ClipboardCheck,
  Compass,
  FileCheck2,
  GraduationCap,
  Handshake,
  Languages,
  PlaneLanding,
  PlaneTakeoff,
  UserPlus,
  Video,
};

/** First/last step index (0-based) of each phase, for the phase brackets above the line. */
const PHASE_SPANS = journey.phases.map((phase) => {
  const idx = journey.steps.flatMap((s, i) => (s.phase === phase.id ? [i] : []));
  return { ...phase, start: idx[0], end: idx[idx.length - 1] };
});

/** Horizontal journey timeline: steps alternate above / below a gold line, grouped into phases. */
export default function JourneyTimeline() {
  const reduceMotion = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  // Arrow buttons only matter when the timeline is wider than the viewport (tablet / mobile)
  const sync = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  const scrollByDir = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    el?.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const steps = journey.steps.length;
  const stagger = (i: number) => (reduceMotion ? 0 : 0.25 + i * 0.09);

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.eyebrow}>{journey.eyebrow}</span>
          <h2 className={styles.title}>{journey.title}</h2>
          <p className={styles.desc}>{journey.description}</p>
        </div>

        <div ref={scrollerRef} className={styles.scroller} onScroll={sync}>
          <div className={styles.grid} style={{ "--steps": steps } as React.CSSProperties}>
            {/* Phase brackets */}
            {PHASE_SPANS.map((phase, p) => (
              <div
                key={phase.id}
                className={styles.phase}
                style={{ gridColumn: `${phase.start + 1} / ${phase.end + 2}` }}
              >
                <span className={styles.phaseText}>
                  <span className={styles.phaseIndex}>
                    {journey.phaseLabel} {p + 1}
                  </span>
                  <span className={styles.phaseName}>{phase.label}</span>
                </span>
                <span className={styles.bracket} aria-hidden="true" />
              </div>
            ))}

            {/* The line */}
            <span className={styles.spine} aria-hidden="true">
              <motion.span
                className={styles.spineFill}
                initial={reduceMotion ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </span>

            {journey.steps.map((s, i) => {
              const Icon = ICONS[s.icon];
              const above = i % 2 === 0;
              const edge = i === 0 ? styles.first : i === steps - 1 ? styles.last : "";
              return (
                <div key={s.step} className={styles.stepItem}>
                  <motion.span
                    className={styles.node}
                    style={{ gridColumn: i + 1 }}
                    initial={reduceMotion ? false : { scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.35, delay: stagger(i) }}
                    aria-hidden="true"
                  >
                    {Icon && <Icon size={20} />}
                  </motion.span>

                  <motion.div
                    className={`${styles.card} ${above ? styles.above : styles.below} ${edge}`}
                    style={{ gridColumn: i + 1 }}
                    initial={reduceMotion ? false : { opacity: 0, y: above ? -16 : 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: stagger(i) + 0.05, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className={styles.watermark} aria-hidden="true">
                      {s.step}
                    </span>
                    <span className={styles.stepLabel}>
                      {journey.stepSuffix} {s.step}
                    </span>
                    <h3 className={styles.cardTitle}>{s.title}</h3>
                    <p className={styles.cardDesc}>{s.desc}</p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {(canPrev || canNext) && (
          <div className={styles.controls}>
            <span className={styles.hint}>{journey.swipeHint}</span>
            <div className={styles.arrows}>
              <button type="button" className={styles.arrow} onClick={() => scrollByDir(-1)} disabled={!canPrev} aria-label={journey.previousLabel}>
                <ChevronLeft size={20} />
              </button>
              <button type="button" className={styles.arrow} onClick={() => scrollByDir(1)} disabled={!canNext} aria-label={journey.nextLabel}>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
