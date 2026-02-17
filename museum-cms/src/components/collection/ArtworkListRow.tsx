// src/components/collection/ArtworkListRow.tsx — FULLY CORRECTED
import { ChevronRight, Sparkles } from "lucide-react";
import { Badge } from "../ui/Badge";
import type { Artwork } from "../../types";

interface ArtworkListRowProps {
  artwork: Artwork;
  onClick: () => void;
}

export function ArtworkListRow({ artwork, onClick }: ArtworkListRowProps) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "12px 20px",
        borderBottom: "1px solid var(--border)",
        cursor: "pointer",
        transition: "all 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.background =
          "rgba(255,255,255,0.03)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = "transparent";
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 8,
          overflow: "hidden",
          background: "var(--surface2)",
          flexShrink: 0,
        }}
      >
        <img
          src={artwork.imageUrl || ""}  
          alt={artwork.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 15,
            fontWeight: 500,
            color: "var(--text)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {artwork.title}
        </div>
        <div style={{ fontSize: 12, color: "var(--text-dim)" }}>
          {artwork.artist || "Unknown Artist"} · {artwork.year || "Unknown"}  {/* ← FIXED: use year not objectDate */}
        </div>
      </div>
      <div style={{ minWidth: 160, fontSize: 12, color: "var(--text-dim)" }}>
        {artwork.department || "Unknown"}
      </div>
      <div style={{ minWidth: 80 }}>
        {artwork.isPublished ? (
          <Badge color="green">Published</Badge>
        ) : (
          <Badge color="red">Draft</Badge>
        )}
      </div>
      <div style={{ minWidth: 60 }}>
        {artwork.aiKeywords && artwork.aiKeywords.length > 0 && (  // ← FIXED: check aiKeywords not aiEnriched
          <Badge>
            <Sparkles size={10} /> AI
          </Badge>
        )}
      </div>
      <ChevronRight size={14} style={{ color: "var(--text-dim)" }} />
    </div>
  );
}