import { Download, Upload, Check } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { GoldDivider } from "../ui/GoldDivider";

// ── Met Museum Source Card ─────────────────────────────────────────────────
interface MetSourceCardProps {
  onImport: () => void;
  onRefresh: () => void;
  isLoading: boolean;
  hasData: boolean;
}

export function MetSourceCard({
  onImport,
  onRefresh,
  isLoading,
  hasData,
}: MetSourceCardProps) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border-gold)",
        borderRadius: "var(--radius)",
        padding: 32,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gold top accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: "linear-gradient(90deg,var(--gold),transparent)",
        }}
      />

      {/* Header */}
      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            background: "var(--gold-dim)",
            border: "1px solid var(--border-gold)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
          }}
        >
          🏛️
        </div>
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 22,
              fontWeight: 500,
              color: "var(--text)",
            }}
          >
            Metropolitan Museum
          </div>
          <div style={{ fontSize: 12, color: "var(--gold)", marginTop: 2 }}>
            metmuseum.github.io
          </div>
        </div>
      </div>

      {/* Feature list */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginBottom: 24,
        }}
      >
        {[
          "50,000+ open-access artworks",
          "High-resolution images",
          "Rich metadata & bibliography",
          "Real-time synchronization",
        ].map((feature, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 13,
              color: "var(--text-mid)",
            }}
          >
            <Check size={14} style={{ color: "var(--gold)", minWidth: 14 }} />
            {feature}
          </div>
        ))}
      </div>

      {/* Badges */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Badge>Connected</Badge>
        <Badge color="green">API v2</Badge>
      </div>

      <GoldDivider />

      {/* Actions */}
      <div
        style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}
      >
        <Button
          onClick={onImport}
          disabled={isLoading}
          icon={<Download size={14} />}
        >
          {hasData ? "Re-import Collection" : "Import Collection"}
        </Button>

        {hasData && (
          <Button
            onClick={onRefresh}
            variant="secondary"
            disabled={isLoading}
            icon={<Upload size={14} />}
          >
            Refresh
          </Button>
        )}
      </div>
    </div>
  );
}

// ── Google Drive Source Card ───────────────────────────────────────────────
export function DriveSourceCard() {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: 32,
        opacity: 0.6,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            background: "var(--surface2)",
            border: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
          }}
        >
          📁
        </div>
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 22,
              fontWeight: 500,
              color: "var(--text)",
            }}
          >
            Google Drive
          </div>
          <div style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 2 }}>
            Custom CSV + Images
          </div>
        </div>
      </div>

      {/* Feature list */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginBottom: 24,
        }}
      >
        {[
          "Image folder selection",
          "CSV metadata mapping",
          "Custom field definitions",
          "Batch processing support",
        ].map((feature, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 13,
              color: "var(--text-dim)",
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                minWidth: 14,
                borderRadius: "50%",
                border: "1px solid var(--border)",
              }}
            />
            {feature}
          </div>
        ))}
      </div>

      <Badge color="blue">Coming Soon</Badge>

      <GoldDivider />

      <div style={{ marginTop: 16 }}>
        <Button variant="ghost" disabled={true} icon={<Upload size={14} />}>
          Connect Drive
        </Button>
      </div>
    </div>
  );
}
