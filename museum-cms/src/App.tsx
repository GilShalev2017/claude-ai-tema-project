/*
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
*/

import { useState } from "react";
import { Sidebar } from "./components/layout/Sidebar";
import { TopBar } from "./components/layout/TopBar";
import { DashboardPage } from "./pages/DashboardPage";
import { ImportPage } from "./pages/ImportPage";
import { BrowsePage } from "./pages/BrowsePage";
import { SettingsPage } from "./pages/SettingsPage";
import { AI_KEYWORD_POOL } from "./constants/aiKeywords";
import type { Artwork, Page } from "./types";

import { useTheme } from "./theme/useTheme";

export default function App() {
  const [page, setPage] = useState<Page>("dashboard");
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const { mode } = useTheme();

  const PAGE_META: Record<Page, { title: string; subtitle: string }> = {
    dashboard: { title: "Dashboard", subtitle: "Overview of your collection" },
    import: {
      title: "Import Collection",
      subtitle: "Sync artworks from data sources",
    },
    browse: {
      title: "Browse Collection",
      subtitle: `${artworks.length} artworks in your library`,
    },
    settings: { title: "Settings", subtitle: "Museum profile & configuration" },
  };

  const handleImport = (newArtworks: Artwork[]) => setArtworks(newArtworks);

  const handleEnrich = (id: number) => {
    setArtworks((prev) =>
      prev.map((a) =>
        a.objectID === id
          ? {
              ...a,
              aiEnriched: true,
              aiTags: AI_KEYWORD_POOL.sort(() => 0.5 - Math.random()).slice(
                0,
                10,
              ),
            }
          : a,
      ),
    );
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: "var(--bg)",
      }}
    >

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
        <TopBar
          title={PAGE_META[page].title}
          subtitle={PAGE_META[page].subtitle}
        />

        <div style={{ flex: 1, overflow: "hidden" }}>
          {page === "dashboard" && (
            <DashboardPage artworks={artworks} setPage={setPage} />
          )}
          {page === "import" && (
            <ImportPage onImport={handleImport} artworks={artworks} />
          )}
          {page === "browse" && (
            <BrowsePage
              artworks={artworks}
              onEnrich={handleEnrich}
              onImport={() => setPage("import")}
            />
          )}
          {page === "settings" && <SettingsPage />}
        </div>
      </div>
    </div>
  );
}
