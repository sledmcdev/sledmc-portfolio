"use client";
import { motion } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";
import { RECRUITMENT_PROCESS } from "@/lib/data";
import content from "@/data/pages/home/approach.json";
import styles from "./ApproachTimeline.module.css";

const DRAW_DURATION = 1.6;

export default function ApproachTimeline() {
  const count = RECRUITMENT_PROCESS.length;

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <SectionHeader
          label={content.label}
          title={content.title}
          subtitle={content.subtitle}
          center
        />
        <div className={styles.path} style={{ "--steps": count } as React.CSSProperties}>
          <div className={styles.rail} aria-hidden="true">
            <motion.div
              className={styles.railFill}
              initial={{ "--progress": 0 } as never}
              whileInView={{ "--progress": 1 } as never}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: DRAW_DURATION, ease: "easeInOut" }}
            />
          </div>
          <ol className={styles.steps}>
            {RECRUITMENT_PROCESS.map((step, i) => (
              <motion.li
                key={step.step}
                initial={{ opacity: 0, y: i % 2 === 0 ? -16 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: (i / count) * DRAW_DURATION, duration: 0.5 }}
                className={`${styles.step} ${i % 2 === 0 ? styles.above : styles.below}`}
              >
                <div className={styles.node}>
                  <span>{step.step}</span>
                </div>
                <div className={styles.card}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.description}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
