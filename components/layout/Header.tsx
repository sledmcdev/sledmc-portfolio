"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import ThemeToggle from "@/components/theme/ThemeToggle";
import nav from "@/data/site/navigation.json";
import styles from "./Header.module.css";

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const NAV_ITEMS: NavItem[] = nav.items;
const CLOSE_DELAY = 180;

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
        <div className={`container ${styles.inner}`}>
          <Link href="/" className={styles.logo} onClick={closeAll}>
            <div className={styles.logoWrapper}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={nav.logo.src} alt={nav.logo.alt} className={styles.logoImg} />
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoMain}>{nav.logo.title}</span>
              <span className={styles.logoSub}>{nav.logo.subtitle}</span>
            </div>
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
                {cta.label} <ArrowUpRight size={14} />
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
