// src/hooks/useCollection.ts
import { useRef, useState, useEffect } from "react";
import {
  getCollectionItems,
  getItems,
  importFromMet,
  enrichArtwork,
  getDepartments,
  type ImportMetResponse,
  type Department,
  type ApiError,
  type PaginatedResponse,
} from "../api/client";
import type { Artwork } from "../types";

// ── Hook: Fetch Collection Items ──────────────────────────────────────────
export function useCollectionItems() {
  const [items, setItems] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCollectionItems();
      setItems(data);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || "Failed to load collection");
      console.error("Failed to fetch items:", err);
    } finally {
      setLoading(false);
    }
  };

  return { items, loading, error, fetchItems, setItems };
}

// ── Hook: Fetch Paginated Collection Items ──────────────────────────────
export function usePaginatedItems(page: number = 1, limit: number = 100) {
  const [data, setData] = useState<PaginatedResponse<Artwork> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPage = async (pageNum: number = page, limitNum: number = limit) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getItems(pageNum, limitNum);
      setData(response);
      return response;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || "Failed to load page");
      console.error("Failed to fetch page:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch on mount and when page/limit changes
  useEffect(() => {
    fetchPage();
  }, [page, limit]);

  return {
    data,
    items: data?.items || [],
    pagination: data?.pagination,
    loading,
    error,
    fetchPage,
  };
}

// ── Hook: Import from Met Museum ──────────────────────────────────────────
interface ImportProgress {
  stage: string;
  percent: number;
}

export function useMetImport() {
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState<ImportProgress>({
    stage: "",
    percent: 0,
  });
  const [result, setResult] = useState<ImportMetResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const runImport = async (
    searchTerm: string = "*",
    departmentIds: number[] = [],
  ) => {
    abortControllerRef.current = new AbortController();
    setImporting(true);
    setError(null);
    setResult(null);

    // Simulated progress stages (real progress could come from WebSocket/SSE)
    const stages = [
      { stage: "Connecting to Met Museum API...", percent: 10 },
      { stage: "Searching collection...", percent: 30 },
      { stage: "Downloading artwork metadata...", percent: 60 },
      { stage: "Processing images...", percent: 80 },
      { stage: "Saving to database...", percent: 95 },
    ];

    try {
      // Progress simulation
      for (const stage of stages) {
        setProgress(stage);
        await new Promise((r) => setTimeout(r, 400));
      }

      const data = await importFromMet(
        searchTerm,
        departmentIds,
        abortControllerRef.current.signal,
      );

      console.log("Import response:", data);
      console.log("Items received:", data.items?.length || 0);

      setResult(data);
      setProgress({ stage: "Complete!", percent: 100 });
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        setError("Import cancelled");
        return;
      }
      const apiError = err as ApiError;

      console.error("Import failed:", apiError);

      setError(apiError.message || "Import failed");
      console.error("Import failed:", err);
    } finally {
      setImporting(false);
    }
  };

  const abort = () => {
    abortControllerRef.current?.abort();
    setImporting(false);
    setError("Import cancelled by user");
  };

  const reset = () => {
    setResult(null);
    setError(null);
    setProgress({ stage: "", percent: 0 });
  };

  return { importing, progress, result, error, runImport, abort, reset };
}

// ── Hook: AI Enrichment ────────────────────────────────────────────────────
export function useArtworkEnrichment() {
  const [enrichingIds, setEnrichingIds] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  const enrich = async (
    id: string,
    artworks: Artwork[] = [],
  ): Promise<Artwork | null> => {
    setEnrichingIds((prev) => new Set(prev).add(id));
    setError(null);

    try {
      // Find the artwork to get its numeric objectID from externalId
      const artwork = artworks.find((item) => item.id === id);
      if (!artwork?.externalId) {
        throw new Error(`Artwork or externalId not found for id: ${id}`);
      }

      const enrichedItem = await enrichArtwork(Number(artwork.externalId));
      return enrichedItem;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || "Enrichment failed");
      console.error(`Failed to enrich artwork ${id}:`, err);
      return null;
    } finally {
      setEnrichingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const isEnriching = (id: string) => enrichingIds.has(id);

  return { enrich, isEnriching, error };
}

// ── Hook: Fetch Departments ────────────────────────────────────────────────
export function useDepartments() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDepartments = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getDepartments();
      setDepartments(data);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || "Failed to load departments");
      console.error("Failed to fetch departments:", err);
    } finally {
      setLoading(false);
    }
  };

  return { departments, loading, error, fetchDepartments };
}
