"use client";
import { motion } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";
import { RECRUITMENT_PROCESS } from "@/lib/data";
import styles from "./ApproachTimeline.module.css";

export default function ApproachTimeline() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <SectionHeader
          label="Our Approach"
          title="How We Deliver Results"
          subtitle="A proven, structured approach that ensures quality and consistency at every stage of the recruitment journey."
          center
        />
        <div className={styles.timeline}>
          {RECRUITMENT_PROCESS.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`${styles.step} ${i % 2 === 1 ? styles.stepRight : ""}`}
            >
              {i !== RECRUITMENT_PROCESS.length - 1 && (
                <div className={styles.connector} />
              )}
              <div className={styles.stepBubble}>
                <span className={styles.stepNum}>{step.step}</span>
              </div>
              <div className={styles.stepCard}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
