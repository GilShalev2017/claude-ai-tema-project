
// import { createTheme, alpha } from '@mui/material/styles'

// export const theme = createTheme({
//   palette: {
//     mode: 'dark',
//     primary:   { main: '#D4AF37' },   // Museum gold
//     secondary: { main: '#C0392B' },   // Deep crimson
//     background: {
//       default: '#0D0D0D',             // Near-black
//       paper:   '#141414',             // Slightly lifted
//     },
//     text: {
//       primary:   '#F5F0E8',           // Warm white
//       secondary: '#8A8A8A',           // Muted
//     },
//   },
//   typography: {
//     fontFamily: '"Work Sans", sans-serif',
//     h1: { fontFamily: '"Playfair Display", serif', fontWeight: 800 },
//     h2: { fontFamily: '"Playfair Display", serif', fontWeight: 700 },
//     h3: { fontFamily: '"Playfair Display", serif', fontWeight: 700 },
//     h4: { fontFamily: '"Playfair Display", serif', fontWeight: 600 },
//   },
//   shape: { borderRadius: 16 },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: 12,
//           textTransform: 'none',
//           fontWeight: 600,
//           letterSpacing: '0.04em',
//         },
//       },
//     },
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           backgroundImage: 'none',
//           border: '1px solid rgba(212, 175, 55, 0.12)',
//         },
//       },
//     },
//   },
// })



export const CSS_VARIABLES_DARK = `
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

//Chat GPT  
// export const CSS_VARIABLES_LIGHT = `
//   :root {
//     --gold:        #C9A84C;
//     --gold-light:  #DCCB87;
//     --gold-dim:    rgba(201,168,76,0.18);
//     --gold-glow:   rgba(201,168,76,0.32);

//     /* Background / surfaces */
//     --bg:          #FAF8F4;       /* museum-poster parchment */
//     --surface:     #FFFFFF;       /* main cards */
//     --surface2:    #F4F1EB;       /* soft panels */
//     --surface3:    #EAE6DF;       /* deeper subtle layer */

//     /* Borders */
//     --border:      rgba(0,0,0,0.10);
//     --border-gold: rgba(201,168,76,0.28);

//     /* Text */
//     --text:        #2B2A28;       /* almost-black, warm */
//     --text-dim:    #7A746C;       /* muted brownish grey */
//     --text-mid:    #9A9286;

//     /* Accents (unchanged for brand consistency) */
//     --crimson:     #8B1A1A;
//     --emerald:     #1A5C3A;
//     --sapphire:    #1A2E5C;

//     --radius:      14px;
//     --font-display: 'Cormorant Garamond', serif;
//     --font-ui:      'DM Sans', sans-serif;
//   }
// `;

//Claude AI
export const CSS_VARIABLES_LIGHT = `
  :root {
    --gold:        #9B7133;
    --gold-light:  #C9A84C;
    --gold-dim:    rgba(155,113,51,0.12);
    --gold-glow:   rgba(155,113,51,0.25);
    --bg:          #FAF8F3;
    --surface:     #FFFFFF;
    --surface2:    #F5F2ED;
    --surface3:    #EDE9E1;
    --border:      rgba(155,113,51,0.15);
    --border-gold: rgba(155,113,51,0.35);
    --text:        #1A1614;
    --text-dim:    #6B5F56;
    --text-mid:    #4A4038;
    --crimson:     #B8392E;
    --emerald:     #2D7A52;
    --sapphire:    #3D5A8C;
    --radius:      14px;
    --font-display: 'Cormorant Garamond', serif;
    --font-ui:      'DM Sans', sans-serif;
  }

  body {
    background: linear-gradient(135deg, #FAF8F3 0%, #F5EFE6 100%);
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

export const GLOBAL_STYLES_DARK = CSS_VARIABLES_DARK + ANIMATIONS;
export const GLOBAL_STYLES_LIGHT = CSS_VARIABLES_LIGHT + ANIMATIONS;



