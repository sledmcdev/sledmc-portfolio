"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  Briefcase,
  Clock,
  Code,
  Target,
  Globe,
  TrendingUp,
  Building,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { SERVICES } from "@/lib/data";
import content from "@/data/pages/home/services.json";
import styles from "./ServicesGrid.module.css";

const AUTO_PLAY_INTERVAL = 10000;
const CARD_GAP = 24; 

const ICON_MAP: Record<string, LucideIcon> = {
  Users,
  Briefcase,
  Clock,
  Code,
  Target,
  Globe,
  TrendingUp,
  Building,
};

const SERVICE_IMAGES = [
  { src: "/images/services/permanent-recruitment.jpeg", alt: "Permanent Recruitment" },
  { src: "/images/services/executive-search.jpeg", alt: "Executive Search" },
  { src: "/images/services/contract-staffing.jpeg", alt: "Contract Staffing" },
  { src: "/images/services/technical-recruitment.jpeg", alt: "Technical Recruitment" },
  { src: "/images/services/talent-acquisition.jpeg", alt: "Talent Acquisition" },
  { src: "/images/services/international-recruitment.jpeg", alt: "International Recruitment" },
  { src: "/images/services/hr-consulting.jpeg", alt: "HR Consulting" },
  { src: "/images/services/recruitment-process-outsourcing.jpeg", alt: "Recruitment Process Outsourcing" },
] as const;

export default function ServicesGrid() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  // Responsive visible cards count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1200) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, SERVICES.length - visibleCards);

  // Clamp index when viewport resizes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  // Auto-play carousel (pauses on hover)
  useEffect(() => {
    if (isPaused || maxIndex === 0) return;

    const timer = setInterval(handleNext, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, maxIndex, handleNext]);

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <SectionHeader
          label={content.label}
          title={content.title}
          subtitle={content.subtitle}
          center
        />

        {/* Service Cards Carousel */}
        <div
          className={styles.carouselWrapper}
          role="region"
          aria-roledescription="carousel"
          aria-label="Our Services"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous services"
            className={`${styles.navBtn} ${styles.prevBtn}`}
          >
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>

          <div className={styles.carouselViewport}>
            <motion.div
              className={styles.carouselTrack}
              animate={{
                x: `calc(-${currentIndex * (100 / visibleCards)}% - ${
                  currentIndex * (CARD_GAP / visibleCards)
                }px)`,
              }}
              transition={{
                type: "tween",
                duration: 0.9,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {SERVICES.map((service, index) => {
                const Icon = ICON_MAP[service.icon] || Briefcase;
                const image = SERVICE_IMAGES[index % SERVICE_IMAGES.length];

                return (
                  <div
                    key={service.id}
                    className={styles.slide}
                    style={{
                      flex: `0 0 calc(${100 / visibleCards}% - ${
                        (CARD_GAP * (visibleCards - 1)) / visibleCards
                      }px)`,
                    }}
                  >
                    <article className={styles.card}>
                      {/* Seamless Blended Background Image */}
                      <div className={styles.fullBgImageWrap}>
                        <img
                          src={image.src}
                          alt={image.alt || service.title}
                          className={styles.fullBgImage}
                          loading="lazy"
                        />
                      </div>

                      {/* Royal Navy Blue Atmospheric Gradient */}
                      <div className={styles.navyAtmosphericOverlay} />

                      {/* Card Header */}
                      <div className={styles.cardHeader}>
                        <div className={styles.goldenIcon} aria-hidden="true">
                          <Icon size={25} strokeWidth={2.3} />
                        </div>
                        <h3 className={styles.title}>{service.title}</h3>
                      </div>

                      {/* Card Description */}
                      <div className={styles.cardBody}>
                        <p className={styles.desc}>{service.description}</p>
                      </div>
                    </article>
                  </div>
                );
              })}
            </motion.div>
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next services"
            className={`${styles.navBtn} ${styles.nextBtn}`}
          >
            <ChevronRight size={22} strokeWidth={2.5} />
          </button>
        </div>

        {/* Pagination Indicators */}
        <div className={styles.dots} role="tablist" aria-label="Slide pagination">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => {
            const isActive = currentIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={isActive ? "true" : undefined}
                className={`${styles.dot} ${isActive ? styles.activeDot : ""}`}
              />
            );
          })}
        </div>

        {/* Primary CTA */}
        <div className={styles.cta}>
          <Link href={content.cta.href} className={styles.mainCtaBtn}>
            <span>{content.cta.label}</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}