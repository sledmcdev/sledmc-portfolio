"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowRight, Phone, Mail, Facebook, Youtube, Linkedin } from "lucide-react";
import ThemeToggle from "@/components/theme/ThemeToggle";
import nav from "@/data/site/navigation.json";
import styles from "./Header.module.css";
import BrandWordmark from "@/components/shared/BrandWordmark";
import { COMPANY } from "@/lib/data";

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const NAV_ITEMS: NavItem[] = nav.items;
const CLOSE_DELAY = 180;
const SOCIALS = [
  { key: "facebook", label: "Facebook", Icon: Facebook },
  { key: "youtube", label: "YouTube", Icon: Youtube },
  { key: "linkedin", label: "LinkedIn", Icon: Linkedin },
] as const;
const telHref = (n: string) => `tel:${n.replace(/[^+\d]/g, "")}`;
const waHref = (n: string) => `https://wa.me/${n.replace(/\D/g, "")}`;

/** WhatsApp glyph (lucide has no brand icon for it). */
function WhatsAppIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeAll = useCallback(() => {
    clearTimeout(closeTimer.current);
    setMobileOpen(false);
    setActiveDropdown(null);
    setMobileExpanded(null);
  }, []);

  // Route changes close everything; hash-only navigation is handled by closeAll on click
  useEffect(() => {
    closeAll();
  }, [pathname, closeAll]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeAll]);

  // Small grace period so moving the pointer diagonally into the menu doesn't close it
  const openDropdown = (label: string) => {
    clearTimeout(closeTimer.current);
    setActiveDropdown(label);
  };
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveDropdown(null), CLOSE_DELAY);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        {/* Navy contact strip: starts just right of the logo badge with a swooping left edge */}
        <div className={styles.topBg} aria-hidden="true">
          <svg className={styles.topCurve} viewBox="0 0 90 40" preserveAspectRatio="none">
            <path d="M0 0 H90 V40 H62 C40 40 34 30 26 18 C18 6 12 0 0 0 Z" />
          </svg>
        </div>

        <div className={`container ${styles.shell}`}>
          <Link href="/" className={styles.badge} onClick={closeAll} aria-label={nav.logo.title}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={nav.logo.src} alt={nav.logo.alt} className={styles.badgeImg} />
          </Link>

          <div className={styles.topBar} aria-label={nav.a11y.contactBar}>
            <div className={styles.contacts}>
              <a href={telHref(COMPANY.phone)} className={styles.contactItem}>
                <Phone size={14} /> <span>{COMPANY.phone}</span>
              </a>
              <span className={`${styles.divider} ${styles.hideXs}`} aria-hidden="true" />
              <a href={waHref(COMPANY.whatsapp)} target="_blank" rel="noreferrer" className={`${styles.contactItem} ${styles.hideSm}`}>
                <WhatsAppIcon /> <span>{COMPANY.whatsapp}</span>
              </a>
              <span className={`${styles.divider} ${styles.hideSm}`} aria-hidden="true" />
              <a href={`mailto:${COMPANY.email}`} className={`${styles.contactItem} ${styles.hideXs}`}>
                <Mail size={14} /> <span>{COMPANY.email}</span>
              </a>
            </div>
            <div className={styles.socials}>
              {SOCIALS.map(({ key, label, Icon }) => (
                <a key={key} href={COMPANY[key]} target="_blank" rel="noreferrer" aria-label={label} className={styles.socialLink}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div className={styles.inner}>
          <Link href="/" className={styles.logo} onClick={closeAll}>
            <BrandWordmark alt={nav.logo.title} className={styles.textLogoImg} />
            <span className={styles.logoTagline}>{nav.logo.tagline}</span>
          </Link>

          <nav className={styles.desktopNav} aria-label={nav.a11y.mainNav}>
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className={`${styles.navItem} ${styles.hasDropdown}`}
                  onMouseEnter={() => openDropdown(item.label)}
                  onMouseLeave={scheduleClose}
                  onFocus={() => openDropdown(item.label)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) scheduleClose();
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={closeAll}
                    aria-haspopup="true"
                    aria-expanded={activeDropdown === item.label}
                    className={`${styles.navLink} ${isActive(item.href) ? styles.active : ""}`}
                  >
                    {item.label}
                    <ChevronDown
                      size={13}
                      className={`${styles.chevron} ${activeDropdown === item.label ? styles.chevronOpen : ""}`}
                    />
                  </Link>
                  <div
                    className={`${styles.dropdown} ${activeDropdown === item.label ? styles.dropdownOpen : ""}`}
                  >
                    <div className={styles.dropdownPanel}>
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className={styles.dropdownLink}
                          onClick={closeAll}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div key={item.label} className={styles.navItem}>
                  <Link
                    href={item.href}
                    onClick={closeAll}
                    className={`${styles.navLink} ${isActive(item.href) ? styles.active : ""}`}
                  >
                    {item.label}
                  </Link>
                </div>
              )
            )}
          </nav>

          <div className={styles.ctaGroup}>
            <ThemeToggle />
            {nav.ctas.map((cta) => (
              <Link
                key={cta.label}
                href={cta.href}
                onClick={closeAll}
                className={`btn btn-${cta.variant} btn-sm ${styles.ctaBtn} ${
                  cta.variant === "secondary" ? styles.ctaSecondary : ""
                }`}
              >
                {cta.label} <ArrowRight size={16} />
              </Link>
            ))}
          </div>

          <button
            className={styles.mobileToggle}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? nav.a11y.closeMenu : nav.a11y.openMenu}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          </div>
        </div>

        {/* Curved lower edge with the gold swoosh, overlapping the top of the page */}
        <svg className={styles.wave} viewBox="0 0 1440 44" preserveAspectRatio="none" aria-hidden="true">
          <path className={styles.waveGold} d="M0 16 C150 12 260 4 380 2 C270 12 170 26 90 36 C55 40 25 43 0 44 Z" />
          <path className={styles.waveFill} d="M0 0 H1440 V0 H520 C380 0 300 6 220 12 C140 19 70 25 0 27 Z" />
        </svg>
      </header>

      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ""}`}
        aria-hidden={!mobileOpen}
      >
        <div className={styles.mobileInner}>
          <div className={styles.mobileCTAs}>
            <ThemeToggle />
            {nav.ctas.map((cta) => (
              <Link
                key={cta.label}
                href={cta.href}
                onClick={closeAll}
                className={`btn btn-${cta.variant} btn-sm`}
                style={{ flex: 1 }}
              >
                {cta.label}
              </Link>
            ))}
          </div>
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className={styles.mobileNavSection}>
              {item.children ? (
                <>
                  <button
                    className={`${styles.mobileNavParent} ${isActive(item.href) ? styles.mobileActive : ""}`}
                    onClick={() =>
                      setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                    }
                    aria-expanded={mobileExpanded === item.label}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      size={16}
                      className={`${styles.chevron} ${mobileExpanded === item.label ? styles.chevronOpen : ""}`}
                    />
                  </button>
                  {mobileExpanded === item.label && (
                    <div className={styles.mobileChildren}>
                      <Link href={item.href} className={styles.mobileChildLink} onClick={closeAll}>
                        {nav.mobileOverviewLabel}
                      </Link>
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className={styles.mobileChildLink}
                          onClick={closeAll}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`${styles.mobileNavLink} ${isActive(item.href) ? styles.mobileActive : ""}`}
                  onClick={closeAll}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
      {mobileOpen && <div className={styles.mobileOverlay} onClick={closeAll} />}
    </>
  );
}
