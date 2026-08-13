"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";
import { TESTIMONIALS } from "@/lib/data";
import PlaceholderImage from "@/components/shared/PlaceholderImage";
import styles from "./TestimonialsSlider.module.css";

export default function TestimonialsSlider() {
  const [activeTab, setActiveTab] = useState<"employer" | "candidate">("employer");
  const [active, setActive] = useState(0);

  const filtered = TESTIMONIALS.filter((t) => t.type === activeTab);

  const handleTab = (tab: "employer" | "candidate") => {
    setActiveTab(tab);
    setActive(0);
  };

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.header}>
          <SectionHeader
            label="Testimonials"
            title="What Our Clients &amp; Candidates Say"
            center
          />
          <div className="tabs">
            <button
              id="tab-employer"
              className={`tab-btn ${activeTab === "employer" ? "active" : ""}`}
              onClick={() => handleTab("employer")}
            >
              Employer Stories
            </button>
            <button
              id="tab-candidate"
              className={`tab-btn ${activeTab === "candidate" ? "active" : ""}`}
              onClick={() => handleTab("candidate")}
            >
              Candidate Stories
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={styles.cards}
          >
            {filtered.map((t, i) => (
              <motion.div
                key={t.id}
                className={`${styles.card} ${i === active ? styles.cardActive : ""}`}
                onClick={() => setActive(i)}
                whileHover={{ scale: 1.01 }}
              >
                <span className="quote-mark">&ldquo;</span>
                <p className={styles.testimonial}>{t.testimonial}</p>
                <div className={styles.person}>
                  <PlaceholderImage label={`${t.name} Photo`} rounded width={48} height={48} style={{ borderRadius: "50%", minHeight: "unset", flexShrink: 0 }} />
                  <div>
                    <div className={styles.personName}>{t.name}</div>
                    <div className={styles.personRole}>{t.position}{t.company ? `, ${t.company}` : ""}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
