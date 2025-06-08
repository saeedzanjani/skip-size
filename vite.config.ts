import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // needed for CodeSandbox
    allowedHosts: [
      'localhost',
      '.csb.app', // allows all CodeSandbox preview URLs
    ],
  },
})
