import type { ReactNode } from "react";

export type Page = "dashboard" | "import" | "browse" | "settings";
export type ViewMode = "grid" | "list";

export interface Artwork {
  // Core database fields (from Prisma schema)
  id: string;                    // UUID primary key
  museumId: string;              // "met", "louvre", etc.
  externalId: string;            // Met Museum's objectID as string
  title: string;
  artist: string | null;
  year: number | null;
  description: string | null;
  imageUrl: string | null;       // Primary image URL
  additionalImages: string[];
  aiKeywords: string[];          // AI-generated tags
  tags: string[];                // ← ADDED: Manual/curated tags
  createdAt: string;
  updatedAt: string;
  
  // Optional fields (can be computed or from metadata)
  department?: string;
  culture?: string;
  medium?: string;
  classification?: string;
  isPublished?: boolean;
  aiEnriched?: boolean;
  
  // Full Met Museum metadata (stored as JSON in Prisma)
  metadata?: {
    objectID: number;
    department: string;
    title: string;
    culture: string;
    period: string;
    artistDisplayName: string;
    artistDisplayBio: string;
    artistNationality: string;
    objectDate: string;
    objectBeginDate: number;
    objectEndDate: number;
    medium: string;
    dimensions: string;
    classification: string;
    objectURL: string;
    primaryImage: string;
    additionalImages: string[];
    isPublicDomain: boolean;
    tags: Array<{ term: string; AAT_URL: string; Wikidata_URL: string }>;
    [key: string]: any;
   
  };
}

export interface ImportStats {
  new: number;
  updated: number;
  removed: number;
}

export interface ImportStatus {
  type: "idle" | "loading" | "success" | "error";
  message: string;
  stats?: ImportStats;
}

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export interface Department {
  departmentId: number;
  displayName: string;
}