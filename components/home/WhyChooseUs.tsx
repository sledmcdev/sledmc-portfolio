"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Network,
  UserCheck,
  ShieldCheck,
  Zap,
  Handshake,
  X,
} from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { WHY_CHOOSE_US } from "@/lib/data";
import content from "@/data/pages/home/why-choose-us.json";
import styles from "./WhyChooseUs.module.css";

const ICON_MAP: Record<string, React.ElementType> = {
  Award,
  Network,
  UserCheck,
  ShieldCheck,
  Zap,
  Handshake,
};

const DEFAULT_CARD_IMAGES = [
  "/images/why-choose-us/industry-expertise.png",
  "/images/why-choose-us/candidate-network.png",
  "/images/why-choose-us/personalised-recruitment.png",
  "/images/why-choose-us/quality-screening.png",
  "/images/why-choose-us/fast-turnaround.png",
  "/images/why-choose-us/long-term-partnerships.jpeg",
];

// Branch node coordinates + card open direction
const BRANCH_NODES = [
  { id: 0, xPct: 33, yPct: 26, delay: 1.15, side: "left" as const, vPos: "top" as const },
  { id: 1, xPct: 68, yPct: 24, delay: 1.25, side: "right" as const, vPos: "top" as const },
  { id: 2, xPct: 44, yPct: 45, delay: 1.35, side: "left" as const, vPos: "middle" as const },
  { id: 3, xPct: 63, yPct: 50, delay: 1.45, side: "right" as const, vPos: "middle" as const },
  { id: 4, xPct: 33, yPct: 60, delay: 1.55, side: "left" as const, vPos: "bottom" as const },
  { id: 5, xPct: 75, yPct: 61, delay: 1.65, side: "right" as const, vPos: "bottom" as const },
];

// Leaves detaching from the canopy, swaying side-to-side all the way until landing on the ground
const FALLING_TO_GROUND_LEAVES = [
  { startX: "34%", startY: "32%", dropY: 228, sway: 22, size: 12, dur: 5.4, delay: 1.8, repeatDelay: 2.2 },
  { startX: "64%", startY: "28%", dropY: 245, sway: -25, size: 11, dur: 5.9, delay: 3.4, repeatDelay: 2.6 },
  { startX: "46%", startY: "22%", dropY: 268, sway: 26, size: 12, dur: 6.3, delay: 5.1, repeatDelay: 2.4 },
  { startX: "29%", startY: "50%", dropY: 162, sway: -18, size: 10, dur: 4.8, delay: 6.7, repeatDelay: 2.8 },
  { startX: "69%", startY: "48%", dropY: 170, sway: 20, size: 11, dur: 5.0, delay: 8.2, repeatDelay: 2.5 },
];

// Fallen leaves resting naturally on the ground around the base of the trunk
const GROUND_LEAVES = [
  { left: "30%", bottom: "6.2%", rotate: -18, scale: 1.0 },
  { left: "33%", bottom: "5.0%", rotate: 34, scale: 1.1 },
  { left: "36%", bottom: "6.8%", rotate: -28, scale: 0.95 },
  { left: "39%", bottom: "4.9%", rotate: 16, scale: 1.05 },
  { left: "42%", bottom: "6.5%", rotate: -42, scale: 0.9 },
  { left: "45%", bottom: "4.7%", rotate: 25, scale: 0.96 },
  { left: "48%", bottom: "6.0%", rotate: -14, scale: 0.88 },
  { left: "53%", bottom: "6.3%", rotate: 28, scale: 0.95 },
  { left: "56%", bottom: "4.8%", rotate: -36, scale: 1.08 },
  { left: "59%", bottom: "6.7%", rotate: 19, scale: 0.92 },
  { left: "62%", bottom: "5.2%", rotate: -22, scale: 1.04 },
  { left: "65%", bottom: "6.4%", rotate: 41, scale: 0.92 },
  { left: "68%", bottom: "5.4%", rotate: -15, scale: 0.86 },
  { left: "71%", bottom: "6.6%", rotate: 30, scale: 0.94 },
];

// Subtle fireflies floating near the tree in Dark Mode
const NIGHT_FIREFLIES = [
  { left: "26%", top: "34%", dx: 12, dy: -16, dur: 4.2, delay: 0.2 },
  { left: "40%", top: "20%", dx: -14, dy: -12, dur: 4.8, delay: 0.9 },
  { left: "56%", top: "26%", dx: 15, dy: -18, dur: 4.5, delay: 1.4 },
  { left: "72%", top: "38%", dx: -12, dy: -14, dur: 5.1, delay: 0.6 },
  { left: "34%", top: "52%", dx: 10, dy: -15, dur: 4.4, delay: 1.8 },
  { left: "62%", top: "56%", dx: -15, dy: -12, dur: 4.9, delay: 1.1 },
];

export default function WhyChooseUs() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [discovered, setDiscovered] = useState<number[]>([]);

  const handleSelectNode = (index: number) => {
    setActiveIndex(index);
    setDiscovered((prev) => (prev.includes(index) ? prev : [...prev, index]));
  };

  const totalItems = WHY_CHOOSE_US.length;
  const activeItem = activeIndex !== null ? WHY_CHOOSE_US[activeIndex] : null;
  const ActiveIcon = activeItem ? ICON_MAP[activeItem.icon] || Award : Award;
  const activeNodeMeta =
    activeIndex !== null ? BRANCH_NODES[activeIndex % BRANCH_NODES.length] : null;
  const activeBgImage =
    activeIndex !== null
      ? (activeItem as { image?: string })?.image ||
      DEFAULT_CARD_IMAGES[activeIndex % totalItems]
      : "";

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.inner}>
          {/* Left Column */}
          <div className={styles.left}>
            <SectionHeader
              label={content.label}
              title={content.title}
              subtitle={content.subtitle}
            />
            <div className={styles.highlightBox}>
              <p>{content.highlightQuote}</p>
            </div>
          </div>

          {/* Right Column - Real Cloudy Sun Sky (Light) & Real Moon Star Sky (Dark) */}
          <div className={styles.right}>
            <div className={styles.treeStage}>
              <div className={styles.treeCanvas}>
                {/* =========================================================
                    REAL SKY PHOTO LAYER (Seamless Radial Edge-Fade Blend)
                   ========================================================= */}
                <div className={styles.skyPhotoWrap} aria-hidden="true">
                  {/* Light Mode: Real Cloudy Sun Sky */}
                  <img
                    src="/images/why-choose-us/day-sky.jpeg"
                    alt=""
                    className={`${styles.skyPhotoImg} ${styles.daySkyPhoto}`}
                  />

                  {/* Dark Mode: Real Moon & Starry Night Sky */}
                  <img
                    src="/images/why-choose-us/night-sky.jpeg"
                    alt=""
                    className={`${styles.skyPhotoImg} ${styles.nightSkyPhoto}`}
                  />
                </div>

                {/* Subtle Nighttime Fireflies (Dark Mode only) */}
                <div className={styles.firefliesLayer} aria-hidden="true">
                  {NIGHT_FIREFLIES.map((ff, idx) => (
                    <motion.span
                      key={`firefly-${idx}`}
                      className={styles.fireflyDot}
                      style={{ left: ff.left, top: ff.top }}
                      animate={{
                        x: [0, ff.dx, -ff.dx * 0.5, 0],
                        y: [0, ff.dy, ff.dy * 0.4, 0],
                        opacity: [0.15, 0.9, 0.3, 0.9, 0.15],
                        scale: [0.8, 1.3, 0.9, 1.25, 0.8],
                      }}
                      transition={{
                        duration: ff.dur,
                        delay: ff.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>

                {/* Stage 1: Bare Trunk Grows First, Then Auto-Hides Once Full Tree Appears */}
                <motion.img
                  src="/images/why-choose-us/tree-trunk.jpeg"
                  alt="Growing Tree Trunk"
                  className={`${styles.treeLayerImg} ${styles.trunkLayer}`}
                  initial={{ scaleY: 0.08, scaleX: 0.55, opacity: 0 }}
                  whileInView={{
                    scaleY: [0.08, 1, 1],
                    scaleX: [0.55, 1, 1],
                    opacity: [0, 1, 0],
                  }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 1.55,
                    times: [0, 0.58, 1],
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ transformOrigin: "50% 92%" }}
                />

                {/* Stage 2: Full Thriving Tree (Natural Green in Both Modes, Moon-Shaded in Dark Mode) */}
                <motion.img
                  src="/images/why-choose-us/tree-full.jpeg"
                  alt="Full Thriving Tree"
                  className={`${styles.treeLayerImg} ${styles.canopyLayer}`}
                  initial={{ scale: 0.78, opacity: 0, filter: "blur(5px)" }}
                  whileInView={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    delay: 0.65,
                    duration: 0.85,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ transformOrigin: "50% 82%" }}
                />

                {/* Dark Mode Cast Night Shadow Grounding the Tree */}
                <div className={styles.nightTreeCastShadow} aria-hidden="true" />

                {/* =========================================================
                    Swaying Leaves Fluttering All the Way Down Until Landing on Ground
                   ========================================================= */}
                {FALLING_TO_GROUND_LEAVES.map((leaf, idx) => (
                  <motion.span
                    key={`flutter-leaf-${idx}`}
                    className={styles.flutteringLeaf}
                    style={{
                      left: leaf.startX,
                      top: leaf.startY,
                      width: leaf.size,
                      height: leaf.size * 0.58,
                    }}
                    initial={{ opacity: 0, x: 0, y: 0, rotate: 0 }}
                    animate={{
                      opacity: [0, 0.95, 0.95, 0.95, 0.9, 0],
                      x: [
                        0,
                        leaf.sway,
                        -leaf.sway * 0.85,
                        leaf.sway * 0.75,
                        -leaf.sway * 0.4,
                        leaf.sway * 0.2,
                      ],
                      y: [
                        0,
                        leaf.dropY * 0.24,
                        leaf.dropY * 0.52,
                        leaf.dropY * 0.78,
                        leaf.dropY,
                        leaf.dropY,
                      ],
                      rotate: [0, 42, -38, 32, -18, 12],
                    }}
                    transition={{
                      delay: leaf.delay,
                      duration: leaf.dur,
                      times: [0, 0.22, 0.48, 0.72, 0.88, 1],
                      repeat: Infinity,
                      repeatDelay: leaf.repeatDelay,
                      ease: "easeInOut",
                    }}
                  />
                ))}

                {/* Ground Fallen Leaves */}
                <motion.div
                  className={styles.groundLeavesGroup}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.35, duration: 0.9 }}
                >
                  {GROUND_LEAVES.map((gl, idx) => (
                    <span
                      key={`ground-leaf-${idx}`}
                      className={styles.groundLeaf}
                      style={{
                        left: gl.left,
                        bottom: gl.bottom,
                        transform: `rotate(${gl.rotate}deg) scale(${gl.scale})`,
                      }}
                    />
                  ))}
                </motion.div>

                {/* Stage 3: 6 Interactive Branch Nodes */}
                {WHY_CHOOSE_US.map((item, i) => {
                  const pos = BRANCH_NODES[i % BRANCH_NODES.length];
                  const NodeIcon = ICON_MAP[item.icon] || Award;
                  const isActive = activeIndex === i;
                  const isDiscovered = discovered.includes(i);

                  return (
                    <motion.button
                      key={item.title}
                      type="button"
                      aria-label={item.title}
                      onMouseEnter={() => handleSelectNode(i)}
                      onClick={() => handleSelectNode(i)}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: pos.delay,
                        type: "spring",
                        stiffness: 260,
                        damping: 18,
                      }}
                      style={{
                        left: `${pos.xPct}%`,
                        top: `${pos.yPct}%`,
                      }}
                      className={`${styles.branchNode} ${isActive ? styles.branchNodeActive : ""
                        } ${isDiscovered ? styles.branchNodeVisited : ""}`}
                    >
                      <span className={styles.nodePulse} />
                      <span className={styles.nodeGoldHalo} />
                      <span className={styles.nodeRing}>
                        <NodeIcon size={20} strokeWidth={2} />
                      </span>
                      <span className={styles.keyNumberTag}>0{i + 1}</span>
                    </motion.button>
                  );
                })}

                {/* Node-Anchored Card Popover */}
                <AnimatePresence mode="wait">
                  {activeItem && activeIndex !== null && activeNodeMeta && (
                    <motion.div
                      key={activeItem.title}
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.92, y: -8 }}
                      transition={{
                        duration: 0.25,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      style={
                        {
                          "--node-x": `${activeNodeMeta.xPct}%`,
                          "--node-y": `${activeNodeMeta.yPct}%`,
                        } as React.CSSProperties
                      }
                      className={`${styles.anchoredCard} ${activeNodeMeta.side === "left"
                          ? styles.cardOpenRight
                          : styles.cardOpenLeft
                        } ${activeNodeMeta.vPos === "bottom"
                          ? styles.cardAlignBottom
                          : activeNodeMeta.vPos === "middle"
                            ? styles.cardAlignMiddle
                            : styles.cardAlignTop
                        }`}
                    >
                      {/* Close Button */}
                      <button
                        type="button"
                        aria-label="Close card"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveIndex(null);
                        }}
                        className={styles.closeCardBtn}
                      >
                        <X size={13} />
                      </button>

                      {/* Background Image with Atmospheric Fade */}
                      <div className={styles.fullBgImageWrap}>
                        <img
                          src={activeBgImage}
                          alt={activeItem.title}
                          className={styles.fullBgImage}
                        />
                      </div>

                      <div className={styles.navyAtmosphericOverlay} />

                      {/* Card Foreground Content */}
                      <div className={styles.cardContent}>
                        <div className={styles.cardHeader}>
                          <div className={styles.iconWrap}>
                            <ActiveIcon size={21} strokeWidth={1.9} />
                          </div>
                          <h3 className={styles.itemTitle}>
                            {activeItem.title}
                          </h3>
                        </div>

                        <p className={styles.itemDesc}>
                          {activeItem.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom 6-Dot Progress Indicator */}
              <div className={styles.treeDots}>
                {WHY_CHOOSE_US.map((item, i) => (
                  <button
                    key={item.title}
                    type="button"
                    aria-label={`Select ${item.title}`}
                    onClick={() => handleSelectNode(i)}
                    className={`${styles.dotItem} ${activeIndex === i ? styles.dotItemActive : ""
                      } ${discovered.includes(i) ? styles.dotItemVisited : ""}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}