"use client";
import { motion } from "framer-motion";
import { Monitor, Settings, DollarSign, Heart, HardHat, Factory, UtensilsCrossed, Megaphone, Truck, Building2 } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { INDUSTRIES } from "@/lib/data";
import styles from "./IndustriesGrid.module.css";
import Link from "next/link";

const ICON_MAP: Record<string, React.ElementType> = {
  Monitor, Settings, DollarSign, Heart, HardHat, Factory, UtensilsCrossed, Megaphone, Truck, Building2,
};

export default function IndustriesGrid() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <SectionHeader
          label="Industries"
          title="Industries &amp; Fields We Serve"
          subtitle="Specialist expertise across a diverse range of industries and professional disciplines, connecting the right talent with the right organisations."
          center
        />
        <div className={styles.grid}>
          {INDUSTRIES.map((ind, i) => {
            const Icon = ICON_MAP[ind.icon] || Monitor;
            return (
              <motion.div
                key={ind.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={styles.tile}
                style={{ "--accent": ind.color } as React.CSSProperties}
              >
                <div className={styles.iconWrap}>
                  <Icon size={24} />
                </div>
                <span className={styles.name}>{ind.name}</span>
              </motion.div>
            );
          })}
        </div>
        <div className={styles.cta}>
          <Link href="/industries" className="btn btn-outline btn-lg">
            View All Industries
          </Link>
        </div>
      </div>
    </section>
  );
}
