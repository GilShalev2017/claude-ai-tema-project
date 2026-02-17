export const loadGoogleFonts = () => {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;700&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
};

export const FONTS = {
  primary: "'Inter', sans-serif",
  serif: "'Playfair Display', serif",
} as const;
