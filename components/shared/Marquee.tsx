import styles from "./Marquee.module.css";

interface MarqueeProps {
  children: React.ReactNode;
  /** Seconds for one full loop */
  duration?: number;
  reverse?: boolean;
  gap?: number;
  className?: string;
}

/**
 * Infinite single-row auto-scrolling carousel.
 * Content is rendered twice so the -50% translate loops seamlessly.
 */
export default function Marquee({
  children,
  duration = 40,
  reverse = false,
  gap = 24,
  className = "",
}: MarqueeProps) {
  return (
    <div
      className={`${styles.marquee} ${className}`}
      style={
        {
          "--marquee-duration": `${duration}s`,
          "--marquee-gap": `${gap}px`,
        } as React.CSSProperties
      }
    >
      <div className={`${styles.track} ${reverse ? styles.reverse : ""}`}>
        <div className={styles.group}>{children}</div>
        <div className={styles.group} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
