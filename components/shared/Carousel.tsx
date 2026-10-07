"use client";

import { Children, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ui from "@/data/site/ui.json";
import styles from "./Carousel.module.css";

const t = ui.carousel;

type Props = {
  children: ReactNode;
  /** Accessible name for the carousel region. */
  label: string;
  /** Slides visible at a time on desktop / tablet / mobile. */
  perView?: { desktop: number; tablet: number; mobile: number };
  gap?: number;
  className?: string;
};

/** Scroll-snap carousel with prev/next buttons, dots and keyboard arrows. */
export default function Carousel({
  children,
  label,
  perView = { desktop: 3, tablet: 2, mobile: 1 },
  gap = 24,
  className = "",
}: Props) {
  const slides = Children.toArray(children);
  const trackRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number>();
  const [active, setActive] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(slides.length > 1);

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setCanPrev(track.scrollLeft > 4);
    setCanNext(track.scrollLeft < max - 4);
    let nearest = 0;
    let best = Infinity;
    Array.from(track.children).forEach((el, i) => {
      const d = Math.abs((el as HTMLElement).offsetLeft - track.offsetLeft - track.scrollLeft);
      if (d < best) {
        best = d;
        nearest = i;
      }
    });
    // At the very end, highlight the last dot even if the last slide isn't left-aligned
    setActive(track.scrollLeft >= max - 4 ? slides.length - 1 : nearest);
  }, [slides.length]);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  const goTo = (i: number) => {
    const track = trackRef.current;
    const slide = track?.children[i] as HTMLElement | undefined;
    if (!track || !slide) return;
    track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: "smooth" });
  };

  const step = (dir: 1 | -1) => {
    const track = trackRef.current;
    const first = track?.children[0] as HTMLElement | undefined;
    if (!track || !first) return;
    track.scrollBy({ left: dir * (first.clientWidth + gap), behavior: "smooth" });
  };

  const onScroll = () => {
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(sync);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    }
  };

  const style = {
    "--gap": `${gap}px`,
    "--per-desktop": perView.desktop,
    "--per-tablet": perView.tablet,
    "--per-mobile": perView.mobile,
  } as React.CSSProperties;

  const showControls = canPrev || canNext;

  return (
    <div className={`${styles.carousel} ${className}`} style={style} role="region" aria-roledescription={t.roleCarousel} aria-label={label}>
      <div ref={trackRef} className={styles.track} onScroll={onScroll} onKeyDown={onKeyDown} tabIndex={0}>
        {slides.map((slide, i) => (
          <div
            key={i}
            className={styles.slide}
            role="group"
            aria-roledescription={t.roleSlide}
            aria-label={t.slidePosition.replace("{n}", String(i + 1)).replace("{total}", String(slides.length))}
          >
            {slide}
          </div>
        ))}
      </div>

      {showControls && (
        <div className={styles.controls}>
          <div className={styles.dots}>
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
                onClick={() => goTo(i)}
                aria-label={t.goTo.replace("{n}", String(i + 1))}
                aria-current={i === active}
              />
            ))}
          </div>
          <div className={styles.arrows}>
            <button type="button" className={styles.arrow} onClick={() => step(-1)} disabled={!canPrev} aria-label={t.previous}>
              <ChevronLeft size={20} />
            </button>
            <button type="button" className={styles.arrow} onClick={() => step(1)} disabled={!canNext} aria-label={t.next}>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
