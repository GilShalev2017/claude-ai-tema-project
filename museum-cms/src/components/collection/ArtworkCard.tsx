// import { useState } from "react";
// import { Calendar, Tag, Sparkles } from "lucide-react";
// import { Badge } from "../ui/Badge";
// import type { Artwork } from "../../types";

// interface ArtworkCardProps {
//   artwork: Artwork;
//   onClick: () => void;
// }

// export function ArtworkCard({ artwork, onClick }: ArtworkCardProps) {
//   const [imgLoaded, setImgLoaded] = useState(false);

//   return (
//     <div
//       onClick={onClick}
//       style={{
//         background: "var(--surface)",
//         border: "1px solid var(--border)",
//         borderRadius: 14,
//         overflow: "hidden",
//         cursor: "pointer",
//         transition: "all 0.3s",
//       }}
//       onMouseEnter={(e) => {
//         const el = e.currentTarget as HTMLDivElement;
//         el.style.transform = "translateY(-4px)";
//         el.style.border = "1px solid var(--border-gold)";
//         el.style.boxShadow = "0 16px 48px rgba(0,0,0,0.6)";
//       }}
//       onMouseLeave={(e) => {
//         const el = e.currentTarget as HTMLDivElement;
//         el.style.transform = "none";
//         el.style.border = "1px solid var(--border)";
//         el.style.boxShadow = "none";
//       }}
//     >
//       <div
//         style={{
//           position: "relative",
//           height: 220,
//           background: "var(--surface2)",
//           overflow: "hidden",
//         }}
//       >
//         {!imgLoaded && (
//           <div className="shimmer" style={{ position: "absolute", inset: 0 }} />
//         )}
//         <img
//           src={artwork.imageUrl || ""}
//           alt={artwork.title}
//           onLoad={() => setImgLoaded(true)}
//           onError={(e) => {
//             (e.target as HTMLImageElement).style.opacity = "0";
//           }}
//           style={{
//             width: "100%",
//             height: "100%",
//             objectFit: "cover",
//             display: "block",
//             opacity: imgLoaded ? 1 : 0,
//             transition: "opacity 0.4s",
//           }}
//         />
//         <div
//           style={{
//             position: "absolute",
//             inset: 0,
//             background:
//               "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
//           }}
//         />
//         <div
//           style={{
//             position: "absolute",
//             top: 10,
//             right: 10,
//             display: "flex",
//             gap: 6,
//           }}
//         >
//           {Array.isArray(artwork.aiKeywords) && artwork.aiKeywords.length > 0 && (
//             <Badge>
//               <Sparkles size={10} /> AI
//             </Badge>
//           )}
//           {/* <Badge color="red">{artwork.metadata?.department}</Badge> */}
//         </div>
//       </div>
//       <div style={{ padding: "16px 18px" }}>
//         <div
//           style={{
//             fontFamily: "var(--font-display)",
//             fontSize: 17,
//             fontWeight: 500,
//             color: "var(--text)",
//             marginBottom: 4,
//             lineHeight: 1.3,
//             overflow: "hidden",
//             textOverflow: "ellipsis",
//             whiteSpace: "nowrap",
//           }}
//         >
//           {artwork.title}
//         </div>
//         <div
//           style={{
//             fontSize: 12,
//             color: "var(--text-dim)",
//             marginBottom: 12,
//           }}
//         >
//           {artwork.artist || "Unknown Artist"}
//         </div>
//         <div
//           style={{
//             display: "flex",
//             gap: 12,
//             fontSize: 11,
//             color: "var(--text-dim)",
//           }}
//         >
//           <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
//             <Calendar size={11} />
//             {artwork.year || "Unknown"}
//           </span>
//           <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
//             <Tag size={11} />
//             {artwork.metadata?.medium || "Unknown"}
//           </span>
//         </div>
//         {Array.isArray(artwork.aiKeywords) && artwork.aiKeywords.length > 0 && (
//           <div
//             style={{
//               display: "flex",
//               flexWrap: "wrap",
//               gap: 4,
//               marginTop: 10,
//               maxHeight: 24,
//               overflow: "hidden",
//             }}
//           >
//             {(Array.isArray(artwork.aiKeywords) ? artwork.aiKeywords : [])
//               .slice(0, 2)
//               .map((tag, i) => (
//               <span
//                 key={i}
//                 style={{
//                   fontSize: 12,
//                   padding: "2px 6px",
//                   borderRadius: 10,
//                   background: "var(--gold-dim)",
//                   color: "var(--gold)",
//                   border: "1px solid var(--border-gold)",
//                   whiteSpace: "nowrap",
//                 }}
//               >
//                 {tag}
//               </span>
//             ))}
//             {Array.isArray(artwork.aiKeywords) && artwork.aiKeywords.length > 2 && (
//               <span
//                 style={{
//                   fontSize: 12,
//                   padding: "2px 6px",
//                   borderRadius: 10,
//                   background: "var(--gold-dim)",
//                   color: "var(--gold)",
//                   border: "1px solid var(--border-gold)",
//                   whiteSpace: "nowrap",
//                 }}
//               >
//                 +{artwork.aiKeywords.length - 2}
//               </span>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

//GEMINI I
// import { useState } from "react";
// import { Sparkles, Star } from "lucide-react";
// import { Badge } from "../ui/Badge";
// import type { Artwork } from "../../types";

// interface ArtworkCardProps {
//   artwork: Artwork;
//   onClick: () => void;
// }

// export function ArtworkCard({ artwork, onClick }: ArtworkCardProps) {
//   const [imgLoaded, setImgLoaded] = useState(false);

//   // Formatting helper for the year to handle BC/AD or negative numbers
//   const displayYear = artwork.year
//     ? artwork.year < 0
//       ? `${Math.abs(artwork.year)} BC`
//       : artwork.year
//     : "Undated";

//   return (
//     <div
//       onClick={onClick}
//       style={{
//         background: "var(--surface)",
//         border: "1px solid var(--border)",
//         borderRadius: 14,
//         overflow: "hidden",
//         cursor: "pointer",
//         transition: "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
//       }}
//       onMouseEnter={(e) => {
//         const el = e.currentTarget as HTMLDivElement;
//         el.style.transform = "translateY(-6px)";
//         el.style.border = "1px solid var(--border-gold)";
//         el.style.boxShadow = "0 20px 40px rgba(0,0,0,0.4)";
//       }}
//       onMouseLeave={(e) => {
//         const el = e.currentTarget as HTMLDivElement;
//         el.style.transform = "none";
//         el.style.border = "1px solid var(--border)";
//         el.style.boxShadow = "none";
//       }}
//     >
//       {/* Image Container */}
//       <div
//         style={{
//           position: "relative",
//           height: 240,
//           background: "var(--surface2)",
//           overflow: "hidden",
//         }}
//       >
//         {!imgLoaded && (
//           <div className="shimmer" style={{ position: "absolute", inset: 0 }} />
//         )}

//         <img
//           src={artwork.imageUrl || ""}
//           alt={artwork.title}
//           onLoad={() => setImgLoaded(true)}
//           style={{
//             width: "100%",
//             height: "100%",
//             objectFit: "cover",
//             display: "block",
//             opacity: imgLoaded ? 1 : 0,
//             transition: "opacity 0.6s ease, transform 0.6s ease",
//           }}
//         />

//         {/* Decorative Gradient Overlay */}
//         <div
//           style={{
//             position: "absolute",
//             inset: 0,
//             background:
//               "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 40%)",
//           }}
//         />

//         {/* Top Badges */}
//         <div
//           style={{
//             position: "absolute",
//             top: 12,
//             left: 12,
//             right: 12,
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "flex-start",
//           }}
//         >
//           <div style={{ display: "flex", gap: 6, marginLeft: "auto" }}>
//             {/* Subtle Department Overlay instead of Red Badge */}
//             <div
//               style={{
//                 background: "rgba(0,0,0,0.6)",
//                 backdropFilter: "blur(4px)",
//                 color: "#fff",
//                 fontSize: 10,
//                 padding: "4px 8px",
//                 borderRadius: 6,
//                 textTransform: "uppercase",
//                 letterSpacing: "0.05em",
//                 fontWeight: 600,
//                 border: "1px solid rgba(255,255,255,0.1)",
//               }}
//             >
//               {artwork.metadata?.department?.replace("The ", "")}
//             </div>
//           </div>
//         </div>

//         {/* AI Sparkle Indicator */}
//         {artwork.aiKeywords && artwork.aiKeywords.length > 0 && (
//           <div
//             style={{
//               position: "absolute",
//               bottom: 12,
//               right: 12,
//               color: "var(--gold)",
//             }}
//           >
//             <Sparkles size={16} />
//           </div>
//         )}
//       </div>

//       {/* Content Area */}
//       <div style={{ padding: "18px" }}>
//         {/* Title: Serif & Strong */}
//         <div
//           style={{
//             fontFamily: "var(--font-display)",
//             fontSize: 16,
//             fontWeight: 600,
//             color: "var(--text)",
//             marginBottom: 4,
//             lineHeight: 1.2,
//             display: "-webkit-box",
//             WebkitLineClamp: 2,
//             WebkitBoxOrient: "vertical",
//             overflow: "hidden",
//             height: "2.4em",
//           }}
//         >
//           {artwork.title}
//         </div>

//         {/* Artist & Year Row */}
//         <div
//           style={{
//             fontSize: 13,
//             color: "var(--text-mid)",
//             marginBottom: 14,
//             display: "flex",
//             justifyContent: "space-between",
//           }}
//         >
//           <span>{artwork.artist || "Unknown Artist"}</span>
//           <span style={{ color: "var(--text-dim)", fontFamily: "monospace" }}>
//             {displayYear}
//           </span>
//         </div>

//         {/* Footer: Medium/Description */}
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: 8,
//             fontSize: 10,
//             color: "var(--text-dim)",
//             borderTop: "1px solid var(--border)",
//             paddingTop: 12,
//             textTransform: "uppercase",
//             letterSpacing: "0.03em",
//           }}
//         >
//           <span style={{ flexShrink: 0 }}>Medium</span>
//           <span style={{ width: 1, height: 10, background: "var(--border)" }} />
//           <span
//             style={{
//               overflow: "hidden",
//               textOverflow: "ellipsis",
//               whiteSpace: "nowrap",
//               fontStyle: "italic",
//               textTransform: "none",
//             }}
//           >
//             {artwork.description || artwork.metadata?.medium || "Not specified"}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// GEMINI II
import { useState } from "react";
import { Sparkles, Calendar, Tag } from "lucide-react";
import type { Artwork } from "../../types";

interface ArtworkCardProps {
  artwork: Artwork;
  onClick: () => void;
}

export function ArtworkCard({ artwork, onClick }: ArtworkCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const displayYear = artwork.year
    ? artwork.year < 0
      ? `${Math.abs(artwork.year)} BC`
      : artwork.year
    : "Undated";

  // return (
  //   <div
  //     onClick={onClick}
  //     onMouseEnter={() => setIsHovered(true)}
  //     onMouseLeave={() => setIsHovered(false)}
  //     style={{
  //       background: "var(--surface)",
  //       border: isHovered
  //         ? "1px solid var(--border-gold)"
  //         : "1px solid var(--border)",
  //       borderRadius: 14,
  //       overflow: "hidden",
  //       cursor: "pointer",
  //       // Dramatic hover: slightly more lift and smoother shadow
  //       transform: isHovered ? "translateY(-8px)" : "none",
  //       boxShadow: isHovered ? "0 20px 40px rgba(0,0,0,0.5)" : "none",
  //       transition: "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
  //     }}
  //   >
  //     {/* Image Container */}
  //     <div
  //       style={{
  //         position: "relative",
  //         height: 240, // Keeping the taller 240px for better vertical presence
  //         background: "var(--surface2)",
  //         overflow: "hidden",
  //       }}
  //     >
  //       {!imgLoaded && (
  //         <div className="shimmer" style={{ position: "absolute", inset: 0 }} />
  //       )}

  //       <img
  //         src={artwork.imageUrl || ""}
  //         alt={artwork.title}
  //         onLoad={() => setImgLoaded(true)}
  //         style={{
  //           width: "100%",
  //           height: "100%",
  //           objectFit: "cover",
  //           display: "block",
  //           opacity: imgLoaded ? 1 : 0,
  //           // DRAMATIC ZOOM EFFECT: Scale up slightly on hover
  //           transform: isHovered ? "scale(1.1)" : "scale(1)",
  //           transition:
  //             "opacity 0.6s ease, transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)",
  //         }}
  //       />

  //       {/* Decorative Gradient Overlay */}
  //       <div
  //         style={{
  //           position: "absolute",
  //           inset: 0,
  //           background:
  //             "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)",
  //           opacity: isHovered ? 0.8 : 1,
  //           transition: "opacity 0.4s",
  //         }}
  //       />

  //       {/* Top Badges - Only visible on hover per point #4 */}
  //       <div
  //         style={{
  //           position: "absolute",
  //           top: 12,
  //           right: 12,
  //           opacity: isHovered ? 1 : 0,
  //           transform: isHovered ? "translateY(0)" : "translateY(-5px)",
  //           transition: "all 0.3s ease",
  //         }}
  //       >
  //         <div
  //           style={{
  //             background: "rgba(0,0,0,0.7)",
  //             backdropFilter: "blur(8px)",
  //             color: "#fff",
  //             fontSize: 10,
  //             padding: "5px 10px",
  //             borderRadius: 6,
  //             textTransform: "uppercase",
  //             letterSpacing: "0.05em",
  //             fontWeight: 600,
  //             border: "1px solid rgba(255,255,255,0.2)",
  //           }}
  //         >
  //           {artwork.metadata?.department?.replace("The ", "")}
  //         </div>
  //       </div>

  //       {/* Sparkle Icon (Static indicator) */}
  //       {artwork.aiKeywords && artwork.aiKeywords.length > 0 && (
  //         <div
  //           style={{
  //             position: "absolute",
  //             bottom: 12,
  //             right: 12,
  //             color: "var(--gold)",
  //           }}
  //         >
  //           <Sparkles size={16} />
  //         </div>
  //       )}
  //     </div>

  //     {/* Content Area */}
  //     <div style={{ padding: "18px" }}>
  //       <div
  //         style={{
  //           fontFamily: "var(--font-display)",
  //           fontSize: 16,
  //           fontWeight: 600,
  //           color: "var(--text)",
  //           marginBottom: 4,
  //           lineHeight: 1.2,
  //           display: "-webkit-box",
  //           WebkitLineClamp: 2,
  //           WebkitBoxOrient: "vertical",
  //           overflow: "hidden",
  //           height: "2.2em",
  //         }}
  //       >
  //         {artwork.title}
  //       </div>

  //       <div
  //         style={{
  //           fontSize: 13,
  //           color: "var(--text-mid)",
  //           marginBottom: 12,
  //           display: "flex",
  //           justifyContent: "space-between",
  //         }}
  //       >
  //         <span>{artwork.artist || "Unknown Artist"}</span>
  //         <span style={{ color: "var(--text-dim)", fontFamily: "monospace" }}>
  //           {displayYear}
  //         </span>
  //       </div>

  //       {/* AI Keywords - Restored from previous version */}
  //       {/* {Array.isArray(artwork.aiKeywords) && artwork.aiKeywords.length > 0 && (
  //         <div
  //           style={{
  //             display: "flex",
  //             flexWrap: "wrap",
  //             gap: 6,
  //             marginBottom: 14,
  //           }}
  //         >
  //           {artwork.aiKeywords.slice(0, 2).map((tag, i) => (
  //             <span
  //               key={i}
  //               style={{
  //                 fontSize: 11,
  //                 padding: "2px 8px",
  //                 borderRadius: 20,
  //                 background: "var(--gold-dim)",
  //                 color: "var(--gold)",
  //                 border: "1px solid var(--border-gold)",
  //                 whiteSpace: "nowrap",
  //               }}
  //             >
  //               {tag}
  //             </span>
  //           ))}
  //           {artwork.aiKeywords.length > 2 && (
  //             <span
  //               style={{
  //                 fontSize: 11,
  //                 color: "var(--gold)",
  //                 alignSelf: "center",
  //               }}
  //             >
  //               +{artwork.aiKeywords.length - 2}
  //             </span>
  //           )}
  //         </div>
  //       )} */}

  //       {/* Footer: Description Label */}
  //       {/* <div
  //         style={{
  //           display: "flex",
  //           alignItems: "center",
  //           gap: 8,
  //           fontSize: 10,
  //           color: "var(--text-dim)",
  //           borderTop: "1px solid var(--border)",
  //           paddingTop: 12,
  //           textTransform: "uppercase",
  //           letterSpacing: "0.03em",
  //         }}
  //       >

  //         <span style={{ flexShrink: 0, fontWeight: 600 }}>Description</span>
  //         <span style={{ width: 1, height: 10, background: "var(--border)" }} />
  //         <span
  //           style={{
  //             overflow: "hidden",
  //             textOverflow: "ellipsis",
  //             whiteSpace: "nowrap",
  //             fontStyle: "italic",
  //             textTransform: "none",
  //           }}
  //         >
  //           {artwork.description || artwork.metadata?.medium || "No details"}
  //         </span>
  //       </div> */}
  //     </div>
  //   </div>
  // );

  // return (
  //   <div
  //     onClick={onClick}
  //     onMouseEnter={() => setIsHovered(true)}
  //     onMouseLeave={() => setIsHovered(false)}
  //     style={{
  //       background: "var(--surface)",
  //       border: isHovered
  //         ? "1px solid var(--border-gold)"
  //         : "1px solid var(--border)",
  //       borderRadius: 14,
  //       overflow: "hidden",
  //       cursor: "pointer",
  //       transform: isHovered ? "translateY(-8px)" : "none",
  //       boxShadow: isHovered ? "0 20px 40px rgba(0,0,0,0.5)" : "none",
  //       transition: "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
  //     }}
  //   >
  //     {/* Image Container */}
  //     <div
  //       style={{
  //         position: "relative",
  //         height: 240,
  //         background: "var(--surface2)",
  //         overflow: "hidden",
  //       }}
  //     >
  //       {!imgLoaded && (
  //         <div className="shimmer" style={{ position: "absolute", inset: 0 }} />
  //       )}

  //       <img
  //         src={artwork.imageUrl || ""}
  //         alt={artwork.title}
  //         onLoad={() => setImgLoaded(true)}
  //         style={{
  //           width: "100%",
  //           height: "100%",
  //           objectFit: "cover",
  //           display: "block",
  //           opacity: imgLoaded ? 1 : 0,
  //           transform: isHovered ? "scale(1.1)" : "scale(1)",
  //           transition:
  //             "opacity 0.6s ease, transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)",
  //         }}
  //       />

  //       {/* Decorative Gradient Overlay */}
  //       <div
  //         style={{
  //           position: "absolute",
  //           inset: 0,
  //           background:
  //             "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)",
  //           opacity: isHovered ? 0.8 : 1,
  //           transition: "opacity 0.4s",
  //         }}
  //       />

  //       {/* Top Badges - Only visible on hover */}
  //       <div
  //         style={{
  //           position: "absolute",
  //           top: 12,
  //           right: 12,
  //           opacity: isHovered ? 1 : 0,
  //           transform: isHovered ? "translateY(0)" : "translateY(-5px)",
  //           transition: "all 0.3s ease",
  //         }}
  //       >
  //         <div
  //           style={{
  //             background: "rgba(0,0,0,0.7)",
  //             backdropFilter: "blur(8px)",
  //             color: "#fff",
  //             fontSize: 10,
  //             padding: "5px 10px",
  //             borderRadius: 6,
  //             textTransform: "uppercase",
  //             letterSpacing: "0.05em",
  //             fontWeight: 600,
  //             border: "1px solid rgba(255,255,255,0.2)",
  //           }}
  //         >
  //           {artwork.metadata?.department?.replace("The ", "")}
  //         </div>
  //       </div>

  //       {/* Sparkle Icon */}
  //       {artwork.aiKeywords && artwork.aiKeywords.length > 0 && (
  //         <div
  //           style={{
  //             position: "absolute",
  //             bottom: 12,
  //             right: 12,
  //             color: "var(--gold)",
  //           }}
  //         >
  //           <Sparkles size={16} />
  //         </div>
  //       )}
  //     </div>

  //     {/* Content Area - Tightened padding */}
  //     <div style={{ padding: "12px 14px 10px" }}>
  //       <div
  //         style={{
  //           fontFamily: "var(--font-display)",
  //           fontSize: 15, // Slightly smaller for better fit
  //           fontWeight: 600,
  //           color: "var(--text)",
  //           marginBottom: 4,
  //           lineHeight: 1.3,
  //           display: "-webkit-box",
  //           WebkitLineClamp: 2,
  //           WebkitBoxOrient: "vertical",
  //           overflow: "hidden",
  //           minHeight: "2.6em", // Ensures title area is consistent
  //         }}
  //       >
  //         {artwork.title}
  //       </div>

  //       <div
  //         style={{
  //           fontSize: 12,
  //           color: "var(--text-mid)",
  //           marginBottom: 0, // Removed bottom margin to cut card height
  //           display: "flex",
  //           justifyContent: "space-between",
  //           alignItems: "center",
  //         }}
  //       >
  //         <span
  //           style={{
  //             overflow: "hidden",
  //             textOverflow: "ellipsis",
  //             whiteSpace: "nowrap",
  //             marginRight: 8,
  //           }}
  //         >
  //           {artwork.artist || "Unknown Artist"}
  //         </span>
  //         <span
  //           style={{
  //             color: "var(--text-dim)",
  //             fontFamily: "monospace",
  //             flexShrink: 0,
  //           }}
  //         >
  //           {displayYear}
  //         </span>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: "var(--surface)",
        border: isHovered
          ? "1px solid var(--border-gold)"
          : "1px solid var(--border)",
        borderRadius: 14,
        overflow: "hidden",
        cursor: "pointer",
        transform: isHovered ? "translateY(-6px)" : "none", // Reduced lift to save overflow space
        boxShadow: isHovered ? "0 15px 30px rgba(0,0,0,0.5)" : "none",
        transition: "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
      }}
    >
      {/* Image Container - Reduced to 200px to fit 3 rows on screen */}
      <div
        style={{
          position: "relative",
          height: 200,
          background: "var(--surface2)",
          overflow: "hidden",
        }}
      >
        {!imgLoaded && (
          <div className="shimmer" style={{ position: "absolute", inset: 0 }} />
        )}

        <img
          src={artwork.imageUrl || ""}
          alt={artwork.title}
          onLoad={() => setImgLoaded(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            opacity: imgLoaded ? 1 : 0,
            transform: isHovered ? "scale(1.1)" : "scale(1)",
            transition:
              "opacity 0.6s ease, transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)",
          }}
        />

        {/* Decorative Gradient Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)",
            opacity: isHovered ? 0.8 : 1,
            transition: "opacity 0.4s",
          }}
        />

        {/* Top Badges - Only visible on hover */}
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "translateY(0)" : "translateY(-5px)",
            transition: "all 0.3s ease",
          }}
        >
          <div
            style={{
              background: "rgba(0,0,0,0.75)",
              backdropFilter: "blur(8px)",
              color: "#fff",
              fontSize: 9,
              padding: "4px 8px",
              borderRadius: 4,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              fontWeight: 600,
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {artwork.metadata?.department?.replace("The ", "")}
          </div>
        </div>

        {/* Sparkle Icon */}
        {artwork.aiKeywords && artwork.aiKeywords.length > 0 && (
          <div
            style={{
              position: "absolute",
              bottom: 10,
              right: 10,
              color: "var(--gold)",
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
            }}
          >
            <Sparkles size={14} />
          </div>
        )}
      </div>

      {/* Content Area - Minimized Padding */}
      <div style={{ padding: "10px 12px" }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 14,
            fontWeight: 600,
            color: "var(--text)",
            marginBottom: 2,
            lineHeight: 1.2,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "2.4em",
          }}
        >
          {artwork.title}
        </div>

        <div
          style={{
            fontSize: 11,
            color: "var(--text-mid)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              marginRight: 6,
            }}
          >
            {artwork.artist || "Unknown Artist"}
          </span>
          <span
            style={{
              color: "var(--text-dim)",
              fontFamily: "monospace",
              flexShrink: 0,
              fontSize: 10,
            }}
          >
            {displayYear}
          </span>
        </div>
      </div>
    </div>
  );
}

// GEMINI III
// import { useState } from "react";
// import { Sparkles } from "lucide-react";
// import type { Artwork } from "../../types";

// interface ArtworkCardProps {
//   artwork: Artwork;
//   onClick: () => void;
// }

// export function ArtworkCard({ artwork, onClick }: ArtworkCardProps) {
//   const [imgLoaded, setImgLoaded] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);

//   const displayYear = artwork.year
//     ? artwork.year < 0
//       ? `${Math.abs(artwork.year)} BC`
//       : artwork.year
//     : "Undated";

//   return (
//     <div
//       onClick={onClick}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       style={{
//         background: "var(--surface)",
//         border: isHovered
//           ? "1px solid var(--border-gold)"
//           : "1px solid var(--border)",
//         borderRadius: 14,
//         overflow: "hidden",
//         cursor: "pointer",
//         transform: isHovered ? "translateY(-6px)" : "none",
//         boxShadow: isHovered ? "0 12px 24px rgba(0,0,0,0.4)" : "none",
//         transition: "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
//         height: "fit-content", // Shrinks card to content
//       }}
//     >
//       {/* Image Container - Kept at 240px for verticality */}
//       <div
//         style={{
//           position: "relative",
//           height: 240,
//           background: "var(--surface2)",
//           overflow: "hidden",
//         }}
//       >
//         {!imgLoaded && (
//           <div className="shimmer" style={{ position: "absolute", inset: 0 }} />
//         )}

//         <img
//           src={artwork.imageUrl || ""}
//           alt={artwork.title}
//           onLoad={() => setImgLoaded(true)}
//           style={{
//             width: "100%",
//             height: "100%",
//             objectFit: "cover",
//             display: "block",
//             opacity: imgLoaded ? 1 : 0,
//             /* Dramatic Zoom Effect */
//             transform: isHovered ? "scale(1.1)" : "scale(1)",
//             transition:
//               "opacity 0.6s ease, transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)",
//           }}
//         />

//         <div
//           style={{
//             position: "absolute",
//             inset: 0,
//             background:
//               "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%)",
//           }}
//         />

//         {/* Department Badge - Only on Hover */}
//         <div
//           style={{
//             position: "absolute",
//             top: 10,
//             right: 10,
//             opacity: isHovered ? 1 : 0,
//             transform: isHovered ? "translateY(0)" : "translateY(-4px)",
//             transition: "all 0.3s ease",
//           }}
//         >
//           <div
//             style={{
//               background: "rgba(0,0,0,0.75)",
//               backdropFilter: "blur(8px)",
//               color: "#fff",
//               fontSize: 9,
//               padding: "3px 8px",
//               borderRadius: 4,
//               textTransform: "uppercase",
//               letterSpacing: "0.04em",
//               fontWeight: 600,
//               border: "1px solid rgba(255,255,255,0.15)",
//             }}
//           >
//             {artwork.metadata?.department?.replace("The ", "")}
//           </div>
//         </div>
//       </div>

//       {/* Content Area - Tightened padding and gaps */}
//       <div style={{ padding: "12px 14px" }}>
//         {/* Title Row */}
//         <div
//           style={{
//             fontFamily: "var(--font-display)",
//             fontSize: 15,
//             fontWeight: 600,
//             color: "var(--text)",
//             lineHeight: 1.2,
//             display: "-webkit-box",
//             WebkitLineClamp: 1, // Reduced to 1 line to save vertical space
//             WebkitBoxOrient: "vertical",
//             overflow: "hidden",
//             marginBottom: 2,
//           }}
//         >
//           {artwork.title}
//         </div>

//         {/* Artist & Year Row */}
//         <div
//           style={{
//             fontSize: 12,
//             color: "var(--text-mid)",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: 8,
//           }}
//         >
//           <span
//             style={{
//               overflow: "hidden",
//               textOverflow: "ellipsis",
//               whiteSpace: "nowrap",
//               marginRight: 8,
//             }}
//           >
//             {artwork.artist || "Unknown Artist"}
//           </span>
//           <span
//             style={{ color: "var(--text-dim)", fontSize: 11, flexShrink: 0 }}
//           >
//             {displayYear}
//           </span>
//         </div>

//         {/* Description Row (Formerly Medium) */}
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: 6,
//             fontSize: 10,
//             color: "var(--text-dim)",
//             paddingTop: 8,
//             borderTop: "1px solid var(--border)",
//           }}
//         >
//           <span style={{ flexShrink: 0, fontWeight: 600, textTransform: 'uppercase', fontSize: 9 }}>Description</span>
//           <span style={{ width: 1, height: 8, background: "var(--border)" }} />
//           <span
//             style={{
//               overflow: "hidden",
//               textOverflow: "ellipsis",
//               whiteSpace: "nowrap",
//               fontStyle: "italic",
//             }}
//           >
//             {artwork.description || artwork.metadata?.medium || "—"}
//           </span>
//         </div>

//         {/* AI Keywords - Moved to bottom-most extra row */}
//         {Array.isArray(artwork.aiKeywords) && artwork.aiKeywords.length > 0 && (
//           <div
//             style={{
//               display: "flex",
//               flexWrap: "wrap",
//               gap: 4,
//               marginTop: 10,
//               paddingTop: 8,
//               borderTop: "1px dashed var(--border)",
//             }}
//           >
//             <Sparkles
//               size={10}
//               style={{ color: "var(--gold)", marginRight: 2 }}
//             />
//             {artwork.aiKeywords.slice(0, 3).map((tag, i) => (
//               <span
//                 key={i}
//                 style={{
//                   fontSize: 12,
//                   padding: "1px 6px",
//                   borderRadius: 10,
//                   background: "var(--gold-dim)",
//                   color: "var(--gold)",
//                   border: "1px solid var(--border-gold)",
//                 }}
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

//GEMINI ORIGINAL III?
// import { useState } from "react";
// import { Sparkles } from "lucide-react";
// import type { Artwork } from "../../types";

// interface ArtworkCardProps {
//   artwork: Artwork;
//   onClick: () => void;
// }

// export function ArtworkCard({ artwork, onClick }: ArtworkCardProps) {
//   const [imgLoaded, setImgLoaded] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);

//   const displayYear = artwork.year
//     ? artwork.year < 0
//       ? `${Math.abs(artwork.year)} BC`
//       : artwork.year
//     : "Undated";

//   return (
//     <div
//       onClick={onClick}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       style={{
//         background: "var(--surface)",
//         border: isHovered
//           ? "1px solid var(--border-gold)"
//           : "1px solid var(--border)",
//         borderRadius: 14,
//         overflow: "hidden",
//         cursor: "pointer",
//         transform: isHovered ? "translateY(-6px)" : "none",
//         boxShadow: isHovered ? "0 12px 24px rgba(0,0,0,0.4)" : "none",
//         transition: "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
//         height: "fit-content", // Shrinks card to content
//       }}
//     >
//       {/* Image Container - Kept at 240px for verticality */}
//       <div
//         style={{
//           position: "relative",
//           height: 240,
//           background: "var(--surface2)",
//           overflow: "hidden",
//         }}
//       >
//         {!imgLoaded && (
//           <div className="shimmer" style={{ position: "absolute", inset: 0 }} />
//         )}

//         <img
//           src={artwork.imageUrl || ""}
//           alt={artwork.title}
//           onLoad={() => setImgLoaded(true)}
//           style={{
//             width: "100%",
//             height: "100%",
//             objectFit: "cover",
//             display: "block",
//             opacity: imgLoaded ? 1 : 0,
//             /* Dramatic Zoom Effect */
//             transform: isHovered ? "scale(1.1)" : "scale(1)",
//             transition:
//               "opacity 0.6s ease, transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)",
//           }}
//         />

//         <div
//           style={{
//             position: "absolute",
//             inset: 0,
//             background:
//               "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%)",
//           }}
//         />

//         {/* Department Badge - Only on Hover */}
//         <div
//           style={{
//             position: "absolute",
//             top: 10,
//             right: 10,
//             opacity: isHovered ? 1 : 0,
//             transform: isHovered ? "translateY(0)" : "translateY(-4px)",
//             transition: "all 0.3s ease",
//           }}
//         >
//           <div
//             style={{
//               background: "rgba(0,0,0,0.75)",
//               backdropFilter: "blur(8px)",
//               color: "#fff",
//               fontSize: 9,
//               padding: "3px 8px",
//               borderRadius: 4,
//               textTransform: "uppercase",
//               letterSpacing: "0.04em",
//               fontWeight: 600,
//               border: "1px solid rgba(255,255,255,0.15)",
//             }}
//           >
//             {artwork.metadata?.department?.replace("The ", "")}
//           </div>
//         </div>
//       </div>

//       {/* Content Area - Tightened padding and gaps */}
//       <div style={{ padding: "12px 14px" }}>
//         {/* Title Row */}
//         <div
//           style={{
//             fontFamily: "var(--font-display)",
//             fontSize: 15,
//             fontWeight: 600,
//             color: "var(--text)",
//             lineHeight: 1.2,
//             display: "-webkit-box",
//             WebkitLineClamp: 1, // Reduced to 1 line to save vertical space
//             WebkitBoxOrient: "vertical",
//             overflow: "hidden",
//             marginBottom: 2,
//           }}
//         >
//           {artwork.title}
//         </div>

//         {/* Artist & Year Row */}
//         <div
//           style={{
//             fontSize: 12,
//             color: "var(--text-mid)",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: 8,
//           }}
//         >
//           <span
//             style={{
//               overflow: "hidden",
//               textOverflow: "ellipsis",
//               whiteSpace: "nowrap",
//               marginRight: 8,
//             }}
//           >
//             {artwork.artist || "Unknown Artist"}
//           </span>
//           <span
//             style={{ color: "var(--text-dim)", fontSize: 11, flexShrink: 0 }}
//           >
//             {displayYear}
//           </span>
//         </div>

//         {/* Description Row (Formerly Medium) */}
//         {/* <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: 6,
//             fontSize: 10,
//             color: "var(--text-dim)",
//             paddingTop: 8,
//             borderTop: "1px solid var(--border)",
//           }}
//         >
//           <span
//             style={{
//               flexShrink: 0,
//               fontWeight: 600,
//               textTransform: "uppercase",
//               fontSize: 9,
//             }}
//           >
//             Description
//           </span>
//           <span style={{ width: 1, height: 8, background: "var(--border)" }} />
//           <span
//             style={{
//               overflow: "hidden",
//               textOverflow: "ellipsis",
//               whiteSpace: "nowrap",
//               fontStyle: "italic",
//             }}
//           >
//             {artwork.description || artwork.metadata?.medium || "—"}
//           </span>
//         </div> */}

//         {/* AI Keywords - Moved to bottom-most extra row */}
//         {Array.isArray(artwork.aiKeywords) && artwork.aiKeywords.length > 0 && (
//           <div
//             style={{
//               display: "flex",
//               flexWrap: "wrap",
//               gap: 4,
//               marginTop: 10,
//               paddingTop: 8,
//               borderTop: "1px dashed var(--border)",
//             }}
//           >
//             <Sparkles
//               size={10}
//               style={{ color: "var(--gold)", marginRight: 2 }}
//             />
//             {artwork.aiKeywords.slice(0, 3).map((tag, i) => (
//               <span
//                 key={i}
//                 style={{
//                   fontSize: 12,//9,
//                   padding: "1px 6px",
//                   borderRadius: 10,//4,
//                   background: "var(--gold-dim)",
//                   color: "var(--gold)",
//                   border: "1px solid var(--border-gold)",
//                 }}
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
