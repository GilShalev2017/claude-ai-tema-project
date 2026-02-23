import { useState, useEffect, useRef } from "react";
import {
  RefreshCw,
  Search,
  ChevronDown,
  X,
  Check,
  Info,
  Download,
  Upload,
  FileText,
  FolderOpen,
} from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Spinner } from "../components/ui/Spinner";
import { Badge } from "../components/ui/Badge";
import { GoldDivider } from "../components/ui/GoldDivider";
import {
  useMetImport,
  useDepartments,
  useCSVImport,
  useDriveImport,
} from "../hooks/useCollection";
import type { Artwork } from "../types";
import { DriveImportCard } from "../components/import/DriveImportCard";

interface ImportPageProps {
  onImportComplete: (items: Artwork[]) => void;
  hasExistingData?: boolean;
}

export function ImportPage({
  onImportComplete,
  hasExistingData,
}: ImportPageProps) {
  // ══════════════════════════════════════════════════════════════════════════
  // MET MUSEUM STATE
  // ══════════════════════════════════════════════════════════════════════════
  const {
    importing,
    progress,
    result,
    error: importError,
    runImport,
    abort,
    reset,
  } = useMetImport();

  const {
    departments,
    loading: depsLoading,
    error: depsError,
    fetchDepartments,
  } = useDepartments();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepts, setSelectedDepts] = useState<number[]>([]);
  const [deptDropdownOpen, setDeptDropdownOpen] = useState(false);

  // ══════════════════════════════════════════════════════════════════════════
  // CSV IMPORT STATE — UPDATED TO USE HOOK
  // ══════════════════════════════════════════════════════════════════════════
  const csvFileRef = useRef<HTMLInputElement>(null);
  const imageFilesRef = useRef<HTMLInputElement>(null);
  const [csvFile, setCSVFile] = useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);

  // Use the new hook
  const {
    importing: csvImporting,
    progress: csvProgress,
    result: csvResult,
    error: csvError,
    runImport: runCSVImport,
    reset: resetCSV,
  } = useCSVImport();

  // ══════════════════════════════════════════════════════════════════════════
  // CSV IMPORT HANDLER — SIMPLIFIED
  // ══════════════════════════════════════════════════════════════════════════
  const handleCSVImport = async () => {
    if (!csvFile) return;

    const result = await runCSVImport(csvFile, imageFiles);

    if (result) {
      // Clear file selections after successful import
      setCSVFile(null);
      setImageFiles(null);
      if (csvFileRef.current) csvFileRef.current.value = "";
      if (imageFilesRef.current) imageFilesRef.current.value = "";
    }
  };

  // ══════════════════════════════════════════════════════════════════════════
  // GOOGLE DRIVE STATE
  // ══════════════════════════════════════════════════════════════════════════
  //const [driveFolderId, setDriveFolderId] = useState("");
  //const [driveImporting, setDriveImporting] = useState(false);
  //const [driveProgress, setDriveProgress] = useState< number | { stage?: string; percent?: number }>(0);
  //const [driveResult, setDriveResult] = useState<any>(null);
  //const [driveError, setDriveError] = useState<string | null>(null);

  // const {
  //   initiateDriveImport,
  //   importing: hookImporting,
  //   error: hookError,
  // } = useDriveImport();

  // ══════════════════════════════════════════════════════════════════════════
  // EFFECTS
  // ══════════════════════════════════════════════════════════════════════════
  useEffect(() => {
    fetchDepartments();
  }, []);

  // ══════════════════════════════════════════════════════════════════════════
  // MET MUSEUM HANDLERS
  // ══════════════════════════════════════════════════════════════════════════
  const handleMetImport = () => {
    const term = searchTerm.trim() || "*";
    runImport(term, selectedDepts);
  };

  const toggleDepartment = (deptId: number) => {
    setSelectedDepts((prev) =>
      prev.includes(deptId)
        ? prev.filter((id) => id !== deptId)
        : [...prev, deptId],
    );
  };

  const clearDepartments = () => setSelectedDepts([]);

  // ══════════════════════════════════════════════════════════════════════════
  // GOOGLE DRIVE HANDLERS
  // ══════════════════════════════════════════════════════════════════════════
  // const handleDriveImport = async () => {
  //   // Instead of setDriveProgress(0), use:
  //   setDriveProgress({ stage: "Initializing...", percent: 0 });

  //   try {
  //     // Instead of setDriveProgress(20), use:
  //     setDriveProgress({ stage: "Authenticating...", percent: 20 });

  //     await initiateDriveImport();

  //     // Instead of setDriveProgress(60), use:
  //     setDriveProgress({ stage: "Connecting...", percent: 60 });

  //     // ... rest of logic

  //     // Instead of setDriveProgress(100), use:
  //     setDriveProgress({ stage: "Complete", percent: 100 });
  //   } catch (err) {
  //     // Instead of setDriveProgress(0), use:
  //     setDriveProgress(0);
  //   }
  // };

  // const resetDrive = () => {
  //   setDriveResult(null);
  //   setDriveError(null);
  //   setDriveProgress(0);
  // };

  return (
    <div
      className="slide-up"
      style={{
        padding: 32,
        overflow: "auto",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      {/* Header */}
      <div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 32,
            fontWeight: 400,
            color: "var(--text)",
            marginBottom: 6,
          }}
        >
          Import Collection
        </h2>
        <p style={{ color: "var(--text-dim)", fontSize: 13 }}>
          Sync artworks from data sources
        </p>
      </div>

      {/* 3-CARD GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
          gap: 20,
        }}
      >
        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* CARD 1: METROPOLITAN MUSEUM */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        <Card
          style={{
            padding: 32,
            border: "1px solid var(--border-gold)",
            position: "relative",
            overflow: "visible",
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: "var(--gold-dim)",
                border: "1px solid var(--border-gold)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
              }}
            >
              🏛️
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 22,
                  fontWeight: 500,
                  color: "var(--text)",
                }}
              >
                Metropolitan Museum
              </div>
              <div style={{ fontSize: 12, color: "var(--gold)", marginTop: 2 }}>
                metmuseum.github.io
              </div>
            </div>
          </div>

          {/* Search Input */}
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                fontSize: 11,
                color: "var(--text-dim)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                display: "block",
                marginBottom: 8,
              }}
            >
              Search Artworks
            </label>
            <div style={{ position: "relative" }}>
              <Search
                size={16}
                style={{
                  position: "absolute",
                  left: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-dim)",
                }}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by artist, title, or medium..."
                disabled={importing}
                style={{
                  width: "100%",
                  padding: "12px 16px 12px 44px",
                  background: "var(--surface2)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
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
          </div>

          {/* Search Tips */}
          <div
            style={{
              background: "var(--surface2)",
              padding: "12px 16px",
              borderRadius: 10,
              marginBottom: 24,
              border: "1px dashed var(--border-gold)",
              display: "flex",
              gap: 12,
            }}
          >
            <Info
              size={16}
              style={{ color: "var(--gold)", marginTop: 2, flexShrink: 0 }}
            />
            <div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--text)",
                  fontWeight: 500,
                  marginBottom: 4,
                }}
              >
                Search Tips
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--text-dim)",
                  lineHeight: 1.5,
                }}
              >
                • Use <code style={{ color: "var(--gold)" }}>*</code> to fetch a
                broad selection of artworks.
                <br />
                • Combine a term with departments for better accuracy (e.g.,
                "Gold" in "Greek and Roman Art").
                <br />• If the search is too specific, the API may return 0
                results.
              </div>
            </div>
          </div>

          {/* Department Filter */}
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                fontSize: 11,
                color: "var(--text-dim)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                display: "block",
                marginBottom: 8,
              }}
            >
              Filter by Department{" "}
              {selectedDepts.length > 0 && `(${selectedDepts.length} selected)`}
            </label>

            {selectedDepts.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6,
                  marginBottom: 10,
                }}
              >
                {selectedDepts.map((deptId) => {
                  const dept = departments.find(
                    (d) => d.departmentId === deptId,
                  );
                  return (
                    <span
                      key={deptId}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "4px 10px",
                        borderRadius: 20,
                        background: "var(--gold-dim)",
                        border: "1px solid var(--border-gold)",
                        fontSize: 12,
                        color: "var(--gold)",
                      }}
                    >
                      {dept?.displayName || `Dept ${deptId}`}
                      <button
                        onClick={() => toggleDepartment(deptId)}
                        style={{
                          background: "none",
                          border: "none",
                          padding: 0,
                          cursor: "pointer",
                          display: "flex",
                          color: "var(--gold)",
                        }}
                      >
                        <X size={12} />
                      </button>
                    </span>
                  );
                })}
                <button
                  onClick={clearDepartments}
                  style={{
                    background: "none",
                    border: "none",
                    padding: "4px 10px",
                    fontSize: 11,
                    color: "var(--text-dim)",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Clear all
                </button>
              </div>
            )}

            <div style={{ position: "relative" }}>
              <button
                onClick={() => setDeptDropdownOpen(!deptDropdownOpen)}
                disabled={depsLoading || importing}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  background: "var(--surface2)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  color: "var(--text-mid)",
                  fontSize: 13,
                  cursor: "pointer",
                  transition: "border 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.border =
                    "1px solid var(--border-gold)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.border = "1px solid var(--border)")
                }
              >
                <span>
                  {depsLoading
                    ? "Loading departments..."
                    : "Select departments"}
                </span>
                {depsLoading ? (
                  <Spinner />
                ) : (
                  <ChevronDown
                    size={16}
                    style={{
                      transform: deptDropdownOpen ? "rotate(180deg)" : "none",
                      transition: "transform 0.2s",
                    }}
                  />
                )}
              </button>

              {deptDropdownOpen && !depsLoading && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 4px)",
                    left: 0,
                    right: 0,
                    zIndex: 100,
                    background: "var(--surface)",
                    border: "1px solid var(--border-gold)",
                    borderRadius: 10,
                    maxHeight: 280,
                    overflowY: "auto",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                  }}
                >
                  {departments.map((dept) => (
                    <button
                      key={dept.departmentId}
                      onClick={() => {
                        toggleDepartment(dept.departmentId);
                      }}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 16px",
                        background: "transparent",
                        border: "none",
                        borderBottom: "1px solid var(--border)",
                        color: "var(--text-mid)",
                        fontSize: 13,
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "var(--gold-dim)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <span>{dept.displayName}</span>
                      {selectedDepts.includes(dept.departmentId) && (
                        <Check size={14} style={{ color: "var(--gold)" }} />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {depsError && (
              <div
                style={{ fontSize: 11, color: "var(--crimson)", marginTop: 6 }}
              >
                ⚠️ {depsError}
              </div>
            )}
          </div>

          {/* Features */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginBottom: 20,
            }}
          >
            {[
              "50,000+ open-access artworks",
              "High-resolution images",
              "Rich metadata & bibliography",
              "Real-time database synchronization",
            ].map((f, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 13,
                  color: "var(--text-mid)",
                }}
              >
                <Check
                  size={14}
                  style={{ color: "var(--gold)", minWidth: 14 }}
                />
                {f}
              </div>
            ))}
          </div>

          {/* Badges */}
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              marginBottom: 16,
            }}
          >
            <Badge>Connected</Badge>
            <Badge color="green">API v2</Badge>
          </div>

          <GoldDivider />

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              gap: 10,
              marginTop: 20,
              flexWrap: "wrap",
            }}
          >
            <Button onClick={handleMetImport} disabled={importing}>
              {importing
                ? "Importing..."
                : hasExistingData
                  ? "Add More Artworks"
                  : "Import Collection"}
            </Button>

            {importing && (
              <Button onClick={() => abort()} variant="danger" size="sm">
                Cancel Import
              </Button>
            )}
          </div>

          {/* Met Museum Progress/Result */}
          {(importing || result || importError) && (
            <div style={{ marginTop: 20 }}>
              {importing && (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      marginBottom: 16,
                    }}
                  >
                    <Spinner />
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: "var(--text)",
                      }}
                    >
                      {progress.stage}
                    </span>
                  </div>
                  <div
                    style={{
                      height: 4,
                      background: "var(--surface2)",
                      borderRadius: 4,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${progress.percent}%`,
                        background:
                          "linear-gradient(90deg,var(--gold),var(--gold-light))",
                        borderRadius: 4,
                        transition: "width 0.4s ease",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--text-dim)",
                      marginTop: 6,
                    }}
                  >
                    {progress.percent}%
                  </div>
                </>
              )}

              {result && result.stats && (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      marginBottom: 16,
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: "rgba(45, 122, 82, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Check size={18} style={{ color: "#2D7A52" }} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 15,
                          fontWeight: 600,
                          color: "var(--text)",
                        }}
                      >
                        Import Complete!
                      </div>
                      <div style={{ fontSize: 12, color: "var(--text-dim)" }}>
                        Successfully processed{" "}
                        {result.stats.new + result.stats.updated} items from The
                        Met
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 16,
                      paddingTop: 12,
                      borderTop: "1px solid var(--border)",
                    }}
                  >
                    {[
                      {
                        label: "New Items",
                        value: result.stats.new,
                        color: "#2D7A52",
                      },
                      {
                        label: "Updated",
                        value: result.stats.updated,
                        color: "var(--gold)",
                      },
                      {
                        label: "Skipped",
                        value: result.stats.skipped,
                        color: "var(--text-dim)",
                      },
                      {
                        label: "Removed",
                        value: result.stats.removed,
                        color: "#B8392E",
                      },
                    ].map((s, i) => (
                      <div key={i}>
                        <div
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: 28,
                            fontWeight: 500,
                            color: s.color,
                          }}
                        >
                          {s.value}
                        </div>
                        <div
                          style={{
                            fontSize: 10,
                            color: "var(--text-dim)",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                          }}
                        >
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
                    <Button
                      onClick={() => onImportComplete(result.items)}
                      variant="primary"
                      size="sm"
                    >
                      View in Browse
                    </Button>
                    <Button onClick={reset} variant="ghost" size="sm">
                      Dismiss
                    </Button>
                  </div>
                </>
              )}

              {importError && (
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "rgba(184, 57, 46, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <X size={18} style={{ color: "#B8392E" }} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: "var(--text)",
                      }}
                    >
                      Import Failed
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-dim)" }}>
                      {importError}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>

        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* CARD 2: CSV IMPORT */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        <Card
          style={{
            padding: 32,
            border: "1px solid var(--border)",
            position: "relative",
            overflow: "visible",
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: "rgba(93, 127, 212, 0.15)",
                border: "1px solid rgba(93, 127, 212, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FileText size={28} style={{ color: "#5D7FD4" }} />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 22,
                  fontWeight: 500,
                  color: "var(--text)",
                }}
              >
                CSV Import
              </div>
              <div style={{ fontSize: 12, color: "var(--gold)", marginTop: 2 }}>
                Custom metadata + images
              </div>
            </div>
          </div>

          {/* Upload metadata CSV */}
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                fontSize: 11,
                color: "var(--text-dim)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                display: "block",
                marginBottom: 8,
              }}
            >
              Upload metadata CSV file:
            </label>
            <input
              ref={csvFileRef}
              type="file"
              accept=".csv"
              onChange={(e) => setCSVFile(e.target.files?.[0] || null)}
              disabled={csvImporting}
              style={{
                width: "100%",
                padding: "10px 14px",
                background: "var(--surface2)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                color: "var(--text)",
                fontSize: 13,
                cursor: "pointer",
              }}
            />
            {csvFile && (
              <div style={{ fontSize: 11, color: "#5D7FD4", marginTop: 6 }}>
                ✓ {csvFile.name} ({(csvFile.size / 1024).toFixed(2)} KB)
              </div>
            )}
          </div>

          {/* Upload image files */}
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                fontSize: 11,
                color: "var(--text-dim)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                display: "block",
                marginBottom: 8,
              }}
            >
              Select image files:
            </label>
            <input
              ref={imageFilesRef}
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setImageFiles(e.target.files)}
              disabled={csvImporting}
              style={{
                width: "100%",
                padding: "10px 14px",
                background: "var(--surface2)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                color: "var(--text)",
                fontSize: 13,
                cursor: "pointer",
              }}
            />
            {imageFiles && imageFiles.length > 0 && (
              <div style={{ fontSize: 11, color: "#5D7FD4", marginTop: 6 }}>
                ✓ {imageFiles.length} image{imageFiles.length > 1 ? "s" : ""}{" "}
                selected
              </div>
            )}
          </div>

          {/* Status Badge */}
          <div style={{ marginBottom: 20 }}>
            {csvFile && imageFiles ? (
              <Badge color="green">Ready to Import</Badge>
            ) : (
              <Badge color="blue">Not Imported</Badge>
            )}
          </div>

          <GoldDivider />

          {/* Action Button */}
          <div style={{ marginTop: 20 }}>
            <Button
              onClick={handleCSVImport}
              disabled={!csvFile || csvImporting}
              icon={<Upload size={14} />}
            >
              {csvImporting ? "Importing..." : "Import CSV"}
            </Button>
          </div>

          {/* CSV Progress/Result */}
          {(csvImporting || csvResult || csvError) && (
            <div style={{ marginTop: 20 }}>
              {csvImporting && (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      marginBottom: 16,
                    }}
                  >
                    <Spinner />
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: "var(--text)",
                      }}
                    >
                      Processing CSV file...
                    </span>
                  </div>
                  <div
                    style={{
                      height: 4,
                      background: "var(--surface2)",
                      borderRadius: 4,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${csvProgress}%`,
                        background: "linear-gradient(90deg,#5D7FD4,#8FAEF5)",
                        borderRadius: 4,
                        transition: "width 0.4s ease",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--text-dim)",
                      marginTop: 6,
                    }}
                  >
                    {csvProgress.percent}%
                  </div>
                </>
              )}

              {csvResult && (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      marginBottom: 16,
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: "rgba(45, 122, 82, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Check size={18} style={{ color: "#2D7A52" }} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 15,
                          fontWeight: 600,
                          color: "var(--text)",
                        }}
                      >
                        Import Complete!
                      </div>
                      <div style={{ fontSize: 12, color: "var(--text-dim)" }}>
                        Successfully imported CSV data
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 16,
                      paddingTop: 12,
                      borderTop: "1px solid var(--border)",
                    }}
                  >
                    {[
                      {
                        label: "New",
                        value: csvResult.stats?.new || 0,
                        color: "#2D7A52",
                      },
                      {
                        label: "Updated",
                        value: csvResult.stats?.updated || 0,
                        color: "#5D7FD4",
                      },
                    ].map((s, i) => (
                      <div key={i}>
                        <div
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: 28,
                            fontWeight: 500,
                            color: s.color,
                          }}
                        >
                          {s.value}
                        </div>
                        <div
                          style={{
                            fontSize: 10,
                            color: "var(--text-dim)",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                          }}
                        >
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
                    <Button
                      onClick={() => onImportComplete(csvResult.items)}
                      variant="primary"
                      size="sm"
                    >
                      View in Browse
                    </Button>
                    <Button onClick={resetCSV} variant="ghost" size="sm">
                      Dismiss
                    </Button>
                  </div>
                </>
              )}

              {csvError && (
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "rgba(184, 57, 46, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <X size={18} style={{ color: "#B8392E" }} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: "var(--text)",
                      }}
                    >
                      Import Failed
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-dim)" }}>
                      {csvError}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>

        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* CARD 3: GOOGLE DRIVE */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        <DriveImportCard onComplete={onImportComplete} />
      </div>
    </div>
  );
}
