"use client";
import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { TESTIMONIALS } from "@/lib/data";
import PlaceholderImage from "@/components/shared/PlaceholderImage";
import content from "@/data/pages/home/testimonials.json";
import styles from "./TestimonialsSlider.module.css";

type Audience = "employer" | "candidate";

const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, k) => String(values[k] ?? ""));

export default function TestimonialsSlider() {
  const [activeTab, setActiveTab] = useState<Audience>("employer");
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number>();

  const filtered = TESTIMONIALS.filter((t) => t.type === activeTab);

  const goTo = useCallback((i: number, smooth = true) => {
    const track = trackRef.current;
    const card = track?.children[i] as HTMLElement | undefined;
    if (!track || !card) return;
    track.scrollTo({
      left: card.offsetLeft - (track.clientWidth - card.clientWidth) / 2,
      behavior: smooth ? "smooth" : "auto",
    });
    setActive(i);
  }, []);

  // Keep the active index in sync when the user swipes / scrolls manually
  const handleScroll = () => {
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const track = trackRef.current;
      if (!track) return;
      const center = track.scrollLeft + track.clientWidth / 2;
      let nearest = 0;
      let best = Infinity;
      Array.from(track.children).forEach((el, i) => {
        const c = el as HTMLElement;
        const d = Math.abs(c.offsetLeft + c.clientWidth / 2 - center);
        if (d < best) {
          best = d;
          nearest = i;
        }
      });
      setActive(nearest);
    });
  };

  const handleTab = (tab: Audience) => {
    setActiveTab(tab);
    setActive(0);
  };

  const prev = () => goTo(Math.max(0, active - 1));
  const next = () => goTo(Math.min(filtered.length - 1, active + 1));

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.header}>
          <SectionHeader
            label={content.label}
            title={content.title}
            center
          />
          <div className={`tabs ${styles.tabs}`} role="tablist">
            {content.tabs.map((tab) => (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => handleTab(tab.id as Audience)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div
            ref={trackRef}
            className={styles.track}
            onScroll={handleScroll}
            role="region"
            aria-roledescription={content.carouselRoleDescription}
            aria-label={content.tabs.find((tab) => tab.id === activeTab)?.carouselLabel}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
              if (e.key === "ArrowRight") { e.preventDefault(); next(); }
            }}
          >
            {filtered.map((t, i) => (
              <button
                key={t.id}
                type="button"
                className={`${styles.card} ${i === active ? styles.cardActive : ""}`}
                onClick={() => goTo(i)}
                aria-label={fill(content.cardAriaLabel, { name: t.name })}
                aria-current={i === active}
              >
                <Quote className={styles.quoteIcon} size={36} />
                <p className={styles.testimonial}>{t.testimonial}</p>
                <div className={styles.person}>
                  <PlaceholderImage
                    label=""
                    width={52}
                    height={52}
                    rounded
                    style={{ minHeight: "unset", flexShrink: 0, padding: 0 }}
                  />
                  <div className={styles.personText}>
                    <div className={styles.personName}>{t.name}</div>
                    <div className={styles.personRole}>
                      {t.position}
                      {t.company ? `, ${t.company}` : ""}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className={styles.nav}>
        <button className={styles.navBtn} onClick={prev} disabled={active === 0} aria-label={content.prevAriaLabel}>
          <ChevronLeft size={20} />
        </button>
        <div className={styles.dots}>
          {filtered.map((t, i) => (
            <button
              key={t.id}
              className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
              onClick={() => goTo(i)}
              aria-label={fill(content.dotAriaLabel, { n: i + 1 })}
            />
          ))}
        </div>
        <button
          className={styles.navBtn}
          onClick={next}
          disabled={active === filtered.length - 1}
          aria-label={content.nextAriaLabel}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
