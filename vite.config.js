import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  build: {
    target: 'es2015', // not 'modules' or 'esnext'
  },
  plugins: [react(), tailwindcss(),],
  test: {
    environment: 'jsdom',
    globals:true,
    setupFiles:'./src/__tests__/setup.js'
  }
})
