/*
import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const SettingsPage: React.FC = () => {
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@museum.com',
    role: 'Administrator',
  });

  const [apiConfig, setApiConfig] = useState({
    metApiBase: 'https://collectionapi.metmuseum.org/public/collection/v1',
    metApiKey: '',
    aiApiKey: '',
  });

  const [aiSettings, setAiSettings] = useState({
    autoEnrich: false,
    batchSize: 10,
    confidenceThreshold: 0.7,
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    importComplete: true,
    aiProcessed: false,
    errors: true,
  });

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving settings...');
  };

  return (
    <div className="p-6 space-y-6">
      // Page Title 
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account and application settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        // Profile Settings 
        <div className="lg:col-span-1">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={profile.role}
                  onChange={(e) => setProfile(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Administrator">Administrator</option>
                  <option value="Curator">Curator</option>
                  <option value="Editor">Editor</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>
            </div>
          </Card>
        </div>

        // API Configuration 
        <div className="lg:col-span-1">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">API Configuration</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Met Museum API Base URL
                </label>
                <input
                  type="url"
                  value={apiConfig.metApiBase}
                  onChange={(e) => setApiConfig(prev => ({ ...prev, metApiBase: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Met Museum API Key
                </label>
                <input
                  type="password"
                  value={apiConfig.metApiKey}
                  onChange={(e) => setApiConfig(prev => ({ ...prev, metApiKey: e.target.value }))}
                  placeholder="Optional - for higher rate limits"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  AI Service API Key
                </label>
                <input
                  type="password"
                  value={apiConfig.aiApiKey}
                  onChange={(e) => setApiConfig(prev => ({ ...prev, aiApiKey: e.target.value }))}
                  placeholder="Enter your AI service API key"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </Card>
        </div>

        // AI Settings 
        <div className="lg:col-span-1">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Auto-enrich on import
                  </label>
                  <p className="text-xs text-gray-500">
                    Automatically enrich new artworks with AI
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={aiSettings.autoEnrich}
                    onChange={(e) => setAiSettings(prev => ({ ...prev, autoEnrich: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Batch Size
                </label>
                <select
                  value={aiSettings.batchSize}
                  onChange={(e) => setAiSettings(prev => ({ ...prev, batchSize: Number(e.target.value) }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="5">5 artworks</option>
                  <option value="10">10 artworks</option>
                  <option value="25">25 artworks</option>
                  <option value="50">50 artworks</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confidence Threshold
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={aiSettings.confidenceThreshold}
                  onChange={(e) => setAiSettings(prev => ({ ...prev, confidenceThreshold: Number(e.target.value) }))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Low</span>
                  <span>{aiSettings.confidenceThreshold}</span>
                  <span>High</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      // Notification Settings 
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries({
            emailAlerts: 'Email alerts for system events',
            importComplete: 'Import completion notifications',
            aiProcessed: 'AI processing completed',
            errors: 'Error and warning messages',
          }).map(([key, description]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  {description}
                </label>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications[key as keyof typeof notifications]}
                  onChange={(e) => setNotifications(prev => ({ ...prev, [key]: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </Card>

      // Save Button 
      <div className="flex justify-end">
        <Button variant="primary" onClick={handleSave}>
          Save Settings
        </Button>
      </div>
    </div>
  );
};
*/
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