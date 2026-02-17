/*
import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export const DashboardPage: React.FC = () => {
  // Mock data for dashboard
  const stats = [
    { label: 'Total Artworks', value: '1,234', change: '+12%', positive: true },
    { label: 'AI Enriched', value: '856', change: '+23%', positive: true },
    { label: 'Departments', value: '12', change: '0%', positive: false },
    { label: 'Recent Imports', value: '45', change: '+8%', positive: true },
  ];

  const departmentData = [
    { name: 'Paintings', count: 456, percentage: 37 },
    { name: 'Sculpture', count: 234, percentage: 19 },
    { name: 'Prints', count: 189, percentage: 15 },
    { name: 'Photography', count: 156, percentage: 13 },
    { name: 'Decorative Arts', count: 123, percentage: 10 },
    { name: 'Other', count: 76, percentage: 6 },
  ];

  const recentActivity = [
    { id: 1, action: 'Imported', item: 'Met Museum Collection', time: '2 hours ago', type: 'import' },
    { id: 2, action: 'AI Enriched', item: '15 artworks', time: '4 hours ago', type: 'ai' },
    { id: 3, action: 'Updated', item: 'Paintings department', time: '6 hours ago', type: 'update' },
    { id: 4, action: 'Added', item: 'New tags to 8 artworks', time: '1 day ago', type: 'tag' },
  ];

  return (
    <div className="p-6 space-y-6">
      // Page Title 
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Overview of your museum collection management</p>
      </div>

      // Stats Cards 
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <Badge
                color={stat.positive ? 'green' : 'gray'}
                className={stat.positive ? 'bg-green-100 text-green-800' : ''}
              >
                {stat.change}
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        // Department Breakdown 
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Breakdown</h3>
          <div className="space-y-3">
            {departmentData.map((dept, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{dept.name}</span>
                    <span className="text-sm text-gray-600">{dept.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${dept.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        // Recent Activity 
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'import' ? 'bg-green-500' :
                  activity.type === 'ai' ? 'bg-blue-500' :
                  activity.type === 'update' ? 'bg-yellow-500' :
                  'bg-gray-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.action}</span>{' '}
                    <span className="text-gray-600">{activity.item}</span>
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      // Latest Imports 
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Latest Imports</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
        </div>
        <div className="text-center py-8 text-gray-500">
          <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p>No recent imports</p>
          <p className="text-sm">Start by importing artworks from the Import page</p>
        </div>
      </Card>
    </div>
  );
};
*/
import { ArrowUpRight, ArrowDownRight, Package, Globe, Sparkles,
         Layers, Download, ChevronRight, Database,
         CheckCircle, Clock } from "lucide-react";
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import type { Artwork, Page } from '../types';

export function DashboardPage({ artworks, setPage }: { artworks:Artwork[]; setPage:(p:Page)=>void }) {
  const stats = [
    { label:"Total Artworks",   value:artworks.length || 0,    icon:Package,    delta:"+12%", up:true,  color:"var(--gold)" },
    { label:"Published",        value:artworks.filter(a=>a.isPublished).length, icon:Globe, delta:"+5%", up:true, color:"#4CAF81" },
    { label:"AI Enriched",      value:artworks.filter(a=>a.aiEnriched).length, icon:Sparkles, delta:"new", up:true, color:"#9B7FD4" },
    { label:"Departments",      value:[...new Set(artworks.map(a=>a.department))].length||0, icon:Layers, delta:"stable", up:true, color:"#5688E0" },
  ];

  const deptData = [...new Set(artworks.map(a=>a.department))].map(dept=>({
    name:dept, count:artworks.filter(a=>a.department===dept).length
  }));

  const activity = [
    { time:"2h ago",   action:"Import completed",       detail:"6 artworks synced from Met API",   icon:CheckCircle, color:"#4CAF81" },
    { time:"5h ago",   action:"AI Enrichment",          detail:"The Starry Night — 10 tags added", icon:Sparkles,    color:"#9B7FD4" },
    { time:"1d ago",   action:"Collection published",   detail:"Hokusai & Botticelli sets live",   icon:Globe,       color:"var(--gold)" },
    { time:"2d ago",   action:"New import scheduled",   detail:"Met Museum API — 500 objects",     icon:Clock,       color:"#5688E0" },
  ];

  return (
    <div className="slide-up" style={{ padding:32, overflow:"auto", height:"100%", display:"flex", flexDirection:"column", gap:28 }}>

      {/* Welcome */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
        <div>
          <p style={{ fontSize:12, color:"var(--text-dim)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:6 }}>Good morning</p>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:38, fontWeight:300, color:"var(--text)", lineHeight:1.1 }}>
            Welcome back,<br/><em style={{ color:"var(--gold)" }}>Collection Manager</em>
          </h2>
        </div>
        <Button onClick={()=>setPage("import")} icon={<Download size={15}/>}>Sync Collection</Button>
      </div>

      {/* Stat Cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16 }}>
        {stats.map((s,i)=>(
          <Card key={i} style={{ padding:24 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
              <div style={{ width:40, height:40, borderRadius:10, background:`${s.color}18`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <s.icon size={18} style={{ color:s.color }}/>
              </div>
              <span style={{ fontSize:11, color:s.up?"#4CAF81":"#E05656", display:"flex", alignItems:"center", gap:3 }}>
                {s.up ? <ArrowUpRight size={12}/> : <ArrowDownRight size={12}/>}{s.delta}
              </span>
            </div>
            <div style={{ fontFamily:"var(--font-display)", fontSize:40, fontWeight:500, color:"var(--text)", lineHeight:1 }}>{s.value}</div>
            <div style={{ fontSize:12, color:"var(--text-dim)", marginTop:6, letterSpacing:"0.03em" }}>{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Middle row */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>

        {/* Dept breakdown */}
        <Card style={{ padding:24 }}>
          <div style={{ fontFamily:"var(--font-display)", fontSize:20, fontWeight:500, marginBottom:20, color:"var(--text)" }}>By Department</div>
          {artworks.length === 0 ? (
            <div style={{ textAlign:"center", padding:32, color:"var(--text-dim)" }}>
              <Database size={32} style={{ marginBottom:12, opacity:0.3 }}/>
              <p>Import your collection to see breakdown</p>
              <div style={{ marginTop:16 }}><Button onClick={()=>setPage("import")} size="sm">Import Now</Button></div>
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {deptData.map((d,i)=>{
                const pct = Math.round((d.count / artworks.length) * 100);
                const colors = ["var(--gold)","#4CAF81","#5688E0","#9B7FD4","#E05656"];
                return (
                  <div key={i}>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:5 }}>
                      <span style={{ color:"var(--text-mid)" }}>{d.name}</span>
                      <span style={{ color:"var(--text-dim)" }}>{d.count} works · {pct}%</span>
                    </div>
                    <div style={{ height:6, background:"var(--surface2)", borderRadius:4, overflow:"hidden" }}>
                      <div style={{ height:"100%", width:`${pct}%`, background:colors[i%colors.length], borderRadius:4, transition:"width 1s cubic-bezier(.16,1,.3,1)" }}/>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        {/* Activity feed */}
        <Card style={{ padding:24 }}>
          <div style={{ fontFamily:"var(--font-display)", fontSize:20, fontWeight:500, marginBottom:20, color:"var(--text)" }}>Recent Activity</div>
          <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
            {activity.map((a,i)=>(
              <div key={i} style={{ display:"flex", gap:14, padding:"12px 0", borderBottom: i<activity.length-1?"1px solid var(--border)":"none" }}>
                <div style={{ width:32, height:32, minWidth:32, borderRadius:8, background:`${a.color}18`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <a.icon size={14} style={{ color:a.color }}/>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:500, color:"var(--text)", marginBottom:2 }}>{a.action}</div>
                  <div style={{ fontSize:11, color:"var(--text-dim)" }}>{a.detail}</div>
                </div>
                <div style={{ fontSize:10, color:"var(--text-dim)", whiteSpace:"nowrap" }}>{a.time}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent artworks preview */}
      {artworks.length > 0 && (
        <Card style={{ padding:24 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
            <div style={{ fontFamily:"var(--font-display)", fontSize:20, fontWeight:500, color:"var(--text)" }}>Latest Imports</div>
            <Button onClick={()=>setPage("browse")} variant="ghost" size="sm" icon={<ChevronRight size={13}/>}>View all</Button>
          </div>
          <div style={{ display:"flex", gap:14, overflowX:"auto", paddingBottom:8 }}>
            {artworks.slice(0,4).map(a=>(
              <div key={a.objectID} style={{ minWidth:160, borderRadius:10, overflow:"hidden", background:"var(--surface2)", border:"1px solid var(--border)" }}>
                <div style={{ height:110, overflow:"hidden" }}>
                  <img src={a.primaryImage} alt={a.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e=>{(e.target as HTMLImageElement).style.display="none"}}/>
                </div>
                <div style={{ padding:"10px 12px" }}>
                  <div style={{ fontSize:12, fontWeight:600, color:"var(--text)", marginBottom:2, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{a.title}</div>
                  <div style={{ fontSize:10, color:"var(--text-dim)" }}>{a.artistDisplayName}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
