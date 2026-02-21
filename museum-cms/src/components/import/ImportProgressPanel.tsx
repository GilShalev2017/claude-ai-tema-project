// interface ImportProgressPanelProps {
//   progress: {
//     step?: string;
//     percent?: number;
//   };
// }

// export function ImportProgressPanel({ progress }: ImportProgressPanelProps) {
//   if (!progress) return null;

//   return (
//     <div
//       style={{
//         background: "var(--surface2)",
//         padding: 24,
//         borderRadius: 12,
//         border: "1px solid var(--border)",
//         marginBottom: 24,
//       }}
//     >
//       <div style={{ fontSize: 14, color: "var(--text-mid)", marginBottom: 8 }}>
//         {progress.step || "Working..."}
//       </div>

//       <div
//         style={{
//           width: "100%",
//           height: 8,
//           background: "var(--surface)",
//           borderRadius: 6,
//           overflow: "hidden",
//         }}
//       >
//         <div
//           style={{
//             height: "100%",
//             width: `${progress.percent ?? 0}%`,
//             background: "var(--gold)",
//             transition: "width 0.3s",
//           }}
//         />
//       </div>

//       <div
//         style={{
//           marginTop: 8,
//           textAlign: "right",
//           fontSize: 12,
//           color: "var(--text-dim)",
//         }}
//       >
//         {progress.percent || 0}% completed
//       </div>
//     </div>
//   );
// }
