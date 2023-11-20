import { defineConfig } from 'vite'
import { resolve, join } from 'path'
import react from '@vitejs/plugin-react'
import pages from 'vite-plugin-react-pages'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    react(),
    pages({
      pagesDir: join(__dirname, 'src'),
    }),
  ],
})
