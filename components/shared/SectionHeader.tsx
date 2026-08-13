"use client";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
  accent?: "gold" | "teal" | "blue";
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  center = false,
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={`section-header${center ? " center" : ""}`}>
      {label && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mono-eyebrow"
          style={{ marginBottom: 16 }}
        >
          {label}
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`section-title${light ? " light" : ""}`}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`section-subtitle${light ? " light" : ""}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
