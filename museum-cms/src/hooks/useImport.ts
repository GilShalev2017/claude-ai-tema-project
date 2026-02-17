import { useState } from "react";
import { MOCK_ARTWORKS } from "../constants/mockData";
import type { Artwork, ImportStatus } from "../types";

export function useImport(
  setArtworks: React.Dispatch<React.SetStateAction<Artwork[]>>
) {
  const [status, setStatus] = useState<ImportStatus>({
    type: "idle",
    message: "",
  });

  // Progress is a separate number — NOT part of ImportStatus
  const [progress, setProgress] = useState<number>(0);

  const runImport = async (): Promise<void> => {
    setProgress(0);
    setStatus({ type: "loading", message: "Authenticating with Metropolitan Museum API…" });

    await tick(180); setProgress(10);
    await tick(180); setProgress(20);
    setStatus({ type: "loading", message: "Fetching collection index…" });
    await tick(180); setProgress(30);
    await tick(180); setProgress(40);
    await tick(180); setProgress(50);
    setStatus({ type: "loading", message: "Downloading artwork metadata…" });
    await tick(180); setProgress(60);
    await tick(180); setProgress(70);
    setStatus({ type: "loading", message: "Processing images & tags…" });
    await tick(180); setProgress(80);
    await tick(180); setProgress(90);
    await tick(180); setProgress(100);

    setArtworks(MOCK_ARTWORKS);
    setStatus({
      type: "success",
      message: "Import complete!",
      stats: { new: MOCK_ARTWORKS.length, updated: 0, removed: 0 },
    });
  };

  const runRefresh = async (): Promise<void> => {
    setProgress(0);
    setStatus({ type: "loading", message: "Checking for updates…" });

    for (let i = 0; i <= 100; i += 20) {
      await tick(200);
      setProgress(i);
    }

    setStatus({
      type: "success",
      message: "Collection is up to date.",
      stats: { new: 0, updated: 2, removed: 0 },
    });
  };

  const reset = (): void => {
    setStatus({ type: "idle", message: "" });
    setProgress(0);
  };

  return { status, progress, runImport, runRefresh, reset };
}

// Small helper to keep the async steps readable
function tick(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms));
}