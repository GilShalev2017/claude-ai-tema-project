// src/api/client.ts
import axios, { AxiosError } from "axios";
import type { Artwork } from "../types";

// ── API Client Configuration ──────────────────────────────────────────────
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  timeout: 30000, // 30s for large imports
  headers: {
    "Content-Type": "application/json",
  },
});

// ── Response Types ────────────────────────────────────────────────────────
export interface ImportMetResponse {
  success: boolean;
  stats: {
    new: number;
    updated: number;
    removed: number;
  };
  items: Artwork[];
  message?: string;
}

export interface Department {
  departmentId: number;
  displayName: string;
}

export interface ApiError {
  error: string;
  message?: string;
}

// ── Request/Response Interceptors ─────────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here later
    // const token = localStorage.getItem('auth_token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    // Centralized error handling
    console.error("[API Error]", {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    });

    // Transform error for UI consumption
    const apiError: ApiError = {
      error: error.response?.data?.error || "Request failed",
      message: error.response?.data?.message || error.message,
    };

    return Promise.reject(apiError);
  },
);

// ── API Methods ───────────────────────────────────────────────────────────

/**
 * Import artworks from Met Museum API
 * @param searchTerm - Free text search (default "*" for all)
 * @param departmentIds - Array of department IDs to filter
 */
export async function importFromMet(
  searchTerm: string = "*",
  departmentIds: number[] = [],
): Promise<ImportMetResponse> {
  const { data } = await api.post<ImportMetResponse>("/import/met", {
    searchTerm,
    departmentIds,
  });
  return data;
}

/**
 * Fetch all collection items from database
 */
export async function getCollectionItems(): Promise<Artwork[]> {
  const { data } = await api.get<Artwork[]>("/items");
  return data;
}

/**
 * Enrich a single artwork with AI-generated tags
 * @param objectID - The artwork's unique ID
 */
export async function enrichArtwork(objectID: number): Promise<Artwork> {
  const { data } = await api.post<Artwork>(`/collection/enrich/${objectID}`);
  return data;
}

/**
 * Fetch available Met Museum departments
 */
export async function getDepartments(): Promise<Department[]> {
  const { data } = await api.get<Department[]>("/departments");
  return data;
}

/**
 * Health check endpoint (optional — add to backend if needed)
 */
export async function healthCheck(): Promise<{ status: string }> {
  const { data } = await api.get<{ status: string }>("/health");
  return data;
}

export default api;
