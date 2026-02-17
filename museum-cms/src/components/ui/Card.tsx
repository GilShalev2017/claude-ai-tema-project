/*
import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  onClick,
}) => {
  const baseClasses = 'bg-white rounded-lg shadow-sm border border-gray-200';
  const hoverClasses = hover ? 'hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer' : '';
  
  const classes = `
    ${baseClasses}
    ${hoverClasses}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
};
*/
import { useState } from 'react';

export function Card({
  children,
  style,
  onClick,
  hover = false,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
  hover?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => hover && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        transition: "all 0.3s",
        cursor: onClick ? "pointer" : "default",
        ...(hover && hovered
          ? {
              border: "1px solid var(--border-gold)",
              transform: "translateY(-3px)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
            }
          : {}),
        ...style,
      }}
    >
      {children}
    </div>
  );
}
