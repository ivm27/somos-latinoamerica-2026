import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // This handles any libraries that still look for 'process.env'
    'process.env': {}
  },
  build: {
    outDir: 'dist',
    target: 'esnext' // Ensures it supports the modern code Gemini uses
  }
})