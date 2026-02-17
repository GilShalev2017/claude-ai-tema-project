import { useState } from "react";
import { AI_KEYWORD_POOL } from "../constants/aiKeywords";
import type { Artwork } from "../types";

export function useEnrich(
  setArtworks: React.Dispatch<React.SetStateAction<Artwork[]>>,
) {
  // Tracks which objectIDs are currently being enriched
  const [enrichingStates, setEnrichingStates] = useState<
    Record<string, boolean>
  >({});

  const enrichArtwork = async (artwork: Artwork): Promise<void> => {
    setEnrichingStates((prev) => ({ ...prev, [artwork.id]: true }));

    // Simulate LLM analysis delay
    await new Promise((r) => setTimeout(r, 2000));

    const aiTags = [...AI_KEYWORD_POOL]
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);

    setArtworks((prev) =>
      prev.map((a) =>
        a.id === artwork.id
          ? { ...a, aiTags, aiEnriched: true }
          : a,
      ),
    );

    setEnrichingStates((prev) => ({ ...prev, [artwork.id]: false }));
  };

  const isEnriching = (id: string): boolean =>
    !!enrichingStates[id];

  return { enrichArtwork, isEnriching };
}
