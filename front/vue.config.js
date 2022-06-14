/* eslint-disable @typescript-eslint/no-var-requires */
const { defineConfig } = require('@vue/cli-service')
const { fileURLToPath, URL } = require('url')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  outputDir: 'dist/',
  assetsDir: 'src/assets/',
  configureWebpack: (config) => {
    config.resolve.alias = {
      '@': path.join(__dirname, './src'),
    }
    if (process.env.NODE_ENV === 'production') {
      config.output.filename = 'js/[name].[hash].js'
      config.output.chunkFilename = 'js/[name].[hash].js'
    }
  },
  devServer: {
    proxy: {
      '/api/': {
        target: 'http://10.242.113.24/',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
