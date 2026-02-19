import { Upload } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { GoldDivider } from "../ui/GoldDivider";
import { useState } from "react";

interface CsvSourceCardProps {
  onImport: (csvFile: File, images: File[]) => void;
  isLoading: boolean;
  hasData: boolean;
}

export function CsvSourceCard({
  onImport,
  isLoading,
  hasData,
}: CsvSourceCardProps) {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: 32,
      }}
    >
      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            background: "var(--surface2)",
            border: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
          }}
        >
          📄
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
          <div style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 2 }}>
            Custom metadata + images
          </div>
        </div>
      </div>

      <div style={{ fontSize: 13, marginBottom: 12 }}>
        Upload metadata CSV file:
      </div>
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
      />

      <div style={{ fontSize: 13, marginTop: 20, marginBottom: 12 }}>
        Select image files:
      </div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => setImageFiles(Array.from(e.target.files || []))}
      />

      <div style={{ marginTop: 16 }}>
        <Badge color={hasData ? "green" : "gray"}>
          {hasData ? "Imported" : "Not Imported"}
        </Badge>
      </div>

      <GoldDivider />

      <Button
        disabled={!csvFile || isLoading}
        icon={<Upload size={14} />}
        onClick={() => onImport(csvFile!, imageFiles)}
      >
        {hasData ? "Re-import CSV" : "Import CSV"}
      </Button>
    </div>
  );
}
