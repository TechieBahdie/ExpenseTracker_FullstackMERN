import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8000, // We keep Frontend on 8000 (standard UI port)
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // <--- CHANGED THIS TO 8000
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
