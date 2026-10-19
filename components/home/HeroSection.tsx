"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import LionMotif from "@/components/shared/LionMotif";
import { COMPANY } from "@/lib/data";
import content from "@/data/pages/home/hero.json";
import styles from "./HeroSection.module.css";

const SLIDES = content.carouselImages && content.carouselImages.length > 0
  ? content.carouselImages
  : [
      { src: content.image, alt: content.imageAlt, label: content.imageLabel },
      { src: "/images/home/hero-2.jpg", alt: "Technical talent", label: "Technical Talent" },
      { src: "/images/home/hero-3.jpg", alt: "Hospitality staff", label: "Hospitality" },
      { src: "/images/home/hero-4.jpg", alt: "Healthcare staff", label: "Healthcare" },
      { src: "/images/home/hero-5.jpg", alt: "Academy training", label: "Academy" },
    ];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Restarting the timer on every slide change means a manual click gets a full interval too
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  return (
    <section id="hero" className={styles.hero} aria-label={content.ariaLabel}>
      {/* Background carousel */}
      <div className={styles.bgCarousel} aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.2 }, scale: { duration: 6, ease: "easeOut" } }}
            className={styles.bgSlide}
          >
            <Image
              src={SLIDES[currentSlide].src}
              alt=""
              fill
              priority={currentSlide === 0}
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className={styles.bgOverlay} aria-hidden="true" />

      <LionMotif width={480} opacity={0.06} className={styles.lion} />
      <div className={`container ${styles.inner}`}>
        {/* Text Content */}
        <div className={styles.content}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mono-eyebrow"
          >
            {content.eyebrow}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className={styles.headline}
          >
            {content.headline.before}
            <span style={{ color: "var(--amber)" }}>{content.headline.highlight}</span>
            {content.headline.after}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className={styles.subheadline}
          >
            {COMPANY.shortDescription}
          </motion.p>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className={styles.quickStats}
          >
            {content.quickStats.map((s) => (
              <div key={s.label} className={styles.quickStat}>
                <span className={styles.quickStatVal}>{s.value}</span>
                <span className={styles.quickStatLabel}>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Sector buttons: Candidates / Partners (where the carousel image used to be) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={styles.sectorButtons}
        >
          {content.sectorButtons.map((btn) => (
            <Link key={btn.id} href={btn.href} className={styles.sectorButton}>
              <span className={styles.sectorArt}>
                <img src={btn.image} alt={btn.imageAlt} loading="eager" />
              </span>
              <span className={styles.sectorText}>
                <span className={styles.sectorLabel}>{btn.label}</span>
                <span className={styles.sectorDesc}>{btn.description}</span>
              </span>
              <ArrowUpRight size={18} className={styles.sectorArrow} />
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Carousel controls */}
      <div className={styles.carouselNav}>
        <span className={styles.slideCaptionLabel} aria-live="polite">{SLIDES[currentSlide].label}</span>
        <button type="button" className={styles.carouselArrow} onClick={prevSlide} aria-label="Previous slide">
          <ChevronLeft size={16} />
        </button>
        <div className={styles.carouselDots}>
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`${styles.carouselDot} ${idx === currentSlide ? styles.carouselDotActive : ""}`}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              aria-current={idx === currentSlide}
            />
          ))}
        </div>
        <button type="button" className={styles.carouselArrow} onClick={nextSlide} aria-label="Next slide">
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
}
