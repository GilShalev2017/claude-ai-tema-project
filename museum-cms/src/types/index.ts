import type { ReactNode } from "react";

// ── Navigation ────────────────────────────────────────────────────────────
export type Page = "dashboard" | "import" | "browse" | "settings";
export type ViewMode = "grid" | "list";

// ── Artwork ───────────────────────────────────────────────────────────────
// Field names match the Met Museum API response AND the monolith exactly.
// Do NOT rename these — every component references them by these names.
export interface Artwork {
  objectID: number;           // ← primary key. NOT "id"
  title: string;
  artistDisplayName: string;  // ← NOT "artist"
  objectDate: string;         // ← NOT "date"
  department: string;
  medium: string;
  primaryImage: string;
  objectURL: string;
  classification: string;
  culture: string;
  tags: string[];
  aiTags?: string[];
  aiEnriched?: boolean;
  isPublished?: boolean;
}

// ── Import Stats ──────────────────────────────────────────────────────────
// Only three counters. NO "total" field.
export interface ImportStats {
  new: number;
  updated: number;
  removed: number;
}

// ── Import Status ─────────────────────────────────────────────────────────
// Discriminated union on "type". NOT "status".
// Progress percentage is a SEPARATE useState<number> in ImportPage — not here.
export interface ImportStatus {
  type: "idle" | "loading" | "success" | "error";
  message: string;
  stats?: ImportStats;
}

// ── Button ────────────────────────────────────────────────────────────────
// "outline" is NOT a valid variant — use "secondary" or "ghost" instead.
export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
}