/*
import React from 'react';

export interface BadgeProps {
  color?: 'gold' | 'green' | 'red' | 'blue' | 'gray';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  color = 'gray',
  size = 'md',
  children,
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full';
  
  const colorClasses = {
    gold: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    green: 'bg-green-100 text-green-800 border border-green-200',
    red: 'bg-red-100 text-red-800 border border-red-200',
    blue: 'bg-blue-100 text-blue-800 border border-blue-200',
    gray: 'bg-gray-100 text-gray-800 border border-gray-200',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
  };

  const classes = `
    ${baseClasses}
    ${colorClasses[color]}
    ${sizeClasses[size]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return <span className={classes}>{children}</span>;
};
*/
export function Badge({ children, color="gold" }: { children: React.ReactNode; color?: string }) {
  const colors: Record<string,string> = {
    gold:"rgba(201,168,76,0.15)", green:"rgba(26,92,58,0.3)",
    red:"rgba(139,26,26,0.3)", blue:"rgba(26,46,92,0.3)"
  };
  const textColors: Record<string,string> = {
    gold:"var(--gold)", green:"#4CAF81", red:"#E05656", blue:"#5688E0"
  };
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", gap:4,
      padding:"3px 10px", borderRadius:20,
      background:colors[color], color:textColors[color],
      fontSize:11, fontWeight:600, letterSpacing:"0.06em",
      border:`1px solid ${textColors[color]}33`
    }}>{children}</span>
  );
}