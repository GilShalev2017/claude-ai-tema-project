/*
import React from 'react';
import { Artwork } from '../../types';
import { Badge } from '../ui/Badge';
import { Spinner } from '../ui/Spinner';

export interface ArtworkListRowProps {
  artwork: Artwork;
  onClick?: (artwork: Artwork) => void;
  loading?: boolean;
  showAIEnriched?: boolean;
}

export const ArtworkListRow: React.FC<ArtworkListRowProps> = ({
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
    <div
      className={`bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer ${loading ? 'opacity-50' : ''}`}
      onClick={handleClick}
    >
      <div className="flex items-center space-x-4">
        // Thumbnail 
        <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded overflow-hidden">
          {loading ? (
            <div className="w-full h-full flex items-center justify-center">
              <Spinner size="sm" />
            </div>
          ) : artwork.thumbnailUrl ? (
            <img
              src={artwork.thumbnailUrl}
              alt={artwork.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

        // Main Info 
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-gray-900 truncate">{artwork.title}</h3>
            {showAIEnriched && artwork.aiEnriched && (
              <Badge color="gold" size="sm">AI</Badge>
            )}
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            {artwork.artist && <span>{artwork.artist}</span>}
            {artwork.date && <span>• {artwork.date}</span>}
            {artwork.department && <span>• {artwork.department}</span>}
          </div>
        </div>

        // Tags 
        <div className="flex-shrink-0">
          <div className="flex flex-wrap gap-1 justify-end">
            {artwork.tags.slice(0, 2).map((tag, index) => (
              <Badge key={index} color="gray" size="sm">
                {tag}
              </Badge>
            ))}
            {showAIEnriched && artwork.aiTags && artwork.aiTags.length > 0 && (
              <Badge color="blue" size="sm">
                AI: {artwork.aiTags.length}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
*/
import { Calendar, ChevronRight, Sparkles } from 'lucide-react';
import { Badge } from '../ui/Badge';
import type { Artwork } from '../../types';

export function ArtworkListRow({ artwork, onClick }: { artwork:Artwork; onClick:()=>void }) {
  return (
    <div onClick={onClick} style={{
      display:"flex", alignItems:"center", gap:16, padding:"12px 20px",
      borderBottom:"1px solid var(--border)", cursor:"pointer", transition:"all 0.2s"
    }}
    onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.background="rgba(255,255,255,0.03)"}}
    onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.background="transparent"}}
    >
      <div style={{ width:56, height:56, borderRadius:8, overflow:"hidden", background:"var(--surface2)", flexShrink:0 }}>
        <img src={artwork.primaryImage} alt={artwork.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e=>{(e.target as HTMLImageElement).style.display="none"}}/>
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontFamily:"var(--font-display)", fontSize:15, fontWeight:500, color:"var(--text)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{artwork.title}</div>
        <div style={{ fontSize:12, color:"var(--text-dim)" }}>{artwork.artistDisplayName} · {artwork.objectDate}</div>
      </div>
      <div style={{ minWidth:160, fontSize:12, color:"var(--text-dim)" }}>{artwork.department}</div>
      <div style={{ minWidth:80 }}>
        {artwork.isPublished ? <Badge color="green">Published</Badge> : <Badge color="red">Draft</Badge>}
      </div>
      <div style={{ minWidth:60 }}>
        {artwork.aiEnriched && <Badge><Sparkles size={10}/> AI</Badge>}
      </div>
      <ChevronRight size={14} style={{ color:"var(--text-dim)" }}/>
    </div>
  );
}