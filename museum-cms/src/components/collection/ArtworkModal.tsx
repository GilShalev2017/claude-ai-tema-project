// src/components/collection/ArtworkModal.tsx
import { useState, useEffect } from "react";
import { X, Sparkles, Eye } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Spinner } from "../ui/Spinner";
import type { Artwork } from "../../types";

interface ArtworkModalProps {
  artwork: Artwork;
  onClose: () => void;
  onEnrich: (id: string) => Promise<void>;
  isEnriching: (id: string) => boolean;
}

export function ArtworkModal({
  artwork,
  onClose,
  onEnrich,
  isEnriching,
}: ArtworkModalProps) {
  const enriching = isEnriching(artwork.id);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  console.log("aiKeywords", artwork.aiKeywords);
  
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(12px)",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="slide-up"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border-gold)",
          borderRadius: 20,
          maxWidth: 900,
          width: "100%",
          maxHeight: "90vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: "20px 28px",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 26,
                fontWeight: 500,
                color: "var(--text)",
              }}
            >
              {artwork.title}
            </div>
            <div
              style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 2 }}
            >
              {artwork.artist || "Unknown Artist"} · {artwork.year || "Unknown"}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "var(--surface2)",
              border: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-dim)",
              transition: "all 0.2s",
              cursor: "pointer",
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ display: "flex", overflow: "hidden", flex: 1 }}>
          {/* Image */}
          <div
            style={{
              width: 380,
              minWidth: 380,
              background: "var(--surface2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
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

          {/* Details */}
          <div style={{ flex: 1, overflowY: "auto", padding: 28 }}>
            {/* Meta grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 24,
              }}
            >
              {[
                {
                  label: "Department",
                  value: artwork.metadata?.department || "Unknown",
                },
                {
                  label: "Classification",
                  value: artwork.metadata?.classification || "Unknown",
                },
                {
                  label: "Credit Line",
                  value: artwork.metadata?.creditLine || "Unknown",
                },
                {
                  label: "Description",
                  value: artwork.medium || artwork.description || "Unknown",
                },
              ].map((m, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--surface2)",
                    borderRadius: 10,
                    padding: "12px 16px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      color: "var(--text-dim)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: 4,
                    }}
                  >
                    {m.label}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "var(--text)",
                      fontWeight: 500,
                    }}
                  >
                    {m.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Status */}
            <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
              <Badge color="green">✓ Published</Badge>
              {artwork.aiKeywords.length > 0 && (
                <Badge>
                  <Sparkles size={10} /> AI Enriched
                </Badge>
              )}
            </div>

            {/* Original Tags */}
            {artwork.tags && artwork.tags.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--text-dim)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: 10,
                  }}
                >
                  Collection Tags
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {artwork.tags.map((t: string, i: number) => (
                    <span
                      key={i}
                      style={{
                        padding: "4px 12px",
                        borderRadius: 20,
                        background: "var(--surface2)",
                        border: "1px solid var(--border)",
                        fontSize: 12,
                        color: "var(--text-mid)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* AI Tags */}
            {artwork.aiKeywords && artwork.aiKeywords.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <div
                  style={{
                    fontSize: 11,
                    color: "#9B7FD4",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: 10,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <Sparkles size={11} />
                  AI-Generated Keywords
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {artwork.aiKeywords.map((t: string, i: number) => (
                    <span
                      key={i}
                      style={{
                        padding: "4px 12px",
                        borderRadius: 20,
                        background: "rgba(155,127,212,0.12)",
                        border: "1px solid rgba(155,127,212,0.3)",
                        fontSize: 12,
                        color: "#9B7FD4",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Button
                onClick={() => onEnrich(artwork.id)}
                disabled={enriching || artwork.aiKeywords.length > 0}
                icon={enriching ? <Spinner /> : <Sparkles size={14} />}
              >
                {enriching
                  ? "Analyzing…"
                  : artwork.aiKeywords.length > 0
                    ? "Already Enriched"
                    : "Enrich with AI"}
              </Button>
              {artwork.metadata?.objectURL && (
                <Button
                  onClick={() =>
                    window.open(artwork.metadata?.objectURL || "", "_blank")
                  }
                  variant="secondary"
                  icon={<Eye size={14} />}
                >
                  View on Met
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
