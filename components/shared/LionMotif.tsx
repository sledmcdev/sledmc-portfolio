import styles from "./LionMotif.module.css";

type Props = {
  /** Rendered width; height follows the artwork's aspect ratio. */
  width?: number | string;
  opacity?: number;
  /** Mirror horizontally so the lion faces right. */
  flip?: boolean;
  className?: string;
};

/**
 * Decorative gold line-art of the Sri Lankan flag lion.
 * The artwork lives in /images/brand/lion-motif.png (outline + faint fill) and is applied as a CSS mask,
 * so it always takes the theme's accent colour.
 */
export default function LionMotif({ width = 520, opacity = 0.08, flip = false, className = "" }: Props) {
  return (
    <span
      aria-hidden="true"
      className={`${styles.lion} ${flip ? styles.flip : ""} ${className}`}
      style={{ width, opacity }}
    />
  );
}
