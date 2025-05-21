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
  },
  server: {
    // Add Ngrok URL to allowedHosts
    allowedHosts: ['frontend.shayolaw.ca'],
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:80',
    //     changeOrigin: true,
    //     secure: false,
    //   },
    //   '/sanctum': {
    //     target: 'http://localhost:80',
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },
  },
})
