const webpack = require('webpack')
const UglifyJs = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const config = require('./webpack.config.js')

delete config.output.publicPath

if (!config.plugins) config.plugins = []

config.plugins = config.plugins.concat([
  new UglifyJs(),
  new CopyWebpackPlugin([{ from: 'example/index.html' }]),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"',
    },
  }),
])

module.exports = config
