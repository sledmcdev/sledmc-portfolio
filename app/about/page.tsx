import { Heart, Eye, Target } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import PlaceholderImage from "@/components/shared/PlaceholderImage";
import FounderVision from "@/components/home/FounderVision";
import KeyStats from "@/components/home/KeyStats";
import AwardsSection from "@/components/home/AwardsSection";
import { COMPANY } from "@/lib/data";
import meta from "@/data/pages/about/meta.json";
import hero from "@/data/pages/about/hero.json";
import story from "@/data/pages/about/our-story.json";
import visionValues from "@/data/pages/about/vision-values.json";

export const metadata = meta;

const ICON_MAP: Record<string, React.ElementType> = { Heart, Eye, Target };

const iconBoxStyle: React.CSSProperties = {
  width: 48,
  height: 48,
  borderRadius: 12,
  background: "var(--amber-muted)",
  color: "var(--amber)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const ValuesIcon = ICON_MAP[visionValues.values.icon];

export default function AboutPage() {
  return (
    <div>
      <section style={{ background: "linear-gradient(160deg, var(--section-dark-bg) 0%, var(--card-color) 100%)", padding: "140px 0 80px" }}>
        <div className="container">
          <SectionHeader
            label={hero.label}
            title={hero.title}
            subtitle={COMPANY.description}
            center
            light
          />
        </div>
      </section>

      {/* Story */}
      <section id="our-story" className="section bg-white">
        <div className="container">
          <div className="grid-2" style={{ alignItems: "center" }}>
            <div>
              <span className="section-label">{story.label}</span>
              <h2 className="section-title">{story.title}</h2>
              {story.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="body-md"
                  style={{ color: "var(--muted-fg)", marginBottom: i === story.paragraphs.length - 1 ? 24 : 16 }}
                >
                  {p}
                </p>
              ))}
              <div style={{ display: "flex", gap: 24 }}>
                {story.stats.map((stat, i) => (
                  <div key={stat.label} style={{ display: "contents" }}>
                    {i > 0 && <div style={{ width: 1, background: "var(--border-color)" }} />}
                    <div>
                      <h4 style={{ fontSize: "1.75rem", color: "var(--amber)", fontWeight: 800 }}>{stat.value}</h4>
                      <p style={{ fontSize: "0.8125rem", color: "var(--muted-fg)" }}>{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <PlaceholderImage label={story.imageLabel} height={420} style={{ borderRadius: 24 }} />
            </div>
          </div>
        </div>
      </section>

      {/* Founder Vision */}
      <section id="founder">
        <FounderVision />
      </section>

      {/* Vision & Values */}
      <section id="vision" className="section bg-off-white">
        <div className="container">
          <SectionHeader
            label={visionValues.label}
            title={visionValues.title}
            subtitle={visionValues.subtitle}
            center
          />
          <div className="grid-3">
            {visionValues.cards.map((card) => {
              const Icon = ICON_MAP[card.icon];
              return (
                <div key={card.title} className="card" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={iconBoxStyle}>{Icon && <Icon size={24} />}</div>
                  <h3 style={{ fontSize: "1.25rem", color: "var(--fg-color)" }}>{card.title}</h3>
                  <p style={{ fontSize: "0.9375rem", color: "var(--muted-fg)", lineHeight: 1.65 }}>{card.body}</p>
                </div>
              );
            })}
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={iconBoxStyle}>{ValuesIcon && <ValuesIcon size={24} />}</div>
              <h3 style={{ fontSize: "1.25rem", color: "var(--fg-color)" }}>{visionValues.values.title}</h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: "0.875rem", color: "var(--muted-fg)", listStyle: "none" }}>
                {visionValues.values.items.map((item) => (
                  <li key={item.term}>
                    <strong style={{ color: "var(--fg-color)" }}>{item.term}</strong> {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <KeyStats />

      {/* Awards */}
      <section id="awards">
        <AwardsSection />
      </section>
    </div>
  );
}
