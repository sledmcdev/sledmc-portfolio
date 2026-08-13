"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import styles from "./Header.module.css";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "Our Story", href: "/about#our-story" },
      { label: "Founder & Leadership", href: "/about#founder" },
      { label: "Vision & Values", href: "/about#vision" },
      { label: "Awards & Recognition", href: "/about#awards" },
    ],
  },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Our Approach", href: "/our-approach" },
  { label: "Success Stories", href: "/success-stories" },
  {
    label: "Job Seekers",
    href: "/job-seekers",
    children: [
      { label: "Find Jobs", href: "/job-seekers/find-jobs" },
      { label: "Submit Your CV", href: "/job-seekers/submit-cv" },
      { label: "Candidate Services", href: "/job-seekers/candidate-services" },
      { label: "Success Stories", href: "/job-seekers/success-stories" },
      { label: "Career Resources", href: "/job-seekers/career-resources" },
      { label: "Candidate FAQ", href: "/job-seekers/faq" },
    ],
  },
  {
    label: "Organizations",
    href: "/organizations",
    children: [
      { label: "Recruitment Services", href: "/organizations/recruitment-services" },
      { label: "Why Partner With Us", href: "/organizations/why-partner" },
      { label: "Partnership Models", href: "/organizations/partnership-models" },
      { label: "Employer Success Stories", href: "/organizations/success-stories" },
      { label: "Client Testimonials", href: "/organizations/testimonials" },
      { label: "Partner With Us", href: "/organizations/partner-with-us" },
    ],
  },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className={`container ${styles.inner}`}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <div className={styles.logoMark}>
              <span>S</span>
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoMain}>SLEDMC</span>
              <span className={styles.logoSub}>RECRUITMENT</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav} aria-label="Main navigation">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className={`${styles.navItem} ${styles.hasDropdown}`}
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`${styles.navLink} ${pathname.startsWith(item.href) && item.href !== "/" ? styles.active : ""}`}
                  >
                    {item.label}
                    <ChevronDown size={13} />
                  </Link>
                  <div className={`${styles.dropdown} ${activeDropdown === item.label ? styles.dropdownOpen : ""}`}>
                    {item.children.map((child) => (
                      <Link key={child.label} href={child.href} className={styles.dropdownLink}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div key={item.label} className={styles.navItem}>
                  <Link
                    href={item.href}
                    className={`${styles.navLink} ${
                      (pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href)))
                        ? styles.active
                        : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </div>
              )
            )}
          </nav>

          {/* CTA Buttons */}
          <div className={styles.ctaGroup}>
            <Link href="/job-seekers/find-jobs" className={`btn btn-secondary btn-sm ${styles.ctaBtn}`}>
              Find a Job <ArrowUpRight size={14} />
            </Link>
            <Link href="/organizations/partner-with-us" className={`btn btn-primary btn-sm ${styles.ctaBtn}`}>
              Find Talent <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className={styles.mobileToggle}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ""}`}>
        <div className={styles.mobileInner}>
          <div className={styles.mobileCTAs}>
            <Link href="/job-seekers/find-jobs" className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
              Find a Job <ArrowUpRight size={14} />
            </Link>
            <Link href="/organizations/partner-with-us" className="btn btn-primary btn-sm" style={{ flex: 1 }}>
              Find Talent <ArrowUpRight size={14} />
            </Link>
          </div>
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className={styles.mobileNavSection}>
              {item.children ? (
                <>
                  <button
                    className={styles.mobileNavParent}
                    onClick={() =>
                      setActiveDropdown(activeDropdown === item.label ? null : item.label)
                    }
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      size={16}
                      style={{
                        transform: activeDropdown === item.label ? "rotate(180deg)" : "none",
                        transition: "transform 0.2s",
                      }}
                    />
                  </button>
                  {activeDropdown === item.label && (
                    <div className={styles.mobileChildren}>
                      {item.children.map((child) => (
                        <Link key={child.label} href={child.href} className={styles.mobileChildLink}>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link href={item.href} className={styles.mobileNavLink}>
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
      {mobileOpen && (
        <div className={styles.mobileOverlay} onClick={() => setMobileOpen(false)} />
      )}
    </>
  );
}
