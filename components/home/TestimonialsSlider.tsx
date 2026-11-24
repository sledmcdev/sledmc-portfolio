"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Users, Briefcase } from "lucide-react";
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

  // Title එකේ අන්තිම වචන 2 Gold color කරන්න
  const titleWords = content.title.trim().split(" ");
  const goldTitlePart = titleWords.slice(-2).join(" ");
  const navyTitlePart = titleWords.slice(0, -2).join(" ");

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

  // Start එකේදී සහ Tab මාරු කරද්දී පළවෙනි card එක (index 0) highlight වෙන්න
  useEffect(() => {
    const timer = setTimeout(() => {
      goTo(0, false);
    }, 50);
    return () => clearTimeout(timer);
  }, [activeTab, goTo]);

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
          {/* Eyebrow Label with Gold Lines */}
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span>{content.label}</span>
            <span className={styles.eyebrowLine} />
          </div>

          {/* Two-tone Title */}
          <h2 className={styles.mainTitle}>
            {navyTitlePart}{" "}
            <span className={styles.goldHighlight}>{goldTitlePart}</span>
          </h2>

          {/* Subtitle */}
          <p className={styles.subtitle}>
            {(content as { subtitle?: string }).subtitle ??
              "Real stories. Real people. Their success is our motivation."}
          </p>

          {/* Pill Tabs with Icons */}
          <div className={styles.tabs} role="tablist">
            {content.tabs.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  role="tab"
                  aria-selected={isSelected}
                  className={`${styles.tabBtn} ${isSelected ? styles.tabBtnActive : ""}`}
                  onClick={() => handleTab(tab.id as Audience)}
                >
                  {tab.id === "employer" ? (
                    <Users size={16} className={styles.tabIcon} />
                  ) : (
                    <Briefcase size={16} className={styles.tabIcon} />
                  )}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
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
            {filtered.map((t, i) => {
              const isActive = i === active;
              return (
                <button
                  key={t.id}
                  type="button"
                  className={`${styles.card} ${isActive ? styles.cardActive : ""}`}
                  onClick={() => goTo(i)}
                  aria-label={fill(content.cardAriaLabel, { name: t.name })}
                  aria-current={isActive}
                >
                  {/* Top Quote Icons Row */}
                  <div className={styles.quoteRow}>
                    <Quote className={styles.quoteIconLeft} size={34} />
                    {isActive && (
                      <Quote className={styles.quoteIconRight} size={38} />
                    )}
                  </div>

                  {/* Quote Text */}
                  <p className={styles.testimonial}>&ldquo;{t.testimonial}&rdquo;</p>

                  {/* Author Footer */}
                  <div className={styles.person}>
                    <div className={styles.avatarWrap}>
                      <PlaceholderImage
                        label=""
                        src={t.photo}
                        alt={t.name}
                        position="center"
                        sizes="52px"
                        width={52}
                        height={52}
                        rounded
                        style={{ minHeight: "unset", flexShrink: 0, padding: 0 }}
                      />
                    </div>
                    <div className={styles.personText}>
                      <div className={styles.personName}>{t.name}</div>
                      <div className={styles.personRole}>
                        {t.position}
                        {t.company ? `, ${t.company}` : ""}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom Controls */}
      <div className={styles.nav}>
        <button
          className={styles.navBtn}
          onClick={prev}
          disabled={active === 0}
          aria-label={content.prevAriaLabel}
        >
          <ChevronLeft size={18} />
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
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}