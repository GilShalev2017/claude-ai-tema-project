/*
import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-300',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 disabled:bg-gray-300',
    outline: 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-blue-500 disabled:bg-gray-100',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500 disabled:text-gray-400',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full' : ''}
    ${icon && !children ? 'p-2' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button className={classes} disabled={disabled} {...props}>
      {icon && <span className={children ? 'mr-2' : ''}>{icon}</span>}
      {children}
    </button>
  );
};
*/
import { useState } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  style?: React.CSSProperties;
}
export function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled,
  icon,
  fullWidth,
  style,
}: ButtonProps) {
  const styles: Record<string, React.CSSProperties> = {
    primary: {
      background: "linear-gradient(135deg,#C9A84C,#A67C32)",
      color: "#0D0A04",
      fontWeight: 700,
    },
    secondary: {
      background: "var(--surface2)",
      color: "var(--text)",
      border: "1px solid var(--border-gold)",
    },
    ghost: {
      background: "transparent",
      color: "var(--text-mid)",
      border: "1px solid var(--border)",
    },
    danger: {
      background: "rgba(139,26,26,0.3)",
      color: "#E05656",
      border: "1px solid rgba(224,86,86,0.3)",
    },
  };
  const sizes: Record<string, React.CSSProperties> = {
    sm: { padding: "6px 14px", fontSize: 12, borderRadius: 8 },
    md: { padding: "10px 20px", fontSize: 13, borderRadius: 11 },
    lg: { padding: "14px 28px", fontSize: 15, borderRadius: 13 },
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        letterSpacing: "0.02em",
        transition: "all 0.2s",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        width: fullWidth ? "100%" : "auto",
        ...styles[variant],
        ...sizes[size],
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled)
          (e.currentTarget as HTMLButtonElement).style.filter =
            "brightness(1.12)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.filter = "none";
      }}
    >
      {icon}
      {children}
    </button>
  );
}
