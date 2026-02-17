import { CheckCircle, AlertCircle } from "lucide-react";
import { Spinner } from "../ui/Spinner";
import { Card } from "../ui/Card";
import type { ImportStatus } from "../../types";

interface ImportProgressProps {
  status: ImportStatus;
  progress: number;          // ← passed separately from ImportPage's useState<number>
}

export function ImportProgress({ status, progress }: ImportProgressProps) {
  if (status.type === "idle") return null;

  return (
    <Card style={{ padding: 28 }}>
      <div style={{ display:"flex", alignItems:"center", gap:14,
                    marginBottom: status.type === "loading" ? 16 : 0 }}>
        {status.type === "loading" && <Spinner />}
        {status.type === "success" && <CheckCircle size={18} style={{ color:"#4CAF81" }} />}
        {status.type === "error"   && <AlertCircle size={18} style={{ color:"#E05656" }} />}
        <span style={{ fontSize:14, fontWeight:500, color:"var(--text)" }}>
          {status.message}
        </span>
      </div>

      {status.type === "loading" && (
        <div>
          <div style={{ height:4, background:"var(--surface2)", borderRadius:4, overflow:"hidden" }}>
            <div style={{
              height:"100%", width:`${progress}%`,
              background:"linear-gradient(90deg,var(--gold),var(--gold-light))",
              borderRadius:4, transition:"width 0.3s ease"
            }}/>
          </div>
          <div style={{ fontSize:11, color:"var(--text-dim)", marginTop:6 }}>{progress}%</div>
        </div>
      )}
    </Card>
  );
}
