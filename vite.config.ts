import path from "path"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: { enabled: false }, 
      manifest: {
        name: 'Ceeseburgers',
        short_name: 'Ceeseburgers',
        description: 'Hamburguesas artesanales, combos y pedidos online de Ceeseburgers.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#f1f5f9',
        icons: [
          { src: '/receipt-logo.png', sizes: '1080x1080', type: 'image/png' }
        ]
      }
    })
  ],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") }
  }
})
