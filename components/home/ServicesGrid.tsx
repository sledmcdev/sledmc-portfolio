"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Briefcase, Clock, Code, Target, Globe, TrendingUp, Building } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { SERVICES } from "@/lib/data";
import styles from "./ServicesGrid.module.css";

const ICON_MAP: Record<string, React.ElementType> = {
  Users, Briefcase, Clock, Code, Target, Globe, TrendingUp, Building,
};

export default function ServicesGrid() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <SectionHeader
          label="What We Do"
          title="Recruitment Services &amp; Expertise"
          subtitle="Comprehensive recruitment solutions tailored to connect the right people with the right opportunities, across every level and industry."
          center
        />
        <div className={styles.grid}>
          {SERVICES.map((service, i) => {
            const Icon = ICON_MAP[service.icon] || Briefcase;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={styles.card}
              >
                <div className={styles.iconWrap}>
                  <Icon size={22} />
                </div>
                <h3 className={styles.title}>{service.title}</h3>
                <p className={styles.desc}>{service.description}</p>
              </motion.div>
            );
          })}
        </div>
        <div className={styles.cta}>
          <Link href="/services" className="btn btn-outline btn-lg">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
