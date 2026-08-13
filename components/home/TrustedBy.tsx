"use client";
import { motion } from "framer-motion";
import PlaceholderImage from "@/components/shared/PlaceholderImage";
import styles from "./TrustedBy.module.css";

const LOGOS = [1, 2, 3, 4, 5, 6, 7, 8];

export default function TrustedBy() {
  return (
    <section className={styles.section}>
      <div className="container">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={styles.label}
        >
          Trusted by leading organisations
        </motion.p>
        <div className={styles.logoTrack}>
          <div className={styles.logoInner}>
            {[...LOGOS, ...LOGOS].map((n, i) => (
              <div key={i} className={styles.logoItem}>
                <PlaceholderImage label={`Client Logo ${n}`} width={120} height={48} style={{ borderRadius: 8, border: "none", background: "transparent" }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
