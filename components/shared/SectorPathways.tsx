"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SECTOR_PATHWAYS, VACANCIES, type SectorPathway } from "@/lib/data";
import Carousel from "./Carousel";
import SectorDialog from "./SectorDialog";
import { SECTOR_ICONS } from "./sectorIcons";
import styles from "./SectorPathways.module.css";

/** Muted looping background video; falls back to the gradient when missing or when motion is reduced. */
function SectorVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Only play while the card is on screen
  useEffect(() => {
    const video = ref.current;
    if (!video || reduced || failed) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => undefined);
        else video.pause();
      },
      { threshold: 0.25 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, [reduced, failed]);

  if (failed || reduced) return null;

  return (
    <video
      ref={ref}
      className={styles.video}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
      onError={() => setFailed(true)}
    />
  );
}

type Props = {
  /** Visual variant of the surrounding section. */
  tone?: "dark" | "default";
  id?: string;
};

export default function SectorPathways({ tone = "dark", id }: Props) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const { sectors } = SECTOR_PATHWAYS;
  const activeSector = sectors.find((s) => s.slug === activeSlug) ?? null;

  return (
    <section id={id} className={`${styles.section} ${tone === "dark" ? styles.sectionDark : ""}`}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.eyebrow}>{SECTOR_PATHWAYS.eyebrow}</span>
          <h2 className={styles.title}>{SECTOR_PATHWAYS.title}</h2>
          <p className={styles.desc}>{SECTOR_PATHWAYS.description}</p>
        </div>

        <Carousel label={SECTOR_PATHWAYS.carouselLabel}>
          {sectors.map((sector, i) => (
            <SectorCard key={sector.slug} sector={sector} index={i} onOpen={() => setActiveSlug(sector.slug)} />
          ))}
        </Carousel>
      </div>

      <SectorDialog
        sector={activeSector}
        vacancies={activeSector ? VACANCIES[activeSector.slug] ?? [] : []}
        onClose={() => setActiveSlug(null)}
      />
    </section>
  );
}

function SectorCard({ sector, index, onOpen }: { sector: SectorPathway; index: number; onOpen: () => void }) {
  const Icon = SECTOR_ICONS[sector.icon];
  const count = (VACANCIES[sector.slug] ?? []).length;

  return (
    <motion.button
      type="button"
      className={styles.card}
      onClick={onOpen}
      aria-haspopup="dialog"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <SectorVideo src={sector.video} poster={sector.poster} />
      <span className={styles.cardShade} aria-hidden="true" />

      <span className={styles.cardTop}>
        <span className={styles.cardIcon}>{Icon && <Icon size={26} />}</span>
        <span className={`${styles.badge} ${count ? styles.badgeOpen : ""}`}>
          {count
            ? (count === 1 ? SECTOR_PATHWAYS.badge.one : SECTOR_PATHWAYS.badge.many).replace("{count}", String(count))
            : SECTOR_PATHWAYS.badge.none}
        </span>
      </span>

      <span className={styles.cardBody}>
        <span className={styles.cardTitle}>{sector.title}</span>
        <span className={styles.cardDesc}>{sector.desc}</span>
        <span className={styles.tags}>
          {sector.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </span>
      </span>

      <span className={styles.cardCta}>
        {SECTOR_PATHWAYS.cardCta} <ArrowUpRight size={16} />
      </span>
    </motion.button>
  );
}
