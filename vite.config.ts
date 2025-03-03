import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
  allowedHosts: ['4631fecf-f464-416b-a18d-4ed314877021-00-385v3475c2h8d.pike.replit.dev'],
  }
})
