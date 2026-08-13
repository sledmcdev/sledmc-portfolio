"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import PlaceholderImage from "@/components/shared/PlaceholderImage";
import SectionHeader from "@/components/shared/SectionHeader";
import { COMPANY } from "@/lib/data";
import styles from "./CompanyIntro.module.css";

const STRENGTHS = [
  "15+ years of specialist recruitment experience",
  "Personalised service for every client and candidate",
  "Deep industry expertise across 20+ sectors",
  "International reach with a local touch",
];

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
              <PlaceholderImage label="Office / Team Photo" height={480} style={{ borderRadius: 20 }} />
              <div className={styles.badge}>
                <span className={styles.badgeValue}>15+</span>
                <span className={styles.badgeLabel}>Years of Excellence</span>
              </div>
            </div>
          </motion.div>
          <div className={styles.textCol}>
            <SectionHeader
              label="About Us"
              title="More Than a Recruitment Agency"
              subtitle={COMPANY.description}
            />
            <ul className={styles.strengths}>
              {STRENGTHS.map((s, i) => (
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
            <Link href="/about" className="btn btn-outline">
              Learn More About Us <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
