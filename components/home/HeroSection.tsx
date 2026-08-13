"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import PlaceholderImage from "@/components/shared/PlaceholderImage";
import { COMPANY } from "@/lib/data";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={`grid-nexus ${styles.hero}`} aria-label="Hero">
      <div className={`container ${styles.inner}`}>
        {/* Text Content */}
        <div className={styles.content}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mono-eyebrow"
          >
            SPECIALIST RECRUITMENT AGENCY
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className={styles.headline}
          >
            Connecting <span style={{ color: "var(--amber)" }}>elite talent</span> with visionary organizations.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className={styles.subheadline}
          >
            {COMPANY.shortDescription}
          </motion.p>

          {/* Dual CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={styles.ctas}
          >
            <Link href="/organizations" className={`btn btn-primary btn-lg ${styles.ctaCard}`}>
              <span>I&apos;m Looking for Talent</span>
              <ArrowUpRight size={18} />
            </Link>
            <Link href="/job-seekers" className={`btn btn-secondary btn-lg ${styles.ctaCard}`}>
              <span>I&apos;m Looking for a Job</span>
              <ArrowUpRight size={18} />
            </Link>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className={styles.quickStats}
          >
            {[
              { val: "15+", label: "YEARS EXP" },
              { val: "500+", label: "PLACEMENTS" },
              { val: "100+", label: "ORGANIZATIONS" },
              { val: "20+", label: "SECTORS" },
            ].map((s) => (
              <div key={s.label} className={styles.quickStat}>
                <span className={styles.quickStatVal}>{s.val}</span>
                <span className={styles.quickStatLabel}>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={styles.visual}
        >
          <div className={styles.imageFrame}>
            <PlaceholderImage label="Cinematic Noir — Recruitment Executive Image" height="100%" style={{ minHeight: 520, borderRadius: 2 }} />
            {/* Floating Amber Metric Card */}
            <motion.div
              className={styles.floatCard}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className={styles.floatMetric}>98%</span>
              <span className={styles.floatLabel}>RETENTION RATE</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
