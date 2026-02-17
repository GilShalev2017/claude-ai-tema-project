/*
import React from 'react';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const classes = `
    ${sizeClasses[size]}
    animate-spin rounded-full border-2 border-gray-300 border-t-blue-600
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return <div className={classes} />;
};
*/
export function Spinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const px = size === "sm" ? 14 : size === "lg" ? 22 : 18;
  return (
    <span
      style={{
        display: "inline-block",
        width: px,
        height: px,
        border: "2px solid rgba(201,168,76,0.3)",
        borderTopColor: "var(--gold)",
        borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
      }}
    />
  );
}
