"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PlaceholderImage from "@/components/shared/PlaceholderImage";
import { FOUNDER } from "@/lib/data";
import content from "@/data/pages/home/founder-vision.json";
import styles from "./FounderVision.module.css";

const CAROUSEL_ITEMS = content.carouselImages && content.carouselImages.length > 0
  ? content.carouselImages
  : [
      { src: "/images/founder/carousel-1.jpg", alt: "European Partner Summit", label: "European Partner Summit" },
      { src: "/images/founder/carousel-2.jpg", alt: "Academy Training Facility", label: "Academy Training Facility" },
      { src: "/images/founder/carousel-3.jpg", alt: "Candidate Deployment", label: "Candidate Deployment" },
      { src: "/images/founder/carousel-4.jpg", alt: "Global Mobility Forum", label: "Global Mobility Forum" },
      { src: "/images/founder/carousel-5.jpg", alt: "Vocational Standards", label: "Vocational Standards" },
      { src: "/images/founder/carousel-6.jpg", alt: "Leadership & Vision", label: "Leadership & Vision" },
    ];

export default function FounderVision() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance 2nd row carousel
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const nextSlide = () => setSlideIndex((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
  const prevSlide = () => setSlideIndex((prev) => (prev - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length);

  // Visible items for carousel (show 3 on desktop, sliding)
  const getVisibleItems = () => {
    const total = CAROUSEL_ITEMS.length;
    return [
      CAROUSEL_ITEMS[slideIndex % total],
      CAROUSEL_ITEMS[(slideIndex + 1) % total],
      CAROUSEL_ITEMS[(slideIndex + 2) % total],
    ];
  };

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.containerGrid}>
          {/* ROW 1 */}
          <div className={styles.rowTop}>
            {/* 1st Row 1st Column: Thought / Vision */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={styles.card}
            >
              <div className="mono-eyebrow" style={{ marginBottom: 12 }}>{content.eyebrow}</div>
              <blockquote className={styles.messageBox}>
                <p className="serif-quote">{content.quoteOpen}{FOUNDER.message}{content.quoteClose}</p>
              </blockquote>
              
              <div className={styles.portrait}>
                <PlaceholderImage
                  label={content.portraitLabel}
                  src={content.image}
                  alt={content.imageAlt}
                  position="50% 20%"
                  sizes="54px"
                  width={54}
                  height={54}
                  style={{ borderRadius: 2, minHeight: "unset" }}
                />
                <div className={styles.portraitInfo}>
                  <strong>{FOUNDER.name}</strong>
                  <span>{FOUNDER.designation}</span>
                </div>
              </div>
            </motion.div>

            {/* 1st Row 2nd Column: Founder Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className={styles.imageCol}
            >
              <PlaceholderImage
                label={content.imageLabel}
                src={content.image}
                alt={content.imageAlt}
                position="center 20%"
                sizes="(max-width: 900px) 90vw, 440px"
                height="100%"
                style={{ borderRadius: 2 }}
              />
            </motion.div>
          </div>

          {/* ROW 2 (Spanning both columns): Automated Image Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className={styles.rowBottom}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className={styles.carouselHeader}>
              <div className={styles.carouselTitleBox}>
                <span className="mono-eyebrow">FIELD EXCELLENCE & ENGAGEMENT</span>
                <h3 className={styles.carouselTitle}>SLEDMC in Action Across Europe & Sri Lanka</h3>
              </div>
              <div className={styles.carouselControls}>
                <button
                  type="button"
                  className={styles.ctrlBtn}
                  onClick={prevSlide}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} />
                </button>
                <div className={styles.dots}>
                  {CAROUSEL_ITEMS.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`${styles.dot} ${idx === slideIndex ? styles.dotActive : ""}`}
                      onClick={() => setSlideIndex(idx)}
                      aria-label={`Slide ${idx + 1}`}
                      aria-current={idx === slideIndex}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  className={styles.ctrlBtn}
                  onClick={nextSlide}
                  aria-label="Next image"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div className={styles.carouselTrack}>
              {getVisibleItems().map((item, idx) => (
                <div key={`${item.label}-${idx}`} className={styles.carouselCard}>
                  <PlaceholderImage
                    label={item.label}
                    src={item.src}
                    alt={item.alt}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    height={220}
                    style={{ borderRadius: 4 }}
                  />
                  <div className={styles.cardCaption}>
                    <span className={styles.captionTag}>HIGHLIGHT</span>
                    <h4 className={styles.captionText}>{item.label}</h4>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
