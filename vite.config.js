import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/activate': 'http://localhost:5000',
      '/activations': 'http://localhost:5000'
    }
  }
})