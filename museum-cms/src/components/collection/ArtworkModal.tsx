/*
import React from 'react';
import { Artwork } from '../../types';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Spinner } from '../ui/Spinner';
import { GoldDivider } from '../ui/GoldDivider';

export interface ArtworkModalProps {
  artwork?: Artwork;
  isOpen: boolean;
  onClose: () => void;
  onEnrich?: (artwork: Artwork) => void;
  isEnriching?: boolean;
}

export const ArtworkModal: React.FC<ArtworkModalProps> = ({
  artwork,
  isOpen,
  onClose,
  onEnrich,
  isEnriching = false,
}) => {
  if (!isOpen || !artwork) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        // Header 
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{artwork.title}</h2>
              {artwork.artist && (
                <p className="text-lg text-gray-600">{artwork.artist}</p>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              }
              onClick={onClose}
            />
          </div>
        </div>

        // Content 
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            // Image 
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              {artwork.imageUrl ? (
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
            </div>

            // Details 
            <div className="space-y-4">
              // Basic Info 
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Details</h3>
                <dl className="space-y-2">
                  {artwork.date && (
                    <div className="flex">
                      <dt className="font-medium text-gray-600 w-20">Date:</dt>
                      <dd className="text-gray-900">{artwork.date}</dd>
                    </div>
                  )}
                  {artwork.medium && (
                    <div className="flex">
                      <dt className="font-medium text-gray-600 w-20">Medium:</dt>
                      <dd className="text-gray-900">{artwork.medium}</dd>
                    </div>
                  )}
                  {artwork.dimensions && (
                    <div className="flex">
                      <dt className="font-medium text-gray-600 w-20">Size:</dt>
                      <dd className="text-gray-900">{artwork.dimensions}</dd>
                    </div>
                  )}
                  {artwork.department && (
                    <div className="flex">
                      <dt className="font-medium text-gray-600 w-20">Dept:</dt>
                      <dd className="text-gray-900">{artwork.department}</dd>
                    </div>
                  )}
                  {artwork.culture && (
                    <div className="flex">
                      <dt className="font-medium text-gray-600 w-20">Culture:</dt>
                      <dd className="text-gray-900">{artwork.culture}</dd>
                    </div>
                  )}
                </dl>
              </div>

              <GoldDivider />

              //  Tags 
              {artwork.tags.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {artwork.tags.map((tag, index) => (
                      <Badge key={index} color="gray">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              // AI Enrichment 
              {artwork.aiEnriched ? (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">AI Analysis</h3>
                  {artwork.aiDescription && (
                    <p className="text-gray-700 mb-3">{artwork.aiDescription}</p>
                  )}
                  {artwork.aiTags && artwork.aiTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {artwork.aiTags.map((tag, index) => (
                        <Badge key={index} color="blue">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">AI Analysis</h3>
                  <p className="text-gray-500 mb-3">No AI enrichment available.</p>
                  {onEnrich && (
                    <Button
                      variant="primary"
                      size="sm"
                      disabled={isEnriching}
                      icon={isEnriching ? <Spinner size="sm" /> : undefined}
                      onClick={() => onEnrich(artwork)}
                    >
                      {isEnriching ? 'Enriching...' : 'Enrich with AI'}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
*/
import { useState, useEffect } from 'react';
import { X, Sparkles, Eye, Check } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Spinner } from '../ui/Spinner';
import type { Artwork } from '../../types';

export function ArtworkModal({ artwork, onClose, onEnrich }: {
  artwork:Artwork; onClose:()=>void; onEnrich:(id:number)=>void
}) {
  const [enriching, setEnriching] = useState(false);

  const handleEnrich = async () => {
    setEnriching(true);
    await new Promise(r=>setTimeout(r,2000));
    onEnrich(artwork.objectID);
    setEnriching(false);
  };

  useEffect(()=>{
    const fn = (e:KeyboardEvent) => { if(e.key==="Escape") onClose(); };
    window.addEventListener("keydown",fn);
    return ()=>window.removeEventListener("keydown",fn);
  },[onClose]);

  return (
    <div style={{
      position:"fixed", inset:0, background:"rgba(0,0,0,0.85)", backdropFilter:"blur(12px)",
      zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:24
    }} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} className="slide-up" style={{
        background:"var(--surface)", border:"1px solid var(--border-gold)",
        borderRadius:20, maxWidth:900, width:"100%", maxHeight:"90vh", overflow:"hidden",
        display:"flex", flexDirection:"column"
      }}>
        {/* Modal Header */}
        <div style={{ padding:"20px 28px", borderBottom:"1px solid var(--border)", display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0 }}>
          <div>
            <div style={{ fontFamily:"var(--font-display)", fontSize:26, fontWeight:500, color:"var(--text)" }}>{artwork.title}</div>
            <div style={{ fontSize:12, color:"var(--text-dim)", marginTop:2 }}>{artwork.artistDisplayName} · {artwork.objectDate}</div>
          </div>
          <button onClick={onClose} style={{ width:36, height:36, borderRadius:10, background:"var(--surface2)", border:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--text-dim)", transition:"all 0.2s" }}>
            <X size={16}/>
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ display:"flex", overflow:"hidden", flex:1 }}>
          {/* Image */}
          <div style={{ width:380, minWidth:380, background:"var(--surface2)", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
            <img src={artwork.primaryImage} alt={artwork.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e=>{(e.target as HTMLImageElement).style.display="none"}}/>
          </div>

          {/* Details */}
          <div style={{ flex:1, overflowY:"auto", padding:28 }}>

            {/* Meta grid */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:24 }}>
              {[
                { label:"Department", value:artwork.department },
                { label:"Classification", value:artwork.classification },
                { label:"Culture", value:artwork.culture },
                { label:"Medium", value:artwork.medium },
              ].map((m,i)=>(
                <div key={i} style={{ background:"var(--surface2)", borderRadius:10, padding:"12px 16px" }}>
                  <div style={{ fontSize:10, color:"var(--text-dim)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:4 }}>{m.label}</div>
                  <div style={{ fontSize:13, color:"var(--text)", fontWeight:500 }}>{m.value || "—"}</div>
                </div>
              ))}
            </div>

            {/* Status */}
            <div style={{ display:"flex", gap:10, marginBottom:24 }}>
              {artwork.isPublished ? <Badge color="green">✓ Published</Badge> : <Badge color="red">Draft</Badge>}
              {artwork.aiEnriched && <Badge><Sparkles size={10}/> AI Enriched</Badge>}
            </div>

            {/* Original Tags */}
            {artwork.tags.length > 0 && (
              <div style={{ marginBottom:20 }}>
                <div style={{ fontSize:11, color:"var(--text-dim)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:10 }}>Collection Tags</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                  {artwork.tags.map((t,i)=>(
                    <span key={i} style={{ padding:"4px 12px", borderRadius:20, background:"var(--surface2)", border:"1px solid var(--border)", fontSize:12, color:"var(--text-mid)" }}>{t}</span>
                  ))}
                </div>
              </div>
            )}

            {/* AI Tags */}
            {artwork.aiTags && artwork.aiTags.length > 0 && (
              <div style={{ marginBottom:24 }}>
                <div style={{ fontSize:11, color:"#9B7FD4", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:10, display:"flex", alignItems:"center", gap:6 }}>
                  <Sparkles size={11}/>AI-Generated Keywords
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                  {artwork.aiTags.map((t,i)=>(
                    <span key={i} style={{ padding:"4px 12px", borderRadius:20, background:"rgba(155,127,212,0.12)", border:"1px solid rgba(155,127,212,0.3)", fontSize:12, color:"#9B7FD4" }}>{t}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
              <Button
                onClick={handleEnrich}
                disabled={enriching || artwork.aiEnriched}
                icon={enriching ? <Spinner/> : <Sparkles size={14}/>}
              >
                {enriching ? "Analyzing…" : artwork.aiEnriched ? "Already Enriched" : "Enrich with AI"}
              </Button>
              <Button
                onClick={()=>window.open(artwork.objectURL,"_blank")}
                variant="secondary"
                icon={<Eye size={14}/>}
              >View on Met</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}