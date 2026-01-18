import { defineConfig } from 'vite'

export default defineConfig({
  root: 'public',
  server: {
    port: 3000,
    open: false
  },
  build: {
    outDir: '../dist'
  }
})
