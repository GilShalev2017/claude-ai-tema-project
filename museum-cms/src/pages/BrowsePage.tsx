// src/pages/BrowsePage.tsx
import { useState } from "react";
import { Search, Grid, List, Download } from "lucide-react";
import { ArtworkCard } from "../components/collection/ArtworkCard";
import { ArtworkListRow } from "../components/collection/ArtworkListRow";
import { ArtworkModal } from "../components/collection/ArtworkModal";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import type { Artwork, ViewMode } from "../types";

interface BrowsePageProps {
  artworks: Artwork[];
  onEnrich: (id: string) => Promise<void>;
  isEnriching: (id: string) => boolean;
  onImport: () => void;
}

export function BrowsePage({ artworks, onEnrich, isEnriching, onImport }: BrowsePageProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("");
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  const departments = [...new Set(artworks.map((a) => a.department || "Unknown"))];

  const filtered = artworks.filter((a) => {
    const matchSearch =
      !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      (a.artist || "").toLowerCase().includes(search.toLowerCase());
    const matchDept = !deptFilter || a.department === deptFilter;
    return matchSearch && matchDept;
  });

  if (artworks.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          gap: 20,
          padding: 32,
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            background: "var(--surface2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
          }}
        >
          🏛️
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 28,
            color: "var(--text)",
            textAlign: "center",
          }}
        >
          Your Collection Awaits
        </div>
        <div
          style={{
            color: "var(--text-dim)",
            fontSize: 13,
            textAlign: "center",
            maxWidth: 360,
          }}
        >
          Import artworks from the Metropolitan Museum API to start browsing your collection.
        </div>
        <Button onClick={onImport} icon={<Download size={14} />}>
          Import Collection
        </Button>
      </div>
    );
  }

  return (
    <>
      <div
        className="slide-up"
        style={{
          padding: 32,
          overflow: "auto",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {/* Controls */}
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
            <Search
              size={14}
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-dim)",
              }}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search artworks, artists…"
              style={{
                width: "100%",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                padding: "10px 14px 10px 36px",
                color: "var(--text)",
                fontSize: 13,
                outline: "none",
                transition: "border 0.2s",
              }}
              onFocus={(e) => {
                e.target.style.border = "1px solid var(--border-gold)";
              }}
              onBlur={(e) => {
                e.target.style.border = "1px solid var(--border)";
              }}
            />
          </div>

          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              padding: "10px 36px 10px 14px",
              color: deptFilter ? "var(--gold)" : "var(--text-dim)",
              fontSize: 13,
              outline: "none",
              cursor: "pointer",
            }}
          >
            <option value="">All Departments</option>
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <div
            style={{
              display: "flex",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            {(["grid", "list"] as ViewMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setViewMode(m)}
                style={{
                  padding: "10px 14px",
                  background: viewMode === m ? "var(--gold-dim)" : "transparent",
                  color: viewMode === m ? "var(--gold)" : "var(--text-dim)",
                  borderRight: "1px solid var(--border)",
                  transition: "all 0.2s",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {m === "grid" ? <Grid size={15} /> : <List size={15} />}
              </button>
            ))}
          </div>

          <div style={{ fontSize: 12, color: "var(--text-dim)", whiteSpace: "nowrap" }}>
            {filtered.length} {filtered.length === 1 ? "artwork" : "artworks"}
          </div>
        </div>

        {/* Grid / List */}
        {viewMode === "grid" ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
              gap: 20,
            }}
          >
            {filtered.map((a) => (
              <ArtworkCard key={a.id} artwork={a} onClick={() => setSelectedArtwork(a)} />
            ))}
          </div>
        ) : (
          <Card style={{ overflow: "hidden" }}>
            <div
              style={{
                padding: "10px 20px",
                borderBottom: "1px solid var(--border)",
                display: "flex",
                gap: 16,
                fontSize: 11,
                color: "var(--text-dim)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              <span style={{ width: 56, minWidth: 56 }}></span>
              <span style={{ flex: 1 }}>Title</span>
              <span style={{ minWidth: 160 }}>Department</span>
              <span style={{ minWidth: 80 }}>Status</span>
              <span style={{ minWidth: 60 }}>AI</span>
              <span style={{ width: 14 }}></span>
            </div>
            {filtered.map((a) => (
              <ArtworkListRow key={a.id} artwork={a} onClick={() => setSelectedArtwork(a)} />
            ))}
          </Card>
        )}
      </div>

      {selectedArtwork && (
        <ArtworkModal
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
          onEnrich={async (id) => {
            await onEnrich(id);
            // Update local selected artwork if enrichment succeeded
            const updated = artworks.find((a) => a.id === id);
            if (updated) setSelectedArtwork(updated);
          }}
          isEnriching={(id) => isEnriching(id)}
        />
      )}
    </>
  );
}