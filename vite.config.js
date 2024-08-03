import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/api': 'https://youtube-backend-ibez.onrender.com/api/v1'
      // '/api': 'http://localhost:8000/api/v1'
    },
    port:3000,
    host: '0.0.0.0'
  },
  build: {
    sourcemap: true
  }

})
