import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/morning-routine/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon-192.svg', 'icons/icon-512.svg'],
      manifest: {
        name: 'הבוקר של לביא',
        short_name: 'הבוקר שלי',
        description: 'שגרת בוקר עצמאית ושמחה',
        display: 'standalone',
        orientation: 'any',
        start_url: '/morning-routine/',
        scope: '/morning-routine/',
        theme_color: '#eaf7ff',
        background_color: '#eaf7ff',
        lang: 'he',
        dir: 'rtl',
        icons: [
          { src: '/morning-routine/icons/icon-192.svg', sizes: '192x192', type: 'image/svg+xml', purpose: 'any maskable' },
          { src: '/morning-routine/icons/icon-512.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'any maskable' }
        ]
      },
      workbox: { navigateFallback: '/morning-routine/index.html' }
    })
  ],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true
  }
});
