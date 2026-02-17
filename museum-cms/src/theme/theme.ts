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