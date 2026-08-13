"use client";
import { motion } from "framer-motion";
import { Award, Network, UserCheck, ShieldCheck, Zap, Handshake } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { WHY_CHOOSE_US } from "@/lib/data";
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
              label="Why Choose Us"
              title="What Sets Us Apart"
              subtitle="We don't just fill vacancies — we build relationships that create long-term value for every candidate and every organisation we work with."
            />
            <div className={styles.highlightBox}>
              <p>
                &ldquo;Our mission is simple: to make every placement count — not just for today, but for the long term.&rdquo;
              </p>
            </div>
          </div>
          <div className={styles.right}>
            {WHY_CHOOSE_US.map((item, i) => {
              const Icon = ICON_MAP[item.icon] || Award;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
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
