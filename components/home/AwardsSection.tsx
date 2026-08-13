"use client";
import { motion } from "framer-motion";
import { Award, ShieldCheck, Trophy, Star } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { AWARDS } from "@/lib/data";
import styles from "./AwardsSection.module.css";

const ICONS = [Award, Trophy, Star, ShieldCheck];

export default function AwardsSection() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <SectionHeader
          label="Excellence &amp; Trust"
          title="Awards &amp; Industry Recognition"
          subtitle="Our commitment to quality, ethics, and service excellence is recognized across the recruitment industry."
          center
        />
        <div className={styles.grid}>
          {AWARDS.map((award, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={styles.card}
              >
                <div className={styles.iconWrap}>
                  <Icon size={24} />
                </div>
                <div className={styles.year}>{award.year}</div>
                <h3 className={styles.title}>{award.title}</h3>
                <p className={styles.issuer}>{award.issuer}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
