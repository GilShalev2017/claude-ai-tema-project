// src/components/collection/ArtworkCard.tsx — FULLY CORRECTED
import { useState } from "react";
import { Calendar, Tag, Sparkles } from "lucide-react";
import { Badge } from "../ui/Badge";
import type { Artwork } from "../../types";

interface ArtworkCardProps {
  artwork: Artwork;
  onClick: () => void;
}

export function ArtworkCard({ artwork, onClick }: ArtworkCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div
      onClick={onClick}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 14,
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.3s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(-4px)";
        el.style.border = "1px solid var(--border-gold)";
        el.style.boxShadow = "0 16px 48px rgba(0,0,0,0.6)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "none";
        el.style.border = "1px solid var(--border)";
        el.style.boxShadow = "none";
      }}
    >
      <div
        style={{
          position: "relative",
          height: 220,
          background: "var(--surface2)",
          overflow: "hidden",
        }}
      >
        {!imgLoaded && (
          <div className="shimmer" style={{ position: "absolute", inset: 0 }} />
        )}
        <img
          src={artwork.imageUrl || ""}
          alt={artwork.title}
          onLoad={() => setImgLoaded(true)}
          onError={(e) => {
            (e.target as HTMLImageElement).style.opacity = "0";
          }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            opacity: imgLoaded ? 1 : 0,
            transition: "opacity 0.4s",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            display: "flex",
            gap: 6,
          }}
        >
          {artwork.aiKeywords &&
            artwork.aiKeywords.length > 0 && ( 
              <Badge>
                <Sparkles size={10} /> AI
              </Badge>
            )}
          <Badge color="red">{artwork.metadata?.department}</Badge>
        </div>
      </div>
      <div style={{ padding: "16px 18px" }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 17,
            fontWeight: 500,
            color: "var(--text)",
            marginBottom: 4,
            lineHeight: 1.3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {artwork.title}
        </div>
        <div
          style={{
            fontSize: 12,
            color: "var(--text-dim)",
            marginBottom: 12,
          }}
        >
          {artwork.artist || "Unknown Artist"}
        </div>
        {artwork.tags && artwork.tags.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 4,
              marginBottom: 8,
              maxHeight: 24,
              overflow: "hidden",
            }}
          >
            {artwork.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                style={{
                  fontSize: 9,
                  padding: "2px 6px",
                  borderRadius: 10,
                  background: "var(--gold-dim)",
                  color: "var(--gold)",
                  border: "1px solid var(--border-gold)",
                  whiteSpace: "nowrap",
                }}
              >
                {tag}
              </span>
            ))}
            {artwork.tags.length > 3 && (
              <span style={{ fontSize: 9, color: "var(--text-dim)" }}>
                +{artwork.tags.length - 3}
              </span>
            )}
          </div>
        )}
        <div
          style={{
            display: "flex",
            gap: 12,
            fontSize: 11,
            color: "var(--text-dim)",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Calendar size={11} />
            {artwork.year || "Unknown"} {/* ← FIXED: use year not objectDate */}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Tag size={11} />
            {artwork.metadata?.medium || "Unknown"}
          </span>
        </div>
      </div>
    </div>
  );
}
