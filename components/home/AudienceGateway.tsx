"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import styles from "./AudienceGateway.module.css";

export default function AudienceGateway() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.heading}>
          <span className="mono-eyebrow" style={{ marginBottom: 12 }}>DUAL EXPERIENCES</span>
          <h2 className="section-title">Two Journeys. One Agency.</h2>
        </div>
        <div className={styles.split}>
          {/* Job Seekers */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={styles.panel}
          >
            <div className={styles.panelHeader}>
              <span className={styles.panelTag}>FOR CANDIDATES</span>
            </div>
            <h3 className={styles.panelTitle}>Find Your Next Opportunity</h3>
            <p className={styles.panelDesc}>
              Discover relevant opportunities, build your career and connect with employers who are actively seeking your skills.
            </p>
            <ul className={styles.panelList}>
              <li>Browse active executive &amp; specialist openings</li>
              <li>Submit your CV with total confidentiality</li>
              <li>Personalized interview preparation &amp; guidance</li>
              <li>International career placement support</li>
            </ul>
            <Link href="/job-seekers" className={`btn btn-secondary btn-lg ${styles.panelBtn}`}>
              <span>Explore Opportunities</span>
              <ArrowUpRight size={18} />
            </Link>
          </motion.div>

          {/* Organizations */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`${styles.panel} ${styles.panelPrimary}`}
          >
            <div className={styles.panelHeader}>
              <span className={`${styles.panelTag} ${styles.panelTagPrimary}`}>FOR ORGANIZATIONS</span>
            </div>
            <h3 className={styles.panelTitle}>Find the Right Talent</h3>
            <p className={styles.panelDesc}>
              Partner with our specialist recruitment consultants to source and retain top-tier talent across 20+ industries.
            </p>
            <ul className={styles.panelList}>
              <li>Permanent &amp; contract recruitment solutions</li>
              <li>Retained executive search for C-suite roles</li>
              <li>High-volume hiring &amp; international mobilization</li>
              <li>Dedicated account manager &amp; custom SLAs</li>
            </ul>
            <Link href="/organizations" className={`btn btn-primary btn-lg ${styles.panelBtn}`}>
              <span>Partner With Us</span>
              <ArrowUpRight size={18} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
