"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileText,
  TrendingUp,
  Sparkles,
  Play,
  Clock,
  User,
  Calendar,
  Eye,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  X,
} from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import hero from "@/data/pages/insights/hero.json";
import articlesData from "@/data/pages/insights/articles.json";
import styles from "./Insights.module.css";

type AdminArticle = (typeof articlesData.adminArticles)[number];
type YoutubeVideo = (typeof articlesData.youtubeVideos)[number];

export default function InsightsContent() {
  const [activeTab, setActiveTab] = useState<"all" | "admin" | "videos">("all");
  const [activeVideo, setActiveVideo] = useState<YoutubeVideo | null>(null);
  const [activeArticle, setActiveArticle] = useState<AdminArticle | null>(null);

  const adminArticles = articlesData.adminArticles as AdminArticle[];
  const youtubeVideos = articlesData.youtubeVideos as YoutubeVideo[];
  const extraArticles = articlesData.extraArticles;

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <SectionHeader
            label={hero.label}
            title={hero.title}
            subtitle={hero.subtitle}
            center
            light
          />
          {/* Tab Navigation */}
          <div className={styles.tabNav}>
            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === "all" ? styles.tabActive : ""}`}
              onClick={() => setActiveTab("all")}
            >
              All Content
            </button>
            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === "admin" ? styles.tabActive : ""}`}
              onClick={() => setActiveTab("admin")}
            >
              Admin Editorial & Policy
            </button>
            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === "videos" ? styles.tabActive : ""}`}
              onClick={() => setActiveTab("videos")}
            >
              Public Video Library
            </button>
          </div>
        </div>
      </section>

      {/* ADMIN ARTICLES SECTION */}
      {(activeTab === "all" || activeTab === "admin") && (
        <section className={`section ${styles.section}`}>
          <div className="container">
            <div className={styles.sectionHeading}>
              <div>
                <span className="mono-eyebrow">OFFICIAL EDITORIAL BOARD</span>
                <h2 className={styles.sectionTitle}>Articles Written by Admins</h2>
                <p className={styles.sectionSubtitle}>
                  Authoritative policy analysis, regulatory updates, and vocational guidelines directly from SLEDMC leadership.
                </p>
              </div>
            </div>

            <div className={styles.adminGrid}>
              {adminArticles.map((art) => (
                <article
                  key={art.id}
                  className={`${styles.adminCard} ${art.featured ? styles.adminCardFeatured : ""}`}
                  onClick={() => setActiveArticle(art)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Read article: ${art.title}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveArticle(art);
                    }
                  }}
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.tagGroup}>
                      <span className="tag tag-gold">{art.category}</span>
                      {art.featured && (
                        <span className={styles.verifiedBadge}>
                          <ShieldCheck size={12} /> SLEDMC Verified
                        </span>
                      )}
                    </div>
                    <span className={styles.readTime}>
                      <Clock size={13} /> {art.readTime}
                    </span>
                  </div>

                  <h3 className={styles.adminTitle}>{art.title}</h3>
                  <p className={styles.adminDesc}>{art.description}</p>

                  <div className={styles.authorBar}>
                    <div className={styles.authorInfo}>
                      <User size={16} className={styles.authorIcon} />
                      <div>
                        <strong className={styles.authorName}>{art.author}</strong>
                        <span className={styles.authorRole}>{art.authorRole}</span>
                      </div>
                    </div>
                    <div className={styles.publishDate}>
                      <Calendar size={13} />
                      <span>{art.publishedAt}</span>
                    </div>
                  </div>

                  <div className={styles.cardAction}>
                    <span className={styles.readLink}>
                      Read Full Admin Briefing <ChevronRight size={15} />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* YOUTUBE PUBLIC VIDEOS SECTION */}
      {(activeTab === "all" || activeTab === "videos") && (
        <section className={`section ${styles.sectionDark}`}>
          <div className="container">
            <div className={styles.sectionHeading}>
              <div>
                <span className="mono-eyebrow">MULTIMEDIA & PRACTICAL DEMONSTRATIONS</span>
                <h2 className={styles.sectionTitle}>Public Video Broadcasts & Case Studies</h2>
                <p className={styles.sectionSubtitle}>
                  Watch simulator walk-throughs, candidate airport departures, and in-depth employer trade testing footage.
                </p>
              </div>
            </div>

            <div className={styles.videoGrid}>
              {youtubeVideos.map((vid) => (
                <div key={vid.id} className={styles.videoCard}>
                  {/* YouTube Thumbnail & Play Trigger */}
                  <div
                    className={styles.videoThumbnailWrapper}
                    onClick={() => setActiveVideo(vid)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Play video: ${vid.title}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveVideo(vid);
                      }
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                      alt={vid.title}
                      className={styles.videoThumbImg}
                      loading="lazy"
                    />
                    <div className={styles.playButtonOverlay}>
                      <div className={styles.playIconCircle}>
                        <Play size={24} fill="#0b1422" color="#0b1422" style={{ marginLeft: 3 }} />
                      </div>
                    </div>
                    <span className={styles.videoDuration}>{vid.duration}</span>
                  </div>

                  <div className={styles.videoInfo}>
                    <div className={styles.videoMetaRow}>
                      <span className="tag tag-navy">{vid.category}</span>
                      <span className={styles.videoViews}>
                        <Eye size={12} /> {vid.views}
                      </span>
                    </div>
                    <h3 className={styles.videoTitle}>{vid.title}</h3>
                    <p className={styles.videoDesc}>{vid.description}</p>
                    <div className={styles.videoChannelBar}>
                      <span className={styles.channelName}>{vid.channel}</span>
                      <button
                        type="button"
                        className={styles.watchBtn}
                        onClick={() => setActiveVideo(vid)}
                      >
                        Watch Video <Play size={12} fill="currentColor" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ADDITIONAL RESEARCH ARTICLES */}
      {activeTab === "all" && (
        <section className={`section ${styles.section}`}>
          <div className="container">
            <div className={styles.sectionHeading}>
              <div>
                <span className="mono-eyebrow">COMPENSATION & MARKET REPORTS</span>
                <h2 className={styles.sectionTitle}>Global Industry Intelligence</h2>
              </div>
            </div>

            <div className={styles.extraGrid}>
              {extraArticles.map((article, i) => (
                <div key={i} className={styles.extraCard}>
                  <span className="tag tag-gold">{article.category}</span>
                  <h3 className={styles.extraTitle}>{article.title}</h3>
                  <p className={styles.extraDesc}>{article.description}</p>
                  <div className={styles.extraFooter}>
                    <span className={styles.readTime}>
                      <Clock size={13} /> {article.readTime}
                    </span>
                    <span className={styles.readLink}>
                      {articlesData.readMoreLabel}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* YouTube Video Modal Player */}
      {activeVideo && (
        <div className={styles.modalBackdrop} onClick={() => setActiveVideo(null)}>
          <div
            className={styles.videoModalCard}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-modal-title"
          >
            <button
              type="button"
              className={styles.modalClose}
              onClick={() => setActiveVideo(null)}
              aria-label="Close video"
            >
              <X size={20} />
            </button>
            <div className={styles.iframeWrapper}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles.videoIframe}
              />
            </div>
            <div className={styles.modalVideoMeta}>
              <h3 id="video-modal-title" className={styles.modalVideoTitle}>{activeVideo.title}</h3>
              <p className={styles.modalVideoDesc}>{activeVideo.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Admin Article Modal Reader */}
      {activeArticle && (
        <div className={styles.modalBackdrop} onClick={() => setActiveArticle(null)}>
          <div
            className={styles.articleModalCard}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="article-modal-title"
          >
            <button
              type="button"
              className={styles.modalClose}
              onClick={() => setActiveArticle(null)}
              aria-label="Close article"
            >
              <X size={20} />
            </button>

            <div className={styles.modalArticleHeader}>
              <span className="tag tag-gold">{activeArticle.category}</span>
              <h2 id="article-modal-title" className={styles.modalArticleTitle}>
                {activeArticle.title}
              </h2>
              <div className={styles.modalAuthorBar}>
                <div>
                  <strong>{activeArticle.author}</strong> — <span>{activeArticle.authorRole}</span>
                </div>
                <span>{activeArticle.publishedAt} • {activeArticle.readTime}</span>
              </div>
            </div>

            <div className={styles.modalArticleBody}>
              <p className={styles.modalArticleLead}>{activeArticle.description}</p>
              <hr className={styles.modalDivider} />
              <div className={styles.modalArticleContent}>
                <p>{activeArticle.content}</p>
                <p>
                  SLEDMC maintains continuous dialogues with European vocational institutions, industry chambers of commerce, and logistics associations. Our transparent pathway offers end-to-end recruitment with verified skills assessments, language preparation, and complete legal documentation.
                </p>
              </div>
            </div>

            <div className={styles.modalArticleFooter}>
              <Link href="/clients#request-form" className="btn btn-primary btn-md" onClick={() => setActiveArticle(null)}>
                <span>Partner with SLEDMC</span>
                <ExternalLink size={14} />
              </Link>
              <button
                type="button"
                className="btn btn-outline btn-md"
                onClick={() => setActiveArticle(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
