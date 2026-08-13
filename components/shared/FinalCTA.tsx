"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import styles from "./FinalCTA.module.css";

export default function FinalCTA() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.box}
        >
          <div className={styles.watermark}>SLEDMC</div>
          <div className={styles.content}>
            <span className="mono-eyebrow" style={{ marginBottom: 16 }}>TAKE THE NEXT STEP</span>
            <h2 className={styles.title}>Ready to transform your recruitment journey?</h2>
            <p className={styles.desc}>
              Whether you are an organization seeking elite talent or a candidate aiming for your next career milestone, SLEDMC Recruitment provides discreet, research-led partnerships.
            </p>
            <div className={styles.buttons}>
              <Link href="/organizations/partner-with-us" className="btn btn-primary btn-lg">
                Find Your Next Talent <ArrowUpRight size={18} />
              </Link>
              <Link href="/job-seekers/find-jobs" className="btn btn-secondary btn-lg">
                Find Your Next Opportunity <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
