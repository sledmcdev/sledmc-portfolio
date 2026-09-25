import Link from "next/link";
import { MapPin, Phone, Mail, Linkedin, Facebook, Instagram, Youtube, ArrowUpRight } from "lucide-react";
import { COMPANY } from "@/lib/data";
import footer from "@/data/site/footer.json";
import nav from "@/data/site/navigation.json";
import styles from "./Footer.module.css";

const SOCIALS = [
  { key: "linkedin", Icon: Linkedin },
  { key: "facebook", Icon: Facebook },
  { key: "instagram", Icon: Instagram },
  { key: "youtube", Icon: Youtube },
] as const;

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* CTA Band */}
      <div className={styles.ctaBand}>
        <div className="container">
          <div className={styles.ctaInner}>
            <div>
              <span className="mono-eyebrow" style={{ marginBottom: 12 }}>{footer.ctaBand.eyebrow}</span>
              <h2 className={styles.ctaTitle}>{footer.ctaBand.title}</h2>
              <p className={styles.ctaSubtitle}>{footer.ctaBand.subtitle}</p>
            </div>
            <div className={styles.ctaButtons}>
              {footer.ctaBand.buttons.map((b) => (
                <Link key={b.label} href={b.href} className={`btn btn-${b.variant} btn-lg`}>
                  {b.label} <ArrowUpRight size={18} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className={styles.main}>
        <div className={styles.watermark}>{footer.watermark}</div>
        <div className="container">
          <div className={styles.grid}>
            {/* Brand Column */}
            <div className={styles.brandCol}>
              <Link href="/" className={styles.logo}>
                <div className={styles.logoWrapper}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={nav.logo.src} alt={nav.logo.alt} className={styles.logoImg} />
                </div>
                <div>
                  <div className={styles.logoMain}>{nav.logo.title}</div>
                  <div className={styles.logoSub}>{nav.logo.subtitle}</div>
                </div>
              </Link>
              <p className={styles.tagline}>{COMPANY.tagline}</p>
              <p className={styles.description}>{COMPANY.shortDescription}</p>
              <div className={styles.socials}>
                {SOCIALS.map(({ key, Icon }) => (
                  <a
                    key={key}
                    href={COMPANY[key]}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={footer.socialLabels[key]}
                    className={styles.socialLink}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
              <div className={styles.contact}>
                <a href={`tel:${COMPANY.phone}`} className={styles.contactItem}>
                  <Phone size={14} /> {COMPANY.phone}
                </a>
                <a href={`mailto:${COMPANY.email}`} className={styles.contactItem}>
                  <Mail size={14} /> {COMPANY.email}
                </a>
                <div className={styles.contactItem}>
                  <MapPin size={14} /> {COMPANY.address}
                </div>
              </div>
            </div>

            {footer.columns.map((col) => (
              <div key={col.title} className={styles.linkCol}>
                <h3 className={styles.colTitle}>{col.title}</h3>
                <ul className={styles.linkList}>
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className={styles.footerLink}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className="container">
          <div className={styles.bottomInner}>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} {footer.copyright}
            </p>
            <div className={styles.legalLinks}>
              {footer.legalLinks.map((l) => (
                <Link key={l.label} href={l.href} className={styles.legalLink}>{l.label}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
