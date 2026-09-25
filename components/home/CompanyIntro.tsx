"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import PlaceholderImage from "@/components/shared/PlaceholderImage";
import SectionHeader from "@/components/shared/SectionHeader";
import { COMPANY } from "@/lib/data";
import content from "@/data/pages/home/company-intro.json";
import styles from "./CompanyIntro.module.css";

export default function CompanyIntro() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.grid}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className={styles.imageCol}
          >
            <div className={styles.imageStack}>
              <PlaceholderImage label={content.imageLabel} height={480} style={{ borderRadius: 20 }} />
              <div className={styles.badge}>
                <span className={styles.badgeValue}>{content.badge.value}</span>
                <span className={styles.badgeLabel}>{content.badge.label}</span>
              </div>
            </div>
          </motion.div>
          <div className={styles.textCol}>
            <SectionHeader
              label={content.label}
              title={content.title}
              subtitle={COMPANY.description}
            />
            <ul className={styles.strengths}>
              {content.strengths.map((s, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  className={styles.strengthItem}
                >
                  <CheckCircle size={18} className={styles.checkIcon} />
                  {s}
                </motion.li>
              ))}
            </ul>
            <Link href={content.cta.href} className="btn btn-outline">
              {content.cta.label} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
