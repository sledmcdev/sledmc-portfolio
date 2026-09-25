import ui from "@/data/site/ui.json";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  radius?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

/** Shimmering placeholder block shown while content loads. */
export default function Skeleton({ width = "100%", height = 16, radius, className = "", style }: SkeletonProps) {
  return (
    <span
      aria-hidden="true"
      className={`skeleton ${className}`}
      style={{ width, height, borderRadius: radius, ...style }}
    />
  );
}

/** Generic page skeleton: hero block + grid of cards. Used by route-level loading.tsx files. */
export function PageSkeleton({ cards = 6 }: { cards?: number }) {
  return (
    <div role="status" aria-live="polite" aria-label={ui.loading.pageLabel} style={{ paddingTop: 76 }}>
      <section style={{ padding: "96px 0 64px", background: "var(--section-dark-bg)" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "center" }}>
          <Skeleton width={140} height={12} />
          <Skeleton width="min(640px, 90%)" height={52} />
          <Skeleton width="min(520px, 80%)" height={18} />
          <Skeleton width="min(420px, 70%)" height={18} />
        </div>
      </section>
      <section style={{ padding: "64px 0" }}>
        <div
          className="container"
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}
        >
          {Array.from({ length: cards }).map((_, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                padding: 28,
                background: "var(--card-color)",
                border: "1px solid var(--border-color)",
                borderRadius: "var(--radius)",
              }}
            >
              <Skeleton width={44} height={44} radius={8} />
              <Skeleton width="70%" height={22} />
              <Skeleton height={14} />
              <Skeleton width="85%" height={14} />
            </div>
          ))}
        </div>
      </section>
      <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
        {ui.loading.text}
      </span>
    </div>
  );
}
