"use client";
import { Monitor, Settings, DollarSign, Heart, HardHat, Factory, UtensilsCrossed, Megaphone, Truck, Building2 } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import Marquee from "@/components/shared/Marquee";
import { INDUSTRIES } from "@/lib/data";
import content from "@/data/pages/home/industries.json";
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
          label={content.label}
          title={content.title}
          subtitle={content.subtitle}
          center
        />
      </div>
      <Marquee duration={45} gap={20} reverse>
        {INDUSTRIES.map((ind) => {
          const Icon = ICON_MAP[ind.icon] || Monitor;
          return (
            <div key={ind.name} className={styles.tile}>
              <div className={styles.iconWrap}>
                <Icon size={22} />
              </div>
              <span className={styles.name}>{ind.name}</span>
            </div>
          );
        })}
      </Marquee>
      <div className="container">
        <div className={styles.cta}>
          <Link href={content.cta.href} className="btn btn-outline btn-lg">
            {content.cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
