// import React, { useState } from "react";
// import { Search, ChevronDown, X, Check } from "lucide-react";
// import { Button } from "../ui/Button";
// import { Badge } from "../ui/Badge";

// // Type for departments
// interface Department {
//   departmentId: number;
//   displayName: string;
// }

// interface MetSourceCardProps {
//   onImport: (searchTerm?: string, departments?: number[]) => void;
//   onRefresh: () => void;
//   isLoading: boolean;
//   hasData: boolean;
//   departments?: Department[]; // optional preloaded list
// }

// export const MetSourceCard: React.FC<MetSourceCardProps> = ({
//   onImport,
//   onRefresh,
//   isLoading,
//   hasData,
//   departments = [],
// }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedDepts, setSelectedDepts] = useState<number[]>([]);
//   const [deptDropdownOpen, setDeptDropdownOpen] = useState(false);

//   const toggleDepartment = (deptId: number) => {
//     setSelectedDepts((prev) =>
//       prev.includes(deptId)
//         ? prev.filter((id) => id !== deptId)
//         : [...prev, deptId],
//     );
//   };

//   const clearDepartments = () => setSelectedDepts([]);

//   return (
//     <div
//       style={{
//         padding: 24,
//         border: "1px solid gold",
//         borderRadius: 12,
//         display: "flex",
//         flexDirection: "column",
//         gap: 16,
//       }}
//     >
//       {/* Header */}
//       <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//         <div
//           style={{
//             width: 40,
//             height: 40,
//             borderRadius: 12,
//             background: "#f0e68c",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: 24,
//           }}
//         >
//           🏛️
//         </div>
//         <div>
//           <div style={{ fontWeight: 600 }}>Metropolitan Museum</div>
//           <div style={{ fontSize: 11, color: "#b8860b" }}>
//             metmuseum.github.io
//           </div>
//         </div>
//       </div>

//       {/* Search Box */}
//       <div>
//         <label
//           style={{ fontSize: 11, color: "#888", textTransform: "uppercase" }}
//         >
//           Search Artworks
//         </label>
//         <div style={{ position: "relative" }}>
//           <Search
//             size={16}
//             style={{
//               position: "absolute",
//               left: 10,
//               top: "50%",
//               transform: "translateY(-50%)",
//             }}
//           />
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search by artist, title, medium..."
//             disabled={isLoading}
//             style={{
//               width: "100%",
//               padding: "10px 12px 10px 34px",
//               borderRadius: 8,
//               border: "1px solid #ccc",
//               outline: "none",
//             }}
//           />
//         </div>
//       </div>

//       {/* Departments Filter */}
//       {departments.length > 0 && (
//         <div>
//           <label
//             style={{ fontSize: 11, color: "#888", textTransform: "uppercase" }}
//           >
//             Departments{" "}
//             {selectedDepts.length > 0 && `(${selectedDepts.length})`}
//           </label>

//           {selectedDepts.length > 0 && (
//             <div
//               style={{
//                 display: "flex",
//                 gap: 6,
//                 flexWrap: "wrap",
//                 marginBottom: 6,
//               }}
//             >
//               {selectedDepts.map((id) => {
//                 const dept = departments.find((d) => d.departmentId === id);
//                 return (
//                   <span
//                     key={id}
//                     style={{
//                       display: "inline-flex",
//                       alignItems: "center",
//                       gap: 4,
//                       padding: "4px 8px",
//                       borderRadius: 20,
//                       background: "#f0e68c",
//                       fontSize: 12,
//                     }}
//                   >
//                     {dept?.displayName || `Dept ${id}`}
//                     <button
//                       onClick={() => toggleDepartment(id)}
//                       style={{
//                         border: "none",
//                         background: "none",
//                         cursor: "pointer",
//                       }}
//                     >
//                       <X size={12} />
//                     </button>
//                   </span>
//                 );
//               })}
//               <button
//                 onClick={clearDepartments}
//                 style={{
//                   fontSize: 11,
//                   textDecoration: "underline",
//                   border: "none",
//                   background: "none",
//                   cursor: "pointer",
//                 }}
//               >
//                 Clear
//               </button>
//             </div>
//           )}

//           <div style={{ position: "relative" }}>
//             <button
//               onClick={() => setDeptDropdownOpen(!deptDropdownOpen)}
//               disabled={isLoading}
//               style={{
//                 width: "100%",
//                 padding: "10px 12px",
//                 borderRadius: 8,
//                 border: "1px solid #ccc",
//                 background: "#fff",
//                 textAlign: "left",
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               {selectedDepts.length > 0
//                 ? `${selectedDepts.length} selected`
//                 : "Select departments"}
//               <ChevronDown
//                 size={16}
//                 style={{
//                   transform: deptDropdownOpen ? "rotate(180deg)" : "none",
//                 }}
//               />
//             </button>

//             {deptDropdownOpen && (
//               <div
//                 style={{
//                   position: "absolute",
//                   top: "calc(100% + 4px)",
//                   left: 0,
//                   right: 0,
//                   background: "#fff",
//                   border: "1px solid #ccc",
//                   borderRadius: 8,
//                   maxHeight: 200,
//                   overflowY: "auto",
//                   zIndex: 10,
//                 }}
//               >
//                 {departments.map((dept) => (
//                   <button
//                     key={dept.departmentId}
//                     onClick={() => toggleDepartment(dept.departmentId)}
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       width: "100%",
//                       padding: "8px 12px",
//                       border: "none",
//                       background: "transparent",
//                       cursor: "pointer",
//                     }}
//                   >
//                     <span>{dept.displayName}</span>
//                     {selectedDepts.includes(dept.departmentId) && (
//                       <Check size={14} color="gold" />
//                     )}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Badges */}
//       <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
//         <Badge>Connected</Badge>
//         <Badge color="green">API v2</Badge>
//       </div>

//       {/* Buttons */}
//       <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
//         <Button
//           onClick={() => onImport(searchTerm, selectedDepts)}
//           disabled={isLoading}
//         >
//           {isLoading
//             ? "Importing..."
//             : hasData
//               ? "Add More Artworks"
//               : "Import Collection"}
//         </Button>

//         {hasData && !isLoading && (
//           <Button onClick={onRefresh} variant="secondary">
//             Refresh
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// };
