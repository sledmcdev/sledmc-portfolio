"use client";
import { motion } from "framer-motion";
import { Award, Network, UserCheck, ShieldCheck, Zap, Handshake } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { WHY_CHOOSE_US } from "@/lib/data";
import content from "@/data/pages/home/why-choose-us.json";
import styles from "./WhyChooseUs.module.css";

const ICON_MAP: Record<string, React.ElementType> = {
  Award,
  Network,
  UserCheck,
  ShieldCheck,
  Zap,
  Handshake,
};

const DEFAULT_CARD_IMAGES = [
  "/images/why-choose-us/industry-expertise.png",
  "/images/why-choose-us/candidate-network.png",
  "/images/why-choose-us/personalised-recruitment.png",
  "/images/why-choose-us/quality-screening.png",
  "/images/why-choose-us/fast-turnaround.png",
  "/images/why-choose-us/long-term-partnerships.jpeg",
];

export default function WhyChooseUs() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.inner}>
          {/* Left Column */}
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

          {/* Right Column - 2-Column Wide Cards */}
          <div className={styles.right}>
            {WHY_CHOOSE_US.map((item, i) => {
              const Icon = ICON_MAP[item.icon] || Award;
              const bgImage =
                (item as { image?: string }).image ||
                DEFAULT_CARD_IMAGES[i % DEFAULT_CARD_IMAGES.length];

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 2) * 0.1 + Math.floor(i / 2) * 0.08 }}
                  className={styles.card}
                >
                  {/* Background Image with Mask Fade */}
                  <div className={styles.fullBgImageWrap}>
                    <img
                      src={bgImage}
                      alt={item.title}
                      className={styles.fullBgImage}
                      loading="lazy"
                    />
                  </div>

                  {/* Atmospheric Navy Overlay */}
                  <div className={styles.navyAtmosphericOverlay} />

                  {/* Card Foreground Content */}
                  <div className={styles.cardContent}>
                    {/* Full-Width Header (Icon + Topic) */}
                    <div className={styles.cardHeader}>
                      <div className={styles.iconWrap}>
                        <Icon size={24} strokeWidth={1.8} />
                      </div>
                      <h3 className={styles.itemTitle}>{item.title}</h3>
                    </div>

                    {/* Constrained Description so Right Image Stays Visible */}
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