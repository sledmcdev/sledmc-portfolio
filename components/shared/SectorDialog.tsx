"use client";

import Link from "next/link";
import { ArrowRight, Briefcase, CalendarClock, Expand, FileText, MapPin, Users, Wallet } from "lucide-react";
import { SECTOR_PATHWAYS, type SectorPathway, type Vacancy } from "@/lib/data";
import Dialog from "./Dialog";
import Carousel from "./Carousel";
import LionMotif from "./LionMotif";
import { SECTOR_ICONS } from "./sectorIcons";
import styles from "./SectorDialog.module.css";

type Props = {
  sector: SectorPathway | null;
  vacancies: Vacancy[];
  onClose: () => void;
};

const copy = SECTOR_PATHWAYS.dialog;

export default function SectorDialog({ sector, vacancies, onClose }: Props) {
  const Icon = sector ? SECTOR_ICONS[sector.icon] : null;

  return (
    <Dialog
      open={!!sector}
      onClose={onClose}
      closeLabel={copy.closeLabel}
      title={sector?.title}
      header={
        sector && (
          <>
            <LionMotif width={170} opacity={0.12} className={styles.headerLion} />
            <span className={styles.headerIcon}>{Icon && <Icon size={22} />}</span>
          </>
        )
      }
    >
      {sector && (
        <div className={styles.content}>
          <p className={styles.lead}>{sector.desc}</p>

          {sector.brochures.length > 0 && (
            <section className={styles.block} aria-labelledby="sector-brochures">
              <h3 id="sector-brochures" className={styles.blockTitle}>
                <FileText size={18} /> {copy.brochuresTitle}
              </h3>
              <Carousel label={copy.brochuresTitle} perView={{ desktop: 3, tablet: 2, mobile: 1 }} gap={16}>
                {sector.brochures.map((src, i) => (
                  <a key={src} href={src} target="_blank" rel="noopener noreferrer" className={styles.brochure}>
                    {/* eslint-disable-next-line @next/next/no-img-element -- static SVG/JPG brochures, no optimisation needed */}
                    <img src={src} alt={copy.brochureAlt.replace("{sector}", sector.title).replace("{n}", String(i + 1))} loading="lazy" />
                    <span className={styles.brochureOpen}>
                      <Expand size={14} /> {copy.brochureOpenLabel}
                    </span>
                  </a>
                ))}
              </Carousel>
            </section>
          )}

          <section className={styles.block} aria-labelledby="sector-vacancies">
            <h3 id="sector-vacancies" className={styles.blockTitle}>
              <Briefcase size={18} /> {copy.vacanciesTitle}
              {vacancies.length > 0 && (
                <span className={styles.count}>
                  {vacancies.length} {copy.vacancyCountSuffix}
                </span>
              )}
            </h3>

            {vacancies.length > 0 ? (
              <ul className={styles.vacancyList}>
                {vacancies.map((job) => (
                  <li key={job.id} className={styles.vacancy}>
                    <div className={styles.vacancyMain}>
                      <h4 className={styles.vacancyTitle}>{job.title}</h4>
                      <div className={styles.meta}>
                        <span>
                          <MapPin size={14} /> {job.location}, {job.country}
                        </span>
                        <span>
                          <Wallet size={14} /> {job.salary}
                        </span>
                        <span>
                          <CalendarClock size={14} /> {job.contract}
                        </span>
                        <span>
                          <Users size={14} /> {job.positions} {copy.positionsSuffix}
                        </span>
                      </div>
                      <div className={styles.reqs} aria-label={copy.requirementsLabel}>
                        {job.requirements.map((req) => (
                          <span key={req} className={styles.req}>
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Link
                      href={`${copy.applyHref}?sector=${encodeURIComponent(sector.slug)}&role=${encodeURIComponent(job.title)}`}
                      className={`btn btn-primary btn-sm ${styles.apply}`}
                    >
                      {copy.applyLabel} <ArrowRight size={14} />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className={styles.empty}>
                <span className={styles.emptyIcon}>
                  <CalendarClock size={30} />
                </span>
                <h4 className={styles.emptyTitle}>{copy.empty.title}</h4>
                <p className={styles.emptyText}>{copy.empty.message}</p>
                <Link href={copy.empty.cta.href} className="btn btn-primary btn-md" onClick={onClose}>
                  {copy.empty.cta.label} <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </section>
        </div>
      )}
    </Dialog>
  );
}
