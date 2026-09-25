"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import PlaceholderImage from "@/components/shared/PlaceholderImage";
import { COMPANY } from "@/lib/data";
import content from "@/data/pages/home/hero.json";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={`grid-nexus ${styles.hero}`} aria-label={content.ariaLabel}>
      <div className={`container ${styles.inner}`}>
        {/* Text Content */}
        <div className={styles.content}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mono-eyebrow"
          >
            {content.eyebrow}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className={styles.headline}
          >
            {content.headline.before}
            <span style={{ color: "var(--amber)" }}>{content.headline.highlight}</span>
            {content.headline.after}
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
            {content.ctas.map((cta) => (
              <Link key={cta.href} href={cta.href} className={`btn btn-${cta.variant} btn-lg ${styles.ctaCard}`}>
                <span>{cta.label}</span>
                <ArrowUpRight size={18} />
              </Link>
            ))}
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className={styles.quickStats}
          >
            {content.quickStats.map((s) => (
              <div key={s.label} className={styles.quickStat}>
                <span className={styles.quickStatVal}>{s.value}</span>
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
            <PlaceholderImage label={content.imageLabel} height="100%" style={{ minHeight: 520, borderRadius: 2 }} />
            {/* Floating Amber Metric Card */}
            <motion.div
              className={styles.floatCard}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className={styles.floatMetric}>{content.floatCard.metric}</span>
              <span className={styles.floatLabel}>{content.floatCard.label}</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
