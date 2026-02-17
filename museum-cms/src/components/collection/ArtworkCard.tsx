/*
import React from 'react';
import { Artwork } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Spinner } from '../ui/Spinner';

export interface ArtworkCardProps {
  artwork: Artwork;
  onClick?: (artwork: Artwork) => void;
  loading?: boolean;
  showAIEnriched?: boolean;
}

export const ArtworkCard: React.FC<ArtworkCardProps> = ({
  artwork,
  onClick,
  loading = false,
  showAIEnriched = true,
}) => {
  const handleClick = () => {
    if (!loading && onClick) {
      onClick(artwork);
    }
  };

  return (
    <Card hover={!loading} onClick={handleClick} className="overflow-hidden">
      // Image 
      <div className="relative aspect-square bg-gray-100">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
            <Spinner size="lg" />
          </div>
        )}
        {artwork.thumbnailUrl ? (
          <img
            src={artwork.thumbnailUrl}
            alt={artwork.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
        
        // AI Enriched Badge 
        {showAIEnriched && artwork.aiEnriched && (
          <div className="absolute top-2 right-2">
            <Badge color="gold" size="sm">AI Enriched</Badge>
          </div>
        )}
      </div>

      // Content 
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 truncate mb-1">{artwork.title}</h3>
        
        {artwork.artist && (
          <p className="text-sm text-gray-600 truncate mb-2">{artwork.artist}</p>
        )}
        
        {artwork.date && (
          <p className="text-xs text-gray-500 mb-3">{artwork.date}</p>
        )}

        // Tags 
        {artwork.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {artwork.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} color="gray" size="sm">
                {tag}
              </Badge>
            ))}
            {artwork.tags.length > 3 && (
              <Badge color="gray" size="sm">
                +{artwork.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        // AI Tags 
        {showAIEnriched && artwork.aiTags && artwork.aiTags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {artwork.aiTags.slice(0, 2).map((tag, index) => (
              <Badge key={index} color="blue" size="sm">
                {tag}
              </Badge>
            ))}
            {artwork.aiTags.length > 2 && (
              <Badge color="blue" size="sm">
                +{artwork.aiTags.length - 2}
              </Badge>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};
*/
import { useState } from 'react';
import { Calendar, Tag, Sparkles } from 'lucide-react';
import { Badge } from '../ui/Badge';
import type { Artwork } from '../../types';

export function ArtworkCard({ artwork, onClick }: { artwork:Artwork; onClick:()=>void }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <div onClick={onClick} style={{
      background:"var(--surface)", border:"1px solid var(--border)", borderRadius:14,
      overflow:"hidden", cursor:"pointer", transition:"all 0.3s",
    }}
    onMouseEnter={e=>{const el=e.currentTarget as HTMLDivElement;el.style.transform="translateY(-4px)";el.style.border="1px solid var(--border-gold)";el.style.boxShadow="0 16px 48px rgba(0,0,0,0.6)"}}
    onMouseLeave={e=>{const el=e.currentTarget as HTMLDivElement;el.style.transform="none";el.style.border="1px solid var(--border)";el.style.boxShadow="none"}}
    >
      <div style={{ position:"relative", height:220, background:"var(--surface2)", overflow:"hidden" }}>
        {!imgLoaded && <div className="shimmer" style={{ position:"absolute", inset:0 }}/>}
        <img src={artwork.primaryImage} alt={artwork.title}
          onLoad={()=>setImgLoaded(true)}
          onError={e=>{(e.target as HTMLImageElement).style.opacity="0"}}
          style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", opacity:imgLoaded?1:0, transition:"opacity 0.4s" }}
        />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)" }}/>
        <div style={{ position:"absolute", top:10, right:10, display:"flex", gap:6 }}>
          {artwork.aiEnriched && <Badge><Sparkles size={10}/> AI</Badge>}
          {artwork.isPublished
            ? <Badge color="green">Published</Badge>
            : <Badge color="red">Draft</Badge>}
        </div>
      </div>
      <div style={{ padding:"16px 18px" }}>
        <div style={{ fontFamily:"var(--font-display)", fontSize:17, fontWeight:500, color:"var(--text)", marginBottom:4, lineHeight:1.3, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{artwork.title}</div>
        <div style={{ fontSize:12, color:"var(--text-dim)", marginBottom:12 }}>{artwork.artistDisplayName}</div>
        <div style={{ display:"flex", gap:12, fontSize:11, color:"var(--text-dim)" }}>
          <span style={{ display:"flex", alignItems:"center", gap:4 }}><Calendar size={11}/>{artwork.objectDate}</span>
          <span style={{ display:"flex", alignItems:"center", gap:4 }}><Tag size={11}/>{artwork.department}</span>
        </div>
      </div>
    </div>
  );
}