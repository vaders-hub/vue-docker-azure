import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      inferno:
        String(process.env.NODE_ENV).trim() === 'development'
          ? 'inferno/dist/index.dev.esm.js'
          : 'inferno/dist/index.esm.js',
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:443/',
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/api/, '/api/members'),
      },
    },
  },
  build: {
    rollupOptions: {
      external: ['jquery'],
      output: {
        globals: {
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery',
        },
      },
    },
  },
})
