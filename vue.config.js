const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
        nodeIntegration: true,
    },
    configureWebpack: {
      resolve: {
        fallback: { path: require.resolve('path-browserify') }
      }
    }
},
})
