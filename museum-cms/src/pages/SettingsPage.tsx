// import { useState } from 'react';
// import { Check } from 'lucide-react';
// import { Card } from '../components/ui/Card';
// import { Button } from '../components/ui/Button';
// import { GoldDivider } from '../components/ui/GoldDivider';

// export function SettingsPage() {
//   const [museumName, setMuseumName] = useState("The Metropolitan Museum of Art");
//   const [apiKey, setApiKey] = useState("••••••••••••••••");
//   const [saved, setSaved] = useState(false);

//   const handleSave = async () => {
//     await new Promise(r=>setTimeout(r,600));
//     setSaved(true);
//     setTimeout(()=>setSaved(false), 2500);
//   };

//   const sections = [
//     {
//       title:"Museum Profile",
//       fields:[
//         { label:"Museum Name", value:museumName, onChange:setMuseumName, type:"text" },
//         { label:"Country",     value:"United States", onChange:()=>{},  type:"text" },
//         { label:"Website",     value:"metmuseum.org", onChange:()=>{},  type:"text" },
//       ]
//     }
//   ];

//   return (
//     <div className="slide-up" style={{ padding:32, overflow:"auto", height:"100%", display:"flex", flexDirection:"column", gap:24, maxWidth:760 }}>
//       <div>
//         <h2 style={{ fontFamily:"var(--font-display)", fontSize:32, fontWeight:400, color:"var(--text)", marginBottom:6 }}>Settings</h2>
//         <p style={{ color:"var(--text-dim)", fontSize:13 }}>Configure your museum profile, integrations, and preferences</p>
//       </div>

//       {/* Museum Profile */}
//       <Card style={{ padding:28 }}>
//         <div style={{ fontFamily:"var(--font-display)", fontSize:20, fontWeight:500, color:"var(--text)", marginBottom:20 }}>Museum Profile</div>
//         <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
//           {[
//             { label:"Museum Name",      value:museumName, set:setMuseumName },
//             { label:"Country / Region", value:"United States", set:()=>{} },
//             { label:"Website URL",      value:"metmuseum.org", set:()=>{} },
//           ].map((f,i)=>(
//             <div key={i}>
//               <label style={{ fontSize:11, color:"var(--text-dim)", textTransform:"uppercase", letterSpacing:"0.1em", display:"block", marginBottom:6 }}>{f.label}</label>
//               <input value={f.value} onChange={e=>f.set(e.target.value)} style={{
//                 width:"100%", background:"var(--surface2)", border:"1px solid var(--border)",
//                 borderRadius:10, padding:"11px 16px", color:"var(--text)", fontSize:13, outline:"none"
//               }}
//               onFocus={e=>e.target.style.border="1px solid var(--border-gold)"}
//               onBlur={e=>e.target.style.border="1px solid var(--border)"}
//               />
//             </div>
//           ))}
//         </div>
//       </Card>

//       {/* API Configuration */}
//       <Card style={{ padding:28 }}>
//         <div style={{ fontFamily:"var(--font-display)", fontSize:20, fontWeight:500, color:"var(--text)", marginBottom:20 }}>API Configuration</div>
//         <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
//           <div>
//             <label style={{ fontSize:11, color:"var(--text-dim)", textTransform:"uppercase", letterSpacing:"0.1em", display:"block", marginBottom:6 }}>Met Museum API Endpoint</label>
//             <input readOnly value="https://collectionapi.metmuseum.org/public/collection/v1" style={{
//               width:"100%", background:"var(--surface2)", border:"1px solid var(--border)",
//               borderRadius:10, padding:"11px 16px", color:"var(--gold)", fontSize:12, outline:"none", fontFamily:"monospace"
//             }}/>
//           </div>
//           <div>
//             <label style={{ fontSize:11, color:"var(--text-dim)", textTransform:"uppercase", letterSpacing:"0.1em", display:"block", marginBottom:6 }}>API Key</label>
//             <input value={apiKey} onChange={e=>setApiKey(e.target.value)} type="password" style={{
//               width:"100%", background:"var(--surface2)", border:"1px solid var(--border)",
//               borderRadius:10, padding:"11px 16px", color:"var(--text)", fontSize:13, outline:"none"
//             }}
//             onFocus={e=>e.target.style.border="1px solid var(--border-gold)"}
//             onBlur={e=>e.target.style.border="1px solid var(--border)"}
//             />
//           </div>
//           <div style={{ display:"flex", alignItems:"center", gap:12 }}>
//             <div style={{ width:8, height:8, borderRadius:"50%", background:"#4CAF81", boxShadow:"0 0 8px #4CAF8166", animation:"pulse 2s infinite" }}/>
//             <span style={{ fontSize:12, color:"#4CAF81" }}>Connected and operational</span>
//           </div>
//         </div>
//       </Card>

//       {/* AI Enrichment */}
//       <Card style={{ padding:28 }}>
//         <div style={{ fontFamily:"var(--font-display)", fontSize:20, fontWeight:500, color:"var(--text)", marginBottom:6 }}>AI Enrichment</div>
//         <div style={{ fontSize:13, color:"var(--text-dim)", marginBottom:20 }}>Configure how the AI analyzes and tags your artworks</div>
//         <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
//           {[
//             { label:"Auto-enrich on import",     on:true  },
//             { label:"Generate 10 keywords per artwork", on:true  },
//             { label:"Multi-language tagging",    on:false },
//             { label:"Historical context analysis",on:false },
//           ].map((opt,i)=>(
//             <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 0", borderBottom:"1px solid var(--border)" }}>
//               <span style={{ fontSize:13, color:"var(--text-mid)" }}>{opt.label}</span>
//               <div style={{
//                 width:44, height:24, borderRadius:12,
//                 background:opt.on?"var(--gold)":"var(--surface2)",
//                 border:`1px solid ${opt.on?"var(--gold)":"var(--border)"}`,
//                 position:"relative", cursor:"pointer", transition:"all 0.3s"
//               }}>
//                 <div style={{
//                   width:18, height:18, borderRadius:"50%", background:"white",
//                   position:"absolute", top:2, left: opt.on ? 22 : 2,
//                   transition:"left 0.3s", boxShadow:"0 2px 4px rgba(0,0,0,0.3)"
//                 }}/>
//               </div>
//             </div>
//           ))}
//         </div>
//       </Card>

//       {/* Save */}
//       <div style={{ display:"flex", gap:12 }}>
//         <Button onClick={handleSave} icon={saved ? <Check size={14}/> : undefined}>
//           {saved ? "Saved!" : "Save Changes"}
//         </Button>
//         <Button variant="ghost">Discard</Button>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Check, Trash2, AlertTriangle } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { GoldDivider } from "../components/ui/GoldDivider";
import { useQueryClient } from "@tanstack/react-query";
import { clearCollection } from "../api/client";

export function SettingsPage() {
  const queryClient = useQueryClient();
  const [museumName, setMuseumName] = useState(
    "The Metropolitan Museum of Art",
  );
  const [apiKey, setApiKey] = useState("••••••••••••••••");
  const [saved, setSaved] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const handleSave = async () => {
    await new Promise((r) => setTimeout(r, 600));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleClearData = async () => {
    const confirmed = window.confirm(
      "DANGER: This will permanently delete all artworks from your local database. This action cannot be undone. Are you sure?",
    );

    if (!confirmed) return;

    setIsClearing(true);
    try {
      await clearCollection();
      // Invalidate the cache so BrowsePage shows 0 items immediately
      queryClient.invalidateQueries({ queryKey: ["items"] });
      alert("Collection successfully cleared.");
    } catch (err) {
      console.error("Failed to clear collection:", err);
      alert("Failed to clear collection. Please check server logs.");
    } finally {
      setIsClearing(false);
    }
  };

  const sections = [
    {
      title: "Museum Profile",
      fields: [
        {
          label: "Museum Name",
          value: museumName,
          onChange: setMuseumName,
          type: "text",
        },
        {
          label: "Country",
          value: "United States",
          onChange: () => {},
          type: "text",
        },
        {
          label: "Website",
          value: "metmuseum.org",
          onChange: () => {},
          type: "text",
        },
      ],
    },
  ];

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
        maxWidth: 760,
      }}
    >
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
          Settings
        </h2>
        <p style={{ color: "var(--text-dim)", fontSize: 13 }}>
          Configure your museum profile and data preferences.
        </p>
      </div>

      <GoldDivider />

      {sections.map((section, idx) => (
        <Card key={idx} style={{ padding: 24 }}>
          <h3
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: "var(--gold)",
              marginBottom: 20,
            }}
          >
            {section.title}
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {section.fields.map((field, i) => (
              <div key={i}>
                <label
                  style={{
                    display: "block",
                    fontSize: 11,
                    color: "var(--text-dim)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: 6,
                  }}
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    background: "var(--surface2)",
                    border: "1px solid var(--border)",
                    borderRadius: 6,
                    color: "var(--text)",
                    fontSize: 13,
                  }}
                />
              </div>
            ))}
          </div>
        </Card>
      ))}

      {/* Preferences Section */}
      <Card style={{ padding: 24 }}>
        <h3
          style={{
            fontSize: 16,
            fontWeight: 500,
            color: "var(--gold)",
            marginBottom: 20,
          }}
        >
          Automation Preferences
        </h3>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {[
            { label: "Auto-enrich on import", on: true },
            { label: "Generate 10 keywords per artwork", on: true },
            { label: "Multi-language tagging", on: false },
            { label: "Historical context analysis", on: false },
          ].map((opt, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 0",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <span style={{ fontSize: 13, color: "var(--text-mid)" }}>
                {opt.label}
              </span>
              <div
                style={{
                  width: 44,
                  height: 24,
                  borderRadius: 12,
                  background: opt.on ? "var(--gold)" : "var(--surface2)",
                  border: `1px solid ${opt.on ? "var(--gold)" : "var(--border)"}`,
                  position: "relative",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
              >
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    background: "white",
                    position: "absolute",
                    top: 2,
                    left: opt.on ? 22 : 2,
                    transition: "left 0.3s",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Danger Zone Section */}
      <Card
        style={{
          padding: 24,
          border: "1px solid rgba(184, 57, 46, 0.3)",
          background: "rgba(184, 57, 46, 0.02)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 12,
          }}
        >
          <AlertTriangle size={18} style={{ color: "#B8392E" }} />
          <h3
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: "#B8392E",
              margin: 0,
            }}
          >
            Danger Zone
          </h3>
        </div>
        <p
          style={{
            fontSize: 13,
            color: "var(--text-dim)",
            marginBottom: 20,
            lineHeight: 1.5,
          }}
        >
          Wipe the entire local collection. This removes all imported artworks
          and metadata. This does not affect your external Google Drive or CSV
          files.
        </p>
        <Button
          onClick={handleClearData}
          variant="ghost"
          disabled={isClearing}
          style={{
            borderColor: "#B8392E",
            color: "#B8392E",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {isClearing ? "Clearing Database..." : "Clear Entire Collection"}
          {!isClearing && <Trash2 size={14} />}
        </Button>
      </Card>

      {/* Save Button */}
      <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
        <Button
          onClick={handleSave}
          variant="primary"
          icon={saved ? <Check size={14} /> : undefined}
        >
          {saved ? "Settings Saved" : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
