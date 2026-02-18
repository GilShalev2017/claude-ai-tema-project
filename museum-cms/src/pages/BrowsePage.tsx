import { useState, useEffect } from "react";
import {
  Search,
  Grid,
  List,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ArtworkCard } from "../components/collection/ArtworkCard";
import { ArtworkListRow } from "../components/collection/ArtworkListRow";
import { ArtworkModal } from "../components/collection/ArtworkModal";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { usePaginatedItems } from "../hooks/useCollection";
import type { Artwork, ViewMode } from "../types";

interface BrowsePageProps {
  onEnrich: (id: string) => Promise<void>;
  isEnriching: (id: string) => boolean;
  onImport: () => void;
}

export function BrowsePage({
  onEnrich,
  isEnriching,
  onImport,
}: BrowsePageProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("");
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 100;

  // Use paginated hook
  const { items, pagination, loading, error, fetchPage } = usePaginatedItems(currentPage, ITEMS_PER_PAGE);

  // Extract departments from items
  const departments = [
    ...new Set(items.map((a) => a.metadata?.department || a.department || "Unknown")),
  ];

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, deptFilter]);

  if (loading && !items.length) {
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
          Import artworks from the Metropolitan Museum API to start browsing
          your collection.
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
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* ✅ STICKY CONTROLS BAR */}
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            background: "var(--bg)",
            borderBottom: "1px solid var(--border)",
            padding: "16px 32px",
            display: "flex",
            gap: 12,
            alignItems: "center",
            flexWrap: "wrap",
            flexShrink: 0,
          }}
        >
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
              onFocus={(e) =>
                (e.target.style.border = "1px solid var(--border-gold)")
              }
              onBlur={(e) =>
                (e.target.style.border = "1px solid var(--border)")
              }
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
                  background:
                    viewMode === m ? "var(--gold-dim)" : "transparent",
                  color: viewMode === m ? "var(--gold)" : "var(--text-dim)",
                  borderRight:
                    m === "grid" ? "1px solid var(--border)" : "none",
                  transition: "all 0.2s",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {m === "grid" ? <Grid size={15} /> : <List size={15} />}
              </button>
            ))}
          </div>

          <div
            style={{
              fontSize: 12,
              color: "var(--text-dim)",
              whiteSpace: "nowrap",
            }}
          >
            {pagination?.totalItems || items.length} {pagination?.totalItems === 1 ? "artwork" : "artworks"}
          </div>
        </div>

        {/* ✅ SCROLLABLE CONTENT AREA */}
        <div
          className="slide-up"
          style={{
            flex: 1,
            overflow: "auto",
            padding: 32,
            paddingBottom: 120, // Increase bottom padding for sticky pagination
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {/* Grid / List — USING PAGINATED ITEMS */}
          {viewMode === "grid" ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
                gap: 20,
              }}
            >
              {items.map((a: Artwork) => (
                <ArtworkCard
                  key={a.id}
                  artwork={a}
                  onClick={() => setSelectedArtwork(a)}
                />
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
                <span style={{ flex: 1 }}>Title / Artist</span>
                <span style={{ minWidth: 120 }}>Year</span>
                <span style={{ minWidth: 160 }}>Medium</span>
                <span style={{ minWidth: 100 }}>Culture</span>
                <span style={{ minWidth: 60 }}>AI</span>
                <span style={{ width: 14 }}></span>
              </div>
              {items.map((a: Artwork) => (
                <ArtworkListRow
                  key={a.id}
                  artwork={a}
                  onClick={() => setSelectedArtwork(a)}
                />
              ))}
            </Card>
          )}

        </div>
      </div>

      {/* ✅ STICKY PAGINATION */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          background: "var(--bg)",
          borderTop: "1px solid var(--border)",
          padding: "12px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 -2px 8px rgba(0,0,0,0.1)",
          minHeight: 60,
        }}
      >
        <div style={{ fontSize: 13, color: "var(--text)", fontWeight: 500, flex: 1, marginLeft: 250}}>
          Showing {ITEMS_PER_PAGE} of {pagination?.totalItems || items.length || 0} items (Page {currentPage} of {pagination?.totalPages || 1})
        </div>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={pagination?.currentPage === 1}
              style={{
                padding: "8px 12px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                color:
                  currentPage === 1 ? "var(--text-dim)" : "var(--text)",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontSize: 12,
                opacity: currentPage === 1 ? 0.5 : 1,
              }}
            >
              <ChevronLeft size={14} />
              Previous
            </button>

            {/* Page number buttons */}
            {(() => {
              const totalPages = pagination?.totalPages || 1;
              const currentPageNum = currentPage;
              const maxVisiblePages = 5;
              
              let startPage = Math.max(1, currentPageNum - Math.floor(maxVisiblePages / 2));
              let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
              
              // Adjust start page if we're near the end
              if (endPage - startPage < maxVisiblePages - 1) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
              }
              
              const pages = [];
              for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
              }
              
              return pages.map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  style={{
                    padding: "8px 12px",
                    background: pageNum === currentPageNum ? "var(--gold-dim)" : "var(--surface)",
                    border: pageNum === currentPageNum ? "1px solid var(--border-gold)" : "1px solid var(--border)",
                    borderRadius: 8,
                    color: pageNum === currentPageNum ? "var(--gold)" : "var(--text)",
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: pageNum === currentPageNum ? 600 : 400,
                  }}
                >
                  {pageNum}
                </button>
              ));
            })()}

            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(pagination?.totalPages || 1, p + 1))
              }
              disabled={currentPage === pagination?.totalPages}
              style={{
                padding: "8px 12px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                color:
                  currentPage === pagination?.totalPages
                    ? "var(--text-dim)"
                    : "var(--text)",
                cursor:
                  currentPage === pagination?.totalPages ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontSize: 12,
                opacity: currentPage === pagination?.totalPages ? 0.5 : 1,
              }}
            >
              Next
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

      {selectedArtwork && (
        <ArtworkModal
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
          onEnrich={async (id) => {
            await onEnrich(id);
            // Update local selected artwork if enrichment succeeded
            const updated = items.find((a) => a.id === id);
            if (updated) setSelectedArtwork(updated);
          }}
          isEnriching={(id) => isEnriching(id)}
        />
      )}
    </>
  );
}
