"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Building2,
  UserCheck,
  X,
  ExternalLink,
} from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { SUCCESS_STORIES } from "@/lib/data";
import content from "@/data/pages/home/success-stories.json";
import styles from "./SuccessStories.module.css";

type Story = (typeof SUCCESS_STORIES)[number] & {
  challenge?: string;
  approach?: string;
  previous?: string;
  support?: string;
  company?: string;
  name?: string;
};

export default function SuccessStories() {
  const [filter, setFilter] = useState<"all" | "employer" | "candidate">("all");
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const filteredStories = (SUCCESS_STORIES as Story[]).filter((story) =>
    filter === "all" ? true : story.type === filter
  );

  const scroll = (direction: "left" | "right") => {
    if (!trackRef.current) return;
    const cardWidth = 380;
    trackRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className={`section ${styles.section}`} id="success-stories">
      <div className="container">
        <div className={styles.headerRow}>
          <SectionHeader
            label={content.label}
            title={content.title}
            subtitle={content.subtitle}
          />
          <div className={styles.carouselActions}>
            <div className={styles.filterPills}>
              <button
                type="button"
                className={`${styles.filterBtn} ${filter === "all" ? styles.filterActive : ""}`}
                onClick={() => setFilter("all")}
              >
                All Stories
              </button>
              <button
                type="button"
                className={`${styles.filterBtn} ${filter === "employer" ? styles.filterActive : ""}`}
                onClick={() => setFilter("employer")}
              >
                Employers
              </button>
              <button
                type="button"
                className={`${styles.filterBtn} ${filter === "candidate" ? styles.filterActive : ""}`}
                onClick={() => setFilter("candidate")}
              >
                Candidates
              </button>
            </div>
            <div className={styles.navArrows}>
              <button
                type="button"
                className={styles.navArrow}
                onClick={() => scroll("left")}
                aria-label="Previous stories"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                className={styles.navArrow}
                onClick={() => scroll("right")}
                aria-label="Next stories"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Track */}
        <div ref={trackRef} className={styles.carouselContainer}>
          {filteredStories.map((story, i) => {
            const isEmployer = story.type === "employer";
            return (
              <motion.article
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={styles.card}
                onClick={() => setSelectedStory(story)}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${story.title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedStory(story);
                  }
                }}
              >
                <div className={styles.cardTop}>
                  <span className={`tag ${isEmployer ? "tag-navy" : "tag-gold"}`}>
                    {isEmployer ? (
                      <><Building2 size={12} style={{ marginRight: 4 }} /> Employer</>
                    ) : (
                      <><UserCheck size={12} style={{ marginRight: 4 }} /> Candidate</>
                    )}
                  </span>
                  <span className={styles.industryTag}>{story.industry}</span>
                </div>

                <h3 className={styles.title}>{story.title}</h3>

                <div className={styles.metricBadge}>
                  <TrendingUp size={16} />
                  <span>{story.metric}</span>
                </div>

                <div className={styles.cardSnippet}>
                  <p className={styles.snippetText}>
                    {story.challenge ?? story.previous}
                  </p>
                </div>

                <div className={styles.cardFooter}>
                  <span className={styles.clickPrompt}>
                    Click to view full outcome <ArrowRight size={14} />
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Modal / Dialog for Detailed Success Story */}
        <AnimatePresence>
          {selectedStory && (
            <div className={styles.modalBackdrop} onClick={() => setSelectedStory(null)}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.25 }}
                className={styles.modalCard}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-story-title"
              >
                <button
                  type="button"
                  className={styles.modalClose}
                  onClick={() => setSelectedStory(null)}
                  aria-label="Close dialog"
                >
                  <X size={20} />
                </button>

                <div className={styles.modalHeader}>
                  <div className={styles.cardTop}>
                    <span className={`tag ${selectedStory.type === "employer" ? "tag-navy" : "tag-gold"}`}>
                      {selectedStory.type === "employer" ? "Employer Outcome" : "Candidate Milestone"}
                    </span>
                    <span className={styles.industryTag}>{selectedStory.industry}</span>
                  </div>
                  <h3 id="modal-story-title" className={styles.modalTitle}>
                    {selectedStory.title}
                  </h3>
                  {selectedStory.company && (
                    <span className={styles.modalSub}>{selectedStory.company}</span>
                  )}
                  {selectedStory.name && (
                    <span className={styles.modalSub}>Candidate: {selectedStory.name}</span>
                  )}
                  <div className={styles.metricBadgeLg}>
                    <TrendingUp size={20} />
                    <span>{selectedStory.metric}</span>
                  </div>
                </div>

                <div className={styles.modalBody}>
                  <div className={styles.storySection}>
                    <span className={styles.storySectionLabel}>
                      {selectedStory.type === "employer" ? "THE CHALLENGE" : "STARTING POSITION"}
                    </span>
                    <p>{selectedStory.challenge ?? selectedStory.previous}</p>
                  </div>

                  <div className={styles.storySection}>
                    <span className={styles.storySectionLabel}>
                      {selectedStory.type === "employer" ? "SLEDMC STRATEGY & MOBILITY" : "OUR TRAINING & SUPPORT"}
                    </span>
                    <p>{selectedStory.approach ?? selectedStory.support}</p>
                  </div>

                  <div className={`${styles.storySection} ${styles.resultSection}`}>
                    <span className={styles.storySectionLabel}>FINAL VERIFIED RESULT</span>
                    <p className={styles.resultText}>
                      <CheckCircle2 size={18} color="var(--amber)" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span>{selectedStory.result}</span>
                    </p>
                  </div>
                </div>

                <div className={styles.modalFooter}>
                  <Link
                    href={selectedStory.type === "employer" ? "/clients#request-form" : "/candidates#assessment-form"}
                    className="btn btn-primary btn-md"
                    onClick={() => setSelectedStory(null)}
                  >
                    <span>{selectedStory.type === "employer" ? "Request Similar Talent" : "Start Your Journey"}</span>
                    <ExternalLink size={15} />
                  </Link>
                  <button
                    type="button"
                    className="btn btn-outline btn-md"
                    onClick={() => setSelectedStory(null)}
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <div className={styles.cta}>
          <Link href={content.cta.href} className="btn btn-outline btn-lg">
            {content.cta.label} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
