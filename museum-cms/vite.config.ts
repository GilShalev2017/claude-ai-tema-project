// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import path from 'path'

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'),
//     },
//   },
// })

// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      // Proxy all /api requests to the backend server
      '/api': {
        target: 'http://localhost:3000', // ← Change this to your backend port
        changeOrigin: true,
        secure: false,
        // Optional: rewrite path if backend doesn't use /api prefix
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/uploads': {  // ← ADD THIS
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    },
  },
});