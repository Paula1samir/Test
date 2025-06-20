import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'], // this is OK if intentional
  },
  build: {
    sourcemap: true, // Enable sourcemaps for better debugging on Netlify
  },
});
