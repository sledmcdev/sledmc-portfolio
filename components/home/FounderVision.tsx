"use client";
import { motion } from "framer-motion";
import PlaceholderImage from "@/components/shared/PlaceholderImage";
import { FOUNDER } from "@/lib/data";
import styles from "./FounderVision.module.css";

export default function FounderVision() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.inner}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.card}
          >
            <div className="mono-eyebrow" style={{ marginBottom: 12 }}>FOUNDER&apos;S VISION</div>
            <blockquote className={styles.message}>
              <p className="serif-quote">&ldquo;{FOUNDER.message}&rdquo;</p>
            </blockquote>
            
            <div className={styles.portrait}>
              <PlaceholderImage label="Founder Portrait" width={56} height={56} style={{ borderRadius: 2, minHeight: "unset" }} />
              <div className={styles.portraitInfo}>
                <strong>{FOUNDER.name}</strong>
                <span>{FOUNDER.designation}</span>
              </div>
            </div>

            <div className={styles.philosophy}>
              <span className={styles.philLabel}>OUR PHILOSOPHY</span>
              <p className="serif-quote">{FOUNDER.philosophy}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={styles.imageCol}
          >
            <PlaceholderImage label="Founder Portrait — High Resolution Photography" height={520} style={{ borderRadius: 2 }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
