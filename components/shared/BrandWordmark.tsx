/* eslint-disable @next/next/no-img-element */
import styles from "./BrandWordmark.module.css";

interface BrandWordmarkProps {
  /** Sizes the wordmark: set a height (width follows the aspect ratio) or a width. */
  className?: string;
  alt?: string;
  /** Watermark use: hidden from screen readers. */
  decorative?: boolean;
}

/** SLEDMC text logo. Ships a navy version for the light theme and a white version for the dark
 *  theme; CSS picks one from the <html data-theme> attribute, so there is no flash on load. */
export default function BrandWordmark({ className = "", alt = "SLEDMC", decorative = false }: BrandWordmarkProps) {
  const text = decorative ? "" : alt;
  return (
    <span className={`${styles.wordmark} ${className}`} aria-hidden={decorative || undefined}>
      <img src="/images/brand/sledmc-wordmark.png" alt={text} className={styles.onLight} draggable={false} />
      <img src="/images/brand/sledmc-wordmark-dark.png" alt={text} className={styles.onDark} draggable={false} />
    </span>
  );
}
