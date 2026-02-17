/*
import React, { useState } from 'react';
import { SourceCard } from '../components/import/SourceCard';
import { ImportProgress } from '../components/import/ImportProgress';
import { SyncStats } from '../components/import/SyncStats';
import { Button } from '../components/ui/Button';
import { useImport } from '../hooks/useImport';

export const ImportPage: React.FC = () => {
  const [selectedSource, setSelectedSource] = useState<'met' | 'gdrive' | null>(null);
  const { importStatus, fetchMetCollection, resetImport } = useImport();

  const handleSourceSelect = (source: 'met' | 'gdrive') => {
    setSelectedSource(source);
  };

  const handleStartImport = async () => {
    if (selectedSource === 'met') {
      try {
        await fetchMetCollection();
      } catch (error) {
        console.error('Import failed:', error);
      }
    } else if (selectedSource === 'gdrive') {
      // TODO: Implement Google Drive import
      console.log('Google Drive import not implemented yet');
    }
  };

  const handleCancelImport = () => {
    resetImport();
    setSelectedSource(null);
  };

  const mockStats = {
    new: 0,
    updated: 0,
    removed: 0,
    total: 0,
  };

  return (
    <div className="p-6 space-y-6">
      // Page Title 
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Import Collection</h1>
        <p className="text-gray-600">Import artworks from external sources</p>
      </div>

      // Import Progress 
      {(importStatus.status !== 'idle') && (
        <ImportProgress
          status={importStatus}
          onCancel={handleCancelImport}
        />
      )}

      // Source Selection 
      {importStatus.status === 'idle' && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Select Import Source</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SourceCard
              title="Met Museum Collection"
              description="Import artworks from the Metropolitan Museum of Art's public API"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              }
              isActive={selectedSource === 'met'}
              onSelect={() => handleSourceSelect('met')}
            />

            <SourceCard
              title="Google Drive"
              description="Import artwork data from CSV files in your Google Drive"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
              isActive={selectedSource === 'gdrive'}
              onSelect={() => handleSourceSelect('gdrive')}
              disabled={true}
            />
          </div>

          // Import Options 
          {selectedSource && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Import Options</h3>
              
              {selectedSource === 'met' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department (Optional)
                    </label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">All Departments</option>
                      <option value="1">American Decorative Arts</option>
                      <option value="3">Ancient Near Eastern Art</option>
                      <option value="4">Arms and Armor</option>
                      <option value="5">Arts of Africa, Oceania, and the Americas</option>
                      <option value="6">Asian Art</option>
                      <option value="11">The Cloisters</option>
                      <option value="13">The Costume Institute</option>
                      <option value="15">Drawings and Prints</option>
                      <option value="17">Egyptian Art</option>
                      <option value="19">European Paintings</option>
                      <option value="21">European Sculpture and Decorative Arts</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Limit
                    </label>
                    <input
                      type="number"
                      placeholder="Maximum number of artworks to import"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue="100"
                    />
                  </div>
                </div>
              )}

              <div className="mt-6 flex space-x-4">
                <Button
                  variant="primary"
                  onClick={handleStartImport}
                >
                  Start Import
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedSource(null)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      // Sync Statistics 
      {importStatus.status === 'completed' && (
        <SyncStats stats={mockStats} />
      )}

      // CSV Reference 
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">CSV Format Reference</h3>
        <div className="bg-gray-50 rounded-md p-4">
          <p className="text-sm text-gray-600 mb-3">
            For Google Drive imports, your CSV file should include these columns:
          </p>
          <code className="text-xs bg-white p-2 rounded block overflow-x-auto">
            title,artist,date,medium,dimensions,department,culture,period,imageUrl,thumbnailUrl,tags
          </code>
        </div>
      </div>
    </div>
  );
};
*/
import { AlertCircle, Badge, Check, CheckCircle, Download, RefreshCw, Upload } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { MOCK_ARTWORKS } from '../constants/mockData';
import type { Artwork, ImportStatus } from '../types';
import { useState } from 'react';
import { GoldDivider } from '@/components/ui/GoldDivider';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';

export function ImportPage({ onImport, artworks }: { onImport:(a:Artwork[])=>void; artworks:Artwork[] }) {
  const [status, setStatus] = useState<ImportStatus>({ type:"idle", message:"" });
  const [progress, setProgress] = useState(0);

  const runImport = async () => {
    setStatus({ type:"loading", message:"Authenticating with Metropolitan Museum API…" });
    setProgress(0);
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(r=>setTimeout(r, 180));
      setProgress(i);
      if (i===30) setStatus(s=>({...s,message:"Fetching collection index…"}));
      if (i===60) setStatus(s=>({...s,message:"Downloading artwork metadata…"}));
      if (i===85) setStatus(s=>({...s,message:"Processing images & tags…"}));
    }
    onImport(MOCK_ARTWORKS);
    setStatus({ type:"success", message:"Import complete!", stats:{ new:MOCK_ARTWORKS.length, updated:0, removed:0 } });
  };

  const runRefresh = async () => {
    setStatus({ type:"loading", message:"Checking for updates…" });
    setProgress(0);
    for (let i=0;i<=100;i+=20) { await new Promise(r=>setTimeout(r,200)); setProgress(i); }
    setStatus({ type:"success", message:"Collection is up to date.", stats:{ new:0, updated:2, removed:0 } });
  };

  return (
    <div className="slide-up" style={{ padding:32, overflow:"auto", height:"100%", display:"flex", flexDirection:"column", gap:24 }}>

      <div>
        <h2 style={{ fontFamily:"var(--font-display)", fontSize:32, fontWeight:400, color:"var(--text)", marginBottom:6 }}>Import Collection</h2>
        <p style={{ color:"var(--text-dim)", fontSize:13 }}>Connect to your museum's data sources and synchronize your digital collection</p>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>

        {/* Met Museum Card */}
        <Card style={{ padding:32, border:"1px solid var(--border-gold)", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg,var(--gold),transparent)" }}/>
          <div style={{ display:"flex", gap:16, marginBottom:24 }}>
            <div style={{ width:52, height:52, borderRadius:14, background:"var(--gold-dim)", border:"1px solid var(--border-gold)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24 }}>🏛️</div>
            <div>
              <div style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:500, color:"var(--text)" }}>Metropolitan Museum</div>
              <div style={{ fontSize:12, color:"var(--gold)", marginTop:2 }}>metmuseum.github.io</div>
            </div>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:24 }}>
            {["50,000+ open-access artworks","High-resolution images","Rich metadata & bibliography","Real-time synchronization"].map((f,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", gap:10, fontSize:13, color:"var(--text-mid)" }}>
                <Check size={14} style={{ color:"var(--gold)", minWidth:14 }}/>{f}
              </div>
            ))}
          </div>

          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            <Badge>Connected</Badge>
            <Badge color="green">API v2</Badge>
          </div>

          <GoldDivider />

          <div style={{ display:"flex", gap:10, marginTop:16, flexWrap:"wrap" }}>
            <Button onClick={runImport} disabled={status.type==="loading"} icon={status.type==="loading"?<Spinner/>:<Download size={14}/>}>
              {artworks.length>0 ? "Re-import Collection" : "Import Collection"}
            </Button>
            {artworks.length>0 && (
              <Button onClick={runRefresh} variant="secondary" disabled={status.type==="loading"} icon={<RefreshCw size={14}/>}>
                Refresh
              </Button>
            )}
          </div>
        </Card>

        {/* Google Drive Card */}
        <Card style={{ padding:32, opacity:0.6 }}>
          <div style={{ display:"flex", gap:16, marginBottom:24 }}>
            <div style={{ width:52, height:52, borderRadius:14, background:"var(--surface2)", border:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24 }}>📁</div>
            <div>
              <div style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:500, color:"var(--text)" }}>Google Drive</div>
              <div style={{ fontSize:12, color:"var(--text-dim)", marginTop:2 }}>Custom CSV + Images</div>
            </div>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:24 }}>
            {["Image folder selection","CSV metadata mapping","Custom field definitions","Batch processing support"].map((f,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", gap:10, fontSize:13, color:"var(--text-dim)" }}>
                <div style={{ width:14, height:14, minWidth:14, borderRadius:"50%", border:"1px solid var(--border)" }}/>{f}
              </div>
            ))}
          </div>

          <Badge color="blue">Coming Soon</Badge>

          <GoldDivider />
          <div style={{ marginTop:16 }}>
            <Button variant="ghost" disabled icon={<Upload size={14}/>}>Connect Drive</Button>
          </div>
        </Card>
      </div>

      {/* Progress / Status */}
      {status.type !== "idle" && (
        <Card style={{ padding:28 }}>
          <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom: status.type==="loading" ? 16 : 0 }}>
            {status.type==="loading" && <Spinner/>}
            {status.type==="success" && <CheckCircle size={18} style={{ color:"#4CAF81" }}/>}
            {status.type==="error" && <AlertCircle size={18} style={{ color:"#E05656" }}/>}
            <span style={{ fontSize:14, fontWeight:500, color:"var(--text)" }}>{status.message}</span>
          </div>

          {status.type==="loading" && (
            <div>
              <div style={{ height:4, background:"var(--surface2)", borderRadius:4, overflow:"hidden" }}>
                <div style={{ height:"100%", width:`${progress}%`, background:"linear-gradient(90deg,var(--gold),var(--gold-light))", borderRadius:4, transition:"width 0.3s ease" }}/>
              </div>
              <div style={{ fontSize:11, color:"var(--text-dim)", marginTop:6 }}>{progress}%</div>
            </div>
          )}

          {status.type==="success" && status.stats && (
            <div style={{ display:"flex", gap:32, marginTop:20, paddingTop:20, borderTop:"1px solid var(--border)" }}>
              {[
                { label:"New Items", value:status.stats.new, color:"#4CAF81" },
                { label:"Updated",   value:status.stats.updated, color:"var(--gold)" },
                { label:"Removed",   value:status.stats.removed, color:"#E05656" },
              ].map((s,i)=>(
                <div key={i}>
                  <div style={{ fontFamily:"var(--font-display)", fontSize:36, fontWeight:500, color:s.color }}>{s.value}</div>
                  <div style={{ fontSize:11, color:"var(--text-dim)", textTransform:"uppercase", letterSpacing:"0.08em" }}>{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {/* CSV Format Reference */}
      <Card style={{ padding:24 }}>
        <div style={{ fontFamily:"var(--font-display)", fontSize:18, fontWeight:500, color:"var(--text)", marginBottom:14 }}>CSV Format Reference</div>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
            <thead>
              <tr style={{ borderBottom:"1px solid var(--border)" }}>
                {["Field","Type","Required","Description"].map(h=>(
                  <th key={h} style={{ padding:"8px 14px", textAlign:"left", color:"var(--text-dim)", fontWeight:500, letterSpacing:"0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["image_id","string","✓","Unique identifier for the artwork"],
                ["title","string","✓","Name of the artwork"],
                ["year","number","✓","Year of creation"],
                ["artist","string","✓","Artist's full name"],
                ["description","text","—","Long-form description"],
                ["copyright","string","—","Rights & licensing info"],
                ["classification","string","—","Category / genre"],
                ["custom_field_*","any","—","Any museum-defined field"],
              ].map((row,i)=>(
                <tr key={i} style={{ borderBottom:"1px solid var(--border)", background: i%2===0?"transparent":"rgba(255,255,255,0.015)" }}>
                  {row.map((cell,j)=>(
                    <td key={j} style={{ padding:"9px 14px", color: j===0?"var(--gold)":j===2&&cell==="✓"?"#4CAF81":"var(--text-mid)", fontFamily:j===0?"monospace":"inherit" }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
