"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import defaults from "@/data/site/final-cta.json";
import styles from "./FinalCTA.module.css";

type CTAContent = typeof defaults;

/** Site-wide closing call-to-action. Content comes from data/site/final-cta.json;
 *  pages may pass a partial override loaded from their own JSON. */
export default function FinalCTA({ content }: { content?: Partial<CTAContent> }) {
  const c = { ...defaults, ...content };
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.box}
        >
          <div className={styles.watermark} aria-hidden="true">{c.watermark}</div>
          <div className={styles.content}>
            <span className="mono-eyebrow" style={{ marginBottom: 16 }}>{c.eyebrow}</span>
            <h2 className={styles.title}>{c.title}</h2>
            <p className={styles.desc}>{c.description}</p>
            <div className={styles.buttons}>
              {c.buttons.map((b) => (
                <Link key={b.label} href={b.href} className={`btn btn-${b.variant} btn-lg`}>
                  {b.label} <ArrowUpRight size={18} />
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
