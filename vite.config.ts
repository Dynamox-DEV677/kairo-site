import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 5180, open: false },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        // Vite 8 bundles with rolldown, which requires manualChunks to be a
        // FUNCTION — the object form silently type-checks and then throws at
        // build time. Splitting gsap out keeps the entry small so the hero
        // paints before the animation engine is parsed.
        manualChunks(id: string) {
          if (id.includes('node_modules/gsap')) return 'gsap'
          if (
            id.includes('node_modules/three') ||
            id.includes('@react-three')
          ) {
            return 'three'
          }
        },
      },
    },
  },
})
