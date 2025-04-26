import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'RiskWise',
        description:
          'Report and manage risks easily with real-time updates and offline support.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#1976d2',
        orientation: 'portrait-primary',
        lang: 'en',
        icons: [
          {
            src: '/icon/RiskWise_Symbol.png',
            sizes: '500x500',
            type: 'image/png',
            purpose: 'any',
          },
        ],
      },
    }),
  ],
})
