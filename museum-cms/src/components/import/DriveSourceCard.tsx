// import { Upload } from "lucide-react";
// import { Badge } from "../ui/Badge";
// import { Button } from "../ui/Button";
// import { GoldDivider } from "../ui/GoldDivider";
// import { useState } from "react";

// interface DriveSourceCardProps {
//   onImport: (folderId: string) => void;
//   isLoading: boolean;
//   hasData: boolean;
// }

// export function DriveSourceCard({
//   onImport,
//   isLoading,
//   hasData,
// }: DriveSourceCardProps) {
//   const [folderId, setFolderId] = useState("");

//   return (
//     <div
//       style={{
//         background: "var(--surface)",
//         border: "1px solid var(--border)",
//         borderRadius: "var(--radius)",
//         padding: 32,
//       }}
//     >
//       <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
//         <div
//           style={{
//             width: 52,
//             height: 52,
//             borderRadius: 14,
//             background: "var(--surface2)",
//             border: "1px solid var(--border)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: 24,
//           }}
//         >
//           📁
//         </div>
//         <div>
//           <div
//             style={{
//               fontFamily: "var(--font-display)",
//               fontSize: 22,
//               fontWeight: 500,
//               color: "var(--text)",
//             }}
//           >
//             Google Drive
//           </div>
//           <div style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 2 }}>
//             Folder ingestion
//           </div>
//         </div>
//       </div>

//       <div style={{ fontSize: 13, marginBottom: 12 }}>
//         Enter Google Drive folder ID:
//       </div>

//       <input
//         type="text"
//         placeholder="e.g. 1AbCdEfGhIjKlMnOp"
//         value={folderId}
//         onChange={(e) => setFolderId(e.target.value)}
//         style={{
//           width: "100%",
//           padding: "8px 10px",
//           borderRadius: 8,
//           border: "1px solid var(--border)",
//           marginBottom: 20,
//         }}
//       />

//       <Badge color={hasData ? "green" : "gray"}>
//         {hasData ? "Imported" : "Not Imported"}
//       </Badge>

//       <GoldDivider />

//       <Button
//         disabled={!folderId || isLoading}
//         icon={<Upload size={14} />}
//         onClick={() => onImport(folderId)}
//       >
//         {hasData ? "Re-import Drive Folder" : "Import Drive Folder"}
//       </Button>
//     </div>
//   );
// }
