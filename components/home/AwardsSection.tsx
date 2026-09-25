"use client";
import { motion } from "framer-motion";
import { Award, ShieldCheck, Trophy, Star } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { AWARDS } from "@/lib/data";
import content from "@/data/pages/home/awards.json";
import styles from "./AwardsSection.module.css";

const ICON_MAP: Record<string, React.ElementType> = { Trophy, Award, Star, ShieldCheck };

export default function AwardsSection() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <SectionHeader
          label={content.label}
          title={content.title}
          subtitle={content.subtitle}
          center
        />
        <div className={styles.band}>
          {AWARDS.map((award, i) => {
            const Icon = ICON_MAP[content.icons[i % content.icons.length]] || Award;
            return (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={styles.award}
              >
                <div className={styles.medal}>
                  <Icon size={26} strokeWidth={1.75} />
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
