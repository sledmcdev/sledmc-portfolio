"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import content from "@/data/pages/home/audience-gateway.json";
import styles from "./AudienceGateway.module.css";

export default function AudienceGateway() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.heading}>
          <span className="mono-eyebrow" style={{ marginBottom: 12 }}>{content.eyebrow}</span>
          <h2 className="section-title">{content.title}</h2>
        </div>
        <div className={styles.split}>
          {content.panels.map((panel, i) => (
            <motion.div
              key={panel.id}
              initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`${styles.panel} ${panel.primary ? styles.panelPrimary : ""}`}
            >
              <div className={styles.panelHeader}>
                <span className={`${styles.panelTag} ${panel.primary ? styles.panelTagPrimary : ""}`}>
                  {panel.tag}
                </span>
              </div>
              <h3 className={styles.panelTitle}>{panel.title}</h3>
              <p className={styles.panelDesc}>{panel.description}</p>
              <ul className={styles.panelList}>
                {panel.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link href={panel.cta.href} className={`btn btn-${panel.cta.variant} btn-lg ${styles.panelBtn}`}>
                <span>{panel.cta.label}</span>
                <ArrowUpRight size={18} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
