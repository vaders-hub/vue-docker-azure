import { defineConfig } from '@vue/cli-service'
import { fileURLToPath, URL } from 'url'

export default defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  outputDir: 'public/',
  assetsDir: 'src/assets/',
  configureWebpack: (config) => {
    config.resolve.alias = {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
    if (process.env.NODE_ENV === 'production') {
      config.output.filename = 'js/[name].[hash].js'
      config.output.chunkFilename = 'js/[name].[hash].js'
    }
  },
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
