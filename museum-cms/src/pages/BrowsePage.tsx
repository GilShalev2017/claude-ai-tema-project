/*
import React, { useState, useMemo } from 'react';
import { Artwork, ViewMode } from '../types';
import { MOCK_ARTWORKS } from '../constants/mockData';
import { ArtworkCard } from '../components/collection/ArtworkCard';
import { ArtworkListRow } from '../components/collection/ArtworkListRow';
import { ArtworkModal } from '../components/collection/ArtworkModal';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useEnrich } from '../hooks/useEnrich';

export const BrowsePage: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | undefined>();
  const [artworks, setArtworks] = useState<Artwork[]>(MOCK_ARTWORKS);
  const { enrichWithAI, isEnriching } = useEnrich();

  // Filter artworks based on search and department
  const filteredArtworks = useMemo(() => {
    return artworks.filter(artwork => {
      const matchesSearch = !searchQuery || 
        artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (artwork.artist && artwork.artist.toLowerCase().includes(searchQuery.toLowerCase())) ||
        artwork.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesDepartment = selectedDepartment === 'all' || 
        artwork.department === selectedDepartment;
      
      return matchesSearch && matchesDepartment;
    });
  }, [artworks, searchQuery, selectedDepartment]);

  // Get unique departments
  const departments = useMemo(() => {
    const depts = Array.from(new Set(artworks.map(a => a.department).filter(Boolean)));
    return ['all', ...depts];
  }, [artworks]);

  const handleArtworkClick = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
  };

  const handleEnrich = async (artwork: Artwork) => {
    try {
      const enriched = await enrichWithAI(artwork);
      setArtworks(prev => prev.map(a => a.id === enriched.id ? enriched : a));
      setSelectedArtwork(enriched);
    } catch (error) {
      console.error('Failed to enrich artwork:', error);
    }
  };

  return (
    <div className="p-6">
      // Header 
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Browse Collection</h1>
        <p className="text-gray-600">Explore and manage your artwork collection</p>
      </div>

      // Filters and Controls 
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          // Search 
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search artworks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none"
              style={{ marginTop: '-32px', marginLeft: '8px' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div className="flex items-center space-x-4">
            // Department Filter 
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept}
                </option>
              ))}
            </select>

            // View Mode Toggle 
            <div className="flex items-center border border-gray-300 rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                size="sm"
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                }
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              />
              <Button
                variant={viewMode === 'list' ? 'primary' : 'ghost'}
                size="sm"
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                }
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              />
            </div>
          </div>
        </div>

        // Active Filters 
        <div className="flex items-center space-x-2 mt-4">
          <span className="text-sm text-gray-600">Filters:</span>
          {searchQuery && (
            <Badge color="blue" size="sm">
              Search: {searchQuery}
            </Badge>
          )}
          {selectedDepartment !== 'all' && (
            <Badge color="blue" size="sm">
              Department: {selectedDepartment}
            </Badge>
          )}
          {(searchQuery || selectedDepartment !== 'all') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setSelectedDepartment('all');
              }}
            >
              Clear All
            </Button>
          )}
        </div>
      </div>

      // Results Count  
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing {filteredArtworks.length} of {artworks.length} artworks
        </p>
      </div>

      // Artworks Grid/List 
      {filteredArtworks.length > 0 ? (
        <div>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredArtworks.map((artwork) => (
                <ArtworkCard
                  key={artwork.id}
                  artwork={artwork}
                  onClick={handleArtworkClick}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredArtworks.map((artwork) => (
                <ArtworkListRow
                  key={artwork.id}
                  artwork={artwork}
                  onClick={handleArtworkClick}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.5a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No artworks found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}

      // Artwork Modal 
      <ArtworkModal
        artwork={selectedArtwork}
        isOpen={!!selectedArtwork}
        onClose={() => setSelectedArtwork(undefined)}
        onEnrich={handleEnrich}
        isEnriching={selectedArtwork ? isEnriching(selectedArtwork.id) : false}
      />
    </div>
  );
};
*/
import { useState } from 'react';
import { Search, Grid, List, Download, ChevronRight } from 'lucide-react';
import { ArtworkCard } from '../components/collection/ArtworkCard';
import { ArtworkListRow } from '../components/collection/ArtworkListRow';
import { ArtworkModal } from '../components/collection/ArtworkModal';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { AI_KEYWORD_POOL } from '../constants/aiKeywords';
import type { Artwork, ViewMode } from '../types';

export function BrowsePage({ artworks, onEnrich, onImport }: {
  artworks:Artwork[];
  onEnrich:(id:number)=>void;
  onImport:()=>void;
}) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("");
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork|null>(null);

  const departments = [...new Set(artworks.map(a=>a.department))];

  const filtered = artworks.filter(a=>{
    const matchSearch = !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.artistDisplayName.toLowerCase().includes(search.toLowerCase());
    const matchDept = !deptFilter || a.department === deptFilter;
    return matchSearch && matchDept;
  });

  if (artworks.length === 0) {
    return (
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", gap:20, padding:32 }}>
        <div style={{ width:80, height:80, borderRadius:20, background:"var(--surface2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:36 }}>🏛️</div>
        <div style={{ fontFamily:"var(--font-display)", fontSize:28, color:"var(--text)", textAlign:"center" }}>Your Collection Awaits</div>
        <div style={{ color:"var(--text-dim)", fontSize:13, textAlign:"center", maxWidth:360 }}>Import artworks from the Metropolitan Museum API to start browsing your collection.</div>
        <Button onClick={onImport} icon={<Download size={14}/>}>Import Collection</Button>
      </div>
    );
  }

  return (
    <>
      <div className="slide-up" style={{ padding:32, overflow:"auto", height:"100%", display:"flex", flexDirection:"column", gap:20 }}>

        {/* Controls */}
        <div style={{ display:"flex", gap:12, alignItems:"center", flexWrap:"wrap" }}>
          <div style={{ position:"relative", flex:1, minWidth:200 }}>
            <Search size={14} style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"var(--text-dim)" }}/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search artworks, artists…" style={{
              width:"100%", background:"var(--surface)", border:"1px solid var(--border)", borderRadius:10,
              padding:"10px 14px 10px 36px", color:"var(--text)", fontSize:13, outline:"none",
              transition:"border 0.2s"
            }}
            onFocus={e=>{e.target.style.border="1px solid var(--border-gold)"}}
            onBlur={e=>{e.target.style.border="1px solid var(--border)"}}
            />
          </div>

          <select value={deptFilter} onChange={e=>setDeptFilter(e.target.value)} style={{
            background:"var(--surface)", border:"1px solid var(--border)", borderRadius:10,
            padding:"10px 36px 10px 14px", color:deptFilter?"var(--gold)":"var(--text-dim)", fontSize:13, outline:"none", cursor:"pointer"
          }}>
            <option value="">All Departments</option>
            {departments.map(d=><option key={d} value={d}>{d}</option>)}
          </select>

          <div style={{ display:"flex", background:"var(--surface)", border:"1px solid var(--border)", borderRadius:10, overflow:"hidden" }}>
            {(["grid","list"] as ViewMode[]).map(m=>(
              <button key={m} onClick={()=>setViewMode(m)} style={{
                padding:"10px 14px", background: viewMode===m?"var(--gold-dim)":"transparent",
                color: viewMode===m?"var(--gold)":"var(--text-dim)", borderRight:"1px solid var(--border)", transition:"all 0.2s"
              }}>
                {m==="grid" ? <Grid size={15}/> : <List size={15}/>}
              </button>
            ))}
          </div>

          <div style={{ fontSize:12, color:"var(--text-dim)", whiteSpace:"nowrap" }}>
            {filtered.length} {filtered.length===1?"artwork":"artworks"}
          </div>
        </div>

        {/* Grid / List */}
        {viewMode === "grid" ? (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:20 }}>
            {filtered.map(a=>(
              <ArtworkCard key={a.objectID} artwork={a} onClick={()=>setSelectedArtwork(a)}/>
            ))}
          </div>
        ) : (
          <Card style={{ overflow:"hidden" }}>
            <div style={{ padding:"10px 20px", borderBottom:"1px solid var(--border)", display:"flex", gap:16, fontSize:11, color:"var(--text-dim)", textTransform:"uppercase", letterSpacing:"0.08em" }}>
              <span style={{ width:56, minWidth:56 }}></span>
              <span style={{ flex:1 }}>Title</span>
              <span style={{ minWidth:160 }}>Department</span>
              <span style={{ minWidth:80 }}>Status</span>
              <span style={{ minWidth:60 }}>AI</span>
              <span style={{ width:14 }}></span>
            </div>
            {filtered.map(a=>(
              <ArtworkListRow key={a.objectID} artwork={a} onClick={()=>setSelectedArtwork(a)}/>
            ))}
          </Card>
        )}
      </div>

      {selectedArtwork && (
        <ArtworkModal
          artwork={selectedArtwork}
          onClose={()=>setSelectedArtwork(null)}
          onEnrich={(id)=>{
            onEnrich(id);
            setSelectedArtwork(prev=>prev?{...prev,aiEnriched:true,aiTags:AI_KEYWORD_POOL.sort(()=>0.5-Math.random()).slice(0,10)}:null);
          }}
        />
      )}
    </>
  );
}