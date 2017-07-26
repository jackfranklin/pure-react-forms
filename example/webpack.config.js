const path = require('path')

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'index.jsx'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: '/',
  },
  devServer: {
    contentBase: path.resolve(__dirname),
  },
  module: {
    rules: [{ test: /\.jsx?$/, use: 'babel-loader' }],
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
}
