import { useState } from 'react';
import { Check } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { GoldDivider } from '../components/ui/GoldDivider';

export function SettingsPage() {
  const [museumName, setMuseumName] = useState("The Metropolitan Museum of Art");
  const [apiKey, setApiKey] = useState("••••••••••••••••");
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    await new Promise(r=>setTimeout(r,600));
    setSaved(true);
    setTimeout(()=>setSaved(false), 2500);
  };

  const sections = [
    {
      title:"Museum Profile",
      fields:[
        { label:"Museum Name", value:museumName, onChange:setMuseumName, type:"text" },
        { label:"Country",     value:"United States", onChange:()=>{},  type:"text" },
        { label:"Website",     value:"metmuseum.org", onChange:()=>{},  type:"text" },
      ]
    }
  ];

  return (
    <div className="slide-up" style={{ padding:32, overflow:"auto", height:"100%", display:"flex", flexDirection:"column", gap:24, maxWidth:760 }}>
      <div>
        <h2 style={{ fontFamily:"var(--font-display)", fontSize:32, fontWeight:400, color:"var(--text)", marginBottom:6 }}>Settings</h2>
        <p style={{ color:"var(--text-dim)", fontSize:13 }}>Configure your museum profile, integrations, and preferences</p>
      </div>

      {/* Museum Profile */}
      <Card style={{ padding:28 }}>
        <div style={{ fontFamily:"var(--font-display)", fontSize:20, fontWeight:500, color:"var(--text)", marginBottom:20 }}>Museum Profile</div>
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {[
            { label:"Museum Name",      value:museumName, set:setMuseumName },
            { label:"Country / Region", value:"United States", set:()=>{} },
            { label:"Website URL",      value:"metmuseum.org", set:()=>{} },
          ].map((f,i)=>(
            <div key={i}>
              <label style={{ fontSize:11, color:"var(--text-dim)", textTransform:"uppercase", letterSpacing:"0.1em", display:"block", marginBottom:6 }}>{f.label}</label>
              <input value={f.value} onChange={e=>f.set(e.target.value)} style={{
                width:"100%", background:"var(--surface2)", border:"1px solid var(--border)",
                borderRadius:10, padding:"11px 16px", color:"var(--text)", fontSize:13, outline:"none"
              }}
              onFocus={e=>e.target.style.border="1px solid var(--border-gold)"}
              onBlur={e=>e.target.style.border="1px solid var(--border)"}
              />
            </div>
          ))}
        </div>
      </Card>

      {/* API Configuration */}
      <Card style={{ padding:28 }}>
        <div style={{ fontFamily:"var(--font-display)", fontSize:20, fontWeight:500, color:"var(--text)", marginBottom:20 }}>API Configuration</div>
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <div>
            <label style={{ fontSize:11, color:"var(--text-dim)", textTransform:"uppercase", letterSpacing:"0.1em", display:"block", marginBottom:6 }}>Met Museum API Endpoint</label>
            <input readOnly value="https://collectionapi.metmuseum.org/public/collection/v1" style={{
              width:"100%", background:"var(--surface2)", border:"1px solid var(--border)",
              borderRadius:10, padding:"11px 16px", color:"var(--gold)", fontSize:12, outline:"none", fontFamily:"monospace"
            }}/>
          </div>
          <div>
            <label style={{ fontSize:11, color:"var(--text-dim)", textTransform:"uppercase", letterSpacing:"0.1em", display:"block", marginBottom:6 }}>API Key</label>
            <input value={apiKey} onChange={e=>setApiKey(e.target.value)} type="password" style={{
              width:"100%", background:"var(--surface2)", border:"1px solid var(--border)",
              borderRadius:10, padding:"11px 16px", color:"var(--text)", fontSize:13, outline:"none"
            }}
            onFocus={e=>e.target.style.border="1px solid var(--border-gold)"}
            onBlur={e=>e.target.style.border="1px solid var(--border)"}
            />
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background:"#4CAF81", boxShadow:"0 0 8px #4CAF8166", animation:"pulse 2s infinite" }}/>
            <span style={{ fontSize:12, color:"#4CAF81" }}>Connected and operational</span>
          </div>
        </div>
      </Card>

      {/* AI Enrichment */}
      <Card style={{ padding:28 }}>
        <div style={{ fontFamily:"var(--font-display)", fontSize:20, fontWeight:500, color:"var(--text)", marginBottom:6 }}>AI Enrichment</div>
        <div style={{ fontSize:13, color:"var(--text-dim)", marginBottom:20 }}>Configure how the AI analyzes and tags your artworks</div>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {[
            { label:"Auto-enrich on import",     on:true  },
            { label:"Generate 10 keywords per artwork", on:true  },
            { label:"Multi-language tagging",    on:false },
            { label:"Historical context analysis",on:false },
          ].map((opt,i)=>(
            <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 0", borderBottom:"1px solid var(--border)" }}>
              <span style={{ fontSize:13, color:"var(--text-mid)" }}>{opt.label}</span>
              <div style={{
                width:44, height:24, borderRadius:12,
                background:opt.on?"var(--gold)":"var(--surface2)",
                border:`1px solid ${opt.on?"var(--gold)":"var(--border)"}`,
                position:"relative", cursor:"pointer", transition:"all 0.3s"
              }}>
                <div style={{
                  width:18, height:18, borderRadius:"50%", background:"white",
                  position:"absolute", top:2, left: opt.on ? 22 : 2,
                  transition:"left 0.3s", boxShadow:"0 2px 4px rgba(0,0,0,0.3)"
                }}/>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Save */}
      <div style={{ display:"flex", gap:12 }}>
        <Button onClick={handleSave} icon={saved ? <Check size={14}/> : undefined}>
          {saved ? "Saved!" : "Save Changes"}
        </Button>
        <Button variant="ghost">Discard</Button>
      </div>
    </div>
  );
}