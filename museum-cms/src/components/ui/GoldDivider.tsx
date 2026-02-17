/*
import React from 'react';

export interface GoldDividerProps {
  className?: string;
  thickness?: 'thin' | 'medium' | 'thick';
}

export const GoldDivider: React.FC<GoldDividerProps> = ({
  className = '',
  thickness = 'thin',
}) => {
  const thicknessClasses = {
    thin: 'h-px',
    medium: 'h-0.5',
    thick: 'h-1',
  };

  const classes = `
    ${thicknessClasses[thickness]}
    bg-gradient-to-r from-transparent via-yellow-400 to-transparent
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return <div className={classes} />;
};
*/
export function GoldDivider() {
  return (
    <div
      style={{
        height: 1,
        background:
          "linear-gradient(90deg,transparent,var(--gold),transparent)",
        opacity: 0.4,
        margin: "0.5rem 0",
      }}
    />
  );
}
