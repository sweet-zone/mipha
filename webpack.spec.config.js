
const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: './test/browser.js',
  output: {
    path: path.resolve(__dirname, 'test'),
    filename: 'browser-test.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: []
}
