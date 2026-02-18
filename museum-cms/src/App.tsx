import { useState, useEffect } from "react";
import { Sidebar } from "./components/layout/Sidebar";
import { TopBar } from "./components/layout/TopBar";
import { DashboardPage } from "./pages/DashboardPage";
import { ImportPage } from "./pages/ImportPage";
import { BrowsePage } from "./pages/BrowsePage";
import { SettingsPage } from "./pages/SettingsPage";
import { useTheme } from "./theme/useTheme";
import {
  useArtworkEnrichment,
} from "./hooks/useCollection";
import type { Artwork, Page } from "./types";

const PAGE_META: Record<Page, { title: string; subtitle: string }> = {
  dashboard: { title: "Dashboard", subtitle: "Overview of your collection" },
  import: {
    title: "Import Collection",
    subtitle: "Sync artworks from data sources",
  },
  browse: {
    title: "Browse Collection",
    subtitle: "Explore your artwork library",
  },
  settings: { title: "Settings", subtitle: "Museum profile & configuration" },
};

export default function App() {
  const [page, setPage] = useState<Page>("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { enrich, isEnriching } = useArtworkEnrichment();

  const { mode } = useTheme();

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleImportComplete = () => {
    setPage("browse"); // Navigate to browse after successful import
  };

  const handleEnrich = async (id: string) => {
    await enrich(id);
  };

  // ── Dynamic subtitle with count ──────────────────────────────────────────
  const subtitle = PAGE_META[page].subtitle;

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: "var(--bg)",
      }}
    >
      {/* <style>{GLOBAL_STYLES}</style> */}

      {/* Background texture */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          backgroundImage: `radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.03) 0%, transparent 60%),
                         radial-gradient(ellipse at 80% 20%, rgba(139,26,26,0.04) 0%, transparent 50%)`,
        }}
      />

      <Sidebar
        page={page}
        setPage={setPage}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
        }}
      >
        <TopBar title={PAGE_META[page].title} subtitle={subtitle} />

        <div style={{ flex: 1, overflow: "hidden" }}>
          {/* Pages */}
          {page === "dashboard" && (
            <DashboardPage setPage={setPage} />
          )}
          {page === "import" && (
            <ImportPage
              onImportComplete={handleImportComplete}
            />
          )}
          {page === "browse" && (
            <BrowsePage
              onEnrich={handleEnrich} 
              isEnriching={isEnriching} 
              onImport={() => setPage("import")}
            />
          )}
          {page === "settings" && <SettingsPage />}
        </div>
      </div>
    </div>
  );
}
