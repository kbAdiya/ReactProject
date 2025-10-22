import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/wikiapi": {
        target: "https://en.wikipedia.org",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wikiapi/, ""),
      },
    },
  },
})
