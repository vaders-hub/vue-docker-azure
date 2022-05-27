import { defineConfig } from '@vue/cli-service'

export default defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  devServer: {
    proxy: {
      '/api': {
        target: 'https://localhost:6443/',
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/api/, '/api/members'),
      },
    },
  },
})
