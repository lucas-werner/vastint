import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      'prop-types': resolve(__dirname, 'src/shims/prop-types.js'),
    },
  },
  optimizeDeps: {
    include: ['jspdf'],
  },
})
