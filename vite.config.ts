import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Explicitly tells Vite the entry point is index.html in the root
    rollupOptions: {
      input: './index.html'
    },
    // Ensures the output goes to a fresh 'dist' folder
    outDir: 'dist',
    emptyOutDir: true
  }
});