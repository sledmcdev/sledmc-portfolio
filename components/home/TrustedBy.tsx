"use client";
import { motion } from "framer-motion";
import PlaceholderImage from "@/components/shared/PlaceholderImage";
import Marquee from "@/components/shared/Marquee";
import content from "@/data/pages/home/trusted-by.json";
import styles from "./TrustedBy.module.css";

export default function TrustedBy() {
  return (
    <section className={styles.section}>
      <div className="container">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={styles.label}
        >
          {content.label}
        </motion.p>
      </div>
      <Marquee duration={35} gap={24}>
        {content.logos.map((logo) => (
          <div key={logo} className={styles.logoItem}>
            <PlaceholderImage
              label={logo}
              width={140}
              height={48}
              style={{ border: "none", background: "transparent", padding: 0, gap: 6 }}
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
}
