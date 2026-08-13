"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { SUCCESS_STORIES } from "@/lib/data";
import styles from "./SuccessStories.module.css";

export default function SuccessStories() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <SectionHeader
          label="Success Stories"
          title="Results That Speak for Themselves"
          subtitle="Real outcomes achieved for our clients and candidates — from ambitious career moves to complex volume hiring campaigns."
          center
        />
        <div className={styles.grid}>
          {SUCCESS_STORIES.map((story, i) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={styles.card}
            >
              <div className={styles.cardTop}>
                <span className={`tag ${story.type === "employer" ? "tag-blue" : "tag-teal"}`}>
                  {story.type === "employer" ? "Employer Story" : "Candidate Story"}
                </span>
                <span className={`tag tag-navy`}>{story.industry}</span>
              </div>
              <h3 className={styles.title}>{story.title}</h3>
              <div className={styles.metric}>
                <TrendingUp size={16} />
                {story.metric}
              </div>
              <div className={styles.sections}>
                <div className={styles.storySection}>
                  <span className={styles.storySectionLabel}>Challenge</span>
                  <p>{story.challenge}</p>
                </div>
                <div className={styles.storySection}>
                  <span className={styles.storySectionLabel}>Approach</span>
                  <p>{story.approach}</p>
                </div>
                <div className={styles.storySection}>
                  <span className={styles.storySectionLabel}>Result</span>
                  <p>{story.result}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className={styles.cta}>
          <Link href="/success-stories" className="btn btn-outline btn-lg">
            View All Success Stories <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
