import Link from "next/link";
import { MapPin, Phone, Mail, Linkedin, Facebook, Instagram, Youtube, ArrowUpRight } from "lucide-react";
import { COMPANY } from "@/lib/data";
import styles from "./Footer.module.css";

const FOOTER_LINKS = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Approach", href: "/our-approach" },
    { label: "Services", href: "/services" },
    { label: "Industries", href: "/industries" },
    { label: "Success Stories", href: "/success-stories" },
    { label: "Insights", href: "/insights" },
  ],
  jobSeekers: [
    { label: "Find Jobs", href: "/job-seekers/find-jobs" },
    { label: "Submit Your CV", href: "/job-seekers/submit-cv" },
    { label: "Candidate Services", href: "/job-seekers/candidate-services" },
    { label: "Career Resources", href: "/job-seekers/career-resources" },
    { label: "Candidate FAQ", href: "/job-seekers/faq" },
  ],
  organizations: [
    { label: "Recruitment Services", href: "/organizations/recruitment-services" },
    { label: "Why Partner With Us", href: "/organizations/why-partner" },
    { label: "Partnership Models", href: "/organizations/partnership-models" },
    { label: "Partner With Us", href: "/organizations/partner-with-us" },
    { label: "Employer FAQ", href: "/organizations" },
  ],
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* CTA Band */}
      <div className={styles.ctaBand}>
        <div className="container">
          <div className={styles.ctaInner}>
            <div>
              <span className="mono-eyebrow" style={{ marginBottom: 12 }}>TRANSFORM YOUR TEAM</span>
              <h2 className={styles.ctaTitle}>Ready to make your next move?</h2>
              <p className={styles.ctaSubtitle}>Whether you are seeking executive talent or your next career milestone, we are your strategic partner.</p>
            </div>
            <div className={styles.ctaButtons}>
              <Link href="/job-seekers/find-jobs" className="btn btn-secondary btn-lg">
                Find a Job <ArrowUpRight size={18} />
              </Link>
              <Link href="/organizations/partner-with-us" className="btn btn-primary btn-lg">
                Find Talent <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className={styles.main}>
        <div className={styles.watermark}>SLEDMC</div>
        <div className="container">
          <div className={styles.grid}>
            {/* Brand Column */}
            <div className={styles.brandCol}>
              <Link href="/" className={styles.logo}>
                <div className={styles.logoMark}>S</div>
                <div>
                  <div className={styles.logoMain}>SLEDMC</div>
                  <div className={styles.logoSub}>RECRUITMENT</div>
                </div>
              </Link>
              <p className={styles.tagline}>{COMPANY.tagline}</p>
              <p className={styles.description}>{COMPANY.shortDescription}</p>
              <div className={styles.socials}>
                <a href={COMPANY.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={styles.socialLink}>
                  <Linkedin size={16} />
                </a>
                <a href={COMPANY.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className={styles.socialLink}>
                  <Facebook size={16} />
                </a>
                <a href={COMPANY.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className={styles.socialLink}>
                  <Instagram size={16} />
                </a>
                <a href={COMPANY.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className={styles.socialLink}>
                  <Youtube size={16} />
                </a>
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

            {/* Company Links */}
            <div className={styles.linkCol}>
              <h3 className={styles.colTitle}>Company</h3>
              <ul className={styles.linkList}>
                {FOOTER_LINKS.company.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className={styles.footerLink}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Job Seekers */}
            <div className={styles.linkCol}>
              <h3 className={styles.colTitle}>Job Seekers</h3>
              <ul className={styles.linkList}>
                {FOOTER_LINKS.jobSeekers.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className={styles.footerLink}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Organizations */}
            <div className={styles.linkCol}>
              <h3 className={styles.colTitle}>Organizations</h3>
              <ul className={styles.linkList}>
                {FOOTER_LINKS.organizations.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className={styles.footerLink}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className="container">
          <div className={styles.bottomInner}>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} SLEDMC RECRUITMENT. ALL RIGHTS RESERVED.
            </p>
            <div className={styles.legalLinks}>
              <Link href="/privacy-policy" className={styles.legalLink}>PRIVACY POLICY</Link>
              <Link href="/terms" className={styles.legalLink}>TERMS &amp; CONDITIONS</Link>
              <Link href="/cookies" className={styles.legalLink}>COOKIE POLICY</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
