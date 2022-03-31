import { startDevServer } from '@cypress/webpack-dev-server'
import webpackConfig from '@vue/cli-service/webpack.config.js'

export default function (on, config) {
  on('dev-server:start', (options) =>
    startDevServer({
      options,
      webpackConfig,
    }),
  )

  return config
}
