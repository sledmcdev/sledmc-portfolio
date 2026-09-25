"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { SUCCESS_STORIES } from "@/lib/data";
import content from "@/data/pages/home/success-stories.json";
import styles from "./SuccessStories.module.css";

type Story = (typeof SUCCESS_STORIES)[number] & {
  challenge?: string;
  approach?: string;
  previous?: string;
  support?: string;
};

export default function SuccessStories() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <SectionHeader
          label={content.label}
          title={content.title}
          subtitle={content.subtitle}
          center
        />
        <div className={styles.grid}>
          {(SUCCESS_STORIES as Story[]).map((story, i) => {
            const typeCopy =
              story.type === "employer" ? content.storyTypes.employer : content.storyTypes.candidate;
            const parts = [
              { key: "first", label: typeCopy.firstLabel, text: story.challenge ?? story.previous },
              { key: "second", label: typeCopy.secondLabel, text: story.approach ?? story.support },
              { key: "result", label: content.resultLabel, text: story.result },
            ];
            return (
              <motion.article
                key={story.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={styles.card}
              >
                <div className={styles.cardTop}>
                  <span className="tag tag-gold">{typeCopy.tag}</span>
                  <span className="tag tag-navy">{story.industry}</span>
                </div>
                <h3 className={styles.title}>{story.title}</h3>
                <div className={styles.metric}>
                  <TrendingUp size={18} />
                  <span>{story.metric}</span>
                </div>
                <div className={styles.sections}>
                  {parts.map((p) => (
                    <div
                      key={p.key}
                      className={`${styles.storySection} ${p.key === "result" ? styles.result : ""}`}
                    >
                      <span className={styles.storySectionLabel}>{p.label}</span>
                      <p>{p.text}</p>
                    </div>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
        <div className={styles.cta}>
          <Link href={content.cta.href} className="btn btn-outline btn-lg">
            {content.cta.label} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
