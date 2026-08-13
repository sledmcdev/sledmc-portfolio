"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { STATS } from "@/lib/data";
import styles from "./KeyStats.module.css";

function useCountUp(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, end, duration]);

  return count;
}

function StatItem({ stat, index, inView }: { stat: typeof STATS[0]; index: number; inView: boolean }) {
  const numericPart = parseInt(stat.value.replace(/\D/g, ""));
  const count = useCountUp(numericPart, 2000, inView);
  const suffix = stat.value.replace(/[0-9]/g, "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className={styles.statCard}
    >
      <div className={styles.statValue}>
        {inView ? count : 0}{suffix}
      </div>
      <div className={styles.statLabel}>{stat.label}</div>
    </motion.div>
  );
}

export default function KeyStats() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.bgDecor} />
      <div className="container">
        <div className={styles.grid}>
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
