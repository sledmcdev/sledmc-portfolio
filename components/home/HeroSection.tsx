"use client";
import Link from "next/link";
import { useRef, type PointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import LionMotif from "@/components/shared/LionMotif";
import { COMPANY } from "@/lib/data";
import content from "@/data/pages/home/hero.json";
import styles from "./HeroSection.module.css";

type SectorButton = (typeof content.sectorButtons)[number];

const MotionLink = motion.create(Link);

/** Cover-image card that tilts toward the pointer, with image, text and arrow on separate depth layers. */
function SectorCard({ btn }: { btn: SectorButton }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduceMotion = useReducedMotion();

  // Pointer position across the card, -0.5 .. 0.5 on each axis
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 220, damping: 18, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [10, -10]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-12, 12]), spring);
  const glare = useTransform(
    [px, py],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.28), transparent 55%)`
  );

  const handleMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (reduceMotion || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div className={styles.sectorStage}>
      <MotionLink
        ref={ref}
        href={btn.href}
        className={styles.sectorButton}
        onPointerMove={handleMove}
        onPointerLeave={reset}
        onBlur={reset}
        style={reduceMotion ? undefined : { rotateX, rotateY }}
      >
        <span className={styles.sectorArt}>
          <Image
            src={btn.image}
            alt={btn.imageAlt}
            fill
            priority
            sizes="(max-width: 600px) 50vw, (max-width: 1024px) 300px, 280px"
            style={{ objectFit: "cover", objectPosition: btn.imagePosition }}
          />
          <span className={styles.sectorArtShade} aria-hidden="true" />
        </span>
        <span className={styles.sectorText}>
          <span className={styles.sectorLabel}>{btn.label}</span>
          <span className={styles.sectorDesc}>{btn.description}</span>
        </span>
        <span className={styles.sectorArrow} aria-hidden="true">
          <ArrowUpRight size={18} />
        </span>
        {!reduceMotion && (
          <motion.span
            className={styles.sectorGlare}
            aria-hidden="true"
            style={{ background: glare }}
          />
        )}
      </MotionLink>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section id="hero" className={styles.hero} aria-label={content.ariaLabel}>
      {/* Background image */}
      <div className={styles.bgImage} aria-hidden="true">
        <Image
          src={content.image}
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
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

        {/* Sector buttons: Candidates / Partners */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={styles.sectorButtons}
        >
          {content.sectorButtons.map((btn) => (
            <SectorCard key={btn.id} btn={btn} />
          ))}
        </motion.div>
      </div>

    </section>
  );
}
