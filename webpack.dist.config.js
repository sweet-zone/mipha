
const webpack = require('webpack')

let config = require('./webpack.config.js')

config.output.filename = 'mipha.min.js'
config.plugins.push(new webpack.optimize.UglifyJsPlugin())

module.exports = config
