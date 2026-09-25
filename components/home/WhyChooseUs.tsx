"use client";
import { motion } from "framer-motion";
import { Award, Network, UserCheck, ShieldCheck, Zap, Handshake } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { WHY_CHOOSE_US } from "@/lib/data";
import content from "@/data/pages/home/why-choose-us.json";
import styles from "./WhyChooseUs.module.css";

const ICON_MAP: Record<string, React.ElementType> = {
  Award, Network, UserCheck, ShieldCheck, Zap, Handshake,
};

export default function WhyChooseUs() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.left}>
            <SectionHeader
              label={content.label}
              title={content.title}
              subtitle={content.subtitle}
            />
            <div className={styles.highlightBox}>
              <p>{content.highlightQuote}</p>
            </div>
          </div>
          <div className={styles.right}>
            {WHY_CHOOSE_US.map((item, i) => {
              const Icon = ICON_MAP[item.icon] || Award;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 2) * 0.1 + Math.floor(i / 2) * 0.08 }}
                  className={styles.item}
                >
                  <div className={styles.iconWrap}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                    <p className={styles.itemDesc}>{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
