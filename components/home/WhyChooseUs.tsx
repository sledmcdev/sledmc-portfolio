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
  RotateCcw,
  Sparkles,
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

// Stacked 3D golden bars forming the tree trunk
const TRUNK_BARS = [
  { x: 256, y: 406, w: 88, h: 14, delay: 0.08 },
  { x: 258, y: 384, w: 84, h: 14, delay: 0.14 },
  { x: 260, y: 362, w: 80, h: 14, delay: 0.2 },
  { x: 262, y: 340, w: 76, h: 14, delay: 0.26 },
  { x: 264, y: 318, w: 72, h: 14, delay: 0.32 },
  { x: 266, y: 296, w: 68, h: 14, delay: 0.38 },
  { x: 269, y: 274, w: 64, h: 14, delay: 0.44 },
];

// Organic golden bar branches reaching each of the 6 nodes
const BRANCH_SEGMENTS = [
  // Node 0: Bottom-Left Branch
  { x: 196, y: 268, w: 62, h: 13, rotate: -20, delay: 0.5, nodeId: 0 },
  { x: 132, y: 292, w: 58, h: 13, rotate: -20, delay: 0.58, nodeId: 0 },

  // Node 1: Mid-Left Branch
  { x: 212, y: 230, w: 78, h: 13, rotate: 34, delay: 0.55, nodeId: 1 },
  { x: 142, y: 184, w: 72, h: 13, rotate: 34, delay: 0.63, nodeId: 1 },

  // Node 2: Upper-Left Diagonal
  { x: 244, y: 190, w: 68, h: 13, rotate: 54, delay: 0.6, nodeId: 2 },
  { x: 200, y: 130, w: 64, h: 13, rotate: 54, delay: 0.68, nodeId: 2 },

  // Node 3: Top-Center Crown Shoot
  { x: 268, y: 112, w: 76, h: 13, rotate: -72, delay: 0.72, nodeId: 3 },

  // Node 4: Top-Right Diagonal
  { x: 314, y: 182, w: 74, h: 13, rotate: -48, delay: 0.64, nodeId: 4 },
  { x: 368, y: 122, w: 68, h: 13, rotate: -48, delay: 0.72, nodeId: 4 },

  // Node 5: Lower-Right Branch
  { x: 356, y: 274, w: 68, h: 13, rotate: -24, delay: 0.6, nodeId: 5 },
  { x: 418, y: 248, w: 58, h: 13, rotate: -24, delay: 0.68, nodeId: 5 },
  { x: 390, y: 314, w: 50, h: 13, rotate: 36, delay: 0.74, nodeId: 5 },
];

// 6 Interactive Navy & Gold Nodes + Anchored Card Direction
const TREE_NODES = [
  { id: 0, xPct: 19, yPct: 68, delay: 0.8, side: "left" as const, vPos: "bottom" as const },
  { id: 1, xPct: 16, yPct: 37, delay: 0.86, side: "left" as const, vPos: "middle" as const },
  { id: 2, xPct: 30, yPct: 16, delay: 0.92, side: "left" as const, vPos: "top" as const },
  { id: 3, xPct: 50, yPct: 8, delay: 0.98, side: "right" as const, vPos: "top" as const },
  { id: 4, xPct: 70, yPct: 14, delay: 1.04, side: "right" as const, vPos: "top" as const },
  { id: 5, xPct: 74, yPct: 74, delay: 1.1, side: "right" as const, vPos: "bottom" as const },
];

const SPARKLE_PARTICLES = [
  { left: "24%", top: "28%", size: 5, dur: 3.2, delay: 0.2 },
  { left: "74%", top: "32%", size: 6, dur: 3.8, delay: 0.8 },
  { left: "42%", top: "22%", size: 4, dur: 2.9, delay: 1.1 },
  { left: "62%", top: "54%", size: 5, dur: 3.5, delay: 0.5 },
  { left: "28%", top: "55%", size: 4, dur: 4.0, delay: 1.4 },
];

export default function WhyChooseUs() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [discovered, setDiscovered] = useState<number[]>([]);
  const [replayKey, setReplayKey] = useState(0);

  const handleSelectNode = (index: number) => {
    setActiveIndex(index);
    setDiscovered((prev) => (prev.includes(index) ? prev : [...prev, index]));
  };

  const handleReplay = () => {
    setActiveIndex(null);
    setHoveredIndex(null);
    setDiscovered([]);
    setReplayKey((k) => k + 1);
  };

  const totalItems = WHY_CHOOSE_US.length;
  const activeItem = activeIndex !== null ? WHY_CHOOSE_US[activeIndex] : null;
  const ActiveIcon = activeItem ? ICON_MAP[activeItem.icon] || Award : Award;
  const activeNodeMeta =
    activeIndex !== null ? TREE_NODES[activeIndex % TREE_NODES.length] : null;
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

          {/* Right Column - Large Advanced 3D Golden Bar Tree */}
          <div className={styles.right}>
            <div key={replayKey} className={styles.treeStage}>
              {/* Top Interactive Prompt Bar */}
              <div className={styles.topPromptBar}>
                <span className={styles.promptText}>
                  <Sparkles size={14} className={styles.promptSpark} />
                  {activeItem
                    ? `${activeItem.title} (${discovered.length}/${totalItems})`
                    : "Tap or hover any branch node to explore"}
                </span>

                <button
                  type="button"
                  onClick={handleReplay}
                  title="Replay Tree Growth"
                  className={styles.replayBtn}
                >
                  <RotateCcw size={14} />
                </button>
              </div>

              {/* Large Interactive Tree Canvas */}
              <div className={styles.treeCanvas}>
                {/* Ambient Radial Aura */}
                <div className={styles.treeAura} />

                {/* Floating Golden Particles */}
                {SPARKLE_PARTICLES.map((p, idx) => (
                  <motion.span
                    key={idx}
                    className={styles.goldParticle}
                    style={{
                      left: p.left,
                      top: p.top,
                      width: p.size,
                      height: p.size,
                    }}
                    animate={{
                      y: [0, -14, 0],
                      opacity: [0.25, 0.95, 0.25],
                      scale: [0.85, 1.25, 0.85],
                    }}
                    transition={{
                      duration: p.dur,
                      delay: p.delay,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}

                {/* Pure-Code 3D Golden Bar Tree SVG */}
                <svg
                  viewBox="0 0 600 450"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.treeSvg}
                >
                  <defs>
                    <linearGradient
                      id="sledmcGold3D"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#f5c443" />
                      <stop offset="50%" stopColor="#d99b26" />
                      <stop offset="100%" stopColor="#a87010" />
                    </linearGradient>

                    <linearGradient
                      id="sledmcGoldLit"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="#fde047" />
                      <stop offset="50%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#fde047" />
                    </linearGradient>

                    <radialGradient id="pedestalGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="rgba(217, 155, 38, 0.35)" />
                      <stop offset="65%" stopColor="rgba(0, 34, 102, 0.12)" />
                      <stop offset="100%" stopColor="rgba(0, 34, 102, 0)" />
                    </radialGradient>

                    <filter
                      id="barDepthShadow"
                      x="-20%"
                      y="-20%"
                      width="140%"
                      height="160%"
                    >
                      <feDropShadow
                        dx="0"
                        dy="5"
                        stdDeviation="3.5"
                        floodColor="#061433"
                        floodOpacity="0.22"
                      />
                    </filter>
                  </defs>

                  {/* Ground Pedestal Shadow */}
                  <ellipse
                    cx="300"
                    cy="432"
                    rx="115"
                    ry="13"
                    fill="url(#pedestalGlow)"
                  />

                  {/* Stacked Golden Trunk Bars */}
                  <g filter="url(#barDepthShadow)">
                    {TRUNK_BARS.map((bar, idx) => (
                      <motion.rect
                        key={`trunk-${idx}`}
                        x={bar.x}
                        y={bar.y}
                        width={bar.w}
                        height={bar.h}
                        rx={6}
                        fill="url(#sledmcGold3D)"
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileInView={{ scaleX: 1, opacity: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                          delay: bar.delay,
                          type: "spring",
                          stiffness: 220,
                          damping: 18,
                        }}
                        style={{
                          transformOrigin: `${bar.x + bar.w / 2}px ${bar.y + bar.h / 2
                            }px`,
                        }}
                      />
                    ))}

                    {/* Branching Golden Segments */}
                    {BRANCH_SEGMENTS.map((seg, idx) => {
                      const cx = seg.x + seg.w / 2;
                      const cy = seg.y + seg.h / 2;
                      const isBranchActive =
                        activeIndex === seg.nodeId ||
                        hoveredIndex === seg.nodeId;

                      return (
                        <g
                          key={`branch-${idx}`}
                          transform={`rotate(${seg.rotate} ${cx} ${cy})`}
                        >
                          <motion.rect
                            x={seg.x}
                            y={seg.y}
                            width={seg.w}
                            height={seg.h}
                            rx={6}
                            fill={
                              isBranchActive
                                ? "url(#sledmcGoldLit)"
                                : "url(#sledmcGold3D)"
                            }
                            initial={{ scaleX: 0, opacity: 0 }}
                            whileInView={{ scaleX: 1, opacity: 1 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{
                              delay: seg.delay,
                              type: "spring",
                              stiffness: 210,
                              damping: 18,
                            }}
                            style={{ transformOrigin: `${cx}px ${cy}px` }}
                          />
                        </g>
                      );
                    })}
                  </g>
                </svg>

                {/* 6 Interactive Navy & Gold Circular Nodes */}
                {WHY_CHOOSE_US.map((item, i) => {
                  const pos = TREE_NODES[i % TREE_NODES.length];
                  const NodeIcon = ICON_MAP[item.icon] || Award;
                  const isActive = activeIndex === i;
                  const isDiscovered = discovered.includes(i);

                  return (
                    <motion.button
                      key={item.title}
                      type="button"
                      aria-label={item.title}
                      onMouseEnter={() => {
                        setHoveredIndex(i);
                        handleSelectNode(i);
                      }}
                      onMouseLeave={() => setHoveredIndex(null)}
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
                      className={`${styles.treeNode} ${isActive ? styles.treeNodeActive : ""
                        } ${isDiscovered ? styles.treeNodeDiscovered : ""}`}
                    >
                      <span className={styles.nodePulse} />
                      <span className={styles.nodeOrbitRing} />
                      <span className={styles.nodeCircle}>
                        <NodeIcon size={24} strokeWidth={2} />
                      </span>
                      <span className={styles.nodeStepBadge}>0{i + 1}</span>
                    </motion.button>
                  );
                })}

                {/* Node-Anchored Card Popover */}
                <AnimatePresence mode="wait">
                  {activeItem && activeIndex !== null && activeNodeMeta && (
                    <motion.div
                      key={activeItem.title}
                      initial={{ opacity: 0, scale: 0.9, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.92, y: -6 }}
                      transition={{
                        duration: 0.24,
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
                          : styles.cardAlignTop
                        }`}
                    >
                      <button
                        type="button"
                        aria-label="Close card"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveIndex(null);
                        }}
                        className={styles.closeCardBtn}
                      >
                        <X size={14} />
                      </button>

                      <div className={styles.fullBgImageWrap}>
                        <img
                          src={activeBgImage}
                          alt={activeItem.title}
                          className={styles.fullBgImage}
                        />
                      </div>

                      <div className={styles.navyAtmosphericOverlay} />

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

              {/* Bottom 6-Dot Interactive Selector Bar */}
              <div className={styles.dotsBar}>
                {WHY_CHOOSE_US.map((item, i) => (
                  <button
                    key={item.title}
                    type="button"
                    aria-label={`View ${item.title}`}
                    onClick={() => handleSelectNode(i)}
                    className={`${styles.dotPill} ${activeIndex === i ? styles.dotPillActive : ""
                      } ${discovered.includes(i) ? styles.dotPillVisited : ""}`}
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