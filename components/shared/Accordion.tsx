"use client";

import { ReactNode, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import styles from "./Accordion.module.css";

export type AccordionItem = {
  id: string;
  header: ReactNode;
  content: ReactNode;
};

type Props = {
  items: AccordionItem[];
  defaultOpenIds?: string[];
  /** When false, opening one item closes the others. */
  allowMultiple?: boolean;
  /** Number of columns on wide screens (collapses to one on mobile). */
  columns?: 1 | 2;
  className?: string;
};

export default function Accordion({
  items,
  defaultOpenIds = [],
  allowMultiple = true,
  columns = 1,
  className = "",
}: Props) {
  const [open, setOpen] = useState<string[]>(defaultOpenIds);
  const baseId = useId();
  const reduceMotion = useReducedMotion();

  const toggle = (id: string) =>
    setOpen((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : allowMultiple ? [...prev, id] : [id]
    );

  return (
    <div className={`${styles.accordion} ${columns === 2 ? styles.twoCol : ""} ${className}`}>
      {items.map((item) => {
        const isOpen = open.includes(item.id);
        const headerId = `${baseId}-${item.id}-header`;
        const panelId = `${baseId}-${item.id}-panel`;
        return (
          <div key={item.id} className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}>
            <button
              id={headerId}
              type="button"
              className={styles.trigger}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(item.id)}
            >
              <span className={styles.triggerContent}>{item.header}</span>
              <span className={styles.chevron} aria-hidden="true">
                <ChevronDown size={18} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  className={styles.panel}
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className={styles.panelInner}>{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
