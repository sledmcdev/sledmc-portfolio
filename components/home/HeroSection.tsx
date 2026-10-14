"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import PlaceholderImage from "@/components/shared/PlaceholderImage";
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
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  return (
    <section className={`grid-nexus ${styles.hero}`} aria-label={content.ariaLabel}>
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

          {/* Dual CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={styles.ctas}
          >
            {content.ctas.map((cta) => (
              <Link key={cta.href} href={cta.href} className={`btn btn-${cta.variant} btn-lg ${styles.ctaCard}`}>
                <span>{cta.label}</span>
                <ArrowUpRight size={18} />
              </Link>
            ))}
          </motion.div>

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

        {/* Visual with 5-image automated carousel */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={styles.visual}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className={styles.imageFrame}>
            <div className={styles.carouselWrapper}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className={styles.slideMotion}
                >
                  <PlaceholderImage
                    label={SLIDES[currentSlide].label}
                    src={SLIDES[currentSlide].src}
                    alt={SLIDES[currentSlide].alt}
                    priority={currentSlide === 0}
                    sizes="(max-width: 900px) 100vw, 45vw"
                    height="100%"
                    style={{ minHeight: 520, borderRadius: 2 }}
                  />
                  <div className={styles.slideCaptionOverlay}>
                    <span className={styles.slideCaptionLabel}>{SLIDES[currentSlide].label}</span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slide Navigation Controls */}
              <div className={styles.carouselNav}>
                <button
                  type="button"
                  className={styles.carouselArrow}
                  onClick={prevSlide}
                  aria-label="Previous slide"
                >
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
                <button
                  type="button"
                  className={styles.carouselArrow}
                  onClick={nextSlide}
                  aria-label="Next slide"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Floating Amber Metric Card */}
            <motion.div
              className={styles.floatCard}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className={styles.floatMetric}>{content.floatCard.metric}</span>
              <span className={styles.floatLabel}>{content.floatCard.label}</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
