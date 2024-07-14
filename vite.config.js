import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/api': 'http://localhost:8000/api/v1'
    },
    port:3000,
    host: '0.0.0.0'
  }

})
