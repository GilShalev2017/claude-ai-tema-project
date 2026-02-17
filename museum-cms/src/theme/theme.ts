/*
import { createTheme, alpha } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary:   { main: '#D4AF37' },   // Museum gold
    secondary: { main: '#C0392B' },   // Deep crimson
    background: {
      default: '#0D0D0D',             // Near-black
      paper:   '#141414',             // Slightly lifted
    },
    text: {
      primary:   '#F5F0E8',           // Warm white
      secondary: '#8A8A8A',           // Muted
    },
  },
  typography: {
    fontFamily: '"Work Sans", sans-serif',
    h1: { fontFamily: '"Playfair Display", serif', fontWeight: 800 },
    h2: { fontFamily: '"Playfair Display", serif', fontWeight: 700 },
    h3: { fontFamily: '"Playfair Display", serif', fontWeight: 700 },
    h4: { fontFamily: '"Playfair Display", serif', fontWeight: 600 },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          letterSpacing: '0.04em',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid rgba(212, 175, 55, 0.12)',
        },
      },
    },
  },
})
*/

// src/theme/theme.ts
export const CSS_VARIABLES = `
  :root {
    --gold:        #C9A84C;
    --gold-light:  #E8D08A;
    --gold-dim:    rgba(201,168,76,0.15);
    --gold-glow:   rgba(201,168,76,0.35);
    --bg:          #080808;
    --surface:     #111111;
    --surface2:    #181818;
    --surface3:    #202020;
    --border:      rgba(255,255,255,0.07);
    --border-gold: rgba(201,168,76,0.25);
    --text:        #F2EDE4;
    --text-dim:    #7A7570;
    --text-mid:    #A89F96;
    --crimson:     #8B1A1A;
    --emerald:     #1A5C3A;
    --sapphire:    #1A2E5C;
    --radius:      14px;
    --font-display: 'Cormorant Garamond', serif;
    --font-ui:      'DM Sans', sans-serif;
  }
`;

export const ANIMATIONS = `
  @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
  @keyframes slideUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:0.4} }
  @keyframes spin    { to{transform:rotate(360deg)} }
  @keyframes shimmer {
    0%  {background-position:-200% 0}
    100%{background-position: 200% 0}
  }

  .fade-in  { animation: fadeIn  0.5s ease forwards; }
  .slide-up { animation: slideUp 0.5s cubic-bezier(.16,1,.3,1) forwards; }
  .shimmer  {
    background: linear-gradient(90deg, var(--surface2) 25%, var(--surface3) 50%, var(--surface2) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }
`;

// Combined — this is what you inject into App.tsx
export const GLOBAL_STYLES = CSS_VARIABLES + ANIMATIONS;
